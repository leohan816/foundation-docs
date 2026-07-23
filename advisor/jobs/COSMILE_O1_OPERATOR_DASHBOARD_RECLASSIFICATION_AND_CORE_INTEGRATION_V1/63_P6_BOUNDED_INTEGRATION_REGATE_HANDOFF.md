# P6 Bounded Integration Re-gate — Worker Handoff

MISSION_ID: `COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1`
PHASE: `P6_BOUNDED_INTEGRATION_REGATE`
ACTOR: existing Cosmile Worker, Claude Opus 4.8/xhigh primary
PRODUCT_BASE: `561b943f91c864ed593ff3450bf1026c0410ba70`
CLAIM_CEILING: `IMPLEMENTED_NOT_REVIEWED`
DELTA_ONLY_VERIFICATION: `REQUIRED`
SKILL: `/fable-builder`
REFERENCES: `implementation-execution`, `test-design-before-code`; `implementation-report-template` only at return.

The first P6 run and its 2/145 failure remain preserved at result 60. P6 R1 corrected only the two stale predecessor assertions at product commit `561b943`; its two exact focused tests passed. This handoff authorizes one corrected cumulative re-gate and, only if it passes, the one frozen non-production compilation.

Execute the exact preflight, nine-file Vitest command, Next `--webpack` build command, STOP rules, and cleanup from committed handoff `59_P6_BOUNDED_INTEGRATION_GATE_HANDOFF.md`, changing only the expected clean product base to `561b943f91c864ed593ff3450bf1026c0410ba70`.

No product/docs/source/config/manifest/schema/migration/DB/provider/economic write. Do not rerun a passing command, repair a failure, choose another compiler, or run any test/build/typecheck/lint/generate/install/runtime/browser action beyond the two exact frozen gates.

Write only uncommitted result `64_P6_BOUNDED_INTEGRATION_REGATE_RESULT.md`, return to Advisor, and STOP before independent review. On any failure, preserve it once, clean unconditionally, and identify the exact owning WorkUnit.
