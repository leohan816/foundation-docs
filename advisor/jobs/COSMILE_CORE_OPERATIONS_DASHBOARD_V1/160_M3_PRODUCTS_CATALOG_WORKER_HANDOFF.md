# Advisor handoff — M3 Products/Catalog

MISSION: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1`
BASE: product `a177003e6b272c5295b1b4f9bed7bb4fbc56e960`, clean/upstream-equal
ACTOR: existing `cosmile:claude.0` Worker · Opus 5/xhigh · exact mission CWD
SKILL: `/fable-builder` with `implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`

## Frozen outcome

Make `/dashboard/products` a read-only operations page over the same `o1EligibleCatalog(process.env)` used by the storefront. Add definition-only `catalog.read`; membership grants nothing and this module writes no grant.

The page requires, in order: O1 runtime enabled → `dashboard.operations.read` → `catalog.read` for the same `OperatorPrincipal` → exactly one eligible-catalog read → at most one bounded O1 order-line aggregate read.

For each eligible SKU show only: Foundation snapshot display name, Cosmile SKU, authoritative positive-integer KRW price, truthful sellable label (eligibility already proves it), and persisted O1 order-record/order-unit counts. Product detail uses the existing encoded `/products/<foundationProductId>` route. Counts mean persisted O1 order lines, not sales/revenue. Empty and unavailable states remain distinct.

## Exact nine-path ceiling

1. `app/src/lib/operator/capability.ts`
2. `app/src/lib/operator/catalogRead.ts` (new)
3. `app/src/lib/operator/catalogReadRepository.ts` (new)
4. `app/src/app/dashboard/products/page.tsx` (new)
5. `app/src/components/operator/OperatorShell.tsx`
6. `app/scripts/o1_core_dashboard_products.vitest.ts` (new)
7. `app/scripts/o1_core_dashboard_shell.vitest.ts`
8. `app/scripts/o1_core_dashboard_reads.vitest.ts`
9. `app/scripts/operator_authority_contract.vitest.ts`

## Contract details

- Catalog source is exactly `o1EligibleCatalog`; do not import legacy/mock `foundationProductClient`, mock products, fixture rows, or another bundle.
- Pure `catalogRead` validates 1–100 bounded eligible rows, unique SKU identity, nonblank product/name/hash, positive integer price, and the repository result. Repository is called once with only eligible SKUs; empty catalog performs zero aggregate reads.
- Aggregate repository performs one parameterized read-only query over `OrderItem` joined to `Order`, filtered by supplied SKU set and `Order.orderNo LIKE 'O1-%'`; return nonnegative integer `orderCount` and `unitsOrdered`. No amount/customer/payment/refund/provider/PII field.
- Unknown/duplicate/malformed aggregate rows fail the whole result closed. Missing aggregate means confirmed zero for that eligible SKU.
- Activate only the existing `상품` nav row; bounded nav href total becomes `9`. Customers remains active; Inventory and Payments remain inert.
- Page has visible Korean H1/description/provenance, derived summary cards, stable headers, and a table-body zero panel. No filter, button, form, command, mutation, invented KPI, or raw internal hash.

## Tests-first commands

Run RED once, implement, then the identical GREEN once:

```bash
cd app && ./node_modules/.bin/vitest run scripts/o1_core_dashboard_products.vitest.ts scripts/o1_core_dashboard_shell.vitest.ts scripts/o1_core_dashboard_reads.vitest.ts scripts/operator_authority_contract.vitest.ts --config vitest.config.ts
```

On PASS: exact nine-path diff + `git diff --check`; one truthful commit/non-force push; write only `161_M3_PRODUCTS_CATALOG_WORKER_RESULT.md` and `162_M3_PRODUCTS_CATALOG_WORKER_POINTER.md`; STOP.

STOP on schema/migration, tenth path, grant/DB write, new truth source, unsupported metric, PII, provider/economic/runtime/browser action, test weakening, failed GREEN, or broader command. No install/generate/build/typecheck/full suite/public-preview action.
