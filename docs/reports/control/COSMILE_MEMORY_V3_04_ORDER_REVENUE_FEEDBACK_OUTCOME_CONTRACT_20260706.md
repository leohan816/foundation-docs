# COSMILE MEMORY V3-04 — Order / Revenue / Feedback Outcome Contract

> 작성: foundation-control · 2026-07-06 · design-only · no code · Hard Stop 무접촉

이 문서는 V3 Learning Commerce Memory Loop의 **결과(outcome) 계약**을 정의한다.
즉 "추천이 실제로 무슨 결과를 냈는가?"를 **구조화된 join 경로**로 답하고, 그 결과를
안전하게 `MemoryFactCandidate`로 흘려보내는 방법을 설계한다. **구현·live·prod 접근은 이 문서 범위 밖이다.**

관련 형제 문서(파일명 참조):
- `COSMILE_MEMORY_V3_01_*` — V3 루프 개요·정체성·상속.
- `COSMILE_MEMORY_V3_02_*` — subject_ref / furef mint·identity 계약.
- `COSMILE_MEMORY_V3_03_*` — recommendation event / recommendation_id 발급 계약(이 문서의 상류).
- `COSMILE_MEMORY_V3_05_*` — Foundation memory_context minimization·validate/gate 계약.
- `COSMILE_MEMORY_V3_06_*` — MemoryFactCandidate → evidence/confidence → LongTermMemoryFact promotion(이 문서의 하류).

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

outcome join은 아래 5개 축으로만 이뤄진다. **raw PII·이메일·전화·주문자 실명은 join key로 쓰지 않는다.**

| 식별자 | 형식 / 출처 | 범위 | 비고 |
|---|---|---|---|
| `subject_ref` | `subj_v2_` + HMAC(`<SVC>_SUBJECT_SECRET`, `'<svc>:subject:'+ref`)[:32] | service-local mint | V1 Option B 상속. Option A / FOUNDATION_SUBJECT_REF_SECRET mint **미상속**. |
| `furef` | `furef_v2_` + HMAC(`<SVC>_FUREF_SECRET`, `'<svc>:local_user:'+ref`)[:32] | cross-producer consistent | producer 간 동일 고객을 안정 연결(SIASIU·Cosmile 공통 규칙). |
| `recommendation_id` | V3-03 발급(UUID/ULID 계열) | 추천 이벤트 1건 | outcome을 추천에 되묶는 **1차 key**. |
| `session_id` | 상담/커머스 세션 | 세션 1건 | recommendation_id 없을 때의 **약한 fallback** join. |
| `order_id` / `order_item_id` | Cosmile order 도메인 | 주문/품목 | revenue/margin/refund 계산 단위. |

★Leo 결정 필요: **furef를 outcome 집계 join의 1차 축으로 승격할지**, 아니면 recommendation_id 우선·furef는 보조로 둘지.
(개인 단위 학습 vs. 추천 단위 학습의 트레이드오프. 개인 단위는 학습력↑·프라이버시 표면↑.)

`<SVC>` = 서비스 코드(예: `COSMILE`, `SIASIU`). **실제 secret 값은 이 문서에 없음**(key 이름만). mint 상세는 V3-02 참조.

---

## 3. Outcome 도메인 테이블 (Cosmile service-local, schema/validate 수준)

> 아래는 **설계 제안**이다. 실제 DDL/마이그레이션·prod 반영은 out-of-scope.

### 3.1 `rec_outcome_event` — 추천 이후 단계별 이벤트 (append-only)

| 필드 | 타입(제안) | 설명 | null 허용 |
|---|---|---|---|
| `outcome_event_id` | ULID | PK | no |
| `recommendation_id` | ULID | V3-03 발급 추천 id (FK) | no |
| `subject_ref` | text | mint된 subject_ref | no |
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
| `recommendation_id` | ULID | 추천 귀속 | yes |
| `subject_ref` | text | 고객 | no |
| `furef` | text | cross-producer | yes |
| `order_item_id` | ULID | 어떤 구매에 대한 피드백인지 | yes |
| `product_id` / `sku_id` | text | 대상 | yes |
| `feedback_kind` | enum `feedback_kind` | §3.4 | no |
| `satisfaction_score` | smallint(1–5) | 만족 점수(있을 때) | yes |
| `adverse_flag` | bool | 이상반응 신호 존재 | no |
| `adverse_severity` | enum `adverse_severity` | §5 | yes |
| `semantic_label` | text | **AI semantic judgment** 결과 라벨(원문 아님) | yes |
| `signal_source` | enum `signal_source` | review/CS/survey/return_reason 등 | no |
| `occurred_at` | timestamptz | | no |
| `raw_text_stored` | bool = **false** | 원문·PII 저장 금지 | no |

★핵심 불변식: `rec_outcome_feedback`은 고객 리뷰/문의 **원문을 저장하지 않는다.** 저장하는 것은
AI가 구조화한 `semantic_label` + `adverse_flag` + score. 원문 처리는 request-scoped로만.

### 3.3 enum `outcome_stage` (퍼널)

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

### 3.4 enum `feedback_kind`

`satisfaction_positive` · `satisfaction_negative` · `neutral` · `adverse_reaction` · `review_text_derived` · `cs_inquiry_derived` · `survey` · `return_reason` · `unknown`

### 3.5 enum `signal_source`

`review` · `cs_ticket` · `post_purchase_survey` · `return_reason` · `repurchase_behavioral` · `consultation_followup` · `system_inferred`

---

## 4. Attribution (추천 → 결과 귀속) 규칙

"이 주문이 그 추천 때문인가?"를 **결정적 규칙**으로 판정한다. 추측 금지.

enum `attribution_mode`:

| 값 | 조건 | 신뢰도 |
|---|---|---|
| `direct_rec_id` | order_item이 recommendation_id를 직접 carry | **highest** |
| `same_session_sku` | 동일 `session_id` + 동일 `sku_id`, 추천 후 window 내 | high |
| `same_subject_sku_window` | 동일 `subject_ref`/`furef` + 동일 sku, N일 window | medium |
| `behavioral_only` | 추천 링크 없이 행동만 매칭 | low(학습 약가중) |
| `unattributed` | 귀속 불가 | promotion 금지 |

★Leo 결정 필요: attribution **window 길이**(예: view=24h, cart=72h, purchase=14d, repurchase=90d)와
`medium` 이하 신뢰도를 **long-term memory promotion에 쓸지 여부**. (기본 제안: `medium` 이하는 candidate까지만, promotion 불가.)

join 우선순위(결정적): `direct_rec_id` > `same_session_sku` > `same_subject_sku_window` > `behavioral_only`.
상위 attribution이 성립하면 하위는 중복 집계하지 않는다(idempotent by `recommendation_id + order_item_id + stage`).

---

## 5. Safety-first: adverse_reaction 우선 규칙 (commerce에 우선)

**안전/이상반응 신호는 매출/마진 최적화보다 항상 우선한다. 의학적 단정은 하지 않는다.**

enum `adverse_severity`: `none` · `mild` · `moderate` · `severe` · `unknown`

규칙:
1. `adverse_flag=true`이면 그 product/sku에 대한 **positive outcome(만족·재구매) 학습을 override**한다 —
   같은 고객·같은 제품 라인에서 **재추천 억제(suppression) 후보**로 표시.
2. `"계속 써도 돼?"` 류 표현은 commerce 신호가 아니라 **safety-first**로 처리(만족 신호로 오분류 금지).
   의미 판정은 AI semantic judgment, 최종 집행은 Foundation safety gate(V3-05).
3. adverse는 **의학적 결론이 아니라 신호**로만 기록한다(`semantic_label`·severity). "부작용이다/질환이다" 단정 금지.
4. `severe`·`moderate` adverse는 **즉시 candidate 생성 + suppression**, 단 **long-term 확정은 evidence/confidence 게이트(V3-06) 통과 후**.
   (safety suppression은 빠르게, positive promotion은 느리게 — 비대칭이 의도된 설계.)

★Leo 결정 필요: adverse 신호 1건으로 **재추천 즉시 차단**을 걸지(fail-closed) vs. suppression 후보로만 두고 사람이 확인할지.
안전 우선 원칙상 기본 제안 = **1건이라도 severe/moderate면 재추천 fail-closed suppression(차단), promotion만 지연.**

---

## 6. Revenue / Margin 유의성 판정 (Q8)

매출·마진 관점 "유의미"를 결정적 지표로 정의한다.

| 지표 | 정의(제안) | 용도 |
|---|---|---|
| `attributed_revenue` | Σ order_item.net_amount (attribution 성립분) | 추천 성과 |
| `attributed_margin` | Σ order_item.margin_amount | 마진 기여 |
| `discount_impact` | Σ discount_amount | 할인 잠식 |
| `refund_cancel_loss` | Σ refund+cancel+return 금액 | 부정 outcome 차감 |
| `net_outcome_value` | attributed_revenue − refund_cancel_loss − discount_impact(가중) | 순 기여 |
| `repurchase_uplift` | 재구매 발생 여부·주기 단축 | LTV 신호 |

규칙:
- **margin 유의성은 candidate의 우선순위(weight)만 조정한다.** margin이 크다고 안전 신호를 덮지 못한다(§5 우선).
- `net_outcome_value ≤ 0` (환불·취소로 손실)인 추천은 **negative outcome**으로 학습에 반영(다음 추천 개선용).
- 매출/마진 수치는 **집계값(count/sum/status)** 만 outcome 계약에 남기고, 개별 주문 금액 원장·PII는 Foundation로 넘기지 않는다.

★Leo 결정 필요: 유의성 임계치(예: `net_outcome_value ≥ X` 또는 attribution 신뢰도 high 이상)를 어디에 둘지 —
숫자 임계는 Cosmile 실제 데이터가 붙은 뒤(현재는 schema/validate 수준) 튜닝 대상.

---

## 7. Design Question → 필드/Join 매핑 (요약표)

| # | 질문 | 판정 필드 | join 경로 |
|---|---|---|---|
| Q1 | 조회됐나 | `outcome_stage=product_view` 존재 | recommendation_id → rec_outcome_event |
| Q2 | 클릭됐나 | `outcome_stage=click` 존재 | recommendation_id → rec_outcome_event |
| Q3 | 장바구니 담김 | `outcome_stage=add_to_cart` | recommendation_id → rec_outcome_event → sku |
| Q4 | 구매됐나 | `stage in (order_placed,order_paid,fulfilled)` + attribution≠unattributed | recommendation_id → order → order_item |
| Q5 | 재구매됐나 | `stage=repurchase` or `repurchase_uplift>0` | subject_ref/furef → 이전 order → 신규 order |
| Q6 | 만족했나 | `feedback_kind=satisfaction_positive` / `satisfaction_score≥4` | order_item → rec_outcome_feedback |
| Q7 | 이상반응/부정 | `adverse_flag=true` or `satisfaction_negative` | order_item → rec_outcome_feedback (§5) |
| Q8 | 마진/매출 유의 | `net_outcome_value`, `attributed_margin` | recommendation_id → order_item aggregate (§6) |

---

## 8. 핵심 Join 경로 (recommendation_id → order → feedback)

결정적 join 스켈레톤(개념도, 실행 SQL 아님):

```
recommendation_event (V3-03)
   │  recommendation_id, subject_ref, furef, session_id, product_id/sku_id
   ▼
rec_outcome_event                      -- 퍼널 단계 (view/click/cart/order...)
   │  recommendation_id  ─┐
   │  order_id / order_item_id
   ▼                      │ attribution_mode (§4)
order  ── order_item ─────┘            -- Cosmile 소유(schema/validate 수준)
   │  order_item_id, sku_id, net_amount, margin_amount, discount, refund/cancel
   ▼
rec_outcome_feedback                   -- 만족/이상반응/리뷰 (원문 미저장)
   │  feedback_kind, satisfaction_score, adverse_flag, adverse_severity, semantic_label
   ▼
[집계] OutcomeSummary(recommendation_id 또는 furef 단위)
   │  funnel_reached, purchased, repurchased, satisfied,
   │  adverse(severity), net_outcome_value, attribution_confidence
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
| `subject_ref` / `furef` | 고객 축 |
| `fact_type` | enum(§9.1) |
| `subject_product_id` / `sku_id` / `ingredient_ref` | 대상 |
| `polarity` | `positive` / `negative` / `adverse` / `neutral` |
| `source_recommendation_id` | 귀속 추천 |
| `attribution_mode` | §4 |
| `evidence_count` | 이 신호를 뒷받침한 outcome 건수 |
| `signal_strength` | low/medium/high (attribution·severity·revenue 종합) |
| `safety_override` | bool (adverse가 commerce를 덮었는지) |
| `raw_text_stored=false` · `request_scoped=true` | 불변식 |

### 9.1 enum `fact_type` (candidate)

`product_satisfaction` · `product_dissatisfaction` · `adverse_reaction_signal` · `repurchase_preference` ·
`ingredient_affinity` · `ingredient_avoidance` · `price_sensitivity` · `category_interest` · `unsuitable_recommendation`

### 9.2 candidate 생성 규칙 (결정적)

1. **single-signal은 절대 long-term으로 확정하지 않는다.** outcome 1건 = candidate 1건(또는 evidence_count 증분)일 뿐.
2. `positive` candidate: 구매 + 만족(score≥4) + attribution ≥ `same_session_sku`일 때 생성. promotion은 V3-06 gate.
3. `adverse`/`negative` candidate: §5에 따라 **즉시 생성 + suppression 반영**, 단 long-term 확정은 gate 통과 후.
4. `unattributed` 또는 `behavioral_only`: candidate는 생성 가능하나 **promotion 불가 표시**(evidence 보조로만).
5. 모든 candidate는 **safety_override 우선**: adverse가 있으면 같은 축의 positive candidate signal_strength를 강등.

Foundation은 이 candidate를 **판정/gate/validate**할 뿐, 저장소로 보유하지 않는다(§1, V3-05).

---

## 10. Trace / Privacy 계약

- outcome/feedback에는 **raw review text·CS 원문·주문자 PII·결제수단·주소를 저장하지 않는다.** 저장 = 구조화 라벨·count·score·status·enum.
- Foundation 전달 payload = minimized `memory_context`: boolean/count/enum/severity/attribution_mode/net_value_bucket 만. **raw_text_stored=false, request_scoped=true.**
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
2. attribution window 길이 + `medium` 이하 신뢰도의 promotion 허용 여부 (§4).
3. adverse 1건 fail-closed 재추천 차단 vs 후보만 (§5).
4. revenue/margin 유의성 임계치(실데이터 연동 후 튜닝) (§6).
5. satisfaction score 스케일(1–5 vs 이진 pos/neg) 확정.
6. repurchase 판정 window(90d 제안) 확정.

---

## 무결성

- **design-only**: 코드·live·prod 접근 없음. 실제 DDL/마이그레이션·secret 값 없음. 구현/테스트되었다고 주장하지 않는다.
- **V1 Option B 상속**: subject_ref/furef mint는 service-local. **Option A / FOUNDATION_SUBJECT_REF_SECRET mint 미상속**(superseded).
- **Foundation = validate/gate/reasoning ONLY**: durable customer memory DB 아님, service DB reader 아님. minimized·request-scoped memory_context만 전달(raw_text_stored=false).
- **service-local ownership**: order/revenue/feedback·customer memory는 SIASIU·Cosmile 각자 소유(per-service schema, no cross-schema direct reference). Cosmile postgres는 **schema/validate 수준**.
- **safety-first**: adverse_reaction/안전 신호가 commerce/revenue 최적화에 우선. 의학적 단정 없음. single-signal long-term 확정 금지.
- **no prod / no live / no main / no secret**: Hard Stop 무접촉. write/live/promotion = 0, real user exposure = 0. 별도 release train 필요.
