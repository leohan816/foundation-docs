# 50 — M2C Worker Handoff: Exact Operator Route Enforcement

```text
MISSION: COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1
MODULE: M2C
BASE: 4dbfada9cf2ab6126ab587fca0c1bf2bc0e2795f
WORKTREE: /home/leo/Project/.worktrees/Cosmile/COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1
ACTOR: existing Cosmile Worker; Claude Opus 4.8 / xhigh
SKILL: /fable-builder
REFERENCES: implementation-execution, contract-to-code-mapping, test-design-before-code; implementation-report-template only at return
SCHEMA_DB_PROVIDER_ECONOMIC_EFFECT: 0
STOP_AFTER: M2C result
```

## Exact seven-path ceiling

1. `app/src/app/api/o1/operator/orders/route.ts`
2. `app/src/app/api/o1/operator/orders/[orderId]/route.ts`
3. `app/src/app/api/o1/operator/orders/[orderId]/shipment/route.ts`
4. `app/src/app/api/o1/operator/orders/[orderId]/support/route.ts`
5. `app/src/app/api/o1/operator/orders/[orderId]/refund/route.ts`
6. `app/src/app/api/o1/operator/reconciliation/route.ts`
7. `app/scripts/o1_operator_route_authority.vitest.ts`

No eighth path. In particular, do not edit `o1CommerceRuntime.ts`, the authority substrate, session/auth modules, O1 cores, UI, schema/migration, audit repositories or current preview. Do not start M2D.

## Exact route mapping

In all six routes:

- preserve `o1RuntimeEnabled` as the first gate and the existing disabled 404;
- remove `getShopper` and `o1OperatorForCustomer`;
- call `authorizeConsoleOperator(process.env, exactCapability, exactScope)` from M2B;
- any non-authorized result becomes the existing opaque `{error:"not_authorized"}` 403; never return the internal deny category;
- only `authorization.context` reaches the unchanged O1 core/step-up code;
- authorization must complete before any DB/core read, body parsing, nonce mint/consume, step-up creation, provider or mutation path.

Exact capabilities/scopes:

| Route | Method | Required capability | Scope |
|---|---|---|---|
| `/orders` | GET | both `dashboard.operations.read` and `service_requests.read` | global |
| `/orders/[orderId]` | GET | `service_requests.read` | exact order |
| `/orders/[orderId]/shipment` | POST | `shipment.record` | exact order |
| `/orders/[orderId]/support` | POST | `service_requests.support_acknowledge` | exact order |
| `/orders/[orderId]/refund` | POST | `refund.full_execute` | exact order |
| `/reconciliation` | GET | `reconciliation.read` | global |
| `/reconciliation` | POST | `reconciliation.recover` | global |

For the queue, both independent authorizations must pass and must resolve the same principal-based `operatorRef`; otherwise opaque 403. Do not combine two different contexts.

## Invariants to preserve byte-semantically after the authority replacement

- route methods, public paths, success/error shapes and O1 flag behavior;
- queue bound 50 and sanitized projection;
- detail read order, truthful request projection and nonce minted only after authorized actionable detail;
- shipment record-only behavior and current validation/outcome mapping; no new step-up;
- support acknowledgement input/output and no new step-up;
- refund full-only, no automatic inventory restoration, committed/HOLD inventory, body allowlist/secret handling, nonce consumed before provider/mutation, two exact verifier instances and every existing outcome mapping;
- reconciliation count-only GET, fixed bounded POST, existing body validation, nonce-before-bridge, action/scope/reason-bound step-up, zero caller-selected economic input and current mappings.

`o1OperatorForCustomer` may remain for untouched legacy transition pages until M3B; it must no longer be imported or called by any of these six command/read API routes.

## Tests first and focused command

1. Add `o1_operator_route_authority.vitest.ts` first.
2. Run only:
   `./node_modules/.bin/vitest run scripts/o1_operator_route_authority.vitest.ts`
   Require meaningful RED against the current customer-session authority imports/calls and missing exact capability gates.
3. Change only the six routes.
4. Run the identical command; require GREEN.

The test must inspect all six exact route sources and prove:

- no `getShopper`, `o1OperatorForCustomer`, `AuthIdentity`, `CustomerAccount`, customer/session-derived operator key or internal deny reason is used;
- exact capability/scope table above, including two same-context queue grants;
- runtime flag precedes authority; authority precedes all protected core/body/nonce/step-up/provider/mutation markers;
- denied authority invokes zero protected dependency in a focused mocked route case for at least refund and reconciliation POST;
- current refund/reconciliation step-up/nonce/core markers remain present and in their safe order;
- no caller-supplied capability/scope/operatorRef and no new step-up on shipment/support;
- no route shape or status mapping is removed.

No DB/container/provider/network/runtime start. No generate/typecheck/build/full suite. `git diff --check`, exact seven-path containment, package/lock unchanged and public preview unchanged. One truthful commit/non-force push, compact result/pointer in this job directory, then STOP.
