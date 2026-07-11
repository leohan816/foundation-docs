# FABLE5 FINAL IMPLEMENTATION DELTA RE-REVIEW — Agent Office M01 Rework

- Actor: **Fable5 Reviewer** (`reviewer-fable5`, same session as the final dual NEEDS_PATCH) · Pass: `IMPLEMENTATION_REVIEW__AGENT_OFFICE_M01_FINAL_REWORK_DELTA` · Level 3 · Skill: `/fable-sentinel`
- Delta: base `72c24fe` -> code `0f90e39` (36 files, +2842/-38) -> docs `3bd0e8f` = HEAD = origin (fetched; clean tree). Full Vitest suite re-run by this reviewer post-rework: **passed, exit 0** (my own execution).
- Date: 2026-07-11 · Return to: **Advisor**
- **VERDICT: `NEEDS_PATCH`** — AO-E-R2 CLOSED; AO-E-R1 closed as originally worded but superseded by the AO-E-R3 operational-conformance findings, which I reproduced first-hand: the executable runtime is a synthetic fail-closed shell, not the mission's operational private control plane. Seven distinct in-scope CODE_DEFECTs; none requires credentials, secrets, network exposure, or weakened auth to fix.

## 1. Original findings

- **AO-E-R2: CLOSED (empirical).** `authorityRole` is now threaded end-to-end: `server/application.ts:81,175` -> `advisor-inbox/service.ts:369,384,408` into command/artifact/event, with an authority-evidence correspondence check (`service.ts:746` rejects `evidence.authorityRole !== command.authorityRole`) via the new `DecisionAuthorityEvidenceVerifier`; dedicated regression tests exist (`tests/integration/decision-authority-evidence.test.ts`, advisor-inbox suite) and passed in my run.
- **AO-E-R1: CLOSED AS WORDED / SUPERSEDED BY AO-E-R3.** The original defect (no executable composition, fixture-only entrypoint with no API client) is materially addressed: `start:loopback` CLI (`node dist/core/runtime/cli.js`), `src/runtime/{cli,composition,composition-core,projection}.ts`, and a typed browser runtime client (`src/ui/runtime/client.ts` — status/projection/messages/alerts/events + SSE/CSRF). But what the composition actually assembles fails the mission's final expected state (section 2).

## 2. AO-E-R3 disposition (each item independently reproduced)

1. **CLI hard-codes a fixture manifest** — `src/runtime/cli.ts:24,27` binds `fixtures/manifests/agent-office-m01.v1*.json`, not the canonical Advisor manifest. `CODE_DEFECT` (manifest import machinery exists; the source must be configurable trusted config pointing at the committed canonical manifest).
2/7. **No observation/import coordinator** — `src/runtime/composition-core.ts` imports no Git/Tmux/Artifact/MissionManifest observation adapter (direct grep = 0 in `src/runtime`); the Batch B read-only adapters exist and are tested but are not wired, so `TMUX_OBSERVABILITY: ACTIVE` is unattainable. `CODE_DEFECT`.
3. **Unconditional freshness labels** — `src/runtime/projection.ts:39,42` hard-codes `presentation: 'CURRENT'` / `reasonCode: 'VERIFIED_LOCAL_EVENT_PROJECTION'` regardless of evidence, bypassing the real freshness machinery (`src/application/hosts/freshness.ts`). `CODE_DEFECT` (also an honesty-of-display violation of the design's staleness rules).
4. **Durable alerts not surfaced** — `src/runtime/projection.ts:81` emits `alerts: []` while `DurableAlertCenter` is composed. `CODE_DEFECT`.
5. **Office scene disabled in the real runtime** — `src/ui/runtime/runtime-app.tsx:43` `showOfficeScene={false}` (the tested Batch C event-backed scene is the mission centerpiece). `CODE_DEFECT`.
6. **Composition selects the disabled Hermes stub** — `src/runtime/composition-core.ts:5,98` instantiates `HermesAdvisorGateway` instead of injecting the approved fixed `TmuxAdvisorGateway` port. `CODE_DEFECT` for the wiring; actual tmux sends remain legitimately behind the canonical transport authority (`DEFERRED_WITH_GATE` for real delivery — not a reason to wire a permanently-disabled stub).
8. **Advisor loop not operable** — consequence of items 1/6: browser messages persist and ack/intake/decision routes exist, but delivery can only ever reach a disabled stub (manual fallback), so `ADVISOR_COMMUNICATION: ACTIVE` and proven work-resumption are unattainable in the composed runtime. Resolved by fixing 1/6 plus an end-to-end composed-runtime test; real delivery activation stays gated.
9. Documentation accuracy — handled in the design pass (R3.9 `DOCUMENTATION_STALE`).
- **Auth rider unchanged:** a genuinely authenticated private run still requires the LocalBootstrap secret-handling gate — `NEEDS_LEO_GPT_DECISION` (unchanged from the prior review; not merged into the above defects).

## 3. Distinctions required by the handoff

The rework delivers a **secure fail-closed executable shell** plus a separate synthetic test composition (`src/runtime/test-composition.ts`), and R2's authority machinery is real. It is NOT yet the **required operational private control plane**: with the current wiring, live mission progress, structured actor status, alerts, the event-backed scene, and active Advisor communication cannot be produced from real observations even with every legitimate gate approved. These are wiring defects between already-reviewed, already-tested components — exactly in-scope patches.

## 4. Verdict rationale

R2 closed with tests; R1's letter closed; but the mission-objective conformance check (mandated by this handoff) fails on seven reproduced wiring defects, all patchable by the same Worker without touching any forbidden surface. Per V2: `NEEDS_PATCH` (not FAIL — no boundary violation, components sound; not PASS_WITH_RISK — these are fixable defects, not acceptable residuals).

## 5. Self-review

All claims cite file:line reproduced this session or my own test execution (exit 0); Worker/Advisor texts were cross-checked, not trusted. Read-only; no patches; no credentials/DB/secrets/tmux input; results+pointer only. Not verified: e2e/visual re-runs (reported); real transport/provider behavior (gated, nonexistent).

Return to: **Advisor**.
