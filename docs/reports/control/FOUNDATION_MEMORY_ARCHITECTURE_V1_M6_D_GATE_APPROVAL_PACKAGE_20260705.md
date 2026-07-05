# Memory V1 — M6-D Gate Approval Package (SIASIU P3 keyed-hash auth live-prep)

> 작성: foundation-control(Control) · 2026-07-05 · **요청 유형: Leo "M6-D execution" 승인 판단 요청 package.**
> ★**이 문서 = M6-D 실행 승인 요청이며, 작성 자체는 실행이 아니다.** M6-D execution · **live auth 전환** · prod secret · subject_ref backfill · main merge = **Leo 별도 승인 전 금지·미수행.**
> ★**M6-D = SIASIU P3 keyed-hash auth live-PREP**(de-identification 통합 준비 + shadow/non-prod 검증). ★**실 live auth 전환**(logins.txt 실 이관)·**prod secret**·**subject_ref backfill**은 **M6-F/후속**(별도 gate).
> 근거(GitHub 직접 확인): M6-D shadow-prep(SIASIU shadow `a113a8b`·`foundation_p3_auth_shadow`·11/11) · M6 roadmap · stabilization batch(`1b76f56`).

---

## 1. Fact (현재 상태)
- **M6-D shadow-prep 완료(격리·미배선):** `foundation_p3_auth_shadow`(keyed-hash util·`hash_login_identifier`·`shadow_transform_record`·`preview_synthetic`) — logins.txt raw email/name → **keyed HMAC[:32](phash_v2_)** 대체값·synthetic transform. **11/11 test**·★**logins.txt 미열람·live auth 무변경·`applied_to_real_logins=False`**.
- **문제(P3):** logins.txt에 raw email/name 평문 무기한 잔존(de-identify 필요).
- **정본:** de-id 대체값 = keyed HMAC(원문 미보존·역추적 불가·per-secret). ★prod secret은 M6-F.
- 현재까지 **live auth 전환 0·prod secret 0·backfill 0·main merge 0**.

## 2. M6-D 실행 범위
### 할 것 (승인 시·shadow/non-prod live-prep)
- **auth 통합 설계 확정:** P3 keyed-hash util을 SIASIU 로그인/세션 경로에 **어떻게 통합할지**(신규 로그인 시 identifier hash 병행 저장·기존 raw는 grandfather/이관 대상) 설계.
- **shadow/non-prod 검증:** **synthetic login record**로 de-identification 동작 + 기존 login/session/consult 흐름 **회귀 0** 검증(실 logins.txt 미열람).
- **flag/rollback 준비:** live 전환 flag(default OFF)·rollback 절차 정의.
### 하지 않을 것 (범위 밖·별도 gate)
- ★**실 live auth 전환**(logins.txt 실 raw → hash 이관·실 로그인 경로 교체) = **후속 gate**(별도 승인). **prod secret**(P3 secret prod 주입)·**subject_ref backfill** = **M6-F**. **main merge / prod deploy** = 별도 승인. Foundation durable customer memory · cross-service memory · hard reject · repair/mapping/backfill = 금지.

## 3. auth / keyed-hash plan
- **de-id 대체값:** `phash_v2_ = HMAC(SIASIU_P3_AUTH_SECRET, <identifier>)[:32]`(email/name/phone). 원문 미보존·역추적 불가·per-secret 상이(correlator 방지).
- **통합 방식(설계·미배선):**
  1. **신규 로그인:** identifier 저장 시 **hash 병행**(평문 대신 hash·또는 hash+최소필요 평문은 at-rest 암호화·B5 별도).
  2. **기존 logins.txt(grandfather):** 실 이관(raw→hash)은 **후속 gate**(별도 승인·backup 선행·raw 미출력). M6-D는 **미이관**(설계·검증만).
  3. **secret:** dev fallback(shadow)·**prod secret = M6-F**(prod 주입·rotation·Vault).
- **login/session 무변경:** de-id는 저장 표현만 변경·인증 로직(비교)은 hash 기준으로 동작하도록 설계(로그인 성공/실패 동작 불변).

## 4. raw / PII boundary
- ★**logins.txt raw email/name 미노출:** M6-D는 실 logins.txt를 **읽거나 출력하지 않는다**(shadow util은 caller synthetic record만·`open()` 0). 검증 evidence = count/hash/boolean만·raw 미출력.
- keyed-hash 출력도 원문 미포함(phash_v2_)·per-secret. ★raw payload/PII/원문 로그 0.

## 5. non-prod validation plan
- **synthetic login record**(PII 아님·합성)로: ① de-id transform(평문 email/name/phone 제거·hash 대체·`plaintext_identifier_remaining=0`) ② 로그인 인증 시뮬(hash 기준 성공/실패 동작 = 기존과 동일) ③ session/consult 흐름 회귀(integration 39/39·workflow 119/119·fingerprint `d7f579443f8a110a` 유지).
- ★**실 logins.txt/실 사용자 계정 미접근.** evidence = count/boolean(applied_to_real_logins=False·live_auth_changed=False).

## 6. rollback plan
- **flag OFF:** live 전환 flag(default OFF) → 기존 auth 경로 100% 동일(shadow/prep는 inert).
- **rollback:** util/통합 코드 revert(shadow 브랜치)·main 무영향(미merge). 실 이관은 M6-D 범위 밖이라 이관 rollback 불요(backup은 이관 gate에서).
- **kill-switch:** 이상 시 flag OFF → 기존 login/session 즉시 복귀.

## 7. STOP 조건 (M6-D 중·발생 시 즉시 중단·보고)
- logins.txt raw email/name 열람 또는 출력 · prod secret 사용 · subject_ref backfill · **실 live auth 전환 시도** · prod DB 접근 · repair/mapping/backfill · hard reject · main merge · Foundation durable customer memory 생성 · cross-service memory · login/session/consult 회귀(integration/workflow/fingerprint 변화) · answer.py 변경.

## 8. remaining watch
- **실 live auth 전환(logins.txt 실 이관):** 후속 gate(별도 승인·backup 선행·raw 미출력·prod secret=M6-F 선결).
- **at-rest 암호화(B5):** hash 외 최소 평문 보존이 필요하면 at-rest 암호화 별도(B5·별도 승인).
- **prod secret/subject_ref chain:** M6-F.
- **기존 watch 유지:** prisma baseline drift · runner 선재 6건 · FU-2 라이브화 · M6-C 라이브 실 트래픽.

## 9. approval boundary
> **[요청]** 위 M6-D(**SIASIU P3 keyed-hash auth live-PREP**·통합 설계 + shadow/non-prod 검증)의 **execution 승인**을 요청합니다.
> **[이 승인의 의미]** synthetic/non-prod에서 de-identification 통합 설계 검증 + 기존 login/session/consult 회귀 0 확인 자격(실 logins.txt 미열람·live 전환 없음).
> **[이 승인이 아닌 것]** **실 live auth 전환**(logins.txt 실 이관·실 로그인 경로 교체) · **prod secret** · **subject_ref backfill** · prod DB · repair/mapping/backfill · hard reject · **main merge / prod deploy** · durable memory · cross-service = **어느 것도 승인하지 않습니다.**
> **[승인 이후 원칙]** live-prep 검증 PASS여도 **실 live auth 전환·prod secret(M6-F)·main merge는 각 별도 gate·별도 Leo 승인.**
> **[선택지]** ① M6-D execution 승인 → shadow/non-prod live-prep 검증·Control 검증 · ② 계획 보강 후 재검토 · ③ hold.

## 무결성
M6-D 실행 승인 요청 package only · **작성 = 실행 아님** · logins.txt raw 출력 0 · prod secret 0 · subject_ref backfill 0 · **실 live auth 전환 0** · prod DB 0 · repair/mapping/backfill 0 · hard reject 0 · **product repo main merge 0** · schema code main merge 0 · Foundation durable customer memory 0 · cross-service 0 · 본 package만 foundation-docs commit/push · **M6-D 실행은 Leo 별도 승인 후.**
