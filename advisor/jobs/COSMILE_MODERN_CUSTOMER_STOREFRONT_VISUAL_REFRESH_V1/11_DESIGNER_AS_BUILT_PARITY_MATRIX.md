# COSMILE Modern Storefront — As-Built Parity Matrix

Status: `DESIGN CONTRACT / NO IMPLEMENTATION`
Product evidence pin: `8d4a3272c6baced193be4f9ed88710c39c90d739`
Public evidence: GET-only inspection at `1440×900` and `390×844`, 2026-07-27

## Evidence boundary

- Inspected `/`, `/shop`, one admitted product detail reached from the public catalog, `/wishlist`, `/cart`, `/account`, and `/account/orders` at both required viewports.
- No owned order existed for the isolated guest, so no order-detail URL was available without creating state. Order detail and service-request parity therefore comes from the admitted read-only source.
- Public truth was seven admitted products. The candidate renders the complete returned array; every visible count and card sequence is derived from that array, and an eighth card appears only after an eighth item is actually admitted.
- Public product names and prices shown in the candidate are a visual snapshot, never hard-coded design data. Runtime values remain authoritative.

## Route and action parity

| Current route / surface | As-built truth to preserve | Candidate placement and treatment | Parity acceptance |
|---|---|---|---|
| Global shell | Storefront chrome, customer navigation, cart and account destinations; desktop currently sits inside a 390×844 phone frame | Full-width desktop header; compact true-viewport mobile header; shared footer/nav; persistent non-production strip | No desktop device bezel; all admitted destinations remain reachable and active state remains deterministic |
| `/` Home | Non-production notice, exact admitted count, complete eligible catalog, card detail/wishlist/cart targets | Count-independent editorial lead followed immediately by the complete runtime catalog; 4-column desktop `4+3`, 2-column mobile flow | Count and sequence derive only from `admittedItems.length` and mapped index; seven means seven cards; no blank eighth tile or incomplete-product content |
| `/shop` | Catalog title/count and same eligible-card grammar | Same card primitive, denser catalog lead, optional runtime-backed filters only | Home and Shop cannot diverge in name, price, eligibility, wishlist, or cart behavior |
| `/products/<id>` | Fail-closed admitted detail, truthful neutral media, display name, KRW price, wishlist, add to cart, non-production context | Wide media/content split on desktop; stacked media-first mobile; sticky mobile purchase bar | Unadmitted route still fails closed; no claim, identifier, fabricated packshot, or recommendation is introduced |
| `/wishlist` | Admitted intersection only; saved toggle; honest empty state | Catalog card grammar with saved state exposed; empty state uses one primary link to Shop | Count equals rendered admitted saved items; optimistic toggle semantics and rollback remain unchanged |
| `/cart` | Multi-line cart, quantity, remove, sold-out/unavailable protection, line-level pending/error rollback, total | Two-column desktop list/summary; stacked mobile list with sticky summary action; line status stays beside affected line | No global lock replaces line-level pending; totals remain server-backed; unavailable lines block checkout and remain removable |
| Checkout in `/cart` | Server start/reprice/reserve; Toss TEST or explicitly labelled local substitute; generic failure and order-history recovery | One primary TEST checkout action; progress replaces button label; evidence-layer note below; failure includes order-history recovery link | No card data surface, provider key, internal reference, success claim, or money truth is created by the view |
| `/account` | Guest/member-neutral identity, Google auth, wishlist/cart/order links, wishlist count badge, guest-to-user continuity copy | Quiet identity panel; Google action remains explicit; the existing Wishlist row and live badge are the deliberate mobile Wishlist entry point | No PII fabrication; auth, Wishlist count, and guest-to-user cart merge behavior remain intact; no extra Wishlist bottom tab is invented |
| `/account/orders` | Owned order history, status, date, snapshot name, total, service-request badge; loading/empty/error | Timeline-like order cards with state badge and optional request badge; compact empty/retry patterns | Ownership query and route targets are unchanged; counts and badges use returned data only |
| `/orders/<orderId>` | Owner-only detail; immediate confirmation differs from history detail; O1 customer projection hides internal references | Order summary, line snapshots, total, factual status rows, progress, service-request section | Non-owner stays not-found; confirmation headline appears only on confirmed return; no internal/provider/payment identifiers leak |
| Service request | Server-category-driven eligibility, confirmation consequence, requested/processing/completed/refused/recovery states | Bordered secondary section below order facts; destructive intent requires a second confirmation step | Copy/action remains a closed projection of server categories; no automatic refund, restock, carrier, or completion promise |

## Component parity

| Existing component contract | Candidate component | Invariant |
|---|---|---|
| `O1EligibleProductCard` has three separate targets | One `CatalogCard`: accepted desktop horizontal media/content geometry; mobile two-column vertical 4:3 media variant | These are responsive variants of one primitive, not separate components; controls never nest and each target is at least 44×44 px |
| `WishlistButton` uses pressed state and optimistic rollback | One detail Heart control with outline/filled state | Mobile detail has exactly one control, one `aria-pressed` state, and one announcement source; busy guard and rollback survive restyling |
| `AddToCartButton` exposes idle/adding/added/error/sold-out | Full-width or card-scale purchase action plus one exact mobile `AddStatus` slot directly below the purchase action | Success persists with Cart link; generic error returns focus to the purchase action; at 200% the purchase bar and slot return to normal flow; availability remains a separate product state |
| `CartList` supports independent line updates | `CartLine` plus line-local live status | One failed line cannot roll back or lock another line |
| `O1TossCheckout` separates provider TEST and local substitute | `CheckoutAction` plus evidence note/recovery | The two evidence layers are visually and verbally distinct |
| `O1OrderStatus` uses sanitized customer projection | `OrderFacts` + `OrderProgress` | Only customer projection fields render; dates/statuses are factual, not inferred |
| `O1OrderServiceRequest` is fail-closed | `ServiceRequestPanel` | Unknown response shape produces unavailable state, never an enabled destructive action |

## State parity

| State | Visual contract | Behavior contract |
|---|---|---|
| Loading | Reserved geometry, muted skeleton blocks, plain `…불러오는 중` live copy | `aria-busy`; no fake rows, totals, or completion |
| Empty | One quiet illustration made from interface geometry, exact empty copy, one route-safe action | No recommendation or unavailable destination |
| Pending | Label changes in place; control disabled only at the correct scope | Duplicate request blocked; unrelated cart lines remain operable |
| Success | Persistent inline confirmation and next safe route | Never timeout-only; never announced before server/provider truth |
| Error | Brick-red text adjacent to source action, generic customer-safe wording | Focus returns to actionable control; raw server/provider text stays hidden |
| Unavailable / sold out | Neutral unavailable row/card state; checkout gate explains removal requirement | Detail remains fail-closed; cart line remains removable |
| Recovery hold | Mineral warning panel and explicit `상태 다시 확인` | No order, stock, refund, or fulfillment mutation is implied |
| Focus | 2 px deep-pine ring plus 3 px paper offset | Visible for every link, button, select, and confirmation control |
| Reduced motion | No lift, parallax, shimmer, or animated gradient | State and focus remain visible; transitions collapse to near-zero |

## Non-parity exclusions

- No promotion, discount, countdown, review, like count, recommendation, AI-execution claim, KPI, shipping promise, or new route enters the candidate.
- No product identifier is made customer-visible. No media block suggests an actual package shape; it is explicitly a pending media surface.
- Legacy UI remains available in parallel until route-by-route parity and Leo acceptance. This mission defines no deletion, migration, or cutover.
