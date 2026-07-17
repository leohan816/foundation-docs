Perform the exact independent F01 Patch 2 delta review in:

`advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/99_PHASE_B_R2_RECOVERY_F01_PATCH_2_INDEPENDENT_DELTA_REVIEW_HANDOFF.md`

Read and apply `/home/leo/Project/skill/fable-sentinel/SKILL.md`. Verify the
actual Reviewer runtime, model, effort, workspace, and independence. Keep the
product worktree strictly read-only.

Inspect the exact `5911a5b..d0b1494` source delta before reading the Worker
summary. Reproduce only the focused gates named in handoff 99. Determine
whether F01-R1 is closed at every resume/reconciliation durable boundary,
whether non-ordering store failures still reach B08, and whether the six tests
and fresh evidence are accurate.

Do not repeat the prior broad R2 review. F02 remains outside this patch and
activation-blocking; verify it is untouched and report
`LIVE_R2_SLACK_ACTIVATION: BLOCKED_F02` even if the bounded delta verdict is
PASS.

Write only result 100 and pointer 100 in the governance worktree. Do not access
secrets, touch either real root, connect Slack, activate the descriptor,
observe or mutate a live destination, send tmux input, patch the product,
delegate, or start another mission. Return one explicit delta verdict to
`agent-office-advisor` and STOP.
