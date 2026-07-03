# KNOWN ENVIRONMENT-DEPENDENT FAILURES — 2026-06-29

> foundation-control cross-project release train · 환경 의존성으로 인한 알려진 실패 기록
> 본 문서는 **회귀(regression)가 아닌, 환경 미충족으로 인한 알려진 실패**를 기록한다.
> 측정/검증 기준일: **2026-06-29**

---

## 0. 목적 (Scope & Intent)

이 문서는 SIASIU 테스트 트리(`SIASIU/app/tests/`)에서 관찰되는 **4건의 환경 의존적(environment-dependent) 실패**를 정직하게 기록한다.

핵심 주장 (the load-bearing claim):

- 이 4건은 **Phase 1–6 additive 작업의 회귀가 아니다.** 동일한 실패가 **baseline에서도 그대로 존재**한다 (same failures present at baseline).
- 4건 모두 **코드 결함이 아니라 실행 환경(런타임 의존성·외부 디렉터리·DB 적재) 미충족**에서 비롯된다.
- 본 release train은 **CONTROL workspace**(`/home/leo/Project/foundation-control`)에서 수행되며, 제품 레포에 **쓰지 않는다**(never writes into the product repos). 따라서 이 환경 실패들을 "고치기 위해" 제품 레포를 변경하지 않는다 — remediation은 **본 문서의 범위 밖(out-of-scope)**이다.

또한, 기존 Cosmile readiness adapter(commit `1ce099e` · 164/164)는 **재사용·확장(extend & reuse)될 뿐, 교체·삭제되지 않는다.** 아래 환경 실패들은 그 adapter나 Phase 1–6 additive 코어와 무관하다.

---

## 1. 요약 표 (At-a-Glance)

| # | Test | 위치 (under `SIASIU/app/tests/`) | Root cause (환경) | Verified evidence | Regression? |
|---|------|----------------------------------|-------------------|-------------------|-------------|
| 1 | `test_ssbrain` | `SIASIU/app/tests/test_ssbrain*` | numpy 미설치 | `import numpy` 실패 (verified) | **NO** — baseline에서도 동일 |
| 2 | `test_judge_real` | `SIASIU/app/tests/test_judge_real*` | `/home/leo/Project/foundation-vault` 디렉터리 부재 | vault dir 없음 (verified: no such dir) | **NO** — baseline에서도 동일 |
| 3 | `test_ingredient_load` | `SIASIU/app/tests/test_ingredient_load*` | ingredient DB 미적재 | ingredient DB not loaded | **NO** — baseline에서도 동일 |
| 4 | `test_products_e2e` | `SIASIU/app/tests/test_products_e2e*` | product DB 미적재 | product DB not loaded | **NO** — baseline에서도 동일 |

> 4건 모두 **ENVIRONMENTAL**로 분류된다. 코드 변경(Phase 1–6 additive)으로 발생/변화한 것이 아니라, **호스트 환경의 전제 조건이 충족되지 않아** 발생한다.

---

## 2. 상세 (Per-failure detail)

### 2.1 `test_ssbrain` — numpy not installed

- **File location:** `SIASIU/app/tests/test_ssbrain*` (under `SIASIU/app/tests/`)
- **Root cause:** 런타임 의존성 **numpy 미설치**. 테스트가 import 단계에서 numpy를 요구하는데, 현재 환경 인터프리터에 numpy 패키지가 존재하지 않는다.
- **Evidence (verified ENVIRONMENTAL):** `import numpy` 가 실패함 (verified: `import numpy` fails). 이는 코드 로직 실패가 아니라 **모듈 부재로 인한 import 실패**다 — 환경 신호(environmental signal)로 결정적이다.
- **NOT a regression:** 이 실패는 Phase 1–6 additive 작업의 결과가 **아니다**. **baseline에서도 동일한 실패가 존재**한다 (same failure at baseline). additive 코어 코드는 numpy를 새로 요구하도록 바꾸지 않았다.

### 2.2 `test_judge_real` — `/home/leo/Project/foundation-vault` directory absent

- **File location:** `SIASIU/app/tests/test_judge_real*` (under `SIASIU/app/tests/`)
- **Root cause:** 외부 디렉터리 **`/home/leo/Project/foundation-vault` 부재**. 테스트가 해당 vault 디렉터리를 전제로 하는데, 현재 환경에는 그 경로가 존재하지 않는다.
- **Evidence (verified ENVIRONMENTAL):** 해당 경로가 없음 (verified: no such dir — `/home/leo/Project/foundation-vault` absent). 파일시스템 전제 조건 미충족이며, 코드 결함이 아니다.
- **NOT a regression:** Phase 1–6 additive 작업으로 발생한 것이 **아니며**, **baseline에서도 동일하게 실패**한다 (same failure at baseline). 본 release train은 어떤 Vault에도 쓰지 않으며(Vault write는 CLOSED·DISABLED), vault 디렉터리를 생성하지도 않는다.

### 2.3 `test_ingredient_load` — ingredient DB not loaded

- **File location:** `SIASIU/app/tests/test_ingredient_load*` (under `SIASIU/app/tests/`)
- **Root cause:** **ingredient DB 미적재(ingredient DB not loaded)**. 테스트가 적재된 ingredient 데이터셋을 전제로 하나, 현재 환경에는 해당 DB가 로드되어 있지 않다.
- **Evidence (verified ENVIRONMENTAL):** ingredient DB not loaded. 데이터 적재 전제 조건 미충족이며 코드 경로 회귀가 아니다.
- **NOT a regression:** Phase 1–6 additive 작업과 무관하며, **baseline에서도 동일 실패**다 (same failure at baseline).

### 2.4 `test_products_e2e` — product DB not loaded

- **File location:** `SIASIU/app/tests/test_products_e2e*` (under `SIASIU/app/tests/`)
- **Root cause:** **product DB 미적재(product DB not loaded)**. e2e 시나리오가 적재된 product 데이터를 전제로 하나, 현재 환경에는 해당 DB가 로드되어 있지 않다.
- **Evidence (verified ENVIRONMENTAL):** product DB not loaded. 데이터 적재 전제 조건 미충족이다.
- **NOT a regression:** Phase 1–6 additive 작업의 회귀가 **아니며**, **baseline에서도 동일 실패**다 (same failure at baseline).

---

## 3. 왜 회귀가 아닌가 (Why these are NOT Phase 1–6 regressions)

Phase 1–6 additive 작업은 **순수 additive**(extend & reuse, never replace/delete)로 수행되었고, 오늘(2026-06-29) 재실행으로 다음이 **PASS**임이 검증되었다 — 이 4건과는 **별개의 통과 신호**다:

- Foundation Core one-command runner = **89/89 · 651 assertions**, `all_pass=true`, `testability_gate_ok=true`.
  - **DELTA vs plan baseline:** plan은 88/88 · 646 이었으나, **오늘 검증값은 89/89 · 651** (additive growth, all_pass). 정직 기록 차원에서 델타를 명시한다.
  - Layers: lmr 35/35, brain 16/16, trust_core 16/16, migration 4/4, api 4/4, siasiu 7/7, cosmile 7/7.
- Cosmile readiness integration eval = **164/164** (commit `1ce099e` 의 기존 adapter, 재사용·확장만; 본 train이 수정하지 않음 → 164/164 preserved).
- SIASIU Foundation integration eval = **39/39** (`answer_unchanged=true`).
- SIASIU existing workflow full regression = **119/119** (`behavior_changed 0`, 16 scenarios).
- `answer.py` baseline fingerprint = `d7f579443f8a110a` (불변 — shadow only).

위 통과 신호들은 additive 코어가 **건강함**을 보인다. 반면 §2의 4건은 **코드가 아니라 환경 전제**(numpy 패키지, vault 디렉터리, ingredient/product DB 적재)에 묶여 있고, **그 전제는 baseline에서도 동일하게 미충족**이었다. 따라서 **before == after**: additive 변경이 새 실패를 만들지 않았다 (no new failures introduced).

---

## 4. Remediation note (OUT OF SCOPE here)

아래는 **참고용 복구 방향**일 뿐, **본 문서·본 release train의 범위 밖**이다. 본 train은 CONTROL workspace에서 동작하며 **제품 레포에 쓰지 않으므로**, 여기서 환경을 변경하거나 데이터를 적재하지 않는다. 실제 적용은 각자의 환경 셋업/별도 트레인에서 다룬다.

| Failure | Out-of-scope remediation direction |
|---------|------------------------------------|
| `test_ssbrain` | 실행 환경에 **numpy 설치** (예: 가상환경에 numpy 추가) |
| `test_judge_real` | **`/home/leo/Project/foundation-vault` 디렉터리 제공/구성** (해당 환경에서) |
| `test_ingredient_load` | **ingredient DB 적재(load)** |
| `test_products_e2e` | **product DB 적재(load)** |

> 주의: 위 remediation을 수행하더라도, 그것이 곧 어떤 **live/write 활성화도 아니다.** 본 문서는 기록일 뿐이며, 어떤 환경 변경도 지시하지 않는다.

---

## 5. 안전 상태 — 여전히 DISABLED / CLOSED

본 환경 실패 기록은 안전 경계를 변경하지 않는다. 다음은 **모두 비활성(DISABLED)** 이며, 각각 **별도의 게이트된 release train**(human approval 필요)을 요구한다 — 본 train에서 enabled/done이 아니다:

- production live — **DISABLED**
- public API live — **DISABLED**
- web live — **DISABLED**
- real customer memory live migration — **DISABLED**
- checkout / order / customer DB write — **DISABLED**
- canonical write — **DISABLED**
- learned / canonical real promotion — **DISABLED**
- Vault write — **DISABLED** (그리고 `test_judge_real`의 vault 디렉터리도 생성하지 않음)
- real user AI consultation — **DISABLED**
- Cosmile live integration — **DISABLED**

상태 플래그: `applied_to_real_user=false`, `write=false`, `write_live_promotion=0`, `force_push=0`.

---

## 6. 결론 (Bottom line)

- 4건의 실패는 **환경 의존(ENVIRONMENTAL)** 이며, **검증됨**: `import numpy` 실패 · vault 디렉터리 부재 · ingredient DB 미적재 · product DB 미적재.
- 4건 모두 **Phase 1–6 additive 작업의 회귀가 아니다** — **baseline에서도 동일하게 실패**한다.
- additive 코어 통과 신호(89/89·651 — plan 88/88·646 대비 additive growth, all_pass; 기존 Cosmile readiness 164/164 보존; 39/39; 119/119)는 정상이다.
- Remediation(numpy 설치 / vault 제공 / DB 적재)은 **참고용이며 본 문서의 범위 밖**이다.
- 모든 live/write 경로는 **여전히 DISABLED/CLOSED**다.
