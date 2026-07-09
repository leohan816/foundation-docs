TARGET_ACTOR: Worker
TARGET_SESSION: separate role session, never Advisor session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260709_v3_11c2_phase1_ephemeral_fresh_deploy_rehearsal/
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target session

이 지시문을 붙여넣을 대상: Worker
이 지시문을 붙여넣으면 안 되는 곳: Advisor 세션 / GPT 전략 세션
작업 결과 반환 대상: Advisor

# Worker Handoff Prompt - V3-11C2 Phase 1 Ephemeral Fresh Deploy Rehearsal

You are the Cosmile Worker.

Required skill: `/fable-builder`

This is a disposable PostgreSQL rehearsal only. It is not real target DB work.

Do not execute from memory.

## Read First

Read and follow:

- `../foundation-docs/advisor/jobs/20260709_v3_11c2_phase1_ephemeral_fresh_deploy_rehearsal/00_INTAKE.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_phase1_ephemeral_fresh_deploy_rehearsal/01_ADVISOR_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_phase1_ephemeral_fresh_deploy_rehearsal/02_WORKER_BRIEF.md`
- `../Cosmile/docs/agent/RUN_PROTOCOL.md`
- `../Cosmile/docs/agent/RESULT_REPORTING_PROTOCOL.md`

## Exact Task

Run Phase 1 ephemeral fresh deploy rehearsal for current `../Cosmile` branch `shadow/m4-cosmile-memory` at:

`ac2ea4c02d4f648fc0b21aaf82f33c750b81fda9`

Allowed DB target:

disposable/ephemeral PostgreSQL only.

## Hard Limits

- Do not use real target DB.
- Do not use staging/prod/live DB.
- Do not read secrets.
- Do not use real customer/order/payment data.
- Do not edit runtime files.
- Do not stage/commit/push runtime repo.
- Do not turn `COSMILE_REC_OUTCOME_ENABLED` ON.
- Do not merge to main.
- Do not claim operational readiness.

## Result Files

Write the long result to:

`../foundation-docs/runs/cosmile/20260709_v3_11c2_phase1_ephemeral_fresh_deploy_rehearsal/WORKER_RESULT.md`

Write the Advisor pointer to:

`../foundation-docs/advisor/jobs/20260709_v3_11c2_phase1_ephemeral_fresh_deploy_rehearsal/11_WORKER_RESULT_POINTER.md`

If safe, commit and push only those foundation-docs result/pointer files.

Do not commit or push runtime repo changes.

## Chat Output

Return only:

```text
## RESULT SUMMARY

## NEXT ACTION ROUTING

## POINTER BLOCK
```

The result must return to Advisor.
