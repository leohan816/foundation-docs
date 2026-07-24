# P1 Technical As-Built Census — COSMILE_O1_STOREFRONT_AND_CUSTOMER_ACCOUNT_COMPLETION_V1

ACTOR: Cosmile Worker (Opus 4.8/xhigh), read-only. Handoff verified SHA256 `2a813bb5…` ✓ blob `6a23216e…` ✓ (docs `bc62578e`). Base `51ef5f2` clean/upstream-equal, no product write. Contract-to-code mapping only, within the exact ceiling.

## Customer surfaces (route · data/truth owner · auth · status · gap · reuse · evidence)
1. `layout.tsx` — storefront chrome (AppHeader+CategoryNav+MallTabs+CartFab); `x-pathname` console-gate. **CONNECTED**. Reuse as-is. ev: layout.tsx:19-43.
2. `/` (page.tsx) — `foundationProductClient.listProducts/Brands` + `MOCK_USER` curation; **no `o1RuntimeEnabled` gate**. **MOCK/DUPLICATE** — shows legacy mock products even in O1 mode. Reuse: mirror shop's gate. ev: page.tsx:2,9,86.
3. `/shop` — O1 flag → `o1EligibleCatalog` only; else `foundationProductClient`+`getListingMap/applyListing`(prisma). **CONNECTED**. ev: shop/page.tsx:7-8,50,60-63.
4. `/products/[id]` — pure `decideProductRoute`: o1_detail(`o1EligibleCatalog`) | not_found(fail-closed) | legacy. Reuses `AddToCartButton` (server re-prices by skuId). **CONNECTED**. ev: products/[id]/page.tsx:20-22,40-66.
5. `/cart` — real prisma cart (`getCartItems`/`getShopper`); O1 display identity from `o1EligibleCatalog`; `CartList`. Data **CONNECTED**; checkout wiring **PARTIAL** (see C1). ev: cart/page.tsx; lib/cart.ts.
6. `/account` — `getShopper`+wishlist+`AuthToggle`; Google mode→generic "회원"(no PII), else `MOCK_USER.name`. **PARTIAL** (mock identity when flag OFF). ev: account/page.tsx:2,14-16.
7. `/account/orders` — `prisma.order.findMany` owner-scoped(userId/guestId)+`serviceRequest`+`deriveO1OrderServiceRequestBadge`. **CONNECTED**. ev: account/orders/page.tsx:15-18,35.
8. `/orders/[orderId]` — `prisma.order.findUnique`+`ownerMatches`; O1 detect(flag+orderNo `O1-`)→`O1OrderStatus` sanitized; `PurchaseFeedbackPanel` if paid. **CONNECTED**. ev: orders/[orderId]/page.tsx:27-33,74-87.

## API routes
- `/api/cart/**` (6) — prisma cart CRUD+coupon+merge-guest, `getShopper` owner. **CONNECTED**. ev: api/cart/*, lib/cart.ts.
- `/api/o1/checkout/start` — POST, flag+verified `userId` only (guest/mock denied); `startO1Checkout` reserves+intent, server re-prices; returns orderId/orderNo/amount/clientKey. **CONNECTED (server)**. ev: o1/checkout/start/route.ts.
- `/api/o1/checkout/toss/success|fail` — success: `confirmO1Payment`(WU-B verify, amount re-read durably)→WU-E bind→`/orders/{id}?o1=1`; fail: NO state change; both redirect via `publicOrigin`. **CONNECTED**. ev: toss/success,fail/route.ts.
- `/api/o1/orders/[orderId]` GET — `o1CustomerOrderView` sanitized, owner-scoped, not_owner≡not_found. **CONNECTED**. ev.
- `/api/o1/orders/[orderId]/service-request` POST/GET — M2A sanitized transport; submit/inspect via runtime; body never read, category-only. **CONNECTED**. ev.
- `/api/auth/google/{start,callback}`, `/api/auth/logout` — `o1GoogleAuthEnabled` flag; hash-only sessions (lib/auth/session: issue/resolve/revoke, 8h TTL, SHA-256 token). **CONNECTED**. ev.

## O1 vs legacy/mock collisions
- **C1 (PARTIAL, load-bearing)**: `CartList.checkout()` → `/api/checkout/start` + `/api/checkout/mock-complete` (LEGACY mock). In O1 mode `completeMockOrder` is **O1-REFUSED** (`decideLegacyMockCompletion`, checkout.ts:140-144); the O1 Toss lane is wired to **no** cart/checkout button ⇒ O1 purchase **not completable from the browser cart**. ev: CartList.tsx:52-71; checkout.ts:127-153.
- **C2 (DUPLICATE/MOCK)**: home `/` never checks `o1RuntimeEnabled` (unlike /shop,/products) ⇒ legacy mock catalog+MOCK_USER surface in O1 mode. ev: page.tsx.
- **C3 (identity)**: `MOCK_USER` (home/product-pitch/account-fallback) vs Google session vs guest.

## Proposed modules (PROPOSAL ONLY)
- **P1** wire cart→O1 checkout: `CartList` picks the O1 lane when flag ON (`/api/o1/checkout/start`→Toss widget→success return), keep legacy mock when OFF. Ceiling: CartList.tsx, cart/page.tsx; test: new `o1_checkout_browser.vitest.ts` or extend o1_browser_runtime_contract. Needs a Toss browser widget consuming `clientKey` — **UNVERIFIED** (outside ceiling).
- **P2** O1-gate home `/`: mirror shop gate. Ceiling: page.tsx; test: new.
- **P3** account Google-mode identity: confirm no `MOCK_USER` leak; label-only. Ceiling: account/page.tsx.

## Contract-change assessment
Appears **NO schema/economic/auth/provider contract change** required — O1 checkout/order/service-request/auth lanes + prisma cart/order already exist and are server-verified; gaps are **UI/route wiring** (cart→O1 checkout, home O1-gate). Toss browser widget is client-only.

## STOPs / UNVERIFIED (outside ceiling → needed path)
- Legacy `src/app/api/checkout/**` (start, mock-complete) internals — UNVERIFIED.
- Toss browser widget/checkout client consuming `clientKey` — UNVERIFIED; needed `src/components/**` Toss client.
- `foundationProductClient`, `MOCK_USER`, `getShopper`, `runtime/o1CommerceRuntime`, `o1NonprodConfig`, `slice/flags` — UNVERIFIED (referenced, not in ceiling).
- `/api/coupons/available`, `/api/wishlist/toggle` — outside ceiling.
Tests present (scripts/): o1_browser_runtime_contract, _property, o1_order_service_request_browser (M2C/M2D), o1_customer_service_request_route, o1_golden_order; vitest `scripts/**/*.vitest.ts` node env; build/typecheck/test:focused generate-first. No product/test/build/DB/network action taken.

RETURN_TO foundation-advisor. STOP.
