# MEMORY_CONTEXT CONTRACT V1 (M3) — ephemeral request context 계약

> 작성: foundation-control · 2026-07-04 · **상태: DESIGN (M3 계약 문서 · 구현 전 · v1.1)** · Control verdict 상한 = DESIGN_READY · 최종 FINAL_PASS = Fable5/독립 reviewer.
> ★**v1.1 = Fable5 D-1 반영:** §7 ingress gate를 has_raw_or_pii 재사용 → **신규 default-deny 스펙**(unknown-key reject·whitelist 강제·field type/enum·nested recursive scan·식별자(customer/user/anonymous/session_id/order/payment/shipping) 차단·한국어 raw text/name/address·size/depth/count 상한·fail-closed)으로 재작성 · §8 V3 attribution(O) · §10 privacy_level enum(D-5) 정정.
> 근거: FOUNDATION_SERVICE_MEMORY_ARCHITECTURE_V1(v0.3) §O~R·S · COMMON_SERVICE_MEMORY_CONTRACT_V1(M2) · Foundation-side review · SUBJECT_REF_HARD_GATE_RESULT.
> ★코드 수정 0 · migration 0 · source push 0 · raw 고객 데이터/secret 미열람 · 예시 payload = fake/synthetic only.

## 1. 목적
- 서비스(SIASIU/Cosmile)가 **자기 memory에서 요청 단위로 생성**해 Foundation `consult_contract`에 보내는 **ephemeral context** 계약.
- Foundation은 이를 **임시 사용 후 폐기**하고 저장하지 않는다. 서비스가 무엇을 로컬에 남길지는 서비스가 결정.

## 2. 핵심 원칙
- **request-scoped** — 요청 1건 처리 범위에서만 유효.
- **Foundation 저장 0** — durable write 0(`memory_write=false`·`applied_to_real_user=false`).
- **Foundation memory_read_provider 미사용** — Foundation은 자기 고객 memory store를 조회하지 않는다.
- **Foundation은 다른 서비스 memory 조회 안 함** — Foundation ≠ cross-service broker(v1).
- **raw 상담원문 / PII / order / payment / shipping 금지** — memory_context에 미포함(§5).

## 3. 실제 착지점 (별도 top-level 필드 신설 없음)
- memory_context는 **별도 top-level `memory_context` 필드가 아니라 기존 SSC 필드에 착지**한다(더 단순·신규 계약 표면 최소):
  - `SSC.session_context` — session/episode/fact/consent refs.
  - `SSC.known_allergies` — allergy atoms.
  - `SSC.avoid_ingredients` — avoid_ingredient atoms.
  - `SSC.product_context` — product/commerce refs.
- ★`session_context`/`service_context`/`product_context`는 **freeform** → **Foundation ingress raw/PII gate 대상**(§7). 착지 필드가 freeform이므로 **경계는 typed schema가 아니라 ingress default-deny scan으로 강제**한다.

## 4. 허용 필드 (whitelist)
| 필드 | 의미 | 값 종류 |
|---|---|---|
| `service_id` | 발생 서비스 | siasiu \| cosmile |
| `request_memory_context_version` | 계약 버전 | "mctx-1.0" |
| `session_ref` | 현 세션 참조 | opaque session_id |
| `episode_summary_refs` | 최근 요약 refs | [{summary_id, content_hash(keyed), intent_types, risk_level}] |
| `ltm_fact_refs` | 장기사실 refs | [{type, norm_value/atom, fact_state, confidence}] |
| `known_allergy_atoms` | 알레르기 atom | [atom_ref] |
| `avoid_ingredient_atoms` | 회피성분 atom | [atom_ref] |
| `product_refs` | 상품 참조 | [canonicalProductId] |
| `commerce_signal_refs` | 커머스 신호 | [{signal_kind, product_ref, privacy_level(`normal`\|`sensitive`\|`restricted`)}] |
| `consent_flags` | 동의 상태 | {consent_scope, sensitivity_level} |
| `retention_flags` | 보존 상태 | {retention_policy} |
| `safety_flags` | 안전 표시 | {has_safety_fact, pregnancy_nursing:bool} |
| `trace_refs` | 추적 참조 | request_id/trace_id(hex·raw id 아님) |
- ★모두 **opaque refs·enum·atom·bool·hash(keyed)** — 원문/평문 식별자 없음.

## 5. 금지 필드 (blacklist · 하나라도 발견 시 ingress reject)
- `raw utterance` / **raw 상담 원문** / `summary_text plaintext` / `value_display plaintext`
- `email` / `phone` / `name`
- `customer_id` / `user_id` / `anonymous_id` (raw 식별자)
- `raw order / payment / shipping` (주문번호·결제·배송주소)
- `raw query / body`
- ★subject_ref도 **미전송 권장**(Foundation은 broker 아님·고객 memory 미조회).

## 6. memory_context lifecycle
```
(1) service assembles from own DB   — 자기 memory에서 조립(deleted/blocked/expired fact 제외·consent 확인)
(2) service sanitizes               — whitelist(§4)만·raw/PII 제외(§5)·hash는 keyed
(3) Foundation ingress default-deny scan (§7) — raw/PII/식별자 발견 시 fail-closed reject
(4) Foundation consult consumes     — request-scoped 판단(judge/safety/evidence)·저장 0
(5) Foundation returns FRC          — trace_id·decision·safety_gate·product_candidates refs (raw 0)
(6) Foundation stores nothing       — memory_write=false·session_out 반환 후 미보관·trace_ring 휘발
(7) service decides local persist   — session_context_out을 자기 storage에 반영(정본은 서비스 소유·FRC trace_id는 hashing/미저장)
```

## 7. Foundation ingress gate contract — ★D-1 재명세(Fable5·신규 default-deny 스펙)
★기존 `shared_memory/gate.has_raw_or_pii` **단순 재사용 표현은 폐기**한다 — 그 gate는 **default-allow blacklist**(top-level 키 + email/phone/RRN 정규식만)라 설계 요구를 수행할 수 없다: (a) `customer_id/user_id/anonymous_id/session_id` 미차단(gate.py:15-17), (b) 중첩 dict/list 미스캔(top-level만), (c) **한국어 raw 상담원문·이름·주소 통과**, (d) M3 §4 whitelist 미강제, (e) 크기/깊이/개수 상한 전무(context 폭탄·재귀 crash). → **신규 default-deny gate 스펙으로 재작성.**

**신규 gate 스펙 (M5 배선·전부 fail-closed):**
1. **default-deny + unknown-key reject:** §4 whitelist에 **없는 key는 거부**(허용목록 외 전부 reject) — blacklist가 아니라 **whitelist 구조적 강제**.
2. **field별 type/enum 검증:** 허용 필드의 **타입·enum**(service_id∈{siasiu,cosmile}·role·risk_level·consent_scope·privacy_level 등) 검증·위반 reject.
3. **nested recursive scan:** dict/list **재귀 스캔**(top-level만 검사 금지) — 중첩 내부 raw/PII/식별자 탐지.
4. **식별자 차단:** `customer_id`·`user_id`·`anonymous_id`·**`session_id`(raw)**·`order`·`payment`·`shipping` 키/값 **차단**(기존 gate 누락분 명시 추가).
5. **raw text/name/address 차단:** email/phone/RRN 정규식 + **한국어 raw 상담원문·이름·주소 휴리스틱**(길이·자연어 패턴)·free-text 필드는 whitelist 외 **거부**.
6. **크기/깊이/개수 상한:** context **byte size·nesting depth·item count 상한** — 초과 시 **fail-closed reject**(context 폭탄·재귀 crash 방지).
7. **위반 시 fail-closed:** 어느 항이든 위반 = **reject**(수용·반영·저장 0).
8. **echo clean assertion:** `session_context_out` echo도 raw/PII/식별자 0 유지(§9 assert).
- ★**scan 대상:** `session_context` · `service_context` · `product_context` **모두**(재귀).
- ★**B4 재정의:** "has_raw_or_pii 재사용" → **"신규 default-deny gate 스펙 구현"**. 현재 미배선(W26·grep 0)·M5 구현 전 필수.

## 8. memory_reuse_decision  ★O 보강(Fable5·V3 attribution seam)
- **현재 FRC 미배선**(W15) → **shadow / default OFF**.
- ★**deleted/blocked/expired/consent 없는 memory 재사용 금지**(must_not_reappear).
- ★**service-side filter 우선:** 서비스가 memory_context 조립(§6-1) 시 deleted/blocked/expired fact를 **애초에 제외**(fail-closed). FRC `memory_reuse_decision`(allowed/blocked/expired/deleted/consent_required/not_available) 필드 추가는 후속 release train.
- ★**V3 attribution 전제(O):** P1에서 FRC trace_id를 **미저장** 선택 시 V3 feedback loop join key 소실 → **keyed-hash(HMAC·per-service) 저장을 V3 전제 후보로 고정**(raw trace_id 저장 아님·de-anon 없이 attribution 유지). **FRC `memory_reuse_decision`(W15) 선행 필요**(M2 §15).

## 9. 테스트 기준
- **raw/PII/identifier in memory_context = 0**(whitelist만·ingress reject 동작).
- **deleted/blocked/expired must_not_reappear**(memory_context에 미포함).
- **consent 없는 sensitive reuse = blocked**(fail-closed).
- **Foundation durable write = 0**(`memory_write=false`).
- **memory_read_provider_called = false**.
- **session_context_out clean**(raw/PII 0 echo).
- **trace_id ↔ raw identity same row 금지**(서비스-side FRC trace_id는 hashing/미저장·§P1).
- 기존 regression 유지: Foundation runner 89/89·SIASIU 39/39·119/119·Cosmile readiness 164/164·loop 112/112.
- ★중단 조건: session_context ingress raw/PII/식별자>0 · deleted/blocked/expired reuse>0 · write/live/promotion>0.

## 10. SIASIU / Cosmile 예시 payload (★fake/synthetic only)
> ★아래는 **합성 예시**다. 실제 고객 데이터·secret·PII 아님.

**SIASIU (상담·안전 fact 예시):**
```json
{
  "service_id": "siasiu",
  "request_memory_context_version": "mctx-1.0",
  "session_ref": "sess_synthetic_0001",
  "episode_summary_refs": [
    {"summary_id": "sum_synthetic_1", "content_hash": "hmac:aaaa...", "intent_types": ["product_fit"], "risk_level": "low"}
  ],
  "ltm_fact_refs": [
    {"type": "skin_type", "norm_value": "dry", "fact_state": "active", "confidence": 0.9},
    {"type": "allergy", "norm_value": "fragrance", "fact_state": "active"}
  ],
  "known_allergy_atoms": ["atom:fragrance"],
  "avoid_ingredient_atoms": ["atom:alcohol_denat"],
  "consent_flags": {"consent_scope": "same_service", "sensitivity_level": "sensitive"},
  "safety_flags": {"has_safety_fact": true, "pregnancy_nursing": false},
  "trace_refs": {"request_id": "fdsh_0000000000000000"}
}
```

**Cosmile (commerce 신호 포함 예시):**
```json
{
  "service_id": "cosmile",
  "request_memory_context_version": "mctx-1.0",
  "session_ref": "sess_synthetic_9002",
  "ltm_fact_refs": [{"type": "concern", "norm_value": "pigmentation", "fact_state": "active"}],
  "product_refs": ["fprod_synthetic_a", "fprod_synthetic_b"],
  "commerce_signal_refs": [
    {"signal_kind": "wishlist", "product_ref": "fprod_synthetic_a", "privacy_level": "normal"}
  ],
  "consent_flags": {"consent_scope": "same_service", "sensitivity_level": "normal"},
  "retention_flags": {"retention_policy": "standard_ttl"},
  "trace_refs": {"request_id": "fdsh_1111111111111111"}
}
```
★두 예시 모두: raw utterance/email/phone/name/user_id/anonymous_id/order/payment **없음** · subject_ref 미전송 · hash는 keyed 표기.

## 무결성
코드 변경 0 · migration 0 · source push 0 · raw 고객데이터/secret 미열람 · 예시 fake/synthetic only. Control verdict 상한 = DESIGN_READY(Fable5 FINAL_PASS 필요).
