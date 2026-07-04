# Memory V1 — M6 Shadow Batch Implementation (Option B)

> 작성: foundation-control(Control) · 2026-07-04 · **범위: Option B shadow batch 구현 + self-test + report.**
> ★허용만 수행: shadow branch · flag OFF/inert · non-prod/test harness · docs · self-test. ★금지 미수행: 실 migration · 실 데이터 pre-scan · repair 적용 · prod DB · prod secret · subject_ref backfill · live 배선 · hard reject · **product repo main merge** · **schema code main merge**.
> 근거: M6 big-batch feasibility(GitHub main `aba9481`·Option B 승인)·M6 roadmap·EXEC-1 pre-review package.

---

## 1. 구현 결과 (M6-C/D/E shadow-prep·코드) — 전부 shadow 브랜치·main 무변경
| gate | repo | shadow branch | commit | 내용 |
|---|---|---|---|---|
| **M6-C** consult/chat shadow wiring | foundation-control | `shadow/m5-ingress-gate` | **`a609d26`** | `ingress_gate.consult_shadow_hook`(flag `FDN_INGRESS_GATE_SHADOW` OFF=inert·ON=scan-only 판정·hard reject 금지·ssc 미변경) + `core.consult_contract` validate_ssc 이전 **fail-safe 호출**(try/except·consult 미파괴) |
| **M6-D** SIASIU P3 auth keyed-hash | SIASIU | `shadow/m4-siasiu-memory` | **`a113a8b`** | `foundation_p3_auth_shadow`(신규·격리·미배선): logins.txt raw email/name → keyed HMAC[:32] 대체값 util + synthetic transform/preview. ★logins.txt 미열람·live auth 무변경 |
| **M6-E** Cosmile P1/P2 TS runner | Cosmile | `shadow/m4-cosmile-memory` | **`5413be3`** | vitest 도입(devDep) + `vitest.config.ts` + `foundation-memory-deanon.vitest.ts`(5 tests). de-anon 로직 TS 러너 검증. ★라이브 emit(.ts) 미변경·dev.db 무접촉 |
- ★3 repo remote main **무변경**(shadow branch push only): foundation-control `21b05e1`·siasiu `be88fb5`·Cosmile `f71c726`.
- ★GitHub 검증: `git show origin/shadow/m5-ingress-gate:foundation_http_service/ingress_gate.py`(M6-C hook) 등.

## 2. 설계 (M6-F/G/H shadow-prep·docs) — 코드 0
### M6-F — subj_v2_ 파생체인 / prod secret 관리 설계
- **체인(정본):** service `local_user_ref` → **furef_v2**(`furef_v2_` = HMAC(서비스 secret, `<service>:<subject_type>:<stable_id>`)[:32]) → **subject_ref**(`subj_v2_` = HMAC(**FOUNDATION_SUBJECT_REF_SECRET**, furef)[:32]). ★현재 shadow는 adapter/util 자체 secret+dev fallback → M6-F에서 **공통규약 체인(B3)**으로 정본 연결.
- **prod secret 관리:** env 주입(FOUNDATION_SUBJECT_REF_SECRET·서비스별 USER_REF_SECRET·SIASIU_P3_AUTH_SECRET)·rotation 정책·Vault 저장. ★현재 dev fallback(하드코딩 아님·env override).
- **★M6-F execution(별도 gate):** prod secret **실사용** · subject_ref **단일 backfill**(prod secret 확정 후·M4 NULL 유지 전제). 지금은 설계만.

### M6-G — hard reject decision 설계
- **shadow 통계 수집:** M6-C `consult_shadow_hook`을 non-prod에서 flag ON → 정상 트래픽 **reject rate 측정**(synthetic·count만). **정상 트래픽 reject 0 실증**이 hard reject 전제.
- **활성 조건:** shadow 기간 정상 reject 0 + kill-switch(flag 즉시 OFF) + staged rollout(canary). 
- **★M6-G execution(별도 gate):** hard reject **활성화**. 지금은 결정 설계·통계 계획만(활성 0).

### M6-H — final live readiness 초안
- live enable 전 충족 목록: EXEC-1(실 migration)·M6-C~G execution 완료 + 전 baseline 회귀 + STOP 15항 0 + rollback rehearsal 실 결과 + Fable5 최종. ★**live enable은 M6-H 그 다음 별도 Leo 승인.**

## 3. Control Self-test 번들 (전량 PASS)
| 항목 | 결과 |
|---|---|
| M6-C gate(+hook) | **46/46**(44→46·hook inert/on) |
| Foundation runner | **83/89**(추가감소 0·선재 6) |
| SIASIU candidate adapter | **26/26** |
| SIASIU schema shadow | **26/26** |
| SIASIU P3 auth shadow(M6-D) | **11/11** |
| SIASIU integration | **39/39** |
| SIASIU workflow | **119/119** |
| answer.py fingerprint | **d7f579443f8a110a** |
| Cosmile de-anon(node) | **14/14** |
| Cosmile de-anon(vitest·M6-E) | **5/5** |
| Cosmile prisma validate | **PASS 🚀** |
| Cosmile readiness | **164/164** |
| Cosmile loop | **112/112** |
- **STOP grep:** hard reject 활성 **0** · durable memory_write true **0** · cross-service import **0** · 실 memory.db/dev.db mtime **07-03 무접촉** · 서버 잔여 0.

## 4. 닫힌/유지 watch
- **shadow-prep로 진전:** M6-C 배선(shadow·inert)·M6-D P3 util·M6-E TS runner = **shadow-prep 완료**(execution은 별도 gate).
- **유지(execution·별도 gate·별도 Leo 승인):** EXEC-1 실 migration · M6-D live auth 전환 · M6-E live emit 배선 · M6-F prod secret/backfill · M6-G hard reject 활성 · M6-H live enable · watch-1(코드 원격검증·P-a로 push됨·판정은 Fable5) · NEW-1 CHECK 강제(EXEC-1).

## 5. STOP 조건 위반: **0**
실 migration 0 · 실 데이터 pre-scan 0 · repair 적용 0 · prod DB 접근 0 · prod secret 0(dev fallback·env override) · subject_ref backfill 0 · **live 배선 0**(M6-C flag OFF inert·M6-D 미배선·M6-E .ts 무변경) · **hard reject 0**(consult_shadow_hook hard_reject=False) · **product repo main merge 0** · **schema code main merge 0**(3 main 무변경) · answer.py fingerprint 무변경 · 실 DB 무접촉 · logins.txt 미열람.

## 6. rollback 방법
- 각 repo `git checkout main`(shadow 브랜치 폐기·main 무영향)·또는 shadow 브랜치 commit revert. M6-C(core.py hook)는 flag OFF라 inert·revert 용이. M6-E vitest devDep는 package.json revert. 3 브랜치 remote는 shadow(main 아님)·삭제 가능.

## 7. Fable5/Codex 단일 검수 Handoff (★EXEC-1 직전 1회·업데이트된 manifest)
- **판독 대상(GitHub 원격):** foundation-docs main(본 report + EXEC1_PRE_REVIEW_PACKAGE + P-a/b/c + roadmap + EXEC-1 prerequisites + EXEC-0 result + NEW-1 + M6-B readiness) + shadow code:
  - **leohan816/foundation-control** `shadow/m5-ingress-gate`@`a609d26` (gate + M6-C hook)
  - **leohan816/siasiu** `shadow/m4-siasiu-memory`@`a113a8b` (memory shadow + M6-D P3)
  - **leohan816/Cosmile** `shadow/m4-cosmile-memory`@`5413be3` (schema + de-anon + M6-E vitest)
- **검수 관점:** EXEC-1 pre-review §7 prompt + M6-C hook inert/fail-safe·M6-D logins.txt 미접촉·M6-E .ts 무변경 확인. ★실 migration/prod/live/hard reject 승인 아님.
- ★**Fable5 호출은 Leo 판단**(EXEC-1 직전 1회). Control은 handoff까지.

## 무결성
shadow branch/flag OFF/non-prod/test harness/docs/self-test only · 실 migration 0 · 실 데이터 pre-scan 0 · repair 적용 0 · prod DB 접근 0 · prod secret 0 · subject_ref backfill 0 · live 배선 0 · hard reject 0 · **product repo main merge 0** · **schema code main merge 0** · 실 DB 무접촉(07-03) · answer.py fingerprint 무변경 · logins.txt 미열람 · 3 shadow 브랜치 push(main 무변경) · 본 report만 foundation-docs commit/push.
