# M2 E1 RUNTIME-MODE CORRECTION — WORKER HANDOFF

- Mission: `COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1`
- Product: `a39773aeb75bae50dd3a398319b036cfabe7d1b8`, clean/upstream-equal.
- Actor: same Cosmile Worker, Opus 5/xhigh, `/fable-builder`; per-command exact mission workdir.
- Preserved failure: Leo stopped after one cart-add failure; provider/payment/refund effects `0`.

## Proven root cause

1. Owned public runtime is `NODE_ENV=production`; reviewed `o1RuntimeEnabled` structurally refuses production.
2. Public `/shop` therefore served the legacy/mock branch (8 links, no O1 marker/provenance).
3. The isolated DB/bundle truth contains exactly one approved snapshot, binding, and active non-hidden CommerceSku. Legacy product IDs outside that one server-priced SKU fail closed at `resolveUnitPrice`.

## Exact correction ceiling

1. `/home/leo/Project/.mission-tmp/COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1/runtime/start-candidate.sh`

## Execution

1. Change only `NODE_ENV=production` → `development` and `next start` → `next dev`; retain every protected store, DB, bundle, host, port, Google/Toss TEST, and loopback boundary.
2. Verify the exact product HEAD/clean state and owned `:3000` process group/CWD. No product or DB write.
3. Stop only that owned runtime. Move its current `.next` intact into the owner-only mission runtime directory as rollback evidence; do not delete it.
4. Start exactly one candidate runtime on `127.0.0.1:3000`; no second start.
5. TCP readiness, then GET-only verify public `/shop`: O1 provenance and catalog marker present, truthful count `1`, exactly one distinct detail link, selected detail `200`.
6. Read-only verify the sole binding resolves to the sole active, non-hidden CommerceSku with matching product identity. Do not POST cart.
7. Verify product Git remains clean/upstream-equal, provider/payment/refund/DB-write effects `0`, and rollback artifact is owner-only.
8. Return `READY_FOR_LEO_CART_RETRY` or first exact HOLD; STOP.

## Forbidden

- No product/docs/config/schema/DB change; no install/generate/build/typecheck/test/browser.
- No mock-row import, fabricated eighth record, provider call, cart POST, payment/refund, or identifier/secret output.
- No tmux/Actor/session change and no unrelated process/service action.
