# Advisor disposition — zero-data operations page shell

MISSION: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1`
DECISION: `PROCEED_WITH_LIMITS`
PRODUCT: `implementation/cosmile-core-operations-dashboard-v1-20260725@96b363c7f545da5b3d1b22178fc25313a749e143`
PRODUCT_GIT: `clean/upstream-equal`
PRODUCT_WRITE: `PROHIBITED_PENDING_STRATEGY_VISUAL_PASS`
PUBLIC_PREVIEW: `PRESERVE`

## Exact admitted pages

1. `/dashboard/orders` — `app/src/app/dashboard/orders/page.tsx`
   - Zero result collapses to raw `CONFIRMED_ZERO` text below a screen-reader-only heading.
   - Existing row truth: `orderNo`, `dbStatus`, bounded latest 50.
2. `/dashboard/fulfillment` — `app/src/app/dashboard/fulfillment/page.tsx`
   - Same raw zero shell and same bounded order projection.
   - No additional shipment field may be invented.
3. `/dashboard/requests` — `app/src/app/dashboard/requests/page.tsx`
   - Visible title exists, but zero result lacks the stable queue/list structure used when rows exist.
   - Existing row truth: opaque `orderNo`, request kind/status/category, requested time.

## Read-only exclusions

- `/dashboard/finance`: already retains heading, description, and three stable count cards at zero.
- `/dashboard/settings`: already retains heading and two truthful boundary cards.
- `/dashboard/activity`: no active audit read contract; remains `UNAVAILABLE`, not a zero-data shell correction.
- `/dashboard`: accepted authenticated visual shell; unchanged.

## Frozen design boundary

- Keep the accepted persistent operations rail and top space switcher unchanged.
- Each admitted page keeps title, purpose copy, truthful bounded count, stable headers, and an in-structure empty panel.
- A filter/status control is allowed only when it filters the already-returned in-memory fields; it causes no second read or command.
- Rows and zero state must use the same structure.
- No new read, schema, route, command, mutation, KPI, PII, provider, DB, economic behavior, deferred module, or capability.
- Next gate: one Designer 1440×900 visual candidate; Strategy must inspect and send `STRATEGY_VISUAL_PASS` before product write.
