# INDEPENDENT DESIGN REVIEW HANDOFF

MISSION_ID: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1`
PHASE: `M1_INDEPENDENT_DESIGN_REVIEW`
REVIEW_NEEDED: `YES`
REVIEW_TIER: `NORMAL_COMPLEX_BOUNDED`
MODEL: `Claude Opus 4.8`
EFFORT: `max`
WHY_SELECTED: bounded source-to-design review with no product, DB, authority, or economic delta
SKILL: `/fable-sentinel`
APPLICABLE_REFERENCES: `review-classification`, `contract-review`, `delta-review`

## Exact subjects

- Product repository: `/home/leo/Project/.worktrees/Cosmile/COSMILE_CORE_OPERATIONS_DASHBOARD_V1`
- Product branch: `implementation/cosmile-core-operations-dashboard-v1-20260725`
- Product HEAD: `6486019e0968de5671e43521e5cfb40d03b0bdca`
- Docs repository: `/home/leo/Project/.worktrees/foundation-docs/COSMILE_CORE_OPERATIONS_DASHBOARD_V1`
- Docs branch: `advisor/cosmile-core-operations-dashboard-v1-20260725`
- Docs candidate HEAD: `0e29bbe93998e2dba331c6cbb0054e32005b62d9`
- Review delta: docs `8091e71b6f3b202c2b31bfbc13f03589db8f7f5b..0e29bbe93998e2dba331c6cbb0054e32005b62d9`

Review only:

1. `11_DESIGNER_DESKTOP_OPERATIONS_CONTRACT.md`
2. `12_DESIGNER_DESKTOP_OPERATIONS_MOCKUP.svg`
3. `13_DESIGNER_RESULT.md`
4. `14_DESIGNER_POINTER.md`

Minimum load-bearing product context:

- `app/src/app/layout.tsx`
- `app/src/components/operator/OperatorShell.tsx`
- `app/src/app/dashboard/layout.tsx`
- `app/src/app/dashboard/page.tsx`
- `app/src/app/dashboard/orders/page.tsx`
- `app/src/app/dashboard/fulfillment/page.tsx`
- `app/src/app/dashboard/finance/page.tsx`
- `app/src/app/dashboard/activity/page.tsx`
- `app/src/app/console/page.tsx`
- `app/src/app/lab/page.tsx`
- `app/src/components/console/O1ConsoleQueue.tsx`
- `app/src/lib/console/o1ConsoleView.ts`

## Review questions

1. Does the contract faithfully map current source and the observed Storefront-shell collision without inventing runtime truth?
2. Does it specify the exact 11-item Korean-first, desktop operations IA and keep action queues before summary facts?
3. Are `CONFIRMED`, `CONFIRMED_ZERO`, `UNAVAILABLE`, `NOT_CONFIGURED`, `NOT_IMPLEMENTED`, and `DENIED` semantically distinct and fail closed?
4. Are unsupported audit, aggregate inventory, product/customer KPI reads shown without fabricated zero or accidental action authority?
5. Are `/console` conversation/planning semantics and `/lab` read-only semantics preserved?
6. Are responsive, keyboard, focus, 200% zoom, reduced-motion, screen-reader, and Korean-glyph requirements sufficient and testable?
7. Does the mockup implement the contract without Storefront/device/promo/cart chrome or dashboard vanity-KPI patterns?
8. Is the design implementable through bounded reuse rather than redesign, schema work, or new economic/authorization behavior?

## Authority and execution

- Read current Agent Office Reviewer rules and `/home/leo/Project/skill/fable-sentinel/SKILL.md`; load only the named references.
- Read-only exact design delta and minimum product context only.
- Do not run tests/build/typecheck/browser/provider/DB commands.
- Do not patch, commit, push, implement, redesign, or expand review scope.
- Preserve the Korean-font visual-validation limitation as a finding unless disproved by existing evidence.
- Return `PASS | PASS_WITH_RISK | HOLD`, blocking findings first, no risk acceptance.

## Exact outputs

Write only:

- `advisor/jobs/COSMILE_CORE_OPERATIONS_DASHBOARD_V1/21_INDEPENDENT_DESIGN_REVIEW.md`
- `advisor/jobs/COSMILE_CORE_OPERATIONS_DASHBOARD_V1/22_INDEPENDENT_DESIGN_REVIEW_POINTER.md`

Result ceiling: 80 lines. No commit or push. Return to `foundation-advisor` and `STOP`.
