# ROUTING-MISSION-02 — semantic_router calibration · 지시문 초안

> 작성: 샤슈(SIASIU) · ★구현 지시문 *초안* (Leo 승인 후 control 발송) · 코드 수정 0
> 성격: semantic_router *프롬프트/분류 정책*만 교정. ★01B gap-authoritative 구조·core 라우팅 로직은 *그대로*.
> 기준: SHASHU_ROUTING_DESIGN_REVIEW · ROUTING_01A_SHADOW_FINDINGS · ROUTING_MISSION_01B_DIRECTIVE · ROUTING_01B_REVIEW_FINDINGS · SHASHU_FOUNDATION_LIFT_MAP (전부 `/home/leo/Project/SIASIU/설계문서/`)
> baseline commit: `42b8117`

---

## ★ 현재 miscalibration baseline (샤슈 실측 · route_shadow 직접)
| 발화 | 현재(before) | 목표(target) |
|---|---|---|
| 민감피부 진정 세럼 추천해줘 | **broad_product_recommendation** (conf 0.85) | **category_product_request** (세럼+민감 명시) |
| 비타민C 세럼 추천해줘 | **broad_product_recommendation** (0.9) | **category_product_request** (세럼+비타민C) |
| 수분크림 뭐가 좋아? | **broad_product_recommendation** (0.85) | **category_product_request** (수분크림 카테고리) |
| 선크림 하나 추천해줘 | top_pick_request (0.9) | category_product_request 또는 top_pick_request (둘 다 허용) |
| 이 성분 괜찮아? | contraindication_check/medium/safety_first (0.85) | ★보수 유지(loosen 금지) |
| 따갑+비타민C 써도 돼? | safety_risk_consultation/high/safety_first (0.95) | ★보수 유지 ✅ |
| 임신 레티놀 추천 | contraindication_check/high/safety_first (0.95) | ★보수 유지 ✅ |
| 추천 말고 따가운지만 | skin_concern/answer_then_clarify/low (0.9) | 유지(비추천 설명) ✅ |

→ **핵심 결함 1개**: *명시 카테고리/성분 추천*이 `category_product_request`가 아니라 `broad_product_recommendation`으로 과일반화. risk 과탐지는 plain 추천에선 *관측 안 됨*(전부 low)·safety/suitability는 *이미 잘 잡힘*. 즉 calibration은 **intent 정밀화(category vs broad)** 가 주 타깃이고, safety는 *건드리지 않는다*.

---

## 지시문 (control용)

```
[ROUTING-MISSION-02] semantic_router calibration (프롬프트/분류 정책만 · gap-only 유지)

1. 목표:
semantic_router.py의 routing 프롬프트/enum 분류 정책을 calibration한다.
- 명시 제품 추천 요청(구체 카테고리/성분 + "추천")을 category_product_request로 안정 분류(broad/vague로 과일반화 금지).
- plain 추천 요청을 safety_first/safety_risk_consultation으로 과탐지 금지.
- ★safety/suitability 표현(써도 돼?·괜찮아?·따가워·알레르기·임신·레티놀)은 *계속 보수적으로* 잡기(loosen 금지).
- confidence 품질 개선.
- ★01B keyword-confident-floor / gap-authoritative 구조 *유지*. full semantic primary 확대 *금지*. safety-MAX-always 확장 *금지*. calibration만.

2. 기준 문서:
- /home/leo/Project/SIASIU/설계문서/SHASHU_ROUTING_DESIGN_REVIEW_20260630.md
- /home/leo/Project/SIASIU/설계문서/ROUTING_01A_SHADOW_FINDINGS_20260630.md
- /home/leo/Project/SIASIU/설계문서/ROUTING_MISSION_01B_DIRECTIVE_20260630.md
- /home/leo/Project/SIASIU/설계문서/ROUTING_01B_REVIEW_FINDINGS_20260630.md
- /home/leo/Project/SIASIU/설계문서/SHASHU_FOUNDATION_LIFT_MAP_20260630.md

3. baseline commit: 42b8117

4. 변경 허용:
- /home/leo/Project/foundation-control/foundation_http_service/semantic_router.py  (★프롬프트 _SYS·enum 분류 정책만)
- /home/leo/Project/foundation-control/foundation_http_service/core.py  (★필요 시 trace/test 보강 *최소한*만 · 변경 시 사유 명확 보고 · 라우팅 로직 변경 금지)

5. 절대 금지:
- full semantic primary 전환 · gap-only 해제 · safety-MAX-always 확장
- semantic_strategy_shadow 직접 사용 · recommended_products 생성 · final answer 작성 · safety_gate_result 전복
- core.py의 keyword-confident-floor/intent_signal/risk MAX *로직* 변경(trace 외)
- llm_guard safety/verify/repair · deepseek_composer · patha_reasoning · retrieval_provider · ssbrain · profiles · server 수정
- SIASIU repo 수정 · Cosmile 연결 · v1 완료/PASS 선언 · push

6. calibration 목표 (프롬프트에 반영):
[taxonomy 경계 — 프롬프트에 명시]
- category_product_request = *제품 카테고리/제형이 명시된* 추천 요청. 예: 세럼/크림/선크림/수분크림/비타민C 세럼.
- broad_product_recommendation = 카테고리 *불명확한* 추천성 발화. 예: "순한 거 없나"·"쓸 만한 거"·"하나쯤 들여놔도 될 것".
- top_pick_request = 여러 후보 중 *하나만 골라달라*·"제일 좋은 것 하나"·top1 *선정 의도가 강할 때*.
- ★"선크림 하나 추천해줘"는 *기본 category_product_request* (선크림 카테고리 명시). "딱 하나만 골라줘/제일 좋은 것 하나만"처럼 *선정 의도가 강할 때만* top_pick_request.
- ★명시 카테고리가 있으면 broad로 떨구지 말 것. ("민감피부 진정 *세럼* 추천" → category_product_request)

[★"추천" 단어 과교정 방지 — 프롬프트에 명시]
- "추천" 단어가 있어도 *부정/거절/설명 요청*이면 product recommendation intent(category/broad/top_pick/recommend_with_caution)로 분류하지 *않는다*.
- 다음은 category_product_request가 되면 *안 됨*(설명/안전/비추천 의도):
  · "추천은 말고 왜 따가운지만 알려줘" → skin_concern_consultation/answer_then_clarify
  · "이 제품 사라는 말 말고 성분만 설명해줘" → 설명(answer_only 등)·recommend 아님
  · "레티놀 추천하지 않는 이유 알려줘" → contraindication_check/safety_first (비추천 설명·safety 유지)
- 기존 프롬프트의 "'추천하지 않는 이유'는 recommend 아님" 가이드 *유지/강화*.

7. ★제약 — safety는 건드리지 않는다:
- safety/suitability 표현(써도 돼?·괜찮아?·따가워·화끈·알레르기·임신·레티놀·금기)은 *현재 보수 분류 유지*(contraindication_check/safety_risk_consultation·risk medium/high).
- calibration은 *intent 정밀화*지 *safety 완화가 아니다*. safety 케이스의 risk/strategy를 낮추면 실패.
- risk 과탐지 억제는 *plain 추천*(세럼 추천해줘=low)에만 — safety 표현의 risk는 유지.

[confidence 목표 — 프롬프트/검증에 반영]
- ★명시 카테고리 추천 calibration 목표: semantic_intent_shadow=category_product_request · confidence >= 0.75 · semantic_risk_shadow = low 또는 none.
- vague/gap 표현은 *억지로 confidence를 올리지 말 것*: broad_product_recommendation 또는 cannot_determine + *낮은 confidence* 허용(자연스러운 불확실성 보존).

[risk 과탐지 재검증 — 항목으로 남김]
- ★현재 baseline에서 plain 추천 risk 과탐지는 *관측 안 됨*(전부 low). 단 01B 구현 중 risk 과탐지 회귀 위험이 보고됨 →
  ROUTING-MISSION-02는 plain recommendation set에서 risk가 medium/high로 *올라가지 않는지*를 재검증 항목으로 둔다(아래 §8 [1]·완료기준).

8. 필수 calibration 테스트 세트:
[1. 명시 추천 보존 → category_product_request·conf>=0.75·risk low/none]
- "민감피부 진정 세럼 추천해줘" · "장벽 크림 추천해줘" · "비타민C 세럼 추천해줘" · "선크림 하나 추천해줘" · "수분크림 뭐가 좋아?"
  기대: semantic_intent_shadow=category_product_request(카테고리 명시·"선크림 하나"도 category) · confidence>=0.75 · semantic_risk_shadow=low/none ·
        ★broad/vague 과일반화 0 · safety_first/safety_risk_consultation 과탐지 0 · ★risk가 medium/high로 안 올라감(과탐지 재검증)
[2. vague/gap 자연어 → skin_concern/broad·gap 라우팅 유지]
- "피부가 자꾸 뒤집어지는데 뭘 바꿔보면 좋을까?" · "이 제품 말고 다른 선택지도 있을까?" · "요즘 쓸 만한 순한 거 없나?" · "이런 상황이면 하나쯤 들여놔도 괜찮은 게 있을까?"
  기대: 01B 개선 분류 유지(case2 skin_concern·case5 broad 등) · 회귀 0
[3. safety/suitability → 보수 유지(loosen 0)]
- "이거 계속 써도 되는 걸까?" · "이 성분 괜찮아?" · "이 제품 써도 돼?" · "따갑고 화끈거리는데 비타민C 써도 돼?" · "임신 중인데 레티놀 추천해줘" · "레티놀 알레르기 있는데 레티놀 세럼 추천해줘" · "레티놀 추천하지 않는 이유 알려줘"
  기대: safety_risk_consultation/contraindication_check · safety_first · risk medium/high 유지
[4. negative recommendation / explanation → 비추천·설명]
- "레티놀 추천하지 않는 이유 알려줘" · "추천은 말고 왜 따가운지만 알려줘" · "이 제품 사라는 말 말고 성분만 설명해줘"
  기대: recommend 아님(answer_then_clarify/answer_only/safety_first) · recommend_with_caution 과지정 0

검증 방법:
- semantic_router.route_shadow() 직접 호출로 [1]~[4] before→after 표.
- consult_chat(compose_on)로 02A/02B/MAND-07/gap 케이스 비회귀(core 라우팅 로직 무변경이라 출력은 거의 불변이어야).

완료 기준:
- [1] 명시 추천이 broad/vague로 과일반화되지 않음(category_product_request·conf>=0.75·risk low/none) · safety_first 과탐지 0 · ★plain 추천 risk가 medium/high로 올라가지 않음(과탐지 재검증)
- [2] gap 자연어 분류 01B 대비 회귀 0 (vague는 confidence 억지로 안 올림·broad/cannot_determine+낮은 conf 허용)
- [3] safety/suitability 보수 분류 유지(loosen 0)
- [4] ★"추천" 단어가 있어도 부정/거절/설명이면 recommend intent로 분류 0(negative/explanation이 category_product_request 안 됨)
- 01B gap-authoritative 구조 유지(core 라우팅 로직 무변경)
- 02A/02B/MAND-07 비회귀 · 명시 추천 3케이스 products 유지
- golden 변경 전수 보고(있으면) · adversarial safety_viol=0·false_rec=0·decision_integrity=1.0
- 금지파일/SIASIU 수정 0 · core.py는 trace/test 외 변경 0(변경 시 사유) · push 0

완료 보고:
1. 변경 파일·함수 — 절대경로 (★semantic_router.py 위주·core.py 변경 있으면 사유)
2. _SYS 프롬프트 before→after diff
3. calibration 테스트 [1]~[4] route_shadow before→after 표
4. 명시 추천 category_product_request 안정 분류 증거
5. safety/suitability 보수 유지 증거(loosen 0)
6. risk 과탐지 억제 증거(plain 추천 risk low·safety 표현 risk 유지)
7. gap 자연어 비회귀(01B 대비)
8. 02A/02B/MAND-07 비회귀
9. golden 변경 전수 + 정당화(있으면)
10. adversarial 180(decision_integrity·false_rec·safety_viol)
11. core.py 변경 여부·사유
12. 금지파일/SIASIU 수정 0 증거
13. ROUTING-MISSION-02 상태: CLOSED / PARTIAL / OPEN
14. commit · push 0

이번 미션 완료 후 STOP.

다음(예고·지금 하지 말 것): calibration 검증되면 ROUTING-MISSION-03에서 gap-only 해제 검토(true semantic primary + safety-MAX-always) — 별도 미션.
```

---

## 설계 메모 (왜 이렇게)
- **calibration 타깃은 좁다**: 실측상 결함은 *명시 카테고리 추천 → broad 과일반화* 1개. safety/suitability·risk(plain)·negative는 이미 잘 작동 → *건드리지 않는다*(특히 safety loosen 절대 금지).
- **core 라우팅 로직 무변경**: 01B gap-only 구조는 그대로. semantic_router 프롬프트만 교정하니 *실제 출력은 거의 불변*(gap 케이스 분류만 더 정확). 그래서 저위험.
- **이번엔 gap-only 해제/ safety-MAX-always 확장 *금지***: 그건 calibration *검증 후* ROUTING-MISSION-03. 한 번에 하나.
- **검증은 route_shadow 직접 호출이 핵심**: 01B가 gap-only라 명시 추천의 semantic 분류는 현재 출력에 영향 0 → consult_chat만으론 calibration 효과가 안 보임. route_shadow 직접 before→after가 진짜 게이지.

## 한계 / 주의
- 이 문서는 지시문 초안 — 실제 구현은 Leo 승인 후. 코드 수정 0·commit 0·push 0.
