TARGET_ACTOR: Designer
TARGET_SESSION: agent-office-designer
SOURCE_ADVISOR_JOB: advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001
RETURN_RESULT_TO: agent-office-advisor

========
TARGET_ACTOR: Agent Office Designer
TARGET_PROJECT: Agent Office
TARGET_APP_ROOT: /home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001
TARGET_SESSION_NAME: agent-office-designer
MODEL_EFFORT: gpt-5.6-sol / max (verify live; do not infer from session name)
PATCH_BASE: 86c7edb3f5cee26171fcb80c0704c46962d15be6
REVIEW_VERDICT_COMMIT: 9471326e0179a852254bc53352a89355c57207b7
READ_AND_EXECUTE: /home/leo/Project/.worktrees/foundation-docs/AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001/advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/12_DESIGNER_F01_D1_PATCH_HANDOFF.md
DO_NOT_EXECUTE_FROM_MEMORY: true
F01_D1_ONLY: true
DO_NOT_BROADEN_SCOPE: true
NO_IMPLEMENTATION: true
NO_AGENTS_OR_SUBAGENTS: true
NO_SECRET_OR_LIVE_SLACK: true
NO_TMUX_MUTATION: true
NO_REVIEW_OR_NEXT_ACTOR_DISPATCH: true

Apply only the bounded F01-D1 expiry/recovery documentation correction, write
the exact durable result and pointer, commit and non-force push in protocol
order, return the pointer to agent-office-advisor, and STOP.
========
