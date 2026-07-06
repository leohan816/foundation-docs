# COSMILE MEMORY V3 — V3-07 Safety & Adverse Reaction Guardrail (설계서)

> 작성: foundation-control · 2026-07-06 · design-only · no code · Hard Stop 무접촉

---

## 0. 목적과 범위

이 문서는 COSMILE MEMORY V3 (Learning Commerce Memory Loop)에서 **안전·이상반응(adverse reaction) 가드레일**을 정의하는 설계 전용(design-only) 문서다.
V3의 학습 루프가 매출/마진/재구매를 최적화하는 방향으로 커질 때, **안전 신호가 commerce 최적화에 눌리지 않도록** 구조적으로 고정하는 것이 목표다.

핵심 명제 (이 문서 전체를 지배):

1. **이상반응 신호는 추천 신호보다 우선한다** (adverse reaction outranks recommendation).
2. **safety block 기록은 commerce 최적화보다 우선한다** (safety block memory outranks commerce optimization).
3. **의료 단정 금지** (NO medical assertions) — 진단/치료/처방/의학적 확정 발화를 하지 않는다.
4. **"계속 써도 돼?" 류 발화는 safety-first로 분리 처리한다.**
5. **의미 인식 = AI · 정책 집행 = deterministic gate.** safety는 MAX/fail-closed이며 commerce/output adapter가 낮출 수 없다.

이 문서는 **설계 + 계약(contract) + 검토 가능한 구현 계획**까지만 다룬다. **live/prod 활성화가 아니다.**
목표는 "자동 실행"이 아니라 **자동화 가능한 안전/학습 구조**를 짓는 것이다.

관련 형제 문서(파일명 기준 상호참조):

- `COSMILE_MEMORY_V3_01_*` — V3 전체 개요/타깃 루프.
- `COSMILE_MEMORY_V3_02_*` — subject_ref / furef mint & memory ownership.
- `COSMILE_MEMORY_V3_03_*` — MemoryFactCandidate → LongTermMemoryFact promotion(evidence/confidence).
- `COSMILE_MEMORY_V3_04_*` — commerce event ingestion(product_view/add_to_cart/checkout/order).
- `COSMILE_MEMORY_V3_05_*` — recommendation improvement loop.
- `COSMILE_MEMORY_V3_06_*` — memory_context 최소화 & Foundation contract.
- **본 문서 `COSMILE_MEMORY_V3_07_*` — safety & adverse reaction guardrail (이 루프의 fail-closed 상한).**

---

## 1. 상속과 canonical 기준 (V1 = CLOSED_WITH_LIMITS)

- V3는 **Memory V1 Option B**를 canonical로 상속한다.
- V3는 **Option A / `FOUNDATION_SUBJECT_REF_SECRET` mint를 상속하지 않는다** (superseded).
- subject_ref mint는 **service-local**이다:
  - `subject_ref = subj_v2_ + HMAC(<SVC>_SUBJECT_SECRET, '<svc>:subject:' + ref)[:32]`
  - `furef = furef_v2_ + HMAC(<SVC>_FUREF_SECRET, '<svc>:local_user:' + ref)[:32]` (cross-producer consistent).
- **Foundation = validate / gate / reasoning ONLY.** Foundation은 durable customer memory DB가 아니고, SIASIU/Cosmile service DB를 직접 읽지 않는다.
- Foundation에는 **최소화된 request-scoped `memory_context`만** 전달된다 (raw text/PII 없음; `raw_text_stored=False`; `request_scoped`).
- SIASIU와 Cosmile은 각자 자기 customer memory + commerce data를 **service-local**(per-service postgres schema `siasiu` / `cosmile`, cross-schema 직접 참조 없음)로 소유한다.
- Cosmile postgres는 현재 **schema/validate 수준**이다. real DB-integration은 완료로 보지 않는다. (본 문서에서 "real DB integration complete"라고 말하지 않는다.)

이 safety 가드레일은 위 상속 위에서만 동작한다. 즉 **안전 판단의 evidence 원문은 service-local에 남고, Foundation에는 최소화된 안전 신호 요약만** 넘어간다.

---

## 2. Adverse Reaction Signal 후보 (semantic recognition = AI)

아래 표현들은 **트리거 후보(candidate signal)**다. ★키워드 매칭이 raw text의 *최종 의미*를 확정하지 않는다.
raw 발화의 의미(이상반응인가 / 단순 질문인가 / 과거 회상인가)는 **AI semantic judgment**가 인식하고, 여기서 나온 구조화 신호에 대해서만 deterministic gate가 정책을 집행한다.

| signal_group | 대표 표현 (후보) | 1차 의미 분류 | 위험 방향 |
|---|---|---|---|
| `irritation_sting` | 따가움, 화끈거림, 쓰라림 | 국소 자극 반응 | caution↑ |
| `swelling` | 붓기, 부어오름 | 부기/부종 반응 | caution↑ / block 후보 |
| `rash_eruption` | 발진, 두드러기, 뾰루지 다발 | 피부 발진 | caution↑ / block 후보 |
| `itch` | 가려움, 간지러움 | 소양감 | caution↑ |
| `trouble_worsening` | 트러블 악화, 더 나빠짐, 번짐 | 기존 상태 악화 | caution↑ / block 후보 |
| `discontinuation` | 사용 중단, 끊었어요, 못 쓰겠어요 | 사용자 자발 중단 | negative-outcome 강신호 |
| `medical_reference` | 병원 감, 약 받음, 처방, 진료 | 의료 개입 언급 | escalate → safety-first |
| `allergy_reference` | 알레르기, 알러지, 특정 성분 반응 | 알레르기 이력/의심 | escalate → safety-first |

분류 규칙:

- AI semantic layer는 각 발화를 `{signal_group, intensity(약/중/강), certainty(추정/명시), temporality(현재/과거)}`로 구조화한다.
- **`medical_reference` / `allergy_reference` / `discontinuation`이 명시(certainty=explicit)로 인식되면** → 자동으로 `safety_priority=true`.
- semantic이 애매(certainty=낮음)하면 → **fail-closed**: caution 이상으로 올리고, commerce 강도는 낮춘다(§5).

★Leo 결정 필요: `swelling` / `rash_eruption` / `trouble_worsening` 중 **어느 강도부터 `safety_gate=block`으로 승격**할지 (예: intensity=강 또는 medical_reference 동반 시 block). 초기 제안은 "단독 caution, 의료/알레르기/중단 신호 동반 시 block".

---

## 3. "계속 써도 돼?" 류 — safety-first 분리 처리

"이거 계속 써도 돼요?", "그냥 계속 발라도 되나요?", "괜찮은 거 맞죠?" 같은 발화는 **commerce 재구매 유도(upsell) 질문으로 처리하면 안 된다.**

처리 원칙:

1. 이 발화는 **safety-first branch로 라우팅**한다 — 즉 "재구매/추천" 파이프라인이 아니라 "안전 확인" 파이프라인이 먼저 응답 소유권을 가진다.
2. 직전/최근 turn에 **adverse signal(§2)이 존재하면** → 무조건 safety-first. commerce 응답(추천/구매유도) suppress.
3. adverse signal이 없더라도 → **의료 단정 금지** 원칙에 따라 "괜찮다/문제없다"는 단정 대신, **사용자 자기관찰 안내 + 이상반응 시 중단·전문가 상담 권고**의 안전 프레이밍으로 응답한다.
4. commerce 추천은 **안전 확인 이후에만**, 그리고 안전 신호가 clear일 때만 재개한다.

| 입력 패턴 | 최근 adverse signal | 처리 branch | commerce 허용 |
|---|---|---|---|
| "계속 써도 돼?" | 있음 | safety-first (block/caution) | suppress |
| "계속 써도 돼?" | 없음 | safety-first (neutral, no medical claim) | 안전 프레이밍 후 조건부 |
| "재구매하려는데" | 있음 | safety-first override | suppress until resolved |
| "재구매하려는데" | 없음 | commerce normal | 허용 |

★Leo 결정 필요: safety-first branch에서 "안전 확인 이후 commerce 재개"를 **자동 재개**로 둘지, **명시적 사용자 재요청 필요**로 둘지. 초기 제안은 후자(사용자가 다시 물을 때만 재개)로 보수적.

---

## 4. 우선순위 계층 (deterministic gate — precedence)

정책 집행은 deterministic gate가 담당한다. 우선순위는 **위에서 아래로 강제**되며, 아래 단계가 위 단계를 절대 뒤집지 못한다(fail-closed, MAX):

```
1. SAFETY BLOCK        (이상반응 + 의료/알레르기/중단 강신호)   ← 최상위, 뒤집기 불가
2. SAFETY CAUTION      (단독 adverse signal, 애매 신호 포함)
3. SAFETY-FIRST FRAMING("계속 써도 돼?" 류, medical assertion 금지)
4. MEMORY WRITE RULE   (safety block/caution 기록 = 우선 기록)
5. COMMERCE OPTIMIZATION(추천/재구매/마진 — 위 1~4에 종속)
```

불변식(invariant):

- `adverse_reaction_signal == true` → `recommendation_strength`는 상승할 수 없다(추천이 이상반응을 이기지 못함).
- `safety_gate == block` → 해당 turn/제품에 대한 commerce action(추천·add_to_cart 유도·재구매 push)은 **0**.
- **output/commerce adapter는 safety_gate 값을 낮출 수 없다.** adapter는 표현(voice)만 담당, 안전 등급 하향 권한 없음.
- safety 판단이 불확실 → **caution 이상으로 fail-closed**. (안전은 의심스러우면 올린다, 내리지 않는다.)

이 계층은 **Foundation safety gate + AI semantic + deterministic gate**의 합성 결과다(§0의 원칙 5). 세 층 중 어느 하나라도 caution/block을 요구하면 최종 결과는 그 이상이다(MAX 합성).

---

## 5. Commerce 억제 규칙 (safety → commerce 매핑)

| safety_gate_result | recommendation | 재구매/upsell push | memory_reuse (commerce) | 표시 방향 |
|---|---|---|---|---|
| `pass` | 정상 | 정상 | 정상 | 통상 |
| `caution` | 강도 하향, "사지 마세요" 후보 검토 | suppress | commerce 재사용 보류 | 안전 프레이밍 우선 |
| `block` | **0 (do_not_recommend / hold)** | **0** | **blocked** | safety-only, commerce off |

- caution/block 상태에서는 `decision_type`이 `recommend`로 나올 수 없다. 허용값: `do_not_recommend` / `hold` / `do_not_buy` / `ask_more` / `cannot_determine`.
- 이 매핑은 형제 문서 `COSMILE_MEMORY_V3_05_*`(recommendation improvement loop)에 **상한(cap)**으로 걸린다: 학습 루프가 아무리 최적화해도 이 상한을 못 넘는다.

---

## 6. Adverse Reaction → Memory 기록 규칙

이상반응은 학습 대상이지만, **단일 신호로 장기기억을 확정하지 않는다** (never confirm long-term memory from a single signal). 형제 문서 `COSMILE_MEMORY_V3_03_*`의 promotion 규율을 안전 축에 적용한다.

승격 경로:

```
adverse 발화(AI semantic 인식)
  → MemoryFactCandidate(kind=adverse_reaction, evidence 1건, confidence=low)
  → evidence/confidence 누적 (반복 신호·중단·의료언급 등)
  → LongTermMemoryFact(kind=adverse_reaction / avoid_ingredient / avoid_product) 승격
  → 다음 추천에서 회피(avoid) 근거로 사용
```

MemoryFactCandidate (adverse) 최소 필드:

| field | 예시값 | 비고 |
|---|---|---|
| `candidate_id` | uuid | service-local |
| `subject_ref` | `subj_v2_...` | service-local mint (Option B) |
| `kind` | `adverse_reaction` | enum |
| `signal_group` | `rash_eruption` | §2 |
| `intensity` | `약/중/강` | AI semantic |
| `certainty` | `추정/명시` | fail-closed 판단 입력 |
| `linked_sku` | sku_ref (optional) | 원인 제품 후보 |
| `linked_ingredient` | ingredient_ref (optional) | 성분 회피 후보 |
| `evidence_count` | int | 승격 임계 입력 |
| `confidence` | `low/med/high` | §7 |
| `safety_gate_at_capture` | `caution/block` | 캡처 시점 안전 등급 |
| `raw_text_stored` | `False` | 원문 저장 금지 |
| `request_scoped` | `True` | Foundation 전달분 |

기록 우선순위 규칙:

- **safety block/caution 기록은 commerce 기록보다 먼저·확실히 남긴다** (§4-4). commerce 이벤트 유실이 있어도 safety 캡처는 유실되면 안 된다.
- adverse memory는 **삭제/만료되어도 "회피 사유"의 안전 효과가 성급히 사라지지 않도록** 처리 방향 검토 필요.

★Leo 결정 필요: adverse LongTermMemoryFact의 **만료(expiry) 정책**. 안전 신호는 일반 preference보다 만료를 보수적으로(길게 또는 명시 철회 시에만) 둘지. 초기 제안은 "명시적 사용자 철회 또는 재검증 전까지 유지".

---

## 7. 승격 임계(evidence/confidence) 기준안

| confidence | 충족 조건(제안) | 다음 추천 반영 |
|---|---|---|
| `low` | 단일 발화 1건 (candidate) | 회피 아님 · caution 프레이밍만 |
| `med` | 반복 신호 2건+ 또는 중단 언급 동반 | soft avoid (해당 SKU 하향) |
| `high` | 의료/알레르기 언급 동반, 또는 강신호 반복 | hard avoid (해당 SKU/성분 do_not_recommend) |

- **단일 신호 → 즉시 장기 avoid 확정 금지.** 단, 단일 신호라도 `medical_reference`/`allergy_reference` 동반이면 **그 turn의 safety_gate는 즉시 caution/block**(기록 승격과 별개로 실시간 안전은 즉시 발동).
- 즉, "장기기억 승격"과 "실시간 안전 게이트"는 분리된 축이다: 실시간은 fail-closed로 즉시, 장기 avoid는 evidence 누적으로 신중.

★Leo 결정 필요: `med`/`high` 임계 카운트(2건/반복 정의)와, "반복"의 시간 창(window) 정의.

---

## 8. Foundation contract (validate/gate only — 최소화 전달)

Foundation은 이 안전 판단의 **validator/gate/reasoner**일 뿐 memory store가 아니다. Cosmile → Foundation으로 넘기는 것은 **request-scoped minimized memory_context**뿐이다.

Foundation에 전달(허용):

- `safety_signal_summary`: `{signal_group, intensity, certainty, temporality}` (구조화 요약, 원문 없음)
- `prior_adverse_flags`: bool/count 수준(예: `has_prior_adverse=true`, `adverse_count=2`)
- `medical_reference_flag` / `allergy_reference_flag`: bool
- `subject_ref` (Option B service-local mint)

Foundation에 전달 금지:

- raw 발화 원문 · PII · 고객 식별 원문 · service DB row · trace_id 원문 · full env.

Foundation 반환(decision output, §V3 공통 계약):

- `decision_type`: recommend / do_not_recommend / hold / do_not_buy / ask_more / cannot_determine
- `evidence_mode`: cannot_determine / uncertain / cautious / grounded
- `safety_gate_result`: pass / caution / block
- `memory_reuse_decision`: allowed / blocked / expired / deleted / consent_required / not_available
- `reason_codes` (예: `ADVERSE_REACTION_PRESENT`, `MEDICAL_REFERENCE`, `SAFETY_FIRST_FRAMING`, `COMMERCE_SUPPRESSED_BY_SAFETY`)
- `applied_to_real_user=false` · `write_performed=false`

**MAX 합성:** Foundation safety_gate_result와 Cosmile deterministic gate 중 **더 엄격한 값**이 최종값이다. output adapter는 이를 낮추지 못한다.

---

## 9. SIASIU/Foundation 안전 경험의 Cosmile 이식

SIASIU(상담형 vertical)와 Foundation Trust Core/Safety Guard가 이미 검증한 안전 행동을 Cosmile commerce 추천에 **재사용**한다(새로 갈아엎지 않는다).

이식 대상(설계 레벨):

- SIASIU의 상담 안전 프레이밍(의료 단정 회피, 이상반응 우선, 전문가 상담 권고 톤) → Cosmile 추천 응답의 safety-first 프레이밍으로 매핑.
- Foundation safety gate(pass/caution/block) 의미론 → Cosmile decision loop의 상한으로 그대로 수용.
- Dual-Vertical Test Policy(양 vertical shared cases) → 이 가드레일의 회귀 케이스를 SIASIU·Cosmile 양쪽으로 검증.

★주의: SIASIU product code는 SIASIU repo 내에서만 수정. 본 문서는 contract/매핑만 정의한다.

---

## 10. 검증 가능한 케이스(설계 레벨 — 구현 시 회귀로)

이 문서는 코드가 아니므로 아래는 **미구현 계획**이다(테스트되었다고 말하지 않는다).

- C1: adverse signal(강) + 추천 요청 → 최종 `do_not_recommend` 또는 `hold`, commerce push=0.
- C2: "계속 써도 돼?" + 직전 adverse → safety-first, 의료 단정 문구 0, upsell 0.
- C3: medical/allergy 언급 단독 1건 → 실시간 safety_gate ≥ caution, 장기 avoid는 미승격(단일 신호).
- C4: output adapter가 block을 pass로 낮추려는 입력 → 거부, 최종 block 유지(adapter 하향 불가).
- C5: adverse candidate 반복 2건+ → confidence med 승격, 해당 SKU soft avoid.
- C6: safety block turn에서 memory write는 safety 기록만, commerce 기록은 suppress/후순위.
- invariant 카운터: `unsupported_recommendation=0`, `medical_assertion=0`, `safety_downgrade_by_adapter=0`, `commerce_over_safety=0`.

이 케이스들은 형제 문서 `COSMILE_MEMORY_V3_05_*` / `COSMILE_MEMORY_V3_03_*`의 케이스와 함께 cross-project regression으로 묶는다(구현 release train에서).

---

## 11. Hard Stop (out-of-scope — 무접촉)

이 설계서는 아래를 **하지 않는다**(전부 out-of-scope):

- prod DB access · Cosmile real DB integration(현재 schema/validate 수준) · prod DB migration/backfill.
- real secret / Vault write / real secret view · `<SVC>_SUBJECT_SECRET` 등 실 값 노출.
- main merge · live activation · public API live · external release · real user exposure.
- checkout/order/customer DB write · canonical write · learned promotion · customer memory live migration.

모든 flag 기본값 OFF, write/live/promotion=0, applied_to_real_user=false. 이 문서가 승인(PASS/APPROVED)되기 전에는 어떤 repo 코드도 수정하지 않는다(Design-First Operating Rule).

---

## 12. Open Questions (요약 — ★Leo 결정 필요)

1. §2 — swelling/rash/trouble_worsening의 **block 승격 강도 임계**.
2. §3 — safety-first 이후 commerce **자동 재개 vs 명시 재요청**.
3. §6 — adverse LongTermMemoryFact **만료 정책**(보수적 유지 제안).
4. §7 — med/high **evidence 카운트 임계 및 반복 window**.
5. (신규) medical/allergy 언급 시 "전문가 상담 권고" 문구를 **고정 템플릿**으로 둘지, service voice에 위임할지(단, 안전 의미는 낮출 수 없음).

---

## 무결성

design-only(코드/구현 없음). Memory V1 **Option B 상속**(Option A / FOUNDATION_SUBJECT_REF_SECRET mint 미상속·superseded). **Foundation = validate/gate/reasoning ONLY**(durable memory DB 아님, service DB 직접 read 없음, request-scoped minimized memory_context만). **service-local ownership**(SIASIU·Cosmile 각자 memory/commerce 소유, cross-schema 직접참조 없음; Cosmile postgres는 schema/validate 수준). **safety-first**: 이상반응 > 추천, safety block > commerce, 의료 단정 금지, "계속 써도 돼?"는 safety-first 분리, safety는 MAX/fail-closed이며 output/commerce adapter가 낮출 수 없음. 의미 인식=AI · 정책 집행=deterministic gate. **no prod / no live / no main merge / no real secret · Vault / no external release** (Hard Stop 무접촉).
