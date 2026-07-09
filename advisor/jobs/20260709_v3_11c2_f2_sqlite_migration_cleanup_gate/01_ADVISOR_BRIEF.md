# 01 Advisor Brief - V3-11C2 F-2 SQLite Migration Cleanup Gate

Date: 2026-07-09

## Verdict

`F2_CLEANUP_WORKER_HANDOFF_READY_WITH_LIMITS`

Advisor may route a scoped cleanup implementation to the separate Cosmile Worker session.

Advisor must not implement runtime changes.

## Executive Summary

F-2 is a real blocker for fresh PostgreSQL `prisma migrate deploy`: the active migration graph still contains sqlite-era migration `20260624181637_commerce_intelligence`.

This cleanup should move that legacy migration out of:

`app/prisma/migrations/`

and into:

`app/prisma/migrations_legacy_sqlite/`

without changing migration SQL content, schema models, DB state, runtime code, feature flags, or branch topology.

## Current Repo State Checked

Advisor checked `../Cosmile`:

- branch: `shadow/m4-cosmile-memory`
- local HEAD: `004c52df14da9b2051597602575d33eb0211cdbc`
- origin HEAD: `004c52df14da9b2051597602575d33eb0211cdbc`
- ahead/behind: `0 / 0`
- staged files: none
- unrelated untracked docs remain under `app/docs/**`

Advisor checked migration files:

- active legacy sqlite migration exists:
  - `app/prisma/migrations/20260624181637_commerce_intelligence/migration.sql`
- existing legacy quarantine directory exists:
  - `app/prisma/migrations_legacy_sqlite/`
- existing quarantined migrations:
  - `20260705060544_memory_v1_additive`
  - `20260705090414_subjectrefmap_secret_version`
- Prisma datasource provider:
  - `postgresql`
- migration lock provider:
  - `postgresql`

## Recommended Cleanup Approach

`QUARANTINE_ACTIVE_SQLITE_MIGRATION_IN_REPO`

Worker should move:

`app/prisma/migrations/20260624181637_commerce_intelligence/migration.sql`

to:

`app/prisma/migrations_legacy_sqlite/20260624181637_commerce_intelligence/migration.sql`

The content must remain byte-for-byte identical to the pre-move file.

## Why This Can Proceed Without Another Leo/GPT Decision

The design already documents `migrations_legacy_sqlite/` quarantine as the preferred draft direction, and the runtime repo already contains that quarantine directory with prior sqlite migrations.

This task does not delete legacy history, does not rewrite DDL, does not run migrations, does not touch DB, and does not alter operational behavior.

If Worker finds that the move requires archive-branch handling, deletion, DDL rewrite, DB access, or schema behavior changes, Worker must STOP and return to Advisor.

## Allowed Worker Changes

Only these runtime filesystem changes are allowed:

- remove/move `app/prisma/migrations/20260624181637_commerce_intelligence/migration.sql`
- create `app/prisma/migrations_legacy_sqlite/20260624181637_commerce_intelligence/migration.sql` with identical content

No other runtime files may be changed.

## Forbidden Worker Changes

Worker must not:

- modify `schema.prisma`
- modify `migration_lock.toml`
- modify any active PostgreSQL migration except removing the F-2 legacy migration from active graph
- modify D-O1 migration files
- modify V3-11B migration files
- modify runtime source, tests, routes, services, IDs, checkout, Foundation adapters, SIASIU, or foundation-control
- stage, commit, or push runtime repo files
- run `prisma migrate deploy`
- write DB data
- access prod/live/main/secret
- turn `COSMILE_REC_OUTCOME_ENABLED` ON

## Required Worker Checks

Worker must verify:

- active migration graph no longer contains `20260624181637_commerce_intelligence`
- legacy quarantine path now contains `20260624181637_commerce_intelligence/migration.sql`
- moved file content matches the original tracked file content
- active migration graph has no sqlite-only tokens from the quarantined file
- `prisma validate` passes without DB access
- runtime staged diff remains empty
- runtime changes remain uncommitted

## Required Sentinel Review

Technical review is required after Worker result.

Recommended reviewer route:

- Target actor: Sentinel
- Selected reviewer: fable5 Sentinel
- Required skill: `/fable-sentinel`
- Review level: Level 2

Reason:

This is not feature logic, but it modifies the runtime migration graph. Sentinel must directly inspect the diff and verify no DB execution, schema rewrite, or scope expansion occurred.

## Reviewer Routing Decision

- Target actor: Sentinel
- Selected reviewer: fable5 Sentinel
- Target session: `검수자-fable5`
- Required skill: `/fable-sentinel`
- Reason: The Worker changed the runtime migration graph. The review must be independent, read-only, and must directly inspect the actual diff, active migration graph, file identity, validation, and no-DB/no-prod/no-commit constraints.
- Not selected: Control Reviewer, because this is not primarily Foundation contract or safety boundary review. Opus 4.8 Sentinel, because fable5 has already been used for the V3-11C2/D-O1 technical review loop. Codex SOL, because this is Level 2 cleanup and not a live/prod/schema-deploy execution.
- Review level: Level 2
- Return result to: Advisor
- Status: READY_TO_USE after Worker result is received

## Completion Criteria

This gate is ready for final audit only after:

- Worker result and pointer are returned to Advisor
- Sentinel read-only review returns `PASS` or accepted-risk equivalent
- Advisor compares Worker result, Sentinel result, and actual repo state
- Advisor writes final audit

## Carry-Forward Restrictions

Even after F-2 cleanup passes:

- `COSMILE_REC_OUTCOME_ENABLED` remains OFF.
- No flag ON.
- No live/prod/main/secret.
- No production DB migration.
- No operational use.
- No main merge without separate authorization.
- Real target DB deploy plus duplicate preflight `= 0` remains required before use.
- D-O1 live DB rehearsal remains required before flag-ON readiness if not completed on the target environment.
