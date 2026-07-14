# Founder Modular Team Strip Layout Decision

```text
MISSION: AGENT_OFFICE_A1R_LIVING_OFFICE_EXPERIENCE_REFINEMENT_001
DECISION: REPLACE_SINGLE_GENERATED_OFFICE_SCENE_WITH_MODULAR_TEAM_STRIP_SYSTEM
PREVIOUS_CANDIDATE: 870ffe9cbe37237f719283b23c0515451b9bbdf0
PREVIOUS_CANDIDATE_STATUS: SUPERSEDED_AS_LAYOUT_DIRECTION__PRESERVED_AS_VISUAL_REFERENCE_ONLY
IMPLEMENTATION: NOT_STARTED_NOT_AUTHORIZED
NEXT_ACTOR: agent-office-designer
```

Agent Office is a reusable office construction system for a management-game
interface. It is not a single generated office illustration. The system source
and module contract are the deliverable; rendered images are only proof that the
system composes correctly.

## Canonical layout

- One continuous office canvas.
- One Advisor Team equals one full-width horizontal Team Strip.
- Team Strips stack vertically and can be reordered by drag-and-drop.
- New Teams append below; there are no enclosed rooms or Team walls.
- The open space between strips is a shared corridor with substantially more
  breathing room than the superseded proposal.
- The clear vertical corridor between adjacent Team Strip content bounds must
  be greater than one full standing-character sprite height. The design target
  is at least `1.25x` the canonical standing-character height.
- No furniture, label, Mission Board, plant, drag handle, or decoration may
  consume that required clear corridor.
- Channy can move naturally through the shared corridor.

Every Team Strip has the same fixed internal lane order:

```text
Designer Zone
Advisor + Mission Board
Worker Zone
Reviewer Zone
```

The strip geometry, lane anchors, and furniture positions never redesign for
Team size. Capacity is represented by fixed slots: one Advisor, up to two
Designers, up to five Workers, and up to two Reviewers. Small and medium Teams
leave unused slots unoccupied; growth fills existing slots with identical
modules.

## Reusable assets

The canonical module set contains Advisor, Designer, Worker, Reviewer, desk,
chair, monitor, Mission Board, shelf, plant, Channy, and an assembled Worker
workstation. Body proportions and workstation geometry remain identical.
Team identity changes only approved clothing/accent tokens, never geometry.

Every visible object must resolve to a reusable canonical module ID. This
includes floor tiles, corridor surfaces, lane backgrounds, drag handles, status
indicators, signs, lighting/ambient elements, and decorative props. No bespoke
object, background detail, or flattened one-off drawing may exist only inside a
single proof image. A particular instance may appear once, but its definition
must be reusable by another Team Strip without redrawing.

Working monitors show a bright white UI. Idle monitors are off with a black
screen. Monitor state is the primary work indicator, while semantic state must
remain available for accessibility and must not be inferred from animation.

## Current authorized proof

The Designer must produce a modular design package and demonstrate Small,
Medium, and Large Teams using the same canonical modules. A vertically stacked
multi-Team proof must show that adding and reordering strips requires no
architectural redesign.

The primary artifact must be a reusable construction source plus a complete
module manifest. `module-catalog.png`, Small/Medium/Large, and stacked-strip PNGs
are secondary evidence exports generated from that system.

Do not generate Small, Medium, and Large as unrelated complete illustrations.
Their visual compositions must be assembled deterministically from one
canonical module source with recorded asset identity and placement evidence.
