# Architecture Constitution — Addendum: Semantic Recognition / Deterministic Policy Gate Principle
# (AI 의미 인식 / 규칙 기반 정책 집행 원칙) · 2026-07-01

> 작성: 샤슈(SIASIU) · ★헌법 부칙(Addendum) — 구현 지시 아님 · 코드 수정 0
> 상위 헌법: `/home/leo/Project/SIASIU/설계문서/FOUNDATION_SERVICE_SEMANTIC_ADAPTER_ARCHITECTURE_20260630.md`
> 참조: `.../ARCHITECTURE_CONSTITUTION_PRESERVATION_PLAN_20260630.md` · `/home/leo/Project/foundation-control/ARCHITECTURE_CONSTITUTION.md`

---

## 0. 한 줄 원칙
**원문 발화의 *의미 인식*은 AI semantic judgment가 하고, AI가 구조화한 의미에 대한 *정책 집행*은 deterministic rule/gate가 한다. 최종 safety/decision은 Foundation safety gate가 확정한다.**

> ★"휴리스틱을 금지하는 것이 아니다. 휴리스틱은 명확한 정책 집행에 필수적이다. 다만 휴리스틱은 raw text의 의미를 최종 판단하는 위치에 있으면 안 된다. 원문 발화의 의미 인식은 AI가 하고, AI가 구조화한 의미에 대한 정책 집행은 deterministic rule이 수행한다."

---

## 1. 문제 인식(semantic recognition)은 AI가 한다
- raw user utterance의 **intent · safety meaning · adverse-reaction meaning · product suitability · contraindication meaning** 등은 **AI semantic judgment**가 *의미로* 판단한다.
- ❌ 휴리스틱/키워드/정규식이 raw text만 보고 *최종 semantic judgment를 확정*하면 안 된다.
- 이유: 다국어·수많은 표현·자연어 채팅은 문자 매핑으로 감당 불가(상위 헌법 §5 full semantic north star).

## 2. 정책 집행(policy execution)은 deterministic rule이 한다
- AI가 semantic output(구조화 필드)을 만든 *뒤*, 명확한 정책 집행은 **deterministic policy gate**가 담당한다.
- 예: `semantic_adverse_reaction=true` 그리고 `semantic_continue_use_question=true`이면 policy gate가 집행:
  - products = 0 · recommendation = 0
  - safety_gate_result ≥ caution
  - final_strategy = safety_first 또는 safety_hold
  - "계속 사용해도 된다" 허용 표현 **금지**
  - 사용 중단 / 상태 확인 / 필요 시 전문가 상담 프레이밍 **우선**

## 3. 휴리스틱은 raw text의 최종 판단자가 아니다
```
❌ 잘못된 구조:  raw text → keyword match → safety_first 확정
✅ 올바른 구조:  raw text → AI semantic judgment → deterministic policy gate → Foundation final decision
```

## 4. 휴리스틱은 *적극* 사용한다 — 단 위치가 중요하다
휴리스틱/규칙은 다음 역할에 **적극 사용**한다(이건 권장):
- 명확한 정책 집행 · product suppression · recommendation veto
- safety invariant enforcement · trace 안정화
- fail-closed backstop · AI semantic judge에 올릴 escalation candidate 표시
→ ★즉 "휴리스틱 금지"가 아니라 "휴리스틱을 *의미 최종 판단자*에 두지 말라"는 것.

## 5. fail-closed backstop의 의미
- raw text heuristic candidate는 **"semantic 확정"이 아니다**.
- AI confidence가 낮거나 AI가 놓쳤을 가능성이 있고, heuristic candidate가 safety concern을 표시하면:
  - `adverse_continue_use 확정`이 아니라 → **`uncertainty_backstop`** 또는 **`safety_escalation_basis`** 로 기록.
  - safety는 *올릴 수만* 있고(raise-only), 내리지 않는다.
- 이 경우에도 trace에 **AI judgment · heuristic candidate · final safety basis를 분리**한다.

## 6. Safety 영역 기본 원칙
```
Safety = AI semantic judgment  +  deterministic policy gate  +  Foundation safety gate
         (의미를 읽음)             (정책을 집행)                 (최종 safety/decision 확정)
```
- AI가 의미를 읽고 → deterministic gate가 정책을 집행하고 → Foundation safety gate가 최종 확정.
- safety = MAX(AI semantic, Foundation guard, product/ingredient policy). semantic/heuristic은 *올릴 수만* 있음(상위 헌법 §11 Safety Contract 연장).

---

## 7. 예시 — "따가운데 계속 써도 돼?"
**❌ 잘못된 처리:**
- raw text에서 "따가" + "계속 써도" 감지 → *휴리스틱이 adverse_continue_use를 최종 확정* → safety_first 결정.

**✅ 올바른 처리:**
```
1) AI semantic judgment:
   semantic_adverse_reaction       = true
   semantic_continue_use_question  = true
   semantic_use_permission_request = true
   semantic_safety_confidence      = 0.xx
2) deterministic policy gate:
   products = 0 · recommendation = 0
   safety_gate_result >= caution
   final_strategy = safety_first 또는 safety_hold
   continue-use permission expression 금지
3) Foundation final safety decision:
   AI judgment + Foundation guard + product/ingredient policy + existing rails 로 최종 확정
```
- (휴리스틱 `_adverse_continue_use_candidate`는 *AI judge에 올릴 후보* + AI가 놓치면 *fail-closed backstop*으로만 작동.)

## 8. 필수 trace field
```
semantic_issue_type
semantic_adverse_reaction
semantic_continue_use_question
semantic_use_permission_request
semantic_safety_confidence
heuristic_candidate
policy_rule_applied
final_safety_basis
final_strategy
safety_gate_result
```
→ ★AI judgment / heuristic candidate / policy / final basis가 *분리*되어 보여야 함(감사·회귀 추적).

## 9. Constitution Check 추가 항목 (모든 미션 리뷰에 포함)
- Raw utterance semantic judgment performed by AI? → **MUST BE YES**
- Heuristic final semantic judgment? → **MUST BE NO**
- Deterministic policy gate used for structured semantic output? → **MUST BE YES**
- Heuristic used for trigger/backstop/policy execution only? → **MUST BE YES**
- Safety decision combines AI semantic judgment + deterministic policy gate + Foundation safety gate? → **MUST BE YES**

---

## 10. ROUTING_MISSION_02_7_DIRECTIVE 반영 수정 포인트 요약
(해당 문서는 대부분 이 원칙으로 이미 보정됨 — 아래를 재확인·정렬)
- ✅ `_adverse_continue_use_candidate`(trigger) — "확정" 이름 금지. (반영됨)
- ✅ AI semantic judgment structured field가 실제 판단자(adverse_reaction/continue_use/should_route_safety/confidence). (반영됨)
- ✅ Foundation gate가 합성 확정. (반영됨)
- ✅ 휴리스틱 = fail-closed 백업(raise-only). (반영됨)
- ▸추가 정렬(권장): trace field를 §8 표준(semantic_issue_type·semantic_use_permission_request·policy_rule_applied·final_safety_basis)으로 *명칭 통일*. 02.7 테스트에 "final_safety_basis가 AI인지 backstop인지 구분" 명시.
- ▸backstop 기록명: 02.7에서 AI-miss 시 `uncertainty_backstop`/`safety_escalation_basis`로 기록(단순 "candidate=true → 확정" 금지) — §5 반영.

## 11. CLAUDE.md 반영 요약문 초안 (foundation-control / SIASIU / Cosmile 공통·짧게)
```markdown
### Semantic Recognition / Deterministic Policy Gate (의미=AI · 정책=규칙)
- 원문 발화의 *의미 인식*(intent/safety/adverse/suitability)은 **AI semantic judgment**가 한다. 키워드/정규식이 raw text 의미를 *최종 확정*하면 안 된다.
- AI가 구조화한 의미에 대한 *정책 집행*(products=0·safety_gate≥caution·strategy 등)은 **deterministic rule/gate**가 한다.
- 휴리스틱은 *적극 사용*하되 위치가 규칙: trigger · policy 집행 · fail-closed backstop 전용(최종 의미 판단자 금지).
- 최종 safety/decision = AI semantic + deterministic gate + Foundation safety gate.
- 참조: /home/leo/Project/SIASIU/설계문서/ARCHITECTURE_CONSTITUTION_ADDENDUM_SEMANTIC_POLICY_GATE_20260701.md
```
- ★실제 CLAUDE.md 삽입은 *별도 PRESERVE-APPLY 미션*(Leo 승인 후). 이번엔 초안만.

---

## 한계 / 주의
- 이 문서는 헌법 부칙(원칙) — 구현 지시 아님. 실제 반영(02.7 정렬·CLAUDE.md 삽입)은 별도 승인.
- 코드 수정 0 · commit 0 · push 0 · foundation-control/SIASIU/Cosmile 무수정(이 문서 저장 외).
