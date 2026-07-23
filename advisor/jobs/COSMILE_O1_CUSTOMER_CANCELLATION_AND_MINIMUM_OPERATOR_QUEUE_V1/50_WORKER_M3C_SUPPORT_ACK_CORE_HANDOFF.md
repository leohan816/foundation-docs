# ADVISOR -> COSMILE WORKER — M3C SHIPPED SUPPORT ACK CORE

MISSION_ID: `COSMILE_O1_CUSTOMER_CANCELLATION_AND_MINIMUM_OPERATOR_QUEUE_V1`
MODULE: `M3C_SHIPPED_SUPPORT_ACK_CORE`
BASE: `63ee6bee54d83d8cdec0434b8c3bd8b0952681f2`
WORKER: existing primary Cosmile Worker, Claude Opus 4.8 / xhigh
SKILL: `/fable-builder`
REFERENCES: `implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`; report template only at return
DELTA_ONLY_VERIFICATION: REQUIRED

## Objective

Implement only the pure service plus advisory-locked repository core for an already-verified operator to acknowledge one existing `shipped_support/requested` request as `accepted`. This is a non-economic record/audit transition. No runtime, route, UI, step-up, payment/refund, inventory, shipment, courier, or provider action is added here.

## Exact path ceiling

1. `app/src/lib/order/serviceRequestContracts.ts`
2. `app/src/lib/order/serviceRequestService.ts`
3. `app/src/lib/order/serviceRequestRepository.ts`
4. `app/scripts/o1_order_service_request.dbtest.vitest.ts`

No fifth path. No schema/migration, runtime/API/page/component, customer path, order/payment/refund/inventory/shipment/reconciliation mutation, provider/network/credential, config/manifest/dependency, build/typecheck/full suite, or non-disposable DB.

## Frozen contract

- Add a separate operator processing port; do not widen `CustomerServiceRequestRepository` or the M3A queue port.
- Input is exactly internal `orderId` plus an already-verified `OperatorContext`. Service rejects malformed IDs and roles other than existing `owner|admin` with zero repository call.
- Closed outcome: `accepted | idempotent | not_found | not_actionable | recovery_hold | not_authorized | invalid_input | repository_error`. No raw error, identifier, request/payment/provider data, or free text crosses the service boundary.
- The production service supplies one generated audit id, category-only actor role, reason `operator_shipped_support_ack`, and `failAudit:false`. Operator identity is authorization input only; preserve the established category-only audit convention and do not invent a new identity/audit store.

## Frozen repository transaction

- One transaction, first `pg_advisory_xact_lock(hashtext(orderId))`, then re-read exact durable facts.
- Missing order/request, non-O1 namespace, or no bound PaymentIntent -> `not_found`, zero write.
- Only `shipped_support/requested` with a `ShipmentRecord.status` of `shipped|delivered` may transition. Use the existing closed transition graph; never accept another kind/status or infer shipment from Order status.
- Active `ReconciliationTask` in `open|in_progress` -> `recovery_hold`, zero write.
- Existing exact `shipped_support/accepted` -> `idempotent`, zero write and zero second audit.
- Any other present request/state -> `not_actionable`, zero write.
- Allowed transition updates exactly one request `requested -> accepted`, sets `resolvedAt` non-null and `updatedAt`, then writes exactly one fail-closed `ConsoleAuditLog` row as the last transaction write. Audit failure rolls back the request transition.
- The transaction writes no Order, OrderStatusHistory, PaymentIntent, PaymentTransaction, Refund, InventoryReservation, CommerceSku, ShipmentRecord, ReconciliationTask, customer, provider, or courier state.
- Concurrent same-order acknowledgements converge to one `accepted`, one audit, and one idempotent result.

## Tests first

Run only:

`./node_modules/.bin/vitest run scripts/o1_order_service_request.dbtest.vitest.ts -t 'M3C ' --config vitest.config.ts --reporter=verbose --cache=false`

1. Patch only the DB test first and run exact meaningful RED.
2. Patch only the three source paths, then run identical GREEN.
3. Use the existing disposable loopback PostgreSQL fixture plus synthetic resets/rows only.
4. Prove zero-call input/role rejection; accepted exact transition/resolvedAt/one audit; accepted replay; wrong kind/status/shipment/non-O1/missing/reconciliation HOLD; audit rollback; concurrent convergence; and byte-equivalent order/payment/refund/inventory/shipment/reconciliation state.

Use only the mission-approved temporary canonical dependency symlink, remove immediately, canonical hashes unchanged, disposable DB/container/port/cache/process residue absent.

## STOP and return

STOP for step-up or economic authority, schema/new state, fifth path, mutation outside request+audit, identity/audit redesign, route/UI/runtime need, provider action, broader test, or cleanup mismatch.

After GREEN: one additive commit, non-force push, truthful Claude attribution or no co-author trailer. Return <=18 lines: skill/refs, RED/GREEN, exact paths, auth/transition/replay/audit/concurrency/zero-economic proof, cleanup, attribution, commit/upstream/clean, STOP. Do not start M3D or Reviewer.
