# Fable5 DESIGN_REVIEW Re-Review Result — Phase 2A Preflight Plan (F-1/F-2/F-3 패치)

> Pass: **DESIGN_REVIEW(재검수)** · Actor: Fable5 Reviewer — **NEEDS_PATCH를 낸 동일 세션** · Date: 2026-07-10 · Return to: **Advisor**.
> Skill: `/fable-sentinel` 직접 적용. 준수: DB 접속 0 · secret 값 0 · query/migration 실행 0 · patch 0 · repo 수정 0 · 새 세션/sub-agent 0.
> 방법: Worker/Advisor 요약 불신 — 실 diff `9e9ad28..453b6c9` 전문 판독·checksum 상수 로컬 재계산·mirror cmp·fd `415436b` 검증.

---

## 1. Verdict: **PASS**

- **DESIGN_PACKAGE_QUALITY: PASS** — 원 지적 3건 전부 CLOSED(아래 항목별). 잔여는 LOW 2건뿐이며 수용에 별도 결정 불요.
- **PHASE2A_EXECUTION_READINESS: HOLD 유지(변동 없음)** — 패치는 검출 정밀성만 다뤘고 identity/read-only 미증명 상태는 그대로. 계획의 Option C(HOLD) 권고 계속 동의.
- ★**설계 PASS는 Phase 2A 실행 승인이 아니다 — 실행 상태 `NOT_APPROVED` 유지.**

## 2. 고정 재검수 질문 3건 — 항목별 판정

### F-1 (C-2 정확 형상) — **CLOSED**
신규 C-2 = pg_index 계열 catalog 조회·**WHERE에 정확 index명** + 8-boolean(name/unique/valid/ready/non-partial/non-expression/indnkeyatts=1/key column). handoff가 요구한 변형 시나리오 전수 추론 검증:
| 변형 | 결과 |
|---|---|
| renamed | WHERE 필터 → 0행 → `D_O1_INDEX_ABSENT_STOP` ✓ |
| composite (orderItemId, X) | indnkeyatts=2 → FALSE → SHAPE_MISMATCH ✓ |
| partial | indpred NOT NULL → FALSE ✓ |
| expression | indexprs NOT NULL → FALSE (+indkey[0]=0이면 attname JOIN이 NULL — "all eight TRUE"에만 OK를 주는 해석 규칙이라 NULL도 탈락 ✓) |
| invalid / not-ready | indisvalid/indisready → FALSE ✓ |
| wrong column | attname 불일치 → FALSE ✓ |
**명시 판정(handoff 요구)**: `indnkeyatts = 1`은 **검증 대상 불변식(orderItemId 유일성)에 충분**하다 — 잔여 blind spot은 동명 index가 INCLUDE 컬럼(indnkeyatts=1·indnatts>1)으로 재생성된 경우 8-boolean 전부 TRUE로 통과하는 것인데, INCLUDE는 **uniqueness 의미를 보존**하므로 불변식 검증 목적상 무해. 완전 형상 일치까지 원하면 `(ix.indnatts = 1)` 9번째 boolean 1줄이 선택 개선(잔여 R-1·비차단).

### F-2 (C-3b drift 검출) — **CLOSED**
`COUNT(*) WHERE migration_name NOT IN (승인 3)` — surplus > 0 → `UNEXPECTED_MIGRATION_DRIFT_STOP`이고 **overall `MIGRATION_LEDGER_OK` 조건에 결합**(3건 APPLIED_MATCH ∧ drift=0)이라 silent pass 경로 없음. 이론 edge: ledger에 NULL name 행이 있으면 NOT IN이 NULL 평가로 미집계 — Prisma `_prisma_migrations.migration_name`은 NOT NULL이라 실질 무해(잔여 R-2·기록만).

### F-3 (상태 매핑·checksum) — **CLOSED**
7-상태 명시 표(PENDING/ROLLED_BACK_STOP/INCOMPLETE_STOP/CHECKSUM_DRIFT_STOP/APPLIED_MATCH/UNKNOWN_STOP/DRIFT_STOP)·조건 상호배타·rolled_back이 finished에 우선하는 순서 정확. **checksum 상수 3건 = 추적 migration.sql의 sha256 로컬 재계산과 3/3 정확 일치(본 검수 실측)**. Prisma checksum 가정은 "정규화가 다르면 실행 시점에 Prisma 알고리즘으로 재계산" fallback으로 적절히 헤지·비교는 in-query라 raw checksum 미출력(§9에 금지 명문 추가 확인).

## 3. 패치 무결성 (요약 불신·실물)

- Cosmile `453b6c9`: 단일 문서 +98/−28 — **scope 정확**(runtime/schema/migration 무접촉)·origin 조상 ✓
- fd `415436b`: origin/main 조상 ✓ · **mirror cmp = IDENTICAL** ✓
- 패치가 도입한 것: catalog/ledger SELECT 정밀화·상태 enum·출력 최소화 강화(§8/§9)·STOP 확장(§11에 SHAPE_MISMATCH/ROLLED_BACK/INCOMPLETE/CHECKSUM_DRIFT/DRIFT 추가) — **DB 접근·secret·write 경로·Phase 2B 확장 0** ✓ status 헤더도 정직(`…PATCHED_AFTER_FABLE5_NEEDS_PATCH_PENDING_REREVIEW`)

## 4. Unresolved risks (전부 비차단)

| # | 심각도 | 내용 |
|---|---|---|
| R-1 | LOW | C-2 INCLUDE-variant blind spot(위 F-1) — uniqueness 보존이라 무해·`indnatts=1` 1줄 선택 개선 |
| R-2 | LOW(이론) | C-3b NULL name edge — Prisma NOT NULL이라 실질 무해 |
| (유지) | — | 실행 선결 전부 미해결(identity·read-only role·secret 경로·.env 664) — **설계가 아니라 실행 게이트의 몫**(Option C) |

## 5. Excluded scope / 확인 안 된 것

실행·실 대상 DB 상태(의도적)·secret 값(금지)·Prisma checksum 알고리즘의 실제 동작(실행 시 검증 항목으로 이연 — 계획이 자체 헤지)·IMPLEMENTATION_REVIEW(실행 후 별도).

## 6. Verdict rationale

세 지적이 전부 **자구가 아니라 메커니즘으로** 닫혔고(정확 명칭+형상 boolean·drift 카운트·명시 상태 기계), 검증 가능한 주장(checksum 상수)은 본 검수가 직접 재계산해 일치를 확인했다. 잔여 2건은 수용 결정이 불필요한 수준 — V2 PASS 정의("다음 승인 게이트 전 수용 필요한 미해결 리스크 없음") 충족.

## 7. Routing

Both-conclusion: DESIGN PASS + EXECUTION HOLD → Advisor 취합 → **Leo/GPT의 Phase 2A 선결 필드 결정**(exact target identity·non-prod attestation·read-only role·secret 경로·option A/B/C)이 다음 게이트. 설계 재검수 루프는 종료.

RETURN_TO: Advisor
