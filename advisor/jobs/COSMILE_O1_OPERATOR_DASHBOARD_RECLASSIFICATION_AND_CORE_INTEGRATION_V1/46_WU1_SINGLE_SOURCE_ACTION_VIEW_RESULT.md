# WU-1 Single-Source Action/View Contract — Worker Result

MISSION: `COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1` · WU `WU-1_SINGLE_SOURCE_ACTION_VIEW_CONTRACT`
ACTOR: Cosmile Worker (Opus 4.8/xhigh) · `/fable-builder` (implementation-execution, contract-to-code-mapping, test-design-before-code) · CLAIM: `IMPLEMENTED_NOT_REVIEWED`.
Handoff verified SHA256 `7f0a9023…` ✓ blob `de11d1da…` ✓. PRODUCT_BASE `3390b1af` → HEAD **`9840c97`** clean/upstream-equal (non-force push `3390b1a..9840c97`). Result uncommitted.

## 1. Scope implemented (exact 4 paths, no 5th)

1. `app/src/lib/console/o1ConsoleView.ts` (new, +89) — the SINGLE pure source: `OperatorRequestDetail`, `OperatorRequestMode`, `TERMINAL_NONE`, `classifyOperatorRequestMode`, `operatorActionSurface` (now `+legacyActionsEnabled=true`), `CONSOLE_NAV` (9-row IA), `CONSOLE_STATE_VOCAB` (10 closed keys). No React/fetch/env/mutation/route.
2. `app/src/components/commerce/O1OperatorPanel.tsx` (+18/−55) — removed the local classifier/surface/type/`TERMINAL_NONE`; imports + re-exports them from the module (predecessor compat, reference-preserving); added `legacyActionsEnabled?: boolean` (default true); action region now renders from `operatorActionSurface(mode, legacyActionsEnabled)` via `surface.section`. `submitOperatorSupportAck` retained (fetch stays in the panel, not the pure module).
3. `app/scripts/o1_console_view.vitest.ts` (new) — `WU-1 single-source Console view contract` block.
4. `app/scripts/o1_operator_request_detail_ui.vitest.ts` (+32) — `WU-1 shared action contract and legacy disable` block.

## 2. Contract mapping (handoff §§1-7)

§1 verbatim move + import/re-export, ONE implementation source — panel declares 0 of `function classifyOperatorRequestMode|function operatorActionSurface|const TERMINAL_NONE`; `panel.classifyOperatorRequestMode === consoleView.classifyOperatorRequestMode` (reference-equal). §2 classifier semantics byte-preserved (null→legacy; refund/support exact; terminal→settled; else→hold). §3-4 `legacyActionsEnabled` default true, legacy+false → `{op-hold-warning, controls:[]}` (removes controls only, no authority), non-legacy flag-invariant. §5 IA labels/hrefs exact (5 active `/console(/orders|/fulfillment|/finance|/settings)` + 4 inert `준비 중 · 동작 없음`, `ariaDisabled=true`, no href). §6 vocabulary = exactly the 10 reviewed keys with the P2 §2.2 truthful phrases. §7 module purity asserted by source-contract.

## 3. Tests (exact named RED→GREEN, cache off, temp symlink)

- RED (both exit 1): `ERR_MODULE_NOT_FOUND` for `@/lib/console/o1ConsoleView` (single-source module absent) — meaningful, first-failure preserved.
- GREEN: `o1_console_view` **5/5**; `o1_operator_request_detail_ui -t 'WU-1 …'` **3/3** (8 M3F `-t`-filtered/skipped, per "do not run full file"). Identical commands RED and GREEN.
- No assertion weakened/deleted; no full file/suite/build/typecheck/lint/install/generate run.

## 4. Proven / not proven

Proven: single implementation source (reference equality + no-redeclaration source-contract), fail-closed classifier, legacy control-removal gating, closed IA + vocabulary, module purity. Not proven here (out of scope / not run): live DOM render, the 8 M3F tests at this HEAD (preserved by construction — re-export reference-preserving, default-true byte-equivalent, all M3F-checked panel strings present), and any WU-2 Console route.

## 5. Effects / cleanup / rollback

Schema/migration 0 · API/route/fetch/server-authority 0 · DB/provider/economic 0 · package/config 0 · deferred-feature behavior 0. Worktree `node_modules` absent pre-run; temp symlink → canonical, removed after each run; canonical `package.json`+lock byte-identical pre/post; no symlink/cache/process residue. Git: one additive commit, non-force push only, no main/force. Rollback: `git revert 9840c97` restores the prior in-panel single-file classifier (the module + tests are additive; no data/schema to unwind).

RETURN_TO: `foundation-advisor` · STOP before WU-2.
