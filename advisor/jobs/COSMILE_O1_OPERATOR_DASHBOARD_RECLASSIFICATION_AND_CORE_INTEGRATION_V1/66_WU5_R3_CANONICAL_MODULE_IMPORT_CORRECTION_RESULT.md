# WU-5 R3 Canonical Module Import Correction — Worker Result

MISSION: `COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1` · WU `WU-5_R3_CANONICAL_MODULE_IMPORT_CORRECTION` · CLAIM `IMPLEMENTED_NOT_REVIEWED`.
ACTOR: Cosmile Worker (Opus 4.8/xhigh) · `/fable-builder`. Handoff 65 verified SHA256 `809798a5…` ✓ blob `dd685fc5…` ✓. BASE `561b943` → HEAD **`cb67af4`** clean/upstream-equal (non-force push `561b943..cb67af4`). Result uncommitted.

## Exact 3 paths (four specifier replacements + one named test; nothing else)

1. `app/src/app/console/page.tsx` — 2 import specifiers repointed (symbols unchanged).
2. `app/src/app/console/settings/page.tsx` — same 2 import specifiers repointed.
3. `app/scripts/o1_console_shell_ui.vitest.ts` — one named test added under the existing WU-5 block.

### The four invalid → canonical specifiers
- `import { getShopper } from "@/lib/auth/shopper";` → `import { getShopper } from "@/lib/shopper";`
- `import { o1RuntimeEnabled } from "@/lib/order/o1CommerceRuntime";` → `import { o1RuntimeEnabled } from "@/lib/runtime/o1NonprodConfig";`

(each in both pages). Canonical targets are the modules used by the known-good sibling `src/app/console/orders/page.tsx` and confirmed present (`src/lib/shopper.ts`, `src/lib/runtime/o1NonprodConfig.ts`). Import **symbols** (`getShopper`, `o1RuntimeEnabled`), gate order, calls, JSX, and behavior were not touched. The pre-existing `o1OperatorForCustomer` import from `@/lib/console/o1ConsoleView` (which resolved cleanly at P6 gate 2 and is a WU-5 re-export) was intentionally left unchanged — out of this correction's scope.

## Tests first — named RED → identical GREEN

Added test: `uses canonical shopper and nonproduction runtime modules on root and settings`. For both `rootSource` and `settingsSource` it requires `import { getShopper } from "@/lib/shopper";`, `import { o1RuntimeEnabled } from "@/lib/runtime/o1NonprodConfig";`, and the **absence** of `@/lib/auth/shopper` and `@/lib/order/o1CommerceRuntime`.

- RED (exact `-t 'uses canonical shopper and nonproduction runtime modules on root and settings'`, exit 1): `expected 'import Link from "next/link";…' to contain 'import { getShopper } from "@/lib/sho…'` — the absent alias was still present.
- GREEN (identical command): **1 passed | 7 skipped**, exit 0.
- No cumulative gate, build, typecheck, lint, install, DB, browser, provider, or economic command run. (This is a test-only observation of the import specifiers; the final module-resolution proof is the authorized P6 re-gate build, not run here.)

## Effects / cleanup / rollback

Auth/runtime implementation, behavior, UI, config, manifest, schema/DB, provider, economic change: **0**. Only four import specifier strings and one additive test changed. Dependency: worktree `node_modules` absent pre-run; temp symlink → canonical, removed after each run; canonical `package.json`=`a486716…`/`package-lock.json`=`36dfa1a…` byte-identical pre/post; no symlink/cache/process residue. Git: one additive commit, non-force push only, no main/force. Rollback: `git revert cb67af4`.

RETURN_TO: `foundation-advisor` · STOP before the final P6 re-gate. (WU-5 correction round 3; any further WU-5 product defect returns to Advisor before correction.)
