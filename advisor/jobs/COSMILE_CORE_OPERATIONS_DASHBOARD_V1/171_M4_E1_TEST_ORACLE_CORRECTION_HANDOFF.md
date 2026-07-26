# Worker handoff — M4 E1 test-oracle correction

BASE STATE: product `33ff6a7a841affb8d4c984beb4b251e416e38286` plus the exact uncommitted eight-path M4 delta recorded in `168/169`. Preserve all five source paths unchanged.

SKILL/MODEL: same Worker, Claude Opus 5/xHigh, `/fable-builder` test-design-before-code reference already loaded.

## Exact correction paths

1. `app/scripts/o1_core_dashboard_inventory.vitest.ts`
2. `app/scripts/o1_core_dashboard_reads.vitest.ts`
3. `app/scripts/o1_core_dashboard_shell.vitest.ts`

No fourth path; no product source change.

## Exact corrections

- Gate order and prohibited visible-claim checks must scan comment-stripped executable/page source, so negating implementation comments cannot determine the verdict.
- Pin the three inventory header label constants and their exact `<th>` placement instead of requiring literal text inside the JSX block.
- Isolate the `EVIDENCE_GAPS` array and assert D04 plus its retired copy are absent only from that block; preserve the generic closed-state legend and D07.
- Correct the stale shell-test comment that says Inventory lacks a read contract. Change no assertion beyond these five classified oracle defects.
- Preserve all authority, same-principal, real-catalog, bounds, malformed/missing/over-capacity fail-closed, no-mock/no-write/no-derived-sellable, stable-table, nav, and no-home-read assertions.

Run the identical frozen four-file command exactly once for corrected GREEN:

`cd app && ./node_modules/.bin/vitest run scripts/o1_core_dashboard_inventory.vitest.ts scripts/o1_core_dashboard_shell.vitest.ts scripts/o1_core_dashboard_reads.vitest.ts scripts/operator_authority_contract.vitest.ts --config vitest.config.ts`

On PASS only: `git diff --check`; verify exact original eight-path containment, product source semantics unchanged from the HOLD delta, effects `0`; one commit, one non-force push, compact result/pointer, STOP. Any failure is HOLD with no diagnosis/rerun. M5 remains blocked.
