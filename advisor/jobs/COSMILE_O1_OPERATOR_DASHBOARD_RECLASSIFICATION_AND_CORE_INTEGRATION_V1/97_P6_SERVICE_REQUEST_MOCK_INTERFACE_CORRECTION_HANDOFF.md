# P6 Service-Request Mock Interface Correction — Worker Handoff

MISSION_ID: `COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1`
WORK_UNIT: `P6_SERVICE_REQUEST_MOCK_INTERFACE_CORRECTION`
ACTOR: existing Cosmile Worker, Claude Opus 4.8/xhigh; Codex idle
PRODUCT_BASE: `e3bc820c12735e25af06b0ca7298268fa3d42689`
DELTA_ONLY_VERIFICATION: `REQUIRED`
SKILL: `/fable-builder`
REFERENCES: `implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`; `implementation-report-template` only at return.

Only the first build failure preserved in result 96 is admitted. Ignore prior
sweep findings; do not enumerate other build defects.

## Exact one-path ceiling

1. `app/scripts/o1_order_service_request.vitest.ts`

## Focused evidence and correction

The file contains exactly one `CustomerServiceRequestRepository` fake, in
`makeFakeDeps`. Its submit-only tests do not invoke inspection, but the reviewed
repository interface now also requires `inspectCustomerServiceRequest`.

Using the mission-authorized temporary dependency symlink and `--cache=false`,
run exactly this existing named test before correction and record its truthful
outcome:

```bash
./node_modules/.bin/vitest run scripts/o1_order_service_request.vitest.ts \
  --config vitest.config.ts --reporter=verbose --cache=false \
  -t 'maps each repository result to exactly its outcome and never leaks the id/owner/server-ids it passed down'
```

Then add only an inert `inspectCustomerServiceRequest` method to that fake,
returning the closed category `{ kind: "unavailable" }`. Do not add calls,
counters, assertions, new behavior, or change the submit mock. Run the identical
named command once. The direct test may remain GREEN because it intentionally
exercises only submit; do not claim a RED if none occurs. Result 96's preserved
build type-check failure is the authoritative RED evidence; do not run build
here.

No other path, test, build, typecheck, lint, install, generate, DB, provider,
runtime, browser, sweep, or economic action. Remove the temporary symlink;
prove the new method is never called by the focused submit tests, canonical
hashes unchanged, one-path containment, and zero residue. One additive
truthful-attribution commit, non-force push, clean/upstream-equal. Write only
result `98_P6_SERVICE_REQUEST_MOCK_INTERFACE_CORRECTION_RESULT.md`, return to
Advisor, and STOP before the next P6 gate.
