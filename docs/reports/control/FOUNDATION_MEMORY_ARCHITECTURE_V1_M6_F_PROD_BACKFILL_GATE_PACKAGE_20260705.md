# Memory V1 — M6-F Prod DB Backfill Gate Package (plan-only · prod write = Hard Stop)

> 작성: foundation-control(Control) · 2026-07-05 · **범위: 실 prod DB subject_ref backfill gate **package**(계획) — prod DB write = Hard Stop·미수행.**
> ★**prod DB write/backfill · 실 Vault write · live · main merge = Hard Stop(Leo 별도 최종 승인 전 절대 미수행).** Restricted Actions List = source report 참조.
> ★진입 조건: **ops post-injection verification PASS 후에만.** raw/PII/실 secret 값 출력 0(count/hash/boolean).
> 근거(local): dev/staging backfill 검증(`10996c5`·PASS) · post-injection template(본 batch) · schema migration(secret_version) · execution gate package(`676a362`).

---

## 1. Fact
- dev/staging backfill 검증 PASS(`10996c5`): guest 제외·missing furef skip·idempotency·기존 non-NULL 재계산 0·W1 orphan 0·EXEC-1(backup/integrity/count-checksum/rollback). → 이를 **prod backfill precondition**으로 연결.
- ★prod DB write = Hard Stop. 본 package = 계획.

## 2. Precondition (전부 충족 전 prod backfill 금지)
1. **ops post-injection verification PASS**(post-injection template §4 checklist 전 항목 True·특히 secret 값 분리·dev fallback 차단·version=1).
2. **dev/staging backfill 검증 PASS**(`10996c5`·재현 가능).
3. **furef 획득 경로 확정**(대상 row furef 복구 가능·불가 = skip/abort).
4. **backup/integrity/rollback rehearsal 준비**(EXEC-1).
5. **runner taxonomy 동일**(83/89·{lmr 5, brain 1}·추가 감소 0)·runner-fix train은 별도(live 전 89/89).
6. **Leo 별도 최종 승인**(prod DB 접근 = 이 gate).

## 3. Backfill scope (prod·승인 시)
- **대상:** prod memory row `subject_ref=NULL` 중 **furef 보유(복구 가능)** row만.
- **guest-only 제외(③):** guest_ref-only(furef 없음) = 대상 아님·NULL 정상(COALESCE·partial index).
- **missing furef(비guest·furef 없음/malformed):** **skip + count 보고**·임계 초과 시 **abort**.
- **단일 NULL→subject_ref fill:** furef → identity-touch mint(subj_v2·secret_version=1) → subject_ref. **기존 non-NULL 재계산 금지**(re-keying 0).
- **W1 atomicity:** `write_subject_ref_map_atomic`(SubjectRefMap 행 + memory 갱신 동일 tx·부분실패 rollback·orphan 0).
- **idempotency:** non-NULL row skip·재실행 동일.

## 4. Backup / integrity (EXEC-1·prod 전 필수)
- **WAL-safe backup**(prod DB·python sqlite3 `.backup` 또는 동등)·integrity_check(원본·backup).
- **전후 count/checksum**: 기존 non-NULL subject_ref checksum 무변경·NULL count 전후·backfill count·skip/abort count.
- ★raw/PII/실 secret 값 0.

## 5. Idempotency / guest / missing furef 기준 (최종화)
| 케이스 | 처리 | evidence |
|---|---|---|
| furef 보유 NULL | backfill(mint·W1) | backfilled count |
| guest-only(furef 없음·guest_ref) | 제외·NULL 유지 | guest_skip count |
| missing furef(비guest) | skip + 보고 | missing_furef_skip count |
| malformed furef | skip(또는 임계 초과 abort) | missing_furef_skip count |
| 이미 non-NULL | skip(재계산 0) | already_skip count |
- ★재실행 idempotent(2회차 backfilled=0)·검증 필수.

## 6. Rollback / recovery
- **backup:** prod backfill 전 WAL-safe backup·artifact 보존.
- **restore rehearsal:** backup→restore·integrity·pre-state 일치·subject_ref NULL 복귀 확인.
- **partial failure:** backfill tx 부분실패 → rollback(W1 atomic·map+memory 함께·orphan 0).
- ★`prisma migrate reset`/`db push --accept-data-loss` 금지·rollback = backup 복원.

## 7. Validation (prod backfill 후·count/hash/boolean)
- 기존 non-NULL 무변경(checksum)·NULL→fill count = 대상·guest/missing NULL 유지·재실행 idempotent·W1 orphan 0·runner taxonomy 동일.

## 8. Hard Stop / Boundary
> **[이 package = plan]** ★**prod DB write/backfill 미수행**(Hard Stop). ops post-injection PASS + Leo 별도 최종 승인 후에만.
> **[금지 유지]** prod DB write · 실 Vault write · live enable · hard reject · main merge · raw/PII/실 secret 값 출력 · reset/db push.

## 9. Next action
- 순서: **ops 실 Vault 주입 → post-injection verification PASS(control review) → [Leo 별도 최종 승인] → prod DB backfill(EXEC-1·이 gate)**.
- ★prod DB backfill·실 Vault write·live·main merge = 각 별도 최종 Leo 승인·Hard Stop 유지.

## 무결성
prod DB backfill gate **package(plan)** only · prod DB write/backfill 0 · 실 Vault write 0 · live 0 · **main merge 0**(fnd 580093c·siasiu 3cd068d·cosmile 3ba91e0) · 코드/DB 변경 0 · raw/PII/실 secret 값 0 · 본 package만 commit/push · **prod backfill은 ops post-injection PASS + Leo 별도 최종 승인 후에만.**
