# Agent Office M01 Canonical Design Handoff

TARGET_ACTOR: Agent Office Worker
TARGET_SESSION: existing `agent-office` session only
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane
DO_NOT_PASTE_INTO: Advisor or reviewer-fable5
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only

## Work Mode

`DESIGN_ONLY__NO_PRODUCT_IMPLEMENTATION`

Model and effort: `<GPT-5.6-Sol:Ultra>`

Use the same existing session and context. Do not create or use an agent,
sub-agent, delegated model context, temporary session, or second Worker.

## Required Reads

Read directly:

- all active Agent Office root and `docs/agent/` instructions;
- all files in the source Advisor job, especially `00_INTAKE.md`,
  `01_ADVISOR_ENTRY_GATE.md`, `02_UNKNOWN_GATE.md`, `05_CANONICAL_DESIGN_BRIEF.md`,
  `06_FABLE5_DESIGN_REVIEW_BRIEF.md`, `08_CANONICAL_DESIGN_ADDENDUM.md`, and
  `10_MISSION_MANIFEST.json`;
- canonical role V2 and active tmux transport authority by their real files;
- bootstrap result and pointer;
- actual Agent Office repository tree, branch, and Git state.

Do not use memory or pane summaries as authority.

## Exact Design Task

Create only these canonical candidate files in Agent Office:

1. `docs/architecture/AGENT_OFFICE_MASTER_DESIGN.md`
2. `docs/contracts/AGENT_OFFICE_DOMAIN_EVENT_CONTRACT.md`
3. `docs/security/AGENT_OFFICE_SECURITY_AUTHORITY_MODEL.md`
4. `docs/integration/AGENT_OFFICE_GATEWAY_MULTI_HOST_DESIGN.md`
5. `docs/ui/AGENT_OFFICE_UI_ANIMATION_MAPPING.md`
6. `docs/operations/AGENT_OFFICE_OPERATIONS_RECOVERY.md`
7. `docs/FEATURE_INDEX.md`

The Agent Office repository is the only canonical design owner. Do not create
canonical mirrors under foundation-docs.

The design must be precise enough for implementation without product-policy
invention and must cover every requirement in the mission and addendum, including:

- purpose, audience, non-goals, authority and source-of-truth precedence;
- responsive private PWA product surface and quiet operations-focused UI;
- Initiative -> Package -> Mission -> Phase -> WorkUnit hierarchy;
- versioned manifest denominator and scope-change accounting;
- all required WorkUnit, message, blocker, alert, and decision states;
- event transition rules, invalid-transition handling, timestamps, idempotency,
  ordering, causal links, and append-only audit history;
- deterministic projections and evidence-backed completion;
- Advisor-only browser message path with immutable artifact, requestId, hash,
  acknowledgement, canonical intake/decision record, and resume proof;
- no browser-to-Worker/Reviewer route and no arbitrary terminal command surface;
- TmuxAdvisorGateway now and HermesAdvisorGateway interface/stub only;
- read-only tmux observation and no duplication of transport authority;
- Git, artifact, notification, authentication, CSRF, rate limiting, audit,
  kill-switch, manual fallback, and idempotency contracts;
- private loopback default and separately gated Tailscale/private-network plan;
- multi-project and multi-host topology for Linux servers and future Mac hosts,
  including trust, clock, host identity, offline, reconnect, and stale evidence;
- structured-event-only animation mapping for idle, delivery, reading, working,
  testing, review, blocked, WAITING_LEO, result return, and recovery;
- visual asset and icon strategy, accessibility, reduced motion, desktop/mobile
  layout, stable dimensions, and text overflow prevention;
- failure, restart, crash consistency, corruption quarantine, stale state,
  recovery, backups, rollback, disable strategy, and proof of recovery;
- Batch A-E dependencies, exact review gates, acceptance tests, and exclusions;
- current implemented scope (`bootstrap only`), unknowns, limitations, and every
  deferred-but-designed-for extension point;
- browser security and authentication design without accessing or embedding a
  real secret;
- PWA installability, real-time SSE/WebSocket decision, and rationale;
- no public exposure, DB, production/live, Hermes implementation, or automatic
  next mission.

For every material requirement, include or link a row with:

`DESIGN_REQUIREMENT -> IMPLEMENTATION_PATH -> TEST_PATH -> CURRENT_EVIDENCE -> STATUS -> DEFERRED_GATE`.

At this stage, implementation evidence must honestly say `NOT_IMPLEMENTED` where
appropriate. Do not claim as-built behavior.

## Git and Result Rules

- Work only on `shadow/agent-office-m01`.
- Commit and push only the seven canonical design files, non-force.
- Do not change bootstrap instructions or create app/runtime/package/test files.
- Write a durable design result and pointer under foundation-docs at:
  - `../foundation-docs/runs/agent-office/20260711_agent_office_m01_advisor_managed_office_web_control_plane/WORKER_DESIGN_RESULT.md`
  - `../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane/13_WORKER_DESIGN_RESULT_POINTER.md`
- Commit/push only those two result paths with explicit staging; preserve unrelated
  dirt.
- Terminal output must be ASCII-only; repository Markdown may use normal UTF-8.

## Forbidden

No source code, package manifest, app scaffold, tests, assets, runtime, DB,
secret/env value, authentication action, external exposure, production/live,
main merge/push, force push, Reviewer work, self-review, risk acceptance, new
session, agent, sub-agent, delegation, or automatic implementation.

Return the pointer block to Advisor and STOP.
