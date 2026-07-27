# ADVISOR DISPOSITION — MISSING ORDER-DETAIL PROJECTION

Decision: **PROCEED_WITH_LIMITS**. Golden Reversal remains HOLD.

## Accepted evidence

- Product `48939e86cc9c3e9da8cf55659ec247cc91e8e071` is clean/upstream-equal.
- The sole paid order has exactly one durable line; title/SKU/quantity/unit/total are present and arithmetic is exact.
- Repository/service composition returns that line and the API route preserves the whole view.
- The served dev artifact contains `op-order-lines`; the table is unconditional after the panel's loading/denied/error gates.

## Worker conclusion corrected

Worker result `151` called missing list navigation the exact cause. That conclusion is rejected:

- `/home/leo/uploads/clip-20260728-004337.png` directly shows three rendered `공용 주문 상세 확인` links. They are produced by the child `O1ConsoleFulfillment`, so searching only `dashboard/orders/page.tsx` for link tokens was not a valid route-reachability proof.
- `/home/leo/uploads/clip-20260728-004359.png` is the actual `요청 상세` surface. It shows line count 1, the shipment region, and the HOLD region, but no line table in the captured viewport.
- Direct source shows `op-order-lines` is the last panel region, after the complete action region, mobile notice, and message. This ordering—not absent data, dropped projection, conditional suppression, or stale served code—is the bounded defect demonstrated by the human evidence.

No screenshot identifier or raw customer/order value is reproduced here.

## Frozen correction

Move the existing order-line section intact to immediately after the order-summary section and before `op-action-region`. Pin that hierarchy in the existing focused UI suite. No data, route, authority, action, wording, economic, or state behavior changes.

Exact path ceiling:

1. `app/scripts/o1_operator_request_detail_ui.vitest.ts`
2. `app/src/components/commerce/O1OperatorPanel.tsx`

The separately approved `/dashboard/orders` list enrichment remains open and is not part of this correction.
