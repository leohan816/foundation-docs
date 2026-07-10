# Fable5 Review Run Prompt

========
TARGET_ACTOR: Fable5 Reviewer
TARGET_PROJECT: shared agent role protocol
TARGET_REPO: ../foundation-docs
TARGET_SESSION_NAME: Fable5 Reviewer
TARGET_SESSION: existing separate Fable5 Reviewer session, never Advisor or Worker session
REQUIRED_SKILL: /fable-sentinel
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260710_agent_role_boundary_release_train_protocol_v2/07_FABLE5_REVIEW_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
Fable5 Reviewer 확인.
필요 skill: /fable-sentinel
이 작업은 기존 Fable5 Reviewer 세션에서만 실행한다.
Advisor 세션, GPT 전략 세션, Control 세션, Foundation/SIASIU/Cosmile Worker 세션에서 실행하지 말라.
아래 파일을 직접 열고 두 개의 독립 검수 pass를 수행하라:
../foundation-docs/advisor/jobs/20260710_agent_role_boundary_release_train_protocol_v2/07_FABLE5_REVIEW_HANDOFF_PROMPT.md
요약이나 기억만 보고 검수하지 말라.
검수 대상 파일을 수정하거나 patch하지 말라.
새 sub-agent 또는 임시 세션을 만들지 말라.
session reload를 실행하지 말라.
DESIGN_REVIEW와 IMPLEMENTATION_REVIEW를 별도 artifact/verdict로 작성하고 결과를 Advisor에게 반환하라.
========

