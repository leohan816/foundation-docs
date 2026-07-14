# SOL Sentinel Delta Review Run Prompt

TARGET_ACTOR: Sentinel
TARGET_SESSION: `agent-office-reviewer`
SOURCE_ADVISOR_JOB: `/home/leo/Project/foundation-docs/advisor/jobs/20260714_agent_office_actor_project_binding_normalization_001`
DO_NOT_PASTE_INTO: Advisor or Worker session
RETURN_RESULT_TO: `agent-office-advisor`

========
/fable-sentinel
TARGET_ACTOR: Agent Office Independent SOL Sentinel
TARGET_PROJECT: Agent Office actor/project binding normalization
TARGET_REPO: /home/leo/Project/agent-office
TARGET_SESSION_NAME: agent-office-reviewer
REQUIRED_SKILL: /fable-sentinel
READ_AND_EXECUTE: /home/leo/Project/foundation-docs/advisor/jobs/20260714_agent_office_actor_project_binding_normalization_001/26_SOL_SENTINEL_DELTA_REVIEW_BRIEF.md
REVIEW_TYPE: OWNERSHIP_REFERENCE_DOCUMENTATION_DELTA
READ_ONLY: true
ONE_REVIEWER_ONLY: true
PRODUCT_TESTS: forbidden
PATCH_COMMIT_PUSH_MERGE_TMUX: forbidden
RETURN_RESULT_TO: agent-office-advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
========
