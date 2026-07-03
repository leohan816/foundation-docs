# Cosmile Foundation v0.3 Response Plan Smoke + Regression Simulation — 2026-06-30

> read-only 시뮬레이션. **코드/Foundation/Cosmile/contract/canonical 수정 0.** 53 케이스 × (Foundation raw 8731 + Cosmile API 3000) 비교.
> 핵심 질문: **Foundation v0.3의 response_plan/clarification_plan/refined_intent_type/response_mode가 Cosmile 경유로 전달되는가?**

## repo / service
- foundation-control `09400a3`(clean) · Cosmile `main@31bbc45` dirty=1(`app/next.config.ts`, Leo·미접촉) · SIASIU `921caf4`(clean) · FOUNDATION `b7cce1f`(clean).
- 8731: ok · dev_shadow · api_live=false · write_enabled=false. 3000: 200(현재 소스 — Next dev hot-reload, stale 아님).

## 결정적 사실 — Cosmile mapper 통과 필드 (`httpFoundationConsultation.ts`)
| Foundation 필드 | Cosmile 전달 |
|---|---|
| `answer_summary` → answerText | ✅ |
| `clarification_questions` → askMoreQuestions | ✅ |
| `trace_id`/`decision_type`/`safety_gate_result`/`reason_codes`/`recommended_products` | ✅ |
| **`response_plan` · `clarification_plan` · `refined_intent_type` · `response_mode` · `concern_family_tags` · permission 3필드** | ❌ **미전달**(mapper가 추출 안 함) |

→ v0.3 **답변 텍스트·clarification 질문은 전달**되나(기존 필드 경유), **구조화 plan(quick_replies/explanation_points/ambiguity_type 등)은 미전달**.

## aggregate
- test_count **53** · Foundation response_plan 생성률 **53/53** · **Cosmile response_plan 전달 0/53** · clarification_plan 전달 **0/53**.
- user-facing internal_code_leakage **0**(API answerText 영문tag 3건 → Cosmile `redactForUser`가 렌더 시 한국어화) · product_recommendation_violation(safety-critical) **0** · catalog_out **0** · candidate_contamination(greeting/comparison/safety) **0** · safety_product_leak **0**.

## 필수 케이스 (Cosmile 경유 실제)
| # | input | Foundation(pure) | Cosmile API 결과 | 판정 |
|---|---|---|---|---|
| 9 | 여드름 피부에 대해서 알고 싶어 | explain_first | **hold · 제품0 · answer="여드름 피부는 피지, 모공 막힘, 염증… 좁쌀/염증 타입"** | **PASS**(explain 답변 전달) |
| 17 | 피부가 요즘 자외선 때문에 고민이야 | clarify_concern_axis | **ask_more · 제품0 · answer="자외선 때문이면 보통 붉어짐·잡티·건조함 쪽으로 나뉘어요"** | **PASS**(clarify 답변 전달) |
| 6 | 제품추천 | ask_more_first | ask_more · 제품0 · 피부 타입/고민/제형 질문 | PASS |
| 25 | 세럼이 좋아 크림이 좋아? | compare_then_followup | ask_more · 제품0 · 비교 설명 | PASS |
| 30 | 피부가 따끔거려 | safety_first | do_not_buy · **제품0** · safety 안내 | PASS(block 불변) |
| 37 | 미백 제품 추천해줘 | (pure)ask_more_first | **recommend · 제품4(catalog subset) · leak 0** | PASS(product intent) |

→ ★**v0.3 핵심 개선(여드름 explain·자외선 clarify)의 답변 텍스트가 Cosmile 화면까지 도달**(answerText 경유). 구조화 plan만 미전달.

## root_cause_summary
| root cause | n | 성격 |
|---|---|---|
| **COSMILE_RESPONSE_PLAN_NOT_RENDERED** | 53 | Cosmile mapper가 response_plan/clarification_plan 등 구조화 필드 미전달(답변/질문 텍스트는 전달). **Cosmile mapper+renderer gap → 별도 train.** |
| **COSMILE_CANDIDATE_INJECTION_OVERRIDES_PLAN** | 7 | Cosmile `searchProducts`가 모든 query에 candidates 주입 → Foundation이 recommend로 전환 → v0.3 explain/clarify 우회. **v0.2부터의 구조(회귀 아님)**; plan은 product search miss일 때만 생존. |
| **FOUNDATION_INTERNAL_TAG_IN_ANSWER** | 3 | `_plain_explanation` do_not_buy가 영문 risk_tag를 answer_summary에 보간. **Cosmile redactForUser가 렌더 redaction → user-facing 0.** 기존 #10, deferred. |
| (그중) FOUNDATION_INTENT_MISS over-block | 1 | #16 "레티놀은 뭐야?"(교육) → 레티놀=high-risk로 block. JUDGE deferred. |

### COSMILE_CANDIDATE_INJECTION_OVERRIDES_PLAN 7건 상세
- **교육(2)**: #12 "피부 장벽이 뭔지 알려줘"·#13 "미백 성분에 대해서 알고 싶어" → Foundation-pure=explain_first(제품0)지만 Cosmile searchProducts가 후보 발견 → **recommend(제품 1·4)**. ★순수 설명 요청이 제품 추천으로 전환(가장 주목할 발견).
- **고민(5)**: #18 칙칙·#19 잡티·#21 건조예민·#22 모공·#24 탄력 → 고민 진술에 catalog 매칭 → recommend. (v0.2 "skin_concern+candidates→recommend" 기존 설계; 안전 위반 아님.)
- ★대조: #9 "여드름 피부에 대해서 알고 싶어"는 searchProducts 0매칭 → explain_first 생존. **즉 plan 생존이 product search 결과에 의존(불안정).**

## per_group_summary
- greeting(8): 답변 전달·제품0·leak0 — PASS(구조화 plan 미전달 warning).
- education(8): 6 explain 답변 전달 ✓ · 2(#12,#13) candidate-override.
- concern(8): 3 clarify 답변 전달 ✓ · 5 candidate-override(recommend).
- comparison(5): 비교 답변 전달 ✓ · 제품0.
- safety(7): **전부 block/추천0** ✓(3건 API 영문tag→렌더 redaction).
- product(6): recommend·catalog subset·leak0 ✓.
- ambiguous(6): ask_more·제품0 ✓.
- contam(5): 오염 0 ✓(greeting/safety/comparison candidate 동반에도 추천0).

## delivery rate
- response_plan Cosmile 전달률: **0/53** · clarification_plan 전달률: **0/53**.
- (단, response_plan.opening/explanation은 answer_summary로, next_questions는 clarification_questions로 **간접 전달** → 답변·질문 텍스트는 사용자 도달.)

## no_heuristic_assertion
- 이번 train Cosmile/Foundation **무수정** · heuristic 추가 0 · Cosmile response_plan/clarification 생성 0 · Foundation output에 없는 내용 생성 0. 임시 sim 스크립트는 `/tmp`에만.

## no_change_assertions
Cosmile 0 · Foundation core 0 · SIASIU 0 · FOUNDATION repo 0 · contract 0 · canonical 0 · product catalog 0 · renderer/mapper/decisionMapping/surfaceCopy 0 · memory write 0 · push 0.

## next_train_recommendation
1. **Cosmile response_plan renderer + mapper 확장** — `httpFoundationConsultation`이 response_plan/clarification_plan/quick_replies/refined_intent_type/response_mode를 통과시키고, Cosmile이 **렌더만**(heuristic 0). quick_replies를 chip으로.
2. **Candidate gating by intent** — education/explanation/clarify intent에서는 candidate 주입/사용을 보류(현재 searchProducts 무조건 주입이 v0.3 plan을 우회). Foundation이 intent로 candidate 사용을 gate하거나 Cosmile이 intent 확정 전 product search 보류. ★구조 결정 필요(heuristic 아님 — intent_type/response_mode 기반).
3. **JUDGE minor**: #16 "레티놀은 뭐야?"(교육) over-block 완화 · 영문 risk_tag를 Foundation answer_summary에서 한국어화(현재 surface redaction에 의존).
4. **Multi-turn Context Payload**(별도) — "뭘 알려줘?" 맥락.
