========
TARGET_ACTOR: foundation-reviewer-fable5
TARGET_SESSION: foundation-reviewer-fable5
TARGET_WINDOW_ID: @5
TARGET_PANE_ID: %5
ROLE_MODE: DELTA_DESIGN_REVIEW
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-C-WU5-DELTA-DESIGN-REVIEW-001
REVIEW_ID: M2-C-WU5-DELTA-DESIGN-REVIEW-001
TARGET_REPOSITORY: /home/leo/Project/FOUNDATION
TARGET_BRANCH: shadow/foundation-shared-memory-v0
TARGET_HEAD: 3e6abeec04f370dff1844afc429bd39487149c02
FOUNDATION_DOCS_BRANCH: advisor/foundation-team-role-alignment-20260714
SUBJECT_BASE: 00d65f8bd09636ebf57c55ace45e5cc8a7ae4ff3
SUBJECT_HEAD: 826bafdc30b9f8ec15104c3b9ca72ab5a4053456
ACTUAL_RUNTIME_VERIFIED_BY_ADVISOR: claude-fable-5 / max
REQUIRED_SKILL: /fable-sentinel
REQUESTED_EFFORT: max
READ_AND_EXECUTE: advisor/jobs/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/91_M2_C_WU5_DELTA_DESIGN_REVIEW_HANDOFF.md
EXPECTED_RESULT_PATH: runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU5_DELTA_DESIGN_REVIEW_RESULT.md
EXPECTED_POINTER_PATH: runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU5_DELTA_DESIGN_REVIEW_RESULT_POINTER.md
RETURN_RESULT_TO: foundation-advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
READ_REFERENCED_FILES_DIRECTLY: true
REVIEW_DELTA_ONLY: true
DO_NOT_PATCH_SUBJECT: true
DO_NOT_BROADEN_SCOPE: true
NO_NEW_AGENT_OR_SUBAGENT: true
PRODUCT_TEST_EXECUTION: forbidden
COMMIT_PUSH: forbidden
STOP_AFTER_RETURN: true

Open READ_AND_EXECUTE directly from the exact committed foundation-docs branch.
Verify live session, actual model, max effort, workspace, Sentinel role, and
independence. Review only the immutable four-path WU5 design delta plus the minimum
load-bearing context. Write only the declared Reviewer result and pointer, return
the pointer to foundation-advisor, and STOP.
========
