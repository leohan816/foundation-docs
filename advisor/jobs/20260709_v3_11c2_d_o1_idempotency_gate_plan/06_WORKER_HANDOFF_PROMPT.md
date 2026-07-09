TARGET_ACTOR: Worker
TARGET_SESSION: separate role session, never Advisor session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260709_v3_11c2_d_o1_idempotency_gate_plan/
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target session

이 지시문을 붙여넣을 대상: Worker
이 지시문을 붙여넣으면 안 되는 곳: Advisor 세션 / GPT 전략 세션
작업 결과 반환 대상: Advisor

# Worker Handoff Prompt - V3-11C2-D-O1 Idempotency Hardening

You are the Cosmile Worker for the D-O1 implementation batch.

Required skill:

`/fable-builder`

Read and obey:

- `../Cosmile/CLAUDE.md`
- `../Cosmile/docs/agent/RUN_PROTOCOL.md`
- `../Cosmile/docs/agent/RESULT_REPORTING_PROTOCOL.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_d_o1_idempotency_gate_plan/02_WORKER_BRIEF.md`

Do not execute from memory. Do not broaden scope.

## Task

Implement V3-11C2-D-O1 hard idempotency:

- DB-level uniqueness for `RecOutcomeEvent.orderItemId`
- Prisma schema representation as `@@unique([orderItemId])`
- keep code-level existing-check as fast-path duplicate skip
- map DB unique conflict to duplicate/idempotent skip and fail-open behavior
- non-prod migration rehearsal and duplicate rejection tests
- keep `COSMILE_REC_OUTCOME_ENABLED` OFF

## Forbidden

Do not:

- turn the flag ON
- access prod/live/main/secret
- run production DB migration
- commit/push runtime repo changes
- change SIASIU or foundation-control
- expand into group-buy/refund/reorder/direct/session/semantic/V3-11D
- stage unrelated files

## Result Storage

Write long Worker result to:

`../foundation-docs/runs/cosmile/20260709_v3_11c2_d_o1_idempotency_gate_plan/WORKER_RESULT.md`

Write Advisor pointer to:

`../foundation-docs/advisor/jobs/20260709_v3_11c2_d_o1_idempotency_gate_plan/11_WORKER_RESULT_POINTER.md`

Commit/push only the foundation-docs result/pointer files. Do not commit runtime repo changes unless Leo/GPT separately approves.

## Chat Output

Return only:

1. `RESULT SUMMARY`
2. `NEXT ACTION ROUTING`
3. `POINTER BLOCK`

Return the pointer block to Advisor.
