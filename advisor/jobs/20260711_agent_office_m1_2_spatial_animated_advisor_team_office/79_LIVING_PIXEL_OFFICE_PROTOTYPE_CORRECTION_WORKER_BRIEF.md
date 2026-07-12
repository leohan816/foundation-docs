# 79 Living Pixel-Office Prototype Compatibility Correction Worker Brief

## Assignment

- Actor: Agent Office Worker
- Session: same existing `agent-office/%13` session only
- Model and effort: `<Codex 5.6 SOL: Ultra>`
- Mission: `AGENT_OFFICE_M1_2_SPATIAL_ANIMATED_ADVISOR_TEAM_OFFICE`
- WorkUnits: resume bounded `AO12-PWU-07..09` only
- Repository: `/home/leo/Project/agent-office`
- Branch: `shadow/agent-office-m1-2-spatial-office`
- Current committed HEAD/upstream:
  `56385b894ff18fd65a4e59f2c4e75f73ea2a56d9`
- Starting worktree: intentionally dirty with the same prepared prototype that
  the prior Worker and Fable5 byte-preservation checks validated

## Governing Evidence

Read directly:

- original prototype brief `69_LIVING_PIXEL_OFFICE_PROTOTYPE_WORKER_BRIEF.md`
  (SHA-256 `22b85d4cba314c6c2da3134361ea68271a8d07fb48537cf632806f123d2324d3`);
- original prototype handoff
  `69_LIVING_PIXEL_OFFICE_PROTOTYPE_WORKER_HANDOFF_PROMPT.md`
  (SHA-256 `c7db6cf300eb723e1cb50afccc974628f65ce60bef02e3c26c3d3c1025599ae4`);
- Worker blocker result and Advisor validation (`70`, `71`);
- Leo/GPT Option A record (`72`);
- bridge design brief and result (`73`, `74`);
- Advisor design validation (`75`);
- Fable5 design review brief, result, and Advisor validation (`76`, `77`, `78`);
- Agent Office canonical bridge design:
  `docs/architecture/AGENT_OFFICE_M1_2_PIXI_PUBLIC_EXPORT_COMPATIBILITY_BRIDGE.md`;
- companion renderer design and implementation plan; and
- actual current instructions, prepared source, packages, tests, media, and Git
  state.

The original brief remains binding except where this handoff explicitly changes
the committed base, adds the reviewed compatibility files, adds the one legacy
test path, and requires corrected media regeneration.

## Exact Objective

Turn the preserved uncommitted prototype into a reviewable committed candidate
without changing its approved product behavior:

1. add `src/ui/pixel/pixi-public-export-bridge.js`;
2. add `src/ui/pixel/pixi-public-export-bridge.d.ts` using the reviewed
   normative bounded contract;
3. add `tests/ui/pixi-public-export-bridge.test.ts`;
4. replace the six prepared deep imports and six `@ts-expect-error` directives
   in exactly:
   - `src/ui/pixel/facility-sprites.tsx`;
   - `src/ui/pixel/pixel-world-scene.tsx`;
   - `src/ui/pixel/renderer-boundary.tsx`;
   - `src/ui/pixel/world-clock.tsx`;
5. update only the exact runtime dependency object expectation in
   `tests/acceptance/batch-gates.test.ts` from the approved three pins to:

```text
@pixi/react: 8.0.5
lucide-react: 1.24.0
pixi.js: 8.19.0
react: 19.2.7
react-dom: 19.2.7
```

No source behavior redesign is authorized. The public roots resolve the same
runtime modules already exercised by the prepared prototype.

## Exact Allowed Repository Paths

The complete authorized mutation/staging/commit set is:

1. every exact path listed under **Authorized Repository Paths** in committed
   brief `69_LIVING_PIXEL_OFFICE_PROTOTYPE_WORKER_BRIEF.md`;
2. the three exact new bridge/declaration/test paths above; and
3. `tests/acceptance/batch-gates.test.ts`.

No other Agent Office path may be changed, staged, or committed. The canonical
design documents at commit `56385b8` are read-only in this pass.

The ignored media root remains authorized local evidence only and must never be
committed:

`/home/leo/Project/agent-office/artifacts/m1-2-visual-prototype/`

## Toolchain and Contract Invariants

- TypeScript exactly `6.0.3`.
- Global `skipLibCheck: false` remains unchanged.
- React and React DOM exactly `19.2.7`.
- `@pixi/react` exactly `8.0.5`.
- `pixi.js` exactly `8.19.0`.
- No dependency, override, compiler, tsconfig, package-patch, or strictness
  change.
- The JavaScript bridge imports Pixi only from literal public roots.
- All prototype TS/TSX imports Pixi only through the local bridge.
- No deep/package-internal/relative-`node_modules` import remains.
- No `@ts-expect-error` or `@ts-ignore` remains in the prototype boundary.
- No Pixi vendor type, broad `any`, wildcard module, global/module
  augmentation, or index-signature escape hatch.
- Bridge runtime identity cannot pass only because of hardcoded strings.
- Missing/malformed exports or call/lifecycle/version checks fail closed to the
  existing complete DOM-static/M1 fallback before stale canvas authority.
- No broad global error handler or unbounded retry.

## Required Contract Tests

The new focused test must prove at minimum:

- exact literal public-root imports in the bridge;
- no other executable prototype file imports Pixi packages directly;
- zero deep imports and zero suppression directives;
- exact bounded declaration export/property/callback manifest;
- no vendor type, broad `any`, wildcard module, augmentation, global override,
  or index signature;
- exact installed and locked package versions;
- exact runtime identity/value names through the Vite/browser boundary;
- missing/malformed export, call, lifecycle, texture, ticker, and version
  failures select the static/M1 fallback;
- exact dependency object remains the approved five pins; and
- TypeScript remains `6.0.3` with global `skipLibCheck: false`.

Do not use bare Node ESM execution of `@pixi/react` as the browser runtime gate.
Node may inspect package manifests and source contracts; Vite/browser tests own
runtime execution.

## Required Full Verification

Run the complete original brief verification train plus the focused bridge test:

```text
npx vitest run --maxWorkers=1 tests/ui/pixi-public-export-bridge.test.ts
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

Also rerun every lifecycle, semantic parity, accessibility, security,
production-boundary, performance, load, cleanup, and thirteen-scene proof from
the original brief. The complete sequential `npm test` must pass; skipping or
filtering the legacy gate is forbidden.

## Media and Visual Evidence

Because this correction changes the renderer import/execution boundary,
regenerate all eight ignored media artifacts from the actually running corrected
prototype using the reviewed deterministic commands:

- one 20-to-30-second Playwright WebM;
- MP4 derived from that exact WebM;
- GIF derived from the exact `6.0-13.0s` WebM segment; and
- full-office, team-activity, lounge, Channy, and mobile PNGs.

Verify duration, dimensions, file sizes, SHA-256 values, source recording
lineage, ignored/not-tracked state, and absence of residual listener/browser
processes. Directly inspect all PNGs and representative WebM/GIF frames. Do not
claim visual acceptance; this produces a candidate for Fable5 and Leo/GPT.

## Git and Result

- Stage only the complete exact allowed path set.
- Verify the staged diff and absence of ignored media.
- Commit and non-force push to
  `origin/shadow/agent-office-m1-2-spatial-office`.
- Leave the Agent Office worktree clean and upstream-equal, except ignored media
  which must remain untracked/ignored.
- Write full result:
  `../foundation-docs/runs/agent-office/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/WORKER_LIVING_PIXEL_OFFICE_PROTOTYPE_CORRECTION_RESULT.md`
- Write pointer:
  `../foundation-docs/advisor/jobs/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/80_WORKER_LIVING_PIXEL_OFFICE_PROTOTYPE_CORRECTION_RESULT_POINTER.md`
- Commit/push only those exact two Foundation Docs paths.
- Return the ASCII pointer to Advisor and stop.

## STOP Conditions

Stop if:

- the preserved prepared worktree no longer matches the validated state;
- implementation requires any path outside the exact inherited-plus-four set;
- a deep import, suppression, broad/global declaration, dependency/compiler/
  strictness change, or runtime behavior redesign is required;
- a required export or public-root browser runtime check fails;
- fallback, StrictMode, teardown, semantic parity, authority, accessibility,
  performance, production-boundary, media, or full regression fails;
- an external asset, non-loopback request, auth, DB, secret, transport, Hermes,
  public/remote/production, protected branch, or interactive approval appears;
- Agent Office or Foundation Docs commit/push evidence cannot be exact.

Do not invoke Fable5, approve the prototype, start full authenticated
integration, or start another mission.

## Completion State

```text
TARGET: REVIEWABLE_COMMITTED_PROTOTYPE_CANDIDATE
NEXT_ACTOR: Advisor
AFTER_ADVISOR: independent Fable5 implementation/security/accessibility/visual review
PROTOTYPE_VISUAL_APPROVAL: NOT_GRANTED
FULL_INTEGRATION: DEFERRED_WITH_GATE
RETURN_TO: Advisor
STOP
```
