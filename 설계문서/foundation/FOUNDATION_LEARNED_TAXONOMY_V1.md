# Foundation Learned Taxonomy v1

> learned 지식(=학습으로 새로 획득한 지식)을 **canonical 지식과 분리**해서 분류하는 확장형 registry 설계서.
> 구현: `app/learned_taxonomy.py` · 테스트: `app/tests/test_learned_taxonomy.py`

---

## 0. 이 문서를 읽는 사람에게 (1분 요약)

Foundation은 "여성의 뷰티·피부·건강 질문 전반"에 답하는 지식 시스템이다. 그 지식은 두 층으로 나뉜다.

- **canonical layer**: 이미 검증되어 고정된 지식(전성분 DB, 규제 사실 등). 본 시스템은 여기에 **쓰지 않는다**.
- **learned layer**: DeepSeek가 새로 *생성·요약·표현*하고, Opus가 *심사*하고, Leo가 *정책을 승인*해서 쌓이는 지식.

이 문서는 learned layer를 어떻게 **분류(taxonomy)** 하는지를 정의한다. 핵심은 세 가지다.

1. **지식은 문서가 아니라 claim/card 단위**로 쪼갠다. "이 블로그 글"이 아니라 "성분 X는 보습에 도움" 같은 최소 주장 1건이 1 card다.
2. 모든 card는 14개 top-level 카테고리 중 하나에 속하고, 카테고리마다 **위험도·출처 정책·재검증 주기·답변 모드**가 사전에 정해져 있다. 즉 "건강을 뉴스로 확정"하거나 "트렌드를 논문으로 판단"하는 사고를 **구조적으로** 막는다.
3. taxonomy는 **확장형**이다. 새 도메인(예: 반려동물 케어)이 생기면 코드 한 줄로 카테고리를 추가하되, 추가 시점에도 동일한 불변식(필수 8키·유효 enum)을 강제한다.

### 권한 경계 (보안 불변식)
- DeepSeek = **후보 생성자/표현 생성자/요약자**. 지식의 final judge가 **아니다**. DeepSeek 단독 확정 금지.
- Opus = Leo가 승인한 **판단 규칙**에 따라 출처 기반으로 케이스를 대량 심사하는 **자동 reviewer**.
- Leo = 개별 지식이 아니라 **지식 정책·판단 규칙**을 승인하는 system builder.
- canonical write 금지 · health/pregnancy 자동 확정 금지 · 키/secret 미출력.

---

## 1. 목적과 "확장형 registry" 개념

### 1.1 왜 taxonomy가 먼저인가
learned 지식을 한 덩어리로 쌓으면 "이 주장을 어디까지 믿어야 하는가"를 매번 사람이 판단해야 한다. 그건 확장되지 않는다. 대신 우리는 **지식이 들어오기 전에 그 지식이 속할 자리(카테고리)를 정의**하고, 그 자리에 "이 종류의 지식은 어떤 출처라야 하고, 얼마나 자주 다시 봐야 하고, 답할 때 얼마나 단정해도 되는지"를 **미리** 박아둔다. 그러면 개별 claim 심사는 "정책 적용"이 되고, Opus가 대량으로 자동화할 수 있다.

### 1.2 registry = 코드로 살아있는 단일 진실
taxonomy는 문서가 아니라 `app/learned_taxonomy.py`의 `TAXONOMY` dict로 존재한다. 본 설계서의 모든 표는 그 dict의 **실제 값**을 옮긴 것이다. 코드가 바뀌면 `validate_taxonomy()`가 깨지므로, 문서·코드·테스트가 한 방향으로 묶인다.

### 1.3 각 카테고리가 보유하는 8개 속성 (모듈이 강제하는 스키마)
`_cat()` 팩토리(`learned_taxonomy.py` L22)가 만드는 모든 카테고리는 다음 8키를 **반드시** 가진다.

| 속성 | 의미 | 값 공간(enum 또는 자유값) |
|---|---|---|
| `purpose` | 이 카테고리가 커버하는 지식 영역 | 자유 텍스트 |
| `examples` | 대표 질문/주제 예시 | 자유 리스트 |
| `allowed_card_types` | 이 카테고리에 들어올 수 있는 card 타입 화이트리스트 | `CARD_TYPES` 부분집합 |
| `default_source_policy` | 이 카테고리 claim이 요구하는 출처 적합성 정책 | 자유 정책 토큰(§2.2) |
| `risk_level` | 잘못된 답이 끼칠 위해 수준 | `RISK` |
| `default_recheck_cycle` | 기본 재검증 주기 | `RECHECK` |
| `indexing_policy` | 검색/응답 인덱스에 어떻게 노출할지 | `INDEXING` |
| `answer_mode_default` | 답변 시 기본 확신 톤 | `ANSWER_MODE` |

enum 값 공간(모듈 상수, L16–L19):

| 상수 | 실제 값 |
|---|---|
| `RISK` | `low`, `medium`, `high`, `critical` |
| `RECHECK` | `stable`, `recheck_30d`, `recheck_90d`, `recheck_180d`, `recheck_on_new_evidence` |
| `ANSWER_MODE` | `assertive`, `grounded`, `cautious`, `uncertain`, `cannot_determine` |
| `INDEXING` | `learned_index`, `learned_index_lowrank`, `dynamic_only`, `raw_only`, `no_index` |

> 철학 연결: **강한 claim일수록 더 높은 evidence + 더 짧은 recheck cycle**(철학 8). 이는 표에서 `risk_level`이 올라갈수록 `recheck_*` 주기가 짧아지고 `answer_mode_default`가 `cautious` 쪽으로 내려가는 형태로 나타난다. `women_life_stage`가 `critical` + `recheck_30d` + `cautious`인 것이 그 극단이다.

---

## 2. 최상위 learned taxonomy — 14개 카테고리 (실제 값)

`TAXONOMY` dict(L29–L59)에 정의된 14개 카테고리 전부. 값은 소스 그대로다.

| # | category | purpose | examples | allowed_card_types | default_source_policy | risk_level | default_recheck_cycle | indexing_policy | answer_mode_default |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `beauty` | 뷰티 일반·메이크업·미용 상식 | 메이크업 팁 / 퍼스널컬러 | trend_card, product_card, routine_card | `consumer_perception` | `low` | `recheck_180d` | `learned_index` | `grounded` |
| 2 | `skin` | 피부 상태·고민·타입(건성/지성/민감/장벽) | 장벽 손상 / 모공 / 홍조 | ingredient_claim_card, routine_card, safety_card | `cosmetic_evidence` | `medium` | `recheck_90d` | `learned_index` | `grounded` |
| 3 | `cosmetics` | 화장품 성분·제품·처방·안전(**주력 도메인**) | 성분 효능 / 전성분 / 제품 비교 | ingredient_card, ingredient_claim_card, proprietary_ingredient_card, product_card, product_claim_card, safety_card, routine_card, brand_card | `cosmetic_evidence` | `medium` | `recheck_90d` | `learned_index` | `grounded` |
| 4 | `hair_body` | 헤어·두피·바디·구강 케어 | 탈모 케어 / 두피 각질 | ingredient_claim_card, product_card, routine_card | `cosmetic_evidence` | `medium` | `recheck_90d` | `learned_index` | `grounded` |
| 5 | `aesthetic_medicine` | 미용시술·피부과 시술·시술 후 관리 | 레이저 / 보톡스 / 시술 후 진정 | procedure_card, safety_card | `clinical_evidence` | `high` | `recheck_90d` | `learned_index` | `cautious` |
| 6 | `wellness_health` | 건강 일반정보(진단/치료 아님·고난도 검증 도메인) | 수면 / 장 건강 / 피부-식습관 | health_claim_card, safety_card | `health_evidence` | `high` | `recheck_90d` | `learned_index_lowrank` | `cautious` |
| 7 | `functional_medicine` | 기능의학·영양요법(**단정 금지**) | 호르몬 균형 / 항산화 | health_claim_card | `health_evidence` | `high` | `recheck_90d` | `learned_index_lowrank` | `cautious` |
| 8 | `nutrition_supplements` | 영양·보충제·용량 | 비타민D 용량 / 오메가3 | supplement_card, health_claim_card | `health_evidence` | `high` | `recheck_90d` | `learned_index_lowrank` | `cautious` |
| 9 | `women_life_stage` | 여성 생애주기(임신/수유/생리/갱년기 — **최고위험**) | 임산부 성분 / 수유 안전 / 갱년기 피부 | safety_card, health_claim_card | `high_trust_health` | `critical` | `recheck_30d` | `learned_index_lowrank` | `cautious` |
| 10 | `market_trends` | 시장 트렌드·소비자 인식(논문 아님·플랫폼/검색/커머스/뉴스 적합) | 성분 유행 / 신제품 트렌드 | trend_card | `trend_signal` | `low` | `recheck_30d` | `learned_index_lowrank` | `grounded` |
| 11 | `brands_products` | 브랜드·제품 사실(전성분/출시/가격은 공식 우선) | 브랜드 라인 / 신제품 출시 | brand_card, product_card, product_claim_card | `brand_fact` | `medium` | `recheck_90d` | `learned_index` | `grounded` |
| 12 | `business_commerce` | 사업·파트너·커머스 운영 정보 | 입점사 정보 / 수수료 정책 | source_card | `business_internal` | `medium` | `recheck_90d` | `no_index` | `cautious` |
| 13 | `dynamic_context` | 동적 컨텍스트(날씨/UV/대기/지역/가격/재고/트렌드 — **freshness 핵심**) | 오늘 자외선 / 지역 날씨 | dynamic_context_card | `dynamic_signal` | `medium` | `recheck_on_new_evidence` | `dynamic_only` | `grounded` |
| 14 | `source_registry` | 출처 메타·신뢰도 레지스트리(도메인→tier) | mfds.go.kr=Tier1 / blog=Tier3 | source_card | `meta` | `low` | `stable` | `no_index` | `grounded` |

### 2.1 표에서 읽어야 할 정책 패턴
- **출처 적합성은 claim type에 따라 다르다**(철학 10). `market_trends`는 `trend_signal`(플랫폼/검색/커머스/뉴스 적합)을 쓰고 절대 논문으로 트렌드를 "판단"하지 않는다. 반대로 `wellness_health`·`functional_medicine`·`nutrition_supplements`·`women_life_stage`는 건강 도메인이라 뉴스/블로그로 확정하지 않고 `health_evidence`/`high_trust_health`를 요구한다.
- **health/pregnancy 자동 확정 금지**가 enum으로 표현됨: 9번 `women_life_stage`만 `critical`이며 동시에 가장 짧은 `recheck_30d`, 그리고 `cautious` 모드. 건강 4개 카테고리(6·7·8·9)는 전부 `learned_index_lowrank`로 노출 비중을 낮춘다.
- **freshness가 본질인 지식**(13 `dynamic_context`)은 `recheck_on_new_evidence` + `dynamic_only`로, "오래된 캐시를 사실처럼 답하는 것"을 차단한다.
- **사업/운영 정보**(12 `business_commerce`)와 **출처 레지스트리**(14 `source_registry`)는 `no_index` — 사용자 답변 인덱스에 직접 올라가지 않는 내부/메타 지식.

### 2.2 `default_source_policy` 토큰 정리
카테고리가 참조하는 출처 정책 토큰(실제 등장 값)과 그 의도:

| source_policy 토큰 | 사용 카테고리 | 의도 |
|---|---|---|
| `consumer_perception` | beauty | 소비자 인식 수준이면 충분(저위험 상식) |
| `cosmetic_evidence` | skin, cosmetics, hair_body | 화장품 근거(임상/문헌/규제 혼합) |
| `clinical_evidence` | aesthetic_medicine | 시술은 임상 근거 요구 |
| `health_evidence` | wellness_health, functional_medicine, nutrition_supplements | 건강은 건강 근거만 |
| `high_trust_health` | women_life_stage | 임신/수유 등 최고 신뢰 출처만 |
| `trend_signal` | market_trends | 트렌드는 신호(검색/커머스/뉴스)로 |
| `brand_fact` | brands_products | 사실은 공식 출처 우선 |
| `business_internal` | business_commerce | 내부 운영 데이터 |
| `dynamic_signal` | dynamic_context | 실시간 신호 |
| `meta` | source_registry | 출처 자체의 메타 신뢰도 |

> 주: source_policy 토큰은 enum으로 고정돼 있지 않은 **정책 키**다. 실제 적합성 판정 규칙(어떤 도메인을 어느 tier로 보는지)은 `source_registry` 카테고리와 별도 출처 정책 모듈에서 다룬다. 본 taxonomy는 "이 카테고리가 어떤 정책을 요구하는가"의 **지정**까지를 책임진다.

---

## 3. cosmetics 하위 카테고리 (주력 도메인 세분화)

`cosmetics`는 본 시스템의 주력 도메인이라 단일 카테고리로는 부족하다. `COSMETICS_SUB` 튜플(L62–L63)로 10개 하위를 둔다.

| # | sub-category | 다루는 것 |
|---|---|---|
| 1 | `ingredients` | 개별 성분 사실(INCI·기능 일반) |
| 2 | `proprietary_ingredients` | 브랜드 독점 성분(§4 전용 schema) |
| 3 | `ingredient_claims` | 성분 효능 *주장* |
| 4 | `product_claims` | 제품 효능 *주장* |
| 5 | `safety` | 안전성·자극·부작용 |
| 6 | `formulations` | 처방·배합 설계 |
| 7 | `textures` | 제형·사용감(텍스처) |
| 8 | `routines` | 루틴·사용 순서 |
| 9 | `products` | 제품 사실 |
| 10 | `brands` | 브랜드 사실 |

설계 의도: **성분 사실(`ingredients`)과 성분 주장(`ingredient_claims`)을 분리**하고, **제품 사실(`products`)과 제품 주장(`product_claims`)을 분리**한다. "성분이 들어있다"는 사실과 "그래서 효과가 있다"는 주장은 출처 요구가 다르기 때문이다. 특히 `proprietary_ingredients`는 마케팅 네이밍이 사실처럼 굳어지는 영역이라 §4의 전용 schema로 별도 관리한다.

---

## 4. proprietary_ingredient 전용 schema — 브랜드 claim ↔ 독립 근거 분리

### 4.1 문제
"Pro-Xylane이 주름을 개선한다", "Pitera가 피부결을 바꾼다" 같은 문장은 **브랜드의 마케팅 주장**이다. 이를 독립 근거와 섞어 저장하면, 마케팅 카피가 시스템 안에서 검증된 사실로 둔갑한다. 그래서 독점 성분은 **브랜드가 주장하는 것**과 **독립(Tier1/학술) 근거**를 물리적으로 다른 필드에 보관한다.

### 4.2 스키마 (`PROPRIETARY_INGREDIENT_SCHEMA`, L66–L74)

| 필드 | 타입 | 의미 |
|---|---|---|
| `marketing_name` | `str` | 마케팅 명칭. 예: Pro-Xylane, Pitera, TECA, 波色因(Bose-in) |
| `brand_owner` | `str` | 소유 브랜드/제조사 |
| `inci_equivalents` | `list` | 실제 INCI 성분(있으면) |
| `claimed_functions` | `list` | 브랜드가 *주장*하는 기능 |
| `brand_claims` | `list` | 브랜드 출처 claim (마케팅) |
| `independent_evidence` | `list` | 독립(Tier1/학술) 근거 — **별도 보관** |
| `evidence_separation` | `bool` | **★True 고정**: 브랜드 claim ≠ 독립 근거 |

### 4.3 분리 불변식
`evidence_separation` 필드는 단순 플래그가 아니라 **이 schema의 존재 이유**다. card 생성 헬퍼 `make_proprietary_card()`(L99–L104)는 항상 `evidence_separation=True`와 `_card="proprietary_ingredient_card"`를 박아서 반환한다. 즉 독점 성분 card는 "분리됨"이 아닌 상태로는 만들어질 수 없다.

예시(테스트에 실제로 쓰이는 형태):

```
make_proprietary_card(
    "Pro-Xylane",
    brand_owner="LOreal",
    inci_equivalents=["Hydroxypropyl Tetrahydropyrantriol"],
    brand_claims=["주름 개선"],     # ← 브랜드 주장
    independent_evidence=[],        # ← 독립 근거(아직 없음): 비워두지만 칸은 따로 존재
)
# 결과: brand_claims != independent_evidence, evidence_separation is True
```

`independent_evidence`가 비어 있다는 것 자체가 정보다 — "이 성분의 효능 주장은 아직 독립 근거로 뒷받침되지 않았다"가 그대로 드러나고, 답변 시 `cautious`/`uncertain`으로 내려가는 근거가 된다. **충돌하면 삭제하지 않고**(철학 9) 두 칸에 각각 남겨 history/conflict로 다룬다.

### 4.4 등록된 예시 (`PROPRIETARY_EXAMPLES`, L75)
`Pro-Xylane`, `波色因`, `Pitera`, `TECA`, `Centella TECA Complex`, `Blue Repair Complex`.

---

## 5. card 타입 목록 (`CARD_TYPES`, L11–L14)

지식의 **최소 단위**. 모든 learned 지식은 아래 15개 타입 중 하나의 card로 환원된다. 카테고리의 `allowed_card_types`는 이 목록의 부분집합으로만 구성된다.

| card type | 담는 주장(claim) |
|---|---|
| `ingredient_card` | 성분 사실(존재·INCI·일반 기능) |
| `ingredient_claim_card` | 성분 효능 *주장* |
| `proprietary_ingredient_card` | 브랜드 독점 성분(§4 전용 schema) |
| `product_card` | 제품 사실 |
| `product_claim_card` | 제품 효능 *주장* |
| `safety_card` | 안전성·자극·부작용·금기 |
| `routine_card` | 사용 루틴·순서 |
| `health_claim_card` | 건강 관련 주장(진단/치료 아님) |
| `supplement_card` | 보충제·용량 |
| `procedure_card` | 미용/피부과 시술 |
| `trend_card` | 시장 트렌드·소비자 인식 신호 |
| `brand_card` | 브랜드 사실 |
| `regulation_card` | 규제·고시 사실 |
| `dynamic_context_card` | 동적 컨텍스트(날씨/UV/가격/재고) |
| `source_card` | 출처 메타·운영 정보 |

> `regulation_card`는 어떤 카테고리의 기본 `allowed_card_types`에도 아직 배정돼 있지 않다(규제 사실은 1차적으로 canonical 영역과 맞닿아 있기 때문). 타입 자체는 예약돼 있어, 규제 관련 learned 카테고리를 §6의 `add_category`로 추가할 때 즉시 사용할 수 있다.

### 5.1 사실 card vs 주장 card
이름에 `_claim_`이 들어간 card(`ingredient_claim_card`, `product_claim_card`, `health_claim_card`)는 **주장**이며, 더 높은 evidence와 더 보수적인 `answer_mode`를 요구한다. 이름에 `claim`이 없는 사실 card는 상대적으로 낮은 출처로도 성립한다. 이 구분이 §3의 하위 카테고리 분리(사실 vs 주장)와 1:1로 맞물린다.

---

## 6. 확장 방법 — `add_category()` (L86–L92)

taxonomy는 닫힌 목록이 아니라 **확장형 registry**다. 새 도메인은 다음 함수로 추가한다.

```
add_category(name, purpose, examples=None, cards=None,
             source_policy="consumer_perception",
             risk="low", recheck="recheck_90d",
             indexing="learned_index", answer_mode="grounded")
```

### 6.1 기본값 (지정 생략 시 적용되는 실제 값)

| 파라미터 | 기본값 |
|---|---|
| `examples` | `[]` |
| `cards` | `["source_card"]` |
| `source_policy` | `consumer_perception` |
| `risk` | `low` |
| `recheck` | `recheck_90d` |
| `indexing` | `learned_index` |
| `answer_mode` | `grounded` |

### 6.2 동작 규약
- **중복 거부**: 이미 존재하는 `name`을 추가하면 `ValueError("already exists: <name>")`를 던진다. taxonomy 키는 유일하다.
- 추가된 카테고리도 `_cat()`을 거치므로 8개 필수 키를 자동으로 갖춘다 → `validate_taxonomy()` 불변식을 그대로 통과해야 한다.
- 확장 예시(테스트): `add_category("pet_care", "반려동물 케어(확장 예시)", examples=["펫 샴푸"])` → `pet_care` 추가, 카테고리 수 +1.

### 6.3 권한 경계
카테고리 추가는 **정책 결정**이다. 따라서 DeepSeek가 단독으로 새 카테고리를 만들 수 없다(철학 3: Leo가 정책·규칙을 승인). 새 위험 도메인을 열 때는 `risk`/`recheck`/`source_policy`/`answer_mode`를 명시적으로 보수적으로 지정해야 하며, 기본값(low/grounded)에 의존하지 않는다. 특히 건강·임신 관련 도메인을 추가할 때 기본값을 그대로 쓰는 것은 금지(health/pregnancy 자동 확정 금지 원칙).

---

## 7. 불변식 — `validate_taxonomy()` (L107–L122)

taxonomy의 무결성을 보장하는 검사 함수. 위반이 없으면 **빈 리스트 `[]`** 를 반환하고, 위반마다 사람이 읽을 수 있는 에러 문자열을 담아 반환한다.

### 7.1 검사하는 불변식

| # | 불변식 | 위반 메시지 형식 |
|---|---|---|
| 1 | 모든 카테고리가 8개 필수 키를 전부 가진다 (`purpose`, `examples`, `allowed_card_types`, `default_source_policy`, `risk_level`, `default_recheck_cycle`, `indexing_policy`, `answer_mode_default`) | `"<name>.<key> missing"` |
| 2 | `risk_level` ∈ `RISK` | `"<name> risk invalid"` |
| 3 | `default_recheck_cycle` ∈ `RECHECK` | `"<name> recheck invalid"` |
| 4 | `answer_mode_default` ∈ `ANSWER_MODE` | `"<name> answer_mode invalid"` |

### 7.2 의미
이 함수는 "taxonomy가 정책으로서 일관적인가"를 기계적으로 보증한다. 누가 카테고리를 추가/수정해도 (1) 8개 정책 차원이 빠짐없이 채워졌고 (2) 위험도·재검증·답변모드가 **정의된 enum 안에 있는** 값임을 강제한다. `indexing_policy`와 `default_source_policy`는 현재 키 존재만 검사하고 enum 일치까지는 강제하지 않는다(전자는 `INDEXING` enum이 존재하지만 미적용, 후자는 의도적으로 자유 정책 토큰). 이는 향후 강화 여지로 §8에 남긴다.

> 테스트는 `validate_taxonomy() == []`를 핵심 게이트로 사용한다. 즉 14개 카테고리 + 향후 추가분 전부가 이 불변식을 통과해야 빌드가 녹색이 된다.

---

## 8. 향후 강화 여지 (v1 한계 명시)
- `indexing_policy`를 `validate_taxonomy()`에서 `INDEXING` enum으로 강제(현재 미적용).
- `default_source_policy` 토큰을 enum/레지스트리화하여 오탈자 방지.
- `allowed_card_types`가 `CARD_TYPES` 부분집합인지 검사 추가.
- card 단위 메타(source·evidence score·confidence score·review status·recheck cycle)는 본 taxonomy의 **상위 계약**이며, card 저장 스키마는 별도 모듈에서 정의(본 문서 범위 밖).

---

## 참조

- **구현 파일**: `/home/leo/Project/SIASIU/app/learned_taxonomy.py`
  - 상수: `CARD_TYPES`(L11) · `RISK`/`RECHECK`/`ANSWER_MODE`/`INDEXING`(L16–L19) · `TAXONOMY`(L29) · `COSMETICS_SUB`(L62) · `PROPRIETARY_INGREDIENT_SCHEMA`(L66) · `PROPRIETARY_EXAMPLES`(L75)
  - 함수: `list_categories`(L78) · `get_category`(L82) · `add_category`(L86) · `proprietary_schema`(L95) · `make_proprietary_card`(L99) · `validate_taxonomy`(L107)
- **테스트**: `/home/leo/Project/SIASIU/app/tests/test_learned_taxonomy.py`
  - 실행: `python3 app/tests/test_learned_taxonomy.py`
  - 커버: 14개 top-level 존재 · `validate_taxonomy()==[]` · `women_life_stage`=critical+recheck_30d · cosmetics 하위 `proprietary_ingredients` 포함 · proprietary schema의 brand_claims/independent_evidence/evidence_separation 분리 · `make_proprietary_card` 분리 불변식 · Pro-Xylane/Pitera/TECA 예시 등록 · 확장형 add_category · 중복 거부
