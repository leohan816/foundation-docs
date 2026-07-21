# COSMILE_TOSS_QUERY_OBSERVABILITY_AND_RECOVERY_V1 — Phase A Independent Review

MISSION_ID: `COSMILE_TOSS_QUERY_OBSERVABILITY_AND_RECOVERY_V1`
REVIEW_NEEDED: `YES`
REVIEW_TIER: `HARD_IMPORTANT_SAFETY`
MODEL: `Fable 5`
EFFORT: `max`
WHY_SELECTED: the delta classifies official Toss payment-query failures and tuple disagreement, and its output gates the single-query recovery disposition; misclassification could confuse captured, non-captured, authentication, transport, parse, or binding evidence even though this delta has zero direct economic authority.
ACTOR: assigned independent Foundation Reviewer (`foundation-reviewer-fable5:0.0`), never the Worker context
LIVE_BINDING_VERIFIED: Fable 5 / max; separate session; candidate worktree `app` CWD; idle; fresh context required before dispatch
RETURN_TO: `foundation-advisor`

## Subject

REPOSITORY: `/home/leo/Project/.worktrees/Cosmile/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1`
BASE: `824b41751238390b8baf54a3be68ee82a4d5823f`
CANDIDATE_BRANCH: `implementation/cosmile-toss-query-observability-recovery-v1-20260721`
CANDIDATE: `4f767737c18715de2f48bb3f90a16e807691bc4d`
EXACT_DELTA:

- `app/src/lib/payment/webhook.ts`
- `app/scripts/o1_browser_runtime_contract.vitest.ts`

WORKER_EVIDENCE:

- `/home/leo/Project/.mission-tmp/COSMILE_TOSS_QUERY_OBSERVABILITY_AND_RECOVERY_V1/phase-a/10_WORKER_RESULT.md`
- `/home/leo/Project/.mission-tmp/COSMILE_TOSS_QUERY_OBSERVABILITY_AND_RECOVERY_V1/phase-a/11_WORKER_POINTER.md`

## Entry and skill

Read current Agent Office/Reviewer authority and this committed handoff. Load `/fable-sentinel` with only the task-applicable `review-classification`, `delta-review`, `safety-review`, `provenance-review`, and `contract-review` references. Current Agent Office authority overrides historical foundation-docs role text.

## Review questions

1. Does the actual base-to-candidate diff remain exactly two paths and category-only, with no economic/provider/DB/runtime authority?
2. Does the classifier distinctly and fail-closed map `not_found`, `authentication_failure`, `transport_failure`, `response_parse_failure`, `unsupported_provider_status`, and `tuple_binding_mismatch`, without raw provider/tuple/secret exposure?
3. Are both inspection-lane `matched` booleans exactly equivalent to their prior durable-binding checks, including paymentKey only in the claimed lane?
4. For every adapter outcome, is the prior `conclusive | confirming | unresolved | binding_mismatch` behavior and inbox settlement behavior unchanged?
5. Do the synthetic tests exercise the real two query adapters, preserve meaningful RED/GREEN evidence, avoid assertion weakening, and prove zero POST/economic write?
6. Did the target branch start from 824b417, preserve the prior branch ref, and end clean/upstream-equal at 4f76773?

## Verification boundary

`DELTA_ONLY_VERIFICATION: REQUIRED`.
Read-only Git/diff/source/evidence inspection only. Do not rerun tests: the exact named RED/GREEN has already been evidenced, and independent review must not duplicate it from habit. No full suite/file, build, typecheck, generate, DB, runtime, browser, provider/network, credential/env access, schema/migration, product mutation, patch, commit, push, or dispatch. If a test is materially necessary because the evidence is internally contradictory, STOP and return that exact need before running it.

## Result

Write only protected regular non-symlink `leo:leo` mode `0600`:

- `/home/leo/Project/.mission-tmp/COSMILE_TOSS_QUERY_OBSERVABILITY_AND_RECOVERY_V1/phase-a-review/20_REVIEW_RESULT.md`
- `/home/leo/Project/.mission-tmp/COSMILE_TOSS_QUERY_OBSERVABILITY_AND_RECOVERY_V1/phase-a-review/21_REVIEW_POINTER.md`

Result <=80 lines: actual model/effort/independence/CWD, skill refs loaded, exact delta inspected, direct findings, verification skips, Git state, and verdict `PASS | PASS_WITH_RISK | NEEDS_PATCH | FAIL`. No patch. Return to Advisor and STOP.
