# COSMILE MEMORY V3 — V3-08 DB Integration & Invariant Design (Cosmile/SIASIU postgres)

> 작성: foundation-control · 2026-07-06 · design-only · no code · Hard Stop 무접촉

> depends_on: [COSMILE_MEMORY_V3_DATA_DICTIONARY_CANONICAL_20260706.md, COSMILE_MEMORY_V3_02_LEARNING_COMMERCE_MEMORY_CONTRACT_20260706.md, COSMILE_MEMORY_V3_06_MEMORY_FACT_CANDIDATE_PROMOTION_RULES_20260706.md, COSMILE_MEMORY_V3_07_SAFETY_ADVERSE_REACTION_GUARDRAIL_20260706.md] · owns: [DB-level invariant(INV-DB-1/2/3) · SubjectRefMap partial unique · zero-orphan · secret_version dual-read readiness · migrations_legacy_sqlite 격리 · migrate deploy pre-gate · COSMILE-4 baseline 복원 계획(§2-B)] · referenced_by: [COSMILE_MEMORY_V3_09_ANALYTICS_REPORT_MINIMUM_20260706.md, COSMILE_MEMORY_V3_10_PRE_IMPLEMENTATION_REVIEW_PLAN_20260706.md, COSMILE_MEMORY_V3_00_INDEX_AND_EXECUTIVE_SUMMARY_20260706.md]

이 문서는 COSMILE MEMORY V3 — Learning Commerce Memory Loop의 **DB 통합·불변식(invariant) 설계** 편(V3-08)이다.
목적은 "자동화 가능한 memory/learning 구조"를 **DB 레벨에서 깨지지 않게** 만드는 것이며, **auto-execution / live 전환이 아니다.**
현재 Cosmile postgres는 **schema/validate 수준**이다 — real DB integration은 **완료로 간주하지 않는다.**
enum/key/threshold의 **유일 정본 = `COSMILE_MEMORY_V3_DATA_DICTIONARY_CANONICAL_20260706.md`(이하 "사전")** — 본 문서는 값 목록을 재선언하지 않고 사전을 참조한다.

관련 형제 문서(참조 — 실제 파일명):
- `COSMILE_MEMORY_V3_00_INDEX_AND_EXECUTIVE_SUMMARY_20260706.md` — 전체 loop 비전·범위.
- `COSMILE_MEMORY_V3_DATA_DICTIONARY_CANONICAL_20260706.md` — enum/key/threshold 유일 정본(사전).
- `COSMILE_MEMORY_V3_02_LEARNING_COMMERCE_MEMORY_CONTRACT_20260706.md` — ltm_fact/candidate 계약 · subject_ref/guest_ref identity(Option B — 키 형식 정본은 사전 §1.1) · **Foundation 전달 memory_context 최소화 계약(소유)**(request-scoped, no raw/PII).
- `COSMILE_MEMORY_V3_06_MEMORY_FACT_CANDIDATE_PROMOTION_RULES_20260706.md` — candidate→ltm_fact promotion evidence/confidence 규칙.
- `COSMILE_MEMORY_V3_07_SAFETY_ADVERSE_REACTION_GUARDRAIL_20260706.md` — safety-first / adverse-reaction 우선 · safety fact lifecycle/resolution 절차 소유.

---

## 0. 범위와 비범위

**범위 (design-only):**
- Cosmile/SIASIU postgres에서 memory/learning loop가 만족해야 할 **DB-level invariant** 설계.
- `SubjectRefMap` partial-unique 제약, zero-orphan 제약, secret_version/rotation readiness(dual-read).
- sqlite 마이그레이션 잔재(`migrations_legacy_sqlite`) 정리 설계.
- provider-independent 테스트와 DB-touch integration 테스트의 **분리 원칙**.
- `migrate deploy` 실행 전 **pre-gate 체크리스트**.

**비범위 (Hard Stop — 이 문서에서 절대 하지 않음):**
- prod DB 접근 · real secret/Vault 열람 · main merge · live activation · external release · prod DB migration 실행.
- 이 문서는 schema/DDL 초안과 invariant "정의"만 제시한다. **실제 `migrate deploy`를 돌리지 않는다.**
- Foundation을 durable customer memory DB로 만들지 않는다. Foundation은 service DB를 직접 읽지 않는다(validate/gate/reasoning ONLY).

---

## 1. 소유권·경계 재확인 (DB 관점)

| 항목 | 소유자 | schema | 비고 |
|---|---|---|---|
| Cosmile customer memory / commerce data | Cosmile | postgres schema `cosmile` | service-local, cross-schema 직접참조 금지 |
| SIASIU customer memory / consultation data | SIASIU | postgres schema `siasiu` | service-local, cross-schema 직접참조 금지 |
| subject_ref / furef mint | **service-local** | 각 service schema | Option B 상속 (Option A / FOUNDATION_SUBJECT_REF_SECRET mint 미상속·superseded) |
| memory_context(minimized) | request-scoped only | (DB 아님) | `raw_text_stored=False`, no raw/PII, Foundation에 전달만 |
| decision/gate/evidence/reasoning | Foundation | (service DB 미접근) | validate/gate ONLY |

**규칙 R-OWN-1:** `cosmile.*` 테이블은 `siasiu.*`를 FK로 직접 참조하지 않는다(그 반대도 금지). cross-service 연관은 subject_ref/furef **값 일치**로만 표현하고, DB FK로 묶지 않는다.

**규칙 R-OWN-2:** Foundation은 어떤 service schema에도 read/write 커넥션을 갖지 않는다. Foundation이 받는 것은 요청 단위 minimized `memory_context`뿐이다(소유 = `COSMILE_MEMORY_V3_02_LEARNING_COMMERCE_MEMORY_CONTRACT_20260706.md` 참조).

**subject_ref/furef 형식(Option B — 키 형식 정본은 사전 §1.1·identity 계약은 V3-02):**
- `subject_ref = "subj_v2_" + HMAC(<SVC>_SUBJECT_SECRET, "<svc>:subject:" + ref)[:32]`
- `furef = "furef_v2_" + HMAC(<SVC>_FUREF_SECRET, "<svc>:local_user:" + ref)[:32]` (cross-producer consistent)
- mint은 **service-local**. Foundation은 format/gate/validation만 담당.

---

## 2. Cosmile DB-level 신규 카운터 invariant (3종 제안 — §2-B COSMILE-4 baseline 3종과 **별개 집합**)

> baseline invariant = "이게 깨지면 memory loop 자체를 신뢰할 수 없다"는 최소 DB 참(true) 조건.
> 아래 3종은 **DB 레벨에서 검증 가능(제약/카운터 쿼리)** 하도록 설계한다. 초기값 목표는 모두 **0 위반**.

### INV-DB-1 — Identity Integrity (subject_ref/guest_ref 무결성 — guest 경로 포함)
- **정의:** memory/fact/loop 데이터의 identity는 사전 §1.1 키 형식 정본을 만족한다.
  - (a) `subject_ref`는 `subj_v2_` prefix + 정확히 32자 HMAC hex를 가지며, `SubjectRefMap`에 대응 행이 존재해야 한다. `furef`도 `furef_v2_` prefix 규격을 만족한다(SubjectRefMap identity 층).
  - (b) **guest 경로:** memory 계층(ltm_fact/candidate/consent) 행은 `subject_ref XOR guest_ref`를 만족한다(둘 다 null·둘 다 존재 = 위반 — 사전 §1.1). **guest_ref-only 행도 identity invariant 대상**이다 — M2 canonical guest_ref 형식을 만족하고 `subject_key = COALESCE(subject_ref, guest_ref)`가 산출 가능해야 한다.
  - (c) `anonymous_ref`(`anon_v3_`)는 commerce event 계층 전용 — memory 계층 행에 존재하면 위반(사전 §1.1 — §1.3 stitching 경유만 허용).
- **검증 쿼리(개념):** ① `subject_ref NOT LIKE 'subj_v2_%'` OR `char_length(subject_ref) <> 40` 인 행 count = 0 (`subj_v2_`=8자 + 32자 = 40자) ② memory 계층에서 `(subject_ref IS NULL) = (guest_ref IS NULL)` 인 행 count = 0 (XOR 위반) ③ memory 계층에서 `anonymous_ref IS NOT NULL` count = 0.
- **위반 시:** loop write 차단(fail-closed), candidate 생성 중단.
- **연결:** INV-DB-1은 §3(partial unique)·§4(zero-orphan)로 물리 보증.

### INV-DB-2 — Promotion Monotonic Evidence (단일 신호 장기기억 금지 — **`direction≠safety` fact 한정**)
- **적용 범위 (P1):** 본 invariant는 **`direction ≠ safety` fact에만** 적용된다(사전 §2.1·§5.2). safety/adverse fact(`ingredient_adverse`·`product_adverse`·safety_flag 부착 fact)는 evidence 문턱 강등 대상이 아니다.
- **정의:** ltm_fact로 승격(`status='approved'` — 구 `long_term` 제3 어휘는 superseded — 사전 §2.2, promoted≡approved)된 모든 non-safety 행은 (a) `evidence_count >= N_min`, (b) `confidence >= C_min`, (c) `distinct_signal_source_count >= 2` 를 만족한다. **단일 signal로 장기기억 확정 금지**(V3-06 상속).
- **검증 쿼리(개념):** `status='approved' AND direction <> 'safety' AND safety_flag IS NULL AND (evidence_count < N_min OR confidence < C_min OR distinct_signal_source_count < 2)` count = 0.
  - ★**P1 tightening (V3-10 gate 2026-07-06):** predicate에 `safety_flag IS NULL`을 추가해 산문 예외 범위(`direction=safety` **OR** `safety_flag 부착 fact` — 사전 §2.13)와 일치시킨다. direction≠safety이나 `safety_flag`(safety_frozen·safety_caution·safety_block·safety_resolved·pregnancy_nursing_context)를 단 fact는 predicate에서 제외되어 강등 후보에 포함되지 않는다(report-only backstop에 의존하지 않는 값-레벨 정합).
- **위반 시(non-safety):** 해당 fact(= direction≠safety **AND** safety_flag IS NULL)를 `status='candidate'` + `lifecycle_state='demoted'`(사전 §2.2)로 강등(demote), promotion job 중단·audit.
- **★safety-fact 예외 (P1 — 사전 §5.2 필수 문구 인용):**
  > "Safety/adverse facts are not subject to ordinary evidence-threshold demotion. A safety fact may be deactivated only by an explicit safety-resolution rule, consent/erasure rule, or verified correction path. Commerce optimization and margin logic cannot demote or weaken an active safety fact."
  - safety fact를 evidence 문턱 미달을 이유로 **자동 강등하는 것 = 계약 위반**이다.
  - INV 위반 검출 시에도 safety fact는 **demotion 후보로만 보고**(report-only)하고 **자동 조치를 하지 않는다** — 처리 경로는 사전 §5.2의 3경로(safety-resolution rule / consent·erasure rule / verified correction)뿐이며 절차는 V3-07 소유.
- **파라미터:** `N_min=2` · `C_min=0.60` — 사전 §3 정본(본 문서 초안 0.70은 superseded — 사전 §3). 확정 = ★Leo(사전 §4 파라미터 표).

### INV-DB-3 — Safety-Priority Consistency (안전 우선 일관성)
- **정의:** adverse / `usage_question_safety`("계속 써도 돼?"류 — 사전 §2.12) safety signal이 기록된 subject에 대해, 해당 signal보다 나중 timestamp의 memory-driven recommendation fact는 `safety_reviewed=true` 없이 `fact_state='active'`(사전 §2.3)가 될 수 없다. **safety/adverse가 commerce/revenue 최적화보다 우선**(V3-07 상속). medical assertion 금지.
- **검증 쿼리(개념):** subject별로 `max(adverse_signal_ts)` 이후 생성된 `recommendation_fact WHERE fact_state='active' AND safety_reviewed=false` count = 0.
- **위반 시:** 그 recommendation fact를 `hold`로 전환, safety gate 재평가 요청.
- **비고:** 이 invariant는 DB가 "혼자" medical 판단하지 않는다 — safety 의미판단은 AI semantic + Foundation safety gate 결과를 **기록**한 필드(`safety_gate_result`, `safety_reviewed`)를 신뢰한다.

---

## 2-B. COSMILE-4 복원 계획 (P7 — baseline migration 보강)

> **COSMILE-4** = V1 final review가 지목한 항목(이름 그대로 인용): Cosmile 실물 schema의 주석은 일부 제약이 raw-SQL로 enforced라고 주장하지만, **baseline migration에 해당 DDL이 존재하지 않는다.** 본 절은 그 원 지적 3종을 baseline migration 보강 항목으로 열거하고 `migrate deploy` 전 gate에 연결한다.
> **주의:** 이 3종은 §2의 INV-DB-1/2/3(**신규 카운터 invariant**)과 **별개 집합**이다 — INV-DB-1/2/3의 존재가 COSMILE-4 해소를 대체하지 않는다.

baseline migration 보강 항목 (COSMILE-4 원 지적 3종):

| # | 항목 | 복원 내용 | 정본 근거 |
|---|---|---|---|
| C4-1 | SubjectRefMap partial unique | `UNIQUE (localUserRefHash, secretVersion) WHERE localUserRefHash IS NOT NULL`. **정정:** 실물 스키마가 `secretVersion NOT NULL DEFAULT 1`이므로 predicate은 **`localUserRefHash` 축만 필요**하다 — 구 "secret_version IS NULL = legacy" 전제는 실물과 다른 거짓 전제로 **삭제(superseded)** | §3 UC-SRM-1 |
| C4-2 | active LTM fact partial unique / SAFETY∩SINGLE invariant | safety 성격 SINGLE fact는 `subject_key + fact_type` 기준 **active ≤ 1** partial unique(SINGLE supersede 우선) | 사전 §5.1 |
| C4-3 | MFC status CHECK 등 orphan/lifecycle 제약 | `status IN ('candidate','approved','rejected')` CHECK(사전 §2.2) + candidate/fact→subject_ref_map 참조 등 orphan/lifecycle 방지 제약 | 사전 §2.2 · §4 |

- **gate 연결:** 위 3종 DDL이 baseline migration에 포함되었는지를 §8 pre-gate **G13**에서 확인한다. 미포함 시 `migrate deploy` STOP.
- V3-10 pre-implementation checklist의 COSMILE-4 gate 행이 본 절의 존재+G13 연결을 검증한다.

---

## 3. SubjectRefMap partial unique 제약

### 3.1 대상 테이블(개념 스키마)
`{svc}.subject_ref_map`

| 컬럼 | 타입(개념) | null | 설명 |
|---|---|---|---|
| `id` | bigserial PK | no | 내부 PK |
| `subject_ref` | text | no | `subj_v2_...` (§1) |
| `local_user_ref_hash` | text | **yes** | furef 계열 local user 해시(없을 수 있음: 익명/게스트) |
| `secret_version` | int | **no** | 이 매핑을 만든 secret 세대(§5). 실물 스키마 = **NOT NULL DEFAULT 1** — 구 "null=legacy/미태깅" 전제는 superseded(§2-B C4-1) |
| `created_at` | timestamptz | no | |
| `revoked_at` | timestamptz | yes | soft-delete/consent 철회 |

### 3.2 partial unique 제약(정의)
- **UC-SRM-1 (partial unique):**
  `UNIQUE (local_user_ref_hash, secret_version) WHERE local_user_ref_hash IS NOT NULL`
  - 목적: 동일 (local_user, secret 세대) 조합에 대해 **매핑 중복 생성 금지**.
  - predicate이 `local_user_ref_hash` 축만인 이유: 익명/게스트(`local_user_ref_hash IS NULL`) 행이 유일성 제약에 걸려 write가 막히면 안 되기 때문. `secret_version`은 실물 스키마가 **NOT NULL DEFAULT 1**이므로 predicate에 포함할 필요가 없다 — 구 `AND secret_version IS NOT NULL` predicate과 "legacy null" 전제는 superseded(§2-B C4-1).
- **UC-SRM-2:** `UNIQUE (subject_ref)` — subject_ref 자체는 전역 유일(부분 아님).

### 3.3 규칙
- **R-SRM-1:** rotation 중(§5)에는 동일 local_user가 `secret_version=k`와 `k+1` 두 매핑을 **동시에 가질 수 있다**(dual-read). UC-SRM-1이 `secret_version`을 포함하므로 충돌 없이 공존한다.
- **R-SRM-2:** 신규 write는 `secret_version`을 반드시 채운다. (구 "null=legacy 잔재 허용·cleanup 대상" 문구는 superseded — 실물 스키마가 NOT NULL DEFAULT 1이므로 null 행 자체가 존재하지 않는다. §2-B C4-1.)
- (구 ★Leo 결정 항목 "legacy `secret_version IS NULL` 행 backfill vs 영구 null 허용"은 **거짓 전제로 superseded** — §2-B C4-1. 남는 실제 gap은 §5.2의 "라벨 vs mint 파생 결합"이다.)

---

## 4. Zero-orphan 제약 (memory → subject_ref_map)

### 4.1 정의
- 모든 memory/fact/loop 행의 `subject_ref`는 `{svc}.subject_ref_map.subject_ref`에 대응 행이 존재해야 한다. **orphan(고아) = 0.**
- 물리 보증: `memory.subject_ref` → `subject_ref_map.subject_ref` **FK (ON DELETE RESTRICT)**.
  - RESTRICT 이유: subject 매핑을 지우면 memory가 orphan이 되므로, 매핑 삭제는 memory soft-delete/consent 흐름을 먼저 거치도록 강제.

### 4.2 zero-orphan 검증 쿼리(개념)
```
SELECT count(*) FROM {svc}.memory m
LEFT JOIN {svc}.subject_ref_map s ON m.subject_ref = s.subject_ref
WHERE s.subject_ref IS NULL;   -- 목표: 0
```
- 이 카운터는 §2 INV-DB-1의 물리적 뒷받침이며, cross-project regression에 **invariant counter**로 포함한다(휴리스틱 아님·deterministic).

### 4.3 규칙
- **R-ORPH-1:** memory write는 subject_ref_map 행 선(先)존재를 전제로 한다(upsert map → then write memory, 동일 트랜잭션).
- **R-ORPH-2:** consent 철회/삭제는 memory를 먼저 `deleted/blocked`로 표시하고, map은 `revoked_at`만 세팅(물리 삭제 아님) → orphan 발생 경로 자체를 없앤다.
- **R-ORPH-3:** `deleted/blocked/expired` memory는 loop reuse에서 **재사용 금지**(사전 §5.1 tombstone/must_not_reappear 규율·V3-07·CLAUDE.md STOP 조건과 정합).

---

## 5. secret_version / rotation readiness (dual-read)

### 5.1 목표
subject_ref/furef mint secret(`<SVC>_SUBJECT_SECRET`, `<SVC>_FUREF_SECRET`)의 **세대 교체(rotation)** 를 무중단·무손실로 가능하게 하는 **읽기 준비(readiness)** 설계. (실제 rotation 실행·real secret 접근은 Hard Stop.)

### 5.2 dual-read 모델
- **V1 실태 (정직 표기):** `secret_version`은 **현재 라벨이다(전 행 default 1)** — 어느 secret 세대로 HMAC했는지의 mint 파생과 아직 **미결합**이다. 실 rotation 결합은 **pre-prod G3로 이월**되었고, 본 절은 그 **설계 예고**다.
- 각 매핑 행은 `secret_version`(int)을 보유. 앱은 활성 세대 집합 `{active_versions}`를 config로 안다(값 아님·세대 번호만).
- **read 경로:** 입력 ref로 `active_versions` 각 세대의 HMAC을 계산 → `subject_ref_map`에서 매칭되는 행을 찾는다(구세대·신세대 **둘 다 read**).
- **write 경로:** 항상 **최신(primary) 세대**로만 mint하여 기록.
- 이렇게 하면 rotation 기간 동안 구세대로 만들어진 subject도 계속 조회되고, 신규는 신세대로 축적된다.

### 5.3 rotation 단계(설계상 순서 — 실행 아님)
| 단계 | 상태 | read | write |
|---|---|---|---|
| S0 | single | v(k) | v(k) |
| S1 | dual-read | v(k), v(k+1) | v(k+1) |
| S2 | backfill(옵션) | v(k), v(k+1) | v(k+1) |
| S3 | retire | v(k+1) | v(k+1) |

- **★Leo 결정 필요:** S2 backfill(구세대 매핑을 신세대로 재계산) 수행 여부·시점. prod backfill은 Hard Stop(별도 release train).
- **R-SEC-1:** secret 실값은 print/commit/log/문서화 금지. `.env.example`은 key 이름만(`COSMILE_SUBJECT_SECRET=`, `COSMILE_FUREF_SECRET=` 등), 실값 0. (security 가드레일 상속.)
- **R-SEC-2:** verification evidence는 boolean/count/status만 — raw secret·raw hash·PII 금지.

---

## 6. sqlite migration 잔재 정리 (migrations_legacy_sqlite)

### 6.1 배경
Cosmile는 postgres schema/validate 수준으로 이행 중이며, 초기 개발기의 **sqlite 기반 migration/잔재**가 남아 있을 수 있다. 이 잔재가 postgres invariant와 충돌하지 않도록 **격리·정리**한다.

### 6.2 설계
- 잔재를 삭제-먼저 하지 않는다. **격리 디렉터리/네임스페이스** `migrations_legacy_sqlite/`로 이동(quarantine)하고, 활성 migration graph에서 분리한다.
- 활성 postgres migration은 `migrations/`(provider=postgres)만 포함한다. legacy sqlite 파일은 **실행 경로에서 제외**하되 history 보존을 위해 삭제하지 않고 표식만 남긴다(CLAUDE.md: "관련 없는 dead code는 삭제하지 말고 언급만").
- **R-MIG-1:** sqlite 전용 타입/함수(예: `AUTOINCREMENT`, `datetime('now')`) 사용 잔재가 postgres migration에 섞이지 않았는지 **정적 스캔**(문자열 grep은 trigger/backstop 용도, 최종 판단은 리뷰).
- **R-MIG-2:** legacy 잔재로 인한 테이블/인덱스 중복 생성 여부를 pre-gate(§8)에서 확인.
- **★Leo 결정 필요:** `migrations_legacy_sqlite/`를 (a) repo에 quarantine 보존, (b) 별도 archive 브랜치로 이동. 초안 = (a).

---

## 7. provider-independent 테스트 vs DB-touch integration 테스트 분리

### 7.1 원칙
"통과하는 테스트는 보호 대상 계약·경계·위험을 증명할 때만 의미가 있다"(TEST_MEANING_POLICY 상속). DB invariant는 **두 층으로 분리**해 검증한다.

### 7.2-A provider-independent 테스트 (DB 무접촉)
- 대상: mint 규격(subject_ref/furef prefix·길이·HMAC 결정성), promotion evidence/confidence 규칙, safety-priority 판정 로직, enum/스키마 계약.
- 특성: **실제 postgres 없이** 실행(in-memory/mock/pure function). control workspace 기본 실행 경로.
- Foundation runner·Cosmile readiness(164/164)·loop eval과 동일한 no-DB 성격.

### 7.2-B DB-touch integration 테스트 (ephemeral DB only)
- 대상: partial unique(UC-SRM-1) 실동작, FK ON DELETE RESTRICT, zero-orphan 카운터, dual-read 조회.
- 특성: **일회용(ephemeral) 테스트 DB**(docker/임시 schema)에서만. **prod DB 무접촉**(Hard Stop). CI에서 별도 job으로 격리.
- **명시적 게이팅:** DB-touch 테스트는 `RUN_DB_INTEGRATION=1` 등 explicit flag가 있을 때만 수행(기본 skip이 아니라 **분리 실행**; 이유를 리포트에 명시).

### 7.3 분리 표
| 구분 | 실행 대상 | prod 접촉 | 기본 실행 | 검증하는 invariant |
|---|---|---|---|---|
| provider-independent | pure/mock | 없음 | 항상 | INV-DB-1 규격부, INV-DB-2 규칙, INV-DB-3 규칙 |
| DB-touch integration | ephemeral pg | **금지** | flag 시 | UC-SRM-1/2, FK RESTRICT, zero-orphan, dual-read |

- **R-TEST-1:** DB-touch 테스트가 없다는 이유로 provider-independent 테스트의 assertion을 약화하지 않는다(둘은 대체 관계 아님·보완 관계).
- **R-TEST-2:** integration 테스트 evidence도 boolean/count/status만 리포트(raw row dump·PII 금지).

---

## 8. "migrate deploy" pre-gate 체크리스트

> 아래는 `migrate deploy`(postgres 스키마 적용)를 **실행하기 전** 통과해야 하는 gate다.
> ★이 문서는 gate "정의"만 한다. 실제 `migrate deploy` / prod migration 실행은 **Hard Stop**(별도 승인 release train).

| # | 게이트 항목 | 통과 기준 | 실패 시 |
|---|---|---|---|
| G1 | migration graph 정합 | 활성 `migrations/`만 postgres 대상, `migrations_legacy_sqlite/` 격리됨(§6) | STOP |
| G2 | sqlite 잔재 스캔 | postgres migration에 sqlite 전용 구문 0건(R-MIG-1) | STOP |
| G3 | partial unique 정의 존재 | UC-SRM-1(`WHERE ...IS NOT NULL`) DDL 포함, UC-SRM-2 포함 | STOP |
| G4 | FK/zero-orphan 정의 존재 | memory→subject_ref_map FK RESTRICT DDL 포함(§4) | STOP |
| G5 | secret_version 컬럼/인덱스 | `secret_version` 컬럼 + dual-read 조회 가능 형태(§5) | STOP |
| G6 | invariant counter 준비 | INV-DB-1/2/3 검증 쿼리 3종 준비·ephemeral DB에서 0 위반(§2,§7-B) | STOP |
| G7 | provider-independent 테스트 | 전건 PASS(7.2-A) | STOP |
| G8 | DB-touch integration(ephemeral) | flag 실행 시 UC-SRM-1/FK/zero-orphan/dual-read PASS | STOP |
| G9 | secret hygiene | 실 secret 값 노출 0, `.env.example` key-only(R-SEC-1/2) | STOP |
| G10 | Hard Stop 무접촉 확인 | prod DB·real Vault·main merge·live·external release 미접촉 | STOP |
| G11 | rollback 계획 | down-migration/rollback 경로 문서화, dual-read로 무손실 복귀 가능 | STOP |
| G13 | **COSMILE-4 baseline 3종** | §2-B C4-1/C4-2/C4-3 DDL이 baseline migration에 포함(INV-DB-1/2/3 카운터와 별개로 각각 확인) | STOP |
| G12 | Leo 승인 | ★Leo 결정 필요 항목 전부 결정 + migrate deploy 실행 승인 | STOP(승인 없이는 실행 금지) |

- G12는 CLAUDE.md §1.6/§2.5·design-first rule 상속: **승인 없이 migrate deploy를 실행하지 않는다.**
- 이 체크리스트 통과 = "실행 준비 완료(readiness)"일 뿐, **실행 자체가 아니다.**

---

## 9. open questions / ★Leo 결정 필요 요약

1. **★** INV-DB-2 임계값: `N_min=2`, `C_min=0.60`(사전 §3 정본 — 구 초안 0.70은 superseded — 사전 §3), `distinct_signal_source_count>=2` — 최종 확정은 사전 §4 파라미터 표(★Leo).
2. (해소·superseded) SubjectRefMap legacy `secret_version IS NULL` 처리 — 실물 스키마 NOT NULL DEFAULT 1로 거짓 전제였음(§2-B C4-1). 잔여 gap = §5.2 mint 파생 결합(pre-prod G3 이월).
3. **★** rotation S2 backfill 수행 여부·시점(dual-read만으로 충분한지).
4. **★** `migrations_legacy_sqlite/` 처리: quarantine 보존 vs archive 브랜치 이동(초안 quarantine).
5. **★** DB-touch integration 실행 환경: docker ephemeral vs 임시 schema, CI job 분리 방식.
6. **★** `RUN_DB_INTEGRATION` 게이팅 flag 이름/기본값 확정.

---

## 무결성

- 본 문서는 **design-only** — 코드/DDL 실행·`migrate deploy`·prod migration을 수행하지 않는다.
- **Memory V1 Option B 상속**(subject_ref/furef service-local mint). **Option A / FOUNDATION_SUBJECT_REF_SECRET mint 미상속(superseded).**
- **Foundation = validate/gate/reasoning ONLY** — durable customer memory DB 아님, service DB 직접 read 아님. minimized request-scoped memory_context만 전달(raw_text_stored=False).
- **service-local ownership** — Cosmile/SIASIU 각자 memory+commerce 소유, cross-schema 직접참조 금지.
- **safety-first** — adverse-reaction/"계속 써도 돼?"류는 commerce/revenue 최적화보다 우선, medical assertion 금지.
- Cosmile는 **schema/validate 수준** — "real DB integration complete"라고 말하지 않는다.
- **no prod / no live / no main merge / no real secret·Vault / no external release** — 전부 Hard Stop, 이 문서 무접촉.
- 검증 evidence = boolean/count/status만(raw secret·hash·PII·row dump 금지). 불확실하면 STOP·Leo 확인.
