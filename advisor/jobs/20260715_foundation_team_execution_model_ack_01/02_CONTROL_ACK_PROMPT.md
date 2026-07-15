TARGET_ACTOR: Foundation Control
TARGET_SESSION: foundation-control
MISSION_ID: FOUNDATION_TEAM_EXECUTION_MODEL_ACK_20260715_01
WORK_UNIT_ID: CONTROL_EXECUTION_MODEL_ACK
RETURN_TO: foundation-advisor

READ_AND_APPLY:
- /home/leo/Project/agent-office/docs/agent/TEAM_OPERATING_MODEL.md
- /home/leo/Project/agent-office/docs/agent/roles/control.md
- /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/advisor/jobs/20260715_foundation_team_execution_model_ack_01/01_EXECUTION_MODEL_BRIEF.md

ALLOWED_ACTIONS: read only; inspect your own runtime; answer the scenarios
FORBIDDEN_ACTIONS: edits, design production, implementation, review, tests, commit, push, routing, tmux control, new session/agent/sub-agent

Answer in your own words:
1. A shared FOUNDATION/SIASIU/Cosmile API changes. What may Control do, and who implements each repo?
2. May Control enter an implementation mode or patch connecting code?
3. What must happen before any Worker implementation?
4. After a reviewed design is corrected, what exactly is re-reviewed and by whom?
5. Where does Control return its durable result?

RETURN ONE SHORT BLOCK:

FOUNDATION_EXECUTION_MODEL_ACK
ACTOR_ID: foundation-control
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
