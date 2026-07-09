# 02 Worker Brief - V3-11C2 Organic RecOutcomeEvent MVI

## Required Skill

Required skill: `fable-builder`

## Role

You are the Worker for this implementation batch.

You are not the Advisor, not the Sentinel Reviewer, not the Service Reviewer, and not the final approver.

## Exact Task

Implement V3-11C2 Organic RecOutcomeEvent MVI in Cosmile.

When mock checkout completes an order and `completeMockOrder` returns `justPaid=true`, emit one organic `RecOutcomeEvent` per `OrderItem`, behind a default-OFF feature flag.

Approved behavior:

- scope: organic checkout MVI only
- hook: `mock-complete` after `completeMockOrder` returns `justPaid=true`
- per line: one event per `OrderItem`
- `recommendationId`: `null`
- `attributionMode`: `"organic"`
- ID format: `rec_out_v3_` + ULID(26)
- idempotency: code-level existing-check by `orderItemId`
- feature flag: `COSMILE_REC_OUTCOME_ENABLED`, default OFF
- failure mode: fail-open for checkout; observable result

## Repo and Branch Target

Repo: `../Cosmile`

App root: `../Cosmile/app`

Target branch: the current approved shadow branch. Advisor observed `shadow/m4-cosmile-memory`, but you must verify before editing.

Before any change:

```bash
cd ../Cosmile
git branch --show-current
git status --short
```

STOP if the branch is `main`, a prod/live branch, or any branch not explicitly approved by Leo/GPT.

## Required Context to Read First

- This brief: `../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/02_WORKER_BRIEF.md`
- Decision package: `../foundation-docs/advisor/jobs/20260708_v3_11c2_decision_package/01_ADVISOR_BRIEF.md`
- Structure map: `../foundation-docs/advisor/jobs/20260708_cosmile_siasiu_code_structure_map/01_ADVISOR_BRIEF.md`
- Gate/plan: `../foundation-docs/docs/reports/control/COSMILE_MEMORY_V3_11C2_REC_OUTCOME_EVENT_GATE_PLAN_20260707.md`
- Cosmile app rules: `../Cosmile/app/CLAUDE.md`

## Allowed Files

You may modify only these Cosmile files:

- `../Cosmile/app/src/lib/ids.ts`
- `../Cosmile/app/src/lib/recOutcomeEventService.ts` (new)
- `../Cosmile/app/src/app/api/checkout/mock-complete/route.ts`
- `../Cosmile/app/scripts/v3_11c2_rec_outcome.vitest.ts` (new)
- `../Cosmile/app/scripts/v3_11c2_rec_outcome.dbtest.py` (optional, only if you add a non-prod DB-shape test)

If implementation requires any file outside this list, STOP and report the needed file and reason.

## Forbidden Files and Areas

Do not modify:

- `../Cosmile/app/prisma/schema.prisma`
- `../Cosmile/app/prisma/migrations/**`
- `../Cosmile/app/src/lib/checkout.ts`
- `../Cosmile/app/src/types/recOutcome.ts`
- `../Cosmile/app/src/lib/memoryCandidate.ts`
- `../Cosmile/app/src/lib/adverse.ts`
- `../Cosmile/app/src/adapters/**`
- `../Cosmile/app/src/lib/foundation/**`
- `../SIASIU/**`
- `../foundation-control/**`
- `../skill/**`
- `../foundation-advisor/**`
- prod/live/main/secret/env files

Do not create, change, or run schema migrations.

## Implementation Requirements

### 1. IDs

Add a dedicated RecOutcomeEvent ID generator in `src/lib/ids.ts`:

- function name should clearly indicate RecOutcomeEvent, for example `recOutcomeEventId()`
- format: `rec_out_v3_` + ULID(26)
- add a regex constant for tests, for example `REC_OUTCOME_ID_RE`
- do not reuse `recommendationId()`
- do not hand-roll IDs at callsites

### 2. Service

Create `src/lib/recOutcomeEventService.ts`.

It should follow the V3-11C `recommendationEventService.ts` pattern:

- feature flag constant: `COSMILE_REC_OUTCOME_ENABLED`
- default OFF
- lazy import Prisma only in the default write path
- dependency injection for tests
- fail-open: never throw to checkout caller
- observable result object for written/skipped/error

Required service behavior:

- flag OFF -> no write, return skipped `flag_off`
- flag ON + valid owner/order item -> write organic `RecOutcomeEvent`
- one event per order item
- code-level existing-check by `orderItemId`; if found, skip as duplicate
- userId -> `subjectRef`
- guestId -> `anonymousRef`
- exactly one of `subjectRef` / `anonymousRef`
- neither/both -> observable `xor_violation`, no write
- `recommendationId = null`
- `attributionMode = "organic"`
- `orderId`, `orderItemId`, `productId`, `skuId` from the paid order item
- no refund fields for initial MVI
- no raw text, no PII, no full order/customer/payment/secret values in logs or evidence

Recommended shape:

- single-line function for one order item, and/or
- order-level helper that loops `order.items` and returns per-item results

Keep names clear enough for tests and reviewers to inspect.

### 3. Checkout Hook

Update `src/app/api/checkout/mock-complete/route.ts`.

When `justPaid` is true:

- keep existing `purchase_complete` CommerceEvent behavior intact
- after or beside the existing purchase event, call the RecOutcomeEvent service
- pass the current shopper identity and returned `order.items`
- do not block checkout response if RecOutcomeEvent write fails
- do not change response shape unless needed for internal observable debug in non-prod; prefer not changing public response

When `justPaid` is false:

- do not emit RecOutcomeEvent

### 4. Idempotency

Use code-level existing-check by `orderItemId`.

Approved semantics:

- if any RecOutcomeEvent exists for the `orderItemId`, skip
- do not add a unique index
- do not change schema
- `justPaid` dedupe and existing-check should both protect against duplicate writes

### 5. Out of Scope

Do not implement:

- direct attribution
- session attribution
- refund/cancel outcome
- reorder/repurchase outcome
- semantic feedback
- V3-11D
- RecOutcomeFeedback
- MemoryFactCandidate / LTM promotion
- SIASIU changes
- Foundation/foundation-control changes
- schema migration
- prod/live/main/secret

## Tests Required

At minimum, add provider-independent Vitest coverage in:

`../Cosmile/app/scripts/v3_11c2_rec_outcome.vitest.ts`

Required cases:

1. `recOutcomeEventId()` format is `rec_out_v3_` + ULID(26).
2. flag OFF -> no create/find write path, skipped `flag_off`.
3. flag ON + userId -> one organic event with `subjectRef`, `anonymousRef=null`, `recommendationId=null`, `attributionMode="organic"`.
4. flag ON + guestId -> one organic event with `anonymousRef`, `subjectRef=null`.
5. both userId and guestId -> `xor_violation`, no create.
6. neither userId nor guestId -> `xor_violation`, no create.
7. existing event for `orderItemId` -> skip duplicate, no create.
8. create failure -> fail-open result such as `write_failed`, no throw.
9. order helper with two order items -> two write attempts when both are new.
10. route hook behavior is covered either directly or through an order-level service helper: no call when `justPaid=false`; call only for paid order items when `justPaid=true`.

Run:

```bash
cd ../Cosmile/app
npx vitest run scripts/v3_11c2_rec_outcome.vitest.ts
npx vitest run scripts/v3_11c_rec_event.vitest.ts
npm run lint
```

If lint is too broad and fails due unrelated pre-existing files, report exact unrelated failures and still provide the targeted test result.

Optional non-prod DB test:

- Add `scripts/v3_11c2_rec_outcome.dbtest.py` only if a local non-prod DB is already configured and safe.
- It must prove organic/null recommendationId insert shape and duplicate existing-check behavior if practical.
- Do not connect to prod/live DB.
- Do not print raw IDs, secrets, PII, or full order/customer/payment values.

## Completion Criteria

Implementation is complete only if:

- Feature flag default OFF means no write attempt.
- Flag ON writes organic RecOutcomeEvent shape in tests.
- Existing purchase_complete CommerceEvent remains intact.
- Checkout response is not blocked by RecOutcomeEvent write failure.
- Idempotency by `orderItemId` is enforced in code.
- No schema/migration changes are made.
- No SIASIU/foundation-control changes are made.
- No direct/session/refund/reorder/semantic feedback behavior is added.
- Required tests pass or failures are clearly reported with cause.

## Expected Evidence Report Format

In your final Worker report, include:

1. Branch name and commit hash if committed; if not committed, state not committed.
2. Files changed.
3. Summary of behavior implemented.
4. Feature flag behavior, including default OFF.
5. Idempotency behavior.
6. Fail-open behavior.
7. Test commands run and results.
8. Explicit confirmation that schema/migrations were not modified.
9. Explicit confirmation that SIASIU/foundation-control were not modified.
10. Explicit confirmation that direct/session/refund/reorder/semantic feedback/V3-11D were not implemented.
11. Any residual risks or skipped tests.

Do not include raw secrets, full customer/order/payment IDs, raw PII, or prod/live details in evidence.

## STOP Conditions

STOP and report if:

- Current branch is `main` or a prod/live branch.
- You need to modify a file outside the allowed list.
- You need schema or migration changes.
- You need DB/prod/live/main/secret access.
- You need to implement direct/session/refund/reorder/semantic feedback.
- You need SIASIU or foundation-control changes.
- Existing `purchase_complete` behavior cannot be preserved.
- Existing tests must be weakened or deleted.
- The code no longer returns `order.items` from `completeMockOrder`.
- You encounter unresolved user changes in the allowed files that affect this task.

## Links

- Advisor decision package: `../foundation-docs/advisor/jobs/20260708_v3_11c2_decision_package/01_ADVISOR_BRIEF.md`
- Advisor structure map: `../foundation-docs/advisor/jobs/20260708_cosmile_siasiu_code_structure_map/01_ADVISOR_BRIEF.md`
- Gate/plan: `../foundation-docs/docs/reports/control/COSMILE_MEMORY_V3_11C2_REC_OUTCOME_EVENT_GATE_PLAN_20260707.md`
