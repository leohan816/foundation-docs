# Foundation Worker Role Protocol Reload Run Prompt

========
TARGET_ACTOR: Foundation Worker
TARGET_PROJECT: Foundation
TARGET_REPO: ../FOUNDATION
TARGET_SESSION_NAME: existing Foundation Worker session
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260710_agent_role_boundary_release_train_protocol_v2/08_ROLE_PROTOCOL_RELOAD_INSTRUCTIONS.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
Foundation Worker 확인.
이 지시문은 기존 Foundation Worker 세션에서만 실행한다. 새 세션이나 sub-agent를 만들지 말라.
다음 파일을 직접 다시 읽어라:
- ../FOUNDATION/CLAUDE.md
- ../FOUNDATION/docs/agent/RUN_PROTOCOL.md
- ../FOUNDATION/docs/agent/RESULT_REPORTING_PROTOCOL.md
- ../foundation-docs/설계문서/shared/AGENT_ROLE_BOUNDARY_AND_RELEASE_TRAIN_PROTOCOL_V2.md
파일 수정, 구현, 검수, commit/push를 하지 말라.
Foundation Worker가 repo-local 구현 actor이며 canonical authority decision과 분리됨을 확인하라.
08_ROLE_PROTOCOL_RELOAD_INSTRUCTIONS.md의 형식으로 ROLE_PROTOCOL_RELOADED 응답만 Advisor에게 반환하라.
========

