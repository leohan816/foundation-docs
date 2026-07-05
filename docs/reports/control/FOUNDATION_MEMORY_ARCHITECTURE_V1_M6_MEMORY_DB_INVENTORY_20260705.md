# Memory V1 — M6 memory.db Read-Only Inventory

> 작성: foundation-control(Control) · 2026-07-05 · **범위: `app/data/memory.db` read-only inventory(삭제/이동/수정/guard/테스트 변경 0·raw row dump 0).**
> ★Hard Stop 무접촉: memory.db 삭제/이동/수정 0 · guard 완화 0 · 테스트 수정 0 · 코드 수정 0 · raw row dump 0 · 실 secret 0 · prod DB 0 · live 0 · main merge 0.
> 근거(local·read-only): sqlite PRAGMA + count·brain.py·foundation_memory_schema_shadow·verify_app_data_clean·import 검색.

---

## 1. Fact
- `app/data/memory.db`는 **혼합 DB**: (a) **SIASIU legacy brain runtime 고객 memory**(brain.py owner·populated) + (b) **Memory V1 shadow 8테이블**(EXEC-1 overlay·empty).
- ★brain.py는 **answer.py/distill.py/server.py가 import**하는 **live-wired** 모듈 → memory.db = **live brain 고객 memory 데이터**(테스트 산출물 아님).
- ★Runner Meaning Audit(`6af9628`) 결과 = 6 runner 실패의 실 원인(memory.db 존재)·subject_ref 무관.

## 2. File metadata
- path=`app/data/memory.db` · size=**118784 bytes** · mtime=**2026-07-05 09:02** · page_count=29·page_size=4096 · journal_mode=**wal** · **integrity_check=ok**.

## 3. Tables and row counts only (raw row dump 0)
| table | rows | 성격 |
|---|---|---|
| **user** | **3** | legacy brain(user_id·name·created_at) ★고객 식별 |
| **episode** | **30** | legacy brain(user_id·ts·role·**text**) ★상담 원문 데이터 |
| **memory_fact** | **1** | legacy brain(user_id·type·value·...) ★고객 fact |
| **fact_type_registry** | **11** | legacy brain(type registry·비고객) |
| consent_record | 0 | Memory V1 shadow(EXEC-1) |
| conversation_session | 0 | Memory V1 shadow |
| conversation_message | 0 | Memory V1 shadow |
| customer_profile | 0 | Memory V1 shadow |
| episode_summary | 0 | Memory V1 shadow |
| ltm_fact | 0 | Memory V1 shadow |
| memory_fact_candidate | 0 | Memory V1 shadow |
| subject_ref_map | 0 | Memory V1 shadow(+secret_version) |
- ★legacy 4테이블 = **populated(34 rows·고객 memory)** · Memory V1 8테이블 = **empty**. raw row 값 미열람(count·schema 컬럼명만).

## 4. Code references
- **memory.db writer(owner) = `app/brain.py`**: `DB_PATH=app/data/memory.db`·`init_db`(user/episode/memory_fact/fact_type_registry CREATE)·`add_episode`/`ensure_user`/`active_facts`/`recent_episodes`(읽기·쓰기).
- **live-wiring**: `answer.py`(brain import 5)·`distill.py`·`server.py` → brain.py를 answer 경로에서 사용.
- **memory.db 문자열 30 파일 참조**: 대부분 **guard/boundary**(memory.db 미생성 확인·lmr package boundary·verify_app_data_clean)·writer는 brain.py.
- **Memory V1 shadow(`foundation_memory_schema_shadow`)**: docstring = "★미배선·실 memory.db **무접촉**·:memory: only·실 memory.db 대상 실행은 Leo 승인(M4 migration)". create_schema는 caller conn만. → **EXEC-1 harness(Leo 승인 M4 migration)가 실 memory.db에 8테이블 overlay**(설계는 :memory:였으나 승인된 예외).
- **guard `verify_app_data_clean`**(`foundation_file_intake.py:31`): `memory_db_present = "memory.db" in files`. h28/p07이 이를 False 기대.

## 5. Current role hypothesis
- ★**legacy/live brain runtime DB = YES**(brain.py owner·answer.py live-wired·34 rows 고객 memory·episode text/user name).
- ★**Memory V1 shadow/dev DB = 부분 YES**(8 empty 테이블·EXEC-1 overlay·Leo 승인).
- test artifact = NO. 운영 데이터 관련 = **YES-shaped**(brain live-wired·고객 episode/facts). 여러 용도 섞임 = **YES**(live brain + Memory V1 shadow가 한 파일에 혼재).

## 6. Dependency / risk
- **삭제 시 깨짐(HIGH)**: answer.py/distill.py/server.py(brain live 경로·34 rows 고객 memory 손실)·test_app.py·brain 테스트. ★§4 고객 데이터 삭제 = 절대 금지.
- **이동 시 수정 필요**: `brain.py DB_PATH`(코드·별도 승인) + 34 rows 데이터 migration(backup 선행) + answer/distill/server는 brain.py 경유라 경로만 바뀌면 동작.
- **app/data 유지 시 깨지는 invariant**: "app/data=ssbrain-only·memory.db 0"(§4/§8·guard h28/p07·runner 6 실패 영속).
- **별도 경로 분리 작업**: ① Memory V1 shadow를 memory.db에서 **분리**(dedicated Memory V1 DB·empty라 데이터 손실 0) ② brain memory.db를 app/data clean zone **밖**으로 이전(코드+데이터 migration).

## 7. Options
- **A. Memory arc/legacy memory DB를 app/data 밖 별도 경로 이전**(Leo 방향 1): Memory V1 shadow → dedicated DB(설계 원안·:memory:/별도)·brain memory.db → app/data 밖(예 `app/brain_data/`)·코드+migration.
- **B. guard에 승인 예외 추가**: ★Leo가 **비선호**(1+3 결정)·clean-zone 원칙 훼손·guard 완화 금지.
- **C. legacy brain.py DB와 Memory V1 DB 분리**(Leo 방향 3): Memory V1 shadow 8테이블을 memory.db에서 제거(empty·무손실)·dedicated Memory V1 DB로·memory.db = 순수 brain.
- **D. 기타**: brain memory.db는 유지하되 clean-zone 정의를 "Foundation/LMR 공유 dir"로 좁혀 brain 전용 dir 분리(정의 명확화).

## 8. Recommendation (실행 0·추천만)
- ★**Leo 결정(1+3) 정합 = A + C 조합**:
  1. **(C) Memory V1 shadow를 memory.db에서 분리** → dedicated Memory V1 DB(설계 원안·app/data clean zone 밖·승인된 별도 경로). 8테이블 **empty**라 데이터 손실 0. ★단 EXEC-1(Leo 승인)로 올린 것이라 **되돌림도 별도 승인**.
  2. **(A) legacy brain memory.db를 app/data clean zone 밖으로 이전** → `brain.py DB_PATH` 변경(코드·별도 승인) + 34 rows migration(WAL-safe backup 선행). guard 통과 + brain 동작 유지.
  3. ★**B(guard 예외) 비채택**(Leo 방향·clean-zone 원칙).
- ★모든 실행(shadow 분리·brain 이전·코드·migration) = **각 별도 Leo 승인**. 본 inventory = read-only.

## 9. Required Leo decision
1. **target 경로 확정**: Memory V1 dedicated DB 경로 · brain memory.db 새 경로(app/data 밖).
2. **승인 필요**: (C) memory.db에서 Memory V1 8테이블 분리(empty·EXEC-1 되돌림·별도 승인) · (A) brain.py DB_PATH 변경 + 34 rows migration(backup·코드 변경·별도 승인).
3. **brain memory.db 성격 확인**: 34 rows(고객 episode/name)가 dev/local인지 prod-shaped인지 → migration 시 backup·§4 준수.
4. **clean-zone 정의**: "app/data=ssbrain-only"의 정확한 범위(D 옵션 포함 여부).

## 10. What must not be changed
- ★memory.db **삭제/이동/수정 0**(본 작업 read-only·§4 고객 데이터).
- ★guard `verify_app_data_clean` **완화/예외 0**(B 비채택).
- ★"app/data=ssbrain-only·승인 없는 memory.db 0" invariant 유지.
- ★brain.py 코드 변경 0(이번)·answer.py fingerprint(`d7f579443f8a110a`) 무변경.
- ★34 rows 고객 memory 데이터 **보존**(향후 migration 시 WAL-safe backup 선행).
- ★테스트 기대값/skip/snapshot 변경 0.

## 무결성
memory.db read-only inventory · 삭제/이동/수정 0 · raw row dump 0(count·schema 컬럼명만) · guard 완화 0 · 코드/테스트 수정 0 · 실 secret 0 · prod DB 0 · live 0 · **main merge 0**(fnd 580093c·siasiu 3cd068d·cosmile 3ba91e0) · 고객 memory 데이터 보존 · 본 inventory만 foundation-docs commit/push · **분리/이전/코드/migration은 각 별도 Leo 승인.**
