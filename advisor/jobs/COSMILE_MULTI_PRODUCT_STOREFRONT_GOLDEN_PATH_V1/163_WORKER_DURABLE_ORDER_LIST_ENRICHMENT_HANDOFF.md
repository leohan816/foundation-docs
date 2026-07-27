# WORKER HANDOFF — DURABLE ORDER-LIST ENRICHMENT

## Pins and binding

- Product base: `d7d0b78cde931e7f0cb233a26f82a139c5db1cba`, clean/upstream-equal.
- Contract: `162_ADVISOR_ORDER_LIST_ENRICHMENT_FREEZE.md`.
- Same existing Cosmile Worker; actual Opus 5/xhigh; exact mission CWD; current Worker rules and `/fable-builder`.

## Exact five paths

1. `app/scripts/o1_core_dashboard_orders.vitest.ts`
2. `app/scripts/o1_core_dashboard_reads.vitest.ts`
3. `app/src/lib/operator/orderListRead.ts` (new)
4. `app/src/lib/runtime/o1CommerceRuntime.ts`
5. `app/src/app/dashboard/orders/page.tsx`

No sixth path.

## Tests first

Update only the accepted Orders assertions and add pure projector cases proving:

- valid durable order + existing `PaymentRefundRow` yields exact title/additional-line count, total quantity, total/currency/time, closed order/payment/refund/shipment categories, and opaque detail binding;
- malformed/missing/duplicate bindings, empty title, non-positive line/quantity, inconsistent quantity, unknown shipment state, and absent payment match fail the whole projection closed;
- output contains no customer/contact/address/session/provider/payment/refund internal identifier;
- runtime query selects only the necessary durable item summary and shipment status and contains no write, customer, contact, provider-ref, payload, or secret field;
- page gates runtime → root → orders → fulfillment → reconciliation for one principal before exactly one order-list and one existing payment/refund read;
- one stable 8-column table, truthful zero body, existing encoded detail link, no button/form/input/fetch/POST/mock/KPI.

The accepted enrichment supersedes only the old three-column/no-amount Orders-page assertions. Do not weaken authorization, privacy, malformed fail-closed, zero-data, or action-zero assertions.

Run exactly once for RED:

```bash
cd app && ./node_modules/.bin/vitest run -c vitest.config.ts \
  scripts/o1_core_dashboard_orders.vitest.ts \
  scripts/o1_core_dashboard_reads.vitest.ts \
  -t 'M1 orders|M3A — /dashboard/orders'
```

Every RED must map to the new frozen contract; any unrelated failure is HOLD.

## Implementation

- Add one pure `orderListRead.ts` projector. It accepts unknown bounded order rows plus already-validated `PaymentRefundRow[]`; joins by non-empty orderNo; returns a closed typed row list or `null`.
- Extend `O1OperatorListRow` and its single read-only query only with:
  - deterministic first durable `productNameSnapshot`;
  - line count;
  - summed quantity;
  - nullable `ShipmentRecord.status`.
  Do not select PII, customer/guest/session, provider reference, payment body, secret, or action authority.
- In `/dashboard/orders`, keep all same-principal grants. Reuse `readPaymentRefunds` and its repository unchanged, call both bounded reads once, project fail closed, and render the exact table from the frozen fields.
- Use Korean closed labels. Unknown values are unavailable, never a fabricated zero. Existing order-created timestamp is labelled as order time; do not invent buyer/shipping facts.
- Leave `O1ConsoleFulfillment`, the detail correction, Customers, catalog, inventory, payments page, and all commands untouched.

Run the identical focused command once for GREEN. PASS requires all selected tests green, exact five-path containment, `git diff --check`, no runtime/DB/provider/economic effect, commit, non-force push, clean/upstream equality.

Write compact `165_WORKER_DURABLE_ORDER_LIST_ENRICHMENT_RESULT.md` and `166_..._POINTER.md`, docs-only commit/push, then STOP.
