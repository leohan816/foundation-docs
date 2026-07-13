TARGET_ACTOR: Control-Rework
TARGET_SESSION: same existing Control session, never Advisor/Worker/Reviewer
SOURCE_ADVISOR_JOB: /home/leo/Project/foundation-docs/advisor/jobs/20260713_agent_office_a1r_living_office_experience_refinement_001
DO_NOT_PASTE_INTO: Advisor, Worker, Reviewer, or GPT strategy session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only

========
TARGET_ACTOR: Control-Rework
TARGET_PROJECT: Agent Office A-1R Living Office
TARGET_REPO: /home/leo/Project/agent-office-a1r-001
TARGET_APP_ROOT: /home/leo/Project/agent-office-a1r-001
TARGET_SESSION_NAME: foundation-control
CONTROL_MODE: PRODUCT_EXPERIENCE_DESIGN_MODE__PNG_EXPORT_CORRECTION
PATCH_BASE_COMMIT: ad147ecbecdddaea1966f7094837cf1272456af5
READ_AND_EXECUTE: /home/leo/Project/foundation-docs/advisor/jobs/20260713_agent_office_a1r_living_office_experience_refinement_001/18A_ADVISOR_GEOMETRY_PATCH_VALIDATION.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
NO_AGENTS_OR_SUBAGENTS: true
WORKER_IMPLEMENTATION_AUTHORIZED: false

Keep the SVG byte-identical. Re-export only the information-state PNG at exactly
2400×1840 from the ad147ec SVG, inspect it at original size, and run the exact
PNG dimension/signature, unchanged-hash, one-path, geometry-preservation, and
git-diff checks. Do not change any other file or run runtime suites.

Write result:
/home/leo/Project/foundation-docs/runs/agent-office/20260713_agent_office_a1r_living_office_experience_refinement_001/CONTROL_INFORMATION_STATE_PNG_EXPORT_CORRECTION_RESULT.md

Write pointer:
/home/leo/Project/foundation-docs/advisor/jobs/20260713_agent_office_a1r_living_office_experience_refinement_001/19_CONTROL_PNG_EXPORT_CORRECTION_RESULT_POINTER.md

Commit and non-force push the exact PNG-only correction and result/pointer,
return a short pointer to Advisor, then STOP.
========
