# Leo 결정 브리프

MISSION_ID: `FOUNDATION_COSMILE_COMMERCIAL_BASELINE_PREFLIGHT_COUNCIL_V1`

## 결론

최종 전략 판정은 `PROCEED_WITH_CORRECTIONS`입니다.

Foundation + Cosmile 상용 기준선 조사는 필요합니다. 다만 처음 제안된 방식 그대로 실행하면 18개 산출물을 채우는 또 하나의 장기 문서 프로젝트가 될 수 있습니다. 세 챌린저의 검토를 반영한 결과, 조사는 더 작고 명확한 의사결정 절차로 바뀌어야 합니다.

이 문서는 조사 실행 승인서가 아닙니다. 지금은 전체 Council 결과와 수정된 Preflight를 Leo와 GPT가 확인하는 단계입니다. 확인이 끝나기 전에는 Advisor에게 넘기지 않고, 조사도 시작하지 않습니다.

## Council에서 실제로 바뀐 핵심

1. **3일은 목표이며 강제 종료선이 아닙니다.**
   - `TARGET_DURATION: APPROXIMATELY_3_WORKING_DAYS`
   - `DAY_3_CHECKPOINT: REQUIRED`
   - `HARD_STOP_AT_DAY_3: NO`
   - Day 3에는 완료된 evidence를 동결하고, 남은 정확한 질문·scope 유지 여부·수정된
     bounded completion estimate를 기록합니다.
   - 남은 일이 필요하고 bounded하며 이미 승인된 audit 범위 안이면 실제 current-state
     confirmation이 완료될 때까지 계속합니다.
   - P5 독립 Reviewer 검토와 Advisor 최종 확인은 최종 P1–P4 동결 이후 별도 경과시간으로
     측정합니다.

2. **Day 1에 계속할 가치가 있는지 먼저 판단합니다.**
   - 한 개에서 최대 세 개의 임시 Paid Beta 옵션을 만듭니다.
   - 사실, 가정, 추론, 미확인을 구분합니다.
   - 결과는 `CONTINUE`, `EARLY_COMPLETE`, `HOLD` 중 하나입니다.
   - 고객·가치 옵션조차 합리적으로 만들 수 없으면 기술 조사를 넓히지 않고 `HOLD`합니다.

3. **18개 산출물을 따로 만들지 않습니다.**
   - P1: 입장조건·범위·종료 기록
   - P2: 기능·증거 정본 행
   - P3: 게이트·blocker·criteria 보기
   - P4: 옵션·우선순위·일정·외부결정 보기
   - P5: 독립검수·Advisor 종결 기록
   - 모두 하나의 정본 데이터에서 파생되게 합니다.

4. **감사 완료와 출시 준비를 분리합니다.**
   - 미확인 사항이 정직하게 기록돼도 조사는 끝낼 수 있습니다.
   - 그러나 돈·주문·재고·PII·권한·장애 처리에 핵심 미확인이 남으면 Paid Beta 준비 완료로 선언할 수 없습니다.

5. **Foundation을 자동으로 Paid Beta 필수조건으로 만들지 않습니다.**
   - 선택된 베타 흐름마다 Foundation이 `필수`, `선택·degradable`, `불필요`, `미확인`인지 기록합니다.
   - Foundation/SIASIU/AI가 unavailable일 때 일반 상거래는 계속되고, 미확인 AI 상담은 닫거나 숨긴다는 기존 Founder 방향을 유지합니다.
   - 선택 기능이나 불필요한 플랫폼 공사는 no-build/deferred로 보냅니다.

6. **실행 증거의 기본값은 정적 확인(E2)입니다.**
   - 새 E4 통합 실행은 이번 조사에서 하지 않습니다.
   - E3가 정말 우선순위 결정을 바꾸는 경우에만 Leo가 정확한 명령·데이터·정리·금지조건을 사전 승인해야 합니다.
   - 현재 전략 권고는 `E2_STATIC_ONLY`입니다.

7. **모든 고위험·외부 담당자를 억지로 먼저 만들지 않습니다.**
   - 시작 전에는 책임 있는 내부 에스컬레이션 담당자 1명과 반환 경로가 필요합니다.
   - 특정 전문 담당자의 답변이 승인된 audit의 안전한 조사나 intended decision에
     반드시 필요하고 safe unresolved fallback이 없을 때만 그 담당자의 이름과 권한이
     입장조건입니다.
   - 그렇지 않으면 `OWNER_UNASSIGNED`로 남길 수 있지만, 해당 항목을 `필요 없음`, `준비 완료`, `위험 승인`, `출시 승인`으로 바꾸는 것은 금지됩니다.

8. **Council 결과는 아무 일도 자동으로 시작하지 않습니다.**
   - branch 선택, 구현, 위험 수용, Paid Beta, Public Launch, 다음 미션은 모두 별도 Leo 결정입니다.

## 세 챌린저의 최종 판정

- Product/User/Business Value: `PROCEED_WITH_CORRECTIONS`, confidence `HIGH`
- System/Architecture/Safety/Governance: `PROCEED_WITH_CORRECTIONS`, confidence `HIGH`
- Delivery/Scope/Evidence/Operations: `PROCEED_WITH_CORRECTIONS`, confidence `HIGH`

처음에는 의견 차이가 있었습니다. 제품가치 역할은 고객 검증을 더 강하게 요구했고, 시스템 역할은 E4 가능성을 열어뒀으며, 실행 역할은 모든 외부 담당자 지정을 요구했습니다. 서로의 보고서를 본 뒤 모두 다음에 합의했습니다.

- 검증된 수요는 조사 입장조건이 아니지만, 테스트 가능한 베타 옵션은 Day 1에 필요합니다.
- 새 E4는 제외합니다.
- 모든 담당자 실명 지정보다 조건부 담당자 규칙이 맞습니다.
- 추가 반박은 가치가 없어 1회로 종료했습니다.

## 지금 Leo와 GPT가 확인할 것

이번 단계에서 확인할 것은 하나입니다.

```text
COUNCIL_CORRECTED_STRATEGY_RECOMMENDATION_ACCEPTED:
YES | NO | NEEDS_PATCH
```

지금 `YES`를 주더라도 바로 조사를 시작하지 않습니다. 먼저 Strategy가 최종 mission objective를 `foundation-advisor`에게 전달할 수 있도록 별도의 명시적 지시가 필요합니다.

나중에 실제 Advisor handoff를 승인할 때는 최소한 다음을 고정해야 합니다.

1. `AUDIT_AUTHORIZED: YES`
2. `AUDIT_EVIDENCE_CEILING: E2_STATIC_ONLY` — 현재 권고
3. `BETA_OPTION_ENVELOPE`: 하나의 기정 옵션을 검토하거나 최대 세 개의 임시 옵션을 비교하도록 허용
4. 이미 확정된 non-negotiable만 명시하고 나머지는 `UNKNOWN` 유지
5. `PUBLIC_LAUNCH_SEPARATE_GATE: YES`
6. `OUTPUTS_NON_AUTHORIZING: YES`
7. 내부 에스컬레이션 담당자와 반환 경로
8. `TARGET_DURATION: APPROXIMATELY_3_WORKING_DAYS`
9. `DAY_3_CHECKPOINT: REQUIRED`
10. `HARD_STOP_AT_DAY_3: NO`
11. 필요한 bounded in-scope work는 Day 3 이후 계속하고, material scope expansion,
    new high-risk decision, material duration overrun, intended-decision failure일 때만
    Leo에게 return

## 조사 결과가 나온 뒤 결정할 것

- 최종 Paid Beta 옵션과 구체적 cohort/SKU/국가/통화/채널/운영/exit threshold
- commercial development branch
- 구현 우선순위·인력·일정
- DB/schema/migration/auth/consent/durable backend architecture
- Memory V3 재개 또는 U1/U2/U3
- Legal/privacy/security/data/AI/payment/배송/운영의 실질 결정
- Paid Beta 위험 수용과 출시 승인
- Public Launch 범위와 출시 승인

## 권고하는 다음 단계

완성된 Council 기록과 수정된 Preflight를 기존 Draft PR #2에 올린 뒤 멈춥니다. Leo와 GPT가 검토해 승인하면, 그때 Strategy가 수정된 mission objective만 `foundation-advisor`에게 전달합니다. Advisor가 현재 권한·actor·runtime·capacity를 다시 확인한 후에만 조사 활성화가 가능합니다.

```text
COMMERCIAL_AUDIT_STARTED: NO
ADVISOR_DISPATCHED: NO
PRODUCT_REPOSITORY_CHANGES: NONE
NEXT_MISSION_AUTO_START: NO
```

STOP: `LEO_GPT_REVIEW_REQUIRED`
