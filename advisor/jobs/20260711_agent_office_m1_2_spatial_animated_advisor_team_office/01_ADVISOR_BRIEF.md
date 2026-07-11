# Advisor Brief: Agent Office M1.2 Spatial Office Design

## Instruction Verdict

`PROCEED_WITH_LIMITS`

The mission is authorized for canonical design and independent design review.
Implementation remains explicitly unauthorized. The current repository is clean
at the closed M1 commit and both existing role sessions are idle and correctly
located.

## Direct Inventory Findings

### Repository and stack

- Agent Office is clean at
  `2f663304a88c432f19fe56055641b66e57f18ef2`, equal to
  `origin/shadow/agent-office-m01`.
- Current browser stack is React 19, TypeScript, Vite, Lucide, DOM/CSS, and
  local project-authored SVG components. There is no Canvas, WebGL, Three.js,
  game engine, sprite library, or animation dependency.
- The current office is a fixed 4-by-2 grid of eight station cards. The role IDs
  are a closed union in `src/ui/scene/types.ts`.
- Current routing animation is derived from accepted structured event IDs and
  fixed source/target station coordinates. Terminal prose cannot create state.
- Existing accessibility includes keyboard station navigation, semantic status,
  live regions, reduced-motion suppression, stable dimensions, mobile
  pagination, and visual regression baselines.
- `LocalProjectRegistry` supports multiple registered projects, but the office
  projection and current mission dashboard are not a dynamic multi-project
  spatial model.

### Evidence gaps

- No current source or canonical document defines `Channy`.
- No current Team Pod, Single Advisor Team Principle, project-color registry,
  lounge, actor-character identity, or dynamic spatial-floor contract exists.
- Current generic actor SVG has no role-specific or project-specific identity.
- Current committed visual baselines prove the M1 grid, not the requested M1.2
  experience.
- Asset style, Channy role, and future multi-pod density require explicit design
  gates; they cannot be inferred from the M1 code.

## Required Design Boundary

The M1.2 design must extend the M1 projection without changing authority:

1. Git evidence, manifests, structured events, pointers, and reviews remain the
   truth source.
2. Spatial position and animation are projections only.
3. Exactly one Advisor authority is visibly responsible for each Team Pod. This
   does not create a new Advisor, transfer authority, or imply that one Advisor
   cannot oversee more than one project.
4. Reviewer independence must remain visually and logically distinct from the
   Worker execution chain.
5. Ambient and idle behavior must never imply unverified work, review,
   collaboration, delivery, completion, or approval.
6. Unknown/stale/offline/critical evidence must suppress motion that could imply
   activity.
7. Mobile and reduced-motion modes must preserve the same state truth, not a
   simplified or inferred substitute.

## Canonical Candidate Ownership

Agent Office owns the M1.2 product and UI design. Candidate documents are written
only in `../agent-office/docs/` on the dedicated design branch. Foundation-docs
stores governance, handoffs, review artifacts, and pointers only.

## Expected Candidate Files

- `docs/architecture/AGENT_OFFICE_M1_2_SPATIAL_OFFICE_MASTER_DESIGN.md`
- `docs/contracts/AGENT_OFFICE_M1_2_SPATIAL_EVENT_ANIMATION_CONTRACT.md`
- `docs/ui/AGENT_OFFICE_M1_2_CHARACTER_PROJECT_IDENTITY_SYSTEM.md`
- `docs/operations/AGENT_OFFICE_M1_2_IMPLEMENTATION_WORKUNIT_PLAN.md`
- `docs/FEATURE_INDEX.md` pointer update only

## Completion Criteria

- The design directly cites actual M1 code and canonical documents.
- Every frozen design question is answered, gated, or explicitly returned to
  Leo/GPT.
- The package defines implementation batches and verifiable acceptance criteria
  without authorizing implementation.
- Fable5 performs Level-3 design review against exact committed files and diff.
- Advisor returns the design package, unresolved decisions, and verdict to
  Leo/GPT; no implementation begins.
