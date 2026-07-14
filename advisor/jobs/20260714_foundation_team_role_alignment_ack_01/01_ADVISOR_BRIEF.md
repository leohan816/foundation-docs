# Advisor Brief — Foundation Team Role Alignment ACK

Status: `ACTIVE`

## Classification

```text
INSTRUCTION_CLASSIFICATION: PROCEED_WITH_LIMITS
TARGET_PROJECT: CROSS_PROJECT
RISK: LOW
REQUIRED_ROLES: Advisor plus role acknowledgement from existing Foundation Team actors
LEO_DECISION_REQUIRED: NO
```

## Goal

Ensure every existing Foundation Team subordinate understands that the new
responsible Advisor is `foundation-advisor` with immutable role instance ID
`foundation-advisor-20260714-01`, that it does not inherit the former Agent
Office Advisor's identity or evidence, and that assignment/results route only
through this Advisor.

## Target actors

- `foundation-control`
- `foundation-designer`
- Foundation Worker in `foundation`
- SIASIU Worker in `siasiu`
- Cosmile Worker in `cosmile`
- independent Foundation Reviewer in `foundation-reviewer-fable5`

## Completion criteria

1. Each exact existing session receives its actor-specific committed prompt.
2. Each actor reports its actual session, cwd, model/effort, own role boundary,
   responsible Advisor binding, return path, historical-identity separation,
   and STOP.
3. No actor modifies files or starts product work.
4. Advisor records direct pane evidence and any mismatch.

## Canonical distinctions

- Advisor instruction classifications are `PROCEED`,
  `PROCEED_WITH_LIMITS`, `NEEDS_DECISION`, `HOLD`, and `FAIL`.
- Reviewer verdicts in the active Reviewer role document are `PASS`,
  `PASS_WITH_RISK`, `NEEDS_PATCH`, and `FAIL`.
- Slack instructions are future-conditional only; this mission uses no Slack.

## Dispatch method

Serial exact-prompt delivery to verified existing tmux panes. No broadcast,
synchronized panes, session creation, renaming, clearing, or interruption.
