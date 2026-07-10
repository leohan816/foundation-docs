# Fable5 Level 3 Design Re-Review Round 3 Run Prompt

========
TARGET_ACTOR: Fable5 Reviewer
TARGET_PROJECT: Cosmile Phase 2A target and read-only boundary design re-review
TARGET_REPO: ../foundation-docs
TARGET_SESSION_NAME: same existing Fable5 Reviewer session
REVIEW_PASS: DESIGN_REVIEW_REREVIEW_ROUND3
REVIEW_LEVEL: Level 3
REQUIRED_SKILL: /fable-sentinel
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation/07_FABLE5_DESIGN_REREVIEW_ROUND3_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
Open and follow READ_AND_EXECUTE directly in the same Fable5 Reviewer session.
Review only F-A and F-B against the actual round-2 diff and design document.
Do not trust Worker or Advisor summaries.
Do not access a DB, run queries or migrations, provision roles, change logging or
permissions, inspect secrets or logs, patch files, or modify any repo.
A PASS does not approve admin work or Phase 2A execution.
Return the round-3 result and pointer to Advisor.
Keep all terminal transport output ASCII English only.
========

