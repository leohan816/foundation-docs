# WU-5 R3 Canonical Module Import Correction — Worker Handoff

MISSION_ID: `COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1`
WORK_UNIT: `WU-5_R3_CANONICAL_MODULE_IMPORT_CORRECTION`
ACTOR: existing Cosmile Worker, Claude Opus 4.8/xhigh primary
PRODUCT_BASE: `561b943f91c864ed593ff3450bf1026c0410ba70`
CLAIM_CEILING: `IMPLEMENTED_NOT_REVIEWED`
DELTA_ONLY_VERIFICATION: `REQUIRED`
SKILL: `/fable-builder`
REFERENCES: `contract-to-code-mapping`, `test-design-before-code`; `implementation-report-template` only at return.

## Preserved failure and exact path ceiling

P6 gate 2 preserved the real compile failure at result 64: the two WU-5 pages import `getShopper` and `o1RuntimeEnabled` from absent aliases. Correct existing modules are proven by the known-good Console orders sibling.

Change only:

1. `app/src/app/console/page.tsx`
2. `app/src/app/console/settings/page.tsx`
3. `app/scripts/o1_console_shell_ui.vitest.ts`

No fourth path; no auth/runtime implementation, behavior, UI, config, manifest, schema/DB, provider, or economic change.

## Tests first and exact correction

First add one exact named test under the existing WU-5 block:

`uses canonical shopper and nonproduction runtime modules on root and settings`

For both page sources require:

- `getShopper` imported from `@/lib/shopper`;
- `o1RuntimeEnabled` imported from `@/lib/runtime/o1NonprodConfig`;
- absence of `@/lib/auth/shopper` and `@/lib/order/o1CommerceRuntime`.

Run only that exact named test and preserve RED. Then replace only the four invalid import specifiers in the two pages. Do not change import symbols, gate order, calls, JSX, behavior, or any other line. Run the identical named GREEN once.

Exact command:

```bash
./node_modules/.bin/vitest run scripts/o1_console_shell_ui.vitest.ts \
  -t 'uses canonical shopper and nonproduction runtime modules on root and settings' \
  --config vitest.config.ts --reporter=verbose --cache=false
```

Use/remove only the mission-approved temporary dependency symlink; verify canonical hashes unchanged. No cumulative gate, build, typecheck, lint, generate, install, DB, app/browser, provider, or economic command.

One additive truthful commit, non-force push, clean/upstream-equal. Write only uncommitted result `66_WU5_R3_CANONICAL_MODULE_IMPORT_CORRECTION_RESULT.md`, return to Advisor, and STOP before the final P6 re-gate. This is WU-5 correction round 3; any further WU-5 product defect returns to Advisor before correction.
