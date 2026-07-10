# Leo One-Time Bootstrap Reload Authorization

Status: `APPROVED_FOR_EXACT_RELOAD_LAUNCHERS_ONLY`

Recorded at: 2026-07-10T18:47:43Z

Leo explicitly instructed Advisor: send and execute all required reload prompts,
and confirmed personal approval after Advisor explained that general transport was
still inactive.

## Narrow Interpretation

This is a one-time manual dispatch delegation for only the five committed read-only
reload launchers at commit `8fc4d6df1059a99c2a8645c194af4dfd05f4c671`.

It does not:

- activate `ADVISOR_MANAGED_EXISTING_TMUX_TRANSPORT`;
- disengage the global transport kill switch;
- authorize product work, implementation, review, commit/push, DB, secrets,
  production, or live access;
- permit new sessions, agents, sub-agents, or delegated contexts;
- permit clearing, interrupting, or overwriting a busy pane or pending input;
- permit launcher edits or memory-based execution.

## Fail-Closed Dispatch Rule

Advisor may send an exact launcher only when the named existing pane passes live
identity, workspace, process, role, readiness, synchronized-pane, and checksum
checks. Any busy pane, running background task, pending input, mismatch, or
unexpected interaction remains `HOLD` and receives no input.

General autonomous transport remains `NOT_ACTIVE`; kill switch remains `ENGAGED`;
manual fallback remains `ACTIVE`.
