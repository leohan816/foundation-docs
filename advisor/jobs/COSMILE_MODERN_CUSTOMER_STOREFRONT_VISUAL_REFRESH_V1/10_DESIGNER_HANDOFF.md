# Designer Handoff — Modern Customer Storefront Visual Contract

MISSION_ID: COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1
ACTOR: foundation-designer
SESSION: foundation-designer
MODEL_EFFORT: actual `gpt-5.6-sol / max`
ROLE: Designer
SKILL: `/frontend-design`
RETURN_TO: foundation-advisor

## Pins and workspaces

- Read-only product: `/home/leo/Project/.worktrees/Cosmile/COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1`
- Product branch/base: `implementation/cosmile-modern-customer-storefront-visual-refresh-v1-20260727` / `8d4a3272c6baced193be4f9ed88710c39c90d739`
- Design output: `/home/leo/Project/.worktrees/foundation-docs/COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1`
- Docs branch/base for this handoff: `advisor/cosmile-modern-customer-storefront-visual-refresh-v1-20260727`
- Public reference: `https://cosmile.leohan.net`
- Preserve the existing runtime, all sessions, and Golden Reversal HOLD.

## Mandatory reads

Read the active Agent Office operating model, Designer role, result protocol, product `AGENTS.md` and `CLAUDE.md`, this handoff, and `/frontend-design`. Then inspect only the customer-facing source needed for:

- `app/src/app/layout.tsx`, `app/src/app/globals.css`
- `app/src/app/page.tsx`, `app/src/app/shop/page.tsx`
- `app/src/app/products/[id]/page.tsx`, `app/src/app/wishlist/page.tsx`, `app/src/app/cart/page.tsx`
- `app/src/app/account/page.tsx`, `app/src/app/account/orders/page.tsx`, `app/src/app/orders/[orderId]/page.tsx`
- `app/src/components/layout/**`
- `app/src/components/product/O1EligibleProductCard.tsx`, `AddToCartButton.tsx`, `WishlistButton.tsx`, `CartList.tsx`
- `app/src/components/commerce/O1TossCheckout.tsx`, `O1OrderStatus.tsx`, `O1OrderServiceRequest.tsx`

Do not read Dashboard/Console/Lab implementation, Foundation internals, schema, provider code, unrelated legacy features, or historical mission prose.

## Direct visual evidence

Using one isolated temporary browser profile, inspect the actual public customer experience at desktop `1440×900` and mobile `390×844` for `/`, `/shop`, one currently admitted `/products/<id>` reached from the page, `/wishlist`, `/cart`, `/account`, `/account/orders`, and one existing order detail only if accessible without mutation. GET/navigation only: no favorite/cart/checkout/auth/provider/request action. Temporary captures may be used for inspection but must be deleted unless they are one of the exact candidate artifacts below.

## Frozen product truth

- The current public runtime truth is seven admitted ELT products. Render the complete admitted dataset dynamically.
- The design must accommodate eight admitted products automatically but must not display, name, price, image, or reserve a tile for the incomplete eighth product.
- Preserve routes and all reviewed customer behavior: Google auth, guest-to-user cart merge, wishlist, multi-product cart, Toss TEST checkout states, order/history/detail, service-request state, ownership, and all order/payment/inventory semantics.
- Product images are not currently durable/licensed in `app/public`. Use an elegant truthful media placeholder; never fabricate a packshot.
- Remove the desktop phone-frame presentation. Responsive mobile is a real viewport, not a device mock.
- No fake promotion, timer, discount, review, like count, recommendation, AI-execution claim, demo KPI, unavailable route, or invented product fact.

## Required design

Create a cohesive premium Korean beauty/wellness storefront:

- shared responsive customer header/navigation/footer and clear cart/account state;
- editorial home with purposeful hierarchy and the full admitted catalog;
- discoverable catalog with responsive 2-column mobile and appropriate desktop grid;
- product detail with truthful placeholder media, identity, KRW price, wishlist, cart action, non-production context, and state/error placement;
- wishlist, cart, checkout pending/failure/recovery, account, order list/detail;
- truthful loading, empty, unavailable, error, recovery, focus, keyboard, reduced-motion, and accessible contrast behavior;
- explicit parity mapping from current route/state/action to the candidate;
- legacy UI retained in parallel until later parity and Leo acceptance; no deletion plan in this mission.

## Exact output paths

Write only:

1. `advisor/jobs/COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1/11_DESIGNER_AS_BUILT_PARITY_MATRIX.md`
2. `advisor/jobs/COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1/12_DESIGNER_VISUAL_CONTRACT.md`
3. `advisor/jobs/COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1/13_DESIGNER_DESKTOP_1440x900.svg`
4. `advisor/jobs/COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1/14_DESIGNER_MOBILE_390x844.svg`
5. `advisor/jobs/COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1/15_DESIGNER_RESULT.md`
6. `advisor/jobs/COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1/16_DESIGNER_POINTER.md`

The SVGs must be exact-size, self-contained, use legible Korean, and contain no embedded remote or unverified image. Render each once to a temporary PNG, inspect at original resolution, and delete the PNG afterward. Do not commit or push; return the six-file delta to Advisor and STOP.

## Prohibited

No product/code/config/schema/DB/data/runtime/secret/provider/economic/browser mutation; no Foundation repair; no fabricated eighth product or image; no Dashboard/Console/Lab design; no redesign of commerce semantics; no session/process/actor changes; no implementation, self-review, commit, push, or next phase.

## Completion

Return a compact result identifying inspected routes, exact artifacts, visual self-check, data/asset limitations, and `RETURN_TO: foundation-advisor`; then STOP.
