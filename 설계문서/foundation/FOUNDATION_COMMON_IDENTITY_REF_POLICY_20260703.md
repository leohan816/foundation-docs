# FOUNDATION_COMMON_IDENTITY_REF_POLICY_20260703

> **상태: APPROVED_CANDIDATE (v2 표준 확정 · Leo 2026-07-03 · 구현 train 승인 대기)**
> **문서 종류: 정본 정책 설계서 (design-only)**
> **코드 수정: 0 — 이 문서는 코드·contract 코드를 바꾸지 않는다. 정책/계약 서술만 한다.**
> **작성 주체: foundation-control (관제 / control tower)**
> **버전: v1.0 · 2026-07-03 (v2 표준 FINALIZE — v0.2 + Leo 확정 12항 반영·용어 pseudonymous 통일)**
> **release train 단계: 설계 → **v2 표준 확정(현 단계)** → 구현 train 승인 → repo-local 구현 → cross-project regression → report**
> **명명 규약 주의:** Design-First 규칙(§2.6)상 정본 위치는 `설계자료/20260703_FOUNDATION_COMMON_IDENTITY_REF_설계서.md`이며, 본 파일명은 배포 편의상 유지한다. 승인 시 규약 경로로 이동한다(부록 §P 참조).

## 목적

세 프로젝트(Foundation / SIASIU / Cosmile)가 Foundation을 호출할 때 사용자를 **어떻게 식별하는가**를 하나의 공통 정책으로 고정한다. 핵심 결론:

- 모든 서비스는 Foundation 호출 시 **service-scoped · deterministic한 `foundation_user_ref`** 를 전송한다.
- Foundation에는 **실제 고객 raw 정보(직접 식별자)를 저장·전송하지 않는다.**
- **정직한 재분류:** `foundation_user_ref`(이하 `furef`)는 **익명 토큰이 아니라 가명(pseudonym)** 이다. secret 없는 plain SHA256 경로에서는 **열거(enumeration)로 원본 id 복원이 가능**하므로, furef는 **가명화된 개인정보(pseudonymous personal data)** 로 취급한다(삭제·보존·동의 대상).
- furef는 **서비스별 namespace를 포함**하지만, namespace는 **공개 파라미터**일 뿐 enumeration 저항을 주지 않는다. 실무적 역추적 저항은 **HMAC-SHA256 + server-side secret** 경로에서만 근사된다.
- **cross-service 동일인 매칭은 이 문서 범위가 아니다.** 단, Foundation은 이미 **consent-gated shadow 매핑 primitive(`resolve_subject`)** 를 보유하므로, "구조적으로 불가능"이 아니라 **"consent fail-closed·flag OFF로 차단 중"** 이 정확한 표현이다(§J).

## 정합 근거 (2026-07-03 read-only 재검증 — v0.1의 stale fact base 정정)

> ★v0.1 초안은 "Cosmile anonymous", "Foundation Memory 미도입", commit `7cf53e8`을 사실로 기술했으나 **세 항목 모두 코드와 배치된다.** CLAUDE.md §1(행동 진실)·§1.5(baseline 먼저 읽기)에 따라 아래로 정정한다.

- **SIASIU (구현·LIVE, CUTOVER-01):** `SIASIU/app/adapters/provider_flag.py:21-23`
  `def foundation_user_ref(user_id)` → `return "furef_" + sha256("siasiu:" + str(user_id)).hexdigest()[:16]`
  = **16 hex(64-bit) · plain SHA256 · secret 없음.**
  전송 경로 `SIASIU/app/adapters/siasiu_semantic_adapter.py:24` (`build_ssc` payload에 `"foundation_user_ref": ...`만, raw `user_id/name/phone/email` 미전송).
  ★**discrepancy:** provider_flag.py:22 docstring이 "역산 불가"라고 주장하나, secretless SHA256 + 열거 가능 id에서는 **부정확**하다(§F-2·§L 정정 대상).
- **Cosmile (★이미 furef 전송 — anonymous 아님):** `Cosmile/app/src/app/api/slice/consult-foundation/route.ts:42-43`
  `const userRef = foundationUserRef(await getShopper())` → `createBaseSsc({... foundationUserRef: userRef})`.
  생성기 `Cosmile/app/src/lib/foundation/foundationUserRef.ts:8-16`:
  `"furef_" + (secret ? HMAC_SHA256 : SHA256)("cosmile:" + (userId ?? guestId)).slice(0,32)`
  = **32 hex(128-bit) · secret 있으면 HMAC-SHA256, 없으면 SHA256(fail-open).** 식별자 없으면 `null`(no-subject consult = 사용자 미식별 유지).
  클라이언트 타입 `Cosmile/app/src/adapters/foundationClient.ts:29`에 `foundation_user_ref?: string`, `:51`에 `trace_id?: string` 존재.
  ★**join 위험:** `Cosmile/app/src/lib/events/foundationDecisionEvent.ts:64,77,79` — canonical event가 `foundation_trace_id`를 **raw `customer_id: userId` · `anonymous_id: guestId`와 같은 레코드에** 기록한다(§D·§K de-anon 축).
- **★현재 이미 존재하는 divergence:** SIASIU = **16 hex / plain SHA256**, Cosmile = **32 hex / 조건부 HMAC**. 길이·알고리즘이 **이미 어긋나 있다.** "통일"은 미래 목표가 아니라 **이미 벌어진 격차의 수렴 결정**이다.
- **Foundation Shared Memory v0 (★이미 존재 — shadow, flag OFF, commit `b7cce1f` "control-tower approved"):** `FOUNDATION/foundation/shared_memory/`
  - `subject_identity.py:28-40` `resolve_subject(source_service, local_user_ref, consent_record)` → PII 패턴(email/phone/RRN) reject, `consent_record.allow_link is False` → `None`(fail-closed), else `"subj_" + sha256(_SALT | source_service | local_user_ref)[:16]` = **16 hex(64-bit).**
  - `subject_identity.py:14` `_SALT = env("FOUNDATION_SHADOW_MEMORY_SALT", "foundation_shadow_subject_salt_v0_DEV_ONLY")` — ★**하드코딩 DEV 기본값이 소스에 공개**(secret 부재 시 enumeration 저항 붕괴).
  - `store.py:21,62,75,81` `_store = {}  # subject_ref -> [rec]` — **실제 memory key = `subject_ref`** (furef 아님). ingest/read/delete/expire 모두 subject_ref 키.
  - `contract.py:11-38` 필드에 `local_user_ref`·`subject_ref`·`consent_scope`·`retention_policy`·`raw_text_stored` 정의. `CONSENT_SCOPES=(none, same_service, cross_service, foundation_only)`, `RETENTION_POLICIES=(session, short_ttl, standard_ttl, revocable)`, INVARIANTS `raw_text_stored=False·applied_to_real_user=False·write_live=False`, FLAG `shared_memory_v0_shadow` **default OFF**.
  - `gate.py:68-94` `cross_subject_isolation` block · sensitive→ask_consent · consent fail-closed. 정본 계약: `contracts/CROSS_PLATFORM_SHARED_MEMORY_CONTRACT_V0.md`.
- **FRC `trace_id`:** request-scoped 요청마다 unique. 근거는 `FOUNDATION/foundation/api/foundation_core_service.py:21 _trace_id(request_id, payload)`. ★**commit `7cf53e8`은 세 repo 어디에도 없다(삭제).** shared_memory 실제 commit은 `b7cce1f`.
- **결론:** furef(user-scoped·안정)와 trace_id(request-scoped·매번 변함)는 다른 축이며, **실제 memory key는 Foundation-side `subject_ref`**(furef를 `local_user_ref`로 받아 `_SALT`로 재해시)이다.

---

## ★ FUREF v2 표준 (확정 · APPROVED_CANDIDATE · Leo 2026-07-03)

> 아래 12항은 **Foundation Memory live 전에 확정하는 v2 표준**이다. 본 갱신은 v0.2의 "권장/방향"을 **확정 표준(APPROVED_CANDIDATE)** 으로 승격한다. 구현은 승인된 별도 release train에서만 수행하며 이 문서는 코드를 바꾸지 않는다(design-only).

1. 모든 Foundation 호출 서비스는 `foundation_user_ref`를 전송한다(식별자 없으면 명시적 `null` = no-subject consult 허용).
2. `foundation_user_ref`는 raw PII가 아니라 **service-scoped pseudonymous ref**다(★anonymous 아님 — 삭제·보존·동의 lifecycle 대상).
3. **형식:** `furef_v2_<32 hex chars>` (128-bit).
4. **생성:**

```
furef_v2_ + HMAC_SHA256(
    key     = FOUNDATION_USER_REF_SECRET,          # server-side secret · 값 출력 절대 0
    message = "<service>:<subject_type>:<stable_internal_subject_id>"
)[:32]
```

5. **service ∈ { `siasiu` | `cosmile` }** — control-tower reserved registry(`contract.py:19 SOURCE_SERVICES`).
6. **subject_type ∈ { `user` | `guest` }** — 반드시 포함(user↔guest 충돌 방지).
7. **`stable_internal_subject_id`는 `email`/`name`/`phone`/`login_id`/`address`/`order`/`payment`가 아니어야 한다** — 서비스 내부 opaque id만.
8. **production에서 `FOUNDATION_USER_REF_SECRET` 부재 = fail-closed** — ref 발급 거부 + startup assertion + alert.
9. **dev/test fallback(plain SHA256)은 명시적 flag가 있을 때만 허용·production 금지.** plain SHA256 = **표준 미달 / transitional only**.
10. **Foundation Memory canonical key = Foundation-side `subject_ref`**(= `_SALT | service | local_user_ref` 재해시). `foundation_user_ref`는 그 **`local_user_ref` 입력값**이며 byte-for-byte 동일해야 한다(§I).
11. **cross-service identity mapping은 지금 하지 않는다** — 별도 **consent-gated Identity Mapping Layer**에서만(§J).
12. **raw PII는 Foundation Memory / trace / event / log 어디에도 저장하지 않는다.**

★**용어 규약(확정):** furef는 **pseudonymous** identifier다. `"anonymous"`·`"역추적 불가"`로 기술하지 않는다. **secret 기반 HMAC 경로만 enumeration-resistant**이며, secretless plain SHA256은 열거 가능(표준 미달). 상세·근거는 §F, migration 위험은 §M, 미결 구현 결정은 부록 O.

## A. 문제 정의

Foundation은 도메인 무관 core이며, **memory reuse decision·개인화·재현 가능한 판단**을 위해 "이 요청이 어느 사용자에게서 왔는가"를 **안정적으로 구분**해야 한다. 동시에 Foundation은 **고객 raw 직접식별자(PII)를 소유해서는 안 된다.** 따라서:

1. **식별 안정성:** 같은 서비스 안 같은 사용자는 여러 요청에서 **같은 ref로 인식**되어야 한다(memory·개인화·재현의 전제).
2. **직접식별자 비보유:** Foundation은 `login_id / email / phone / name / address / order / payment / customer raw id`를 **받지도 저장하지도 않아야** 한다.

**★정직한 한계(v0.1 대비 강화):** 위 (2)는 "Foundation이 익명"을 뜻하지 않는다. furef는 **가명**이며, secretless 경로에서는 서비스 id 체계를 아는 당사자(Foundation core·memory/trace 접근자)가 **원본 id를 복원**할 수 있다. 즉 furef 저장 = **가명화된 개인정보 저장**이지 "PII 없음"이 아니다. 목표는 "PII 없음"이 아니라 **"직접식별자 비전송 + 가명 식별자의 역추적 저항 극대화 + 삭제/동의 lifecycle 보장"** 이다.

**현재 세 상태(재검증):**

- SIASIU: furef 전송(16-hex plain SHA256, LIVE).
- Cosmile: furef 전송(32-hex 조건부 HMAC, **이미 배포**). anonymous 아님.
- Foundation: SSC consult 경로엔 identity 필드 미정의이나, **shared_memory v0 shadow가 `local_user_ref`→`subject_ref` key derivation을 이미 확정**(flag OFF).

문제는 "식별 유무의 비대칭"이 아니라 **① 알고리즘·절단길이 divergence(16 vs 32, plain vs HMAC), ② furef↔local_user_ref↔subject_ref 축 정합 미정의, ③ secretless fail-open·64-bit 충돌·guest 불연속·rawText PII·trace_id join 등 실 누수 채널의 미처리**다.

## B. 왜 SIASIU/Cosmile의 식별 방식 차이가 장기 위험인가 (v0.1의 "anonymous 비대칭" 프레임 정정)

★v0.1은 "Cosmile은 anonymous라서 memory 켜질 때 터진다"고 했으나, Cosmile은 **이미 furef를 보낸다.** 실제 잔존 위험은 **presence 비대칭이 아니라 표준 비정합**이다:

1. **알고리즘/길이 divergence가 memory continuity를 미리 오염시킨다.** SIASIU 16-hex plain vs Cosmile 32-hex HMAC-capable. 여기에 Foundation이 **subject_ref를 다시 64-bit로 절단**(§I)하므로, Cosmile의 128-bit furef조차 저장 키에서는 64-bit로 재절단된다. 표준을 지금 고정하지 않으면 두 서비스가 서로 다른 continuity 특성으로 memory에 쌓인다.
2. **secretless fail-open이 "역추적 저항"을 조용히 무너뜨린다.** Cosmile은 secret 없으면 plain SHA256으로, Foundation `_SALT`는 하드코딩 DEV 기본값으로 degrade한다. 식별 필요가 커질 때 이 fail-open 경로가 **가장 위험한 열거 창**이 된다.
3. **furef↔local_user_ref↔subject_ref bridge 미정의 = contract drift.** consult 경로 furef와 memory 경로 local_user_ref가 **다른 값이 되면** 재현성 전제가 깨진다. 표준 없이 방치하면 Foundation SSC/shared_memory 두 어휘가 영구 분기한다(관제의 존재 이유가 무너짐).
4. **재현성/감사 불일치.** 알고리즘·길이·salt 계층이 서비스마다 다르면 Dual-Vertical Test Policy(SIASIU+Cosmile 동시 검증)가 구조적으로 대칭 재현 불가.

결론: 위험은 "지금 없음"이 아니라 **Foundation Memory가 켜지는 순간(subject_ref 절단·_SALT·알고리즘이 되돌릴 수 없게 고정되는 지점)에 터지는 지연 위험**이다. **memory live 전에** 표준을 고정하는 것이 정본 목표다.

## C. 최종 정책

1. **Foundation으로 raw 직접식별자(PII)를 전송·저장하지 않는다.** (절대 원칙)
2. `login_id / username / email / phone / name / address / order / payment / customer raw id` 및 §E의 준식별자를 **Foundation으로 전송하지 않는다.**
3. **모든 서비스는 Foundation 호출 시 `foundation_user_ref`를 전송한다**(SIASIU·Cosmile·신규 서비스 공통). 식별자 없으면 명시적 `null`(no-subject consult = 사용자 미식별 허용).
4. `foundation_user_ref` = 서비스 내부 `user_id` 또는 `guest_id` 기반의 **service-scoped · deterministic ref**. **subject-type(user/guest)을 pre-hash 문자열에 포함**해야 한다(§F-1, guest↔user 충돌 방지).
5. Foundation은 **`foundation_user_ref`만으로** 같은 서비스 내 사용자를 안정 구분하며, 이를 **`local_user_ref`로 수신**한다.
6. `foundation_user_ref`는 **control-tower가 소유하는 reserved registry의 service namespace**(현행 enum `("cosmile","siasiu")` = `contract.py:19 SOURCE_SERVICES`)를 반드시 포함한다.
7. **cross-service 동일인 매칭은 지금 하지 않는다.** 그 primitive는 이미 shadow로 존재하나(`resolve_subject` consent-gated), **consent fail-closed·flag OFF로 차단 중**이다. live 매핑/promotion만 후속 별도 release train(§J).
8. **SIASIU/Cosmile은 동일 필드명(`foundation_user_ref`)·동일 원칙**을 따른다. **알고리즘·절단길이는 §F 표준으로 수렴**시킨다(현재 divergence 존재).
9. Foundation Memory의 canonical key는 **`subject_ref`**(Foundation이 `_SALT|service|local_user_ref`로 재해시)이며, `foundation_user_ref`는 그 **`local_user_ref` 입력**이다(§I). `local_user_ref := foundation_user_ref` **byte-for-byte** 여야 한다.
10. raw PII는 Foundation Memory / trace / event / log **어디에도 저장하지 않으며**, furef/subject_ref는 **가명화된 개인정보로 삭제·보존·동의 lifecycle에 편입**한다(§K).

**★rawText 선행조건(precondition):** SSC 요청은 `rawText`(원문 발화)를 실어 나른다. 원문에는 email/phone/name이 섞일 수 있다(Cosmile eval fixture조차 `email test@x.com 전화 010-...` 포함). 따라서 §C(1)의 "절대 전송 금지"는 **식별자 축**에 대한 것이며, **rawText 내 PII masking/no-persist는 본 정책의 blocking 선행조건**이다. 기존 통제(`shared_memory raw_text_stored=False + content_hash`, `resolve_subject`의 PII reject)를 참조·요구한다(§K).

**필드 도입 방식:** consult 경로의 `foundation_user_ref`는 SSC contract에 **additive optional 필드**로 정합(이미 Cosmile client type에 존재). memory 경로는 기존 `local_user_ref` 어휘와 **정합**시키며 새 병렬 필드를 만들지 않는다. Foundation Memory flag OFF 동안 Foundation은 furef를 **수신만(shadow)** 하고 소비·저장하지 않는다.

## D. 허용되는 값

Foundation으로 **전송해도 되는** 값:

- `foundation_user_ref`: `furef_` prefix + service namespace + subject-type 포함 ref. **단, 아래 조건부.**
  - ★**분류:** furef는 **가명화된 개인정보**다. "허용"은 "전송 대상 식별자로 지정됨"을 뜻할 뿐, **"비개인정보"를 뜻하지 않는다.**
  - ★**§D 통과 기준("이 값만으로 실제 사람을 되짚어 갈 수 없어야 한다"):** **plain SHA256 64-bit furef는 이 기준을 통과하지 못한다**(열거 가능 id에서 원본 복원 가능). 이 기준은 **HMAC-SHA256 + server-side secret 경로에서만 근사**된다.
- 서비스 종류 표기: `service = "siasiu" | "cosmile"`(라우팅/집계용 namespace, registry enum과 일치).
- `serviceMode` / `locale` / `productId`(카탈로그 **상품** 식별자 — 고객 PII 아님) 등 기존 SSC 필드.
- request-scoped `trace_id`(FRC top-level) — **단, 조건부.** trace_id 자체는 요청 추적자이나, **서비스측에서 raw `customer_id/guestId`와 같은 event/log에 공존시키면 de-anon join 키가 된다**(현행 `foundationDecisionEvent.ts` 사례). → §K no-correlation 불변식을 지켜야 허용.
- 비식별 boolean 플래그(예: `is_guest`) — 단, 이 플래그로 개인을 특정할 수 없어야 한다.

원칙: **"이 값만으로 실제 사람을 되짚어 갈 수 없어야 한다."** 되짚을 수 있으면(현행 secretless furef 포함) 무조건 허용이 아니라 **가명 PII lifecycle(삭제·동의·접근통제) 대상**이다.

## E. 금지되는 값

Foundation으로 **전송 금지**(payload·header·query·trace·event·log·metric 어디에도):

- **직접식별자:** `login_id`, `username`, `email`, `phone`, `name`(실명/닉네임), `주민등록번호/생년월일` 등 법적 식별자.
- **위치:** `address`, 우편번호, 배송지, `geolocation`.
- **거래:** `order_id`, 주문 내역, `payment`/카드/결제 토큰, `cart_id`.
- **서비스 내부 raw id:** raw `user_id`/`customer_id`/`guest_id` **원본 값**(→ 반드시 해시화된 furef로만).
- **★준식별자(quasi-identifier) — v0.1 누락, 반드시 추가:** `IP` / `X-Forwarded-For`, `device_id`/device fingerprint, session cookie/token, `session_id`(Cosmile `route.ts:15`가 Phase 4 도입 예정으로 명시), `User-Agent`, 정밀 timestamp.
- 위 값들의 **부분 문자열·조합**(이메일 앞부분, 전화 뒷자리 등).
- raw 발화(rawText)에 섞인 PII를 **식별자로 승격**시키는 것(발화 masking은 §C 선행조건, PII를 식별 키로 쓰는 것은 여기서 금지).

**★transport-layer 능동 제거 규칙:** HTTP는 IP/UA/cookie를 요청 헤더에 자동 부착한다. "payload에 안 넣음"으로는 부족하다 — **Foundation 호출 경계에서 IP·XFF·UA·cookie·session 식별자를 능동적으로 strip**해야 한다. 원칙: **역추적 가능한 값은 전부 금지, 애매하면 금지 쪽으로 판단하고 관제에 보고**한다.

## F. foundation_user_ref 생성 규칙

### F-1. 공통 형식 (모든 서비스 필수)

```
foundation_user_ref = "furef_" [+ "v<algo_version>_"] + <hash( "<service>:<subject_type>:" + <id> )>
```

- **`furef_` prefix 필수** — 식별자 종류 즉시 구분.
- **★algo/version tag 권장(`furef_v1_`/`furef_v2_`)** — SHA256 furef와 HMAC furef를 구별하고 dual-write migration을 명확히 하기 위함(§M-4).
- **service namespace 필수** — control-tower reserved registry(`("cosmile","siasiu")`)에서만. **★namespace는 공개 파라미터이며 보안 파라미터가 아니다**(교차충돌 격리 전용, enumeration 저항 0).
- **★subject-type token 필수(`user`/`guest`)** — v0.1 누락. namespace만으로는 **같은 서비스 내 `user_id`와 `guest_id`가 충돌**한다(현행 `provider_flag.py`는 어떤 id든 `"siasiu:"+id`만 붙여 `guest_123`과 `user_123`이 **동일 ref**). 반드시 `"siasiu:user:"` vs `"siasiu:guest:"`로 분리한다.
- **injective 인코딩:** namespace token·id 내부에 구분자 `:` 금지(또는 length-prefix/escape). 서로 다른 `(service, type, id)`가 같은 pre-hash 문자열로 붕괴하지 않도록.
- **deterministic** — 같은 입력(+같은 secret)은 항상 같은 ref.
- **opaque** — 값 자체에 의미·PII가 실리지 않음.

### F-2. 현재 구현의 정직한 기술 (재검증)

| 서비스 | 알고리즘 | 절단 | 형식 | secret | 상태 |
|---|---|---|---|---|---|
| SIASIU (`provider_flag.py:23`) | **plain SHA256** | `[:16]` = **64-bit** | `furef_<..>` (subject-type 없음) | 없음 | **LIVE** |
| Cosmile (`foundationUserRef.ts:13-16`) | **HMAC-SHA256(secret) / SHA256(없으면)** | `.slice(0,32)` = **128-bit** | `furef_<..>` (subject-type 없음) | 조건부·**fail-open** | **배포됨** |
| Foundation `subject_ref` (`subject_identity.py:39`) | **SHA256(salted)** | `[:16]` = **64-bit** | `subj_<..>` | `_SALT`·**하드코딩 DEV 기본값** | shadow·flag OFF |

★**plain SHA256 한계(정직):** 입력이 `"<service>:"+id`(secret 없음)이고 원본 id space가 열거 가능(순차 정수·KR 휴대폰 ~10^8)이면, 공격자는 ref를 "재현"하는 수준이 아니라 **전체 id→furef 사전을 precompute하여 원본 id를 완전 복원(full preimage)** 한다. namespace는 서비스 간 충돌만 막을 뿐 이 예측 가능성을 막지 못한다. → **plain SHA256 furef의 속성은 "역추적 불가"가 아니라 "hash one-wayness only — 열거 가능 id에 대해 preimage 복원 가능(NOT enumeration-resistant)".**

★**discrepancy 기록:** `provider_flag.py:22` docstring "역산 불가"는 secretless SHA256에 대해 **부정확**. implementation release train에서 "opaque pseudonym, secret 없으면 열거로 원본 복원 가능"으로 주석 정정(로직은 §D-1 결정 전까지 불변).

★**secret vs salt 용어 정정:** deterministic lookup key에는 **per-user random salt를 쓸 수 없다**(결정론 파괴). 필요한 primitive는 per-record salt가 아니라 **단일 server-side SECRET key(HMAC/keyed-PRF)** 다. 공개된 namespace prefix나 하드코딩된 global "salt"는 enumeration 저항을 **0** 제공한다(공격자가 알면 그대로 재열거). → 이 문서에서 "salt"는 **① Foundation `_SALT`(memory 키 재해시용, secret으로 관리해야 함)** 를 가리킬 때만 쓰고, 서비스측 furef 강화는 **"single server-side secret 기반 keyed HMAC-SHA256"** 로 표기한다.

### F-3. v2 표준 (확정 · APPROVED_CANDIDATE)

**확정(v2):** plain SHA256이 아니라 **HMAC-SHA256 + server-side secret(`FOUNDATION_USER_REF_SECRET`)**. plain SHA256은 **transitional only·production fail-closed**(§F v2 표준 8·9).

```
foundation_user_ref = "furef_v2_" + HMAC_SHA256( key=<server-side secret>, msg="<service>:<subject_type>:<id>" )[:32]   # 128-bit
```

- **secret은 server-side secret store에서만** — 문서·로그·trace·이 정책서에 **실제 값 절대 미출력.**
- HMAC은 secret을 모르면 후보 id 대입만으로 ref를 재현할 수 없어 **enumeration 저항**을 준다. 여전히 deterministic·동일 서비스 내 안정.
- ★**stored key 관점:** Foundation `subject_ref`는 **이미 `_SALT`로 salted**(HMAC-유사)다. 따라서 furef의 HMAC화가 보호하는 것은 주로 **in-transit furef 노출**(payload/trace에 실린 furef의 열거)이며, 저장 키의 enumeration 저항은 `_SALT`가 secret으로 관리될 때 확보된다.

### F-4. 통일 불변식 (표준화 목표)

모든 서비스·향후 서비스 공통 불변식:

1. `furef_` prefix + **algo/version tag** 필수.
2. service namespace(registry enum) 필수 · **subject-type token 필수**.
3. **enumeration 저항은 오직 비공개 secret에서 나온다**(namespace/공개 prefix는 저항 0).
4. deterministic(동일 서비스·동일 secret 내 안정).
5. injective pre-hash 인코딩(구분자 충돌 금지).
6. **확정 알고리즘 = HMAC-SHA256 + server-side secret**(plain SHA256 = transitional only·production fail-closed).
7. **절단 길이 = 128-bit(`[:32]` hex) 확정.** 64-bit(`[:16]`)는 충돌 위험(§M-2)으로 표준 미달.
8. **Foundation `subject_ref`도 128-bit로 상향**(현재 `[:16]` = 64-bit가 실제 memory 키이므로 이 상향이 furef 상향보다 우선).

★**표준(알고리즘·길이·subject-type·fail-closed)은 확정(APPROVED_CANDIDATE)이다.** 단 SIASIU/Cosmile로의 **통일 적용 시점·방법**은 memory continuity 위험(§M)을 수반하므로 **별도 release train·승인**으로 넘긴다(부록 O D-2).

## G. SIASIU 적용 기준

- SIASIU는 정책을 **부분 충족**(namespace·prefix·opaque·raw 미전송·LIVE)하나 **표준 미달 항목**이 있다: ① plain SHA256(secret 없음), ② 64-bit 절단, ③ **subject-type token 없음(guest↔user 충돌)**, ④ docstring "역산 불가" 부정확.
- **현재 코드는 이 문서로 바꾸지 않는다(design-only).** answer.py fingerprint(`d7f579443f8a110a`)·기존 workflow regression 불변이 전제.
- 로그인: `furef = furef_<hash("siasiu:user:" + siasiu_user_id)>`, guest: `furef_<hash("siasiu:guest:" + siasiu_guest_id)>` — **표준 채택 시 subject-type 분리 및 함수 시그니처 변경**(`foundation_user_ref(subject_type, id)`)이 implementation release train 항목이다.
- adapter는 계속 **`{"foundation_user_ref": ...}`만** 전송, raw `user_id/name/phone/email` 미전송(현 상태 유지).
- **HMAC·128-bit·subject-type 전환은 memory-tied 별도 release train**(§M continuity 위험). 전환 전까지 SIASIU는 현행 유지가 정본 상태이나, **표준 미달임을 명기**한다.

## H. Cosmile 적용 기준 (★이미 배포됨 — "신규 추가"가 아니라 "검증·정합")

- Cosmile은 **이미 furef를 전송한다**(`route.ts:42-43`·`foundationUserRef.ts`). 목표는 신규 추가가 아니라 **기 배포 구현의 검증 + 표준 정합**이다.
  - 로그인: `furef_<hmac/sha256("cosmile:" + userId).slice(0,32)>`, guest: `... guestId ...`, 식별자 없으면 `null`.
  - ★**현행은 subject-type token 없음** → `userId`와 `guestId`가 우연히 같은 값이면 충돌(SIASIU와 동일 결함). `"cosmile:user:"` vs `"cosmile:guest:"` 분리를 정합 대상으로 기록.
- **★secretless fail-open 결함:** `FOUNDATION_USER_REF_SECRET` 미설정 시 **조용히 plain SHA256**으로 emit(에러 없음). → **fail-closed 요구**: 비-dev 경로에서 secret 부재 시 ref 발급 거부/raise+alert(§L·§K-4).
- Cosmile은 128-bit(`[:32]`)로 이미 표준 길이에 근접하나, **Foundation이 subject_ref를 64-bit로 재절단**하므로 저장 키 이점이 상쇄된다(§I·§M-2) — 이 정합이 우선.
- ★**trace_id de-anon join:** `foundationDecisionEvent.ts`가 `foundation_trace_id`를 raw `customer_id/anonymous_id`와 같은 canonical event에 기록 → **no-correlation 불변식 위반 후보**. §K-무상관 규칙·regression 필요.
- Cosmile은 checkout/order/customer DB를 Foundation에 넘기지 않는다(현 상태 유지, opaque ref만).
- **guest 처리:** §H-guest 불연속 + no-erasure(§I·§M) 명시.

## I. Foundation Memory와의 관계 (★shared_memory v0 shadow 실재 반영)

- ★**Foundation Memory는 "미도입"이 아니다.** `foundation/shared_memory/` v0 shadow가 이미 존재하며(flag `shared_memory_v0_shadow` **default OFF**, `applied_to_real_user=false`·`write_live=false`), **key derivation이 이미 확정**되어 있다.
- **canonical memory key = `subject_ref`**, `foundation_user_ref`가 아니다:

```
local_user_ref  := foundation_user_ref            # 서비스가 보낸 furef (byte-for-byte 동일해야 함)
subject_ref      = "subj_" + sha256(_SALT | source_service | local_user_ref)[:16]   # store.py 키
```

- ★**consult→memory bridge 불변식(신규 필수):** consult 경로에서 보낸 furef와 memory 경로 `local_user_ref`가 **byte-for-byte 동일**해야 subject_ref가 같은 입력에서 도출된다. 현재 Foundation consult core에는 furef→local_user_ref bridge 참조가 없음 → **`local_user_ref := foundation_user_ref` 계약 조항 + regression 필수**(§L).
- **두 식별 축 구분(불변):**

| 축 | 식별자 | scope | 안정성 | 용도 |
|---|---|---|---|---|
| user-scoped | `foundation_user_ref`(→`local_user_ref`→`subject_ref`) | 서비스 내 사용자 | **안정적** | memory key·개인화·재현 |
| request-scoped | `trace_id`(`foundation_core_service.py:21`) | 단일 요청 | **매 요청 unique** | 요청 추적·감사·디버깅 |

- `trace_id`로 memory를 키잉하면 매 요청이 새 사용자가 된다. `subject_ref`로 키잉하고 `trace_id`로 요청을 추적한다. **두 값은 서로 대체하지 않는다.**
- Memory에 저장되는 사용자 식별자는 **opaque `subject_ref`**(가명)이며 raw id/PII가 아니다. 단 §D 재분류상 **가명화된 개인정보**이므로 §K lifecycle 적용.
- **현재 단계:** flag OFF → Foundation은 furef를 **수신만(shadow)**, 소비·저장 안 함. live 전환은 별도 설계·승인.

## J. cross-service identity mapping은 후속이다 (★"구조적 불가" 과대주장 정정)

- 본 정책은 **한 서비스 내부의 안정 식별만** 다룬다.
- ★**정정:** "namespace 격리 때문에 cross-service 연결이 **구조적으로 불가**"는 crypto 과대주장이다. namespace는 **같은 원본 id의 교차 equality-join과 우연 충돌만 차단**한다. ref가 역산 가능한 동안에는 **cryptographic unlinkability를 제공하지 않는다**(공격자가 양쪽 furef를 역산해 원본 id를 복원한 뒤 외부 identity graph로 join 가능). 진짜 구조적 비연결은 **secret-keyed·비가역 ref**에서만 근사된다.
- ★**실제 enforcement(shipped code 기준):** cross-service 매핑 금지는 다음으로 집행된다 — ① `source_service`가 `subject_ref` 해시에 포함(기본 per-service subject_ref), ② `resolve_subject`의 **consent fail-closed**(`allow_link=False`→`None`), ③ `gate.py`의 `cross_subject_isolation` block, ④ `read_scope`/`consent_scope='cross_service'` gating, ⑤ **flag default OFF**. → **"namespace-in-furef"가 아니라 "consent-gated·default fail-closed·현재 shadow/OFF".**
- ★**"후속 별도 Identity Mapping Layer"의 정정:** 그 primitive(`resolve_subject(service, local_user_ref, consent_record)`)는 **이미 shadow로 존재**한다. 후속 대상은 "layer 신설"이 아니라 **live 매핑·consent·promotion 활성화**다. 이는 별도 설계서·법적 근거·consent·매핑 저장소·역추적 위험을 **독립 검토**해야 하며, 본 문서를 "동일인 매핑 근거"로 확대 해석 금지.
- 즉, **지금의 정답 = "consent+flag로 차단(연결 안 함)"**, live 연결은 미래 별도 release train.

## K. PII 금지 규칙

1. Foundation으로 가는 **어떤 경로(payload·header·query·trace·event·log·metric)에도 raw 직접식별자·§E 준식별자를 넣지 않는다.** transport-layer 식별자(IP/XFF/UA/cookie/session)는 **호출 경계에서 능동 strip**.
2. Foundation Memory / trace / event / log에 **raw PII를 저장하지 않는다** — 저장되는 사용자 식별자는 **opaque `subject_ref`(가명)뿐**. `raw_text_stored=False`·`content_hash`(shared_memory INVARIANT)·`resolve_subject` PII reject를 준수·요구.
3. ★**가명 PII 재분류:** `furef`/`subject_ref`는 **anonymized가 아니라 pseudonymous personal data**다(secret 없으면 reversible·안정적이라 linkable). 따라서 **삭제권·보존정책·동의**의 대상이다 — `consent_scope`/`retention_policy` 필드에 연결.
4. ★**secret/salt fail-closed(신규 필수):** 서비스측 furef secret과 Foundation `_SALT`가 **부재 시 조용히 약한 해시로 degrade하지 않는다**. 비-dev 경로에서 secret/salt 부재 = **fail-closed(발급 거부 + startup assertion + alert)**. **소스에 하드코딩된 default salt/secret 금지**(현행 `_SALT` DEV 기본값·Cosmile fail-open은 정정 대상). secret/salt 실제 값은 문서·로그·trace·리뷰 어디에도 **출력 0**.
5. ★**no-correlation 불변식(신규 필수):** Foundation 요청 `trace_id`를 **서비스측 raw PII-linked event/log에 재사용 금지**(현행 `foundationDecisionEvent.ts`가 위반 후보). 또는 PII 경계를 넘는 요청에 **별도의 비상관 request id**를 쓴다. `trace_id`가 raw `customer_id/anonymous_id`와 **공존하지 않음**을 assert하는 regression 필요.
6. raw 발화(rawText)에 PII가 섞여도 **PII를 식별자로 승격 금지**(식별은 오직 ref). rawText masking/no-persist는 §C 선행조건.
7. ★**삭제권(right-to-erasure) 전파:** furef는 deterministic이므로 서비스가 furef를 재계산해 Foundation-memory 삭제(`delete`/`expire`, subject_ref 기준)를 발행할 수 있다. **단 guest는 §H·M의 no-erasure gap** → guest memory는 `retention_policy='session'`/`write_intent='session_only'`(self-expiring)로 제한(persistent standard_ttl/revocable 금지).
8. 위반 발견 시 STOP(CLAUDE.md §8: privacy/customer leak>0, raw PII in trace/report, 가명 충돌에 의한 cross-user memory 재사용) → 즉시 중단·보고.

## L. 구현 체크리스트 (design-only · 승인 후 별도 release train에서 수행)

> ★v0.1 대비 "이미 배포된 작업을 미완료로 표기"한 항목을 **검증·정합** 항목으로 정정.

- [ ] **Foundation consult contract 정합:** furef를 additive optional로 유지하되, **`local_user_ref := foundation_user_ref` byte-for-byte** 계약 조항 추가(신규 병렬 필드 만들지 않음). consult-time furef와 memory-candidate `local_user_ref` 동일성 regression.
- [ ] **Cosmile — 검증·정합(신규 add 아님):** ① 기 배포 furef 생성/전송 audit(길이 32·조건부 HMAC·fail-open), ② **secretless fail-open → fail-closed** 전환 설계, ③ **subject-type token(`cosmile:user:`/`cosmile:guest:`)** 도입, ④ `trace_id` no-correlation(event에서 raw id와 분리).
- [ ] **SIASIU — 표준 격차 정합:** ① plain SHA256→(승인 시)HMAC, ② 64-bit→128-bit, ③ **subject-type token** 및 시그니처 `foundation_user_ref(subject_type, id)`, ④ **docstring "역산 불가" → "opaque pseudonym, secret 없으면 열거로 원본 복원 가능"** 주석 정정. (answer.py fingerprint·workflow regression 불변 유지.)
- [ ] **Foundation shared_memory 정합:** ① `subject_ref` 절단 `[:16]`→`[:32]`(128-bit), ② `_SALT` 하드코딩 DEV 기본값 제거 + **fail-closed**(secret 부재 시 발급 거부·startup assertion), ③ furef→local_user_ref bridge 검증.
- [ ] **필드명 통일 확인:** `foundation_user_ref`(consult)·`local_user_ref`(memory) 정합. **절단길이(16 vs 32) 및 알고리즘(plain vs HMAC) divergence 수렴 결정.**
- [ ] namespace(registry enum)·subject-type·injective 인코딩 검증. **token registry 유일성·불변성** governance 확정.
- [ ] regression: `furef(user,X) != furef(guest,X)`; namespace token 유일성; id에 구분자 `:` reject; **composite `(service, ref)` 키**로만 lookup(ref-alone 금지).
- [ ] PII 전송 0 scan(payload/header/**transport IP·UA·cookie·session**/trace/log) — no-PII regression. rawText PII masking/no-persist 선행 검증.
- [ ] `foundation_user_ref`(user-scoped)와 `trace_id`(request-scoped) 축 분리 + **no-correlation** regression.
- [ ] 가명 PII lifecycle: 삭제권 전파(furef 재계산→subject_ref 삭제), guest = session-only 검증.
- [ ] HMAC secret / `_SALT` **lifecycle**(rotation=재키잉=memory migration·별도 release train; 유출=incident STOP) 설계.
- [ ] cross-project regression 유지(Foundation runner 89/89 · SIASIU 39/39·119/119 · Cosmile readiness 164/164 · loop 112/112).
- [ ] live/write/promotion = 0, real user exposure = 0, flag default OFF 유지.

## M. migration 영향

1. **★알고리즘/길이 divergence는 미래가 아니라 현재다.** SIASIU 16-hex plain vs Cosmile 32-hex HMAC-capable. "통일"은 **이미 벌어진 격차의 수렴 결정**이다. Cosmile은 legacy continuity 자산이 (아직 memory live 아님이라) 적으므로 **표준(128-bit·HMAC·fail-closed·subject-type)을 지금 Cosmile에 확정**하고, SIASIU는 memory-tied release train에서 끌어올린다.

2. **★64-bit 절단 충돌 = privacy STOP(데이터 품질 아님).** `subject_ref = ...[:16]` = 64-bit가 **실제 memory 키**다(furef 길이와 무관하게 재절단). 64-bit에서 non-negligible(≥~1%) 충돌은 **~2^28~2^29(수억, 나아가 guest 포함 시 더 이른 시점)** 에서 발생한다(v0.1의 "2^32"는 낙관). 서로 다른 실사용자가 같은 subject_ref를 공유 = **cross-user memory 오염 = §8 STOP 조건**. → **표준화 시 furef·subject_ref 모두 최소 128-bit.** 절단은 preimage/enumeration 저항과 무관(공격 비용은 id space로 bound)하므로 이는 confidentiality가 아니라 **순수 collision(safety)** 문제. guest ref가 population을 부풀리므로 **guest ref는 장기 keyspace에 persist 금지(short-TTL)**.

3. **★HMAC 표준화 시 SIASIU continuity 단절 위험.** SIASIU가 `plain SHA256`→`HMAC`으로 바뀌면 **동일 사용자라도 furef→local_user_ref→subject_ref가 전부 달라진다.** Memory가 SHA256 기반으로 쌓인 뒤 전환하면 continuity 단절. → **Memory live 전 알고리즘 확정이 가장 안전(전환 비용 0).** live 후 전환은 **명시적 ref migration(dual-write·mapping·재키잉)** = 별도 release train·승인.

4. **★Foundation `_SALT` 회전 = 전역(all-services-at-once) continuity 단절 축(v0.1 누락).** `subject_ref`는 서비스측 furef뿐 아니라 Foundation `_SALT`에도 의존한다. `_SALT`를 회전하면 **모든 서비스의 모든 subject_ref가 동시에** 바뀌어 전체 memory가 orphan된다(서비스측 알고리즘과 무관). → `_SALT`는 **memory live 전 freeze**, 회전은 dual-key/재해시 release train으로만. secret 유출 시 이미 발급된 ref는 **소급 보호 불가 → incident STOP·보고**. algo/version tag(`furef_v1_`/`subj_v1_`)로 provenance를 detectable하게 하여 dual-write를 명확히.

5. **Cosmile 신규 furef는 continuity 자산이 아직 없다(memory live 전).** 표준을 처음부터 적용하는 것이 유리(나중에 안 바꿔도 됨). 단 이미 **배포된 상태**이므로 "자산 0"이 아니라 "memory-persisted 자산 0"임을 정확히 구분.

6. **정직한 딜레마.** SIASIU는 SHA256 LIVE, Cosmile은 HMAC-capable로 이미 비대칭. 즉시 완전 통일 시 SIASIU continuity 위험, 미루면 divergence 잔존. → 본 문서는 **방향(HMAC·128-bit·fail-closed·subject-type·통일)만 고정**하고, 실제 통일 시점·방법은 **Memory live 계획과 묶어 별도 설계·승인**으로 넘긴다. guest→login 전환 시 continuity 처리(§H)도 함께 결정.

## N. WATCH

- **Foundation Memory live 트리거:** memory가 켜지는 순간이 `subject_ref` 절단·`_SALT`·furef 알고리즘/길이를 **되돌릴 수 없게 확정하는 지점**. 그 전에 §M 결정을 마쳐야 한다.
- **★절단길이 divergence(16 vs 32):** SIASIU 16-hex vs Cosmile 32-hex, 그리고 Foundation `subject_ref` 64-bit 재절단을 감시. 동일 subject_ref·상이 사용자(cross-user 오염)는 즉시 escalation(§8 STOP).
- **★Foundation `_SALT` 회전:** 전역 continuity 단절 축. 회전 시도·DEV 기본값 사용 여부를 감시(하드코딩 salt = enumeration 붕괴).
- **★이중 salt/secret 계층 정합:** 서비스측 furef secret(HMAC) ↔ Foundation `_SALT`(subject 재해시) 두 계층의 동시 관리·rotation 정합. 어느 한쪽이라도 fail-open(secret/salt 부재 시 약한 해시) 감지 시 STOP.
- **★trace_id join 채널:** `trace_id`가 서비스측 raw `customer_id/anonymous_id`와 같은 event/log에 공존하는지 감시(현행 `foundationDecisionEvent.ts`) — no-correlation 불변식 위반은 de-anon 위험.
- **secret 유출:** HMAC/`_SALT` secret이 로그/설정/문서/trace로 새면 enumeration 저항 붕괴 + 소급 보호 불가 → secret store만, 값 출력 0, 유출=incident STOP.
- **guest ref 남용/불연속:** guest 불연속을 우회하려 안정 식별자(쿠키 영속화·기기 지문)를 몰래 붙이면 PII/추적 위험. guest = session-only(no persistent subject_ref)·삭제 불가 gap 감시.
- **subject-type 누락:** furef가 subject-type 없이 발급되어 `user_id`↔`guest_id`가 충돌(cross-identity 오염)하는지 감시.
- **contract drift:** furef 대신 raw id를 임시로 넣는 hotfix, 또는 `local_user_ref != foundation_user_ref` 발생 감시 — 발견 시 STOP·보고.
- **cross-service 확대 해석:** 본 정책을 "동일인 매핑 근거"로 읽는지 감시 — live 매핑은 §J 별도 release train(consent+flag) 전까지 불가.
- **live/write/promotion:** 이 정책 관련 어떤 구현도 real user exposure·customer memory live migration·canonical write를 열지 않는지 감시(전부 disabled 유지, flag OFF).
- **정직 델타:** SIASIU=plain SHA256 64-bit(LIVE)·Cosmile=조건부 HMAC 128-bit(fail-open)·Foundation subject_ref=salted 64-bit(하드코딩 DEV salt). **"HMAC 표준 적용됨"·"익명"·"PII 없음"으로 과대 표기 금지** — 표준은 권장·미적용, furef는 가명 PII다.

---

## 부록 O. 승인 필요 결정 (Leo 승인 gate)

v2 표준(알고리즘·형식·길이·subject-type·fail-closed)은 **확정(APPROVED_CANDIDATE)**이다. 아래 중 **OPEN 항목이 구현 train에서 확정되기 전에는** 해당 부분 implementation prompt를 발행하지 않는다.

- **D-1 (역추적 저항 불변식) — ✅ RESOLVED (Leo 2026-07-03):** **HMAC-SHA256 + server-side secret을 표준 required로 승격.** secretless plain SHA256은 **transitional only·production fail-closed**. 용어는 **pseudonymous / secret 기반 enumeration-resistant**로 통일하고 `"anonymous"`·`"역추적 불가"` 표현을 금지한다.
- **D-3 (절단 길이) — ✅ RESOLVED (Leo 2026-07-03):** furef v2 = **128-bit(`furef_v2_` + `[:32]`)** 확정. Foundation `subject_ref`도 128-bit 상향·`_SALT` freeze 시점은 **Memory live 전**(구현 train).
- **D-2 (통일 적용 시점) — OPEN (구현 train):** SIASIU/Cosmile 표준 적용을 **Memory live 전 완료** vs **dual-write migration**으로 미룰지(§M).
- **D-4 (guest 정책) — OPEN (구현 train):** guest = **session-only(non-persistent)** 확정 여부, guest→login reconciliation을 별도 consent release train으로 둘지.

## 부록 P. Design-First 16-섹션 매핑 (§2.6 정합)

| 16-섹션 | 본 문서 위치 |
|---|---|
| 1 목적 | 목적 |
| 2 현재 상태 | 정합 근거(재검증) · A |
| 3 관련 repo/commit | 정합 근거(파일·라인·commit `b7cce1f`) |
| 4 작업 범위 | C · L |
| 5 하지 않을 것 | C(7) · J · N(live/write) |
| 6 role boundary | ↓ P-1 |
| 7 data boundary | E · K |
| 8 safety boundary | K · M-2(collision=STOP) · N |
| 9 contract/schema | C · F · I(`local_user_ref`/`subject_ref`) |
| 10 expected behavior | ↓ P-2 |
| 11 test plan | L(regression 목록) |
| 12 regression plan | L(cross-project) |
| 13 rollback plan | ↓ P-3 |
| 14 implementation phases | ↓ P-4 |
| 15 승인 조건 | ↓ P-5 · 부록 O |
| 16 다음 implementation prompt | ↓ P-6 |

**P-1 role boundary:** 서비스 = furef 생성(raw id→ref)·전송·삭제 발행. Foundation = `local_user_ref` 수신·`subject_ref` 재해시·consent gate·memory key 소유. control tower = contract/표준/regression 검증. **safety(PII·enumeration·collision)는 service adapter가 낮출 수 없다(MAX·fail-closed).**

**P-2 expected behavior:** flag OFF에서 기존 동작 100% 동일(furef 수신만·소비 0). furef는 deterministic(같은 서비스·같은 사용자·같은 secret→같은 ref). `local_user_ref == foundation_user_ref`. guest는 session-only. secret/salt 부재 → fail-closed. trace_id는 raw id와 무상관.

**P-3 rollback plan:** design-only(코드 변경 0)이므로 문서 rollback = 본 문서 revert. 구현 release train은 **flag OFF 기본**이라 즉시 무력화 가능. furef 필드는 additive optional → 미소비 시 제거 안전. 알고리즘/길이/`_SALT` 전환은 **memory live 전이면 rollback 비용 0**, live 후면 dual-write/재키잉 없이는 rollback 불가 → **그래서 live 전 확정이 rollback plan의 핵심.**

**P-4 implementation phases:** ① 표준 확정(부록 O 승인) → ② Cosmile fail-closed·subject-type·no-correlation 정합 → ③ Foundation subject_ref 128-bit·`_SALT` fail-closed → ④ SIASIU 표준 정합(HMAC·128-bit·subject-type·docstring) → ⑤ bridge/regression → ⑥ cross-project regression → ⑦ (별도) Memory live 계획. 각 단계 flag OFF·live 0.

**P-5 승인 조건(PASS 기준):** 부록 O(D-1~D-4) 승인 + 아래 invariant 0 — false_allow=0 · privacy/customer leak=0 · raw PII in trace/report=0 · furef/subject_ref collision(cross-user memory 재사용)=0 · write/live/promotion=0 · `local_user_ref != foundation_user_ref`=0 · trace_id↔raw id 공존=0 · secret/salt 값 출력=0. cross-project regression(89/89·39/39·119/119·164/164·112/112) 유지.

**P-6 다음 implementation prompt(초안 방향, 미발행):** 부록 O 승인 후 **Cosmile repo-local**(fail-closed secret·subject-type token·trace_id no-correlation), **Foundation repo-local**(subject_ref 128-bit·`_SALT` fail-closed·bridge 계약), **SIASIU repo-local**(표준 정합·docstring 정정)로 **분리 발행**한다. 각 prompt는 이 문서의 §F 불변식·§K·§L을 검증 목표로 삼고, repo 경계를 넘는 의존은 control tower contract로만 정의한다.

---

> **한 줄 원칙**
> 서비스는 raw 직접식별자 대신 **가명 `foundation_user_ref`** 만 보낸다(secret 있으면 역추적 저항, 없으면 열거 가능한 가명 — 삭제·동의 대상).
> Foundation은 이를 `local_user_ref`로 받아 `_SALT`로 **`subject_ref`(실 memory key)** 를 도출해 같은 서비스 안 사용자를 안정 구분한다.
> 서비스 간 동일인 연결은 이미 shadow primitive가 있으나 **consent fail-closed·flag OFF로 지금은 하지 않는다.**
