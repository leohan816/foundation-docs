# COSMILE MEMORY V3-04 — Order / Revenue / Feedback Outcome Contract

> 작성: foundation-control · 2026-07-06 · design-only · no code · Hard Stop 무접촉

> depends_on: [COSMILE_MEMORY_V3_DATA_DICTIONARY_CANONICAL_20260706.md, COSMILE_MEMORY_V3_02_LEARNING_COMMERCE_MEMORY_CONTRACT_20260706.md, COSMILE_MEMORY_V3_03_RECOMMENDATION_EVENT_CONTRACT_20260706.md, COSMILE_MEMORY_V3_07_SAFETY_ADVERSE_REACTION_GUARDRAIL_20260706.md] · owns: [rec_outcome_event/rec_outcome_feedback 저장 계약(stage ≥ order · R-K7), attribution 집행 규칙(R-K2~R-K6 적용), feedback semantic extraction contract(§9.5 — 만족/이상반응 신호 추출→저장), OutcomeSummary 집계 계약] · referenced_by: [COSMILE_MEMORY_V3_00_INDEX_AND_EXECUTIVE_SUMMARY_20260706.md, COSMILE_MEMORY_V3_03_RECOMMENDATION_EVENT_CONTRACT_20260706.md, COSMILE_MEMORY_V3_05_PRODUCT_INGREDIENT_INTELLIGENCE_MAPPING_20260706.md, COSMILE_MEMORY_V3_06_MEMORY_FACT_CANDIDATE_PROMOTION_RULES_20260706.md, COSMILE_MEMORY_V3_07_SAFETY_ADVERSE_REACTION_GUARDRAIL_20260706.md, COSMILE_MEMORY_V3_10_PRE_IMPLEMENTATION_REVIEW_PLAN_20260706.md]

이 문서는 V3 Learning Commerce Memory Loop의 **결과(outcome) 계약**을 정의한다.
즉 "추천이 실제로 무슨 결과를 냈는가?"를 **구조화된 join 경로**로 답하고, 그 결과를
안전하게 `MemoryFactCandidate`로 흘려보내는 방법을 설계한다. **구현·live·prod 접근은 이 문서 범위 밖이다.**

관련 형제 문서(실제 파일명):
- `COSMILE_MEMORY_V3_DATA_DICTIONARY_CANONICAL_20260706.md` — **enum/key/threshold 유일 정본(사전).** 본 문서는 값 목록을 재선언하지 않고 사전을 참조한다.
- `COSMILE_MEMORY_V3_00_INDEX_AND_EXECUTIVE_SUMMARY_20260706.md` — V3 루프 개요·정체성·상속.
- `COSMILE_MEMORY_V3_02_LEARNING_COMMERCE_MEMORY_CONTRACT_20260706.md` — learning memory 계약 · **Foundation memory_context 최소화 계약(19필드) 소유 문서**.
- `COSMILE_MEMORY_V3_03_RECOMMENDATION_EVENT_CONTRACT_20260706.md` — recommendation event / recommendation_id 발급 계약(이 문서의 상류 · 얕은 상호작용 저장 소유 = R-K7).
- `COSMILE_MEMORY_V3_06_MEMORY_FACT_CANDIDATE_PROMOTION_RULES_20260706.md` — MemoryFactCandidate → evidence/confidence → LongTermMemoryFact promotion(이 문서의 하류).
- `COSMILE_MEMORY_V3_07_SAFETY_ADVERSE_REACTION_GUARDRAIL_20260706.md` — **AdverseSignalActionMatrix·safety semantic gate 정본**(§5·§9.5가 따르는 대상).

---

## 0. 위치와 목적

V3 타깃 루프에서 이 문서(V3-04)가 담당하는 구간:

```
... recommendation_id (V3-03)
      → product / SKU / ingredient
      → product_view / add_to_cart / checkout / order / order_item
      → revenue / margin / discount / refund / cancel
      → satisfaction / adverse_reaction / repurchase / review / feedback
      → [THIS DOC: outcome 집계 계약]
      → MemoryFactCandidate (V3-06)
```

핵심 질문(design question)들을 **필드와 join으로 답할 수 있게** 만드는 것이 목표다:

1. 추천한 제품이 **조회(view)** 되었나?
2. **클릭(click)** 되었나?
3. **장바구니(add_to_cart)** 에 담겼나?
4. **구매(purchase/order)** 되었나?
5. **재구매(repurchase)** 되었나?
6. 고객이 **만족(satisfaction)** 했나?
7. **이상반응(adverse_reaction)** / 부정 피드백이 있었나?
8. **마진/매출(margin/revenue)** 관점에서 유의미했나?

이 8개 질문 각각을 **명시적 필드 + 결정적(deterministic) 판정 규칙**으로 계약화한다.
휴리스틱(키워드/정규식)은 트리거·backstop 용도로만 쓰고, 의미의 최종 확정은
AI semantic judgment + Foundation gate로 넘긴다(CLAUDE.md Semantic/Policy Gate 원칙).

---

## 1. 소유권과 경계 (반드시 먼저)

- **Cosmile이 소유**: order, order_item, product, sku, cart, product_view/click event, revenue/margin/discount/refund/cancel, review, feedback, satisfaction/adverse_reaction 원신호.
  → 전부 **service-local**, Cosmile postgres schema `cosmile`. **schema/validate 수준**이며 real DB integration은 완료로 보지 않는다.
- **SIASIU가 소유**: consultation 결과·상담 원문·상담 memory. Cosmile은 SIASIU schema를 **직접 read 하지 않는다**(no cross-schema direct reference). 필요한 연결은 recommendation_id / subject_ref / session_id **contract**로만.
- **Foundation은 소유하지 않음**: durable customer memory DB 아님, service DB reader 아님.
  Foundation에는 minimized·request-scoped `memory_context`만 전달(raw text/PII 없음, `raw_text_stored=False`, `request_scoped=True`).
  Foundation 역할 = **validate / gate / reasoning ONLY**.
- 이 문서의 모든 테이블/필드는 **Cosmile service-local 스키마 제안**이다. Foundation core로 이관하지 않는다.

---

## 2. 식별자(identifier) 계약 — join의 기둥

outcome join은 아래 6개 축으로만 이뤄진다. **raw PII·이메일·전화·주문자 실명은 join key로 쓰지 않는다.**
키 **형식 선언의 정본 = 사전 §1.1** — 아래 표는 용도만 설명한다.

| 식별자 | 형식 / 출처 | 범위 | 비고 |
|---|---|---|---|
| `subject_ref` | 사전 §1.1 [M2 reused·Option B] | service-local mint | V1 Option B 상속. Option A / FOUNDATION_SUBJECT_REF_SECRET mint **미상속**. |
| `anonymous_ref` | 사전 §1.1 (`anon_v3_` + opaque 32) [V3 ext] | commerce event 계층 전용 | 비로그인 여정. **subject_ref XOR anonymous_ref**(R-K3) — downstream outcome까지 유지. memory 계층 직접 유입 금지. |
| `furef` | V1 Option B 계약(`furef_v2_`) | cross-producer consistent | producer 간 동일 고객을 안정 연결(SIASIU·Cosmile 공통 규칙). |
| `recommendation_id` | **`rec_v3_` + ULID(26)** — 사전 §1.1 유일 형식 (구 "UUID/ULID 계열" 표기는 superseded — 사전 §1.1) | 추천 이벤트 1건 | outcome을 추천에 되묶는 1차 key — 단 **NULLABLE**(R-K1·§3.1). |
| `session_id` | 상담/커머스 세션 opaque id (사전 §1.1) | 세션 1건 | `attribution_mode=session` 판정 축(사전 §2.9). |
| `order_id` / `order_item_id` | Cosmile order 도메인 opaque id (사전 §1.1) | 주문/품목 | **attribution·refund는 order_item 단위 우선**(사전 §1.1·R-K4). |

★Leo 결정 필요: **furef를 outcome 집계 join의 1차 축으로 승격할지**, 아니면 recommendation_id 우선·furef는 보조로 둘지.
(개인 단위 학습 vs. 추천 단위 학습의 트레이드오프. 개인 단위는 학습력↑·프라이버시 표면↑.)

`<SVC>` = 서비스 코드(예: `COSMILE`, `SIASIU`). **실제 secret 값은 이 문서에 없음**(key 이름만). mint 상세는 V3-02 참조.

---

## 3. Outcome 도메인 테이블 (Cosmile service-local, schema/validate 수준)

> 아래는 **설계 제안**이다. 실제 DDL/마이그레이션·prod 반영은 out-of-scope.

### 3.1 `rec_outcome_event` — 추천 이후 단계별 이벤트 (append-only)

> 소유 범위(R-K7): 본 테이블의 저장 소유 = **checkout 이후 결과(stage ≥ order)**. 얕은 상호작용(impression/click/add_to_cart)의 저장 소유는 V3-03 RecommendationEvent 단일이며 본 문서는 읽기 참조만 한다.

| 필드 | 타입(제안) | 설명 | null 허용 |
|---|---|---|---|
| `outcome_event_id` | ULID | PK | no |
| `recommendation_id` | `rec_v3_` + ULID(26) — 사전 §1.1 | V3-03 발급 추천 id (FK) — 추천 없는 주문 기록 허용(R-K1). NULL이면 `attribution_mode ∈ {organic, unattributed, unknown}` (구 "NOT NULL" 선언은 superseded — 사전 §1.3 R-K1) | **yes (NULLABLE)** |
| `subject_ref` | text | mint된 subject_ref — **subject_ref XOR anonymous_ref 정확히 하나**(R-K3) | yes (XOR) |
| `anonymous_ref` | text (`anon_v3_` + opaque 32) | 비로그인 여정 — downstream outcome까지 유지(R-K3·stitching은 `identity_stitching_state` 사전 §2.10) | yes (XOR) |
| `furef` | text | cross-producer 고객 id | yes |
| `session_id` | text | 세션 | yes |
| `stage` | enum `outcome_stage` | 단계(§3.3) | no |
| `product_id` | text | 추천/대상 제품 | yes |
| `sku_id` | text | SKU 단위 | yes |
| `order_id` | ULID | 주문(구매 단계 이상) | yes |
| `order_item_id` | ULID | 주문 품목 | yes |
| `occurred_at` | timestamptz | 이벤트 발생 시각 | no |
| `attribution_mode` | enum `attribution_mode` | 추천 귀속 방식(§4) | no |
| `raw_text_stored` | bool = **false** | 원문 저장 금지 불변식 | no |
| `request_scoped` | bool | Foundation 전달 여부 표시용 | no |

### 3.2 `rec_outcome_feedback` — 만족/이상반응/리뷰 신호 (append-only)

| 필드 | 타입(제안) | 설명 | null |
|---|---|---|---|
| `feedback_id` | ULID | PK | no |
| `recommendation_id` | `rec_v3_` + ULID(26) — 사전 §1.1 | 추천 귀속 | yes |
| `subject_ref` | text | 고객 | no |
| `furef` | text | cross-producer | yes |
| `order_item_id` | ULID | 어떤 구매에 대한 피드백인지 | yes |
| `product_id` / `sku_id` | text | 대상 | yes |
| `feedback_type` | enum — **정본 = 사전 §2.11** | (구 `feedback_kind` 자체 enum은 superseded — 사전 §2.11·§3.4) | no |
| `satisfaction_score` | smallint(1–5) | 만족 점수(있을 때) | yes |
| `adverse_flag` | bool | 이상반응 신호 존재 | no |
| `adverse_severity` | enum — **정본 = 사전 §2.4**(3값) | §5 — none=레코드 미생성·unknown→low+`adverse_certainty=reported` 기록(사전 §2.4) | yes |
| `adverse_certainty` | enum — **정본 = 사전 §2.5** | reported/repeated/verified/contradicted — 산정 규칙은 §9.5 | yes |
| `semantic_label` | enum — **정본 = 사전 §2.12** | **AI semantic judgment** 결과 라벨(원문 아님) — 추출 계약은 §9.5 | yes |
| `signal_source` | enum `signal_source` | review/CS/survey/return_reason 등 | no |
| `source_ref` | text (opaque) | 원신호 참조(원문 아님 — 사전 §8) | yes |
| `content_hash` | text | 원신호 hash(dedup용 — 사전 §8) | yes |
| `occurred_at` | timestamptz | | no |
| `raw_text_stored` | bool = **false** | 원문·PII 저장 금지 | no |

★핵심 불변식: `rec_outcome_feedback`은 고객 리뷰/문의 **원문을 저장하지 않는다.** 저장하는 것은
AI가 구조화한 `semantic_label` + `adverse_flag` + score + `source_ref`(opaque) + `content_hash`뿐(사전 §8). 원문 처리는 request-scoped로만.

### 3.3 enum `outcome_stage` (퍼널)

> R-K7: `impression`~`add_to_cart`(및 `product_view`/`click`)의 **저장 소유 = V3-03**. 본 표에는 퍼널 완결성을 위해 나열하되, V3-04가 저장하는 것은 `checkout_start` 이상뿐이다.

| 값 | 의미 | 대응 design question |
|---|---|---|
| `impression` | 추천이 노출됨 | (전제) |
| `product_view` | 추천 제품 조회 | Q1 |
| `click` | 추천 클릭 | Q2 |
| `add_to_cart` | 장바구니 담김 | Q3 |
| `checkout_start` | 체크아웃 진입 | (보조) |
| `order_placed` | 주문 생성 | Q4 |
| `order_paid` | 결제 완료 | Q4 |
| `fulfilled` | 배송/이행 완료 | Q4 |
| `repurchase` | 재구매 발생 | Q5 |
| `refund` | 환불 | 부정 outcome |
| `cancel` | 취소 | 부정 outcome |
| `return` | 반품 | 부정 outcome |

### 3.4 enum `feedback_type` — 정본 = 사전 §2.11

값 목록은 **사전 §2.11**만이 선언한다(`satisfaction_score`/`adverse_report`/`repurchase`/`refund_return`/`cs_contact`/`review_semantic`).
(구 `feedback_kind` 9값 자체 선언은 superseded — 사전 §2.11. 만족 방향성(satisfied/dissatisfied/neutral)은 feedback_type이 아니라 `semantic_label`(사전 §2.12)이 담는다.)

### 3.5 enum `signal_source`

`review` · `cs_ticket` · `post_purchase_survey` · `return_reason` · `repurchase_behavioral` · `consultation_followup` · `system_inferred`

---

## 4. Attribution (추천 → 결과 귀속) 규칙

"이 주문이 그 추천 때문인가?"를 **결정적 규칙**으로 판정한다. 추측 금지.

enum `attribution_mode` — **정본 = 사전 §2.9 (5값: `direct` / `session` / `organic` / `unattributed` / `unknown` · R-K2)**:

| 값 (사전 §2.9) | 조건 | 학습 반영 |
|---|---|---|
| `direct` | order_item이 recommendation_id를 직접 carry | promotion 입력 가능 |
| `session` | 동일 `session_id` 내 SKU 일치, 추천 후 window 내 | promotion 입력 가능 |
| `organic` | 추천 무관 자발 구매 | recommendation_id=NULL·promotion 입력 아님 |
| `unattributed` | 귀속 실패(추천 링크 없는 행동 매칭 포함) | recommendation_id=NULL·**promotion 불가 표시 유지** |
| `unknown` | 판정 불가 | recommendation_id=NULL·promotion 불가 |

(구 자체 enum은 superseded — 사전 §2.9: `direct_rec_id`≡`direct` · `same_session_sku`≡`session` · `behavioral_only`≡`unattributed`(승격 불가 표시 유지) · `same_subject_sku_window`는 5값에 미등재 → `unattributed`로 흡수.)

window 길이 정본 = **사전 §4**(purchase attribution **14d** · repurchase attribution **90d** — 확정은 ★Leo·사전 §4 단일 표. 구 "예: view=24h/cart=72h" 자체 제안 표기는 superseded — 사전 §4).

join 우선순위(결정적): `direct` > `session` > (`organic`/`unattributed`/`unknown` — 귀속 아님).
상위 attribution이 성립하면 하위는 중복 집계하지 않는다(idempotent by `recommendation_id + order_item_id + stage`).

### 4.1 귀속 시나리오 규칙 (P4 — 사전 §1.3 R-K4/R-K5/R-K6)

- **R-K4 부분 환불(partial refund):** 환불/취소는 **order_item 단위** 이벤트로 기록한다(`refund_qty` · `refund_amount_band`). net_outcome은 라인 단위로 재계산하며, 주문 전체 status만으로 부분 환불을 표현하지 않는다.
- **R-K5 SKU variant 재구매:** 재구매 판정 기준 = **동일 `product_id`**(sku 무관 — 용량/변형 포함) + 사전 §4 repurchase window(90d). sku 단위 재구매는 보조 신호로만 쓴다.
- **R-K6 bundle/주문 분할:** 묶음 주문은 order_item으로 분해한 뒤 각 라인에 **독립 attribution**을 적용한다. 하나의 recommendation_id가 여러 라인에 귀속될 수 있다(1:N).

---

## 5. Safety-first: adverse_reaction 우선 규칙 (commerce에 우선)

**안전/이상반응 신호는 매출/마진 최적화보다 항상 우선한다. 의학적 단정은 하지 않는다.**

enum `adverse_severity` — **정본 = 사전 §2.4 (3값: `low` / `moderate` / `severe`)**. `none`은 enum 값이 아니라 "신호 부재 → 레코드 미생성", `unknown`은 severity 미상 → `low` + `adverse_certainty=reported` 기록 + 재평가 대기. (구 5값 자체 선언 `none`·`mild`·`unknown`은 superseded — 사전 §2.4·`mild`≡`low`.)

규칙:
1. **adverse 신호의 즉시 효력은 자체 문턱으로 선언하지 않는다 — `AdverseSignalActionMatrix`(정본 = `COSMILE_MEMORY_V3_07_SAFETY_ADVERSE_REACTION_GUARDRAIL_20260706.md` §Matrix · 사전 §5.3)를 따른다.**
   severity × certainty 조합별 deterministic 효과(severe×reported = immediate safety_block + recommend_hold 등)는 matrix가 유일하게 결정한다.
   (구 "severe·moderate만 즉시 candidate 생성 + suppression" 자체 규칙은 superseded — 사전 §5.3.)
2. **low 무시 금지.** `low × reported`도 caution_memory_candidate + no automatic commerce boost(같은 축 positive candidate 강등)이며, 단 single low가 전체 affinity를 영구 동결하지는 않는다(target 축 한정 — 사전 §5.3). matrix 밖 조합 = fail-closed(상위 severity 처리).
3. `adverse_flag=true`이면 그 product/sku에 대한 **positive outcome(만족·재구매) 학습을 override**한다 — 같은 고객·같은 제품 라인에서 matrix가 정한 효과(suppression/caution/block)를 적용.
4. `"계속 써도 돼?"` 류 표현은 commerce 신호가 아니라 **safety-first**로 처리(만족 신호로 오분류 금지 — `semantic_label=usage_question_safety`, 사전 §2.12).
   의미 판정은 AI semantic judgment, 최종 집행은 Foundation safety gate + V3-07 safety semantic gate(구 "V3-05" 참조 표기는 superseded — 정본 = V3-07).
5. adverse는 **의학적 결론이 아니라 신호**로만 기록한다(`semantic_label`·severity·certainty). "부작용이다/질환이다" 단정 금지.
6. **long-term 확정은 evidence/confidence 게이트(V3-06) 통과 후** — 단 safety fact lifecycle은 일반 문턱 미적용(사전 §5.2).
   (safety suppression은 빠르게, positive promotion은 느리게 — 비대칭이 의도된 설계.)

(구 ★Leo 질문 "adverse 1건 즉시 차단 vs 후보만"은 AdverseSignalActionMatrix로 대체 — superseded, 사전 §5.3. 최종 확정 권한은 여전히 ★Leo·정본 위치는 V3-07.)

---

## 6. Revenue / Margin 유의성 판정 (Q8)

매출·마진 관점 "유의미"를 결정적 지표로 정의한다.

**margin 정본 = 사전 §2.14·§6 (Option A: `margin_band` + `margin_coverage`만).** 전 계약 공통: **정확 원가/실매가 저장 금지 — band만**(band 산출 소유 = V3-05 §7).
(구 금액 기반 margin 지표 `attributed_margin` = Σ `margin_amount` · `unit_cost` 계열 표현은 전부 superseded — 사전 §6.)

| 지표 | 정의(제안) | 용도 |
|---|---|---|
| `attributed_order_count` / `attributed_paid_count` | attribution 성립(direct/session) order_item count | 추천 성과(분모/분자 명시) |
| `margin_band` 분포 | attribution 성립 라인의 `margin_band`(low/medium/high — 사전 §2.14) 분포 + `margin_coverage`(밴드 판정 가능 비율) | 마진 기여(금액 아님) |
| `discount_flag` / `discount_band` | 할인 적용 여부·할인 폭 band | 할인 잠식 |
| `refund_qty` / `refund_amount_band` | order_item 단위 환불/취소/반품(R-K4) | 부정 outcome 차감 |
| `net_outcome_value_band` | 라인 단위 순 기여 band(양/중립/음 + 폭 band — R-K4 라인 재계산) | 순 기여 |
| `repurchase_uplift` | 재구매 발생 여부·주기 단축(R-K5 — product_id 기준) | LTV 신호 |

규칙:
- **margin 유의성은 candidate의 우선순위(weight)만 조정한다.** margin이 크다고 안전 신호를 덮지 못한다(§5 우선 — 사전 §5.2 "commerce/margin은 active safety fact를 강등·약화할 수 없다").
- `net_outcome_value_band`가 음(환불·취소로 손실)인 추천은 **negative outcome**으로 학습에 반영(다음 추천 개선용).
- 매출/마진은 **count/band/status만** outcome 계약에 남기고(정확 금액·개별 주문 금액 원장·PII 저장 금지), Foundation로 넘기지 않는다.

★Leo 결정 필요: 유의성 임계치(예: `net_outcome_value_band` 기준 또는 attribution `direct`/`session` 한정)를 어디에 둘지 —
숫자 임계는 Cosmile 실제 데이터가 붙은 뒤(현재는 schema/validate 수준) 튜닝 대상.

---

## 7. Design Question → 필드/Join 매핑 (요약표)

| # | 질문 | 판정 필드 | join 경로 |
|---|---|---|---|
| Q1 | 조회됐나 | `outcome_stage=product_view` 존재 | recommendation_id → rec_outcome_event |
| Q2 | 클릭됐나 | `outcome_stage=click` 존재 | recommendation_id → rec_outcome_event |
| Q3 | 장바구니 담김 | `outcome_stage=add_to_cart` | recommendation_id → rec_outcome_event → sku |
| Q4 | 구매됐나 | `stage in (order_placed,order_paid,fulfilled)` + `attribution_mode ∈ (direct, session)` | recommendation_id → order → order_item |
| Q5 | 재구매됐나 | `stage=repurchase` — 동일 `product_id` + 90d window(R-K5·사전 §4) | subject_ref/furef → 이전 order → 신규 order |
| Q6 | 만족했나 | `semantic_label=satisfied`(사전 §2.12) / `satisfaction_score≥4` | order_item → rec_outcome_feedback |
| Q7 | 이상반응/부정 | `adverse_flag=true` or `semantic_label=dissatisfied` | order_item → rec_outcome_feedback (§5) |
| Q8 | 마진/매출 유의 | `net_outcome_value_band`, `margin_band` 분포(+`margin_coverage`) | recommendation_id → order_item aggregate (§6) |

---

## 8. 핵심 Join 경로 (recommendation_id → order → feedback)

결정적 join 스켈레톤(개념도, 실행 SQL 아님):

```
recommendation_event (V3-03)
   │  recommendation_id, subject_ref XOR anonymous_ref, furef, session_id, product_id/sku_id
   ▼
rec_outcome_event                      -- stage ≥ order 저장(얕은 단계 소유 = V3-03·R-K7)
   │  recommendation_id (NULLABLE) ─┐
   │  subject_ref XOR anonymous_ref
   │  order_id / order_item_id
   ▼                      │ attribution_mode (사전 §2.9)
order  ── order_item ─────┘            -- Cosmile 소유(schema/validate 수준)
   │  order_item_id, sku_id, margin_band(산출=V3-05), discount_band, refund_qty/refund_amount_band
   ▼
rec_outcome_feedback                   -- 만족/이상반응/리뷰 (원문 미저장)
   │  feedback_type, satisfaction_score, adverse_flag, adverse_severity, adverse_certainty, semantic_label
   ▼
[집계] OutcomeSummary(recommendation_id 또는 furef 단위)
   │  funnel_reached, purchased, repurchased, satisfied,
   │  adverse(severity×certainty), net_outcome_value_band, attribution_mode
   ▼
MemoryFactCandidate  (→ V3-06 evidence/confidence promotion)
```

동일 고객 단위(개인 학습) 집계는 furef를 축으로, 추천 단위 집계는 recommendation_id를 축으로 한다(§2 ★).

---

## 9. Outcome → MemoryFactCandidate 흐름 (V3-06 연결)

이 문서는 candidate를 **생성 조건까지만** 정의한다. evidence 누적·confidence 승격·LongTermMemoryFact 확정은 **V3-06**.

`MemoryFactCandidate` 최소 필드(제안, 원문·PII 없음):

| 필드 | 설명 |
|---|---|
| `candidate_id` | ULID |
| `subject_ref` / `furef` | 고객 축(subject_key = 사전 §1.1) |
| `fact_type` | enum — **정본 = 사전 §2.1** (§9.1) |
| `fact_target` (`product_id` / `sku_id` / `ingredient_ref` / `category_id`) | 대상 — 사전 §2.1 (fact_type, fact_target, direction) 모델 |
| `direction` | `positive` / `negative` / `safety` / `behavioral` / `context` — 사전 §2.1 (구 `polarity` 4값 표기는 superseded — `adverse`≡`safety`) |
| `source_recommendation_id` | 귀속 추천(`rec_v3_` — NULLABLE·R-K1) |
| `attribution_mode` | 사전 §2.9 (§4) |
| `evidence_count` | 이 신호를 뒷받침한 **독립** outcome 건수(사전 §3 — 같은 세션 dedup·source_event_refs 기준) |
| `signal_strength` | low/medium/high (attribution·severity 종합) |
| `safety_override` | bool (adverse가 commerce를 덮었는지) |
| `raw_text_stored=false` · `request_scoped=true` | 불변식 |

### 9.1 enum `fact_type` (candidate) — 정본 = 사전 §2.1

값 목록은 **사전 §2.1**((fact_type, fact_target, direction) 모델)만이 선언한다.

구 자체 enum은 superseded — 사전 §2.1 매핑:
`product_satisfaction`→`product_affinity` · `product_dissatisfaction`→`product_aversion` ·
`adverse_reaction_signal`→`ingredient_adverse`/`product_adverse` · `repurchase_preference`→`repurchase_pattern` ·
`ingredient_avoidance`→`ingredient_aversion` · `category_interest`→`category_preference` · `ingredient_affinity` 유지.
`price_sensitivity` · `unsuitable_recommendation` = **RESERVED(수집·승격 금지 — 사전 §2.1·소비자 미정의)**.

### 9.2 candidate 생성 규칙 (결정적)

1. **single-signal은 절대 long-term으로 확정하지 않는다.** outcome 1건 = candidate 1건(또는 evidence_count 증분)일 뿐.
2. `direction=positive` candidate: 구매 + 만족(score≥4 또는 `semantic_label=satisfied`) + `attribution_mode ∈ (direct, session)`일 때 생성. promotion은 V3-06 gate(문턱 = 사전 §3).
3. `direction=safety`/`negative` candidate: **AdverseSignalActionMatrix(정본 V3-07·사전 §5.3)의 효과에 따라 생성/suppression 반영**, 단 long-term 확정은 gate 통과 후(safety fact lifecycle은 사전 §5.2).
4. `attribution_mode ∈ (organic, unattributed, unknown)`: candidate는 생성 가능하나 **promotion 불가 표시**(evidence 보조로만 — 구 `behavioral_only` 표기는 superseded, 사전 §2.9).
5. 모든 candidate는 **safety_override 우선**: adverse가 있으면 같은 축의 positive candidate signal_strength를 강등.
6. candidate 생성/승격 **전에** 동일 `(subject_key, fact_type, fact_target)`의 active/tombstone/`must_not_reappear` 상태 조회를 선행한다(사전 §5.1 — 우회 = 계약 위반·집행은 V3-06 R-C1).

Foundation은 이 candidate를 **판정/gate/validate**할 뿐, 저장소로 보유하지 않는다(§1 · memory_context 최소화 계약 = V3-02).

### 9.5 Semantic Extraction Contract (P9 — 본 문서 소유)

만족도/이상반응 **raw 신호 → 구조화 semantic 추출 → feedback input/outcome 저장** 계약은 **V3-04가 소유**한다.
(단, **safety semantic gate 자체(pass/caution/block 판정·AdverseSignalActionMatrix)는 V3-07 소유** — 본 절은 "무엇을 어떻게 추출·저장하는가"까지만.)

1. **라벨 어휘**: `semantic_label` enum 정본 = **사전 §2.12**(satisfied/dissatisfied/neutral · adverse_skin_reaction/adverse_other/usage_question_safety/usage_question_general · repurchase_intent/avoid_intent/unclear). 본 문서는 값을 재선언하지 않는다.
2. **trigger taxonomy** (`signal_source` §3.5 × 라벨 후보):
   - adverse trigger: 피부 반응/자극 호소(review·cs_ticket·post_purchase_survey) · `return_reason`=피부 트러블 계열 · "계속 써도 돼?"류(→ `usage_question_safety` — 만족 신호로 오분류 금지) · consultation_followup의 이상반응 언급.
   - satisfaction trigger: 만족/재구매 의사 표현(review·survey score) · `repurchase_behavioral`(행동 신호 — semantic 추출 없이 `repurchase` feedback_type으로 직접 기록).
   - 키워드/정규식 휴리스틱은 **trigger·escalation candidate·fail-closed backstop 전용** — raw text 의미의 최종 확정자가 아니다.
3. **AI semantic 추출 = 제안, deterministic policy gate = 결정**: AI는 `semantic_label` 후보 + `adverse_severity` 후보(사전 §2.4)를 제안하고, deterministic gate가 라벨 수용·저장·matrix 집행(V3-07)을 결정한다. AI 제안 단독으로 저장·suppression이 확정되지 않는다.
4. **raw feedback 미저장**: `raw_text_stored=false` — 저장은 `semantic_label` + `source_ref`(opaque) + `content_hash`만(사전 §8). 원문 처리는 request-scoped.
5. **certainty 산정**(`adverse_certainty` 정본 = 사전 §2.5): 최초 자가보고 = `reported` → 독립 소스/이벤트 2회+ = `repeated` → CS/반품/전문 확인 = `verified` → 반증/정정 = `contradicted`(해제는 자동이 아니라 safety-resolution rule — V3-07·사전 §5.2). severity 미상(unknown) 신호는 `low` + `reported`로 기록 후 재평가 대기(사전 §2.4·재평가 주기 사전 §4).
6. **human review 조건**: `semantic_label=unclear` 반복 · AI 제안과 deterministic backstop 충돌 · `contradicted` 전환 · severity 미상 지속 → `human_review_required`(lifecycle_state — 사전 §2.2) 표시 후 사람 확인 경유.

---

## 10. Trace / Privacy 계약

- outcome/feedback에는 **raw review text·CS 원문·주문자 PII·결제수단·주소를 저장하지 않는다.** 저장 = 구조화 라벨·count·score·status·enum.
- Foundation 전달 payload = minimized `memory_context`(**최소화 계약 정본 = V3-02 19필드 표**): boolean/count/enum/severity/attribution_mode/`net_outcome_value_band` 만. **raw_text_stored=false, request_scoped=true.**
- trace evidence는 boolean/count/status만. raw secret·raw hash·PII·order_id 원본·OAuth id·full env dump 금지.
- verification 산출물도 동일 원칙(수치·통과여부만).

---

## 11. Hard Stops (out-of-scope, 이 문서는 무접촉)

아래는 **이 설계 범위 밖**이며 이 문서·후속 구현 계획은 이를 수행하지 않는다:
- prod DB access / prod DB migration / prod DB backfill
- real secret · Vault write · real prod secret view
- main merge · live activation · external release
- checkout/order/customer DB write live · 실고객 노출

현재 상태 = design + contract + reviewable implementation plan. **자동 실행이 아니라 "자동화 가능한 memory/learning 구조"를 만드는 것**이 목표.
Cosmile postgres는 **schema/validate 수준** — "real DB integration complete"라고 말하지 않는다.

---

## 12. Open Questions (★Leo 결정 필요 집합)

1. join 1차 축: `recommendation_id` 우선 vs `furef`(개인) 우선 (§2).
2. attribution window 길이 — 정본 초안은 사전 §4(purchase 14d·repurchase 90d)에 단일 표로 등재됨·확정만 남음 (구 "medium 이하 신뢰도" 질문은 5값 enum 채택으로 superseded — 사전 §2.9: organic/unattributed/unknown promotion 불가 고정) (§4).
3. (superseded — 사전 §5.3) adverse 1건 효력은 AdverseSignalActionMatrix(V3-07 정본)로 대체 — 최종 확정 승인만 ★Leo (§5).
4. revenue/margin 유의성 임계치(band 기준·실데이터 연동 후 튜닝) (§6).
5. satisfaction score 스케일(1–5 vs 이진 pos/neg) 확정.
6. (superseded — 사전 §4) repurchase window 90d는 사전 §4 정본 초안으로 등재 — 확정만 남음 (R-K5).

---

## 무결성

- **design-only**: 코드·live·prod 접근 없음. 실제 DDL/마이그레이션·secret 값 없음. 구현/테스트되었다고 주장하지 않는다.
- **V1 Option B 상속**: subject_ref/furef mint는 service-local. **Option A / FOUNDATION_SUBJECT_REF_SECRET mint 미상속**(superseded).
- **Foundation = validate/gate/reasoning ONLY**: durable customer memory DB 아님, service DB reader 아님. minimized·request-scoped memory_context만 전달(raw_text_stored=false).
- **service-local ownership**: order/revenue/feedback·customer memory는 SIASIU·Cosmile 각자 소유(per-service schema, no cross-schema direct reference). Cosmile postgres는 **schema/validate 수준**.
- **safety-first**: adverse_reaction/안전 신호가 commerce/revenue 최적화에 우선. 의학적 단정 없음. single-signal long-term 확정 금지.
- **no prod / no live / no main / no secret**: Hard Stop 무접촉. write/live/promotion = 0, real user exposure = 0. 별도 release train 필요.
