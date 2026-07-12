# Advisor Brief

Verdict: `PROCEED_WITH_LIMITS`

## Verified State

- same existing Worker tmux identity: `$16/@16/%16`;
- old session name: `agent-office-grok`;
- new session name: `agent-office-opus`;
- workspace: `/home/leo/Project/agent-office`;
- process: Claude Code;
- model: `Opus 4.8 (1M context)`;
- effort: `ultracode`;
- same existing independent Reviewer: `foundation-reviewer/$5/@5/%5`, formerly
  named `reviewer-fable5`;
- Reviewer model: `Opus 4.8 (1M context)`;
- Reviewer effort: `max`;
- Agent Office product branch: `ac8ba75`, equal to origin;
- no Grok pilot merge exists.

## Boundaries

- no implementation launcher is created;
- Worker must use `/fable-builder` on future implementation work;
- Reviewer must use `/fable-sentinel` and remain read-only;
- the model-neutral Reviewer session name never determines model provenance;
- result provenance must identify the actual model, currently Opus 4.8;
- a future mission must create a fresh isolated worktree and branch;
- `agent-office-sol/$13/@13/%13` is the same existing Codex SOL session formerly
  named `agent-office` and remains excluded unless a future mission says
  otherwise;
- final approval remains Leo/GPT.
