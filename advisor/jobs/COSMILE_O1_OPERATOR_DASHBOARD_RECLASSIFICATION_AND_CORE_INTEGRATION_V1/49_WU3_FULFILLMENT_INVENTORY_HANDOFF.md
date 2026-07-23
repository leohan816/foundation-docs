# WU-3 Fulfillment/Inventory Triage — Worker Handoff

MISSION_ID: `COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1`
WORK_UNIT: `WU-3_FULFILLMENT_INVENTORY_TRIAGE`
ACTOR: existing Cosmile Worker, Claude Opus 4.8/xhigh primary
PRODUCT_BASE: `4bf2baaa23f6bac8313a068e156a880bc3bc14e9`
CLAIM_CEILING: `IMPLEMENTED_NOT_REVIEWED`
DELTA_ONLY_VERIFICATION: `REQUIRED`
SKILL: `/fable-builder`
REFERENCES: `implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`; `implementation-report-template` only at return.

## Advisor path reconciliation

The P3 freeze named three WU-3 paths, but direct post-WU-2 integration inspection proved two frozen requirements had no Console consumer: WU-0 `inventoryDisposition` was returned by the server but not rendered by `O1OperatorPanel`, and WU-2 correctly disabled the legacy dual action surface, which also hid the reviewed record-only shipment action. The two existing-path additions below are the smallest reuse correction. They add no route, eligibility, schema, or economic authority and do not restore legacy refund controls.

## Exact path ceiling

1. `app/src/app/console/fulfillment/page.tsx` (new)
2. `app/src/components/console/O1ConsoleFulfillment.tsx` (new)
3. `app/scripts/o1_console_fulfillment_ui.vitest.ts` (new)
4. `app/src/components/commerce/O1OperatorPanel.tsx`
5. `app/src/app/console/orders/[orderId]/page.tsx`

No sixth path. No schema/migration, API/runtime/auth/refund/reconciliation change, new endpoint, courier/provider integration, sellable-stock restoration, stock adjustment/purchase action, client-derived shipment eligibility, root/nav/settings work, WU-4+, or deferred-feature behavior.

## Frozen page/list boundary

`/console/fulfillment` is a `force-dynamic` server page and uses the same fail-closed order before data:

1. `await requireConsoleUser()`;
2. `o1RuntimeEnabled(process.env)` else `notFound()`;
3. `getShopper()` then `o1OperatorForCustomer(process.env, shopper.userId)`;
4. denied renders `CONSOLE_STATE_VOCAB.denied` and reads zero order rows;
5. verified operator calls only `o1OperatorOrderList(50)`.

`O1ConsoleFulfillment` is a read-only triage list. It shows only opaque orderNo, category-safe order status, and truthful links/copy that inventory and shipment facts are verified on the shared detail. Internal orderId is encoded href/key only, never text/attribute/log. No identity, amount/currency/provider/payment/refund identifier, raw error, free text, button/form/input/fetch, purchase/stock/courier/restoration promise, or fabricated count/KPI.

## Frozen shared-detail repair

1. `O1OperatorPanel` consumes WU-0 `inventoryDisposition` from the existing GET projection and renders only a Korean closed category:
   - `reserved` → `예약 유지`;
   - `committed_hold` → `HOLD · 판매 가능 재고로 복구하지 않음`;
   - `released` → `예약 해제`;
   - missing/malformed/future → `확인할 수 없음`.
   No SKU, quantity, reservation id, or raw status list.
2. Add an optional `shipmentRecordEnabled?: boolean` prop. Existing behavior remains the default. In the Console detail, `legacyActionsEnabled={false}` remains authoritative for the request action surface (legacy still maps to control-free HOLD).
3. The Console detail passes `shipmentRecordEnabled={true}`. Only when request mode is exactly `legacy`, legacy request actions are disabled, and this explicit prop is true may the existing shipment section render separately. It reuses the existing record-only POST logic unchanged. It never renders legacy refund/step-up controls, never infers shipment eligibility, and the existing O1 route remains the sole authority.
4. Refund/support/hold/settled request modes never render the standalone shipment section. Mobile remains triage/read-only; the protected detail actions are desktop-only with a truthful mobile notice.

## Tests first and exact command

First create only `app/scripts/o1_console_fulfillment_ui.vitest.ts`, exact named block:

`WU-3 fulfillment inventory triage and record-only action`

Prove:

- page double-gate order and `o1OperatorOrderList(50)` after verified operator only;
- read-only triage projection, orderId link/key only, no prohibited fields/actions/features;
- inventory labels map the four closed outcomes and fail malformed/future to unavailable;
- detail passes both `legacyActionsEnabled={false}` and `shipmentRecordEnabled={true}`;
- `operatorActionSurface("legacy", false)` remains HOLD/control 0;
- standalone shipment appears only for exact legacy + disabled legacy actions + explicit shipment prop, while refund/step-up remains absent;
- existing shipment helper/route/body and record-only/no-courier/no-restoration copy are reused, with no alternative API or eligibility rule;
- mobile exposes triage/read-only only and desktop owns the protected detail action.

Run only:

```bash
./node_modules/.bin/vitest run scripts/o1_console_fulfillment_ui.vitest.ts -t 'WU-3 fulfillment inventory triage and record-only action' --config vitest.config.ts --reporter=verbose --cache=false
```

Require meaningful RED, then identical GREEN with exact exit status. Do not weaken/delete assertions. No full file/suite, predecessor test, build, typecheck, lint, generate, install, DB, app/browser, provider, or economic command.

## Dependency, cleanup, Git, return

Use the mission-authorized temporary canonical dependency symlink only after package/lock/absence checks. Cache disabled; remove immediately; canonical representative hashes unchanged; zero symlink/cache/process residue.

One additive truthful commit, non-force push, clean/upstream-equal. Write only uncommitted result `50_WU3_FULFILLMENT_INVENTORY_RESULT.md`, return to Advisor, STOP before WU-4.

STOP if a sixth path, new eligibility source, route/API change, concurrent request+shipment action, schema/economic/provider behavior, or inability to keep mobile action-free is required. One bounded no-delta Claude attempt returns `EXECUTION_NONCONVERGENCE`; Advisor alone may route the exact frozen WorkUnit to the preserved Codex fallback with explicit per-command absolute workdir.
