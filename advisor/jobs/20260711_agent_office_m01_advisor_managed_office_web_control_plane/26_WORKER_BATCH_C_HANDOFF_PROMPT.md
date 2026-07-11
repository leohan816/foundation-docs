# Agent Office M01 Batch C Implementation Handoff

TARGET_ACTOR: Agent Office Worker
TARGET_SESSION: same existing `agent-office` Codex session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane
DO_NOT_PASTE_INTO: Advisor or reviewer-fable5
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only

## Work Mode

`IMPLEMENTATION_BATCH_C__STRUCTURED_EVENT_OFFICE_SCENE`

Model/effort: `<GPT-5.6-Sol:Ultra>`

Use the same existing Worker session/context. Do not create or use agents,
sub-agents, delegated model contexts, temporary sessions, or another Worker.

## Entry Authority

Read the current Agent Office instructions, all seven canonical documents, Batch
A/B code and evidence, both Advisor batch validations, M01 manifest, Fable5 design
PASS, exact current Git state, and this handoff directly.

Batch B dependency verdict:
`PASS__BATCH_B_ACCEPTED_AS_BATCH_C_DEPENDENCY`.

Batch C is authorized. Batch D and later batches are not authorized.

## Objective

Implement the structured-event-driven office scene and responsive visual mapping
on top of the read-only Batch B dashboard. The scene must make actor state easy to
scan while remaining subordinate to the textual evidence and durable projection.
Animation is presentation only and can never create, infer, or prove work state.

## Required Office Scene

Create a full-width, unframed office workspace within the operational first
screen. It must not be a marketing hero or a decorative card.

Include stable stations for:

- Advisor;
- Control;
- Foundation Worker;
- Shashu Worker;
- Cosmile Worker;
- Agent Office Worker;
- Fable5 Reviewer; and
- Leo office/decision destination.

Use locally bundled, reviewed visual assets suitable for the office actors,
desks, documents, warning lights, and work tools. Custom local SVG/code-native
scene assets are allowed where no familiar icon exists. Continue using Lucide for
standard interface actions/icons. Record asset source, ownership/license, hash,
and stable dimensions; no CDN, remote image, tracking, user SVG execution, or
model/provider logo.

## Exact Structured Mapping

Implement an explicit scene state machine driven only by accepted domain event
IDs, WorkUnit primary state, current RoleActivity, freshness, and typed blocker /
decision / recovery overlays.

Required mappings:

- before assignment: actor is idle with subtle bounded idle motion only;
- `DISPATCHING`: Advisor stands, carries one document, walks to the exact target
  station, hands it over, then returns to the Advisor desk;
- `READING`: target visibly reads the delivered document;
- `WORKING`: target types at the keyboard;
- `TESTING`: distinct test/run/check activity, not the same typing loop;
- `WRITING_RESULT`: target writes/assembles the result document;
- `RETURNING_RESULT`: target carries the result to Advisor; this requires result
  and pointer evidence references in the structured fixture/model;
- `REVIEWING`: Fable5 marks/checks documents at the Reviewer station;
- `NEEDS_PATCH`: reviewed document visibly returns for correction without
  implying failure or completion;
- `BLOCKED`: work motion stops and a warning light plus exact reason is visible;
- `WAITING_DEPENDENCY`: stopped/queued dependency state, not blocked;
- `WAITING_ADVISOR`: distinct Advisor intake wait;
- `WAITING_LEO`: Advisor carries a marked red decision document to Leo office;
- `HOLD`: explicit paused state;
- `COMPLETED`, `FAILED`, and `CANCELLED`: stable terminal visual states with no
  continuing work animation;
- `RECOVERY`: bounded recovery/check sequence, never an indefinite spinner;
- absent, expired, incompatible, stale, offline, conflict, or error evidence:
  fail closed to static `UNKNOWN_OR_STALE` / freshness presentation and suppress
  work-claim motion.

Do not animate from pane activity time, process name, terminal text, Git status,
commit message, or arbitrary prose.

## Event and Motion Rules

- every transient sequence is keyed/deduplicated by accepted source event ID;
- initial page load renders current projection and does not replay history;
- tab/background resume does not replay stale transitions;
- event bursts coalesce by entity with persistent safety/block/wait states taking
  precedence;
- motion durations are bounded and use transform/opacity, not layout geometry;
- no flashing, shaking, autoplay sound, parallax, negative letter spacing, or
  endless progress animation;
- document handoff and result-return sequences cannot alter durable state;
- verified blocker/decision text appears immediately and is never delayed by
  animation;
- pause/visibility handling preserves current static state;
- provide a deterministic, clearly labeled local scene fixture/control for visual
  tests only. It must not dispatch commands or mutate mission state.

## Responsive and Accessibility Requirements

- stable aspect-ratio/responsive scene bounds with reserved labels/status areas;
- no actor, label, document, warning, or station overlap at desktop, tablet,
  390px mobile, 320px width, landscape, 200% zoom, or long Korean labels;
- mobile uses intentional station pagination or an accessible compact plan, not
  unreadable scaling;
- full keyboard operation and visible focus for scene selection/fixture controls;
- actor/station status is text+icon+shape, never color-only;
- semantic status list alternative for screen readers;
- `prefers-reduced-motion` and an in-app motion toggle remove translation and
  looping motion while preserving state/evidence;
- polite live region for ordinary structured state changes and one-time assertive
  announcement for critical blockers;
- touch targets at least 44x44 CSS pixels;
- scene geometry and labels must not shift when dynamic content changes.

## Visual and Automated Verification

Add exact-pinned Playwright visual/E2E tooling if required. Browser installation
and loopback Vite test server use are allowed; public/private-network exposure is
not.

Required verification includes:

- all exact observable mappings and transient end conditions;
- document delivery and result return order;
- event-ID deduplication, burst precedence, reload/tab resume, stale suppression;
- proof terminal/prose/process/Git fixtures cannot start animation;
- blocker, WAITING_LEO, NEEDS_PATCH, and recovery behavior;
- reduced-motion and motion-toggle behavior;
- keyboard, focus, semantic alternative, live-region, no-color-only checks;
- deterministic desktop screenshot at 1440x900;
- deterministic mobile screenshot at 390x844;
- reduced-motion screenshot/state check;
- bounding-box/no-overlap/overflow assertions for actors, labels, documents,
  stations, toolbar, dashboard sections, and long content;
- Batch A/B full regression and Batch D/E forbidden-scope gates;
- production build, dependency audit, lint, strict typecheck, full test suite,
  and `git diff --check`.

Store reviewed visual baselines/artifacts in deterministic test paths when useful.
Do not commit browser caches, downloaded binaries, transient test output, or
screenshots containing system/user data.

## UI Quality Boundary

- keep the operations-focused quiet visual system;
- avoid a one-note dark slate palette by preserving meaningful semantic colors
  and neutral contrast without decorative gradients/orbs;
- do not use oversized type inside compact panels;
- no cards nested inside cards;
- familiar icon-only tools require tooltips/accessible labels;
- no visible instructional or feature-explainer copy;
- the office scene should visibly represent real actor state, not atmospheric
  stock decoration.

## As-Built Documentation

After all checks pass:

1. Commit code/tests/assets first.
2. Update materially affected canonical Agent Office docs and FEATURE_INDEX to
   exact implementation/test/evidence/status/deferred-gate truth.
3. Keep Inbox/gateway/server/auth/SSE/PWA/recovery operations and later-batch
   surfaces visibly unimplemented.
4. Classify divergence as `CODE_DEFECT`, `DESIGN_DEFECT`,
   `DOCUMENTATION_STALE`, `DEFERRED_WITH_GATE`, or
   `NEEDS_LEO_GPT_DECISION`.
5. `DESIGN_DEFECT` or `NEEDS_LEO_GPT_DECISION` is STOP.
6. Commit as-built docs separately and push both target commits non-force.

## Allowed Paths

- exact package/config/lock changes for reviewed visual test dependencies;
- `src/ui/scene/**`, local scene assets/license inventory, and narrow shared UI
  components/styles/i18n needed by Batch C;
- pure query/view-model additions required for structured scene input;
- `tests/ui/**`, `tests/e2e/**`, deterministic fixtures, and reviewed visual
  baselines for Batch C;
- canonical Agent Office docs materially affected by Batch C;
- README for Batch C commands/status.

Do not implement Advisor Inbox, TmuxAdvisorGateway delivery, mutation routes,
HTTP authority/security server, SSE, PWA, service worker, real authentication,
secret use, DB, remote hosts, Hermes, deployment, or public/private exposure.

## Git and Result

- branch: `shadow/agent-office-m01`;
- explicit-path staging only;
- code/config/tests/assets commit first, as-built docs commit second;
- non-force push only; no main merge/push;
- result:
  `../foundation-docs/runs/agent-office/20260711_agent_office_m01_advisor_managed_office_web_control_plane/WORKER_BATCH_C_RESULT.md`;
- pointer:
  `../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane/27_WORKER_BATCH_C_RESULT_POINTER.md`;
- commit/push only those exact foundation-docs result paths;
- terminal output ASCII-only; repository UI/assets/docs may use normal UTF-8.

## STOP / Forbidden

STOP for product/design conflict, unexpected auth/approval/model-change prompt,
real secret/service requirement, DB/schema/migration, production/live/public or
private-network action, protected/main branch, destructive Git, unresolved visual
or test failure, or scope beyond Batch C.

No terminal prose inference, tmux input, Git mutation by product, browser role
dispatch, arbitrary command/path/target, Inbox/gateway mutation, final server/PWA,
real auth, DB, deployment, Hermes, Reviewer work, self-review, risk acceptance,
final approval, new context, or automatic Batch D.

Return the durable pointer to Advisor and STOP.
