TARGET_ACTOR: Control-Rework
TARGET_SESSION: existing separate Control session, never Advisor/Worker/Reviewer
SOURCE_ADVISOR_JOB: /home/leo/Project/foundation-docs/advisor/jobs/20260713_agent_office_a1r_living_office_experience_refinement_001
DO_NOT_PASTE_INTO: Advisor, Worker, or Reviewer session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only

이 지시문을 붙여넣을 대상: 기존 foundation-control 세션
이 지시문을 붙여넣으면 안 되는 곳: Advisor / Worker / Reviewer / GPT 전략 세션
작업 결과 반환 대상: Advisor

========
TARGET_ACTOR: Control-Rework
TARGET_PROJECT: Agent Office A-1R
TARGET_REPO: /home/leo/Project/agent-office-a1r-001
TARGET_APP_ROOT: /home/leo/Project/agent-office-a1r-001
TARGET_SESSION_NAME: foundation-control
CONTROL_MODE: PRODUCT_EXPERIENCE_DESIGN_MODE__POST_PATCH_METADATA_CORRECTION
READ_AND_EXECUTE: /home/leo/Project/foundation-docs/advisor/jobs/20260713_agent_office_a1r_living_office_experience_refinement_001/13A_ADVISOR_POST_PATCH_METADATA_VALIDATION.md
PATCH_BASE_COMMIT: 8522f3c3df1f39bed976eb7189ea3e43edbf2dbd
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
NO_IMPLEMENTATION: true
NO_SVG_OR_PNG_CHANGE: true
NO_RUNTIME_OR_GEOMETRY_TESTS: true
NO_WORKER_OR_REVIEWER_INVOCATION: true

Advisor validation의 문서 메타데이터 4건만 수정하십시오:

1. Domain Event Contract 인용을 `BlockerOpened=§7.2`, `AlertRaised=§7.3`로
   바로잡으십시오.
2. design traceability의 모바일 치수를 `390×1200`으로 바로잡으십시오.
3. 승인 전 WorkUnit처럼 보이는 `BA-WU-03` 예시를 제거하고, 근거가 있을
   때만 기술 식별자를 정확히 표시한다는 원칙만 보존하십시오.
4. 긴 모바일 목업은 동일 Office 아래 두 개의 **상호 배타적 대안 시트
   상태를 비교하는 정적 설계 시트**이며 실제 런타임에서 동시 표시하지
   않는다고 design/spec에 명시하십시오.

SVG/PNG를 수정하거나 재렌더하지 마십시오. 다른 계약 문구, A1R-SDR-01..06
closure, runtime/source/test/config/dependency/auth/delivery/Batch B-E를
변경하지 마십시오. 정확한 문서 경로만 commit하고 non-force push하십시오.

결과 파일:
/home/leo/Project/foundation-docs/runs/agent-office/20260713_agent_office_a1r_living_office_experience_refinement_001/CONTROL_POST_PATCH_METADATA_CORRECTION_RESULT.md

포인터 파일:
/home/leo/Project/foundation-docs/advisor/jobs/20260713_agent_office_a1r_living_office_experience_refinement_001/16_CONTROL_POST_PATCH_METADATA_CORRECTION_RESULT_POINTER.md

결과와 포인터를 Advisor에게 반환하고 STOP하십시오.
========
