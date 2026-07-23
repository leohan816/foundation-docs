# P1 Cosmile Technical Census — Result

MISSION_ID: `COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1`
PHASE: `P1_READ_ONLY_CENSUS` · ACTOR: Cosmile Worker (Opus 4.8/xhigh) · SKILL `/fable-builder` (contract-to-code-mapping, implementation-report-template)
PRODUCT worktree: `.worktrees/Cosmile/COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1` · branch `implementation/cosmile-o1-operator-dashboard-core-v1-20260723` @ `1e2475a`
Evidence paths below are relative to `app/`. Read-only; no product/DB/test/build/runtime/provider/git action. PRODUCT_WRITE: none.

## Headline

Two operator/admin surfaces sit over ONE `Order` table: (A) the **legacy console admin** (`/console/admin` + `AdminControls` → `api/admin/*`, session `owner|admin` guard + `writeAdminAudit`, NO step-up/nonce) and (B) the **reviewed O1 operator lane** (`/o1/operator` + `O1OperatorPanel` → `api/o1/operator/*`, `o1RuntimeEnabled` flag + `o1OperatorForCustomer` immutable-subject allowlist + step-up/nonce/idempotency/in-txn audit). The O1 money truth is **not bypassable** by legacy admin: `api/admin/orders/[orderId]/status` refuses any O1-owned order via `decideLegacyAdminStatusMutation` BEFORE writing (status/route.ts:28-30). The collisions are duplicate order list/detail + a legacy order-status control now owned by the O1 lifecycle. Legacy catalog/marketing admin (sku/coupon/promotion/listing/offer/content) is CONNECTED+audited and orthogonal. Several console screens are MOCK-but-look-live.

## Counts

- By classification: CONNECTED 22 · PARTIAL 4 · MOCK 4 · DUPLICATE 5 · RETIRE_CANDIDATE 4 · DEFERRED 1 · UNVERIFIED 0.
- By kind: pages 13 · components 6 · APIs/route-actions ~26 · runtime/lib read-models & repos (reused) 6 groups · schema 0 change.

## Collisions / duplicate actions

1. Order **list+detail**: `/console/admin`+`api/admin/orders`,`/[orderId]` (console/admin/page.tsx:26; AdminControls) DUPLICATES `/o1/operator`+`api/o1/operator/orders`,`/[orderId]` (o1/operator/page.tsx:32; route.ts:15).
2. Order **status mutation**: `AdminControls`→`api/admin/orders/[orderId]/status` (AdminControls.tsx:15) vs the O1 refund/paid-cancel/shipment lifecycle — same target, isolation-gated (no double-write, two UIs).
3. **Audit** doubled: legacy `writeAdminAudit`→`ConsoleAuditLog` (adminWrite.ts:23) vs O1 in-transaction `ConsoleAuditLog` (serviceRequestRepository/repository) — same table, two writers.
4. **Refund/recovery**: O1-only (no legacy equivalent) → no collision, O1 owns.
5. **Reconciliation view**: O1-only (`api/o1/operator/reconciliation`) — console has no equivalent.

## High-risk economic-mutation authority (preserve vs bypass)

- Refund (full): O1 lane preserves allowlist+step-up(twice, one grant/two instances)+single-use nonce+idempotencyKey+in-txn audit; M4B composition gates the request lifecycle around the unchanged lane and M4B-R1 re-verifies step-up on the zero-provider restart. **PRESERVED** (api/o1/operator/…/refund/route.ts).
- Recovery task action: allowlist + step-up + nonce (reconciliation/route.ts:70-72). **PRESERVED**.
- Shipment (record-only) / support-ack: operator-gated, non-economic. **PRESERVED**.
- Legacy order-status: **refuses O1-owned orders** (lane isolation, status/route.ts:28) → O1 truth not bypassable; genuine-legacy (non-O1) orders remain mutable by session `owner|admin` only, transition-table + audit, **no step-up** (acceptable for legacy). ⚠ residual: legacy path relies on `isO1OwnedOrder` (namespace `^O1-[0-9A-F]{20}$` OR ≥1 PaymentIntent, fail-closed).
- Legacy sku `basePrice`/status: economic-catalog, audited; order price is snapshotted at order time so in-flight orders unaffected. Medium.

## MOCK-but-looks-live

`/console/commerce` (mock 매출/sales/alerts, commerce/page.tsx:97,148,194) · `/console/traffic` (no CommerceEvent source collected, traffic:36) · `ConsoleWorkspace`/`/console/jobs` execute·publish (v0 mock, ConsoleWorkspace.tsx:291,297; jobs:30) · `/console/settings` (static ROLES/FUTURE/DOCS; "Real Payment: mock order", settings:16).

## Safe-to-reuse (O1-connected seams — verified CONNECTED)

Read models/actions: `o1CommerceRuntime.ts` → `o1OperatorServiceRequestQueue`, `o1OperatorServiceRequestDetail`, `o1ProcessPaidCancellationRefund`/`o1RefundOrder`, `o1RecordShipment`, `o1AcknowledgeShippedSupportRequest`, `o1OperatorForCustomer`, `mint/consumeO1StepUpNonce`, `makeO1RefundVerifiers`; `o1ReliabilityRuntime.readO1ReconciliationProjection`; `O1OperatorPanel` classifier+action surface. Contracts/repos: `lib/order/{serviceRequestContracts,serviceRequestService,serviceRequestRepository,service,repository,stepUp,contracts}`, `lib/{payment,inventory}`, `lib/auth/o1Operator`, `lib/runtime/o1LegacyLaneIsolation` (isolation contract to gate ANY new admin surface). Guard/audit to reuse for legacy-catalog: `console/adminWrite.ts` (requireConsoleAdminWrite + writeAdminAudit).

## Schema disposition

`NONE_EXPECTED` — all needed models already present in `prisma/schema.prisma` (Order, OrderServiceRequest, ReconciliationTask, PaymentIntent/PaymentTransaction, Refund, InventoryReservation, ShipmentRecord, CommerceSku/Offer/Promotion/Coupon/GroupBuy/ContentBlock, ConsoleAuditLog, CommerceEvent). No direct evidence of a required schema change surfaced by the census.

## Minimum technical seams for the frozen O1-connected categories (no product write proposed)

Operator dashboard composes O1 runtime read-models (queue/detail/recon projections) + O1 economic actions (refund/paid-cancel/shipment/support) behind `o1OperatorForCustomer` allowlist + step-up/nonce, reusing `O1OperatorPanel` mode classifier; legacy catalog/marketing admin (sku/coupon/promotion/listing/offer/content) stays as-is (source_owner Cosmile commerce admin); legacy order-status control for O1 orders is already isolation-refused (retire its O1 code path/UI); seed + intelligence are retire targets; console AI-console (chat/jobs) is a separate concern (keep, its execute/publish is DEFERRED v0).

## Matrix

`surface_id | UI/API/path | current_data_source | source_owner | auth/action_authority | economic_effect | classification | evidence_path:line | reusable_contract | target_category | risk`

- o1_op_dashboard | UI /o1/operator/page.tsx | o1OperatorServiceRequestQueue+recon proj | O1 runtime | flag+allowlist | none(read) | CONNECTED | app/o1/operator/page.tsx:5,32,34 | o1OperatorServiceRequestQueue | O1-keep | low
- o1_op_detail_page | UI /o1/operator/orders/[orderId] | O1 detail via panel | O1 runtime | flag+allowlist | none(read) | CONNECTED | app/o1/operator/orders/[orderId]/page.tsx:5,30 | O1OperatorPanel | O1-keep | low
- o1_op_panel | Component O1OperatorPanel | GET detail + POST support/refund | O1 runtime | flag+allowlist+step-up(refund) | refund(indirect) | CONNECTED | src/components/commerce/O1OperatorPanel.tsx | classifyOperatorRequestMode | O1-keep | low
- o1_op_queue_api | API GET api/o1/operator/orders | o1OperatorServiceRequestQueue | O1 runtime | flag+allowlist | none | CONNECTED | src/app/api/o1/operator/orders/route.ts:6,13,15 | queue port | O1-keep | low
- o1_op_detail_api | API GET api/o1/operator/orders/[orderId] | o1OperatorServiceRequestDetail+nonce | O1 runtime | flag+allowlist | mint nonce | CONNECTED | src/app/api/o1/operator/orders/[orderId]/route.ts | detail port | O1-keep | low
- o1_op_refund_api | API POST …/[orderId]/refund | o1ProcessPaidCancellationRefund→o1RefundOrder | O1 runtime | flag+allowlist+step-up×2+nonce | FULL REFUND | CONNECTED | src/app/api/o1/operator/orders/[orderId]/refund/route.ts | paid-cancel composition | O1-keep | HIGH(preserved)
- o1_op_shipment_api | API POST …/[orderId]/shipment | o1RecordShipment(advanceFulfillment) | O1 runtime | flag+allowlist | record-only | CONNECTED | src/app/api/o1/operator/orders/[orderId]/shipment/route.ts | advanceFulfillment | O1-keep | med
- o1_op_support_api | API POST …/[orderId]/support | o1AcknowledgeShippedSupportRequest | O1 runtime | flag+allowlist | none | CONNECTED | src/app/api/o1/operator/orders/[orderId]/support/route.ts | processing port | O1-keep | low
- o1_op_recon_api | API GET/POST api/o1/operator/reconciliation | readO1ReconciliationProjection + recovery | O1 runtime | flag+allowlist+step-up+nonce(POST) | recovery mutation | CONNECTED | src/app/api/o1/operator/reconciliation/route.ts:10,70 | reliability runtime | O1-keep | HIGH(preserved)
- console_admin_dash | UI /console/admin | prisma order/sku/offer/audit/groupBuy/promotion/contentBlock | Cosmile console | requireConsoleUser | none(read) | DUPLICATE | src/app/console/admin/page.tsx:26-32 | — | reclassify vs O1 | med
- console_admin_controls | Component AdminControls | fetch api/admin/orders-status,skus,offers | Cosmile console | session owner/admin | order-status/price | DUPLICATE | src/components/console/AdminControls.tsx:15,48,68 | adminWrite | order→O1-owned;catalog-keep | HIGH
- admin_order_status_api | API PATCH api/admin/orders/[orderId]/status | prisma.order.update | Cosmile console | owner/admin + lane-isolation | order status | DUPLICATE | src/app/api/admin/orders/[orderId]/status/route.ts:28,35,36 | decideLegacyAdminStatusMutation | retire O1 path | HIGH(isolated)
- admin_orders_api | API api/admin/orders,[orderId] | prisma.order.findMany | Cosmile console | owner/admin | none(read) | DUPLICATE | src/app/api/admin/orders/route.ts:3 | — | reclassify vs O1 | med
- admin_catalog_api | API skus/coupons/promotions/group-buys/listings/offers/content-blocks | prisma CRUD + audit | Cosmile console | owner/admin + writeAdminAudit | catalog price/status | CONNECTED | src/lib/console/adminWrite.ts:5,12; api/admin/skus/[skuId]/route.ts:27 | writeAdminAudit | catalog-keep | med
- admin_ops_v2 | Component AdminOpsV2 | fetch api/admin/content-blocks,listings,audit | Cosmile console | owner/admin | content/catalog | CONNECTED | src/components/console/AdminOpsV2.tsx:20,69,107 | — | catalog-keep | low
- admin_audit_api | API GET api/admin/audit/[id] | prisma consoleAuditLog + rollback(TODO) | Cosmile console | owner/admin | rollback blocked | PARTIAL | src/lib/console/adminWrite.ts:52-59 | rollbackRisk | keep(read) | med
- admin_seed_api | API seed-skus/seed-coupons | prisma seed | Cosmile console | env≠prod OR owner/admin | seed writes | RETIRE_CANDIDATE | src/app/api/admin/seed-skus/route.ts:8-13 | — | retire(prod) | med
- admin_intelligence | UI /admin/intelligence | (deprecated redirect) | Cosmile console | requireConsoleUser→redirect | none | RETIRE_CANDIDATE | src/app/admin/intelligence/page.tsx:6-12 | — | retire | low
- console_commerce | UI /console/commerce | MOCK revenue/sales/alerts | Cosmile console | requireConsoleUser | none | MOCK | src/app/console/commerce/page.tsx:97,148,194 | — | defer/real-metrics | med(looks-live)
- console_traffic | UI /console/traffic | no CommerceEvent source yet | Cosmile console | requireConsoleUser | none | MOCK | src/app/console/traffic/page.tsx:36 | CommerceEvent | defer | low(looks-live)
- console_jobs | UI /console/jobs | prisma consoleJob(read)+mock exec | Cosmile console | requireConsoleUser | none | PARTIAL | src/app/console/jobs/page.tsx:16,30 | — | defer exec | low
- console_settings | UI /console/settings | static info | Cosmile console | requireConsoleUser | none | MOCK | src/app/console/settings/page.tsx:8,16 | — | keep(static) | low
- console_ai_workspace | UI/Comp /console/c/[id]+ConsoleWorkspace | prisma conversation/message + mock exec | Cosmile console | requireConsoleUser | none | PARTIAL | src/components/console/ConsoleWorkspace.tsx:98,291 | — | separate concern | low
- console_auth | Comp LoginForm + lib guard/session/password | prisma consoleUser/session | Cosmile console | password/session | none | CONNECTED | src/lib/console/adminWrite.ts:5; components/console/LoginForm.tsx:17 | requireConsoleAdminWrite | reuse | low
- foundation_bridge | Comp FoundationBridgePreview | fetch api/console/foundation (mock Foundation) | Foundation(mock) | requireConsoleUser | none | PARTIAL | src/components/console/FoundationBridgePreview.tsx:27 | foundationConsoleAdapter | boundary-keep | low
- lane_isolation | lib o1LegacyLaneIsolation | pure | O1 runtime | — | gate only | CONNECTED | src/lib/runtime/o1LegacyLaneIsolation.ts | isO1OwnedOrder | reuse | low(fail-closed)
- core_lanes | lib order/payment/inventory/auth | prisma repos + reviewed services | O1/WU-* | contracts | economic truth | CONNECTED | src/lib/{order,payment,inventory,auth}/** | reviewed WU lanes | reuse | ref

## Not designed here (per handoff)

IA, final files/WorkUnits, and product writes are NOT proposed. `console-seed.mjs` and dbtest.py/playwright harnesses are test/seed scaffolding (out of dashboard scope). Foundation console adapter is a mock-boundary preview (Cosmile does not own Foundation judgment).

RETURN_TO: foundation-advisor · STOP (pre-review).
