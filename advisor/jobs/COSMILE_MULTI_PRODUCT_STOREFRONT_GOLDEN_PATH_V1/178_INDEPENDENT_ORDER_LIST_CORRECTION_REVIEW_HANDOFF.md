# 178 — INDEPENDENT ORDER LIST CORRECTION RECHECK

- Tier/binding: `NORMAL_BOUNDED_UI`; existing independent Reviewer; actual Opus 5 / max; `/fable-sentinel`; exact mission CWD.
- Base/candidate: `990efb8d69772e438ae862e8056c2b00314892aa..b39e914bd65899b1dd05de277124fc9eb0ffc80a`
- Exact four paths:
  - `app/scripts/o1_core_dashboard_orders.vitest.ts`
  - `app/scripts/o1_core_dashboard_reads.vitest.ts`
  - `app/src/app/dashboard/orders/page.tsx`
  - `app/src/lib/operator/orderListRead.ts`
- Evidence only: RED 2 contract failures; GREEN 20 passed / 11 skipped / exit 0; no rerun.

Verify only:

1. visible order number is restored without exposing the internal id;
2. absent economic match degrades only those row fields to truthful unavailable while malformed/duplicate/inconsistent input still fails closed;
3. the explicit UTC marker removes time ambiguity;
4. no new read/query/capability/action/schema/provider/economic effect and no consumer break from nullable fields.

No broad reread or product/test/runtime/DB/browser/provider mutation. Return categorical verdict/findings <=30 lines, write only `180_INDEPENDENT_ORDER_LIST_CORRECTION_REVIEW.md` and `181_INDEPENDENT_ORDER_LIST_CORRECTION_REVIEW_POINTER.md`, commit/non-force-push, STOP.
