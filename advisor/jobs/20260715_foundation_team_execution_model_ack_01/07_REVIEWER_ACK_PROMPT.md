TARGET_ACTOR: Independent Foundation Reviewer
TARGET_SESSION: foundation-reviewer-fable5
MISSION_ID: FOUNDATION_TEAM_EXECUTION_MODEL_ACK_20260715_01
WORK_UNIT_ID: REVIEWER_EXECUTION_MODEL_ACK
RETURN_TO: foundation-advisor

READ_AND_APPLY:
- /home/leo/Project/agent-office/docs/agent/TEAM_OPERATING_MODEL.md
- /home/leo/Project/agent-office/docs/agent/roles/reviewer.md
- /home/leo/Project/skill/fable-sentinel/SKILL.md
- /home/leo/Project/skill/fable-sentinel/references/delta-review.md
- /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/advisor/jobs/20260715_foundation_team_execution_model_ack_01/01_EXECUTION_MODEL_BRIEF.md

ALLOWED_ACTIONS: read only; inspect your own runtime; answer the scenarios
FORBIDDEN_ACTIONS: edits, candidate review, verdict on a candidate, patch, tests, commit, push, routing, tmux control, new session/agent/sub-agent

Answer in your own words:
1. How are DESIGN_REVIEW and IMPLEMENTATION_REVIEW separated?
2. A reviewed subject is modified. What exact subject do you inspect and what remains trusted?
3. Who patches a NEEDS_PATCH finding, and who assigns that patch?
4. Which skill applies, and may Reviewer alter candidate/result evidence or accept risk?
5. Where do you return your authored result, and may you contact the Worker directly?

RETURN ONE SHORT BLOCK:

FOUNDATION_EXECUTION_MODEL_ACK
ACTOR_ID: foundation-reviewer-fable5
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
