# Fable5 Design Re-Review Run Prompt

========
TARGET_ACTOR: Fable5 Reviewer
TARGET_PROJECT: Cosmile Phase 2A preflight design re-review
TARGET_REPO: ../foundation-docs
TARGET_SESSION_NAME: same existing Fable5 Reviewer session
REQUIRED_SKILL: /fable-sentinel
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_readonly_preflight_design_approval_package/07_FABLE5_DESIGN_REREVIEW_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
Run this only in the same existing Fable5 Reviewer session that issued NEEDS_PATCH.
Open and follow READ_AND_EXECUTE directly.
Read the actual patch diff, design document, and migrations.
Do not trust Worker or Advisor summaries; independently re-review F-1, F-2, and F-3.
Do not connect to a DB, inspect secret values, execute queries or migrations,
patch the design, or modify any repository.
A design PASS does not approve Phase 2A. Keep execution status NOT_APPROVED.
Return the re-review result and pointer to Advisor.
========
