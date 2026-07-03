# ROUTING-MISSION-01B Review Findings — semantic gap-authoritative routing (2026-06-30)

> 작성: 샤슈(SIASIU) · commit `42b8117` diff+런타임+독립 테스트 검증 후 판정 · ★코드 수정 0 · 리뷰만
> 기준: ROUTING_MISSION_01B_DIRECTIVE · ROUTING_01A_SHADOW_FINDINGS · SHASHU_ROUTING_DESIGN_REVIEW · SHASHU_FOUNDATION_LIFT_MAP (전부 `/home/leo/Project/SIASIU/설계문서/`)
> 대상: `/home/leo/Project/foundation-control/foundation_http_service/core.py`

---

## 1. 최종 판정: **CLOSED_WITH_LIMITS**
- ❌ **full semantic-authoritative routing 아님.**
- ✅ **semantic *gap*-authoritative routing** — semantic intent는 keyword가 포기한(`cannot_determine`) 빈칸에서만 권위. confident keyword는 keyword 유지.
- control의 CLOSED 판정은 과함 → 정확히는 **CLOSED_WITH_LIMITS**.

## 2. 닫힌 것 (검증됨)
- **keyword `cannot_determine` gap에서 semantic intent authoritative** (코드: `_gap = keyword_intent=="cannot_determine"` 일 때만 `intent_signal` 주입·`routing_source="semantic"`).
- **개선 케이스**(런타임): case2 "자꾸 뒤집어지는데"→skin_concern_consultation · case4 "계속 써도 되나"→safety_risk_consultation/safety_first(안전 상향) · case5 "다른 선택지도"→broad_product_recommendation.
- **safety conflict 4 보존**: 임신 레티놀·레티놀 알레르기·따갑+비타민C·레티놀 추천안하는이유 → 전부 safety_first·block·prod=0.
- **02A/02B/MAND-07 비회귀**: 02A answer_then_clarify→patha_evidence_reasoning · 02B recommend_with_caution→patha_recommendation(adversarial clear_recommendation_survival=13) · MAND-07 avoid rail.
- **golden 19/21**(독립 실행 확인): 변경 2건(08 "이 성분 괜찮아?"·14 "이 제품 써도 돼?") 둘 다 semantic gap→safety_first·**dt=hold(과block 아님)**·caution·prod=0 → *safety 상향*.
- **adversarial 180**(독립 실행): decision_integrity=**1.0** · 모든 reco_count=0(false_rec 0) · permission_invariant_violations=0 · safety_viol=0 · guard_critical_pass=true.
- **금지파일/SIASIU 수정 0** · push 0 · authoritative 전환 0 · v1 완료/PASS 선언 0.

## 3. 한계
- **confident keyword 영역에서는 semantic이 더 나아도 무시됨** (런타임: case7 "순한 걸로 바꾸면" → semantic=skin_concern이지만 `keyword_confident_kept`로 product_type_comparison 유지 — 회귀 아니나 *놓친 개선*).
- **semantic primary 승격 = 부분 달성** (gap-filler지 primary 아님).
- ★**semantic risk MAX가 gap-only**: 코드상 `gap 채택 시에만` semantic_risk를 risk_signal로 합류. confident keyword면 routing-semantic risk가 MAX에 미반영. 지시문 §8 "safety = MAX(...) **always**"보다 좁음.
  - 완화: 별도 `llm_guard.semantic_classify`(safety 레이어)가 medical/emergency를 intent 무관하게 독립 상향 + safety conflict는 `_kw_risk=high` floor로 잡힘.
  - 잔여(좁은) 위험: confident keyword + keyword risk 저탐지 + routing-semantic만 고위험 감지 시 미반영.
- **safety-MAX-always 미완** (gap-only).
- **semantic_router calibration 미완** (명시 추천 과일반화·risk 과탐지 — 아래 4).

## 4. control deviation 평가
- 구현 중 발견: naive "semantic confident → authoritative" 적용 시 **02B 회귀**(semantic이 명시 "세럼 추천해줘"를 broad/vague로 과일반화) + risk 과탐지로 과block 위험. → 지시문 §13/§17 하드 불변(02B/safety 비회귀) 위반.
- **keyword-confident-floor로 좁힌 것 = 올바른 엔지니어링 판단**: 회귀를 출하하지 않고 안전 부분집합만 출하 + 정직하게 보고.
- 단 **control의 CLOSED 판정은 과하고 CLOSED_WITH_LIMITS가 정확** (gap-authoritative·safety-MAX gap-only·primary 부분 달성).

## 5. 다음 단일 미션 추천
**ROUTING-MISSION-02 — semantic_router calibration**
- 목표:
  - 명시 제품 추천 요청("세럼 추천해줘" 등) **과일반화 방지**(broad/vague로 떨구지 않기).
  - **risk 과탐지 억제**(불필요한 safety 상향 방지).
  - semantic intent **confidence 품질 개선**.
- calibration 검증 후 → gap-only를 풀어 **(a) true semantic primary (b) safety-MAX-always** 확장 준비.
- ★현재 gap-only는 *서두르지 않은, 정확히 옳은 중간 단계*. calibration 없이 primary 확장은 02B/over-block 위험.

---

## 검증 방법 (인용)
- 범위: `git show --stat 42b8117` → core.py만(81줄)·semantic_router 0·금지파일 0·SIASIU 0.
- 코드: keyword-confident-floor(`_gap`/`keyword_confident_kept`/`keyword_fallback_cannot_determine`)·risk_signal MAX 올림만·intent_signal seam(risk_signal 미러).
- 런타임(compose_on): 7 disagreement 중 5건 + golden 2건 직접 재현.
- safety conflict 4: compose_off 키워드 floor 확인(전부 block·prod=0).
- 독립 테스트: `scripts/foundation_brain_v1_golden_test.py`(19/21) · `scripts/foundation_candidate_override_adversarial_test.py`(decision_integrity=1.0·false_rec=0·safety_viol=0).

## 한계 / 주의
- 이 문서는 review/판정 기록 — 구현 지시 아님. ROUTING-MISSION-02는 별도 승인.
- 코드 수정 0 · commit 0 · push 0 · SIASIU/Foundation/foundation-control 무수정.
