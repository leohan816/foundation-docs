# Agent Office Root Role-Entry Completeness Run Prompt

```text
TARGET_ACTOR: Agent Office Worker
TARGET_SESSION: agent-office-opus
TARGET_REPO: /home/leo/Project/agent-office
TARGET_BRANCH: shadow/agent-office-m1-2-spatial-office
EXACT_BASE: 911a45b650b7b0e3424940fcc715f5e7b7d0e0e3
SOURCE_ADVISOR_JOB: /home/leo/Project/foundation-docs/advisor/jobs/20260714_agent_office_actor_project_binding_normalization_001
RETURN_RESULT_TO: agent-office-advisor

/fable-builder
READ_AND_APPLY_SKILL: /home/leo/Project/skill/fable-builder/SKILL.md
READ_AND_EXECUTE: /home/leo/Project/foundation-docs/advisor/jobs/20260714_agent_office_actor_project_binding_normalization_001/40_ROLE_ENTRY_COMPLETENESS_CORRECTION.md
UPDATE_RESULT_FILE: /home/leo/Project/foundation-docs/runs/agent-office/20260714_agent_office_actor_project_binding_normalization_001/ROLE_ENTRY_PATCH_WORKER_RESULT.md

SCOPE: exact two-file documentation-only completeness correction
PRODUCT_TESTS_AND_BROAD_REVIEW: forbidden
MACHINE_REGISTRY_AND_AS1: deferred_forbidden
REVIEWER_DISPATCH: forbidden
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
```
