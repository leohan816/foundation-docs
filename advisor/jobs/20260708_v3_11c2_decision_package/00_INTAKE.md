# 00 Intake - V3-11C2 Decision Package Draft

## Job

`20260708_v3_11c2_decision_package`

## Leo/GPT Instruction Summary

Draft the D-O1/scope decision package that Leo/GPT must decide before V3-11C2 RecOutcomeEvent Behavioral Outcome work can begin.

This is not implementation work. This is not a Worker brief. This is not a runtime repo modification task.

## Goal

Prepare a clear decision package for V3-11C2, covering:

1. Whether initial scope is organic checkout MVI only.
2. Whether the hook point is after `mock-complete` `justPaid`.
3. Whether `recommendationId` is `null`.
4. Whether `attributionMode` is `organic`.
5. RecOutcomeEvent ID generator approach.
6. Idempotency approach: code-level existing-check vs unique index.
7. Feature flag name and default OFF.
8. Explicit out-of-scope boundaries.

For each decision, Advisor must present a recommended option and alternatives. Final decision remains with Leo/GPT.

## Required Input Read

- `../foundation-docs/advisor/_system/AGENTS.md`
- `../foundation-docs/advisor/jobs/20260708_cosmile_siasiu_code_structure_map/01_ADVISOR_BRIEF.md`
- `../foundation-docs/docs/reports/control/COSMILE_MEMORY_V3_11C2_REC_OUTCOME_EVENT_GATE_PLAN_20260707.md`

Supporting context read:

- `../foundation-docs/docs/reports/control/COSMILE_MEMORY_V3_11C_EVENT_WIRING_GATE_PLAN_20260706.md`
- `../foundation-docs/docs/reports/control/COSMILE_MEMORY_V3_04_ORDER_REVENUE_FEEDBACK_OUTCOME_CONTRACT_20260706.md`

## Allowed Write

- `../foundation-docs/advisor/jobs/20260708_v3_11c2_decision_package/00_INTAKE.md`
- `../foundation-docs/advisor/jobs/20260708_v3_11c2_decision_package/01_ADVISOR_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260708_v3_11c2_decision_package/index.md`

## Forbidden Actions

- Do not create a Worker brief.
- Do not create implementation instructions.
- Do not modify `../Cosmile`.
- Do not modify `../SIASIU`.
- Do not modify `../foundation-control`.
- Do not modify schema or migrations.
- Do not write DB data.
- Do not access prod/live/main/secret.

## Initial Assumptions

- V3-11C2 remains a decision draft until Leo/GPT explicitly approves a scope.
- The existing gate/plan says organic MVI is possible, but actual implementation cannot begin without D-O1 and scope approval.
- `foundation-docs` reports are evidence/archive; runtime behavior must still be checked in runtime code before implementation.
- This package should be committed/pushed only if staged files remain under `../foundation-docs/advisor/`.
