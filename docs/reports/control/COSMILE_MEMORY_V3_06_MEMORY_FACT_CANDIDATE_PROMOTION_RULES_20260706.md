# COSMILE MEMORY V3-06 — MemoryFactCandidate Promotion Rules

> 작성: foundation-control · 2026-07-06 · design-only · no code · Hard Stop 무접촉
> depends_on: [COSMILE_MEMORY_V3_DATA_DICTIONARY_CANONICAL_20260706.md, COSMILE_MEMORY_V3_02_LEARNING_COMMERCE_MEMORY_CONTRACT_20260706.md, COSMILE_MEMORY_V3_04_ORDER_REVENUE_FEEDBACK_OUTCOME_CONTRACT_20260706.md, COSMILE_MEMORY_V3_07_SAFETY_ADVERSE_REACTION_GUARDRAIL_20260706.md] · owns: [candidate→LTM promotion/demotion deterministic gate(R-C1~R-C3·G1~G6·D1~D4·히스테리시스), tombstone/must_not_reappear 선행 조회 규칙(R-C1), gate 실행 순서·INV-1~INV-5] · referenced_by: [COSMILE_MEMORY_V3_00_INDEX_AND_EXECUTIVE_SUMMARY_20260706.md, COSMILE_MEMORY_V3_04_ORDER_REVENUE_FEEDBACK_OUTCOME_CONTRACT_20260706.md, COSMILE_MEMORY_V3_05_PRODUCT_INGREDIENT_INTELLIGENCE_MAPPING_20260706.md, COSMILE_MEMORY_V3_07_SAFETY_ADVERSE_REACTION_GUARDRAIL_20260706.md, COSMILE_MEMORY_V3_08_DB_INTEGRATION_INVARIANT_DESIGN_20260706.md, COSMILE_MEMORY_V3_10_PRE_IMPLEMENTATION_REVIEW_PLAN_20260706.md, COSMILE_MEMORY_V3_DATA_DICTIONARY_CANONICAL_20260706.md]

---

## 0. 이 문서의 범위

이 문서는 **Cosmile Memory V3 — Learning Commerce Memory Loop**의 6번째 설계 파트로,
`MemoryFactCandidate`(단기 후보 사실)가 어떤 **구조화된 조건**을 거쳐 `LongTermMemoryFact`(장기 기억 사실)로
**승격(promote)** 되는지, 그리고 반대로 **강등(demote) / 노후(stale) / 만료(expired) / 안전 override / 사람 검토(human-review)** 로
전이되는지를 규정한다.

핵심 설계 명제 두 가지:

1. **단일 신호로 장기 기억을 확정하지 않는다.** 반드시 `evidence_count` × `confidence` × `정책 gate`를 통과해야 한다.
2. **의미 인식은 AI semantic judgment, 승격/강등 결정은 deterministic policy gate.**
   즉 "고객 발화가 긍정/부정/이상반응인지"의 *의미*는 상위 파트(V3-04 신호 추출)의 AI 판단 결과를 **입력 구조체로 받는다.**
   이 문서의 규칙은 그 **구조화된 state → decision** 만 다룬다. 키워드/정규식으로 raw text 의미를 최종 확정하지 않는다.

관련 형제 문서(실제 파일명):

- `COSMILE_MEMORY_V3_00_INDEX_AND_EXECUTIVE_SUMMARY_20260706.md` — V3 전체 loop overview / 목표 구조
- `COSMILE_MEMORY_V3_02_LEARNING_COMMERCE_MEMORY_CONTRACT_20260706.md` — ltm_fact/candidate 저장 계약 · subject_ref/furef service-local mint & identity 경계 · **memory_context 최소화 계약(19필드·Foundation 전달 payload) 소유**
- `COSMILE_MEMORY_V3_03_RECOMMENDATION_EVENT_CONTRACT_20260706.md` — RecommendationEvent · 얕은 상호작용(impression/click/add_to_cart) 저장 소유(사전 §1.3 R-K7)
- `COSMILE_MEMORY_V3_04_ORDER_REVENUE_FEEDBACK_OUTCOME_CONTRACT_20260706.md` — 주문/매출/피드백 outcome + **semantic 신호 추출 계약 소유**(consultation/commerce event → 구조화 signal, AI semantic)
- `COSMILE_MEMORY_V3_05_PRODUCT_INGREDIENT_INTELLIGENCE_MAPPING_20260706.md` — 제품/성분 intelligence 매핑
- **`COSMILE_MEMORY_V3_06_MEMORY_FACT_CANDIDATE_PROMOTION_RULES_20260706.md`(본 문서)** — Candidate → LongTermMemoryFact promotion/demotion 규칙
- `COSMILE_MEMORY_V3_07_SAFETY_ADVERSE_REACTION_GUARDRAIL_20260706.md` — safety override & adverse-reaction gate 상세 · **AdverseSignalActionMatrix·safety fact lifecycle 정본**
- `COSMILE_MEMORY_V3_08_DB_INTEGRATION_INVARIANT_DESIGN_20260706.md` — DB integration invariant(INV-DB — safety-fact 예외 포함)
- 어휘/enum/threshold 정본 = `COSMILE_MEMORY_V3_DATA_DICTIONARY_CANONICAL_20260706.md`(이하 "사전")

(구판 형제 번호 참조 — "V3-03=memory_context·V3-05=candidate 데이터 모델·V3-08=재추천 개선" — 는 superseded: 패키지 재편 후 실제 파일 번호는 위와 같다.)

> Cosmile postgres는 현재 **schema/validate 수준**이다. 본 문서의 어떤 규칙도 "real DB integration complete"를 의미하지 않는다.
> 모든 승격/강등은 **dev/shadow/readiness 상태**에서 검증 대상이며, prod/live/main/secret에 접촉하지 않는다.

---

## 1. 상태 모델 (Fact lifecycle state machine)

`MemoryFactCandidate`와 `LongTermMemoryFact`는 하나의 논리적 사실(`fact_key` 기준)에 대해 아래 상태를 갖는다.

**저장 계약 정본 = 사전 §2.2/§2.3**: `status` = M2 canonical 3값(`candidate`/`approved`/`rejected`) + 직교 컬럼 `lifecycle_state`(`pending_evidence`·`safety_frozen`·`human_review_required`·`demoted`·`stale`·`expired`·`merged`) + 직교 BOOL `deleted`/`blocked`/`expired`/`must_not_reappear`(tombstone). 아래 라벨은 그 조합의 **표기명(논리 상태)**이지 별도 status enum이 아니다. (구판의 독자 9-state enum 직접 선언은 superseded — 사전 §2.2.)

| 논리 상태(표기) | 정본 표현(status + lifecycle_state + 직교 BOOL — 사전 §2.2/§2.3) | 재추천 사용 가능? |
|---|---|---|
| `candidate_open` | status=`candidate` · lifecycle_state=`pending_evidence`(evidence_count=1) | ❌ (약한 hint로만, 아래 §7) |
| `candidate_accumulating` | status=`candidate` · lifecycle_state=`pending_evidence`(누적 중) | ❌ |
| `promoted_longterm` | status=`approved` · ltm_fact `fact_state=active` | ✅ (단 safety gate 통과 시) |
| `demoted` | lifecycle_state=`demoted` (⇒ status ≠ approved) | ❌ |
| `stale` | lifecycle_state=`stale` (⇒ status ≠ approved) | ❌ (구판 "약화된 가중치만" 표기는 superseded — 사전 §2.2 정합 불변식. 감쇠 가중은 stale 진입 *이전* approved 구간의 confidence decay로만) |
| `expired` | lifecycle_state=`expired` (⇒ status ≠ approved) | ❌ |
| `safety_frozen` | lifecycle_state=`safety_frozen` — 자동 승격/재사용 금지 | ❌ (안전 목적 조회만) |
| `human_review_required` | lifecycle_state=`human_review_required` — 자동 전이 정지 | ❌ |
| `deleted` | 직교 BOOL `deleted=true`(erasure 요청이면 +`must_not_reappear=true` — 사전 §7. consent *철회*는 deleted가 아니라 보존+`reuse_blocked=true`) | ❌ (조회 금지) |

**정합 불변식(사전 §2.2):** `lifecycle_state ∈ {demoted, stale, expired}` ⇒ `status ≠ approved` · `safety_frozen` ⇒ 재추천 차단.

**전이 원칙:** 모든 상태 전이는 **deterministic gate**가 수행한다. AI는 signal의 *의미 라벨*만 제공하고,
전이 여부는 아래 §3~§8의 조건표로 기계적으로 결정된다.

상태 전이 다이어그램(개념):

```
signal 도착
  └─> (candidate 없으면) R-C1 선행 조회(동일 (subject_key, fact_type, fact_target)의
      active/tombstone/must_not_reappear — 사전 §5.1) 통과 후 candidate_open 생성
        └─> 신호 누적 -> candidate_accumulating
              ├─(promotion gate PASS)-> promoted_longterm(status=approved)
              ├─(safety adverse signal)-> matrix 행별 효과(V3-07 AdverseSignalActionMatrix)  [최우선]
              └─(human-review 조건)-> human_review_required
promoted_longterm
  ├─(반증/충돌 gate)-> demoted  [safety fact 제외 — 사전 §5.2]
  ├─(무갱신 시간경과)-> stale -> (추가 경과)-> expired  [safety fact 제외 — 사전 §5.2]
  ├─(adverse signal)-> matrix 행별 효과  [최우선, 언제든 — severe/moderate=safety_frozen·low=candidate 축 한정]
  ├─(consent 철회)-> 보존 + reuse_blocked=true  [deleted 아님 — 사전 §7]
  └─(erasure 요청)-> deleted=true + must_not_reappear=true  [tombstone — 사전 §7]
```

(구 다이어그램의 "adverse signal → 무조건 safety_frozen"·"삭제/consent 철회 → deleted 단일 경로" 표기는 superseded — 사전 §5.3/§7.)

상태 enum 최종 명칭은 **사전 §2.2로 확정**(`safety_frozen` 채택 · `stale`은 별도 lifecycle_state 값 — 구 ★Leo 미결 항목 해소, superseded — 사전 §2.2).

---

## 2. fact_key / fact_type 분류

승격 규칙은 `fact_type`별로 threshold가 다르다. 사실은 **`(subject_key, fact_type, fact_target)`**로 식별한다
(`subject_key = COALESCE(subject_ref, guest_ref)` — 사전 §1.1. 구판 `(subject_ref, …)` 표기는 superseded — 사전 §1.1).

**fact_type / fact_target / direction 값 목록 정본 = 사전 §2.1** — 본 문서는 값 목록을 재선언하지 않는다(구판 직접 선언 표는 superseded — 사전 §2.1). 본 문서 관점의 의미(promotion 규칙 축)만 요약:

- **positive/negative 축**(ingredient/product/category의 affinity·aversion·preference·avoidance): §3~§5의 일반 promotion/demotion gate를 탄다.
- **safety 축**(direction=safety — `ingredient_adverse`·`product_adverse`): **§6 safety 경로 전용** — 일반 gate를 타지 않고(R-P2), evidence 문턱 강등 대상도 아니다(사전 §5.2).
- **behavioral 축**(`repurchase_pattern`·`seasonal_pattern`): 시간 분산 요구(DE-3). `repurchase_pattern`의 target은 **product_id 기준**(사전 §1.3 R-K5 — sku 무관·변형 포함).
- **context 축**(`skin_condition_context`): HR-4 민감 검토 대상.
- **RESERVED 타입**(수집·승격 금지)은 사전 §2.1을 따른다.

> `fact_target`은 항상 **정규화된 식별자**(사전 §1.1 — ingredient_id/sku_id/product_id/category_id)로 저장한다.
> raw 발화 텍스트/PII는 저장하지 않는다(§9, `raw_text_stored=False` 유지).

★Leo 결정 필요(유지 — 사전 §2.1도 미결로 유지): `skin_condition_context`를 memory fact로 둘지, 아니면 상담 context로만 두고 장기 기억에서 제외할지
(민감정보 성격 — `COSMILE_MEMORY_V3_02_LEARNING_COMMERCE_MEMORY_CONTRACT_20260706.md`의 memory_context 최소화 계약과 충돌 여지).

---

## 3. Candidate 생성 조건 (creation conditions)

신호 1건이 들어오면 아래를 판정한다. **1건만으로는 절대 장기 기억이 되지 않는다.**

### 3.1 생성 트리거(예시 → 구조화 조건)

| # | 트리거(현상) | 구조화 조건(입력 signal state) | 생성되는 candidate fact_type |
|---|---|---|---|
| T1 | 같은 성분에 긍정 피드백 2회 이상 | `signal.kind=positive_feedback` & 동일 `ingredient_id` 누적 ≥2 | `ingredient_affinity` |
| T2 | 추천→구매→만족 | `recommended=true` → `order.paid=true` → `satisfaction≥threshold` 연쇄 | `product_affinity` / `ingredient_affinity` |
| T3 | 추천→이상반응 피드백 | `recommended=true` → `adverse_signal=true` | `ingredient_adverse`(**safety 경로**) |
| T4 | 재구매 | 동일 **product_id** `order.paid` 횟수 ≥2(사전 §1.3 R-K5 — sku 변형 포함·구 sku_id 기준은 superseded), 간격 유효(window = 사전 §4) | `repurchase_pattern` |
| T5 | 계절 반복 구매 | 동일 (category, season) 구매가 서로 다른 연도/시즌에 ≥2 | `seasonal_pattern` |
| T6 | 특정 성분/제품군 반복 회피 | `recommended` 되었으나 `declined`/`negative_feedback` 누적 ≥2 (동일 target) | `ingredient_aversion` / `category_avoidance` |

**생성 규칙 R-C1 (tombstone 선행 조회 — 사전 §5.1):** candidate **생성/승격 전에** 동일 `(subject_key, fact_type, fact_target)`의
**active/tombstone(`deleted`/`blocked`/`expired` BOOL)/`must_not_reappear` 상태 조회를 선행**한다. 조회 없이 생성/승격하면 계약 위반이다.

- `must_not_reappear=true`인 deleted/blocked/tombstoned fact는 **candidate로 재생성 금지**(erasure 이후 자동 재등장 금지 — 고객의 명시 재진술만 신규 fact 후보로 허용하며, 그 경우도 safety review 경유 — 사전 §5.1).
- **promotion은 tombstone을 우회할 수 없다.**
- **SAFETY∩SINGLE(사전 §5.1):** safety 성격 SINGLE fact는 `subject_key + fact_type` 기준 **active ≤ 1**(SINGLE supersede 우선).
- 위 조회 통과 후: 해당 candidate가 없으면 `candidate_open`으로 신규 생성하고 `evidence_count=1`로 시작한다. 이미 있으면 신호를 append하고 evidence를 갱신한다(§4).

**생성 규칙 R-C2:** `adverse_signal=true`(T3 계열)는 **evidence_count 1이라도** 즉시 `ingredient_adverse` candidate를 만들고
동시에 **safety 경로(§6)** 를 트리거한다 — 단 이는 "장기 기억 확정"이 아니라 **안전 보호(frozen/차단)** 목적이다.
안전은 evidence_count 문턱을 기다리지 않는다(fail-closed).

**생성 규칙 R-C3:** 상충 신호(같은 target에 대해 affinity와 aversion 동시)가 존재하면 candidate를 만들되
`conflict_flag=true`로 표시하고 §5 강등/§7 human-review 판정 대상으로 넘긴다.

---

## 4. evidence_count / confidence 산정

### 4.1 evidence_count

`evidence_count`는 **서로 독립적인 근거 신호의 수**다. 아래 중복제거 규칙을 적용한다.

- **DE-1 동일 이벤트 중복 금지:** 같은 `order_id`/같은 상담 `session_id`에서 나온 동종 신호는 **1로 집계**한다.
  (한 주문의 만족 표현을 여러 번 말해도 evidence 1)
- **DE-2 이질 근거 가중:** 서로 다른 근거 종류(예: 재구매 행동 + 명시적 긍정 발화)는 각각 +1로 집계 가능.
- **DE-3 시간 분산 요구(behavioral):** `repurchase_pattern`/`seasonal_pattern`은 **서로 다른 시점**의 이벤트여야 evidence로 인정.

### 4.2 confidence

`confidence ∈ [0.0, 1.0]`. deterministic 계산식(가중 합, 상한 clamp):

```
confidence = clamp01(
    base(fact_type)
  + w_evidence * min(evidence_count, EVIDENCE_CAP)
  + w_purchase * has_purchase_evidence
  + w_satisfaction * satisfaction_norm
  + w_diversity  * distinct_evidence_kinds
  - w_conflict   * conflict_flag
  - w_decay      * staleness_norm
)
```

- `base(fact_type)`: 안전/행동/선호별 초기 신뢰(예: adverse는 별도 경로라 여기서 base 낮게 두되 gate는 별도).
- `has_purchase_evidence`: 실제 구매(order.paid)로 뒷받침되면 가중(말뿐인 선호보다 강함).
- `satisfaction_norm`: 만족도 정규화값(0~1).
- `distinct_evidence_kinds`: 서로 다른 근거 종류 수(DE-2).
- `conflict_flag`, `staleness_norm`: 감점 요인.

★Leo 결정 필요: 가중치(`w_*`) 초기값과 `EVIDENCE_CAP`. 본 문서는 **구조와 방향(부호)** 만 확정하고,
실제 수치는 V3-06 companion `.json`(예: `..._promotion_thresholds.json`)에서 튜닝 대상으로 분리 제안.

> ★주의: 이 계산식은 **결정 가능(deterministic)** 해야 한다. AI가 confidence 숫자를 직접 만들지 않는다.
> AI는 signal 라벨(positive/negative/adverse/satisfaction level)만 제공, 숫자는 gate가 산정.

---

## 5. 승격 threshold (promotion gate)

`candidate_accumulating` → `promoted_longterm` 전이는 아래 **모든** 조건을 만족해야 한다(AND).

| gate 조건 | 규칙 |
|---|---|
| G1 evidence_count | `evidence_count ≥ MIN_EVIDENCE(fact_type)` — 기본 하한 = **N_min=2 · distinct_signal_source_count ≥ 2**(사전 §3. fact_type별 상향 — 예: 카테고리=3 — 은 ★Leo 파라미터 표 사전 §4) |
| G2 confidence | `confidence ≥ C_min = 0.60`(사전 §3 — 구 0.70 초안은 superseded — 사전 §3) |
| G3 no active safety block | `ingredient_adverse`/`safety_frozen`와 target 충돌 없음 |
| G4 no unresolved conflict | `conflict_flag=false` 또는 conflict 해소됨 |
| G5 consent valid | `memory_reuse_decision ∈ {allowed}` (consent_required/blocked/deleted면 승격 금지) |
| G6 not expired | candidate가 stale/expired 아님 |

**규칙 R-P1(연쇄 강근거):** T2(추천→구매→만족)처럼 **추천·구매·만족이 하나의 연쇄로 연결**되면
단일 fact_type에 대해 evidence를 강하게 인정할 수 있으나, **여전히 G1(≥2)** 를 우회하지 않는다.
즉 "추천→구매→만족" 1연쇄는 강한 1근거이지 2근거가 아니다(DE-1).

★Leo 결정 필요: T2 단일 연쇄를 evidence_count=2로 볼지(구매+만족을 이질 근거로 DE-2 적용) 1로 볼지.
안전 보수적 기본값 = **1근거**(장기 기억 확정에 최소 2회 독립 확인 요구). 반대 의견 있으면 조정.

**규칙 R-P2(safety 우선):** `ingredient_adverse`/`product_adverse` 계열(direction=safety — 사전 §2.1)은 이 §5의 "선호/추천 강화형 승격" gate를 **타지 않는다.**
adverse는 §6 안전 경로로만 처리되며, 그 결과는 "회피(aversion) 장기 기억화 + 재추천 차단"이지 "선호 승격"이 아니다.
또한 **safety fact는 일반 evidence 문턱(사전 §3)의 강등 대상이 아니다**(사전 §5.2 — deactivation은 V3-07 소유의 3경로로만·§8.1 safety-fact 예외).

---

## 6. Safety override (최우선 · dominate)

> Safety / adverse-reaction 신호는 commerce/revenue 최적화보다 **항상 우선**한다.
> service semantic/output adapter가 safety를 낮출 수 없다(MAX · fail-closed). 상세: `COSMILE_MEMORY_V3_07_SAFETY_ADVERSE_REACTION_GUARDRAIL_20260706.md`.

**SO-1 (matrix 행별 즉시 효과 — 정본 = V3-07 AdverseSignalActionMatrix):** `adverse_signal=true`가 특정 target(`ingredient_id`/`sku_id`)에 도착하면,
즉시 효과는 `adverse_severity × adverse_certainty`(사전 §2.4/§2.5) **matrix 행별로** 결정한다
(정본: `COSMILE_MEMORY_V3_07_SAFETY_ADVERSE_REACTION_GUARDRAIL_20260706.md` §4.5 = 사전 §5.3):

- severe×reported = **즉시 safety_block + recommend_hold**(해당 target — evidence_count 문턱 없이).
- moderate×reported = **safety_caution + 재추천 반복 금지(until review)**.
- low×reported = **caution_memory_candidate + no automatic commerce boost**(같은 축 positive candidate 강등 — **target 축 한정**, 전체 affinity 동결 아님·무시 금지).
- low×repeated = moderate 상당으로 escalate · any×verified = active safety fact · matrix 밖 조합 = fail-closed 상위 처리.

(구판 "severity 무관 해당 target 전부 즉시 safety_frozen" 서술은 superseded — 사전 §5.3.) 어느 행이든 **commerce 최적화보다 우선**한다.

**SO-2 (선호 override):** 같은 target에 기존 `promoted_longterm` affinity가 있어도,
matrix가 block/caution+avoid를 지시하는 행(severe·moderate·low×repeated escalate)의 adverse 신호가 오면 **affinity는 재추천 사용 중단**되고 safety가 이긴다.
low×reported는 matrix low 행 효과(같은 축 candidate 강등 + no boost — 승격 affinity의 즉시 무력화가 아님)를 적용한다.
"계속 써도 돼?" 류 표현은 **safety-first**로 처리 — 긍정 재구매 신호로 자동 해석하지 않는다.

**SO-3 (의료 단정 금지):** adverse fact는 "이 성분이 당신에게 알레르기다" 같은 **의료적 단정을 저장/생성하지 않는다.**
저장 형태는 "이 target에 대해 adverse 신호 관측 → 재추천 보류/회피 권고" 수준의 **행동 정책 사실**로 한정한다.

**SO-4 (해제 조건):** `safety_frozen` 해제는 자동 승격으로 하지 않는다.
해제는 (a) 명시적 고객 정정 + (b) §7 human-review 통과가 **둘 다** 있을 때만 후보가 된다.
상세 절차 정본 = V3-07 safety fact lifecycle(사전 §5.2 — deactivation 3경로: safety-resolution rule·consent/erasure·verified correction). ★Leo 결정 필요(해제 정책 승인).

**SO-5 (dominance 불변식):** 어떤 승격/재사용 규칙도 **V3-07 AdverseSignalActionMatrix(사전 §5.3)와 safety fact lifecycle(사전 §5.2)**을 우회할 수 없다
(SO-1~SO-4는 그 집행이다 — 우회 불가 유지).
safety fact는 evidence 문턱 강등의 대상이 아니다(사전 §5.2).
gate 실행 순서에서 **safety 판정이 항상 먼저** 평가된다(§9 실행 순서).

---

## 7. Human-review-required 조건

자동 전이를 멈추고 사람 검토로 보내는 조건. 검토 전에는 **재추천에 사용하지 않는다.**

| # | 조건 | 근거 |
|---|---|---|
| HR-1 | `conflict_flag=true`가 gate로 해소되지 않음(강한 affinity ↔ aversion 동시, 근거 대등) | 오학습 방지 |
| HR-2 | adverse 신호와 재구매 신호가 **동시** 존재(SO와 충돌) | 안전-매출 충돌 명시적 검토 |
| HR-3 | 짧은 기간 급격한 신호 역전(예: 승격 직후 반증) | 신호 노이즈/오탐 |
| HR-4 | `skin_condition_context` 등 민감 context 승격 시도 | 프라이버시/민감정보 |
| HR-5 | consent 상태 모호(`consent_required`인데 강신호 누적) | consent 우선 |
| HR-6 | 동일 subject에 대해 대량/이상 패턴(비정상 evidence 폭증) | 이상치/abuse |

**규칙 R-HR1:** human-review는 **차단형(blocking)** 이다 — 결정 전까지 해당 fact는 `promoted_longterm`로 못 간다.
**규칙 R-HR2:** review 결과는 audit에 남기되 raw text/PII 없이 **structured decision(approve/reject/hold + reason_code)** 만 저장.

★Leo 결정 필요: human-review의 운영 주체(누가/어떤 도구로)와, dev/shadow 단계에서는 review를
"auto-hold(자동 보류만, 승인은 나중)"로 둘지 여부.

---

## 8. Demotion / stale / expired (강등·노후·만료)

### 8.1 Demotion (승격 후 강등)

`promoted_longterm` → `demoted` 전이 조건(OR):

| # | 조건 |
|---|---|
| D1 | 동일 target에 대해 **반증 신호**(negative/aversion) 누적이 기존 근거를 상쇄(net evidence ≤ DEMOTE_FLOOR) |
| D2 | `confidence < DEMOTE_THRESHOLD`(< C_min, 히스테리시스로 재진동 방지) |
| D3 | consent 철회/차단(`memory_reuse_decision ∈ {blocked, consent_required}`) → 사용 중단(**정본 — 사전 §7 `consent_state=withdrawn`: fact 보존 + `reuse_blocked=true`.** deleted 아님·consent 회복 시 해제 가능) |
| D4 | adverse 신호(→ §6, V3-07 AdverseSignalActionMatrix 행별 — safety_frozen 우선 적용) |

**반증 신호 매핑(V3-04 → D1/D2):** V3-04 부정 outcome은 강등 반증 신호로 집계된다 —
`feedback_type=refund_return`(사전 §2.11)·`semantic_label=dissatisfied`(사전 §2.12)는 각각 D1의 net evidence 상쇄와 D2의 confidence 하향 입력에 매핑된다
(부분 환불은 order_item 단위 재계산 — 사전 §1.3 R-K4).

**★safety-fact 예외(사전 §5.2):** direction=safety fact(`ingredient_adverse`·`product_adverse`)는 **D1/D2 evidence 문턱 강등의 대상이 아니다.**
deactivation은 V3-07 소유의 3경로(safety-resolution rule·consent/erasure rule·verified correction)로만 가능하며, commerce/margin 로직은 active safety fact를 강등·약화할 수 없다.

> **히스테리시스 규칙 R-D1:** `C_min > DEMOTE_THRESHOLD`로 두어 경계값 근처에서
> 승격↔강등이 매 신호마다 진동하지 않게 한다. (promote = C_min 0.60 — 사전 §3. demote 간격 ★Leo 결정 필요. 구 "promote 0.70 / demote 0.55" 예시는 superseded — 사전 §3.)

### 8.2 Stale (노후)

- **S1:** `last_evidence_at` 이후 `STALE_AFTER` = **180d 무신호**(사전 §4 — 구 "90~180일" 범위 표기는 superseded. fact_type별 조정은 ★Leo 파라미터) → `stale`.
- 감쇠(`w_decay * staleness_norm`)는 stale 진입 **이전** approved 구간의 confidence에 반영된다. stale 진입 후에는 재추천 사용 금지(§1 정합 불변식 — 사전 §2.2).
- **safety fact는 감쇠/stale 약화 대상이 아니다**(adverse는 시간으로 약화되지 않음 — 사전 §5.2). ★안전 예외.

### 8.3 Expired (만료)

- **E1:** `stale` 이후 추가 `EXPIRE_AFTER` 경과, 또는 정책상 최대 보존기간(retention — 사전 §2.7 retention_policy + TTL 파라미터) 초과 → `expired`.
- **E2:** expired fact는 **재추천에 사용 금지**. 조회 시 `memory_reuse_decision=expired` 반환.
- **E3 (정정 — 사전 §7 lifecycle로 통일. 구 "고객 삭제/consent 철회 → 즉시 deleted" 단일 경로 서술은 superseded — 사전 §7):**
  - `consent_state=withdrawn`(철회) = fact **보존** + `reuse_blocked=true`(재사용/승격 입력 제외 — deleted 아님·consent 회복 시 해제 가능).
  - `erasure_requested`(삭제 요청) = `deleted=true` + `must_not_reappear=true`(tombstone — 조회 금지·candidate 재생성 금지 R-C1).
- **E4 (guest→user merge — 사전 §7):** `guest_to_user_merge`는 guest candidate/fact/evidence_count를 subject_ref로 이관하되 **승격 상태는 재평가**(자동 approved 승계 금지) — 단 **safety fact는 승계**(안전 방향). `allow_link=false`면 병합 거부.
- **E5 (un-learning — 사전 §7):** 승격 fact 삭제/철회 시 그 fact가 기여한 **파생 추천 가중/suppression을 함께 회수**한다 —
  fact_id를 참조하는 reason_code/suppression 엔트리를 무효화하고 다음 추천 산출부터 미반영. 회수 완료는 audit log(boolean)로 기록(raw 미보존·fact_id 참조만으로 회수 가능해야 함).

★Leo 결정 필요: fact_type별 `STALE_AFTER` / `EXPIRE_AFTER` / 최대 retention 기간(특히 seasonal_pattern은 연 단위라 길어야 함) — 확정 파라미터 단일 표 = 사전 §4.

---

## 9. 정책 gate 실행 순서 (deterministic evaluation order)

한 신호가 도착했을 때, gate는 **아래 고정 순서**로 평가한다(안전 우선 불변식 보장).

```
1) consent/삭제 확인      -> deleted/blocked/reuse_blocked면 사용 중단, 저장정책만 적용(사전 §7)
2) SAFETY 판정(§6)        -> adverse면 V3-07 AdverseSignalActionMatrix 행별 효과 (최우선, 이후 단계에서 승격 금지)
3) human-review 판정(§7)  -> 해당되면 blocking hold
4) candidate 생성/누적(§3~4) -> R-C1 tombstone/must_not_reappear 선행 조회(사전 §5.1) 후 evidence_count / confidence 갱신
5) promotion gate(§5)     -> 모든 조건 AND면 promoted_longterm
6) demotion/stale/expired(§8) -> 배치/조회시 재평가(safety fact 제외 — 사전 §5.2)
7) audit 기록             -> structured only (raw text/PII 금지)
```

**불변식(INV):**

- INV-1: 2번(safety)이 3~5번보다 **항상 먼저** 평가된다.
- INV-2: `evidence_count < MIN_EVIDENCE`인 어떤 fact도 `promoted_longterm`이 될 수 없다(adverse는 §6 별도 경로).
- INV-3: `promoted_longterm` & `safety_frozen`이 동시에 참일 수 없다(safety가 이김).
- INV-4: `memory_reuse_decision ∈ {blocked, deleted, expired, consent_required}`면 재추천 사용 0건.
- INV-5: 모든 전이는 `reason_codes[]`와 `trace_id`를 남긴다. `applied_to_real_user=false`, `write_performed=false`.

> 이 순서/불변식은 dev/shadow readiness 테스트에서 **커버리지·invariant 카운터**로 검증 대상(코드 아님, 설계 계약).

---

## 10. Foundation 경계 (역할 분리 재확인)

- **Cosmile(service-local)** 이 candidate/장기 기억 **저장·소유**(postgres schema `cosmile`, schema/validate 수준).
  cross-schema 직접 참조 없음(siasiu schema 직접 read 금지).
- **Foundation** 은 이 전이의 **validate/gate/reasoning ONLY** 다.
  Foundation은 durable customer memory DB가 아니며 Cosmile/SIASIU service DB를 직접 읽지 않는다.
  Foundation에는 **최소화된 request-scoped `memory_context`** 만 전달된다
  (raw text/PII 없음, `raw_text_stored=False`, `request_scoped=True`). 상세(계약 소유) = `COSMILE_MEMORY_V3_02_LEARNING_COMMERCE_MEMORY_CONTRACT_20260706.md`(19필드 표 + Foundation 전달 최소화 절).
- subject_ref / furef mint는 **service-local**(V1 Option B 상속). Option A / `FOUNDATION_SUBJECT_REF_SECRET` mint는 **상속하지 않음(superseded)**.
  - `subject_ref = subj_v2_ + HMAC(<SVC>_SUBJECT_SECRET, '<svc>:subject:' + ref)[:32]`
  - `furef = furef_v2_ + HMAC(<SVC>_FUREF_SECRET, '<svc>:local_user:' + ref)[:32]`(cross-producer consistent)
  - ★실제 secret 값은 이 문서/코드/로그에 절대 등장하지 않는다. key 이름만 참조.

---

## 11. 검증 계획(설계 차원, 코드 아님)

이 규칙은 향후 dev/shadow readiness에서 아래 **케이스군**으로 검증되어야 한다(구현은 별도 release train):

- 승격 케이스: T1~T6 각각 evidence 누적 → threshold 도달 → `promoted_longterm` (긍정 경로).
- 미승격 케이스: evidence_count=1, confidence<threshold, consent 미충족 → 승격 안 됨(INV-2/INV-4).
- 안전 케이스: adverse 신호 → matrix 행별 효과(severe=즉시 block+hold·moderate=caution+반복 금지·low=caution candidate+no boost — SO-1/SO-2), "계속 써도 돼?" safety-first. tombstone/must_not_reappear 재생성 시도 → R-C1이 거부.
- 강등 케이스: 승격 후 반증 → `demoted`, 히스테리시스로 진동 없음(R-D1).
- 노후/만료 케이스: stale 감쇠, expired 재사용 0(단 safety fact 비감쇠).
- human-review 케이스: conflict/adverse+repurchase 동시 → blocking hold.
- 불변식 카운터: INV-1~INV-5가 전 케이스에서 위반 0.

> 성공 기준은 **"깨지는 케이스를 재현하고 gate가 올바르게 막는다"** 로 검증한다(단순 초록색 아님).
> 기존 Cosmile readiness(164/164)·loop(v0.1) 회귀는 유지 대상이며 삭제/약화하지 않는다.

---

## 12. Hard Stop (out-of-scope, 무접촉)

이 문서와 후속 구현 지시에서 **하지 않는 것**:

- prod DB access / prod DB migration / backfill
- real secret / Vault write / prod secret view
- main merge / live activation / external release
- real user exposure / checkout·order·customer DB write / canonical write / learned promotion(운영 반영)

이 설계는 **"자동 실행"이 아니라 "자동화 가능한 memory/learning 구조"를 짓는 것**이 목표다.
실제 live 승격/재사용은 별도 승인 release train에서만 다룬다.

---

## 무결성

- **design-only** — 코드/구현/실행 없음. 어떤 것도 "구현됨/테스트됨"으로 주장하지 않는다(계획 문서).
- **V1 Option B 상속** — subject_ref/furef service-local mint. **Option A / FOUNDATION_SUBJECT_REF_SECRET mint는 상속하지 않음(superseded).**
- **Foundation = validate/gate/reasoning ONLY** — durable customer memory DB 아님, service DB 직접 read 안 함, 최소화 request-scoped memory_context만 전달.
- **service-local ownership** — Cosmile/SIASIU 각자 자기 customer memory + commerce data 소유(schema `cosmile`/`siasiu`, cross-schema 직접 참조 금지). Cosmile postgres는 **schema/validate 수준**(real DB integration complete 아님).
- **safety-first** — adverse/safety override가 commerce/revenue 최적화보다 항상 우선(fail-closed, MAX). 의료 단정 없음. "계속 써도 돼?" safety-first.
- **단일 신호 장기 기억 확정 금지** — evidence_count × confidence × deterministic gate. 의미=AI semantic, 승격/강등=deterministic policy gate(키워드 휴리스틱 최종 판단 금지).
- **no prod / no live / no main / no secret** — Hard Stop 무접촉. `applied_to_real_user=false`, `write_performed=false`. 실 secret 값 미등장.
