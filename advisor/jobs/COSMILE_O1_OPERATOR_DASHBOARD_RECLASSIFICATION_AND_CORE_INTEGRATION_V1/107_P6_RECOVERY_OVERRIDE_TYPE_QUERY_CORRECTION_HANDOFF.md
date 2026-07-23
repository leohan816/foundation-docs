# P6 Recovery Override Type-Query Correction — Worker Handoff

MISSION_ID: `COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1`
WORK_UNIT: `P6_RECOVERY_OVERRIDE_TYPE_QUERY_CORRECTION`
ACTOR: existing Cosmile Worker, Claude Opus 4.8/xhigh; Codex idle
PRODUCT_BASE: `f212747fc20a707f090d1e3a605a4fdcc9a42303`
DELTA_ONLY_VERIFICATION: `REQUIRED`
SKILL: `/fable-builder`
REFERENCES: `implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`; `implementation-report-template` only at return.

Only the first post-refresh build failure preserved in result 106 is admitted.
Ignore prior sweep findings; do not enumerate other build defects.

## Exact one-path ceiling

1. `app/src/lib/runtime/o1ReliabilityRuntime.ts`

## Focused evidence and correction

The adjacent `NonprodRecoveryBridgeOverride` members index two exported
repository **values** as if they were types. Both have the same type-query
defect:

- `recoveryReadRepository`;
- `orderRepository`.

Using the mission-authorized temporary canonical dependency symlink and
`--cache=false`, run exactly this existing named safety test before correction
and record its truthful outcome:

```bash
./node_modules/.bin/vitest run scripts/o1_toss_recovery_bridge.vitest.ts \
  --config vitest.config.ts --reporter=verbose --cache=false \
  -t 'R2C seam · production / not-ready WITH an override fails closed BEFORE any injected delegate is touched'
```

Then change only those two interface member type expressions from
`import("...")["value"]` to `(typeof import("..."))["value"]`. Do not change
imports, runtime code, override behavior, fail-closed order, provider/economic
authority, or tests. Run the identical named command once. The focused
behavioral test may remain GREEN because this is type-only; do not claim a RED
if none occurs. Result 106's build type-check failure is the authoritative RED
evidence; do not run build or Prisma generate here.

No other path, test, build, typecheck, lint, install, generate, DB, provider,
runtime, browser, sweep, or economic action. Remove the temporary symlink;
prove exactly two type-only line changes, canonical hashes unchanged,
one-path containment, and zero residue. One additive truthful-attribution
commit, non-force push, clean/upstream-equal. Write only result
`108_P6_RECOVERY_OVERRIDE_TYPE_QUERY_CORRECTION_RESULT.md`, return to Advisor,
and STOP before the next private-client P6 gate.
