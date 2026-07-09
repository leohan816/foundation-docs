TARGET_ACTOR: Sentinel
TARGET_SESSION: separate role session, never Advisor session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260709_v3_11c2_f2_sqlite_migration_cleanup_gate/
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target session

이 지시문을 붙여넣을 대상: Sentinel
이 지시문을 붙여넣으면 안 되는 곳: Advisor 세션 / GPT 전략 세션
작업 결과 반환 대상: Advisor

# Sentinel Handoff Prompt - V3-11C2 F-2 SQLite Migration Cleanup Gate

You are the independent Sentinel reviewer for Cosmile.

Required skill: `/fable-sentinel`

This is a read-only review. Do not patch, stage, commit, push, or approve final release.

## Read First

Read and follow:

- `../foundation-docs/advisor/jobs/20260709_v3_11c2_f2_sqlite_migration_cleanup_gate/00_INTAKE.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_f2_sqlite_migration_cleanup_gate/01_ADVISOR_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_f2_sqlite_migration_cleanup_gate/02_WORKER_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_f2_sqlite_migration_cleanup_gate/03_SENTINEL_REVIEW_BRIEF.md`
- `../foundation-docs/runs/cosmile/20260709_v3_11c2_f2_sqlite_migration_cleanup_gate/WORKER_RESULT.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_f2_sqlite_migration_cleanup_gate/11_WORKER_RESULT_POINTER.md`
- `../Cosmile/docs/agent/RUN_PROTOCOL.md`
- `../Cosmile/docs/agent/RESULT_REPORTING_PROTOCOL.md`

Do not trust the Worker report. Verify directly.

## Review Scope

Verify whether Worker performed only the approved F-2 cleanup:

- removed active path:
  - `app/prisma/migrations/20260624181637_commerce_intelligence/migration.sql`
- added quarantine path:
  - `app/prisma/migrations_legacy_sqlite/20260624181637_commerce_intelligence/migration.sql`
- preserved file content byte-for-byte
- left runtime changes uncommitted and unstaged
- did not modify schema, migration lock, active PostgreSQL migrations other than the move, source, tests, or docs
- did not run DB/prod/live/main/secret access
- did not run `prisma migrate deploy`
- did not turn `COSMILE_REC_OUTCOME_ENABLED` ON

## Required Direct Checks

In `../Cosmile`, inspect:

```bash
git status -sb
git diff --name-status
git diff --cached --name-only
git diff -- app/prisma/migrations app/prisma/migrations_legacy_sqlite
git show HEAD:app/prisma/migrations/20260624181637_commerce_intelligence/migration.sql
find app/prisma/migrations -maxdepth 2 -type f | sort
find app/prisma/migrations_legacy_sqlite -maxdepth 3 -type f | sort
rg -n "DATETIME|AUTOINCREMENT|datetime\\(|\\bREAL\\b" app/prisma/migrations
```

If safe and DB-free, verify Prisma schema validity:

```bash
cd app
DATABASE_URL="postgresql://placeholder:placeholder@localhost:5432/placeholder?schema=cosmile" npx prisma validate --schema prisma/schema.prisma
```

## Required Verdict

Return one of:

- `PASS`
- `PASS_WITH_RISK`
- `NEEDS_PATCH`
- `FAIL`
- `NEEDS_LEO_DECISION`

## Result Files

Write the long result to:

`../foundation-docs/runs/cosmile/20260709_v3_11c2_f2_sqlite_migration_cleanup_gate/SENTINEL_REVIEW_RESULT.md`

Write the Advisor pointer to:

`../foundation-docs/advisor/jobs/20260709_v3_11c2_f2_sqlite_migration_cleanup_gate/12_SENTINEL_RESULT_POINTER.md`

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
