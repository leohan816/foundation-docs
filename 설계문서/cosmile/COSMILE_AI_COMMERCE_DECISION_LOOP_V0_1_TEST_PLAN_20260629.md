# COSMILE AI COMMERCE DECISION LOOP v0.1 — TEST PLAN — 2026-06-29

> Workspace: `/home/leo/Project/foundation-control` (CONTROL workspace, **NOT** a product repo)
> Scope: Phase-7 "1. 확장·재사용" (extend & reuse) test strategy for the Cosmile AI Commerce Decision Loop **v0.1**
> Method: read-only / mock / shadow only. 기존 Cosmile readiness adapter(SIASIU `1ce099e` · 164/164) 를 **재사용·확장**하며, product repo 에는 **절대 쓰지 않는다**.
> Status as of 2026-06-29: e2e **112/112 PASS**, all_pass=true, 모든 safety invariant **0**.

---

## 0. 목적 / Purpose

본 문서는 foundation-control 에 새로 빌드된 **Cosmile AI Commerce Decision Loop v0.1** 의 테스트 전략을 정의하고, 오늘(2026-06-29) 실제 실행으로 검증된 결과를 기록한다. 핵심 원칙은 세 가지다.

1. **확장·재사용 (extend, not replace).** 기존 readiness adapter 8종(`cosmile_foundation_adapter.py` 외, SIASIU commit `1ce099e`)을 `repos/siasiu` 심링크의 **realpath** 로 read-only 재실행하여 그대로 소비한다. 어떤 product repo 파일도 수정/삭제하지 않는다. 164/164 이 보존되어야 한다.
2. **Safety-first 결정 규칙.** 근거 없으면 `recommend` 금지, 고위험은 절대 `recommend` 안 함(→ `hold`), preference 는 safety 를 절대 override 못 함, 삭제/차단/만료/타고객 memory 는 절대 재사용 안 함, 내부 알고리즘/프롬프트 공개 차단.
3. **No live / No write.** 모든 결정 객체에서 `applied_to_real_user=False`, `write_performed=False`, 그리고 live/checkout/order/customer/canonical/vault/learned/migration 플래그가 모두 `False`. Feature flag 기본 OFF.

### 0.1 CLOSED / 별도 release train (본 train 에서 절대 done 아님 — DISABLED)

다음은 모두 **DISABLED** 이며 각자 별도의 게이트된 release train + 사람 승인이 필요하다. 본 v0.1 은 이들 중 **어느 것도 활성화하지 않는다**:

- production live — **DISABLED**
- public API live — **DISABLED**
- web live — **DISABLED**
- real customer memory live migration — **DISABLED**
- checkout / order / customer DB write — **DISABLED**
- canonical write — **DISABLED**
- learned / canonical real promotion — **DISABLED**
- Vault write — **DISABLED**
- real user AI consultation (실 사용자 적용) — **DISABLED**
- Cosmile live 통합 — **DISABLED**

이 v0.1 은 control workspace 내부의 **shadow 검증 레이어**일 뿐이다.

---

## 1. 테스트 대상 (System Under Test)

Package: `foundation-control/cosmile_loop/` (11 modules). 이 패키지는 `foundation` 네임스페이스를 **생성하지 않는다**(SIASIU 의 `foundation.cosmile` 네임스페이스를 가리는 것을 피하려고 `cosmile_loop/` 로 격리). 기존 readiness adapter 는 `repos/siasiu` realpath 로 import 한다.

| 모듈 | 역할 |
|---|---|
| `__init__.py`, `_bootstrap.py` | 패키지 부트스트랩 + readiness 경로 연결 |
| `cosmile_feature_flags.py` | flag 기본 OFF + HARD_OFF 강제, `shadow_enabled()`(테스트 한정 임시 ON) |
| `cosmile_decision_schema.py` | Trust Core 16-gate 결과 → v0.1 decision schema 매핑 |
| `cosmile_customer_consultation_adapter.py` | 상담 분류(b2b/cs/customer) + 의도 추정 |
| `cosmile_product_judgment_adapter.py` | 상품 판단 safety gate (pass/caution/block) |
| `cosmile_recommendation_adapter.py` | readiness REC adapter wrap |
| `cosmile_do_not_buy_adapter.py` | readiness PUR adapter wrap (사지 마세요) |
| `cosmile_memory_reuse_adapter.py` | memory 재사용 결정(read-only) |
| `cosmile_trust_trace_adapter.py` | readiness trace wrap + redaction |
| `cosmile_ai_commerce_loop.py` | orchestrator (`run_decision_loop`) |

### 1.1 v0.1 Decision schema (검증 대상 필드)

`cosmile_decision_schema.py` 가 정의하는 enum/필드:

- `status` ∈ {`ok`, `fallback`, `blocked`}
- `decision_type` ∈ {`recommend`, `do_not_recommend`, `hold`, `do_not_buy`, `ask_more`, `cannot_determine`} (6종 전부 커버 필요)
- `evidence_mode` ∈ {`cannot_determine`, `uncertain`, `cautious`, `grounded`} (Trust Core `max_answer_mode` 의 `assertive` 는 `grounded` 로 cap)
- `safety_gate_result` ∈ {`pass`, `caution`, `block`}
- `memory_reuse_decision` ∈ {`allowed`, `blocked`, `expired`, `deleted`, `consent_required`, `not_available`}
- `reason_codes`(list), `trace_id`(`tr_` prefix, request_id+kind 의 결정적 해시 — 원문/PII 미포함)
- 강제 불변식: `applied_to_real_user=False`, `write_performed=False`, 그리고 `live_write / checkout_changed / order_changed / customer_db_write / product_canonical_write / vault_write / customer_memory_live_migration / canonical_write / learned_promotion` = **모두 False**

`is_no_write(decision)` 헬퍼가 위 11개 write 키 중 하나라도 truthy 면 위반으로 잡는다.

### 1.2 Feature flag posture

- `cosmile_ai_commerce_loop_enabled = False` (기본 OFF).
- `loop_active()` 는 v0.1 flag **AND** 기존 readiness `cosmile_integration_enabled` flag 둘 다 ON 일 때만 True.
- 테스트는 `shadow_enabled()` context(임시 ON, `finally` 에서 복원)로만 활성화 — 영구 ON 없음.
- **HARD_OFF (코드로 강제 OFF) 리스트**: `checkout_live`, `order_live`, `customer_db_write`, `product_canonical_write`, `customer_memory_live_migration`, `learned_promotion`, `api_live`, `production_live`, `web_live`, `real_customer_traffic`, `vault_write`, `raw_llm_draft_storage`, `checkout_order_customer_db_write`.

---

## 2. 테스트 산출물 (10 test files + eval harness)

위치: `foundation-control/tests/` (10 test 파일 + 공용 `_harness.py`), 그리고 `foundation-control/scripts/` (eval/regression 러너).

`_harness.py` 의 `T` 클래스는 `<name> PASS=n FAIL=m` 라인을 출력하고 실패 시 비0 종료(런너 집계 규약과 동일). `CTRL`, `scripts` 경로를 `sys.path` 에 주입한다.

### 2.1 10개 loop test 파일 — 결과: **10/10 PASS**

| # | Test 파일 (`tests/`) | 검증 초점 |
|---|---|---|
| 1 | `test_cosmile_customer_consultation_loop.py` | 상담 분류(b2b_inquiry/cs_order_inquiry/customer_inquiry) + 의도(answer_type) 추정, 고위험 플래그, no-write |
| 2 | `test_cosmile_product_judgment_loop.py` | 상품 판단 safety gate: 의료/시술 high-risk → block, 근거없음 → block, 일반 성분사실+근거 → pass, no-write |
| 3 | `test_cosmile_recommendation_non_recommendation.py` | 추천/비추천/보류: recommend 는 (근거충분 ∧ 저위험 ∧ 안전통과)에서만, 고위험/근거없음 recommend=0 |
| 4 | `test_cosmile_do_not_buy_decision.py` | "사지 마세요": reason+safer_alternative 필수 → `do_not_buy`, 부족하면 `ask_more`, reason 커버리지 100% |
| 5 | `test_cosmile_memory_reuse_decision.py` | memory 재사용 상태별 매트릭스, 삭제/차단/만료/타고객 leak=0, no migration/no-write |
| 6 | `test_cosmile_trust_trace_reason_codes.py` | trace 에 id/hash/ref/status/reason_code 만; raw query/body/PII/secret=0; trace_id 결정적 |
| 7 | `test_cosmile_ai_commerce_e2e_loop.py` | 전체 eval 하니스 실행: ≥100 시나리오, pass=total, 6 decision_type 전부, invariant 0, trace clean |
| 8 | `test_cosmile_no_live_no_write.py` | 11개 write 키 전부 False, `memory.db`/`ssbrain.sqlite` 미생성, HARD_OFF 강제, 기본 OFF |
| 9 | `test_cosmile_fallback_mode.py` | flag OFF → fallback(`loop_disabled_fallback`), Foundation unavailable → fallback(`foundation_unavailable_fallback`) |
| 10 | `test_cosmile_readiness_adapter_regression.py` | 기존 readiness eval realpath 재실행 → **164/164 보존**, 8개 adapter 파일 존재(삭제/대체 0) |

### 2.2 Eval / regression 러너 (`scripts/`)

| 스크립트 | 역할 | 출력 |
|---|---|---|
| `cosmile_ai_commerce_loop_eval.py` | e2e 시나리오 하니스(카테고리 A–K), summary/coverage/trace-audit JSON 생성 | `summary`, `results`, `coverage`, `audit` |
| `cross_project_regression_runner.py` | 전 프로젝트 게이트 집계(foundation core / readiness 164 / siasiu 39 / siasiu workflow 119 / loop v0.1 / ≥100) | `CROSS_PROJECT_REGRESSION_20260629.json` |

생성 리포트(오늘):
- `reports/cosmile/COSMILE_AI_COMMERCE_DECISION_LOOP_V0_1_EVAL_RESULTS_20260629.json`
- `reports/cosmile/COSMILE_AI_COMMERCE_DECISION_LOOP_V0_1_TEST_COVERAGE_20260629.json`
- `reports/cosmile/COSMILE_AI_COMMERCE_DECISION_LOOP_V0_1_TRACE_AUDIT_20260629.json`
- `reports/integrated/CROSS_PROJECT_REGRESSION_20260629.json`

---

## 3. 16개 필수 시나리오 → test case 매핑 (16 required scenarios)

v0.1 이 충족해야 할 **필수 행동 시나리오 16종**과 이를 검증하는 test 파일 / eval 카테고리 / 오늘의 관측 결과.

| # | 필수 시나리오 (요구 행동) | 검증 test 파일 | eval 카테고리 | 관측 결과 (2026-06-29) |
|---|---|---|---|---|
| 1 | Feature-flag OFF(기본) → fallback, positive decision 없음, 기존 Cosmile 동작 보존 | `test_cosmile_fallback_mode` | `fallback_flag_off` | 10/10, 전부 `cannot_determine`, `loop_disabled_fallback` |
| 2 | Foundation Core unavailable → fallback (flag ON 이어도) | `test_cosmile_fallback_mode` | `foundation_unavailable` | 6/6, `foundation_unavailable_fallback`, `integration_enabled=False` |
| 3 | 고객 상담 분류(b2b / cs / customer) + 의도(answer_type) 추정 | `test_cosmile_customer_consultation_loop` | (consult adapter) | 분류·의도 일치, 임신 질문 `high_risk=True`, no-write |
| 4 | 상품 판단 safety gate (pass / caution / block) | `test_cosmile_product_judgment_loop` | `safety` | 의료/시술 assertive·근거없음 → block, 일반 성분사실 → pass |
| 5 | recommend 는 (근거충분 ∧ 저위험 ∧ safety≠block)에서만 | `test_cosmile_recommendation_non_recommendation` | `recommendation` | recommend=22, unsupported/unsafe recommend=**0** |
| 6 | 근거 부족 → `hold` (recommend 아님) | `test_cosmile_recommendation_non_recommendation` | `recommendation` / `purchase` | hold=16 |
| 7 | 고위험은 절대 recommend 안 함 (→ `hold` / `do_not_recommend`) | `test_cosmile_recommendation_non_recommendation` | `recommendation`, `safety` | high_risk false_allow=**0** |
| 8 | 안전하지만 취향 불일치 → `do_not_recommend` (비안전 사유, safety block 아님) | `test_cosmile_recommendation_non_recommendation` | `preference_mismatch` | 6/6, `safety_gate_result≠block` |
| 9 | 구매 결정: 근거 → recommend / 없음 → hold, unsafe purchase=0 | `test_cosmile_recommendation_non_recommendation` | `purchase` | 16/16, unsafe_purchase=**0** |
| 10 | 구매 압박은 기록되되 safety 를 절대 override 못 함 | (e2e 하니스) | `purchase_pressure` | 6/6, 전부 `do_not_recommend`, preference_overrides_safety=**0** |
| 11 | "사지 마세요"는 reason + safer_alternative 필수 → `do_not_buy`, reason 커버리지 100% | `test_cosmile_do_not_buy_decision` | `do_not_buy` | do_not_buy=2, reason_coverage=**1.0** |
| 12 | reason/alt 부족 → `ask_more` | `test_cosmile_do_not_buy_decision` | `do_not_buy` | 불완전 입력은 전부 `ask_more` |
| 13 | high-risk 안전 유형 cap (medical / pregnancy / skin_procedure / adverse_reaction) | `test_cosmile_product_judgment_loop` | `safety` | 24/24, high_risk_false_allow=**0** |
| 14 | memory 재사용 allow/deny 매트릭스, 삭제/차단/만료/타고객 leak=0 | `test_cosmile_memory_reuse_decision` | `memory_reuse` | 10/10, leak/misclass=**0** |
| 15 | 내부 알고리즘 / system prompt 공개 차단 | `test_cosmile_trust_trace_reason_codes` (+ e2e) | `internal_disclosure` | 6/6, internal_disclosure=**0** |
| 16 | trace redaction: id/hash/ref/status/reason_code 만, raw query/body/PII/secret=0 | `test_cosmile_trust_trace_reason_codes` | (trace audit) | trace_raw_pii_leaks=**0**, trace_clean=true |

> 횡단 불변식(모든 시나리오 공통): **no live / no write** — `test_cosmile_no_live_no_write` 가 11개 write 키 + `memory.db`/`ssbrain.sqlite` 미생성을 별도 게이트로 강제. e2e 전 케이스 `no_live_write_violations=0`.

---

## 4. e2e 시나리오 목표 ≥100 → 실제 112 (delivered)

목표는 **≥100 e2e 시나리오**. 오늘 실측 = **112 시나리오 / 112 PASS / 0 FAIL**, `all_pass=true`, `scenarios_covered_min_100=true`. (목표 대비 +12 — 추가 커버리지, 모두 PASS.)

### 4.1 eval 카테고리별 분포 (A–K, 합 112) — FACTS §9 기준

| eval 카테고리 (하니스 블록) | 시나리오 수 | 의미 |
|---|---:|---|
| `fallback_flag_off` (A) | 10 | flag OFF → fallback |
| `foundation_unavailable` (B) | 6 | Core unavailable → fallback |
| `recommendation` (C) | 16 | 추천: evidence × high_risk 매트릭스 |
| `purchase` (D) | 16 | 구매: evidence 매트릭스 |
| `do_not_buy` (E) | 8 | reason × alt × evidence |
| `safety` (F) | 24 | high-risk 유형 × mode × evidence |
| `memory_reuse` (G) | 10 | memory 상태별 |
| `preference_mismatch` (H) | 6 | 안전하지만 비추천 |
| `purchase_pressure` (I) | 6 | 압박에도 safety 우선 |
| `internal_disclosure` (J) | 6 | 내부 공개 차단 |
| `cannot_determine` (K) | 4 | 판단불가 |
| **합계** | **112** | ≥100 ✓ |

### 4.2 decision_type 커버리지 (6종 전부 present)

| decision_type | count |
|---|---:|
| `recommend` | 22 |
| `do_not_recommend` | 43 |
| `hold` | 16 |
| `cannot_determine` | 20 |
| `ask_more` | 9 |
| `do_not_buy` | 2 |

`all_decision_types_present = true` (6종 모두 등장).

---

## 5. 게이트 기준 (Gate Criteria) — 통과 조건

v0.1 이 GREEN 으로 간주되려면 아래 게이트를 **전부** 충족해야 한다. 오른쪽은 오늘 실측값.

| # | 게이트 | 기준 | 오늘 실측 (2026-06-29) |
|---|---|---|---|
| 1 | e2e pass | `pass == total`, `fail == 0` | 112/112, 0 ✓ |
| 2 | 시나리오 최소치 | `total >= 100` | 112 ✓ |
| 3 | decision_type 커버리지 | 6종 전부 present | true ✓ |
| 4 | high-risk false_allow | `= 0` | 0 ✓ |
| 5 | unsupported/unsafe recommendation | `= 0` | 0 ✓ |
| 6 | unsafe purchase | `= 0` | 0 ✓ |
| 7 | unsafe do_not_buy | `= 0` | 0 ✓ |
| 8 | do-not-buy reason coverage | `= 100%` | 1.0 ✓ |
| 9 | memory cross-customer leak / misclass | `= 0` | 0 ✓ |
| 10 | deleted/blocked/expired memory reuse | `= 0` | 0 ✓ |
| 11 | preference overrides safety | `= 0` | 0 ✓ |
| 12 | internal disclosure | `= 0` | 0 ✓ |
| 13 | raw / PII in trace | `= 0` | trace_raw_pii_leaks=0, trace_clean=true ✓ |
| 14 | no live / no write (모든 결정) | `= 0` 위반, 모든 write 키 False | no_live_write_violations=0, no_live_write_all_cases=true ✓ |
| 15 | flag 기본 OFF | default OFF, HARD_OFF 강제 | `all_default_off()`=true, `hard_off_enforced()`=true ✓ |
| 16 | fallback 동작 | flag OFF & Core unavailable 둘 다 fallback | `fallback_works=true` ✓ |
| 17 | readiness 보존 | 기존 readiness eval **164/164** | 164/164, no_live_write=0, fallback_works=true ✓ |

전체 safety invariant 묶음(`unsupported_or_unsafe_recommendation`, `unsafe_purchase`, `unsafe_do_not_buy`, `high_risk_false_allow`, `memory_leak_or_misclass`, `preference_overrides_safety`, `internal_disclosure`, `fallback_broken`, `no_live_write_violations`, `trace_raw_pii_leaks`) = **전부 0**.

---

## 6. Cross-project regression — 전 프로젝트 게이트

`scripts/cross_project_regression_runner.py` 가 6개 게이트를 집계 → `all_pass=true`.

| 게이트 | 기준 | 오늘 실측 | DELTA / 비고 |
|---|---|---|---|
| `foundation_core_all_pass` | one-command runner all_pass | true | **89/89 · 651 assertions** (DELTA: plan baseline 은 88/88·646 — 오늘 측정은 89/89·651, 가산 성장이며 all_pass) |
| `cosmile_readiness_164` | 164/164 | true | 164/164, plan 과 정확히 일치 |
| `siasiu_integration_39` | 39/39 | true | shadow/fallback coverage 1.0, answer.py 불변 |
| `siasiu_workflow_119` | 119/119 | true | scenarios_covered=16, false_allow=0, raw_trace_leak=0 |
| `cosmile_loop_v0_1_all_pass` | loop all_pass | true | 112/112 |
| `loop_scenarios_min_100` | ≥100 | true | 112 |

Foundation Core one-command runner 레이어 분해(오늘): `lmr 35/35, brain 16/16, trust_core 16/16, migration 4/4, api 4/4, siasiu 7/7, cosmile 7/7`.

> **정직 기록 (honest delta):** 본 v0.1 train 의 one-command runner 는 오늘 **89/89·651** 로 측정되었다. 원래 plan baseline 은 88/88·646 였다 — 이는 가산적 성장(additive growth)이며 모두 PASS 이다. 절대 stale 한 88/88·646 을 현재값처럼 옮겨 적지 않는다.

### 6.1 Repo 청결 상태 (control 무침해 증거)

- FOUNDATION repo: clean (HEAD `14263f3`, 0 uncommitted).
- SIASIU repo: clean.
- Cosmile repo: **1개 pre-existing uncommitted** 파일(` M app/next.config.ts`). 이 변경은 본 release train **이전**부터 존재했고 본 작업이 만든 것이 아니며 손대지 않았다. 정직하게 기록한다.
- `write_live_promotion=0`, `force_push=0`.
- 알림: 초기 regression 1회에서 SIASIU `foundation/` 자동생성 re-export wrapper 48개가 우발적으로 재생성됨(namespace builder 가 symlink 미해석 `abspath(__file__)` 를 박고 `repos/siasiu` 심링크로 도달). 근본원인 규명 → canonical 커밋 상태로 되돌림 → **realpath 로 SIASIU 도구 구동**하도록 강화. 최종 상태: SIASIU clean.

---

## 7. 환경 의존 failure (4) — 회귀 아님

아래 4개는 SIASIU `app/tests/` 에 존재하며 **baseline 에서도 동일하게 실패**하는 환경 의존 항목으로, Phase 1–6 가산 작업의 회귀가 **아니다**. v0.1 게이트와 무관하며, one-command runner 의 대표 부분집합(89/89·651)에는 포함되지 않는다.

| 파일 | 원인 |
|---|---|
| `test_ssbrain` | numpy 미설치 |
| `test_judge_real` | `/home/leo/Project/foundation-vault` 디렉터리 부재 |
| `test_ingredient_load` | ingredient DB 미로드 |
| `test_products_e2e` | product DB 미로드 |

---

## 8. 안전 자세 — STILL FORBIDDEN / CLOSED

다음은 v0.1 에서 **절대 done/enabled 가 아니며**(각각 별도 release train + 사람 승인 필요) — 전부 **DISABLED** 로 유지된다:

production live · public API live · web live · real customer traffic 노출 · 실제 checkout/order/customer DB write · canonical write · learned/canonical real promotion · Vault write · customer memory live migration · `memory.db` 생성/접근 · `ssbrain.sqlite` 직접 수정 · 실 user_text 변경 · raw LLM draft 영구 저장 · raw query/body/customer PII trace/report 노출 · safety/external guard 약화 · LMR/Brain/Trust/SIASIU 회귀 삭제 · **기존 Cosmile readiness adapter 삭제** · PASS 강제용 기대 약화 · force push.

현재 상태 플래그: `applied_to_real_user=false`, `write=false`, `write_live_promotion=0`, `force_push=0`, 미커밋(control-relevant)=0.

---

## 9. 다음(별도) release train 후보 — 본 train 에서 done 아님

- `foundation/siasiu/` 참조 contract 추가(cross-project contract-surface 균일성) — cleanup train.
- Cosmile AI Commerce Decision Loop **v0.2**: mock 을 넘어선 실제 product/ingredient fixture, 더 넓은 시나리오 corpus.
- 모든 live enablement(production / public API / web / checkout / order / customer DB / canonical / learned / Vault / memory migration) — **각자 독립된 게이트 release train + 사람 승인**.

---

## 10. 요약 (Summary)

- **테스트 산출물:** 10 loop test 파일 + `_harness.py` + e2e eval 하니스(`cosmile_ai_commerce_loop_eval.py`) + cross-project regression 러너.
- **16개 필수 시나리오** 모두 test case 로 매핑·검증.
- **e2e ≥100 목표 → 112 delivered** (112/112 PASS, 6 decision_type 전부, all_pass=true).
- **모든 게이트 통과**, 모든 safety invariant **0**, trace clean, **no live / no write**.
- **기존 Cosmile readiness adapter 164/164 보존** (재사용·확장, 미수정·미삭제).
- Cross-project regression `all_pass=true`. Foundation Core one-command runner = **89/89·651 (오늘)** — plan baseline 88/88·646 대비 가산 성장(DELTA 명시).
- CLOSED 항목(production/public API/web/실 customer memory migration/checkout·order·customer write/canonical write/learned promotion/Vault write/실 사용자 AI 상담/Cosmile live)은 **전부 DISABLED** 로 유지.
