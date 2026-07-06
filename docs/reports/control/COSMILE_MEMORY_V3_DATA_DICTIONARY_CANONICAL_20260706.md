# COSMILE MEMORY V3 — Canonical Data Dictionary (유일 어휘 정본)

> 작성: foundation-control(Control) · 2026-07-06 · **status: CANONICAL — V3 전체의 유일한 어휘/키/문턱 정본.**
> 근거: Fable review `bd01ba1` P4/P5/P10 이행. **V3-00~V3-10 문서는 enum/key/threshold를 직접 선언하지 않고 본 사전을 참조한다.** 본 사전과 다른 표기가 발견되면 그 표기가 오류다.
> 상속 규율: **[M2 reused]** = COMMON_SERVICE_MEMORY_CONTRACT_V1(M2 v1.2) canonical을 자구 그대로 재사용(재정의 금지). **[V3 ext]** = V3 신규 extension(M2 미간섭·cosmile schema extension 소속). 혼합/재정의 없음.
> Hard Stop 무접촉 · design-only · 구현/live 아님.

---

## 1. Identity / Key 정본 (P4 — V3 Join Key Contract)

### 1.1 키 형식 정본

| key | 형식 (정본) | 출처 | 규칙 |
|---|---|---|---|
| `subject_ref` | `subj_v2_` + HMAC(`<SVC>_SUBJECT_SECRET`, `'<svc>:subject:'+ref`)[:32] | [M2 reused·Option B] | service-local mint. Option A(`FOUNDATION_SUBJECT_REF_SECRET`) 미상속(superseded) |
| `guest_ref` | M2 canonical guest_ref | [M2 reused] | **memory 계층 전용**(ltm_fact/candidate/consent) — `subject_ref XOR guest_ref`·`subject_key=COALESCE(subject_ref,guest_ref)` |
| `anonymous_ref` | `anon_v3_` + opaque 32 | [V3 ext] | **commerce event 계층 전용**(비로그인 추천/브라우징 여정). memory 계층(ltm_fact/candidate)에 **직접 유입 금지** — §1.3 stitching 경유만 |
| `recommendation_id` | **`rec_v3_` + ULID(26)** — 예: `rec_v3_01J1QZK7...` | [V3 ext] | **유일 형식.** "UUID/ULID 계열"·bare 32-char 표기는 전부 본 형식으로 대체(superseded) |
| `session_id` | 서비스 세션 opaque id | [V3 ext] | raw DB PK 금지·PII 금지 |
| `order_id` / `order_item_id` | Cosmile 주문/라인 opaque id | [V3 ext] | **attribution은 order_item 단위 우선** |
| `product_id` / `sku_id` | 정규화 카탈로그 코드 | [V3 ext] | sku_id는 product_id의 변형(variant). nullable sku 허용 |
| `feedback_id` / `candidate_id` | opaque id | [V3 ext] | — |
| `trace_id` | 기존 trace 규약 | [V1 reused] | raw 결합 금지(same-row 금지 계승) |

### 1.2 키 관계도 (정본)

```
consultation ──> RecommendationEvent(recommendation_id, subject_ref XOR anonymous_ref, session_id, product_id[, sku_id])
                        │ 1:N
                        ▼
                 rec_outcome_event(recommendation_id NULLABLE, attribution_mode, order_id, order_item_id, product_id, sku_id)
                        │ 1:N (order_item 단위)
                        ▼
                 rec_outcome_feedback(feedback_id, order_item_id[, recommendation_id], semantic_label, adverse_severity, adverse_certainty)
                        │ 결정적 생성 규칙(V3-04 §9.2)
                        ▼
                 memory_fact_candidate(candidate_id, subject_key, fact_type, fact_target, source_event_refs[])
                        │ V3-06 gate (tombstone/must_not_reappear 조회 선행 — §5)
                        ▼
                 ltm_fact (M2 canonical)
```

### 1.3 P4 연결 규칙 (정본)

- **R-K1 (nullability):** `rec_outcome_event.recommendation_id`는 **NULLABLE**. 추천 없는 주문은 기록 가능해야 하며 `attribution_mode`로 구분한다. (V3-04의 NOT NULL 선언은 superseded.)
- **R-K2 (attribution_mode):** enum §2.9 — `direct`(rec_id 직접 링크) / `session`(동일 세션 내 SKU 일치·구 same_session_sku) / `organic`(추천 무관 자발 구매) / `unattributed`(귀속 실패) / `unknown`(판정 불가). organic/unattributed/unknown이면 recommendation_id=NULL.
- **R-K3 (anonymous journey):** `anonymous_ref`는 **downstream outcome까지 유지**된다(rec_outcome_event·analytics에 `subject_ref XOR anonymous_ref` 컬럼 쌍). 로그인 전후 연결은 `identity_stitching_state` enum §2.10으로 표현: `unlinked`→(로그인+consent)→`stitched`. **stitching은 상거래 귀속에만 소급 적용되고, memory promotion에는 consent 확인 후에만 반영된다.**
- **R-K4 (partial refund):** 환불/취소는 **order_item 단위** 이벤트(`refund_qty`·`refund_amount_band`)로 기록하고 net_outcome을 라인 단위 재계산한다. 주문 전체 status만으로 부분 환불을 표현하지 않는다.
- **R-K5 (SKU variant repurchase):** 재구매 판정 기준 = **동일 `product_id`**(sku 무관·용량/변형 포함) + §4 window. sku 단위 재구매는 보조 신호.
- **R-K6 (bundle/order split):** 묶음 주문은 order_item으로 분해 후 각 라인에 독립 attribution. 하나의 rec_id가 여러 라인에 귀속될 수 있다(1:N).
- **R-K7 (dedup/소유권):** 얕은 상호작용(impression/click/add_to_cart)의 **저장 소유 = V3-03 RecommendationEvent 단일**. V3-04는 checkout 이후 결과(stage ≥ order)만 소유. V3-09는 두 소스를 **읽기만**(자체 이벤트 테이블 정의 금지 — superseded).

## 2. Enum 정본

### 2.1 `fact_type` [V3 ext — 정본 = (fact_type, fact_target, direction) 모델]

| fact_type | fact_target | direction | 비고 |
|---|---|---|---|
| `ingredient_affinity` | ingredient_id | positive | |
| `ingredient_aversion` | ingredient_id | negative | |
| `ingredient_adverse` | ingredient_id | **safety** | §5 safety lifecycle |
| `product_affinity` | sku_id | positive | |
| `product_aversion` | sku_id | negative | |
| `product_adverse` | sku_id | **safety** | 성분 미특정 이상반응 |
| `category_preference` | category_id | positive | |
| `category_avoidance` | category_id | negative | |
| `repurchase_pattern` | product_id | behavioral | R-K5(product 단위) |
| `seasonal_pattern` | (category_id, season) | behavioral | |
| `skin_condition_context` | condition_code | context | ★Leo 결정(장기기억 포함 여부) 유지 |

- **매핑(superseded 표기 → 정본):** V3-04 §9.1의 `product_satisfaction`→`product_affinity` · `product_dissatisfaction`→`product_aversion` · `adverse_reaction_signal`→`ingredient_adverse`/`product_adverse` · `repurchase_preference`→`repurchase_pattern` · `ingredient_avoidance`→`ingredient_aversion` · `category_interest`→`category_preference`. V3-02 ltm_fact의 `avoid_ingredient`→`ingredient_aversion`(M2 core avoid와 별개 유지) · `adverse_reaction`→`ingredient_adverse`.
- **RESERVED(수집·승격 금지):** `price_sensitivity` · `unsuitable_recommendation` — 소비자(생성 규칙·promotion·지표) 미정의로 **V3 범위에서 저장하지 않는다**(향후 별도 설계 시 재개). V3-02 #11 `brand_affinity`/`price_band`도 동일 RESERVED.
- M2 core fact 타입(skin_type·personal_color·age_range·goal·pregnancy_nursing 등)은 [M2 reused] — V3가 재정의하지 않는다.

### 2.2 candidate `status` [M2 reused] + `lifecycle_state` [V3 ext]

- **`status` = `candidate` | `approved` | `rejected`** — M2 canonical 3값 그대로(D-5 3축: status+fact_state+gate_decision). V3-02의 `pending/promoted/expired`·V3-08의 `long_term`은 **superseded**(pending≡candidate·promoted≡approved).
- **`lifecycle_state`** [V3 ext·직교 컬럼] = `pending_evidence` · `safety_frozen` · `human_review_required` · `demoted` · `stale` · `expired` · `merged`. 정합 불변식: `lifecycle_state ∈ {demoted,stale,expired}` ⇒ `status ≠ approved`. safety_frozen ⇒ 재추천 차단(§5).

### 2.3 `fact_state` + 직교 3-state [M2 reused — P3 상속]

`fact_state` = `active` | `hypothesis` | `superseded` (LTM) · candidate축 `hypothesis|active` — **+ 직교 BOOL `deleted`/`blocked`/`expired` + `must_not_reappear`**. M2 원문 그대로. §5 규율 참조.

### 2.4 `adverse_severity` [V3 ext — P2 정본 축]

**`low` | `moderate` | `severe`** — 3값 유일. 매핑: `mild`≡`low`(V3-02 표기 superseded) · `none`=신호 부재(레코드를 만들지 않음·enum 값 아님) · `unknown`=severity 미상 → `low`로 기록 + `adverse_certainty=reported` + 재평가 대기.

### 2.5 `adverse_certainty` [V3 ext — P2 정본 축]

**`reported`**(1회 자가보고) | **`repeated`**(독립 2회+) | **`verified`**(CS/반품/전문 확인) | **`contradicted`**(반증/정정·resolution 경로).

### 2.6 `consent_scope` [M2 reused] + `consent_state`/`consent_purpose` [V3 ext]

- `consent_scope` = `none` | `same_service` | `cross_service` | `foundation_only` — M2 그대로. V3-02의 `service_local`≡`same_service`(superseded 표기)·`cross_session`/`personalization`은 scope가 아니라 **purpose** → `consent_purpose` [V3 ext] = `memory_personalization` | `cross_session_reuse` | `analytics_aggregate`(M2 ConsentRecord.purpose 확장 namespace).
- `revoked`는 scope 값이 아님 → **`consent_state`** [V3 ext] = `active` | `withdrawn`.

### 2.7 `retention_policy` [M2 reused] + TTL 파라미터 [V3 ext]

`session` | `short_ttl` | `standard_ttl` | `revocable` — M2 그대로. V3-02의 `short_30d/mid_180d/long_365d/durable_consented`는 enum이 아니라 **TTL 파라미터 매핑**(superseded 표기): short_ttl→30d · standard_ttl→180d · revocable→365d+ConsentRecord. 파라미터 확정 = ★Leo(§4).

### 2.8 `sensitivity_level` [M2 reused]

`low` | `normal` | `sensitive` | `high` — M2 그대로. 매핑: `elevated`≡`sensitive` · `health_related`≡`high`(V3-02 표기 superseded).

### 2.9 `attribution_mode` [V3 ext]

`direct` | `session` | `organic` | `unattributed` | `unknown` — R-K2. (`behavioral_only`·`same_session_sku`는 superseded 표기: behavioral_only≡unattributed(승격 불가 표시 유지)·same_session_sku≡session.)

### 2.10 `identity_stitching_state` [V3 ext]

`unlinked` | `stitched_pending_consent` | `stitched` | `expired`.

### 2.11 `feedback_type` [V3 ext]

`satisfaction_score`(1–5) | `adverse_report` | `repurchase` | `refund_return` | `cs_contact` | `review_semantic`.

### 2.12 `semantic_label` [V3 ext — P9]

만족/불만: `satisfied` | `dissatisfied` | `neutral`. 안전: `adverse_skin_reaction` | `adverse_other` | `usage_question_safety`("계속 써도 돼?"류 — safety-first 분리) | `usage_question_general`. 기타: `repurchase_intent` | `avoid_intent` | `unclear`.

### 2.13 `safety_flag` [V3 ext]

`safety_frozen` | `safety_caution` | `safety_block` | `safety_resolved` | `pregnancy_nursing_context`[M2 reused].

### 2.14 `margin_band` [V3 ext — P8 Option A]

`low` | `medium` | `high` (+`margin_coverage` % 별도). **정확 라인 원가/실매가 저장 금지**(V3-05 Hard Stop 유지) — §6.

### 2.15 `recommendation_reason_code` taxonomy [V3 ext — 골격]

`skin_type_match` · `concern_match` · `ingredient_match` · `avoid_conflict_none` · `safety_filtered` · `repurchase_cycle` · `seasonal_match` · `consultation_derived` — 확장은 본 사전 개정으로만.

## 3. Confidence / Evidence 정본

- `confidence` float 0.0–1.0. **promotion 문턱 C_min = 0.60**(M2 hypothesis 0.40→active 0.60과 정합 — V3-08의 0.70 초안은 superseded). `evidence_count` = **독립** 이벤트 수(같은 세션 dedup·source_event_refs 기준). **N_min = 2** · `distinct_signal_source_count ≥ 2`. **예외: safety fact는 §5(문턱 미적용).** 수치 확정 = ★Leo(파라미터 표 §4).

## 4. Time window 정본 (★Leo 확정 파라미터 — 단일 표)

| window | 정본 초안 | superseded 표기 |
|---|---|---|
| purchase attribution | **14d** | V3-09의 7d |
| repurchase attribution | **90d** (product_id 기준·R-K5) | V3-09의 60d |
| candidate stale | 180d 무신호 → `stale` | — |
| adverse re-evaluation | severity/certainty 재평가 주기 30d | — |

## 5. Fact 규율 [M2 reused — P3 상속 절] + Safety lifecycle [P1/P2]

### 5.1 M2 fact 규율 상속 (원문 규율 — V3가 재정의하지 않음)

- **SAFETY∩SINGLE**: safety 성격 SINGLE fact는 `subject_key + fact_type` 기준 **active ≤ 1**(SINGLE supersede 우선).
- **tombstone**: `deleted`/`blocked`/`expired`는 직교 BOOL — fact_state와 별개. tombstone row는 이력 보존.
- **must_not_reappear**: `must_not_reappear=true`인 deleted/blocked/tombstoned fact는 **candidate로 재생성 금지**.
- **candidate promotion은 tombstone/must_not_reappear를 우회할 수 없다** — V3-06 R-C1은 candidate 생성/승격 **전에** 동일 `(subject_key, fact_type, fact_target)`의 active/tombstone 상태 조회를 **선행**한다(조회 없이 승격 = 계약 위반).
- **erasure/consent withdrawal 이후 재등장 금지**: §7 lifecycle의 `erasure_requested` 처리 후 동일 fact의 자동 재생성 금지(고객의 명시 재진술만 신규 fact로 허용 — 그 경우도 safety review 경유).

### 5.2 Safety fact lifecycle (P1 — 정본 문구)

> **"Safety/adverse facts are not subject to ordinary evidence-threshold demotion. A safety fact may be deactivated only by an explicit safety-resolution rule, consent/erasure rule, or verified correction path. Commerce optimization and margin logic cannot demote or weaken an active safety fact."**

- safety/adverse fact(`ingredient_adverse`·`product_adverse`·safety_flag 부착 fact)는 일반 preference/affinity fact와 **다른 lifecycle**을 갖는다: evidence 문턱(§3) 미달만으로 **자동 강등되지 않는다**. V3-08 INV-DB-2는 **`direction≠safety` fact에만** 적용된다(safety-fact 예외 명시).
- safety fact의 demotion/delete 경로는 **3가지뿐**: ① deterministic safety-resolution rule(`adverse_certainty=contradicted` + 재평가 통과) ② consent/erasure rule(§7) ③ verified correction(human safety review). 상세 절차 = V3-07 소유.

### 5.3 AdverseSignalActionMatrix (P2 — 정본은 V3-07 §Matrix·여기는 사전 등재)

| severity × certainty | 즉시 효과 (deterministic) |
|---|---|
| severe × reported | **immediate safety_block + recommend_hold**(해당 target) |
| moderate × reported | **safety_caution + avoid_repeat_recommendation until review** |
| low × reported | **caution_memory_candidate + no automatic commerce boost**(같은 축 positive candidate 강등·무시 금지·전 affinity 동결 아님) |
| low × repeated | **escalate → moderate-equivalent** 처리 |
| any × verified | **active safety fact**(§5.2 lifecycle) |
| any × contradicted | **safety_resolution path**(자동 해제 아님 — resolution rule 통과 필요) |

- **불변식**: 모든 adverse signal은 commerce optimization보다 우선. low 무시 금지·single low가 전체 affinity를 영구 동결하지도 않음(target 축 한정). matrix 밖 조합 = fail-closed(상위 severity 처리).

## 6. Margin / 원가 정책 [P8 — Option A 채택]

- **Option A: margin_band only.** 상품/주문 단위 정확 원가·실매가 저장 금지(V3-05 Hard Stop 유지). analytics는 `margin_band` 집계 + `margin_coverage`(밴드 판정 가능 비율)만. **정확 line cost 기반 margin은 pre-prod gate로 이월**(별도 승인·internal-only 설계 시 Option B 재검토).
- V3-04의 `unit_cost`/`margin_amount`·V3-09의 `gross_margin` 금액 지표는 **superseded** → `margin_band` 분포·`net_outcome_value_band`로 대체.

## 7. Consent / Erasure / Guest-merge lifecycle [P10 — 정본]

| 상태/사건 | fact 처리 | 재사용(추천) | 비고 |
|---|---|---|---|
| `consent_state=withdrawn` (scope 축소) | fact **보존** + `reuse_blocked=true` | **금지** | "유지+재사용 정지" — V3-06 D3 정본. 상태표의 "즉시 deleted" 표기는 superseded |
| `erasure_requested` (삭제 요청) | `deleted=true` + `must_not_reappear=true`(tombstone) | 금지 | 파생물 포함 — un-learning ↓ |
| `reuse_blocked` | 저장 유지·추천/승격 입력에서 제외 | 금지 | consent 회복 시 해제 가능 |
| `guest_to_user_merge` | M2 §N-5 service-local 병합: guest candidate/fact/evidence_count를 subject_ref로 이관하되 **승격 상태는 재평가**(자동 approved 승계 금지)·safety fact는 승계(안전 방향) | 병합 후 정상 | allow_link=false → 병합 거부 |
| **un-learning** (승격 fact 삭제/철회 시) | 해당 fact가 기여한 **파생 추천 가중/suppression을 함께 회수**: fact_id를 참조하는 reason_code·suppression 엔트리를 무효화하고 다음 추천 산출부터 미반영. 회수 완료를 audit log(boolean)로 기록 | — | raw 미보존·fact_id 참조만으로 회수 가능해야 함(설계 요건) |
| audit/source_ref | 모든 전이는 trace_id+reason_code로 감사 | — | raw 원문 0 |

## 8. `raw_text_stored` 정책 [V1 reused]

전 계층 `raw_text_stored=False`. 저장 = 코드/enum/count/score/band/opaque ref만. review/CS 원문은 저장하지 않고 `semantic_label`+`source_ref`(opaque)+`content_hash`만(P9 — 추출 계약은 V3-04 §semantic-extraction 소유·safety gate는 V3-07 소유).

## 9. 참조 규율

- V3-00~V3-10은 enum/key/threshold를 **본 사전 참조로만** 사용한다(중복 선언 금지 — 발견 시 사전이 이긴다).
- M2 canonical과 충돌하는 확장이 필요하면 **본 사전 개정 + M2 관계(reused/ext) 명시**로만 한다.
- provenance: V1 정본 = `OPTION_B_SUBJECT_REF_CONTRACT`(1e24c33 도입) · `COMMON_SERVICE_MEMORY_CONTRACT_V1_20260704`(identity 절은 Option B로 superseded — P11 pointer 참조) · Fable review `bd01ba1`.

## 무결성

design-only · 코드/DB 0 · Hard Stop 무접촉 · M2 canonical 재정의 0(reused/ext 구분) · 본 사전이 V3 유일 어휘 정본.
