# Worker Handoff — M1 Space Separation and Truthful Labels

```text
MISSION: COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1
MODULE: M1
BASE: 3dc5129b573237a85f34bfa65a329a299d31fef2
WORKER: existing Cosmile Worker / Claude Opus 4.8 [1m] / xhigh
ECONOMIC/DB/PROVIDER EFFECT: 0
RETURN_TO: foundation-advisor
```

Read `16_ADVISOR_EXECUTION_FREEZE.md`. Load `/fable-builder` with `implementation-execution`, `contract-to-code-mapping`, and `test-design-before-code`; load `implementation-report-template` only for return.

## Exact path ceiling

1. `app/src/app/console/layout.tsx`
2. `app/src/app/console/page.tsx`
3. `app/src/app/console/jobs/page.tsx`
4. `app/src/components/console/ConsoleWorkspace.tsx`
5. `app/src/components/console/ConsoleNav.tsx`
6. `app/src/components/operator/OperatorShell.tsx`
7. `app/src/app/dashboard/layout.tsx`
8. `app/src/app/dashboard/page.tsx`
9. `app/src/app/lab/layout.tsx`
10. `app/src/app/lab/page.tsx`
11. `app/scripts/o1_console_space_contract.vitest.ts`

No other product path.

## One-time mission-local dependency boundary

If `app/node_modules` is absent, verify package and lockfile are unchanged from base, create an owner-only mission npm cache, then run exactly:

`npm ci --ignore-scripts --no-audit --no-fund --cache <mission-owner-only-cache>`

from the mission worktree `app/`. No manifest/lock/config change, global/shared tree, install script, generate, build or typecheck. Verify a real worktree-local ignored `node_modules`, no symlink outside, package/lock unchanged. Retain it only for later mission modules; remove the cache after successful install.

## Tests first

1. Add only `o1_console_space_contract.vitest.ts`.
2. Run exactly that file and preserve meaningful RED proving current `/console` still claims operations and target space roots/truth labels are missing.
3. Apply the minimum changes within the ten source paths.
4. Run the identical focused file and require GREEN.

Required behavior:

- Global real-URL switcher order: Console (`대화·검토`), Dashboard (`운영 현황`), Lab (`후보 레지스트리`), with accessible current-page state.
- `/console` is Korean-first conversation/planning/evidence/approval only. It says `V0 MOCK · 실제 서비스 제어 없음`; no operational overview tiles. Empty/new entry truthfully says the start surface is not yet connected.
- Console request button says `요청 기록`; current artifacts and approve/reject remain explicitly mock; execute/publish remain disabled.
- `/console/jobs` is explicitly mock/non-live.
- Dashboard root exists but only states that reviewed operational modules are being connected and authority is not granted by screen access; it exposes no read/action yet.
- Lab root exists and is explicitly read-only/pending registry; no action.
- Reuse current neutral shell/tokens; no redesign.

## Prohibited

No schema/migration/DB/runtime/provider/browser; no operational O1 component move; no capability/grant code; no old route delete/redirect; no broad test/build/typecheck/generate; no product path beyond the ceiling.

Commit once with truthful attribution, non-force push the new product branch and set upstream. Return compact evidence plus two docs-only result files:

- `21_M1_WORKER_RESULT.md` (≤60 lines)
- `22_M1_WORKER_POINTER.md` (≤30 lines)

Then STOP.
