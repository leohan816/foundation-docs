# foundation-control CURRENT BASELINE — 2026-06-29

> Phase-0 인벤토리 기준선 (inventory baseline). 본 문서의 모든 수치는 **오늘(2026-06-29) 실제 스위트를
> 재실행하여 검증한 값**이며, 계획 기준선(plan baseline)과 차이가 있는 경우 DELTA를 명시한다.
> foundation-control은 **CONTROL 워크스페이스**다 — 제품 레포 코드를 병합/삭제하지 않고 symlink로 참조만 하며,
> 기존 Cosmile readiness adapter(`1ce099e`)를 **재사용·확장(extend & reuse)** 할 뿐 교체하거나 삭제하지 않는다.

---

## 0. Scope & posture (요약)

- Control workspace: `/home/leo/Project/foundation-control` — 제품 레포가 아니다 (NOT a product repo).
- 제품 레포 코드를 merge 하지 않으며, symlink로만 참조한다. 제품 레포에 **쓰지 않는다**(never writes into product repos).
- 다음 항목들은 **여전히 DISABLED / CLOSED**이며 각각 별도의 게이트된 릴리즈 트레인을 요구한다 (본 트레인에서 활성화 안 됨):
  production live, public API live, web live, real customer memory migration, checkout/order/customer DB write,
  canonical write, learned promotion, Vault write, real user AI consultation, Cosmile live integration. **모두 DISABLED.**

---

## 1. Repo symlinks + branch/commit (verified today)

Control workspace는 세 개의 symlink로 제품 레포를 참조한다. 모든 symlink 상태 OK.

| Symlink | Target |
|---|---|
| `repos/foundation` | `/home/leo/Project/FOUNDATION` |
| `repos/siasiu` | `/home/leo/Project/SIASIU` |
| `repos/cosmile` | `/home/leo/Project/Cosmile` |

오늘 검증한 각 레포의 branch / HEAD / 작업트리 상태:

| Repo | Branch | HEAD commit | Working tree | HEAD message |
|---|---|---|---|---|
| FOUNDATION | `main` | `14263f315aff7630cc1d0e4cfb612694aa7170f5` | 0 uncommitted | `feat(foundation): physical materialization of LMR + Brain Runtime + Trust Core (independent core, additive)` |
| SIASIU | `main` | `be88fb51390afb926d3e2d0a366ea12aec199886` | 0 uncommitted | `feat(siasiu): SIASIU→FOUNDATION repo physical link + materialization deliverables` |
| Cosmile | `main` | `4dcf42fc8af388a15f8420a4123dc4ffc6e0a818` | **1 pre-existing uncommitted file** | — |

**Honest note (Cosmile):** Cosmile 작업트리의 유일한 미커밋 변경은 ` M app/next.config.ts` 한 건이다. 이 변경은
**이번 릴리즈 트레인 이전부터 존재(PRE-EXISTING)** 하던 것으로, 이번 작업이 만든 것이 **아니며(NOT ours)**, 그대로
손대지 않고 두었다(left untouched). FOUNDATION·SIASIU 작업트리는 0 uncommitted (clean).

---

## 2. Phase 1–6 SIASIU commit table

아래 일곱 개의 feature 커밋은 **SIASIU history에 존재함이 검증**되었다.

| Phase / Deliverable | Commit | Message |
|---|---|---|
| Brain Runtime v1.0 | `38ec74d` | `feat(brain-runtime): v1.0 baseline PASS — Release Train CLOSED (FF1+FF2·8차원 감사 위반 0)` |
| Trust Core v1.0 | `4ecf766` | `feat(trust-core): Phase 2 — Trust Core / Safety Guard Layer v1.0 baseline PASS (8차원 감사 위반 0)` |
| Safe Additive Migration | `20eb19e` | `feat(migration): Phase 3+4 — Foundation Core Safe Additive Migration + Post-Migration Regression (PASS)` |
| Cosmile readiness adapter | `1ce099e` | `feat(cosmile): Phase 5 — Cosmile Foundation Integration Readiness PASS (mock/read-only/shadow)` |
| Foundation API/Adapter Smoke | `8fd09af` | `feat(api): Phase 4 — Foundation internal API/adapter smoke test PASS (in-process·no live·no write)` |
| SIASIU Shadow/API Integration | `27c06e9` | `feat(siasiu): Phase 5 — SIASIU Foundation Shadow/API Integration PASS (answer.py 무변경)` |
| SIASIU Workflow Regression | `171a4db` | `feat(siasiu): Phase 6 — SIASIU Existing Workflow Full Regression PASS (15 시나리오·119/119)` |

### HONEST NOTE — 커밋이 어느 레포에 사는가

- **FOUNDATION repo history는 `14263f3` (physical materialization) 단 하나만 포함**한다.
- 위 표의 feature 커밋들은 **SIASIU history**에 산다 (FOUNDATION이 아님). 특히
  `38ec74d` / `4ecf766` / `20eb19e` / `1ce099e` / `8fd09af` 는 FOUNDATION repo에서 **검증 결과 NOT FOUND**다 (verified).
- Foundation Core는 SIASIU가 **materialized / physical-link core**로 소비(consume)한다. 즉, Foundation 측에는
  물리적 머티리얼라이제이션(`14263f3`)만, feature 작업의 커밋 이력은 SIASIU 측에 기록되어 있다 — 이 비대칭은
  의도된 것이며 오류가 아니다.

---

## 3. Verified test baselines (re-run today)

> 모든 러너 리포트는 scratch로 redirect하여 제품 레포 작업트리를 깨끗하게(clean) 유지한 상태에서 실행했다.

| Suite / Runner | Result | Notes |
|---|---|---|
| **Foundation Core one-command runner** — `python3 app/tools/foundation_core_test_runner.py` (in SIASIU) | **89/89 · 651 assertions**, fail 0, `all_pass=true`, `testability_gate_ok=true` | Layers: lmr 35/35, brain 16/16, trust_core 16/16, migration 4/4, api 4/4, siasiu 7/7, cosmile 7/7 |
| **Cosmile Foundation Integration (readiness) eval** — `app/tools/foundation_cosmile_integration_eval.py` | **164/164**, fail 0 | no_live_write 0, unsafe_recommendation 0, unsafe_purchase 0, unsafe_do_not_buy 0, safety_overreach 0, do_not_buy_reason_coverage 1.0, fallback_works=true. by_category: fallback 12 / recommendation 80 / purchase 20 / do_not_buy 8 / safety 36 / b2b_inquiry 8 |
| **SIASIU Foundation Integration eval** — `app/tools/foundation_siasiu_integration_eval.py` | **39/39**, fail 0 | shadow_trace_coverage 1.0, fallback_coverage 1.0, `answer_unchanged=true`. by_category: fallback 12 / shadow_integration 24 / answer_unchanged 2 / healthcheck 1 |
| **SIASIU Existing Workflow Full Regression** — `app/tools/foundation_siasiu_workflow_regression_eval.py` | **119/119**, fail 0 | false_allow 0, high_risk_false_allow 0, internal_disclosure 0, raw_trace_leak 0, behavior_changed 0, shadow_trace_coverage 1.0, fallback_coverage 1.0, scenarios_covered 16 |
| **answer.py baseline fingerprint** | `d7f579443f8a110a` | 통합·워크플로 eval 모두 `answer_py_fingerprint()==fp0=="d7f579443f8a110a"` 를 assert 하고 PASS. answer.py 동작 불변(shadow) |
| **LMR v1.0** | **514/514 PASS** (CLOSED) | documented layer baseline |
| **Brain Runtime v1.0** | **1124/1124** | documented layer baseline |
| **Trust Core v1.0** | **447/447** | documented layer baseline |
| **Foundation Safe Additive Migration** | **71/71** | documented layer baseline |
| **Foundation internal API/Adapter Smoke** | **25 assertions** | documented layer baseline |
| **FOUNDATION repo standalone runner** — `foundation/tools/foundation_repo_test_runner.py` | **3/3 · 23 assertions** | per `FOUNDATION/foundation/README_MATERIALIZATION.md`. FOUNDATION repo `available=true` |
| **SIASIU→FOUNDATION repo physical link regression** | **PASS** | SIASIU shadow call `source = foundation_repo` |

### DELTA vs plan baseline (정직 기록)

- **Foundation Core one-command runner:** plan baseline는 **88/88 · 646** 이었으나, **오늘 검증 = 89/89 · 651**.
  → **additive growth**(추가 성장), `all_pass` 유지. 이 차이는 회귀가 아니라 가산적 증가이며, stale 수치를 현재값처럼
  옮겨 적지 않고 DELTA를 명시한다.
- **Cosmile readiness eval:** 164/164 — plan과 **정확히 일치(MATCHES)**.
- **SIASIU integration / workflow:** 39/39, 119/119 — confirmed.

### 참고: 환경 의존 실패 4건 (회귀 아님)

다음 4건은 Phase 1–6 가산 작업의 회귀가 아니라 **환경 의존(ENVIRONMENTAL)** 으로 검증되었고, baseline에서도 동일하게
존재한다: `test_ssbrain` (numpy 미설치), `test_judge_real` (`/home/leo/Project/foundation-vault` 디렉터리 부재),
`test_ingredient_load` (ingredient DB 미로드), `test_products_e2e` (product DB 미로드).

---

## 4. Cosmile readiness adapter — REUSED & EXTENDED, never replaced

- 기존 Cosmile readiness adapter(commit **`1ce099e`**, **164/164**)는 이번 트레인에서 **수정되지 않았다**. Control
  워크스페이스는 이를 read-only로 import 하며 164/164를 그대로 보존한다.
- Canonical materialized location: `FOUNDATION/foundation/cosmile/` (8 files). Runnable copy: `SIASIU/foundation/cosmile/`.
- 본 워크스페이스는 제품 레포를 **교체/삭제하지 않고(never replaces/deletes)** 재사용·확장한다.

---

## 5. Safety status (Phase-0 baseline)

```
applied_to_real_user = false
write                = false
write_live_promotion = 0
force_push           = 0
```

추가로, 아래 항목은 본 트레인에서 **활성화되지 않았으며 여전히 DISABLED / CLOSED**다 (각각 별도의 사람-승인 릴리즈
트레인 필요): production live · public API live · web live · real customer memory migration · checkout/order/customer DB
write · canonical write · learned promotion · Vault write · real user AI consultation · Cosmile live integration.

미커밋(control-relevant) = 0. FOUNDATION·SIASIU 작업트리 clean. Cosmile의 미커밋 1건(`app/next.config.ts`)은
pre-existing이며 이번 작업 소관이 아니다.
