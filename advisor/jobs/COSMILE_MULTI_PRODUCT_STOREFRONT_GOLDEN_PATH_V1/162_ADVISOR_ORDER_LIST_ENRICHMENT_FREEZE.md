# ADVISOR FREEZE — DURABLE ORDER-LIST ENRICHMENT

Decision: **PROCEED_WITH_LIMITS**. This WorkUnit is separate from the completed detail first-view correction. Golden Reversal remains HOLD.

## Existing truth reused

- `o1OperatorOrderList(50)`: bounded O1 order identity/status read; extend only with durable `OrderItem` title/count/quantity and `ShipmentRecord.status`.
- `readPaymentRefunds(50, prismaPaymentRefundReadRepository)`: already reviewed fail-closed order total/currency/time, payment category, and refund category. Reuse unchanged; do not duplicate its economic validation.
- Existing `dashboard.operations.read`, `orders.read`, `fulfillment.read`, and `reconciliation.read` grants; same principal required before either read.
- Existing detail destination `/dashboard/requests/[orderId]`.

## Exact visible contract

One stable table shows only:

1. primary durable product-name snapshot plus truthful additional-line count;
2. total durable quantity;
3. order total and KRW currency;
4. durable order-created time;
5. order, payment, refund, and shipment categories in closed Korean labels;
6. the existing encoded detail link.

No customer/buyer/contact/address/session/provider reference, raw payload, mock row, invented KPI, command, or mutation. Any malformed row, duplicate/missing order binding, inconsistent quantity, unknown shipment category, or absent reviewed payment/refund match makes the whole page `UNAVAILABLE`.

## Exact five-path ceiling

1. `app/scripts/o1_core_dashboard_orders.vitest.ts`
2. `app/scripts/o1_core_dashboard_reads.vitest.ts`
3. `app/src/lib/operator/orderListRead.ts` (new, pure)
4. `app/src/lib/runtime/o1CommerceRuntime.ts`
5. `app/src/app/dashboard/orders/page.tsx`

No schema/migration, component reuse rewrite, or sixth path.
