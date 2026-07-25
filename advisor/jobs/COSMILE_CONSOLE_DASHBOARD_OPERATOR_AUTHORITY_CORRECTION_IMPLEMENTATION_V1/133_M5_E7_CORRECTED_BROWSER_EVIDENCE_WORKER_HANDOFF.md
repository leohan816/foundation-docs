# M5-E7 Corrected Browser Evidence — Worker Handoff

MISSION_ID: `COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1`
INSTRUCTION_CLASS: `PROCEED_WITH_LIMITS`
ROUND: `E7_ONE_CORRECTED_FINAL_ATTEMPT`
ACTOR: recreated existing-role Cosmile Worker
SESSION: `cosmile`
WORKTREE: `/home/leo/Project/.worktrees/Cosmile/COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1`
BRANCH: `implementation/cosmile-console-dashboard-authority-correction-v1-20260724`
BASE: `6486019e0968de5671e43521e5cfb40d03b0bdca`
DOCS_BASE: `aef269a7ef3c8bdd0ca14d1389e91c3debd2bfb3`
MODEL_EFFORT: Claude Opus 5.0 / xhigh
SKILL: `/fable-builder`
SKILL_REFS: `implementation-execution`, `implementation-report-template`
PRODUCT_WRITE: PROHIBITED

## Admission

- E6 raw Chromium `--dump-dom` hung with zero DOM; do not repeat it.
- Worktree-local Playwright, Playwright Core, and `@playwright/test` packages are absent.
- Node 24 provides built-in `WebSocket`.
- Pinned Chromium exists at `/home/leo/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome`.
- Corrected controller: dependency-free Node 24 CDP, finite deadlines, one page navigation.

## Required evidence

Against the unchanged candidate at `http://127.0.0.1:31081/lab`, prove:

1. `h1#lab-home-heading` text is exactly `Lab 후보 31개`;
2. exactly 31 distinct anchor pathnames match `/lab/<capabilityId>`;
3. forbidden executable controls total 0:
   `button`, `form`, `input`, `select`, `textarea`, `[role="button"]`,
   `[formaction]`, `[data-command]`, `[data-action]`, editable controls,
   and any inline attribute whose name starts with `on`.

Return counts/booleans only. Never return DOM or capability IDs.

## Exact execution ceiling

1. Verify exact base, clean/upstream equality, committed handoff pin, port 31081 free, and `.next` absent. Do not inspect product source.
2. Rebuild exactly once:
   `NEXT_TELEMETRY_DISABLED=1 DATABASE_URL=postgresql://127.0.0.1:1/cosmile_console_candidate npm run build`
3. Create one owner-only temporary root/profile/controller/output area: directories 0700, files 0600.
4. Write only a temporary Node `.mjs` controller under that root. It may use only built-in Node APIs and global `WebSocket`; no package install/import.
5. In one supervisory shell with an unconditional cleanup trap and job control, start exactly one direct runtime:
   `./node_modules/.bin/next start -H 127.0.0.1 -p 31081`
   Capture and validate its PID/PGID immediately. Do not use `setsid`, `npm run start`, or a second start.
6. Wait for TCP LISTEN only with `ss`, process-group liveness, and a finite deadline. No readiness HTTP request.
7. Launch the pinned Chromium exactly once with an isolated profile, `about:blank`, headless/no-sandbox flags, and `--remote-debugging-address=127.0.0.1 --remote-debugging-port=0`. Capture and validate its PID/PGID. Do not use `--dump-dom`.
8. Read `DevToolsActivePort` only after it appears within a finite deadline. Connect to the browser WebSocket directly; do not call `/json` HTTP endpoints.
9. Through CDP:
   - create/attach one `about:blank` target;
   - enable Page/Runtime;
   - issue exactly one `Page.navigate` to `http://127.0.0.1:31081/lab`;
   - wait for `Page.domContentEventFired`;
   - run one `Runtime.evaluate` returning only the required booleans/counts.
10. Controller total deadline: 30 seconds. DOMContentLoaded deadline: 20 seconds. Any timeout/error/assertion failure is terminal.
11. Close the CDP target/socket, terminate only the captured Chromium and mission-runtime process groups, then remove `.next`, controller, profile, output, and temporary root.
12. Verify port 31081, mission runtime, Chromium/profile/controller/output/temp, `.next`, and Git delta are absent; product remains clean/upstream-equal.

## First-failure rule

Any precondition, build, ownership, readiness, DevTools, CDP, navigation, assertion, or cleanup failure is `FINAL_HOLD`. No retry, second start, second browser launch, second navigation, correction, or alternate controller.

## Forbidden

- product source/config/schema/migration/fixture/test edits;
- typecheck, Vitest, DB, provider, economic, public-preview, or existing-service action;
- raw `--dump-dom`, Playwright install, package change, `/json` debug HTTP;
- Actor/tmux session/process exit, kill, clear, restart, or replacement;
- new Actor, Worker, Codex substitute, window, pane, or scope expansion.

Termination is authorized and mandatory only for the exact E7 Chromium and mission-runtime process groups captured by this attempt.

## Durable return

Write only:

- `134_M5_E7_WORKER_RESULT.md`
- `135_M5_E7_WORKER_POINTER.md`

under the existing job. Maximum 80 lines total. Include actual model/effort/skill, command counts, categorical assertions, cleanup, Git state, effects 0, `RETURN_TO: foundation-advisor`, and `STOP`. Do not commit/push documentation. Stop before Reviewer.
