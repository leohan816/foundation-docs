# SIASIU CUTOVER-01 — Foundation-only Runtime — Implementation Report · 2026-07-03

> 작성: 샤슈(SIASIU) · SIASIU repo-local 구현 완료 · ★코드 push 0(Leo 승인 전) · docs mirror만 push.
> 기준: `foundation-control/docs/SIASIU_CUTOVER_01_IMPLEMENTATION_PLAN_20260703.md` · `SIASIU_FOUNDATION_CUTOVER_SPEC_20260703.md`
> Foundation baseline: `7cf53e8` (dev_shadow 8741 실측)

## A. 변경 파일
- 신규: `app/adapters/provider_flag.py` · `app/tests/test_cutover_01.py`
- 수정: `app/server.py`(/api/chat Foundation-only) · `app/adapters/consult_via_foundation.py`(brain fallback→foundation_unavailable) · `app/adapters/siasiu_semantic_adapter.py`(foundation_user_ref) · `app/adapters/siasiu_response_adapter.py`(trace_id·source=foundation_http) · `app/tests/test_dual_adapter_02a.py`(Foundation-only 정합)
- ★무변경: `brain.py`·`answer.py`·`/api/reset|checkins|pitch` · Foundation · Cosmile

## B. /api/chat 최종 runtime path
`User → /api/chat → PF.consultation_provider()(기본 foundation_contract) → CVF.consult() → SSC(raw_text+locale+foundation_user_ref+minimal) → Foundation POST /v1/consult_contract → FRC → RA.render(source=foundation_http·trace_id) → user`. Foundation 실패 → 502 foundation_unavailable.

## C. brain.chat retire 처리 방식
- `/api/chat` 상담 기본 경로에서 `brain.chat` 호출 **제거**. `consult_via_foundation`의 brain import/call **0**(주석만).
- brain.chat은 `legacy_dev_only`(env `SIASIU_CONSULTATION_PROVIDER=legacy` + `SIASIU_DEV_LEGACY_CONSULT=1`) **명시 dev 게이트**에서만 도달 — 기본/unknown/Foundation-down 경로 도달 0.
- brain.py 소스 **삭제 0**(존재·`/api/reset|checkins|pitch`는 brain 다른 함수 계속 사용).

## D. Foundation ON 테스트 결과
LIVE 5/5: source=`foundation_http` · trace_id non-null · brain.chat 호출 0 · safety→products/CTA/reco/continue 0 · 발진+추천+commerce→safety(제품 0). (02A LIVE 24/24도 정합)

## E. Foundation OFF 테스트 결과
DET: Foundation None → **502 `foundation_unavailable`** · source=`foundation_error` · friendly("죄송…") · products/CTA/reco/continue 0 (3케이스 PASS). brain.chat 호출 0 · mock/fake 0.

## F. brain.chat runtime 호출 0 증거
- 정적: `grep 'import brain|brain.chat('` in consult_via_foundation.py = **0**.
- 동적(spy): Foundation ON·OFF 각 consult()에서 `brain.chat` 호출 카운트 = **0**(test_cutover_01 + 02A).

## G. mock/fake fallback 0 증거
foundation_unavailable source=`foundation_error`(mock/fallback 문자열 0) · fake success 없음(502·임시답변 미제공 명시).

## H. products/recommendation/safety suppression 결과
products_allowed=false→제품/CTA 0 · recommendation_allowed=false→추천 0 · safety_first/block→allow_continue_use_permission=False · forbidden_expressions 전파. (LIVE+DET PASS)

## I. foundation_user_ref / PII 0 증거
- SSC service_context = `foundation_user_ref: furef_<sha256[:16]>`(opaque). raw user_id/name **미포함**(SSC blob에 "leo_customer_001" 부재 assert PASS).
- memory.db 주입 0(SSC에 allergy/avoid/memory 필드 0 assert PASS).

## J. trace_id 전파 결과
FRC `trace_id` → render 출력 `trace_id`(non-null·live 확인) · Foundation 실패 시 null(정직).

## K. 테스트 결과
- `test_cutover_01.py`: **DET 16/16 + LIVE 5/5 = ALL_PASS**.
- `test_dual_adapter_02a.py`(갱신): **LIVE 24/24 + FALLBK 9/9 = ALL_PASS**.
- Foundation down 시 LIVE SKIP≠PASS(exit 2·green 위장 방지).

## L. docs mirror 경로
- 원본: `/home/leo/Project/SIASIU/docs/SIASIU_CUTOVER_01_IMPLEMENTATION_REPORT_20260703.md`
- mirror: `foundation-docs/설계문서/siasiu/SIASIU_CUTOVER_01_IMPLEMENTATION_REPORT_20260703.md`

## M. foundation-docs commit hash
(아래 실행 결과에 기재)

## N. SIASIU repo local commit hash
(아래 실행 결과에 기재·★push 0)

## O. push 여부
- SIASIU 코드: **push 0**(Leo 승인 전·로컬 commit만).
- foundation-docs 문서 mirror: push 허용(실행).

## P. 남은 WATCH
1. Foundation down = 상담 완전 실패(brain 안전망 제거) → Foundation 가용성이 SIASIU 상담 SLA 직접 결정(모니터링/HA 필요).
2. Response Adapter는 아직 **경량 프레이밍**(full re-voicing = CUTOVER-02) — 페르소나/다국어 완성도는 후속.
3. `/api/chat` 응답에 502 + additive 필드 → 프론트 소비 확인 필요.
4. 02A 테스트를 Foundation-only로 갱신(shadow_compare 폐기·source=foundation_http·brain fallback→502) — 필요 결과(허용파일 외였으나 정책 전환의 직접 귀결).
