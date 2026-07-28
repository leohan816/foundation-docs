# 40 — Advisor Implementation Freeze

MISSION: `COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1`
DESIGN GATE: `32`/`33` = `PASS`, blocking `0`
PRODUCT BASE: `8d4a3272c6baced193be4f9ed88710c39c90d739`

## Sequence

Only one module may write at a time:

1. **M1 — shared customer shell:** remove the O1 phone-frame/fake-status presentation and establish the responsive header, context strip, desktop footer, and existing five-route mobile navigation.
2. **M2 — home/shop/card:** implement the dynamic editorial home, complete admitted-array catalog, and one responsive card primitive.
3. **M3 — detail/wishlist/cart/checkout presentation:** style existing behavior and states only.
4. **M4 — account/order list/detail/service-request presentation:** style existing customer projections and recovery states only.

Advisor must admit each next module from the prior clean pushed product commit. No later-module read or write is admitted during M1.

## Global invariants

- O1 runtime only; legacy flag-off UI remains present and behaviorally unchanged.
- No product/data/auth/payment/inventory/order/refund/service-request semantics change.
- No new route, API, read contract, write path, schema, migration, dependency, product, price, stock, promotion, review, claim, image, or identifier.
- Render every admitted catalog item dynamically; current truth is seven, and no eighth appears until actually admitted.
- Preserve Google-only identity, guest-to-user merge, Toss TEST-only checkout, replay/idempotency, ownership, fail-closed states, and Golden Reversal HOLD.
- Dashboard/Console/Lab are untouched.
- No provider, DB, browser, public-runtime, or economic action during implementation modules.
- Tests preserve meaningful failures; no assertion weakening to manufacture green.

## Verification

- Each module starts with focused source-contract tests, records a meaningful RED, implements only its frozen paths, then runs the identical focused GREEN.
- One lockfile-exact `npm ci --ignore-scripts --no-audit --no-fund` in this mission worktree is permitted if `app/node_modules/.bin/vitest` is absent. No package/lock change or install elsewhere.
- No broad suite, typecheck, build, Prisma generate, or browser gate until the later explicitly frozen cumulative gate.

