# Designer handoff — Dashboard acceptance correction

MISSION: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1`
PHASE: `M5C_DESIGN_ONLY`
DECISION: `PROCEED_WITH_LIMITS`
RETURN_TO: `foundation-advisor`

## Live subject

- Product: `/home/leo/Project/.worktrees/Cosmile/COSMILE_CORE_OPERATIONS_DASHBOARD_V1`
- Branch/HEAD: `implementation/cosmile-core-operations-dashboard-v1-20260725@c5b7edd79dfe995c5be5e1fdc84cccf696f6b8a9`
- Clean/upstream-equal; product write prohibited.
- Inspect only:
  1. `app/src/components/operator/OperatorShell.tsx` (blob `adb3a781520e3f23f33a7dbbffc6b9c346f7c694`)
  2. `app/src/app/dashboard/page.tsx` (blob `65b33ae6fe20afb4d6a94c863174855cdb49c4f0`)
  3. `app/scripts/o1_core_dashboard_shell.vitest.ts`
  4. `app/scripts/o1_core_dashboard_reads.vitest.ts`
- Current facts: `OperationsNav` is a 250px left rail only at `lg`; below it becomes a horizontal strip. Home reuses three reviewed reads but renders five verbose seven-field ledger rows. The order read is bounded and exposes only opaque order number + category/status, without customer/economic/provider fields.

## Founder acceptance contract

Design the smallest correction that makes Dashboard an obvious desktop operations workspace:

- persistent 250px LEFT sidebar on desktop; not a top strip and not displaced by page scroll;
- action queue first, then a concise operational summary;
- obvious entries for existing Dashboard, Orders, Fulfillment, Support, Reconciliation, Audit, Settings routes;
- Customers, Products, Inventory, Payments & Refunds remain inert and visibly `UNAVAILABLE` or `NOT_IMPLEMENTED`;
- recent-order summary only if the already-reviewed bounded order result can be reused without a second read or broader fields;
- preserve the six truthful states, Korean-first copy, synthetic/non-production warning, keyboard focus, reduced-motion floor, and responsive access;
- preserve `/console` and `/lab`; no Storefront chrome.

No mock KPIs, revenue, invented zero, new route/read contract, command, mutation, economic/provider/DB effect, authority bypass, schema, feature, or redesign.

## Required skill and two-pass output

Load `/frontend-design` from:
`/home/leo/.claude/plugins/marketplaces/claude-plugins-official/plugins/frontend-design/skills/frontend-design/SKILL.md`.

Pass 1: define 4–6 named hex tokens, type roles using the existing stack, one desktop/responsive ASCII layout, and one restrained signature element specific to operational triage.

Pass 2: identify and remove generic dashboard/KPI patterns; state the revision. Then specify exact hierarchy, copy, dimensions, sticky/scroll behavior, focus/mobile behavior, and source-to-design mapping.

## Exact output paths

Write only these four documentation paths under the current foundation-docs worktree:

1. `87_DESIGNER_DASHBOARD_ACCEPTANCE_CORRECTION_CONTRACT.md`
2. `88_DESIGNER_DASHBOARD_ACCEPTANCE_CORRECTION.svg`
3. `89_DESIGNER_DASHBOARD_ACCEPTANCE_CORRECTION_RESULT.md`
4. `90_DESIGNER_DASHBOARD_ACCEPTANCE_CORRECTION_POINTER.md`

The SVG must be a 1440×900 desktop mockup and must show the 250px left rail and revised Dashboard home at original size. Open/inspect it once. Result ≤80 lines and evidence-indexed. No commit/push. STOP.
