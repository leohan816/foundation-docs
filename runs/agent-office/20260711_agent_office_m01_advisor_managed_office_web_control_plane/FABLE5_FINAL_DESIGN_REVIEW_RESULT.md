# FABLE5 FINAL DESIGN REVIEW (AS-BUILT) — Agent Office M01

- Mission: `AGENT_OFFICE_M01_ADVISOR_MANAGED_OFFICE_WEB_CONTROL_PLANE`
- Actor: **Fable5 Reviewer** (`reviewer-fable5`, independent) · Pass: `DESIGN_REVIEW__AGENT_OFFICE_M01_FINAL_AS_BUILT` · Level 3 · Skill: `/fable-sentinel`
- Target: canonical seven files at `72c24fe0` (docs-only delta from `e0a11f6`: 7 files, +343/-161 — read in full via diff + current text) — this pass is separate from, and does not imply, the implementation verdict
- Date: 2026-07-11 · Return to: **Advisor** (not final approval)
- **VERDICT: `NEEDS_PATCH`** — two as-built documentation defects (D-1, D-2) tied to the reproduced implementation findings, plus one stale heading (D-3); all doc-level, same-Worker patchable; the canonical design substance otherwise remains conformant (rationale in section 4)

## 1. Reviewed artifacts

All seven canonical files at `72c24fe0` (current text plus the `e0a11f6..72c24fe` diff read in full); prior approved design at `82821af` (reviewed by me at the delta PASS `6c9d94f`) as the regression baseline; mission intake/entry gate/unknown gate/manifest/design brief/addendum; my prior design review (`62dd994`) and delta re-review; Worker final result and `41_ADVISOR_BATCH_E_PRE_REVIEW_VALIDATION.md`; the actual implementation tree (for as-built conformance, via the implementation pass performed in this same session).

## 2. Design coverage (handoff requirements)

- **Purpose/non-goals/authority boundaries — CONFORMANT.** Non-goals and fixed prohibitions intact at 72c24fe; no authority expansion entered the docs across the batch updates; canonical V2/transport remain external authority; no doc claims `OFFICE_WEB_APP: RUNNING_PRIVATE` or `ADVISOR_COMMUNICATION: ACTIVE` (grep = zero) — the docs do not overclaim.
- **Hierarchy/counting/scope-change — CONFORMANT.** Byte-exact manifest v1, denominator 15, imported WorkUnit facts recorded without terminal-text inference; scope-change rules unchanged.
- **States (actor/mission/blocker/alert/decision/communication/activity) — CONFORMANT.** The 16-name conformance table, closed BlockerKind/AlertKind vocabularies, 13-field GPT package, and Korean vocabulary from the delta-PASS design are intact; as-built rows tie them to real code/tests (my test run covers the cited suites).
- **Evidence-backed completion / no prose inference — CONFORMANT** in both design text and per-batch as-built statuses (honest `IMPLEMENTED_BATCH_*__PENDING/ACCEPTED` vocabulary; `NOT_IMPLEMENTED` retained where true).
- **Advisor-only browser communication / no dispatch — CONFORMANT** (docs + implementation agree; closed route table; no target fields).
- **tmux/Hermes boundary — CONFORMANT** (capability-gated fixed gateway, disabled Hermes stub, transport authority referenced not duplicated; AO-D-R1 fail-closed correction recorded honestly).
- **Multi-project/multi-host additive boundaries — CONFORMANT** (local subsets marked; remote/Mac still `DEFERRED_WITH_GATE`).
- **Auth/CSRF/sessions/audit/rate/kill-switch/fallback — CONFORMANT** as design; real provider/private-network remain explicitly gated.
- **UI/animation from accepted events only — CONFORMANT**; Batch C refinements documented with their exact commits.
- **Crash/restart/backup/restore/rollback — CONFORMANT**; Batch E as-built paragraphs list the delivered recovery surface without SLA claims.
- **Visible unknowns/limitations/deferred gates — CONFORMANT in general** (deferred-gate table intact) **except the two items below**.

## 3. Findings (as-built defects)

- **D-1 (REQUIRED — ties to AO-E-R1): the as-built docs are silent on the composition/executable-path status.** The Batch E paragraph (Master §2) accurately lists the delivered boundary pieces and the FEATURE_INDEX row AO-REQ-003 notes "Live authenticated binding and real provider remain gated" — but nowhere do the canonical documents state the material as-built truth that the production browser entrypoint is fixture-only (`main.tsx` renders fixtures; the master's own §6/§7 integrated flow has no executable composition root). A reader of the canonical package would reasonably conclude the loopback shell + SSE + dashboard compose into a runnable private app. Under the addendum's as-built rule ("final reviewed documentation must describe the actual implementation") this is a documentation defect accompanying the code defect — the design must not be rewritten to excuse it, but the current-truth/traceability rows must record the divergence and its gate until the R1 patch lands. Classification: `DOCUMENTATION_STALE` (with the underlying capability gap classified `CODE_DEFECT` in the implementation pass).
- **D-2 (REQUIRED — ties to AO-E-R2): AO-REQ-010/019 evidence cells imply decision-flow conformance that the code contradicts.** Rows state "HTTP records only an already-made authority artifact" and "closed HTTP exposes ack/intake/decision only to advisor_operator" — while the reproduced implementation drops `authorityRole` before durable linkage and performs no authority-correspondence check, contrary to Domain §7.4/§8.5. The as-built cells must record this divergence (and be restored to conformant wording only from actual evidence after the fix). Classification: `DOCUMENTATION_STALE` accompanying the `CODE_DEFECT`.
- **D-3 (MINOR): Master §2 heading reads "Current Truth and Batch D Boundary"** while the section's content correctly includes the Batch E paragraph — one-word staleness from the Batch E docs update. Classification: `DOCUMENTATION_STALE`.

No silent rewrite of design to excuse code defects was found — the opposite defect exists (docs slightly ahead of/silent about code reality), which is the correct direction to fix by documenting divergence, not by weakening the design.

## 4. Verdict rationale

The canonical package remains substantively excellent and regression-free against the delta-PASS baseline: authority boundaries, vocabularies, gates, and honesty vocabulary are intact, and no operational overclaim exists. But this pass's explicit mandate is EXACT as-built truth, and two material divergences reproduced in the implementation pass are not recorded in the canonical documents (D-1, D-2). Under the addendum's own closure rules (complete critical traceability, visible limitations, divergence classification), the package cannot be accepted as final as-built documentation until those records exist — a small, same-Worker documentation patch naturally bundled with the R1/R2 code fixes. Per the V2 contract: `NEEDS_PATCH` (not PASS_WITH_RISK — these are correctable documentation defects, not residual risks; not FAIL — nothing structural or authority-violating).

**VERDICT: `NEEDS_PATCH`** — same-Worker patch (D-1/D-2 required, D-3 minor) bundled with the implementation fixes, then same-Reviewer delta re-review of both code and as-built docs.

## 5. Self-review (Sentinel 6 rules)

- Every claim cites the current file text, the `e0a11f6..72c24fe` diff, or a direct grep run this session (including the zero-hit overclaim grep and the §2 heading text); the implementation-pass reproductions ground D-1/D-2.
- Read-only; no canonical file patched; no product policy chosen; separate artifact and verdict from the implementation pass per V2 §9.
- Not verified (stated): Batch A-D validation internals beyond anchors; e2e/visual claims (reported, not re-run).

Return to: **Advisor**.
