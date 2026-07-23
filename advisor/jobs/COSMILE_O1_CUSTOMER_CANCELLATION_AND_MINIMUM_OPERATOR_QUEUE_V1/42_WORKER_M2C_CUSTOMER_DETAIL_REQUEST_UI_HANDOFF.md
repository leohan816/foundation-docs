# ADVISOR -> COSMILE WORKER — M2C CUSTOMER DETAIL REQUEST UI

MISSION_ID: `COSMILE_O1_CUSTOMER_CANCELLATION_AND_MINIMUM_OPERATOR_QUEUE_V1`
MODULE: `M2C_CUSTOMER_DETAIL_REQUEST_UI`
BASE: `31825fddf55eb187f8c816cb3ab9e2b8a01c5a45`
WORKER: existing primary Cosmile Worker, Claude Opus 4.8 / xhigh
SKILL: `/fable-builder`
REFERENCES: `implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`; `implementation-report-template` only at return
DELTA_ONLY_VERIFICATION: REQUIRED

## Objective

Add the smallest customer order-detail request experience over the reviewed M2B GET and M2A POST. The UI renders only server-returned closed categories, never derives eligibility or economic truth, uses one inline action/confirmation, and preserves the existing order-detail layout.

## Exact path ceiling

1. `app/src/components/commerce/O1OrderServiceRequest.tsx` (new)
2. `app/src/components/commerce/O1OrderStatus.tsx`
3. `app/scripts/o1_order_service_request_browser.vitest.ts` (new)

No fourth path. No route/service/repository/schema/migration/account-list/operator/payment/refund/inventory/provider/runtime/config/manifest/dependency change; no build, typecheck, full suite, browser launch, screenshot, network, DB, credential, or economic effect.

## Frozen behavior

- `O1OrderStatus` renders the new component once, inside the existing O1 detail card, passing only the internal route orderId already held by the component. It does not change existing truth rows or status calculations.
- The component loads only `GET /api/o1/orders/{encoded orderId}/service-request` and submits only `POST` to the same path with no body/economic input.
- Derive presentation from the closed response only:
  - eligible `pre_capture_cancel` -> `주문 취소`;
  - eligible `paid_unshipped_cancel` -> `취소 요청`;
  - eligible `shipped_support` -> `반품·도움 요청`;
  - existing closed kind/status -> durable status copy, no duplicate action;
  - terminal/unavailable -> no action and bounded truthful copy;
  - recovery_hold -> no action, exact recovery copy, one `상태 다시 확인` GET action;
  - malformed/unknown/HTTP failure -> fail-closed generic unavailable copy, never an action.
- Inline confirmation only: first action reveals exact consequence plus confirm and `계속 유지`; no modal/popup. Confirm POST is single-flight, disabled, `aria-busy=true`, and reads no user input.
- Required durable copy:
  - paid requested: `취소 요청을 접수했어요. 아직 환불되지 않았고 재고는 유지됩니다.`
  - shipped requested/accepted: `반품·도움 요청을 확인했어요. 자동 취소·환불·재고 변경·택배 접수는 진행되지 않았습니다.`
  - refused: `주문 상태가 바뀌어 이 요청을 처리할 수 없어요. 현재 상태를 다시 확인해 주세요.`
  - pre-capture completed: `주문이 취소됐어요. 결제·환불은 발생하지 않았고 이 주문의 재고 예약이 해제됐습니다.`
  - paid completed: `TEST 전액 환불이 완료됐어요. 재고는 판매 가능 상태로 자동 복구되지 않습니다.`
  - unavailable: `현재 주문 상태에서는 취소할 수 없어요.`
  - recovery: `처리 결과를 확인 중이에요. 완료로 확인될 때까지 주문·재고 상태를 바꾸지 않습니다.`
- Section has an accessible heading; status is `aria-live=polite`; pending container is `aria-busy`; controls are at least 44px, keyboard/focus-visible usable; no motion, hover-only meaning, color-only state, destructive red customer CTA, or navigation redesign.
- Export a pure, closed presentation derivation for focused testing. Unknown inputs must produce no action.

## Tests first

Run only:

`./node_modules/.bin/vitest run scripts/o1_order_service_request_browser.vitest.ts -t 'M2C ' --config vitest.config.ts --reporter=verbose --cache=false`

1. Add the test path first; run exact command for meaningful RED with preserved exit.
2. Implement the two component paths; run identical command for GREEN.
3. Prove every eligible/existing/terminal/recovery/unavailable/unknown presentation; exact Korean copy; one action maximum; no action for unknown; GET/POST path and bodyless contract; inline confirmation/single-flight/accessibility/source containment; existing O1 detail rows remain present and unchanged.

Use only the mission-approved temporary canonical dependency symlink procedure; remove it immediately and verify canonical hashes unchanged and no cache/process residue.

## Attribution and STOP

This module is authored by Claude. Use truthful runtime attribution or no co-author trailer. Never add a Codex or inaccurate co-author trailer.

STOP for a fourth path, client-side eligibility inference from order/payment/shipment facts, new economic input/action, route/backend change, modal/redesign, dependency/config mutation, broader test, or cleanup mismatch.

## Return

One additive commit and non-force push after GREEN. Return <=18 lines: skill/refs, RED/GREEN counts, exact 3 paths, zero effects/cleanup, truthful attribution, commit/upstream/clean, STOP. Do not start M2D/operator/Reviewer.
