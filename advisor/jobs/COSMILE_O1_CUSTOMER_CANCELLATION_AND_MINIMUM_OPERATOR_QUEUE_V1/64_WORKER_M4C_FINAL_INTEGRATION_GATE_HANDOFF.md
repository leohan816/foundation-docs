# Advisor Worker Handoff — M4C Final Bounded Integration Gate

MISSION_ID: `COSMILE_O1_CUSTOMER_CANCELLATION_AND_MINIMUM_OPERATOR_QUEUE_V1`
MODULE: `M4C_FINAL_BOUNDED_INTEGRATION_GATE`
BASE: `1e2475a02b9210e382efde7740777684d0cb4dba`
ACTOR: existing Cosmile Worker, Claude Opus 4.8 / xhigh
SKILL: `/fable-builder`
REFERENCES: `test-design-before-code`; `implementation-report-template` at return
DELTA_ONLY_VERIFICATION: REQUIRED
PRODUCT_WRITE: PROHIBITED

## Objective and justification

Run one final bounded integration gate because the frozen acceptance contract
requires the newly composed paid-cancellation path to preserve the reviewed
Golden Reversal and legacy/mock/admin isolation contracts at the cumulative
candidate HEAD. This is the mission's one final integration gate, not a broad
suite and not authority for correction.

## Exact read/command ceiling

Only these test files and their directly imported product code may be loaded:

1. `app/scripts/o1_paid_cancellation_refund_runtime.vitest.ts`
2. `app/scripts/o1_golden_reversal.vitest.ts`
3. `app/scripts/o1_legacy_lane_isolation.vitest.ts`

Run exactly once from `app/`:

```bash
./node_modules/.bin/vitest run \
  scripts/o1_paid_cancellation_refund_runtime.vitest.ts \
  scripts/o1_golden_reversal.vitest.ts \
  scripts/o1_legacy_lane_isolation.vitest.ts \
  --config vitest.config.ts --reporter=verbose --cache=false
```

Use only the mission-authorized temporary `app/node_modules` symlink after the
existing compatibility/no-process/cache checks. Remove it immediately after
the command and verify the canonical target hashes are unchanged.

## Required evidence and STOP

- Record exact pass/fail counts and first actionable failure without weakening,
  filtering, changing, or rerunning any test.
- Confirm no DB/container/port, provider/network, credential, refund/payment,
  order/inventory/shipment, product/source, schema/migration, config/manifest,
  generated output, or Git mutation.
- Confirm dependency/cache/process residue absent and product HEAD remains
  clean/upstream-equal at the exact base.
- The prior unauthorized broader M4B command remains a proportionality
  deviation with zero verdict weight; do not treat it as this gate.
- On any failure, residue, canonical mutation, or required product correction,
  return `HOLD` to Advisor. Do not patch, rerun, investigate broadly, or start
  review.

Return a compact evidence block to Advisor and `STOP` before independent review.
