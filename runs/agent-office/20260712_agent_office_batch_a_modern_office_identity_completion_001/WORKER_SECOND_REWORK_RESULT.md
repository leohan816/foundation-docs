# Agent Office Batch A — Worker Second Rework Result (I2-1..I2-4)

`AGENT_OFFICE_BATCH_A_MODERN_OFFICE_IDENTITY_COMPLETION_001`

## Identity

- Mission/job ID: `AGENT_OFFICE_BATCH_A_MODERN_OFFICE_IDENTITY_COMPLETION_001` (second implementation-review rework)
- Actor: **Agent Office Worker** (existing `agent-office-opus` session); model Opus 4.8 (1M), effort Ultracode, `/fable-builder`
- Project / repository: Agent Office Batch A / `/home/leo/Project/agent-office-batch-a-001`
- Branch: `batch-a/modern-office-identity-001`
- Reviewed base: `ac8ba75d3a128385beaeeac58ae5bf54c03d23f2`
- Prior reviewed candidate (first rework HEAD): `74d586660c8fc55c04bcaca6f7442cd14218eb33`
- Second-rework HEAD: `1187b9ae37077f22e697680bf531f9e475f005bf`
- Push status: **non-force pushed** to `origin/batch-a/modern-office-identity-001` (`74d5866..1187b9a`, fast-forward); local == upstream.
- Inputs read directly: `SENTINEL_IMPLEMENTATION_DELTA_REREVIEW_RESULT.md`, Advisor validation `56`, handoff/run `09L`, the shared-canvas-proof test-scope amendment `57`, and the candidate source at `74d5866`.

## Finding closure (I2-1 .. I2-4)

- **I2-1 (CODE) — one truthful renderer state.** The authenticated parent/HUD advertised `WEBGL` before the child render host reported a successful `onInit`. Fix: `src/ui/pixel/production-pixel-world-scene.tsx` starts the parent backend `PENDING` (reduced-motion `DOM_STATIC`) and adopts a real backend only on the child `onBackend`; the shared HUD (`src/ui/pixel/living-office-hud.tsx`, `surfaceKind="PRODUCTION"`) renders `PENDING` truthfully as `INITIALIZING`. The host DOM status, HUD badge, semantic mirror, and accessible text agree across delayed/unresolved/success/failure init. Strict CSP, CD-3 lazy isolation, the bounded init timeout, and context-loss handling are unchanged.
- **I2-2 (CODE/EVIDENCE) — readable, associated, non-occluding actor labels.** The base production label reused the fixed 172×78 prototype card, so the contract §2.7 first-layer facts rendered sub-10px; an intermediate auto-width variant overflowed/overlapped neighbours. Fix: the authenticated label (`.living-office-actor-label--production` in `src/ui/pixel/living-office.css`) is a fixed 196px card whose eight §2.7 facts each render on a single **≥10px** ellipsised line, and `layoutPixelActorLabels` (`src/ui/pixel/living-office-actor-overlay.tsx`) reserves the production footprint (`PRODUCTION_LABEL_WIDTH`/`HEIGHT`, generous enough that 200%-text cards still fit) so its existing displacement/grid machinery spreads labels **without overlapping each other or actors**, drawing a connector to each displaced label. The full untruncated values remain in the always-visible roster and the 17-field drawer, so no fact is hidden. Mobile hides the on-canvas labels for the roster equivalent (no silent hiding). The overlay `<div>` carries a production-only `group` role so its `aria-label` is not `aria-prohibited-attr` when labels are hidden. Deterministic browser assertions in `tests/e2e/living-pixel-office.spec.ts` cover ≥10px computed fonts, card containment (accounting for `overflow:hidden` clipping), **no inter-label overlap at both 100% and 200% text**, connector→actor association, roster coverage (8), and 200% reflow without spill/overlap. Fresh unmasked desktop/mobile/static evidence was inspected directly (see below); closure is not claimed from Axe or horizontal-overflow alone.
- **I2-3 (CODE/CONTRACT) — exact total pre-assembly validation.** `src/application/organization/production-render-input.ts` now also enforces, before assembly and **fail-closed (never throwing)**: committed pod ordering with a canonical-first `selectedDefaultPodId` invariant (non-canonical/absent default → `INVALID_COMMITTED_DEFAULT` → `M1_FIXED_STATIONS`); an exact `{ selectedPodId: string }` selection shape (unknown keys or non-string → `SELECTION_SHAPE` → `DOM_STATIC`); cross-pod actor-membership uniqueness; and responsible-Advisor-in-membership. A **valid-but-unknown `selectedPodId` string still falls back to the committed default** (preserved). Parser-level hostile cases added per case to `tests/contract/production-render-input.test.ts`.
- **I2-4 (CODE/DOC) — Channy pixel/semantic parity + honest production copy.** `production-pixel-world-scene.tsx` commits a new frame to the mirror/HUD only at a **bounded** meaningful Channy transition (a new ambient state), never per animation frame, so the canvas and semantic text agree across the eight ambient states (no 30fps React updates / no excessive live-region churn). The authenticated copy is fixture-free production wording (`STATIC OFFICE` / `CONTINUOUS AMBIENT`, `Office renderer status`, `Accessible committed office mirror`) — the earlier `Prototype status` / `TOUR RUNNING` / `Accessible synthetic fixture mirror` strings are gone from the authenticated surface; the prototype route is unchanged. Channy stays `authorityRole: none` with no assignment/evidence/command/notification/workflow meaning.

## Shared non-blank canvas proof (Advisor amendment `57`)

Per amendment `57`, the duplicated per-spec non-blank proof is centralized in the one new authorized helper `tests/helpers/production-office-canvas-proof.ts`, imported by both `tests/e2e/living-pixel-office.spec.ts` and `tests/e2e-composed/application-office-scene.spec.ts`. It is **not** a threshold-only reduction: it captures the office canvas with the DOM label overlay hidden (label-independent and viewport-consistent, because `canvas.screenshot()` composites the on-canvas labels that I2-2 removes on mobile), then proves the render non-blank three ways a blank canvas cannot pass —

1. **initialized dimensions** (a failed init leaves the 300×150 default; a real init is >320×>200);
2. **direct RGB colour diversity** — the lossless compositor PNG is re-decoded through a `data:` image and its distinct colours counted: **≈967 (mobile) / ≈2950 (desktop)** vs exactly one for a blank/uniform fill (WebGL live readback is unavailable without `preserveDrawingBuffer`, so the compositor PNG is used); and
3. a corroborating **blank-fill compression separation** (a rendered office is ≈11–38 KB where a same-size solid fill stays under 5 KB).

Both specs continue to prove initialized dimensions, >100 rendered colours, and the compression separation, as required by `57`.

## Exact changed-file list (second rework, vs `74d5866`)

Source (09L allowlist): `src/application/organization/production-render-input.ts`, `src/ui/pixel/living-office-actor-overlay.tsx`, `src/ui/pixel/living-office-hud.tsx`, `src/ui/pixel/living-office-semantic-mirror.tsx`, `src/ui/pixel/living-office.css`, `src/ui/pixel/production-pixel-world-scene.tsx`.

Tests: `tests/contract/production-render-input.test.ts`, `tests/e2e/living-pixel-office.spec.ts`, `tests/e2e-composed/application-office-scene.spec.ts`, `tests/ui/pixel-renderer-lifecycle.test.tsx`, and the one new amendment-`57` helper `tests/helpers/production-office-canvas-proof.ts`.

Baselines (authorized Living Office dirs only): regenerated `tests/e2e/baselines/living-pixel-office.spec.ts/living-office-static-desktop-1440x900.png` and `tests/e2e-composed/baselines/application-office-scene.spec.ts/batch-a-living-office/living-office-default-reduced-motion-1440x900.png` (both now 291472 bytes) for the readable non-overlapping labels + honest copy. Every prototype and technical/spatial baseline is byte-identical.

Docs (four authorized as-built sections): `docs/architecture/AGENT_OFFICE_BATCH_A_APPLICATION_INTEGRATION_DESIGN_DELTA.md` (new §17), `docs/operations/AGENT_OFFICE_BATCH_A_IMPLEMENTATION_WORKUNIT_PLAN.md` (new §6.2), `docs/contracts/AGENT_OFFICE_BATCH_A_IDENTITY_ORGANIZATION_CONTRACT.md` (I2-2/I2-3 notes), `docs/FEATURE_INDEX.md` (§6 rework note).

## Forbidden / excluded files — confirmed untouched (vs `ac8ba75`)

`AGENTS.md`, `CLAUDE.md`, `package.json`, `package-lock.json`, `playwright.config.ts`, `playwright.composed.config.ts`, `playwright.pixel-prototype.config.ts`, `tsconfig.build.json`, `tsconfig.json`, `src/server/security/headers.ts` (CSP), `src/ui/pixel/prototype-entry.tsx`, prototype fixtures, and every historical/prototype/technical baseline — all unchanged. No CSP weakened; no `unsafe-eval` added. No dependency/lockfile change. No `eslint-disable` / `@ts-ignore` / `@ts-expect-error` / `.skip` / `.only` / `maxDiffPixelRatio` change / threshold-only weakening. `.grok/` and `grok*` pilot artifacts never staged. No agent/sub-agent used; no self-review; no risk acceptance; no force push; no main/protected-branch action.

## Commands / checks (second rework; concise outcomes)

- `npm run check` — **green**: `eslint .` clean, `tsc --noEmit` clean, `vitest run` **631/631 across 93 files**, `npm run build` succeeds.
- CD-3 boundary (`tests/acceptance/production-pixel-prototype-boundary.test.ts`) — **6/6**.
- Living Office E2E (`playwright.batch-a-living-office.config.ts`) — **3/3**, deterministic without `--update` (truthful pre-init state, readable non-overlapping labels + connectors at 100% and 200%, color-diversity non-blank proof, roster coverage, Channy semantic parity, unmasked artifacts).
- Composed E2E (`playwright.composed.config.ts`) — **3/3**, deterministic.
- Prototype E2E (`playwright.pixel-prototype.config.ts`) — **20/20**, screenshots **byte-identical** (shared renderer/overlay/CSS changes are production-gated).
- Demo E2E (`playwright.config.ts`) — **43 passed / 23 skipped**.
- Production build + loopback rehearsal (`scripts/local-office-rehearsal.mjs`) — office is a **separate lazy chunk**, eager entry **Pixi-free** (CD-3 at artifact level), served shell/asset `200`, startup `AUTH_BLOCKED`, protected projection `503 AUTH_PROVIDER_UNAVAILABLE` (fail-closed), listener rebind + writer lock released (clean teardown).
- `git diff --check` clean; forbidden-path and suppression scans clean; disposable `test-results-*/` reconciled before return.

## Fresh unmasked visual evidence (directly inspected)

- `tests/e2e/baselines/living-pixel-office.spec.ts/living-office-static-desktop-1440x900.png` and the composed `.../batch-a-living-office/living-office-default-reduced-motion-1440x900.png` — inspected: eight uniform 196px actor cards, each §2.7 fact readable on its own line, **no card–card overlap**, dashed connectors joining the displaced top-row labels to their actors, honest `DOM_STATIC` / `STATIC OFFICE` HUD and `Accessible committed office mirror` copy, and the full-fact roster below.
- Live desktop (100%) production labels measured at 196×143 with **0 overlaps**; at 200% text 196×258 with **0 overlaps**; mobile hides the on-canvas labels (0 visible) with the 8-actor roster present. Mobile office canvas directly inspected as a rendered (non-blank) office.

## Boundaries

Independent Sentinel re-review, Advisor audit, and Leo/GPT final approval remain external and pending. No next mission inferred. Returning the durable result and pointer to Advisor, then stopping.
