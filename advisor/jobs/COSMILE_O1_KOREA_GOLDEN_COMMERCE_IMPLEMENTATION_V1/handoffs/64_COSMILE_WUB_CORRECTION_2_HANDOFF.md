# COSMILE WU-B Correction Cycle 2 — Complete Order Reservation Boundary

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
WORKUNIT: WU-B-CORRECTION-2
FROM: foundation-advisor
TO: cosmile
MODE: BOUNDED_IMPLEMENTATION_CORRECTION
REQUIRED_SKILL: /fable-builder
REQUIRED_MODEL: Opus 4.8 (1M)
REQUIRED_EFFORT: max
WORKSPACE: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
BRANCH: implementation/cosmile-o1-korea-golden-commerce-v1-20260717
EXPECTED_HEAD: e1cfc4ad8a99c0365c0d8f72b0ed2a3f8a6c5515
EXPECTED_UPSTREAM_HEAD: e1cfc4ad8a99c0365c0d8f72b0ed2a3f8a6c5515
EXPECTED_AHEAD_BEHIND: 0_0
EXPECTED_WORKTREE_STATE: CLEAN

PRIOR_DELTA_REVIEW: runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/63_COSMILE_WUB_DELTA_REVIEW_1.md
PRIOR_DELTA_REVIEW_COMMIT: 86ce2fb85d6c5fa5920093f0e846e460e4364642
PRIOR_VERDICT: PASS
ADVISOR_FINAL_AUDIT_FINDING: WUB-AF4
PUSH_STATUS: WITHHOLD_CORRECTION_HEAD_PENDING_SAME_REVIEWER_PASS
```

Live-verify the exact Worker/session/model/effort/skill/CWD, current Agent Office Worker role, branch, HEAD, upstream equality, and clean state before editing. Preserve reviewed history. Add one bounded correction commit; do not amend, rebase, squash, force-push, or push. Do not start WU-E/F/G.

## Finding WUB-AF4 — complete reservation set before any payment effect

The reviewed design and Founder scope require the approved availability boundary to be secured before money moves. The current WU-B repository checks only whether **one** live `InventoryReservation` exists for the order (`LIMIT 1`) in `activeReservationFor`, `createActionableIntent`, and `claimIntentForConfirm`. For a multi-line order, one reserved line can therefore admit a provider confirm while another line is missing, expired, under-quantity, null-SKU, or otherwise uncovered.

This is a load-bearing payment/inventory integration defect, not a new feature. Correct only this boundary.

### Required semantics

Before `createActionableIntent` can succeed and again inside the final atomic `claimIntentForConfirm` immediately before any Toss request is allowed:

1. The order must exist and contain at least one `OrderItem`.
2. Every order line must have a non-null `skuId`.
3. Aggregate required quantity by `(orderId, skuId)` from `OrderItem`.
4. For every required SKU, the same order must have live `reserved` inventory with `expiresAt > now()` whose aggregate quantity exactly covers the aggregate order quantity.
5. Missing, expired, released, under-quantity, over-quantity, null-SKU, or partial coverage fails closed as `reservation_required`; zero provider call and zero intent-state advance.
6. A `committed` reservation must not authorize a fresh or authorizing payment effect. Captured replay behavior from WUB-AF1 remains zero-provider-call and unchanged.
7. Extra reservations not tied to any order line must not compensate for an uncovered required line. Choose the narrowest deterministic treatment for extras and prove it; do not broaden into cleanup or stock restoration.
8. The completeness decision must execute in the same per-order transaction/lock as the existing create/claim state transition, using parameterized SQL only. No client/browser assertion may establish completeness.
9. Preserve the existing server-authoritative orderNo/amount/KRW binding, paymentKey claim, one-active-intent rule, deterministic provider idempotency, webhook verification, refund behavior, reconciliation behavior, and all prior reviewed results.

`activeReservationFor` is only a preflight/diagnostic port and must apply the same complete-set meaning; the transactional create/claim checks remain the authoritative gates.

## Exact allowed product paths

```text
app/src/lib/payment/contracts.ts
app/src/lib/payment/repository.ts
app/scripts/o1_payment_contract.vitest.ts
app/scripts/o1_payment_repository.dbtest.py
```

No other product path may change. In particular: no schema, migration, generated client, inventory implementation, payment service/adapter/webhook, route, checkout, order-lifecycle, package, runtime, credential, provider, Foundation, SIASIU, or control change.

## Required tests

Strengthen only the above test files. Prove at minimum:

- one-line exact live reservation admits create and claim;
- two-line exact live reservations admit create and claim;
- only one of two lines reserved rejects;
- one line expired rejects;
- under-quantity rejects;
- over-quantity rejects (exact coverage rule);
- null-SKU order line rejects;
- an unrelated/extra reserved SKU cannot cover a missing required SKU;
- committed/released/expired states cannot authorize a fresh payment effect;
- the authoritative claim-time recheck catches coverage lost after intent creation and makes zero provider call;
- aggregate duplicate order lines for the same SKU require the aggregate quantity;
- idempotent exact replay and captured zero-provider-call behavior remain unchanged;
- real disposable-PostgreSQL parity tests cover the same positive/negative matrix and no schema is modified.

Re-run:

```text
cd app
npx vitest run scripts/o1_payment_contract.vitest.ts
npx vitest run
python3 scripts/o1_payment_repository.dbtest.py
python3 scripts/o1_inventory_concurrency.dbtest.py
python3 scripts/o1_golden_commerce_migration.dbtest.py
```

Use only already-present dependencies and the proven disposable synthetic PostgreSQL pattern. No install, image pull, real/shared DB, external provider/network, credential, PII, or real transaction. Record exact pre/post Git state and cleanup evidence. Typecheck/build remains honestly unverified if the existing generated-client blocker still applies.

## Result and pointer

Write only:

```text
runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/64_COSMILE_WUB_CORRECTION_2_RESULT.md
runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/64_COSMILE_WUB_CORRECTION_2_POINTER.md
```

The result must include exact parent/new head, exact diff paths/stat, finding disposition, full test commands/counts, disposable cleanup, upstream/push status, residual unknowns, and zero excluded authority. Return to foundation-advisor and STOP. Do not dispatch the Reviewer or start another WorkUnit.

```text
RETURN_TO: foundation-advisor
NEXT_WORKUNIT_AUTO_START: NO
STOP
```
