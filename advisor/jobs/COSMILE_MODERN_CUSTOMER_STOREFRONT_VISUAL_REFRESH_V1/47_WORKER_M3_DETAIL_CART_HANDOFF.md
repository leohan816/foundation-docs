# 47 — Worker M3 Detail / Wishlist / Cart / Checkout Handoff

MISSION: `COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1`
MODULE: `M3_DETAIL_WISHLIST_CART_CHECKOUT_PRESENTATION`
BASE: `dc2ac49a2a51f568b58b3e0410fcbb205b69530f`
ACTOR: existing Cosmile Worker, actual Opus 5/xhigh, `/fable-builder`
CWD: `/home/leo/Project/.worktrees/Cosmile/COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1`

## Exact ten-path ceiling

1. `app/src/app/products/[id]/page.tsx`
2. `app/src/app/wishlist/page.tsx`
3. `app/src/app/cart/page.tsx`
4. `app/src/components/product/AddToCartButton.tsx`
5. `app/src/components/product/CartList.tsx`
6. `app/src/components/commerce/O1TossCheckout.tsx`
7. `app/src/app/globals.css`
8. `app/scripts/o1_multi_product_storefront.vitest.ts`
9. `app/scripts/o1_cart_customer_state.vitest.ts`
10. `app/scripts/o1_storefront_detail_cart_visual.vitest.ts` (new)

No eleventh path. Existing checkout, a11y, and M2 visual tests are run-only.

## Frozen behavior

### Shared

- O1 branches only. Legacy flag-off markup and behavior remain unchanged.
- The global O1 shell owns the route-level non-production strip. Remove the
  duplicate Wishlist and product-detail strips; correct only their stale oracle.
- No route, API, read/write contract, data, schema, migration, dependency,
  identity, cart, pricing, reservation, order, payment, refund, inventory,
  service-request, provider, or economic semantic changes.

### Product detail

- Preserve fail-closed `decideProductRoute`, `o1EligibleCatalog`, Wishlist
  ownership, runtime `displayName`, integer KRW price, Foundation product id and
  Cosmile SKU binding into existing Add-to-Cart.
- Responsive O1 detail only: stacked media-first mobile; desktop `7/5`
  media/content split. Media states `제품 이미지 준비 중`; no `img`, remote media,
  packshot, ingredient/efficacy cue, recommendation, identifier, or claim.
- Identity row contains one existing Wishlist control; override its legacy
  absolute positioning only within the O1 detail. Price uses ink, not urgency
  orange. Availability truth is exactly
  `현재 카탈로그에서 구매 가능한 테스트 상품입니다.`
- Purchase region contains the existing Add-to-Cart action and one `AddStatus`
  slot. Mobile may fix it above the existing bottom nav only while it cannot
  cover inline status; at 200%/short viewport it returns to normal flow.

### Add-to-Cart

- Preserve the exact state machine, POST body, duplicate guard, SKU/offer
  selection, server-price authority, success persistence, focus return, generic
  error, and sold-out behavior.
- Use exactly one persistent `data-testid="add-status"` live-region container
  directly after the action. Success (with `/cart` link) and error are mutually
  exclusive children of that one slot; error remains `role="alert"`. Focus stays
  on the originating action; the success link is next in DOM/tab order.

### Wishlist

- Keep admitted intersection, count, shared card, optimistic toggle, and empty
  copy/action unchanged. Remove only the duplicate context strip and apply the
  shared responsive collection framing.

### Cart and checkout

- Keep actual `CartLine` data, independent line pending/error/rollback, quantity,
  remove, unavailable-line block, total/count, and checkout disabled semantics.
- O1 cart only: desktop 8-column lines + 4-column sticky summary; mobile stacked
  lines + summary above nav. Sticky/fixed behavior returns to normal flow at
  200%/short viewport.
- Replace the bottle emoji/gradient with the truthful `제품 이미지 준비 중` field.
  Do not add media, product claim, or identifier.
- Preserve line-local `aria-busy`, role-alert, controls ≥44px, and removable
  unavailable rows.
- Checkout presentation may gain O1 classes only. Preserve byte-for-byte:
  atomic start guard, `/api/o1/checkout/start`, Toss SDK URL, KRW/order binding,
  TEST sandbox object, success/fail URLs, local-substitute label, phase labels,
  generic failure, and `/account/orders` recovery. No provider call occurs.

## Tests first

Patch paths 8–10 first, then run exactly:

```bash
cd app
./node_modules/.bin/vitest run --config vitest.config.ts \
  scripts/o1_multi_product_storefront.vitest.ts \
  scripts/o1_cart_customer_state.vitest.ts \
  scripts/o1_checkout_customer_state.vitest.ts \
  scripts/o1_storefront_a11y_floor.vitest.ts \
  scripts/o1_storefront_home_catalog_visual.vitest.ts \
  scripts/o1_storefront_detail_cart_visual.vitest.ts
```

Meaningful RED must cover single shell-owned context, truthful detail/cart media,
one Wishlist, one AddStatus slot, desktop/mobile composition, line-local state,
and unchanged checkout bindings. Implement paths 1–7 only, then run the identical
command once as GREEN.

PASS: `git diff --check`, exact ten-path containment, generated Prisma client
absent, commit without co-author trailer, non-force push, compact return, STOP
before M4. First failure or missing fact outside the ceiling returns `HOLD`
without another diagnostic or broad command. No build/typecheck/runtime/browser.
