# Memory V1 — Goal 4 / M6-F Fable5 EXTERNAL Strict Review (prod secret / subject_ref chain)

> 검증자: **Fable5** (외부·독립·엄격·적대적) · 2026-07-05 · **판정: PATCH_REQUIRED**
> ★**관계:** 이 문서는 Control-invoke 독립 검수(`..._M6_F_STRICT_REVIEW_20260705.md`·`ca60b80`)와 **별개의 외부 corroboration**이다(그 문서가 "외부 Fable5 corroboration 별도 가능"이라 명시). 같은 파일을 덮어쓰지 않고 별도 기록. **핵심 3건(C-1/C-2/C-3) corroborate + 추가 발견/이견 명시.**
> 대상: foundation-docs 원격 **`20190fb2`**(origin/main 조상 확인)·`docs/reports/control/FOUNDATION_MEMORY_ARCHITECTURE_V1_M6_F_GOAL_PACKAGE_20260705.md`
> 방법: package 직접 판독 + 2축 적대 검수(chain/secret/rotation·backfill/boundaries) + 실코드 대조(FOUNDATION `c9bb996` subject_identity/api/_factory · SIASIU shadow adapter/flags/schema · Cosmile `3ba91e0` furef · M2 §3.9/§3.5 · identity policy `20260703`)
> 무결성: 코드 수정 0 · 실행 0 · push 0(본 리뷰만) · secret 값 열람/출력 0 · Restricted Actions 13종 실행 승인 아님

---

## 1. Verdict: **PATCH_REQUIRED** (Control-invoke 검수와 verdict 일치·근거 확장)

chain 표기(§2)는 코드·표준과 일치하고 경계 코드(durable/cross-service 0·raw/PII 출력 0)는 fail-closed로 견고하다. 그러나 M6-F의 존재 이유인 **backfill/secret 실행 조건**이 execution-gate로서 미완이다. Control-invoke 검수의 C-1/C-2/C-3을 **독립 재현(corroborate)** 했고, 그 위에 **backfill 게이트·secret 유출 경계에서 추가 FAIL과 이견**을 제시한다.

## 2. Control-invoke 검수와의 대조 (corroborate / 추가 / 이견)

| Control-invoke 검수 | 본 외부 검수 | 관계 |
|---|---|---|
| C-1 SIASIU adapter 단일레이어 mint | **C-4 split-brain** 동일 근거 | ✅ corroborate |
| C-2 rotation 비가역·version optional | **C-1 key-version 필수** 동일 | ✅ corroborate |
| C-3 서비스 dev-fallback fail-closed 부재 | **C-5 dev fallback fail-open** 동일 | ✅ corroborate |
| item 7 backfill = **PASS(strict)** | **FAIL — 검증기준 전무·M4보다 약함** | ⚠ **이견** |
| secret boundary(item 2) = **PASS** | **FAIL — SubjectRefMap 매핑으로 서비스secret+DB 전체인 역추적** | ⚠ **이견** |
| item 4 correlation = PASS+WATCH | **RISK — 양 furef 역산 상관·정책서 정직성 미계승** | ⚠ 강도 상향 |
| (env 분리 PASS) | **2a per-service secret 미정본**(동일 env명·공유 가능) | ➕ 추가 |
| W-2 local_user_ref echo | **R9-1 M2 v1.2에서 필드 제거됨**(legacy 폐기 미언급) | ➕ 각도 추가 |
| — | **파생 흐름(identity-touch oracle) 미정의**·**reason_codes 예외통과**·**secret 확정≠주입 순서**·**Control invoke 자구** | ➕ 신규 |

## 3. Critical findings (실행 전 필수)

- **[C-1·key-version 부재]** `subj_v2_`는 스킴 버전이지 secret/key 버전 아님. SubjectRefMap(§3.9)·SIASIU `subject_ref_map` 어디에도 `secret_version` 없음 → backfill 후 rotation 시 신·구 값 prefix 동일로 **식별 불가·재계산 봉인**. §4는 이를 선택지로만 둠 → **backfill 필수 선결로 격상.** (= Control C-2 corroborate·격상 요구)
- **[C-2·backfill이 더 위험한데 더 약한 게이트 — 이견]** §5 5조건에 **검증/수용 기준 전무**(전후 NULL count·row count·idempotency·부분실패 rollback·복원 리허설). 저위험 M4 additive migration은 §7에서 row count/checksum+복원 리허설 요구 — **역전.** Control-invoke는 item 7을 PASS(strict)로 봤으나, "조건 나열"과 "검증 기준"은 다르며 backfill은 비가역이라 M4 이상 게이트가 필요하다고 판단한다.
- **[C-3·guest-only row 미제외 — 강도 이견]** M2 §3.5 `subject_key=COALESCE(subject_ref,guest_ref)`: guest_ref-only row는 furef 부재로 backfill 대상 아님·NULL 정상(§N-5 병합만). §5 "NULL→계산·기록" 무차별 → guest 오염·미동의 병합 위반. Control-invoke는 W-3(minor)로 뒀으나 **미동의 병합 위반 가능성**이라 FAIL로 본다.
- **[C-4·shadow split-brain]** SIASIU adapter가 subj_v2_를 자체 secret·`"siasiu:local_user:<ref>"`·furef 미경유로 mint → 같은 prefix 두 생성기. §2 "정본 secret 경로 연결"은 secret 주입이 아니라 **파생 함수 교체** 문제 은폐. (= Control C-1 corroborate)
- **[C-5·dev fallback fail-open]** SIASIU shadow secret 3종(MEMORY_CANDIDATE·P3·P3_AUTH) = `env or 하드코딩` fail-open·`_is_production` guard 없음 → prod에서 env 미주입+flag ON이면 소스 공개 dev secret(열거 가능) 발급. 유일 차단 = flag 기본 OFF(정책적). (= Control C-3 corroborate)

## 4. Chain correctness — PASS(표기)/FAIL(파생 흐름)

✅ §2 = `subject_identity.py:88-89`·`:81-87`(require_furef_v2·prod fail-closed)·`:92-95`(bridge)와 자구 일치·Cosmile/SIASIU furef 표기 정본 일치. ❌ **파생 흐름 미정의:** §3 "Foundation secret = Foundation-only" + §2 "생성기 = resolve_subject" + M2 §3.9 "subject_ref service-local·미전송·no-broker"가 양립하려면 서비스가 furef를 Foundation에 보내 subject_ref 회수하는 **identity-touch API(derivation oracle)** 든가 secret 공유(§3 위반)든가인데 **둘 다 미정의** — shadow 로컬 자체 파생이 그 물증(C-4).

## 5. Secret boundary — FAIL/RISK (이견 포함)

- ❌ **[유출 주장 과장·이견]** §3 "한 secret 유출이 전 체인 역추적 안 됨"은 **틀림** — M2 §3.9 SubjectRefMap이 furef↔subject_ref를 서비스 DB에 실체화하므로 **서비스 secret 1건 유출+서비스 DB 접근**이면 Foundation secret 없이 `stable_id→furef(사전계산)→SubjectRefMap→subject_ref→memory` 전 체인 역추적. 2-layer 방어는 **매핑 미접근 공격자에게만** 성립 — 전제 미명시. (Control-invoke는 env 분리만 보고 PASS)
- ⚠ **[per-service secret 미정본]** §2/§3이 `FOUNDATION_USER_REF_SECRET` per-service를 기정사실화하나 정본 정책서는 **단일 env명**만 정의·양 서비스 동일 env명 read → 공유 배포 가능. M6-F가 per-service 상이 값 배포를 **신규 요구로 명시·집행** 필요.

## 6. Rotation / orphan — FAIL

C-1(key-version)에 더해 **[5a·서비스 secret rotation도 re-keying]**: §4는 Foundation secret만 전면 re-key로 보고 service secret을 "furef 재계산"으로 축소하나 `subj_v2=HMAC(F,furef)` 합성상 **서비스 secret rotation도 그 서비스 전 subj_v2 연쇄 변경 → memory row·SubjectRefMap orphan.** 두 축 모두 re-key 축 명시 필요(정본 정책서 이중계층 rotation 지적을 절반만 계승).

## 7. Backfill-condition — FAIL (최약 지점)

C-2·C-3에 더해: furef 획득 경로 미정의(기존 NULL row는 furef 미보유) · SubjectRefMap 매핑 저장(가명 PII) 범위·거버넌스 미언급 · 대상 repo/테이블 미열거. ✅ M4 §6(NULL 유지·단일)과 정합 자체는 유지.

## 8. Durable / cross-service — PASS(코드)/RISK(잔여)

✅ §6 = 코드 부합(subject_identity 순수함수·store `memory_db_created=False`·eval `cross_service_read_blocked_without_consent`). ⚠ **[correlation 잔여]** §2 "correlation 방지" 단정 — 정본 정책서 스스로 "namespace 격리로 cross-service 불가 = crypto 과대주장(양 furef 역산→id 복원→외부 graph join)"이라 정정했는데 package **미계승.** 실제 차단선 = consent fail-closed·flag OFF·gate(secret 구조 아님).

## 9. Raw / PII — PASS(chain)/RISK(legacy 필드)

✅ subject_identity 예외 = 상수 문자열·ref 값 미포함·`_looks_pii` 가드. ⚠ **[R9-1]** `local_user_ref`가 **M2 v1.2 정본 계약에서 제거(0회)**됐는데 SIASIU adapter/FOUNDATION _factory 산출 dict에 잔존 → 서비스→Foundation 경계 출력 표면 — package가 legacy 필드 폐기 미언급. ⚠ **[R8-2]** `api.py` `reason_codes:[str(e)]` 예외 통과 — 현재 상수라 안전하나 향후 값 포함 시 노출되는 구조적 취약(상수 enum 가드 미요구).

## 10. Execution-boundary — PASS(선언)/RISK(자구)

✅ Restricted Actions 13종 전수 미승인/금지 명시·계획 언어 은닉 없음. ⚠ **[R10-1]** §8 "prod secret 주입·backfill 각 독립"이나 **독립 아님**(backfill은 secret 주입 완료 필수)·§5 조건1 "확정"(값 결정)≠"주입 완료" → dev 환경 secret backfill 해석 여지. ⚠ **[R10-2]** §9 "(또는 Control invoke)"가 critical gate review trigger 권한 소재 흐림 — 삭제/"Leo 승인 하 대행" 고정 권고.

## 11. Required patches / watch (문서 패치·실행 지시 아님)

**PATCH (execution 근거 전 필수):** ① §5 key-version 필수 선결(C-1) ② §5 backfill 검증기준 M4 §7 이상(C-2) ③ §5 guest-only row 제외(C-3) ④ §2 shadow 생성기 정본 chain 교체(C-4·split-brain) ⑤ §4 서비스 secret 3종 구조적 prod fail-closed(C-5) ⑥ §4 서비스 secret도 re-key 축 명시(5a) ⑦ §5 furef 획득 경로+SubjectRefMap 매핑 범위/거버넌스+대상 테이블 열거 ⑧ §3 파생 흐름(identity-touch API 여부) 정의 ⑨ §3 유출 주장 정정(매핑 접근 전제) ⑩ §2 correlation 잔여 정직화.
**WATCH (execution gate):** R8-2 reason-code enum 가드 · R9-1 legacy `local_user_ref` 폐기 · R10-1 순서 의존 자구 · R10-2 Control invoke 자구 · per-service secret 값 분리 배포 집행.

## 12. Final recommendation

**PATCH_REQUIRED** — Control-invoke 검수와 **verdict 일치**, 근거 확장. package는 설계-전용으로 정직히 gate됐고 정본 생성기는 강한 fail-closed·PII-reject 2-layer다. 그러나 critical identity/secret gate의 실행 근거로는 §5 backfill(검증기준 전무·guest 미제외·범위 미정의)과 §4 rotation(key-version 없음·서비스축 누락)이 미완이고, 서비스 secret+SubjectRefMap 유출 경로·shadow split-brain·dev fail-open이 열려 있다. §11 PATCH 10건(전부 문서-레벨)을 반영 후 재검토하라. **어떤 실행(prod secret 주입·backfill·main merge)도 미승인이며, 이 리뷰는 그 승인이 아니다.**

---
> **한 줄 결론:** 사슬 모양은 정확하지만 되돌릴 손잡이(key-version)가 없고, 한 고리는 다른 대장장이(shadow adapter)가 몰래 두드리며, 창고 열쇠(service secret)를 훔치면 지도(SubjectRefMap)로 전부 추적된다 — backfill 망치를 들기 전에 이 셋부터.
