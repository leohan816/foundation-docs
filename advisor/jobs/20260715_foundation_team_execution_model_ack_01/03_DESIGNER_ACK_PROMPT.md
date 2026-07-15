TARGET_ACTOR: Foundation Designer
TARGET_SESSION: foundation-designer
MISSION_ID: FOUNDATION_TEAM_EXECUTION_MODEL_ACK_20260715_01
WORK_UNIT_ID: DESIGNER_EXECUTION_MODEL_ACK
RETURN_TO: foundation-advisor

READ_AND_APPLY:
- /home/leo/Project/agent-office/docs/agent/TEAM_OPERATING_MODEL.md
- /home/leo/Project/agent-office/docs/agent/roles/designer.md
- /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/advisor/jobs/20260715_foundation_team_execution_model_ack_01/01_EXECUTION_MODEL_BRIEF.md

ALLOWED_ACTIONS: read only; inspect your own runtime; answer the scenarios
FORBIDDEN_ACTIONS: edits, actual design work, implementation, review, tests, commit, push, routing, tmux control, new session/agent/sub-agent

Answer in your own words:
1. Which implementation missions require a Designer artifact?
2. Can a small implementation omit design entirely?
3. What gate follows the design before a Worker may start?
4. If design review requires correction, who patches it and how is it re-reviewed?
5. May Designer implement, self-review, or send work directly to a Worker?

RETURN ONE SHORT BLOCK:

FOUNDATION_EXECUTION_MODEL_ACK
ACTOR_ID: foundation-designer
SESSION: <actual>
ACTUAL_CWD: <actual>
ACTUAL_MODEL_EFFORT: <actual>
ANSWERS:
1. <answer>
2. <answer>
3. <answer>
4. <answer>
5. <answer>
STATUS: ACK or HOLD(<reason>)
RETURN_TO: foundation-advisor
STOP
