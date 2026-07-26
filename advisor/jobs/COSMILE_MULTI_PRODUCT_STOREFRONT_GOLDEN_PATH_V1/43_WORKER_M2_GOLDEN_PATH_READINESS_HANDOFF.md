# M2 GOLDEN PATH READINESS — WORKER HANDOFF

- Mission: `COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1`
- Product: `a39773aeb75bae50dd3a398319b036cfabe7d1b8`, clean/upstream-equal.
- Runtime: exact candidate app on `127.0.0.1:3000`, public host `https://cosmile.leohan.net`; predecessor rollback remains frozen.
- SKILL: `/fable-builder`; applicable references already loaded: `implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`.

## Exact work

1. Per command, bind to `/home/leo/Project/.worktrees/Cosmile/COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1`.
2. Verify only: HEAD/clean/upstream; listener process CWD; public `/`, `/shop`, `/cart`, `/wishlist`, `/account/orders`, `/dashboard/orders` status; exactly 8 distinct `/products/<id>` links on `/shop`; one internally selected detail status.
3. Verify count-only DB baseline from the current runtime boundary: customer/account `1/1`; wishlist/cart/cart-item/order/order-item/payment-intent/payment-transaction/refund/inventory-reservation/reconciliation/shipment all `0`; audit `5`.
4. Return `READY_FOR_LEO_GOLDEN_ORDER` with the public home URL and the already-frozen single browser action: distinct dedicated Google TEST customer, one favorite, quantity-one cart, exactly one Toss TEST payment, stop at order detail/history, no retry if uncertain.

## Forbidden

- No product/docs/config/schema/DB/runtime/process change; no build/typecheck/test/install/generate.
- No Google/Toss/provider request, browser automation, payment/refund, identifier/secret/value output, or second window.
- Do not stop/restart the candidate or any tmux/Actor.
- Compact result only, then STOP.
