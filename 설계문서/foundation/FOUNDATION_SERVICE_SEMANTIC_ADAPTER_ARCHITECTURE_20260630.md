# Foundation ↔ Service Semantic Adapter Architecture (아키텍처 헌법) — 2026-06-30

> 작성: 샤슈(SIASIU) · Leo 아키텍처 판단 + Shashu/Cosmile/Control 검증 종합 · ★구현 지시 아님 = **역할 경계 헌법**
> 목적: 앞으로 *모든 이식 미션이 넘으면 안 되는 경계*를 고정한다. 이 경계를 지키면 덕지덕지가 재발하지 않는다.
> 근거 문서: `/home/leo/Project/SIASIU/설계문서/`의 SHASHU_FOUNDATION_LIFT_MAP · SHASHU_ROUTING_DESIGN_REVIEW · ROUTING_01A/01B/02_*·SIASIU_COSMILE_RUNTIME_BRAIN_AUDIT

---

## 1. 결론 한 줄
**서비스(Shashu/Cosmile)는 *고객 발화를 이해*하고 *최종 목소리로 출력*하며 *자기 데이터·액션*을 소유한다. 그 사이의 *검색·성분/제품/안전 판단·evidence·reasoning·decision·verify*는 전부 Foundation 공통 코어에서 동일하게 처리한다. LLM은 이해와 출력 마사지를 맡고, Foundation은 결정·안전·근거를 맡는다.**

## 2. 현재 문제
- Foundation brain의 판단·작문·라우팅 일부가 SIASIU를 *충실히 이식*한 게 아니라 *키워드로 흉내*내며 갈라짐(덕지덕지).
- 원인 = **경계가 흐림**: 플랫폼 것(도메인 어휘·페르소나)을 공통 코어에 박고, 공통이어야 할 판단을 키워드로 재구현.
- 런타임 감사 결과: SIASIU 상담(consult.html→/api/chat→brain.chat)은 real AI-primary인데, **Cosmile은 아직 MOCK BRAIN**(real brain 미연결). → 이식의 최종 목적지가 아직 안 붙음.

## 3. Leo의 아키텍처 판단 (채택)
```
고객 발화
  → [서비스 AI: 그 플랫폼 방식으로 *이해/인식*]   (룰대로 이해)
  → Foundation에 구조화 요청 전달
  → [Foundation: 검색+성분/제품/안전 판단+evidence+reasoning+decision+verify  ★모두 동일]
  → 구조화 답 반환
  → [서비스 AI: 그 플랫폼 목소리로 *마사지*하여 출력]
  → 최종 고객 응답
```
→ **Foundation = stateless 추론/판단 코어. 서비스 = 의미 I/O 어댑터.** "이것이 아니면 영원히 해결 못 한다"가 맞다.

## 4. 4-edge 모델 (서비스가 소유·플랫폼마다 다름)
| edge | 소유 | 내용 | 예 |
|---|---|---|---|
| **① input understanding** | 서비스 | 고객 발화 → 구조화 의미(intent/entities/risk 신호) | SIASIU=피부/성분 도메인 · Cosmile=커머스 포함 도메인 |
| **② output voice** | 서비스 | Foundation 답 substance → 플랫폼 톤/언어/페르소나 | SIASIU 따뜻한 상담사 · Cosmile 커머스 톤 |
| **③ service data** | 서비스 | 고객 메모리·카탈로그·가격·재고 | SIASIU 고객 ≠ Cosmile 고객 · Cosmile 카탈로그/가격/재고 |
| **④ service actions** | 서비스 | 플랫폼 고유 액션 | Cosmile 장바구니/주문/결제/배송 상태 |
→ ★이 4개만 서비스별. **나머지 알고리즘은 전부 Foundation 공통.** (Leo의 2개 = ①②, 여기에 ③④를 더한 4개가 정확한 경계.)

## 5. Foundation common core 범위 (전 서비스 동일)
```
검색(ssbrain: bm25·graph·bridge·rrf) · 성분 판단 · 제품 판단 · 안전 판단(risk/guard) ·
avoid/allergy(MAND-07) · evidence/grounding · reasoning(02A/02B) · recommendation policy ·
decision(decision_type) · enforcement · verify/repair(llm_guard) · trace/eval
```
- 이미 lift됨: ssbrain 검색 · 02A(answer_then_clarify reasoning) · 02B(recommend reasoning) · MAND-07 avoid · llm_guard verify/repair.
- 서비스는 이 코어를 *같은 contract*로 호출한다. 코어 안에 플랫폼 말투/데이터를 박지 않는다.

### 5-A. Stateless 표현 (정밀화)
- ★**Foundation runtime reasoning은 *request-level stateless*를 지향한다** — 한 요청의 판단이 서버 세션 상태에 의존하지 않는다(고객 사실은 contract로 주입).
- 단 **Foundation은 *canonical registry를 소유*할 수 있다**(요청 무관·서비스 무관 공통 지식): ingredient registry · canonical product core · brand registry · claim/evidence source · safety metadata.
- **서비스별 데이터는 service-owned로 *주입***: 고객 메모리·세션 사실·가격·재고·장바구니·주문/배송 상태. (아래 5-B)

### 5-B. 데이터 경계 (Foundation-owned vs Service-owned)
| Foundation-owned data (canonical·공통) | Service-owned data (주입·서비스별) |
|---|---|
| ingredient registry | customer memory |
| canonical product core | session facts |
| brand registry | price |
| claim / evidence source | stock |
| safety metadata | cart · order · delivery |
| | promotion |
| | service-specific exposure policy |
- ★경계 원칙: **"이 성분/제품/브랜드/근거/안전이 *무엇인가*"는 Foundation(canonical). "이 고객에게 *지금 얼마·재고·노출·주문상태*"는 서비스(주입).**
- Foundation은 canonical product *core*(정체/성분/근거/안전)를 소유하나, **가격·재고·노출·주문은 소유하지 않는다**(서비스 주입).

---

## 6. Shashu(SIASIU) Service 설계도 (AI 역할 명시)
```
┌──────────────────────── SIASIU Service ─────────────────────────┐
│  consult.html ──POST /api/chat──> server.py ──> brain.chat       │
│                                                                  │
│  ① Shashu Semantic AI Adapter (이해):                            │
│     guardrail_classify(LLM) · _route_query(LLM)                  │
│     → Foundation Semantic Contract 작성                          │
│         │                                                        │
│         ▼                                                        │
│  ┌──────── Foundation Common Brain (호출) ────────────────────┐  │
│  │ [Retrieval Engine] [Foundation Reasoning AI]               │  │
│  │ [Guard/Verify(LLM)] [Decision Engine]                      │  │
│  └───────────────────────────┬─────────────────────────────────┘  │
│         ▲ (Foundation Response Contract)                         │
│  ② Shashu Response AI Adapter (출력):                            │
│     PERSONA/TALK_STYLE·언어 마사지 (_system_prompt·_localize·_reply_in_lang) │
│  ③ Shashu Data: memory.db(고객 사실)   ④ actions: (커머스 약함)  │
└──────────────────────────────────────────────────────────────────┘
```
- ①②는 SIASIU 소유(피부 도메인 이해 AI · 따뜻한 상담사 톤 AI). ③ memory.db는 SIASIU 소유.

> ★현재 vs 목표:
> - **현재**: SIASIU는 `brain.chat` 안에 *semantic understanding(guardrail/route) + reasoning(kb_search/_llm) + response voice(PERSONA/localize)* 가 **함께 들어있는 원본 monolith에 가깝다**. (위 ①/Foundation/② 경계가 *한 함수 안에 뭉쳐* 있음)
> - **목표**: 이 monolith를 **Shashu Semantic AI Adapter / Foundation Common Brain / Shashu Response AI Adapter로 lift-and-split** 한다. (Foundation으로 이식해온 회로 = 이 split의 가운데 조각)

## 7. Cosmile Service 설계도 (AI 역할 명시)
```
┌──────────────────────── Cosmile Service ────────────────────────┐
│  React UI (현재: ShadowBanner "MOCK BRAIN" · mock purchase)       │
│                                                                  │
│  ① Cosmile Semantic AI Adapter (이해):                           │
│     커머스 포함 도메인 LLM 이해 → Foundation Semantic Contract   │
│         │                                                        │
│         ▼                                                        │
│  ┌──────── Foundation Common Brain (★SIASIU와 동일 코어) ─────┐  │
│  │ [Retrieval Engine] [Foundation Reasoning AI]               │  │
│  │ [Guard/Verify(LLM)] [Decision Engine]                      │  │
│  └───────────────────────────┬─────────────────────────────────┘  │
│         ▲ (Foundation Response Contract — 동일)                  │
│  ② Cosmile Response AI Adapter (출력):                           │
│     커머스 문장·상품 카드·CTA·주의문구 마사지                    │
│  ③ Cosmile Commerce Data: 카탈로그·가격·재고·장바구니·주문/배송  │
│  ④ actions: 장바구니·주문·결제·배송(현재 mock purchase)          │
└──────────────────────────────────────────────────────────────────┘
```
- ★현재 = MOCK BRAIN. **목표 = Cosmile ① Semantic AI Adapter → Foundation Common Brain 실연결**(지금까지 이식한 회로의 목적지).

## 8. Foundation Common Brain 설계도 (내부 엔진 명시)
```
Foundation Semantic Contract (in)
        │
        ▼
┌──────────── Foundation Common Brain (request-level stateless) ───────────┐
│ ▸ Decision Engine: judge() — intent_signal 우선(없으면 keyword) ·        │
│     risk = MAX(kw, semantic, struct) → decision_type · safety_gate_result│
│ ▸ Retrieval Engine: retrieval_provider → ssbrain(bm25·graph·bridge·rrf)  │
│     [KB = service data 주입]                                             │
│ ▸ Foundation Reasoning AI: patha_reasoning(02A/02B) ·                    │
│     deepseek_composer → answer_substance (persona/언어 미적용)           │
│ ▸ Guard / Verify: llm_guard(semantic_classify·verify·repair) fail-closed │
│ ▸ Enforcement: avoid/MAND-07 · safety_first · products = refs only       │
│ ▸ Trace/Eval: reason codes·hash·flags (raw PII 미포함)                   │
└───────────────────────────────┬──────────────────────────────────────────┘
        ▼
Foundation Response Contract (out)
```
- 내부에 **LLM(Foundation Reasoning AI · Guard/Verify)을 쓸 수 있으나**, ★**서비스별 말투/페르소나는 담당하지 않음**.
- ★Foundation은 **제품 *생성* 없이 ref만**, **decision/safety *소유***, **최종 고객 메시지를 직접 쓰지 않고 Foundation Response Contract를 만든다**(목소리는 서비스가 입힘).
- profile 주입 = 서비스 도메인 어휘/seed KB(알고리즘 아님).

## 8-A. 컴포넌트 역할 정의 (AI/비-AI 명시)
**Shashu Semantic AI Adapter / Cosmile Semantic AI Adapter** (이해 AI)
- 고객 메시지와 그 플랫폼 문맥을 *이해*한다.
- Foundation Semantic Contract를 *작성*한다.
- ❌ 제품 추천/안전 결정을 하지 않는다. ❌ Foundation decision을 전복하지 않는다.

**Foundation Common Brain** (판단 코어 — 내부에 Foundation Reasoning AI / Guard / Verify / Retrieval / Decision Engine)
- 검색·성분/제품 판단·안전·evidence·decision·verify/repair를 담당한다.
- 내부적으로 LLM을 쓸 수 있으나 ❌ 서비스별 말투/페르소나는 담당하지 않는다.
- ❌ 최종 고객 메시지를 직접 쓰지 않는다 → Foundation Response Contract를 만든다.

**Shashu Response AI Adapter / Cosmile Response AI Adapter** (출력 AI)
- Foundation Response Contract를 그 플랫폼 고객용으로 *마사지*한다.
  - Shashu: 따뜻한 상담사 문장·언어. · Cosmile: 커머스 문장·상품 카드·CTA·주의문구.
- ❌ Foundation의 safety/decision/prohibited_claims를 바꾸지 못한다.
- ❌ 제품명/효능/안전 claim을 임의 생성하지 못한다(근거는 evidence 안에서만).

**Cosmile Commerce Data** (데이터 공급원 — ★AI 아님)
- 카탈로그·가격·재고·장바구니·주문/배송 상태를 *제공*한다.
- ❌ Foundation 판단을 대체하지 않는다(데이터일 뿐, 판단 아님).

## 9. Service Semantic Contract 초안 (Service → Foundation)
```json
{
  "service_profile": "siasiu | cosmile",
  "audience": "customer",
  "user_text": "<원문 — trace엔 미저장>",
  "intent_signal": "<enum: category_product_request | broad_product_recommendation | top_pick_request |
                     skin_concern_consultation | safety_risk_consultation | contraindication_check |
                     product_type_comparison | greeting | unclear_shopping_guidance | cannot_determine>",
  "entities": { "category": [], "ingredient": [], "product_ref": [] },
  "risk_signal": "none | low | medium | high",     // 서비스 semantic이 *올릴 수만* 있음
  "needs_retrieval": true, "needs_clarify": false,
  "confidence": 0.0,
  "session_context": { "safety_facts": { "avoid_ingredient": [], "allergy": [], "pregnancy_nursing": false } },
  "catalog_candidates": [ /* service data — refs만 */ ]
}
```
- ★서비스가 이해를 못 하면 `intent_signal=cannot_determine` → Foundation이 keyword fallback/clarify(죽이지 않음).
- ★`risk_signal`은 Foundation에서 MAX에 합류(올림만).

## 10. Foundation Response Contract 초안 (Foundation → Service)
```json
{
  "decision_type": "recommend | do_not_recommend | do_not_buy | hold | ask_more | cannot_determine",
  "safety_gate_result": "pass | caution | block",
  "recommended_products": [ /* refs/IDs only — 이름/근거는 evidence에서 */ ],
  "evidence": [ /* 원문 근거(성분/원리) */ ],
  "answer_substance": "<Foundation reasoning 결과 — persona/언어 미적용>",
  "enforcement_reason": [], "avoid_atoms": [], "retrieval_mode": "engine_search",
  "trace": { /* reason codes·hash·flags — raw PII 미포함 */ }
}
```
- ★서비스 Response Adapter가 `answer_substance`를 *플랫폼 목소리/언어*로 마사지 → 최종 출력. 서비스는 **decision/safety/products를 바꾸지 못함**(전복 금지).

> ★`answer_substance` 정의 (정밀화):
> - **최종 고객-facing copy가 *아니다*.** 서비스 Response AI Adapter가 렌더링할 **판단 substance**(근거·이유·주의의 실질 내용)다.
> - 문장 형태일 수 있으나 **persona · channel tone · CTA · localized UX copy는 포함하지 않는다**. 그건 Response Adapter가 입힌다.
> - 즉 Foundation은 *"무엇을 말해야 하는가(substance)"*를 정하고, 서비스는 *"어떻게 말하는가(voice/channel)"*를 정한다.

## 11. Safety Contract (1급 불변)
- **safety/risk = MAX(service semantic signal, Foundation guard(_kw_risk), product/ingredient policy)**.
- semantic은 risk를 **올릴 수 있으나 낮출 수 없다**.
- **high-risk = deterministic fail-closed floor** (레티놀/임신/알레르기/adverse → `risk=="high"` 분기가 intent보다 우선).
- **LLM이 유일 안전 게이트가 되면 안 된다**: llm_guard semantic + `_kw_risk` 규칙 + verify_output(fail-closed 2차망) 다층.
- avoid rail(MAND-07): 전 verify 경로 전달 + 제품 억제 유지.
- 근거: 01A 데이터 — 레티놀은 *키워드가*, "계속 써도 되나"는 *semantic이* 안전을 잡음 → 어느 한쪽만으론 사각. MAX가 필수.

> ★목표 invariant vs 현재 상태 (정직 구분):
> - **목표 invariant**: safety = MAX(service semantic signal, Foundation guard, product/ingredient policy) — 항상.
> - **현재(ROUTING-01B) 상태**: semantic risk MAX가 **gap-only**(keyword=cannot_determine일 때만 semantic risk 합류). 즉 **safety-MAX-*always*는 아직 미완**. (완화: 별도 llm_guard safety-semantic이 medical/emergency를 독립 상향 + high-risk keyword floor.)
> - **완성 위치**: **safety-MAX-always는 ROUTING-MISSION-03 또는 별도 미션에서 완성**해야 한다. 그 전까지 이 문서의 §11은 *목표 계약*이고 현재 구현은 gap-only 제한 상태임을 명시.

## 12. Provider Seam
- 현재 = DeepSeek(`semantic_router._MODEL`·`llm_guard`). 이후 = 로컬 LLM/타 vendor 교체 가능.
- ★**provider가 바뀌어도 Service Semantic Contract / Foundation Response Contract는 불변.** LLM은 이해·마사지 담당이고 계약은 provider-agnostic.
- 교체 지점 = 어댑터(이해/마사지) + composer의 `_MODEL`뿐. Foundation 판단 로직은 무관.

## 13. 기존 ROUTING-01A/01B/02의 재해석
| 미션 | 그때 이름 | 헌법 관점 재해석 |
|---|---|---|
| 01A | semantic shadow | **input understanding 계층**을 관측 설치(keyword vs semantic 발산 측정) |
| 01B | gap-authoritative | understanding을 *부분* semantic화(intent_signal seam) + safety MAX 골격 |
| 02 | calibration | understanding 엔진(semantic_router) 정밀화 |
→ ★재해석: **이 셋은 "Service Semantic Adapter(①)"를 짓던 것.** 다만 현재 physically Foundation 안(`semantic_router.py`)에 있음 →
  헌법상 이 이해 계층은 *서비스 edge 개념*이다. 구현은 (a)서비스가 소유 또는 (b)profile로 파라미터화된 *공유 이해 서비스*로 둘 다 가능 — 단 **출력은 반드시 Service Semantic Contract**여야 Foundation 코어가 서비스-무관하게 유지된다.

## 14. 앞으로의 미션 순서
1. **ROUTING-02.5/02B**: `_refine` quirk 정리(skin_concern/explanation → recommend 오매핑) + wider shadow 재측정 + **eval-set 테스트 방법 전환**(LLM 비결정성 → exact-match golden 대신 불변식+분포 채점).
2. **ROUTING-03**: true semantic primary + safety-MAX-always(gap-only 해제) — 단 §11 Safety Contract 하에서.
3. **CONTRACT-01**: Service Semantic Contract / Foundation Response Contract를 *실제 API 경계*로 정식화(intent_signal seam 확장).
4. **COSMILE-CONNECT-01**: Cosmile ① Semantic Adapter → Foundation Common Brain 실연결(MOCK BRAIN 해제) — read-only/shadow부터.
5. 이후: PERSONA/TALK_STYLE → profile(②), memory 로직 lift(③는 서비스 소유), 커머스 액션(④ Cosmile).

## 15. 금지 원칙 (헌법 위반 = 미션 실패)
- ❌ **플랫폼별 판단 코어 복붙 금지** — 서비스마다 검색/판단/안전을 재구현하면 다시 갈라진다(덕지덕지 재발).
- ❌ **Foundation 내부에 플랫폼별 말투/데이터 박기 금지** — persona/언어/카탈로그/고객사실은 서비스 edge·profile·주입.
- ❌ **LLM이 decision 전복 금지** — semantic은 intent 제안·risk 상향만. decision_type/safety_gate_result는 Foundation 판단 소유.
- ❌ **LLM이 제품명/근거 없는 claim 생성 금지** — 제품은 refs만·근거는 evidence 안에서. 근거 밖 성분/효능/기억 지어내기 0.
- ❌ **safety 하락 금지** — semantic/서비스는 risk를 낮출 수 없다.

---

## End-to-end sequence (요약도)
```
고객 메시지
   │
   ▼  [Service Semantic AI Adapter (LLM 이해)]  ── Foundation Semantic Contract ──▶
        (Shashu Semantic AI Adapter / Cosmile Semantic AI Adapter)              │
                                            ┌───────────────────────────────────▼──┐
                                            │   Foundation Common Brain             │
                                            │   Retrieval · Reasoning AI · Guard/   │
                                            │   Verify · Decision Engine (전 서비스 동일) │
                                            └───────────────────────────────────┬──┘
   ◀── Foundation Response Contract ──  [Service Response AI Adapter (LLM 마사지)]
   │     (answer_substance + decision + safety + product refs)   (Shashu / Cosmile)
   ▼
최종 고객 응답 (플랫폼 목소리·언어)   ── Commerce Data(비-AI)는 Cosmile Adapter에 카탈로그/가격/재고 공급 ──
```
> 용어: "Foundation Semantic Contract"(서비스 이해 AI가 작성 = Foundation 입력) = §9의 Service Semantic Contract와 동일 객체.

## 한계 / 주의
- 이 문서는 **아키텍처 헌법**(경계 기준) — 구현 지시 아님. 각 미션은 이 경계를 근거로 별도 승인.
- Contract 초안의 필드명은 현행 코드(intent_signal/risk_signal/decision_type/safety_gate_result/avoid_atoms/recommended_products/retrieval_mode)에 근거 — CONTRACT-01에서 정식화.
- 코드 수정 0 · commit 0 · push 0 · SIASIU/Foundation/Cosmile 무수정.
