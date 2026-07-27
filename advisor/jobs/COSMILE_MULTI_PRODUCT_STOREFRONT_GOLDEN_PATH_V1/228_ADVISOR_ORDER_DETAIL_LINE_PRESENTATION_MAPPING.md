# 228 — ADVISOR READ-ONLY MAPPING: ORDER/REQUEST DETAIL LINES

Status: **PROCEED_WITH_LIMITS**  
Product: `52343f5c6633558ac6ec489b201e5d7746762ab5`, clean/upstream-equal.

## Exact route and data chain

`/dashboard/requests/[orderId]`
→ `dashboard/requests/[orderId]/page.tsx`
→ existing authorized `O1OperatorPanel`
→ GET `/api/o1/operator/orders/[orderId]`
→ `o1OperatorOrderView`
→ `operatorOrderView`
→ existing `operatorOrderData` query over `OrderItem`.

No new route, authority or query is needed.

| Presented fact | Durable source | Current state | Frozen landing |
|---|---|---|---|
| Product name | `OrderItem.productNameSnapshot` | already projected | preserve |
| SKU | `OrderItem.skuId` | already projected | preserve |
| Selected option | `OrderItem.optionNameSnapshot` | durable nullable snapshot; omitted by operator projection | widen the existing line query/shape only; present exact value or `선택 옵션 정보 없음` |
| Quantity/unit/line total | `quantity`/`unitPrice`/`totalPrice` | already projected and arithmetic-validated | preserve |
| Product image | none in `OrderItem`, `CommerceSku`, `FoundationProductSnapshot` or `app/public`; current candidate snapshots explicitly carry no imagery approval/data | unavailable | render only `저장된 상품 이미지 없음`; no mock, generated, legacy or synchronous Foundation image |

Checkout already snapshots resolved option text where available. The seven-product candidate checkout currently writes null because it has no variant/option selection; null must not be converted into an invented option.

## Exact six-path ceiling

Source:

1. `app/src/lib/order/contracts.ts`
2. `app/src/lib/order/repository.ts`
3. `app/src/lib/order/service.ts`
4. `app/src/components/commerce/O1OperatorPanel.tsx`

Focused tests:

5. `app/scripts/o1_order_lifecycle.vitest.ts`
6. `app/scripts/o1_operator_request_detail_ui.vitest.ts`

No route, schema, migration, checkout, catalog, Foundation, runtime, provider, payment/refund or action-surface path may change.

## Frozen contract

- Add nullable `option` to the bounded operator line shape, sourced byte-for-byte from `optionNameSnapshot`.
- Null remains null through repository/service; the UI alone renders the honest unavailable label.
- Blank non-null option is malformed and the existing operator projection fails closed.
- Replace the dense line table with a semantic list of clearly separated cards. Each card shows the image fallback, product name, SKU, then **Option**, then quantity, unit price and line total.
- Preserve exact integer KRW formatting, arithmetic validation, line order, authorization, action controls and all existing order/request state.
- No image URL field is added because no truthful durable source exists.

Focused command, RED once then identical GREEN once:

`cd app && ./node_modules/.bin/vitest run -c vitest.config.ts scripts/o1_order_lifecycle.vitest.ts scripts/o1_operator_request_detail_ui.vitest.ts`

STOP if another path/query/source is needed or option provenance cannot remain exact.
