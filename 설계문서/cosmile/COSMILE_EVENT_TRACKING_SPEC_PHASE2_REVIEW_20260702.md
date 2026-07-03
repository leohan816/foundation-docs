# COSMILE-EVENT-TRACKING-SPEC Phase 2 — Control Review (read-only)

> 작성: foundation-control (control tower) · 2026-07-02 · read-only(코드 수정 0 · 문서 외 수정 0 · push 0)
> 대상: commit **607cac3** · 기준 `docs/COSMILE_EVENT_TRACKING_SPEC_PHASE2_PLAN_20260702.md`

## 최종 판정: **PHASE2_CONTROL_PASS** (★WATCH: Foundation FRC trace_id 부재)
foundation_decision_received가 설계 범위(첫 write 1종·기존 commerceEvent 재사용·raw 0·refs만·PII reject·fallback 마커)로 정확히 구현. 금지(새 table/migration·/api/events 변경·cart/checkout/order·직접 prisma write·pixel) **전부 0**.

---

## 1. 변경 범위
- commit 607cac3: `Phase 2 — foundation_decision_received (첫 write 1종)`. **4 파일**:
  - **A** `app/scripts/foundation-decision-event-eval.mjs` · **A** `app/src/lib/events/foundationDecisionEvent.ts`
  - **M** `app/src/app/api/slice/consult-foundation/route.ts` · **M** `app/src/types/commerceEvent.ts`
- **기존 금지 파일 미수정 0**: commerceEventService / api/events/route / prisma schema / migration / cart / checkout / order / mockBrain / legacy consult route = **0**.
- push 0(ahead 19·미push).

## 2. write boundary
| 검사 | 결과 |
|---|---|
| DB write = foundation_decision_received 1종만 | **PASS** — trackCommerceEvent 실제 호출 **1건**(route.ts:105 `recordFoundationDecision`) · eventType="foundation_decision_received" |
| 기존 commerceEvent 재사용 | **PASS** — `trackCommerceEvent → prisma.commerceEvent`(기존)·별도 layer 0 |
| 새 table/migration | **0** — enum 1줄 추가만(COMMERCE_EVENT_TYPES·string 컬럼·migration 아님) |
| /api/events route 변경 | **0** — 서버 emit(route.ts)로 회피 |
| 직접 prisma write | **0** — trackCommerceEvent 경유만 |
| cart/checkout/order write | **0** |

## 3. event payload
- `event_version = "cev-1.0"` · `event_name = "foundation_decision_received"` (foundationDecisionEvent.ts:74-75) ✅
- `foundation_source = "foundation_http" | "mock_fallback"` ✅
- **`foundation_trace_id` = 정직**: `source==="foundation_http" ? frc.trace_id ?? null : null`(L82) — 부재/mock → **null**(자작 0) ✅
- `foundation_decision_type/final_strategy/safety_gate_result` = **enum coerce**(비enum→null·L83-85) · `products_allowed/recommendation_allowed` = bool ✅
- `product_refs` = FRC.product_candidates의 **canonical product_id만**(L55-57·filter valid string) ✅

## 4. raw / PII 금지
- **raw_text/raw_message/user message/health·skin note/answer_substance/recommendation prose/free-text = 저장 0** — payload는 enum/bool/ref만(L61-71). ✅
- **PII violation → reject**: emit 직전 `validateCanonicalEvent`(구조+`findPiiViolations`)·!valid면 `{ok:false}` → route가 **미기록**(L92-95) ✅
- **reject 로그 원문 0**: route `console.warn(reason=사유코드, trace=traceId)`만·payload/원문 미출력(route.ts) ✅ · trackCommerceEvent `sanitizeProperties` 2차 방어 유지.

## 5. 케이스별 검증 (코드 경로)
| 케이스 | 처리 | 근거 |
|---|---|---|
| foundation_http 정상 | authoritative 기록 | route `recordFoundationDecision(res.frc, "foundation_http")` |
| safety / block | 기록·product_refs=[] | `block → productsAllowed=false → productRefs=[]`(L53-57) |
| products_allowed=false | 기록·product_refs=[] | 동상 |
| mock_fallback | 마커 기록·비authoritative·trace_id null | route `recordFoundationDecision(fallbackFrc, "mock_fallback")` · L82 trace null |
| Foundation down | UI 차단 0 | recordFoundationDecision try/catch best-effort·UI 렌더와 독립 |

## 6. product refs
- **product_refs ⊆ FRC.product_candidates** — FRC 후보의 product_id만 매핑(L55-57). ✅
- **service 자작 refs 0** — FRC 밖 제품 생성 없음.
- **safety/block/products_allowed=false → product_refs=[]** ✅

## 7. 테스트 검증
- **foundation-decision-event-eval = E2E**(route→emit→**DB write**·DATABASE_URL+:3000+:8731 필요·**commerceEvent에 쓰는 테스트**).
  - ★Control은 **read-only·no-DB-write 원칙**상 이 write-수행 eval을 **완전 실행하지 않음**(node 시도 시 Prisma 연결 오류로 중단·**DATABASE_URL 없어 DB write 미발생**). → **team-reported PASS**(근거 인용)·control은 **write 로직을 정적 검증**(buildFoundationDecisionEvent 순수·route emit).
  - ★투명 기록: eval 시도 중 :3000에 consultation 1회 POST 발생(:8731 down→mock_fallback·DB 없어 **persist된 write 0**·benign). 이후 write-수행 E2E는 control 미실행 원칙 유지.
- **tsc 0**: team 보고. Phase 2 파일 정적 type-clean(FrcForEvent/BuildResult 타입·coerce·`any` 미사용).
- **기존 영향 0**: commit이 api/events·commerceEventService·기존 이벤트 미변경(§1) → 기존 이벤트/route 영향 0.

## 8. Foundation trace_id 관측 — ★WATCH
- **Foundation FRC에 top-level trace_id 없음**: `contracts.build_frc` 반환 dict에 trace_id 필드 0 · `consult_contract`이 build_frc 결과(frc)를 반환(서버 envelope trace_id는 error/health/consult_chat엔 있으나 **consult_contract FRC엔 없음**). → `res.frc.trace_id = undefined`.
- **결과**: Cosmile이 `foundation_trace_id = null`로 **정직 기록**(자작 0). ✅
- **★WATCH(후속·Foundation-side)**: Foundation `build_frc`가 FRC에 **trace_id를 포함**하도록 보강 필요(verdict↔행동 상관·조인). Cosmile Phase 2는 정상(null 정직)·수정 불요. Foundation cleanup/contract train 후보.

## 남은 리스크 / 다음
- **[WATCH] Foundation FRC trace_id 부재** → foundation_trace_id 상시 null(Foundation-side 보강 시 자동 채워짐·Cosmile 무변경).
- **[정보] E2E eval는 DB write 수행** → control 미실행(정적 검증)·team PASS 인용. 향후 write-eval은 격리 환경(테스트 DB)에서 팀이 실행.
- Phase 3(recommendation/product_card view·click) · Phase 4(UTM/session·PII 정규식 정제) = 다음 설계서→승인. CART-WRITE·production exposure·pixel = 별도 승인.

## 무결성
- Control foundation-control 코드 **0** · SIASIU/Cosmile **코드 미접촉**(read+git show만) · ★eval 시도 = :3000 consultation 1 POST(persist write 0·투명 기록) · 문서 = 본 검수 보고서 1건 · **push 0**.
- 서버: `:8731`=0 · `:8732`=0 · foundation 프로세스=0 · `:3000`(Cosmile 팀·미접촉).

## 요약
Phase 2(commit `607cac3`) = foundation_decision_received **첫 write 1종**·**기존 commerceEvent 재사용**(새 table/migration 0·enum 1추가)·**server-side emit**(identity 서버 derive·sessionId=null 정직)·**raw/answer 0**·refs만·suppression refs=[]·**PII reject**(로그 원문 0)·fallback(foundation_http authoritative + mock_fallback 마커·trace_id null)·cart/checkout/order/pixel 0. → **PHASE2_CONTROL_PASS**. ★WATCH: Foundation FRC trace_id 부재(foundation_trace_id 상시 null·Foundation-side 보강 후속). Control 코드 0·push 0·서버 잔여 0.
