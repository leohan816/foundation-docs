# 44 — Advisor M2 Scope Correction

MISSION: `COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1`
SUPERSEDES: handoff `43` only where stated below
PRODUCT BASE: `43a9b1a9ded1a072d074cdc03ed36c5521b28b3b`

## Evidence and disposition

The Worker correctly stopped before RED:

1. `o1_storefront_navigation.vitest.ts` still required the non-production note
   inside `O1Home`. M1 moved that note to the global O1 shell; keeping the Home
   copy would render it twice, while leaving the stale assertion unrun would hide
   a known regression. The assertion must instead prove the exact shell constant
   and one shell use, plus absence from `O1Home`.
2. Wishlist is an existing consumer of `O1EligibleProductCard` and passes the old
   decorative `tilt` prop. Leaving that prop accepted-but-unused would make the
   reviewed ledger sequence incomplete. Wishlist must pass its existing mapped
   `index + 1` into the same card; no other Wishlist behavior changes.

These are load-bearing compatibility seams, not feature expansion.

## Corrected exact path ceiling

1. `app/src/app/page.tsx`
2. `app/src/app/shop/page.tsx`
3. `app/src/app/wishlist/page.tsx`
4. `app/src/components/product/O1EligibleProductCard.tsx`
5. `app/src/app/globals.css`
6. `app/scripts/o1_multi_product_storefront.vitest.ts`
7. `app/scripts/o1_storefront_home_catalog_visual.vitest.ts` (new)
8. `app/scripts/o1_storefront_navigation.vitest.ts`

No ninth path. Handoff `43`'s behavior and prohibitions otherwise remain exact.

## Exact test corrections

- Navigation: replace only the Home-inline provenance assertion with proof that
  `layout.tsx` defines the exact `O1_CONTEXT_NOTE`, the O1 shell renders that
  constant once, and `O1Home` does not duplicate the literal or constant.
- Multi-product: replace only the Home/Shop inline-provenance oracle with the same
  shell-owned single-strip contract. Keep the detail assertion for M3; do not
  edit detail now.
- Card consumers: Home, Shop, and Wishlist each pass their existing mapped
  `index + 1` as the ledger sequence. Remove their decorative `TILTS` constants
  and `tilt` props; do not add another responsive card component.

## Corrected focused command

Run once for RED after paths 6–8 only, and identically once for GREEN after paths
1–5:

```bash
cd app
./node_modules/.bin/vitest run --config vitest.config.ts \
  scripts/o1_multi_product_storefront.vitest.ts \
  scripts/o1_storefront_navigation.vitest.ts \
  scripts/o1_storefront_visual_shell.vitest.ts \
  scripts/o1_storefront_home_catalog_visual.vitest.ts
```

On PASS: diff check, exact eight-path containment, no generated Prisma client,
commit without a co-author trailer, non-force push, compact return, STOP before
M3. First failure returns unchanged.
