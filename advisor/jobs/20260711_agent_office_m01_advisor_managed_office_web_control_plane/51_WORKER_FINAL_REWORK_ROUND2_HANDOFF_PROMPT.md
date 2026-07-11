TARGET_ACTOR: Agent Office Worker-Rework
TARGET_SESSION: same existing agent-office Worker session, never Advisor or Reviewer
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane
DO_NOT_PASTE_INTO: Advisor session or reviewer-fable5 session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target Worker session

# Agent Office M01 Final Rework Round 2

Use the same existing Agent Office Worker session and repository context.

## Required role and effort

- Model/effort: `Codex 5.6 Sol:Ultra`
- Work mode: implementation rework limited to AO-E-R3
- No new session, agent, sub-agent, or delegated context
- Do not execute from memory

## Read directly

1. This handoff.
2. `../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane/47_ADVISOR_POST_REWORK_VALIDATION.md`
3. `../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane/50_ADVISOR_FINAL_REWORK_DELTA_CONSOLIDATION.md`
4. Both Fable5 delta artifacts:
   - `../foundation-docs/runs/agent-office/20260711_agent_office_m01_advisor_managed_office_web_control_plane/FABLE5_FINAL_DESIGN_DELTA_REREVIEW_RESULT.md`
   - `../foundation-docs/runs/agent-office/20260711_agent_office_m01_advisor_managed_office_web_control_plane/FABLE5_FINAL_IMPLEMENTATION_DELTA_REREVIEW_RESULT.md`
5. Original M01 intake/brief, mission manifest, current Agent Office canonical documents, active repo instructions, and actual current code/tests/config.

Target branch must remain `shadow/agent-office-m01`. Verify current HEAD/upstream/dirty state before editing. Preserve unrelated files.

## Required patch

Close R3.1-R3.9 without broadening M01.

### R3.1 — production manifest source

- Remove the production CLI's hard-coded `fixtures/manifests/agent-office-m01.v1*.json` choice.
- Require explicit, versioned manifest and source-metadata inputs through validated configuration or exact CLI arguments.
- Support a trusted registered external canonical source without weakening no-follow, bounded-read, hash, commit, ownership, and root-isolation rules.
- Test/demo fixtures must remain explicit test/demo inputs only and must never be a production fallback.
- Startup must fail closed on missing, unverified, mismatched, stale, or out-of-scope manifest authority.

### R3.2/R3.7 — operational observation/import coordinator

- Compose the existing read-only MissionManifest, Git, tmux, and artifact observation ports needed for the declared projects and actors.
- Use exact registered project/root/source/session identities and structured metadata only.
- Never infer work state from terminal prose, pane scrollback, arbitrary process text, or browser input.
- Never mutate an observed repo, tmux pane, manifest, result, or pointer.
- Enforce project, host, mission, WorkUnit, and evidence isolation so future multiple projects and Advisors cannot cross-contaminate state.
- Define deterministic startup, refresh, timeout, stale/offline, restart, and partial-failure behavior.
- Use the existing freshness machinery. Missing or failed observation must become `UNKNOWN`, `STALE`, `OFFLINE`, or another existing fail-closed presentation, never fabricated activity.

### R3.3 — evidence-correct freshness

- Remove unconditional `CURRENT` and `VERIFIED_LOCAL_EVENT_PROJECTION` labels.
- A WorkUnit or actor may be current only when the required structured source and freshness policy prove it.
- Static manifest membership/status alone must not prove live actor activity.
- Add regression tests for current, stale, offline, missing, identity mismatch, dirty/unverified Git, and fresh-state restart.

### R3.4 — runtime alerts

- Project the durable alert center into the redacted communication model instead of emitting `alerts: []`.
- Preserve structured alert type, question/options/recommendation/safe default/blocking evidence/actions as allowed by the reviewed contract.
- Do not leak raw terminal output, secret material, unredacted paths outside allowed evidence links, or direct dispatch controls.
- Test open/resolved/suppressed and idempotent projection behavior.

### R3.5 — production office scene

- Render the office scene in the authenticated application projection path.
- Drive every animation only from reviewed structured projection/activity evidence.
- Unknown/stale/offline/blocked/waiting states must be visually honest; no typing/review animation without verified state.
- Preserve reduced-motion, mobile, accessibility, and stable-layout behavior.
- Update or add desktop/mobile/reduced-motion Playwright evidence from the composed application path, not only the fixture demo.

### R3.6/R3.8 — Advisor gateway and composed loop

- Do not instantiate `HermesAdvisorGateway` in the M01 executable composition.
- Inject the typed `AdvisorGateway` or a narrowly scoped gateway factory into composition.
- Make the M01 production selection the reviewed `TmuxAdvisorGateway` boundary, with capability and delivery port supplied only by trusted server-side configuration.
- When capability or delivery authority is absent, preserve explicit manual-fallback/fail-closed behavior. Never invent a capability or send input automatically.
- Browser code must not contain tmux targets, shell commands, terminal APIs, or Worker/Reviewer routes.
- Add an end-to-end composed-runtime test using a deterministic approved test delivery port and test-only authenticated session. Prove:
  - immutable message artifact and requestId idempotency;
  - fixed Advisor-only pointer delivery;
  - delivery receipt;
  - Advisor acknowledgement and canonical intake/decision link;
  - work resumption state;
  - duplicate submission does not duplicate execution;
  - kill switch/manual fallback/ambiguous receipt fail closed.
- Real tmux delivery activation and real authentication remain external gates. Do not activate them in this rework.

### R3.9 — canonical as-built documents

- Patch the seven canonical Agent Office documents and `docs/FEATURE_INDEX.md` from actual post-patch evidence.
- Record the exact current operational composition, current external gates, and any remaining limitation.
- Do not weaken design requirements to excuse code.
- For every material row preserve `DESIGN_REQUIREMENT -> IMPLEMENTATION_PATH -> TEST_PATH -> CURRENT_EVIDENCE -> STATUS -> DEFERRED_GATE`.

## Required tests and evidence

At minimum run and report:

- formatter/lint/typecheck/build;
- full unit/integration/property/security/recovery test suite;
- focused runtime-composition, observation-coordinator, gateway, alert, authority, and freshness tests;
- full Playwright desktop/mobile/reduced-motion/PWA suite against the correct composed path;
- runtime smoke with explicit trusted manifest inputs;
- negative smoke proving no fixture fallback and no-provider/manual-fallback behavior;
- dependency audit;
- exact Git diff, commit, push, branch/upstream, and clean-worktree evidence.

Directly inspect generated screenshots with the approved local image viewer. Verify nonblank rendering, no overlap, responsive containment, correct scene state, and no unverified activity animation. Do not use image generation.

## Forbidden

- real secret, credential, auth-provider, DB, production/live, customer data, or public/private-network access;
- actual tmux input or transport activation from Agent Office;
- browser direct Worker/Reviewer/terminal dispatch;
- Hermes implementation;
- new product policy or scope;
- main merge, force push, or unrelated staging;
- changing Fable5 artifacts or verdicts;
- starting another mission.

## Completion and publication

Commit and push the Agent Office implementation/config/test patch and canonical documentation patch to `origin/shadow/agent-office-m01`. Keep commits reviewable; do not amend prior commits.

Write and push only these result artifacts to foundation-docs:

1. `../foundation-docs/runs/agent-office/20260711_agent_office_m01_advisor_managed_office_web_control_plane/WORKER_FINAL_REWORK_ROUND2_RESULT.md`
2. `../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane/52_WORKER_FINAL_REWORK_ROUND2_RESULT_POINTER.md`

The result must map every R3 item to files, tests, direct evidence, remaining gates, commits, and push status. State clearly that Worker completion is not final approval.

Terminal output must be ASCII-only. Markdown files may preserve their normal UTF-8 language and paths.

Return the pointer to Advisor and STOP.
