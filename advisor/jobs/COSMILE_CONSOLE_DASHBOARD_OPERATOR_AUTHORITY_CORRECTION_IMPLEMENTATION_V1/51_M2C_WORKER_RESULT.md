# 51 M2C Worker Result — Exact Operator Route Enforcement

MISSION `COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1` · MODULE M2C. Handoff 50 verified (blob `583d0041`, sha256 `2dae5342`, docs `0e118118`). Base `4dbfada` → commit `43ad9de61b9a972ca174faabc135044435a85a62`. **Schema/DB/provider/economic effect 0; no runtime-core edit.**

## Tests-first (focused RED→GREEN)
`./node_modules/.bin/vitest run scripts/o1_operator_route_authority.vitest.ts`
- RED: exit 1, **19 failed** — current routes still import/call `getShopper`/`o1OperatorForCustomer` and lack the exact capability gates (behavioral deny cases also fail). Meaningful (not tooling).
- GREEN: exit 0, **23 passed** (interim 6-fail was a test-only import-vs-call marker bug — fixed to match the call form `authorizeConsoleOperator(process.env`; no route change).

## Exact seven-path change set (6 routes + 1 test)
In all six routes: `o1RuntimeEnabled` remains the first gate with the disabled 404; `getShopper` + `o1OperatorForCustomer` removed; `authorizeConsoleOperator(process.env, capability, scope)` gates **before** any DB/core read, body parse, nonce mint/consume, step-up build, provider or mutation path; any non-authorized result → opaque `{error:"not_authorized"}` 403 (never the internal deny category); only `authorization.context` reaches the unchanged O1 core/step-up.

| Route | Method | Capability | Scope |
|---|---|---|---|
| `/orders` | GET | `dashboard.operations.read` + `service_requests.read`, both required, **same principal `operatorRef`** | global |
| `/orders/[orderId]` | GET | `service_requests.read` | exact order |
| `/orders/[orderId]/shipment` | POST | `shipment.record` | exact order |
| `/orders/[orderId]/support` | POST | `service_requests.support_acknowledge` | exact order |
| `/orders/[orderId]/refund` | POST | `refund.full_execute` | exact order |
| `/reconciliation` | GET / POST | `reconciliation.read` / `reconciliation.recover` | global |

## Preserved byte-semantically (test-asserted)
Route methods/paths/success+error shapes/flag behavior; queue bound 50 + sanitized projection; detail read order + nonce minted only after an authorized actionable detail; shipment record-only + no new step-up; support acknowledgement I/O + no new step-up; refund full-only + `inventoryRestored:false` + committed/HOLD + body allowlist/secret handling + nonce consumed before provider + **two** verifier instances + every outcome map; reconciliation count-only GET + fixed bounded POST + nonce-before-bridge + action/scope/reason-bound step-up + all maps. `o1OperatorForCustomer` untouched for legacy transition pages (no longer imported/called by these six routes).

## Contract proven
No `getShopper`/`o1OperatorForCustomer`/`AuthIdentity`/`CustomerAccount`/customer-session key/internal deny reason in any route; exact capability/scope table incl. the two same-principal queue grants; flag→authority→protected ordering in every route; **denied authority invokes zero protected dependency** (mocked refund + reconciliation POST: opaque 403, no nonce/verifier/core/decision/bridge call); refund/reconciliation step-up/nonce/core markers present in safe order; no caller-supplied capability/scope/operatorRef; no new step-up on shipment/support; no route shape/status map removed.

## Closure
`git diff --check` clean; staged = exactly the 7 ceiling paths (no eighth); package/lock unchanged; no DB/container/provider/network/runtime start; no `o1CommerceRuntime`/substrate/session/auth/UI/schema/audit-repo edit; no generate/typecheck/build/full-suite; public preview unmutated. One truthful commit `43ad9de` (parent `4dbfada`); non-force push; HEAD==upstream, clean. **M2D not started.**

RETURN_TO: foundation-advisor. STOP.
