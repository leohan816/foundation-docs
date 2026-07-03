# SIASIU PRISM 설계서 — 제품 레코드 인테이크·표면 매핑
### *Product Record Intake & Surface Mapping*

> **버전 v0.2 · 2026-06-25** (Leo 승인 — raw_file 원본 → 구조화 상품 레코드 분해)
> **PRISM:** 원본 한 장(백색광) → 전처리(프리즘) → *검색·인간적 제목·텍스트 상세·AI 음성 피치·조합 추천·구매후 가이드*(스펙트럼). 한 레코드가 모든 표면을 먹인다.
> 직원은 **클린 원본(intake md)** 만 넣고, Claude Code가 읽어 **Foundation Product Core 구조**로 분해한다.
> 정본 참조: `SIASIU_커머스_쇼핑몰_설계서.md` §3c(한 레코드가 검색·제목·상세·음성피치·추천·구매후가이드를 다 먹임) · `SIASIU_현지화_설계서.md`(core/locale/source/schema) · 볼트 `products/_schema.yaml`.
>
> **변경이력**
> - v0.2 (2026-06-25) — §4.1 제품 정체성·명명 표준(id 불변 ≠ 이름·`{brand}-{type}-{line_key}-{seq}`·폴더=id·current_slug/name_history) + §4.2 생애주기(리뉴얼·product_version_id·sku_id) + `_brand.yaml`/`_product_index.yaml`. ELT 적용 완료.
> - v0.1 (2026-06-25) — 최초. Leo 4개 고정결정 반영(tags·claims분리·offers분리·assessment) + ssbrain 소비자 호환.

---

## 0. 한 줄
**`raw_file` = 사람이 넣는 원본 대기실 · `products` = AI가 쓰는 구조화 레코드.** 버리는 게 아니라, 현재 모놀리식 `core.yaml`을 *역할별로 분해* + 빠진 것(claims·coverage·assessment·processing) 추가 + 얇은 locales를 채운다.

## 1. 흐름
```
raw_file/{BRAND}/{제품}_intake.md          직원이 넣는 클린 원본 (분석·판단·번역 ❌)
        │  Claude Code 전처리 (읽기→slug→폴더→분해→매핑→검증)
        ▼
products/{brand_slug}/{product_slug}/
  source/md1_product_intake.md             원본 100% 보존 (되돌아갈 기준)
  core.yaml         claims.yaml            ingredients.yaml   offers.yaml
  coverage.yaml     assessment.yaml(또는 processing/assessment_notes.md)
  locales/{ko,zh,en}.yaml
  processing/{ingredient_mapping,claim_extraction,translation_review}_report.md · todo.md
```

## 2. ★확정 결정 (Leo 2026-06-25 — 빌드 전 고정)
1. **tags는 core에 유지** — `func/concern/suitable/safety/cert/use_time`은 검색·필터·추천·"이런 분께"·상담의 spine. 빼면 안 됨.
2. **claims.yaml ≠ claims_control** — claims.yaml = *브랜드가 주장한 것*(분해·검증대기) / claims_control = *우리 표현 가드레일(허용/금지)* → **core에 유지**.
3. **volatile → offers.yaml 분리** — pricing/shipping/gift는 자주 변함 → core(canonical spine)에서 빼낸다. (Foundation canonical ↔ Cosmile commerce overlay 분리와 일치.)
4. **fmNote/정직노트 → 별도 위치** — 브랜드 claim도·번역도·judge verdict도 아닌 *우리 해석/상담 메모.* 처음엔 `processing/assessment_notes.md`, 나중에 `assessment.yaml`로 승격.
5. **coverage.yaml = 필수** — source 정보 유실 방지(clean-not-compress의 기계적 보증).

## 3. 파일별 역할 + 스키마 (현재 대비)
### 3.1 원본 = `raw_file/{BRAND}/<intake>.md` (★단일 원본 · per-product source/ 복사 ❌ — Leo 2026-06-25 dedup)
- **원본은 `raw_file/{BRAND}/` 중앙 인박스에만**(단일 진실원천). 직원 intake 포맷(## 0 메타 · 1 출처 · 2 제품설명 · 3 수치 · 4 사용법 · 5 주의 · 6 전성분(순서) · 7 확인필요 · 8 처리상태 · 9 메모). 분석·판단·번역 ❌, 보존 ✅. *문제 시 되돌아갈 기준.*
- **products는 복사본을 두지 않고 `core.source.raw_file` 포인터로 참조**(중복 제거). `parse_product_prism`이 그 포인터(vault상대경로)에서 본문을 읽어 **prose 청크로 색인**(검색자산·룰 #13). raw_file 없으면 per-product `source/`로 fallback.
- (구: 각 제품에 `source/raw.md` 복사본 — dedup으로 `_archive/product_sources/`로 이동. 원본은 raw_file에 보존.)

### 3.2 `core.yaml` — 언어중립 spine
- **유지(현재서):** `product_id·brand_id·status·lang_origin·canonical_names{brand,product:3언어}·category·spec·tags{func,concern,suitable,safety,cert,use_time}·claims_control{allowed,forbidden}·version`
- **추가:** `relations{source_intake, claims, ingredients, offers, locales, assessment}` (파일 연결), `data_status{detail_page_included, ingredients_included, ingredient_order_preserved, human_review_needed}`
- **빼냄:** `ingredients_core`→ingredients.yaml · `volatile`→offers.yaml
- **금지:** 긴 마케팅 문장·특정언어 문장.

### 3.3 `claims.yaml` — 브랜드 주장 분해 (신규)
- 상세페이지의 모든 주장을 claim 단위로. 각 claim: `claim_id · source_ref(필수) · claim_type(functional|clinical_numeric|ingredient_amount|sensory|cert) · original_language · original_text · (수치류: metric/value/unit/duration/test_condition) · verification_status(source_claim|brand_claim_unverified) · localizable`
- **★source_ref 컨벤션 (Leo 2026-06-25 — dedup 반영):** `source_ref`는 **실제 원본 = `core.source.raw_file` 경로 + `#섹션`**을 가리킨다. 예: `raw_file/ELT/...intake.md#2.4`. *옛 논리앵커 `source/md1_product_intake.md#X`는 dedup 후 존재하지 않는 경로라 금지* (source/ 복사본은 §3.1 dedup으로 제거됨). = 추적 시 실제 파일로 바로 감.
- **불변:** source_ref 없는 claim 생성 ❌ · 브랜드 claim을 검증된 사실로 승격 ❌.

### 3.4 `ingredients.yaml` — 전성분 + atom 매핑 (현재 core서 분리)
- `ingredient_source{source_ref, source_type, source_language, order_preserved, complete}` + `ingredients[{order, raw_name, atom, mapping_status(mapped|needs_review|unmapped), flags[functional_*/fragrance_allergen/...], evidence?}]`
- **불변:** 순서 보존 · raw_name 보존 · 미매핑은 `mapping_status: needs_review`. ★atom = 성분 레지스트리(현재 285개) 연결 = judge가 읽는 데이터.

### 3.5 `offers.yaml` — 판매 조건 (현재 core.volatile서 분리)
- `sales_status · price{currency,list_price,sale_price,updated_at} · availability{stock_status} · shipping{ship_from,lead_time,restrictions} · promotion{gifts,bundle}`. 없으면 null/unknown. (Cosmile 운영데이터.)

### 3.6 `locales/{ko,zh,en}.yaml` — 언어별 표시 (현재 얇음 → 채움)
- **동일 key 필수**(앱 렌더링·즉흥번역 ❌). `lang · status · display{brand_name,product_name,short_name,subtitle} · sections{hero{headline,badges},benefits} · usage{steps} · cautions[] · (추후)voice_pitch_text · post_purchase_guide`
- 수치는 core/claims가 원천 — locale은 *문장만.*

### 3.7 `coverage.yaml` — 유실 추적 (신규·필수)
- `source_file · source_checksum · coverage{section_N{extracted_to[파일들], status, note?}}`. **status ∈ {`covered` · `partial`(원본 일부만·억지 작성 ❌) · `intentionally_unstructured`(의도적 비구조화) · `missing_in_source`(원본 자체 미보유)}.** ★모든 섹션이 *추적*되면 통과 — *미추적*만 실패(원본이 부분/미보유면 정직히 partial/missing_in_source).

### 3.8 `assessment.yaml` (또는 `processing/assessment_notes.md`) — 우리 정직 해석층
- `assessment{status:candidate · source_basis[claims,ingredients,ingredient_registry] · notes[{note_id,type:honest_context,topic,text_ko,usable_for_answer:true,usable_for_judge:false}]}`
- = fmNote("효과 논란 있음"까지 정직)의 집. **usable_for_judge=false**(judge 강근거 ❌·표현/상담용).

### 3.9 `processing/*.md` — 전처리 감사 로그
- `ingredient_mapping_report.md`(매핑/미매핑) · `claim_extraction_report.md` · `translation_review_report.md` · `todo.md`.

## 4. 전처리 6단계 (Claude Code)
1. `raw_file/{BRAND}/*.md` 읽기 → 2. **표준 product_id 생성(§4.1)** → 3. `products/{brand}/{product_id}/` 폴더 → 4. 원본을 `source/md1_product_intake.md`로 복사(보존) → 5. core/claims/ingredients/offers/locales/coverage/assessment 생성 → 6. processing 리포트 + 검증.

### 4.1 ★제품 정체성·명명 표준 (id 불변 ≠ 이름 — 성분 §1.5에 대응)
**핵심 원칙: 상품명 = 바뀌는 표시값 · `product_id` = 안 바뀌는 정체성.** 개명·번역·마케팅명 변경·플랫폼별 이름차에도 **폴더·id 불변** → 못 찾거나 중복 생성 방지. (id는 불변이되 *완전 불투명할 필요는 없다* — Vault에선 *의미있는 안정 id*가 최선.)
- **`product_id = {brand}-{type}-{line_key}-{seq}`** (소문자·하이픈 · **폴더명 = product_id 100% 일치 · 풀네임 slug 금지**).
  - `brand`=브랜드 slug · `type`=제형(cream·serum·essence·toner·sunscreen·mask·pad·cleanser) · `line_key`=라인/안정 핵심키 · `seq`=2자리 순번(소스 pid 있으면 그 번호).
  - 예: `elt-cream-vpdrn-01` · `skin1004-cream-brightening-15` · `cosrx-serum-snail-01`.
  - ★`line_key`는 **짧고 안 바뀌는 것** — 좋음: vpdrn·cica·snail·retinol·brightening / 나쁨: nourishing-prep-cream·time-layered-elastic-firming (길고 잘 바뀜·마케팅 풀네임 ❌).
- **이름은 core.yaml에서 관리**(폴더·id ❌): `current_slug`(사람 힌트) · `canonical_names.product{ko,en,zh}`(현재명) · `name_history[]`(개명 추적: value·lang·status[original|renamed]·source_ref·first_seen).
- **브랜드 폴더 메타:** `_brand.yaml`(brand_id·brand_slug·brand_names) + `_product_index.yaml`(product_id ↔ folder ↔ current_name·status — 기계·사람 둘 다 찾기). core.yaml `product_id` ↔ 폴더명 ↔ ssbrain doc_id 모두 동일.

### 4.2 생애주기 — 리뉴얼·버전·SKU
- **같은 product_id 유지** (정체성 불변): 상품명·상세문구·가격·증정·패키지·슬로건·채널별 이름차 변경 → `version`↑·`name_history`/offers/claims 업데이트.
- **`product_version_id` 추가** (포뮬러 변경): 전성분·핵심 함량·기능성·용량·제형 변경(예: PDRN 10000→5000ppm) → product_id 유지·`formula_version`↑.
- **새 `product_id`**: 완전 다른 제품 · 같은 라인이라도 제형 다름(크림→세럼·기능 목적 다름).
- **`sku_id` 분리**: 용량(50/30ml)·세트·옵션 = 같은 product_id·다른 sku. *Foundation은 product_id+ingredients, Cosmile은 sku+offers.*

## 5. ★기존 소비자 호환 (빌드 핵심 — 안 깨뜨림)
**현재 `app/ssbrain/ingest.py`가 볼트 제품을 적재 중**(DB에 skin1004 20개) — `source/raw.md`의 frontmatter(`id·name·brand·lang_origin·ingredients[{atom,amount}]·func_tags·concern_tags·suitable·safety` + body)에서 청크·엣지·product_ingredients 생성.
- **products.py** = 하드코딩 PoC(retinol01·볼트 무관) → 영향 없음. **product.html/server.py** = products.py 사용 → 영향 없음.
- **호환 방침:** ssbrain 적재가 *새 구조에서도 동일 데이터*를 얻게 한다. 택1:
  - **(A·권장) `parse_product` 갱신** — `source/raw.md` 대신 `core.yaml`+`ingredients.yaml`을 읽어 동일 산출(id/name/brand/tags←core, ingredients[{atom,amount}]←ingredients.yaml, body←locale/intake). **구 구조(source/raw.md)도 계속 읽게 backward-compat 유지**(skin1004 20개 안 깨짐).
  - (B) 전처리가 ssbrain-호환 파생 .md를 추가 생성(중복·비권장).
- **검증 게이트:** 전처리 후 `test_ssbrain`·`test_app`·`test_products_e2e` GREEN 유지 + ssbrain 제품 doc 수 불변/증가.

## 6. ★불변식 (Leo 2026-06-25 — *반드시 룰로 지킨다*)
**전처리·빌드 공통:**
1. raw_file 원본 **수정/삭제 ❌** · `source/`에 복사 보존(원본 = 되돌아갈 기준).
2. **source_ref 없는 구조화 데이터 생성 ❌** · 브랜드 claim → 검증된 사실로 승격 ❌(verification_status 유지).
3. 전성분 **순서 보존** · raw_name 보존 · 미매핑 = `mapping_status: needs_review`.
4. **`core.tags`·`claims_control`는 core에 유지** (검색·매칭 spine + 가드레일).
5. **`volatile/pricing/shipping/gift` → `offers.yaml`** 분리 (Cosmile overlay).
6. **`ingredients_core` → `ingredients.yaml`** 분리하되 **`ingredient_index`는 core에 유지**.
7. **locale 동일 key** · core에 긴 문장 ❌ · 앱 즉흥번역 전제 ❌.
8. **coverage = 모든 source 섹션이 *추적됨*** (status ∈ {covered·partial·intentionally_unstructured·missing_in_source}·§3.7) — *미추적*만 실패. 원본이 부분/미보유면 partial/missing_in_source로 정직히(억지 작성 ❌). 유실 추적·clean-not-compress 기계보증.
9. `assessment.usable_for_judge = false` (표현·상담용·judge 강근거 ❌).
10. 변경 시 `version`·changelog.

**★마이그레이션 검색-보존 불변식 (skin1004 등 기존 제품):**
11. **기존 `product_id` 변경 ❌** (이미 의미형 안정 ID — `skin1004-cream-brightening-15`).
12. **기존 `source/raw.md` 본문 삭제 ❌.**
13. **`parse_product_prism`은 `source/*.md` 본문을 prose 청크로 *반드시* 색인** — `直播话术·卖点·品牌介绍·使用方法`이 검색에서 *사라지면 실패.* (검색 품질 저하 금지.)
14. **마이그레이션 후 게이트: `test_ssbrain`·`test_app`·`test_products_e2e`·`test_judge_real`·`test_robustness` 전부 GREEN** + ssbrain 제품 doc 수 불변/증가.
