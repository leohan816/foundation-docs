# WU-5 R4 Async Operator Authorization Correction — Worker Result

MISSION: `COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1` · WU `WU-5_R4_ASYNC_OPERATOR_AUTHORIZATION_CORRECTION` · CLAIM `IMPLEMENTED_NOT_REVIEWED`.
ACTOR: Cosmile Worker (Opus 4.8/xhigh) · `/fable-builder`. Handoff 67 verified SHA256 `deb7c2aa…` ✓ blob `156d368f…` ✓. BASE `cb67af4` → HEAD **`6c4c3ca`** clean/upstream-equal (non-force push `cb67af4..6c4c3ca`). Result uncommitted.

## Safety defect corrected

Both WU-5 pages imported `o1OperatorForCustomer` from `@/lib/console/o1ConsoleView` (which does not export it) and gated on `if (!operator)` over an **un-awaited** call. A `Promise` is always truthy, so `!operator` is always `false` → the frozen fail-closed operator gate never denied (**fail-open**). Corrected to the existing async runtime resolution used by the known-good `console/orders` sibling, gating on the resolved discriminant.

## Exact 3 paths (four one-line corrections per page + one named test)

1. `app/src/app/console/page.tsx` and 2. `app/src/app/console/settings/page.tsx`, each:
   - removed `o1OperatorForCustomer` from the `@/lib/console/o1ConsoleView` import (view constants only remain: root `CONSOLE_NAV, CONSOLE_STATE_VOCAB`; settings `CONSOLE_STATE_VOCAB`);
   - added `import { o1OperatorForCustomer } from "@/lib/runtime/o1CommerceRuntime";`;
   - `const operator = o1OperatorForCustomer(process.env, shopper.userId);` → `const operator = await o1OperatorForCustomer(process.env, shopper.userId);`;
   - `if (!operator) {` → `if (operator.kind !== "operator") {`.
   Gate order (session → runtime flag → shopper → operator), `CONSOLE_STATE_VOCAB.denied` text, JSX, data reads, and actions unchanged. No new authority/runtime implementation.
3. `app/scripts/o1_console_shell_ui.vitest.ts` — added the named test only.

## Tests first — named RED → identical GREEN

Added test `awaits runtime operator resolution and denies every non-operator result`. For both page sources it requires the `@/lib/runtime/o1CommerceRuntime` import of `o1OperatorForCustomer`, the absence of that symbol in the `o1ConsoleView` import, the exact `const operator = await o1OperatorForCustomer(process.env, shopper.userId);`, `if (operator.kind !== "operator")`, and the absence of `if (!operator)`.

- RED (exact `-t 'awaits runtime operator resolution and denies every non-operator result'`, exit 1): `expected 'import Link from "next/link";…' to contain 'import { o1OperatorForCustomer } from…'` (runtime import absent, un-awaited truthiness gate present).
- GREEN (identical command): **1 passed | 8 skipped**, exit 0.
- No cumulative gate, build, typecheck, lint, install, DB, browser/runtime, provider, or economic command run. The final module-resolution/compile proof is the authorized final P6 re-gate build, not run here.

## Effects / cleanup / rollback

Auth/runtime implementation, new authority, UI, config, schema/DB, provider, economic change: **0** — behavior change is only the intended tightening from fail-open to fail-closed at the operator gate, via the existing async function. Dependency: worktree `node_modules` absent pre-run; temp symlink → canonical, removed after each run; canonical `package.json`=`a486716…`/`package-lock.json`=`36dfa1a…` byte-identical pre/post; no symlink/cache/process residue. Git: one additive commit, non-force push only, no main/force. Rollback: `git revert 6c4c3ca`.

RETURN_TO: `foundation-advisor` · STOP before the final P6 re-gate. This safety correction remains subject to the frozen final Fable 5/max review. (WU-5 correction round 4.)
