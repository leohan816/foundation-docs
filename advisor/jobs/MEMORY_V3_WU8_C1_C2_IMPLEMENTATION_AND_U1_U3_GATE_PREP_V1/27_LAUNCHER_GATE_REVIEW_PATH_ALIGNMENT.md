========
TARGET_ACTOR: foundation-reviewer-fable5
TARGET_SESSION: foundation-reviewer-fable5
TARGET_WINDOW: @5
TARGET_PANE: %5
ROLE: Same Independent Reviewer — own-artifact path alignment only
MODEL: claude-fable-5
EFFORT: max
REQUIRED_SKILL: /fable-sentinel
MISSION_ID: MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1
TASK_ID: WU8-U1-U3-GATE-REVIEW-PATH-ALIGNMENT-001
HANDOFF_COMMIT: 6265c724ec244b6479d16c813ce7ab2869038912
READ_AND_EXECUTE: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/advisor/jobs/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/26_HANDOFF_GATE_REVIEW_PATH_ALIGNMENT.md
EXPECTED_RESULT_PATH: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/U1_U3_GATE_REVIEW_RESULT.md
EXPECTED_POINTER_PATH: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/U1_U3_GATE_REVIEW_POINTER.md
RETURN_RESULT_TO: foundation-advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
READ_REFERENCED_FILES_DIRECTLY: true
NO_NEW_REVIEW: true
DO_NOT_BROADEN_SCOPE: true
NO_PATCH_OR_SUBJECT_WRITE: true
NO_COMMIT_OR_PUSH: true
NO_NEW_AGENT_OR_SUBAGENT: true
STOP_AFTER_RETURN: true

Open READ_AND_EXECUTE directly. Republish only the same Reviewer's own completed
full-review artifacts byte-identically at the Manifest-declared paths, verify
hash equality, return to foundation-advisor, and STOP.
========
