# Advisor handoff — F2 E2 exact-set and categorical failure correction

MISSION: `COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1`  
WORKUNIT: `F2_E2_EXACT_SET_AND_CATEGORY_CONTAINMENT`  
BASE: Cosmile `7088e4e21a791c5d6c741a78ab9c891b59d85d70`, clean/upstream-equal  
PREDECESSOR: handoff `82` / Worker PASS `83/84` / docs `6237f3fc37b9b17ad3bb2788f53d17dd7333bafd`  
ACTOR: same Cosmile Worker · actual Opus 5/xhigh · `/fable-builder`

## Exact findings

1. Ready-runtime guarding is now correct, but direct `seedCandidateSkusInactive` accepts any caller-supplied overlay.
2. Direct `bindTestCandidateSku` accepts an arbitrary SKU id for one of the seven products when DB product agreement happens to match.
3. Direct `activateCandidateSkus` accepts a caller-supplied subset; its transaction proves only that subset, not the frozen seven.
4. Activation catch returns arbitrary `Error.message`. A driver error could escape the categories/counts-only evidence boundary.

## Exact correction

- Add pure exact-overlay/exact-SKU-set decisions against the single frozen `TEST_CANDIDATE_OVERLAY`.
- Seed rejects any missing/extra/duplicate/reordered-with-changed-values overlay before Prisma. Exact order is not authority; exact seven tuples and values are.
- Bind requires `foundationProductId → exact frozen cosmileSkuId`.
- Activate requires exactly the seven frozen SKU ids before Prisma; subset/extra/duplicate refuse.
- Preserve the in-transaction seven-binding/snapshot/product precheck and rollback throws.
- Map only the two owned throw tokens (`candidate_precheck_failed`, `partial_activation_refused`) through; every unexpected error becomes `activation_failed`.
- No overlay value, approved-lane, checkout, page, schema, package, lock, DB, runtime, browser, provider, or economic change.

## Exact changed-path ceiling (3)

1. `app/src/lib/foundation/snapshotRepository.ts`
2. `app/src/lib/runtime/o1TestCandidateCatalog.ts`
3. `app/scripts/o1_test_candidate_catalog.vitest.ts`

Tests first: direct arbitrary overlay, arbitrary SKU binding, subset/extra/duplicate activation, and error-message minimization must RED. Then implement and run the identical focused command once for GREEN:

```bash
cd app
./node_modules/.bin/vitest run scripts/o1_test_candidate_catalog.vitest.ts --config vitest.config.ts
```

No other test or command except containment (`git diff --check`, exact three paths, schema/package/lock unchanged). Commit/non-force push, clean/upstream-equal. Write only `86_WORKER_F2_E2_RESULT.md` and `87_WORKER_F2_E2_POINTER.md`, commit/push, return to Advisor, STOP.
