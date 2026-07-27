# WORKER DIAGNOSIS — MISSING ORDER-DETAIL RUNTIME INTEGRATION

Status: **CAUSE PROVEN** (read-only; nothing changed)

- Handoff `149` at docs `75260e1ad0b4606c3c7d6154d0e3db1fbd098b24`; computed sha256 `dfee8c280aaef2c2e2e18908afa07b950afa35cfedd714e16342d63b8a8e9bac`.
- Product `48939e86cc9c3e9da8cf55659ec247cc91e8e071`, clean/upstream-equal before and after.

## 1. Process

One listener on `127.0.0.1:3000`: PID `2830525`, PGID `2830489`, owner `leo`, CWD the mission app, command `next-server (v16.2.9)`, uptime ~3024 s. Flag **categories only**: `NODE_ENV=development` true, Toss mode TEST true, sandbox one-shot OFF, local substitute OFF, O1 runtime enabled, Google enabled. No env value was printed.

The runtime started ≈1240 s **before** commit `48939e8`, i.e. before the order-line source edits — but it is a dev server, and §5 proves it recompiled them.

## 2. Route

- `app/src/app/dashboard/requests/[orderId]/page.tsx` renders the `요청 상세` heading and mounts `<O1OperatorPanel orderId=… legacyActionsEnabled={false} …/>`. It passes **no `view` prop**; the panel fetches the projection itself.
- `app/src/app/dashboard/orders/page.tsx` contains **zero** occurrences of `href`, `Link`, `router.`, `요청 상세`, or `requests/` — a combined match count of `0`.

**No route in the ceiling renders a paid-row `요청 상세` URL.** The orders list emits no navigation to the detail page.

## 3. Durable line (one read-only transaction, counts/booleans only)

Exactly `1` paid order. Its lines: count `1`; title present `true`; SKU present `true`; quantity present `true`; unit price present `true`; total price present `true`; **arithmetic exact `true`**; historical `foundationSnapshotRef` null `true` (as designed — no backfill). No id, title, SKU, subject, cookie, secret or provider reference was selected or printed.

## 4. Server projection

Given that durable data and the exact repository→service composition, `operatorOrderView` would return `lines` with **1** entry and **not** fail closed: every validated predicate holds, including `totalPrice === unitPrice * quantity`. The API route returns `order: out.view` whole, so `lines` is **not** dropped in transit.

The authenticated API response itself was not replayed: `AUTHENTICATED_RESPONSE_UNOBSERVABLE`. No auth was weakened, obtained or bypassed.

## 5. Rendered code

The currently served dev artifact **contains the table**: `op-order-lines` in 4 files, `주문 라인` in 6, alongside `o1-operator-panel` in 4 and the summary heading in 4. Panel source mtime is later than runtime start, so hot reload did compile the change.

`.next/server/app/dashboard/requests` **does not exist** — that route has never been compiled in this dev session, which is consistent with it never having been visited.

I performed **zero** local and zero public GETs: the artifact evidence already answered the question, so neither was necessary.

## 6. Visibility

The table is neither absent nor conditionally suppressed. `O1OperatorPanel` early-returns only for `loading` / `denied` / `error || !view`; past that, `op-order-lines` renders unconditionally and maps `(view.lines ?? [])`, so its headers appear even with zero lines.

It is, however, the **last** region of the panel — after the summary section, the entire action region, the mobile notice and the message paragraph — in a `flex flex-col gap-4` column. On the desktop dashboard that places it well below the earlier regions, plausibly outside the initial viewport. No geometry experiment was run, so this is a code-order finding, not a measured one.

## Exact cause

**The `/dashboard/orders` list provides no navigation to `/dashboard/requests/[orderId]`.** The detail page, the panel, the projection and the order-line table all exist, compile and are served correctly, and the sole paid order's durable data would render one exact line — but from the orders list there is no link to reach it, and the detail route shows no evidence of ever being compiled.

A second, non-blocking contributor: even when the detail page is reached directly, the order-line table is the last region in the panel and may sit below the fold.

I cannot prove which URL the human actually opened; if they opened the detail URL directly, the table would have rendered, and the visibility factor would be the operative one.

## Smallest frozen correction candidates (NOT implemented)

1. **Primary — navigation.** Give each `/dashboard/orders` row a link to `/dashboard/requests/[orderId]`. This belongs to the separately approved list-enrichment requirement, which per this handoff stays open and was neither inspected nor combined here. Path/test ceiling would be `app/src/app/dashboard/orders/page.tsx` plus its existing focused dashboard-orders suite.
2. **Secondary — visibility.** Move the `op-order-lines` section to directly after the summary section in `O1OperatorPanel.tsx`. Path/test ceiling: `app/src/components/commerce/O1OperatorPanel.tsx` + `app/scripts/o1_operator_request_detail_ui.vitest.ts`. Note for whoever implements it: the existing UI oracle slices from `op-order-lines` to end-of-file, so moving the section earlier widens that slice over the action region and the slice boundary must be re-anchored rather than the assertions weakened.

## Containment

No product or docs source edit, no test, build, restart, cache cleanup, browser, DB mutation, provider, refund, economic action, mock data or speculative patch. One read-only DB transaction and read-only filesystem inspection only, strictly within the seven-path source ceiling. Docs-only commit.
