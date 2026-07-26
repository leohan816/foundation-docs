# Worker handoff — M5C Dashboard acceptance correction

MISSION: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1`
MODULE: `M5C_DASHBOARD_ACCEPTANCE_CORRECTION`
DECISION: `PROCEED_WITH_LIMITS`
RETURN_TO: `foundation-advisor`

## Anchors

- Product worktree: `/home/leo/Project/.worktrees/Cosmile/COSMILE_CORE_OPERATIONS_DASHBOARD_V1`
- Branch/base: `implementation/cosmile-core-operations-dashboard-v1-20260725@c5b7edd79dfe995c5be5e1fdc84cccf696f6b8a9`
- Design: foundation-docs `8e4f8cd77abdf72753a209d0752c970180a739cb`, `87_DESIGNER_DASHBOARD_ACCEPTANCE_CORRECTION_CONTRACT.md`
- Founder screenshot disposition: the complete 11-row `OPERATIONS_NAV` horizontal desktop row is failed UX. Desktop must show it as a persistent 250px LEFT sidebar while Dashboard body scrolls. Only Console/Dashboard/Lab remain in the top switcher.

## Runtime and skill

- Existing Cosmile Worker only: Opus 5/xhigh, exact worktree/CWD, `/fable-builder`.
- Read `implementation-execution`, `contract-to-code-mapping`, and `test-design-before-code`; read `implementation-report-template` only for the result.
- No other actor/runtime, broad read, or concurrent writer.

## Exact product path ceiling

1. `app/src/components/operator/OperatorShell.tsx`
2. `app/src/app/dashboard/page.tsx`
3. `app/scripts/o1_core_dashboard_shell.vitest.ts`
4. `app/scripts/o1_core_dashboard_reads.vitest.ts`

No fifth product path. Result docs only:

- `92_M5C_DASHBOARD_ACCEPTANCE_CORRECTION_WORKER_RESULT.md`
- `93_M5C_DASHBOARD_ACCEPTANCE_CORRECTION_WORKER_POINTER.md`

## Contract-to-code mapping

| Contract | Code landing | Focused proof |
|---|---|---|
| Desktop complete nav is a persistent 250px left rail | `OperatorShell.tsx`: fixed viewport flex column; global switcher/truth warning remain above; content region owns remaining height; nav is 250px/left/full-height at `lg`; `main` alone scrolls vertically | shell test proves the desktop layout/scroll classes and all 11 rows |
| Horizontal operations access exists only below desktop | preserve the current `<lg` horizontal strip and 44px/focus/reduced-motion floor; `lg` changes it to a block rail | shell test proves responsive override and no Storefront chrome |
| Unsupported states remain truthful | Customers, Products, Payments & Refunds = `NOT_IMPLEMENTED`; Inventory = `UNAVAILABLE`; all inert/no href/onClick | shell and reads tests |
| Action queue precedes summary | `dashboard/page.tsx`: render D01/D03/D05 as three concise action rows, then compact operational truth summary | reads test proves order and removes repeated seven-field ledger presentation |
| Existing reads only | preserve the same capability order, same-principal checks, and exactly one each of request/order/reconciliation reads | reads test |
| Recent orders reuse is safe and bounded | reuse only the already-returned order result, max 3 rows, only `orderNo` and `dbStatus`; no second call or broader field; omit rows on non-confirmed state | reads test proves one call, bound, and field ceiling |
| Unsupported facts never become zero | Inventory/audit remain explicit `UNAVAILABLE`; six state labels remain exact Korean pairs | reads test |

No route, API, repository, schema, DB, auth, capability, command, provider, economic, Console, Lab, or Storefront behavior change.

## Tests-first and exact commands

1. Patch only the two focused tests to encode this contract. Do not delete prior boundary assertions or weaken oracles.
2. From `app/`, run exactly once and preserve meaningful RED:
   `./node_modules/.bin/vitest run scripts/o1_core_dashboard_shell.vitest.ts scripts/o1_core_dashboard_reads.vitest.ts`
3. Patch only the two source paths.
4. Run the identical command exactly once and require GREEN.
5. Run `git diff --check` and exact four-path containment inspection only.

No install, generate, typecheck, build, DB, browser, runtime, network, provider, broad test, or retry. A tool/environment failure or need for another path returns HOLD.

## Completion

- Economic/provider/DB effect: `0`.
- One product commit and non-force push only after GREEN.
- Result ≤80 lines, compact evidence and exact RED/GREEN counts.
- Report actual model/effort/skill refs, exact changed paths, unchanged boundaries, Git clean/upstream equality, and unproven browser acceptance.
- STOP; do not deploy or start another module.
