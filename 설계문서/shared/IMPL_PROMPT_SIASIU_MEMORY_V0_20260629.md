# Implementation Prompt — SIASIU Claude Code — Memory Candidate Adapter v0 (dev/shadow)

> 수신: **SIASIU repo의 Claude Code** (repo-local 구현 담당)
> 발신: foundation-control (Cross-Platform Memory Unification v0 control train)
> 단일 계약(SSOT): `contracts/CROSS_PLATFORM_SHARED_MEMORY_CONTRACT_V0.md`
> ★**v0 = synthetic subject 기반 dev/shadow simulation. 실사용자 live 아님.** `applied_to_real_user=false`, `write_live=false`, raw 상담원문/PII Foundation 저장 **금지**.
> 승인: 본 작업은 **Leo 승인** 후에만 착수/머지. dev/shadow 범위 고정. 제품 동작/실사용자 노출 변경 금지.

---

## 0. Context / 역할 (SIASIU = consultation-first + commerce)

SIASIU는 **상담(consultation)-first** 플랫폼입니다. 이 train에서 SIASIU의 역할은:

| 구분 | 내용 |
|---|---|
| SIASIU가 한다 | distilled 상담(question/answer/evidence_refs/hash) + feedback + profile_update → **MemoryCandidate 제안(propose)** |
| SIASIU가 안 한다 | 판정·저장(allow/block 등)·subject_ref 발급·원문 전송 — 전부 Foundation 소관 |
| Foundation이 한다 | `subject_ref` 발급, memory gate 판정, shared AI memory(요약만) shadow write |

★흐름: **SIASIU가 candidate를 제안 → Foundation memory gate가 판정(fail-closed) → 승인 시 Foundation이 요약만 shadow 저장.** SIASIU는 **self-store 하지 않는다.**

이 train은 **foundation-control에서 cross-project 설계**를 하고, **각 repo 구현은 해당 repo의 Claude Code 몫**입니다. 본 프롬프트는 SIASIU repo Claude Code에게 전달되는 **task**이며, **SIASIU repo 내에서만** 작업합니다(FOUNDATION/Cosmile repo 미수정).

### 0.1 ★ROLE CORRECTION (2026-06-29 — binding)

> 근거: `contracts/CROSS_PLATFORM_SHARED_MEMORY_CONTRACT_V0.md` §5 · `docs/CROSS_PLATFORM_SHARED_MEMORY_ROLE_BOUNDARY_20260629.md` §3.

- **SIASIU = consultation MEMORY CANDIDATE adapter.** 상담 distilled(`question/answer/evidence_refs/hash`)만 candidate로 제안. **상담 원문은 SIASIU local 보관** — Foundation 전송 금지(hash/refs only). `answer.py` 무변경(fingerprint `d7f579443f8a110a`).
- **Foundation = 해석·도출·gate·저장·subject identity·consent/scope/retention 소유.** signal/candidate를 **수신**해 gate 판정·shared AI memory(요약/refs/hash) shadow write. `raw_text_stored=false` 강제, 원문/PII 미저장.
- **Cosmile ≠ memory candidate.** Cosmile은 commerce/platform **EVENT SIGNAL OUTBOX**만(`PlatformEventSignal`: product_view/wishlist/cart/purchase/consultation_session_meta). ★고객 memory 추출·personalization·추론·장기기억 승격·"이 고객은 X" candidate 생성 **금지** · `interprets_customer=false` · `memory_candidate=false` · raw/PII 없음(집계/범주 ref + hash). → SIASIU는 Cosmile 역할(signal)과 혼동 없이 **candidate 제안**에만 집중.
- **foundation-control = contract·regression·simulation·release approval 소유.** v0 = synthetic subject · dev/shadow · `applied_to_real_user=false` · `write_live=false`.

### 0.2 ★STATUS (2026-06-29)

- **SIASIU repo는 이미 구현을 시작함:** commit **`d0f8dc3`** — *"Memory Candidate Adapter v0 (shadow)"* (repo-local, dev/shadow).
- 이 선구현은 **role-corrected 계약(§5)과의 정합 검증을 control simulation에서** 받아야 합니다. 불일치(필드/스키마/role 위반) 발견 시 SIASIU repo-local 보정 train으로 정렬. 본 프롬프트는 그 검증 기준선(baseline)입니다.

---

## 1. 목표 (What to build)

SIASIU repo 안에, **Memory Candidate Adapter v0 (dev/shadow)** 를 신규 모듈로 추가합니다. 이 어댑터는:

1. **입력** = distilled consultation `{question, answer, evidence_refs, hash}` (★**raw 본문 아님**) + `feedback` + `profile_update`.
2. **변환** = 위 입력을 계약(§1)의 **MemoryCandidate** 객체로 매핑.
3. **제안** = Foundation의 `propose_memory_candidate(candidate)` → `gate_decision(candidate)` 호출 (in-process/dev/shadow). **self-store 없음.**
4. **소비** = Foundation `gate_decision` verdict를 받아 로그/메트릭만 기록. 판정/저장은 SIASIU가 하지 않음.

★`created_from = consultation | feedback | profile_update` 만 사용 (SIASIU 계약 §5).

---

## 2. MemoryCandidate Schema (★계약 §1 — 필드명 그대로, 변경 금지)

어댑터 출력은 아래 스키마와 **100% 동일**해야 합니다. 필드명·enum 값을 임의 변경/추가/생략하지 마세요.

```jsonc
{
  "subject_ref": "subj_<salted-hash>",          // Foundation 소유 global subject id (평문 PII 없음)
  "source_service": "cosmile | siasiu",         // SIASIU 어댑터는 항상 "siasiu"
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

**불변식(코드 강제):** `raw_text_stored=false`, `applied_to_real_user=false`, `write_live=false`. 원문/PII 필드(query/body/email/phone/RRN/customer_name 등) **금지** — 들어오면 Foundation gate가 `block`.

---

## 3. SIASIU 매핑 규칙 (계약 §5 준수)

### 3.1 memory_kind 매핑

SIASIU 상담에서 도출 가능한 kind는 다음으로 한정합니다(계약 §5: `concern | reaction | decision_history | safety_note`, 그리고 feedback 입력은 `outcome_feedback`, profile_update는 `preference`).

| created_from | 입력 (distilled) | memory_kind | sensitivity_level | consent_scope 요건 |
|---|---|---|---|---|
| consultation | 피부/뷰티 고민 요약 | `concern` | **sensitive** | ★consent_scope 필요 (none이면 gate=ask_consent) |
| consultation | 사용 후 반응/민감성 신호 요약 | `reaction` | **sensitive** | ★consent_scope 필요 (none이면 gate=ask_consent) |
| consultation | 상담 결론/선택 이력 요약 | `decision_history` | normal | 기본 same_service |
| consultation | 안전 주의/금기 신호 요약 | `safety_note` | high↑ | 보수적; 미reconfirm 시 gate=block |
| feedback | 만족/결과 피드백 요약 | `outcome_feedback` | low~normal | preference/outcome_feedback는 evidence/ safety override 금지 |
| profile_update | 선호 요약 | `preference` | low~normal | same_service 기본 |

★**reaction / concern = sensitive** → `consent_scope`가 반드시 채워져야 하며, `none`이면 Foundation gate가 `ask_consent`로 판정합니다(fail-closed). `safety_note`는 high로 취급하고 reconfirm 없으면 `block`.

### 3.2 raw 금지 / hash·refs only

- 어댑터는 **question/answer 원문을 candidate에 넣지 않습니다.** `raw_text_hash` 또는 `content_hash`(sha256)와 `evidence_refs`(`src:`/`prov:` 포인터)만 채웁니다.
- `evidence_refs`는 **본문 없는 참조/해시**만 — 상담 원문, 이메일, 전화, 주민번호, 고객명 등 PII 절대 포함 금지.
- `raw_text_stored=false` 고정. 위반 시 Foundation gate `block`(`raw_text_present`).

### 3.3 write_intent / read_scope / retention

- `write_intent = candidate_only` 기본. session 한정 신호는 `session_only`(retention=session). 절대 `approved_memory`를 SIASIU가 단정하지 않음(판정은 Foundation).
- `read_scope`: SIASIU 기본 `same_service`. `cross_service`(예: Cosmile가 SIASIU 상담 요약 참조)는 **consent_scope=cross_service** 일 때만.
- `retention_policy`: session | short_ttl | standard_ttl | revocable 중 kind에 맞게. session/`session_only`는 영속 저장 안 함(gate=session_only).

### 3.4 subject_ref / local_user_ref

- SIASIU는 **subject_ref를 직접 만들지 않습니다.** `resolve_subject(source_service="siasiu", local_user_ref, consent_record)` (Foundation API §2)로 받아옵니다. consent 없으면 Foundation이 link 안 함(fail-closed).
- `local_user_ref`는 **opaque ref**(평문 PII 아님). 평문 식별자·이메일·전화 금지.

---

## 4. Foundation API 호출 경계 (계약 §2 — in-process/dev/shadow only)

SIASIU 어댑터가 호출하는 것:

| Foundation method | SIASIU 사용 | 비고 |
|---|---|---|
| `resolve_subject(source_service, local_user_ref, consent_record)` | subject_ref 획득 | consent 없으면 link 안 함(fail-closed) |
| `propose_memory_candidate(candidate)` | candidate 제출 | 저장 아님 — gate 대기 (`status:received`) |
| `gate_decision(candidate)` | verdict 수신 | allow/block/session_only/ask_consent/delete/expired + reason_codes |

SIASIU가 **호출하지 않는 것(전부 Foundation 내부)**: `write_approved_memory`(shadow, written=false), `read_memory`, `delete_memory`(shadow), `expire_sweep`(shadow). 모든 응답은 `applied_to_real_user=false, write_live=false`. public API live 아님 — in-process/dev/shadow only.

---

## 5. ★불변 제약 (반드시 지킬 것)

1. **`answer.py` MUST stay UNCHANGED — fingerprint `d7f579443f8a110a`.** 어댑터는 answer.py를 import/수정하지 않고, distilled 산출물만 별도 경로로 소비. 작업 종료 시 fingerprint 재확인하여 `d7f579443f8a110a` 동일함을 증명할 것.
2. **상담 raw text는 Foundation으로 전송 금지.** hash/refs만 전송. 원문/PII가 candidate에 들어가면 안 됨.
3. **self-store 금지.** SIASIU는 메모리를 저장하지 않음 — 제안만. 판정/저장은 Foundation gate.
4. `raw_text_stored=false`, `applied_to_real_user=false`, `write_live=false` 불변식 코드 강제(assert/validator).
5. **synthetic subject만** 사용. 실사용자 데이터/실사용자 노출 금지(dev/shadow).
6. 신규 코드는 **flag OFF 기본**(dev/shadow 경로). 기존 제품 동작 경로 미변경.

---

## 6. 금지 사항 (FORBIDDEN — v0 내내 DISABLED, 별도 승인 대상)

아래는 이 train에서 **절대 활성화하지 않으며**, 본 프롬프트로 구현/노출되지 않습니다(전부 DISABLED, 별도 승인 필요):

- production live / public API live
- real customer memory write / customer PII storage
- **상담원문 Foundation 저장** (raw consultation text → Foundation: 금지)
- checkout / order / customer DB write
- canonical / learned / Vault write
- real user exposure (실사용자 노출)
- force push
- `answer.py` 수정 (fingerprint `d7f579443f8a110a` 변경)

---

## 7. Acceptance Criteria (수용 기준)

| # | 기준 | 측정 |
|---|---|---|
| A1 | 모든 테스트/실행이 **synthetic subject, dev/shadow** | 실사용자 데이터 0건, real exposure 0건 |
| A2 | **`answer.py` 무변경** | fingerprint `d7f579443f8a110a` 동일 (전/후 비교) |
| A3 | **상담 raw text Foundation 미전송** | candidate에 원문/PII 0건; hash/refs only 검증 |
| A4 | **SIASIU integration 39/39 보존** | 기존 통합 테스트 전부 green |
| A5 | **workflow 119/119 보존** | 기존 워크플로 테스트 전부 green |
| A6 | 어댑터 출력이 **계약 §1 스키마와 100% 일치** | 필드명/enum 검증; 불변식 assert |
| A7 | reaction/concern = sensitive → consent_scope 필요 | consent_scope=none 시 gate=ask_consent 재현 |
| A8 | `applied_to_real_user=false`, `write_live=false`, `raw_text_stored=false` 전 candidate 강제 | validator/assert 통과 |
| A9 | self-store 없음 — propose/gate 경로만 사용 | write_approved_memory 등 미호출(Foundation 소관) |
| A10 | 신규 코드 flag OFF 기본, 기존 제품 경로 미변경 | 회귀 0 |

---

## 8. Deliverables (SIASIU repo 내, dev/shadow)

- `memory_candidate_adapter` 모듈(신규): distilled consultation/feedback/profile_update → MemoryCandidate 변환 + Foundation propose/gate 호출(in-process/dev/shadow).
- 불변식 validator (raw/PII reject, `*_stored/applied/live=false` 강제).
- synthetic-subject 테스트(어댑터 단위 + propose→gate verdict 소비). 기존 39/39 + 119/119 보존.
- fingerprint 증빙: `answer.py` = `d7f579443f8a110a` 전/후 동일.

---

## 9. 승인 / 운영

- 본 task는 **Leo 승인** 후 착수·머지. 범위는 **dev/shadow** 고정.
- 제품 repo(FOUNDATION/SIASIU/Cosmile)는 이 control train이 직접 수정하지 않음 — SIASIU repo Claude Code가 **repo-local**로 구현, Leo 승인.
- 의문/충돌 발생 시 **계약(`CROSS_PLATFORM_SHARED_MEMORY_CONTRACT_V0.md`)이 우선**하며, 계약과 불일치하는 구현은 금지.
- v0 종료 상태: 위 §6 항목 전부 **DISABLED 유지**. 활성화는 별도 train·별도 승인.
