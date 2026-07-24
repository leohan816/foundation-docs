# P1 Technical Fact Supplement — Designer facts

ACTOR: Cosmile Worker (Opus 4.8/xhigh), read-only. Handoff 19 verified SHA256 `9ad7b151…` ✓ blob `bf22f4d6…` ✓ (docs `da6357b0`). Base `51ef5f2` clean/upstream-equal, no product write. Facts only from the exact seven files + observed route inventory; gaps classified, no code/scope proposed.

## O1 order status — projection, vocabulary, actions (O1OrderStatus.tsx)
- Client fetch `/api/o1/orders/{id}` → `O1CustomerView` = { orderNo, status, createdAt, paidAt, lines[{productName,optionName,quantity,unitPrice}], fulfillmentStatus, tracking{carrier,trackingRef} }. No internal id/payment/intent/capture/provider/digest/PII.
- Component states: `loading` ("주문 정보를 불러오는 중…"), `error` ("주문 정보를 볼 수 없어요."), `ready`.
- STATUS vocab: ORDER_PENDING 결제 대기 · ORDER_CONFIRMED 주문 확정 · ORDER_FULFILLED 배송 완료 · ORDER_CANCELLED 주문 취소 · ORDER_REFUNDED 환불 완료. FULFILLMENT: pending 준비 전 · preparing 준비 중 · shipped 발송됨 · delivered 배송됨.
- Detail rows (pure `deriveO1DetailRows`): 주문일시 · 주문 상태 · 결제 상태(paidAt→결제 완료/결제 전) · 배송 상태(fulfillment + tracking carrier·trackingRef only when present) · 환불 상태(ORDER_REFUNDED→환불 완료 else 환불 완료 전; no absolute "no refund"). Header shows order-state badge + orderNo; lines + 합계 total.
- ACTIONS: embeds `<O1OrderServiceRequest orderId>` (cancel/support customer action — that file is outside the 7-ceiling; the route is the M2A service-request lane). O1OrderStatus itself is read-only.

## Timeline/history actually projected
- The customer projection (`o1CustomerOrderView`→`customerOrderView`, order/contracts `CustomerOrderView`/`CustomerViewOutcome{ok|not_owner|not_found|invalid_input|repository_error}`) exposes CURRENT status + paidAt + fulfillment + tracking ONLY — **no timeline/event list**. `order/repository.ts` keeps an internal monotonic per-order OrderHistory ("exactly one per-order history row, seq=MAX+1") but it is NOT projected to the customer. **GAP**: no customer-facing order timeline/history.
- `customerStatusOf` maps DB→customer status (paid→ORDER_CONFIRMED); DB statuses pending/paid/fulfilled/cancelled/refunded.

## MallTabs (MallTabs.tsx)
- Bottom nav: 공구 `/group-deal` · 이벤트 `/event` · 상담 `/consult` (context-carry: on `/products/{id}` → `/consult?product={id}`) · 찜 `/wishlist` · MY `/account`.
- Current-state: `isActive` = path==="/" for "/", else `path.startsWith(href)` → "active" class. No cart/home tab (cart is in AppHeader).

## CategoryDrawer (CategoryDrawer.tsx) — keyboard/focus
- Context-driven (isOpen/open/close). Overlay click=close; `aside` stops propagation; close button `aria-label="닫기"`; side buttons setActive; item Links `/shop?category=` close on click. Uses `MOCK_USER.name`; "로그아웃" is a static non-functional span.
- **GAP**: no Escape-key handler, no focus trap, no focus return, no `role="dialog"`/`aria-modal`, no initial focus. Only `aria-hidden={!isOpen}`. Mouse/click only.

## ProductCartFab (ProductCartFab.tsx)
- Renders only on `/products/` paths. Static `<button aria-label="장바구니 담기">🛒</button>` with **no onClick/handler** ("Day 3에 실제 담기 연결"). **GAP**: FAB is inert (no action).

## Route-level loading/error/not-found
- Observed target route dirs (`/`, `/shop`, `/products/[id]`, `/cart`, `/account`, `/account/orders`, `/orders/[orderId]`) contain only `page.tsx` (+ root `layout.tsx`). **GAP**: NO `loading.tsx`, `error.tsx`, or `not-found.tsx` in any target route — customer surfaces rely on Next defaults; `notFound()` renders the default 404.

No product/test/build/DB/runtime/browser/provider/network action; no commit/push. RETURN_TO foundation-advisor. STOP.
