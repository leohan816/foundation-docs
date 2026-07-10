# FABLE5 FOUNDER PACKAGE DELTA RE-REVIEW — V3 Package 1A

- Mission: `V3_PACKAGE1A_INDEPENDENT_UNKNOWN_RESOLUTION_AND_FOUNDER_DECISION_PACKAGE`
- Actor: **Fable5 Reviewer** (Sentinel session — same session that issued the NEEDS_PATCH at `362c331`) · Pass: `DESIGN_REVIEW__FOUNDER_PACKAGE_CHALLENGE_DELTA_REREVIEW` · Skill: `/fable-sentinel` + delta-review + review-classification references (loaded this session)
- Date: 2026-07-10 · Return to: **Advisor** (not final approval)
- **VERDICT: `PASS`** — all nine findings CLOSED; no regression introduced by the patch (rationale in section 5)

## 1. Reviewed diff and files

- Base: founder package @ `2b43cf1` (pre-patch, snapshot-fixed via `git diff 2b43cf1..HEAD`). Patch commit: `6a5c4d2` "docs(advisor): patch Package 1A founder decision draft".
- Actual diff inspected in full (not trusted from the patch record): `FOUNDER_DECISION_PACKAGE.md` (+53/-16 lines) and `FOUNDER_ACCEPTANCE_SHEET.md` (+20 lines incl. Scenario 8). Patch-commit file list verified: only the two founder files + advisor loop/index/handoff artifacts (`10_LOOP_STATE.md`, `22_...PATCH_RECORD.md`, `23_...HANDOFF_PROMPT.md`, run prompt, `index.md`) — matches the patch record's claimed scope. `ACTOR_COMPARISON_MATRIX.md`, the frozen register, all actor assessments, and runs/ artifacts (other than my own prior challenge result) are untouched since `2b43cf1` (diff empty).
- Also read directly: `22_FOUNDER_PACKAGE_CHALLENGE_PATCH_RECORD.md`, patched `FOUNDER_DECISION_PACKAGE.md` and `FOUNDER_ACCEPTANCE_SHEET.md` (current text), my own challenge result + pointer (`362c331`), and the delta handoff `23_...HANDOFF_PROMPT.md`.

## 2. P-1..P-9 closure table (verdicts from the diff text, not the patch report)

| # | Level | Verdict | Empirical basis (diff/current text) |
|---|---|---|---|
| P-1 | REQUIRED | **CLOSED** | D5 split into `D5-i` (ownership: A joint / B single / C defer) and `D5-ii` (containment: A required / B rely-on-no-consumer). Independence stated three times: section header "Selecting an ownership model must not silently remove the containment gate"; `D5-i-B` text "...while still applying the independent D5-ii containment decision below"; recommendation "Choosing single ownership under D5-i-B does not waive containment." Waiving containment now requires the EXPLICIT choice `D5-ii-B`, which the recommendation rejects — the silent-waiver path is gone. The old D5-C decomposes into `D5-i-C` + `D5-ii-B`, both explicit. |
| P-2 | REQUIRED | **CLOSED** | New Scenario 8 (fake/incentivized/replayed/competitor feedback) contains ALL eight required elements: user-visible (no product-level conclusion from volume; individual guidance separated from population claims), stored (structured reports with provenance/dedup/abuse-review state only), deleted/blocked (duplicates/replays/unauthenticated blocked from certainty escalation, aggregates, product action, ranking, learning), automatic allowed (rate-limit/quarantine per approved abuse policy; conservative request-scoped guidance without causality), automatic forbidden (no `repeated`/`verified` escalation from duplicate volume; no auto product block/ranking/memory/safety claim), human approval (product-level safety action, fraud disposition, privileged certainty transitions, quarantine release), rollback (quarantine batch, remove derived influence, recompute aggregates, restore prior state, audit trail), evidence (threat model, dedup/replay fixtures, rate-limit/quarantine tests, blocked-certainty-escalation regression, independent review). Matches ADD-01's attack class including the certainty-escalation-via-duplicates vector from the blind assessment. Founder acceptance `PENDING`. |
| P-3 | RECOMMENDED | **CLOSED** | F-8 extended: "This package does not approve or resolve the existing consultation external-egress path; ... must be handled by a separate explicit gate" + F.1 gate #2 `EXISTING_CONSULTATION_EXTERNAL_EGRESS_GATE` ("Package 1A feedback decisions do not resolve it"). Routed without broadening — no new founder question, no resolution attempted. |
| P-4 | RECOMMENDED | **CLOSED** | Fact A-12 now: raw local id "into the outbox row's `canonicalUserId` column; the `payloadJson` whitelist itself excludes user identifiers" — exactly matches the code I verified first-hand (`foundationSignalMapper.ts:50` vs `:35-42`). |
| P-5 | RECOMMENDED | **CLOSED** | New section F.1 "Pre-Package-1B Gates That Must Not Be Lost" (7 named gates) is in the package Leo signs, explicitly "not additional founder product questions", and includes #3 `HISTORICAL_V3_DOC_STATUS_AND_SUPERSESSION_GATE` (ADD-07). Also consolidates containment (#1), consultation egress (#2), retention/erasure (#4), real-auth evidence (#5 = A-C2), metric governance (#6 = ADD-09), M4 overlay hold (#7). The two gates not in my patch list (#4, #5) restate already-carried dispositions (R-2 hard blocker; A-C2) — no invention. |
| P-6 | RECOMMENDED | **CLOSED** | New safe default F-10: "Do not migrate or populate the unmigrated M4 governance-overlay columns as a side effect of feedback work" (+ F.1 #7 reinforcement) — restores Cosmile's U-03 safe-default addition verbatim in substance. All prior F items preserved (old #10 renumbered to #11; 11-item list verified line-by-line). |
| P-7 | INFO | **CLOSED** | E-3 now four-way: Advisor/Foundation (possible future multi-axis direction), Cosmile stated separately in its actual conditional-skeptical form ("only conditionally feasible if an approved label-choice/coherence rule exists; none exists; forced optimistic single-label writes must be rejected"), Fable5 unchanged. Consolidation notes Cosmile's current-state alignment with the challenge. No actor position altered or invented — the Cosmile line matches its source assessment. |
| P-8 | INFO | **CLOSED** | D1 addition: eligibility under any non-HOLD choice must address sensitive populations (pregnancy, minors) through the section-D legal/safety review; "This package does not decide those rules" — cross-reference without deciding. |
| P-9 | INFO | **CLOSED** | Scenario 5 now: "a to-be-created and independently reviewed incident and user-notification policy. No such approved policy artifact exists today"; automatic-action line hardened ("until that policy exists, stop and require human security/privacy direction") — stricter, not weaker. |

## 3. Regression checks (delta questions 8-10)

- **Five-decision limit (Q8)**: Section G remains five decision sections; D5 now contains two independent sub-choices (six choices total across five sections). This is the structure P-1 itself required and the patch record discloses it plainly. Both sub-choices are founder-level (governance model; gate requirement). No technical question was added anywhere; the "do not ask Leo for routes/fields/enums/algorithms" guards are intact. No regression.
- **Acceptance-sheet honesty/completeness (Q9)**: Scenarios 1-7 unchanged except S5 (diff-verified — only S5 lines and status fields moved); Scenario 8 complete (table above); no scenario claims current capability; status fields updated honestly (`DRAFT_PATCHED_AFTER_FABLE5_NEEDS_PATCH_PENDING_DELTA_REREVIEW...`, challenge field `NEEDS_PATCH_RECEIVED__DELTA_REREVIEW_PENDING`). No regression.
- **New unsupported fact / hidden product choice / weakened safe default / traceability loss (Q10)**: A-12 rewrite is code-accurate; E-3 rewrite is source-accurate; F.1 gates restate carried dispositions; S8 prescriptions are conditional on future approval and consistent with existing invariants (dedup-before-escalation, human-gated privileged transitions). No safe default was weakened — F-8 and S5 got stricter, F list grew by one. Traceability table (section I) unchanged and its "D5" references remain valid for the split decision. Scope clean: no runtime/canonical/matrix/register/assessment file touched. No regression found.

## 4. Residual risks (all carried from the challenge result — none introduced by the patch)

1. `D5-i-C` + `D5-ii-B` remains a constructible combination (the old D5-C), but it is now an explicit double choice recommended against — the silent path is closed; the founder can still knowingly choose it.
2. Deployed outbox/CommerceEvent row state, provider retention, and credential state remain UNVERIFIED (inherent to the read-only mission).
3. Enqueue code keeps operating wherever the app runs until D5-ii lands.
4. Historical V3-0x docs remain banner-less until F.1 gate #3 executes.
5. INFO only: section H's sentence "remains a draft until Fable5 completes DESIGN_REVIEW__FOUNDER_PACKAGE_CHALLENGE..." is now slightly stale (challenge done; delta pending) — the updated Status lines carry the accurate state; no action required.

## 5. Verdict rationale

Every finding was re-judged against the actual `2b43cf1..HEAD` diff and current file text, not the patch record (which proved accurate on all nine counts). Both REQUIRED items are closed at the decision-integrity level they were raised at: an ownership choice can no longer silently waive containment, and ADD-01 now has acceptance-level provable behavior. All six RECOMMENDED/INFO items are closed without changing any actor position, inventing policy, or weakening a default. The regression sweep found no new defect, no hidden product choice, and no scope creep. Per the V2 verdict contract this is `PASS` (criteria satisfied; the remaining residuals are mission-inherent unknowns already recorded for founder/legal/gate handling, not risks requiring acceptance to advance this artifact) — the package and acceptance sheet are ready for Leo/GPT decisions.

**VERDICT: `PASS`**

## 6. Self-review (Sentinel 6 rules)

- Delta discipline followed: item-by-item verdicts (CLOSED enum), before/after fixed by commit refs (`2b43cf1` base, `6a5c4d2` patch), judgments from diff text with report-vs-text cross-check (patch record verified accurate, including its disclosure of the D5 sub-decision structure).
- No sub-agent/delegated context/temporary session; no DB/secret/env access; no live calls; no file modified other than this result + pointer; no product-policy choice (all closure judgments are about integrity/coverage, not decision content).
- Not verified (unchanged from challenge, stated as such): deployed rows, credential/provider state, any runtime execution.
- Note on self-review boundary: this delta re-review judges Advisor's patch against my own prior findings — the standard NEEDS_PATCH -> same-session re-review loop (patcher = Advisor, reviewer = me; not self-review of my own patch).

Return to: **Advisor**. Final acceptance of the package = Leo/GPT.
