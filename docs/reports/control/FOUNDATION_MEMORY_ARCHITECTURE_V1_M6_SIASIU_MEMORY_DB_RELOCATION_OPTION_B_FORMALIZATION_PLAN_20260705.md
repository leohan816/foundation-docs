# Memory V1 — M6 SIASIU memory.db Relocation & Option B Formalization Plan

> 작성: foundation-control(Control) · 2026-07-05 · **범위: SIASIU `app/data/memory.db`를 SIASIU service-local memory로 정식화 + app/data clean zone 밖 이전 **계획**(코드/DB 변경 0).**
> ★Hard Stop 무접촉: 코드 변경 0 · DB 삭제/이동/write 0 · raw row dump 0(schema/count) · guard 변경 0 · 테스트 변경 0 · prod DB 0 · live 0 · main merge 0 · 실 secret 0.
> 근거(local·read-only): reachability audit(`d87b601`·CASE A) · memory.db inventory(`dc05bda`) · brain.py·schema PRAGMA · Option B contract(`1e24c33`).

---

## 1. Fact
- reachability audit CASE A: memory.db = **SIASIU-native service-local memory**(live via ancillary routes)·상담 answer는 Foundation-only retire. → **정식화(Option B contract) + Foundation clean zone 밖 물리 이전**(소유권 이전 아님).
- ★본 문서 = 계획. 코드/DB 변경·이전·contract 배선은 각 별도 Leo 승인(설계-first §2.6).

## 2. memory.db schema inventory (expanded·raw row dump 0)
| table | rows | columns | 성격 |
|---|---|---|---|
| user | 3 | user_id(PK)·name·created_at | legacy brain·고객 식별 |
| episode | 30 | id(PK)·user_id·ts·role·text | legacy·conversation turns |
| memory_fact | 1 | id(PK)·user_id·type·value·note·confidence·as_of·status·source_episode_id·created_at·updated_at·norm_value·fact_state | legacy·extracted facts(safety 포함) |
| fact_type_registry | 11 | type(PK)·label·is_safety·norm_aliases·status | legacy·fact-type 모델 |
| consent_record | 0 | consent_id(PK)·subject_ref·guest_ref·consent_scope·granted·granted_at·revoked_at | Memory V1 shadow(EXEC-1) |
| conversation_session | 0 | session_id(PK)·subject_ref·guest_ref·service_id·status·external_consult_ref·consent_scope·retention_policy·deleted·created_at | Memory V1 shadow |
| conversation_message | 0 | message_id(PK)·session_id·role·content_hash·pii_flags·deleted·created_at | Memory V1 shadow |
| customer_profile | 0 | subject_ref·guest_ref·profile_json·deleted | Memory V1 shadow |
| episode_summary | 0 | summary_id(PK)·subject_ref·guest_ref·summary_text·intent_types·risk_level·deleted·created_at | Memory V1 shadow |
| ltm_fact | 0 | fact_id(PK)·subject_ref·guest_ref·type·norm_value·fact_state·deleted·blocked·expired·is_safety·confidence·as_of·source_ref·consent_scope·retention_policy·sensitivity_level·created_at | Memory V1 shadow |
| memory_fact_candidate | 0 | candidate_id(PK)·subject_ref·guest_ref·type·norm_value·status·fact_state·gate_decision·confidence·source_ref·consent_scope·sensitivity_level·raw_text_stored·created_at | Memory V1 shadow |
| subject_ref_map | 0 | subject_ref(PK)·local_user_ref_hash·guest_ref·created_at·secret_version | Memory V1 shadow |
- **indexes**: `ux_ltm_active`(ltm_fact)·`ux_srm_furef_version`(subject_ref_map) — 둘 다 Memory V1 shadow. legacy 4테이블 = PK만(커스텀 index 0).
- **foreign keys**: **선언된 FK 0**(SQLite·brain.py는 user_id soft 참조). → 이전 시 FK 제약 재작성 불요.
- ★legacy 4(populated·34 rows) · Memory V1 shadow 8(empty). raw row 값 미열람.

## 3. brain.py dependency 분석
- **DB_PATH**: `DATA_DIR=os.path.join(ROOT,"data")`·`DB_PATH=os.path.join(DATA_DIR,"memory.db")` — ★**하드코딩**(env 미지원). 같은 DATA_DIR에 `ssbrain.sqlite`·`guardrail_log.jsonl`도.
- **함수**: `_conn`(sqlite3.connect DB_PATH)·`init_db`(CREATE user/episode/memory_fact/fact_type_registry)·`ensure_user`·`add_episode`·`recent_episodes`·`active_facts`·`recall_greeting`·`recos`·`pitch`.
- **route 연결(server.py)**: `/api/recall`→recall·`/api/reset`→reset·`/api/recos`→recos·`/api/checkins`→checkins·`/api/pitch`→pitch·boot `init_db`.
- ★**env로 DB path 분리 가능성**: 현재 불가(하드코딩) → **정식화 시 `DB_PATH = os.environ.get("SIASIU_MEMORY_DB_PATH") or <default>`로 env-configurable화**(소규모 코드 변경·별도 승인). 이것이 이전의 핵심 enabler.

## 4. Target path 후보 비교
| 후보 | app/data 밖? | 장단 |
|---|---|---|
| `app/memory_data/memory.db` | ✅(app/data 아님) | app-level·간단·다만 "memory_data"가 app/data와 혼동 여지 |
| `app/service_memory/memory.db` | ✅ | ★**service-local 의도 명확**·guard(app/data) 밖·추천 |
| `SIASIU/data/memory/memory.db` | ✅(repo-root data) | app/ 밖·repo-level 분리·단 app 코드에서 상대경로 |
| 기타: `app/siasiu_memory/memory.db` | ✅ | 서비스명 명시·service_memory와 유사 |
- ★**추천: `app/service_memory/memory.db`** — SIASIU service-local memory 의도 명확·Foundation-managed `app/data` clean zone 밖·`ssbrain.sqlite`/LMR과 물리 분리. (guard `verify_app_data_clean`은 `app/data`만 검사 → 통과.)

## 5. Memory V1 shadow 8 empty table 처리
- **성격**: EXEC-1(Leo 승인 M4 migration)이 legacy brain memory.db에 overlay한 **Option B/Memory V1 contract 테이블**(subject_ref_map·ltm_fact·candidate·consent 등). **전부 empty(row 0)**.
- **옵션 A(권고): 이전된 SIASIU service-local memory DB에 그대로 유지** — 이 8테이블이 곧 **SIASIU-local Memory V1 store**(Option B contract 대상). legacy 4 + Memory V1 8이 한 SIASIU service-local DB에 공존(둘 다 SIASIU 소유·정합). **EXEC-1 reversal 불요**·데이터 손실 0(empty).
- **옵션 B: dedicated Memory-V1 DB로 분리**(legacy brain 4 vs Memory V1 8 물리 분리) — 관심사 분리 원하면. 단 별도 DB 2개 관리.
- ★**데이터 손실 0 검증**: 8테이블 row=0(§2)·이전/유지/분리 어느 쪽도 데이터 손실 0. legacy 4(34 rows)는 **WAL-safe backup 선행 후 이전**(migration).
- ★EXEC-1 reversal 성격: EXEC-1은 additive(테이블 추가)·되돌림=drop(empty라 무손실)이나 **되돌림도 별도 승인**(Leo 승인 작업).

## 6. Option B formalization
- **brain.py 직접 수정 vs wrapper/adapter**: ★**wrapper/adapter 권고**(brain.py 대규모 rewrite 지양·수술식). 신규 `siasiu_service_memory` adapter가 brain.py 위에서 Option B contract 필드를 emit·brain.py는 storage engine 유지. (DB_PATH env화만 brain.py 소규모 수정.)
- **memory_context emit**: SIASIU가 Foundation에 **request-scoped memory_context**(subject_ref/guest_ref·facts refs·consent_scope·retention_policy·privacy_level·safety flags) 전달 → Foundation validate/gate/reasoning.
- **memory_reuse_decision emit**: Foundation이 memory_reuse_decision(allowed/blocked/expired/deleted/consent_required/not_available) 반환 → SIASIU service-local 저장/재사용 결정.
- **fields**: subject_ref(service-local mint·Option B)·guest_ref·consent(scope/granted)·retention_policy·privacy/sensitivity_level·raw_text_stored=False. (Memory V1 shadow schema가 이미 이 필드 보유·§2.)
- ★**Foundation에는 minimized request-scoped memory_context만**: raw episode text/PII 미전송(hash/summary/refs만)·durable 저장 0(Foundation은 판단만·Option B).

## 7. Cosmile logical contract alignment
- ★**같은 physical sqlite 파일 공유 금지**: SIASIU는 자기 service-local memory.db(이전본)·Cosmile은 자기 Prisma commerce memory(`20260705060544_memory_v1_additive`). **물리 파일 공유 = repo/service 경계 위반**.
- ★**같은 logical memory contract 공유**: 양 서비스가 **하나의 Foundation memory_context contract**(동일 필드/gate/decision)를 따르고 Foundation이 validate/gate. 구현체(sqlite vs Prisma)는 per-service.
- Cosmile은 Prisma/commerce memory 구조 유지(de-anon·overlay·SubjectRefMap)·별도 gate.

## 8. 실행 순서 (각 별도 Leo 승인·설계-first)
1. **설계자료/ design-first 문서**(§2.6): SIASIU service-local memory + Option B contract 배선 설계.
2. **brain.py DB_PATH env화**(소규모 코드·별도 승인).
3. **memory.db 이전**(WAL-safe backup → `app/service_memory/memory.db`(권고) → env 지정 → 검증·34 rows 보존·count/checksum). ★prod 아님·dev/local.
4. **Option B adapter**(memory_context/reuse_decision emit·wrapper).
5. **Cosmile logical contract 정합**(별도).
- ★모든 코드/DB/이전 = 별도 승인. 본 plan은 이전/코드 미수행.

## 9. What must not be changed (이번)
- memory.db 삭제/이동/수정 0(read-only plan)·guard 완화 0·brain.py/server.py/answer.py 코드 0·fingerprint `d7f579443f8a110a` 무변경·테스트/skip/snapshot 0·34 rows 고객 memory 보존.

## 무결성
Relocation & Option B formalization **plan** only · 코드 변경 0 · DB 삭제/이동/write 0 · raw row dump 0(schema/count) · guard 변경 0 · 테스트 변경 0 · 실 secret 0 · prod DB 0 · live 0 · **main merge 0**(fnd 580093c·siasiu 3cd068d·cosmile 3ba91e0) · Cosmile physical 공유 0(logical contract만) · 본 plan만 foundation-docs commit/push · **이전/코드/contract 배선은 각 별도 Leo 승인(설계-first).**
