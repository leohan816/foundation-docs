# Foundation Confidence Model v1

> learned claim 점수화의 결정론적 규칙. DeepSeek가 만든 후보(claim/card)를 **출처·근거 기반으로** 신뢰도화하고, 답변 태도(answer_mode)와 재검증 주기(recheck_cycle)까지 자동 도출한다.

## 0. 이 모델이 풀려는 문제 (공동창업자/투자자용 요약)

Foundation Knowledge Learning System은 세 역할이 분리되어 있다.

- **DeepSeek** = 후보 생성자·표현 생성자·요약자. 지식의 final judge가 **아니다**.
- **Opus** = Leo가 승인한 판단 규칙에 따라 출처 기반으로 케이스를 대량 심사하는 자동 reviewer.
- **Leo** = 개별 지식이 아니라 **지식 정책과 판단 규칙**을 승인하는 system builder.

이 문서가 정의하는 Confidence Model은 그 "판단 규칙"의 수치 엔진이다. 어떤 claim도 사람이 한 건씩 점수를 매기지 않는다. 대신 **출처 유형(source_type) × 주장 유형(claim_type)** 조합에 대해 결정론적으로 7개 점수를 계산하고, 그 결과로 "얼마나 단정해도 되는가(answer_mode)"와 "언제 다시 확인해야 하는가(recheck_cycle)"를 자동으로 정한다.

핵심 불변식(이 모델이 강제하는 안전 경계):

- 좋은 출처라도 claim_type에 안 맞으면 신뢰도가 떨어진다. (논문이라도 트렌드 판단에는 낮음, 뉴스라도 의료 확정에는 낮음 — `domain_fit`)
- 동적/트렌드 정보는 오래되면 급락한다. (`freshness`)
- 고위험(health/pregnancy/safety) claim은 점수가 아무리 높아도 **assertive(단정) 금지**. 최대 `grounded`.
- 충돌은 점수를 깎되 삭제하지 않는다(`conflict_penalty`). 이력은 conflict/history로 보존.
- 강한 claim일수록 더 높은 evidence를 요구하고 더 짧은 주기로 재검증한다(원칙 8).

learned knowledge는 canonical knowledge와 분리된 영역에서만 점수화되며, 이 모델은 **canonical write를 하지 않는다**. DeepSeek 단독 확정·health/pregnancy 자동 확정은 구조적으로 차단된다.

---

## 1. 7개 점수 정의

모든 점수는 0–100 정수(penalty 제외). 필드 상수는 코드의 `SCORE_FIELDS`와 1:1 대응한다.

| # | 점수 필드 | 의미 | 입력 | 범위 |
|---|-----------|------|------|------|
| 1 | `source_quality_score` | 출처 유형의 **일반 신뢰도**(claim_type 무관) | source_types | 0–100 |
| 2 | `claim_support_score` | 근거가 claim을 **얼마나 뒷받침**하나(지지비율×강도) | n_supporting / n_total, asserted_strength | 0–100 |
| 3 | `domain_fit_score` | 그 출처가 그 **claim 종류에 적합한가** | source_type × claim_type | 0–100 |
| 4 | `source_diversity_score` | 서로 다른 출처·tier가 **얼마나 다양한가** | source_types | 0–100 |
| 5 | `freshness_score` | 정보의 **신선도**(동적/트렌드일수록 결정적) | age_days × claim_type | 0–100 |
| 6 | `conflict_penalty` | 상충 근거에 대한 **감점**(음의 방향) | n_conflicts, severity | 0–60 |
| 7 | `final_confidence_score` | 1~5 가중합에서 6을 차감한 **최종 신뢰도** | 위 6개 | 0–100 |

### 1.1 source_quality_score
`source_quality_score(source_types)` = 주어진 출처들 중 **가장 높은** 일반 품질값(`max`). 출처가 없으면 0, 미정의 출처는 20점으로 처리한다.

```
return round(max(sp.SOURCE_QUALITY.get(s, 20) for s in source_types))
```

기준값(`source_policy.SOURCE_QUALITY`, 0–100):

| 출처 유형 | 품질 | Tier |
|-----------|------|------|
| regulatory | 95 | 1 |
| pharmacopeia | 92 | 1 |
| academic_paper | 90 | 1 |
| clinical_study | 88 | 1 |
| safety_db | 88 | 1 |
| professional_org | 85 | 1 |
| weather_api | 85 | 3 |
| package_label | 75 | 2 |
| price_api | 75 | 3 |
| brand_official | 70 | 2 |
| manufacturer | 70 | 2 |
| official_mall | 65 | 2 |
| platform_data | 55 | 3 |
| news | 50 | 3 |
| search_data | 50 | 3 |
| commerce | 45 | 3 |
| blog | 30 | 3 |
| youtube | 30 | 3 |
| influencer | 30 | 3 |
| social | 25 | 3 |
| unknown | 20 | 3 |

> 주: 품질은 "이 출처가 일반적으로 얼마나 믿을 만한가"이며, "이 claim에 적합한가"는 별도(§2 `domain_fit`)다. weather_api는 품질 85지만 날씨 같은 **동적** claim에만 적합하다.

### 1.2 claim_support_score
지지 근거 수 ÷ 평가된 전체 근거 수의 비율에, 주장 강도(`asserted_strength`, 상한 1.0)를 곱한다.

```
ratio = n_supporting / max(1, n_total_evaluated)
return round(min(100, ratio * 100 * min(1.0, asserted_strength)))
```

`n_total_evaluated`가 비어 있으면 `max(1, n_supporting)`으로 채워 단일 근거도 안전하게 처리한다. 예: 2/2 지지 → 100, 3/4 지지 → 75.

### 1.3 domain_fit_score
§2의 매트릭스 조회. `best_domain_fit`은 여러 출처 중 **최댓값**을 취한다. 미정의 조합은 25점(낮은 적합도).

### 1.4 source_diversity_score
서로 다른 출처 유형 수와 서로 다른 tier 수가 많을수록 올라간다. 단일 출처는 낮다.

```
base = min(100, 25 * len(uniq_source_types))
return round(min(100, base + 25 * (len(tiers) - 1)))
```

- 단일 출처(1종, 1 tier) → 25
- 같은 tier 2종 → 50
- 서로 다른 tier 2종 → 75
- 3종 이상이고 tier 다양 → 100 상한

### 1.5 freshness_score
§3 참조. 동적/트렌드/뉴스는 급락 곡선, 과학/사실/안전/규제는 완만 곡선. `age_days=None`이면 50(중립).

### 1.6 conflict_penalty
상충 근거 수에 비례한 감점. 충돌 1건당 20점, severity 가중, 상한 60.

```
return round(min(60, 20 * n_conflicts * severity))
```

충돌이 발견돼도 claim을 삭제하지 않는다(원칙 9). 점수만 깎고 conflict/history로 보존한다.

### 1.7 final_confidence_score
§5의 가중합에서 penalty 차감 후 0–100 clamp. 정수.

---

## 2. domain_fit 매트릭스 (source_type × claim_group)

claim_type은 먼저 **claim_group**으로 매핑된 뒤(`_CLAIM_GROUP`), source_type × group 표(`_FIT`)에서 적합도를 읽는다. 표에 없는 조합은 **25점**(낮음)으로 떨어진다 — "좋은 출처라도 안 맞으면 낮다"를 구조적으로 보장.

### 2.1 claim_type → claim_group 매핑 (`_CLAIM_GROUP`)

| claim_group | 포함되는 claim_type |
|-------------|----------------------|
| `science` | medical_claim, functional_medicine_claim, supplement_dosage, cosmetic_function, aesthetic_procedure, aftercare |
| `safety` | cosmetic_safety, pregnancy_lactation_safety, teen_safety |
| `fact` | ingredient_identity, inci_alias, business_partner_info, *(매핑 없는 claim_type 기본값)* |
| `product_fact` | product_ingredient_list, product_claim, proprietary_ingredient_claim |
| `regulation` | regulation |
| `trend` | market_trend, influencer_trend |
| `news` | breaking_news |
| `dynamic` | price_stock_snapshot, weather_dynamic_context |

### 2.2 적합도 표 (`_FIT`, 0–100)

빈칸 = 표에 미정의 → 조회 시 **25**(낮은 적합도)로 처리.

| source_type \ group | science | safety | fact | product_fact | regulation | trend | news | dynamic |
|---------------------|:------:|:------:|:----:|:------------:|:----------:|:-----:|:----:|:-------:|
| academic_paper | **95** | 85 | 70 | 40 | 70 | 15 | 20 | 10 |
| clinical_study | **92** | 85 | 65 | 40 | 65 | 15 | 20 | 10 |
| regulatory | 80 | 95 | 85 | 70 | **98** | 30 | 40 | 20 |
| professional_org | 85 | **88** | 70 | 45 | 80 | 25 | 30 | 15 |
| safety_db | 70 | **90** | 88 | 55 | 60 | 15 | 15 | 10 |
| brand_official | 40 | 25 | 70 | **85** | 40 | 45 | 30 | 20 |
| package_label | 30 | 30 | 80 | **88** | 45 | 20 | 15 | 10 |
| official_mall | 20 | 15 | 55 | **70** | – | 55 | 30 | 40 |
| news | 22 | 18 | 45 | 45 | 60 | 80 | **88** | 55 |
| platform_data | 15 | 10 | – | 50 | – | **90** | 60 | 80 |
| search_data | 15 | 10 | – | 45 | – | **85** | 55 | 70 |
| commerce | 15 | 12 | 40 | 55 | – | **70** | 35 | 45 |
| youtube | 18 | 10 | – | 35 | – | **65** | 40 | – |
| influencer | 12 | 8 | – | 35 | – | **70** | 40 | – |
| social | 10 | 8 | – | 30 | – | **68** | 38 | – |
| weather_api | – | – | – | – | – | 30 | – | **92** |
| price_api | – | – | – | 60 | – | 40 | – | **88** |

> `pharmacopeia`, `manufacturer`는 `_FIT`에 행이 없어 모든 group에서 25(기본값)로 평가된다. 이들의 강점은 `domain_fit`이 아니라 §6의 routing(can_confirm)에서 required_source로 작동한다.

읽는 법(굵게 표시 = 그 출처의 최적 용도):
- 논문/임상은 **science·safety**에서 압도적(95/92), **trend·news·dynamic**에서는 10–20대로 추락.
- 뉴스는 **news(88)·trend(80)**가 최고, **science(22)·safety(18)**는 매우 낮음 → "건강을 뉴스로 확정 ❌"(원칙 10)을 수치로 강제.
- platform_data/search_data는 **trend(90/85)·dynamic** 최강, science/safety는 10–15.
- brand_official/package_label은 **product_fact(85/88)**가 최강, science·safety는 25–40으로 제한 → "브랜드는 제품 사실은 강하지만 객관 효능/안전 확정은 제한적".

---

## 3. freshness 곡선 (동적/트렌드는 급락)

`freshness_score(age_days, claim_type)`는 claim_group에 따라 두 곡선 중 하나를 쓴다. `age_days=None`이면 50.

### 3.1 급락 곡선 — `dynamic` · `trend` · `news`

| 경과일(age_days) | freshness |
|------------------|:---------:|
| ≤ 1 | 100 |
| ≤ 3 | 80 |
| ≤ 7 | 55 |
| ≤ 30 | 25 |
| > 30 | **5** (거의 무가치) |

가격/날씨/속보/트렌드는 하루만 지나도 가치가 급감하고, 한 달이 넘으면 사실상 폐기 수준(5)이다.

### 3.2 완만 곡선 — `science` · `fact` · `safety` · `regulation`

| 경과일(age_days) | freshness |
|------------------|:---------:|
| ≤ 365 (1년) | 90 |
| ≤ 1095 (3년) | 70 |
| > 1095 | 50 |

성분 정체성·논문 근거·규제 사실은 시간이 지나도 천천히 감가한다(3년 지나도 50 유지).

---

## 4. conflict penalty

`conflict_penalty(n_conflicts, severity=1.0)`:

| 충돌 수 × severity | penalty | 비고 |
|--------------------|:-------:|------|
| 0 | 0 | 차감 없음 |
| 1 (severity 1.0) | 20 | |
| 2 (severity 1.0) | 40 | |
| 3+ 또는 고 severity | 60 (상한) | `min(60, 20*n*severity)` |

penalty는 final에서 빼는 음의 점수다. 충돌이 있어도 **claim을 삭제하지 않고**(원칙 9) 점수를 낮춰 보수적으로 만들며, 상충 근거는 conflict/history에 남긴다. 같은 입력에서 충돌만 늘면 final이 단조 감소한다(테스트로 보장).

---

## 5. final 가중합 공식

```
pos = 0.30 * source_quality_score
    + 0.25 * claim_support_score
    + 0.20 * domain_fit_score
    + 0.15 * source_diversity_score
    + 0.10 * freshness_score

final_confidence_score = clamp(0, 100, round(pos - conflict_penalty))
```

| 구성요소 | 가중치 |
|----------|:------:|
| source_quality_score | 0.30 |
| claim_support_score | 0.25 |
| domain_fit_score | 0.20 |
| source_diversity_score | 0.15 |
| freshness_score | 0.10 |
| conflict_penalty | (차감, −) |

가중치 합 = 1.00. 설계 의도:
- 출처 품질(0.30)과 근거 지지(0.25)가 본체 — "누가 말했나 + 근거가 얼마나 받쳐주나".
- domain_fit(0.20)이 적합성 게이트 — 출처가 좋아도 claim_type에 안 맞으면 최종을 끌어내린다.
- diversity(0.15)·freshness(0.10)는 보정 — 단일 출처/오래된 정보를 완만히 깎는다.
- conflict는 가중치가 아니라 **사후 차감**이라 상충이 있으면 어떤 조합이든 직접 떨어진다.

---

## 6. answer_mode 도출 규칙 (고위험은 assertive 금지)

`answer_mode(final_score, claim_type, has_tier1=False)`는 final 점수와 정책 임계값으로 답변 태도를 정한다. enum: `assertive` · `grounded` · `cautious` · `uncertain` · `cannot_determine`.

### 6.1 알고리즘 (코드 순서대로)

1. 정책의 `minimum_claim_confidence`(없으면 50)를 `min_conf`로 가져온다.
2. `final < min_conf`이면 임계 미달 → `final < 30`이면 `cannot_determine`, 아니면 `uncertain`.
3. **고위험(HIGH_RISK)이면 assertive 절대 금지**: `has_tier1 and final >= 85`일 때만 `grounded`, 그 외 전부 `cautious`.
4. 일반 claim: `final >= 85` → `assertive`, `>= 70` → `grounded`, `>= 50` → `cautious`, 그 미만 → `uncertain`.

### 6.2 HIGH_RISK 집합 (confidence_model.HIGH_RISK)

```
pregnancy_lactation_safety, teen_safety, medical_claim,
functional_medicine_claim, supplement_dosage, cosmetic_safety
```

이 6종은 점수가 95여도, Tier1 출처가 있어도 **최대 grounded**까지만 허용된다. 불확실해도 반복질문 가치가 있으면 `cautious`/`uncertain`으로 저장한다(원칙 7).

### 6.3 일반 claim 임계 요약

| final 구간 | 일반 claim | 고위험 claim |
|------------|------------|--------------|
| ≥ 85 | assertive | grounded *(단, has_tier1일 때만)* / 아니면 cautious |
| 70–84 | grounded | cautious |
| 50–69 | cautious | cautious |
| min_conf–49 | (구간 따라) | cautious |
| min_conf 미만 & ≥30 | uncertain | uncertain |
| < 30 | cannot_determine | cannot_determine |

> `min_conf`는 claim_type마다 다르다(예: pregnancy 80, regulation 85, market_trend 40). 같은 final 60이라도 임계 80인 pregnancy에서는 `uncertain`, 임계 40인 market_trend에서는 통과 후 `cautious`가 된다.

---

## 7. recheck_cycle 규칙 (강한 claim일수록 짧은 주기)

`recheck_cycle(claim_type, risk_level="medium", strong_claim=False)`. enum: `stable` · `recheck_30d` · `recheck_90d` · `recheck_180d` · `recheck_on_new_evidence`.

판정 순서(먼저 매칭되는 규칙 적용):

| 우선순위 | 조건 | 결과 |
|:-------:|------|------|
| 1 | group=`dynamic` 또는 breaking_news / price_stock_snapshot / weather_dynamic_context | `recheck_on_new_evidence` |
| 2 | risk_level=`critical` 또는 pregnancy_lactation_safety | `recheck_30d` (가장 짧음) |
| 3 | `strong_claim=True` 또는 risk_level=`high` 또는 claim_type ∈ HIGH_RISK | `recheck_90d` |
| 4 | group=`trend` | `recheck_30d` |
| 5 | risk_level=`low` | `recheck_180d` |
| 6 | 그 외 | `recheck_90d` (기본) |

설계 의도(원칙 8):
- 강한/고위험 claim일수록 더 짧게 다시 본다 — pregnancy는 30일, 나머지 고위험은 90일.
- 동적 정보(가격·날씨·속보)는 주기 자체가 무의미하므로 **새 근거가 들어올 때** 재평가.
- 트렌드도 30일 주기로 빠르게 갱신.
- 낮은 위험의 정적 사실만 180일까지 늘린다.

---

## 8. 예시 (실제 모듈 계산값)

아래 점수는 `confidence_model.score_claim`을 실제로 실행해 얻은 값이다(지어낸 값 아님). 공통 입력은 표에 명시.

### 8.1 뉴스 — 트렌드 높음 / 의료 낮음

뉴스(품질 50)는 트렌드에 적합(domain_fit 80)하지만 의료에는 부적합(22).

| 케이스 | 입력 | source_quality | claim_support | domain_fit | diversity | freshness | **final** |
|--------|------|:--:|:--:|:--:|:--:|:--:|:--:|
| 뉴스 × market_trend | 2/2 지지, age 2d | 50 | 100 | **80** | 25 | 80 | **68** |
| 뉴스 × medical_claim | 2/2 지지, age 100d | 50 | 100 | **22** | 25 | 90 | **57** |

같은 출처·같은 지지율이라도 의료에서는 domain_fit이 22로 추락해 final이 떨어진다. 더 중요한 건 §6: medical_claim은 HIGH_RISK라 final 57은 임계(80) 미달 → `uncertain`. "건강을 뉴스로 확정 ❌"이 점수+태도 양쪽에서 막힌다.

### 8.2 논문 — 의료 높음 / 트렌드 낮음

논문(품질 90)은 의료에 압도적(domain_fit 95)이나 트렌드에는 부적합(15).

| 케이스 | 입력 | source_quality | claim_support | domain_fit | diversity | freshness | **final** |
|--------|------|:--:|:--:|:--:|:--:|:--:|:--:|
| 논문 × medical_claim | 2/2 지지, age 100d | 90 | 100 | **95** | 25 | 90 | **84** |
| 논문 × market_trend | 2/2 지지, age 2d | 90 | 100 | **15** | 25 | 80 | **67** |

논문이라도 트렌드 판단에는 domain_fit 15로 final이 84→67로 내려간다(원칙 10: "트렌드를 논문으로 판단 ❌"). 참고로 market_trend 정책은 academic_paper를 disallowed로 둔다.

### 8.3 브랜드 공식 — 제품 사실 높음 / 객관 효능 제한

브랜드(품질 70)는 제품 성분 같은 **사실**에는 강하지만(domain_fit 85), 객관적 **효능**(cosmetic_function, science group)에는 제한적(40).

| 케이스 | 입력 | source_quality | claim_support | domain_fit | diversity | freshness | **final** |
|--------|------|:--:|:--:|:--:|:--:|:--:|:--:|
| 브랜드 × product_ingredient_list | 1/1, age 30d | 70 | 100 | **85** | 25 | 90 | **76** |
| 브랜드 × cosmetic_function | 1/1, age 30d | 70 | 100 | **40** | 25 | 90 | **67** |

브랜드 자기주장은 독립 근거가 아니므로(정책에서 proprietary/product_claim은 default `cautious`) 효능에서는 domain_fit이 절반 이하로 떨어진다.

### 8.4 인플루언서 — 소비자 인식 높음 / health 낮음

인플루언서(품질 30)는 소비자 인식/트렌드에는 의미있지만(domain_fit 70), 의료에는 거의 무의미(12).

| 케이스 | 입력 | source_quality | claim_support | domain_fit | diversity | freshness | **final** |
|--------|------|:--:|:--:|:--:|:--:|:--:|:--:|
| 인플루언서 × influencer_trend | 3/4, age 2d | 30 | 75 | **70** | 25 | 80 | **54** |
| 인플루언서 × medical_claim | 1/1, age 10d | 30 | 100 | **12** | 25 | 90 | **49** |

소비자 인식 트렌드는 final 54로 `cautious`로 저장될 수 있지만(반복질문 가치 보존, 원칙 7), 의료는 final 49 + HIGH_RISK라 `uncertain` 이하로 확정 불가.

### 8.5 answer_mode / recheck_cycle 실제값

| 호출 | 결과 |
|------|------|
| `answer_mode(90, "market_trend")` | `assertive` |
| `answer_mode(95, "pregnancy_lactation_safety", has_tier1=True)` | `grounded` *(95+Tier1이어도 assertive 아님)* |
| `answer_mode(60, "pregnancy_lactation_safety")` | `uncertain` *(임계 80 미달)* |
| `answer_mode(10, "cosmetic_function")` | `cannot_determine` |
| `recheck_cycle("pregnancy_lactation_safety")` | `recheck_30d` *(가장 짧음)* |
| `recheck_cycle("weather_dynamic_context")` | `recheck_on_new_evidence` |
| `recheck_cycle("market_trend")` | `recheck_30d` |
| `recheck_cycle("cosmetic_function", "medium", strong_claim=True)` | `recheck_90d` |
| `recheck_cycle("cosmetic_function", "low", strong_claim=False)` | `recheck_180d` |

---

## 9. 안전 경계 (모델이 보장하는 것)

- **canonical write 금지**: 이 모델은 learned claim에만 점수를 부여하고 canonical store에 쓰지 않는다(learned/canonical 분리, 원칙 4).
- **DeepSeek 단독 확정 금지**: 신뢰도는 source_type 기반 규칙으로만 계산된다. DeepSeek 출력 자체는 source가 아니다.
- **health/pregnancy 자동 확정 금지**: HIGH_RISK 6종은 어떤 점수에서도 assertive가 될 수 없고, pregnancy/medical 등은 정책 임계(80)·required Tier1·짧은 recheck(30/90d)로 이중삼중 보호된다(§6·§7, source_policy.HIGH_RISK_CLAIMS·can_confirm 연동).
- **키/secret 미출력**: 이 모델은 외부 호출·자격증명을 다루지 않는다(순수 결정론 함수).

---

## 10. 구현 파일 · 테스트 참조

- **구현 (점수 엔진)**: `/home/leo/Project/SIASIU/app/confidence_model.py`
  - 점수 함수: `source_quality_score`, `claim_support_score`, `domain_fit_score` / `best_domain_fit`, `source_diversity_score`, `freshness_score`, `conflict_penalty`, `final_confidence_score`, `score_claim`
  - 태도/주기: `answer_mode`, `recheck_cycle`
  - 상수: `SCORE_FIELDS`, `ANSWER_MODE`, `RECHECK`, `HIGH_RISK`, `_CLAIM_GROUP`, `_FIT`
- **구현 (출처 라우팅 정책)**: `/home/leo/Project/SIASIU/app/source_policy.py`
  - `SOURCE_QUALITY`, `TIER1/2/3`, `CLAIM_TYPES`, `POLICY`, `get_policy`, `HIGH_RISK_CLAIMS`, `can_confirm`, `source_tier`
- **테스트**:
  - `/home/leo/Project/SIASIU/app/tests/test_confidence_model.py` — domain_fit(뉴스/논문/브랜드/인플루언서), conflict 감점, recheck 주기, answer_mode 고위험 assertive 금지, domain_fit의 final 반영 검증
  - `/home/leo/Project/SIASIU/app/tests/test_source_policy.py` — routing/can_confirm 정책 검증

실행: `python3 app/tests/test_confidence_model.py` (PASS/FAIL 출력, FAIL 시 exit 1)
