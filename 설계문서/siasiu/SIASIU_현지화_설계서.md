# SIASIU 현지화 설계서 (다국어 — 무엇을 어떻게 번역하나) · 정본

> **버전 v0.3 · 2026-06-24**
> 한 줄: **"고정 데이터, 유동 지식"(Fixed Data, Fluid Knowledge).** 모든 텍스트를 한 통(사전)에 박지 않는다 — *지식은 오리지널(출력 시 가공·번역), 데이터는 미리 검수번역(파일·도메인별 분리), UI는 사전(슬림), 개인화는 틀+슬롯.*
> 정합: [[SIASIU_다국어_환대_설계서]](UI·출력보장·CLIR) · [[SIASIU_검색아키텍처_설계서]](지식·CLIR) · [[SIASIU_가드레일_설계서]](claims·AI권한) · [[clean-not-compress]](원본) · 명명표준(원자) · 볼트 `00_VAULT_설계.md`(제품) · [[foundation-family-hierarchy]](COSMILE 상속).
>
> **변경이력**
> - **v0.3 (2026-06-24)** — Leo 확정: ①**사전 도메인별 분리**(§11: UI·제품·피부과·화장품/컬러 각자 store / 지식=원본) — 한 통 ❌. ②**이름류 번역 규칙**(§3.6: 원자·성분명·브랜드명·제품명은 *AI 자유번역 ❌*, 표준/공식/검수 표기만 — 내용만 번역). ③**한국어 먼저 원칙**(§8.0: 콘텐츠는 한국어로 완벽해진 후 번역 — 미완성 콘텐츠 번역=혼란·재작업). GPT 의견 일치.
> - **v0.2 (2026-06-24)** — GPT 외부의견을 *우리 구조에 맞게 흡수*(복붙 X): locale=번역본 아닌 *현지화 자산*, schema 강제, **AI 권한 설계**, **불변식 10**, **claims_control**(가드레일 연동), source 보존(clean-not-compress), 출력 템플릿 맵·채널(상세·라이브·몰·B2B). 우리 원자(명명표준)·볼트·ssbrain·CLIR과 결합.
> - **v0.1 (2026-06-24)** — 최초 정본. 4종류 분류·제품=폴더(core+content)·통일스키마·틀+슬롯. (i18n 작업 중 "사전 비대" 발견 → 근본 재설계.)

---

## 0. 핵심 원칙 — 텍스트는 4종류, 각자 다르게
한 사전에 다 박으면 *비대·느림·원본 손실·표현 비일관.* 우리 브레인 철학(지식=오리지널, 출력만 고객 언어)을 프런트·커머스 전체로 확장.

| # | 종류 | 무엇 | 현지화 | 어디 | 왜 |
|---|---|---|---|---|---|
| ① | **지식 Knowledge** | 논문·원료과학·시장리포트·경쟁분석·상담 배경지식·리서치노트 | **오리지널 → 출력 시 AI 가공·번역** | `knowledge/`(원본) | AI가 *어차피 검색→가공→고객언어화*·출력 적음·수기수정/형태다양(PDF·표) → 미리번역 *낭비·무의미* |
| ② | **UI 크롬 Chrome** | 버튼·라벨·내비·폼·정적 인사·면책 | **미리 번역 (UI 사전·슬림)** | `assets/js/i18n.js`(UI만) | 고정·고빈도·속도 |
| ③ | **데이터 Data** | 제품명·브랜드·성분표기·용량·사용법·주의·인증·상세페이지·옵션·판매포인트·FAQ·배송문구·라이브 고정답변 | **미리 검수번역 = *현지화 자산* (파일)** | `products/<id>/locales/<lang>` | 드물게 변함·반복출력·속도·일관성·★음성TTS는 텍스트 확정 필수·*즉흥번역 위험(제품명·성분·주의·효능)* |
| ④ | **변수 Dynamic** | 고객이름·국가·날짜·할인율·피부타입·상황 연결문 | **틀(미리번역)+슬롯(런타임 채움/생성)** | 틀=②③ · 슬롯=고객데이터 | 개인화 + 고객언어 + 빠름·음성 |

**불변 한 줄:** *지식과 데이터는 같은 번역 파이프라인을 절대 공유하지 않는다.* 지식=RAG/가공 대상, 데이터=검수된 정적 자산. 섞으면 — AI가 논문을 끌어 *효능 과장* 또는 고정 설명을 매번 요약해 *일관성 붕괴.*

---

## 1. 지식 (① — 오리지널, 출력 가공·번역)
- **미리 번역 안 함.** 검색(CLIR·어느 언어 자료든 원문으로) → AI 가공(요약·재구성·위험도 조정) → **출력만 고객 언어로.** 근거 CONTENT는 *번역 안 함*(정확/안전). 자료는 수기수정·형태다양 가능.
- 우리 자산: 볼트 `knowledge/`(성분·시술·기능의학) — ssbrain이 색인, CLIR가 언어무관 검색. 정본 [[SIASIU_검색아키텍처_설계서]].

## 2. UI 크롬 (② — 사전, 슬림)
- `i18n.js` = **하드코딩 UI만.** *콘텐츠/데이터 ❌*(비대 방지). 7언어 미리번역·영어폴백·**커버리지 테스트**(`tests/test_i18n_coverage.py`)·깜빡임 방지. 정본 [[SIASIU_다국어_환대_설계서]], [[siasiu-i18n-discipline]].
- ★현재 478개 중 *콘텐츠가 섞임* → §8 마이그레이션에서 UI만 남기고 콘텐츠는 ③으로 분리.

## 3. 데이터 = 제품/브랜드/피부과 (③ — 현지화 자산)
**핵심 관점(GPT 흡수): locale 파일은 "번역본"이 아니라 "그 언어 시장의 *제품 자산*".** ko = 한국어 제품 자산, zh = 중국어 제품 자산. *구조는 같게, 문장은 시장에 맞게 검수.* AI가 매번 창작 ❌ — *가져다 조합.*

### 3.1 제품 = 폴더 (우리 볼트 구조 정식화)
현재 볼트: `products/<brand>/<product>.md`(프론트매터 원자·`name:{zh,en,ko}`·`lang_origin` + body 클린원문). → **목표 구조(폴더화):**
```
products/<brand>/<product-id>/
  core.yaml            # ★언어중립 스파인 (§3.2) — 출력해도 안 변하는 사실
  schema.yaml          # ★통일 스키마 정의 (출력 전 검증·§3.4)
  locales/
    ko.yaml  en.yaml  zh.yaml  ja.yaml  th.yaml  vi.yaml  ms.yaml   # ★언어별 자산·동일 key (§3.3)
  source/              # ★원본 보존(clean-not-compress) — 현 .md body·产品库 원문·PDF·전사
    raw.md  (원본 언어, lang_origin)
  refs.yaml            # knowledge_refs — 지식은 *링크만*(고객출력용 고정번역 아님)
  (선택·나중) assets/  outputs/  qa/
```
- ★단계적: 지금은 한 `.md`(원자+다국어명+원문)로 충분. 폴더화·7언어 content는 *제품이 늘고 채널(상세·라이브·몰·B2B) 붙을 때.* COSMILE 주도.

### 3.2 core.yaml — 언어중립 스파인 (검색·매칭·안전의 척추)
```yaml
product_id: skin1004-essence-cica-19
brand_id: skin1004
status: active            # active|临期|단종
lang_origin: zh           # 원본 언어(검수 기준)
canonical: { brand: SKIN1004 }            # 표기 통일 기준
category: { primary: skincare, secondary: essence }
spec: { volume: 50ml, made_in: KR }
ingredients_core:                          # ★원자 = 명명표준 ing:slug (언어무관·CLIR 검색)
  - { atom: ing:centella-asiatica, role: soothing, conc: ~ }
  - { atom: ing:panthenol,        role: soothing }
claims_control:                            # ★가드레일 연동 — 제품별 허용/금지 클레임
  allowed:  [moisturizing, soothing, brightening_appearance]
  forbidden:[disease_treatment, medical_cure, guaranteed_effect]
risk_flags: [sensitive_skin_check, patch_test_recommended]
version: { data_version: "1.0.0", last_reviewed: "2026-06-24", reviewed_by: Leo, status: approved }
```
- *원자·수치·가격·claims = 언어와 무관* → 한 곳, 안 중복. 원자가 **CLIR 검색**을 언어무관으로(명명표준). `claims_control`이 출력 가드레일의 *제품별 화이트리스트.*

### 3.3 locales/<lang>.yaml — 언어별 자산 (★동일 key 구조)
```yaml
display:   { brand_name, product_name, short_name }
summary:   { one_line, short, long }
features:  [ ... ]                      # 卖点·핵심 포인트
ingredient_story: "..."                 # 성분 설계 *문장만*(수치는 core 원천)
how_to_use: { title, steps: [...] }
warnings:  [ ... ]                       # ★AI 즉흥 번역 금지
detail_page: { headline, subheadline, section_*_title, section_*_body }
live_commerce: { short_pitch, faq_* }
```
- **모든 언어가 같은 key** → 출력 템플릿이 같은 슬롯 채움 → *어느 언어든 동일 구조 화면.* (Leo: "구조 통일해야 같은 폼 같은 내용.")

### 3.4 schema.yaml — 통일 강제 (출력 전 게이트)
- required keys·list min/max·금지클레임 검사. **모든 locale이 이 스키마를 통과해야 출력.** (ko OK·zh OK·누락0·금지클레임0.) → 구조 깨짐·표현 비일관 사전 차단.

### 3.5 출력 흐름 & 채널
**source → core → locale → template(map) → output.** 고객 언어 L → `core` + `locales/L` → **템플릿 맵**(detail_page·live_commerce·mall·b2b)이 *어떤 필드를 어디에* 배치 → L 언어·동일 폼. 음성 = locale 텍스트 기반 사전 녹음/TTS. *AI는 "무슨 문구 새로 만들까"가 아니라 "어떤 필드를 어디 넣을까".*

### 3.6 ★이름류 번역 규칙 (Leo 확정 2026-06-24 · GPT 일치) — *AI가 이름을 즉흥 번역하지 않는다*
| 항목 | 번역? | 어떻게 |
|---|---|---|
| **원자 `ing:slug`** | ❌ **절대(영원히)** | 언어중립 *ID*(검색·매칭 열쇠). 명명표준. |
| **성분 display name**(센텔라/积雪草/Centella) | 다국어지만 *표준명만* | 성분 레지스트리의 `name:{ko,en,zh,...}`. AI 자유번역 ❌. |
| **브랜드명**(理肤天使/SKIN1004/스킨1004) | *공식 표기만* | `core.canonical_names.brand`에 박음. AI 자유번역 ❌. |
| **제품명** | *검수된 표기만* | `core.canonical_names.product` + locale display. AI 즉흥 ❌. |
| **제품 내용**(설명·卖点·사용법·주의) | ✅ 미리번역·검수 | locale 파일. |
| **숫자·코드·단위**(50ml·#21N·가격) | ❌ 그대로 | (가격=휘발성·실시간) |
**핵심:** *이름류(원자·성분명·브랜드·제품명)는 표준/공식/검수 표기만 — AI가 새로 만들거나 즉흥 번역 ❌. 내용만 번역.* (GPT "제품명·성분명 즉흥번역 위험"·명명표준·인용표준과 한 묶음. AI 권한 §5.)

## 4. 변수/개인화 (④ — 틀 + 슬롯)
- **틀 = 미리 번역**(7언어·음성OK): `"{이름}님께 필요한 것"` → en `"What {name} needs"`. **슬롯 = 런타임**: `{이름}=Leo`·`{고민}=건조`(정해진 세트). = 개인화+고객언어+빠름.
- 짧은 *연결문/상담 브릿지*만 AI 생성 허용(범위 제한). 깊은 자유생성은 드물게(음성 제외/즉석TTS).

## 5. ★ AI 권한 설계 (가드레일 연동)
**AI 가능:** 원본서 데이터 추출·누락필드 감지·*초벌* 번역·tone 정리·schema 검증·금지클레임 탐지·템플릿 배치·라이브 *고정문구+짧은 연결문.*
**AI 단독 금지(승인 필요):** locale 파일 *수정*·효능 표현 강화·주의사항 축약/삭제·**제품명·성분명 임의 번역**·의학 표현 추가·국가 규정 단정·검수문구 변경·금지클레임 추가·*지식을 데이터처럼 고정* / *데이터를 지식처럼 매번 재번역.*
**인간(Leo) 승인 필수:** 제품명 확정·핵심 성분 표현·효능/클레임·주의사항·상세 대표문구·국가별 판매자료·의료/건강 표현. (명명표준·인용표준·Opus 검수와 한 묶음.)

## 6. ★ 불변식 (절대 안 깨짐)
1. 지식은 미리 번역 안 함. 2. 제품 데이터는 *검수된 locale에서만* 출력. 3. 모든 locale = 동일 schema. 4. AI는 승인 없이 고정 번역 데이터 변경 ❌. 5. 제품명·성분명·주의·클레임은 runtime AI가 새로 만들지 않음. 6. 동적 번역은 *이름·짧은 연결문·상황요약*에 한정. 7. 출력은 항상 source→core→locale→template→output. 8. 지식이 고객 출력에 들어가면 *반드시 가공·근거확인.* 9. 번역 파일은 코드 아닌 *검수 가능한 자산.* 10. 변경 시 version·changelog.

## 7. 분류표 (사전/런타임/원문)
| 항목 | 사전번역 | 런타임 | 원문보관 |
|---|---|---|---|
| 제품명·브랜드·성분·용량·사용법·주의·상세·라이브고정답변 | ✅ | ❌(이름만 제한) | ✅ |
| 고객이름·할인·상담 연결문 | ❌ | ✅ | — |
| 논문·원료지식·시장리포트·경쟁자료 | ❌ | ✅(검색후 가공) | ✅ |

## 8. 마이그레이션 (단계)
### 8.0 ★한국어 먼저 원칙 (Leo 2026-06-24) — 카테고리별·순서대로
- **콘텐츠는 한국어로 *완벽해진 후* 번역한다.** 미완성/유동 콘텐츠를 번역하면 *혼란·재작업.* 굳은 것만 번역.
- **카테고리별 단계적**(한꺼번에 ❌·헷갈림): **Phase 1 UI → Phase 2 제품 → Phase 3 피부과·컬러…** *먼저 UI, 그다음 하나씩.*
- 데모는 *비번역 콘텐츠 = 한국어*로 일단 작동(placeholder). 안정되면 그 카테고리 번역.
1. **UI 사전 슬림화** — `i18n.js`에서 콘텐츠 제거→UI 크롬만(478→~100). (지금 우선)
2. **제품 폴더화** — 볼트 `products/`를 core+locales+source+schema로. 현 `name:{zh,en,ko}` → 7언어. *제품 늘 때·COSMILE 주도.*
3. **schema 강제·템플릿 맵·출력 채널**(상세·라이브·몰·B2B).
4. **검수**: 제품/브랜드 Opus 적대검수(효능과장·공식명·스키마·금지클레임) → Leo freeze.
5. **개인화 틀+슬롯**.

## 9. COSMILE 상속
볼트(공유)에 산다 → COSMILE 그대로 상속. 제품 = **COSMILE 주도(쓰기)**, SIASIU *참조만*(읽기). core+locale+통일스키마가 *두 앱이 같은 데이터로 같은 폼*을 내게 함. 출력 채널만 앱별로. (쓰기격리·읽기공유.)

## 11. ★사전 도메인별 분리 (Leo 확정 2026-06-24) — 한 통 ❌
*UI 사전에 콘텐츠를 섞으면 비대·지저분.* → **도메인마다 제 store. UI엔 UI만.**
| 도메인 | 저장 | 번역 |
|---|---|---|
| **UI 크롬** | `assets/js/i18n.js` (슬림·UI만) | 미리번역(7언어) |
| **제품** | `products/<brand>/<id>/locales/<lang>` (폴더) ✓ | 내용만 미리번역 |
| **피부과** | `clinics/<id>/locales/<lang>` (제품과 같은 패턴) | 미리번역 |
| **화장품·컬러** | `cosmetics/.../locales/<lang>` | 미리번역 |
| **지식** | `knowledge/`(원본·언어 그대로) | ❌ 출력 시 가공 |
- **제품에서 정한 구조(core+locale+source+schema)를 *다른 데이터 도메인에 그대로 복제.*** 통일성 = 출력·검색 일관.
- *현재 i18n.js 478개는 UI+콘텐츠 혼재(비대)* → Phase별로 콘텐츠를 도메인 store로 이전, UI만 남김(§8).

## 10. 한 줄
**Fixed Data, Fluid Knowledge.** 지식=오리지널(출력 가공·번역) · UI=사전(슬림) · 데이터=현지화 자산(core+locale·동일스키마·검수·불변식) · 개인화=틀+슬롯. *비대X·속도O·음성O·원본보존O·안전O.*
