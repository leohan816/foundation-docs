# ADVISOR -> COSMILE WORKER — M2D CUSTOMER HISTORY REQUEST BADGE

MISSION_ID: `COSMILE_O1_CUSTOMER_CANCELLATION_AND_MINIMUM_OPERATOR_QUEUE_V1`
MODULE: `M2D_CUSTOMER_HISTORY_REQUEST_BADGE`
BASE: `691933de11fb262e6a5e04edbdf54608e9350281`
WORKER: existing primary Cosmile Worker, Claude Opus 4.8 / xhigh
SKILL: `/fable-builder`
REFERENCES: `implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`; report template only at return
DELTA_ONLY_VERIFICATION: REQUIRED

## Objective

Add only a truthful service-request status badge to each existing customer order-history card. The list gets no request CTA and makes no eligibility/economic decision; the detail remains the sole action surface.

## Exact path ceiling

1. `app/src/app/account/orders/page.tsx`
2. `app/scripts/o1_order_service_request_browser.vitest.ts`

No third path. No component/detail/API/service/repository/schema/migration/operator/payment/refund/provider/config/dependency change; no DB, browser, build, typecheck, full suite, network, credential, or economic effect.

## Frozen behavior

- Extend only the existing owner-scoped `prisma.order.findMany` include/select to read the optional one-to-one `OrderServiceRequest` closed `kind` and `status`.
- Render a compact text badge on a card only when the relation exists. No CTA, button, form, click handler, modal, filter, count semantics, navigation, or layout redesign.
- Closed badge text:
  - `pre_capture_cancel/completed` -> `주문 취소 완료`
  - `paid_unshipped_cancel/requested|processing` -> `취소 요청 처리 중`
  - `paid_unshipped_cancel/completed` -> `전액 환불 완료`
  - `paid_unshipped_cancel/refused` -> `취소 요청 처리 불가`
  - `paid_unshipped_cancel/recovery_hold` -> `처리 결과 확인 중`
  - `shipped_support/requested` -> `반품·도움 요청 접수`
  - `shipped_support/accepted` -> `반품·도움 요청 확인`
  - `shipped_support/refused` -> `반품·도움 요청 처리 불가`
  - unknown/invalid combination -> no badge.
- Preserve existing owner query, links, item/status/price rendering, empty state, and non-O1 behavior. Never expose request id, owner id, provider/payment data, reason/free text, or timestamps.
- Badge is text-complete and not color-only; no action or motion.

## Tests first

Run only:

`./node_modules/.bin/vitest run scripts/o1_order_service_request_browser.vitest.ts -t 'M2D ' --config vitest.config.ts --reporter=verbose --cache=false`

1. Patch the test path first and run exact meaningful RED.
2. Patch the page only, then run identical GREEN.
3. Prove all closed badge mappings, unknown omission, optional relation read, no CTA/form/button/action, and preservation of existing order link/item/status/price/empty-state source contracts.

Use only the mission-approved temporary canonical dependency symlink, remove immediately, canonical hashes unchanged, no cache/process residue.

## Attribution and STOP

Authored by Claude: use truthful Claude attribution or no co-author trailer. STOP for third path, client eligibility inference, action/button/form, raw/internal field exposure, query ownership change, dependency/config mutation, broader test, or cleanup mismatch.

## Return

One additive commit/non-force push after GREEN. Return <=15 lines: skill/refs, RED/GREEN, exact 2 paths, zero effects/cleanup, attribution, commit/upstream/clean, STOP. Do not start operator work or Reviewer.
