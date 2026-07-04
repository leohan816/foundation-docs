# Memory V1 — EXEC-1 진입 직전 단일 검수 Package (Fable5/Codex 1회)

> 작성: foundation-control(Control) · 2026-07-04 · **상태: 검수 PACKAGE (Fable5/Codex EXEC-1 직전 1회 검수용) · 실행 0.**
> ★**Fable5/Codex는 본 package 완성 후 1회만 호출**(작은 patch마다 반복 금지). 검수 = readiness/execution package **안전성 검수**이며, 실 migration/prod/live/hard reject **승인 아님.**
> ★금지(아직 승인 아님): 실 migration · 실 데이터 pre-scan 실행 · repair 적용 · prod DB 접근 · prod secret · live 배선 · hard reject · subject_ref backfill · **product repo main merge** · **schema code main merge**.
> 근거: P-a/P-b/P-c closure(GitHub main `9c277a6`)·M6 roadmap(`315d777`)·EXEC-1 prerequisites·EXEC-0 result·M4_MIGRATION_PLAN(+addendum).

---

## 1. P-a — Shadow Branch 검수 Manifest (★GitHub 원격 직접 판독 가능)
| repo (GitHub full name) | branch | commit (full) | 검수 파일 |
|---|---|---|---|
| **leohan816/foundation-control** | `shadow/m5-ingress-gate` | `1c7994392d22bbde4e55eed205a6cf464bfefbb4` | `foundation_http_service/ingress_gate.py` · `tests/test_ingress_gate.py` |
| **leohan816/siasiu** | `shadow/m4-siasiu-memory` | `ab0937bca99e02146e453b7e89c7251e23af66b1` | `app/ssbrain/foundation_memory_candidate_adapter.py` · `app/ssbrain/foundation_memory_schema_shadow.py` · `app/tests/test_foundation_memory_schema_shadow.py` · `app/tests/test_siasiu_memory_candidate_adapter.py` |
| **leohan816/Cosmile** | `shadow/m4-cosmile-memory` | `78678eddf7b789c8e7acece02c1b743fa8e8afdf` | `app/prisma/schema.prisma` · `app/scripts/foundation-memory-deanon.mjs` · `app/scripts/foundation-memory-deanon.test.mjs` |
- ★3 repo **main 무변경·미merge**(shadow branch push only) · remote main: foundation-control `21b05e1`·siasiu `be88fb5`·Cosmile `f71c726`.

## 2. Fable5/Codex 직접 판독 방법 (git show / GitHub path)
### git show (원격 fetch 후)
```
# foundation-control (gate: retention 정본·F-1/F-2/R-1/R-2·value-level strip)
git -C <foundation-control> fetch origin
git -C <foundation-control> show origin/shadow/m5-ingress-gate:foundation_http_service/ingress_gate.py
git -C <foundation-control> show origin/shadow/m5-ingress-gate:tests/test_ingress_gate.py
# SIASIU (candidate status candidate|approved|rejected CHECK·SAFETY∩SINGLE·subject_key COALESCE·B11 keyed HMAC)
git -C <SIASIU> fetch origin
git -C <SIASIU> show origin/shadow/m4-siasiu-memory:app/ssbrain/foundation_memory_schema_shadow.py
git -C <SIASIU> show origin/shadow/m4-siasiu-memory:app/ssbrain/foundation_memory_candidate_adapter.py
git -C <SIASIU> show origin/shadow/m4-siasiu-memory:app/tests/test_foundation_memory_schema_shadow.py
# Cosmile (overlay 5모델 개별 컬럼·candidate default candidate·standalone CommerceMemory 부재·de-anon same-row 0)
git -C <Cosmile> fetch origin
git -C <Cosmile> show origin/shadow/m4-cosmile-memory:app/prisma/schema.prisma
git -C <Cosmile> show origin/shadow/m4-cosmile-memory:app/scripts/foundation-memory-deanon.mjs
```
### GitHub blob path (웹 판독)
- `https://github.com/leohan816/foundation-control/blob/1c79943/foundation_http_service/ingress_gate.py`
- `https://github.com/leohan816/siasiu/blob/ab0937b/app/ssbrain/foundation_memory_schema_shadow.py`
- `https://github.com/leohan816/Cosmile/blob/78678ed/app/prisma/schema.prisma`
- ★**shadow code 직접 판독·판정은 Fable5/Codex**(Control은 경로 제공·판독 대행 아님). watch-1(코드 원격검증)은 이 판독으로 닫음.

## 3. P-b — Cosmile Candidate Status CHECK / App-level Validation 설계 + 테스트 계획 (★적용 0)
- 정본 enum = `candidate | approved | rejected`(초기값 candidate). prisma CHECK 미emit(default만 반영·GitHub `78678ed`에서 `@default("candidate")` 확인 가능).
- **권고:** (1) **migration SQL(raw CHECK) = primary**(DB-level·EXEC-1 Cosmile migration `.sql`에 `CHECK (status IN ('candidate','approved','rejected'))` 수동 추가·additive·drift 고정) + (2) **app-level validation = defense-in-depth**(write 경로 early reject).
- **테스트 계획(EXEC-1 disposable/실 검증):** `candidate`·`approved`·`rejected` 수락 · **`pending`·garbage 거부** · DEFAULT=`candidate` (SIASIU shadow 9d 동형·raw 미출력).
- ★**적용 = EXEC-1(별도 승인).** 지금은 설계·권고.

## 4. P-c — 실 데이터 Pre-scan 승인 범위 (★실행 0·별도 승인)
| 항목 | 범위 |
|---|---|
| 대상 | SIASIU `memory.db`·Cosmile `dev.db` — **read-only·backup 후·별도 승인 후에만 접근** |
| SQL | §M6-B §4(SIASIU `ltm_fact`·Cosmile `LongTermMemoryFact`/`MemoryFactCandidate` — EXEC-0 introspection 확정 명칭) |
| 출력 | **count/aggregate/hash/boolean만** · raw value/PII/secret/raw identifier(customer_id·anonymous_id·trace_id) SELECT/출력 **0** |
| 산출 | off-contract status/retention 실건수 · SINGLE 2-active · MULTI dup · subject_key NULL · tombstone · candidate `pending` 실건수 |
| 수정 | **0**(read-only·repair 적용 아님) · **backup 선행 필수** |
| STOP | raw 출력·DB write·backup 없이 접근·prod DB·repair 적용·migration → 즉시 STOP |
- ★실행 = **별도 Leo 승인**(조건 3)·PASS해도 repair 적용·실 migration = 또 별도 승인.

## 5. EXEC-1 Approval Package 초안 (★미요청·별도 gate)
| 요소 | 범위 | 조건 |
|---|---|---|
| 실 migration 범위 | additive(SIASIU status candidate CHECK·Cosmile overlay 개별 컬럼·**candidate CHECK(P-b)**·retention 정본) | additive only·reset/db push --accept-data-loss **금지** |
| WAL-safe backup | 실 대상·`.backup`/`VACUUM INTO`·integrity_check·count/checksum | prod 아님·raw 미출력·선행 필수 |
| 실 데이터 pre-scan | §M6-B §4(P-c) | aggregate/count/hash·raw 0 |
| deterministic repair 적용 | §M6-B §5 rule(SINGLE winner·MULTI dedupe·off-contract 매핑) | ★EXEC-1 내 별도 승인·must_not_reappear·tombstone 되살림 0·log count/hash/id만 |
| additive migration | prisma migrate deploy(Cosmile)·SIASIU DDL | 기존 컬럼/row 무변경 |
| index | partial-unique(subject_key active)·overlay index | repair 후 abort 0 |
| row count/checksum | 전후 일치·신규 additive expected | raw 미출력 |
| rollback rehearsal | backup restore→integrity→count→checksum | 실 결과·복구 검증 |
| PASS / FAIL·STOP | 위 충족 / integrity·손실·abort·rollback 실패·raw 노출·CHECK 미명시·tombstone 되살림·same-row 결합 | FAIL→backup 복원·STOP |

## 6. 금지사항 (★아직 승인 아님)
- **실 migration · 실 데이터 pre-scan 실행 · repair 적용 · prod DB 접근 · prod secret · live 배선 · hard reject · subject_ref backfill · product repo main merge · schema code main merge** = 전부 **NOT APPROVED**. 각 별도 gate·별도 Leo 승인.

## 7. ★Fable5/Codex 단일 검수 Prompt (EXEC-1 직전 1회)
```
[MEMORY V1 M6 — EXEC-1 진입 직전 단일 독립 검수(1회)]
판독 대상(GitHub 원격 직접):
 - foundation-docs main: 본 EXEC1_PRE_REVIEW_PACKAGE · P-a/P-b/P-c closure · M6 roadmap · EXEC-1 prerequisites · EXEC-0 result · NEW-1 · M6-B readiness · M4_MIGRATION_PLAN(+addendum)
 - shadow code(§2 git show / GitHub blob): leohan816/foundation-control@1c79943 · leohan816/siasiu@ab0937b · leohan816/Cosmile@78678ed
검수 관점(코드/DB 변경 0·재현 아님·판독+안전성):
 1. shadow code ↔ 계약(M2/M3 v1.2) field-level 정합:
    - gate: default-deny·enum 정본(ConditionCategory/last_refined_intent 11/retention session|short_ttl|standard_ttl|revocable)·value-level strip·compat·catalog 한글 예외·미배선
    - SIASIU: candidate status candidate|approved|rejected CHECK·SAFETY∩SINGLE active≤1·subject_key COALESCE·must_not_reappear·B11 keyed HMAC subj_v2_[:32]·answer.py 무변경
    - Cosmile: overlay 5모델(CommerceEvent/Cart/Order/Wishlist/AlertSubscription) 개별 컬럼·CartItem 제외·standalone CommerceMemory 부재·candidate default candidate·de-anon same-row 0/payload_refs
 2. P-a: shadow push only·main merge 0(remote main 무변경) 정직
 3. P-b: Cosmile candidate CHECK(migration SQL primary + app-level) 설계·테스트 계획 충분
 4. P-c: 실 데이터 pre-scan 승인 범위(count/hash only·raw 0·backup 선행·read-only·별도 승인) 안전
 5. EXEC-1 approval package(backup·pre-scan·repair 적용 조건·additive migration·index·checksum·rollback·PASS/FAIL/STOP) 충분·additive·reset/db push 금지
 6. 금지사항(실 migration·실 pre-scan·repair 적용·prod·prod secret·live·hard reject·backfill·main merge) 전부 미승인 분리
 7. local vs GitHub 검증 분리·과대표현 없음
판정: APPROVE(EXEC-1 execution 승인 요청 준비 완료) / PATCH_REQUIRED(구간 보완).
★이 검수 = package 안전성·계약정합 검수이며, 실 migration/prod/live/hard reject 승인 아님.
금지: 코드 수정·migration·repair 실행·DB 접근·raw/secret 열람·main merge·push(판독만).
```
- ★Control은 본 package 완성까지. **Fable5/Codex 호출은 Leo 판단**(EXEC-1 직전 1회).

## 무결성
검수 package 작성 only · 실행 0 · 실 migration 0 · 실 데이터 pre-scan 0 · repair 적용 0 · prod DB 접근 0 · prod secret 0 · subject_ref backfill 0 · live 배선 0 · hard reject 0 · **product repo main merge 0** · **schema code main merge 0**(shadow push only·main 무변경) · 실 DB 무접촉 · Fable5/Codex EXEC-1 직전 1회 · 본 package만 foundation-docs commit/push.
