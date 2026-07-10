# Existing-Session tmux Transport Protocol Reload Instructions

Status: `ACTIVE_AFTER_FABLE5_DUAL_PASS__TRANSPORT_NOT_ACTIVE`

Fable5 results:

- `DESIGN_REVIEW: PASS`
- `IMPLEMENTATION_OR_CONFIG_REVIEW: PASS`
- review commit: `3a55d2f3a8ffff7c9dc8ebebd64ae520a5ee6ae9`

This is a read-only role-protocol reload. It is not tmux transport activation and
does not authorize any product task.

## Common Required Reads

Every target reads directly:

- `../foundation-docs/설계문서/shared/AGENT_ROLE_BOUNDARY_AND_RELEASE_TRAIN_PROTOCOL_V2.md`
- `../foundation-docs/advisor/_system/tmux_transport/TRANSPORT_PROTOCOL.md`
- `../foundation-docs/advisor/_system/tmux_transport/ACTIVATION_STATE.md`
- `../foundation-docs/advisor/_system/tmux_transport/SESSION_REGISTRY.md`
- `../foundation-docs/advisor/_system/tmux_transport/KILL_SWITCH_AND_FALLBACK.md`

## Actor-Specific Required Reads

### Control

- `../foundation-control/CLAUDE.md`
- `../foundation-control/docs/agent/RUN_PROTOCOL.md`
- `../foundation-control/docs/OPERATING_MODEL_20260629.md` header

### Foundation Worker

- `../FOUNDATION/CLAUDE.md`
- `../FOUNDATION/docs/agent/RUN_PROTOCOL.md`
- `../FOUNDATION/docs/agent/RESULT_REPORTING_PROTOCOL.md`

### Cosmile Worker

- `../Cosmile/CLAUDE.md`
- `../Cosmile/app/AGENTS.md`
- `../Cosmile/app/CLAUDE.md`
- `../Cosmile/docs/agent/RUN_PROTOCOL.md`
- `../Cosmile/docs/agent/RESULT_REPORTING_PROTOCOL.md`

### Shashu Worker

- `../SIASIU/CLAUDE.md`
- `../SIASIU/docs/agent/RUN_PROTOCOL.md`
- `../SIASIU/docs/agent/RESULT_REPORTING_PROTOCOL.md`

### Fable5 Reviewer

- `../skill/fable-sentinel/SKILL.md`
- `../skill/fable-sentinel/references/review-classification.md`

## Required Understanding

- Advisor-managed tmux is exact launcher transport and evidence collection only.
- It does not transfer Worker, Control, Reviewer, risk, or approval authority.
- Existing named sessions only; no new session, agent, or sub-agent.
- No broadcast, synchronized panes, wildcard targets, or multi-pane send.
- Serial execution is the default; dependent and shared write-repo/branch tasks are
  serialized.
- Unexpected sensitive or privileged interaction is never auto-approved.
- Durable artifacts and Git evidence outrank pane summaries.
- Kill switch stops further transport, not the running role process.
- Manual routing remains the fallback.
- Current mode is `NOT_ACTIVE`; kill switch is `ENGAGED`; manual fallback is
  `ACTIVE`.
- A reload does not activate transport.

## Forbidden

- file modification;
- implementation or review work;
- commit/push;
- tmux input or routing;
- session/window/pane creation, rename, reset, or termination;
- agent/sub-agent/delegated context creation;
- DB, secret, production, or live access;
- activation or kill-switch change.

## Required Response

Return this ASCII-only block in the current existing session:

```text
ROLE_PROTOCOL_RELOADED
ACTOR:
SESSION_NAME:
SESSION_ID:
PANE_ID:
WORKSPACE:
ENTRY_FILES_READ:
CANONICAL_FILE_READ:
TRANSPORT_PROTOCOL_READ:
ACTIVATION_STATE: NOT_ACTIVE
KILL_SWITCH: ENGAGED
MANUAL_ROUTING_FALLBACK: ACTIVE
ROLE_SUMMARY:
TRANSPORT_BOUNDARY_SUMMARY:
FORBIDDEN_SUMMARY:
RETURN_TO: Advisor
```

Do not write a result file. Advisor will collect the response through read-only pane
capture and record it in the central reload status.
