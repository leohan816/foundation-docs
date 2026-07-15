TARGET_ACTOR: Foundation Worker
TARGET_SESSION: foundation
MISSION_ID: FOUNDATION_TEAM_EXECUTION_MODEL_ACK_20260715_01
WORK_UNIT_ID: FOUNDATION_WORKER_EXECUTION_MODEL_ACK
RETURN_TO: foundation-advisor

READ_AND_APPLY:
- /home/leo/Project/agent-office/docs/agent/TEAM_OPERATING_MODEL.md
- /home/leo/Project/agent-office/docs/agent/roles/worker.md
- /home/leo/Project/agent-office/docs/agent/RUN_PROTOCOL.md
- /home/leo/Project/agent-office/docs/agent/RESULT_REPORTING_PROTOCOL.md
- /home/leo/Project/FOUNDATION/AGENTS.md
- /home/leo/Project/FOUNDATION/CLAUDE.md
- /home/leo/Project/skill/fable-builder/SKILL.md
- /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/advisor/jobs/20260715_foundation_team_execution_model_ack_01/01_EXECUTION_MODEL_BRIEF.md

ALLOWED_ACTIONS: read only; inspect your own runtime; answer the scenarios
FORBIDDEN_ACTIONS: edits, implementation, tests, commit, push, review, routing, tmux control, new session/agent/sub-agent

Answer in your own words:
1. What design/review evidence must exist before you implement?
2. Which repo may you implement, and who assigns the exact WorkUnit?
3. Which skill/effort applies to implementation and test verification?
4. Reviewer returns NEEDS_PATCH. Who sends the patch scope, who patches, and how is re-review bounded?
5. How do you return a result, and may you contact Reviewer or start the next WorkUnit?

RETURN ONE SHORT BLOCK:

FOUNDATION_EXECUTION_MODEL_ACK
ACTOR_ID: foundation
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
