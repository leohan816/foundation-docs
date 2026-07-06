# COSMILE MEMORY V3 — V3-03 Recommendation Event Contract

> 작성: foundation-control · 2026-07-06 · design-only · no code · Hard Stop 무접촉

이 문서는 Cosmile Memory V3(Learning Commerce Memory Loop)의 세 번째 조각으로,
"추천 이벤트(Recommendation Event)"의 **계약(contract)**을 설계한다.
목표는 추천을 *"무엇을 보여줬는가"*가 아니라 **"왜 보여줬고 그 뒤에 어떤 결과가 이어졌는가"**로 기록 가능하게 만드는 것이다.

이 문서는 **설계 + 계약 + 리뷰 가능한 구현 계획**이다. live/prod 활성화가 아니다.
Cosmile postgres는 현재 **schema/validate 수준**이며, real DB 통합은 완료로 간주하지 않는다.

관련 형제 문서(cross-reference):
- `COSMILE_MEMORY_V3_01_*` — V3 전체 루프 개요 / canonical inheritance.
- `COSMILE_MEMORY_V3_02_*` — subject_ref / furef 식별자 계약(service-local mint).
- `COSMILE_MEMORY_V3_04_*` — Order / Feedback / Outcome Event Contract (recommendation_id downstream 연결 대상).
- `COSMILE_MEMORY_V3_05_*` — MemoryFactCandidate → LongTermMemoryFact promotion (evidence/confidence).

---

## 0. 위치와 역할 (V3 루프에서 V3-03의 자리)

V3 타겟 루프(end-to-end):

```
상담 결과 → 추천 이유 → 추천 상품 → product/SKU/ingredient
        → product_view / add_to_cart / checkout / order → revenue/margin
        → satisfaction / adverse_reaction / repurchase
        → MemoryFactCandidate → evidence/confidence 장기기억 승격
        → 다음 추천 개선
```

V3-03은 이 루프에서 **"추천 이유 → 추천 상품 → (첫 상호작용) product_view/add_to_cart"** 구간을 담당하는 **이벤트 계약**이다.
즉 "추천이 발생한 사실"과 "추천의 근거(reason/avoid/safety/confidence)"와 "추천 직후의 얕은 상호작용(shown/clicked/dismissed/saved/added_to_cart)"까지를 하나의 `recommendation_id`로 묶는다.
그 이후 깊은 결과(checkout/order/repurchase/adverse_reaction)는 **V3-04**가 `recommendation_id`를 참조해 이어받는다.

**핵심 원칙:** 추천 이벤트는 *결과가 아니라 근거를 저장*한다. 결과(구매/부작용/재구매)는 별도 이벤트에서 링크로 붙는다.
근거를 저장해야 나중에 "이 추천이 옳았는가"를 재현/학습할 수 있다.

**역할 경계(헌법):**
- 추천 **이유·safety_flags·avoid_reason·confidence 판단**은 Foundation decision/safety output에서 온다(service voice가 낮추지 않음, safety=MAX·fail-closed).
- 추천 **이벤트 저장·소유**는 Cosmile service-local(postgres schema `cosmile`)이다. Foundation은 durable memory DB가 아니다.
- Foundation에는 minimized request-scoped `memory_context`만 전달된다(raw text/PII 없음, `raw_text_stored=false`, `request_scoped`).

---

## 1. RecommendationEvent — 필드 계약

한 건의 추천 이벤트 = "누구에게 / 어떤 상담 맥락에서 / 어떤 상품을 / 왜 / 어떤 안전판단 하에 / 얼마나 확신하며 추천했고 / 무엇을 했는가".

| 필드 | 타입 | 필수 | 소유/출처 | 설명 |
|---|---|---|---|---|
| `recommendation_id` | string (`rec_v3_` + 32) | ✔ | Cosmile mint | 이벤트/추천 상관관계 키. downstream(V3-04)이 이 키로 order/feedback을 연결. |
| `event_type` | enum(§2) | ✔ | Cosmile | 이 레코드가 나타내는 상호작용 종류. |
| `subject_ref` | string (`subj_v2_`+32) | 조건부 | service-local mint | 식별된 고객. `HMAC(<SVC>_SUBJECT_SECRET,'<svc>:subject:'+ref)[:32]`. **또는** `anonymous_ref`. |
| `anonymous_ref` | string (`anon_v3_`+…) | 조건부 | service-local | 비식별 세션 대상. subject_ref와 **택일**(둘 다 없음 금지, 둘 다 있음 금지 — §5 규칙 R1). |
| `session_id` | string | ✔ | Cosmile | 상담/브라우징 세션. 동일 세션 내 이벤트 상관. raw PII 아님. |
| `consultation_id` | string | 조건부 | SIASIU/Cosmile 상담 | 추천을 유발한 상담 맥락. 상담 없이 발생한 추천은 null 허용(§5 R4). |
| `product_id` | string | ✔ | Cosmile catalog | 추천된 상품(브랜드/제품 단위). |
| `sku_id` | string | 선택 | Cosmile catalog | 옵션/변형(용량·색). product_id보다 세분. 미결정 시 null. |
| `ingredient_basis` | string[] (코드) | 선택 | Foundation 판단 | 추천 근거가 된 성분 축(예: `panthenol`, `niacinamide`). 성분 서술이 아니라 **근거 축 코드**. |
| `reason_codes` | enum[](§3) | ✔ | Foundation decision | "왜 추천했는가"의 구조화 코드. 자유서술 금지. |
| `avoid_reason` | enum[](§3) | 조건부 | Foundation decision | do_not_recommend/hold일 때 "왜 피했/보류했는가". recommend류면 비어있을 수 있음. |
| `safety_flags` | enum[](§4) | ✔ | Foundation safety gate | 안전 신호. 비어있어도(`[]`) 명시 저장(안전판단이 돌았음의 증거). |
| `safety_gate_result` | enum(pass/caution/block) | ✔ | Foundation safety gate | 이 추천에 대한 gate 판정. block이면 추천 노출 자체가 억제되어야 함(§5 R3). |
| `confidence` | float 0.0–1.0 | ✔ | Foundation reasoning | 추천 근거 확신도. 단일 신호로 장기기억 승격 금지(V3-05). |
| `evidence_mode` | enum | ✔ | Foundation | cannot_determine / uncertain / cautious / grounded. confidence의 질적 라벨. |
| `source` | enum(§6) | ✔ | Cosmile | 추천이 생성된 경로(상담엔진/규칙/재현 등). |
| `created_at` | timestamp(UTC ISO8601) | ✔ | Cosmile | 이벤트 발생 시각. |
| `schema_version` | string(`v3.0`) | ✔ | 계약 | 계약 버전. 미래 변경 추적. |
| `applied_to_real_user` | bool(=false) | ✔ | 불변 | 현재 단계 고정값 false. |
| `write_performed` | bool | ✔ | Cosmile | schema/validate 수준에서의 write 성격 표기(실 prod write 아님). |

**메모:** 이 표는 계약 후보다. 실제 DDL/마이그레이션은 **V3-04 이후 별도 release train**에서 다룬다(prod DB migration = Hard Stop).

---

## 2. event_type — 이벤트 enum

추천의 **얕은 상호작용**만 여기서 다룬다. 깊은 결과(checkout/order/adverse)는 V3-04.

| enum | 의미 | 후속(threads to) |
|---|---|---|
| `recommendation_shown` | 추천이 사용자에게 노출됨(가장 기본, 근거 스냅샷 저장 지점). | 모든 downstream의 anchor. |
| `recommendation_clicked` | 추천 카드/상품 클릭(상세 진입). | product_view(V3-04). |
| `recommendation_dismissed` | 사용자가 추천 닫음/무시. | 음성 신호(negative preference 후보). |
| `recommendation_saved` | 찜/저장/위시. | 관심 신호(MemoryFactCandidate 후보, V3-05). |
| `recommendation_added_to_cart` | 장바구니 담기. | add_to_cart → checkout/order(V3-04). |

**규칙:** `recommendation_shown`은 **근거(reason/avoid/safety/confidence)를 반드시 포함**한다(§5 R2).
나머지 event_type은 동일 `recommendation_id`를 참조하며, 근거는 shown 시점 스냅샷을 상속한다(재판단 아님).

★Leo 결정 필요: `recommendation_dismissed`를 negative preference 학습 신호로 쓸지 여부.
"닫음 = 싫음"은 휴리스틱 위험(그냥 스크롤일 수 있음) → 의미 판단은 AI semantic, 저장은 후보(candidate)로만. 승격은 V3-05 gate.

---

## 3. reason_codes / avoid_reason — 근거 enum (후보)

자유서술 대신 구조화 코드. Foundation decision output에서 매핑된다.

**reason_codes (추천 근거):**

| code | 의미 |
|---|---|
| `consultation_match` | 상담에서 표현된 니즈와 일치. |
| `ingredient_fit` | 성분 축이 사용자 상태/목표에 부합. |
| `skin_goal_alignment` | 사용자 목표(진정/보습 등)와 정합. |
| `repurchase_pattern` | 과거 재구매/반복 사용 패턴(장기기억, V3-05 승격분에 한함). |
| `low_irritation_profile` | 저자극 프로파일 우선. |
| `alternative_to_flagged` | safety로 걸러진 상품의 대체 제안. |
| `popular_in_cohort` | 코호트 선호(약한 근거, confidence 낮게). |

**avoid_reason (비추천/보류 근거):**

| code | 의미 |
|---|---|
| `adverse_reaction_history` | 과거 부작용/트러블 이력(safety 우선). |
| `ingredient_conflict` | 성분 충돌/중복 자극 우려. |
| `pregnancy_or_condition_caution` | 임신/상태 관련 주의(의학적 단정 금지, 주의 표기만). |
| `insufficient_evidence` | 근거 부족 → hold/cannot_determine. |
| `safety_gate_block` | safety gate가 block. |
| `user_stated_dislike` | 사용자가 명시적으로 싫다고 함. |

**규칙:** avoid_reason 중 `adverse_reaction_history` / `pregnancy_or_condition_caution` / `safety_gate_block`은
**commerce/revenue 최적화보다 우선**한다(safety-first). "계속 써도 돼?" 류 발화는 safety-first로 처리한다.

★Leo 결정 필요: reason_codes/avoid_reason enum의 **canonical 소유처**가 Foundation contract인지 Cosmile adapter인지.
설계 권고: **Foundation이 canonical enum 소유**, Cosmile은 소비(매핑만). 헌법상 decision/evidence = Foundation.

---

## 4. safety_flags — enum (후보)

| flag | 의미 |
|---|---|
| `adverse_reaction_reported` | 부작용 신고 신호 존재. |
| `sensitive_skin_context` | 민감성 맥락. |
| `pregnancy_context` | 임신 맥락(주의만, 의학 단정 금지). |
| `medical_claim_risk` | 의학적 주장 위험 → 표현 억제. |
| `age_or_minor_context` | 미성년/연령 맥락. |
| `none` | 신호 없음(명시). 빈 배열 대신 명시 저장 옵션. |

**불변식(§8과 연결):** safety_flags·safety_gate_result는 **service semantic/output adapter가 낮출 수 없다**(MAX·fail-closed).
gate가 `block`이면 `recommendation_shown` 저장은 가능하되(감사용) **실제 노출은 억제**되어야 한다 — 저장≠노출.

---

## 5. 무결성 규칙 (validation rules — 후보)

| ID | 규칙 |
|---|---|
| R1 | `subject_ref`와 `anonymous_ref`는 **정확히 하나만** 존재. 둘 다/둘 다 없음 = invalid. |
| R2 | `event_type=recommendation_shown`이면 `reason_codes`(또는 recommend 아닌 경우 `avoid_reason`)·`safety_flags`·`safety_gate_result`·`confidence`·`evidence_mode` 필수. |
| R3 | `safety_gate_result=block`이면 노출 억제(저장은 감사 목적 허용, 실제 사용자 노출 카운트=0). |
| R4 | `consultation_id`가 null이면 `source`는 상담 유발형(`consultation_engine`)일 수 없다. |
| R5 | `confidence`가 낮고 `evidence_mode∈{cannot_determine,uncertain}`이면 강한 추천 문구/단정 금지(표현 톤은 service adapter, 단 safety는 불변). |
| R6 | 모든 이벤트에 `recommendation_id` 필수. shown 이후 이벤트는 기존 shown의 id를 재사용(신규 mint 금지). |
| R7 | Foundation에 전달되는 memory_context는 minimized·request-scoped·`raw_text_stored=false`. raw 발화/PII를 이벤트에 저장 금지. |
| R8 | `avoid_reason`에 safety류 코드가 있으면 commerce 최적화 근거(`popular_in_cohort` 등)로 override 불가. |

**설계 원칙(질문이 옳은가):** 이벤트는 "무엇을 보여줬나"가 아니라 "왜·어떤 안전판단 하에 보여줬고 뭐가 이어졌나"를 저장한다.
따라서 근거 스냅샷(R2)과 downstream 링크(R6)가 계약의 핵심 불변식이다.

---

## 6. source — enum (후보)

| enum | 의미 |
|---|---|
| `consultation_engine` | 상담 결과 기반 추천(consultation_id 필수). |
| `rule_based` | 규칙/필터 기반. |
| `memory_replay` | 장기기억(V3-05 승격분) 기반 재현 추천. |
| `alternative_suggestion` | flagged 상품의 대체. |
| `cohort_baseline` | 코호트 기반(약한 근거). |

---

## 7. recommendation_id → downstream 연결 (V3-04 링크)

`recommendation_id`는 추천 이벤트에서 mint되어, **결과 이벤트가 이를 참조**하는 방향으로 흐른다(one-way anchor).

```
[V3-03] recommendation_shown (rec_v3_XXXX 생성, 근거 스냅샷 저장)
   │  (동일 rec_v3_XXXX 상속)
   ├─ recommendation_clicked
   ├─ recommendation_saved
   └─ recommendation_added_to_cart
             │ recommendation_id = rec_v3_XXXX 참조
             ▼
[V3-04] order_event / feedback_event / outcome_event
   - order_placed        (rec_v3_XXXX → order_id)   → revenue/margin
   - satisfaction_report (rec_v3_XXXX → 만족/불만)
   - adverse_reaction    (rec_v3_XXXX → safety 우선 신호)
   - repurchase          (rec_v3_XXXX → 반복 사용)
             │
             ▼
[V3-05] MemoryFactCandidate → evidence/confidence → LongTermMemoryFact 승격
   - "이 추천이 좋은 결과로 이어졌는가"를 rec_v3_XXXX 체인으로 재구성
   - 단일 신호로 장기기억 확정 금지(candidate → 누적 evidence → promotion)
```

**연결 계약(요지):**
- V3-04 결과 이벤트는 `recommendation_id`(nullable — 추천 없이 발생한 주문도 있으므로)를 optional FK 성격으로 보유.
- 추천→결과 매칭은 `recommendation_id` 우선, 없으면 `(subject_ref|anonymous_ref, product_id, session_id, 시간창)` 근접 매칭은 **후보(candidate)로만**(휴리스틱 → 최종 확정 아님, V3-05 gate 경유).
- 이 매칭 근접 로직의 파라미터(시간창 등)는 상세 설계 시 확정. **자세한 결과 계약은 `COSMILE_MEMORY_V3_04_*` 참조.**

★Leo 결정 필요: 추천 없이 발생한 주문(비추천 유입)을 학습 루프에 포함할지, 아니면 `recommendation_id` 있는 것만 학습 대상으로 할지.

---

## 8. Hard Stop / out-of-scope (이 문서에서 하지 않는 것)

이 설계는 다음을 **하지 않으며 out-of-scope**로 명시한다:
- prod DB 접근 · real secret/Vault view · main merge · live 활성화 · external release · prod DB migration.
- 실제 checkout/order/customer DB write · customer memory live migration · canonical write · learned promotion.
- Cosmile postgres는 **schema/validate 수준**이며 "real DB integration complete"라고 말하지 않는다.

현재 고정 상태값: `applied_to_real_user=false`, live/write/promotion = 0, real user exposure = 0.
다음 단계(DDL/마이그레이션/enum canonical 확정)는 **별도 release train**이 필요하다.

---

## 9. 열린 질문 (요약)

1. ★Leo 결정 필요: reason_codes/avoid_reason/safety_flags enum canonical 소유처(권고: Foundation).
2. ★Leo 결정 필요: `recommendation_dismissed`를 negative preference 학습 신호로 쓸지.
3. ★Leo 결정 필요: 추천 없이 발생한 주문을 학습 루프에 포함할지.
4. ★Leo 결정 필요: 추천→결과 근접 매칭(시간창) 허용 범위 — 어디까지가 candidate이고 어디부터 discard인지.

---

## 무결성

이 문서는 **design-only**(코드/구현/실행 없음)다.
Memory V1 **Option B 상속**(subject_ref/furef service-local mint), **Option A 미상속**(FOUNDATION_SUBJECT_REF_SECRET mint superseded).
Foundation은 **validate/gate/reasoning 전용**이며 durable customer memory DB가 아니고 service DB를 직접 읽지 않는다(minimized request-scoped memory_context만).
customer memory·commerce data는 **service-local 소유**(SIASIU / Cosmile 각자, cross-schema 직접 참조 없음).
**safety-first**(부작용/안전 신호 > commerce/revenue, 의학적 단정 없음, "계속 써도 돼?" 류 safety 우선).
**no prod / no live / no main merge / no real secret**. Cosmile postgres = schema/validate 수준(real DB integration 미완).
