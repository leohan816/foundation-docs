# Leo Decision Package / Leo 결정 패키지

## 한국어

### 결론

카운셀 7명 전원이 교차검토 후 `PROCEED_WITH_CORRECTIONS`에 합의했습니다.

Foundation 전체 조사는 필요합니다. 다만 모든 기능을 처음부터 같은 깊이로 보는
감사가 아니라 다음 구조여야 합니다.

```text
Foundation 전체를 얕고 넓게 현재상태로 지도화
-> 실제 결정에 필요한 경로만 선택
-> 안전하게 허용되는 non-production 실행 검증
-> 필요한 경우에만 historical Control/SIASIU/Cosmile 경계 확인
-> 현재상태 증거 동결 및 독립 검수
-> 구현 권한 없는 선택지 작성
-> Strategy와 Leo에게 반환 후 STOP
```

이번 카운셀은 Foundation 저장소를 조사하지 않았고 현재 구현 사실을 확정하지
않았습니다. “어떻게 조사해야 정확하고 과하지 않은가”만 검토했습니다.

### 카운셀이 합의한 핵심 보정

1. 조사 전에 Leo의 정확한 결정 질문과 근접 제품 결과를 고정한다.
2. 실제 current consumer는 P1에서 증거로 확인한다. 없으면 억지로 deepening하지
   않는다.
3. 한 번 승인한 P0-P4 미션이 내부 gate를 통과하며 진행하되, material expansion만
   Leo에게 돌아온다.
4. SOURCE/BUILD/TEST/RUNTIME/INTEGRATION/AUTHORITY/TARGET_FIT을 분리하고 하나의
   READY 점수로 합치지 않는다.
5. Foundation-local static map을 먼저 만든 후 선택된 runtime만 검증한다.
6. Historical foundation-control 구현은 위치와 과거 동작 증거일 뿐 현재 권한이
   아니다.
7. Atomic product는 synthetic 구조 준비도만 보고 schema나 real-person matching을
   결정하지 않는다.
8. Memory V3와 learning/promotion 경로는 활성화하지 않는다.
9. AI stochastic test의 5회/3회는 선택된 critical/routine case의 기본값일 뿐
   reliability 증명이 아니다.
10. 현재상태 증거를 먼저 독립 검수한 뒤 같은 미션 안에서 non-executable option을
    작성한다.

### Leo가 지금 확인할 4개 항목

1. **결정 질문/결과 범위 승인**

   Foundation의 다음 bounded 구현 우선순위를 정하기 위해, SIASIU 상담·판단,
   선택적 Cosmile AI 상담과 product snapshot, Foundation canonical 지식 core를
   근접 결과 범위로 사용합니다. 일반 Cosmile 상거래는 제외합니다.

2. **하나의 internally gated 미션 승인**

   P0/P1 뒤 routine 재승인 없이 P2/P3/P4까지 진행합니다. 새 scope·actor class·
   provider authority·data/risk class·write/ownership decision이 필요할 때만
   돌아옵니다.

3. **Material duration deviation rule 승인**

   P0가 실제 저장소 근거로 upper estimate를 만듭니다. 이후 예상 완료가 그 upper
   bound를 `max(1 working day, 25%)`보다 더 초과하면 Leo에게 반환합니다.

4. **Actor effort 권고 승인**

   Advisor가 live binding을 검증하고, primary Foundation Worker와 Independent
   Reviewer는 maximum, targeted actor는 최소 xhigh를 권고합니다. 승인된 model은
   Leo 허가 없이 바꾸지 않습니다.

### 승인 시 다음 동작

Strategy가 확정된 영어 지시를 `foundation-advisor`에게 한 번 전달합니다. Advisor가
Foundation Worker를 중심으로 조사·검증·독립 검수·final audit을 끝낸 뒤 Strategy로
반환합니다. 구현은 시작하지 않습니다.

승인 예시:

```text
I approve the corrected Foundation baseline instruction,
the one-mission P0-P4 internal-gate structure,
the stated decision/outcome envelope,
the material-deviation rule,
and the proposed effort floor.

Dispatch the exact approved English instruction to foundation-advisor.
Do not begin implementation.
PROCEED.
```

## English

### Conclusion

All seven Council roles converged after cross-review on
`PROCEED_WITH_CORRECTIONS`.

A Foundation-wide baseline is necessary, but it must not apply equal deep-audit depth to
every capability. The agreed structure is:

```text
shallow Foundation-wide current-state census
-> select only decision-relevant paths
-> safely admitted non-production verification
-> historical Control/SIASIU/Cosmile boundary checks only when necessary
-> immutable current-state evidence and Independent Review
-> non-executable evidence-derived options
-> return to Strategy and Leo, then STOP
```

The Council did not inspect Foundation repositories or establish current implementation
facts. It reviewed only how the later investigation can be accurate, bounded, and safe.

### Council corrections

1. Pin the exact Leo decision and near-term outcome envelope before investigation.
2. Discover actual current consumers through P1 evidence; do not deepen a path merely for
   target-architecture completeness.
3. Use one Leo-approved P0-P4 mission with internal gates and return only on material
   expansion.
4. Keep SOURCE/BUILD/TEST/RUNTIME/INTEGRATION/AUTHORITY/TARGET_FIT separate and prohibit a
   composite READY score.
5. Build the Foundation-local static map before selected runtime verification.
6. Historical foundation-control implementation is evidence, not current authority.
7. Atomic products receive synthetic structural-readiness assessment only; no schema or
   real-person matching decision.
8. Memory V3 and learning/promotion paths remain inactive.
9. AI 5/3 repetitions are selected critical/routine defaults, not reliability proof.
10. Independently review the frozen current-state evidence before producing non-executable
    options in the same mission.

### Four confirmations required from Leo

1. Approve the decision/outcome envelope: SIASIU consultation/judgment, optional Cosmile
   AI consultation and product snapshot, and Foundation canonical knowledge services;
   ordinary Cosmile commerce remains excluded.
2. Approve one internally gated P0-P4 mission without routine reapproval.
3. Approve return when the projected duration exceeds the P0 upper estimate by more than
   `max(1 working day, 25%)`, or any new scope/authority/risk class is required.
4. Approve the effort recommendation: Advisor live-verifies bindings; primary Foundation
   Worker and Independent Reviewer use maximum effort, targeted actors at least xhigh;
   approved models are not changed without Leo approval.

After approval, Strategy sends the exact English instruction once to
`foundation-advisor`. Advisor completes the baseline, Independent Review, and final audit,
then returns to Strategy. No implementation starts.

