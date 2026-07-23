# P6 Build Contract Correction — Worker Result

MISSION: `COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1` · WU `P6_BUILD_CONTRACT_CORRECTION`.
ACTOR: Cosmile Worker (Opus 4.8/xhigh) · `/fable-builder`. Handoff 76 verified SHA256 `ed32beef…` ✓ blob `51190550…` ✓ (docs HEAD `3f758dd8`). BASE `b627c4f` → HEAD **`f48a30e`** clean/upstream-equal (non-force push `b627c4f..f48a30e`). Result uncommitted. Codex idle.

## Exact 5 paths (nothing else)

1. NEW `app/src/lib/order/o1OrderServiceRequestBadge.ts` — pure module holding `deriveO1OrderServiceRequestBadge`, moved **byte-for-byte** from the route page (proven: original function body at base `b627c4f` `diff`s identically to the new module's function).
2. `app/src/app/account/orders/page.tsx` — removed the exported function; added `import { deriveO1OrderServiceRequestBadge } from "@/lib/order/o1OrderServiceRequestBadge";`. Page now has only its default export; the `deriveO1OrderServiceRequestBadge(o.serviceRequest)` usage and all history rows/JSX unchanged.
3. `app/scripts/o1_order_service_request_browser.vitest.ts` — direct import repointed from `../src/app/account/orders/page` to `../src/lib/order/o1OrderServiceRequestBadge`; added to the named M2D source test: require the page import from `@/lib/order/o1OrderServiceRequestBadge` and forbid `export function deriveO1OrderServiceRequestBadge` in the page.
4. `app/src/app/console/finance/page.tsx` — split the import: `o1OperatorForCustomer` stays from `@/lib/runtime/o1CommerceRuntime`; `readO1ReconciliationProjection` now from `@/lib/runtime/o1ReliabilityRuntime` (its canonical exporter). No other line changed.
5. `app/scripts/o1_console_finance_ui.vitest.ts` — added to the named `fails closed…` test: require `o1OperatorForCustomer` from `o1CommerceRuntime`, require `readO1ReconciliationProjection` from `o1ReliabilityRuntime`, forbid binding the projection reader to `o1CommerceRuntime`.

## Tests first — two named RED → identical GREEN

Exact command (both files, both named tests via `-t` alternation, `--cache=false`, temp symlink), run once for RED then identically for GREEN:

- RED (exit 1): finance test → `expected … to match /import…readO1ReconciliationProjection…o1ReliabilityRuntime/` (was bound to o1CommerceRuntime); M2D test → `expected … to contain 'import { deriveO1OrderServiceRequestBadge } …'`. Both failed only on the newly frozen import/export assertions; preserved.
- GREEN (identical command): **2 passed | 20 skipped**, exit 0. Byte-for-byte move verified (`FUNCTION_BYTE_FOR_BYTE=yes`).
- No P6, build, other test, full file, typecheck, lint, install, generate, DB, provider, runtime, or browser command run.

## Effects / cleanup / rollback

UI/state/schema/authority/provider/economic/runtime behavior change: **0** — a pure helper relocated (identical body) plus a corrected import module. Five-path containment proven (`git diff --cached --name-only` = exactly the five paths; `create mode` for the new module). Dependency: worktree `node_modules` absent pre-run; temp symlink → canonical, removed after each run; canonical `package.json`=`a486716…`/`package-lock.json`=`36dfa1a…` byte-identical pre/post; no symlink/cache/process residue. Git: one additive commit, non-force push only, no main/force. Rollback: `git revert f48a30e` (and the new file is removed by the revert).

RETURN_TO: `foundation-advisor` · STOP before P6. Both P6 gate-2 defects (invalid page export `c0bb0aa` lineage; WU-4 wrong-module import `372c1fa`) are corrected at test-first frozen contracts. The full P6 gate (9-file cumulative Vitest → conditional Next `--webpack` build) is the authoritative next step; not run here per scope.
