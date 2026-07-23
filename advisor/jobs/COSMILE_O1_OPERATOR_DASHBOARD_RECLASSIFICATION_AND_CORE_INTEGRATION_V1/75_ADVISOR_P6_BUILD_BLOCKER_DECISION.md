# Advisor P6 Build Blocker Decision

MISSION_ID: `COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1`
PRODUCT_HEAD: `b627c4fcf37f476932cbcf9ee2adb7e516fa8c9c` clean/upstream-equal
ADVISOR_VERDICT: `NEEDS_DECISION`
CLAIM: `IMPLEMENTED_NOT_REVIEWED`

## Evidence

- Frozen P6 Vitest: `9/9` files, `147/147` tests PASS.
- Frozen Next 16.2.9 non-production `--webpack` build: exit `1`; cleanup PASS.
- Blocking error: `app/src/app/account/orders/page.tsx` exports `deriveO1OrderServiceRequestBadge`, which is not an allowed Next page export.
- Material warning: `app/src/app/console/finance/page.tsx` imports `readO1ReconciliationProjection` from `o1CommerceRuntime`; its canonical export is `o1ReliabilityRuntime`.
- Product/build artifacts/dependency residue: none. No DB/provider/economic/live effect. Independent review not dispatched because candidate build admission failed.

## Smallest bounded correction proposal

Exact five-path ceiling:

1. new pure `app/src/lib/order/o1OrderServiceRequestBadge.ts`;
2. `app/src/app/account/orders/page.tsx`;
3. `app/scripts/o1_order_service_request_browser.vitest.ts`;
4. `app/src/app/console/finance/page.tsx`;
5. `app/scripts/o1_console_finance_ui.vitest.ts`.

Move the existing badge helper byte-for-byte into the non-route pure module; import it from the page and focused predecessor test. Correct only the reconciliation projection import to `o1ReliabilityRuntime` and add the exact import-source assertion to its existing focused test. No behavior, schema, UI, authority, provider, or economic change.

Verification: tests-first exact two named focused tests, then one final frozen P6 Vitest/build re-gate. No other command. Use the existing Claude Worker; keep Codex idle. This would exceed the already-used bounded correction allowance, so no dispatch occurs without Leo approval. Final Fable 5/max review remains blocked until P6 passes.
