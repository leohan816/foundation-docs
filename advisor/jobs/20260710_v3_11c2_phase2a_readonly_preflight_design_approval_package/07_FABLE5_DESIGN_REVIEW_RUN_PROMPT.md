# Fable5 Design Review Run Prompt

========
TARGET_ACTOR: Fable5 Reviewer
TARGET_PROJECT: Cosmile Phase 2A preflight design
TARGET_REPO: ../foundation-docs
TARGET_SESSION_NAME: existing Fable5 Reviewer session
REQUIRED_SKILL: /fable-sentinel
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_readonly_preflight_design_approval_package/07_FABLE5_DESIGN_REVIEW_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
Fable5 Reviewer 확인.
기존 Fable5 Reviewer 세션에서 DESIGN_REVIEW만 수행하라.
위 READ_AND_EXECUTE 파일과 실제 설계문서·commit·schema/migration/policy를 직접 읽어라.
Worker/Advisor 보고를 신뢰하지 말고 직접 검증하라.
DB 접속·secret 값 확인·query/migration 실행·설계 patch·repo 수정을 하지 말라.
DESIGN_PACKAGE_QUALITY와 PHASE2A_EXECUTION_READINESS를 분리해 판정하라.
설계 PASS는 Phase 2A 실행 승인이 아님을 명시하라.
결과와 pointer를 Advisor에게 반환하라.
========

