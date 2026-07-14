# Designer Modular Team Strip Result Publication Launcher

TARGET_ACTOR: Agent Office Product Designer
TARGET_SESSION: separate existing Designer session, never Advisor session
SOURCE_ADVISOR_JOB: `/home/leo/Project/foundation-docs/advisor/jobs/20260713_agent_office_a1r_living_office_experience_refinement_001`
DO_NOT_PASTE_INTO: Advisor, Worker, Reviewer, or Control session
RETURN_RESULT_TO: Advisor

이 지시문을 붙여넣을 대상: 기존 `agent-office-designer` 세션
이 지시문을 붙여넣으면 안 되는 곳: Advisor / Worker / Reviewer / Control 세션
작업 결과 반환 대상: Advisor

========
TARGET_ACTOR: Agent Office Product Designer
TARGET_PROJECT: Agent Office A-1R Modular Team Strip Result Publication
TARGET_REPO: /home/leo/Project/foundation-docs
TARGET_APP_ROOT: /home/leo/Project/foundation-docs
TARGET_SESSION_NAME: agent-office-designer
TARGET_LOCATOR: $21 / @21 / %21
REQUIRED_ROLE_FILE: /home/leo/Project/agent-office-designer/AGENTS.md
READ_AND_EXECUTE: /home/leo/Project/foundation-docs/advisor/jobs/20260713_agent_office_a1r_living_office_experience_refinement_001/32A_DESIGNER_RESULT_PUBLISH_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
NO_CONTENT_EDIT: true
NO_IMPLEMENTATION: true
NO_AGENTS_OR_SUBAGENTS: true
Publish exactly the two existing result files, verify the exact staged scope, push without force, report the foundation-docs commit, and STOP.
========
