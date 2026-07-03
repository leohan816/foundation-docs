# ROUTING-MISSION-02 Review Findings — semantic_router calibration (2026-06-30)

> 작성: 샤슈(SIASIU) · commit `073be60` diff+런타임+독립 테스트 검증 후 판정 · ★코드 수정 0 · 리뷰만
> 기준: ROUTING_MISSION_02_DIRECTIVE · ROUTING_01B_REVIEW_FINDINGS · ROUTING_MISSION_01B_DIRECTIVE · ROUTING_01A_SHADOW_FINDINGS · SHASHU_ROUTING_DESIGN_REVIEW · SHASHU_FOUNDATION_LIFT_MAP (전부 `/home/leo/Project/SIASIU/설계문서/`)
> 대상: `/home/leo/Project/foundation-control/foundation_http_service/semantic_router.py`

---

## 1. 최종 판정: **CLOSED**
- ROUTING-MISSION-02 = **CLOSED** (★01B와 달리 deliverable이 완전 — CLOSED_WITH_LIMITS 아님).
- semantic_router calibration **완료**.
- **core.py 변경 0** (라우팅 로직 무손상).
- **01B gap-authoritative 구조 유지** (keyword-confident-floor·intent_signal·risk MAX 그대로).

## 2. 닫힌 것 (검증됨)
- **명시 추천 5/5 → category_product_request** (route_shadow 직접): 민감피부 진정 세럼·장벽 크림·비타민C 세럼·선크림 하나·수분크림.
- **confidence 0.95 이상** (≥0.75 목표 충족).
- **plain 추천 risk low** (medium/high 과탐지 0).
- **broad_product_recommendation 과일반화 0** · **top_pick_request 과오분류 0**.
- **safety/suitability loosen 0**: 써도 돼?·괜찮아?·따가워·알레르기·임신·레티놀 → contraindication_check/safety_risk_consultation·risk medium/high 유지. consult_chat safety conflict 4 → 전부 safety_first/block/prod=0.
- **"추천" 단어 과교정 0**: 추천하지 않는 이유·추천은 말고·사라는 말 말고 → 전부 non-category(contraindication_check/skin_concern).
- **02A/02B/MAND-07 비회귀**: 02A patha_evidence_reasoning · 02B keyword_confident_kept·recommend_with_caution·patha_recommendation · MAND-07 avoid rail.
- **golden 19/21 유지 · 신규 변경 0** (독립 재실행: FAIL은 08/14뿐 = 01B 상속. calibration이 만든 변경 0).
- **adversarial 180**: safety_viol=0 · false_rec=0 · decision_integrity=1.0.
- **금지파일/SIASIU 수정 0** (core.py·llm_guard·composer·patha·retrieval·ssbrain·profiles·server·SIASIU staged=0).
- **push 0** · Cosmile 연결 0 · v1 완료/PASS 선언 0.

## 3. 한계 / 후속 추적
- "이 제품 사라는 말 말고 성분만 설명해줘"는 **route_shadow 기준 calibration 목표 충족** (semantic_intent_shadow=skin_concern_consultation·category 아님).
- 다만 **consult_chat downstream `_refine` quirk로 recommend_with_caution**이 됨 (routing_source=semantic·gap).
- **현재는 무해**: products=0 · dt=ask_more · safety=pass · false_rec 0.
- 이건 *core `_refine` 매핑 quirk*이며 MISSION-02 범위 밖(core.py 무변경 준수). → **ROUTING-03 전에 `_refine` quirk 처리 또는 별도 미션 필요.**
- ★위험 전이: 지금은 gap-only라 대부분 keyword라 무해하지만, *semantic primary가 되면(ROUTING-03) 이 quirk가 더 자주 노출*됨("설명만 해줘"가 recommend_with_caution).

## 4. 다음 권고
- **바로 ROUTING-03으로 가지 말 것.** 먼저:
  - **ROUTING-MISSION-02B(또는 02.5)**: (a) `_refine` quirk 정리(skin_concern/explanation → recommend_with_caution 매핑 교정) (b) **wider shadow 재측정**(7 케이스 넘어 다양한 표현으로 calibration 견고성 확인·블라인드 flip 방지).
  - 그다음 **ROUTING-MISSION-03**: true semantic primary + safety-MAX-always 검토(gap-only 해제).

---

## 검증 방법 (인용)
- 범위: `git show --stat 073be60` → semantic_router.py(_SYS 19줄)만·core.py 0·금지파일 0·SIASIU 0.
- calibration: `semantic_router.route_shadow()` 직접 호출 [1]~[4] before→after.
- safety conflict/02B: `consult_chat(compose_on)` 런타임.
- 독립 테스트: `scripts/foundation_brain_v1_golden_test.py`(19/21·FAIL 08/14만) · `scripts/foundation_candidate_override_adversarial_test.py`(decision_integrity=1.0·false_rec=0·safety_viol=0).
- fail-open: route_shadow try/except + core.py sem_err 무손상.

## 한계 / 주의
- 이 문서는 review/판정 기록 — 구현 지시 아님. 다음 미션(02B/02.5·03)은 별도 승인.
- 코드 수정 0 · commit 0 · push 0 · SIASIU/Foundation/foundation-control 무수정.
