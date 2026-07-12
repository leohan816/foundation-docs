TARGET_ACTOR: Control-Rework
TARGET_SESSION: separate role session, never Advisor session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target session

========
TARGET_ACTOR: Control-Rework
TARGET_PROJECT: Agent Office Batch A
TARGET_REPO: /home/leo/Project/agent-office-batch-a-001
TARGET_SESSION_NAME: foundation-control
CONTROL_MODE: CONTROL_MASTER_DESIGN_MODE
READ_AND_EXECUTE: /home/leo/Project/foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001/09K_CONTROL_PRC1_PRC8_CONSOLIDATED_REWORK_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true

Open READ_AND_EXECUTE directly. Patch all Sentinel PRC-1 through PRC-8 in one
consolidated docs-only correction. Preserve every accepted boundary. No code,
agents, self-review, or Worker resume. Commit/push exact docs and Control
result/pointer, return to Advisor, and STOP.
========

