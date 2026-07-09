# V3-11C2 F-2 SQLite Migration Cleanup Gate

Date: 2026-07-09

## Job Overview

This Advisor job prepares the Worker handoff for cleaning the F-2 blocker: a sqlite-era migration remains active under the PostgreSQL Prisma migration graph.

The cleanup moves the legacy sqlite migration to `migrations_legacy_sqlite/` without changing schema, migration SQL content, DB state, runtime behavior, or feature flags.

## Verdict

`F2_CLEANUP_WORKER_HANDOFF_READY_WITH_LIMITS`

## Generated Artifacts

- `00_INTAKE.md`
- `01_ADVISOR_BRIEF.md`
- `02_WORKER_BRIEF.md`
- `03_SENTINEL_REVIEW_BRIEF.md`
- `05_FINAL_AUDIT.md`
- `06_WORKER_HANDOFF_PROMPT.md`
- `06_WORKER_RUN_PROMPT.md`
- `07_SENTINEL_HANDOFF_PROMPT.md`
- `07_SENTINEL_RUN_PROMPT.md`
- `10_LOOP_STATE.md`
- `11_WORKER_RESULT_POINTER.md`
- `12_SENTINEL_RESULT_POINTER.md`
- `index.md`

## Next Recommended Action

Prepare runtime commit routing for the reviewed F-2 move only.

Do not route additional implementation, flag-ON, production migration, main merge, or operational use from this gate.
