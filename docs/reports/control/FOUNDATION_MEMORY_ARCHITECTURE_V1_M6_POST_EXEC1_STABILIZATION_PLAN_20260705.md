# Memory V1 — Post-EXEC-1 Stabilization Plan

> 작성: foundation-control(Control) · 2026-07-05 · **상태: PLANNING / 계획 문서 only · 실행 0.**
> ★**이 문서는 계획 수립이며 실행이 아니다.** prisma 기록 동기화 실행 · app-level validation 구현 · repair · mapping · backfill · prod/live/hard reject/main merge = **Leo 별도 승인 전 금지·미수행.**
> 근거(GitHub 직접 확인): EXEC-1 execution result(`3cf0023`·PASS) · EXEC-1 gate approval package(`b7f99fd`) · compat-scrub follow-up(`02738a3`).

---

## 1. EXEC-1 PASS 요약
- **SIASIU `memory.db`(dev):** additive 신규 shadow 테이블 8개 CREATE + index · 기존 4테이블(episode/fact_type_registry/memory_fact/user) **count+checksum 무변경** · candidate CHECK `pending` reject 실증 · backup/integrity/rollback rehearsal PASS · pre-scan 전부 0(repair_applied=false).
- **Cosmile `dev.db`(dev):** additive DDL(destructive 0·ADD COLUMN 45·CREATE 8) · 기존 32테이블 **row count + 기존 컬럼 checksum 무변경** · overlay = 승인 5모델만(CartItem 무접촉) · candidate CHECK **raw SQL 삽입**·pending reject 실증 · prisma reset/db push 미사용 · rollback rehearsal PASS.
- **회귀 0:** gate 57/57 · runner 83/89(taxonomy {lmr 5, brain 1}·EXEC-1 전과 동일) · SIASIU 39/39·119/119·fingerprint 유지 · Cosmile 164/164·112/112·de-anon 14/14·prisma valid.
- **미수행(범위 밖):** 실 데이터 repair · mapping · backfill · prod/live/hard reject/main merge.

## 2. 남은 follow-up 3건 처리 계획
### FU-1. Cosmile 정식 Prisma migration 파일 생성 + `_prisma_migrations` 기록 동기화
- **배경:** EXEC-1은 reset 위험 회피 위해 additive SQL을 **직접 적용** → `_prisma_migrations`에 미기록 → 향후 prisma migrate가 drift 감지 가능.
- **계획(실행 아님):** ① `prisma migrate dev --create-only`로 migration 파일 생성(apply 안 함) ② migration `.sql`에 `MemoryFactCandidate` CHECK 수동 반영(EXEC-1 적용본과 일치) ③ `prisma migrate resolve --applied <migration>`로 **이미 적용됨 기록만 동기화**(재적용 0·데이터 무변경).
- **★검증 방법:** migration 파일 diff = EXEC-1 적용 DDL과 동일 · resolve 후 `prisma migrate status` = up-to-date · dev.db 데이터/스키마 무변경(row count/checksum).

### FU-2. Cosmile candidate app-level validation 추가
- **배경:** DB-level CHECK는 EXEC-1에서 강제됨(primary·실증). app-level validation = **defense-in-depth**(prisma client 경유 write에서 조기 reject·에러 메시지).
- **계획(실행 아님):** Cosmile candidate write 경로(신규 helper 또는 서비스 함수)에 `status ∈ {candidate,approved,rejected}` 검증(insert/update 전 reject) + 단위 테스트(candidate/approved/rejected 수락·pending/garbage 거부). ★checkout/order 로직 무접촉.

### FU-3. runner 83/89 선재 6건 원인 조사
- **배경:** lmr 5 + brain 1 선재·memory batch/EXEC-1 **무관 확정**(runner는 dev DB 미참조·EXEC-1 전후 동일). 원인 후보 = FOUNDATION HEAD `c9bb996`(subject_ref hard gate).
- **계획(실행 아님):** **read-only 진단** — 6 실패 테스트 개별 재현·assertion 로그 판독·FOUNDATION `c9bb996` 전후 git log/영향 대조·근본 원인 식별. ★선재 실패를 memory batch에서 **임의 수정 금지**·수정은 별도 결정.

## 3. 각 follow-up 위험도 / 실행 범위 / 금지 범위
| follow-up | 위험도 | 실행 범위(승인 시) | 금지 |
|---|---|---|---|
| **FU-1** prisma 기록 동기화 | **MED** | migration 파일 생성(repo·app/prisma/migrations) + `resolve --applied`(dev.db `_prisma_migrations` 기록만) | ★`prisma migrate reset`·`db push --accept-data-loss`·재적용·데이터 변경·prod |
| **FU-2** app-level validation | **LOW~MED** | Cosmile candidate write 경로 validation 코드 + 테스트(shadow 브랜치) | ★checkout/order 로직 변경·live 배선·prod·main merge(라이브화) |
| **FU-3** runner 선재 조사 | **LOW** | read-only 진단(테스트 재현·git log 대조·원인 문서) | ★선재 실패 임의 수정·FOUNDATION 코드 대규모 변경·수정 적용 |

## 4. main merge 전제 vs shadow/dev only
| 작업 | 성격 |
|---|---|
| FU-1 `_prisma_migrations` 기록 동기화 | **dev only**(dev.db 기록)·재적용/데이터 변경 0 |
| FU-1 migration **파일** 자체 | shadow 브랜치 산출물 → **canonical화(라이브 반영)는 main merge 전제**(별도 승인) |
| FU-2 validation **코드** | shadow 브랜치 구현+테스트 = shadow only → **live 강제(라이브 경로 반영)는 main merge + deploy 전제**(별도 승인) |
| FU-3 조사 | read-only·shadow/dev only(코드 변경 0) |
| M6-C~H execution(아래 §5) | 전부 **별도 gate·별도 Leo 승인**(live/prod/hard reject/main merge 성격) |
- ★**현재까지 main merge 0**(제품 repo main = ee055ef/3cd068d/3ba91e0 무변경). shadow/dev 산출물이 라이브가 되려면 **각 main merge + deploy = 별도 Leo 승인.**

## 5. 다음 Gate 후보 (각 별도 Leo 승인·STOP gate 유지)
| gate | 내용 | 성격 |
|---|---|---|
| **M6-C** shadow/live wiring | ingress gate shadow scan **flag ON**(non-prod 통계·정상 트래픽 reject 0 실증) → consult/chat live 배선(hard reject는 M6-G) | live 경로·별도 승인 |
| **M6-D** live auth | SIASIU logins.txt raw → keyed-hash/Foundation-backed auth 전환(P3 util 라이브화) | live auth·별도 승인 |
| **M6-E** live emit | Cosmile de-anon 라이브 emit(.ts) 배선(TS 러너 확보됨) | live emit·별도 승인 |
| **M6-F** prod secret / subject_ref chain | subj_v2_ 파생체인 정본 연결(FOUNDATION_SUBJECT_REF_SECRET·furef_v2·B3)·prod secret 주입·**subject_ref backfill** | prod secret/backfill·별도 승인 |
| **M6-G** hard reject | ingress gate hard reject 활성 결정(shadow 무파괴 실증 후) | hard reject·별도 승인 |
| **M6-H** final readiness | 종합·live enable(그 다음 별도 승인) | 최종·별도 승인 |
- ★**절대 금지(M6 전체):** cross-service memory · Foundation durable customer memory · V3 intelligence live · raw storage live without approval · subject_ref prod backfill without prod secret approval.

## 6. 아직 진행하지 않는 것 (명시)
- ★**실 데이터 repair 적용 · episode/memory_fact→ltm_fact mapping · subject_ref backfill = 아직 진행하지 않는다**(각 별도 gate·별도 Leo 승인). EXEC-1 pre-scan은 count only(repair_applied=false).
- ★**prod DB · prod secret · live 배선 · hard reject 활성 · product repo main merge · schema code main merge = 아직 진행하지 않는다.**

## 7. 다음 액션
- Leo 판단: ① FU-1/FU-2/FU-3 각 **실행 승인**(각각 위 실행 범위·금지 준수) ② 다음 gate(M6-C~H) 진입 판단(각 별도 승인).
- Control은 계획 발행까지. 각 실행은 승인 후 구현자 수행·Control 검증.

## 무결성
계획 문서 only · 실행 0 · prisma 기록 동기화 실행 0 · app-level validation 구현 0 · repair 0 · mapping 0 · backfill 0 · prod DB 0 · prod secret 0 · live 배선 0 · hard reject 0 · **product repo main merge 0** · schema code main merge 0 · 본 plan만 foundation-docs commit/push · 각 follow-up/gate = Leo 별도 승인 후.
