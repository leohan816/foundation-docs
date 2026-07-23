# M2A Worker Handoff — Customer Request Runtime / POST Route

MISSION_ID: `COSMILE_O1_CUSTOMER_CANCELLATION_AND_MINIMUM_OPERATOR_QUEUE_V1`
MODULE: `M2A_CUSTOMER_SUBMIT_RUNTIME_ROUTE`
BASE: `6a0210ab17c5e701b80a7e48c056dee8d31e105b`
ACTOR: existing Cosmile Worker, Claude Opus 4.8/xhigh
SKILL: `/fable-builder`
SKILL_REFS: `implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`; `implementation-report-template` only at return
DELTA_ONLY_VERIFICATION: `REQUIRED`
RETURN_TO: `foundation-advisor`

## Objective and exact path ceiling

Connect the already-reviewed customer request service/repository to the existing O1 runtime and one authenticated customer POST route. Do not add policy, state, schema, UI, operator action, provider behavior, or another composition.

1. `app/src/lib/runtime/o1CommerceRuntime.ts`
2. `app/src/app/api/o1/orders/[orderId]/service-request/route.ts`
3. `app/scripts/o1_customer_service_request_route.vitest.ts`
4. `app/scripts/o1_order_service_request.dbtest.vitest.ts`

No fifth path, schema/migration, new outcome/status/kind, request body, client-selected economic field, refund/payment/inventory/shipment write beyond the existing repository behavior, provider/credential/network action, build, typecheck, generate, full file, full suite, or later module.

## Frozen source mapping

### Runtime composition

In `o1CommerceRuntime.ts`:

- import `submitCustomerServiceRequest` and its closed `ServiceRequestOutcome`;
- import the existing `serviceRequestRepository`;
- export exactly one function:
  `o1SubmitCustomerServiceRequest(orderId: string, ownerRef: string): Promise<ServiceRequestOutcome>`;
- delegate unchanged to `submitCustomerServiceRequest({ orderId, ownerRef }, { repo: serviceRequestRepository, id: idPort() })`;
- do not derive eligibility, inspect rows, catch/remap outcomes, or call a transport.

Insertion anchor: beside `o1CustomerOrderView` / `o1OperatorOrderView`, before the operator list section.

### Customer POST route

Create only `service-request/route.ts` beside the existing customer order GET route.

Order of gates:

1. `o1RuntimeEnabled(process.env)` false -> `404 { error: "flag_disabled" }`;
2. `getShopper()` without `userId` -> `401 { error: "not_authenticated" }`;
3. resolve only `ctx.params.orderId`; do not read a request body;
4. call `o1SubmitCustomerServiceRequest(orderId, owner.userId)` exactly once.

Closed HTTP mapping:

- `completed_pre_capture` -> `200 { ok: true, outcome: "completed_pre_capture" }`;
- `requested` -> `200 { ok: true, outcome: "requested", requestKind }`;
- `existing_request` -> `200 { ok: true, outcome: "existing_request", requestKind, status }`;
- `terminal | recovery_hold | unavailable` -> `409 { error: <same kind> }`;
- `not_found` -> `404 { error: "not_found" }`;
- `invalid_input` -> `400 { error: "invalid_input" }`;
- `repository_error` or an impossible future kind -> `500 { error: "repository_error" }`.

Export one pure category helper from the route only if required by the focused test. It may return only the above body/status pair and must accept only `ServiceRequestOutcome`.

## Tests first

### Route contract test

Create `o1_customer_service_request_route.vitest.ts`.

Use Vitest module mocks only for `getShopper`, `o1RuntimeEnabled`, and `o1SubmitCustomerServiceRequest`. Do not mock or reproduce request eligibility.

Named tests:

1. `M2A disabled and unauthenticated gates make zero runtime calls`
2. `M2A authenticated POST passes only params orderId and session owner exactly once`
3. `M2A closed outcomes map to the frozen sanitized HTTP matrix`
4. `M2A POST never reads or forwards caller economic input`

The final test uses a request object whose `json()` throws if called and proves the runtime receives only the two string arguments.

### Actual runtime/repository composition

In the existing disposable-PG test file, extend the synthetic fixture only with `O.runtime` / suffix `AAB7`: one O1 paid-unshipped order with captured intent, exactly one succeeded capture, exact committed reservation, no shipment/request/refund/reconciliation. Do not alter existing fixtures/assertions.

Add exactly:

`M2A runtime composition delegates to the actual request repository with zero economic effect`

- dynamically import `o1SubmitCustomerServiceRequest` after `DATABASE_URL` is bound;
- call it for `O.runtime` / `OWNER`;
- expect `{ kind: "requested", requestKind: "paid_unshipped_cancel" }`;
- prove exactly one requested row and customer audit;
- prove Order paid, one capture, Refund zero, reservation committed, stock unchanged, ShipmentRecord zero, reconciliation zero.

Expected RED: the new route/runtime export does not exist. Preserve the first actionable missing-export/module failure and nonzero exit. Test construction failures must be corrected only in the two test paths before implementation; never weaken an assertion.

## Focused command and environment

Use the already-approved mission-only dependency boundary. Before each run verify the worktree dependency path has no user/non-cache content or process; create the temporary symlink to the unchanged canonical `/home/leo/Project/Cosmile/app/node_modules`; never install/generate/copy/write the target; remove the symlink immediately; unconditionally remove the disposable DB/container; prove canonical hashes unchanged and no residue.

From `app/`, run exactly the same command for RED and GREEN:

```text
./node_modules/.bin/vitest run scripts/o1_customer_service_request_route.vitest.ts scripts/o1_order_service_request.dbtest.vitest.ts -t 'M2A ' --config vitest.config.ts --reporter=verbose --cache=false
```

After valid RED implement only the two source paths. After GREEN inspect the exact four-path diff, test-meaning deletions, cleanup, and Git state. Commit once without hooks/signing, non-force push, prove clean/upstream-equal, return compact evidence, and STOP.

STOP for any need to read body/economic input, add another owner/auth rule, expand outcomes, change service/repository policy, touch schema, expose an internal/provider/customer identifier, add a fifth path, contact a provider, or run broader verification.
