# Advisor blocker — Designer runtime unavailable

MISSION: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1`
VERDICT: `HOLD`
BLOCKER: `FOUNDATION_DESIGNER_SESSION_ABSENT`

- Exact page disposition and committed handoff: docs `c22d7bb643310e96ffef62e3b730c5d018c58dfa`, files `120` and `121`.
- Frozen affected pages: `/dashboard/orders`, `/dashboard/fulfillment`, `/dashboard/requests`.
- Excluded after source inspection: `/dashboard/finance`, `/dashboard/settings`, `/dashboard/activity`.
- Before dispatch, the idle `foundation-designer:codex.0` prompt contained stale input.
- One non-exit prompt-cancel key was sent; tmux then reported the `foundation-designer` session absent.
- No Designer handoff was dispatched and outputs `122`–`126` do not exist.
- Product remains `96b363c7f545da5b3d1b22178fc25313a749e143`, clean/upstream-equal.
- Foundation-docs remains clean/upstream-equal at the handoff commit before this blocker record.
- Public preview remains listening on `127.0.0.1:3000`; no runtime action occurred.
- Product write, browser, DB, provider, economic effect, and deferred-module work: `0`.
- Required next authority: Leo approval to recreate exactly the existing-role `foundation-designer` session; no substitute Actor.
