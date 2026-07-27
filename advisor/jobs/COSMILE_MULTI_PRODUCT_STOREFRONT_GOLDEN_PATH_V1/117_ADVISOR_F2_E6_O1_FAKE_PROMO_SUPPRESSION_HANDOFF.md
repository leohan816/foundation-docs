# Advisor handoff — F2 E6 suppress fake shipping promotion in O1 storefront

VERDICT: `PROCEED_WITH_LIMITS` · one truth-presentation correction.

## Evidence and decision

- Product base `40c12947aca718bc76b4b8e34e99e357239b9963`,
  clean/upstream-equal; owned F2 runtime remains live.
- Result `115`/`116`, docs `4121aaf`: catalog/data assertions PASS, but both
  screenshots show the global `ShippingPopup` claiming a one-day shipping
  promotion and `15,000원 → 0원`.
- The frozen mission contract forbids fabricated promotions/discounts in the
  O1 truth surface. This is therefore a blocking presentation defect, not a
  Leo instruction to close the dialog.
- Headless Korean tofu is evidence-environment-only; the 7/7 DOM Korean
  strings were exact. The storefront phone frame is existing storefront
  structure and is not changed here.
- The cleanup `pkill -f` self-match in `115` is recorded as an execution
  deviation. Chromium had already closed and the eventual cleanup/absence
  proof passed; do not repeat the previous catalog gate.

## Exact path and behavior ceiling

Only:

1. `app/scripts/o1_storefront_navigation.vitest.ts`
2. `app/src/app/layout.tsx`

Behavior:

- when the already-derived `o1` boolean is true, do not mount
  `ShippingPopup`;
- when O1 is false, preserve the legacy popup behavior byte-for-byte;
- do not change the popup component, product/catalog/cart/favorite/checkout,
  shell/device frame, navigation, DB, provider, price, stock, economics,
  schema, config, package, or lock.

## Tests first and verification

1. Add one source-contract test in the existing storefront-navigation suite
   proving the layout gates `ShippingPopup` off for O1 while preserving the
   legacy false branch.
2. Run exactly the named test:
   `cd app && ./node_modules/.bin/vitest run -c vitest.config.ts scripts/o1_storefront_navigation.vitest.ts -t "O1 storefront never mounts the fabricated shipping promotion"`
   It must RED meaningfully before source change.
3. Change only `layout.tsx` to make the same exact test GREEN; run the
   identical command once.
4. Let the existing owned dev runtime hot-reload. Do not rebuild, restart, or
   run another readiness/catalog/detail gate. With one clean owner-only
   temporary CDP profile/controller under existing `runtime/f2-promo-check/`,
   make exactly two read-only public navigations (`/`, `/shop`) and prove:
   status 200, `ShippingPopup`/promo overlay absent, exact seven product links
   still present. No clicks, Google, Toss, DB, cart, order, payment, refund,
   or other route. Remove the temporary profile/controller/output after
   evidence; keep the live runtime and existing screenshots/rollback.
5. Verify exact two-path product delta, `git diff --check`, product
   clean/upstream after one non-force commit/push, no DB/provider/economic
   effect.

First RED/implementation/GREEN/hot-reload/browser/cleanup failure is HOLD;
no retry or alternate.

Write only:

- `119_WORKER_F2_E6_O1_FAKE_PROMO_SUPPRESSION_RESULT.md`
- `120_WORKER_F2_E6_O1_FAKE_PROMO_SUPPRESSION_POINTER.md`

Commit/non-force-push product and those docs once on PASS, then STOP for
Advisor.
