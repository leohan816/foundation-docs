# P3 Technical Mapping — smallest executable module sequence

ACTOR: Cosmile Worker (Opus 4.8/xhigh), read-only. Handoff 40 verified SHA256 `0d352414…` ✓ blob `2a9f3452…` ✓ (docs `600e4a04`). Product head `68f13b8a` clean/upstream-equal, PRODUCT_WRITE none. Mapping only; evidence = ceiling + P1 results 17/20. Every module: O1-ON conditional only; O1-OFF byte-unchanged (all gated on existing `o1RuntimeEnabled`); no schema/economic/auth/provider semantics; test-first; rollback = `git revert` the module.

## M1 — Shared O1 nav + home/catalog/detail truth (§§1.3,3.0-3.3; crit 1-6,26)
- Paths: `MallTabs.tsx`, `AppHeader.tsx`, `CategoryNav.tsx`, `CategoryDrawer.tsx`, `ProductCartFab.tsx`, `app/page.tsx`, `shop/page.tsx`, `products/[id]/page.tsx` (+ optional pure `o1Nav.ts` helper).
- O1-ON: 5-slot nav = 홈/상품/장바구니/주문내역/MY + `aria-current="page"`; header logo/back/cart only (search hidden); drawer `role=dialog`+`aria-modal`+focus-trap+Escape+focus-return, O1 links (전체 테스트 상품/MY) only, no `MOCK_USER`/logout/legacy tree; `ProductCartFab` not rendered; home composed from `o1EligibleCatalog(process.env)` only — TEST pill + 테스트 상품 + loading/empty/error copies, no timer/discount/brand/AI; catalog/detail add loading/empty/error/filtered-empty & adding/added/sold-out/add-error. Single eligible source (R3).
- Reuse: `o1EligibleCatalog`, layout shell, ProductCard morphology, `AddToCartButton`, drawer overlay.
- Test: extend `o1_browser_runtime_contract.vitest.ts` describe "O1 customer navigation + home/catalog" (source-contract). `npm run test:focused -- scripts/o1_browser_runtime_contract.vitest.ts -t 'O1 customer navigation' --cache=false`.
- RED: MallTabs = group-deal/event/consult/wishlist/account (P1-20); drawer no `role=dialog`; FAB renders on `/products/`; `page.tsx` has no `o1RuntimeEnabled` gate (P1-14). GREEN: crit 1-6,26 asserted.
- STOP: needs O1 category data / new route family.

## M2 — cart→checkout pending/failure/recovery coherence, no economics (§§3.4-3.5; crit 7-14)
- Paths: `AddToCartButton.tsx`, `CartList.tsx`, `O1TossCheckout.tsx`.
- O1-ON: durable adding/added(+장바구니 보기)/sold-out/add-error(inline alert+focus return, no toast-only); CartList line-updating/line-error(optimistic rollback)/unavailable-line, coupon/wishlist DEFERRED+unrendered when server evidence not closed, no `alert()`; `O1TossCheckout` closed copies starting/provider/local-substitute/return-confirming/success(verified redirect only)/start-error/sdk-error(hide raw)/provider-fail/recovery-HOLD(control 0)/unknown; busy disables trigger (existing `busy`), one start per multi-activation.
- Reuse: connected `O1TossCheckout` + `/api/o1/checkout/start`+toss success/fail; cart routes. Legacy `/api/checkout/mock-complete` stays only in the O1-OFF branch (crit 9).
- Test: extend contract file "O1 checkout closed states" (source-contract; `buildTossPaymentRequest` already imported). Same command `-t 'O1 checkout'`.
- RED: `O1TossCheckout` lacks return-confirming/unknown/HOLD copies + raw-error hiding; `AddToCartButton` non-durable. GREEN: crit 7-14.
- STOP/FLAG: `return-confirming`/`unknown` are §3.5 `REPAIR` states — current success flow `window.location.href`→server `toss/success` (redirect), so a CLIENT return-confirming render may not be derivable from existing outcomes without an intermediate render; if so, STOP (no new route/state).

## M3 — account/history/detail/progress/cancellation-support projection, no timeline/API (§§3.6-3.9; crit 15-23)
- Paths: `account/page.tsx`, `account/orders/page.tsx`, `orders/[orderId]/page.tsx`, `O1OrderStatus.tsx`, `O1OrderServiceRequest.tsx`.
- O1-ON: account menu 주문내역/장바구니 only (찜/상담 DEFERRED) + guest/member/auth-error copies; history loading/empty/error/unknown-order + closed badges via `deriveO1OrderServiceRequestBadge`; detail DEDUP outer `order.items`/totals and `O1OrderStatus` lines/total into ONE reading order (heading/orderNo/lines+total once/진행/취소·지원/notice/buttons); progress `<ol>` from projection facts only (`createdAt`/`paidAt`/fulfillment/tracking/terminal), no invented actor/reason/date/%/ETA; `O1OrderServiceRequest` add load-error copy + `role=alert` on protection failure + `<section aria-labelledby>` confirmation (already inline+`aria-live`).
- Reuse: `o1CustomerOrderView`/`CustomerOrderView`, `deriveO1DetailRows`, `deriveO1ServiceRequestPresentation`, `deriveO1OrderServiceRequestBadge`. NO timeline/API/schema (crit 20; §3.8 audit timeline = UNVERIFIED/DEFERRED).
- Test: extend `o1_order_service_request_browser.vitest.ts` (M2C/M2D present) with dedup + progress-projection + load-error/`role=alert` source-contract. `-t 'M2 ...'`.
- RED: detail duplicates outer + `O1OrderStatus` lines/total; no progress `<ol>`; service-request error→UNAVAILABLE not load-error. GREEN: crit 15-23.
- STOP: any customer event/timeline/history needing new projection/API/schema → DEFERRED, STOP.

## M4 — bounded responsive/a11y floor where design requires (§§4-6; crit 24-28,29)
- Paths: `globals.css` (per-surface state copies live in M1-M3, not new route segments).
- Both O1-ON/OFF (additive, non-behavioral): `:focus-visible` 2px `#F2622A` outline + 2px offset (never removed); `@media (prefers-reduced-motion:reduce)` removes transition/gradient/carousel motion, identical state/order/focus; `.mall-tabs` safe-area inset; 44px min targets + 8px separation; distinguishable loading/empty/error/not-found/HOLD without color.
- Test: source-contract on `globals.css` (focus-visible color/offset, reduced-motion block, safe-area). New small `-t 'O1 a11y floor'` in contract file.
- RED: `globals.css` has no `:focus-visible`/`prefers-reduced-motion`/safe-area (evidence: current file). GREEN: crit 24-28; crit 29 O1-OFF behavior unchanged (focus-visible/reduced-motion additive).
- STOP: if a11y needs a new visual system/nav family → preserve facts, return for new design decision (§9).

## Cross-cutting flags
- Cannot implement from existing outcomes: multi-event customer audit timeline (no projected event list) → design DEFERRED, not built. `return-confirming`/`unknown` client checkout states (M2 flag). Real Korean-font browser rendering evidence = post-impl criterion (design §R1), not source-provable here.
- No new route family/state/API/projection/schema/test framework/broad gate/provider runtime proposed. Files uncommitted. RETURN_TO foundation-advisor. STOP.
