# Designer contract — Storefront reuse and Golden Path

MISSION: `COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1`
HANDOFF: `10_DESIGNER_STOREFRONT_REUSE_HANDOFF.md`
ACTOR: existing `foundation-designer`
STATUS: `DESIGN_READY_FOR_INDEPENDENT_REVIEW`
PRODUCT SUBJECT: Cosmile non-production multi-product Storefront

## 1. Design premise and truth boundary

- Audience: a Korean mobile shopper who must be able to browse every currently
  admitted test product, open detail, save a favorite, add to cart, sign in with
  Google when required, and continue to the existing Toss TEST checkout.
- Page job: make one truthful commerce collection understandable across Home,
  Shop, Detail, Wishlist, and Cart without introducing another dataset or claim.
- Canonical ELT set size is eight. The visible collection is the individually
  fail-closed result of `o1EligibleCatalog`; therefore its truthful size is dynamic
  from zero through eight. The UI never pads, replaces, or manufactures a card.
- Candidate binding labels such as `{{displayName}}`, `{{price}}`, and
  `{{eligibleItems.length}}` are design annotations, never literal product copy.
- No product identifiers, mock product names, brands, promotions, timers,
  recommendations, suitability judgments, or unproven images appear in the design.

## 2. Designer-role fallback sequence

`/frontend-design` is unavailable as dispatched. This contract follows the active
Designer role directly, with no substitute skill.

### Space

- Reuse the existing Cosmile shell: centered COSMILE wordmark, warm cream canvas,
  orange action color, compact category/navigation rhythm, neutral product visual,
  and five-item O1 bottom tabs on mobile.
- Mobile is primary at exactly `390×844`; content occupies the full viewport and the
  bottom tabs respect the safe area.
- Desktop is exactly `1440×900`; the same information expands into a 3–4-column
  catalog with a full header, not a stretched phone bezel.
- Home and Shop share one card grammar. Detail, Wishlist, and Cart use the same
  spacing, type, neutral visual, and action treatment.

### Behavior

- Card actions are three separate, non-nested targets: detail link, favorite toggle,
  and cart action. A button is never placed inside the detail link.
- Favorite reuses current durable Wishlist ownership and merge behavior. Optimistic
  state must revert on failure and expose an inline alert.
- Cart reuses the current server-priced add path. Success stays visible and links to
  Cart; failure returns focus to the action and exposes the existing generic alert.
- If identity is required, only the existing Google transition is offered. Preserve
  intended favorite/cart/checkout context through sign-in and existing ownership
  merge; do not add Apple, email, or mock-user choices.
- Cart checkout hands off only to Toss TEST and states that no real charge occurs.
  Golden Order, full reversal, and O1 history behavior remain unchanged.

### Information

- Storefront identity is only existing `displayName`, Cosmile SKU/availability truth,
  and positive integer KRW price from the admitted item.
- The card never displays a Foundation/product identifier, internal status, customer
  data, recommendation reason, ingredient judgment, efficacy claim, list price,
  discount, timer, popularity, rating, stock count, or invented badge.
- Provenance is always visible near the page heading:
  `비프로덕션 테스트 쇼핑 · 실제 청구와 배송 없음`.
- Counts are computed from the same displayed array after omission; never from the
  canonical set size or a separate total.

### Technology

- Reuse the existing `o1EligibleCatalog` result and existing route membership check.
- Reuse `WishlistButton` ownership/toggle semantics and `AddToCartButton` server-price,
  busy, success, error, and focus behavior; extend only their presentation as needed.
- Reuse `MallTabs` O1 destinations and active-state logic. A Wishlist transition may
  use the existing shell heart/detail success link without replacing the five tabs.
- No schema, auth contract, read contract, checkout provider, runtime flag, route
  identifier, or alternate API is authorized by this design.

## 3. Reused visual system

| Role | Existing token | Contract use |
| --- | --- | --- |
| Warm canvas | `#F6F5F3` | Storefront background |
| Primary ink | `#1B1714` | Headings and prices |
| Secondary ink | `#6B645E` | Supporting copy |
| Paper | `#FFFFFF` | Cards, sheets, controls |
| Cosmile orange | `#F2622A` | Primary action, active route, focus |
| Deep orange | `#D94F1C` | Pressed/strong emphasis only |
| Hairline | `rgba(27,23,20,.10)` | Card and section structure |

- Typography stays on the current system stack: Apple system display, Apple SD
  Gothic Neo / Noto Sans KR fallback. No new display family.
- Product visual stays a rights-safe neutral bottle silhouette on the current warm
  gradient. No logo, packaging, photography, or brand-color inference.
- Radius family: 14px controls, 18–20px product cards, 24px sheets.
- Shadow stays quiet and warm; status never relies on shadow or color alone.

## 4. Responsive frames

### Mobile `390×844`

1. Status/header: 32px status zone + 54px COSMILE header.
2. Horizontal context navigation: 38px, scrollable without hidden focus.
3. Provenance strip: visible before catalog content.
4. Home title row: `테스트 상품` + `전체 {eligibleItems.length}개`.
5. Two-column cards with 12px gap and 16px page inset.
6. Every card exposes a 44px favorite target and 44px minimum detail/cart targets.
7. The page continues until every item in the single array is rendered; no `slice`,
   carousel cap, representative subset, or silent “more” boundary.
8. Existing O1 bottom tabs remain `홈 / 상품 / 장바구니 / 주문내역 / MY`.

### Desktop `1440×900`

1. 76px paper header with COSMILE wordmark, Storefront navigation, shell Wishlist/
   Cart access, and Google-only identity entry.
2. 40px provenance strip within a maximum 1360px content lane.
3. Catalog expands to 3 columns at 1024–1279px and 4 columns at 1280px+.
4. Card information order and action names do not change from mobile.
5. Detail uses a two-column layout: neutral visual left; identity, KRW price,
   favorite, and cart action right. No content is added merely to fill desktop space.
6. Wishlist and Cart use the same content lane and card/line grammar.

### Breakpoints and text growth

- `<640px`: 2 catalog columns; full-width detail actions.
- `640–1023px`: 2–3 columns based on available width.
- `1024–1279px`: 3 columns; desktop header.
- `≥1280px`: 4 columns; 1360px maximum content lane.
- At 200% text zoom, cards grow vertically, controls wrap, and no fixed content height
  clips names, prices, alerts, or action labels.

## 5. Shared admitted-item card

Semantic anatomy:

```text
article
├─ link → existing encoded detail route
│  ├─ neutral visual (decorative)
│  ├─ h2/h3 = item.displayName
│  └─ KRW price = server-backed item.price
├─ button aria-pressed → durable favorite
└─ button → add existing SKU to cart
```

- Detail link accessible name: `{displayName} 상세 보기`.
- Favorite label: `찜하기` / `찜 해제`; pressed state also appears as text or
  screen-reader state, never color alone.
- Cart label: `장바구니 담기 · ₩{price}`; busy and disabled states reuse existing
  button language.
- A card appears only after that item passes all existing admission gates. A failed
  item creates no blank tile, tombstone, placeholder product, or “eighth” card.

## 6. Route contracts

### Home `/`

- Keep the recognizable COSMILE header, warm shell, context navigation, and bottom
  tabs.
- Replace hot-deal, timer, group-buy, fake curation, and representative-list concepts
  in O1 mode with one heading: `테스트 상품`.
- Render `eligibleItems.map(...)` through the full collection using the shared card.
- Link `전체 보기` to Shop but do not use it to hide items from Home.

### Shop `/shop`

- H1: `테스트 카탈로그`; provenance follows immediately.
- Render the same admitted array and card grammar. Category/filter UI appears only if
  it can filter that already-loaded array without changing admission or requesting a
  second source.
- Filtered count is the number of cards currently displayed and is announced politely.

### Detail `/products/{existing encoded destination}`

- Membership remains fail-closed. A non-admitted route remains not found; it never
  falls through to legacy/mock detail.
- Show only neutral visual, `displayName`, KRW price, provenance, favorite, and cart.
- Reuse existing SKU for server price determination. Client price is display-only.
- Do not add claims, benefits, ingredients, suitability, voice pitch, recommendation,
  mock user, campaign, deal, stock promise, or product imagery.

### Wishlist `/wishlist`

- H1: `찜한 상품`; count is the saved, currently admitted items that are rendered.
- Reuse existing ownership and merge semantics. Resolve saved membership against the
  same admitted collection; non-admitted items do not become legacy/mock cards.
- Empty copy: `아직 찜한 테스트 상품이 없어요.`
- Saved card retains detail, `찜 해제`, and cart actions.

### Cart `/cart`

- H1: `장바구니`; line identity comes from the same admitted collection.
- Show neutral thumbnail, display name, selected option if existing, quantity,
  server-price snapshot, line total, remove/update controls, and sold-out/unavailable
  truth already owned by Cart.
- Primary action: `Toss TEST로 주문하기`; supporting copy:
  `테스트 결제 · 실제 청구 없음`.
- Do not imply adding reserves stock.

## 7. Golden Path transitions

| Step | Visible state | Required continuation |
| --- | --- | --- |
| Home/Shop | Full admitted collection | Detail, favorite, cart all reachable |
| Detail | Identity + KRW + favorite + cart | No mock claims or secondary dataset |
| Favorite | Persistent pressed state | `찜에 저장했어요. 찜한 상품 보기` |
| Cart | Persistent success | `장바구니에 담겼어요. 장바구니 보기` |
| Identity | `Google로 계속하기` only | Preserve intent and existing merge |
| Checkout | `Toss TEST로 주문하기` | Existing TEST handoff only |
| After order | Existing Golden Order | Existing full reversal and O1 history |

- If anonymous ownership already permits favorite/cart, do not interrupt the action;
  request Google identity only at the existing required boundary.
- On return from Google, focus moves to a route heading and a polite status confirms
  the restored favorite/cart/checkout context without exposing identifiers.

## 8. State and copy matrix

| State | Visual treatment | Exact user copy / rule |
| --- | --- | --- |
| Initial loading | Card-shaped skeletons, heading/provenance retained | SR-only `테스트 상품을 불러오는 중입니다.` |
| Per-item omission | No tile or gap; collection reflows | Count recomputes; no user-facing failed item |
| Catalog empty | Contained neutral panel | `지금 볼 수 있는 테스트 상품이 없어요.` |
| Catalog unavailable | Bordered alert, no stale cards | `테스트 상품을 불러오지 못했어요. 다시 시도해 주세요.` |
| Favorite saving | Button busy, prior state retained visually | `찜을 저장하는 중입니다.` |
| Favorite success | Pressed heart + persistent inline result | `찜에 저장했어요. 찜한 상품 보기` |
| Favorite failure | Revert state + inline `role=alert` | `찜을 저장하지 못했어요. 다시 시도해 주세요.` |
| Cart adding | Existing busy label, duplicate action blocked | `장바구니에 담는 중…` |
| Cart success | Persistent inline result + Cart link | Existing success copy |
| Cart failure | Focus returns to action + `role=alert` | Existing generic failure copy |
| Google transition | Modal/sheet with retained intent summary | `계속하려면 Google로 로그인해 주세요.` |
| Checkout handoff | Cart summary retained | `Toss TEST로 이동합니다. 실제 청구는 없습니다.` |

## 9. Accessibility and motion

- DOM order follows visual order; heading levels never depend on card size.
- All interactive targets are at least `44×44px`; adjacent targets keep at least 8px
  separation where their hit areas could collide.
- Keyboard focus uses the existing orange 2px ring with 2px offset and is never
  removed. Detail, favorite, cart, filters, tabs, and retry are all reachable.
- Favorite uses `aria-pressed`; busy actions use `aria-busy`; result changes use
  polite live regions; failures use alerts without exposing server text.
- Neutral bottle art is decorative. Product accessible identity comes from the
  existing display name, not emoji, color, position, or artwork.
- Bottom navigation supplies `aria-current=page`; icons repeat visible text labels.
- Reduced motion turns transitions/animations effectively off. Skeletons do not
  shimmer; no information depends on motion.

## 10. Worker acceptance map

1. Home and Shop each render the full single admitted collection without slicing.
2. Visible count equals rendered cards and may truthfully be any value `0…8`.
3. Every card independently supports detail, durable favorite, and cart with no
   nested interactive element.
4. Detail remains admitted-only and shows no unauthorized claim or identifier.
5. Wishlist and Cart resolve visible identity against the admitted collection and
   reuse current ownership/server-price behavior.
6. Empty, unavailable, per-item omission, favorite failure, and cart failure are
   distinguishable in copy and semantics.
7. Google is the only identity choice; Toss TEST is the only checkout handoff.
8. Existing Golden Order, full reversal, and O1 history contracts are untouched.
9. The 390×844 and 1440×900 layouts follow the same content/action grammar.
10. Keyboard, 44px touch, screen-reader, high-text, and reduced-motion criteria pass.

## 11. Explicit exclusions

- No mock user, hot-deal price, discount, timer, promotion, group buy, fake
  recommendation, AI-execution claim, alternate dataset, or fabricated eighth item.
- No unproven product/brand asset or protected-style copy.
- No schema, migration, DB, auth/provider, secret, runtime, product-source,
  navigation-contract, checkout, order, reversal, or history change.
- This artifact is implementation guidance, not product implementation, independent
  approval, or Founder acceptance.
