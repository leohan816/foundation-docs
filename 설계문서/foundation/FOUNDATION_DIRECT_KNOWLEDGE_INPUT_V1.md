# Foundation Direct Knowledge Input Pipeline v1

> 직접 입력한 자료(텍스트·유튜브·PDF·웹·일일업무보고 등)를 **learned candidate**로만 적재하는 결정론 파이프라인.
> 구현: `app/knowledge_input.py` · 정책: `app/source_policy.py` · 점수: `app/confidence_model.py` · 추임새/근거추적: `app/answer_provenance.py`

---

## 0. 한 줄 요약과 역할 분리

이 파이프라인은 "들어온 자료를 곧바로 지식으로 믿지 않는다"를 코드로 강제한 장치다. 입력은 무조건 후보(candidate)로만 떨어지며, 어떤 경로로도 canonical(확정 지식)에 자동으로 쓰여지지 않는다.

| 주체 | 역할 | 이 파이프라인에서의 권한 |
|------|------|--------------------------|
| **DeepSeek** | 후보 생성자 · 표현 생성자 · 요약자 | claim 초안/분할/표현만. **단독 확정 금지** (코드에서 분할·분류는 결정론으로 재검증) |
| **Opus** | Leo가 승인한 판단 규칙에 따른 자동 reviewer | policy review 단계에서 source routing·confidence·conflict 규칙으로 대량 심사 |
| **Leo** | system builder | 개별 지식이 아니라 `source_policy`/`confidence_model`의 **판단 규칙(정책)** 을 승인 |

핵심 불변식(모듈 docstring 명시):
- `raw_only`는 claim을 생성하지 않는다.
- conflict는 기존 지식을 **삭제하지 않고** history로 남긴다.
- 자동 승격(auto promotion) 금지.
- DeepSeek 단독 확정 금지.
- candidate governance(`promotion_ready=False` 등) 유지.

---

## 1. 8개 입력 타입 (`INPUT_TYPES`)

`knowledge_input.py`의 `INPUT_TYPES` 상수(8개)와 `_RAW_FIRST` 집합으로 정의된다.

| # | input_type | 설명 | raw/intake 우선(`_RAW_FIRST`) | claim 생성 |
|---|------------|------|:----------------------------:|:----------:|
| 1 | `plain_text` | 사용자가 붙여넣은 일반 텍스트 | ✗ | ○ |
| 2 | `youtube_transcript` | 유튜브 자막/전사 | ○ | ○ |
| 3 | `pdf` | PDF 문서 | ○ | ○ |
| 4 | `uploaded_file` | 업로드 파일(문서/이미지 등) | ○ | ○ |
| 5 | `web_url` | 웹 URL 본문 | ○ | ○ |
| 6 | `daily_work_report` | 일일 업무 보고 | ✗ | ○ |
| 7 | `manual_claim` | 사람이 직접 입력한 단일 주장 | ✗ | ○ |
| 8 | `raw_only` | **보존 전용** (claim 미생성) | ○ | ✗ |

> `_RAW_FIRST = {"pdf", "uploaded_file", "youtube_transcript", "raw_only", "web_url"}`
> 이 5종은 원문을 `intake/raw`에 먼저 보존한 뒤에야 후속 단계를 밟는다(원문 유실 방지·재처리 가능).
> `intake_raw()`의 `produces_claim`은 `input_type != "raw_only"`로 결정된다 → `raw_only`만 `False`.

---

## 2. 사용자 명령 예시

파이프라인은 `process(...)` 단일 진입점으로 호출한다. 명령(자연어)과 호출 매핑 예시:

| 사용자 명령(자연어) | 매핑 호출 |
|---------------------|-----------|
| "이 유튜브 자막에서 성분 정보 정리해줘" | `process("youtube_transcript", transcript, source_type="youtube", url=..., existing_index=idx)` |
| "이 PDF는 일단 원문만 보관해" | `process("pdf", text, source_type="uploaded_file", existing_index=idx)` → raw 우선 |
| "이건 분석하지 말고 그냥 저장만" | `process("raw_only", text, existing_index=idx)` → `raw_only_stop` |
| "이 주장 등록해: 이 성분은 모발에도 좋을 수 있다" | `process("manual_claim", text, source_type="blog", hint="cosmetic_function", uncertain_but_useful=True, existing_index=idx)` |
| "이 기사(리콜) 반영" | `process("web_url", text, source_type="news", url=..., published_at=..., region=..., existing_index=idx)` |
| "오늘 업무 보고 반영" | `process("daily_work_report", text, source_type="brand_official", existing_index=idx)` |

`process` 시그니처 주요 인자: `input_type, content, source_type, url, fields, hint, existing_index, published_at, region, created_at, uncertain_but_useful, new_claim_meta`.
`input_type`이 `INPUT_TYPES`에 없으면 `{"error": "unknown_input_type"}` 반환.

---

## 3. 14단계 파이프라인

`process()`가 오케스트레이션하는 전체 흐름. 모듈 docstring의 흐름에 reindex/provenance를 명시 단계로 펼친 14단계다.

| 단계 | 이름 | 함수 / 모듈 | 핵심 산출·규칙 |
|:----:|------|-------------|----------------|
| 1 | intake / raw | `intake_raw()` | `{_kind:"raw_intake", stored:"intake/raw", produces_claim}`. `raw_only`/`pdf` 등은 여기서 끝날 수 있음 |
| 2 | source_card | `make_source_card()` | `source_type→tier(1/2/3)`, `quality=SOURCE_QUALITY.get(type, 20)` |
| 3 | claim split | `split_claims()` | 문장/불릿 경계 정규식 분할, **길이 ≥4**만 채택. (실제론 DeepSeek 표현, 여기선 결정론 재분할) |
| 4 | classify | `classify_claim_type()` | `hint`이 `CLAIM_TYPES`에 있으면 우선, 아니면 키워드 규칙, 미일치 시 `cosmetic_function` |
| 5 | source routing | `route_validate()` → `sp.can_confirm()` | 이 source로 이 claim을 **확정 가능한가** `{ok, reason, blocking}` |
| 6 | existing search | `search_existing()` | candidate 전 **필수**. `existing_index` 누락 시 `ValueError` |
| 7 | merge / conflict | `merge_decision()` | 7종 결과. conflict는 **기존 보존**(`keep_old=True`)+history |
| 8 | confidence | `cm.score_claim()` | 6개 부분점수 + `final_confidence_score`(0–100) |
| 9 | candidate | `make_learned_candidate()` | learned claim 후보 생성 + governance 강제 |
| 10 | policy review | `cm.answer_mode()` + `process` 보정 | min_conf 미달·고위험·routing 불가 → 단정 억제 |
| 11 | learned 저장 여부 | `process` 분기 | `layer="learned"`로만 적재. canonical과 분리 |
| 12 | reindex | governance 플래그 | `index_default=False` → **기본 색인 제외**(검수 후에만 노출) |
| 13 | provenance | `answer_provenance` | source_urls·evidence_score·answer_mode를 내부 trace로. 금지표현 차단 |
| 14 | recheck | `cm.recheck_cycle()` | claim_type별 재점검 주기 부여(강한/고위험일수록 짧게) |

`process` 반환 `rec`의 `stage`는 `intake → (raw_only_stop | candidates_ready)`로 전이한다.

### 3-1. claim split 규칙 (3단계)
분할 정규식: `(?<=[.!?。])\s+|[\n•·\-]\s*`. 마침표/물음표/느낌표/。 뒤 공백, 또는 줄바꿈·불릿(`• · -`) 경계로 자른 뒤 **trim 후 4자 미만은 버린다**. 빈 텍스트는 `[]`.

### 3-2. classify 키워드 규칙 (`_RULES`, 4단계)
`hint`이 `CLAIM_TYPES`에 들면 그대로 채택. 아니면 소문자화 후 아래 순서로 첫 매칭:

| 트리거 키워드 | claim_type |
|---------------|------------|
| 임산부 / 임신 / 수유 / 태아 / 모유 | `pregnancy_lactation_safety` |
| 청소년 / 미성년 / 10대 | `teen_safety` |
| 치료 / 완치 / 질환 / 질병 / 병을 | `medical_claim` |
| 복용량 / 용량 / 하루 권장 / `mg ` | `supplement_dosage` |
| 시술 / 레이저 / 보톡스 / 필러 | `aesthetic_procedure` |
| 전성분 / 성분표 / ingredients list | `product_ingredient_list` |
| 출시 / 발표 / 신제품 공개 / 리콜 | `breaking_news` |
| 트렌드 / 유행 / 인기 / 급상승 | `market_trend` |
| 자외선 / 날씨 / uv / 기온 / 미세먼지 | `weather_dynamic_context` |
| 가격 / 재고 / 품절 / 할인 | `price_stock_snapshot` |
| inci / 별칭 / 이명 | `inci_alias` |
| (미일치) | `cosmetic_function` |

---

## 4. `raw_only` / `pdf`는 raw·intake 우선

원문 보존이 첫 의무다.

- **`raw_only`**: `intake_raw`만 수행 후 즉시 종료. `rec["stage"]="raw_only_stop"`, `note="raw 보존만 — claim 미생성"`, `candidates` 비어 있음. `produces_claim=False`.
- **`pdf` 등 `_RAW_FIRST` 5종**: `rec["raw_first"]=True`, `raw_intake.stored="intake/raw"`로 원문을 먼저 적재한 뒤 source_card·claim 단계로 진행. 원문이 항상 남아 재처리·증빙이 가능하다.

> 이유: 입력 자료는 잘못 분할/요약될 수 있으므로, **요약본이 아니라 원문**을 진실의 기준으로 남긴다.

---

## 5. merge 결과 7종 (`MERGE_RESULTS`)

`merge_decision(new_claim, existing_matches)`가 내는 결과. **모든 경우 `keep_old=True`** — 기존 지식은 절대 삭제하지 않는다. 변수: `nv/ev`(값), `nd/ed`(방향 same|oppose), `ns/es`(evidence_score), `nage/eage`(age_days).

| 결과 | 트리거 조건 | history | keep_old |
|------|-------------|:-------:|:--------:|
| `new` | 매칭된 기존 지식 없음 | — | ○ |
| `conflict` | 방향 불일치(`nd!=ed`) **또는** 값이 다르고 한쪽이 `oppose` | 기록(old + new_evidence) | ○ (★삭제 금지) |
| `duplicate` | 값·방향 동일(`nv==ev and nd==ed`) | — | ○ |
| `supersede` | 새 근거가 훨씬 높음(`ns >= es+25`) | 기록("new evidence 훨씬 높음") | ○ |
| `enrich` | 새 근거가 더 높음(`ns > es`) | 기록("보강") | ○ |
| `obsolete` | 새 입력이 더 오래됐고 값이 다름(`nage>eage and nv!=ev`) | 기록("새 입력이 더 오래됨") | ○ |
| `needs_review` | 위 어디에도 확정 안 됨(기본값) | — | ○ |

> conflict 발생 시 즉시 return하여 다른 판정으로 덮어쓰지 않는다. 충돌은 "정리해야 할 사실"로 남기고 사람이 본다.

---

## 6. learned candidate governance

`make_learned_candidate()`가 생성하는 모든 후보는 아래 거버넌스 플래그를 **강제**로 갖는다(`learning_candidate`와 동일 불변식). canonical과 물리적으로 분리된 `layer="learned"`에만 적재된다.

| 필드 | 고정값 | 의미 |
|------|--------|------|
| `status` | `"candidate"` | 후보일 뿐 확정 지식 아님 |
| `promotion_ready` | `False` | 승격 준비 안 됨(자동 승격 금지) |
| `reviewed_by` | `None` | 아직 사람/reviewer 검수 전 |
| `canonical_write` | `False` | canonical 쓰기 금지 |
| `index_default` | `False` | 기본 색인 제외(검수 전 노출 안 함) |
| `layer` | `"learned"` | learned 레이어에만 존재 |

후보의 나머지 핵심 필드: `claim`, `claim_type`, `source_cards`, `source_urls`, `scores`, `evidence_score(=final_confidence_score)`, `answer_mode`, `merge_result`, `recheck_cycle`, `created_at`, 그리고 `process`가 덧붙이는 `routing_ok`, `routing_reason`, `merge`.

### 6-1. answer_mode 결정 (`cm.answer_mode`) 및 보정
`ANSWER_MODE = (assertive, grounded, cautious, uncertain, cannot_determine)`.

| 조건 | answer_mode |
|------|-------------|
| `final < 30` (그리고 min_conf 미달) | `cannot_determine` |
| `min_conf` 미달이지만 `final ≥ 30` | `uncertain` |
| **고위험** claim & Tier1 보유 & `final ≥ 85` | `grounded` |
| **고위험** claim (그 외) | `cautious` (절대 assertive 금지) |
| `final ≥ 85` | `assertive` |
| `final ≥ 70` | `grounded` |
| `final ≥ 50` | `cautious` |
| 그 외 | `uncertain` |

`cm`의 고위험군 `HIGH_RISK`: `pregnancy_lactation_safety, teen_safety, medical_claim, functional_medicine_claim, supplement_dosage, cosmetic_safety`.

추가 보정 두 가지:
1. **불확실하지만 반복질문 가치(원칙7)**: `uncertain_but_useful=True`이고 mode가 `cannot_determine`이면 → `uncertain`으로 저장(버리지 않고 다시 물을 가치로 남김).
2. **routing 불가 시 단정 억제(원칙10)**: `routing_ok=False`인데 mode가 `assertive/grounded`면 → `cautious`로 강제 하향. (예: Tier3 블로그만으로 `medical_claim` 확정 시도)

### 6-2. recheck 주기 (`cm.recheck_cycle`, 8·14단계)
`RECHECK = (stable, recheck_30d, recheck_90d, recheck_180d, recheck_on_new_evidence)`. 강한/고위험 claim일수록 짧게(원칙8).

| 분류 | 주기 |
|------|------|
| dynamic / `breaking_news` / `price_stock_snapshot` / `weather_dynamic_context` | `recheck_on_new_evidence` |
| `pregnancy_lactation_safety` (또는 critical) | `recheck_30d` |
| 그 외 고위험·강한 claim(high) | `recheck_90d` |
| trend 그룹 | `recheck_30d` |
| low risk | `recheck_180d` |
| 기본 | `recheck_90d` |

---

## 7. 기존 지식 검색은 candidate 생성 전 **필수**

`search_existing(claim_key, existing_index)`는 `existing_index`가 `None`이면 `ValueError("existing_index required before candidate")`를 던진다. 즉 **기존 지식을 검색하지 않고는 후보를 만들 수 없다.** 이는 merge/conflict 판정의 전제이며, 같은 사실을 중복 학습하거나 모르고 충돌시키는 것을 막는다.

`process`는 `existing_index`가 주어지지 않으면 빈 리스트(`[]`)를 명시적으로 넘겨, "검색은 했고 매칭이 없었다(=`new`)"를 보장한다. 검색 자체를 건너뛰지 않는다.

---

## 8. source routing 정책 (확정 가능 여부)

`sp.can_confirm(claim_type, source_types, fields)`가 routing을 판정한다(원칙10: source 적합성은 claim_type에 따라 다르다). 규칙:
1. `disallowed_sources` 제외 후 `allowed ∪ required`에 드는 출처가 **1개 이상** 필요(없으면 `no_allowed_source`).
2. **고위험 claim**(`HIGH_RISK_CLAIMS`)은 `required_sources`(강한 출처) 중 최소 1개 필수(없으면 `missing_required_source`).
3. `required_fields`(예: 뉴스 `published_at`, 날씨 `region/time`) 미충족 시 `missing_fields:...`.
4. `auto_promote_allowed`는 모든 정책에서 **항상 False**(사람 검수).

### 8-1. source tier · 기본 품질(`SOURCE_QUALITY`)

| Tier | source_type (quality) |
|------|------------------------|
| **Tier1** | regulatory(95) · pharmacopeia(92) · academic_paper(90) · clinical_study(88) · professional_org(85) · safety_db(88) |
| **Tier2** | package_label(75) · brand_official(70) · manufacturer(70) · official_mall(65) |
| **Tier3** | platform_data(55) · news(50) · search_data(50) · commerce(45) · blog(30) · youtube(30) · influencer(30) · social(25) |
| 특수 API | weather_api(85) · price_api(75) |
| 미정의 | `unknown`(20) — `SOURCE_QUALITY.get(type, 20)` |

### 8-2. claim_type별 routing 요약(대표)
`source_policy.POLICY` 21개 claim_type 중 핵심. (★는 원칙10 직접 구현)

| claim_type | required(강한 출처) | disallowed(확정 금지) | min_quality / min_conf | 기본 mode |
|------------|---------------------|------------------------|:----------------------:|-----------|
| `medical_claim` ★ | academic_paper·clinical_study·professional_org·regulatory | news·blog·youtube·influencer·social·commerce·brand_official | 85 / 80 | cautious |
| `pregnancy_lactation_safety` ★ | regulatory·clinical_study·professional_org | brand_official·commerce·blog·youtube·…·news | 85 / 80 | cautious |
| `cosmetic_safety` | regulatory·safety_db·academic_paper | blog·youtube·influencer·social·commerce | 75 / 70 | cautious |
| `supplement_dosage` | regulatory·academic_paper·professional_org | blog·youtube·influencer·social·commerce | 80 / 75 | cautious |
| `market_trend` ★ | platform_data·search_data·news·commerce | **academic_paper** | 40 / 40 | grounded |
| `breaking_news` | news | blog·social | 50 / 45 | grounded |
| `product_ingredient_list` | brand_official·package_label·official_mall | blog·youtube·social·news | 65 / 60 | grounded |
| `regulation` | regulatory | blog·youtube·social·commerce | 90 / 85 | grounded |

> 해석: 건강(의료/안전)을 뉴스·블로그·유튜버로 **확정 불가**, 시장 트렌드를 **논문(academic_paper)으로 판단 불가**. `source_policy`의 고위험군 `HIGH_RISK_CLAIMS`: cosmetic_safety · pregnancy_lactation_safety · teen_safety · medical_claim · functional_medicine_claim · supplement_dosage · aesthetic_procedure · regulation.

---

## 9. confidence 점수 모델 (8단계)

`cm.score_claim()`이 6개 부분점수와 최종점수를 낸다. `SCORE_FIELDS`:

| 점수 | 산출 | 비고 |
|------|------|------|
| `source_quality_score` | source_types 중 `max(SOURCE_QUALITY)` | 출처 일반 신뢰도 |
| `claim_support_score` | 지지비율 × 강도(0–100) | 근거가 claim을 얼마나 뒷받침 |
| `domain_fit_score` | `source_type × claim_group` 적합표 최대값 | ★뉴스×의료=낮음, 논문×트렌드=낮음 |
| `source_diversity_score` | 고유 출처·tier 다양성 | 단일 출처면 낮음 |
| `freshness_score` | age_days × claim_group | dynamic/trend/news는 급락, science/fact는 완만 |
| `conflict_penalty` | `min(60, 20×n_conflicts)` | 충돌 시 차감 |

**최종 결합식**: `final = 0.30·quality + 0.25·support + 0.20·domain_fit + 0.15·diversity + 0.10·freshness − conflict_penalty`, 0–100로 클램프. `process`에서 merge 결과가 `conflict`면 `n_conflicts=1`로 점수에 반영된다.

> domain_fit는 "좋은 출처라도 claim_type에 안 맞으면 낮춘다"를 구현 — 예: `academic_paper`의 trend 적합도 15, `news`의 medical(science) 적합도 22. 강한 claim일수록 더 높은 evidence를 요구(원칙8)하는 게이트가 `min_conf`와 결합해 작동한다.

---

## 10. provenance / 보안 (13단계 + 보안 원칙)

- **provenance trace**(`answer_provenance.build_trace`): `source_layer · evidence_score · source_urls · reviewed_by · last_verified_at · answer_mode · claim_type`를 내부 추적용으로 보관(사용자 비노출).
- **금지 표현 차단**(`FORBIDDEN_PHRASES`): "저장된 검증 지식", "내 데이터베이스", "DB에 저장된", "학습된 지식에 따르면" 등 시스템 내부를 노출·과신시키는 표현은 사용 금지. `select_phrase`가 자연스러운 추임새로 대체.
- **보안 불변식**: canonical write 금지 · DeepSeek 단독 확정 금지 · health/pregnancy 자동 확정 금지 · 키/secret 미출력.

---

## 11. 안전 시나리오 검증(코드 기준)

| 시나리오 | 입력 | 결과(코드 보장) |
|----------|------|-----------------|
| 유튜버가 성분 효능 주장 | `youtube_transcript`, source=youtube | candidate로만, answer_mode는 cautious/uncertain 등 (assertive 불가) |
| PDF 원문 | `pdf` | `raw_first=True`, `intake/raw` 우선 보존 |
| 보존 전용 | `raw_only` | `raw_only_stop`, claim 0개 |
| 기존검색 누락 | `search_existing(k, None)` | `ValueError` |
| 임신/레티놀 충돌 | oppose 방향 | `conflict` + history, 기존 삭제 안 함 |
| 불확실하지만 유용 | manual_claim + `uncertain_but_useful` | `cautious/uncertain`으로 저장 |
| 블로그로 의료 주장 | `medical_claim`, source=blog | `routing_ok=False` + cautious 이하 강제 |

---

## 12. 구현 파일 · 테스트

**구현 파일**
- `app/knowledge_input.py` — 본 파이프라인(intake/raw → … → recheck, `process` 오케스트레이션, `INPUT_TYPES`, `MERGE_RESULTS`, `_RAW_FIRST`, governance)
- `app/source_policy.py` — source routing 정책(`POLICY`, `can_confirm`, `SOURCE_QUALITY`, TIER1/2/3, `CLAIM_TYPES`, `HIGH_RISK_CLAIMS`)
- `app/confidence_model.py` — 점수화(`score_claim`, `answer_mode`, `recheck_cycle`, `SCORE_FIELDS`, `ANSWER_MODE`, `RECHECK`)
- `app/answer_provenance.py` — 추임새/근거추적(`compose`, `build_trace`, `FORBIDDEN_PHRASES`, `SOURCE_LAYER`)

**테스트**
- `app/tests/test_knowledge_input.py` — 실행: `python3 app/tests/test_knowledge_input.py`
  검증: 8개 입력 타입 · youtube source_card/claim 분할 · pdf raw_first · raw_only 무생성 · 기존검색 필수(None→예외) · conflict 보존(keep_old+history) · duplicate/supersede/new · 불확실 유용 저장 · candidate governance 6필드 · 의료+블로그 routing 불가·cautious 강제.
