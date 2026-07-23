# P6 Service-Request Operator Context Correction — Worker Handoff

MISSION_ID: `COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1`
WORK_UNIT: `P6_SERVICE_REQUEST_OPERATOR_CONTEXT_CORRECTION`
ACTOR: existing Cosmile Worker, Claude Opus 4.8/xhigh; Codex idle
PRODUCT_BASE: `faa968e16c5d31205bef1d503061cc8eaee7c9d7`
DELTA_ONLY_VERIFICATION: `REQUIRED`
SKILL: `/fable-builder`
REFERENCES: `implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`; `implementation-report-template` only at return.

Only the first build failure preserved in result 92 is admitted. Ignore prior
sweep findings; do not enumerate other build defects.

## Exact one-path ceiling

1. `app/scripts/o1_order_service_request.dbtest.vitest.ts`

## Tests first and correction

The reviewed `OperatorContext` contract requires `operatorRef`; the service
reads `operator.operatorRef`. In the exact test file, the seven
`operator: { actorRef: ... }` test inputs are stale. Repository/audit inputs
whose own contract uses top-level `actorRef` are not stale and must remain
unchanged.

Using the mission-authorized temporary dependency symlink and `--cache=false`,
run exactly this named test before correction and preserve RED:

```bash
./node_modules/.bin/vitest run scripts/o1_order_service_request.dbtest.vitest.ts \
  --config vitest.config.ts --reporter=verbose --cache=false \
  -t 'M3C service rejects malformed or unauthorized input with zero calls and supplies one category-only audit id'
```

Then change only those seven nested operator-context property names from
`actorRef` to `operatorRef`. Do not change any values, roles, assertions,
repository inputs, runtime source, or behavior. Run the identical named command
once and require GREEN. The preserved build type-check failure is additional
RED evidence; do not run build here.

No other path, test, build, typecheck, lint, install, generate, DB container,
provider, runtime, browser, sweep, or economic action. Remove the temporary
symlink; prove seven exact replacements, all top-level repository/audit
`actorRef` fields unchanged, canonical hashes unchanged, one-path containment,
and zero residue. One additive truthful-attribution commit, non-force push,
clean/upstream-equal. Write only result
`94_P6_SERVICE_REQUEST_OPERATOR_CONTEXT_CORRECTION_RESULT.md`, return to
Advisor, and STOP before the next P6 gate.
