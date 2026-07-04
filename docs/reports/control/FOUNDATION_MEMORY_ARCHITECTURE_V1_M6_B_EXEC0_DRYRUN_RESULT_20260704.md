# Memory V1 — EXEC-0 Non-prod/Synthetic Dry-run Result

> 작성: foundation-control(Control) · 2026-07-04 · **범위: Leo 승인 EXEC-0(synthetic fixture + disposable DB only·sanitized clone 제외).**
> ★실 `memory.db`/`dev.db`/prod DB 미접촉 · raw/PII/secret 미출력(count/hash/boolean/aggregate만) · repair **applied=false** · disposable DB = scratchpad(버전관리 밖·종료 후 폐기).
> ★EXEC-0 PASS여도 **EXEC-1 실 migration·repair 적용은 별도 gate·별도 Leo 승인** 없이 진행하지 않는다.
> 근거: EXEC-0 prep(GitHub main `bac319b`)·M6-B readiness report·M4_MIGRATION_PLAN(+addendum). 실행: disposable harness(scratchpad·비-repo).

---

## 1. Fact

### 1.1 환경 (실 데이터 미접촉 확인)
- **synthetic fixture + disposable DB only.** 실 `memory.db`/`dev.db` **미열람**(mtime 07-03 유지)·제품 repo 코드 변경 0·disposable DB 전부 scratchpad(temp·버전관리 밖). `real_db_touched=false`.
- SIASIU: 실 shadow DDL(`create_schema` 테이블 + partial-unique index 분리) disposable sqlite 적용. Cosmile: `prisma migrate diff --from-empty --to-schema-datamodel --script`(no DB)로 실 DDL 산출 → disposable sqlite 적용.

### 1.2 SIASIU runbook 결과 (count/hash/boolean만)
| 단계 | evidence |
|---|---|
| schema 적용 | ✅ 8 tables(conversation_session/message·episode_summary·memory_fact_candidate·ltm_fact·customer_profile·consent_record·subject_ref_map) |
| candidate status CHECK 보호 | ✅ `pending` INSERT **거부**(candidate\|approved\|rejected CHECK 작동) |
| **pre-scan** | single_2active=**1** · multi_dup=**1** · subject_key_null=**1** · tombstone=**1** · off_contract_status=**0** · off_contract_retention=**1** (전부 synthetic dirty 시나리오 정확 탐지) |
| **repair 후보 산출** | single_winner_candidates=1 · multi_winner_candidates=1 · **tombstone_revive_candidates=0** · **applied=false** |
| WAL-safe backup | ✅ VACUUM INTO · integrity_ok=**true** · row_count=8 · checksum=`bd4fbdff5aac6665` |
| index compat(dirty) | index_on_dirty_created=**false**(MULTI dup 때문에 abort → 수리 필요 실증) |
| row count/checksum | before=8·after=8·delta=0·**checksum_match=true**·raw_printed=false·pii_printed=false·secret_printed=false |
| index compat(cleaned copy) | index_on_cleaned_created=**true**(dedup 후보 반영 disposable copy에서 생성 성공) |
| **rollback rehearsal** | restore_integrity_ok=**true** · restore_count=8 · **count_match=true** · **checksum_match=true** |

### 1.3 Cosmile runbook 결과 (watch-2 introspection 포함)
| 항목 | evidence |
|---|---|
| schema 적용 | ✅ prisma DDL disposable 적용 |
| **table명 확정(watch-2)** | LTM = **`LongTermMemoryFact`**(모델명 verbatim·@@map 없음) · candidate = **`MemoryFactCandidate`** |
| **boolean 저장(watch-2)** | **BOOLEAN(0/1·false/true)** — `WHERE deleted=0` 유효 |
| overlay 5모델 컬럼 | CommerceEvent·Cart·Order·Wishlist·AlertSubscription **전부 memorySubjectRef 존재=true** |
| CartItem overlay 부재 | ✅ true | standalone CommerceMemory 부재 | ✅ true |
| **★NEW: candidate status** | `MemoryFactCandidate.status` **DEFAULT = 'pending'**(off_contract_candidate_status_count=**1**) — **off-contract**(M2 §3.4 = candidate\|approved\|rejected) |
| LTM SINGLE 2-active(synthetic) | 1(pre-scan 탐지 정상) | backup integrity | ✅ true |

### 1.4 ★NEW 발견 (EXEC-0가 표면화)
- **Cosmile `MemoryFactCandidate.status` DEFAULT 'pending' = off-contract.** M6-A WATCH-1은 **SIASIU shadow module만** 정정했고, **Cosmile prisma schema의 candidate status는 미정정**(patch1 F-3/R-5에서 `@default("pending")` 잔존). pre-scan #5가 이를 flag(count=1). ★**repair 후보(applied=false)**·**실 DDL이므로 EXEC-1 전 schema 정정 필요**(SIASIU WATCH-1과 동형·별도 후속 patch).

## 2. 판단
- **EXEC-0 = PASS.** 전 단계 기준 충족: introspection 확정(watch-2)·backup integrity ok·pre-scan 완료·repair 후보 산출(적용 0)·additive/index compat(dirty abort→cleaned 성공)·count/checksum 일치·rollback rehearsal 복구 검증 ok·raw/PII/secret 출력 0.
- **1 NEW finding**(Cosmile candidate status 'pending')은 **FAIL이 아니라 EXEC-0가 정확히 표면화한 schema off-contract** — 실 migration(EXEC-1) 전 정정 필요.
- ★**EXEC-0 PASS ≠ EXEC-1 승인.** 실 migration·repair 적용은 여전히 별도 gate·별도 Leo 승인.

### 2.1 닫을 수 있는 watch
| watch | 근거 |
|---|---|
| **watch-2** Cosmile 명칭/boolean | ✅ introspection 확정(LongTermMemoryFact·MemoryFactCandidate·BOOLEAN 0/1) |
| **watch-3** dry-run 결과 | ✅ pre-scan/compat/checksum 실 결과 산출(계획→결과) |
| **watch-4** rollback rehearsal 결과 | ✅ restore integrity·count·checksum 일치 실증(절차→결과) |
| **watch-5** repair 후보 산출 실증 | ✅ single/multi winner 후보·tombstone_revive=0·**applied=false** |

### 2.2 유지할 watch (닫지 않음)
| watch | 사유 |
|---|---|
| **watch-1** shadow code 원격검증 | 3 shadow 브랜치 여전히 local-only(원격 미push)·EXEC-0 밖 |
| **watch-6** 실 migration/prod/live/hard reject/prod secret/subject_ref backfill | 전부 미승인·각 별도 gate(EXEC-1·M6-C~H) |
| **★NEW-1** Cosmile candidate status off-contract | EXEC-1 전 schema 정정 필요(후속 patch·별도) |

## 3. 리스크
- **NEW-1(Cosmile candidate 'pending'):** 실 DDL이므로 EXEC-1 실행 시 off-contract row 생성/잔존 → **정정 patch 선행 필수**(M6-A 동형·pending→candidate·CHECK는 prisma 미지원이라 app-level/migration SQL 집행).
- **repair 후보≠적용:** winner 오판·tombstone 되살림 위험은 적용 gate에서 재검증(EXEC-0는 후보만·tombstone_revive=0 확인).
- **synthetic ≠ 실 데이터:** EXEC-0는 합성 fixture 기준 — 실 데이터 분포(실 SINGLE 2-active/off-contract 실건수)는 **sanitized clone sub-gate 또는 EXEC-1 pre-scan**에서 확정(실 데이터 열람은 별도 승인·현재 금지).
- **Cosmile boolean 표기:** `false/true` 리터럴 저장이나 SQLite는 0/1 — pre-scan `=0` 유효 확인. 혼용 주의는 실 pre-scan에서 재확인.
- **watch-1 코드 원격검증:** shadow 브랜치 local-only 유지 — Leo/검수 시 push/local 접근 필요.

## 4. 다음 액션
- **report path:** 본 문서(foundation-docs push).
- **NEW-1 후속 patch(별도):** Cosmile `MemoryFactCandidate.status` `pending`→`candidate` 정정(SIASIU WATCH-1 동형·shadow·EXEC-1 전). ★본 report는 발견·제안까지·정정 실행은 별도(승인 불요 shadow patch이나 EXEC-1 gate 전 CLOSE).
- **EXEC-1 실 migration:** ★**별도 gate·별도 Leo 승인 필요**(EXEC-0 PASS로 진행 자동화 아님). 실 데이터 pre-scan·repair 적용은 그 gate에서.
- **watch closure 반영:** watch-2/3/4/5 CLOSED(EXEC-0 근거) · watch-1/6 + NEW-1 유지(후속 gate).
- **Fable5/Codex:** EXEC-0 result 독립 검수 가능(선택·prep §10 프롬프트).
- **disposable 폐기:** scratchpad EXEC-0 artifacts는 보고 후 폐기(condition 4).

## 무결성
실 memory.db/dev.db/prod DB 접근 0 · raw/PII/secret 열람/출력 0(count/hash/boolean만) · prod secret 0 · subject_ref backfill 0 · repair 적용 0(후보만·applied=false) · 실 migration 0 · live 배선 0 · hard reject 0 · prisma migrate reset 0 · db push --accept-data-loss 0 · sanitized clone 미사용(이번 범위 제외) · 제품 repo main/remote 변경 0 · schema code main merge 0 · disposable DB = scratchpad(버전관리 밖) · **EXEC-1은 별도 gate·별도 Leo 승인** · 본 result report만 foundation-docs commit/push.
