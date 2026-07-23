# WU-0 Inventory Truth Projection Handoff

MISSION_ID: `COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1`
MODULE: `WU-0_INVENTORY_TRUTH_PROJECTION`
ACTOR: existing Cosmile Worker
SESSION: `cosmile:claude.0`
MODEL/EFFORT: Claude Opus 4.8/xhigh
SKILL: `/fable-builder`
REFERENCES: `implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`; `implementation-report-template` only at completion
RETURN_TO: `foundation-advisor`

## Pinned state

- Product worktree: `/home/leo/Project/.worktrees/Cosmile/COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1`
- Branch/HEAD: `implementation/cosmile-o1-operator-dashboard-core-v1-20260723` / `2aeb6e2afba8543af10fdf983b2876b0871d07fa`
- Integrated freeze: docs `42_P3_ADVISOR_INTEGRATED_TECHNICAL_FREEZE.md`
- Result: `advisor/jobs/COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1/44_WU0_INVENTORY_TRUTH_PROJECTION_RESULT.md`

## Pre-write gate

EXACT_PATHS:

1. `app/src/lib/order/contracts.ts`
2. `app/src/lib/order/repository.ts`
3. `app/src/lib/order/service.ts`
4. `app/scripts/o1_order_lifecycle.vitest.ts`
5. `app/scripts/o1_console_inventory_projection.dbtest.py`

EXACT_BEHAVIOR: add one category-safe read-only field to the existing operator order projection:

`inventoryDisposition: "reserved" | "committed_hold" | "released" | "unverified"`.

Repository derivation for the selected order only:

- at least one row and every reservation row `reserved` → `reserved`;
- at least one row and every row `committed` → `committed_hold`;
- at least one row and every row `released` → `released`;
- zero rows, mixed statuses, any `expired`, malformed/unknown result → `unverified`.

Expose no SKU, quantity, reservation ID, raw status array, provider/payment/customer identifier, or PII. The service forwards only the closed category. Existing order/payment/refund/inventory/shipment mutation semantics remain byte-identical.

SCHEMA_EFFECT: `NONE`.
NEW_ECONOMIC_AUTHORITY: `NONE`.
FEATURE_EXPANSION: `NONE`.

## Tests-first, focused only

`DELTA_ONLY_VERIFICATION: REQUIRED`.

1. Patch only the two test paths first.
2. Add one named Vitest block `WU-0 inventory disposition projection` proving all four closed categories, operator authorization unchanged, and no raw inventory fields in the view.
3. Add the focused disposable PostgreSQL test. It must use the already-local `postgres:16-alpine`, tmpfs, no host port, synthetic rows, counts/categories only, no pull/network, and blocking cleanup. It must fail RED until the repository contains the exact selected-order closed projection and pass GREEN afterward.
4. Run and preserve meaningful RED:
   - `./node_modules/.bin/vitest run scripts/o1_order_lifecycle.vitest.ts -t 'WU-0 inventory disposition projection' --config vitest.config.ts --reporter=verbose --cache=false`
   - `python3 scripts/o1_console_inventory_projection.dbtest.py`
5. Patch only the three source paths.
6. Run the identical two commands and require GREEN.

No assertion weakening, normalization, snapshot update, skipped failure, full file/suite, build, typecheck, generate, install, migration, provider/network, shared/prod DB, or additional command.

## Dependency/DB containment

- Reverify product/canonical `package.json` and lockfile bytes match the Advisor-recorded hashes.
- Worktree `app/node_modules` must be absent or contain only verified ignored disposable cache with no process using it; mismatch → HOLD.
- Create one temporary ignored symlink to `/home/leo/Project/Cosmile/app/node_modules`; do not write/copy/install/generate through it.
- Run exact Vitest RED/GREEN with cache disabled; remove the symlink immediately afterward.
- Record representative canonical Vitest package/binary hashes before/after and require equality.
- The disposable DB container/name/process/port must be absent after each test run. No output may contain raw synthetic IDs.

## Completion

Advisor must receive:

- exact RED/GREEN exit/count evidence;
- exact five-path diff;
- schema/economic/provider effects `0`;
- dependency/container/cache cleanup;
- one additive commit and non-force push;
- clean/upstream-equal Git state;
- compact result ≤80 lines, uncommitted in docs.

STOP before WU-1. Do not self-dispatch or self-review.
RETURN_TO: `foundation-advisor`.
