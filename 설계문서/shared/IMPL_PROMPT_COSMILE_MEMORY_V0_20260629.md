# Implementation Prompt — COSMILE Claude Code — Commerce/Platform Event Signal Outbox v0 (dev/shadow)

> **수신자 / Recipient:** Cosmile 레포 로컬 Claude Code (repo-local Claude Code for the Cosmile repository)
> **발신 / Issued by:** foundation-control (cross-platform design train) — Leo 승인 하에서만 실행
> **단일 계약 / SoT:** `contracts/CROSS_PLATFORM_SHARED_MEMORY_CONTRACT_V0.md` (이 프롬프트는 계약을 100% 준수한다)
> **역할 경계 / Role Boundary:** `docs/CROSS_PLATFORM_SHARED_MEMORY_ROLE_BOUNDARY_20260629.md`
> **버전 / Scope:** v0 = **synthetic subject 기반 dev/shadow simulation. 실사용자 live 아님.**
> `applied_to_real_user=false`, `write_live=false`, `raw_text_stored=false`, raw/PII/상담원문 Foundation 저장 **금지**.
> **Date:** 2026-06-29

---

## 0. ★ROLE CORRECTION — 이 프롬프트는 정정본 / This prompt is the CORRECTED version

> **이전(OLD) 버전은 Cosmile을 "Memory Candidate Adapter"로 잘못 규정했다 — 그 규정은 폐기·정정되었다.**
> Cosmile은 고객 memory를 **추출/해석/추론/승격하지 않는다.** Cosmile이 맡는 것은 오직 **commerce/platform EVENT SIGNAL OUTBOX** —
> raw/PII 없는 구조화 사실(fact)인 `PlatformEventSignal`을 outbox로 내보내는 것뿐이다.
> 의미 부여 · memory 도출 · gate · 저장 · subject identity · consent/scope/retention 은 **Foundation**이 소유한다.

| 구분 | OLD (폐기) | NEW (이 프롬프트 / 계약 §4) |
|---|---|---|
| Cosmile 역할 | ~~Memory Candidate Adapter~~ | **Commerce/Platform Event Signal Outbox** |
| 산출 객체 | ~~`MemoryCandidate`~~ | **`PlatformEventSignal`** |
| 고객 해석 | ~~Cosmile가 요약/추론~~ | **`interprets_customer=false`** (Foundation이 도출) |
| memory 후보 | ~~Cosmile가 candidate 생성~~ | **`memory_candidate=false`** (signal ≠ candidate) |

---

## 1. 한 줄 요약 / TL;DR

Cosmile 안에 **Commerce/Platform Event Signal Outbox (dev/shadow, flag OFF)** 를 구축하라.
플랫폼 commerce 이벤트(`product_view` / `wishlist` / `cart` / `purchase` / `consultation_session_meta`)를 입력으로 받아 →
**집계/범주 ref(aggregate/category refs) + `evidence_refs` + `hash`** 만으로 계약 §4의 `PlatformEventSignal` 객체를 만든다.
**원문(raw text) 없음 · PII 없음 · 주문ID / 금액상세 없음.** `interprets_customer=false`, `memory_candidate=false`.
이 signal로부터 memory를 도출할지(gate 경유)는 **Foundation이 스스로 결정**하고, Cosmile은 **Foundation verdict를 표시(소비)** 만 한다.
Cosmile은 해석/추론/personalization/"이 고객은 X" 생성/자체 저장을 **하지 않는다.**

---

## 2. 역할 / 경계 (Cosmile = commerce/platform event signal outbox ONLY)

| 계층 | 소유 | 본 outbox에서의 취급 |
|---|---|---|
| Platform Local (Cosmile) | Cosmile | 상담 원문 · 주문/결제/배송/장바구니/찜/방문/구매/CS · 플랫폼별 고객정보 → **로컬에 머무름, 경계 못 넘음** |
| Foundation Global Subject Identity | Foundation | `subject_ref`(salted hash) 발급/해석은 **Foundation 소유**. Cosmile는 `local_user_ref`만 제공 |
| Foundation Shared AI Memory | Foundation | 요약/refs/hash만 저장(shadow). Cosmile는 **signal만 내보냄, memory 미생성** |
| Foundation Interpretation / Derivation | Foundation | signal → memory 도출 여부는 **Foundation이 결정**. Cosmile는 의미 부여 안 함 |
| Foundation Memory Gate | Foundation | signal로부터 도출된 candidate를 allow/block/session_only/ask_consent/delete/expired 판정. Cosmile는 **소비만** |

**흐름 (계약 §0 · §4):** Cosmile **emit signal(outbox)** → Foundation **해석·memory 도출·gate decide** → (allow 시) Foundation shadow write → Cosmile은 **verdict 표시(소비)** 만.
Cosmile은 절대 self-interpret / self-decide / self-store / personalize 하지 않는다.

---

## 3. 빌드 대상 / What to build

### 3.1 Commerce/Platform Event Signal Outbox (신규, dev/shadow)

플랫폼 commerce 이벤트를 **집계·범주 ref**로만 변환하여 `PlatformEventSignal`로 내보내는 outbox 어댑터 모듈을 만든다.

| `event_kind` | 입력 (Cosmile local) | 변환 규칙 (aggregate/category refs ONLY) |
|---|---|---|
| `product_view` | 상품 페이지 방문 | `category_ref`(`cat:...`) + `count` + `recency_bucket` 집계만. **상품ID/상품명 원문 금지** |
| `wishlist` | 찜 | 카테고리 범주 ref + 집계 버킷만. **개별 아이템 식별자 금지** |
| `cart` | 장바구니 | 카테고리 ref + 수량/빈도 버킷만. **SKU/가격 원문 금지** |
| `purchase` | 구매 | 카테고리 ref + recency 버킷만. **★주문ID·금액상세·결제정보 금지** |
| `consultation_session_meta` | 상담 세션 메타(존재/시점/채널 등) | 메타 신호만(세션 발생 사실/recency 버킷). **★상담 원문·질문/답변 본문 금지** (원문은 SIASIU local) |

규칙 (계약 §4):
- 모든 commerce 이벤트는 **집계/범주 ref**(`category_ref` / `count` / `recency_bucket`) + `evidence_refs`로만 signal화. **원문/PII/금액상세/주문ID 금지.**
- `interprets_customer=false` — Cosmile은 고객을 해석하지 않는다. "이 고객은 X" 같은 추론/라벨 **생성 금지.**
- `memory_candidate=false` — signal은 memory candidate가 **아니다.** `write_intent`(candidate/approved)를 **주장하지 않는다.**
- `raw_text_stored=false` — 원문 미전송, 미저장.
- Cosmile은 Foundation verdict를 **표시(소비)** 만 — 해석/도출/판정/저장은 Foundation.

### 3.2 기존 dev/flag-OFF 배선 재사용 (b048e55)

- 커밋 **`b048e55`의 `foundationConsultationClient`** dev/flag-OFF 배선을 **재사용**한다. 새 전송 경로/새 always-on 클라이언트를 만들지 말 것.
- 기존 `FoundationSignalOutbox`는 **`pending`만 큐잉(전송 없음)** 상태를 유지 — 본 v0에서 실제 transmit를 켜지 않는다.
- 모든 신규 코드는 **flag OFF 기본**. 플래그가 OFF면 outbox는 signal을 생성/검증만 하고 외부로 보내지 않는다(in-process/dev/shadow).

---

## 4. PlatformEventSignal Schema (★계약 §4 — 필드명 EXACT, 변경 금지)

```jsonc
{
  "subject_ref": "subj_<salted-hash>",          // Foundation 소유 global subject id (평문 PII 없음)
  "source_service": "cosmile",                   // ★Cosmile outbox = 항상 "cosmile"
  "local_user_ref": "<opaque>",                  // 플랫폼 로컬 식별자(평문 PII 아님; subject_ref 해석은 Foundation)
  "signal_id": "sig_<id>",
  "event_kind": "product_view | wishlist | cart | purchase | consultation_session_meta",
  "aggregate": { "category_ref": "cat:...", "count": 0, "recency_bucket": "..." }, // 집계/범주 ref만 — 원문/PII/금액상세/주문ID 금지
  "evidence_refs": ["ref:..."],                  // refs/hash만 (raw 본문 없음)
  "created_from": "commerce_event",
  "raw_text_stored": false,                       // ★항상 false (불변식)
  "interprets_customer": false,                   // ★Cosmile은 고객을 해석하지 않는다
  "memory_candidate": false,                      // ★signal ≠ memory candidate
  "applied_to_real_user": false,                  // ★불변식
  "write_live": false                             // ★불변식
}
```

**불변식 (코드 강제):** `raw_text_stored=false`, `interprets_customer=false`, `memory_candidate=false`, `applied_to_real_user=false`, `write_live=false`.
원문/PII 필드(`query`/`body`/`email`/`phone`/`RRN`/`customer_name`) 및 `order_id`/`amount`/`price`/`sku` 원문 **금지** → 들어오면 Foundation gate가 `block`.

### 4.1 Cosmile outbox 필드 셋업 규칙

| 필드 | Cosmile outbox가 채우는 값 |
|---|---|
| `subject_ref` | Foundation `resolve_subject(...)` 결과만 사용 (Cosmile가 직접 생성/추측 금지) |
| `source_service` | 항상 `"cosmile"` |
| `local_user_ref` | Cosmile 로컬 opaque ref (평문 PII 아님) |
| `signal_id` | `sig_<id>` (Cosmile 로컬 생성) |
| `event_kind` | §3.1 표(`product_view`/`wishlist`/`cart`/`purchase`/`consultation_session_meta`) |
| `aggregate.category_ref` | `cat:...` 범주 ref만 (상품/주문 원문 식별자 금지) |
| `aggregate.count` | 집계 카운트(정수) |
| `aggregate.recency_bucket` | recency 버킷(예: `7d`/`30d`) — 정확 timestamp 금지 권장 |
| `evidence_refs` | `["ref:..."]` refs/hash만 |
| `created_from` | 항상 `commerce_event` |
| `raw_text_stored` | **항상 `false`** |
| `interprets_customer` | **항상 `false`** |
| `memory_candidate` | **항상 `false`** |
| `applied_to_real_user` | **항상 `false`** |
| `write_live` | **항상 `false`** |

> ★`memory_kind` / `sensitivity_level` / `consent_scope` / `gate_decision` / `write_intent` 등 **memory candidate 필드는 Cosmile signal에 없다.** 이는 Foundation이 signal을 해석해 candidate를 도출할 때만 사용된다.

---

## 5. Foundation 연동 (계약 §2/§4 — emit + verdict 표시만, 해석/구현 아님)

★in-process/dev/shadow only. public API live 아님. 모든 응답에 `applied_to_real_user=false, write_live=false`.

| 호출 | Cosmile outbox의 사용 |
|---|---|
| `resolve_subject(source_service, local_user_ref, consent_record)` | `subject_ref` 획득. consent 없으면 link 안 됨(fail-closed) — Cosmile는 link 강제 금지 |
| `emit_signal(PlatformEventSignal)` (outbox) | signal 제출(flag OFF면 `pending` 큐잉만, 전송 없음). **Cosmile는 memory 도출 여부를 주장하지 않음** |
| Foundation 해석/gate (`gate_decision` 등) | **Foundation 소관.** signal → memory 도출/판정은 Foundation이 수행. Cosmile는 호출/구현하지 않음 |
| Foundation verdict | **표시(소비)만** — Cosmile UI는 Foundation이 돌려준 verdict를 보여줄 뿐, 자체 판정/해석 안 함 |

**Cosmile는 gate를 구현/우회하지 않고, memory를 도출하지 않으며, verdict를 받아 표시만 한다 (fail-closed).**

---

## 6. Foundation verdict 표시(소비) 매핑 (Cosmile 동작)

| Foundation verdict | Cosmile outbox/UI 동작 |
|---|---|
| (memory 도출됨/allow) | Foundation shadow write에 위임 — Cosmile는 자체 저장 안 함, verdict만 표시 |
| (block) | signal 폐기/보류, 로그만(원문/PII 없이) |
| (session_only) | 세션 한정 표시, 영속 저장 안 함 |
| (ask_consent) | consent 흐름 대기 — 동의 전 cross_service 사용/표시 금지 |
| (delete / expired) | 미사용 반영, `must_not_reappear` 준수, 재confirm 전 사용 안 함 |

> Cosmile은 어떤 경우에도 verdict를 **생성**하지 않는다. Foundation이 도출/판정한 결과를 **표시(소비)** 만 한다.

---

## 7. read_scope 규칙 (계약 §7)

- `same_service`: Cosmile 자신만 읽기.
- `cross_service`: **`consent_scope=cross_service`** 일 때만 (예: Cosmile가 SIASIU 상담 요약 표시).
- `foundation_only`: 서비스 미노출.
- subject_ref mismatch / consent 부족 → read **block**.

---

## 8. Acceptance Criteria (수용 기준 — 모두 충족해야 함)

| # | 기준 | 검증 |
|---|---|---|
| A1 | **Synthetic subject만** 사용, 실사용자 0건 | 테스트 픽스처가 synthetic subject임을 단언 |
| A2 | **dev/shadow** 경로만, **flag OFF 기본** | flag OFF에서 외부 transmit 0건 (b048e55 배선 재사용) |
| A3 | signal 전 필드 `raw_text_stored=false` | 스키마 검증 / 단위테스트 |
| A4 | `interprets_customer=false`, `memory_candidate=false` 전건 | 불변식 어서션 (Cosmile는 해석/후보 생성 안 함) |
| A5 | `applied_to_real_user=false`, `write_live=false` 전건 | 불변식 어서션 |
| A6 | **orders/customers DB write 0건** | DB write 경로 미접근 확인 (checkout/order/customer DB 미터치) |
| A7 | **PII가 플랫폼을 떠나지 않음** (no PII leaving platform) | signal에 query/body/email/phone/RRN/customer_name 부재 검증 |
| A8 | commerce 이벤트는 **집계/범주 ref**로만 signal화 | 상품/주문 원문 식별자·금액상세·주문ID 부재 검증 |
| A9 | `event_kind`는 5종(`product_view`/`wishlist`/`cart`/`purchase`/`consultation_session_meta`)만 | enum 검증 |
| A10 | Cosmile은 **memory를 도출/판정하지 않음** (no interpretation/derivation/gate) | Cosmile 코드가 verdict/candidate 생성 안 함 |
| A11 | `consultation_session_meta`는 **메타만**, 상담 원문 부재 | 질문/답변 본문 부재 검증 (원문 SIASIU local) |
| A12 | 기존 회귀 보존: Cosmile readiness 등 기존 테스트 그대로 통과 | 기존 스위트 green 유지 |
| A13 | Leo 승인 + dev/shadow 범위 내 | 승인 기록 |

---

## 9. FORBIDDEN — 아래는 본 v0에서 모두 **DISABLED 유지** (별도 승인 대상)

다음은 **켜지 않으며**, 본 train으로 **활성화되지 않는다**:

- ❌ production live / public API live
- ❌ real customer memory write (실고객 메모리 쓰기)
- ❌ customer PII storage (고객 PII 저장)
- ❌ 상담원문 Foundation 저장
- ❌ checkout / order / customer DB write
- ❌ canonical / learned / Vault write
- ❌ memory.db 생성/접근
- ❌ force push
- ❌ real user exposure (실사용자 노출)
- ❌ **customer memory extraction / personalization** (Cosmile은 고객 memory 추출/개인화 안 함)
- ❌ **추론 / 장기기억 승격 / "이 고객은 X" memory candidate 생성** (Cosmile은 해석·도출 안 함)
- ❌ Cosmile가 gate 판정/해석 자체 수행 / 자체 저장 (self-interpret / self-decide / self-store)
- ❌ `subject_ref` 평문 PII 노출 / Cosmile가 subject_ref 직접 생성
- ❌ signal에 `order_id` / `amount` / `price` / `sku` 원문 / 금액상세 포함
- ❌ `FoundationSignalOutbox`의 실제 transmit ON (pending 큐잉 유지)

모든 signal/decision/read는 `applied_to_real_user=false`, `write_live=false`, `raw_text_stored=false`, `interprets_customer=false`, `memory_candidate=false`.

---

## 10. Constraints & 운영 모델

- **레포 경계:** 본 프롬프트는 Cosmile 레포 로컬 Claude Code의 작업 지시다. 설계/계약은 foundation-control에 있고, 구현은 **Cosmile 레포 안에서** 수행한다 (FOUNDATION/SIASIU 미수정).
- **계약 우선:** 충돌 시 `CROSS_PLATFORM_SHARED_MEMORY_CONTRACT_V0.md`(§4) · `CROSS_PLATFORM_SHARED_MEMORY_ROLE_BOUNDARY_20260629.md`가 우선. 스키마 필드명은 EXACT 유지.
- **재사용 우선:** b048e55 `foundationConsultationClient` dev/flag-OFF 배선 재사용. 신규 always-on 경로 금지.
- **역할 한정:** Cosmile = **signal outbox only.** 해석·memory 도출·gate·저장·identity·consent는 Foundation 소유. Cosmile은 verdict 표시(소비)만.
- **Leo approval:** 머지/실행은 Leo 승인 후, dev/shadow 범위 내에서만.

---

## 11. Deliverables (Cosmile 레포 산출물)

1. Commerce/Platform Event Signal Outbox 모듈 (`product_view`/`wishlist`/`cart`/`purchase`/`consultation_session_meta` → `PlatformEventSignal`, aggregate/category refs only, flag OFF 기본).
2. Foundation `emit_signal`/`resolve_subject` 연동 + verdict **표시(소비)** 어댑터 (self-interpret/self-decide/self-store 없음, memory 도출 없음).
3. 불변식 검증 단위테스트 (A3/A4/A5/A7/A8/A11 — raw/PII/주문ID/금액 부재, `interprets_customer=false`·`memory_candidate=false`, 집계만).
4. 회귀 보존 확인 (기존 Cosmile 스위트 green).
5. 변경 요약 + Forbidden 체크리스트 + Leo 승인 기록.
