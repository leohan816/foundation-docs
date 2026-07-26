# Advisor handoff — M4 E3 oracle fix and GREEN

VERDICT: `PROCEED_WITH_LIMITS`

MISSION: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1`
MODULE: `M4_INVENTORY_HOLD_E3`
ACTOR: existing `cosmile:claude.0` Worker
RUNTIME: Claude Opus 5 / xHigh, exact mission worktree, same role/session/context
SKILL: `/fable-builder`; test-design-before-code and implementation-report-template apply

## Evidence and classification

- Product base: `33ff6a7a841affb8d4c984beb4b251e416e38286`
- Preserve the exact uncommitted eight-path M4 delta.
- E2 evidence: docs `13144d6`; result `175`, pointer `176`.
- Classification: `WEAK_TEST_FOUND`. The no-derived-arithmetic oracle scans comment-stripped service source, but its helper removes only whole-line comments. The exact token `available` occurs only inside `unavailable` in a trailing negating comment on an executable line. The product implementation did not derive an available-to-sell value.

## Exact correction

Change only:

- `app/scripts/o1_core_dashboard_inventory.vitest.ts`

In that file's existing `code()` helper, preserve whole-line comment removal and additionally remove trailing `//` comments only when introduced by whitespace. Do not alter any protected assertion, token list, product source, or other test.

The helper must continue to expose executable identifiers such as a real `available` variable or calculation; it may only prevent comments from deciding the verdict.

Do not edit `app/src/lib/operator/capability.ts`; do not add `inventory.read`.

## Exact GREEN

Run once only:

```bash
cd -- /home/leo/Project/.worktrees/Cosmile/COSMILE_CORE_OPERATIONS_DASHBOARD_V1/app
./node_modules/.bin/vitest run scripts/o1_core_dashboard_reads.vitest.ts scripts/o1_core_dashboard_inventory.vitest.ts --config vitest.config.ts --reporter=verbose
```

Do not run shell, authority, or any other suite. On failure, return HOLD without diagnosis or rerun.

## PASS path only

1. Inspect the exact eight changed paths and run `git diff --check`.
2. Confirm all five product paths are unchanged from the preserved M4 delta and only the inventory test changed in E3.
3. Confirm `capability.ts` untouched, no ninth path, and effects `0`.
4. Commit exactly the eight M4 paths as `feat(cosmile): add inventory operations read view`.
5. Non-force push; verify clean/upstream-equal.
6. Write:
   - `advisor/jobs/COSMILE_CORE_OPERATIONS_DASHBOARD_V1/178_M4_E3_ORACLE_FIX_RESULT.md`
   - `advisor/jobs/COSMILE_CORE_OPERATIONS_DASHBOARD_V1/179_M4_E3_ORACLE_FIX_POINTER.md`

## Forbidden

No second GREEN, diagnostic, install, build, typecheck, DB, grant, schema, migration, runtime, browser, provider, economic effect, M5, other file, co-author trailer, force push, or next module.

Result ceiling: 80 lines. Pointer ceiling: 25 lines. Return to `foundation-advisor` and STOP.
