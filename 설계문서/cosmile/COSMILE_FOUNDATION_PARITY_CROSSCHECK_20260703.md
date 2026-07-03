# COSMILE ↔ SIASIU Foundation-only Parity Cross-Check

> **STATUS: PASS_WITH_WATCH** (2026-07-03, read-only audit · Cosmile 코드 수정 0)

SIASIU parity 보고서(`설계문서/siasiu/SIASIU_COSMILE_FOUNDATION_PARITY_REPORT_20260703.md`, commit `44761f5`, PASS_WITH_WATCH)의 남은 Cosmile 측 WATCH를 read-only로 교차검증한 결과.

- **확인 Cosmile HEAD**: `a5547e1` (chore(foundation): close remaining mock retirement gaps)
- **SIASIU parity report**: `44761f5` (PASS_WITH_WATCH)
- 공통 lifecycle: User → Service UI/API → Input Adapter → SSC → Foundation `POST /v1/consult_contract` → FRC → Response Adapter → User. **commerce(cart/order/event)만 SIASIU와 다름.** 상담판단·safety·products/recommendation 허용·PII policy·Foundation-down policy는 동일.

---

## A. Overall verdict: **PASS_WITH_WATCH**
PATCH_REQUIRED **없음.** Foundation-only lifecycle·PII·trace_id는 PASS. `/v1/consult/judge` 별도 클라이언트는 존재하나 **production runtime 미도달(dev/debug-only)** → WATCH.

## D. PII / opaque-ref 검증 — **PASS**
메인 상담 경로(`/api/slice/consult-foundation` → `/v1/consult_contract`)로 Foundation에 가는 SSC(`createBaseSsc`, `src/adapters/cosmileSemanticAdapter.ts`):
- `raw_text` = **maskPii** 적용(email→`[email]`, phone→`[phone]`, 1000자 컷) — `cosmileSemanticAdapter.ts:15-16,36`.
- `product_context` = `product_id` + `catalog_candidates`(product_id refs, 최대 8) — **opaque product refs만**.
- `service_context` = `surface:"cosmile"` · `audience:"consumer"` · `session_context:{}`(route에서 미전달) · `commerce_context:{channel:"d2c"}` — **user/customer id·email·phone·name·address·payment 0**.
- `service_id:"cosmile"`, `locale`, `channel` — PII 없음.
- ★`getShopper()`의 `userId/guestId`는 **Foundation SSC에 안 들어감** — Cosmile-side `foundation_decision_received` 이벤트(`identity`)에만 사용(`consult-foundation/route.ts:14-15`). 그 이벤트도 enum/trace/refs만·PII violation reject(`foundationDecisionEvent`)·server `sanitizeProperties`(piiPolicy) 통과.
- analytics/event = trace/id/decision·구조화 numeric만(raw PII 0, security scan 0건 — 앞선 검증).
- **Cosmile는 Foundation에 user ref를 아예 안 보냄(anonymous consult)** — SIASIU의 `foundation_user_ref`(opaque)보다 **더 보수적**. 원칙(raw PII 미전송) 동일. → raw PII 전송 없음 = **PASS**.
- (sub-WATCH: judge 경로 query는 maskPii 미적용 — E 참조, dev-only.)

## E. /v1/consult/judge 클라이언트 검증 — **PASS_WITH_WATCH**
- 존재: `src/lib/foundation/httpFoundationConsultation.ts` `httpFoundationJudge` → `POST /v1/consult/judge`(body `{query, catalog_candidates, locale}`).
- 호출처(2곳, **모두 non-production 게이트**):
  - `/api/slice/consult` — **DEBUG-ONLY** 잔존 route(header 명시). gate `sliceEnabled()=NEXT_PUBLIC_COSMILE_VERTICAL_SLICE_ENABLED && NODE_ENV!=='production'`.
  - `/api/consultation/foundation-dev` — `devEnabled()=NEXT_PUBLIC_FOUNDATION_CONSULTATION_DEV==='true' && NODE_ENV!=='production'`.
  - → **production(NODE_ENV=production)에서는 둘 다 disabled → `/v1/consult/judge` 도달 불가.**
- 메인 runtime 상담 = `/api/slice/consult-foundation` → `callFoundationContract` → **`/v1/consult_contract`만**(`adapters/foundationClient.ts:2` "judge-only 사용 금지" 명시).
- 셸 라우팅(`ConsultationChatShell.consult()`): `provider==="foundation_contract" && message` → `consultViaFoundation`(consult_contract). 그 외(=debug scenario, message 없음) → `consultViaLegacy`(→judge). provider 기본 foundation_contract → **자유입력은 항상 consult_contract**. judge는 **debug scenario 전용**.
- **fallback/unknown-provider → judge 우회 없음**: `consultationProvider()`는 foundation_contract|legacy만 반환. Foundation 실패 시 consult-foundation은 **502**(judge fallback 아님).
- 판정: runtime(production) 상담은 `/v1/consult_contract`만 사용, judge는 dev/debug-only → **PASS_WITH_WATCH**(SIASIU WATCH와 동일 상태). *bypass 아님.*
- **sub-WATCH**: judge path의 `query`는 `maskPii` 미적용(contract path는 적용). dev/debug-only + debug scenario는 고정 non-PII query라 위험 낮음. free-text judge는 dev의 `/api/slice/consult`로만 도달.

## F. trace_id 전파 검증 — **PASS**
- **API response**: 성공 시 `frc.trace_id` 유지(`consult-foundation/route.ts:65`, `source:"foundation_http"`).
- **event**: `recordFoundationDecision(res.frc,"foundation_http")` → `foundationDecisionEvent` `foundation_trace_id = source==="foundation_http" ? frc.trace_id : null`(`foundationDecisionEvent.ts:82`). → **성공 시 API+event 모두 trace_id 전파.**
- **실패 시**: 502 `foundation_error`, 이벤트 **미발행**(trace 없음) — `source=foundation_error`로 추적 가능.
- **missing 처리**: trace 없으면 event `foundation_trace_id=null`, validation `traceId:null`.
- live 검증(앞선 세션): DB `foundation_decision_received` trace_id == API response trace_id 일치 확인.
- 판정: API + event trace_id 전파 = **PASS**.

## G. Foundation-only lifecycle 검증 — **PASS**
| 항목 | 결과 |
|---|---|
| provider default = foundation_contract(non-prod) | ✅ `flags.ts` |
| bridge default = http (mock env→disabled fail-closed) | ✅ `foundationBridge.ts` |
| unknown provider → mock/legacy fallback | ✅ 없음(judge fallback 0·mock_fallback 0) |
| Foundation down → 502 foundation_unavailable / source=foundation_error | ✅ (live smoke) |
| friendly message(technical code 미노출) | ✅ code+bundle (real UI = WATCH·브라우저툴 없음) |
| fake success 0 / mock fallback 0 | ✅ (runtime `source:"mock_fallback"` 생성 0) |
| runtime mock importer 0 · mockBrain/mockFoundationBridge 삭제 | ✅ (src 0) |
| products/recommendation/safety suppression 유지 | ✅ `showProductCards + allowedRefs`(products_allowed=false→상품 0) |

## H. commerce-only 허용 차이 (SIASIU와 달라도 OK)
product card · cart · order · commerce event(CommerceEvent/AX) · recommendation UI 렌더 · brand/shop page. → **commerce projection layer**만 다름.

## commerce 예외가 **아닌** 것 (동일해야 함) — 전부 CLEAN
- Foundation 대신 자체 판단 ❌ (Cosmile은 FRC 소비만·재파생 0) ✅
- Foundation failure를 성공처럼 포장 ❌ (502 foundation_error) ✅
- raw PII Foundation 전송 ❌ (maskPii·user ref 미전송) ✅
- mock/fake 상담 결과 ❌ (runtime mock 0) ✅
- products_allowed=false인데 product/CTA 노출 ❌ (suppression) ✅
- recommendation_allowed=false인데 추천 노출 ❌ (surface suppression) ✅

## I. PATCH_REQUIRED 여부: **없음(NO)**

## L. Cosmile 코드 변경: **0** (read-only audit) · **M. Cosmile push: 0**

## N. 남은 WATCH
1. `/v1/consult/judge` 별도 클라이언트 존재 — **dev/debug-only(non-prod 게이트), production runtime 미도달**. bypass 아님. (SIASIU WATCH와 동일.)
2. judge path `query`는 maskPii 미적용(contract path는 적용) — dev-only·debug scenario는 고정 query라 위험 낮음. *원한다면 향후 httpFoundationJudge에도 maskPii 적용 = 소소한 hardening(PATCH 후보, Leo 승인 시).*
3. `foundation_decision_received` event의 `session_id`는 아직 null(Phase 4 예정, code 주석) — trace_id는 정상 전파. 소소.
4. Foundation OFF 친절메시지 **실제 브라우저 렌더 미확인**(playwright/브라우저 툴 부재) — code/bundle PASS, real UI WATCH.
5. Cosmile는 Foundation에 opaque user ref를 **안 보냄**(anonymous) — SIASIU `foundation_user_ref`와 구현 상이(원칙은 동일·더 보수적). 향후 회원-단위 personalization 필요 시 opaque ref 도입은 Foundation-control 설계 대상.
