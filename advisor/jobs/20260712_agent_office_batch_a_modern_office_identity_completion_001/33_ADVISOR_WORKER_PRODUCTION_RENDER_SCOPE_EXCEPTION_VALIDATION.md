# Advisor Validation - Production Render Scope Exception

## Verdict

`PATCHABLE_TECHNICAL_DESIGN_GAP__CONTROL_SCOPE_CORRECTION_REQUIRED`

No Founder product, authority, security, or risk decision is required. The
accepted Batch A intent already requires an Office-first production surface, a
separate lazy Pixi chunk, eager-shell isolation, and production fixture
exclusion. The defect is that the closed file map does not define a coherent
fixture-free production frame-projector path.

## Worker State

- session: `agent-office-opus`
- runtime: Opus 4.8 (1M), Ultracode
- skill: `/fable-builder`
- target: `/home/leo/Project/agent-office-batch-a-001`
- branch: `batch-a/modern-office-identity-001`
- accepted design base: `453c661c4f4243c77b2f53089ec599561876b06f`
- local implementation commits: `3174c67`, `6f99259`, `242e49c`
- branch state: clean, three commits ahead of the expected upstream
- verified Worker gate: 91 files / 560 tests pass; lint and typecheck pass
- implementation status: WU-02, WU-03, WU-04, and WU-01 part 1 complete;
  WU-01 part 2 stopped before any uncommitted edit

The Worker used “four verified increments” to include the entry gate; direct
Git evidence shows three implementation commits. This is not treated as a
fourth code commit.

## Direct Advisor Evidence

1. `src/ui/pixel/frame-projector.ts:29-34` statically imports
   `fixtures/prototype-timeline.ts`.
2. `frame-projector.ts:644-648` accepts only
   `agent-office.pixel-prototype-projection.v1`.
3. `src/ui/pixel/pixel-world-scene.tsx:19,50,73` imports and calls that projector,
   so a production Pixel scene currently pulls the prototype timeline into its
   graph.
4. The accepted design forbids prototype fixture/timeline modules in the
   production graph and keeps `prototype-entry.tsx` outside Batch A edits.
5. `tests/acceptance/production-pixel-prototype-boundary.test.ts:21-40` still
   enforces the pre-CD-3 zero-Pixi-anywhere rule.
6. That test at lines 67-91 also requires the production shell/config files to
   remain byte-identical to an older design base, contradicting the accepted
   Office-first/lazy-chunk implementation.
7. The accepted WorkUnit plan already names both exact bundle-boundary tests and
   requires a CD-3 eager-shell-versus-lazy-Office chunk test. The missing item is
   a coherent named source path and contract for fixture-free production frame
   projection.

## Required Control Decision

Control must inspect the actual source and choose the smallest coherent technical
design that satisfies all accepted requirements. Acceptable design families are:

1. a new, exact, fixture-free production projector path while preserving the
   current prototype projector and test-demo path; or
2. a bounded shared-projector refactor only if every coupled source/test path is
   named, the prototype remains functional and isolated, and the production
   graph cannot import prototype fixture/timeline modules.

Control must not delegate this choice to the Worker, authorize a wildcard, or
rely on incidental tree-shaking as the boundary. It must define exact source and
test paths, projection/schema ownership, production-to-pixel mapping, lazy chunk
boundary, fallback behavior, and the exact replacement assertions for the two
already-authorized bundle-boundary tests.

## Preserved Boundaries

- Office-first authenticated application and secondary-view reachability;
- production eager shell and fallback remain Pixi-free;
- Pixi may occur only in the separately emitted lazy Office chunk;
- prototype fixtures/timeline and synthetic markers remain outside production;
- existing prototype/test-demo behavior is not silently broken or reinterpreted;
- one runtime work-truth projection and fail-closed evidence handling;
- all accepted identity, organization, accessibility, security, authority,
  Channy, fallback, rollback, no-Grok, excluded-session, and Batch B-E rules;
- no runtime/source/test/config implementation during this Control correction.

## Routing

- next actor: existing `foundation-control` session
- mode: `CONTROL_MASTER_DESIGN_MODE`
- implementation: stopped clean pending docs-only correction and narrow review
- Founder decision required: false

