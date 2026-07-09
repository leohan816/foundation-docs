# 00 Intake - V3-11C2 F-2 SQLite Migration Cleanup Gate

Date: 2026-07-09

## Leo/GPT Instruction Summary

After V3-11C2 + D-O1 implementation, review, runtime commit, and runtime push, Advisor identified the next prerequisite blocker before target DB deployment, flag-ON, or operational use:

`F-2`: an old sqlite-style migration directory remains active under `app/prisma/migrations/`.

Leo clarified that Advisor should continue within the current orchestration when the next step is clear, and should stop only for genuinely important Leo/GPT decisions.

## Goal

Prepare a Worker handoff to clean the F-2 migration graph blocker by moving the legacy sqlite migration out of the active PostgreSQL migration graph and into the existing legacy quarantine directory.

## Non-Goals

- No runtime implementation beyond the migration graph cleanup.
- No schema model change.
- No migration SQL content rewrite.
- No DB write.
- No `prisma migrate deploy`.
- No production/live/main/secret access.
- No flag ON.
- No main merge.
- No operational readiness claim.
- No runtime commit or push in the Worker implementation step.

## Current Finding

Advisor confirmed that this file exists in the active PostgreSQL migration directory:

`../Cosmile/app/prisma/migrations/20260624181637_commerce_intelligence/migration.sql`

It contains sqlite-style DDL such as:

- `DATETIME`
- `REAL`
- inline sqlite-style primary key definitions
- `CURRENT_TIMESTAMP` defaults in old sqlite form

Advisor also confirmed that `../Cosmile/app/prisma/migrations_legacy_sqlite/` already exists and contains other quarantined sqlite-era migrations.

## Source Basis

- `../foundation-docs/advisor/jobs/20260709_v3_11c2_d_o1_idempotency_gate_plan/05_FINAL_AUDIT.md`
- `../foundation-docs/runs/cosmile/20260709_v3_11c2_d_o1_idempotency_gate_plan/SENTINEL_REVIEW_RESULT.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_d_o1_runtime_push_routing/05_FINAL_AUDIT.md`
- `../foundation-docs/docs/reports/control/COSMILE_MEMORY_V3_08_DB_INTEGRATION_INVARIANT_DESIGN_20260706.md`

## Allowed Write Scope For This Advisor Job

- `../foundation-docs/advisor/jobs/20260709_v3_11c2_f2_sqlite_migration_cleanup_gate/**`

## Forbidden Advisor Actions

- Do not modify `../Cosmile`.
- Do not stage/commit/push runtime repo files.
- Do not write schema/migration/runtime source.
- Do not access DB/prod/live/main/secret.
- Do not execute Worker/Sentinel roles.

## Initial Assumptions

- The accepted cleanup direction is quarantine-in-repo because `migrations_legacy_sqlite/` already exists and is the documented design pattern.
- The Worker implementation should leave runtime changes uncommitted for Sentinel review.
- A later runtime commit/push routing must be separate after Worker result, Sentinel review, and Advisor final audit.
