# Independent Delta Review — Toss TEST Merchant-Order Lookup Allowlist

```text
MISSION_ID: COSMILE_TOSS_QUERY_OBSERVABILITY_AND_RECOVERY_V1
PHASE: PHASE_A_CORRECTION_INDEPENDENT_REVIEW
ROUTE: foundation-advisor -> independent Foundation Reviewer -> foundation-advisor

REVIEW_NEEDED: YES
REVIEW_TIER: HARD_IMPORTANT_SAFETY
MODEL: Fable 5
EFFORT: max
WHY_SELECTED: payment transport security allowlist controls the only authorized official Toss TEST GET
INDEPENDENCE: required; Reviewer is read-only and did not author the candidate

SKILL: /fable-sentinel
REQUIRED_REFERENCES:
- review-classification
- delta-review
- safety-review
- provenance-review
- contract-review

PRODUCT_REPOSITORY: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1
PRODUCT_BRANCH: implementation/cosmile-toss-query-observability-recovery-v1-20260721
BASE: 4f767737c18715de2f48bb3f90a16e807691bc4d
CANDIDATE: 92331e755323d9b4d750a3da0b721df36197f588
EXPECTED_UPSTREAM: origin/implementation/cosmile-toss-query-observability-recovery-v1-20260721

EXACT_CHANGED_PATHS:
1. app/src/lib/payment/tossSandboxTransport.ts
2. app/scripts/o1_toss_sandbox_transport.ts
3. app/scripts/o1_browser_runtime_contract.vitest.ts

AUTHORIZED_DELTA:
- admit only GET /v1/payments/orders/{encodedOrderNo};
- keep exact origin https://api.tosspayments.com;
- keep TEST-only credential and one-shot gates;
- reject redirects, retries, polling, arbitrary paths, raw slash, extra segment, query, fragment, origin swap, double slash, and literal dot-dot;
- keep runtime transport and reviewed script twin equivalent;
- no POST/capture/refund/economic/provider action.

READ_ONLY_REVIEW:
1. Verify exact base/candidate/branch/upstream and three-path containment.
2. Inspect only the exact delta and load-bearing request predicate/send call sites needed to answer the questions below.
3. Verify the new path is exactly one encoded non-empty segment and GET-only before fetch.
4. Verify hostile/ambiguous path shapes remain fail-closed and no origin/method/redirect/retry/credential gate is weakened.
5. Verify runtime and script twin remain behaviorally equivalent for the delta.
6. Verify the focused test is adversarial and the recorded meaningful RED/identical GREEN evidence supports the claim.
7. Determine whether changing two prior throw categories to request_not_allowed creates a material contract contradiction; do not infer one without exact evidence.
8. Verify no provider/network/DB/credential/economic effect and no scope drift.

PROHIBITED:
- patching or any product/docs mutation;
- test rerun, build, typecheck, generate, install, DB, runtime, provider/network contact;
- broad repository review, unrelated history/source reads, or scope expansion.

EVIDENCE_INDEX:
- /home/leo/Project/.mission-tmp/COSMILE_TOSS_QUERY_OBSERVABILITY_AND_RECOVERY_V1/transport-correction/50_WORKER_RESULT.md
- /home/leo/Project/.mission-tmp/COSMILE_TOSS_QUERY_OBSERVABILITY_AND_RECOVERY_V1/transport-correction/51_WORKER_POINTER.md

OUTPUT_ROOT: /home/leo/Project/.mission-tmp/COSMILE_TOSS_QUERY_OBSERVABILITY_AND_RECOVERY_V1/transport-review
OUTPUTS:
- 60_REVIEW_RESULT.md
- 61_REVIEW_POINTER.md
OUTPUT_PROTECTION: regular non-symlink leo:leo 0600
REPORT_CEILING: 60 lines

VERDICT: PASS | PASS_WITH_CORRECTIONS | HOLD
RETURN_ONLY: actual model/effort, skill/references, exact delta, material findings, verdict, Git state, next action
STOP_AFTER_RETURN: YES
```
