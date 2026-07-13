# Advisor Render-Host Test Scope Amendment

- Mission: `AGENT_OFFICE_BATCH_A_MODERN_OFFICE_IDENTITY_COMPLETION_001`
- Decision: `PROCEED_WITH_EXACT_TECHNICAL_SCOPE_AMENDMENT`
- Worker checkpoint: `da2ad0ead6e5775e69eebefe5a20fd81f50ca732`
- Product decision required: `NO`
- Security/authority change: `NO`

## Evidence

The accepted design requires `renderer-boundary.tsx` to consume the new shared,
fixture-free `pixel-render-host.tsx`. The shared host owns WebGL context-loss,
DOM-static fallback, renderer error-boundary, application lifecycle, resize, and
visibility cleanup behavior.

Two existing source-coupled tests read `renderer-boundary.tsx` and require those
implementation literals to remain in that old file:

- `tests/ui/pixi-public-export-bridge.test.ts`
- `tests/ui/pixel-renderer-lifecycle.test.tsx`

That assertion location conflicts with the accepted anti-split-brain extraction.
The Worker proved the exception, reverted only the blocked render-chain edits,
and returned a clean checkpoint with 92 files / 582 tests, lint, and typecheck
green.

## Exact Amendment

Add only the following two test files to the closed Batch A write scope:

1. `tests/ui/pixi-public-export-bridge.test.ts`
2. `tests/ui/pixel-renderer-lifecycle.test.tsx`

Permitted changes are limited to:

- read `src/ui/pixel/pixel-render-host.tsx` as the shared lifecycle source;
- assert `renderer-boundary.tsx` delegates to `PixelRenderHost`;
- move the existing context-loss, `DOM_STATIC`, error-boundary, static fallback,
  ticker, resize, visibility, and teardown source assertions to the shared host;
- preserve every Pixi public-root, version pin, strict TypeScript, bridge API,
  constructor, texture, ticker, and Vite-resolution assertion;
- preserve the semantic purpose and strength of the lifecycle tests.

Forbidden:

- deleting or weakening a safety assertion;
- adding suppressions or skips;
- changing dependency pins, TypeScript settings, auth, authority, transport, or
  production behavior;
- editing any other unnamed test path;
- duplicating lifecycle implementation merely to satisfy source-string tests.

## Resume Gate

The same Worker may resume from clean checkpoint `da2ad0e`, recreate the
design-required shared render host/stage and production chain, apply the exact
two-test correction, run focused and complete gates, and continue WU-01 then
WU-05 through WU-09 without another intermediate stop unless a mandatory
condition occurs.

