# COSMILE WU-B Correction Cycle 1 — Independent Delta Review Handoff

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
WORKUNIT: WU-B-CORRECTION-1-DELTA-REVIEW
FROM: foundation-advisor
TO: foundation-reviewer-fable5
MODE: INDEPENDENT_DELTA_REVIEW_READ_ONLY
REQUIRED_SKILL: /fable-sentinel
REQUIRED_MODEL: Fable 5
REQUIRED_EFFORT: max
REVIEWER_SESSION: foundation-reviewer-fable5:0.0
REVIEWER_WORKSPACE: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
INDEPENDENCE: same independent Reviewer as the WU-B full review; separate from Worker and Advisor; no overlapping review
PRODUCT_WRITE_AUTHORITY: NONE
REVIEWER_PATCH_AUTHORITY: NONE
```

## Pinned subjects

```text
COSMILE_REPOSITORY: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
COSMILE_BRANCH: implementation/cosmile-o1-korea-golden-commerce-v1-20260717
OLD_FULL_REVIEWED_HEAD: d17a0926e8d4bc2ba02cf275ce7a25baedb2dd01
NEW_CORRECTION_HEAD: e1cfc4ad8a99c0365c0d8f72b0ed2a3f8a6c5515
EXPECTED_PARENT_OF_NEW: d17a0926e8d4bc2ba02cf275ce7a25baedb2dd01
PUSH_STATUS: NOT_PUSHED_PENDING_DELTA_PASS
EXPECTED_UPSTREAM_BASE: 2733bfd61e407389c3336eba2e655ad081d4cdb5
EXPECTED_AHEAD_BEHIND: 2/0

FULL_REVIEW_RESULT:
runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/61_COSMILE_WUB_IMPLEMENTATION_REVIEW.md
FULL_REVIEW_DOCS_COMMIT: cce4bb50e2ae9f4d81e05ae19ef736b896f5f9f8

CORRECTION_HANDOFF:
advisor/jobs/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/handoffs/62_COSMILE_WUB_CORRECTION_1_HANDOFF.md
CORRECTION_HANDOFF_DOCS_COMMIT: 7ec0ebc66d75f8479cbd57f28f82f8bff14cf69b

CORRECTION_RESULT:
runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/62_COSMILE_WUB_CORRECTION_1_RESULT.md
CORRECTION_POINTER:
runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/62_COSMILE_WUB_CORRECTION_1_POINTER.md
CORRECTION_RESULT_DOCS_COMMIT: 27f2130ae1901aeffb87c34e07d362528d2fb9d0
```

## Exact delta scope

Review only `d17a0926..e1cfc4a` and the declared correction evidence. The delta must contain exactly these eight previously reviewed WU-B paths:

```text
app/src/lib/payment/contracts.ts
app/src/lib/payment/tossV2.ts
app/src/lib/payment/repository.ts
app/src/lib/payment/service.ts
app/src/lib/payment/webhook.ts
app/scripts/o1_payment_contract.vitest.ts
app/scripts/o1_toss_v2_adapter.vitest.ts
app/scripts/o1_payment_repository.dbtest.py
```

Do not reopen unrelated WU-0/A/C/D implementation except where a declared WU-B regression or boundary is directly affected by this delta.

## Findings that must be closed

1. `WUB-F1` — ambiguous confirmation and post-2xx mismatch must leave durable, restart-safe, category-only reconciliation evidence. Verify bounded stuck-state discovery, deterministic ordering, no bounded-page starvation, null-order exclusion, and the active-task invariant (`open` and `in_progress` both active; `resolved` may permit a new task).
2. `WUB-AF1` — Toss provider idempotency keys must be deterministic and derived from durable state, not caller-controlled transient values. Captured replay must make zero further provider request. Ambiguous retry with a changed caller capture key must reuse the same provider key. No key or seed may leak.
3. `WUB-AF2` — repository capture must require exact equality between the intent's durably claimed `providerIntentRef` and the capture `providerTxnRef`, including direct repository bypass tests.
4. `WUB-AF3` — webhook pull-verification must use durable current intent/order bindings, not caller-supplied tuple values, and may claim verified only when the terminal inbox state is persisted. Missing, stale, unclaimed, wrong-state, mismatched, or repository-failure cases must fail closed with zero money/order/refund effect.

Also verify the Advisor's adjacent correction requirements recorded in handoff 62: exact `tasksEnsured` semantics, all non-conclusive provider states, open/reuse failure recovery, deterministic `(updatedAt,id)` ordering, and no new route/timer/scheduler/runtime/provider/credential/schema/migration surface.

## Required reproduction

Use only already-present dependencies and the previously proven local disposable PostgreSQL pattern. Never install, pull, use real credentials, or access any shared/real database or external provider.

```text
cd app
npx vitest run scripts/o1_toss_v2_adapter.vitest.ts scripts/o1_payment_contract.vitest.ts
npx vitest run
python3 scripts/o1_payment_repository.dbtest.py
python3 scripts/o1_inventory_concurrency.dbtest.py
python3 scripts/o1_golden_commerce_migration.dbtest.py
```

Expected reported evidence: focused 57/57; full 390/390; WU-B DB 53/53; WU-C 28/28; WU-0 54/54. If safe execution cannot be proven, record the exact skip instead of inferring PASS. Remove only the attributable ignored `app/node_modules` symlink if created; product HEAD and tracked state must remain unchanged.

## Required review output

Write only these foundation-docs mission artifacts:

```text
runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/63_COSMILE_WUB_DELTA_REVIEW_1.md
runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/63_COSMILE_WUB_DELTA_REVIEW_1_POINTER.md
```

The result must include exact old/new heads, tested commands/counts, finding-by-finding disposition, scope/containment proof, product-write status zero, residual unknowns, and one verdict:

```text
PASS
NEEDS_PATCH
PASS_WITH_RISK
FAIL
```

`PASS` is required before the Advisor may push the WU-B candidate or dispatch WU-E. On `NEEDS_PATCH`, return only to foundation-advisor; do not patch. `PASS_WITH_RISK` or `FAIL` returns to Strategy/Leo under the mission authority.

```text
RETURN_TO: foundation-advisor
NEXT_WORKUNIT_AUTO_START: NO
STOP
```
