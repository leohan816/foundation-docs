# M3B Order Detail, Progress, and Request State — Worker Handoff

MISSION_ID: `COSMILE_O1_STOREFRONT_AND_CUSTOMER_ACCOUNT_COMPLETION_V1`
MODULE: `M3B_ORDER_DETAIL_PROGRESS_AND_REQUEST_STATE`
BASE: `1c22fc982feefb28a107f970bab0c07c865cd476`
DELTA_ONLY_VERIFICATION: `REQUIRED`

## Binding and skill

Return implementation to the existing primary Cosmile Claude Worker at Opus 4.8/xhigh in the exact mission worktree; keep Codex idle. Load `/fable-builder` with `implementation-execution`, `contract-to-code-mapping`, and `test-design-before-code`; use `implementation-report-template` only for the compact return.

## Exact path ceiling

1. `app/src/app/orders/[orderId]/page.tsx`
2. `app/src/components/commerce/O1OrderStatus.tsx`
3. `app/src/components/commerce/O1OrderServiceRequest.tsx`
4. `app/scripts/o1_order_service_request_browser.vitest.ts`

No fifth path. Do not change API/projection/repository/auth/payment/refund/inventory/provider/economic logic, schema/migration, account/history pages, checkout/cart, CSS, manifest/lock/config, or legacy O1-OFF behavior.

## Frozen behavior

### Stable O1 detail

- Preserve ownership fail-closed, immediate-return-only confirmation heading, O1 detection, sanitized projection, nonproduction notice, and legacy detail unchanged.
- In O1 detail, product lines and total render exactly once. Do not render the page's legacy line/total blocks in addition to `O1OrderStatus`.
- Keep one reading order: heading; opaque order number/status; projected lines and total; detail facts; current progress; cancellation/support; notice/actions.
- Do not expose internal IDs, payment/provider references, raw enum/error, PII, or add a customer economic action.

### Truthful current progress

- Add a semantic ordered list headed `주문 진행` derived only from the existing `O1CustomerView`: valid `createdAt`, non-null valid `paidAt`, current fulfillment category/tracking fact, and terminal `ORDER_CANCELLED` or `ORDER_REFUNDED`.
- This is current projected progress, not an audit/event timeline. Never invent an actor, reason, missing date, ETA, percentage, delivery promise, or intermediate history event. Invalid/missing dates are omitted rather than fabricated.
- Keep `deriveO1DetailRows` and its existing five truth rows. Unsupported values remain fail closed.
- O1 order load failure is a bounded `role="alert"` state with a keyboard-accessible `/account/orders` action; no raw response.

### Cancellation/support state

- Preserve the existing one encoded endpoint, bodyless POST, closed presentation mapping, single-flight guard, confirmation consequence, and at most one server-projected action.
- Give the section a stable `aria-labelledby`.
- Distinguish transport/parse load or submit failure from a valid `unavailable` projection: render a generic Korean `role="alert"` and one GET `다시 확인` control. Never infer request eligibility/status or silently map a failed load to a valid unavailable state.
- A successful reload restores the server-derived presentation. No automatic retry and no raw error/category/identifier.

### Existing-test alignment

- In the same test file, replace only the stale M2D expectation `STATUS_KO[o.status] ?? o.status` with the already-reviewed M3A closed fallback `STATUS_KO[o.status] ?? "상태 확인 중"`. Do not weaken any other M2C/M2D assertion.

## Tests first

Add focused `M3B` cases to the existing test file proving:

- O1 page suppresses duplicate legacy lines/totals while O1-OFF retains them;
- progress is an `<ol>` from only the admitted projection fields, omits invalid/missing dates, and has no actor/reason/ETA/percentage/fabricated timeline;
- order load error has alert plus `/account/orders`;
- request section label, distinct load/submit failure alert, one GET recheck, and successful server-derived recovery;
- existing endpoint/bodyless POST/single-flight/closed mapping remains;
- the M2D status-fallback expectation is aligned without other oracle weakening.

Expected RED: O1 detail duplicates lines/totals; no projected progress list; load failures collapse to valid unavailable; request section lacks a label and transport failure alert.

Run only from `app/`:

`./node_modules/.bin/vitest run scripts/o1_order_service_request_browser.vitest.ts -t "M2D source|M3B"`

Run once for RED, patch only the three source paths, then run the identical command once for GREEN. No install, generate, build, typecheck, broad test, DB/runtime/browser/provider/network.

## Closure

Inspect exact four-path diff, `git diff --check`, package/lock unchanged, and no new ignored residue. Preserve worktree-local `node_modules`. One truthful additive commit and non-force push; clean/upstream-equal. Return <=70 lines and STOP before M4.

If progress/request truth needs a new field, endpoint, projection, schema, or economic semantic, return `HOLD` and leave it deferred.

RETURN_TO: `foundation-advisor`
STOP.
