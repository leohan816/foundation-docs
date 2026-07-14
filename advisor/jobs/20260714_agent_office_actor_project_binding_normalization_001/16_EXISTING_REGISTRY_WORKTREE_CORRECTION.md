# Existing Registry Worktree Correction

The canonical registry was confirmed to exist on the reviewed Batch A lineage,
not on the older `ac8ba75` branch used by the superseded first handoff.

## Required Correction

- Remove the Worker's aborted, untracked `src/application/organization/` files
  from `/home/leo/Project/agent-office`. They are not accepted evidence and must
  not be copied or adapted.
- Continue in the authorized worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_ACTOR_PROJECT_BINDING_NORMALIZATION_001`
- Branch: `normalization/actor-project-binding-001`
- Base: `58a484b088b4e57e7b3ee6e582f54c7f3ce6dc85`
- Modify the existing canonical registry schema in place. Do not invent a
  self-contained replacement, new interfaces, or a second registry.
- Preserve unrelated Batch A product source and tests. Run only the focused
  organization-registry test needed for the changed values.

All other constraints in the bounded brief and Founder timebox remain active.
