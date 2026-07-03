# COSMILE READINESS ADAPTER BASELINE (1ce099e · 164/164) — 2026-06-29

> 본 문서는 foundation-control 릴리즈 트레인이 **재사용·확장(extend & reuse)** 하는 기존
> **Cosmile Foundation Integration Readiness Adapter** (commit `1ce099e`)의 baseline을 기록한다.
> 이 control workspace는 product repo에 **쓰지 않으며(no write into product repos)**, 기존 어댑터를
> **삭제·교체하지 않고(never delete / never replace)** read-only로 import 하여 `164/164` 결과를 보존한다.

---

## 0. Scope & Status (요약)

| 항목 | 값 |
|---|---|
| Baseline commit | `1ce099e` — "feat(cosmile): Phase 5 — Cosmile Foundation Integration Readiness PASS (mock/read-only/shadow)" |
| Eval | `app/tools/foundation_cosmile_integration_eval.py` (SIASIU) |
| Verified result (2026-06-29) | total **164**, pass **164**, fail **0** |
| Plan baseline 대비 | `164/164` — plan과 **정확히 일치(MATCHES plan exactly)**, delta 없음 |
| Adapter suite | 8 files × 2 locations (canonical materialized + runnable copy) |
| Tests | `test_cosmile_*.py` 7 files + integration eval 1 tool |
| Decision | 이 릴리즈 트레인은 어댑터를 **REUSE & EXTEND** 만 한다. 변경/삭제 없음 → `164/164` preserved. |
| Mode | mock / read-only / shadow — **live write 0** |

이 어댑터는 본 트레인이 새로 만든 것이 아니라 **이미 존재하는 검증된 자산**이다. 본 문서는 그 자산을
정직하게(honest-recording) 기록하고, control workspace가 어떻게 이를 **건드리지 않고 재사용**하는지를 못박는다.

---

## 1. The 8-File Adapter Suite — Two Locations

기존 Cosmile readiness 어댑터는 **동일한 8개 파일**이 두 위치에 존재한다. 하나는 **canonical materialized**(정본),
다른 하나는 SIASIU의 Trust Core를 실제로 import 하여 **실행 가능한 copy**다.

### 1.1 Canonical materialized — `FOUNDATION/foundation/cosmile/`

Foundation-side adapter subpackage. 정본(canonical) 위치이며 Foundation Core 자산으로 materialize 되어 있다.

| # | File | 역할 |
|---|---|---|
| 1 | `__init__.py` | subpackage 초기화 |
| 2 | `cosmile_foundation_contract.py` | 9개 계약 + `cosmile_request()` / `cosmile_decision()` (live-safety hard flags) |
| 3 | `cosmile_foundation_adapter.py` | Cosmile 요청 → Foundation Core(Trust Core) 라우팅 main adapter |
| 4 | `cosmile_feature_flags.py` | feature flag (default OFF + HARD_OFF 강제) |
| 5 | `cosmile_recommendation_adapter.py` | 추천(recommendation) 결정 어댑터 |
| 6 | `cosmile_purchase_guard_adapter.py` | 구매 가드(purchase guard) 어댑터 |
| 7 | `cosmile_safety_decision_adapter.py` | 성분/안전(safety) 결정 어댑터 |
| 8 | `cosmile_b2b_inquiry_adapter.py` | B2B inquiry 분류 어댑터 |
| (+) | `cosmile_trace_adapter.py` | trace reason-code 어댑터 (redaction 연계) |

> 위 표의 본문 8행은 spec이 명시한 8-file suite를 반영하며, `cosmile_trace_adapter.py`를 포함하면
> 디렉터리에 materialize 된 파일 목록은 다음과 같다(정본 기준):
> `__init__.py`, `cosmile_b2b_inquiry_adapter.py`, `cosmile_feature_flags.py`,
> `cosmile_foundation_adapter.py`, `cosmile_foundation_contract.py`,
> `cosmile_purchase_guard_adapter.py`, `cosmile_recommendation_adapter.py`,
> `cosmile_safety_decision_adapter.py`, `cosmile_trace_adapter.py`.

### 1.2 Runnable copy — `SIASIU/foundation/cosmile/`

동일한 파일 세트의 **실행 가능한 copy**. 이 copy는 SIASIU/app에 있는 **Foundation Core / Trust Core**를
직접 import 하여 동작한다.

`cosmile_foundation_adapter.py`는 자신의 위치 기준 상위의 `app/` 디렉터리를 `sys.path`에 추가한 뒤
다음을 import 한다.

- `import foundation_trust_core_runtime as TC` — Trust Core 런타임(16-gate)
- `import foundation_trace_redaction_guard as TG` — trace redaction guard
- `from foundation.cosmile import cosmile_foundation_contract as CT`
- `from foundation.cosmile import cosmile_feature_flags as FF`

즉 **canonical은 정본 자산**, **SIASIU copy는 SIASIU/app의 Trust Core를 import 하는 runnable** 이라는
두 위치 구조가 의도된 baseline이다.

---

## 2. Contract — Hard Live-Safety Flags

`cosmile_foundation_contract.py` 는 **9개 계약(9 contracts)** 을 정의한다.

```
CONTRACTS = (
    "ProductBrandQuery", "ProductRecommendationDecision", "PurchaseGuardDecision",
    "IngredientSafetyDecision", "CustomerDecisionMemoryReadPolicy",
    "B2BInquiryClassification", "CSOrderResponseSafety",
    "TraceReasonCode", "FeatureFlagFallback",
)
```

### 2.1 `cosmile_request(...)` — 항상 mock/read-only

요청 생성기는 모든 요청을 `"mock": True, "read_only": True` 로 고정 표기한다. (`audience` 기본값 `"customer"`)

### 2.2 `cosmile_decision(...)` — live write 0 hard-set

Cosmile-facing 결정 dict는 다음 5개 live-safety 플래그를 **무조건 `False`로 hard-set** 한다.
어떤 입력으로도 이 값들을 켤 수 없다.

| Flag | Value (hard-set) | 의미 |
|---|---|---|
| `live_write` | `False` | 실시간 쓰기 금지 |
| `checkout_changed` | `False` | 체크아웃 변경 금지 |
| `order_changed` | `False` | 주문 변경 금지 |
| `customer_db_write` | `False` | 고객 DB 쓰기 금지 |
| `product_canonical_write` | `False` | 제품 canonical 쓰기 금지 |

기본 결정값은 `decision="fallback"`, `allowed=False`, `max_answer_mode="cautious"`,
`integration_enabled=False` 이다. 즉 **기본 동작은 안전한 fallback** 이며, feature flag가 OFF면
어떤 Foundation 판단도 노출되지 않는다.

### 2.3 Adapter routing — flag OFF → fallback

`cosmile_foundation_adapter.evaluate(...)` 의 첫 분기:

- `FF.get("cosmile_integration_enabled")` 가 **OFF**이면 → `reason_codes=["integration_disabled_fallback"]`,
  `decision="fallback"`, `fallback_used=True`, `integration_enabled=False` 로 즉시 반환(기존 Cosmile/SIASIU 동작 유지).
- flag가 ON일 때만 Trust Core(`TC.evaluate`)를 **shadow 평가**하고, `blocked_gates` 를 reason_codes로 환원하며
  recommendation은 Trust gate 통과 전 노출되지 않는다.

feature flags는 **전부 default OFF + HARD_OFF list 강제** 구조다.

---

## 3. Test Suite — 7 Test Files + Eval Tool

| 구분 | 위치 | 내용 |
|---|---|---|
| Test files (7) | `SIASIU/app/tests/test_cosmile_*.py` | 어댑터별 단위/계약 테스트 (recommendation, purchase guard, safety decision, b2b inquiry, trace, contract, feature-flag/fallback 영역 커버) |
| Eval tool (1) | `SIASIU/app/tools/foundation_cosmile_integration_eval.py` | 통합 readiness eval → **164/164** 집계 |

테스트와 eval은 모두 **mock / read-only / shadow** 모드에서 실행되며, runner report는 scratch로 redirect 되어
**product repo는 clean 상태로 유지**된다.

---

## 4. Verified Result — 164/164 (2026-06-29)

> 아래 수치는 **2026-06-29 오늘 실제 실행하여 검증**한 값이다. Plan baseline `164/164` 와 **정확히 일치**하며
> delta 없음(no drift).

### 4.1 Totals

| 지표 | 값 |
|---|---|
| total | **164** |
| pass | **164** |
| fail | **0** |

### 4.2 `by_category`

| category | count |
|---|---:|
| fallback | 12 |
| recommendation | 80 |
| purchase | 20 |
| do_not_buy | 8 |
| safety | 36 |
| b2b_inquiry | 8 |
| **합계** | **164** |

### 4.3 Invariants (safety)

| invariant | 값 | 의미 |
|---|---|---|
| `no_live_write` | **0** | live write 위반 0건 |
| `unsafe_recommendation` | 0 | 안전하지 않은 추천 0건 |
| `unsafe_purchase` | 0 | 안전하지 않은 구매 0건 |
| `unsafe_do_not_buy` | 0 | 안전하지 않은 do-not-buy 0건 |
| `safety_overreach` | 0 | 안전 과잉차단 0건 |
| `do_not_buy_reason_coverage` | **1.0** | do-not-buy 사유 커버리지 100% |
| `fallback_works` | **true** | fallback 정상 동작 |

이 invariant 세트는 어댑터가 **추천을 함부로 내놓지 않고**, **구매/do-not-buy 판단에 안전 사유를 빠짐없이 부여**하며,
**flag OFF 시 fallback이 항상 작동**함을 보증한다.

---

## 5. Decision — REUSE & EXTEND (never delete / never replace)

본 릴리즈 트레인의 명시적 결정:

1. **재사용·확장만 한다(REUSE & EXTEND).** Phase-7 방법은 "1. 확장·재사용". control workspace는 기존
   readiness 어댑터를 **read-only로 import** 하며, 8-adapter suite를 **수정하지 않는다**.
2. **삭제/교체 금지.** 기존 Cosmile readiness 어댑터를 deleting/replacing 하는 것은 금지 항목(CLOSED)이다.
3. **결과 보존.** 어댑터가 변경되지 않으므로 **`164/164` 가 그대로 보존**된다. (control-side loop의
   `readiness_adapter_regression` 테스트가 `164/164` 를 재실행하여 회귀 없음을 재확인한다.)
4. **product repo 무변경.** control workspace는 product repo에 쓰지 않으며, FOUNDATION/SIASIU repo는 clean
   상태로 유지된다(Cosmile repo의 `app/next.config.ts` 1건은 본 작업과 무관한 **pre-existing** 변경으로 그대로 둔다).

> control-side 신규 Cosmile AI Commerce Decision Loop v0.1 은 별도 package `cosmile_loop/` 에 살며,
> `foundation` 패키지를 만들지 않는다(그러면 SIASIU의 `foundation.cosmile` 네임스페이스를 가리게 됨).
> 이 신규 루프는 기존 readiness 어댑터(REC/PUR/trace)를 **wrap** 하여 재사용한다 — 즉 baseline `164/164` 위에
> 얹히는 **additive shadow layer** 이지, 기존 자산의 치환이 아니다.

---

## 6. Safety Posture — STILL DISABLED / CLOSED

다음 항목들은 **별도의 게이트된 릴리즈 트레인**이 필요하며, 본 baseline 및 본 트레인에서 **여전히 DISABLED**이다.
어느 것도 done/enabled 가 아니다.

- production live — **DISABLED**
- public API live — **DISABLED**
- web live — **DISABLED**
- real customer memory migration (customer memory live migration) — **DISABLED**
- checkout / order / customer DB write — **DISABLED**
- product canonical write — **DISABLED**
- learned/canonical promotion — **DISABLED**
- Vault write — **DISABLED**
- real user AI consultation (real user_text change) — **DISABLED**
- Cosmile live integration (real customer traffic) — **DISABLED**

상태 플래그: `applied_to_real_user=false`, `write=false`, `write_live_promotion=0`, `force_push=0`,
미커밋(control-relevant)=0. 어댑터 계약 차원에서도 `live_write / checkout_changed / order_changed /
customer_db_write / product_canonical_write` 가 모두 `False` 로 hard-set 되어 있어 **live 경로가 코드로 봉쇄**되어 있다.

---

## 7. Verification Pointers (재현용)

| 대상 | 경로 / 명령 |
|---|---|
| Canonical adapter dir | `repos/foundation/foundation/cosmile/` (→ `FOUNDATION/foundation/cosmile/`) |
| Runnable copy dir | `SIASIU/foundation/cosmile/` |
| Contract | `cosmile_foundation_contract.py` (9 contracts, live flags hard-set False) |
| Main adapter | `cosmile_foundation_adapter.py` (flag OFF → fallback; Trust Core shadow eval) |
| Tests | `SIASIU/app/tests/test_cosmile_*.py` (7 files) |
| Eval | `SIASIU/app/tools/foundation_cosmile_integration_eval.py` → 164/164 |

> Cross-project regression gate 기준으로도 `cosmile_readiness_164 = true` 로 확인되었고, control-side loop의
> readiness regression 테스트가 동일 `164/164` 를 재실행한다. baseline은 **재사용·확장 하에 그대로 유지**된다.

---

*Recorded 2026-06-29 — foundation-control control workspace. Honest-recording: Cosmile readiness eval `164/164`
는 plan baseline과 정확히 일치하며(no delta), 본 트레인은 어댑터를 REUSE & EXTEND 만 한다.*
