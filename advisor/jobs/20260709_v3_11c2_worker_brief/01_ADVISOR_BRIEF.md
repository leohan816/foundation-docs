# 01 Advisor Brief - V3-11C2 Worker and Review Briefs

## Verdict

`V3_11C2_WORKER_AND_REVIEW_BRIEFS_READY`

Instruction validation result: `PROCEED_WITH_LIMITS`.

## Executive Summary

Leo/GPT approved the V3-11C2 decision package. Advisor may now issue a Worker brief for the narrow Organic RecOutcomeEvent MVI and paired read-only review briefs.

This job produced:

- `02_WORKER_BRIEF.md`
- `03_SENTINEL_REVIEW_BRIEF.md`
- `04_SERVICE_REVIEW_BRIEF.md`

No runtime repos were modified.

## Grounded Scope

Approved implementation scope:

- Cosmile only.
- Organic checkout MVI only.
- Hook after `completeMockOrder` returns `justPaid=true` in `mock-complete`.
- One RecOutcomeEvent per `OrderItem`.
- `recommendationId = null`.
- `attributionMode = "organic"`.
- Dedicated ID generator: `rec_out_v3_` + ULID(26).
- Code-level existing-check idempotency by `orderItemId`.
- Feature flag `COSMILE_REC_OUTCOME_ENABLED`, default OFF.
- Fail-open for checkout flow with observable result.

Excluded:

- direct attribution
- session attribution
- refund/cancel outcome
- reorder/repurchase outcome
- semantic feedback
- V3-11D
- SIASIU
- foundation-control/Foundation contract
- schema/migration
- prod/live/main/secret

## Runtime Files Checked for Brief Precision

- `../Cosmile/app/src/app/api/checkout/mock-complete/route.ts`
- `../Cosmile/app/src/lib/checkout.ts`
- `../Cosmile/app/src/lib/ids.ts`
- `../Cosmile/app/src/lib/recommendationEventService.ts`
- `../Cosmile/app/prisma/schema.prisma`
- `../Cosmile/app/src/types/recOutcome.ts`
- `../Cosmile/app/scripts/v3_11c_rec_event.vitest.ts`
- `../Cosmile/app/scripts/v3_11b_db_integration.dbtest.py`
- `../Cosmile/app/package.json`

## Branch Note

Advisor observed current Cosmile branch as `shadow/m4-cosmile-memory`. The Worker must verify branch at task start and STOP if on `main`, prod/live, or any branch not approved by Leo/GPT.

## Brief Readiness

- Worker brief: ready.
- Sentinel review brief: ready.
- Service review brief: ready.

## What Must Not Happen

- Do not implement in this Advisor job.
- Do not let Worker modify schema/migrations.
- Do not let Worker add direct/session attribution.
- Do not let Worker write semantic feedback.
- Do not let Worker touch SIASIU/foundation-control.
- Do not activate prod/live/main/secret paths.

## Next Required Flow

1. Worker implements from `02_WORKER_BRIEF.md` in a separate Worker session.
2. Sentinel reviews from `03_SENTINEL_REVIEW_BRIEF.md` in a separate read-only session.
3. Service reviewer reviews from `04_SERVICE_REVIEW_BRIEF.md` in a separate read-only session.
4. Advisor writes final audit only after Worker and reviews exist.
