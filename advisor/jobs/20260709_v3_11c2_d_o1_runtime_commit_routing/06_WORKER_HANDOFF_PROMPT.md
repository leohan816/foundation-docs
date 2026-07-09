TARGET_ACTOR: Worker
TARGET_SESSION: separate role session, never Advisor session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260709_v3_11c2_d_o1_runtime_commit_routing/
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target session

이 지시문을 붙여넣을 대상: Worker
이 지시문을 붙여넣으면 안 되는 곳: Advisor 세션 / GPT 전략 세션
작업 결과 반환 대상: Advisor

# Worker Handoff Prompt - V3-11C2 + D-O1 Runtime Commit Routing

You are the Cosmile Worker for the runtime commit routing task.

Required skill:

`/fable-builder`

Read and obey:

- `../Cosmile/CLAUDE.md`
- `../Cosmile/docs/agent/RUN_PROTOCOL.md`
- `../Cosmile/docs/agent/RESULT_REPORTING_PROTOCOL.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_d_o1_runtime_commit_routing/02_WORKER_BRIEF.md`

Task:

Create one local runtime commit in `../Cosmile` for the approved default-OFF V3-11C2 + D-O1 shadow implementation.

Do not edit files. Do not push runtime repo. Stage exactly the approved 8 files. Exclude unrelated docs.

Commit message:

`feat(cosmile): add RecOutcomeEvent shadow outcome idempotency`

Return result to Advisor using the standard result/pointer protocol.
