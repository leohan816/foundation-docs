TARGET_ACTOR: Worker-Rework
TARGET_SESSION: separate role session, never Advisor session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target session

이 지시문을 붙여넣을 대상: 같은 기존 `agent-office-opus` Worker 세션
이 지시문을 붙여넣으면 안 되는 곳: Advisor / Control / Reviewer / GPT 전략 세션
작업 결과 반환 대상: Advisor

========
TARGET_ACTOR: Agent Office Worker-Rework
TARGET_PROJECT: Agent Office Batch A
TARGET_REPO: /home/leo/Project/agent-office-batch-a-001
TARGET_APP_ROOT: /home/leo/Project/agent-office-batch-a-001
TARGET_SESSION_NAME: agent-office-opus
REQUIRED_SKILL: /fable-builder
READ_AND_EXECUTE: /home/leo/Project/foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001/09N_WORKER_IMPLEMENTATION_FOURTH_REWORK_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true

Open READ_AND_EXECUTE directly. Verify clean/upstream-equal `fcd55a2`, actual
Opus 4.8 Ultracode, `/fable-builder`, and no concurrent writer. Correct only
A4-1 200-percent Office-first equivalence, A4-2 exact label/actor cardinality
plus negative hidden-label proof, and A4-3 complete accessible source names.
Preserve the accepted 100-percent pixels and all I2/security/authority
boundaries. Use focused iteration and one final complete candidate gate. Commit
and non-force push, write the exact result/pointer, return to Advisor, and STOP.
Do not use agents/sub-agents or the excluded `agent-office` session.
========

