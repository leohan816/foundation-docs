# Agent Office Batch A — Worker Fifth Rework Result (A5-1, A5-2, A5-3)

`AGENT_OFFICE_BATCH_A_MODERN_OFFICE_IDENTITY_COMPLETION_001`

## Identity

- Mission/job ID: `AGENT_OFFICE_BATCH_A_MODERN_OFFICE_IDENTITY_COMPLETION_001` (fifth implementation-review rework)
- Actor: **Agent Office Worker** (existing `agent-office-opus` session); model Opus 4.8 (1M), effort Ultracode, `/fable-builder`
- Project / repository: Agent Office Batch A / `/home/leo/Project/agent-office-batch-a-001`
- Branch: `batch-a/modern-office-identity-001`
- Reviewed base / prior candidate: `43107b9c087a5d172d5f670e6b01bd75ab9ac1db`
- Fifth-rework HEAD: `95e493c` (base commit `d235db4088b9dee7c8648b5d2e5ace0940d9dab4` + Advisor addendum `64` roster negative-exactness commit `95e493c`)
- Push status: **non-force pushed** to `origin/batch-a/modern-office-identity-001` (`43107b9..d235db4..95e493c`, fast-forward); local == upstream.
- Inputs read directly: `63_ADVISOR_SENTINEL_THIRD_DELTA_VALIDATION.md`, `SENTINEL_IMPLEMENTATION_THIRD_DELTA_REREVIEW_RESULT.md`, addendum `61`, handoff/run `09O`, contract §2.7, and the current production overlay/roster/scene/drawer/CSS + affected tests. Verified base == `43107b9`, upstream-equal, clean worktree, live Opus 4.8 Ultracode, `/fable-builder`, no concurrent writer, no Grok reuse, no excluded-session input.

## Finding closure (A5-1, A5-2, A5-3)

- **A5-1 (CODE/EVIDENCE) — operable high-text equivalent + focus restoration.** Roster-equivalent mode hid every actor-detail affordance and the roster was non-interactive, so a 200% user could not open the 17-field drawer; and closing a drawer opened at normal scale after a text-scale change dropped focus to `BODY`. Fix (no duplicated drawer/actor state): the overlay handle exposes `openActorDrawer(actorId, invoker)`; `src/ui/pixel/living-office-semantic-mirror.tsx` renders one native `<button data-actor-roster-trigger>` per roster row that `src/ui/pixel/production-pixel-world-scene.tsx` wires to `overlayRef.current.openActorDrawer(...)`, opening the **same single** drawer and recording the trigger as the invoker. `close()` restores focus to the recorded invoker if it is still visible, else to the same actor's other visible trigger — the on-canvas label, or (after a normal→high transition that hid the label) the roster trigger — never `BODY` or a different actor. Visibility is a computed-display/`hidden`/ancestor walk that works in both the browser and jsdom. The stable actor identity + evidence provenance are unchanged and the roster trigger creates no authority/assignment/dispatch/work meaning. The real text-scale probe, pre-paint `useLayoutEffect` switch, explicit `data-office-label-mode` marker, zero partial/on-canvas labels, and mobile/reduced-motion/forced-colors/screen-reader/normal-scale drawer behavior are preserved. Browser tests prove initial-200% keyboard activation → exact actor drawer → Escape and close-button → focus back to the trigger, and the normal→high transition focus restoration.
- **A5-2 (TEST/EVIDENCE) — exact anti-shortcut predicates.** The A4 combined predicate could false-pass a wrong-but-unique actor id, a duplicated/missing field, empty source values, or all labels translated off-screen; the roster helper accepted empty role/name or a duplicated/missing fact. Fix: the label and roster predicates bind to an **authoritative** expected actor-id set published straight from the production frame — `data-office-actor-ids` on `.living-office-surface` (`production-pixel-world-scene.tsx`), NOT derived from the label/roster elements under test — so the gates are not tautological. The label predicate requires exact id-set equality + exactly one label per actor, positive-area presence intersecting the production viewport, exactly the nine unique non-empty §2.7 field keys, exactly the seven unique sourced facts with non-empty sources, Team, and the ≤22% Office-coverage bound. The roster predicate requires exact id-set equality, one row per actor, non-empty role and stable name, exactly the seven unique mapped facts with non-empty values, and one non-empty source per fact. The exactly-one-hidden/coverage-alone/restored challenge is kept; added challenges prove the same predicate rejects — for the labels: a wrong-unique actor id, a duplicated field key, an empty source, and all labels off-viewport; for the roster (per addendum `64`): a wrong-unique roster id, an empty stable display name, an empty role, an empty fact source, and a duplicated fact key — each mutating then restoring the real DOM and re-proving the positive predicate, so the exact production gate (not a weaker parallel calculation) is exercised.
- **A5-3 (TEST) — exact source-phrase unit gate.** The A4-3 unit accepted a generic `source <UPPERCASE>.` for all seven facts. Fix: the unit asserts each fact's exact `PIXEL_ACTOR_FACT_SOURCE_LABELS[source]` phrase in the accessible name, and per fact abbreviating that one source must break the exact-phrase assertion.

## Preserve — verified

The accepted normal-scale composition is preserved **exactly**: no baseline changed (the roster "Open detail" trigger sits below the 1440×900 fold; the `data-office-actor-ids`/`openActorDrawer`/visibility changes are non-visual at normal scale). A3-1/A3-2, A4-1/A4-2/A4-3, I2-1/I2-3/I2-4, the 17-field drawer + focus, the strict CSP / Pixi lazy boundary + shared non-blank canvas proof, and all auth/security/authority boundaries are unchanged. `src/ui/pixel/contracts.ts`, `production-render-input.ts`, `pixel-render-host.tsx`, `living-office-hud.tsx`, package/lockfile, TypeScript/Playwright configs, and the composed runtime server are **untouched**.

## Exact changed-file list (fifth rework, vs `43107b9`)

Source (09O allowlist): `src/ui/pixel/living-office-actor-overlay.tsx`, `src/ui/pixel/living-office-semantic-mirror.tsx`, `src/ui/pixel/living-office.css`, `src/ui/pixel/production-pixel-world-scene.tsx`. Tests: `tests/e2e/living-pixel-office.spec.ts`, `tests/ui/actor-summary.test.tsx`. Docs (directly affected as-built sections): `docs/architecture/AGENT_OFFICE_BATCH_A_APPLICATION_INTEGRATION_DESIGN_DELTA.md` (new §20), `docs/operations/AGENT_OFFICE_BATCH_A_IMPLEMENTATION_WORKUNIT_PLAN.md` (new §6.5), `docs/contracts/AGENT_OFFICE_BATCH_A_IDENTITY_ORGANIZATION_CONTRACT.md` (A5 note), `docs/FEATURE_INDEX.md` (§6 rework note). **No baseline, config, dependency, or runtime/auth/server file changed.**

## Forbidden / excluded — confirmed

No redesign, new dependency/config/baseline, lint/type weakening, suppression, `eslint-disable`/`@ts-ignore`/`@ts-expect-error`, `.skip`/`.only`, raw terminal/private data, auth/server/transport/command expansion, DB, remote/live, Batch B-E, Grok or excluded-session input, agents/sub-agents, self-review, force push, or protected/main action. `.grok/` and `grok*` never staged. `git diff --check` clean.

## Commands / checks (fifth rework; concise outcomes)

- `npm run check` — **green**: `eslint .` clean, `tsc --noEmit` clean, `vitest run` **632/632 across 93 files**, `npm run build` succeeds.
- CD-3 boundary — **6/6** (within vitest).
- Living Office E2E (`playwright.batch-a-living-office.config.ts`) — **3/3**, deterministic. Desktop adds the A5-1 initial-200% roster-trigger keyboard drawer + Escape/close focus restoration, the normal→high transition focus case, and the A5-2 authoritative-set predicate with all reject challenges; mobile/static preserved.
- Composed E2E — **3/3**, deterministic, **byte-identical**.
- Prototype E2E — **20/20**, **byte-identical** (overlay changes are production-gated / non-visual to the prototype).
- Demo E2E — **43 passed / 23 skipped**.
- Production build + loopback rehearsal — office a separate lazy chunk, eager entry Pixi-free, shell/asset `200`, startup `AUTH_BLOCKED`, protected projection `503 AUTH_PROVIDER_UNAVAILABLE`, listener rebind + writer lock released.
- `git diff --check` clean; forbidden-scope/suppression scans clean; **no baseline changed**; disposable `test-results-*/` reconciled before return.

## Fresh unmasked visual / focus evidence (directly inspected)

- Initial-200% roster (captured + inspected): all eight actors render as complete cards — name, role, `Team: <value> VERIFIED REGISTRY`, and every §2.7 fact with its full source label — each with a native `Open detail` trigger (the keyboard-activated one shows a focus ring). No on-canvas card wall; the Office stays primary.
- Focus: keyboard activation of a roster trigger opens exactly that actor's `role="dialog"` drawer; Escape and the close button both return focus to the invoking trigger; opening at normal scale then switching to 200% returns focus, on close, to the actor's now-visible roster trigger (asserted, not `BODY`).
- Normal desktop 100% and mobile equivalents unchanged from the accepted composition.

## Boundaries

Independent same-session (SOL) Sentinel fourth narrow delta re-review, Advisor audit, final rehearsal, and Founder approval remain external and pending; Batch B remains unauthorized. No next mission inferred. Returning the durable result and pointer to Advisor, then stopping.
