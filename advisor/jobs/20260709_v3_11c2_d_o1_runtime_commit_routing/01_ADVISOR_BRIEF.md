# V3-11C2 + D-O1 Runtime Commit Routing

Date: 2026-07-09

## Verdict

`RUNTIME_COMMIT_ROUTING_READY_WITH_LIMITS`

Advisor may route a runtime commit task to the separate Cosmile Worker session.

Advisor must not commit runtime code.

## Executive Summary

Leo/GPT accepted the D-O1 final audit `PASS_WITH_RISK`.

Runtime commit routing is now ready for the approved default-OFF shadow implementation, covering:

- V3-11C2 Organic RecOutcomeEvent MVI
- V3-11C2-D-O1 `FULL_ORDER_ITEM_UNIQUE` idempotency hardening

This routing authorizes a local runtime commit in `../Cosmile` only. It does not authorize runtime push, flag ON, live/prod exposure, production DB migration, operational use, main merge, or any scope expansion.

## Target Actor and Session

- Target actor: Worker
- Target project: Cosmile
- Target session: separate Cosmile Worker session
- Required skill: `/fable-builder`
- Advisor job: `../foundation-docs/advisor/jobs/20260709_v3_11c2_d_o1_runtime_commit_routing/`

## Current Runtime State

Observed target branch:

- `shadow/m4-cosmile-memory`

Observed staged runtime files:

- none

Observed approved tracked runtime modifications:

- `app/prisma/schema.prisma`
- `app/scripts/v3_11b_db_integration.dbtest.py`
- `app/src/app/api/checkout/mock-complete/route.ts`
- `app/src/lib/ids.ts`

Observed approved untracked runtime implementation files:

- `app/prisma/migrations/20260709120000_v3_11c2_d_o1_rec_outcome_orderitem_unique/migration.sql`
- `app/prisma/migrations/20260709120000_v3_11c2_d_o1_rec_outcome_orderitem_unique/down.sql`
- `app/scripts/v3_11c2_rec_outcome.vitest.ts`
- `app/src/lib/recOutcomeEventService.ts`

Observed unrelated untracked docs:

- `app/docs/COSMILE_FOUNDATION_PARITY_CROSSCHECK_20260703.md`
- `app/docs/COSMILE_FOUNDATION_USER_REF_ALIGNMENT_20260703.md`
- `app/docs/COSMILE_FOUNDATION_USER_REF_V2_ALIGNMENT_20260703.md`
- `app/docs/COSMILE_MEMORY_ARCHITECTURE_V1_REVIEW_20260704.md`
- `app/docs/COSMILE_MEMORY_INVENTORY_20260704.md`
- `app/docs/FOUNDATION_DOCS_SYNC_POLICY.md`

These docs must be excluded from the runtime commit.

## Files To Include

The Worker may stage exactly these 8 paths:

1. `app/src/lib/ids.ts`
2. `app/src/lib/recOutcomeEventService.ts`
3. `app/src/app/api/checkout/mock-complete/route.ts`
4. `app/scripts/v3_11c2_rec_outcome.vitest.ts`
5. `app/prisma/schema.prisma`
6. `app/prisma/migrations/20260709120000_v3_11c2_d_o1_rec_outcome_orderitem_unique/migration.sql`
7. `app/prisma/migrations/20260709120000_v3_11c2_d_o1_rec_outcome_orderitem_unique/down.sql`
8. `app/scripts/v3_11b_db_integration.dbtest.py`

## Files To Exclude

The Worker must exclude:

- all `app/docs/**`
- `../foundation-docs/**` except result/pointer files after commit
- `../SIASIU/**`
- `../foundation-control/**`
- `../skill/**`
- any `.env`, secret, DB, prod/live/main, cache, generated, or unrelated file
- any file not listed in "Files To Include"

## Allowed Worker Actions

Worker may:

1. Read the approved Advisor artifacts.
2. Verify the current branch is `shadow/m4-cosmile-memory`.
3. Verify runtime staged diff is empty before staging.
4. Stage exactly the 8 approved files.
5. Verify `git diff --cached --name-only` matches the approved list exactly.
6. Commit the staged runtime files in `../Cosmile`.
7. Write and commit/push foundation-docs Worker result/pointer files.

Recommended runtime commit message:

`feat(cosmile): add RecOutcomeEvent shadow outcome idempotency`

Runtime push is not authorized by this routing.

## Forbidden Worker Actions

Worker must not:

- modify code before committing
- stage or commit unrelated files
- stage or commit `app/docs/**`
- push the runtime repo
- turn `COSMILE_REC_OUTCOME_ENABLED` ON
- access prod/live/main/secret
- run production DB migration
- perform DB writes outside already reviewed non-prod/ephemeral rehearsal
- merge to main
- claim operational readiness
- expand into group-buy/refund/reorder/direct/session/semantic/V3-11D
- change SIASIU/foundation-control/Foundation contracts

## Pre-Commit STOP Conditions

STOP and return to Advisor if:

- branch is not `shadow/m4-cosmile-memory`
- any runtime file is already staged before Worker starts
- any included file is missing
- any extra file appears in staged diff
- `app/docs/**` appears in staged diff
- commit would require rework or code edits
- tests are requested to be weakened
- runtime push is requested
- flag ON/live/prod/main/secret access is requested

## Expected Worker Result

Worker should write:

- result: `../foundation-docs/runs/cosmile/20260709_v3_11c2_d_o1_runtime_commit_routing/WORKER_RESULT.md`
- pointer: `../foundation-docs/advisor/jobs/20260709_v3_11c2_d_o1_runtime_commit_routing/11_WORKER_RESULT_POINTER.md`

Worker result must include:

- runtime commit hash
- exact staged/committed files
- confirmation that runtime push was not performed
- confirmation that excluded docs were not committed
- confirmation that `COSMILE_REC_OUTCOME_ENABLED` remains OFF
- confirmation that no live/prod/main/secret access occurred
- carry-forward restrictions after commit

## Post-Commit Restrictions To Record

After commit, the closure record/result must still state:

- `COSMILE_REC_OUTCOME_ENABLED` remains OFF
- no flag ON
- no live/prod/main/secret
- no production DB migration
- no operational use
- no claim that group-buy/refund/reorder/direct/session/semantic/V3-11D is covered
- real target DB deploy + duplicate preflight = 0 remains required before any use
- F-2 sqlite migration directory cleanup remains required before fresh deploy/flag-ON

## Completion Criteria

Commit routing is ready when:

- `02_WORKER_BRIEF.md` exists
- `06_WORKER_HANDOFF_PROMPT.md` exists
- `06_WORKER_RUN_PROMPT.md` exists
- `10_LOOP_STATE.md` records `READY_FOR_WORKER_RUNTIME_COMMIT`
- files to include/exclude are explicit
- Advisor has not touched runtime repo staging/commit
