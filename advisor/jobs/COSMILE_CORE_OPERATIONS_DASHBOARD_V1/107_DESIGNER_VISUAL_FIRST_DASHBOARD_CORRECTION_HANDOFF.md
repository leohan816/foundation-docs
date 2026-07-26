# Designer handoff — visual-first Dashboard acceptance correction

MISSION: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1`
PHASE: `M5C_M5E_VISUAL_FIRST_REOPEN`
PRODUCT_BASE: `fa90003d0ca84b01bbfe0bfa7206b447b6c8d546`
SUPERSEDES: `102_DESIGNER_M5C_M5E_AUTHENTICATED_ACCEPTANCE_CORRECTION_HANDOFF.md`
MODEL_EFFORT: existing `foundation-designer` `gpt-5.6-sol/max`
SKILL: `/frontend-design`
PRODUCT_WRITE: `PROHIBITED`

## Acceptance failure

This is a design-acceptance failure, not a CSS micro-fix. The current authenticated screenshot is rejected as a candidate because it is a sparse evidence ledger with a horizontal operations row, raw internal codes, and weak commerce hierarchy.

Inspect these three local visual references before composing:

1. failure screenshot: `/home/leo/uploads/clip-20260726-145045.png`
2. hierarchy/density reference: `/home/leo/uploads/clip-20260719-183456.png`
3. hierarchy/density reference: `/home/leo/uploads/clip-20260719-204643.png`

The NOVA references are professional-density and hierarchy references only. Do not clone their product, controls, illustrations, or AI behavior.

## One visual candidate

Use the `/frontend-design` two-pass process and produce one actual rendered 1440×900 candidate before any product write. The candidate must show:

- a permanent, grouped 250px left operations sidebar;
- top Console / Dashboard / Lab space switcher only;
- clear Cosmile operations brand/header and page title `운영 대시보드`;
- concise commerce overview first, using only the existing orders, payment/refund, fulfillment, support, and reconciliation truth categories;
- useful summary cards without invented revenue, customer, stock, or KPI values;
- action queue as one section rather than the page identity;
- recent orders plus fulfillment, support, and reconciliation summaries;
- grouped nav: overview / commerce / operations / governance;
- unsupported entries quiet, inert, and visually secondary;
- natural Korean primary labels: `0건`, `현재 집계 준비 중`, `기능 준비 중`, and distinct permission-denial copy;
- raw tokens such as `CONFIRMED_ZERO`, `UNAVAILABLE`, `NOT_IMPLEMENTED`, and developer evidence explanations absent from primary cards;
- deliberate spacing, color, typography, focus, accessibility, and reduced-motion treatment;
- no new backend read, route, command, mutation, DB, provider, auth, economic effect, feature, or fake data.

## Exact outputs

Author only:

1. `108_DESIGNER_DASHBOARD_VISUAL_CANDIDATE.html` — static design artifact only;
2. `109_DESIGNER_DASHBOARD_VISUAL_CANDIDATE.png` — actual 1440×900 render of `108`;
3. `110_DESIGNER_DASHBOARD_VISUAL_CANDIDATE_RESULT.md` — at most 30 lines: source references, visual hierarchy, truth-source mapping, explicit exclusions, render command/result, and STOP.

Do not author a long contract or product code. Return immediately after the one rendered candidate and STOP for Advisor visual inspection and independent visual review.
