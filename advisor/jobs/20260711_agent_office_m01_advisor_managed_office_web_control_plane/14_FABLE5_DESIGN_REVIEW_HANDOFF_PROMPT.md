# Fable5 Agent Office M01 Design Review Handoff

TARGET_ACTOR: Fable5 Reviewer
TARGET_SESSION: existing `reviewer-fable5` session only, separate from Advisor and Worker
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane
DO_NOT_PASTE_INTO: Advisor or agent-office Worker
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only

## Review Identity

- Pass: `DESIGN_REVIEW__AGENT_OFFICE_M01`
- Level: `LEVEL_3`
- Model/effort: `<Fable5:Max>`
- Required skill: `/fable-sentinel`
- Verdict: `PASS | PASS_WITH_RISK | NEEDS_PATCH | FAIL`

Use the same existing independent Reviewer session. Do not create or use agents,
sub-agents, delegated contexts, temporary sessions, or a substitute Reviewer.

## Required Direct Reads

Read actual files, not Worker/Advisor summaries:

- the exact seven canonical Agent Office candidate files at commit
  `fedf716e780c760641d157cc9f4c08f698f41409`;
- actual Agent Office diff `937f0c5..fedf716`, branch, tree, instructions, and
  upstream state;
- full M01 intake, entry/unknown gates, manifest, canonical-design brief,
  addendum, Worker design handoff, Fable5 brief, Worker result, and pointer;
- canonical role V2 and active tmux transport authority;
- this handoff and actual relevant evidence paths.

Distrust the Worker report and Advisor summary until directly reproduced.

## Mandatory Review Questions

1. Do the seven files cover the entire approved M01 scope without implementation
   or authority expansion?
2. Is Agent Office the sole canonical product/design owner, with foundation-docs
   limited to governance/review/audit/pointers?
3. Are Initiative/Package/Mission/Phase/WorkUnit hierarchy, versioned denominator,
   scope changes, WorkUnit-count progress, and required-gate progress exact?
4. The mission explicitly requires these WorkUnit states:
   `QUEUED`, `READY`, `DISPATCHING`, `READING`, `WORKING`, `TESTING`,
   `WRITING_RESULT`, `RETURNING_RESULT`, `REVIEWING`, `NEEDS_PATCH`,
   `WAITING_DEPENDENCY`, `WAITING_LEO`, `BLOCKED`, `COMPLETED`, `FAILED`,
   `CANCELLED`.
   The candidate instead uses primary states such as `DISPATCHED`, `RUNNING`,
   `RESULT_REPORTED`, and `REVIEW_PENDING`, with some required names represented
   under `RoleActivityChanged`. Determine whether this is a sound two-axis model
   that fully satisfies the requested observable contract, or an unapproved
   replacement. Do not accept a renamed/lost state without evidence and rationale.
5. Are actor, mission, blocker, alert, decision, notification, and message state
   machines complete, deterministic, idempotent, and invalid-transition safe?
6. Are every required blocker type and exact reason/safe-default/owner/next-action/
   evidence field preserved?
7. Are all structured Advisor alert types and deterministic GPT copy-package fields
   supported without terminal-prose inference?
8. Is browser communication fixed to Advisor only, with no Worker/Reviewer target,
   arbitrary terminal command, synchronized pane, broadcast, or transport-authority
   duplication?
9. Are TmuxAdvisorGateway and HermesAdvisorGateway boundaries safe, with Hermes
   interface/stub only and transport kill switch/manual fallback preserved?
10. Are auth, session, CSRF, origin, rate limit, audit, idempotency, path/command
    allowlists, PWA cache, loopback, and private-network gates implementable and
    fail closed without real secrets?
11. Are JSONL/artifact/checkpoint durability, ordering, replay, corruption,
    quarantine, restart, backup, restore, rollback, stale evidence, and recovery
    proof coherent and testable without DB?
12. Are multi-project, multi-host, Linux-server, future Mac, host identity, trust,
    skew, gap, offline, reconnect, and stale evidence additive and non-authorizing?
13. Do all required structured office animations derive only from accepted events
    and verified evidence, with idle truth, delivery/result-return sequences,
    reduced motion, accessibility, mobile layout, stable geometry, text overflow,
    and visual asset/icon/license strategy?
14. Are all required Korean user-facing hierarchy labels, progress distinctions,
    alert actions, blocker reasons, and desktop/mobile workflows specified enough
    to implement without product-policy invention?
15. Do Batch A-E, dependencies, review gates, rollback gates, and acceptance tests
    preserve serialization and forbid unresolved next batches?
16. Do all 50 master traceability rows and local matrices correctly map requirement
    to future implementation/test/evidence/status/gate without pretending anything
    is implemented?
17. Is the addendum's as-built update and divergence classification exact, and does
    it forbid rewriting design to excuse code defects?
18. Are all unknowns/limitations and deferred gates visible, with no public access,
    DB, real credential, Hermes implementation, production/live, main merge, or
    automatic next mission?
19. Are there contradictions, impossible assumptions, hidden implementation,
    over-design that blocks a private M01, or under-specification that would force
    the Worker to invent product policy?
20. Is the design ready to authorize future implementation batches?

## Required Result

Write an evidence-bearing report with reviewed files/commits/diffs, explicit
coverage for all 20 questions, findings by severity, direct evidence, excluded
scope, unresolved risks, and verdict rationale.

Result:
`../foundation-docs/runs/agent-office/20260711_agent_office_m01_advisor_managed_office_web_control_plane/FABLE5_DESIGN_REVIEW_RESULT.md`

Pointer:
`../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane/15_FABLE5_DESIGN_REVIEW_RESULT_POINTER.md`

Commit and push only those two foundation-docs files with explicit-path staging.
Do not modify Agent Office, canonical design, Worker result, Advisor artifacts, or
runtime. Do not implement or patch. Do not access DB, secret/env values,
production/live, public exposure, or auth. Terminal output must be ASCII-only.

`PASS_WITH_RISK` returns to Leo/GPT via Advisor. `NEEDS_PATCH` returns to Advisor
for same-Worker patch and same-Reviewer delta review. `FAIL` stops. A design PASS
does not itself grant final approval or authorize implementation beyond the
already approved M01 routing sequence.

Return the pointer block to Advisor and STOP.
