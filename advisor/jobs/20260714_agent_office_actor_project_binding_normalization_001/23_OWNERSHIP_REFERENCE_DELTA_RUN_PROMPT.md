# Ownership And Reference Delta Run Prompt

TARGET_ACTOR: Worker-Rework
TARGET_SESSION: `agent-office-opus`
SOURCE_ADVISOR_JOB: `/home/leo/Project/foundation-docs/advisor/jobs/20260714_agent_office_actor_project_binding_normalization_001`
DO_NOT_PASTE_INTO: Advisor or Reviewer session
RETURN_RESULT_TO: `agent-office-advisor`

========
/fable-builder
TARGET_ACTOR: Agent Office Documentation Worker-Rework
TARGET_SESSION_NAME: agent-office-opus
READ_AND_EXECUTE: /home/leo/Project/foundation-docs/advisor/jobs/20260714_agent_office_actor_project_binding_normalization_001/22_OWNERSHIP_REFERENCE_DELTA_BRIEF.md
REUSE_CURRENT_COMMITS: true
DELTA_ONLY: true
SOURCE_TEST_REGISTRY_CHANGES: forbidden
PRODUCT_TESTS: forbidden
SLACK_AS1: forbidden
MACHINE_REGISTRY: unchanged_deferred_until_separate_pre_AS1_config_delta
RETURN_RESULT_TO: agent-office-advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
========
