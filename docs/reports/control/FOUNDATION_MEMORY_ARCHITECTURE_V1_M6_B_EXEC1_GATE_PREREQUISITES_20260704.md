# Memory V1 — EXEC-1 Gate Prerequisites (실 migration gate 전제조건)

> 작성: foundation-control(Control) · 2026-07-04 · **상태: PREREQUISITES / PREP (문서/계획/조건 정의 only) · 실행 0 · 실 migration 0.**
> ★**이 문서 = EXEC-1 진입 전제조건 정의이며, EXEC-1 실 migration 실행 승인이 아니다.** EXEC-1은 **별도 gate·별도 Leo 승인** 후에만 가능.
> ★Control 이번 단계 금지·미수행: 실 migration · 실 데이터 pre-scan/repair 적용 · prod DB 접근 · raw/PII/secret 열람 · prod secret · subject_ref backfill · live 배선 · hard reject · **product repo main merge** · **schema code main merge**.
> 근거(직접 확인): NEW-1 patch report·EXEC-0 result·M6-B readiness·M4_MIGRATION_PLAN(+addendum) (foundation-docs main `6e147dd`).

---

## 1. ★EXEC-1 필수 조건 (Leo 지정·문서 고정)
1. **EXEC-1은 별도 gate·별도 Leo 승인 필요.** (readiness approval·EXEC-0 PASS·NEW-1 CLOSED로 자동 진행 금지.)
2. **`CHECK (status IN ('candidate','approved','rejected'))` 또는 동등한 app-level validation 필수.** (Cosmile candidate status — prisma CHECK 미지원 → EXEC-1 migration SQL(raw)/app-level에서 강제. SIASIU shadow는 sqlite CHECK로 이미 집행.)
3. **실 데이터 pre-scan / migration / repair 적용은 별도 승인 전 금지.**
4. **product repo main merge와 schema code main merge는 별도 승인 전 금지.**

## 2. 현재 상태 consolidation
| 항목 | 상태 | 확인 |
|---|---|---|
| M6-B readiness approval | ✅ Leo 승인 | GitHub `b0c7dc1` package |
| EXEC-0 dry-run | ✅ PASS(synthetic/disposable) | GitHub `2dc281a` result |
| NEW-1 Cosmile candidate status | ✅ **schema default CLOSED**(local shadow) | GitHub `6e147dd` report·shadow `78678ed`(local-only) |
| Fable5 M6-B readiness review | ✅ APPROVE_WITH_WATCH | GitHub `d4d97ec` |

### 2.1 닫힌 watch
- watch-2(Cosmile 명칭/boolean·EXEC-0 introspection) · watch-3(dry-run 결과) · watch-4(rollback rehearsal 결과) · watch-5(repair 후보 산출·applied=false) · **NEW-1 schema default**(pending→candidate).

### 2.2 유지 watch = ★EXEC-1 전 반드시 닫아야 할 prerequisites
| # | watch | EXEC-1 전 요구 |
|---|---|---|
| P-a | **watch-1 shadow code 원격검증** | 3 shadow 브랜치(fc `shadow/m5-ingress-gate`·SIASIU `shadow/m4-siasiu-memory`·Cosmile `shadow/m4-cosmile-memory`)가 **local-only(원격 0건)** → **push 또는 Leo/검수자 local 접근**으로 코드 원격검증 경로 확보(★단 product repo main merge는 조건 4로 금지 — 검증은 shadow 브랜치 push 또는 local review로) |
| P-b | **NEW-1 CHECK 강제**(조건 2) | Cosmile candidate status `CHECK(candidate\|approved\|rejected)` = migration SQL(raw)/app-level validation에 **명시·강제** |
| P-c | **실 데이터 상태 미확인** | 실 SINGLE 2-active/off-contract/tombstone 실건수는 **synthetic 아닌 실 데이터 pre-scan**에서 확정 — ★실 데이터 접근은 조건 3(별도 승인)·raw 미출력(count/hash만) |
| P-d | **watch-6**(실 migration/prod/live/hard reject/prod secret/subject_ref backfill) | 각 별도 gate·별도 Leo 승인(M6-C~H·EXEC-1) |

## 3. EXEC-1 gate 구조 (★실행은 별도 Leo 승인 후·구현자 수행·Control 검증)
> ★아래는 EXEC-1이 **승인되면** 수행할 절차의 정의이며, **본 문서 시점에는 미실행.**
1. **선행 확정:** P-a(코드 원격검증)·P-b(CHECK 명시)·NEW-1 CLOSED·EXEC-0 PASS·환경(실 대상은 backup 후).
2. **WAL-safe backup**(실 대상·§M6-B §2·integrity_check·count/checksum).
3. **실 데이터 pre-scan**(§M6-B §4·aggregate/count/hash·raw identifier 0)·off-contract(status/retention) 실건수 확정.
4. **deterministic repair 적용**(★EXEC-1 gate 내·별도 승인·§M6-B §5 rule·must_not_reappear·tombstone 되살림 0·log는 count/hash/id만).
5. **additive schema migration**(WATCH 반영 DDL·status CHECK 포함·`prisma migrate deploy` additive·**reset/db push --accept-data-loss 금지**).
6. **index 생성**(repair 후·partial-unique·abort 0 확인).
7. **row count/checksum 전후 일치**·**rollback rehearsal 실 결과**.
8. **PASS/FAIL 판정** → FAIL 시 backup 복원.
- ★2~7은 **EXEC-1 실행(별도 승인) 후** 구현자 수행·Control 검증. 본 prep는 정의만.

## 4. 절대 금지 (EXEC-1 승인 전·본 단계)
- 실 migration · 실 데이터 pre-scan/repair **적용** · prod DB 접근 · raw/PII/secret 열람 · prod secret · subject_ref backfill · live 배선 · hard reject · `prisma migrate reset` · `db push --accept-data-loss` · **product repo main merge** · **schema code main merge**.

## 5. STOP 조건 (본 prep 단계·발생 시 즉시 STOP·보고)
- 실 migration/repair 적용 시도 · prod DB 접근 · raw/PII/secret 열람·출력 · schema code main merge · product repo main merge · NEW-1 CHECK 미명시로 EXEC-1 진행 시도 · watch-1 미해소로 코드 원격검증 없이 EXEC-1 진행 시도.

## 6. EXEC-1 실행 승인 요청 (★별도 gate·본 문서는 요청 자체가 아님·전제조건 제시)
> **[본 문서의 역할]** EXEC-1 진입 **전제조건 정의**. ★**EXEC-1 실 migration 실행을 요청하지 않는다.**
> **[EXEC-1 실행을 요청하려면]** 아래가 먼저 충족돼야 한다: P-a(코드 원격검증 경로)·P-b(CHECK 명시)·P-c(실 데이터 pre-scan 별도 승인 설계)·조건 1~4 준수. 충족 후 **별도 "EXEC-1 execution 승인" 요청**을 Leo에게 제출한다.
> **[승인 분리]** readiness approval(완료) · EXEC-0(완료·synthetic) · **EXEC-1(미요청·별도 gate·실 데이터/실 migration)** — 각 독립.

## 7. Fable5/Codex 검수 프롬프트 (선택·EXEC-1 prerequisites 안전성)
```
[EXEC-1 GATE PREREQUISITES — 독립 검수(선택)]
대상: docs/reports/control/FOUNDATION_MEMORY_ARCHITECTURE_V1_M6_B_EXEC1_GATE_PREREQUISITES_20260704.md (foundation-docs main)
관점(전제조건 정의·실행 0):
 1. 4개 필수 조건(별도 gate·CHECK·실 데이터 별도 승인·main merge 금지) 명시
 2. 닫힌 watch(2/3/4/5·NEW-1 schema) vs 유지 watch(1/6·NEW-1 CHECK·실 데이터) 정확 분리
 3. EXEC-1 gate 구조가 실행 아닌 정의에 머무름
 4. product repo main merge·schema code main merge 금지 명확
 5. 실 migration/실 데이터/repair 적용이 별도 승인 전 금지
 6. local shadow diff(원격 미검증) vs GitHub 검증 분리
판정: APPROVE(EXEC-1 execution 승인 요청 준비 가능) / PATCH_REQUIRED.
금지: 코드/실행/DB 접근/raw 열람/main merge/push.
```

## 무결성
전제조건 정의 only · 실행 0 · 실 migration 0 · 실 데이터 pre-scan/repair 적용 0 · prod DB 접근 0 · raw/PII/secret 열람 0 · prod secret 0 · subject_ref backfill 0 · live 배선 0 · hard reject 0 · **product repo main merge 0** · **schema code main merge 0**(shadow 브랜치 local·미merge) · **EXEC-1은 별도 gate·별도 Leo 승인** · 본 문서만 foundation-docs commit/push.
