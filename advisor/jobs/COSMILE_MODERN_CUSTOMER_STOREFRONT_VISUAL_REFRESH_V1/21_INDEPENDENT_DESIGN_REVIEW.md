# 21 — Independent Design Review

MISSION: COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1
PASS: `DESIGN_REVIEW` · CLASSIFICATION: `NORMAL_COMPLEX_BOUNDED_DESIGN`
VERDICT: **`NEEDS_PATCH`** (design-document corrections only; direction is sound)
RETURN_TO: foundation-advisor

## Binding and evidence

- Actual live model `claude-opus-5`, effort `max`, skill `/fable-sentinel`, session `foundation-reviewer-fable5`.
- Workdirs used: only the two mission worktrees. Docs `2e867365e45dd31474b675d43a174e807cdcb5cc`, handoff `20` sha256 `2e0e1ad30c745a76d8c5d4bdc3ea794d7d54a85abee772d40a7d7f24d28e26d3`. Product read-only at `8d4a3272c6baced193be4f9ed88710c39c90d739`, clean. No predecessor-mission read.
- Reviewed `11`–`17` plus `10`/`02` as authority; minimum named source only (`layout/MallTabs.tsx`, `layout/AppHeader.tsx`, `account/page.tsx`, `product/O1EligibleProductCard.tsx`, `AddToCartButton.tsx`, `WishlistButton.tsx`).
- Rendered `13` and `14` exactly once each at original size with the existing Chromium and the recorded `FONTCONFIG_SYSROOT` Noto CJK environment; inspected once; temporary PNGs deleted. No font install/subset/embed, no product write, no runtime/browser request to the app, no alternate rendering experiment.
- Render result: Korean fully legible, no tofu, clipping or overlap; desktop is exactly 1440×900 with no phone frame; mobile is exactly 390×844 with no bezel or fake status bar; **seven cards as 4+3 with no eighth or reserved tile**.

## Blocking findings (each is an exact document correction)

- **F1 · count-bound editorial that cannot reach eight (Q2).** `13` states the count four ways — `CURRENT TEST COLLECTION · 07`, hero `07`, `7개`, and the serif headline **“오늘 볼 수 있는 / 일곱 가지.”** — plus a decorative hero field of exactly seven tiles drawn 4+3. `12` §2 binds `count = catalog.length` but never says the **word** numeral and the hero tile field derive too. A Worker copying the visual ships a headline that lies at eight. *Correction:* in `12` §2 state that every count expression (numeral, Korean word form, and the hero tile field) derives from `catalog.length`, or replace the word form with a count-free headline.
- **F2 · card primitive contradicts its own contract (Q6).** `12` §6 CatalogCard fixes “radius 14 px” and “Media is 4:3”. The desktop cards in `13` are radius 16 with a **portrait 112×170 media inside a 312×194 horizontal card** (≈2:3, and 4:3 is geometrically impossible at that height). The single most-repeated primitive is therefore unfrozen: the Worker must invent either a vertical 4:3 card or the horizontal portrait card. *Correction:* pick one composition in `12` §6 and restate radius and media ratio to match `13`; if the horizontal card is intended, say so explicitly and give the mobile two-column variant’s ratio.
- **F3 · white-on-persimmon fails the contract’s own contrast rule (Q5).** `12` §7 says persimmon uses white “only at sizes/weights that pass”. White `#FFFEFB` on persimmon `#F15A35` is ≈**3.36:1**, below 4.5:1 for normal text; both visuals use it at 12 px bold (`13` cards) and 14 px bold (`14` purchase bar) — neither reaches the large-text threshold. Ink `#18211D` on persimmon is ≈4.91:1 and passes. *Correction:* change both visuals (or the rule) to ink-on-persimmon at these sizes, or raise the label to ≥18.66 px bold; state the chosen resolution in `12` §7.
- **F4 · mobile add-to-cart status has two homes (Q3/Q6).** `12` §6 requires `AddStatus` “directly below the action”, but on mobile the action is a fixed bar; `14` shows an in-flow `상품 상태` block at y≈571 whose copy says messages stay “구매 동작 바로 아래”, while the fixed bar carries only the reprice note. Source `AddToCartButton.tsx:95–106` renders a persistent inline `aria-live` result plus `장바구니 보기` link at the action. *Correction:* name the exact mobile slot (inside the fixed bar vs the in-flow block), and state where focus returns and how it behaves at 200 % zoom when the bar joins normal flow.

## Non-blocking findings

- **F5 · wishlist mobile entry point unnamed.** `14`’s five tabs (홈·상품·장바구니·주문내역·MY) are **faithful** — `MallTabs.tsx:13–20` excludes 찜 from the O1 set by design. But `13` adds 찜 to the desktop header, and today mobile reaches it only via `account/page.tsx:62` row `찜한 상품` with a live badge, which `11` covers merely as “commerce destinations become high-clarity rows”. Name that row and its badge explicitly so the asymmetry is deliberate, not an orphaned route.
- **F6 · duplicated wishlist control.** `14` shows a heart beside the name and a second heart in the fixed bar. `WishlistButton.tsx:68–69` is a single `aria-pressed` toggle; two instances of one state need a stated single source of truth and one announcement, or one instance should be dropped.

## Confirmed strengths

1. **Q1 PASS.** Desktop phone mock removed; mobile is a true viewport; routes and separated targets (detail link / 찜 / 담기) match `O1EligibleProductCard.tsx:6`, and the reviewed O1 tab set and back/home behaviour are preserved.
2. **Q2 PASS except F1.** `12` §2 forbids a fabricated eighth, an alternate product source and static copies of names/prices; `13` deliberately ends at card 07 with no ghost tile; the 4-column grid becomes 4+4 without a branch.
3. **Q3 PASS.** `MediaPending` never suggests a packshot; KRW formatting matches `won()` (`₩` + `toLocaleString("ko-KR")`); `장바구니 담기 · ₩24,000` matches `AddToCartButton.tsx:93`; the non-production strip, cart/checkout/account/order/service-request states, ownership and fail-closed detail are mapped to source in `11`.
4. **Q4 PASS.** No promotion, discount, timer, review, like count, recommendation, KPI, claim, new route, data contract, commerce-behaviour change or deletion plan appears; `11` §Non-parity and `12` §9 keep legacy parallel with no cutover.
5. **Q5 PASS except F3/F4.** 44 px targets, focus ring plus offset, colour-never-alone, reduced motion, 200 % zoom and reading-order rules are stated and the rendered hierarchy is professional; mist/pine, ink/paper and white/pine pairings all clear 4.5:1.
6. **Q6 PASS once F1–F4 close.** `11` maps every route, component, and state; `12` fixes tokens, type, grids and copy sources. The remaining gaps are the four named contradictions, not missing scope.

## Residual limits

- Two representative visuals were commissioned; mobile catalog, cart, checkout, order list/detail and service request are frozen **textually only** — acceptable under `10`, but Worker output for those surfaces must be re-checked against `11`/`12` at implementation review.
- Owned order detail and service-request states were never observed live (no isolated-guest order); their parity derives from source reading, not runtime evidence.
- Names and prices in `13`/`14` are a 2026-07-27 public snapshot; runtime values remain authoritative and volatile.
- Contrast figures above are computed from the declared tokens, not measured from a rendered buffer; text was inspected visually at original size only.
- This is a design-document verdict: no product, runtime, data, browser, provider or economic effect occurred, and no risk was accepted.
