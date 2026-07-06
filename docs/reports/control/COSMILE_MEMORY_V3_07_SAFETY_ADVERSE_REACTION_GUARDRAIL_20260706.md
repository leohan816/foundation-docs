# COSMILE MEMORY V3 — V3-07 Safety & Adverse Reaction Guardrail (설계서)

> 작성: foundation-control · 2026-07-06 · design-only · no code · Hard Stop 무접촉
> depends_on: [COSMILE_MEMORY_V3_DATA_DICTIONARY_CANONICAL_20260706.md, COSMILE_MEMORY_V3_02_LEARNING_COMMERCE_MEMORY_CONTRACT_20260706.md, COSMILE_MEMORY_V3_04_ORDER_REVENUE_FEEDBACK_OUTCOME_CONTRACT_20260706.md, COSMILE_MEMORY_V3_06_MEMORY_FACT_CANDIDATE_PROMOTION_RULES_20260706.md] · owns: [AdverseSignalActionMatrix(§4.5 — 사전 §5.3의 정본), safety fact lifecycle·safety-resolution rule 3경로(§6.1 — 사전 §5.2 집행 상세), safety-first branch("계속 써도 돼?" 분리), safety→commerce 억제 매핑(§5)] · referenced_by: [COSMILE_MEMORY_V3_00_INDEX_AND_EXECUTIVE_SUMMARY_20260706.md, COSMILE_MEMORY_V3_05_PRODUCT_INGREDIENT_INTELLIGENCE_MAPPING_20260706.md, COSMILE_MEMORY_V3_06_MEMORY_FACT_CANDIDATE_PROMOTION_RULES_20260706.md, COSMILE_MEMORY_V3_08_DB_INTEGRATION_INVARIANT_DESIGN_20260706.md, COSMILE_MEMORY_V3_09_ANALYTICS_REPORT_MINIMUM_20260706.md, COSMILE_MEMORY_V3_10_PRE_IMPLEMENTATION_REVIEW_PLAN_20260706.md, COSMILE_MEMORY_V3_DATA_DICTIONARY_CANONICAL_20260706.md]

---

## 0. 목적과 범위

이 문서는 COSMILE MEMORY V3 (Learning Commerce Memory Loop)에서 **안전·이상반응(adverse reaction) 가드레일**을 정의하는 설계 전용(design-only) 문서다.
V3의 학습 루프가 매출/마진/재구매를 최적화하는 방향으로 커질 때, **안전 신호가 commerce 최적화에 눌리지 않도록** 구조적으로 고정하는 것이 목표다.

핵심 명제 (이 문서 전체를 지배):

1. **이상반응 신호는 추천 신호보다 우선한다** (adverse reaction outranks recommendation).
2. **safety block 기록은 commerce 최적화보다 우선한다** (safety block memory outranks commerce optimization).
3. **의료 단정 금지** (NO medical assertions) — 진단/치료/처방/의학적 확정 발화를 하지 않는다.
4. **"계속 써도 돼?" 류 발화는 safety-first로 분리 처리한다.**
5. **의미 인식 = AI · 정책 집행 = deterministic gate.** safety는 MAX/fail-closed이며 commerce/output adapter가 낮출 수 없다.

이 문서는 **설계 + 계약(contract) + 검토 가능한 구현 계획**까지만 다룬다. **live/prod 활성화가 아니다.**
목표는 "자동 실행"이 아니라 **자동화 가능한 안전/학습 구조**를 짓는 것이다.

관련 형제 문서(실제 파일명 기준 상호참조):

- `COSMILE_MEMORY_V3_00_INDEX_AND_EXECUTIVE_SUMMARY_20260706.md` — V3 전체 개요/타깃 루프.
- `COSMILE_MEMORY_V3_02_LEARNING_COMMERCE_MEMORY_CONTRACT_20260706.md` — subject_ref/furef mint & memory ownership · **memory_context 최소화 계약(19필드·Foundation contract) 소유**.
- `COSMILE_MEMORY_V3_03_RECOMMENDATION_EVENT_CONTRACT_20260706.md` — RecommendationEvent · 얕은 상호작용(impression/click/add_to_cart) 소유(사전 §1.3 R-K7) · 추천 산출 측(§5 상한이 걸리는 곳).
- `COSMILE_MEMORY_V3_04_ORDER_REVENUE_FEEDBACK_OUTCOME_CONTRACT_20260706.md` — commerce outcome ingestion(checkout 이후 주문/매출/피드백) + **semantic 신호 추출 계약 소유**.
- `COSMILE_MEMORY_V3_06_MEMORY_FACT_CANDIDATE_PROMOTION_RULES_20260706.md` — MemoryFactCandidate → LongTermMemoryFact promotion(evidence/confidence).
- **본 문서 `COSMILE_MEMORY_V3_07_SAFETY_ADVERSE_REACTION_GUARDRAIL_20260706.md` — safety & adverse reaction guardrail (이 루프의 fail-closed 상한 · AdverseSignalActionMatrix·safety fact lifecycle 정본).**
- 어휘/enum/threshold 정본 = `COSMILE_MEMORY_V3_DATA_DICTIONARY_CANONICAL_20260706.md`(이하 "사전").

(구판 번호 참조 — "V3-03=promotion·V3-05=recommendation improvement·V3-06=memory_context" — 는 superseded: 패키지 재편 후 실제 파일 번호는 위와 같다.)

---

## 1. 상속과 canonical 기준 (V1 = CLOSED_WITH_LIMITS)

- V3는 **Memory V1 Option B**를 canonical로 상속한다.
- V3는 **Option A / `FOUNDATION_SUBJECT_REF_SECRET` mint를 상속하지 않는다** (superseded).
- subject_ref mint는 **service-local**이다:
  - `subject_ref = subj_v2_ + HMAC(<SVC>_SUBJECT_SECRET, '<svc>:subject:' + ref)[:32]`
  - `furef = furef_v2_ + HMAC(<SVC>_FUREF_SECRET, '<svc>:local_user:' + ref)[:32]` (cross-producer consistent).
- **Foundation = validate / gate / reasoning ONLY.** Foundation은 durable customer memory DB가 아니고, SIASIU/Cosmile service DB를 직접 읽지 않는다.
- Foundation에는 **최소화된 request-scoped `memory_context`만** 전달된다 (raw text/PII 없음; `raw_text_stored=False`; `request_scoped`).
- SIASIU와 Cosmile은 각자 자기 customer memory + commerce data를 **service-local**(per-service postgres schema `siasiu` / `cosmile`, cross-schema 직접 참조 없음)로 소유한다.
- Cosmile postgres는 현재 **schema/validate 수준**이다. real DB-integration은 완료로 보지 않는다. (본 문서에서 "real DB integration complete"라고 말하지 않는다.)

이 safety 가드레일은 위 상속 위에서만 동작한다. 즉 **안전 판단의 evidence 원문은 service-local에 남고, Foundation에는 최소화된 안전 신호 요약만** 넘어간다.

---

## 2. Adverse Reaction Signal 후보 (semantic recognition = AI)

아래 표현들은 **트리거 후보(candidate signal)**다. ★키워드 매칭이 raw text의 *최종 의미*를 확정하지 않는다.
raw 발화의 의미(이상반응인가 / 단순 질문인가 / 과거 회상인가)는 **AI semantic judgment**가 인식하고, 여기서 나온 구조화 신호에 대해서만 deterministic gate가 정책을 집행한다.

| signal_group | 대표 표현 (후보) | 1차 의미 분류 | 위험 방향 |
|---|---|---|---|
| `irritation_sting` | 따가움, 화끈거림, 쓰라림 | 국소 자극 반응 | caution↑ |
| `swelling` | 붓기, 부어오름 | 부기/부종 반응 | caution↑ / block 후보 |
| `rash_eruption` | 발진, 두드러기, 뾰루지 다발 | 피부 발진 | caution↑ / block 후보 |
| `itch` | 가려움, 간지러움 | 소양감 | caution↑ |
| `trouble_worsening` | 트러블 악화, 더 나빠짐, 번짐 | 기존 상태 악화 | caution↑ / block 후보 |
| `discontinuation` | 사용 중단, 끊었어요, 못 쓰겠어요 | 사용자 자발 중단 | negative-outcome 강신호 |
| `medical_reference` | 병원 감, 약 받음, 처방, 진료 | 의료 개입 언급 | escalate → safety-first |
| `allergy_reference` | 알레르기, 알러지, 특정 성분 반응 | 알레르기 이력/의심 | escalate → safety-first |

분류 규칙:

- AI semantic layer는 각 발화를 `{signal_group, intensity(약/중/강), certainty(추정/명시), temporality(현재/과거)}`로 구조화한다.
- 구조화 결과는 **deterministic 정본 축으로 정규화**된다: intensity(약/중/강) → **`adverse_severity` = low/moderate/severe**(사전 §2.4 — severity 미상은 low로 기록 + `adverse_certainty=reported` + 재평가 대기), certainty(추정/명시) → **`adverse_certainty`**(사전 §2.5 — 최초 자가보고=`reported`·독립 반복=`repeated`·CS/반품/전문 확인=`verified`·반증/정정=`contradicted`). §4.5 matrix 판정은 이 정본 축으로만 한다.
- **`medical_reference` / `allergy_reference` / `discontinuation`이 명시(certainty=explicit)로 인식되면** → 자동으로 `safety_priority=true`.
- semantic이 애매(certainty=낮음)하면 → **fail-closed**: caution 이상으로 올리고, commerce 강도는 낮춘다(§5).

★Leo 결정 필요: `swelling` / `rash_eruption` / `trouble_worsening`의 **signal_group/intensity → `adverse_severity` 매핑 기준**(severe 도달 = §4.5 matrix에 의해 즉시 block — 예: intensity=강 또는 medical_reference 동반 시 severe). 초기 제안은 "단독 = moderate 이하(caution), 의료/알레르기/중단 신호 동반 시 severe(block)".

---

## 3. "계속 써도 돼?" 류 — safety-first 분리 처리

"이거 계속 써도 돼요?", "그냥 계속 발라도 되나요?", "괜찮은 거 맞죠?" 같은 발화는 **commerce 재구매 유도(upsell) 질문으로 처리하면 안 된다.**

처리 원칙:

1. 이 발화는 **safety-first branch로 라우팅**한다 — 즉 "재구매/추천" 파이프라인이 아니라 "안전 확인" 파이프라인이 먼저 응답 소유권을 가진다.
2. 직전/최근 turn에 **adverse signal(§2)이 존재하면** → 무조건 safety-first. commerce 응답(추천/구매유도) suppress.
3. adverse signal이 없더라도 → **의료 단정 금지** 원칙에 따라 "괜찮다/문제없다"는 단정 대신, **사용자 자기관찰 안내 + 이상반응 시 중단·전문가 상담 권고**의 안전 프레이밍으로 응답한다.
4. commerce 추천은 **안전 확인 이후에만**, 그리고 안전 신호가 clear일 때만 재개한다.

| 입력 패턴 | 최근 adverse signal | 처리 branch | commerce 허용 |
|---|---|---|---|
| "계속 써도 돼?" | 있음 | safety-first (block/caution) | suppress |
| "계속 써도 돼?" | 없음 | safety-first (neutral, no medical claim) | 안전 프레이밍 후 조건부 |
| "재구매하려는데" | 있음 | safety-first override | suppress until resolved |
| "재구매하려는데" | 없음 | commerce normal | 허용 |

★Leo 결정 필요: safety-first branch에서 "안전 확인 이후 commerce 재개"를 **자동 재개**로 둘지, **명시적 사용자 재요청 필요**로 둘지. 초기 제안은 후자(사용자가 다시 물을 때만 재개)로 보수적.

---

## 4. 우선순위 계층 (deterministic gate — precedence)

정책 집행은 deterministic gate가 담당한다. 우선순위는 **위에서 아래로 강제**되며, 아래 단계가 위 단계를 절대 뒤집지 못한다(fail-closed, MAX):

```
1. SAFETY BLOCK        (이상반응 + 의료/알레르기/중단 강신호)   ← 최상위, 뒤집기 불가
2. SAFETY CAUTION      (단독 adverse signal, 애매 신호 포함)
3. SAFETY-FIRST FRAMING("계속 써도 돼?" 류, medical assertion 금지)
4. MEMORY WRITE RULE   (safety block/caution 기록 = 우선 기록)
5. COMMERCE OPTIMIZATION(추천/재구매/마진 — 위 1~4에 종속)
```

불변식(invariant):

- `adverse_signal == true` → `recommendation_strength`는 상승할 수 없다(추천이 이상반응을 이기지 못함). (구 `adverse_reaction_signal` 표기는 superseded — 사전 §2.1이 그 이름을 fact_type 구표기로 회수했으므로 boolean 신호는 `adverse_signal`로 통일.)
- `safety_gate == block` → 해당 turn/제품에 대한 commerce action(추천·add_to_cart 유도·재구매 push)은 **0**.
- **output/commerce adapter는 safety_gate 값을 낮출 수 없다.** adapter는 표현(voice)만 담당, 안전 등급 하향 권한 없음.
- safety 판단이 불확실 → **caution 이상으로 fail-closed**. (안전은 의심스러우면 올린다, 내리지 않는다.)

이 계층은 **Foundation safety gate + AI semantic + deterministic gate**의 합성 결과다(§0의 원칙 5). 세 층 중 어느 하나라도 caution/block을 요구하면 최종 결과는 그 이상이다(MAX 합성).

---

## 4.5 AdverseSignalActionMatrix (정본 — 사전 §5.3 등재)

adverse signal 1건의 **즉시 효과(deterministic)**는 아래 matrix가 유일한 판정 근거다. **정본 = 본 절**이며 사전 §5.3은 등재본이다.
축은 정본 enum만 쓴다: `adverse_severity` = **low | moderate | severe** 3값(사전 §2.4) × `adverse_certainty` = **reported | repeated | verified | contradicted** 4값(사전 §2.5).

| severity × certainty | 즉시 효과 (deterministic) |
|---|---|
| severe × reported | **immediate safety_block + recommend_hold**(해당 target) |
| moderate × reported | **safety_caution + avoid_repeat_recommendation until review** |
| low × reported | **caution_memory_candidate + no automatic commerce boost**(같은 축 positive candidate 강등 · 무시 금지 · 전 affinity 동결 아님) |
| low × repeated | **escalate → moderate-equivalent** 처리 |
| any × verified | **active safety fact**(§6.1 safety fact lifecycle — 사전 §5.2) |
| any × contradicted | **safety_resolution path**(자동 해제 아님 — resolution rule 통과 필요, §6.1) |

**불변식:**

- 모든 adverse signal은 **commerce optimization보다 우선**한다(§4 precedence — 어떤 행도 commerce가 뒤집을 수 없다).
- **low 무시 금지** — low×reported도 반드시 caution_memory_candidate + no boost 효과를 남긴다.
- **single low는 target 축 한정** — 단일 low 신호가 해당 target 밖의 전체 affinity를 영구 동결하지 않는다.
- **matrix 밖 조합 = fail-closed** — 정의되지 않은 조합은 상위 severity로 처리한다.

이 matrix는 V3-06 SO-1(promotion 측 즉시 효과)과 V3-04(outcome 캡처 측 효과 서술)의 공통 판정 근거이며, 문서 간 상이했던 서술("severity 무관 즉시 동결" vs "severe/moderate만 즉시" vs "단일 신호=프레이밍만")은 본 절로 정합화되었다(구 서술은 superseded — 사전 §5.3).

---

## 5. Commerce 억제 규칙 (safety → commerce 매핑)

| safety_gate_result | recommendation | 재구매/upsell push | memory_reuse (commerce) | 표시 방향 |
|---|---|---|---|---|
| `pass` | 정상 | 정상 | 정상 | 통상 |
| `caution` | 강도 하향, "사지 마세요" 후보 검토 | suppress | commerce 재사용 보류 | 안전 프레이밍 우선 |
| `block` | **0 (do_not_recommend / hold)** | **0** | **blocked** | safety-only, commerce off |

- caution/block 상태에서는 `decision_type`이 `recommend`로 나올 수 없다. 허용값: `do_not_recommend` / `hold` / `do_not_buy` / `ask_more` / `cannot_determine`.
- 이 매핑은 형제 문서 `COSMILE_MEMORY_V3_03_RECOMMENDATION_EVENT_CONTRACT_20260706.md`(추천 산출/이벤트 측)에 **상한(cap)**으로 걸린다: 학습 루프가 아무리 최적화해도 이 상한을 못 넘는다. (구 "V3-05 recommendation improvement loop" 참조는 superseded — 재편 후 실번호.)

---

## 6. Adverse Reaction → Memory 기록 규칙

이상반응은 학습 대상이지만, **단일 신호로 장기기억을 확정하지 않는다** (never confirm long-term memory from a single signal). 형제 문서 `COSMILE_MEMORY_V3_06_MEMORY_FACT_CANDIDATE_PROMOTION_RULES_20260706.md`의 promotion 규율을 안전 축에 적용한다(단, 즉시 효과는 §4.5 matrix가 별도 축으로 발동 — 실시간 안전은 문턱을 기다리지 않는다).

승격 경로:

```
adverse 발화(AI semantic 인식 → adverse_severity/adverse_certainty 정규화 §2)
  → MemoryFactCandidate(fact_type=ingredient_adverse/product_adverse, evidence 1건, adverse_certainty=reported)
  → evidence/certainty 누적 (반복 신호=repeated·중단·의료언급·CS/반품 확인=verified 등)
  → ltm_fact(fact_type=ingredient_adverse / product_adverse — 사전 §2.1) 승격
    (회피 축 병행 시 ingredient_aversion / product_aversion. 구 kind=adverse_reaction /
     avoid_ingredient / avoid_product 표기는 superseded — 사전 §2.1)
  → 다음 추천에서 회피(avoid) 근거로 사용
```

MemoryFactCandidate (adverse) 최소 필드:

| field | 예시값 | 비고 |
|---|---|---|
| `candidate_id` | opaque id (사전 §1.1) | service-local |
| `subject_key` | `subj_v2_...` | `COALESCE(subject_ref, guest_ref)` — 사전 §1.1 (Option B service-local mint) |
| `fact_type` | `ingredient_adverse` / `product_adverse` | 사전 §2.1 (구 `kind=adverse_reaction` 표기는 superseded — 사전 §2.1) |
| `signal_group` | `rash_eruption` | §2 |
| `adverse_severity` | `low/moderate/severe` | 사전 §2.4 (AI semantic intensity에서 정규화 — §2) |
| `adverse_certainty` | `reported/repeated/verified/contradicted` | 사전 §2.5 · fail-closed 판단 입력 |
| `linked_sku` | sku_ref (optional) | 원인 제품 후보 |
| `linked_ingredient` | ingredient_ref (optional) | 성분 회피 후보 |
| `evidence_count` | int | 승격 임계 입력(사전 §3 — 단 safety는 §4.5 즉시 축 별도) |
| `confidence` | float 0.0–1.0 | 사전 §3 (구 `low/med/high` enum 표기는 superseded — §7은 표기 라벨) |
| `safety_gate_at_capture` | `caution/block` | 캡처 시점 안전 등급 |
| `raw_text_stored` | `False` | 원문 저장 금지 |
| `request_scoped` | `True` | Foundation 전달분 |

기록 우선순위 규칙:

- **safety block/caution 기록은 commerce 기록보다 먼저·확실히 남긴다** (§4-4). commerce 이벤트 유실이 있어도 safety 캡처는 유실되면 안 된다.
- adverse memory의 만료/약화 처리 정본 = §6.1 safety fact lifecycle(구 "처리 방향 검토 필요" 상태는 §6.1로 종결).

### 6.1 Safety fact lifecycle (P1 — 정본 문구 · 사전 §5.2)

> **"Safety/adverse facts are not subject to ordinary evidence-threshold demotion. A safety fact may be deactivated only by an explicit safety-resolution rule, consent/erasure rule, or verified correction path. Commerce optimization and margin logic cannot demote or weaken an active safety fact."**

- active safety fact(`ingredient_adverse`·`product_adverse`·safety_flag 부착 fact — 사전 §2.1/§2.13)의 deactivation 경로는 **아래 3가지뿐**이며, 이 **safety-resolution rule의 상세 절차는 본 문서(V3-07)가 소유**한다:
  1. **deterministic safety-resolution rule** — `adverse_certainty=contradicted`(사전 §2.5) 도달 + 재평가(사전 §4 — adverse 재평가 주기 30d) 통과. contradicted 단독으로 자동 해제되지 않는다(§4.5 matrix any×contradicted 행 — resolution rule 통과 필요).
  2. **consent/erasure rule** — 사전 §7 lifecycle: `consent_state=withdrawn` = fact 보존 + `reuse_blocked=true` / `erasure_requested` = `deleted=true` + `must_not_reappear=true`(tombstone·파생 un-learning 포함).
  3. **verified correction path** — human safety review 통과(명시적 고객 정정 동반 — V3-06 SO-4/HR 경유).
- 일반 preference/affinity에 적용되는 evidence 문턱(사전 §3)·stale/expired 시간 감쇠·V3-08 INV-DB 강등 invariant는 **direction=safety fact에 적용되지 않는다**(사전 §5.2 — INV-DB-2는 direction≠safety fact 한정).
- 구 ★Leo 미결 "adverse LTM 만료 정책"은 본 절로 확정된다(superseded — 사전 §5.2): 시간 만료/문턱 미달로 약화되지 않고 위 3경로로만 deactivate("명시적 사용자 철회 또는 재검증 전까지 유지" 제안 채택). 잔여 파라미터(재평가 주기 등) = 사전 §4 ★Leo 표.

---

## 7. 승격 임계(evidence/confidence) 기준안

| 단계(표기 라벨) | 충족 조건(제안) | 다음 추천 반영 |
|---|---|---|
| `low` | 단일 발화 1건 (candidate — low×reported) | **caution_memory_candidate + no automatic commerce boost**(같은 축 positive candidate 강등 · 무시 금지 — §4.5 low×reported 행. 구 "회피 아님 · caution 프레이밍만" 서술은 superseded — 사전 §5.3: 프레이밍'만'이 아니라 candidate 기록 + boost 차단 효과가 남는다) |
| `med` | 반복 신호 2건+(low×repeated → moderate-equivalent — §4.5) 또는 중단 언급 동반 | soft avoid (해당 SKU 하향 · avoid_repeat_recommendation until review) |
| `high` | 의료/알레르기 언급 동반, 강신호(severe), 또는 verified(사전 §2.5) | hard avoid (해당 SKU/성분 do_not_recommend · active safety fact — §6.1) |

- 본 표의 low/med/high는 **표기 라벨**이다 — 정본 판정 축 = §4.5 matrix(`adverse_severity`×`adverse_certainty` — 사전 §2.4/§2.5)이고, confidence 정본 = float 0.0–1.0·문턱 = 사전 §3(구 confidence enum 표기는 superseded — 사전 §3).
- **단일 신호 → 즉시 장기 avoid 확정 금지.** 단, 단일 신호라도 `medical_reference`/`allergy_reference` 동반(=severe)이면 **그 turn의 safety_gate는 즉시 caution/block**(기록 승격과 별개로 실시간 안전은 즉시 발동 — §4.5).
- 즉, "장기기억 승격"과 "실시간 안전 게이트"는 분리된 축이다: 실시간은 fail-closed로 즉시(§4.5 matrix), 장기 avoid는 evidence 누적으로 신중. 단 **low도 무시되지 않는다**(caution_memory_candidate + no boost).

★Leo 결정 필요: `med`/`high` 임계 카운트(2건/반복 정의)와, "반복"의 시간 창(window) 정의(파라미터 표 = 사전 §4).

---

## 7.5 M6-G 연결 (V1 이월 — ★Leo 미결)

- **M6-G의 정의(A: adverse-memory *ingress* gate — 이상반응 신호의 memory 유입 시점 판정 vs B: adverse-memory *reuse* gate — 저장된 안전 기억의 재사용 시점 판정)는 V1에서 이월된 Leo 미결 사항**이다.
- 본 safety gate는 **정의 확정 전 activation 불가**다(Hard Stop — §11과 동일하게 무접촉·design-only 유지).
- 단, **양 정의 모두에서 판정 근거는 §4.5 AdverseSignalActionMatrix**다: 정의 A(ingress)를 채택하면 candidate 캡처 시점에, 정의 B(reuse)를 채택하면 재사용/재추천 시점에 동일한 matrix 행 효과를 집행한다 — 정의 선택은 gate의 *발동 위치*를 바꿀 뿐 *판정 내용*을 바꾸지 않는다.

---

## 8. Foundation contract (validate/gate only — 최소화 전달)

Foundation은 이 안전 판단의 **validator/gate/reasoner**일 뿐 memory store가 아니다. Cosmile → Foundation으로 넘기는 것은 **request-scoped minimized memory_context**뿐이다.

Foundation에 전달(허용):

- `safety_signal_summary`: `{signal_group, intensity, certainty, temporality}` (구조화 요약, 원문 없음)
- `prior_adverse_flags`: bool/count 수준(예: `has_prior_adverse=true`, `adverse_count=2`)
- `medical_reference_flag` / `allergy_reference_flag`: bool
- `subject_ref` (Option B service-local mint)

Foundation에 전달 금지:

- raw 발화 원문 · PII · 고객 식별 원문 · service DB row · trace_id 원문 · full env.

Foundation 반환(decision output, §V3 공통 계약):

- `decision_type`: recommend / do_not_recommend / hold / do_not_buy / ask_more / cannot_determine
- `evidence_mode`: cannot_determine / uncertain / cautious / grounded
- `safety_gate_result`: pass / caution / block
- `memory_reuse_decision`: allowed / blocked / expired / deleted / consent_required / not_available
- `reason_codes` (예: `ADVERSE_REACTION_PRESENT`, `MEDICAL_REFERENCE`, `SAFETY_FIRST_FRAMING`, `COMMERCE_SUPPRESSED_BY_SAFETY`)
- `applied_to_real_user=false` · `write_performed=false`

**MAX 합성:** Foundation safety_gate_result와 Cosmile deterministic gate 중 **더 엄격한 값**이 최종값이다. output adapter는 이를 낮추지 못한다.

---

## 9. SIASIU/Foundation 안전 경험의 Cosmile 이식

SIASIU(상담형 vertical)와 Foundation Trust Core/Safety Guard가 이미 검증한 안전 행동을 Cosmile commerce 추천에 **재사용**한다(새로 갈아엎지 않는다).

이식 대상(설계 레벨):

- SIASIU의 상담 안전 프레이밍(의료 단정 회피, 이상반응 우선, 전문가 상담 권고 톤) → Cosmile 추천 응답의 safety-first 프레이밍으로 매핑.
- Foundation safety gate(pass/caution/block) 의미론 → Cosmile decision loop의 상한으로 그대로 수용.
- Dual-Vertical Test Policy(양 vertical shared cases) → 이 가드레일의 회귀 케이스를 SIASIU·Cosmile 양쪽으로 검증.

★주의: SIASIU product code는 SIASIU repo 내에서만 수정. 본 문서는 contract/매핑만 정의한다.

---

## 10. 검증 가능한 케이스(설계 레벨 — 구현 시 회귀로)

이 문서는 코드가 아니므로 아래는 **미구현 계획**이다(테스트되었다고 말하지 않는다).

- C1: adverse signal(강) + 추천 요청 → 최종 `do_not_recommend` 또는 `hold`, commerce push=0.
- C2: "계속 써도 돼?" + 직전 adverse → safety-first, 의료 단정 문구 0, upsell 0.
- C3: medical/allergy 언급 단독 1건 → 실시간 safety_gate ≥ caution, 장기 avoid는 미승격(단일 신호).
- C4: output adapter가 block을 pass로 낮추려는 입력 → 거부, 최종 block 유지(adapter 하향 불가).
- C5: adverse candidate 반복 2건+(low×repeated → moderate-equivalent — §4.5) → med 단계, 해당 SKU soft avoid.
- C7: low×reported 단일 신호 → caution_memory_candidate 기록 + no automatic commerce boost(무시 0건·전 affinity 동결 0건 — §4.5).
- C6: safety block turn에서 memory write는 safety 기록만, commerce 기록은 suppress/후순위.
- invariant 카운터: `unsupported_recommendation=0`, `medical_assertion=0`, `safety_downgrade_by_adapter=0`, `commerce_over_safety=0`.

이 케이스들은 형제 문서 `COSMILE_MEMORY_V3_03_RECOMMENDATION_EVENT_CONTRACT_20260706.md` / `COSMILE_MEMORY_V3_06_MEMORY_FACT_CANDIDATE_PROMOTION_RULES_20260706.md`의 케이스와 함께 cross-project regression으로 묶는다(구현 release train에서).

---

## 11. Hard Stop (out-of-scope — 무접촉)

이 설계서는 아래를 **하지 않는다**(전부 out-of-scope):

- prod DB access · Cosmile real DB integration(현재 schema/validate 수준) · prod DB migration/backfill.
- real secret / Vault write / real secret view · `<SVC>_SUBJECT_SECRET` 등 실 값 노출.
- main merge · live activation · public API live · external release · real user exposure.
- checkout/order/customer DB write · canonical write · learned promotion · customer memory live migration.

모든 flag 기본값 OFF, write/live/promotion=0, applied_to_real_user=false. 이 문서가 승인(PASS/APPROVED)되기 전에는 어떤 repo 코드도 수정하지 않는다(Design-First Operating Rule).

---

## 12. Open Questions (요약 — ★Leo 결정 필요)

1. §2 — swelling/rash/trouble_worsening의 **signal_group/intensity → adverse_severity 매핑 기준**(severe 도달 시 block은 §4.5 matrix로 확정).
2. §3 — safety-first 이후 commerce **자동 재개 vs 명시 재요청**.
3. §6 — ~~adverse LongTermMemoryFact 만료 정책~~ (해소 — §6.1/사전 §5.2로 확정: 3경로만·시간 만료로 약화 없음. superseded — 사전 §5.2).
4. §7 — med/high **evidence 카운트 임계 및 반복 window**(파라미터 표 = 사전 §4).
5. (신규) medical/allergy 언급 시 "전문가 상담 권고" 문구를 **고정 템플릿**으로 둘지, service voice에 위임할지(단, 안전 의미는 낮출 수 없음).
6. §7.5 — **M6-G 정의(A ingress vs B reuse)** — V1 이월 미결·정의 확정 전 gate activation 불가.

---

## 무결성

design-only(코드/구현 없음). Memory V1 **Option B 상속**(Option A / FOUNDATION_SUBJECT_REF_SECRET mint 미상속·superseded). **Foundation = validate/gate/reasoning ONLY**(durable memory DB 아님, service DB 직접 read 없음, request-scoped minimized memory_context만). **service-local ownership**(SIASIU·Cosmile 각자 memory/commerce 소유, cross-schema 직접참조 없음; Cosmile postgres는 schema/validate 수준). **safety-first**: 이상반응 > 추천, safety block > commerce, 의료 단정 금지, "계속 써도 돼?"는 safety-first 분리, safety는 MAX/fail-closed이며 output/commerce adapter가 낮출 수 없음. 의미 인식=AI · 정책 집행=deterministic gate. **no prod / no live / no main merge / no real secret · Vault / no external release** (Hard Stop 무접촉).
