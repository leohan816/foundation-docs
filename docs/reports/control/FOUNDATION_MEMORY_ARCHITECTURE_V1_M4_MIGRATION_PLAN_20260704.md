# Foundation Memory Architecture V1 — M4 Migration Plan (B12)

> 작성: foundation-control · 2026-07-04 · **상태: DESIGN/PLAN (구현 전 · 코드 0 · migration 미실행)** · Control verdict 상한 = DESIGN_READY.
> 목적: M4 additive schema migration의 **Leo 승인 대상이 될 수 있는 상세 계획**(Fable5 G-1·B12 FAIL 보강). ★실제 migration은 **Leo 승인 후·별도 실행**.
> 근거: M2 v1.2 §5/§14 · M4_IMPLEMENTATION_PLAN §8 · Fable5 M4/M5 Readiness §E-1/§F(R-1/R-2).
> ★코드 수정 0 · migration 미실행 · source push 0 · raw 고객 데이터/secret 미열람.

## 1. WAL-aware backup
- ★**SQLite naive file copy 금지**(WAL 모드에서 -wal/-shm 미포함 시 손상·brain.py WAL 사용).
- **방식:** `sqlite3 <db> ".backup '<backup>.db'"` **또는** `VACUUM INTO '<backup>.db'`(원자적·WAL 반영).
- **DB quiesce 조건:** backup 중 write 없음(서비스 flag OFF·shadow·상담 runtime 미접속) — checkpoint(`PRAGMA wal_checkpoint(TRUNCATE)`) 후 backup.
- 대상: SIASIU `app/data/memory.db` · Cosmile prisma dev.db.

## 2. pre-index 중복 스캔 SQL (index 생성 전·R-1)
- **SINGLE fact 2-active 탐지**(pregnancy_nursing 등):
  ```sql
  SELECT subject_key, type, COUNT(*) FROM ltm_fact
  WHERE fact_state='active' AND deleted=0 AND blocked=0 AND type IN ('skin_type','personal_color','age_range','goal','pregnancy_nursing')
  GROUP BY subject_key, type HAVING COUNT(*) > 1;
  ```
- **MULTI fact norm_value 수렴 중복 탐지**:
  ```sql
  SELECT subject_key, type, norm_value, COUNT(*) FROM ltm_fact
  WHERE deleted=0 AND blocked=0 GROUP BY subject_key, type, norm_value HAVING COUNT(*) > 1;
  ```
- **guest_ref/subject_key COALESCE NULL 충돌 탐지**:
  ```sql
  SELECT COALESCE(subject_ref, guest_ref) AS subject_key, type, norm_value, COUNT(*) FROM ltm_fact
  WHERE subject_ref IS NULL AND guest_ref IS NULL;   -- subject_key NULL(둘 다 NULL) = 계약 위반 후보
  ```
  (★subject_ref XOR guest_ref 중 하나 필수 — 둘 다 NULL row는 수리 대상.)

## 3. 결정론적 수리 정책 (deterministic repair)
- **SINGLE 타입:** **최신 `as_of` 승자** — 나머지는 `fact_state='superseded'`(active≤1 보장). as_of 동률 시 최신 `fact_id`/`created_at`.
- **MULTI 타입:** 동일 (subject_key,type,norm_value) 중복 = **최고 `confidence` 승자**(동률 시 최신 `source_ref`/`created_at`) 기준 merge·나머지 dedupe.
- **deleted/blocked/expired tombstone 우선순위:** 동일 키에 tombstone(deleted/blocked/expired) row가 있으면 **tombstone 유지**(must_not_reappear)·active 신규는 별도 판단(§2 소프트삭제 키 미점유).
- ★수리는 **결정론적**(재실행 동일 결과)·모든 수리 로그(어떤 row가 어떻게 수렴됐는지·raw value 미기록·id/hash만).

## 4. D-8 기존 데이터 수리 단계 (SAFETY∩SINGLE)
- ★**SAFETY∩SINGLE(pregnancy_nursing) active≤1 보장:** §2 SINGLE 2-active 탐지 → §3 최신 as_of 승자·나머지 superseded. 모순 안전 fact 2건 동시 active 제거.
- **norm_value UNIQUE 충돌 제거:** partial UNIQUE index(`WHERE fact_state='active' AND deleted=false AND blocked=false`) 생성 전 §2/§3 수리 완료 → index 생성 abort 방지(R-1).
- 순서: **pre-scan → 수리 → dry-run index 생성 성공 확인 → 실 index**.

## 5. Prisma 금지 (Cosmile)
- ★**`prisma migrate reset` 금지**(데이터 전삭제).
- ★**`prisma db push --accept-data-loss` 금지**(비-additive 손실).
- **허용:** additive migration만(신규 model·nullable 컬럼)·기존 데이터 무손상·`prisma migrate dev`(dry)/`deploy`는 additive·backup 후.

## 6. subject_ref backfill 정책 (R-2)
- ★**M4에서 subject_ref backfill 금지.** 기존 row `subject_ref = NULL` 유지(guest_ref/기존 keying으로 동작).
- 이유: subject_ref = SubjectRefMap PK·subj_v2_=HMAC(FOUNDATION_SUBJECT_REF_SECRET, furef) — **dev-secret로 backfill하면 M6 prod secret 확정 시 전면 re-keying**(orphan).
- ★**M6에서 prod secret 확정 후 단일 backfill**(dev-secret 임시 backfill 0).

## 7. row count / checksum 기준
- **테이블별 row count:** migration 전후 **일치**(additive 컬럼 추가는 row 수 불변·신설 테이블은 0→0/신규만).
- **checksum/샘플 hash:** 기존 데이터 컬럼의 checksum(또는 샘플 row hash) migration 전후 일치(default 컬럼 추가가 기존 값 미변경 확인). raw value 미출력·hash만.

## 8. rollback rehearsal
- **백업 복원 리허설:** backup(§1)에서 복원 → row count/checksum 일치 확인(리허설 성공 = 실 migration 자격).
- **실패 시 복원 기준:** dry-run/pre-scan/index 생성 중 하나라도 실패 → **backup 복원**·migration 중단·보고.

## 9. Leo approval gate
- ★**실제 migration 실행 전 Leo 승인 필수**(release train).
- ★**승인 전 schema code merge 금지**(shadow schema·flag OFF까지만 준비).

## 10. 완료 기준 (exit criteria)
- **dry-run PASS**(additive 스키마 적용·데이터 무손실·index 생성 성공).
- **pre-scan 결과 0 또는 수리 완료**(SINGLE 2-active 0·MULTI 수렴 중복 수리·subject_key NULL 0).
- **rollback rehearsal PASS**(backup 복원·count/checksum 일치).
- **raw 고객 데이터/secret 미열람**(스키마/CREATE·SQL 결과 카운트만·raw value 미출력).
- **Leo 승인 획득** 후에만 실 migration.

## 무결성
코드 변경 0 · migration **미실행**(계획만) · source repo push 0 · raw 고객데이터/secret 미열람 · foundation-docs만 commit/push. 실 migration = Leo 승인·별도 실행.
