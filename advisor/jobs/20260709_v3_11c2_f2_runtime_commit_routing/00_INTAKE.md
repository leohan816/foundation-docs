# 00 Intake - V3-11C2 F-2 Runtime Commit Routing

Date: 2026-07-09

## Leo/GPT Instruction Context

Leo/GPT clarified that Advisor should continue handling same-mission Worker/Sentinel/rework/commit/push routing when the next step is clear, and should stop only for new scope, high-risk decision, final closure, or unresolved issue.

The F-2 sqlite migration cleanup implementation and Sentinel review are complete.

## Goal

Prepare a commit-only Worker routing to capture the reviewed F-2 cleanup move in one local Cosmile runtime commit.

## Commit Scope

Commit exactly the reviewed migration move:

- delete:
  - `app/prisma/migrations/20260624181637_commerce_intelligence/migration.sql`
- add:
  - `app/prisma/migrations_legacy_sqlite/20260624181637_commerce_intelligence/migration.sql`

## Non-Goals

- No runtime code edits.
- No new implementation.
- No migration SQL rewrite.
- No DB write.
- No `prisma migrate deploy`.
- No runtime push.
- No main merge.
- No flag ON.
- No prod/live/main/secret access.

## Source Inputs

- F-2 final audit: `../foundation-docs/advisor/jobs/20260709_v3_11c2_f2_sqlite_migration_cleanup_gate/05_FINAL_AUDIT.md`
- Worker result: `../foundation-docs/runs/cosmile/20260709_v3_11c2_f2_sqlite_migration_cleanup_gate/WORKER_RESULT.md`
- Sentinel result: `../foundation-docs/runs/cosmile/20260709_v3_11c2_f2_sqlite_migration_cleanup_gate/SENTINEL_REVIEW_RESULT.md`

## Allowed Advisor Write Scope

- `../foundation-docs/advisor/jobs/20260709_v3_11c2_f2_runtime_commit_routing/**`

## Forbidden Advisor Actions

- Do not stage/commit/push runtime repo files.
- Do not modify runtime repo files.
- Do not execute Worker role.
- Do not access DB/prod/live/main/secret.

## Initial Assumptions

- The reviewed F-2 move remains unstaged and uncommitted in `../Cosmile`.
- Runtime branch remains `shadow/m4-cosmile-memory`.
- Runtime HEAD remains `004c52df14da9b2051597602575d33eb0211cdbc`.
- Local branch remains equal to `origin/shadow/m4-cosmile-memory`.
