# COSMILE MEMORY V3-11B — DB Integration Implementation Evidence

> 작성: foundation-control / **fable-builder** 스킬(implementation-execution·test-design-before-code·implementation-report-template 적용) · 2026-07-06.
> anchor: gate/plan `73a9497`(D-1/D-2/D-3) · V3-11A `af26f94`(43/43·CLOSED_WITH_LIMITS) · 사전 `DATA_DICTIONARY_CANONICAL`(§2.12/§2.4/§2.5/§2.9/§2.13) · V3-08 INV-DB-1/2/3 · 실 `prisma/schema.prisma`(provider postgresql).
> ★non-prod/ephemeral Postgres only · prod DB/live/main/secret/Vault 무접촉. Cosmile shadow **`4c22c83`**(main 3ba91e0 무변경).
> ★"완료"가 아니라 증명한 것/증명하지 않은 것 구분(§9).

---

## 1. Executive summary
D-1/D-2/D-3 확정 반영해 V3-11A 계약을 Postgres에 착지: 신규 model 3종 + LongTermMemoryFact additive 6 + secretVersion readiness. **DB-touch test 먼저→additive migration→28/28 PASS→zero-violation(INV-DB-2/3=0)→rollback rehearsal PASS**. ★ephemeral Postgres(docker·disposable)에서만 검증·prisma schema valid·provider-independent 43/43 무영향.

## 2. Changed files (Cosmile shadow `4c22c83`)
| 파일 | 내용 |
|---|---|
| `app/prisma/schema.prisma` | additive: 신규 model 3종 + LtmFact 7필드(D-2 6 + D-3 secretVersion)·기존 컬럼 무변경 |
| `app/prisma/migrations/20260706120000_v3_11b_.../migration.sql` | additive DDL + raw SQL CHECK/partial-unique/FK(up) |
| `.../down.sql` | rollback(additive 역순·base 미접촉) |
| `app/scripts/v3_11b_db_integration.dbtest.py` | DB-touch test(28 케이스·infra-gate SKIP≠PASS) |

## 3. DB models added/changed
- **신규(D-1)**: `RecommendationEvent`(commerce 계층·anon 허용)·`RecOutcomeEvent`(order_item attribution·rec_id nullable)·`RecOutcomeFeedback`(semantic_label §2.12·adverse).
- **additive(D-2)**: `LongTermMemoryFact` +`direction`·`safetyFlag`·`evidenceCount`·`distinctSignalSourceCount`·`status`·`lifecycleState`.
- **additive(D-3)**: `secretVersion smallint default 1` on 신규 3 model + LtmFact. ★`SubjectRefMap.secretVersion`는 **base init에 이미 존재**(D-3 pre-satisfied·재추가 안 함). MemoryFactCandidate secretVersion = LIMIT(후속).
- ★기존 컬럼 drop/rename **0**(up migration DROP 0·additive only).

## 4. CHECK/constraint mapping (Prisma CHECK 미지원 → raw SQL·watch-1 사전 재대조)
| 제약 | 값/규칙 | 검증 |
|---|---|---|
| semanticLabel CHECK | **§2.12 patched 10값**(satisfied…unclear) | DB2c/d adverse_reaction·unknown 거부·DB2a/b 정합 통과 |
| adverseSeverity CHECK | low·moderate·severe·null | DB2e `mild` 거부·DB2f `low` 통과 |
| adverseCertainty CHECK | reported·repeated·verified·contradicted·null | (CHECK 존재) |
| eventType CHECK | 5값(V3-03) | DB1b `bogus_event` 거부 |
| recommendationId CHECK | `^rec_v3_[Crockford]{26}$` | DB1c `rec_v3_+32 zeros` 거부 |
| attributionMode CHECK | §2.9 5값 | (CHECK 존재) |
| subject_ref XOR anonymous_ref | `(subjectRef IS NULL)<>(anonymousRef IS NULL)` | DB1d both·DB1e neither 거부 |
| R-K2 | organic/unattributed/unknown→rec_id null | DB3a 위반 거부·DB3b/c 통과 |
| direction/safetyFlag/status/lifecycleState CHECK | 사전 §2.1/§2.13/§2.2 | (CHECK 존재) |
| INV-DB-1 partial-unique | COALESCE(subjectRef,guestRef),type,normValue WHERE active | DB7b 중복 거부·DB7c deleted 예외 허용 |
| memory 계층 anon 차단 | LtmFact/Candidate에 anonymousRef **컬럼 없음** | DB4 구조 확인 |

## 5. DB-touch tests and results
- **28/28 PASS**(ephemeral Postgres·`v3_11b_db_integration.dbtest.py`). ★provider-independent(`v3_11.vitest.ts` 43/43)와 **분리**·다른 harness(python/psycopg2).
- ★**infra-gate 규율**: psycopg2 부재/DB 연결 실패 = **exit 2 SKIP**(PASS 아님·별도 처리). 이번 실행은 실제 연결 성공 → 28 실측 PASS.
- ★**bidirectional oracle**: 정상 insert 통과 + 위반 insert 거부 양쪽. INV counter는 clean=0 + **위반 주입 시 detect(≥1)**로 tautology 아님(DB5b·DB6b).
- 재현: `docker run postgres:16-alpine`(ephemeral) → base init → migration → `pgvenv/bin/python scripts/v3_11b_db_integration.dbtest.py`.

## 6. Zero-violation results
- **INV-DB-2 = 0** (approved·direction≠safety·safetyFlag null·evidence<N_min|source<2|conf<C_min count) — clean seed. safety fact·safety_flag fact는 **예외로 제외 확인**(P1). 위반 주입 시 counter=1 detect(비-tautology).
- **INV-DB-3 = 0** (safety fact(direction=safety OR safetyFlag not null)의 demoted 없음). demoted 주입 시 detect(비-tautology).
- (INV-DB-1은 partial-unique로 물리 집행·DB7b/c).

## 7. Rollback rehearsal
- fresh DB: base **40** → up **43**(+3 table)·LtmFact 신규컬럼 **7/7** → down **40**(테이블 복원)·신규컬럼 **0** → ★base `SubjectRefMap.secretVersion` **보존(1)**.
- ★rollback 정합 3항 전부 YES: 신규 테이블 제거·additive 컬럼 제거·base 무손상. down은 base 소유 컬럼 미접촉.

## 8. Excluded scope confirmation
prod DB 접근·live emit·real secret/Vault·prod rotation·main merge·PR·**G13 COSMILE-4 실 DDL**·semantic extraction·ranking runtime·LTM full promotion pipeline = **전부 미수행(확인)**. secret rotation은 컬럼 readiness만(값 회전 0).

## 9. 무엇을 증명/증명하지 않았는가
- **증명(ephemeral Postgres 실측)**: additive migration 적용·CHECK가 구값(adverse_reaction/unknown/mild) 거부·XOR·R-K2·partial-unique·INV-DB-2/3 counter=0(+위반 detect)·rollback 복원·base 무손상·schema valid·provider-independent 무영향.
- ★**증명 안 함(정직)**: prod DB 적용·기존 데이터 backfill(기존 approved 행에 evidenceCount 채우기 — dev DB는 빈 상태라 무이슈·실 DB는 별도)·live emit 배선·secret 실 rotation·MemoryFactCandidate secretVersion·`prisma migrate deploy` 실 파이프라인(raw SQL 직접 적용으로 리허설)·다중 세션 동시성·성능.

## 10. Remaining limits & commit hashes
- **LIMITS(이월)**: 기존 approved 행 backfill 정책(실 DB)·MemoryFactCandidate secretVersion·secret 실 rotation(D-3 값 회전)·isMemorySubjectKeyAllowed allowlist 강화(V3-11A L-a)·N_min/C_min 최종 확정(사전 §4·Leo)·G13 COSMILE-4·semantic 추출·ranking runtime·LTM full pipeline.
- **commits**: Cosmile shadow **`4c22c83`**(코드·main 3ba91e0 무변경) · foundation-docs(본 evidence + snapshot v3-11b). ephemeral DB=docker disposable(prod 무접촉). dev placeholder `devlocal_rehearsal`은 throwaway 컨테이너 값(실 secret 아님).

## 무결성
V3-11B non-prod DB integration · ephemeral Postgres only · additive(up DROP 0) · DB-touch 28/28·INV-DB-2/3=0(+위반 detect)·rollback 복원·partial-unique·CHECK 구값 거부 · provider-independent 43/43·regression 10/10 무영향 · prod/live/main/secret/Vault 0 · §9 미증명 정직 명시 · G13/semantic/ranking/pipeline 이월.

---

## Addendum — V3-11B DB patch batch (2026-07-07 · Cosmile shadow `6fd7815`)
> 독립 검수 `V3_11B_DB_NEEDS_PATCH`(P-A/P-B/P-C) 이행. ★scope 확대 없음·non-prod ephemeral·prod/live/main/secret 0. 정본 실 사전 직접 대조.

| P | 문제 | patch | 검증 |
|---|---|---|---|
| **P-A** direction CHECK | 구 3값(positive/negative/safety) — §2.1 정본 5값 누락 | CHECK = positive\|negative\|safety\|**behavioral\|context**(§2.1 실 table 대조) | DB8a behavioral·DB8b context 통과·DB8c 구값 거부 |
| **P-B** lifecycleState CHECK | 구 active/demoted/superseded — §2.2 정본 아님(active/superseded=factState 값) | CHECK = pending_evidence\|safety_frozen\|human_review_required\|demoted\|stale\|expired\|merged(7)·default active→**pending_evidence** | DB9a/b/c 정본값 통과·DB9d active·DB9e superseded 거부 |
| **P-C** INV-DB-3 라벨 과장 | "INV-DB-3 전체 충족"으로 읽힘 | counter를 **[DB-subset: safety fact demotion 금지]**로 정직 라벨. ★원 INV-DB-3(adverse signal 후 safety_reviewed 없는 active recommendation 금지)은 필요 컬럼/배선 부재 → **Event/Safety Gate Wiring 단계 이월**(여기 미측정) | DB6a/b 라벨 정정 |

- 테스트: **DB-touch 36/36**(기존 28 + P-A 3 + P-B 5)·INV-DB-2=0·INV-DB-3[DB-subset]=0·**rollback 정합 YES(전항: base 40→up 43→down 40·additive 컬럼 0·base 무손상)**·provider-independent **43/43** 무영향·prisma schema valid·skip/xfail 0·expected 하향 0.
- ★**정정된 이해**: INV-DB-3 **DB-subset만** 이번 층에서 집행(safety/safetyFlag fact demotion 금지). 완전 INV-DB-3은 event wiring 후속.
- Cosmile shadow `6fd7815`(구 4c22c83·main 3ba91e0 무변경). ephemeral disposable·prod 무접촉.
