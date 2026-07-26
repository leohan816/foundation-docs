# Advisor handoff — M4 E2 diagnostic only

VERDICT: `PROCEED_WITH_LIMITS`

MISSION: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1`
MODULE: `M4_INVENTORY_HOLD_E2_DIAGNOSTIC`
ACTOR: existing `cosmile:claude.0` Worker
RUNTIME: Claude Opus 5 / xHigh, exact mission worktree, same preserved context
SKILL: `/fable-builder`; existing test-design-before-code discipline remains loaded

## Pins and preserved state

- Product base: `33ff6a7a841affb8d4c984beb4b251e416e38286`
- Preserve the exact uncommitted eight-path M4 delta and the three E1 test-oracle corrections.
- E1 evidence: docs `b8e08d0b1d88bef6686b80aa5a3870ce951e86dc`, result `172`, pointer `173`.
- `inventory.read` is not part of M4. Do not edit `app/src/lib/operator/capability.ts`.

## Exact action

Run exactly once, with untruncated failure output and no pipe, tail, or output filter:

```bash
cd -- /home/leo/Project/.worktrees/Cosmile/COSMILE_CORE_OPERATIONS_DASHBOARD_V1/app
./node_modules/.bin/vitest run scripts/o1_core_dashboard_reads.vitest.ts scripts/o1_core_dashboard_inventory.vitest.ts --config vitest.config.ts --reporter=verbose
```

Return only:

- exact failing suite and test name;
- exact assertion/message and expected/received category;
- exact token, if the assertion names one;
- exit status and pass/fail/skip counts;
- confirmation that no file changed during this diagnostic.

## Forbidden

- No source or test edit in this run.
- No shell, operator-authority, or other test.
- No diagnosis beyond the direct failure output.
- No install, build, typecheck, DB, schema, migration, grant, runtime, browser, provider, economic action, commit, push, or M5.

## Return

Write only:

- `advisor/jobs/COSMILE_CORE_OPERATIONS_DASHBOARD_V1/175_M4_E2_DIAGNOSTIC_RESULT.md`
- `advisor/jobs/COSMILE_CORE_OPERATIONS_DASHBOARD_V1/176_M4_E2_DIAGNOSTIC_POINTER.md`

Result ceiling: 40 lines. Pointer ceiling: 20 lines.
Return to `foundation-advisor` and STOP. Advisor alone decides whether evidence proves an in-ceiling oracle defect.
