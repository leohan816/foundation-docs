# Worker handoff — M1 multi-product Storefront

MISSION_ID: `COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1`
MODULE: `M1_MULTI_PRODUCT_STOREFRONT`
ACTOR: existing Cosmile Worker; actual Claude Opus 5 / xhigh.

## Anchors

- Product worktree:
  `/home/leo/Project/.worktrees/Cosmile/COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1`
- Branch:
  `implementation/cosmile-multi-product-storefront-golden-path-v1-20260726`
- Clean base: `1efde21e2942696b585b8c27e2980e97795cb3e1`
- Docs worktree:
  `/home/leo/Project/.worktrees/foundation-docs/COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1`
- Normative design: `11_DESIGNER_STOREFRONT_REUSE_CONTRACT.md` at
  `c0fd02331e0633113c893bebcc41ac159f4398e8`
- Independent design review: `21_INDEPENDENT_DESIGN_REVIEW.md`, `PASS`,
  blocking 0, docs HEAD `3018ba310829e0c575bc3e03aeb7cb9aa4c6ff75`.

Read current Agent Office Worker role, product rules, `/fable-builder`, and only
`implementation-execution`, `contract-to-code-mapping`,
`test-design-before-code`; load `implementation-report-template` only for the
compact result. Current Agent Office authority overrides historical role text.
The Claude process root is predecessor evidence: every tool command must begin
with `cd --` to the exact product or docs worktree above. First command proves
product `pwd`, branch, HEAD, clean state, and docs anchors. No broad reread.

## Contract-to-code mapping

| Frozen contract | Code landing | Focused proof |
|---|---|---|
| One complete admitted array, dynamic `0..8`, no representative slice | O1 branches of Home and Shop | all-item map; no slice/alternate source; count equals rendered array |
| Separate detail/favorite/cart targets on every admitted card | new `O1EligibleProductCard` reusing current `WishlistButton` and `AddToCartButton` | non-nested targets; SKU/product/price passed from `O1CatalogItem` |
| Admitted-only detail with favorite and cart | O1 detail branch | `notFound` boundary retained; no legacy/mock fallthrough |
| Durable O1 wishlist over the same admitted truth | O1 branch of Wishlist page | wished IDs intersect eligible array; no legacy product lookup |
| Persisted cart line that is no longer admitted | O1 branch of Cart page | keep removable row, generic unavailable copy, `soldOut=true`; no Foundation/mock lookup; quantity/checkout remain disabled and detail route stays fail-closed |
| Original cream/orange hierarchy and ≥44px actions | `globals.css` only | card/home/shop/detail responsive classes; `wish-card-btn` at least 44×44; focus/reduced-motion retained |

No mapping row is allowed to remain blank. If an existing signature cannot
support the row without another path, schema, or semantic change, STOP.

## Exact product path ceiling

1. `app/src/app/page.tsx`
2. `app/src/app/shop/page.tsx`
3. `app/src/app/products/[id]/page.tsx`
4. `app/src/app/wishlist/page.tsx`
5. `app/src/app/cart/page.tsx`
6. `app/src/components/product/O1EligibleProductCard.tsx` (new)
7. `app/src/app/globals.css`
8. `app/scripts/o1_multi_product_storefront.vitest.ts` (new)

No other product, config, manifest, lockfile, schema, migration, runtime, API,
auth, payment, refund, dashboard, fixture, or test path.

## Tests first

1. If `app/node_modules` is absent, run exactly one worktree-local
   `npm ci --ignore-scripts --prefer-offline --no-audit --no-fund` from `app/`.
   It must be a real ignored directory. No install script, generate, manifest,
   lockfile, shared dependency, symlink, or canonical-tree mutation.
2. Add the focused test first. It must prove:
   - Home and Shop map the complete `o1EligibleCatalog`, show a derived count,
     and contain no O1-branch slice, mock source, hardcoded business row, fake
     price/promotion, group-buy, or AI-execution claim.
   - Every O1 card has distinct detail, durable favorite, and server-priced
     cart actions; no nested interactive element.
   - O1 Detail has favorite/cart and keeps admitted-only `notFound`.
   - O1 Wishlist intersects wished IDs with the eligible catalog and does not
     query legacy Foundation products.
   - O1 Cart never resolves a missing admitted item through legacy/mock truth;
     it renders an unavailable sold-out row that blocks checkout.
   - card favorite target is ≥44px; keyboard focus and reduced-motion rules
     remain.
3. Run exactly:
   `cd app && ./node_modules/.bin/vitest run scripts/o1_multi_product_storefront.vitest.ts --config vitest.config.ts`
   Preserve the meaningful RED and its exact failed contracts.
4. Implement only the seven source paths above.
5. Run the identical command once and require GREEN. No other test, full suite,
   build, typecheck, DB, browser, provider, or runtime command.

## Behavior ceiling

- Reuse `o1EligibleCatalog`, `WishlistButton`, `AddToCartButton`,
  `getWishedProductIds`/`isWished`, and current cart ownership unchanged.
- Never invent an eighth item; each unusable item disappears independently.
- No product asset claims; neutral bottle treatment only.
- No mock user, discount/list price/timer, group-buy, fake recommendation,
  AI-execution claim, alternate catalog, email/Apple identity, local payment
  success, partial refund, or new economic behavior.
- No DB/provider/network/economic effect. `npm ci` package fetch is the only
  allowed non-provider network boundary if the local cache is insufficient.

## Completion

Inspect exact eight-path diff and `git diff --check`. Require package/lock
unchanged, no DB/runtime/process/port/provider effect, no tracked/untracked
residue outside the eight paths, and ignored `node_modules` only.
One truthful product commit and non-force push; clean/upstream-equal.

Write only:

- `31_WORKER_M1_MULTI_PRODUCT_STOREFRONT_RESULT.md` (maximum 80 lines)
- `32_WORKER_M1_MULTI_PRODUCT_STOREFRONT_POINTER.md`

Commit/non-force push those two docs files only, return compact RED/GREEN,
changed paths, actual commit, effects 0, limits, `RETURN_TO:
foundation-advisor`, and STOP before runtime/Google/Toss/M2.
