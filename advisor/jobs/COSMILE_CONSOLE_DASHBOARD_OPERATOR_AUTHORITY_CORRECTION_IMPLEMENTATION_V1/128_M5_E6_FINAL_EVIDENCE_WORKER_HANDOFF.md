# M5-E6 Sixth and Final Evidence-Only Round — Worker Handoff

MISSION_ID: `COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1`
INSTRUCTION_CLASS: `PROCEED_WITH_LIMITS`
ROUND: `6_OF_6_FINAL`
ACTOR: existing Cosmile Claude Worker
SESSION: `cosmile:claude.0`
WORKTREE: `/home/leo/Project/.worktrees/Cosmile/COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1`
BRANCH: `implementation/cosmile-console-dashboard-authority-correction-v1-20260724`
BASE: `6486019e0968de5671e43521e5cfb40d03b0bdca`
DOCS_BASE: `8ea056b8263908c867442f8c26cb7e45e6d77dfd`
MODEL_EFFORT: Claude Opus 4.8 / xhigh
SKILL: `/fable-builder`
SKILL_REFS: `implementation-execution`, `implementation-report-template`
PRODUCT_WRITE: PROHIBITED

## Exact outcome

Collect one local browser evidence path for the unchanged candidate:

- heading `Lab 후보 31개` present;
- exactly 31 distinct internal anchor hrefs matching `/lab/<capabilityId>`;
- zero `button`, `form`, `input`, `select`, `textarea`, `[role=button]`, inline event-handler, `formaction`, or command-control elements/attributes.

## Command ceiling

1. Verify exact product base, clean/upstream equality, port 31081 free, `.next` absent, and the committed handoff pin. Do not inspect product source.
2. Rebuild exactly once:
   `NEXT_TELEMETRY_DISABLED=1 DATABASE_URL=postgresql://127.0.0.1:1/cosmile_console_candidate npm run build`
3. Create one owner-only temporary root with mode 0700; files 0600; browser profile 0700.
4. In one supervisory shell, install an unconditional cleanup trap, enable shell job control, and start exactly once using the direct binary:
   `./node_modules/.bin/next start -H 127.0.0.1 -p 31081`
   Keep environment assignment separate from backgrounding. Do not use `setsid`, `npm run start`, a wrapper, or a second shell/start.
5. Immediately capture the background PID and its numeric PGID. Require the PGID to differ from the supervisor PGID and require the process group to remain alive. The same supervisory shell must retain both values through cleanup.
6. Wait only for `ss` TCP LISTEN on `127.0.0.1:31081`, bounded by process-group liveness and a finite deadline. No HTTP readiness request.
7. Invoke exactly once:
   `/home/leo/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome --headless=new --no-sandbox --disable-gpu --window-size=390,844 --user-data-dir=<profile> --dump-dom http://127.0.0.1:31081/lab`
8. Analyze only the single saved DOM locally. Return categorical booleans/counts; never list capability IDs or retain DOM content in documentation.
9. Unconditionally terminate only the captured process group, wait for absence, then remove `.next`, browser profile, DOM, runtime output, and the temporary root.
10. Verify port 31081, mission runtime, `.next`, profile/DOM/temp, and Git delta are absent; product remains clean/upstream-equal.

## First-failure rule

Any failed precondition, build, ownership assertion, liveness/readiness check, Chromium invocation, DOM assertion, or cleanup is `FINAL_HOLD`. Do not retry, restart, correct, or issue a second browser request. There is no seventh round.

## Forbidden

- product source/config/schema/migration/fixture/test change;
- typecheck, Vitest, DB, provider, economic, public-preview, or existing-service action;
- second build, start, readiness request, Chromium request, or evidence experiment;
- session/process exit, kill, clear, restart, replacement, new Actor, or scope expansion.

## Durable return

Write only:

- `129_M5_E6_WORKER_RESULT.md`
- `130_M5_E6_WORKER_POINTER.md`

under the existing mission job. Maximum 80 lines total. Include exact command counts, categorical evidence, cleanup, Git state, effects 0, actual model/effort/skill, `RETURN_TO: foundation-advisor`, and `STOP`. Do not commit or push documentation. Stop before Reviewer.
