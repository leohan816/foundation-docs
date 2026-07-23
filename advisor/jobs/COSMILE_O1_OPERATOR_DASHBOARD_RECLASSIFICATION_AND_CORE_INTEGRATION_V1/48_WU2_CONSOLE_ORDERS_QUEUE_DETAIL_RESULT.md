# WU-2 Console Orders Queue/Detail — Worker Result

MISSION: `COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1` · WU `WU-2_CONSOLE_ORDERS_QUEUE_DETAIL` · CLAIM `IMPLEMENTED_NOT_REVIEWED`.
ACTOR: Cosmile Worker (Opus 4.8/xhigh) · `/fable-builder`. Handoff verified SHA256 `a349924b…` ✓ blob `a8e9f6ee…` ✓. BASE `9840c975` → HEAD **`7abbd92`** clean/upstream-equal (non-force push `9840c97..7abbd92`). Result uncommitted.

## 1. Exact 4 new paths (no 5th; nothing else modified)

1. `app/src/app/console/orders/page.tsx` — force-dynamic queue page.
2. `app/src/app/console/orders/[orderId]/page.tsx` — force-dynamic detail page.
3. `app/src/components/console/O1ConsoleQueue.tsx` — presentational queue + pure `consoleQueueRowView`.
4. `app/scripts/o1_console_orders_ui.vitest.ts` — `WU-2 Console orders queue and detail gate` block.

## 2. Contract mapping (handoff)

Fail-closed server boundary (both pages, in order): `await requireConsoleUser()` (Console session, never O1 authority) → `o1RuntimeEnabled(process.env)` false → `notFound()` → `await getShopper()` + `await o1OperatorForCustomer(process.env, shopper.userId)` (Google immutable-subject allowlist) → only `operator.kind === "operator"` continues; denial renders `CONSOLE_STATE_VOCAB.denied` and reads no data. Queue: only `o1OperatorServiceRequestQueue(50)`; `repository_error` → `queue_error` (distinct from `empty`); zero rows → `empty`. Detail: no eligibility, no data read; decode+bound the route id (`notFound()` on empty/>256) then render exactly `<O1OperatorPanel orderId={orderId} legacyActionsEnabled={false} />`. Queue projection (`OperatorServiceRequestQueueRow` only): opaque orderNo, Korean category-safe kind/status label, exact requested time (Asia/Seoul), WU-1 category badge (refund/support/HOLD; unknown→HOLD). Internal orderId appears ONLY in the encoded href + React key. No PII/amount/provider/refund id/raw error/free text/button/form/input/fetch/client eligibility.

## 3. Tests (one exact named RED→GREEN, cache off, temp symlink)

- RED (exit 1): `ERR_MODULE_NOT_FOUND` for `@/components/console/O1ConsoleQueue` — meaningful, first failure preserved.
- GREEN (identical command): **6/6 passed**, exit 0.
- Test-construction correction (disclosed, not a weakening): an intermediate GREEN had 2 false-positives from the source itself being correct — (a) `indexOf("o1OperatorServiceRequestQueue")` matched the *import line* not the call → tightened to `o1OperatorServiceRequestQueue(50)` + `o1OperatorForCustomer(process.env` (strengthens: proves CALL order); (b) a bare-word prohibited-field regex matched the component's own security *comment* ("No customer/…, amount/currency") → tightened to `row.<field>` access (proves no prohibited field is read). Both changes make the assertions stricter about real leaks; no assertion removed/weakened; the visible-field set is independently proven exact by `consoleQueueRowView` (5 allowed keys, no orderId in visible fields).
- No full file/suite/predecessor/build/typecheck/lint/generate/install/DB/runtime/browser command run.

## 4. Effects / cleanup / rollback

Schema/migration 0 · API/route/runtime/auth edit 0 · new server authority 0 · economic/provider/DB mutation 0 · root/layout/nav/settings 0 · deferred-feature behavior 0. The existing O1 GET/POST routes remain the sole detail/action authority and re-check operator/step-up/nonce/economic truth independently; the Console session never substitutes O1 allowlist. Dependency: worktree `node_modules` absent pre-run; temp symlink → canonical, removed after each run; canonical `package.json`+lock byte-identical pre/post; no symlink/cache/process residue. Git: one additive commit, non-force push only, no main/force. Rollback: `git revert 7abbd92` removes the four additive files; no data/schema to unwind.

## 5. Not proven / STOP-clear

Live DOM render and predecessor WU-1/M3F suites not run here (out of scope / "no full file"); the pages are proven by source-contract ordering + the pure projection function. No extra path/endpoint/client eligibility/authority substitution/schema/economic behavior/missing contract was required.

RETURN_TO: `foundation-advisor` · STOP before WU-3.

---

## WU-2-R1 — fail-closed decode correction (appended)

Defect: `decodeURIComponent(raw)` on the detail route param could throw a raw `URIError` for a malformed percent-encoding (e.g. `%`) instead of failing closed. Correction (SMALL, exact 2 paths, BASE `7abbd92` → HEAD **`4bf2baa`**):
- `app/src/app/console/orders/[orderId]/page.tsx`: decode wrapped in `try { … } catch { notFound(); }`; existing empty/whitespace/over-256 bounds still `notFound()`. Smallest guard only; no other behavior/path.
- `app/scripts/o1_console_orders_ui.vitest.ts`: added named block `WU-2-R1 malformed encoded orderId fails closed` — invokes the page default export with mocked collaborators (notFound throws a sentinel; panel is a spy) and proves `%`, `%zz`, `%E0%A4%A`, `%C0`, `ord%GG`, empty, whitespace-only, and over-256 all reach `notFound()` with the panel NEVER rendered, while a valid bounded id still renders the panel with `legacyActionsEnabled=false`.
- RED (exact `-t 'WU-2-R1 malformed encoded orderId fails closed'`, exit 1): "expected [Function] to throw error including 'NEXT_NOT_FOUND' but got 'URI malformed'" — malformed decode was unguarded. GREEN (identical): **1 passed | 6 skipped**, exit 0. Existing WU-2 tests untouched (the added mocks touch only the detail-page invocation; the source-contract tests read files and never import them). No full WU-2 rerun/build/typecheck.
- Effects 0 (schema/API/auth/economic/DB/provider); temp symlink removed, canonical `package.json`+lock byte-identical, no residue. One additive commit, non-force push (`7abbd92..4bf2baa`), clean/upstream-equal. Rollback: `git revert 4bf2baa`.

RETURN_TO: `foundation-advisor` · STOP.
