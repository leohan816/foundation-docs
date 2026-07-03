# SIASIU 브레인 설계서 — BomBrain을 참조해 *똑똑한 브레인*으로 재구성 (정본·골격)

> **버전 v0.2 · 2026-06-23 · 🌱 골격 (이식하며 완성)**
> SIASIU가 *우리 KB에서 올바른 정보를 가져와* 답하는 엔진. 봄 BomBrain의 영혼을 참조하되, *똑똑한 LLM(DeepSeek)* 전제로 재구성.
> **참조 원천(봄):** `~/Project/BOM/설계문서/BomBrain_작동설계.md`(영혼·여정·7겹) · `검색엔진_설계.md`(검색·grounding 알고리즘) · `지식베이스_설계.md`(§8 이식 스펙). **읽어서 적응(복붙 X).**
> **짝 문서(우리):** `~/Project/foundation-vault/00_VAULT_설계.md`(데이터·정본↔사본) · `Cosmile/설계자료/..._제품스파인_설계서.md`(제품).
> **상태:** 골격 — 빌드하며 채움. §8 열린 결정 확정 후 세부 확정.

---

## 0. ★ 1번 원칙 — 똑똑한 브레인 전제 (Leo 2026-06-22)
봄의 7겹 방어는 *작은 8B의 약점 + 실시간 대화 제약*을 보상하는 크러치가 많다. **SIASIU/COSMILE은 똑똑한 LLM(DeepSeek/Claude급)이라 — 가치는 지키고, 크러치는 덜고, 오히려 더 철저히.**
- **유지(모델 무관 가치):** 의미검색 · grounding(*우리 데이터에서만*) · **"모르면 모른다"** · 다국어.
- **가벼워짐(8B 보상):** 점진읽기 map-reduce → *큰 컨텍스트 한 번에* · 2단 grounding → *똑똑한 판사 직접* · diet → 유용하나 비존재적.
- **더 철저히(똑똑함 레버리지):** claim별 검증·관계 그래프·**성분 함량 안전 판단**을 더 엄밀하게.

## 1. 본질 (한 줄)
**우리 KB에서 의미로 검색(제품+지식+성분) → 똑똑한 LLM에게 *우리가 찾은 자료만* 줌 → 그 안에서만 답 → 모르면 모른다.**
- 봄 = "멍청한 모델 둘레에 방어벽" / SIASIU = "**똑똑한 모델을 우리 데이터에 묶기**". 목표 같음, 수단 더 단순·철저.

## 1.5 ★ 전략 단계 (Leo 2026-06-22)
- **지금 = 오로지 제품으로 승부.** 제품(one-record 스파인) 검색·grounded 추천이 *핵심.* **지식 내용은 지금 추가하지 않는다.**
- **지식 = 장기 해자:** 봄 지식은 대부분 *건강*(화장품 거의 없음). → 화장품 지식(성분 과학·논문·유명 유튜버)은 **우리가 직접 구축** — *장기작업일 수밖에 없음.* 단 **구조를 지금 설계(엔진·스키마·diet 파이프라인 준비)해 두면, 내용 채우기는 나중 *시간문제*.**
- 엔진은 제품+지식 *통합검색*이라 — 지금 제품만으로 돌리고, 지식은 준비된 구조에 *나중에 적재하면 즉시 합류*.
- 건강 지식이 필요하면 그때 *봄에서 큐레이션 복사*(건강은 봄에 풍부). 화장품 지식만 신축.

## 2. 모듈 구조 (봄 `bom/bombrain/` 적응)
```
app/ssbrain/   (봄 bom/bombrain 적응 — 구현됨 2026-06-22)
├── schema.py    SQLite 8테이블 + ★ingredients·product_ingredients(성분 함량 안전, 봄에 없음) — 파일=정본/DB=파생
├── text.py      토크나이저: 라틴 단어 + ★한글 bigram (FTS5 trigram이 2글자 못 잡음)
├── bm25.py      어휘 검색(인메모리 BM25, 시드규모)
├── vector.py    의미 검색: e5-small 임베딩 + ★numpy 코사인(=FAISS IndexFlatIP, 시드규모)
├── engine.py    BM25+벡터 RRF 융합(doc-level max-pool) + from_db(DB→엔진)
├── rerank.py    bge cross-encoder(로컬·지연로드·조건부만)
├── ingest.py    제품 .md(YAML+直播话术) → documents·chunks·edges·product_ingredients (변종 단위 청크)
├── bridge.py    ★CLIR 다리(한↔영↔중 글로서리)+원자매핑 — 결정론(무휴리스틱). cross-lingual 토대
├── graph.py     관계 그래프 — 원자→엣지→제품(성분/고민/안전→제품) 부스트·rescue
├── rerank.py    bge cross-encoder(max_length=512) 조건부 재정렬
├── answer.py    grounded 답: 우리 자료만→LLM(_llm 라우터)→pre-gate→모르면 모름
└── (diet·큐레이션·grounding 심화·함량 임계값 safety) — 지식/성분안전 KB 적재 시
```
**검증(2026-06-22):** COSMILE 실제품 20개(중국어)를 ko/zh/en 다국어로 검색 성공 · 단어+벡터+그래프+리랭커+다리 전부 작동 · cross-lingual 증명(모공=毛孔=pore 같은 제품).
**★diet 규칙:** 제품=클린만(COSMILE 원자화) / 지식=클린+diet(전사·기사 광고·과장 제거 — grounding 작동).
**핵심 구현 결정(왜):**
- **한글 bigram** 토크나이저 — FTS5 trigram이 진정·모공(2글자) 못 잡음.
- **numpy 코사인** — 시드규모엔 FAISS IndexFlatIP와 동일결과·의존성 리스크 회피. 코퍼스 크면 FAISS.
- **변종 단위 청크** — "모공"→핑크솔트 변종만 매칭(변종별 검색). zh主张은 e5가 ko질의와 의미매칭.
- **LLM = `_llm` 라우터**(DeepSeek now, 로컬 later 스왑) · **검색·임베딩(e5)·리랭커(bge) = 전부 로컬 → 토큰 0**(전송0 안 깸).

## 3. 요청 한 번의 여정 (SIASIU판 — 봄 §4 단순화)
```
질문 → [Query Massage(다국어 다리)] → [의미검색: BM25+벡터+RRF+큐레이션+(고위험)리랭커 + 그래프]
     → [pre-gate: 근거 없으면 생성 X] → [똑똑한 LLM 생성 — 우리 자료에만 근거]
     → [post grounding(verify_output): claim 대조 → PASS/TRIM/DOWNGRADE/UNKNOWN, ★fail-closed] → 답 + 결정로그
```
- 봄의 deep_read map-reduce·2단 grounding은 *똑똑한 LLM이 직접*으로 단순화(§0).
- **★ consult 배선(구현 2026-06-23):** `brain.chat`이 `kb_search`(CLIR 양방향 + 전체 엔진[BM25+벡터+RRF+그래프+조건부 리랭커] + ★회피 필터)로 근거를 가져와 답을 grounding. = 상담 화면이 우리 KB에 *실제로 묶임*(추측 아님).
- **★ verify_output = fail-closed:** 출력 검증 실패 시 *통과시키지 않는다*(default-deny). 못 지킬 claim은 답하지 않는 게 낫다(신뢰=해자).

## 4. 데이터 (공유 볼트 읽음 — 정본↔사본)
- `products/`(COSMILE 주도) · `knowledge/{beauty,health}`(SIASIU 주도) · `knowledge/ingredients/`(★성분안전, SIASIU 신축).
- 개발=볼트 공유 참조 / 런칭=프로젝트 복사 사본. 색인(.index)은 파생.

## 5. 이식 순서 (단계)
1. schema(+ingredients) + ingest  2. BM25+그래프(가벼움)  3. grounding gate  4. answer + consult 배선  5. 벡터(e5)+리랭커(bge)  6. 측정(시드 qrels).
*(§8 결정에 따라 단계 묶음/순서 조정.)*

## 6. ★ 봄 대비 차이 (요약)
**diet = 지식엔 필요·제품엔 불필요**(제품=클린만, COSMILE 원자화 / 지식=클린+diet, 건강·뷰티 심층상담) · deep_read 단순 · grounding 똑똑한 판사 직접 · 전송0은 *설정*(라우터) · 제품+지식 *한 엔진 통합 검색* · 성분 함량 안전 *신축*.

## 6.5 ★★ 휴리스틱 근본 제거 — production 0 (구현 2026-06-23, Leo 원칙)
**"키워드로 의미 추측 금지, 근본만."** 브레인 코드에서 키워드 매칭·정규식 어림짐작을 *프로덕션 경로에서 전부 걷어냄*(휴리스틱 0). 임시방편으로 새던 자리를 결정론/LLM 의미판단/정직으로 교체:
- **scale 판단:** `_infer_scale`(정규식→scale 추측) **제거** → *LLM이 선언한 scale을 신뢰 + 화이트리스트로 검증*. (정규식 추측 ❌ / 선언+검증 ⭕)
- **성분 위험·회피 탐지:** `_ingredient_risk`·`_NEG`(키워드로 회피 탐지) **제거** → *LLM이 추출한 `avoid_list`만* 사용.
- **KB 적중·추출:** `_kb_hit`·`_stub_extract`(키워드 스텁) **제거** → LLM 없으면 *추측하지 않고 정직하게 비움*("모름" 정직 — 가짜 적중 금지).
- **★ 유지하는 안전 비대칭:** 회피 사실(avoid)은 *supersede 하지 않고 추가만* 한다(default-deny 방향). 새 근거가 회피사실을 *덮어쓰지 않음* — 안전쪽으로만 누적.
> 구분(설계 규율): *날짜→명절·scale→고정보기* 같은 **정확한 결정론**은 휴리스틱이 아님(OK). *키워드로 의도·의미를 추측*하는 것만 휴리스틱(금지). 불가피하면 빌드 전 Leo 승인.

---

## 8. 결정 (Leo 2026-06-22 확정)
1. **LLM 처리 = DeepSeek 전부 (`_llm` 라우터).** 나중 로컬 모델로 config 한 줄 스왑. (전송0은 *설정*.)
2. **풀 의미검색 지금.** 벡터(e5-small)+리랭커(bge)+FAISS = torch/sentence-transformers/faiss 도입. **brain 전용 venv 격리** (server.py stdlib 유지).
3. **각 프로젝트 자기 색인.** SIASIU 자기 `.index`(지식 주도), COSMILE 자기 색인(제품 주도). 쓰기 격리·런칭 사본 정합.
4. **오늘 = 시드로 end-to-end.** 제품·지식 몇 개 시드 → 검색 → grounded 답까지 실제 동작.
+ 봄에 물을 기술 디테일(구조화 함량 저장·Query Massage 프로덕션 형태·부하·gotchas)은 진행 중 보강.

## 9. COSMILE 상속 (이식성)
휴리스틱 0·fail-closed·`kb_search`(CLIR 전체엔진+회피필터)·안전 비대칭(추가만)은 *프로젝트 무관 코드 자산*이다. COSMILE도 같은 `ssbrain`을 쓰므로, 이 정직성 규율(추측 금지·default-deny)은 그대로 상속 — 제품몰(COSMILE)이든 상담(SIASIU)이든 *동일한 근거기반·정직 답변*을 보장한다.

## 변경이력
- v0.2 (2026-06-23) — consult가 ssbrain KB에 실배선(`brain.chat`→`kb_search`: CLIR 양방향+전체엔진+회피필터로 grounding)을 §3에 반영. §6.5 신설: 휴리스틱 근본 제거(production 0 — `_infer_scale`·`_ingredient_risk`·`_NEG`·`_kb_hit`·`_stub_extract` 제거, LLM 선언 scale+화이트리스트·LLM `avoid_list`·정직한 비움으로 교체) + 안전 비대칭(회피 supersede 안 함·추가만) 유지. `verify_output` fail-closed 명시. COSMILE 상속(이식성) 추가.
- v0.1 (2026-06-22) — 골격 신설. 똑똑한 브레인 전제(§0) · 본질 · 모듈구조(봄 적응+성분안전) · 여정(단순화) · 이식순서 · 열린결정 4. (Leo: "봄 이식하며 나중 완성할 SIASIU 브레인 설계구조를 만들어.")
