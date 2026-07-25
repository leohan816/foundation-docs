# M3 DASHBOARD SHELL — WORKER HANDOFF

MISSION_ID: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1`
MODULE: `M3_DESKTOP_DASHBOARD_SHELL`
ACTOR: existing Cosmile Worker
MODEL/EFFORT: `claude-opus-5/xhigh`
SKILL: `/fable-builder`
REFERENCES: `implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`; `implementation-report-template` only at return

## Exact subject

- Product worktree: `/home/leo/Project/.worktrees/Cosmile/COSMILE_CORE_OPERATIONS_DASHBOARD_V1`
- Branch: `implementation/cosmile-core-operations-dashboard-v1-20260725`
- Base HEAD: `6486019e0968de5671e43521e5cfb40d03b0bdca`
- Frozen design: docs `5c2312572f6438a7301b6e824e4907398b25bd00`
- Public runtime is a separate worktree/process and must not be touched.

## Exact path ceiling

1. `app/src/app/layout.tsx`
2. `app/src/components/operator/OperatorShell.tsx`
3. `app/src/app/dashboard/layout.tsx`
4. `app/scripts/o1_core_dashboard_shell.vitest.ts` (new)

No fifth product path.

## Tests first

Add the focused source-contract test first. It must prove:

1. root layout classifies `/console`, `/dashboard`, and `/lab` as operator spaces before mounting any Storefront provider/chrome;
2. Dashboard layout selects operations navigation, while Lab/Console behavior is not rewritten;
3. exact left-nav order is Dashboard, Orders, Customers, Products, Inventory, Fulfillment, Payments & Refunds, Support, Reconciliation, Audit, Settings;
4. active rows use only bounded `/dashboard` routes; unsupported rows are inert with `aria-disabled`, no fabricated destination/action;
5. shell is desktop-first and responsive, contains the persistent synthetic non-production label, 44px/focus/reduced-motion semantics, and no device/status/customer header/bottom tabs/cart/shipping/promo chrome;
6. no form, data fetch, Prisma, authorization shortcut, mutation, provider, or economic behavior is introduced.

Run the exact named M3 test and preserve meaningful RED. Then implement only:

- root `operatorSpace = /console | /dashboard | /lab` exclusion from Storefront chrome;
- an `operations` navigation mode in the existing neutral `OperatorShell`;
- desktop left rail plus bounded mobile facts/navigation presentation;
- Dashboard layout opts into that mode; Console/Lab remain their existing spaces.

The M3 shell may declare `/dashboard/orders` as the already-frozen M4 destination, but must not implement that page in M3. Customers, Products, and aggregate Inventory remain inert. No new read or action.

Run the identical focused test for GREEN. Run `git diff --check` and exact four-path diff only.

## One dependency setup ceiling

Worktree `app/node_modules` is absent. Before the RED command only, allow exactly one lockfile-pinned:

`npm ci --ignore-scripts --no-audit --no-fund --cache /home/leo/Project/.mission-tmp/COSMILE_CORE_OPERATIONS_DASHBOARD_V1/npm-cache`

Requirements: worktree `app/` only; real local ignored `node_modules`; no symlink/copy/shared-tree write; no manifest/lock/config change; no lifecycle scripts, generate, build, typecheck, broad test, DB, runtime, provider, or public-host action. Preserve node_modules for later frozen modules; the mission-local npm cache is cleanup-only later.

## STOP conditions

STOP on a fifth product path, schema/migration need, package/lock mutation, storefront redesign, new read/action/authority/economic behavior, public runtime effect, or dependency setup mismatch.

On PASS, commit once with truthful attribution, non-force push, verify clean/upstream-equal, write only compact Worker result/pointer under the existing mission job, and STOP before M4.
