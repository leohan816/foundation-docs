# Foundation Source Routing Policy v1

> Foundation Knowledge Learning System — claim_type별 "어떤 출처로 무엇을 확정할 수 있는가"를 결정론적으로 정의하는 라우팅 정책 문서
>
> 구현: [`app/source_policy.py`](../app/source_policy.py) · 상태: v1 (결정론 규칙)

---

## 0. 이 문서가 푸는 문제

학습형 지식 시스템에서 가장 위험한 실패는 **"맞는 답을 틀린 근거로 확정하는 것"** 이다.
건강 안전을 뉴스 기사로 확정하고, 시장 트렌드를 논문으로 판단하고, 임산부 안전을 브랜드 광고 문구로 확정하면 — 답이 우연히 맞아도 시스템은 신뢰할 수 없다.

이 정책은 다음 역할 분담을 코드 레벨에서 강제한다.

| 주체 | 역할 | 이 정책에서의 위치 |
|------|------|--------------------|
| **DeepSeek** | 후보 생성자 · 표현 생성자 · 요약자 | 단독으로 confirm 불가. 출처 규칙을 통과해야만 후보가 살아남는다 |
| **Opus** | Leo가 승인한 규칙으로 케이스를 대량 심사하는 자동 reviewer | `can_confirm()` 규칙을 적용해 confirm 가능 여부를 판정 |
| **Leo** | 개별 지식이 아니라 '지식 정책·판단 규칙'을 승인하는 system builder | 이 문서의 표(POLICY)를 승인한다. 개별 claim을 직접 승인하지 않는다 |

핵심 불변식(코드로 보장):
- **canonical write 금지** — 이 모듈은 learned claim의 confirm 가능 여부만 판정한다. canonical 지식을 직접 쓰지 않는다.
- **DeepSeek 단독 확정 금지** — confirm은 source 기반 규칙으로만 가능.
- **health/pregnancy 자동 확정 금지** — 전 claim_type `auto_promote_allowed = False` (사람 검수 게이트).

---

## 1. 원칙: claim type별 source 적합성 (원칙 10)

> source type의 적합성은 **절대적이지 않고 claim type에 종속**된다.

같은 출처라도 claim_type에 따라 required / allowed / disallowed가 달라진다. 핵심 사례:

| 상황 | 부적합 출처 | 이유 |
|------|-------------|------|
| 건강·의료 확정 | 뉴스 · 블로그 · 유튜버 단독 | 1차 근거가 아님 → `medical_claim` disallowed |
| 임산부 안전 확정 | 브랜드 · 커머스 단독 | 이해상충·비전문 → `pregnancy_lactation_safety` disallowed |
| 시장 트렌드 판단 | 학술 논문 | 시의성·표본 부적합 → `market_trend` / `influencer_trend` disallowed |
| 전성분 확정 | 블로그·유튜브·소셜·뉴스 | 2차 전달 → `product_ingredient_list` disallowed, 공식/패키지 우선 |

즉, 동일한 `academic_paper`라도 `medical_claim`에서는 **required**이고 `market_trend`에서는 **disallowed**이다. 이것이 본 정책의 출발점이다.

---

## 2. source 유형별 품질 점수 · Tier 1/2/3

`SOURCE_QUALITY`는 claim_type과 무관한 **일반 신뢰도(0–100)** 다. claim별 `minimum_source_quality` 임계값과 비교하는 데 쓰인다.

### 2.1 source 품질 점수표 (실제 값)

| Tier | source_type | quality | 성격 |
|------|-------------|:------:|------|
| **Tier 1** | `regulatory` | **95** | 규제기관(식약처/FDA 등) |
| Tier 1 | `pharmacopeia` | 92 | 약전 |
| Tier 1 | `academic_paper` | 90 | 학술 논문 |
| Tier 1 | `clinical_study` | 88 | 임상 연구 |
| Tier 1 | `safety_db` | 88 | 안전성 DB |
| Tier 1 | `professional_org` | 85 | 전문 학회/기관 |
| **Tier 2** | `package_label` | 75 | 제품 패키지 표기 |
| Tier 2 | `brand_official` | 70 | 브랜드 공식 |
| Tier 2 | `manufacturer` | 70 | 제조사 |
| Tier 2 | `official_mall` | 65 | 공식몰 |
| **Tier 3** | `news` | 50 | 뉴스 |
| Tier 3 | `platform_data` | 55 | 플랫폼 데이터 |
| Tier 3 | `search_data` | 50 | 검색 데이터 |
| Tier 3 | `commerce` | 45 | 커머스 |
| Tier 3 | `blog` | 30 | 블로그 |
| Tier 3 | `youtube` | 30 | 유튜브 |
| Tier 3 | `influencer` | 30 | 인플루언서 |
| Tier 3 | `social` | 25 | 소셜 |
| (보조) | `price_api` | 75 | 가격 API (Tier 미분류) |
| (보조) | `weather_api` | 85 | 날씨 API (Tier 미분류) |
| (기본) | `unknown` | 20 | 미상 |

### 2.2 Tier 정의 (실제 상수)

| Tier | 구성원 (`TIER1/2/3`) |
|------|----------------------|
| **TIER1** | `regulatory`, `pharmacopeia`, `academic_paper`, `clinical_study`, `professional_org`, `safety_db` |
| **TIER2** | `brand_official`, `manufacturer`, `package_label`, `official_mall` |
| **TIER3** | `news`, `commerce`, `blog`, `youtube`, `influencer`, `social`, `platform_data`, `search_data` |

> 주의: `price_api`(75)·`weather_api`(85)는 `source_tier()` 분기상 TIER1/2 목록에 없으므로 **Tier 3로 반환**된다. Tier 숫자는 라우팅 적합성 판정에 직접 쓰이지 않고(claim별 allowed/required로 판정), 품질 점수가 임계값 비교에 쓰인다.

`source_tier(source_type)`: TIER1이면 1, TIER2면 2, 그 외 전부 3.

---

## 3. 21개 claim_type 라우팅 정책표 (실제 값)

각 정책은 9개 필드를 가진다. 약어: **MSQ** = `minimum_source_quality`, **MCC** = `minimum_claim_confidence`, **mode** = `default_answer_mode`, **recheck** = `default_recheck_cycle`, **AP** = `auto_promote_allowed`.

> 전 claim_type 공통: **AP = False** (자동 승급 없음 · 사람 검수 강제).

### 3.1 성분·제품 계열

| claim_type | required_sources | allowed_sources | disallowed | MSQ | MCC | mode | recheck |
|------------|------------------|-----------------|-----------|:---:|:---:|------|--------|
| `ingredient_identity` | regulatory, academic_paper, safety_db, brand_official, package_label | TIER1+TIER2 | social | 60 | 60 | grounded | 180d |
| `inci_alias` | safety_db, regulatory, package_label, brand_official | TIER1+TIER2 | youtube, social | 55 | 55 | grounded | 180d |
| `proprietary_ingredient_claim` | brand_official | TIER1+TIER2 | social | 50 | 50 | **cautious** | 90d |
| `product_ingredient_list` | brand_official, package_label, official_mall | TIER2+regulatory | blog, youtube, social, news | 65 | 60 | grounded | 90d |
| `product_claim` | brand_official | TIER2+commerce | social | 45 | 45 | **cautious** | 90d |

- `proprietary_ingredient_claim`: required는 `brand_official` 단 하나지만 mode=cautious — **브랜드 자기주장 ≠ 독립 근거**임을 표현으로 분리(§5 참조).
- `product_ingredient_list`: 전성분은 **공식/패키지 우선**, 블로그·유튜브·소셜·뉴스 전부 disallowed.

### 3.2 화장품 기능·안전 계열

| claim_type | required_sources | allowed_sources | disallowed | MSQ | MCC | mode | recheck |
|------------|------------------|-----------------|-----------|:---:|:---:|------|--------|
| `cosmetic_function` | academic_paper, clinical_study, safety_db, professional_org | TIER1+brand_official | youtube, social, blog | 60 | 60 | grounded | 90d |
| `cosmetic_safety` | regulatory, safety_db, academic_paper | TIER1 | blog, youtube, influencer, social, commerce | 75 | 70 | **cautious** | 90d |
| `pregnancy_lactation_safety` | regulatory, clinical_study, professional_org | TIER1 | brand_official, manufacturer, official_mall, commerce, blog, youtube, influencer, social, news | **85** | **80** | **cautious** | **30d** |
| `teen_safety` | regulatory, clinical_study, professional_org | TIER1 | commerce, blog, youtube, influencer, social | 80 | 75 | **cautious** | 90d |

- `pregnancy_lactation_safety`: 전 정책 중 **가장 엄격** — MSQ 85 / MCC 80 / recheck 30d, allowed는 TIER1 only. **브랜드·커머스·뉴스 전부 disallowed**.

### 3.3 의료·기능의학·시술 계열

| claim_type | required_sources | allowed_sources | disallowed | MSQ | MCC | mode | recheck |
|------------|------------------|-----------------|-----------|:---:|:---:|------|--------|
| `medical_claim` | academic_paper, clinical_study, professional_org, regulatory | TIER1 | news, blog, youtube, influencer, social, commerce, brand_official | **85** | **80** | **cautious** | 90d |
| `functional_medicine_claim` | academic_paper, clinical_study, professional_org | TIER1 | news, blog, youtube, influencer, social, commerce | 80 | 75 | **cautious** | 90d |
| `supplement_dosage` | regulatory, academic_paper, professional_org | TIER1 | blog, youtube, influencer, social, commerce | 80 | 75 | **cautious** | 90d |
| `aesthetic_procedure` | professional_org, clinical_study, academic_paper | TIER1+brand_official | blog, youtube, influencer, social | 70 | 65 | **cautious** | 90d |
| `aftercare` | professional_org, clinical_study | TIER1+brand_official | social | 60 | 55 | **cautious** | 90d |

- `medical_claim`: **뉴스·블로그·유튜버는 물론 brand_official까지 disallowed**. 강한 1차 근거(TIER1 required) 없이는 확정 불가.

### 3.4 트렌드·시의성·동적 컨텍스트 계열

| claim_type | required_sources | allowed_sources | disallowed | MSQ | MCC | mode | recheck | required_fields |
|------------|------------------|-----------------|-----------|:---:|:---:|------|--------|-----------------|
| `market_trend` | platform_data, search_data, news, commerce | platform_data, search_data, news, commerce, social, influencer, blog | **academic_paper** | 40 | 40 | grounded | 30d | — |
| `breaking_news` | news | news, regulatory, professional_org, platform_data | blog, social | 50 | 45 | grounded | **on_new_evidence** | source, published_at, event_time, region |
| `regulation` | regulatory | regulatory, professional_org | blog, youtube, social, commerce | **90** | **85** | grounded | 90d | source, published_at, region |
| `business_partner_info` | brand_official, manufacturer | TIER2 | social | 60 | 55 | cautious | 90d | — |
| `weather_dynamic_context` | weather_api | weather_api, platform_data | blog, social | 70 | 60 | grounded | **on_new_evidence** | source, region, time |
| `price_stock_snapshot` | price_api, official_mall, commerce | price_api, official_mall, commerce, platform_data | blog, social | 50 | 45 | grounded | **on_new_evidence** | source, time |
| `influencer_trend` | platform_data, social, influencer | platform_data, social, influencer, youtube, news | **academic_paper** | 35 | 35 | cautious | 30d | — |

- `market_trend` / `influencer_trend`: **논문(`academic_paper`)을 명시적으로 disallowed** — 트렌드는 플랫폼/검색/소셜/커머스로 판단한다(원칙 10 역방향).
- `breaking_news`: `published_at` 등 시각·지역 필드가 **필수**. 시각 없는 속보는 확정 불가.
- `regulation`: 규제는 사실상 `regulatory` 단일 required + MSQ 90 / MCC 85로 가장 높은 출처 기준 중 하나.
- `weather_dynamic_context`: `region` + `time` 필수.

### 3.5 강한 claim일수록 강한 기준 (원칙 8 검증)

required가 강한 출처일수록(=고위험) MSQ/MCC가 높고 recheck가 짧아진다 — 정책표가 원칙 8을 수치로 구현한다.

| 강도 | 대표 claim_type | MSQ / MCC | recheck |
|------|-----------------|:---------:|---------|
| 최상 | `regulation` | 90 / 85 | 90d |
| 최상 | `pregnancy_lactation_safety` | 85 / 80 | **30d** |
| 상 | `medical_claim` | 85 / 80 | 90d |
| 중 | `cosmetic_function` | 60 / 60 | 90d |
| 하(시의성) | `market_trend` | 40 / 40 | **30d** |
| 하(시의성) | `influencer_trend` | 35 / 35 | **30d** |

> 시의성 claim(trend류)은 기준점수는 낮지만 **빠르게 부패**하므로 recheck를 30d/on_new_evidence로 짧게 잡는다 — "강한 claim = 짧은 recheck"와는 다른 축(시의성)으로 짧아지는 경우.

---

## 4. `can_confirm()` 판정 로직

> 시그니처: `can_confirm(claim_type, source_types, fields=None) -> {ok, reason, blocking}`
>
> 질문: "이 claim_type을, 이 source들로, 지금 **확정**할 수 있는가?"

### 4.1 판정 단계 (코드 순서 그대로)

1. **claim_type 유효성** — `POLICY`에 없으면 `{ok: False, reason: "unknown_claim_type"}`.
2. **disallowed 식별** — 입력 source 중 disallowed에 든 것(`disallowed_present`)을 추려 `blocking`에 보고. eligible = 입력 source − disallowed.
3. **allowed 충족** — `allowed = allowed_sources ∪ required_sources`. eligible 중 allowed에 드는 출처가 **하나도 없으면** `{ok: False, reason: "no_allowed_source", blocking: [...]}`.
4. **고위험 required 강제** — claim_type이 `HIGH_RISK_CLAIMS`이면, eligible 안에 `required_sources` 중 **최소 1개**가 반드시 있어야 한다. 없으면 `{ok: False, reason: "missing_required_source"}`.
5. **필수 필드 충족** — `required_fields` 중 빠진 것이 있으면 `{ok: False, reason: "missing_fields:<목록>"}`.
6. 위를 모두 통과하면 `{ok: True, reason: "ok", blocking: <disallowed 잔재 보고>}`.

> 핵심: confirm은 "허용 출처가 있다"만으로 부족하다. **고위험은 강한 출처가 반드시 있어야** 하고, 시의성 claim은 **시각/지역 필드가 반드시 있어야** 한다.

### 4.2 HIGH_RISK_CLAIMS (실제 상수)

```
cosmetic_safety, pregnancy_lactation_safety, teen_safety, medical_claim,
functional_medicine_claim, supplement_dosage, aesthetic_procedure, regulation
```

이 8개는 4단계(required 강제)가 적용된다. 예: `medical_claim`을 `news + blog`로만 들고 오면 — disallowed에 막히고, 설령 막히지 않아도 TIER1 required가 없어 `missing_required_source`.

### 4.3 판정 예시

| claim_type | source_types | fields | 결과 | reason |
|------------|--------------|--------|:----:|--------|
| `medical_claim` | news, blog | — | ❌ | no_allowed_source (둘 다 disallowed) |
| `medical_claim` | academic_paper | — | ✅ | ok (TIER1 required 충족) |
| `pregnancy_lactation_safety` | brand_official, commerce | — | ❌ | no_allowed_source (둘 다 disallowed) |
| `pregnancy_lactation_safety` | clinical_study | — | ✅ | ok |
| `breaking_news` | news | source 만 | ❌ | missing_fields: published_at, event_time, region |
| `breaking_news` | news | source, published_at, event_time, region | ✅ | ok |
| `weather_dynamic_context` | weather_api | source 만 | ❌ | missing_fields: region, time |
| `market_trend` | platform_data, academic_paper | — | ✅ | ok, blocking=[academic_paper] |

> 마지막 행 주목: `market_trend`는 고위험이 아니므로 `academic_paper`가 disallowed여도 **다른 허용 출처(platform_data)가 있으면 confirm 가능**하되, disallowed 출처는 `blocking`으로 보고되어 신뢰 표현에 반영된다.

---

## 5. 핵심 규칙 요약 (보안·철학 게이트)

| # | 규칙 | 구현 위치 |
|---|------|-----------|
| 1 | **의료 = 뉴스/블로그/유튜버 단독 확정 ❌** | `medical_claim.disallowed` = news, blog, youtube, influencer, social, commerce, brand_official + HIGH_RISK required |
| 2 | **임산부 = 브랜드/커머스 단독 확정 ❌** | `pregnancy_lactation_safety.disallowed` = brand_official, manufacturer, official_mall, commerce, … |
| 3 | **트렌드 = 플랫폼/검색/소셜/커머스 허용, 논문 ❌** | `market_trend` / `influencer_trend`: allowed=platform/search/social/commerce, disallowed=academic_paper |
| 4 | **전성분 = 공식/패키지 우선** | `product_ingredient_list.required` = brand_official, package_label, official_mall; blog/youtube/social/news disallowed |
| 5 | **breaking_news = published_at 필수** | `required_fields` = source, published_at, event_time, region |
| 6 | **weather = region + time 필수** | `required_fields` = source, region, time |
| 7 | **proprietary = 브랜드 claim / 독립 근거 분리** | `proprietary_ingredient_claim`: required=brand_official, mode=**cautious** (자기주장은 cautious로 저장) |
| 8 | **전 claim auto_promote = False** | 21개 POLICY 전부 `auto_promote_allowed=False` — 사람 검수 게이트 |
| 9 | **DeepSeek 단독 확정 금지** | confirm은 `can_confirm()` 출처 규칙으로만. DeepSeek은 후보/표현/요약만 |
| 10 | **canonical write 금지 · health/pregnancy 자동 확정 금지** | 본 모듈은 판정만. AP=False로 자동 확정 차단 |

> answer_mode 매핑(원칙 7): 불확실하지만 반복질문 가치가 있는 claim은 `default_answer_mode=cautious`로 저장된다(예: 모든 안전·의료·proprietary claim). 충돌은 삭제하지 않고 conflict/history로 남기는 것이 상위 학습 파이프라인의 책임이며, 본 정책은 그 입력이 되는 source 적합성/확정 가능성만 결정한다.

---

## 6. 구현 파일 · 테스트 참조

- **구현 파일**: [`app/source_policy.py`](../app/source_policy.py)
  - 상수: `SOURCE_QUALITY`, `TIER1`, `TIER2`, `TIER3`, `CLAIM_TYPES`(21개), `POLICY`, `HIGH_RISK_CLAIMS`
  - 함수: `_p(...)`(정책 빌더), `get_policy(claim_type)`, `can_confirm(claim_type, source_types, fields)`, `source_tier(source_type)`
- **테스트**: `tests/test_source_policy.py` (예정/존재 시) — 다음 케이스를 회귀로 고정할 것
  - `medical_claim` + (news, blog) → `no_allowed_source`
  - `pregnancy_lactation_safety` + (brand_official, commerce) → `no_allowed_source`
  - HIGH_RISK + 허용출처는 있으나 required 없음 → `missing_required_source`
  - `breaking_news` / `weather_dynamic_context` 필수필드 누락 → `missing_fields:*`
  - 전 POLICY 항목 `auto_promote_allowed is False` 단언
  - `market_trend` / `influencer_trend`의 `academic_paper` disallowed 단언

---

*문서 버전: v1 · 기준 소스: `app/source_policy.py` (CLAIM_TYPES 21종 · POLICY 21종 · HIGH_RISK_CLAIMS 8종)*
