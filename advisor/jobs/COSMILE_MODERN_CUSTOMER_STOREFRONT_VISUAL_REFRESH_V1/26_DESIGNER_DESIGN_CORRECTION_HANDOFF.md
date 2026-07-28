# 26 — Designer Design-Correction Handoff

MISSION: `COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1`
ACTOR: existing `foundation-designer`
BOUNDARY: design artifacts only

## Pins

- Docs branch: `advisor/cosmile-modern-customer-storefront-visual-refresh-v1-20260727`
- Review evidence: `21_INDEPENDENT_DESIGN_REVIEW.md`, `22_INDEPENDENT_DESIGN_REVIEW_POINTER.md`
- Advisor disposition: `25_ADVISOR_DESIGN_REVIEW_DISPOSITION.md`
- Product remains read-only at `8d4a3272c6baced193be4f9ed88710c39c90d739`.

## Action

Use the evidence already loaded. Do not read product source or public pages again.

Edit only `11`–`15`, then write `27`/`28`. Close exactly F1–F6 as frozen in `25`:

1. make the hero editorial count-independent and bind every remaining count/sequence/card expression to the admitted runtime array;
2. freeze the accepted 1440 desktop horizontal card geometry and the mobile two-column vertical 4:3 variant without inventing another component;
3. change normal-size persimmon action text to ink;
4. give mobile `AddStatus` one exact purchase-bar slot, focus behavior, and 200% flow behavior, separate from availability state;
5. name the existing mobile `/account` wishlist row/badge as the deliberate entry point;
6. remove the duplicate mobile wishlist control and preserve one state/announcement source.

Render `13` and `14` once each at original size using only the already-approved local Noto CJK/FONTCONFIG environment. Delete temporary render/profile output. No new tool/font/dependency experiment.

## Return

`27_DESIGNER_CORRECTION_RESULT.md` and `28_DESIGNER_CORRECTION_POINTER.md` must report:

- exact changed paths;
- F1–F6 closure mapping;
- render dimensions and categorical legibility/overlap result;
- temp cleanup;
- `git diff --check`;
- `RETURN_TO: foundation-advisor`;
- `STOP` before product implementation.

