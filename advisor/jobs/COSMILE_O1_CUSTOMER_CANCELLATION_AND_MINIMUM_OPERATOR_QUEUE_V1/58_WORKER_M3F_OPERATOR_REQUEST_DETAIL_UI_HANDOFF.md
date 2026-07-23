# ADVISOR -> COSMILE WORKER — M3F OPERATOR REQUEST DETAIL UI

MISSION: `COSMILE_O1_CUSTOMER_CANCELLATION_AND_MINIMUM_OPERATOR_QUEUE_V1`
MODULE: `M3F_OPERATOR_REQUEST_DETAIL_UI`
BASE: `1ce28dd5e30ff6b434aa50c29009480042973f73`
INSTRUCTION_GATE: `PROCEED_WITH_LIMITS`
DELTA_ONLY_VERIFICATION: `REQUIRED`
REVIEW_TIER: `NORMAL candidate deferred to cumulative review`; no module Reviewer.

## Exact objective

Connect the existing allowlisted operator detail GET and existing `O1OperatorPanel` to the reviewed M3E-R1 durable request projection and M3D shipped-support POST. Render exactly one truthful request action: support acknowledgement for shipped-support, existing protected full refund for paid-unshipped, no action for HOLD or terminal requests. Preserve the no-request legacy panel behavior. No provider call or economic action is executed in tests.

## Exact path ceiling

1. `app/src/app/api/o1/operator/orders/[orderId]/route.ts`
2. `app/src/components/commerce/O1OperatorPanel.tsx`
3. `app/scripts/o1_operator_request_detail_ui.vitest.ts`

No fourth path.

## Detail GET contract

- Preserve runtime-disabled 404 and immutable-subject operator denial 403 before any order/request read.
- Call `o1OperatorOrderView` first. Preserve its existing `not_found|not_authorized|invalid_input|repository_error` mapping and do not read a request when the order view is not `ok`.
- Only after an `ok` order view call `o1OperatorServiceRequestDetail(orderId)` exactly once:
  - `found` -> return its exact three-field request projection;
  - `not_found` -> return `request:null`;
  - `invalid_input` -> 400;
  - `repository_error` or unknown -> 500.
- Mint a fresh step-up nonce only for `request:null` (preserve the pre-existing Golden operator panel) or exact `paid_unshipped_cancel/requested/refund_request`. Return `stepUpNonce:null` for support, HOLD, terminal/none, or malformed projections.
- Success body is exactly `{ok:true, order, request, stepUpNonce}`. Do not add identity, request id, amount/provider data, secrets, raw errors, or another authority field.

## Panel truth and behavior

- Add the closed request detail type and export a pure fail-closed mode classifier:
  - `null` -> `legacy`;
  - exact `paid_unshipped_cancel/requested/refund_request` -> `refund`;
  - exact `shipped_support/requested/support_request` -> `support`;
  - exact valid request with `actionCategory:"hold"` -> `hold`;
  - exact valid terminal request with `actionCategory:"none"` -> `settled`;
  - every malformed/unknown non-null projection -> `hold`, never `legacy|refund|support`.
- Fetch the detail success shape, retain only a string nonce, and treat malformed/missing request fields as fail-closed `hold`.
- Factor the existing action sections into a pure presentational export so the focused test can inspect semantic/test-id output without adding a browser library:
  - `support`: render only a `지원 요청 확인` section/button, no shipment inputs/buttons, refund button, step-up input, or nonce UI;
  - `refund`: render only the existing TEST full-refund section, no shipment or support action;
  - `hold`: render the reviewed reconciliation/HOLD warning and no action;
  - `settled`: render the durable request status and no action;
  - `legacy`: preserve the existing record-only shipment plus TEST full-refund sections unchanged.
- Export one focused support POST helper used by the panel. It must call only the encoded existing M3D support route with `{method:"POST"}` and no request body, headers, step-up value, nonce, request/status field, or other payload. Return only a sanitized success/error category.
- After support `accepted|idempotent`, show a durable inline message and reload the GET projection; on error show only its closed category. No retry loop.
- Support action has no step-up. Existing refund step-up remains byte-semantically unchanged and is rendered only in `refund|legacy`.
- Action region uses `aria-busy`; result uses `aria-live="polite"`; button remains disabled while busy. No new visual tokens, navigation, modal, animation, dashboard, or redesign.

## Tests first and exact command

First create only the exact focused test and run this exact command for meaningful RED. Then implement the two source paths and rerun the identical command:

`./node_modules/.bin/vitest run scripts/o1_operator_request_detail_ui.vitest.ts -t 'M3F ' --config vitest.config.ts --reporter=verbose --cache=false`

Tests must prove:

- GET ordering, zero downstream calls on flag/auth/order failure, exact request mapping, fail-closed unknown, and nonce issuance only for refund/null;
- exact classifier matrix including malformed non-null -> hold;
- pure rendered action surface for support/refund/hold/settled/legacy with mutually exclusive controls;
- support helper uses one encoded POST with no body/headers/step-up/nonce and returns only closed categories;
- no test performs provider, refund, payment, inventory, shipment, DB, or network action.

Use only the mission-authorized temporary canonical dependency symlink for the exact command; remove it after each run and verify canonical hashes plus cache/process residue. No DB/container is required.

## Worker binding and skill

Primary: existing Cosmile Claude Worker, Opus 4.8/`xhigh`, exact CWD/role; `/fable-builder` with `implementation-execution`, `contract-to-code-mapping`, and `test-design-before-code`; report template only at return. The reviewed Designer two-pass experience and current Agent Office authority are binding. On documented zero-delta execution non-convergence, return to Advisor for the approved existing Codex fallback; do not self-route.

## Prohibited

No service/repository/schema/migration change, no refund route/core/step-up/nonce implementation change, no provider/network/economic/DB action, no page/layout/queue redesign, no full suite/build/typecheck/other test, no dependency/config/manifest change, no Reviewer or next module.

After GREEN: exact three-path audit, one additive commit without inaccurate attribution, non-force push, clean/upstream-equal, compact return, STOP.
