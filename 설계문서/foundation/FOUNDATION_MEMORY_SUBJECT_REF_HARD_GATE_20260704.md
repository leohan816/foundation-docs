# FOUNDATION MEMORY subject_ref HARD GATE — 설계서 (design-first)

> 작성: foundation-control / Foundation Memory 담당 · 2026-07-04 · **상태: DESIGN(구현 전 설계·이후 patch)**
> 대상 repo: FOUNDATION (`foundation/shared_memory/`) · HEAD `b7cce1f` · ★Memory live ON 안 함 · source repo push 0(local commit만) · foundation-docs push 허용.
> 근거: FOUNDATION_USER_REF_V2_FINAL_PARITY_CHECK(E차원 PATCH_REQUIRED) · FOUNDATION_COMMON_IDENTITY_REF_POLICY(APPROVED_CANDIDATE).
> ★**[OPTION A MINT SUPERSEDED — 2026-07-06 P11]** 본 문서의 Foundation-side mint(`key = FOUNDATION_SUBJECT_REF_SECRET`·resolve_subject 발급)는 **Option B로 대체됨** — 정본: `OPTION_B_SUBJECT_REF_CONTRACT_20260705.md`(service-local mint·Foundation은 validate/gate only·mint 코드 제거됨). V3는 Option A를 상속하지 않는다.
> ★원문은 이력 보존용으로 유지(삭제 0). (Fable review bd01ba1 P11)

## A. 현재 문제 요약
Memory live 전 반드시 닫아야 할 subject_ref hard gate 5건(read-only 실측·`subject_identity.py`):
1. **subject_ref 절단 64-bit**: `subj_ + sha256(...)[:16]`(L39) — v2 표준 128-bit 위반. 실 memory key라 birthday ~2^32에서 cross-user 오염(=§8 STOP).
2. **`_SALT` 하드코딩 DEV 기본값**(L14): `env("FOUNDATION_SHADOW_MEMORY_SALT","..._DEV_ONLY")` — secret 부재 시 조용히 약한 salt로 degrade.
3. **production fail-closed 부재**: secret/salt 없어도 subject_ref 발급.
4. **incoming foundation_user_ref → local_user_ref → subject_ref bridge 미구현**·형식 검증 없음.
5. **Memory live 전 regression 부족**(형식·fail-closed·bridge·PII 매트릭스 미비).

## B. current subject_ref 생성 방식 분석
- `subject_identity.py:39`: `h = sha256("%s|%s|%s"%(_SALT, source_service, local_user_ref))`; `return "subj_"+h[:16]`.
- 속성: salted plain SHA256·64-bit·source_service 포함·PII reject(L35)·consent fail-closed(L37). secret은 `_SALT`(env, 하드코딩 default).
- 호출자: `_factory.make_candidate/make_signal`(테스트 전용·synthetic ref), `api.resolve_subject`(flag-gated). subject_ref는 `store._store` dict key + `gate` 동등비교로 **opaque 사용**(형식 미검증) → 형식 변경 안전.

## C. v2 목표 구조
```
local_user_ref  := incoming foundation_user_ref            # furef_v2_<32hex> 필수
subject_ref      = "subj_v2_" + HMAC_SHA256(
                     key = FOUNDATION_SUBJECT_REF_SECRET,   # Foundation-side server secret
                     msg = local_user_ref
                   ).hexdigest()[:32]                       # 128-bit
```
- **subj_v2_ prefix·128-bit(32 hex)·Foundation-side HMAC**(furef의 서비스 secret과 독립된 2차 계층).
- ★**msg = local_user_ref**(spec 준수). 서비스 격리는 **furef가 이미 `"<service>:<type>:<id>"`로 namespaced**이므로 subject_ref=HMAC(secret, furef)가 서비스별로 자동 분리(상속). `source_service` param은 유지하되 hash msg에 미포함(furef가 이미 인코딩 — 이중 인코딩 회피·spec 일치).

## D. incoming foundation_user_ref 처리 경로
```
service(SIASIU/Cosmile)  furef_v2 생성(HMAC, service-side secret)
   → SSC.service_context.foundation_user_ref (opaque furef만·raw PII 0)
   → POST /v1/consult_contract
   → [Memory live train에서 배선] consult → memory bridge:
        local_user_ref := foundation_user_ref            # byte-for-byte
        validate is_furef_v2(local_user_ref)             # 아니면 fail-closed
        subject_ref = resolve_subject(..., require_furef_v2=True)
```
- ★이번 블록: **shared_memory 계층의 gate(형식검증·subject_ref v2·fail-closed·bridge 함수)만** 구현. consult core 실배선은 **Memory live release train**(flag OFF 유지).

## E. local_user_ref 정의
- `local_user_ref` = 서비스가 보낸 **`foundation_user_ref`(byte-for-byte 동일)**.
- 형식 = **`furef_v2_<32 hex>`**(정규식 `^furef_v2_[0-9a-f]{32}$`). 아니면 bridge에서 **reject(fail-closed / memory-disabled)**.
- raw email/name/phone/user_id/customer_id/order_id/payment_id/address = local_user_ref로 **금지**(PII 패턴 reject + furef_v2 형식 강제로 이중 차단).

## F. subject_ref 생성 규칙
- `subject_ref = "subj_v2_" + hmac_sha256(FOUNDATION_SUBJECT_REF_SECRET, local_user_ref)[:32]`.
- deterministic(같은 furef+같은 secret → 같은 subject_ref) · opaque(입력 미echo) · one-way(secret 없이 재현 불가).
- `require_furef_v2=True`(bridge)면 furef_v2 형식 아닌 local_user_ref는 reject. `False`(shadow synthetic 테스트)면 형식 무관(단 secret은 여전히 필요).

## G. secret / _SALT 정책
- **`FOUNDATION_SUBJECT_REF_SECRET`** = Foundation-side server secret(secret store). **값은 로그/문서/테스트/trace 어디에도 출력 0.**
- **하드코딩 prod 기본값 금지**: `_SALT` 하드코딩 DEV default를 **live 도출 경로에서 제거**.
- **dev/test fallback**: secret 부재 시, **non-production + `FOUNDATION_SUBJECT_REF_DEV_FALLBACK=1` 명시**일 때만 dev-only fallback key(코드 내 non-secret placeholder·prod 도달 불가). 그 외 = fail-closed.
- plain SHA256 fallback = production 금지(HMAC only).

## H. production fail-closed 정책
- `_is_production()`: `FOUNDATION_ENV` unset/unknown → **production(fail-safe)**. dev/test/local/shadow만 non-prod.
- production + secret 부재 → **`SubjectRefSecretMissing`(ValueError 하위) raise → api가 fail-closed 응답**(`subject_ref=None, linked=False, reason_codes=["...secret missing..."]`·값 미출력).
- bridge에서 malformed/non-furef_v2/v1 furef → **reject(fail-closed)**. mock/fake/약한 해시 대체 **금지**.

## I. Memory live 전/후 영향
- **현재(flag OFF)**: `shared_memory_v0_shadow=False` · `write_live=False` · `applied_to_real_user=False` · `memory_db_created=False` · `_store` 휘발성. → **런타임 영향 0**(api OFF면 inert). 이 gate는 **live 전 안전판**.
- **live 후**: subject_ref가 canonical memory key → 이 gate가 128-bit·secret·furef_v2 형식을 보장해야 cross-user 오염·enumeration·format drift 방지.

## J. PII / secret / log / trace 금지 규칙
- local_user_ref PII 패턴(email/phone/RRN) reject(유지) + furef_v2 형식 강제(raw id 진입 차단).
- subject_ref는 **opaque**(입력 furef/secret 미echo). secret 값 **출력 0**.
- trace_id ↔ raw id 결합 **금지**: subject_identity는 trace를 취급하지 않음(축 분리). subject_ref/local_user_ref만 다룸.
- raw PII 저장 0(불변 유지)·raw_text_stored=False.

## K. regression test matrix (신규 `tests/test_subject_ref_v2_hard_gate.py`)
same furef_v2→same subject_ref · different→different · malformed reject · v1 furef_ reject(bridge) · raw email/phone reject · raw user_id/customer_id(비-furef_v2) reject(bridge) · prefix subj_v2_ · 32 hex · **prod secret missing→fail-closed** · dev fallback은 명시 flag only · secret 값 미로그 · raw PII 미로그 · trace_id↔raw id 미결합 · **Memory write 0/off 유지** · 기존 consult_contract smoke pass · SIASIU/Cosmile furef_v2 payload 호환(샘플 furef_v2 accept).
- 기존 회귀 유지: shared_memory eval · `tests/test_shared_memory_v0.py`(dev fallback env 추가) · foundation_http_service consult_contract.

## L. rollback 전략
- 코드 패치이나 **flag OFF**라 즉시 무력화(api inert). subject_ref 형식 변경은 **memory write 0**이라 orphan/migration 0.
- rollback = FOUNDATION local commit `git revert`(local·push 0). consult_contract 미접촉이라 서비스 영향 0.

## M. migration 필요 여부
- ★**현재 Memory write = 0**: `memory_db_created=False`·`write_live=False`·`_store` 휘발성·flag OFF → **저장된 subject_ref = 0** → **migration 불필요**(판정: NO migration).
- (참고) live 후 알고리즘/길이 변경은 재키잉 migration 필요 — 그래서 **live 전 지금 확정**이 정답(전환 비용 0).

## N. 남은 WATCH
- consult core furef→local_user_ref **실배선**은 Memory live release train(이번은 계층 gate·bridge 함수만).
- `_SALT` 잔존 참조 정리(하드코딩 default 제거 후 dead 여부 확인).
- SIASIU/Cosmile furef stable_id preimage(email/name) = 서비스측 WATCH(별도).
- prod `FOUNDATION_SUBJECT_REF_SECRET` **배포 필요**(미배포 시 prod fail-closed·안전).
- Fable5 targeted re-review(hard gate 구현 후).

## 무결성
- SIASIU/Cosmile 수정 0 · Foundation Memory live ON 0 · DB migration 0 · raw PII 저장 0 · secret 값 출력 0 · source push 0(local commit만).
