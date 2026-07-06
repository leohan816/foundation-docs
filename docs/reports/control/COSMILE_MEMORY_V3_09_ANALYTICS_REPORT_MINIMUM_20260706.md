# COSMILE MEMORY V3 — 09 Analytics Report Minimum (설계서)

> 작성: foundation-control · 2026-07-06 · design-only · no code · Hard Stop 무접촉

> depends_on: [COSMILE_MEMORY_V3_DATA_DICTIONARY_CANONICAL_20260706.md, COSMILE_MEMORY_V3_03_RECOMMENDATION_EVENT_CONTRACT_20260706.md, COSMILE_MEMORY_V3_04_ORDER_REVENUE_FEEDBACK_OUTCOME_CONTRACT_20260706.md, COSMILE_MEMORY_V3_05_PRODUCT_INGREDIENT_INTELLIGENCE_MAPPING_20260706.md, COSMILE_MEMORY_V3_06_MEMORY_FACT_CANDIDATE_PROMOTION_RULES_20260706.md, COSMILE_MEMORY_V3_07_SAFETY_ADVERSE_REACTION_GUARDRAIL_20260706.md, COSMILE_MEMORY_V3_08_DB_INTEGRATION_INVARIANT_DESIGN_20260706.md] · owns: [Metric Registry(최소 지표·safety 지표 포함) · CLI/Markdown 리포트 형식 · small-cell 억제/집계 프라이버시 규칙] · referenced_by: [COSMILE_MEMORY_V3_10_PRE_IMPLEMENTATION_REVIEW_PLAN_20260706.md, COSMILE_MEMORY_V3_00_INDEX_AND_EXECUTIVE_SUMMARY_20260706.md]

이 문서는 COSMILE MEMORY V3 "Learning Commerce Memory Loop"의 **최소 분석 리포트(Analytics Report Minimum)** 설계다.
목적은 V3 target loop —
`상담 결과 → 추천 이유 → 추천 상품 → 상품/SKU/성분 → product_view/add_to_cart/checkout/order → 매출/마진 → 만족/이상반응/재구매 → MemoryFactCandidate → evidence/confidence 장기기억 승격 → 다음 추천 개선` —
이 **실제로 학습 가능한 구조로 관측되는지**를, 프로덕션이 아닌 **schema/validate 수준**에서 재현 가능한 리포트로 뽑아내는 것이다.

핵심 선언 3줄:

1. **첫 산출물은 대시보드가 아니라 CLI/Markdown 리포트다.** Slack / 대시보드 / AI-Analyst는 **나중 · 별도 release train**. 대시보드로 시작하지 않는다.
2. **읽기 전용 · service-local.** 이 리포트는 Cosmile service-local(postgres schema `cosmile`) 이벤트/커머스 테이블만 집계한다. Foundation을 durable memory DB로 읽지 않는다.
3. **안전 우선.** adverse_reaction(이상반응) 지표는 매출·마진·CTR과 **동렬 KPI가 아니라 상위 게이트 지표**로 다룬다. "이상반응이 적어 보이게" 최적화하지 않는다.

형제 문서 상호참조 (실제 파일명):

- `COSMILE_MEMORY_V3_00_INDEX_AND_EXECUTIVE_SUMMARY_20260706.md` — V3 target loop 전체 그림·범위
- `COSMILE_MEMORY_V3_DATA_DICTIONARY_CANONICAL_20260706.md` — enum/key/window/threshold **유일 정본(이하 "사전")** — 본 문서는 값 목록을 재선언하지 않는다
- `COSMILE_MEMORY_V3_03_RECOMMENDATION_EVENT_CONTRACT_20260706.md` — RecommendationEvent(노출·클릭·장바구니 등 얕은 상호작용) 계약 — 본 리포트 **입력 소스 1(읽기 전용)**
- `COSMILE_MEMORY_V3_04_ORDER_REVENUE_FEEDBACK_OUTCOME_CONTRACT_20260706.md` — rec_outcome_event/rec_outcome_feedback(checkout 이후 결과) 계약 — 본 리포트 **입력 소스 2(읽기 전용)**
- `COSMILE_MEMORY_V3_05_PRODUCT_INGREDIENT_INTELLIGENCE_MAPPING_20260706.md` — product→ingredient 매핑(M12 입력)
- `COSMILE_MEMORY_V3_06_MEMORY_FACT_CANDIDATE_PROMOTION_RULES_20260706.md` — Candidate → ltm_fact 승격 기준
- `COSMILE_MEMORY_V3_07_SAFETY_ADVERSE_REACTION_GUARDRAIL_20260706.md` — 안전/이상반응 우선순위 규칙·suppression 규칙(R3)
- `COSMILE_MEMORY_V3_08_DB_INTEGRATION_INVARIANT_DESIGN_20260706.md` — DB invariant / schema-validate 수준 정의

> (구 "번호 고정 ★Leo 결정 필요" 및 임시 접미사 목록은 해소 — 위가 실제 파일명. 식별자 규칙의 정본은 사전 §1.)

---

## 1. 범위 / 비범위

### 1.1 In-scope (이 설계서가 정의)

- V3 loop 관측을 위한 **최소 지표 집합(Metric Registry)** 정의.
- 각 지표별 **최소 쿼리 입력**(어떤 이벤트/테이블을, 어떤 grain·window·filter로).
- **CLI/Markdown 리포트** 산출 형식(레이아웃, 섹션 순서, 안전 지표 배치).
- 귀속(attribution) 모델·window의 후보와 결정 필요 지점.
- 프라이버시/데이터 최소화(집계 전용, PII 무접촉, small-cell 억제).

### 1.2 Out-of-scope (이 설계서가 하지 않음 · Hard Stop)

- 프로덕션 DB 접근 · real secret/Vault · main merge · live 활성화 · external release · prod DB migration.
- 실시간 스트리밍 파이프라인, 대시보드 서버, Slack 봇, AI-Analyst 자동 코멘트 — **모두 later/separate**.
- Foundation의 durable customer memory DB화 · Foundation의 서비스 DB 직접 read.
- 실제 매출/마진 확정 회계 처리(정산·환불·세금 반영). 본 리포트의 revenue/margin은 **관측용 근사치**이며 회계 정본이 아니다.
- 코드/구현. 본 문서는 **design + contract + reviewable plan**만 제공한다.

> 현재 상태: Cosmile postgres는 **schema/validate 수준**이다. "real DB integration complete" 아님. 본 리포트의 쿼리는 schema/validate 수준 테이블 및 synthetic/readiness fixture에 대해 정의된다.

---

## 2. 데이터 소스 모델 (service-local, schema `cosmile`)

리포트는 아래 계약 소스만 입력으로 삼는다. 모두 **Cosmile 소유**. 교차 스키마 직접 참조(예: `siasiu.*` 직접 join) 금지 — 상담 맥락은 이벤트에 이미 최소화되어 실려 온다고 가정한다(`COSMILE_MEMORY_V3_03_RECOMMENDATION_EVENT_CONTRACT_20260706.md` 계약).

### 2.1 입력 소스 (읽기 전용 — 자체 이벤트 테이블 선언 없음)

**R-K7(사전 §1.3) 상속:** 얕은 상호작용(impression/click/add_to_cart)의 **저장 소유 = V3-03 RecommendationEvent 단일**, checkout 이후 결과(stage ≥ order)의 소유 = **V3-04**(rec_outcome_event·rec_outcome_feedback). **본 문서(V3-09)는 두 소스를 읽기만 한다** — 구 §2.1의 자체 이벤트 테이블 인벤토리(`rec_impression`/`rec_click`/`product_view`/`add_to_cart`/`checkout_started`/`order`/`order_line`/`feedback` 논리 테이블 선언)는 **superseded — 사전 §1.3 R-K7**(자체 이벤트 테이블 정의 금지).

| 입력 소스 | 소유 계약 | 본 리포트가 읽는 계약 필드(사전 §1·§2) |
|---|---|---|
| RecommendationEvent | V3-03 | `recommendation_id`(`rec_v3_`+ULID — 사전 §1.1), `subject_ref XOR anonymous_ref`, `session_id`, `product_id`[, `sku_id`], `reason_codes[]`(사전 §2.15), `decision_type`, `evidence_mode`, `safety_gate_result`, 노출/클릭/장바구니 stage |
| rec_outcome_event | V3-04 | `recommendation_id`(NULLABLE — 사전 R-K1), `attribution_mode`(사전 §2.9), `order_id`, `order_item_id`, `product_id`, `sku_id`, paid/refund 이벤트(`refund_qty`·`refund_amount_band` — 사전 R-K4), `net_outcome_value_band`, `margin_band`(사전 §2.14) |
| rec_outcome_feedback | V3-04 | `feedback_id`, `order_item_id`[, `recommendation_id`], `feedback_type`(사전 §2.11), `semantic_label`(사전 §2.12), `adverse_severity`(사전 §2.4), `adverse_certainty`(사전 §2.5) |
| product→ingredient 매핑 | V3-05 | `product_id` → ingredient (M12 입력) |
| repurchase 파생 뷰 | (본 문서 — 파생 정의만·저장 신설 없음) | rec_outcome_event(paid)에서 동일 `product_id` 재구매(사전 R-K5) — 물리 테이블 아님 |

> 컬럼 정본 = V3-03/V3-04 계약 + 사전. 본 문서는 그 계약을 "이렇게 집계 가능해야 한다"는 관점에서 요구할 뿐이다.

### 2.2 조인 키 규칙 (정본 = 사전 §1)

- 추천 → 커머스 귀속의 **1차 키는 `recommendation_id`**(명시 귀속·`rec_outcome_event.recommendation_id`는 NULLABLE — 사전 R-K1). 귀속 방식은 `attribution_mode`(사전 §2.9: `direct`/`session`/`organic`/`unattributed`/`unknown`)로 구분한다.
- (구 규칙 superseded — 사전 §1.3 R-K2) `src_recommendation_id` 필드명과 "furef+sku last-touch fallback"은 사전 정본으로 대체: 명시 링크 = `direct`, 동일 세션 내 SKU 일치 fallback = `session`.
- 집계 grain 식별자: `subject_ref XOR anonymous_ref`(사전 §1.1·R-K3 — anonymous 여정도 downstream까지 유지). 구 `furef` grain은 superseded — 사전 §1.1 (furef는 V1 SubjectRefMap identity 층 전용·commerce event/analytics 키 아님).

---

## 3. 열거형 (Enums — 값 정본은 사전·본 문서는 참조만)

### 3.1 outcome (추천 결과 단계 — 리포트 축)

`shown` → `clicked` → `viewed` → `added_to_cart` → `checkout_started` → `order_paid` → (`satisfied` | `adverse` | `repurchased`)

리포트의 top-reason 분해는 이 outcome 축을 기준으로 한다. stage 소유: `order_paid` 이전 = V3-03, 이후 = V3-04(사전 R-K7).

### 3.2 order/refund 상태 (정본 = V3-04)

주문/환불 상태와 부분 환불 표현의 정본은 V3-04다 — 특히 환불/취소는 주문 전체 status가 아니라 **order_item 단위 refund 이벤트**(`refund_qty`·`refund_amount_band`)로 기록하고 net_outcome을 라인 단위 재계산한다(사전 §1.3 R-K4).
본 리포트의 포함 규칙: **paid 귀속 라인만** 커머스 집계에 포함, refund는 별도 라인으로 병기하고 `net_outcome_value_band` 재계산에 반영한다. (구 §3.2 order.status 표의 "refunded 제외 또는 음수 조정" 초안은 superseded — 사전 R-K4.)

### 3.3 feedback (정본 = 사전 §2.11/§2.12/§2.4/§2.5)

- `feedback_type` = 사전 §2.11: `satisfaction_score`(1–5) · `adverse_report` · `repurchase` · `refund_return` · `cs_contact` · `review_semantic`. (구 `satisfaction/dissatisfaction/adverse_reaction/neutral/unknown` 초안은 superseded — 사전 §2.11.)
- 만족/불만/안전 라벨 = `semantic_label`(사전 §2.12: `satisfied`·`dissatisfied`·`neutral`·`adverse_skin_reaction`·`adverse_other`·`usage_question_safety`·`usage_question_general`·`repurchase_intent`·`avoid_intent`·`unclear`).
- `adverse_severity` = 사전 §2.4: `low` · `moderate` · `severe` 3값 유일. (구 `mild`≡`low`·`unknown`은 severity 값이 아니라 `low` 기록 + `adverse_certainty=reported` + 재평가 대기 — superseded — 사전 §2.4.) `adverse_certainty` = 사전 §2.5.

### 3.4 reason_code 집계 카테고리 (정본 = 사전 §2.15)

`skin_type_match` · `concern_match` · `ingredient_match` · `avoid_conflict_none` · `safety_filtered` · `repurchase_cycle` · `seasonal_match` · `consultation_derived` — 확장은 사전 개정으로만. (구 예시 목록의 `avoid_ingredient_respected`·`price_fit`·`safety_hold`·`insufficient_evidence` 등은 superseded — 사전 §2.15.) 리포트는 **코드를 해석하지 않고 그대로 group-by**만 한다(휴리스틱 재분류 금지).

---

## 4. 귀속(Attribution) 모델

window 파라미터의 정본 = **사전 §4(★Leo 확정 파라미터 단일 표)** — 본 문서는 재선언하지 않는다.

| 항목 | 정본 |
|---|---|
| 귀속 방식 | 명시 `recommendation_id`(=`direct`) 우선 → 동일 세션 SKU 일치 fallback(=`session`) → 그 외 `organic`/`unattributed`/`unknown` (사전 §2.9 R-K2) |
| attribution window | **14d** — 사전 §4 (구 7d 초안은 superseded — 사전 §4) |
| 재구매 판정 window | **90d** · 동일 `product_id` 기준(sku 변형 무관 — 사전 R-K5) (구 60d 초안은 superseded — 사전 §4) |
| refund 처리 | order_item 단위 refund 이벤트 + `net_outcome_value_band` 재계산(사전 R-K4) — 리포트는 refund 라인 병기 |
| 다중 추천 중복 귀속 | **last-touch 단일 귀속** 제안 유지(사전 미소유 — ★Leo 결정 필요). 단 하나의 rec_id가 여러 order_item 라인에 귀속되는 1:N은 허용(사전 R-K6) |

리포트는 사용한 attribution 설정을 **헤더에 그대로 print**한다(재현성). 설정을 바꾸면 리포트 수치가 바뀐다는 사실을 숨기지 않는다.

---

## 5. Metric Registry (최소 지표)

각 지표: 정의 · 공식 · 최소 쿼리 입력(테이블/이벤트) · grain · window · 안전등급.
안전등급 `S` = 안전 우선 지표(억제·최적화 대상 아님), `C` = 커머스 지표, `L` = 학습 신호 지표.

| # | metric_id | 정의 | 공식 | 최소 쿼리 입력 (§2.1 소스만) | grain | 안전등급 |
|---|---|---|---|---|---|---|
| M1 | `recommendation_shown` | 추천 노출 수 | `count(RecommendationEvent 노출 stage)` | RecommendationEvent(V3-03) | recommendation | C |
| M2 | `recommendation_clicked` | 추천 클릭 수 | `count(distinct recommendation_id, 클릭 stage)` | RecommendationEvent(V3-03) | recommendation | C |
| M3 | `recommendation_ctr` | 클릭률 | `M2 / M1` | RecommendationEvent(V3-03) | 전체/세그먼트 | C |
| M4 | `rec_to_add_to_cart` | 추천→장바구니 전환 | `count(장바구니 stage) / M1` | RecommendationEvent(V3-03) | recommendation | C |
| M5 | `rec_to_order_paid` | 추천→결제완료 전환 | `count(귀속 paid — attribution_mode ∈ {direct, session}) / M1` | RecommendationEvent, rec_outcome_event(V3-04) | recommendation | C |
| M6 | `recommendation_outcome_value` | 추천 귀속 결과 가치 분포 | `net_outcome_value_band` 분포(paid & 귀속) — 금액 합계 아님 | rec_outcome_event(V3-04) | 전체/reason_code | C |
| M7 | `recommendation_margin_band` | 추천 귀속 마진 밴드 분포 | `margin_band`(사전 §2.14: low/medium/high) 분포 + `margin_coverage`(%) 병기 — 구 `gross_margin` 금액 합산은 superseded — 사전 §6 | rec_outcome_event(V3-04) | 전체/reason_code | C |
| M8 | `satisfaction_feedback_count` | 만족 피드백 수 | `count(rec_outcome_feedback where semantic_label=satisfied)` (+ `satisfaction_score` 분포) | rec_outcome_feedback(V3-04) | 전체/product_id | L |
| M9 | `adverse_feedback_count` | **이상반응 피드백 수** | `count(feedback_type=adverse_report OR semantic_label ∈ {adverse_skin_reaction, adverse_other})` (+ `adverse_severity`·`adverse_certainty` 분해 — 사전 §2.4/§2.5) | rec_outcome_feedback(V3-04) | 전체/product_id/severity | **S** |
| M10 | `repurchase_count` | 재구매 수 | `count(동일 product_id 재구매, interval ≤ 90d — 사전 §4·R-K5)` | rec_outcome_event(paid)→repurchase 파생 | subject_key/product_id | L |
| M11 | `top_reason_codes_by_outcome` | outcome별 상위 reason_code | `group by reason_code(사전 §2.15), outcome; count` | RecommendationEvent.reason_codes[] × outcome join | reason_code×outcome | L |
| M12 | `ingredient_response_signals` | 성분별 반응 신호 | 성분 축에서 만족/이상반응/재구매 분포 | V3-05 product→ingredient 매핑 × rec_outcome_feedback × repurchase 파생 | ingredient | **S/L** |
| M13 | `adverse_reaction_rate` | **이상반응 발생률** | `M9 / 귀속 paid 주문 수`(주 분모) — **노출 수(M1) 분모 병기** | rec_outcome_feedback, rec_outcome_event | 전체/product_id/기간 | **S** |
| M14 | `safety_suppression_effectiveness` | **suppression 효과 검증** | suppress 대상(`safety_frozen`/`safety_block` target — 사전 §2.13)의 **재노출 count = 0** 확인 | safety suppression 목록(V3-07) × RecommendationEvent | subject_key×target | **S** |
| M15 | `safety_block_zero_exposure` | **R3 불변식 검증(block ⇒ 노출 0)** | `count(노출 stage where safety_gate_result=block)` = **0** | RecommendationEvent | 전체/기간 | **S** |

### 5.1 지표별 최소 쿼리 입력 상세

- **M1 recommendation_shown** — 입력: RecommendationEvent 노출 stage(V3-03). 필터: 리포트 기간. 중복 노출 정책(동일 rec 재노출 카운트 여부)은 ★Leo 결정 필요(기본: 노출 이벤트 그대로 카운트).
- **M2 recommendation_clicked** — 입력: RecommendationEvent 클릭 stage(orphan click 제외). distinct `recommendation_id`.
- **M3 CTR** — M2/M1. 분모 0 방어(표시 `n/a`). 세그먼트: reason_code, decision_type, safety_gate_result별 분해 옵션.
- **M4 rec→add_to_cart** — 입력: RecommendationEvent 장바구니 stage. 분모 M1. 장바구니는 노출보다 뒤(timestamp 순서).
- **M5 rec→order_paid** — 입력: rec_outcome_event(paid & `attribution_mode ∈ {direct, session}`). 분모 M1. paid ≥ shown & attribution window(14d — 사전 §4) 내.
- **M6 outcome_value** — 입력: rec_outcome_event.`net_outcome_value_band` where paid & 귀속 & window. **밴드 분포만** — 정확 금액 합산(구 `line_revenue` 합계)은 superseded — 사전 §6(정확 실매가/원가 저장 금지·V3-05 Hard Stop 유지). currency 혼합 시 통화별 분리(환산 금지 — ★Leo 결정 필요: 기준통화·환율 소스).
- **M7 margin_band** — 입력: rec_outcome_event.`margin_band`(사전 §2.14). `margin_band` 분포 + `margin_coverage%`(밴드 판정 가능 라인 비율) 병기. 밴드 미상 라인은 분포에서 제외하고 coverage로 정직하게 드러낸다 — 구 `gross_margin`=Σ(revenue−cost) 금액 지표는 superseded — 사전 §6.
- **M8 satisfaction_count** — 입력: rec_outcome_feedback where `semantic_label=satisfied`(사전 §2.12) + `satisfaction_score`(1–5) 분포. product_id/기간 group.
- **M9 adverse_count** — 입력: rec_outcome_feedback where `feedback_type=adverse_report` OR `semantic_label ∈ {adverse_skin_reaction, adverse_other}`. `adverse_severity`(low/moderate/severe — 사전 §2.4)·`adverse_certainty`(사전 §2.5) 분해 필수. **이 지표는 0이 아니면 리포트 최상단 SAFETY 섹션에 강조**. 낮게 보이게 하는 필터·반올림·집계 은닉 금지.
- **M10 repurchase_count** — 입력: rec_outcome_event(paid)에서 동일 `subject_key` + 동일 **`product_id`**(sku 변형 무관 — 사전 R-K5) 2회 이상, interval ≤ 90d(사전 §4). 파생 규칙은 본 절로 고정(저장 신설 없음).
- **M11 top_reason_codes_by_outcome** — 입력: RecommendationEvent.`reason_codes[]`(배열 unnest·값 집합 = 사전 §2.15) × 각 outcome 도달 집합. outcome축(§3.1)마다 상위 N reason_code. reason_code는 원본 그대로(재분류 금지).
- **M12 ingredient_response_signals** — 입력: product→ingredient 매핑(V3-05) × rec_outcome_feedback(satisfied/adverse) × repurchase 파생. 성분당 (긍정신호, adverse신호, 재구매) 카운트. **adverse가 붙은 성분은 안전 신호로 우선 표기**, "잘 팔리는 성분"으로만 요약하지 않는다.
- **M13 adverse_reaction_rate** — 공식: `M9 / 귀속 paid 주문 수`(주 분모 = attribution_mode ∈ {direct, session} & paid 주문 수). **노출 수(M1) 분모 버전을 반드시 병기**(분모 선택으로 rate가 달라짐을 숨기지 않는다). 기간/product 비교는 count(M9)가 아니라 rate(M13)로 한다 — count만으로는 노출/판매량 변화에 왜곡된다.
- **M14 safety_suppression_effectiveness** — 입력: V3-07 suppression 대상 목록(`safety_frozen`/`safety_block`이 걸린 (subject_key, target)) × RecommendationEvent. 검증: suppress 발효 시점 이후 해당 target의 **재노출 count = 0**. 0이 아니면 리포트 최상단 SAFETY 섹션에 위반으로 표기 + STOP 후보(은닉 금지). loop의 safety 측 검증 필요조건.
- **M15 safety_block_zero_exposure** — R3 불변식(block ⇒ 고객 노출 0) 검증: `safety_gate_result=block`인 추천의 노출 stage count = **0**. 0이 아니면 즉시 SAFETY 위반 보고.

> M12는 학습 loop의 핵심 신호(다음 추천 개선의 근거)지만, 성분-이상반응 상관을 **의학적 인과로 단정하지 않는다**. 리포트는 "신호(signal) count"만 제시하고 medical assertion을 만들지 않는다. Candidate→ltm_fact 승격은 단일 신호로 확정하지 않으며 그 기준은 `COSMILE_MEMORY_V3_06_MEMORY_FACT_CANDIDATE_PROMOTION_RULES_20260706.md` 소유(문턱 값은 사전 §3).

---

## 6. 리포트 출력 형식 (CLI / Markdown FIRST)

첫 구현 대상은 **단일 CLI 명령이 Markdown 리포트 1장을 stdout/파일로 출력**하는 형태. 대시보드·Slack·AI-Analyst는 이후 별도 train.

### 6.1 섹션 순서 (안전 우선 레이아웃)

```
# Cosmile Memory V3 — Analytics Report (period: <from>~<to>)
> mode: schema/validate · read-only · attribution=<direct+session, window=14d(사전 §4)> · generated_at=<ts>

## 0. SAFETY FIRST          ← adverse count(M9)·rate(M13, 분모 병기) · suppression 검증(M14) · R3 block⇒노출0(M15) · ingredient adverse 신호(M12) 최상단
## 1. Funnel                ← M1 shown → M2 clicked(CTR M3) → M4 cart → M5 order_paid
## 2. Commerce Outcome      ← M6 net_outcome_value_band 분포 · M7 margin_band 분포(+margin_coverage%)
## 3. Learning Signals      ← M8 satisfaction · M10 repurchase · M12 ingredient(비-adverse 부분)
## 4. Reason Code Breakdown ← M11 outcome별 top reason_codes
## 5. Data Coverage / Caveats ← 귀속 커버리지, margin_coverage, small-cell 억제, null 비율
```

- SAFETY FIRST를 **0번(맨 위)** 에 고정: 이상반응이 매출 지표 아래로 밀려 시야에서 사라지지 않게 한다.
- 5번 Data Coverage에 **정직 델타**를 명시: 귀속 실패 건수(attribution_mode=unattributed/unknown), margin_band 미상 라인 비율(margin_coverage), 억제된 small-cell 수, synthetic vs real fixture 여부.

### 6.2 표현 규칙

- 모든 비율은 분자/분모 동반 표기(`CTR 4.2% (84/2000)`). 비율만 단독 표기 금지.
- 데이터 부족 셀은 `n/a` + 사유. 0과 결측을 구분.
- 리포트 헤더에 attribution 설정·기간·mode를 항상 print(재현성).
- 이 리포트가 **학습/관측용이며 회계 정본·의학 판단이 아님**을 푸터에 고정 문구로 명시.

---

## 7. 프라이버시 / 데이터 최소화

- 리포트는 **집계 수치만** 산출한다. raw text · 상담 원문 · PII · 개별 order_id/customer id · raw subject_ref/anonymous_ref 값을 리포트에 싣지 않는다.
- subject_ref/anonymous_ref는 **grain(집계 단위)로만** 사용하고 출력하지 않는다(구 furef grain은 superseded — §2.2).
- **small-cell 억제**: 셀 카운트 < 임계값(기본 `k=5`, ★Leo 결정 필요)이면 `<k`로 마스킹. 특히 이상반응·성분 단위 소집단 재식별 방지.
- Foundation으로 전달되는 것은 request-scoped minimized `memory_context`뿐이며(raw_text_stored=False), **본 리포트는 Foundation을 읽지 않는다**(service-local read only).
- 리포트 산출물 저장 위치·보존기간은 control 산출물 정책을 따른다(prod 저장 금지, secret 금지).

---

## 8. 안전/역할 경계 가드레일

- **Safety > commerce.** M9/M12/M13/M14/M15의 adverse·suppression 신호는 CTR·outcome_value·margin_band 최적화 대상이 아니다. "이상반응을 줄여 보이게" 하는 어떤 집계 변형도 금지(clean-not-compress 상속).
- adverse_reaction·"계속 써도 돼?" 류 신호는 안전 우선으로 분류되며, 리포트는 이를 **강조**한다(숨김/평탄화 금지).
- Foundation = validate/gate/reasoning **only**. 리포트 생성은 service-local 분석이며 Foundation을 durable memory DB로 만들지 않는다.
- 휴리스틱 금지: reason_code·outcome 재분류를 키워드/정규식 추측으로 하지 않는다. 이벤트에 실린 구조화된 값만 group-by.
- 중단 조건(하나라도 발생 시 STOP): 리포트가 raw PII/customer id/원문을 노출 · prod DB 접근 시도 · adverse 지표 은닉 · small-cell 억제 우회 · Foundation 서비스 DB 직접 read.

---

## 9. 산출 단계(Reviewable Plan, 구현 아님)

설계 순서만 명시(코드 없음): **설계(본 문서) → 승인 → 이벤트/결과 계약 확정(`COSMILE_MEMORY_V3_03_RECOMMENDATION_EVENT_CONTRACT_20260706.md`·`COSMILE_MEMORY_V3_04_ORDER_REVENUE_FEEDBACK_OUTCOME_CONTRACT_20260706.md`) → synthetic/readiness fixture로 CLI 리포트 초안 → control regression(수치 재현·안전 지표 배치 검증) → report**. 이후 별도 train에서만 Slack/대시보드/AI-Analyst 검토.

검증 목표(예시, 구현 시 채움):
- 동일 fixture·동일 attribution 설정에서 리포트 수치 **결정적 재현**.
- adverse 지표(M9·M13 rate 분모 병기 포함)가 항상 §6.1 SAFETY FIRST(0번)에 위치.
- margin_coverage < 100%일 때 밴드 미상 라인을 임의 밴드/0으로 채우지 않음(마진 부풀림 0).
- suppression 검증(M14)·R3 검증(M15)이 synthetic fixture에서 위반 주입 시 위반을 실제로 검출함(검증 지표 자체의 동작 확인).
- small-cell 억제가 이상반응/성분 셀에 적용됨.

---

## 10. Open Questions / ★Leo 결정 필요 (요약)

- (사전으로 이관) attribution window **14d**·재구매 window **90d** = 사전 §4 ★Leo 파라미터 표 소유(구 7d/60d 초안 superseded — 사전 §4). refund 처리 = 사전 R-K4(order_item 단위)로 확정 — 잔여는 리포트 병기 표기 방식만.
- 다중추천 중복 귀속(제안 last-touch 단일 — 사전 미소유·★Leo).
- currency 혼합 시 기준통화/환율 소스(또는 통화별 분리 유지).
- 중복 노출 카운트 정책(동일 rec 재노출).
- small-cell 임계값 `k`(제안 5).
- (해소) V3 시리즈 형제 문서 파일명 번호 고정 — 실제 파일명으로 교정 완료(상단 상호참조).
- 리포트 산출물 저장/보존 정책(control 산출물 위치·기간).

---

## 무결성

- 본 문서는 **design-only**다. 코드·구현·테스트를 포함하지 않으며, 무엇도 구현/통과되었다고 주장하지 않는다.
- Memory V1 **Option B**를 canonical로 상속한다. **Option A / FOUNDATION_SUBJECT_REF_SECRET mint는 상속하지 않는다(superseded).** subject_ref/furef mint는 service-local.
- **Foundation = validate/gate/reasoning only.** Foundation은 durable customer memory DB가 아니며 SIASIU/Cosmile 서비스 DB를 직접 읽지 않는다. 본 리포트는 service-local(schema `cosmile`) read-only 집계다.
- **Service-local ownership.** SIASIU와 Cosmile은 각자의 customer memory·commerce 데이터를 소유하며 교차 스키마 직접 참조를 하지 않는다.
- Cosmile postgres는 **schema/validate 수준**이다. "real DB integration complete" 아님.
- **Safety-first.** adverse_reaction·성분 안전 신호는 매출/마진/CTR 위에 있으며 억제·최적화 대상이 아니다. medical assertion 없음.
- **no prod / no live / no main merge / no real secret·Vault / no prod DB migration.** Hard Stop 무접촉. write/live/promotion = 0, real user exposure = 0. 별도 release train 필요.
