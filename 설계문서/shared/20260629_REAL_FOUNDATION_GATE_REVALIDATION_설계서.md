# Real Foundation Gate Revalidation — 설계서 — 2026-06-29

> ★design-first 규칙(`CLAUDE.md §2.6`) 첫 적용 사례. **이 설계서가 APPROVED 된 뒤에만 revalidation을 실행**한다.
> 목표: mock gate 대신 **Foundation `b7cce1f` real shadow gate/API**로 Cross-Platform Shared Memory v0 계약을
> synthetic e2e로 재검증. 제품 repo 무수정 · memory.db 0 · live/write/promotion 0.

## 1. 목적
- foundation-control이 **Foundation의 real shadow gate/API(`foundation.shared_memory.*`)를 read-only로 import**해, mock gate(`memory_sim`)와 **동치(parity)** 임을 확인하고 v0 계약(`03f33cb` freeze)이 실제 구현에서 작동하는지 cross-project 재검증한다.
- design-first 절차(설계 → 승인 → 실행 → regression → report)를 처음으로 적용한다.

## 2. 현재 상태
- foundation-control `main@0f04413` — origin과 sync(pushed). 미커밋 0.
- FOUNDATION이 `shadow/foundation-shared-memory-v0@b7cce1f` 체크아웃됨(dirty=0), `foundation/shared_memory/` 구현 존재.
- 전제 고정: `03f33cb` = v0 shadow/dev contract freeze · `76ca035` = mock gate simulation **16/16 PASS**.
- 동일 revalidation을 이전 `8558e31`에서 **25/25 PASS**로 실행한 바 있음(harness·reports 존재). 이번엔 **design-first 절차로 재실행**해 신선한 증거를 남긴다.

## 3. 관련 repo / commit
| repo | ref | 비고 |
|---|---|---|
| foundation-control | `main@0f04413` | 본 train 커밋 대상 |
| FOUNDATION | `shadow/foundation-shared-memory-v0@b7cce1f` | real gate/API (read-only import) |
| SIASIU | `main@d0f8dc3` | memory candidate adapter (read-only import) |
| Cosmile | `main@b048e55` | signal outbox 미구현(role: commerce signal) |

## 4. 작업 범위
1. 본 설계서(+JSON) 작성 → 검증 → APPROVED.
2. `scripts/cross_platform_memory_v0_real_foundation_gate_revalidation.py`로 real-gate e2e simulation 실행(12 필수 시나리오 + mock↔real parity).
3. Foundation own test / SIASIU d0f8dc3 test / cross-project regression 확인.
4. reports(MD+JSON) 산출 + foundation-control 커밋(push 별도).

## 5. 하지 않을 것
- 제품 repo(FOUNDATION/SIASIU/Cosmile) 코드 수정 ❌ · Foundation main merge ❌.
- real customer memory write ❌ · production/public API/live ❌ · canonical/learned/Vault write ❌ · memory.db 생성/접근 ❌ · force push ❌.
- answer.py/answer_provenance.py/safety guard/answer_mode 변경 ❌.

## 6. Role boundary
- **foundation-control:** 검증 주체. real gate를 **read-only import**해 simulation. 제품 코드 무수정.
- **Foundation(`b7cce1f`):** subject identity·shared memory store·gate·API의 **owner**(mock 아닌 real). flag default OFF.
- **SIASIU(`d0f8dc3`):** candidate adapter(제안만, `gate_decision=None`). **Cosmile:** commerce **signal outbox**(memory candidate 아님; 미구현).

## 7. Data boundary
- **synthetic subject만** 사용(`synthetic_user_*`). 평문 PII는 입력/출력/trace/report 어디에도 0.
- Foundation에 raw 상담 원문/PII 미저장 — **요약/content_hash/evidence_refs만**. store는 in-memory 휘발성(**memory.db 0**).

## 8. Safety boundary
- gate **fail-closed**(계약 §3): raw/PII/malicious/invariant 위반 → block. cross-subject → block. deleted/expired → 재등장 금지.
- feature flag(`shared_memory_v0_shadow`·`siasiu_memory_candidate_shadow_enabled`) **default OFF** — test에서만 일시 ON 후 **복원**. `applied_to_real_user=false`·`write_live=false`·written=false 불변.

## 9. Contract / schema
- 정본: `contracts/CROSS_PLATFORM_SHARED_MEMORY_CONTRACT_V0.md` (`03f33cb` freeze). MemoryCandidate §1 17필드 · gate_decision ∈ {allow, block, session_only, ask_consent, delete, expired} · PlatformEventSignal(`memory_candidate=false`·`interprets_customer=false`).
- real gate 모듈: `foundation.shared_memory.{contract,gate,store,subject_identity,api}` (b7cce1f). API: `resolve_subject`/`ingest_event_signal`/`propose_memory_candidate`/`gate_decision`/`write_approved_memory`/`read_memory`/`delete_memory`/`expire_sweep`.
- namespace: `foundation.shared_memory`(FOUNDATION) + `ssbrain`(SIASIU/app) 분리 — SIASIU root는 path 미등록(foundation 충돌 회피).

## 10. Expected behavior (필수 시나리오)
1. SIASIU candidate → Foundation gate → **shadow write/read** (allow→요약 read)
2. raw_text 포함 candidate → **block**
3. PII-like candidate → **block**
4. session_only → **durable read 미노출**
5. consent unknown + cross_service read → **block**
6. expired → read **block**
7. deleted → **must_not_reappear**
8. Cosmile PlatformEventSignal(`memory_candidate=false`) → **stored_as_memory=false**
9. malicious candidate/signal → **block/reject**
10. trace/report raw/PII **0**
11. memory.db 생성 **0**
12. live/write/promotion **0**
- 추가: **mock↔real gate parity** (동일 gate_decision + reason_codes).

## 11. Test plan
- 위 12 시나리오 + parity 6 케이스를 `cross_platform_memory_v0_real_foundation_gate_revalidation.py`로 실행 → `all_pass` 기대.
- Foundation own test `test_shared_memory_v0.py` **PASS** · SIASIU `test_siasiu_memory_candidate_adapter.py` **PASS**.

## 12. Regression plan
- cross-project regression **all_pass** 유지: Foundation runner **89/89·651** · SIASIU integration **39/39** · workflow **119/119** · Cosmile readiness **164/164** · loop v0.1 **112/112** · loop tests 23/23.
- **answer.py fingerprint `d7f579443f8a110a` 불변**(독립 subprocess + SIASIU integration 단언). 어떤 테스트도 변경/삭제 안 함.

## 13. Rollback plan
- 본 train은 **문서/리포트만 추가** → 해당 커밋 normal revert 또는 파일 삭제로 충분. 코드/제품 repo 영향 0.
- feature flag는 test 후 OFF 복원하므로 런타임 상태 변화 0.

## 14. Implementation phases
- **P0:** 본 설계서(+JSON) 작성.
- **P1:** 설계 검증(문서 존재·JSON valid·제품 repo 0·secret/PII 0·memory.db 0).
- **P2:** real-gate e2e simulation 실행(12 시나리오 + parity).
- **P3:** Foundation/SIASIU test + cross-project regression.
- **P4:** reports(MD+JSON) + foundation-control 커밋(push 별도 승인).

## 15. 승인 조건
- 설계서 16섹션 존재 · JSON valid · 제품 repo 변경 0 · secret/PII 0 · memory.db 0 → **APPROVED**.
- ★승인 근거: **Leo go-ahead 2026-06-29 ("c로 진행")** = 본 train APPROVED. 실행은 P1 검증 통과 후 진행.

## 16. 다음 implementation prompt
> revalidation PASS 후:
> 1. **Foundation main merge**(별도 승인, safe-additive, flag OFF) — 설계서: 별도 작성.
> 2. **Cosmile signal outbox 구현**(설계자료/에 설계서 먼저 → 승인 → repo-local) — mock purchase only.
> 3. **subject_ref salt 통일**(Foundation `resolve_subject` 정본) — 설계서 먼저.
