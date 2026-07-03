# Foundation Stage 2 — Adapter / Injection Structure (impl) — 2026-06-30

> Stage2 설계서(`설계자료/..._STAGE2_..._DESIGN.md`) 구현. **default-preserving seam** — service profile로 vocab/policy/label 주입, 미지정 시 core 내장 default = 기존 동작 보존.
> 범위: foundation-control core/profiles + 테스트 + report만. ★기존 v0.2~T3.5 판단/테스트 **불변**. Cosmile·SIASIU·실 KB·LLM·Path A·enforcement = 범위 아님.

## changed_files (foundation-control 범위만)
- `foundation_http_service/profiles.py` — **신규**. `Profile` dict 구조 · `DEFAULT_PROFILE`(override 없음) · `SIASIU_PROFILE` stub · `Cosmile_PROFILE` stub · `get_profile`/`register_profile`.
- `foundation_http_service/core.py` — `threading.local()` per-request active profile · `set_active_profile`/`_active_profile`/`_pget` seam · seam 함수(`_categories_in`·`_has_adverse_soft`·`_explicit_reco_signal`·`_risk_tags_ko`·`guardrail_classify`)를 `_pget(key, core_default)` 경유로 전환 · judge()가 `payload.service/profile`로 profile resolve · `service_profile` 출력. ★**새 K-뷰티 하드코딩 0**(seam만 추가).
- `scripts/foundation_stage2_profile_injection_test.py` — 신규(10 checks).
- 본 report md/json.

## 구조 (framework vs 주입)
- **Foundation common framework(구조·유지)**: category matching(substring-safe) · adverse 감지 · recommend gate · retrieval/grounding decision · guardrail/verify/evidence 구조 · risk tag label mapping interface(`_risk_tags_ko`).
- **service profile 주입(어휘/정책/라벨)**: `category_lexicon`·`adverse_lexicon`·`recommend_extra`·`risk_tag_ko`·`guardrail_lexicons`(+retrieval_policy seam). 미지정 → core default.
- **SIASIU 주입 slot(stub)**: bridge_glossary·atoms·canon·safety_types·seed_kb·persona·talk_style·domain_list·products_schema·risk_tag_ko.
- **Cosmile 주입 slot(stub)**: product_catalog_schema·brand_metadata·commerce_cta_policy·surface_copy_policy·shopping_profile.

## seam 메커니즘
- `threading.local()` 기반 per-request active profile(스레드 안전·요청 간 오염 0).
- `judge()` 진입 → `profiles.get_profile(payload.service|profile)` → `set_active_profile`. seam 함수는 `_pget(key, core_default)`로 vocab 조회.
- **default(미지정)** → `DEFAULT_PROFILE`(override 없음) → `_pget`이 core 내장 default 반환 → **기존 동작 완전 동일**(7개 suite 불변).
- 직접 함수 호출(테스트의 `core.guardrail_classify` 등)도 profile 미설정 → default → 동일.

## 동작 확인 (라이브/in-process)
| query | default | 주입 profile |
|---|---|---|
| 레티놀은 뭐야? (risk_tag_ko) | "안전 신호(활성 성분 주의)…" | "안전 신호(**성분 특별 주의(주입)**)…" |
| 밤 추천해줘 (category_lexicon) | target_category=**[]** | target_category=**['balm']** |
| 찌릿한데 추천(adverse_lexicon) | adverse 아님 | **adverse_or_safety·제품0** |
| 내맘대로해(guardrail) | none/allow | **prompt_injection** |
★**decision/products/safety 판단은 profile 무관 동일**(미백 추천 default vs cosmile → decision·products·safety 동일).

## 성공 기준 — 전부 충족
| suite | 결과 |
|---|---|
| v0.2 / v0.3 / guard | **40/40 · 16/16 · 19/19** |
| F1 / T2 / T3 / T3.5 | **14/14 · 16/16 · 18/18 · 7/7** |
| **Stage2 신규** | **10/10** |
| adversarial 180 | decision_integrity=**1.0** · false_recommendation=**0** · safety_critical_violation=**0** · intent_gap=**0** |
| **Foundation core SIASIU-specific hardcoding 증가** | **0** (core diff에 신규 K-뷰티 어휘 0 — seam만) |
| decision/products/response_plan/guard/T1~T3.5 판단 | **불변** |
| live/write/memory/push | **0** |

## 불변식 (test)
- default profile = override 없음(category_lexicon/risk_tag_ko=None) → core baseline(test 9).
- profile 주입이 decision/products/safety 판단 불변(test 8).
- thread isolation: siasiu→default→cosmile→test_inject→default 번갈아 호출 → 각자 정확(test 10).

## no_change_assertions
- 구현 = **foundation-control/foundation_http_service only**(core seam + profiles 신규).
- Cosmile 0 · SIASIU 0 · FOUNDATION repo 0 · contract 0 · canonical 0 · products 추천 로직 0 · F7/F8 0 · LLM 0 · KB/retrieval 0 · memory write 0 · Path A 0 · enforcement 0 · **push 0**.
- ★profiles.py의 SIASIU/Cosmile profile은 **stub(주입 구조 시연)** — 실 vocab/persona/schema는 각 repo-local 주입(본 train 미주입).

## next_train
- **실 profile 주입**: SIASIU repo-local이 bridge_glossary/canon/persona/products_schema를 profile로 주입(control이 계약, SIASIU 구현). Cosmile도 catalog/CTA/copy 주입.
- T4 Composer+LLM Router · F2 실 KB · enforcement train — Leo 판단.
