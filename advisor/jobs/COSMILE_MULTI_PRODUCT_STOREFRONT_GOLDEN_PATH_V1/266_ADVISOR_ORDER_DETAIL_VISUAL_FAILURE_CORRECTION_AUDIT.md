# 266 — Advisor audit: order-detail visual failure correction

## Verdict

`PASS_READY_FOR_REPEAT_HUMAN_VISUAL_CHECKPOINT`

## Diagnosis

`ORDER_TIME_NOT_VISIBLE_AND_OLD_LINE_PRESENTATION_VISIBLE` was not a second
detail surface and not a stale product/runtime commit:

- Orders links only to `/dashboard/requests/[orderId]`.
- That route renders the single current `O1OperatorPanel`.
- Active source, server bundle, local client chunk, and public client chunk
  all contained the new order time/card/option UI and no old flat table.
- Local/public chunk bytes were identical.
- The sole contradiction was response policy: local `no-cache`, public
  `max-age=14400`, permitting the browser's same-URL old chunk to remain
  fresh for four hours.

## Correction

- Product: `8d4a3272c6baced193be4f9ed88710c39c90d739`.
- Exact two paths: development-only chunk cache helper in `next.config.ts`
  plus one focused pure test.
- Focused evidence: RED `4 failed / 2 passed` → GREEN `6/6`.
- Independent review: actual Opus 5/max + `/fable-sentinel`, PASS, blocking
  `0`.
- Runtime replaced exactly once and left serving.
- Local and public chunk response now both:
  `Cache-Control: no-store, max-age=0, must-revalidate`.
- Public/local chunk SHA is identical and the chunk contains
  `op-created-at`, `KST (UTC+9)`, `저장된 상품 이미지 없음`, and
  `선택 옵션 정보 없음`; old table markers are absent.

No UI/query/schema/DB/auth/provider/refund/shipment/economic change or action.
Golden Reversal remains HOLD.

## Repeat human checkpoint

In the existing dedicated operator profile, on the paid order's current
`요청 상세` page:

1. Press `Ctrl+Shift+R` once (macOS: `Cmd+Shift+R`) to evict the old response
   admitted under the former four-hour policy.
2. Confirm `주문 시각` with explicit `KST (UTC+9)`.
3. Confirm separated line cards showing honest image absence, product name,
   SKU, Option, quantity, unit price, and line total.
4. Do not click refund, shipment, support, checkout, or any mutation control.

Return `ORDER_DETAIL_LINE_PRESENTATION_VISIBLE` or the exact remaining visible
defect. Do not expose identifiers or PII.
