# INDEPENDENT REVIEW — ORDER LINE + SNAPSHOT PROVENANCE

## Live binding and tier

- Tier: `NORMAL_COMPLEX_BOUNDED`
- Existing independent Reviewer only; actual `claude-opus-5`, effort `max`
- Exact CWD: `/home/leo/Project/.worktrees/Cosmile/COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1`
- Load `/home/leo/Project/skill/fable-sentinel/SKILL.md` and only its required references.
- Independent from the Opus 5/xhigh Cosmile Worker; do not contact the Worker.

## Exact candidate

- Product base: `76497d6bbcd01b42e4a3c3871329bf150a95d1d6`
- Candidate: `48939e86cc9c3e9da8cf55659ec247cc91e8e071`
- Exact delta: one commit, eight paths listed in handoff `125`.
- Evidence: `123`, `125`, `127`, `129`, `131`, `133`, `135` in the existing mission job directory.
- Focused proof: preserved RED; final corrected gate `18 passed / 85 skipped`, exit `0`.

## Review question

Inspect only the exact delta plus the minimum load-bearing predecessor context needed to answer:

1. Does the operator projection expose only authorized durable line title/nullable SKU/quantity/unit/total, remain authorization-first, and fail closed on malformed/arithmetic-inconsistent rows without PII/provider/internal-id leakage?
2. Does the UI table truthfully render those values without inventing buyer/address/commercial facts or altering existing sensitive action surfaces?
3. Is `snapshotContentSha256` carried only from the already-verified catalog item to the single future `OrderItem` create relation, with no fallback/backfill/schema change and no effect on `deriveO1OrderNo`, exact replay, reservation, intent, provider, or economic semantics?
4. Do tests materially prove the contract without weakening meaningful failures?

Pay special attention to silent fallback, optional/missing line arrays, snapshot relation mismatch, stale historical-row behavior, privacy leakage, and replay/economic drift.

## Constraints and output

- Read-only review. No product/docs mutation except writing the two review artifacts.
- No tests, build, typecheck, DB, runtime, browser, provider, refund, economic action, broad audit, or full predecessor reread.
- Preserve the known unrelated M3F request-scope harness limitation; do not repair or normalize it.
- Write at most 60 lines to:
  - `139_INDEPENDENT_ORDER_LINE_PROVENANCE_REVIEW.md`
  - `140_INDEPENDENT_ORDER_LINE_PROVENANCE_REVIEW_POINTER.md`
- Verdict: `PASS`, `PASS_WITH_RISK`, or `FAIL`, with severity/actionable findings and actual model/effort/skill/CWD/independence evidence.
- STOP and return to Advisor; do not commit or push.
