# Advisor Brief

## Decision and design exception

Proceed with one reversible, versioned transport-identity delta. A separate
Control/Designer pass is omitted because product behavior, message flow, and
authority topology are unchanged; the change only rebinds an already-reviewed
closed destination to the continuing Advisor Actor. Independent security review
is mandatory because the target and authority subject are security-sensitive.

## Required invariant

- Current route: `agent-office-advisor/$26/@26/%26` at
  `/home/leo/Project/agent-office`, command `codex`.
- Current Advisor authority subject: `agent-office-advisor`.
- Historical M1 v1 artifacts remain byte-for-byte, retain their original
  `foundation-advisor/$9/@9/%9` evidence, and cannot authorize current delivery.
- Current configuration must reject the historical destination and any caller-
  selected pane/session/workspace.
- Double live preflight, single-pane targeting, one-use authority, idempotency,
  kill switch, manual fallback, and no browser Worker/Reviewer routing remain.
- No actual tmux input is sent in this migration mission.

## Baselines

- Agent Office accepted branch head:
  `88c6cbd757ed205eb1aadd68d8ea7629865d5765`.
- Foundation evidence baseline:
  `981c03f364cebc59a330367b3688cae647a1dfb9`.
- Agent Office implementation worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_PRE_AS1_PHYSICAL_TRANSPORT_IDENTITY_MIGRATION_001`.

## Scope

Implement the narrowest explicit current-version contract. If reusing a v1
schema would make historical artifacts look current, introduce a current schema
version and fence legacy v1 material as historical-only. Do not invent a general
destination selector or dynamic browser routing.

Targeted checks: exact config/authority/preflight, legacy rejection or explicit
historical-only handling, ACK/intake/decision authority lineage, idempotency,
wrong-target negatives, typecheck, focused lint, and `git diff --check`.
