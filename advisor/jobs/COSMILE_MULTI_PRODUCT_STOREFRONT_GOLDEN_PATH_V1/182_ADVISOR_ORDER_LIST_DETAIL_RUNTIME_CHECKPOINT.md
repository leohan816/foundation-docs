# 182 — ORDER LIST / DETAIL RUNTIME CHECKPOINT

- Product: `b39e914bd65899b1dd05de277124fc9eb0ffc80a`, clean/upstream-equal.
- Review: 180, actual Opus 5 / max / `/fable-sentinel`, PASS.
- Runtime: exact mission worktree, one process group on `127.0.0.1:3000`; public `/dashboard/orders` HTTP 200.
- Safety: Toss TEST; one-shot OFF; local substitute unset; provider/refund/economic action 0.
- Artifact: predecessor `.next` quarantined before the clean current-worktree dev artifact was generated.
- Start evidence: two foreground attempts stopped before Next because the required positional port was omitted (`PORT_ARGUMENT_MISSING`); zero listener/effect. The corrected existing-wrapper invocation supplied `3000` once and reached TCP readiness.

## Human checkpoint

Use the existing authenticated OPERATOR browser profile:

1. Hard-refresh `https://cosmile.leohan.net/dashboard/orders`.
2. Confirm the paid row shows product title, visible O1 order number, quantity, KRW total, explicit UTC time, and truthful order/payment/refund/shipment states.
3. Open that row’s detail link.
4. Confirm the durable line table is visible directly after the summary and before shipment/action content, with title, SKU, quantity, unit price, and line total.

Do not click checkout, refund, shipment, or another economic action. Golden Reversal remains HOLD until Leo/Strategy returns the visual checkpoint.
