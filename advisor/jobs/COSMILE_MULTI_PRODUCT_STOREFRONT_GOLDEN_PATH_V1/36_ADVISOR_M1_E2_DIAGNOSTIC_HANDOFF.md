# M1 E2 — one focused diagnostic

MISSION_ID: `COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1`
BASE: product `1efde21e2942696b585b8c27e2980e97795cb3e1` plus the preserved
uncommitted exact eight-path M1/E1 delta.
ACTOR: same existing Cosmile Worker, Opus 5 / xhigh.

The E1 run is preserved at `1 failed / 10 passed (11)`, but its filtered output
did not identify the failed test/assertion. Perform exactly one diagnostic run
of the identical focused command with untruncated failure output:

`cd app && ./node_modules/.bin/vitest run scripts/o1_multi_product_storefront.vitest.ts --config vitest.config.ts`

No file edit, source read, install, other test, build, typecheck, DB, browser,
runtime, provider, network, commit, or product action. Return only the exact
failed test name, assertion/message, expected/received category, counts and
exit; write `37_WORKER_M1_E2_DIAGNOSTIC_RESULT.md` and
`38_WORKER_M1_E2_DIAGNOSTIC_POINTER.md`, commit/push those docs only, STOP.
