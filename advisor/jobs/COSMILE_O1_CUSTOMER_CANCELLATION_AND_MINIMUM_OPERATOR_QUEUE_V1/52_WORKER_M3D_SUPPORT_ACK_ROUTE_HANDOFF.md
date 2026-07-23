# ADVISOR -> COSMILE WORKER — M3D SHIPPED SUPPORT ACK ROUTE

MISSION: `COSMILE_O1_CUSTOMER_CANCELLATION_AND_MINIMUM_OPERATOR_QUEUE_V1`
MODULE: `M3D_SHIPPED_SUPPORT_ACK_ROUTE`
BASE: `4cd80a9b52ac951a4783f930a132b70f268ca048`
INSTRUCTION_GATE: `PROCEED_WITH_LIMITS`
DELTA_ONLY_VERIFICATION: `REQUIRED`

## Exact objective

Wire the reviewed M3C non-economic shipped-support acknowledgement core through one existing O1 runtime composition function and one allowlisted operator POST route. This module adds no UI, step-up, refund, payment, inventory, shipment, courier, provider, schema, DB migration, or economic effect.

## Exact path ceiling

1. `app/src/lib/runtime/o1CommerceRuntime.ts`
2. `app/src/app/api/o1/operator/orders/[orderId]/support/route.ts`
3. `app/scripts/o1_operator_support_ack.vitest.ts`

No fourth product path.

## Frozen behavior

- Add one runtime function that accepts only internal `orderId` plus the already-verified `OperatorContext` and delegates exactly once to `acknowledgeShippedSupportRequest` with `operatorServiceRequestProcessingRepository` and the existing `idPort()`. It must not derive eligibility, query Prisma directly, mint authority, catch/remap outcomes, or call any economic/provider lane.
- Add one `POST` route under the exact path above:
  1. preserve the existing O1 runtime-disabled `404 {error:"flag_disabled"}` before identity work;
  2. resolve the existing shopper session and immutable-subject operator allowlist through `o1OperatorForCustomer`;
  3. denied/missing operator -> opaque `403 {error:"not_authorized"}` and zero acknowledgement call;
  4. take only `orderId` from the route params; parse no request body and accept no caller-selected request kind/status, identity, payment/refund, amount, currency, provider key, shipment, reason, or audit field;
  5. call the runtime acknowledgement once and map the closed outcome exactly:
     - `accepted | idempotent` -> `200 {ok:true,result:<kind>}`;
     - `not_found` -> `404 {error:"not_found"}`;
     - `not_actionable | recovery_hold` -> `409 {error:<kind>}`;
     - `not_authorized` -> `403 {error:"not_authorized"}`;
     - `invalid_input` -> `400 {error:"invalid_input"}`;
     - every other/unknown result -> `500 {error:"repository_error"}`.
- Success/error bodies expose no request id, customer/operator identity, order number, PII, payment/provider reference, amount, shipment/tracking value, raw error, audit id, or secret.
- The approved experience design requires no step-up for this shipped-support acknowledgement. Do not reuse or alter the refund step-up/nonce path.

## Tests first and focused command

First add only named `M3D ` tests in the exact new test file and run the exact command to preserve meaningful RED. Then implement only the two source paths and rerun the identical command for GREEN:

`./node_modules/.bin/vitest run scripts/o1_operator_support_ack.vitest.ts -t 'M3D ' --config vitest.config.ts --reporter=verbose --cache=false`

The focused tests must prove:

- runtime disabled and denied operator perform zero acknowledgement calls;
- the verified operator context and decoded internal order id are forwarded exactly once;
- every frozen outcome/status/body mapping, including unknown -> closed 500;
- no body-derived or sensitive field reaches the runtime call;
- existing refund/step-up functions are neither called nor changed.

Use only the mission-authorized temporary canonical `app/node_modules` symlink after the required absence/cache/process/compatibility checks; do not install, generate, copy, or mutate the target. Remove the symlink immediately, verify canonical hashes unchanged, and leave no cache/process/DB/port residue.

## Worker binding and skill

Primary runtime: existing Cosmile Claude Worker, Claude Opus 4.8 / `xhigh`, exact mission worktree and role. Load `/fable-builder` with `implementation-execution`, `contract-to-code-mapping`, and `test-design-before-code`; load `implementation-report-template` only at return. Current Agent Office authority overrides historical Foundation-docs role text.

If the exact handoff is verified but the primary runtime produces no meaningful patch/command after one bounded attempt, return compact `EXECUTION_NONCONVERGENCE`; do not self-route or widen scope.

## Prohibited

No UI/panel/page change, no step-up/nonce change, no provider/network/economic action, no schema/migration/DB, no build/typecheck/full suite, no existing broad test, no dependency/config/manifest change, no docs expansion, no Reviewer, no M3E or paid-cancellation module.

After GREEN: inspect exactly the three-path diff, commit once without an inaccurate co-author trailer, non-force push, prove clean/upstream-equal, return a compact evidence index, and STOP to `foundation-advisor`.
