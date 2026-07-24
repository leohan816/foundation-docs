# 80 — M3B Worker Handoff: Dashboard Request Detail Authority

MISSION: `COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1`
MODULE: M3B
BASE: `4aac190042eb87b88da324b939176742be1b6c8e`
ACTOR: existing Cosmile Claude Worker primary · Opus 4.8/xhigh
SKILL: `/fable-builder` with implementation-execution, contract-to-code-mapping, test-design-before-code; implementation-report-template only at return

## Exact path ceiling

1. `app/src/app/dashboard/requests/[orderId]/page.tsx`
2. `app/src/components/commerce/O1OperatorPanel.tsx`
3. `app/src/lib/console/o1ConsoleView.ts`
4. `app/scripts/o1_dashboard_request_detail_authority.vitest.ts`

No fifth path.

## Frozen behavior

- New Dashboard detail page is dynamic, runtime-flagged and decodes/bounds the opaque route value fail closed before rendering.
- Require `dashboard.operations.read` global and `service_requests.read` on `{ kind: "order", orderId }`; both must resolve to the same nonempty `OperatorPrincipal`.
- Do not import or call customer shopper/session/AuthIdentity/CustomerAccount authority.
- Evaluate `shipment.record`, `service_requests.support_acknowledge` and `refund.full_execute` separately on the same order scope and same principal. Missing, denied, thrown, mismatched or unknown authorization yields `false`.
- Render the existing `O1OperatorPanel` only after root/read authorization. Pass `legacyActionsEnabled={false}` and the three closed action-visibility booleans.
- Add the smallest pure grant-aware action-surface helper in `o1ConsoleView.ts`; missing exact refund/support grants collapse their actionable mode to the existing control-free HOLD surface. Exact grants expose only their existing reviewed control. No capability grants a different action.
- `shipmentRecordEnabled` remains the existing record-only legacy/null-request seam and is true only for the exact shipment grant.
- `O1OperatorPanel` adds only required boolean visibility props, uses the pure helper, and preserves existing defaults for predecessor compatibility. Every API still independently enforces its capability; refund nonce/step-up/full-only/no-restock/idempotency semantics are byte-identical.
- No redirect or deletion of predecessor routes in M3B; transition mapping is a later bounded module.

## Tests first

Create the focused test first and run exactly:

`./node_modules/.bin/vitest run scripts/o1_dashboard_request_detail_authority.vitest.ts`

Meaningful RED must prove the absent Dashboard detail page/grant helper and missing action props. GREEN must prove:

- runtime/root/read ordering; malformed or denied detail never renders the panel;
- exact global/order scopes and same-principal matching;
- customer authority symbols absent;
- refund/support/shipment grants are independent and fail closed;
- pure grant helper cannot cross-enable actions and unknown/missing permission yields control-free HOLD;
- panel receives and uses the booleans while existing command URLs, nonce/step-up, full refund and no-restock wording remain unchanged;
- no DB/provider/economic/runtime effect.

Do not run an existing full test file, DB test, build, typecheck, generate, browser, provider, runtime or M3C/M4 work.

## Return

Inspect exact four-path diff and `git diff --check`; package/lock/schema/migration absent. One truthful commit without co-author trailer, non-force push, clean/upstream-equal. Write only:

- `81_M3B_WORKER_RESULT.md`
- `82_M3B_WORKER_POINTER.md`

Return to `foundation-advisor` and STOP.
