# Memory V1 — P-a / P-b / P-c Closure Package

> 작성: foundation-control(Control) · 2026-07-04 · **상태: P-a 실행 결과 보고 + P-b/P-c 설계(적용 0).**
> ★금지 준수: main branch 변경 0 · **main merge 0** · deploy 0 · DB migration 0 · prod DB 접근 0 · raw/PII/secret 열람 0 · 실 데이터 pre-scan 실행 0 · repair 적용 0 · live 배선 0 · hard reject 0.
> ★이 문서 = EXEC-1 실 migration 승인·실 데이터 pre-scan 승인·repair 적용 승인·live/hard reject/prod secret/backfill/main merge 승인 **아님.**
> 근거: M6 roadmap(GitHub main `315d777`)·EXEC-1 prerequisites·EXEC-0 result.

---

## P-a — Shadow Branch 원격검증 경로 (★push 완료·main merge 금지)
Leo 승인 = shadow branch **remote push only**(main 변경/merge 금지). 3개 shadow 브랜치를 원격 push해 **GitHub 검증 가능**으로 전환.

| repo | shadow branch | commit | changed files (main..shadow) | remote main | 검증 |
|---|---|---|---|---|---|
| foundation-control | `shadow/m5-ingress-gate` | **`1c79943`** | `foundation_http_service/ingress_gate.py` · `tests/test_ingress_gate.py` | `21b05e1` **unchanged** | ✅ remote 존재 |
| SIASIU | `shadow/m4-siasiu-memory` | **`ab0937b`** | `foundation_memory_candidate_adapter.py` · `foundation_memory_schema_shadow.py` · `test_foundation_memory_schema_shadow.py` · `test_siasiu_memory_candidate_adapter.py` | `be88fb5` **unchanged** | ✅ remote 존재 |
| Cosmile | `shadow/m4-cosmile-memory` | **`78678ed`** | `app/prisma/schema.prisma` · `app/scripts/foundation-memory-deanon.mjs` · `foundation-memory-deanon.test.mjs` | `f71c726` **unchanged** | ✅ remote 존재 |

- **P-a 조건 준수:** ① shadow branch push only ✅ ② main branch 변경 0 ✅(3 repo remote main 해시 push 전후 동일) ③ **main merge 0** ✅ ④ deploy 0 ✅ ⑤ DB migration 0 ✅ ⑥ prod DB 접근 0 ✅ ⑦ raw/PII/secret 열람 0 ✅.
- **검증 방법(Leo/Fable5·GitHub 원격 판독):**
  - `git fetch origin && git show origin/shadow/m5-ingress-gate:foundation_http_service/ingress_gate.py`(gate `1c79943`·retention 정본·F-1/F-2/R-1/R-2·value-level strip)
  - `git show origin/shadow/m4-siasiu-memory:app/ssbrain/foundation_memory_schema_shadow.py`(candidate status `candidate|approved|rejected` CHECK·SAFETY∩SINGLE·subject_key COALESCE)
  - `git show origin/shadow/m4-cosmile-memory:app/prisma/schema.prisma`(overlay 5모델 개별 컬럼·candidate default `candidate`·standalone CommerceMemory 부재)
- ★**watch-1 CLOSED 경로 확보:** shadow code가 GitHub 원격에서 직접 검증 가능(main merge 없이). 실제 판독·판정은 Leo/Fable5.

## P-b — Cosmile Candidate Status CHECK / App-level Validation 설계 (★적용 0)
정본 enum = `candidate | approved | rejected`(초기값 candidate). prisma는 CHECK를 emit하지 못하므로(default만 반영) 강제 경로 필요.

### 경로 비교
| 경로 | 강점 | 약점 | 집행 시점 |
|---|---|---|---|
| **(1) migration SQL(raw CHECK)** | DB-level 강제·결정론·raw write도 차단·SIASIU sqlite CHECK와 동형 | prisma migration `.sql` 수동 편집 필요·prisma가 CHECK를 model에서 재생성 안 함(drift 관리) | **EXEC-1 migration** |
| **(2) app-level validation** | 조기 reject·에러 메시지·비-DB 백엔드 확장 용이 | raw/직접 DB write는 우회 가능·코드 경로마다 적용 필요 | 서비스 write 경로 |

### ★권고: (1) migration SQL CHECK = primary + (2) app-level = defense-in-depth
- **primary(DB-level):** EXEC-1 Cosmile prisma migration `.sql`에 `CHECK (status IN ('candidate','approved','rejected'))`를 `MemoryFactCandidate` 생성문에 **수동 추가**(additive·기존 컬럼 무변경). ★prisma가 이후 migration에서 drift로 감지하지 않도록 migration 파일에 고정(문서화).
- **secondary(app-level):** Cosmile candidate write 경로에 status enum 검증(insert/update 전 reject)·early guard.
- ★**적용은 EXEC-1(별도 승인).** 지금은 설계·권고까지.

### 테스트 계획 (EXEC-1 disposable/실 검증 시)
- `candidate` 수락 · `approved` 수락 · `rejected` 수락 · **`pending` 거부** · **garbage 거부** · DEFAULT = `candidate`.
- migration SQL CHECK 적용 후 disposable DB에서 위 6케이스 검증(EXEC-0 SIASIU 9d와 동형)·raw 미출력.

## P-c — 실 데이터 Pre-scan 승인 설계 (★실행 0·별도 승인)
실 데이터의 off-contract/중복/tombstone 실건수는 synthetic(EXEC-0)로 미확정 → 실 데이터 pre-scan 필요. ★**조건 3(별도 승인)**·본 문서는 설계만.

### 원칙
- **count / aggregate / hash only** · raw value/PII/secret/raw identifier(customer_id·anonymous_id·trace_id) **SELECT/출력 0**.
- **backup 선행 필수**(WAL-safe·§M6-B §2)·pre-scan은 backup 후 read-only.
- 대상 = 실 memory.db(SIASIU)·dev.db(Cosmile) — ★**별도 승인 후에만 접근**·읽기 전용·수정 0.

### 승인 범위 (요청 시)
| 항목 | 범위 |
|---|---|
| 대상 DB | SIASIU memory.db · Cosmile dev.db (read-only·backup 후) |
| SQL | §M6-B §4(SIASIU `ltm_fact`·Cosmile `LongTermMemoryFact`/`MemoryFactCandidate` 확정 명칭) |
| 출력 | count/aggregate/hash·boolean만 (row 값·식별자 0) |
| 산출 | off-contract status/retention 실건수 · SINGLE 2-active · MULTI dup · subject_key NULL · tombstone · candidate 'pending' 실건수 |
| 수정 | **0**(pre-scan = read-only·repair 적용 아님) |

### STOP 조건 (실 pre-scan 중)
- raw value/PII/secret/raw identifier 출력 · DB write/수정 · backup 없이 접근 · prod DB 접근 · repair 적용 · migration 실행 → 즉시 STOP.

### 승인 분리
- 실 데이터 pre-scan **실행 = 별도 Leo 승인**(조건 3). PASS해도 repair 적용·실 migration은 **또 별도 승인**(EXEC-1).

## 무결성
main branch 변경 0 · **main merge 0** · deploy 0 · DB migration 0 · prod DB 접근 0 · raw/PII/secret 열람 0 · 실 데이터 pre-scan 실행 0 · repair 적용 0 · live 배선 0 · hard reject 0 · prod secret 0 · subject_ref backfill 0 · shadow branch push only(3 repo·main 전부 unchanged) · **EXEC-1·실 데이터 pre-scan·repair 적용·M6-C~H = 각 별도 Leo 승인** · 본 package만 foundation-docs commit/push.
