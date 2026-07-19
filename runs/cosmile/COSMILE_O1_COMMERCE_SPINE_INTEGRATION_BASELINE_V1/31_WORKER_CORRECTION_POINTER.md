# Cosmile Worker — Correction Pointer

```text
WORKER_RESULT_POINTER
MISSION_ID: COSMILE_O1_COMMERCE_SPINE_INTEGRATION_BASELINE_V1
ACTOR: Cosmile Worker
RESULT_FILE: runs/cosmile/COSMILE_O1_COMMERCE_SPINE_INTEGRATION_BASELINE_V1/30_WORKER_CORRECTION_RESULT.md
FOUNDATION_DOCS_COMMIT: NOT_APPLICABLE (authored only, unstaged — Advisor stages/commits/pushes)
TARGET_REPO: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_COMMERCE_SPINE_INTEGRATION_BASELINE_V1
TARGET_BRANCH: integration/cosmile-o1-commerce-spine-baseline-v1-20260719
TARGET_COMMIT: 02bb064cf24da568dc83be53afb8afe1e984acea
START_HEAD: 94693d26cec3c2e9ac830e9d2c2f6235dcf4c011 (ancestor of HEAD — additive)
PUSH_STATUS: PUSHED non-force; upstream equal (local HEAD == origin HEAD == 02bb064)
RETURN_TO: Advisor
PROPOSED_NEXT_ACTOR: Advisor
STOP
```

## Status

```text
OVERALL: CORRECTION_APPLIED_AND_GATE_PASSED
HANDOFF_VERIFICATION: PASS (commit 071f2880, blob b3f2b459, sha256 07180c4f — all matched)
CHANGED_PATHS: exactly the 7 authorized (2 new, 5 modified); none outside
TESTS_FIRST: PASS — recorded pre-implementation failure, then 22/22
COMPLETE_GATE (run once): prisma generate 0 | tsc --noEmit 0 (0 errors) | next build 0 | vitest 26 files, 650 passed, 7 skipped
```

## What the correction does

An order is O1-owned by the **union** the Advisor fixed — exact `mintOrderNo()` namespace
(`/^O1-[0-9A-F]{20}$/`, disjoint from the migration's `ord_<sha256hex>` legacy backfill) **or** a structurally bound
`PaymentIntent`. Never the runtime flag, never the order status; an unusable intent count fails closed. Both arms are
required because `startO1Checkout` creates the order before the intent, so either arm alone leaves a window.

Wired at four points: legacy checkout start and mock completion are globally unavailable while the O1 runtime is on
(refused before any lookup, so no order-existence oracle); `completeMockOrder` refuses O1-owned orders regardless of
the flag, evaluated before the `status === "paid"` shortcut; console-admin status mutation refuses O1-owned orders
before the transition table and before `update`. Legacy behaviour outside the O1 lane is preserved and is pinned by
two positive tests.

## Two items for Advisor attention

1. **D-2 did not reproduce.** The documented 19 pre-existing typecheck errors are absent: `tsc --noEmit` exits 0 with
   the Prisma client generated. The doc record is corrected; the *cause* is recorded as an unverified hypothesis, not
   a finding.
2. **Adjacent surfaces were left untouched, deliberately.** `/api/group-deal/team/[teamId]/mock-complete` and
   `/api/slice/purchase` are outside the seven authorized paths. Whether they can reach an O1-owned order is **open**
   and returns to Advisor as a candidate scope item — I did not expand into it.

Also noted in result §9: no runtime, browser or real-database execution occurred. Route tests use a recording prisma
stub, so wiring and decision order are proven, but live end-to-end refusal against a real database is not.

`app/node_modules` (731M, ignored, mission-attributable) is retained in the worktree for the independent review,
pending Advisor cleanup authorization.
