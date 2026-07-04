# Memory V1 — EXEC-0 Non-prod/Sanitized/Disposable Dry-run 실행 준비안 (Prep)

> 작성: foundation-control(Control) · 2026-07-04 · **상태: PREP (문서/계획/승인요청 only) · 실행 0.**
> ★**EXEC-0 준비안 = 방어적 문서 검토 형식.** 실제 non-prod dry-run 실행은 **별도 Leo 승인 후에만** 가능하다. 본 문서 작성 자체는 실행이 아니다.
> ★Control 이번 단계 금지·미수행: **실행 · DB 접근 · raw/PII/secret 열람 · prod secret 사용 · source push · schema main merge.**
> 전제: Leo **M6-B readiness approval 승인 완료**(계획·검증체계 승인·EXEC-0 준비 자격 부여). ★단 readiness approval ≠ EXEC-0 실행 승인 ≠ 실 migration 승인.
> 근거(직접 확인): M6-B readiness report·Leo readiness approval package(GitHub main `b0c7dc1`)·Fable5 M6-B review(`d4d97ec`·APPROVE_WITH_WATCH)·M4_MIGRATION_PLAN(+M6-B addendum).

---

## 1. ★승인 범위 분리 (3단 gate)
| gate | 의미 | 상태 |
|---|---|---|
| **readiness approval**(완료) | 계획·검증체계 완결/안전 승인·EXEC-0 준비 자격 | ✅ Leo 승인(`b0c7dc1` package) |
| **EXEC-0 execution**(본 문서가 요청) | **non-prod/sanitized/disposable** 환경에서 backup·introspection·pre-scan·repair 후보·checksum·rollback rehearsal **실 재현** | ⏳ **별도 Leo 승인 필요·미실행** |
| **EXEC-1 실 migration**(미요청) | 실 DB 상태 변경 | ⛔ 별도 gate·별도 승인 |
- ★**EXEC-0 = non-prod dry-run REHEARSAL only.** prod DB 미접근·실 migration 아님·repair 적용 아님(후보 산출까지만).

## 2. EXEC-0 목적
- readiness 계획(§backup/pre-scan/repair/checksum/rollback)을 **안전한 disposable 환경에서 실 재현**해 아래 watch를 닫는 근거를 산출:
  - watch-2 Cosmile prisma **명칭/boolean 확정**(introspection).
  - watch-3 **실 dry-run 결과** 산출(계획→결과).
  - watch-4 **rollback rehearsal 실 결과** 산출(절차→결과).
  - watch-5 **repair 후보 산출** 실증(★적용 아님).
- ★EXEC-0로 **닫지 않는 것:** watch-1(shadow 코드 원격검증·별도)·watch-6(실 migration/prod/live/hard reject/prod secret/backfill·각 별도 gate).

## 3. ★환경 정의 (non-prod/sanitized/disposable·실 데이터 미접촉)
- **원칙: 실 `memory.db`/`dev.db` 미열람·미사용**(raw 고객데이터 금지). EXEC-0는 아래 중 하나만:
  1. **synthetic fixture DB**(권장) — 빈 disposable DB에 schema 적용 + **합성 row**(PII 0·subject_ref=subj_v2_synthetic·no real customer) 주입.
  2. **sanitized clone**(선택) — 실 DB에서 PII/raw를 **사전 제거한 clone**(sanitization 자체가 raw 미노출로 수행돼야 하며·미검증 시 synthetic 우선).
- disposable: EXEC-0 종료 시 **폐기**(temp 경로·버전관리 밖·source push 금지).
- 격리: prod DB 미접근·prod secret 미사용·network write 0·live 경로 미배선.
- ★fixture/clone 생성·주입·조회 = **EXEC-0 실행(별도 승인)** 후 구현자가 수행·Control 검증. 본 준비안은 미실행.

## 4. EXEC-0 Runbook (★실행은 별도 승인 후·구현자 수행·Control 검증)
| # | 단계 | 방식 | 산출(evidence·count/hash/boolean만) |
|---|---|---|---|
| 1 | **baseline schema introspection** | SIASIU: shadow DDL(`ltm_fact` 등) disposable DB 적용 후 `PRAGMA table_info`. Cosmile: `prisma migrate diff --from-empty --to-schema-datamodel --script`(★no DB·no data) 또는 disposable DB introspection으로 **모델명↔물리 table명·Boolean 저장(0/1) 확정**(watch-2) | table/column 목록·boolean affinity(값 미출력) |
| 2 | **WAL-safe backup rehearsal** | disposable DB에 `sqlite3 ".backup"` 또는 `VACUUM INTO` + `PRAGMA integrity_check` | integrity_ok(boolean)·row count·checksum |
| 3 | **pre-scan SQL 적용** | §M6-B pre-scan(SIASIU 확정·Cosmile 1단계 확정 명칭) 실행 | 각 스캔 count/aggregate(raw identifier 0) |
| 4 | **deterministic repair 필요 판정** | pre-scan 결과로 SINGLE 2-active·MULTI 중복·subject_key NULL·off-contract status/retention·tombstone 유무 판정 | 위반 count(0 or n) |
| 5 | **repair 후보 산출**(★적용 금지) | §M6-B repair rule로 winner/superseded/dedupe **후보** 산출·mapping table 제안 | 후보 목록(id/hash·raw value 0)·**applied=false** |
| 6 | **additive schema compatibility** | disposable DB에 additive 컬럼/신설 table 적용 시 무손실·기존 컬럼 무변경 확인 | compat_ok(boolean)·기존 count 불변 |
| 7 | **index compatibility** | partial-unique(subject_key active)·overlay index 생성 성공(수리 후) 확인 | index_created(boolean)·abort 여부 |
| 8 | **row count/checksum 비교** | §M6-B §6 형식 전후 비교 | table_name·before/after count·checksum_match·raw_printed=false |
| 9 | **rollback rehearsal** | backup(2단계)에서 restore → `integrity_check` → count → checksum 비교 | restore_ok·count/checksum 일치(boolean) |
| 10 | **PASS/FAIL 판정** | 전 단계 기준 충족 여부 | PASS/FAIL + 실패 단계 |
- ★단계 5 **repair 적용 = 금지**(후보만). 실 적용은 EXEC-1/후속 gate·별도 승인.

## 5. Evidence 수집 원칙
- **count/hash/boolean/aggregate만** 기록 · raw value/PII/secret/customer_id/anonymous_id/trace_id **출력 0** · disposable DB 경로·synthetic subject_ref만 · 결과 요약은 foundation-docs 보고(원문 데이터 미첨부).

## 6. Entry / Exit criteria
- **Entry:** ① Leo readiness approval(완료) ② **Leo EXEC-0 실행 승인**(본 요청) ③ disposable/synthetic 환경 준비 ④ 실 DB 미접촉 확인.
- **Exit(PASS):** introspection 확정(Cosmile 명칭/boolean) · backup integrity ok · pre-scan 완료 · repair **후보** 산출(적용 0) · additive/index compat ok · count/checksum 일치 · rollback rehearsal 복구 검증 ok · raw/PII/secret 출력 0.
- **FAIL:** integrity 실패·index abort·데이터 손실·rollback 복구 실패·raw 노출 → 즉시 STOP·disposable 폐기·보고.

## 7. STOP 조건 (EXEC-0 중·하나라도 발생 시 즉시 STOP·보고)
- 실 `memory.db`/`dev.db` 또는 prod DB 접근·raw/PII/secret 열람/출력·prod secret 사용 · subject_ref backfill · repair **적용** · 실 migration · live 배선 · hard reject 활성 · `prisma migrate reset` · `db push --accept-data-loss` · destructive change · tombstone 되살림 · same-row raw identity 결합 · disposable 아닌 대상 사용 · schema code main merge · source(제품 repo) push.

## 8. Watch closure 매핑
| watch | EXEC-0로 | 상태 |
|---|---|---|
| watch-2 Cosmile 명칭/boolean | ✅ 닫음(1단계 introspection) | EXEC-0 실행 후 |
| watch-3 dry-run 결과 | ✅ 닫음(runbook 전 단계 결과) | EXEC-0 실행 후 |
| watch-4 rollback rehearsal 결과 | ✅ 닫음(9단계 결과) | EXEC-0 실행 후 |
| watch-5 repair 후보≠적용 | ✅ 후보 실증(적용은 여전히 후속) | EXEC-0 실행 후 |
| watch-1 shadow 코드 원격검증 | ❌ EXEC-0 밖(별도·push/local 검증) | 유지 |
| watch-6 실 migration/prod/live/… | ❌ EXEC-0 밖(각 별도 gate) | 유지 |

## 9. ★EXEC-0 실행 승인 요청문 (readiness / execution / 실 migration 분리)
> **[요청]** 위 EXEC-0 runbook을 **non-prod/sanitized/disposable 환경에서 실 재현**하는 **EXEC-0 execution 승인**을 요청합니다.
> **[이 승인의 의미]** disposable/synthetic 환경에서 backup·introspection·pre-scan·repair **후보 산출**·checksum·rollback rehearsal을 실 재현해 watch-2/3/4/5의 결과 근거를 산출할 자격.
> **[이 승인이 아닌 것]** 실 `memory.db`/`dev.db`·prod DB 접근 · repair **적용** · 실 migration(EXEC-1) · prod secret · subject_ref backfill · live 배선 · hard reject = **어느 것도 승인하지 않습니다.**
> **[승인 이후 원칙]** EXEC-0 결과가 PASS여도 **실 migration(EXEC-1)은 별도 gate·별도 Leo 승인** 없이 진행하지 않습니다. repair 적용도 별도 승인.
> **[선택지]** ① EXEC-0 execution 승인 → 구현자 수행·Control 검증 · ② 환경/문구 보강 후 재검토 · ③ hold.

## 10. Fable5/Codex 검수 프롬프트 (선택·EXEC-0 prep 안전성)
```
[EXEC-0 DRY-RUN PREP — 독립 검수(선택)]
대상: docs/reports/control/FOUNDATION_MEMORY_ARCHITECTURE_V1_M6_B_EXEC0_DRYRUN_PREP_20260704.md (foundation-docs main)
관점(계획 안전성·실행 0):
 1. EXEC-0 prep가 문서/계획/승인요청에 머물렀는가(실행·DB 접근·raw 열람 0)
 2. 실 memory.db/dev.db 미접촉·synthetic/disposable 설계가 raw 고객데이터를 차단하는가
 3. repair 적용 금지(후보만)·실 migration 분리·prod 미접근이 명확한가
 4. evidence가 count/hash/boolean만(raw/PII/secret 0)인가
 5. STOP/entry/exit·rollback rehearsal이 복구 검증 가능한가
 6. EXEC-0 execution 승인이 readiness·실 migration 승인과 분리되는가
판정: APPROVE(EXEC-0 실행 승인 요청 가능) / PATCH_REQUIRED.
금지: 코드/실행/DB 접근/raw 열람/push.
```

## 무결성
문서/계획/승인요청 only · 실행 0 · 실 DB 접근 0 · raw/PII/secret 열람 0 · prod secret 0 · subject_ref backfill 0 · repair 적용 0 · 실 migration 0 · live 배선 0 · hard reject 0 · source(제품 repo) push 0 · schema code main merge 0 · 제품 repo main/remote 변경 0 · **EXEC-0 실행은 별도 Leo 승인 후에만** · 본 준비안만 foundation-docs commit/push.
