# SIASIU → Foundation Code Lineage / Answer Pipeline Extraction Audit — 2026-06-30

> read-only lineage audit. **코드/Foundation/SIASIU/Cosmile/contract/canonical 수정 0.** 증거: SIASIU `app/*`(read-only) · foundation-control `foundation_http_service/core.py` · canonical 문서.
> 핵심 질문: Foundation은 SIASIU에서 왔는데 왜 Cosmile 연동에서 상담 품질 문제가 생기는가?

## repo_statuses
foundation-control `97abf96`(clean) · Cosmile `main@31bbc45` dirty=1(`app/next.config.ts`, Leo·미접촉) · SIASIU `921caf4`(clean) · FOUNDATION `b7cce1f`(clean).

## lineage_summary (핵심 정정)
- **Foundation `foundation_http_service`는 SIASIU 코드의 직접 복사가 아니다.** core.py에 SIASIU/ssbrain import·출처 주석 **0**.
- 실제 lineage = **spec(문서) 기반 재구현**: `설계자료/..._CANONICAL_STANDARD_SIASIU_BASELINE.md`가 SIASIU `answer_type_classifier.py`·`ssbrain/answer.py`·`evidence_mode.py`·`foundation_shadow_adapter.py`를 분석해 **Foundation common chat 표준으로 승격**(canonical §3·§4·§5). Foundation은 그 표준의 **부분 구현**(v0.2 intent/risk → v0.3 response_plan → v0.3.1 candidate guard).
- 즉 **judge/router/permission/response_plan은 이식됨. answer_type taxonomy 전체·retrieval timing·evidence grading·LLM composer·category 격리 원칙은 아직 미승격.**

## confirmed_source_files (spec lineage, 증거 기반)
| Foundation 구성 | SIASIU source(확인) | 증거 |
|---|---|---|
| intent/risk-first 판단 | `answer_type_classifier.classify(query, hits)` 규칙·우선순위·high_risk override | canonical §3 + `answer_type_classifier.py:13-39` |
| safety gate / evidence mode | `evidence_mode.evidence_answer_mode(hits,query)` · `foundation_*_guard.py` | §3 + `evidence_mode.py:50-73` |
| 비판매-우선·고위험 fallback | `ssbrain/answer.py` safety_gate + `_SAFE_CAUTION` | §3 + `ssbrain/answer.py:47-68` |

## suspected_source / 강한 후보
- `answer_pattern_taxonomy.py`(15 answer types 정본) — Foundation `_classify_intent`/`_FAMILY_MODEL`의 **상위 원형**(강한 후보, 직접 import 없음).
- `search_triggers.py`+`evidence_grading.py`+`source_policy.py` — Foundation에 **미승격**(retrieval timing 표준).

## 증거 부족 / 알 수 없음
- foundation_http_service가 어느 commit에서 어떤 SIASIU 파일을 보고 작성됐는지 **commit-level 추적 불가**(canonical 문서가 유일한 lineage 기록). → "spec 기반"으로 결론(코드 diff 증거 없음).

## siasiu_call_graph (실제 — LLM primary)
```
POST /api/chat (server.py:118) → brain.chat (brain.py:866)
 → add_episode(user) → guardrail_check(LLM 분류)
 → kb_search → ssbrain.engine.search (BM25+vector+graph+rerank)   # retrieval FIRST
 → answer_type_classifier.classify(query, hits)                    # hits 필요(no_hits→unknown)
 → evidence_mode.evidence_answer_mode(hits) [high_risk→cautious cap·candidate cap]
 → brain._llm("chat", persona+grounding+history, temp 0.4)         # DeepSeek 자연어 작성
 → safety_gate(reply) [safety_words.violations + _EXTRA_FORBIDDEN + preg/lact assert] → _SAFE_CAUTION fallback
 → foundation_trust_core_runtime.evaluate(16 gates: caveat·medical_boundary·do_not_buy·purchase)
 → external_guard/redact(NEVER_DISCLOSE → [비공개]) → 최종
 ↳ history: episode table(대화) + memory_fact table(사용자 속성) + recent_episodes(10)
```

## foundation_current_call_graph (v0.3.1 — deterministic, LLM 없음)
```
POST /v1/consult/judge → core.judge(payload)
 → _kw_risk · _detect_conditions · _classify_intent(11 intent)     # candidate 무관
 → 결정(dt/sg) → _detect_concern_families · _refine_intent · _response_mode
 → Candidate Override Guard(refined∈_GUARD_BLOCK → 보류)
 → _enrich_products(⊆candidates) → _plain_explanation(rule composer) → _build_response_plan/clarification_plan
 → 불변식(api_live=false…) 출력
 ↳ retrieval/KB 없음 · evidence grading 없음 · LLM 없음 · history 없음(stateless)
```

## 차이 (SIASIU 有 / Foundation 無·단순화)
| 부품 | SIASIU | Foundation v0.3.1 |
|---|---|---|
| answer_type taxonomy(15종·구조·safeguard) | **있음**(taxonomy.py) | 부분(11 intent·family model) |
| **category-word 격리**(intent rule에서 카테고리어 제외) | **있음**(rule에 토너/세럼/크림 없음) | **없음**(category=product intent로 직결) |
| **substring-safe 매칭**(선크림≠크림) | **있음**(TYPE_MAP 별키 + `text.surface_match`) | **없음**(`_categories_in` 선크림⊃크림 충돌) |
| **routine_guidance type**(언제 발라/순서) | **있음** | **없음** |
| **default = education**(미매치→ingredient_definition) | **있음** | **없음**(미매치 category→product) |
| **adverse "따가"** | **있음**(adverse_reaction_question·high_risk) | **없음**(`_HIGH`에 따끔만, 따가 없음) |
| retrieval timing gating(need 기반) | **있음**(search_triggers 8조건) | **없음**(Cosmile candidate 무조건 주입) |
| evidence grading/mode(grounded/cautious·candidate cap) | **있음** | **없음**(evidence_mode 미연결) |
| LLM 자연어 composer | **있음**(DeepSeek) | **없음**(rule composer) |
| history/session·memory_fact | **있음**(episode+fact table) | **없음**(stateless) |
| redaction(NEVER_DISCLOSE regex) | **있음**(disclosure_policy) | 부분(reason_codes는 출력·Cosmile surface redact에 의존) |

## per_case (12) — SIASIU classify(결정론·확인) vs Foundation v0.3.1
> answer_type는 SIASIU `_RULES`(순수 keyword)로 **결정론적 확인 가능**. 최종 답변은 LLM이라 **INFERRED**.

| # | input | SIASIU answer_type | high_risk | Foundation v0.3.1 | gap / 누락 부품 |
|---|---|---|---|---|---|
| 1 | 여드름 피부에 대해서 알고 싶어 | ingredient_definition(default) | F | explain_first·제품0 | 없음(v0.3 해결) |
| 2 | 피부 장벽이 뭔지 알려줘 | ingredient_definition(default) | F | explain_first·제품0 | 없음(v0.3.1 guard) |
| 3 | 피부가 요즘 자외선 때문에 고민이야 | ingredient_definition(default·INFERRED) | F | clarify_concern_axis·제품0 | 없음(둘 다 비추천) |
| 4 | 세럼이 좋아 크림이 좋아? | **ingredient_definition(default)** | F | compare_then_followup·제품0 | 둘 다 비추천(SIASIU도 비교 keyword 미스→교육 default가 안전망) |
| 5 | 선크림 추천해줘 | product_recommendation(추천)·TYPE_MAP 선크림→sunscreen | F | **ask_more(선크림⊃크림→비교 오분류·false block)** | **substring-safe matcher + category lexicon** |
| 6 | 토너는 꼭 써야 해? | **ingredient_definition(default)** | F | **recommend(토너 category→product)** | **category-word 격리 + default-to-education** |
| 7 | 세럼은 언제 발라? | **routine_guidance(언제 발라)** | F | **recommend(세럼 category→product)** | **routine_guidance type + category 격리** |
| 8 | 피부가 따가워 | **adverse_reaction_question·high_risk** | **T** | low risk(따가 미감지) | **adverse lexicon(따가)** |
| 9 | 임신 중인데 레티놀 써도 돼? | pregnancy_lactation_question·high_risk | T | safety_first·block | 없음(둘 다 차단) |
| 10 | 미백 제품 추천해줘 | product_recommendation(추천)+evidence gate | F | recommend(⊆candidates) | retrieval/evidence gating(품질) |
| 11 | 추천은 나중에 받고 지금은 장벽이 뭔지 알려줘 | **product_recommendation(추천)** ← SIASIU도 오분류 | F | **explain_first(explain 우선)** ← Foundation이 더 정확 | 둘 다 defer-intent 미처리(SIASIU가 더 나쁨) |
| 12 | 피부가 따가운데 추천 말고 왜 그런지 알려줘 | **adverse_reaction_question·high_risk** | T | explain_first·제품0 | SIASIU adverse 우선이 더 안전 |

**관찰:** v0.3/v0.3.1로 Foundation은 1·2·3·9·12를 이미 잘 처리. **확정 gap은 5·6·7·8**(category 격리·routine·default-to-education·adverse 따가) + 10(evidence 품질). SIASIU도 4·11에서 완벽하지 않음(default-to-education이 안전망 역할).

## missing_components (evidence table)
| component | SIASIU | Foundation | quality_gap | should_promote | priority | promotion_type | risk_if_not |
|---|---|---|---|---|---|---|---|
| answer_type taxonomy(15종) | ✅ taxonomy.py | 부분 | 중 | YES | P1 | generalize_classifier | 의도 분류 정밀도 부족 |
| **category-word 격리 원칙** | ✅ rule 제외 | ❌ | **고** | YES | **P0** | generalize_classifier | 카테고리어→오추천(#6,7) |
| **substring-safe category matcher** | ✅ TYPE_MAP/surface_match | ❌ | **고** | YES | **P0** | generalize_classifier | 선크림⊃크림(#5) |
| **routine/use detector** | ✅ | ❌ | **고** | YES | **P0** | generalize_classifier | 루틴 질문→오추천(#7) |
| **default-to-education** | ✅ | ❌ | **고** | YES | **P0** | generalize_policy | 미매치→오추천(#6) |
| **risk/adverse normalizer(따가)** | ✅ adverse_reaction | ❌ | **고** | YES | **P0** | generalize_classifier | adverse 미감지(#8) |
| retrieval timing policy | ✅ search_triggers | ❌ | 중 | YES | P1 | generalize_policy | candidate 주입이 plan 우회(직전 sim) |
| evidence grading/mode + candidate cap | ✅ | ❌ | 중 | YES | P1 | generalize_contract | 근거 없는 단정 |
| safety/evidence answer policy | ✅ guards | 부분 | 중 | YES | P1 | generalize_policy | 고위험 mode 미캡 |
| do_not_buy/purchase guard(evidence 필수) | ✅ | 부분 | 저 | partial | P2 | generalize_policy | 근거 없는 추천 |
| LLM natural composer | ✅ DeepSeek | ❌ rule | 고(UX) | 목표 | P2 | copy_not_allowed(guarded LLM) | 템플릿 톤 |
| history/session·memory_fact | ✅ | ❌ | 중 | YES | P1 | generalize_contract | "뭘 알려줘?" 맥락 불가 |
| surface/internal redaction | ✅ disclosure_policy | 부분 | 저 | YES | P2 | generalize_policy | 내부코드 누출(Cosmile redact 의존) |
| negation/defer intent(추천 말고) | ❌(SIASIU도 없음) | ❌ | 중 | 신규 | P2 | generalize_classifier | #11,12 defer 미반영 |

## promotion_candidates (가져와야 할 공통 원리)
1. **category-word 격리 + substring-safe matcher**(P0) — intent rule에서 카테고리어 제외, 카테고리는 retrieval ranking에만. `TYPE_MAP`/`surface_match` 원리.
2. **answer_type taxonomy + default-to-education + routine_guidance**(P0) — 미매치는 교육, 명시 "추천/골라"만 recommendation.
3. **adverse/risk lexicon 정규화(따가 등)**(P0).
4. **retrieval/evidence timing gating + candidate cap**(P1) — need 기반 검색, candidate→cautious.
5. **safety/evidence answer policy(high_risk mode cap)**(P1).
6. **history/session context**(P1, multi-turn 별도 train).

## do_not_copy_list (가져오면 안 되는 SIASIU-specific)
- DeepSeek **LLM composer 직접 이식**(rule→LLM은 canonical §17 guarded 별도 train).
- SIASIU `episode`/`memory_fact` SQLite 모델·`ssbrain` KB/engine(BM25/graph) — SIASIU KB 전용.
- PERSONA 톤·상담 추임새(UX) — vertical adapter.
- SIASIU route/server·DB — service-specific.
- 핵심: **복사가 아니라 승격**(canonical §1.1).

## uncertainty_table
| 항목 | certainty |
|---|---|
| answer_type_classifier가 category어를 rule에서 제외 | **confirmed**(파일 직독) |
| SIASIU classify 결과(결정론) | **confirmed**(순수 keyword) |
| SIASIU 최종 답변(LLM) | **INFERRED** |
| foundation_http_service의 SIASIU code-level 출처 | **증거 부족**(spec 기반으로 결론) |
| "따가" 변형 normalization | substring만(stemming 없음) — confirmed |

## next_train_recommendation (evidence 기반·우선순위)
1. **(P0) Foundation Answer-Type Classifier + Category Disambiguation from SIASIU** — answer_type taxonomy(routine 포함)·category-word 격리·substring-safe matcher·default-to-education·adverse(따가) 승격. **남은 6 gap 중 5·6·7·8 직접 해결.** core additive(contract 변경 전 가능). ★structured, 케이스별 if 아님.
2. **(P1) Foundation Retrieval/Evidence Timing Policy from SIASIU** — search_triggers need-gating + evidence grading/mode + candidate cap. 직전 sim의 candidate-injection 우회 근본 해결.
3. **(P1) Multi-turn Context Payload** — episode/memory_fact 원리 → history.
4. **(P2) Foundation Safety/Evidence Answer Policy + Guarded LLM Composer**(canonical §17).

우선순위 근거: ①이 현재 잔여 6 gap을 가장 많이 해결 · SIASIU에서 검증된 결정론 원리 · common brain core 소속 · contract 변경 전 internal additive 가능.

## no_change_assertions
코드 0 · Foundation 0 · SIASIU 0 · Cosmile 0 · FOUNDATION repo 0 · contract 0 · canonical 0 · memory write 0 · push 0. 본 audit report(md/json)만 생성. 임시 분석 스크립트 없음(read-only Read/grep + 워크플로 read-only Explore).
