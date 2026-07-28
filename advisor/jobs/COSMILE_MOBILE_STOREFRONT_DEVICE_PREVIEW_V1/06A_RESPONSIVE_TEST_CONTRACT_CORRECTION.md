# RESPONSIVE TEST CONTRACT CORRECTION

STATUS: FROZEN_ADDITIVE_CORRECTION
DATE_UTC: 2026-07-28
SUPERSEDES_ONLY:
- the six-product-path ceiling in `06_FOUNDER_STRATEGY_CONTRACT_FREEZE.md`;
- the two-suite command in `07_WORKER_HANDOFF.md`.

Worker correctly stopped before any test or source patch. Direct inspection confirms three existing accepted suites bind O1 customer composition to outer viewport `@media` blocks:

1. `app/scripts/o1_storefront_home_catalog_visual.vitest.ts`
2. `app/scripts/o1_storefront_detail_cart_visual.vitest.ts`
3. `app/scripts/o1_storefront_account_orders_visual.vitest.ts`

Those oracles protect real Home/catalog/card, detail/cart, and account/order responsive composition. Leaving them unchanged while converting source CSS to contained-screen responsiveness would create silent contract drift. Removing them from the gate would weaken evidence.

## Corrected exact ceiling

The original six paths remain, plus exactly the three tests above: total product paths `9`. No tenth path.

Modify only their width-responsive helpers/assertions:

- outer-width `@media (min-width: 640px|1024px|1280px)` expectations for O1 content become named `@container o1-screen (...)` expectations;
- keep the same breakpoints, selectors, values, card composition, cart columns, order-detail columns, and protected risks;
- keep `@media (max-height: 480px)` reflow and `@media (prefers-reduced-motion: reduce)` expectations unchanged;
- no assertion deletion, count reduction, skip, fixture, or source-value weakening.

This is `CONTRACT_DRIFT_FOUND` caused by the explicit Founder/Strategy contained-screen contract, not a product-behavior relaxation.

## Corrected focused command

Run one identical RED and one identical GREEN:

`npx vitest run scripts/o1_storefront_navigation.vitest.ts scripts/o1_storefront_visual_shell.vitest.ts scripts/o1_storefront_home_catalog_visual.vitest.ts scripts/o1_storefront_detail_cart_visual.vitest.ts scripts/o1_storefront_account_orders_visual.vitest.ts --config vitest.config.ts`

All remaining authority and exclusions in 06/07 are unchanged.
