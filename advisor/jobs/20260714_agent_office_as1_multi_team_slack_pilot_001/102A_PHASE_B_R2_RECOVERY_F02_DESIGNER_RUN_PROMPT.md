Read and execute the exact committed handoff:

`advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/102_PHASE_B_R2_RECOVERY_F02_DESIGNER_HANDOFF.md`

Work only from product baseline
`d0b14949181d89c2caeb4e93bca91a2ea1647c80` in the named existing worktree.
This is a three-path design-only delta. Do not implement, inspect either real
state root, load secrets, connect Slack, send tmux input, or dispatch another
actor. Return the committed result pointer to `agent-office-advisor` and STOP.
