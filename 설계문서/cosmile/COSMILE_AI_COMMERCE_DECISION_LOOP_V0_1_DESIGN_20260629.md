# COSMILE AI COMMERCE DECISION LOOP v0.1 — DESIGN — 2026-06-29

> 본 문서는 `foundation-control` 컨트롤 워크스페이스에서 구축한 **Cosmile AI Commerce Decision Loop v0.1**의
> end-to-end 설계 문서입니다. 모든 수치/경로/사실은 2026-06-29에 실제 스위트를 돌려 검증한
> 캐노니컬 사실(FACTS.md)에 근거하며, 추정/창작 수치는 포함하지 않습니다.
>
> **방법론**: Phase-7 method = "1. 확장·재사용" (extend & reuse). 기존 Cosmile readiness adapter
> (commit `1ce099e`, 164/164)를 **read-only로 재사용·확장**하며 제품 레포(FOUNDATION/SIASIU/Cosmile)에는
> 절대 쓰지 않습니다(never write into product repos).

---

## 0. Executive Summary (요약)

Cosmile AI Commerce Decision Loop v0.1은 화장품 커머스 상담을 위한 **결정 루프(decision loop)** 설계입니다.
하나의 고객 요청을 받아 다음 흐름을 read-only/mock/shadow로 end-to-end 실행합니다:

```
고객 상담(consultation) → 상품 판단(product judgment) →
추천 / 비추천 / 보류(hold) / "사지 마세요"(do_not_buy) →
safety gate → memory reuse → trust trace / reason code → 재현 가능 리포트
```

- 위치: `foundation-control/cosmile_loop/` (11 모듈). 컨트롤 워크스페이스 안에서만 존재.
- 재사용: `realpath(repos/siasiu)`를 통해 기존 readiness adapter를 read-only import. **foundation 패키지를
  새로 만들지 않음**(SIASIU의 `foundation.cosmile` 네임스페이스를 가리지/덮지 않기 위해).
- Feature flag: `cosmile_ai_commerce_loop_enabled=False` (기본 OFF).
- e2e 검증(오늘): **112 시나리오 / 112 pass / 0 fail, all_pass=true** (계획 목표 ≥100 충족, 실제 112 delivered).
- 안전 불변식 전부 0, no-live/no-write 유지, trace clean.

이 v0.1은 **설계 + shadow 검증 단계**이며, 아래 §9의 모든 라이브 항목은 여전히 **DISABLED**입니다.

---

## 1. 설계 목표 및 비목표 (Goals / Non-goals)

### 1.1 Goals
- 고객 상담부터 결정·근거·trace까지를 하나의 결정 루프로 묶어 **재현 가능(reproducible)**하게 만든다.
- 기존 readiness adapter(8-adapter suite, `1ce099e`·164/164)를 **수정하지 않고** 그 위에 shadow 오케스트레이션을 얹는다.
- 안전(safety)을 모든 다른 신호(취향/구매압박/memory)보다 우선시한다 — safety는 절대 override되지 않는다.
- flag OFF 또는 Foundation 미가용 시 **기존 Cosmile/SIASIU 동작으로 fallback**한다(무변경 보장).

### 1.2 Non-goals (이번 트레인에서 하지 않음 / CLOSED)
다음은 모두 **별도의 게이트된 릴리스 트레인**에서만 다루며, v0.1에서는 전부 **DISABLED**입니다:

production live · public API live · web live · 실제 고객 트래픽 노출 ·
실제 checkout/order/customer DB write · canonical write · learned/canonical real promotion ·
Vault write · 실제 customer memory live migration · 실제 user AI consultation · Cosmile live integration.

v0.1은 mock/read-only/shadow 전용입니다. `applied_to_real_user=False`, `write_performed=False`.

---

## 2. End-to-End 흐름 (Flow)

오케스트레이터 `run_decision_loop(...)` (`cosmile_loop/cosmile_ai_commerce_loop.py`)의 실제 단계:

| 단계 | 이름 | 모듈 | 핵심 동작 |
|---|---|---|---|
| 0 | Gate / Fallback | `_bootstrap`, `cosmile_feature_flags` | `foundation_available` 및 `foundation_repo_available()` 확인. flag(`loop_active()`) 확인. 둘 중 하나라도 실패 → `_fallback(...)` 로 기존 동작 유지 |
| 1 | 고객 상담 | `cosmile_customer_consultation_adapter` | 문의 유형/의도 분류 → `inquiry_kind`, `kind`, `answer_type`, `high_risk`, `reason_codes` |
| 2 | 상품 판단 | `cosmile_product_judgment_adapter` | 안전/근거 차원 평가 → `allowed`, `safety_gate_result`, `evidence_mode`, `max_answer_mode`, `reason_codes` |
| 3 | 결정 라우팅 | `cosmile_recommendation_adapter`(REC), `cosmile_do_not_buy_adapter`(DNB) | `kind`에 따라 do_not_buy / purchase / product_recommendation / (그 외 일반 상담 판단)으로 분기 |
| 4 | Memory reuse | `cosmile_memory_reuse_adapter` | read-only로 memory 재사용 가부 판정 → `memory_reuse_decision` |
| 5 | 종합(보수적 결합) | (orchestrator) | safety는 product judgment와 결정 결과 중 **더 보수적인** 값으로 결합. 방어선 적용 |
| 6 | Trust trace / reason code | `cosmile_trust_trace_adapter` | `trace_id` + 정제된 trace 생성. id/hash/ref/status/reason_code만 |
| → | 재현 가능 리포트 | `cosmile_decision_schema` | `loop_decision(...)` 으로 스키마 고정 결과 산출 (재현 가능) |

### 2.1 단계 5 — 보수적 결합 방어선(코드 근거)
오케스트레이터는 안전을 절대 약화시키지 않도록 다음 불변식을 코드로 강제합니다:

```python
# safety는 더 보수적인 값으로 결합 (block > caution > pass)
safety = "block" if "block" in (judg["safety_gate_result"], dec["safety_gate_result"]) else \
         ("caution" if "caution" in (...) else "pass")
# 방어선: 안전 차단이면 recommend 절대 불가
if safety == "block" and decision_type == "recommend":
    decision_type = "do_not_recommend"
# memory가 safety를 override하면(절대 발생 안 함) 보수적으로 차단
if mem.get("overrides_safety"):
    safety, decision_type = "block", "do_not_recommend"
# preference: 안전/근거 충분이라도 취향 불일치면 recommend→do_not_recommend (다운그레이드만)
if preference_fit is False and safety != "block" and decision_type == "recommend":
    decision_type = "do_not_recommend"
# 구매 압박: reason code로만 기록, safety/결정 불변
if purchase_pressure:
    pref_codes.append("purchase_pressure_noted_safety_first")
```

핵심: **preference는 recommend→do_not_recommend 다운그레이드만** 가능하며 unsafe→recommend는 불가.
**purchase_pressure는 기록만** 되고 safety/결정에 영향 0.

---

## 3. 11개 `cosmile_loop` 모듈과 책임

`foundation-control/cosmile_loop/` 패키지는 정확히 **11개 모듈**로 구성됩니다:

| # | 모듈 | 책임 |
|---|---|---|
| 1 | `__init__` | 패키지 진입점. 모듈 노출 |
| 2 | `_bootstrap` | `realpath(repos/siasiu)`로 readiness adapter 경로를 read-only로 연결. `foundation_repo_available()` 제공. **foundation 패키지를 만들지 않아** SIASIU `foundation.cosmile` 네임스페이스를 가리지 않음 |
| 3 | `cosmile_feature_flags` (FF) | flag 정의. `cosmile_ai_commerce_loop_enabled=False`(기본 OFF). `loop_active()`는 v0.1 flag AND 기존 readiness `cosmile_integration_enabled`가 둘 다 ON일 때만 True. HARD_OFF 강제 목록 보유. 테스트용 `shadow_enabled()`(임시 ON, finally 복원) |
| 4 | `cosmile_decision_schema` (SCHEMA) | v0.1 결정 스키마. `loop_decision(...)`, `decision_type_for(...)`. live/checkout/order/customer/canonical/vault/learned 등을 전부 False로 고정 |
| 5 | `cosmile_customer_consultation_adapter` (CONSULT) | 고객 상담: 문의 유형/의도 분류. `consult(...)` → kind, answer_type, high_risk, reason_codes |
| 6 | `cosmile_product_judgment_adapter` (JUDGE) | 상품 판단: 안전·근거 차원 평가. `judge(...)` → allowed, safety_gate_result, evidence_mode, max_answer_mode |
| 7 | `cosmile_recommendation_adapter` (REC) | 추천/비추천. 기존 readiness REC adapter를 **wrap**(read-only). `recommend(...)` |
| 8 | `cosmile_do_not_buy_adapter` (DNB) | "사지 마세요" + 구매 판단. 기존 readiness PUR(purchase guard) adapter를 **wrap**(read-only). `do_not_buy(...)`, `purchase(...)` |
| 9 | `cosmile_memory_reuse_adapter` (MEM) | memory 재사용 판정(read-only). `decide(...)` → memory_reuse_decision, overrides_safety(항상 False여야 함) |
| 10 | `cosmile_trust_trace_adapter` (TRACE) | trust trace / reason code. 기존 readiness trace adapter를 **wrap**. `make_trace(...)` → 정제된 trace + trace_id |
| 11 | `cosmile_ai_commerce_loop` (orchestrator) | 위 모듈을 묶는 e2e 오케스트레이터. `run_decision_loop(...)`, `_fallback(...)` |

> REC/DNB/TRACE 세 모듈은 기존 readiness adapter(REC/PUR/trace)를 **재사용·래핑**하며, readiness 코드 자체는
> 변경하지 않습니다. 따라서 readiness 164/164는 그대로 보존됩니다.

---

## 4. Readiness adapter의 read-only 재사용 방식

### 4.1 무엇을 재사용하는가
기존 Cosmile readiness adapter(commit `1ce099e`, **164/164 PASS**)는 다음 두 곳에 물리적으로 존재합니다:

- 캐노니컬 머티리얼라이즈 위치: `FOUNDATION/foundation/cosmile/` (8 파일)
- 런너블 카피(Foundation Core/Trust Core를 `SIASIU/app`에서 import): `SIASIU/foundation/cosmile/` (동일 8 파일)

8개 파일: `__init__.py`, `cosmile_b2b_inquiry_adapter.py`, `cosmile_feature_flags.py`,
`cosmile_foundation_adapter.py`, `cosmile_foundation_contract.py`, `cosmile_purchase_guard_adapter.py`,
`cosmile_recommendation_adapter.py`, `cosmile_safety_decision_adapter.py`, `cosmile_trace_adapter.py`.

이 8-adapter 스위트는 **이번 릴리스 트레인에서 수정되지 않았습니다.** 컨트롤 워크스페이스는 이를 read-only로
import할 뿐입니다(164/164 보존).

### 4.2 어떻게 연결하는가 — `realpath(repos/siasiu)` & 네임스페이스 비-그림자(non-shadow)
- 컨트롤 워크스페이스는 심볼릭 링크로 제품 레포를 참조합니다:
  `repos/foundation → /home/leo/Project/FOUNDATION`, `repos/siasiu → /home/leo/Project/SIASIU`,
  `repos/cosmile → /home/leo/Project/Cosmile`.
- `_bootstrap`은 **`realpath(repos/siasiu)`로 심볼릭 링크를 해소**한 실제 경로를 통해 readiness adapter를
  read-only로 로드합니다. 이는 §4.3의 사고를 막기 위한 핵심 결정입니다.
- 패키지명을 의도적으로 `cosmile_loop/`로 둡니다. 만약 `foundation` 패키지를 새로 만들면 SIASIU의
  `foundation.cosmile` 네임스페이스를 **가리게(shadow)** 되므로, 이를 피하기 위해 별도 네임스페이스를 사용합니다.

### 4.3 검증된 회귀 사고와 하드닝(honest record)
오늘 한 차례의 cross-project regression 실행에서, SIASIU `foundation/`의 auto-generated re-export 래퍼
**48개가 의도치 않게 재생성**되었습니다. 원인은 네임스페이스 빌더가 `abspath(__file__)`를 임베드하여
**심볼릭 링크를 해소하지 않은 채** `repos/siasiu` 심링크 경로로 도달했기 때문입니다.
근본 원인 규명 → 캐노니컬 커밋 상태로 **revert** → **realpath로 SIASIU 툴을 구동하도록 하드닝**.
최종 상태: SIASIU repo clean. (이 사실이 §4.2의 realpath 설계 근거입니다.)

---

## 5. 11개 필수 함수 (Required functions)

v0.1은 다음 11개의 필수 동작 경로를 구현·검증합니다(모듈 매핑 포함):

| # | 필수 함수(동작) | 책임 모듈 / 진입점 |
|---|---|---|
| 1 | 상담(consultation) | `CONSULT.consult(...)` |
| 2 | 판단(product judgment) | `JUDGE.judge(...)` |
| 3 | 추천(recommend) | `REC.recommend(...)` (readiness REC wrap) |
| 4 | 비추천(do_not_recommend) | orchestrator 다운그레이드 + `JUDGE`/`REC` 결합 |
| 5 | 보류(hold) | `SCHEMA.decision_type_for(...)` — high_risk → hold |
| 6 | 안전 게이트(safety gate) | `JUDGE` + orchestrator 보수적 결합(block>caution>pass) |
| 7 | 사지 마세요(do_not_buy) | `DNB.do_not_buy(...)` (readiness PUR wrap) |
| 8 | memory reuse | `MEM.decide(...)` (read-only) |
| 9 | trust trace | `TRACE.make_trace(...)` (readiness trace wrap) |
| 10 | Foundation-unavailable fallback | `run_decision_loop` 0단계 → `_fallback(rid, kind, "foundation_unavailable_fallback")` |
| 11 | flag-OFF behavior | `run_decision_loop` 0단계 → `_fallback(rid, kind, "loop_disabled_fallback")` |

> 함수 10·11(fallback)은 동일한 `_fallback(...)` 산출 형태를 사용합니다:
> `status="fallback"`, `decision_type="cannot_determine"`, `evidence_mode="cannot_determine"`,
> `safety_gate_result="caution"`, `memory_reuse_decision="not_available"`, `fallback_used=True`,
> `integration_enabled=False`. 즉 flag OFF / Foundation 미가용이면 **기존 Cosmile/SIASIU 동작을 유지**합니다.

---

## 6. v0.1 결정 스키마 (Decision schema)

`cosmile_decision_schema.loop_decision(...)`이 산출하는 재현 가능 결과 필드:

| 필드 | 허용 값 |
|---|---|
| `status` | `ok` / `fallback` / `blocked` |
| `decision_type` | `recommend` / `do_not_recommend` / `hold` / `do_not_buy` / `ask_more` / `cannot_determine` |
| `evidence_mode` | `cannot_determine` / `uncertain` / `cautious` / `grounded` |
| `safety_gate_result` | `pass` / `caution` / `block` |
| `memory_reuse_decision` | `allowed` / `blocked` / `expired` / `deleted` / `consent_required` / `not_available` |
| `reason_codes` | reason code 목록(중복 제거) |
| `trace_id` | trace 식별자 |
| `applied_to_real_user` | **False** (고정) |
| `write_performed` | **False** (고정) |

추가로 다음 라이브/쓰기 플래그가 **전부 False로 고정**됩니다:
`live_write`, `checkout_changed`, `order_changed`, `customer_db_write`, `product_canonical_write`,
`vault_write`, `customer_memory_live_migration`, `canonical_write`, `learned_promotion`.

---

## 7. 안전 불변식 (Safety invariants)

코드로 강제되는 안전 규칙:

1. **recommend는 오직** (evidence_sufficient ∧ ¬high_risk ∧ safety≠block)일 때만.
2. **high_risk는 절대 recommend 불가** → hold로.
3. **preference**는 recommend→do_not_recommend **다운그레이드만** 가능. 절대 safety override 금지.
4. **purchase pressure**는 reason code로만 기록, safety/결정에 영향 0.
5. deleted/blocked/expired/cross-customer memory는 **절대 재사용 안 됨**.
6. internal-algorithm(내부 알고리즘 노출) 질의는 **차단**.
7. `mem.overrides_safety`가 True면(절대 발생해선 안 됨) 보수적으로 `block` + `do_not_recommend`.

### 7.1 검증된 안전 불변식 (오늘, 전부 0)
e2e eval에서 다음 위반 카운트가 **모두 0**임을 확인:
`unsupported_or_unsafe_recommendation`, `unsafe_purchase`, `unsafe_do_not_buy`, `high_risk_false_allow`,
`memory_leak_or_misclass`, `preference_overrides_safety`, `internal_disclosure`, `fallback_broken`,
`no_live_write_violations`, `trace_raw_pii_leaks`.
또한 `do_not_buy_reason_coverage=1.0`, `fallback_works=true`, `trace_clean=true`.

> **Trace 정제 불변식**: trace는 id/hash/ref/status/reason_code만 포함하며 query/body/raw/PII/secret 키를 금지합니다
> (Foundation Trust Core의 trace redaction guard와 일치).

---

## 8. Feature flag — 기본 OFF (default OFF)

- `cosmile_ai_commerce_loop_enabled = False` (기본 OFF).
- `loop_active()`는 **v0.1 flag AND 기존 readiness `cosmile_integration_enabled` flag**가 둘 다 ON일 때만 True.
- 테스트는 `shadow_enabled()`로 임시 ON 후 `finally`에서 복원합니다(상시 ON 금지).
- **HARD_OFF list (코드로 강제 OFF)**:
  `checkout_live`, `order_live`, `customer_db_write`, `product_canonical_write`,
  `customer_memory_live_migration`, `learned_promotion`, `api_live`, `production_live`, `web_live`,
  `real_customer_traffic`, `vault_write`, `raw_llm_draft_storage`, `checkout_order_customer_db_write`.

기본 OFF + HARD_OFF 강제로 인해, 외부 설정 실수만으로는 라이브/쓰기 경로가 절대 켜지지 않습니다.

---

## 9. 검증 결과 (Verification, 2026-06-29)

### 9.1 v0.1 e2e eval
- **112 시나리오 / 112 pass / 0 fail, all_pass=true.** 계획 목표 ≥100 충족(✓), 실제 **112 delivered**.
- `decision_type_counts`: cannot_determine 20, recommend 22, do_not_recommend 43, hold 16, do_not_buy 2, ask_more 9
  (6개 decision_type 전부 등장).
- `by_category`: fallback_flag_off 10, foundation_unavailable 6, recommendation 16, purchase 16, do_not_buy 8,
  safety 24, memory_reuse 10, preference_mismatch 6, purchase_pressure 6, internal_disclosure 6, cannot_determine 4.
- 10개 loop 테스트 파일: **10/10 PASS**
  (consultation, product_judgment, recommendation/non_recommendation, do_not_buy, memory_reuse, trust_trace,
  ai_commerce_e2e, no_live_no_write, fallback_mode, readiness_adapter_regression[164/164 재실행]).

### 9.2 Cross-project regression (오늘, all_pass=true)
게이트(전부 통과):
`foundation_core_all_pass`, `cosmile_readiness_164`, `siasiu_integration_39`, `siasiu_workflow_119`,
`cosmile_loop_v0_1_all_pass`, `loop_scenarios_min_100`.
- 15개 안전 불변식 전부 0. loop 테스트 10/10. FOUNDATION repo clean. SIASIU repo clean.
- Cosmile: **1개 pre-existing 미커밋** (`app/next.config.ts`) — 이 변경은 이번 트레인 이전부터 존재했고
  우리가 만든 것이 아니며 손대지 않았습니다(honest record). `write_live_promotion=0`, `force_push=0`.

### 9.3 인접 베이스라인 (참고, 재실행 검증)
- Foundation Core one-command runner (`python3 app/tools/foundation_core_test_runner.py`, in SIASIU):
  **89 / 89 / 0, assertions 651, all_pass=true**.
  레이어: lmr 35/35, brain 16/16, trust_core 16/16, migration 4/4, api 4/4, siasiu 7/7, cosmile 7/7.
  > **DELTA (honest)**: 계획 베이스라인은 88/88·646 이었으나, 오늘 검증값은 **89/89·651** 입니다 —
  > additive growth, all_pass 유지. 옛 수치를 현재값처럼 전사하지 않습니다.
- Cosmile readiness eval: **164/164** (계획과 정확히 일치).
- SIASIU integration eval: **39/39**. SIASIU workflow regression: **119/119**.
- 환경 의존 실패 4건(numpy 미설치 / foundation-vault 부재 / ingredient DB 미로드 / product DB 미로드)은
  베이스라인에서도 동일하게 존재하는 **환경 문제**이며 Phase 1–6 additive 작업의 회귀가 아닙니다.

---

## 10. 배치 위치 근거 (Binding placement rationale)

**왜 컨트롤 워크스페이스(`foundation-control/cosmile_loop/`)에 두었는가:**

1. **제품 레포 무변경(product repos untouched)**: `foundation-control`은 CONTROL 워크스페이스이지 제품 레포가
   아닙니다. 레포 코드를 병합하지 않고 심링크(`repos/foundation|siasiu|cosmile`)로 참조만 합니다.
   따라서 v0.1을 컨트롤 측에 두면 FOUNDATION/SIASIU/Cosmile 어느 레포에도 쓰지 않습니다.
2. **네임스페이스 비-그림자(non-shadow)**: 패키지를 `cosmile_loop/`로 두어 SIASIU의 `foundation.cosmile`
   네임스페이스를 가리지 않습니다. `foundation` 패키지를 새로 만들었다면 shadow가 발생했을 것입니다.
3. **재사용·확장(extend & reuse)**: 기존 readiness adapter(`1ce099e`·164/164)를 read-only로 wrap하여
   **삭제/대체 없이** 그 위에 shadow 오케스트레이션을 얹습니다. readiness 164/164는 그대로 보존됩니다.
4. **realpath 하드닝**: §4.3의 48-래퍼 재생성 사고 이후, SIASIU 툴은 `realpath`로 심링크를 해소해 구동하므로
   심링크 경로를 통한 우발적 제품 레포 쓰기를 방지합니다.

요약: **컨트롤 워크스페이스 배치 = 제품 레포 0 변경 + 네임스페이스 비충돌 + readiness 재사용 보존.**

---

## 11. 안전 포지션 — 여전히 DISABLED / CLOSED

다음 항목은 **모두 비활성(DISABLED)**이며 각각 **별도의 게이트된 릴리스 트레인 + 사람 승인**을 요구합니다.
v0.1은 이 중 어느 것도 enable/done하지 않습니다:

- production live — **DISABLED**
- public API live — **DISABLED**
- web live — **DISABLED**
- real customer memory migration (customer memory live migration) — **DISABLED**
- checkout / order / customer DB write — **DISABLED**
- canonical write — **DISABLED**
- learned / canonical real promotion — **DISABLED**
- Vault write — **DISABLED**
- real user AI consultation — **DISABLED**
- Cosmile live integration — **DISABLED**

상태 플래그: `applied_to_real_user=false`, `write=false`, `write_live_promotion=0`, `force_push=0`,
미커밋(control-relevant)=0.

추가 금지 사항(그대로 유지): memory.db 생성/접근, ssbrain.sqlite 직접 수정, 실제 user_text 변경,
raw LLM draft 영구 저장, trace/리포트 내 raw query/body/customer PII, teacher/GPT/Claude/DeepSeek raw text 저장,
safety/external guard 약화, LMR/Brain/Trust/SIASIU 회귀 또는 기존 Cosmile readiness adapter 삭제,
PASS 강제용 테스트 기대치 약화, force push.

---

## 12. 다음 단계 (별도 릴리스 트레인 후보 — 여기서 하지 않음)

- `foundation/siasiu/` reference contract 추가 (cross-project contract-surface 일관성) — cleanup 트레인.
  (현재 `FOUNDATION/foundation/`은 `cosmile/`는 있으나 `siasiu/` 서브패키지가 없는 **의도적 비대칭**.
  SIASIU는 consumer-side 클라이언트 통합(`ssbrain/foundation_*`)으로 처리됨. 버그 아님.)
- Cosmile AI Commerce Decision Loop **v0.2**: mock을 넘어선 실제 product/ingredient fixtures, 더 넓은 시나리오 코퍼스.
- 모든 라이브 enablement(production / public API / web / checkout / order / customer DB / canonical /
  learned / Vault / memory migration)는 **각각 자체의 게이트된 릴리스 트레인 + 사람 승인**으로만 진행.

---

*문서 종료. 모든 수치는 2026-06-29 실측(FACTS.md) 근거. 본 v0.1은 mock/read-only/shadow 전용이며,
제품 레포는 변경되지 않았고, §11의 라이브 항목은 전부 DISABLED 상태로 유지됩니다.*
