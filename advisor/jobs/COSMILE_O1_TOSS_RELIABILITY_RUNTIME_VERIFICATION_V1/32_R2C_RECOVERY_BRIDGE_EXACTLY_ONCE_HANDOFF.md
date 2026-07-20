# R2C Recovery Bridge and Exactly-Once — Cosmile Worker

MISSION_ID: `COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1`
MODULE: `R2C_RECOVERY_BRIDGE_EXACTLY_ONCE`
PRODUCT_BASE: `6e43735e496a93597a1f3423f88f9966aeba758b`
PRODUCT_WORKTREE: `/home/leo/Project/.worktrees/Cosmile/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1`
WORKER: existing `cosmile:0.0` / Cosmile Worker / Opus 4.8 / xhigh
SKILL: `/fable-builder`; `implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`; `implementation-report-template` only for return.
INSTRUCTION_GATE: `PROCEED_WITH_LIMITS`
PRODUCT_SOURCE_OR_TRACKED_WRITE: `PROHIBITED`
REAL_PROVIDER_OR_ECONOMIC_EFFECT: `ZERO`
REVIEW: no module Reviewer; cumulative payment/state review remains deferred to final `HARD_IMPORTANT_SAFETY` admission.

## Exact objective

Over the real recovery-bridge/repository boundaries and a count-only deterministic fake transport, prove:

1. capture provider success followed by one injected internal persistence failure remains recoverable;
2. persisted capture with an unbound/unconfirmed order converges through existing `confirmCapturedOrder` semantics;
3. full-refund provider success followed by one injected internal persistence failure remains recoverable;
4. a durable full-refund row with an unfinalized order converges through existing `finalizeRefundToOrder` semantics;
5. process restart and repeated bridge invocation reuse the same existing idempotent capture/refund operations, converge internal state, and produce exactly one synthetic capture effect and one synthetic full-refund effect;
6. refund continuation is allowed only from the same durable, already-authorized full-refund row (same order/capture, full amount, KRW, stable idempotency key); missing/ambiguous/mismatched evidence yields zero fake-provider call and fail-closed/HOLD;
7. capture/refund/order/inventory/reconciliation states agree after convergence; refund does not restore sellable inventory.

Do not create a new refund, change amount/currency/capture, infer operator authority, run operator routes, or run R2D/R3/R4.

## Exact product read ceiling

- `app/src/lib/payment/contracts.ts`
- `app/src/lib/payment/repository.ts`
- `app/src/lib/payment/webhook.ts`
- `app/src/lib/runtime/o1ReliabilityRuntime.ts`
- `app/src/lib/order/repository.ts`
- `app/scripts/o1_toss_recovery_bridge.vitest.ts`
- `app/scripts/o1_toss_recovery_bridge.dbtest.py`
- `app/vitest.config.ts`
- `app/prisma/schema.prisma` and the nine committed `migration.sql` files only.

No product source or tracked path may be edited, staged, committed, or generated.

## Exact temporary/output paths

- Ignored worktree root: `app/scripts/tmp/cosmile-o1-r2c-runtime-verification/` (`leo:leo`, `0700`; existing `tmp/` ignore and `scripts/**/*.vitest.ts` include).
- One driver: `r2c_recovery_bridge.vitest.ts` (`0600`), created with `apply_patch`, removed before return.
- Private external root: `/home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1/r2c` (`leo:leo`, `0700`).
- Count-only fake-provider ledger: `provider_effect_counts.json` (`0600`), created by the driver; exact keys only `capture_calls`, `capture_effects`, `refund_calls`, `refund_effects`. No identifier/hash/key/body.
- Result: `/home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1/worker/38_R2C_RESULT.md` (`0600`).
- Pointer: `/home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1/worker/39_R2C_POINTER.md` (`0600`).

No log, PID, config, raw provider/request/response, identifier, or other artifact. Runtime identifiers and idempotency values are generated/used in process and never printed or written outside the disposable DB.

## Frozen command/action ceiling

1. Verify clean/upstream-equal base, real ignored worktree-local dependencies, unchanged package/lock/schema, ignored driver path, absent `cosmile-o1-r2c-pg-20260720`, closed `127.0.0.1:55441`, and no prior R2C artifact.
2. Read only the exact ceiling; freeze the precise existing recovery call graph, injectable failure point, state invariants, and driver diff. Create only the exact protected roots/driver; return `READY_TO_RUN` before DB action. STOP if the real bridge cannot support this without product changes or authorization invention.
3. Start one `postgres:16-alpine` container with `--pull=never`, tmpfs data, synthetic credentials, and `127.0.0.1:55441:5432`; wait with `pg_isready`.
4. Run locked worktree-local Prisma `migrate deploy` once against the committed schema; exactly nine migrations, no manual SQL/schema change.
5. Run only the temporary Vitest driver with the existing worktree Vitest/config in two fresh-process phases against the same disposable DB and count ledger:
   - phase A: seed minimal synthetic capture/full-refund recovery states; use exact one-shot repository failure delegates after each fake-provider success; persist only existing DB state plus the count ledger; exit;
   - phase B: healthy existing repositories; repeat/restart recovery and replay; converge; assert authorization evidence binding, exactly-once count ledger, DB states, reconciliation, and no inventory restoration.
6. The fake transport may model only existing `confirmCapture` and `refundFullCapture` return shapes. It must increment `*_calls` on invocation but increment `*_effects` only from `0` to `1`, returning the same deterministic result thereafter. No socket/fetch/provider URL.
7. Seed through Prisma ORM/existing repository boundaries only; no direct SQL. Category/count/boolean output only. Real money/provider effects remain zero; expected synthetic ledger at exit is `capture_effects=1`, `refund_effects=1`, with calls bounded and replayed effect count unchanged.
8. Unconditionally remove container, driver/worktree temp root, external R2C root/ledger, and mission-created parent temp directories only when empty; verify ports/process/container absent, product Git clean/upstream-equal at unchanged HEAD, and package/lock/schema unchanged.

No install/copy/symlink/generate/build/typecheck/repository or broad test, app/HTTP, provider/network, Google/auth, shared/production DB, real credential/PII, product source/tracked write, R2D-R4, or Reviewer.

## STOP and compact return

STOP for any extra path, product delta, unsupported injection seam, new authorization/economic semantic, schema need, raw identifier output, external call, or uncertain cleanup. Do not patch source or invent a new bridge.

Return at most 45 lines: `SKILL_AND_REFS`, `BASELINE`, `TEMP_PATHS`, `RECOVERY_CALL_GRAPH`, `MIGRATIONS`, `CAPTURE_RECOVERY`, `REFUND_RECOVERY`, `AUTHORIZATION_BINDING`, `RESTART_REPLAY`, `SYNTHETIC_EFFECT_COUNTS`, `DB_INVARIANTS`, `REAL_PROVIDER_EFFECT`, `PRODUCT_WRITES`, `CLEANUP`, `GIT_STATE`, `R2C_VERDICT`, `BLOCKER`, `RETURN_TO`, `STOP`.
