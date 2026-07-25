# Lab Control Correction — Independent Review Handoff

MISSION_ID: `COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1`
REVIEW_NEEDED: `YES`
REVIEW_TIER: `NORMAL_COMPLEX_BOUNDED`
MODEL: Claude Opus 4.8
EFFORT: max
WHY_SELECTED: no product/economic/auth/schema delta; bounded source-to-evidence contract correction
ACTOR: existing independent Foundation Reviewer
SESSION: `foundation-reviewer-fable5`
PRODUCT_WORKTREE: `/home/leo/Project/.worktrees/Cosmile/COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1`
PRODUCT_BASE_CANDIDATE: `6486019e0968de5671e43521e5cfb40d03b0bdca`
PRODUCT_DELTA: none
DOCS_BASE: `bc66a44f4dc556f20a300ec58e746358e58b9b4b`
REVIEW_MODE: read-only, exact delta and load-bearing context only

## Skill

Load `/home/leo/Project/skill/fable-sentinel/SKILL.md` with:

- `contract-review`
- `provenance-review`
- `review-classification`
- `delta-review`

Current Agent Office authority and role documents control; any Foundation-docs V2 material referenced by the skill is historical evidence only where current rules say so.

## Reviewed subject

Directly inspect the exact docs delta from `DOCS_BASE` through the committed launcher candidate, especially:

- `138_LAB_BUTTON_CLASSIFICATION_WORKER_HANDOFF.md`
- `139_LAB_BUTTON_CLASSIFICATION_RESULT.md`
- `140_LAB_BUTTON_CLASSIFICATION_POINTER.md`
- `141_LAB_SCOPED_EVIDENCE_CORRECTION_WORKER_HANDOFF.md`
- `142_LAB_SCOPED_EVIDENCE_RESULT.md`
- `143_LAB_SCOPED_EVIDENCE_POINTER.md`
- predecessor `134_M5_E7_WORKER_RESULT.md`

Load-bearing product context only:

- `app/src/app/layout.tsx`
- `app/src/app/lab/layout.tsx`
- `app/src/app/lab/page.tsx`
- `app/src/app/lab/[capabilityId]/page.tsx`
- `app/src/components/operator/OperatorShell.tsx`
- `app/src/components/layout/AppHeader.tsx`
- `app/src/components/category/CategoryDrawer.tsx`
- `app/src/components/ShippingPopup.tsx`
- `app/src/components/product/ProductCartFab.tsx`
- `app/src/lib/categoryTree.ts`
- `app/scripts/o1_lab_registry.vitest.ts`

## Review questions

1. Do the 13 E7 buttons reconcile exactly to global shell/navigation or harmless accessibility controls?
2. Is any Lab-local product, economic, operational, approval, mutation, promotion, or execution control present?
3. Does `section[aria-labelledby="lab-home-heading"]` faithfully bound the Lab-local surface rather than hide a real control?
4. Do the source contract, 31-link evidence, and zero scoped-control evidence agree?
5. Does the hydration limitation leave a material Lab-local risk, given the actual server/client component sources?
6. Were product behavior, authority, economic semantics, and Git state unchanged?
7. Are evidence provenance, command ceilings, cleanup, and declared deviations internally consistent?

## Ceiling

- Read-only git/source/evidence inspection only.
- No tests, build, browser/runtime, DB, provider, product/docs patch, commit, push, broad repository audit, or unrelated research.
- Reviewer does not accept risk or grant final approval.

## Return

Write only:

- `145_LAB_CONTROL_CORRECTION_INDEPENDENT_REVIEW.md`
- `146_LAB_CONTROL_CORRECTION_REVIEW_POINTER.md`

under the existing mission job. Maximum 80 lines total. Verdict:
`PASS | PASS_WITH_RISK | NEEDS_PATCH | FAIL`. Include actual live model/effort/skill, exact findings, residual risk, `RETURN_TO: foundation-advisor`, and `STOP`.
