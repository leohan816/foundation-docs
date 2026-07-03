# ROUTING-MISSION-01A Shadow Findings — Keyword vs DeepSeek Semantic (2026-06-30)

> 작성: 샤슈(SIASIU) · 실측 검증 후 기록 · ★ROUTING-MISSION-01B 설계 근거 문서 · 코드 수정 0
> 기준: `/home/leo/Project/SIASIU/설계문서/SHASHU_ROUTING_DESIGN_REVIEW_20260630.md`
> 대상: `/home/leo/Project/foundation-control/foundation_http_service/` (commit `c9063b5`)

---

## 1. ROUTING-MISSION-01A 요약 (CLOSED)
- **commit `c9063b5`** · DeepSeek semantic intent/strategy **shadow** 설치(`/home/leo/Project/foundation-control/foundation_http_service/semantic_router.py` 신규 + `core.py` 호출부/trace).
- **output 0 변경**(구조+런타임 증명): `strategy`는 keyword로 확정된 *뒤* shadow 호출, shadow는 `routing_disagreement`(trace)에만, downstream 전부 keyword 사용.
- **`semantic_shadow_used_for_decision=false`** 하드 리터럴 — 런타임에서 출력이 keyword 따르고 shadow 무시 확인.
- **fail-open 검증**: `_call` RuntimeError mock → `semantic_shadow_error` 기록·서빙 정상(answer 존재).
- **금지파일/SIASIU 수정 0** · push 0 · authoritative 전환 0.
- 비회귀: 02A/02B 동작 유지 · golden 21/21 · 회귀 8/8 · adversarial 180(decision_integrity=1.0·safety_viol=0).

## 2. 7개 테스트 결과
| user_text | keyword_intent | keyword_strategy | semantic_intent_shadow | semantic_strategy_shadow | conf | disagree | 해석 |
|---|---|---|---|---|---|---|---|
| 이런 상황이면 하나쯤 들여놔도 괜찮은 게 있을까? | cannot_determine | clarify_first | broad_product_recommendation | clarify_first | 0.7 | ✓ | keyword 포기·semantic은 광의 추천요청으로 파악 |
| 피부가 자꾸 뒤집어지는데 뭘 바꿔보면 좋을까? | cannot_determine | clarify_first | skin_concern_consultation | answer_then_clarify | 0.85 | ✓ | keyword 포기·semantic은 피부고민 상담으로 정확 |
| 요즘 쓸 만한 순한 거 없나? | cannot_determine | clarify_first | broad_product_recommendation | clarify_first | 0.7 | ✓ | keyword 포기·semantic은 추천요청 |
| 이거 계속 써도 되는 걸까? | cannot_determine | clarify_first | safety_risk_consultation | safety_first | 0.85 | ✓ | ★keyword 포기·semantic이 *안전 우려를 포착*(semantic이 더 안전) |
| 이 제품 말고 다른 선택지도 있을까? | cannot_determine | clarify_first | broad_product_recommendation | answer_then_clarify | 0.85 | ✓ | keyword 포기·semantic은 대안 탐색 |
| 레티놀 추천하지 않는 이유 알려줘 | contraindication_check | safety_first | contraindication_check | answer_then_clarify | 0.85 | ✓ | ★intent 동일·strategy 충돌(kw=safety_first vs sem=answer_then_clarify)·*keyword가 더 안전* |
| 순한 걸로 바꾸면 좀 나을까? | product_type_comparison | answer_then_clarify | skin_concern_consultation | answer_then_clarify | 0.85 | ✓ | intent 불일치(비교 vs 피부고민) |

→ **7/7 disagreement.** (검증: "자꾸 뒤집어지는데"·"순한 거 없나"·"레티놀" 케이스는 route_shadow 직접 호출로 표와 일치 확인 — 조작 아님.)

## 3. disagreement 유형 분류
- **A. keyword가 `cannot_determine`으로 포기·semantic이 의미 포착 (5건)** — 1,2,3,4,5. *자연어 표현을 keyword가 못 잡음*을 실측 확증. semantic이 **커버리지를 더하는** 좋은 불일치.
- **B. intent 불일치 (1건)** — 7 "순한 걸로 바꾸면": kw=product_type_comparison vs sem=skin_concern_consultation.
- **C. strategy 불일치 (1건)** — 6 "레티놀 추천 안 하는 이유": intent 동일(contraindication_check), strategy kw=safety_first vs sem=answer_then_clarify.
- **D. safety 관련 conflict (2건·양방향)** ★:
  - 6 레티놀: **keyword가 더 안전**(레티놀 high → safety_first), semantic은 덜 보수적(answer_then_clarify).
  - 4 "이거 계속 써도 되나": **semantic이 더 안전**(safety_risk_consultation/safety_first), keyword는 포기(cannot_determine/clarify_first).
  → **양쪽이 서로 다른 안전 신호를 잡는다.** 어느 한쪽만으로는 부족.

## 4. 핵심 교훈
### ★ "레티놀 추천하지 않는 이유 알려줘"
- keyword: 레티놀 = high risk → **safety_first** (보수적·안전).
- semantic: *설명 요청*으로 해석 → **answer_then_clarify** (덜 보수적).
- 실제 출력은 keyword(safety_first) 따름 → 이번엔 **keyword의 safety floor가 더 안전**.
- **결론: 01B에서 semantic을 intent authoritative로 올려도, semantic이 safety를 *낮추면 안 된다*.** 안 그러면 이 케이스에서 caution이 내려가는 회귀.

### ★★ 그러나 그 역도 참 (case 4) — 그래서 safety = MAX
- "이거 계속 써도 되나"에선 **semantic이 keyword가 놓친 안전 우려를 잡았다**.
- 따라서 단순히 "keyword safety 우선"이 아니라 — **safety floor = MAX(keyword risk, semantic risk), fail-closed union**.
- *keyword와 semantic 중 더 보수적인 안전 신호를 채택*해야 둘 다의 사각을 덮는다. shadow가 없었으면 못 봤을 양방향 함정.

## 5. ROUTING-MISSION-01B 설계 원칙
- **intent/strategy = semantic primary로 승격 가능** (shadow 데이터가 정당화: 5/7에서 semantic이 keyword 사각을 덮음).
- `_classify_intent` = **fallback/prefilter로 강등** (semantic 실패·low confidence 시).
- `_kw_risk` = **safety fail-closed prefilter로 유지**.
- **semantic은 `safety_gate_result`를 낮출 수 없다** (레티놀 교훈). safety는 항상 fail-closed.
- semantic은 **products 생성 금지** · **final answer 작성 금지**.
- semantic **실패/low confidence → keyword fallback 또는 clarify**.
- **safety conflict → safety 우선** (그리고 safety = keyword·semantic의 MAX).

## 6. 01B 전에 반드시 설계할 conflict policy
| 항목 | 설계 필요 사항 |
|---|---|
| **safety floor precedence** | safety_gate = MAX(keyword risk, semantic risk) fail-closed. semantic은 *올릴 수만* 있고 *내릴 수 없음*. (레티놀=keyword가 올림 / case4=semantic이 올림) |
| **semantic confidence threshold** | conf ≥ T → semantic intent 채택 / conf < T → keyword fallback or clarify. T 값은 shadow 데이터(0.7~0.85 분포)로 보정. |
| **semantic `cannot_determine` 처리** | semantic이 cannot_determine → keyword 사용 or clarify_first. (드물 것 — 표에선 keyword가 cannot_determine, semantic은 다 분류) |
| **keyword high risk vs semantic non-safety conflict** | ★레티놀 케이스 — keyword risk=high면 semantic이 non-safety로 봐도 **safety_first 유지**(safety floor). |
| **semantic recommendation vs safety/troubleshooting conflict** | semantic=추천인데 risk high/avoid suppress → recommend 금지·safety_first/보수 처리. |
| **semantic product intent but no products / avoid suppression** | semantic=제품의도라도 recommended_products=0 또는 avoid 억제 → 제품명 생성 0·기준/확인질문(02B 규칙 유지). |
| **fallback to keyword/clarify 기준** | semantic 호출 실패 → keyword(현행) · low confidence → clarify · enum 이탈 → 보수 매핑. |

→ **01B는 위 conflict policy를 *먼저 설계*한 뒤 authoritative 승격.** policy 없이 바로 전환하면 레티놀류 safety 회귀 위험.

---

## 한계 / 주의
- 이 문서는 **계측 결과 + 01B 설계 근거** — 구현 지시 아님. 01B는 별도 승인.
- golden 21·회귀 8·adversarial 180 수치는 control 보고값이며, *shadow가 write-only(출력 불변 구조 보장)* 라 정합.
- 코드 수정 0 · commit 0 · push 0 · SIASIU/Foundation/foundation-control 무수정.
