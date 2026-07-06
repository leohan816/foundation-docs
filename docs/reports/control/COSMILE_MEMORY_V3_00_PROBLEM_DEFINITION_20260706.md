# COSMILE MEMORY V3 — 문제 정의 (V3-00 Problem Definition)

> 작성: foundation-control · 2026-07-06 · design-only · no code · Hard Stop 무접촉

> depends_on: [FOUNDATION_MEMORY_ARCHITECTURE_V1_M6_F_OPTION_B_SUBJECT_REF_CONTRACT_20260705 · FOUNDATION_MEMORY_ARCHITECTURE_V1_M6_FABLE_FINAL_REVIEW_20260706 · COSMILE_MEMORY_V3_DATA_DICTIONARY_CANONICAL_20260706] · owns: [V3 문제 정의 · V1 close vs V3 open 분리 · Cosmile-first 근거 · goals/non-goals · Hard Stop 목록 · loop canonical 명칭] · referenced_by: [COSMILE_MEMORY_V3_00_INDEX_AND_EXECUTIVE_SUMMARY_20260706 및 전 V3 형제 문서]

이 문서는 Cosmile Memory V3(Learning Commerce Memory Loop)의 **문제 정의(Problem Definition)** 단계다.
구현·테스트·live 전환을 하지 않는다. **자동화 가능한 memory/learning 구조를 설계**하는 것이 목적이며, **auto-execution(자동 실행)은 목적이 아니다.**
후속 형제 문서(실제 파일명 — 구 5문서 번호 표기 "`_01_` loop 아키텍처·`_02_` contract·`_03_` safety·`_04_` impl plan"은 superseded): 패키지는 `COSMILE_MEMORY_V3_01_EXISTING_5_MISSION_RECONCILIATION_PLAN_20260706` ~ `COSMILE_MEMORY_V3_10_PRE_IMPLEMENTATION_REVIEW_PLAN_20260706`의 11문서 + 어휘 정본 `COSMILE_MEMORY_V3_DATA_DICTIONARY_CANONICAL_20260706`로 구성된다 — 전체 지도 = `COSMILE_MEMORY_V3_00_INDEX_AND_EXECUTIVE_SUMMARY_20260706` §5 mission map.

---

## 1. V3 문제 — 한 문장

> **Cosmile이 "상담 → 추천 → 구매 → 만족/이상반응/재구매" 결과를 안전하게 학습해, 다음 추천을 스스로 개선할 수 있는 재현 가능한 memory/learning 구조를, service-local ownership과 Foundation validate/gate 경계를 지키며 설계한다** — 단, single-signal로 장기기억을 확정하지 않고, safety를 commerce optimization보다 우선하며, prod/live/main/secret에는 손대지 않는다.

---

## 2. V1이 CLOSE한 것 vs V3가 새로 OPEN하는 것 (명확히 분리)

Memory V1 상태 = **CLOSED_WITH_LIMITS** (dev/shadow/readiness 수준). V3는 V1을 **canonical 하게 상속**하되, 상속 대상과 신규 개방 대상을 아래처럼 분리한다.

### 2.1 V1이 CLOSE(고정·완결)한 것 — V3는 이를 상속하며 재정의하지 않는다

| 항목 | V1이 확정한 상태 | V3 취급 |
|---|---|---|
| subject_ref mint 정책 | **Option B canonical.** `subj_v2_ + HMAC(<SVC>_SUBJECT_SECRET,'<svc>:subject:'+ref)[:32]` — service-local mint | 그대로 상속 |
| furef mint 정책 | `furef_v2_ + HMAC(<SVC>_FUREF_SECRET,'<svc>:local_user:'+ref)[:32]` — cross-producer consistent | 그대로 상속 |
| Option A / `FOUNDATION_SUBJECT_REF_SECRET` mint | **superseded** | **상속하지 않음** (명시적 배제) |
| Foundation 역할 | validate / gate / reasoning **only**. durable customer memory DB 아님, service DB 직접 read 아님 | 그대로 상속·강화 |
| Foundation 입력 | minimized, request-scoped `memory_context`만 (raw text/PII 없음, `raw_text_stored=False`, `request_scoped`) | 그대로 상속 |
| memory + commerce data 소유 | SIASIU·Cosmile 각자 **service-local** 소유 (per-service postgres schema `siasiu`/`cosmile`, cross-schema 직접 참조 없음) | 그대로 상속 |
| Cosmile postgres 성숙도 | **schema/validate 수준** (real DB-integration 미완) | 그대로 유지·확장 대상 |
| safety 우선순위 | safety / adverse-reaction > commerce/revenue. medical assertion 금지. "계속 써도 돼?"류 safety-first | 그대로 상속·강화 |

> ★**V1 정본 provenance (P11)**: Option B 정본 = `FOUNDATION_MEMORY_ARCHITECTURE_V1_M6_F_OPTION_B_SUBJECT_REF_CONTRACT_20260705`(foundation-docs `1e24c33` 도입) · V1 판정 = `FOUNDATION_MEMORY_ARCHITECTURE_V1_M6_FABLE_FINAL_REVIEW_20260706`(**CLOSED_WITH_LIMITS** · L1/L2/COSMILE-4 이월) · M2(`COMMON_SERVICE_MEMORY_CONTRACT_V1_20260704`)의 identity 절은 Option B로 superseded.
> ★**V1 limit 이월 3종(이름 열거)** — V3는 이를 인지하고 추적한다: **L1** = M2 정본 계약의 Option A mint 공식 잔존(supersede pointer 패치 대상) · **L2** = M6-G 정의 미확정(ingress-gate vs memory-reuse gate — activation은 Hard Stop) · **COSMILE-4** = Cosmile postgres baseline에 DB-level invariant 3종 미복원(첫 `migrate deploy` 전 필수). V3 추적 위치 = **V3-08**(`COSMILE_MEMORY_V3_08_DB_INTEGRATION_INVARIANT_DESIGN_20260706`) · **V3-10**(`COSMILE_MEMORY_V3_10_PRE_IMPLEMENTATION_REVIEW_PLAN_20260706`).

### 2.2 V3가 새로 OPEN(신규 설계 대상)하는 것

| 신규 개방 항목 | 설명 | 상태 |
|---|---|---|
| **결과 학습 루프** | 구매·만족·이상반응·재구매 결과를 memory로 되먹이는 end-to-end loop 정의 (§6) | V3 신규 설계 |
| **MemoryFactCandidate → LongTermMemoryFact 승격** | evidence/confidence 축적 후에만 장기기억 승격 (single-signal 확정 금지) | V3 신규 설계 |
| **commerce event → memory 신호 매핑** | product_view / add_to_cart / checkout / order / revenue·margin / repurchase 를 memory 신호로 구조화 | V3 신규 설계 |
| **다음 추천 개선 피드백** | 축적된 LongTermMemoryFact가 다음 추천 reasoning 입력으로 재사용되는 경로 (제안·설계만) | V3 신규 설계 |
| **learning 안전 경계** | 학습이 safety caveat/adverse signal을 덮어쓰지 못하도록 하는 gate 원칙 | V3 신규 설계 |

**요지:** V1 = "누가 누구인지(identity/subject_ref) + Foundation 경계"를 CLOSE. V3 = "무엇을 학습하고, 어떻게 안전하게 승격하고, 어떻게 다음 추천에 되먹이는가"를 OPEN.

---

## 3. 왜 V3는 Cosmile-first 인가

1. **결과 신호가 commerce에 있다.** V3가 학습하려는 신호(view/cart/checkout/order/revenue·margin/repurchase/adverse)는 대부분 **Cosmile commerce 도메인**에서 발생한다. 학습 루프의 출발점이자 종착점이 Cosmile이다.
2. **SIASIU baseline 보호.** SIASIU는 현재 기준선(answer fingerprint·workflow regression)이라 behavior를 깨면 안 된다. 학습 루프 실험을 SIASIU product answer에 먼저 넣는 것은 baseline risk가 크다. Cosmile에서 먼저 구조를 검증한다.
3. **read-only/mock/shadow 친화.** Cosmile AI Commerce Decision Loop가 이미 read-only/mock/shadow 모드로 검증돼 있어(v0.1), 학습 구조를 **live/write 없이** 얹기에 적합하다.
4. **safety 우선 검증장.** "사지 마세요 / 보류 / 이상반응 우선"이 이미 Cosmile decision output 계약에 존재 → learning이 safety를 덮지 않는지 검증하기 좋다.
5. **역할 경계 명확.** Cosmile = commerce shell(소비자), Foundation = 판단(validate/gate). Cosmile-first는 이 경계를 흐리지 않는다.

> 주의: Cosmile-first는 **SIASIU를 배제**한다는 뜻이 아니다. Dual-Vertical Test Policy에 따라 loop가 consultation/safety/recommendation/memory reuse를 건드리면 SIASIU baseline regression도 함께 확인한다. **★Leo 결정 필요:** V3의 SIASIU 연동 범위를 "read-only 참조만"으로 둘지, 후속 별도 release train으로 미룰지.

---

## 4. V3 목표(Goals)와 비목표(Non-Goals) — 명시적

### 4.1 목표 (Goals)

- G1. commerce 결과 신호를 구조화된 **MemoryFactCandidate**로 포착하는 **contract/schema**를 설계한다.
- G2. candidate → **evidence/confidence 축적** → **LongTermMemoryFact 승격** 기준(임계·다중신호·만료·철회)을 정의한다.
- G3. 승격된 memory가 **다음 추천 reasoning**에 재사용되는 경로를 설계한다(제안 수준, 실행 아님).
- G4. 학습 전 구간에서 **safety-first**를 보장하는 gate 원칙(adverse/medical/consent 우선)을 정의한다.
- G5. service-local ownership + Foundation validate/gate-only 경계를 **깨지 않는** 데이터 흐름을 정의한다(minimized request-scoped memory_context만 Foundation에 전달).
- G6. 전 구간이 **재현 가능(reproducible)** 하고 **감사 가능(trace/reason code)** 하도록 설계한다.
- G7. 결과물은 **자동화 가능한 구조** + reviewable implementation plan까지. (구현·live 아님.)

### 4.2 비목표 (Non-Goals) — 이번 단계에서 하지 않는다

- N1. **auto-execution 아님.** 학습 결과로 추천을 자동 변경/자동 발송/자동 프로모션하지 않는다(§5).
- N2. **real DB integration 완료 아님.** Cosmile postgres는 **schema/validate 수준**으로 남는다. "real DB integration complete"라고 말하지 않는다.
- N3. single-signal 장기기억 확정 아님. 한 번의 신호로 LongTermMemoryFact를 만들지 않는다.
- N4. Foundation을 durable customer memory DB / identity broker / service DB reader로 만들지 않는다.
- N5. cross-schema 직접 참조 아님. `siasiu`↔`cosmile` schema 직접 read 없음.
- N6. medical assertion / 진단 / 치료 주장 아님. adverse signal은 safety-first로만 처리.
- N7. Option A / `FOUNDATION_SUBJECT_REF_SECRET` mint 부활 아님.
- N8. **Hard Stop 무접촉** (§ 아래): prod DB access, real secret/Vault, main merge, live activation, external release, prod DB migration — 전부 out-of-scope.

### 4.3 Hard Stops (out-of-scope로 명시)

이 문서와 V3 설계 단계 전체에서 **하지 않는다**:
`prod DB access` · `real secret / Vault write·view` · `main merge` · `live activation` · `external release` · `prod DB migration`.
이들은 **별도 승인 release train** 없이는 불가하며, 설계 단계에서는 아예 건드리지 않는다.

---

## 5. 이 단계 = "자동화 가능한 memory/learning 구조", auto-execution 아님

명확히 구분한다:

- **이번에 만드는 것:** 학습이 *가능하도록* 하는 **구조**(contract·schema·enum·승격 기준·gate 원칙·재현 가능한 trace). 즉 "자동화 가능한(automatable)" 뼈대.
- **이번에 만들지 않는 것:** 그 구조가 **스스로 판단을 실행(auto-execute)** 하는 것. 승격된 memory가 자동으로 추천을 바꾸거나, 자동으로 고객에게 노출되거나, 자동으로 canonical/learned promotion 되는 것.

> 원칙: **구조는 자동화 가능하게, 실행은 사람이 승인.** 모든 승격/재사용은 설계상 `applied_to_real_user=false`, `write_performed=false` 를 유지하며, 실제 실행 전환은 **별도 release train + Leo 승인**을 요구한다.
> **★Leo 결정 필요:** "automatable → 실제 auto-promotion 실행"으로 넘어가는 승인 게이트를 어느 milestone(예: `COSMILE_MEMORY_V3_10_PRE_IMPLEMENTATION_REVIEW_PLAN_20260706` 최종 통합 review 통과 후 별도 train)에 둘지. (구 표기 "V3-04 이후"는 옛 5문서 번호 기준 — superseded.)

---

## 6. 루프 이름 — The V3 Learning Commerce Memory Loop

V3가 설계하는 end-to-end 루프의 canonical 명칭과 단계:

```
[V3 Learning Commerce Memory Loop]

consultation result            (상담 결과)
  → recommendation reason      (추천 이유)
  → recommended product        (추천 상품)
  → product / SKU / ingredient (상품·SKU·성분)
  → product_view / add_to_cart / checkout / order   (커머스 이벤트)
  → revenue / margin           (매출·마진)
  → satisfaction / adverse_reaction / repurchase     (만족·이상반응·재구매)
  → MemoryFactCandidate        (기억 후보)
  → evidence / confidence      (근거·신뢰도 축적)
  → LongTermMemoryFact promotion   (장기기억 승격)
  → next recommendation improvement (다음 추천 개선)
        ↺ (다시 consultation result로 되먹임)
```

핵심 불변식(설계 원칙, 상세는 형제 문서에서 계약화):

- **single-signal 승격 금지:** `MemoryFactCandidate` → `LongTermMemoryFact` 는 evidence/confidence 임계 + 다중 신호 후에만 (임계 수치 정본 = 사전 `COSMILE_MEMORY_V3_DATA_DICTIONARY_CANONICAL_20260706` §3 · safety fact는 별도 lifecycle — 사전 §5).
- **safety override:** adverse_reaction / safety 신호는 loop의 어느 지점에서든 commerce 최적화보다 우선(fail-closed).
- **service-local ownership:** view/cart/checkout/order/revenue/margin 원천 데이터는 Cosmile `cosmile` schema 소유. Foundation에는 minimized request-scoped memory_context만.
- **재현 가능:** 각 전이는 `trace_id` + `reason_codes` 로 감사 가능해야 한다.

각 단계의 필드 표·enum·승격 임계·gate 규칙은 형제 문서에서 구체화한다 (실제 파일명 — 구 "`_01_`~`_04_`" 4문서 포인터는 superseded):
- **키/enum/threshold/window 정본(유일)**: `COSMILE_MEMORY_V3_DATA_DICTIONARY_CANONICAL_20260706` — 아래 문서들은 값을 직접 선언하지 않고 사전을 참조한다.
- loop 단계별 계약: `COSMILE_MEMORY_V3_02_LEARNING_COMMERCE_MEMORY_CONTRACT_20260706`(19필드 learning memory + **memory_context 최소화 계약 소유**) · `COSMILE_MEMORY_V3_03_RECOMMENDATION_EVENT_CONTRACT_20260706`(추천 이벤트) · `COSMILE_MEMORY_V3_04_ORDER_REVENUE_FEEDBACK_OUTCOME_CONTRACT_20260706`(주문/매출/피드백 outcome) · `COSMILE_MEMORY_V3_05_PRODUCT_INGREDIENT_INTELLIGENCE_MAPPING_20260706`(제품/성분 mapping)
- MemoryFactCandidate → LongTermMemoryFact 승격/강등: `COSMILE_MEMORY_V3_06_MEMORY_FACT_CANDIDATE_PROMOTION_RULES_20260706`
- safety/gate·adverse override·consent 규칙: `COSMILE_MEMORY_V3_07_SAFETY_ADVERSE_REACTION_GUARDRAIL_20260706`
- DB invariant·substrate: `COSMILE_MEMORY_V3_08_DB_INTEGRATION_INVARIANT_DESIGN_20260706` · analytics 최소 지표: `COSMILE_MEMORY_V3_09_ANALYTICS_REPORT_MINIMUM_20260706`
- 기존 5 미션 정합: `COSMILE_MEMORY_V3_01_EXISTING_5_MISSION_RECONCILIATION_PLAN_20260706` · 구현 전 review(각 단계 gate): `COSMILE_MEMORY_V3_10_PRE_IMPLEMENTATION_REVIEW_PLAN_20260706` — 구현 batch = V3-11(예정)·post-implementation review = V3-12(예정).

---

## 7. 열린 질문 / ★Leo 결정 필요 (요약)

- **★Leo 결정 필요 (§3):** V3의 SIASIU 연동 범위 — read-only 참조만 vs 후속 별도 release train.
- **★Leo 결정 필요 (§5):** automatable → auto-promotion 실제 실행 전환의 승인 게이트 위치.
- **★Leo 결정 필요:** LongTermMemoryFact 승격 임계(신호 수·confidence 하한·관측 기간)의 초기 기본값 — 단일 정본 표 = 사전 `COSMILE_MEMORY_V3_DATA_DICTIONARY_CANONICAL_20260706` §3(C_min 0.60·N_min 2)·§4(window)로 제안하되 확정은 Leo. (구 표기 "형제 문서 `_02_`에서 표로 제안"은 superseded — 어휘 정본 소유는 사전.)
- **★Leo 결정 필요:** adverse_reaction 신호의 memory 반영 정책 — "재추천 억제(suppression)"까지 자동화 가능 구조에 넣을지, safety review 수동 게이트로 둘지. (정본 초안 = 사전 §5.3 AdverseSignalActionMatrix·상세 절차 소유 = `COSMILE_MEMORY_V3_07_SAFETY_ADVERSE_REACTION_GUARDRAIL_20260706`.)

---

## 무결성

- **design-only.** 코드·구현·테스트·live 전환 없음. 어떤 것도 "구현됨/테스트됨"으로 주장하지 않는다(이 문서는 계획).
- **V1 Option B 상속** (canonical). **Option A / `FOUNDATION_SUBJECT_REF_SECRET` mint 상속 안 함**(superseded).
- **Foundation = validate/gate/reasoning only.** durable customer memory DB 아님, service DB 직접 read 아님. minimized request-scoped memory_context(raw text/PII 없음, `raw_text_stored=False`)만 전달.
- **service-local ownership.** SIASIU·Cosmile 각자 memory+commerce 소유(per-service schema `siasiu`/`cosmile`, cross-schema 직접 참조 없음). Cosmile postgres = **schema/validate 수준**(real DB integration 미완).
- **safety-first.** adverse/medical/safety > commerce·revenue. medical assertion 금지. "계속 써도 돼?"류 safety-first.
- **no prod / no live / no main / no secret.** prod DB access·real secret/Vault·main merge·live activation·external release·prod DB migration = Hard Stop, out-of-scope. 실제 실행 전환은 별도 release train + Leo 승인.
