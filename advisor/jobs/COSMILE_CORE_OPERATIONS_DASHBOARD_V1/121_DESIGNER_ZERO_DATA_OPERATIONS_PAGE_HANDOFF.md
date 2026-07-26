# Designer handoff — zero-data operations page structure

MISSION: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1`
PHASE: `BOUNDED_VISUAL_CORRECTION`
DECISION: `PROCEED_WITH_LIMITS`
RETURN_TO: `foundation-advisor`

## Exact subject

- Product worktree: `/home/leo/Project/.worktrees/Cosmile/COSMILE_CORE_OPERATIONS_DASHBOARD_V1`
- Product: `implementation/cosmile-core-operations-dashboard-v1-20260725@96b363c7f545da5b3d1b22178fc25313a749e143`
- Accepted authenticated reference: `/home/leo/uploads/clip-20260726-161356.png`
- Accepted shell candidate: `109_DESIGNER_DASHBOARD_VISUAL_CANDIDATE.png`
- Advisor disposition: `120_ADVISOR_ZERO_DATA_OPERATIONS_PAGE_DISPOSITION.md`
- Product write, browser, runtime, DB, provider, and network actions are prohibited.

Inspect only:

1. `app/src/app/dashboard/orders/page.tsx`
2. `app/src/app/dashboard/fulfillment/page.tsx`
3. `app/src/app/dashboard/requests/page.tsx`
4. `app/src/components/console/O1ConsoleFulfillment.tsx`
5. `app/src/components/console/O1ConsoleQueue.tsx`
6. the two image references above.

## Required skill

Load `/frontend-design` from:
`/home/leo/.claude/plugins/marketplaces/claude-plugins-official/plugins/frontend-design/skills/frontend-design/SKILL.md`.

Use its two-pass plan, subject-specific token reuse, desktop/mobile/accessibility/reduced-motion floor, and original-size screenshot critique. Reuse the accepted Dashboard token system; do not redesign it.

## Visual contract

Create one high-fidelity 1440×900 candidate for `/dashboard/orders` with zero rows:

- preserve the accepted top space switcher and grouped 250px left operations rail;
- visible page title `주문`, short operational description, and `합성 비프로덕션 데이터`;
- truthful bounded summary from the existing list only;
- stable row structure with only `주문번호`, existing mapped `주문 상태`, and existing detail destination;
- an empty-state panel inside the table/list structure, with natural Korean and no raw enum;
- status filtering only if the existing `dbStatus` list can support it locally without a new read;
- show enough row-state guidance in the contract to prove the same structure renders non-empty rows.

Map the same visual grammar, without a second mockup, to:

- `/dashboard/fulfillment`: existing order fields only; do not invent tracking/shipment data.
- `/dashboard/requests`: existing order number, request kind/status/category, and requested time only.

Do not change `/dashboard`, finance, settings, activity, Console, Lab, navigation, capabilities, or any backend/read contract.

## Exact outputs

Write only under the current foundation-docs mission job:

1. `122_DESIGNER_ZERO_DATA_OPERATIONS_PAGE_CONTRACT.md`
2. `123_DESIGNER_ZERO_DATA_OPERATIONS_PAGE_CANDIDATE.html`
3. `124_DESIGNER_ZERO_DATA_OPERATIONS_PAGE_CANDIDATE.png`
4. `125_DESIGNER_ZERO_DATA_OPERATIONS_PAGE_RESULT.md`
5. `126_DESIGNER_ZERO_DATA_OPERATIONS_PAGE_POINTER.md`

The PNG must be exactly 1440×900 with legible Korean. Open it once at original size and critique hierarchy, empty-state containment, column stability, and shell continuity. No commit/push. Result ≤80 lines. `STOP`.
