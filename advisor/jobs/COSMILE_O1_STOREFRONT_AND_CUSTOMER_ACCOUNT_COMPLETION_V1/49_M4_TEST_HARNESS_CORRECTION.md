# M4 Test-Harness Correction

MISSION_ID: `COSMILE_O1_STOREFRONT_AND_CUSTOMER_ACCOUNT_COMPLETION_V1`
MODULE: `M4_RESPONSIVE_A11Y_FLOOR`
BASE: `4991ef6dd2532add3d4e28ad5733bbffdd3caf2a`
DELTA_ONLY_VERIFICATION: `REQUIRED`

## Preserved first result

The original frozen command collected zero tests because `o1_browser_runtime_contract.vitest.ts` imports product chains that require the absent generated `.prisma/client/default`. This is an environment/test-discovery failure, not a behavioral RED. Do not generate, install, retry that file, or treat it as verdict evidence.

## Corrected exact path ceiling

Replace the test path, keeping two paths total:

1. `app/src/app/globals.css`
2. `app/scripts/o1_storefront_a11y_floor.vitest.ts` (new source-only test)

First use `apply_patch` to remove only the current uncommitted 35-line M4 addition from `app/scripts/o1_browser_runtime_contract.vitest.ts`, restoring that file byte-identical to `HEAD`. Do not use checkout/reset and do not edit any other existing content.

Move the same frozen assertions, without weakening them, into the new source-only test. It may import only `vitest` and `node:fs` and read `globals.css`; it must not import product modules or Prisma. Then:

1. Run only `./node_modules/.bin/vitest run scripts/o1_storefront_a11y_floor.vitest.ts -t "O1 a11y floor" --cache=false` and preserve the assertion-based RED.
2. Apply only the frozen CSS behavior in handoff 48 to `globals.css`.
3. Run the identical command once and require GREEN.

All behavior, exclusions, skill references, closure requirements, and STOP rules from handoff 48 remain unchanged. Final actual delta must be exactly the two corrected paths. No install, generate, other test, broad gate, DB/runtime/browser/provider/network, component change, or third path.

RETURN_TO: `foundation-advisor`
STOP.
