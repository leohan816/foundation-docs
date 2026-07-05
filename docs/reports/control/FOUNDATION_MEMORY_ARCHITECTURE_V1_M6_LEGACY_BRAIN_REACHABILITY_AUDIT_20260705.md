# Memory V1 — M6 Legacy Brain Runtime Reachability Audit (read-only)

> 작성: foundation-control(Control) · 2026-07-05 · **범위: `brain.py`/`memory.db` runtime reachability·provenance·ownership read-only audit.**
> ★Hard Stop 무접촉: 코드/DB/guard/test 변경 0 · memory.db 삭제/이동/수정 0 · raw row dump 0(schema/count만) · prod DB 0 · live 0 · main merge 0 · 실 secret 0.
> 근거(local·read-only·직접 검증): server.py·provider_flag·brain.py·FOUNDATION guards·git·import 추적.

---

## 1. Fact (경로 정정·확정)
- ★`brain.py` = **SIASIU에만** 존재(`/home/leo/Project/SIASIU/app/brain.py`·87KB·mtime 2026-06-27). **`FOUNDATION/app/brain.py` 없음**·`FOUNDATION/app/data/memory.db` 없음.
- ★`memory.db` = **SIASIU에만**(`SIASIU/app/data/memory.db`). `FOUNDATION/foundation/brain/`는 **별개**(Brain Runtime/LMR·sqlite/memory.db 0).
- ★header(brain.py:2-3): "SIASIU — 메모리 엔진(brain)·의존성 0(stdlib)·정본: 설계문서/SIASIU_메모리_설계서.md v1.2". → **SIASIU-native**(Foundation 복사본 아님).

## 2. Runtime entrypoints
- `app/server.py` = 유일 HTTP entrypoint·**`ThreadingHTTPServer` bind `127.0.0.1`**·PORT 8000·`__main__` "SIASIU demo → http://localhost". ★**Procfile/Dockerfile/gunicorn/systemd/wsgi 없음**(find 0) → **localhost demo/dev**·prod launcher 아님. CLAUDE.md baseline(applied_to_real_user=false·write=false)과 정합.

## 3. FOUNDATION reachability — **NO**(강한 근거)
- FOUNDATION(-core·`foundation.*`)은 brain.py/memory.db를 **명시적으로 금지**: `memory_trust_shadow_runtime.py:12` `FORBIDDEN_IMPORTS=("answer","brain","memory.db",...)` · `learning_approval_workflow.py:91` `RuntimeError("REFUSED: memory.db/ssbrain.sqlite 금지")` · `foundation_file_intake.py:21` "memory.db/ssbrain.sqlite ... 금지" · `shared_memory/store.py` in-memory only. → **FOUNDATION runtime이 memory.db 접촉 = 0**(오히려 refuse).

## 4. SIASIU reachability — LIVE vs vestigial (핵심)
- ★**상담 answer 경로 = memory.db 무접촉(Foundation-only):** `/api/chat`는 `PF.consultation_provider()=="legacy_dev_only"`(★dev 게이트·`SIASIU_DEV_LEGACY_CONSULT=1` 명시일 때만)일 때만 brain.chat·**기본=`foundation_contract`→`CVF.consult`**(Foundation). answer.py(fingerprint `d7f579443f8a110a`)는 `brain._llm`/`verify_output`(LLM helper·memory.db 무접촉)만. → 상담 answer는 **CUTOVER-01로 retire**(brain 소스는 삭제 안 함).
- ★**단 ancillary(비-상담) 라우트가 memory.db LIVE 참조:** `GET /api/recall`→`brain.recall`(init_db+ensure_user+active_facts+recent_episodes·**read**) · `POST /api/reset`→`brain.reset`(DELETE episode/memory_fact·**write**) · `/api/recos`·`/api/checkins`·`/api/pitch`→init_db+ensure_user(touch) · `server.py:206` boot `brain.init_db()`.
- ★**Verdict:** memory.db는 **dead 아님** — SIASIU 재진입 인사·memory reset·checkin·pitch·recos가 brain.py→memory.db를 **demo server에서 live 참조**. 단 "상담 답변"은 Foundation-only로 이전됨.

## 5. Cosmile reachability — **NO**(근거)
- Cosmile(TS/Next.js)은 brain.py/memory.db Python 참조 **0**. Cosmile은 **자체 별도 memory**(`foundation-memory-deanon.mjs`·Prisma `20260705060544_memory_v1_additive`·`api/slice/memory`). SIASIU와 **공유 파일 없음**·무관.

## 6. Provenance hypothesis (evidence 기반·단정 아님)
- ★brain.py = **SIASIU-native memory + LLM orchestration engine**(Foundation 복사본 아님): 자체 설계서 v1.2·stdlib-only·자체 schema(episode/memory_fact/fact_type_registry). "봄(Bom)" 참조는 **sub-part 알고리즘 적응**(clir.detect_lang·source_router·answer.answer)이지 wholesale 복사 아님.
- git: `app/brain.py` 최초 = `8228d5e`(2026-06-23·"구조 재배치(COSMILE식)"·repo restructure)·파일은 그 이전부터 존재. Foundation memory arc(shadow/Memory-V1)는 **이후**.
- **가설:** brain.py는 Foundation memory arc보다 **오래됨(legacy in age)**·그러나 **SIASIU 자체 service-local customer-memory 코드**(외부/Foundation 복사 아님). 8 empty Memory-V1 shadow 테이블은 나중에 EXEC-1로 overlay.

## 7. Data ownership analysis (schema/count only·raw 0)
- `user`(3·user_id/name)·`episode`(30·conversation turns text)·`memory_fact`(1·extracted facts incl. safety allergy/avoid/pregnancy)·`fact_type_registry`(11·canonical fact-type model) + 8 empty shadow.
- ★**Owner = SIASIU**(service-local customer-conversation memory·vertical 고객 데이터). Foundation-owned 아님(도메인 무관 core 아님)·순수 legacy-archive 아님(§4 live 참조). Foundation guard가 memory.db를 **app/data clean zone에 속하지 않음**으로 취급.

## 8. Option B conflict analysis
- Option B(Foundation=memory_context validation/gate/reasoning only·SIASIU/Cosmile=service-local memory DB) 기준: brain.py/memory.db는 **이미 사실상 "SIASIU service-local memory"**·단 아직 Option B 논리 계약(memory_context·memory_reuse_decision emit) 미표현 → **원칙 충돌 없음**·자연스러운 SIASIU-side store.
- **실 마찰**: (a) memory.db가 `ssbrain.sqlite` 옆 app/data에 물리 공존 → Foundation file-intake guard가 clean(ssbrain-only) 원함 → **이전/clean-zone 이슈** (b) Foundation memory 계약 필드 미emit (c) Cosmile은 자체 Prisma memory.
- ★**공유는 LOGICAL contract이지 PHYSICAL file 아님**: SIASIU는 memory.db 유지·Cosmile은 Prisma memory 유지·둘 다 **하나의 Foundation memory contract**를 따르고 Foundation이 validate/gate. 물리 공유 파일 = repo/service 경계 위반.

## 9. Recommendation — **CASE A**(refinement 포함·confidence: high)
- ★**NOT CASE B(dead legacy copy)**: 반증됨 — recall/reset/checkins/pitch/recos live handler가 memory.db touch(§4). 상담 answer만 retire.
- ★**NOT CASE C(Foundation-demo-only)**: 반증됨 — FOUNDATION은 refuse(§3)·touch 주체는 SIASIU server.
- ★**CASE A**: SIASIU가 memory.db를 live 참조(ancillary routes + legacy_dev_only brain.chat). → 조치 = **SIASIU service-local memory module을 Option B contract로 정식화** + **Cosmile은 동일 logical contract(동일 file 아님)**.
- ★**refinement(중요):** brain.py는 **이미 SIASIU 소유**(native·복사 아님) → "이관"은 **소유권 이전이 아니라 contract 채택 + Foundation clean zone 밖 물리 이전**. (상담 answer retire는 CUTOVER-01로 근거 확실.)

## 10. Required Leo decision
1. **server.py 배포 상태**: 127.0.0.1 "demo"·in-repo Procfile/systemd 없음 → control read-only로 **실 배포/서빙 여부 판단 불가**(Leo/ops fact). "live-referenced"=active entrypoint 배선(baseline applied_to_real_user=false)이나 실 배포 여부는 Leo 확인.
2. **legacy_dev_only `brain.chat` full-memory 경로 운명**: dev-only 유지 vs Option B SIASIU-local memory 후 제거.
3. **물리 이전 결정**: memory.db를 SIASIU-owned memory dir(Foundation clean zone 밖)로 이전 여부·EXEC-1 8 empty shadow가 SIASIU-local Memory-V1 target인지.
4. **Option B contract 배선**: SIASIU memory_reuse_decision/memory_context emit 주체(brain.py adapter vs 신규 SIASIU wrapper) = **설계자료/ design-first 문서**(§2.6) 후 코드 변경.

## 11. What must not be changed
- ★memory.db **삭제/이동/수정 0**(read-only·§4 고객 데이터·34 rows 보존).
- ★guard(FORBIDDEN_IMPORTS·verify_app_data_clean·REFUSED) 완화 0.
- ★brain.py/answer.py/server.py 코드 0(이번)·answer.py fingerprint `d7f579443f8a110a` 무변경.
- ★테스트 기대값/skip/snapshot 0.
- ★34 rows 고객 memory(episode/name/safety facts) 보존(향후 migration 시 WAL-safe backup).

## 무결성
Legacy brain reachability audit(read-only) · 코드/DB/guard/test 변경 0 · memory.db 삭제/이동/수정 0 · raw row dump 0(schema/count) · 실 secret 0 · prod DB 0 · live 0 · **main merge 0**(fnd 580093c·siasiu 3cd068d·cosmile 3ba91e0) · CASE A(SIASIU-native·live via ancillary·소유권 이전 아님·contract 채택+이전) · 본 audit만 foundation-docs commit/push · **정식화/이전/코드/설계는 각 별도 Leo 승인(설계-first).**
