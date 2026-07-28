# 51 — Advisor M4 RED Oracle Correction

MISSION: `COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1`
MODULE: `M4_ACCOUNT_ORDER_HISTORY_DETAIL_REQUEST_PRESENTATION`
BASE: product `a9f72d5d71554f725655585b2be0d5b48bcae9e6`
STATE: preserve the exact three test-path delta from handoff 50

The first RED stopped before product implementation because an existing
`o1_order_service_request_browser.vitest.ts` assertion simultaneously requires
`role="alert"` and forbids the bare token `alert`. The latter matches the
required ARIA role and is not a valid browser-call discriminator.

Authorize exactly one oracle correction in existing path 8:

- preserve the prohibitions for `window.confirm`, `window.open`, `dialog`, and
  `modal`;
- replace only the bare `alert` alternative with a call-shaped
  `alert\s*\(` (or stricter equivalent), so a browser `alert(...)` remains
  prohibited while `role="alert"` remains required.

Then rerun the identical five-file RED command once. A meaningful M4 RED may
proceed to the frozen paths 1–6 implementation and the one identical GREEN.
Any other pre-implementation contradiction or first GREEN failure returns HOLD
without another diagnostic. All handoff 50 path, behavior, and effect ceilings
remain unchanged.
