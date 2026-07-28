# ADVISOR CORRECTION — FONT-BOUND CAPTURE ONLY

STATUS: **ONE CORRECTED EVIDENCE ATTEMPT AUTHORIZED**
MISSION_ID: COSMILE_MOBILE_STOREFRONT_DEVICE_PREVIEW_V1

Direct read-only evidence found the already-installed Playwright local runtime
contains `NotoSansCJK-Regular.ttc`, `NotoSansCJK-Bold.ttc`, and matching serif
faces. No install, download, dependency, product CSS, or source change is
needed.

Authorize exactly one repeat of browser freeze 10 with these differences only:

1. Use an owner-only mission-local `FONTCONFIG_FILE` that references only those
   existing local Noto CJK faces plus system DejaVu fallback.
2. Prove `fc-match "Noto Sans CJK KR"` resolves inside that existing local Noto
   directory before runtime start.
3. Reuse the same product commit, one loopback runtime start, same Chromium,
   same routes/assertions and same two viewport sizes.
4. Preserve the first failed evidence; write corrected PNGs/JSON to the
   original non-HOLD names.
5. Advisor must inspect both corrected PNGs at original size. Any remaining
   missing glyph, overlap, clipping, double frame, or unreadable navigation is
   final HOLD.
6. Perform the same exact runtime/generated-artifact cleanup. Public 3000 stays
   unchanged.

This is capture-environment correction only and changes no product acceptance
contract.
