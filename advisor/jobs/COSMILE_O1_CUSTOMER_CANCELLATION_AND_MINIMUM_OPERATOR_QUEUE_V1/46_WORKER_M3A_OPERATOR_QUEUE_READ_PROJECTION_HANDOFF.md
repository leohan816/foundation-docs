# ADVISOR -> COSMILE WORKER — M3A OPERATOR QUEUE READ PROJECTION

MISSION_ID: `COSMILE_O1_CUSTOMER_CANCELLATION_AND_MINIMUM_OPERATOR_QUEUE_V1`
MODULE: `M3A_OPERATOR_QUEUE_READ_PROJECTION`
BASE: `c0bb0aa3cc4e8f5c7a0b739de4ecc95800e489c0`
WORKER: existing primary Cosmile Worker, Claude Opus 4.8 / xhigh
SKILL: `/fable-builder`
REFERENCES: `implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`; report template only at return
DELTA_ONLY_VERIFICATION: REQUIRED

## Objective

Add only the repository/runtime read projection for the minimum active O1 service-request queue. This module adds no route, UI, operator action, transition, step-up, refund, support acknowledgement, or economic effect.

## Exact path ceiling

1. `app/src/lib/order/serviceRequestContracts.ts`
2. `app/src/lib/order/serviceRequestRepository.ts`
3. `app/src/lib/runtime/o1CommerceRuntime.ts`
4. `app/scripts/o1_order_service_request.dbtest.vitest.ts`

No fifth path. No schema/migration, customer path, operator route/page/component, order/payment/refund/inventory/shipment/reconciliation mutation, provider/network/credential, config/manifest/dependency, build/typecheck/full suite, or non-disposable DB action.

## Frozen contract and mapping

- Add a separate `OperatorServiceRequestQueueRepository` port; do not widen `CustomerServiceRequestRepository` or force unrelated fake repositories to change.
- Closed result: `{ kind: "ok"; rows: readonly OperatorServiceRequestQueueRow[] } | { kind: "repository_error" }`.
- Each row contains exactly: internal `orderId` for the existing detail route, opaque `orderNo`, closed `requestKind`, closed `requestStatus`, `requestedAt`, and `queueCategory`.
- Closed `queueCategory`:
  - `paid_unshipped_cancel/requested` -> `refund_request`
  - `shipped_support/requested` -> `support_request`
  - `paid_unshipped_cancel/processing|recovery_hold` -> `hold`
- Exclude pre-capture completed, accepted/refused/completed terminal requests, graph-invalid combinations, non-O1 orders, and orders without a bound PaymentIntent.
- O1 predicate is the exact namespace shape `^O1-[0-9A-F]{20}$` plus at least one bound PaymentIntent. Never use a global/latest-row guess.
- Sort oldest `requestedAt` first with a deterministic request-id tie-break. Bound `limit` to integer `1..200`, otherwise `50`.
- Repository read/query failure returns only `repository_error`; no raw error or partial row.
- Runtime forwards the repository result unchanged after limit bounding. It derives no action eligibility and never mutates.
- Public row shape must contain no customer identity, amount/currency, payment/provider/refund reference, inventory detail, reason/free text, secret, audit data, or raw error. `queueCategory` is a request-work bucket, not final refund/support authority; later processing must revalidate all truth under lock.

## Tests first

Run only:

`./node_modules/.bin/vitest run scripts/o1_order_service_request.dbtest.vitest.ts -t 'M3A ' --config vitest.config.ts --reporter=verbose --cache=false`

1. Patch the DB test first and run exact meaningful RED.
2. Patch only the three source paths, then run identical GREEN.
3. Drive the actual repository/runtime against the existing disposable loopback PostgreSQL fixture. Add only synthetic request rows/timestamps needed by the M3A cases.
4. Prove all three queue categories, terminal/invalid/non-O1 exclusion, exact row-key redaction, oldest-first deterministic ordering, `1..200`/default bound, repository failure closure where safely injectable inside the exact paths, and byte-equivalent state footprint before/after.

Use only the mission-approved temporary canonical dependency symlink, remove immediately, canonical hashes unchanged, disposable DB/container/port/cache/process residue absent.

## STOP and return

STOP for a schema/index/migration need, fifth path, action-eligibility inference, route/UI/action/write, raw identifier beyond existing internal order route id and opaque order number, query that cannot fail closed, test requiring another file, dependency/config mutation, or cleanup mismatch.

After GREEN: one additive commit, non-force push, truthful Claude attribution or no co-author trailer. Return <=18 lines: skill/refs, RED/GREEN, exact paths, categories/redaction/order/bounds/zero-write proof, cleanup, attribution, commit/upstream/clean, STOP. Do not start M3B or Reviewer.
