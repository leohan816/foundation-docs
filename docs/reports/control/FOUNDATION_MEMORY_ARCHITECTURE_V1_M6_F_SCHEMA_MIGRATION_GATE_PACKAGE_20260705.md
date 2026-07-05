# Memory V1 — M6-F Additive Schema Migration Gate Package (SubjectRefMap +secret_version)

> 작성: foundation-control(Control) · 2026-07-05 · **범위: SubjectRefMap `secret_version` additive schema **package**(DDL 설계/검증 계획) — migration 실행 아님.**
> ★**gate package only. schema migration 실행 · FOUNDATION-side 구현 · M6-F execution = 각 별도 Leo 승인 전까지 미진행.** Restricted Actions List = source report 참조.
> 근거(local 직독): design review(`02fe421`·APPROVE_WITH_WATCH·proceed to additive schema migration gate) · design gate(`24b3014`·§3) · SIASIU `foundation_memory_schema_shadow.py`(subject_ref_map DDL) · Cosmile `schema.prisma`(SubjectRefMap) · EXEC-1 result(dev DB additive 패턴).

---

## 1. Fact
- design review 판정 = **APPROVE_WITH_WATCH · "proceed to additive schema migration gate"**(W1~W6 이월). 본 gate = 그 첫 downstream(DDL-only).
- 현재 SubjectRefMap(local 확인): **PK=subject_ref**·`local_user_ref_hash`(=furef 참조·keyed HMAC·raw 미저장)·`guest_ref`·`created_at`(Cosmile +`allowLink`). ★`secret_version` **전무**(dev DB PRAGMA 확인).
- ★PK가 subject_ref이므로 version별 새 subject_ref=**새 행**(distinct PK) → **순수 additive**(PK/기존 제약 완화 불요·기존 값 무변경).
- ★본 문서 = package(DDL 설계 + EXEC-1 패턴 검증 계획). migration 실행은 별도 승인(EXEC-1형).

## 2. Migration objective
- **목표:** SubjectRefMap에 `secret_version`을 additive로 추가해 **version당 map row 구조**를 스키마 수준에서 가능케 함(design §3.2). → secret rotation 시 (furef × version)당 subject_ref 값 공존의 **스키마 기반** 마련.
- ★**비목표(이 gate 아님):** read-side union·rolling·retirement re-key = **application 로직**(FOUNDATION impl gate·구현 안 함) · subject_ref 값 변경·backfill·prod secret = execution gate.

## 3. Proposed additive schema change (DDL 설계·실행 아님)
### 3.1 SIASIU `subject_ref_map`(sqlite)
```sql
-- additive: 기존 행은 DEFAULT 1(무변경)·subject_ref 값 불변
ALTER TABLE subject_ref_map ADD COLUMN secret_version INTEGER NOT NULL DEFAULT 1;
-- (furef × version)당 1 subject_ref·furef-bearing 행만(guest-only 제외·③)
CREATE UNIQUE INDEX IF NOT EXISTS ux_srm_furef_version
    ON subject_ref_map (local_user_ref_hash, secret_version)
    WHERE local_user_ref_hash IS NOT NULL;
```
### 3.2 Cosmile `SubjectRefMap`(prisma + raw SQL)
- prisma 모델에 컬럼 추가: `secretVersion Int @default(1)`.
- ★partial unique(guest 제외)는 prisma schema 미지원 → **raw SQL**(EXEC-1의 candidate CHECK 패턴):
```sql
CREATE UNIQUE INDEX "ux_SubjectRefMap_furef_version"
    ON "SubjectRefMap" ("localUserRefHash", "secretVersion")
    WHERE "localUserRefHash" IS NOT NULL;
```
### 3.3 구조 근거(version당 map row)
- 새 version → (같은 `local_user_ref_hash`, 새 `secret_version`, **새 subject_ref**) 행 = 새 PK·additive.
- `local_user_ref_hash` 선두 복합 unique index → **furef 조회가 모든 version 반환**(read-side union의 스키마 기반·§6에서 검증만).
- guest-only 행(`local_user_ref_hash` NULL·guest_ref) = partial index에서 제외 → guest 오염 0(③).

## 4. Affected tables
| 대상 | 변경 | 성격 |
|---|---|---|
| SIASIU `subject_ref_map` | +`secret_version`(DEFAULT 1) + partial unique index | additive |
| Cosmile `SubjectRefMap` | +`secretVersion`(default 1) + raw SQL partial unique index | additive |
| ltm_fact·EpisodeSummary·MemoryFactCandidate | **무변경**(subject_ref 값 version-opaque 저장·SubjectRefMap join으로 version 판별) | 이 gate 아님 |
- ★memory row `secret_version` denormalization(D-1) = **미포함**(join으로 충분·성능 이슈 시 후속). 이 gate = **SubjectRefMap only.**

## 5. Backward compatibility
- **ADD COLUMN NOT NULL DEFAULT 1:** 기존 행 자동 version 1·**subject_ref 값 무변경·데이터 rewrite 0.**
- **기존 read 경로(subject_ref 직독)** = secret_version 무관·**영향 0**(version은 additive metadata).
- **partial unique index:** furef-bearing 행만 제약·guest 행 무영향·NULL 다중 허용. ★**선결 검증:** 기존 furef-bearing 행에 (local_user_ref_hash) 중복 없어야 index 생성 성공(현 EXEC-1 테이블 empty→충돌 0·검증 §6).
- **하위호환:** 이 gate 후에도 rotation/union/retirement **미구현**이므로 런타임 동작 = 현행 유지(version 1 단일). → **행동 변화 0**(순수 스키마 확장).

## 6. Validation plan (EXEC-1 패턴·raw/PII 0·count/hash/boolean)
1. **WAL-safe backup**(python sqlite3 `.backup`)·**PRAGMA integrity_check**(원본·backup).
2. **pre count/checksum:** 기존 테이블 row count + 기존 컬럼 checksum 기록.
3. **선결:** furef-bearing 행 (local_user_ref_hash) **중복 0** 확인(중복 시 unique index 실패 → abort).
4. **apply**(additive DDL·raw SQL partial index 포함) → **CHECK/index 실 migration SQL 포함 증명**(EXEC-1 candidate CHECK처럼).
5. **verify 기존 무변경:** row count 동일 + 기존 컬럼 checksum 동일(신규 컬럼 제외)·기존 subject_ref 값 불변.
6. **verify additive:** 기존 행 `secret_version=1`·신규 컬럼 nullable 아님(DEFAULT).
7. **version당 map row 구조 검증:** (동일 local_user_ref_hash, 다른 secret_version) 2행 insert → OK · (동일 local_user_ref_hash, 동일 secret_version) 중복 → **unique 위반 reject** · guest 행(local_user_ref_hash NULL) 다중 → 허용(partial 제외).
8. **read-side union·retirement re-key = 이 gate 미구현** → validation plan에 **반영만**: FOUNDATION impl gate에서 (a) furef→모든 live-version subject_ref union read (b) retirement re-key(drop 전 re-key·atomic) (c) W1 write-side atomicity(map 행 = 첫 memory row와 동일 tx/이전 commit)를 검증. ★이 gate는 그 스키마 전제(secret_version + version index)만 마련.
- ★전 evidence = count/hash/boolean·raw/PII/실 secret 값 0.

## 7. Rollback / rehearsal plan
- **rollback rehearsal(EXEC-1형):** backup→restore copy·restore integrity ok·restore에 `secret_version` **미포함**·pre-state 일치 확인.
- **실 rollback:** sqlite ADD COLUMN은 즉시 DROP 곤란 → **rollback = backup 복원**(마이그레이션 전 backup). Cosmile은 prisma migration + raw index·rollback도 backup 복원(★`prisma migrate reset`/`db push --accept-data-loss` 금지).
- **부분실패:** DDL 트랜잭션 실패 시 backup 복원·partial index 생성 실패(중복) 시 abort+보고.
- ★backup artifact 보존·raw/PII 0.

## 8. W1~W6 carry-forward (이 gate 이월·FOUNDATION impl/execution gate 대상)
| watch | 내용 | 대상 gate |
|---|---|---|
| **W1** write-side atomicity | vN SubjectRefMap 행 = 첫 vN memory row와 동일 tx 또는 그 이전 commit(§3.6을 필수 구현 불변식으로) | FOUNDATION impl gate |
| **W2** zero-orphan은 canonical stable furef 조건부 | per-furef union은 furef 발산 미커버 | FOUNDATION impl gate |
| **W3** canonical stable_id/furef 획득 | 인증 복귀 identity가 furef feed 동일 stable_id로 resolve + furef secret 분리(2 변경) | FOUNDATION impl gate 선결 |
| **W4** reason_codes enum 범위 | api.py + gate.py L64 passthrough까지 상수 enum | FOUNDATION impl gate |
| **W5** identity-touch no-retention | mint 비캐시·카운터 count/meta만·prod per-service secret 값 분리 | FOUNDATION impl gate |
| **W6** fail-safe prod default | 3 shadow 모듈 `_is_production` unknown→production(FOUNDATION 방식) | shadow patch/impl gate |
- ★이 gate(schema)는 W1~W6을 **구현하지 않음**·이월 watch로 보존(분실 금지).

## 9. Execution boundary
> **[이 gate = package]** DDL 설계 + 검증/rollback 계획. ★**migration 실행·FOUNDATION 구현·M6-F execution 미승인.**
> **[승인 시 migration 실행(별도·EXEC-1형)]** dev DB(SIASIU memory.db·Cosmile dev.db) additive DDL·backup/integrity/count-checksum/rollback rehearsal·prod DB 0·raw/PII 0.
> **[금지 유지]** prod DB · prod secret · subject_ref backfill · subject_ref 값 변경 · live · hard reject · main merge · `prisma migrate reset`/`db push --accept-data-loss` · raw/PII 출력.

## 10. Next action
- Leo 판단: ① 본 package 승인 → **additive schema migration 실행 gate**(dev DB·EXEC-1형·별도 승인) ② W1~W6은 FOUNDATION impl gate로 이월.
- 순서(각 별도 Leo 승인): **schema migration 실행(dev·additive)** → **FOUNDATION impl gate**(W1/W3/W4/W5 못박기·identity-touch API·_factory furef·R9-1·R8-2·canonical furef) → **M6-F execution gate**(prod secret·backfill).
- ★**M6-F execution gate(prod secret·backfill)는 계속 닫힘.**

## 무결성
Additive schema migration **gate package**(DDL 설계·검증 계획) only · migration 실행 0 · FOUNDATION-side 구현 0 · M6-F execution 0 · prod secret 0 · subject_ref backfill 0 · subject_ref 값 변경 0 · prod DB 0 · live 0 · hard reject 0 · **main merge 0**(siasiu dd2c631·cosmile 91bd803·fc ee055ef) · 코드/DB 변경 0 · raw/PII/실 secret 값 출력 0 · `prisma migrate reset`/`db push` 미사용 · 본 package만 foundation-docs commit/push · **migration 실행·FOUNDATION 구현·execution은 각 별도 Leo 승인.**
