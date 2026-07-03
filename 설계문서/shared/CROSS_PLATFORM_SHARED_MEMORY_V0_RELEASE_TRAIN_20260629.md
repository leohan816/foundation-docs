# Cross-Platform Shared Memory v0 — Release Train — 2026-06-29

> **단일 계약(single source of truth)** = `contracts/CROSS_PLATFORM_SHARED_MEMORY_CONTRACT_V0.md`.
> 본 plan은 그 계약을 **실행(orchestration)** 하는 control-tower release train 문서이며, 계약과 100% 일관성을 유지한다.
> **★v0 = synthetic subject 기반 dev / shadow read/write simulation. 실사용자 live 아님.**
> 전 구간 불변식: `applied_to_real_user=false`, `write_live=false`, `raw_text_stored=false`.
> 근거 인벤토리: `reports/integrated/CUSTOMER_IDENTITY_SHARED_MEMORY_BOUNDARY_INVENTORY_20260629.md` (+ `.json`).
> 운영 원칙: `docs/OPERATING_MODEL_20260629.md` · dual-vertical: `docs/DUAL_VERTICAL_TEST_POLICY_20260629.md`.
>
> **★Role Boundary Correction (2026-06-29):** `docs/CROSS_PLATFORM_SHARED_MEMORY_ROLE_BOUNDARY_20260629.md` 참조.
> **Cosmile = commerce event signal outbox만**(memory extraction/personalization 금지) · **SIASIU = consultation memory candidate**(distilled, 원문 local) ·
> **Foundation = 해석·memory·gate·identity·consent 소유** · **foundation-control = contract·regression·simulation·release approval**.

---

## 1. 목표 & 비-목표 (Goals & Non-Goals)

### 1.1 목표 (v0 = synthetic dev/shadow)

| # | 목표 | 산출 |
|---|---|---|
| G1 | Foundation 소유의 **global subject identity**(`subject_ref` = salted hash)를 **shadow**로 도입 — 인벤토리상 `global_subject_id`/cross-platform 매핑은 **현재 부재(ABSENT)** | shadow subject store + `resolve_subject` |
| G2 | Foundation **Shared AI Memory**(요약/refs/hash만)를 **shadow**로 도입 — 원문/PII 저장 0 | shadow memory store (summary only) |
| G3 | 기존 Foundation **memory gate**(consent / cross_customer_isolation / deleted_expired / M6 / raw-invariant / trace)를 **retention/session-only** 판정으로 확장 | gate extension (계약 §3) |
| G4 | Cosmile / SIASIU가 **memory candidate를 제안**하는 adapter를 **dev/shadow, flag OFF**로 도입(판정·저장은 Foundation) | candidate adapters (계약 §4·§5) |
| G5 | control-tower에서 **synthetic-subject end-to-end 시뮬레이션**으로 propose→gate→shadow write→scoped read→delete/expire 전 흐름 검증 | simulation test plan |
| G6 | dual-vertical(SIASIU 상담형 + Cosmile commerce) **regression 보존** 확인 — live/write/promotion = 0 | cross-project regression |

### 1.2 비-목표 (Non-Goals — v0에서 절대 하지 않음, 별도 승인 train)

- ❌ production live · public API live · web live · real user exposure.
- ❌ real customer memory write · customer PII storage · **상담 원문(상담원문) Foundation 저장**.
- ❌ checkout / order / customer DB write · canonical write · learned promotion · **Vault write**.
- ❌ Cosmile↔SIASIU 실제 identity link 활성화(현재 **doc-only**) · FoundationSignalOutbox 실제 transmit(현재 `pending`만 queue).
- ❌ 제품 repo(FOUNDATION / SIASIU / Cosmile) 코드를 **본 train이 직접 수정** — 제품 repo는 건드리지 않는다(§6).

> 모든 candidate / decision / read 응답은 `applied_to_real_user=false`, `write_live=false`로 고정된다.

---

## 2. 5계층 경계 (5-Layer Boundary — 계약 §0 인용)

| 계층 | 소유 | 내용 | v0 상태 |
|---|---|---|---|
| **Platform Local** | Cosmile · SIASIU | 상담 원문 · 주문/결제/배송/장바구니/찜/방문/구매/CS · 플랫폼별 고객정보 (**★경계 못 넘음**) | unchanged, local 유지 |
| **Foundation Global Subject Identity** | **Foundation** | `subject_ref`(salted hash) ↔ (`source_service`, `local_user_ref`) 매핑. **평문 PII 없음.** | shadow 도입 (현재 부재) |
| **Foundation Shared AI Memory** | **Foundation** | `preference` · `concern` · `reaction` · `decision_history` · `outcome_feedback` · `safety_note` **요약/refs/hash만** | shadow store (summary only) |
| **Foundation Memory Gate** | **Foundation** | candidate → `allow`/`block`/`session_only`/`ask_consent`/`delete`/`expired` 판정 (**fail-closed**) | 기존 gate + retention/session 확장 |
| **Consent · Scope · Retention** | **Foundation** | per-kind 동의 scope · TTL · 삭제 전파 | shadow 정책 적용 |

**경계 핵심:**
1. Platform raw data(상담원문 · 주문/결제/배송/장바구니/찜/방문/구매/CS · 플랫폼 고객정보)는 **로컬에 머문다**.
2. Foundation은 **원문/PII를 저장하지 않는다** (`raw_text_stored=false` 불변식 — 인벤토리상 오늘도 raw PII 저장 0, reuse_gate / trace redaction / vault metadata+hash only).
3. Foundation Shared AI Memory는 **요약 + evidence refs/hash만** 보관한다.
4. 인벤토리상 Foundation CDM은 **per-customer isolation** — 본 train은 이를 **per-subject로 확장**하되 **cross-customer-shared로 만들지 않는다**.

---

## 3. 핵심 흐름 (Core Flow)

```
[Cosmile / SIASIU]                       [Foundation]
 candidate 제안 ──propose_memory_candidate──▶ (status: received, 저장 아님)
   (요약/hash/refs만,                              │
    raw/PII 없음)                                  ▼
                                          gate_decision  ◀── fail-closed 판정 (계약 §3)
                                                   │
                          ┌────────────────────────┼───────────────────────────┐
                       allow                   session_only / ask_consent     block / delete / expired
                          │                         │                             │
            write_approved_memory               영속 저장 안 함 / 동의 대기      저장 거부 · 재출현 금지
            {written:false (shadow),
             memory_ref}
                          │
              read_memory(subject_ref, read_scope, requesting_service)  ── scope 위반 시 block
                          │
              delete_memory {deleted:true (shadow), must_not_reappear:true}
              expire_sweep  (retention TTL, shadow)
```

| 단계 | API (계약 §2) | 입력 | 출력(shadow) | 불변식 |
|---|---|---|---|---|
| ① resolve | `resolve_subject(source_service, local_user_ref, consent_record)` | 플랫폼 로컬 ref | `subject_ref` (salted hash) | consent 없으면 link 안 함(fail-closed) |
| ② propose | `propose_memory_candidate(candidate)` | `MemoryCandidate` | `{memory_candidate_id, status:received}` | 저장 아님 — gate 대기 |
| ③ gate | `gate_decision(candidate)` | `MemoryCandidate` | `gate_decision` + reason_codes | 보수적 우선(§5) |
| ④ shadow write | `write_approved_memory(candidate)` | `gate_decision=allow` candidate | `{written:false, memory_ref}` | **★실제 write 안 함** |
| ⑤ scoped read | `read_memory(subject_ref, read_scope, requesting_service)` | scope | 요약 memory 목록(원문 없음) | scope 위반 시 `block` |
| ⑥ delete | `delete_memory(subject_ref, memory_ref)` | | `{deleted:true, must_not_reappear:true}` | 삭제 전파 시뮬레이션 |
| ⑦ expire | `expire_sweep(subject_ref)` | | expired 처리 | retention TTL |

### 3.1 MemoryCandidate Schema (★계약 §1 — 필드명 EXACT 재현, 모든 구현 동일)

```jsonc
{
  "subject_ref": "subj_<salted-hash>",              // Foundation 소유 global subject id (평문 PII 없음)
  "source_service": "cosmile | siasiu",
  "local_user_ref": "<platform-local opaque ref>",  // 플랫폼 로컬 식별자(평문 PII 아님; subject_ref 해석은 Foundation)
  "memory_candidate_id": "mc_<id>",
  "memory_kind": "preference | concern | reaction | decision_history | outcome_feedback | safety_note",
  "sensitivity_level": "low | normal | sensitive | high",      // condition/reaction = sensitive↑
  "consent_scope": "none | same_service | cross_service | foundation_only",
  "retention_policy": "session | short_ttl | standard_ttl | revocable",
  "raw_text_stored": false,                          // ★항상 false (불변식)
  "raw_text_hash": "sha256:<hex>",                   // 원문 대신 hash (또는 content_hash)
  "content_hash": "sha256:<hex>",
  "evidence_refs": ["src:...", "prov:..."],          // refs/hash만 (raw 본문 없음)
  "created_from": "consultation | commerce_event | profile_update | feedback",
  "write_intent": "candidate_only | approved_memory | session_only",
  "gate_decision": "allow | block | session_only | ask_consent | delete | expired",  // Foundation gate가 채움
  "read_scope": "same_service | cross_service | foundation_only",
  "applied_to_real_user": false,                     // ★불변식
  "write_live": false                                // ★불변식
}
```

> 코드 강제 불변식: `raw_text_stored=false`, `applied_to_real_user=false`, `write_live=false`.
> 원문/PII 필드(query/body/email/phone/RRN/customer_name)가 들어오면 gate가 `block`.

---

## 4. Phase 분해 & Gate (Phases & Exit Gates)

각 phase는 **설계 → gate → 구현 → regression → report → freeze** 순서. gate를 통과하지 못하면 다음 phase로 진행하지 않는다(fail-closed). P1–P3 구현은 **control-tower가 작성한 impl prompt를 해당 repo Claude Code에 위임**(repo-local · Leo 승인 · dev/shadow).

| Phase | 범위 | 산출물 | Exit Gate | 상태 |
|---|---|---|---|---|
| **P0** | Cross-Platform Shared Memory Contract v0 확정 | `contracts/CROSS_PLATFORM_SHARED_MEMORY_CONTRACT_V0.md` | 스키마·API·gate 의미 동결, 인벤토리 근거 일치 | **✅ done** |
| **P1** | **Foundation shadow stores + gate 확장** (impl prompt → FOUNDATION repo Claude Code) | subject identity store(shadow) · shared memory store(shadow, summary only) · gate retention/session 확장 · API §2 | `raw_text_stored=false` 강제 · `written=false` shadow · Foundation Core regression **89/89** 보존 · `applied_to_real_user=false` | 설계 완료, 위임 대기 |
| **P2** | **Cosmile candidate adapter** (impl prompt → COSMILE repo Claude Code) | commerce_event/consultation → 요약 candidate, verdict 소비, flag OFF | 원문/PII 0 · `write_intent=candidate_only` 기본 · Cosmile readiness **164/164** + loop **112/112** 보존 | 설계 완료, 위임 대기 |
| **P3** | **SIASIU candidate adapter** (impl prompt → SIASIU repo Claude Code) | 상담 distilled → concern/reaction/decision_history/safety_note, hash/refs only | **answer.py 무변경**(`d7f579443f8a110a`) · 상담원문 Foundation 미전송 · SIASIU integration **39/39** + workflow **119/119** 보존 | 설계 완료, 위임 대기 |
| **P4** | **control-tower synthetic e2e simulation** | foundation-control 내 synthetic-subject 시뮬레이션(propose→gate→shadow write→scoped read→delete/expire) | 전 흐름 통과 · 7 safety invariant 0 위반 · live/write/promotion = 0 | 대기 (P1–P3 회신 후) |
| **P5** | **dual-vertical regression** | cross-project regression(양 vertical) | Foundation **89/89** · SIASIU **39/39 + 119/119** · Cosmile readiness **164/164** · loop **112/112** · consultation 500 · caller 300 보존 | 대기 |

> P1–P3의 “설계 완료, 위임 대기”는 **control-tower가 contract/plan/impl prompt를 산출**했음을 뜻하며, 실제 코드 변경은 각 repo Claude Code가 **repo-local·Leo 승인·dev/shadow**로 수행한다(본 train은 제품 repo 미수정).

---

## 5. Memory Gate 판정 (fail-closed — 계약 §3)

`gate_decision` 우선순위(보수적 우선, 위에서부터 평가):

| 순위 | 조건 | 판정 | reason_code |
|---|---|---|---|
| 1 | raw/PII 필드 존재 또는 `raw_text_stored!=false` | **block** | `raw_text_present` |
| 2 | cross-customer / subject mismatch | **block** | `cross_subject_isolation` |
| 3 | deleted/blocked/expired(미reconfirm) memory 재사용 | **delete / expired** | deleted_expired |
| 4 | sensitive(concern/reaction/condition) + `consent_scope=none` | **ask_consent** | consent_required |
| 5 | high sensitivity + 미reconfirm | **block** | high_unconfirmed |
| 6 | `retention_policy=session` 또는 `write_intent=session_only` | **session_only** (영속 저장 안 함) | session_scope |
| 7 | 그 외 + consent 충족 + evidence refs 유효 | **allow** (단 shadow write, `written=false`) | allow_shadow |

> ★`preference` / `outcome_feedback`는 evidence를 upgrade하지 않고 safety를 override하지 않는다(기존 CDM 정책 상속).

### 5.1 read_scope 규칙 (계약 §7)

| `read_scope` | 의미 | 조건 |
|---|---|---|
| `same_service` | 제안 서비스만 읽기 | 기본 |
| `cross_service` | 타 서비스 요약 참조(예: Cosmile가 SIASIU 상담 요약) | **`consent_scope=cross_service`일 때만** |
| `foundation_only` | Foundation 내부 trust/grounding만 | 서비스 미노출 |
| — | subject_ref mismatch / consent 부족 | read **block** |

---

## 6. Control-Tower Orchestration (운영 모델 준수)

`docs/OPERATING_MODEL_20260629.md` 기준 — **2개 이상 repo가 얽히는 모든 작업은 foundation-control(control tower)에서만 release train으로** 진행한다.

| 주체 | 본 train에서의 역할 |
|---|---|
| **foundation-control (control tower)** | contract · plan · impl prompt · synthetic e2e simulation · cross-project regression **전권**. 제품 repo 코드는 **건드리지 않는다**. |
| **FOUNDATION repo Claude Code** | P1 impl prompt 수령 → subject/memory shadow store + gate 확장 **repo-local 구현**(Leo 승인, dev/shadow). 단독 작업 금지, plan/contract 통해서만. |
| **COSMILE repo Claude Code** | P2 impl prompt 수령 → candidate adapter **repo-local 구현**(flag OFF, dev/shadow). cross-project 금지. |
| **SIASIU repo Claude Code** | P3 impl prompt 수령 → candidate adapter **repo-local 구현**(answer.py 무변경, dev/shadow). cross-project 금지. |

**위임 산출물(이 workflow에서 control-tower가 작성, 제품 repo에 전달):**
- `docs/IMPL_PROMPT_FOUNDATION_MEMORY_V0_20260629.md` (P1)
- `docs/IMPL_PROMPT_COSMILE_MEMORY_V0_20260629.md` (P2)
- `docs/IMPL_PROMPT_SIASIU_MEMORY_V0_20260629.md` (P3)
- `docs/CROSS_PLATFORM_SHARED_MEMORY_V0_CONTROL_SIMULATION_TEST_PLAN_20260629.md` (P4)

> 각 repo Claude Code는 결과(테스트·status·commit hash)를 control-tower에 회신하여 P5 cross-project regression에 반영한다. 의심되면 멈추고 control tower(=Leo 승인 라인)에 묻는다.

---

## 7. Safety Invariants (전 구간 검증)

| # | invariant | 검증 |
|---|---|---|
| S1 | **raw / PII = 0** — `raw_text_stored=false`, 원문/상담원문/PII 필드 Foundation 미저장(들어오면 `block`) | gate 순위 1 · trace redaction |
| S2 | **isolation** — cross-customer / subject mismatch 차단(per-subject 확장, cross-customer-shared 아님) | gate 순위 2 |
| S3 | **consent** — sensitive + `consent_scope=none` → `ask_consent`; `cross_service` read는 동의 필요 | gate 순위 4 · §5.1 |
| S4 | **retention** — `retention_policy=session` / `write_intent=session_only` → `session_only`(영속 저장 안 함); TTL `expire_sweep` | gate 순위 6 · ⑦ |
| S5 | **no live / no write** — `write_approved_memory` → `written=false`(shadow), `applied_to_real_user=false`, `write_live=false` | API §2 응답 고정 |
| S6 | **delete 전파** — `delete_memory` → `must_not_reappear=true`, 재사용 시 `delete/expired` | gate 순위 3 · ⑥ |
| S7 | **synthetic only** — 전 케이스 synthetic subject, real user exposure 0 | P4 simulation |

---

## 8. Rollback

| 항목 | 기준 상태 |
|---|---|
| Feature flags | **default OFF** (Cosmile/SIASIU candidate adapter, Foundation shadow store, gate 확장 모두 OFF가 기본) |
| 쓰기 | **shadow only** — `write_approved_memory`는 `written=false`, 실제 영속 저장 0 |
| 제품 repo | **untouched by this train** — 본 train은 FOUNDATION/SIASIU/Cosmile 코드를 직접 수정하지 않음. 롤백 = flag OFF로 복귀 |
| 식별자 매핑 | Cosmile↔SIASIU identity link **doc-only 유지** · FoundationSignalOutbox `pending`만 queue(transmit 0) |
| 회귀 기준 | rollback 시 baseline(Foundation 89/89 · SIASIU 39/39+119/119 · Cosmile 164/164+112/112) **그대로 보존** |
| 데이터 | synthetic subject only → 폐기 시 부작용 0(real user / PII / canonical / Vault 미접근) |

> 어떤 phase든 Exit Gate 실패 시 즉시 **flag OFF → shadow 폐기 → 직전 baseline freeze**로 롤백. force push 금지.

---

## 9. 다음 release trains (별도 승인)

| train | 범위 | 승인 |
|---|---|---|
| **Consent UX** | per-kind 동의 수집/표시 UX, `ask_consent` 흐름의 실제 사용자 경험 | 별도 승인 |
| **Real subject migration** | synthetic → 실 subject 매핑 이행(`subject_ref` 실데이터화) | **별도 승인 (real user exposure → 절대 본 train 범위 아님)** |
| **Retention enforcement** | shadow `expire_sweep` → 실제 TTL 삭제 집행(영속 저장 전제) | 별도 승인 |
| (참조) Cosmile→Foundation Product API & Consultation 500-case E2E | `docs/OPERATING_MODEL_20260629.md` §7 | 별도 승인 |

> 위 train들은 모두 **production live · public API live · real customer memory write · customer PII storage · 상담원문 Foundation 저장 · checkout/order/customer DB write · canonical/learned/Vault write를 활성화하지 않는 한** v0와 동일하게 DISABLED 상태를 유지하며, 각각 **독립된 Leo 승인 release train**을 통해서만 진행한다.

---

## 10. 참조 (References)

- 계약(단일 source of truth): `contracts/CROSS_PLATFORM_SHARED_MEMORY_CONTRACT_V0.md`
- 인벤토리 근거: `reports/integrated/CUSTOMER_IDENTITY_SHARED_MEMORY_BOUNDARY_INVENTORY_20260629.md` / `.json`
  - `global_subject_id` / cross-platform identity 매핑 = **부재** → 본 train이 `subject_ref` 도입(shadow)
  - Foundation CDM = **per-customer isolation** → per-subject 확장(cross-customer-shared 아님)
  - memory gate(consent / cross_customer_isolation / deleted_expired / M6 / raw-invariant / trace) = **구현됨** → retention/session-only 확장
  - Foundation raw PII 저장 = **0** (`raw_text_stored=false`, reuse_gate, trace redaction, vault metadata+hash only) → 유지
  - Cosmile FoundationSignalOutbox = `pending`만 queue(transmit 0) · Cosmile↔SIASIU identity link = **doc-only**
- 운영 모델: `docs/OPERATING_MODEL_20260629.md`
- dual-vertical 테스트 정책: `docs/DUAL_VERTICAL_TEST_POLICY_20260629.md`
- impl prompts: `docs/IMPL_PROMPT_FOUNDATION_MEMORY_V0_20260629.md` · `docs/IMPL_PROMPT_COSMILE_MEMORY_V0_20260629.md` · `docs/IMPL_PROMPT_SIASIU_MEMORY_V0_20260629.md`
- simulation test plan: `docs/CROSS_PLATFORM_SHARED_MEMORY_V0_CONTROL_SIMULATION_TEST_PLAN_20260629.md`

> **요약:** v0는 synthetic subject · dev/shadow · flag OFF · 제품 repo 미수정 · `applied_to_real_user=false` · `write_live=false` · `raw_text_stored=false`. Cosmile/SIASIU는 **제안**하고 Foundation gate가 **판정**하며(fail-closed), 모든 live/write/PII/canonical/Vault 경로는 **DISABLED 상태로 유지**된다.
