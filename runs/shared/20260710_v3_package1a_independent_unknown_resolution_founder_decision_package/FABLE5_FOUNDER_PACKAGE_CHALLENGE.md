# FABLE5 FOUNDER PACKAGE CHALLENGE — V3 Package 1A

- Mission: `V3_PACKAGE1A_INDEPENDENT_UNKNOWN_RESOLUTION_AND_FOUNDER_DECISION_PACKAGE`
- Actor: **Fable5 Reviewer** (Sentinel session) · Pass: `DESIGN_REVIEW__FOUNDER_PACKAGE_CHALLENGE` (second Fable5 pass; blindness lifted for comparison inputs only) · Level 3 · Skill: `/fable-sentinel` + review-classification + provenance-review references loaded
- Date: 2026-07-10 · Return to: **Advisor** (not final approval)
- **VERDICT: `NEEDS_PATCH`** (2 required patch items, both document-level; no structural/boundary failure — rationale in section 13)

## 1. Reviewed artifacts

All read directly and in full this session: frozen register `V3_PACKAGE1A_UNKNOWN_REGISTER.md` (freeze triple-match re-verified earlier this session: commit `fab82c45` / blob `0eac3e29` / sha256 `dab0ffa1`; targeted re-reads for disputed wording, e.g. `:235`); `ADVISOR_INDEPENDENT_ASSESSMENT.md` (222 lines); `FOUNDATION_INDEPENDENT_ASSESSMENT.md` (456 lines, corrected @ `9518bc6`); `COSMILE_INDEPENDENT_ASSESSMENT.md` (221 lines, corrected @ `d28307b`); own corrected `FABLE5_BLIND_ASSESSMENT.md` (@ `99559f7`); `18_CORRECTED_RESULT_REVALIDATION.md`; `ACTOR_COMPARISON_MATRIX.md` (424 lines); `FOUNDER_DECISION_PACKAGE.md` (219 lines); `FOUNDER_ACCEPTANCE_SHEET.md` (101 lines); `20_..._HANDOFF_PROMPT.md`. No sub-agent, delegated context, or temporary session was used; all evidence work was direct Read/grep in this session.

## 2. Direct evidence spot checks (disputed/load-bearing claims re-verified against actual files)

Claims originating from OTHER actors that the package leans on — each re-verified directly this session:

1. A-C1 commerce guest-login link IS live: `Cosmile/app/src/lib/mergeGuest.ts` — `cart_merged` CommerceEvent written with `userId: MOCK_USER.id` + `anonymousId: gid` + `properties.guestId` ("guestId↔userId 링크 보존" comment); invoked from `api/auth/mock-login/route.ts:4` and `api/cart/merge-guest-cart/route.ts:2`. CONFIRMED (package fact A-9, E-4).
2. A-C2 single mock user: `shopper.ts:12-17` logged-in => constant `MOCK_USER.id`. CONFIRMED (fact A-10).
3. Foundation learning envelope: `FOUNDATION/foundation/_core/foundation_customer_decision_memory.py:11,44-56` — `NEVER_UPGRADE_EVIDENCE=("preference","outcome_feedback")`, `evidence_contribution` returns 0.0 for those types, `overrides_safety` returns False unconditionally. CONFIRMED (matrix U-06/U-09 agreed facts).
4. `feature_flags.py:4-9` HARD_OFF includes learned_promotion/canonical_write/vault_write, `get()` forced False. CONFIRMED.
5. Foundation order-blindness: `ingress_gate.py:48` ORDER_PAYMENT_KEYS; `:96-97` `del node[k]` on sight. CONFIRMED (U-08 "Foundation must remain order/customer blind" is enforced code, not aspiration).
6. Foundation identity non-capability: `subject_identity.py:48,71,76` — mint paths unconditionally raise `SubjectMintDeprecated`. CONFIRMED (U-04).
7. Vocabulary divergence: `shared_memory/contract.py:29` EVENT_KINDS (5 values) vs `ingress_gate.py:27` SIGNAL_KIND (8 values) vs Cosmile mapper keys (`product_viewed`/`cart_add`/...) — three disjoint vocabularies. CONFIRMED (U-07).
8. Cosmile sanitizer test: `scripts/event-schema-eval.mjs` — `forbidden_key:message` rejection assertion present. CONFIRMED (C-F1 correction claims).
9. Consultation meta routes accept no raw-text field: grep message/rawText/text over `meta/start` and `meta/end` routes = 0 hits. CONFIRMED (U-01).
10. `ConversationMessage` has contentHash design and NO runtime writer (schema `:750-754`; zero `conversationMessage` references in src). CONFIRMED (U-05 Cosmile position).
11. Register frozen wording `:235` "...can send content to an external model **when enabled**" — the exact phrase E-6 disputes. CONFIRMED as quoted.
12. My own corrected findings the package consumes (33 route files; unconditional enqueue `commerceEventService.ts:58`; raw `canonicalUserId` mapper `:50`; `compose: True` `core.py:1616`; INVARIANTS `core.py:50`) — directly verified earlier this session (rework G7 inventory) and independently spot-checked by Advisor per `18_...REVALIDATION.md`.

No load-bearing package claim failed re-verification.

## 3. Unsupported or overstated facts

- **F-A12 wording (LOW, required fix as part of P-4)**: Package fact A-12 says the mapper "writes a local user identifier into outbox **payload state**". Actual code: the raw local id goes into the outbox ROW column `canonicalUserId` (`foundationSignalMapper.ts:50`); the `payloadJson` whitelist (`:35-42`) contains signalType/product/brand/channel/locale/country and NO user identifier. A Package 1B designer auditing "the payload" would find it clean and could miss the row column — the identifier disclosure risk is at row level (a flush worker would transmit row fields). The fact is true in substance, imprecise in the load-bearing noun.
- No other package FACT was found unsupported or overstated. Sections B ("resolved = current-state, not policy") and C (pre-pilot unprovables) are honestly framed; A-8 "largely stateless" carries the correct unverified-surface list; A-15 discloses the process violations plainly.

## 4. Disagreements preserved or erased

- E-1 (outbox), E-2 (safety precedent), E-4 (linking scope), E-5 (pilot executability), E-6 (compose/"when enabled") — all preserved faithfully against the source assessments, with consolidations that do not pick a winner beyond evidence. E-6 correctly converts the frozen register's "when enabled" into "no policy flag exists; credential availability is the remaining unverified condition" — matching both Foundation's and my corrected evidence.
- **E-3 grouping imprecision (INFO — P-7)**: E-3 lists "Advisor/Foundation/Cosmile: separate adverse fields suggest a possible multi-axis direction" vs Fable5 lossy/unsafe. Cosmile's actual position was conditional-skeptical ("can encode adverse+positive ONLY IF the label choice rule exists — no such rule exists"; safe default: reject single-label forcing at contract level) — closer to the challenge side than the grouping implies. The consolidation ("current schema is not approved as a mixed-feedback contract") is unaffected.
- Nothing erased or fabricated: every position I checked against its source assessment appears with its qualifiers; all 12 addenda (A-C1..3, ADD-01/02/04..09, Foundation freshness note) appear in the matrix disposition table.

## 5. Reversible / irreversible separation

Adequate. Irreversible edges carried per-unknown in the matrix COST_IF_WRONG rows (provider egress irrecoverable; irreversible batch transmission; destructive re-keying; deletion deadlock; unreconstructable provenance) and per-scenario in the acceptance sheet rollback lines. D2-B explicitly bans destructive re-keying; D3 separates the deletion promise from unverifiable full-erasure claims. No irreversible choice is presented as reversible. (INFO: no single consolidated irreversibility list exists in the package; the per-decision placement is acceptable.)

## 6. Experiment and legal/policy classification

Correct in both directions. Section C keeps experimental unknowns (response rate, calibration, wrong-link rates, review volume, KPI effect, provider behavior, row state) out of the founder questions with an explicit "not founder questions disguised as technical details" statement. Section D defers legal conclusions (jurisdiction, consent purpose, deletion promise scope, provider terms, duty-to-act) without guessing any; D3's product promise is explicitly labeled "for later legal review". The reverse error (design decisions disguised as experiments) is absent: U-09 authorization/fail-closed direction is classified as design/policy-first in the matrix.

## 7. Founder-question quality

The five decisions are genuinely founder-level (scope, identity default, raw-text/provider acceptance, value hypothesis + action boundary, contract governance), phrased in plain language, and each carries an explicit "do not ask Leo for fields/enums/algorithms" guard. Two defects:

- **P-1 (REQUIRED)**: D5 couples two independent choices. The outbox/consent/identifier **containment gate exists only inside option D5-A**. If Leo selects `D5-B SINGLE_OWNER`, the containment gate silently disappears — no other package text requires it. The matrix itself treats containment as its own question (U-07 LEO_DECISION_REQUIRED: "...and whether current enqueue must be separately gated or held before Package 1B"; same in U-03). A founder choice must not drop a safety gate as a side effect of an unrelated ownership choice. Fix (doc-level): split D5 into D5-i (owner model A/B) and D5-ii (containment gate before Package 1B: yes/no, recommended yes), or add the containment gate clause verbatim to D5-B.
- **P-8 (INFO)**: D1's eligibility language never surfaces sensitive-population scope (ADD-02: pregnancy/minors) even as a cross-reference; it lives only in section D legal questions. Legal-first routing is defensible; a one-line cross-reference in D1 ("eligibility includes sensitive-population scope — see D") would prevent the initial scope decision being read as population-blind.

## 8. Acceptance-sheet coverage

All seven scenarios contain every required element (user-visible behavior / stored / deleted-blocked / automatic allowed / automatic forbidden / human approval / rollback / proving evidence) and none pretends current existence — each is explicitly conditioned ("Today, no Package 1 feedback input exists", "if an approved feedback flow later exists"). Scenario 7 correctly encodes the anti-Goodhart boundary (frozen denominator, no relabeling organic purchases as recommendation wins, kill switch) matching my blind-pass reward-hacking findings. Scenario 6 correctly requires versioned supersession, privileged verified/contradicted transitions, and no automatic safety downgrade.

- **P-2 (REQUIRED)**: There is **no abuse/poisoning scenario**. ADD-01 (feedback authenticity: fake/incentivized/competitor adverse reports) is dispositioned "carry as pilot and safety design requirement" and D4 mentions "abuse controls" once — but the acceptance sheet is the artifact that defines provable behavior, and a known attack class (mass adverse reports against a competitor product driving certainty escalation or safety action) has no scenario stating what is automatically forbidden (no durable safety state from unverified volume; dedup/authenticity before certainty escalation; human review before product-level action) and what evidence proves it. Fix (doc-level): add Scenario 8 for feedback poisoning, or an explicit deferral row naming the owner and the gate where it will be specified.
- **P-9 (INFO)**: Scenario 5 references "the approved incident and user-notification policy" — no such policy artifact exists today. The sheet's global draft disclaimer partially covers this; marking the policy as to-be-created would remove the last ambiguity.

## 9. Missing unknowns / addenda

- All nine frozen unknowns and all twelve post-freeze addenda are carried in the matrix. Two carry-path gaps:
- **P-5 (RECOMMENDED)**: ADD-07 (historical-doc status banners) survives only in the matrix disposition table ("pre-Package1B documentation-hygiene gate"). The founder package — the artifact Leo reads and signs — never mentions it, and no consolidated pre-1B gate list exists (containment gate lives in D5-A, metric governance in D4, doc hygiene nowhere). Fix: add a short "Pre-Package-1B gates (not founder decisions; Advisor/Control-routed)" list to the package so non-founder gates cannot be lost at signature time.
- **P-6 (RECOMMENDED)**: Cosmile's U-03 safe-default addition — do not migrate/populate the un-migrated M4 governance overlay columns as a side effect of feedback work — was dropped from the matrix U-03 SAFE_DEFAULT and package F list. It guards against creating data whose meaning was never decided. Fix: one clause in F.
- No missing frozen unknown; no invalid addendum admitted.

## 10. Safe-default challenge

The F-list is materially protective for the feedback scope: F-1/2 stop collection and consultation reinterpretation; F-3 walls off `cart_merged` from feedback identity; F-6 blocks flush and names enqueue governance as a gate; F-7 blocks all learning-side effects; F-9 blocks unstaffed review promises; F-10 blocks 1B. Checked against the live code paths from the corrected assessments:

- **P-3 (RECOMMENDED)**: The one currently-active raw-text egress path — consultation text to Foundation and (credential permitting) to the external provider, with `compose: True` hardcoded and no kill switch — is constrained by NOTHING in the F-list, because every default is feedback-scoped. E-6's consolidation also restricts only "feedback text". Package 1A's register scoped U-05 to feedback, so this is a scope boundary rather than an error — but the package should say explicitly where the existing consultation-egress gate decision is routed (separate mission/gate), so the only live external raw-text path today does not fall between Package 1A (feedback-only) and Package 1B (blocked). One pointer sentence in F-8 or the pre-1B gate list suffices.
- Timing residual (unavoidable, correctly not patched by documents): the unconditional enqueue code keeps operating wherever the app runs until the D5 decision lands; deployed accumulation remains UNVERIFIED (no DB access). The package handles this honestly (fact A-12, E-1, D5) — noted here as a residual, not a defect.

## 11. Required patch items (delta-reviewable)

| # | Level | Item | Fix location |
|---|---|---|---|
| P-1 | REQUIRED | D5 option coupling silently drops the containment gate under D5-B | FOUNDER_DECISION_PACKAGE G/D5 |
| P-2 | REQUIRED | No abuse/poisoning acceptance scenario (ADD-01 unprovable at acceptance level) | FOUNDER_ACCEPTANCE_SHEET (new Scenario 8 or owned deferral) |
| P-3 | RECOMMENDED | Existing consultation external-egress gate decision unrouted (feedback-scoped defaults leave the only live raw-text path unowned) | Package F-8 or pre-1B gate list |
| P-4 | RECOMMENDED | Fact A-12 "outbox payload state" -> "outbox row (canonicalUserId column); payloadJson whitelist excludes user identifiers" | Package A-12 |
| P-5 | RECOMMENDED | Consolidated pre-1B gate list absent; ADD-07 doc-hygiene gate invisible in the package | Package (new short section) |
| P-6 | RECOMMENDED | M4 overlay-column no-populate safe default dropped | Package F list |
| P-7 | INFO | E-3 groups Cosmile with the multi-axis-direction camp despite its conditional-skeptical position | Package E-3 |
| P-8 | INFO | D1 lacks a sensitive-population cross-reference (ADD-02) | Package G/D1 |
| P-9 | INFO | Scenario 5 cites an incident policy that does not exist yet | Acceptance sheet S5 |

All are document-level; none requires re-discovery, new evidence, or actor re-runs.

## 12. Residual risks (after patches)

1. Deployed outbox/CommerceEvent row state remains unverified until an authorized environment inspection is approved (all actors consistent).
2. External-provider retention remains unverifiable from repositories; D3-B's later gates carry it.
3. The mock-auth environment means no identity or pilot evidence can be representative before real auth (A-C2) — D2/D4 correctly do not pretend otherwise.
4. Enqueue continues in code until D5 lands (timing residual above).
5. Historical V3-0x docs remain banner-less until the ADD-07 gate executes — a repo-local worker could still misread them as approval in the interim.

## 13. Verdict rationale

- Checks 1-12 of the handoff were each executed against the actual artifacts and, where disputed, against the actual repos (section 2). The comparison and package are evidence-faithful: no disagreement was erased, no FACT failed re-verification, no legal conclusion was guessed, no experimental unknown was disguised as a design decision, and no founder question asks for implementation detail.
- However, two defects sit exactly at the decision surface the founder will sign: P-1 lets an ownership choice silently drop a safety gate that the matrix itself classifies as an independent decision, and P-2 leaves a known, register-carried attack class (ADD-01) without an acceptance-level behavioral definition. Under the implementer-lens rule ("can the decision-maker decide correctly from this document alone?"), P-1 fails that test for D5-B; under the acceptance-sheet's own purpose (provable behavior), P-2 leaves a carried addendum unprovable.
- Both are patchable inside approved scope with no re-discovery, which per the V2 verdict contract is precisely `NEEDS_PATCH` (not PASS_WITH_RISK — the risks are not residuals to accept but wording/coverage defects to fix; not FAIL — no boundary, authority, safety, or structural failure exists; the package's substance is sound and close to signature-ready).

**VERDICT: `NEEDS_PATCH`** — Advisor patches P-1 and P-2 (P-3..P-6 recommended in the same edit), then same-session Fable5 delta re-review of the patched package/sheet only.

## 14. Self-review (Sentinel 6 rules)

- Every status claim above is anchored to file:line or a direct grep run this session; cross-actor claims consumed by the package were spot-checked first-hand (section 2), not trusted from the matrix.
- Process: no sub-agents/delegated contexts/temporary sessions; no DB/secret/env access (names included); no live calls; no file patched outside this result + pointer; no product policy chosen (all patch items are about decision INTEGRITY, not decision content).
- Self-caught during drafting: an early draft listed E-3 as a "softened disagreement" finding at MEDIUM; re-reading Advisor's own U-02 position showed Advisor stated the same conditionality, so the grouping error is real but consolidation-neutral — downgraded to INFO with the reasoning shown.
- Not verified (stated as such): deployed rows, credential state, provider behavior, any runtime execution; Foundation/Cosmile line numbers not individually re-read were sampled (all sampled lines matched — sections 2.3-2.7).

Return to: **Advisor**. Not final approval; Leo/GPT decide after patch + delta re-review.
