# Implementation Prompt — FOUNDATION Claude Code — Shared Memory v0 (dev/shadow)

> **수신자(Recipient):** FOUNDATION repo의 Claude Code (repo-local impl agent)
> **발신(Source of truth):** `contracts/CROSS_PLATFORM_SHARED_MEMORY_CONTRACT_V0.md` (단일 계약 — 본 프롬프트는 그 계약의 실행 작업서)
> **Date:** 2026-06-29 · **Train:** Cross-Platform Memory Unification v0
> **Mode (binding):** ★ **dev / shadow only**. synthetic subject. **NO real user exposure.**
> 모든 코드/응답에서 `applied_to_real_user=false`, `write_live=false`, `raw_text_stored=false` **불변**.
> Feature flag **default OFF**. **Leo approval 필수.** safe-additive (기존 CDM/gate 미파괴).

---

## ★ ROLE CORRECTION (2026-06-29 — binding)

> 정본: `contracts/CROSS_PLATFORM_SHARED_MEMORY_CONTRACT_V0.md` §4–5 · `docs/CROSS_PLATFORM_SHARED_MEMORY_ROLE_BOUNDARY_20260629.md`.

- **Foundation = 해석·도출(interpretation/derivation) 소유자.** Foundation은 두 입력을 **수신(RECEIVE)** 한다:
  - (a) **Cosmile → PlatformEventSignal** — commerce/platform **event signal**(product_view/wishlist/cart/purchase/consultation_session_meta). ★**memory candidate 아님.** raw text/PII 없음(집계/범주 ref + hash만). `interprets_customer=false`, `memory_candidate=false`. Cosmile은 고객을 해석/personalize/추론하지 않으며 "이 고객은 X" memory를 만들지 않는다.
  - (b) **SIASIU → ConsultationMemoryCandidate** — distilled consultation(question/answer/evidence_refs/hash만; **상담 원문은 SIASIU local**). answer.py 무변경(fingerprint `d7f579443f8a110a`).
- **Foundation이 소유하는 것:** signal로부터의 **memory 해석·도출** · subject identity(`subject_ref`) · shared AI memory store(요약/refs/hash, `raw_text_stored=false`) · memory gate(allow/block/session_only/ask_consent/delete/expired) · consent/scope/retention. **원문/PII 미저장.**
- signal(Cosmile)은 `write_intent`를 주장하지 않는다 — signal을 memory로 도출할지는 **Foundation gate**가 결정. candidate(SIASIU)는 제안만 — 판정/저장은 Foundation.
- v0 = synthetic subject · dev/shadow · `applied_to_real_user=false` · `write_live=false` (불변).

---

## 0. 작업 한 줄 요약 (What to build)

FOUNDATION repo 안에 **dev/shadow** 전용으로 다음 4개를 추가한다. 어느 것도 live가 아니며, 어느 것도 실사용자/실고객 데이터에 닿지 않는다.

| # | Component | Mode | 핵심 불변식 |
|---|---|---|---|
| (a) | **Global Subject Identity store** [shadow] | resolve only | `subject_ref` = salted hash, 평문 PII 0 |
| (b) | **Shared AI Memory store** [shadow, SUMMARY ONLY] | simulate write | `raw_text_stored=false`, 요약+refs/hash만 |
| (c) | **Memory Gate 확장** (기존 gate 위에 additive) | decide | fail-closed, retention/session_only/ask_consent 추가 |
| (d) | **Foundation Shared Memory API §2** | in-process/dev | 모든 응답 `applied_to_real_user=false, write_live=false` |

★ **입력(수신) 경로:** API는 **두 종류**의 인입을 받는다 — (1) Cosmile **PlatformEventSignal** → `ingest_event_signal(signal)` (signal일 뿐, memory candidate 아님; Foundation이 도출 여부를 gate로 결정), (2) SIASIU **ConsultationMemoryCandidate** → `propose_memory_candidate(candidate)`. 두 경로 모두 raw text/PII 없이 들어오며 **해석·도출·gate·저장은 Foundation 소유**.

★ 본 train은 cross-project **design**만 foundation-control에서 관리한다. 실제 코드는 **이 FOUNDATION repo 안에서 너(Claude Code)가** 작성하되, **repo-local · Leo-approved · dev/shadow** 범위를 절대 벗어나지 않는다.

---

## 1. MemoryCandidate Schema (★계약 그대로 — 필드명 변경 금지)

아래 스키마를 **그대로** 구현하라. 필드명/enum 값을 임의로 바꾸지 말 것 (계약 §1과 byte-for-byte 일치해야 함).

```jsonc
{
  "subject_ref": "subj_<salted-hash>",              // Foundation 소유 global subject id (평문 PII 없음)
  "source_service": "cosmile | siasiu",
  "local_user_ref": "<platform-local opaque ref>",  // 플랫폼 로컬 식별자(평문 PII 아님; 해석은 Foundation)
  "memory_candidate_id": "mc_<id>",
  "memory_kind": "preference | concern | reaction | decision_history | outcome_feedback | safety_note",
  "sensitivity_level": "low | normal | sensitive | high",   // concern/reaction = sensitive↑
  "consent_scope": "none | same_service | cross_service | foundation_only",
  "retention_policy": "session | short_ttl | standard_ttl | revocable",
  "raw_text_stored": false,                          // ★항상 false (불변식)
  "raw_text_hash": "sha256:<hex>",                   // 원문 대신 hash (또는 content_hash)
  "content_hash": "sha256:<hex>",
  "evidence_refs": ["src:...", "prov:..."],          // refs/hash만 (raw 본문 없음)
  "created_from": "consultation | commerce_event | profile_update | feedback",
  "write_intent": "candidate_only | approved_memory | session_only",
  "gate_decision": "allow | block | session_only | ask_consent | delete | expired",  // gate가 채움
  "read_scope": "same_service | cross_service | foundation_only",
  "applied_to_real_user": false,                     // ★불변식
  "write_live": false                                // ★불변식
}
```

**코드 강제 불변식:** `raw_text_stored=false`, `applied_to_real_user=false`, `write_live=false`. 원문/PII 필드(`query`/`body`/`email`/`phone`/`RRN`/`customer_name` 등)가 candidate에 들어오면 → gate가 **block**.

### 1.1 PlatformEventSignal Schema (★Cosmile 인입 — 계약 §4 그대로, signal ≠ memory candidate)

Cosmile은 **memory candidate를 만들지 않는다.** 아래 **event signal**만 outbox로 내보내고, Foundation `ingest_event_signal`이 받는다. raw text/PII/금액상세/주문ID **금지** — 집계/범주 ref + hash만. 해석·memory 도출은 **Foundation**.

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

- Cosmile은 `write_intent`(candidate/approved)를 **주장하지 않는다** — signal을 memory로 도출할지는 **Foundation gate**가 결정.
- signal에 raw text/PII/`memory_candidate=true`/`interprets_customer=true`가 들어오면 → 인입 거부 + gate **block**.

---

## 2. (a) Global Subject Identity store [shadow]

**목표:** cross-platform 식별을 위한 `subject_ref`(global subject id)를 Foundation이 **소유**하고 발급한다. 오늘 inventory 기준 global_subject_id는 **부재(ABSENT)** 이며, 본 store가 이를 도입한다.

### resolve_subject

```
resolve_subject(source_service, local_user_ref, consent_record) -> subject_ref
```

| 규칙 | 내용 |
|---|---|
| 출력 | `subject_ref = "subj_" + salted_hash(source_service, local_user_ref)` |
| salt | Foundation 소유 secret salt. 외부/repo 노출 금지. 평문 PII는 입력에도 출력에도 없음. |
| consent 없음 | `consent_record`가 link를 허용하지 않으면 **link 생성 안 함 (fail-closed)** — mismatch/미동의 시 거부 |
| 평문 PII | 저장/로그/trace 모두 평문 PII 0. 오직 opaque `local_user_ref` → salted `subject_ref` 매핑만 |
| isolation | 매핑은 **per-subject**. cross-customer로 공유되는 매핑을 만들지 말 것 (CDM per-customer isolation 상속) |

★ `local_user_ref`는 **plaintext PII가 아닌** 플랫폼 로컬 opaque ref여야 한다. PII가 섞여 들어오면 reject.

---

## 3. (b) Shared AI Memory store [shadow, SUMMARY ONLY]

**목표:** Foundation은 **요약 메모리만** 보관(시뮬레이션)한다. 원문/PII는 **절대** 저장하지 않는다 (`raw_text_stored=false` 불변식).

### 저장 가능한 것 (SUMMARY ONLY)

| memory_kind | 저장 형태 (요약/refs/hash만) |
|---|---|
| `preference` | 선호 카테고리/속성 요약 |
| `concern` | skin/beauty concern **요약** (sensitive↑) |
| `reaction` | reaction/sensitivity signal **요약** (sensitive↑) |
| `decision_history` | 의사결정 이력 **요약** |
| `outcome_feedback` | 만족도/결과 피드백 **요약** |
| `safety_note` | 안전 주의 **요약** |
| + | `evidence_refs` (`src:` / `prov:`), `raw_text_hash` 또는 `content_hash` |

### 저장 금지 (forbidden in store)

- 상담 원문(상담원문) · query/body 본문 · email/phone/RRN/customer_name 등 PII.
- raw 본문 일체. 들어오면 store가 거부하고 gate가 **block**.
- store는 **shadow**: 실제 영속 write를 하지 않는다 (`written=false` 시뮬레이션). `write_live=false`.

★ preference/outcome_feedback는 evidence를 **upgrade하지 않고** safety를 **override하지 않는다** (기존 CDM 정책 상속).

---

## 4. (c) Memory Gate 확장 (additive, fail-closed)

**기존 gate를 파괴하지 말 것.** 현재 IMPLEMENTED 된 항목 = consent / cross_customer_isolation / deleted_expired / M6 / raw-invariant / trace redaction. 그 **위에** retention_policy + session_only + ask_consent 판정을 **additive로** 추가한다.

### gate_decision 우선순위 (보수적 우선 — 계약 §3 그대로)

| 순위 | 조건 | decision | reason_code |
|---|---|---|---|
| 1 | raw/PII 필드 존재 또는 `raw_text_stored!=false` | **block** | `raw_text_present` |
| 2 | cross-customer / subject mismatch | **block** | `cross_subject_isolation` |
| 3 | deleted/blocked/expired(미reconfirm) memory 재사용 | **delete / expired** | `deleted_expired_reuse` |
| 4 | sensitive(concern/reaction/condition) + `consent_scope=none` | **ask_consent** | `consent_required` |
| 5 | `high` sensitivity + 미reconfirm | **block** | `high_sensitivity_unconfirmed` |
| 6 | `retention_policy=session` 또는 `write_intent=session_only` | **session_only** | `session_scope` (영속 저장 안 함) |
| 7 | 그 외 + consent 충족 + evidence refs 유효 | **allow** | `allow_shadow_write` (단 shadow write) |

- 모든 분기는 **fail-closed**: 모호/누락/충돌 시 더 보수적인 decision(block/ask_consent) 선택.
- decision은 `gate_decision` 필드를 채우고 `reason_codes`를 반환한다.
- 기존 M6 / consent / isolation / deleted_expired 동작은 **회귀 없이** 보존.

---

## 5. (d) Foundation Shared Memory API §2 (in-process / dev / shadow)

★ **public API live 아님.** in-process/dev 호출만. **모든 응답에 `applied_to_real_user=false, write_live=false`** 포함.

| method | 입력 | 출력 | 비고 |
|---|---|---|---|
| `resolve_subject(source_service, local_user_ref, consent_record)` | 플랫폼 로컬 ref | `subject_ref`(salted hash) | consent 없으면 link 안 함 (fail-closed) |
| `ingest_event_signal(signal)` | **PlatformEventSignal** (Cosmile; signal일 뿐, memory candidate 아님) | `{signal_id, status:received}` | ★Cosmile event signal 인입. **저장/해석 아님** — Foundation이 memory 도출 여부를 gate로 결정. `interprets_customer=false`, `memory_candidate=false` 단언 |
| `propose_memory_candidate(candidate)` | **ConsultationMemoryCandidate** (SIASIU) / MemoryCandidate | `{memory_candidate_id, status:received}` | **저장 아님** — gate 대기 |
| `gate_decision(candidate)` | MemoryCandidate | `gate_decision` + `reason_codes` | consent/isolation/deleted-expired/M6 + retention/session 판정 |
| `write_approved_memory(candidate)` | `gate=allow`인 candidate | `{written:false (shadow), memory_ref}` | ★shadow: 실제 write 안 함, 시뮬레이션만 |
| `read_memory(subject_ref, read_scope, requesting_service)` | scope | 요약 memory 목록 (원문 없음) | scope 위반 시 **block** |
| `delete_memory(subject_ref, memory_ref)` | | `{deleted:true (shadow), must_not_reappear:true}` | 삭제 전파 시뮬레이션 |
| `expire_sweep(subject_ref)` | | expired 처리 (shadow) | retention TTL |

### read_scope 규칙 (계약 §7)

| read_scope | 허용 조건 |
|---|---|
| `same_service` | 제안한 서비스만 읽기 |
| `cross_service` | **`consent_scope=cross_service`** 일 때만 (예: Cosmile가 SIASIU 상담 요약 참조) |
| `foundation_only` | Foundation 내부 trust/grounding만, 서비스 미노출 |
| 위반 | subject_ref mismatch / consent 부족 → read **block** |

---

## 6. Acceptance Criteria (수용 기준 — 전부 통과해야 done)

| # | 기준 | 검증 |
|---|---|---|
| AC-1 | **Synthetic-subject tests** — 모든 테스트가 합성 subject로 구동, 실사용자/실고객 데이터 0 | test fixtures가 synthetic임을 단언 |
| AC-2 | **raw/PII = 0** — store/log/trace/응답 어디에도 원문·PII 없음 | grep/assert: query/body/email/phone/RRN/customer_name/상담원문 0건; `raw_text_stored=false` 강제 |
| AC-3 | **isolation enforced (fail-closed)** — cross-customer/subject mismatch → `block` | 의도적 mismatch 케이스가 block 됨 |
| AC-4 | **consent enforced (fail-closed)** — sensitive + `consent_scope=none` → `ask_consent`; cross_service consent 없으면 read block | consent 매트릭스 테스트 |
| AC-5 | **retention enforced (fail-closed)** — `retention_policy=session`/`write_intent=session_only` → `session_only`(영속 저장 안 함); TTL 만료 → `expire_sweep`로 expired | retention/expire 테스트 |
| AC-6 | **write_live=false** — `write_approved_memory`는 항상 `written=false` (shadow), 실제 영속 write 0 | write 경로 단언 |
| AC-7 | **applied_to_real_user=false** — 모든 candidate/decision/read/write 응답에 명시 | 응답 schema 단언 |
| AC-8 | **기존 Foundation regression 전부 보존 (89/89)** — CDM/gate/reuse_gate/trace redaction/M6 회귀 없음 | 기존 89/89 green 유지 |
| AC-9 | **safe-additive** — 기존 CDM/gate 코드 동작 미변경, 신규는 flag 뒤(default OFF) | flag OFF면 기존과 동일 |
| AC-10 | **delete 전파** — `delete_memory` 후 `must_not_reappear=true`, 재read에서 미노출 | delete→read 테스트 |

---

## 7. Forbidden (★ 절대 금지 — 전부 DISABLED 유지, 별도 승인 사안)

다음은 본 train에서 **구현/활성화하지 않으며**, 별도 승인 없이는 영원히 OFF다:

- ❌ production live · public API live
- ❌ real customer memory write · customer PII storage
- ❌ 상담원문(raw consultation text) Foundation 저장
- ❌ checkout / order / customer DB write
- ❌ canonical / learned / Vault write
- ❌ force push
- ❌ real user exposure (실사용자 노출)
- ❌ `applied_to_real_user=true` 또는 `write_live=true` 설정
- ❌ cross-customer로 공유되는 identity 매핑 (per-subject isolation 위반)
- ❌ salt/secret 외부 노출

---

## 8. 작업 경계 / 운영 규칙 (binding)

| 항목 | 규칙 |
|---|---|
| Scope | 이 작업은 **FOUNDATION repo-local**. 다른 product repo(SIASIU/Cosmile) 미수정. |
| Flag | 신규 기능은 feature flag 뒤, **default OFF**. flag OFF = 기존 동작과 100% 동일. |
| Approval | 머지/활성화 전 **Leo approval 필수**. |
| Mode | **dev/shadow only**. live/prod 경로에 연결 금지. |
| Additivity | **safe-additive** — 기존 CDM/gate/CDM isolation/M6/trace를 깨지 않는다. 89/89 회귀 보존. |
| Data | synthetic subject만. 실데이터 fixture 금지. |
| Output 검증 | 모든 API 응답에 `applied_to_real_user=false`, `write_live=false`; store/trace에 `raw_text_stored=false`. |

---

## 9. Definition of Done

1. (a)~(d) 4개 컴포넌트가 **dev/shadow**로 구현됨 (flag default OFF).
2. MemoryCandidate 스키마가 계약 §1과 **필드명/enum 완전 일치**.
3. AC-1 ~ AC-10 전부 green.
4. 기존 Foundation **89/89 regression** 보존.
5. Forbidden 목록 중 어느 것도 활성화되지 않음 (검증 단언 포함).
6. Leo approval 대기 상태로 PR 작성 (자동 머지 금지).

> ★ 본 프롬프트는 계약(`CROSS_PLATFORM_SHARED_MEMORY_CONTRACT_V0.md`)의 하위 실행서다. 충돌 시 **계약이 우선**한다.
