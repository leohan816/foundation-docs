# AS1 Phase B R2 Recovery Independent Design Review Run Prompt

Use `/fable-sentinel` and perform the exact independent design review in:

`advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/89_PHASE_B_R2_RECOVERY_INDEPENDENT_DESIGN_REVIEW_HANDOFF.md`

Read the committed handoff directly, verify the actual product candidate
`e2c9d002e030eefae0f67081653fab28f6500d4d`, inspect the product worktree
strictly read-only, and review the R2 design before any implementation.

Do not access secrets, connect to Slack, mutate either state root, activate a
descriptor, send tmux input, run broad product suites, or patch the candidate.

Write only the two exact result files named by the handoff in the governance
worktree, leave them uncommitted and unstaged, return one explicit verdict to
`agent-office-advisor`, and STOP.
