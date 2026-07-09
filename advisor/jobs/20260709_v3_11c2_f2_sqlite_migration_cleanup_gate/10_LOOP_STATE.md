# 10 Loop State - V3-11C2 F-2 SQLite Migration Cleanup Gate

Date: 2026-07-09

## Current Status

`READY_FOR_WORKER_F2_CLEANUP`

## Current Required Actor

Worker.

Leo should paste the short run prompt into [cosmile Worker session]:

`../foundation-docs/advisor/jobs/20260709_v3_11c2_f2_sqlite_migration_cleanup_gate/06_WORKER_RUN_PROMPT.md`

Do not send this to GPT strategy session, Sentinel, or Service Reviewer.

## Approved Cleanup Scope

Move:

`app/prisma/migrations/20260624181637_commerce_intelligence/migration.sql`

to:

`app/prisma/migrations_legacy_sqlite/20260624181637_commerce_intelligence/migration.sql`

Content must remain byte-for-byte identical.

## Forbidden

- no schema model changes
- no migration SQL rewrite
- no runtime source/test changes
- no runtime staging
- no runtime commit
- no runtime push
- no `prisma migrate deploy`
- no DB/prod/live/main/secret
- no flag ON

## Expected Worker Result

- result: `../foundation-docs/runs/cosmile/20260709_v3_11c2_f2_sqlite_migration_cleanup_gate/WORKER_RESULT.md`
- pointer: `../foundation-docs/advisor/jobs/20260709_v3_11c2_f2_sqlite_migration_cleanup_gate/11_WORKER_RESULT_POINTER.md`

## Next Required Action

Leo should paste `06_WORKER_RUN_PROMPT.md` into [cosmile Worker session].
