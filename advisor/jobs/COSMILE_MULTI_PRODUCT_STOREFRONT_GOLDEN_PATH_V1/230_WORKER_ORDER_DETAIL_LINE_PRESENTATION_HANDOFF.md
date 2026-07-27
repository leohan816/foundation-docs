# 230 — WORKER HANDOFF: ORDER/REQUEST DETAIL LINE PRESENTATION

Status: **PROCEED_WITH_LIMITS**

Actor: existing Cosmile Worker `cosmile:claude.0`; actual Opus 5 / xhigh; `/fable-builder`; exact mission CWD.  
Anchor: Advisor mapping/freeze `228/229`; product base `52343f5c6633558ac6ec489b201e5d7746762ab5`.

## Contract-to-code map

| Contract | Source landing | Test oracle |
|---|---|---|
| Exact durable option | `contracts.ts` public/raw line shapes; `repository.ts` same existing `OrderItem` query; `service.ts` validation/projection | lifecycle test: non-null exact propagation, null preservation, blank fails closed |
| Honest image state | no data/query addition; panel fallback only | UI test requires `저장된 상품 이미지 없음` and forbids image URL/mock/legacy/Foundation read |
| Card/list hierarchy | `O1OperatorPanel.tsx` existing `op-order-lines` region | UI test pins semantic list/cards, field order SKU → 옵션 → 수량, spacing tokens and existing action region after lines |
| Preserved amounts/privacy | existing line fields and validation | lifecycle/UI tests retain arithmetic, KRW, auth, PII/provider/internal-id prohibitions |

## Tests first

Edit only the two frozen tests first:

- lifecycle: seed one exact non-null option and require its unchanged projection; require null to remain null; add blank non-null option to malformed fail-closed cases; update the exact allowed line-key set to include only `option`.
- UI: require each line to render as a spaced list/card with the honest image fallback, product/SKU/option/quantity/unit/total, and require Option placement between SKU and quantity. Preserve all action/privacy assertions.

Run the exact focused command once for meaningful RED:

`cd app && ./node_modules/.bin/vitest run -c vitest.config.ts scripts/o1_order_lifecycle.vitest.ts scripts/o1_operator_request_detail_ui.vitest.ts`

Then change only the four frozen source paths:

- widen the existing `OrderItem` line SELECT with `optionNameSnapshot`; no new query/join;
- validate null or nonblank string and project as nullable `option` without defaulting;
- render the line region as semantic, clearly separated cards with `저장된 상품 이미지 없음`; title, SKU, Option, quantity, unit and total; use `선택 옵션 정보 없음` only for null.

Run the identical command once for GREEN. Inspect exact six-path containment and `git diff --check`; commit/non-force-push product once. Write docs result `232_WORKER_ORDER_DETAIL_LINE_PRESENTATION_RESULT.md` and pointer `233_WORKER_ORDER_DETAIL_LINE_PRESENTATION_POINTER.md` without committing docs; return to Advisor and STOP.

Forbidden: seventh path; route/schema/migration/new read or image source; Foundation access; checkout/catalog/action changes; DB/runtime/browser/provider/refund/economic action; broad test/build/typecheck; mock or invented option/image.
