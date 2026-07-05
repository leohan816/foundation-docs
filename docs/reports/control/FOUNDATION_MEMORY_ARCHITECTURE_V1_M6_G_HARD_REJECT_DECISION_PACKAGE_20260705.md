# Memory V1 — M6-G Hard Reject Decision Package (activation = Hard Stop)

> 작성: foundation-control(Control) · 2026-07-05 · **범위: ingress gate hard reject **decision** package(decision matrix + non-prod dry-run/review/rollback/kill-switch 계획). ★hard reject activation = Hard Stop·미수행.**
> ★**hard reject activation · live enable · prod = Hard Stop(Leo 별도 승인 전 절대 미수행).** Restricted Actions List = source report 참조.
> ★Fable/external review 필요 시 **local filesystem path only**(GitHub URL/remote fetch 금지). raw/PII 출력 0.
> 근거(local): M6-C ingress shadow scan result(`706b60a`) · ingress_gate(`consult_shadow_hook`·hard_reject=false) · M6-C approval(`a8da413`).

---

## 1. Fact
- M6-C ingress shadow scan(`706b60a`·PASS): flag ON scan-only·**정상 트래픽 reject 0**(7 + 140)·악성 6/6 탐지·**hard_reject 0**·consult 무변경. → hard reject **decision**의 근거.
- ★M6-G hard reject activation = ingress gate가 **위반 요청을 실제 차단**(hard_reject=true). = Hard Stop·본 package는 decision까지.

## 2. Decision matrix (activation 전 판단·M6-C scan 근거)
| 조건 | M6-C 근거 | activation 판단 |
|---|---|---|
| 정상(계약-정합) 트래픽 reject | **0**(7+140) | ✅ 오탐 0(activation 전제 충족·단 실 트래픽 확대 필요) |
| 악성/위반 탐지 | 6/6(6 codes) | ✅ 탐지 동작 |
| consult 동작 영향 | 무변경(flag-invariant) | ✅ |
| 실 non-prod 트래픽 shadow 통계 | ★synthetic/대표만(라이브 실 트래픽 미확대) | ⚠ **선결**(non-prod 실 트래픽 shadow scan 확대·정상 reject 0 재확인) |
| runner 89/89 | 83/89(runner-fix train 별도) | ⚠ **live enable 전 89/89 필수** |
- ★**activation GO 조건(전부 충족 시 Leo 승인 하)**: non-prod 실 트래픽 shadow 정상 reject 0 지속 + 악성 탐지 + consult 무변경 + rollback/kill-switch 준비 + runner 89/89(live).

## 3. Non-prod dry-run plan (activation 전·shadow→dry-run)
- **shadow scan 확대**(M6-C flag ON): non-prod 실 트래픽 shadow 통계·정상 reject 0 지속 확인(count/code only).
- **dry-run(hard_reject 시뮬):** hard_reject=true를 **비-차단 시뮬 모드**로(로그만·요청 통과)·"차단됐을 요청" count·정상 트래픽 false-block 0 확인. ★실제 차단 안 함(dry-run).
- evidence = count/code/boolean·raw/PII 0.

## 4. Rollback / kill-switch plan
- **kill-switch:** hard_reject flag OFF → 즉시 scan-only(M6-C 상태)·차단 0. 환경변수 제거·코드 revert 불요.
- **rollback:** activation flag OFF·shadow 브랜치 revert·main 무영향.
- **staged:** shadow → dry-run(시뮬) → 소규모 non-prod hard reject → 확대·이상 시 즉시 flag OFF.

## 5. STOP 조건 (activation 시·발생 시 즉시 flag OFF)
- 정상(계약-정합) 트래픽 false-block > 0 · consult 동작 변경 · raw/PII 로그 · prod hard reject(승인 없이) · runner 추가 감소 · durable/cross-service.

## 6. Fable/external review handoff (필요 시·local only)
- ★hard reject는 safety-critical → activation 전 **독립/Fable review**(local filesystem source only·GitHub URL/remote fetch/web/pasted 금지·HEAD provenance). local sources: foundation-docs·FOUNDATION·SIASIU·Cosmile 절대경로.

## 7. Hard Stop / Boundary
> **[이 package = decision]** ★**hard reject activation 미수행**(Hard Stop). non-prod dry-run/review/rollback/kill-switch 계획까지.
> **[금지 유지]** hard reject activation · prod hard reject · live enable · main merge · raw/PII 출력.

## 8. Next action
- 순서(각 별도 Leo 승인): non-prod 실 트래픽 shadow 확대 → dry-run(시뮬·false-block 0) → [독립/Fable review·local] → runner 89/89 → **[Leo 승인] hard reject activation(non-prod→prod 단계)**.
- ★hard reject activation·prod·live·main merge = Hard Stop·별도 최종 Leo 승인.

## 무결성
M6-G hard reject **decision package** only · hard reject activation 0 · prod 0 · live 0 · **main merge 0** · 코드/DB 변경 0 · raw/PII 출력 0 · 본 package만 commit/push · **activation은 non-prod dry-run/review PASS + runner 89/89 + Leo 별도 최종 승인 후에만.**
