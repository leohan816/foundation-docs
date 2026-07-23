# P3 Worker Technical Mapping — Result

MISSION: `COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1` · PHASE `P3_REPOSITORY_LOCAL_TECHNICAL_MAPPING` · ACTOR Cosmile Worker (Opus 4.8/xhigh) · `/fable-builder` contract-to-code-mapping.
Product HEAD `33bf8162` clean/upstream-equal. Read-only mapping; `PRODUCT_WRITE: none`; result uncommitted. Paths relative to `app/`. This is a mapping, not implementation or approval.

Principle: the independent Console is a FRONTEND that reuses the reviewed O1 server contracts UNCHANGED. Every economic/authority effect is delegated to existing routes/runtime — the Console mints no new authority, no new API, no schema, no economic path. Additive only: no `/o1/operator`/legacy deletion or redirect.

## 1. Proposed Console routes/components + reused O1 server contracts (all `retain`, unchanged)

- New routes (additive): `/console/orders` (queue+detail), `/console/orders/[orderId]`, `/console/fulfillment`, `/console/finance`. Overview `/console` and `/console/settings` = repair-candidate (see WU-E collision/STOP).
- New components: `components/console/O1ConsoleQueue.tsx`, `.../O1ConsoleRequestDetail.tsx` (reuse `O1OperatorPanel` semantics, not the file), `.../O1ConsoleShellNav.tsx`; new pure lib `lib/console/o1ConsoleView.ts` (nav model + closed-state 한국어 vocabulary + view-model composition).
- Reused server contracts (NO edit): GET `api/o1/operator/orders` (`o1OperatorServiceRequestQueue`), GET `…/orders/[orderId]` (`o1OperatorServiceRequestDetail`+`o1OperatorOrderView`+nonce), POST `…/refund` (`o1ProcessPaidCancellationRefund`), POST `…/shipment` (`o1RecordShipment`), POST `…/support` (`o1AcknowledgeShippedSupportRequest`), GET/POST `api/o1/operator/reconciliation` (`readO1ReconciliationProjection`+recovery); `o1OperatorForCustomer` allowlist, `mint/consumeO1StepUpNonce`, `o1LegacyLaneIsolation`, `lib/{order,payment,inventory,auth}`, `o1ReliabilityRuntime`.

## 2. WorkUnits (path ceiling · behavior) — all frontend/read-composition, tests-first

- WU-A `lib/console/o1ConsoleView.ts`, `scripts/o1_console_view.vitest.ts` (new). Pure: 9-IA nav model (5 O1-link + 4 `준비 중·동작없음` `aria-disabled`), capability badges, closed-state 한국어 vocabulary map, exactly-one action classifier reusing `classifyOperatorRequestMode`. No route/fetch/authority.
- WU-B `app/console/orders/page.tsx`,`app/console/orders/[orderId]/page.tsx`,`components/console/O1ConsoleQueue.tsx`,`O1ConsoleRequestDetail.tsx`, `scripts/o1_console_orders_ui.vitest.ts` (new). Server component re-checks `o1RuntimeEnabled`+`o1OperatorForCustomer`; renders queue (opaque orderNo/kind/status/age, no action/PII/amount) and detail truth-rail 요청/결제/재고/정합성 + exactly one action via existing POST routes; HOLD/terminal → control 0.
- WU-C `app/console/fulfillment/page.tsx`,`components/console/O1ConsoleFulfillment.tsx`, `scripts/o1_console_fulfillment_ui.vitest.ts`. reservation/committed/HOLD category (read) + record-only shipment via existing shipment route; no sellable-restore, no courier.
- WU-D `app/console/finance/page.tsx`,`components/console/O1ConsoleFinance.tsx`, `scripts/o1_console_finance_ui.vitest.ts`. count-only reconciliation (read) + protected `정합성 재확인` via existing reconciliation POST (step-up/nonce). No general finance metric.
- WU-E `app/console/layout.tsx`,`components/console/ConsoleNav.tsx` (repair to 9-IA/capability/`aria-current`); overview `/console` + `/console/settings` read-only. COLLISION/STOP: existing `/console` root redirects to chat and `/console/settings` is legacy — repurposing them is a redirect/legacy change out of this mission; map as transition-candidate requiring Advisor decision before repurpose (additive-mount otherwise).

## 3. Tests-first RED/GREEN acceptance + focused command per WU (jsdom absent → pure export + `readFileSync` source-contract; temp canonical symlink)

- Pattern per WU: RED add named `WU-x ` tests over the new pure view-model/derivation + source-contract on the new page/component; GREEN implement. Command: `./node_modules/.bin/vitest run scripts/<wu-file>.vitest.ts -t 'WU-x ' --config vitest.config.ts --reporter=verbose --cache=false`.
- WU-A: nav model exact 9 rows (link vs `aria-disabled` deferred), full closed-state 한국어 vocabulary map, classifier matrix incl. malformed→HOLD.
- WU-B: source proves allowlist+flag gate before any read, no `body`/amount/identity forwarded, exactly-one action per mode, queue rows carry no action/PII/amount, HOLD→control 0; calls only existing `/api/o1/operator/*`.
- WU-C: record-only shipment call, no restore/courier string; read-only reservation categories.
- WU-D: recovery uses step-up/nonce path; count-only; no provider identifier.
- WU-E: 9-IA source-contract, deferred items non-link/`aria-disabled`/no form-button-sample, no fabricated KPI.

## 4. Final integration gate (one, justified)

One bounded gate: run the new WU vitest files PLUS the reused O1 focused contract tests (`o1_operator_service_request_queue`, `o1_operator_request_detail_ui`, `o1_operator_support_ack`, `o1_paid_cancellation_refund_runtime`, `o1_order_service_request(.dbtest)`, `o1_toss_reconciliation_runtime`) once, to prove the Console reuse preserves queue/detail/refund/support/shipment/recon + lane isolation. Justified: Console composes economic actions; must show zero regression + zero bypass. Read-only, one command, no rerun.

## 5. Permissions/action authority matrix (no Console-session bypass)

| action | authority chain (reused, unchanged) | Console-session role |
|---|---|---|
| queue/detail read | `o1RuntimeEnabled`→`o1OperatorForCustomer` allowlist | none — allowlist re-checked server-side |
| TEST full refund | allowlist + password step-up + fresh single-use action/order/operator/reason-bound nonce + idempotencyKey + in-txn audit | none — owner/admin ≠ O1 authority |
| support ack | allowlist (no step-up); non-economic | none |
| shipment record | allowlist; record-only | none |
| recovery re-check | allowlist + step-up + nonce | none |
Invariant: no Console path re-implements or substitutes O1 allowlist/step-up/nonce/idempotency/audit; legacy admin order-status isolation (`decideLegacyAdminStatusMutation`) retained and NOT reused for O1 orders.

## 6. Legacy/mock collision disposition (transition, no deletion/redirect)

Duplicate order list/detail (`/console/admin`,`api/admin/orders*`) and `/o1/operator/**` = transition/retire EVIDENCE; kept intact this mission (no delete/redirect). New Console is additive; legacy write/chat + mock console screens (commerce/traffic/jobs/settings) remain until a later mission approves retirement. `/console` root chat-redirect + `/console/settings` repurpose is the one open collision → Advisor decision (WU-E STOP).

## 7. Schema/migration effect

`NONE`. All models present at `33bf8162` (`prisma/schema.prisma`: Order/OrderServiceRequest/ReconciliationTask/PaymentIntent/PaymentTransaction/Refund/InventoryReservation/ShipmentRecord/ConsoleAuditLog). No census/design evidence requires a change; a required change → STOP.

## 8. Economic-authority effect

`NONE`. All refund/recovery/shipment/cancellation authority is the existing reviewed routes/runtime (M2–M4C, incl. M4B-R1 step-up-on-restart). The Console adds zero economic decision, provider call, or money mutation.

## 9. Rollback by commit/WorkUnit

Each WU = one additive commit (frontend/new-lib only). Rollback = `git revert <WU commit>`; no schema/data/economic state to unwind; reverting any WU leaves prior WUs and the O1 backend intact. WU-E is last (touches shared shell); revert it first if needed.

## 10. Explicit exclusions and STOP

Excluded/nonfunctional (no route/form/save/mutation/sample/fake-live): price, listing, offer, content, event/campaign/coupon/review, advanced analytics, human-AI/agent/jobs/Foundation preview, Agent Control Center. STOP if: a Console path would let the session substitute the O1 allowlist; legacy admin order-status is reused for an O1 order; client-side action eligibility is computed; exact request/capture/refund/reservation/shipment/reconciliation/audit truth cannot be closed by the server projection (then control 0 + HOLD); any schema/economic/provider change becomes necessary; `/console` root redirect/legacy retirement is required (Advisor decision). Not designed here: deferred IA behavior, final approval, self-review.

RETURN_TO: `foundation-advisor` · STOP (pre independent review).
