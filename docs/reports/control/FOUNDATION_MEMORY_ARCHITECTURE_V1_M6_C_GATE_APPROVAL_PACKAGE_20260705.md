# Memory V1 — M6-C Gate Approval Package (ingress gate shadow scan·non-prod·flag ON)

> 작성: foundation-control(Control) · 2026-07-05 · **요청 유형: Leo "M6-C execution" 승인 판단 요청 package.**
> ★**이 문서 = M6-C 실행 승인 요청이며, 작성 자체는 실행이 아니다.** M6-C 실행·live 배선·hard reject·prod·main merge = **Leo 별도 승인 전 금지·미수행.**
> ★**M6-C = ingress gate shadow SCAN 운영(non-prod·flag ON·판정+기록만·hard_reject=false·요청 통과).** hard reject 활성화(차단)는 **M6-G**(별도 gate).
> 근거(GitHub 직접 확인): M6-C shadow wiring(shadow 브랜치 `05bd05f`·`consult_shadow_hook`) · stabilization batch(`1b76f56`) · EXEC-1 result(`3cf0023`).

---

## 1. Fact (현재 상태)
- **M6-C shadow 배선 완료(inert):** `ingress_gate.consult_shadow_hook`(flag `FDN_INGRESS_GATE_SHADOW` **OFF=default·inert**·ON=scan-only 판정·`hard_reject=false`·ssc 미변경) + `core.consult_contract`에 fail-safe 호출(try/except·validate_ssc 이전). 현재 **flag OFF**(운영 미개시).
- **gate 정합:** gate test **57/57**(BUG-1·compat-scrub 포함)·default-deny·value-level strip·enum 정본·미배선 시 consult 무변경.
- **회귀 baseline:** runner 83/89(선재·memory 무관)·SIASIU 39/119·fingerprint 유지·Cosmile 164/112.
- ★현재까지 **hard reject 0·live 배선 0·prod 0·main merge 0**.

## 2. M6-C 실행 범위
### 할 것 (승인 시·non-prod)
- **non-prod 환경에서 `FDN_INGRESS_GATE_SHADOW=1` 설정** → consult_contract 진입 시 `consult_shadow_hook`이 **scan-only 판정** 수행(요청은 그대로 통과·차단 0).
- **판정 metrics 수집**(count/aggregate/hash/boolean만): 요청 수·verdict ok/violation 수·reject code 분포·**정상 트래픽 reject 0 실증**.
- **consult/chat 기존 동작 미변경**(scan+log만·응답 무변경·ssc 미변경).
### 하지 않을 것 (범위 밖·별도 gate)
- ★**hard reject 활성화(차단)** = M6-G · **prod 환경 flag ON**(=prod live) · **live consult 트래픽 차단** · prod DB · prod secret · subject_ref backfill · repair/mapping/backfill · **product repo main merge** · schema code main merge · V3 personalization/live intelligence · Foundation durable customer memory · cross-service memory.

## 3. non-prod shadow scan plan
- **대상 환경:** non-prod/dev/staging(정확히 지정된 non-prod)만. ★**prod 환경 flag ON 금지**(prod live = 별도).
- **활성 방법:** 환경변수 `FDN_INGRESS_GATE_SHADOW=1`(배포 설정·코드 변경 없음·hook은 이미 배선됨). flag OFF가 default → 미설정 시 완전 inert.
- **입력:** non-prod consult 트래픽 + synthetic 시나리오(정상/악성). ★raw 고객 트래픽 원문은 **미기록**(hook은 code+path index만 반환).
- **동작:** hook이 `scan(ssc)` 호출(deepcopy·원본 미변경) → verdict(ok·violation_codes·count) 반환 → 호출측이 **enum/code+path index만 로그**(raw payload/key-name 미기록·`hard_reject=false`).
- **기간:** 정상 트래픽 reject 0 실증 + 악성 탐지 확인까지(별도 종료 판정).

## 4. metrics / evidence plan (★raw/PII 출력 없이 count/aggregate/hash/boolean only)
| metric | 형식 |
|---|---|
| 총 요청 수 | count |
| verdict ok 수 / violation 수 | count |
| reject code 분포(GATE_REJECT_*) | code별 count |
| **정상 트래픽 reject 수** | count(**0 목표**·실증 대상) |
| 악성 시나리오 탐지 수 | count |
| shadow echo strip 발생 수 | count |
| raw payload/PII/raw identifier 로그 | **0**(code+path index만) |
- ★evidence 보고 = count/aggregate/hash/boolean만 · raw value/PII/customer_id/anonymous_id/trace_id **미출력**.

## 5. safety boundary
- **hard_reject=false 유지**(hook 반환에 `hard_reject:False` 하드코딩·차단 코드 경로 부재).
- **ssc 미변경**(scan은 deepcopy로 동작·원본 payload/consult 흐름 무영향).
- **fail-safe**(core.py try/except·hook 예외가 consult를 절대 미파괴).
- **consult/chat 기존 동작 미변경**(scan+log만·응답·판단·safety 무변경).
- **non-prod only**(prod flag ON = 별도 gate) · durable write 0 · memory_read_provider 0 · cross-service 0.

## 6. rollback / kill-switch
- **kill-switch:** `FDN_INGRESS_GATE_SHADOW` **flag OFF**(환경변수 제거/0) → 즉시 **inert**(hook no-op·consult 완전 무변경). 코드 revert 불요.
- **rollback:** flag OFF(즉시)·또는 shadow 브랜치 hook revert(`consult_shadow_hook` 제거)·main 무영향(shadow 브랜치 local/원격·미merge).
- **staged:** synthetic → non-prod 소규모 → non-prod 전체 순·이상 시 즉시 flag OFF.

## 7. STOP 조건 (M6-C 운영 중·발생 시 즉시 flag OFF·보고)
- **정상(계약-정합) 트래픽 reject > 0**(오탐·gate 보강 필요) · **hard_reject 활성 흔적**(차단 발생) · consult 기존 동작 변경(응답/판단 변화) · raw payload/PII/raw identifier 로그 출력 · prod 환경 flag ON · durable write > 0 · memory_read_provider 연결 · cross-service · runner/consult 회귀 · prod DB/secret 접근.

## 8. remaining watch
- **정상 트래픽 오탐 가능성:** shadow 통계에서 정상 reject > 0 나오면 gate 보강(BUG-1류)·M6-G 전 필수. (현재 gate 57/57·정상 payload pass 검증됨·실 트래픽 분포는 shadow에서 확인.)
- **compat-mode 잔여:** 이전 follow-up으로 compat enum-field scrub gap CLOSED·추가 gap은 shadow 통계로 감지.
- **stabilization watch 유지:** prisma baseline drift·runner 선재·FU-2 라이브화(각 별도).

## 9. approval boundary
> **[요청]** 위 M6-C(**non-prod ingress gate shadow scan 운영**·flag ON·scan+log·hard_reject=false)의 **execution 승인**을 요청합니다.
> **[이 승인의 의미]** non-prod에서 gate를 **관찰 모드로 운영**해 정상 트래픽 reject 0 실증 + 악성 탐지 통계(count only)를 수집할 자격.
> **[이 승인이 아닌 것]** **hard reject 활성(차단)=M6-G** · prod 환경 flag ON(prod live) · live 트래픽 차단 · prod DB · prod secret · subject_ref backfill · repair/mapping/backfill · main merge · V3 live · durable memory · cross-service = **어느 것도 승인하지 않습니다.**
> **[승인 이후 원칙]** shadow scan 통계(정상 reject 0)가 나와도 **hard reject 활성(M6-G)·prod live는 각 별도 gate·별도 Leo 승인.**
> **[선택지]** ① M6-C execution 승인 → non-prod flag ON·통계 수집·Control 검증 · ② 계획 보강 후 재검토 · ③ hold.

## 무결성
M6-C 실행 승인 요청 package only · **작성 = 실행 아님** · hard reject 활성 0 · prod live 0 · prod DB 0 · prod secret 0 · subject_ref backfill 0 · repair/mapping/backfill 0 · **product repo main merge 0** · schema code main merge 0 · raw/PII/raw identifier 출력 0 · V3 live 0 · durable memory 0 · cross-service 0 · 본 package만 foundation-docs commit/push · **M6-C 실행은 Leo 별도 승인 후.**
