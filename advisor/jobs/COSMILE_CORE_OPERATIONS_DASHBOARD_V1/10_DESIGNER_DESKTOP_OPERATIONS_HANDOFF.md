# 10 — Designer Desktop Operations Handoff

MISSION: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1`
PHASE: `M1_DESIGN`
PRODUCT_WRITE: `PROHIBITED`

## Exact subject

- Product worktree: `/home/leo/Project/.worktrees/Cosmile/COSMILE_CORE_OPERATIONS_DASHBOARD_V1`
- Product base/HEAD: `6486019e0968de5671e43521e5cfb40d03b0bdca`
- Docs worktree: `/home/leo/Project/.worktrees/foundation-docs/COSMILE_CORE_OPERATIONS_DASHBOARD_V1`
- Current public evidence: `https://cosmile.leohan.net/dashboard` is a mobile Storefront shell and default-denied; `/lab` is read-only.

Use the existing `foundation-designer` session only. Read current Agent Office role/reporting rules and `/home/leo/.claude/plugins/marketplaces/claude-plugins-official/plugins/frontend-design/skills/frontend-design/SKILL.md`.

## Bounded inspection

Inspect actual current screens at original size and only the load-bearing product sources for:

- root/dashboard/console/lab layouts and shells;
- existing Dashboard home, requests, fulfillment, finance, activity, settings;
- current O1 Console queue/fulfillment/finance/operator components;
- existing tokens/styles needed for reuse.

Browser observation is read-only. Do not log in, mutate data, call providers, or write product source.

## Required design

Single job: answer “오늘 무엇을 처리해야 하고, 무엇이 사실이며, 무엇이 막혀 있는가?”

- Desktop-first independent operations workspace; bounded responsive/mobile access without Storefront imitation.
- Left navigation in this order: Dashboard, Orders, Customers, Products, Inventory, Fulfillment, Payments & Refunds, Support, Reconciliation, Audit, Settings.
- Home prioritizes action queues and blocked work before summary facts.
- Truth states exactly: `CONFIRMED`, `CONFIRMED_ZERO`, `UNAVAILABLE`, `NOT_CONFIGURED`, `NOT_IMPLEMENTED`, `DENIED`.
- Persistent Korean non-production/synthetic labeling.
- No Storefront device/status/header/bottom navigation/cart FAB/shipping promo/mall/category chrome.
- Preserve `/console` as conversation/planning/evidence and `/lab` as read-only promotion-candidate registry.
- Do not imply unsupported data or create mock KPI/revenue/customer/inventory numbers.

Apply the skill's two-pass process:

1. Compact subject-specific token plan: 4–6 hex colors, display/body/data type roles, layout concept, desktop/mobile ASCII wireframes, one justified signature element.
2. Critique generic/template risk and revise before the final candidate.

Floor: keyboard focus, landmark/navigation semantics, Korean readability, 390px responsive behavior, reduced motion, screen-reader-equivalent truth labels, loading/denied/unavailable/recovery presentations.

## Exact outputs

Write only:

- `advisor/jobs/COSMILE_CORE_OPERATIONS_DASHBOARD_V1/11_DESIGNER_DESKTOP_OPERATIONS_CONTRACT.md`
- `advisor/jobs/COSMILE_CORE_OPERATIONS_DASHBOARD_V1/12_DESIGNER_DESKTOP_OPERATIONS_MOCKUP.svg`
- `advisor/jobs/COSMILE_CORE_OPERATIONS_DASHBOARD_V1/13_DESIGNER_RESULT.md`
- `advisor/jobs/COSMILE_CORE_OPERATIONS_DASHBOARD_V1/14_DESIGNER_POINTER.md`

The SVG must contain a full-size desktop view and a bounded mobile/responsive view with dimensions stated. Open it at original size and record one screenshot critique. No extra artifact.

Result maximum 80 lines and must index source evidence, states, responsive/accessibility coverage, limitations, exact paths, Git state, and `RETURN_TO: foundation-advisor`. Do not commit/push/review/approve. `STOP`.
