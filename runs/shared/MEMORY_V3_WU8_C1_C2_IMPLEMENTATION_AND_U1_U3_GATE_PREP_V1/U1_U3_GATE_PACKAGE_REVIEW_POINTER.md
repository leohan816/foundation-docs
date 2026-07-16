# Pointer — WU8 U1–U3 Gate Package Independent Full Review

```text
MISSION_ID: MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1
REVIEW_ID: WU8-U1-U3-GATE-PACKAGE-REVIEW-001
REVIEW_PASS: FULL_GATE_PACKAGE_REVIEW
ACTUAL_ACTOR: foundation-reviewer-fable5 (live: foundation-reviewer-fable5 / @5 / %5)
ACTUAL_MODEL: claude-fable-5 (live) · EFFORT: max (live env) · SKILL: /fable-sentinel

VERDICT: NEEDS_PATCH
FINDING (single, blocking-to-PASS, document-only):
  GP-1 — subject :205-207 (§4 Required logical model): the "must enforce" six-identity
  enumeration does not match the reviewed design §5.7 canonical six — it OMITS the
  review-draft slot uniqueness (service, evidence_id, candidate_slot) and SUBSTITUTES the
  lineage-head uniqueness (a §5.3 additional entity constraint). One-sentence correction;
  the pinned Control evidence (1efef80 §U3.2) already carries the correct set.
ALL_OTHER_CRITERIA: VERIFIED (facts letter-exact vs pinned source/Control · U1/U2/U3 complete
  per record §11 · 3/3/3 decision-ready options, none selected · zero invented paths ·
  blocked/unlocked WorkUnit maps exact vs design §14 · PASS-semantics and open-gate statements correct)

RESULT: runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/U1_U3_GATE_PACKAGE_REVIEW_RESULT.md
RESULT_SHA256: be0aac4395f08175ea58dc770198a911c2d7a728d14f379b4fa9a5776abdb488

SUBJECT_COMMIT: a30aa663ee978253ac4918bbda7e34856a35be04
SUBJECT_BLOB: bdd7d175a7ba4791f4378f9554d511d8b5403b35
SUBJECT_SHA256: 8c036ffa960cae614ae0adc94627d32b617f9de918e26839bbee8c281567e3c3
CONTROL_EVIDENCE: 1efef80 · DESIGN: 08dc39d (SHA-256 2213262a…) · FOUNDER: 691a2d0 · MANIFEST: 006ef91
SERIALIZATION: Track A complete (C1 ad172db and C2 b8b61d7 both PASS and pushed) — re-dispatch of the
  same pinned review after the earlier premature dispatch was cancelled with zero writes

CORRECTION_ROUTE: foundation-advisor applies the bounded document-only GP-1 fix to the subject file
  only (cycle 1 of max 2); same Reviewer/session delta-only re-review via GATE_DELTA_1 paths
OPTION_SELECTED / RISK_ACCEPTED / GATE_CLOSED / DISPATCH: NONE
STAGE_COMMIT_PUSH: ZERO (Advisor publishes)
U1_STATUS: OPEN · U2_STATUS: OPEN · U3_STATUS: OPEN
WU8_F1_F2_F3_C3_X1 / DELIVERY / INTAKE / DURABLE_BACKEND / FULL_PACKAGE_1B / M3: NOT_AUTHORIZED
RETURN_TO: foundation-advisor
STOP
```
