# Agent Office M01 Canonical Design Brief

Status: `WAIT_FOR_BOOTSTRAP`

## Design Author

Existing Agent Office Worker session in `DESIGN_ONLY` mode. This keeps Advisor as
orchestrator/auditor and Fable5 as independent Reviewer.

## Required Candidate Outputs

Repo-local design source:

- `docs/design/AGENT_OFFICE_M01_CANONICAL_DESIGN.md`
- `docs/design/AGENT_OFFICE_M01_DOMAIN_AND_STATE_CONTRACT.md`
- `docs/design/AGENT_OFFICE_M01_SECURITY_AND_GATEWAY_DESIGN.md`
- `docs/design/AGENT_OFFICE_M01_RELEASE_AND_TEST_PLAN.md`

Canonical mirror:

- `../foundation-docs/설계문서/agent-office/AGENT_OFFICE_M01_CANONICAL_DESIGN.md`
- `../foundation-docs/설계문서/agent-office/AGENT_OFFICE_M01_DOMAIN_AND_STATE_CONTRACT.md`
- `../foundation-docs/설계문서/agent-office/AGENT_OFFICE_M01_SECURITY_AND_GATEWAY_DESIGN.md`
- `../foundation-docs/설계문서/agent-office/AGENT_OFFICE_M01_RELEASE_AND_TEST_PLAN.md`

All documents remain candidate until Fable5 `DESIGN_REVIEW: PASS`.

## Required Design Coverage

- Initiative/Package/Mission/Phase/WorkUnit manifest and count invariants;
- all required WorkUnit/message/blocker states;
- append-only structured event model and deterministic projections;
- Git, artifact, tmux observation, notification, and animation boundaries;
- TmuxAdvisorGateway now and HermesAdvisorGateway interface-only later;
- browser-to-Advisor immutable message and idempotent acknowledgement flow;
- no browser Worker/Reviewer dispatch or arbitrary terminal commands;
- responsive PWA and private loopback security model;
- auth/CSRF/rate-limit/audit contracts without real secrets;
- SSE/WebSocket choice with rationale;
- failure, rollback, kill-switch, and manual fallback behavior;
- Batch A-E implementation gates and tests;
- desktop/mobile usability and accessibility;
- no public exposure or automatic next mission.

## Technical Decision Authority

Worker may select framework, library, names, interfaces, and local file formats when
reversible and evidence-backed. It may not select new product policy or weaken the
fixed mission boundaries.
