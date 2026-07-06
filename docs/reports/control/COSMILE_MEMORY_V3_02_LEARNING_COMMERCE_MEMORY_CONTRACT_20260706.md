# COSMILE MEMORY V3 · V3-02 — Learning Commerce Memory Contract (per-customer)

> 작성: foundation-control · 2026-07-06 · design-only · no code · Hard Stop 무접촉

> depends_on: [`COSMILE_MEMORY_V3_DATA_DICTIONARY_CANONICAL_20260706.md`(이하 "사전") · `COSMILE_MEMORY_V3_00_INDEX_AND_EXECUTIVE_SUMMARY_20260706.md`] ·
> owns: [per-customer 학습 메모리 19필드 계약(§2) · **memory_context 최소화 계약(Foundation 전달 최소화 — §2.1, 타 V3 문서는 본 절을 참조하고 재선언하지 않는다)** · V1 canonical 테이블 매핑 vs Cosmile commerce extension 배치(§4)] ·
> referenced_by: [`COSMILE_MEMORY_V3_00_INDEX_AND_EXECUTIVE_SUMMARY_20260706.md` · `COSMILE_MEMORY_V3_00_PROBLEM_DEFINITION_20260706.md` · `COSMILE_MEMORY_V3_01_EXISTING_5_MISSION_RECONCILIATION_PLAN_20260706.md` · `COSMILE_MEMORY_V3_03_RECOMMENDATION_EVENT_CONTRACT_20260706.md` · `COSMILE_MEMORY_V3_04_ORDER_REVENUE_FEEDBACK_OUTCOME_CONTRACT_20260706.md` · `COSMILE_MEMORY_V3_06_MEMORY_FACT_CANDIDATE_PROMOTION_RULES_20260706.md` · `COSMILE_MEMORY_V3_07_SAFETY_ADVERSE_REACTION_GUARDRAIL_20260706.md` · `COSMILE_MEMORY_V3_08_DB_INTEGRATION_INVARIANT_DESIGN_20260706.md` · `COSMILE_MEMORY_V3_10_PRE_IMPLEMENTATION_REVIEW_PLAN_20260706.md`]
> 어휘/키/문턱 정본 = **사전**. 본 문서와 사전이 다르면 사전이 이긴다(구 표기는 superseded로 흔적만 유지).

이 문서는 Cosmile Memory V3 "Learning Commerce Memory Loop"의 **고객 단위(per-customer) 학습 메모리 계약(contract)**을 정의한다.
설계 전용 문서이며, 코드·마이그레이션·live/prod 활성화·secret 접근을 포함하지 않는다.
전체 loop·아키텍처 개요는 형제 문서 `COSMILE_MEMORY_V3_00_INDEX_AND_EXECUTIVE_SUMMARY_20260706.md`,
승격(promotion)·confidence 규칙 상세는 `COSMILE_MEMORY_V3_06_MEMORY_FACT_CANDIDATE_PROMOTION_RULES_20260706.md`,
safety/adverse 우선 규칙은 `COSMILE_MEMORY_V3_07_SAFETY_ADVERSE_REACTION_GUARDRAIL_20260706.md`를 참조한다.
(구 참조 `V3_01_LEARNING_COMMERCE_MEMORY_LOOP`·`V3_03_PROMOTION_AND_CONFIDENCE`·`V3_04_SAFETY_FIRST_MEMORY_GATE`는 패키지 재편으로 superseded — 위 실제 파일명이 정본.)

---

## 0. 상속(canonical inheritance) 고정

- **Memory V1 = CLOSED_WITH_LIMITS** (dev/shadow/readiness 수준). V3는 이를 canonical로 상속한다.
- **Option B만 상속.** subject_ref/furef mint는 **service-local**이다. **Option A / `FOUNDATION_SUBJECT_SECRET` mint는 상속하지 않음(superseded).**
  - `subject_ref = subj_v2_ + HMAC(<SVC>_SUBJECT_SECRET, '<svc>:subject:' + ref)[:32]`
  - `furef = furef_v2_ + HMAC(<SVC>_FUREF_SECRET, '<svc>:local_user:' + ref)[:32]` (cross-producer consistent)
- **Foundation = validate / gate / reasoning ONLY.** Foundation은 durable customer memory DB가 아니며, SIASIU/Cosmile service DB를 직접 읽지 않는다.
  Foundation에는 **request-scoped·minimized `memory_context`**만 전달된다 (`raw_text_stored=False`, no raw text, no PII, request_scoped).
- **service-local ownership.** SIASIU와 Cosmile은 각자의 customer memory + commerce data를 소유한다(per-service postgres schema `siasiu` / `cosmile`, cross-schema 직접 참조 금지).
- **Cosmile postgres = 현재 schema/validate 수준.** real DB-integration은 완료로 간주하지 않는다(문서 전체에서 "schema/validate level"로 표기).
- **safety/adverse 우선.** 안전·이상반응 신호는 commerce/revenue 최적화보다 항상 우선한다. 의학적 단정 금지. "계속 써도 돼?"류 표현은 safety-first로 처리.

---

## 1. 계약 목적과 범위

**목적:** 상담·추천·commerce 이벤트에서 발생한 신호를 **고객 단위 장기 학습 메모리**로 축적하되,
단일 신호가 곧바로 장기 기억이 되지 않도록 **후보(candidate) → 증거/신뢰도(evidence/confidence) → 장기 사실(LongTermMemoryFact) 승격** 파이프라인을 계약으로 고정한다.

**범위 안(in-scope):** 필드 정의 · enum · 승격 기준 · V1 canonical 테이블 매핑 · Cosmile commerce extension 매핑 · retention/consent/sensitivity 정책 스켈레톤.

**범위 밖(out-of-scope / Hard Stop 무접촉):** prod DB access · real secret/Vault · main merge · live activation · external release · prod DB migration.
이 문서는 **자동 실행이 아니라 "자동화 가능한 memory/learning 구조"**를 만드는 것이 목표다.

---

## 2. per-customer Learning Commerce Memory — 필드 계약

아래 표는 고객 1인에 대한 학습 메모리 계약의 **논리 필드(logical field)**다.
`Memory 계층` 열은 이 필드가 어느 canonical 계층/테이블 또는 Cosmile extension에 실리는지를 나타낸다(§4 상세 매핑).
모든 필드는 **raw_text_stored=False** 원칙을 따르며, 원문 발화·PII·주문 원문은 저장하지 않고 **구조화된 값(코드/enum/count/score)**만 저장한다.

| # | 필드 | 타입 / enum | 의미 | 단일신호 즉시확정? | Memory 계층 |
|---|------|-------------|------|-------------------|-------------|
| 1 | `subject_ref` | string `subj_v2_...` (service-local mint) | 고객 pseudonymous key. join·조회의 유일 anchor | — (식별자) | canonical key (모든 테이블 공통) |
| 2 | `customer_profile` | struct ref | 안정적 프로필 집합체(피부/민감/선호 요약)에 대한 포인터 | No | `customer_profile` (canonical) |
| 3 | `skin_concern` | enum[] `acne`,`pigmentation`,`wrinkle`,`redness`,`pore`,`dryness`,`oiliness`,`sensitivity`,`elasticity`,`barrier`,`unknown` | 고객 피부 고민(다중) | No | `ltm_fact` (fact_type=`skin_concern`) |
| 4 | `skin_type` | enum `dry`,`oily`,`combination`,`normal`,`sensitive`,`unknown` | 피부 타입 | No | `ltm_fact` (fact_type=`skin_type`) |
| 5 | `sensitivity_signal` | enum `none`,`low`,`moderate`,`high`,`unknown` + `signal_source` (구 `mild`≡`low` — superseded, 사전 §2.4 표기 정합) | 민감성/자극 취약 정도 | No (안전 관련 → §5) | `ltm_fact` + safety mirror |
| 6 | `ingredient_preference` | list<{ingredient_code, polarity `like`/`neutral`, weight 0–1}> | 선호 성분 경향 | No | `ltm_fact` (fact_type=`ingredient_affinity` — 사전 §2.1) |
| 7 | `avoid_ingredient` | list<{ingredient_code, reason_code, hard_flag bool}> | 회피/금지 성분 (fact_type=`ingredient_aversion` — 사전 §2.1) | **hard_flag=true는 안전계약, §5** | `ltm_fact` + safety mirror |
| 8 | `positive_ingredient_response` | list<{ingredient_code, evidence_count, last_event_ref}> | 특정 성분에 긍정 반응(만족/재구매) | No | Cosmile commerce ext + `ltm_fact` |
| 9 | `negative_ingredient_response` | list<{ingredient_code, severity = `adverse_severity`(사전 §2.4: `low`/`moderate`/`severe` — 구 `mild`≡`low` superseded), evidence_count}> | 특정 성분에 부정/이상 반응 | **severe = 즉시 safety escalate, §5** | Cosmile commerce ext + safety mirror |
| 10 | `seasonality_signal` | list<{season `spring`/`summer`/`autumn`/`winter`, concern_shift enum}> | 계절별 고민/사용 변화 | No | Cosmile commerce ext |
| 11 | `purchase_history_signal` | struct{category_freq map} — `price_band`·`brand_affinity`는 **RESERVED(수집·승격 금지 — 사전 §2.1)**, aggregated·no order raw | 구매 경향(집계값만) | No | Cosmile commerce ext |
| 12 | `repurchase_signal` | list<{sku_or_ingredient_code, cycle_days_est, count}> (재구매 판정 단위 = product_id — 사전 R-K5) | 재구매 주기/횟수(만족 proxy) | No | Cosmile commerce ext |
| 13 | `adverse_reaction_signal` | list<{ingredient_or_sku_code, severity = `adverse_severity`(사전 §2.4) + `adverse_certainty`(사전 §2.5), reported_at_bucket, resolved bool}> | 이상반응 신호 | **YES — 안전 우선, 효력 matrix = 사전 §5.3, §5** | safety-priority store + `ltm_fact` mirror |
| 14 | `confidence` | float 0.0–1.0 (문턱 정본 = 사전 §3) | 해당 fact의 신뢰도 | — (파생값) | `ltm_fact.confidence` / candidate |
| 15 | `evidence_count` | int ≥1 (독립성·문턱 정본 = 사전 §3) | fact를 뒷받침하는 독립 이벤트 수 | — (파생값) | `ltm_fact.evidence_count` / candidate |
| 16 | `source_event_refs` | list<event_ref> (opaque id, no raw payload) | 근거 이벤트 참조(원문 아님) | — | candidate·`ltm_fact` provenance |
| 17 | `retention_policy` | enum = **사전 §2.7 [M2 reused]**: `session`/`short_ttl`/`standard_ttl`/`revocable` (구 `short_30d`/`mid_180d`/`long_365d`/`durable_consented`는 enum이 아니라 TTL 파라미터 매핑 — superseded, 사전 §2.7) | 보존 기간 정책 | — (정책) | 모든 계층 메타 |
| 18 | `consent_scope` | enum = **사전 §2.6 [M2 reused]**: `none`/`same_service`/`cross_service`/`foundation_only` + 직교 `consent_state`(`active`/`withdrawn`)·`consent_purpose` [V3 ext] (구 `service_local`≡`same_service`·`personalization`/`cross_session`은 scope가 아니라 purpose·`revoked`→`consent_state=withdrawn` — superseded, 사전 §2.6) | 동의 범위 | — (정책) | 모든 계층 메타 |
| 19 | `sensitivity_level` | enum = **사전 §2.8 [M2 reused]**: `low`/`normal`/`sensitive`/`high` (구 `elevated`≡`sensitive`·`health_related`≡`high` — superseded, 사전 §2.8) | 데이터 민감도(`high` = 최고 보호) | — (정책) | 모든 계층 메타 |

**표 원칙:**
- `ingredient_code` / `sku_or_ingredient_code`는 **정규화된 코드**이며 원문 성분명·상품명 raw string이 아니다.
- `*_at_bucket`은 정확 timestamp가 아니라 **버킷(예: 주/월 단위)**으로 저장해 PII/재식별 위험을 낮춘다.
- 안전 관련 필드(5·7 hard_flag·9 severe·13)는 **commerce 최적화 신호보다 우선**하며, revenue/margin 신호가 이를 덮어쓰지 못한다(§5).
- **식별 키 계층(P4 — 사전 §1.1/§1.3):** memory 계층(ltm_fact/candidate/consent)의 비로그인 키 = **`guest_ref`** [M2 reused] — `subject_ref XOR guest_ref`·`subject_key = COALESCE(subject_ref, guest_ref)`. **`anonymous_ref`(`anon_v3_`)는 commerce event 계층 전용**(`COSMILE_MEMORY_V3_03_RECOMMENDATION_EVENT_CONTRACT_20260706.md`)이며 memory 계층에 **직접 유입 금지** — 로그인 전후 연결은 사전 §1.3 R-K3 stitching(`identity_stitching_state`, 사전 §2.10) 경유만이고, memory promotion에는 consent 확인 후에만 반영된다.

### 2.1 memory_context 최소화 계약 (Foundation 전달 최소화 — 소유: 본 문서)

Foundation에 전달되는 `memory_context`의 최소화 계약은 **V3-02가 소유**한다. 타 V3 문서는 본 절을 참조만 하고 재선언하지 않는다.

- **request-scoped·minimized**: 판단 1회에 필요한 최소 부분집합만 전달. durable 저장·재사용 없음.
- **허용**: §2 19필드의 구조화 값(코드/enum/count/score/band/opaque ref)만.
- **금지**: raw 발화·주문 raw·PII·정확 timestamp(버킷만)·service DB 직접 read(Foundation은 validate/gate/reasoning only).
- `raw_text_stored=False` 불변(사전 §8).

---

## 3. 승격(promotion) 원칙 — 단일 신호는 장기기억이 아니다

계약 불변식(invariant): **하나의 신호로 LongTermMemoryFact를 확정하지 않는다.**

```
service event (상담/추천/commerce)
   → MemoryFactCandidate (단일 신호, 낮은 confidence, evidence_count=1)
   → [evidence 누적 · confidence 상승 · 상충 신호 감쇠]
   → LongTermMemoryFact (승격 기준 충족 시)
   → next recommendation improvement (읽기 소비)
```

**최소 승격 기준 — 수치 정본 = 사전 §3(confidence/evidence)·§4(time window) (규칙 상세 = `COSMILE_MEMORY_V3_06_MEMORY_FACT_CANDIDATE_PROMOTION_RULES_20260706.md`):**

| 조건 | 일반 fact (skin_type, ingredient_pref 등) | 안전 fact (adverse, avoid hard_flag) |
|------|-------------------------------------------|--------------------------------------|
| 최소 `evidence_count` | **N_min = 사전 §3**(독립 이벤트·`distinct_signal_source_count` 포함) | 저장은 1부터, 단 **차단은 즉시** (§5·사전 §5 — 문턱 미적용) |
| 최소 `confidence` | **C_min = 사전 §3** (구 "≥ 0.6" 직접 선언은 사전 참조로 대체) | commerce 승격 기준과 무관하게 **caution 즉시 적용**(효력 = 사전 §5.3) |
| 상충 신호 처리 | 최근성 가중·감쇠 후 재평가 | 안전 방향으로 fail-closed |
| 승격 판정자 | AI semantic + deterministic gate | + Foundation safety gate (덮어쓰기 불가) |

- **evidence 독립성:** 같은 세션의 동일 이벤트를 중복 카운트하지 않는다(이벤트 dedup은 `source_event_refs` 기준 — 사전 §3).
- **감쇠(decay):** 오래된 근거는 confidence 기여가 시간에 따라 감소한다(구체 half-life는 ★Leo 결정 필요).
- ★**Leo 결정 필요:** 승격 임계값·window 수치의 최종 확정 — 정본 초안과 확정 절차 = **사전 §3/§4**(본 문서는 수치를 직접 선언하지 않는다).
- ★**Leo 결정 필요:** confidence decay half-life와 상충 신호 감쇠 계수.

---

## 3.5 V1 M2 fact 규율 상속 (P3 — 정본 = 사전 §5.1, V3가 재정의하지 않음)

V3-02는 M2(COMMON_SERVICE_MEMORY_CONTRACT_V1 v1.2) fact 규율을 **자구 그대로 상속**한다. 아래는 사전 §5.1 pointer이며 재정의가 아니다.

- **SAFETY∩SINGLE**: safety 성격 SINGLE fact는 `subject_key + fact_type` 기준 **active ≤ 1**(SINGLE supersede 우선).
- **tombstone**: `deleted`/`blocked`/`expired`는 `fact_state`와 별개의 **직교 BOOL** — tombstone row는 이력 보존.
- **must_not_reappear**: `must_not_reappear=true`인 deleted/blocked/tombstoned fact는 **candidate로 재생성 금지**.
- **candidate promotion은 tombstone/must_not_reappear를 우회할 수 없다** — candidate 생성/승격 **전에** 동일 `(subject_key, fact_type, fact_target)`의 active/tombstone 상태 조회를 선행한다(V3-06 R-C1 — 조회 없이 승격 = 계약 위반).
- **erasure/consent withdrawal 이후 재등장 금지**: erasure 처리 후 동일 fact의 자동 재생성 금지 — 고객의 명시 재진술만 신규 fact로 허용하며, 그 경우도 safety review 경유(사전 §7).

---

## 4. canonical Memory V1 매핑 vs Cosmile commerce extension

V3 필드는 **V1 canonical 테이블**(재사용·삭제 금지)과 **Cosmile commerce extension**(신규, service-local schema `cosmile`)으로 분리 배치한다.

### 4.1 canonical V1 테이블 (재사용 — M2 원문 정합, 재정의 금지)

> "재사용" 선언과 실제 필드가 일치하도록 M2 canonical 필수 필드를 아래에 **복원**한다(P3/P5). 본 절은 M2를 재정의하지 않는다 — 필드/enum 정본 = M2·사전.

- **`customer_profile`** (안정적 프로필 집계)
  - `subject_ref` (key), `skin_type`, `skin_concern[]`, `sensitivity_signal`, `ingredient_preference`(요약), `consent_scope`, `sensitivity_level`, `retention_policy`
  - 성격: 승격 완료된 안정 사실의 **읽기 최적화 집계 뷰**. 후보 신호는 여기 직접 쓰지 않는다.

- **`memory_fact_candidate`** (승격 전 후보)
  - `subject_key`(= `COALESCE(subject_ref, guest_ref)` — 사전 §1.1), `fact_type`(사전 §2.1), `fact_target`, `candidate_value`, `evidence_count`, `confidence`, `source_event_refs[]`, `created_at_bucket`
  - `status` = **`candidate`/`approved`/`rejected` [M2 reused — 사전 §2.2 3값]** + 직교 컬럼 **`lifecycle_state` [V3 ext — 사전 §2.2]**(`pending_evidence`·`safety_frozen`·`human_review_required`·`demoted`·`stale`·`expired`·`merged` 등).
    (구 `pending`/`promoted`/`expired` status 표기는 superseded — 사전 §2.2: `pending`≡`candidate`·`promoted`≡`approved`·`expired`는 status가 아니라 `lifecycle_state` 값.)
  - §2의 신규 신호(3·4·5·6·8·9·13 등)는 **먼저 여기로** 들어온다. `raw_text_stored=False`. 생성/승격 전 tombstone/must_not_reappear 조회 선행(§3.5).

- **`ltm_fact`** (승격된 장기 사실 — M2 canonical 필수 필드 복원)
  - key: `subject_ref` **XOR** `guest_ref`(`subject_key` — 사전 §1.1)
  - `fact_type` = **사전 §2.1 정본**((fact_type, fact_target, direction) 모델). 구 명칭 매핑(superseded — 사전 §2.1): `avoid_ingredient`→`ingredient_aversion`(M2 core avoid와 별개 유지) · `adverse_reaction`→`ingredient_adverse`. M2 core fact 타입(skin_type·skin_concern 등)은 [M2 reused].
  - `fact_state` = `active`/`hypothesis`/`superseded` [M2 reused — 사전 §2.3]
  - 직교 3-state BOOL: `deleted`/`blocked`/`expired` + `must_not_reappear` [M2 reused — §3.5 tombstone 규율]
  - `is_safety`(safety fact 표시 — SAFETY∩SINGLE·사전 §5 lifecycle 적용 대상), `norm_value`(정규화 값), `fact_value`(코드/enum), `confidence`, `evidence_count`, `provenance`(source_event_refs), `retention_policy`, `consent_scope`, `sensitivity_level`
  - 승격 기준(§3·사전 §3) 충족 시에만 candidate → ltm_fact. safety fact는 사전 §5.2 lifecycle(일반 문턱 강등 미적용).

### 4.2 Cosmile commerce extension (신규, schema/validate level)

commerce 고유 신호는 V1 core에 섞지 않고 **`cosmile` schema extension**에 둔다(역할 경계: core는 domain-agnostic).

| extension 테이블(제안) | 담는 V3 필드 | 비고 |
|------------------------|--------------|------|
| `cosmile_ingredient_response` | `positive_ingredient_response`, `negative_ingredient_response` | severe negative는 safety mirror로 동시 반영 |
| `cosmile_commerce_signal` | `purchase_history_signal`, `repurchase_signal`, `seasonality_signal` | 집계값만, order raw 미저장 |
| `cosmile_adverse_reaction` (safety-priority) | `adverse_reaction_signal` | 안전 우선 store, revenue 신호가 override 불가 |

- **cross-schema 직접 참조 금지:** Cosmile extension은 `siasiu` schema를 직접 읽지 않는다. 공유가 필요하면 contract/minimized memory_context 경유.
- **Foundation 소비:** 위 어떤 테이블도 Foundation이 직접 read하지 않는다. Foundation에는 request-scoped `memory_context`(구조화·minimized — 계약 = §2.1, 본 문서 소유)만 전달.
- ★**Leo 결정 필요:** commerce extension을 `ltm_fact`의 fact_type으로 흡수할지, 별도 `cosmile_*` 테이블로 유지할지(현 초안은 별도 유지 = 역할 경계 보존).

### 4.3 필드 → 계층 요약

- 안정 사실(승격 후) → `customer_profile` 집계 + `ltm_fact` 원장.
- 승격 전 모든 신호 → `memory_fact_candidate`.
- commerce 고유 신호 → `cosmile_*` extension (+ 안전 신호는 safety mirror).
- 정책 메타(`retention_policy`/`consent_scope`/`sensitivity_level`) → 모든 계층 공통 컬럼.

---

## 5. safety / adverse 우선 규칙 (commerce override 금지)

- `adverse_reaction_signal`(#13)·`negative_ingredient_response` severe(#9)·`avoid_ingredient` hard_flag(#7)는 **단일 신호라도 즉시 안전 게이트에 반영**된다.
  - 장기 memory *확정*은 승격 절차를 따르지만, **추천 차단/caution은 즉시** 적용된다(fail-closed).
- "계속 써도 돼?" / "다시 써도 될까?"류 표현 → safety-first 처리. 의미 인식은 AI semantic, 집행은 deterministic + Foundation safety gate.
- **의학적 단정 금지.** 이상반응 신호는 "회피 후보/주의"로만 구조화하고, 진단·치료 단정을 생성하지 않는다.
- revenue/margin/repurchase 신호가 안전 신호를 **덮어쓸 수 없다.** 충돌 시 안전 방향으로 수렴.
- safety mirror에 저장되는 값도 **코드/enum/severity/count**만이며 raw 발화·PII 없음(`raw_text_stored=False`).

---

## 6. retention / consent / sensitivity 정책 스켈레톤

- `retention_policy`: 기본은 최소 보존. `revocable`(구 `durable_consented` — superseded, 사전 §2.7)은 명시 동의(ConsentRecord) + `consent_purpose ∈ {memory_personalization, cross_session_reuse}`(구 `personalization`/`cross_session` — superseded, 사전 §2.6)일 때만.
- `consent_state=withdrawn`(구 `consent_scope=revoked` — superseded, 사전 §2.6) → fact **보존 + `reuse_blocked=true`**·candidate/ltm 소비 즉시 중단(읽기 차단). 삭제(erasure)·만료·un-learning 절차 = **사전 §7 정본**(상세 규칙 = `COSMILE_MEMORY_V3_06_MEMORY_FACT_CANDIDATE_PROMOTION_RULES_20260706.md`).
- `sensitivity_level=high`(구 `health_related` — superseded, 사전 §2.8. 이상반응·민감성 등) → 최고 보호. 최소 보존·접근 제한·집계 우선.
- **Hard Stop 재확인:** 실제 삭제/백필/마이그레이션·live 소비는 이 문서 범위 밖. 여기서는 정책 필드의 계약만 고정한다.
- ★**Leo 결정 필요:** retention TTL 파라미터 확정(정본 초안 = 사전 §2.7/§4). withdrawn 시 fact 운명은 사전 §7 정본(보존+`reuse_blocked` — "즉시 deleted/파기" 표기는 superseded)·erasure는 tombstone+`must_not_reappear`(§3.5).

---

## 7. 무접촉/불변식 체크리스트 (설계 단계 자기검증)

- [ ] raw_text_stored=False — 모든 필드 구조화값만, 원문/PII/주문 raw 0.
- [ ] subject_ref/furef = service-local mint (Option B). Option A/Foundation mint 미사용.
- [ ] Foundation은 service DB 직접 read 0, minimized request-scoped memory_context만.
- [ ] cross-schema(siasiu↔cosmile) 직접 참조 0.
- [ ] 단일 신호 → LongTermMemoryFact 즉시 확정 0 (candidate 경유).
- [ ] safety/adverse가 commerce 신호에 의해 override 0.
- [ ] prod DB / real secret / Vault / live / main merge / prod migration 무접촉.

---

## 무결성

design-only · 코드/구현/마이그레이션 없음.
Memory V1 **Option B 상속**(Option A / Foundation subject_ref secret mint **미상속·superseded**).
Foundation = **validate/gate/reasoning only** (durable customer memory DB 아님, service DB 직접 read 없음, minimized request-scoped memory_context만).
**service-local ownership**(SIASIU·Cosmile 각자 memory+commerce 소유, cross-schema 직접 참조 금지, Cosmile postgres는 schema/validate level).
**safety-first**(adverse/sensitivity 신호가 revenue/commerce 최적화보다 우선, 의학적 단정 금지).
no prod · no live · no main merge · no real secret/Vault · no prod DB migration.
어휘/키/문턱 정본: `COSMILE_MEMORY_V3_DATA_DICTIONARY_CANONICAL_20260706.md`.
형제 문서: `COSMILE_MEMORY_V3_00_INDEX_AND_EXECUTIVE_SUMMARY_20260706.md` · `COSMILE_MEMORY_V3_03_RECOMMENDATION_EVENT_CONTRACT_20260706.md` · `COSMILE_MEMORY_V3_06_MEMORY_FACT_CANDIDATE_PROMOTION_RULES_20260706.md` · `COSMILE_MEMORY_V3_07_SAFETY_ADVERSE_REACTION_GUARDRAIL_20260706.md`.
