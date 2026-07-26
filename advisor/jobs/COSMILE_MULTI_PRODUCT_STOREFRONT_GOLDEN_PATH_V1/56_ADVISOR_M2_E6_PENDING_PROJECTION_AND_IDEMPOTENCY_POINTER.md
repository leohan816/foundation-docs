# M2 E6 — POINTER

- Status: `PASS_READ_ONLY / CHECKOUT_RETRY_HOLD`
- Diagnosis: `55_ADVISOR_M2_E6_PENDING_PROJECTION_AND_IDEMPOTENCY_DIAGNOSIS.md`
- Product candidate: `e26e1aa18f1d58f1b6354a14b4a46bbd41aa5c97`
- Projection: customer history and Dashboard Orders agree on exactly two `payment_pending` orders.
- Provider/economic effects: `0`; the two 409 responses occurred before Toss handoff.
- Residue: two pending orders and two matching reserved holds, preserved without mutation.
- First defect: transport readiness was checked after durable writes; corrected and focused-tested at the product pin.
- Residual defect: checkout-start has no stable server replay key across distinct newly minted orders.
- Decision: no checkout retry and no automatic selection/cleanup of the ambiguous legacy rows.
- Separate multi-product blocker: open and unchanged.
