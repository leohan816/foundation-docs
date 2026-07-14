# Bounded Worker Scope Correction Run Prompt

TARGET_ACTOR: Worker-Rework
TARGET_SESSION: `agent-office-opus`
SOURCE_ADVISOR_JOB: `/home/leo/Project/foundation-docs/advisor/jobs/20260714_agent_office_actor_project_binding_normalization_001`
DO_NOT_PASTE_INTO: Advisor or Reviewer session
RETURN_RESULT_TO: `agent-office-advisor`

========
/fable-builder
TARGET_ACTOR: Agent Office Worker
TARGET_PROJECT: Agent Office actor/project binding normalization
TARGET_REPO: /home/leo/Project/agent-office
TARGET_SESSION_NAME: agent-office-opus
REQUIRED_SKILL: /fable-builder
FOUNDER_SCOPE_CORRECTION: /home/leo/Project/foundation-docs/advisor/jobs/20260714_agent_office_actor_project_binding_normalization_001/13_FOUNDER_SCOPE_TIMEBOX_CORRECTION.md
READ_AND_EXECUTE: /home/leo/Project/foundation-docs/advisor/jobs/20260714_agent_office_actor_project_binding_normalization_001/02_AGENT_OFFICE_WORKER_BRIEF.md
SUPERSEDES_PREVIOUS_WORKER_PROMPT: true
ONE_WORKER_ONLY: true
ONE_REVIEWER_ONLY: true
TARGET_COMPLETION_MINUTES: 60
HARD_STOP_MINUTES: 120
RETURN_RESULT_TO: agent-office-advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
NO_SLACK_IMPLEMENTATION: true
NO_PRODUCT_OR_VISUAL_TESTS: true
========
