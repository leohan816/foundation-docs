# 03 Sentinel Review Brief - V3-11C2 F-2 SQLite Migration Cleanup Gate

Date: 2026-07-09

## Required Skill

`/fable-sentinel`

## Reviewer Route

- Target actor: Sentinel
- Recommended reviewer: fable5 Sentinel
- Target project: Cosmile
- Target repo: `../Cosmile`
- Review level: Level 2

This review must run in a separate Sentinel session after Worker result returns to Advisor.

## Sentinel Role

Sentinel is read-only.

Do not trust the Worker report. Directly inspect the runtime diff, Advisor brief, Worker brief, Worker result, pointer, and actual repo state.

Do not patch.
Do not stage.
Do not commit.
Do not push.
Do not approve final release.

Return result to Advisor.

## Review Scope

Verify whether Worker performed only the approved F-2 cleanup:

- active path removed:
  - `app/prisma/migrations/20260624181637_commerce_intelligence/migration.sql`
- quarantine path added:
  - `app/prisma/migrations_legacy_sqlite/20260624181637_commerce_intelligence/migration.sql`
- file content unchanged
- no other runtime files changed
- runtime changes uncommitted and unstaged
- no DB/prod/live/main/secret access
- no `prisma migrate deploy`
- no flag ON

## Required Direct Checks

Sentinel should directly inspect:

```bash
git status -sb
git diff --name-status
git diff --cached --name-only
git diff -- app/prisma/migrations app/prisma/migrations_legacy_sqlite
git show HEAD:app/prisma/migrations/20260624181637_commerce_intelligence/migration.sql
```

Sentinel should verify active migration graph:

```bash
find app/prisma/migrations -maxdepth 2 -type f | sort
find app/prisma/migrations_legacy_sqlite -maxdepth 3 -type f | sort
rg -n "DATETIME|AUTOINCREMENT|datetime\\(|\\bREAL\\b" app/prisma/migrations
```

Sentinel should verify Prisma validation if safe and DB-free:

```bash
cd app
DATABASE_URL="postgresql://placeholder:placeholder@localhost:5432/placeholder?schema=cosmile" npx prisma validate --schema prisma/schema.prisma
```

## Pass Criteria

Sentinel may return `PASS` only if:

- Worker changed only the approved migration move
- moved content is identical to original tracked file
- active PostgreSQL migration graph no longer includes `20260624181637_commerce_intelligence`
- existing `migrations_legacy_sqlite` now includes the moved directory
- staged diff is empty
- runtime commit/push was not performed
- no DB/prod/live/main/secret access occurred
- no flag ON, main merge, production migration, or operational use occurred

## Verdict Options

- `PASS`
- `PASS_WITH_RISK`
- `NEEDS_PATCH`
- `FAIL`
- `NEEDS_LEO_DECISION`

## Required Result Files

Write long result to:

`../foundation-docs/runs/cosmile/20260709_v3_11c2_f2_sqlite_migration_cleanup_gate/SENTINEL_REVIEW_RESULT.md`

Write pointer to:

`../foundation-docs/advisor/jobs/20260709_v3_11c2_f2_sqlite_migration_cleanup_gate/12_SENTINEL_RESULT_POINTER.md`

Commit and push only foundation-docs result/pointer files, if safe.

Return chat output only as:

```text
## RESULT SUMMARY

## NEXT ACTION ROUTING

## POINTER BLOCK
```
