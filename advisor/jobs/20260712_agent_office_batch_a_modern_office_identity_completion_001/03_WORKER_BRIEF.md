# Opus Worker Brief - Batch A

Status: `WAITING_FOR_ACCEPTED_CONTROL_DESIGN`

The Worker will implement the accepted Control design in the same isolated
worktree and branch. The exact implementation handoff will be published only
after Advisor validates the committed Control design.

Worker requirements are fixed now:

- existing `agent-office-opus` session only;
- actual Opus 4.8 and Ultracode reverified before dispatch;
- `/fable-builder` required;
- no agents, sub-agents, delegation, or temporary contexts;
- no Grok code reuse and no input to the excluded historical Agent Office
  context;
- strict lint/type/security/accessibility rules may not be weakened;
- no file-wide suppression or inaccurate test totals;
- exact-path staging, non-force push, durable result, then stop.

Expected result:

- `/home/leo/Project/foundation-docs/runs/agent-office/20260712_agent_office_batch_a_modern_office_identity_completion_001/WORKER_RESULT.md`
- pointer `12_WORKER_RESULT_POINTER.md` in this Advisor job.

