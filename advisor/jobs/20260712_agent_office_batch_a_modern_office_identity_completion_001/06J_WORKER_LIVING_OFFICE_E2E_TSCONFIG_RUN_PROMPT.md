TARGET_ACTOR: Worker-Rework
TARGET_SESSION: separate role session, never Advisor session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target session

========
TARGET_ACTOR: Agent Office Worker-Rework
TARGET_PROJECT: Agent Office Batch A
TARGET_REPO: /home/leo/Project/agent-office-batch-a-001
TARGET_APP_ROOT: /home/leo/Project/agent-office-batch-a-001
TARGET_SESSION_NAME: agent-office-opus
REQUIRED_SKILL: /fable-builder
READ_AND_EXECUTE: /home/leo/Project/foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001/06J_WORKER_LIVING_OFFICE_E2E_TSCONFIG_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true

Open READ_AND_EXECUTE directly at the next safe checkpoint. Register only the
authorized Living Office Playwright config in tsconfig.json, preserve strict
lint/type rules, then continue WU-08/WU-09, full gates, result, commit, and
push. Use /fable-builder. No agents. Stop only for a mandatory blocker or
completed Batch A return.
========
