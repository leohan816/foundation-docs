# Advisor Validation - Control Production Render Scope Correction

## Verdict

`NEEDS_TARGETED_CONTROL_CORRECTION_BEFORE_SENTINEL`

The chosen fixture-free split is directionally sound, but candidate `9caff0e`
is not yet implementation-deterministic. Direct current-code inspection found
three load-bearing contradictions. They are technical design defects within the
already approved Batch A scope, not Founder product or risk decisions.

## Candidate And Scope Verification

- exact candidate: `9caff0e5edbcd0d29f0fd38c0835b9399c85b838`
- exact docs-only candidate diff: `9caff0e^..9caff0e`
- changed paths: the four canonical Batch A documents only
- target branch: clean and upstream-equal
- Control authored no source/test/config change
- the commit parent includes the three already-verified Worker implementation
  commits because Control used the same serialized branch; narrow design review
  must inspect the single docs commit, not misclassify those parent commits as
  Control implementation

## Blocking Technical Findings

### PR-1 - Claimed Production Input Does Not Exist

The design says the authenticated `livingOffice` projection supplies pods,
actors, layout options, accepted cues, and selected Advisor Team. Current code
does not:

- `LivingOfficePresentationV1` in `src/runtime/projection.ts` contains only
  `schemaVersion`, `projectionRevision`, `evaluatedAt`, and
  `frame: OrganizationFrame`.
- `OrganizationFrame` contains only `actors` and `diagnostics`.
- no current Batch A derived field supplies `PixelPodInput[]`,
  `PixelWorldLayout`, `PixelCueInput[]`, selected Pod/Team, camera options, or
  progress/clock input.

Control must define the exact fixture-free source and deterministic mapping for
every required production frame input. It may derive stable presentation layout
from committed code-native configuration, but it must label its authority,
avoid synthetic fixture reuse, preserve stable identity versus mutable Team
binding, and fail closed when required facts are missing/conflicting. It must
not claim current RT supplies fields it does not contain.

### PR-2 - Renderer Call Chain Still Selects Prototype Projector

Current call chain:

`pixel-world-chunk.tsx`
-> `renderer-boundary.tsx`
-> `pixel-world-scene.tsx`
-> static import `projectPixelWorldFrame` from `frame-projector.ts`

The current props also require `PixelPrototypeProjection` and
`PixelPrototypeViewOptions`. Candidate text says the lazy chunk imports the new
production projector but does not define the exact signature/ownership changes
that make this true while keeping the test-demo prototype functional.

Control must specify exact edits and types for the production and prototype
paths. The production lazy graph must have no static or dynamic import edge to
`frame-projector.ts` or `fixtures/prototype-*`. The prototype path must continue
to call the prototype projector without editing `prototype-entry.tsx`, or the
closed scope must be explicitly and coherently amended if that is impossible.

### PR-3 - Input Validation And Bundle Proof Are Under-Specified

`PIXEL_WORLD_FRAME_SCHEMA_VERSION` is an output-frame schema constant. It does
not validate `agent-office.living-office-presentation.v1`. Current browser
client typing/casting does not establish runtime validation of the additive
field.

Control must define the exact runtime validation boundary for the production
input, including missing/unknown keys, wrong schema, duplicate actor identity,
invalid Team assignment, stale/conflicting diagnostics, and fallback behavior.
No unsafe cast may be treated as validation.

The bundle gate should prove Pixi is unreachable from the eager/fallback module
graph and reachable only through the lazy Office graph. It must not depend on
literal package-name strings occurring in exactly one output file or on Vite
choosing one physical chunk when vendor splitting is valid. Module-graph or
manifest evidence plus static import-boundary checks are preferred. Prototype
fixture exclusion still requires source-level and built-output evidence.

## Required Correction

Patch only the same four canonical design documents and:

1. define the exact production presentation input contract and where each
   pod/layout/cue/selection/clock value comes from;
2. name every required new or edited source/test path without wildcard;
3. define the exact production renderer call chain and separate prototype call
   chain, including component props/types/projector injection or separate
   production components;
4. define exact runtime input validation and fail-closed fallback;
5. make CD-3 proof robust to legitimate Vite chunk splitting while proving no
   eager/fallback Pixi and no production prototype fixture dependency;
6. preserve WU-02/WU-03/WU-04 code and every accepted boundary.

Return the docs-only correction to Advisor. Do not route Sentinel until Advisor
revalidates these three findings as closed.

## Routing

- next actor: same `foundation-control` session
- Founder decision required: false
- Worker: remains stopped clean
- independent review: waiting for corrected design

