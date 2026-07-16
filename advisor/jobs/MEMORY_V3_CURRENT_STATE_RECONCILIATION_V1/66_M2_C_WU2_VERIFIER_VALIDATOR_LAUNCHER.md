========
TARGET_ACTOR: foundation Worker
TARGET_ACTOR_ID: foundation
TARGET_PROJECT: FOUNDATION / Memory V3 M2 C Shadow WU2
TARGET_REPOSITORY: /home/leo/Project/FOUNDATION
TARGET_BRANCH: shadow/foundation-shared-memory-v0
BASELINE_COMMIT: c7653b77900e6613d75fcc0f72577e6bbcb171fd
EXPECTED_ORIGIN: git@github.com:leohan816/foundation.git
TARGET_SESSION_NAME: foundation
TARGET_WINDOW_ID: @3
TARGET_PANE_ID: %3
ROLE_MODE: FOUNDATION_WORKER_C_VERIFIER_VALIDATOR
ACTUAL_MODEL: verify live; do not infer
MODEL_EFFORT_IMPLEMENTATION: ultracode — set and verify live
MODEL_EFFORT_FINAL_WU2_TESTS: max — switch and verify before final checks
REQUIRED_SKILL: /fable-builder
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-C-WU2-VERIFIER-VALIDATOR-001
READ_AND_EXECUTE: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/advisor/jobs/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/65_M2_C_WU2_VERIFIER_VALIDATOR_HANDOFF.md
WU1_EVIDENCE_COMMIT: f5c66a83bdea0593faec9f69a6c1aa5d736276d6
EXPECTED_RESULT: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/foundation/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU2_VERIFIER_VALIDATOR_RESULT.md
EXPECTED_POINTER: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/foundation/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU2_VERIFIER_VALIDATOR_RESULT_POINTER.md
EXPECTED_DESIGN_MIRROR: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/설계문서/foundation/FOUNDATION_COMMERCE_EVIDENCE_SHADOW_설계서.md
RETURN_TO: foundation-advisor
PRE_DISPATCH_LIVE_VERIFICATION: REQUIRED
DO_NOT_EXECUTE_FROM_MEMORY: true
READ_REFERENCED_FILES_DIRECTLY: true
DO_NOT_BROADEN_SCOPE: true
NO_NEW_AGENT_OR_SUBAGENT: true
TESTS_BEFORE_CODE: true
REAL_DB_NETWORK_PROVIDER_SECRET_ENV_PROD_LIVE: forbidden
GATES_0_AND_9_TO_11: forbidden
WORK_UNIT_3_TO_8: forbidden
PRODUCT_COMMIT_AND_NONFORCE_SHADOW_PUSH: authorized only after WU2 gates
FOUNDATION_DOCS_COMMIT_OR_PUSH: forbidden
NO_REVIEWER_DISPATCH: true
STOP_AFTER_RETURN: true

Open READ_AND_EXECUTE directly. Apply `/fable-builder`, verify exact runtime/Git,
implement only WU2 verifier protocols/defaults and pure ordered gates 1–8 using
ultracode, switch to max for final WU2 tests/privacy/diff audit, write the declared
evidence/mirror, return only the pointer to foundation-advisor, and STOP. Do not
start WU3 or any later WorkUnit.
========
