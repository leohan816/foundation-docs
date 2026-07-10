# Cosmile Worker Design Rework Run Prompt

========
TARGET_ACTOR: Worker-Rework
TARGET_PROJECT: Cosmile
TARGET_REPO: ../Cosmile
TARGET_APP_ROOT: ../Cosmile/app
TARGET_SESSION_NAME: existing Cosmile Worker session
WORK_MODE: DESIGN_ONLY_REWORK
REQUIRED_SKILL: none; do not invoke /fable-builder
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_readonly_preflight_design_approval_package/09_REWORK_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
Cosmile Worker rework 확인.
기존 Cosmile Worker 세션에서 위 READ_AND_EXECUTE 파일을 직접 읽어라.
Fable5 F-1/F-2/F-3를 해결하는 설계문서 patch만 수행하라.
DB 접속·query·migration·secret 값 확인·runtime/schema/migration/test/package/flag 변경을 하지 말라.
Phase 2A 실행 prompt를 만들지 말라.
repo-local plan과 mirror를 byte-identical하게 유지하라.
rework 결과와 pointer를 Advisor에게 반환하라.
========

