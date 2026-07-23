# Advisor Worker Handoff — M4B Paid Cancellation Refund Composition

MISSION_ID: `COSMILE_O1_CUSTOMER_CANCELLATION_AND_MINIMUM_OPERATOR_QUEUE_V1`
MODULE: `M4B_PAID_CANCELLATION_REFUND_COMPOSITION`
BASE: `4a9af3f0f046610472f4817be37e2ed518998529`
ACTOR: existing Cosmile Worker, Claude Opus 4.8 / xhigh
SKILL: `/fable-builder`
REFERENCES: `implementation-execution`, `contract-to-code-mapping`,
`test-design-before-code`; `implementation-report-template` only at return
DELTA_ONLY_VERIFICATION: REQUIRED
REVIEW: payment/authorization delta deferred to the one cumulative
`HARD_IMPORTANT_SAFETY` Fable 5/max review

## Objective

Compose the reviewed M4A request lifecycle around the existing protected
`o1RefundOrder` full-refund lane and route. Reuse the existing operator
allowlist, single-use nonce, step-up bindings, full-only Toss transport,
idempotency key, WU-E order finalization, committed inventory posture, and
response categories. Do not copy or redefine refund/economic logic.

## Exact path ceiling

1. `app/src/lib/runtime/o1CommerceRuntime.ts`
2. `app/src/app/api/o1/operator/orders/[orderId]/refund/route.ts`
3. `app/scripts/o1_paid_cancellation_refund_runtime.vitest.ts`

No fourth path. No service-request core/repository, payment/refund/order
repository, step-up, schema/migration, UI, provider adapter, dependency,
config, build, typecheck, DB, network, credential, or broad test change.

## Runtime composition

Add one closed `o1ProcessPaidCancellationRefund` composition. Keep
`o1RefundOrder` byte-behavior available for its existing callers/tests.
Inject only three testable operations, with production defaults:

- M4A `admitPaidCancellation`;
- existing `o1RefundOrder`;
- M4A `settlePaidCancellation`.

The injected test operations are internal runtime ports only; callers cannot
select order/payment/refund/provider identifiers, amount, currency,
idempotency key, result, or settlement category.

Exact flow:

1. Call admission once with only `orderId` and the already-verified operator.
2. `already_completed`: call settlement once with `completed`, call the refund
   lane zero times, and return a closed durable-existing success only when
   settlement returns `completed|idempotent`. Any other settlement result
   fail-closes.
3. `admitted`: call the unchanged `o1RefundOrder` exactly once with the exact
   existing step-up/refund input.
4. Refund `refunded`: settle `completed` exactly once. Return success only for
   `completed|idempotent`; `recovery_hold` remains HOLD; every other result
   fail-closes as repository/request failure.
5. Refund `provider_rejected|order_rejected`: settle `recovery_hold` exactly
   once. If HOLD convergence succeeds, preserve the original closed rejection
   category; if settlement fails, return repository/request failure. Never
   report success.
6. Refund `not_authorized|not_enabled|transport_unavailable|repository_error`:
   do not settle; preserve the existing closed outcome. These paths have not
   established a provider economic effect in this composition.
7. Admission `recovery_hold`: zero refund and zero settlement; return HOLD.
   `not_found|not_actionable|not_authorized|invalid_input|repository_error`:
   zero refund/settlement and a closed request-gate failure.
8. Unknown/future admission, refund, or settlement outcomes fail closed.

Restart/replay:

- Exact durable refund/order truth with request left `requested|processing`
  enters via M4A `already_completed`, converges the request locally, and makes
  zero provider calls.
- Replaying a completed flow may settle idempotently but never calls the
  provider twice.
- A settlement write failure after durable refund returns failure; the request
  remains recoverable by the `already_completed` path on the next authorized
  attempt. Do not manufacture success.

## Route

Change only the final runtime call from raw `o1RefundOrder` to the new
composition. Preserve byte-semantically:

- flag 404, allowlisted operator 403, body parsing, nonce consumption,
  single-use replay refusal, reason, action/operator/order/freshness bindings;
- the two existing provider/finalization verifier instances;
- full-only request (no amount/currency/provider key from the body);
- current error status/category mapping.

Map both fresh success and durable-existing success to truthful
`result:"refunded", inventoryRestored:false`; use a category-only
`evidenceLayer:"durable_existing"` only for the zero-provider restart path.
HOLD/request-gate outcomes must never map to success.

## Tests first and exact command

First add the new focused test and run for meaningful RED (missing composition
and route still calling the raw refund function). Then implement only the two
source paths and run the identical command:

```bash
./node_modules/.bin/vitest run scripts/o1_paid_cancellation_refund_runtime.vitest.ts -t 'M4B ' --config vitest.config.ts --reporter=verbose --cache=false
```

Pure fake-port tests must prove the exact call matrix above, including:

- request gate before refund, zero provider on every non-admitted outcome;
- fresh success and durable-existing restart convergence;
- provider/order ambiguous rejection -> one HOLD settlement, no success;
- no settlement on auth/config/transport/pre-provider repository failure;
- settlement failure after refund -> no false success;
- replay sequence produces one refund call total;
- future outcome fail-closed.

Route tests/source contract must prove the existing auth/nonce/step-up ordering,
the new composition call, zero raw refund call, exact success/error mapping, and
no new caller-selected economic field.

No test may perform DB, provider/network, refund, payment, order, inventory,
shipment, or credential action.

Use only the mission-authorized temporary canonical dependency symlink; remove
it and prove canonical hashes unchanged. Inspect exact three-path diff, commit
once with truthful attribution or no co-author trailer, non-force push,
clean/upstream-equal, compact return, STOP before M4C.

STOP on any required fourth path, copied refund logic, changed step-up/nonce/
money semantics, actual provider/economic action, or inability to preserve the
existing route boundary.
