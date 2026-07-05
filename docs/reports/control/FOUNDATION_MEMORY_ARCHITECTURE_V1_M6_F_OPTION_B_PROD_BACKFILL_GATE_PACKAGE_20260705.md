# Memory V1 — M6-F Option B Prod DB Backfill Gate Package (service-local mint · prod write = Hard Stop)

> 작성: foundation-control(Control) · 2026-07-05 · **정본(Option B): 실 prod DB subject_ref backfill = service-local mint. prod DB write = Hard Stop·미수행.**
> ★prod DB write/backfill · 실 Vault write · live · main merge = Hard Stop(Leo 별도 최종 승인 전 절대 미수행). raw/PII/실 secret 값 출력 0(count/hash/boolean).
> 근거(local): Option B contract·shadow pivot result(`1e24c33`) · dev backfill verify(`10996c5`·로직 재사용).

---

## 1. Fact
- Option B: subject_ref backfill = **service-local mint**(각 서비스가 자기 `<SERVICE>_SUBJECT_SECRET`로 NULL→subject_ref). ★**Foundation call / identity-touch 0.**
- dev/staging backfill 검증(`10996c5`)의 로직(guest 제외·missing skip·idempotency·W1 orphan 0) 재사용·mint 주체만 service-local.

## 2. Precondition (전부 충족 전 prod backfill 금지)
1. **ops post-injection verification PASS**(Option B template·per-service `<SERVICE>_SUBJECT_SECRET` 사용·값 분리·dev fallback 차단·**Foundation mint 경로 부재** 확인).
2. dev/staging backfill 검증 PASS(`10996c5`·service-local mint로 재현).
3. **stable_id 획득 경로 확정**(대상 row의 canonical local_user_ref → `<SERVICE>_SUBJECT_SECRET` mint·복구 불가 = skip/abort).
4. backup/integrity/rollback rehearsal(EXEC-1).
5. runner taxonomy 동일(83/89·watch)·runner-fix train 별도(live 전 89/89).
6. **Leo 별도 최종 승인**(prod DB 접근 = 이 gate).

## 3. Backfill scope (Option B·prod·승인 시)
- **대상:** prod memory row `subject_ref=NULL` 중 stable_id 복구 가능 row만.
- **단일 NULL→subject_ref fill:** `subject_ref = subj_v2_ + HMAC(<SERVICE>_SUBJECT_SECRET, "<service>:subject:"+stable_id)[:32]` — **service-local mint**(Foundation 미호출). `secret_version=1`.
- **guest-only 제외(③):** guest_ref-only(stable_id 없음) = 대상 아님·NULL 정상(COALESCE·partial index).
- **missing stable_id abort/skip:** 복구 불가 row → skip + count 보고·임계 초과 abort.
- **기존 non-NULL 재계산 금지**(re-keying 0)·**idempotency**(non-NULL skip).
- **W1 atomicity:** `write_subject_ref_map_atomic`(SubjectRefMap 행 + memory 갱신 동일 tx·부분실패 rollback·orphan 0).

## 4. Backup / integrity (EXEC-1·prod 전 필수)
- WAL-safe backup(prod DB)·integrity_check(원본·backup)·전후 count/checksum(기존 non-NULL 무변경·NULL count 전후·backfill/skip/abort count). ★raw/PII/실 secret 값 0.

## 5. Validation (prod backfill 후·count/hash/boolean)
- 기존 non-NULL subject_ref 무변경(checksum)·NULL→fill count=대상·guest/missing NULL 유지·재실행 idempotent(2회차 0)·W1 orphan 0·runner taxonomy 동일·**Foundation mint 호출 0**(service-local만).

## 6. Rollback / recovery
- backup→restore rehearsal·integrity·subject_ref NULL 복귀·partial failure rollback(W1 atomic). ★reset/db push 금지·rollback=backup 복원.

## 7. Hard Stop / Boundary
> ★**prod DB write/backfill 미수행**(Hard Stop). ops post-injection PASS(Option B) + Leo 별도 최종 승인 후에만. 금지 유지: prod DB write·실 Vault write·live·hard reject·main merge·raw/PII/실 secret 값 출력·reset/db push.

## 8. Next action
- 순서: **ops per-service SUBJECT_SECRET 주입 → post-injection verification PASS(Option B·control review) → [Leo 별도 최종 승인] → prod DB backfill(service-local mint·EXEC-1)**.
- ★prod DB backfill·실 Vault write·live·main merge = Hard Stop.

## 무결성
Option B prod backfill gate **package(plan)** only · prod DB write/backfill 0 · 실 Vault write 0 · **Foundation mint 0(service-local)** · live 0 · **main merge 0**(fnd 580093c·siasiu 3cd068d·cosmile 3ba91e0) · 코드/DB 변경 0 · raw/PII/실 secret 값 0 · 본 package만 commit/push · **prod backfill은 ops post-injection PASS + Leo 별도 최종 승인 후에만.**
