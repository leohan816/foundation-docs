# Memory V1 — M6-F Dev/Staging Backfill Verification Result (dev DB + synthetic)

> 작성: foundation-control(Control) · 2026-07-05 · **범위: Leo 승인 dev/staging subject_ref backfill **검증** execution(dev DB only·EXEC-1 패턴).**
> ★prod secret 주입 · prod DB backfill · prod DB 접근 · live enable · main merge = **미승인·미수행.** identity-touch flag **OFF 유지**. Restricted Actions List = source report 참조.
> ★raw/PII/실 secret 값 출력 0(count/hash/boolean만) · dev secret(fallback)만 · runner baseline decision = execution gate package(`676a362`) 확정.
> 근거(local): execution gate package(`676a362`) · schema migration(secret_version) · FOUNDATION impl(shadow·flag OFF `0687404`).

---

## 1. Fact
- **dev/staging backfill 검증 완료:** 실 dev `memory.db`(EXEC-1 backup/integrity/no-op target/unchanged) + **synthetic disposable DB**(backfill 로직 전 케이스). ★prod DB/secret 미접근·live 0·flag OFF.
- **핵심 결과:** guest-only 제외·missing furef skip·idempotency·기존 non-NULL 재계산 0·**W1 atomicity orphan 0**·secret 값 분리(boolean)·dev fallback(prod secret 0).
- ★실 dev DB 무접촉(memory.db mtime 무변경)·prod DB 0.

## 2. Preflight result
| preflight | 결과 |
|---|---|
| independent test rerun | FOUNDATION shared_memory **41/41**·eval **16/16** · SIASIU adapter **31/31**·fingerprint **d7f579443f8a110a** · gate **57/57** · readiness **14/14** |
| runner taxonomy | **83/89 · {lmr 5, brain 1}**(추가 감소 0·새 taxonomy 0 → 진행 조건 충족·decision대로 watch carry) |
| identity-touch flag OFF | **True**(`shared_memory_v0_shadow` default OFF) |
| no-retention/enum/fail-safe | enum guard(leak→cannot_determine) **True** · fail-safe(unknown env→production) **True** |
| furef 획득 가능성 | furef-bearing / guest-only / missing-furef / malformed 케이스 구분 검증(§5) |

## 3. Backup / integrity result
- 실 dev `memory.db`: WAL-safe backup integrity **ok** · 원본 integrity **ok** · backup artifact 보존.
- ★rollback rehearsal(backup→restore) integrity **ok**.

## 4. Backfill verification scope (실행됨·dev+synthetic)
- **실 dev memory.db(EXEC-1 no-op):** ltm_fact row **0**(empty)·backfill target(subject_ref NULL ∧ guest_ref NULL) **0** → no-op·기존 테이블 count/checksum **무변경**.
- **synthetic disposable DB(로직 검증):** 5 케이스 seed(furef+NULL·guest-only·missing-furef·malformed·이미 non-NULL) → backfill:
  - **backfilled = 1**(furef 보유 NULL → identity-touch mint(furef→subj_v2·dev secret) → subject_ref + secret_version=1·W1 atomic).
  - **existing non-NULL 재계산 = 0**(이미 mint된 행 skip·값 불변).
- ★subject_ref/furef/secret **값 미출력**(count/boolean만).

## 5. Guest / missing furef handling
| 케이스 | 처리 | count |
|---|---|---|
| guest-only(furef 없음·guest_ref) | **제외(③)**·NULL 유지 | guest_skip = 1 |
| missing furef(비guest·furef 없음) | **skip + 보고(W3)** | missing_furef_skip 포함 |
| malformed furef(furef_v2 형식 아님) | **skip(W3)** | missing_furef_skip 포함 → 총 2 |
- ★guest/missing 행 backfill 후에도 subject_ref **NULL 유지** 확인(guest_still_null·missing_still_null = True).

## 6. Idempotency result
- 2회차 backfill: **backfilled = 0**(이미 fill된 행 skip)·`idempotent = True`. 재실행 안전.

## 7. W1 atomicity / orphan result
- **성공:** backfill 행마다 `write_subject_ref_map_atomic`(SubjectRefMap 행 + memory 갱신 동일 tx).
- **orphan 검사:** non-NULL subject_ref 중 SubjectRefMap 부재 = **0**(`w1_orphan_count = 0`).
- **부분실패 rollback:** 주입 실패 시뮬 → SubjectRefMap 행 미생성(`w1_rollback_no_orphan = True`)·memory 갱신도 rollback.

## 8. Test / runner result
- test rerun(§2) 전량 PASS·fingerprint 유지 · runner **83/89 taxonomy 동일**(decision: runner-fix train 별도·이 gate watch carry·추가 감소 0).
- secret 값 분리(boolean): `_FUREF_SECRET ≠ _SECRET` **True** · cross-producer furef `candidate==auth` **True** · dev fallback(prod secret 미주입) · ★값 미출력.

## 9. Integrity
dev/staging backfill **검증** only · prod secret 주입 0 · prod DB backfill 0 · prod DB 접근 0(prod_db=False) · prod secret 사용 0(prod_secret=False·dev fallback) · live 0 · identity-touch flag OFF 유지 · **기존 non-NULL subject_ref 재계산 0** · guest-only 제외 · missing furef skip · idempotent · **W1 orphan 0** · **main merge 0**(fnd 580093c·siasiu 3cd068d·cosmile 3ba91e0) · 코드/실 dev DB 데이터 변경 0(memory.db 무접촉·EXEC-1 backup만) · raw/PII/실 secret 값 출력 0 · backup+rollback rehearsal 수행 · 서버 잔여 0.

## 10. Next gate recommendation
- ★**dev/staging backfill 검증 PASS** → 다음(각 별도 최종 Leo 승인):
  1. **prod secret 주입 gate**(FOUNDATION_SUBJECT_REF_SECRET·per-service FUREF secret 값 분리·env/vault·dev fallback 차단 확인).
  2. **prod DB backfill gate**(실 prod DB·backup·단일·idempotent·guest 제외·W1·count/checksum·최종 별도 승인·prod DB 접근은 이 gate).
  3. **runner-fix train**(별도·full production live enable 전 89/89 회복 필수).
- ★**prod secret 주입·prod DB backfill·live·main merge는 각 별도 최종 Leo 승인**·execution gate(prod) 계속 닫힘.

## 무결성
Leo 승인 dev/staging backfill 검증 only · prod secret 0 · prod DB 0 · prod backfill 0 · live 0 · flag OFF 유지 · 기존 non-NULL 재계산 0 · W1 orphan 0 · **main merge 0** · 실 dev DB 데이터 변경 0(무접촉) · raw/PII/실 secret 값 0 · backup+rollback rehearsal · 본 result report만 foundation-docs commit/push · **prod secret 주입·prod DB backfill·live·main merge는 각 별도 최종 Leo 승인.**
