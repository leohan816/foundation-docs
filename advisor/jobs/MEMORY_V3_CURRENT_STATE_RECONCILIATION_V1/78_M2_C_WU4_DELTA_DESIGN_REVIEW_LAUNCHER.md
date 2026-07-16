========
TARGET_ACTOR: foundation-reviewer-fable5
TARGET_SESSION: foundation-reviewer-fable5
ROLE_MODE: DELTA_DESIGN_REVIEW
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-C-WU4-DELTA-DESIGN-REVIEW-001
REVIEW_ID: M2-C-WU4-DELTA-DESIGN-REVIEW-001
TARGET_REPOSITORY: /home/leo/Project/FOUNDATION
TARGET_BRANCH: shadow/foundation-shared-memory-v0
TARGET_HEAD: de63c8fedaa27e470e44359cad1c2940bdc0a866
FOUNDATION_DOCS_BRANCH: advisor/foundation-team-role-alignment-20260714
SUBJECT_BASE: 590a72220229169513c3b50eb035d8d706c8a6b1
SUBJECT_HEAD: 954963841af166edf3f9b86ecbcc323945f94ff9
REQUIRED_SKILL: /fable-sentinel
REQUESTED_EFFORT: max
READ_AND_EXECUTE: advisor/jobs/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/77_M2_C_WU4_DELTA_DESIGN_REVIEW_HANDOFF.md
EXPECTED_RESULT_PATH: runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU4_DELTA_DESIGN_REVIEW_RESULT.md
EXPECTED_POINTER_PATH: runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU4_DELTA_DESIGN_REVIEW_RESULT_POINTER.md
RETURN_RESULT_TO: foundation-advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
READ_REFERENCED_FILES_DIRECTLY: true
REVIEW_DELTA_ONLY: true
DO_NOT_PATCH_SUBJECT: true
DO_NOT_BROADEN_SCOPE: true
NO_NEW_AGENT_OR_SUBAGENT: true
COMMIT_PUSH: forbidden
STOP_AFTER_RETURN: true

Open READ_AND_EXECUTE directly from the exact committed foundation-docs branch.
Verify live session, actual model, effort, workspace, Sentinel role, and independence.
Review only the immutable four-path delta and minimum load-bearing context.
Write only the declared Reviewer result and pointer, return the pointer to Advisor, and STOP.
========
