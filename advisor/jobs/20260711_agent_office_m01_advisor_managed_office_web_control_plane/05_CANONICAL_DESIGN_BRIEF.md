# Agent Office M01 Canonical Design Brief

Status: `WAIT_FOR_BOOTSTRAP`

## Design Author

Existing Agent Office Worker session in `DESIGN_ONLY` mode. This keeps Advisor as
orchestrator/auditor and Fable5 as independent Reviewer.

## Canonical Owner and Required Candidate Outputs

The Agent Office repository is the sole canonical owner of product, runtime,
architecture, security, integration, UI-event, and operations design.
`foundation-docs` stores mission governance, review records, audit evidence, and
pointers only. It must not contain competing canonical copies.

Required Agent Office candidate files:

- `docs/architecture/AGENT_OFFICE_MASTER_DESIGN.md`
- `docs/contracts/AGENT_OFFICE_DOMAIN_EVENT_CONTRACT.md`
- `docs/security/AGENT_OFFICE_SECURITY_AUTHORITY_MODEL.md`
- `docs/integration/AGENT_OFFICE_GATEWAY_MULTI_HOST_DESIGN.md`
- `docs/ui/AGENT_OFFICE_UI_ANIMATION_MAPPING.md`
- `docs/operations/AGENT_OFFICE_OPERATIONS_RECOVERY.md`
- `docs/FEATURE_INDEX.md`

All documents remain candidate until Fable5 `DESIGN_REVIEW: PASS`. During later
implementation they must be updated to describe the reviewed as-built system,
without rewriting design to excuse code defects.

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
- multi-project, multi-host, Linux-server, and Mac extension architecture;
- explicit current scope, unknowns, limitations, and deferred gates;
- no public exposure or automatic next mission.

For every material requirement, the package must reserve this traceability:

`DESIGN_REQUIREMENT -> IMPLEMENTATION_PATH -> TEST_PATH -> CURRENT_EVIDENCE -> STATUS -> DEFERRED_GATE`.

At design time, implementation/test evidence may be `NOT_IMPLEMENTED` with an
exact future path and gate. Final closure requires as-built values.

## Technical Decision Authority

Worker may select framework, library, names, interfaces, and local file formats when
reversible and evidence-backed. It may not select new product policy or weaken the
fixed mission boundaries.
