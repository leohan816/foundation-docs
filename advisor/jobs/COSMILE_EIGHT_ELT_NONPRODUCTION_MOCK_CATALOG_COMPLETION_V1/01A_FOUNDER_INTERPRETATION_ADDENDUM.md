# Addendum — Founder interpretation of uniform eight-product admission

STATUS: ADDITIVE; supersedes only conflicting interpretation in `01_WORKER_HANDOFF.md`
DATE: 2026-08-03
PRESERVED_DELTA: the one uncommitted tests-first edit in `app/scripts/o1_test_candidate_catalog.vitest.ts`; no source delta existed at interruption.

1. The eight ELT records remain eight distinct products. Preserve their canonical IDs, known names, types and every existing known product fact.
2. “Uniform” means the same generic catalog/detail/wishlist/cart/checkout-preflight architecture and capabilities. It does not mean equal records, prices, stock or content.
3. Preserve the seven existing overlay tuples unchanged. The eighth receives its deterministic derived SKU, KRW `34000`, stock `75`.
4. Fill a missing product field with a deterministic per-product synthetic value only when an existing customer surface or focused contract demonstrably requires it. Keep every such addition in a replaceable Cosmile-local non-production data/overlay layer; never overwrite or claim it as Foundation canonical data.
5. No synthetic ingredient/spec content is currently presumed necessary. If the existing shared surface does not require it, do not add it. If a named existing surface/test truly requires one, HOLD before adding a new product-data path so Advisor can freeze the exact data key and truth label.
6. Do not add a per-product warning badge, special-case the eighth in UI/runtime commerce code, or branch by product ID/count on a screen. Generic surfaces render the data/config set.
7. Product add/delete/change and later replacement with real data remain data/config-driven. No schema/migration or new commerce path.
8. Preserve `TEST_ONLY_CANDIDATE`, `non_production=true`, `NOT_LIVE_SALE_EVIDENCE`, all gates `NOT_RECORDED`, production denial, and no Foundation vault write.

## Test correction required before RED

- Keep the current tests-first delta but replace any blanket source-token scan that forbids legitimate product vocabulary with structural assertions:
  - the eighth commerce overlay has exactly the same four commerce fields as every row;
  - its price/stock/SKU tuple is exact and distinct;
  - the admitted set is exactly eight unique canonical IDs;
  - candidate snapshot fixtures preserve product-specific identity while claiming no PASS gate and no canonical commercial approval;
  - shared screens contain no candidate IDs, count branch or candidate-specific commerce logic.
- This is a test-contract correction, not a relaxation: it proves separation of canonical facts from the Cosmile overlay without pretending ordinary words are forbidden.

ACK before resuming edits: `ACK_01A_DISTINCT_PRODUCTS_SHARED_ARCHITECTURE`.

