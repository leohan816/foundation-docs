# Worker result — M1 multi-product Storefront

OUTCOME: `HOLD` — GREEN ran once and returned **1 failed / 10 passed (11)**. The single failure is a positional defect in my own CSS oracle, not in the implementation. Product not committed, not pushed.

MISSION: `COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1` · MODULE `M1_MULTI_PRODUCT_STOREFRONT`
ACTOR: existing Cosmile Worker · actual Claude Opus 5 / xhigh · `/fable-builder` (`implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`).
HANDOFF: docs `29e53c647dc08b45f9b3f5078dd2406165a7b004`, blob `add0e4f6981dc19f51e3563e51b94167fec57cb1`, SHA256 `07f51986a129d78a6afefba8cf04b119ce3d4c1931f702731665c7e1bf575adb` — verified.
PROVEN FIRST: product `pwd` = the exact worktree, branch `implementation/cosmile-multi-product-storefront-golden-path-v1-20260726`, HEAD `1efde21e2942696b585b8c27e2980e97795cb3e1`, clean, no upstream yet; docs worktree/branch/HEAD and the design anchor `c0fd0233` verified. Every command began with `cd --` to the exact worktree.

## RED / GREEN

- One authorized `npm ci --ignore-scripts --prefer-offline --no-audit --no-fund` from `app/`: exit 0, 422 packages, real ignored directory (not a symlink), manifest and lockfile unchanged, tracked delta 0.
- RED, exact command, once: **11 failed (11)** — every frozen contract red, including complete-array mapping, derived count, three separate card targets, admitted-only detail with favorite, wishlist intersection, cart unavailable row, and the 44px/focus/reduced-motion floor.
- GREEN, identical command, once: **1 failed / 10 passed (11)**.

## The one failure

`gives the card favorite a 44px target and keeps focus and reduced-motion rules`. My oracle slices the **first** `.wish-card-btn` block in `globals.css` and asserts `min-width:44px` / `min-height:44px` inside it. That file already contained `.wish-card-btn` rules before this module (6 occurrences total now), so the slice lands on a pre-existing block rather than the cascade-winning rule I appended, which does declare both minimums. The guarantee exists in the stylesheet; the oracle looks in the wrong place.

The contract-grounded correction is to require that the **last** `.wish-card-btn` declaration block — the cascade winner — declares both minimums, which is stricter than a first-match check. I did **not** apply it: your test-meaning guard authorised exactly one syntactic correction to the cart oracle and then a single identical GREEN, so a second pre-GREEN edit and rerun would contradict that instruction. Awaiting authorisation.

## Oracle correction already reported

Per the guard, the cart oracle's single required syntax (`if (!o1)`) was replaced with stronger semantic assertions scoped to the O1 missing-item branch: that branch must return its own row, must contain none of `foundationProductClient` / `toCosmileView` / `getSku(` / `getProduct(`, must carry `soldOut: true` and the generic copy `현재 구매할 수 없는 상품`, and must invent no price, list price, discount, stock or reservation. The global assertions are retained: the O1 branch precedes the legacy lookup and the file keeps exactly one legacy lookup on the flag-OFF path. Test names and messages are unchanged. That same pass also fixed a real defect of mine — a file-wide `toCosmileView` ban that would have wrongly condemned the legitimate legacy branch. No other oracle was relaxed.

## Implementation landed (all eight paths, uncommitted)

New `O1EligibleProductCard` reuses `WishlistButton` (`variant="card"`) and `AddToCartButton` unchanged, as three non-nested targets — the detail link closes before either action — passing only `displayName`, KRW price, `foundationProductId` and the existing `cosmileSkuId` for server pricing. Home and Shop each render one `O1Home` / `O1Catalog` region that maps the complete `o1EligibleCatalog` with no slice, cap or alternate source, shows `전체 {items.length}개` derived from the rendered array, and keeps the provenance strip; the legacy hot-deal, timer, group-buy, curation and AI-execution concepts stay strictly in the flag-OFF branches. Detail keeps `decideProductRoute`/`notFound` fail-closed and gains the durable favorite beside the existing cart action. Wishlist intersects saved ids with the admitted array and never queries legacy products. Cart returns its own unavailable row before any legacy lookup. `globals.css` gained one appended O1 block only.

## Containment and effects

`git diff --check` clean. Exactly the eight ceiling paths (6 modified, 2 new); no ninth path; no config, manifest, lockfile, schema, migration, runtime, API, auth, payment, refund, dashboard or fixture path. `package.json`/`package-lock.json` unchanged. Effects `0` — no DB, provider, network beyond the authorized package fetch, process, port, runtime or economic action; the reused components were not modified. HEAD unchanged at `1efde21`; product not committed or pushed.

## Read-only evidence disclosure

Before your containment message I read `WishlistButton` and `AddToCartButton` signatures, which sit outside the eight-path ceiling. Recorded as read-only evidence with zero scope effect; both files are unmodified and I made no further path reads.

RETURN_TO: foundation-advisor
STOP
