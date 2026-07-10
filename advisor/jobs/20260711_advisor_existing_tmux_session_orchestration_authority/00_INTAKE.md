# Intake: Advisor Existing tmux Session Orchestration Authority

Status: `NEEDS_LEO_GPT_DECISION`

Date: 2026-07-11

## Request

Leo wants to stop manually copying every Advisor launcher into existing role
sessions and then copying each result back. The requested operating model is for
Advisor to deliver approved launchers to existing tmux sessions, observe their
execution, collect result pointers, and validate file and Git evidence directly.

## Current Conflict

The capability is available on the shared host, but the active Advisor instruction
still requires Leo/GPT to paste launchers manually until Hermes is introduced.
Canonical V2 permits Hermes-style transport without judgment, but it does not yet
name Advisor-operated tmux transport as an active mechanism.

## Scope of This Job

This job requests an authority decision only. It does not:

- send any prompt to a role session;
- operate tmux;
- patch the canonical protocol or active instructions;
- create a new session, agent, or sub-agent;
- authorize implementation, DB access, secrets, production, or live use;
- alter the active Package 1B mission.

## Decision Needed

Leo/GPT must decide whether to authorize a narrowly bounded protocol amendment
that permits Advisor to operate existing tmux role sessions as a transport and
evidence-collection mechanism while preserving all actor boundaries and final
approval rules.
