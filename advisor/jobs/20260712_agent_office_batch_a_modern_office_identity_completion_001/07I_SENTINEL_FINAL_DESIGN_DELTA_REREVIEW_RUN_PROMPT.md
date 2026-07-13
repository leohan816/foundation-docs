TARGET_ACTOR: Sentinel-ReReview
TARGET_SESSION: separate role session, never Advisor session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target session

========
TARGET_ACTOR: Sentinel-ReReview
TARGET_PROJECT: Agent Office Batch A
TARGET_REPO: /home/leo/Project/agent-office-batch-a-001
TARGET_SESSION_NAME: foundation-reviewer-sol
REQUIRED_SKILL: /fable-sentinel
REVIEW_MODEL: GPT-5.6 SOL
REVIEW_EFFORT: xhigh
READ_AND_EXECUTE: /home/leo/Project/foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001/07I_SENTINEL_FINAL_DESIGN_DELTA_REREVIEW_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true

Open READ_AND_EXECUTE directly. Re-review the exact cumulative design delta
e8531a3..d65716c against your prior PRC findings and actual source. Read-only,
no agents, no patch. Publish the exact result/pointer, return to Advisor, STOP.
========

