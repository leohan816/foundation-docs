TARGET_ACTOR: Worker
TARGET_SESSION: separate role session, never Advisor session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260709_v3_11c2_f2_sqlite_migration_cleanup_gate/
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target session

이 지시문을 붙여넣을 대상: Worker
이 지시문을 붙여넣으면 안 되는 곳: Advisor 세션 / GPT 전략 세션
작업 결과 반환 대상: Advisor

# Worker Handoff Prompt - V3-11C2 F-2 SQLite Migration Cleanup Gate

You are the Cosmile Worker.

Required skill: `/fable-builder`

This is a scoped cleanup implementation for F-2. It is not a runtime commit or push task.

Do not execute from memory.

## Read First

Read and follow:

- `../foundation-docs/advisor/jobs/20260709_v3_11c2_f2_sqlite_migration_cleanup_gate/00_INTAKE.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_f2_sqlite_migration_cleanup_gate/01_ADVISOR_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_f2_sqlite_migration_cleanup_gate/02_WORKER_BRIEF.md`
- `../Cosmile/docs/agent/RUN_PROTOCOL.md`
- `../Cosmile/docs/agent/RESULT_REPORTING_PROTOCOL.md`

## Exact Task

In `../Cosmile`, move the old sqlite migration:

`app/prisma/migrations/20260624181637_commerce_intelligence/migration.sql`

to:

`app/prisma/migrations_legacy_sqlite/20260624181637_commerce_intelligence/migration.sql`

Keep the file content byte-for-byte identical.

## Hard Limits

- Do not modify `schema.prisma`.
- Do not modify `migration_lock.toml`.
- Do not modify runtime source or tests.
- Do not modify `app/docs/**`.
- Do not stage runtime files.
- Do not commit runtime files.
- Do not push runtime repo.
- Do not run `prisma migrate deploy`.
- Do not access DB/prod/live/main/secret.
- Do not turn `COSMILE_REC_OUTCOME_ENABLED` ON.

## Required Result

Return Worker result to Advisor through:

- `../foundation-docs/runs/cosmile/20260709_v3_11c2_f2_sqlite_migration_cleanup_gate/WORKER_RESULT.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_f2_sqlite_migration_cleanup_gate/11_WORKER_RESULT_POINTER.md`

Commit and push only those foundation-docs result/pointer files, if safe.

Return only `RESULT SUMMARY`, `NEXT ACTION ROUTING`, and `POINTER BLOCK` in chat.
