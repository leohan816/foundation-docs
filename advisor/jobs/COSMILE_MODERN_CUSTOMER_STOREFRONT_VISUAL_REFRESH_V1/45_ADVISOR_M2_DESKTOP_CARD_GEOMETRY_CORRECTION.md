# 45 — Advisor M2 Desktop Card Geometry Correction

MISSION: `COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1`
BASE: `3674ea01f4ca32118e32fcf85360032e89d4255b`
CLASS: `NORMAL_BOUNDED_UI`

## Finding

The accepted desktop card is approximately `312×194` with a `112×170` media
rail and content/actions beside it. Candidate `3674ea0` makes the link a 170px
row, then stacks the 44px actions below it inside a padded column. Its minimum
height is therefore about 242px. The test asserted the rail dimensions but not
the containing composition, so its GREEN did not prove the reviewed geometry.

## Exact two-path ceiling

1. `app/scripts/o1_storefront_home_catalog_visual.vitest.ts`
2. `app/src/app/globals.css`

## Correction

1. Tests first: strengthen only the `>=1280` card oracle to require one
   `194px` card grid, `112px + content` columns, the detail link spanning that
   grid, media in column 1 across both rows, and sibling actions in content
   column row 2. Preserve all existing truth, target, responsive, and
   accessibility assertions.
2. Run the same four-file M2 command from correction `44` as RED once.
3. CSS only: at `>=1280`, place media, identity/price, and sibling actions in the
   accepted grid. The actions must remain outside the Link in DOM and above it
   for pointer/focus interaction. Mobile/tablet composition remains unchanged.
4. Run the identical command once as GREEN.
5. On PASS: diff check, exact two-path containment, no generated Prisma client,
   commit without co-author trailer, non-force push, compact return, STOP.
6. First failure returns unchanged. No build, typecheck, runtime, browser, DB,
   provider, economic action, M3, or additional path.
