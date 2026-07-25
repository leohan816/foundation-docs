# M5-E4 Stale Space Contract — Worker Handoff

MISSION_ID: COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1
VERDICT: PROCEED_WITH_LIMITS
REVIEW_TIER: SMALL — no independent Reviewer
ACTOR: existing Cosmile Claude Worker
SESSION: cosmile:claude.0
MODEL_EFFORT: Claude Opus 4.8 / xhigh
WORKTREE: /home/leo/Project/.worktrees/Cosmile/COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1
BASE: cf92a7cb09eb9542376a815a0a1d008adeda3d20
SKILL: /fable-builder; test-design-before-code and implementation-report-template

EXACT_PRODUCT_PATH:
- app/scripts/o1_console_space_contract.vitest.ts

FAILURE_CLASSIFICATION: CONTRACT_DRIFT_FOUND
PRESERVED_RED: M5 focused gate exit 1; 1 failed / 147 passed / 1 skipped. Do not rerun RED.

EXACT_CORRECTION:
- Replace only the stale dashboard-root test title/assertions.
- Remove the superseded M1 placeholder expectations and the obsolete prohibition on `o1Operator`.
- Preserve and assert the approved M3A contract: shared `OperatorShell`; `o1RuntimeEnabled`; `authorizeConsoleOperator`; capability `dashboard.operations.read`; fail-closed `DENIED`; reviewed cards D01/D03/D04/D05/D07; truthful `UNAVAILABLE`.
- Preserve prohibitions on direct `prisma`, `fetch(`, and `<button` in the dashboard root.
- No assertion weakening, snapshot update, product code, runtime, schema, authority, provider, DB, or economic change.

COMMAND_CEILING:
1. Apply only the exact test hunk using preserved RED.
2. Run only the exact changed dashboard-root test with a `-t` filter once.
3. `git diff --check`; inspect exact one-path diff and clean residue.
4. On PASS commit once, truthful Claude attribution or no co-author trailer, non-force push.
5. On first failure revert only this turn and return HOLD; no retry or M5 gate continuation.

RETURN:
- Compact evidence to existing job paths `118_M5_E4_WORKER_RESULT.md` and `119_M5_E4_WORKER_POINTER.md`.
- Include protected contract/risk, classification, exact test result, effects 0, Git state.
- RETURN_TO foundation-advisor and STOP.
