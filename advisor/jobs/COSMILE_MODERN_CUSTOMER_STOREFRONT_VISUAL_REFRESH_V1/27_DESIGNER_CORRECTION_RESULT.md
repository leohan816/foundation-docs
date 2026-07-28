# Designer Correction Result

MISSION: `COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1`  
ACTOR: `foundation-designer`  
STATUS: `F1–F6 CLOSED / DESIGN ARTIFACTS ONLY`

## Exact changed paths

1. `11_DESIGNER_AS_BUILT_PARITY_MATRIX.md`
2. `12_DESIGNER_VISUAL_CONTRACT.md`
3. `13_DESIGNER_DESKTOP_1440x900.svg`
4. `14_DESIGNER_MOBILE_390x844.svg`
5. `15_DESIGNER_RESULT.md`
6. `27_DESIGNER_CORRECTION_RESULT.md`
7. `28_DESIGNER_CORRECTION_POINTER.md`

## F1–F6 closure

- **F1 — runtime-bound collection:** Hero editorial copy is count-independent. Remaining catalog count, repeated collection marks, card item, sequence, name, and price expressions are explicitly bound to `catalog`, mapped index, or item fields. Mobile detail no longer presents a static catalog sequence.
- **F2 — one frozen card primitive:** The contract freezes the accepted desktop horizontal `112×170` media-rail geometry and the mobile two-column vertical 4:3 media variant as responsive forms of the same `CatalogCard`; no additional component was introduced.
- **F3 — persimmon action contrast:** All normal-size persimmon Cart action labels in the candidates now use `ink #18211D`.
- **F4 — exact mobile AddStatus contract:** Availability has its own row. One `mobile-add-status-slot` sits directly below the Cart action, errors return focus to that action, and 200% text moves the purchase bar and slot into normal flow.
- **F5 — deliberate mobile Wishlist entry:** The existing `/account` Wishlist row and runtime badge are named as the mobile entry point; no sixth bottom tab or new route was added.
- **F6 — one Wishlist source:** The duplicate Wishlist control was removed from the mobile purchase bar. The single identity-level control owns pressed state, rollback, and announcement.

## Render verification

- `13_DESIGNER_DESKTOP_1440x900.svg`: captured at exactly `1440×900`.
- `14_DESIGNER_MOBILE_390x844.svg`: captured at exactly `390×844`.
- Environment: approved local Noto CJK via exact `FONTCONFIG_SYSROOT`, `FONTCONFIG_FILE`, and `FONTCONFIG_PATH` mission settings.
- Original-size categorical result: Korean `LEGIBLE`; clipping `NONE`; overlap `NONE` on both artifacts.
- Temporary PNGs, failed empty render state, and browser profiles: `DELETED`.

## Validation

- SVG XML and exact dimensions: `PASS`.
- `git diff --check`: `PASS`.
- Product/runtime/data/browser state: `UNCHANGED`.

## Routing

`RETURN_TO: foundation-advisor`  
`STOP: before product implementation`
