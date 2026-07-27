# WORKER HANDOFF — ORDER LINE FIRST-VIEW CORRECTION

## Pins and binding

- Product base: `48939e86cc9c3e9da8cf55659ec247cc91e8e071`, clean/upstream-equal.
- Advisor disposition: `153_ADVISOR_MISSING_ORDER_DETAIL_DIAGNOSIS_DISPOSITION.md`.
- Same existing Cosmile Worker only; actual Opus 5/xhigh; exact mission CWD.
- Use current Worker rules and `/home/leo/Project/skill/fable-builder/SKILL.md`.

## Exact two-path ceiling

1. `app/scripts/o1_operator_request_detail_ui.vitest.ts`
2. `app/src/components/commerce/O1OperatorPanel.tsx`

No third path.

## Tests first

1. In the existing `operator order-line table` describe, add an exact hierarchy contract: `op-order-lines` occurs after the summary's final admitted fact (`op-inventory-disposition`) and before `op-action-region`.
2. Re-anchor the existing table-only source slices at `op-action-region`, so the line-table privacy/value assertions inspect the table region rather than unrelated later action code. Preserve every existing assertion.
3. Run exactly once for meaningful RED:

```bash
cd app && ./node_modules/.bin/vitest run -c vitest.config.ts \
  scripts/o1_operator_request_detail_ui.vitest.ts \
  -t 'operator order-line table'
```

RED must be the new hierarchy assertion. Any other failure is HOLD.

## Implementation and GREEN

- Move the existing `op-order-lines` JSX block intact to immediately after the summary section and before `op-action-region`.
- Do not change its fields, copy, mapping, formatting, conditional behavior, or data contract.
- Do not change any shipment/refund/support/HOLD control, authorization, nonce, step-up, audit, or action ordering.
- Run the identical focused command once for GREEN.
- PASS requires all selected cases green, exact two-path containment, `git diff --check`, no runtime state change, commit, and non-force push.

## Forbidden and return

No build, typecheck, other test, DB, schema, runtime restart, cache cleanup, browser, provider, refund, economic action, mock data, or `/dashboard/orders` list enrichment.

Write compact:

- `156_WORKER_ORDER_LINE_FIRST_VIEW_CORRECTION_RESULT.md`
- `157_WORKER_ORDER_LINE_FIRST_VIEW_CORRECTION_POINTER.md`

Commit/non-force push product and docs evidence, then STOP and return to Advisor.
