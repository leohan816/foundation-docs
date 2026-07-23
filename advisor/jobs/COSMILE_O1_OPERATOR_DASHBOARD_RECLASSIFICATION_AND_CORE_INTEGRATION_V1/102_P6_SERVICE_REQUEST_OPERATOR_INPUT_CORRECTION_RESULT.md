# P6 Service-Request Operator Input Correction — Worker Result

MISSION: `COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1` · WU `P6_SERVICE_REQUEST_OPERATOR_INPUT_CORRECTION`.
ACTOR: Cosmile Worker (Opus 4.8/xhigh) · `/fable-builder`. Handoff 101 verified SHA256 `a04ded71…` ✓ blob `f384d4f1…` ✓ (docs HEAD `31f21de7`). BASE `6a7f270` → HEAD **`f212747`** clean/upstream-equal (non-force push `6a7f270..f212747`). Result uncommitted. Only the result-100 first build failure was in scope; no sweep. Codex idle.

## Exact 1 path — two nested renames only

`app/scripts/o1_order_service_request.vitest.ts`: renamed the **two** nested `operator: { actorRef: … }` inputs to `operatorRef` (the reviewed `OperatorContext` requires `operatorRef`):
- line 375 — `M4A_INPUT.operator`;
- line 410 — the viewer override `{ ...M4A_INPUT, operator: { operatorRef: "hidden", role: "viewer" } as never }`.

`git diff --numstat` = `2  2` (two lines, property name only). Preserved: **values, roles, the `as never` cast, spacing** (`operatorRef: ` keeps the original space), and all assertions. This file contains **no top-level repository/audit `actorRef`** field (confirmed: total `actorRef` in file was exactly these two nested ones), so none was touched. Post-change nested `operator: { actorRef` count = 0.

## RED/GREEN — truthful record

Ran the frozen named test `M4A forwards every closed result once with category-only reasons and failAudit false` (`--cache=false`, temp symlink) once **before** and once **after**:

- Before: **1 passed | 23 skipped**, exit 0 — **GREEN, not RED** (this behavioral test forwards closed results and checks category-only reasons; it does not depend on `operator.operatorRef` at runtime, and Vitest does not type-check). Reported straight.
- The **authoritative RED is the preserved P6 build type-check failure** (result 100: `'actorRef' does not exist in type 'OperatorContext'` at line 375), which handoff 101 designates as authoritative and forbids re-running here. No build/typecheck was run.
- After: identical named command, **1 passed | 23 skipped**, exit 0 — GREEN.

## Effects / cleanup / rollback

Values/roles/casts/assertions/repository-input/behavior change: **0** — two test-input property names only. One-path containment proven (`git diff --cached --name-only` = the single test path). Dependency: worktree `node_modules` absent pre-run; temp symlink → canonical, removed after each run; canonical `package.json`=`a486716…`/`package-lock.json`=`36dfa1a…` byte-identical pre/post; no symlink/cache/process residue. Git: one additive commit, non-force push only, no main/force. Rollback: `git revert f212747`.

RETURN_TO: `foundation-advisor` · STOP before the next P6 gate. This addresses the result-100 `OperatorContext.actorRef` type error in the M4A service test. The full P6 gate (9-file cumulative Vitest → conditional Next `--webpack` build) is the authoritative next step; not run here per scope.
