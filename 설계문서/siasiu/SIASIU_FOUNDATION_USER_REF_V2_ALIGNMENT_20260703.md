# SIASIU foundation_user_ref v2 — Alignment Patch — 상태: **PASS**

> 작성: 샤슈(SIASIU) · 2026-07-03 · ★small patch(코드 변경 있음)·SIASIU push 0(local commit만)·foundation-docs mirror push.
> SIASIU baseline `a538c68`. Foundation Memory live 전 → migration 부담 낮음.

## A. Verdict: **PASS**
foundation_user_ref v2(HMAC-SHA256·subject_type·32hex·prod fail-closed)로 수렴. raw PII 미전송·memory 미주입·brain fallback 복구 0 유지. 테스트 전부 PASS.

## B. 변경 파일 (SIASIU repo만)
- `app/adapters/provider_flag.py` — foundation_user_ref v2 + FoundationRefSecretMissing + _ref_secret/_subject_type
- `app/adapters/consult_via_foundation.py` — ref secret 없음(prod) → fail-closed(brain 0)
- `app/tests/test_cutover_01.py` — v2 assertions(prefix/length/subject_type/secret-keyed/prod fail-closed)
- `app/tests/test_dual_adapter_02a.py` — 테스트용 ref secret setdefault
- ★무변경: brain.py·answer.py·server.py·Foundation·Cosmile·DB

## C. local commit hash
(실행 결과 기재)

## D. v2 생성 방식
```
foundation_user_ref = "furef_v2_" + HMAC-SHA256(
    key = FOUNDATION_USER_REF_SECRET,
    msg = "siasiu:<subject_type>:<stable_internal_subject_id>"
).hexdigest()[:32]
```
- **furef_v2_ prefix**(v1 furef_ 와 구분) · **32 hex**(128-bit) · **subject_type = user|guest** · **namespace = siasiu** · **secret-keyed HMAC**(plain SHA256 rainbow 방지) · deterministic.
- v1(`furef_`+plain sha256[:16]·64-bit)과 명확히 구분.

## E. production secret missing 처리
- `FOUNDATION_USER_REF_SECRET` 없고 production(SIASIU_ENV 미설정/unknown/production)이면 → **`FoundationRefSecretMissing` raise → consult가 fail-closed**(502 `foundation_unavailable`·suppression_reasons=`foundation_user_ref_unconfigured`·brain/mock 0·PII 0·products 0).
- dev/test fallback: **`SIASIU_ENV∈{dev,test,internal}` + `SIASIU_DEV_REF_FALLBACK=1` 명시 시에만** dev 상수 secret 허용(production 사용 금지).
- 테스트 실증: secret 제거+prod → raise + consult fail-closed(brain 0) PASS.

## F. raw PII 미전송 확인
- SSC service_context = `{audience, surface, foundation_user_ref: furef_v2_<32hex>}` · session_context `{}` · metadata 없음.
- payload inspection: `user_id="leo@example.com"` 입력해도 **service_context/session_context에 raw email 미포함**(furef_v2_만). ✅
- ★raw_text(발화)엔 사용자가 타이핑한 원문 포함 가능하나 Foundation `raw_text_stored=False`로 미저장(inherent invariant).
- #5(상위 안정 ID): frontend `userId()`가 email/name 파생 가능하나 **v2 HMAC-secret으로 output이 keyed·비가역**(email이 입력이어도 Foundation은 복원 불가) → v1 대비 PII 위험 크게 완화. *안정 내부 id 사용은 여전히 권장*(상위 세션 정책·WATCH).

## G. memory.db 미주입 확인
`build_ssc` session_context 빈 dict·memory 읽기/주입 코드 0. SSC memory/allergy/avoid 필드 0. ✅ (test: "SSC memory 주입 0" PASS)

## H. Foundation ON/OFF 결과
- ON: source=foundation_http·trace_id non-null·brain 0·safety suppression (LIVE 5/5 + 02A LIVE 24/24).
- OFF: 502 foundation_unavailable + friendly·brain 0·mock 0 (DET + 02A FALLBK 9/9).

## I. 테스트 결과
- `test_cutover_01`: **DET 23/23 + LIVE 5/5 = ALL_PASS** (v2 prefix·32hex·subject_type user≠guest·deterministic·secret-keyed·secret-missing-prod fail-closed·SSC furef_v2_·raw PII 0·memory 0·brain 0).
- `test_dual_adapter_02a`: **LIVE 24/24 + FALLBK 9/9 = ALL_PASS**.
- payload inspection: furef_v2_(32hex)만·raw email 미포함(service/session/metadata).

## J. foundation-docs commit hash
(실행 결과 기재)

## K. SIASIU 코드 push 여부: **0**

## L. 남은 WATCH
1. **FOUNDATION_USER_REF_SECRET 운영 배치**: production 배포 시 secret 주입 필요(없으면 fail-closed로 상담 불가). OPS 항목.
2. **상위 안정 ID 정책(#5)**: frontend `userId()`를 안정 내부 id로(email/name 대신) — v2 HMAC으로 PII 위험은 완화됐으나 안정성/청결 위해 권장(상위 세션·어댑터 아님).
3. **Cosmile v2 통일**: 필드명 foundation_user_ref + furef_v2_ + `"cosmile:"` namespace 이식(Cosmile 담당).
4. SIASIU 미배포(push 0)·다국어/페르소나(CUTOVER-02).
