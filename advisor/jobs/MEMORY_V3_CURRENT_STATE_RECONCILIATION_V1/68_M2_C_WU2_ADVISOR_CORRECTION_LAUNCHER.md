========
TARGET_ACTOR: foundation Worker
TARGET_ACTOR_ID: foundation
TARGET_PROJECT: FOUNDATION / Memory V3 M2 C Shadow WU2 correction
TARGET_REPOSITORY: /home/leo/Project/FOUNDATION
TARGET_BRANCH: shadow/foundation-shared-memory-v0
BASELINE_COMMIT: a57344680650d5fb22452b94bf92ba4f4a5caa0e
EXPECTED_ORIGIN: git@github.com:leohan816/foundation.git
TARGET_SESSION_NAME: foundation
TARGET_WINDOW_ID: @3
TARGET_PANE_ID: %3
ROLE_MODE: FOUNDATION_WORKER_C_WU2_BOUNDED_CORRECTION
ACTUAL_MODEL: verify live; current observed Opus 4.8 after safeguard switch
MODEL_EFFORT: max — verify live
REQUIRED_SKILL: /fable-builder
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-C-WU2-VERIFIER-VALIDATOR-CORRECTION-001
READ_AND_EXECUTE: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/advisor/jobs/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/67_M2_C_WU2_ADVISOR_CORRECTION_HANDOFF.md
EXPECTED_RESULT: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/foundation/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU2_VERIFIER_VALIDATOR_RESULT.md
EXPECTED_POINTER: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/foundation/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU2_VERIFIER_VALIDATOR_RESULT_POINTER.md
RETURN_TO: foundation-advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
READ_REFERENCED_FILES_DIRECTLY: true
DO_NOT_BROADEN_SCOPE: true
NO_NEW_AGENT_OR_SUBAGENT: true
DELTA_ONLY: true
PRODUCT_ALLOWLIST: validator.py + test_commerce_evidence_validator.py only
FOUNDATION_DOCS_COMMIT_OR_PUSH: forbidden
WORK_UNIT_3_TO_8: forbidden
STOP_AFTER_RETURN: true

Open READ_AND_EXECUTE directly. Correct only Advisor Findings A and B at live max,
run only the declared WU2 delta checks, create a follow-up product correction commit,
non-force push it to the exact shadow branch, update only the declared WU2 evidence,
return the pointer to foundation-advisor, and STOP.
========
