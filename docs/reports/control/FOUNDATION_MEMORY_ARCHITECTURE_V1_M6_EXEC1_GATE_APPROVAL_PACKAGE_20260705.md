# Memory V1 — EXEC-1 Gate Approval Package

> 작성: foundation-control(Control) · 2026-07-05 · **요청 유형: Leo "EXEC-1 execution" 승인 판단 요청 package.**
> ★**이 문서 = EXEC-1 실행 승인 요청 package이며, 문서 작성 자체는 실행이 아니다.** 실 migration·실 데이터 pre-scan·repair 적용·prod/live/hard reject/backfill/main merge = **Leo 별도 승인 전 금지·미수행.**
> ★Control = 오케스트레이션·감독·보고·검증지시. 실 실행 = 승인 후 구현자 수행·Control 검증.
> 근거(GitHub 직접 확인): compat-scrub follow-up(`02738a3`)·delta review(`71a825a`·BUG_CLOSURE_CONFIRMED)·bugfix(`3a8e02b`)·독립 검수(`e14dfb5`)·EXEC-1 prerequisites·M4_MIGRATION_PLAN(+addendum).

---

## 1. 최신 Manifest (GitHub 원격·직접 판독 가능)
| 대상 | ref | commit |
|---|---|---|
| foundation-control | `shadow/m5-ingress-gate` | **`05bd05f`** (gate + M6-C hook + BUG-1 + compat-scrub) |
| SIASIU | `shadow/m4-siasiu-memory` | **`6047b71`** (memory shadow + M6-D P3 + BUG-3) |
| Cosmile | `shadow/m4-cosmile-memory` | **`73b7ce4`** (schema + de-anon + M6-E vitest + BUG-2/3) |
| foundation-docs | `main` | **`02738a3`** |
- ★3 shadow 브랜치 = remote push됨(main **미merge**). 판독: `git show origin/shadow/m5-ingress-gate:foundation_http_service/ingress_gate.py` 등.

## 2. EXEC-1 실행 범위 (정확)
### 할 것 (additive·non-prod/승인된 대상·backup 선행)
- **SIASIU `memory.db`(non-prod/승인 대상):** memory shadow **신규 테이블 생성**(ltm_fact·memory_fact_candidate·conversation_session·conversation_message·episode_summary·customer_profile·consent_record·subject_ref_map) + partial-unique index. ★기존 `episode`/`memory_fact`/`user`/`fact_type_registry` **무접촉**(ALTER 0·새 테이블만).
- **Cosmile `dev.db`(non-prod/승인 대상):** prisma additive migration — memory 신규 모델 9개 CREATE + 기존 commerce 5모델(CommerceEvent/Cart/Order/Wishlist/AlertSubscription) overlay 컬럼 **ADD COLUMN(nullable)** + `MemoryFactCandidate` status CHECK(raw SQL).
### 하지 않을 것 (EXEC-1 범위 밖·별도 gate)
- ★**실 데이터 migration/mapping**(기존 episode/memory_fact → ltm_fact 이관) = repair/backfill 성격·**별도 gate**.
- ★**repair 적용**(dirty 수리) · **subject_ref backfill**(NULL 유지) · **prod DB** · **prod secret** · **live 배선** · **hard reject 활성** · **product repo main merge** · **schema code main merge**.
- ★EXEC-1 = **additive schema DDL + read-only pre-scan(assessment)** 까지. 데이터 write/repair 0.

## 3. Migration DDL 초안
### 3.1 SIASIU (sqlite·additive 신규 테이블·기존 무접촉)
```sql
-- ★신규 테이블만(기존 episode/memory_fact/user 무접촉). BUG-3 반영: candidate consent_scope/sensitivity_level.
CREATE TABLE IF NOT EXISTS memory_fact_candidate (
  candidate_id TEXT PRIMARY KEY, subject_ref TEXT, guest_ref TEXT, type TEXT, norm_value TEXT,
  status TEXT NOT NULL DEFAULT 'candidate' CHECK (status IN ('candidate','approved','rejected')),
  fact_state TEXT NOT NULL DEFAULT 'hypothesis' CHECK (fact_state IN ('hypothesis','active')),
  gate_decision TEXT, confidence REAL, source_ref TEXT,
  consent_scope TEXT NOT NULL DEFAULT 'same_service',
  sensitivity_level TEXT NOT NULL DEFAULT 'normal',
  raw_text_stored INTEGER NOT NULL DEFAULT 0, created_at TEXT);
CREATE TABLE IF NOT EXISTS ltm_fact (
  fact_id TEXT PRIMARY KEY, subject_ref TEXT, guest_ref TEXT, type TEXT NOT NULL, norm_value TEXT,
  fact_state TEXT NOT NULL DEFAULT 'active', deleted INTEGER NOT NULL DEFAULT 0, blocked INTEGER NOT NULL DEFAULT 0,
  expired INTEGER NOT NULL DEFAULT 0, is_safety INTEGER NOT NULL DEFAULT 0, confidence REAL, as_of TEXT, source_ref TEXT,
  consent_scope TEXT NOT NULL DEFAULT 'same_service', retention_policy TEXT NOT NULL DEFAULT 'standard_ttl',
  sensitivity_level TEXT NOT NULL DEFAULT 'normal', created_at TEXT);
-- (conversation_session/message·episode_summary·customer_profile·consent_record·subject_ref_map = foundation_memory_schema_shadow.DDL 동일)
CREATE UNIQUE INDEX IF NOT EXISTS ux_ltm_active
  ON ltm_fact (COALESCE(subject_ref, guest_ref), type, norm_value)
  WHERE fact_state='active' AND deleted=0 AND blocked=0;   -- ★pre-scan/수리(별도 gate) 후 생성
```
### 3.2 Cosmile (prisma additive migration)
```sql
-- ★prisma migrate가 생성하는 SQL(additive). 기존 5모델 overlay 컬럼 = ALTER ADD(nullable). 신규 memory 모델 = CREATE.
-- ★MemoryFactCandidate CHECK: prisma 미emit → migration .sql의 CREATE에 수동 삽입(app-level validation 병행·P-b):
CREATE TABLE "MemoryFactCandidate" (
  "candidateId" TEXT PRIMARY KEY, "subjectRef" TEXT, "guestRef" TEXT, "type" TEXT NOT NULL, "normValue" TEXT,
  "status" TEXT NOT NULL DEFAULT 'candidate' CHECK ("status" IN ('candidate','approved','rejected')),
  "factState" TEXT NOT NULL DEFAULT 'hypothesis', "gateDecision" TEXT, "confidence" REAL,
  "sourceRef" TEXT, "rawTextStored" BOOLEAN NOT NULL DEFAULT false,
  "consentScope" TEXT DEFAULT 'same_service', "sensitivityLevel" TEXT DEFAULT 'normal', "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP);
-- LongTermMemoryFact: consentScope/retentionPolicy/sensitivityLevel(nullable default) 포함(BUG-2). 5 commerce 모델: ALTER ADD COLUMN memory*(nullable).
```
### 3.3 nullable/default/rollback 전략
- **nullable/default:** 신규 컬럼 = nullable 또는 contract-compatible DEFAULT(기존 row 무영향·SIASIU 신규 테이블은 빈 상태). destructive 0.
- **CHECK:** SIASIU=sqlite CHECK(DB강제) · Cosmile=migration .sql CHECK(raw) + app-level validation(P-b).
- **rollback:** backup 복원(§5) · Cosmile prisma migration revert(down)/backup · SIASIU 신규 테이블 DROP(additive라 안전). ★`prisma migrate reset`/`db push --accept-data-loss` **금지**.

## 4. Read-only Pre-scan 계획 (★raw/PII 출력 금지·별도 승인·repair 적용 0)
- **원칙:** count/aggregate/hash만 · raw value/PII/secret/raw identifier SELECT/출력 **0** · backup 후 read-only · 수정 0.
- **산출(count only):**
  - dirty status count(off-contract status: `SELECT status,COUNT(*) ... HAVING status NOT IN ('candidate','approved','rejected')`)
  - null governance field count(consent_scope/retention_policy/sensitivity_level NULL 건수)
  - duplicate active fact count(SINGLE 2-active·MULTI dup — COUNT aggregate)
  - deleted/blocked/expired reappearance risk count(tombstone COUNT)
  - subject_key NULL count(subject_ref·guest_ref 둘 다 NULL)
  - off-contract retention count(`HAVING retention_policy NOT IN ('session','short_ttl','standard_ttl','revocable')`)
  - **repair candidate count only**(winner/superseded 후보 **건수**·★repair **적용 금지**·applied=false)
- ★실 데이터 대상 = **별도 Leo 승인(조건 3)**. 본 package는 계획.

## 5. Backup / Rollback 계획
- **WAL-safe backup:** `sqlite3 <db> ".backup"` 또는 `VACUUM INTO`(naive copy 금지·-wal/-shm 손상 방지)·checkpoint 후.
- **integrity_check:** `PRAGMA integrity_check` = ok.
- **table count / checksum:** migration 전후 기존 테이블 row count·checksum 일치(신규 테이블 expected)·raw 미출력.
- **rollback rehearsal:** backup restore → integrity_check → count/checksum 일치(실 결과·EXEC-0에서 synthetic 검증됨·EXEC-1은 실 대상).
- **STOP(실패 시):** integrity 실패·데이터 손실·index abort·rollback 복구 실패·raw 노출·CHECK 미명시·tombstone 되살림·same-row 결합 → **backup 복원·중단·보고.**

## 6. Test Plan (EXEC-1 전/후)
| 항목 | 기준 |
|---|---|
| Foundation gate | **57/57**(현재·BUG-1+compat-scrub 포함) |
| Foundation runner | **83/89**(추가감소 0·선재 6건 증빙 — lmr 5+brain 1·FOUNDATION c9bb996 기인·memory batch 무관 확인) |
| SIASIU adapter/schema/P3 | **26/26 · 27/27 · 11/11** |
| SIASIU integration/workflow/fingerprint | **39/39 · 119/119 · d7f579443f8a110a** |
| Cosmile de-anon(node/vitest)/prisma | **14/14 · 5/5 · valid** |
| Cosmile readiness/loop | **164/164 · 112/112** |
| STOP grep | hard reject 0·durable 0·cross-service 0·live 0·backfill 0·main merge 0·실 DB(EXEC-1 전 07-03 유지) |
- ★EXEC-1 실행 후 = disposable/승인 대상 재현으로 위 회귀 + migration PASS/rollback rehearsal 실 결과 추가.

## 7. Remaining Watch 처리 계획
- **runner 83/89 선재 6건:** EXEC-1 실행 전 실선재 확인(memory batch 무관·FOUNDATION HEAD c9bb996 기인 추정)·별도 조사 train 기록. ★memory migration은 runner 무관(fhs 미참조).
- **Cosmile candidate CHECK DB강제(P-b):** EXEC-1 migration .sql에 raw CHECK(§3.2) + app-level validation. 본 EXEC-1 gate에서 확정.
- **watch-1 최신 shadow code 판독:** 3 브랜치 push됨(fc 최신 `05bd05f`)·독립 delta 검수 CONFIRMED(`71a825a`)로 코드 판독 닫힘·Leo/외부 검수 corroborate 가능.

## 8. Approval Boundary
> **[요청]** 위 EXEC-1(additive schema migration + read-only pre-scan)의 **execution 승인**을 요청합니다.
> **[이 승인의 의미]** 승인된 non-prod/sanitized/disposable(또는 지정) 대상에 **additive DDL 적용 + read-only pre-scan(assessment)** 수행 자격(구현자 수행·Control 검증·backup 선행).
> **[이 승인이 아닌 것]** 실 데이터 migration/mapping · **repair 적용** · subject_ref backfill · prod DB · prod secret · live 배선 · hard reject 활성 · main merge = **어느 것도 승인하지 않습니다.**
> **[승인 이후 원칙]** additive DDL/pre-scan PASS여도 **실 데이터 repair·backfill·live/prod는 각 별도 gate·별도 Leo 승인** 없이 진행하지 않습니다.
> **[선택지]** ① EXEC-1 execution 승인 → 구현자 수행·Control 검증 · ② DDL/pre-scan 범위 보강 후 재검토 · ③ hold.

## 무결성
EXEC-1 실행 승인 요청 package only · **문서 작성 = 실행 아님** · 실 migration 0 · 실 데이터 pre-scan 실행 0 · repair 적용 0 · prod DB 0 · prod secret 0 · subject_ref backfill 0 · live 배선 0 · hard reject 0 · **product repo main merge 0** · **schema code main merge 0** · 실 DB 무접촉 · 본 package만 foundation-docs commit/push · **EXEC-1 실행은 Leo 별도 승인 후.**
