# M2 E6 — PENDING PROJECTION AND CHECKOUT IDEMPOTENCY DIAGNOSIS

Status: **PASS_READ_ONLY / CHECKOUT_RETRY_HOLD**

## Preserved evidence

- Customer history and Dashboard Orders each project exactly two durable orders in `payment_pending`.
- This proves the customer-to-operator pending-state read projection. It does **not** prove payment success.
- Runtime recorded exactly two `POST /api/o1/checkout/start` responses, both HTTP 409 before any Toss handoff.
- The two orders were absent at the preceding zero-order checkpoint and were created two seconds apart in this attempt window.
- Each order has one matching `reserved` inventory hold. Payment intents, payment transactions, successful captures, and refunds are all zero.
- Provider calls and duplicate economic effects are exactly zero. This is not a provider failure.
- No order identifier, provider body, credential, cookie, customer identifier, or secret is retained here.

## Exact first defect and correction already admitted

`startO1Checkout` previously resolved transport only after `Order.create` and inventory reservation. Product
`e26e1aa18f1d58f1b6354a14b4a46bbd41aa5c97` moves that pure/no-network decision before catalog and all durable
writes. Its focused RED/GREEN proves the transport-unavailable path can no longer create another order or hold.

## Residual checkout-start replay defect

- The route accepts no stable checkout-attempt/idempotency token.
- Every invocation mints a new `Order.id` and `Order.orderNo`.
- The payment idempotency key is derived from that newly minted order id, so it cannot correlate two checkout-start
  requests.
- Inventory reservation idempotency is scoped to the same `{order, sku, quantity}` and cannot deduplicate two distinct
  orders.
- Payment-intent idempotency and its per-order lock begin only after the new order and reservation exist.
- The browser `startingRef` blocks only concurrent starts in the current mounted component and resets after failure; it
  is not a durable server replay boundary.

Therefore two accepted checkout-start requests can still create two distinct orders/holds when transport is ready,
even though later payment/capture effects remain separately fenced.

## Current-state disposition

The two existing pending orders are equivalent and neither has an intent. There is no durable attempt key that proves
which one is canonical. Automatically selecting, cancelling, releasing, or merging one would invent policy and mutate
the preserved evidence. No such action is admitted.

## Smallest bounded correction candidate

Freeze a customer-bound, line-signature-bound checkout-attempt key with a deterministic unique `Order.orderNo`, then
make checkout-start load and validate the exact existing order before creating one. A replay must reuse only the same
owner, currency, total, ordered SKU/quantity set, active reservation, and actionable intent; mismatch or ambiguous
legacy residue must fail closed with zero write/provider effect. Concurrency must converge on the existing unique order.

This candidate can reuse the existing `Order.orderNo` uniqueness and existing per-order reservation/intent fencing;
no schema change is presently evidenced. Before write, freeze key lifecycle across browser failure/reload, exact path
ceiling, tests-first concurrent/replay cases, and the treatment of legacy ambiguous rows. The preserved two rows remain
HOLD and outside automatic correction.

## Boundaries

No DB mutation, cleanup, cancellation, provider request, Toss contact, runtime restart, checkout retry, refund, product
write, schema change, or economic action occurred in this diagnosis. The separate multi-product admission blocker
remains open and unchanged.
