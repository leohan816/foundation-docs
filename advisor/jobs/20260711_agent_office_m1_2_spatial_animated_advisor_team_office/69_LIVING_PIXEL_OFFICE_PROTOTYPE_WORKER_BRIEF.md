# Agent Office Living Pixel-Office Prototype Worker Brief

Status: `READY_TO_EXECUTE_AO12_PWU_07_THROUGH_09_ONLY`

## Objective

Build and record the isolated synthetic living pixel-office prototype defined by
the reviewed design at Agent Office commit `9611d0d`. The primary viewport must
be an original warm retro pixel/pixel-inspired game world, not a dashboard grid.
Produce directly reviewable WebM, MP4, GIF, and five PNG artifacts.

This brief authorizes only `AO12-PWU-07..09`. It does not authorize production
selection, authenticated integration, `AO12-PWU-12`, or final acceptance.

## Exact Target

```text
REPO: /home/leo/Project/agent-office
BRANCH: shadow/agent-office-m1-2-spatial-office
BASE: 9611d0da1479ca5e7a9677641fe767a6b39b4a38
UPSTREAM: origin/shadow/agent-office-m1-2-spatial-office
MODEL: GPT-5.6 SOL
EFFORT: ULTRA
SESSION: existing agent-office/%13 only
```

## Required Reads

- `docs/architecture/AGENT_OFFICE_M1_2_LIVING_PIXEL_OFFICE_RENDERER_DESIGN.md`
- `docs/ui/AGENT_OFFICE_M1_2_PIXEL_WORLD_SPRITE_ANIMATION_SYSTEM.md`
- `docs/operations/AGENT_OFFICE_M1_2_LIVING_PIXEL_OFFICE_IMPLEMENTATION_PLAN.md`
- `docs/architecture/AGENT_OFFICE_M1_2_SPATIAL_OFFICE_MASTER_DESIGN.md`
- `docs/FEATURE_INDEX.md`
- Advisor artifacts `59`, `62`, `64`, `66`, `68`, and `69`
- actual current repo instructions, source, package, tests, and Git state

## First Checkpoint

1. Revalidate exact branch/base/upstream/clean state and IPv4 loopback port.
2. Add only `/artifacts/m1-2-visual-prototype/` to `.gitignore`.
3. Prove the probe is ignored and no artifact path is tracked.
4. Verify `/usr/bin/ffmpeg` and `/usr/bin/ffprobe` plus required codecs/filters.
5. If any check fails, stop before dependency or source mutation.

## Exact Dependencies

After the first checkpoint only:

```text
npm install --save-exact pixi.js@8.19.0 @pixi/react@8.0.5
```

React and React DOM remain `19.2.7`. Stop on peer, license, audit, type, build,
or registry mismatch. Do not add any other renderer, state, camera, physics,
font, asset, animation, media, or video package.

## Authorized Repository Paths

Existing files:

```text
.gitignore
package.json
package-lock.json
src/ui/demo-entry.tsx
docs/FEATURE_INDEX.md
```

New implementation paths:

```text
src/ui/pixel/contracts.ts
src/ui/pixel/frame-projector.ts
src/ui/pixel/world-layout.ts
src/ui/pixel/pathfinder.ts
src/ui/pixel/camera.ts
src/ui/pixel/presentation-clock.ts
src/ui/pixel/prototype-entry.tsx
src/ui/pixel/renderer-boundary.tsx
src/ui/pixel/pixel-world-chunk.tsx
src/ui/pixel/pixel-world-scene.tsx
src/ui/pixel/world-clock.tsx
src/ui/pixel/actor-sprite.tsx
src/ui/pixel/channy-sprite.tsx
src/ui/pixel/facility-sprites.tsx
src/ui/pixel/world-camera.tsx
src/ui/pixel/living-office-hud.tsx
src/ui/pixel/living-office-semantic-mirror.tsx
src/ui/pixel/living-office-detail-drawer.tsx
src/ui/pixel/living-office.css
src/ui/pixel/assets/palette.ts
src/ui/pixel/assets/office-world-atlas.source.ts
src/ui/pixel/assets/actor-base-atlas.source.ts
src/ui/pixel/assets/actor-identity-atlas.source.ts
src/ui/pixel/assets/channy-atlas.source.ts
src/ui/pixel/assets/atlas-builder.ts
src/ui/pixel/assets/atlas-manifest.ts
src/ui/pixel/assets/ASSET_INVENTORY.md
src/ui/pixel/fixtures/prototype-projection.ts
src/ui/pixel/fixtures/prototype-scenarios.ts
src/ui/pixel/fixtures/prototype-timeline.ts
tests/ui/pixel-world-frame.test.ts
tests/ui/pixel-world-layout.test.ts
tests/ui/pixel-world-camera.test.ts
tests/ui/pixel-world-atlas.test.ts
tests/ui/pixel-world-animation.test.ts
tests/ui/pixel-world-semantic-parity.test.tsx
tests/ui/pixel-renderer-lifecycle.test.tsx
tests/performance/pixel-world-budget.test.ts
tests/acceptance/production-pixel-prototype-boundary.test.ts
tests/e2e/living-pixel-prototype.spec.ts
tests/e2e/living-pixel-prototype.recording.spec.ts
tests/e2e/baselines/living-pixel-prototype.spec.ts/**
playwright.pixel-prototype.config.ts
scripts/verify-living-pixel-prototype-evidence.mjs
```

The Worker may omit a proposed new path only when the same requirement is
implemented more simply inside another authorized new path and the result maps
the omission. It may not add another path without returning to Advisor.

## Product and Visual Requirements

- One shared office world dominates the viewport.
- All registered Advisor Team Pods coexist spatially on wide desktop.
- Visible floor, walls, desks, computers, glass meeting room, coffee lounge,
  walkways, Advisor areas, Reviewer booth, signs, boards, Channy bed/bowls.
- Actual sprite-style characters with continuous walk, sit, type, review,
  carry/hand-off, result-return, coffee, lounge, and idle cycles.
- Channy is a visible Bedlington Terrier sprite with roam, sit, eat, drink,
  sleep, play, and structured-status reactions; no authority.
- Project identity uses color plus clothing, signs, glyphs, patterns, and props.
- Office HUD stays concise; technical facts use a secondary DOM drawer/mirror.
- Camera supports pan, zoom, Team focus, full-office return, and mobile Pod nav.
- No cards-in-canvas, generic icon actors, hover-only motion, or still-image
  montage may satisfy the gate.

## Evidence Truth and Safety

- Use only the existing accepted structured projection/cue semantics.
- Every prototype fact is clearly labelled synthetic.
- Preserve precedence, deduplication, stale/conflict suppression, no replay,
  bounded cues, no actor clone, and fail-closed assignment behavior.
- Ambient behavior never implies work, availability, communication, or approval.
- Canvas is presentation-only; DOM mirror/drawer is complete and shares one
  immutable frame model with parity failure selecting static fallback.
- Production entry/runtime/Dashboard must not import prototype fixtures or
  timeline code. A fresh production bundle must contain zero prototype markers.

## Required Media

Use only owner-mode `0700` ignored local root:

```text
/home/leo/Project/agent-office/artifacts/m1-2-visual-prototype/
```

Create exactly:

```text
agent-office-living-office-prototype.webm
agent-office-living-office-prototype.mp4
agent-office-living-office-prototype.gif
full-office.png
team-activity.png
lounge.png
channy.png
mobile.png
```

The WebM must be a continuous 20-to-30-second Playwright recording of the
actually running IPv4-loopback prototype. MP4 and GIF derive from that WebM
using the exact reviewed commands. The GIF uses the continuous `6.0-13.0s`
segment. The five PNGs come directly from exact configured Playwright scenes.
Do not commit video/GIF delivery artifacts.

## Required Verification

Run every command in the reviewed implementation plan, including:

```text
npm run lint
npm run typecheck
npm test
npm run build:core
npm run build:dashboard
npm run build:dashboard:test
npm run audit:dependencies
npm run test:e2e:demo
npm run test:e2e:composed
npx playwright test --config playwright.pixel-prototype.config.ts --project=chromium --workers=1
node scripts/verify-living-pixel-prototype-evidence.mjs
git diff --check
```

Also prove all thirteen visual rows, WebGL/fallback/lifecycle/StrictMode/context
cleanup, semantic parity, 320px/mobile/200-percent/reduced-motion/forced-color/
keyboard/screen-reader behavior, numeric performance budgets, original asset
hash/license inventory, historical baseline immutability, ignored media, source
graph isolation, no remote request, and zero residual listener/browser process.

Directly inspect every required PNG and sample the WebM/GIF motion before
reporting. A passing automated test is not visual inspection.

## Git and Result

- Commit and push only the authorized repository paths to the exact shadow
  branch, non-force.
- Leave Agent Office clean and upstream-equal.
- Write result:
  `../foundation-docs/runs/agent-office/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/WORKER_LIVING_PIXEL_OFFICE_PROTOTYPE_RESULT.md`
- Write pointer:
  `../foundation-docs/advisor/jobs/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/70_WORKER_LIVING_PIXEL_OFFICE_PROTOTYPE_RESULT_POINTER.md`
- Result must include media absolute paths, byte sizes, SHA-256, duration,
  scenario description, prototype commit, capture/conversion commands, versions,
  screenshots inspected, test/build results, performance data, Git evidence,
  ignored/untracked proof, and cleanup evidence.

## STOP Conditions

Stop for any unlisted file, dependency/tool/version mismatch, protected-style or
external asset need, failed hard visual/accessibility/security/performance gate,
production import, media substitution, non-loopback request, auth/DB/transport/
Hermes scope, inability to roll back, or interactive approval request.

Do not invoke Fable5, approve the prototype, begin full integration, or start
another mission. Return only to Advisor.
