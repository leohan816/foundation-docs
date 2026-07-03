# COSMILE AI COMMERCE DECISION LOOP v0.1 — RISK REGISTER — 2026-06-29

> Scope: `foundation-control` CONTROL workspace, Phase-7 신규 산출물 **Cosmile AI Commerce Decision Loop v0.1**
> (package `cosmile_loop/`). 본 문서는 v0.1 shadow 루프의 **위험 등록부(Risk Register)** 이며, 모든 잔여위험(residual)을
> 설계 invariant(불변식)와 오늘(2026-06-29) 실측한 eval 카운터로 0 으로 몰아가는 근거를 명시한다.
> 본 워크스페이스는 기존 자산을 **확장·재사용**(extend & reuse)만 하며, product repo 에는 **절대 쓰지 않는다**.

---

## 0. 요약 (Executive Summary)

- v0.1 은 기존 Cosmile readiness adapter(commit `1ce099e`, eval **164/164**)를 `realpath(repos/siasiu)` 경유로
  **read-only** 재사용하는 CONTROL-side shadow 레이어다. readiness 8-adapter suite 는 **수정하지 않았다**(164/164 보존).
- 오늘 실측: v0.1 e2e eval = **112 scenarios / 112 pass / 0 fail (all_pass=true, ≥100 ✓)**. 10 loop test files = **10/10 PASS**.
- v0.1 의 **10개 안전 invariant 카운터가 전부 0**:
  `unsupported_or_unsafe_recommendation, unsafe_purchase, unsafe_do_not_buy, high_risk_false_allow,
  memory_leak_or_misclass, preference_overrides_safety, internal_disclosure, fallback_broken,
  no_live_write_violations, trace_raw_pii_leaks`. 부가: `do_not_buy_reason_coverage=1.0, fallback_works=true, trace_clean=true`.
- Cross-project regression = **all_pass=true**, 15 safety invariants 전부 0, `write_live_promotion=0, force_push=0`.
- **라이브/쓰기 활성화(live-enable) 위험은 본 문서 범위 밖**이다. production live / public API live / web live /
  real customer traffic / checkout·order·customer DB write / canonical write / learned promotion / Vault write /
  customer memory live migration / 실사용자 AI 상담 / Cosmile live 연동은 **전부 DISABLED**이며, 각각 **별도의
  게이트형 release train**(사람 승인 필요)으로만 다룬다. v0.1 은 이를 코드로 `False`/`HARD_OFF` 강제한다.

---

## 1. 평가 척도 (Scoring Legend)

| 척도 | 값 | 의미 |
|---|---|---|
| Likelihood (사전, 통제 전) | Low / Med / High | 통제장치가 없다고 가정했을 때의 발생 가능성 |
| Impact | Low / Med / High / Critical | 발생 시 안전·신뢰·repo 무결성에 대한 영향 |
| Residual (사후, 통제 후) | **0 (driven to 0)** | 설계 invariant + 오늘 실측 eval 카운터로 관측 0 |

> "Residual = 0" 은 "위험이 영원히 불가능"이라는 뜻이 아니라, **해당 위험에 대응하는 invariant 카운터가 오늘 실측에서
> 0 이고, 그 카운터를 ≠0 으로 만드는 시나리오가 eval 코퍼스에 존재하며 모두 PASS** 임을 의미한다. 즉 **측정 가능한
> 잔여위험이 0** 이다.

---

## 2. 위험 등록표 (Risk Register)

| # | Risk | Likelihood | Impact | Mitigation (설계·재사용) | Residual (invariant 카운터 / 오늘 실측) |
|---|---|---|---|---|---|
| R1 | **Unsafe / unsupported recommendation** — 근거 부족·고위험인데도 추천 | High | Critical | `recommend` 는 **`evidence_sufficient ∧ not high_risk ∧ safety_gate_result != block`** 일 때만 발생. evidence_mode 등급(cannot_determine<uncertain<cautious<grounded)으로 근거 부족 시 추천 차단. readiness REC adapter 를 read-only wrap. | `unsupported_or_unsafe_recommendation = 0`. e2e recommendation category 16 scenarios PASS; `decision_type_counts.recommend=22`, `cannot_determine=20`. **Residual 0** |
| R2 | **High-risk false allow** — 고위험 상황을 통과시켜 추천/구매 허용 | Med | Critical | 고위험(high_risk)은 **절대 recommend 안 함 → `hold`**. Trust Core 16-gate 중 medical_boundary / pregnancy_lactation / skin_procedure 게이트가 max_answer_mode 를 cautious 로 cap. | `high_risk_false_allow = 0`; `unsafe_purchase = 0`. safety category 24 scenarios PASS; `hold=16`. (cross-project `high_risk_false_allow 0` 일치) **Residual 0** |
| R3 | **Cross-customer memory leak** — 타 고객 메모리 누수/혼입 | Low | Critical | `cross_customer_isolation_gate` + CDM `can_use` reason `cross_customer_isolation`. v0.1 `memory_reuse_decision` 가 `blocked` 로 분류. | `memory_leak_or_misclass = 0`. memory_reuse category 10 scenarios PASS. **Residual 0** |
| R4 | **Reuse of deleted / blocked / expired memory** | Low | High | `deleted_blocked_expired_gate` + CDM reason `deleted_or_expired_or_blocked`. v0.1 schema 가 `expired/deleted/blocked/consent_required/not_available` 상태로 명시 분기. | `memory_leak_or_misclass = 0`; `memory_reuse_decision` 상태값으로 가시화. memory_reuse 10 scenarios PASS. **Residual 0** |
| R5 | **Preference / purchase pressure overriding safety** | Med | Critical | **preference 는 recommend→do_not_recommend 로 DOWNGRADE 만 가능**, 안전을 override 불가. purchase pressure 는 **기록만 하고 safety 를 바꾸지 않음**. Memory 의 preference·outcome_feedback 은 evidence 기여도 **0.0**, 안전 override 불가. | `preference_overrides_safety = 0`. preference_mismatch 6 + purchase_pressure 6 scenarios PASS. `do_not_recommend=43`. **Residual 0** |
| R6 | **Internal algorithm disclosure** — 내부 알고리즘/로직 외부 노출 | Med | High | `internal_algorithm_guard` + `external_disclosure_guard`. internal-algorithm 질의는 **차단**. `safe_for_external` 플래그로 외부 노출 가드. | `internal_disclosure = 0`. internal_disclosure 6 scenarios PASS. **Residual 0** |
| R7 | **Raw / PII in trace** — trace·report 에 원문/쿼리/PII/secret 유입 | Med | Critical | `trace_redaction_secret_guard`: trace 는 **`id/hash/ref/status/reason_code` 만** 허용, `query/body/raw/PII/secret` 키 금지. v0.1 trust_trace adapter 가 readiness trace 를 wrap. | `trace_raw_pii_leaks = 0`; `trace_clean = true`. **Residual 0** |
| R8 | **Accidental live / write to product repos** — control 작업이 FOUNDATION/SIASIU/Cosmile 에 쓰기 | Med | Critical | CONTROL workspace 는 repo 를 **symlink read-only** 참조, repo 코드 merge 안 함. runner report 는 scratch 로 redirect → product repo clean 유지. schema 가 `live_write/checkout_changed/order_changed/customer_db_write/product_canonical_write/vault_write/customer_memory_live_migration/canonical_write/learned_promotion` = **전부 False**. | `no_live_write_violations = 0`; `write_performed=false, applied_to_real_user=false`. cross-project: FOUNDATION clean, SIASIU clean, Cosmile = **1 PRE-EXISTING** 미커밋(`app/next.config.ts`, 우리 작업 아님). `write_live_promotion=0`. **Residual 0** |
| R9 | **Feature-flag accidentally left ON** — 플래그가 켜진 채 잔존 | Med | High | `cosmile_ai_commerce_loop_enabled = False` (default OFF). `loop_active()` 는 **v0.1 플래그 AND 기존 readiness `cosmile_integration_enabled` 둘 다 ON** 일 때만 활성. **HARD_OFF 리스트**(checkout_live, order_live, customer_db_write, product_canonical_write, customer_memory_live_migration, learned_promotion, api_live, production_live, web_live, real_customer_traffic, vault_write, raw_llm_draft_storage, checkout_order_customer_db_write)는 코드가 강제 OFF. 테스트는 `shadow_enabled()`(temporary ON)을 쓰고 `finally` 에서 복원. | flag OFF 시 fallback 경로 = `fallback_flag_off` 10 scenarios PASS; `no_live_write_violations=0`. **Residual 0** |
| R10 | **Foundation-unavailable mishandling** — Foundation Core 부재 시 오동작 | Med | High | Foundation 불가 시 **fallback** 모드로 안전 degrade (status=`fallback`, decision_type=`cannot_determine`/`ask_more`). readiness fallback 경로 재사용. | `fallback_broken = 0`; `fallback_works = true`. foundation_unavailable 6 + fallback_flag_off 10 scenarios PASS. **Residual 0** |
| R11 | **Symlink-path materialization side-effect** — `repos/siasiu` symlink 경유로 namespace builder 가 SIASIU `foundation/` 재-export wrapper 를 재생성 | Med (관측됨) | Med | **Root cause**: namespace builder 가 `abspath(__file__)`(symlink 미해소)를 임베드 → 48개 auto-generated re-export wrapper 가 symlink 경로로 재생성됨. **대응**: 즉시 root-cause → canonical 커밋 상태로 **revert** → SIASIU 도구를 **`realpath` 로 구동하도록 hardening**. v0.1 부트스트랩(`_bootstrap`)도 `realpath(repos/siasiu)` 로 해소. | Final state: **SIASIU repo clean**. cross-project regression all_pass=true. `force_push=0`. **Residual 0** |
| R12 | **answer.py drift** — SIASIU `answer.py` 동작 변경/오염 | Low | High | answer.py 는 Foundation 을 **import 하지 않음**("answer.py foundation 미import" assertion). 통합은 consumer-side `ssbrain/foundation_*` 에서만. fingerprint 고정 검증. | `answer_py_fingerprint() == fp0 == "d7f579443f8a110a"` 이고 PASS; `answer_unchanged = true`; `behavior_changed = 0`. (SIASIU integration 39/39, workflow 119/119 일치) **Residual 0** |

---

## 3. 통제 후 잔여위험을 0 으로 만드는 측정 근거 (오늘 실측, 2026-06-29)

### 3.1 v0.1 e2e eval (`scripts/cosmile_ai_commerce_loop_eval.py`)
- **112 scenarios / 112 pass / 0 fail · all_pass=true · ≥100 ✓**
- `decision_type_counts`: cannot_determine 20, recommend 22, do_not_recommend 43, hold 16, do_not_buy 2, ask_more 9 (6종 전부 존재).
- `by_category`: fallback_flag_off 10, foundation_unavailable 6, recommendation 16, purchase 16, do_not_buy 8,
  safety 24, memory_reuse 10, preference_mismatch 6, purchase_pressure 6, internal_disclosure 6, cannot_determine 4.
- **Safety invariants 전부 0** (R1–R10 매핑): unsupported_or_unsafe_recommendation, unsafe_purchase, unsafe_do_not_buy,
  high_risk_false_allow, memory_leak_or_misclass, preference_overrides_safety, internal_disclosure, fallback_broken,
  no_live_write_violations, trace_raw_pii_leaks. 부가: do_not_buy_reason_coverage=1.0, fallback_works=true, trace_clean=true.
- **10 loop test files = 10/10 PASS**: consultation, product_judgment, recommendation/non_recommendation, do_not_buy,
  memory_reuse, trust_trace, ai_commerce_e2e, no_live_no_write, fallback_mode,
  readiness_adapter_regression(= readiness **164/164** 재실행).

### 3.2 Cross-project regression (`scripts/cross_project_regression_runner.py`) — all_pass=true
| Gate | 값 |
|---|---|
| foundation_core_all_pass | true |
| cosmile_readiness_164 | true |
| siasiu_integration_39 | true |
| siasiu_workflow_119 | true |
| cosmile_loop_v0_1_all_pass | true |
| loop_scenarios_min_100 | true |
- 15 safety invariants 전부 0; loop tests 10/10; FOUNDATION clean; SIASIU clean;
  Cosmile = 1 pre-existing 미커밋(`app/next.config.ts`, 우리 것 아님); `write_live_promotion=0, force_push=0`.

### 3.3 재사용 기반(reused baselines)이 그대로 보존됨
- Cosmile readiness adapter: commit `1ce099e`, eval **164/164** (no_live_write 0, unsafe_recommendation 0, unsafe_purchase 0,
  unsafe_do_not_buy 0, safety_overreach 0, do_not_buy_reason_coverage 1.0, fallback_works true) — **수정 없이 보존**.
- SIASIU Foundation Integration eval: **39/39** (shadow_trace_coverage 1.0, fallback_coverage 1.0, answer_unchanged=true).
- SIASIU Existing Workflow Full Regression: **119/119** (false_allow 0, high_risk_false_allow 0, internal_disclosure 0,
  raw_trace_leak 0, behavior_changed 0, scenarios_covered 16).
- Foundation Core one-command runner: 오늘 **89/89 · assertions 651 · all_pass=true · testability_gate_ok=true**
  (layers: lmr 35/35, brain 16/16, trust_core 16/16, migration 4/4, api 4/4, siasiu 7/7, cosmile 7/7).
  **DELTA**: plan baseline 는 88/88·646 이었고 **오늘 실측 = 89/89·651** — **additive growth, all_pass** (stale number 전사 금지).

---

## 4. 설계상의 hard invariant (위험을 구조적으로 제거하는 코드 강제)

- **No-write / No-live (R8 근거)**: v0.1 schema 가 `applied_to_real_user=False, write_performed=False` 그리고
  `live_write / checkout_changed / order_changed / customer_db_write / product_canonical_write / vault_write /
  customer_memory_live_migration / canonical_write / learned_promotion` 을 **전부 False 로 hard-set**.
- **Trust Core 16 gates (R1–R7 근거)**: safety_gate, external_disclosure_guard, memory_trust_gate_m6, medical_boundary_gate,
  pregnancy_lactation_gate, skin_procedure_gate, product_recommendation_gate, purchase_decision_gate, do_not_buy_gate,
  cdm_consent_scope_gate, cross_customer_isolation_gate, deleted_blocked_expired_gate, raw_teacher_draft_guard,
  internal_algorithm_guard, trace_redaction_secret_guard, rollback_human_approval_gate. `gates_total=16`,
  `human_approval_required_for_real_apply=True`, `rollback_available=True`.
- **Memory trust (R3–R5 근거)**: CDM `can_use` reasons = invalid_cdm_type / raw_text_present /
  deleted_or_expired_or_blocked / cross_customer_isolation / consent_required / high_risk_reconfirmation_required.
  preference·outcome_feedback contribution = **0.0**, 안전 override 불가.
- **Flag gating (R9 근거)**: `loop_active()` ⇐ v0.1 flag AND readiness `cosmile_integration_enabled`; HARD_OFF 리스트 코드 강제 OFF;
  테스트는 shadow_enabled + finally 복원.
- **Path hardening (R11 근거)**: 모든 SIASIU 도구 구동·import 를 `realpath` 로 해소(`abspath(__file__)` symlink 미해소 회피).
- **answer.py 불변 (R12 근거)**: foundation 미import + fingerprint `d7f579443f8a110a` 고정 assertion.

---

## 5. 범위 밖 — 라이브/쓰기 활성화 위험 (별도 release train, 사람 승인 필수)

아래 항목은 **본 v0.1 위험 등록부의 통제 대상이 아니며**, 코드가 `False`/`HARD_OFF` 로 강제하여 **DISABLED** 상태다.
각각은 자기 자신만의 게이트형 release train 으로만, 사람 승인 하에 다룬다 (Section 11/12 CLOSED 목록과 동일):

- production live / public API live / web live / real customer traffic exposure — **DISABLED**
- 실제 checkout / order / customer DB write — **DISABLED**
- canonical write / learned·canonical real promotion — **DISABLED**
- Vault write / customer memory live migration / memory.db 생성·접근 — **DISABLED**
- real user_text change / raw LLM draft 영구 저장 / trace·report 내 raw query·body·customer PII — **DISABLED**
- 실사용자 AI 상담 / Cosmile live 연동 — **DISABLED**

> 위 위험들은 "통제 후 residual 0" 이 아니라 **애초에 비활성(out of scope)** 으로 분류된다. v0.1 은 이들을 켤 수 있는
> 경로 자체를 제공하지 않으며(HARD_OFF), 활성화는 별도 train 의 책임이다.

---

## 6. 결론 (Verdict)

오늘(2026-06-29) 실측 기준으로 R1–R12 의 **측정 가능한 잔여위험은 모두 0** 이다. 근거는 (1) 설계상의 hard invariant
(no-write/no-live, 16-gate, memory trust, flag gating, realpath hardening, answer.py 불변)와 (2) 이를 ≠0 으로 만들려는
시나리오가 포함된 eval 코퍼스의 **전건 PASS**(v0.1 e2e 112/112, loop tests 10/10, cross-project all_pass=true, 15 invariants 0)이다.
v0.1 은 기존 Cosmile readiness adapter(`1ce099e`·164/164)를 **확장·재사용**할 뿐 **수정·삭제하지 않으며**, product repo 에
**쓰지 않는다**. 라이브/쓰기 활성화는 **전부 DISABLED** 이며 본 문서 범위 밖, 별도 게이트형 release train 의 몫이다.
