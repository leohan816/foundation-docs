# Cross-Platform Shared Memory Contract v0 — 2026-06-29

> ★상태: SUPERSEDED by COMMON_SERVICE_MEMORY_CONTRACT_V1(M2 v1.2) — 소유/저장/broker 모델 폐기·enum만 참고(M2 §12).
> ★**본 v0 = 정본 아님 · 이력/참고 문서.** V1(M2/M3)이 정본이며, v0의 "Foundation이 memory 저장/gate/identity/consent 소유·subject_ref Foundation 소유·단일 계약(single source of truth)" 모델은 **V1 결정 #5(Foundation 고객 LTM 미저장)·#10(no-broker)·service-local subject_ref와 정면 모순**이라 폐기한다(enum 값만 V1 정합 참고).
> ~~Foundation / Cosmile / SIASIU 통합 메모리의 **단일 계약(single source of truth)**.~~ (SUPERSEDED — V1이 정본)
> ★v0 = synthetic subject 기반 **dev / shadow read/write simulation**. 실사용자 live 아님.
> `applied_to_real_user=false`, `write_live=false`, raw/PII/상담원문 Foundation 저장 **금지**.
> 근거: `reports/integrated/CUSTOMER_IDENTITY_SHARED_MEMORY_BOUNDARY_INVENTORY_20260629.md`
> (global_subject_id 부재 → 본 계약이 `subject_ref` 도입 · CDM per-customer → per-subject 확장 · memory gate 존재 → retention/session-only 확장).

## 0. 역할 / 경계 (요약)

| 계층 | 소유 | 내용 |
|---|---|---|
| Platform Local | Cosmile · SIASIU | 상담 원문 · 주문/결제/배송/장바구니/찜/방문/구매/CS · 플랫폼별 고객정보 (★경계 못 넘음) |
| Foundation Global Subject Identity | **Foundation** | `subject_ref`(salted hash) ↔ (source_service, local_user_ref) 매핑. 평문 PII 없음. |
| Foundation Shared AI Memory | **Foundation** | preference · concern · reaction · decision_history · outcome_feedback · safety_note **요약/refs/hash만** |
| Foundation Memory Gate | **Foundation** | candidate → allow/block/session_only/ask_consent/delete/expired 판정(fail-closed) |
| Consent · Scope · Retention | **Foundation** | per-kind 동의 scope · TTL · 삭제 전파 |

**흐름 (★Role Correction 2026-06-29):**
- **SIASIU** = consultation **memory candidate** 제안(distilled, raw/PII 금지) → Foundation gate 판정.
- **Cosmile** = commerce/platform **event signal outbox**만(product_view/wishlist/cart/purchase/consultation_session_meta). ★memory extraction·personalization·추론·"이 고객은 X" 생성 **금지**. signal = raw/PII 없는 구조화 사실(fact)일 뿐.
- **Foundation** = signal/candidate를 받아 **해석·memory 도출·gate·저장·identity·consent/scope/retention** 소유. 원문/PII 미저장.
- **foundation-control** = cross-platform contract·regression·simulation·release approval 소유.

참조: `docs/CROSS_PLATFORM_SHARED_MEMORY_ROLE_BOUNDARY_20260629.md`.

## 1. MemoryCandidate Schema (★필수 — 모든 구현 동일)

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

불변식(코드 강제): `raw_text_stored=false`, `applied_to_real_user=false`, `write_live=false`. 원문/PII 필드(query/body/email/phone/RRN/customer_name) **금지** → 들어오면 gate가 `block`.

## 2. Foundation Shared Memory API Contract (write/read)

★in-process/dev/shadow only. public API live 아님. 모든 응답에 `applied_to_real_user=false, write_live=false`.

| method | 입력 | 출력 | 비고 |
|---|---|---|---|
| `resolve_subject(source_service, local_user_ref, consent_record)` | 플랫폼 로컬 ref | `subject_ref`(salted hash) | consent 없으면 link 안 함(fail-closed) |
| `propose_memory_candidate(candidate)` | MemoryCandidate | `{memory_candidate_id, status:received}` | 저장 아님 — gate 대기 |
| `gate_decision(candidate)` | MemoryCandidate | `gate_decision` + reason_codes | consent/isolation/deleted-expired/M6 + retention/session 판정 |
| `write_approved_memory(candidate)` | gate=allow인 candidate | `{written:false(shadow), memory_ref}` | ★shadow: 실제 write 안 함, 시뮬레이션만 |
| `read_memory(subject_ref, read_scope, requesting_service)` | scope | 요약 memory 목록(원문 없음) | scope 위반 시 block |
| `delete_memory(subject_ref, memory_ref)` | | `{deleted:true(shadow), must_not_reappear:true}` | 삭제 전파 시뮬레이션 |
| `expire_sweep(subject_ref)` | | expired 처리(shadow) | retention TTL |

## 3. Memory Gate 판정 (fail-closed)

`gate_decision` 우선순위(보수적 우선):
1. raw/PII 필드 존재 또는 `raw_text_stored!=false` → **block** (`raw_text_present`)
2. cross-customer/subject mismatch → **block** (`cross_subject_isolation`)
3. deleted/blocked/expired(미reconfirm) memory 재사용 → **delete / expired**
4. sensitive(concern/reaction/condition) + consent_scope=none → **ask_consent**
5. high sensitivity + 미reconfirm → **block**
6. retention_policy=session 또는 write_intent=session_only → **session_only** (영속 저장 안 함)
7. 그 외 + consent 충족 + evidence refs 유효 → **allow** (단 shadow write)

★preference/outcome_feedback는 evidence를 upgrade하지 않고 safety를 override하지 않는다. (기존 CDM 정책 상속.)

## 4. Cosmile Commerce/Platform Event Signal Outbox Contract (★role-corrected 2026-06-29)

★Cosmile은 **memory candidate를 만들지 않는다** — 해석·추론·장기기억 승격·"이 고객은 X" 생성 **금지**.
Cosmile이 맡는 것은 **commerce/platform event signal**을 raw/PII 없이 outbox로 내보내는 것뿐. 의미 부여·memory 도출은 **Foundation**.

**PlatformEventSignal (source_service=cosmile):**
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
- Cosmile은 Foundation verdict를 **표시(소비)**만 — 판정/해석/저장은 Foundation. 주문/결제/고객 DB write 0.
- Foundation이 이 signal로부터 memory를 도출할지(gate 경유) **스스로** 결정한다. Cosmile은 `write_intent`(candidate/approved)를 주장하지 않는다.

## 5. SIASIU Consultation Memory Candidate Adapter Contract (consultation-first)

- 입력원: distilled consultation(question/answer/evidence_refs/hash — ★raw 원문은 SIASIU local) + feedback + profile_update.
- `memory_kind = preference | concern | reaction | safety_note | decision_history | outcome_feedback` candidate 생성은 **control contract 확정 후** 가능.
- `raw_text_stored=false`, `content_hash`만 · sensitivity(reaction/concern)=sensitive↑ → consent_scope 필요 · raw_text/PII 전송 금지.
- ★answer.py 무변경(fingerprint `d7f579443f8a110a`). candidate는 제안만 — 판정/저장은 Foundation gate.

## 6. v0 불변식 / 금지 (전 구현 공통)

- synthetic subject만 · dev/shadow · **no real user exposure**.
- raw 상담원문/PII Foundation 저장 **금지** · customer PII 저장 금지.
- production/public API live 금지 · real customer memory write 금지.
- checkout/order/customer DB write 금지 · canonical/learned/Vault write 금지 · force push 금지.
- 모든 candidate/decision/read는 `applied_to_real_user=false`, `write_live=false`.

## 7. read_scope 규칙

- `same_service`: 제안 서비스만 읽기.
- `cross_service`: **consent_scope=cross_service** 일 때만(예: Cosmile가 SIASIU 상담 요약 참조).
- `foundation_only`: Foundation 내부 trust/grounding만, 서비스 미노출.
- subject_ref mismatch / consent 부족 → read **block**.
