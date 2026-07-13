# Advisor Living Office E2E TypeScript Registration Amendment

- Mission: `AGENT_OFFICE_BATCH_A_MODERN_OFFICE_IDENTITY_COMPLETION_001`
- Decision: `PROCEED_WITH_EXACT_TEST_CONFIGURATION_REGISTRATION`
- Product/security/authority change: `NO`

## Evidence

Advisor document 51 authorized
`playwright.batch-a-living-office.config.ts` to import and reuse
`playwright.composed.config.ts`. The required config and its authenticated
Living Office E2E pass, but the repository's typed ESLint project service
rejects the new importing config because `tsconfig.json` enumerates the
existing root Playwright configs and does not yet enumerate this new config.

This is test-harness registration, not a lint exception. The strict lint and
type rules must remain unchanged.

## Exact Added Scope

Authorize one existing-file edit only:

`tsconfig.json`

Add exactly this path to the existing `include` array:

`playwright.batch-a-living-office.config.ts`

No other compiler option, include, exclude, lint rule, package script,
dependency, or source file may change under this amendment.

## Required Evidence

- `npx eslint playwright.batch-a-living-office.config.ts` passes without an
  ignore, suppression, or rule weakening;
- the repository typecheck passes;
- `npm run check` passes;
- the dedicated Living Office E2E and composed E2E remain green;
- the final diff shows only the exact `tsconfig.json` include registration for
  this amendment.
