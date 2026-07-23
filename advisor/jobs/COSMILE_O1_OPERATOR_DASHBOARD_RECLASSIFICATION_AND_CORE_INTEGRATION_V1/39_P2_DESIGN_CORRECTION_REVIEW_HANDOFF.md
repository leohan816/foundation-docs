# P2 Design Correction Review Handoff

MISSION_ID: `COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1`
PHASE: `P2_DESIGN_CORRECTION_REVIEW`
ACTOR: existing independent Foundation Reviewer
SESSION: `foundation-reviewer-fable5:claude.0`
REVIEW_CONTEXT: continuation of the admitted `HARD_IMPORTANT_SAFETY` design review
MODEL/EFFORT: `Fable 5/max`
SKILL: `/fable-sentinel`
APPLICABLE_REFERENCES: prior-loaded `delta-review`, `safety-review`, `contract-review`, `provenance-review`
RETURN_TO: `foundation-advisor`

## Exact subject

- Product worktree: `/home/leo/Project/.worktrees/Cosmile/COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1`
- Branch: `implementation/cosmile-o1-operator-dashboard-core-v1-20260723`
- Pre-correction: `33bf8162f0725fb514dfb9ac32c29fddb12b9df4`
- Correction candidate: `2aeb6e2afba8543af10fdf983b2876b0871d07fa`
- Exact changed paths:
  1. `설계자료/COSMILE_O1_독립운영콘솔_통합설계서.md`
  2. `설계자료/COSMILE_CONSOLE_IA_V2.md`
  3. `설계자료/COSMILE_콘솔_설계서.md`
- Prior review: `35_P2_INDEPENDENT_DESIGN_REVIEW_RESULT.md`
- Correction evidence: `38_P2_DESIGN_CORRECTION_RESULT.md`
- Docs HEAD: `83a9fc55cfc60458b413e18dcec6c58bd4c422aa`

## Review boundary

Read only the exact `33bf816..2aeb6e2` hunks, prior findings F1/F2, and correction result 38. Do not reread the full design/source/census.
No tests, build, typecheck, DB, runtime, provider, network, rendering, patch, commit, push, dispatch, or risk acceptance.

Write only these uncommitted docs files:

- `advisor/jobs/COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1/40_P2_DESIGN_CORRECTION_REVIEW_RESULT.md`
- `advisor/jobs/COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1/41_P2_DESIGN_CORRECTION_REVIEW_POINTER.md`

## Required findings closure

1. F1: confirm both legacy design documents carry precise scoped supersession pointers, the new design names their relationship, historical/deferred evidence remains retained, and no deletion/redirect/implementation approval was introduced.
2. F2: confirm the new design requires direct import or one shared pure-module extraction of `classifyOperatorRequestMode`, `operatorActionSurface`, and closed vocabulary; forbids copying/retyping/recomputation; excludes the legacy dual-action surface; and requires focused tests-first verification without changing server protections.
3. Confirm the correction changed no SVG, runtime/source/API/test/config/schema/migration/DB/provider/economic-authority or feature scope.

Return exactly `PASS | HOLD`. `PASS` means F1/F2 are closed for Advisor integration and P3/P4 design freeze may proceed; it is not implementation or final mission approval.
Result ≤40 lines; pointer compact.

RETURN_TO: `foundation-advisor`
STOP.
