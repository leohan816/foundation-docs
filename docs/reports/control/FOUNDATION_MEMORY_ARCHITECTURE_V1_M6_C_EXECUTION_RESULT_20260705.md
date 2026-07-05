# Memory V1 — M6-C Execution Result (non-prod ingress gate shadow scan)

> 작성: foundation-control(Control) · 2026-07-05 · **범위: Leo 조건부 승인 M6-C 실행 결과(non-prod ingress gate shadow SCAN·flag ON·scan-only·hard_reject=false·consult 무변경).**
> ★hard reject 활성 0 · prod flag ON 0 · live 트래픽 차단 0 · prod DB 0 · prod secret 0 · repair/mapping/backfill 0 · main merge 0 · raw/PII/식별자 출력 0 · durable/cross-service/V3 0.
> 근거: M6-C Gate Approval Package(GitHub main `a8da413`·Leo 조건부 승인).

---

## 1. Fact
- **M6-C = ingress gate shadow SCAN 운영**(flag `FDN_INGRESS_GATE_SHADOW=1`·`consult_shadow_hook`이 판정만·요청 통과·`hard_reject=false`). synthetic 정상/악성 + 대표 정상 트래픽 140건에 shadow scan 수행.
- **핵심 결과:** 정상 트래픽 **reject 0** · 악성 **6/6 탐지**(차단 0) · **hard_reject 총 0** · **consult flag-invariant**(flag가 consult 결정 미변경) · metrics **count/code only**(raw 0) · kill-switch(flag OFF→inert) 확인.

## 2. 실행 환경
- **non-prod/dev(synthetic).** ★실 memory.db/dev.db/prod DB **무접촉**(M6-C는 gate scan·DB 무관). prod 환경 flag ON **0**.
- **scan 방식:** `consult_shadow_hook`(flag ON)을 synthetic payload에 적용해 verdict(code+count) 수집 + `consult_contract`로 consult 무변경 검증. ★flag는 **harness 프로세스 env**로만 설정(비영속)·**제품 코드/배포 env 변경 0**(hook은 이미 배선됨·flag 기본 OFF).
- ★**정직 구분:** 본 실행 = **synthetic + 대표 정상 트래픽(140) 기반 shadow scan**(gate 동작 실증). **라이브 non-prod 서비스에 flag ON 배포(실 트래픽 shadow scan)**는 운영 배포 단계(env var)로, gate 동작은 본 harness가 증명하되 실 서비스 배포는 운영 승인/배포 절차(별도).

## 3. flag ON/OFF evidence
| 상태 | 동작 |
|---|---|
| **flag OFF(기본)** | `consult_shadow_hook` = **None(inert)**·consult 완전 무변경(hook no-op) |
| **flag ON** | scan-only 판정(verdict 반환·요청 통과·**hard_reject=false**·ssc 미변경) |
| **kill-switch(flag OFF 복귀)** | 즉시 **inert**(hook None)·consult 무변경 |
- 코드 변경 0(hook 배선은 shadow batch에서 완료·flag만 env)·gate test 57/57·flag 기본 OFF 확인.

## 4. synthetic 정상/악성 시나리오 결과 (count/code only)
| batch | count | ok | violation | hard_reject | codes |
|---|---|---|---|---|---|
| **정상(계약-정합)** | 7 | **7** | **0** | **0** | (없음) |
| **악성/위반** | 6 | 0 | **6** | **0** | IDENTIFIER·RAW_TEXT·SESSION_REF_FORMAT·UNKNOWN_KEY·DELETED_REUSE·ENUM 각 1 |
- ★악성 6종 **전량 탐지**(verdict violation)·단 **hard_reject=false로 요청 통과**(차단 0). 정상은 reject 0.

## 5. non-prod shadow scan metrics
- **대표 정상 트래픽 140건**(정상 시나리오 반복): **ok 140 · violation 0 · hard_reject 0 · codes 없음**.
- metrics = **count/aggregate/hash/boolean only**. verdict 반환 키 = `ok`·`violation_codes`·`violation_count`·`shadow`·`hard_reject`(★raw/payload/key-name 없음).

## 6. 정상 트래픽 reject 0 evidence
- synthetic 정상 7 → violation **0** · 대표 정상 140 → violation **0** · **normal_traffic_reject_count = 0**. ★정상(계약-정합) 트래픽 reject **0 실증**(오탐 0·M6-G 전제 충족).

## 7. raw/PII 출력 0 evidence
- verdict = `{ok, violation_codes(GATE_REJECT_*), violation_count, shadow, hard_reject}` — **code+count+boolean만**. raw payload·customer_id·anonymous_id·trace_id·원문 **미포함/미출력**. `verdict_has_raw=false`·`raw_or_pii_printed_in_metrics=false`.

## 8. consult/chat 회귀 결과
- **consult flag-invariant(결정성-통제 검증):** fresh deepcopy로 payload당 OFF/OFF/ON 비교 → **결정적 payload는 OFF==OFF==ON**(flag 무효)·**consult_changed_by_flag = false**. (consult_contract는 일부 입력에서 **자체 비결정성**(OFF!=OFF)이 있으나 **flag-independent** — 초기 naive 비교의 오탐 원인이었고, 결정성-통제 비교로 flag 무효 실증. consult_contract는 입력 ssc를 **mutate 안 함**.)
- **회귀:** gate **57/57** · runner **83/89**(추가감소 0·선재 6·M6-C 무관) · consult 응답/판단 = flag OFF와 동일(결정적 케이스).

## 9. STOP / 무결성
STOP 위반 **0**: 정상 트래픽 reject 0(>0 아님) · **hard_reject 활성 흔적 0**(전 batch hard_reject=0) · consult 응답/판단 flag-변화 0(flag-invariant) · raw/PII/식별자 로그 0 · prod 환경 flag ON 0 · durable write 0 · memory_read_provider 0 · cross-service 0 · runner/consult 회귀 0 · prod DB/secret 0.
- 무결성: hard reject 활성 0 · prod live 0 · live 차단 0 · repair/mapping/backfill 0 · **main merge 0**(main ee055ef/3cd068d/3ba91e0) · schema code main merge 0 · 제품 코드 변경 0(flag=env·hook 기배선) · 실 DB 무접촉 · V3/durable/cross-service 0 · 서버 잔여 0.

## 10. remaining watch
- **라이브 non-prod 서비스 실 트래픽 shadow scan:** 본 실행은 synthetic/대표 트래픽 기반. 라이브 non-prod 서비스 배포(flag ON env)로 **실 트래픽 통계**는 운영 배포 단계(별도)에서 확대 가능(정상 reject 0 재확인).
- **consult_contract 자체 비결정성:** 일부 입력에서 run-to-run 변동(flag-independent). M6-C 무관이나 인지(별도).
- **기존 watch 유지:** prisma baseline drift · runner 선재 6건(runner-fix train) · FU-2 라이브화 · compat gap(shadow 통계로 감지).

## 11. M6-D 또는 M6-G 진입 가능 여부
- ★**M6-C shadow scan 실증 완료**: 정상 트래픽 reject 0 · 악성 탐지 · hard_reject 0 · consult 무변경. → **M6-G(hard reject) 전제(정상 트래픽 reject 0)** 충족(단 라이브 실 트래픽 확대는 운영 단계).
- **M6-D(SIASIU live auth)·M6-E(Cosmile live emit)·M6-F(prod secret/chain)·M6-G(hard reject)·M6-H(final) = 각 별도 gate·별도 Leo 승인.**
- ★**M6-C 승인 = non-prod shadow scan까지.** hard reject 활성(M6-G)·prod live·live 트래픽 차단·main merge = 승인 아님.

## 무결성
M6-C = non-prod ingress gate shadow scan(flag ON·scan-only·hard_reject=false) only · hard reject 활성 0 · prod live 0 · live 차단 0 · prod DB/secret 0 · repair/mapping/backfill 0 · main merge 0 · raw/PII/식별자 출력 0 · durable/cross-service/V3 0 · 제품 코드 변경 0 · 실 DB 무접촉 · 서버 잔여 0 · 본 result report만 foundation-docs commit/push · **M6-D/M6-G 등 다음 gate는 각 별도 Leo 승인.**
