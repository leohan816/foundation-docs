# Memory V1 — M6 Big-Batch Feasibility (EXEC-1 → M6-H)

> 작성: foundation-control(Control) · 2026-07-04 · **상태: FEASIBILITY REPORT only · Fable5 호출 전 사전 판단용.**
> ★실행 0 · 코드 수정 0 · DB 접근 0 · 실 데이터 pre-scan 0 · repair 적용 0 · prod secret 0 · subject_ref backfill 0 · live 배선 0 · hard reject 0 · main merge 0.
> ★실 migration/prod/live/hard reject/repair 적용/main merge = 여전히 **별도 gate·별도 Leo 승인 없이 진행 안 함.**
> 근거: M6 roadmap(GitHub main `ffc7b5b`)·EXEC-1 pre-review package·P-a/b/c closure·EXEC-0 result.

---

## 1. Fact — 7개 gate를 "shadow-prep 레이어" vs "execution 레이어"로 분해
각 gate는 **되돌릴 수 있는 준비층(shadow/non-prod/docs/test)** 과 **되돌리기 어려운 실행층(real-DB/prod/live)** 으로 나뉜다.
| gate | shadow-prep 레이어(batch 후보) | execution 레이어(★별도 gate) |
|---|---|---|
| **EXEC-1** | approval package 확정·pre-scan SQL/backup/repair rule/rollback 절차 문서 | 실 migration·실 데이터 pre-scan 실행·**repair 적용**(real DB) |
| **M6-C** consult/chat | ingress gate **shadow 배선**(flag OFF·hard reject 금지)+consult 회귀 test | (hard reject는 M6-G·live consult는 M6-H) |
| **M6-D** SIASIU P3 | P3 keyed-hash **util 배선**+shadow test(logins.txt 미열람) | **live auth 전환**(real logins.txt·real login) |
| **M6-E** Cosmile P1/P2 | **TS 러너(vitest) 도입**+de-anon 단위 test(격리) | **live emit 배선**(.ts emit path) |
| **M6-F** prod secret/chain | subj_v2_ 파생체인 **설계**+prod secret 관리 **계획**(docs) | **prod secret 실사용**·**subject_ref backfill** |
| **M6-G** hard reject | shadow 통계 수집 계획+hard reject **결정 설계**(docs) | **hard reject 활성화** |
| **M6-H** final readiness | 종합 readiness **초안**(docs) | **live enable** |
- ★핵심: **7개 gate의 shadow-prep 레이어는 대부분 batch 가능**(flag OFF·real DB 무접촉·rollback=shadow 브랜치 revert). **execution 레이어는 전부 별도 gate**(real DB/prod/live·rollback 어려움).

## 2. 질문 A~G 답

### A. 한 번에 묶어도 되는 것(shadow/non-prod/문서/테스트 준비)
- **M6-C shadow 배선**(gate wiring·flag OFF)·**M6-D P3 util+shadow test**·**M6-E TS 러너+de-anon 단위 test**·**M6-F 설계/계획 docs**·**M6-G 결정 설계 docs**·**M6-H readiness 초안 docs**·**EXEC-1 approval package 확정 docs**. → **shadow/문서/테스트 준비층은 하나의 큰 batch 가능.**

### B. 반드시 별도 Leo 승인 gate로 나눠야 하는 것
- **EXEC-1 실 migration·실 데이터 pre-scan·repair 적용** · **M6-D live auth 전환** · **M6-E live emit 배선** · **M6-F prod secret 사용·subject_ref backfill** · **M6-G hard reject 활성화** · **M6-H live enable**. → **execution 레이어 = 전부 별도 gate**(real DB/prod/live/hard reject).

### C. 한 번에 구현하면 버그를 빠르게 잡는 영역
- **shadow 통합 test harness**(M6-C gate 배선 + M6-E de-anon 단위 + M6-D P3 util을 **한 통합 harness**로) → memory_context 흐름·enum 정합·trace 처리의 **cross-service 상호작용 버그를 한 번에 표면화**. 개별로 하면 상호작용 결함이 뒤늦게 드러남.
- gate/de-anon/schema는 이미 독립 검증됨 → **배선+통합**을 한 번에 하면 결합 결함(예: gate 배선이 consult 회귀 유발·de-anon이 event 회귀)을 한 test cycle에 잡음.

### D. 한 번에 구현하면 rollback/원인분리/보안/데이터 리스크가 커지는 영역
- **execution 레이어 batch = 위험.** EXEC-1 migration + live auth + live emit + prod secret를 묶으면: ① **rollback**: 어느 층이 깨졌는지 원인분리 불가·real data 손상 시 되돌리기 어려움 ② **보안**: prod secret + subject_ref backfill 동시 = secret 오류 시 전 subject_ref orphan ③ **데이터**: real migration + repair 적용 동시 = repair 오판 시 비가역. → **execution은 절대 batch 금지.**

### E. Fable5 1회 최적 시점
- ★**shadow batch 구현 완료 + Control self-test 전량 PASS 직후·모든 execution gate 진입 전.** 이 시점에 **shadow batch 전체 + EXEC-1 approval package**를 **단일 gate-specific 검수 1회**. (이미 만든 EXEC-1 pre-review package가 이 지점의 기반.) 이후 각 execution gate는 해당 gate 완료 시 **경량 per-gate 확인**(Fable5 재호출 최소).

### F. Fable5 전 Control/Claude Code 자체 test 묶음
- 기존: gate **44/44** · runner **83/89**(추가감소 0) · SIASIU integration **39/39** · workflow **119/119** · fingerprint `d7f579443f8a110a` · SIASIU shadow schema **26/26** · adapter **26/26** · Cosmile readiness **164/164** · loop **112/112** · de-anon **14/14** · prisma validate.
- 신규(shadow batch): **consult shadow 배선 회귀**(gate 배선 후 consult 무변경·runner 무회귀) · **M6-E TS de-anon 단위**(vitest 도입 후) · **M6-D P3 util test** · **EXEC-0-style disposable dry-run 재실행**(synthetic) · **grep 세트**(same-row 0·raw log 0·durable 0·cross-service 0·backfill 0·main merge 0·memory_write true 0·hard reject 0).

### G. "큰 batch" 산출물 path + 보고 형식
- **산출물:** shadow batch 구현 = 3 shadow 브랜치 commit(local→push) + `docs/reports/control/FOUNDATION_MEMORY_ARCHITECTURE_V1_M6_SHADOW_BATCH_IMPLEMENTATION_REPORT_YYYYMMDD.md`.
- **보고 형식:** per-gate shadow-prep 결과표 · Control self-test 번들 결과 · closed/kept watch · STOP 점검 · rollback(shadow 브랜치 revert) · **Fable5 단일 검수 handoff**(shadow branch manifest·git show·EXEC-1 package).

## 3. 3 Options
| 속성 | **Option A — Conservative** | **Option B — Balanced** ★ | **Option C — Aggressive** |
|---|---|---|---|
| **1. 포함 범위** | 없음(7개 각각 별도 gate·shadow도 개별) | **M6-C~M6-F shadow/non-prod 준비+통합 test harness = 1 batch** + EXEC-1 approval package 확정(docs) | 가능한 모든 shadow/non-prod 구현 1 batch(M6-C~H 준비층 전부) |
| **2. 제외 범위** | 묶기 자체 | EXEC-1 실 migration·M6-D live auth·M6-E live emit·M6-F prod secret/backfill·M6-G hard reject·M6-H live enable | 동일(real migration·prod·live·hard reject만 별도) |
| **3. 예상 속도** | 느림(7 gate·다수 승인·Fable5 다회) | **빠름**(shadow 1 batch·execution만 gate) | 가장 빠름 |
| **4. 주요 리스크** | 낮음(단계별)·단 느림·Fable5 피로 | 중간(shadow batch reversible·flag OFF)·통합 diff 관리 | 높음(대형 diff·Fable5 검수 표면 넓어 결함 누락 위험·원인분리 저하) |
| **5. rollback** | 최상(gate별) | **양호**(shadow 브랜치 revert·flag OFF·additive) | 거침(대형 batch 일괄 revert) |
| **6. 테스트 가능성** | gate별 | **통합 harness 1회**(cross-service 결함 조기) | 대형 harness(표면 넓음) |
| **7. Fable5 호출 시점** | 다회(비효율) | **1회**(shadow batch 완료+self-test 후·execution 전) | 1회(대형 surface·누락 위험) |
| **8. Leo 승인 필요** | 7 gate | **shadow batch(1) + execution gate 6**(EXEC-1·live auth·live emit·prod secret·hard reject·live enable) | shadow mega-batch(1) + execution gate |
| **9. 추천 여부** | Leo 의사("잘게 쪼개지 말라")와 불일치·비추천 | ★**추천** | 조건부(속도 최우선·Fable5 검수 역량 충분 시) |

## 4. 판단
- Leo 의사 = "가능한 크게 묶되, 실 migration/prod/live/hard reject/repair/main merge는 별도 gate." → **Option B(Balanced)가 정확히 일치.**
- shadow/non-prod/test 준비층은 **reversible·flag OFF·real DB 무접촉**이라 큰 batch로 묶어도 안전하고, 통합 test harness로 cross-service 결함을 **한 번에** 잡는다(속도 이득).
- execution 레이어(real DB·prod·live·hard reject)는 **rollback/원인분리/보안/데이터 리스크** 때문에 batch 시 위험 급증 → **반드시 별도 gate 유지**.
- Fable5 = shadow batch 완료 + Control self-test PASS 직후 **1회**(execution 전) → 최소 호출로 최대 결함 포착.

## 5. 리스크
- **Option B 통합 diff 관리:** M6-C 배선이 Foundation server/core 접촉 → consult/runner 회귀 필수 검증(shadow·flag OFF라 rollback 용이하나 검증 필수).
- **M6-E TS 러너 도입:** vitest 신규 도입 = Cosmile 빌드/의존성 변화 → 기존 readiness/loop(python) 무관하나 Cosmile 자체 빌드 회귀 확인 필요.
- **shadow batch도 제품 repo 코드 접촉:** shadow 브랜치 local→push(main merge 아님)·검증은 shadow 브랜치. ★main merge는 여전히 금지.
- **execution batch 금지 준수:** Option C의 유혹(속도)에도 execution 레이어는 절대 묶지 않음(D 리스크).
- **Fable5 단일 검수 표면:** Option B는 shadow batch로 표면 제한 → 검수 정확도 유지. Option C는 표면 확대로 누락 위험.

## 6. 추천
- ★**Option B(Balanced) 추천.** M6-C~M6-F **shadow/non-prod 준비 + 통합 test harness**를 **1 batch**로 진행 → Control self-test(§2-F) 전량 PASS → **Fable5 단일 검수 1회** → 그 후 **EXEC-1·live auth·live emit·prod secret·hard reject·live enable을 각 별도 gate·별도 Leo 승인**.
- ★단 본 문서는 **feasibility 판단용**이며, Option B "큰 batch 실행" 착수도 **Leo 승인 후**(실행 지시 아님).

## 7. 다음 액션
- **Leo 판단:** Option A/B/C 중 택1(추천 B). B 승인 시 → shadow batch 구현 지시(shadow 브랜치·flag OFF·real DB 무접촉·self-test 번들) → Fable5 1회 → execution gate 개별 승인.
- **Control 준비:** B 승인 시 shadow batch 구현 계획(gate별 shadow-prep scope·통합 harness·self-test 목록)을 1문서로 발행(실행 아님).
- ★**미승인 유지:** 실 migration·실 데이터 pre-scan·repair 적용·prod DB·prod secret·live·hard reject·subject_ref backfill·main merge = 전부 별도 gate·별도 Leo 승인.

## 무결성
feasibility report only · 실행 0 · 코드 수정 0 · DB 접근 0 · 실 데이터 pre-scan 0 · repair 적용 0 · prod secret 0 · subject_ref backfill 0 · live 배선 0 · hard reject 0 · **main merge 0** · Fable5 미호출(호출 전 사전 판단용) · 제품 repo 코드 변경 0 · 실 DB 무접촉 · 본 문서만 foundation-docs commit/push.
