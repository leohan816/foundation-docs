# Agent Office Root Role-Entry Completeness Correction

## Why the First Patch Is Not Review-Ready

Direct Advisor inspection of candidate `911a45b650b7b0e3424940fcc715f5e7b7d0e0e3`
found a residual role contradiction:

1. both root files still say every actor's role/scope comes from an exact
   committed **Advisor handoff**, but the Advisor receives a Leo/GPT mission or
   decision, not a handoff from itself;
2. `RUN_PROTOCOL.md` and `RESULT_REPORTING_PROTOCOL.md` remain mandatory reads
   for every role even though the accepted operating model identifies them as
   Worker execution/result protocols;
3. Worker-specific return/STOP and exact-handoff language remains phrased as if
   it applies identically to the Advisor, Designer, and Reviewer.

Do not send `911a45b` to review. Correct only this residual defect.

## Exact Route

- Same Worker/session: `agent-office-opus`.
- Required skill: `/fable-builder`; directly read
  `/home/leo/Project/skill/fable-builder/SKILL.md`.
- Repository/branch: `/home/leo/Project/agent-office`,
  `shadow/agent-office-m1-2-spatial-office`.
- Exact base: `911a45b650b7b0e3424940fcc715f5e7b7d0e0e3`.
- Allowed repository files only: `AGENTS.md`, `CLAUDE.md`.
- Update the existing result only:
  `/home/leo/Project/foundation-docs/runs/agent-office/20260714_agent_office_actor_project_binding_normalization_001/ROLE_ENTRY_PATCH_WORKER_RESULT.md`.

## Required Semantics

1. **Advisor entry:** active Advisor authority comes from a Leo/GPT mission or
   decision plus verified actor/runtime binding and `roles/advisor.md`.
2. **Subordinate entry:** Designer, Worker, Reviewer, or Control authority comes
   from an exact committed Advisor handoff plus verified actor/runtime binding
   and the matching role document.
3. Session name alone proves none of actor, role, model, effort, readiness, or
   authority. Any disagreement fails closed to the responsible Advisor, or to
   Leo/GPT when the active actor is the Advisor.
4. Common mandatory reads for all roles are the root files, Team operating
   model, matching role document, and current role-appropriate authority input.
   `RUN_PROTOCOL.md` and `RESULT_REPORTING_PROTOCOL.md` are mandatory for Worker
   assignments only, unless another role's exact authority explicitly names
   them for read-only audit context.
5. Worker execution/Git/result/STOP rules remain fully intact but are explicitly
   scoped to Worker assignments. Designer and Reviewer follow their matching
   role documents and handoffs. Advisor follows `roles/advisor.md`, writes the
   mission audit, and returns to Leo/GPT; it never implements or self-reviews.
6. Exact scope-lock language must distinguish Leo/GPT authority for the Advisor
   from Advisor handoff authority for subordinates. Neither path grants work
   beyond the exact mission/handoff.
7. Preserve every safety, security, branch, dispatch, evidence, role-separation,
   and next-mission boundary from `911a45b`.

## Forbidden and Validation

All forbidden scope and targeted checks from brief `38` remain in force. In
addition, targeted search must prove there is no remaining universal statement
that an Advisor requires its own Advisor handoff, reads Worker protocols as a
normal prerequisite, or returns its result to itself.

Commit and non-force push only the two allowed files. Update the existing Worker
result with both commits, every check/failure/skip, upstream equality, explicit
machine-registry/AS1 deferral, and a new SHA-256. Return to
`agent-office-advisor` and stop; do not dispatch the Reviewer.
