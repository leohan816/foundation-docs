# Foundation Stage 2 — Adapter / Injection Structure — 설계서

> 설계 + 구현 train. dev-shadow·additive. 목표: Foundation common framework에 **SIASIU/Cosmile 전용 어휘·정책·페르소나·product schema를 하드코딩하지 않고**, 각 서비스가 **profile을 주입**하도록.
> 원칙: **framework=알고리즘/구조(foundation-control), 어휘/정책/페르소나/schema=service profile 주입.** ★기존 v0.2~T3.5 판단/테스트 **불변**(default profile = 현재 동작 보존). Cosmile/SIASIU/실 KB/LLM/Path A/enforcement = 범위 아님.

## 1. 문제
현재 core.py는 K-뷰티 어휘(`_CATEGORY_KW` 크림/세럼·`_ADVERSE_SOFT` 따가·`_RISK_TAG_KO`·guardrail lexicon)를 **직접 하드코딩**. 이는 SIASIU/Cosmile vertical 어휘가 common framework에 섞인 것. → 다른 도메인/서비스가 재사용 불가, lineage audit의 "복사 아니라 승격" 위반.
→ Stage2: **어휘/정책/라벨을 profile로 외부화**하고, framework 구조(매칭·decision·gate)는 그대로 두되 **profile에서 vocab을 읽는 seam** 제공.

## 2. 분리 (framework vs 주입)
| Foundation common framework (구조·유지) | service profile 주입 (어휘/정책/라벨) |
|---|---|
| category **matching** 알고리즘(substring-safe) | category **lexicon** |
| adverse signal **감지** 구조 | adverse **lexicon** |
| recommendation signal **gate** 구조 | recommend signal **lexicon** |
| retrieval/candidate/grounding **decision** 구조(decide_retrieval) | retrieval **policy**(scope/threshold) |
| guardrail/output_verify/evidence_mode **구조** | guardrail/verify **lexicon** · risk 카테고리 |
| risk tag label **mapping interface**(`_risk_tags_ko`) | risk tag **Korean labels** |

**SIASIU repo-local 주입 대상**: bridge glossary · atom · CANON · SAFETY_TYPES · SEED_KB · PERSONA · TALK_STYLE · domain 목록 · products schema · risk tag Korean labels.
**Cosmile repo-local 주입 대상**: product catalog schema · brand/product metadata · commerce CTA policy · surface copy policy · shopping profile.

## 3. 아키텍처 — Profile + Provider + Seam
- **Profile** = dict. 키별 vocab/policy/label + 확장 slot(bridge_glossary·canon·persona·products_schema 등). 미지정 키 → core 내장 default 사용(behavior 보존).
- **Provider interface**(개념): `lexicon_provider`(category/adverse/recommend/routine 등) · `policy_provider`(retrieval scope/threshold) · `surface_label_provider`(risk_tag_ko·CTA copy). Profile이 이들을 담는 컨테이너.
- **Seam 메커니즘**: `threading.local()` 기반 **per-request active profile**(스레드 안전). `judge()` 진입 시 `payload["service"]`/`["profile"]` → `get_profile(name)` → `set_active_profile`. seam 함수는 `_pget(key, core_default)`로 vocab을 읽음 — **profile 없으면 core default → 기존 동작 동일**.
- **profiles.py**: `DEFAULT_PROFILE`(override 없음=core default) · `SIASIU_PROFILE`(stub: risk_tag_ko·category 확장·bridge/canon/persona slot) · `Cosmile_PROFILE`(stub: catalog schema·commerce CTA·surface copy slot) · `get_profile(name)`.

## 4. seam 적용 지점 (T1/T2/T3/T3.5)
| 함수 | profile key | core default |
|---|---|---|
| `_categories_in`(T1 category) | `category_lexicon` | `_CATEGORY_KW` |
| `_has_adverse_soft`(T1/T3.5 adverse) | `adverse_lexicon` | `_ADVERSE_SOFT` |
| `_explicit_reco_signal`(T1 recommend) | `recommend_extra` | `_RECO_EXTRA`(+core _BROAD/_PURCHASE/_TOPPICK 유지) |
| `_risk_tags_ko`(T3.5 label) | `risk_tag_ko` | `_RISK_TAG_KO` |
| `guardrail_classify`(T3 F4) | `guardrail_lexicons`(injection/internal/payment/politics/offdomain) | `_GR_*` |
| decide_retrieval(T2) | `retrieval_policy`(선택·scope override) | 내장 정책 |
★decision/grounding/verify/evidence **구조 로직은 불변** — vocab만 profile 경유.

## 5. profile switching
- `judge({"query":..., "service":"siasiu"})` → SIASIU profile · `"cosmile"` → Cosmile profile · 미지정/`"default"` → DEFAULT(core 내장). 
- ★default = 현재 동작 → **기존 7개 suite 불변**. 주입 profile은 vocab만 확장/치환.

## 6. 테스트 계획
**회귀 게이트(불변)**: v0.2 40/40·v0.3 16/16·guard 19/19·F1 14/14·T2 16/16·T3 18/18·T3.5 7/7·adversarial 180(decision_integrity=1.0·false_recommendation=0·safety_violation=0).
**Stage2 신규(제안 ~10)**:
1. default profile → 기존 동작 동일(category/adverse/risk_tag_ko 그대로)
2. test profile(category_lexicon에 신규 카테고리 주입) → `_categories_in`/target_category 반영
3. test profile(adverse_lexicon에 신규 형태 주입) → adverse 감지 반영
4. test profile(risk_tag_ko 치환) → answer_summary 라벨 치환
5. test profile(guardrail_lexicons 확장) → guardrail_category 반영
6. SIASIU profile stub 로드 가능·필수 slot 존재(bridge/canon/persona/products_schema/risk_tag_ko)
7. Cosmile profile stub 로드 가능·필수 slot 존재(catalog_schema/commerce_cta/surface_copy)
8. 불변: profile 주입이 decision_type/products/safety 판단을 바꾸지 않음(같은 query, default vs profile → decision 동일·vocab만 표시 차이)
9. 불변: core에 SIASIU-specific hardcoding 증가 0(profile로 외부화·core default는 baseline)
10. thread-safe: 연속 다른 service 호출이 서로 오염 0

## 7. 성공 기준
- 기존 7개 suite 전부 유지 · adversarial 180 유지 · false_recommendation=0 · safety_critical_violation=0 · product recommendation permission invariant 유지.
- Stage2 신규 PASS · **Foundation core에 SIASIU-specific hardcoding 증가 없음**(vocab profile 외부화) · decision/products/판단 불변 · live/write/memory/push=0.

## 8. 소유권
- Profile/provider **framework + DEFAULT/stub** = foundation-control.
- 실 SIASIU profile 내용(bridge/canon/persona/products) = **SIASIU repo-local 주입**(본 train은 stub seam). Cosmile profile 내용(catalog/CTA/copy) = **Cosmile repo-local 주입**(stub seam).

## no_change_assertions (설계 부)
Cosmile 0 · SIASIU 0 · FOUNDATION repo 0 · contract 0 · canonical 0 · LLM/KB 0 · memory 0 · Path A 0 · enforcement 0 · push 0. 구현부는 foundation-control core/profiles + 테스트 + report만.
