TARGET_ACTOR: Cosmile Worker
TARGET_SESSION: cosmile
MISSION_ID: FOUNDATION_TEAM_ROLE_ALIGNMENT_ACK_20260714_01
WORK_UNIT_ID: COSMILE_WORKER_ROLE_ACK
RETURN_TO: foundation-advisor

READ_AND_APPLY:
- /home/leo/Project/agent-office/docs/agent/TEAM_OPERATING_MODEL.md
- /home/leo/Project/agent-office/docs/agent/roles/advisor.md
- /home/leo/Project/agent-office/docs/agent/roles/worker.md
- /home/leo/Project/agent-office/docs/agent/RUN_PROTOCOL.md
- /home/leo/Project/agent-office/docs/agent/RESULT_REPORTING_PROTOCOL.md
- /home/leo/Project/agent-office/docs/agent/ACTOR_PROJECT_BINDING_MIGRATION.md
- /home/leo/Project/Cosmile/AGENTS.md
- /home/leo/Project/Cosmile/CLAUDE.md
- 02_COMMON_ROLE_ALIGNMENT_BRIEF.md in this job folder

ALLOWED_ACTIONS: read only; inspect your own live session/cwd/model/effort; return the ACK below
FORBIDDEN_ACTIONS: file edits, tests, commit, push, implementation, review verdict, Slack, tmux routing, session/agent/sub-agent creation

Confirm that Cosmile Worker implements only exact Advisor-routed repo-local
commerce work, returns evidence to Advisor, and does not own Foundation
canonical judgment or SIASIU consultation behavior.

RETURN EXACTLY ONE SHORT BLOCK:

FOUNDATION_TEAM_ROLE_ALIGNMENT_ACK
MISSION_ID: FOUNDATION_TEAM_ROLE_ALIGNMENT_ACK_20260714_01
ACTOR_ID: cosmile
SESSION: <actual>
ACTUAL_CWD: <actual>
ACTUAL_MODEL_EFFORT: <actual>
RESPONSIBLE_ADVISOR: foundation-advisor
ADVISOR_ROLE_INSTANCE_ID: foundation-advisor-20260714-01
OWN_ROLE: Cosmile Worker — exact repo-local commerce implementation handoff only
RETURN_PATH: cosmile -> foundation-advisor -> Leo/GPT
HISTORICAL_IDENTITY_SEPARATION: ACK
SLACK_USED: NO
STATUS: ACK or HOLD(<reason>)
STOP
