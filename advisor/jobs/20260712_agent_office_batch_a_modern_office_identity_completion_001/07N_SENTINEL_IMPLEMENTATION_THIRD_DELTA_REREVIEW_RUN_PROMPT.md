TARGET_ACTOR: Sentinel-ReReview
TARGET_SESSION: separate role session, never Advisor session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target session

이 지시문을 붙여넣을 대상: 같은 기존 `foundation-reviewer-sol` Sentinel 세션
이 지시문을 붙여넣으면 안 되는 곳: Advisor / Control / Worker / GPT 전략 세션
작업 결과 반환 대상: Advisor

========
TARGET_ACTOR: Sentinel-ReReview
TARGET_PROJECT: Agent Office Batch A
TARGET_REPO: /home/leo/Project/agent-office-batch-a-001
TARGET_APP_ROOT: /home/leo/Project/agent-office-batch-a-001
TARGET_SESSION_NAME: foundation-reviewer-sol
REQUIRED_SKILL: /fable-sentinel
READ_AND_EXECUTE: /home/leo/Project/foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001/07N_SENTINEL_IMPLEMENTATION_THIRD_DELTA_REREVIEW_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true

Open READ_AND_EXECUTE directly. Verify the actual GPT-5.6 SOL xhigh runtime and
same independent Sentinel context. Review only the exact
`fcd55a2df04aa14284fceaab12c653492edf22f2..43107b9c087a5d172d5f670e6b01bd75ab9ac1db`
delta: A4-1 high-text roster-equivalent mode, A4-2 exact anti-false-pass gates,
A4-3 complete accessible sources, and directly affected regressions. Use
`/fable-sentinel`; remain read-only in Agent Office; use no agents/sub-agents;
do not patch or approve. Write and push only the exact result/pointer, return
the pointer to Advisor, and STOP.
========
