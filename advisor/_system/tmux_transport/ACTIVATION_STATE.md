# tmux Transport Activation State

MODE: `ADVISOR_MANAGED_EXISTING_TMUX_TRANSPORT`

MODE_STATUS: `NOT_ACTIVE`

KILL_SWITCH: `ENGAGED`

MANUAL_ROUTING_FALLBACK: `ACTIVE`

FINAL_ACTIVATION_RECORD: `NOT_PRESENT`

LAST_DECISION:
`APPROVE_PROTOCOL_PATCH_FOR_ADVISOR_MANAGED_EXISTING_TMUX_TRANSPORT`

DECISION_SCOPE: `DOCUMENTATION_AND_CONFIGURATION_ONLY`

## Required Before Activation

- canonical protocol/config patch published;
- Fable5 `DESIGN_REVIEW`: `PASS`;
- Fable5 `IMPLEMENTATION_OR_CONFIG_REVIEW`: `PASS`;
- required existing-session reload confirmations complete;
- Advisor final audit: `PASS`;
- separate Leo/GPT final activation approval;
- committed `FINAL_ACTIVATION_RECORD.md` identifying exact reviewed commits,
  reload evidence, and approval.

## Current Behavior

Do not send any launcher through tmux under this mode. Use manual copy/paste.
Read-only tmux metadata and pane-output inspection for configuration validation is
allowed when the active mission permits it, but no input may be delivered.

## Fail-Closed Rule

Any missing, ambiguous, stale, or conflicting state means `NOT_ACTIVE`.
