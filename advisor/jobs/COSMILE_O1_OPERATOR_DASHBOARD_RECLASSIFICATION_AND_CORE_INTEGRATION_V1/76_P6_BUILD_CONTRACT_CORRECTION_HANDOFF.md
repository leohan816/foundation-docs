# P6 Build Contract Correction — Worker Handoff

MISSION_ID: `COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1`
WORK_UNIT: `P6_BUILD_CONTRACT_CORRECTION`
ACTOR: existing Cosmile Worker, Claude Opus 4.8/xhigh; Codex idle
PRODUCT_BASE: `b627c4fcf37f476932cbcf9ee2adb7e516fa8c9c`
DELTA_ONLY_VERIFICATION: `REQUIRED`
SKILL: `/fable-builder`
REFERENCES: `implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`; `implementation-report-template` only at return.

Leo approved one additional bounded correction. No further correction is authorized.

## Exact five-path ceiling

1. new `app/src/lib/order/o1OrderServiceRequestBadge.ts`
2. `app/src/app/account/orders/page.tsx`
3. `app/scripts/o1_order_service_request_browser.vitest.ts`
4. `app/src/app/console/finance/page.tsx`
5. `app/scripts/o1_console_finance_ui.vitest.ts`

## Tests first

In the existing named M2D source test, require the page to import `deriveO1OrderServiceRequestBadge` from `@/lib/order/o1OrderServiceRequestBadge` and forbid exporting that function from `page.tsx`. In the existing named finance gate test, require `o1OperatorForCustomer` from `o1CommerceRuntime`, require `readO1ReconciliationProjection` from `o1ReliabilityRuntime`, and forbid binding the projection reader to `o1CommerceRuntime`.

Using the mission-authorized temporary dependency symlink and `--cache=false`, run exactly this command for RED, then the identical command for GREEN:

```bash
./node_modules/.bin/vitest run \
  scripts/o1_order_service_request_browser.vitest.ts \
  scripts/o1_console_finance_ui.vitest.ts \
  --config vitest.config.ts --reporter=verbose --cache=false \
  -t 'M2D source reads only optional kind/status, renders text only, and preserves history contracts|fails closed through the server gates before exactly one projection read'
```

RED must fail only on the newly frozen import/export assertions. Preserve it.

## Exact implementation

- Move `deriveO1OrderServiceRequestBadge` byte-for-byte from `page.tsx` into the new pure non-route module; add only the page import and update the test's direct import. No copy or behavior change.
- In the finance page, keep `o1OperatorForCustomer` imported from `o1CommerceRuntime` and move only `readO1ReconciliationProjection` to an import from `o1ReliabilityRuntime`.
- No UI, state, schema, authority, provider, economic, runtime behavior, or other code change.

After identical GREEN, remove the temporary symlink and prove canonical hashes unchanged, exact five-path containment, no residue, and no prohibited effect. One additive truthful-attribution commit, non-force push, clean/upstream-equal. Do not run P6, build, another test, typecheck, lint, install, generate, DB, provider, runtime, or browser. Write only result `77_P6_BUILD_CONTRACT_CORRECTION_RESULT.md`, return to Advisor, and STOP.
