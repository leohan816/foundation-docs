# Documentation-Only Worker Correction Run Prompt

TARGET_ACTOR: Worker-Rework
TARGET_SESSION: `agent-office-opus`
SOURCE_ADVISOR_JOB: `/home/leo/Project/foundation-docs/advisor/jobs/20260714_agent_office_actor_project_binding_normalization_001`
DO_NOT_PASTE_INTO: Advisor or Reviewer session
RETURN_RESULT_TO: `agent-office-advisor`

========
/fable-builder
TARGET_ACTOR: Agent Office Documentation Worker
TARGET_SESSION_NAME: agent-office-opus
READ_CORRECTION_FIRST: /home/leo/Project/foundation-docs/advisor/jobs/20260714_agent_office_actor_project_binding_normalization_001/18_DOCUMENTATION_ONLY_CORRECTION.md
READ_AND_EXECUTE: /home/leo/Project/foundation-docs/advisor/jobs/20260714_agent_office_actor_project_binding_normalization_001/02_AGENT_OFFICE_WORKER_BRIEF.md
AUTHORIZED_WORKTREE: /home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_ACTOR_PROJECT_BINDING_NORMALIZATION_001
ROLE_ASSIGNMENT_DOCUMENTATION_ONLY: true
SOURCE_CHANGES: forbidden
TEST_CHANGES: forbidden
PRODUCT_TESTS: forbidden
NEW_SCHEMA_OR_REGISTRY: forbidden
ONE_COMMON_ROLE_SOURCE: /home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_ACTOR_PROJECT_BINDING_NORMALIZATION_001/docs/agent
RETURN_RESULT_TO: agent-office-advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
========
