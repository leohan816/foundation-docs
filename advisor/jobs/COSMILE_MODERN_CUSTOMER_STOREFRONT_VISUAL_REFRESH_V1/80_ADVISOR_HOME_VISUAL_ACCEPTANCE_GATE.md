# 80 — Advisor Home Visual-Acceptance Gate

MISSION: `COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1`
VERDICT: `PASS_TO_INDEPENDENT_REVIEW`
PRODUCT_BASE: `3f4f368cc24567455223c5e6c63adf8ef87269e1`
PRODUCT_CANDIDATE: `cb1e2c6e944d4cbc8e51491316e3b3a52fe32c9a`

## Containment

- Exact candidate delta: `page.tsx`, `globals.css`, and the focused home visual
  contract test only.
- `806e951`: 13/13 focused GREEN for editorial lead and non-overlap.
- `cb1e2c6`: meaningful RED then 13/13 focused GREEN for Wishlist/Cart
  visual-versus-DOM order.
- Product branch is clean, pushed, and upstream-equal. No component, backend,
  route, data, auth, schema, DB, provider, economic, or public-runtime change.

## Local browser evidence

Owner-only isolated runtime `127.0.0.1:31082`, CJK font environment, one-shot
OFF, local substitute absent:

- PASS: desktop/mobile cards 7/7; unique detail routes 7; pages checked 11;
  browser errors 0; device frames 0; horizontal overflow false.
- Desktop lead computed two columns `653.328px 466.672px`; mobile lead one
  column `326px`; ledger count/tiles both derive to 7 and have no controls.
- Card actions overlap count 0; all 7 desktop cards place Wishlist left of the
  flexible Cart action; DOM order agrees.
- Original-size images:
  `/home/leo/Project/.mission-tmp/COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1/runtime/local-desktop-home-1440x900.png`
  and
  `/home/leo/Project/.mission-tmp/COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1/runtime/local-mobile-home-390x844.png`.
- First browser run exposed an evidence-oracle defect: it incorrectly required
  equal child Y coordinates despite accepted `align-items:center`. The
  corrected oracle proves computed two-column layout plus left/right placement;
  no product change was made for that failure.

The isolated runtime/process group and candidate `.next` were removed from the
worktree after capture. Public port 3000 remains the preserved predecessor.
