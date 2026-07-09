# 02 Worker Brief - V3-11C2 F-2 SQLite Migration Cleanup Gate

Date: 2026-07-09

## Required Skill

`/fable-builder`

## Exact Task

In `../Cosmile`, move the legacy sqlite migration `20260624181637_commerce_intelligence` out of the active PostgreSQL migration graph and into the existing legacy quarantine directory.

This is a cleanup implementation. Do not commit or push runtime repo files.

## Target Repo

- repo: `../Cosmile`
- app root: `../Cosmile/app`
- branch: `shadow/m4-cosmile-memory`
- expected starting HEAD: `004c52df14da9b2051597602575d33eb0211cdbc`

## Allowed Runtime File Changes

Only these changes are allowed:

1. remove/move:
   - `app/prisma/migrations/20260624181637_commerce_intelligence/migration.sql`
2. create the same file content at:
   - `app/prisma/migrations_legacy_sqlite/20260624181637_commerce_intelligence/migration.sql`

The moved file content must remain byte-for-byte identical to the original tracked file content.

## Forbidden Runtime Changes

Do not:

- modify `app/prisma/schema.prisma`
- modify `app/prisma/migrations/migration_lock.toml`
- modify `app/prisma/migrations/00000000000000_init_postgres/**`
- modify `app/prisma/migrations/20260706120000_v3_11b_learning_commerce_memory/**`
- modify `app/prisma/migrations/20260709120000_v3_11c2_d_o1_rec_outcome_orderitem_unique/**`
- modify runtime source files
- modify tests
- modify `app/docs/**`
- stage runtime files
- commit runtime files
- push runtime repo
- run `prisma migrate deploy`
- access DB/prod/live/main/secret
- turn `COSMILE_REC_OUTCOME_ENABLED` ON
- merge or push to main

## Required Pre-Checks

Before editing, verify:

```bash
git branch --show-current
git rev-parse HEAD
git status -sb
git diff --cached --name-only
test -f app/prisma/migrations/20260624181637_commerce_intelligence/migration.sql
test -d app/prisma/migrations_legacy_sqlite
```

Expected:

- branch: `shadow/m4-cosmile-memory`
- HEAD: `004c52df14da9b2051597602575d33eb0211cdbc`
- staged diff: empty

## Implementation Instructions

Use a plain filesystem move, not a runtime commit:

```bash
mkdir -p app/prisma/migrations_legacy_sqlite/20260624181637_commerce_intelligence
mv app/prisma/migrations/20260624181637_commerce_intelligence/migration.sql app/prisma/migrations_legacy_sqlite/20260624181637_commerce_intelligence/migration.sql
rmdir app/prisma/migrations/20260624181637_commerce_intelligence
```

Do not use `git mv` unless you fully unstage before returning, because this Worker step must leave runtime files uncommitted and unstaged for Sentinel review.

## Required Verification

After the move, verify:

```bash
test ! -e app/prisma/migrations/20260624181637_commerce_intelligence
test -f app/prisma/migrations_legacy_sqlite/20260624181637_commerce_intelligence/migration.sql
git show HEAD:app/prisma/migrations/20260624181637_commerce_intelligence/migration.sql > /tmp/f2_original_migration.sql
cmp /tmp/f2_original_migration.sql app/prisma/migrations_legacy_sqlite/20260624181637_commerce_intelligence/migration.sql
git diff --cached --name-only
git status --short
```

Run these checks from `../Cosmile/app`:

```bash
DATABASE_URL="postgresql://placeholder:placeholder@localhost:5432/placeholder?schema=cosmile" npx prisma validate --schema prisma/schema.prisma
rg -n "DATETIME|AUTOINCREMENT|datetime\\(|\\bREAL\\b" prisma/migrations
```

Expected:

- `cmp` passes
- staged diff remains empty
- `prisma validate` passes
- sqlite-only token scan over active `prisma/migrations` returns no hits from the removed F-2 migration

If the `rg` command returns any active PostgreSQL migration hit, inspect it. STOP unless it is clearly unrelated and safe to report as a non-blocking false positive.

## STOP Conditions

STOP and return to Advisor if:

- branch is not `shadow/m4-cosmile-memory`
- HEAD is not `004c52df14da9b2051597602575d33eb0211cdbc`
- any runtime file is staged before starting
- any file outside the two allowed migration paths would need changes
- `schema.prisma` or `migration_lock.toml` would need changes
- migration SQL content would need rewriting
- DB access is required
- `prisma migrate deploy` is requested
- runtime commit/push is requested
- flag ON, main merge, prod/live/secret access, or operational use is requested

## Result Storage

Write the long result to:

`../foundation-docs/runs/cosmile/20260709_v3_11c2_f2_sqlite_migration_cleanup_gate/WORKER_RESULT.md`

Write the Advisor pointer to:

`../foundation-docs/advisor/jobs/20260709_v3_11c2_f2_sqlite_migration_cleanup_gate/11_WORKER_RESULT_POINTER.md`

Commit and push only those foundation-docs result/pointer files, if safe.

Do not commit or push runtime repo changes.

## Chat Output Format

Return only:

```text
## RESULT SUMMARY

## NEXT ACTION ROUTING

## POINTER BLOCK
```

The result must return to Advisor.

## Completion Criteria

Worker completion means:

- F-2 legacy sqlite migration is moved to `migrations_legacy_sqlite`
- active PostgreSQL `migrations/` no longer contains that directory
- file content is unchanged
- validation/scans are reported
- runtime changes remain uncommitted and unstaged
- result/pointer are archived in foundation-docs

Final gate closure requires Sentinel review and Advisor final audit after Worker result.
