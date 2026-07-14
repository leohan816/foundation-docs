# SIASIU Worker Run Prompt

TARGET_ACTOR: Worker
TARGET_SESSION: `siasiu`
SOURCE_ADVISOR_JOB: `/home/leo/Project/foundation-docs/advisor/jobs/20260714_agent_office_actor_project_binding_normalization_001`
DO_NOT_PASTE_INTO: Advisor or Reviewer session
RETURN_RESULT_TO: `foundation-advisor`

========
/fable-builder
TARGET_ACTOR: SIASIU Worker
TARGET_PROJECT: SIASIU
TARGET_REPO: /home/leo/Project/SIASIU
TARGET_SESSION_NAME: siasiu
REQUIRED_SKILL: /fable-builder
READ_AND_EXECUTE: /home/leo/Project/foundation-docs/advisor/jobs/20260714_agent_office_actor_project_binding_normalization_001/04_SIASIU_PROJECT_WORKER_BRIEF.md
RETURN_RESULT_TO: foundation-advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
NO_SLACK_IMPLEMENTATION: true
NO_PRODUCT_TESTS: true
========
