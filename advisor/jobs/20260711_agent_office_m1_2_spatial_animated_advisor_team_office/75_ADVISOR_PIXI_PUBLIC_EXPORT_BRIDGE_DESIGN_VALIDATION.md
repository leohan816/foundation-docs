# 75 Advisor Pixi Public-Export Bridge Design Validation

## Verdict

```text
ADVISOR_VALIDATION: PROCEED_TO_FABLE5_LEVEL3_DESIGN_REVIEW
TARGET_COMMIT: 56385b894ff18fd65a4e59f2c4e75f73ea2a56d9
DESIGN_STATUS: CANDIDATE_PENDING_FABLE5_LEVEL3_REVIEW
IMPLEMENTATION_STATUS: PAUSED_NOT_AUTHORIZED
FULL_INTEGRATION_STATUS: DEFERRED_WITH_GATE
```

## Decision Fidelity

The committed delta implements the exact Leo/GPT Option A design decision:

- TypeScript remains `6.0.3`;
- global `skipLibCheck` remains `false`;
- `pixi.js@8.19.0` and `@pixi/react@8.0.5` remain exact;
- only public package-root runtime imports are allowed;
- deep `node_modules` imports and import suppressions are forbidden;
- one prototype-only JavaScript bridge and one adjacent bounded declaration are
  specified;
- full authenticated integration remains `DEFERRED_WITH_GATE`; and
- source implementation remains paused until a clean same-session Fable5
  Level-3 design PASS and a later exact Advisor handoff.

No new product, authority, security, package, compiler, production, or
integration decision appears in the delta.

## Direct Git and Scope Validation

- Agent Office branch:
  `shadow/agent-office-m1-2-spatial-office`
- Parent:
  `9611d0da1479ca5e7a9677641fe767a6b39b4a38`
- Candidate:
  `56385b894ff18fd65a4e59f2c4e75f73ea2a56d9`
- Candidate equals its upstream, ahead/behind `0/0`.
- Commit changes exactly three authorized Markdown paths, `+625/-12`.
- Runtime source, tests, dependencies, lockfile, config, media, baseline,
  `.gitignore`, and dirty `docs/FEATURE_INDEX.md` were not committed.
- The prepared prototype remains unstaged in the same Worker worktree.
- Foundation Docs result commit:
  `ad0b2921d9a0c83eda01792c8321e22779fee25f`
- Foundation Docs pointer commit:
  `17eb05b6920e575476b04b9601f2311f65c3dac0`

## Direct Technical Validation

Advisor independently confirmed from the installed lockfile and public package
root modules:

```text
@pixi/react: 8.0.5
public root values: Application, extend, useTick

pixi.js: 8.19.0
public root values: Container, Graphics, Sprite, Texture, VERSION
```

The committed design does not pretend that a bare Node ESM import proves the
browser package boundary. Static contract checks own source and package
identity; Vite/browser tests own runtime execution. That separation is
appropriate but must be independently reviewed.

The proposed local declaration:

- imports only React types and two local structural ports;
- has no Pixi vendor type import;
- exposes no generic vendor namespace, `extend`, wildcard module, global
  augmentation, index signature, or broad `any` escape hatch;
- binds exact application, container, graphics, texture, and ticker calls; and
- requires explicit runtime value/lifecycle/version validation and existing
  DOM-static/M1 fallback proof.

## Remaining Independent Review Questions

Advisor does not self-approve these points. Fable5 must directly verify:

1. the declaration skeleton is sufficient and internally type-correct for the
   actual four prepared consumers without widening or suppression;
2. the planned JavaScript wrappers can preserve current React/Pixi ref,
   application, drawing, texture, and ticker behavior through public roots;
3. the fail-closed exception path reaches the existing renderer fallback before
   the canvas becomes authoritative;
4. runtime and package identity tests cannot pass on hardcoded strings alone;
5. the exact implementation allowlist is complete but not broader than needed;
6. the one legacy dependency assertion change preserves rather than weakens its
   gate; and
7. no prototype-only bridge can silently enter authenticated/production
   composition.

## Reviewer Routing Decision

- Target actor: Sentinel
- Selected reviewer: fable5 Sentinel
- Target session: existing `reviewer-fable5/%5`
- Model and effort: `<Fable5: Max>`
- Required skill: `/fable-sentinel`
- Review level: Level 3
- Reason: strict type-boundary compatibility, runtime lifecycle, security
  fallback, dependency integrity, and a later implementation gate require the
  strongest independent design review.
- Not selected: Control/Opus are unnecessary because Leo/GPT already fixed the
  architecture choice; Codex SOL cannot be independent from the Codex Worker
  context for this pass.
- One reviewer is sufficient: this is a narrow prototype-only technical delta
  with no production/authenticated integration and an exact later
  implementation review still required.
- Return result to: Advisor
- Status: READY_TO_USE

## Boundary

This validation grants no implementation, prototype acceptance, media
acceptance, full integration, production, or final approval.
