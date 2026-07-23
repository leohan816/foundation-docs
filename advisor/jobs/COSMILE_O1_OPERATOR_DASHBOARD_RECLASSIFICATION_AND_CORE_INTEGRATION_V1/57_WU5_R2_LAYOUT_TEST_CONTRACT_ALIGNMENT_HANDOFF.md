# WU-5 R2 Layout Test Contract Alignment — Worker Handoff

MISSION_ID: `COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1`
WORK_UNIT: `WU-5_R2_LAYOUT_TEST_CONTRACT_ALIGNMENT`
ACTOR: existing Cosmile Worker, Codex fallback already owning WU-5
PRODUCT_BASE: `8ef0529651f570c58772a17f74e270066a51ae41`
CLAIM_CEILING: `IMPLEMENTED_NOT_REVIEWED`
DELTA_ONLY_VERIFICATION: `REQUIRED`
SKILL: `/fable-builder`
REFERENCE: `test-design-before-code`; `implementation-report-template` only at return.

## Exact defect and path

The R1 product correction correctly replaced the shared layout's redirecting `requireConsoleUser()` call with `getConsoleUser()`, but the pre-existing test `keeps noindex and supplies one authenticated outer Console shell` still requires the removed call. Its assertion now contradicts the corrected layout and would fail the bounded integration gate.

Exact changed path only:

1. `app/scripts/o1_console_shell_ui.vitest.ts`

No source/config/manifest/dependency/schema/DB/runtime/provider/economic path.

## Tests first and correction

Run only the exact existing named test:

```bash
./node_modules/.bin/vitest run scripts/o1_console_shell_ui.vitest.ts -t 'keeps noindex and supplies one authenticated outer Console shell' --config vitest.config.ts --reporter=verbose --cache=false
```

Preserve the meaningful RED. Then replace only that test's stale `requireConsoleUser()` call-count assertion with the equivalent one-call assertion for `getConsoleUser()`. Do not weaken the noindex, one-shell, role, or nested-shell assertions. Run the identical named GREEN once.

Use/remove only the mission-approved temporary dependency symlink and verify canonical hashes unchanged. No other test, full file/suite, build, typecheck, lint, generate, install, DB, app/browser, provider, or economic command.

One additive truthful commit, non-force push, clean/upstream-equal. Write only uncommitted result `58_WU5_R2_LAYOUT_TEST_CONTRACT_ALIGNMENT_RESULT.md`, return to Advisor, and STOP before P6.
