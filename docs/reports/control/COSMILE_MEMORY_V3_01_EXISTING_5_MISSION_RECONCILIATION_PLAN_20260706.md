# COSMILE MEMORY V3 · 01 — 기존 Cosmile 5 미션 정합성(Reconciliation) 계획서

> 작성: foundation-control · 2026-07-06 · design-only · no code · Hard Stop 무접촉

---

## 0. 목적 / 이 문서가 아닌 것

이 문서는 **Cosmile Memory V3 — Learning Commerce Memory Loop**의 기반 정지작업으로,
**기존에 존재하는 Cosmile 5개 미션이 Memory V1(Option B) 및 PostgreSQL substrate와 충돌하는지 여부만 판정하기 위한 "계획 + 분류 기준"**이다.

- 이 문서는 **재구현(reimplement)이 아니다.** 5개 미션의 코드/설계를 다시 쓰지 않는다.
- 이 문서는 **실제 정합성 판정(actual reconciliation)이 아니다.** 아래 표는 나중에(별도 read-only 조사에서) 채울 **skeleton**이다.
- 이 문서는 **read-only 조사 계획 + 분류 CRITERIA** 만 확정한다.
- 산출물: (a) 4단계 분류 기준 정의, (b) 미션별 read-only inspection plan, (c) 채워질 결과 표 skeleton.

관련 형제 문서(작성/예정):
- `COSMILE_MEMORY_V3_02_...` — V3 타깃 루프 데이터 계약 / MemoryFactCandidate→LongTermMemoryFact 승격 설계(예정)
- `COSMILE_MEMORY_V3_03_...` — subject_ref / furef service-local mint 및 minimized memory_context 계약(예정)
- `COSMILE_MEMORY_V3_04_...` — safety-first / adverse-reaction 우선 gate 설계(예정)
- (본 문서 = `COSMILE_MEMORY_V3_01_...`)

> 형제 문서 번호/제목은 실제 파일명이 확정되면 그 filename으로 교체한다. ★Leo 결정 필요: 형제 문서 넘버링 최종 확정.

---

## 1. 상속 전제 (V3 canonical inheritance)

이 계획서의 모든 판정은 아래 전제 위에서만 유효하다.

1. **Memory V1 = CLOSED_WITH_LIMITS** (dev/shadow/readiness 수준). V3는 V1의 **Option B**를 canonical로 상속한다.
2. **Option A / `FOUNDATION_SUBJECT_REF_SECRET` mint 는 상속하지 않는다 (superseded).**
3. **subject_ref mint = SERVICE-LOCAL:**
   `subj_v2_ + HMAC(<SVC>_SUBJECT_SECRET, '<svc>:subject:' + ref)[:32]`
4. **furef = SERVICE-LOCAL, cross-producer consistent:**
   `furef_v2_ + HMAC(<SVC>_FUREF_SECRET, '<svc>:local_user:' + ref)[:32]`
5. **Foundation = validate / gate / reasoning ONLY.** Foundation은 durable customer memory DB가 아니고, SIASIU/Cosmile service DB를 **직접 읽지 않는다.**
6. Foundation에 넘어가는 것은 **minimized, request-scoped `memory_context`**뿐이다 (`raw_text_stored=False`, `request_scoped=True`, raw text/PII 없음).
7. **SIASIU / Cosmile 는 각자 자기 customer memory + commerce data를 소유**한다 (service-local, per-service postgres schema `siasiu` / `cosmile`, cross-schema 직접 참조 금지).
8. **Cosmile postgres 현 상태 = "schema/validate 수준".** real DB-integration은 완료로 간주하지 않는다. 보고 시 항상 **"schema/validate level"**로 표기하고 **"real DB integration complete" 표현 금지.**
9. **Safety / adverse-reaction 신호가 commerce/revenue 최적화보다 우선한다.** 의학적 단정 금지. "계속 써도 돼?" 류 표현은 safety-first로 처리.

Hard Stop (본 문서 전 범위에서 **out-of-scope, 무접촉**):
prod DB access · real secret/Vault · main merge · live activation · external release · prod DB migration.

---

## 2. V3 타깃 루프 (판정 기준선으로만 참조)

아래는 V3가 지향하는 end-to-end 루프다. 5개 미션 각각이 **이 루프의 어느 구간을 담당/전제/침범하는지**를 조사 축으로 삼는다. (여기서 구현하지 않는다.)

```
상담 결과 → 추천 이유 → 추천 상품 → 상품/SKU/성분
  → product_view / add_to_cart / checkout / order → revenue/margin
  → satisfaction / adverse_reaction / repurchase
  → MemoryFactCandidate → evidence/confidence 기반 LongTermMemoryFact 승격
  → 다음 추천 개선
```

핵심 규율: **단일 신호로 long-term memory를 확정하지 않는다.**
`MemoryFactCandidate` → evidence/confidence 누적 → `LongTermMemoryFact` **승격(promotion)** 경로만 허용.

---

## 3. 분류 기준 (CRITERIA) — 4개 상태

각 미션은 아래 4개 중 **정확히 하나**로 분류한다. 판정 근거는 반드시 **read-only evidence(§5)**에 기반한다.

### 3.1 `DONE`
미션이 원래 목표를 충족했고 **V3 상속 전제(§1)와 충돌하지 않으며**, V3 루프가 그대로 위에 올라탈 수 있다.

판정 조건 (모두 충족):
- 미션의 원래 acceptance/regression이 **통과 상태로 문서화**되어 있다 (자체 주장 아님, 기록/테스트 산출물 존재).
- Option B substrate와 **모순되는 가정이 없다** (Option A secret mint 의존 없음).
- postgres 사용이 **schema/validate 수준 이내**이고 real DB-integration을 전제로 하지 않는다.
- Foundation을 **durable memory DB / service DB reader로 오용하지 않는다.**
- safety-first 우선순위를 **약화시키지 않는다.**

### 3.2 `DONE_WITH_LIMITS`
목표는 달성했으나 **명시적 한계/전제** 하에서만 유효하다. 충돌은 아니지만, V3에서 그 한계를 **명시·상속**해야 한다.

판정 조건 (하나 이상):
- 결과가 **mock/shadow/read-only** 전제에서만 성립한다.
- postgres가 **schema/validate level**에서만 검증됨(=real DB-integration 미완, 이는 정상 상태로 표기).
- subject_ref/furef를 사용하나 **service-local mint 전제**를 아직 명시적으로 문서화하지 않음(전제는 호환).
- 커버리지/시나리오 수에 **알려진 공백**이 있으나 계약은 깨지 않음.

> `DONE`과 `DONE_WITH_LIMITS`의 차이는 "충돌 여부"가 아니라 **"명시해야 할 전제/한계의 존재 여부"**다.

### 3.3 `OBSOLETE`
미션의 산출물/설계가 **V3에서 더 이상 유효 경로가 아니다** (대체되었거나, Option A 등 superseded 전제에 묶여 있음).

판정 조건 (하나 이상):
- **Option A / `FOUNDATION_SUBJECT_REF_SECRET` mint** 등 superseded 전제에 본질적으로 의존한다.
- Foundation을 durable customer memory DB로 취급하는 등 **현 아키텍처 헌법과 상충하는 전제** 위에 서 있다.
- 후속 미션/설계가 동일 범위를 **완전 대체**했다.
- ★단, `OBSOLETE`로 판정해도 **코드/테스트를 삭제하지 않는다.** 문서에 "대체됨/superseded"만 기록한다(§6 삭제 금지 규율).

### 3.4 `NEEDS_V3_PATCH`
미션 자체는 살아있으나, V3 루프/Option B/postgres substrate와 **정합을 맞추려면 명시적 patch(설계 or 계약 조정)가 필요**하다. **이 판정이 나오면 별도 patch 설계서가 필요하다.**

판정 조건 (하나 이상 → NEEDS_V3_PATCH):
- event/tracking 스키마가 V3 루프 필드(`MemoryFactCandidate`·evidence·confidence·adverse_reaction·repurchase 등)를 **담을 수 없다.**
- subject_ref/furef 생성 위치가 **service-local mint 규약과 불일치**(예: Foundation-side mint 잔재, Option A prefix `subj_v1_`/secret 참조).
- Foundation으로 **raw text/PII 또는 non-minimized payload**가 넘어갈 수 있는 경로가 존재한다 (`raw_text_stored` 위반 리스크).
- postgres 사용이 **cross-schema 직접 참조**(siasiu↔cosmile) 또는 real-DB write 전제를 **암묵적으로 요구**한다.
- **safety/adverse-reaction 신호가 commerce 최적화에 종속**될 수 있는 경로가 있다.
- analytics/pipeline이 memory 승격(candidate→long-term)을 **단일 신호로 확정**하도록 설계되어 있다.

---

## 4. 대상 5개 미션 (조사 범위)

| # | 미션 코드 | V3 루프상 추정 담당 구간 | 1차 관심 충돌 축 |
|---|-----------|--------------------------|------------------|
| M1 | `COSMILE-CONNECT-UI-SWITCH` | 입력 이해 · service voice · 상담↔commerce UI 전환(진입점) | Option B subject_ref/furef 소비 방식, service-local 경계 |
| M2 | `COSMILE-EVENT-TRACKING-AUDIT` | product_view/add_to_cart/checkout/order 이벤트 **감사** | raw text/PII trace leak, minimized payload, postgres schema level |
| M3 | `COSMILE-EVENT-TRACKING-SPEC` | 이벤트 **스펙/스키마 정의** | V3 루프 필드 수용력, event→candidate 매핑 가능성 |
| M4 | `COSMILE-ANALYTICS-PIPELINE` | revenue/margin/satisfaction/repurchase 집계 → 학습 신호 | 단일 신호 승격 금지, evidence/confidence 누적, safety 우선 |
| M5 | `COSMILE-FOUNDATION-COMMERCE-LOOP` | 상담→추천→상품 판단 loop (Foundation 소비) | Foundation validate/gate-only 경계, memory_context minimized |

> 위 "추정 담당 구간"은 **가설**이다. 실제 조사(§5)에서 확정한다. ★Leo 결정 필요: 조사 대상 미션 코드 5개가 최종 목록이 맞는지 확인(누락/추가 미션 여부).

---

## 5. 미션별 read-only inspection plan

각 미션에 대해 공통 절차:
- **읽기만 한다.** 코드/테스트/스키마 수정·실행 결과 변경 없음. 도구 실행이 필요하면 `realpath`로만, live/write/promotion=0 유지.
- 근거는 **boolean/count/status/파일경로**로만 기록한다. raw secret·raw hash·PII·customer/order/OAuth id·trace_id·full env dump·prod DB row dump **금지**.
- 각 미션 조사 종료 시 §3 기준으로 상태 1개 + 근거를 §7 표에 채운다.

### M1 · COSMILE-CONNECT-UI-SWITCH
- **무엇을 볼까 (what to check):**
  - UI switch 진입점이 subject_ref/furef를 **어디서** 얻는가 (service-local mint 소비 vs 자체 생성).
  - Foundation 호출이 있다면 넘기는 payload가 **minimized memory_context**인지, raw text가 섞이는지.
  - service voice / 입력 이해 로직이 core에 섞였는지(역할 경계).
- **어떤 evidence:** 진입점 파일 경로 목록, subject_ref prefix 종류(`subj_v2_` 존재/`subj_v1_` 부재 boolean), Foundation 호출부 유무(count), raw_text 전달 경로 유무(boolean).
- **NEEDS_V3_PATCH 트리거:** Option A prefix/secret 참조 발견 · Foundation-side mint 잔재 · raw text가 Foundation으로 흐르는 경로 · cross-schema 직접 참조.
- **가설 상태:** DONE_WITH_LIMITS (mint 전제 명시 필요 가능성).

### M2 · COSMILE-EVENT-TRACKING-AUDIT
- **무엇을 볼까:**
  - 감사 대상 이벤트 목록(product_view/add_to_cart/checkout/order 등) 커버 범위.
  - trace/log에 raw query/body/customer PII가 남는지 (leak scan 관점, read-only).
  - postgres 기록이 **schema/validate 수준**에 머무는지, real write를 전제하는지.
- **어떤 evidence:** 감사 이벤트 종류 count, PII/raw trace leak 발견 여부(boolean·count, 값 노출 금지), postgres 접근이 schema-level인지 status.
- **NEEDS_V3_PATCH 트리거:** raw text/PII trace 저장 경로 발견 · real DB write 전제 · minimized payload 위반.
- **STOP 트리거(발견 즉시 보고):** raw query/body/customer PII in trace/report · checkout/order/customer DB write 경로.
- **가설 상태:** DONE_WITH_LIMITS 또는 NEEDS_V3_PATCH.

### M3 · COSMILE-EVENT-TRACKING-SPEC
- **무엇을 볼까:**
  - 이벤트 스펙이 V3 루프 필드를 **수용 가능**한지: 상품/SKU/성분, satisfaction, adverse_reaction, repurchase, evidence/confidence hook.
  - 이벤트→`MemoryFactCandidate` 매핑이 **표현 가능**한 구조인지.
  - 스키마가 service-local(cosmile schema)로 닫혀 있는지.
- **어떤 evidence:** 스펙에 정의된 필드 목록, V3 필수 필드 대비 gap 목록(count), candidate 매핑 가능 여부(boolean).
- **NEEDS_V3_PATCH 트리거:** adverse_reaction/repurchase/evidence 필드 부재 · candidate 매핑 불가 · cross-schema 참조 전제.
- **가설 상태:** NEEDS_V3_PATCH 가능성 높음(V3 신규 필드 흡수 필요).

### M4 · COSMILE-ANALYTICS-PIPELINE
- **무엇을 볼까:**
  - 집계/학습 신호가 memory 승격을 **단일 신호로 확정**하는지, evidence/confidence 누적 경로가 있는지.
  - revenue/margin 최적화가 **safety/adverse-reaction보다 우선**될 수 있는 경로가 있는지.
  - pipeline 산출물이 service-local에 머무는지, Foundation을 memory DB로 취급하는지.
- **어떤 evidence:** 승격 로직 존재 여부(boolean), 단일-신호 확정 경로 유무(boolean), safety 우선순위 gate 존재 여부(status), Foundation 오용 여부(boolean).
- **NEEDS_V3_PATCH 트리거:** 단일 신호 long-term 확정 · safety가 commerce에 종속 · Foundation을 durable memory로 취급.
- **STOP 트리거:** learned/canonical promotion 경로가 live로 열림 · write_live_promotion>0.
- **가설 상태:** NEEDS_V3_PATCH.

### M5 · COSMILE-FOUNDATION-COMMERCE-LOOP
- **무엇을 볼까:**
  - loop가 Foundation을 **validate/gate/reasoning ONLY**로 쓰는지, decision을 Foundation이 소유하는지 확인.
  - Foundation으로 넘기는 것이 **minimized, request-scoped memory_context**인지(`raw_text_stored=False`).
  - decision output 계약(decision_type/evidence_mode/safety_gate_result/memory_reuse_decision/reason_codes/trace_id/applied_to_real_user=false/write_performed=false) 유지 여부.
  - 기존 Cosmile readiness adapter `1ce099e`(164/164)·loop v0.1(112/112) 계약과 정합.
- **어떤 evidence:** Foundation 호출 payload minimized 여부(boolean), decision output 필수 필드 존재 count, readiness 164/164·loop 112/112 유지 status.
- **NEEDS_V3_PATCH 트리거:** non-minimized payload · Foundation이 decision 우회/service DB 직접 read · decision output 필수 필드 결손.
- **가설 상태:** DONE_WITH_LIMITS (read-only/mock/shadow 전제 명시 필요).

---

## 6. 판정 규율 (실제 reconciliation 수행 시 준수)

1. **read-only.** 5개 미션 코드/테스트/스키마를 수정하지 않는다. 재구현하지 않는다.
2. **OBSOLETE여도 삭제 금지.** dead/superseded로 판정된 산출물은 **삭제하지 않고 "대체됨"으로만 문서화**한다(CLAUDE.md §3 규율 상속).
3. **자체 주장 금지.** "PASS/DONE"은 미션 자신의 말이 아니라 **기록/테스트 산출물 evidence**로만 인정한다.
4. **정직 델타.** 커버리지/카운트 변화가 있으면 증가/감소를 그대로 기록(숫자를 미화하지 않음).
5. **NEEDS_V3_PATCH → 별도 설계서.** patch가 필요하면 이 문서에서 구현하지 않고, `설계자료/`에 별도 patch 설계서를 발행한다(design-first).
6. **STOP 조건 발견 시 즉시 중단·보고.** raw PII/trace leak · real DB write 경로 · live/promotion open · Option A secret 활성 등.
7. **표기 규율.** postgres는 "schema/validate level"로만 표기, "real DB integration complete" 금지.

---

## 7. 결과 표 SKELETON (실제 reconciliation에서 채움 — 현재 미판정)

> 아래 표는 **skeleton**이다. 현재 상태 값은 모두 `미판정(TBD)`이며, 별도 read-only 조사에서 §3 기준으로 채운다.
> 이 문서는 값을 확정하지 않는다.

| # | 미션 코드 | 상태 (DONE / DONE_WITH_LIMITS / OBSOLETE / NEEDS_V3_PATCH) | Option B 정합 | postgres(schema/validate) 정합 | subject_ref/furef service-local 정합 | Foundation validate/gate-only 정합 | safety-first 정합 | 근거(파일경로/boolean/count) | patch 필요 시 후속 설계서 |
|---|-----------|:---:|:---:|:---:|:---:|:---:|:---:|---|---|
| M1 | COSMILE-CONNECT-UI-SWITCH | TBD | TBD | TBD | TBD | TBD | TBD | (조사 시 기입) | (필요 시) |
| M2 | COSMILE-EVENT-TRACKING-AUDIT | TBD | TBD | TBD | TBD | TBD | TBD | (조사 시 기입) | (필요 시) |
| M3 | COSMILE-EVENT-TRACKING-SPEC | TBD | TBD | TBD | TBD | TBD | TBD | (조사 시 기입) | (필요 시) |
| M4 | COSMILE-ANALYTICS-PIPELINE | TBD | TBD | TBD | TBD | TBD | TBD | (조사 시 기입) | (필요 시) |
| M5 | COSMILE-FOUNDATION-COMMERCE-LOOP | TBD | TBD | TBD | TBD | TBD | TBD | (조사 시 기입) | (필요 시) |

범례: 정합 컬럼 = `OK` / `LIMIT`(전제 명시 필요) / `PATCH`(조정 필요) / `N/A` / `TBD`.

집계 슬롯(조사 완료 시 기입):
- DONE: __ / DONE_WITH_LIMITS: __ / OBSOLETE: __ / NEEDS_V3_PATCH: __
- NEEDS_V3_PATCH로 판정된 미션 → 각각 별도 patch 설계서 목록: __

---

## 8. 열린 질문 / ★Leo 결정 필요

- ★Leo 결정 필요: **조사 대상 5개 미션 목록 확정** (§4 코드가 최종인지, 누락/추가 미션 여부).
- ★Leo 결정 필요: **형제 문서(V3-02/03/04...) 넘버링·파일명 확정** (본 문서의 cross-reference 고정용).
- ★Leo 결정 필요: `NEEDS_V3_PATCH`가 다수로 나올 경우 **patch 설계서를 미션별 개별 발행 vs 통합 1건**으로 낼지.
- ★Leo 결정 필요: M2/M4에서 STOP 트리거(잠재 raw trace/promotion 경로)가 발견될 때 **즉시 문서화만 vs 조사 중단** 정책.
- 열린 질문: `OBSOLETE` 판정 시 "대체됨" 표기 위치를 본 문서 표에만 둘지, 각 미션 원본 report에도 pointer를 남길지.

---

## 무결성

- **design-only** 계획서 — no code, 재구현 아님, 실제 reconciliation 아님(§7 표는 채워질 skeleton, 현재 전부 TBD).
- **Memory V1 Option B 상속** — Option A / `FOUNDATION_SUBJECT_REF_SECRET` mint **미상속(superseded)**. subject_ref/furef는 **service-local mint**.
- **Foundation = validate/gate/reasoning ONLY** — durable customer memory DB 아님, service DB 직접 read 아님. Foundation에는 minimized·request-scoped `memory_context`(raw_text_stored=False)만 전달.
- **service-local ownership** — SIASIU/Cosmile 각자 memory+commerce 소유, per-service schema, cross-schema 직접 참조 금지. postgres는 **schema/validate level**(real DB integration complete 아님).
- **safety-first** — adverse-reaction/safety 신호가 commerce/revenue 최적화보다 우선, 의학적 단정 금지, "계속 써도 돼?"류 safety-first.
- **no prod / no live / no main / no secret** — prod DB access·real secret/Vault·main merge·live activation·external release·prod DB migration = out-of-scope, 무접촉. write/live/promotion = 0.
