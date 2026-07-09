# V3-11A/B/C/C2 Risk & Gate Register

Date: 2026-07-09

## Verdict

`V3_11_RISK_GATE_REGISTER_READY_WITH_LIMITS`

This register consolidates the residual risks and required gates for V3-11A, V3-11B, V3-11C, and V3-11C2.

Limits:

- This is an Advisor register, not runtime approval.
- Runtime code was not modified.
- Tests were not rerun by Advisor for this register.
- V3-11C2 runtime changes remain uncommitted.
- Any runtime commit, flag-ON, live/prod exposure, schema/migration, or DB write requires a separate Leo/GPT instruction and separate Advisor routing.

## Executive Summary

V3-11A, V3-11B, V3-11C, and V3-11C2 can be treated as closed only inside their narrow shadow/non-prod scopes.

They must not be treated as production-ready.

Primary hard gates now carried forward:

1. `V3-11C2-D-O1 Unique Index / Idempotency Hardening Gate` before `COSMILE_REC_OUTCOME_ENABLED` flag-ON, live/prod exposure, or operational use of RecOutcomeEvent writes.
2. `V3-11C G-C5 sessionId populate gate` before `COSMILE_REC_EVENT_ENABLED` flag-ON, because current cart RecommendationEvent writes use `sessionId=null` while DB schema requires non-null `sessionId`.
3. `V3-11B production migration/backfill gate` before any prod DB migration, existing-data backfill, or live use.
4. `V3-11D semantic extraction contract gate` remains HOLD for any semantic feedback, RecOutcomeFeedback, MemoryFactCandidate semantic promotion, or Foundation semantic output use.
5. `V3-11 operational rollout gate` remains required before any flag-ON/live/prod/main exposure.

## Stage Register

| Stage | Status | What is closed | What is not closed | Required next gate |
|---|---|---|---|---|
| V3-11A Core Logic | `CLOSED_WITH_LIMITS` | Provider-independent TS core logic, ID/ref generators, attribution helpers, adverse/safety helpers, memoryCandidate gates, pure tests | DB persistence, emit wiring, semantic extraction logic, LTM full promotion pipeline, runtime ranking enforcement, prod env execution, secret rotation/backfill | DB/event/semantic/runtime gates carried by V3-11B/C/D/E |
| V3-11B DB Integration | `CLOSED_WITH_LIMITS` | Non-prod ephemeral Postgres schema/migration rehearsal, additive models/columns, raw SQL CHECKs, partial unique, rollback rehearsal, DB tests | Prod DB migration, existing-data backfill, live emit, real secret rotation, MemoryFactCandidate secretVersion, full INV-DB-3, G13/COSMILE-4, performance/live evidence | Production migration/backfill gate; full event/safety invariant gate; D-O1 for RecOutcomeEvent idempotency |
| V3-11C RecommendationEvent Wiring | `CLOSED_WITH_LIMITS` | Default-OFF shadow `trackRecommendationEvent`, add-to-cart server wiring, fail-open behavior, provider-independent tests, existing commerce emit preserved | Flag-ON blocked by `sessionId=null`, view/click bridge, direct rec_id threading, positive reason_codes, session attribution, live emit | `G-C5 sessionId populate` before flag-ON; rec_id/reason/view-click gates before richer attribution |
| V3-11C2 RecOutcomeEvent Organic Outcome | `PASS_WITH_RISK` / closure `APPROVE_WITH_RISK` | Default-OFF shadow organic checkout MVI loop closed: Worker implementation, Sentinel `PASS_WITH_RISK`, Leo/GPT service `ACCEPT_WITH_LIMITS`, Advisor final audit | D-O1 unique index, live DB insert proof, runtime flag-ON proof, direct/session/refund/reorder/group-buy outcomes, guest+login stitching, env-default flag test gap | `V3-11C2-D-O1 Unique Index / Idempotency Hardening Gate` before flag-ON/live/operational use |

## V3-11A Core Logic

### Status

`CLOSED_WITH_LIMITS`

### What is closed

V3-11A closed the provider-independent core logic layer in Cosmile shadow scope:

- `rec_v3_` recommendation ID generation.
- `subj_v2_` / `anon_v3_` identity/ref generator logic.
- Last-touch attribution helper.
- Adverse/safety helper logic.
- MemoryFactCandidate generation and promotion gate helpers.
- Canonical TS event/feedback types.
- Provider-independent tests: report-backed `43/43` after patch batch.
- Existing regression tests reported intact.

### What is not closed

- DB persistence and query behavior.
- Prisma model/migration execution.
- Event emit wiring.
- RecommendationEvent live emission.
- RecOutcomeEvent live emission.
- Semantic extraction logic.
- RecOutcomeFeedback semantic write path.
- Long-term memory promotion pipeline.
- Runtime ranking enforcement.
- Real prod env fail-closed execution.
- Real secret rotation or secret version operational flow.
- Production/live/main exposure.

### Residual risks

- Core helpers can be correct while remaining unused or partially wired.
- Runtime ranking constants may remain declaration-only until ranking wiring.
- Safety/matrix helpers need later runtime gate integration.
- Secret rotation/version readiness is not operationally proven.

### Required gates

- V3-11B DB integration for persistence mapping.
- V3-11C event wiring for RecommendationEvent emission.
- V3-11C2 outcome wiring for RecOutcomeEvent behavior.
- V3-11D semantic extraction contract before semantic feedback or memory semantic promotion.
- Production rollout gate before live use.

## V3-11B DB Integration

### Status

`CLOSED_WITH_LIMITS`

### What is closed

V3-11B closed non-prod DB integration for the V3-11 schema layer:

- New models: `RecommendationEvent`, `RecOutcomeEvent`, `RecOutcomeFeedback`.
- Additive LongTermMemoryFact columns.
- `secretVersion` readiness columns where scoped.
- Raw SQL CHECKs for event type, semantic labels, adverse values, attribution modes, identity XOR, R-K2, and lifecycle/status values.
- Partial unique/index behavior for DB-subset invariants.
- Ephemeral Postgres DB-touch tests: report-backed `36/36`.
- Rollback rehearsal: report-backed pass.
- Provider-independent V3-11A tests reported intact.

### What is not closed

- Production DB migration.
- Existing-data backfill.
- Prod migration deploy pipeline.
- Live event writes.
- Real secret/Vault integration or rotation.
- MemoryFactCandidate secretVersion.
- Full INV-DB-3, because the event/safety wiring side was not yet available.
- G13/COSMILE-4.
- Runtime performance/concurrency evidence.
- Main merge/live exposure.

### Residual risks

- Non-prod ephemeral success does not prove prod migration safety.
- Existing approved rows may require backfill policy before prod migration.
- Full INV-DB-3 requires event/safety wiring context not proven at V3-11B.
- RecOutcomeEvent lacks the D-O1 unique index/hard idempotency now required before C2 flag-ON/live.

### Required gates

- Production migration/backfill readiness gate before prod DB use.
- Full event/safety invariant gate before claiming INV-DB-3 complete.
- D-O1 unique index/idempotency hardening gate for RecOutcomeEvent before any C2 flag-ON/live.
- Secret/version/rotation operational gate before real secret rotation claims.

## V3-11C RecommendationEvent Wiring

### Status

`CLOSED_WITH_LIMITS`

### What is closed

V3-11C closed a narrow default-OFF shadow RecommendationEvent wiring loop:

- New `trackRecommendationEvent` service.
- Add-to-cart server route wiring beside existing `trackCommerceEvent`.
- Feature flag `COSMILE_REC_EVENT_ENABLED`, default OFF.
- Fail-open observable behavior.
- Subject/anonymous XOR minting through V3-11A IDs.
- Safety/do-not reason code filtering.
- Existing commerce flow preserved.
- Provider-independent tests: report-backed `10/10`.
- DB-touch/regression totals reported in evidence.

### What is not closed

- Flag-ON readiness.
- `sessionId` population.
- Live RecommendationEvent writes.
- View/click bridge to `RecommendationEvent`.
- Wishlist/saved recommendation event wiring.
- `rec_id` threading from recommendation UI to cart/order.
- Direct attribution.
- Session attribution.
- Positive `reason_codes` such as concern/ingredient match.
- Production/live/main exposure.

### Residual risks

- Current cart wiring uses `sessionId=null`.
- `RecommendationEvent.sessionId` is non-null in schema.
- If `COSMILE_REC_EVENT_ENABLED` is turned ON before G-C5, writes can fail as `write_failed`; checkout/cart remains fail-open but analytics/memory data will be missing.
- Reason code coverage is partial.
- Direct attribution quality remains low without rec_id threading.

### Required gates

- `G-C5 sessionId populate gate` before `COSMILE_REC_EVENT_ENABLED` flag-ON or live RecommendationEvent writes.
- Rec_id threading gate before direct attribution claims.
- View/click bridge gate before claiming shown/clicked RecommendationEvent coverage.
- Positive reason_codes source gate before concern/ingredient-match reason analytics.
- Live emit/production rollout gate before operational use.

## V3-11C2 Organic RecOutcomeEvent Outcome

### Status

`PASS_WITH_RISK`

Closure record status: `APPROVE_WITH_RISK` for default-OFF shadow implementation closure only.

### What is closed

V3-11C2 closed the default-OFF shadow Organic RecOutcomeEvent MVI loop:

- Organic checkout MVI only.
- Hook after `completeMockOrder` returns `justPaid=true` in `mock-complete`.
- One organic `RecOutcomeEvent` per `OrderItem`.
- `recommendationId=null`.
- `attributionMode=organic`.
- Dedicated `rec_out_v3_` + ULID(26) ID generator.
- Code-level existing-check by `orderItemId`.
- Feature flag `COSMILE_REC_OUTCOME_ENABLED`, default OFF.
- Fail-open checkout behavior.
- Worker result accepted.
- Sentinel `PASS_WITH_RISK` accepted.
- Leo/GPT direct Service Review `ACCEPT_WITH_LIMITS` accepted.
- Advisor final audit `PASS_WITH_RISK` accepted.

### What is not closed

- D-O1 unique index / hard idempotency.
- Runtime flag-ON behavior.
- Live DB insert proof.
- Production/live/main rollout.
- Direct attribution.
- Session attribution.
- Refund/cancel/reorder outcome.
- Group-buy paid path outcome coverage.
- guest+login stitching policy.
- env-default feature flag branch direct test without DI.
- V3-11D semantic feedback or RecOutcomeFeedback.

### Residual risks

- Code-level existing-check by `orderItemId` is not race-safe under concurrent writes.
- `COSMILE_REC_OUTCOME_ENABLED` must remain OFF until D-O1 is complete.
- guest+login strict-XOR orders record no outcome under approved MVI behavior.
- group-buy paid path is not covered.
- Organic outcome must not be interpreted as recommendation performance.
- Runtime code remains uncommitted and needs separate runtime commit routing if Leo/GPT wants to publish the shadow implementation.

### Required gate

`V3-11C2-D-O1 Unique Index / Idempotency Hardening Gate`

This gate must be completed before:

- `COSMILE_REC_OUTCOME_ENABLED` flag ON
- live/prod exposure
- production rollout
- any operational use of RecOutcomeEvent writes

Expected gate scope:

- Decide and implement the hard idempotency constraint for `RecOutcomeEvent.orderItemId`.
- Add schema/migration only under a separately approved Worker brief.
- Run DB/schema review and Sentinel review.
- Reassess flag-ON readiness after migration/test evidence exists.

## Unified Gate Register

| Gate ID | Applies to | Required before | Current status | Notes |
|---|---|---|---|---|
| `G-C5 sessionId populate` | V3-11C | `COSMILE_REC_EVENT_ENABLED` flag-ON, live RecommendationEvent writes | `OPEN` | Current cart wiring uses `sessionId=null`; schema requires non-null. |
| `D-O1 Unique Index / Idempotency Hardening` | V3-11C2 / V3-11B schema | `COSMILE_REC_OUTCOME_ENABLED` flag-ON, live/prod RecOutcomeEvent writes | `OPEN` | Hard gate. Current code-level existing-check is not race-safe. |
| `Prod DB migration/backfill gate` | V3-11B | Any prod DB migration or operational DB use | `OPEN` | Non-prod ephemeral evidence only. |
| `Full INV-DB-3 event/safety invariant gate` | V3-11B/C/D | Claiming full safety-priority invariant | `OPEN` | V3-11B only covered DB-subset. |
| `Rec_id threading gate` | V3-11C/C2 | Direct attribution claims | `OPEN` | Cart/OrderItem recommendationId threading remains absent. |
| `View/click bridge gate` | V3-11C | Claiming shown/clicked RecommendationEvent coverage | `OPEN` | Canonical layer exists but not persisted to RecommendationEvent. |
| `Positive reason_codes source gate` | V3-11C | Concern/ingredient-match reason analytics | `OPEN` | Current reason coverage is safety/do-not oriented. |
| `Group-buy outcome gate` | V3-11C2 | Claiming group-buy paid outcome coverage | `OPEN` | Accepted out of C2 MVI scope. |
| `Guest+login stitching policy gate` | V3-11C2 / identity | Claiming guest+login outcome continuity | `OPEN` | Strict-XOR no-record is accepted in MVI but not solved. |
| `V3-11D semantic output/input contract gate` | V3-11D and any semantic feedback | RecOutcomeFeedback, semantic labels, MemoryFactCandidate semantic promotion | `HOLD` | Requires feedback input source and Foundation semantic output contract. |
| `Operational rollout gate` | All V3-11 | main/live/prod/flag-ON | `OPEN` | Must verify all relevant lower gates first. |

## Hard Restrictions Across V3-11

- Do not enable `COSMILE_REC_EVENT_ENABLED` before G-C5 sessionId work is complete.
- Do not enable `COSMILE_REC_OUTCOME_ENABLED` before D-O1 unique index/idempotency hardening is complete.
- Do not expose V3-11 writes to live/prod.
- Do not merge to main without a separate Leo/GPT-approved release path.
- Do not access DB/prod/live/main/secret in Advisor audit tasks.
- Do not claim concurrency risk is solved.
- Do not claim group-buy outcome coverage.
- Do not claim guest+login stitching is solved.
- Do not claim semantic feedback/V3-11D readiness.

## Recommended Next Required Mission

`V3-11C2-D-O1 Unique Index / Idempotency Hardening Gate`

Reason:

- It is the hard blocker now explicitly required before RecOutcomeEvent flag-ON/live/operational use.
- It converts the accepted V3-11C2 race risk into a schema-backed idempotency guarantee.
- It must be handled as a separate schema/migration risk gate, not inside the closed V3-11C2 shadow implementation loop.

Follow-ups after D-O1:

- V3-11C G-C5 sessionId populate for RecommendationEvent flag-ON readiness.
- Runtime commit routing for default-OFF V3-11C2 shadow implementation if Leo/GPT wants the uncommitted Worker diff published before D-O1.
- V3-11D semantic extraction decision package if semantic feedback is to resume.

## Source Notes

Key document-backed sources:

- V3-11A: `COSMILE_MEMORY_V3_11_IMPLEMENTATION_EVIDENCE_20260706.md`
- V3-11B: `COSMILE_MEMORY_V3_11B_DB_INTEGRATION_EVIDENCE_20260706.md`
- V3-11C: `COSMILE_MEMORY_V3_11C_EVENT_WIRING_EVIDENCE_20260706.md`
- V3-11C2: `05_FINAL_AUDIT.md` and `14_CLOSURE_RECORD.md`
- Cross-state audit: `20260708_cross_repo_v1_to_v3_current_state_audit/01_ADVISOR_BRIEF.md`

Runtime source remains authoritative if later code inspection conflicts with these reports.
