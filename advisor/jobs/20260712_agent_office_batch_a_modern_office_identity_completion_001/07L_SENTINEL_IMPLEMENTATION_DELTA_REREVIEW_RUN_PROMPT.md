TARGET_ACTOR: Sentinel-ReReview
TARGET_SESSION: separate role session, never Advisor session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target session

이 지시문을 붙여넣을 대상: 같은 기존 `foundation-reviewer-sol` Sentinel 세션
이 지시문을 붙여넣으면 안 되는 곳: Advisor / Control / Worker / Fable5 / GPT 전략 세션
작업 결과 반환 대상: Advisor

========
TARGET_ACTOR: Sentinel-ReReview
TARGET_PROJECT: Agent Office Batch A
TARGET_REPO: /home/leo/Project/agent-office-batch-a-001
TARGET_APP_ROOT: /home/leo/Project/agent-office-batch-a-001
TARGET_SESSION_NAME: foundation-reviewer-sol
REQUIRED_SKILL: /fable-sentinel
READ_AND_EXECUTE: /home/leo/Project/foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001/07L_SENTINEL_IMPLEMENTATION_DELTA_REREVIEW_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true

Open `READ_AND_EXECUTE` directly and perform the independent read-only
SIR-1..SIR-5 implementation delta re-review of candidate
`74d586660c8fc55c04bcaca6f7442cd14218eb33`. Inspect actual unmasked desktop
and mobile pixels, including label readability/overlap and Channy product
meaning. Do not patch. Use no agent, sub-agent, delegated context, or temporary
session. Write and push only the exact result and pointer files required by the
handoff, return the pointer to Advisor, and STOP.
========
