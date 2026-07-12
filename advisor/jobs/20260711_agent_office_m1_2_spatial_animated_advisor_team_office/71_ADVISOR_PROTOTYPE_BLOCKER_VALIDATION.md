# 71 Advisor Prototype Blocker Validation

## Verdict

```text
ADVISOR_VALIDATION_VERDICT: NEEDS_LEO_GPT_DECISION
WORKER_BLOCKER: VALID
AGENT_OFFICE_IMPLEMENTATION_COMMIT: NONE
FABLE5_PROTOTYPE_REVIEW: NOT_READY
FULL_INTEGRATION: NOT_STARTED_NOT_AUTHORIZED
```

The Worker correctly stopped before an Agent Office commit because the required
Pixi dependency additions conflict with an existing exact dependency assertion
in `tests/acceptance/batch-gates.test.ts`, while that path was absent from the
exhaustive authorized path list.

The one-file legacy-gate correction is necessary but is not sufficient to make
the prepared prototype reviewable. Advisor direct inspection found a second,
material compatibility blocker that the Worker result did not classify.

## Evidence Validated

- Worker result commit:
  `3ad03ca8a5edba256b7854bba38534743673ee93`
- Worker pointer commit:
  `6d5d3913361cf1589c2d31e3e2e6601e352e0871`
- Agent Office base, HEAD, and upstream remain:
  `9611d0da1479ca5e7a9677641fe767a6b39b4a38`
- No Agent Office implementation commit or push exists.
- The prepared source and media remain uncommitted in the same existing Worker
  worktree.
- The full repository test train reached `480/481` tests before the stale
  dependency assertion stopped the train.
- The ignored media root is mode `0700`; the direct WebM and MP4 are 1440x900
  and 27.36 seconds, and the GIF is 720x450 and 7 seconds.
- No loopback server remained after the Worker stopped.

## Finding A: Stale Legacy Dependency Gate

The exact authorized command adds these runtime dependencies:

```text
@pixi/react: 8.0.5
pixi.js: 8.19.0
```

The existing `tests/acceptance/batch-gates.test.ts` assertion still requires
the complete dependency object to contain only the previous three packages.
The narrowly correct patch is to add this one existing test path to the allowed
scope and require the exact five-package dependency object. No broader rewrite
or gate weakening is justified.

## Finding B: Public Pixi Imports Fail the Strict Type Gate

Prepared source currently bypasses supported package exports with relative
imports such as:

```text
../../../node_modules/@pixi/react/lib/index.mjs
../../../node_modules/pixi.js/lib/index.mjs
```

It also uses `@ts-expect-error` and local structural casts around those imports
in `facility-sprites.tsx`, `pixel-world-scene.tsx`,
`renderer-boundary.tsx`, and `world-clock.tsx`.

Advisor independently compiled an in-memory probe using only the public package
imports under the repository's actual `tsconfig.json`, TypeScript `6.0.3`, and
`skipLibCheck: false`. The probe returned 52 diagnostics, including:

- duplicate/conflicting WebGPU declarations between TypeScript 6 DOM libraries
  and `@webgpu/types@0.1.71` pulled by PixiJS;
- Pixi `FederatedPointerEvent` incompatibility with the TypeScript 6
  `PointerEvent` interface; and
- a Pixi bitmap-font declaration incompatibility under
  `exactOptionalPropertyTypes`.

Therefore the exact package/toolchain combination has a real declaration-level
compatibility mismatch. Deep `node_modules` imports and error suppressions make
the current tree typecheck only by hiding the package declarations. That is not
an acceptable final prototype boundary and conflicts with the original STOP
rule:

```text
Stop on peer, license, audit, type, build, or registry mismatch.
```

Advisor will not route this uncommitted tree to Fable5 as a candidate commit.

## Visual Evidence Status

The prepared world is materially closer to the requested living pixel-office,
and the Worker corrected the original recording-size and camera-letterbox
defects. Advisor directly inspected full-office, focused team, lounge, Channy,
mobile, and extracted video frames. This remains preliminary evidence only:
there is no target commit, no independent prototype review, and no Founder
visual-direction acceptance.

## Required Decision

Use the separate decision package:

`71_PIXI_TYPESCRIPT_COMPATIBILITY_DECISION_PACKAGE.md`

No Worker rework launcher and no Fable5 prototype launcher is ready until
Leo/GPT selects the compatibility path.

## Boundaries Preserved

- no production or authenticated integration;
- no runtime authority, auth, delivery, transport, DB, secret, public, remote,
  or Hermes change;
- no external asset or new package beyond the exact two reviewed Pixi packages;
- no Agent Office commit/push;
- no Fable5 review of an uncommitted target;
- no automatic full integration or next mission.
