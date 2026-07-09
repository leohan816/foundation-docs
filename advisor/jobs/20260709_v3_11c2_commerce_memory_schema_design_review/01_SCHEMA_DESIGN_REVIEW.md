# 01 Schema Design Review - V3-11C2 / D-O1 Commerce Memory

Date: 2026-07-09

## Verdict

`KEEP_REC_OUTCOME_AS_SUMMARY_AND_PLAN_EVENT_LOG`

Current `RecOutcomeEvent` is production-compatible only if it is treated as an order-item purchase outcome summary/current-state row, not as a lifecycle event log.

The preferred long-term design is hybrid:

- current summary row: fast lookup, hard idempotency, current purchase outcome state;
- separate event log: purchase/refund/cancel/reorder/attribution-change history;
- raw commerce events remain in Cosmile;
- Foundation receives refined signals only, with traceability back to Cosmile-owned raw evidence.

This is a design review only. No runtime repo was modified. No DB was accessed. No query or migration was run.

## Read Scope

### Files Directly Read

Cosmile runtime:

- `../Cosmile/app/prisma/schema.prisma`
- `../Cosmile/app/prisma/migrations/20260706120000_v3_11b_learning_commerce_memory/migration.sql`
- `../Cosmile/app/prisma/migrations/20260709120000_v3_11c2_d_o1_rec_outcome_orderitem_unique/migration.sql`
- `../Cosmile/app/src/lib/recOutcomeEventService.ts`
- `../Cosmile/app/src/lib/recommendationEventService.ts`
- `../Cosmile/app/src/lib/commerceEventService.ts`
- `../Cosmile/app/src/lib/foundationSignalMapper.ts`
- `../Cosmile/app/src/lib/checkout.ts`
- `../Cosmile/app/src/app/api/checkout/mock-complete/route.ts`
- `../Cosmile/app/src/lib/ids.ts`
- `../Cosmile/app/src/types/recOutcome.ts`
- `../Cosmile/app/src/types/recommendationEvent.ts`
- `../Cosmile/app/src/types/commerceEvent.ts`
- `../Cosmile/app/src/adapters/foundationClient.ts`
- `../Cosmile/app/src/adapters/cosmileSemanticAdapter.ts`
- `../Cosmile/app/src/lib/foundation/consultationRiskGate.ts`

Advisor / evidence artifacts:

- `../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/05_FINAL_AUDIT.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/14_CLOSURE_RECORD.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_d_o1_idempotency_gate_plan/01_ADVISOR_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_d_o1_idempotency_gate_plan/05_FINAL_AUDIT.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_d_o1_idempotency_gate_plan/11_WORKER_RESULT_POINTER.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_d_o1_idempotency_gate_plan/12_SENTINEL_RESULT_POINTER.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_phase1_ephemeral_fresh_deploy_rehearsal/05_FINAL_AUDIT.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_phase1_ephemeral_fresh_deploy_rehearsal/06_PASS_WITH_RISK_EXTRACT_AND_PHASE2_DECISION_PACKAGE.md`
- `../foundation-docs/advisor/jobs/20260708_cosmile_siasiu_code_structure_map/01_ADVISOR_BRIEF.md`
- `../foundation-docs/docs/reports/control/COSMILE_MEMORY_V3_11C2_REC_OUTCOME_EVENT_GATE_PLAN_20260707.md`
- `../foundation-docs/docs/reports/control/COSMILE_MEMORY_V3_11B_DB_INTEGRATION_EVIDENCE_20260706.md`
- `../foundation-docs/docs/reports/control/COSMILE_MEMORY_V3_11D_SEMANTIC_EXTRACTION_GATE_PLAN_20260707.md`

### Candidate Files Not Deep-Read

These files were inventoried or considered but not deep-read because they were not load-bearing for this schema design question:

- `../Cosmile/app/src/app/api/group-deal/team/[teamId]/mock-complete/route.ts` - relevant to future group-buy outcome coverage, but current review focuses on the already-approved organic checkout path.
- `../Cosmile/app/src/app/api/admin/orders/[orderId]/status/route.ts` - relevant to future refund/cancel state transitions, but the current question can be answered from the schema and prior V3-11C2 gate/evidence stating refund/cancel is order-level and out of scope.
- `../Cosmile/app/scripts/**` test files - prior Worker/Sentinel artifacts already summarize the V3-11C2/D-O1 test outcomes; this review did not re-run or re-audit test implementation.
- Foundation-control runtime files - not re-read in this task because the current boundary was already captured in the cross-repo structure map and V3-11D gate plan. Current Cosmile Foundation adapter files were read instead.

## Current Schema Summary

### Order

`Order` represents checkout/order state:

- `id`
- `userId?`
- `guestId?`
- `status` with documented values `pending|paid|fulfilled|cancelled|refunded`
- totals and currency
- `orderSource` with `direct|group_buy` direction
- optional group-buy/coupon fields
- `createdAt`
- `paidAt?`
- relation `items: OrderItem[]`

Memory overlay columns exist on `Order`, but prior artifacts and schema comments mark them as additive/watch-limited and not the current source for V3-11C2 identity.

### OrderItem

`OrderItem` is the line-level purchase unit:

- `id`
- `orderId`
- `productId`
- `skuId?`
- `offerId?`
- quantity and price snapshots
- product/SKU/offer display snapshots
- relation to `Order`

There is no `recommendationId` on `OrderItem`; direct attribution cannot be derived from the current line item.

### RecommendationEvent

`RecommendationEvent` is a shallow recommendation interaction event:

- primary key `recommendationId`
- `eventType` constrained by migration to five V3-03 values
- subject/anonymous XOR in migration
- `sessionId`
- `productId`
- `skuId?`
- `reasonCodes`
- `secretVersion`
- `createdAt`

The service uses `COSMILE_REC_EVENT_ENABLED`, default OFF, and fail-open behavior. Current `sessionId` is noted in code comments as not fully populated.

### RecOutcomeEvent

`RecOutcomeEvent` currently has:

- `id`
- nullable `recommendationId`
- `attributionMode`
- subject/anonymous refs
- `orderId`
- `orderItemId`
- `productId`
- `skuId?`
- `refundQty?`
- `refundAmountBand?`
- `secretVersion`
- `createdAt`
- `@@unique([orderItemId])`
- `@@index([recommendationId])`

V3-11B created it as line-level attribution/outcome storage with CHECK/FK constraints. D-O1 then replaced the normal `orderItemId` lookup index with a unique index:

```sql
CREATE UNIQUE INDEX "RecOutcomeEvent_orderItemId_key" ON "RecOutcomeEvent"("orderItemId");
```

### Product / SKU Relationship

Cosmile does not define a Foundation-owned Product table in this schema. Product identity is carried as string refs:

- `OrderItem.productId` is a product reference.
- `OrderItem.skuId?` is an optional SKU reference.
- `CommerceSku.productId` is explicitly a Foundation canonical product reference.
- `CommerceSku.variantId?` is an optional Foundation variant reference.
- `CommerceOffer` may point to a `CommerceSku` by `skuId`.

The schema does not enforce an FK from `OrderItem.productId` or `OrderItem.skuId` to `CommerceSku`; checkout snapshots preserve line-level commerce evidence.

### `recommendationId` Nullable Meaning

`recommendationId` is nullable by design:

- recommendation-driven outcomes can later use a recommendation id;
- organic/unattributed/unknown outcomes must keep `recommendationId = null`;
- V3-11C2 writes organic outcomes only, so `recommendationId` is always null in the current implementation.

### `attributionMode` Meaning

`attributionMode` is constrained to:

- `direct`
- `session`
- `organic`
- `unattributed`
- `unknown`

The V3-11C2 implementation uses `organic` only. Direct/session attribution is not available without recommendation id threading or session linkage.

### `orderItemId` Unique Meaning

`@@unique([orderItemId])` means:

`one RecOutcomeEvent row per OrderItem`

This is a hard DB-level idempotency invariant. It prevents duplicate purchase outcome rows for the same order line, including concurrent write races after the code-level existing-check.

## Actual Role of `RecOutcomeEvent`

Despite the table name, current `RecOutcomeEvent` is not a true event log.

It is currently a purchase outcome summary/current-state row.

Reasons:

1. `orderItemId` is unique, so the table cannot store multiple lifecycle events for one order item.
2. The V3-11C2 service writes one organic row per paid order item.
3. D-O1 explicitly defines `FULL_ORDER_ITEM_UNIQUE`: one purchase outcome row per `OrderItem`.
4. The service treats unique conflict as duplicate/idempotent skip, not as a second event.
5. There is no `eventType`, `eventVersion`, `sequence`, `lifecycleState`, or append-only design in the table.
6. `refundQty` and `refundAmountBand` exist, but under the unique invariant they can only represent summary enrichment on the same row, not a separate refund event history.

### Naming / Role Mismatch

There is a naming mismatch:

- name says `RecOutcomeEvent`;
- D-O1 semantics say `RecOutcomeEvent` is a one-row-per-OrderItem purchase outcome summary.

This mismatch is manageable if documented and carried forward, but it is dangerous if later implementers assume the table is an append-only event log.

## Hybrid Structure Fit Review

### Option A - Keep Current Structure: One `RecOutcomeEvent` Per `OrderItem`

Description:

Keep `RecOutcomeEvent` as the current unique line-level purchase outcome row.

Advantages:

- already implemented and verified in D-O1;
- simple hard idempotency;
- fast lookup by `orderItemId`;
- aligns with current organic checkout MVI;
- additive-compatible with a future separate event log table.

Disadvantages:

- table name suggests event log but behavior is summary/current row;
- cannot preserve multiple lifecycle events for one order item;
- refund/cancel/reorder history cannot be represented as separate rows;
- future developers may misuse `refundQty`/`refundAmountBand` as destructive update fields.

Likelihood of later replacement:

- low if the role is documented as summary;
- high if the table is expected to become the event log.

Needed tables/fields:

- no immediate new table required;
- document invariant: one purchase outcome summary per `OrderItem`;
- reserve future event log table.

Migration difficulty:

- low now;
- low later if future event log is additive;
- high later if trying to repurpose this table into append-only event history.

Foundation/SIASIU impact:

- none required now;
- should not send raw commerce/order/payment/customer data to Foundation.

What to change now:

- documentation/contract language only.

What can wait:

- refund/cancel/reorder event log table;
- attribution change history;
- Foundation refined signal contract.

### Option B - Event Log Structure: Multiple Lifecycle Events Per `OrderItem`

Description:

Change `RecOutcomeEvent` or a successor table to allow multiple rows for each order item.

Advantages:

- preserves history naturally;
- purchase, refund, cancel, reorder, and attribution-change can be append-only;
- aligns with "event" naming;
- easier audit trail for analytics.

Disadvantages:

- conflicts with current D-O1 unique invariant;
- would require new idempotency model per event type/source;
- risks double-counting purchase outcomes unless summary is rebuilt carefully;
- requires more design before Phase 2;
- likely needs event type, source event id, lifecycle state, event time, sequence/idempotency key, and possibly derived summary maintenance.

Likelihood of later replacement:

- high if implemented by mutating current `RecOutcomeEvent`;
- lower if implemented as a separate table later.

Needed tables/fields:

- `commerceOutcomeEventLog` or equivalent;
- `eventType` such as purchase, refund, cancel, reorder, attribution_change;
- `sourceEventId` or `sourceCommerceEventId`;
- `orderId`, `orderItemId`, `productId`, `skuId`;
- attribution snapshot fields;
- idempotency key per event source;
- created/effective timestamps.

Migration difficulty:

- medium to high if replacing current table;
- medium if adding separately later.

Foundation/SIASIU impact:

- Foundation should still receive refined signals, not raw event rows.
- SIASIU should remain out of Cosmile commerce outcome history.

What to change now:

- not recommended for immediate Phase 2.

What can wait:

- event log design can be a separate architecture mission.

### Option C - Hybrid: Summary Row + Event Log

Description:

Keep `RecOutcomeEvent` as the summary/current purchase outcome row and add a separate event log later.

Advantages:

- matches Leo/GPT business direction;
- preserves current D-O1 hard idempotency;
- enables fast current-state lookup;
- future event log can be additive and append-only;
- reduces risk of rewriting current verified work;
- separates "current state" from "history".

Disadvantages:

- requires explicit naming/contract discipline;
- future event log design still needed;
- summary/event consistency rules must be defined later;
- raw CommerceEvent, summary row, and future event log must not drift semantically.

Likelihood of later replacement:

- low if documented now.

Needed tables/fields:

Current:

- keep `RecOutcomeEvent` with unique `orderItemId`.

Future:

- add `CommerceOutcomeEventLog` or similarly named table;
- add `sourceCommerceEventId` or source pointer;
- event type / lifecycle type;
- order/orderItem/product/sku refs;
- attribution snapshot;
- derived summary update rules.

Migration difficulty:

- low now;
- medium later, additive if planned correctly.

Foundation/SIASIU impact:

- Foundation receives refined signals from summary/log projections only;
- raw event evidence remains traceable in Cosmile;
- SIASIU remains outside checkout/order outcome wiring.

What to change now:

- document current `RecOutcomeEvent` as summary/current row;
- do not broaden Phase 2 into event log creation.

What can wait:

- event log table;
- summary projection worker;
- refund/cancel/reorder/direct attribution support.

## What To Decide Now vs Later

### Must Decide Now

- `RecOutcomeEvent` is a summary/current purchase outcome row, not append-only event history.
- `@@unique([orderItemId])` remains the hard invariant for the current table.
- Current Phase 2, if approved later, must validate the summary-row invariant only.
- Foundation must not receive raw order/payment/customer data as its owned source of truth.

### Should Be Reflected In Schema Now

No new schema table is strictly required before Phase 2 if Leo/GPT accepts the summary-row interpretation.

Existing schema already reflects the summary invariant through:

- non-null `orderItemId`;
- FK to `OrderItem`;
- unique `orderItemId`;
- nullable `recommendationId`;
- attribution mode CHECK;
- R-K2 CHECK.

### Can Be Documented Only For Now

- Hybrid architecture direction.
- `RecOutcomeEvent` naming mismatch.
- Future event log table reserved for refund/cancel/reorder/attribution-change history.
- Raw CommerceEvent remains the broad Cosmile-owned event ledger.
- Foundation signal payloads must stay refined/whitelisted.

### Can Be Added Later

- event log table for outcome lifecycle history;
- refund/cancel/reorder hooks;
- direct/session attribution threading;
- summary projection/update logic;
- raw evidence pointer fields;
- Foundation refined signal contract for commerce memory.

### Would Be Overbuilt Now

- building a full event log table before refund/cancel/reorder/direct attribution requirements are decided;
- adding Foundation semantic feedback fields while V3-11D is HOLD;
- changing `RecOutcomeEvent` to allow multiple rows before the summary/event split is designed.

### Could Become A Large Migration If Deferred Incorrectly

It would become expensive if future work tries to repurpose `RecOutcomeEvent` itself into an append-only event log.

It is less risky if future history is added as a separate additive table and `RecOutcomeEvent` remains the current summary row.

## Root Cause Analysis

The unique/idempotency issue is not merely "duplicate row prevention."

The underlying business invariant is:

For the current V3-11C2/D-O1 MVI, one paid `OrderItem` can produce at most one purchase outcome summary row.

The DB must enforce that invariant because checkout routes can be retried, called concurrently, or partially fail after order payment state changes. The code-level existing-check reduces common duplicate attempts, but only the DB unique index prevents race-condition double writes.

This invariant is about the meaning of the row:

- If `RecOutcomeEvent` is a summary row, `orderItemId` uniqueness is correct.
- If `RecOutcomeEvent` is an append-only event log, `orderItemId` uniqueness is wrong.

Therefore the root cause is a role ambiguity between "outcome summary" and "outcome event." D-O1 resolved idempotency by choosing summary-row semantics. The next architecture decision should preserve that choice and add event history separately if needed.

## Foundation Boundary

### Raw Commerce Event Ownership

Raw commerce events should remain in Cosmile.

Runtime evidence:

- `CommerceEvent` is described as the AX event memory ledger.
- `trackCommerceEvent` writes commerce events locally.
- `sanitizeProperties` removes sensitive keys, raw free-text keys, PII-like values, and overly large strings.
- `foundationSignalMapper` writes only selected signal types to `FoundationSignalOutbox`.

### Refined Signal To Foundation

Foundation should receive refined/whitelisted signals, not raw order/payment/customer data.

Current `foundationSignalMapper` already follows this direction:

- maps selected event types to Foundation signal types;
- keeps payload to whitelisted fields such as signal type, canonical product/brand, channel, locale, country;
- comments explicitly exclude revenue, margin, payment, contact details;
- stores an outbox row rather than directly calling Foundation.

### Boundary To Prevent Foundation Owning Raw Commerce Data

Required boundary:

- Foundation may receive `signalType`, canonical product/brand refs, channel/locale/country, and opaque refs where approved.
- Foundation should not receive raw order rows, payment IDs, raw customer IDs, line prices, margins, addresses, emails, phones, or raw checkout payloads.
- If Foundation needs traceability, it should receive a non-sensitive source pointer or trace id, not the raw commerce record.

### Raw Evidence Traceability

Traceability can be maintained through:

- `CommerceEvent.id` as the raw event source pointer;
- `FoundationSignalOutbox.sourceEventId`;
- future event log `sourceCommerceEventId`;
- sanitized aggregate counts and non-sensitive identifiers in evidence reports.

This lets Cosmile prove which raw event produced a refined signal without transferring raw commerce evidence ownership to Foundation.

## Advisor Recommendation

Recommendation:

`KEEP_REC_OUTCOME_AS_SUMMARY_AND_PLAN_EVENT_LOG`

Meaning:

- Keep current `RecOutcomeEvent` schema for Phase 2 if Phase 2 is later approved.
- Treat it as the order-item purchase outcome summary/current row.
- Do not interpret it as a lifecycle event log.
- Do not add an event log table before Phase 2 unless Leo/GPT decides refund/cancel/reorder history must be solved before any target DB work.
- Create a separate architecture mission for the future hybrid event log before implementing refund/cancel/reorder/direct attribution.

## Leo Decision Questions

1. Should `RecOutcomeEvent` officially mean "one current purchase outcome summary per order item" despite the `Event` name?
2. Is it acceptable that refund/cancel/reorder history is not preserved in `RecOutcomeEvent` yet, as long as future event history is planned separately?
3. Should Phase 2A continue to validate only the current summary-row invariant, or must event-log architecture be decided first?
4. What raw evidence pointer is acceptable for future Foundation traceability: `CommerceEvent.id`, a separate trace id, or both?
5. Should future refund/cancel/reorder history be a separate Cosmile event log table rather than additional rows in `RecOutcomeEvent`?

## Next Gate

Recommended next gate:

`LEO_DECISION_ON_REC_OUTCOME_SUMMARY_ROLE`

If Leo/GPT accepts the summary-row role, Phase 2A read-only preflight can remain focused on the current `RecOutcomeEvent.orderItemId` uniqueness invariant.

If Leo/GPT rejects the summary-row role and wants `RecOutcomeEvent` itself to be the event log, do not proceed to Phase 2A. Start a separate architecture mission before any target DB preflight/deploy.

## Prohibited Actions Confirmed

Advisor did not:

- modify `../Cosmile`;
- stage/commit/push any runtime repo;
- access any DB;
- execute preflight query;
- execute migration deploy;
- enable `COSMILE_REC_OUTCOME_ENABLED`;
- access secrets or print `DATABASE_URL`;
- start Phase 2A or Phase 2B.
