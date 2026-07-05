# Memory V1 — M6 SIASIU/Cosmile PostgreSQL Memory Unification Design (Option B · design-first)

> 작성: foundation-control(Control) · 2026-07-05 · **설계-first(§2.6): SIASIU/Cosmile memory를 PostgreSQL(same server·schema siasiu/cosmile)로 통일하는 설계. ★코드/DB 변경 0·PostgreSQL 접속 0.**
> ★Hard Stop 무접촉: 코드 변경 0 · DB 생성/수정/삭제 0 · SQLite migration 실행 0 · PostgreSQL 접속/write 0 · raw row dump 0 · guard 변경 0 · 테스트 변경 0 · prod DB 0 · live 0 · main merge 0 · 실 secret 0.
> 근거(local·read-only): reachability audit(`d87b601`) · service-local design(`920c504`) · SIASIU memory.db·Cosmile schema.prisma(provider 확인) · Option B contract(`1e24c33`).

---

## 1. Fact (current state)
- **SIASIU**: raw SQLite `app/data/memory.db`(WAL). legacy brain 4테이블 **populated**(user 3·episode 30·memory_fact 1·fact_type_registry 11) + Memory V1 shadow 8테이블 **empty**(EXEC-1). brain.py DB_PATH 하드코딩.
- **Cosmile**: Prisma memory 구조. ★**Prisma = DB 아니라 DB access/migration layer**. ★**실제 DB engine = SQLite**(`schema.prisma` `provider="sqlite"`·`dev.db` 1MB). commerce memory(CommerceEvent·overlay·SubjectRefMap 등).
- ★**양 서비스 현재 = SQLite** → Option B target = **PostgreSQL(same server·separate schemas)**.
- Foundation = memory_context validate/gate/reasoning only(service DB 미참조).

## 2. Target Option B architecture
```
PostgreSQL server (one)
├── schema: siasiu   ← SIASIU service-local memory tables (SIASIU DB user only)
└── schema: cosmile  ← Cosmile service-local memory tables (Cosmile DB user only)
Foundation: DB user 없음 / service schema 접근권 0 · memory_context만 validate/gate/reasoning
```
- 원칙: 같은 DB 계열(PostgreSQL)·같은 memory mechanism·같은 **logical contract/schema/lifecycle/test** · ★**cross-service schema/table 직접 참조 0** · Foundation direct DB access **금지** · 공유 = **canonical logical contract**(physical table 아님) · 확장: schema 분리 → database 분리 → instance 분리.

## 3. Canonical memory schema (logical contract·양 서비스 공통 core)
| table | core columns |
|---|---|
| `subject_ref_map` | subject_ref(PK)·local_user_ref_hash·guest_ref·secret_version·created_at |
| `consent_record` | consent_id(PK)·subject_ref·guest_ref·consent_scope·granted·granted_at·revoked_at |
| `conversation_session` | session_id(PK)·subject_ref·guest_ref·service_id·status·external_consult_ref·consent_scope·retention_policy·deleted·created_at |
| `conversation_message` | message_id(PK)·session_id·role·content_hash·pii_flags·deleted·created_at |
| `customer_profile` | subject_ref·guest_ref·profile_json·deleted·updated_at |
| `episode_summary` | summary_id(PK)·subject_ref·guest_ref·summary_text·intent_types·risk_level·deleted·created_at |
| `ltm_fact` | fact_id(PK)·subject_ref·guest_ref·type·norm_value·fact_state·deleted·blocked·expired·is_safety·confidence·as_of·source_ref·consent_scope·retention_policy·sensitivity_level·created_at |
| `memory_fact_candidate` | candidate_id(PK)·subject_ref·guest_ref·type·norm_value·status·fact_state·gate_decision·confidence·source_ref·consent_scope·sensitivity_level·raw_text_stored·created_at |
- **공통 lifecycle/safety fields**: `deleted`·`blocked`·`expired` · `consent_scope` · `retention_policy` · `sensitivity_level` · `raw_text_stored`(★항상 False·raw 미저장) · `service_id`(siasiu/cosmile) · `created_at`/`updated_at` · `source_ref` · safety fields(is_safety).
- ★**양 schema(siasiu/cosmile)가 이 canonical core를 동일하게 구현**. per-service 확장은 core 밖 extension table(§5).
- ★rotation: `secret_version`(service-local·zero-orphan design).

## 4. SIASIU migration design (설계·실행 별도 승인)
- **SQLite memory.db → PostgreSQL `siasiu` schema.**
- **legacy 4 mapping**: `user`/`episode`/`memory_fact`/`fact_type_registry` → canonical로 매핑(episode→conversation_message/episode_summary·memory_fact→ltm_fact·user→subject_ref_map·fact_type_registry→siasiu config/extension). ★**mapping은 별도 데이터 repair gate**(단순 이전 아님·의미 매핑·Leo 승인).
- **Memory V1 8 empty mapping**: canonical schema로 1:1(이미 정합)·empty라 무손실.
- **선행**: WAL-safe backup(sqlite)·`PRAGMA integrity_check`·row counts before(34+0)·checksum.
- **rehearsal**: local PostgreSQL(disposable)에서 schema 생성 + 이전 rehearsal·row count/checksum before/after 일치·raw row dump 0.
- **rollback**: sqlite 원본 보존(복사 방식)·postgres schema drop(rehearsal)·env 원복.
- **old memory.db archive/retention**: 이전·검증 완료 후 sqlite memory.db는 **archive**(app/data 밖·§app/data clean-zone)·정리 시점 별도 승인.
- **app/data clean-zone 복원**: memory.db가 app/data에서 제거 → guard `verify_app_data_clean` 통과 → runner **89/89 정당 복원**(테스트 조작 아님).

## 5. Cosmile alignment design
- Cosmile 현재 Prisma **sqlite** → PostgreSQL `cosmile` schema(Prisma `provider="postgresql"`·DATABASE_URL 변경).
- **canonical 비교**: Cosmile 9 memory 모델(ConversationSession/Message·EpisodeSummary·MemoryFactCandidate·LongTermMemoryFact·CustomerProfile·ConsentRecord·SubjectRefMap 등) ↔ canonical core → **core contract 동일 유지**.
- **commerce-specific extension 분리**: CommerceEvent·overlay(memory* columns on Cart/Order/Wishlist/AlertSubscription)·commerce ledger = **canonical core 밖 extension table/column**(cosmile schema 내·core와 구분).
- ★SIASIU schema와 **같은 core contract**(subject_ref_map·ltm_fact·candidate 등 동일 필드/lifecycle)·구현 layer(Prisma vs raw)는 per-service.

## 6. Code architecture
- **SIASIU**: ★brain.py 직접 rewrite 금지 · `service_memory` **adapter/repository** 우선(brain.py는 storage/LLM engine 유지·DB 접근을 repository로 추상화·SQLite→Postgres 교체 비용 최소).
- **Cosmile**: Prisma **repository/service layer** 유지(Prisma가 postgres provider로).
- ★**양 서비스 모두 Foundation에 memory_context를 동일 형식으로 emit**(canonical fields·raw/PII 아님) · **memory_reuse_decision consume 방식 통일**(allowed/blocked/expired/deleted/consent_required/not_available).
- ★Foundation은 **minimized request-scoped memory_context만**·durable 저장 0·service DB 미참조.

## 7. PostgreSQL operational design
- **schema-per-service 권한 분리**: `siasiu` DB user = `siasiu` schema만 접근 · `cosmile` DB user = `cosmile` schema만 · ★**Foundation DB user 없음(또는 service schema 접근권 0)**.
- **migration naming**: `siasiu`/`cosmile` schema별 versioned migration(Prisma migrations·SIASIU raw migration).
- **backup/restore**: `pg_dump`(schema별)·PITR·restore rehearsal.
- **connection pooling**: PgBouncer/pool per service.
- **local dev setup**: docker-compose local PostgreSQL(schema siasiu/cosmile)·dev DATABASE_URL.
- **.env.example**: `SIASIU_DATABASE_URL=`·`COSMILE_DATABASE_URL=`(key + 설명만·값 0). ★**secret 출력 0**·URL/credential은 실값 미기재.

## 8. Scalability / future migration
- **staged 확장**: same server + separate schema(시작) → **separate database**(schema→db) → **separate instance**(부하 시).
- **검토**: read replica(읽기 분산)·partitioning(ltm_fact/episode 대량 시)·connection pool·cache(재사용 memory)·search index(fact 검색)·**vector extension**(pgvector·의미 검색·V3 대비).
- ★**adapter/repository pattern**으로 DB 교체 비용 낮춤(SQLite→Postgres→분리 시 repository만 교체).

## 9. Test strategy
- **shared contract tests**: canonical memory contract(양 서비스 공통·subject_ref format·lifecycle·gate 필드).
- **SIASIU route regression**: recall/reset/recos/checkins/pitch(postgres repository·shadow/dev)·fingerprint `d7f579443f8a110a` 무변경.
- **Cosmile memory regression**: de-anon 14·vitest·readiness 164·loop 112.
- **migration rehearsal**: sqlite→postgres(local disposable)·row count/checksum before/after·raw 0.
- **app/data clean-zone guard**: 이전 후 `verify_app_data_clean().ok==True`·runner **89/89**(정당).
- ★**no skip/xfail·no expectation manipulation·no snapshot 조작**.

## 10. Recommended staged execution
| Stage | 내용 | 성격 |
|---|---|---|
| **Stage 0** | design only(본 문서) | ✅ 완료(코드 0) |
| **Stage 1** | local PostgreSQL schema rehearsal(docker·disposable·canonical schema 생성) | 별도 승인·local dev |
| **Stage 2** | SIASIU service_memory adapter/repository(brain.py 위·shadow·flag OFF) | 별도 승인·코드(shadow) |
| **Stage 3** | SQLite→PostgreSQL migration rehearsal(local disposable·backup·count/checksum) | 별도 승인·rehearsal(실 이전 아님) |
| **Stage 4** | Cosmile schema alignment(Prisma postgres provider·canonical core) | 별도 승인 |
| **Stage 5** | ★**final Leo approval before any real DB migration**(prod/실 이전) | Hard Stop |
- ★Stage 1~4 = local/dev/rehearsal·Stage 5 = 실 DB migration(Hard Stop·별도 최종 승인).

## 11. Required Leo approvals (각 별도·설계-first 후)
① 본 설계 승인 ② Stage 1 local postgres schema rehearsal ③ Stage 2 SIASIU adapter(shadow) ④ Stage 3 migration rehearsal(disposable) ⑤ Stage 4 Cosmile alignment ⑥ legacy 4→canonical mapping(데이터 repair gate) ⑦ **Stage 5 실 DB migration**(Hard Stop). ★prod·live·main merge = 각 별도 Hard Stop.

## 12. What must not be changed (이번 설계 단계)
- 코드 변경 0 · DB 생성/수정/삭제 0 · SQLite migration 실행 0 · PostgreSQL 접속/write 0 · guard 완화 0 · 테스트/skip/snapshot 0 · memory.db/dev.db 무접촉 · fingerprint 무변경 · 34 rows/Cosmile 데이터 보존 · Cosmile↔SIASIU physical 공유 0 · Foundation service DB 참조 0 · 실 secret 0.

## 무결성
PostgreSQL memory unification **설계-first**(Option B·same server·schema siasiu/cosmile) · 코드 0 · DB 생성/수정/삭제 0 · SQLite migration 0 · PostgreSQL 접속 0 · raw row dump 0 · guard 0 · 테스트 0 · 실 secret 0 · prod DB 0 · live 0 · **main merge 0**(fnd 580093c·siasiu 3cd068d·cosmile 3ba91e0) · 공유=logical contract only(physical 0) · Foundation service DB 참조 0 · 본 설계만 foundation-docs commit/push · **Stage 1~5·mapping·실 migration은 각 별도 Leo 승인.**
