TARGET_ACTOR: Control
TARGET_SESSION: same existing Control session, never Advisor, Worker, or Reviewer session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260711_v3_package1b_data_governance_feedback_canonical_master_design
DO_NOT_PASTE_INTO: Advisor session, Worker sessions, Fable5 Reviewer session, or GPT strategy session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the assigned Control session

# V3 Package 1B Control Master Design Handoff

Model and effort: `<GPT-5.6-Sol:Max>`

Mode: `CONTROL_MASTER_DESIGN_MODE`

Mission type: `LEVEL_A_CANONICAL_DESIGN_ONLY__NO_IMPLEMENTATION`

Entry verdict: `DESIGN_ENTRY_GATE_PASSED`

Question-register freeze commit: `06198f2c1a002b82874465211cd120d3503ec463`

Question-register git blob: `c1a811457ff6929972334d663b97dc6ccbe2a8b3`

Question-register SHA-256: `8e2c74c7bf4a222780a0038f36bc496126a519f1de195b8ad08ada77d0005fa2`

## Required Direct Reads

Read and execute:

- `../foundation-docs/advisor/jobs/20260711_v3_package1b_data_governance_feedback_canonical_master_design/03_CONTROL_DESIGN_BRIEF.md`

Then directly read:

- `01_ADVISOR_BRIEF.md`
- frozen `02_PACKAGE1B_DESIGN_QUESTION_REGISTER.md`
- all canonical and repo/code sources required by the Control brief
- current foundation-control, FOUNDATION, and Cosmile active instructions
- actual cited code files, not summaries

Verify the frozen register commit/blob/SHA-256 before authoring. Do not edit the register. If it does not match, STOP and return to Advisor.

## Exact Outputs

Create only these canonical candidate documents:

- `../foundation-docs/설계문서/shared/v3/V3_PACKAGE1B_DATA_GOVERNANCE_FEEDBACK_CANONICAL_MASTER_DESIGN.md`
- `../foundation-docs/설계문서/shared/v3/V3_PACKAGE1B_DECISION_UNKNOWN_GATE_TRACEABILITY.md`
- `../foundation-docs/설계문서/shared/v3/V3_PACKAGE1B_FOUNDER_ACCEPTANCE_DESIGN_MATRIX.md`
- `../foundation-docs/설계문서/shared/v3/V3_PACKAGE1B_IMPLEMENTATION_RELEASE_PLAN.md`

Every candidate must remain `CANDIDATE_PENDING_REPO_VALIDATION_AND_FABLE5_REVIEW` with implementation authorization `NONE`.

Write the result to:

`../foundation-docs/runs/foundation-control/20260711_v3_package1b_data_governance_feedback_canonical_master_design/CONTROL_MASTER_DESIGN_RESULT.md`

Write the pointer to:

`../foundation-docs/advisor/jobs/20260711_v3_package1b_data_governance_feedback_canonical_master_design/11_CONTROL_RESULT_POINTER.md`

Commit and push only those six foundation-docs files. Do not commit foundation-control or any runtime repo.

## Non-Negotiable Boundaries

- Preserve D1, D2, D3, D4, D5-i, and D5-ii exactly.
- Preserve U-02/U-06 as experiment-required, U-03 as legal-policy hold, U-09 as open blocker, and every open/legal/experiment addendum.
- Initial Tranche A must work with no free text, Foundation/provider semantics, identity linking, ranking, durable memory, Foundation signal, or outbox flush.
- D5-i never waives D5-ii.
- Do not treat current `RecOutcomeFeedback`, consultation SSC/FRC, Foundation shared memory/CDM, generic CommerceEvent, or current outbox shape as approved Package 1B contracts.
- Do not invent legal periods, product policy, thresholds, human-review operations, provider state, DB state, or deployed state.
- Do not invoke Workers, Fable5, or any new actor/session/sub-agent.
- Do not modify runtime/source/schema/API/migration/test files.
- Do not access DB, env values, secrets, customer data, production/live, or external models.
- Do not write an executable implementation/DB/migration/deployment prompt.
- Do not broaden to SIASIU or Packages 2/3/4.

## STOP Conditions

STOP and return a decision addendum proposal to Advisor when:

- a required design section needs a new founder/product/risk choice;
- a legal/policy hold would need to be guessed;
- SIASIU scope becomes necessary;
- a candidate requires current Foundation signal/outbox use;
- a runtime or DB action would be needed;
- the frozen register cannot be verified;
- scope or actor authority conflicts.

## Completion

Answer all Q-01 through Q-29, preserve disagreements, cite actual files, identify unread/unverified surfaces, publish the candidate/result/pointer, return an ASCII-only pointer to Advisor, and STOP.
