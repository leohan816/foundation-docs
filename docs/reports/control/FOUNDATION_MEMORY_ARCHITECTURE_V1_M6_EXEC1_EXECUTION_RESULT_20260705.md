# Memory V1 — EXEC-1 Execution Result (dev·additive schema + read-only pre-scan)

> 작성: foundation-control(Control) · 2026-07-05 · **범위: Leo 조건부 승인 EXEC-1 실행 결과(non-prod/dev·additive schema DDL + read-only pre-scan).**
> ★실행됨: 승인된 **dev `memory.db`(SIASIU)·dev `dev.db`(Cosmile)** 에 additive schema. ★실행 안 됨(범위 밖·별도 gate): 실 데이터 repair·episode/memory_fact→ltm_fact mapping·subject_ref backfill·prod DB·prod secret·live 배선·hard reject·main merge.
> ★raw/PII/raw identifier **미출력**(count/hash/boolean만)·`prisma migrate reset`/`db push --accept-data-loss` **미사용**·backup 선행·rollback rehearsal 수행.
> 근거: EXEC-1 Gate Approval Package(GitHub main `b7f99fd`·Leo 조건부 승인).

---

## 1. Fact (실행 결과·evidence = count/hash/boolean)
### 1.1 SIASIU `memory.db` (additive 신규 테이블 CREATE only)
| 항목 | 결과 |
|---|---|
| WAL-safe backup(`.backup`) + integrity | **ok** (원본 integrity **ok**) |
| 기존 테이블 pre-state | episode=30·fact_type_registry=11·memory_fact=1·user=3 (shadow 테이블 pre=0) |
| **기존 테이블 무변경** | ✅ **count+checksum 일치**(episode/fact_type_registry/memory_fact/user 무접촉) |
| 신규 shadow 테이블 CREATE | ✅ 8개(ltm_fact·memory_fact_candidate·conversation_session/message·episode_summary·customer_profile·consent_record·subject_ref_map) + partial-unique index |
| read-only pre-scan(count) | off_contract_status=0·candidate_pending=0·null_governance=0·single_2active=0·tombstone=0·subject_key_null=0·off_contract_retention=0 · **repair_candidate_count=0·repair_applied=false** |
| **candidate CHECK 강제** | ✅ `status='pending'` INSERT **reject**(sqlite CHECK) |
| rollback rehearsal | ✅ restore integrity ok·**pre-state 일치**·shadow 테이블 미포함 |

### 1.2 Cosmile `dev.db` (additive prisma migration·직접 additive SQL 적용)
| 항목 | 결과 |
|---|---|
| WAL-safe backup + integrity | **ok** (원본 integrity **ok**) |
| additive DDL(migrate diff·no-apply 검사) | **destructive 0**(DROP/DELETE/TRUNCATE 0)·ADD COLUMN 45(5모델×9 overlay)·CREATE TABLE 8 |
| **기존 테이블 무변경** | ✅ **row count 일치 + 기존 컬럼 checksum 일치**(overlay ADD COLUMN이 기존 데이터 무변경) |
| overlay ADD COLUMN 대상 | ✅ 승인 **5모델만**(CommerceEvent·Cart·Order·Wishlist·AlertSubscription)·CartItem/기타 무접촉 |
| 신규 memory 모델 CREATE | ✅ 8개(ConversationSession/Message·EpisodeSummary·MemoryFactCandidate·LongTermMemoryFact·CustomerProfile·ConsentRecord·SubjectRefMap) |
| **candidate CHECK 강제(raw SQL)** | ✅ migration SQL의 `MemoryFactCandidate` CREATE에 `CHECK (status IN ('candidate','approved','rejected'))` **수동 삽입**·`status='pending'` INSERT **reject** 실증 |
| read-only pre-scan(count) | off_contract_status=0·candidate_pending=0·single_2active=0·tombstone=0·null_governance=0·**repair_candidate_count=0·repair_applied=false** |
| rollback rehearsal | ✅ restore integrity ok·row count pre 일치·memory 모델 미포함 |
| ★`prisma migrate reset`/`db push --accept-data-loss` | **미사용**(직접 additive SQL 적용) |

## 2. 필수 선행 이행
1. **WAL-safe backup**: 양 DB `.backup`(naive copy 미사용)·backup integrity **ok**. rollback artifact = scratchpad 보존.
2. **PRAGMA integrity_check**: 원본 pre **ok** · backup **ok** · **post-EXEC-1 memory.db ok·dev.db ok**.
3. **migration 전 기존 테이블 row count/checksum 기록** + 후 **일치 검증**(SIASIU count+checksum·Cosmile row count+기존 컬럼 checksum).
4. **runner 83/89 선재 6건 memory batch 무관 재명시**: EXEC-1 후 runner = **83/89·taxonomy {lmr:5, brain:1}**(EXEC-1 전과 **동일**). runner는 dev DB/memory migration을 **참조하지 않음**(foundation core만 테스트) → 선재 6건은 memory batch/EXEC-1 **무관**(FOUNDATION HEAD c9bb996 기인 추정·별도 조사).
5. **Cosmile candidate CHECK가 실 migration SQL에 포함됐는지 증명**: ✅ additive SQL의 `MemoryFactCandidate` CREATE에 CHECK 삽입 확인 + `pending` INSERT reject 실증(DB-level 강제).

## 3. EXEC-1 후 회귀 검증 (기존 동작 무변경)
| 항목 | 결과 |
|---|---|
| dev DB 무결성(post) | memory.db **ok** · dev.db **ok** |
| Foundation gate | **57/57** |
| Foundation runner | **83/89**(추가감소 0·선재 6·taxonomy 동일) |
| SIASIU integration/workflow/fingerprint | **39/39 · 119/119 · d7f579443f8a110a**(무변경) |
| Cosmile readiness/loop/de-anon/prisma | **164/164 · 112/112 · 14/14 · valid** |
- ★신규 테이블/컬럼 추가가 기존 answer/consult/commerce 동작에 영향 0(SIASIU 신규 테이블 empty·미참조·Cosmile overlay nullable·미참조).

## 4. STOP 조건 점검: **위반 0**
integrity_check 실패 0 · **CHECK 미삽입 0**(양 서비스 강제 실증) · 기존 테이블 count/checksum 불일치 0 · rollback rehearsal 실패 0 · raw/PII 출력 0 · **destructive DDL 0**(DROP/DELETE 0·additive만) · repair/backfill/live/prod/main merge 시도 0 · tombstone/deleted/blocked/expired 재등장 위험 0(pre-scan tombstone=0·신규 테이블 empty).

## 5. 실행 안 된 항목 (범위 밖·별도 gate·별도 Leo 승인)
- 실 데이터 **repair 적용**(pre-scan은 count only·repair_applied=false) · **episode/memory_fact→ltm_fact mapping**(0) · **subject_ref backfill**(0·NULL 유지) · prod DB · prod secret · live 배선 · hard reject 활성 · **product repo main merge**(main 무변경) · schema code main merge.

## 6. Remaining watch / follow-up
- **Cosmile prisma 마이그레이션 기록:** additive SQL을 **직접 적용**(reset 위험 회피)해 `_prisma_migrations`에 미기록 → 후속으로 **정식 prisma migration 파일 생성(기록 동기화)** 권고(drift 관리·별도·비-blocker).
- **Cosmile candidate app-level validation:** DB-level CHECK는 강제됨(primary·실증). **app-level validation(defense-in-depth·P-b)** = 후속 권고(Cosmile write 경로·별도).
- **runner 83/89 선재 6건:** 별도 원인 조사 train(memory batch 무관 확정).
- **dev DB mtime = 07-05**(EXEC-1 적용됨·정상). backups(scratchpad) = rollback 경로.

## 7. 다음 액션 / approval boundary
- ★**본 EXEC-1 = additive schema DDL + read-only pre-scan 완료(dev).** 실 데이터 repair·mapping·backfill·prod/live/hard reject/backfill/main merge = **여전히 각 별도 gate·별도 Leo 승인**.
- Leo 판단: ① 독립 delta 검수(EXEC-1 result 확인·선택) ② 후속(prisma migration 기록·app-level validation·runner 선재 조사) ③ 다음 execution gate(repair/mapping/live 등)는 각 별도 승인.

## 무결성
EXEC-1 = 승인 dev 대상·additive schema DDL + read-only pre-scan only · 실 데이터 repair 0 · mapping 0 · subject_ref backfill 0 · prod DB 0 · prod secret 0 · live 0 · hard reject 0 · **product repo main merge 0**(main ee055ef/3cd068d/3ba91e0 무변경) · schema code main merge 0 · raw/PII/raw identifier 출력 0 · prisma reset/db push 미사용 · backup+rollback rehearsal 수행 · 서버 잔여 0 · 본 result report만 foundation-docs commit/push.
