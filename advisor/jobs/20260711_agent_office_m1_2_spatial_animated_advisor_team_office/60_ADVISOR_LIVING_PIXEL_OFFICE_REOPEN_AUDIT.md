# Advisor Reopen Audit - Living Pixel-Office Final Patch

## Verdict

`PROCEED_WITH_DESIGN_ONLY__PROTOTYPE_CONDITIONAL_ON_FABLE5_PASS__FULL_IMPLEMENTATION_BLOCKED`

## Current evidence

- Agent Office is clean and upstream-equal at
  `48c8dbd9f2c5ecea68c28e85137d75db595ef5f9`.
- Existing M1.2 authority, projection, security, accessibility, and rollback
  foundations passed independent Level-3 review and remain accepted.
- The current renderer is DOM/SVG/CSS and its canonical design explicitly
  rejected Canvas/WebGL/game-engine dependencies. That decision is now
  superseded for the primary renderer by Leo/GPT's product-intent correction.
- React 19 is already present. `pixi.js` and `@pixi/react` are absent.
- Official current documentation states that `@pixi/react` 8 supports React 19
  and PixiJS 8. PixiJS accessibility is opt-in and implemented through aligned
  DOM overlays, so an independent DOM semantic mirror remains mandatory.
- The existing `agent-office/%13` Worker and `reviewer-fable5/%5` Reviewer are
  the verified existing sessions; both are idle and retain their roles.

## Design gate

Official evidence checked on 2026-07-12:

- `https://react.pixijs.io/getting-started/`
- `https://www.npmjs.com/package/@pixi/react`
- `https://pixijs.com/8.x/guides/components/accessibility`

The Worker may change canonical Agent Office design documents only. It must
evaluate direct PixiJS versus `@pixi/react`, choose and justify one candidate,
define the world/camera/sprite/HUD/accessibility/fallback architecture, and
publish an exact prototype and implementation plan. It may not install
dependencies or modify runtime until the same Fable5 Reviewer returns a clean
Level-3 design PASS. That PASS authorizes only the bounded prototype. Full
integration still requires Leo/GPT visual-direction approval after the prototype.

## Safe default

The prior loopback synthetic demo is stopped and remains explicitly classified
as the rejected `EVIDENCE_BACKED_SPATIAL_DASHBOARD`, not final product evidence.
The accepted M1 static fallback remains available. No authority, public/remote,
DB, Hermes, asset-purchase, or dispatch boundary changes.
