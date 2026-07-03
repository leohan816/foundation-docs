# Foundation Knowledge Learning System v1 — 총괄 설계

> 문서 버전: v1
> 대상 독자: 공동창업자 · 투자자 · 엔지니어
> 범위: learned 지식의 입력 → 분류 → 출처 라우팅 → 점수화 → 후보화 → 정책 심사 → 재검증까지의 전체 파이프라인과 정책
> 구현 기준 모듈: `app/learned_taxonomy.py` · `app/source_policy.py` · `app/confidence_model.py` · `app/answer_provenance.py` · `app/knowledge_input.py` · `app/recommendation_evidence.py`

---

## 1. Executive Summary

Foundation Knowledge Learning System(이하 FKLS)은 "AI가 새로 학습한 지식을 어떻게 **믿을 만한 자산으로 축적**하는가"라는 질문에 대한 시스템 차원의 답이다. 핵심은 **누가 무엇을 판정하는가**를 분리한 거버넌스다.

- **DeepSeek**는 후보 생성자·표현 생성자·요약자다. 지식의 final judge가 **아니다**. (`recommendation_evidence.LLM_IS_FINAL_JUDGE = False`)
- **Opus**는 Leo가 승인한 판단 규칙에 따라 **출처 기반으로 케이스를 대량 심사하는 자동 reviewer**다.
- **Leo**는 개별 지식을 손으로 검수하지 않는다. **지식 정책과 판단 규칙(taxonomy·source routing·confidence 가중치·answer_mode 임계값)을 승인하는 system builder**다.

지식은 문서가 아니라 **claim/card 단위**로 쪼개진다. 모든 learned claim은 `source`·`evidence score`·`confidence score`·`answer_mode`·`merge_result`·`recheck_cycle`을 가지며, 기존 canonical 지식과 **물리적으로 분리된 learned layer**에 후보(candidate) 상태로 저장된다. 자동 승격은 없다(`promotion_ready=False`, `canonical_write=False`).

이 설계의 상업적 의미는 분명하다. 우리는 "사람이 모든 답을 검수하는 비용"과 "검수 없이 AI를 신뢰하는 위험" 사이의 거짓 양자택일을 **규칙을 승인하면 케이스는 자동 심사된다**는 구조로 깬다. 강한 claim일수록 더 높은 evidence를 요구하고 더 짧은 주기로 재검증하며, 건강·임신·수유 같은 최고위험 영역은 코드 레벨에서 자동 확정이 봉인된다.

---

## 2. System Builder 원칙 — 세 주체의 역할 분리

| 주체 | 역할 | 권한 | 금지(코드 레벨 불변식) |
|---|---|---|---|
| **DeepSeek** | 후보/표현/요약 생성자 | claim 초안 표현, 문장 분할 제안, 요약 | 단독 확정 ❌ · canonical write ❌ · final judge ❌ |
| **Opus** | 자동 reviewer | Leo 승인 규칙에 따라 출처 기반 대량 심사, answer_mode 산정 | 규칙 밖 임의 판정 ❌ · 정책 변경 ❌ |
| **Leo** | system builder | taxonomy/policy/가중치/임계값 **정책** 승인 | 개별 claim 수기 검수는 일상 운영 대상 아님 |

핵심 철학은 코드에 상수로 박혀 있다. `recommendation_evidence.py`의 `LLM_IS_FINAL_JUDGE = False`는 주석으로 "LLM은 표현/요약 생성자일 뿐, 판정은 규칙+점수"임을 못 박는다. 실제 판정은 결정론 함수(`source_policy.can_confirm`, `confidence_model.score_claim`, `confidence_model.answer_mode`)가 수행한다.

즉 **DeepSeek는 "무엇을 말할 수 있는가"를 제안**하고, **Opus는 Leo의 규칙으로 "그것을 확정해도 되는가"를 심사**하며, **Leo는 "그 규칙 자체가 옳은가"를 승인**한다. 세 층위는 서로의 권한을 침범하지 않는다.

---

## 3. learned layer가 canonical과 분리되는 이유와 방식

### 왜 분리하는가
canonical 지식(검증 완료·제품 추천의 근간)에 학습 결과를 직접 섞으면, 단 한 건의 오학습이 **검증된 자산 전체의 신뢰도를 오염**시킨다. 따라서 learned는 별도 layer에 **후보**로만 적재되고, canonical로의 이동은 정책 심사를 통과한 경우에만 일어난다.

### 어떻게 분리하는가 — 거버넌스 불변식
`knowledge_input.make_learned_candidate()`가 생성하는 모든 candidate는 다음 필드를 강제한다.

| 필드 | 고정값 | 의미 |
|---|---|---|
| `layer` | `"learned"` | canonical과 물리 분리 |
| `status` | `"candidate"` | 후보 상태(확정 아님) |
| `promotion_ready` | `False` | 자동 승격 금지 |
| `reviewed_by` | `None` | 아직 심사 전 |
| `canonical_write` | `False` | canonical 쓰기 금지 |
| `index_default` | `False` | 기본 색인 비활성 |

`learned_taxonomy.py`는 learned 지식의 색인 정책을 `INDEXING = ("learned_index", "learned_index_lowrank", "dynamic_only", "raw_only", "no_index")`로 분리해 둔다. 고위험 도메인(건강/임신)은 `learned_index_lowrank`로 **검색 가중치를 낮춰** 표면화되지 않게 하고, 사업/메타 정보는 `no_index`로 색인에서 제외한다.

---

## 4. claim/card 단위 지식 모델

지식은 문서가 아니라 **카드(claim)** 단위다. `learned_taxonomy.CARD_TYPES`는 15종의 최소 단위를 정의한다.

```
ingredient_card · ingredient_claim_card · proprietary_ingredient_card ·
product_card · product_claim_card · safety_card · routine_card ·
health_claim_card · supplement_card · procedure_card · trend_card ·
brand_card · regulation_card · dynamic_context_card · source_card
```

### learned taxonomy — 14개 최상위 카테고리
각 카테고리는 `purpose · examples · allowed_card_types · default_source_policy · risk_level · default_recheck_cycle · indexing_policy · answer_mode_default`를 가진다(`validate_taxonomy()`가 필수 키·enum 불변식 검증).

| 카테고리 | risk | 기본 source policy | recheck | indexing | answer_mode |
|---|---|---|---|---|---|
| `beauty` | low | consumer_perception | recheck_180d | learned_index | grounded |
| `skin` | medium | cosmetic_evidence | recheck_90d | learned_index | grounded |
| `cosmetics` (주력) | medium | cosmetic_evidence | recheck_90d | learned_index | grounded |
| `hair_body` | medium | cosmetic_evidence | recheck_90d | learned_index | grounded |
| `aesthetic_medicine` | high | clinical_evidence | recheck_90d | learned_index | cautious |
| `wellness_health` | high | health_evidence | recheck_90d | learned_index_lowrank | cautious |
| `functional_medicine` | high | health_evidence | recheck_90d | learned_index_lowrank | cautious |
| `nutrition_supplements` | high | health_evidence | recheck_90d | learned_index_lowrank | cautious |
| `women_life_stage` (최고위험) | **critical** | high_trust_health | **recheck_30d** | learned_index_lowrank | cautious |
| `market_trends` | low | trend_signal | recheck_30d | learned_index_lowrank | grounded |
| `brands_products` | medium | brand_fact | recheck_90d | learned_index | grounded |
| `business_commerce` | medium | business_internal | recheck_90d | no_index | cautious |
| `dynamic_context` | medium | dynamic_signal | recheck_on_new_evidence | dynamic_only | grounded |
| `source_registry` | low | meta | stable | no_index | grounded |

taxonomy는 **확장형**이다(`add_category()`로 신규 카테고리 추가 가능). 주력 도메인 `cosmetics`는 10개 하위 카테고리(`COSMETICS_SUB`: ingredients · proprietary_ingredients · ingredient_claims · product_claims · safety · formulations · textures · routines · products · brands)를 가진다.

### proprietary ingredient — 브랜드 claim ≠ 독립 근거 분리
Pro-Xylane · 波色因(Bose-in) · Pitera · TECA 같은 독점 성분은 전용 스키마(`PROPRIETARY_INGREDIENT_SCHEMA`)로 다룬다. 핵심은 `brand_claims`(마케팅 주장)와 `independent_evidence`(Tier1/학술 독립 근거)를 **별도 필드로 분리**하고, `evidence_separation: bool`을 **`True`로 고정**한다는 점이다. `make_proprietary_card()`는 항상 `evidence_separation=True`를 박아 넣는다.

---

## 5. 6개 모듈 아키텍처 개요

| 모듈 | 책임 | 핵심 상수/함수 |
|---|---|---|
| `learned_taxonomy.py` | learned 지식 분류 registry (canonical과 분리) | `TAXONOMY`(14) · `CARD_TYPES`(15) · `PROPRIETARY_INGREDIENT_SCHEMA` · `validate_taxonomy()` |
| `source_policy.py` | claim_type별 source routing(결정론) | `SOURCE_QUALITY` · `TIER1/2/3` · `CLAIM_TYPES`(21) · `POLICY` · `can_confirm()` |
| `confidence_model.py` | learned claim 점수화 | `SCORE_FIELDS`(7) · `domain_fit`(_FIT 행렬) · `score_claim()` · `answer_mode()` · `recheck_cycle()` |
| `answer_provenance.py` | source_layer/confidence별 추임새 + 내부 trace | `FORBIDDEN_PHRASES` · `SOURCE_LAYER` · `select_phrase()` · `compose()` |
| `knowledge_input.py` | 직접 입력 → learned candidate 파이프라인 | `INPUT_TYPES`(8) · `MERGE_RESULTS`(7) · `process()` · `merge_decision()` |
| `recommendation_evidence.py` | 추천의 references = layered evidence system | `LAYERS`(5) · `LLM_IS_FINAL_JUDGE=False` · `build_recommendation()` |

### 5.1 source_policy — 출처 적합성은 claim type에 따라 다르다 (원칙 10)
source는 3개 tier로 분류된다.

| Tier | 구성 | 대표 품질점수 |
|---|---|---|
| **Tier1** | regulatory(95) · pharmacopeia(92) · academic_paper(90) · clinical_study(88) · professional_org(85) · safety_db(88) | 85–95 |
| **Tier2** | brand_official(70) · manufacturer(70) · package_label(75) · official_mall(65) | 65–75 |
| **Tier3** | news(50) · platform_data(55) · search_data(50) · commerce(45) · blog(30) · youtube(30) · influencer(30) · social(25) | 25–55 |

`POLICY`는 21개 claim_type 각각에 `required_sources · allowed_sources · disallowed_sources · minimum_source_quality · minimum_claim_confidence · default_answer_mode · default_recheck_cycle · auto_promote_allowed · required_fields`를 정의한다. **모든 claim_type의 `auto_promote_allowed`는 `False`** — 사람 검수 없는 자동 승격은 정책상 존재하지 않는다.

claim_type별 적합/부적합의 핵심 예시:

| claim_type | required (강한 출처) | disallowed | min_quality / min_conf | 의미 |
|---|---|---|---|---|
| `pregnancy_lactation_safety` | regulatory · clinical_study · professional_org | brand/manufacturer/mall/commerce/blog/youtube/influencer/social/news | 85 / 80 | **브랜드·커머스만으론 확정 ❌** |
| `medical_claim` | academic_paper · clinical_study · professional_org · regulatory | news/blog/youtube/influencer/social/commerce/brand | 85 / 80 | **뉴스/블로그/유튜버만으론 확정 ❌** |
| `market_trend` | platform_data · search_data · news · commerce | **academic_paper** | 40 / 40 | **트렌드를 논문으로 판단 ❌** |
| `regulation` | regulatory | blog/youtube/social/commerce | 90 / 85 | 규제는 규제기관 출처 필수 |

`can_confirm(claim_type, source_types, fields)`의 결정론 규칙:
1. `disallowed` 제외 후 `allowed`에 든 출처가 **1개 이상** 있어야 함(없으면 `no_allowed_source`).
2. **고위험 claim**(`HIGH_RISK_CLAIMS` 8종: cosmetic_safety · pregnancy_lactation_safety · teen_safety · medical_claim · functional_medicine_claim · supplement_dosage · aesthetic_procedure · regulation)은 `required_sources`의 강한 출처가 **반드시 1개** 있어야 함(없으면 `missing_required_source`).
3. 필수 필드(예: breaking_news의 `published_at`·`event_time`·`region`, weather의 `region`·`time`)가 충족돼야 함(없으면 `missing_fields:...`).

### 5.2 confidence_model — 강한 claim일수록 높은 evidence (원칙 8)
`score_claim()`은 7개 점수를 산출한다(`SCORE_FIELDS`). 최종 confidence는 가중 결합 후 충돌 차감이다.

```
final = 0.30·source_quality + 0.25·claim_support + 0.20·domain_fit
      + 0.15·source_diversity + 0.10·freshness − conflict_penalty   (0–100 클램프)
```

| 점수 | 산식 요점 |
|---|---|
| `source_quality_score` | source_types 중 최대 `SOURCE_QUALITY` |
| `claim_support_score` | 지지비율 × 강도 (0–100) |
| `domain_fit_score` | (source_type × claim_group) 적합도 행렬 `_FIT`의 최대값 |
| `source_diversity_score` | `25 × 고유출처수 + 25 × (tier종류−1)` (단일 출처 = 낮음) |
| `freshness_score` | dynamic/trend/news는 급락(≤1일 100 → 30일 25 → 그 이상 5), science/fact/safety는 완만(≤1년 90) |
| `conflict_penalty` | `min(60, 20 × n_conflicts × severity)` |

`domain_fit`은 "출처가 좋아도 claim에 안 맞으면 낮다"를 구현한다. 예: `academic_paper × trend = 15`, `news × medical(science) = 22`, `platform_data × trend = 90`, `regulatory × regulation = 98`.

`answer_mode(final_score, claim_type, has_tier1)`의 판정:
- `final < min_conf` → `final < 30`이면 `cannot_determine`, 아니면 `uncertain`.
- **고위험**(`HIGH_RISK` 6종)은 **절대 `assertive` 금지**: `has_tier1` 그리고 `final ≥ 85`여야 `grounded`, 아니면 `cautious`.
- 일반: `≥85` assertive · `≥70` grounded · `≥50` cautious · 그 외 uncertain.

`recheck_cycle()`: 동적/속보/가격 → `recheck_on_new_evidence`, critical·임신 → `recheck_30d`, 고위험·high → `recheck_90d`, 트렌드 → `recheck_30d`, low → `recheck_180d`.

### 5.3 answer_provenance — 시스템 내부 비노출 + 추적성
사용자에게는 짧은 자연어 추임새만 노출하고, 내부 trace에 `source_layer · evidence_score · source_urls · reviewed_by · last_verified_at`를 남긴다. **금지 표현**(`FORBIDDEN_PHRASES`: "저장된 검증 지식" · "내 데이터베이스" · "DB에 저장된" · "학습된 지식에 따르면" 등)은 과신·내부노출을 유발하므로 `select_phrase()`가 안전장치로 걸러낸다. 추임새는 `answer_mode × source_layer`(canonical/learned/web_recent/dynamic/none) 조합으로 선택된다.

---

## 6. End-to-End 14단계 파이프라인

`knowledge_input.process()`가 오케스트레이션하는 입력→후보 흐름이다.

| # | 단계 | 함수/규칙 | 불변식 |
|---|---|---|---|
| 1 | raw 보존(intake) | `intake_raw()` | claim 아님. raw_only/pdf 등은 보존만으로 끝날 수 있음 |
| 2 | raw_only 분기 | `process()` early-stop | `raw_only`는 claim **미생성**(`raw_only_stop`) |
| 3 | source_card 생성 | `make_source_card()` | tier·quality 부여(`source_tier`) |
| 4 | claim 분할 | `split_claims()` | 문서를 claim 단위로(결정론 분할, ≥4자) |
| 5 | claim_type 분류 | `classify_claim_type()` | hint 우선 → 키워드 규칙(`_RULES`) → 기본 `cosmetic_function` |
| 6 | source routing 검증 | `route_validate()` → `sp.can_confirm()` | 이 출처로 이 claim 확정 가능한가 |
| 7 | 기존 지식 검색 | `search_existing()` | **candidate 생성 전 필수**(미주입 시 ValueError) |
| 8 | merge/conflict 판정 | `merge_decision()` | 충돌해도 **기존 삭제 ❌**(`keep_old=True`+history) |
| 9 | confidence 점수화 | `cm.score_claim()` | 7개 점수 + final(충돌 시 penalty) |
| 10 | answer_mode 결정 | `cm.answer_mode()` | 고위험은 assertive 봉인 |
| 11 | learned candidate 생성 | `make_learned_candidate()` | governance 6필드 강제(§3) |
| 12 | routing 실패 강등 | `process()` 후처리 | routing 불가인데 assertive/grounded면 → **cautious 강제** |
| 13 | 정책 심사(자동 reviewer) | Opus(규칙) / Leo(정책) | `promotion_ready=False`·`auto_promote=False` 유지 |
| 14 | recheck 등록·재검증 | `cm.recheck_cycle()` | 강한/고위험=짧은 주기, 동적=on_new_evidence |

7번 단계의 "기존 지식 검색 필수"는 코드로 강제된다 — `search_existing()`은 `existing_index`가 `None`이면 예외를 던진다("원칙: 기존 지식 검색 필수"). 12번에서 불확실하지만 반복질문 가치가 있으면(`uncertain_but_useful=True`) `cannot_determine`을 `uncertain`으로 승격 저장한다(원칙 7).

---

## 7. merge / conflict / update 정책 (원칙 9: 충돌해도 삭제 금지)

`knowledge_input.merge_decision()`은 신규 claim을 기존 매칭과 비교해 `MERGE_RESULTS` 7종 중 하나로 판정한다. **모든 결과에서 `keep_old=True`** — 기존 지식은 어떤 경우에도 삭제하지 않는다.

| 결과 | 조건 | 처리 |
|---|---|---|
| `new` | 기존 매칭 없음 | 신규 등록, history 없음 |
| `duplicate` | 값·방향 동일(`nv==ev and nd==ed`) | 중복, 보존만 |
| `enrich` | 새 근거가 더 높음(`ns > es`) | 보강, history 기록 |
| `supersede` | 새 근거가 훨씬 높음(`ns ≥ es + 25`) | 대체 후보, **기존 보존**+history |
| `obsolete` | 새 입력이 더 오래되고 값 다름(`nage > eage and nv != ev`) | 신규를 obsolete 표시 |
| `conflict` | 방향 상충 또는 oppose 값 충돌 | **삭제 ❌** → `keep_old=True` + history(`충돌 — 기존 보존·history 기록`) |
| `needs_review` | 자동 판정 불가 | 사람/정책 심사 큐로 |

충돌은 "둘 중 하나를 지우는" 사건이 아니라 **history로 누적되는 사건**이다. 이렇게 해야 시간에 따른 지식 변화와 출처 간 불일치를 추적할 수 있고, 잘못된 자동 삭제로 검증 자산을 잃지 않는다.

---

## 8. Dynamic Context 개요

날씨·UV·대기·지역·가격·재고·트렌드처럼 **freshness가 가치의 핵심**인 정보는 별도 취급한다. taxonomy의 `dynamic_context` 카테고리는 `indexing_policy=dynamic_only`, `default_recheck_cycle=recheck_on_new_evidence`, card type은 `dynamic_context_card`다.

- source_policy에서 `weather_dynamic_context`는 `weather_api`(품질 85)를 required로, `region`·`time` 필드를 필수로 요구한다. `price_stock_snapshot`은 `price_api`/`official_mall`/`commerce`를 쓰고 `time` 필드를 요구한다.
- confidence_model의 `freshness_score`는 dynamic/trend/news 그룹에서 매우 가파르다: **≤1일=100, ≤3일=80, ≤7일=55, ≤30일=25, 그 이상=5**("오래된 동적 context는 거의 무가치").
- `recheck_cycle`은 동적 claim에 대해 항상 `recheck_on_new_evidence`를 반환해, 정해진 날짜가 아니라 **새 신호가 들어올 때마다** 갱신한다.

---

## 9. Recommendation Evidence — "추천의 references는 무엇인가?"

`recommendation_evidence.py`는 투자자/공동창업자의 단골 질문("추천 근거가 뭐냐")에 답하는 골격이다. 핵심 주장: **추천은 단일 reference가 아니라 layered evidence system**이다(`uses_single_reference=False`).

추천은 5개 층(`LAYERS`)을 함께 본다.

| layer | 역할 | 신뢰도 판정 대상 |
|---|---|---|
| `user_context` | 사용자 상태/맥락 | 아니오(판정 대상 제외) |
| `ingredient_evidence` | 성분 효능·안전 근거 | 예 |
| `product_data` | 제품 사실(전성분/가격) | 예 |
| `safety_boundary` | 안전 경계 | 예(경계 깨지면 강등) |
| `dynamic_context` | 동적 신호 | 보조 |

`build_recommendation()`의 판정 로직:
- **최종 mode**는 `claim_bearing` 층(ingredient_evidence · product_data · safety_boundary)의 answer_mode 중 **가장 보수적인 값**(`_most_conservative`)으로 산정한다. user_context는 신뢰도 판정 대상이 아니다.
- **브랜드 claim ≠ 객관 evidence 분리**: `objective_evidence`는 "브랜드 주장이 아님 + Tier1 근거 존재"인 항목만(`brand_vs_objective_separated=True`).
- **트렌드 source ≠ 안전 source 분리**: `_TREND_CLAIMS`(market_trend · breaking_news · influencer_trend)와 `_SAFETY_CLAIMS`(cosmetic_safety · pregnancy_lactation_safety · teen_safety · medical_claim · supplement_dosage)를 별도 추적(`trend_vs_safety_separated=True`).
- **안전 경계 우선**: safety layer가 routing 실패·`cannot_determine`·`value=="unsafe"` 중 하나면 `safety_ok=False`. 이때 트렌드/효능 신뢰도가 아무리 높아도 최종 mode를 **cautious 이하로 강등**한다. 안전 evidence가 `unsafe`로 단정되면 `can_recommend=False`, mode=`cannot_determine`.
- 모든 추천은 **traceable**하다: `references`에 layer·claim_type·source_types·source_urls·tiers·confidence·brand_claim·objective_evidence·routing_ok가 담긴다. `llm_is_final_judge=False`가 결과에 명시된다.

이 구조 덕분에 "왜 이걸 추천했나"를 출처 단위로 역추적할 수 있고, 마케팅 주장과 객관 근거가 한 점수로 뭉개지지 않는다.

---

## 10. 남은 위험 · 다음 단계

### 남은 위험
1. **claim 분할의 결정론성**: `split_claims()`는 현재 문장부호/불릿 기반 결정론 분할이다. DeepSeek 표현 생성과 결합할 때 분할 경계가 claim 의미 단위와 어긋날 수 있다.
2. **classify_claim_type의 키워드 의존**: `_RULES`는 키워드 매칭이라 오분류(예: 비유적 "치료" 언급) 가능. hint·후속 검증으로 보완 필요.
3. **search_existing의 key 매칭**: 현재 정확 키 일치(`e["key"] == claim_key`) 기반이라, 의미 동등하지만 표면이 다른 중복을 놓칠 수 있음(의미 유사도 매칭 미도입).
4. **proprietary 독립 근거 수급**: `independent_evidence`(Tier1/학술) 공급이 실제로 얼마나 채워지느냐가 브랜드 claim 분리의 실효를 좌우한다.
5. **정책 심사 자동화 범위**: Opus 자동 reviewer의 케이스 처리량/일관성 모니터링 지표가 아직 명세화되지 않았다.

### 다음 단계
1. learned candidate → canonical 승격을 위한 **정책 심사 워크플로 구현**(Opus 자동 심사 결과 + Leo 정책 승인 게이트).
2. **의미 기반 기존 지식 검색**(임베딩) 도입으로 §6의 7단계 정확도 향상.
3. dynamic_context **freshness 재검증 스케줄러**(recheck_on_new_evidence 트리거) 연결.
4. recommendation_evidence를 실제 추천 API에 연결하고 `references` 노출 UX 설계.
5. taxonomy 확장(`add_category`) 시 정책값 일관성 검증 자동화(`validate_taxonomy` CI 게이트).

---

## 구현 파일

| 모듈 | 경로 |
|---|---|
| learned taxonomy | `/home/leo/Project/SIASIU/app/learned_taxonomy.py` |
| source routing policy | `/home/leo/Project/SIASIU/app/source_policy.py` |
| confidence model | `/home/leo/Project/SIASIU/app/confidence_model.py` |
| answer provenance | `/home/leo/Project/SIASIU/app/answer_provenance.py` |
| knowledge input pipeline | `/home/leo/Project/SIASIU/app/knowledge_input.py` |
| recommendation evidence | `/home/leo/Project/SIASIU/app/recommendation_evidence.py` |

## 테스트

| 테스트 | 경로 |
|---|---|
| taxonomy | `/home/leo/Project/SIASIU/app/tests/test_learned_taxonomy.py` |
| source policy | `/home/leo/Project/SIASIU/app/tests/test_source_policy.py` |
| confidence model | `/home/leo/Project/SIASIU/app/tests/test_confidence_model.py` |
| answer provenance | `/home/leo/Project/SIASIU/app/tests/test_answer_provenance.py` |
| knowledge input | `/home/leo/Project/SIASIU/app/tests/test_knowledge_input.py` |
| recommendation evidence | `/home/leo/Project/SIASIU/app/tests/test_recommendation_evidence.py` |
| learning candidate(거버넌스) | `/home/leo/Project/SIASIU/app/tests/test_learning_candidate.py` |
