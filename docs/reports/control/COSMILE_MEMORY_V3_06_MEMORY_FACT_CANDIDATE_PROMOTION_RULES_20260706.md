# COSMILE MEMORY V3-06 — MemoryFactCandidate Promotion Rules

> 작성: foundation-control · 2026-07-06 · design-only · no code · Hard Stop 무접촉

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

관련 형제 문서(파일명 참조):

- `COSMILE_MEMORY_V3_01_...` — V3 전체 loop overview / 목표 구조
- `COSMILE_MEMORY_V3_02_...` — subject_ref / furef service-local mint & identity 경계
- `COSMILE_MEMORY_V3_03_...` — memory_context 최소화 계약(Foundation 전달 payload)
- `COSMILE_MEMORY_V3_04_...` — 신호 추출(consultation/commerce event → 구조화 signal, AI semantic)
- `COSMILE_MEMORY_V3_05_...` — MemoryFactCandidate 데이터 모델 / 저장 스키마
- **`COSMILE_MEMORY_V3_06_...`(본 문서)** — Candidate → LongTermMemoryFact promotion/demotion 규칙
- `COSMILE_MEMORY_V3_07_...` — safety override & adverse-reaction gate 상세
- `COSMILE_MEMORY_V3_08_...` — next-recommendation feedback(장기 기억 → 재추천 개선)

> Cosmile postgres는 현재 **schema/validate 수준**이다. 본 문서의 어떤 규칙도 "real DB integration complete"를 의미하지 않는다.
> 모든 승격/강등은 **dev/shadow/readiness 상태**에서 검증 대상이며, prod/live/main/secret에 접촉하지 않는다.

---

## 1. 상태 모델 (Fact lifecycle state machine)

`MemoryFactCandidate`와 `LongTermMemoryFact`는 하나의 논리적 사실(`fact_key` 기준)에 대해 아래 상태를 갖는다.

| state | 설명 | 재추천 사용 가능? |
|---|---|---|
| `candidate_open` | 후보 생성됨, 아직 threshold 미달 | ❌ (약한 hint로만, 아래 §7) |
| `candidate_accumulating` | 신호 누적 중, evidence_count 증가 | ❌ |
| `promoted_longterm` | 장기 기억으로 승격됨 | ✅ (단 safety gate 통과 시) |
| `demoted` | 승격 후 반증/충돌로 강등됨 | ❌ |
| `stale` | 최근 갱신 없음(시간 경과), 신뢰도 감쇠 | ⚠️ 약화된 가중치만 |
| `expired` | 유효기간 초과, 재추천 사용 금지 | ❌ |
| `safety_frozen` | 안전 신호로 override됨 — 자동 승격/재사용 금지 | ❌ (안전 목적 조회만) |
| `human_review_required` | 사람 검토 대기 — 자동 전이 정지 | ❌ |
| `deleted` | 고객 삭제/consent 철회 | ❌ (조회 금지) |

**전이 원칙:** 모든 상태 전이는 **deterministic gate**가 수행한다. AI는 signal의 *의미 라벨*만 제공하고,
전이 여부는 아래 §3~§8의 조건표로 기계적으로 결정된다.

상태 전이 다이어그램(개념):

```
signal 도착
  └─> (candidate 없으면) candidate_open 생성
        └─> 신호 누적 -> candidate_accumulating
              ├─(promotion gate PASS)-> promoted_longterm
              ├─(safety adverse signal)-> safety_frozen  [최우선]
              └─(human-review 조건)-> human_review_required
promoted_longterm
  ├─(반증/충돌 gate)-> demoted
  ├─(무갱신 시간경과)-> stale -> (추가 경과)-> expired
  ├─(adverse signal)-> safety_frozen  [최우선, 언제든]
  └─(고객 삭제/consent 철회)-> deleted  [언제든]
```

★Leo 결정 필요: 상태 enum 최종 명칭(특히 `safety_frozen` vs `safety_override_hold`)과,
`stale`을 별도 상태로 둘지 `promoted_longterm`의 감쇠 속성으로 둘지.

---

## 2. fact_key / fact_type 분류

승격 규칙은 `fact_type`별로 threshold가 다르다. 사실은 `(subject_ref, fact_type, fact_target)`로 식별한다.

| fact_type | 의미 | fact_target 예 | 방향성 |
|---|---|---|---|
| `ingredient_affinity` | 특정 성분 선호/긍정 | ingredient_id | positive |
| `ingredient_aversion` | 특정 성분 회피/부정 | ingredient_id | negative |
| `ingredient_adverse` | 특정 성분 이상반응 | ingredient_id | **safety** |
| `product_affinity` | 특정 제품/SKU 선호 | sku_id | positive |
| `product_aversion` | 특정 제품 회피 | sku_id | negative |
| `category_preference` | 카테고리/제품군 선호 | category_id | positive |
| `category_avoidance` | 카테고리/제품군 회피 | category_id | negative |
| `repurchase_pattern` | 재구매 패턴 | sku_id / ingredient_id | behavioral |
| `seasonal_pattern` | 계절 반복 구매 | (category_id, season) | behavioral |
| `skin_condition_context` | 피부 상태/맥락(민감성 등) | condition_code | context |

> `fact_target`은 항상 **정규화된 식별자**(ingredient_id/sku_id/category_id)로 저장한다.
> raw 발화 텍스트/PII는 저장하지 않는다(§9, `raw_text_stored=False` 유지).

★Leo 결정 필요: `skin_condition_context`를 memory fact로 둘지, 아니면 상담 context로만 두고 장기 기억에서 제외할지
(민감정보 성격 — V3-03 memory_context 최소화 계약과 충돌 여지).

---

## 3. Candidate 생성 조건 (creation conditions)

신호 1건이 들어오면 아래를 판정한다. **1건만으로는 절대 장기 기억이 되지 않는다.**

### 3.1 생성 트리거(예시 → 구조화 조건)

| # | 트리거(현상) | 구조화 조건(입력 signal state) | 생성되는 candidate fact_type |
|---|---|---|---|
| T1 | 같은 성분에 긍정 피드백 2회 이상 | `signal.kind=positive_feedback` & 동일 `ingredient_id` 누적 ≥2 | `ingredient_affinity` |
| T2 | 추천→구매→만족 | `recommended=true` → `order.paid=true` → `satisfaction≥threshold` 연쇄 | `product_affinity` / `ingredient_affinity` |
| T3 | 추천→이상반응 피드백 | `recommended=true` → `adverse_signal=true` | `ingredient_adverse`(**safety 경로**) |
| T4 | 재구매 | 동일 sku_id `order.paid` 횟수 ≥2, 간격 유효 | `repurchase_pattern` |
| T5 | 계절 반복 구매 | 동일 (category, season) 구매가 서로 다른 연도/시즌에 ≥2 | `seasonal_pattern` |
| T6 | 특정 성분/제품군 반복 회피 | `recommended` 되었으나 `declined`/`negative_feedback` 누적 ≥2 (동일 target) | `ingredient_aversion` / `category_avoidance` |

**생성 규칙 R-C1:** 해당 `(subject_ref, fact_type, fact_target)` candidate가 없으면 `candidate_open`으로 신규 생성하고
`evidence_count=1`로 시작한다. 이미 있으면 신호를 append하고 evidence를 갱신한다(§4).

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
| G1 evidence_count | `evidence_count ≥ MIN_EVIDENCE(fact_type)` (예: 선호=2, 행동=2 서로 다른 시점, 카테고리=3) |
| G2 confidence | `confidence ≥ PROMOTE_THRESHOLD(fact_type)` (예: 0.70 제안) |
| G3 no active safety block | `ingredient_adverse`/`safety_frozen`와 target 충돌 없음 |
| G4 no unresolved conflict | `conflict_flag=false` 또는 conflict 해소됨 |
| G5 consent valid | `memory_reuse_decision ∈ {allowed}` (consent_required/blocked/deleted면 승격 금지) |
| G6 not expired | candidate가 stale/expired 아님 |

**규칙 R-P1(연쇄 강근거):** T2(추천→구매→만족)처럼 **추천·구매·만족이 하나의 연쇄로 연결**되면
단일 fact_type에 대해 evidence를 강하게 인정할 수 있으나, **여전히 G1(≥2)** 를 우회하지 않는다.
즉 "추천→구매→만족" 1연쇄는 강한 1근거이지 2근거가 아니다(DE-1).

★Leo 결정 필요: T2 단일 연쇄를 evidence_count=2로 볼지(구매+만족을 이질 근거로 DE-2 적용) 1로 볼지.
안전 보수적 기본값 = **1근거**(장기 기억 확정에 최소 2회 독립 확인 요구). 반대 의견 있으면 조정.

**규칙 R-P2(safety 우선):** `ingredient_adverse` 계열은 이 §5의 "선호/추천 강화형 승격" gate를 **타지 않는다.**
adverse는 §6 안전 경로로만 처리되며, 그 결과는 "회피(aversion) 장기 기억화 + 재추천 차단"이지 "선호 승격"이 아니다.

---

## 6. Safety override (최우선 · dominate)

> Safety / adverse-reaction 신호는 commerce/revenue 최적화보다 **항상 우선**한다.
> service semantic/output adapter가 safety를 낮출 수 없다(MAX · fail-closed). 상세: `COSMILE_MEMORY_V3_07_...`.

**SO-1 (즉시 freeze):** `adverse_signal=true`가 특정 `ingredient_id`/`sku_id`에 대해 도착하면,
해당 target의 모든 관련 fact(affinity 포함)를 **즉시 `safety_frozen`** 으로 전이하고
`ingredient_adverse` / `product_aversion` fact를 **evidence_count 문턱 없이** 재추천 차단 근거로 활성화한다.

**SO-2 (선호 override):** 같은 target에 기존 `promoted_longterm` affinity가 있어도,
adverse 신호가 오면 **affinity는 즉시 무력화**(재추천 사용 중단)되고 safety가 이긴다.
"계속 써도 돼?" 류 표현은 **safety-first**로 처리 — 긍정 재구매 신호로 자동 해석하지 않는다.

**SO-3 (의료 단정 금지):** adverse fact는 "이 성분이 당신에게 알레르기다" 같은 **의료적 단정을 저장/생성하지 않는다.**
저장 형태는 "이 target에 대해 adverse 신호 관측 → 재추천 보류/회피 권고" 수준의 **행동 정책 사실**로 한정한다.

**SO-4 (해제 조건):** `safety_frozen` 해제는 자동 승격으로 하지 않는다.
해제는 (a) 명시적 고객 정정 + (b) §7 human-review 통과가 **둘 다** 있을 때만 후보가 된다. ★Leo 결정 필요(해제 정책 승인).

**SO-5 (dominance 불변식):** 어떤 승격/재사용 규칙도 SO-1~SO-4를 우회할 수 없다.
gate 실행 순서에서 **safety 판정이 항상 먼저** 평가된다(§8 실행 순서).

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
| D2 | `confidence < DEMOTE_THRESHOLD`(< PROMOTE_THRESHOLD, 히스테리시스로 재진동 방지) |
| D3 | consent 철회/차단(`memory_reuse_decision ∈ {blocked, consent_required}`) → 사용 중단(사실은 유지하되 재사용 정지) |
| D4 | adverse 신호(→ §6, `safety_frozen` 우선 적용) |

> **히스테리시스 규칙 R-D1:** `PROMOTE_THRESHOLD > DEMOTE_THRESHOLD`로 두어 경계값 근처에서
> 승격↔강등이 매 신호마다 진동하지 않게 한다. (예: promote 0.70 / demote 0.55) ★Leo 결정 필요(간격).

### 8.2 Stale (노후)

- **S1:** `last_evidence_at` 이후 `STALE_AFTER`(예: fact_type별 90~180일) 경과 & 신규 근거 없음 → `stale`.
- stale에서는 confidence에 `w_decay * staleness_norm` 감쇠가 반영되어 재추천 가중치가 낮아진다.
- stale이라도 **safety fact는 감쇠하지 않는다**(adverse는 시간으로 약화되지 않음). ★안전 예외.

### 8.3 Expired (만료)

- **E1:** `stale` 이후 추가 `EXPIRE_AFTER` 경과, 또는 정책상 최대 보존기간(retention) 초과 → `expired`.
- **E2:** expired fact는 **재추천에 사용 금지**. 조회 시 `memory_reuse_decision=expired` 반환.
- **E3:** 고객 삭제/consent 철회 → `deleted`(만료와 별개, 즉시·조회 금지).

★Leo 결정 필요: fact_type별 `STALE_AFTER` / `EXPIRE_AFTER` / 최대 retention 기간(특히 seasonal_pattern은 연 단위라 길어야 함).

---

## 9. 정책 gate 실행 순서 (deterministic evaluation order)

한 신호가 도착했을 때, gate는 **아래 고정 순서**로 평가한다(안전 우선 불변식 보장).

```
1) consent/삭제 확인      -> deleted/blocked면 사용 중단, 저장정책만 적용
2) SAFETY 판정(§6)        -> adverse면 safety_frozen (최우선, 이후 단계에서 승격 금지)
3) human-review 판정(§7)  -> 해당되면 blocking hold
4) candidate 생성/누적(§3~4) -> evidence_count / confidence 갱신
5) promotion gate(§5)     -> 모든 조건 AND면 promoted_longterm
6) demotion/stale/expired(§8) -> 배치/조회시 재평가
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
  (raw text/PII 없음, `raw_text_stored=False`, `request_scoped=True`). 상세: `COSMILE_MEMORY_V3_03_...`.
- subject_ref / furef mint는 **service-local**(V1 Option B 상속). Option A / `FOUNDATION_SUBJECT_REF_SECRET` mint는 **상속하지 않음(superseded)**.
  - `subject_ref = subj_v2_ + HMAC(<SVC>_SUBJECT_SECRET, '<svc>:subject:' + ref)[:32]`
  - `furef = furef_v2_ + HMAC(<SVC>_FUREF_SECRET, '<svc>:local_user:' + ref)[:32]`(cross-producer consistent)
  - ★실제 secret 값은 이 문서/코드/로그에 절대 등장하지 않는다. key 이름만 참조.

---

## 11. 검증 계획(설계 차원, 코드 아님)

이 규칙은 향후 dev/shadow readiness에서 아래 **케이스군**으로 검증되어야 한다(구현은 별도 release train):

- 승격 케이스: T1~T6 각각 evidence 누적 → threshold 도달 → `promoted_longterm` (긍정 경로).
- 미승격 케이스: evidence_count=1, confidence<threshold, consent 미충족 → 승격 안 됨(INV-2/INV-4).
- 안전 케이스: adverse 신호 → 즉시 `safety_frozen`, 기존 affinity override(SO-1/SO-2), "계속 써도 돼?" safety-first.
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
