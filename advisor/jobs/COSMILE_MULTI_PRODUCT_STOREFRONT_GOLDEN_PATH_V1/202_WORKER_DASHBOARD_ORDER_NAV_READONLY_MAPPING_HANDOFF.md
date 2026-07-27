# WORKER HANDOFF — DASHBOARD / ORDERS READ-ONLY MAPPING

## Pins

- Mission: `COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1`
- Product: `b39e914bd65899b1dd05de277124fc9eb0ffc80a`, clean/upstream-equal
- Worker: same Cosmile Worker, actual Opus 5/xhigh, exact mission CWD, `/fable-builder`
- Accepted evidence: `MULTILINE_ORDER_VISUAL_OK`; Advisor invariant gate `200`

## Objective

Map, without implementation, the smallest exact source/read/route/test delta for Leo's bounded A–D correction:

A. `/dashboard/orders`: visible clickable `orderNo` is the primary identity; below it show product title plus `외 N건`; product title is not the primary link. Preserve quantity, total/currency, UTC time, order/payment/refund/shipment states and the encoded existing detail route.
B. `/dashboard`: captured-sales summaries for KST today, trailing 7 days and trailing 30 days, using only existing validated durable captured-payment/order rows. State KST (`UTC+9`) semantics; no fabricated metric.
C. Split payment and refund counts/links. Captured-payment count links `/dashboard/orders`. Refund count links an existing truthful refund/read surface only if proved; otherwise map an honest unavailable/not-implemented state. Do not invent a route.
D. Dashboard order count and Recent Orders heading/list link `/dashboard/orders`; each visible recent `orderNo` links its existing encoded detail route.

## Exact read ceiling

Read only these nine paths, and only once:

1. `app/src/app/dashboard/page.tsx`
2. `app/src/app/dashboard/orders/page.tsx`
3. `app/src/app/dashboard/payments/page.tsx`
4. `app/src/lib/operator/orderListRead.ts`
5. `app/src/lib/operator/paymentRefundRead.ts`
6. `app/src/lib/operator/paymentRefundReadRepository.ts`
7. `app/scripts/o1_core_dashboard_orders.vitest.ts`
8. `app/scripts/o1_core_dashboard_payments.vitest.ts`
9. `app/scripts/o1_core_dashboard_reads.vitest.ts`

Names-only route evidence already frozen by Advisor: `/dashboard/orders`, `/dashboard/payments`, and `/dashboard/requests/[orderId]` exist. Do not inspect another route or source.

## Required result

Write only:

- `204_WORKER_DASHBOARD_ORDER_NAV_READONLY_MAPPING_RESULT.md`
- `205_WORKER_DASHBOARD_ORDER_NAV_READONLY_MAPPING_POINTER.md`

The result must state:

1. exact existing field/source/authority/route support for each A–D item;
2. whether `/dashboard/payments` is the existing truthful refund read destination;
3. the smallest exact implementation path ceiling and focused test command;
4. fields/copy that must stay unavailable or excluded;
5. categorical confirmation: schema 0, DB writes 0, provider/economic actions 0, product delta 0.

Commit/non-force-push docs only, then STOP. No product/test edit, command execution, DB/runtime/browser/provider/refund action, broader read, implementation, review or Golden Reversal.
