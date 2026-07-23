# P6 Golden Order Inventory Projection Correction — Worker Handoff

MISSION_ID: `COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1`
WORK_UNIT: `P6_GOLDEN_ORDER_INVENTORY_PROJECTION_CORRECTION`
ACTOR: existing Cosmile Worker, Claude Opus 4.8/xhigh; Codex idle
PRODUCT_BASE: `ce2b8d06e21654dc62e75c0eef75b64e8984de22`
DELTA_ONLY_VERIFICATION: `REQUIRED`
SKILL: `/fable-builder`
REFERENCES: `implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`; `implementation-report-template` only at return.

Only the first build failure preserved in result 88 is admitted. Ignore prior sweep findings.

## Exact two-path ceiling

1. `app/scripts/o1_golden_order_harness.ts`
2. `app/scripts/o1_golden_order.vitest.ts`

## Tests first and implementation

In the existing Golden Order deterministic happy-path group, first add one named test:
`projects committed inventory as committed_hold in the Golden Order operator view`.
Run a Golden Order, resolve its paid order from the synthetic world, read only
`w.orderRepo().operatorOrderData(orderId)`, and assert that
`inventoryDisposition` is exactly `committed_hold`. Run only that named test and
preserve RED: the current harness omits the required field.

Then update only the harness `operatorOrderData` projection. Derive the existing
order's reservation statuses and use the already-reviewed mapping:

- no rows -> `unverified`;
- every row `reserved` -> `reserved`;
- every row `committed` -> `committed_hold`;
- every row `released` -> `released`;
- mixed/unknown -> `unverified`.

Return that value as `inventoryDisposition`. Match the existing lifecycle
harness/runtime mapping; do not change order, payment, inventory, refund,
shipment, provider, or economic behavior.

Using the mission-authorized temporary dependency symlink and `--cache=false`,
run exactly this command for RED and identically for GREEN:

```bash
./node_modules/.bin/vitest run scripts/o1_golden_order.vitest.ts \
  --config vitest.config.ts --reporter=verbose --cache=false \
  -t 'projects committed inventory as committed_hold in the Golden Order operator view'
```

No other path, test, build, typecheck, lint, install, generate, DB, provider,
runtime, browser, sweep, or economic action. Remove the temporary symlink;
prove exact two-path containment, canonical hashes unchanged, and zero residue.
One additive truthful-attribution commit, non-force push, clean/upstream-equal.
Write only result `90_P6_GOLDEN_ORDER_INVENTORY_PROJECTION_CORRECTION_RESULT.md`,
return to Advisor, and STOP before the next P6 gate.
