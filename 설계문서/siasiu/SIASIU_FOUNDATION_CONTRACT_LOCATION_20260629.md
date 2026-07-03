# SIASIU ↔ FOUNDATION CONTRACT LOCATION & foundation/cosmile vs foundation/siasiu ASYMMETRY — 2026-06-29

> 본 문서는 두 번째 인벤토리 요청("FOUNDATION 쪽에 cosmile/ 는 있는데 siasiu/ 는 왜 없나? 계약(contract) 면이 비대칭인데 버그인가?")에 대한 명시적 답변입니다.
> Scope: **inventory + verdict only**. 이 작업으로 **코드는 단 한 줄도 변경되지 않았습니다 (no code was changed)**. 모든 결론은 read-only 인벤토리로 도출했습니다.
> Authority: `/tmp/.../scratchpad/FACTS.md` (canonical, 2026-06-29 verified). 본 문서는 그 사실만 사용합니다.

---

## 0. TL;DR (결론 먼저)

- **사실**: `FOUNDATION/foundation/` 에는 `cosmile/` 서브패키지가 **있고**, `siasiu/` 서브패키지는 **없습니다 (NO)**.
- **SIASIU 통합의 실제 위치**: SIASIU 통합은 **consumer-side (소비자 측)** 으로, `SIASIU/app/ssbrain/foundation_*` 5개 모듈에 들어 있습니다.
- **계약 면**: `FOUNDATION/foundation/api/` 에는 **generic `foundation_core_*` 만** 존재하며, **SIASIU 전용 contract 는 없습니다**.
- **VERDICT**: 이 비대칭은 **의도된 설계 (intentional asymmetry)** 이며 **오류가 아닙니다 (NOT an error)**.
  - Cosmile = **Foundation-side adapter 서브패키지** (`foundation/cosmile/`).
  - SIASIU = **consumer-side client integration** (`ssbrain/foundation_*`) — `answer.py` 가 Foundation 을 import 하지 않도록(un-importing) 유지하기 위한 선택.
- **차단 여부**: 이 비대칭은 **Cosmile (Phase 7) 작업을 차단하지 않습니다 (does NOT block)**.
- **제안**: cross-project contract-surface 균일성을 위해 Foundation 쪽에 `foundation/siasiu/` reference contract 를 추가하는 것을 **CLEANUP RELEASE TRAIN candidate** 로 제안합니다 (제안일 뿐, 여기서 구현하지 않음).

---

## 1. 인벤토리: FOUNDATION/foundation/ 실측 (verified 2026-06-29)

`FOUNDATION/foundation/` 하위에서 `cosmile/` 는 존재하고 `siasiu/` 는 존재하지 않음을 확인했습니다. 또한 `find -iname '*siasiu*'` 결과는 **빈 집합**입니다 (FOUNDATION/foundation/ 어디에도 siasiu 라는 이름의 경로가 없음).

### 1.1 `FOUNDATION/foundation/cosmile/` — 존재 (8 files)

기존 Cosmile readiness adapter 의 canonical materialized 위치 (commit `1ce099e`, 164/164). 이 release train 은 이 어댑터를 **재사용·확장만 하고, 교체/삭제하지 않습니다**.

| # | File |
|---|------|
| 1 | `__init__.py` |
| 2 | `cosmile_b2b_inquiry_adapter.py` |
| 3 | `cosmile_feature_flags.py` |
| 4 | `cosmile_foundation_adapter.py` |
| 5 | `cosmile_foundation_contract.py` |
| 6 | `cosmile_purchase_guard_adapter.py` |
| 7 | `cosmile_recommendation_adapter.py` |
| 8 | `cosmile_safety_decision_adapter.py` |
| 9 | `cosmile_trace_adapter.py` |

> 참고: 위 표는 8-adapter suite 의 파일 목록입니다(`__init__.py` 포함 시 9개 엔트리). FACTS 기준 "8 files / 8-adapter suite" 로 카운트하며, runnable copy 는 `SIASIU/foundation/cosmile/` 에 동일 구성으로 존재합니다.

### 1.2 `FOUNDATION/foundation/siasiu/` — **존재하지 않음 (NO subpackage)**

```
ls: cannot access '/home/leo/Project/FOUNDATION/foundation/siasiu/': No such file or directory
find /home/leo/Project/FOUNDATION/foundation/ -iname '*siasiu*'  →  (empty)
```

### 1.3 `FOUNDATION/foundation/api/` — generic 만 존재 (NO SIASIU-specific contract)

| # | File | 성격 |
|---|------|------|
| 1 | `__init__.py` | 패키지 |
| 2 | `foundation_core_service.py` | generic core |
| 3 | `foundation_core_contract.py` | **generic** contract (SIASIU 전용 아님) |
| 4 | `foundation_core_healthcheck.py` | generic core |
| 5 | `foundation_core_adapter.py` | generic core |

`contracts/` 및 `adapters/` 디렉터리는 `__init__.py` 만 보유 — 여기에도 SIASIU 전용 계약은 없습니다. 즉 **Foundation 쪽 계약 면은 전부 generic** 이며, SIASIU 라는 이름이 박힌 contract 는 Foundation 저장소 어디에도 없습니다.

---

## 2. SIASIU 통합의 실제 위치: consumer-side (`SIASIU/app/ssbrain/foundation_*`)

SIASIU↔Foundation 통합은 Foundation 서브패키지가 아니라 **SIASIU 소비자 측 클라이언트**로 구현되어 있습니다. 모듈 5개 (verified):

| # | Module (`SIASIU/app/ssbrain/`) | 역할 |
|---|--------------------------------|------|
| 1 | `foundation_core_client.py` | Foundation Core 호출 클라이언트 |
| 2 | `foundation_feature_flags.py` | 통합 feature flag (default OFF) |
| 3 | `foundation_repo_link.py` | SIASIU→FOUNDATION repo physical link |
| 4 | `foundation_shadow_adapter.py` | shadow(병행 관찰) 어댑터 |
| 5 | `foundation_trace_bridge.py` | trace 브리지 (redaction-safe) |

통합 eval 의 import 형태:

```python
from ssbrain import (
    foundation_shadow_adapter as SH,
    foundation_feature_flags as FF,
    foundation_core_client as CL,
)
```

핵심 invariant: **SIASIU `answer.py` 는 Foundation 을 import 하지 않습니다** ("answer.py foundation 미import" assertion). answer.py baseline fingerprint = `d7f579443f8a110a` 로 고정되어 있으며, integration·workflow 양쪽 eval 이 `answer_py_fingerprint()==fp0=="d7f579443f8a110a"` 를 assert + PASS 합니다. 즉 answer.py 동작은 shadow 로 **불변(unchanged)**.

---

## 3. 비대칭의 구조적 대비 (왜 모양이 다른가)

| 항목 | Cosmile | SIASIU |
|------|---------|--------|
| 통합 방향 | **Foundation-side** | **Consumer-side** |
| 코드 위치 | `FOUNDATION/foundation/cosmile/` (서브패키지, 8 files) | `SIASIU/app/ssbrain/foundation_*` (5 modules) |
| 계약 면 | `cosmile_foundation_contract.py` (9 contracts, Foundation 내부에 존재) | Foundation 측에는 전용 contract **없음**; `api/foundation_core_contract.py` 는 generic |
| 핵심 제약 | `cosmile_decision()` 가 live_write / checkout_changed / order_changed / customer_db_write / product_canonical_write = **False** 하드셋 | `answer.py` 가 Foundation 을 **import 하지 않음** (un-importing) 유지 |
| Runnable copy | `SIASIU/foundation/cosmile/` (동일 8 files) | 해당 없음 (consumer 가 곧 SIASIU 자신) |
| 검증 | `foundation_cosmile_integration_eval.py` → 164/164 | `foundation_siasiu_integration_eval.py` → 39/39, `..._workflow_regression_eval.py` → 119/119 |

### 왜 이렇게 다른가 (rationale)

- **Cosmile** 은 Foundation 이 "외부 커머스 의사결정"에 대해 **Foundation 측에서 제공하는 어댑터/계약**으로 모델링됩니다. 따라서 어댑터와 contract 가 `foundation/cosmile/` 안에 같이 materialize 됩니다. Cosmile 은 Foundation 의 readiness 어댑터를 import 하는 입장.
- **SIASIU** 는 그 반대입니다. SIASIU 가 Foundation Core 를 **소비(consume)** 하되, 핵심 답변 경로(`answer.py`)는 Foundation 에 대해 **무지(無知)** 상태로 남아야 한다는 강한 요구가 있습니다. 이를 보장하는 자연스러운 위치는 **SIASIU 측 `ssbrain/foundation_*` 클라이언트**이며, Foundation 안에 `siasiu/` 서브패키지를 만들면 오히려 결합 방향이 반대로 암시되어 "answer.py 미import" 불변식과 충돌하는 인상을 줍니다.

즉, 모양이 다른 것은 **결합 방향(coupling direction)이 다르기 때문**이며 이는 의도된 것입니다.

---

## 4. VERDICT — 의도된 비대칭, 오류 아님

**판정: defensible intentional asymmetry. NOT an error / NOT a bug.**

- Cosmile = Foundation-side adapter 서브패키지 (`foundation/cosmile/`).
- SIASIU = consumer-side client integration (`ssbrain/foundation_*`), `answer.py` un-importing Foundation 유지.
- Foundation 측 계약 면이 generic(`foundation_core_*`) 만 갖는 것은, SIASIU 결합을 소비자 측에 두기로 한 결정의 **자연스러운 귀결**입니다.

### 4.1 Phase 7 (Cosmile) 차단 여부 — **차단하지 않음**

이 비대칭은 **Cosmile (Phase 7) AI Commerce Decision Loop 작업을 차단하지 않습니다.** 근거:

- Phase 7 (`cosmile_loop/`) 은 기존 readiness 어댑터(`foundation/cosmile/`, 164/164)를 **read-only 로 재사용·확장**하는 control-side shadow layer 이며, SIASIU 쪽 `siasiu/` 부재와 무관합니다.
- 오늘자 cross-project regression: `all_pass=true`. 게이트 전부 통과 — foundation_core_all_pass, cosmile_readiness_164, siasiu_integration_39, siasiu_workflow_119, cosmile_loop_v0_1_all_pass, loop_scenarios_min_100. 15 safety invariants 전부 0.

---

## 5. 오늘자 검증 베이스라인 (인용, 변경 없음)

이 인벤토리는 코드를 바꾸지 않았으므로 베이스라인은 그대로입니다. 정직 기록을 위해 **plan baseline 과의 DELTA** 를 명시합니다.

| 항목 | Runner / Eval | 오늘 결과 (2026-06-29) | 비고 |
|------|----------------|------------------------|------|
| Foundation Core one-command runner | `app/tools/foundation_core_test_runner.py` (SIASIU) | **89/89 pass, 651 assertions, all_pass=true** | **DELTA: plan baseline 은 88/88·646 → 오늘 89/89·651 (additive 성장, all_pass).** stale 숫자 전사 아님. layers: lmr 35/35, brain 16/16, trust_core 16/16, migration 4/4, api 4/4, siasiu 7/7, cosmile 7/7 |
| Cosmile readiness integration | `app/tools/foundation_cosmile_integration_eval.py` | **164/164** (plan 과 정확히 일치) | by_category fallback12·recommendation80·purchase20·do_not_buy8·safety36·b2b_inquiry8 |
| SIASIU Foundation integration | `app/tools/foundation_siasiu_integration_eval.py` | **39/39**, answer_unchanged=true | shadow/fallback coverage 1.0 |
| SIASIU workflow regression | `app/tools/foundation_siasiu_workflow_regression_eval.py` | **119/119**, behavior_changed 0, scenarios 16 | false_allow 0 / raw_trace_leak 0 |
| answer.py fingerprint | (both evals assert) | `d7f579443f8a110a` (불변) | answer.py 무변경(shadow) |

> 환경 의존 실패 4건(test_ssbrain=numpy 미설치, test_judge_real=foundation-vault 부재, test_ingredient_load=ingredient DB 미로딩, test_products_e2e=product DB 미로딩)은 **환경 문제이며 Phase 1–6 additive 작업의 regression 아님** (baseline 에서도 동일).

---

## 6. CLEANUP RELEASE TRAIN candidate — `foundation/siasiu/` reference contract

비대칭이 오류는 아니지만, **cross-project contract-surface 균일성(documentation parity)** 관점에서 다음을 별도 cleanup train 후보로 제안합니다.

**제안 내용**
- Foundation 측에 `foundation/siasiu/` **reference contract** 추가 — Cosmile 의 `foundation/cosmile/cosmile_foundation_contract.py` 와 동일한 "Foundation 쪽 계약 표면"을 SIASIU 에 대해서도 명시적으로 노출.
- 목적은 **계약 면 균일성/문서 패리티**일 뿐이며, 결합 방향을 바꾸지 않습니다. 핵심 불변식 — `answer.py` 가 Foundation 을 import 하지 않음 — 은 **그대로 보존**되어야 합니다. (reference contract 는 소비자 클라이언트를 대체하지 않고 문서/표면만 제공.)

**제약 (가드레일)**
- 이는 **제안일 뿐 (proposed, not done here)**. 본 인벤토리에서 코드 변경 없음.
- 기존 `ssbrain/foundation_*` 5개 모듈, `foundation/cosmile/` 8-adapter suite(164/164), answer.py fingerprint(`d7f579443f8a110a`) 중 **무엇도 교체/삭제/약화하지 않음**.
- 별도 release train 으로, 자체 회귀 게이트와 함께 진행.

---

## 7. 변경 없음 선언 + 안전 자세 (STILL DISABLED / CLOSED)

**이 문서/인벤토리로 변경된 것: 없음 (no code changed).** 본 작업은 `foundation-control` CONTROL workspace 의 read-only 인벤토리이며, product repo(`FOUNDATION`/`SIASIU`/`Cosmile`)에 **쓰지 않습니다**. (Cosmile repo 의 ` M app/next.config.ts` 미커밋 1건은 이 release train 이전부터 존재하던 것으로, 우리 작업이 아니며 그대로 둠.)

다음 항목들은 **모두 비활성/CLOSED 이며, 각각 별도의 게이트된 release train + 인간 승인**을 요구합니다 (본 작업과 무관, 절대 done/enabled 아님):

- production live — **DISABLED**
- public API live — **DISABLED**
- web live — **DISABLED**
- real customer memory live migration — **DISABLED**
- checkout / order / customer DB write — **DISABLED**
- canonical write — **DISABLED**
- learned / canonical 실 promotion — **DISABLED**
- Vault write — **DISABLED**
- real user AI consultation (실사용자 적용) — **DISABLED**
- Cosmile live integration — **DISABLED**

Status flags: `applied_to_real_user=false`, `write=false`, `write_live_promotion=0`, `force_push=0`, control-relevant 미커밋=0.

---

### 부록 A — 검증 명령 (인벤토리 재현용, read-only)

```
ls -1 /home/leo/Project/FOUNDATION/foundation/cosmile/        # 8-adapter suite 존재
ls -1d /home/leo/Project/FOUNDATION/foundation/siasiu/        # No such file or directory
ls -1 /home/leo/Project/FOUNDATION/foundation/api/            # generic foundation_core_* only
ls -1 /home/leo/Project/SIASIU/app/ssbrain/ | grep foundation # 5 consumer-side modules
find /home/leo/Project/FOUNDATION/foundation/ -iname '*siasiu*'  # (empty)
```

— END —
