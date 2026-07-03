# COSMILE-EVENT-TRACKING-SPEC Phase 3 — recommendation/product_card view·click 설계서 (구현 전)

> 작성: foundation-control (control tower) · 2026-07-02 · ★설계서 작성만(코드 수정 0 · 이벤트 구현 0 · DB write 추가 0 · cart/checkout/order 수정 0 · push 0)
> 근거: SPEC(`COSMILE_EVENT_TRACKING_SPEC_20260702.md`) · Phase 1 CLOSED(560641b·cev-1.0) · Phase 2 CLOSED(607cac3·foundation_decision_received) · FOUNDATION-FRC-TRACE-ID CLOSED(7cf53e8·FRC trace_id 제공)
> ★이제 Foundation 판단 ↔ 추천/카드 행동을 **foundation_trace_id**로 조인 가능.

## 0. 상태 / 승인
- 상태: **DRAFT(미승인)**. Leo 승인 전 구현·코드 수정 0. 구현은 §10.

## 1. Phase 3 이벤트 정의 (canonical·Phase 1 이미 등록)
| event_name | 의미 | 종류 |
|---|---|---|
| `recommendation_view` | 추천 블록 노출 | view(렌더) |
| `recommendation_click` | 추천 블록/CTA 클릭 | click(행동) |
| `product_card_view` | 상품 카드 노출 | view(렌더) |
| `product_card_click` | 상품 카드 클릭 | click(행동) |
- ★4종 모두 Phase 1 `CANONICAL_EVENT_NAMES`에 존재 · COMMERCE_EVENT_TYPES에는 **enum 4개 추가**(★migration 아님·string 컬럼).

## 2. 발생 시점
- **recommendation_view**: consultViaFoundation 결과가 추천 블록(ConsultFoundationResult)을 **렌더**할 때 1회.
- **product_card_view**: 각 상품 카드가 **노출**될 때(렌더·카드별 1회·dedupe §6).
- **product_card_click**: 사용자가 상품 카드를 **클릭**(상세 이동 등)할 때.
- **recommendation_click**: 추천 CTA/블록을 클릭할 때.
- ★모두 **foundation path(commerce mode)에서 카드가 실제 렌더될 때만**. safety/consult/products_allowed=false → 카드 없음 → 이벤트 없음(구조적·§7).

## 3. 연결 필드 (cev-1.0)
| 필드 | 값 | 비고 |
|---|---|---|
| event_version | "cev-1.0" | |
| foundation_trace_id | FRC.trace_id(=frc.trace_id·FOUNDATION-FRC-TRACE-ID로 non-null) | ★조인 키 |
| foundation_source | "foundation_http" \| "mock_fallback" | 구분 |
| customer_id | userId(★서버 derive) | client 미신뢰 |
| anonymous_id | guestId(서버 derive) | |
| session_id | web/consultation session(있으면) | 없으면 null(정직) |
| product_id | rendered productRef(canonical) | click/card_view에 |
| sku_id / brand_id / category_id | 있으면·**null 허용** | first-class(없으면 null) |
| position / rank | 카드 순번(0-based·int) | view/click 순위 |
| surface | "consultation_result" \| "product_card" | 노출 표면 |
| channel | "commerce_chat" | |
| occurred_at | 서버 스탬프(또는 client 시각·서버 정규화) | |
- ★foundation_trace_id로 foundation_decision_received ↔ view/click 조인(verdict→행동 funnel).

## 4. 저장 금지
- user message 원문 · raw_text · answer_substance · recommendation prose · health/skin raw note · PII(email/phone/name/address).
- **가격/재고 등 민감 운영 정보**: 이벤트 payload에 **미포함**(필요 시 별도 검토·이번 범위 제외). product_id(ref)만·가격 raw 저장 0.
- ★payload = enum/ref/int/bool만. Phase 1 `piiPolicy`(키+값+정규화)로 emit 직전 검증·violation=reject.

## 5. write boundary
- **기존 commerceEvent 재사용**: `trackCommerceEvent → prisma.commerceEvent`(Phase 2와 동일 경로). ★새 event layer/table 0.
- **새 table/migration 금지**: foundation_trace_id/source/position/surface/sku/category = 기존 commerceEvent 컬럼(canonicalProductId/canonicalBrandId/channel 등) + **`properties`(sanitized)**에 담음(enum/ref/int → scrub 통과). first-class 컬럼 승격·migration = **후속·별도 승인**.
- **/api/events = 변경 최소/무변경 우선**:
  - 권고(무변경): client가 `/api/events`로 POST(eventType=recommendation_view 등·canonicalProductId·`properties:{foundation_trace_id, foundation_source, position, surface, sku_id, category_id}`). 서버가 userId derive. → **route 무변경**.
  - identity 보강(선택·최소 additive): guest `anonymous_id` 필요 시 `/api/events`에 `getShopper().guestId` 1줄 derive(★write-path/logic 무변경·identity enrichment만) — Phase 3 또는 Phase 4.
- **cart/checkout/order write 금지** · **add_to_cart 이벤트 ≠ cart DB write**(혼합 금지) · 외부 전송 0.

## 6. 중복 방지 (dedupe)
- **view 무한 반복 방지**: recommendation_view/product_card_view는 렌더마다 재발화되면 안 됨.
  - **client-side once key**: `(foundation_trace_id + product_id + surface)` 기준 `useRef Set` 또는 `sessionStorage` once-key → 동일 렌더/재렌더 재기록 0.
  - 대안(server dedupe): commerceEvent에 idempotency 유사(trace_id+product_id+event unique) — ★이번엔 client once 권고(간단·write 최소). server dedupe는 후속.
- **click**: 실제 사용자 클릭 = 자연 dedupe(클릭당 1회). 연타 방지(짧은 throttle) 선택.
- ★view는 IntersectionObserver(실노출) 또는 마운트 1회 — 최소는 마운트 1회 + once-key.

## 7. fallback / safety
| 케이스 | recommendation/product_card 이벤트 |
|---|---|
| safety mode(safety_first/block) | **없음**(카드 미렌더 → view/click 0·구조적) |
| products_allowed=false | **없음**(surface.showProductCards=false → 카드 0) |
| mock_fallback | 카드 렌더 시 이벤트 O·**foundation_source="mock_fallback"** 구분·trace_id null |
| foundation_http commerce | view/click 기록·foundation_source="foundation_http"·trace_id non-null |
- **product_refs 범위**: 이벤트 product_id ∈ **rendered productRefs ⊆ FRC.product_candidates**(surface.productRefs)·서비스 자작 0.
- ★safety/억제에서 이벤트가 나오지 않음을 **구조로 보장**(카드 자체가 없음) + 이벤트 빌더에서 재검증.

## 8. 테스트 기준
1. 정상 Foundation 추천(commerce·foundation_http) → recommendation_view + product_card_view(카드별) 기록 · click 시 recommendation_click/product_card_click.
2. **safety/block → recommendation/product_card 이벤트 0**.
3. **products_allowed=false → product_card 이벤트 0**.
4. **foundation_trace_id non-null**(foundation_http)·조인 가능.
5. **mock_fallback → foundation_source=mock_fallback**·trace_id null 구분.
6. **raw/PII 0**(user message/answer/prose/가격 raw 없음)·PII violation reject.
7. **product_id subset**: 이벤트 product_id ⊆ rendered productRefs ⊆ FRC.product_candidates.
8. **cart/checkout/order write 0**.
9. **duplicate view 방지**: 동일 렌더/재렌더에서 product_card_view 중복 0(once-key).
10. **tsc 0** · 기존 이벤트/route 영향 0 · DB write는 4 이벤트 종류만(다른 write 0).

## 9. 금지
- CART-WRITE 혼합 · checkout/order/payment 수정 · external pixel(GA4/Meta) · dashboard · production exposure · 새 migration · raw/answer/prose/가격 raw 저장 · client가 userId/customer_id 위조 · 새 event layer/table.

## 10. 구현 프롬프트 초안 (승인 후 · Cosmile 담당 · 복사용)
```text
[COSMILE-EVENT-TRACKING-SPEC Phase 3 — Cosmile 구현]
대상 repo: Cosmile · baseline: 607cac3(Phase 2)+FRC trace_id(7cf53e8) · ★설계서 승인 후.
목표: recommendation/product_card view·click 이벤트 4종(client emit·foundation_trace_id 조인).

수정 대상(최소):
- app/src/types/commerceEvent.ts: COMMERCE_EVENT_TYPES에 recommendation_view/recommendation_click/product_card_view/product_card_click 4개 추가(enum·★migration 아님).
- app/src/lib/events/*: view/click canonical 이벤트 builder(순수·validateCanonicalEvent+findPiiViolations·payload enum/ref/int만·raw 0)·client→/api/events POST 헬퍼.
- app/src/components/slice/ConsultationChatShell.tsx / consultFoundationView.ts: consultViaFoundation이 foundation_trace_id/source를 message에 실어 렌더에 전달(surface productRefs 유지).
- app/src/components/slice/ConsultFoundationResult.tsx: 카드 렌더 시 product_card_view(once-key dedupe)·클릭 시 product_card_click·추천 블록 view/click. position/surface 부착.
- app/scripts: phase3 eval.

수정 금지:
- ★/api/events write-path/logic 변경 금지(properties로 foundation 필드 전달·userId 서버 derive) · 새 table/prisma migration 0 · cart/checkout/order 수정 0 · external pixel 0 · dashboard 0.
- ★4 이벤트 외 신규 write 0 · raw_text/answer/prose/가격 raw/PII 저장 0 · client userId 위조 0.
- Mock Brain·legacy consult·기존 emit·WIP 미접촉.

안전/PII 불변:
- safety/block/products_allowed=false → 카드 미렌더 → view/click 이벤트 0(구조+빌더 재검증).
- product_id ⊆ rendered productRefs ⊆ FRC.product_candidates · foundation_source 구분 · foundation_trace_id non-null(foundation_http) · PII violation=reject(로그 원문 0).
- view dedupe(once-key: trace_id+product_id+surface) · click=실 행동.

테스트(필수):
- 정상 view/click 기록 · safety/block 이벤트 0 · products_allowed=false 카드 이벤트 0 · trace_id non-null · mock_fallback 구분 · raw/PII 0 · product_id subset · cart/checkout/order 0 · dup view 방지 · tsc 0 · 기존 영향 0.
- ★live 테스트 Foundation :8731(현재 HEAD) 필요 → Control에 서버 기동 요청. ★write-수행 E2E는 테스트 DB에서 팀 실행(control 미실행).

경계/정리: 로컬 commit(git add <명시 파일>·git add -A 금지·WIP 미포함)·push 0·자기 서버만 정리.
완료 보고: 변경/커밋 파일 · view/click 기록 증거 · safety/products_allowed=false 이벤트 0 · trace_id 조인 · raw/PII 0 · dup 방지 · write 4종·cart/checkout/order 0 · tsc 0 · push 0.
STOP.
```

## 남은 위험 / 보류
- foundation_trace_id/position/surface **first-class 컬럼 + migration** = Phase 4+·별도 승인(이번 properties).
- 일반 session_id·UTM·context populate = Phase 4.
- server-side dedupe(idempotency) = 후속(이번 client once).
- dashboard(funnel: decision→view→click)·external pixel·production exposure·CART-WRITE = 각 별도 승인.

## 한계 / 승인
- 이 문서 = 설계(DRAFT). 구현은 승인 후. ★코드 수정 0 · 이벤트 구현 0 · DB write 추가 0 · cart/checkout/order 수정 0 · migration 0 · push 0.
- 기존 commerceEvent 재사용(새 table/layer 0)·write = view/click 4종.

## 요약
Phase 3 = recommendation/product_card **view·click 4종**(client emit·**foundation_trace_id로 verdict 조인**) · **기존 commerceEvent 재사용**(새 table/migration 0·/api/events properties·route 무변경 우선) · **safety/products_allowed=false → 이벤트 0(구조 보장)** · product_id ⊆ FRC candidates · **view dedupe(once-key)**·click 실행동 · raw/PII/가격 raw 0 · cart/checkout/order/pixel/dashboard 0. 승인 후 §10 구현.
