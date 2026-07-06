# COSMILE MEMORY V3-05 — Product / Ingredient Intelligence Mapping

> 작성: foundation-control · 2026-07-06 · design-only · no code · Hard Stop 무접촉

---

## 0. 목적과 위치

V3-05는 **추천을 "상품 단위"가 아니라 "성분·피부고민·민감도·재구매·마진 단위"로 연결**하기 위한
Product/Ingredient Intelligence Mapping 설계다. Cosmile의 상품 카탈로그를
성분 프로파일 / 피부 목표 태그 / 민감·금기 신호 / 가격·마진 밴드 / 재고 상태로 구조화하여,
V3 Learning Commerce Memory Loop가 "이 사람에게 왜 이 성분이 맞고/안 맞는가"를 기억·학습·개선할 수 있게 한다.

이 문서는 **설계 + 계약 + 검토 가능한 구현 계획**이다. 구현/테스트가 끝났다고 말하지 않는다.
Cosmile postgres는 현재 **schema/validate 수준**이며 real DB-integration은 완료로 간주하지 않는다.

관련 sibling 문서(파일명 기준 상호참조):

- `COSMILE_MEMORY_V3_01_*` — V3 전체 loop / 정체성 · Memory V1 상속 개요
- `COSMILE_MEMORY_V3_04_*` — 상담결과·추천이유·product_view/add_to_cart/checkout/order·revenue/margin 이벤트 스키마 (본 문서의 상류)
- `COSMILE_MEMORY_V3_06_*` — MemoryFactCandidate → evidence/confidence → LongTermMemoryFact 승격 (본 문서의 하류)
- `COSMILE_MEMORY_V3_07_*` — Safety / adverse-reaction gate (본 문서 §6 contraindication/sensitivity가 **feed**하는 대상)

V3-05의 역할은 **catalog intelligence를 표준화**하는 것이고, safety 최종 판정은 V3-07이,
memory 승격은 V3-06이 소유한다. 이 문서는 **입력 구조와 매핑 계약**만 정의한다.

---

## 1. 상속 (Memory V1 = CLOSED_WITH_LIMITS)

- V3는 **Memory V1 Option B를 canonical로 상속**한다. **Option A / `FOUNDATION_SUBJECT_REF_SECRET` mint는 상속하지 않는다(superseded).**
- subject_ref mint는 **service-local**:
  `subj_v2_ + HMAC(<SVC>_SUBJECT_SECRET, '<svc>:subject:' + ref)[:32]`.
  furef = `furef_v2_ + HMAC(<SVC>_FUREF_SECRET, '<svc>:local_user:' + ref)[:32]` (cross-producer 일관).
- Foundation = **validate / gate / reasoning 전용**. Foundation은 durable customer memory DB가 아니고
  SIASIU/Cosmile service DB를 직접 읽지 않는다. Foundation에는 minimized, request-scoped `memory_context`만 전달한다
  (raw text/PII 없음 · `raw_text_stored=False` · `request_scoped`).
- 상품·성분·재고·가격·마진 카탈로그와 customer memory는 **Cosmile가 소유**한다(service-local, postgres schema `cosmile`,
  cross-schema 직접 참조 없음). SIASIU schema를 직접 참조하지 않는다.
- ★상품/성분 원본 카탈로그가 곧 customer memory는 아니다. **catalog = service data**, **memory = 학습된 사실**. 두 계층을 섞지 않는다.

---

## 2. Product/Ingredient Intelligence — 핵심 필드 계약

아래는 Cosmile-owned catalog intelligence 레코드의 필수 필드 설계다.
(schema/validate 수준 · 실제 DB 백필 아님 · Hard Stop 무접촉)

| 필드 | 타입 | 소유 | 설명 | 비고 |
|---|---|---|---|---|
| `product_id` | string (id) | Cosmile | 상품 canonical id | 안정 키 |
| `sku_id` | string (id) | Cosmile | 판매 단위(용량/구성) id | product_id 하위 |
| `brand_id` | string (id) | Cosmile | 브랜드 id | 브랜드 단위 학습 hook |
| `ingredient_profile` | object[] | Cosmile | 전성분 구조화 리스트(성분명·기능·함량밴드) | INCI 기반 정규화 필요 ★ |
| `active_ingredients` | enum[] | Cosmile | 유효/기능성 핵심 성분 태그 | §3 enum |
| `avoid_ingredients` | enum[] | Cosmile | 회피 대상 성분 태그(민감/자극/상호작용) | §6 safety feed |
| `skin_goal_tags` | enum[] | Cosmile | 피부 목표(진정/미백/주름/보습 등) | §4 enum |
| `sensitivity_tags` | enum[] | Cosmile | 민감/알러지/트리거 태그 | §6 safety feed |
| `contraindication_notes` | object[] | Cosmile | 금기/주의 구조화 노트(조건·근거·출처) | §6 · V3-07 feed |
| `product_claims` | object[] | Cosmile | 마케팅/효능 표현(원문+분류) | §5 claim ≠ evidence |
| `price_band` | enum | Cosmile | 가격 밴드(범위 버킷) | 원가/실매가 아님 |
| `margin_band` | enum | Cosmile | 마진 밴드(버킷) | **safety보다 하위 우선순위** |
| `stock_status` | enum | Cosmile | 재고 상태 | 추천 필터 |
| `evidence_grade` | enum | Cosmile→Foundation validate | 성분-고민 매핑 근거 등급 | §5 |
| `mapping_source` | enum | Cosmile | 이 매핑의 출처(catalog/manual/derived) | audit |
| `updated_at` | timestamp | Cosmile | 매핑 갱신 시각 | staleness |
| `raw_text_stored` | bool(false 고정) | Cosmile | 원문 PII 저장 금지 불변식 | 항상 false |

★Leo 결정 필요: `ingredient_profile`의 정규화 표준(INCI 전체 vs 핵심 성분만 · 함량 실수치 저장 금지 여부).
함량은 **밴드/버킷**으로만 저장하는 것을 기본 제안(원가·배합비 같은 영업기밀/민감정보 회피).

---

## 3. active_ingredients / avoid_ingredients enum (제안)

`active_ingredients` (예시 · 확장 가능):

- `niacinamide` · `retinoid` · `vitamin_c` · `aha` · `bha` · `pha` · `hyaluronic_acid`
- `ceramide` · `peptide` · `centella` · `panthenol` · `azelaic_acid` · `spf_filter`

`avoid_ingredients` (회피/주의 대상 · 예시):

- `fragrance` · `essential_oil` · `high_alcohol` · `strong_acid` · `high_dose_retinoid`
- `known_allergen` · `photosensitizer` · `comedogenic_flag`

규칙:

- active/avoid는 **상호배타가 아니다**(같은 성분이 목표엔 active, 민감군엔 avoid일 수 있다).
- enum은 **controlled vocabulary**로만 확장한다. 자유 텍스트 성분명을 최종 판단 키로 쓰지 않는다.
- ★키워드/정규식이 raw 성분 원문을 **최종 확정**하지 않는다. 원문 성분 표기의 *의미 인식*은 AI semantic 정규화가,
  *정책 집행*(active/avoid 태깅 후 gate)은 deterministic rule이 한다. (헌법 Semantic/Policy Gate 상속.)

★Leo 결정 필요: enum 초기 vocabulary 범위 확정(K-뷰티 기능성 성분 우선순위 리스트).

---

## 4. skin_goal_tags enum (제안)

- `soothing`(진정) · `barrier_repair`(장벽) · `hydration`(보습) · `brightening`(미백/톤)
- `anti_wrinkle`(주름/탄력) · `sebum_control`(피지) · `pore_care`(모공) · `acne_care`(트러블)
- `sun_protection`(자외선) · `sensitivity_care`(민감케어)

규칙:

- `skin_goal_tags`는 상담결과(consultation)의 피부 고민과 **매핑 키**다.
- 매핑은 `skin_goal_tag × active_ingredient × evidence_grade` triple로 정규화한다(단순 상품→고민 flat 매핑 금지).
- ★brightening/anti_wrinkle 등은 **의학적 단정 표현 금지**(§5). "미백=치료" 식 표현 불가.

---

## 5. product_claims vs evidence (분리 원칙)

`product_claims`는 **마케팅 표현**이지 evidence가 아니다.

| claim 필드 | 설명 |
|---|---|
| `claim_text` | 원문 마케팅 표현(구조화 저장, PII 아님) |
| `claim_type` | enum: `functional_approved` / `general_cosmetic` / `marketing_soft` / `unverified` |
| `evidence_grade` | enum: `regulatory`(기능성 고시) / `clinical_ref` / `ingredient_rationale` / `catalog_claim_only` / `none` |

규칙:

- 추천 이유(reason)에는 **evidence_grade가 실린다.** `catalog_claim_only`/`none`은 근거로 승격 불가.
- 의학적 단정(치료·완치·부작용 없음 등) 표현은 **차단**하고 safety-first 문구로 강등(V3-07 연동).
- **claim이 강하다고 추천 우선순위를 올리지 않는다.** 우선순위는 evidence_grade + suitability + safety로 결정.

★Leo 결정 필요: `functional_approved`(기능성 화장품 고시) 신뢰 등급을 어디까지 evidence로 인정할지.

---

## 6. contraindication / sensitivity → Safety Feed (V3-07 연동)

이 절이 V3-05의 **가장 중요한 안전 접점**이다.

- `avoid_ingredients` · `sensitivity_tags` · `contraindication_notes`는 **safety 입력 신호**로 V3-07 safety gate에 전달된다.
- V3-05는 **신호를 구조화만** 한다. **최종 safety 판정(pass/caution/block)은 V3-07 + Foundation safety gate가 소유**한다.
- **Safety > commerce/revenue.** margin_band/price_band/stock_status가 아무리 유리해도
  sensitivity/contraindication 신호가 있으면 **추천 우선순위보다 safety가 먼저**다.
- "계속 써도 돼?" 류 발화(적정성·이상반응 함의)는 **safety-first**로 처리한다 — 재구매/마진 최적화보다 우선.
- 의학적 단정 금지. 금기 노트는 "주의/전문가 상담 권고" 톤으로만 표면화.

`contraindication_notes` 구조(제안):

| 필드 | 설명 |
|---|---|
| `condition` | 금기/주의 조건 태그(enum: `pregnancy` / `sensitive_skin` / `active_acne_rx` / `photosensitivity` / `known_allergy` ...) |
| `linked_ingredient` | 관련 성분(active/avoid enum 참조) |
| `severity` | enum: `info` / `caution` / `avoid` |
| `evidence_grade` | §5 등급 재사용 |
| `safety_action_hint` | V3-07에 전달하는 힌트(비강제): `surface_caution` / `defer_to_safety_gate` |

불변식:

- `severity=avoid` 또는 `pregnancy`/`known_allergy` 매칭 → **fail-closed backstop**(추천에서 강등/보류, 최종은 V3-07).
- safety caveat 제거 금지 · unsupported medical claim 금지 · adverse-reaction 신호 우선.

★Leo 결정 필요: `condition` enum의 초기 셋(특히 pregnancy/procedure/medical 경계 — Foundation safety 정책과 정렬 필요).

---

## 7. price_band / margin_band / stock_status (커머스 축, 안전 하위)

| 필드 | enum(제안) | 규칙 |
|---|---|---|
| `price_band` | `low` / `mid` / `premium` / `luxury` | 실매가·원가 저장 금지, 버킷만 |
| `margin_band` | `low` / `mid` / `high` (내부) | **safety/suitability 하위 우선순위 · 사용자 노출 금지** |
| `stock_status` | `in_stock` / `low_stock` / `out_of_stock` / `discontinued` | out/discontinued는 추천 필터에서 제외 |

규칙:

- `margin_band`는 **랭킹 tie-breaker로만** 사용 가능(safety·suitability·evidence 통과 후). 단독으로 추천을 만들지 않는다.
- margin이 추천 이유(reason_codes)나 사용자 문구에 **드러나면 안 된다**(internal only).
- stock_status는 추천 **가능성 필터**이지 suitability 판단이 아니다.

★Leo 결정 필요: margin_band를 랭킹 신호로 허용할지, 아니면 V3에서는 **완전 배제(0)**할지.
기본 제안: **safety/suitability/evidence 통과 후 최종 tie-break에서만** 허용(default 보수적).

---

## 8. 매핑 산출물 → 상류/하류 연결

- **상류(V3-04)**: consultation result / recommendation reason / recommended product → 이 매핑으로 "왜 이 성분/고민 매칭인가"를 부여.
- **하류(V3-06)**: satisfaction / adverse_reaction / repurchase 신호가 `product_id × ingredient × skin_goal_tag` 단위로
  MemoryFactCandidate를 생성 → evidence/confidence로 LongTermMemoryFact 승격.
  - ★단일 신호로 장기 기억을 확정하지 않는다(single signal → confirm 금지). 다신호·시간·재현으로만 승격(정본은 V3-06).
- Foundation에 전달되는 것은 minimized `memory_context`뿐: 예) `{skin_goal_tags, sensitivity_tags(bool/enum), evidence_grade}` 수준.
  raw 성분 원문·PII·customer id 원문은 전달하지 않는다(`raw_text_stored=False`, request_scoped).

---

## 9. 학습 루프에서의 역할 (Learning, not auto-execution)

V3-05의 목표는 **"자동 실행"이 아니라 "자동화 가능한 memory/learning 구조"**를 만드는 것이다.

- product/ingredient 매핑 + 이상반응/재구매 신호 → "이 사용자군에서 이 성분이 반복적으로 불만/이상반응" 같은
  **학습된 사실 후보**를 만든다(V3-06 승격 규칙 통과 시 다음 추천 개선에 반영).
- 이 문서 범위에서 **자동 프로모션·자동 카탈로그 재작성·live 반영은 없다.** 전부 검토 가능한 계획 수준.

---

## 10. Hard Stops (out-of-scope, 이 문서에서 하지 않음)

- prod DB access · real secret/Vault · main merge · live activation · external release · prod DB migration.
- checkout/order/customer DB write · canonical write · learned promotion · customer memory live migration.
- Cosmile postgres는 **schema/validate 수준** — "real DB integration complete"라고 말하지 않는다.
- 실제 secret 값·원가·배합비·PII·customer/order id 원문 저장/기록 금지.

---

## 11. 열린 질문 (요약 · ★Leo 결정 필요 취합)

1. `ingredient_profile` 정규화 표준(INCI 전체 vs 핵심) · 함량 밴드-only 확정 여부. (§2)
2. active/avoid ingredient enum 초기 vocabulary 범위. (§3)
3. `functional_approved`(기능성 고시)를 어느 evidence_grade까지 인정할지. (§5)
4. `contraindication.condition` enum 초기 셋 — pregnancy/procedure/medical 경계 정렬. (§6)
5. margin_band를 랭킹 신호로 허용할지 vs V3 완전 배제(0). (§7)

---

## 무결성

- 본 문서는 **design-only**다. 코드·테스트·구현 완료를 주장하지 않는다. Hard Stop 무접촉.
- **Memory V1 Option B 상속**(Option A / `FOUNDATION_SUBJECT_REF_SECRET` mint **미상속** — superseded).
- **Foundation = validate/gate/reasoning 전용** — durable customer memory DB 아님 · service DB 직접 read 없음 ·
  minimized request-scoped `memory_context`만(raw_text_stored=False).
- **service-local ownership** — product/ingredient/price/margin/stock catalog + customer memory는 Cosmile 소유(schema `cosmile`, cross-schema 직접 참조 없음).
- **safety-first** — contraindication/sensitivity/adverse-reaction > commerce/revenue/margin. 의학적 단정 금지. 최종 safety는 V3-07 + Foundation safety gate.
- **no prod / no live / no main / no secret** — Cosmile postgres는 schema/validate 수준(real DB integration 아님).
