# Advisor Validation of Fable5 AO12-A Review Result

Status: `REVIEW_COVERAGE_CORRECTION_REQUIRED__AO12_A_NOT_YET_ACCEPTED`

## Verified Review Evidence

- Fable5 used the same existing independent `reviewer-fable5` session.
- Result and pointer are the only files in Foundation Docs commit
  `331c26d09430ed2389aa889c7d5463d55f40edfc`.
- Agent Office remained clean and read-only at
  `ecd2652501df55aba0aa0f55c236b1933c6dc1e3`.
- The verdict target is AO12-A and the artifact answers all 14 questions.
- Fable5 directly reran full Vitest and the current-name scanner.

## Required Factual Correction

Question 8 contains a material evidence-description error:

- the result states that the integration-test touch converts a fixture into an
  explicit legacy-alias case and that historical IDs remain replayable;
- the actual diff removes the `legacyAlias` fixture and removes the runtime
  alias normalization from `normalizedActorRole`, `requiredId`, `stringList`,
  `sessionNameEscaped`, `windowNameEscaped`, and `normalizeOfficeStationId`;
- the replacement integration assertion validates only the canonical current
  `siasiu`/`SIASIU` configuration; and
- current forbidden-name inputs are rejected rather than normalized.

The frozen design requires zero forbidden tokens in current product surfaces
and requires the naming-only correction not to change canonical actor ID,
authority, assignment, transport, event, state, or baseline meaning. It does not
state that obsolete forbidden alias input remains accepted at runtime. Historical
documentation citations and immutable historical evidence are distinct from
runtime alias acceptance.

## Required Same-Reviewer Recheck

The same Fable5 session must determine from the actual pre/post code and frozen
design whether:

1. rejection of obsolete forbidden alias input is the intended current-name
   gate and does not change canonical actor/authority/assignment meaning; or
2. the removal creates a real backward-compatibility defect that requires a
   Worker patch.

Fable5 must correct the result and pointer. It must not preserve the unsupported
legacy-replay claim. Until the correction returns `PASS`, Advisor does not accept
AO12-A and AO12-B remains unauthorized.
