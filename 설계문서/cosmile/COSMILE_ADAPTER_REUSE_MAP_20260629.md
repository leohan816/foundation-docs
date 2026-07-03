# COSMILE ADAPTER REUSE MAP — 2026-06-29

> 목적(Purpose): Cosmile AI Commerce Decision Loop **v0.1**의 각 필수 capability/파일이
> **기존 readiness 어댑터(재사용·wrap)** 에 매핑되는지, 아니면 **신규 오케스트레이션 모듈
> (new-orchestration)** 인지를 1:1로 증명한다. 이 문서는 **중복 어댑터 없음(no duplicate
> adapter)** 과 **기존 8개 어댑터 무삭제·무변경(no deletion / no modification)** 을 기록으로 남긴다.
>
> 원칙(Phase-7 method): **"1. 확장·재사용"(extend & reuse)**. foundation-control은 CONTROL
> workspace이며, 기존 Cosmile readiness 어댑터(commit `1ce099e` · 164/164)를
> `realpath(repos/siasiu)` 경유로 **read-only import** 한다. 제품 repo에 절대 쓰지 않는다.

---

## 0. Scope & 두 패키지의 위치

| 구분 | 패키지 경로 | 성격 | 변경 여부 |
|---|---|---|---|
| 기존 readiness 어댑터 (REUSED) | `FOUNDATION/foundation/cosmile/` (canonical) · `SIASIU/foundation/cosmile/` (runnable copy) | Foundation-side 어댑터 subpackage, commit `1ce099e` | **무변경**. control workspace가 read-only로 import. 164/164 보존 |
| 신규 v0.1 loop (NEW) | `foundation-control/cosmile_loop/` (11 modules) | CONTROL-side shadow 오케스트레이션 layer | 신규. 기존 파일을 **삭제/대체하지 않음** |

> ★ 네임스페이스 주의: 신규 패키지는 `foundation` 패키지를 만들지 **않는다**(만들면 SIASIU의
> `foundation.cosmile` 네임스페이스를 shadow 하게 됨). 그래서 별도 패키지 `cosmile_loop/`로 격리한다.

### 0.1 기존 readiness 패키지 = "8개 어댑터" + 패키지 `__init__`
`foundation/cosmile/`는 패키지 `__init__.py` 1개와 **8개의 어댑터/계약 모듈**로 구성된다(= 본 문서가
말하는 "기존 8개 어댑터"). 8개 전부 이번 release train에서 **수정/삭제되지 않았다**.

1. `cosmile_b2b_inquiry_adapter.py`
2. `cosmile_feature_flags.py`
3. `cosmile_foundation_adapter.py`
4. `cosmile_foundation_contract.py` (9 contracts; `cosmile_decision()`이 `live_write`/`checkout_changed`/`order_changed`/`customer_db_write`/`product_canonical_write = False` 하드셋)
5. `cosmile_purchase_guard_adapter.py`
6. `cosmile_recommendation_adapter.py`
7. `cosmile_safety_decision_adapter.py`
8. `cosmile_trace_adapter.py`

---

## 1. Reuse Map — capability → 기존 어댑터 vs 신규 모듈

| capability | 기존 readiness adapter (`foundation/cosmile/*`) | 신규 `cosmile_loop/` 모듈 | reuse 전략 |
|---|---|---|---|
| **consultation** (고객 상담 진입·의도 분류) | `cosmile_b2b_inquiry_adapter` (`classify`: b2b / cs_order / customer 분류 + `live_write=False`) | `cosmile_customer_consultation_adapter` (**NEW**) | **new-orchestration**: 기존 `b2b_inquiry`를 wrap → `customer_inquiry`에 한해 의도(kind/answer_type) 추정. 고위험(임신·시술·의료·이상반응)은 `high_risk=True` 표시. read-only·PII 미보관 |
| **product_judgment** (성분/안전 상품 판단) | `cosmile_safety_decision_adapter` (`safety`: Trust Core 안전 게이트) | `cosmile_product_judgment_adapter` (**NEW**) | **new (wraps safety_decision)**: 기존 `safety_decision`을 wrap → `safety_gate_result(pass/caution/block)` + `evidence_mode` 종합. shadow·write 0 |
| **recommendation** (추천/비추천/보류) | `cosmile_recommendation_adapter` (`recommend`) | `cosmile_recommendation_adapter` (wrapper) | **wrap/extend**: 기존 `recommend` 결과를 v0.1 `decision_type`(recommend/do_not_recommend/hold/ask_more)으로 매핑. 근거없음/고위험이면 recommend 절대 금지 |
| **do_not_buy / purchase** (구매 판단 + "사지 마세요") | `cosmile_purchase_guard_adapter` (`purchase`, `do_not_buy`) | `cosmile_do_not_buy_adapter` (wrapper) | **wrap/extend**: 기존 `purchase_guard`를 wrap. `do_not_buy`는 reason + safer_alternative 충족 시에만 do_not_buy, 부족하면 ask_more(do_not_buy_gate) |
| **memory_reuse** (고객 결정 메모리 재사용 판정) | *(전용 cosmile 어댑터 없음)* — **Trust Core 메모리 가드** 직접 재사용: `foundation_customer_memory_consent_guard`, `foundation_cross_customer_isolation_guard`, `foundation_deleted_expired_memory_guard` | `cosmile_memory_reuse_adapter` (**NEW**) | **new (reuses Trust Core memory guards)**: read-only로 3개 가드를 재사용 → `memory_reuse_decision`(allowed/blocked/expired/deleted/consent_required/not_available). fail-closed. preference/outcome은 evidence upgrade 0.0, safety override 0 |
| **trust_trace** (trace / reason code) | `cosmile_trace_adapter` (`make_trace`: redacted+clean) + Trust Core `foundation_trace_redaction_guard` | `cosmile_trust_trace_adapter` (wrapper) | **wrap/extend**: 기존 trace 어댑터로 redact 후 v0.1 메타(trace_id/decision_type/safety_gate_result/memory_reuse_decision/evidence_mode)만 부착, redaction guard로 이중 검사. trace엔 id/hash/ref/status/reason_code만 — raw/query/body/PII 0 |
| **ai_commerce_loop** (오케스트레이터) | *(단일 readiness 어댑터에 대응 없음 — 위 어댑터들을 조립)* | `cosmile_ai_commerce_loop` (**NEW**) | **new-orchestration**: consultation→judgment→recommendation/do_not_buy→memory_reuse→trust_trace를 하나의 v0.1 결정으로 조립. flag OFF면 fallback |
| **feature_flags** (v0.1 플래그) | `cosmile_feature_flags` (readiness `HARD_OFF`, `cosmile_integration_enabled`) | `cosmile_feature_flags` (**NEW v0.1**) | **extend/inherit**: 기존 readiness `HARD_OFF`를 `tuple(_READINESS_FF.HARD_OFF) + (...)`로 **상속·확장**. `loop_active()`는 v0.1 flag **AND** 기존 `cosmile_integration_enabled` 둘 다 ON일 때만 동작 |

### 1.1 supporting modules (capability 비매핑·내부 지원 — 신규, 중복 아님)
| 모듈 | 역할 | 전략 |
|---|---|---|
| `__init__.py` | `cosmile_loop` 패키지 초기화 | new |
| `_bootstrap.py` | `realpath(repos/siasiu)` 기반 sys.path 준비(기존 어댑터 read-only import 경로) | new (glue) |
| `cosmile_decision_schema.py` | v0.1 decision schema·매핑 함수(`decision_type_for`, `safety_gate_result`, `evidence_mode_from`, `trace_id_for`) | new |

> 합계: `cosmile_loop/` = **11 modules** (위 표의 신규 7 + supporting 3 + wrapper 1개를 신규로 카운트 시).
> 실제 디렉터리 확인: `__init__`, `_bootstrap`, `cosmile_feature_flags`, `cosmile_decision_schema`,
> `cosmile_customer_consultation_adapter`, `cosmile_product_judgment_adapter`,
> `cosmile_recommendation_adapter`, `cosmile_do_not_buy_adapter`, `cosmile_memory_reuse_adapter`,
> `cosmile_trust_trace_adapter`, `cosmile_ai_commerce_loop`.

---

## 2. wrap 방향 증명 (코드 import로 확인)

각 신규 wrapper가 **기존 어댑터를 import 해서 감싸는** 단방향임을 import 라인으로 증명한다(역방향 의존 0).

| 신규 모듈 | import 하는 기존 심볼 |
|---|---|
| `cosmile_recommendation_adapter` | `from foundation.cosmile import cosmile_recommendation_adapter as _REC` |
| `cosmile_do_not_buy_adapter` | `from foundation.cosmile import cosmile_purchase_guard_adapter as _PUR` |
| `cosmile_customer_consultation_adapter` | `from foundation.cosmile import cosmile_b2b_inquiry_adapter as _B2B` |
| `cosmile_product_judgment_adapter` | `from foundation.cosmile import cosmile_safety_decision_adapter as _SAF` |
| `cosmile_trust_trace_adapter` | `from foundation.cosmile import cosmile_trace_adapter as _TR` + `import foundation_trace_redaction_guard as _TG` |
| `cosmile_memory_reuse_adapter` | `import foundation_customer_memory_consent_guard / _cross_customer_isolation_guard / _deleted_expired_memory_guard` (Trust Core 가드 직접 재사용) |
| `cosmile_feature_flags` | `from foundation.cosmile import cosmile_feature_flags as _READINESS_FF` (`HARD_OFF` 상속) |

> 방향성: **신규 → 기존** (read-only import). 기존 `foundation/cosmile/*` 어느 파일도 `cosmile_loop`을
> import 하지 않는다. 따라서 기존 어댑터의 동작/계약은 변하지 않으며, 164/164는 그대로 유지된다.

---

## 3. 중복 없음 / 삭제 없음 검증 (verified 2026-06-29)

### 3.1 No duplicate adapter
- 7개 capability 중 **recommendation·purchase/do_not_buy·trust_trace**는 동일 이름의 기존 어댑터를
  **재구현하지 않고 wrap** 한다(중복 로직 0 — 결정 본체는 기존 어댑터가 수행, 신규는 v0.1 매핑만).
- **consultation·product_judgment·memory_reuse**는 기존에 **대응되는 단일 어댑터가 없던** capability라,
  기존 어댑터(b2b_inquiry / safety_decision)나 Trust Core 가드를 재사용해 **신규 오케스트레이션**으로만 추가했다.
- **ai_commerce_loop**는 위 어댑터들을 조립하는 오케스트레이터로, 어느 어댑터와도 기능이 겹치지 않는다.

### 3.2 No deletion / no modification of the existing 8 adapters
- `foundation/cosmile/`의 **8개 어댑터 + 패키지 `__init__`** 모두 이번 train에서 **수정/삭제 0**.
- 회귀 증거: readiness eval `app/tools/foundation_cosmile_integration_eval.py` = **164/164 PASS**
  (no_live_write 0, unsafe_recommendation 0, unsafe_purchase 0, unsafe_do_not_buy 0, safety_overreach 0,
  do_not_buy_reason_coverage 1.0, fallback_works true). by_category: fallback 12, recommendation 80,
  purchase 20, do_not_buy 8, safety 36, b2b_inquiry 8 — **plan 기준과 정확히 일치(164/164)**.
- loop 테스트 중 `readiness_adapter_regression`가 기존 **164/164를 그대로 재실행**해 무회귀를 재확인한다.

### 3.3 v0.1 자체 검증(today)
- e2e eval: **112 scenarios / 112 pass / 0 fail**, all_pass=true (≥100 ✓). decision_type 6종 전부 등장.
- 10 loop test files **10/10 PASS** (consultation, product_judgment, recommendation/non_recommendation,
  do_not_buy, memory_reuse, trust_trace, ai_commerce_e2e, no_live_no_write, fallback_mode,
  readiness_adapter_regression[re-runs 164/164]).
- 안전 불변식 전부 0: unsupported_or_unsafe_recommendation, unsafe_purchase, unsafe_do_not_buy,
  high_risk_false_allow, memory_leak_or_misclass, preference_overrides_safety, internal_disclosure,
  fallback_broken, no_live_write_violations, trace_raw_pii_leaks. trace_clean=true.

### 3.4 Cross-project regression delta (honest recording)
- 1-command Foundation Core runner = **89/89 · 651 assertions** (all_pass), testability_gate_ok=true.
  **DELTA**: plan baseline는 88/88·646 였고, 오늘 측정은 **89/89·651** — additive growth, all_pass.
  (stale 88/88로 옮겨 적지 않음)
- 동반 게이트(today, all_pass=true): foundation_core_all_pass, cosmile_readiness_164,
  siasiu_integration_39, siasiu_workflow_119, cosmile_loop_v0_1_all_pass, loop_scenarios_min_100.

---

## 4. Safety posture — 여전히 DISABLED / CLOSED

아래 항목들은 **이 train과 무관한 별도 release train**이며 **전부 비활성(DISABLED)** 상태로 유지된다.
v0.1 loop의 `feature_flags`는 기존 readiness `HARD_OFF`를 상속해 코드로 강제 OFF 한다.

- production live — **DISABLED**
- public API live — **DISABLED**
- web live — **DISABLED**
- real customer traffic / 실제 사용자 AI 상담 — **DISABLED**
- real customer memory migration (`customer_memory_live_migration`) — **DISABLED**
- checkout / order / customer DB write — **DISABLED**
- product canonical write — **DISABLED**
- learned / canonical real promotion — **DISABLED**
- Vault write — **DISABLED**
- Cosmile live integration — **DISABLED**

v0.1 decision schema는 `applied_to_real_user=False`, `write_performed=False`, 그리고
`live_write / checkout_changed / order_changed / customer_db_write / product_canonical_write /
vault_write / customer_memory_live_migration / canonical_write / learned_promotion`을 **전부 False**로 고정한다.
flag 상태: `cosmile_ai_commerce_loop_enabled=False`(default OFF); 테스트만 `shadow_enabled()`로 일시 ON 후 finally 복원.

---

## 5. 결론 (Conclusion)

1. **중복 어댑터 없음(No duplicate adapter).** v0.1의 모든 capability는 ① 기존 readiness 어댑터를 wrap
   하거나(recommendation, do_not_buy/purchase, trust_trace), ② 기존 어댑터/Trust Core 가드를 재사용한
   신규 오케스트레이션(consultation, product_judgment, memory_reuse, ai_commerce_loop, feature_flags)으로만
   추가되었다. 결정 본체 로직을 재구현한 곳은 없다.
2. **기존 8개 어댑터 무삭제·무변경(No deletion / no modification).** `foundation/cosmile/`의 8개 어댑터는
   read-only로만 사용되었고 164/164가 그대로 유지된다. 신규 코드는 `cosmile_loop/` 안에만 존재하며 제품
   repo에 어떤 쓰기도 하지 않았다.
3. **방향성 단방향.** 의존은 신규 → 기존(read-only import)뿐이며 역방향 0. 따라서 기존 readiness 계약은 불변이다.
4. **안전 게이트 유지.** 위 §4의 live/write/promotion 항목은 전부 DISABLED이며 별도 게이트 release train으로만 활성화된다.

---

*Generated 2026-06-29 · foundation-control CONTROL workspace · readiness adapter `1ce099e` (164/164) reused & extended, not replaced.*
