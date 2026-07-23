# ADVISOR -> COSMILE WORKER — M3E OPERATOR REQUEST DETAIL PROJECTION

MISSION: `COSMILE_O1_CUSTOMER_CANCELLATION_AND_MINIMUM_OPERATOR_QUEUE_V1`
MODULE: `M3E_OPERATOR_REQUEST_DETAIL_PROJECTION`
BASE: `a656f78f74634e585d212b797c30647cb8d134c6`
INSTRUCTION_GATE: `PROCEED_WITH_LIMITS`
DELTA_ONLY_VERIFICATION: `REQUIRED`

## Exact objective

Add only a read-only, category-only projection for the currently active O1 service request belonging to one selected operator order. This projection lets the later detail UI render an action from durable truth instead of inferring from order/shipment state or a stale queue link. No route, UI, mutation, acknowledgement, step-up, refund, payment, inventory, shipment, provider, schema, migration, or economic effect is added here.

## Exact path ceiling

1. `app/src/lib/order/serviceRequestContracts.ts`
2. `app/src/lib/order/serviceRequestService.ts`
3. `app/src/lib/order/serviceRequestRepository.ts`
4. `app/src/lib/runtime/o1CommerceRuntime.ts`
5. `app/scripts/o1_order_service_request.dbtest.vitest.ts`

No sixth product path.

## Frozen contract and behavior

- Add a separate read-only detail port; do not widen the customer mutation, M3A list, or M3C processing ports.
- Public detail shape has exactly:
  - `requestKind: RequestKind`;
  - `requestStatus: RequestStatus`;
  - `queueCategory: "refund_request" | "support_request" | "hold"`.
- Closed service outcome only:
  - `{kind:"active", request:<exact shape>}`;
  - `{kind:"not_found"}`;
  - `{kind:"invalid_input"}`;
  - `{kind:"repository_error"}`.
- Service validates the internal `orderId` with the existing bounded-id rule before one repository call, forwards the repository outcome unchanged, closes thrown/unknown results to `repository_error`, and performs zero writes.
- Repository query is parameterized and read-only:
  - require exact O1 order-number namespace and at least one bound `PaymentIntent`;
  - include only `paid_unshipped_cancel` in `requested|processing|recovery_hold` or `shipped_support/requested`;
  - missing order/request, non-O1, no bound intent, terminal `accepted|refused|completed`, and every other kind/status return opaque `not_found`;
  - any active `ReconciliationTask.status in (open,in_progress)` forces `queueCategory:"hold"` before all other category mapping;
  - otherwise paid/requested -> `refund_request`, shipped-support/requested -> `support_request`, paid processing/recovery_hold -> `hold`;
  - ambiguity, query failure, unmapped/null category, or malformed row closes to `repository_error`; never choose latest/global/first from multiple rows.
- Runtime accepts only `orderId`, composes the service with the real read-only repository, and returns the closed outcome unchanged. It derives no eligibility and queries no Prisma directly.
- No output includes order id/number, request id, customer/operator identity, PII, amount/currency, payment/provider/refund/inventory/shipment/tracking value, timestamp, audit data, secret, or raw error.

## Tests first and exact command

First add only named `M3E ` tests to the exact existing DB test file and run the exact command for meaningful RED. Then implement only the four source paths and rerun the identical command for GREEN:

`./node_modules/.bin/vitest run scripts/o1_order_service_request.dbtest.vitest.ts -t 'M3E ' --config vitest.config.ts --reporter=verbose --cache=false`

Focused tests must prove:

- invalid input performs zero repository call; thrown/unknown closes;
- exact three-field result for paid/requested, shipped-support/requested, paid processing/recovery_hold;
- open/in-progress reconciliation overrides either actionable category to `hold`;
- terminal/missing/non-O1/no-intent cases are opaque `not_found`;
- query ambiguity/failure closes to `repository_error`;
- all reads leave request/order/payment/refund/inventory/shipment/reconciliation/history/audit state byte-equivalent.

Use the mission-authorized temporary canonical dependency symlink only for this exact command after the approved checks; no install/generate/copy/target write. Remove it after each run and verify canonical hashes unchanged plus DB/container/port/process/cache cleanup.

## Worker binding and skill

Primary runtime: existing Cosmile Claude Worker, Claude Opus 4.8 / `xhigh`, exact mission worktree and role. Load `/fable-builder` with `implementation-execution`, `contract-to-code-mapping`, and `test-design-before-code`; load `implementation-report-template` only at return. Current Agent Office authority overrides historical Foundation-docs role text.

If the verified primary runtime produces no meaningful patch/command after one bounded attempt, return compact `EXECUTION_NONCONVERGENCE`; do not self-route or widen scope.

## Prohibited

No route/UI/page/component change, no operator action/acknowledgement, no step-up/nonce, no provider/network/economic action, no schema/migration, no build/typecheck/full suite, no other test, no dependency/config/manifest change, no docs expansion, no Reviewer, no next module.

After GREEN: inspect exactly the five-path diff, commit once without inaccurate attribution, non-force push, prove clean/upstream-equal, return compact evidence, and STOP to `foundation-advisor`.
