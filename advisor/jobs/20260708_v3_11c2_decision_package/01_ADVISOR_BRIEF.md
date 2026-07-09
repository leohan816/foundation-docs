# 01 Advisor Brief - V3-11C2 Decision Package Draft

## Verdict

`V3_11C2_DECISION_PACKAGE_READY_NEEDS_LEO_DECISION`

Instruction validation result: `NEEDS_LEO_DECISION`.

This package is ready for Leo/GPT decision. It is not an implementation brief and does not authorize runtime changes.

## Executive Summary

V3-11C2 can be started as a narrow behavioral outcome MVI only if Leo/GPT approves the scope and D-O1 decisions first.

Advisor recommendation:

- Start with organic checkout MVI only.
- Hook only after `mock-complete` returns `justPaid=true`.
- Write one outcome per `OrderItem`.
- Use `recommendationId = null`.
- Use `attributionMode = "organic"`.
- Use a dedicated RecOutcomeEvent ID generator, not `recommendationId()`.
- Use code-level idempotency for the first MVI, not a unique index.
- Use `COSMILE_REC_OUTCOME_ENABLED`, default OFF.
- Explicitly exclude direct/session/refund/reorder/semantic feedback/V3-11D/SIASIU/Foundation/schema migration.

Final approval remains with Leo/GPT.

## Source Inputs

- Advisor operating rules: `../foundation-docs/advisor/_system/AGENTS.md`
- Structure map: `../foundation-docs/advisor/jobs/20260708_cosmile_siasiu_code_structure_map/01_ADVISOR_BRIEF.md`
- Gate/plan: `../foundation-docs/docs/reports/control/COSMILE_MEMORY_V3_11C2_REC_OUTCOME_EVENT_GATE_PLAN_20260707.md`
- Supporting gate context: `COSMILE_MEMORY_V3_11C_EVENT_WIRING_GATE_PLAN_20260706.md`
- Supporting contract context: `COSMILE_MEMORY_V3_04_ORDER_REVENUE_FEEDBACK_OUTCOME_CONTRACT_20260706.md`

## Grounded Facts

- V3-11C2 gate/plan says this is behavior-based commerce outcome only, not semantic extraction.
- The gate/plan identifies `mock-complete` / `completeMockOrder` `justPaid=true` with `order.items` as the MVI hook.
- `CartItem` and `OrderItem` do not carry `recommendationId`; direct attribution is not currently available.
- `sessionId` is not populated; session attribution is not currently available.
- Refund/cancel is order-level admin status only; line-level refund quantity source is absent.
- Reorder/repurchase route is absent.
- `RecOutcomeEvent` schema exists from V3-11B, but no runtime emit service, feature flag, or checkout wiring exists.
- `RecOutcomeEvent.orderItemId` has an index but no unique index in the current schema.
- V3-11D remains HOLD because post-order feedback input and Foundation semantic output fields are missing.

## Decision 1 - Organic Checkout MVI Only

### Advisor Recommendation

Approve initial V3-11C2 scope as organic checkout MVI only.

Meaning:

- paid order behavior only
- order-item granularity
- no recommendation attribution
- no semantic feedback
- no refund/reorder/session/direct attribution

### Why

This matches current code reality and the gate/plan: order items exist at checkout completion, while rec_id threading, session linkage, refund line source, and reorder route do not.

### Alternatives

| Option | Tradeoff |
|---|---|
| Include direct attribution now | Requires rec_id threading through cart/order items; this is a schema/flow expansion and not current MVI. |
| Include session attribution now | Requires sessionId population and matching rules; current sessionId is a known limit. |
| Include refunds/reorders now | Requires line-level refund source or reorder route; both are absent. |
| Include semantic feedback now | Collides with V3-11D HOLD and requires Foundation semantic output contract. |

### Decision Text for Leo/GPT

`Approve V3-11C2 initial scope as organic checkout MVI only.`

## Decision 2 - Hook Point

### Advisor Recommendation

Use `mock-complete` after `completeMockOrder` returns `justPaid=true`.

Decision boundary:

- hook after paid transition, not pending order creation
- run only when `justPaid=true`
- iterate returned `order.items`

### Why

The gate/plan identifies this as MVI 1st priority because it represents purchase completion, has order items, and already dedupes repeated paid calls through `justPaid`.

### Alternatives

| Option | Tradeoff |
|---|---|
| Hook at `createPendingOrder` | Captures checkout intent before payment; weaker behavioral outcome. |
| Hook at `checkout_start` | Also pre-payment; not a paid order outcome. |
| Hook in admin status route | Admin order-level status lacks line-level refund/outcome source and can mix operational state with purchase behavior. |

### Decision Text for Leo/GPT

`Approve the V3-11C2 hook point as mock-complete after completeMockOrder returns justPaid=true.`

## Decision 3 - recommendationId

### Advisor Recommendation

Set `recommendationId = null` for the initial MVI.

### Why

Current cart/order item flow does not thread `recommendationId`. The schema explicitly allows nullable `recommendationId`, and organic/unattributed/unknown modes require null recommendation IDs.

### Alternatives

| Option | Tradeoff |
|---|---|
| Attempt to infer latest RecommendationEvent | Risks false direct attribution and depends on session/threading gaps. |
| Add recommendationId to CartItem/OrderItem now | Schema/migration scope; should be a later direct-attribution gate. |
| Use a placeholder recommendationId | Violates meaning; creates false link and weakens learning integrity. |

### Decision Text for Leo/GPT

`Approve recommendationId=null for initial V3-11C2 organic checkout outcomes.`

## Decision 4 - attributionMode

### Advisor Recommendation

Use `attributionMode = "organic"` for the initial MVI.

### Why

The current MVI is a paid order outcome without a recommendation link. The gate/plan recommends organic as the default; `unattributed` should be reserved for cases where a recommendation may exist but linking failed.

### Alternatives

| Option | Tradeoff |
|---|---|
| Use `unattributed` | More conservative if Leo/GPT wants to avoid saying "recommendation-free"; but it implies possible failed attribution. |
| Use `unknown` | Too weak for the known MVI case; loses clear organic behavioral signal. |
| Use `direct` or `session` | Not supported by current code state. |

### Decision Text for Leo/GPT

`Approve attributionMode=organic for initial V3-11C2 outcomes.`

## Decision 5 - RecOutcomeEvent ID Generator

### Advisor Recommendation

Use a dedicated RecOutcomeEvent ID generator, separate from `recommendationId()`.

Recommended shape for Leo/GPT approval:

`rec_out_v3_` + ULID(26)

Rationale:

- keeps RecOutcomeEvent IDs distinct from `rec_v3_` RecommendationEvent IDs
- uses existing ULID convention
- avoids schema/migration changes because current schema only requires `id String @id`
- keeps ID generation in one owned helper rather than callsite hand-rolling

### Alternatives

| Option | Tradeoff |
|---|---|
| Plain ULID only | Simple, but less self-describing in evidence and logs. |
| Reuse `recommendationId()` | Not recommended; it would make outcome event IDs look like recommendation IDs. |
| Use cuid/uuid default in schema | Requires schema/migration change; out of initial MVI scope. |
| Let each callsite construct IDs | Not recommended; risks split-brain formats. |

### Decision Text for Leo/GPT

`Approve a dedicated RecOutcomeEvent ID generator using rec_out_v3_ + ULID(26), or specify a different prefix before implementation.`

## Decision 6 - Idempotency

### Advisor Recommendation

Use code-level existing-check for the initial MVI.

Recommended semantics:

- one RecOutcomeEvent per `orderItemId`
- if an event already exists for `orderItemId`, skip and report observable skip
- rely on both `justPaid` and existing-check for double protection
- do not add a unique index in the initial MVI

### Why

This avoids schema/migration scope and matches the gate/plan recommendation. A unique index is stronger but requires schema migration approval.

### Alternatives

| Option | Tradeoff |
|---|---|
| Add `@@unique([orderItemId])` | Stronger DB-level guarantee, but schema/migration change and separate gate. |
| Use only `justPaid` | Insufficient against retries, partial failures, or future emit call paths. |
| Allow duplicates and dedupe later | Not acceptable for learning signal integrity. |

### Decision Text for Leo/GPT

`Approve code-level existing-check idempotency for initial V3-11C2, with unique index deferred to a later schema-approved gate.`

## Decision 7 - Feature Flag

### Advisor Recommendation

Use:

`COSMILE_REC_OUTCOME_ENABLED`

Default:

OFF unless exactly enabled by the chosen convention in implementation.

Required behavior:

- flag OFF means shadow inert and no write attempt
- flag ON is still non-prod/shadow unless separately approved
- write failures must be fail-open for checkout, but observable in result/evidence

### Why

This matches the existing V3-11C flag pattern while keeping RecOutcomeEvent separate from RecommendationEvent.

### Alternatives

| Option | Tradeoff |
|---|---|
| `COSMILE_REC_OUTCOME_EVENT_ENABLED` | More explicit, but longer and differs from gate/plan naming. |
| Reuse `COSMILE_REC_EVENT_ENABLED` | Not recommended; recommendation events and outcome events need independent rollout controls. |
| No flag | Not acceptable for shadow rollout and safety. |

### Decision Text for Leo/GPT

`Approve feature flag COSMILE_REC_OUTCOME_ENABLED with default OFF.`

## Decision 8 - Explicit Out of Scope

### Advisor Recommendation

Confirm all of the following out of scope for initial V3-11C2:

- direct attribution
- session attribution
- refund/cancel outcome
- reorder/repurchase outcome
- semantic feedback
- V3-11D implementation
- RecOutcomeFeedback
- MemoryFactCandidate / LTM promotion
- SIASIU changes
- Foundation/foundation-control changes
- schema migration
- prod/live/main/secret

### Why

Each item either lacks current runtime support, belongs to a different stage, requires a separate contract/schema decision, or violates this job's intended narrow behavioral MVI.

### Alternatives

| Option | Tradeoff |
|---|---|
| Include one excluded item now | Requires a new Advisor validation pass and likely new brief/review scope. |
| Include schema migration now | Requires explicit schema approval, migration review, DB evidence, and likely service review. |
| Include semantic feedback now | Blocked by V3-11D G-D1/G-D2. |

### Decision Text for Leo/GPT

`Confirm direct/session/refund/reorder/semantic feedback/V3-11D/SIASIU/Foundation/schema migration/prod-live-main-secret are out of scope for initial V3-11C2.`

## Recommended Leo/GPT Approval Block

Leo/GPT can approve, revise, or reject this block:

```text
V3-11C2 decision package:
1. Scope: organic checkout MVI only.
2. Hook: mock-complete after completeMockOrder returns justPaid=true.
3. recommendationId: null.
4. attributionMode: organic.
5. RecOutcomeEvent ID: dedicated generator, rec_out_v3_ + ULID(26).
6. Idempotency: code-level existing-check by orderItemId; no unique index in initial MVI.
7. Feature flag: COSMILE_REC_OUTCOME_ENABLED, default OFF.
8. Out of scope: direct/session/refund/reorder/semantic feedback/V3-11D/SIASIU/Foundation/schema migration/prod/live/main/secret.
```

## Advisor Limits

- This is not a Worker brief.
- This does not authorize implementation.
- Runtime code was not re-opened in this job; this package relies on the prior code structure map and the V3-11C2 gate/plan.
- Before any Worker brief, Advisor should re-confirm no newer Leo/GPT instruction supersedes these decisions.

## Next Recommended Action

Leo/GPT should approve or revise the recommended V3-11C2 approval block above.
