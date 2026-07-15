========
TARGET_ACTOR: siasiu Worker
TARGET_SESSION: siasiu
ROLE_MODE: READ_ONLY_AUDIT
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M1-SIASIU-CURRENT-STATE-AUDIT
MODEL_EFFORT: HIGH_OR_XHIGH
REQUIRED_SKILL: /fable-builder
READ_AND_EXECUTE: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/advisor/jobs/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/04_SIASIU_WORKER_HANDOFF.md
HANDOFF_COMMIT: f3bf31370034c68a9ab404eed000ea7f5c16aedc
TEST_EFFORT_POLICY: During this primary audit, inventory test commands and assess safety but DO_NOT_RUN tests. If execution is materially needed, return the safe narrow command set to foundation-advisor for a separate max-effort WorkUnit.
RETURN_RESULT_TO: foundation-advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
READ_REFERENCED_FILES_DIRECTLY: true
DO_NOT_BROADEN_SCOPE: true
NO_NEW_AGENT_OR_SUBAGENT: true
STOP_AFTER_RETURN: true

Invoke /fable-builder. Open READ_AND_EXECUTE directly, apply TEST_EFFORT_POLICY as a mission-specific limit, write only the declared result and pointer, return only the pointer to foundation-advisor, and STOP.
========
