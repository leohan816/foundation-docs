# Memory V1 — M6 PostgreSQL Unification Batch Implementation (Option B · dev/local)

> 작성: foundation-control(Control) · 2026-07-06 · **범위: SIASIU/Cosmile PostgreSQL Option B memory unification 구현(dev/local/shadow). prod/live/main 0.**
> ★Hard Stop 무접촉: prod DB 0 · 실 secret 0 · main merge 0 · live 0 · 외부 배포 0 · Foundation service DB direct access 0 · cross-schema direct ref 0 · 원본 memory.db/dev.db 삭제/이동/write 0(copy/backup만).
> 근거: design(`7ef9d01`) + Leo 전제 정정(SQLite=dev artifact·canonical 우선·과감 재정렬) + 실 docker postgres 검증.

---

## 1. Fact
- Option B(same PostgreSQL server·schema siasiu/cosmile·canonical logical contract) 구현을 **dev/local/shadow**에서 실 검증. disposable docker postgres:16-alpine 사용.
- ★**정직 경계**: canonical postgres **구조·repository·migration rehearsal·Cosmile provider 전환**은 실제 완료. **live route cutover(server.py→service_memory)·원본 memory.db 물리 relocation·실 role grant·prod**는 **미수행(remaining)**.

## 2. Design deviations
- ★canonical schema 자체 수정 **0**(STOP #7 미발생). 7ef9d01 설계 준수.
- ★legacy mapping ambiguity 2건은 **canonical seed/migration candidate로 분리 보고**(설계 지시대로·왜곡 0): (a) episode.text raw→canonical 미저장(content_hash만) (b) fact_type_registry→canonical core 밖 SIASIU config extension.
- 그 외 설계 이탈 없음.

## 3. SIASIU implementation summary (dev/local)
- 신규 **`app/service_memory/`**(additive·brain.py 무수술): `repository.py`(PostgresMemoryRepository **정본**·canonical 8 core ops·subject_ref v2 mint·content_hash) · `legacy_sqlite.py`(격리·정본 아님) · `canonical.py`(공통 contract·memory_context/reuse_decision) · `backend.py`(`SIASIU_MEMORY_BACKEND`=postgres 정본) · `schema_postgres.sql`(siasiu schema DDL).
- ★memory_context = minimized(raw episode text/PII 미포함·`raw_text_stored=False`·request_scoped) → Foundation. reuse_decision 6종 consume 인터페이스.
- ★SQLite = repository 경계 뒤 legacy로 격리·정본 경로 = PostgreSQL.
- **SIASIU shadow commit `75105e9`**.

## 4. Cosmile implementation summary (dev/local)
- `prisma/schema.prisma` provider **`sqlite`→`postgresql`**(정본). prisma **validate PASS** 🚀.
- postgres baseline migration `00000000000000_init_postgres/`(40 CREATE TABLE) 생성·기존 sqlite migration 2개 → `migrations_legacy_sqlite/` archive·`migration_lock.toml` postgresql.
- prisma client 재생성(v6.19.3). `.env.example` postgres DATABASE_URL key(값 없음).
- canonical 8 core(SubjectRefMap·ConsentRecord·Conversation*·EpisodeSummary·LongTermMemoryFact·MemoryFactCandidate·CustomerProfile) + 14 commerce extension(canonical core 밖).
- **Cosmile shadow commit `76158c8`**.

## 5. PostgreSQL schema rehearsal result
- disposable docker postgres·schema `siasiu`/`cosmile` 생성·canonical 8 core **각 8/8 테이블**·indexes(ux_ltm_active·ux_srm_furef_version)·`raw_text_stored` default **false** 확인.

## 6. Migration rehearsal result (copy·원본 무접촉)
- SIASIU: memory.db **copy**(sqlite3 .backup·integrity ok)·before counts(user 3·episode 30·memory_fact 1·fact_type_registry 11·checksum 3c59eb0b9666c0a1).
- legacy→canonical 매핑(postgres siasiu): user 3→subject_ref_map 3+customer_profile 3 · memory_fact 1→ltm_fact 1 · episode 30→conversation_session 3+conversation_message 30(content_hash) · **raw_text_stored=TRUE 0**(invariant).
- seed/migration candidates(분리 보고): episode raw text 30·fact_type_registry 11.
- Cosmile: dev.db **backup**(integrity ok·41 tables)·baseline SQL이 cosmile schema에 **0 errors·40 tables** 적용.

## 7. Permission isolation result (실 postgres·keystone)
| test | 결과 |
|---|---|
| siasiu_role → siasiu schema | ✅ 허용 |
| siasiu_role → cosmile schema | ✅ **permission denied for schema cosmile** |
| cosmile_role → cosmile schema | ✅ 허용 |
| cosmile_role → siasiu schema | ✅ **permission denied for schema siasiu** |
| foundation role 존재 | ✅ **0**(없음) |
- ★cross-schema direct access = **DB-level 차단**. Foundation DB user 0.

## 8. Shared contract tests
- `test_service_memory_canonical_contract.py` **6/6 PASS**(pure + 실 postgres integration): canonical 8 core·reuse_decision 6종·subject_ref format(subj_v2_)·memory_context raw 미포함·`raw_text_stored=False` fail-closed·postgres integration(content_hash only·raw_text_stored=0).

## 9. Regression tests
- SIASIU `import brain` **무파손**(additive)·service_memory import OK(backend 정본=postgres).
- ★SIASIU 기존 runner/route regression·Cosmile 기존 vitest = **postgres 정본 기준 재실행/수정 미완**(remaining·§12). SQLite 경로는 미변경이라 기존 sqlite 기반 테스트는 현행 유지.

## 10. Bugs found
- ★critical bug 0. 발견 이슈: (a) prisma provider 전환 시 실 `.env` URL(file:) 불일치로 validate P1012 → **CONTRACT_DRIFT**(postgres DATABASE_URL로 정합·해결) (b) legacy episode.text raw ↔ canonical raw_text_stored=False = **설계 의도된 분리**(seed candidate·bug 아님).

## 11. Failures and meaning classification
| 항목 | 분류 |
|---|---|
| SIASIU runner 83/89(memory.db in app/data) | **REQUIRES_ARCHITECTURE_DECISION**·해결=postgres cutover(정본 전환)·아직 live route 미cutover라 잔존(정직) |
| prisma validate P1012(env URL) | **CONTRACT_DRIFT_FOUND**·해결(postgres URL) |
| episode raw / fact_type_registry mapping | **MEANINGFUL(seed candidate 분리)**·canonical 우선 |
- ★no skip/xfail·no expectation manipulation. 실패는 숨기지 않고 위 분류로 보고.

## 12. Remaining risks / work (dev·별도)
- **SIASIU live route cutover**: server.py `/api/recall·reset·recos·checkins·pitch`를 brain.py(sqlite)→service_memory(postgres)로 전환(미수행). 현재 repository는 additive·미배선.
- **SIASIU memory.db 물리 relocation/archive**: 원본 app/data/memory.db 유지 중(runner 83/89)·정본 postgres cutover 후 archive.
- **Cosmile 기존 test suite postgres 정합**: vitest/readiness/loop을 postgres 기준 재실행·수정(미완).
- **legacy seed migration**: episode raw/fact_type_registry candidate 처리 정책(Leo).
- concurrent SIASIU/Cosmile 세션 문서(무접촉) 정합.

## 13. Remaining Hard Stops
- 실 role/권한 grant(운영)·prod DB migration·live activation·main merge·외부 공개 배포·실 secret 주입·prod dev.db/memory.db write = **전부 미수행(Hard Stop)**.

## 14. Commit hashes
- **SIASIU shadow `75105e9`**(service_memory + contract test·main 3cd068d 무변경).
- **Cosmile shadow `76158c8`**(prisma postgres provider·baseline·legacy archive·main 3ba91e0 무변경).
- **foundation-docs**: 본 report(아래 commit). FOUNDATION main 580093c 무변경.

## 15. What was not touched
- ★원본 SIASIU `app/data/memory.db`(mtime 09:02:42 불변·copy만)·원본 Cosmile `dev.db`(backup만·삭제 0)·brain.py 로직(additive·무수술)·answer.py fingerprint·guard·기존 테스트 기대값·concurrent 세션 파일(SIASIU 4·Cosmile 5 무접촉)·prod/live/main.

---

## Leo 요청 구분
1. **dev/local 실제 전환**: postgres canonical schema+permission isolation(docker)·SIASIU service_memory postgres repository·SIASIU migration rehearsal(copy)·Cosmile provider sqlite→postgresql(validate PASS·baseline·client regen).
2. **prod/live/main 미반영**: 실 role grant·prod DB·live·main merge·외부 배포 = **0**.
3. **SQLite legacy artifact 처리**: SIASIU memory.db=copy만(원본 보존·미relocation)·Cosmile dev.db=backup(원본 보존)·sqlite migration→migrations_legacy_sqlite archive.
4. **PostgreSQL 정본 경로**: SIASIU=service_memory PostgresMemoryRepository(schema siasiu)·Cosmile=prisma postgresql(schema cosmile)·공유=canonical logical contract(physical 0).
5. **남은 Hard Stop**: 실 role grant·prod migration·live·main·외부 배포·실 secret.

## 무결성
Option B postgres unification **dev/local 구현** · 원본 DB 무접촉(copy/backup) · canonical 우선(왜곡 0) · permission isolation 실증(cross-schema denied·foundation role 0) · raw_text_stored=False invariant · 실 secret 0 · prod DB 0 · live 0 · **main merge 0**(fnd 580093c·siasiu 3cd068d·cosmile 3ba91e0) · Foundation service DB 참조 0 · cross-schema direct ref 0 · **live route cutover·prod·role grant은 별도(remaining/Hard Stop)**.
