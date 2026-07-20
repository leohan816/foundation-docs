# R3 Post-window Query-only Recovery — Cosmile Worker

MISSION_ID: `COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1`
PRODUCT_HEAD: `824b41751238390b8baf54a3be68ee82a4d5823f`
ACTOR: existing `cosmile:0.0` / Opus 4.8 / xhigh / exact mission CWD
SKILL: `/fable-builder`; implementation-execution, contract-to-code-mapping, test-design-before-code, implementation-report-template
DELTA_ONLY_VERIFICATION: REQUIRED
NEW_PAYMENT_WINDOW: PROHIBITED
PROVIDER_ECONOMIC_EFFECT: ZERO

The one authorized replacement window was consumed and ended at `FAIL:PROVIDER_WINDOW:readiness_timeout`. Internal capture/refund effects are zero. Toss-side effect is unknown. The protected recovery correlation, `recovery.pgcustom`, and categorical stages are intact. Perform one official read-only Payment Query by the durable merchant order number to classify the existing provider state. Do not create or retry a payment.

Exact temporary source allowed:
`app/scripts/tmp/cosmile-o1-r3r4-recovery/r3r4_query_only_recovery.vitest.ts`

Existing protected inputs, read only:

- `/home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1/r3r4-replacement/correlation/recovery.json`
- `/home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1/r3r4-replacement/correlation/recovery.pgcustom`
- durable TEST credential store already approved; values remain memory-only and must never be printed, hashed, copied, or returned.

Required execution:

1. Create the exact ignored temporary driver with `apply_patch`, regular non-symlink `leo:leo 0600`. It must be default-inert behind an exact one-shot flag.
2. Validate the recovery file categorically: exact expected key set for a post-fence/pre-provider-key failure, bounded values, positive integer KRW amount, and `replacementWindowStarted=true`. Emit no value.
3. Start one fresh disposable PostgreSQL container `cosmile-o1-r3r4-query-pg-20260720` on loopback `55447`, restore the preserved `pg_dump -Fc`, and verify through Prisma that exactly one matching action-required, unclaimed PaymentIntent agrees with the protected durable order/intent/amount/KRW tuple. No direct SQL and no durable mutation.
4. Resolve the existing official Toss TEST transport from the protected store and call existing `queryPaymentByOrderNo` exactly once. This is the only external request. No retry/poll.
5. If provider returns a view, require exact order number, positive KRW amount, currency, and bounded provider-key agreement before categorizing its status. Do not persist or expose the key or any value.
6. Append only one result category to the existing owner-only `stage.jsonl`: `RECOVERY_QUERY_<STATUS>`, `RECOVERY_QUERY_NOT_FOUND`, `RECOVERY_QUERY_UNRESOLVED`, or `RECOVERY_QUERY_BINDING_MISMATCH`. Preserve the first failure.
7. Prove DB economic counts and intent/order state are byte-equivalent by categorical counts before/after the GET; the query creates zero internal/economic write.
8. Stop/remove only the query container and temporary query driver. Preserve the original recovery JSON, dump, stage file, original provider driver, and evidence `56_`–`61_`. Prove ports `55447/31083/9224` closed, durable store unchanged, and Git clean/upstream-equal.

Run exactly one focused one-shot query driver command. No app/browser/SDK/window, POST/capture/refund, migrations, schema, build, typecheck, broad test, product/tracked write, Google, live/production, PII, shared DB, or Reviewer.

Return <=40 lines: provider-query count `1`, closed provider status/category, tuple-binding boolean, before/after internal counts equality, cleanup, Git state, and `DONE_RECOVERY_READY | TERMINAL_NONCAPTURED | HOLD`. STOP. Do not attempt convergence or another provider call.
