# Memory V1 — M6-F Additive Schema Migration Execution Result (dev·SubjectRefMap +secret_version)

> ★[OPTION A — Option B pivot(shadow FOUNDATION `5a0003c` / SIASIU `d0f51cb` · docs `1e24c33`)로 **SUPERSEDED**. 정본: `..._M6_F_OPTION_B_SUBJECT_REF_CONTRACT_20260705.md` · `..._OPTION_B_SHADOW_PIVOT_RESULT_20260705.md`. ★Foundation-side mint · FOUNDATION_SUBJECT_REF_SECRET · identity-touch = **폐기(deprecated·Option A relic)**. subject_ref = service-local mint(Foundation validate/gate only).]

> 작성: foundation-control(Control) · 2026-07-05 · **범위: Leo 승인 dev additive schema migration 실행 결과(SubjectRefMap +secret_version·EXEC-1 패턴).**
> ★FOUNDATION implementation · M6-F execution · prod secret · subject_ref backfill · main merge = **미승인·미수행.** W1~W6 = FOUNDATION impl gate 이월(구현 0). Restricted Actions List = source report 참조.
> 근거: schema migration gate package(`77ee62a`) · design review(`02fe421`·W1~W6) · EXEC-1 패턴.

---

## 1. Fact
- **dev DB additive migration 실행 완료:** SIASIU `memory.db`·Cosmile `dev.db`의 SubjectRefMap에 **`secret_version` + partial unique index** 추가. 기존 subject_ref 값/count/checksum **무변경**·version 구조 검증·rollback rehearsal PASS.
- **commit:** SIASIU `shadow/m4-siasiu-memory` **`bef7fdd`**(모듈 DDL) · Cosmile `shadow/m4-cosmile-memory` **`8bfbcd5`**(schema.prisma+migration record) · push·main 무변경.
- ★subject_ref 값 변경 0·backfill 0·prod 0·reset/db push 0.

## 2. Migration scope (실행됨·dev only)
| 대상 | 적용 |
|---|---|
| SIASIU `subject_ref_map` | `+secret_version INTEGER NOT NULL DEFAULT 1` + `ux_srm_furef_version`(local_user_ref_hash, secret_version) WHERE local_user_ref_hash IS NOT NULL |
| Cosmile `SubjectRefMap` | `+secretVersion INTEGER NOT NULL DEFAULT 1` + raw `ux_SubjectRefMap_furef_version`(localUserRefHash, secretVersion) WHERE localUserRefHash IS NOT NULL |
- ltm_fact/EpisodeSummary/MemoryFactCandidate = **무변경**(subject_ref opaque·denorm 미포함). ★read-side union/rolling/retirement = **미구현**(FOUNDATION impl gate).

## 3. Backup / integrity result
| | SIASIU memory.db | Cosmile dev.db |
|---|---|---|
| WAL-safe backup(`.backup`) | ✅ integrity **ok** | ✅ integrity **ok** |
| 원본 integrity(pre) | **ok** | **ok** |
| 원본 integrity(post·회귀) | **ok** | **ok** |
- backup artifact 보존(scratchpad·rollback 경로): `siasiu_srm_backup.db`·`cosmile_srm_backup.db`.

## 4. Precheck result
- furef-bearing 행(local_user_ref_hash/localUserRefHash NOT NULL) **중복 = 0**(양 DB) → partial unique index 생성 선결 충족(충돌 0).

## 5. DDL applied
- SIASIU: `secret_version` 추가 ✅ · `ux_srm_furef_version` 생성 ✅.
- Cosmile: `secretVersion` 추가 ✅ · `ux_SubjectRefMap_furef_version` 생성 ✅ · schema.prisma `secretVersion Int @default(1)` 반영 · migration record(`*_subjectrefmap_secret_version`) + `resolve --applied` → **migrate status "up to date"** · prisma **validate PASS** · ★`prisma migrate reset`/`db push` **미사용**.

## 6. Validation result
| 검증 | SIASIU | Cosmile |
|---|---|---|
| 기존 테이블 row count 무변경 | ✅ | ✅ |
| 기존 컬럼 checksum 무변경(secret_version 제외) | ✅ | ✅ |
| 기존 행 secret_version=1 | ✅ | ✅ |
| **동일 furef + 다른 version 허용** | ✅ | ✅ |
| **동일 furef + 동일 version reject**(unique) | ✅ | ✅ |
| **guest NULL 다중 허용**(partial 제외) | ✅ | ✅ |
| test rows 미영속(tx rollback) | ✅ | ✅ |
- Cosmile dev.db row 합 resolve 전후 **176=176**(prisma 기록만·데이터 무변경).
- ★version 구조 검증 test rows는 **트랜잭션 rollback으로 미영속**(실 DB에 test 데이터 0).

## 7. Rollback rehearsal result
| | SIASIU | Cosmile |
|---|---|---|
| restore integrity ok | ✅ | ✅ |
| restore에 secret_version 미포함(=migration 전 상태) | ✅ | ✅ |
| restore row count = pre 일치 | ✅ | ✅ |
- ★실 rollback = backup 복원(sqlite ADD COLUMN 즉시 DROP 곤란)·backup artifact 보존.

## 8. W1~W6 carry-forward (이 gate 미구현·FOUNDATION impl gate 이월)
- **W1** write-side atomicity(map 행=첫 memory row 동일 tx/이전 commit) · **W2** zero-orphan은 canonical stable furef 조건부 · **W3** canonical stable_id/furef 획득(+furef secret 분리) · **W4** reason_codes enum(api.py+gate.py) · **W5** identity-touch no-retention(비캐시·카운터 count-only·prod per-service secret 값 분리) · **W6** fail-safe prod default(shadow 3모듈).
- ★이 gate = **스키마(secret_version + version index)만** 마련. W1~W6 = FOUNDATION impl gate·구현 0.

## 9. Integrity
dev additive schema migration only · secret_version/index additive · **기존 subject_ref 값 변경 0** · 기존 count/checksum 무변경 · FOUNDATION 구현 0 · M6-F execution 0 · prod secret 0 · subject_ref backfill 0 · prod DB 0 · live 0 · hard reject 0 · **main merge 0**(siasiu 3cd068d·cosmile 3ba91e0) · `prisma migrate reset`/`db push` 미사용 · raw/PII/실 secret 값 출력 0 · 회귀 0(gate 57/57·SIASIU integration 39/39·fingerprint d7f579443f8a110a·adapter 28/28·schema test 27/27·Cosmile readiness 164/164·loop 112/112·vitest 10/10·dev DB integrity ok) · backup+rollback rehearsal 수행 · 서버 잔여 0.

## 10. Next gate recommendation
- ★**additive schema migration(dev) 완료** → 다음(각 별도 Leo 승인):
  1. **FOUNDATION implementation gate** — W1(write-side atomicity)·W3(canonical stable_id/furef 획득)·W4(enum guard)·W5(identity-touch no-retention) 못박기 + identity-touch API·_factory furef 수용·R9-1 echo 제거·R8-2 enum·canonical furef derivation. (W6 fail-safe = shadow patch 병행 가능.)
  2. **M6-F execution gate** — prod secret 주입·subject_ref backfill(§ backfill 조건·backup·단일·idempotent·guest 제외). ★계속 닫힘.
- ★**M6-F execution(prod secret·backfill)은 여전히 별도 Leo 승인**·execution gate 닫힘 유지.

## 무결성
Leo 승인 dev additive schema migration only · secret_version 추가(SubjectRefMap·양 서비스) · 기존 subject_ref 값 변경 0 · 기존 count/checksum 무변경 · FOUNDATION 구현 0 · M6-F execution 0 · prod secret 0 · backfill 0 · prod DB 0 · main merge 0 · reset/db push 미사용 · raw/PII/실 secret 값 0 · 회귀 0 · backup+rollback rehearsal 수행 · shadow 커밋(SIASIU `bef7fdd`·Cosmile `8bfbcd5`) · 본 result report만 foundation-docs commit/push · **FOUNDATION impl gate·M6-F execution은 각 별도 Leo 승인.**
