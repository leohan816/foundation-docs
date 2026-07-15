========
TARGET_ACTOR: cosmile Worker
TARGET_ACTOR_ID: cosmile
TARGET_PROJECT: Cosmile / Memory V3 M2 A-B Implementation
TARGET_REPOSITORY: /home/leo/Project/Cosmile
TARGET_BRANCH: shadow/m4-cosmile-memory
BASELINE_COMMIT: 6e44aa40ffb2960573839a01424761dc5e98d610
EXPECTED_ORIGIN: git@github.com:leohan816/Cosmile.git
TARGET_SESSION_NAME: cosmile
TARGET_WINDOW_ID: @1
TARGET_PANE_ID: %1
ROLE_MODE: COSMILE_WORKER_IMPLEMENTATION
MODEL_EFFORT_IMPLEMENTATION: ultracode (verify live)
MODEL_EFFORT_FINAL_TESTS: max (switch and verify before final checks)
REQUIRED_SKILL: /fable-builder
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-AB-COSMILE-IMPLEMENTATION-001
READ_AND_EXECUTE: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/advisor/jobs/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/38_M2_AB_COSMILE_IMPLEMENTATION_HANDOFF.md
REVIEWED_DESIGN_COMMIT: 9530b221d4430d29bfb545702390ebc9e6606d6a
DESIGN_REVIEW_COMMIT: 5ebcb39b1ecfaaef8d9e5d35ef0268558944bd27
EXPECTED_RESULT: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/cosmile/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_AB_COSMILE_IMPLEMENTATION_RESULT.md
EXPECTED_POINTER: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/cosmile/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_AB_COSMILE_IMPLEMENTATION_RESULT_POINTER.md
EXPECTED_DESIGN_MIRROR: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/설계문서/cosmile/COSMILE_추천수명주기_구매피드백_커머스증거_설계서.md
RETURN_TO: foundation-advisor
PRE_DISPATCH_LIVE_VERIFICATION: REQUIRED
DO_NOT_EXECUTE_FROM_MEMORY: true
READ_REFERENCED_FILES_DIRECTLY: true
DO_NOT_BROADEN_SCOPE: true
NO_NEW_AGENT_OR_SUBAGENT: true
TESTS_BEFORE_CODE: true
REAL_DB_PROD_LIVE_SECRET_ENV_PII: forbidden
C_IMPLEMENTATION: forbidden
OUTBOX_DELIVERY_FOUNDATION_INTAKE: forbidden
PRODUCT_COMMIT_AND_NONFORCE_SHADOW_PUSH: authorized_after_checks
NO_REVIEWER_DISPATCH: true
STOP_AFTER_RETURN: true

Open READ_AND_EXECUTE directly. Apply REQUIRED_SKILL, verify exact runtime and
Git state, create the canonical product design document before code, implement
only the independently reviewed A/B allowlist, use ultracode for implementation
and max for final tests/diff audit, write the declared evidence/mirror, return
only the pointer to foundation-advisor, and STOP.
========
