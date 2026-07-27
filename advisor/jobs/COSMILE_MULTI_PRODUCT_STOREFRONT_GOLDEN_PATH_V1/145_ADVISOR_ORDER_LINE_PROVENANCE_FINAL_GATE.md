# ADVISOR GATE — ORDER LINE + PROVENANCE CORRECTION PASS

## Verdict

`PASS_TO_HUMAN_ORDER_DETAIL_CHECKPOINT`

- Product `48939e86cc9c3e9da8cf55659ec247cc91e8e071`, clean/upstream-equal.
- Exact delta: eight paths; schema/package/lock unchanged.
- Focused proof: meaningful RED; corrected contract gate `18 PASS`; review F1 closure gate `23 PASS`.
- Independent review: actual Fable 5/max + `/fable-sentinel`, `PASS_WITH_RISK`, blocking code findings `0`; sole evidence-coverage risk closed by the 23-PASS run. The initial handoff's Opus 5 claim was wrong and is superseded by actual Fable binding evidence.
- No DB, provider, refund, browser checkout, or economic action occurred in the correction.

## Runtime containment

- Public runtime listener remains the owned mission worktree on port 3000.
- `NODE_ENV=development`, `O1_TOSS_MODE=test`, one-shot `0`, local substitute absent/OFF.
- Public root HTTP `200`.
- The historical captured line remains without a Foundation snapshot ref; no backfill occurred. Future order lines connect the already-verified snapshot SHA only.

## Exact human-visible checkpoint

1. Use Leo's dedicated **operator** browser profile; do not use the customer purchase profile.
2. Open `https://cosmile.leohan.net/dashboard/orders`.
3. Open the single `paid/결제 완료` order row; do not expose or copy its internal identifier.
4. The detail must show a `주문 라인` table with `상품 / SKU / 수량 / 단가 / 합계`.
5. For the captured TEST order, verify one stored line: title and SKU visible, quantity `2`, unit `₩18,000`, total `₩36,000`.
6. Buyer/contact/address must remain absent. Existing categorical capture/inventory/reconciliation facts remain visible.
7. Stop and report `ORDER_DETAIL_PROJECTION_VISIBLE` or the exact visible mismatch. **Do not click refund yet.**

## Claim ceiling

- Seven active ELT SKUs: shared catalog/detail/favorite/cart/checkout code-path evidence only.
- One SKU: actual Golden Order capture and durable order-line evidence.
- Golden Reversal: not yet performed; requires the next explicit Strategy/Leo evidence checkpoint.
