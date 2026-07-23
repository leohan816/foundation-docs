# P6 Final Bounded Integration Re-gate — Worker Handoff

MISSION_ID: `COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1`
PHASE: `P6_FINAL_BOUNDED_INTEGRATION_REGATE`
ACTOR: existing Cosmile Worker, Claude Opus 4.8/xhigh primary
PRODUCT_BASE: `6c4c3ca31a21a58aebe213e684f8e1a6126f13fe`
CLAIM_CEILING: `IMPLEMENTED_NOT_REVIEWED`
DELTA_ONLY_VERIFICATION: `REQUIRED`
SKILL: `/fable-builder`
REFERENCES: `implementation-execution`, `test-design-before-code`; `implementation-report-template` only at return.

Prior failures remain preserved at results 60 and 64. Their bounded corrections are product commits `561b943`, `cb67af4`, and `6c4c3ca`; each focused correction gate passed. This handoff authorizes the final no-write integration re-gate only.

Execute exactly the preflight, nine-file Vitest command, conditional Next `--webpack` build command, STOP rules, and unconditional cleanup frozen in committed handoff `59_P6_BOUNDED_INTEGRATION_GATE_HANDOFF.md`, changing only the expected clean product base to `6c4c3ca31a21a58aebe213e684f8e1a6126f13fe`.

No tracked write, repair, retry, alternate compiler, install, generate, typecheck, lint, broad suite, DB, provider, runtime, browser, or economic action. Preserve the first actionable failure and return its owning WorkUnit. Do not weaken assertions or normalize failures.

Write only uncommitted result `70_P6_FINAL_BOUNDED_INTEGRATION_REGATE_RESULT.md`, return to Advisor, and STOP before independent review.
