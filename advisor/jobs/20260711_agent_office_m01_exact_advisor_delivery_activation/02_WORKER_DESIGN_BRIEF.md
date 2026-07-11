# Agent Office Worker Design Brief - Exact Advisor Delivery

## Mode

`DESIGN_ONLY__NO_RUNTIME_IMPLEMENTATION__NO_TMUX_INPUT`

## Required Canonical Candidate

Create and commit/push in Agent Office:

- `docs/architecture/AGENT_OFFICE_EXACT_ADVISOR_DELIVERY_BRIDGE_DESIGN.md`

Update only the existing canonical documents necessary to link and reconcile the
candidate, including `docs/FEATURE_INDEX.md`. Remove or clearly supersede the
stale repo-local `Bootstrap Lock` instruction if it conflicts with the active
mission, while preserving all role and safety rules.

## Required Design Content

- DQ-01 through DQ-08, each with evidence and explicit resolution state;
- exact authority/config schemas and validation order;
- fixed Advisor destination and immediate pre-dispatch revalidation;
- exact pointer envelope and buffer/argv transport sequence;
- no browser-controlled transport fields;
- durable idempotency and crash/ambiguous receipt state machine;
- Advisor ACK/canonical evidence ingress and trust proof;
- no resume before canonical intake/decision evidence;
- kill switch/manual fallback and no auto-enable;
- LocalBootstrap composition without remote/public expansion;
- synthetic actual-rehearsal plan and rollback/cleanup;
- implementation file plan, tests, threat cases, and traceability to all nine
  success criteria;
- deferred gates and explicit non-goals.

## Git and Result

- Branch: `shadow/agent-office-m01`
- Base: `9c403da5662aeedc28a8c677c37a134aaa44dce3`
- Design docs only; no source/config/test/runtime change.
- Non-force push to existing upstream.
- Result:
  `../foundation-docs/runs/agent-office/20260711_agent_office_m01_exact_advisor_delivery_activation/WORKER_DESIGN_RESULT.md`
- Pointer:
  `../foundation-docs/advisor/jobs/20260711_agent_office_m01_exact_advisor_delivery_activation/11_WORKER_DESIGN_RESULT_POINTER.md`

No tmux input, real delivery, server start, credential, DB, remote access, new
session/agent/sub-agent, or implementation is allowed.
