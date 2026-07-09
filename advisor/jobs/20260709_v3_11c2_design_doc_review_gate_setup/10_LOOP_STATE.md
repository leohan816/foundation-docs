# 10 Loop State - V3-11C2 Design Doc Review Gate Setup

Date: 2026-07-09

## Current Status

`FABLE5_DESIGN_REVIEW_ROUTED`

## Completed

- Leo/GPT selected `OPTION_C_HOLD_FOR_DESIGN_REVIEW_GATE`.
- Advisor wrote the design review gate proposal.
- Leo/GPT approved the canonical design doc location:
  - `../foundation-docs/설계문서/cosmile/COSMILE_V3_11C2_COMMERCE_MEMORY_DESIGN.md`
- Advisor wrote and published the canonical design doc draft.
- Leo/GPT approved routing the design draft to Fable5 Design Review only.

## Current Required Actor

`Fable5 Design Reviewer`

The review must run in a separate Fable5 review session, never the Advisor session and never the Worker session.

## Files For Leo To Use

Short run prompt:

`../foundation-docs/advisor/jobs/20260709_v3_11c2_design_doc_review_gate_setup/07_FABLE5_DESIGN_REVIEW_RUN_PROMPT.md`

Full handoff prompt:

`../foundation-docs/advisor/jobs/20260709_v3_11c2_design_doc_review_gate_setup/07_FABLE5_DESIGN_REVIEW_HANDOFF_PROMPT.md`

## Blocking Rules

Do not proceed to Phase 2A, Phase 2B, Worker implementation, runtime repo modification, DB access, query execution, or migration execution unless:

1. Fable5 Design Review returns `PASS`, or returns `PASS_WITH_RISK` that Leo/GPT explicitly accepts;
2. Advisor writes review consolidation;
3. Leo/GPT gives final design approval.

## Pending Result

Expected full result:

`../foundation-docs/runs/cosmile/20260709_v3_11c2_design_doc_review_gate_setup/FABLE5_DESIGN_REVIEW_RESULT.md`

Expected pointer:

`../foundation-docs/advisor/jobs/20260709_v3_11c2_design_doc_review_gate_setup/12_FABLE5_DESIGN_REVIEW_RESULT_POINTER.md`

## Next Advisor Action After Result

After the Fable5 pointer returns to Advisor:

1. read the pointer and full result file;
2. compare findings against Leo/GPT intent and the canonical design doc;
3. write Advisor Review Consolidation;
4. return to Leo/GPT for Final Design Approval decision.

