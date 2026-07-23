# ADVISOR -> COSMILE WORKER — M2B CUSTOMER REQUEST READ PROJECTION

MISSION_ID: `COSMILE_O1_CUSTOMER_CANCELLATION_AND_MINIMUM_OPERATOR_QUEUE_V1`
MODULE: `M2B_CUSTOMER_REQUEST_READ_PROJECTION`
BASE: `762aadd772e54155c67a70f8d3411ce70460a2b7`
WORKER: existing Cosmile Worker, Claude Opus 4.8 / xhigh
SKILL: `/fable-builder`
REFERENCES: `implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`; load `implementation-report-template` only for the compact return
DELTA_ONLY_VERIFICATION: REQUIRED

## Objective

Expose a read-only, owner-scoped, closed customer service-request projection for the existing order detail. It must reuse the exact `decideServiceRequest` policy and authoritative fact derivation already used by submission. It must not infer eligibility in the route or UI and must create zero durable/economic/provider effects.

## Exact path ceiling

1. `app/src/lib/order/serviceRequestContracts.ts`
2. `app/src/lib/order/serviceRequestService.ts`
3. `app/src/lib/order/serviceRequestRepository.ts`
4. `app/src/lib/runtime/o1CommerceRuntime.ts`
5. `app/src/app/api/o1/orders/[orderId]/service-request/route.ts`
6. `app/scripts/o1_customer_service_request_route.vitest.ts`
7. `app/scripts/o1_order_service_request.dbtest.vitest.ts`

No eighth path. No schema/migration, UI/component/page, payment/refund/inventory/shipment mutation, provider/network, credential, runtime start, build, typecheck, full suite, config/manifest, install, generate, or unrelated cleanup.

## Frozen contract

- Add a closed read outcome for: eligible with exact `requestKind`; existing request with exact closed kind/status; terminal; recovery_hold; unavailable; not_found; invalid_input; repository_error.
- Add a read-only repository port and service/runtime composition. Malformed input is zero-call `invalid_input`; thrown/unknown results fail closed to `repository_error`.
- Extract only the existing authoritative fact-read/classification block into one module-private helper if needed. Both submission and inspection must use the same `decideServiceRequest`; submission lock, writes, outcomes, audit, and economic semantics remain behavior-identical.
- Inspection runs under the existing per-order advisory-lock transaction or an equivalently coherent transaction boundary, performs no write, and returns no identifier, amount, currency, timestamp, provider/payment reference, PII, raw row, or raw error.
- Add `GET` to the existing service-request route: flag gate 404, authenticated user gate 401, path `orderId` + verified session owner only, request body never read. Return sanitized 200 category payloads for closed display states; map not_found 404, invalid_input 400, repository_error/future 500. Existing POST behavior is byte-behavior preserved.
- No new policy: the GET projection is presentation evidence only; POST still revalidates atomically before any mutation.

## Tests first

Use only:

`./node_modules/.bin/vitest run scripts/o1_customer_service_request_route.vitest.ts scripts/o1_order_service_request.dbtest.vitest.ts -t 'M2B ' --config vitest.config.ts --reporter=verbose --cache=false`

1. Patch only the two test paths first and run the exact command for meaningful RED with preserved exit status.
2. Implement only the five source paths, then run the identical command for GREEN.
3. Route tests: flag/auth zero-call; exact owner/order forwarding; body untouched; every closed mapping; unknown fail-closed; POST parity unchanged.
4. Disposable-PG test through the actual runtime/repository: eligible pre-capture, paid-unshipped, shipped-support, existing request, recovery/HOLD, terminal, non-owner/missing; every inspection leaves OrderServiceRequest, Order, PaymentIntent, Refund, PaymentTransaction, InventoryReservation, CommerceSku, ShipmentRecord, ReconciliationTask, history, and audit counts/state unchanged.

Use only the mission-approved temporary canonical dependency symlink procedure, after prechecks; remove it immediately. Disposable DB must be removed. Canonical hashes must remain unchanged.

## STOP conditions

STOP for an eighth path, policy duplication instead of shared decision/fact derivation, changed POST/submission behavior, any write/economic/provider effect, schema need, dependency/config mutation, focused test discovery failure, or cleanup mismatch.

## Return

One additive commit and non-force push only after GREEN. Return <=20 lines: SKILL/references, RED/GREEN command and counts, exact paths, zero-effect/cleanup evidence, commit/upstream/clean state, STOP. Do not start M2C or a Reviewer.
