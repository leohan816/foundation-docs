# Advisor Modular Team Strip Design Brief

## Decision

`PROCEED_WITH_LIMITS`

The Founder has resolved the layout model. No new product decision is required
for this bounded static design proof.

## Actor

```text
SESSION: agent-office-designer
LOCATOR: $21 / @21 / %21
MODEL: GPT-5.6 SOL
EFFORT: max
ROLE: Agent Office Product Designer
IMPLEMENTATION: FORBIDDEN
```

## Design target

- Worktree: `/home/leo/Project/agent-office-a1r-team-strip-layout`
- Branch: `a1r/modular-team-strip-layout-001`
- Base: `11cdf8074511f29808abb28edb9e8aaedfb03b8f`
- Output root: `docs/ui/a1r/modular-team-strip/`

The prior A/B/C scene candidate is preserved as superseded reference evidence.
It is not the composition base for this package.

## Required deliverables

1. `MODULAR_TEAM_STRIP_SYSTEM.md`
2. A deterministic reusable construction source and machine-readable module
   manifest in a static design format selected by the Designer. This is the
   primary deliverable.
3. Canonical reusable asset sources or one canonical atlas with explicit crop,
   anchor, state, and tint metadata for:
   Advisor, Designer, Worker, Reviewer, desk, chair, monitor, Mission Board,
   shelf, plant, Channy, assembled Worker workstation, floor, corridor, lane,
   drag handle, state indicator, sign, and every visible ambient/decoration
   object.
4. `module-catalog.png`
5. `team-strip-small.png`
6. `team-strip-medium.png`
7. `team-strip-large.png`
8. `stacked-team-strips.png`

The composition source is a static design artifact, not runtime application
code. It must prove that repeated modules use the same source asset rather than
independently regenerated approximations.

Nothing visible may exist only as one-off pixels in an exported image. Every
visible instance must reference a manifest module ID. An instance may occur
once in a specific proof, but the underlying definition, anchor, state, and
placement rules must support reuse in any Team Strip without redrawing.

## Fixed geometry contract

Each horizontal Team Strip spans the office canvas width and uses the same
fixed vertical lanes and slot anchors:

1. Designer Zone: two fixed Designer slots.
2. Advisor + Mission Board: one fixed Advisor anchor and one fixed board.
3. Worker Zone: five fixed identical workstation slots, nearest Advisor first.
4. Reviewer Zone: two fixed Reviewer slots in a visually independent area.

Small, Medium, and Large examples must use identical strip dimensions, lane
positions, slot coordinates, furniture geometry, character proportions, camera,
and scale. Only slot occupancy, monitor state, Team accent, and truthful UI data
may differ.

Use these demonstration occupancies unless direct design evidence requires a
documented equivalent:

- Small: 1 Designer, 1 Advisor, 1 Worker, 1 Reviewer.
- Medium: 1 Designer, 1 Advisor, 3 Workers, 1 Reviewer.
- Large: 2 Designers, 1 Advisor, 5 Workers, 2 Reviewers.

## Visual and behavior contract

- Management-simulation UI, not a painting or presentation board.
- One coherent 2D/2.5D or 45-degree game camera.
- Advisor stands while coordinating and sits while idle.
- Designer works at a pen display.
- Worker is shown from the rear while typing.
- Reviewer reviews documents.
- Working monitor: bright white UI; idle monitor: black/off.
- Team colors affect clothing and restrained accents only.
- No visible Team-strip divider lines, walls, or barriers.
- The clear vertical corridor between adjacent Team Strip content bounds must
  exceed one full canonical standing-character height; target at least `1.25x`
  that height. Furniture, labels, boards, plants, drag controls, and decoration
  must remain outside this clear zone.
- Shared corridors remain visibly traversable by Channy and must make the
  stacked office feel open rather than compressed.
- Channy is a recognizable Bedlington Terrier module and has no operational
  authority.
- Drag handles and reorder affordance may be shown as UI, but no interaction is
  implemented in this static pass.

## Proof requirements

- The three Team sizes must not be separately generated full scenes.
- The system source and manifest are the reviewed product; PNGs are proof
  exports and must not become the source of truth.
- A module reuse table must map every visible repeated object to its canonical
  source ID and instance count.
- A coverage check must report zero visible objects without a module ID.
- A placement table must show that all shared anchors are identical across
  Small, Medium, and Large.
- `stacked-team-strips.png` must show at least three strips on one continuous
  canvas, with open corridors and a visible continuation affordance below.
- Reorder proof must explain that order changes data order only, not strip
  geometry or Team authority.
- Empty slots must feel intentional and breathable rather than broken.
- No labels or decorative composition may compensate for unclear role behavior.

## Allowed tools and files

- Built-in image generation may be used to create the canonical reusable asset
  source or atlas only.
- Static composition/export tooling may be created under the output root.
- Small/Medium/Large/stacked outputs must be composed from that canonical source.
- Write only under `docs/ui/a1r/modular-team-strip/` in the target worktree.
- Write the durable Designer result and Advisor pointer only to the designated
  `foundation-docs` paths.

## Forbidden

- Runtime application implementation.
- React, PixiJS, production CSS, routes, state stores, or API changes.
- Separately generated complete office illustrations.
- One-off props, flattened bespoke backgrounds, unique furniture, unique floor
  details, or any visible object absent from the module manifest.
- Enclosed Team rooms, walls, or fixed architecture tied to Team count.
- Different desks, chairs, monitors, body proportions, or workstation geometry.
- Team inference from color, proximity, session name, or project name.
- Worker, Reviewer, Control, or additional agent/sub-agent dispatch.
- Batch B-E, discovery, delivery, watchdog, DB, authentication, remote/public,
  production, secrets, or authority changes.

## Validation and completion

- Open all five PNGs at original size.
- Verify composition-source reuse and repeated asset identity.
- Verify Small/Medium/Large strip geometry equality.
- Verify fixed maximum slot counts and nearest-Advisor Worker ordering.
- Verify working/off monitor states visually.
- Verify stacked strips have open shared corridors and no separator walls.
- Record dimensions, SHA-256 hashes, generation count, failed commands, branch,
  commit, push, clean state, and rollback.
- Commit and non-force push only the authorized branch.
- Return to Advisor and stop. Do not self-approve or start implementation.

## Timebox

Target 45–75 minutes; hard maximum 90 minutes. Prefer one coherent canonical
module set and deterministic composition over polishing unrelated scenes.
