# Cosmile Worker Design/Admin Preparation Run Prompt

========
TARGET_ACTOR: Cosmile Worker
TARGET_PROJECT: Cosmile
TARGET_REPO: ../Cosmile
TARGET_APP_ROOT: ../Cosmile/app
TARGET_SESSION_NAME: existing Cosmile Worker session
WORK_MODE: DESIGN_AND_ADMIN_PREPARATION_ONLY
REQUIRED_SKILL: none; do not invoke /fable-builder
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation/06_WORKER_DESIGN_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
Open and follow READ_AND_EXECUTE directly in the existing Cosmile Worker session.
Create the design/admin preparation package only.
Do not connect to a DB, execute queries or migrations, provision roles, change
permissions, inspect secret values, modify runtime files, or create a Phase 2A
execution prompt.
Return the result and pointer to Advisor.
Keep terminal transport output ASCII-only.
========

