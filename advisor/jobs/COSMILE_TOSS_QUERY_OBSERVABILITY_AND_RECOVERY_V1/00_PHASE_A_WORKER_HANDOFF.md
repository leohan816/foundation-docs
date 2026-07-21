# COSMILE_TOSS_QUERY_OBSERVABILITY_AND_RECOVERY_V1 — Phase A Worker Handoff

MISSION_ID: `COSMILE_TOSS_QUERY_OBSERVABILITY_AND_RECOVERY_V1`
PHASE: `A_OFFLINE_DIAGNOSTIC_DELTA`
INSTRUCTION_GATE: `PROCEED_WITH_LIMITS`
ACTOR: Cosmile Worker (`cosmile:0.0`), existing session only
MODEL_EFFORT: live-verified Opus 4.8 / xhigh or higher; do not change runtime/model/session
REPOSITORY: `/home/leo/Project/.worktrees/Cosmile/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1`
START_BRANCH: `verification/cosmile-o1-toss-reliability-runtime-v1-20260720`
START_HEAD: `824b41751238390b8baf54a3be68ee82a4d5823f`
TARGET_BRANCH: `implementation/cosmile-toss-query-observability-recovery-v1-20260721`
RETURN_TO: `foundation-advisor`

## Required entry and skill

Read the exact current Agent Office and Cosmile role authorities required by root `AGENTS.md`/`CLAUDE.md`, this committed handoff, and the testing-meaning policy before changing the test.
Load `/fable-builder` with only `implementation-execution`, `contract-to-code-mapping`, and `test-design-before-code`; load `implementation-report-template` only for the compact result.
Current Agent Office authority overrides historical foundation-docs role text.
No sub-agent, delegation, substitute actor, or parallel context.

## Exact delta ceiling

Only these tracked paths may change:

1. `app/src/lib/payment/webhook.ts`
2. `app/scripts/o1_browser_runtime_contract.vitest.ts`

Create/switch only the target branch from the exact clean start HEAD. Preserve all prior branches and evidence.

## Frozen behavior

Add one category-only, exported Toss query diagnostic classifier at the existing webhook inspection boundary, and make both existing order-number and payment-key inspection lanes use it without changing their existing conclusive/confirming/unresolved/binding-mismatch or settlement behavior.

The classifier must distinguish at least:

- provider 404/not-found -> `not_found`;
- provider 401/403/unauthorized -> `authentication_failure`;
- transport throw/timeout or provider unavailable -> `transport_failure`;
- malformed/invalid provider response -> `response_parse_failure`;
- modeled parser rejection of an unknown provider status -> `unsupported_provider_status`;
- a parsed provider view disagreeing with the durable expected orderNo/positive KRW amount/currency, and paymentKey when one is durably claimed -> `tuple_binding_mismatch`.

Use separate closed categories for other adapter/internal-invalid outcomes where needed; do not collapse any required category. Emit no raw body, provider message, key, identifier, secret, or tuple value. The diagnostic category is observation only: it must not alter retry, settlement, inbox state, reconciliation, capture, refund, order, or inventory semantics.

## Tests-first, delta-only

`DELTA_ONLY_VERIFICATION: REQUIRED`

1. Add one focused named synthetic test block in the authorized test file covering both query lanes and every required category, including zero repository/economic writes and no raw-detail exposure.
2. Run only that exact named test with `app/node_modules/.bin/vitest` and `-t`; preserve the expected RED.
3. Patch only `webhook.ts`.
4. Run the identical named test and require GREEN.

No full file/suite, build, typecheck, generate, install, DB, runtime, browser, provider/network, credential/env access, schema/migration, or other command. If the focused runner cannot execute from the existing local toolchain, STOP; do not repair the environment.

## Git and result

Inspect exact two-path diff and side effects. Commit once with explicit-path staging and non-force push the target branch. Verify clean/upstream-equal state.
Write only these protected mission-temporary evidence files, regular non-symlink `leo:leo` mode `0600`:

- `/home/leo/Project/.mission-tmp/COSMILE_TOSS_QUERY_OBSERVABILITY_AND_RECOVERY_V1/phase-a/10_WORKER_RESULT.md`
- `/home/leo/Project/.mission-tmp/COSMILE_TOSS_QUERY_OBSERVABILITY_AND_RECOVERY_V1/phase-a/11_WORKER_POINTER.md`

Result <=80 lines: exact delta, RED/GREEN command/outcome, prohibited checks skipped, economic/provider/DB effects 0, Git state, residual risks, pointer. Do not self-review. STOP after return.
