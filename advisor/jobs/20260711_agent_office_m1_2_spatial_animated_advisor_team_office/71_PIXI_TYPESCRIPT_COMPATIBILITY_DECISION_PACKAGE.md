# 71 Pixi and TypeScript Compatibility Decision Package

## Decision Needed

The isolated visual prototype is prepared but cannot become a reviewable commit
until both the stale dependency gate and the strict TypeScript compatibility
boundary are resolved.

This is a technical design and risk decision. It does not change the product
intent, authority model, security boundary, external-access scope, or full
integration gate.

## Confirmed Facts

1. `pixi.js@8.19.0` and `@pixi/react@8.0.5` install successfully with the
   reviewed exact pins.
2. Runtime browser tests and media generation can execute with the prepared
   implementation.
3. Public imports under TypeScript `6.0.3`, strict mode,
   `exactOptionalPropertyTypes`, and `skipLibCheck: false` produce 52 vendor
   declaration diagnostics.
4. The current prepared workaround uses unsupported relative `node_modules`
   implementation paths plus `@ts-expect-error` suppression. It must not be
   committed or approved.
5. Globally enabling `skipLibCheck`, opportunistically changing package or
   TypeScript versions, or retaining deep imports was not authorized.
6. The legacy exact-dependency test also needs one narrow update before the full
   regression can pass.

## Option A - Reviewed Prototype-Only Public-Export Compatibility Bridge

**Advisor recommendation.**

Authorize a narrow technical design delta before source continuation:

- add a small prototype-only JavaScript runtime bridge that imports only the
  public `@pixi/react` and `pixi.js` package roots;
- add an adjacent local declaration contract for only the APIs used by this
  prototype;
- prohibit deep `node_modules` imports and package-import error suppressions;
- preserve global `skipLibCheck: false`, TypeScript `6.0.3`, and the exact Pixi
  versions;
- add contract tests for public-root imports, the bounded API surface, runtime
  version identity, and absence of deep imports/suppressions;
- record the bridge as prototype-only and
  `DEFERRED_WITH_GATE` for full authenticated integration;
- require a clean same-session Fable5 Level-3 design delta review before the
  Worker resumes implementation;
- authorize the one-file legacy dependency-gate correction only after that
  design PASS.

Advantages: preserves the reviewed runtime pins and repository-wide strict type
policy without adding another package. The compatibility debt is explicit,
bounded, testable, and cannot silently promote into production integration.

Tradeoff: the bridge owns a small local declaration contract until upstream
Pixi/TypeScript compatibility is available and separately reviewed.

## Option B - Reopen Renderer Dependency and Toolchain Selection

Hold the current implementation and perform a new compatibility evaluation for
different Pixi/@pixi-react and/or TypeScript versions. Any selected version set
must receive a canonical design patch and Fable5 Level-3 delta review before
implementation resumes.

Advantages: may avoid a local compatibility bridge.

Tradeoff: larger dependency/toolchain blast radius, likely broader regressions,
and no exact replacement set is currently approved.

## Option C - Hold the Living Pixel Prototype

Keep the prepared uncommitted worktree as non-authoritative local work, publish
no Agent Office implementation commit, and stop the visual prototype mission.

## Explicitly Rejected Without New Authority

- relative imports into `node_modules` implementation files;
- `@ts-expect-error` or `@ts-ignore` around renderer package imports;
- global `skipLibCheck: true`;
- silent TypeScript or Pixi version changes;
- moving required runtime packages to another dependency class to satisfy the
  old test;
- skipping or weakening the full test train;
- routing Fable5 against an uncommitted or known-nonconforming candidate.

## Requested Leo/GPT Response

Return exactly one:

```text
APPROVE_OPTION_A_PROTOTYPE_ONLY_PUBLIC_EXPORT_COMPATIBILITY_BRIDGE
```

or

```text
APPROVE_OPTION_B_REOPEN_RENDERER_DEPENDENCY_TOOLCHAIN_SELECTION
```

or

```text
SELECT_OPTION_C_HOLD_LIVING_PIXEL_PROTOTYPE
```

No implementation, design delta, or review starts automatically before the
decision is recorded.
