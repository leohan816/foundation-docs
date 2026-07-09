TARGET_ACTOR: Worker
TARGET_SESSION: separate role session, never Advisor session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260709_v3_11c2_f2_runtime_commit_routing/
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target session

이 지시문을 붙여넣을 대상: Worker
이 지시문을 붙여넣으면 안 되는 곳: Advisor 세션 / GPT 전략 세션
작업 결과 반환 대상: Advisor

# Worker Handoff Prompt - V3-11C2 F-2 Runtime Commit Routing

You are the Cosmile Worker.

Required skill: `/fable-builder`

This is a commit-only task for the reviewed F-2 sqlite migration cleanup move.

Do not implement. Do not edit files. Do not push runtime repo.

## Read First

Read and follow:

- `../foundation-docs/advisor/jobs/20260709_v3_11c2_f2_runtime_commit_routing/00_INTAKE.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_f2_runtime_commit_routing/01_ADVISOR_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_f2_runtime_commit_routing/02_WORKER_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_f2_sqlite_migration_cleanup_gate/05_FINAL_AUDIT.md`
- `../Cosmile/docs/agent/RUN_PROTOCOL.md`
- `../Cosmile/docs/agent/RESULT_REPORTING_PROTOCOL.md`

Do not execute from memory.

## Exact Task

Create one local runtime commit that stages exactly:

- `app/prisma/migrations/20260624181637_commerce_intelligence/migration.sql`
- `app/prisma/migrations_legacy_sqlite/20260624181637_commerce_intelligence/migration.sql`

Recommended commit message:

`chore(cosmile): quarantine legacy sqlite migration`

## Hard Limits

- Do not edit files.
- Do not stage any file outside the approved two paths.
- Do not stage or commit `app/docs/**`.
- Do not push runtime repo.
- Do not run `prisma migrate deploy`.
- Do not access DB/prod/live/main/secret.
- Do not turn `COSMILE_REC_OUTCOME_ENABLED` ON.
- Do not merge or push to main.

## Result Files

Write the long result to:

`../foundation-docs/runs/cosmile/20260709_v3_11c2_f2_runtime_commit_routing/WORKER_RESULT.md`

Write the Advisor pointer to:

`../foundation-docs/advisor/jobs/20260709_v3_11c2_f2_runtime_commit_routing/11_WORKER_RESULT_POINTER.md`

If safe, commit and push only those foundation-docs result/pointer files.

## Chat Output

Return only:

```text
## RESULT SUMMARY

## NEXT ACTION ROUTING

## POINTER BLOCK
```

The result must return to Advisor.
