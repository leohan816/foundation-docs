# Foundation T2 — Retrieval Fusion + Grounding Gate Framework — 설계서 (구현 전)

> **설계/테스트 계획만. 구현 0.** Promotion Plan의 Train T2(P0). 근거: `20260630_FOUNDATION_COMMON_BRAIN_PROMOTION_PLAN.md`(F2/F3·§6·§8) · T1 결과(`38f8056`, answer_type/target_category/adverse/explicit_reco) · SIASIU Source Package(read-only: `search_triggers.detect_search_needs`·`evidence_grading`·`evidence_mode` candidate cap·grounding "no evidence→확인할게요").
> 원칙: **복사 아니라 골격 승격.** framework=foundation-control · 어휘/KB/임베딩=SIASIU 주입(repo-local). ★기존 v0.3 response_plan·v0.3.1 candidate guard·T1 F1 **불변**(additive·regression-gated). live Path A 전환·LLM·memory·실 KB = **본 train 범위 아님**.

## 1. T2가 해결하려는 문제
직전 Cosmile 시뮬(`24a45fc`)에서 확인: **Cosmile `searchProducts`가 모든 query에 candidate를 무조건 주입** → 교육/고민 질문이 product 흐름으로 새는 구조적 원인. T1(F1)이 **분류**를 고쳐 candidate guard가 막게 했지만, 근본은 **"이 질문에 retrieval/candidate가 필요한가"를 Foundation이 판단하지 않는 것**. 또한 Foundation은 **근거 없이도 답을 구성**(grounding gate 부재) → 지어내기 위험.
→ T2 목표: Foundation이 질문별로 **retrieval_needed / candidate_needed / grounding_mode / no_evidence_action**을 판단하는 **additive decision layer** + **근거 없으면 defer**하는 grounding gate **골격**.

## 2. 붙을 위치 (Foundation 현재 구조)
```
judge(payload)
 → _kw_risk · _detect_conditions · _classify_intent          # 기존
 → [T1] _categories_in(substring-safe) · answer_type · target_category · adverse_soft · explicit_reco · _refine_intent
 → 기존 decision(dt/sg) · _enrich_products · Candidate Override Guard(v0.3.1)   # 불변
 → [★T2 additive] retrieval_decision = decide_retrieval(answer_type, refined_intent, target_category, adverse, explicit_reco, risk, has_candidates)
 → [★T2 골격] (선택) F2 Retrieval Fusion(rrf/bm25/vector/rerank) · F3 Grounding Gate(근거유무→answer/defer)
 → response_plan/clarification_plan(기존) + retrieval_decision(신규 출력)
```
- **T2는 기존 decision_type/recommend를 바꾸지 않는다.** `retrieval_decision`은 **additive 출력 필드**(상류 Cosmile가 candidate 주입 timing을 알도록) + grounding gate는 **answer 구성 단계의 fail-closed 게이트**(없으면 defer).
- **Part A(즉시·dev-shadow):** Retrieval **Decision** layer(분류→정책, 실 검색 불필요). **Part B(골격):** F2 Fusion + F3 Grounding Gate **interface/skeleton**(실 KB/임베딩은 SIASIU 주입 seam — 본 train은 stub).

## 3. retrieval decision contract (additive 필드 — 제안)
| 필드 | 타입 | 값 | 의미 |
|---|---|---|---|
| `retrieval_needed` | bool | — | 지식/근거 검색이 필요한가(설명·성분·안전·비교·제품) |
| `candidate_needed` | bool | — | **제품 candidate 주입이 필요한가**(추천 의도+안전 clear일 때만 true) |
| `grounding_mode` | enum | `required`·`cautious`·`optional`·`none` | 근거 강제 수준(안전/성분/제품특정→required/cautious) |
| `no_evidence_action` | enum | `defer_or_clarify`·`safety_first`·`proceed_general`·`ask_more` | 근거 없을 때 행동(지어내기 금지) |
| `evidence_required_reason` | str/null | — | 근거 필요 사유(예: pregnancy_safety·ingredient_claim·product_specific) |
| `retrieval_scope` | enum | `knowledge`·`product_catalog`·`safety`·`none` | 검색 대상 범위 |
| `product_candidate_policy` | enum | `deny`·`conditional`·`allow` | candidate 사용 허용 정책(guard와 정합) |

★불변식: `candidate_needed=true ⟹ refined_intent==product_recommendation_request AND risk!=high`. `product_candidate_policy=deny ⟹ recommended_products=0`(기존 guard와 동일 보장). `grounding_mode=required AND no_evidence ⟹ no_evidence_action∈(defer_or_clarify, safety_first)`(지어내기 0).

## 4. answer_type별 정책표 (T1 출력 → T2 정책)
| answer_type / refined_intent | retrieval_needed | candidate_needed | grounding_mode | no_evidence_action | retrieval_scope | product_candidate_policy |
|---|---|---|---|---|---|---|
| greeting | false | **false** | none | proceed_general | none | deny |
| education / skin_concern_explanation | true | **false** | cautious | **defer_or_clarify** | knowledge | deny |
| routine_guidance | true | **false** | cautious | defer_or_clarify | knowledge | deny |
| product_comparison | true | **false** | cautious | proceed_general(비교설명) | knowledge | deny |
| concern_clarify (clarify_concern_axis) | false | **false** | optional | defer_or_clarify | none | deny |
| vague_product | false | **false** | none | ask_more | none | deny |
| adverse_or_safety (adverse/safety_question/risk high) | true | **false** | **required** | **safety_first** | safety | deny |
| **product_recommendation** (+ explicit_reco, risk≠high) | true | **conditional→true** | **required(product)** | defer_or_clarify(없으면 ask_more) | product_catalog | **conditional**(안전 clear시 allow) |

★핵심: **explicit recommendation일 때만 candidate_needed=true 가능.** 교육/루틴/비교/고민/안전 = candidate_needed=false → 상류가 candidate를 주입할 이유가 없고, 주입돼도 guard+policy로 recommend 0.

## 5. safety / adverse / ingredient / product-specific 처리 정책
- **safety/adverse/medical/pregnancy/시술(레이저 등)**: grounding_mode=**required**, no_evidence_action=**safety_first**, retrieval_scope=safety, product_candidate_policy=deny. (근거 충분+안전 source일 때만 안내; 아니면 전문가 상담 우선.)
- **ingredient(성분 정의/효능)**: grounding_mode=cautious, no_evidence_action=defer_or_clarify, scope=knowledge, candidate_needed=false. (근거 없으면 단정 금지·"확인이 필요해요".)
- **product-specific("이 크림 괜찮을까?")**: grounding_mode=cautious~required, candidate_policy=conditional(do_not_recommend 흐름 유지), 근거 부족→caution. (T1에서 do_not_recommend 유지와 정합.)
- SIASIU 정합: `source_policy`(pregnancy→regulatory 필수·brand/blog 불가)·evidence_mode candidate cap(candidate 근거→cautious 상한)·assertive 비활성 = **F3/evidence 단계 주입 정책**(본 train은 인터페이스만, 실 source 규칙은 후속).

## 6. candidate 주입 timing 정책
- Foundation이 `candidate_needed`를 **선언** → 상류(Cosmile)는 **candidate_needed=true일 때만** `searchProducts` 호출·주입(권장 계약). 교육/루틴/비교/안전 = 주입 안 함.
- **그러나 상류가 어겨도(무조건 주입) Foundation은 안전**: `product_candidate_policy=deny` + 기존 candidate guard로 recommend 0 보장(이중 안전). T2는 guard를 대체하지 않고 **선언+정합**한다.
- 권장 호출 시퀀스: `judge(query, no candidates)` → `retrieval_decision.candidate_needed` 확인 → true면 `searchProducts` → `judge(query, candidates)` 재호출(또는 단일 호출 내 정책 적용). 본 train은 **단일 호출 내 additive 출력**으로 설계(상류 2-step 전환은 별도).

## 7. Grounding Gate — no-evidence 처리 정책 (지어내기 금지)
F3 Grounding Gate(골격): `(retrieval_hits, grounding_mode) → {grounded: bool, action}`.
- `grounding_mode=required` + hits 부족/없음 → **action=defer_or_clarify**(또는 안전계열은 safety_first) → answer는 "확인이 필요해요/전문가 상담" 류, **catalog 밖·근거 없는 단정 0**.
- `grounding_mode=cautious` + 약한 근거 → answer_mode cautious 상한(evidence_mode 원리, 후속 F6과 연결).
- `grounding_mode=optional/none` → 일반 답(greeting/vague).
- ★fail-closed: 모호하면 defer. raw hits는 judgment에 직접 주입하지 않음(SIASIU `used_for_judgment=False` 원리).
- **본 train(dev-shadow)**: 실 retrieval이 없으므로 hits=∅로 동작 → required인데 근거 없음 → defer 경로가 **기본**. 즉 T2 단독으로는 "근거 필요한데 없음 → defer"가 안전하게 작동(실 KB는 SIASIU 주입 후 grounded 경로 활성).

## 8. T1/F1 · candidate guard와의 관계
- **입력 재사용**: T2는 T1의 `answer_type`/`target_category`/`refined_intent_type`/`adverse`/`explicit_reco`를 **그대로 입력**(중복 분류 0).
- **guard 불변**: candidate guard(v0.3.1)는 그대로. T2의 `candidate_needed`/`product_candidate_policy`는 guard와 **동일 방향**(비-제품 intent → candidate 사용 안 함)이며 guard를 **완화하지 않는다**. guard는 "candidate가 와도 recommend 안 함", T2는 "애초에 candidate가 필요/허용되는가를 선언" — 이중 안전.
- **decision 불변**: T2는 decision_type/recommend/products를 바꾸지 않음(additive 출력). 기존 response_plan/clarification_plan 유지.

## 9. 구현 시 예상 위험
1. **상류(Cosmile) 미적응**: T2 출력 필드를 Cosmile이 안 읽으면 candidate 주입 timing은 안 바뀜 → 단, guard가 막아 안전. (Cosmile 적응은 별도 train.)
2. **실 retrieval 욕심**: F2 Fusion에 실 BM25/임베딩/KB를 넣으려는 충동 → SIASIU-specific·heavy. **본 train은 skeleton/injection seam만**(stub). 실 KB는 SIASIU repo-local 주입(후속).
3. **grounding gate over-defer**: required인데 dev-shadow엔 hits=∅ → 모두 defer로 과보수 → product_recommendation 흐름이 죽을 수 있음. **완화**: product_recommendation의 grounding은 **catalog candidates 자체를 근거로 간주**(candidate present ⟹ grounded-for-product), 실 지식 근거는 안전/성분에만 required. → 추천 흐름(T1) 유지.
4. **decision 변형 위험**: T2가 실수로 dt를 바꾸면 40/40 깨짐 → **출력 전용 layer**로 격리(decide_retrieval은 dt를 읽기만, 쓰지 않음).
5. **fabrication**: grounding gate 미적용 시 근거 없는 단정 → fail-closed defer로 차단.

## 10. 테스트 계획
**공통 회귀 게이트(불변 필수)**: v0.2 40/40 · v0.3 16/16 · guard 19/19 · **F1 14/14** · adversarial 180(`decision_integrity=1.0`·`false_recommendation=0`·`safety_critical_violation=0`·`intent_gap=0`) · live/write/memory/push=0.

**T2 신규 테스트(제안 ~14):**
| # | 케이스 | 기대 retrieval_decision |
|---|---|---|
| 1 | 안녕 | retrieval_needed=F · candidate_needed=F · grounding=none |
| 2 | 여드름 피부에 대해서 알고 싶어 | candidate_needed=**F** · grounding=cautious · scope=knowledge · policy=deny |
| 3 | 세럼은 언제 발라? | candidate_needed=**F** · scope=knowledge |
| 4 | 세럼이 좋아 크림이 좋아? | candidate_needed=**F** · grounding=cautious |
| 5 | 피부가 따가워 / 따가워도 추천 | grounding=**required** · no_evidence_action=**safety_first** · candidate_needed=F |
| 6 | 임신 중 레티놀 | grounding=required · no_evidence_action=safety_first · candidate_needed=F · evidence_required_reason=pregnancy_safety |
| 7 | 레이저 받고 선크림 발라도 돼? | grounding=required · safety_first · candidate_needed=F |
| 8 | 미백 제품 추천해줘(+candidates) | candidate_needed=**T** · policy=conditional/allow · scope=product_catalog |
| 9 | 미백 제품 추천해줘(no candidates) | candidate_needed=T 이나 no_evidence_action=ask_more(제품 0) |
| 10 | 토너는 꼭 써야 해? | candidate_needed=F · scope=knowledge(education) |
| 11 | 제품추천(vague) | candidate_needed=F · no_evidence_action=ask_more |
| 12 | grounding required + hits=∅ | action=defer_or_clarify/safety_first(지어내기 0·products 0) |
| 13 | 불변식: candidate_needed=T ⟹ refined=product_recommendation_request & risk≠high | 전 케이스 |
| 14 | 불변식: policy=deny ⟹ recommended_products=0 · decision 불변(dt before==after) | 전 케이스 |

**F2 Fusion 골격 테스트(Source Package §7, skeleton 한정):** rrf 채널내 best-rank dedup·다채널 합산·빈채널; interface I/O 계약. (실 BM25/vector/KB는 본 train 미구현 → stub 테스트.)
**F3 Grounding Gate 테스트:** required+근거없음→defer(지어내기 0) · optional→일반답 · product는 candidate를 근거로 grounded(추천 흐름 유지).

## 성공 기준 계획
- 기존 40/40 · 16/16 · 19/19 · **F1 14/14** 유지 · adversarial 180 유지 · false_recommendation=0 유지 · product recommendation permission invariant 유지.
- T2 신규 ~14 PASS · decision_type/products **불변**(additive 증명: dt before/after 동일).
- live/write/memory/push = 0. 실 KB/LLM/Path A 미연결.

## 소유권 (Promotion Plan §8)
- T2 framework(decide_retrieval 계약·F2 Fusion 골격·F3 Grounding Gate) = **foundation-control**.
- KB/글로서리/임베딩/source_policy 어휘 = **SIASIU repo-local 주입**(후속).
- Cosmile candidate 2-step 호출 전환 = **control 계약 → Cosmile 구현**(별도 train).

## no_change_assertions (본 설계 train)
구현 0 · Foundation core 0 · Cosmile 0 · SIASIU 0 · FOUNDATION repo 0 · contract 0 · canonical 0 · product logic 0 · LLM 0 · memory write 0 · push 0. 본 설계서(md/json)만 생성.

## 한 줄 요약
T2는 "이 질문에 **검색·candidate가 필요한가**, 근거 없으면 **무엇을 할가**"를 T1 분류 위에서 선언하는 **additive decision layer + grounding gate 골격**이다. **candidate_needed는 명시 추천+안전 clear일 때만 true**, 근거 없으면 **defer(지어내기 0)**, 기존 guard/decision/40-16-19-14 **불변**. 실 KB/LLM/Path A는 후속·승인.
