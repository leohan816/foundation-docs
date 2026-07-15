========
TARGET_ACTOR: cosmile Worker
TARGET_ACTOR_ID: cosmile
TARGET_PROJECT: Cosmile / Memory V3 M2 A-B Bounded Patch
TARGET_REPOSITORY: /home/leo/Project/Cosmile
TARGET_BRANCH: shadow/m4-cosmile-memory
PATCH_BASE: b8f1c57502011dc7656ada91b3655432583be925
EXPECTED_ORIGIN: git@github.com:leohan816/Cosmile.git
TARGET_SESSION_NAME: cosmile
TARGET_WINDOW_ID: @1
TARGET_PANE_ID: %1
ROLE_MODE: COSMILE_WORKER_BOUNDED_PATCH
MODEL_EFFORT_IMPLEMENTATION: highest available code-reasoning mode; disclose actual model because Fable 5 credits are exhausted
MODEL_EFFORT_FINAL_TESTS: max
REQUIRED_SKILL: /fable-builder
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-AB-COSMILE-IMPLEMENTATION-PATCH-001
READ_AND_EXECUTE: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/advisor/jobs/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/42_M2_AB_COSMILE_IMPLEMENTATION_PATCH_HANDOFF.md
IMPLEMENTATION_REVIEW_EVIDENCE_COMMIT: ada898e0212d2f36381b7609f9c612b53d1fa952
BLOCKING_FINDINGS: IR-F1 IR-F2 IR-F3
EXPECTED_RESULT: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/cosmile/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_AB_COSMILE_IMPLEMENTATION_PATCH_RESULT.md
EXPECTED_POINTER: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/cosmile/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_AB_COSMILE_IMPLEMENTATION_PATCH_RESULT_POINTER.md
RETURN_TO: foundation-advisor
PRE_DISPATCH_LIVE_VERIFICATION: REQUIRED
DO_NOT_EXECUTE_FROM_MEMORY: true
READ_REFERENCED_FILES_DIRECTLY: true
DO_NOT_BROADEN_SCOPE: true
NO_NEW_AGENT_OR_SUBAGENT: true
TESTS_BEFORE_CODE: true
DELTA_ONLY: true
REAL_DB_PROD_LIVE_SECRET_ENV_PII_NETWORK: forbidden
C_IMPLEMENTATION_FOUNDATION_INTAKE_DELIVERY: forbidden
PRODUCT_COMMIT_AND_NONFORCE_SHADOW_PUSH: authorized_after_checks
FOUNDATION_DOCS_COMMIT_PUSH: forbidden_for_worker
NO_REVIEWER_DISPATCH: true
STOP_AFTER_RETURN: true

Open READ_AND_EXECUTE directly. Preserve the same Worker Actor/session/conversation,
load /fable-builder, verify the exact product base and dirt, patch only IR-F1 through
IR-F3 inside the exact allowlist with tests-first evidence, use max effort for final
delta/test/security audit, write the two declared evidence files, return the pointer
to foundation-advisor, and STOP.
========
