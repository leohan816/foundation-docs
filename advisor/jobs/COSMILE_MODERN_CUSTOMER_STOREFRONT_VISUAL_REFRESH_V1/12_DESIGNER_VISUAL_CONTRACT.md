# COSMILE Modern Customer Storefront — Visual Contract

Status: `CANDIDATE / DESIGN ONLY`
Direction: **Porcelain Ledger** — editorial Korean beauty presentation with commerce truth kept visibly structured.

## 1. Design intent

The current storefront has the right guarded commerce behavior but compresses every desktop route into a phone mock and gives nearly every decision the same orange weight. The refresh turns the customer surface into a real responsive store: calm editorial space, disciplined catalog rhythm, and one unmistakable action color. It must feel premium without inventing product imagery or product meaning.

The signature device is the **ledger edge**: a thin numbered rule on each admitted catalog media surface. It expresses that the catalog is a reviewed collection, not a claim about the product. The number is derived from the mapped runtime index, never an identifier and never a reserved capacity marker. Editorial copy never names the collection size.

## 2. Truth and data binding

- `catalog = admittedItems`; `count = catalog.length`; render every item in order. Every visible count uses `catalog.length`; every catalog ledger sequence uses the mapped `index + 1`; every card binds to that same mapped item.
- At seven items, desktop is `4 + 3`; the fourth position in row two is ordinary page space, not a placeholder.
- At eight items, the same CSS grid naturally becomes `4 + 4`. No special eighth-product branch is allowed.
- Bind card/detail identity to runtime `displayName`; bind currency to runtime integer KRW formatting.
- Candidate names/prices are the observed public snapshot for visual fidelity only. Implementation must never copy names, prices, counts, or sequence values into CSS or static markup.
- Product media uses `MediaPending`: an abstract flat field, ledger rule, and `제품 이미지 준비 중`. No bottle silhouette, packshot, efficacy cue, ingredient cue, or remote asset.
- The non-production notice appears once near the top of every customer route and again only where payment/order context requires it.

## 3. Color system

| Token | Value | Use |
|---|---:|---|
| `ink` | `#18211D` | Primary text, high-emphasis controls |
| `paper` | `#F4F1EA` | Page canvas and focus offset |
| `surface` | `#FFFEFB` | Cards, header, order facts |
| `pine` | `#24463C` | Navigation, structure, focus ring |
| `mist` | `#DDE8E1` | Truth notes, pending media, quiet selected states |
| `persimmon` | `#F15A35` | Primary commerce action and active destination only |

Semantic additions: `error #A43E35`, `warning #8A5A21`, `success #2F6A53`, `line rgba(24,33,29,.14)`. Persimmon is not used for prices merely to create urgency; prices default to ink and gain weight through typography. Normal-size text on persimmon actions is `ink`, not white.

## 4. Typography

- Editorial: `Noto Serif CJK KR`, 54/1.08 desktop and 31/1.16 mobile, weight 700. Use only for the home statement and product identity.
- Interface: `Noto Sans CJK KR`, 14–17/1.55, weights 400/600/700.
- Utility: system monospace for Latin sequence labels and tabular figures; Korean falls back to Noto Sans CJK.
- Maximum reading measure is 62 Korean characters. Do not use all-caps tracking for Korean.
- Dynamic product names receive two lines on cards and three on detail before truncation; full name remains the accessible label.

## 5. Responsive shell

### Desktop ≥ 1024

- No device frame. Header spans the viewport; content is centered at `max-width: 1312px` with 64 px outer gutters at 1440.
- Header: 82 px. Logo left, primary destinations centered, account/cart right. The non-production strip is 34 px directly below.
- Footer contains the same route-safe customer destinations and non-production note; no mobile tab bar.
- Catalog: four equal columns, 16 px gutter. At 1024–1279 use three columns. The accepted desktop card geometry is frozen as a horizontal `112×170` media rail plus content/actions; implementation may scale by token but may not substitute a new card composition.

### Tablet 640–1023

- Header collapses secondary destinations into one disclosed menu while cart/account remain visible.
- Catalog uses three columns until card width would fall below 220 px, then two.

### Mobile < 640

- True viewport, no bezel or fake status bar. Header is 64 px plus the 34 px context strip.
- Catalog is two columns with 12 px gutters and 16 px page margins. It is the same `CatalogCard` in its frozen vertical variant: 4:3 media above identity/price/actions, not a second component.
- Five customer destinations use the existing reviewed route set in an 82 px safe-area-aware bottom nav.
- Wishlist discovery on mobile deliberately uses the existing `/account` Wishlist row and runtime count badge; do not add a sixth tab or duplicate route entry.
- Detail is media-first; it has one Wishlist control beside identity. Its purchase bar contains only the Cart action and one `AddStatus` slot, is fixed above the bottom nav at normal text size, and never covers inline status/error copy.

## 6. Core components

### CustomerHeader

One logo, route-level nav, cart, and account. Back appears only when navigation history exists; Home remains reachable without competing back/menu/home icons. Active route uses a 2 px pine underline, not color alone.

### ContextStrip

Mist background, pine text: `비프로덕션 테스트 쇼핑 · 실제 청구와 배송 없음`. Payment/order routes may use the more precise existing reviewed copy. It is a note, never a promotional banner.

### CatalogCard

- Surface radius 14 px; 1 px line; no decorative shadow at rest.
- Desktop media uses the accepted horizontal rail. Mobile grid media is the same card's 4:3 vertical variant, explicitly pending, with runtime-index ledger edge.
- Detail link wraps only media, name, and price. Wishlist and cart remain sibling controls.
- Wishlist is a 44 px icon button. Cart is a 44 px text action. Hover lifts by 2 px only when motion is allowed.
- Name, price, and actions align to a common baseline; no discount or review slot exists.

### ProductDetail

- Desktop: 7/5 media/content split. Mobile: stacked.
- Order: context → media → identity + one Wishlist control → KRW price → availability → Cart action → `AddStatus`.
- Media has no representational container. The pending label remains visible and is not alt text for a nonexistent image.
- `AddStatus` has exactly one DOM/live-region slot directly below the mobile purchase action: adding, persistent added + Cart link, or generic error. It never represents sold-out/unavailable; availability has its own product-state row above the purchase bar.
- On Add error, focus returns to the Cart action. At 200% text zoom, the purchase bar loses fixed positioning and follows availability in normal document flow, with its single `AddStatus` slot immediately after the action.
- The Wishlist control is not repeated inside the purchase bar; one component owns pressed state, optimistic rollback, and announcement.

### Cart and Checkout

- Desktop: cart lines at 8 columns, totals/checkout at 4 sticky columns. Mobile: stacked lines and a bottom purchase summary above nav.
- Quantity controls remain line-local and 44 px. Pending copy sits on that line. Delete remains available for unavailable lines.
- Checkout progress replaces the action label. Provider TEST, deterministic local substitute, failure, and recovery copy stay directly below the action.

### Account and Orders

- Account identity is neutral: `게스트` or `회원`; no invented avatar photo or PII.
- Google auth stays a labelled secondary action. The continuity explanation remains adjacent to it.
- Order list cards expose date, snapshot name, count, total, status, and optional service-request badge.
- Order detail prioritizes factual state rows and progress. Opaque customer order number may appear; internal/provider references may not.
- Service requests sit after order facts. A submit action opens an inline consequence confirmation with `확인하고 …` and `계속 유지`.

## 7. State and accessibility rules

- Contrast: body text ≥ 4.5:1; large text and non-text controls ≥ 3:1. Persimmon buttons use white only at sizes/weights that pass; otherwise use ink text.
- Touch/click targets: minimum 44×44 px. Gaps between adjacent mobile targets: minimum 8 px.
- Focus: `2px pine` plus `3px paper` offset. Never remove outline without replacement.
- Reading order equals DOM order. Every visual reflow uses CSS grid/flex only; no duplicated route content.
- Loading uses static shapes under reduced motion. Live regions announce loading/progress politely and errors assertively.
- Color never carries state alone: pair it with label, icon geometry, and/or border.
- High text zoom: at 200%, primary action and status copy remain in flow; sticky bars become normal flow when they would cover content.
- `prefers-reduced-motion`: disable card lift, smooth scroll, animated gradients, and shimmer.

## 8. Route-specific empty and recovery copy

Use the reviewed existing copy wherever available: no saved test products, empty cart, no orders, catalog unavailable, order-history retry, add-to-cart retry, line-update retry, checkout order-history recovery, and service-request state refresh. Empty surfaces contain one safe next action; error surfaces never expose raw server/provider wording.

## 9. Legacy-parallel delivery

Build the candidate behind a reversible customer-surface switch while the legacy UI remains intact. Validate route parity, responsive behavior, keyboard flow, and state projection against `11_DESIGNER_AS_BUILT_PARITY_MATRIX.md`. No legacy deletion or default cutover occurs until Leo acceptance.

## 10. Visual acceptance gates

1. Desktop at 1440×900 is a real storefront and displays all seven observed admitted products without a phone frame or eighth ghost tile.
2. Mobile at 390×844 is a real viewport; fixed regions do not occlude content or state messages.
3. Home, Shop, and Wishlist use one card primitive and never diverge on truth or controls.
4. Detail, Cart, Checkout, Orders, and Service Request retain every reviewed behavior and state.
5. No unverified imagery, promotion, claim, route, count, or commerce outcome appears.
6. Korean renders legibly with the declared CJK stack; focus, contrast, 200% text, keyboard, and reduced-motion checks pass.
