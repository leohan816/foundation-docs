# 173 — DURABLE ORDER LIST REVIEW DISPOSITION

- Review: `171_INDEPENDENT_DURABLE_ORDER_LIST_REVIEW.md`
- Actual binding/verdict: Opus 5 / max / `/fable-sentinel` / `PASS_WITH_RISK`
- Product candidate: `990efb8d69772e438ae862e8056c2b00314892aa`

## Decision

1. Accept A: preserve the existing visible `orderNo` inside the product/detail cell without adding a read or column.
2. Accept B under the latest Strategy field-source rule: an absent reviewed economic match is a normal unavailable field condition, not malformed data. Keep the durable order row and render its amount/time/payment/refund fields as unavailable. Malformed rows, duplicate bindings, duplicate economic matches, inconsistent counts, and unknown shipment tokens still fail the whole page closed.
3. Accept C: append an explicit `UTC` marker to the unchanged durable timestamp.

No new source of truth, query, capability, route, schema, DB, runtime, browser, provider, refund, or economic action.
