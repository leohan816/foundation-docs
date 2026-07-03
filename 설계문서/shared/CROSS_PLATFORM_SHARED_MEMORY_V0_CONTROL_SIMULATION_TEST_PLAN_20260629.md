# Cross-Platform Memory Unification v0 — Control Simulation Test Plan — 2026-06-29

> Workspace: `/home/leo/Project/foundation-control` (CONTROL workspace / control tower, **NOT** a product repo).
> 단일 계약(single source of truth): `contracts/CROSS_PLATFORM_SHARED_MEMORY_CONTRACT_V0.md` (role-corrected). 역할 경계: `docs/CROSS_PLATFORM_SHARED_MEMORY_ROLE_BOUNDARY_20260629.md`. 본 문서는 그 계약과 **100% 일치**한다.
> Scope: foundation-control 안에서 도는 **synthetic-subject end-to-end 시뮬레이션** 정의 — **두 개의 구분된 입력원**(Cosmile **PlatformEventSignal** + SIASIU **ConsultationMemoryCandidate**) → Foundation gate **도출/판정** → shadow write → scoped read → delete → expire.
> ★v0 = **synthetic subject only · dev / shadow · NO real user exposure**. 모든 객체 `applied_to_real_user=false`, `write_live=false`.
> Method: read-only / mock / shadow only. 빌드 전까지는 **mock adapter**, repo-local 구현이 생기면 `repos/{cosmile,siasiu,foundation}` **심링크의 realpath** 로 import(shadow). **product repo 파일은 절대 수정하지 않는다.**
> 근거 inventory: `reports/integrated/CUSTOMER_IDENTITY_SHARED_MEMORY_BOUNDARY_INVENTORY_20260629.md`.

---

## ★ ROLE CORRECTION (binding · 2026-06-29)

본 test plan은 **역할 경계 정정**을 반영한다. 이전 표현("Cosmile/SIASIU가 둘 다 memory candidate 제안")은 **정정**되었다. 입력원은 **서로 다른 두 종류**다:

| 주체 | 역할 (정정) | 내보내는 것 | MUST NOT |
|---|---|---|---|
| **Cosmile** | commerce/platform **EVENT SIGNAL OUTBOX**만 | `PlatformEventSignal` (product_view/wishlist/cart/purchase/consultation_session_meta) · **집계/범주 ref + hash만** · raw/PII 없음 | ★customer memory 추출 · personalization · 추론/장기기억 승격 · "이 고객은 X" memory candidate 생성 · `memory_kind`/해석 부여 · 원문/PII 전송. `interprets_customer=false`, `memory_candidate=false`. |
| **SIASIU** | consultation **MEMORY CANDIDATE** 어댑터 | `ConsultationMemoryCandidate` (distilled question/answer/evidence_refs/hash만) | ★raw 상담원문/PII Foundation 전송 · 자체 저장/판정 · answer.py 변경(fingerprint `d7f579443f8a110a` 불변). |
| **Foundation** | 해석·**memory 도출**·gate·identity·consent/scope/retention 소유 | signal+candidate 수신 → **gate로만** memory 도출 → 요약/refs/hash **shadow write** | ★원문/PII 저장(`raw_text_stored=false` 강제) · canonical/learned/Vault write · real customer memory write. |

핵심: **Cosmile signal ≠ memory candidate.** Cosmile은 고객을 해석하지 않으며 `memory_kind`/interpretation/PII를 **절대** 싣지 않는다. signal로부터 memory를 도출할지는 **Foundation gate가 단독으로** 결정한다. SIASIU candidate는 distilled(원문/PII 0)만 싣는다. **Foundation 안의 raw_text = 0.**

> 이 plan에서 "candidate"는 문맥상 (a) SIASIU `ConsultationMemoryCandidate` 또는 (b) Foundation이 Cosmile signal/SIASIU candidate로부터 **gate 내부에서 도출한** 내부 memory candidate를 가리킨다. **Cosmile은 candidate를 만들지 않는다.**

---

## 0. 목적 / Purpose

본 문서는 control tower(foundation-control)가 **직접 실행**하는 Cross-Platform Memory Unification v0 시뮬레이션의 테스트 전략을 정의한다. 시뮬레이션은 **두 개의 구분된 입력원**(Cosmile이 **PlatformEventSignal**을 outbox로 emit · SIASIU가 **ConsultationMemoryCandidate**를 distilled로 제안)으로부터 Foundation **memory gate가 도출·판정**하는 전 흐름을, 합성 subject로만, dev/shadow로만 재현한다. 핵심 원칙 네 가지:

1. **두 입력원 분리(role-corrected).** Cosmile = **event signal outbox만**(`interprets_customer=false`, `memory_candidate=false`, `memory_kind`/해석/PII 없음). SIASIU = **consultation memory candidate**(distilled, raw/PII 없음). **Cosmile은 memory candidate를 만들지 않는다.**
2. **EMIT/PROPOSE vs DERIVE/DECIDE 분리.** Cosmile은 signal을 **emit만**, SIASIU adapter는 candidate를 **제안만** 한다. signal로부터 memory를 **도출(derive)** 할지, 그리고 allow/block/session_only/ask_consent/delete/expired **판정은 오직 Foundation memory gate**가 내리며 **fail-closed**다. caller는 verdict를 **소비만** 한다.
3. **No raw / No PII / No live.** Foundation은 **원문/PII를 저장하지 않는다**(`raw_text_stored=false` 불변식, **Foundation 안의 raw_text=0**). 모든 signal/candidate/decision/read는 `applied_to_real_user=false`, `write_live=false`. `write_approved_memory`는 **shadow**(`written=false`)다.
4. **Control-tower 단독 실행 · product repo 무침해.** 시뮬레이션은 control workspace에서만 돈다. product repo(FOUNDATION/SIASIU/Cosmile)는 본 train에서 **수정되지 않는다**. 실제 repo-local 구현은 각 repo Claude Code에게 **handoff된 impl prompt**(Leo 승인 · dev/shadow)의 몫이다.

### 0.1 CLOSED / 별도 release train — 본 train에서 절대 enabled 아님 (전부 DISABLED)

아래는 모두 **DISABLED**이며 각각 별도 게이트 + 사람(Leo) 승인 release train이 필요하다. 본 v0 시뮬레이션은 이들 중 **어느 것도 활성화하지 않는다**:

| CLOSED 항목 | 상태 |
|---|---|
| production live | **DISABLED** |
| public API live | **DISABLED** |
| real customer memory write (실 고객 메모리 영속 write) | **DISABLED** |
| customer PII storage (고객 평문 PII 저장) | **DISABLED** |
| 상담 원문(상담원문) Foundation 저장 | **DISABLED** |
| checkout / order / customer DB write | **DISABLED** |
| canonical / learned / Vault write | **DISABLED** |
| real user exposure (실 사용자 노출) | **DISABLED** |

본 v0는 control workspace 내부의 **synthetic-subject shadow 검증 레이어**일 뿐이다.

---

## 1. 시뮬레이션 대상 / System Under Test

control workspace에 격리된 시뮬레이션 패키지 `memory_uni/`(기존 `cosmile_loop/` · `caller_intake/` · `foundation_consultation/`와 동일한 격리 규약을 따름; `foundation` 네임스페이스를 **생성하지 않는다**)를 SUT로 둔다. 이 패키지는 계약 §2의 Foundation API를 in-process/dev/shadow로만 모사·구동한다.

| 레이어 | 모듈(예시, control 내부) | 역할 | adapter 출처 |
|---|---|---|---|
| Synthetic subject fixtures | `memory_uni/synthetic_subjects.py` | 합성 subject 4종 + consent record 생성 (평문 PII 없음) | control 내부 |
| Cosmile **signal outbox** adapter (role-corrected) | `memory_uni/cosmile_signal_outbox_adapter.py` | commerce/platform event → `PlatformEventSignal` **emit만** (집계/범주 ref + hash, **raw/PII/memory_kind/interpretation 금지**, `interprets_customer=false`·`memory_candidate=false`) | **mock** 우선 → 빌드 후 `repos/cosmile` realpath(shadow) |
| SIASIU **consultation** memory candidate adapter | `memory_uni/siasiu_candidate_adapter.py` | consultation distilled → `ConsultationMemoryCandidate`(concern/reaction/decision_history/safety_note) **제안** (hash/refs only, **raw 원문 SIASIU-local**) | **mock** 우선 → 빌드 후 `repos/siasiu` realpath(shadow) |
| Foundation **signal→memory derivation** (gate 내부) | `memory_uni/foundation_memory_gate.py` (도출부) | Cosmile signal로부터 memory candidate를 **gate 내부에서만** 도출(또는 미도출). Cosmile은 도출에 관여 안 함 | **mock** 우선 → 빌드 후 `repos/foundation` realpath(shadow) |
| Foundation subject identity | `memory_uni/foundation_subject_store.py` | `resolve_subject` — salted hash `subject_ref` 발급, consent 없으면 link 안 함 | **mock** 우선 → 빌드 후 `repos/foundation` realpath(shadow) |
| Foundation memory gate | `memory_uni/foundation_memory_gate.py` | `gate_decision` — fail-closed 판정 + reason_codes | **mock** 우선 → 빌드 후 `repos/foundation` realpath(shadow) |
| Foundation shared memory store | `memory_uni/foundation_memory_store.py` | `write_approved_memory`(shadow `written=false`) · `read_memory`(scoped, 요약만) · `delete_memory`(shadow) · `expire_sweep`(shadow) | **mock** 우선 → 빌드 후 `repos/foundation` realpath(shadow) |
| Orchestrator | `memory_uni/memory_unification_sim.py` | end-to-end 흐름 구동 (`run_memory_sim`) | control 내부 |

> **Mock-first, symlink-later.** 오늘 시점 repo-local 구현이 없으므로 adapter는 **mock**이다. 각 repo Claude Code가 handoff된 impl prompt로 구현을 완료하면, control tower는 `repos/<repo>` 심링크의 **realpath**로 read-only/shadow import하여 동일 시뮬레이션을 재실행한다(SIASIU `foundation.*` 네임스페이스 충돌은 별도 서브프로세스로 격리). 어느 경우에도 **product repo 파일은 수정/삭제하지 않으며**, live/write도 0이다.

### 1.1 Feature flag posture

- `memory_unification_v0_enabled = False` (기본 OFF). 시뮬레이션은 테스트 한정 임시 ON context로만 구동하고 `finally`에서 복원한다(영구 ON 없음).
- HARD_OFF(코드 강제 OFF): `real_customer_memory_write`, `customer_pii_storage`, `raw_consultation_storage`, `checkout_order_customer_db_write`, `canonical_write`, `learned_promotion`, `vault_write`, `api_live`, `production_live`, `real_user_exposure`.

---

## 2. 검증 대상 계약 표면 (계약 §1–§3, EXACT 재현)

### 2.1 MemoryCandidate Schema — 모든 구현·시뮬레이션 동일 (필드명 변경 금지)

```jsonc
{
  "subject_ref": "subj_<salted-hash>",          // Foundation 소유 global subject id (평문 PII 없음)
  "source_service": "cosmile | siasiu",
  "local_user_ref": "<platform-local opaque ref>", // 플랫폼 로컬 식별자(평문 PII 아님; subject_ref 해석은 Foundation)
  "memory_candidate_id": "mc_<id>",
  "memory_kind": "preference | concern | reaction | decision_history | outcome_feedback | safety_note",
  "sensitivity_level": "low | normal | sensitive | high",   // condition/reaction = sensitive↑
  "consent_scope": "none | same_service | cross_service | foundation_only",
  "retention_policy": "session | short_ttl | standard_ttl | revocable",
  "raw_text_stored": false,                       // ★항상 false (불변식)
  "raw_text_hash": "sha256:<hex>",                // 원문 대신 hash (또는 content_hash)
  "content_hash": "sha256:<hex>",
  "evidence_refs": ["src:...", "prov:..."],       // refs/hash만 (raw 본문 없음)
  "created_from": "consultation | commerce_event | profile_update | feedback",
  "write_intent": "candidate_only | approved_memory | session_only",
  "gate_decision": "allow | block | session_only | ask_consent | delete | expired",  // Foundation gate가 채움
  "read_scope": "same_service | cross_service | foundation_only",
  "applied_to_real_user": false,                  // ★불변식
  "write_live": false                             // ★불변식
}
```

불변식(시뮬레이션이 코드로 강제·검증): `raw_text_stored=false`, `applied_to_real_user=false`, `write_live=false`. 원문/PII 필드(query/body/email/phone/RRN/customer_name)가 candidate에 들어오면 gate가 즉시 `block`.

> ★위 `MemoryCandidate` schema는 **SIASIU `ConsultationMemoryCandidate`** 와 **Foundation이 gate 내부에서 도출한 내부 candidate**에 적용된다. **Cosmile은 이 schema를 생성하지 않는다** — Cosmile은 아래 §2.1a `PlatformEventSignal`만 emit한다.

### 2.1a Cosmile PlatformEventSignal Schema (계약 §4, role-corrected) — ★memory candidate 아님

Cosmile이 emit하는 유일한 객체. **memory_kind/해석/PII/raw_text 없음.** 집계/범주 ref + hash만.

```jsonc
{
  "subject_ref": "subj_<salted-hash>",
  "source_service": "cosmile",
  "local_user_ref": "<opaque>",
  "signal_id": "sig_<id>",
  "event_kind": "product_view | wishlist | cart | purchase | consultation_session_meta",
  "aggregate": { "category_ref": "cat:...", "count": 0, "recency_bucket": "..." }, // 집계/범주 ref만 — 원문/PII/금액상세/주문ID 금지
  "evidence_refs": ["ref:..."],
  "created_from": "commerce_event",
  "raw_text_stored": false,
  "interprets_customer": false,   // ★Cosmile은 고객을 해석하지 않는다
  "memory_candidate": false,      // ★signal ≠ memory candidate
  "applied_to_real_user": false,
  "write_live": false
}
```

시뮬레이션이 코드로 강제·검증하는 **Cosmile signal 금지 필드**(존재하면 즉시 FAIL): `memory_kind`, `sensitivity_level`, `gate_decision`, `write_intent`, `consent_scope`(주장), `raw_text`/`raw_text_hash`(원문), 그리고 모든 PII(query/body/email/phone/RRN/customer_name) 및 금액상세/주문ID. **반드시** `interprets_customer=false`, `memory_candidate=false`. Cosmile은 Foundation verdict를 **표시(소비)만** 하며 memory 도출을 주장하지 않는다.

### 2.2 Foundation Shared Memory API (계약 §2) — in-process / dev / shadow only

| method | 입력 | 출력 | 시뮬레이션 관측 포인트 |
|---|---|---|---|
| `resolve_subject(source_service, local_user_ref, consent_record)` | 플랫폼 로컬 ref | `subject_ref`(salted hash) | consent 없으면 **link 안 함**(fail-closed) |
| `ingest_platform_signal(signal)` (Cosmile) | `PlatformEventSignal` | `{signal_id, status:received}` | **저장/해석 아님** · signal 금지필드 존재 시 거부 |
| `derive_candidate_from_signal(signal)` (Foundation 내부) | `PlatformEventSignal` | 내부 memory candidate 또는 **none** | ★도출은 **Foundation 단독** · Cosmile 미관여 · 도출분도 §3 gate 통과 |
| `propose_memory_candidate(candidate)` (SIASIU) | `ConsultationMemoryCandidate` | `{memory_candidate_id, status:received}` | **저장 아님** — gate 대기 |
| `gate_decision(candidate)` | MemoryCandidate | `gate_decision` + reason_codes | §3 우선순위대로 판정되는지 |
| `write_approved_memory(candidate)` | gate=allow candidate | `{written:false (shadow), memory_ref}` | ★`written=false` — 실제 write 0 |
| `read_memory(subject_ref, read_scope, requesting_service)` | scope | 요약 memory 목록(원문 없음) | scope 위반 → block |
| `delete_memory(subject_ref, memory_ref)` | | `{deleted:true (shadow), must_not_reappear:true}` | 삭제 후 재등장 0 |
| `expire_sweep(subject_ref)` | | expired 처리(shadow) | TTL 경과분 expired |

### 2.3 Memory Gate 판정 우선순위 (계약 §3, fail-closed) — 시뮬레이션의 기대 oracle

| 우선 | 조건 | 기대 `gate_decision` | reason_code |
|---:|---|---|---|
| 1 | raw/PII 필드 존재 또는 `raw_text_stored!=false` | **block** | `raw_text_present` |
| 2 | cross-customer / subject mismatch | **block** | `cross_subject_isolation` |
| 3 | deleted/blocked/expired(미reconfirm) memory 재사용 | **delete / expired** | `deleted_reuse` / `expired_reuse` |
| 4 | sensitive(concern/reaction/condition) + `consent_scope=none` | **ask_consent** | `consent_required` |
| 5 | high sensitivity + 미reconfirm | **block** | `high_sensitivity_unconfirmed` |
| 6 | `retention_policy=session` 또는 `write_intent=session_only` | **session_only** | `session_scope` |
| 7 | 그 외 + consent 충족 + evidence refs 유효 | **allow** (단, shadow write) | `allow_shadow` |

> ★preference/outcome_feedback는 evidence를 upgrade하지 않고 safety를 override하지 않는다(기존 CDM 정책 상속). 시뮬레이션은 이를 별도 invariant로 검증한다.

---

## 3. 합성 Subject / Synthetic Subjects (4종)

모든 subject는 **합성**이며 평문 PII가 없다. `subject_ref`는 Foundation이 소유하는 salted hash다. consent record도 합성이다.

| # | 합성 subject 유형 | 구성 | `resolve_subject` 기대 | 핵심 검증 |
|---|---|---|---|---|
| S1 | **Cosmile-only** | `source_service=cosmile`만, SIASIU local_user_ref 없음 | 단일 service 매핑 `subj_*` | cross_service read 시도 → consent_scope=cross_service 없으면 **block** |
| S2 | **SIASIU-only** | `source_service=siasiu`만, Cosmile local_user_ref 없음 | 단일 service 매핑 `subj_*` | Cosmile 쪽에서 이 subject 읽기 → **block**(cross_subject_isolation) |
| S3 | **Linked-with-consent** | Cosmile + SIASIU local_user_ref 둘 다, consent record = cross_service 동의 | 두 ref가 **같은** `subj_*`로 link | cross_service scoped read 양방향 **allow** (dual-vertical) |
| S4 | **Linked-without-consent** | Cosmile + SIASIU local_user_ref 둘 다, **consent record 없음/부족** | **link 안 함**(fail-closed); 서로 다른 subject로 유지 | cross_service read/candidate → **ask_consent** 또는 **block**, 절대 자동 link 0 |

> S4(linked-without-consent)는 fail-closed의 핵심 음성 케이스다: consent가 없으면 Foundation은 두 플랫폼 ref를 **연결하지 않으며**, 한쪽 candidate가 상대 service로 새는 일이 0이어야 한다.

---

## 4. 시나리오 흐름 / Scenario Flow (candidate → gate → shadow-write → scoped-read → delete → expire)

각 합성 케이스는 아래 파이프라인을 통과한다. 입력원이 **둘로 나뉘는** 점(Cosmile signal vs SIASIU candidate)을 ⓪/① 단계가 반영한다. 모든 스텝에서 `applied_to_real_user=false`, `write_live=false`가 유지되는지 관측한다.

| 스텝 | 동작 | API | 기대 / 관측 |
|---|---|---|---|
| ⓪ₐ signal emit (Cosmile) | Cosmile adapter가 `PlatformEventSignal` **emit만**(집계/범주 ref + hash) | `ingest_platform_signal` | `status:received` · `interprets_customer=false`·`memory_candidate=false` · **memory_kind/해석/PII/raw 0** |
| ⓪_b signal→derive (Foundation) | Foundation이 signal로부터 memory candidate를 **gate 내부에서만** 도출(또는 none) | `derive_candidate_from_signal` | 도출은 **Foundation 단독**(Cosmile 미관여) · 도출분도 §3 gate 통과 |
| ① propose (SIASIU) | SIASIU adapter가 `ConsultationMemoryCandidate` **제안**(distilled, raw 원문 SIASIU-local, PII 0) | `propose_memory_candidate` | `status:received`, **저장 아님** |
| ② gate | Foundation gate가 §3 우선순위로 판정(signal-도출분 + SIASIU candidate 공통) | `gate_decision` | `gate_decision` + reason_codes, fail-closed |
| ③ shadow-write | gate=allow일 때만 | `write_approved_memory` | `written=false` (shadow), `memory_ref` 발급, 요약만 |
| ④ scoped-read | requesting_service가 scope대로 읽기 | `read_memory` | scope 준수 시 요약 반환, 위반 시 **block** |
| ⑤ delete | 삭제 전파 시뮬레이션 | `delete_memory` | `deleted=true (shadow)`, `must_not_reappear=true` |
| ⑥ expire | retention TTL 경과분 sweep | `expire_sweep` | expired 처리(shadow), 재사용 0 |

### 4.1 Dual-vertical (양 vertical candidate source)

`DUAL_VERTICAL_TEST_POLICY_20260629.md`에 따라, 공유 안전 속성은 **두 vertical 모두**에서 검증한다. ★단, 입력원의 **역할은 비대칭**이다(role-corrected).

- **Cosmile(commerce-first) = SIGNAL source(메모리 도출원 아님)**: `event_kind = product_view | wishlist | cart | purchase | consultation_session_meta`를 **집계/범주 ref + hash**로만 `PlatformEventSignal` emit. **`memory_kind`/해석/PII 없음** · `interprets_customer=false` · `memory_candidate=false`. 이 signal로부터 `preference`(선호 카테고리)·`outcome_feedback`(만족도 요약) 등 memory를 도출할지는 **Foundation gate가 단독 결정**하며, 도출 시에도 Cosmile은 관여하지 않는다.
- **SIASIU(consultation-first) = CANDIDATE source**: `created_from = consultation | feedback | profile_update`. 상담 distilled(question/answer/evidence_refs/hash)만 → `ConsultationMemoryCandidate`(`memory_kind = concern | reaction | decision_history | safety_note`). **answer.py 무변경(fingerprint `d7f579443f8a110a`) · 상담 원문 SIASIU-local · Foundation 미전송**(hash/refs only).
- **Linked subject(S3) 양방향**: Cosmile signal → Foundation 도출 memory → SIASIU scoped read(cross_service, consent 충족 시)와, SIASIU candidate → Foundation memory → Cosmile scoped read(verdict 표시·소비)를 모두 구동하여, 한 subject의 메모리가 두 소비 경로 모두에서 안전하게 동작함을 증명한다. Cosmile 측 경로는 **read/소비 only**(write/해석 0).

---

## 5. 테스트 매트릭스 / Test Matrix (>=100 synthetic cases)

축: `memory_kind` × `sensitivity_level` × `consent_scope` × `write_intent` × 기대 `gate_decision` × **input_source**(cosmile_signal / siasiu_candidate / foundation_derived). 합성 케이스를 **블록 단위**로 분배하여 모든 축 값과 6개 gate_decision을 전부 커버한다. 목표 **>=100** → 본 plan 분배 = **150**(역할정정 블록 J·K·L 30 포함).

| 블록 | 케이스 | memory_kind(주) | sensitivity | consent_scope | write_intent | 기대 gate_decision | subject |
|---|---:|---|---|---|---|---|---|
| A. allow_baseline | 24 | preference / decision_history / outcome_feedback | low / normal | same_service / cross_service / foundation_only | candidate_only / approved_memory | **allow** | S1·S2·S3 |
| B. raw_pii_block | 16 | (any) + 주입된 raw/PII 필드 또는 `raw_text_stored=true` | any | any | any | **block** (`raw_text_present`) | S1·S2·S3·S4 |
| C. cross_subject_block | 12 | (any) | any | same_service | any | **block** (`cross_subject_isolation`) | S1·S2·S4 |
| D. ask_consent | 16 | concern / reaction | sensitive | **none** | candidate_only | **ask_consent** (`consent_required`) | S1·S2·S4 |
| E. high_block | 12 | concern / reaction / safety_note | **high** (미reconfirm) | any | any | **block** (`high_sensitivity_unconfirmed`) | S1·S2·S3 |
| F. session_only | 12 | preference / concern | normal / sensitive | same_service | **session_only** 또는 retention=session | **session_only** (`session_scope`) | S1·S2·S3 |
| G. delete_propagation | 10 | (any) deleted/blocked memory 재사용 시도 | any | any | approved_memory | **delete** (`deleted_reuse`) | S1·S2·S3 |
| H. expired_sweep | 10 | (any) retention TTL 경과·미reconfirm 재사용 | any | any | approved_memory | **expired** (`expired_reuse`) | S1·S2·S3 |
| I. dual_vertical_linked | 8 | preference / concern / decision_history | low / sensitive | **cross_service** (S3) / **none** (S4) | candidate_only / approved_memory | **allow**(S3 consent OK) / **ask_consent·block**(S4) | S3·S4 |
| **J. cosmile_signal_role** (★role) | 12 | **N/A — signal엔 memory_kind 없음** | n/a | n/a(주장 금지) | n/a | signal 통과(`interprets_customer=false`·`memory_candidate=false`) → 도출분만 gate. 금지필드(memory_kind/해석/PII/raw) 주입 시 **reject/block** (`cosmile_signal_role_violation`) | S1·S3 |
| **K. siasiu_distilled_role** (★role) | 10 | low / sensitive | normal / sensitive | same_service / cross_service | candidate_only | distilled candidate **allow/ask_consent**; raw 원문/PII 주입 시 **block** (`raw_text_present`) · answer.py fingerprint 불변 | S2·S3 |
| **L. foundation_derive_only** (★role) | 8 | preference / outcome_feedback (signal-도출) | low / normal | same_service / cross_service | candidate_only | Cosmile signal → **Foundation gate가 도출**할 때만 memory화(allow/none). Cosmile 주장 도출 = **무시/block** | S1·S3 |
| **합계** | **150** | — | — | — | — | 6 decision 전부 present | 4 subject 전부 |

### 5.1 축 커버리지 (모든 enum 값 ≥1 케이스)

| 축 | 값 | 커버 블록 |
|---|---|---|
| `memory_kind` | preference, concern, reaction, decision_history, outcome_feedback, safety_note | A·D·E·F·G·H·I (6종 전부) |
| `sensitivity_level` | low, normal, sensitive, high | A(low/normal)·D/F(sensitive)·E(high) |
| `consent_scope` | none, same_service, cross_service, foundation_only | A(same/cross/foundation)·C/F(same)·D/I-S4(none)·I-S3(cross) |
| `retention_policy` | session, short_ttl, standard_ttl, revocable | F(session)·H(short/standard TTL 경과)·A/G(standard/revocable) |
| `write_intent` | candidate_only, approved_memory, session_only | A/D/I(candidate)·A/G/H/I(approved)·F(session) |
| `gate_decision` | allow, block, session_only, ask_consent, delete, expired | A·I·L(allow)·B·C·E·J·K(block)·F(session_only)·D·K(ask_consent)·G(delete)·H(expired) |
| **input_source** (★role) | cosmile_signal, siasiu_candidate, foundation_derived | J(cosmile_signal)·K(siasiu_candidate)·L(foundation_derived from signal) |

`all_gate_decisions_present = true`(6종 전부), `all_memory_kinds_present = true`(6종 전부), `all_input_sources_present = true`(3종 전부) 가 게이트 조건.

### 5.2 ★Role-correction 검증 oracle (블록 J·K·L — binding)

역할 경계 정정이 코드로 강제되는지 별도 oracle로 검증한다. 아래 모든 카운터는 **0**이어야 한다.

| # | 검증 항목 | 정의 | 기대 |
|---|---|---|---|
| R1 | `cosmile_signal_carries_memory_kind` | Cosmile `PlatformEventSignal`에 `memory_kind`/`sensitivity_level`/`write_intent`/`gate_decision` 필드 존재 | **0** |
| R2 | `cosmile_signal_carries_interpretation` | signal에 해석/추론/"이 고객은 X"/personalization payload 존재, 또는 `interprets_customer!=false` | **0** |
| R3 | `cosmile_signal_carries_pii_or_raw` | signal에 PII(email/phone/RRN/name/query/body) 또는 원문/금액상세/주문ID 존재 | **0** |
| R4 | `cosmile_memory_candidate_flag` | signal의 `memory_candidate!=false` (Cosmile이 candidate를 주장) | **0** |
| R5 | `cosmile_writes_or_derives` | Cosmile 경로가 memory write/도출/판정을 수행(Cosmile은 emit+verdict 표시만) | **0** |
| R6 | `siasiu_candidate_carries_raw_or_pii` | SIASIU `ConsultationMemoryCandidate`에 raw 상담원문 또는 PII 존재(hash/refs 외) | **0** |
| R7 | `answer_py_fingerprint_changed` | SIASIU answer.py fingerprint != `d7f579443f8a110a` | **0** |
| R8 | `memory_derived_outside_gate` | Cosmile signal/SIASIU candidate로부터의 memory 도출이 **Foundation gate 밖**에서 발생 | **0** |
| R9 | `raw_text_in_foundation` | Foundation memory/store/trace에 원문(상담원문 포함) 저장 | **0** (=§6-1) |

> R1–R5는 **Cosmile = signal outbox only**(해석·candidate·PII 0)를, R6–R7은 **SIASIU = distilled candidate only**(raw/PII 0, answer.py 불변)를, R8–R9는 **Foundation만이 gate 경유로 memory를 도출하며 raw_text를 저장하지 않음**을 강제한다. 하나라도 >0이면 게이트 FAIL(fail-closed).

---

## 6. 안전 불변식 / Safety Invariants — ALL = 0

시뮬레이션 전 케이스(120) 집계에서 아래는 **전부 0**이어야 한다. 하나라도 >0이면 게이트 FAIL(fail-closed).

| # | invariant | 정의 | 기대 |
|---|---|---|---|
| 1 | `raw_text_in_foundation` | Foundation memory/store에 원문(상담원문 포함) 저장 건수 | **0** |
| 2 | `pii_in_memory_or_trace` | memory 객체 또는 trace에 평문 PII(email/phone/RRN/name/query/body) | **0** |
| 3 | `cross_subject_leak` | subject A의 메모리가 subject B(또는 타 service)로 노출 | **0** |
| 4 | `consent_missing_sensitive_stored` | consent 없는 sensitive(concern/reaction) candidate가 저장됨 | **0** |
| 5 | `deleted_or_expired_reuse` | 삭제/만료된 memory가 read/write에서 재사용 | **0** |
| 6 | `write_live` | 어떤 객체든 `write_live=true` | **0** |
| 7 | `applied_to_real_user` | 어떤 객체든 `applied_to_real_user=true` | **0** |
| 8 | `checkout_order_customer_db_write` | checkout/order/customer DB write 발생 | **0** |

부속 불변식(역시 0): `raw_text_stored!=false` 통과 건수, `preference_or_feedback_overrides_safety`, `canonical_learned_vault_write`, `auto_link_without_consent`(S4 자동 link), `public_api_live_call`, `real_user_exposure`.

**★Role-correction 불변식(역시 전부 0, §5.2 R1–R9):** `cosmile_signal_carries_memory_kind`, `cosmile_signal_carries_interpretation`(`interprets_customer!=false`), `cosmile_signal_carries_pii_or_raw`, `cosmile_memory_candidate_flag`(`memory_candidate!=false`), `cosmile_writes_or_derives`, `siasiu_candidate_carries_raw_or_pii`, `answer_py_fingerprint_changed`, `memory_derived_outside_gate`.

> 1·2번은 **Foundation은 원문/PII를 저장하지 않는다** 불변식의 직접 검증이다(Foundation 안의 raw_text=0). raw/PII가 candidate로 들어오면 ②gate에서 `block`(`raw_text_present`)으로 잡혀 ③write에 도달하지 못한다. ★role-correction 불변식은 입력원 **자체**가 경계를 지키는지(Cosmile signal엔 memory_kind/해석/PII 0, SIASIU candidate엔 raw/PII 0, 도출은 Foundation gate 단독)를 추가로 강제한다.

---

## 7. read_scope 강제 / read_scope Enforcement (계약 §7)

`read_memory(subject_ref, read_scope, requesting_service)`의 scope 규칙을 별도 게이트로 검증한다.

| read_scope | 규칙 | 시뮬레이션 케이스 | 기대 |
|---|---|---|---|
| `same_service` | 제안 service만 읽기 | Cosmile **signal→Foundation 도출** memory → Cosmile read(소비) | **allow**(요약) |
| `same_service` (위반) | 타 service가 same_service 메모리 읽기 시도 | Cosmile signal-도출 memory → SIASIU read | **block** |
| `cross_service` | `consent_scope=cross_service`일 때만 | S3(consent OK): Cosmile↔SIASIU 상호 참조 | **allow**(요약, 원문 0) |
| `cross_service` (위반) | consent 부족인데 cross_service read | S4(consent 없음): cross read 시도 | **block** / `ask_consent` |
| `foundation_only` | Foundation 내부 trust/grounding만, **service 미노출** | foundation_only memory를 service가 read | service로 **미노출**(block) |
| (subject mismatch) | subject_ref 불일치 | S1 read가 S2 subject 지정 | **block**(`cross_subject_isolation`) |

게이트: `read_scope_violations = 0`, `cross_service_without_consent = 0`, `foundation_only_exposed_to_service = 0`.

---

## 8. retention / session_only 동작 (계약 §3·§5)

| retention_policy / write_intent | 기대 동작 | 검증 |
|---|---|---|
| `write_intent=session_only` 또는 `retention_policy=session` | gate=**session_only** → **영속 저장 안 함**. session 종료 후 read 0 | 블록 F |
| `retention_policy=short_ttl` (경과) | `expire_sweep` → **expired**, 재사용 0 | 블록 H |
| `retention_policy=standard_ttl` (경과) | `expire_sweep` → **expired**, 재사용 0 | 블록 H |
| `retention_policy=revocable` + delete | `delete_memory` → `must_not_reappear=true`, 재등장 0 | 블록 G |
| TTL 미경과 + consent OK + evidence 유효 | **allow**(shadow write) | 블록 A |

게이트: `session_only_persisted = 0`(session 메모리 영속 0), `expired_served_on_read = 0`, `deleted_reappeared = 0`.

---

## 9. 성공 기준 / Success Criteria

v0 시뮬레이션이 GREEN으로 간주되려면 아래 게이트를 **전부** 충족해야 한다.

| # | 게이트 | 기준 |
|---|---|---|
| 1 | e2e pass | `pass == total`, `fail == 0` |
| 2 | 시나리오 최소치 | `total >= 100` (본 plan 분배 150) |
| 3 | gate_decision 커버리지 | 6종(allow/block/session_only/ask_consent/delete/expired) 전부 present |
| 4 | memory_kind 커버리지 | 6종(preference/concern/reaction/decision_history/outcome_feedback/safety_note) 전부 present |
| 4b | **input_source 커버리지** (★role) | 3종(cosmile_signal / siasiu_candidate / foundation_derived) 전부 present |
| 5 | 파이프라인 | signal-emit/candidate-propose→(signal→derive)→gate→shadow-write→scoped-read→delete→expire 전부 관측 |
| 6 | 합성 subject 4종 | S1·S2·S3·S4 전부 구동 |
| 7 | dual-vertical (role-asymmetric) | Cosmile **signal** source + SIASIU **candidate** source 모두 구동, S3 양방향(Cosmile 측은 read/소비 only) |
| 7b | **role-correction** (★§5.2) | R1–R9 **전부 = 0** (Cosmile signal엔 memory_kind/해석/PII 0·`memory_candidate=false`·`interprets_customer=false`; SIASIU candidate엔 raw/PII 0·answer.py 불변; memory 도출 Foundation gate 단독; Foundation raw_text=0) |
| 8 | safety invariants (§6) | **8개 + 부속 + role-correction(R1–R9) 전부 = 0** |
| 9 | read_scope 강제 (§7) | 위반 = 0 |
| 10 | retention/session (§8) | session 영속 0, expired/deleted 재사용 0 |
| 11 | shadow write | `write_approved_memory` 전 케이스 `written=false` |
| 12 | fail-closed | consent 부족·raw/PII·mismatch 케이스 전부 보수적(block/ask_consent) 판정 |
| 13 | flag 기본 OFF | `memory_unification_v0_enabled` default OFF, HARD_OFF 강제 |
| 14 | trace clean | trace에 id/hash/ref/status/reason_code만, raw/PII = 0 |
| 15 | regression 보존 | §10 전 baseline 보존(아래) |

산출물(시뮬레이션 실행 시 생성):
- `tests/` : memory_uni 시뮬레이션 test 파일 + 공용 `_harness.py`(`T` 클래스, `<name> PASS=n FAIL=m`).
- `scripts/cross_platform_memory_unification_v0_eval.py` : e2e 하니스(블록 A–L, ★role-correction J·K·L 포함), summary/coverage/trace-audit/role-audit JSON.
- `reports/integrated/CROSS_PLATFORM_SHARED_MEMORY_V0_EVAL_*.json` (summary/coverage/trace-audit).
- `scripts/cross_project_regression_runner.py`에 memory_uni 게이트 가산(기존 게이트 보존).

---

## 10. Regression 보존 / Regression Preservation

본 train은 **가산(additive)**이다. 기존 cross-project 게이트는 전부 보존되어야 하며, 어느 product repo도 수정하지 않는다. `cross_project_regression_runner.py`로 집계한다.

| 게이트 | 기준 | 비고 |
|---|---|---|
| `foundation_core_all_pass` | one-command runner all_pass | **89/89 · 651 assertions** (layer: lmr 35/35, brain 16/16, trust_core 16/16, migration 4/4, api 4/4, siasiu 7/7, cosmile 7/7) |
| `siasiu_integration_39` | **39/39** | answer.py 불변(`d7f579443f8a110a`), shadow/fallback coverage 1.0 |
| `siasiu_workflow_119` | **119/119** | scenarios_covered=16, false_allow=0, raw_trace_leak=0 |
| `cosmile_readiness_164` | **164/164** | readiness adapter 8종 재사용, 미수정·미삭제 |
| `cosmile_loop_v0_1_112` | **112/112** | loop v0.1 e2e, all_pass, invariant 0 |
| `consultation_500` | **500** | Cosmile harness 300 + SIASIU shadow 100 + safety 50 + fallback 50 (dual-vertical) |
| `caller_classifier_300` | **300** | caller-side intent/risk classifier mislabel-defense shadow eval |

게이트: 위 전부 보존(no regression), `write_live_promotion=0`, `force_push=0`, control-relevant 미커밋=0. memory_uni 게이트는 이들 **뒤에 가산**되며 기존 수치를 덮어쓰지 않는다.

> 환경 의존 failure 4종(`test_ssbrain`/numpy, `test_judge_real`/vault dir 부재, `test_ingredient_load`, `test_products_e2e`)은 baseline에서도 동일 실패하는 항목으로 회귀가 아니며 one-command runner 대표 부분집합(89/89·651)에 포함되지 않는다.

---

## 11. 실행 주체 / Who Runs It — Control Tower, No Live

- **control tower(foundation-control)가 시뮬레이션을 직접 실행한다.** 2개 이상 repo가 얽히는 cross-project 검증은 control tower 단독 관할이다(OPERATING_MODEL §1–§2).
- **product repo는 본 train에서 수정되지 않는다.** FOUNDATION/SIASIU/Cosmile에 들어갈 실제 구현은 각 repo Claude Code에게 handoff된 impl prompt(`IMPL_PROMPT_FOUNDATION_MEMORY_V0` · `IMPL_PROMPT_COSMILE_MEMORY_V0` · `IMPL_PROMPT_SIASIU_MEMORY_V0`)의 몫이며, 각각 **Leo 승인 · repo-local · dev/shadow**다.
- adapter가 빌드되면 control tower는 `repos/<repo>` 심링크 realpath로 **read-only/shadow** import하여 동일 시뮬레이션을 재실행(mock → real adapter 교체). 그 전까지는 mock.
- **No live, no write.** 시뮬레이션의 어떤 경로도 production/public API/real customer write/PII storage/상담원문 저장/checkout·order·customer DB/canonical·learned·Vault write를 호출하지 않는다. 전 객체 `applied_to_real_user=false`, `write_live=false`.

---

## 12. 안전 자세 — STILL FORBIDDEN / CLOSED

다음은 v0에서 **절대 done/enabled가 아니며**(각각 별도 게이트 release train + Leo 승인 필요) 전부 **DISABLED**로 유지된다:

production live · public API live · real customer memory write · customer PII storage · **상담 원문(상담원문) Foundation 저장** · checkout/order/customer DB write · canonical write · learned/canonical promotion · Vault write · `memory.db` 생성/접근 · `ssbrain.sqlite` 직접 수정 · consent 없는 cross-platform 자동 link · safety/external guard 약화 · 기존 Foundation/SIASIU/Cosmile 회귀 삭제 · PASS 강제용 기대 약화 · force push · real user exposure.

기준 상태 플래그: `applied_to_real_user=false` · `write_live=false` · `raw_text_stored=false` · `write_live_promotion=0` · `force_push=0` · feature flag default OFF.

---

## 13. 다음(별도) release train 후보 — 본 train에서 done 아님

- 각 repo의 memory adapter **repo-local 구현**(handoff impl prompt 수행) — 각 repo Claude Code, Leo 승인, dev/shadow. 완료 후 control tower가 mock→real symlink로 재실행.
- v0.1: mock을 넘어선 실제 상담/commerce fixture 기반 더 넓은 synthetic corpus, consent revocation 전파 심화.
- 모든 live enablement(production/public API/real customer memory write/customer PII storage/상담원문 저장/checkout·order·customer DB/canonical·learned·Vault/memory migration) — **각자 독립된 게이트 release train + 사람 승인**.

---

## 14. 요약 / Summary

- **대상:** foundation-control 내 `memory_uni/` 시뮬레이션 — **두 입력원**(Cosmile signal · SIASIU candidate)→(signal→derive)→gate→shadow-write→scoped-read→delete→expire를 합성 subject로만, dev/shadow로만 구동. adapter는 mock-first, repo-local 구현 후 symlink realpath(shadow)로 교체.
- **계약 100% 일치(role-corrected):** MemoryCandidate schema + **PlatformEventSignal schema(§2.1a)**(필드명 EXACT) · Foundation API §2(signal ingest/derive 포함) · gate 우선순위 §3 · read_scope §7 그대로 검증.
- **★Role correction:** **Cosmile = event signal outbox only**(memory_kind/해석/PII 0, `interprets_customer=false`·`memory_candidate=false`) · **SIASIU = consultation memory candidate**(distilled, raw/PII 0, answer.py `d7f579443f8a110a` 불변) · **Foundation만이 gate 경유로 memory 도출**, raw_text=0.
- **합성 subject 4종**(Cosmile-only/SIASIU-only/linked-with-consent/linked-without-consent) · **dual-vertical(role-asymmetric)**(Cosmile signal source + SIASIU candidate source, Cosmile 측은 read/소비 only).
- **매트릭스 >=100 → 150**(memory_kind × sensitivity × consent_scope × write_intent × gate_decision × **input_source**, 6 decision·6 kind·3 source 전부 present; ★role 블록 J·K·L 30 포함).
- **safety invariants 전부 0**(raw_text_in_foundation, pii_in_memory/trace, cross_subject_leak, consent-missing sensitive stored, deleted/expired reuse, write_live, applied_to_real_user, checkout/order/customer DB write) **+ role-correction R1–R9 전부 0**.
- **EMIT/PROPOSE vs DERIVE/DECIDE:** Cosmile signal emit · SIASIU candidate 제안, **memory 도출과 판정은 Foundation gate 단독**(fail-closed), caller는 소비만. Cosmile은 candidate를 만들지 않는다.
- **control tower 단독 실행 · product repo 무침해 · no live / no write.** regression 보존: Foundation 89/89, SIASIU 39/39+119/119, Cosmile readiness 164/164, loop v0.1 112/112, consultation 500, caller-classifier 300.
- CLOSED 항목(production/public API/real customer memory write/customer PII storage/상담원문 저장/checkout·order·customer write/canonical·learned·Vault write/real user exposure)은 **전부 DISABLED**로 유지.
