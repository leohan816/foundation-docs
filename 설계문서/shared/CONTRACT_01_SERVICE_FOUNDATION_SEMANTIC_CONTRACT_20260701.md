# CONTRACT-01 — Service Semantic Contract / Foundation Response Contract (정식 설계) · 2026-07-01

> 작성: 샤슈(SIASIU) · ★설계 문서(정본) — 구현 지시 아님(구현 directive는 별도) · 코드 수정 0
> 상위: `/home/leo/Project/SIASIU/설계문서/FOUNDATION_SERVICE_SEMANTIC_ADAPTER_ARCHITECTURE_20260630.md` (§9·§10 초안을 정식화)
> 부칙: `.../ARCHITECTURE_CONSTITUTION_ADDENDUM_SEMANTIC_POLICY_GATE_20260701.md` (의미=AI·정책=규칙·safety 3합성)
> 근거: ROUTING-01A~02.7C 구현 필드(semantic_router 출력·core policy gate·severity basis)를 계약으로 고정.

---

## 0. 목적 / 전제
- ROUTING-02.7C까지 닫힌 **semantic fields · safety policy gate · severity basis trace**를 *정식 contract*로 고정한다.
- ★전제: 현재 `foundation-control/semantic_router`는 **transitional scaffold**. 장기적으로 raw utterance semantic recognition = **Shashu/Cosmile Service Semantic Adapter**. Foundation = **structured semantic contract를 받아 validation + policy/safety/evidence/decision**.
- 이 계약이 서면 서비스↔Foundation 경계가 코드가 아니라 *스키마*로 고정 → 덕지덕지·경계 침범 재발 방지.

---

## 1. Service → Foundation Semantic Contract (SSC)
서비스(Shashu/Cosmile) Semantic AI Adapter가 원문을 이해해 *구조화*하여 Foundation에 넘긴다.
```json
{
  "contract_version": "ssc-1.0",
  "service_id": "siasiu | cosmile",
  "locale": "ko | en | zh | ...",
  "channel": "chat | voice | commerce_slice | ...",
  "service_context": { "audience": "customer", "surface": "consult|cart|...", "...": "서비스 임의(불투명)" },
  "raw_text": "원문(★optional — PII/보존정책상 생략 가능. 없으면 semantic 필드로만 판단)",

  // ── AI semantic recognition (서비스 AI가 *의미로* 판단·구조화) ──
  "semantic_issue_type": "product_recommendation | skin_concern | suitability | adverse_reaction | comparison | education | greeting | safety | unknown",
  "semantic_consumer_discomfort": true,
  "semantic_adverse_reaction": true,
  "semantic_continue_use_question": true,
  "semantic_use_permission_request": true,
  "symptom_or_discomfort": "stinging|burning|itching|dryness_worsening|breakout|small_bumps|redness|swelling|rash|hives|heat|pain|unknown",
  "semantic_adverse_severity": "mild|moderate|visible_reaction|severe_or_red_flag|unknown",
  "semantic_visible_reaction": true,
  "semantic_red_flag": false,
  "semantic_safety_confidence": 0.0,
  "recommendation_preference": "explicit_recommendation | explicit_no_recommendation | unspecified",

  // ── user constraints / safety facts (service-owned·주입) ──
  "user_constraints": { "no_recommendation": false, "explanation_only": false },
  "known_allergies": [], "avoid_ingredients": [],

  // ── product/session (service data·refs만) ──
  "product_context": { "product_ref": [], "category": [], "ingredient": [] },
  "session_context": { "safety_facts": { "avoid_ingredient": [], "allergy": [], "pregnancy_nursing": false } }
}
```
- ★필드는 현재 `semantic_router` 출력(adverse_reaction/continue_use/should_route_safety/severity/symptom/visible/red_flag/confidence·recommendation_preference)과 **1:1 대응** → 이전 매끄러움.
- ★`raw_text` optional: 있으면 Foundation의 *lexical floor/backstop*(안정화)에만 사용, **의미 최종 판단엔 안 씀**(부칙).

## 2. Foundation → Service Response Contract (FRC)
Foundation이 판단 substance + 정책 결과를 돌려준다(목소리는 서비스가 입힘).
```json
{
  "contract_version": "frc-1.0",
  "final_strategy": "safety_first | recommend_with_caution | answer_then_clarify | clarify_first | refuse | answer_only",
  "decision_type": "recommend | do_not_recommend | do_not_buy | hold | ask_more | cannot_determine",
  "safety_gate_result": "pass | caution | block",

  // ── adverse severity (02.7C) ──
  "final_severity_class": "mild | breakout | visible | red_flag | null",
  "severity_class_basis": "semantic_policy_gate | semantic_policy_gate_plus_lexical_floor | lexical_floor_backstop | uncertainty_backstop | null",
  "policy_rule_applied": "adverse_continue_safety_first | general_suitability_no_reco | avoid_suppress | ... | null",

  // ── products / recommendation (refs only·Foundation은 생성 안 함) ──
  "products_allowed": true,
  "recommendation_allowed": true,
  "product_candidates": [ /* refs/IDs만 */ ],
  "suppression_reason": [ "safety_first_suppress | avoid_suppress | ..." ],
  "forbidden_expressions": [ "continue_use_permission | efficacy_overclaim | ..." ],

  // ── substance (persona/언어 미적용) ──
  "answer_substance": "판단 substance(근거·이유·주의) — ★service-specific persona/CTA/channel UX phrase/commerce action phrase 미포함. locale 자연어 설명 자체는 허용(한/중/영 설명 OK)",
  "evidence": [ /* 원문 근거·성분/원리 */ ],
  "repair_or_verify_result": { "ok": true, "issues": [], "severity": "pass|caution|block" },

  // ── audit ──
  "trace": {
    "semantic_*": "...(SSC 반영)", "final_safety_basis": "...", "avoid_atoms": [],
    "routing_source": "semantic|keyword_confident_kept|keyword_fallback_*",
    "raw_pii_included": false
  }
}
```
- ★`answer_substance` = *렌더링할 판단 substance*지 최종 고객 copy 아님(부칙·상위헌법 §10). 서비스 Response AI Adapter가 목소리/언어/CTA 입힘.
- ★`product_candidates` = refs만. Foundation은 제품/제품명 *생성 안 함*.

## 3. Ownership boundary
| Shashu/Cosmile owns | Foundation owns |
|---|---|
| raw utterance understanding (semantic recognition) | semantic contract **validation** |
| service context | ingredient/product judgment |
| service memory / session facts | safety **policy gate** |
| final output voice (persona/tone/CTA) | evidence retrieval / ssbrain |
| UX / CTA / service actions (cart/order/…) | decision (decision_type) |
| (Cosmile) catalog/price/stock (data provider) | verify / repair · trace / eval |
- ★경계 규칙: **"의미 인식·목소리·서비스 데이터·액션 = 서비스 / 검색·판단·안전·근거·결정·검증 = Foundation."** (4-edge 모델 정합)

## 4. Transitional migration plan
```
현재(transitional):
  raw text ──▶ [foundation-control semantic_router (scaffold)] ──▶ semantic fields ──▶ core policy gate
목표(contract):
  raw text ──▶ [Shashu/Cosmile Semantic AI Adapter] ──▶ SSC(계약) ──▶ [Foundation Contract API] ──▶ FRC
```
- **Phase A (지금~)**: semantic_router 출력을 *SSC 스키마로 정규화*(내부적으로 계약 형태로 emit) + FRC 형태로 응답 정리. 서비스 이동 없이 계약 형태만 확정.
- **Phase B**: Foundation에 `POST /v1/consult`(또는 유사) — SSC in / FRC out. semantic_router는 여전히 내부 fallback(서비스가 SSC 미제공 시 scaffold가 채움).
- **Phase C**: Shashu가 자기 Semantic AI Adapter로 SSC 생성 → Foundation은 scaffold 없이 SSC 소비. (Cosmile도 동일)
- **Phase D**: Cosmile MOCK BRAIN 해제 → Cosmile Semantic Adapter → Foundation Contract 실연결(COSMILE-CONNECT).
- ★scaffold는 서비스 Adapter가 SSC를 안정적으로 낼 때까지 **compatibility / transitional fallback**으로 유지(SSC 미제공 시 scaffold가 채움). ★단 **safety 판단은 항상 fail-closed** — 애매/미판단이면 절대 열지 않고 보수적으로 막는다. (02.7C `uncertainty_backstop`가 이미 실현: AI 미판단/저conf → mild/caution·pass 금지. "fail-open"이라 쓰지 말 것.)

## 5. Contract invariants (1급·위반=계약 위반)
- ❌ raw text keyword가 final semantic judge가 되면 안 된다. **의미 최종 판단 = AI semantic**.
- ✅ deterministic policy gate는 *structured semantic output*에 적용된다(SSC → FRC 매핑).
- ✅ heuristic/lexical rule = **floor / backstop / stabilization만**(raise-only·basis로 분리 기록·semantic_policy_gate 위장 금지).
- ✅ safety = **fail-closed** · MAX(service semantic, Foundation guard, product/ingredient policy) · 서비스/adapter가 낮출 수 없음.
- ❌ product recommendation rail 완화 금지 · Foundation은 제품/제품명 생성 0.
- ❌ **service-specific voice**(persona/tone/CTA/channel UX phrase/commerce action phrase — 예: "지금 구매하기"·"장바구니 담기"·"고객님께 딱이에요")가 Foundation(FRC substance) 안에 들어오면 안 된다. ✅ 단 **locale 자연어 설명 자체(한/중/영)는 허용** — 금지 대상은 *서비스 말투·CTA·판매 행동 유도*지 언어 현지화가 아님.
- ❌ raw PII를 trace/계약에 저장 금지.

## 6. 02.7C 결과 반영 (severity basis)
FRC `severity_class_basis` enum = **02.7C 4종 그대로**:
- `semantic_policy_gate` (AI가 class 결정)
- `semantic_policy_gate_plus_lexical_floor` (AI+lexical 일치)
- `lexical_floor_backstop` (lexical이 fail-closed 상향·AI와 불일치·★위장 금지)
- `uncertainty_backstop` (AI 미판단/저conf → mild/caution 백업)
- policy table: mild/breakout→caution/hold · visible→block/do_not_buy(or hold) · red_flag→block/do_not_buy · 전부 products=0·permission 금지.

## 7. 검증 계약 (계약이 지켜지는지 — CI 게이트 후보)
- SSC 스키마 validation(enum·타입·version) · 미준수 → 400/보수 default.
- FRC 불변식 assert: safety_first면 products=0 · lexical_floor_backstop이 semantic_policy_gate로 안 뒤바뀜 · answer_substance에 persona/CTA 토큰 없음.
- 회귀: golden 21/21 · adversarial safety_viol=0 · 02.5/02B/02A/MAND-07/02.7C 유지.

---

## 한계 / 주의
- 이 문서는 **계약 정본 설계** — 구현은 별도 directive(`CONTRACT_01_IMPLEMENTATION_DIRECTIVE_20260701.md`) + Leo 승인 후.
- 필드명은 현행 코드(semantic_router/core trace)에 근거 — 구현 시 1:1 매핑 확인.
- 코드 수정 0 · foundation-control/Cosmile/SIASIU app 무수정 · push 0.
