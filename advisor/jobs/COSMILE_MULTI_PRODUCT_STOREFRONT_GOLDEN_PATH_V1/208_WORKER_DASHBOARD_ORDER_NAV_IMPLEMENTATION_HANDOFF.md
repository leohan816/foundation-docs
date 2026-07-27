# WORKER HANDOFF — DASHBOARD / ORDERS PRESENTATION AND NAVIGATION

## Pins and role

- Mission: `COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1`
- Product base: `b39e914bd65899b1dd05de277124fc9eb0ffc80a`, clean/upstream-equal
- Contract: Advisor freeze `206/207`, docs `e36d5c498068eeef412c7e35167c9c9fcd998f89`
- Worker: same Cosmile Worker, actual Opus 5/xhigh, exact mission CWD
- Load `/home/leo/Project/skill/fable-builder/SKILL.md` and its required implementation/test/report references.

## Exact six-path ceiling

1. `app/src/app/dashboard/orders/page.tsx`
2. `app/src/app/dashboard/page.tsx`
3. `app/src/lib/operator/capturedSalesSummary.ts` (new, pure)
4. `app/scripts/o1_core_dashboard_orders.vitest.ts`
5. `app/scripts/o1_core_dashboard_reads.vitest.ts`
6. `app/scripts/o1_core_dashboard_payments.vitest.ts`

No seventh product/test/config path.

## Contract-to-code mapping

| Contract | Code landing | Test landing |
|---|---|---|
| clickable visible `orderNo`; product title + `외 N건` secondary; same encoded detail route | orders page only | orders suite |
| captured KRW sums/counts for KST today/current 7/current 30 calendar days | new pure helper, consumed by home from the existing single payment/refund read | payments suite behavioural boundaries + home source contract |
| limit reached means all period summaries unavailable; visible KST (`UTC+9`) bounded basis | helper + home copy | payments suite |
| captured-payment count → `/dashboard/orders`; completed-refund count → `/dashboard/payments`; never action queue | home only | payments + reads suites |
| order-count and Recent Orders heading/list → `/dashboard/orders`; visible recent `orderNo` → existing encoded detail | home only | reads suite |

No DB/API/event/schema mapping exists or is allowed. Existing `PaymentRefundRow` and existing order rows are the only sources.

## Tests first and commands

1. Read the contract and six paths only.
2. Patch only the three test paths.
3. Run exactly one meaningful RED:

```bash
cd app && ./node_modules/.bin/vitest run -c vitest.config.ts \
  scripts/o1_core_dashboard_orders.vitest.ts \
  scripts/o1_core_dashboard_reads.vitest.ts \
  scripts/o1_core_dashboard_payments.vitest.ts
```

4. Patch only the three source paths.
5. Run the identical command exactly once for GREEN.
6. Inspect exact six-path diff, `git diff --check`, Git status and no unexpected residue.
7. On GREEN, commit and non-force-push product once. Write docs `210/211`, commit/non-force-push docs, return compactly, STOP.

## Mandatory behavior

- KST periods are calendar windows: current KST day; current KST day plus prior 6; current KST day plus prior 29. Convert boundaries to UTC instants for comparison.
- Sum only validated rows where `paymentCategory === "captured"` and `captureAmount` is present.
- If `rows.length >= limit`, return unavailable summaries; never publish a silently truncated total.
- Keep existing fields, grants, one payment/refund read, routes and authority order.
- No settlement/net/profit/rate/partial-refund/customer/address/provider/internal-ID/payload/secret projection.
- No build, full suite, typecheck, DB, runtime, browser, provider, refund or economic action.

STOP on contract contradiction, seventh path, new query/read source/route/capability/schema, weakened truncation guard, changed auth/economic semantics, invalid RED, or failed GREEN.
