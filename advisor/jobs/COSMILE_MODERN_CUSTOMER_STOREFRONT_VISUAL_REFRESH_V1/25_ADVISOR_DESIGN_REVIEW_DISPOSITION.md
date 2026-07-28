# 25 — Advisor Design Review Disposition

MISSION: `COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1`

## Decision

- Accept independent review `21`/`22`: `NEEDS_PATCH`, blocking `4`, non-blocking `2`, product/runtime effect `0`.
- Direction remains admitted. Product write stays paused.
- Route one bounded Designer artifact correction, then the same independent Reviewer performs a focused delta re-review.

## Exact correction ceiling

Existing files that may change:

1. `11_DESIGNER_AS_BUILT_PARITY_MATRIX.md`
2. `12_DESIGNER_VISUAL_CONTRACT.md`
3. `13_DESIGNER_DESKTOP_1440x900.svg`
4. `14_DESIGNER_MOBILE_390x844.svg`
5. `15_DESIGNER_RESULT.md`

New result files:

6. `27_DESIGNER_CORRECTION_RESULT.md`
7. `28_DESIGNER_CORRECTION_POINTER.md`

No product, source, runtime, DB, provider, browser-to-app, font installation, or session mutation is admitted.

## Frozen disposition

- **F1:** replace count-bound Korean editorial copy with count-independent copy. Every remaining numeric count, sequence mark, and rendered card/tile count derives from the admitted runtime array; the current SVG may truthfully show the current seven-item snapshot but may not reserve or fabricate item eight.
- **F2:** keep the accepted desktop composition and remove ambiguity: desktop `CatalogCard` is a 312×194 horizontal card at the 1440 reference, radius 16, with 112×170 portrait pending-media region. The mobile two-column variant is vertical with an exact 4:3 media region. Both are responsive variants of the same semantic card and the contract must name the breakpoint behavior.
- **F3:** use ink `#18211D` on persimmon `#F15A35` for normal-size action labels in both visuals and contract. Do not retain small white-on-persimmon text.
- **F4:** distinguish `AvailabilityStatus` from `AddStatus`. On mobile, `AddStatus` is the `aria-live` result directly below the cart action inside the purchase bar. Focus remains on the originating action; the result link is next in tab order. At 200% text zoom, the purchase bar becomes normal flow after product facts and cannot cover either status.
- **F5:** explicitly record that mobile wishlist remains reachable through the existing `/account` “찜한 상품” row and live badge; there is no new mobile tab or route.
- **F6:** retain one mobile wishlist toggle only, backed by the existing single wishlist state/announcement source. Remove the duplicate visual control.

## Acceptance

- Corrected desktop and mobile SVGs render once each at original size using the already-recorded local Noto CJK/FONTCONFIG environment.
- Korean is legible; no tofu, clipping, overlap, fabricated product, or new route.
- Temporary PNG/profile artifacts are deleted.
- `git diff --check` passes and only the seven paths above differ.

