# Memory V1 — M6-D Execution Result (SIASIU P3 keyed-hash auth live-PREP)

> 작성: foundation-control(Control) · 2026-07-05 · **범위: Leo 조건부 승인 M6-D 실행 결과(SIASIU P3 keyed-hash auth live-PREP·synthetic/non-prod).**
> ★실 live auth 전환 0 · prod secret 0 · subject_ref backfill 0 · logins.txt raw 열람/출력 0 · prod DB 0 · repair/mapping/backfill 0 · hard reject 0 · main merge 0 · durable/cross-service 0 · answer.py 변경 0.
> 근거: M6-D Gate Approval Package(GitHub main `f2cca70`·Leo 조건부 승인).

---

## 1. Fact
- **M6-D = P3 keyed-hash auth live-PREP**(synthetic/non-prod): de-identification 통합 설계 확정 + login/session 시뮬 검증 + 회귀 0. ★**실 logins.txt 미열람·실 live auth 미변경.**
- **핵심 결과:** de-id **plaintext_identifier_remaining=0** · login-flow 시뮬(hash 기준 인증·성공/실패 동작 불변·세션 raw 미포함) · 회귀 0(integration 39/39·workflow 119/119·fingerprint 유지) · flag default OFF·rollback 확인.
- **commit:** SIASIU `shadow/m4-siasiu-memory` **`16b615f`**(push·main 무변경).

## 2. 실행 대상
- **synthetic/non-prod login record만**(PII 아님·합성). ★실 `logins.txt`·실 사용자 계정 **미접근**(P3 모듈 `open()` 0·미배선). 실 live auth 경로 **미변경**.

## 3. keyed-hash auth integration plan (설계 확정)
- **de-id 대체값:** `phash_v2_ = HMAC(SIASIU_P3_AUTH_SECRET, <identifier>)[:32]`(email/name/phone)·원문 미보존·per-secret.
- **login 통합(시뮬로 확정):** stored record는 de-identified(email_hash 등). 로그인 시 입력 identifier를 hash해 **stored_hash와 비교** → 인증. ★**login 동작 불변**(올바른 identifier→성공·틀린 identifier→실패).
- **session 통합:** 세션 = hash 기준(raw identifier 미포함).
- **grandfather:** 기존 logins.txt 실 이관(raw→hash)은 **후속 gate**(별도 승인·backup·raw 미출력). M6-D는 **미이관**.
- **secret:** dev fallback(shadow)·**prod secret = M6-F**.
- **flag:** `SIASIU_P3_LIVE_AUTH_PREP`(default **OFF**·inert·미배선).

## 4. synthetic de-id validation result (count/hash/boolean only)
| 항목 | 결과 |
|---|---|
| de-id transform(email/name/phone 제거·hash 대체) | ✅ 평문 식별자 제거·`<field>_hash` 추가 |
| **plaintext_identifier_remaining** | **0** |
| hash_prefix_ok(phash_v2_) | **True** |
| 불변식 applied_to_real_logins / live_auth_changed | **False / False** |
| login-flow: flag OFF | **inert(None)** |
| login-flow: 올바른 identifier → authenticated | **True**(login 동작 불변) |
| login-flow: 틀린 identifier → authenticated | **False** |
| session hash 기준·raw 미포함 | ✅(`session_key_hashed=True`·`raw_identifier_in_session=False`) |
| P3 auth test | **16/16**(11→16) |

## 5. login/session/consult regression result (회귀 0)
| 항목 | 결과 |
|---|---|
| SIASIU integration | **39/39**(answer_unchanged=True) |
| SIASIU workflow | **119/119**(behavior_changed=0) |
| answer.py fingerprint | **d7f579443f8a110a**(무변경) |
| SIASIU candidate adapter | **26/26** |
- ★P3 live-prep 모듈은 **격리·미배선**(0 live import)이라 기존 login/session/consult/answer 동작 무영향.

## 6. raw / PII boundary evidence
- ★**logins.txt raw email/name 미노출:** P3 모듈 `open()`/파일 read **0** · 실 logins.txt **미열람**(mtime 06-30 무변경) · caller synthetic record만.
- de-id/hash 출력 = **phash_v2_(원문 미포함)** · evidence = count/hash/boolean(raw payload/PII/원문 미출력).

## 7. rollback / flag evidence
- **flag default OFF:** `SIASIU_P3_LIVE_AUTH_PREP` 미설정 시 login-flow 시뮬 **inert(None)** → 기존 auth 100% 동일.
- **rollback:** 모듈/시뮬 revert(shadow 브랜치)·main 무영향(미merge). 실 이관 없음 → 이관 rollback 불요.
- **kill-switch:** flag OFF → 즉시 기존 동작 복귀.

## 8. STOP / 무결성
STOP 위반 **0**(Restricted Actions List 전무): logins.txt raw 열람/출력 0 · prod secret 0 · subject_ref backfill 0 · **실 live auth 전환 0** · prod DB 0 · repair/mapping/backfill 0 · hard reject 0 · **product repo main merge 0**(main 3cd068d) · schema code main merge 0 · Foundation durable customer memory 0 · cross-service 0 · **answer.py 변경 0** · login/session/consult 회귀 0.

## 9. remaining watch
- **실 live auth 전환(logins.txt 실 이관):** 후속 gate(별도 승인·backup 선행·raw 미출력·prod secret=M6-F 선결).
- **at-rest 암호화(B5):** 최소 평문 보존 필요 시 별도(B5·별도 승인).
- **prod secret / subject_ref chain:** M6-F.
- **기존 watch 유지:** prisma baseline drift · runner 선재 6건 · FU-2 라이브화 · M6-C 라이브 실 트래픽.

## 10. M6-E 또는 M6-F 진입 가능 여부
- ★**M6-D live-prep 검증 완료**: de-id(plaintext 0)·login-flow(동작 불변)·회귀 0·flag OFF/rollback. auth de-id 통합 설계 **검증 완료**.
- **M6-E(Cosmile live emit)·M6-F(prod secret/subject_ref chain)·M6-G(hard reject)·M6-H(final) = 각 별도 gate·별도 Leo 승인.**
- ★**실 live auth 전환·prod secret(M6-F)·subject_ref backfill·main merge = 승인 아님**(각 별도 gate).

## 무결성
M6-D = SIASIU P3 keyed-hash auth live-PREP(synthetic/non-prod) only · 실 live auth 전환 0 · prod secret 0 · subject_ref backfill 0 · logins.txt raw 열람/출력 0(미열람·06-30 무변경) · prod DB 0 · repair/mapping/backfill 0 · hard reject 0 · **main merge 0**(3cd068d) · schema code main merge 0 · durable/cross-service 0 · answer.py 무변경 · 서버 잔여 0 · 본 result report만 foundation-docs commit/push · **M6-E/M6-F 등 다음 gate는 각 별도 Leo 승인.**
