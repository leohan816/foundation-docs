# Foundation Recommendation Evidence Policy v1 (투자자 대응)

> 대상 독자: 공동창업자 · 투자자 · 기술 리뷰어
> 한 줄 답: **"추천의 references는 무엇인가?"** → 추천은 단 하나의 출처가 아니라, **5개 층(layer)을 함께 보는 layered evidence system**이고, 모든 추천은 출처·점수·판정모드까지 추적(traceable)된다. **최종 판정은 LLM이 아니라 규칙과 점수가 한다.**

이 문서는 설계서다. 모든 수치·enum·임계값은 추상적 슬로건이 아니라 실제 구현 모듈
(`app/recommendation_evidence.py`, `app/source_policy.py`, `app/confidence_model.py`, `app/answer_provenance.py`)
의 상수를 그대로 옮긴 것이다. 문서 끝에 구현 파일·테스트 위치를 명시한다.

---

## 0. 왜 이 문서가 필요한가 (투자자 질문에 답하기)

투자자/공동창업자가 가장 자주 던지는 질문은 다음 세 가지다.

| 질문 | 짧은 답 | 근거(이 문서의 섹션) |
|---|---|---|
| "추천의 reference가 뭐냐? 그냥 LLM이 지어낸 거 아니냐?" | LLM은 후보·표현 생성자일 뿐, 판정은 규칙+점수. 모든 추천에 references 리스트가 붙는다. | §1, §9, §10 |
| "건강/임산부 같은 민감한 걸 어떻게 책임지냐?" | claim type별로 허용 source가 다르고, 안전 claim은 Tier1(규제/논문/안전DB) 없이는 확정 불가. 안전 경계가 깨지면 무조건 강등. | §3, §6, §8 |
| "유행 성분 마케팅에 휘둘리지 않느냐?" | 트렌드 source와 안전 source를 물리적으로 분리. 트렌드 신뢰도가 아무리 높아도 안전이 미충족이면 추천을 강등/차단. | §6, §8 |

핵심 철학(제품 전체에 관통):

1. DeepSeek(LLM)는 **후보 생성자·표현 생성자·요약자**이지 지식의 final judge가 아니다.
2. Opus는 Leo가 승인한 판단 규칙에 따라 출처 기반으로 케이스를 심사하는 **자동 reviewer**다.
3. Leo는 개별 지식이 아니라 **지식 정책과 판단 규칙**을 승인하는 system builder다.
4. learned knowledge는 canonical knowledge와 분리한다.
5. 지식은 문서가 아니라 **claim 단위**로 쪼갠다.
6. 모든 learned claim은 source · evidence score · confidence score · review status · recheck cycle을 가진다.
7. 불확실해도 반복질문 가치가 있으면 `cautious`/`uncertain`으로 저장한다(버리지 않는다).
8. 강한 claim일수록 더 높은 evidence + 더 짧은 recheck cycle.
9. 충돌은 삭제하지 않고 conflict/history로 남긴다.
10. source type 적합성은 claim type에 따라 다르다(건강을 뉴스로 확정 ❌, 트렌드를 논문으로 판단 ❌).

---

## 1. 추천은 단일 reference가 아니라 layered evidence system

하나의 추천(`build_recommendation`)은 **여러 evidence_item을 묶은 구조물**이다. 구현은
결과 객체에 `"uses_single_reference": False`를 **상수로 박아** 두 가지를 보증한다.

- 추천은 절대 단 하나의 출처에 의존하지 않는다.
- 각 evidence_item은 자기 층(layer)·claim_type·source_types·점수·판정모드를 모두 들고 다닌다.

`evidence_item(...)` 1건이 담는 메타(실제 반환 키):

| 키 | 의미 |
|---|---|
| `layer` | 5개 층 중 하나 (§2) |
| `claim_type` | 21종 claim 분류 (§3) |
| `source_types`, `source_urls`, `tiers` | 출처 유형·URL·Tier 집합 |
| `brand_claim`, `objective_evidence` | 브랜드 주장 ↔ 객관 근거 분리 플래그 (§5) |
| `confidence`, `scores` | 최종 confidence + 6개 세부 점수 (§4) |
| `routing_ok`, `routing_reason` | claim_type×source 적합성 통과 여부 (§3) |
| `answer_mode` | 이 item 단독 판정모드 (§7) |
| `is_trend`, `is_safety` | 트렌드/안전 source 분리 플래그 (§6) |

> 결론: "reference 하나 보여줘"가 아니라 "이 추천을 떠받치는 **층·출처·점수의 묶음**을 통째로 보여줘"가 가능한 구조다.

---

## 2. 5개 층(layer)을 함께 본다

`LAYERS = ("user_context", "ingredient_evidence", "product_data", "safety_boundary", "dynamic_context")`

| 층 | 역할 | 검증 대상인가? | 예시 source/claim |
|---|---|---|---|
| `user_context` | 사용자 상태(피부타입·상황) — 추천의 입력 조건 | **아니오** (신뢰도 판정 대상 아님) | 건성, 임신여부 등 |
| `ingredient_evidence` | 성분의 효능/안전 근거 | 예 (claim-bearing) | `academic_paper`, `safety_db` |
| `product_data` | 제품 사실(성분표·표시사항) | 예 (claim-bearing) | `brand_official`, `package_label` |
| `safety_boundary` | 안전 경계(금기·임산부·청소년 등) | 예 (claim-bearing, 최우선) | `regulatory`, `clinical_study` |
| `dynamic_context` | 시점 의존 정보(트렌드·날씨·가격) | 보조 | `platform_data`, `weather_api` |

핵심 설계 결정:

- **최종 판정모드는 "검증 대상 claim을 담는 층"에서만 산정한다.**
  구현 상수 `claim_bearing = ("ingredient_evidence", "product_data", "safety_boundary")`.
  즉 사용자 상태(`user_context`)나 시점 정보(`dynamic_context`)는 그 자체로 "효능이 사실이다"의 신뢰도를 끌어올리지 못한다.
- 결과 객체는 어떤 층이 실제로 채워졌는지 `layers_present`로 노출한다.

---

## 3. claim type별 source hierarchy (routing 규칙)

source 적합성은 claim type에 따라 다르다(철학 10). `source_policy.py`가 이를 **결정론적 규칙**으로 고정한다.

### 3.1 Source Tier (출처 등급)

| Tier | 구성 source_types | 성격 |
|---|---|---|
| **Tier1** | `regulatory`, `pharmacopeia`, `academic_paper`, `clinical_study`, `professional_org`, `safety_db` | 규제·학술·안전DB. 안전/의학 확정의 유일 근거 |
| **Tier2** | `brand_official`, `manufacturer`, `package_label`, `official_mall` | 제품 사실. 브랜드 주장 포함(객관근거 아님) |
| **Tier3** | `news`, `commerce`, `blog`, `youtube`, `influencer`, `social`, `platform_data`, `search_data` | 트렌드·여론. 단독 확정 불가 |

### 3.2 claim type(21종) 대표 routing 정책

`POLICY[claim_type]` 발췌 — required(반드시 있어야 하는 강한 출처) / disallowed(확정 금지 출처) / 최소품질 / 최소confidence / 기본모드 / recheck:

| claim_type | required(강한 출처) | disallowed(확정 금지) | min_quality | min_conf | 기본 mode | recheck |
|---|---|---|---|---|---|---|
| `ingredient_identity` | regulatory/academic/safety_db/brand/label | social | 60 | 60 | grounded | 180d |
| `product_ingredient_list` | brand_official/package_label/official_mall | blog,youtube,social,news | 65 | 60 | grounded | 90d |
| `proprietary_ingredient_claim` | brand_official | social | 50 | 50 | cautious | 90d |
| `cosmetic_function` | academic/clinical/safety_db/prof_org | youtube,social,blog | 60 | 60 | grounded | 90d |
| `cosmetic_safety` | regulatory/safety_db/academic | blog,youtube,influencer,social,commerce | 75 | 70 | cautious | 90d |
| `pregnancy_lactation_safety` | regulatory/clinical/prof_org (**Tier1만**) | brand,manufacturer,mall,commerce,blog,youtube,influencer,social,news | **85** | **80** | cautious | **30d** |
| `teen_safety` | regulatory/clinical/prof_org | commerce,blog,youtube,influencer,social | 80 | 75 | cautious | 90d |
| `medical_claim` | academic/clinical/prof_org/regulatory | news,blog,youtube,influencer,social,commerce,brand_official | 85 | 80 | cautious | 90d |
| `supplement_dosage` | regulatory/academic/prof_org | blog,youtube,influencer,social,commerce | 80 | 75 | cautious | 90d |
| `market_trend` | platform_data/search_data/news/commerce | **academic_paper** | 40 | 40 | grounded | 30d |
| `breaking_news` | news (필드: source,published_at,event_time,region) | blog,social | 50 | 45 | grounded | on_new_evidence |
| `regulation` | regulatory (필드: source,published_at,region) | blog,youtube,social,commerce | 90 | 85 | grounded | 90d |
| `influencer_trend` | platform_data/social/influencer | **academic_paper** | 35 | 35 | cautious | 30d |

> 두 가지 대칭에 주목: **건강/안전 claim은 트렌드 출처(blog·youtube·social·commerce)를 disallow** 하고, **트렌드 claim은 academic_paper를 disallow** 한다. "건강을 뉴스로 확정 ❌, 트렌드를 논문으로 판단 ❌"가 정책 데이터에 그대로 박혀 있다.

### 3.3 확정 가능 여부 판정: `can_confirm()`

`can_confirm(claim_type, source_types, fields)` 반환 `{ok, reason, blocking}`. 규칙:

1. `disallowed` 출처 제외 후, `allowed ∪ required`에 드는 출처가 **1개 이상** 있어야 한다(없으면 `no_allowed_source`).
2. **고위험 claim**(`HIGH_RISK_CLAIMS` = `cosmetic_safety`, `pregnancy_lactation_safety`, `teen_safety`, `medical_claim`, `functional_medicine_claim`, `supplement_dosage`, `aesthetic_procedure`, `regulation`)은 `required`(강한 출처) 중 하나가 반드시 있어야 한다(없으면 `missing_required_source`).
3. 필수 필드(뉴스 `published_at`·날씨 `region/time` 등)가 빠지면 `missing_fields:...`.
4. `auto_promote_allowed`는 **모든 정책에서 False** — 자동 승급 없음, 사람(정책) 검수가 전제.

---

## 4. source quality + claim confidence score 계산

`confidence_model.score_claim()`은 6개 세부 점수를 계산하고 가중 결합한다.

### 4.1 세부 점수(0–100)

| 점수 | 계산 근거 | 핵심 규칙 |
|---|---|---|
| `source_quality_score` | `SOURCE_QUALITY`의 출처별 기본 신뢰도 중 **최댓값** | regulatory 95 / academic 90 / brand 70 / news 50 / blog·youtube·influencer 30 / social 25 |
| `claim_support_score` | 지지비율 × 강도 | n_supporting / n_total × 100 |
| `domain_fit_score` | 출처×claim그룹 적합도(`_FIT`)의 최댓값 | 뉴스×의학=22, 논문×트렌드=15 처럼 "안 맞는 조합"은 낮게 |
| `source_diversity_score` | `min(100, 25×고유출처수 + 25×(tier수−1))` | 단일 출처는 낮음 |
| `freshness_score` | claim 그룹별 신선도 | 동적/트렌드/뉴스는 급락(>30일=25, >30일초과=5), 과학/사실은 완만(≤1년=90) |
| `conflict_penalty` | `min(60, 20×충돌수)` | 충돌은 점수 차감(삭제 아님 → §9) |

### 4.2 최종 confidence (가중 결합)

```
final = 0.30·quality + 0.25·support + 0.20·domain_fit + 0.15·diversity + 0.10·freshness − conflict_penalty
        (0–100으로 clamp)
```

| 가중치 | 항목 | 의미 |
|---|---|---|
| 0.30 | source_quality | "누가 말했나"가 가장 큼 |
| 0.25 | claim_support | "근거가 실제로 뒷받침하나" |
| 0.20 | domain_fit | "그 출처가 그 주제에 적합한가" |
| 0.15 | source_diversity | "여러 독립 출처가 모이나" |
| 0.10 | freshness | "얼마나 최신인가" |
| (−) | conflict_penalty | 충돌 시 차감 |

> 투자자 포인트: confidence는 LLM의 "느낌"이 아니라 **위 6개 측정값의 결정론적 가중합**이다. 같은 입력이면 항상 같은 점수가 나온다(재현성·감사 가능).

---

## 5. 브랜드 claim ↔ 객관 evidence 분리

브랜드가 자기 제품을 좋다고 말하는 것(`brand_claim=True`)과, 독립적 근거(`objective_evidence`)는 **다른 범주**로 다룬다.

- `objective_evidence`로 인정되는 조건(코드 그대로):
  `objective = (not brand_claim) and has_tier1`
  즉 **브랜드 주장이 아니고 + Tier1(규제/논문/안전DB) 근거가 존재**해야 객관 근거다.
- `build_recommendation` 결과는 둘을 별도 리스트로 노출:
  `brand_claims`, `objective_evidence`, 그리고 `brand_vs_objective_separated: True`.

| 입력 | brand_claim | has_tier1 | objective_evidence |
|---|---|---|---|
| 브랜드몰의 "우리 성분 최고" | True | (무관) | **False** |
| 논문 기반 효능 근거 | False | True | **True** |
| 블로그 후기 | False | False | False |

> 결과: 제품 페이지 마케팅 문구가 추천의 "객관 근거"로 둔갑하지 못한다. 브랜드 주장은 보여주되, 신뢰의 무게는 객관 근거에만 싣는다.

---

## 6. 시장 트렌드 source ↔ 의학/안전 source 분리

두 종류의 evidence는 섞이지 않도록 **태그로 물리 분리**한다.

- 트렌드: `_TREND_CLAIMS = ("market_trend", "breaking_news", "influencer_trend")` → item `is_trend`
- 안전: `_SAFETY_CLAIMS = ("cosmetic_safety", "pregnancy_lactation_safety", "teen_safety", "medical_claim", "supplement_dosage")` → item `is_safety`

`build_recommendation` 결과:

| 키 | 내용 |
|---|---|
| `trend_sources` | is_trend인 item 목록 |
| `safety_sources` | is_safety인 item 목록 |
| `trend_vs_safety_separated` | 항상 `True` |

추가로 §3의 routing 정책이 이를 이중으로 보강한다: 트렌드 claim은 `academic_paper`를 disallow, 안전 claim은 트렌드 출처(blog/youtube/social/commerce)를 disallow. **"유행이라서 안전하다"는 논리 경로 자체가 막혀 있다.**

---

## 7. 최종 답변은 answer_mode에 따라 달라진다

`ANSWER_MODE = ("assertive", "grounded", "cautious", "uncertain", "cannot_determine")`
내부 서열(`_MODE_RANK`): `cannot_determine 0 < uncertain 1 < cautious 2 < grounded 3 < assertive 4`.

### 7.1 단일 item의 mode 결정 (`confidence_model.answer_mode`)

| 조건 | 결과 mode |
|---|---|
| `final < 30` | `cannot_determine` |
| `30 ≤ final < min_conf(정책값)` | `uncertain` |
| **고위험 claim** & Tier1 있음 & `final ≥ 85` | `grounded` (assertive 절대 불가) |
| **고위험 claim** & 그 외 | `cautious` |
| 일반 claim & `final ≥ 85` | `assertive` |
| 일반 claim & `70 ≤ final < 85` | `grounded` |
| 일반 claim & `50 ≤ final < 70` | `cautious` |
| 그 외 | `uncertain` |

`HIGH_RISK`(confidence_model) = `pregnancy_lactation_safety`, `teen_safety`, `medical_claim`, `functional_medicine_claim`, `supplement_dosage`, `cosmetic_safety` — **이들은 점수가 아무리 높아도 assertive 금지**.

### 7.2 추천 전체의 mode

여러 claim-bearing item의 mode 중 **가장 보수적인 값**을 택한다(`_most_conservative` = 최솟값). 즉 가장 약한 고리가 전체 신뢰도를 정한다.

### 7.3 mode → 사용자 추임새 (`answer_provenance.select_phrase`)

mode와 source_layer(여기선 `learned`)에 따라 자연어 추임새가 달라진다. 예:

| mode | 예시 추임새(learned) |
|---|---|
| grounded | "제가 조사해 정리한 근거에 따르면" |
| cautious | "현재 수집·검토된 자료 기준으로는" |
| uncertain | "아직 결론이 완전히 고정된 주제는 아니지만 현재 자료를 기준으로 정리하면" |
| cannot_determine | "현재 확인한 자료만으로는 단정하기 어렵습니다" |

`FORBIDDEN_PHRASES`("저장된 검증 지식" 등)는 시스템 내부를 노출하거나 과신을 주므로 **출력에서 차단**된다.

---

## 8. 안전 경계가 깨지면 트렌드 신뢰도 높아도 강등

가장 중요한 안전장치. `build_recommendation`의 동작 순서:

1. `safety_sources`를 순회하며, 다음 중 하나라도 있으면 **안전 경계 깨짐**(`safety_ok = False`):
   - routing 실패(`routing_ok == False`),
   - item mode가 `cannot_determine`,
   - `value == "unsafe"`.
2. 안전 경계가 깨졌는데 최종 mode가 `cautious`보다 높으면 → **무조건 `cautious`로 강등**.
   (코드: `if not safety_ok and _MODE_RANK[final_mode] > _MODE_RANK["cautious"]: final_mode = "cautious"`)
3. 안전 evidence가 `value == "unsafe"`를 단정하면 → `can_recommend = False`, `final_mode = "cannot_determine"` (추천 차단).
4. 추천 가능 조건: `can_recommend = safety_ok and final_mode != "cannot_determine"`.

| 시나리오 | 트렌드 신뢰도 | 안전 상태 | 최종 mode | 추천 |
|---|---|---|---|---|
| 유행 성분, 임산부 안전을 blog로만 → routing 실패 | 매우 높음 | 깨짐 | `cautious` 이하 | 강등 |
| 임산부 금기(regulatory, value=unsafe) | — | unsafe | `cannot_determine` | **차단** |
| 정상: 객관 성분근거 + 제품데이터 + 안전 통과 | — | OK | assertive/grounded/cautious | 가능 |

> 투자자 한 줄: **"바이럴이라서 추천"은 구조적으로 불가능하다.** 안전이 미충족이면 마케팅 신호가 아무리 강해도 답변 신뢰도를 끌어내린다.

---

## 9. 모든 추천은 traceable (references 리스트)

`build_recommendation`은 모든 item을 `references` 리스트로 평탄화해 반환한다. 각 reference 엔트리:

| 필드 | 내용 |
|---|---|
| `layer` | 어느 층의 근거인가 |
| `claim_type` | 어떤 주장인가 |
| `source_types` / `source_urls` | 출처 유형 / 실제 URL |
| `tiers` | 출처 Tier 집합 |
| `confidence` | 그 근거의 최종 confidence |
| `brand_claim` / `objective_evidence` | 브랜드 주장/객관 근거 구분 |
| `routing_ok` | claim×source 적합성 통과 여부 |

추가 보증:

- `traceable: all("source_types" in r for r in references)` — 출처 없는 근거는 references에 못 들어간다.
- `aggregate_confidence` = item confidence 평균(반올림).
- 충돌은 점수에서 차감(`conflict_penalty`)하되 **근거를 삭제하지 않는다**(철학 9: conflict/history 보존).

> 어떤 추천이든 "왜 이렇게 답했나"를 층·출처·점수·판정모드까지 역추적할 수 있다. 이것이 감사(audit) 가능성이고, 투자자가 신뢰할 수 있는 근거다.

---

## 10. ★LLM은 final judge가 아니다

가장 중요한 불변식. 구현에 **상수로** 박혀 있다.

- `recommendation_evidence.LLM_IS_FINAL_JUDGE = False` (주석: "★불변: LLM은 표현/요약 생성자일 뿐, 판정은 규칙+점수")
- 모든 추천 결과 객체는 `llm_is_final_judge: False`를 노출한다.

역할 분리:

| 행위자 | 역할 | 할 수 있는 것 | 할 수 없는 것 |
|---|---|---|---|
| DeepSeek (LLM) | 후보·표현·요약 생성자 | 후보 claim 제안, 자연어 표현 | 단독 확정, canonical write |
| Opus | 자동 reviewer | 승인된 규칙으로 케이스 대량 심사 | 정책 자체 변경 |
| 규칙+점수(이 시스템) | **final judge** | confidence·routing·answer_mode 판정 | — |
| Leo | system builder | 정책·판단 규칙 승인 | (개별 지식을 일일이 손보지 않음) |

보안·운영 불변식(이 정책이 강제):

- canonical write 금지 (learned와 분리, 철학 4).
- DeepSeek 단독 확정 금지 (`can_confirm`은 source 규칙으로만, `auto_promote_allowed` 전부 False).
- health/pregnancy 자동 확정 금지 (`pregnancy_lactation_safety` min_conf 80·Tier1 필수·assertive 금지·recheck 30d).
- 키/secret 미출력.

---

## 부록 A. 점수·정책 상수 빠른 참조

- **층**: `user_context`, `ingredient_evidence`, `product_data`, `safety_boundary`, `dynamic_context`
- **claim-bearing 층**: `ingredient_evidence`, `product_data`, `safety_boundary`
- **answer_mode 서열**: cannot_determine(0) < uncertain(1) < cautious(2) < grounded(3) < assertive(4)
- **mode 임계값**: <30 → cannot_determine, <min_conf → uncertain, ≥85 → assertive(일반), ≥70 → grounded, ≥50 → cautious
- **confidence 가중치**: quality .30 / support .25 / domain_fit .20 / diversity .15 / freshness .10 − conflict
- **recheck 종류**: `stable`, `recheck_30d`, `recheck_90d`, `recheck_180d`, `recheck_on_new_evidence`
- **출처 품질 상한선 예시**: regulatory 95, pharmacopeia 92, academic 90, clinical 88, safety_db 88, brand 70, news 50, blog/youtube/influencer 30, social 25

---

## 구현 파일 (Implementation)

| 모듈 | 경로 | 책임 |
|---|---|---|
| 추천 조립 | `/home/leo/Project/SIASIU/app/recommendation_evidence.py` | layered evidence → traceable recommendation, 안전 강등, LLM≠judge 불변식 |
| source routing | `/home/leo/Project/SIASIU/app/source_policy.py` | claim_type별 허용/금지 출처, Tier, `can_confirm`, HIGH_RISK |
| confidence model | `/home/leo/Project/SIASIU/app/confidence_model.py` | 6개 세부 점수, 가중 결합, `answer_mode`, `recheck_cycle` |
| answer provenance | `/home/leo/Project/SIASIU/app/answer_provenance.py` | mode×layer 추임새, 금지표현 차단, 내부 trace |

## 테스트 (Tests)

| 테스트 | 경로 | 검증 항목 |
|---|---|---|
| 추천 evidence 정책 | `/home/leo/Project/SIASIU/app/tests/test_recommendation_evidence.py` | 5개 층 / 단일 reference 아님 / traceable / 브랜드↔객관 분리 / 트렌드↔안전 분리 / 안전 강등 / unsafe 차단 / `llm_is_final_judge=False` / 금지표현 없음 |
| evidence grading | `/home/leo/Project/SIASIU/app/tests/test_evidence_grading.py` | source quality·confidence·routing 채점 |

실행:

```bash
python3 /home/leo/Project/SIASIU/app/tests/test_recommendation_evidence.py
python3 /home/leo/Project/SIASIU/app/tests/test_evidence_grading.py
```

---

_Foundation Knowledge Learning System · Recommendation Evidence Policy v1 · 문서의 모든 수치는 위 구현 모듈 상수에서 인용. 정책 변경은 코드 상수 변경 + 테스트 갱신을 통해서만 이뤄진다._
