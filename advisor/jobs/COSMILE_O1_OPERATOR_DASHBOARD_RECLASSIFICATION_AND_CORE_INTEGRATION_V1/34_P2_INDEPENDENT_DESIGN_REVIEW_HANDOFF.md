# Independent Design Review Handoff

MISSION_ID: `COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1`
PHASE: `P2_INDEPENDENT_DESIGN_REVIEW`
REVIEW_NEEDED: `YES`
REVIEW_TIER: `HARD_IMPORTANT_SAFETY`
MODEL/EFFORT: `Fable 5/max`
WHY_SELECTED: the design places existing full-refund, protected recovery, operator authorization, nonce, audit, and inventory-HOLD truth inside a new permanent Console destination.
ACTOR: existing independent Foundation Reviewer
SESSION: `foundation-reviewer-fable5:claude.0`
SKILL: `/fable-sentinel`
APPLICABLE_REFERENCES: `review-classification`, `delta-review`, `safety-review`, `contract-review`, `provenance-review`
RETURN_TO: `foundation-advisor`

## Pinned subject

- Product worktree: `/home/leo/Project/.worktrees/Cosmile/COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1`
- Branch: `implementation/cosmile-o1-operator-dashboard-core-v1-20260723`
- Base: `1e2475a02b9210e382efde7740777684d0cb4dba`
- Candidate: `33bf8162f0725fb514dfb9ac32c29fddb12b9df4`
- Exact candidate delta:
  1. `설계자료/COSMILE_O1_독립운영콘솔_통합설계서.md`
  2. `설계자료/COSMILE_O1_독립운영콘솔_데스크톱.svg`
  3. `설계자료/COSMILE_O1_독립운영콘솔_모바일.svg`
- Docs worktree: `/home/leo/Project/.worktrees/foundation-docs/COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1`
- Docs HEAD: `eb9aa9b76d3540315e43077587ba28ab37c46ba9`

Supplemental evidence only:

- `20_P1_DESIGNER_CENSUS_RESULT.md`
- `21_P1_WORKER_CENSUS_RESULT.md`
- `22_P1_ADVISOR_INTEGRATED_DISPOSITION.md`
- `31_P2_DESIGNER_CANDIDATE_RESULT.md`
- early read-only `33_P3_WORKER_TECHNICAL_MAPPING_RESULT.md`

The early P3 mapping is not a freeze, approval, or implementation authority.

## Review boundary

Read-only independent review. Do not patch, implement, commit, push, run tests/build/typecheck/DB/runtime/provider/network, dispatch, or accept risk.
Write only:

- `advisor/jobs/COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1/35_P2_INDEPENDENT_DESIGN_REVIEW_RESULT.md`
- `advisor/jobs/COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1/36_P2_INDEPENDENT_DESIGN_REVIEW_POINTER.md`

Leave both uncommitted. Temporary original-size SVG rendering is allowed only outside both repositories and must be removed.

Inspect only the exact three-file delta, the supplemental evidence above, and the minimum load-bearing source context cited by P1/P3:

- Console shell/nav;
- `/o1/operator` queue/detail/panel;
- existing O1 operator API routes;
- `o1CommerceRuntime`, `o1ReliabilityRuntime`, `o1LegacyLaneIsolation`.

No broad repository audit or test execution.

## Required questions

1. Does the candidate define one independent Korean-first Console, with `/o1/operator` and legacy write/chat treated only as transition/retirement evidence and no premature deletion?
2. Does it stop at the minimum O1 core integration rather than a complete Console product?
3. Are price, listing, event, AI collaboration, automation, advanced analytics, marketing/reviews, and Agent Control Center visibly `DEFERRED`, nonfunctional, and free of routes/forms/actions/fake live output?
4. Does every connected view/action preserve the existing server-side O1 allowlist, step-up, nonce, idempotency, audit, lane-isolation, TEST-only refund, record-only shipment, and inventory-HOLD semantics without new economic authority?
5. Are state/error/HOLD/recovery projections truthful, fail-closed, and non-fabricated?
6. Is mobile limited to overview and queue triage while protected/complex actions remain desktop-first?
7. Is the 87-row Designer and 27-row Worker mapping complete and internally consistent?
8. Are the desktop/mobile SVGs structurally usable and aligned with the design, noting the local Korean-font rendering limitation?
9. Does the early P3 WorkUnit mapping preserve the reviewed design, or does it introduce a conflict? Decide specifically:
   - whether five active navigation destinations are justified inside the nine-item IA;
   - whether `/console` root and legacy `/console/settings` may be repaired within the minimum independent Console scope without deleting or redirecting legacy evidence;
   - whether “reuse semantics, not the file” risks reimplementing `O1OperatorPanel` authority/action logic instead of composing it safely.
10. Is schema/migration effect `NONE` and economic-authority effect `NONE` supportable?

## Verdict

Return exactly one:

`PASS | PASS_WITH_CORRECTIONS | HOLD | FAIL`

List only blocking/material findings with severity, exact affected path/section, evidence, and smallest bounded correction. State whether product writes may proceed after Advisor integration. Result ceiling: 80 lines unless a named safety finding requires a declared length exception.

REVIEWER makes no patch and grants no final mission approval.
RETURN_TO: `foundation-advisor`
STOP.
