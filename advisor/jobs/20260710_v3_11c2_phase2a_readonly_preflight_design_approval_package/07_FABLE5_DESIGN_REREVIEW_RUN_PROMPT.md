# Fable5 Design Re-Review Run Prompt

========
TARGET_ACTOR: Fable5 Reviewer
TARGET_PROJECT: Cosmile Phase 2A preflight design re-review
TARGET_REPO: ../foundation-docs
TARGET_SESSION_NAME: same existing Fable5 Reviewer session
REQUIRED_SKILL: /fable-sentinel
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_readonly_preflight_design_approval_package/07_FABLE5_DESIGN_REREVIEW_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
Fable5 Reviewer 재검수 확인.
처음 NEEDS_PATCH를 판정한 동일한 기존 Fable5 Reviewer 세션에서 실행하라.
위 READ_AND_EXECUTE 파일과 실제 수정 diff, 설계문서, migration을 직접 읽어라.
Worker와 Advisor 보고를 신뢰하지 말고 F-1/F-2/F-3 해결 여부를 직접 재검수하라.
DB 접속, secret 값 확인, query/migration 실행, 설계 patch, repo 수정을 하지 말라.
설계 PASS는 Phase 2A 실행 승인이 아니다. 실행 상태는 NOT_APPROVED로 유지하라.
재검수 결과와 pointer를 Advisor에게 반환하라.
========

