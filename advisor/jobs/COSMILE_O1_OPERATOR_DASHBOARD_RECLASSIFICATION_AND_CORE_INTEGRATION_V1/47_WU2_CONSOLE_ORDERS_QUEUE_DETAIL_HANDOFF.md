# WU-2 Console Orders Queue/Detail — Worker Handoff

MISSION_ID: `COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1`
WORK_UNIT: `WU-2_CONSOLE_ORDERS_QUEUE_DETAIL`
ACTOR: existing Cosmile Worker, Claude Opus 4.8/xhigh primary
PRODUCT_BASE: `9840c975f094e3a69bded49247288545e8c6c8bd`
CLAIM_CEILING: `IMPLEMENTED_NOT_REVIEWED`
DELTA_ONLY_VERIFICATION: `REQUIRED`
SKILL: `/fable-builder`
REFERENCES: `implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`; `implementation-report-template` only at return.

## Exact path ceiling

1. `app/src/app/console/orders/page.tsx` (new)
2. `app/src/app/console/orders/[orderId]/page.tsx` (new)
3. `app/src/components/console/O1ConsoleQueue.tsx` (new)
4. `app/scripts/o1_console_orders_ui.vitest.ts` (new)

No fifth path. No schema/migration, API/runtime/auth/refund/shipment/reconciliation edit, new server authority, economic/provider/DB mutation, root/layout/nav/settings work, WU-3+, or deferred-feature behavior.

## Frozen server boundary

Both pages are `force-dynamic` server pages and must fail closed in this order before exposing O1 data:

1. `await requireConsoleUser()` — existing Console session only; it never substitutes for O1 authority.
2. `o1RuntimeEnabled(process.env)` — disabled returns `notFound()`.
3. `await getShopper()` and `await o1OperatorForCustomer(process.env, shopper.userId)` — the existing Google immutable-subject allowlist boundary.
4. Only `operator.kind === "operator"` may continue. Denial renders the shared Korean `denied` phrase and reads no queue/detail data.

The queue page then calls only `o1OperatorServiceRequestQueue(50)`. `repository_error` is not mapped to empty; render `queue_error`. Zero rows render `empty`.

The detail page must not derive request/action eligibility and must not add a data read. After the same double gate it renders only:

```tsx
<O1OperatorPanel orderId={decodedBoundedOrderId} legacyActionsEnabled={false} />
```

Validate/decode the route parameter as a nonempty bounded string; invalid input returns `notFound()`. The existing O1 GET/POST routes remain the sole detail/action authority and independently re-check operator/step-up/nonce/economic truth.

## Frozen queue projection

`O1ConsoleQueue` is server-compatible/presentational and accepts only the closed `OperatorServiceRequestQueueRow` projection. It may show:

- opaque `orderNo`;
- Korean category-safe request kind/status label;
- exact requested time;
- category badge from the shared WU-1 vocabulary: refund, support, or HOLD.

The internal `orderId` may appear only inside the encoded `/console/orders/[orderId]` href and React key; never visible text, title, aria-label, data attribute, logging, or serialized evidence. No customer/user/email/PII, amount/currency/payment/provider/refund identifiers, raw error, free text, action button, form, input, fetch, or client-derived eligibility.

Each row is a read-only detail link. Unknown/malformed category presentation fails closed to HOLD wording. Mobile/desktop styling may reuse current repository conventions, with meaningful link targets and no visual redesign.

## Tests first and exact command

First create only `app/scripts/o1_console_orders_ui.vitest.ts` with the exact named block:

`WU-2 Console orders queue and detail gate`

Prove:

- both pages contain Console-session + runtime + Google O1 allowlist gates before queue/panel composition;
- denial has zero call to `o1OperatorServiceRequestQueue` and no panel;
- queue call is exactly bounded at 50; error is distinct from empty;
- the queue projection has exactly allowed visible fields/categories and no prohibited identity/money/provider/action field;
- internal orderId is encoded href/key only and never visible;
- no queue button/form/input/fetch/action;
- detail passes `legacyActionsEnabled={false}` to the existing panel and adds no alternative action route or client eligibility;
- source contains no legacy admin mutation, deferred feature, AI, automation, or fabricated KPI.

Run only:

```bash
./node_modules/.bin/vitest run scripts/o1_console_orders_ui.vitest.ts -t 'WU-2 Console orders queue and detail gate' --config vitest.config.ts --reporter=verbose --cache=false
```

Require meaningful RED before implementation, then identical GREEN with explicit exit status. Preserve first failure. Do not weaken/delete an assertion. Do not run a full file/suite, predecessor test, build, typecheck, lint, generate, install, DB, app runtime, browser, or provider command.

## Dependency, cleanup, Git, return

Use only the mission-authorized temporary dependency mechanism: prove worktree `app/node_modules` absent and package/lock compatibility, symlink to unchanged real `/home/leo/Project/Cosmile/app/node_modules`, run the one exact command with cache disabled, remove immediately, prove canonical representative hashes unchanged plus zero symlink/cache/process residue.

One additive truthful commit, non-force push, clean/upstream-equal. Write only uncommitted result `48_WU2_CONSOLE_ORDERS_QUEUE_DETAIL_RESULT.md`, return to Advisor, and STOP before WU-3.

If an extra path, new endpoint, client-derived action eligibility, Console-session authority substitution, schema/economic behavior, or missing server contract is required, STOP. One bounded no-delta Claude attempt returns `EXECUTION_NONCONVERGENCE`; Advisor alone may route the exact frozen WorkUnit to the preserved Codex fallback using explicit per-command absolute workdir.
