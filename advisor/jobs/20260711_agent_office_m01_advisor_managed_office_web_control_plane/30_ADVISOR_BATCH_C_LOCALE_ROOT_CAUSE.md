# Advisor Batch C Locale Root Cause

## Verdict

`NEEDS_PATCH__PLAYWRIGHT_VISUAL_RUNTIME_INHERITS_CALLER_LOCALE`

The corrected images are coherent, but Batch C remains unaccepted because the
visual suite is not reproducible across the two approved local launch contexts.

## Direct Reproduction

- Same target: `ad74b9e8f98298269534676237a66cfaac055e00`.
- Same pinned Playwright/Chromium, local browser/font root, tests, and images.
- Advisor process locale: `LANG=C.UTF-8`, `LC_ALL=C.UTF-8`.
- Worker tmux process locale: `LANG=ko_KR.UTF-8`, `LC_ALL=ko_KR.UTF-8`.
- Under the Advisor locale, the three image tests fail by approximately 4, 7,
  and 4 percent while the other seven browser tests pass.
- Running the exact suite as
  `LANG=ko_KR.UTF-8 LC_ALL=ko_KR.UTF-8 npm run test:e2e` from the Advisor process
  passes 10/10.
- `ko_KR.utf8` is installed on the current approved private host.

This proves the external caller locale changes font fallback and snapshot bytes.
The test configuration fixes browser locale but does not normalize the process
locale used by Chromium/fontconfig.

## Required Patch

The same Worker must make the visual test runtime deterministic inside the
repository configuration instead of requiring every caller to remember shell
prefixes.

Allowed:

- a narrow `playwright.config.ts` locale normalization;
- a focused test or verification contract for the normalized configuration;
- materially necessary as-built operations/test documentation;
- regenerated baselines only if the normalized final runtime changes bytes.

Required proof:

1. caller `C.UTF-8` invocation passes 10/10 without a shell locale prefix;
2. caller `ko_KR.UTF-8` invocation also passes 10/10;
3. full lint/type/Vitest/build/audit/boundary suite remains green;
4. no product UI or application behavior changes;
5. no DB, secret, public/private deployment, Batch D, or later scope.

## Status

`BATCH_C_LOCALE_REWORK_REQUIRED__BATCH_D_NOT_AUTHORIZED`
