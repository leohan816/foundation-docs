# COSMILE AI COMMERCE DECISION LOOP v0.1 — ROLLBACK PLAN — 2026-06-29

> 작성일(Date): 2026-06-29 · 작성 대상(Scope): `foundation-control` cross-project release train (Phase 7)
> 문서 성격(Type): Rollback / Safety Reversibility Plan — 되돌리기·안전 가역성 계획
> 워크스페이스(Workspace): `/home/leo/Project/foundation-control` (CONTROL workspace, **NOT** a product repo)

---

## 0. 핵심 요약 (Executive Summary)

Cosmile AI Commerce Decision Loop v0.1은 **오직 `foundation-control` 컨트롤 워크스페이스 안에만** 존재한다.
제품 저장소(FOUNDATION / SIASIU / Cosmile)는 **한 줄도 수정되지 않으며**, 컨트롤 워크스페이스는 기존
readiness 어댑터와 Foundation Core를 `repos/siasiu` 심링크의 **realpath를 통해 read-only로 import**할 뿐이다.

이 구조의 직접적 귀결: **롤백이 사실상 무비용(near-zero cost)이고 완전 가역적(fully reversible)**이다.

- 롤백 = (a) feature flag를 끄거나(기본값이 이미 OFF) 그리고/또는 (b) `cosmile_loop/` 패키지를 삭제.
- 기존 readiness `164/164`와 SIASIU `39/39` · `119/119` 베이스라인은 **건드린 적이 없으므로 롤백 대상이 아니다(untouched, no rollback needed)**.
- 어떠한 실제 apply도 발생하지 않았다: `applied_to_real_user=false`, `write_performed=false`, `write_live_promotion=0`, `force_push=0`.

| 항목 (Item) | 상태 (State) | 롤백 필요? (Rollback?) |
|---|---|---|
| `cosmile_loop/` (v0.1 신규 레이어) | foundation-control 안에만 존재, flag 기본 OFF | flag OFF 또는 디렉터리 삭제로 즉시 제거 |
| 기존 Cosmile readiness adapter (`1ce099e`) | 재사용/확장만, 무수정 → 164/164 보존 | **불필요 (untouched)** |
| SIASIU Foundation Integration | 무수정 → 39/39 보존 | **불필요 (untouched)** |
| SIASIU Existing Workflow Regression | 무수정 → 119/119 보존 | **불필요 (untouched)** |
| Foundation Core one-command runner | 무수정 → 89/89 · 651 (오늘 검증) | **불필요 (untouched)** |
| 제품 저장소 작업 트리 (FOUNDATION/SIASIU) | clean (0 uncommitted) | **불필요 (nothing to revert)** |

---

## 1. 롤백이 안전한 이유 — 격리 모델 (Why Rollback Is Safe — The Isolation Model)

v0.1 loop는 `foundation-control/cosmile_loop/` 네임스페이스(11 modules)에만 산다. 제품 코드에 침투하지 않는 이유:

1. **제품 저장소를 복사·병합하지 않는다.** 컨트롤 워크스페이스는 `repos/foundation`, `repos/siasiu`,
   `repos/cosmile` **심링크**로만 제품 저장소를 참조한다(write 0).
2. **`foundation` 패키지를 만들지 않는다.** 만약 컨트롤 측에 `foundation` 패키지를 생성하면 SIASIU의
   `foundation.cosmile` 네임스페이스를 가려버리므로(shadowing), 신규 레이어는 의도적으로 `cosmile_loop/`
   네임스페이스에만 존재한다(`_bootstrap.py` 주석 참조).
3. **기존 어댑터는 read-only import.** `cosmile_recommendation_adapter`는 readiness REC를, `cosmile_do_not_buy_adapter`는
   readiness PUR을, `cosmile_trust_trace_adapter`는 readiness trace를 **wrapping**할 뿐 수정하지 않는다.
   8-adapter readiness suite는 이번 release train에서 변경되지 않았고 `164/164`가 그대로 보존된다.

따라서 롤백은 "제품 저장소에서 무언가를 되돌린다"가 **아니라**, "컨트롤 워크스페이스에서 새 레이어의 활성 상태를
끄거나 새 레이어 자체를 제거한다"로 끝난다.

신규 자산 인벤토리 (롤백 시 제거/비활성 대상):

- 패키지 `cosmile_loop/` (11 modules): `__init__`, `_bootstrap`, `cosmile_feature_flags`, `cosmile_decision_schema`,
  `cosmile_customer_consultation_adapter`, `cosmile_product_judgment_adapter`, `cosmile_recommendation_adapter`,
  `cosmile_do_not_buy_adapter`, `cosmile_memory_reuse_adapter`, `cosmile_trust_trace_adapter`, `cosmile_ai_commerce_loop`.
- 테스트 `tests/` (10 test files + `_harness.py`).
- 스크립트 `scripts/`: `cosmile_ai_commerce_loop_eval.py`, `cross_project_regression_runner.py`.

이들 전부는 `foundation-control` 안의 **신규** 자산이다. 제거해도 제품 저장소·기존 베이스라인에 영향이 없다.

---

## 2. 1차 방어선 — Feature-Flag Kill Switch (기본 OFF + HARD_OFF)

롤백의 **가장 빠르고 비파괴적인** 형태는 코드 삭제가 아니라 **flag를 끄는 것**이다. 그리고 v0.1은 설계상
**이미 꺼져 있다(default OFF)**.

### 2.1 v0.1 loop flags — 전부 기본 OFF

`cosmile_loop/cosmile_feature_flags.py`의 `FLAGS`는 5개 모두 기본값 `False`:

| Flag | Default | 역할 |
|---|---|---|
| `cosmile_ai_commerce_loop_enabled` | `False` | OFF면 기존 Cosmile/SIASIU 동작으로 fallback |
| `cosmile_customer_consultation_shadow` | `False` | 상담 shadow |
| `cosmile_product_judgment_shadow` | `False` | 제품 판단 shadow |
| `cosmile_memory_reuse_shadow` | `False` | 메모리 재사용 shadow |
| `cosmile_trust_trace_shadow` | `False` | trust trace shadow |

- `all_default_off()`는 위 5개가 전부 `False`임을 검증한다.
- **활성화 조건이 이중 게이트(double gate)**: `loop_active()`는 v0.1 `cosmile_ai_commerce_loop_enabled`
  **그리고** 기존 readiness `cosmile_integration_enabled`가 **둘 다 ON**일 때만 `True`를 반환한다.
  둘 중 하나라도 OFF면 loop는 동작하지 않고 fallback 경로로 흐른다.
- 테스트는 영구 ON을 하지 않는다. `shadow_enabled()` 컨텍스트로 **일시 ON** 후 `finally`에서 이전 값으로
  **반드시 복원**한다(loop flag + readiness flag 모두 복원). 즉 테스트가 끝나면 flag 상태는 OFF로 되돌아온다.

> Kill switch 동작: 운영상 어떤 이유로 v0.1을 즉시 무력화하려면, `cosmile_ai_commerce_loop_enabled`(또는 이중
> 게이트의 readiness 측 `cosmile_integration_enabled`)를 OFF로 두기만 하면 된다. 기본값이 OFF이므로 **추가 조치
> 없이도 현재 시스템은 이미 비활성 상태**다.

### 2.2 HARD_OFF — 코드로 강제 OFF (flag로도 켤 수 없음)

`get(name)`은 `name`이 `HARD_OFF`에 있으면 **항상 `False`**를 반환한다. 즉 이 항목들은 dict를 직접 바꿔도
`get()` 경로에서 강제로 꺼진다. `hard_off_enforced()`가 전부 `False`임을 검증한다.

v0.1의 `HARD_OFF`는 기존 readiness `HARD_OFF`를 그대로 상속/확장하며, 다음을 포함한다:

`checkout_live`, `order_live`, `customer_db_write`, `product_canonical_write`, `customer_memory_live_migration`,
`learned_promotion`, `api_live`, `production_live`, `web_live`, `real_customer_traffic`, `vault_write`,
`raw_llm_draft_storage`, `checkout_order_customer_db_write`.

> 의미: 위 항목들은 **flag 토글로 켤 수 있는 대상이 아니다.** 따라서 "실수로 켰다"가 발생할 수 없고, 롤백
> 관점에서도 "끌 것이 없다(이미 코드 강제 OFF)". 이들은 각각 **별도의 게이트된 release train**에서만 다룰 수 있다.

---

## 3. 2차 방어선 — `cosmile_loop` 제거 (Optional Hard Removal)

flag OFF만으로 충분하지만, 신규 레이어를 **물리적으로 완전히 제거**하고 싶다면 컨트롤 워크스페이스 안의 신규
디렉터리만 지우면 된다. 제품 저장소는 영향받지 않는다.

제거 대상(전부 foundation-control 내부 신규 자산):

- `cosmile_loop/` (11 modules)
- `tests/` (10 test files + `_harness.py`)
- `scripts/cosmile_ai_commerce_loop_eval.py`, `scripts/cross_project_regression_runner.py`

제거 후에도 다음은 그대로 유효하다(별도 검증 권장, §5):

- 기존 Cosmile readiness adapter `164/164` (`1ce099e`) — 무수정 보존
- SIASIU Foundation Integration `39/39`, SIASIU Existing Workflow Regression `119/119` — 무수정 보존
- Foundation Core one-command runner `89/89` · `651 assertions` (오늘 2026-06-29 검증)

> 주의: `cosmile_loop` 제거는 **제품 저장소가 아니라 컨트롤 워크스페이스**에서만 일어난다. 제품 저장소를 향한
> revert/force push는 **이 롤백에 일절 포함되지 않는다**(§6, §7).

---

## 4. 건드리지 않은 것 — 롤백 대상이 아닌 베이스라인 (Untouched — Out of Rollback Scope)

아래 베이스라인은 이번 release train에서 **수정되지 않았으므로 롤백할 것이 없다.** 오늘(2026-06-29) 재실행하여
값까지 확인했다.

| 베이스라인 (Baseline) | 결과 (Result, 2026-06-29) | 비고 |
|---|---|---|
| Cosmile readiness integration eval | **164 / 164** pass, fail 0 | `1ce099e` 어댑터 무수정. by_category: fallback 12 / recommendation 80 / purchase 20 / do_not_buy 8 / safety 36 / b2b_inquiry 8. plan과 정확히 일치 |
| SIASIU Foundation Integration eval | **39 / 39** pass, fail 0 | `answer_unchanged=true`, shadow/fallback coverage 1.0 |
| SIASIU Existing Workflow Regression | **119 / 119** pass, fail 0 | scenarios_covered 16, behavior_changed 0, false_allow 0 |
| Foundation Core one-command runner | **89 / 89** pass · **651** assertions, `all_pass=true` | layers: lmr 35 / brain 16 / trust_core 16 / migration 4 / api 4 / siasiu 7 / cosmile 7 |
| `answer.py` baseline fingerprint | `d7f579443f8a110a` (불변, shadow) | 두 eval 모두 `fp0` 일치 PASS |

### 4.1 정직한 델타 기록 (Honest Delta — plan vs today)

> **one-command runner DELTA**: 원 계획 베이스라인은 `88/88 · 646`이었으나, **오늘 2026-06-29 검증값은
> `89/89 · 651`**이다. 이는 stale 숫자를 그대로 옮긴 것이 아니라 **가산적 성장(additive growth)**이며
> `all_pass=true`, `testability_gate_ok=true`이다. 롤백 시에도 이 runner는 변경 대상이 아니다.

> Cosmile readiness `164/164`와 SIASIU `39/39` · `119/119`는 plan 베이스라인과 **정확히 일치**(델타 없음).

### 4.2 환경 의존 실패 4건 — 회귀 아님 (Environmental, NOT regressions)

다음 4건은 v0.1 작업과 무관한 **환경 의존 실패**로, 베이스라인에서도 동일하게 존재했다. 롤백으로 영향받지 않고,
롤백이 이들을 만들지도 않는다: `test_ssbrain`(numpy 미설치), `test_judge_real`(`/home/leo/Project/foundation-vault`
부재), `test_ingredient_load`(ingredient DB 미로드), `test_products_e2e`(product DB 미로드).

---

## 5. 제품 저장소 청정성 검증 절차 (Verifying Product Repos Remain Clean)

롤백 전·후 모두, 제품 저장소가 **오염되지 않았음**을 다음으로 확인한다. **realpath(canonical) 경로**로
`git status`를 돌려 심링크 경유 부작용을 피한다(§7).

```bash
# FOUNDATION — 기대값: 출력 없음(clean), 0 uncommitted
git -C "$(realpath repos/foundation)" status --porcelain
# == git -C /home/leo/Project/FOUNDATION status --porcelain

# SIASIU — 기대값: 출력 없음(clean), 0 uncommitted
git -C "$(realpath repos/siasiu)" status --porcelain
# == git -C /home/leo/Project/SIASIU status --porcelain

# Cosmile — 기대값: ' M app/next.config.ts' 한 줄만 (PRE-EXISTING, 우리 작업 아님)
git -C "$(realpath repos/cosmile)" status --porcelain
# == git -C /home/leo/Project/Cosmile status --porcelain
```

오늘(2026-06-29) 실제 확인된 상태:

| Repo | branch | HEAD | Working tree |
|---|---|---|---|
| FOUNDATION | main | `14263f315aff7630cc1d0e4cfb612694aa7170f5` | **clean (0 uncommitted)** |
| SIASIU | main | `be88fb51390afb926d3e2d0a366ea12aec199886` | **clean (0 uncommitted)** |
| Cosmile | main | `4dcf42fc8af388a15f8420a4123dc4ffc6e0a818` | `M app/next.config.ts` 1건 — **PRE-EXISTING**, 이 release train이 만들지 않았고 손대지 않음 |

> 정직한 기록(Honest record): Cosmile의 `app/next.config.ts` 수정은 이번 작업 **이전부터 존재**하던 것으로,
> 그대로 둔 상태다. 롤백이 이 파일을 생성·되돌리지 않는다.

판정 기준(Pass criteria):
- FOUNDATION / SIASIU `git status --porcelain` 출력이 **비어 있어야** clean.
- Cosmile은 `M app/next.config.ts` **단 한 줄만** 나와야 정상(그 외 추가 변경이 보이면 조사 대상).

---

## 6. realpath 하드닝 — SIASIU wrapper 재기록 사고 방지 (How realpath Prevents Accidental SIASIU Wrapper Rewrites)

### 6.1 한 번 있었던 사고와 근본 원인 (The incident, root-caused)

초기 regression 실행 중, **SIASIU `foundation/`의 auto-generated re-export wrapper 48개가 우연히 재생성**되는
일이 있었다. 근본 원인: SIASIU의 namespace builder가 wrapper에 박아 넣는 절대경로를 **`abspath(__file__)`**로
계산하는데, 이는 **심링크를 해석하지 않는다(symlink-unresolved)**. 따라서 `repos/siasiu` 심링크 경로를 통해
builder에 도달하면, canonical 경로가 아니라 **심링크 경로가 wrapper에 박혀** 작업 트리가 더럽혀진다.

조치: 근본 원인 규명 → canonical committed 상태로 **revert** → **realpath로 SIASIU 도구를 구동하도록 하드닝**.
최종 상태: **SIASIU clean**.

### 6.2 영구 방지책 — `_bootstrap.py`의 realpath 정규화

`cosmile_loop/_bootstrap.py`는 **심링크를 realpath로 정규화**하여 항상 canonical 경로로 import한다:

```python
SIASIU     = _os.path.realpath(_os.path.join(REPOS, "siasiu"))      # -> /home/leo/Project/SIASIU
FOUNDATION = _os.path.realpath(_os.path.join(REPOS, "foundation"))  # -> /home/leo/Project/FOUNDATION
COSMILE    = _os.path.realpath(_os.path.join(REPOS, "cosmile"))     # -> /home/leo/Project/Cosmile
```

핵심 효과:

- import는 **canonical 경로**(`/home/leo/Project/SIASIU`)에서 일어나므로, builder가 `abspath(__file__)`로 경로를
  박더라도 **심링크 경로(`repos/siasiu`)가 들어가지 않는다** → wrapper 재기록으로 인한 작업 트리 오염이 방지된다.
- `ensure_paths()`는 SIASIU repo root와 `SIASIU/app`을 `sys.path` 앞에 **1회만(idempotent)** 삽입한다.
- 검증·롤백 명령도 §5처럼 **realpath로 `git status`를 구동**하면 동일 보호를 받는다.
- 결과적으로 cross-project regression은 `cosmile_loop` 레이어를 돌리면서도 **FOUNDATION clean / SIASIU clean**을 유지한다.

> 요지: realpath 하드닝은 "컨트롤 워크스페이스가 SIASIU를 참조해도 SIASIU 작업 트리를 절대 바꾸지 않는다"를
> 코드 레벨에서 보장한다. 이것이 롤백을 더 단순하게 만든다 — 애초에 제품 저장소에 되돌릴 변경이 생기지 않는다.

---

## 7. 실제 apply 전 인간 승인 필수 (Human-Approval Requirement Before Any Real Apply)

v0.1 loop는 **그림자(shadow)·읽기 전용(read-only)** 레이어이며, 실제 사용자/쓰기로의 승격은 **인간 승인 게이트**를
반드시 통과해야 한다.

- Foundation Core Trust Core 결정에는 `human_approval_required_for_real_apply=True`와 `rollback_available=True`가
  포함되고, 16 gate 중 **`rollback_human_approval_gate`**가 이를 강제한다.
- v0.1 decision schema는 **항상** `applied_to_real_user=False`, `write_performed=False`를 설정하며, 아래 라이브/쓰기
  플래그를 **전부 False**로 고정한다:
  `live_write` · `checkout_changed` · `order_changed` · `customer_db_write` · `product_canonical_write` ·
  `vault_write` · `customer_memory_live_migration` · `canonical_write` · `learned_promotion`.
- 오늘 e2e eval(112 scenarios, 112 pass, all_pass)에서 `no_live_write_violations=0`으로 확인됨.

> 운영 규칙(Operating rule): 어떤 실제 apply도 **사전 인간 승인 없이는 불가**하다. 승인 게이트가 살아 있으므로,
> v0.1을 "켜는" 것조차 fallback/shadow 경로 이상으로 자동 승격되지 않는다. 롤백 시에도 이 게이트는 그대로 유지된다.

---

## 8. 금지·CLOSED 항목 — 롤백과 무관하게 여전히 DISABLED (Still Forbidden / CLOSED)

아래 항목들은 **별도의 게이트된 release train**에 속하며, 이번 작업에서 **활성화되지 않았고 여전히 DISABLED**다.
롤백은 이들을 켜지도, 끄지도 하지 않는다(이미 OFF/금지).

| 항목 (Item) | 상태 (Status) |
|---|---|
| production live | **DISABLED (CLOSED)** |
| public API live | **DISABLED (CLOSED)** |
| web live | **DISABLED (CLOSED)** |
| real customer traffic / 실사용자 AI 상담 | **DISABLED (CLOSED)** |
| real checkout / order / customer DB write | **DISABLED (CLOSED, HARD_OFF)** |
| canonical write | **DISABLED (CLOSED)** |
| learned / canonical real promotion | **DISABLED (CLOSED, HARD_OFF)** |
| Vault write | **DISABLED (CLOSED, HARD_OFF)** |
| real customer memory live migration | **DISABLED (CLOSED, HARD_OFF)** |
| Cosmile live 통합 | **DISABLED (CLOSED)** |

상태 플래그(현재): `applied_to_real_user=false`, `write_performed=false`, `write_live_promotion=0`,
`force_push=0`, 미커밋(control-relevant)=0.

---

## 9. No Force Push — 강제 푸시 금지 (Hard Constraint)

- 이 롤백 절차는 **어떤 force push도 포함하지 않는다.** `force_push=0` (검증됨).
- 롤백은 (a) flag OFF(기본값) 그리고/또는 (b) 컨트롤 워크스페이스 내 `cosmile_loop` 제거로 한정된다.
- 제품 저장소(FOUNDATION/SIASIU/Cosmile)를 향한 **history 재작성·강제 푸시·기존 어댑터 삭제는 금지**다.
- 부연: 컨트롤 워크스페이스는 bootstrap 시점에 git repo가 아니었고(`git init`은 Phase 6), 제품 저장소 코드를
  병합하지 않으므로 제품 측에 push할 변경 자체가 존재하지 않는다.

---

## 10. 롤백 절차 요약 (Rollback Runbook — Step by Step)

| 단계 | 동작 (Action) | 기대 결과 (Expected) |
|---|---|---|
| 1 | 현재 flag 상태 확인 — `cosmile_loop.cosmile_feature_flags.all_default_off()` / `hard_off_enforced()` | 둘 다 `True` (이미 OFF) |
| 2 | (선택) 즉시 비활성 — `cosmile_ai_commerce_loop_enabled` 및/또는 readiness `cosmile_integration_enabled` OFF 확인 | `loop_active()` == `False` |
| 3 | (선택, hard removal) `cosmile_loop/`, `tests/`, `scripts/`의 신규 자산 제거 | 컨트롤 워크스페이스에서만 제거, 제품 저장소 무영향 |
| 4 | 제품 저장소 청정성 검증 (§5, realpath로 `git status --porcelain`) | FOUNDATION clean · SIASIU clean · Cosmile = `M app/next.config.ts` 1건만 |
| 5 | 베이스라인 무손상 확인 (선택 재실행) | readiness 164/164 · SIASIU 39/39 · 119/119 · runner 89/89·651 (all_pass) |
| 6 | force push 금지 재확인 | `force_push=0`, 제품 저장소 history 무변경 |

**최종 안전 명제(Final safety statement):** 제품 저장소가 수정되지 않으므로, 롤백은 컨트롤 워크스페이스 내부의
flag OFF(기본값) 또는 `cosmile_loop` 제거로 완결된다. 기존 readiness `164/164`와 SIASIU `39/39` · `119/119`는
무손상이라 롤백 대상이 아니다. force push 없음, 실제 apply 없음, 라이브/쓰기 승격 없음 — **fully reversible**.
