# M1D Worker Handoff — Fulfillment / Active Request Race

MISSION_ID: `COSMILE_O1_CUSTOMER_CANCELLATION_AND_MINIMUM_OPERATOR_QUEUE_V1`
MODULE: `M1D_FULFILLMENT_REQUEST_RACE`
BASE: `989257b8c459909052fc0da6c0cf3843b69fff71`
ACTOR: existing Cosmile Worker, Claude Opus 4.8/xhigh
SKILL: `/fable-builder`
SKILL_REFS: `implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`; load `implementation-report-template` only at return
DELTA_ONLY_VERIFICATION: `REQUIRED`
RETURN_TO: `foundation-advisor`

## Exact ceiling and objective

Close only the race between the existing record-only fulfillment transition and the M1C paid-unshipped request. Reuse the existing per-order advisory lock. Change only:

1. `app/src/lib/order/contracts.ts`
2. `app/src/lib/order/service.ts`
3. `app/src/lib/order/repository.ts`
4. `app/scripts/o1_order_lifecycle.vitest.ts`
5. `app/scripts/o1_order_service_request.dbtest.vitest.ts`

No sixth path, schema/migration, payment/refund/inventory mutation, provider/credential/reconciliation action, build, typecheck, generate, full file, full suite, or unrelated read.

## Frozen contract

- Add exactly one closed fulfillment result: `request_conflict`.
- Under the existing order advisory lock, after `orderFullyBoundCoherent(...)` succeeds and before any `ShipmentRecord` read/write, detect `OrderServiceRequest(kind='paid_unshipped_cancel', status IN ('requested','processing','recovery_hold'))`.
- An active match returns `request_conflict` with zero ShipmentRecord/history/audit/economic write.
- `refused` is non-active. `shipped_support` never blocks. Existing coherence, transition, tracking, authorization, and audit rules stay byte-semantically unchanged.
- At concurrent `preparing -> shipped` versus customer request, exactly one convergence is valid:
  - request wins: one `paid_unshipped_cancel/requested`, shipment remains `preparing`, fulfillment returns `request_conflict`; or
  - shipment wins: shipment becomes `shipped`, one `shipped_support/requested`.
- Never persist both `paid_unshipped_cancel` and `shipped`; seeded capture count remains one; Refund count remains zero; committed inventory and stock remain unchanged.

## Tests-first patch — exact anchors and names

First edit only the two test paths.

### Pure service test

File: `o1_order_lifecycle.vitest.ts`

Insertion anchor: inside `describe("advanceFulfillment — record-only, operator-gated, coherence-gated", ...)`, immediately after `fInput(...)` and before the existing `advances pending→preparing...` test.

Add exactly:

`M1D maps request_conflict unchanged with zero local mutation`

Test mapping:

- create `emptyWorld()`, call `seedFulfillable(w)`, and obtain `base = makeDeps(w)`;
- create `ServiceDeps` by retaining `base` and overriding only `repo.recordFulfillmentTransition` to return `{ kind: "request_conflict" as const }`;
- snapshot `w.shipments`, `w.history`, and `w.audits`;
- call `advanceFulfillment(fInput({ toStatus: "preparing" }), deps)`;
- expect exactly `{ kind: "request_conflict" }` and byte-equivalent snapshots.

Expected RED before source implementation: result is `{ kind: "repository_error" }`, because the current service switch has no `request_conflict` case.

### Actual-repository DB tests

File: `o1_order_service_request.dbtest.vitest.ts`

Import/initialization anchors:

- next to the existing request-repository type import, add `OrderRepository` and `ShipmentStatus` type imports from `../src/lib/order/contracts`;
- next to `let repo`, add `let fulfillmentRepo: OrderRepository`;
- after `DATABASE_URL` is set and the request repository is imported in `beforeAll`, import `../src/lib/order/repository` and bind its exported `orderRepository`;
- next to `submit(...)`, add `fulfill(orderId, toStatus, trackingRef)` using the existing `uid(...)` for shipment/history/audit IDs, category-only operator fields, and `failAudit: false`.

Fixture anchor: extend the existing `O`/`FIXTURE` shapes only with four coherent paid synthetic orders:

- `block` / orderNo suffix `AAB3`: shipment `preparing`; one active `paid_unshipped_cancel/processing`;
- `refused` / suffix `AAB4`: shipment `preparing`; one `paid_unshipped_cancel/refused` with `resolvedAt`;
- `support` / suffix `AAB5`: shipment `shipped` with bounded synthetic tracking; one `shipped_support/requested`;
- `race` / suffix `AAB6`: shipment `preparing`; no request.

For each add exactly the existing repository-required coherent footprint: one synthetic SKU and line, paid Order with `paidAt`, captured Toss PaymentIntent, one succeeded capture, exact committed reservation, and exactly one `OrderStatusHistory(toStatus='paid')`. Do not alter existing M1C fixtures or assertions.

Append exactly these tests before the closing DB `describe`:

1. `M1D active paid-unshipped request blocks fulfillment with zero write`
   - call `fulfill(block, "shipped", boundedTracking)`;
   - expect `request_conflict`;
   - shipment remains `preparing`; request remains exactly one/processing;
   - no new fulfillment history/audit; Refund zero; seeded capture exactly one; committed reservation/stock unchanged.
2. `M1D refused and shipped-support requests do not block fulfillment`
   - `refused` advances `preparing -> shipped`;
   - `support` advances `shipped -> delivered` using carried tracking;
   - request rows remain unchanged and no Refund or second capture appears.
3. `M1D request-versus-shipped race has exactly one closed convergence`
   - `Promise.all([submit(race, OWNER), fulfill(race, "shipped", boundedTracking)])`;
   - assert exactly one request;
   - if request kind is `paid_unshipped_cancel`, submission is requested, fulfillment is `request_conflict`, shipment is `preparing`;
   - if request kind is `shipped_support`, fulfillment is transitioned to `shipped`, submission is requested;
   - reject every other combination, especially paid-unshipped plus shipped;
   - Refund zero, capture exactly one, committed inventory/stock unchanged.

Expected repository RED before source implementation: the active case transitions instead of returning `request_conflict`; the race may persist the forbidden paid-unshipped-plus-shipped combination. Preserve the exact first failing assertion and nonzero exit.

## Focused commands and temporary dependency boundary

Before each command, apply the already-approved mission-only mechanism:

- verify worktree `app/node_modules` is absent or contains only unused Git-ignored disposable `.vite` cache;
- remove only that verified cache/empty directory if present;
- verify canonical `/home/leo/Project/Cosmile/app/node_modules` is a real directory, package/lock are byte-identical, Prisma is `6.19.3`, and record canonical hashes;
- create a temporary worktree `app/node_modules` symlink to that canonical directory;
- never install, generate, copy, or write to the target.

From `app/`, run exactly once for RED and exactly once for GREEN:

```text
./node_modules/.bin/vitest run scripts/o1_order_lifecycle.vitest.ts scripts/o1_order_service_request.dbtest.vitest.ts -t 'M1D ' --config vitest.config.ts --reporter=verbose --cache=false
```

After each command remove only the worktree symlink. Unconditionally remove the disposable DB/container. Verify canonical hashes unchanged, no worktree dependency/cache/process/DB/port residue, and exact five-path containment.

## Source implementation mapping after valid RED

1. `contracts.ts`
   - add `{ kind: "request_conflict" }` to `FulfillmentOutcome`;
   - add `"request_conflict"` to `OrderRepository.recordFulfillmentTransition` return-kind union.
2. `service.ts`
   - in `advanceFulfillment` switch, map repository `request_conflict` unchanged to `{ kind: "request_conflict" }`.
3. `repository.ts`
   - inside `recordFulfillmentTransition`, retain the existing advisory lock and coherence gate;
   - immediately after coherence succeeds, run one transaction-local `SELECT EXISTS` for the exact active request kind/status set;
   - if true, return `{ kind: "request_conflict" as const }`;
   - otherwise execute the existing ShipmentRecord transition path unchanged.

Do not modify the in-memory fake repository implementation; the pure test deliberately injects the new closed result.

## Completion and STOP

After GREEN: inspect only the five-path diff, commit once, non-force push, prove clean/upstream-equal, and return a compact evidence index. Do not start the next module.

STOP before action if any sixth path, missing fixture fact outside these paths, dependency mutation, schema change, new request kind/status, provider/economic action, broad refactor, unbounded test, or failure to preserve the two closed race outcomes is required.
