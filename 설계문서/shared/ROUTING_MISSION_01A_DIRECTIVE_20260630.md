# ROUTING-MISSION-01A — DeepSeek semantic intent/strategy SHADOW wiring (지시문 초안)

> 작성: 샤슈(SIASIU) · ★구현 지시문 *초안* (Leo 승인 후 control 발송) · 코드 수정 0
> 기준: `/home/leo/Project/SIASIU/설계문서/SHASHU_ROUTING_DESIGN_REVIEW_20260630.md` · `/home/leo/Project/SIASIU/설계문서/SHASHU_FOUNDATION_LIFT_MAP_20260630.md`
> baseline commit: `563de88` · 성격: **관측(shadow)만 — 라우팅 변경 아님·출력 0 변경**

---

## 구현 구조 추천 (Leo 원칙 4)
**신규 모듈 `/home/leo/Project/foundation-control/foundation_http_service/semantic_router.py` 분리를 추천** (core.py helper보다 안전):
- core.py(judge/decision/enforcement) 결정 기계에 DeepSeek 호출/프롬프트를 안 섞음 → shadow-only 경계가 눈으로 검증됨.
- `patha_reasoning.py`·`llm_guard.py`·`retrieval_provider.py`처럼 *관심사=별도 모듈* 패턴과 일치.
- 끄기 쉬움(호출부 1곳) · llm_guard safety/verify 로직 무수정.
- 전송은 `llm_guard._call` read-only 재사용(llm_guard 수정 0), provider seam(`_MODEL`)은 semantic_router 안에 → 나중 싼 모델 교체 한 줄.

---

## 지시문 (control용)

```
[ROUTING-MISSION-01A] DeepSeek semantic intent/strategy SHADOW wiring (출력 0 변경·계측만)

기준 문서:
- /home/leo/Project/SIASIU/설계문서/SHASHU_ROUTING_DESIGN_REVIEW_20260630.md
- /home/leo/Project/SIASIU/설계문서/SHASHU_FOUNDATION_LIFT_MAP_20260630.md
baseline commit: 563de88

목표:
Foundation의 keyword intent routing divergence를 *바로 고치지 말고*, DeepSeek semantic intent/strategy 판단을
shadow로 붙여 keyword routing과의 disagreement를 계측한다. ★기존 output은 0 변경(authoritative 전환 아님).

중요:
이번 미션은 "관측(shadow)"이다. 라우팅을 바꾸지 않는다.
question understanding은 비용보다 정확도 우선 → semantic router는 DeepSeek 사용.
cheap model 최적화는 이번 미션에서 하지 않는다(provider seam만 남김).

대상 repo:        /home/leo/Project/foundation-control
작업 대상 서비스:  /home/leo/Project/foundation-control/foundation_http_service

주 변경 허용:
- (신규) /home/leo/Project/foundation-control/foundation_http_service/semantic_router.py
- /home/leo/Project/foundation-control/foundation_http_service/core.py  (호출부 + trace만)

절대 수정 금지:
- /home/leo/Project/foundation-control/foundation_http_service/llm_guard.py   (★_call은 *DeepSeek transport로만* read-only 재사용 · safety classify/verify/repair/prompt 로직 수정 금지 · routing prompt는 semantic_router.py 안에서 별도 구성)
- /home/leo/Project/foundation-control/foundation_http_service/deepseek_composer.py
- /home/leo/Project/foundation-control/foundation_http_service/patha_reasoning.py  (02A/02B)
- /home/leo/Project/foundation-control/foundation_http_service/retrieval_provider.py
- /home/leo/Project/foundation-control/foundation_http_service/ssbrain/
- /home/leo/Project/foundation-control/foundation_http_service/profiles.py
- /home/leo/Project/foundation-control/foundation_http_service/server.py
- /home/leo/Project/SIASIU/

핵심 원칙:
- semantic 결과는 trace/debug에만 기록. decision_type·strategy·recommended_products·safety_gate_result·enforcement_reason·retrieval_mode·avoid_atoms 0 변경.
- ★trace에 semantic_shadow_used_for_decision=false 가 반드시 남는다.
- _kw_risk는 safety fail-closed prefilter로 유지. safety는 AI가 유일 게이트가 아니다.
- semantic router는 safety_gate_result를 낮추거나 전복하지 못한다(shadow는 risk를 올리지도 내리지도 않음·관측만).
- semantic router는 제품 생성·제품명·final answer 작성 금지.
- semantic 호출 실패/timeout → semantic_shadow_error 기록하고 기존 output 그대로(★shadow 실패가 서빙에 영향 0·fail-open for shadow).
- ★confidence는 이번 미션에서 *관측값일 뿐*이다. confidence를 decision/strategy/safety/products에 사용 금지. threshold 판단은 01B에서만 검토.

구현 구조 (추천: 신규 모듈 분리):
1. semantic_router.py 신규
   - def route_shadow(user_text) -> dict  (DeepSeek 1콜·구조화 JSON)
   - 전송: from .llm_guard import _call  (read-only 재사용·llm_guard 무수정)
   - provider seam: 모듈 상수 _MODEL = "deepseek-chat" (나중 교체용·이번엔 고정)
   - DeepSeek 호출 외 부작용 0: DB write 0·memory write 0·SIASIU import 0·제품/decision 생성 0
   - 실패 시 {"semantic_shadow_error": "<reason>"} 반환(예외 전파 금지)

2. ★enum 정합 (필수 — 안 맞으면 disagreement 비교가 무의미):
   semantic_intent_shadow는 _classify_intent와 *동일 enum*만 출력:
     greeting · product_type_comparison · top_pick_request · unclear_shopping_guidance ·
     category_product_request · skin_concern_consultation · broad_product_recommendation ·
     contraindication_check · safety_risk_consultation · cannot_determine
   semantic_strategy_shadow는 _answer_strategy와 *동일 enum*만:
     refuse · safety_first · answer_then_clarify · recommend_with_caution · answer_only · clarify_first
   semantic_risk_shadow: none|low|medium|high  (기존 risk 척도)
   ※ 프롬프트에 위 enum을 명시하고, 벗어난 값은 cannot_determine/low로 보수 매핑.

3. core.py 배선 (호출부 + trace만):
   - 위치: consult_chat 내부, judge() 이후(keyword_intent/strategy가 이미 계산된 지점).
   - 게이팅: compose_on 경로에서 실행(실서빙 path). 모듈/상수 SHADOW_ON(기본 True)로 끄기 쉽게.
   - semantic_router.route_shadow(norm) 호출 → 결과를 trace에만 기록. ★어디서도 decision/strategy로 read-back 금지.

shadow output (route_shadow 반환·최소):
- semantic_intent_shadow
- semantic_strategy_shadow
- semantic_risk_shadow
- needs_retrieval_shadow (bool)
- needs_clarify_shadow (bool)
- confidence (0~1)   ★관측값일 뿐 — decision/strategy/safety/products에 사용 금지(threshold는 01B에서만)
- reason (짧은 근거)

disagreement 수집 (core.py trace):
- keyword_intent            (= judge intent_type)
- keyword_strategy          (= _answer_strategy 결과)
- semantic_intent_shadow
- semantic_strategy_shadow
- routing_disagreement      (bool: keyword_intent != semantic_intent_shadow OR keyword_strategy != semantic_strategy_shadow)
- routing_disagreement_reason  (어느 필드가 왜 다른지 짧게)
- semantic_shadow_used_for_decision=false   (★하드 불변)
- semantic_shadow_error (실패 시·없으면 None)

필수 테스트 케이스 (각각 keyword vs semantic shadow 비교 수집):
★실행 경로: 7 테스트는 반드시 compose_on=true 경로에서 실행. 완료 판정 기준 = compose_on=true.
  (compose_off에서 shadow가 안 붙는 것은 *실패가 아님*·정상 — shadow는 compose_on 실서빙 path 계측용)
- "이런 상황이면 하나쯤 들여놔도 괜찮은 게 있을까?"
- "피부가 자꾸 뒤집어지는데 뭘 바꿔보면 좋을까?"
- "요즘 쓸 만한 순한 거 없나?"
- "이거 계속 써도 되는 걸까?"
- "이 제품 말고 다른 선택지도 있을까?"
- "레티놀 추천하지 않는 이유 알려줘"   (★'추천' 키워드 有·실제는 질문 — 핵심 disagreement 후보)
- "순한 걸로 바꾸면 좀 나을까?"
각 케이스 출력: keyword_intent/keyword_strategy · semantic_intent_shadow/semantic_strategy_shadow · routing_disagreement · confidence · reason

★shadow 실패 테스트 (필수·별도):
- DeepSeek 실패/timeout/mock error를 의도적으로 유발(fixture/mock).
- 기대: semantic_shadow_error 기록 · semantic_shadow_used_for_decision=false 유지 ·
  기존 output이 baseline 563de88과 *완전 동일*(decision/strategy/products/safety/answer 0 변경) ·
  shadow 실패가 서빙에 영향 0(예외 전파 0·응답 정상).

비회귀 필수 (baseline 563de88 동일):
- LIFT-MISSION-02A (answer_then_clarify patha_evidence_reasoning) 비회귀
- LIFT-MISSION-02B (recommend_with_caution patha_recommendation) 비회귀
- MAND-07 avoid rail 비회귀
- golden 21/21 · 회귀 8/8 · adversarial 180(decision_integrity=1.0)
- output invariant 0 변경: decision_type·strategy·recommended_products·safety_gate_result·enforcement_reason·retrieval_mode·avoid_atoms

절대 금지:
- authoritative routing 전환 금지(semantic을 decision/strategy로 반영 금지)
- decision_type/strategy/products/safety_gate_result 변경 금지
- recommended_products 생성 · final answer 작성 금지
- llm_guard safety/verify 로직 수정 금지
- patha_reasoning/retrieval_provider/ssbrain/profiles/server 수정 금지
- SIASIU repo 수정 금지
- cheap model 최적화 금지(이번엔 DeepSeek 고정·seam만)
- persistent write 금지 · Cosmile 연결 금지 · v1 완료/PASS 선언 금지 · push 금지

완료 기준:
- semantic_router.py가 DeepSeek로 7테스트(★compose_on=true 경로) + 일반 쿼리의 intent/strategy/risk/needs_*/confidence/reason를 enum 정합으로 반환
- core.py가 shadow 결과 + keyword 값 + routing_disagreement를 trace에 기록(출력 0 변경)
- semantic_shadow_used_for_decision=false 항상 존재
- shadow 실패가 서빙에 영향 0(fail-open 증거)
- 02A/02B/MAND-07/golden 21/회귀 8/adversarial 180 전부 green
- llm_guard/patha/retrieval/ssbrain/profiles/server/SIASIU 수정 0 · push 0

완료 보고:
1. 변경 파일 목록 — 절대경로
2. 변경/신규 함수 — 절대경로+함수명
3. semantic_router.py 설계(프롬프트 enum 정합·provider seam·실패 처리)
4. core.py 배선 위치·게이팅·trace 필드
5. 7 테스트 케이스 keyword vs semantic disagreement 표
6. routing_disagreement 통계(불일치 건수/유형)
7. output invariant 0 변경 증거(baseline 563de88 diff)
8. 02A/02B/MAND-07 비회귀 결과
9. golden 21·회귀 8·adversarial 180 결과
10. semantic_shadow_used_for_decision=false 증거
11. shadow 실패 fail-open 증거
12. SIASIU/금지파일 수정 0 증거
13. ROUTING-MISSION-01A 상태: CLOSED / PARTIAL / OPEN
14. commit · push 0

이번 미션 완료 후 STOP.

다음(ROUTING-MISSION-01B 예고·지금 하지 말 것): shadow disagreement·무회귀 입증되면 intent_signal 주입 seam으로 semantic authoritative 승격(safety는 계속 규칙 fail-closed).
```

---

## 설계 메모 (왜 이렇게)
- **enum 정합 필수**: 안 맞으면 "keyword=category_product_request vs semantic=제품추천요청"처럼 *어휘가 달라* 가짜 disagreement가 잡힘. 같은 enum이라야 진짜 불일치만 보임.
- **shadow 실패 fail-open**(서빙 무영향)을 하드 조건으로 — shadow가 서빙을 깨면 안 됨.
- **semantic_risk_shadow는 관측만**(올리지도 내리지도 않음) — safety는 계속 `_kw_risk` fail-closed가 주도. AI가 유일 안전게이트가 되는 것 원천 차단.
- `"레티놀 추천하지 *않는* 이유"` 케이스가 핵심 — '추천' 키워드로 keyword는 recommend로 갈 위험, semantic은 질문으로 볼 것. divergence를 가장 선명히 보여줌.

## 한계 / 주의
- 이 문서는 **지시문 초안** — 실제 구현은 Leo 승인 후. 코드 수정 0 · commit 0 · push 0.
