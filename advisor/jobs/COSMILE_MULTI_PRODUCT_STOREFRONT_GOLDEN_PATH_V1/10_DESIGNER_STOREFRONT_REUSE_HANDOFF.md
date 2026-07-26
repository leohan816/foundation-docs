# Designer handoff — multi-product Storefront reuse and Golden Path acceptance

MISSION: `COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1`
ACTOR: existing `foundation-designer` only; role `Designer`; model `gpt-5.6-sol`; effort `max`.
MODE: design/read-only; no product implementation.

## Pins and workspaces

- Product read-only source: `/home/leo/Project/.worktrees/Cosmile/COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1`
- Product base: `1efde21e2942696b585b8c27e2980e97795cb3e1`
- Design output worktree: `/home/leo/Project/.worktrees/foundation-docs/COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1`
- Docs base: `38ad21a03c9c1d3b431461ef79b4ceeb93903020`
- Admission: `00_ADVISOR_ADMISSION.md`

Read current Agent Office operating model, Designer role, result protocol, product `AGENTS.md`/`CLAUDE.md`, and this handoff. The expected `/frontend-design` skill is not installed on this host; follow the active Designer role's Space → Behavior → Information → Technology sequence and its responsive/accessibility requirements directly. No substitute skill or actor.

## Exact source inspection ceiling

Read only:

1. `app/src/app/page.tsx`
2. `app/src/app/shop/page.tsx`
3. `app/src/app/products/[id]/page.tsx`
4. `app/src/app/cart/page.tsx`
5. `app/src/app/wishlist/page.tsx`
6. `app/src/components/product/ProductCard.tsx`
7. `app/src/components/product/WishlistButton.tsx`
8. `app/src/components/product/AddToCartButton.tsx`
9. `app/src/components/layout/MallTabs.tsx`
10. `app/src/app/globals.css`

One read-only public screenshot of `/`, `/shop`, and one current detail route is allowed only to verify the current visual gap. Do not log or preserve product identifiers. No login, mutation, provider, DB, runtime control, or browser interaction.

## Frozen product truth

- Reuse the original Cosmile home visual structure and existing shell; do not redesign the brand.
- Data is only the existing `o1EligibleCatalog` result backed by the approved asynchronous Foundation snapshot plus Cosmile SKU/price truth.
- Canonical ELT set is 8; each item remains individually fail-closed. Never manufacture an eighth sellable card.
- Every admitted card must visibly support detail, durable favorite, and cart. Favorite reuses existing Wishlist ownership/merge behavior; no schema.
- Google-only identity, Toss TEST-only checkout, KRW, existing Golden Order/full reversal, and O1 history remain unchanged.
- No mock user, fake hot-deal discount/timer, fabricated promotion, group-buy experiment, fake recommendation, AI-execution claim, mock Foundation product, or alternate dataset.
- No product image rights are proven; use the existing neutral product visual treatment rather than invented branded assets.

## Required design

Produce one concise high-fidelity candidate containing:

- Mobile 390×844 primary frame and desktop 1440×900 responsive frame.
- Home with recognizable original Cosmile hierarchy, truthful non-production label, all eligible items from one input collection, and no representative-only list.
- Shop/catalog grid using the same card grammar and honest empty/unavailable behavior.
- Product detail with existing identity/name/KRW price, favorite state/action, cart state/action, and no mock claims.
- Wishlist/cart/Google-login transition states sufficient to make the Golden Path understandable.
- Loading, per-item omission, catalog empty, favorite failure, cart failure, and checkout handoff states.
- Keyboard focus, 44px touch targets, screen-reader names, reduced motion, and no color-only status.
- Acceptance map that a Worker can implement without inventing copy, hierarchy, breakpoints, or state behavior.

## Outputs — exact docs paths only

1. `11_DESIGNER_STOREFRONT_REUSE_CONTRACT.md`
2. `12_DESIGNER_STOREFRONT_REUSE_CANDIDATE.svg`
3. `13_DESIGNER_STOREFRONT_REUSE_RESULT.md`
4. `14_DESIGNER_STOREFRONT_REUSE_POINTER.md`

Open the SVG at original size and record one compact visual critique. No product/config/schema/runtime/DB/provider write; no extra artifact; no commit/push. Result ≤80 lines. `RETURN_TO: foundation-advisor`; STOP before Worker.
