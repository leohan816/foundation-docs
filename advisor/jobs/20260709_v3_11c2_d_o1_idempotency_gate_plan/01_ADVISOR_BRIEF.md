# V3-11C2-D-O1 Unique Index / Idempotency Hardening Gate Plan

Date: 2026-07-09

## Verdict

`D_O1_WORKER_BRIEF_READY`

Advisor recommended a full DB-level unique constraint on `RecOutcomeEvent.orderItemId`, with code-level existing-check retained and DB unique violations treated as duplicate skips.

Leo/GPT has approved that recommendation. Worker and Sentinel briefs may now be issued for D-O1 implementation and review.

## Leo/GPT Decision

Decision received: approved.

Approved approach:

`FULL_ORDER_ITEM_UNIQUE`

Meaning:

`RecOutcomeEvent` has at most one purchase outcome row per `OrderItem` in the current V3-11C2 model.

Approved direction:

- Implement DB-level uniqueness for `RecOutcomeEvent.orderItemId`.
- Represent it in Prisma schema as `@@unique([orderItemId])`.
- Keep the current code-level existing-check as a fast-path duplicate skip.
- Treat DB unique conflict as duplicate/idempotent skip and fail-open, not as checkout failure.
- Require duplicate preflight before applying the unique index in any target DB.
- Require non-prod migration rehearsal and duplicate rejection tests.
- Keep `COSMILE_REC_OUTCOME_ENABLED` OFF.

Accepted limits:

- Future refund/cancel as separate rows for the same `orderItemId` is out of scope and would require later schema redesign.
- D-O1 does not solve group-buy, guest+login stitching, direct/session attribution, refund/reorder, semantic feedback, or V3-11D.

Forbidden by Leo/GPT decision:

- flag ON
- live/prod/main/secret
- production DB migration
- operational use
- group-buy/refund/reorder/direct/session/semantic expansion
- SIASIU/foundation-control changes

## Executive Summary

Current V3-11C2 writes are protected only by an application-level existing-check:

- Check whether a `RecOutcomeEvent` already exists for `orderItemId`.
- If found, skip.
- If not found, create.

That is not race-safe under concurrent writes. D-O1 should close this by adding a DB-backed uniqueness guarantee.

Recommended D-O1 approach:

1. Replace the current non-unique `RecOutcomeEvent.orderItemId` index with a DB unique constraint/index.
2. Represent it in Prisma schema as `@@unique([orderItemId])`, not as raw SQL only, to avoid schema/migration drift.
3. Keep the current code-level existing-check as a fast-path duplicate skip.
4. Add service handling for DB unique conflict so a race returns duplicate skip/fail-open behavior rather than checkout failure.
5. Require non-prod DB migration rehearsal and duplicate-rejection tests before any flag-ON readiness claim.

## Current Schema State

Current `RecOutcomeEvent` model:

- `id String @id`
- `recommendationId String?`
- `attributionMode String`
- `subjectRef String?`
- `anonymousRef String?`
- `orderId String`
- `orderItemId String`
- `productId String`
- `skuId String?`
- `refundQty Int?`
- `refundAmountBand String?`
- `secretVersion Int @default(1) @db.SmallInt`
- `createdAt DateTime @default(now()) @db.Timestamptz(6)`
- `@@index([orderItemId])`
- `@@index([recommendationId])`

Current V3-11B migration SQL:

- `orderItemId` is `TEXT NOT NULL`.
- `orderItemId` has an FK to `OrderItem(id)` with `ON DELETE RESTRICT ON UPDATE CASCADE`.
- `orderItemId` has a normal index: `CREATE INDEX "RecOutcomeEvent_orderItemId_idx"`.
- There is no unique index or unique constraint on `orderItemId`.

## Compatibility Assessment

### Can `orderItemId` be unique?

Yes, technically.

Reasons:

- `orderItemId` is non-null.
- It references `OrderItem(id)`.
- V3-11C2 MVI semantics are one organic purchase outcome per paid `OrderItem`.
- Direct/session/organic attribution modes are alternative attribution labels for a purchase outcome, not separate rows for the same purchase line in the current model.

### Nullable `orderItemId`

No blocking conflict found.

`orderItemId` is currently non-null in both Prisma schema and V3-11B migration SQL. D-O1 does not need nullable unique semantics.

### Organic rows

No conflict.

Organic rows use:

- `recommendationId=null`
- `attributionMode=organic`
- one row per order item

A full unique constraint on `orderItemId` is compatible with this MVI.

### Future direct/session attribution

Likely compatible if direct/session remain attribution modes for the same purchase outcome row.

D-O1 should not allow both organic and direct rows for the same `orderItemId`; that would create false attribution ambiguity.

### Future reorder

Compatible.

Reorder should create a new `OrderItem`, so it should have a distinct `orderItemId`.

### Future refund/cancel

Potential design conflict.

The current table has `refundQty` and `refundAmountBand`, but no `outcomeType` or event lifecycle field. A full unique constraint means future refund/cancel data for the same order item must either:

1. update/enrich the existing `RecOutcomeEvent` row, or
2. use a separate table/model, or
3. introduce a new outcome/event type schema before multiple rows per `orderItemId` are allowed.

Therefore D-O1 should explicitly decide: current `RecOutcomeEvent` remains one row per `OrderItem` for the purchase outcome. Future refund/cancel as separate rows is out of scope and requires a later schema gate.

## Decision Package

### Decision D-O1-A: Unique Strategy

Recommended:

`FULL_ORDER_ITEM_UNIQUE`

Implement `@@unique([orderItemId])` for `RecOutcomeEvent`.

Rationale:

- It directly enforces the intended V3-11C2 MVI idempotency rule.
- It prevents duplicate organic writes and future duplicate attribution rows for the same purchase line.
- It is simple to test and reason about.
- It makes flag-ON readiness concrete.

Alternative 1:

`PARTIAL_UNIQUE_PURCHASE_ONLY`

Use a raw SQL partial unique index.

Not recommended now because the schema has no reliable `outcomeType` column to distinguish purchase outcomes from future refund/cancel outcomes. Using `refundQty IS NULL` or `recommendationId IS NULL` would encode unclear semantics and could open loopholes.

Alternative 2:

`COMPOSITE_UNIQUE_ORDER_ITEM_ATTRIBUTION_MODE`

Use `@@unique([orderItemId, attributionMode])`.

Not recommended because it would still allow multiple rows for one purchase line under different attribution modes, which can create false attribution or double-counting.

Alternative 3:

`CODE_LEVEL_ONLY`

Keep the current existing-check only.

Rejected for flag-ON/live readiness because it does not close the known concurrency race.

### Decision D-O1-B: Existing-Check Role

Recommended:

Keep the code-level existing-check as a fast-path guard, but do not treat it as the hard guarantee.

The DB unique constraint must be the source of truth for idempotency. If a concurrent race reaches create, the service should catch the DB unique conflict and return a duplicate skip/fail-open result.

### Decision D-O1-C: Future Refund/Cancel Semantics

Recommended:

For D-O1, freeze current semantics as:

`RecOutcomeEvent` has at most one row per `OrderItem` purchase outcome.

Refund/cancel/reorder/direct/session expansion remains out of scope. If future refund/cancel needs separate event rows for the same order item, that must be a later schema redesign/gate.

### Decision D-O1-D: Migration Requirement

Recommended:

Yes, D-O1 requires a schema/migration Worker batch.

Expected schema direction:

- replace `@@index([orderItemId])` with `@@unique([orderItemId])`
- keep `@@index([recommendationId])`
- generate/apply non-prod migration that drops/replaces the non-unique index with a unique index/constraint

The exact migration name and SQL should be produced by Worker in a separate approved implementation task.

### Decision D-O1-E: Backfill / Duplicate Preflight

Recommended:

Require duplicate preflight before applying the unique index in any target DB:

```sql
SELECT "orderItemId", COUNT(*)
FROM "RecOutcomeEvent"
GROUP BY "orderItemId"
HAVING COUNT(*) > 1;
```

If any duplicates exist, STOP and ask Leo/GPT. Do not auto-delete or auto-merge rows.

Current assumption:

Because `COSMILE_REC_OUTCOME_ENABLED` has remained default OFF and V3-11C2 has not been approved for operational writes, production duplicate backfill should be unnecessary. This still must be verified before any real DB migration.

### Decision D-O1-F: Rollback

Recommended:

Rollback should drop the unique index/constraint and restore the prior normal `orderItemId` lookup index if the migration replaced it.

Rollback does not solve data semantics if duplicates were written after flag-ON. Therefore D-O1 should be completed before flag-ON, not after operational duplicates are possible.

## Gate Plan

### Phase 0 - Leo/GPT Decision

Leo/GPT must decide whether to accept the recommended strategy:

`FULL_ORDER_ITEM_UNIQUE`

If accepted, Advisor can write a Worker brief for D-O1 implementation.

### Phase 1 - Worker Brief Preparation

Worker brief should require:

- Required skill: `/fable-builder`
- Target repo: `../Cosmile`
- Branch target: `shadow/m4-cosmile-memory`
- Scope: schema/migration + service duplicate-race handling + tests only
- No flag ON
- No prod/live/main/secret
- No DB writes except approved non-prod ephemeral test DB
- No refund/reorder/direct/session/semantic expansion

Likely allowed implementation files:

- `../Cosmile/app/prisma/schema.prisma`
- new migration folder under `../Cosmile/app/prisma/migrations/`
- `../Cosmile/app/src/lib/recOutcomeEventService.ts`
- D-O1 DB/schema test script under `../Cosmile/app/scripts/`
- existing V3-11C2 test script if needed for regression coverage

Forbidden implementation files should include:

- SIASIU files
- foundation-control files
- Foundation semantic contract files
- checkout route changes unless strictly needed for regression compatibility
- prod/live/secret files
- unrelated docs

### Phase 2 - Implementation Requirements

Worker should:

1. Add a DB-level unique guarantee for `RecOutcomeEvent.orderItemId`.
2. Keep `recommendationId` nullable and preserve R-K2 semantics.
3. Preserve existing CHECK/FK/index constraints from V3-11B.
4. Preserve existing V3-11C2 fail-open checkout behavior.
5. Preserve code-level existing-check as a fast-path duplicate skip.
6. Treat DB unique violation as duplicate/idempotent skip, not as a checkout-breaking error.
7. Add non-prod DB tests proving duplicate `orderItemId` insert is rejected.
8. Add or update service tests proving race-like unique conflict is handled as duplicate skip.
9. Re-run V3-11C2 and relevant V3-11B/V3-11C regressions.

### Phase 3 - Review Requirements

This should be treated as a higher-risk review than the original C2 MVI because it touches schema/migration and order outcome persistence.

Required review:

- Sentinel review in a separate read-only session.
- DB/schema migration inspection.
- Direct diff inspection.
- Non-prod DB test result inspection.
- Confirmation that runtime repo commit remains unapproved unless Leo/GPT separately routes commit.

Recommended reviewer route:

- Level 3 Sentinel route, because the task touches DB/schema/order learning idempotency.
- Prefer `fable5 Sentinel` and/or `Codex SOL / Codex 5.6 SOL Sentinel` if available.

### Phase 4 - Gate Closure Conditions

D-O1 can be closed only if all of the following are true:

- Leo/GPT approved the unique strategy before implementation.
- Schema/migration implements hard uniqueness for `RecOutcomeEvent.orderItemId`.
- Duplicate preflight query is defined and returns zero in the tested non-prod target.
- Non-prod migration applies cleanly.
- Duplicate insert for the same `orderItemId` is rejected by DB.
- Different `orderItemId` rows remain allowed.
- Existing V3-11B CHECK/FK semantics still hold.
- V3-11C2 service treats DB unique race as duplicate skip/fail-open.
- Required tests pass and are independently reviewed.
- `COSMILE_REC_OUTCOME_ENABLED` remains OFF during the gate.
- No prod/live/main/secret access occurred.

## Flag-ON Readiness Conditions After D-O1

D-O1 completion is necessary but not sufficient for operational rollout.

Before flag ON, Advisor should still require:

- D-O1 final audit PASS or PASS_WITH_ACCEPTED_RISK.
- Runtime commit/publish routing for the implementation, if not already committed.
- Explicit Leo/GPT flag-ON decision.
- Confirmation that the target DB has the unique index.
- Confirmation that no duplicate preflight failures exist.
- Confirmation that this still covers only organic checkout MVI and not group-buy/refund/reorder/direct/session semantics.

## Risks

1. A full unique constraint freezes current semantics to one `RecOutcomeEvent` per `OrderItem`.
2. Future refund/cancel as separate event rows would need schema redesign.
3. Existing duplicate rows in any non-empty DB would block migration.
4. If service code does not handle DB unique conflict as duplicate skip, race safety would be DB-correct but operationally noisy.
5. D-O1 does not solve group-buy, guest+login stitching, direct attribution, session attribution, refund, reorder, semantic feedback, or V3-11D.

## Worker Brief Readiness

Worker brief is ready to issue.

Reason:

Leo/GPT approved the recommended D-O1 approach:

`FULL_ORDER_ITEM_UNIQUE` on `RecOutcomeEvent.orderItemId`, with existing-check retained and DB unique conflict mapped to duplicate skip/fail-open.

Advisor has written:

- `02_WORKER_BRIEF.md`
- `03_SENTINEL_REVIEW_BRIEF.md`
- reviewer routing decision in `10_LOOP_STATE.md`
- `06_WORKER_HANDOFF_PROMPT.md`
- `06_WORKER_RUN_PROMPT.md`

## Recommended Next Action

Leo should paste `06_WORKER_RUN_PROMPT.md` into the separate Cosmile Worker session.
