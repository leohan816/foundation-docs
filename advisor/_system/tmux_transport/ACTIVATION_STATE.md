# tmux Transport Activation State

MODE: `ADVISOR_MANAGED_EXISTING_TMUX_TRANSPORT`

MODE_STATUS: `ACTIVE`

KILL_SWITCH: `DISENGAGED`

MANUAL_ROUTING_FALLBACK: `ACTIVE`

FINAL_ACTIVATION_RECORD:
`../foundation-docs/advisor/_system/tmux_transport/FINAL_ACTIVATION_RECORD.md`

LAST_DECISION:
`ACCEPT_BOOTSTRAP_EXCEPTION_AND_APPROVE_FINAL_TMUX_TRANSPORT_ACTIVATION`

DECISION_SCOPE: `FINAL_TRANSPORT_ACTIVATION__NO_PRODUCT_MISSION`

## Activation Evidence

- canonical protocol/config patch: published;
- Fable5 `DESIGN_REVIEW`: `PASS`;
- Fable5 `IMPLEMENTATION_OR_CONFIG_REVIEW`: `PASS`;
- required existing-session reload confirmations: complete 6/6;
- Advisor final audit: `PASS_WITH_RISK`, explicitly accepted by Leo/GPT;
- separate Leo/GPT final activation approval: received;
- final activation record: present in this commit.

## Current Behavior

Advisor may transport exact committed launchers to verified existing registered
role sessions under canonical V2 Section 12A and `TRANSPORT_PROTOCOL.md`. Every
dispatch requires live preflight, ledger evidence, exact pane targeting, no
broadcast, serialization/isolation checks, observation, durable result validation,
and canonical STOP handling.

Manual routing remains active as the mandatory fallback whenever a transport
precondition fails or the kill switch is engaged.

## Fail-Closed Rule

Any missing, ambiguous, stale, or conflicting state means `NOT_ACTIVE`.
