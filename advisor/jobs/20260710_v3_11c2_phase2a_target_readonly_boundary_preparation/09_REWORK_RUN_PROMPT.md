# Cosmile Worker Design Rework Run Prompt

========
TARGET_ACTOR: Cosmile Worker-Rework
TARGET_PROJECT: Cosmile
TARGET_REPO: ../Cosmile
TARGET_APP_ROOT: ../Cosmile/app
TARGET_SESSION_NAME: same existing Cosmile Worker session
WORK_MODE: DESIGN_ONLY_REWORK
REQUIRED_SKILL: none; do not invoke /fable-builder
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation/09_REWORK_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
Open and follow READ_AND_EXECUTE directly in the same Cosmile Worker session.
Patch only the approved design document and mirror for Fable5 P-1, P-2, and P-3.
Do not access a DB, execute queries or migrations, provision roles, grant or revoke
privileges, change permissions, inspect secrets, or modify runtime files.
Do not create an admin or Phase 2A execution prompt.
Return the rework result and pointer to Advisor.
Keep all terminal transport output ASCII English only.
========

