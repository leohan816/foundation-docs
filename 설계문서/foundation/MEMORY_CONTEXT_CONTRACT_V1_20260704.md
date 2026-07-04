# MEMORY_CONTEXT CONTRACT V1 (M3) — ephemeral request context 계약

> 작성: foundation-control · 2026-07-04 · **상태: DESIGN (M3 계약 문서 · 구현 전)** · Control verdict 상한 = DESIGN_READY · 최종 FINAL_PASS = Fable5/독립 reviewer.
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
| `commerce_signal_refs` | 커머스 신호 | [{signal_kind, product_ref, privacy_level}] |
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

## 7. Foundation ingress gate contract (★M5 구현 전 필수)
- **gate:** FOUNDATION `shared_memory/gate.has_raw_or_pii` **또는 equivalent** 를 consult_contract 진입에 배선.
- **scan 대상:** `session_context` · `service_context` · `product_context` **모두**.
- **동작:** raw utterance / PII 패턴(email/phone/RRN) / raw 식별자(customer_id/user_id/anonymous_id) 발견 시 → **fail-closed reject**(수용·반영 금지).
- **assertion:** `session_context_out` echo도 clean(raw/PII 0).
- ★**현재 미배선(W26)** — foundation_http_service에 has_raw_or_pii 미연결(grep 0). **M5 구현 전 필수**. §9 테스트에서 `session_context 내 raw/PII/식별자 = 0` assert.

## 8. memory_reuse_decision
- **현재 FRC 미배선**(W15) → **shadow / default OFF**.
- ★**deleted/blocked/expired/consent 없는 memory 재사용 금지**(must_not_reappear).
- ★**service-side filter 우선:** 서비스가 memory_context 조립(§6-1) 시 deleted/blocked/expired fact를 **애초에 제외**(fail-closed). FRC `memory_reuse_decision`(allowed/blocked/expired/deleted/consent_required/not_available) 필드 추가는 후속 release train.

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
    {"signal_kind": "wishlist", "product_ref": "fprod_synthetic_a", "privacy_level": "internal"}
  ],
  "consent_flags": {"consent_scope": "same_service", "sensitivity_level": "normal"},
  "retention_flags": {"retention_policy": "standard_ttl"},
  "trace_refs": {"request_id": "fdsh_1111111111111111"}
}
```
★두 예시 모두: raw utterance/email/phone/name/user_id/anonymous_id/order/payment **없음** · subject_ref 미전송 · hash는 keyed 표기.

## 무결성
코드 변경 0 · migration 0 · source push 0 · raw 고객데이터/secret 미열람 · 예시 fake/synthetic only. Control verdict 상한 = DESIGN_READY(Fable5 FINAL_PASS 필요).
