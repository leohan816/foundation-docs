# Control Role Protocol Reload Run Prompt

========
TARGET_ACTOR: Control
TARGET_PROJECT: foundation-control
TARGET_REPO: ../foundation-control
TARGET_SESSION_NAME: existing Control session
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260710_agent_role_boundary_release_train_protocol_v2/08_ROLE_PROTOCOL_RELOAD_INSTRUCTIONS.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
Control 확인.
이 지시문은 기존 Control 세션에서만 실행한다. 새 세션이나 sub-agent를 만들지 말라.
다음 파일을 직접 다시 읽어라:
- ../foundation-control/CLAUDE.md
- ../foundation-control/docs/agent/RUN_PROTOCOL.md
- ../foundation-control/docs/OPERATING_MODEL_20260629.md 상단 SUPERSEDED_BY_V2 상태
- ../foundation-docs/설계문서/shared/AGENT_ROLE_BOUNDARY_AND_RELEASE_TRAIN_PROTOCOL_V2.md
파일 수정, 구현, 검수, commit/push를 하지 말라.
Control master-design mode와 foundation-control implementation mode의 분리를 확인하라.
08_ROLE_PROTOCOL_RELOAD_INSTRUCTIONS.md의 형식으로 ROLE_PROTOCOL_RELOADED 응답만 Advisor에게 반환하라.
========

