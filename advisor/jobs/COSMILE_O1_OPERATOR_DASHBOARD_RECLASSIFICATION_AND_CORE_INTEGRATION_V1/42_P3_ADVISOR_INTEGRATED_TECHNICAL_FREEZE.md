# P3/P4 Advisor Integrated Technical Freeze

MISSION_ID: `COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1`
STATUS: `IMPLEMENTATION_MODULES_ADMITTED_SEQUENTIALLY`
PRODUCT_BASE: `2aeb6e2afba8543af10fdf983b2876b0871d07fa`
DESIGN_REVIEW: `PASS_WITH_CORRECTIONS` at 35; F1/F2 closure `PASS` at 40.
CLAIM_CEILING: `REVIEWED_NON_PRODUCTION_OPERATOR_DASHBOARD_CORE_INTEGRATION`

## Scope freeze

One independent Korean-first `/console` control plane hosts only the reviewed O1 operational truth. `/o1/operator/**`, legacy admin order/write, chat, jobs, and artifact routes remain mounted as transition or deferred evidence; this mission deletes or redirects none of them.

Connected now: O1 order/request queue and detail; payment/full Toss TEST refund truth; reservation/commit/HOLD disposition; record-only shipment/tracking; cancellation/support processing; count-only reconciliation and protected recovery; server-side O1 operator authority and audit truth.

Nonfunctional `DEFERRED` only: price, listing, offers/content, events, marketing/reviews, advanced analytics, AI collaboration, automation, Agent Control Center, Foundation AI, Memory. No route/form/action/save/sample/fake-live value for those domains.

Every module has:

- `SCHEMA_EFFECT: NONE`;
- `NEW_ECONOMIC_AUTHORITY: NONE`;
- production/live/provider/DB migration/PII effects: `NONE`;
- tests-first focused delta verification only;
- exact path ceiling; no opportunistic repair.

## Explicit Advisor decision: root/settings repair

The Founder-authorized single permanent Console requires a truthful default entry point. WU-5 may replace `/console`'s current conversation-creation redirect with a read-only O1 overview and may replace false legacy `/console/settings` capability copy with category-only TEST/authority facts. This does not delete or redirect `/console/c/**`, `/console/jobs`, or artifact evidence. It adds no config mutation and grants no O1 authority from the Console session.

## WorkUnits

### WU-0 — inventory truth projection

Exact paths:

1. `app/src/lib/order/contracts.ts`
2. `app/src/lib/order/repository.ts`
3. `app/src/lib/order/service.ts`
4. `app/scripts/o1_order_lifecycle.vitest.ts`
5. `app/scripts/o1_console_inventory_projection.dbtest.py`

Add only a category-safe operator field:
`inventoryDisposition = reserved | committed_hold | released | unverified`.
Repository truth: all rows reserved → reserved; all committed → committed_hold; all released → released; zero/mixed/expired/unknown → unverified. No quantity/SKU/id/provider data. Read only; no mutation/schema/economic effect.

### WU-1 — single-source action/view contract

Exact paths:

1. `app/src/lib/console/o1ConsoleView.ts`
2. `app/src/components/commerce/O1OperatorPanel.tsx`
3. `app/scripts/o1_console_view.vitest.ts`
4. `app/scripts/o1_operator_request_detail_ui.vitest.ts`

Extract `OperatorRequestMode`, closed terminal vocabulary, `classifyOperatorRequestMode`, and `operatorActionSurface` verbatim into the pure shared module; old/new surfaces import the same exports. Preserve re-exports from `O1OperatorPanel` if required for predecessor compatibility. Add a fail-closed `legacyActionsEnabled` prop, default `true`; new Console passes `false`, which can only remove legacy controls, never grant an action. Add the nine-IA model and Korean closed-state vocabulary in the same pure module. No fetch/route/server authority changes.

### WU-2 — orders/request queue and detail

Exact paths:

1. `app/src/app/console/orders/page.tsx`
2. `app/src/app/console/orders/[orderId]/page.tsx`
3. `app/src/components/console/O1ConsoleQueue.tsx`
4. `app/scripts/o1_console_orders_ui.vitest.ts`

Both pages require the existing Console session and independently re-check `o1RuntimeEnabled` plus Google immutable-subject `o1OperatorForCustomer`. Queue uses `o1OperatorServiceRequestQueue(50)` and shows only opaque orderNo/kind/status/time/HOLD category; internal orderId is link-only, not text. Detail reuses `O1OperatorPanel` with legacy actions disabled. Existing O1 API routes remain the sole action authority.

### WU-3 — fulfillment/inventory triage

Exact paths:

1. `app/src/app/console/fulfillment/page.tsx`
2. `app/src/components/console/O1ConsoleFulfillment.tsx`
3. `app/scripts/o1_console_fulfillment_ui.vitest.ts`

Double-gated server page uses bounded `o1OperatorOrderList(50)`, renders category-only order/fulfillment triage, and links to the shared detail. Inventory truth comes only from WU-0 detail projection. Shipment action remains the existing record-only O1 route; no courier, restoration, purchase, or stock-adjustment action.

### WU-4 — finance/reconciliation

Exact paths:

1. `app/src/app/console/finance/page.tsx`
2. `app/src/components/console/O1ConsoleFinance.tsx`
3. `app/scripts/o1_console_finance_ui.vitest.ts`

Double-gated page renders only `readO1ReconciliationProjection` counts. The one desktop protected action calls existing GET/POST `/api/o1/operator/reconciliation`; it accepts only step-up secret + fresh nonce and exposes only categorical/count results. No payment/provider IDs, amounts, arbitrary limits, or new recovery authority.

### WU-5 — single Console shell, overview, settings

Exact paths:

1. `app/src/app/console/page.tsx`
2. `app/src/app/console/settings/page.tsx`
3. `app/src/app/console/layout.tsx`
4. `app/src/components/console/ConsoleNav.tsx`
5. `app/scripts/o1_console_shell_ui.vitest.ts`

Nine Korean IA rows: five active (`실시간 운영`, `주문·고객 지원`, `재고·구매·출고`, `재무·정합성`, `운영 설정`) and four inert (`카탈로그·상품 운영`, `분석·전략`, `마케팅·리뷰`, `Agent Control Center`). Deferred rows are non-links/`aria-disabled`, with no forms/actions/output. Root and settings double-gate Console session + O1 operator identity. Root is read-only overview; settings is read-only TEST/authority fact. Mobile exposes overview + queue triage only; protected/complex actions remain desktop-first.

## Verification mechanism

Current worktree `app/node_modules` is absent. Product/canonical package and lock SHA-256 are byte-identical (`a4867160…`, `36dfa1a4…`). Per module, Advisor may admit one temporary ignored worktree `app/node_modules` symlink to the unchanged canonical real directory, run only the exact frozen focused command with cache disabled, remove the symlink immediately, and verify no cache/process/DB residue and representative canonical hashes unchanged. No install/generate/copy/target write.

WU-0 additionally runs only the focused named Vitest tests plus its new focused disposable no-host-port PostgreSQL inventory-projection dbtest. All later WUs run only their new named test and directly affected predecessor contract test when explicitly named in the module handoff.

## Final bounded integration gate

After WU-0..5 pass and only then:

1. one Vitest command over the six new focused files plus directly affected predecessor files `o1_order_lifecycle.vitest.ts`, `o1_operator_request_detail_ui.vitest.ts`, `o1_order_service_request_browser.vitest.ts`, and `o1_toss_reconciliation_runtime.vitest.ts`;
2. one non-production `next build` with telemetry disabled and synthetic non-secret closed-loopback placeholders only if config parsing requires them.

Justification: new App Router pages and client/server composition require one real Next compilation; no full repository test suite is run. Build or focused-gate failure returns to the exact owning WorkUnit; no broad repair. Remove `.next`, `tsbuildinfo`, temporary dependency link/cache afterward.

## STOP

STOP before any schema/migration, new API/economic/provider authority, client-derived eligibility, legacy O1 mutation reuse, deferred feature behavior, public/live/production/PII action, broad rewrite, or extra path. Default correction limit 3 per finding class. Each WorkUnit is one additive commit/non-force push and independently revertible.
