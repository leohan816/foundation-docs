# Advisor Worker Handoff — M4A Paid Cancellation Lifecycle Core

MISSION_ID: `COSMILE_O1_CUSTOMER_CANCELLATION_AND_MINIMUM_OPERATOR_QUEUE_V1`
MODULE: `M4A_PAID_CANCELLATION_LIFECYCLE_CORE`
BASE: `2cd5ece478d4877b6ed464829576c598bb96a3d7`
ACTOR: existing Cosmile Worker, Claude Opus 4.8 / xhigh
SKILL: `/fable-builder`
REFERENCES: `implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`; `implementation-report-template` only for the compact return
DELTA_ONLY_VERIFICATION: REQUIRED
REVIEW: deferred to the cumulative hard/safety candidate review

## Objective

Add only the non-provider lifecycle boundary for an existing
`paid_unshipped_cancel` request: a read-only, advisory-locked admission check
before the existing refund lane and an advisory-locked settlement after that
lane returns. M4A performs no refund/provider/payment/order/inventory/shipment
economic mutation and does not wire a runtime caller.

## Exact path ceiling

1. `app/src/lib/order/serviceRequestContracts.ts`
2. `app/src/lib/order/serviceRequestService.ts`
3. `app/src/lib/order/serviceRequestRepository.ts`
4. `app/scripts/o1_order_service_request.vitest.ts`
5. `app/scripts/o1_order_service_request.dbtest.vitest.ts`

No sixth path. No runtime/API/UI/refund/payment/order repository/schema/migration,
provider/network/credential/build/typecheck/full-suite action.

## Exact contract

Add a separate paid-cancellation port; do not widen the customer, queue,
support-ack, or detail ports.

- Admission outcome/repository result:
  `admitted | already_completed | recovery_hold | not_found | not_actionable |
  not_authorized | invalid_input | repository_error`.
- Settlement input result is closed to `completed | recovery_hold`.
- Settlement outcome/repository result:
  `completed | recovery_hold | idempotent | not_found | not_actionable |
  not_authorized | invalid_input | repository_error`.
- Public/service outcomes contain no identifier, money, provider/refund value,
  timestamp, PII, secret, SQL, or raw error.
- Service validates bounded `orderId` and existing `owner|admin` operator role.
  Invalid input/role makes zero repository calls. It calls the matching
  repository method once, catches exceptions, and fail-closes unknown results.
- Production service always passes `failAudit:false`; category-only reasons are
  `operator_paid_cancel_admit` and `operator_paid_cancel_settle`.

## Admission repository — read-only

The first transaction operation is the per-order advisory lock. Re-read all
truth; do not trust queue/detail/UI state.

- Missing order, non-exact O1 namespace, or no O1 payment intent -> `not_found`.
- Exact terminal proof (`Order.refunded`, one matching succeeded full KRW Refund,
  exact committed coverage, request `paid_unshipped_cancel/completed`) ->
  `already_completed`.
- Request `processing|recovery_hold`, or active reconciliation ->
  `recovery_hold`; no write.
- Exact admission requires:
  `paid_unshipped_cancel/requested`, `Order.paid`, exactly one captured
  PaymentIntent and one aligned succeeded full KRW capture, zero non-failed
  Refund, exact committed reservation coverage, and no shipment or
  `pending|preparing`.
- Only that exact state -> `admitted`. Wrong kind/status, shipped/delivered,
  ambiguous/multiple/mismatched money truth, mixed/inexact reservation, or any
  other known-incoherent state -> `not_actionable`.
- Admission changes zero rows and creates no audit/history/reconciliation.

## Settlement repository — request/audit/reconciliation only

The first transaction operation is the same per-order advisory lock.

- `completed` may succeed only after re-reading exact durable final truth:
  exact O1 order is `refunded`; one aligned succeeded full KRW capture; one
  matching durable `Refund.refunded`; exact committed coverage remains; request
  is `paid_unshipped_cancel/requested|processing`.
- Within one transaction, advance `requested -> processing -> completed` (or
  `processing -> completed`), set `resolvedAt`, and write exactly one
  category-only audit. Do not add order history: the reviewed refund finalizer
  owns order history.
- If `completed` is requested but final truth is incomplete/ambiguous, fail
  closed in the same transaction: open/reuse one order-scoped `refund_hold`
  reconciliation task, advance `requested -> processing -> recovery_hold` (or
  `processing -> recovery_hold`), leave `resolvedAt` null, write one
  category-only hold audit, and return `recovery_hold`.
- Explicit `recovery_hold` does the same bounded hold convergence without
  inferring provider success/failure.
- Exact completed replay with final truth -> `idempotent`; exact recovery-hold
  replay reuses one task and returns `recovery_hold`. Neither writes a second
  audit.
- Wrong kind, refused/accepted, or incompatible terminal facts ->
  `not_actionable`; missing/non-O1 -> `not_found`.
- Audit failure rolls back request transition and reconciliation creation.
- Never write Order, PaymentIntent, PaymentTransaction, Refund,
  InventoryReservation, CommerceSku, ShipmentRecord, or OrderStatusHistory.

## Tests first and focused command

First add only `M4A ` tests in the two existing test paths and run the exact
command for meaningful RED (missing contracts/functions/ports). Then implement
the three source paths and run the identical command for GREEN:

```bash
./node_modules/.bin/vitest run scripts/o1_order_service_request.vitest.ts scripts/o1_order_service_request.dbtest.vitest.ts -t 'M4A ' --config vitest.config.ts --reporter=verbose --cache=false
```

Pure tests: invalid id/role zero-call; exact one-call mapping; exception and
future-kind fail-closed.

Disposable PostgreSQL tests: exact admission and byte-equivalent read-only
state; every denial/hold category; completed convergence; incomplete final
truth -> one `refund_hold`; replay/concurrency exactly one transition/audit/task;
audit-failure rollback; zero order/payment/refund/inventory/stock/shipment/history
mutation. Use synthetic data only.

Use only the mission-authorized temporary canonical `app/node_modules` symlink
and disposable loopback PostgreSQL. No install/generate/copy/target write.
Remove the symlink/container/cache and verify canonical hashes unchanged.

## Return

Inspect the exact five-path diff, commit once with truthful attribution or no
co-author trailer, non-force push, prove clean/upstream-equal, and return a
compact evidence index. STOP before M4B.

STOP on any required sixth path, new schema/state/kind, payment/refund/order/
inventory semantic change, actual provider/economic effect, or inability to
prove the atomic boundary with the focused tests.
