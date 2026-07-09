# 01 Advisor Brief - V3-11C2 F-2 Runtime Commit Routing

Date: 2026-07-09

## Verdict

`F2_RUNTIME_COMMIT_ROUTING_READY_WITH_LIMITS`

Advisor may route a commit-only task to the separate Cosmile Worker session.

Advisor must not commit runtime code.

## Executive Summary

The F-2 sqlite migration cleanup passed Worker implementation, Sentinel review, and Advisor final audit.

This routing authorizes a local runtime commit in `../Cosmile` for the reviewed move only:

- remove legacy sqlite migration from active `app/prisma/migrations/`
- preserve the same file under `app/prisma/migrations_legacy_sqlite/`

This routing does not authorize runtime push, flag ON, live/prod exposure, production DB migration, operational use, main merge, or scope expansion.

## Current Runtime State Expected

Expected repo:

- runtime repo: `../Cosmile`
- branch: `shadow/m4-cosmile-memory`
- HEAD: `004c52df14da9b2051597602575d33eb0211cdbc`
- upstream: `origin/shadow/m4-cosmile-memory`
- ahead/behind: `0 / 0`
- staged files: none

Expected reviewed runtime diff:

```text
D  app/prisma/migrations/20260624181637_commerce_intelligence/migration.sql
?? app/prisma/migrations_legacy_sqlite/20260624181637_commerce_intelligence/
```

Unrelated pre-existing untracked docs under `app/docs/**` must remain excluded.

## Files To Include

Worker may stage exactly these paths:

1. `app/prisma/migrations/20260624181637_commerce_intelligence/migration.sql`
2. `app/prisma/migrations_legacy_sqlite/20260624181637_commerce_intelligence/migration.sql`

## Files To Exclude

Worker must exclude:

- all `app/docs/**`
- all runtime source files
- all test files
- `app/prisma/schema.prisma`
- `app/prisma/migrations/migration_lock.toml`
- all other migration directories/files
- `../foundation-docs/**` except result/pointer files after commit
- `../SIASIU/**`
- `../foundation-control/**`
- any `.env`, secret, DB, prod/live/main, cache, generated, or unrelated file

## Allowed Worker Actions

Worker may:

1. Read Advisor artifacts and prior Worker/Sentinel results.
2. Verify current branch, HEAD, upstream, staged diff, and reviewed diff.
3. Stage exactly the two approved migration move paths.
4. Verify `git diff --cached --name-status` contains only:
   - `D app/prisma/migrations/20260624181637_commerce_intelligence/migration.sql`
   - `A app/prisma/migrations_legacy_sqlite/20260624181637_commerce_intelligence/migration.sql`
5. Verify moved file content is byte-for-byte identical to HEAD source.
6. Commit the staged runtime move locally.
7. Write and commit/push foundation-docs Worker result/pointer files.

Recommended runtime commit message:

`chore(cosmile): quarantine legacy sqlite migration`

Runtime push is not authorized by this routing.

## Forbidden Worker Actions

Worker must not:

- modify files before committing
- stage or commit unrelated files
- stage or commit `app/docs/**`
- stage or commit schema/source/test changes
- create more than one runtime commit
- amend `004c52d`
- push the runtime repo
- turn `COSMILE_REC_OUTCOME_ENABLED` ON
- run `prisma migrate deploy`
- access DB/prod/live/main/secret
- run production DB migration
- merge to main
- claim operational readiness

## STOP Conditions

STOP and return to Advisor if:

- branch is not `shadow/m4-cosmile-memory`
- HEAD is not `004c52df14da9b2051597602575d33eb0211cdbc`
- upstream is not `origin/shadow/m4-cosmile-memory`
- branch is not equal to origin before commit
- any runtime file is already staged before Worker starts
- the reviewed F-2 move is missing
- any extra file appears in staged diff
- `app/docs/**` appears in staged diff
- commit would require edits
- runtime push is requested
- flag ON/live/prod/main/secret access is requested

## Expected Worker Result

Worker should write:

- result: `../foundation-docs/runs/cosmile/20260709_v3_11c2_f2_runtime_commit_routing/WORKER_RESULT.md`
- pointer: `../foundation-docs/advisor/jobs/20260709_v3_11c2_f2_runtime_commit_routing/11_WORKER_RESULT_POINTER.md`

Worker result must include:

- runtime commit hash
- exact staged/committed files
- confirmation that runtime push was not performed
- confirmation that excluded docs were not committed
- confirmation that no DB/prod/live/main/secret access occurred
- carry-forward restrictions after commit

## Post-Commit Restrictions To Record

After commit, the result must still state:

- `COSMILE_REC_OUTCOME_ENABLED` remains OFF
- no flag ON
- no live/prod/main/secret
- no production DB migration
- no operational use
- no main merge
- real target DB deploy plus duplicate preflight `= 0` remains required before any use
- D-O1 live DB rehearsal remains required before flag-ON readiness if not completed on the target environment

## Completion Criteria

Commit routing is ready when:

- `02_WORKER_BRIEF.md` exists
- `06_WORKER_HANDOFF_PROMPT.md` exists
- `06_WORKER_RUN_PROMPT.md` exists
- `10_LOOP_STATE.md` records `READY_FOR_WORKER_F2_RUNTIME_COMMIT`
- files to include/exclude are explicit
- Advisor has not touched runtime repo staging/commit
