# Founder Workspace Cleanup Delta 02

```text
MISSION: FOUNDER_WORKSPACE_CLEANUP_DELTA_02
PRIOR_RESULT: NEEDS_PATCH__TOP_LEVEL_FOLDER_CONSOLIDATION_NOT_COMPLETED
VALIDATION_MODE: DELTA_ONLY
PRODUCT_TESTS: NOT_REPEATED
VISUAL_REVIEWS: NOT_REPEATED
SLACK_IMPLEMENTATION: NOT_STARTED_NOT_AUTHORIZED
```

Required final state: `/home/leo/Project/agent-office` is the only visible
top-level Agent Office project directory. Completed temporary worktrees must be
removed with `git worktree remove`, their remote branches and commits preserved,
and worktree metadata pruned.

The stale Designer process must be stopped or absent. Its `AGENTS.md` and
accepted records must be preserved before removing the top-level Designer
workspace. Download bundles must leave `/home/leo/Project`.

Only status, process/workspace use, worktree metadata, top-level listing, and
remote-reachability checks are authorized for this delta.
