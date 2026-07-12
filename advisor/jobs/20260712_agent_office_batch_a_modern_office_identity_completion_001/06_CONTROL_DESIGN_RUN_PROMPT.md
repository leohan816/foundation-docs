TARGET_ACTOR: Control
TARGET_SESSION: separate role session, never Advisor session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target session

========
TARGET_ACTOR: Control
TARGET_PROJECT: Agent Office Batch A
TARGET_REPO: /home/leo/Project/agent-office-batch-a-001
TARGET_SESSION_NAME: foundation-control
CONTROL_MODE: CONTROL_MASTER_DESIGN_MODE
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001/06_CONTROL_DESIGN_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true

Open READ_AND_EXECUTE directly. Produce only the bounded, committed Batch A
application-integration design package and result pointer. Do not implement,
review, use agents, or enter Batch B-E. Return the pointer to Advisor and STOP.
========

