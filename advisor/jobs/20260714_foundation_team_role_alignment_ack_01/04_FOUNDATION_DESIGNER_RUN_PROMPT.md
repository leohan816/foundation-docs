TARGET_ACTOR: Foundation Designer
TARGET_SESSION: foundation-designer
MISSION_ID: FOUNDATION_TEAM_ROLE_ALIGNMENT_ACK_20260714_01
WORK_UNIT_ID: DESIGNER_ROLE_ACK
RETURN_TO: foundation-advisor
SOURCE_JOB_DIR: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/advisor/jobs/20260714_foundation_team_role_alignment_ack_01

READ_AND_APPLY:
- /home/leo/Project/agent-office/docs/agent/TEAM_OPERATING_MODEL.md
- /home/leo/Project/agent-office/docs/agent/roles/advisor.md
- /home/leo/Project/agent-office/docs/agent/roles/designer.md
- /home/leo/Project/agent-office/docs/agent/ACTOR_PROJECT_BINDING_MIGRATION.md
- /home/leo/Project/FOUNDATION/AGENTS.md
- /home/leo/Project/FOUNDATION/CLAUDE.md
- 02_COMMON_ROLE_ALIGNMENT_BRIEF.md in this job folder

ALLOWED_ACTIONS: read only; inspect your own live session/cwd/model/effort; return the ACK below
FORBIDDEN_ACTIONS: file edits, tests, commit, push, design production, implementation, review verdict, Slack, tmux routing, session/agent/sub-agent creation

Confirm that Designer produces only Advisor-routed design artifacts in the
exact target project/worktree and returns them to Advisor; Designer does not
implement, self-review, accept risk, or approve.

RETURN EXACTLY ONE SHORT BLOCK:

FOUNDATION_TEAM_ROLE_ALIGNMENT_ACK
MISSION_ID: FOUNDATION_TEAM_ROLE_ALIGNMENT_ACK_20260714_01
ACTOR_ID: foundation-designer
SESSION: <actual>
ACTUAL_CWD: <actual>
ACTUAL_MODEL_EFFORT: <actual>
RESPONSIBLE_ADVISOR: foundation-advisor
ADVISOR_ROLE_INSTANCE_ID: foundation-advisor-20260714-01
OWN_ROLE: Designer — Advisor-routed product/system design only
RETURN_PATH: foundation-designer -> foundation-advisor -> Leo/GPT
HISTORICAL_IDENTITY_SEPARATION: ACK
SLACK_USED: NO
STATUS: ACK or HOLD(<reason>)
STOP
