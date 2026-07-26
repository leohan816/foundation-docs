# M2 E4 DUPLICATE CHECKOUT — READ-ONLY DIAGNOSIS RESULT

Status: **PASS_DIAGNOSIS**. Read-only; every row preserved; no checkout/Toss/provider/refund/cancel/cleanup/edit/test.

- Pins verified: docs `ffd3233f`, blob `bf84f815`, sha256 `4e5ffdba`. Product `e257ae08…`, clean/upstream-equal, untouched.
- `DATABASE_URL` loaded into a shell variable from the owned listener's process environment; never printed, persisted, hashed or placed in argv. One REPEATABLE READ, `SET TRANSACTION READ ONLY`, `statement_timeout=15s` transaction.

## Runtime log (count/status only)

`POST /api/o1/checkout/start`: **2 requests, both `409`**. No other `/api/o1/*` request in the log.

## Order state

- Orders by status: `pending=2`. No other status exists.
- Rank 2 was created **2 s** after rank 1; ages 479 s / 476 s against a listener uptime of 7504 s.
- Both rows: `same_owner=true`, `all_owner_is_customer=true`, `all_guest_null=true`, `same_total=true`, `same_currency=true`, `same_line_count=true` (1 line each), `same_line_signature=true` (same SKU × same quantity), `distinct_order_no=2`.

## Per rank — money and inventory

| rank | payment intents | transactions | succeeded captures | refunds | reservations | reservation status |
|---|---|---|---|---|---|---|
| 1 | 0 | 0 | 0 | 0 | 1 | `reserved` |
| 2 | 0 | 0 | 0 | 0 | 1 | `reserved` |

`same_sku_quantity_signature=true`, `same_reservation_count=true`. Globally: intents `0`, intents-with-provider-ref `0`, transactions `0`, captures `0`, refunds `0`, reservations `2`.

## Cart state

- `active`/`customer`: 1 cart, 1 item. `active`/`ownerless`: 3 carts, 3 items (preserved E2 rows, untouched). `merged=0`, `checked_out=0`. Wishlist rows `1`.
- Newest cart age 505 s; the first pending order was created **26 s after** it; `carts_created_after_last_order=0`.
- The post-E2/E3 cart is owner-attributed (`customer`), so the ownership correction is holding for new activity.

## Checkpoint comparison

Preserved pre-attempt evidence was `orders/payment/refund = 0`. Both pending rows are 479 s / 476 s old inside a 7504 s listener lifetime, so **both post-date that checkpoint**; payments and refunds remain exactly `0`.

## First failing boundary

`startO1Checkout` runs: catalog revalidation → `Order.create` (+ items) → `wucReserve` per line → transport/intent. Orders and reservations exist while payment intents are `0`, so both attempts passed catalog, order creation and reservation and **first failed at the payment-intent lane** (step d — `transport_unavailable` or a `createIntent` rejection; both map to HTTP 409). The order and reservation rows written earlier are not rolled back on that return, which is what leaves the durable residue.

Duplication mechanism: `O1TossCheckout` holds an atomic `startingRef` that only blocks a **concurrent** second start; on failure `fail()` unlocks it and invites a retry. `startO1Checkout` has no idempotency against an existing `pending` order for the same owner and line signature — it mints a fresh `orderNo`, a fresh `Order`, and a fresh reservation on every attempt. Two attempts 2 s apart therefore produced two equivalent pending orders.

## Effects

- **Provider and economic effects are exactly zero**: `0` provider intent refs, `0` transactions, `0` captures, `0` refunds. No provider call is inferred from an internal intent — the internal intent count is itself `0`, and the browser never received `ok:true`, so `requestPayment` was never reached.
- **Non-money effect is not zero**: 2 `reserved` inventory holds exist for one intended purchase (double hold on the same SKU). They are TTL-bounded at 3600 s from creation.

## Not proven here

Which of `transport_unavailable` or a `createIntent` rejection produced the 409 — the log records status only, no category, and no re-execution was authorized.
