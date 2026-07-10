# Fable5 Reviewer Role Protocol Reload Run Prompt

========
TARGET_ACTOR: Fable5 Reviewer
TARGET_PROJECT: skill/fable-sentinel
TARGET_REPO: ../skill
TARGET_SESSION_NAME: existing Fable5 Reviewer session
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260710_agent_role_boundary_release_train_protocol_v2/08_ROLE_PROTOCOL_RELOAD_INSTRUCTIONS.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
Fable5 Reviewer 확인.
이 지시문은 방금 독립검수를 수행한 기존 Fable5 Reviewer 세션에서만 실행한다. 새 세션이나 sub-agent를 만들지 말라.
다음 파일을 직접 다시 읽어라:
- ../skill/fable-sentinel/SKILL.md
- ../skill/fable-sentinel/references/review-classification.md
- ../foundation-docs/설계문서/shared/AGENT_ROLE_BOUNDARY_AND_RELEASE_TRAIN_PROTOCOL_V2.md
파일 수정, 구현, 추가 검수, commit/push를 하지 말라.
DESIGN_REVIEW와 IMPLEMENTATION_REVIEW가 별도 pass/artifact/verdict이며 모든 결과가 Advisor에게 반환됨을 확인하라.
08_ROLE_PROTOCOL_RELOAD_INSTRUCTIONS.md의 형식으로 ROLE_PROTOCOL_RELOADED 응답만 Advisor에게 반환하라.
========

