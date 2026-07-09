TARGET_ACTOR: Sentinel
TARGET_REVIEWER: Fable5 Design Reviewer
TARGET_SESSION: separate Fable5 review session, never Advisor session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260709_v3_11c2_design_doc_review_gate_setup/
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target Fable5 review session

이 지시문을 붙여넣을 대상: Fable5 Design Reviewer
이 지시문을 붙여넣으면 안 되는 곳: Advisor 세션 / GPT 전략 세션 / Worker 세션 / Cosmile Worker 세션
작업 결과 반환 대상: Advisor

# Fable5 Design Review Handoff - V3-11C2 Commerce Memory Design

Fable5 Design Reviewer 확인.

이 작업은 설계검수입니다.
구현 작업이 아닙니다.
Worker 작업이 아닙니다.
Phase 2A 실행 작업이 아닙니다.
DB 접속, query 실행, migration 실행, runtime repo 수정, Worker handoff 작성은 금지입니다.

## Required Skill / Role

Use:

`/fable-sentinel`

Use it as design review only.

Do not use `/fable-builder`.
Do not implement, patch, or approve final release.

## Required Read

Read these files directly:

1. `../foundation-docs/설계문서/cosmile/COSMILE_V3_11C2_COMMERCE_MEMORY_DESIGN.md`
2. `../foundation-docs/advisor/jobs/20260709_v3_11c2_design_doc_review_gate_setup/01_DESIGN_DOC_REVIEW_GATE_PROPOSAL.md`

If needed, read linked Advisor evidence from the design doc:

- `../foundation-docs/advisor/jobs/20260709_v3_11c2_commerce_memory_schema_design_review/01_SCHEMA_DESIGN_REVIEW.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_phase2a_readonly_preflight_approval_package/01_ADVISOR_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_phase2a_approval_fields_options/01_ADVISOR_BRIEF.md`

Do not read or access DB/prod/live/main/secret.
Do not print raw `DATABASE_URL`.

## Review Focus

Evaluate whether:

1. The design doc accurately reflects Leo/GPT business decisions.
2. The `RecOutcomeEvent` summary/current row interpretation is sound.
3. A separate additive future event log is safer than storing multiple lifecycle rows in `RecOutcomeEvent`.
4. The boundary is clear: raw commerce evidence stays in Cosmile; Foundation receives refined/whitelisted signals only.
5. Personal data, payment data, raw order/customer data, and secrets are prevented from entering Foundation signals.
6. Phase 2A is sufficiently narrowed to read-only invariant checking.
7. Future refund/cancel/reorder/direct/session attribution can be added without replacing the current summary-row structure.
8. Unknowns, blindspots, hidden assumptions, or large design decisions remain unresolved.
9. The design doc is clear enough to support future implementation or Phase 2A decision-making after Leo/GPT final design approval.

## Explicit Non-Goals

Do not:

- execute Phase 2A;
- write Worker handoff;
- access DB;
- run query;
- run migration;
- modify runtime repo;
- stage/commit/push runtime repo;
- enable `COSMILE_REC_OUTCOME_ENABLED`;
- merge main;
- inspect secrets;
- print raw `DATABASE_URL`;
- approve final release;
- claim Phase 2A, Phase 2B, production, or operational readiness.

## Verdict Options

Return exactly one verdict:

- `PASS`
- `PASS_WITH_RISK`
- `NEEDS_PATCH`
- `FAIL`

Use `PASS` only if the design is clear and sufficient for Leo/GPT final design approval consideration.

Use `PASS_WITH_RISK` only if remaining risks are explicit, bounded, and can be accepted by Leo/GPT without patching the design first.

Use `NEEDS_PATCH` if the design can likely be fixed within the current design scope.

Use `FAIL` if the design is unsafe, contradictory, or too incomplete to patch narrowly.

## Result Storage

Write the full review result to:

`../foundation-docs/runs/cosmile/20260709_v3_11c2_design_doc_review_gate_setup/FABLE5_DESIGN_REVIEW_RESULT.md`

Write the Advisor pointer to:

`../foundation-docs/advisor/jobs/20260709_v3_11c2_design_doc_review_gate_setup/12_FABLE5_DESIGN_REVIEW_RESULT_POINTER.md`

Commit/push only the foundation-docs result and pointer files.

Do not stage, commit, push, or modify runtime repos.

## Required Chat Output

After writing and pushing the result files, output only:

```text
## RESULT SUMMARY

- Actor:
  Fable5 Design Reviewer

- Target project:
  Cosmile

- Job:
  20260709_v3_11c2_design_doc_review_gate_setup

- Result:
  PASS | PASS_WITH_RISK | NEEDS_PATCH | FAIL

- Full result saved:
  ../foundation-docs/runs/cosmile/20260709_v3_11c2_design_doc_review_gate_setup/FABLE5_DESIGN_REVIEW_RESULT.md

- Pointer saved:
  ../foundation-docs/advisor/jobs/20260709_v3_11c2_design_doc_review_gate_setup/12_FABLE5_DESIGN_REVIEW_RESULT_POINTER.md

- Foundation-docs commit:
  <commit hash>

## NEXT ACTION ROUTING

- Target actor:
  Advisor

- Target session:
  Advisor session

- Leo action:
  이 POINTER BLOCK을 Advisor 세션에 붙여넣으십시오.

- Return result to:
  Advisor

- Do not send to:
  Cosmile Worker session, Sentinel implementation review session, Service Reviewer session, GPT strategy session

- Status:
  DESIGN_REVIEW_RESULT_READY_FOR_ADVISOR

## POINTER BLOCK

DESIGN_REVIEW_RESULT_WRITTEN
TARGET_PROJECT: Cosmile
ROLE_ACTOR: Fable5 Design Reviewer
RESULT_FILE: ../foundation-docs/runs/cosmile/20260709_v3_11c2_design_doc_review_gate_setup/FABLE5_DESIGN_REVIEW_RESULT.md
POINTER_FILE: ../foundation-docs/advisor/jobs/20260709_v3_11c2_design_doc_review_gate_setup/12_FABLE5_DESIGN_REVIEW_RESULT_POINTER.md
FOUNDATION_DOCS_COMMIT: <commit hash>
RUNTIME_REPO: none
RUNTIME_COMMIT_STATUS: no runtime changes
RETURN_TO: Advisor
NEXT_ACTOR: Advisor
```

