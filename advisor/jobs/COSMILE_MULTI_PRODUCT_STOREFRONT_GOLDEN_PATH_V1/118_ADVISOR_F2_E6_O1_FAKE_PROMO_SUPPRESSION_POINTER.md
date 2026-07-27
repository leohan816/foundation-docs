# F2 E6 O1 fake-promo suppression — pointer

- Handoff:
  `advisor/jobs/COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1/117_ADVISOR_F2_E6_O1_FAKE_PROMO_SUPPRESSION_HANDOFF.md`
- Base: product `40c12947aca718bc76b4b8e34e99e357239b9963`;
  docs `4121aaf`.
- Ceiling: `app/src/app/layout.tsx` plus
  `app/scripts/o1_storefront_navigation.vitest.ts`.
- Outcome: O1 does not mount the fabricated shipping promotion; legacy
  O1-off behavior unchanged.
- Gate: one named RED, one identical GREEN, two read-only public navigations;
  no build/restart/DB/provider/economic action.
