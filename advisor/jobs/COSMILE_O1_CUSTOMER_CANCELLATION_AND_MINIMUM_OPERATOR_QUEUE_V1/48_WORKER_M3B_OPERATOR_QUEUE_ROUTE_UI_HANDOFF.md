# ADVISOR -> COSMILE WORKER — M3B OPERATOR QUEUE ROUTE AND UI

MISSION_ID: `COSMILE_O1_CUSTOMER_CANCELLATION_AND_MINIMUM_OPERATOR_QUEUE_V1`
MODULE: `M3B_OPERATOR_QUEUE_ROUTE_UI`
BASE: `bcf0fabac8c32a985d6628ee7f534d165df2ef32`
WORKER: existing primary Cosmile Worker, Claude Opus 4.8 / xhigh
SKILL: `/fable-builder`
REFERENCES: `implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`; report template only at return
DELTA_ONLY_VERIFICATION: REQUIRED

## Objective

Replace only the existing all-O1 operator list projection with the reviewed M3A active service-request queue in the existing allowlisted operator API/page. This module is read-only: it adds no operator action, transition, step-up, refund, support acknowledgement, provider/economic effect, or redesign.

## Exact path ceiling

1. `app/src/app/api/o1/operator/orders/route.ts`
2. `app/src/app/o1/operator/page.tsx`
3. `app/scripts/o1_operator_service_request_queue.vitest.ts`

No fourth path. No contracts/repository/runtime/detail/panel/customer/schema/migration/payment/refund/inventory/shipment/reconciliation/auth/config/dependency change; no DB, browser, build, typecheck, full suite, network, credential, or economic effect.

## Frozen API behavior

- Preserve the exact `o1RuntimeEnabled` 404 and existing `getShopper` plus immutable-identity operator resolution. A denied operator remains one opaque 403 and the queue function is called zero times.
- Replace `o1OperatorOrderList(50)` only with `o1OperatorServiceRequestQueue(50)`.
- `repository_error` returns category-only 500 `{ error: "repository_error" }`; it must never become an empty-success response.
- Success returns `{ ok: true, requests: [...] }`. Each request contains exactly `orderId`, `orderNo`, `kind`, `status`, `category`, and ISO `requestedAt`; no other field.
- Map only M3A's closed rows. Do not infer eligibility, refundability, shipment truth, customer identity, money, provider/payment/refund data, reason/free text, secret, audit data, or raw error.

## Frozen page behavior

- Preserve the existing non-production label, allowlist denial surface, and count-only reconciliation section.
- Read `o1OperatorServiceRequestQueue(50)` directly after successful operator resolution.
- `repository_error` renders `요청 큐를 불러올 수 없습니다.` with `data-testid="o1-operator-queue-unavailable"`; it must not render the empty state.
- Empty success renders `처리 대기 중인 요청이 없어요.` with `data-testid="o1-operator-queue-empty"`.
- Non-empty success renders one semantic list, `data-testid="o1-operator-request-queue"`. Each row links only to the existing `/o1/operator/orders/{encoded internal orderId}` detail.
- Show only opaque order number, requested date/time, closed request status, and the category label:
  - `refund_request` -> `TEST 전액환불`
  - `support_request` -> `지원확인`
  - `hold` -> `확인 필요`
- The list has no processing/refund/support button, form, step-up input, customer identity, amount/currency, provider/payment/refund reference, or request/internal id display. The internal order id is used only in the existing encoded detail link.
- No filters, dashboard widgets, modal, navigation redesign, animation, or color-only meaning in this module.

## Tests first

Run only:

`./node_modules/.bin/vitest run scripts/o1_operator_service_request_queue.vitest.ts -t 'M3B ' --config vitest.config.ts --reporter=verbose --cache=false`

1. Add the test file first and run exact meaningful RED.
2. Patch only the route and page, then run identical GREEN.
3. Prove disabled 404, denied 403/zero queue call, repository-error 500, exact success envelope/key redaction/ISO timestamp, page denial/unavailable/empty/list distinctions, exact labels/link, preservation of reconciliation section, and absence of action/form/step-up/unsafe fields.

Use only the mission-approved temporary canonical dependency symlink, remove immediately, canonical hashes unchanged, no cache/process residue.

## STOP and return

STOP for an auth/runtime/repository contract change, fourth path, action/control, detail/panel/customer change, exposure beyond the exact API/UI fields, treating failure as empty, dependency/config mutation, broader test, or cleanup mismatch.

After GREEN: one additive commit, non-force push, truthful Claude attribution or no co-author trailer. Return <=18 lines: skill/refs, RED/GREEN, exact paths, auth/error/redaction/UI proof, zero effects/cleanup, attribution, commit/upstream/clean, STOP. Do not start M3C or Reviewer.
