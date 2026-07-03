# Cross-Platform Shared Memory — Role Boundary — 2026-06-29

> Cross-platform shared memory v0의 **역할 경계 정정(Role Boundary Correction)**.
> 정본 계약: `contracts/CROSS_PLATFORM_SHARED_MEMORY_CONTRACT_V0.md`.
> ★v0 = synthetic subject · dev/shadow · `applied_to_real_user=false` · `write_live=false`. 제품 repo는 이 control train이 직접 수정하지 않는다.

## 0. 한 줄 정정

**Cosmile은 고객 memory를 추출/해석하지 않는다.** Cosmile은 **commerce/platform event signal**만 내보낸다(outbox).
의미 부여·memory 도출·저장·gate·identity·consent는 **Foundation**이 소유한다. **SIASIU**는 distilled consultation **memory candidate**만 제안한다.

## 1. 역할 표 (소유 / 책임)

| 주체 | 소유 | MUST | MUST NOT |
|---|---|---|---|
| **Cosmile** (commerce-first) | platform event **signal outbox** | product_view/wishlist/cart/purchase/consultation_session_meta 를 raw/PII 없이 **signal**로 outbox · Foundation verdict **표시(소비)** | ★customer memory extraction · personalization 구현 · 추론/장기기억 승격 · "이 고객은 X" memory candidate 생성 · 원문/PII 전송 · 주문/결제/고객 DB write |
| **SIASIU** (consultation-first) | consultation **memory candidate** 제안 | 상담 distilled(question/answer/evidence_refs/hash) → candidate 제안(contract 확정 후) · 상담 원문은 **SIASIU local** | ★raw_text/PII Foundation 전송 · answer.py 변경 · 자체 저장/판정 |
| **Foundation** | shared AI memory · memory gate · subject identity · consent/scope/retention | global subject identity v0(shadow) · shared AI memory profile · gate(allow/block/session_only/ask_consent/delete/expired) · `raw_text_stored=false` 강제 · signal/candidate **해석·도출** | ★원문/PII 저장 · canonical/learned/Vault write · real customer memory write · production/public API live |
| **foundation-control** | cross-platform contract · regression · simulation · release approval | 계약 단일출처 · synthetic e2e simulation · regression 보존 · release 승인 게이트 | ★제품 repo 임의 수정 · live enable · force push |

## 2. Cosmile = Signal Outbox (≠ Memory Candidate)

- Cosmile이 내보내는 것은 **PlatformEventSignal**(계약 §4): `event_kind`(product_view|wishlist|cart|purchase|consultation_session_meta) +
  **집계/범주 ref**(`category_ref`/`count`/`recency_bucket`) + `evidence_refs`. **원문/PII/금액상세/주문ID 금지.**
- `interprets_customer=false`, `memory_candidate=false`, `raw_text_stored=false`, `applied_to_real_user=false`, `write_live=false`.
- **Foundation이** 이 signal로부터 memory를 도출할지(gate 경유) 스스로 결정. Cosmile은 `write_intent`(candidate/approved)를 주장하지 않는다.
- Cosmile은 Foundation verdict를 **표시**만 — 판단/저장/해석은 Foundation.

## 3. SIASIU = Consultation Memory Candidate (distilled only)

- 상담 **원문은 SIASIU local 보관.** Foundation에는 distilled(질문/답변/evidence_refs/hash)만.
- `memory_kind = preference | concern | reaction | safety_note | decision_history | outcome_feedback` candidate 생성은 **control contract 확정 후** 가능.
- reaction/concern = sensitive↑ → `consent_scope` 필요. raw_text/PII 전송 금지. answer.py 무변경(fingerprint `d7f579443f8a110a`).
- ※현황: SIASIU repo는 이미 사용자가 `Memory Candidate Adapter v0 (shadow)`(SIASIU `d0f8dc3`)를 본 계약 정합으로 구현 시작함(repo-local, dev/shadow). → 본 계약/role과의 정합 검증은 control simulation에서.

## 4. Foundation = 해석·memory·gate·identity·consent 소유

- signal(Cosmile) + candidate(SIASIU) **수신** → gate 판정 → shared AI memory(요약/refs/hash) **shadow write**.
- `resolve_subject`(salted hash) · `gate_decision`(fail-closed) · `read_memory`(scoped) · `delete/expire`(shadow).
- ★`raw_text_stored=false` 불변식 강제. 원문/PII 저장 0.

## 5. 다음 implementation 순서

1. **Foundation repo** (control 승인 후): global subject identity v0(shadow) + shared memory store(요약만) + gate 확장(retention/session/ask_consent) + API(§2). → `IMPL_PROMPT_FOUNDATION_MEMORY_V0`.
2. **SIASIU repo**: consultation memory candidate adapter(distilled, hash/refs) — *이미 `d0f8dc3`로 시작됨* → 계약 정합 검증. → `IMPL_PROMPT_SIASIU_MEMORY_V0`.
3. **Cosmile repo**: commerce **signal outbox** adapter(role-corrected — memory candidate 아님). → `IMPL_PROMPT_COSMILE_MEMORY_V0`(signal outbox로 정정).
4. **foundation-control**: synthetic-subject e2e simulation(signal+candidate → gate → shadow write → scoped read → delete/expire) + dual-vertical regression 보존. → control simulation test plan.

각 repo-local 구현은 **Leo 승인 + dev/shadow** 전제. cross-project 변경은 foundation-control release train 경유.

## 6. Risk / Gap

| risk/gap | 영향 | 완화 |
|---|---|---|
| Cosmile이 과거 계약에서 "memory candidate adapter"로 명시되어 있었음 | 역할 혼선·과도한 personalization 구현 위험 | ★본 정정으로 Cosmile=signal outbox 한정 · 계약 §4 재정의 |
| SIASIU `d0f8dc3` 선구현이 최신 계약(role-corrected)과 어긋날 가능성 | candidate 형식/필드 불일치 | control simulation에서 계약 정합 검증 → 불일치 시 SIASIU repo-local 보정 train |
| signal→memory 도출 책임이 Foundation에 집중 | Foundation gate 정확도가 안전 좌우 | fail-closed gate + raw/PII 불변식 + synthetic 검증 |
| global subject identity 부재(현재) | cross-service link 불가 | subject_ref(salted hash) v0 shadow 도입(consent 필요) |
| consent/scope/retention 현재 PARTIAL | 동의·보존 강제 미흡 | 계약에 명시 + enforcement는 다음 train |
| frame/LLM 추출 정확도(이전 train 경계) | mislabel 잔여 | caller classifier train + 다음 train |

## 7. 불변식 / 금지 (재확인)

real customer memory write · production/public API live · raw 상담원문 Foundation 저장 · PII Foundation 저장 ·
checkout/order/customer DB write · canonical/learned/Vault write · memory.db 생성/접근 · 제품 repo 임의 수정 · force push = **전부 금지**.
모든 contract/signal/candidate/decision: `applied_to_real_user=false`, `write_live=false`, `raw_text_stored=false`.
