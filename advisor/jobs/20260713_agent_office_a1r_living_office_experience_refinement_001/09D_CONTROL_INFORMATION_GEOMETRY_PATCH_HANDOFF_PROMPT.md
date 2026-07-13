TARGET_ACTOR: Control-Rework
TARGET_SESSION: same existing Control session, never Advisor/Worker/Reviewer
SOURCE_ADVISOR_JOB: /home/leo/Project/foundation-docs/advisor/jobs/20260713_agent_office_a1r_living_office_experience_refinement_001
DO_NOT_PASTE_INTO: Advisor, Worker, Reviewer, or GPT strategy session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only

이 지시문을 붙여넣을 대상: 같은 기존 foundation-control 세션
이 지시문을 붙여넣으면 안 되는 곳: Advisor / Worker / Reviewer / GPT 전략 세션
작업 결과 반환 대상: Advisor

========
TARGET_ACTOR: Control-Rework
TARGET_PROJECT: Agent Office A-1R Living Office
TARGET_REPO: /home/leo/Project/agent-office-a1r-001
TARGET_APP_ROOT: /home/leo/Project/agent-office-a1r-001
TARGET_SESSION_NAME: foundation-control
CONTROL_MODE: PRODUCT_EXPERIENCE_DESIGN_MODE__INFORMATION_GEOMETRY_PATCH
PATCH_BASE_COMMIT: 1ab8ad200338d90d230d8d4f3373fa9b73d549c9
READ_AND_EXECUTE: /home/leo/Project/foundation-docs/advisor/jobs/20260713_agent_office_a1r_living_office_experience_refinement_001/17A_ADVISOR_DELTA_FINDING_CLASSIFICATION.md
ALSO_READ_SENTINEL_RESULT: /home/leo/Project/foundation-docs/runs/agent-office/20260713_agent_office_a1r_living_office_experience_refinement_001/SENTINEL_DESIGN_CONTRACT_DELTA_REREVIEW_RESULT.md
ALSO_READ_FOUNDER_MISSION: /home/leo/Project/foundation-docs/advisor/jobs/20260713_agent_office_a1r_living_office_experience_refinement_001/00_FOUNDER_MISSION.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
NO_AGENTS_OR_SUBAGENTS: true
WORKER_IMPLEMENTATION_AUTHORIZED: false

Patch only the information-interaction SVG and its PNG. Keep the canvas size.
Eliminate the three exact measured overlap/overflow regressions while preserving
exact tokens, disclosure content, watermark, critical overlays, Team text, and
all closed contracts. Re-export only the affected PNG and inspect it at original
size. Run the focused static geometry/content checks, exact changed-path check,
unchanged-hash checks for other assets, and `git diff --check`. Do not run
runtime suites or redesign other assets.

Commit and non-force push the exact design delta. Write the long result to:
/home/leo/Project/foundation-docs/runs/agent-office/20260713_agent_office_a1r_living_office_experience_refinement_001/CONTROL_INFORMATION_STATE_GEOMETRY_PATCH_RESULT.md

Write the Advisor pointer to:
/home/leo/Project/foundation-docs/advisor/jobs/20260713_agent_office_a1r_living_office_experience_refinement_001/18_CONTROL_INFORMATION_GEOMETRY_PATCH_RESULT_POINTER.md

Return a short pointer to Advisor and STOP. Do not self-review or dispatch a
Worker/Reviewer.
========
