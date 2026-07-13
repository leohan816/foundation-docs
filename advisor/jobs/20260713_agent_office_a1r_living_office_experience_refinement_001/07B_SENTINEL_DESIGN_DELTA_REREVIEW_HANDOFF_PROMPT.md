TARGET_ACTOR: Sentinel-ReReview
TARGET_SESSION: same existing independent Reviewer session, never Advisor/Control/Worker
SOURCE_ADVISOR_JOB: /home/leo/Project/foundation-docs/advisor/jobs/20260713_agent_office_a1r_living_office_experience_refinement_001
DO_NOT_PASTE_INTO: Advisor, Control, or Worker session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only

이 지시문을 붙여넣을 대상: 같은 기존 Sentinel Reviewer
이 지시문을 붙여넣으면 안 되는 곳: Advisor / Control / Worker / GPT 전략 세션
작업 결과 반환 대상: Advisor

========
TARGET_ACTOR: Sentinel-ReReview
TARGET_PROJECT: Agent Office A-1R Living Office
TARGET_REPO: /home/leo/Project/agent-office-a1r-001
TARGET_APP_ROOT: /home/leo/Project/agent-office-a1r-001
TARGET_SESSION_NAME: foundation-reviewer-sol
REQUIRED_SKILL: /fable-sentinel
REVIEW_PASS: DESIGN_REVIEW__A1R_FOUNDER_UX_CONTRACT_DELTA_REREVIEW
REVIEW_BASE_COMMIT: b966c6a98752558ad0db66fa2b79e42d9e9dcd24
FINDING_PATCH_COMMIT: 8522f3c3df1f39bed976eb7189ea3e43edbf2dbd
REVIEW_CANDIDATE_COMMIT: 1ab8ad200338d90d230d8d4f3373fa9b73d549c9
ORIGINAL_REVIEW_RESULT: /home/leo/Project/foundation-docs/runs/agent-office/20260713_agent_office_a1r_living_office_experience_refinement_001/SENTINEL_DESIGN_CONTRACT_REVIEW_RESULT.md
ADVISOR_FINDING_CLASSIFICATION: /home/leo/Project/foundation-docs/advisor/jobs/20260713_agent_office_a1r_living_office_experience_refinement_001/13_ADVISOR_SENTINEL_FINDING_CLASSIFICATION.md
CONTROL_FINDING_PATCH_RESULT: /home/leo/Project/foundation-docs/runs/agent-office/20260713_agent_office_a1r_living_office_experience_refinement_001/CONTROL_SENTINEL_FINDING_PATCH_RESULT.md
ADVISOR_METADATA_VALIDATION: /home/leo/Project/foundation-docs/advisor/jobs/20260713_agent_office_a1r_living_office_experience_refinement_001/13A_ADVISOR_POST_PATCH_METADATA_VALIDATION.md
CONTROL_METADATA_CORRECTION_RESULT: /home/leo/Project/foundation-docs/runs/agent-office/20260713_agent_office_a1r_living_office_experience_refinement_001/CONTROL_POST_PATCH_METADATA_CORRECTION_RESULT.md
ADVISOR_FINAL_CANDIDATE_ACCEPTANCE: /home/leo/Project/foundation-docs/advisor/jobs/20260713_agent_office_a1r_living_office_experience_refinement_001/05B_ADVISOR_FINAL_STATIC_DESIGN_ACCEPTANCE.md
FOUNDER_MISSION: /home/leo/Project/foundation-docs/advisor/jobs/20260713_agent_office_a1r_living_office_experience_refinement_001/00_FOUNDER_MISSION.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
READ_ONLY_REVIEW: true
NO_RUNTIME_SUITES: true

Use the same independent Sentinel context and `/fable-sentinel`. This is a
finding-specific delta re-review, not a second full review.

Review from direct evidence:

1. Verify the exact candidate, branch, upstream, and diff scopes.
2. Open these four candidate PNGs at original size before reading Control or
   Advisor conclusions:
   - docs/ui/a1r/mockups/a1r-full-office-desktop.png
   - docs/ui/a1r/mockups/a1r-full-office-mobile.png
   - docs/ui/a1r/mockups/a1r-advisor-team-pod.png
   - docs/ui/a1r/mockups/a1r-information-interaction-states.png
3. Inspect the complete `b966c6a..1ab8ad2` finding delta and the exact
   `8522f3c..1ab8ad2` metadata correction.
4. Return an explicit CLOSED / OPEN judgment for each `A1R-SDR-01..06`.
5. Check direct regressions only: preserve `A1R-ADV-01/02`; all eight actors
   and their Team memberships; exact/fail-closed tokens; no fabricated
   progress, WorkUnit, or KST claims; mobile mutually exclusive sheet states;
   no runtime, authority, routing, recovery, or delivery expansion.
6. Verify changed paths, `git diff --check`, image provenance/hashes, and the
   accuracy of the Control/Advisor closure claims.

Do not rerun runtime unit, E2E, build, or server suites for this design/static
delta. Do not patch, commit to the candidate branch, grant aesthetic preference,
or grant Leo/Founder approval.

Write the long result to:
/home/leo/Project/foundation-docs/runs/agent-office/20260713_agent_office_a1r_living_office_experience_refinement_001/SENTINEL_DESIGN_CONTRACT_DELTA_REREVIEW_RESULT.md

Write the Advisor pointer to:
/home/leo/Project/foundation-docs/advisor/jobs/20260713_agent_office_a1r_living_office_experience_refinement_001/17_SENTINEL_DESIGN_DELTA_REREVIEW_RESULT_POINTER.md

Verdict contract:
- PASS
- PASS_WITH_RISK
- NEEDS_PATCH
- FAIL

Return a short pointer to Advisor and STOP.
========
