# 90 — M3C Worker Handoff: Safe Predecessor Transition Surfaces

MISSION: `COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1`
MODULE: M3C
BASE: `cdfcc2ee6291f3ebc9f4be4054c94cb7c6748e6e`
ACTOR: existing Cosmile Claude Worker primary · Opus 4.8/xhigh
SKILL: `/fable-builder` with implementation-execution, contract-to-code-mapping, test-design-before-code; report template only at return

## Exact path ceiling

1. `app/src/app/console/orders/page.tsx`
2. `app/src/app/console/orders/[orderId]/page.tsx`
3. `app/src/app/console/fulfillment/page.tsx`
4. `app/src/app/console/finance/page.tsx`
5. `app/src/app/console/settings/page.tsx`
6. `app/src/app/o1/operator/page.tsx`
7. `app/src/app/o1/operator/orders/[orderId]/page.tsx`
8. `app/scripts/o1_operator_transition_routes.vitest.ts`

No ninth path.

## Frozen transition

- Preserve every route as a Korean-first, read-only transition surface; do not delete or server-redirect.
- Console routes retain their existing Console-session requirement and runtime flag, then show no O1 data/action. Link respectively to `/dashboard/requests`, `/dashboard/fulfillment`, `/dashboard/finance`, `/dashboard/settings`.
- Console order detail decodes and bounds the opaque route value fail closed, then links to `/dashboard/requests/${encodeURIComponent(orderId)}`. It renders no `O1OperatorPanel`.
- Legacy `/o1/operator` retains its runtime flag and shows no customer/session-derived authority, queue, reconciliation or action. It links to `/dashboard`.
- Legacy `/o1/operator/orders/[orderId]` decodes and bounds the opaque route value fail closed, then links to the encoded Dashboard detail. It renders no `O1OperatorPanel`.
- Transition copy states that operational facts/actions are now in Dashboard and that this predecessor path performs no action.
- No route grants authority. Dashboard and APIs remain the sole screen/command authorization boundaries.

## Tests first

Create the focused test first and run exactly:

`./node_modules/.bin/vitest run scripts/o1_operator_transition_routes.vitest.ts`

Meaningful RED must identify existing customer-derived authority, O1 reads/panels/actions and missing transition targets. GREEN must prove:

- exact seven retained routes and exact Dashboard links;
- Console routes still call `requireConsoleUser` before presentation;
- both detail routes decode/bound and encode the destination;
- all seven routes contain no `getShopper`, `o1OperatorForCustomer`, O1 read functions, `O1OperatorPanel`, refund/shipment/support/recovery form, direct API call, `redirect(` or mutation;
- Korean transition/no-action wording, focus-visible link and mobile-safe layout;
- no Dashboard/API/runtime/economic behavior change.

Do not run another test, build, typecheck, generate, DB, provider, runtime, browser, M4 or broad search. One truthful Claude commit without co-author trailer, non-force push, clean/upstream-equal. Write only `91_M3C_WORKER_RESULT.md` and `92_M3C_WORKER_POINTER.md`; return and STOP.
