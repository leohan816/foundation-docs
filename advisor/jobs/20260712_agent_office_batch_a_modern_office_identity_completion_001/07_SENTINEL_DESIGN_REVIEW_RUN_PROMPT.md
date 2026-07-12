TARGET_ACTOR: Sentinel
TARGET_SESSION: separate Sentinel session, never Advisor/Control/Worker
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor

========
TARGET_ACTOR: Sentinel
TARGET_PROJECT: Agent Office Batch A design
TARGET_REPO: /home/leo/Project/agent-office-batch-a-001
TARGET_SESSION_NAME: foundation-reviewer-sol
REQUIRED_SKILL: /fable-sentinel
MODEL_EFFORT: GPT-5.6 SOL xhigh
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001/07_SENTINEL_DESIGN_REVIEW_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true

Open READ_AND_EXECUTE directly. Independently review exact design candidate
665b251 against base ac8ba75 and actual source. Do not trust summaries, patch,
implement, or grant final approval. Write and push only the exact result and
pointer, return the verdict to Advisor, and STOP.
========

