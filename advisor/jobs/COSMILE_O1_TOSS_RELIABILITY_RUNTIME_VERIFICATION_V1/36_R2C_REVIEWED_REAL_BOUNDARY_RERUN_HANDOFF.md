# R2C Reviewed Real-Boundary Rerun — Cosmile Worker

MISSION_ID: `COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1`
MODULE: `R2C_REVIEWED_REAL_BOUNDARY_RERUN`
PRODUCT_HEAD: `c8c18b5cd0c4c01d8fdcbb1601265db3d6855cf3`
WORKTREE: `/home/leo/Project/.worktrees/Cosmile/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1`
ACTOR: existing `cosmile:0.0` / Cosmile Worker / Opus 4.8 / xhigh
SKILL: `/fable-builder`; `implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`; `implementation-report-template` only for compact return.
VERIFICATION: `DELTA_ONLY_VERIFICATION: REQUIRED`

## Accepted seam and exact execution contract

The non-production seam at `c8c18b5` passed independent `HARD_IMPORTANT_SAFETY` review:

- review handoff: `34_R2C_INJECTION_SEAM_INDEPENDENT_REVIEW_HANDOFF.md` at docs `74704a048ba3173a66b9ea86db746d72321e76e7`;
- verdict: `PASS`, blocking findings `0`;
- result: `/home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1/reviewer/50_R2C_SEAM_REVIEW.md`;
- reviewer: Fable 5 / max / `/fable-sentinel`, fresh independent context.

Execute the exact already-frozen runtime contract in `32_R2C_RECOVERY_BRIDGE_EXACTLY_ONCE_HANDOFF.md`. Its objectives, product read ceiling, one disposable PostgreSQL boundary, nine committed migrations, real `runO1RecoveryBridge` composition, real Prisma repositories, count-only fake transport, two fresh-process phases, exactly-once invariants, zero-provider/economic ceiling, prohibited actions, and cleanup rules remain unchanged.

This is a fresh evidence rerun after review, not R2B and not a product change. Do not overwrite prior evidence `40_`/`41_`.

## Exact current paths and differences from handoff 32

- worktree temp root: `app/scripts/tmp/cosmile-o1-r2c-reviewed-rerun/` (`0700`, ignored);
- driver: `r2c_recovery_bridge_reviewed.vitest.ts` (`0600`, create with `apply_patch`, delete after run);
- external root: `/home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1/r2c-reviewed-rerun/` (`0700`);
- count-only ledger: `provider_effect_counts.json` (`0600`);
- disposable container: `cosmile-o1-r2c-reviewed-pg-20260720`;
- loopback PostgreSQL port: `55443`;
- result: `/home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1/worker/52_R2C_REVIEWED_RERUN_RESULT.md` (`0600`, at most 45 lines);
- pointer: `/home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1/worker/53_R2C_REVIEWED_RERUN_POINTER.md` (`0600`).

Before DB action, verify the exact base, clean/upstream-equal Git state, local toolchain presence, absent container/port/temp paths, and the accepted seam review. Create only the authorized roots/driver and report `READY_TO_RUN`. Then execute exactly the two-phase focused proof from handoff 32. No provider/network, Google, app/HTTP, R2D/R3/R4, product write, install, generate, build, typecheck, broad test, Reviewer, or extra path.

Unconditionally remove container, driver/root, ledger/external root, and attributable empty parents. Prove port/container/process/temp absence, package/lock/schema unchanged, and clean/upstream-equal product Git at `c8c18b5`.

Return only compact indexed outcomes: skill/refs, base, migrations, capture/refund recovery, authorization binding, restart/replay, synthetic effect counts, DB invariants, real-provider effect, product writes, cleanup, Git state, verdict/blocker, and `STOP`.
