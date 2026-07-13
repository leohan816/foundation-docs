# Advisor Living Office E2E Harness Scope Amendment

- Mission: `AGENT_OFFICE_BATCH_A_MODERN_OFFICE_IDENTITY_COMPLETION_001`
- Decision: `PROCEED_WITH_EXACT_TEST_HARNESS_SCOPE_AMENDMENT`
- Product/security/authority change: `NO`

## Evidence

`tests/e2e/living-pixel-office.spec.ts` is an exact required Batch A path, but
the default `playwright.config.ts` serves the static demo entry, which cannot
render the authenticated production Office. `playwright.composed.config.ts`
serves the correct real composed runtime but has `testDir` fixed to
`tests/e2e-composed`; direct selection of a `tests/e2e` spec returns `No tests
found`.

The required production visual proof therefore needs one exact test-only config.

## Exact Added Scope

Authorize one new file only:

`playwright.batch-a-living-office.config.ts`

It must:

- reuse/import the existing composed-runtime Playwright configuration and its
  loopback webServer/authenticated runtime behavior;
- set `testDir` to `./tests/e2e`;
- match only `living-pixel-office.spec.ts`;
- preserve workers=1, retries=0, `forbidOnly`, locale/timezone, loopback baseURL,
  and no server reuse;
- set an isolated test output directory;
- retain snapshot placement at
  `tests/e2e/baselines/living-pixel-office.spec.ts/`;
- introduce no new server command, credential, remote/public access, or runtime
  authority.

Do not edit `playwright.config.ts` or `playwright.composed.config.ts`. Do not add
another config or harness path.

## Required Evidence

- `npx playwright test --config playwright.batch-a-living-office.config.ts`
  discovers and executes the required spec against the real composed runtime;
- fresh screenshots exist only in the exact authorized baseline directory;
- existing composed config and all historical baselines remain unchanged;
- build, full regression, composed E2E, and Living Office E2E pass.

