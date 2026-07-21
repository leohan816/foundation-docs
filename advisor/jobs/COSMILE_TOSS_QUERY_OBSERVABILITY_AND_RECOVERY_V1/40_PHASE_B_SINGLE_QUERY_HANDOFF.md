# COSMILE_TOSS_QUERY_OBSERVABILITY_AND_RECOVERY_V1 — Phase B Single Official GET

MISSION_ID: `COSMILE_TOSS_QUERY_OBSERVABILITY_AND_RECOVERY_V1`
PHASE: `B_SINGLE_OFFICIAL_TOSS_GET`
ENTRY_GATE: `PROCEED_WITH_LIMITS`
PREREQUISITE_REVIEW: `PASS`, Fable 5 / max (Phase A diagnostic and transport-allowlist correction)
REVIEW_RESULT: `/home/leo/Project/.mission-tmp/COSMILE_TOSS_QUERY_OBSERVABILITY_AND_RECOVERY_V1/transport-review/60_REVIEW_RESULT.md`
REVIEW_RESULT_SHA256: `6404559acb8f3df1b61340857863ccd8e9ae1a2dd121ccd7eae7de178dde8d74`
ACTOR: existing Cosmile Worker (`cosmile:0.0`), Opus 4.8 / xhigh, same session and exact product worktree
PRODUCT_BRANCH: `implementation/cosmile-toss-query-observability-recovery-v1-20260721`
PRODUCT_HEAD: `92331e755323d9b4d750a3da0b721df36197f588`
RETURN_TO: `foundation-advisor`

## Entry and skill

Read this exact committed handoff and the current Worker authority. Load `/fable-builder` with only `implementation-execution`, `contract-to-code-mapping`, and `test-design-before-code`; use `implementation-report-template` for the compact result. No context/session/model/actor change, sub-agent, or delegation.

## Precontact gates

Before any DB/container/credential/provider action, verify categorically without printing/hashing/copying values or identifiers:

- product branch/HEAD is exact, clean, and upstream-equal;
- Phase A review result is protected and its SHA-256 matches above;
- preserved files below are regular non-symlink `leo:leo 0600` and nonempty:
  - `/home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1/r3r4-replacement/correlation/recovery.json`
  - `/home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1/r3r4-replacement/correlation/recovery.pgcustom`
  - `/home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1/r3r4-replacement/stage.jsonl`;
- categorical preserved-stage counts are exactly: provider window `1`, prior-mission official recovery GETs `2`, provider-key/capture/refund stages `0`;
- this mission's Phase B official GET count is `0`; the prior transport-allowlist HOLD performed no provider contact;
- prior first failure and both unresolved query stages remain present;
- durable Toss TEST store is regular non-symlink `leo:leo 0600`; required variable names are SET, values never read out, printed, hashed, copied, or logged; mode/owner/inode/size/mtime must be recorded categorically for post-check equality;
- no mission app/browser/SDK/provider process, container, or prior query driver is active; selected loopback port is unused.

Any mismatch => `HOLD` before provider contact.

## Exact execution

Create only one ignored temporary driver:

`app/scripts/tmp/cosmile-toss-query-observability-recovery-v1/phase_b_single_query.vitest.ts`

It must be regular non-symlink `leo:leo 0600`, default-inert behind exact `TOSS_QUERY_RECOVERY_PHASE_B_ONESHOT=1`, and removed after result capture.

1. Restore the preserved `recovery.pgcustom` into one fresh disposable PostgreSQL container on loopback only. Apply no migration and make no durable application-data mutation.
2. Through the existing Prisma boundary, prove counts/categories only: exactly one matching `action_required` unclaimed intent bound to the protected recovery tuple; capture/refund/economic counts `0`; no identifier/value output.
3. Resolve the existing official Toss TEST transport from the durable owner-controlled store. Use the preserved order correlation and call existing `queryPaymentByOrderNo` exactly once. No poll, retry, fallback endpoint, second request, POST, payment window, capture, or refund.
4. Pass the returned `AdapterOutcome` and the exact durable tuple-match boolean to the reviewed `classifyTossQueryDiagnostic`. Persist/output only the fixed category and, for a matched `ok` response, the supported provider-status category; never provider body/key/order/amount/currency/identifier.
5. Append exactly one protected categorical Phase B stage after the GET. Preserve all prior failure/query stages.
6. Prove before/after internal counts and intent/order state are equal and provider/economic/internal writes are `0`.
7. Stop/remove the disposable container and driver; prove selected port/processes absent, product Git clean/upstream-equal, durable store metadata unchanged. Do not delete the preserved recovery JSON/dump/stage; Advisor applies the final disposition after capturing the result.

Run one focused one-shot command only. No test suite, build, typecheck, generate, install, app/browser/SDK/window, provider POST, capture/refund, schema/migration, Google, production/live, real payment, PII, shared DB, tracked product write, commit, push, or Reviewer.

## Disposition returned to Advisor

- `CAPTURED_BOUND_STOP`: category `ok_binding_matched` and provider status `DONE`. Preserve recovery and STOP; no refund.
- `TERMINAL_NONCAPTURED`: category `not_found`, or `ok_binding_matched` with status `ABORTED` or `EXPIRED`. STOP for Advisor evidence-safe closure.
- `HOLD_<CATEGORY>`: `authentication_failure`, `transport_failure`, `response_parse_failure`, `unsupported_provider_status`, `tuple_binding_mismatch`, any other closed fault, any nonterminal status, `CANCELED`, or `PARTIAL_CANCELED`. Preserve recovery and STOP; no retry.

## Result

Write only protected regular non-symlink `leo:leo 0600`:

- `/home/leo/Project/.mission-tmp/COSMILE_TOSS_QUERY_OBSERVABILITY_AND_RECOVERY_V1/phase-b/70_FINAL_QUERY_RESULT.md`
- `/home/leo/Project/.mission-tmp/COSMILE_TOSS_QUERY_OBSERVABILITY_AND_RECOVERY_V1/phase-b/71_FINAL_QUERY_POINTER.md`

Result <=50 lines: precontact gates, exact query count `1`, category/status class, tuple-match boolean, before/after equality, effects `0`, cleanup/Git/store state, disposition, next action. Do not self-review. Return to Advisor and STOP.
