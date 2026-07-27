# 169 — INDEPENDENT DURABLE ORDER LIST REVIEW

## Live binding

- Tier: `NORMAL_BOUNDED_UI`
- Reviewer: existing independent Foundation Reviewer; no Worker context or write authority.
- Current live UI: `claude-opus-5`; effort: `max`; CWD: exact product mission worktree.
- Same-process discriminator: `REVIEWER_OPUS5_MAX_READY`.
- Required skill: `/home/leo/Project/skill/fable-sentinel/SKILL.md`.
- The launch argv retains its historical Fable default, but `/status` and the same live process response prove the current in-place Opus 5 binding. Do not claim Fable review.

## Exact review delta

- Base: `d7d0b78cde931e7f0cb233a26f82a139c5db1cba`
- Candidate: `990efb8d69772e438ae862e8056c2b00314892aa`
- Exact five paths only:
  - `app/scripts/o1_core_dashboard_orders.vitest.ts`
  - `app/scripts/o1_core_dashboard_reads.vitest.ts`
  - `app/src/app/dashboard/orders/page.tsx`
  - `app/src/lib/operator/orderListRead.ts`
  - `app/src/lib/runtime/o1CommerceRuntime.ts`
- Evidence: RED from tests-only delta; corrected GREEN `2 files / 19 passed / 11 skipped / exit 0`; Worker result 167.

## Review questions

Inspect only the exact delta and the minimum load-bearing definitions already imported by it. Do not rerun tests or touch product/runtime/DB/browser/provider.

1. Are only durable order-line, reviewed payment/refund, and shipment facts projected, with no PII/provider identifier?
2. Does malformed, duplicate, unmatched, or unknown data fail the whole page closed?
3. Are all reads after same-principal default-deny grants and action-free?
4. Are amounts/currency/time/status displayed without re-derivation or fabricated zero?
5. Does the enriched surface preserve the previously visible operational order reference and detail reachability, rather than regress them?
6. Are tests adversarial and scoped without weakening the accepted Korean truth-state contract?

Return `PASS`, `PASS_WITH_RISK`, or `BLOCKED`; findings with exact file/line and smallest correction; <=40 lines. Write only `171_INDEPENDENT_DURABLE_ORDER_LIST_REVIEW.md` and `172_INDEPENDENT_DURABLE_ORDER_LIST_REVIEW_POINTER.md`, commit/non-force-push, STOP.
