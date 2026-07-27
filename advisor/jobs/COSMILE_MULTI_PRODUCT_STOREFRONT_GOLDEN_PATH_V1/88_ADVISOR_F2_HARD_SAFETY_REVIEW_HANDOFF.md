# Independent review handoff — F2 candidate catalog safety

MISSION: `COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1`  
PHASE: `F2_HARD_IMPORTANT_SAFETY_DELTA_REVIEW`  
CLASSIFICATION: `HARD_IMPORTANT_SAFETY`  
REVIEWER: existing independent Foundation Reviewer · Fable 5/max · `/fable-sentinel`  
PRODUCT: `4dd56c12c72a4e6921295ab26910fbc8abff2526..91ded4491785ff4d18f081d05fce9ca63cc6f1e9`, clean/upstream-equal  
FOUNDATION: F1 implementation `4362c2720cd942255ca7247c06d0eaa960c77549`; evidence correction `966db20822b7accb36c33dedb01ffba51a9bef68`  
DOCS: current handoffs/results `79–87` at the dispatch commit

## Product meaning

- All seven active canonical ELT products are intended Cosmile sale products.
- `TEST_ONLY_CANDIDATE` is only their current non-production technical disposition; it is not a not-for-sale classification.
- The eighth incomplete product remains temporarily fail-closed.
- No Foundation commercial-rights, safety, MFDS, imagery, or human-review PASS is claimed. Candidate gates remain exactly `NOT_RECORDED`.

## Exact cumulative delta (9 paths)

1. `app/src/lib/foundation/snapshotContract.ts`
2. `app/src/lib/foundation/snapshotCatalog.ts`
3. `app/src/lib/foundation/snapshotRepository.ts`
4. `app/src/lib/runtime/o1CommerceRuntime.ts`
5. `app/src/lib/runtime/o1TestCandidateCatalog.ts`
6. `app/scripts/o1_test_candidate_catalog_setup.vitest.ts`
7. `app/scripts/o1_test_candidate_catalog.vitest.ts`
8. `app/scripts/o1_catalog_price_authority.vitest.ts`
9. `app/scripts/o1_multi_product_storefront.vitest.ts`

Minimum load-bearing predecessor context only: F1 six-path delta, existing `o1NonprodConfig.ts`, `o1FixtureSetup.ts`, `snapshotBundle.ts`, and schema status constraint. No broader repository audit.

## Review questions

1. Does the commercial approved lane remain behaviorally unchanged and candidate-proof independent?
2. Is candidate admission impossible in production/live, with runtime flag/Google/Toss/root mismatch, or through direct durable helper calls?
3. Do exact seven-product, exact overlay, exact SKU binding/set, incomplete exclusion, approval/gate, and one-manifest boundaries fail closed?
4. Is the old synthetic representative the only admitted predecessor, without deleting or mutating preserved orders/reservations/intents/transactions?
5. Can partial import/seed/bind failure expose a partial sellable catalog? Does activation recheck exact seven and roll back on both mismatch classes?
6. Are driver/secret/value details reduced to closed categories/counts?
7. Does the candidate proof reach both storefront catalog admission and checkout price revalidation without enabling a second pricing/economic path?
8. Does display identity come only from verified Foundation content while price/stock remain Cosmile-owned?
9. Do the exact tests expose authority, gate, set, replay, partial-activation, production, and shared-path regressions without weakening assertions?
10. Identify any compile/runtime contradiction apparent from the delta, especially circular import, Prisma SQL, transaction, and one-shot invocation shape. Do not execute it.

## Frozen evidence

- Initial RED: 3 failed files / 2 failed / 32 passed, exit 1; final base GREEN 50/50.
- E1 RED 7/36 then GREEN 43/43; three disclosed source-oracle corrections.
- E2 RED 6/23 then first GREEN 29/29.
- Product commits: `bd265a7`, `7088e4e`, `91ded44`; exact path containment, schema/package/lock unchanged.
- DB/runtime/browser/provider/build/typecheck were not run; candidate SQL is explicitly unexecuted and remains for the post-review isolated gate.

## Boundaries and return

Read-only. Load `/home/leo/Project/skill/fable-sentinel/SKILL.md` plus only its required references. Do not patch, implement, run tests/build/typecheck, access DB/vault/provider/browser/runtime, read secrets/PII, or broaden source.

Write only:
- `89_F2_HARD_SAFETY_REVIEW.md` (≤100 lines)
- `90_F2_HARD_SAFETY_REVIEW_POINTER.md`

Commit/non-force push only those docs paths. Return actual model/effort/skill/CWD/independence, findings by severity with exact hunk evidence, residuals, and one verdict `PASS | PASS_WITH_RISK | NEEDS_PATCH | FAIL`. STOP.
