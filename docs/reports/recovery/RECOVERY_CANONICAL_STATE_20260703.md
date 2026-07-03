# RECOVERY CANONICAL STATE — 2026-07-03 (Control tower 정본)

> 작성: foundation-control (control tower) · 2026-07-03 · read-only(코드 수정 0 · git add/commit/push 0 · migration 0 · secret 미열람)
> 목적: 다른 세션에서 분리된 canonical context를 repo/test/Fable5/Control 보고로 복구한 **2026-07-03 기준 정본**.

## 1. 사고 요약
- 어제(2026-07-02~) **다른 GPT 채팅**에서 SIASIU/Foundation/Cosmile/Fable5 작업이 길게 진행되어 canonical context가 분리(깨짐).
- Control은 **read-only 복구 감사**로 재구성: 3 repo git 상태·in-process 테스트·정책 문서·Fable5 판정 인지.
- 결과: 각 repo 상태·정책 진화(Cosmile Foundation-only)·Fable5 판정을 **분리 기록**하고 WATCH/UNKNOWN을 명시. 이 문서가 그 정본.

## 2. 최종 repo 상태
| repo | HEAD | origin/main | ahead/behind | tree | 비고 |
|---|---|---|---|---|---|
| **foundation-control** | `7cf53e8` | `21b05e1` | **52 / 0**(미푸시) | 코드 clean · docs **20 untracked** | FRC trace_id·불변 |
| **Cosmile** | `f71c726` | `f71c726` | **0 / 0 (PUSHED)** | **clean** | Foundation-only·mock 은퇴 |
| **SIASIU** | `1142198` | `be88fb5` | **6 / 0**(미푸시) | app code clean · docs untracked | 02A·불변 |
- **Fable5 검증**: Cosmile `ddb2465` 2차 **PASS_WITH_WATCH** / `f71c726` targeted **PASS_WITH_WATCH** · SIASIU final sync **PASS_WITH_WATCH** · Foundation runtime **HEALTHY**. (원문 결과 문서는 control 미보유 → §8 UNKNOWN.)

## 3. Foundation 상태 (foundation-control `7cf53e8`)
- **FRC trace_id**: `build_frc` top-level `trace_id = r.get("request_id")`(fdsh_16 재사용·부재 시 None·요청간 unique) — **CLOSED**(14/14·in-process 재확인). additive·기존 FRC 값 불변.
- **DeepSeek / retrieval**: consult_contract 파이프라인(judge→02.7C severity→retrieval(ssbrain)→enforcement→verify) 유효 · 회귀 PASS(dual 26/26·http 40/40·adversarial safety_viol=0/false_rec=0·golden 21/21).
- **safety / PII**: safety=AI semantic+deterministic gate+Foundation gate(raise-only)·fail-closed · raw_text_stored=false·raw_pii_included=false · api_live=false·write 0(dev_shadow) · `/health commit=7cf53e8`.
- **WATCH**: (i) **provider observability** — FRC가 verdict 단위 provider/source 미노출(trace_id만) · (ii) **key path** — DeepSeek key는 SIASIU `.secrets`(read-only 재사용)·provider abstraction 후속(GLOBAL-AI-RUNTIME) · (iii) **push/doc 정리** — 52 unpushed·docs 20 untracked.

## 4. Cosmile 상태 (`f71c726` · pushed · clean)
- **Foundation-only runtime**: 상담/추천 = Foundation HTTP only(/v1/consult_contract) · consultationProvider 기본 foundation_contract · bridge 기본 http · 실패 → **502 foundation_unavailable / source:"foundation_error"** · 가짜 추천 0 · UI 친절 실패 메시지. **신규 mock_fallback = 0**.
- **mock retirement**: `mockBrain.ts` 삭제 · `mockFoundationBridge.ts` 삭제 · `mockFoundationConsultation` → `scripts/fixtures/`(eval/test only) · **runtime mock importer 0**.
- **Phase 3 event tracking**(`9d4edd6`): recommendation/product_card view·click · foundation_trace_id 조인 · whitelist·PII reject·dedupe · safety/products_allowed=false → 이벤트 0(구조).
- **real cart write**(`5c50795`): add-to-cart → 실제 prisma cart(상단 🛒 동일).
- **event hardening**(`5c5af05`): /api/events server-side property safety.
- **analytics MVP**(`567b667`/`77f0941`): event report + Slack alert.
- **Fable5**: ddb2465 2차·f71c726 targeted **PASS_WITH_WATCH**.
- **WATCH**: browser UI render 미확인 · dual-adapter-fallback-eval.mjs **stale**(mock_fallback 기대) · BridgeMode 'mock' enum 잔재(`foundationBridge.ts:13`) · production readiness · real cart-write 승인 근거 · analytics Slack 외부전송 승인/secret.

## 5. SIASIU 상태 (`1142198` · 02A · 불변)
- **standalone brain.chat live**: 기존 상담 runtime 유지(answer.py fingerprint 기준선).
- **Foundation adapter = parallel-only**: `consult_via_foundation`(별도 진입점·SSC→/v1/consult_contract→FRC→Response)·기존 `/api/chat` 무접촉.
- **local brain fallback ≠ mock**: Foundation 실패 시 fallback = **real local brain.chat**(가짜 추천 아님) + fail-closed safety wrapper(safety 의심 → 제품/CTA/추천 0).
- **trace_id additive compatible**: SIASIU adapters는 trace_id 미소비 → FRC trace_id 추가에 **무영향**.
- **WATCH**: adapter cutover(parallel→main 전환은 미착수) · docs/push(6 unpushed·docs untracked).

## 6. 정책 분기 (명시)
| 서비스 | fallback 정책 | 이유 |
|---|---|---|
| **Cosmile** | **Foundation-only + runtime mock 폐기** | 기존 Cosmile fallback은 **mock**(가짜)이었음 → 은퇴가 곧 안전 |
| **SIASIU** | **자체 real local brain fallback 유지** | SIASIU fallback은 **real local brain**(실제 상담 엔진) → 은퇴 대상 아님 |
- ★**양쪽 공통 원칙**: **Foundation unavailable 시 fake recommendation 금지 · fail-closed 우선**(Cosmile=502+친절메시지·SIASIU=real brain+fail-closed wrapper).
- 이 divergence는 **의도된 것**(fallback의 성질이 mock vs real로 다름) — 정책 정본은 본 문서 + `Cosmile/app/docs/COSMILE_FOUNDATION_ONLY_CONSULTATION.md`.

## 7. Fable5 상태
- `ddb2465`(Foundation-only enforce) = **2차 PASS_WITH_WATCH**.
- `f71c726`(runtime mock retirement) = **targeted PASS_WITH_WATCH**.
- **실 브라우저 UI 렌더 = 미확인**(코드/eval만·DOM 미검증).
- ★Fable5 판정은 인지 완료 · **원문 결과 문서는 control 미보유(UNKNOWN)**.

## 8. CLOSED / PASS_WITH_WATCH / WATCH / UNKNOWN
| 항목 | 판정 |
|---|---|
| FOUNDATION-FRC-TRACE-ID (7cf53e8) | **CLOSED** |
| Foundation core (safety/decision/adversarial/golden) | **CLOSED** |
| SIASIU 02A (1142198·불변) | **CLOSED** |
| Cosmile Phase 3 view/click (9d4edd6) | **CLOSED** |
| Cosmile Foundation-only enforce (ddb2465) | **PASS_WITH_WATCH** |
| Cosmile mock retirement (f71c726·push·clean) | **PASS_WITH_WATCH** |
| SIASIU final sync | **PASS_WITH_WATCH** |
| Dual-Service Adapter 계약 (mock_fallback SUPERSEDED) | **PASS_WITH_WATCH** |
| 실 브라우저 UI 렌더 | **WATCH** |
| dual-adapter-fallback-eval.mjs (stale·mock_fallback 기대) | **WATCH** |
| BridgeMode 'mock' enum backward-compat 잔재 | **WATCH** |
| production readiness (dev/shadow·별도 승인) | **WATCH** |
| Foundation FRC provider observability 미노출 | **WATCH** |
| foundation-control 52 unpushed / docs 20 untracked | **WATCH** |
| SIASIU 6 unpushed / docs untracked | **WATCH** |
| SIASIU↔Cosmile fallback divergence 문서화 | **WATCH**(본 문서로 착수) |
| real Prisma cart write (5c50795·승인 근거) | **WATCH** |
| analytics MVP + Slack alert (외부전송/secret 승인) | **WATCH** |
| SIASIU adapter cutover (parallel→main) | **WATCH**(미착수) |
| Cosmile 신규 커밋 runtime E2E test | **UNKNOWN**(control 미실행) |
| Fable5 검증 원문 근거 | **UNKNOWN**(판정만 인지) |

## 9. 다음 작업 순서 (제안)
1. **stale eval 정리** — `dual-adapter-fallback-eval.mjs` 은퇴/개정(Foundation-only 502 fail-closed 기준) · BridgeMode 'mock' enum 정리 판단.
2. **UI browser render 확인** — Phase3 카드/이벤트·Foundation OFF 메시지 실 DOM(Cosmile 팀 또는 Fable5 UI-path).
3. **docs / push policy 정리** — foundation-control 52·SIASIU 6 unpushed·docs untracked → push 정책 정본화(Leo) · fallback divergence 문서 확정.
4. (그 다음) **order / revenue / margin loop 설계** — commerce 판단 loop. ★설계-우선·별도 승인·아래 §10 금지 준수.

## 10. 당분간 금지 (안정화 우선)
- 새 기능 바로 진입 금지(안정화·WATCH 정리 먼저).
- **checkout / order / payment 수정 금지**.
- **광고 / GA4 / Meta pixel 연결 금지**(외부 전송 별도 승인).
- **dashboard 금지**.
- **Foundation contract(SSC/FRC) 변경 금지**.
- (상속) production live·real user exposure·canonical write·Vault write = 별도 승인 release train.

## 무결성
Control foundation-control 코드 **0** · SIASIU/Cosmile 코드 미접촉(read+git show) · git add/commit/push **0** · migration 0 · 서버 잔여 0 · secret 미열람.
