# Advisor-Managed Existing tmux Transport

Status: `ACTIVE__FINAL_LEO_GPT_APPROVAL_RECORDED`

Canonical authority:
`../../../설계문서/shared/AGENT_ROLE_BOUNDARY_AND_RELEASE_TRAIN_PROTOCOL_V2.md`

This directory contains the persistent configuration and evidence ledgers for
exact launcher transport to verified existing tmux role sessions.

## Read Order

1. `ACTIVATION_STATE.md`
2. `TRANSPORT_PROTOCOL.md`
3. `SESSION_REGISTRY.md`
4. `ACTIVE_INSTRUCTION_OVERRIDE.md`
5. `KILL_SWITCH_AND_FALLBACK.md`
6. the current mission launcher and loop state

## Ledgers

- `DISPATCH_LEDGER.md`: planned and completed prompt deliveries.
- `OBSERVATION_LOG.md`: non-secret execution observations and stall/STOP events.
- `RESULT_LEDGER.md`: artifact, pointer, commit, push, and verification results.

## Activation Rule

The presence of these files does not activate transport. Manual routing remains
mandatory unless `ACTIVATION_STATE.md` is active and a committed final activation
record exists with the reviewed evidence required by canonical V2 Section 20.
