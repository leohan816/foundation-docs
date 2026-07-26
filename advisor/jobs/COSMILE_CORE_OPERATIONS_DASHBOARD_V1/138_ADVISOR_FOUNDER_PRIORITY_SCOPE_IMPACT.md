# FOUNDER PRIORITY SCOPE IMPACT

VERDICT: HOLD_BEFORE_PRODUCT_WRITE; B1 visual recheck PASS; public preview and product `96b363c7` preserved.

| Priority | Existing real contract | Exact missing contract |
|---|---|---|
| Orders | `o1OperatorOrderList` bounded O1 list; `operatorOrderView` category-safe detail; existing step-up/nonce-gated full-refund and capability-gated shipment commands | No blocker for a truthful list/empty shell using current fields; richer list fields require a later read-contract extension |
| Customers | Google `CustomerAccount`/`AuthIdentity`/session and owner-scoped `customerOrderView` only | No operator customer capability, privacy-safe list/detail projection, repository/runtime read, or Dashboard route; customer identity cannot be reused as operator authority |
| Products/Catalog | `productCatalogPort` and `getManagedProducts`; real DB listing/SKU/offer counts exist | Canonical product side still uses `mockFoundationProducts`; legacy write routes use ConsoleUser admin authority; no OperatorPrincipal product-read capability or reviewed Dashboard projection |
| Inventory | Reviewed reserve/commit/release/expire services; per-order `inventoryDisposition`; catalog definition `inventory_hold.read` | No bounded inventory/HOLD list or aggregate repository/runtime/API read for an operations page |
| Payments & Refunds | Exact-order capture/refund recovery reads; per-order capture/refund booleans; count-only reconciliation; protected full-refund command | No payment/refund read capability or bounded list/detail/history projection; existing command is not a read surface and must remain unchanged |

IMMEDIATE_PAGE: Orders only, using existing `orders.read`, bounded list/detail fields, and no new backend/schema/command.
SEQUENCE: M1 Orders UI; M2 privacy-minimized Customers read contract then UI; M3 authoritative Catalog read contract then UI; M4 Inventory/HOLD projection then UI; M5 Payments/Refunds read projection then UI.
MODULE_RULE: M2–M5 each require a separate reviewed read-contract freeze before product write; default deny, no invented zero/KPI, no new command/economic authority.
DEFERRED: Customer Support and the prior Orders/Fulfillment/Support three-page shell implementation.
SOURCE_PINS: `app/src/lib/{order,auth,payment,inventory}/**`, `app/src/lib/{foundationProductClient,storefront}.ts`, `app/src/lib/slice/productCatalogPort.ts`, `app/src/lib/operator/capability.ts`, `app/src/app/dashboard/**`.
EFFECTS: product/backend/schema/DB/runtime/browser/provider/economic writes `0`; Worker dispatch `0`.
NEXT_DECISION: Strategy must freeze the corrected sequence and exact first-module paths before implementation.
