# Intake: Advisor-Managed Existing tmux Transport Protocol Patch

Status: `PATCH_AUTHORIZED__TRANSPORT_NOT_ACTIVE`

## Leo/GPT Decision

`APPROVE_PROTOCOL_PATCH_FOR_ADVISOR_MANAGED_EXISTING_TMUX_TRANSPORT`

The decision authorizes documentation and configuration protocol maintenance.
It does not activate direct tmux routing.

## Objective

Publish and independently review a fail-closed protocol that allows Advisor, only
after separate final activation, to transport exact committed launchers to verified
existing tmux role sessions, observe progress, collect result artifacts, and
validate Git evidence without manual user relay.

## Required Gates

1. canonical/config patch published;
2. Fable5 `DESIGN_REVIEW`: `PASS`;
3. Fable5 `IMPLEMENTATION_OR_CONFIG_REVIEW`: `PASS`;
4. existing Advisor, Control, Foundation Worker, Cosmile Worker, Shashu Worker, and
   Fable5 Reviewer sessions reload;
5. Advisor final audit: `PASS`;
6. separate Leo/GPT final activation approval.

## Current Safe Default

- tmux transport: `NOT_ACTIVE`
- kill switch: `ENGAGED`
- manual copy/paste: `ACTIVE`

## Forbidden

- any tmux prompt delivery before activation;
- new sessions, agents, sub-agents, or delegated contexts;
- runtime, schema, migration, DB, flag, secret, protected-branch, production, or
  live changes;
- self-review or final activation by Advisor;
- unrelated dirty-file staging;
- automatic product-mission execution.
