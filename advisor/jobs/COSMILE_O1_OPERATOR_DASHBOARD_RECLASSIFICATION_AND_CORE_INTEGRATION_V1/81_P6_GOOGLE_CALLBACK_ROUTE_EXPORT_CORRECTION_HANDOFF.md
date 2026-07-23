# P6 Google Callback Route Export Correction — Worker Handoff

MISSION_ID: `COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1`
WORK_UNIT: `P6_GOOGLE_CALLBACK_ROUTE_EXPORT_CORRECTION`
ACTOR: existing Cosmile Worker, Claude Opus 4.8/xhigh; Codex idle
PRODUCT_BASE: `f48a30e54f3a2cc11225daf3a82a2c9f1973fbc2`
DELTA_ONLY_VERIFICATION: `REQUIRED`
SKILL: `/fable-builder`
REFERENCES: `implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`; `implementation-report-template` only at return.

Only the admitted build failure in result 79 is in scope. Ignore every unauthorized sweep finding.

## Exact three-path ceiling

1. `app/src/lib/runtime/publicOrigin.ts`
2. `app/src/app/api/auth/google/callback/route.ts`
3. `app/scripts/o1_browser_runtime_contract.vitest.ts`

## Tests first and implementation

First change only the test import so `resolvePostLoginRedirect` comes from `@/lib/runtime/publicOrigin` alongside `resolvePublicRedirect`, not from the route. Run exactly the existing named test `composes the intended path on the configured public origin`; require RED because the pure module does not yet export the moved helper.

Then move the existing `resolvePostLoginRedirect` function byte-for-byte into `publicOrigin.ts`, import it in the callback route, and remove the route export. Preserve every call, argument, comment contract, state/nonce/PKCE/session/security behavior, and destination semantics.

Using the mission-authorized temporary dependency symlink and `--cache=false`, run exactly this command for RED and identically for GREEN:

```bash
./node_modules/.bin/vitest run scripts/o1_browser_runtime_contract.vitest.ts \
  --config vitest.config.ts --reporter=verbose --cache=false \
  -t 'composes the intended path on the configured public origin'
```

No other path, test, build, typecheck, lint, install, generate, DB, provider, runtime, browser, sweep, or economic action. Remove the temporary symlink; prove helper body byte identity, canonical hashes unchanged, three-path containment, and zero residue. One additive truthful-attribution commit, non-force push, clean/upstream-equal. Write only result `82_P6_GOOGLE_CALLBACK_ROUTE_EXPORT_CORRECTION_RESULT.md`, return to Advisor, and STOP before P6.
