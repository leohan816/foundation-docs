# R3 Final Query-only Retry — Cosmile Worker

MISSION_ID: `COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1`
FOUNDER_AUTHORITY: exactly one additional and final idempotent GET by the same preserved merchant-order correlation
PRODUCT_HEAD: `824b41751238390b8baf54a3be68ee82a4d5823f`
ACTOR: existing `cosmile:0.0` / Opus 4.8 / xhigh / exact mission CWD
SKILL: `/fable-builder`; implementation-execution, contract-to-code-mapping, test-design-before-code, implementation-report-template
DELTA_ONLY_VERIFICATION: REQUIRED
NEW_PAYMENT_WINDOW_OR_POST: PROHIBITED
PROVIDER_ECONOMIC_EFFECT: ZERO

Advisor preflight PASS: prior query category count exactly `1`; provider-window stage exactly `1`; provider-key/capture/refund stages `0`; ports/processes/containers closed; protected recovery JSON/dump/stage regular non-symlink `leo:leo 0600`; durable TEST store unchanged; product Git clean/upstream-equal.

Create only this exact ignored temporary driver, then remove it after the result is captured:
`app/scripts/tmp/cosmile-o1-r3r4-final-query/r3r4_final_query_only_recovery.vitest.ts`

Recreate the already-reviewed query-only mechanism from `44_` without semantic expansion:

1. Default-inert behind exact `R3R4_FINAL_QUERY_ONESHOT=1`; regular non-symlink `leo:leo 0600`.
2. Fail closed unless the existing stage contains exactly one `RECOVERY_QUERY_` result and no `RECOVERY_QUERY_FINAL_` result, exactly one `PROVIDER_WINDOW`, and zero provider-key/capture/refund stage.
3. Validate protected recovery categorically: exact post-fence/pre-provider-key schema, bounded tuple, positive integer KRW amount, and `replacementWindowStarted=true`. Emit no value.
4. Restore `recovery.pgcustom` into one fresh disposable PostgreSQL container `cosmile-o1-r3r4-final-query-pg-20260720` on loopback `55448`. Through Prisma, require exactly one matching action-required, unclaimed PaymentIntent and capture/refund counts zero. No direct SQL and no durable mutation.
5. Resolve the existing official Toss TEST transport from the durable store and call existing `queryPaymentByOrderNo` exactly once. No poll or retry. This is the final provider request.
6. For an `ok` response, require exact internal orderNo/amount/KRW and bounded payment key before categorizing. Append exactly one owner-only categorical stage: `RECOVERY_QUERY_FINAL_<STATUS>`.
7. Map provider `not_found` to `RECOVERY_QUERY_FINAL_NOT_FOUND`; all other non-ok outcomes to `RECOVERY_QUERY_FINAL_UNRESOLVED`; binding disagreement to `RECOVERY_QUERY_FINAL_BINDING_MISMATCH`. Preserve the earlier unresolved result and first window failure.
8. Prove internal counts/intent/order state equal before/after the GET. Stop/remove the final-query container and driver; prove port `55448` closed, durable store unchanged, and Git clean/upstream-equal. Preserve recovery/dump/stage through Advisor capture under every outcome.

Run one focused one-shot command only. No app/browser/SDK/window, provider POST, capture/refund, internal mutation, schema/migration, build, typecheck, broad test, product/tracked write, Google, live/production, PII, shared DB, or Reviewer.

Return <=30 lines:

- query counts: prior `1`, final `1`, total `2`;
- final provider category/status and tuple-binding boolean;
- before/after internal equality;
- cleanup/Git state;
- `DONE_RECOVERY_READY` for exact bound `DONE` only;
- `TERMINAL_NONCAPTURED` for exact bound terminal non-capture or `not_found`;
- otherwise `FINAL_HOLD`.

STOP. No third query and no convergence/refund.
