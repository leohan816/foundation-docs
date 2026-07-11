# Agent Office M01 Batch C Locale Determinism Rework Handoff

TARGET_ACTOR: Agent Office Worker-Rework
TARGET_SESSION: same existing `agent-office` Codex session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane
RETURN_RESULT_TO: Advisor

## Mode

`IMPLEMENTATION_BATCH_C_REWORK__PLAYWRIGHT_LOCALE_DETERMINISM_ONLY`

Model/effort: `<GPT-5.6-Sol:Ultra>`

Read `30_ADVISOR_BATCH_C_LOCALE_ROOT_CAUSE.md`, current target/config/tests,
active repository instructions, prior rework result/pointer, and materially
affected canonical docs directly. Use the same session; no agent, sub-agent,
delegation, temporary session, or Batch D work.

## Exact Patch

1. Reproduce the caller-locale split on current target `ad74b9e...`.
2. Patch `playwright.config.ts` so the configured visual/browser process and its
   loopback web server use one explicit deterministic Korean UTF-8 process locale
   regardless of the invoking Advisor/Worker shell locale.
3. Prefer a cross-platform Node/Playwright configuration boundary over a
   shell-only package-script prefix. Do not change product CSS or UI to fit tests.
4. Add the smallest useful contract coverage for the normalized setting if it
   can be verified without self-spawning the whole browser suite.
5. Run from a caller with `LANG=C.UTF-8 LC_ALL=C.UTF-8` using the ordinary
   `npm run test:e2e` command and require 10/10.
6. Run from a caller with `LANG=ko_KR.UTF-8 LC_ALL=ko_KR.UTF-8` and require
   10/10.
7. Run lint, strict typecheck, all Vitest tests, both builds, audit,
   `git diff --check`, and forbidden-scope checks.
8. Inspect all final baselines directly. Regenerate and commit them only if the
   normalized final runtime legitimately changes their bytes.
9. Commit code/config/tests first, materially affected as-built docs second,
   then push `shadow/agent-office-m01` non-force.
10. Update the existing Batch C result and pointer with the root cause, patch,
    both-locale proof, exact commits, and remaining Batch E portability limits.

## Allowed Paths

- `playwright.config.ts`;
- focused test/config contract paths if required;
- the three existing visual baselines only if final normalized bytes change;
- materially affected canonical Agent Office docs/FEATURE_INDEX;
- exact existing Batch C result and pointer.

## Forbidden

- product UI/domain/application behavior changes;
- threshold relaxation, test deletion, or ignored failures;
- Batch D/E feature implementation;
- DB, secret, auth/privilege, external exposure, production/live;
- main push/merge, force push, unrelated staging;
- new session, agent, sub-agent, or delegated context.

Terminal output must remain ASCII-only. Return the corrected pointer to Advisor
and STOP.
