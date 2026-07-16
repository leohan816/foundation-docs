========
TARGET_ACTOR: foundation-reviewer-fable5
TARGET_SESSION: foundation-reviewer-fable5
TARGET_WINDOW_ID: @5
TARGET_PANE_ID: %5
ROLE_MODE: IMPLEMENTATION_REVIEW
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-C-WU7-IMPLEMENTATION-REVIEW-001
REVIEW_ID: M2-C-WU7-IMPLEMENTATION-REVIEW-001
TARGET_REPOSITORY: /home/leo/Project/FOUNDATION
TARGET_BRANCH: shadow/foundation-shared-memory-v0
VERDICT_TARGET_BASE: f6417004d9157766b2b23d4d0870ade7f0c7fe96
VERDICT_TARGET_HEAD: 33570b9d7db79c991bb216b6a2dc80880ba1f2d6
FOUNDATION_DOCS_BRANCH: advisor/foundation-team-role-alignment-20260714
FOUNDATION_DOCS_GATE_HEAD: f3725a1aa63506e013a2c42ac7fcb1833f097ad8
ACTUAL_RUNTIME: verify live; do not infer from session name
REQUIRED_SKILL: /fable-sentinel
REQUESTED_EFFORT: max — set and verify live
READ_AND_EXECUTE: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/advisor/jobs/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/109_M2_C_WU7_IMPLEMENTATION_REVIEW_HANDOFF.md
EXPECTED_RESULT_PATH: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU7_IMPLEMENTATION_REVIEW_RESULT.md
EXPECTED_POINTER_PATH: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU7_IMPLEMENTATION_REVIEW_RESULT_POINTER.md
RETURN_RESULT_TO: foundation-advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
READ_REFERENCED_FILES_DIRECTLY: true
DO_NOT_BROADEN_SCOPE: true
NO_NEW_AGENT_OR_SUBAGENT: true
INDEPENDENT_READ_ONLY_REVIEW: true
DO_NOT_PATCH_SUBJECT: true
PRODUCT_FOUNDATION_DOCS_EXISTING_ARTIFACT_WRITE: forbidden
DB_DOCKER_NETWORK_PROVIDER_SECRET_ENV_PROD_LIVE: forbidden
COMMIT_PUSH: forbidden
WU8: NOT_AUTHORIZED
STOP_AFTER_RETURN: true

Open READ_AND_EXECUTE directly from the exact committed foundation-docs branch.
Verify live session, actual model, max effort, workspace, Sentinel role, and
independence. Review the immutable WU1-WU6 implementation subject at the exact head,
run the authorized isolated tests, write only the declared Reviewer result/pointer,
return the pointer to foundation-advisor, and STOP. Do not patch or start WU8.
========
