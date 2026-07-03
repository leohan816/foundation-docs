# RECOVERY-AUDIT UPDATE — Cosmile f71c726 (mock retirement) canonical 갱신

> 작성: foundation-control (control tower) · 2026-07-03 · read-only(코드 수정 0 · git add/commit/push 0)
> 갱신 대상: `docs/RECOVERY_AUDIT_*`(이전 "Cosmile 14 미커밋 WIP / WATCH")를 최신 canonical로.

## 0. 갱신 요지
이전 audit의 **Cosmile 미커밋 WIP(mock retirement mid-work)** = **해소**. commit **`f71c726 chore(foundation): retire runtime mock consultation paths`**로 커밋+push·**작업트리 clean(미커밋 0)**. Fable5 targeted re-check = **PASS_WITH_WATCH**.

## 1. Cosmile HEAD / origin 확인
- HEAD = **`f71c726`** · origin/main = **`f71c726`** · **ahead 0 / behind 0 (PUSHED)**.
- ★이전 "14 미커밋 WIP" → **미커밋 0**(oasis-demo/seed untracked만 잔존·무관).

## 2. runtime mock retirement 상태 (반영)
- `app/src/lib/foundation/mockBrain.ts` = **삭제됨(retired)**.
- `app/src/lib/foundation/mockFoundationBridge.ts` = **삭제됨(retired)**.
- `mockFoundationConsultation.ts` → `app/scripts/fixtures/`로 **이동**(runtime 밖·dev fixture로 격리).
- f71c726 변경: consult/route·consult-foundation/route·ConsultationChatShell·DevPanel·DecisionBadge·ShadowBanner·consultationTypes·flags·foundationBridge·dev-eval + Foundation-only 문서 갱신.
- → **runtime 경로에서 mock/mock_fallback = 0**(fixture는 dev 전용).

## 3. Foundation-only + fail-closed 정책 (Dual-Service Adapter 기록 반영)
정본: `Cosmile/app/docs/COSMILE_FOUNDATION_ONLY_CONSULTATION.md`(Leo 2026-07-02).
- consultationProvider 기본 = **foundation_contract**(non-prod) · bridgeMode 기본 = **http**.
- Route A 실패 → **HTTP 502 `foundation_unavailable` / source:"foundation_error"**(mock_fallback 200 폐기).
- Route B mock 브랜치 **제거** → **fail-closed(가짜 추천 0)**.
- UI 실패 → **친절한 연결실패 메시지**(technical code 미노출).
- ★이전 `DUAL_SERVICE_ADAPTER_LAYER_CLOSED_20260702` 기록의 **mock_fallback·Mock Brain 보존 전제 = SUPERSEDED**. 계약(SSC/FRC via /v1/consult_contract)·**fail-closed(가짜 추천 0)는 강화**. 단 mock_fallback 200 → 502로 실패 표면 변경.
- ★**SIASIU divergence**: SIASIU는 standalone brain.chat + fail-closed wrapper **유지**(은퇴 안 함). mock/fallback 정책이 **Cosmile=Foundation-only / SIASIU=standalone-fallback**으로 갈림(의도된 분기·문서화 필요).

## 4. Fable5 검증 기록 (분리)
| 대상 | Fable5 판정 | 비고 |
|---|---|---|
| **ddb2465**(Foundation-only enforce) | **PASS_WITH_WATCH** (2차) | provider/bridge default·502 fail-closed |
| **f71c726**(runtime mock retirement) | **PASS_WITH_WATCH** (targeted re-check) | mock 파일 삭제·runtime mock 0 |
- ★두 검증은 **별개 커밋 대상**(enforce vs 파일삭제). 결과 문서 원본은 Cosmile 팀/Fable5 측 — control은 **판정만 인지**(원문 근거 미보유 → 아래 WATCH·UNKNOWN 참고).

## 5. 남은 WATCH (5)
| # | WATCH | 근거(read-only) |
|---|---|---|
| 1 | **실제 브라우저 UI 렌더 미확인** | Phase 3 view/click·Foundation OFF 메시지·상품카드 = 코드/eval만 확인·실 DOM 렌더 미검증 |
| 2 | **dual-adapter-fallback-eval.mjs stale** | 존재·`mock_fallback` 4건·"Foundation down→fail-closed"(구 mock_fallback 200 전제) — Foundation-only(502)와 불일치 → 갱신/폐기 필요 |
| 3 | **BridgeMode 'mock' enum backward-compat 잔재** | `foundationBridge.ts:13` `m==="mock" ? "mock" : …` — runtime 미사용이나 enum/분기 잔존(dead) |
| 4 | **production readiness** | 현재 dev/shadow(api_live=false)·NODE_ENV!==production에서만 foundation_contract·실사용자 노출 별도 승인 |
| 5 | **Foundation provider observability FRC 미노출** | route는 `source:"foundation_http"/"foundation_error"`(route 레벨)·**FRC 자체엔 provider/source 필드 없음**(trace_id만 추가됨) → verdict 단위 provider 관측 불가 |

## 6. CLOSED / PASS_WITH_WATCH / UNKNOWN 테이블 (재작성)
| 항목 | 판정 | 근거 |
|---|---|---|
| FOUNDATION-FRC-TRACE-ID (7cf53e8) | **CLOSED** | build_frc top-level trace_id·14/14·core 변경 0 |
| Foundation core (safety/decision/adversarial/golden) | **CLOSED** | dual 26/26·http 40/40·adversarial 0·golden 21/21·/health commit=7cf53e8 |
| SIASIU 02A (1142198) | **CLOSED(불변)** | 무변경·6 unpushed |
| Cosmile Phase 3 view/click (9d4edd6) | **CLOSED** | PHASE3_CONTROL_PASS |
| Cosmile mock retirement (f71c726) | **PASS_WITH_WATCH** | 커밋+push·tree clean·mock 파일 삭제·Fable5 targeted PASS_WITH_WATCH |
| Cosmile Foundation-only enforce (ddb2465) | **PASS_WITH_WATCH** | Leo 정책 정본·502 fail-closed·Fable5 2차 PASS_WITH_WATCH |
| Dual-Service Adapter (계약) | **PASS_WITH_WATCH** | 계약 유효·mock_fallback 설계 SUPERSEDED(Foundation-only) |
| real Prisma cart write (5c50795) | **WATCH** | 커밋+push·CART-WRITE 승인 train 문서 근거 미보유 |
| analytics MVP + Slack alert (567b667/77f0941) | **WATCH** | 외부 Slack 전송·승인/secret 처리 UNKNOWN(secret 미열람) |
| dual-adapter-fallback-eval.mjs | **WATCH(stale)** | mock_fallback 전제·Foundation-only와 불일치 |
| BridgeMode 'mock' enum 잔재 | **WATCH** | dead 분기·backward-compat |
| Foundation provider observability(FRC) | **WATCH** | FRC provider/source 미노출 |
| 실 브라우저 UI 렌더 | **WATCH(미확인)** | eval/코드만 |
| production readiness | **WATCH** | dev/shadow·별도 승인 |
| Cosmile 신규 커밋 test(runtime E2E) | **UNKNOWN** | control 미실행(DB/서버·write) |
| Fable5 검증 원문 근거 | **UNKNOWN** | control은 판정만 인지·원문 문서 미보유 |

## 7. 무결성
- Control foundation-control 코드 **0** · SIASIU/Cosmile 코드 미접촉(read+git show만) · git add/commit/push **0** · 서버 잔여 0(:8731·:8732·:3000·foundation proc 0) · secret 미열람.

## 요약
Cosmile mock retirement = **`f71c726` 커밋+push·tree clean**(이전 14 WIP 해소)·runtime mock 0·Fable5 targeted **PASS_WITH_WATCH**. Foundation-only + fail-closed(502·가짜추천 0)가 Dual-Service Adapter의 mock_fallback 설계를 **SUPERSEDE**(계약·fail-closed는 강화). ddb2465(enforce)·f71c726(retirement) Fable5 판정 **분리 기록**. 남은 WATCH 5(브라우저 렌더·fallback-eval stale·BridgeMode 'mock' 잔재·production readiness·FRC provider 관측성) + UNKNOWN(runtime E2E·Fable5 원문). Control 코드 0·push 0.
