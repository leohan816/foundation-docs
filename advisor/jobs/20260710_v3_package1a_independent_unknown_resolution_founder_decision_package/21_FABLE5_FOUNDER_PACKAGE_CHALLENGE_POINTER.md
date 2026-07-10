# 21 Fable5 Founder Package Challenge Pointer — V3 Package 1A

- TARGET_PROJECT: shared (founder decision package + comparison matrix + acceptance sheet)
- ROLE_ACTOR: Fable5 Reviewer (Sentinel session)
- PASS_TYPE: DESIGN_REVIEW__FOUNDER_PACKAGE_CHALLENGE (second Fable5 pass; Level 3; /fable-sentinel + review-classification + provenance-review loaded)
- RESULT: **NEEDS_PATCH** (2 required document-level patches; substance sound, no structural/boundary failure)
- REQUIRED_PATCHES:
  - **P-1** FOUNDER_DECISION_PACKAGE D5: outbox containment gate exists only inside option D5-A — choosing D5-B silently drops a safety gate the matrix classifies as an independent decision. Split D5 (owner model / containment gate) or add the gate clause to D5-B.
  - **P-2** FOUNDER_ACCEPTANCE_SHEET: no abuse/poisoning scenario — ADD-01 (fake/incentivized/competitor adverse reports) has no acceptance-level definition of forbidden automatic action and proving evidence. Add Scenario 8 or an owned deferral.
- RECOMMENDED (same edit): P-3 route the existing consultation external-egress gate decision explicitly (feedback-scoped defaults leave the only live raw-text path unowned); P-4 fix fact A-12 wording ("outbox payload state" -> outbox row canonicalUserId column; payloadJson excludes user ids); P-5 add consolidated pre-1B gate list (ADD-07 doc-hygiene gate currently invisible in the package); P-6 restore M4 overlay-column no-populate safe default. INFO: P-7 E-3 Cosmile grouping; P-8 D1 sensitive-population cross-ref; P-9 S5 cites a not-yet-existing incident policy.
- CHALLENGE_COVERAGE: all 12 handoff checks executed; 12 cross-actor load-bearing claims re-verified directly against repos (mergeGuest both-id link, CDM 0.0/False envelope, HARD_OFF flags, ingress order-key delete-on-sight, SubjectMintDeprecated, 3-vocabulary divergence, message-rejection test, meta-route no-text, ConversationMessage no-writer, register :235 wording, plus my own corrected findings). No package FACT failed re-verification; no disagreement erased (E-1..E-6 faithful); no legal guess; no experiment disguised as design; founder questions are founder-level.
- RESULT_FILE: ../foundation-docs/runs/shared/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/FABLE5_FOUNDER_PACKAGE_CHALLENGE.md
- POINTER_FILE: ../foundation-docs/advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/21_FABLE5_FOUNDER_PACKAGE_CHALLENGE_POINTER.md
- INPUTS: register @ fab82c45 (triple-match re-verified) · Advisor first pass · Foundation @ 9518bc6 · Cosmile @ d28307b · Fable5 blind @ 99559f7 · 18_REVALIDATION · matrix · package · acceptance sheet
- PROCESS: no sub-agent/delegated context/temporary session; no DB/secret/env access; no live calls; read-only outside this result + pointer
- NEXT: Advisor patches P-1/P-2 (P-3..P-6 recommended) -> same-session Fable5 delta re-review of patched package/sheet -> then Leo/GPT decisions
- RETURN_TO: Advisor
- NEXT_ACTOR: Advisor
