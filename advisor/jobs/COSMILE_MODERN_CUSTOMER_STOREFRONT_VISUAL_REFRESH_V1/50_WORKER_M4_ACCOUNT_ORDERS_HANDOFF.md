# 50 — Worker M4 Account / Orders / Service-Request Presentation Handoff

MISSION: `COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1`
MODULE: `M4_ACCOUNT_ORDER_HISTORY_DETAIL_REQUEST_PRESENTATION`
BASE: `a9f72d5d71554f725655585b2be0d5b48bcae9e6`
ACTOR: same Cosmile Worker, actual Opus 5/xhigh, `/fable-builder`
CWD: `/home/leo/Project/.worktrees/Cosmile/COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1`

## Exact nine-path ceiling

1. `app/src/app/account/page.tsx`
2. `app/src/app/account/orders/page.tsx`
3. `app/src/app/orders/[orderId]/page.tsx`
4. `app/src/components/commerce/O1OrderStatus.tsx`
5. `app/src/components/commerce/O1OrderServiceRequest.tsx`
6. `app/src/app/globals.css`
7. `app/scripts/o1_account_order_history.vitest.ts`
8. `app/scripts/o1_order_service_request_browser.vitest.ts`
9. `app/scripts/o1_storefront_account_orders_visual.vitest.ts` (new)

No tenth path. `o1_storefront_visual_shell.vitest.ts` and
`o1_storefront_a11y_floor.vitest.ts` are run-only.

## Frozen behavior

### Account

- O1 branch only: retain generic `게스트` / `회원`, existing `AuthToggle`, Google
  behavior, guest-to-user continuity copy, and no PII/mock identity.
- Apply quiet O1 account framing without emoji/gradient identity decoration.
- The independently reviewed design supersedes the stale “exactly two O1 menu
  items” oracle: expose exactly the existing `/wishlist`, `/account/orders`, and
  `/cart` destinations. Wishlist uses the existing `getWishedProductIds(o)`
  result and displays its runtime count badge. No sixth mobile tab and no new
  route.
- Legacy flag-off account remains unchanged.

### Order history

- Preserve the exact ownership-scoped Prisma query, ordering, included items,
  closed service-request badge helper, order links, snapshot title, total, date,
  and closed status fallback.
- Give loading, empty, error, and populated states stable O1 customer surfaces:
  concise heading/count; factual state badge; order card; route-safe empty
  `/shop` action; same-page error recovery.
- No raw status, internal id beyond the existing bounded display, action,
  timeline invention, ETA, percentage, recommendation, PII, or new query.

### Order detail and request

- Preserve owner-match `notFound`, confirmation-only `?o1=1` headline, O1
  detection, customer projection fetch, existing line snapshots, factual rows,
  progress, request closed projection, single-flight behavior, encoded GET,
  bodyless POST, confirmation, recovery, and generic errors.
- O1 detail only: apply surface classes for order summary, lines, facts,
  progress, and the bordered secondary service-request section. Pending/error
  geometry stays stable and focus/44px controls remain.
- No internal/provider/payment identifiers, raw response, PII, fabricated
  image, status, date, total, completion, refund, restock, carrier, or economic
  behavior.
- Do not change any endpoint, request body, query, write, state machine, status
  mapping, or customer/operator authority.

### Responsive and accessibility

- O1 shell descendants only. Desktop order detail uses a readable fact/content
  composition; mobile remains one column. At 200%/short viewport all content
  remains in normal flow.
- Existing focus floor, reduced motion, `aria-busy`, live states, alerts,
  headings, and accessible action labels remain.

## Tests first

Patch paths 7–9 first. Path 7 must replace only the stale O1 account
two-destination/no-wishlist expectation with the reviewed exact three-route,
runtime wishlist-count contract; its legacy assertions remain unchanged.
Paths 8–9 pin the existing request behavior and the new class/state grammar.

Run exactly once as RED:

```bash
cd app
./node_modules/.bin/vitest run --config vitest.config.ts \
  scripts/o1_account_order_history.vitest.ts \
  scripts/o1_order_service_request_browser.vitest.ts \
  scripts/o1_storefront_visual_shell.vitest.ts \
  scripts/o1_storefront_a11y_floor.vitest.ts \
  scripts/o1_storefront_account_orders_visual.vitest.ts
```

Implement paths 1–6 only, then run the identical command once as GREEN.

PASS: `git diff --check`, exact nine-path containment, generated Prisma client
absent, commit without co-author trailer, non-force push, compact return, STOP.
First failure or missing fact outside the ceiling returns HOLD without a second
diagnostic, build, typecheck, runtime, browser, DB, provider, economic action,
or M5 work.
