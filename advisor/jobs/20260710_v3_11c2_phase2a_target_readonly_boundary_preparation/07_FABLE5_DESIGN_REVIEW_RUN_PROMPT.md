# Fable5 Level 3 Design Review Run Prompt

========
TARGET_ACTOR: Fable5 Reviewer
TARGET_PROJECT: Cosmile Phase 2A target and read-only boundary design
TARGET_REPO: ../foundation-docs
TARGET_SESSION_NAME: existing Fable5 Reviewer session
REVIEW_PASS: DESIGN_REVIEW
REVIEW_LEVEL: Level 3
REQUIRED_SKILL: /fable-sentinel
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation/07_FABLE5_DESIGN_REVIEW_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
Open and follow READ_AND_EXECUTE directly in the existing Fable5 Reviewer session.
Independently inspect the actual plan, diff, commits, policies, and evidence.
Do not trust Worker or Advisor summaries.
Do not access a DB, execute queries or migrations, provision roles, change
permissions, inspect secrets, patch files, or modify any repository.
A design PASS does not approve admin work or Phase 2A execution.
Return the result and pointer to Advisor.
Keep the transport POINTER BLOCK ASCII-only.
========

