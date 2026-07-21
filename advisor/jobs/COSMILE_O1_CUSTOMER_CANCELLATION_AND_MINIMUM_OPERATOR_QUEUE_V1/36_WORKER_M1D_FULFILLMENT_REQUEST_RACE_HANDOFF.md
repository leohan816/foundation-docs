# M1D Worker Handoff — Fulfillment / Active Request Race

MISSION_ID: `COSMILE_O1_CUSTOMER_CANCELLATION_AND_MINIMUM_OPERATOR_QUEUE_V1`
MODULE: `M1D_FULFILLMENT_REQUEST_RACE`
BASE: `989257b8c459909052fc0da6c0cf3843b69fff71`
ACTOR: existing Cosmile Worker, Claude Opus 4.8/max, `/fable-builder`
RETURN_TO: `foundation-advisor`

## Objective

Close only the race between the existing record-only fulfillment transition and the M1C paid-unshipped request. Reuse the same per-order advisory lock. Do not change payment, refund, inventory, shipment progression, authorization, or provider semantics.

## Exact path ceiling

1. `app/src/lib/order/contracts.ts`
2. `app/src/lib/order/service.ts`
3. `app/src/lib/order/repository.ts`
4. `app/scripts/o1_order_lifecycle.vitest.ts`
5. `app/scripts/o1_order_service_request.dbtest.vitest.ts`

## Frozen behavior

- Add one closed fulfillment result, `request_conflict`, and map it unchanged through repository → service.
- Under the existing per-order advisory lock, `paid_unshipped_cancel` in `requested`, `processing`, or `recovery_hold` blocks every fulfillment write and returns `request_conflict`.
- `refused` is not active. `shipped_support` never blocks fulfillment. Existing terminal/order-coherence gates remain unchanged.
- Race at `preparing -> shipped` has only two valid convergences:
  - request wins: one paid-unshipped request, shipment remains `preparing`, fulfillment returns `request_conflict`; or
  - shipment wins: shipment becomes `shipped`, the customer submission becomes one `shipped_support` request.
- Never persist both `paid_unshipped_cancel` and `shipped`; never create a second request/economic effect.
- This module performs zero Refund, PaymentTransaction, stock, provider, credential, reconciliation, schema, or migration action.

## Tests-first focused evidence

- In `o1_order_lifecycle.vitest.ts`, first add one named service mapping/zero-write contract test for `request_conflict` and preserve RED.
- In `o1_order_service_request.dbtest.vitest.ts`, first add named actual-repository cases for active-request blocking, non-active exclusions, and the concurrent request-vs-shipped convergence; preserve RED.
- Implement only the three source paths, then rerun only those exact named M1D tests. No whole-file/full-suite/build/typecheck/generate.
- Disposable loopback PostgreSQL only; synthetic data; unconditional cleanup.

## Stop conditions

STOP before action if focused execution requires an unapproved dependency mutation/mechanism, a sixth path, schema change, new request kind/status, economic semantic change, provider call, direct stock restoration, broad refactor, or failure to preserve the two closed race outcomes.

Commit and non-force push once only after focused GREEN, exact five-path containment, cleanup, and Advisor validation. Do not start runtime/API/UI work.
