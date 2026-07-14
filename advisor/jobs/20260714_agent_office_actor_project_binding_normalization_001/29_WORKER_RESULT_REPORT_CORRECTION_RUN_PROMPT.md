# Worker Result Report Correction Run Prompt

TARGET_ACTOR: Worker-Rework
TARGET_SESSION: `agent-office-opus`
SOURCE_ADVISOR_JOB: `/home/leo/Project/foundation-docs/advisor/jobs/20260714_agent_office_actor_project_binding_normalization_001`
RETURN_RESULT_TO: `agent-office-advisor`

========
/fable-builder
TARGET_ACTOR: Agent Office Worker-Rework
TARGET_PROJECT: Agent Office actor/project binding normalization
TARGET_REPO: /home/leo/Project/agent-office
TARGET_SESSION_NAME: agent-office-opus
REQUIRED_SKILL: /fable-builder
TASK: Correct one stale statement in WORKER_RESULT.md only. The canonical Agent Office checkout already contains the documentation at commit 2c91b74, so remove the outdated claim that the canonical role files resolve only after a future merge. Preserve the distinct true limitation that VibeNews commit cc7f8cd remains on its docs-only review branch with no protected/master merge. Do not change code, project documents, commits, branches, tests, tmux, or any other result content. Return the updated result path and SHA-256 only.
RESULT_FILE: /home/leo/Project/foundation-docs/runs/agent-office/20260714_agent_office_actor_project_binding_normalization_001/WORKER_RESULT.md
RETURN_RESULT_TO: agent-office-advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
========
