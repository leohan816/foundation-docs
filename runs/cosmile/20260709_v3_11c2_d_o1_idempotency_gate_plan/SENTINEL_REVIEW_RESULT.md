# Sentinel Review Result — V3-11C2-D-O1 Idempotency Hardening (FULL_ORDER_ITEM_UNIQUE)

> Actor: **Sentinel** (fable5 Sentinel 세션) · Target: Cosmile · Date: 2026-07-09 · Return to: **Advisor** (최종 승인 아님).
> Skill: `/fable-sentinel` — 미설치 상태라 `/home/leo/Project/skill/fable-sentinel/` references 직접 적용.
> Read-only 준수: runtime 수정/stage/commit/push 0 · prod/live/main/secret 0 · **DB rehearsal은 일회용(ephemeral) postgres 컨테이너(`docker run --rm`·host 포트 미공개·앱/dev DB 무접촉)에서만 수행** · 종료 후 컨테이너 잔재 0 확인.

---

## 1. Verdict: **PASS**

D-O1 구현은 brief와 정합하고, **특별 요구였던 non-prod DB rehearsal을 Sentinel이 직접 실행해 중복 거부를 포함한 전 항목을 실증**했다(Worker SKIP 해소). 단 PASS는 **이 batch의 정합 판정**이며 flag-ON 승인이 아니다 — flag-ON 전 선결 3건을 §8에 명시(runtime commit 라우팅 · 실 대상 DB에서의 migration deploy+preflight · 사전 존재 sqlite migration dir 정리).

## 2. Findings (심각도순)

| # | 심각도 | 발견 | 근거 |
|---|---|---|---|
| F-1 | LOW | **수동(비트랜잭션) 적용 시 부분 상태 가능** — migration.sql이 `DROP INDEX` 후 `CREATE UNIQUE` 순서라, 중복 존재로 CREATE가 실패하면 lookup index까지 사라진 중간 상태가 남는다(R7c에서 실증·psql 자동커밋). prisma migrate deploy는 트랜잭션 래핑이라 실배포 경로는 안전 — **수동 적용 절차에는 BEGIN/COMMIT 명시 권장**(migration.sql 주석 1줄) | R7c 출력: idx drop 성공 후 `could not create unique index … (oi1) is duplicated` |
| F-2 | INFO(사전 존재·이월 재확인) | **`20260624181637_commerce_intelligence`(sqlite 문법)가 활성 migrations/에 잔존** — fresh `prisma migrate deploy`는 이 지점에서 깨짐. `git log`로 HEAD 사전 존재 확인(D-O1 batch 무접촉·archived 2건은 별개 dir). V1 이월 #1이 여전히 open — **실 deploy/flag-ON 전 정리 필수** | `git ls-tree caba8c6` 목록·`migrations_legacy_sqlite/`엔 20260705 2건만 |
| F-3 | INFO | P2002 광폭 매핑(모든 P2002→duplicate)은 Worker 자진 신고대로 수용 가능 — RecOutcomeEvent의 유일 의미 unique가 orderItemId이고, TC11이 비-P2002→write_failed 오분류 방지를 검증 | service:42-43·TC11 2케이스 재현 |

## 3. Files inspected

- 실물: `schema.prisma` diff(`@@index`→`@@unique([orderItemId])`·`@@index([recommendationId])` 보존) · D-O1 `migration.sql`/`down.sql` 전문 · `recOutcomeEventService.ts`(isUniqueConflict·P2002→duplicate·기존 fast-path 유지 :72,94-95) · `v3_11c2_rec_outcome.vitest.ts` TC11 · `v3_11b_db_integration.dbtest.py` diff(oi2·DB3c/3d/3e) · V3-11B migration(CHECK/FK 대조)
- 기준: 02_WORKER_BRIEF·03_SENTINEL_REVIEW_BRIEF·07_HANDOFF·WORKER_RESULT·11_POINTER·Cosmile CLAUDE.md·RUN/RESULT_REPORTING_PROTOCOL

## 4. Diff scope result — **PASS** (출력 원문 기반)

branch `shadow/m4-cosmile-memory`·HEAD `caba8c6`(main/prod 아님). D-O1 변경 = schema.prisma·신규 migration dir·service·dbtest·vitest — **전부 brief 허용 목록 내**. `mock-complete/route.ts`·`ids.ts`의 M 상태는 **이전 C2 MVI batch 잔존분**(D-O1 diff 아님 — Worker 신고와 일치). SIASIU/fc/adapters/foundation lib/checkout.ts 무접촉. runtime 미커밋 유지.

## 5. Tests inspected/rerun — 전건 재현 (원문)

| 실행 | 결과 |
|---|---|
| `prisma validate` | valid 🚀 (dummy env·DB 무연결) |
| vitest c2 | **15 passed** (TC11 race→duplicate·비-P2002→write_failed 포함) |
| vitest c(회귀) | **10 passed** |
| vitest v3_11(회귀) | **43 passed** |
| eslint(service+vitest) | 0 problems·exit 0 |

테스트 의미: TC11이 양방향(오분류 방지까지) — 약화/조작 흔적 0. dbtest 변경도 기대 변경 사유(D-O1 의도 변경) 명시 — brief의 "기존 테스트 의미 변경은 D-O1 의도" 조건과 일치.

## 6. ★DB Rehearsal — Sentinel 직접 실행 (Worker SKIP 해소·전 항목 실증)

방법: `postgres:16-alpine` 일회용 컨테이너(`--rm`·포트 미공개·exec 내부 psql만) → `init_postgres` → `v3_11b` → `D-O1` 순 적용(**20260624 sqlite dir은 문법상 미적용·skip — F-2**) → synthetic seed(Order/OrderItem×3/RecommendationEvent·PII 0).

| 체크 | 결과 (출력 원문 요지) |
|---|---|
| R1 base+V3-11B 후 D-O1 적용 | **PASS** — clean apply |
| R2 duplicate `orderItemId` insert | **PASS — 거부**: `duplicate key value violates unique constraint "RecOutcomeEvent_orderItemId_key"` |
| R3 distinct `orderItemId` + direct(recId set) | **PASS — 수락** |
| R4 R-K2: organic/unattributed/unknown + recId | **PASS — 3건 전부 `rk2_chk` 거부**(V3-11B CHECK 보존 실증) |
| R6 duplicate preflight | **PASS — 사전/사후 모두 0** |
| R7 rollback 왕복 | **PASS** — down.sql 적용 후 중복 허용(비unique 복원 증명) → 중복 존재 상태 재적용 **실패**(`(oi1) is duplicated`) = **preflight STOP 필요성 실증** |

XOR CHECK는 V3-11B 기존 제약(R2a/R3의 단일 ref insert 성공이 간접 확인)·attrMode CHECK는 R4 입력이 통과한 5값 내였음. 종료: 컨테이너 잔재 0(원문 확인).

## 7. Worker report claims — 독립 검증 선언

핵심 주장 전건을 실물로 재검증 — 일치: 변경 파일 6종·schema/migration 내용·15/15·10/10·43/43·validate·eslint 0·flag OFF 유지(`==="1"` 무변경)·runtime 미커밋·금지 영역 무접촉·자진 신고 리스크(P2002 폭·rollback 한계·semantics 동결). **Worker가 SKIP으로 정직 신고한 DB rehearsal을 본 검수가 실행해 닫음** — "SKIP을 PASS로 쓰지 않은" 보고 규율 확인. 불일치 0.

## 8. Residual risks / flag-ON 선결 (Advisor 라우팅)

1. **runtime 미커밋** — C2 MVI+D-O1 diff가 함께 uncommitted. commit 라우팅은 Advisor/Leo 소관.
2. **실 대상 DB 미적용** — rehearsal은 ephemeral에서 실증. 실제 운영 대상(비prod 포함)에는 deploy+`preflight=0` 확인이 각각 필요(F-1의 트랜잭션 권장 포함).
3. **F-2 sqlite migration dir 정리 없이는 fresh `migrate deploy` 자체가 깨짐** — D-O1 밖·기존 이월.
4. refund/cancel 별도 행 요구 시 unique 재설계 필요(Worker 신고·승인된 D-O1 한계).

## 9. 자기검수 절 (Sentinel 6규칙)

- 상태 주장 전부 명령 출력 원문 첨부(§4~6). 이번 diff에 대한 sentinel 절차 적용: provenance(Worker 주장-실물 대조)·contract(CHECK/FK 보존을 rehearsal로 실증)·test-meaning(TC11 양방향).
- 자기 적발 2건: ① 1차 rehearsal에서 postgres 초기화 레이스 + ULID 25자 오류로 실패 → 컨테이너 재기동·26자로 정정 후 클린 재실행(1차 실패 출력도 기록 유지) ② R7d(정리 단계)는 내 명령 순서 오류로 잡음 발생 — 검증 가치 무영향·F-1 발견의 계기가 됨.
- 확인 안 된 것: docker volume 사전 카운트 미채집 — 본 run의 익명 volume 잔존 여부 **확인 안 됨**(`--rm` 사용·컨테이너 잔재 0은 확인) · 실 운영 대상 DB 상태(의도적 미접근).

## 무결성

read-only(runtime) 준수 · rehearsal은 ephemeral 전용·앱 dev.db/운영 DB 무접촉 · 본 결과/포인터만 foundation-docs commit/push · flag-ON/live 승인 아님 — **Advisor 반환**.
