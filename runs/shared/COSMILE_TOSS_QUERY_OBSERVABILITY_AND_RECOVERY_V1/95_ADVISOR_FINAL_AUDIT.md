# COSMILE_TOSS_QUERY_OBSERVABILITY_AND_RECOVERY_V1 — Advisor Final Audit

MISSION_ID: `COSMILE_TOSS_QUERY_OBSERVABILITY_AND_RECOVERY_V1`
ADVISOR_VERDICT: `HOLD_WITH_NAMED_BLOCKER`
NAMED_BLOCKER: `TRANSPORT_ALLOWLIST_MISSING_ORDER_QUERY`
CLAIM_CEILING: `REVIEWED_OFFLINE_TOSS_QUERY_DIAGNOSTIC_CATEGORIZATION__PHASE_B_PROVIDER_QUERY_NOT_EXECUTED__RECOVERY_PRESERVED`
RETURN_TO: `foundation-strategy-sol -> Leo`

## Exact result index

- Product base: `824b41751238390b8baf54a3be68ee82a4d5823f`.
- Product branch: `implementation/cosmile-toss-query-observability-recovery-v1-20260721`.
- Product candidate: `4f767737c18715de2f48bb3f90a16e807691bc4d`, clean/upstream-equal `0/0`.
- Exact product delta: `app/src/lib/payment/webhook.ts`; `app/scripts/o1_browser_runtime_contract.vitest.ts`.
- Phase A Worker evidence: `/home/leo/Project/.mission-tmp/COSMILE_TOSS_QUERY_OBSERVABILITY_AND_RECOVERY_V1/phase-a/10_WORKER_RESULT.md` and `11_WORKER_POINTER.md`.
- Phase A review evidence: `/home/leo/Project/.mission-tmp/COSMILE_TOSS_QUERY_OBSERVABILITY_AND_RECOVERY_V1/phase-a-review/20_REVIEW_RESULT.md` and `21_REVIEW_POINTER.md`.
- Phase B evidence: `/home/leo/Project/.mission-tmp/COSMILE_TOSS_QUERY_OBSERVABILITY_AND_RECOVERY_V1/phase-b/40_WORKER_RESULT.md` and `41_WORKER_POINTER.md`.

## Phase A

- Added one category-only classifier used by both existing Toss query inspection lanes. Required categories are distinct: `not_found`, `authentication_failure`, `transport_failure`, `response_parse_failure`, `unsupported_provider_status`, and `tuple_binding_mismatch`; other closed outcomes remain distinct.
- Focused named synthetic test: explicit unmasked RED exit `1`; identical GREEN exit `0`, `5 passed | 93 skipped`. No full suite/build/typecheck/DB/runtime/provider action.
- Independent review admission: `HARD_IMPORTANT_SAFETY`; actual Reviewer binding `Fable 5 / max`, fresh independent session, `/fable-sentinel` with review-classification, delta-review, safety-review, provenance-review, and contract-review.
- Independent verdict: `PASS`, blocking findings `0`. Review reproduced no tests and made no patch.

## Phase B

- Precontact product, review, preserved-evidence, stage-count, credential-store names/status, image, and containment gates passed.
- A superseded precontact HOLD incorrectly treated host `pg_restore` absence as dispositive. Advisor corrected it because the existing local `postgres:16-alpine` image provides in-container `pg_restore`; no install or pull was needed.
- The current reviewed TEST transport allowlist admits single-segment `/v1/payments/{paymentKey}` but not the required `/v1/payments/orders/{orderNo}` recovery path. The official recovery GET therefore cannot reach Toss through the current approved transport.
- Fixing or bypassing that allowlist would be implementation beyond this mission's diagnostic-delta ceiling. Work stopped before driver, DB restore, credential read, or provider contact.
- Phase B official GET count: `0`. Provider POST/window/capture/refund count: `0`. Provider, economic, internal-DB, and product-Git effects: `0`.
- No Phase B Reviewer was needed: no Phase B code delta, DB action, credential use, or provider action occurred.

## Preserved state and cleanup

- Protected recovery evidence remains unchanged and nonempty, regular non-symlink `leo:leo 0600`:
  - `/home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1/r3r4-replacement/correlation/recovery.json`;
  - `/home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1/r3r4-replacement/correlation/recovery.pgcustom`;
  - `/home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1/r3r4-replacement/stage.jsonl`.
- Durable Toss TEST store remains regular non-symlink `leo:leo 0600` at `/home/leo/Project/Cosmile/.secrets/nonproduction/toss-test.env`; values were not printed, hashed, copied, logged, or returned.
- Phase B temporary driver is absent. No mission container, selected port, app/browser/SDK process, production/live contact, real payment, PII, merge, or protected-branch action remains.

## Required next authority

Before any further official query, Leo/Strategy must authorize a separate bounded transport delta that admits only the exact encoded read-only merchant-order query path, preserves the existing confirm/query/cancel allowlist and secret boundary, uses focused adversarial path/traversal tests, and receives proportional independent safety review. A later mission must separately authorize its own single official GET; this mission does not auto-extend or start it.

HARD_STOP: `ACTIVE`
