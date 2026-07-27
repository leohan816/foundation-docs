# WORKER HANDOFF — CLOSE REVIEW F1 EVIDENCE COVERAGE ONLY

- Product: `48939e86cc9c3e9da8cf55659ec247cc91e8e071`, clean/upstream-equal.
- Review: `139/140`, actual Fable 5/max, `PASS_WITH_RISK`, blocking code findings `0`.
- Sole closure target: prove the new exact-line, leakage, malformed fail-closed, authorization-first, stale grant-aware oracle, UI table, and provenance/replay tests all pass.

Same existing Cosmile Worker, actual Opus 5/xhigh, exact mission CWD. No file edit, read, diagnosis, commit, build, typecheck, DB, runtime, browser, provider, refund, or economic action.

Run exactly once:

```bash
cd app && ./node_modules/.bin/vitest run -c vitest.config.ts \
  scripts/o1_order_lifecycle.vitest.ts \
  scripts/o1_operator_request_detail_ui.vitest.ts \
  scripts/o1_checkout_start_idempotency.vitest.ts \
  -t 'operatorOrderView|operator order-line table|checkout-start idempotent order boundary|returns the exact ordered lines|admits SKU as the ONLY new catalog identifier|fails closed as repository_error|keeps the existing operator authorization gate ahead|WU-1 default legacy behavior'
```

The added names close only Reviewer F1; the known three M3F request-scope harness cases remain outside and are neither skipped by mutation nor normalized.

First failure: HOLD, preserve exact name/message, no retry. PASS: verify product remains byte-clean/upstream-equal, write compact `143_WORKER_ORDER_LINE_REVIEW_EVIDENCE_CLOSURE_RESULT.md` and `144_..._POINTER.md`, commit/non-force push docs only, STOP.
