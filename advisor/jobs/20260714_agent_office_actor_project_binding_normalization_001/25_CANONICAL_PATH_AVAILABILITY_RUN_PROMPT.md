# Canonical Path Availability Run Prompt

TARGET_ACTOR: Worker-Rework
TARGET_SESSION: `agent-office-opus`
SOURCE_ADVISOR_JOB: `/home/leo/Project/foundation-docs/advisor/jobs/20260714_agent_office_actor_project_binding_normalization_001`
DO_NOT_PASTE_INTO: Advisor or Reviewer session
RETURN_RESULT_TO: `agent-office-advisor`

========
/fable-builder
TARGET_ACTOR: Agent Office Documentation Worker-Rework
TARGET_SESSION_NAME: agent-office-opus
READ_AND_EXECUTE: /home/leo/Project/foundation-docs/advisor/jobs/20260714_agent_office_actor_project_binding_normalization_001/24_CANONICAL_PATH_AVAILABILITY_DELTA.md
CHERRY_PICK_ONLY: b6fd321b27b0bb76d1ea935bb7ab977924fdf5ba 5df16b3
ALLOWED_PATHS: AGENTS.md CLAUDE.md docs/agent/**
SOURCE_TEST_PRODUCT_CONFIG_CHANGES: forbidden
VIBENEWS_MASTER_MERGE: forbidden
MACHINE_REGISTRY_AND_AS1: deferred
RETURN_RESULT_TO: agent-office-advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
========
