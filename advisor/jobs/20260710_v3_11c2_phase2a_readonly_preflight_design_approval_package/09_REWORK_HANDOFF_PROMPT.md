TARGET_ACTOR: Worker-Rework
TARGET_SESSION: existing Cosmile Worker session, never Advisor or Reviewer session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_readonly_preflight_design_approval_package
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the Cosmile Worker session

이 지시문을 붙여넣을 대상: Cosmile Worker
이 지시문을 붙여넣으면 안 되는 곳: Advisor 세션 / GPT 전략 세션 / Fable5 Reviewer 세션
작업 결과 반환 대상: Advisor

# Cosmile DESIGN_ONLY Rework Handoff

Read directly:

- `../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_readonly_preflight_design_approval_package/13_ADVISOR_FINDING_CLASSIFICATION.md`
- Fable5 result and pointer for this job
- current repo-local execution plan and mirror
- the original Worker brief

Patch only:

- `../Cosmile/app/docs/V3_11C2_PHASE2A_READONLY_PREFLIGHT_EXECUTION_PLAN.md`
- its byte-identical foundation-docs mirror

Write rework evidence only to:

- `../foundation-docs/runs/cosmile/20260710_v3_11c2_phase2a_readonly_preflight_design_approval_package/WORKER_REWORK_RESULT.md`
- `../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_readonly_preflight_design_approval_package/13_WORKER_REWORK_RESULT_POINTER.md`

Mandatory patch scope:

1. Replace C-2 with exact D-O1 index-shape detection. Match approved schema,
   `RecOutcomeEvent`, exact index name `RecOutcomeEvent_orderItemId_key`, unique,
   valid/ready, non-partial, non-expression, and exactly one key column named
   `orderItemId`.
2. Replace/extend C-3 so the full migration ledger is compared with the exact
   current three-migration set. Detect unexpected migration count.
3. Make missing/pending, finished/applied, rolled-back, incomplete, checksum drift,
   and unknown mappings explicit. Use locally calculated tracked migration-file
   checksums as expected non-secret constants.
4. Return only approved migration names, aggregate counts, booleans, and statuses.
   Do not design output of DB rows or raw DB checksum values.
5. Update no-write justification, STOP conditions, routing, and Fable5 evidence.
6. Change document status to
   `DESIGN_DRAFT_PATCHED_AFTER_FABLE5_NEEDS_PATCH_PENDING_REREVIEW`.

Do not connect to DB, run any query/migration, inspect secret values, change file
permissions, modify runtime/schema/migrations/tests/packages/flags, create an
execution prompt, or broaden beyond F-1/F-2/F-3.

Commit/push only the patched Cosmile design artifact. Commit/push only the mirror,
rework result, and pointer in foundation-docs. Preserve all unrelated files.

Return evidence to Advisor for validation and same-session Fable5 re-review.

