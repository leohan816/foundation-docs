# 52 — Advisor M4 First-GREEN Oracle Correction

MISSION: `COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1`
MODULE: `M4_ACCOUNT_ORDER_HISTORY_DETAIL_REQUEST_PRESENTATION`
BASE: product `a9f72d5d71554f725655585b2be0d5b48bcae9e6`
STATE: preserve the current eight changed paths inside handoff 50

Preserved meaningful RED: 6 failed / 34 passed (40), exit 1.
First GREEN stopped on the new path-9 test's bare forbidden token `carrier:`.
That token matches the pre-existing reviewed projection type
`tracking.carrier` and therefore contradicts the frozen requirement to preserve
truthful shipment/tracking data.

Authorize exactly one path-9 oracle correction:

- remove only `carrier:` from the generic forbidden-token array;
- explicitly require the existing `view.tracking.carrier` projection binding
  and its existing honest missing-carrier fallback;
- retain all identifier, provider, inferred-status, ETA, PII, query, action, and
  mutation prohibitions unchanged.

No source change is authorized by this correction. Run the identical five-file
GREEN once. On PASS perform the handoff-50 containment checks, commit without a
co-author trailer, non-force push, compact return, STOP. On failure HOLD without
another diagnostic, build, typecheck, runtime, browser, DB, provider, economic
action, or M5 work.
