# ADVISOR RED DISPOSITION — CONTINUE BOUNDED CORRECTION

## Decision

`PROCEED_WITH_CORRECTED_FOCUSED_GATE`

- The preserved RED is meaningful: eight new assertions failed on the absent order-line/provenance contract.
- Three unexpected failures are pre-existing request-scope harness failures in untouched M3F route cases (`cookies was called outside a request scope`). They execute no load-bearing order-line/provenance assertion and are excluded from this correction gate, not weakened or normalized.
- The fourth is a directly stale source-string oracle. Current accepted source invokes `grantAwareOperatorActionSurface(mode, legacyActionsEnabled, …)`, while the old assertion still requires `operatorActionSurface(mode, legacyActionsEnabled)`. Correct that one string assertion to the current grant-aware call; do not change behavior or remove the test.

## Preserved state

- Keep the existing uncommitted three-test-file delta exactly, except the one stale string-oracle correction above.
- No new RED run: `12 failed / 91 passed`, exit `1` already preserves the eight intended failures.
- Source remains byte-identical to product base `76497d6bbcd01b42e4a3c3871329bf150a95d1d6`.

## Worker continuation

- Same Opus 5/xhigh Worker, same session/CWD/context.
- No more reads or diagnosis.
- Implement handoff `125` only in its five source paths.
- No schema/DB/runtime/browser/provider/refund/economic action.
- Run exactly one corrected focused GREEN:

```bash
cd app && ./node_modules/.bin/vitest run -c vitest.config.ts \
  scripts/o1_order_lifecycle.vitest.ts \
  scripts/o1_operator_request_detail_ui.vitest.ts \
  scripts/o1_checkout_start_idempotency.vitest.ts \
  -t 'operatorOrderView|operator order-line table|checkout-start idempotent order boundary'
```

This gate still proves the new fail-closed line projection, the exact UI table/no-PII contract, replay/idempotency, and future snapshot connection. It intentionally does not claim the unrelated M3F request-scope harness is healthy.

First failure: STOP without retry or diagnosis. PASS: exact eight-path containment, diff-check, truthful commit/non-force push, compact `131/132` result, STOP.
