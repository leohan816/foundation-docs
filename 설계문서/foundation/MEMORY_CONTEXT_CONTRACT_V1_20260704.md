# MEMORY_CONTEXT CONTRACT V1 (M3) — ephemeral request context 계약

> 작성: foundation-control · 2026-07-04 · **상태: DESIGN (M3 계약 문서 · 구현 전 · v1.2)** · Control verdict 상한 = DESIGN_READY · 최종 FINAL_PASS = Fable5/독립 reviewer.
> ★**v1.2 = delta-2(94bd93b)+delta-3 반영:** whitelist 재정합(B15)·enum 정본 고정(ConditionCategory/last_refined_intent 11값/SummaryIntentTag)·predicate 정정·guest_ref keying·at-rest §11·V0 SUPERSEDED §12 · §7 ingress gate = 신규 default-deny 스펙(unknown-key reject·whitelist 강제·nested·식별자 차단·raw 휴리스틱·상한·fail-closed) · §4 catalog item 표(match_reason 자유문장 금지) · session_ref prefix/HMAC(bare UUID 불허) · candidate fact_state 2값.
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
  - `request_memory_context_version` — SSC.session_context.request_memory_context_version에 착지(호환 모드 판별 키).
- ★`session_context`/`service_context`/`product_context`는 **freeform** → **Foundation ingress raw/PII gate 대상**(§7). 착지 필드가 freeform이므로 **경계는 typed schema가 아니라 ingress default-deny scan으로 강제**한다.

## 4. 허용 필드 (whitelist) — ★B15 재정합(Fable5 delta-2·앵커 §P + 실코드 소비 필드)
★**REG-1 해소:** unknown-key reject(§7)와 정상 echo/carry 충돌 방지 — whitelist = **앵커 §P + `core.py` session_out echo/consume 필드 전체**를 포함해 **Foundation 자신의 echo가 다음 요청 gate를 통과**하게 한다.
**전역 상한(초과 시 fail-closed):** context total ≤ **32 KB**(1차 제한) · nesting depth ≤ **5** · 총 item count ≤ **2,048**(폭주 백스톱·★불변식: 전역 count ≥ Σ per-field max — per-field 합계(≈1,376)가 전역에 걸리지 않게 유지).

| 필드 | type | enum/형식 | max count | truncation rule |
|---|---|---|---|---|
| `service_id` | string | `siasiu`\|`cosmile` | — | — |
| `request_memory_context_version` | string | `mctx-1.0` | — | 미일치 = reject |
| `session_ref` | string | ★opaque(§5.1): `sess_ref_*` 또는 keyed-HMAC ref (≤128 char·bare UUID 불허 — §5.1) | — | — |
| `stated_concerns` | []string | ★ConditionCategory vocabulary(하단 enum 정본·원문❌) | ≤64 | ★append-only → cap 64·oldest-drop(FIFO) |
| `recommendation_deferred` | bool | true\|false | — | — |
| `last_refined_intent` | string | intent enum(refined·≤64 char) | — | — |
| `safety_facts` | object | `{avoid_ingredient:[atom], allergy:[atom/enum], pregnancy_nursing:bool}` | 각 ≤128 | ★immutable union carry·dedupe·**drop 금지**·상한 초과=reject(이상신호) |
| `known_allergy_atoms` | []atom | atom_ref | ≤128 | dedupe |
| `avoid_ingredient_atoms` | []atom | atom_ref | ≤128 | dedupe |
| `episode_summary_refs` | []object | `{summary_id, content_hash(keyed), intent_types, risk_level}` | ≤32 | oldest-drop |
| `ltm_fact_refs` | []object | `{type(registry enum), norm_value/atom, fact_state, confidence}` | ≤256 | — |
| `product_refs` | []string | canonicalProductId | ≤128 | — |
| `product_context.catalog_candidates` | []object | ★하단 item 표(자유문장 금지) | ≤128 | ★catalog 경로 유지(REG-1) |
| `commerce_signal_refs` | []object | `{signal_kind, product_ref, privacy_level}` | ≤128 | — |
| `consent_flags` | object | `{consent_scope, sensitivity_level}` | — | — |
| `retention_flags` | object | `{retention_policy}` | — | — |
| `safety_flags` | object | `{has_safety_fact:bool, pregnancy_nursing:bool}` | — | — |
| `user_constraints` | object | `{no_recommendation:bool, explanation_only:bool}` | — | — |
| `trace_refs` | object | `{request_id/trace_id: hex·raw id 아님}` | — | — |

- ★**enum 정본(통일·1개):** `privacy_level = anonymous | user_consented | aggregated`(**앵커 §M/§P 정본** — v1.1의 `normal|sensitive|restricted` **폐기**) · `sensitivity_level = low | normal | sensitive | high`(code `SENSITIVITY_LEVELS` 기준·앵커 3값→4값 정정·M2 §4 동일) · `fact_state = active | hypothesis | superseded` · ConditionCategory = dryness | barrier | sensitivity | wrinkle | pigmentation | pore | acne | oiliness (정본 출처 = core.py _CONDITION_KW 키 — FactTypeRegistry 아님·registry는 fact type 목록. vocabulary 확장 시 _CONDITION_KW와 동기 갱신).
- ★**append-only 성장 필드 truncation:** `stated_concerns`·`episode_summary_refs`는 세션 누적 → 상한 도달 시 **oldest-drop(FIFO)**. `safety_facts`는 안전이라 **drop 금지**(상한 초과=reject). → gate가 정상 성장 echo를 reject하지 않도록 전역 상한을 넉넉히.
- ★모두 **opaque refs·enum·atom·bool·hash(keyed)** — 원문/평문 **고객** 식별자·고객 원문 없음. (예외: catalog_candidates item의 name/brand/category = 카탈로그 공개 표시 데이터 — D3-02 item 표 제약(≤128자·PII 스캔) 하에 허용)

**★catalog_candidates item 허용 필드 (D3-02·이외 key = reject):**
| item 필드 | type | 제약 |
|---|---|---|
| `product_id` | string | 필수·canonical ref |
| `slug` | string | opt·opaque ref |
| `name` / `brand` / `category` | string | opt·카탈로그 공개 표시 데이터(고객 데이터 아님)·각 ≤128자·PII 정규식 스캔 통과 필수 |
| `concerns` | []string | opt·ConditionCategory enum |
| `grounding` | object | opt·{category: ConditionCategory, concerns: [ConditionCategory], match_level: string ≤16자·자유문장 금지(값 정본은 M5 배선 시 readiness adapter 산출값으로 고정)} |
| ~~`match_reason`~~ | — | ★금지(자유문장) — 필요 시 reason_code enum으로 대체(후속) |

**★enum 값 정본 (gate rule 2 검증 기준·D3-05·괄호=코드/문서 출처):**
| enum | 값 | 정본 출처 |
|---|---|---|
| ConditionCategory | dryness\|barrier\|sensitivity\|wrinkle\|pigmentation\|pore\|acne\|oiliness | core.py _CONDITION_KW(:167) |
| risk_level | none\|low\|medium\|high | 앵커 §I-3(코드 judge risk = low\|medium\|high 부분집합·none=요약 무위험) |
| last_refined_intent | greeting\|comparison_question\|skin_concern_explanation\|education_request\|routine_guidance\|product_recommendation_request\|vague_product_request\|clarify_concern_axis\|safety_question\|adverse_or_sensitivity_signal\|cannot_determine (11값) | ★core.py `_refine_intent` **실산출 집합**(:597-631)이 정본·본 표는 사본. (주의: `_INTENT_SIGNAL_OK`(:27)·`small_talk` 등 입력측 어휘는 last_refined_intent로 echo되지 않음 — enum에 미포함) |
| intent_types (episode_summary_refs) | ★별도 SummaryIntentTag vocabulary(서비스 요약 태그): product_fit\|safety\|education\|routine\|comparison\|greeting\|other (초안·M4 확정) | 서비스-소유 요약 태그 — last_refined_intent와 **별개 enum**(§10 예시 'product_fit' 멤버) |
| signal_kind | view\|add_to_cart\|checkout\|purchase\|wishlist\|alert\|coupon\|ai_verdict | 앵커 §L |
| consent_scope / sensitivity_level / privacy_level / retention_policy / fact_state | (기존 정본 유지) | M2 §6·§4 / 앵커 §M |

## 5. 금지 필드 (blacklist · 하나라도 발견 시 ingress reject)
- `raw utterance` / **raw 상담 원문** / `summary_text plaintext` / `value_display plaintext`
- `email` / `phone` / `name`
- `customer_id` / `user_id` / `anonymous_id` / **`session_id`(raw key)** (raw 식별자)
- `raw order / payment / shipping` (주문번호·결제·배송주소)
- `raw query / body`
- ★subject_ref도 **미전송 권장**(Foundation은 broker 아님·고객 memory 미조회).

### 5.1 session_ref opaque 형식 스펙 (★item 8·D-14)
raw `session_id` key는 금지(§5)하되 **opaque `session_ref`는 허용** — 판별 기준:
- 허용: **sess_ref_*** prefix 또는 **keyed-HMAC ref**(서비스 secret 파생·예: hmac_* / sref_v1_*) · ≤128자 · 값에 고객 식별자/원문/DB PK 미포함.
- 금지: raw DB session_id(내부 PK 직노출·★bare UUID 포함 — prefix 없는 UUID는 DB PK와 값-판별 불가하므로 허용 형식에서 제외) · customer-linked session_id.
- ★서비스 의무 명문: 서비스는 자기 DB session PK를 그대로 보내지 않고 prefix/HMAC ref로 변환해 보낸다(gate는 prefix/형식만 검증 가능 — PK 여부는 서비스-side 의무).
- ★키 이름 `session_id` = **reject** · 필드 `session_ref`(prefix/HMAC 형식 검증 통과) = **allow**(§7-4).

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
2. **field별 type/enum 검증:** 허용 필드의 **타입·enum은 §4 정의표를 정본**으로 검증(service_id∈{siasiu,cosmile}·risk_level·last_refined_intent·consent_scope·sensitivity_level·privacy_level·fact_state) — §4에 없는 enum(예: 스펙 오염된 `role`) 사용 금지. 위반 reject.
3. **nested recursive scan:** dict/list **재귀 스캔**(top-level만 검사 금지) — 중첩 내부 raw/PII/식별자 탐지.
4. **식별자 차단:** `customer_id`·`user_id`·`anonymous_id`·**`session_id`(raw)**·`order`·`payment`·`shipping` 키/값 **차단**(기존 gate 누락분 명시 추가).
5. **raw text/name/address 차단:** email/phone/RRN 정규식 + **한국어 raw 상담원문·이름·주소 휴리스틱**(길이·자연어 패턴)·free-text 필드는 whitelist 외 **거부**.
6. **크기/깊이/개수 상한:** context **byte size·nesting depth·item count 상한** — 초과 시 **fail-closed reject**(context 폭탄·재귀 crash 방지).
7. **위반 시 fail-closed:** 어느 항이든 위반 = **reject**(수용·반영·저장 0).
8. **echo clean assertion:** `session_context_out` echo도 raw/PII/식별자 0 유지(§9 assert).
- ★**scan 대상:** `session_context` · `service_context` · `product_context` **모두**(재귀).
- ★**CUTOVER echo round-trip 호환(REG-1 해소·필수):** whitelist(§4)는 **Foundation 자신이 만든 `session_context_out` echo/carry 필드(`stated_concerns`·`safety_facts`·`recommendation_deferred`·`last_refined_intent`·`user_constraints`·`catalog_candidates`)를 전부 포함**한다 → **이전 요청의 `session_context_out`이 다음 요청 `session_context_in`으로 재송신될 때 gate를 통과**(2턴째 세션 연속성·safety carry·catalog 경로 유지). gate가 **자기 echo를 reject하지 않음**을 §9에서 assert.
- ★version gate: request_memory_context_version 없는/구버전 legacy payload = 호환 모드. ★호환 모드에서도 §5 blacklist·PII 정규식·식별자 차단(rule 4)·raw 휴리스틱(rule 5)·크기/깊이/개수 상한(rule 6)은 무조건 적용된다 — 면제는 §4 whitelist 강제(rule 1)와 field enum 검증(rule 2)뿐. ★version 필드 생략 = whitelist 강제 유예일 뿐 gate 우회가 아니다(악성 payload는 여전히 reject).
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
- ★**CUTOVER echo round-trip 호환 assert(REG-1·item 2·필수):**
  - `assert gate(previous session_context_out) == pass` — **이전 session_context_out을 다음 session_context_in으로 재송신 시 gate 통과**(2턴째 세션 거부 0).
  - `assert safety_facts carry pass` — `{avoid_ingredient, allergy, pregnancy_nursing}` immutable union carry가 2턴째에도 gate 통과·유지.
  - `assert product_context.catalog_candidates pass` — catalog 경로가 gate에서 죽지 않음.
  - `assert gate(unknown malicious key) == reject` — whitelist 외 악성 key(customer_id·raw 원문 등) reject.
- 기존 regression 유지: Foundation runner 89/89·SIASIU 39/39·119/119·Cosmile readiness 164/164·loop 112/112. ★기존 CUTOVER 트래픽(session_context echo·safety carry·catalog)이 신규 gate로 파괴되지 않음 확인.
- ★중단 조건: session_context ingress raw/PII/식별자>0 · deleted/blocked/expired reuse>0 · write/live/promotion>0 · **정상 echo/safety carry/catalog가 gate에 reject>0**.

## 10. SIASIU / Cosmile 예시 payload (★fake/synthetic only)
> ★아래는 **합성 예시**다. 실제 고객 데이터·secret·PII 아님.

**SIASIU (상담·안전 fact 예시):**
```json
{
  "service_id": "siasiu",
  "request_memory_context_version": "mctx-1.0",
  "session_ref": "sess_ref_synthetic_0001",
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
  "session_ref": "sess_ref_synthetic_9002",
  "ltm_fact_refs": [{"type": "concern", "norm_value": "pigmentation", "fact_state": "active"}],
  "product_refs": ["fprod_synthetic_a", "fprod_synthetic_b"],
  "commerce_signal_refs": [
    {"signal_kind": "wishlist", "product_ref": "fprod_synthetic_a", "privacy_level": "user_consented"}
  ],
  "consent_flags": {"consent_scope": "same_service", "sensitivity_level": "normal"},
  "retention_flags": {"retention_policy": "standard_ttl"},
  "trace_refs": {"request_id": "fdsh_1111111111111111"}
}
```
★두 예시 모두: raw utterance/email/phone/name/user_id/anonymous_id/order/payment **없음** · subject_ref 미전송 · hash는 keyed 표기.

## 무결성
코드 변경 0 · migration 0 · source push 0 · raw 고객데이터/secret 미열람 · 예시 fake/synthetic only. Control verdict 상한 = DESIGN_READY(Fable5 FINAL_PASS 필요).
