# FABLE5 FINAL IMPLEMENTATION REVIEW — Agent Office M01

- Mission: `AGENT_OFFICE_M01_ADVISOR_MANAGED_OFFICE_WEB_CONTROL_PLANE`
- Actor: **Fable5 Reviewer** (`reviewer-fable5`, independent) · Pass: `IMPLEMENTATION_REVIEW__AGENT_OFFICE_M01_FINAL` · Level 3 · Skill: `/fable-sentinel`
- Targets: implementation `e0a11f69`, final/as-built `72c24fe0` on `shadow/agent-office-m01` — HEAD = origin = `72c24fe0` (fetched), worktree clean; full chain `937f0c5 -> 7edc8f7(A) -> 85e66d8(B) -> 22baff7/e30a6cd/ad74b9e/243d3a5(C) -> 7366036/0480900(D) -> e0a11f6(E) -> 72c24fe(docs)` read from git directly
- Date: 2026-07-11 · Return to: **Advisor** (not final approval)
- **VERDICT: `NEEDS_PATCH`** — two CODE_DEFECTs (AO-E-R1 composition, AO-E-R2 authority linkage), both reproduced first-hand and patchable in-scope; one mission-closure question routed to Leo/GPT; everything else verified strong (rationale in section 5)

## 1. Independent verification performed

- **Full Vitest suite re-run by this reviewer**: `npm test` -> **196/196 passed, exit 0** (my own execution, 21.6s) — matches the Worker/Advisor claim of 50 files/196 tests. Playwright e2e 18/18 is REPORTED (Worker result + Advisor validation), not re-run here (no browser run in this review) — labeled per evidence discipline.
- Git evidence: branch/upstream equality, clean tree, and the exact batch commit chain re-derived; Batch E delta stat (+29018 lines cumulative through e0a11f6 from bootstrap; 180 files) and the 72c24fe docs-only delta (7 canonical files, +343/-161) verified; no runtime file in the docs commit; no hidden files outside declared scope observed in the chain.
- Source structure verified: `src/{adapters,application,contracts,domain,operations,persistence,pwa,server,ui}` + 16 test directories; server implements `startAgentOfficeHttpServer` (`src/server/http/server.ts:80`), bounded SSE (`src/server/sse/index.ts:57` `text/event-stream`), and a static shell (`src/server/http/static-shell.ts`); security/recovery/pwa suites were part of my 196-test run.
- Both open findings from `41_ADVISOR_BATCH_E_PRE_REVIEW_VALIDATION.md` independently reproduced (section 2) — the validation's observed facts are accurate on every point I checked.

## 2. Mandatory open-finding disposition (independently reproduced)

**AO-E-R1 — REPRODUCED. Classification: `CODE_DEFECT` (composition), plus `NEEDS_LEO_GPT_DECISION` (private-run auth gate), plus a `DOCUMENTATION_STALE` component handled in the design pass.**
Direct evidence: `src/ui/main.tsx:4-14` renders `Dashboard` from `CURRENT_DASHBOARD_VIEW_MODEL` (fixtures) and `COMMUNICATION_CENTER_FIXTURE`; grep over `src/ui` for `EventSource` or `/api/v1` = **zero hits**; grep for `startAgentOfficeHttpServer` outside `src/server` = zero (library/test surface only); `package.json` has Vite `dev`/`preview` only — no script or bin composes the reviewed Node server + state root + projections + built dashboard. The designed integrated flow (Master §6 architecture, §7 command->event->projection->SSE->browser) is therefore not realized end-to-end: components exist and are tested, but the mission's operational loop (live projection, active Advisor communication from the browser) cannot be exercised. Why CODE_DEFECT and not DEFERRED_WITH_GATE: the missing pieces — an executable composition root, a production entrypoint wired to session/SSE/projection/message APIs, and `communicationActionPort` supply — contain no secret and were within the approved design's own architecture; the separately-gated item is only the REAL auth provider. A correct patch leaves the composed runtime starting fail-closed (`AUTH_BLOCKED`/read-only-degraded per Operations §6, no-NoAuth rule preserved) until a provider is approved. Why the Leo/GPT rider: with the design's own rules (no `NoAuth` mutation provider; `TestAuthenticationProvider` guarded to tests; `LocalBootstrapAuthenticationProvider` behind an explicit secret-handling handoff), a genuinely authenticated private run — required by AO-WU-14 — cannot occur until Leo/GPT opens that gate. Whether M01 closes with a composed-but-`AUTH_BLOCKED` verification or waits for the provider gate is an authority decision; this review does not invent a credential or weaken authentication.
Required patch: executable composition root (server + application + state root + built dashboard serving), production browser wiring (authenticated session exchange, SSE `Last-Event-ID` client, projection fetch, Advisor message port), fixture demo retained only as an explicitly-marked non-default mode, plus regression tests (composition boot to `READ_ONLY_READY`/`AUTH_BLOCKED`, no-provider fail-closed, e2e against the composed server) and matching as-built docs.

**AO-E-R2 — REPRODUCED. Classification: `CODE_DEFECT`.**
Direct evidence: `src/server/http/schemas.ts:89,100` parses and enum-validates `authorityRole: 'Leo/GPT' | 'Advisor'`; `src/server/application.ts:66` types it; `application.ts:154-164` calls `inbox.linkDecision({requestId, messageId, decisionId, decisionArtifact, recordedAt}, advisorContext(command))` — **`authorityRole` is dropped**; `linkDecision` (`src/application/advisor-inbox/service.ts:358-368`) has no authority parameter and validates only ids/timestamp/artifact-ref shape (`SourceArtifactRef` = repository/commit/path/sha256 — it does not carry or verify an authority role at the application layer). The canonical contract (Domain §7.4/§8.5) requires a recorded decision to carry authority role with artifact, hash, and scope; the durable link event/projection preserves none, and no correspondence check ties the submitted label to authority evidence — an `advisor_operator` can submit either label with identical effect. The accepted field is non-functional and the Advisor-routine vs Leo/GPT distinction is unprovable from durable state.
Required patch: thread `authorityRole` into the link command, immutable link artifact, event payload, and projection; add a fail-closed correspondence rule (e.g., `authorityRole=Leo/GPT` requires the decision artifact to be a verified Leo/GPT decision record; mismatch = stable rejection); regression tests both directions (preserved role; mismatch rejected); as-built rows AO-REQ-010/019 updated from actual evidence.

## 3. Implementation coverage (handoff items 1-10)

1. **Loopback/HTTP boundaries — VERIFIED (tests + validation cross-check).** Security suite ran inside my 196/196 (bind policy, Host/peer/proxy rejection, Origin/Fetch-Metadata/CSRF, content-type/size/rate bounds); Advisor's direct code review of the same properties is consistent with the structure I inspected; no counter-evidence found.
2. **Sessions/capabilities/CSRF/test-provider fail-closed — VERIFIED** via the same suites (incl. AO-D-R1 hardening commit `0480900` "fail closed on invalid Advisor capability" present in the chain).
3. **No browser terminal/shell/tmux/Worker/Reviewer dispatch surface — VERIFIED**: route surface is the closed capability-routed POST set; grep confirms no dispatch/terminal route or target field; the only gateway is the fixed Advisor pointer gateway with the disabled Hermes stub.
4. **Static containment/headers/PWA cache/SSE privacy — VERIFIED** by test run + static-shell/sse source presence; service worker caching excludes API/auth/messages (pwa tests in my run).
5. **Durability/idempotency/audit/backup/restore/recovery — VERIFIED** by recovery/persistence/property suites in my run (replay equivalence, crash-tail, isolated restore, delivery disable, recovery proof).
6. **Desktop/mobile/reduced-motion/Korean labels — PARTIALLY VERIFIED**: ui suites (korean-vocabulary, dashboard component, runtime boundary) passed in my run; visual baselines and 18 Chromium tests are reported-passing (not re-run); Korean vocabulary module `src/ui/i18n/ko.ts` present and test-covered.
7. **Actual executable/composition path — FAILED: AO-E-R1** (section 2).
8. **Leo input -> artifact -> ack/intake/decision -> resumption — PARTIAL**: implemented and tested at the application layer (advisor-inbox integration tests in my run), but (a) not reachable from the production browser entrypoint (R1) and (b) decision authority linkage defective (R2).
9. **Project/Advisor isolation, additive multi-project — VERIFIED** (multi-project registry/read-only adapters from Batch B; no shared mutable authority; no cross-project dispatch surface).
10. **Git scope/pushes/clean state/no hidden forbidden work — VERIFIED**: chain contains only declared batch work + docs; HEAD=origin; clean tree; no DB/secret/provider/network-mode/production artifacts anywhere in the tree greps.

## 4. Excluded scope / not verified

Playwright e2e and visual baselines (reported 18/18, not re-run); real provider/private-network behavior (correctly nonexistent); deployed/runtime state beyond my local test execution; foundation-docs Batch A-D validation details beyond anchor cross-checks.

## 5. Verdict rationale

The implemented codebase is disciplined and its safety boundaries verified — my own full-suite run reproduces 196/196, the security/recovery/property coverage is real, scope is clean, and nothing forbidden exists in the tree. But the mission's two load-bearing capabilities fail direct reproduction: the product cannot actually be run as the designed integrated private web application (R1), and the decision-authority distinction the contract requires is not durably recorded (R2). Both are patchable inside approved scope by the same Worker without inventing credentials or weakening authentication; the only non-technical remainder is the provider-gate decision, which routes to Leo/GPT through Advisor. Per the V2 contract: `NEEDS_PATCH` (not FAIL — no boundary/authority violation, components sound; not PASS_WITH_RISK — these are defects to fix, not residual risks to accept).

**VERDICT: `NEEDS_PATCH`** — same-Worker patch (R1 composition + R2 authority linkage, with regression tests and as-built doc updates) then same-Reviewer delta re-review. `NEEDS_LEO_GPT_DECISION` rider: whether AO-WU-14 private-run verification proceeds composed-but-`AUTH_BLOCKED`/test-marked or awaits the LocalBootstrap secret-handling gate.

## 6. Self-review (Sentinel 6 rules)

- Status claims are backed by my own command output (git chain/upstream/clean, full `npm test` 196/196 exit 0, source greps reproducing R1/R2 at exact file:line); Worker/Advisor claims were cross-checked, not trusted — both validated accurate where load-bearing.
- Read-only: zero patches, zero runtime commits/pushes to agent-office; no new agents/contexts; no DB/secret/env/production/tmux-input access; only the two review results + one pointer written to foundation-docs.
- Not verified (stated): e2e/visual runs (reported only); provider-side/real-network behavior (nonexistent by design).

Return to: **Advisor**.
