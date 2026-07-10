# 14 Fable5 Design Re-Review Result Pointer — Phase 2A Target/Boundary Plan

- TARGET_PROJECT: Cosmile (Phase 2A boundary prep design re-review)
- ROLE_ACTOR: Fable5 Reviewer (same session) · PASS: DESIGN_REVIEW re-review · LEVEL: 3
- VERDICT: **NEEDS_PATCH** (narrow: P-2 precision x2 only)
- Q1 PUBLIC path: **CLOSED** (effective-privilege 기술 주장 전부 정확·비자동 STOP+옵션 a~d·resolution enum·광역 revoke 금지)
- Q2 provisioning: PARTIAL — F-A `createuser --pwprompt`는 role을 생성하므로 "별도 자격 설정" 단계로 나열 불가(2단계 흐름과 모순·fail-safe) · F-B verifier의 서버 statement-log 캡처(log_statement=all에서 \password의 ALTER가 verifier째 로깅)에 대한 STOP/결정 경로 부재(boolean은 잡지만 출구 미정의)
- Q3 execution injection: **CLOSED** (6개 누출 경로 전부 + host-trust STOP)
- Minor: NOINHERIT required ✓ · catalog_read_verified ✓ · mirror IDENTICAL · Cosmile 41e5394(+67/−7)·fd dccedbb 검증
- RESULT_FILE: ../foundation-docs/runs/cosmile/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation/FABLE5_DESIGN_REREVIEW_RESULT.md
- POINTER_FILE: ../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation/14_FABLE5_DESIGN_REREVIEW_RESULT_POINTER.md
- ROUTING: NEEDS_PATCH -> Advisor 1~2줄 패치(F-A/F-B) -> 동일 세션 3차 재검수(질문 2개 고정)
- ADMIN_AND_PHASE2A: NOT_APPROVED 유지
- RUNTIME_COMMIT_STATUS: read-only
- RETURN_TO: Advisor
- NEXT_ACTOR: Advisor
