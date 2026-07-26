# Designer handoff — M5C/M5E authenticated acceptance correction

MISSION: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1`
PHASE: `M5C_M5E_REOPENED_DESIGN_CORRECTION`
PRODUCT_BASE: `fa90003d0ca84b01bbfe0bfa7206b447b6c8d546`
PRODUCT_WRITE: `PROHIBITED`

## Live finding

- Leo's authenticated desktop screenshot is the acceptance authority and supersedes the prior clean-profile geometry result.
- The exact 11-row `OPERATIONS_NAV` appears as a full-width horizontal row; no persistent left rail is perceptible.
- The current base layout is horizontal by default and becomes a left rail only under `lg:` rules.
- Direct final-DOM measurement confirms the exact nav is left/250px at CSS viewport 1816, but horizontal/full-width at CSS viewport 908. Screenshot pixel width therefore cannot be treated as CSS viewport width.
- The home is led by `오늘 처리할 일` and primary UI exposes raw tokens such as `CONFIRMED_ZERO`, `DENIED`, `NOT_IMPLEMENTED`, and `UNAVAILABLE`.

## Exact Designer task

Use `/frontend-design` and its two-pass visual plan. Work only from this handoff, prior `87`–`90`, and the exact current sources:

1. `app/src/components/operator/OperatorShell.tsx`
2. `app/src/app/dashboard/page.tsx`
3. `app/scripts/o1_core_dashboard_shell.vitest.ts`
4. `app/scripts/o1_core_dashboard_reads.vitest.ts`

Freeze a compact correction contract that requires:

- the complete 11-row operations nav to be a visibly persistent 250px left desktop sidebar while only the Dashboard body scrolls;
- a breakpoint robust to ordinary desktop high-DPI/zoom conditions; horizontal compact navigation is allowed only below the explicit desktop breakpoint;
- Console/Dashboard/Lab remain the top space switcher only;
- Dashboard root is led by a concise Korean commerce operations overview using only the already-returned orders, requests, and reconciliation reads;
- `지금 처리할 일` remains one bounded section, not the page identity;
- primary UI uses truthful Korean status labels and details without raw internal enum tokens;
- confirmed empty/0 is visually and semantically distinct from permission denial;
- unsupported/not-implemented/unavailable is distinct from authorization denial;
- no new read, route, command, backend, data, KPI, schema, DB, provider, auth, or economic effect.

Specify the exact responsive breakpoint, hierarchy, component-level mapping, state-copy table, accessibility/reduced-motion floor, and screenshot critique checklist. Do not implement.

## Exact outputs

Author only:

1. `103_DESIGNER_AUTHENTICATED_DASHBOARD_CORRECTION_CONTRACT.md`
2. `104_DESIGNER_AUTHENTICATED_DASHBOARD_CORRECTION.svg`
3. `105_DESIGNER_AUTHENTICATED_DASHBOARD_CORRECTION_RESULT.md`
4. `106_DESIGNER_AUTHENTICATED_DASHBOARD_CORRECTION_POINTER.md`

Return compactly and STOP.
