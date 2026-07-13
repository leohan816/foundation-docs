TARGET_ACTOR: Designer
TARGET_SESSION: separate dedicated Agent Office Designer session, never Advisor/Control/Worker/Reviewer
SOURCE_ADVISOR_JOB: /home/leo/Project/foundation-docs/advisor/jobs/20260713_agent_office_a1r_living_office_experience_refinement_001
DO_NOT_PASTE_INTO: Advisor, Control, Worker, or Reviewer session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only

이 지시문을 붙여넣을 대상: Agent Office Designer
이 지시문을 붙여넣으면 안 되는 곳: Advisor / Control / Worker / Reviewer / GPT 전략 세션
작업 결과 반환 대상: Advisor

========
TARGET_ACTOR: Agent Office Product Designer
TARGET_PROJECT: Agent Office A-1R Visual Recovery V2
TARGET_REPO: /home/leo/Project/agent-office-a1r-visual-recovery-v2
TARGET_APP_ROOT: /home/leo/Project/agent-office-a1r-visual-recovery-v2
TARGET_SESSION_NAME: agent-office-designer
TARGET_LOCATOR: $21 / @21 / %21
REQUIRED_ROLE_FILE: /home/leo/Project/agent-office-designer/AGENTS.md
AUTHORIZED_SKILL: imagegen
DESIGN_PASS: A1R_VISUAL_RECOVERY_PHASE1_PRODUCT_SCENE_DIRECTIONS
DESIGN_BASE_COMMIT: 11cdf8074511f29808abb28edb9e8aaedfb03b8f
READ_AND_EXECUTE: /home/leo/Project/foundation-docs/advisor/jobs/20260713_agent_office_a1r_living_office_experience_refinement_001/25_ADVISOR_PHASE1_DESIGNER_BRIEF.md
ALSO_READ_AUTHORITY: /home/leo/Project/foundation-docs/advisor/jobs/20260713_agent_office_a1r_living_office_experience_refinement_001/24_FOUNDER_VISUAL_DESIGN_RECOVERY_DECISION_V2.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
NO_IMPLEMENTATION: true
NO_CONTROL_WORKER_REVIEWER_DISPATCH: true
NO_AGENTS_OR_SUBAGENTS: true
PHASE_1_ONLY: true

정확히 세 개의 고충실도 장면 전용 제품 이미지를 만드세요. 설명판, SVG 도식, 와이어프레임, 대시보드, 추적성 표는 제품 이미지로 제출할 수 없습니다. 각 장면은 라벨을 읽지 않아도 5초 안에 "AI 직원들이 실제로 일하는 살아 있는 AI 사무실"로 보여야 합니다. 원본 크기로 직접 검사하고, 하나라도 기준을 통과하지 못하면 먼저 반복 개선하세요. 승인된 네 파일만 커밋·비강제 push하고 결과와 pointer를 Advisor에게 반환한 뒤 STOP하세요.
========
