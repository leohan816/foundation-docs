# P0 Admission — COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1

INSTRUCTION_GATE: `PROCEED_WITH_LIMITS`
MISSION_TYPE: `DESIGN_AND_BOUNDED_NONPRODUCTION_IMPLEMENTATION`
CLAIM_CEILING: `REVIEWED_NON_PRODUCTION_OPERATOR_DASHBOARD_CORE_INTEGRATION`

## Verified pins and isolation

- Product base: `1e2475a02b9210e382efde7740777684d0cb4dba`;
  source branch and upstream equal; predecessor worktree clean and unmerged.
- Product worktree:
  `/home/leo/Project/.worktrees/Cosmile/COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1`
- Product branch:
  `implementation/cosmile-o1-operator-dashboard-core-v1-20260723`
- Docs base: `a6219c12e69c86d01ede2d4f2262cd74eb54a684`.
- Docs worktree:
  `/home/leo/Project/.worktrees/foundation-docs/COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1`
- Docs branch:
  `advisor/cosmile-o1-operator-dashboard-core-v1-20260723`
- Both new worktrees start clean. Dirty primary repository worktrees are
  unrelated and will not be touched or staged.

## Actor/runtime binding

- Designer: existing `foundation-designer` Codex runtime,
  `gpt-5.6-sol/max`, idle.
- Primary Cosmile Worker: existing `cosmile:claude.0`,
  Claude Opus 4.8/xhigh, idle.
- Preserved fallback: existing `cosmile:codex-m1d-recovery.0`,
  `gpt-5.6-sol/xhigh`, idle; use only after documented primary non-convergence.
- Independent Reviewer: existing `foundation-reviewer-fable5`,
  Fable 5/max, idle.
- Existing processes remain physically rooted at the completed predecessor
  worktree because process restart/termination is prohibited. Every P1 command
  must bind explicitly to the exact new task worktree above. If an Actor cannot
  execute with that exact task workspace without a restart, it must return HOLD;
  no restart, substitute, or new runtime is inferred.
- No Control, Council, Foundation Worker, new Actor, or concurrent Writer is
  selected.

## P0 limits

- P1 is read-only product census plus exact docs result files only.
- No product write, schema/migration/DB, build/test/runtime, secret/env, provider,
  economic action, production/live/PII, deployment, merge, or AI/Memory work.
- Every dashboard surface must be classified before replacement or retirement.
- Any schema need, broad rewrite, unsafe authorization change, runtime restart
  need, or material expansion returns to Strategy/Leo.

NEXT: parallel non-colliding read-only Designer and Cosmile Worker census.
