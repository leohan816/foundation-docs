# Agent Office Batch A — Worker Fourth Rework Result (A4-1, A4-2, A4-3)

`AGENT_OFFICE_BATCH_A_MODERN_OFFICE_IDENTITY_COMPLETION_001`

## Identity

- Mission/job ID: `AGENT_OFFICE_BATCH_A_MODERN_OFFICE_IDENTITY_COMPLETION_001` (fourth implementation-review rework)
- Actor: **Agent Office Worker** (existing `agent-office-opus` session); model Opus 4.8 (1M), effort Ultracode, `/fable-builder`
- Project / repository: Agent Office Batch A / `/home/leo/Project/agent-office-batch-a-001`
- Branch: `batch-a/modern-office-identity-001`
- Reviewed base / prior candidate: `fcd55a2df04aa14284fceaab12c653492edf22f2`
- Fourth-rework HEAD: `43107b9c087a5d172d5f670e6b01bd75ab9ac1db`
- Push status: **non-force pushed** to `origin/batch-a/modern-office-identity-001` (`fcd55a2..43107b9`, fast-forward); local == upstream.
- Inputs read directly: `SENTINEL_IMPLEMENTATION_SECOND_DELTA_REREVIEW_RESULT.md`, Advisor validation `60`, handoff/run `09N`, the **test-exactness addendum `61`**, contract §2.7, and the `1187b9a..fcd55a2` implementation. Verified base == `fcd55a2`, upstream-equal, clean worktree, live Opus 4.8 Ultracode, `/fable-builder`, no concurrent writer, no Grok reuse.

## Finding closure (A4-1, A4-2, A4-3)

- **A4-1 (200% Office-first equivalent).** At 200% root text the compact cards grew to ~31% coverage — a wall again, larger than the rejected 28% normal-scale wall. Fix: the on-canvas labels are the first layer only while they stay within the ≤22% Office-primary bound (≈ up to 1.3× text, since the fixed-width card's height scales with text). At or above `HIGH_TEXT_EQUIVALENT_SCALE` (1.3) the production overlay (`src/ui/pixel/living-office-actor-overlay.tsx`) switches to an explicit **roster-equivalent mode**. The scale is **production-observable, not a test class**: a `10rem` probe span (invisible, out of flow) whose measured width / 160 is the real root scale — reacting to a user font preference or an author root-font change, unlike media-query `rem` — measured **pre-paint by a `useLayoutEffect`** at mount (so a page mounting already under high text switches before its first paint and never presents the card wall, even for one frame) plus a `ResizeObserver` for later text-scale changes. The overlay carries an explicit `data-office-label-mode` marker (`labels` | `roster-equivalent`); in roster-equivalent mode all on-canvas production labels are removed (never a 1..N-1 partial state) and every visible actor's complete first layer, incl. Team, stays in the always-visible roster. Reduced-motion/static/keyboard/screen-reader/forced-colors equivalence is retained and nothing infers work or authority.
- **A4-2 (gates bound to the exact visible actor set).** The A3 predicates could be satisfied by a single label plus a full roster (Sentinel: hide seven of eight → 2.09% coverage still passed). Fix (per addendum `61`): one **shared, reusable combined predicate** (`assertCompleteLabelSet`) derives the expected set from the `data-actor-label-count` contract and requires exactly one visible in-viewport label per expected actor, each with all nine first-layer fields and a per-fact source, **and** union coverage within the ≤22% bound. The negative challenge hides **exactly one** label and asserts that **same combined predicate** becomes false while union coverage alone stays ≤22% (coverage is never sufficient by itself — not a weaker parallel `visibleAfter < expected` calculation), then restores the label and re-proves the predicate. The 200% roster-equivalent state (`assertRosterEquivalentMode`) requires the explicit marker, zero partial canvas labels, **exact set equality** between the visible-actor ids and the `data-actor-roster` ids, one row per actor, and per row: role, stable display name, all seven mapped compact facts incl. Team, and a **non-empty source** for every mapped fact. Returning to normal text re-proves the exact all-label predicate.
- **A4-3 (exact accessible source contract).** `actorLabelAccessibleName` now announces the full source name for **every** compact fact — Team, session process, AI identity, **model, effort, AI runtime, operational state** — not only Team/process/identity. A unit assertion (`tests/ui/actor-summary.test.tsx`) walks each fact phrase and fails if any `…, source …` is omitted.

## Preserve — verified

The accepted normal 100% composition is preserved **exactly**: no baseline changed (the probe span, DOM marker, `useLayoutEffect`, and accessible-name additions are all non-visual at 100%). A3-1, I2-1/I2-3/I2-4, the 17-field drawer + focus restoration, the strict CSP / Pixi lazy boundary + shared non-blank canvas proof, mobile/forced-colors/reduced-motion/static/prototype behavior, M1 fallback, and all auth/security/authority boundaries are unchanged.

## Exact changed-file list (fourth rework, vs `fcd55a2`)

Source (09N allowlist): `src/ui/pixel/living-office-actor-overlay.tsx`, `src/ui/pixel/living-office.css`. Tests: `tests/e2e/living-pixel-office.spec.ts`, `tests/ui/actor-summary.test.tsx`. Docs (directly affected as-built sections): `docs/architecture/AGENT_OFFICE_BATCH_A_APPLICATION_INTEGRATION_DESIGN_DELTA.md` (new §19), `docs/operations/AGENT_OFFICE_BATCH_A_IMPLEMENTATION_WORKUNIT_PLAN.md` (new §6.4), `docs/contracts/AGENT_OFFICE_BATCH_A_IDENTITY_ORGANIZATION_CONTRACT.md` (A4 note), `docs/FEATURE_INDEX.md` (§6 rework note). **No baseline, config, dependency, or runtime/auth/server file changed.**

## Forbidden / excluded — confirmed

No partial hidden desktop facts (roster-equivalent is complete, never 1..N-1). No test-only production behavior (the high-text switch is production-observable). No sub-10px text, color-only or hover-only meaning, stale/masked evidence, assertion weakening, threshold-only proof, `.skip`/`.only`, config/dependency/package/lock change, `eslint-disable`/`@ts-ignore`/`@ts-expect-error`, Grok or excluded-session input. No agents/sub-agents, self-review, risk acceptance, force push, or protected/main action. `.grok/` and `grok*` never staged. `git diff --check` clean.

## Commands / checks (fourth rework; concise outcomes)

- `npm run check` — **green**: `eslint .` clean, `tsc --noEmit` clean, `vitest run` **632/632 across 93 files**, `npm run build` succeeds.
- CD-3 boundary — **6/6** (within vitest).
- Living Office E2E (`playwright.batch-a-living-office.config.ts`) — **3/3**, deterministic. Desktop covers the initial-high-text mount (roster-equivalent from first paint), the 100% shared combined predicate + exactly-one-hidden negative challenge (predicate false, coverage still ≤22%, restored true), the reactive 200% transition with exact per-actor roster equivalence, and return-to-normal re-proof; mobile keeps the roster-with-Team equivalent; static preserved.
- Composed E2E — **3/3**, deterministic, **byte-identical**.
- Prototype E2E — **20/20**, **byte-identical**.
- Demo E2E — **43 passed / 23 skipped**.
- Production build + loopback rehearsal — office a separate lazy chunk, eager entry Pixi-free, shell/asset `200`, startup `AUTH_BLOCKED`, protected projection `503 AUTH_PROVIDER_UNAVAILABLE`, listener rebind + writer lock released.
- `git diff --check` clean; forbidden-scope/suppression scans clean; **no baseline changed**; disposable `test-results-*/` reconciled before return.

## Fresh unmasked visual evidence (directly inspected)

- 200% desktop capture — the office world (brick floor, desks, monitors, characters) is fully visible with **no on-canvas label cards** over it (roster-equivalent mode); the HUD copy is honest and the complete first layer is in the roster below.
- 100% static/desktop — unchanged from the accepted composition (compact two-column cards, Team + source codes, ~17% coverage); mobile hides on-canvas labels with the 8-actor roster (incl. Team). Live desktop 100% coverage 16.8% (≤22%), 200% roster-equivalent (0 labels).

## Boundaries

Independent same-session Sentinel delta re-review, Advisor audit, and Leo/GPT final approval remain external and pending. No next mission inferred. Returning the durable result and pointer to Advisor, then stopping.
