# 02 Worker Brief - V3-11C2-D-O1 Unique Index / Idempotency Hardening

Date: 2026-07-09

## Required Skill

`/fable-builder`

## Validation Decision

`PROCEED_WITH_LIMITS`

Leo/GPT approved the D-O1 strategy:

`FULL_ORDER_ITEM_UNIQUE`

This brief authorizes a scoped Cosmile implementation batch only. It does not authorize flag-ON, live/prod/main/secret access, production DB migration, runtime commit, or operational use.

## Exact Task

Implement DB-backed hard idempotency for `RecOutcomeEvent.orderItemId`.

Required behavior:

1. `RecOutcomeEvent.orderItemId` must be unique at the DB/schema level.
2. Prisma schema must represent the rule as `@@unique([orderItemId])`.
3. The current code-level existing-check must remain as a fast-path duplicate skip.
4. A DB unique conflict on `orderItemId` must be treated as duplicate/idempotent skip and fail-open, not as checkout failure.
5. `COSMILE_REC_OUTCOME_ENABLED` must remain default OFF.
6. Duplicate preflight must be documented and run only against non-prod/ephemeral targets in this batch.
7. Non-prod migration rehearsal and duplicate rejection tests are required.

## Target Repo and Branch

- Target repo: `../Cosmile`
- Target app root: `../Cosmile/app`
- Expected branch: `shadow/m4-cosmile-memory`
- Runtime commit: not authorized by this brief.

STOP if the current branch is `main`, prod, live, or any branch not approved for this shadow implementation.

## Source Advisor Artifacts

- D-O1 decision package: `../foundation-docs/advisor/jobs/20260709_v3_11c2_d_o1_idempotency_gate_plan/01_ADVISOR_BRIEF.md`
- Risk/gate register: `../foundation-docs/advisor/jobs/20260709_v3_11_risk_gate_register_audit/01_ADVISOR_BRIEF.md`
- V3-11C2 final audit: `../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/05_FINAL_AUDIT.md`
- V3-11C2 closure record: `../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/14_CLOSURE_RECORD.md`

## Required Reads Before Editing

Read directly, not from memory:

- `../Cosmile/CLAUDE.md`
- `../Cosmile/docs/agent/RUN_PROTOCOL.md`
- `../Cosmile/docs/agent/RESULT_REPORTING_PROTOCOL.md`
- `../Cosmile/app/prisma/schema.prisma`
- `../Cosmile/app/prisma/migrations/20260706120000_v3_11b_learning_commerce_memory/migration.sql`
- `../Cosmile/app/prisma/migrations/20260706120000_v3_11b_learning_commerce_memory/down.sql`
- `../Cosmile/app/src/lib/recOutcomeEventService.ts`
- `../Cosmile/app/scripts/v3_11b_db_integration.dbtest.py`
- `../Cosmile/app/scripts/v3_11c2_rec_outcome.vitest.ts`

## Files Likely Involved

Allowed implementation files:

- `../Cosmile/app/prisma/schema.prisma`
- a new migration folder under `../Cosmile/app/prisma/migrations/`
- `../Cosmile/app/src/lib/recOutcomeEventService.ts`
- `../Cosmile/app/scripts/v3_11b_db_integration.dbtest.py`
- `../Cosmile/app/scripts/v3_11c2_rec_outcome.vitest.ts`
- a new D-O1 DB test script under `../Cosmile/app/scripts/` if cleaner than extending the existing V3-11B DB test

Allowed result/report files:

- `../foundation-docs/runs/cosmile/20260709_v3_11c2_d_o1_idempotency_gate_plan/WORKER_RESULT.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_d_o1_idempotency_gate_plan/11_WORKER_RESULT_POINTER.md`

## Allowed Changes

- Add DB-backed uniqueness for `RecOutcomeEvent.orderItemId`.
- Replace the normal Prisma `@@index([orderItemId])` with `@@unique([orderItemId])`.
- Add the corresponding migration.
- Preserve `@@index([recommendationId])`.
- Preserve `recommendationId` nullable behavior.
- Preserve V3-11B CHECK/FK semantics.
- Preserve V3-11C2 fail-open checkout behavior.
- Keep code-level existing-check by `orderItemId`.
- Add or update code so Prisma/DB unique conflict on `orderItemId` returns duplicate/idempotent skip behavior.
- Add non-prod/ephemeral DB tests proving duplicate `orderItemId` insertion is rejected.
- Update V3-11B DB tests where D-O1 intentionally changes expectations.
- Add service tests for race-like DB unique conflict handling.
- Write Worker result and pointer files under `foundation-docs`.

## Important Existing Test Impact

The existing V3-11B DB test currently allows more than one `RecOutcomeEvent` row for the same `orderItemId` in the R-K2/direct-mode checks.

D-O1 intentionally changes this.

Worker should update tests so:

- direct attribution mode is still proven valid using a distinct `OrderItem`.
- duplicate `orderItemId` rows are rejected by DB.
- organic `recommendationId=null` still passes.
- direct `recommendationId` set still passes when `orderItemId` is distinct.
- R-K2 still rejects organic/unattributed/unknown rows with non-null `recommendationId`.

Do not weaken or delete meaningful tests to make the suite green.

## Forbidden Changes

Do not:

- turn `COSMILE_REC_OUTCOME_ENABLED` ON
- access prod/live/main/secret
- run production DB migrations
- write production DB data
- commit or push runtime repo changes
- change SIASIU
- change foundation-control
- change Foundation semantic contracts
- implement group-buy outcome
- implement refund/cancel/reorder outcome
- implement direct/session attribution threading
- implement semantic feedback, RecOutcomeFeedback wiring, MemoryFactCandidate promotion, or V3-11D
- change checkout semantics beyond preserving fail-open duplicate handling
- touch unrelated docs or generated files
- include unrelated existing untracked files in any stage/commit

## Required Implementation Semantics

### Schema

Expected direction:

```prisma
@@unique([orderItemId])
@@index([recommendationId])
```

Do not use a partial unique index unless Advisor/Leo approves a new design. The approved approach is full one-row-per-`OrderItem` uniqueness.

### Migration

Migration must:

- add/replace the hard uniqueness guarantee on `RecOutcomeEvent.orderItemId`
- avoid destructive changes to unrelated schema
- preserve existing V3-11B constraints
- provide rollback that removes the unique guarantee and restores the previous lookup index if applicable

Worker must include the duplicate preflight query in the evidence:

```sql
SELECT "orderItemId", COUNT(*)
FROM "RecOutcomeEvent"
GROUP BY "orderItemId"
HAVING COUNT(*) > 1;
```

If duplicates are found in any target DB, STOP and report. Do not auto-delete, merge, or rewrite rows.

### Service

The service must keep existing-check behavior:

- existing row by `orderItemId` -> `{ written: false, skipped: "duplicate" }`

The service must also handle DB unique race:

- DB unique conflict for `orderItemId` during create -> `{ written: false, skipped: "duplicate" }`
- other DB/write errors -> existing fail-open observable error behavior

Do not leak raw order/customer/payment identifiers, PII, or secrets in errors/logs/reports.

## Tests Required

Run or provide exact reason if blocked:

1. Prisma/schema validation:
   - `cd ../Cosmile/app`
   - `npx prisma validate`
2. V3-11C2 provider-independent tests:
   - `npx vitest run scripts/v3_11c2_rec_outcome.vitest.ts`
3. V3-11C regression tests:
   - `npx vitest run scripts/v3_11c_rec_event.vitest.ts`
4. V3-11A provider-independent regression tests:
   - `npx vitest run scripts/v3_11.vitest.ts`
5. V3-11B/D-O1 DB tests against non-prod/ephemeral Postgres:
   - run the updated or new DB test script after applying base + V3-11B + D-O1 migration
   - connection failure or missing `psycopg2` is `SKIP`, not PASS
6. Duplicate rejection test:
   - same `orderItemId` second insert must fail at DB level
   - different `orderItemId` must pass
7. Service unique-conflict test:
   - simulated or actual unique conflict must return duplicate skip/fail-open, not throw and not write_failed for the idempotent race case
8. Scoped lint/typecheck for touched files when feasible:
   - report exact command and result

## Completion Criteria

The Worker result is complete only if:

- `@@unique([orderItemId])` exists in Prisma schema.
- D-O1 migration implements the DB-level uniqueness guarantee.
- Duplicate preflight query is documented and tested in non-prod/ephemeral context.
- Duplicate `orderItemId` rows are rejected by DB.
- Direct mode remains valid with a distinct `orderItemId`.
- R-K2 remains enforced.
- Existing-check duplicate skip remains.
- DB unique race maps to duplicate/idempotent skip and fail-open.
- `COSMILE_REC_OUTCOME_ENABLED` remains OFF.
- No prod/live/main/secret access occurred.
- No runtime commit/push occurred unless Leo/GPT separately approved it.
- Worker result and pointer files are written and pushed to foundation-docs.

## Expected Evidence Report Format

Write the long result to:

`../foundation-docs/runs/cosmile/20260709_v3_11c2_d_o1_idempotency_gate_plan/WORKER_RESULT.md`

Write the Advisor pointer to:

`../foundation-docs/advisor/jobs/20260709_v3_11c2_d_o1_idempotency_gate_plan/11_WORKER_RESULT_POINTER.md`

Worker chat output must contain only:

1. `RESULT SUMMARY`
2. `NEXT ACTION ROUTING`
3. `POINTER BLOCK`

The Worker result must include:

- actor and target project
- branch and base commit
- exact changed files
- schema/migration summary
- duplicate preflight query and result
- tests run with pass/fail/skip status
- non-prod DB evidence and whether DB was ephemeral
- runtime repo commit status
- foundation-docs result commit hash
- explicit confirmation that `COSMILE_REC_OUTCOME_ENABLED` remains OFF
- explicit confirmation of no prod/live/main/secret access
- known residual risks

## STOP Conditions

STOP and return to Advisor if:

- branch is wrong or target repo is not `../Cosmile`
- any required change needs files outside the allowed list
- duplicate preflight finds existing duplicates
- D-O1 cannot be represented as `@@unique([orderItemId])`
- migration requires destructive unrelated schema changes
- tests must be weakened to pass
- prod/live/main/secret access is required
- flag ON is required
- Worker needs to change SIASIU/foundation-control/Foundation contracts
- Worker needs to expand into group-buy/refund/reorder/direct/session/semantic scope
- Worker is asked to commit runtime code without separate approval

## Return To Advisor

After writing and pushing the foundation-docs result/pointer files, return the pointer block to Advisor.
