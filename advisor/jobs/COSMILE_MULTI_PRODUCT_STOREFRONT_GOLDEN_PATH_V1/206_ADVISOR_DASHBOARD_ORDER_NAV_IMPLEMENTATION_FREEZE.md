# ADVISOR FREEZE — DASHBOARD / ORDERS PRESENTATION AND NAVIGATION

Status: **FROZEN; PRODUCT WRITE NOT YET DISPATCHED**

Product base: `b39e914bd65899b1dd05de277124fc9eb0ffc80a`, clean/upstream-equal.  
Mapping evidence: Worker `204/205`, docs `55d86ed355f9d7ffc480beb95bfc70c382af565b`.

## Exact six-path ceiling

Source:

1. `app/src/app/dashboard/orders/page.tsx`
2. `app/src/app/dashboard/page.tsx`
3. `app/src/lib/operator/capturedSalesSummary.ts` (new, pure projection only)

Focused tests:

4. `app/scripts/o1_core_dashboard_orders.vitest.ts`
5. `app/scripts/o1_core_dashboard_reads.vitest.ts`
6. `app/scripts/o1_core_dashboard_payments.vitest.ts`

No repository adapter, query, route, capability, schema, migration or runtime configuration path may change.

## Frozen behavior

- Orders list: the visible primary link is `orderNo`; its href remains the encoded existing `/dashboard/requests/{orderId}` detail route. Product title is secondary text below, followed by `외 N건` when applicable. Quantity, total/currency, UTC order time, and order/payment/refund/shipment states remain unchanged.
- Captured sales: a pure helper uses only already-validated `PaymentRefundRow` values with `paymentCategory === "captured"` and the existing `captureAmount`. It returns KRW sums/counts for the current KST calendar day, current KST day plus the prior 6 calendar days, and current KST day plus the prior 29 calendar days. Boundaries are calculated in KST (`UTC+9`) and compared as UTC instants.
- Bounded-read guard: if the existing read returns its limit (`50`) or more, every period summary is unavailable; a partial bounded result must never be shown as a complete total. Visible copy states `KST (UTC+9)` and the existing bounded-read basis.
- Split facts: captured-payment count links `/dashboard/orders`; completed-refund count links the existing truthful read surface `/dashboard/payments`. Neither link enters the action queue. No refund/request route is invented.
- Navigation: the Dashboard order-count destination and Recent Orders heading/list destination are `/dashboard/orders`. Each visible recent `orderNo` links its encoded existing detail route; `orderId` remains non-visible.
- No settlement, net, profit, rate, partial-refund, buyer, address, provider, internal-ID, payload or secret projection. No form, button, POST, mutation or economic action.

## Tests-first gate

The Worker must add the exact RED assertions in the three existing test files before source changes, then run:

```bash
cd app && ./node_modules/.bin/vitest run -c vitest.config.ts \
  scripts/o1_core_dashboard_orders.vitest.ts \
  scripts/o1_core_dashboard_reads.vitest.ts \
  scripts/o1_core_dashboard_payments.vitest.ts
```

After a meaningful RED, edit only the three frozen source paths and run the identical command once for GREEN. No broad suite, build, typecheck, DB, runtime, browser, provider or refund action.

## Stop conditions

STOP if the six paths cannot satisfy the contract, a new query/read source/route/capability/schema is needed, the 50-row truncation guard would be weakened, or economic/auth semantics would change.
