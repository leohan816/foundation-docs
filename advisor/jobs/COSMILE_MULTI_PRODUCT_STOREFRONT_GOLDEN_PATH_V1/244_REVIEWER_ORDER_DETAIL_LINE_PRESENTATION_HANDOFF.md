# 244 — Independent order-detail line presentation review

- Mission: `COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1`
- Classification: `NORMAL_BOUNDED_UI`
- Reviewer binding: existing independent Reviewer, actual
  `claude-opus-5`, effort `max`, `/fable-sentinel`
- Product base: `52343f5c6633558ac6ec489b201e5d7746762ab5`
- Candidate: `b652a8b2ea6a8221a764d42190c318ac2a005d0e`
- Evidence: docs `230`, `232`, `234`, `236`, `238`, `240`, `242`

Review only the exact six-path delta:

1. `app/src/lib/order/contracts.ts`
2. `app/src/lib/order/repository.ts`
3. `app/src/lib/order/service.ts`
4. `app/src/components/commerce/O1OperatorPanel.tsx`
5. `app/scripts/o1_order_lifecycle.vitest.ts`
6. `app/scripts/o1_operator_request_detail_ui.vitest.ts`

Verify:

- `Order.createdAt` and `OrderItem.optionNameSnapshot` come from the already
  used rows/SELECTs; no new query/join/schema/source of truth.
- missing/invalid time becomes `확인 없음`, valid time is shown in explicit
  `KST (UTC+9)`, never inferred from now.
- durable option is byte-preserved; null alone renders
  `선택 옵션 정보 없음`; malformed non-null data fails closed.
- line cards preserve title/SKU/quantity/unit/total and place Option between
  SKU and quantity.
- no truthful durable image exists, so the UI states
  `저장된 상품 이미지 없음` and introduces no image source.
- no customer/contact/address/provider/payment identifiers, new authority,
  mutation, economic semantics, or status localization.
- test-harness corrections preserve canonical authorization denial and
  downstream-zero behavior rather than weakening it.

Use `/fable-sentinel`. Do not rerun tests, build, typecheck, DB, runtime,
browser, provider, or economic action. Do not inspect unrelated files or old
mission history. Write only uncommitted:

- `246_INDEPENDENT_ORDER_DETAIL_LINE_PRESENTATION_REVIEW.md`
- `247_INDEPENDENT_ORDER_DETAIL_LINE_PRESENTATION_REVIEW_POINTER.md`

Result must be at most 40 lines, state actual model/effort/skill, verdict,
blocking findings, and residual limits. Do not commit or push. STOP.
