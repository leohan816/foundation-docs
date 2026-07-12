# Control Design Brief

Mode: `CONTROL_MASTER_DESIGN_MODE`

Task: `AGENT_OFFICE_BATCH_A_APPLICATION_INTEGRATION_DESIGN_DELTA`

## Target

- Product repo/worktree: `/home/leo/Project/agent-office-batch-a-001`
- Branch: `batch-a/modern-office-identity-001`
- Exact base: `ac8ba75d3a128385beaeeac58ae5bf54c03d23f2`
- Result repo: `/home/leo/Project/foundation-docs`

## Required reads

Read directly:

- this brief and `00_INTAKE.md`, `01_ADVISOR_BRIEF.md`;
- Agent Office `AGENTS.md`, `CLAUDE.md`, `docs/agent/RUN_PROTOCOL.md`, and
  `docs/agent/RESULT_REPORTING_PROTOCOL.md`;
- `docs/architecture/AGENT_OFFICE_MASTER_DESIGN.md`;
- `docs/architecture/AGENT_OFFICE_M1_2_SPATIAL_OFFICE_MASTER_DESIGN.md`;
- `docs/architecture/AGENT_OFFICE_M1_2_LIVING_PIXEL_OFFICE_RENDERER_DESIGN.md`;
- `docs/contracts/AGENT_OFFICE_DOMAIN_EVENT_CONTRACT.md`;
- `docs/contracts/AGENT_OFFICE_M1_2_SPATIAL_EVENT_ANIMATION_CONTRACT.md`;
- `docs/security/AGENT_OFFICE_SECURITY_AUTHORITY_MODEL.md`;
- `docs/ui/AGENT_OFFICE_M1_2_PIXEL_WORLD_SPRITE_ANIMATION_SYSTEM.md`;
- `docs/operations/AGENT_OFFICE_M1_2_LIVING_PIXEL_OFFICE_IMPLEMENTATION_PLAN.md`;
- `docs/FEATURE_INDEX.md`;
- current source and tests named by the Advisor brief;
- the clean prior visual review result and pointer for `ac8ba75`;
- the Grok stop audit only as an exclusion warning.

## Canonical output owned by Agent Office

Create and commit only documentation in the Batch A worktree:

1. `docs/architecture/AGENT_OFFICE_BATCH_A_APPLICATION_INTEGRATION_DESIGN_DELTA.md`
2. `docs/contracts/AGENT_OFFICE_BATCH_A_IDENTITY_ORGANIZATION_CONTRACT.md`
3. `docs/operations/AGENT_OFFICE_BATCH_A_IMPLEMENTATION_WORKUNIT_PLAN.md`
4. `docs/FEATURE_INDEX.md` (pointer/status update only)

The design package must cover all 17 Founder-requested items, include an
architecture/component map, data contract, state model, routes/navigation,
organization model, WorkUnits, requirement matrix, proposed source scope,
acceptance gates, rollback, unknowns, and explicit Batch B-E exclusion.

## Design constraints

- Do not redesign accepted M1/M1.2 foundations from zero.
- Keep Pixi as visual world and DOM as navigation, labels, drawer, semantic
  mirror, reduced/static fallback, and secondary control surface.
- Use one validated frame/projection source; do not create a second truth model.
- Do not infer runtime/model/effort/state from names, position, timestamps,
  attached state, or terminal prose.
- Keep stable identity independent from mutable Team/Advisor assignment.
- Preserve M1 auth, exact Advisor delivery, communication, PWA, security, and
  fallback contracts unchanged.
- No implementation, package/config/source/test/media changes in this pass.

## Result contract

Write:

- `/home/leo/Project/foundation-docs/runs/agent-office/20260712_agent_office_batch_a_modern_office_identity_completion_001/CONTROL_DESIGN_RESULT.md`
- `/home/leo/Project/foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001/11_CONTROL_DESIGN_RESULT_POINTER.md`

Commit and non-force push the Agent Office design commit and the exact
Foundation Docs result/pointer. Report exact model/effort, files, commits,
checks, unresolved questions, and `RETURN_TO: Advisor`. Stop after returning.

