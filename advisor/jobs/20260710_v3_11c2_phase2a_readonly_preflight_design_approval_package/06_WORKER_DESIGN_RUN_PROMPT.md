# Cosmile Worker Design Run Prompt

========
TARGET_ACTOR: Cosmile Worker
TARGET_PROJECT: Cosmile
TARGET_REPO: ../Cosmile
TARGET_APP_ROOT: ../Cosmile/app
TARGET_SESSION_NAME: existing Cosmile Worker session
WORK_MODE: DESIGN_ONLY
REQUIRED_SKILL: none; do not invoke /fable-builder
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_readonly_preflight_design_approval_package/06_WORKER_DESIGN_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
Cosmile Worker 확인.
이 작업은 설계문서 작성만 수행한다. 구현 작업이 아니다.
기존 Cosmile Worker 세션에서 위 READ_AND_EXECUTE 파일을 직접 읽고 수행하라.
DB 접속·connection test·query·migration·role/permission 변경을 하지 말라.
.env.local 값이나 DATABASE_URL/host/user/password/token을 읽어 출력하지 말라.
runtime source/schema/migration/test/package/flag를 수정하지 말라.
Phase 2A 실행 prompt를 만들지 말라.
현재 development DB를 증거 없이 승인된 target으로 표현하지 말라.
작업 결과와 pointer를 Advisor에게 반환하라.
========

