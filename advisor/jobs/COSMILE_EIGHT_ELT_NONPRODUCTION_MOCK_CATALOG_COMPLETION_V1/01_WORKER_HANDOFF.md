# Worker handoff — exact eight-product TEST catalog delta

MISSION_ID: COSMILE_EIGHT_ELT_NONPRODUCTION_MOCK_CATALOG_COMPLETION_V1
ACTOR: existing Cosmile Worker (`cosmile:claude.0`)
MODEL/EFFORT: actual Claude Opus 5 / xhigh, live-verified before dispatch
SKILL: `/home/leo/Project/skill/fable-builder/SKILL.md`
REPO: `/home/leo/Project/.worktrees/Cosmile/COSMILE_EIGHT_ELT_NONPRODUCTION_MOCK_CATALOG_COMPLETION_V1`
BRANCH: `implementation/cosmile-eight-elt-nonproduction-mock-catalog-completion-v1-20260803`
BASE: `82fb922b64a38d563db91cc87736a229fa5558dc`
RETURN_TO: foundation-advisor

## Exact product path ceiling

1. `app/src/lib/runtime/o1TestCandidateCatalog.ts`
2. `app/src/lib/foundation/snapshotRepository.ts`
3. `app/src/lib/runtime/o1CommerceRuntime.ts`
4. `app/scripts/o1_test_candidate_catalog.vitest.ts`
5. `app/scripts/o1_test_candidate_catalog_setup.vitest.ts`
6. `app/scripts/o1_multi_product_storefront.vitest.ts`

Source paths 2-3 may change only count/contract wording if runtime behavior is already generic; do not manufacture a need to edit them. No seventh product path.

## Exact contract

- Preserve all seven existing tuples unchanged.
- Admit exactly `elt-serum-triplecapsule-01`; derived SKU `o1tc_elt_serum_triplecapsule_01`; price KRW `34000`; stock `75`.
- Exactly eight unique IDs/SKUs/prices, exact eight manifest/binding/activation set, no subset/extra/duplicate/ninth product.
- Keep `TEST_ONLY_CANDIDATE`, `non_production=true`, `NOT_LIVE_SALE_EVIDENCE`, every gate `NOT_RECORDED`, production rejection, TEST Toss requirement and exact bundle-root proof.
- The eighth carries only its known identity/name. Tests must reject invented ingredients, volume, manufacturer/responsible seller, expiry, cautions, rights/safety/approval facts and pin visible mock status as `TEST DATA / TO BE CONFIRMED` where surfaced.
- Reuse the generic catalog/detail/wishlist/cart/checkout-preflight path; no product-specific UI or commerce branch.

## Tests first

1. Edit only the three named test files first; preserve a meaningful RED showing the base still accepts seven/excludes the eighth or lacks the eighth overlay/status contract.
2. Run exactly from `app/`:
   `npx vitest run --config vitest.config.ts scripts/o1_test_candidate_catalog.vitest.ts scripts/o1_test_candidate_catalog_setup.vitest.ts scripts/o1_multi_product_storefront.vitest.ts`
3. Implement only the source paths required by that RED.
4. Run the identical command once for GREEN, then `git diff --check` on the six-path delta.
- If this worktree needs dependencies, one temporary ignored `app/node_modules` symlink to the unchanged base-candidate `app/node_modules` is allowed after proving the link target is a real directory and the mission path is empty. Remove it after checks; no install/generate/copy/target write.

## Stop conditions

HOLD before change if schema/migration, Foundation vault write, provider/DB/economic action, payment semantics, broad rewrite, extra path, ninth product, fabricated fact, or weakening of production/gate denial is required.

## Completion

- Commit and non-force push exact product delta only.
- Write compact result and pointer only at:
  - `advisor/jobs/COSMILE_EIGHT_ELT_NONPRODUCTION_MOCK_CATALOG_COMPLETION_V1/02_WORKER_RESULT.md`
  - `advisor/jobs/COSMILE_EIGHT_ELT_NONPRODUCTION_MOCK_CATALOG_COMPLETION_V1/03_WORKER_RESULT_POINTER.md`
  in docs worktree `/home/leo/Project/.worktrees/foundation-docs/COSMILE_EIGHT_ELT_NONPRODUCTION_MOCK_CATALOG_COMPLETION_V1`.
- Commit/non-force-push those two docs paths, return pointer to Advisor, STOP. No runtime/browser/DB/provider work in this Worker turn.

