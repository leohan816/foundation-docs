# 252 — Advisor audit: order-detail line presentation

## Verdict

`PASS_READY_FOR_HUMAN_VISUAL_CHECKPOINT`

- Product: `b652a8b2ea6a8221a764d42190c318ac2a005d0e`, pushed,
  clean/upstream-equal.
- Delta: exactly six paths; four source + two focused tests.
- Focused gate: `2 files / 99 passed / exit 0`.
- Independent review: `NORMAL_BOUNDED_UI`, actual `claude-opus-5`/max,
  `/fable-sentinel`, PASS, blocking `0`.
- Runtime: exact owned candidate replaced once and left serving
  `https://cosmile.leohan.net`; one-shot OFF, local substitute absent.

## Admitted facts

- Existing Order/OrderItem SELECTs alone now carry durable `createdAt` and
  `optionNameSnapshot`; no new query/join/schema.
- Valid durable order time renders as explicit `KST (UTC+9)`;
  missing/invalid renders `확인 없음`, never current/inferred time.
- Option is byte-preserved; null renders `선택 옵션 정보 없음`; malformed
  non-null option fails closed.
- Each line is a separated card with product name, SKU, Option, quantity,
  unit price, and line total.
- No durable truthful image exists, so the card states
  `저장된 상품 이미지 없음`; no mock/external/generated image was added.
- No PII, buyer/address, authority, command, provider, refund, inventory,
  order, or economic semantic change.

## Residual ceiling

- Public reachability is proven; authenticated rendered content is not yet
  human-verified.
- No build/typecheck/DB-focused test was run in this slice.
- Golden Reversal and all refund/provider action remain HOLD.

## Human checkpoint

In the existing dedicated operator browser profile:

1. Hard-refresh `https://cosmile.leohan.net/dashboard/orders`.
2. Open the current paid order's existing detail link.
3. Confirm `주문 시각` displays a value ending `KST (UTC+9)` (or
   `확인 없음` only if the durable value is genuinely absent/invalid).
4. Confirm every line is a spaced card showing:
   `저장된 상품 이미지 없음`, product name, SKU, Option, quantity, unit
   price, and total; Option must show the durable value or exactly
   `선택 옵션 정보 없음`.
5. Do not click checkout, refund, shipment, support, or any mutation control.

Return only `ORDER_DETAIL_LINE_PRESENTATION_VISIBLE` or the exact visible
defect category. No identifiers or screenshots containing real PII.
