# R2B Restart, Lease, and Exhaustion — Cosmile Worker

MISSION_ID: `COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1`
MODULE: `R2B_RESTART_LEASE_EXHAUSTION`
PRODUCT_BASE: `6e43735e496a93597a1f3423f88f9966aeba758b`
PRODUCT_WORKTREE: `/home/leo/Project/.worktrees/Cosmile/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1`
WORKER: existing `cosmile:0.0` / Cosmile Worker / Opus 4.8 / xhigh
SKILL: `/fable-builder`; `implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`; `implementation-report-template` only for return.
INSTRUCTION_GATE: `PROCEED_WITH_LIMITS`
PRODUCT_SOURCE_OR_TRACKED_WRITE: `PROHIBITED`
PROVIDER_OR_GOOGLE_CONTACT: `PROHIBITED`
REVIEW: no module Reviewer; cumulative payment/state review remains deferred to final `HARD_IMPORTANT_SAFETY` admission.

## Exact objective

Using one disposable PostgreSQL database and controlled local/fake verification only, prove:

1. only due `pending` rows with expired/no lease are claimable;
2. claim atomically increments attempt count and `leaseVersion` and returns the fence token;
3. a live lease is not reclaimed, an expired lease is reclaimed after process restart, and the stale token cannot settle/reschedule/exhaust;
4. unresolved attempts 1–6 schedule only `[1,4,16,64,256,1024]` minutes;
5. unresolved attempt 7 becomes `exhausted`, clears due/lease, and opens/reuses exactly one `webhook_unverified` reconciliation task;
6. exhausted rows remain visible in repository projection but nonclaimable and are never reported complete;
7. delayed/out-of-order distinct inbox rows are selected as the exact expected set and remain independently fenced; no latest/global guess or coalescing. Do not assert PostgreSQL `UPDATE ... RETURNING` raw array order; the contract orders selection, not returned-array presentation;
8. `PaymentTransaction=0`, `Refund=0`, and capture/refund/order/inventory effects remain zero.

Do not run recovery bridge, operator HTTP, provider transport, or R2C/R2D/R3/R4.

## Exact product read ceiling

- `app/src/lib/payment/contracts.ts`
- `app/src/lib/payment/repository.ts`
- `app/src/lib/payment/reliability.ts`
- `app/src/lib/runtime/o1ReliabilityRuntime.ts`
- `app/scripts/o1_toss_reliability_contract.vitest.ts`
- `app/scripts/o1_toss_reliability.dbtest.py`
- `app/vitest.config.ts` only as the existing alias-aware execution configuration.
- `app/prisma/schema.prisma` and the nine committed `migration.sql` files only.

No product source or tracked path may be edited, staged, committed, or generated; the one exact ignored temporary driver path below is the sole worktree write.

## Exact temporary/output paths

- One ignored private execution root inside the worktree: `app/scripts/tmp/cosmile-o1-r2b-runtime-verification/` (`leo:leo`, `0700`; first prove `git check-ignore` resolves to the existing `tmp/` rule). This exact path is also inside the existing Vitest `scripts/**/*.vitest.ts` include; no config change is permitted.
- One driver only: `app/scripts/tmp/cosmile-o1-r2b-runtime-verification/r2b_reliability_driver.vitest.ts` (`leo:leo`, `0600`), created with `apply_patch` and removed before return.
- Durable result: `/home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1/worker/36_R2B_CORRECTED_RESULT.md` (`0600`).
- Durable pointer: `/home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1/worker/37_R2B_CORRECTED_POINTER.md` (`0600`).

No log, PID, config, raw payload/response, identifier, or other artifact. Runtime identifiers are generated in process and never printed. Output is counts, booleans, durations, and state categories only.

## Frozen command/action ceiling

1. Verify exact clean/upstream-equal base, real ignored worktree-local `app/node_modules`, unchanged package/lock/schema, absent `cosmile-o1-r2b-pg-20260720`, and closed `127.0.0.1:55440`.
2. Read only the exact ceiling, freeze a compact contract-to-code map, prove the exact execution root is ignored, then create only the protected root/driver. Return `READY_TO_RUN` before DB action.
3. Start one local `postgres:16-alpine` container with `--pull=never`, tmpfs data, synthetic credentials, and `127.0.0.1:55440:5432`; wait with `pg_isready`.
4. Run the locked worktree-local Prisma `migrate deploy` once against the committed schema; exactly nine migrations, no manual SQL/schema change.
5. Run only the exact temporary driver with the already-existing worktree-local `app/node_modules/.bin/vitest` and `app/vitest.config.ts`; no repository test file or test name may run. The driver may use multiple exact named invocations through an environment phase solely for one deliberate process exit/relaunch pair and the deterministic attempt sequence. This focused temporary runtime driver is the bounded alias-aware loader correction for the absent `tsx`; no additional config or dependency is permitted. No Python DB test, app/Next runtime, or other executable may run.
6. The driver may seed only the minimal synthetic Order/PaymentIntent/WebhookEventInbox/ReconciliationTask state needed for the named proofs through existing repository/runtime boundaries. No direct SQL and no economic row/effect.
7. Use explicit deterministic clocks; do not sleep for backoff durations. The restart proof must persist only DB state, terminate the first driver process cleanly after acquiring one lease, and use the same driver in a fresh process to prove live-lease denial then expired-lease reclaim/fencing. Temporary deferred controls must be cleaned in a `finally` path so one failed assertion cannot contaminate the later exhausted/nonclaimable proof.
8. Unconditionally remove container and the exact ignored execution root/driver; verify their absence, port/process/container absence, product Git clean/upstream-equal at unchanged HEAD, and unchanged package/lock/schema.

No install/copy/symlink/generate/build/typecheck/repository or broad test suite, app/server, provider/network, Google/auth, shared/production DB, real credential/PII, product source/tracked write, R2C-R4, or Reviewer.

## STOP and return

STOP for any extra path, product delta, unresolved module loader requiring config/install, direct SQL need, schema drift, provider/economic action, real-time long wait, raw identifier output, or uncertain cleanup. Do not explore alternatives or patch source.

Return at most 40 lines: `SKILL_AND_REFS`, `BASELINE`, `TEMP_PATHS`, `MIGRATIONS`, `LEASE_RESTART_MATRIX`, `BACKOFF_EXHAUSTION_MATRIX`, `OUT_OF_ORDER_FENCING`, `PROJECTION_NONCLAIMABLE`, `ECONOMIC_EFFECT_COUNT`, `PROVIDER_CONTACT`, `PRODUCT_WRITES`, `CLEANUP`, `GIT_STATE`, `R2B_VERDICT`, `BLOCKER`, `RETURN_TO`, `STOP`.
