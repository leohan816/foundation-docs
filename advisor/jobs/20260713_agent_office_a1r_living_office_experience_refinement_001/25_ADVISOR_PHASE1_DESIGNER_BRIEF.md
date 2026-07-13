# Advisor Brief - Phase 1 Living Office Visual Directions

## Actor and Exact Target

- Actor: dedicated Agent Office Product Designer
- Session: `agent-office-designer` (`$21 / @21 / %21`)
- Runtime: verify `GPT-5.6 SOL max` before dispatch
- Role file: `/home/leo/Project/agent-office-designer/AGENTS.md`
- Design worktree: `/home/leo/Project/agent-office-a1r-visual-recovery-v2`
- Branch: `a1r/living-office-visual-recovery-v2`
- Base: rejected candidate `11cdf8074511f29808abb28edb9e8aaedfb03b8f`
- Pass: `A1R_VISUAL_RECOVERY_PHASE1_PRODUCT_SCENE_DIRECTIONS`

The base preserves semantics and rejection evidence. It is not a visual
reference. Do not edit or replace the rejected mockups.

## Required Direct Reads

Read only the high-signal sources needed for Phase 1:

1. `/home/leo/Project/agent-office-designer/AGENTS.md`
2. `24_FOUNDER_VISUAL_DESIGN_RECOVERY_DECISION_V2.md`
3. `00_FOUNDER_MISSION.md`, limited to product principles, spatial/behavior
   contract, Channy, and preserved boundaries
4. `23_FOUNDER_STATIC_MOCKUP_REJECTION_AND_DESIGNER_ROUTING.md`
5. the five rejected PNGs at original size, only to understand what must not be
   repeated

Do not read the full test suite, runtime implementation, old patch loop, or
complete repository unless one exact semantic ambiguity blocks the scene.

## Exact Deliverables

Produce exactly three distinct directions under:

`docs/ui/a1r/visual-recovery-v2/phase1/`

Allowed files:

- `PHASE1_VISUAL_DIRECTIONS.md`
- `direction-a.png`
- `direction-b.png`
- `direction-c.png`

Each PNG must be one scene-only product image, at least `1400x900`, directly
reviewable at full size. Concept name, one-line theme, generation provenance,
and short visual rationale belong only in the Markdown file.

Do not put concept titles, requirement annotations, traceability tables,
geometry labels, explanatory prose, or implementation notes inside the images.

Use original raster visual generation when useful. The `imagegen` skill is
authorized for these concept scenes. Do not use external purchased/licensed
assets or imitate a protected game style. If a high-fidelity scene cannot be
produced with available tools, return a blocker instead of substituting an SVG
diagram or wireframe.

## Scene Contract

Every direction must independently pass all of the following without requiring
labels:

- a warm, original pixel or pixel-inspired 2D/2.5D living office;
- coherent 45-degree/3/4 camera, floor, furniture, people, and depth;
- three or more recognizable human characters with consistent proportions;
- at least one seated working pose with visible chair, desk, keyboard, monitor,
  hands/body orientation, and believable work activity;
- visually distinct Advisor coordination, Worker production, and independent
  Reviewer behavior through pose and work surface;
- one believable Advisor Team Pod fragment inside an inhabited office;
- visible paths, props, lighting, and environmental detail that imply movement;
- a clearly recognizable, appropriately visible Bedlington Terrier Channy;
- production-intended palette, atmosphere, and emotional tone;
- minimal secondary UI, with the office world visually dominant.

The three directions must be meaningfully different in spatial composition,
atmosphere, and visual personality, not color swaps of one layout.

## Automatic Rejection Conditions

Return `DESIGN_NOT_READY` and iterate before publication if any direction:

- resembles a presentation slide, mood board, floor-plan diagram, dashboard,
  wireframe, or specification sheet;
- uses circles, blocks, or abstract tokens as people;
- requires labels to explain who is working;
- hides desks, chairs, keyboard, monitor, hands, or work posture;
- has inconsistent perspective or floating/disconnected furniture;
- is mostly empty floor, large cards, or flat Team-color polygons;
- makes Channy cloud-like, generic, tiny, or unrecognizable;
- feels sterile, emotionally flat, or implementation-convenient;
- contains illegible generated text or unsupported operational claims.

## Boundaries

- Phase 1 only; no full desktop or mobile package.
- No interaction boards, character sheets, Channy pose sheets, motion proof,
  prototype, runtime code, tests, dependencies, or implementation.
- Do not modify Worker workspace or rejected artifacts.
- Do not invoke Control, Worker, Reviewer, another session, agent, sub-agent, or
  delegated context.
- Do not change product semantics, Team authority, security, delivery, discovery,
  recovery, DB, remote/public, or Batch B boundaries.
- Do not self-review or claim Founder approval.

## Designer Self-Check and Result

Open each final PNG at original size and record a boolean self-check for every
scene-contract and rejection condition. Check image dimensions, hashes, exact
file scope, clean Git state, non-force push, and no rejected-artifact edits.

Commit and push the design branch. Then write:

- Result: `/home/leo/Project/foundation-docs/runs/agent-office/20260713_agent_office_a1r_living_office_experience_refinement_001/DESIGNER_PHASE1_VISUAL_DIRECTIONS_RESULT.md`
- Pointer: `/home/leo/Project/foundation-docs/advisor/jobs/20260713_agent_office_a1r_living_office_experience_refinement_001/27_DESIGNER_PHASE1_RESULT_POINTER.md`

Report exact runtime, model, effort, base/candidate, files, dimensions, SHA-256,
tool/provenance, failed attempts, limitations, Git/upstream state, and rollback.
Return a short pointer to Advisor and stop. Do not route Reviewer or Worker.
