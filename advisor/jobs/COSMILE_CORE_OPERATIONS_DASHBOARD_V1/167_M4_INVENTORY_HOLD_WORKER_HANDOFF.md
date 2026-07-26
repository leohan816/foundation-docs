# Worker handoff — M4 Inventory/HOLD

MISSION: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1`  
BASE: product `33ff6a7a841affb8d4c984beb4b251e416e38286`, clean/upstream-equal.  
SKILL: `/fable-builder`; use `implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`; report template only at completion.

## Frozen outcome

Implement one read-only `/dashboard/inventory` surface over existing O1 truth:

1. Gate in order: O1 runtime enabled → `dashboard.operations.read` → existing definition-only `catalog.read` → existing definition-only `inventory_hold.read`; all successful grants must resolve to the same `OperatorPrincipal`.
2. Call the existing storefront `o1EligibleCatalog(process.env)` exactly once. It is the sole product identity/eligibility source.
3. A pure bounded service accepts at most 100 eligible catalog rows and calls one injected aggregate repository with only their Cosmile SKU ids; an empty eligible catalog performs zero aggregate reads.
4. The repository performs exactly one parameterized read-only query over `CommerceSku` plus active `InventoryReservation` states `reserved|committed`, limited to the supplied eligible SKU set. Return only SKU id, nonnegative integer `stock`, reserved quantity, and committed quantity.
5. Every eligible SKU must have exactly one valid repository row. Unknown, duplicate, missing, malformed, negative/noninteger, or `reserved + committed > stock` data fails the whole result closed. Never turn an unavailable read into zero.
6. Display `CommerceSku.stock` only as the existing O1 display baseline (`표시 기준 재고`). Do not derive or claim available-to-sell, physical warehouse stock, restoration, or any other arithmetic. `committed` is shown separately as `확정/HOLD`; it is never inferred sellable.
7. Page shows only Foundation display name, Cosmile SKU, display stock baseline, reserved units, and committed/HOLD units. Stable five-column table and truthful zero body; no money/customer/order/provider/internal reservation id.
8. Activate only the existing Inventory nav row at `/dashboard/inventory`; bounded Dashboard href total becomes 10. Payments remains inert.
9. Remove only the now-stale D04 Inventory entry from Dashboard home `EVIDENCE_GAPS`; do not add a home query, card, KPI, action, or fabricated zero. D07 Audit gap remains unchanged.
10. No form/button/filter/fetch/command/mutation. No grant creation, schema, migration, DB execution/write, provider/economic/runtime/browser action, mock row, alternate catalog, or warehouse claim.

## Exact path ceiling

1. `app/src/lib/operator/inventoryRead.ts` (new)
2. `app/src/lib/operator/inventoryReadRepository.ts` (new)
3. `app/src/app/dashboard/inventory/page.tsx` (new)
4. `app/src/app/dashboard/page.tsx`
5. `app/src/components/operator/OperatorShell.tsx`
6. `app/scripts/o1_core_dashboard_inventory.vitest.ts` (new)
7. `app/scripts/o1_core_dashboard_reads.vitest.ts`
8. `app/scripts/o1_core_dashboard_shell.vitest.ts`

No ninth path. Do not edit the capability catalog: both capabilities already exist and membership grants nothing.

## Tests first and command inventory

First patch only the three test paths. Tests must cover:
- bounds, unique eligible identity, valid stock/status quantities, zero repository call on empty;
- exactly one aggregate call with eligible SKUs only;
- missing/unknown/duplicate/malformed/over-capacity rows fail closed;
- repository error is categorical with no raw leak;
- exact parameterized read-only query and prohibited fields/writes;
- gate order, same principal, one real catalog call, no mock;
- stable Korean summary/five-column table/zero state, no derived available-to-sell value, action, or raw identifier;
- nav total 10, Inventory active, Payments inert;
- D04 removed and D07 retained without adding a home read.

Run once for RED, then implement, then run the identical command once for GREEN:

`cd app && ./node_modules/.bin/vitest run scripts/o1_core_dashboard_inventory.vitest.ts scripts/o1_core_dashboard_shell.vitest.ts scripts/o1_core_dashboard_reads.vitest.ts scripts/operator_authority_contract.vitest.ts --config vitest.config.ts`

On PASS only: `git diff --check`, exact eight-path/no-effect inspection, one commit, one non-force push, compact result/pointer, STOP. First failure is HOLD; no diagnostic/rerun. M5 is not started.
