# WU-5 R5 Stale Import Assertion Correction — Worker Handoff

MISSION_ID: `COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1`
WORK_UNIT: `WU-5_R5_STALE_IMPORT_ASSERTION_CORRECTION`
ACTOR: existing Cosmile Worker, Claude Opus 4.8/xhigh
PRODUCT_BASE: `6c4c3ca31a21a58aebe213e684f8e1a6126f13fe`
PATH_CEILING: `app/scripts/o1_console_shell_ui.vitest.ts`
DELTA_ONLY_VERIFICATION: `REQUIRED`
SKILL: `/fable-builder`
REFERENCE: `test-design-before-code`; `implementation-report-template` only at return.

The preserved P6 RED at result 70 is authoritative: one stale assertion at line 115 still expects `o1OperatorForCustomer` in the `o1ConsoleView` import, although the accepted R4 safety correction moved it to the canonical runtime import. The other 146 tests passed.

Change only that expected string to `import { CONSOLE_NAV, CONSOLE_STATE_VOCAB }`. Preserve every other assertion and the R4 fail-closed test. Run exactly once the named test `replaces the root redirect flow with a gated Korean read-only overview` using the mission-authorized temporary dependency symlink and `--cache=false`; require GREEN. Do not rerun RED, the full file, P6, build, typecheck, lint, install, generate, DB, provider, runtime, browser, or any other command.

Remove the temporary symlink and prove canonical hashes unchanged, exact one-path containment, clean dependency residue, and no product path beyond the test. One additive truthful-attribution commit, non-force push, clean/upstream-equal. Write only result `72_WU5_R5_STALE_IMPORT_ASSERTION_CORRECTION_RESULT.md`, return to Advisor, and STOP before P6.
