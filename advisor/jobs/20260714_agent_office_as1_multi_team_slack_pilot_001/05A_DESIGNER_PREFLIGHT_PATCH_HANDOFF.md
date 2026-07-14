# Designer Preflight Patch Handoff

TARGET_ACTOR: Agent Office Designer

TARGET_SESSION: `agent-office-designer`

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

READ_AND_EXECUTE:
`advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/05A_DESIGNER_PREFLIGHT_PATCH_BRIEF.md`

Work only in the existing AS1 hidden worktree from exact patch base
`daf46e5885151acf2b430288464b137d0370efb1`. Preserve the initial package and
evidence history. Make only the six-file bounded correction/evidence delta,
commit and non-force push, return the exact patch pointer to
`agent-office-advisor`, and STOP. Do not dispatch Reviewer or Worker.
