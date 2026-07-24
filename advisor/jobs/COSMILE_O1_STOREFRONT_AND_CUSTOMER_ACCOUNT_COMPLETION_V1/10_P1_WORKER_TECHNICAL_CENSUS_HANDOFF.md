# P1 Worker Handoff — Technical As-Built Census

MISSION_ID: `COSMILE_O1_STOREFRONT_AND_CUSTOMER_ACCOUNT_COMPLETION_V1`
ACTOR: existing Cosmile Worker, `cosmile:claude.0`
MODE: read-only product census; no implementation
PRODUCT_BASE: `51ef5f2b4d576979f4b432f114151755f02f3385`
PRODUCT_WORKTREE: `/home/leo/Project/.worktrees/Cosmile/COSMILE_O1_STOREFRONT_AND_CUSTOMER_ACCOUNT_COMPLETION_V1`
DOCS_WORKTREE: `/home/leo/Project/.worktrees/foundation-docs/COSMILE_O1_STOREFRONT_AND_CUSTOMER_ACCOUNT_COMPLETION_V1`

## Required entry

- Read current Agent Office `AGENTS.md`, `CLAUDE.md`, Team operating model, Worker role, RUN protocol, result protocol, product/app rules, and this exact committed handoff.
- Load `/fable-builder`; use only `contract-to-code-mapping` for this read-only mapping.
- Live-confirm `Claude Opus 4.8/xhigh`, Worker role, exact product worktree, clean base, and no concurrent product writer.

## Exact product read ceiling

- `app/src/app/{layout.tsx,page.tsx,shop/page.tsx,products/[id]/page.tsx,cart/page.tsx,account/page.tsx,account/orders/page.tsx,orders/[orderId]/page.tsx}`
- `app/src/app/api/{cart/**,o1/checkout/**,o1/orders/**,auth/google/**,auth/logout/route.ts}`
- `app/src/components/layout/{AppHeader.tsx,CategoryNav.tsx}`
- `app/src/components/product/{AddToCartButton.tsx,CartList.tsx,ProductCard.tsx,ProductCarousel.tsx,ProductCartFab.tsx}`
- `app/src/lib/{storefront.ts,cart.ts,checkout.ts}`
- `app/src/lib/auth/{contracts.ts,session.ts}`
- `app/src/lib/order/{contracts.ts,o1OrderServiceRequestBadge.ts,serviceRequestContracts.ts}`
- `app/scripts/{o1_browser_runtime_contract.vitest.ts,o1_browser_runtime_property.vitest.ts,o1_order_service_request_browser.vitest.ts,o1_customer_service_request_route.vitest.ts,o1_golden_order.vitest.ts}`
- `app/docs/{COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION.md,COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_DESIGN.md}`
- `설계자료/COSMILE_O1_고객취소_최소운영큐_설계서.md`
- `app/package.json`, `app/vitest.config.ts`, `app/tsconfig.json`

Do not read a sixth surface family or unrelated operator/console/legacy/admin/AI path. If a load-bearing fact is outside this ceiling, report `UNVERIFIED` with the exact needed path; do not expand.

## Required compact result

For each named customer surface record: route/component, API/data source, current truth owner, auth/ownership boundary, status `CONNECTED | PARTIAL | MOCK | DUPLICATE | DEFERRED | RETIRE_CANDIDATE | UNVERIFIED`, exact gap, safest reuse, and evidence path.

Also return:

- exact O1 versus legacy/mock collision risks;
- proposed modules and candidate file/test ceilings, proposal only;
- whether any schema/economic/auth/provider contract change appears necessary;
- exact STOPs and unknowns.

## Writes and prohibitions

Write only:

- `advisor/jobs/COSMILE_O1_STOREFRONT_AND_CUSTOMER_ACCOUNT_COMPLETION_V1/14_P1_WORKER_TECHNICAL_CENSUS_RESULT.md`
- `advisor/jobs/COSMILE_O1_STOREFRONT_AND_CUSTOMER_ACCOUNT_COMPLETION_V1/15_P1_WORKER_TECHNICAL_CENSUS_POINTER.md`

in the docs worktree. Do not commit or push. No product write, test, build, typecheck, DB/runtime/browser/provider/network/credential action, or implementation recommendation beyond the bounded module proposal. Result <=80 lines.

RETURN_TO: `foundation-advisor`
STOP.
