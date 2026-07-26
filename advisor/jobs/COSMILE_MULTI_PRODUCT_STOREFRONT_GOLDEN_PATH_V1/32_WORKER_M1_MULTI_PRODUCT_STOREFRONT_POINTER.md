# Worker pointer — M1 multi-product Storefront

```text
WORKER_RESULT_POINTER
MISSION: COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1 (M1_MULTI_PRODUCT_STOREFRONT)
ACTOR: existing Cosmile Worker, actual Claude Opus 5 / xhigh, /fable-builder
RESULT_FILE: advisor/jobs/COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1/31_WORKER_M1_MULTI_PRODUCT_STOREFRONT_RESULT.md
HANDOFF: 30_WORKER_M1_MULTI_PRODUCT_STOREFRONT_HANDOFF.md (docs 29e53c64, blob add0e4f6, SHA256 07f51986) — verified
DESIGN_ANCHOR: 11_DESIGNER_STOREFRONT_REUSE_CONTRACT.md at c0fd0233 — verified
OUTCOME: HOLD — GREEN run once: 1 failed / 10 passed (11)
RED: 11 failed (11), exact command, run once — every frozen contract red
NPM_CI: one authorized run, exit 0, 422 packages, real ignored dir (not symlink), manifest and lockfile unchanged
FAILURE: "gives the card favorite a 44px target and keeps focus and reduced-motion rules" — MY oracle slices the FIRST .wish-card-btn block; globals.css already had such rules (6 occurrences now), so it misses the cascade-winning appended rule that does declare min-width:44px and min-height:44px. Implementation guarantee is present; oracle looks in the wrong place.
CORRECTION_NOT_APPLIED: the contract-grounded fix is to require the LAST .wish-card-btn block (cascade winner) to declare both minimums — stricter than first-match. Withheld because the test-meaning guard authorised one cart-oracle correction plus a single identical GREEN.
ORACLE_CORRECTION_REPORTED: cart oracle's required syntax if(!o1) replaced by semantic assertions scoped to the O1 missing-item branch (own return; no foundationProductClient/toCosmileView/getSku(/getProduct(; soldOut true; generic copy 현재 구매할 수 없는 상품; invents no price/listPrice/discount/stock/reservation), global O1 no-legacy and single-lookup assertions retained, names/messages unchanged. Same pass fixed my file-wide toCosmileView ban that would have condemned the legitimate legacy branch. No other relaxation.
DELTA: exactly 8 ceiling paths, all uncommitted (6 modified, 2 new); git diff --check clean; no ninth path; package/lock unchanged
GIT: product branch implementation/cosmile-multi-product-storefront-golden-path-v1-20260726, HEAD 1efde21e2942696b585b8c27e2980e97795cb3e1 unchanged; no product commit or push; no upstream set
EFFECTS: 0 — no DB, provider, process, port, runtime or economic action; npm registry fetch was the only network boundary; reused components unmodified
READ_ONLY_DISCLOSURE: WishlistButton/AddToCartButton signature read occurred before the containment message; outside the eight-path ceiling, zero scope effect, both files unmodified, no further reads
RESUME_NEEDS: authorize the cascade-winner CSS oracle correction and one identical GREEN
RETURN_TO: foundation-advisor
STOP
```
