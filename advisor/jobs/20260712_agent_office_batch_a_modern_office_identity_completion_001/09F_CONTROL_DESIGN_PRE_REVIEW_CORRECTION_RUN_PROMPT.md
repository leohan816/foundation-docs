TARGET_ACTOR: Control-Rework
TARGET_SESSION: same existing foundation-control session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor

========
TARGET_ACTOR: Control-Rework
TARGET_PROJECT: Agent Office Batch A design
TARGET_REPO: /home/leo/Project/agent-office-batch-a-001
TARGET_SESSION_NAME: foundation-control
CONTROL_MODE: CONTROL_MASTER_DESIGN_MODE
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001/09F_CONTROL_DESIGN_PRE_REVIEW_CORRECTION_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true

Open READ_AND_EXECUTE directly. Correct Advisor T1-T3 only in the same design
paths, update result/pointer, commit and non-force push, return to Advisor, and
STOP. No implementation or self-review.
========
