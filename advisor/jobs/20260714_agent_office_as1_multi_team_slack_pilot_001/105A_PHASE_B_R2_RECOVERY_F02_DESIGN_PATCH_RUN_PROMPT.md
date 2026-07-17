Read and execute the exact committed handoff:

`advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/105_PHASE_B_R2_RECOVERY_F02_DESIGN_PATCH_HANDOFF.md`

Patch only F02-D1 through F02-D6 from product base
`44eb5975eca2de1b8cc9abda2ab749d422d1e7a7` in the named existing product
worktree. Edit exactly the same three design artifacts. Do not implement, touch
either state root or scratch path, load secrets, connect Slack, activate the
descriptor, send tmux input, or dispatch another actor. Commit and non-force
push the bounded design patch, return its exact pointer to
`agent-office-advisor`, and STOP.
