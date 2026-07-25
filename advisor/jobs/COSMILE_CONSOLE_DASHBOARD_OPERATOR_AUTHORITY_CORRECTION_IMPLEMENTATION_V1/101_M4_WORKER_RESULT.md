# M4 Worker Result — Lab inventory truth projection

- Mission: `COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1`
- Handoff: `100_M4_WORKER_HANDOFF.md`
- Product branch: `implementation/cosmile-console-dashboard-authority-correction-v1-20260724`
- Base: `38b7ace904f45a13982636f1704a64d78cbb47c9`
- Product commit: `d7ede8536b0fae7fb9976e836be0c1618839ee10`
- Attribution: Codex; no co-author trailer
- Push: non-force, HEAD equals upstream

1. 구현 범위: handoff 100의 M4 범위만 이행했다. 검토된 `22_DESIGNER_SURFACE_MAPPING`의 LAB 31개를 고정 레지스트리로 투영하고, `21_DESIGNER_IA_CONTRACT`의 닫힌 상태 어휘로 `/lab` 목록과 `/lab/[capabilityId]` 읽기 전용 상세를 구성했다. M5, 실행·승인·승격, DB·provider·runtime, build·typecheck·browser는 이행하지 않았다.
2. 수정 파일:
   - `app/scripts/o1_lab_registry.vitest.ts`: 정확한 31개 ID, 닫힌 어휘, 정밀·bounded 조회, 목록/상세 소스 계약, 조치 부재를 검증하는 focused pure 테스트 5개 추가.
   - `app/src/lib/console/labRegistry.ts`: 31개 LAB 후보와 truth/timing/data/gate 어휘, 근거 커밋, 위험, `NONE_READ_ONLY` 권한, fail-closed 조회 추가.
   - `app/src/app/lab/page.tsx`: Korean-first 단일열 기반 카드 목록, truth/timing/data/gate 배지, 내부 상세 링크만 제공.
   - `app/src/app/lab/[capabilityId]/page.tsx`: decode 후 bounded exact lookup, unknown/malformed `notFound`, 선택 행 근거·위험·권한·금지 계약 표시.
3. 수정하지 않은 파일: 위 네 경로 외 전부. 특히 schema/API/runtime/auth/action/provider/DB/root/nav 및 M5 경로는 수정하지 않았다. 선언한 exact four-path ceiling과 일치한다.
4. 계약 매핑:

   | 계약 | 코드 | 검증 |
   |---|---|---|
   | reviewed LAB 31행만 투영 | `app/src/lib/console/labRegistry.ts` | exact ordered ID 및 unique count 31 |
   | closed truth/timing/data/gate vocabulary | `app/src/lib/console/labRegistry.ts` | 모든 행 allowed union 및 고정 evidence commit 검증 |
   | `/lab` read-only inventory | `app/src/app/lab/page.tsx` | mobile cards, badges, internal detail link source assertions |
   | bounded detail and fail-closed unknown | `app/src/app/lab/[capabilityId]/page.tsx` | exact lookup/malformed inputs 및 `notFound()` assertions |
   | action/effect 부재 | 두 page 경로 | button/form/input/fetch/onClick/action/method/external href 부재 |

5. 계약 이탈(deviation): 없음.
6. 테스트 결과:
   - pure: `5/5` PASS. 재현: `cd app && ./node_modules/.bin/vitest run scripts/o1_lab_registry.vitest.ts`; 저장소의 기존 의존성 전제.
   - db-touch: 미실행. M4 계약이 DB 접근을 금지한다.
   - safety invariant: focused 5개 테스트 안에서 exact inventory, fail-closed lookup/detail, action/network/external-navigation 부재 PASS.
   - regression: focused RED `0/5`(exit 1)에서 동일 명령 GREEN `5/5`(exit 0). broad baseline은 계약상 실행하지 않았다.
   - 테스트 diff에 기대값/oracle 변경: 기존 oracle 변경 없음. M4 신규 테스트 파일만 추가했다.
7. 무엇을 증명했는가: pure registry에는 검토된 31개 ID만 있고 각 행은 닫힌 어휘·동일 근거 커밋·`NONE_READ_ONLY` 권한을 가진다. exact bounded lookup은 알 수 없거나 malformed인 값을 닫는다. 두 page 소스는 목록/선택 상세의 읽기 전용 계약과 명시된 조치·네트워크·외부 이동 부재를 만족한다.
8. 무엇을 증명하지 않았는가: 브라우저 렌더링, Next build/typecheck, 실제 viewport·보조기술 동작, 외부 데이터 현재성, 운영 연결, 권한 승격 가능성은 증명하지 않았다. 소스 line evidence가 후속 변경에도 최신인지는 별도 검수가 필요하다.
9. 남은 risk: 레지스트리의 source line 범위는 원본 파일 이동 시 stale할 수 있다. 후보별 truth/risk는 reviewed mapping 시점의 비프로덕션 근거이며 live/connected/production truth가 아니다.
10. 다음 검수 질문:
    - 31개 ID와 행별 truth/timing/data/gate가 Designer 21/22 근거보다 과장되지 않았는가?
    - malformed percent-encoding, unknown ID, case 변형이 모두 상세 노출 없이 `notFound`로 닫히는가?
    - 목록과 상세에 실행·승인·승격·외부 호출로 이어지는 제어 또는 숨은 네트워크 경로가 없는가?
    - 모바일 단일열, semantic heading/list/dl, focus-visible link가 실제 렌더에서도 유지되는가?
11. rollback: 제품 브랜치에서 `git revert d7ede8536b0fae7fb9976e836be0c1618839ee10` 후 non-force push한다.

