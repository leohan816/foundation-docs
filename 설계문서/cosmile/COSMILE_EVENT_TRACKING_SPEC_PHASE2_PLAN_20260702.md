# COSMILE-EVENT-TRACKING-SPEC Phase 2 — foundation_decision_received 설계서 (구현 전)

> 작성: foundation-control (control tower) · 2026-07-02 · ★설계서 작성만(코드 수정 0 · 이벤트 구현 0 · DB write 추가 0 · cart/checkout/order 수정 0 · push 0)
> 근거: `docs/COSMILE_EVENT_TRACKING_SPEC_20260702.md`(SPEC) · `docs/COSMILE_EVENT_TRACKING_SPEC_PHASE1_REVIEW_20260702.md`(Phase 1 PASS)
> ★Phase 2 = SPEC의 **첫 write 도입**(foundation_decision_received 1종). write boundary·PII·fallback을 계약으로 고정.

## 0. 상태 / 승인
- 상태: **DRAFT(미승인)**. Leo 승인 전 구현·코드 수정 0.
- 이번 단계: 설계만. 구현은 §10 프롬프트 → 승인 후 Cosmile repo-local.

## 1. Phase 1 기준
- commit **560641b**(PHASE1_CONTROL_PASS). 존재: `types/canonicalEvent.ts`(cev-1.0·17 names·foundation enum·`validateCanonicalEventShape`) · `lib/events/canonicalEventSchema.ts`(`validateCanonicalEvent`) · `piiPolicy.ts`(`findPiiViolations`·키+값+정규화) · `eventNameMap.ts` · eval 37/37.
- Phase 2는 **이 canonical 레이어를 소비**(재구현 0)해 검증 후 기존 write로 persist.

## 2. 이벤트 정의
- `event_name = "foundation_decision_received"` · `event_version = "cev-1.0"`.
- **발생 시점**: `consultViaFoundation`(또는 consult-foundation route)가 **FRC 수신 성공(res.ok·source=foundation_http) 직후, UI 렌더와 독립**(best-effort·실패해도 UI 미차단).
- **실패/fallback 처리**: §7 정책. 원칙 — 실제 Foundation 판단(foundation_http)만 authoritative 기록 · mock_fallback/down은 마커로 구분(또는 미기록).

## 3. 저장 필드 (canonical cev-1.0 · FRC refs/enum만)
| 필드 | 출처 | 타입 |
|---|---|---|
| foundation_trace_id | FRC.trace_id | string|null |
| foundation_decision_type | FRC.decision_type | enum |
| foundation_final_strategy | FRC.final_strategy | enum |
| foundation_safety_gate_result | FRC.safety_gate_result | enum |
| foundation_products_allowed | FRC.products_allowed | bool |
| foundation_recommendation_allowed | FRC.recommendation_allowed | bool |
| product_id / product_refs | FRC.product_candidates | **canonical refs만**(product_id 목록·이름/가격/자유텍스트 0) |
| session_id | web/consultation session(서버 derive) | string|null |
| anonymous_id | guest 쿠키(cosmile_gid·서버 derive) | string|null |
| customer_id | userId(서버 세션 derive·client 조작 불가) | string|null |
| channel | "commerce_chat" | enum |
| occurred_at | 서버 스탬프 | ISO8601 |
- ★identity 3종은 **서버 derive**(client 값 미신뢰). product_refs는 FRC가 준 것만(서비스 자작 0).

## 4. 저장 금지 필드 (★raw 0)
- raw_text · raw_message · **user message 원문** · health/skin raw note · **answer_substance**(FRC 판단 substance 원문) · recommendation prose · 임의 free-text payload.
- ★foundation_decision_received payload = **enum/ref/boolean만**. `piiPolicy.RAW_TEXT_FORBIDDEN_KEYS`(message/query/answer_substance…) + value-scan으로 강제.

## 5. write boundary (★핵심 설계)
**권고: 기존 commerceEvent 시스템 재사용 · 새 table/migration 0 · route 변경 최소.**
- **재사용**: `commerceEventService.trackCommerceEvent → prisma.commerceEvent.create`(pre-existing write). ★새 event layer/table **불필요** — 별도 layer는 덕지덕지·중복.
- **새 DB table/migration = 금지(이번 Phase)**. foundation_* 필드는 기존 commerceEvent의 `propertiesJson`(sanitized)에 담는다(enum/bool/trace_id = 비PII → scrub 통과). ★first-class 컬럼 승격은 **Phase 4+·migration은 별도 승인**.
- **eventType 매핑**: canonical `foundation_decision_received` → 기존 enum. 두 선택지:
  - (A·권고) `types/commerceEvent.ts` COMMERCE_EVENT_TYPES에 **`foundation_decision_received` 1개 추가**(★enum 상수 1줄·**migration 아님**·eventType은 string 컬럼). canonical 이름=eventType 일치.
  - (B) 기존 `ai_result_viewed`(정의됨·미emit)에 매핑하고 canonical 이름은 properties.event_name. (기존 파일 무수정이나 이름 불일치.)
  - → **(A) 권고**(명확·enum만·migration 0). 단 이는 기존 파일 1줄 수정 → Phase 2 승인 범위에 포함 명시.
- **emit 지점**: **server-side, consult-foundation `route.ts`**(res.ok 직후) → trackCommerceEvent 직접 호출.
  - 장점: FRC(res.frc)·identity(userId/guestId via shopper·sessionId)를 **서버에서 완결**(client 라운드트립 0·client 값 미신뢰) · **/api/events route 무변경** · cart/checkout/order 무접촉.
  - route.ts는 02B/UI-switch 산출 파일(계약 slice) — Phase 2 write 도입의 지정 지점(1 event).
- **/api/events 재사용 여부**: 서버 emit(위)이면 /api/events 경유 불필요(무변경). 클라 emit이 필요하면 /api/events 재사용하되 route에 anonymous/session derive 추가 필요 → **서버 emit이 더 최소**(권고).
- ★**DB write = foundation_decision_received 1종만**. cart/checkout/order/외부 전송 0.

## 6. PII 검증
- **적용 위치**: emit 직전(trackCommerceEvent 호출 전) — `validateCanonicalEvent(event)`(구조) + `findPiiViolations(payload)`(PII). 기존 `sanitizeProperties`(commerceEventService)도 2차 방어로 유지.
- **정책 = REJECT(기록 안 함)**: PII violation 발견 시 이벤트 **미기록(drop)** + 카운터/사유코드만 로깅(★원문 0). redact보다 reject(fail-safe) — foundation 필드는 enum/bool이라 정상 시 violation 0.
- **console/log 원문 금지**: 실패/violation 로그에 payload/message/answer 미출력(사유코드·trace_id만).

## 7. fallback 정책 (케이스별)
| 케이스 | 기록? | 필드 |
|---|---|---|
| Foundation 정상(source=foundation_http) | **기록** | foundation_* 전부 + `foundation_source:"foundation_http"` |
| Foundation down / **mock_fallback=true** | **선택**(권고: 마커로 기록·비authoritative) | trace_id=null·decision/strategy/gate=pseudo-FRC(있으면)·`foundation_source:"mock_fallback"`·products/recommendation=false 보수 |
| safety / block | **기록** | safety_gate_result=block·products_allowed=false·recommendation_allowed=false·product_refs=[] |
| products_allowed=false | **기록** | product_refs=[]·suppression 반영 |
- ★권고: **foundation_http는 authoritative 기록** · mock_fallback은 `foundation_source` 마커로 **구분 기록**(Foundation 분석 오염 방지)하거나 미기록(정책 택1·마커 기록 권장). 어느 경우도 **raw 0·1 event type·write 확장 0**.
- ★모든 케이스 best-effort(실패해도 UI 미차단).

## 8. 테스트 기준
1. 정상 Foundation decision(foundation_http) → foundation_decision_received 1건·foundation_* 정확·`source=foundation_http`.
2. safety/block → safety_gate_result=block·products_allowed=false·recommendation_allowed=false·product_refs=[].
3. mock_fallback → 정책대로(마커 기록 or 미기록)·authoritative 아님 표시.
4. **raw_text 저장 0**: message/answer_substance/원문이 event·properties·log 어디에도 없음.
5. **PII violation → reject**(미기록)·로그 원문 0.
6. **productRefs canonical only**: product_refs ⊆ FRC.product_candidates ⊆ canonical(서비스 자작 0).
7. **DB write = foundation_decision_received 1종만**(다른 이벤트·cart/checkout/order write 0).
8. cart/checkout/order write **0** · 외부 pixel **0** · migration **0**.
9. 기존 commerceEvent/기존 이벤트 영향 0(enum 1추가 외 무변경) · tsc 0.

## 9. 금지
- cart/checkout/order 수정 · external pixel · dashboard · production exposure · CART-WRITE와 혼합 · 새 DB table/migration · /api/events write path 확장(서버 emit로 회피) · raw_text/answer 저장 · 자유텍스트 payload.

## 10. Phase 2 구현 프롬프트 초안 (승인 후 Cosmile 담당 · 복사용)
```text
[COSMILE-EVENT-TRACKING-SPEC Phase 2 — Cosmile 구현]
대상 repo: Cosmile · baseline: 560641b(Phase 1) · ★설계서 승인 후 착수.
목표: foundation_decision_received 이벤트 배선(첫 write·1종).

수정 대상(최소):
- app/src/app/api/slice/consult-foundation/route.ts: res.ok(foundation_http) 직후, 서버에서 canonical 이벤트 구성 → validateCanonicalEvent + findPiiViolations 통과 시 trackCommerceEvent 호출(기존 commerceEvent write 재사용). identity=서버 derive(userId/guestId/sessionId). foundation_* = res.frc. product_refs = res.frc.product_candidates(canonical refs만). ★raw_text/answer_substance 미포함.
- app/src/types/commerceEvent.ts: COMMERCE_EVENT_TYPES에 "foundation_decision_received" 1개 추가(enum 상수·★migration 아님).
- (선택) app/src/lib/events/*: canonical→TrackCommerceEventInput bridge helper(순수·판단 0).
- app/scripts: foundation-decision-event-eval(테스트).

수정 금지:
- ★새 DB table/prisma migration 0 · /api/events write path 변경 0 · cart/checkout/order 수정 0 · external pixel 0 · dashboard 0.
- ★foundation_decision_received 외 신규 write 0 · raw_text/answer_substance/user message/health note 저장 0 · 자유텍스트 payload 0.
- consultViaFoundation UI 렌더 로직·기존 commerceEvent 다른 emit·Mock Brain·WIP 미접촉.

안전/PII 불변:
- PII violation(findPiiViolations) → reject(미기록)·로그 원문 0 · foundation 필드 enum/bool/trace_id만.
- fallback: foundation_http=authoritative 기록 · mock_fallback=foundation_source 마커(비authoritative) 또는 미기록 · safety/block/products_allowed=false 정확 기록·refs=[].

테스트(필수):
- 정상/safety-block/mock_fallback 기록 정책 · raw_text 0 · PII reject · productRefs ⊆ FRC.product_candidates · DB write 1종만 · cart/checkout/order 0 · tsc 0 · 기존 이벤트 영향 0.
- ★live 테스트는 Foundation :8731(02b5ac2) 필요 → Control에 서버 기동 요청.

경계/정리: 로컬 commit(git add <명시 파일>·git add -A 금지·WIP 미포함) · push 0 · 자기 서버만 정리.
완료 보고: 변경/커밋 파일 · foundation_decision_received 기록 증거(foundation_http/safety/mock) · raw 0/PII reject 증거 · write 1종·cart/checkout/order 0 · tsc 0 · push 0 · 서버 정리.
STOP.
```

---

## 남은 위험 / 보류 (별도 승인 train)
- foundation_* **first-class 컬럼 승격 + migration** = Phase 4+·별도 승인(이번엔 properties).
- recommendation_view/click·product_card_*(Phase 3) · UTM/session(Phase 4) · dashboard(Phase 5) · CART-WRITE · production exposure · external pixel = 각 별도 승인.

## 한계 / 승인
- 이 문서 = 설계(DRAFT). 구현은 승인 후. ★코드 수정 0 · 이벤트 구현 0 · DB write 추가 0 · cart/checkout/order 수정 0 · migration 0 · push 0.
- 기존 commerceEvent 시스템 **존중·재사용**(새 table/layer 0). write = foundation_decision_received 1종.

## 요약
Phase 2 = `foundation_decision_received`(cev-1.0) **첫 write 1종** · **기존 commerceEvent 재사용**(새 table/migration 0·properties에 foundation 필드) · **server-side emit(consult-foundation route)**·identity 서버 derive · **raw_text/answer 0**·refs만 · PII violation=reject · fallback은 foundation_http authoritative + mock 마커 · cart/checkout/order/pixel/dashboard 0. 승인 후 §10 구현.
