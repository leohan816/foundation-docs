# P6 Service-Request Operator Input Correction — Worker Handoff

MISSION_ID: `COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1`
WORK_UNIT: `P6_SERVICE_REQUEST_OPERATOR_INPUT_CORRECTION`
ACTOR: existing Cosmile Worker, Claude Opus 4.8/xhigh; Codex idle
PRODUCT_BASE: `6a7f2703f9dd32ee65fff3772e26303dec5d63d9`
DELTA_ONLY_VERIFICATION: `REQUIRED`
SKILL: `/fable-builder`
REFERENCES: `implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`; `implementation-report-template` only at return.

Only the first build failure preserved in result 100 is admitted. Ignore prior
sweep findings; do not enumerate other build defects.

## Exact one-path ceiling

1. `app/scripts/o1_order_service_request.vitest.ts`

## Tests first and correction

The file contains exactly two stale nested operator-context inputs:
`M4A_INPUT.operator` and the viewer override. The reviewed
`OperatorContext` contract requires `operatorRef`. Top-level repository/audit
`actorRef` fields use a different contract and must remain unchanged.

Using the mission-authorized temporary dependency symlink and `--cache=false`,
run exactly this existing named test before correction and preserve its truthful
outcome:

```bash
./node_modules/.bin/vitest run scripts/o1_order_service_request.vitest.ts \
  --config vitest.config.ts --reporter=verbose --cache=false \
  -t 'M4A forwards every closed result once with category-only reasons and failAudit false'
```

Then change only the two nested operator-context property names from
`actorRef` to `operatorRef`. Preserve values, roles, casts, spacing, assertions,
and every repository input. Run the identical named command once and require
GREEN. Result 100's build type-check failure remains authoritative RED evidence
even if the focused behavioral test supplies its own RED.

No other path, test, build, typecheck, lint, install, generate, DB, provider,
runtime, browser, sweep, or economic action. Remove the temporary symlink;
prove two exact replacements, top-level repository/audit `actorRef` fields
unchanged, canonical hashes unchanged, one-path containment, and zero residue.
One additive truthful-attribution commit, non-force push, clean/upstream-equal.
Write only result `102_P6_SERVICE_REQUEST_OPERATOR_INPUT_CORRECTION_RESULT.md`,
return to Advisor, and STOP before the next P6 gate.
