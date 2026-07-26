# Worker result — M1-E1 gate correction

OUTCOME: `PASS` — corrected focused gate **22 passed (22)** on its single run. Committed and pushed once.

MISSION: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1` · MODULE `M1_ORDERS_E1`
ACTOR: same `cosmile:claude.0` Worker · Opus 5/xhigh · `/fable-builder` — no context, session, model or effort change.
HANDOFF: docs `abb993f7a1b3e29dad38bf01ec816feacfb52c12`, blob `3f2205ec866fde928ba673e76197b4dd21d950d4`, SHA256 `1254601340fb6fe22995cad85b60d6adfb0c79119c8776b152b006f31f24be0e` — verified.
BASE `96b363c7f545da5b3d1b22178fc25313a749e143` → HEAD `9bd0c7785ff49850010b021c75d765cd45a6a166`; base is ancestor, upstream equal, worktree clean.
The uncommitted three-path M1 delta and the M1 RED evidence (**5 failed / 4 passed**) were preserved; no RED rerun.

## The five corrections

1. **H1 oracle fixed** — now pins `const PAGE_HEADING = "주문"` *and* `>{PAGE_HEADING}</h1>`, so value and placement cannot drift apart. Visible-heading coverage is unchanged, including the `sr-only` prohibition.
2. **Header count fixed** — `/<th\b/g`, so `<thead>` is no longer counted; still exactly three named headers pinned inside the header row.
3. **Import preserved** — the exact single-line `import { O1ConsoleFulfillment } from "@/components/console/O1ConsoleFulfillment"` required by the directly affected core-read suite is retained, with `orderStatusLabel` and the row type on a separate import line.
4. **Invented identifier removed** — `String(index)` is gone. `projectRows` now returns `null` when any row lacks a nonempty existing `orderId`, and the page renders the existing unavailable state; no key or link is ever minted from a malformed row.
5. **Accessible name fixed** — the shared section carries `aria-label={heading ?? "주문 목록"}`; the dangling `aria-labelledby="console-fulfillment-heading"` is removed, so the section is named correctly when the page owns the heading.

## Gate

`./node_modules/.bin/vitest run scripts/o1_core_dashboard_orders.vitest.ts scripts/o1_core_dashboard_reads.vitest.ts --config vitest.config.ts` — run **once**, exit 0, **2 files / 22 tests passed, 0 failed, 0 skipped**. `o1_console_fulfillment_ui.vitest.ts` was excluded per the correction with zero verdict weight; neither it nor its dependency paths were edited.

## PASS proofs

- **No mock/demo row:** 0 occurrences of `MOCK`, `DEMO`, `mockOrders`, `demoRows`, `sampleRows`, `FIXTURE_ORDERS` in the orders page; no sample row exists in the table.
- **One bounded real read:** exactly 1 `o1OperatorOrderList(50)`, after runtime flag → root `dashboard.operations.read` → `orders.read` → `fulfillment.read` with same-principal checks.
- **Malformed row fails closed:** 0 `String(index)`; `if (orderId.length === 0) return null;` then `if (rows === null) return <ClosedPage copy={STATE_COPY.UNAVAILABLE} />;`.
- **Accessibility naming:** 1 `aria-label={heading ?? "주문 목록"}`, 0 stale `aria-labelledby`.
- **Effects `0`:** no runtime, restart, redeploy, browser, DB, schema, migration, fixture, provider, economic or public-preview action; the listening preview was untouched; no install, generate, build, typecheck, or other test.
- **Git:** `git diff --check` clean; staged and committed exactly the three ceiling paths (`dashboard/orders/page.tsx`, `console/O1ConsoleFulfillment.tsx`, `scripts/o1_core_dashboard_orders.vitest.ts`); post-push tracked/untracked delta 0.

## Declared scope decision

Contract `122`'s optional local status filter is **omitted**, which that contract expressly permits when a bounded implementation cannot keep it purely local. Adding it would require client state and a control surface inside a server component, or a fourth path. No read-contract change was made.

## Not proven

Nothing rendered: no browser, runtime, typecheck or build ran, so the 1440×900 appearance, the ≤760px disclosure behaviour, keyboard/focus order, `role="status"` announcement and Korean glyph rendering are unverified here. The non-zero table path has never executed against real rows — only its source contract is pinned. The three pre-existing `o1_console_fulfillment_ui` failures recorded in `141` remain open and outside this module.

RETURN_TO: foundation-advisor
PROPOSED_NEXT_ACTOR: foundation-advisor
STOP
