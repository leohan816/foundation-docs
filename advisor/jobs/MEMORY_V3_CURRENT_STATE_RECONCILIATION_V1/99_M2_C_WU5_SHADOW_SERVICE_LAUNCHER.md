========
TARGET_ACTOR: foundation Worker
TARGET_ACTOR_ID: foundation
TARGET_PROJECT: FOUNDATION / Memory V3 M2 C Shadow WU5
TARGET_REPOSITORY: /home/leo/Project/FOUNDATION
TARGET_BRANCH: shadow/foundation-shared-memory-v0
BASELINE_COMMIT: 3e6abeec04f370dff1844afc429bd39487149c02
EXPECTED_ORIGIN: git@github.com:leohan816/foundation.git
TARGET_SESSION_NAME: foundation
TARGET_WINDOW_ID: @3
TARGET_PANE_ID: %3
ROLE_MODE: FOUNDATION_WORKER_C_SHADOW_SERVICE
ACTUAL_MODEL: verify live; do not infer from session name
MODEL_EFFORT_IMPLEMENTATION: ultracode — set and verify live
MODEL_EFFORT_FINAL_STATIC_DIFF_SECURITY: max — switch and verify live
PRODUCT_TEST_EXECUTION: forbidden at WU5
REQUIRED_SKILL: /fable-builder
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-C-WU5-SHADOW-SERVICE-001
READ_AND_EXECUTE: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/advisor/jobs/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/98_M2_C_WU5_SHADOW_SERVICE_HANDOFF.md
WU5_GATE_COMMIT: afa9479e6e285d7583f0a1c2e9036adc5cd993bc
FINAL_DESIGN_COMMIT: 4480b55f43b876499746efe6497b5e2e4eb1931d
FINAL_DESIGN_SHA256: 6e9842a3665251fc54ed66f5f12ca51b948869029b2e02105dd24d8e752406a9
EXPECTED_RESULT: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/foundation/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU5_SHADOW_SERVICE_RESULT.md
EXPECTED_POINTER: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/foundation/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU5_SHADOW_SERVICE_RESULT_POINTER.md
EXPECTED_DESIGN_MIRROR: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/설계문서/foundation/FOUNDATION_COMMERCE_EVIDENCE_SHADOW_설계서.md
RETURN_TO: foundation-advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
READ_REFERENCED_FILES_DIRECTLY: true
DO_NOT_BROADEN_SCOPE: true
NO_NEW_AGENT_OR_SUBAGENT: true
TESTS_AND_FIXTURES: forbidden at WU5
ONE_PROCESS_EPHEMERAL_REVIEW_ONLY: true
DB_FILE_SQLITE_DOCKER_NETWORK_PROVIDER_SECRET_ENV: forbidden
ENDPOINT_CONSUMER_TRANSPORT_DELIVERY_INTAKE_STORE_RUNTIME: forbidden
WORK_UNIT_6_TO_8: forbidden
PRODUCT_COMMIT_AND_NONFORCE_SHADOW_PUSH: authorized only after WU5 static gates
FOUNDATION_DOCS_COMMIT_OR_PUSH: forbidden
NO_REVIEWER_DISPATCH: true
STOP_AFTER_RETURN: true

Open READ_AND_EXECUTE directly. Apply `/fable-builder`, verify exact runtime/Git,
implement only WU5 at ultracode, run no product test or import, switch to max for the
exact static/AST/diff/security/mirror audit, commit and non-force push only the six
product allowlist paths, write the declared mirror/result/pointer, return only the
pointer to foundation-advisor, and STOP. Do not start WU6 or later.
========
