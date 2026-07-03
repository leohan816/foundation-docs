# Foundation Reachability + Raw Response Trace — Read-only Diagnostic — 2026-06-30

> ★read-only trace. **코드/contract/canonical/product 수정 0.** "바로 튕기는 답변"의 근본 원인을 증명만 한다.
> Leo 3가설 중: ①Foundation 미도달 ②Foundation 도달했으나 generic ask_more에서 멈춤 ③Foundation은 답했으나 Cosmile이 덮어씀 — 무엇인지 증명.

## repo / service
- foundation-control `ecae1f7`(clean) · Cosmile `main@31bbc45` dirty=1(**`app/next.config.ts`**만, Leo) · SIASIU `921caf4`(clean) · FOUNDATION `b7cce1f`(clean).
- service `http://127.0.0.1:8731` ok · dev_shadow · api_live=false. Cosmile API: `POST /api/slice/consult`(실 surface) → Foundation `POST /v1/consult/judge`.

## 핵심 증거 1 — Foundation 응답 필드 inventory
Foundation 응답에 **있음**: `intent_type · detected_conditions · concern_tags · safety_risk_tags · clarification_questions · answer{answer_title, answer_summary, next_questions, display_sections, recommendation_logic}`.
Foundation 응답에 **없음**: **`response_plan` · `ask_more_required` · `retrieval_allowed` · `product_candidate_allowed` · `product_recommendation_allowed`** (canonical future field 미구현).

## 핵심 증거 2 — 7 케이스 Foundation raw ↔ Cosmile API (전부 Foundation 도달)
| input | F intent | F decision | F answer(요약) | Cosmile: bridge/mock/trace | 도달 | 덮어씀? |
|---|---|---|---|---|---|---|
| 여드름 피부에 대해서 알고 싶어 | skin_concern(acne) | **hold** | "여드름/트러블 관련해서 조금 더 확인이 필요해요" | http/False/**fdsh_** | ✅ | **아니오**(동일) |
| 피부가 요즘 자외선 때문에 고민이야 | **cannot_determine** | ask_more | "조금 더 알려주시면 보유 카탈로그에서…" | http/False/fdsh_ | ✅ | 아니오 |
| 뭘 알려줘? | cannot_determine | ask_more | "조금 더 알려주시면…"(generic) | http/False/fdsh_ | ✅ | 아니오 |
| 제품추천 | broad_product_recommendation | ask_more | "좋아요. 피부 타입, 고민, 원하는 제형을…" | http/False/fdsh_ | ✅ | 아니오 |
| 세럼이 좋아 크림이 좋아? | product_type_comparison | ask_more | **"세럼은 가볍게 흡수…크림은 보습막·장벽…"**(좋음) | http/False/fdsh_ | ✅ | 아니오 |
| 피부가 따끔거려 | safety_risk_consultation | **do_not_buy/block** | "안전을 위해 지금은 구매로 연결하지 않을게요…" | http/False/fdsh_ | ✅ | 아니오 |
| 미백 제품 추천해줘 | skin_concern(pigmentation) | ask_more(pure)→**recommend**(candidate) | catalog 4제품 | http/False/fdsh_ | ✅ | 후보흐름(덮어씀X) |

→ **모든 케이스 Foundation 도달(fdsh_ trace·mock=False)** + **Cosmile이 Foundation answer를 충실히 렌더(덮어쓰기 0)**.

## 핵심 증거 3 — history(맥락) 전달: 전무
- `httpFoundationConsultation.ts:57`: `body: JSON.stringify({ query, catalog_candidates, locale })` — **history 없음**.
- consult route / ChatShell: conversation `messages`는 state로만 보존, **Foundation으로 미전송**.
- Foundation `core.py`: history/messages/conversation/context/prior 필드 **없음** → **stateless 단발 query**.
- → "뭘 알려줘?"가 직전 맥락(자외선)을 못 이어받는 근본 = **CONTEXT_PAYLOAD_MISSING**.

## Leo 3가설 판정
1. **Foundation 미도달? → FALSE.** 모든 케이스 fdsh_ trace·bridge=http·mock=False로 도달.
2. **Foundation 도달했으나 generic ask_more에서 멈춤? → TRUE.** Foundation이 education/concern을 이해 못 하고 generic ask_more/cannot_determine 반환(여드름→hold 일반·자외선→cannot_determine·response_plan 없음).
3. **Foundation은 답했으나 Cosmile이 덮어씀? → FALSE.** Cosmile은 Foundation answer를 그대로 렌더. generic함은 Foundation 출력 자체.

## 케이스별 root cause
| input | root cause | 근거 |
|---|---|---|
| 여드름 education | **FOUNDATION_RESPONSE_PLAN_MISSING** | education_request intent 없음 · 여드름=medium-risk concern→hold · 설명 생성 없음 · response_plan 없음 |
| 자외선 | **FOUNDATION_RESPONSE_PLAN_MISSING** | intent=cannot_determine(자외선 미인식) · clar="무엇을 도와드릴까요?" generic |
| 뭘 알려줘? | **CONTEXT_PAYLOAD_MISSING**(+RESPONSE_PLAN) | history 미전송·stateless → 직전 맥락 불가 |
| 제품추천 | OK-ish / RESPONSE_PLAN(richer) | Foundation이 합리적 ask_more 질문 제공 |
| 세럼vs크림 | **OK** | Foundation이 비교 설명 제공 · Cosmile 충실 렌더 |
| 피부가 따끔거려 | **JUDGE_MINOR_FIX** | 따끔 단독 over-block(canonical은 caution) |
| 미백 추천 | OK | candidate flow recommend · 위반 0 |

## 상세 trace
**[1] "여드름 피부에 대해서 알고 싶어"(핵심):** Foundation 도달(fdsh_a2bd…). intent=skin_concern_consultation, **dec=hold**, cond=[acne], clar="어떤 피부 고민인지, 사용 중인 제품이 있는지 알려주세요." answer="여드름/트러블 관련해서 조금 더 확인이 필요해요." → ★education 요청인데 **여드름을 medium-risk concern으로 보고 hold(ask-more)로 튕김**. Foundation에 **education_request/skin_concern_explanation intent도, 설명(response_plan)도 없음** → **FOUNDATION_RESPONSE_PLAN_MISSING**. (Cosmile은 이 hold answer를 그대로 표시 — 덮어쓰기 아님.)

**[2] "자외선 고민":** Foundation 도달. **intent=cannot_determine**(자외선을 concern/category로 미인식) → generic "무엇을 도와드릴까요?". 정상 방향(붉어짐/잡티/건조 등 concern-aware clarification)은 **Foundation이 자외선을 이해해 next_questions를 내려야** 함. 현재 Foundation 출력이 generic → **FOUNDATION_RESPONSE_PLAN_MISSING**.

**[3] "뭘 알려줘?" history:** Cosmile request payload = `{query, catalog_candidates, locale}` — **history 없음**. Foundation contract도 history 미수용 → **stateless**. 직전 자외선 맥락 이어받기 불가 → **CONTEXT_PAYLOAD_MISSING**.

## aggregate
- total_cases: **7**
- routing_failure_count: **0**
- foundation_response_plan_missing_count: **3**(여드름·자외선·뭘알려줘) (+제품추천 borderline)
- surface_mapping_failure_count: **0**
- mixed_count: **0**
- history_payload_missing_count: **7**(전 케이스 stateless·history 미전송)
- foundation_context_unused_count: **0**(history가 아예 안 보내져 "unused" 아님)
- judge_minor_fix_count: **1**(따끔 over-block)

## overall conclusion
**FOUNDATION_RESPONSE_PLAN_MISSING_PRIMARY** + **CONTEXT_PAYLOAD_MISSING** + **JUDGE_MINOR_FIX_ONLY(따끔)**.
- ROUTING_FAILURE: 아님(전부 도달). SURFACE_MAPPING_FAILURE: 아님(Cosmile 충실 렌더).
- 근본: **Foundation이 education/concern을 이해하고 설명·concern-aware clarification·response_plan을 내리지 못한다.** Cosmile heuristic으로 채우면 안 됨 → Foundation-side 보강 필요.

## 다음 train 추천
1. **Foundation Response Plan + Clarification Planner v0.3**(Foundation-side·결정론): `education_request`/`skin_concern_explanation` intent · concern 인식(자외선 포함) · `response_plan`(explain_then_offer_path) · concern-aware `clarification_questions`. ★Cosmile heuristic 아님.
2. **Multi-turn Context Payload v0.3**: Cosmile이 conversation history를 Foundation으로 전달 + Foundation /v1/consult/judge가 history 수용·활용("뭘 알려줘?" 맥락).
3. **JUDGE minor fix**: 따끔 단독 block→caution.
> Cosmile은 그 구조화 출력을 **렌더만** 한다(판단 0).

## no-change assertions
코드 0 · contract 0 · canonical 0 · Cosmile 0 · SIASIU/FOUNDATION 0 · memory write 0 · push 0. 본 trace report(md/json)만 생성. Cosmile dirty=next.config.ts(Leo) 미접촉.
