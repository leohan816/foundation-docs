# Memory V1 — M6 SIASIU Service-Local Memory Option B Design (design-first)

> 작성: foundation-control(Control) · 2026-07-05 · **설계-first(§2.6): SIASIU legacy brain.py + memory.db를 Option B service-local memory contract로 정식화하는 설계. ★코드/DB 변경 0.**
> ★Hard Stop 무접촉: 코드 변경 0 · DB 삭제/이동/write 0 · raw row dump 0 · guard 변경 0 · 테스트 변경 0 · prod DB 0 · live 0 · main merge 0 · 실 secret 0.
> 근거(local·read-only): reachability audit(`d87b601`·CASE A) · relocation plan(`2473b40`) · Leo 결정(target=`app/service_memory/memory.db`·shadow 8 유지·Cosmile logical-only·Foundation minimized memory_context).

---

## 1. Fact (current state)
- `SIASIU/app/data/memory.db`(118KB·WAL·integrity ok): **legacy brain 4테이블 populated**(user 3·episode 30·memory_fact 1·fact_type_registry 11) + **Memory V1 shadow 8테이블 empty**(EXEC-1 overlay).
- brain.py = SIASIU-native memory engine(DB_PATH 하드코딩·index ux_ltm_active·ux_srm_furef_version·FK 0).
- **ancillary routes LIVE**: `/api/recall`·`/api/reset`·`/api/recos`·`/api/checkins`·`/api/pitch`·boot `init_db`가 brain→memory.db 참조.
- **상담 answer = Foundation-only retire**(CVF.consult·brain.chat는 `legacy_dev_only` 게이트·CUTOVER-01). answer.py fingerprint `d7f579443f8a110a`.
- ★현재 memory.db가 `app/data`에 있어 Foundation guard `verify_app_data_clean` 위반 → runner 83/89(h28·p07). Runner Meaning Audit(`6af9628`) 결론.

## 2. Target architecture
- **`SIASIU/app/service_memory/memory.db`**(Leo 확정): **SIASIU-owned service-local memory store**(Foundation clean zone `app/data` **밖**).
- **Memory V1 shadow 8테이블 = 동일 DB 내 유지**(Leo 확정·dedicated 분리 안 함·EXEC-1 reversal 안 함). legacy 4 + Memory V1 8이 한 SIASIU service-local DB에 공존(둘 다 SIASIU 소유).
- ★**`app/data` clean zone 복원**: memory.db가 `app/data`에서 사라짐 → guard `verify_app_data_clean` **통과** → runner **89/89 정당 복원**(테스트 조작 아니라 **실 invariant 위반 제거**·Runner Meaning Audit의 올바른 해결).
- Option B: **subject_ref/저장/SubjectRefMap = SIASIU service-local** · **Foundation = memory_context validate/gate/reasoning only**(durable 저장 0·service DB 미참조).

## 3. DB path policy
- ★신규 env **`SIASIU_MEMORY_DB_PATH`**(brain.py `DB_PATH = os.environ.get("SIASIU_MEMORY_DB_PATH") or <default>`).
- **default path**: `app/service_memory/memory.db`(env 미설정 시·dev/local fallback). ★prod는 배포 env가 지정.
- **dev/local fallback**: env 미설정 → default(app/service_memory)·`os.makedirs(exist_ok=True)`.
- **.env.example**: `SIASIU_MEMORY_DB_PATH=` (key + 설명만·값 0).
- ★**secret 아님 명시**: `SIASIU_MEMORY_DB_PATH`는 **파일 경로 설정**이지 secret 아님(guardrail의 secret 목록과 별개·값 노출 무해하나 관례상 env로 관리).

## 4. Migration design (설계·실행 별도 승인)
- **선행**: WAL-safe backup(`app/data/memory.db` → 백업)·`PRAGMA integrity_check`(원본·백업).
- **row counts before/after**: 12테이블 전부(legacy 34 + shadow 0)·이전 후 동일 확인. ★raw row dump 0(count/checksum만).
- **checksum**: 기존 컬럼 checksum before/after 일치(데이터 무변경).
- **이전 방법**: `app/service_memory/` 생성 → memory.db를 새 경로로 **복사(python sqlite3 `.backup` 또는 file copy·WAL-safe)** → integrity_check → SIASIU_MEMORY_DB_PATH 지정 → brain.py가 새 경로 read 확인 → routes 동작 확인.
- **app/data clean-zone 확인**: 이전 후 `verify_app_data_clean().ok == True`·memory_db_present False.
- **rollback**: 백업 복원 / env 원복 / 원 경로 유지. 부분실패 시 원 경로 memory.db 무변경(복사 방식이라 원본 보존).
- ★**old `app/data/memory.db` 처리(삭제) 시점 = 별도 승인**(복사 후 검증 완료·runner 89/89 확인 후 Leo 승인 시 원본 정리). 그 전까지 원본 보존.

## 5. Option B adapter design
- ★**brain.py 직접 대수술 금지**(수술식): DB_PATH env화(§3) 외 brain.py 로직 유지. Option B contract는 **신규 wrapper/adapter**(`siasiu_service_memory` 등)가 brain.py 위에서 담당.
- **memory_context emit**: SIASIU adapter가 brain 데이터(facts·refs·**raw episode text 아님**)로 **request-scoped memory_context** 구성 → Foundation에 validate/gate 요청.
  - fields: `subject_ref`(service-local mint·Option B)·`guest_ref`·`consent`(scope/granted)·`retention_policy`·`privacy/sensitivity_level`·`safety flags`·`raw_text_stored=False`. (Memory V1 shadow schema가 이미 보유.)
- **memory_reuse_decision consume**: Foundation이 반환한 decision(allowed/blocked/expired/deleted/consent_required/not_available)을 SIASIU adapter가 소비 → service-local 저장/재사용 결정.
- ★**Foundation에 raw episode text/PII 미전송**: hash/summary/refs만. Foundation durable 저장 0(판단만).
- ★subject_ref = SIASIU `SIASIU_SUBJECT_SECRET` service-local mint(Option B·adapter 이미 구현·shadow).

## 6. Route impact
| route | 현재 | 이전 후 |
|---|---|---|
| `/api/recall` | brain.recall(memory.db read) | 새 경로 read·동작 동일(경로만) |
| `/api/reset` | brain.reset(memory.db write) | 새 경로 write·동작 동일 |
| `/api/recos`·`/api/checkins`·`/api/pitch` | init_db+ensure_user | 새 경로·동작 동일 |
| boot `init_db` | app/data/memory.db 생성 | app/service_memory/memory.db 생성 |
| `legacy_dev_only brain.chat` | dev 게이트(SIASIU_DEV_LEGACY_CONSULT=1) | ★**운명 = Leo 결정**(dev-only 유지 vs Option B adapter 후 제거) |
- ★route 동작은 **DB 경로만** 바뀜(로직 무변경)·server.py는 brain.py 경유라 경로 자동 반영.

## 7. Testing plan
- **DB_PATH env화 test**: SIASIU_MEMORY_DB_PATH 설정/미설정(default)·경로 확인.
- **migration rehearsal test**: 백업→새 경로 복사→integrity_check→row count/checksum 일치→새 경로 read(disposable/copy·원본 무접촉).
- **route regression**: recall/reset/recos/checkins/pitch가 새 경로에서 동작(shadow/dev).
- **app/data clean-zone guard**: 이전 후 `verify_app_data_clean().ok==True`·h28/p07 pass·**runner 89/89**(정당·guard 완화 0).
- **회귀 유지**: fingerprint `d7f579443f8a110a`·integration 39/39·workflow 119/119·gate 57·Cosmile 무변경.
- ★**no skip/xfail·no expectation manipulation·no snapshot 조작**: runner 89/89는 **memory.db 이전(실 invariant 복원)**으로 달성·테스트 조작 아님.

## 8. Service boundary rules
- ★**SIASIU DB ↔ Cosmile DB physical 공유 금지**: SIASIU `app/service_memory/memory.db`(sqlite)·Cosmile Prisma commerce memory — **물리 파일 공유 0**.
- ★**Cosmile은 Prisma memory 유지**(de-anon·overlay·SubjectRefMap·별도 gate).
- ★**Foundation은 service DB direct read/write 금지**: Foundation은 SIASIU/Cosmile service-local DB 미참조·**minimized request-scoped memory_context만** validate/gate/reasoning·durable 저장 0.
- ★**공유 = logical memory contract만**(memory_context/reuse_decision 필드·gate)·구현체는 per-service.

## 9. Required Leo approvals (각 별도·설계-first 후)
1. 본 설계 승인.
2. **brain.py DB_PATH env화**(소규모 코드·shadow).
3. **memory.db 이전 execution**(백업·복사·검증·runner 89/89 확인·dev/local·prod 아님).
4. **old app/data/memory.db 정리**(이전 검증 후·별도 승인).
5. **Option B adapter**(memory_context/reuse_decision·wrapper).
6. **legacy_dev_only brain.chat 운명** 결정.
- ★prod 이전·live·main merge = 각 별도 Hard Stop.

## 10. What must not be changed (이번 설계 단계)
- memory.db 삭제/이동/수정 0(read-only 설계)·guard 완화 0·brain.py/server.py/answer.py 코드 0·fingerprint 무변경·테스트/skip/snapshot 0·**34 rows 고객 memory 보존**(이전 시 backup 선행)·Cosmile physical 공유 0·Foundation service DB 참조 0.

## 무결성
SIASIU service-local memory Option B **설계-first** 문서 · 코드 변경 0 · DB 삭제/이동/write 0 · raw row dump 0(schema/count) · guard 변경 0 · 테스트 변경 0 · 실 secret 0 · prod DB 0 · live 0 · **main merge 0**(fnd 580093c·siasiu 3cd068d·cosmile 3ba91e0) · Cosmile physical 공유 0(logical only) · Foundation service DB 참조 0 · runner 89/89는 실 invariant 복원(테스트 조작 0) · 본 설계만 foundation-docs commit/push · **DB_PATH env화·이전·adapter·정리는 각 별도 Leo 승인.**
