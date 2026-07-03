# CONTRACT-01 Implementation Directive — Phase A (SSC/FRC 계약 형태 정규화) · 지시문 초안

> 작성: 샤슈(SIASIU) · ★구현 지시문 *초안* (Leo 승인 후 발송) · 이번 미션 = 초안만·코드 수정 0
> 성격: **Phase A만** — semantic_router 출력/응답을 *SSC/FRC 계약 스키마로 정규화* + validation + invariant assert. ★서비스 이동/API 신설/scaffold 제거 아님·runtime 판단 로직 무변경.
> 정본 설계: `/home/leo/Project/SIASIU/설계문서/CONTRACT_01_SERVICE_FOUNDATION_SEMANTIC_CONTRACT_20260701.md`
> 부칙: `.../ARCHITECTURE_CONSTITUTION_ADDENDUM_SEMANTIC_POLICY_GATE_20260701.md`

---

## 지시문 (control용)

```
[CONTRACT-01 · Phase A] SSC/FRC 계약 형태 정규화 + validation + invariant assert (판단 로직 무변경)

목표:
ROUTING-02.7C까지의 semantic fields / policy gate / severity basis를 *SSC(입력)·FRC(출력) 계약 스키마*로 정규화한다.
★이번 Phase A는 계약 *형태*만 고정 — 서비스 이동 없음·새 API 없음·scaffold 제거 없음·runtime 판단/라우팅/severity 로직 0 변경.

기준 문서:
- /home/leo/Project/SIASIU/설계문서/CONTRACT_01_SERVICE_FOUNDATION_SEMANTIC_CONTRACT_20260701.md
- /home/leo/Project/SIASIU/설계문서/ARCHITECTURE_CONSTITUTION_ADDENDUM_SEMANTIC_POLICY_GATE_20260701.md
baseline commit: b0addba

── STEP 0. PREFLIGHT ──
- semantic_router 출력 필드와 SSC 필드의 1:1 매핑표 작성(adverse_reaction/continue_use/should_route_safety/severity/symptom/visible/red_flag/confidence/recommendation_preference → SSC).
- consult_chat 응답/trace 필드와 FRC 필드 매핑표 작성(final_strategy/decision_type/safety_gate_result/final_severity_class/severity_class_basis/policy_rule_applied/products/answer/evidence/trace → FRC).
- ★scope가 새 API 신설·서비스 Adapter 구현·scaffold 제거로 커지면 STOP 후 보고(그건 Phase B~).

허용 범위:
- /home/leo/Project/foundation-control/foundation_http_service/core.py        (계약 정규화 함수 + FRC emit + invariant assert)
- /home/leo/Project/foundation-control/foundation_http_service/semantic_router.py  (SSC 정규화 helper·출력 형태만)
- (신규) /home/leo/Project/foundation-control/foundation_http_service/contracts.py  (SSC/FRC 스키마·validate·enum — 순수 데이터·판단 로직 없음)
- eval/test 파일

절대 금지:
- runtime 판단/라우팅/severity/veto/policy gate *로직* 변경(형태 정규화만·값 동일)
- 새 HTTP endpoint 신설 · 서비스 Semantic Adapter 구현 · semantic_router scaffold 제거 (= Phase B~·별도 승인)
- Shashu/Cosmile으로 semantic recognition 이동 · Cosmile connector
- composer/patha/retrieval/llm_guard/ssbrain/profiles/server 수정 · SIASIU app 수정 · Cosmile 수정
- raw keyword를 final semantic judge로 격상 · lexical_floor_backstop을 semantic_policy_gate로 위장
- product rail 완화 · safety downgrade · golden expected 수정 · push

해야 할 일:
1) contracts.py 신규(순수 스키마):
   - SSC/FRC 필드·enum(설계서 §1·§2·§6) 정의 · `validate_ssc(dict)->(ok, errors, normalized)` · `build_frc(consult_result)->dict`.
   - ★판단 로직 0 — 스키마/enum/정규화만. 미준수 enum → 보수 default(unknown/none) + errors 기록.
2) semantic_router: 출력을 SSC 하위(semantic_* 블록) 형태로도 emit(기존 필드 유지·추가 형태만). 판단 프롬프트/로직 무변경.
3) core.py consult_chat: 최종 응답에 `frc = build_frc(...)` 포함(기존 응답/trace 유지·FRC는 *추가 뷰*). severity_class_basis 4종·policy_rule_applied 그대로 반영.
4) invariant assert(계약 게이트):
   - safety_first → products=0 · recommendation_allowed=false
   - severity_class_basis=lexical_floor_backstop인데 semantic_policy_gate로 라벨링되면 실패
   - answer_substance에 **service-specific persona/CTA/channel UX phrase/commerce action phrase** 없음(간이 체크). ★locale 자연어 설명 자체는 허용(한/중/영 OK) — 금지는 서비스 말투/CTA/판매 유도지 언어 현지화 아님.
   - safety_gate_result는 raise-only(계약 경로에서 낮춰지지 않음). ★safety는 fail-closed — 애매/미판단이면 열지 않고 보수(uncertainty_backstop). "fail-open" 표현 사용 금지.
   - ★scaffold는 compatibility/transitional fallback으로만 유지(SSC 미제공 시 채움)·safety는 항상 fail-closed.

검증/테스트:
1. ★runtime 값 불변: baseline b0addba 대비 final_strategy/decision_type/safety_gate_result/final_severity_class/severity_class_basis/products *동일*(형태만 추가).
   - 케이스: 울긋불긋·좁쌀·따가운데·붓는데·자잘하게·이 성분 괜찮아·민감피부 세럼 추천·레티놀 알레르기.
2. SSC validate: 정상/enum이탈/필드누락 → ok/errors·보수 default 확인.
3. FRC build: 위 케이스에서 FRC 필드가 설계서 §2와 일치·refs만·persona 미포함.
4. invariant assert: safety_first→products=0·basis 위장 0·raise-only.
5. 비회귀: golden 21/21 · adversarial safety_viol=0·false_rec=0 · 02.5/02B/02A/MAND-07/02.7C(울긋불긋 x3·좁쌀 x3) 유지.
6. Architecture Constitution Check:
   - Raw utterance semantic judgment by AI? YES(무변경) · Heuristic final semantic judge? NO
   - Deterministic policy gate on structured output? YES · Heuristic floor/backstop only? YES
   - Safety = AI + policy gate + Foundation gate? YES · AI fields decorative? NO
   - keyword-only labeled semantic_policy_gate? NO · Service voice in Foundation(FRC substance)? NO
   - Transitional ownership 유지(scaffold·target owner=Service Adapter)? YES
   - ★Phase A 범위 준수(서비스 이동/새 API/scaffold 제거 0)? YES

완료 기준:
- contracts.py(순수 스키마)·SSC validate·FRC build·invariant assert 존재
- ★runtime 값 baseline 동일(형태만 추가·판단 0 변경)
- 비회귀(golden 21/21·adversarial·02.5~02.7C) 유지
- Constitution Check 전항 · Phase A 범위 준수 · 금지파일/SIASIU/Cosmile 0 · push 0

완료 보고:
1. PREFLIGHT SSC/FRC 매핑표
2. 변경/신규 파일·함수 — 절대경로
3. contracts.py 스키마·validate·build 설계
4. SSC validate 결과(정상/이탈/누락)
5. FRC build 예시(대표 케이스)
6. invariant assert 결과
7. runtime 값 baseline 동일 증거(8케이스)
8. 비회귀(golden/adversarial/02.5~02.7C)
9. Architecture Constitution Check 전항 + Phase A 범위 준수
10. 금지파일/SIASIU/Cosmile 0 · push 0
11. CONTRACT-01 Phase A 상태: CLOSED / PARTIAL / OPEN
12. commit · push 0

이번 미션 완료 후 STOP.
다음(예고·미착수): Phase B(Foundation Contract API: SSC in/FRC out) → Phase C(Shashu Semantic Adapter가 SSC 생성) → Phase D(COSMILE-CONNECT).
```

---

## 설계 메모 (왜 Phase A만)
- **Phase A = 형태 정규화만·판단 0 변경** → 저위험. 계약 스키마를 *지금 코드 위에* 씌워 "필드 의미·소유권"을 고정. runtime 동작은 baseline과 동일해야 함(형태만 추가).
- **서비스 이동·새 API·scaffold 제거는 Phase B~** — 한 번에 하나. Phase A로 계약을 얼리고, 그 위에서 안전하게 이동.
- **invariant assert = 계약 CI 게이트 씨앗** — safety_first→products=0·basis 위장 금지·raise-only를 코드가 강제 → 이후 미션들이 계약을 못 깨게.
- **02.7C basis 4종을 FRC에 그대로** → severity 계약이 이미 AI-primary·정직 basis라 깔끔히 이전.

## 한계 / 주의
- 이 문서는 지시문 초안 — 실제 구현은 Leo 승인 후. 코드 수정 0·commit 0·push 0.
