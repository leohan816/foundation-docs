TARGET_ACTOR: Control
TARGET_SESSION: separate Control session, never Advisor session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as Control

# Control Master Design Handoff

Use `CONTROL_MASTER_DESIGN_MODE` only.

Read the current files directly, starting with:

`../foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001/02_CONTROL_DESIGN_BRIEF.md`

Then read every required source named there from the isolated worktree
`/home/leo/Project/agent-office-batch-a-001` at exact base `ac8ba75`.

Produce the bounded Batch A application-integration design delta and the exact
result/pointer. Do not modify runtime source, tests, package/config, media, auth,
transport, DB, secrets, remote/public state, or Batch B-E. Do not implement,
review your own design, accept risk, or grant final approval. Use no agents,
sub-agents, delegated contexts, or new sessions.

Commit and non-force push only the four approved Agent Office documentation
paths and the exact Foundation Docs result/pointer paths. Return to Advisor and
stop.

