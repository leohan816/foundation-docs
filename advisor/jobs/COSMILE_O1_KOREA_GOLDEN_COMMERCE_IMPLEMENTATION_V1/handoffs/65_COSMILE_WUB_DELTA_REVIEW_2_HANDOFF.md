# WU-B Correction Cycle 2 — Independent Delta Review Handoff

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
WORKUNIT: WU-B-CORRECTION-2-DELTA-REVIEW
FROM: foundation-advisor
TO: foundation-reviewer-fable5
MODE: READ_ONLY_INDEPENDENT_DELTA_REVIEW
REQUIRED_SKILL: /fable-sentinel
REQUIRED_MODEL: Fable 5
REQUIRED_EFFORT: max
```

## Live binding and independence

Immediately before dispatch the Advisor verified:

```text
SESSION: foundation-reviewer-fable5
PANE: foundation-reviewer-fable5:0.0
ACTUAL_MODEL: claude-fable-5[1m]
ACTUAL_EFFORT: max
WORKSPACE: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
ROLE: independent Foundation Reviewer
REQUIRED_SKILL: /fable-sentinel
INDEPENDENCE: PASS — Reviewer did not author or patch the candidate
OVERLAPPING_REVIEW: NO
PANE_SYNCHRONIZATION: OFF
```

The same Reviewer performed WU-B full review and delta review 1. Review this second correction only as the declared delta below. Do not patch, stage, commit, push, accept risk, or start another WorkUnit.

## Pinned subject

```text
COSMILE_REPOSITORY: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
BRANCH: implementation/cosmile-o1-korea-golden-commerce-v1-20260717
OLD_REVIEWED_PASS_HEAD: e1cfc4ad8a99c0365c0d8f72b0ed2a3f8a6c5515
NEW_CANDIDATE_HEAD: b344889428971f6baa7208ea3e76858de0c9fc8b
EXPECTED_PARENT: e1cfc4ad8a99c0365c0d8f72b0ed2a3f8a6c5515
PUSH_STATUS: WITHHELD_PENDING_THIS_REVIEW
EXPECTED_AHEAD_BEHIND: 1/0
```

Foundation-docs evidence:

```text
FOUNDATION_DOCS_REPOSITORY: /home/leo/Project/.worktrees/foundation-docs/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
FOUNDATION_DOCS_BRANCH: advisor/cosmile-o1-korea-golden-commerce-implementation-v1-20260717
EVIDENCE_COMMIT: c255e3e
RESULT: runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/64_COSMILE_WUB_CORRECTION_2_RESULT.md
POINTER: runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/64_COSMILE_WUB_CORRECTION_2_POINTER.md
FINDING: WUB-AF4
```

## Exact authorized delta

Review exactly `e1cfc4ad8a99c0365c0d8f72b0ed2a3f8a6c5515..b344889428971f6baa7208ea3e76858de0c9fc8b` and only these four paths:

```text
app/src/lib/payment/contracts.ts
app/src/lib/payment/repository.ts
app/scripts/o1_payment_contract.vitest.ts
app/scripts/o1_payment_repository.dbtest.py
```

Expected purpose: close WUB-AF4 by requiring complete, exact, live reservation coverage for every aggregated order line before creating an actionable intent or making any fresh/retry Toss confirmation request.

## Required review checks

Verify directly:

1. The candidate is one additive commit whose parent is the old reviewed PASS head; no amend/rebase/squash/history rewrite occurred.
2. The diff changes only the four listed paths; payment service, Toss adapter, webhook, schema/migration, routes, order lifecycle, and unrelated surfaces are unchanged.
3. An order must exist with at least one line; every line has non-null `skuId` and positive quantity.
4. Duplicate order lines are aggregated by SKU and require exact aggregate coverage.
5. Every required SKU is exactly covered by live `reserved` inventory with `expiresAt > now()`.
6. Missing, partial, expired, released, committed, under-, over-, null-SKU, zero/negative-quantity, empty-order, and extra-only cases fail closed as `reservation_required`.
7. Extra reservations cannot compensate for a missing or under-covered required SKU.
8. The authoritative complete-set gate runs inside both create and claim locked transactions; authorizing retries re-check before provider contact.
9. Coverage loss after intent creation causes zero provider calls and zero state advance.
10. Captured replay behavior from WUB-AF1 remains zero-provider-call and does not regress.
11. Server-authoritative orderNo/amount/KRW binding, paymentKey claim, idempotency, webhook verification, refund, reconciliation, and earlier WU-B corrections remain intact.
12. Unit/FakeRepo and disposable-PostgreSQL mirror encode the same rule without weakening earlier oracles.
13. Evidence is category/count/boolean only; no secret, PII, payment key, provider reference, raw payload, or credential leakage.
14. Disposable PostgreSQL cleanup is verified; no persistent container/volume remains.
15. No excluded authority was used, and WU-E/F/G did not start.

You may rerun only the already-authorized focused/regression commands needed to verify this delta, using existing dependencies and the same disposable local PostgreSQL containment. Do not install dependencies, generate Prisma, use provider credentials/network, or alter tracked files. Capture pre/post Git status and clean up only attributable mission-created artifacts.

## Durable output

Write only these uncommitted Reviewer-authored files in foundation-docs:

```text
runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/65_COSMILE_WUB_DELTA_REVIEW_2.md
runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/65_COSMILE_WUB_DELTA_REVIEW_2_POINTER.md
```

Verdict:

```text
PASS | NEEDS_PATCH | PASS_WITH_RISK | FAIL
```

On `NEEDS_PATCH`, identify exact finding IDs, severity, path, evidence, required bounded correction, and why it remains in scope. Do not patch. `PASS_WITH_RISK` or `FAIL` returns immediately through the Advisor. Return to `foundation-advisor` and STOP.
