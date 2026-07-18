# Independent Reviewer Handoff — WU-C Inventory Implementation

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
REVIEW_SUBJECT: WU-C inventory reservation and oversell guard
ACTOR: foundation-reviewer-fable5
ROLE: Independent Foundation Reviewer
REQUIRED_MODEL: Fable 5
REQUIRED_EFFORT: max
REQUIRED_SKILL: /fable-sentinel
MODE: READ_ONLY_INDEPENDENT_IMPLEMENTATION_REVIEW
RETURN_TO: foundation-advisor
```

## Exact review subject

```text
PRODUCT_REPOSITORY: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
PRODUCT_BRANCH: implementation/cosmile-o1-korea-golden-commerce-v1-20260717
BASE_HEAD: e1dc39e6e0179c095e47695594b6ea3fec57d006
CANDIDATE_HEAD: 84370e8624c6e908da183a84b38551a6a9441527
CANDIDATE_PARENT_REQUIRED: e1dc39e6e0179c095e47695594b6ea3fec57d006
CANDIDATE_PUSHED: NO
EXPECTED_WORKTREE_STATE: CLEAN
EXPECTED_UPSTREAM: origin/implementation/cosmile-o1-korea-golden-commerce-v1-20260717
EXPECTED_UPSTREAM_HEAD: e1dc39e6e0179c095e47695594b6ea3fec57d006
EXPECTED_AHEAD_BEHIND: 1_0

IMPLEMENTATION_HANDOFF_COMMIT: e72b5c379a5ea8c6d3f759f23141837abb60eeda
IMPLEMENTATION_EVIDENCE_COMMIT: a38bcb773c2dab8a690ce49593ead16586cf4eb7
IMPLEMENTATION_RESULT: runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/40_COSMILE_WUC_INVENTORY_RESULT.md
IMPLEMENTATION_POINTER: runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/40_COSMILE_WUC_INVENTORY_POINTER.md

REVIEWED_DESIGN_COMMIT: a1ac8016eba01d1ffef20836fe7f16ace3b591c5
INDEPENDENT_DESIGN_REVIEW_COMMIT: daacd8a69318315437cc33e124455baf6db93e91
INDEPENDENT_DESIGN_REVIEW_VERDICT: PASS
WU0_SCHEMA_HEAD: c559e7cd132e7b837dc38d01395f790499abb70d
```

Before review, live-verify the exact independent session/model/effort/skill/workspace and all Git pins.
Read current Agent Office operating/Reviewer role documents, repository rules, the implementation handoff,
the complete Worker evidence, the reviewed design, and `app/docs/testing/TEST_MEANING_POLICY.md`. The
Reviewer is separate from the Worker and Advisor, must not patch/stage/commit/push/dispatch, and must not
accept risk or authorize a later WorkUnit.

## Exact diff boundary

The candidate must be a single child of the reviewed WU-A base and contain exactly these five new paths:

- `app/src/lib/inventory/contracts.ts`
- `app/src/lib/inventory/service.ts`
- `app/src/lib/inventory/repository.ts`
- `app/scripts/o1_inventory_contract.vitest.ts`
- `app/scripts/o1_inventory_concurrency.dbtest.py`

Reject any existing-file modification, schema/migration/dependency/lockfile/Prisma artifact change, route,
checkout, cart, payment, order, refund, UI, console, job, timer, provider, Foundation, or runtime wiring.

## Required independent review

Do not trust the Worker summary. Directly inspect and attempt to falsify at minimum:

1. **Closed contract and bounds** — positive quantity, bounded future TTL, bounded identifiers, closed result
   unions, missing/invalid/unknown/repository-error behavior, and zero writes on every rejection.
2. **Idempotency and conflict** — same active `{orderId, skuId, quantity}` is a no-op truth return; conflicting
   quantity/state fails closed; unique/backstop behavior cannot create a duplicate active reservation.
3. **Atomic availability** — the concrete repository acquires a per-SKU PostgreSQL row lock before reading
   `CommerceSku.stock`, aggregating `reserved|committed`, and inserting; the operation is one transaction and
   all value SQL is parameterized.
4. **Mirror parity** — compare the TypeScript repository algorithm and the dbtest `reserve_atomic` mirror.
   Identify any semantic gap that could make the database rehearsal prove a different algorithm.
5. **Race oracle** — last-item contention has exactly one winner and fail-closed losers, with no duplicate and
   `SUM(reserved|committed) <= stock`; multi-quantity, rollback, replay, and aggregate invariants are real
   bidirectional assertions rather than self-confirming counts.
6. **Transition truth** — commit requires explicit `verified_capture`; release/expiry require explicit
   `conclusively_non_captured`; expiry also requires elapsed TTL; unknown/confirming proof never releases or
   expires; repeated same transition is a no-op; missing/backward/incompatible/unknown state fails closed.
7. **Restoration boundary** — the API is HOLD-only with zero stock mutation, even when an operator/policy
   reference is supplied; no automatic refund/return/cancellation restoration exists; the later schema/operator
   dependency is explicit and not implemented.
8. **Error and evidence containment** — no SQL, identifiers, payloads, PII, credentials, secrets, or raw rows
   escape closed categories/tests/artifacts; no unsafe raw SQL construction exists.
9. **No activation** — no caller imports/wires the new repository; checkout/payment/order/route/runtime remain
   unconnected; no transport/network/provider/credential path exists.
10. **Test meaning and cleanup** — direct tests fail under meaningful mutation of the guarded behavior; the
    disposable PostgreSQL test uses an already-local image only, synthetic rows, tmpfs, no host port, no real
    service/environment, and proves shutdown/removal/absence without altering unrelated Docker resources.

## Authorized review commands

Read-only Git/source inspection is allowed. You may rerun the pure focused suite and full safe Vitest suite
using the already-present original-worktree dependencies through a temporary symlink that is removed and
whose cleanup is proven. You may rerun the WU-C concurrency test and WU-0 migration regression only after
independently verifying their commands and containment: already-local image, disposable uniquely named
container, tmpfs, no published port, synthetic-only, no inherited real DB/endpoint/credential, no image pull,
and exact cleanup evidence. Do not install dependencies, generate Prisma artifacts, run a build, contact a
provider, or access any real/shared/staging/protected/production/live DB.

Capture exact pre/post product Git status. Unexpected tracked mutation, uncertain untracked attribution,
cleanup failure, unsafe runtime requirement, or baseline mismatch is blocking and must be returned without
repair.

## Verdict and outputs

Allowed verdicts:

```text
PASS
PASS_WITH_CORRECTIONS
HOLD
FAIL
```

`PASS_WITH_CORRECTIONS` must name bounded finding IDs, severity, exact path/behavior, violated invariant,
required correction, and proof needed. Do not patch. A correction returns through the Advisor to the same
Cosmile Worker; any delta re-review returns to this same Reviewer. A finding requiring another product path,
schema change, runtime wiring, new policy, or scope expansion is a blocker, not an inferred authorization.

Write only these foundation-docs artifacts for Advisor publication:

- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/41_COSMILE_WUC_IMPLEMENTATION_REVIEW.md`
- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/41_COSMILE_WUC_IMPLEMENTATION_REVIEW_POINTER.md`

The result must bind the verdict to candidate `84370e8624c6e908da183a84b38551a6a9441527`, list exact
commands/results, findings and residual risks, cleanup and Git containment, and confirm product writes/pushes
by the Reviewer are zero. Return to `foundation-advisor` and STOP. Do not start WU-B/D/E/F/G.
