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
CONTROL_MODE: PRODUCT_EXPERIENCE_DESIGN_MODE__SENTINEL_FINDING_PATCH
READ_AND_EXECUTE: /home/leo/Project/foundation-docs/advisor/jobs/20260713_agent_office_a1r_living_office_experience_refinement_001/13_ADVISOR_SENTINEL_FINDING_CLASSIFICATION.md
ALSO_READ_SENTINEL_RESULT: /home/leo/Project/foundation-docs/runs/agent-office/20260713_agent_office_a1r_living_office_experience_refinement_001/SENTINEL_DESIGN_CONTRACT_REVIEW_RESULT.md
ALSO_READ_FOUNDER_MISSION: /home/leo/Project/foundation-docs/advisor/jobs/20260713_agent_office_a1r_living_office_experience_refinement_001/00_FOUNDER_MISSION.md
PATCH_BASE_COMMIT: b966c6a98752558ad0db66fa2b79e42d9e9dcd24
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
NO_IMPLEMENTATION: true
NO_RUNTIME_TESTS: true
NO_WORKER_OR_REVIEWER_INVOCATION: true

검수 결과 `A1R-SDR-01`부터 `A1R-SDR-06`까지만 정확히 수정하십시오.

1. DCR-02/DCR-03 모순을 제거하고 Advisor/Control/Worker/Reviewer의 A-1R
   기본 애니메이션 입력·동작·시작/중지·unknown·reduced/static 대응표를
   완성하십시오. Batch B의 live runtime-state animation은 계속 금지입니다.
2. 실제 소스의 정확한 모델/effort 토큰을 쓰고, 진행률·WorkUnit·KST는
   근거가 없으면 fail-closed 값으로 표시하십시오. 예시가 꼭 필요하면
   `설계 예시 · 실제 운영 아님`을 분명히 표시하십시오. pinned card에
   blocker/Leo 상태를 복원하십시오.
3. information sheet의 UNKNOWN badge/drawer 충돌과 desktop label의
   role/state 충돌·overflow를 수정하십시오.
4. desktop/mobile/Pod의 모든 기본 actor label/row 안에 `FND` 또는 `VBN`
   같은 정확한 짧은 Team 텍스트를 넣고 충돌이 없게 재배치하십시오.
5. 모바일 `DELIVERY_DISABLED` Advisor conversation sheet를 추가하고 actor
   sheet와의 replacement, trigger, selected Advisor, unread/notification,
   input lock, Escape/back/outside close, focus restore, drawer transition을
   설계하십시오. 실제 delivery는 활성화하지 마십시오.
6. Advisor classification의 기존 `AlertRaised`/`BlockerOpened` 매핑만 사용해
   authority/security hold와 decision-critical conflict의 source, precedence,
   fail-closed, exact Korean text/icon/non-color, semantic announcement,
   mockup example을 완성하십시오. `PixelOperationalState`를 변경하거나
   새 권한 의미를 발명하지 마십시오.

변경된 SVG/PNG만 다시 export하고 원본 크기로 직접 확인하십시오. 기존
Pod/mobile 보정의 회귀도 확인하십시오. 런타임 코드, 테스트, 설정,
의존성, 패키지, 인증, 전달, 권한, Batch B-E를 변경하지 마십시오.

정확한 changed-path 목록, PNG 치수/hash, geometry/content checks,
`A1R-SDR-01..06` boolean closure table, 기존 보정 회귀 확인을 결과에
기록하십시오. design delta를 commit하고 non-force push하십시오.

결과 파일:
/home/leo/Project/foundation-docs/runs/agent-office/20260713_agent_office_a1r_living_office_experience_refinement_001/CONTROL_SENTINEL_FINDING_PATCH_RESULT.md

포인터 파일:
/home/leo/Project/foundation-docs/advisor/jobs/20260713_agent_office_a1r_living_office_experience_refinement_001/15_CONTROL_SENTINEL_FINDING_PATCH_RESULT_POINTER.md

결과와 포인터를 Advisor에게 반환하고 STOP하십시오.
========
