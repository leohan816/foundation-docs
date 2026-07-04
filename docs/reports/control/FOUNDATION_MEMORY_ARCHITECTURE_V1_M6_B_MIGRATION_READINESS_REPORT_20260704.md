# Memory V1 — M6-B Migration Readiness / Leo Approval Gate

> 작성: foundation-control(Control) · 2026-07-04 · **상태: READINESS PACKAGE (계획/검증지시/보고 only)** · Control verdict 상한 = DESIGN_READY.
> ★M6-B = **migration readiness / Leo approval gate** — DB 상태 변경·production 전환·live 배선·hard reject 아님.
> ★Control = 오케스트레이션·감독·보고·검증지시·STOP gate. **Control이 직접 수행하지 않음:** DB 변경·schema 적용·migration·repair·prod DB 접속·raw/PII/secret 열람·prod secret·subject_ref backfill·live 배선·hard reject·제품 repo main merge.
> 근거(직접 확인): M6_A_WATCH_PATCH_REPORT · M6_PLANNING · PATCH1_DELTA_REVIEW · M4_MIGRATION_PLAN · M2/M3 v1.2.

---

## 1. Fact

### 1.1 읽은 foundation-docs 문서 (★GitHub 원격 확인됨)
- foundation-docs **main = `910b73b`**(작성 시점·GitHub `refs/heads/main` 원격 해시와 로컬 일치 확인) → ★**본 M6-B report 병합 후 main = `98d2043`**(Fable5 M6-B 검수 기준) → Fable5 review 병합 후 `d4d97ec`(P-2 시점 정합). 아래 문서 전부 이 원격에 포함:
  - `docs/reports/control/FOUNDATION_MEMORY_ARCHITECTURE_V1_M6_A_WATCH_PATCH_REPORT_20260704.md`
  - `docs/reports/control/FOUNDATION_MEMORY_ARCHITECTURE_V1_M6_PLANNING_20260704.md`
  - `docs/reports/fable5/FOUNDATION_MEMORY_ARCHITECTURE_V1_M4_M5_SHADOW_PATCH1_DELTA_REVIEW_20260704.md`
  - `docs/reports/control/FOUNDATION_MEMORY_ARCHITECTURE_V1_M4_MIGRATION_PLAN_20260704.md`
  - `설계문서/foundation/COMMON_SERVICE_MEMORY_CONTRACT_V1_20260704.md` · `.../MEMORY_CONTEXT_CONTRACT_V1_20260704.md`

### 1.2 확인 범위 구분표 (★문서 vs 직접 코드 vs 확인 불가)
| 대상 | 확인 방식 | 상태 |
|---|---|---|
| foundation-docs 보고서/계약(M6-A·planning·delta·migration plan·M2/M3) | **GitHub 원격 직접 확인**(main `910b73b`) | ✅ 원격 검증됨 |
| M6-A commit hash (SIASIU `ab0937b`·Cosmile `334b830`·fc `1c79943`) | **local 저장소만**(shadow 브랜치·원격 미push) | ⚠ **local shadow diff·GitHub 직접 확인 불가** |
| gate/SIASIU/Cosmile 실 schema 코드 | **local 파일 read-only**(shadow 브랜치) | ⚠ local 기준·GitHub 미검증 |
| 실 memory.db/dev.db 데이터·row 값 | 미열람(mtime stat만) | ⛔ 미확인(금지·의도적) |
| Cosmile prisma model→table명 매핑·boolean 저장방식 | 미introspection | ❓ **확인 필요**(실 introspection 미실행) |
- ★**local shadow diff를 GitHub 검증 코드로 과대표현하지 않음.** 3개 shadow 브랜치(fc `shadow/m5-ingress-gate`·SIASIU `shadow/m4-siasiu-memory`·Cosmile `shadow/m4-cosmile-memory`) = **전부 원격에 0건(local-only)**.

### 1.3 M6-A 반영 기준 확인 결과 (local shadow diff 기준·GitHub 미검증)
| 기준 | local 확인 | 판정 |
|---|---|---|
| **A. SIASIU candidate status** = candidate\|approved\|rejected·default candidate·pending off-contract | DDL `status ... DEFAULT 'candidate' CHECK(status IN ('candidate','approved','rejected'))` (local) | ✅ 반영(local) |
| **B. Cosmile overlay** standalone 금지·5모델(CommerceEvent·Cart·Order·Wishlist·AlertSubscription)·CartItem 제외·개별 nullable 컬럼(memorySubjectRef/GuestRef/ConsentScope/RetentionPolicy/PrivacyLevel/Deleted/Blocked/ExpiresAt)·memoryOverlayJson=잔여 | standalone CommerceMemory grep 0·5모델 개별 컬럼(local)·CartItem overlay 0 | ✅ 반영(local) |
| **C. gate retention** = session\|short_ttl\|standard_ttl\|revocable·off-contract 제거 | `RETENTION_POLICY = {"session","short_ttl","standard_ttl","revocable"}` (local) | ✅ 반영(local) |
- ★위 3건은 **local shadow diff 기준**. GitHub 미push라 원격 검증 불가 — Leo/Fable5는 local 저장소 또는 push 후 검증 필요(§4 리스크).

### 1.4 실제 schema 명칭 (pre-scan SQL 확정용·local read-only)
- **SIASIU(sqlite):** table `ltm_fact`(cols: subject_ref·guest_ref·type·norm_value·fact_state·deleted·blocked·expired·is_safety·confidence·as_of·source_ref·**consent_scope·retention_policy·sensitivity_level**) · candidate `memory_fact_candidate`(status).
- **Cosmile(prisma):** model `LongTermMemoryFact`(camelCase: subjectRef·guestRef·type·normValue·factState·deleted·blocked·expired·isSafety·confidence·asOf·sourceRef — ★retention_policy/consent_scope 컬럼 **없음**·commerce overlay에 memoryRetentionPolicy) · `MemoryFactCandidate`(status) · commerce overlay 5모델. ★**table명(모델명 매핑)·boolean 저장방식 = introspection 확인 필요**.
- ★두 repo **명칭 상이**(SIASIU snake `ltm_fact`/`type` vs Cosmile PascalCase `LongTermMemoryFact`/`factState`) → pre-scan SQL repo별 분리(§5).

## 2. WAL-safe backup 계획 (Control 검토·구현자 수행 지시용)
- ★SQLite WAL naive file copy **금지**·`.db`만 복사 **금지**(-wal/-shm 누락 손상).
- 허용: `sqlite3 <db> ".backup '<backup>.db'"` **또는** `VACUUM INTO '<backup>.db'`(원자적·WAL 반영).
- write quiesce: **non-prod/sanitized clone**·runtime write 중지·shadow 환경·필요 시 `PRAGMA wal_checkpoint(TRUNCATE)`.
- backup 검증: `PRAGMA integrity_check` · table row count · checksum/hash.
- 보고: **count/hash/boolean만**·raw value/PII/secret 출력 금지.
- ★Control은 **prod DB backup 지시·수행 안 함**. 대상 = non-prod/sanitized/disposable/synthetic만.

## 3. dry-run 계획 (non-prod/sanitized/disposable DB에서만 수행하는 dry-run 계획 및, 허용된 경우에만 dry-run 재현)
- ★Control 미수행. 구현자/검증자에게 **계획 수립 + 허용 범위(non-prod clone·sanitized clone·disposable DB·synthetic fixture) 내 재현 가능성 확인**을 지시.
- 금지: prod DB 접근·prod dump·raw customer data·PII·secret·prod secret·subject_ref backfill.
- 단계: ① baseline schema introspection ② WAL-safe backup 적용가능성 ③ pre-scan SQL 적용 ④ deterministic repair 필요 여부 판정 ⑤ repair 후보 산출(적용 금지) ⑥ additive schema compatibility ⑦ index compatibility ⑧ row count/checksum 비교 ⑨ rollback rehearsal ⑩ PASS/FAIL 판정.
- ★재현은 **허용된 non-prod/sanitized/disposable DB 범위에서만**·Control은 재현 주체 아님(지시·검증·보고).

## 4. pre-scan SQL (★raw/PII/secret/raw identifier SELECT 금지·aggregate/count/hash만)

### 4.1 SIASIU (sqlite·table `ltm_fact`/`memory_fact_candidate`·확정)
```sql
-- (1) SINGLE fact active 중복
SELECT COALESCE(subject_ref, guest_ref) AS subject_key, type AS fact_type, COUNT(*) AS active_count
FROM ltm_fact
WHERE deleted=0 AND blocked=0 AND expired=0 AND fact_state='active'
  AND type IN ('skin_type','personal_color','age_range','goal','pregnancy_nursing')
GROUP BY COALESCE(subject_ref, guest_ref), type HAVING COUNT(*) > 1;
-- (2) MULTI fact norm_value 중복
SELECT COALESCE(subject_ref, guest_ref) AS subject_key, type AS fact_type, norm_value, COUNT(*) AS cnt
FROM ltm_fact WHERE deleted=0 AND blocked=0 AND expired=0 AND fact_state='active'
GROUP BY COALESCE(subject_ref, guest_ref), type, norm_value HAVING COUNT(*) > 1;
-- (3) subject_key 둘 다 NULL(계약 위반 후보)
SELECT COUNT(*) AS subject_key_null_count FROM ltm_fact WHERE subject_ref IS NULL AND guest_ref IS NULL;
-- (4) tombstone 집계(재등장 위험 후보)
SELECT type AS fact_type, COUNT(*) AS tombstone_count FROM ltm_fact
WHERE deleted=1 OR blocked=1 OR expired=1 GROUP BY type;
-- (5) off-contract candidate status
SELECT status, COUNT(*) AS cnt FROM memory_fact_candidate
GROUP BY status HAVING status NOT IN ('candidate','approved','rejected');
-- (6) off-contract retention_policy (SIASIU ltm_fact에 컬럼 존재)
SELECT retention_policy, COUNT(*) AS cnt FROM ltm_fact
GROUP BY retention_policy HAVING retention_policy NOT IN ('session','short_ttl','standard_ttl','revocable');
```

### 4.2 Cosmile (prisma·★table명/boolean 저장 introspection 확인 필요)
```sql
-- ★아래는 모델명 = 테이블명 가정("LongTermMemoryFact")·boolean=0/1 가정. 실 DB introspection으로 확정 필요(미실행).
-- (1) SINGLE fact active 중복
SELECT COALESCE("subjectRef","guestRef") AS subject_key, "type" AS fact_type, COUNT(*) AS active_count
FROM "LongTermMemoryFact"
WHERE "deleted"=0 AND "blocked"=0 AND "expired"=0 AND "factState"='active'
  AND "type" IN ('skin_type','personal_color','age_range','goal','pregnancy_nursing')
GROUP BY COALESCE("subjectRef","guestRef"), "type" HAVING COUNT(*) > 1;
-- (2) MULTI norm_value 중복 / (3) subject_key NULL / (4) tombstone / (5) candidate status — SIASIU와 동일 논리·camelCase 컬럼.
-- (6) retention off-contract: ★Cosmile LongTermMemoryFact에 retention 컬럼 없음 → N/A. commerce overlay(memoryRetentionPolicy)는 별도 스캔(확인 필요).
-- (7) commerce overlay nullable 컬럼 존재/AlertSubscription overlay/ standalone CommerceMemory 잔존 = prisma schema(정적) 확인:
--     standalone CommerceMemory model grep=0 · 5모델 memorySubjectRef 존재 · CartItem overlay 부재.
```
- **(8) commerce overlay nullable 컬럼 확인**(정적·schema): CommerceEvent·Cart·Order·Wishlist·AlertSubscription에 `memorySubjectRef`~`memoryExpiresAt` 존재(local 확인·✅) · **(9) AlertSubscription overlay 누락 여부**: 존재(✅) · **(10) standalone CommerceMemory 잔존**: 0(✅).
- **(11) same-row raw identity 결합 위험**(commerce event de-anon): `SELECT COUNT(*) FROM "CommerceEvent" WHERE customer_id IS NOT NULL AND foundation_trace_id IS NOT NULL` 형태 → ★단 **de-anon 라이브 배선 전(M6-E)**이라 현재 raw same-row 저장 경로는 미배선. same-row 위험 = 라이브 emit train(M6-E)에서 검증. ★**P-1:** 위 컬럼(`customer_id`·`foundation_trace_id`)·`"CommerceEvent"` 테이블명도 (1)~(7)과 동일하게 **Cosmile 명칭 미확정 대상**(prisma table명/컬럼명 introspection 확인 필요).

### 4.3 SQL 원칙 준수
- raw value/PII/secret/customer_id/anonymous_id/trace_id **SELECT 0** · id/hash/count/aggregate만 · non-prod/sanitized/disposable/synthetic 기준.
- ★테이블/컬럼명: SIASIU **확정**(shadow DDL) · Cosmile **확인 필요**(prisma table명 매핑·boolean 저장·introspection 미실행).

## 5. deterministic repair rule (★후보 산출만·적용 금지·Leo 승인 후 후속 train)
- **금지:** repair 실행·적용·tombstone(deleted/blocked/expired) 되살리기. **log:** count/hash/id/boolean만(raw value 0). **must_not_reappear 최우선.**
- **SINGLE:** active ≥2면 winner 1건 후보(우선순위: 최신 as_of → 최신 created_at → 높은 confidence → 안정 fact_id 정렬)·나머지 superseded **후보**. pregnancy_nursing(safety) active≤1 기준. ★tombstone→active 되살림 후보 미산출.
- **MULTI:** 동일 subject_key+type+norm_value 중복 → winner(높은 confidence → 최신 as_of → 최신 created_at → fact_id 정렬)·나머지 dedupe/superseded **후보**.
- **candidate status:** candidate\|approved\|rejected 외 = off-contract 판정. **pending→candidate 자동 변환 금지**·repair 후보로만 분류·적용은 Leo 승인 후.
- **retention:** session\|short_ttl\|standard_ttl\|revocable 외 = off-contract. extended_ttl/safety_max_age = repair **후보만**·자동 매핑 금지·mapping table 제안까지만·적용은 Leo 승인 후.

## 6. row count / checksum 기준
- 기존 테이블 row count 전후 일치 · 기존 컬럼 checksum 전후 일치 · 새 nullable 컬럼은 기존 데이터 무변경 · 신규 additive table expected row count 명시 · destructive change 불허 · raw/PII/secret 미출력.
- 보고 형식: `table_name · before_count · after_count · count_delta · before_checksum · after_checksum · checksum_match · raw_value_printed=false · pii_printed=false · secret_printed=false`.

## 7. rollback rehearsal 절차
- WAL-safe backup artifact 기준 restore rehearsal → `PRAGMA integrity_check` → row count 비교 → checksum 비교 → 실패 시 FAIL → PASS 기준(integrity ok·count/checksum 일치). raw/PII/secret 미출력 · non-prod/sanitized/disposable/synthetic만.
- ★Control은 **prod restore·prod DB 접근 지시 안 함**. 구현자 제출 절차·결과 검증·보고.

## 8. STOP 조건 점검표 (현 상태)
| STOP | 상태 |
|---|---|
| prod DB 접근·raw/PII/secret 열람·출력 | **0**(mtime stat만) |
| 실 migration·prisma migrate reset·db push --accept-data-loss | **0**(미실행) |
| repair 실행/적용 | **0**(후보 산출 규칙만·문서) |
| subject_ref backfill·prod secret·live 배선·hard reject | **0** |
| destructive schema change | **0**(전부 nullable 추가) |
| standalone CommerceMemory 재등장 | **0** |
| SIASIU candidate status pending 잔존 | **0**(candidate default) |
| off-contract retention enum 잔존(gate·SIASIU) | **0**(정본) |
| Foundation durable customer memory·cross-service 공유 흔적 | **0** |
| raw customer_id/anonymous_id/trace_id same-row 결합 | **0**(de-anon 미배선) |
| rollback rehearsal 절차 부재·checksum 기준 부재 | **없음(본 report §6/§7 정의)** |
| local shadow diff를 GitHub 확인으로 과대표현 | **없음(§1.2 명시 분리)** |
| 제품 repo main/remote 변경·schema code main merge | **0**(shadow 브랜치 local·미push·미merge) |

## 9. 문서 기준 확인 vs 직접 코드 확인 vs 확인 불가 (요약)
- **GitHub 원격 검증:** foundation-docs 전 보고서/계약(main `910b73b`).
- **local 직접 코드(GitHub 미검증):** gate retention·SIASIU status/DDL·Cosmile overlay(shadow 브랜치).
- **확인 불가/확인 필요:** 실 memory.db/dev.db 데이터(미열람·금지)·Cosmile prisma table명 매핑·boolean 저장(introspection 미실행).

---

## 10. 판단
- **M6-B readiness package 완성:** ✅ (계획 전 구성요소 정의 — WAL backup·dry-run 계획·pre-scan SQL·repair rule·checksum·rollback rehearsal·STOP 점검·확인범위 구분).
- **M4_MIGRATION_PLAN 업데이트:** **경미 보완 필요**(M6-A 반영: candidate status enum·overlay 개별 컬럼·retention 정본·repo별 명칭 상이). 전면 개정 불요 → 본 readiness report를 **M6-B addendum**으로 두고 migration plan에 pointer banner 추가.
- **Leo approval package 제출 가능:** ✅ (§11) — 단 **readiness 승인**이며 DB 상태 변경 승인 아님.
- **Fable5/Codex 독립 검수 호출 가능:** ✅ (§12).
- **확인 불가 항목의 영향:** ① shadow 브랜치 local-only → Leo/Fable5 검증 시 **push 또는 local 접근 필요**(readiness 판단은 계획 완결성 기준으로 가능·코드 원격검증은 후속) ② Cosmile prisma table명/boolean = 실 dry-run(non-prod) introspection에서 확정(readiness 계획 단계에선 "확인 필요"로 충분).

## 11. Leo Approval Package (★M6-B readiness 승인 요청 — DB 상태 변경 승인 아님)
> **요청:** 아래 M6-B **readiness package 승인**을 요청합니다. 본 승인은 **migration readiness(계획·검증체계) 승인**이며, **실 migration/backup/repair/dry-run 실행·DB 상태 변경 승인이 아닙니다.** 실 실행은 M6-B 승인 후 별도 gate(승인된 non-prod/sanitized/disposable 범위·구현자 수행·Control 검증)에서만.
1. M6-B migration readiness report(본 문서) · 2. M4_MIGRATION_PLAN(+M6-A 보완 banner) · 3. WAL-safe backup 계획(§2) · 4. dry-run 계획(non-prod/sanitized/disposable·§3) · 5. pre-scan SQL(§4) · 6. deterministic repair rule(§5·후보만) · 7. repair 후보 산출 기준(§5) · 8. row count/checksum 기준(§6) · 9. rollback rehearsal 절차(§7) · 10. STOP 점검표(§8) · 11. 확인범위 구분표(§1.2/§9) · 12. 남은 리스크(§ 리스크) · 13. Fable5/Codex prompt(§12).
- **분리 원칙:** M6-B readiness 승인 → (승인 시) 후속 실행 gate = **별도 Leo 승인**. DB 상태 변경을 지시하는 표현 미사용.

## 12. Fable5/Codex 독립 검수 프롬프트
```
[MEMORY V1 M6-B — MIGRATION READINESS 독립 검수]
대상: docs/reports/control/FOUNDATION_MEMORY_ARCHITECTURE_V1_M6_B_MIGRATION_READINESS_REPORT_20260704.md (foundation-docs main)
참조: M6_A_WATCH_PATCH_REPORT · M4_MIGRATION_PLAN · PATCH1_DELTA_REVIEW · M2/M3 v1.2
검수 관점(코드/DB 변경 0·재현 아님·계획 안전성 검수):
 1. M6-B가 readiness/Leo approval gate 범위에 머물렀는가(DB 상태 변경·live·hard reject 부재)
 2. Control이 구현자처럼 행동하지 않았는가(수행 아닌 계획/지시/검증/보고)
 3. repo별 구현자/검증자 지시·결과 보고 구조 유지
 4. 금지 작업(prod DB·raw/PII/secret·prod secret·backfill·live·hard reject·migrate reset·db push) 미발생
 5. WAL-safe backup 계획 충분성(naive copy 금지·.backup/VACUUM INTO·integrity_check)
 6. non-prod/sanitized/disposable DB에서만 수행하는 dry-run 계획 및 허용된 경우에만 재현 구조 안전성
 7. pre-scan SQL raw/PII/secret/raw identifier 미출력(aggregate/count/hash만)·repo별 명칭 정확성(SIASIU 확정·Cosmile 확인 필요 표시)
 8. deterministic repair rule 결정론성·repair 실행 금지/후보 산출 원칙·Leo 승인 후 후속 train 분리
 9. row count/checksum 기준 충분성·rollback rehearsal 복구 검증성
 10. Leo approval package가 readiness와 후속 실행 gate를 분리하는가
 11. foundation-docs(GitHub 검증) vs local shadow diff(원격 미검증) 분리·과대표현 없는가
 12. M6-A watch(status candidate·overlay 5모델·retention 정본)가 readiness 기준에 반영됐는가
 13. schema code main merge 금지 명확한가(shadow 브랜치 local-only)
판정: APPROVED(M6-B readiness) → Leo 승인 요청 / PATCH_REQUIRED → 계획 보완.
금지: 코드 수정·migration·backup/repair 실행·source push·raw/secret 열람.
```

---

## 리스크
- **schema drift:** shadow 브랜치 local-only → main 미merge·미push. 승인/검수 시 push 또는 local 접근 필요(Leo/Fable5). merge는 별도 gate(금지 유지).
- **local shadow diff 직접 확인 불가:** M6-A 반영(status/overlay/retention)은 **local 기준**·GitHub 미검증 → Leo approval 시 코드 원격검증 경로 필요.
- **backup/restore:** WAL 미인지 copy·quiesce 미준수 시 손상 → §2 강제.
- **repair rule/후보 산출:** 잘못된 winner·tombstone 되살림 위험 → 후보만·must_not_reappear 최우선·적용은 Leo 승인 후.
- **checksum 기준:** raw 노출 없이 무결성 입증 필요 → count/hash/boolean만.
- **tombstone 재등장:** repair가 deleted/blocked/expired 되살리면 안 됨 → 규칙 명시.
- **raw/PII/secret 노출:** SQL/log/보고 전 경로 aggregate/hash만.
- **Cosmile prisma 명칭 미확정:** table명 매핑·boolean 저장 = dry-run introspection에서 확정(확인 필요).
- **schema code main merge:** shadow/local이라도 main merge 금지 — 후속 gate까지 유지.
- **후속 gate에서 반드시 닫을 것:** ① 실 dry-run(non-prod) 재현 결과 ② Cosmile 명칭 확정 ③ 코드 원격검증(push/local) ④ same-row(M6-E de-anon 배선) ⑤ 실 migration(Leo 승인).

## 다음 액션
- **report path:** 본 문서(foundation-docs push).
- **Fable5/Codex review prompt:** §12(M6-B readiness 독립 검수).
- **Leo approval package:** §11(★"M6-B readiness 승인 요청"·DB 상태 변경 승인 아님).
- **후속 gate 진입 전 승인 항목:** M6-B readiness 승인 → (승인 후) non-prod dry-run 실행 gate·M6-C consult/chat shadow 배선·M6-D P3·M6-E P1/P2 emit·M6-F prod secret·M6-G hard reject·M6-H final — **각 별도 Leo 승인.**

## 무결성
실 migration 0 · prod DB 접근 0 · raw/PII/secret 열람 0 · prod secret 0 · subject_ref backfill 0 · live 배선 0 · hard reject 0 · prisma migrate reset 0 · db push --accept-data-loss 0 · repair 실행/적용 0 · Foundation durable customer memory 0 · cross-service 공유 0 · 제품 repo main/remote 변경 0 · schema code main merge 0 · shadow/local schema code main merge 0 · **Leo readiness approval required before next gate** · 본 report만 foundation-docs commit/push.
