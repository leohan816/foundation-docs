# WU-5 R1 Login/Layout Guard Correction Result

MISSION_ID: COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1
WORK_UNIT: WU-5_R1_LOGIN_LAYOUT_GUARD_CORRECTION
ACTOR: existing Cosmile Worker via authorized Codex fallback
PROJECT/REPOSITORY: Cosmile `/home/leo/Project/.worktrees/Cosmile/COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1`
BRANCH: implementation/cosmile-o1-operator-dashboard-core-v1-20260723
BASE: f4ecc22c959aa33fe2f090b3748d8f66f24c2e21
HEAD: 8ef0529651f570c58772a17f74e270066a51ae41
HANDOFF: advisor/jobs/COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1/55_WU5_R1_LOGIN_LAYOUT_GUARD_CORRECTION_HANDOFF.md
DOCS_COMMIT: 2ff4f2d376b19cbcd534fd82c8074d33ff1d4de0
HANDOFF_BLOB: bfa6784647cb884b73c9782ef73b94b9447ee2a0
HANDOFF_SHA256: 3d27e9fdc45ce8467d9c2a496149c3534af3cf0acaa0e04d9c41a4f73bdbe707
CLAIM: IMPLEMENTED_NOT_REVIEWED
RESULT_RECORD: UNCOMMITTED_BY_INSTRUCTION

1. 구현 범위: shared Console layout의 redirecting guard만 read-only session lookup으로 교체하고 unauthenticated child passthrough를 추가했다. 로그인/guard/session/Nav/다른 route 동작은 변경하지 않았다.

2. 수정 파일:
   - `app/scripts/o1_console_shell_ui.vitest.ts`: login child, read-only lookup, unauthenticated branch, authenticated single shell, noindex assertions 추가.
   - `app/src/app/console/layout.tsx`: `getConsoleUser`를 `@/lib/console/session`에서 사용하고 null session이면 children만 반환.

3. 수정하지 않은 파일: login page, guard/session modules, ConsoleNav, route tree, API/runtime/auth behavior, schema/DB, provider/economic code. Exact two-path scope와 일치한다.

4. 계약 매핑:

| 계약 | 코드/테스트 |
|---|---|
| layout redirect guard 부재 | `layout.tsx`; focused negative assertion |
| existing read-only session lookup | `getConsoleUser` import/call; focused positive assertion |
| unauthenticated login child passthrough | null-session fragment branch; focused assertion |
| authenticated single shell/noindex | one `ConsoleShell` plus metadata; focused assertions |

5. 계약 이탈: 없음. Advisor live evidence로 import 정본을 `@/lib/console/guard`에서 `@/lib/console/session`으로 교정했다. push 전 unpushed commit을 amend해 한 commit으로 유지했다.

6. 테스트 결과:
   - pure RED: 0/1, 1 failed + 6 name-filter skipped, exit 1.
   - corrected GREEN: 1/1, 1 passed + 6 name-filter skipped, exit 0.
   - 명령: `./node_modules/.bin/vitest run scripts/o1_console_shell_ui.vitest.ts -t 'allows the unauthenticated login child without a layout redirect loop' --config vitest.config.ts --reporter=verbose --cache=false`
   - env: approved temporary canonical dependency symlink; 즉시 제거. package/lock/Vitest hashes 동일.
   - db-touch/regression/build/typecheck: 미실행(금지 범위).
   - test oracle 변경: live source evidence에 따라 import 기대값만 `session` 정본으로 교정; assertion 의미 약화 없음.

7. 무엇을 증명했는가: source-contract 수준에서 layout이 redirecting guard를 호출하지 않고, null session은 child를 통과시키며, session 존재 시 현재 role로 정확히 한 shell을 감싸고 noindex를 유지함을 증명했다.

8. 무엇을 증명하지 않았는가: browser login flow, live session behavior, Next build/typecheck, full WU-5 regression은 증명하지 않았다.

9. 남은 risk: pure source-contract이므로 실제 Next layout composition은 독립 integration 검수에 의존한다.

10. 다음 검수 질문:
   - `/console/login` 무세션 요청이 실제 runtime에서 redirect 없이 렌더되는가?
   - 인증된 non-login page가 outer shell을 정확히 한 번 유지하는가?
   - 각 non-login page의 독립 `requireConsoleUser` guard가 우회되지 않는가?

11. Git/경계: one amended-before-push commit, non-force push 성공, HEAD=upstream, clean, parent=base, exact two paths, no co-author trailer. DB/schema/secret/env/PII/runtime/public/live/provider/economic/main/force-push effects 0. Agent/sub-agent/delegation/browser dispatch/self-review/automatic next mission 0.

12. rollback: `git revert 8ef0529651f570c58772a17f74e270066a51ae41` 후 non-force push한다.

WORKER_RESULT_POINTER
RESULT_FILE: advisor/jobs/COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1/56_WU5_R1_LOGIN_LAYOUT_GUARD_CORRECTION_RESULT.md
FOUNDATION_DOCS_COMMIT: UNCOMMITTED_BY_INSTRUCTION
TARGET_COMMIT: 8ef0529651f570c58772a17f74e270066a51ae41
PUSH_STATUS: NON_FORCE_PUSHED_CLEAN_UPSTREAM_EQUAL
RETURN_TO: foundation-advisor
PROPOSED_NEXT_ACTOR: foundation-advisor
STOP
