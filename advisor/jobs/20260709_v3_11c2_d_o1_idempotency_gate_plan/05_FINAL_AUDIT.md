# 05 Final Audit - V3-11C2-D-O1 Idempotency Hardening

Date: 2026-07-09

## Final Audit Verdict

`PASS_WITH_RISK`

D-O1 implementation and independent Sentinel review are complete for the approved shadow/schema implementation loop.

This does not approve flag-ON, live/prod exposure, main merge, production DB migration, operational use, or runtime commit/push.

Final approval remains with Leo/GPT.

## Scope Audited

Approved D-O1 approach:

`FULL_ORDER_ITEM_UNIQUE`

Meaning:

- `RecOutcomeEvent` has at most one purchase outcome row per `OrderItem`.
- Hard idempotency is implemented through DB-level uniqueness on `RecOutcomeEvent.orderItemId`.
- Prisma schema represents the rule as `@@unique([orderItemId])`.
- Existing code-level `orderItemId` check remains as fast-path duplicate skip.
- DB unique conflict maps to duplicate/idempotent skip and fail-open behavior.
- `COSMILE_REC_OUTCOME_ENABLED` remains OFF.

Explicitly out of scope:

- flag ON
- live/prod/main/secret access
- production DB migration
- operational use
- group-buy/refund/reorder outcome expansion
- direct/session attribution expansion
- semantic feedback / V3-11D
- SIASIU changes
- foundation-control changes
- runtime commit/push

## Inputs Compared

Advisor compared:

- Leo/GPT D-O1 approval recorded in `01_ADVISOR_BRIEF.md`.
- Advisor Worker brief: `02_WORKER_BRIEF.md`.
- Advisor Sentinel brief: `03_SENTINEL_REVIEW_BRIEF.md`.
- Worker result: `../foundation-docs/runs/cosmile/20260709_v3_11c2_d_o1_idempotency_gate_plan/WORKER_RESULT.md`.
- Worker pointer: `11_WORKER_RESULT_POINTER.md`.
- Sentinel result: `../foundation-docs/runs/cosmile/20260709_v3_11c2_d_o1_idempotency_gate_plan/SENTINEL_REVIEW_RESULT.md`.
- Sentinel pointer: `12_SENTINEL_RESULT_POINTER.md`.
- Actual `../Cosmile` runtime status and D-O1 diff surface.

## Worker Output Audit

Worker reported a scoped D-O1 implementation on `../Cosmile` branch `shadow/m4-cosmile-memory`, with runtime changes left uncommitted.

Worker-reported D-O1 files:

- `app/prisma/schema.prisma`
- `app/prisma/migrations/20260709120000_v3_11c2_d_o1_rec_outcome_orderitem_unique/migration.sql`
- `app/prisma/migrations/20260709120000_v3_11c2_d_o1_rec_outcome_orderitem_unique/down.sql`
- `app/src/lib/recOutcomeEventService.ts`
- `app/scripts/v3_11b_db_integration.dbtest.py`
- `app/scripts/v3_11c2_rec_outcome.vitest.ts`

Worker reported:

- `@@index([orderItemId])` replaced by `@@unique([orderItemId])`.
- `@@index([recommendationId])` preserved.
- migration drops prior non-unique lookup index and creates unique index.
- rollback drops unique index and restores non-unique lookup index.
- service maps Prisma `P2002` unique conflict to duplicate skip.
- non-P2002 write failures remain observable as write failure.
- provider-independent tests passed.
- `COSMILE_REC_OUTCOME_ENABLED` remains OFF.
- no prod/live/main/secret access.
- no SIASIU/foundation-control/Foundation contract changes.
- no runtime commit/push.

Worker limitation:

- DB rehearsal was not executed in Worker environment because `psycopg2` was unavailable. Worker correctly reported this as `SKIP`, not PASS.

## Sentinel Findings Audit

Sentinel returned:

`PASS`

Sentinel independently verified:

- runtime review was read-only
- no runtime stage/commit/push by Sentinel
- D-O1 diff scope matched the Worker brief
- Prisma schema has `@@unique([orderItemId])`
- D-O1 migration and rollback match the approved strategy
- V3-11B CHECK/FK semantics are preserved
- service maps DB unique conflict to duplicate/idempotent skip
- existing fast-path duplicate check remains
- non-idempotent write failures remain observable
- `COSMILE_REC_OUTCOME_ENABLED` remains OFF
- no prod/live/main/secret access
- no SIASIU/foundation-control/Foundation contract changes
- no group-buy/refund/reorder/direct/session/semantic expansion

Sentinel reproduced or verified:

- `prisma validate` passed
- V3-11C2 tests passed: 15/15
- V3-11C regression passed: 10/10
- V3-11A regression passed: 43/43
- scoped eslint passed
- ephemeral PostgreSQL rehearsal directly executed
- D-O1 migration clean-applied over base + V3-11B
- duplicate `orderItemId` insert was rejected by `RecOutcomeEvent_orderItemId_key`
- distinct `orderItemId` direct attribution row was accepted
- R-K2 CHECK remained effective
- duplicate preflight query returned 0 before/after the tested path
- rollback round trip restored non-unique state
- duplicate-existing state caused reapply failure, proving preflight STOP is necessary

Sentinel findings:

- F-1 LOW: manual non-transactional application can leave a partial state if `DROP INDEX` succeeds and `CREATE UNIQUE INDEX` fails. Prisma migrate deploy path is safer; manual application should use an explicit transaction procedure.
- F-2 INFO / carry-forward: pre-existing sqlite-style migration directory `20260624181637_commerce_intelligence` can break fresh `prisma migrate deploy`. This predates D-O1 and remains a deploy/flag-ON blocker.
- F-3 INFO: broad `P2002` mapping is acceptable in current model because `orderItemId` is the meaningful unique constraint and the id primary key uses fresh generated IDs.

No `NEEDS_PATCH`, `FAIL`, or rework-blocking Sentinel finding exists.

## Service Review Audit

No separate Service Review is required for this D-O1 loop.

Reason:

- Leo/GPT already approved the service meaning of `FULL_ORDER_ITEM_UNIQUE`.
- D-O1 implements a schema/idempotency guarantee for that approved meaning.
- Worker and Sentinel did not introduce new group-buy/refund/reorder/direct/session/semantic behavior.

If future refund/cancel as separate rows for the same `orderItemId` is desired, that requires a later service/schema redesign decision.

## Actual Diff Audit

Advisor re-checked `../Cosmile` runtime status after Sentinel result.

Observed:

- runtime repo: `../Cosmile`
- branch: `shadow/m4-cosmile-memory`
- staged runtime files: none
- runtime commit/push: not performed by Advisor
- D-O1 tracked modifications:
  - `app/prisma/schema.prisma`
  - `app/scripts/v3_11b_db_integration.dbtest.py`
- prior V3-11C2 tracked modifications still present:
  - `app/src/app/api/checkout/mock-complete/route.ts`
  - `app/src/lib/ids.ts`
- D-O1 untracked migration folder present:
  - `app/prisma/migrations/20260709120000_v3_11c2_d_o1_rec_outcome_orderitem_unique/`
- prior/new V3-11C2 untracked implementation/test files still present:
  - `app/src/lib/recOutcomeEventService.ts`
  - `app/scripts/v3_11c2_rec_outcome.vitest.ts`
- unrelated untracked docs under `../Cosmile/app/docs/` remain outside scope.

Advisor did not stage, commit, or push any runtime repo changes.

## Completion Criteria Audit

| Criterion | Status |
|---|---|
| Leo/GPT approved `FULL_ORDER_ITEM_UNIQUE` | Pass |
| Prisma schema has `@@unique([orderItemId])` | Pass |
| Migration implements unique index | Pass |
| Rollback restores prior lookup index | Pass |
| `@@index([recommendationId])` preserved | Pass |
| V3-11B CHECK/FK semantics preserved | Pass, Sentinel DB rehearsal verified |
| Duplicate `orderItemId` rejected by DB | Pass, Sentinel DB rehearsal verified |
| Different `orderItemId` accepted | Pass |
| Direct attribution mode still valid with distinct `orderItemId` | Pass |
| R-K2 remains enforced | Pass |
| Existing-check duplicate skip preserved | Pass |
| DB unique race maps to duplicate/idempotent skip | Pass |
| Non-idempotent write failures remain observable | Pass |
| `COSMILE_REC_OUTCOME_ENABLED` remains OFF | Pass |
| No prod/live/main/secret access | Pass |
| No SIASIU/foundation-control changes | Pass |
| No semantic/V3-11D expansion | Pass |
| Worker result and pointer archived | Pass |
| Sentinel result and pointer archived | Pass |
| Runtime commit/push avoided | Pass |

## Residual Risks and Required Limits

These limits remain attached to D-O1:

1. `COSMILE_REC_OUTCOME_ENABLED` must remain OFF until Leo/GPT separately approves flag-ON.
2. Runtime code remains uncommitted and requires separate commit routing.
3. The tested DB rehearsal was ephemeral; each real target DB still requires migration deploy and duplicate preflight = 0 before use.
4. Pre-existing sqlite-style migration directory issue F-2 must be resolved before fresh `prisma migrate deploy` / flag-ON / rollout.
5. Manual D-O1 migration application should use a transaction-aware procedure to avoid F-1 partial state risk.
6. D-O1 does not solve group-buy, guest+login stitching, direct/session attribution, refund/reorder, semantic feedback, V3-11D, or production rollout.
7. Future refund/cancel as separate rows for the same `orderItemId` would require later schema redesign.

## What Must Not Happen Next

- Do not turn `COSMILE_REC_OUTCOME_ENABLED` ON.
- Do not expose RecOutcomeEvent writes to live/prod.
- Do not run production DB migration.
- Do not merge to main.
- Do not access prod/live/main/secret.
- Do not claim D-O1 authorizes operational use.
- Do not commit runtime code without separate Leo/GPT runtime commit routing.
- Do not include unrelated untracked docs in any runtime commit.
- Do not claim group-buy/refund/reorder/direct/session/semantic coverage.

## Final Audit Conclusion

V3-11C2-D-O1 hard idempotency implementation satisfies the approved `FULL_ORDER_ITEM_UNIQUE` scope and passed independent Sentinel review, including ephemeral DB rehearsal.

The correct Advisor final audit verdict is `PASS_WITH_RISK`.

The risk is not an implementation blocker for the shadow/schema loop. It is an operational rollout blocker:

- runtime diff is not committed
- real target DB deploy/preflight remains required
- F-2 migration-directory cleanup remains required before fresh deploy/flag-ON
- flag-ON/live/prod remains forbidden until separately approved

Final approval remains with Leo/GPT.
