# P6 Recovery Override Type-Query Correction — Worker Result

MISSION: `COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1` · WU `P6_RECOVERY_OVERRIDE_TYPE_QUERY_CORRECTION`.
ACTOR: Cosmile Worker (Opus 4.8/xhigh) · `/fable-builder`. Handoff 107 verified SHA256 `c79731f4…` ✓ blob `1d26687b…` ✓ (docs HEAD `60fdbbd9`). BASE `f212747` → HEAD **`33e0d85`** clean/upstream-equal (non-force push `f212747..33e0d85`). Result uncommitted. Only the result-106 first post-refresh build failure was in scope; no sweep. Codex idle.

## Exact 1 path — two type-only edits

`app/src/lib/runtime/o1ReliabilityRuntime.ts`, interface `NonprodRecoveryBridgeOverride`: the two members that indexed exported repository **values** as if they were types were corrected to the `typeof` type-query:
- line 283 `recoveryReadRepository: import("@/lib/payment/repository")["recoveryReadRepository"]` → `(typeof import("@/lib/payment/repository"))["recoveryReadRepository"]`;
- line 284 `orderRepository: import("@/lib/order/repository")["orderRepository"]` → `(typeof import("@/lib/order/repository"))["orderRepository"]`.

`git diff --numstat` = `2  2` (two type-annotation lines). Preserved unchanged: imports, runtime code, the fail-closed override order, provider/economic authority, and all tests. `(typeof import("..."))["value"]` is the correct type-query for a value export; the prior `import("...")["value"]` used a value in type position (the exact error preserved in result 106).

## RED/GREEN — truthful record

Ran the frozen named safety test `R2C seam · production / not-ready WITH an override fails closed BEFORE any injected delegate is touched` in `scripts/o1_toss_recovery_bridge.vitest.ts` (`--cache=false`, temp symlink) once **before** and once **after**:

- Before: **1 passed | 18 skipped**, exit 0 — **GREEN, not RED** (the fix is type-only and Vitest does not type-check, so the annotation defect did not fail this behavioral test at runtime). Reported straight per the handoff.
- The **authoritative RED is the preserved P6 build type-check failure** (result 106: `Module '@/lib/payment/repository' does not refer to a type, but is used as a type here` at line 283), which handoff 107 designates as authoritative and forbids re-running build/Prisma here.
- After: identical named command, **1 passed | 18 skipped**, exit 0 — GREEN. The R2C fail-closed-before-any-injected-delegate safety behavior is unchanged.

## Effects / cleanup / rollback

Runtime/override/fail-closed/provider/economic/import/test change: **0** — two type-annotation expressions only. One-path containment proven (`git diff --cached --name-only` = the single source path). Dependency: worktree `node_modules` absent pre-run; temp symlink → canonical, removed after each run; canonical `package.json`=`a486716…`/`package-lock.json`=`36dfa1a…` byte-identical pre/post; no symlink/cache/process residue. Git: one additive commit, non-force push only, no main/force. Rollback: `git revert 33e0d85`.

RETURN_TO: `foundation-advisor` · STOP before the next private-client P6 gate. This addresses the result-106 `o1ReliabilityRuntime.ts:283` value-as-type error. The full P6 gate — which for the `serviceRequest`/`OrderInclude` truth requires the private Prisma-client refresh procedure (handoff 105), since the canonical generated client remains stale — is the authoritative next step; not run here per scope.
