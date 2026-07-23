# P6 R1 Stale Predecessor Test Contract Correction — Worker Handoff

MISSION_ID: `COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1`
WORK_UNIT: `P6_R1_STALE_PREDECESSOR_TEST_CONTRACT_CORRECTION`
ACTOR: existing Cosmile Worker, Claude Opus 4.8/xhigh primary
PRODUCT_BASE: `7110c3dff135009f92b7e7e5d1b57e8525419b1f`
CLAIM_CEILING: `IMPLEMENTED_NOT_REVIEWED`
DELTA_ONLY_VERIFICATION: `REQUIRED`
SKILL: `/fable-builder`
REFERENCE: `test-design-before-code`; `implementation-report-template` only at return.

## Preserved RED and exact path ceiling

P6 gate 1 is the preserved meaningful RED: 2 failed / 143 passed, exit 1. Do not rerun it before correction.

Change only:

1. `app/scripts/o1_console_orders_ui.vitest.ts`
2. `app/scripts/o1_order_lifecycle.vitest.ts`

No source/config/manifest/dependency/schema/DB/runtime/provider/economic path.

## Exact corrections

1. In the existing WU-2 detail-render test, replace only the stale self-closing-panel regex with an exact assertion that requires, in the current reviewed call, both `legacyActionsEnabled={false}` and the WU-3 `shipmentRecordEnabled={true}` before `/>`. Preserve all negative data-read/client-eligibility assertions.
2. In the existing authorized-operator `operatorOrderView` exact-object expectation, add only `inventoryDisposition: "reserved"`, the deterministic projection of that test's existing exact reserved fixture. Preserve the exact-object leak boundary and all adjacent assertions.

These strengthen/align the predecessor contracts; do not loosen with wildcard props, partial-object matching, snapshots, skipped assertions, or generic containment.

## Exact focused GREEN commands

After both one-hunk changes, run each command exactly once:

```bash
./node_modules/.bin/vitest run scripts/o1_console_orders_ui.vitest.ts \
  -t 'WU-2 detail renders only the existing panel with legacyActionsEnabled=false; no data read or client eligibility' \
  --config vitest.config.ts --reporter=verbose --cache=false
```

```bash
./node_modules/.bin/vitest run scripts/o1_order_lifecycle.vitest.ts \
  -t 'returns bounded counts for an authorized operator, leaking no ids' \
  --config vitest.config.ts --reporter=verbose --cache=false
```

Use/remove only the mission-approved temporary dependency symlink and verify canonical hashes unchanged. No RED rerun, cumulative gate, other test, full file/suite, build, typecheck, lint, generate, install, DB, app/browser, provider, or economic command.

One additive truthful commit, non-force push, clean/upstream-equal. Write only uncommitted result `62_P6_R1_STALE_PREDECESSOR_TEST_CONTRACT_CORRECTION_RESULT.md`, return to Advisor, and STOP before the P6 re-gate.
