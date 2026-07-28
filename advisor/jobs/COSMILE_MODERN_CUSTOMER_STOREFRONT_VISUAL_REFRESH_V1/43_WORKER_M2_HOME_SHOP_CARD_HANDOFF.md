# 43 — Worker M2 Home / Shop / Card Handoff

MISSION: `COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1`
MODULE: `M2_HOME_SHOP_CARD`
BASE: `43a9b1a9ded1a072d074cdc03ed36c5521b28b3b`
ACTOR: existing Cosmile Worker, actual Opus 5/xhigh, `/fable-builder`
CWD: `/home/leo/Project/.worktrees/Cosmile/COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1`

## Exact path ceiling

1. `app/src/app/page.tsx`
2. `app/src/app/shop/page.tsx`
3. `app/src/components/product/O1EligibleProductCard.tsx`
4. `app/src/app/globals.css`
5. `app/scripts/o1_multi_product_storefront.vitest.ts`
6. `app/scripts/o1_storefront_home_catalog_visual.vitest.ts` (new)

No seventh path. `o1_storefront_visual_shell.vitest.ts` is a read/run-only
compatibility gate and must not be edited.

## Frozen behavior

- O1 only. Legacy flag-off branches remain behaviorally and textually unchanged.
- Both Home and Shop read only `o1EligibleCatalog(process.env)`, map the complete
  returned array in order, and derive visible count and ledger sequence from that
  array. No slice, representative row, literal `7`/`8`, alternate catalog, or
  candidate-specific branch.
- The shell owns the one global non-production context strip. Remove the duplicate
  Home/Shop strips and correct the existing test oracle to prove one shell-owned
  strip rather than weakening provenance.
- Home uses the reviewed count-independent lead:
  `테스트 컬렉션.`, `현재 준비된 테스트 상품을 빠짐없이, 과장 없이 보여드려요.`,
  and the existing `/shop` action `전체 상품 보기`. The complete catalog follows
  under `테스트 상품 전체` with `items.length`.
- Shop keeps a compact catalog lead, truthful `items.length`, the same empty state,
  and the same shared card. No unsupported filter or new route.
- `O1EligibleProductCard` remains the one component used by Home, Shop, and
  Wishlist. Detail, Wishlist, and Cart behavior are not edited.
- Replace the decorative tilt block with truthful `MediaPending`: mapped
  `index + 1` ledger number plus `제품 이미지 준비 중`. Do not add `img`, remote
  media, packshot, efficacy/ingredient cue, product identifier, promotion,
  discount, rating, review, recommendation, stock claim, or badge.
- Preserve exactly three sibling targets: detail link over media/name/price,
  existing 44px Wishlist action, existing Add-to-Cart action. Preserve runtime
  `displayName`, integer KRW price, `foundationProductId`, and `cosmileSkuId`.
- Card: radius `16px`, one-pixel line, no resting shadow. Mobile `<640`: two
  columns, 12px gap, 4:3 media above content. Tablet `640–1023`: responsive
  three/two columns without cards below 220px. Desktop `1024–1279`: three columns.
  Desktop `>=1280`: four columns with the accepted horizontal media-rail
  composition (`112×170` within the approximately `312×194` card).
- Preserve ≥44px targets, visible focus, reduced-motion no-lift, two-line card
  names, accessible full-name detail label, honest empty state, and 200% flow.
- No product/data/auth/cart/order/payment/inventory/refund/service-request
  semantics, route, API, read/write contract, schema, migration, dependency,
  runtime, DB, provider, browser, or economic action.

## Tests first

1. Patch only paths 5 and 6 first.
2. Run exactly:

```bash
cd app
./node_modules/.bin/vitest run --config vitest.config.ts \
  scripts/o1_multi_product_storefront.vitest.ts \
  scripts/o1_storefront_visual_shell.vitest.ts \
  scripts/o1_storefront_home_catalog_visual.vitest.ts
```

3. Meaningful RED must prove at least the editorial lead, single shell-owned
   context strip, truthful media pending field, shared responsive card grammar,
   complete dynamic mapping, and forbidden mock/claim/media absence.
4. Implement paths 1–4 only, then run the identical command once as GREEN.
5. On PASS: `git diff --check`, exact six-path containment, no generated Prisma
   client, commit without any co-author trailer, non-force push, compact result,
   and STOP before M3.
6. On first failure or missing fact outside the ceiling: preserve it and return
   `HOLD` without another diagnostic or broader command.
