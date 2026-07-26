# M5B operations-menu usability diagnosis — Worker handoff

MISSION: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1`
ACTOR: existing Cosmile Worker (`cosmile:claude.0`, Opus 5/xhigh)
SKILL: `/fable-builder` implementation-execution (read-only classification only)
VERDICT: `PROCEED_WITH_LIMITS`

## Exact question

Leo's authenticated `/dashboard` shows the main ledger but only the top Console/Dashboard/Lab switcher appears usable. SSR contains all 11 `OPERATIONS_NAV` rows. Decide from the exact source plus already-captured browser geometry whether:

1. `USABLE_AT_FROZEN_DESKTOP_VIEWPORT` — return one precise viewport/scroll instruction, no product correction; or
2. `CSS_USABILITY_DEFECT` — return the smallest exact correction proposal only, with no write.

## Exact read ceiling

- `app/src/components/operator/OperatorShell.tsx`
- `app/scripts/o1_core_dashboard_shell.vitest.ts`
- this committed handoff and the following Advisor-captured public-browser facts only:
  - 1440×900: nav present; 11/11 fully visible; 250×484; list `block`; no horizontal overflow.
  - 980×900: nav present; 7/11 fully visible; list `flex`; horizontal scroll width 1336/client 980.
  - 390×900: nav present; 3/11 fully visible; list `flex`; horizontal scroll width 1336/client 390.
  - source activates the 250px rail only at Tailwind `lg` (1024px).
  - clean unauthenticated browser remains DENIED, proving default-deny; shell geometry is outside the page authorization branch.

## Boundaries

- No source/test/docs implementation change, browser rerun, login, cookie, DB, runtime, provider, economic action, feature, route, menu row, or design expansion.
- Do not claim the authenticated menu usable merely because SSR labels exist.
- If option 1, state the exact minimum CSS viewport width, zoom/device-emulation condition, and scroll-position condition supported by evidence.
- If option 2, name at most the existing shell file plus existing focused test file, the exact presentation-only behavior, and why a viewport instruction is insufficient.
- Output only:
  - `84_M5B_OPERATIONS_MENU_USABILITY_DIAGNOSIS_RESULT.md`
  - `85_M5B_OPERATIONS_MENU_USABILITY_DIAGNOSIS_POINTER.md`
- Commit/push only these two docs files, then `RETURN_TO: foundation-advisor` and `STOP`.
