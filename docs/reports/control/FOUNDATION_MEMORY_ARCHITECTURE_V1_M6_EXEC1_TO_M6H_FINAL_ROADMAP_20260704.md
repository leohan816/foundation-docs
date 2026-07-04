# Memory V1 — M6 Execution Roadmap (EXEC-1 → M6-H Final)

> 작성: foundation-control(Control) · 2026-07-04 · **상태: ROADMAP / 설계·승인 계획 only.** ★**이 문서는 실행이 아니다.**
> ★금지(본 문서 단계): 실 migration · 실 데이터 pre-scan · repair 적용 · prod DB 접근 · prod secret · subject_ref backfill · live 배선 · hard reject · **product repo main merge** · **schema code main merge**.
> ★**실행은 EXEC-1·M6-C·M6-D·M6-E·M6-F·M6-G·M6-H 각각 STOP gate·별도 Leo 승인**으로 분리 유지.
> 근거(GitHub 직접 확인·foundation-docs main `eb3de62`): M6-B readiness(`b0c7dc1`)·EXEC-0 result(`2dc281a`)·Fable5 readiness review(`d4d97ec`)·NEW-1(`6e147dd`)·EXEC-1 prerequisites(`eb3de62`)·M6_PLANNING·M4_MIGRATION_PLAN(+addendum).

---

## 1. 현재 상태 Consolidation
| 항목 | 상태 | 근거(GitHub 검증) |
|---|---|---|
| M6-B migration readiness | ✅ **Leo approval 완료** | `b0c7dc1` package |
| EXEC-0 dry-run(synthetic/disposable) | ✅ **PASS** | `2dc281a` result |
| Fable5 M6-B readiness review | ✅ APPROVE_WITH_WATCH | `d4d97ec` |
| NEW-1 Cosmile candidate status | ✅ **schema default CLOSED**(local shadow) | `6e147dd` report·shadow `78678ed`(local-only) |
| EXEC-1 gate prerequisites | ✅ 정의 완료 | `eb3de62` |
- **닫힌 watch:** watch-2(Cosmile 명칭/boolean)·watch-3(dry-run 결과)·watch-4(rollback rehearsal 결과)·watch-5(repair 후보 산출·applied=false)·**NEW-1 schema default**.
- **유지 watch:** **watch-1**(shadow code 원격검증)·**watch-6**(실 migration/prod/live/hard reject/prod secret/subject_ref backfill)·**NEW-1 CHECK 강제**(EXEC-1 필수).
- **shadow 브랜치(전부 local-only·원격 미검증):** fc `shadow/m5-ingress-gate`(gate `1c79943`) · SIASIU `shadow/m4-siasiu-memory`(`70a9235`) · Cosmile `shadow/m4-cosmile-memory`(`78678ed`).

## 2. P-a / P-b / P-c Closure Plan (EXEC-1 진입 전제)
### P-a — shadow code 원격검증 경로
- **문제:** 3 shadow 브랜치 local-only → Leo/Fable5가 M6-A/NEW-1 코드를 GitHub로 검증 불가.
- **경로(택1·★product repo main merge 금지):**
  1. **shadow 브랜치 push**(제품 repo의 `shadow/*` 브랜치를 remote로 push — main 아님·merge 아님) → GitHub에서 shadow 브랜치 직접 판독. ★Leo 승인 필요(제품 repo remote 반영).
  2. **local review**(Leo/검수자가 local 저장소에서 `git show <commit>:<path>` 직접 판독).
- **닫힘 기준:** 검수자가 gate `1c79943`·SIASIU `70a9235`·Cosmile `78678ed` 코드를 원격 또는 local로 직접 확인.
- ★**main merge는 조건 4로 금지** — 검증은 shadow 브랜치 push 또는 local review로만.

### P-b — Cosmile candidate status CHECK/app-level validation 설계
- **문제:** prisma CHECK 미emit → Cosmile candidate status `candidate|approved|rejected` 강제 부재(default만 정정됨).
- **설계(택1·병행):**
  1. **migration SQL(raw):** EXEC-1 prisma migration에 `CHECK (status IN ('candidate','approved','rejected'))` raw SQL 추가(prisma migration `.sql`에 수동 삽입·additive).
  2. **app-level validation:** Cosmile 서비스 write 경로에 status enum 검증(insert/update 전 reject).
- **닫힘 기준:** EXEC-1 migration SQL에 CHECK 명시 **또는** app-level validation 코드 + 테스트(candidate/approved/rejected 수락·pending/garbage 거부). ★설계·문서화는 지금·**적용은 EXEC-1(별도 승인)**.

### P-c — 실 데이터 pre-scan 승인 설계
- **문제:** synthetic 아닌 실 데이터의 SINGLE 2-active/off-contract/tombstone 실건수 미확정(EXEC-0는 합성).
- **설계:** 실 데이터 pre-scan = **조건 3(별도 승인)**·raw identifier SELECT 0·**count/aggregate/hash만** 출력·PII/secret 0. 대상 = 실 memory.db/dev.db(★별도 승인 후·backup 선행).
- **닫힘 기준:** 실 데이터 pre-scan **승인 + 실행(EXEC-1 내)** → off-contract 실건수·repair 대상 확정. ★지금은 **설계만**·실 데이터 미접근.

## 3. EXEC-1 Execution Approval Package (초안·★미요청·별도 gate)
> ★본 초안은 EXEC-1 승인을 **요청하지 않는다.** P-a/P-b/P-c 충족 후 별도 제출.
| 요소 | 범위 | 조건 |
|---|---|---|
| **실 migration 범위** | additive schema(WATCH 반영 DDL: SIASIU status candidate CHECK·Cosmile overlay 개별 컬럼·candidate CHECK·retention 정본) | additive only·**reset/db push --accept-data-loss 금지** |
| **WAL-safe backup** | 실 대상(memory.db/dev.db) `.backup`/`VACUUM INTO`·integrity_check·count/checksum | prod 아님·raw 미출력·backup 선행 필수 |
| **실 데이터 pre-scan** | §M6-B §4 SQL(실 명칭·Cosmile 확정) | aggregate/count/hash만·raw identifier 0(P-c 승인) |
| **deterministic repair 적용** | §M6-B §5 rule(SINGLE winner·MULTI dedupe·off-contract status/retention 매핑) | ★**EXEC-1 gate 내 별도 승인**·must_not_reappear·tombstone 되살림 0·log count/hash/id만 |
| **additive migration** | `prisma migrate deploy`(Cosmile)·SIASIU DDL 적용 | 기존 컬럼 무변경·기존 row 무손상 |
| **index** | partial-unique(subject_key active)·overlay index | repair 후 abort 0 확인 |
| **row count/checksum** | 전후 일치(기존 테이블)·신규 additive expected | raw 미출력·count/hash/boolean |
| **rollback rehearsal** | backup restore→integrity→count→checksum | 실 결과 산출·복구 검증 |
| **PASS 기준** | backup ok·pre-scan 완료·repair 적용 검증·additive/index compat·count/checksum 일치·rollback 검증·raw 0 | — |
| **FAIL/STOP** | integrity 실패·데이터 손실·index abort·rollback 실패·raw 노출·CHECK 미명시·tombstone 되살림·same-row 결합 | → backup 복원·STOP·보고 |

## 4. M6-C ~ M6-H 남은 gate (전체 계획·각 별도 Leo 승인·STOP gate 유지)
| gate | 목적 | scope | repo/파일 | required tests | rollback | Leo/Fable5 | 금지 |
|---|---|---|---|---|---|---|---|
| **M6-C** consult/chat gate **shadow** wiring | ingress gate를 consult_contract+`/v1/consult/chat`(+alias)에 **shadow(판정+strip·hard reject 금지)** 배선 | fc: `server.py`/`core.py`(최소)·`ingress_gate.py` | gate 44/44·runner 83/89 추가감소 0·정상 요청 차단 0·shadow echo strip·기존 consult 무변경 | flag OFF(inert)·배선 revert | Leo 승인·Fable5 | hard reject·durable write·memory_read_provider·raw payload log·기존 consult 변경 |
| **M6-D** SIASIU **P3 live auth** | logins.txt raw email/name → keyed-hash/Foundation-backed auth 전환 | SIASIU auth 모듈·P3 util | integration 39/39·workflow 119/119·fingerprint·로그인 회귀·logins.txt raw 0 | auth patch revert·backup | Leo 승인·Fable5 | answer.py·recall/reset 변경·raw 열람·live write·prod secret 없이 배포 |
| **M6-E** Cosmile **P1/P2 live emit** | de-anon 모듈을 라이브 emit(.ts) 배선 — **먼저 TS 러너(vitest) 확보** | Cosmile TS test·`foundationDecisionEvent.ts`·`foundationSignalMapper.ts` | TS de-anon 단위·readiness 164/164·loop 112/112·same-row 0·payload_refs only·기존 event 회귀 | emit 배선 revert(de-anon 모듈 격리 유지) | Leo 승인·Fable5(TS 러너 후) | checkout/order 로직·raw content populate·P1/P2 없는 배선·prisma reset·live write |
| **M6-F** prod secret / subject_ref chain | subj_v2_ 파생체인 정본 연결(FOUNDATION_SUBJECT_REF_SECRET·furef_v2·B3)·prod secret 관리·subject_ref 단일 backfill 계획 | foundation-docs 설계·(승인 후) 3 repo | 파생체인 정합 시뮬·per-service 상이·backfill 0 assert | 계획(코드 0) | Leo 승인·Fable5 | prod secret 실주입·**subject_ref backfill 실행**·Vault write·hardcoded prod secret |
| **M6-G** hard reject decision | ingress gate **hard reject 활성 여부/조건 결정**(shadow 무파괴 실증 후) | fc gate 설정(flag)·결정 문서 | shadow 정상 트래픽 reject 0·hard reject dry(카나리)·runner/consult 회귀 | flag OFF(즉시 shadow 복귀) | Leo 승인·Fable5 | 승인 없이 hard reject 활성·정상 트래픽 차단·kill-switch 부재 |
| **M6-H** final live readiness | M6-A~G 종합·live 전환 최종 준비 검증(★live enable은 그 다음 별도 승인) | foundation-docs readiness | 전 baseline 회귀·gate·de-anon·same-row·migration rollback rehearsal·STOP 15항 0 | 각 gate 독립 rollback | Leo 승인·Fable5 최종 | live enable(본 gate도 준비까지) |
- ★**순서 권고:** (P-a/P-b/P-c 충족) → **Fable5 1회 검수(§5)** → **EXEC-1**(Leo 승인) → **M6-C**(shadow) → **M6-D·M6-E·M6-F 병행**(각 승인) → **M6-G**(결정) → **M6-H**(최종). 각 gate 앞 gate 미완 시 다음 진행 금지.
- ★**절대 금지(M6 전체):** cross-service memory · Foundation durable customer memory · V3 intelligence live · raw storage live without approval · subject_ref prod backfill without prod secret approval.

## 5. Fable5/Codex 단일 검수 Prompt (★EXEC-1 진입 직전 1회·중간 반복 금지)
```
[MEMORY V1 M6 — EXEC-1 진입 직전 단일 독립 검수(1회)]
대상(foundation-docs main): 본 ROADMAP · EXEC-1_GATE_PREREQUISITES · EXEC-0 result · NEW-1 patch · M6-B readiness · M4_MIGRATION_PLAN(+addendum)
+ shadow code(P-a 경로로 원격 push 또는 local): fc gate 1c79943 · SIASIU 70a9235 · Cosmile 78678ed
관점(readiness/execution package 안전성 검수·코드/DB 변경 0·재현 아님):
 1. EXEC-1 4개 필수조건(별도 gate·CHECK·실 데이터 별도 승인·main merge 금지) 충족 준비
 2. P-a(코드 원격검증)·P-b(Cosmile CHECK/app-level)·P-c(실 데이터 pre-scan 승인 설계) closure plan 안전성
 3. EXEC-1 approval package(backup·pre-scan·repair 적용 조건·additive migration·index·checksum·rollback·PASS/FAIL/STOP) 충분성
 4. M6-C~H gate 각 STOP gate·별도 승인 분리·절대 금지(cross-service/durable/V3/raw live/prod backfill) 유지
 5. shadow code(gate/SIASIU/Cosmile M6-A+NEW-1)가 계약(M2/M3 v1.2)과 field-level 정합(status candidate·overlay 5모델·retention 정본·candidate CHECK 경로)
 6. local shadow diff vs GitHub 검증 분리·과대표현 없음
 7. 실 migration/repair 적용/prod/live/hard reject/prod secret/backfill이 전부 별도 승인으로 분리
판정: APPROVE(EXEC-1 execution 승인 요청 준비 완료) / PATCH_REQUIRED(구간별 보완).
★이 검수 = readiness/execution package 안전성 검수이며, 실 migration/prod/live/hard reject 승인 아님.
금지: 코드 수정·migration·repair 실행·DB 접근·raw/secret 열람·main merge·push(검수자는 판독만).
```
- ★**Fable5/Codex는 EXEC-1 진입 직전 1회만** 호출(작은 patch마다 반복 금지). 이후 각 M6-C~H gate는 해당 gate 완료 시 개별 검수.

## 무결성
설계·승인 로드맵 only · **실행 0** · 실 migration 0 · 실 데이터 pre-scan 0 · repair 적용 0 · prod DB 접근 0 · prod secret 0 · subject_ref backfill 0 · live 배선 0 · hard reject 0 · **product repo main merge 0** · **schema code main merge 0**(shadow 브랜치 local·미merge) · 실 DB 무접촉 · 각 gate STOP·별도 Leo 승인 유지 · 본 roadmap만 foundation-docs commit/push.
