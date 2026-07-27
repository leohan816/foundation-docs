# 165 — ORDER LIST GREEN CORRECTION

## Binding

- Mission: `COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1`
- Product base: `d7d0b78cde931e7f0cb233a26f82a139c5db1cba`
- Preserve the current uncommitted five-path delta from handoff 163.
- Same Cosmile Worker: actual Opus 5 / xhigh / exact mission CWD.

## Existing GREEN failure disposition

1. The old inline `orderId` guard string is stale after the guard moved into the pure projector: pin the projector call and existing `null -> UNAVAILABLE` branch instead.
2. The H1 `sr-only` check is overbroad because the accessible table caption legitimately uses `sr-only`: scope the assertion to the H1 only.
3. Reimplementing the order-status labels is a source defect: import and reuse the existing `orderStatusLabel`; prohibit only the rendered `<O1ConsoleFulfillment` component, not its helper module.
4. `CONFIRMED_ZERO` is an internal key whose rendered value is Korean: prohibit only a literal raw enum in visible JSX.
5. The blanket `?? 0` oracle catches the already-existing status-distribution counter: prohibit zero fallback only on durable row fields.
6. `address` occurs only in a defensive projector comment: simplify that comment while leaving the privacy oracle intact.

## Exact correction and ceiling

Edit only the already-admitted five paths:

1. `app/scripts/o1_core_dashboard_orders.vitest.ts`
2. `app/scripts/o1_core_dashboard_reads.vitest.ts`
3. `app/src/lib/operator/orderListRead.ts`
4. `app/src/lib/runtime/o1CommerceRuntime.ts`
5. `app/src/app/dashboard/orders/page.tsx`

No new field, read, capability, route, schema, DB, runtime, browser, provider, refund, or economic action. Do not broaden or reread.

Run the identical focused command once:

```bash
cd app && ./node_modules/.bin/vitest run -c vitest.config.ts \
  scripts/o1_core_dashboard_orders.vitest.ts \
  scripts/o1_core_dashboard_reads.vitest.ts \
  -t 'M1 orders|M3A — /dashboard/orders'
```

PASS requires GREEN, exact five-path containment, commit/non-force-push, compact result, then STOP. Any remaining failure is HOLD without another run.
