# P3 Worker Technical Mapping Handoff

MISSION_ID: `COSMILE_O1_STOREFRONT_AND_CUSTOMER_ACCOUNT_COMPLETION_V1`
PHASE: `P3_READ_ONLY_TECHNICAL_MAPPING`
PRODUCT_WRITE: `PROHIBITED`

## Pins and skill

- Product worktree: `/home/leo/Project/.worktrees/Cosmile/COSMILE_O1_STOREFRONT_AND_CUSTOMER_ACCOUNT_COMPLETION_V1`
- Product head: `68f13b8a4e7d2561efa7ab36e647c897514480c4`
- Design delta review: result 37, `PASS`
- Actor: existing Cosmile Worker, Claude Opus 4.8/xhigh
- Load `/fable-builder` with `contract-to-code-mapping` only. Current Agent Office and repository rules remain authoritative.

## Exact read ceiling

- `app/docs/COSMILE_O1_STOREFRONT_CUSTOMER_ACCOUNT_COMPLETION_DESIGN.md`
- `app/src/app/globals.css`
- `app/src/app/layout.tsx`
- `app/src/app/page.tsx`
- `app/src/app/shop/page.tsx`
- `app/src/app/products/[id]/page.tsx`
- `app/src/app/cart/page.tsx`
- `app/src/app/account/page.tsx`
- `app/src/app/account/orders/page.tsx`
- `app/src/app/orders/[orderId]/page.tsx`
- `app/src/components/layout/AppHeader.tsx`
- `app/src/components/layout/CategoryNav.tsx`
- `app/src/components/layout/MallTabs.tsx`
- `app/src/components/category/CategoryDrawer.tsx`
- `app/src/components/product/ProductCartFab.tsx`
- `app/src/components/product/AddToCartButton.tsx`
- `app/src/components/product/CartList.tsx`
- `app/src/components/commerce/O1TossCheckout.tsx`
- `app/src/components/commerce/O1OrderStatus.tsx`
- `app/src/components/commerce/O1OrderServiceRequest.tsx`
- `app/scripts/o1_browser_runtime_contract.vitest.ts`
- `app/scripts/o1_browser_runtime_property.vitest.ts`
- `app/scripts/o1_order_service_request_browser.vitest.ts`

Use committed P1 results 17 and 20 as evidence. Do not read a sixth surface family, API/runtime/repository/schema/migration/provider/auth/console/legacy implementation, or broad test inventory. If a required fact lies outside this ceiling, return its exact path and question as `STOP_REQUIRED`; do not open it.

## Required mapping

Return the smallest executable module sequence, no more than four modules. For each module give only:

- exact changed/new paths;
- exact O1-ON behavior and O1-OFF preservation;
- existing components/contracts reused;
- test-first insertion anchor and exact named focused command;
- expected meaningful RED;
- expected GREEN acceptance facts;
- no-schema/no-economic/no-auth-or-provider-semantics statement;
- rollback and STOP condition.

Required coverage:

1. shared O1 customer navigation plus home/catalog/detail truth;
2. add-to-cart/cart/checkout pending-failure-recovery coherence without changing checkout economics;
3. account/order history/detail/progress/cancellation-support projection coherence without timeline/API expansion;
4. bounded responsive/accessibility/loading-empty-error-not-found treatment only where the design contract requires it.

Flag any design criterion that cannot be implemented from existing client/server outcomes. Do not invent a new route family, state, API, projection, schema, test framework, broad gate, or browser/provider runtime.

## Output

Write only:

- `advisor/jobs/COSMILE_O1_STOREFRONT_AND_CUSTOMER_ACCOUNT_COMPLETION_V1/41_P3_WORKER_TECHNICAL_MAPPING_RESULT.md`
- `advisor/jobs/COSMILE_O1_STOREFRONT_AND_CUSTOMER_ACCOUNT_COMPLETION_V1/42_P3_WORKER_TECHNICAL_MAPPING_POINTER.md`

Result <=80 lines. Leave files uncommitted. No product edit, patch, test, build, typecheck, DB/runtime/browser/provider/network, commit, push, or next module.

RETURN_TO: `foundation-advisor`
STOP.
