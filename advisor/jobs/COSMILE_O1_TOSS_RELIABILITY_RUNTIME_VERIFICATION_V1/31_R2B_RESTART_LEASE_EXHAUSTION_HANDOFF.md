# R2B Restart, Lease, and Exhaustion — Cosmile Worker

MISSION_ID: `COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1`
MODULE: `R2B_RESTART_LEASE_EXHAUSTION`
PRODUCT_BASE: `c8c18b5cd0c4c01d8fdcbb1601265db3d6855cf3`
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
- `app/prisma/schema.prisma` and the nine committed `migration.sql` files only.

No product source, tracked path, or ignored worktree path may be edited, staged, committed, or generated.

## Exact temporary/output paths

- One owner-only execution root outside the product worktree: `/home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1/r2b-native/` (`leo:leo`, `0700`).
- One temporary driver only: `/home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1/r2b-native/r2b_native_driver.ts` (`leo:leo`, `0600`), created with `apply_patch` and removed before return.
- Durable result: `/home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1/worker/46_R2B_NATIVE_RERUN_RESULT.md` (`0600`).
- Durable pointer: `/home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1/worker/47_R2B_NATIVE_RERUN_POINTER.md` (`0600`).

No log, PID, config, raw payload/response, identifier, or other artifact. Runtime identifiers are generated in process and never printed. Output is counts, booleans, durations, and state categories only.

## Frozen command/action ceiling

1. Verify exact clean/upstream-equal base, unchanged package/lock/schema, absent `cosmile-o1-r2b-pg-20260720`, closed `127.0.0.1:55440`, and absent native execution root.
2. Reuse the passed native-loader contract: Node 24 `node:module.registerHooks` maps only `@/` to regular `.ts` or `index.ts` files below the exact worktree `app/src` root. Create only the protected external root/driver. No loader package, config, product path, or alternate resolution mechanism. Return `READY_TO_RUN` before DB action.
3. Start one local `postgres:16-alpine` container with `--pull=never`, tmpfs data, synthetic credentials, and `127.0.0.1:55440:5432`; wait with `pg_isready`.
4. Run the locked worktree-local Prisma `migrate deploy` once against the committed schema; exactly nine migrations, no manual SQL/schema change.
5. Run only the exact temporary driver with installed Node 24 native TypeScript support and its in-process alias hook. The driver may use multiple exact named invocations through an environment phase solely for one deliberate process exit/relaunch pair and the deterministic attempt sequence. It may dynamically import only `app/src/lib/payment/repository.ts`, `app/src/lib/payment/reliability.ts`, and `app/src/lib/runtime/o1ReliabilityRuntime.ts` as R2B entry modules. No Vitest, `tsx`, config, loader package, Python DB test, app/Next runtime, repository test, or other executable may run.
6. The driver may seed only the minimal synthetic Order/PaymentIntent/WebhookEventInbox/ReconciliationTask state needed for the named proofs through existing repository/runtime boundaries. No direct SQL and no economic row/effect.
7. Use explicit deterministic clocks; do not sleep for backoff durations. The restart proof must persist only DB state, terminate the first driver process cleanly after acquiring one lease, and use the same driver in a fresh process to prove live-lease denial then expired-lease reclaim/fencing. Temporary deferred controls must be cleaned in a `finally` path so one failed assertion cannot contaminate the later exhausted/nonclaimable proof.
8. Unconditionally remove container and the exact external execution root/driver; verify their absence, port/process/container absence, product Git clean/upstream-equal at unchanged HEAD, and unchanged package/lock/schema.

No install/copy/symlink/generate/build/typecheck/Vitest/repository or broad test suite, app/server, provider/network, Google/auth, shared/production DB, real credential/PII, product or ignored-worktree write, R2C-R4, or Reviewer.

## STOP and return

STOP for any extra path, product delta, unresolved module loader requiring config/install, direct SQL need, schema drift, provider/economic action, real-time long wait, raw identifier output, or uncertain cleanup. Do not explore alternatives or patch source.

Return at most 40 lines: `SKILL_AND_REFS`, `BASELINE`, `TEMP_PATHS`, `MIGRATIONS`, `LEASE_RESTART_MATRIX`, `BACKOFF_EXHAUSTION_MATRIX`, `OUT_OF_ORDER_FENCING`, `PROJECTION_NONCLAIMABLE`, `ECONOMIC_EFFECT_COUNT`, `PROVIDER_CONTACT`, `PRODUCT_WRITES`, `CLEANUP`, `GIT_STATE`, `R2B_VERDICT`, `BLOCKER`, `RETURN_TO`, `STOP`.
