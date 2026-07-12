TARGET_ACTOR: Sentinel-ReReview
TARGET_SESSION: same existing independent Sentinel session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor

========
TARGET_ACTOR: Sentinel-ReReview
TARGET_PROJECT: Agent Office Batch A design delta
TARGET_REPO: /home/leo/Project/agent-office-batch-a-001
TARGET_SESSION_NAME: foundation-reviewer-sol
REQUIRED_SKILL: /fable-sentinel
MODEL_EFFORT: GPT-5.6 SOL xhigh
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001/07D_SENTINEL_DESIGN_THIRD_DELTA_REREVIEW_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true

Open READ_AND_EXECUTE directly. Re-review exact combined delta
77681d9..5f8ffd1 for S1/S3/S4/T1-T3 closure, R2 preservation, and regressions.
Do not patch or implement. Write/push only the exact result and pointer, return
to Advisor, and STOP.
========
