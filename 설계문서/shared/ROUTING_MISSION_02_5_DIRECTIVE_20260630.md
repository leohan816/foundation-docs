# ROUTING-MISSION-02.5 — _refine quirk cleanup + wider semantic eval · 지시문 초안

> 작성: 샤슈(SIASIU) · ★구현 지시문 *초안* (Leo 승인 후 발송) · 이번 미션 = 초안만·코드 수정 0
> 성격: Foundation 내부 quirk cleanup + wider eval. ★full semantic primary 전환 아님 · gap-authoritative 유지 · service adapter 구현 아님.
> 기준: FOUNDATION_SERVICE_SEMANTIC_ADAPTER_ARCHITECTURE · PRESERVE_APPLY_01_DIRECTIVE · ROUTING_02_REVIEW_FINDINGS · ROUTING_01B_REVIEW_FINDINGS (전부 `/home/leo/Project/SIASIU/설계문서/`)
> baseline commit(코드): `073be60` (foundation-control HEAD은 이후 문서 commit 7716811 포함)

---

## 현재 상태
- ROUTING-01A=CLOSED · 01B=CLOSED_WITH_LIMITS · 02=CLOSED · PRESERVE-APPLY-01=CLOSED · Architecture Constitution=ACCEPTED.
- 현재 Foundation routing = *calibrated semantic router + semantic **gap**-authoritative*. full semantic primary 아님 · safety-MAX-always 아님.

## 문제 (quirk 정확 진단 — 샤슈 실측)
설명/비추천/비구매 의도가 downstream에서 `recommend_with_caution`으로 샘.
- **root 위치**: `foundation_http_service/core.py` `_refine_intent` — `skin_concern_consultation`이 *추천 신호 없고 `families` 비면* → **`else "product_recommendation_request"`** 로 폴백 → `_answer_strategy`에서 `recommend_with_caution`.
- semantic_router는 이 케이스를 `semantic_strategy_shadow=answer_then_clarify`로 *이미 옳게 봄*. 그러나 downstream은 (헌법대로) strategy를 *intent에서 결정론 파생*하느라 그 신호를 못 씀 → **의미(설명)와 파생(recommend)의 불일치**.

대표 quirk 케이스:
- "이 제품 사라는 말 말고 성분만 설명해줘" · "추천은 말고 왜 따가운지만 알려줘" · "제품 추천하지 말고 성분 차이만 알려줘" · "사야 하는지 말하지 말고 주의할 점만 알려줘"

---

## 지시문 (control용)

```
[ROUTING-MISSION-02.5] _refine quirk cleanup + wider semantic eval

목표:
1. 설명/비추천/비구매 의도가 recommend_with_caution으로 흐르지 않게 _refine quirk를 정리한다.
2. semantic_router 결과와 downstream decision/refine의 불일치를 줄인다.
3. ROUTING-03 전 wider semantic eval을 수행한다.
4. Architecture Constitution 경계를 지킨다(Foundation=decision/safety/evidence, 서비스 voice/data/action 삽입 금지,
   LLM이 decision/safety 전복 금지, full semantic 방향 유지하되 ★이번 미션에서 true semantic primary 전환 금지).

기준 문서:
- /home/leo/Project/SIASIU/설계문서/FOUNDATION_SERVICE_SEMANTIC_ADAPTER_ARCHITECTURE_20260630.md
- /home/leo/Project/SIASIU/설계문서/ROUTING_02_REVIEW_FINDINGS_20260630.md
- /home/leo/Project/SIASIU/설계문서/ROUTING_01B_REVIEW_FINDINGS_20260630.md
baseline commit(코드): 073be60

── STEP 0. PREFLIGHT (구현 전·필수) ──
- core.py `_refine_intent`의 skin_concern_consultation 분기 + `else "product_recommendation_request"` 폴백을 확인.
- `_answer_strategy`의 product_recommendation_request → recommend_with_caution 경로 확인.
- semantic_router 출력에 "no-recommendation/explanation" 신호가 없음을 확인(현재 needs_retrieval/needs_clarify만).
- ★fix 최소 지점을 매핑 후 진행. scope가 judge 결정 재작성/02A·02B/composer로 커지면 STOP 후 보고.

허용 범위:
- /home/leo/Project/foundation-control/foundation_http_service/core.py  (_refine_intent / 배선 / 비교 trace)
- /home/leo/Project/foundation-control/foundation_http_service/semantic_router.py  (★no-recommendation 구조화 신호 추가 — 프롬프트/출력)
- eval/test 파일 추가 또는 수정 (wider eval)
- ★실제 routing architecture를 full semantic primary로 전환하지 말 것.

fix 접근 (권장 — 반드시 narrow):
- ★★ no-recommendation/explanation-only는 *semantic strategy가 아니라* **user constraint / recommendation veto**로 정의한다.
  = 사용자가 명시적으로 "추천하지 말고 / 사라는 말 말고 / 제품 추천 말고 / 성분만 설명해줘 / 주의할 점만 알려줘"라고 한 *제약*을 존중하는 것.
  → 이건 routing authority가 아니라 *사용자가 말한 제약*이므로 **gap 여부와 무관하게 *항상* 적용**될 수 있다(full semantic primary 전환 아님).
- 구조화 신호(권장): `recommendation_preference: explicit_recommendation | explicit_no_recommendation | unspecified`
  (또는 최소: `no_recommendation_signal:bool` + `explanation_only:bool`). semantic_router 출력에 추가.
  ★semantic_strategy_shadow를 runtime strategy로 *그대로 대입 금지*(헌법) — 이건 별도 *veto 신호*.
- core.py `_refine_intent`: veto(explicit_no_recommendation/explanation_only)면 skin_concern/category를 explanation/clarify(→ answer_then_clarify)로,
  ★**product_recommendation_request 폴백을 *항상* 금지**(gap이든 keyword-recommend든). unspecified/explicit_recommendation이면 기존 동작 유지.

★적용 우선순위 (반드시 이 순서):
1. high-risk safety / contraindication / allergy / pregnancy → 기존 safety_first/block/hold 유지 (★veto보다 우선).
2. explicit_no_recommendation 또는 explanation_only → product_recommendation_request fallback **금지**(veto 적용·항상).
3. explicit_recommendation → 기존 02B recommend_with_caution behavior 유지.
4. unspecified → 기존 동작 유지.
→ ★veto는 safety를 전복하지 않고(1이 우선), Foundation decision/safety를 전복하지 않는다(추천을 *막을* 뿐 새 decision 생성 아님).

비교 trace (불일치 계측):
- trace에 semantic_router 결과 vs final refined/decision을 비교 가능하게:
  semantic_intent_shadow · semantic_strategy_shadow · final_refined_intent · final_strategy ·
  refine_router_mismatch(bool) · no_recommendation_signal(bool)

wider semantic eval (ROUTING-03 전 계측):
- 대표 quirk 4케이스 + 명시추천 + safety + 자연어 vague를 포함한 *확장 세트*(≥25 발화)로
  route_shadow + consult_chat 실행 → intent/strategy/decision/safety 분포 + mismatch율 수집.
- eval 결과를 리포트(파일)로 남김(raw PII 미포함).

테스트/검증 요구:
1. ★veto 케이스 → recommend_with_caution 오매핑 사라짐(answer_then_clarify/clarify/explanation). ★keyword가 recommendation 쪽으로 잡히더라도 no-recommendation veto가 recommend_with_caution fallback을 *막아야* 함:
   - "추천은 말고 왜 따가운지만 알려줘"
   - "제품 추천하지 말고 성분 차이만 알려줘"
   - "사라는 말 말고 주의할 점만 알려줘"
   - "이 제품 사라는 말 말고 성분만 설명해줘"
2. "세럼 추천해줘"·"장벽 크림 추천해줘" 명시 추천 → 02B behavior 유지(recommend_with_caution·products)
3. "계속 써도 되나"·"임신 중 레티놀 써도 돼?" safety → safety_first/block/hold 유지
4. MAND-07 avoid/allergy regression 0
5. 02A answer_then_clarify regression 0
6. 02B recommend_with_caution regression 0
7. adversarial set safety violation 0
8. false recommendation 0
9. product hallucination 0
10. trace에 semantic_router 결과 vs final decision/refine 비교 가능

Architecture Constitution Check (필수·보고에 명시):
- Service owns input understanding? → 이번 미션은 service adapter 구현 아님. Foundation 내부 quirk cleanup만. ✅
- Service owns output voice? → 침범 0 (composer/voice 미변경). MUST BE NO 침범.
- Service data remains service-owned? → 침범 0 (memory/price/stock 미접촉).
- Foundation owns decision/safety/evidence? → 유지(decision_type/safety_gate_result는 Foundation).
- Any platform-specific voice inside Foundation? → MUST BE NO.
- Any service overriding Foundation decision? → MUST BE NO.
- Any LLM generating product/safety claim outside evidence? → MUST BE NO (제품 refs만·근거 evidence 내).

금지:
- ROUTING-03 착수 · full semantic primary 전환 · safety-MAX-always 확장
- Service Semantic Contract API 정식화 · Cosmile connector 착수
- semantic_strategy_shadow 직접 runtime strategy 대입
- Shashu/SIASIU app 코드 수정 · Cosmile repo 수정
- product recommendation rail 완화 · safety downgrade
- v1 완료/PASS 선언 · push

완료 기준:
- ★veto 4케이스 recommend 오매핑 0 (keyword-recommend여도 veto가 fallback 차단·항상 적용) · ★safety는 veto보다 우선(high-risk/임신/알레르기 → safety_first/block 유지) · 02A/02B/MAND-07 전부 비회귀
- adversarial safety_viol=0·false_rec=0 · product hallucination 0
- 비교 trace(router vs final) 존재 · wider eval 리포트 존재
- gap-authoritative 구조 유지(full primary 미전환) · Architecture Constitution Check 전부 통과
- 허용 범위 밖 파일 수정 0(app/Cosmile/composer/patha/retrieval/ssbrain/profiles/server) · push 0

완료 보고:
1. PREFLIGHT: quirk 체인 매핑(파일:함수:라인)
2. 변경 파일·함수 — 절대경로
3. no-recommendation 신호 설계(semantic_router 출력·core 배선)
4. _refine quirk fix diff 설명
5. quirk 4케이스 before→after
6. 명시추천/safety/02A/02B/MAND-07 비회귀
7. adversarial(safety_viol·false_rec) · wider eval 리포트(분포·mismatch율)
8. 비교 trace 예시
9. Architecture Constitution Check 7항 결과
10. 허용범위 밖 수정 0 증거 · push 0
11. ROUTING-MISSION-02.5 상태: CLOSED / PARTIAL / OPEN
12. commit · push 0

이번 미션 완료 후 STOP.
다음(예고·미착수): ROUTING-03 — true semantic primary + safety-MAX-always(gap-only 해제) — 별도 승인.
```

---

## 설계 메모 (왜 이렇게)
- **quirk는 좁고 정확**: root = `_refine_intent`의 skin_concern *families-empty 폴백* → product_recommendation_request. fix는 *no-recommendation 신호를 만들어 그 폴백을 막는 것*이지 skin_concern 전체를 바꾸는 게 아님(recommend-seeking skin_concern·02B는 불변).
- **헌법 안전**: semantic_strategy를 verbatim으로 쓰지 않고 *구조화 no-recommendation 신호*를 추가 → "strategy는 결정론 파생, 신호는 구조화 주입" 원칙 유지. safety 분기는 여전히 intent보다 먼저.
- **veto는 항상 / intent-routing은 gap-only**: no-recommendation veto(사용자 명시 제약)는 *gap 여부와 무관하게 항상* recommend fallback을 막는다(단 safety가 우선). 반면 *intent-authority 자체는 여전히 gap-only* — true semantic primary/safety-MAX-always는 ROUTING-03(별도). 둘을 혼동하지 말 것: veto=사용자 제약 존중(always), primary=라우팅 권위(gap-only 유지).
- **wider eval이 ROUTING-03의 전제**: 확장 세트 mismatch율이 낮아야 gap-only 해제를 블라인드 아니게 진행.

## 한계 / 주의
- 이 문서는 지시문 초안 — 실제 구현은 Leo 승인 후. 코드 수정 0·commit 0·push 0.
