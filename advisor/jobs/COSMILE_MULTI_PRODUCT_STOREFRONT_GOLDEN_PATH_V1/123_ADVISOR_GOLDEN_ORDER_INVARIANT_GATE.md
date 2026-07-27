# GOLDEN_ORDER_CAPTURED — READ-ONLY INVARIANT GATE

- Product: `76497d6bbcd01b42e4a3c3871329bf150a95d1d6`, clean/upstream-equal
- Order delta: total `2 → 3`; paid `1`, preserved pending `2`
- Golden binding: order/item/intent/capture all `KRW 36,000`; exactly one succeeded capture and one provider-bound intent/transaction
- Line snapshot: one row, title present, SKU present, quantity `2`, unit `KRW 18,000`, total `KRW 36,000`; arithmetic exact
- Foundation snapshot FK on the paid line: absent
- Inventory: committed `1` row / quantity `2`; preserved old reserved `2` rows / quantity `2`
- Cart: current customer active cart/lines `0`; checked-out cart `1`, retained lines `0`
- Duplicate evidence: global succeeded captures `1`, captured orders `1`, duplicate provider references `0`, duplicate intent keys `0`
- Anomaly evidence: webhook `0`, reconciliation task `0`, open incident `0`, refund `0`
- Transport: non-production TEST mode; TEST credential shape valid; local substitute `OFF`
- Live-process one-shot flag remains `ON` until the owned runtime is restarted; restart wrapper is already default `OFF`

## Gap classification

- Dashboard orders list/detail projection omits durable line title/SKU/quantity/unit/total; current detail exposes only line count and categorical payment/inventory facts.
- Buyer linkage exists only as internal authenticated customer ownership. Buyer display/contact fields are not collected.
- Shipping recipient/address/contact fields do not exist in the current schema and were never collected; no synthetic address exists.
- Seven active ELT SKUs share the same admitted catalog/detail/cart/checkout code path and all seven had browser-visible catalog/detail evidence. Actual economic evidence is one captured SKU only; refund evidence remains zero.
- Public O1 home reuses the Cosmile shell and O1 card styling with seven canonical products, but intentionally bypasses the original legacy/mock home sections. It is not legacy-original visual parity.

## Smallest next scope

1. Restart only the owned runtime to enforce one-shot `OFF`.
2. Add a bounded operator order-line read projection and detail table using existing `OrderItem` snapshots; no buyer/address invention.
3. Thread the already-verified Foundation snapshot hash into future `OrderItem.foundationSnapshotRef`; no schema change or backfill.
4. Treat buyer/shipping capture as a separate schema/PII design decision.

Refund/provider action remains frozen.
