# Agent Office Batch A — Worker Third Rework Result (A3-1, A3-2)

`AGENT_OFFICE_BATCH_A_MODERN_OFFICE_IDENTITY_COMPLETION_001`

## Identity

- Mission/job ID: `AGENT_OFFICE_BATCH_A_MODERN_OFFICE_IDENTITY_COMPLETION_001` (third implementation-review rework)
- Actor: **Agent Office Worker** (existing `agent-office-opus` session); model Opus 4.8 (1M), effort Ultracode, `/fable-builder`
- Project / repository: Agent Office Batch A / `/home/leo/Project/agent-office-batch-a-001`
- Branch: `batch-a/modern-office-identity-001`
- Reviewed base / prior candidate: `1187b9ae37077f22e697680bf531f9e475f005bf`
- Third-rework HEAD: `fcd55a2df04aa14284fceaab12c653492edf22f2`
- Push status: **non-force pushed** to `origin/batch-a/modern-office-identity-001` (`1187b9a..fcd55a2`, fast-forward); local == upstream.
- Inputs read directly: Advisor validation `58`, handoff/run `09M`, the prior `WORKER_SECOND_REWORK_RESULT.md`, and contract §2.7 first-layer requirements. Verified base == `1187b9a`, upstream-equal, clean worktree, live Opus 4.8 Ultracode, `/fable-builder`, no concurrent writer, no Grok reuse.

## Finding closure (A3-1, A3-2)

- **A3-1 (CODE/CONTRACT) — complete first-layer Team fact.** The Founder-required first layer must expose the current Team or `UNASSIGNED`, but `advisorTeam` lived only in the 17-field drawer. Fix: `advisorTeam` is added to `ORGANIZATION_COMPACT_FIELDS` (`src/ui/pixel/living-office-actor-overlay.tsx`) immediately after `stableDisplayName`, matching the §2.7 identity grouping. It now renders (a) on the production actor label, (b) in the accessible actor-label name (`actorLabelAccessibleName`), and (c) in the always-visible roster / mobile equivalent (the roster iterates `ORGANIZATION_COMPACT_FIELDS`, so it picks up the fact with full value + full source). The value/source/status come from the existing truthful `advisorTeam` envelope — a Team id or the `UNASSIGNED` sentinel — with the mutable assignment kept distinct from the stable identity above it and inferred from nothing (project/session/position/pod/proximity/prior state). Contract §2.7 is updated to the nine-field compact subset. Unit (`tests/ui/actor-summary.test.tsx`: nine `data-actor-summary-field`s incl. `advisorTeam` with a source tag; accessible name announces `Team … , source …`) and browser (`tests/e2e/living-pixel-office.spec.ts`: desktop label + roster Team present; mobile roster Team present) assertions require the Team fact in both layers.
- **A3-2 (CODE/EVIDENCE) — compact Office-first desktop composition.** The prior eight 196px tall opaque stacked cards covered **28.1%** of the office viewport — a wall of cards over the world; passing a rectangle-overlap test was not product closure. Fix: the production-only label (`.living-office-actor-label--production`, `src/ui/pixel/living-office.css`) is recomposed into a **dense two-column fact grid** — a role/name header spanning both columns, then the nine §2.7 facts in two columns. Each fact is a single ≥10px ellipsised line whose value may truncate but whose **source stays visible** as a compact deterministic non-color code (`REG`/`ART`/`FIX`/`SYN`/`UNV`); the **full untruncated value and full source label** remain in the always-visible roster, the accessible label name, and the 17-field drawer, so nothing is hidden and nothing is hover-only or color-only. The card is now ~208×~78px and translucent (`rgba(…,0.82)`), so the Office world, characters, and symbolic work surfaces stay the primary desktop signal; label coverage drops to **16.8%**. A new deterministic **office-coverage/occlusion browser gate** (`assertOfficeIsPrimary`, ≤22% of the live office viewport covered by the union of label rectangles) supplements the label-to-label (`assertNoProductionLabelOverlap`) and label-to-actor checks — it **fails the `1187b9a` composition (28.1%) and passes the corrected one (16.8%)** (verified by re-running the gate against the stashed base source). No-overlap (100% and 200%), connectors/association, 200%-text equivalence, keyboard/drawer + focus restoration, forced-colors, reduced-motion/static, and screen-reader meaning are preserved; the mobile no-on-canvas-label + always-visible roster equivalent keeps every actor and the Team fact present and readable.

## Preserved unchanged (verified)

I2-1 truthful `PENDING`/initialized backend state, I2-3 exact total pre-assembly validation, I2-4 bounded Channy semantic parity + honest production copy, the 17-field detail drawer + focus restoration, the strict CSP / Pixi lazy boundary + the shared non-blank canvas proof, and all auth/command/delivery/security/M1-static-fallback/authority boundaries. `src/ui/pixel/contracts.ts`, `production-render-input.ts`, `pixel-render-host.tsx`, `production-pixel-world-scene.tsx`, `production-frame-projector.ts`, `presentation-clock.ts`, `living-office-hud.tsx`, package/lockfile, and all TypeScript/Playwright configs are **untouched**.

## Exact changed-file list (third rework, vs `1187b9a`)

Source (09M allowlist): `src/ui/pixel/living-office-actor-overlay.tsx`, `src/ui/pixel/living-office.css`. (`living-office-semantic-mirror.tsx` needed no edit — the roster already iterates `ORGANIZATION_COMPACT_FIELDS`, so the Team fact propagates automatically.)

Tests: `tests/e2e/living-pixel-office.spec.ts` (Team desktop+mobile assertions; `assertOfficeIsPrimary` occlusion gate), `tests/ui/actor-summary.test.tsx` (nine-field compact + Team source + accessible-name Team).

Baselines (authorized Living Office dirs only): regenerated `tests/e2e/baselines/living-pixel-office.spec.ts/living-office-static-desktop-1440x900.png` and `tests/e2e-composed/baselines/application-office-scene.spec.ts/batch-a-living-office/living-office-default-reduced-motion-1440x900.png` (both now 259193 bytes — smaller, reflecting the compact translucent cards). Every prototype and technical/spatial baseline is byte-identical.

Docs (directly affected as-built sections): `docs/contracts/AGENT_OFFICE_BATCH_A_IDENTITY_ORGANIZATION_CONTRACT.md` (§2.7 nine-field compact subset + A3 note), `docs/architecture/AGENT_OFFICE_BATCH_A_APPLICATION_INTEGRATION_DESIGN_DELTA.md` (new §18), `docs/operations/AGENT_OFFICE_BATCH_A_IMPLEMENTATION_WORKUNIT_PLAN.md` (new §6.3), `docs/FEATURE_INDEX.md` (§6 rework note).

## Forbidden / excluded — confirmed

No `eslint-disable` / `@ts-ignore` / `@ts-expect-error` / `.skip` / `.only` / `maxDiffPixelRatio` change / threshold-only screenshot proof / hidden desktop facts or actors / sub-10px text / hover-only or color-only meaning / stale or masked evidence. No Grok pilot code or excluded `agent-office` input. No agents/sub-agents, self-review, risk acceptance, force push, or protected/main action. `.grok/` and `grok*` never staged. `git diff --check` clean.

## Commands / checks (third rework; concise outcomes)

- `npm run check` — **green**: `eslint .` clean, `tsc --noEmit` clean, `vitest run` **631/631 across 93 files**, `npm run build` succeeds.
- CD-3 boundary — **6/6** (within vitest).
- Living Office E2E (`playwright.batch-a-living-office.config.ts`) — **3/3**, deterministic without `--update` (Team on label + roster, compact readable labels, `assertOfficeIsPrimary` ≤22%, no overlap at 100%/200%, connectors, color-diversity non-blank proof, Channy parity, unmasked artifacts).
- Occlusion gate calibration — fix **16.8%** (pass), base `1187b9a` **28.1%** (fail, verified against stashed base source).
- Composed E2E (`playwright.composed.config.ts`) — **3/3**, deterministic.
- Prototype E2E (`playwright.pixel-prototype.config.ts`) — **20/20**, screenshots **byte-identical** (production-gated changes do not touch the prototype).
- Demo E2E (`playwright.config.ts`) — **43 passed / 23 skipped**.
- Production build + loopback rehearsal — office a **separate lazy chunk**, eager entry **Pixi-free**, shell/asset `200`, startup `AUTH_BLOCKED`, protected projection `503 AUTH_PROVIDER_UNAVAILABLE`, listener rebind + writer lock released.
- `git diff --check` clean; forbidden-scope/suppression scans clean; disposable `test-results-*/` reconciled before return.

## Fresh unmasked visual evidence (directly inspected)

- `tests/e2e/baselines/living-pixel-office.spec.ts/living-office-static-desktop-1440x900.png` and the composed reduced-motion baseline — inspected: each actor card is a compact two-column grid showing `Team: <value> <REG/ART/UNV>` plus the remaining §2.7 facts, readable, non-overlapping, connected to its actor; the translucent cards let the brick floor, Pod boundaries, and characters show through so the Office is clearly primary; honest `DOM_STATIC` / `STATIC OFFICE` HUD + `Accessible committed office mirror` copy; the roster below carries every actor's full Team + fact set.
- Live desktop label coverage **16.8%** (gate ≤22%); mobile hides on-canvas labels (0 visible) with the 8-actor roster (incl. Team) present; 200% text keeps labels readable and non-overlapping.

## Boundaries

Independent same-session Sentinel delta re-review, Advisor audit, and Leo/GPT final approval remain external and pending. No next mission inferred. Returning the durable result and pointer to Advisor, then stopping.
