# R2C Non-production Injection Seam Correction — Cosmile Worker

MISSION_ID: `COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1`
MODULE: `R2C_CORRECTION`
PRODUCT_BASE: `6e43735e496a93597a1f3423f88f9966aeba758b`
PRODUCT_WORKTREE: `/home/leo/Project/.worktrees/Cosmile/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1`
WORKER: existing `cosmile:0.0` / Cosmile Worker / Opus 4.8 / xhigh
SKILL: `/fable-builder`; read `implementation-execution`, `contract-to-code-mapping`, and `test-design-before-code`; read `implementation-report-template` only for the return.
VERIFICATION: `DELTA_ONLY_VERIFICATION: REQUIRED`
REVIEW_TIER: `SMALL` module correction; no separate Reviewer now. Cumulative payment/state review remains `HARD_IMPORTANT_SAFETY` at R5.

## Exact objective and path ceiling

Add the smallest non-production-only dependency-injection seam needed for the R2C disposable runtime to drive the **existing** `runO1RecoveryBridge` composition with a deterministic fake transport and bounded repository failure delegates. Do not duplicate convergence closures or change payment/refund/order semantics.

Only these tracked paths may change:

1. `app/src/lib/runtime/o1ReliabilityRuntime.ts`
2. `app/scripts/o1_toss_recovery_bridge.vitest.ts`

If any type, contract, repository, schema, route, or other path is required, STOP before editing.

## Frozen behavior

- Preserve the existing default `runO1RecoveryBridge(env, options?)` path and all current callers.
- Add one optional internal non-production test override seam only at this composition root. It may substitute only dependencies already consumed by the same existing capture/refund convergence composition; it must not expose a route, caller-selected economic input, identifier, or new service.
- The existing private convergence functions remain the single implementation. Do not copy, export, or reimplement them in the test or a temporary driver.
- Overrides must fail closed before any injected dependency is called when the runtime is production or the existing O1 non-production gate is not ready.
- No override may change amount, currency, order/capture/refund identity, idempotency key, authorization proof, lease fencing, settlement order, or exactly-once behavior.
- Default execution without overrides must retain the existing transport/repository resolution and behavior.

## Tests-first command ceiling

1. Add focused named tests in the existing Vitest file for: production/not-ready override refusal with zero injected calls; non-production override entry through the same composition; and unchanged default dependency resolution contract.
2. Run only those exact named tests with `-t`; preserve RED.
3. Patch only the runtime file.
4. Run the identical named tests with `-t`; require GREEN.
5. Inspect the exact two-path diff, prove no tracked/untracked side effect beyond those paths, then make one additive commit and non-force push.

No DB, provider/network, app/runtime, install, generate, build, typecheck, full file/suite, schema/migration, documentation, R2D/R3/R4, or additional command. If the existing toolchain cannot run the named tests without environment changes, STOP.

## Return and STOP

Return at most 35 lines: `SKILL_AND_REFS`, `BASE`, `RED`, `GREEN`, `CHANGED_PATHS`, `DEFAULT_PATH`, `NONPROD_GATE`, `SEMANTICS`, `SIDE_EFFECTS`, `COMMIT`, `PUSH`, `GIT_STATE`, `VERDICT`, `BLOCKER`, `STOP`.
