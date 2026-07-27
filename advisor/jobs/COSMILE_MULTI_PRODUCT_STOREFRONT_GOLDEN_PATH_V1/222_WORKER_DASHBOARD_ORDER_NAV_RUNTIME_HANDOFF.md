# 222 — WORKER HANDOFF: OWNED RUNTIME RESTART AND LIVENESS

Status: **PROCEED_WITH_LIMITS**

Actor/session: existing Cosmile Worker `cosmile:claude.0`, actual Opus 5 / xhigh, exact product worktree.

## Pinned state

- Product HEAD `52343f5c6633558ac6ec489b201e5d7746762ab5`, clean/upstream-equal.
- Existing listener: `127.0.0.1:3000`; exact owned process group `3076098`; process CWD is the mission `app`.
- Existing owner-safe wrapper: `/home/leo/Project/.mission-tmp/COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1/runtime/start-candidate.sh`, `leo:leo`, mode `0700`.
- Wrapper statically exports `O1_TOSS_MODE=test`, `O1_TOSS_SANDBOX_ONESHOT=0`, and unsets `O1_TOSS_LOCAL_SUBSTITUTE`.

## Exact action

1. Reverify the product HEAD/clean/upstream, listener process group/CWD and wrapper boundary. Read secret **names/status only**, never values.
2. Stop only that still-matching owned runtime process group with TERM and verify port `3000` closes. Do not touch tmux, agents, DB or another service.
3. Start the wrapper exactly once on port `3000`, using a new trackable detached process group and only the existing owner-safe `candidate.pid` and `candidate-dev.log`.
4. Wait for TCP readiness; verify the listener CWD/HEAD, TEST mode, one-shot `0`, and local substitute absent.
5. Make status-class-only HTTPS GETs to `/dashboard` and `/dashboard/orders`. Do not authenticate, use a browser, call Google/Toss, or trigger a command/economic action.
6. Verify product remains clean/upstream-equal. Keep the healthy preview runtime running.

Write only docs result `224_WORKER_DASHBOARD_ORDER_NAV_RUNTIME_RESULT.md` and pointer `225_WORKER_DASHBOARD_ORDER_NAV_RUNTIME_POINTER.md`; do **not** commit or push docs. Return to Advisor and STOP.

First mismatch or failed readiness is HOLD; no second start or retry.
