# 174 — WORKER HANDOFF: ORDER LIST REVIEW CORRECTION

## Binding and base

- Same Cosmile Worker; actual Opus 5 / xhigh; exact mission CWD.
- Product base: `990efb8d69772e438ae862e8056c2b00314892aa`, clean/upstream-equal.
- Review disposition: 173.

## Exact four-path ceiling

1. `app/scripts/o1_core_dashboard_orders.vitest.ts`
2. `app/scripts/o1_core_dashboard_reads.vitest.ts`
3. `app/src/lib/operator/orderListRead.ts`
4. `app/src/app/dashboard/orders/page.tsx`

Tests first:

- pin visible `row.orderNo` while retaining the existing encoded detail link;
- pin absent payment/refund match as one projected row whose economic/time/category fields are `null`, rendered with the existing Korean unavailable label;
- retain whole-page fail-closed for malformed/duplicate/inconsistent/unknown input;
- pin the explicit `UTC` timestamp suffix.

Run one meaningful RED, implement only those four paths, then run the identical focused GREEN once:

```bash
cd app && ./node_modules/.bin/vitest run -c vitest.config.ts \
  scripts/o1_core_dashboard_orders.vitest.ts \
  scripts/o1_core_dashboard_reads.vitest.ts \
  -t 'M1 orders|M3A — /dashboard/orders'
```

No fifth path, new read/query/capability, schema, DB, runtime, browser, provider, refund, or economic action. PASS requires exact containment, commit/non-force-push, compact result, STOP.
