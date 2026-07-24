# P1 Worker Handoff — Designer Fact Supplement

MISSION_ID: `COSMILE_O1_STOREFRONT_AND_CUSTOMER_ACCOUNT_COMPLETION_V1`
ACTOR: same existing Cosmile Worker, `cosmile:claude.0`
MODE: read-only exact fact supplement

Read only these seven files:

1. `app/src/components/commerce/O1OrderStatus.tsx`
2. `app/src/components/layout/MallTabs.tsx`
3. `app/src/components/category/CategoryDrawer.tsx`
4. `app/src/components/product/ProductCartFab.tsx`
5. `app/src/lib/runtime/o1CommerceRuntime.ts` — only `o1CustomerOrderView` and directly returned customer projection
6. `app/src/lib/order/contracts.ts` — only customer-visible order/history state types
7. `app/src/lib/order/repository.ts` — only customer-visible history/timeline projection

Also use the already-observed target route file inventory to state whether any target `loading.tsx`, `error.tsx`, or `not-found.tsx` exists; do not search or read another path.

Write only:

- `advisor/jobs/COSMILE_O1_STOREFRONT_AND_CUSTOMER_ACCOUNT_COMPLETION_V1/20_P1_WORKER_TECHNICAL_FACT_SUPPLEMENT_RESULT.md`
- `advisor/jobs/COSMILE_O1_STOREFRONT_AND_CUSTOMER_ACCOUNT_COMPLETION_V1/21_P1_WORKER_TECHNICAL_FACT_SUPPLEMENT_POINTER.md`

Return exact facts needed by the Designer: O1 order status/actions and state vocabulary; timeline/history data actually projected; MallTabs destinations/current-state behavior; drawer keyboard/focus behavior; CartFab behavior; route-level loading/error/not-found presence. Classify gaps without proposing code or new scope.

No product write, test, build, DB/runtime/browser/provider/network, other path, commit, or push. Result <=40 lines.

RETURN_TO: `foundation-advisor`
STOP.
