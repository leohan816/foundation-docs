# Cosmile Worker Handoff

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M1-COSMILE-CURRENT-STATE-AUDIT
TARGET_ACTOR: cosmile Worker
TARGET_SESSION: cosmile
ROLE: Worker
MODE: READ_ONLY_AUDIT
TARGET_REPOSITORY: /home/leo/Project/Cosmile
BASELINE_BRANCH: shadow/m4-cosmile-memory
BASELINE_COMMIT: 6e44aa40ffb2960573839a01424761dc5e98d610
REQUIRED_SKILL: /fable-builder
EFFORT_TARGET: HIGH_OR_XHIGH
RETURN_TO: foundation-advisor
```

Read directly before acting: current Agent Office operating model, `roles/worker.md`, `RUN_PROTOCOL.md`, `RESULT_REPORTING_PROTOCOL.md`; Cosmile `AGENTS.md` and `CLAUDE.md`; the exact mission handoff; and `01_ADVISOR_INTAKE_AND_SCOPE.md`.

Audit only Cosmile's repository-local contribution to V3-00 through V3-12, especially recommendation creation/exposure/click/view/cart/purchase/outcome/feedback/repurchase/refund-use-stop, product/ingredient mapping, candidate extraction, safety, analytics, outbox, and Package 1B containment. Record actual paths, symbols, commits, migrations, tests, and historical evidence. Do not infer DB rows or provider/runtime behavior that cannot be proven read-only.

The repository is fully read-only. Preserve the six intake untracked files. Apply all test and prohibited-action gates in the exact handoff. No DB, secrets, provider/network, fetch, branch action, source/config/schema/migration/flag/generated/fixture/snapshot/lockfile/runtime write.

Write only:

```text
/home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/cosmile/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/COSMILE_WORKER_RESULT.md
/home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/cosmile/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/COSMILE_WORKER_RESULT_POINTER.md
```

Include every Section 13 field, exact Git pre/post state, allowed status matrix, separate `REMAINING_DELTA`, safe-test decision, unknowns/blockers/Founder decisions, and explicit zero product-write/DB-query/flag-change evidence. Do not commit or push. Return only the pointer to `foundation-advisor`, then STOP.

