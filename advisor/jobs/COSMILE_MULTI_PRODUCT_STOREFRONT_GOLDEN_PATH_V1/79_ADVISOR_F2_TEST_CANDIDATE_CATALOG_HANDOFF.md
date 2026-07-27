# Advisor handoff — F2 seven-product TEST candidate catalog

MISSION: `COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1`  
WORKUNIT: `F2_COSMILE_TEST_CANDIDATE_CATALOG_INTEGRATION`  
BASE: Cosmile `4dd56c12c72a4e6921295ab26910fbc8abff2526`, clean/upstream-equal  
FOUNDATION INPUT: implementation `966db20822b7accb36c33dedb01ffba51a9bef68`; F1 implementation `4362c2720cd942255ca7247c06d0eaa960c77549`; Advisor F1 PASS `77/78` at docs `ae7f7f2b21d584172b856c713ae2bacb389a7691`  
ACTOR: existing Cosmile Worker only · actual `claude-opus-5` · effort `xhigh` · `/fable-builder`

## Exact outcome

Consume only a fully verified `fsnap-bundle-1.0` whose effective initial manifest contains exactly these seven intended-sale canonical products, and excludes the incomplete eighth:

1. `elt-cream-vitayouth-01`
2. `elt-cream-vpdrn-01`
3. `elt-mask-vitayouth-01`
4. `elt-pad-vitayouth-01`
5. `elt-serum-vitayouth-01`
6. `elt-serum-vpdrn-01`
7. `elt-sunscreen-vitayouth-01`

`elt-serum-triplecapsule-01` stays fail-closed. `TEST_ONLY_CANDIDATE` is a temporary non-production technical disposition, never a not-for-sale business classification. Foundation identity/content/pins stay unchanged. Cosmile owns only this frozen TEST overlay:

| Foundation product | deterministic SKU | KRW price | stock |
|---|---|---:|---:|
| `elt-cream-vitayouth-01` | `o1tc_elt_cream_vitayouth_01` | 24,000 | 64 |
| `elt-cream-vpdrn-01` | `o1tc_elt_cream_vpdrn_01` | 31,000 | 72 |
| `elt-mask-vitayouth-01` | `o1tc_elt_mask_vitayouth_01` | 18,000 | 80 |
| `elt-pad-vitayouth-01` | `o1tc_elt_pad_vitayouth_01` | 27,000 | 60 |
| `elt-serum-vitayouth-01` | `o1tc_elt_serum_vitayouth_01` | 30,000 | 90 |
| `elt-serum-vpdrn-01` | `o1tc_elt_serum_vpdrn_01` | 37,000 | 56 |
| `elt-sunscreen-vitayouth-01` | `o1tc_elt_sunscreen_vitayouth_01` | 22,000 | 84 |

## Frozen contract

1. Keep the approved commercial lane byte/behavior compatible.
2. Add Cosmile contract parity for `TEST_ONLY_CANDIDATE` and exact gate value `NOT_RECORDED`.
3. Candidate import is a separate entry point. It requires `readO1RuntimeConfig(env).kind === "ready"` and exact bundle-root equality, so `NODE_ENV=production`, runtime flag off, Google off, non-TEST Toss, or another root writes nothing.
4. Candidate documents require exact approval `TEST_ONLY_CANDIDATE`, all six gates exactly `NOT_RECORDED`, `non_production=true`, `NOT_LIVE_SALE_EVIDENCE`, exact seven-product set, and no other/incomplete entry.
5. Store candidate snapshots in the existing `missing_initial` lifecycle value; no schema/migration.
6. The only allowed predecessor transition is the byte/pin-identifiable existing synthetic representative fixture for `elt-serum-vitayouth-01`: candidate becomes its structural successor and the old snapshot becomes `superseded`. Any other existing lineage fails closed. Do not delete or mutate the two preserved pending orders, reservations/HOLD, intents, transactions, or order items.
7. Candidate binding is a separate guarded function. It accepts only an exact verified candidate document bound to a `missing_initial` snapshot and an agreeing CommerceSku. Existing `bindSku` approved-lane behavior remains unchanged.
8. Candidate sellability requires the ready runtime proof plus `missing_initial + TEST_ONLY_CANDIDATE + six NOT_RECORDED gates + active on-sale KRW SKU + positive server price`. Without the ready proof, or with any `PASS`/other gate, it is not sellable.
9. Seed the seven new SKUs inactive/hidden first, bind all seven, then activate the exact set atomically. Do not create CommerceOffer rows. Existing orders/reservations/economic records are untouched.
10. Display identity comes only from verified Foundation `content.identity.display_short_name_ko` (approved legacy `display_name` fallback may remain); no product name, price, stock, rights, or approval invention.
11. Existing `o1EligibleCatalog` remains the single shared source. No page/component/dashboard changes: the seven rows must flow through the already-reviewed home/shop/detail/favorite/cart/order/dashboard path.
12. No provider, browser, runtime, real DB, checkout, payment, refund, identity/session, schema, migration, manifest/lock/dependency, or production/live action in this code WorkUnit.

## Exact changed-path ceiling (9)

1. `app/src/lib/foundation/snapshotContract.ts`
2. `app/src/lib/foundation/snapshotCatalog.ts`
3. `app/src/lib/foundation/snapshotRepository.ts`
4. `app/src/lib/runtime/o1CommerceRuntime.ts`
5. `app/src/lib/runtime/o1TestCandidateCatalog.ts` (new)
6. `app/scripts/o1_test_candidate_catalog_setup.vitest.ts` (new; owner-invoked one-shot, categories/counts only)
7. `app/scripts/o1_test_candidate_catalog.vitest.ts` (new)
8. `app/scripts/o1_catalog_price_authority.vitest.ts`
9. `app/scripts/o1_multi_product_storefront.vitest.ts`

Read-only anchors may include `o1NonprodConfig.ts`, `o1FixtureSetup.ts`, `snapshotBundle.ts`, schema/migration status constraint, and this handoff. No tenth product path and no broad exploration.

## Tests first and exact gate

1. Patch tests before source. Pin exact seven/incomplete exclusion, overlay table/ranges/unique prices, commercial-lane regression, production/flag/Toss/root refusal, candidate approval/gates, exact synthetic-predecessor-only transition, separate candidate bind, no partial activation, canonical Korean identity, and shared catalog path.
2. Run one meaningful RED:

```bash
cd app
./node_modules/.bin/vitest run \
  scripts/o1_test_candidate_catalog.vitest.ts \
  scripts/o1_catalog_price_authority.vitest.ts \
  scripts/o1_multi_product_storefront.vitest.ts \
  --config vitest.config.ts
```

3. Implement only the nine paths. Run the identical command once for GREEN. Preserve the first actionable failure; no weakening assertions or extra suite/build/typecheck/DB.
4. `git diff --check`; exact nine-path containment; schema/package/lock unchanged. Commit once, non-force push, clean/upstream-equal.
5. Write only:
   - `80_WORKER_F2_TEST_CANDIDATE_CATALOG_RESULT.md` (≤80 lines)
   - `81_WORKER_F2_TEST_CANDIDATE_CATALOG_POINTER.md`
   Commit/push those two docs paths and `RETURN_TO: foundation-advisor`; STOP before DB/runtime/browser/provider.

## Stop

HOLD on schema need, bundle/product-set mismatch, non-exact predecessor lineage, inability to prove production refusal, any pending-order/reservation/economic mutation, path drift, or meaningful test failure. No routine alternatives.
