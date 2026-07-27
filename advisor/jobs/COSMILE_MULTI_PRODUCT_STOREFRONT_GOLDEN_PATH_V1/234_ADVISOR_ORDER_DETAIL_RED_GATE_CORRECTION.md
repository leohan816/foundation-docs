# 234 — Advisor order-detail RED gate correction

- Mission: `COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1`
- Product base: `52343f5c6633558ac6ec489b201e5d7746762ab5`
- Governing freezes: `230` + additive `232`
- Disposition: `PROCEED_WITH_TEST_HARNESS_CORRECTION`

## Preserved RED

The exact focused command exited `1` with `16 failed / 83 passed`.

- `12` failures are the meaningful new RED for line cards, durable option,
  honest image absence, and durable `createdAt` rendered in explicit KST.
- `3` pre-existing route tests call the canonical console authorization path
  without mocking `@/lib/operator/authorize`, so Next `cookies()` fails outside
  request scope before the asserted route behavior.
- `1` pre-existing lifecycle oracle forbids the seeded SKU while the accepted
  operator projection and a sibling assertion require that same bounded SKU
  field. It still correctly forbids inventory, payment, customer, and internal
  identifiers.

The four pre-existing failures are test-harness/oracle defects, not product
failures and not evidence against the twelve meaningful RED cases.

## Exact correction

Before source implementation, change only the two already-authorized test
paths:

1. In `app/scripts/o1_operator_request_detail_ui.vitest.ts`, mock only
   `@/lib/operator/authorize` for the three existing route cases so they test
   their original disabled/denied/error contracts without invoking Next
   request-scope cookies.
2. In `app/scripts/o1_order_lifecycle.vitest.ts`, remove only the contradictory
   assertion that the accepted projected SKU value is secret. Preserve every
   assertion excluding raw inventory fields, customer/payment/capture/internal
   identifiers, and preserve the new option/time fail-closed assertions.

Then implement the four source paths exactly as mapped by `230` + `232` and run
the identical focused command once as GREEN:

`cd app && ./node_modules/.bin/vitest run -c vitest.config.ts scripts/o1_order_lifecycle.vitest.ts scripts/o1_operator_request_detail_ui.vitest.ts`

No seventh path, extra command, build, typecheck, DB, runtime, browser,
provider, refund, or economic action. The correction must not weaken any of the
twelve meaningful RED assertions.

## Return

On GREEN, commit and non-force push the six-path product delta, then write only:

- `236_WORKER_ORDER_DETAIL_LINE_PRESENTATION_RESULT.md`
- `237_WORKER_ORDER_DETAIL_LINE_PRESENTATION_POINTER.md`

Leave those result files uncommitted for Advisor audit and STOP.
