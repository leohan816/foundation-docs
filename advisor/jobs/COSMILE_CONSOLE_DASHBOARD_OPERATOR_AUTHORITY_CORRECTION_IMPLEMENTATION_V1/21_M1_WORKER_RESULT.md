# 21 M1 Worker Result — Space Separation and Truthful Labels

MISSION `COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1` · MODULE M1. Handoff 20 verified (blob `c63bc24c`, sha256 `5e582088`, docs `40c0c218`). Base `3dc5129` → commit `00029eb6efdb5de4402219963b91de1c03889b98`. **Economic/DB/provider effect: 0. NO_SCHEMA.**

## Tests-first (focused RED→GREEN)
`./node_modules/.bin/vitest run scripts/o1_console_space_contract.vitest.ts`
- RED (pre-patch): exit 1, **7 failed** — current `/console` root still claims operations (`운영 콘솔`, `CONSOLE_NAV` tiles, `o1OperatorForCustomer`), workspace button `전송`, and the Dashboard/Lab space roots + switcher + truthful labels are missing.
- GREEN (post-patch): exit 0, **7 passed**. Missing roots read as `""` (clean assertion RED, not a collection error).

## Applied within the exact ceiling (10 of 11 paths; `console/layout.tsx` needed no change)
- `components/operator/OperatorShell.tsx` (new): `SpaceSwitcher` (real-URL landmark, order Console `대화·검토` / Dashboard `운영 현황` / Lab `후보 레지스트리`, `aria-current="page"`) + neutral `OperatorShell` frame (reuses current tokens; no redesign).
- `components/console/ConsoleNav.tsx`: `ConsoleShell` mounts `SpaceSwitcher`.
- `app/console/page.tsx`: conversation-only root — removed operational overview tiles / `CONSOLE_NAV` / `o1OperatorForCustomer` / `운영 콘솔`; shows `새 대화 시작 화면이 아직 연결되지 않았습니다` + `V0 MOCK · 실제 서비스 제어 없음`; keeps `requireConsoleUser`.
- `components/console/ConsoleWorkspace.tsx`: request button `전송` → `요청 기록`; persistent `V0 MOCK · 실제 서비스 제어 없음`; approve/reject stay mock; execute/publish stay disabled/mock.
- `app/console/jobs/page.tsx`: banner now leads with `V0 MOCK · 실제 서비스 제어 없음` (execute/publish inactive/mock).
- `app/dashboard/layout.tsx` + `app/dashboard/page.tsx` (new): `OperatorShell` frame + truthful placeholder — `검토된 운영 모듈을 연결하는 중입니다`, `화면 접근으로 운영 권한이 부여되지 않습니다`, `운영 권한 계약 대기`; **no read/action** (no prisma/fetch/operator/button).
- `app/lab/layout.tsx` + `app/lab/page.tsx` (new): `OperatorShell` frame + `읽기 전용 · 준비 중인 후보 레지스트리` — no action/onClick/read source.
- `app/scripts/o1_console_space_contract.vitest.ts` (new): source-contract.

## Closure
- One-time dependency boundary: `npm ci --ignore-scripts --no-audit --no-fund --cache <owner-only>` from `app/`; package/lock byte-unchanged; real worktree-local ignored `node_modules` (not a symlink); mission cache removed after install.
- `git diff --check` clean; staged set = exactly the ceiling subset (no out-of-ceiling path; no `node_modules`/pkg/lock delta). No schema/migration/DB/runtime/provider/browser; no O1 component move; no capability/grant code; no route delete/redirect; no build/typecheck/generate/broad test.
- Git: one truthful commit `00029eb` (parent `3dc5129`); non-force push with upstream set on `origin/implementation/cosmile-console-dashboard-authority-correction-v1-20260724`; HEAD==upstream, clean.

RETURN_TO: foundation-advisor. STOP.
