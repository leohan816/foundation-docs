# Caller-side Intent/Risk Classifier — Design — 2026-06-29

> Status: DESIGN + verified shadow/mock eval (read-only). 모든 live/write/promotion 경로는 DISABLED 이며 별도 릴리스 트레인(separate release train)으로 남아 있습니다.
> Scope: foundation-control 저장소 내 **contract + deterministic fail-closed policy** 의 검증. Product 저장소(SIASIU, Cosmile)는 **수정되지 않았습니다** (contract only; repo-local 채택은 별도 트레인).

---

## 1. Motivation — the consultation-train mislabel boundary

직전 consultation 트레인은 500-case baseline + **mislabel boundary test** 를 남겼습니다. 핵심 위험은 다음 한 줄로 요약됩니다.

> **A genuinely risky query가 caller(SIASIU/Cosmile) 의 intake 단계에서 `general` / low-risk 로 잘못 라벨링되어 Foundation 으로 전달되는 것.**

Foundation 은 설계상 caller 가 보낸 `answer_type` / `high_risk` 라벨을 **신뢰**합니다 (no-heuristics 원칙: Foundation core 가 원문을 keyword 로 추측하지 않음). 따라서 안전성의 무게중심은 **caller intake 단계의 라벨 정확성**으로 이동합니다. caller 가 임신/의료/이상반응/시술/내부알고리즘 질의를 `general` 로 흘려보내면, Foundation 의 모든 다운스트림 가드는 잘못된 전제 위에서 동작합니다.

이 트레인은 그 **mislabel 경계**를 caller 측에서 막는 **intake-layer safety classification CONTRACT + fail-closed policy** 를 설계/검증합니다. Foundation core 에 keyword scanner 를 붙이는 것이 **아닙니다**.

### 1.1 Phase 0 inventory (현황)

| Vertical | 현재 intake 분류기 | 비고 |
|---|---|---|
| SIASIU | 존재함 — `atc.classify(query, hits)` in `app/ssbrain/answer.py` | answer_type 를 이미 생성 |
| Cosmile | **없음** — commerce shell, `ConsultationMetaTracker` 만 존재 | intake 분류기가 필요 |
| Consultation | 500-case baseline + mislabel boundary test 존재 | 이 트레인이 그 경계를 다룸 |

---

## 2. No-heuristics-compliant design

### 2.1 The problem with the naive fix

"위험 질의를 잡으려면 caller 가 원문을 keyword 스캔하면 되지 않나?" → no-heuristics 원칙 위반입니다. **의미(meaning) 를 keyword 로 추측하는 것**이 금지 대상입니다.

### 2.2 The compliant design

분류기의 입력은 **원문(raw text) 이 아니라** 상류 LLM(semantic judgment)이 추출한 **구조화된 `SemanticFrame`** 입니다. 분류기는 그 frame 위에서 **deterministic fail-closed policy** 를 적용합니다.

```
raw user text
   │
   ▼  (upstream LLM — semantic judgment; OUT OF SCOPE for this train, see §8)
SemanticFrame  { intent signals, risk signals, evidence signals, confidence }
   │
   ▼  (caller_intake classifier — DETERMINISTIC fail-closed policy = "정확한 결정론")
IntentRiskClassification  { high_risk, floor, must_not_recommend, route_to_foundation_contract, ... }
   │
   ▼  (corrected route)
Foundation.api  (caller 가 보낸 answer_type/high_risk 를 신뢰)
```

- **"정확한 결정론"(precise determinism)** — 구조화된 신호 위의 결정론적 규칙은 no-heuristics 원칙이 **명시적으로 허용**합니다. 금지되는 것은 의미의 keyword-guessing 이며, 이미 추출된 구조 신호에 대한 결정론적 정책은 그 대상이 아닙니다.
- 분류기는 risk 를 **독립적으로 재도출(re-derive)** 하고, Foundation 으로의 **corrected route** 를 생성합니다 (risky intent 를 절대 `general` 로 보내지 않음).
- 이것은 Foundation core 에 bolt-on 되는 keyword scanner 가 **아니며**, caller intake 레이어의 contract + policy 입니다.

---

## 3. Contract schema — `IntentRiskClassification`

`caller_intake/intent_risk_contract` 에 정의된 contract 의 전체 필드:

| Field | 의미 | Fail-closed default |
|---|---|---|
| `intent_type` | 추출된 intent 분류 | — |
| `risk_type` | 추출된 risk 분류 | — |
| `high_risk` | 고위험 여부 | **True** (불확실 시) |
| `evidence_required` | 답변에 근거 필요 여부 | — |
| `allowed_decision_floor` | 허용되는 결정 바닥값 (recommend / hold / ask_more / do_not_recommend) | **ask_more** (불확실 시) |
| `must_not_recommend` | 추천 금지 플래그 | **True** (불확실 시) |
| `ask_more_required` | 추가 질문 요구 | — |
| `route_to_foundation_contract` | `{ answer_type, high_risk }` — Foundation 으로 전달할 corrected 라벨 | — |
| `confidence` | 추출 신뢰도 (0.0–1.0) | — |
| `reason_codes` | 결정 근거 코드 목록 | — |
| `applied_to_real_user` | 실사용자 적용 여부 | **False** (이 트레인 전체) |
| `write_performed` | write 수행 여부 | **False** (이 트레인 전체) |

**Fail-closed defaults 요약:** 불확실(uncertain)하면 `high_risk=True`, `must_not_recommend=True`, `floor=ask_more`. 안전한 방향으로 실패합니다.

---

## 4. Fail-closed policy rules (Phase 3)

`caller_intake/intent_risk_classifier` 의 결정론적 규칙 (위에서 아래로, 먼저 일치하는 규칙 적용):

| # | 조건 (over SemanticFrame) | floor | must_not_recommend | 비고 |
|---|---|---|---|---|
| 1 | `malicious` / deception | **do_not_recommend** | True | 적대적 의도 차단 |
| 2 | `internal` (내부 알고리즘 캐묻기) | **do_not_recommend** | True | `internal_algorithm_question` 라벨 부여, 비공개 |
| 3 | `ambiguous` / `mixed` / low-confidence (`< 0.70`) | **ask_more** | True | `ask_more_required`, fail-closed |
| 4 | `high_risk` (pregnancy/medical/adverse/procedure 등) | **never recommend** — tier1 evidence 있으면 **hold**, 없으면 **ask_more** | True | 위험군은 절대 recommend 불가 |
| 5 | brand-claim-only / insufficient evidence | **hold** | True | 근거 부족은 보류 |
| 6 | low-risk + grounded + confident | **recommend** | False | 안전 경로만 추천 |

핵심 불변식: **high-risk 는 어떤 경우에도 `recommend` 로 가지 않으며**, 불확실/적대/내부 신호는 결정론적으로 안전 바닥값으로 떨어집니다.

---

## 5. Intent → answer_type corrected routing (risky never general)

`INTENT_TO_ANSWER_TYPE` 는 risky intent 를 **구체적(specific)** answer_type 으로 매핑하며, **★ high-risk intent 를 절대 `general` 로 매핑하지 않습니다.**

| Intent | Corrected `answer_type` |
|---|---|
| pregnancy | `pregnancy_lactation_question` |
| medical | `medical_boundary_question` |
| adverse | `adverse_reaction_question` |
| procedure | `skin_procedure_question` |
| internal | `internal_algorithm_question` |

caller 가 naive 하게 `general` / low-risk 로 보냈더라도, 분류기는 frame 신호로부터 risk 를 재도출하여 위 corrected 라벨 + `high_risk=True` 로 **override** 합니다. 이것이 mislabel 방어의 메커니즘입니다.

---

## 6. 15-category test matrix (Phase 2)

300 fixtures = **15 categories × 20 each** (`caller_intake/intake_fixtures`). risky 카테고리 일부는 `naive_label` 이 `general`/low-risk 로 **mislabel 시뮬레이션**되어 들어옵니다.

검증된(today, ALL PASS) 카테고리별 라우팅/floor 분포:

| Category | n | Corrected route(s) | Floor 분포 | high_risk | must_not_recommend | mislabeled |
|---|---|---|---|---|---|---|
| general_skincare | 20 | `general`, `safety_question` | recommend 16 / ask_more 4 | 4 | 4 | 0 |
| product_recommendation | 20 | `product_recommendation_question` | recommend 16 / ask_more 4 | 4 | 4 | 0 |
| purchase | 20 | `purchase_decision_question` | recommend 16 / ask_more 4 | 4 | 4 | 0 |
| do_not_buy | 20 | `do_not_buy_question` | do_not_recommend 16 / ask_more 4 | 4 | 4 | 0 |
| pregnancy_lactation | 20 | `pregnancy_lactation_question` | ask_more 15 / hold 5 | 20 | 20 | **20** |
| adverse_reaction | 20 | `adverse_reaction_question` | ask_more 15 / hold 5 | 20 | 20 | **20** |
| medical | 20 | `medical_boundary_question` | ask_more 15 / hold 5 | 20 | 20 | **20** |
| skin_procedure | 20 | `skin_procedure_question` | ask_more 15 / hold 5 | 20 | 20 | **20** |
| internal_algorithm | 20 | `internal_algorithm_question` | do_not_recommend 20 | 20 | 20 | **20** |
| insufficient_evidence | 20 | `product_recommendation_question` | hold 16 / ask_more 4 | 4 | 20 | 0 |
| brand_claim | 20 | `product_recommendation_question` | hold 16 / ask_more 4 | 4 | 20 | 0 |
| memory_based | 20 | `product_recommendation_question` | recommend 16 / ask_more 4 | 4 | 4 | 0 |
| ambiguous | 20 | `safety_question` | ask_more 20 | 20 | 20 | 0 |
| malicious | 20 | `safety_question` | do_not_recommend 20 | 20 | 20 | 0 |
| mixed | 20 | `safety_question` | ask_more 20 | 20 | 20 | 0 |

**Aggregate floor distribution:** ask_more 128 / recommend 64 / do_not_recommend 56 / hold 52 (= 300).

### 6.1 Eval result (Phase 4 — today, ALL PASS)

| Metric | Value |
|---|---|
| total / pass / fail | 300 / 300 / 0 (`all_pass=true`) |
| `high_risk_false_general` | **0** |
| `unsafe_recommend` | **0** |
| `must_not_recommend_violation` | **0** |
| medical/pregnancy/adverse/procedure overreach | **0** |
| `internal_disclosure` | **0** |
| `write_live_promotion` | **0** |
| `all_invariants_zero` | **true** |
| mislabeled_inputs / caught | 100 / 100 |
| **mislabel_defense_rate** | **1.0** (100/100 — naive `general`/low-risk 가 high_risk + corrected route 로 override) |
| correct_label_pass / total | 200 / 200 |
| 단위 테스트 | 4 pass (classifier, fail_closed, mislabel_defense, dual_vertical) |

mislabeled_inputs=100 은 5개 risky 카테고리(pregnancy/adverse/medical/skin_procedure/internal) × 20 = 100 으로, 전부 catch 되었습니다.

---

## 7. Dual-vertical (SIASIU intake + Cosmile intake)

동일 contract/policy 를 두 vertical 의 intake 형태로 검증 (둘 다 read-only/shadow/in-process; live/write 0).

### 7.1 Cosmile (in-process `foundation.api`)

| Metric | Value |
|---|---|
| total | 300 |
| `high_risk_recommend` | **0** |
| `no_write_all` | true |
| `foundation_api_via_all` | true (모든 결정이 foundation.api 경유) |

(`cosmile_routing` 300건 모두 `hr_recommend=false`, `no_write=true`, `foundation_api_via=true`.)

### 7.2 SIASIU shadow worker (`scripts/_caller_siasiu_route_worker.py`)

| Metric | Value |
|---|---|
| total / pass / fail | 300 / 300 / 0 (`all_pass=true`) |
| `answer.py` fingerprint | `d7f579443f8a110a` — **UNCHANGED** |
| `high_risk_recommend` | 0 |
| `must_not_recommend_violation` | 0 |
| `high_risk_false_general` | 0 |
| `no_write_all` / `trace_clean_all` | true / true |
| `flag_restored_off` | true (shadow 플래그 OFF 로 복원) |

SIASIU shadow worker 는 `answer.py` 를 **읽기만** 했고 fingerprint 가 변하지 않았음을 증명합니다 — product 코드 무수정.

### 7.3 Phase 5 regression — all_pass

| Suite | Result |
|---|---|
| Foundation runner | 89/89 · 651 |
| Cosmile readiness | 164/164 |
| SIASIU integration | 39/39 |
| SIASIU workflow | 119/119 |
| Cosmile loop v0.1 | 112/112 |
| Consultation 500-case baseline | preserved |
| Loop test files | 22/22 (10+8+4) |

FOUNDATION & SIASIU clean.

---

## 8. Honest scope boundary (recursive — LLM extraction accuracy = next train)

정직하게 기록합니다. 이 트레인이 **증명한 것**과 **증명하지 않은 것**:

- ✅ **증명함:** *correctly-extracted SemanticFrame 이 주어졌을 때*, caller policy 는 (a) risky 를 절대 `general` 로 보내지 않고, (b) risky/uncertain 을 절대 recommend 하지 않는다 — contract + fail-closed policy + corrected routing 의 정확성.
- ❌ **증명하지 않음:** **SemanticFrame 추출 자체의 정확도**. 즉 production LLM 이 raw text 로부터 임신/의료/이상반응/시술 등을 올바르게 식별하는지는 **OUT OF SCOPE** 입니다. 그것은 live LLM semantic judgment + repo-local intake 이며 **별도 트레인(next boundary)** 입니다.

> 한 줄 요약: 이 트레인은 *"주어진 정확한 구조 신호 하에서 caller policy 가 안전하다"* 를 증명합니다. 상류 LLM 추출이 완벽하다는 것은 증명하지 **않습니다**. 그것이 다음 경계(next train)입니다.

---

## 9. Deliverables & 저장소 경계

### 9.1 Deliverables (foundation-control only)

- `caller_intake/` 패키지 — `__init__`, `intent_risk_contract`, `intent_risk_classifier`, `intake_fixtures`, `intake_foundation_bridge`
- `scripts/caller_side_intent_risk_eval.py`, `scripts/_caller_siasiu_route_worker.py`
- `tests/test_caller_intent_risk_{classifier,fail_closed,mislabel_defense,dual_vertical}.py`
- `reports/integrated/CALLER_SIDE_INTENT_RISK_CLASSIFIER_EVAL_20260629.json` (generated)

### 9.2 Product 저장소는 수정되지 않음

- SIASIU / Cosmile 저장소는 **수정되지 않았습니다**. 이 트레인은 **contract only** 이며, **repo-local 채택은 별도 트레인**입니다 (Leo approval 필요):
  - SIASIU repo-local: `app/ssbrain` intake 에서 `atc.classify` → `IntentRiskClassification` + fail-closed 채택.
  - Cosmile repo-local: intake 분류기 구현 (현재 commerce shell 에는 없음).
  - 상류 LLM SemanticFrame 추출 정확도 검증 (recursive next boundary).

---

## 10. Still DISABLED / separate release train

다음 항목들은 **이 트레인에서 활성화되지 않았으며, 전부 DISABLED 상태로 별도 릴리스 트레인(separate release train)에 남아 있습니다.** 본 트레인은 read-only/mock/shadow 이며 live/write/promotion = 0 입니다.

- production 은 live 가 아니며, public API 는 DISABLED — *public API live 는 별도 릴리스 트레인.*
- real customer memory migration 은 수행되지 않음 (DISABLED) — *customer memory migration 은 별도 릴리스 트레인.*
- checkout/order/customer DB 는 변경되지 않음 (DISABLED) — *별도 릴리스 트레인.*
- real user AI consultation 은 활성화되지 않음 (DISABLED) — *별도 릴리스 트레인.*
- canonical write 는 DISABLED — *별도 릴리스 트레인.*
- learned promotion 은 DISABLED — *별도 릴리스 트레인.*
- Vault write 는 DISABLED — *별도 릴리스 트레인.*
- Cosmile live integration 은 DISABLED (in-process shadow 만 검증) — *별도 릴리스 트레인.*
- Foundation core 에 keyword scanner 부착, force push 도 금지/미수행.

> 모든 데이터(`applied_to_real_user=False`, `write_performed=False`)가 그 경계를 코드 레벨에서 강제합니다.
