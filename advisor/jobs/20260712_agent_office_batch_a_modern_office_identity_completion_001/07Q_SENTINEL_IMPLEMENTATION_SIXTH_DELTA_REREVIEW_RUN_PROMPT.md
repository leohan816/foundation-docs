TARGET_ACTOR: Sentinel-ReReview
TARGET_SESSION: separate role session, never Advisor session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target session

이 지시문을 붙여넣을 대상: 같은 기존 독립 `foundation-reviewer-sol` Sentinel 세션
이 지시문을 붙여넣으면 안 되는 곳: Advisor / Worker / Control / Fable5 보조 Reviewer / GPT 전략 세션
작업 결과 반환 대상: Advisor

========
TARGET_ACTOR: Sentinel-ReReview
TARGET_PROJECT: Agent Office Batch A
TARGET_REPO: /home/leo/Project/agent-office-batch-a-001
TARGET_APP_ROOT: /home/leo/Project/agent-office-batch-a-001
TARGET_SESSION_NAME: foundation-reviewer-sol
REQUIRED_SKILL: /fable-sentinel
READ_AND_EXECUTE: /home/leo/Project/foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001/07Q_SENTINEL_IMPLEMENTATION_SIXTH_DELTA_REREVIEW_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true

Open READ_AND_EXECUTE directly. Verify the actual GPT-5.6 SOL xhigh runtime,
same independent context, and exact clean/upstream/direct-origin candidate
`58a484b`. Use `/fable-sentinel`. Reapply the exact hidden-value and
missing-value-plus-hidden-duplicate attacks to both exact per-cell predicates,
verify restoration and retained A6-1/A6-3 proof, and inspect directly affected
regressions only. Remain read-only, publish only the exact result/pointer, return
to Advisor, and STOP.
========
