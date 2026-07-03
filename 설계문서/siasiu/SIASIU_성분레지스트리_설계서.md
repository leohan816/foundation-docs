# SIASIU 성분 레지스트리 설계서 — 화장품 성분 지식 (우리 해자)

> **버전 v0.4 · 2026-06-23**
> SIASIU의 핵심 차별 = **성분 정보를 깔끔·완전·정확하게 정리해 답하는 것** (Leo 2026-06-22). EWG·일반지식이 아니라 *논문 근거 + 농도/순도별 정확성.*
> 위치(볼트, SIASIU 주도): **`knowledge/ingredients/cosmetic/`**(화장품·지금) · `knowledge/ingredients/health/`(건강제품·나중). 성분은 *한 폴더, 도메인 서브폴더*(Leo 2026-06-22). `knowledge/{beauty,health}/`는 *별개 — 지식(글)*.
> 짝: `SIASIU_브레인_설계서.md`(검색·그래프) · 공유볼트 `00_VAULT_설계.md` · 원칙 [[clean-not-compress]] [[design-file-per-module]].

---

## 0. 왜 이게 가장 중요한가 (해자)
ChatGPT·일반몰 = "레티놀은 주름에 좋아요"(일반지식). 우리 = **"순수 비타민C는 5/10/20%에서 효과·자극·안정성이 다르다 — [근거: 논문X]"**(농도/순도별 정확성 + 근거). 남이 못 베끼는 *편찬된 검증 지식.*
- **EWG는 판단 기준 ❌** (레티놀=위험분류지만 성능 최고). *고객이 물으면 답하는 참고용*으로만.
- 기준 = **논문·규제(SCCS·CIR·식약처)·Paula's Choice**(과학·반공포). 효능·안전 *단정 금지*, 근거 없으면 "확실치 않음".

## 1. 성분 엔트리 스키마
```yaml
atom: ing:vitamin-c                       # 정본 ID(COSMILE coin → 우리 등록)
name: { ko: 비타민C, en: Vitamin C(L-ascorbic), zh: 维生素C }   # 검색(다국어)
aliases: [아스코르브산, ascorbic-acid, 순수비타민씨]
inci: Ascorbic Acid
domain: cosmetic                          # cosmetic | health | both(비타민C는 both — 단 안전모델 다름)
category: active / 항산화·미백
form_purity: [순수L-AA, 유도체(SAP·MAP·에틸)]   # ★순도/형태별 다름
efficacy: [미백, 항산화, 콜라겐, 톤업]      # 효능(고민 태그 ↔ concern:*)
safety:                                   # ★해자 — 농도별
  by_conc:                                # 농도별 효과·위험(핵심)
    - { pct: "5%", 효과: 순한 항산화, 위험: 낮음, 근거: "..." }
    - { pct: "10%", 효과: 미백 시작, 위험: 약간 자극, 근거: "..." }
    - { pct: "20%+", 효과: 강한 미백, 위험: 자극·불안정·pH민감, 근거: "..." }
  임신: ok
  광민감: false
  병용주의: [retinol(저녁분리 권장)]
  ph_dependent: true
ewg: { 등급: 1, 비고: "참고용 — 우리 판단 아님" }
evidence: { 수준: "임상 풍부 ★★★★★", 출처: ["PubMed PMID...", "Paula's Choice", "SCCS opinion"] }
products: [auto]                          # ★그래프에서 자동(아래 §4) — 직접 안 적음
```

## 1.5 ★★ 명명 표준 (정본 규칙 — 어기면 검색·매칭이 깨진다)
> Leo 2026-06-23: "각 항목·성분의 이름은 *표준이 있어야* 한다. 아니면 혼란 + 검색에서 못 찾는다." → 모든 성분 파일이 이 규칙을 100% 따른다.

1. **atom = `ing:<slug>`** — slug = INCI/공통 영문명 기반 *소문자·하이픈(kebab)*. **한 분자 = 한 atom.** (`ing:` 접두사 *필수*.)
2. **파일명 = `<slug>.md`** — atom의 slug와 **100% 일치.** (예: `ing:niacinamide` → `niacinamide.md`.)
3. **name = `{ ko, en, zh }`** — **3언어 필수**(다국어 검색 토대). 빠지면 안 됨.
4. **aliases = [모든 변형]** — 한글 이형(에칠/에틸·비타민씨), 영문 동의어, 中文, INCI 변형, 흔한 표기까지. → *검색·매칭이 **어떤 이름이든** 정본 atom으로 수렴*(CLIR 다리와 연결).
5. **제품 `ingredient_id` = 정본 atom slug** — 제품이 다른 이름을 쓰면 그 이름을 정본의 `aliases`에 넣어 매핑. (그래야 그래프가 제품↔성분을 잇는다.)
6. **카테고리 ≠ atom** — `aha`·`bha`는 *분류*이지 성분이 아니다 → `category` 필드로. 개별 성분이 atom(`ing:glycolic-acid`, category=aha). ⚠ 현재 `glycolic-acid`·`tartaric-acid`의 atom=`aha`, `salicylic-acid`=`bha` = **위반(정규화 대상)**.
7. **다른 분자 = 다른 atom** — `tocopherol`(유리 비타민E) ≠ `tocopheryl-acetate`(아세테이트 에스터) → 각자 atom. `vitamin-e`는 *가족 통칭* = atom 아님(aliases/카테고리). ⚠ 현재 셋으로 흩어짐 = 정규화 대상.
8. **slug 규칙:** 소문자·하이픈·INCI 우선·축약 금지·중복 금지.

**불변:** 한 성분의 정본 이름은 **하나**(atom). 나머지 모든 표기는 *그 하나를 가리키는 alias.* → 검색·그래프·상담이 *같은 것을 같은 것으로* 본다.

### 1.5.1 ★ 별칭(alias) 정책 (B1.1 · Leo) — 제품 성분표 안정 매핑
모든 변형 이름을 *정본 atom*으로 수렴시키는 **별칭 테이블** `ingredient_alias`:
`alias · alias_norm(소문자) · canonical_atom(ing:slug) · language(ko|en|zh) · source(human_curated|ai_learned)`.
- `aliases` 필드 + *리다이렉트/병합 파일*(`redirect_to`·`merged:true`)의 모든 이름 → canonical atom으로 등록.
- 예: copper peptide / GHK-Cu / 카퍼펩타이드 / 蓝铜肽 → `ing:copper-tripeptide-1`.
- **왜:** 실제 제품 성분표가 *어떤 표기*를 쓰든 *같은 성분으로* 매핑 — 안 그러면 그래프·판단이 같은 걸 다르게 본다.

### 1.5.2 ★ 성분군(group) 정책 (B1.1 · Leo) — 군과 개별 성분 *분리*
*분류/계열*(AHA·BHA·PHA·세라마이드류·펩타이드류)은 단일 성분이 아니라 **성분군** `ingredient_group`:
`group_id = grp:<slug> · name{ko,en,zh} · members:[ing:slug…]`.
- ★**atom(개별 분자)과 절대 안 섞음** — 섞으면 *상호작용 그래프가 더러워진다.* (군≠atom.)
- 파일: `type:category` / `category_note` → grp. 예: `grp:pha`(members: `ing:gluconolactone`·`ing:lactobionic-acid`).
- *판단은 개별 atom으로, 군은 그루핑·설명용.* (구현·검증: `app/tests/test_ingredient_load.py` — ingredient|group|alias 라우팅 12/12 PASS.)

### 1.5.3 ★ regulatory_class (Leo 2026-06-24) — 약·화장품 겸용은 *제거가 아니라 태그*
어떤 성분은 화장품·OTC·처방약 *다른 맥락*에 등장(예: adapalene=OTC+처방·benzoyl-peroxide=OTC). → 폴더에서 빼지 않고 **`regulatory_class`** 태그:
`cosmetic | otc_drug | prescription | dual_use | restricted | unknown`.
- 같은 분자라도 *판단 문장이 달라진다*: cosmetic("화장품 맥락 사용/주의") · otc_drug("일반약·라벨 확인") · prescription("의사·전문가 영역") · dual_use("농도·국가·제품유형 따라 판단 변동").
- **제거 ❌ → 역할 태깅.** (건강·성형·피부과 확장에도 필수.) ⚠ 기존 cosmetic 폴더의 `adapalene`·`tretinoin`·`benzoyl-peroxide` = `otc_drug`/`prescription` 태깅 대상.

### 1.5.4 ★ provenance — 사람 큐레이션 ↔ AI 학습 *영구 분리* (Leo 2026-06-24)
- **기존 196 = Paula's Choice 출처** → `provenance_origin: human_curated · source_family: paulas_choice · source_type: expert_ingredient_dictionary · verification_state: imported_or_curated`.
- **AI 신규 학습**(웹·논문) → `provenance_origin: ai_learned · source_family: pubmed|sccs|cir|… · verification_state: staged→verified→promoted`.
- ★승격돼도 origin 불변(승격≠출처세탁). **왜:** 문제 시 *출처군별 재검토·롤백·특정 날짜 이후 폐기* 가능 = Foundation 신뢰 관리. (자가성장 설계서 provenance와 한 묶음.)

### 1.5.5 ★★ 기능 유사성 ≠ 분자 계열 (Leo 2026-06-24 — 원자 철학·반드시)
> **"기능 유사성은 *관계 edge*이고, 분자 계열은 *atom identity*다."**
- `chemical_family`(분자 계열·정체성): retinoid / bakuchiol_derivative / acid / peptide / ceramide …
- `functional_claim`(기능 주장·관계): retinol-like / anti-aging / barrier / exfoliation …
- ★**섞으면 안 됨.** 비슷한 *효과를 주장*한다고 같은 *계열*이 아니다. 예: bakuchiol = "retinol-like"(functional)지만 *retinoid 아님*(chemical_family=bakuchiol_derivative). → 워크플로가 bakuchiol ferulate를 retinoid ester로 분류하려다 검수에서 적발(이 원칙의 실례).
- 판단: 분자 정체성(atom)으로 안전·전환을 보고, 기능 유사성은 *edge*(retinol-like 등)로 잇는다.

### 1.5.6 ★★ 별칭 검증 강도 + 퍼지 자동병합 금지 (불변식 · Leo 2026-06-24)
**★불변식: 성분 alias는 *글자가 비슷하다고 자동 병합하지 않는다.*** 퍼지(글자겹침)는 *후보 생성*까지만 — *병합은 의미 검증 후.* (성분에서 이거 하나 틀리면 judge 전체가 오염.)
별칭 위험등급(검증 강도 차등):
- **low**(자동 가능): 띄어쓰기·대소문자·하이픈·중문 어순(의미 명확). 예: `视黄醇棕榈酸酯`↔`棕榈酸视黄酯`.
- **medium**(검수 권장): 일반명↔INCI·번역명·약어. 예: retinyl palmitate↔vitamin A palmitate.
- **high**(reject/필수 검수): 계열명↔개별성분·마케팅명↔실제성분·기능명↔분자명·유사철자. 예: 세라마이드 AP↔NP=**reject**(다른 분자)·`苯乙醇`↔`苯氧乙醇`=reject·copper peptide↔copper-tripeptide-1=검수.
- ★고위험/활성 성분 매핑 = **Opus 또는 사람 검수 필수.** alias 등록 시 `source·provenance·audit` 필수.

**mapping_resolution**(매핑 판정·audit): `status: alias_gap | true_new | group | redirect | ambiguous | reject · canonical_atom · confidence · verified_by(opus|human|source_dictionary) · note`.
→ "없는 지식"이라 오판하기 전에 *A(별칭갭)/B(진짜신규)/C(군·약물·브랜드·타도메인)* 구분. ★**연구 전 canonical/alias 확인 먼저.**

### 1.5.7 ★ 성분 데이터 5대 불변식 (Leo 2026-06-24 — 자가성장 오염 방어벽)
1. **연구 전 alias/canonical 확인 먼저** (이미 있는지·별칭갭인지).
2. **퍼지 매칭 자동 병합 ❌** (후보까지만·병합은 의미검증 후).
3. **약/화장품 겸용 = 제거❌·regulatory_class 태그.**
4. **기능 유사성(edge) ≠ 분자 계열(atom identity) — 분리.**
5. **Paula's Choice 기존 ↔ AI 신규 = provenance 영구 분리.**

## 1.6 ★ 성분 추가 명령 — "성분 추가해줘: \<성분명\>" (자동 절차)
> Leo 2026-06-23: "그냥 *성분 추가해줘* 하면 알아서 다 통일시켜줘." → 이 명령 한 줄이면 아래를 **무조건 표준대로** 자동 수행.

**Leo의 명령:** `성분 추가해줘: <성분명 또는 목록>`
**Claude가 자동 실행(매번 동일):**
1. **명명 표준 적용**(§1.5) — atom=`ing:<slug>` · 파일명=slug · name{ko,en,zh} · aliases(모든 변형) · 카테고리≠atom · 한 분자 한 atom.
2. **표준 소스 리서치**(§2) — 식약처(배합한도·고시)·SCCS·CIR·EU Annex·PubMed(PMID)·Paula's·INCIDecoder. *EWG는 참고만.* **WebSearch로 실제 근거**(가짜 인용 ❌·효능단정 ❌·근거 없으면 "확실치 않음").
3. **표준 형식 .md 생성**(§1 스키마) — `safety.by_conc`[농도별 효과/위험/**근거**]·병용주의·임신·광민감·`evidence.sources`[]·`products:[auto]` + 본문 `## 핵심(상담용)`. = 기존 192개와 동일.
4. **볼트에 저장** — `~/Project/foundation-vault/knowledge/ingredients/cosmetic/<slug>.md` (정본, SIASIU 주도).
5. **매칭 확인** — 제품 `ingredient_id`가 이 atom과 일치하는지(그래프 자동 연결). 다르면 alias로 매핑.
6. **★★ 검수 — Opus 필수 (Leo 2026-06-23):** 누가 리서치·작성하든, **성분 하나하나의 최종 검수는 Opus가 직접 한다.** 검사: ①명명 표준 준수(atom=`ing:slug`==파일명·name 3언어·aliases) ②근거 정확성(실제 PMID·식약처·SCCS — 가짜·환각 인용 ❌, 근거 없으면 "확실치 않음") ③형식 일치(기존 192개와 동일). → *오류 누적(접두사·오분류·언어 누락 같은 드리프트) 방지.* **검수 통과 전엔 등록 완료 아님.**
7. **(요청 시) 재적재** — `ingest_knowledge_dir`/그래프 갱신 → 검색 합류.

→ **결과: 이름·형식·근거·매칭이 항상 통일.** 표준은 *무조건* 지킨다(CLAUDE.md §1 ★★).

## 1.7 ★★ 인용·근거 표준 — 서지 환각 방지 (Leo 2026-06-23, 검증서 발견)
> 사고: 대량 생성이 *실재 PMID에 저자·연도를 추측해 지어냄*(예: 실제 Nakagawa인데 "Kang&Lee(1995)"). PMID·데이터는 맞지만 서지가 위조 → 신뢰 붕괴. 단독으론 안 보이고 WebSearch 교차대조라야 잡힘.

**3층 방어 (담에 안 생기게):**
1. **생성 시 — 인용은 WebSearch로 *확인 후에만* 기재.** 확인 안 된 인용은 *쓰지 않는다.* (근거 없으면 침묵 = 서지에도 적용.)
2. **★서지 미니멀리즘 — 검증 가능한 앵커가 정본:** `PMID/PMC` · `식약처 고시번호` · `SCCS/CIR 문서번호`. **저자·연도는 *확인된 것만*.** 불확실하면 *생략*하거나 `[저자 확인 필요]` — **틀린 저자 < 저자 없음.** (PMID는 맞는데 저자 모르면 저자를 적지 마라.)
3. **★Opus 적대 검수 게이트(§1.6):** 별도 에이전트가 *WebSearch로 인용 실재성·주장 일치*를 재확인. **이 게이트 통과 전엔 '완료' 아님.** 빠른/싼 모델의 대량 인용 작업도 *반드시* 이 게이트를 거친다.

**불변:** 인용은 *장식이 아니라 검증된 주장의 근거.* 못 지키면 그 인용은 빼는 게 낫다(우리 신뢰 = 해자).

**검수 결과(2026-06-23):** 울트라코드 적대 검증 → 교정으로, 대량 생성이 *지어낸 인용 ~21개*를 수정(PMID는 맞으나 저자·연도 위조 등). §1.7 표준대로 *확인 안 된 서지는 앵커만 남기고 저자·연도 제거* → 본 게이트가 *실제로* 환각을 잡는다는 검증.

## 2. 어디서 가져오나 (소스 — 공개)
| 종류 | 소스 | 무엇 |
|---|---|---|
| **안전·농도 규제** | SCCS(EU 과학위·*농도별 안전의견*) · CIR(미·성분안전) · 식약처 배합한도 · FDA(자차) | 법적·과학적 농도 한도(가장 단단) |
| **효과(임상)** | PubMed(초록 무료) · Google Scholar | 농도별 효능 |
| **근거기반 종합** | ★Paula's Choice 성분사전(과학·반공포 — Leo 콜라보) · INCIDecoder | 읽기 쉬운 정리 |
| **참고만** | EWG | 고객 문의 응대용(판단 X) |
> ★한 곳에 다 없음 — *흩어진 무료 소스를 모아 구조화*하는 편찬 작업이 곧 해자.

## 3. 어떻게 분류하나
- **도메인:** 화장품(바름·농도 안전) / 건강제품(먹음·복용량 안전) — *안전모델이 달라 분리*. both(비타민C 등)는 도메인별 안전 블록.
- **카테고리:** active·acid·humectant·occlusive·soothing·항산화·미백… (검색 필터).
- **고민 연결:** efficacy ↔ `concern:*`(모공·미백·진정…) — 다리(bridge)·그래프로.

## 4. ★ 제품 연동 — 성분→제품 자동 지도 (Leo 아이디어 = 구현됨)
- **그래프(edges)** = 성분 ↔ 제품 지도. `ing:centella → 18개 제품`처럼 *어느 제품에 든지* 즉답.
- **자동 유지(idempotent ingest):**
  - 새 제품 추가 → `ingest_file` → 그 제품의 *모든 성분 아래 자동 등록*(= Leo의 "버튼").
  - 제품 갱신 → 재ingest → 옛 연결 지우고 새로 링크(stale 0).
  - 제품 삭제 → `remove_product` → 검색·지도에서 *자동으로 빠짐.*
- 효과: **검색 빠름·정확**(성분 질의 = 그래프 즉답) + *항상 최신.*
- 구현: `ssbrain/graph.py`·`ingest.py`. 성분 정의(레지스트리)는 *분리* — 제품 목록은 그래프에서 *파생*(중복저장 X).

### 4.1 ★ 농도 적재 버그 — 발견·수정 (2026-06-23)
> **사고:** `parse_product`는 성분 함량(49%·5% 등)을 *정상 파싱*하나, `ingest_file`의 INSERT가 `concentration` 자리에 **`None`을 하드코딩** → `product_ingredients.concentration` **146행 전부 NULL**, `ingredients` 안전 테이블 **0행**. *농도별 안전이 우리 해자인데, 정작 파싱된 농도 데이터가 적재 직전 버려짐.* (스키마·파서는 멀쩡 — 적재 한 줄의 누락.)
> **왜 치명적:** §0의 해자("순수 비타민C 5/10/20% 효과·자극이 다르다")는 *제품의 실제 농도*가 DB에 있어야 성립. 농도 NULL = 농도별 추천·"이 농도 괜찮아?" 응답의 근거가 통째로 비어버림.
>
> **수정(예정):**
> 1. `ingest_file` INSERT — 파싱된 농도를 *그대로* 적재(`None` 하드코딩 제거).
> 2. **농도 정규화** — 수치(`49%`·`5%`)는 `%` 단위로 정규화해 저장, *비수치(미표기·"적정량" 등)는 `NULL`*(추측 금지 = 휴리스틱 금지, CLAUDE.md §1 ★★).
> 3. **`ingredients` 레지스트리 로더** — 레지스트리(.md, 농도별 안전)를 `ingredients` 테이블에 적재해 0행 → 채움. 제품 농도(`product_ingredients`)와 성분 농도별 안전(`ingredients`)이 만나야 그래프가 "이 제품의 이 농도 → 안전 의견"을 잇는다.
> 4. **검증:** 적재 후 `product_ingredients.concentration` NULL 비율·`ingredients` 행수를 *데모 데이터로* 확인(0행/전NULL이면 실패라고 말한다 — 행동 진실, CLAUDE.md §0).

## 4.2 ★★ 제품설명-성분 충돌 해결 정책 (Leo 2026-06-24 — 광고가 judge를 흐리지 않게)
> 가장 큰 애매함: *성분 우선이지만 함량이 낮거나 순위가 낮으면? 제품설명이 함량을 공개하면?* → 제품설명을 *믿거나 버리는* 게 아니라, **claim으로 쪼개 성분·함량·근거와 대조해 신뢰도를 조정한다.**

**Product Truth Ladder (판단 우선순위):** `성분 정체성 > 공개 함량/농도 > 함량순위/제품형태 > 근거자료 > 제품설명(마케팅)`.
★예외: 제품설명 속 *검증 가능 수치*("레티놀 0.3%"·"pH 3.8")는 마케팅이 아니라 **함량 근거 후보(Level 2)로 승격.**

**제품설명을 둘로 쪼갠다:** ① **검증 가능 정보**(함량·농도·pH·사용빈도·leave-on/rinse-off·무향료) → 구조화해 판단 입력. ② **마케팅 claim**(순한·고효능·민감성 가능·저자극) → claim으로 저장, 성분·함량·근거와 *대조해 신뢰도 조정.*

### exposure_strength — "있다 ≠ 의미있는 농도"
성분 atom마다 *노출강도*(함량 + INCI순위 + ★제품형태):
```yaml
product_ingredient:
  atom: ing:retinol
  present: true
  concentration: { value: 0.3, unit: "%", source: brand_detail_page, confidence: medium, verified: false }
  inci_order: { rank: 12, total: 38 }
  product_form: { type: leave_on_serum }        # ★형태=노출(rinse-off는 씻겨나감)
  exposure_strength: { class: medium, reason: "공개 0.3%·leave-on" }
# 농도 없으면 → concentration.value: null · source: not_disclosed · exposure_strength.class: low_or_unknown
```
→ "레티놀 있음 = 강한 레티놀 제품" 오류 차단.

### 10 원칙 (불변식)
1. 제품설명보다 *성분 정체성*이 우선.
2. 성분만으로 판단 ❌ — *함량·농도·순위·형태로 노출강도* 계산.
3. 제품설명 속 함량/농도/pH/사용법 = marketing claim ❌ → *structured evidence candidate* 분리.
4. "순함/고효능/민감성 가능" = *weak marketing claim* 분리.
5. 성분·함량·조합이 제품설명과 모순 → *성분·함량·조합 우선.*
6. 성분 있으나 함량 낮음/순위 낮음 → *효과·리스크 claim 강도 ↓.*
7. ★단 **안전 리스크는 낮은 함량이라도 완전히 제거하지 않음.**
8. 농도 비공개인데 강한 효능 주장 → *보수적 판단.*
9. 공개 함량 있으면 *source 신뢰도에 따라 concentration_evidence로 저장.*
10. 불확실하면 추천 ❌ → "함량 비공개/근거 부족으로 판단 보류."

### ★Opus refine (위 원칙을 더 날카롭게 — Leo 채택)
1. **claim-source 통합 (새 모듈 ❌):** 제품설명 claim = *또 하나의 claim 소스*(`provenance_origin: brand_marketing`) — 자가성장 `knowledge_claim`과 *같은 trust 엔진*으로 평가. (성분근거·웹근거·제품설명이 *한 엔진*에서 만남 — corpus처럼 *claim-source-agnostic.*)
2. **★안전/효능 비대칭:** 낮은 노출은 *효능* 大감점하되 *안전* 小감점. (알레르겐·자극원은 미량에서도 반응 — 향료·MIT; 액티브는 충분량 없으면 무효.) = 안전 비대칭의 정밀판.
3. **confidence 전파(weakest-link):** 브랜드 공개·미검증 농도(`verified:false`)는 *검증된 농도와 동급 ❌* — 판단이 가장 약한 고리의 confidence를 물려받아 *보류/조건부.*
4. **출력 = 투명한 설명:** conflict 결과는 *숨은 점수*가 아니라 *"상세페이지는 순하다지만 공개 조합 기준 민감성엔 주의"* 같은 문장(추임새→provenance 투명성 맥).

### concentration_source_priority (공개 함량 출처 신뢰도)
`공식라벨/패키지 high > 브랜드 공식FAQ medium_high > 공식몰 상세 medium > 마켓 설명 medium_low > 인플루언서/블로그 low > INCI순위 추정 weak`.

### 제품설명 신뢰도 조정 (0점도 100점도 아님)
제품설명 단독 → *약한 근거* / +성분 일치 → *보조 근거* / +공개 함량+성분 일치 → *제품 정보 채택 가능* / +성분·함량 충돌 → *과장 claim 감점.*

### 예시 (레티놀)
| 제품 | 성분/조합 | 설명 | Foundation 판단 |
|---|---|---|---|
| A | 레티놀 0.3% + 판테놀·세라마이드 | "민감성도 순한 레티놀" | *조건부* — 순하다 단정 ❌, 농도+버퍼로 *낮은 빈도 조건부 가능* |
| B | 레티놀 1.5% + AHA | "매일 쓰는 순한 레티놀" | *설명 감점* — "공개 조합 기준 입문/민감성에 매일 권하기 어렵습니다" |
| C | 레티놀 성분표 끝·농도 비공개 | "고효능 안티에이징" | *효능 보수적* — "함유 확인되나 농도·순위상 강효능 단정 어렵습니다. 민감성은 주의하되 고농도 리스크로 보지 않습니다" |

**★불변식:** *Foundation은 제품설명을 그대로 믿지 않는다 — claim으로 분해해 성분·함량·순위·형태·근거와 대조해 신뢰도를 조정한다.* **성분이 중심, 함량이 강도, 제품설명은 검증 가능 정보만 위로·과장은 아래에서 감점.**

## 5. 새 성분이 생길 때 워크플로
```
COSMILE이 제품에 새 원자(ing:bakuchiol) coin
  → SIASIU: 레지스트리에 등록 {이름 한·영·중·카테고리·효능}  (1차: 검색 가능)
  → 소스 리서치(SCCS·PubMed·Paula's) → 안전·농도·근거 채움  (2차: 해자)
  → 다리(bridge) 자동 갱신 → 모든 언어 검색
  → 제품 연동은 그래프가 자동(§4)
```
- **채움 분담(봄 규칙):** 대량 추출·정리 = 로컬(DeepSeek 리서치 보조) / 스키마·검수·근거확인 = Claude.

## 6. 단계 (지금 vs 장기)
- **지금(빠름):** 62성분 *이름(한·영·중)·카테고리·효능·EWG참고* → 검색·기본정보 완성. + 제품 그래프(이미 됨).
- **장기(해자):** *농도/순도별 효과·위험 + 근거 출처* → 정확한 추천·상담. 규제+라벨부터 단단히, 논문 쌓아감.
- 구조를 지금 잡으면 → 채우기는 *시간문제*(Leo).
- **진척(2026-06-23):** 성분 **192/200** 구축(농도별 효과/위험/근거까지) — 해자 단계가 사실상 거의 채워짐. 남은 ~8개 + 농도 적재 버그(§4.1) 수정이 다음 일.
- **★COSMILE 상속(이식성):** 명명 표준(§1.5)·인용 표준(§1.7) + *농도 데이터*는 볼트 정본을 통해 동생(COSMILE)에게 그대로 이어지는 자산 — 같은 atom·같은 서지 규칙·같은 농도 스키마면 두 프로젝트가 *같은 것을 같은 것으로* 본다.

## 7. ★ 현재 62성분 구축 계획 (어디서·어떤 순서로)
COSMILE 20제품의 실제 성분 62개. *카테고리가 소스·난이도를 정함* — 규제 성분부터 단단히.

| 그룹 | 성분(예) | 주 소스 | 핵심 데이터 |
|---|---|---|---|
| **A. 산/각질** | aha·bha·lha·pha | ★식약처 배합한도·EU Annex·SCCS | *법적 농도 한도*·光敏·병용 |
| **B. 자차 성분** | zinc-oxide·tinosorb-m·uvinul-a-plus·ethylhexyl-triazone | ★식약처·FDA·EU(규제) | 허용 농도·SPF기여·안전 |
| **C. 레티노이드/대체** | bakuchiol | SCCS(레티놀)·PubMed·Paula's | 농도·임신·대체 근거 |
| **D. 미백 액티브** | niacinamide·ascorbyl-ethyl·tranexamic-acid·kojic-acid·glutathione·madewhite·ferulic | PubMed·Paula's·SCCS | ★농도별 효과/위험(비타민C 5/10/20%) |
| **E. 진정** | centella·madecassoside·panthenol·tea-tree·licorice·cica-ceramide·calamine·aloe… | Paula's·CIR | 대체로 안전 — 효능·농도 정리 |
| **F. 장벽/보습** | ceramide·cholesterol·fatty-acid·squalane·hyaluronic·betaine·trehalose·ectoin… | Paula's·CIR | 안전 — 효능 정리 |
| **G. 펩타이드** | peptide·adenosine | PubMed·Paula's | 효능 근거(adenosine=식약처 주름고시) |
| **H. 점토/물리** | kaolin·bentonite·illite·himalayan-pink-salt·adzuki·anti-sebum-p | CIR·일반 | 물리적·안전 |
| **I. 식물추출** | camellia·birch·ginkgo·rosemary·rosa-oil·pink-yeast-ferment… | Paula's·논문(근거 다양) | ★근거 등급 정직히(약하면 약하다고) |
| **J. 항산화** | tocopherol(비타민E) | CIR·Paula's | 안전·효능 |

### 우선순위
1. **A·B·C·D (규제 농도 + 추천 핵심)** — 안전 critical·고객이 "이 농도 괜찮아?" 묻는 것. *규제 소스라 단단·빠름.*
2. **centella·niacinamide** — 고빈도(18·9개 제품)·시그니처.
3. **E·F·G** — 안전하니 *효능·농도* 위주.
4. **H·I·J** — 안전·효능 정리(식물추출은 근거 등급 정직히).

### 성분 1개 구축 프로세스 (구체)
```
1) 정체: 이름(한·영·중)·INCI·aliases·category — 알려진 정보(빠름)
2) 규제 농도: 식약처 배합한도/EU Annex/SCCS 조회 → safety.by_conc 한도
3) 효과: PubMed(농도별 임상)·Paula's → by_conc 효과/위험 + ★출처
4) 검수: Claude가 근거-주장 대조(효능 단정 X, 근거 없으면 "확실치 않음")
5) 등록: 레지스트리 yaml → 다리(bridge) 자동 갱신 → 검색·그래프 합류
```
- **분담:** 2~3 추출·정리 = 로컬(DeepSeek 리서치) / 1·4·스키마 = Claude. (봄 규칙)
- **clean-not-compress:** 소스 원문(논문 초록·Paula's 텍스트)도 보존 → 근거 추적.

## 변경이력
- v0.5 (2026-06-24) — ★§4.2 제품설명-성분 충돌 해결 정책(Product Truth Ladder·exposure_strength[함량+INCI순위+제품형태]·제품설명 둘로 쪼갬·10원칙+Opus 4 refine[claim-source 통합·안전/효능 비대칭·confidence 전파·투명출력]·concentration_source_priority). + §1.5.3~1.5.7 성분 데이터 5대 불변식(regulatory_class·provenance·기능≠계열·퍼지금지·mapping_resolution). B1.1 alias/group 로더 12/12. retinyl-palmitate 별칭갭 해소.
- v0.4 (2026-06-23) — §4.1 ★농도 적재 버그 발견(`ingest_file`가 concentration에 None 하드코딩 → 146행 전NULL·`ingredients` 0행, 수정 예정: %정규화+레지스트리 로더) + §6 진척(성분 192/200·COSMILE 상속) + §1.7 검수 결과(적대 검증으로 지어낸 인용 ~21개 교정).
- v0.3 (2026-06-23) — ★★§1.5 명명 표준(atom=ing:slug==파일명·name 3언어·aliases·한 분자 한 atom — "무엇보다 중요", Leo) + §1.6 "성분 추가해줘" 자동 명령 절차. 192개 atom 정규화(58개 수정: ing:누락·aha/bha 오류). CLAUDE.md §1·메모리 반영.
- v0.2 (2026-06-22) — §7 현재 62성분 구축 계획(카테고리별 소스·우선순위·성분 1개 프로세스) 추가.
- v0.1 (2026-06-22) — 최초. 해자 정의(농도/순도별 근거) · 엔트리 스키마 · 소스(SCCS·CIR·식약처·PubMed·Paula's, EWG 참고만) · 분류(도메인·카테고리) · ★성분→제품 자동지도(그래프 idempotent) · 워크플로 · 단계. (Leo: "이것이 가장 중요한 작업. 성분→기능+제품 지도, 추가/삭제 자동.")
