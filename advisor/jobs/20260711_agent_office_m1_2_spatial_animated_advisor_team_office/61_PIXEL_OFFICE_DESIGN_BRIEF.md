# Agent Office M1.2 Living Pixel-Office Design Brief

## Mode

`DESIGN_ONLY__NO_RUNTIME_OR_DEPENDENCY_CHANGE`

Target: existing Agent Office Worker session, repository
`/home/leo/Project/agent-office`, branch
`shadow/agent-office-m1-2-spatial-office`, base `48c8dbd`.

## Required canonical outputs

1. Add
   `docs/architecture/AGENT_OFFICE_M1_2_LIVING_PIXEL_OFFICE_RENDERER_DESIGN.md`.
2. Add
   `docs/ui/AGENT_OFFICE_M1_2_PIXEL_WORLD_SPRITE_ANIMATION_SYSTEM.md`.
3. Add
   `docs/operations/AGENT_OFFICE_M1_2_LIVING_PIXEL_OFFICE_IMPLEMENTATION_PLAN.md`.
4. Patch the existing M1.2 master design and `docs/FEATURE_INDEX.md` so the
   dashboard renderer is visibly superseded as the primary product experience
   but retained as accessibility/static/M1 fallback evidence.

## Mandatory technology evaluation

Evaluate, with direct evidence:

- React 19 plus `@pixi/react` 8 and PixiJS 8;
- direct imperative PixiJS 8 integration under React;
- DOM/SVG/CSS-only continuation as a rejected primary option but preserved
  fallback/detail layer;
- renderer startup, resize, ticker ownership, teardown, context loss, WebGL or
  Canvas capability failure, bundle cost, testability, SSR/PWA implications,
  and React lifecycle behavior;
- opt-in PixiJS accessibility overlays versus a separate DOM semantic mirror.

Select one preferred primary renderer and preserve deterministic fallback. Do
not install packages in this design pass.

## Mandatory design content

- office-world coordinate system and one shared floor;
- all Advisor Team Pods coexisting spatially;
- visible walls, flooring, desks/computers, glass meeting room, coffee lounge,
  walkways, Advisor hubs, Reviewer booth, signs, concise mission boards, and
  Channy bed/food/water;
- pan, zoom, selected-Team focus, full-office return, mobile Pod navigation,
  bounded camera and focus restoration;
- sprite-sheet/atlas contract for actor states: idle, walk, sit, type, review,
  carry document, return result, coffee/rest/lounge;
- Channy Bedlington Terrier states: roam, sit, eat, drink, sleep, play, and
  structured-status reaction, with no operational authority;
- project identity through clothing, signs, props, glyphs, patterns, and the
  approved project colors, never color alone;
- accepted structured-event mapping, precedence, deduplication, stale/conflict
  suppression, no delayed replay, no actor cloning, and neutral ambient state;
- concise in-world Team/mission/actor/status/progress/blocker or Leo-alert HUD;
- detailed evidence in a DOM drawer/popover/detail view, not over the world;
- keyboard, screen-reader, 200-percent text, high contrast, reduced motion,
  static equivalent, and unchanged M1 fallback;
- original project-authored pixel assets or generated code-native atlas sources,
  with license/ownership/hash manifests and no protected-style imitation;
- deterministic rendering, visual baseline, performance, teardown, memory,
  security-boundary, and rollback tests.

## Required visual acceptance matrix

Define exact viewport, state fixture, evidence source, expected visible content,
and screenshot/recording requirement for:

1. full-office desktop;
2. Foundation Advisor Team active;
3. VibeNews Team active;
4. routing/document handoff;
5. Reviewer activity;
6. lounge/idle scene;
7. Channy roaming;
8. Channy eating;
9. Channy sleeping;
10. `WAITING_LEO`;
11. `BLOCKED`;
12. mobile;
13. reduced-motion/static equivalent.

## Implementation plan requirements

Separate the plan into two hard-gated stages:

1. bounded prototype `AO12-PWU-07..10`, conditional only on a clean Fable5
   design PASS; and
2. full runtime integration `AO12-PWU-12..13`, blocked until explicit Leo/GPT
   prototype visual-direction approval.

The prototype plan must produce a directly viewable loopback-only synthetic
route plus a deterministic 20-to-30-second recording demonstrating all ten
Founder prototype scenes. It must not replace or select the production runtime.
Provide exact file surfaces, dependencies, tests, performance budgets, visual
proof, cleanup and rollback checkpoints, and review gates. No implementation is
authorized by the design document itself.

### Exact prototype media contract

Use the ignored local root:

`/home/leo/Project/agent-office/artifacts/m1-2-visual-prototype/`

Required outputs:

- `agent-office-living-office-prototype.webm`, 20 to 30 seconds, captured from
  the actually running prototype with Playwright browser video recording;
- `agent-office-living-office-prototype.mp4` converted from that recording;
- `agent-office-living-office-prototype.gif`, showing character walking, Channy
  roaming, and Advisor document handoff; and
- `full-office.png`, `team-activity.png`, `lounge.png`, `channy.png`, and
  `mobile.png`.

The recording must contain continuous movement and visible state transitions.
Do not assemble unrelated screenshots or count CSS hover-only effects as
animation. Verify that the artifact root is ignored before generation and never
commit large media. The evidence pointer must list every absolute path, byte
size, SHA-256, scenario description, prototype commit SHA, exact recording
command, and exact MP4/GIF conversion commands. The design must identify and
fail closed if the required local recording/conversion tools are unavailable.

## Forbidden

- runtime/source/test/dependency/lockfile/asset implementation;
- DB, secret, public/remote, production, Hermes, or auth/transport changes;
- external asset purchase/import or protected visual-style copying;
- browser-direct Worker/Reviewer dispatch or arbitrary shell;
- invented work state, authority, collaboration, or character cloning;
- self-review, final approval, or next mission.

## Result

Write the design result to:

`../foundation-docs/runs/agent-office/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/WORKER_LIVING_PIXEL_OFFICE_DESIGN_RESULT.md`

and the pointer to:

`../foundation-docs/advisor/jobs/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/63_WORKER_LIVING_PIXEL_OFFICE_DESIGN_RESULT_POINTER.md`

Return to Advisor and stop.
