# SIASIU 자가성장 지식 설계서 (Self-Growing Knowledge) · 정본

> **버전 v0.2 · 2026-06-24**
> **AI가 *지식기억*을 갖는다.** 모르면 *화이트리스트에서 찾고* → *잠정 지식*으로 기억 → 밤에 **Opus가 재검증** → 맞으면 *놀리지로 승격* → **다음엔 더 똑똑.** = 매일 밤 강해지는 *복리 해자.* Foundation 전 도메인 공통(뷰티·건강·여행·논문).
> 정합: [[foundation_vision]] · [[SIASIU_검색아키텍처_설계서]](grounding·web_search) · [[SIASIU_메모리_설계서]](2번규칙·안전비대칭) · [[SIASIU_가드레일_설계서]](효능단정금지) · 인용표준(§1.7) · [[clean-not-compress]] · 명명표준(atom).
> **원칙:** 정확도>속도 · 휴리스틱금지 · 안전비대칭 · ★**검증은 무조건 Opus만**(Leo) · ★**사람지식↔AI학습지식 영구 분리**(Leo) · ★**잠정지식은 구조적으로 격리**(필터 아닌 *별도 테이블*).
>
> **변경이력**
> - **v0.5 (2026-06-24) — ★통합 검색: KB + 인터넷을 *한 엔진*으로(Leo·구현 가능):** 검색 엔진(bm25·벡터·그래프·리랭커·RRF)을 *corpus-agnostic* — *같은 필터/랭킹*이 KB(영속·검증)든 웹 TEI(임시·검증전)든 돈다. 검색 = `RRF(Engine(q,KB), Engine(q,webTEI))` + provenance(검증 KB *우선·고신뢰* / 웹 *커버리지 보강·라벨·저가중*). 별도 웹시스템 ❌=엔진 재사용. (§8.6·불변식 20.)
> - **v0.4 (2026-06-24) — ★웹검색을 *지식검색*으로(Leo·일반 RAG와 결별):** 웹결과를 AI에 직접 투입 ❌ → **Temporary Evidence Index(임시 근거 색인)**: 우리 엔진(벡터·그래프·리랭킹)을 *웹결과에도* 태워 임시 지식베이스를 만들고 *최고 근거만* 선별 → evidence pack만 답변에 전달. **세상지식 4층**(Raw Web → TEI → staged → Official KB·절대 Raw에서 직접 답 ❌). **웹 근거 5점수**(source_quality·topical_relevance·atom_match·evidence_strength·applicability − conflict − overclaim) + 임시 그래프(관계판단) + 라벨("확인한 근거 기준으로는…"). §8 전면 확장.
> - **v0.3 (2026-06-24) — Leo 리뷰 6보강(정본화):** ①**claim_type**(function·risk·interaction·contraindication·usage·concentration·population_warning·evidence_summary·regulatory_limit — 검증강도·답변사용 다름) ②**evidence_level**(regulatory>systematic_review>rct>clinical>observational>in_vitro>expert_review>brand_claim>anecdotal — *단정 방지*) ③**applicability_scope**(applies_to: skin_type·life_stage·age·usage_context·conc_range·frequency — "누구에게 맞고 안 맞는가") ④**claim_status_type**(positive/negative/insufficient/conflicting evidence·safety_precaution — ★*근거부족≠효과없음*) ⑤**next_review_at+review_policy**(승격 후에도 재검증 주기·고위험/의료 30d) ⑥**상태별 추임새**(실제 내부작업과 일치). + 5원칙(화이트리스트=검토자격·claim단위 승격·적용범위 필수·승격≠출처세탁·추임새=진짜작업).
> - **v0.2 (2026-06-24)** — 5컴포넌트 깊이설계 종합: ★구조적 격리(staged=별도 테이블·색인에 없음→answer.py가 물리적으로 못 봄)·3테이블 구체 스키마·`regrow.py` 일일잡·메모리 *3평면*(사용자/세상/색인)·커버리지게이트≠라우터·NCBI E-utilities 앵커·집합연산 판단(zero-LLM)·충돌해결·사람/Opus 승격게이트.
> - **v0.1 (2026-06-24)** — 최초. 루프·provenance·화이트리스트·Opus-only·추임새.

---

## 0. 한 줄 + ★3평면 (정신모델)
*놀리지를 박는 게 아니라 **자라게** 한다.* 메모리(사용자 사실)와 지식(세상 사실)은 *같은 상태기계, 다른 평면.* `upsert_fact`의 2번규칙·안전비대칭·default-deny·audit을 *그대로* 지식판으로.
```
[저장 축 — 어디에 사는가]
평면1  메모리(memory_fact)   = 이 사용자의 사실 (회피·따가움)         brain.py
평면2  지식(knowledge_claim)  = 세상의 사실 (레티놀+나이아신=순화)  ★신규 regrow.py
평면3  색인(documents/chunks/edges) = *검증된 KB만* (답변이 보는 곳)   ssbrain
```
★**세상 지식의 4층 (어떻게 흐르는가 · 절대 위→아래 건너뛰기 ❌):**
```
Layer4  Raw Web Results        검색 원본·판단 0          → 절대 직접 답변 ❌
Layer3  Temporary Evidence Index 이번 질문용 임시 색인(벡터·그래프·리랭킹)→evidence pack  → 답변(라벨 §8) ✓
Layer2  Knowledge Memory(staged) 성장 큐·검증 전(평면2)    → 답변 직접 사용 ❌(격리)·하루치 누적
Layer1  Official KB(평면3)       Opus 검증·색인·영구       → 답변 자유 사용 ✓
```
*웹에서 찾은 같은 claim이 → TEI(이번 답용)에 쓰이고 + Knowledge Memory staged(밤에 검증)로 저장.*

## 1. 전체 루프
```
질문 → ① KB 검색(grounding gate, 평면3)
   └ 근거 충분 → 답(우리 자료)
   └ 근거 불충분(★커버리지 게이트) → ② 웹검색(화이트리스트 §5) + ④ 추임새(§7)
        → ★Temporary Evidence Index(§8): 파싱→claim/atom 추출→*임시* 벡터·그래프·리랭킹→evidence pack (웹도 *지식검색*처럼!)
        → 답(evidence pack만·라벨 "확인한 근거 기준으로는…"·출처 비대칭)
        → ③ pack의 claim을 knowledge_claim *staged* 저장 (평면2·provenance=ai_learned)
  ─ 하루치 누적 ─
   → ⑤ ★일일 재검증 잡(regrow.py) = WebSearch 앵커 실재확인 + trigger_query 재현 + **Opus 적대검수**(무조건 Opus·§4)
        → verified → 사람/Opus 승격게이트 → 놀리지(평면3)로 색인 합류
        → rejected → 폐기 / flagged → 사람(Leo) 검토
= 스스로 성장. (도메인 공통: domain+atom 두 필드로 일반화.)
```

## 2. ★구조적 격리 — 가장 중요한 결정
**잠정지식은 `verify_state` *필터*가 아니라 *별도 테이블*로 격리.** 필터는 한 곳만 깜빡해도 새지만, **documents/chunks/edges(색인)에 *애초에 안 넣으면* `answer.py`·`kb_search`가 물리적으로 못 본다.** → grounding 오염을 *코드가 아니라 구조*가 막는다(정확도>속도의 구조적 구현·휴리스틱 아님). **★`answer.py`·`kb_search`·`graph.py` 변경 = 0** (이게 격리의 증거).

## 3. 지식기억 스키마 (3 테이블 · `ssbrain/schema.py`에 추가)
**① `knowledge_claim`** — 검증가능한 단언 1개:
```
claim_id   TEXT PK = sha256(domain|atom|claim_norm)   # 멱등(중복 INSERT 방지)
domain     TEXT          # ingredient | health | functional_medicine | traditional_medicine | travel …
atom       TEXT          # ★명명표준 ing:retinol / hlth:magnesium-cramp (bridge.massage 수렴·NULL이면 unanchored→flagged)
claim      TEXT NOT NULL # verbatim 원문 (clean-not-compress·truncate 금지)
claim_norm TEXT          # 중복비교키(표시는 항상 원본 claim)
claim_type TEXT          # ★(A) ingredient_function|ingredient_risk|ingredient_interaction|contraindication|usage_instruction
                         #     |concentration_guidance|population_warning|evidence_summary|regulatory_limit — *검증강도·답변사용 다름*(금기·경고는 더 엄격)
claim_status_type TEXT   # ★(D) positive_evidence|negative_evidence|insufficient_evidence|conflicting_evidence|safety_precaution
                         #     ★*근거 부족(insufficient)을 효과 없음(negative)으로 말하지 않게.* 4문장 구분: "A위험"≠"A안전근거 부족"≠"A효과없음 근거有"≠"A효과근거 부족"
evidence_level TEXT      # ★(B) regulatory|systematic_review|rct|clinical_study|observational|in_vitro|expert_review|brand_claim|anecdotal
                         #     — 답변이 "강한 근거/가능성/제한적/브랜드 주장" 구분(단정 금지). claim의 *최강 근거수준*
applies_to TEXT(JSON)    # ★(C) {skin_type, life_stage(pregnancy…), age_group, usage_context(beginner…), concentration_range, frequency}
                         #     — *적용 범위.* 없으면 너무 넓게 적용 위험. "누구에게·어느 조건·어느 농도/상황에"(Foundation 핵심)
polarity   TEXT          # assert | caution | avoid  ★avoid/caution=안전쪽·supersede 안 됨·추가만
verify_state TEXT        # staged → verifying → verified | rejected | flagged | superseded
confidence REAL          # 0.40 staged → +0.25/독립확인 → ≥0.60 corroborated → 0.9 verified (메모리 게이팅 상속)
corroboration INT        # ★2번규칙 일반화: 서로 다른 출처/검수일이라야 +1
domain_risk TEXT         # low|medium|high  ★high(자극·임신·약물병용)=verified여도 사람 게이트 필수
provenance_origin TEXT   # ★ human_curated | ai_learned | bom_ported | external (§9·영구·승격해도 불변 — ★*승격은 출처 세탁이 아니다*)
trigger_query TEXT       # 이 지식을 끌어낸 질문 원문(일일잡이 재질의→재현성 대조)
created_at·updated_at·as_of
last_reverified_at TEXT · next_review_at TEXT   # ★(E) 승격 후에도 재검증 주기(아래 review_policy로 계산)
```
**★(E) review_policy** (승격 후에도 끝 아님 — 시간 지나면 변함: 건강·규제·성분안전):
```
high_risk: 30d · medical: 30d · regulatory: 90d · cosmetic_general: 180d · brand_claim: 30d
```
→ 승격 시 claim_type·domain_risk로 next_review_at 설정 → 도래하면 regrow.py가 *재검증 큐*에 다시 올림(앵커 실재·새 근거·모순 재확인).
**② `claim_source`** — claim↔출처·검증앵커(서지환각 차단 §1.7):
```
claim_id FK · anchor_type(pmid|pmc|식약처고시|sccs|cir|official_org) · anchor_id(예 PMID:38249466)
url · author_year TEXT NULL(★확인된 것만·틀린저자<저자없음) · verified_by_websearch INT(0|1·실재확인)
whitelist_tier TEXT(T1|T2|T3 §5) · evidence_level TEXT(§B regulatory…anecdotal — 이 출처의 근거수준)
PK(claim_id, anchor_type, anchor_id)
# claim.evidence_level = 이 source들 중 *최강* 수준(도출). claim.applies_to·claim_status_type = Opus가 source 종합 판정.
```
**③ `regrow_audit`** — provenance/감사(삭제 금지·롤백 가능):
```
ts · claim_id · actor(web_ingest|daily_job|opus_adversary|human) · action(staged|recheck|promote|reject|flag|supersede|rollback)
from_state·to_state · model(검수 모델·WebSearch 여부) · evidence_delta · note(Opus 적대 판정 사유 원문)
```

## 4. ★검증 게이트 — *무조건 Opus만* (Leo 하드룰) · `regrow.py`
- **승격 판정은 오직 Opus.**(추출·검색은 빠른 모델 OK, *정식지식 승격*은 Opus 단독.) 새벽 1회 잡(로컬 MVP=수동 `python -m ssbrain.regrow`).
- **3중 재확인:** ①`claim_source` 앵커를 WebSearch로 *실재성* 재확인(PMID 진짜?·고시 유효?) — *생성 모델과 다른 호출* ②`trigger_query` 재질의 → 같은 결론 재현되나 ③**Opus 적대검수**("이 claim을 *반박*하라" — 인용일치·과장·효능단정·서지위조).
- **판정:** Opus PASS + 앵커≥1 실재 + corroboration≥2 + domain_risk≠high → `verified`. 반박/앵커위조 → **`rejected`(폐기)**. 애매·고위험·unanchored → `flagged`(사람).
- **안전비대칭:** `safety_flag`/의료·효능·금기는 *훨씬 엄격* — 강근거(Tier1·실측) 없으면 폐기·보류. 절대 단정 ❌.

## 5. ★근거 화이트리스트 (Evidence Whitelist) — 뷰티 + 건강 (Leo·중요)
*신뢰 등급(Tier)* — 모두 동등 ❌. default-deny(화이트리스트 밖=차단). 도메인별·확장가능(새 출처=사람 승인). ★**앵커는 NCBI E-utilities 등 *실데이터*로만 채움**(저자·연도는 기관이 준 확정값만).
### 5A. 화장품/뷰티
| Tier | 출처 |
|---|---|
| **T1 정본/규제** | PubMed/PMC · **CIR** · **SCCS**(EU) · **식약처 고시** · FDA · CosIng |
| **T2 리뷰/전문가** | J Cosmet Dermatol·JAAD 피어리뷰 · **Paula's Choice**(인용有) · **LabMuffin**(Michelle Wong PhD) · INCIDecoder |
| **T3 브랜드/일화** | 브랜드 주장·블로그 → *플래그·교차확인*(승격 ❌) |
### 5B. 건강 (기능의학·전통의학) — 스스로 쌓이게
| Tier | 출처 |
|---|---|
| **T1** | PubMed/PMC · **Cochrane** · NIH ODS · 규제기관 |
| **T2** | **Examine.com**(인용有) · IFM(기능의학) · 피어리뷰 |
| **T3** | **전통의학/한의학**·일화 → *약 tier·강 corroboration 필요·효능/의료 단정 절대 ❌* |
- **규칙:** 승격엔 T1/T2 검증앵커. T3 단독 승격 ❌. *안전·효능 주장은 T1만.*
- ★**화이트리스트 = "정답 목록"이 아니라 "검토할 *자격* 목록".** PubMed에 있다고 무조건 맞는 것도, Paula's가 말한다고 바로 정식지식이 되는 것도 ❌. 화이트리스트는 *문을 열어주는 기준*이고 — 승격은 Opus 검증·근거수준(evidence_level)·적용범위(applies_to)·충돌검사를 *통과해야* 한다. (Leo)
- ★**승격은 claim 단위로만** — 출처 문서를 *통째로* 승격하지 않는다. 한 논문에서 *검증된 단언 하나씩.*

## 6. ★성분↔성분 상호작용 그래프 (조합의 영향력) · `graph.py` 옆
현 edges는 성분→제품만 → **성분↔성분 무방향 *의미 엣지* 별도 테이블 추가:**
```
interaction_edge: src_atom · dst_atom · relation(buffers|amplifies|deactivates|synergy|risk)
  · effect · condition · strength · anchors[PMID] · provenance · verify_state
```
- **판단 = zero-LLM 집합연산**(`eval_combination`): 제품 성분셋 ∩ 등록엣지 → buffers/risk 평가 → 추천/거절. *결정론(휴리스틱 아님).*
- **안전비대칭:** `risk`는 1근거로 즉시 active / `synergy·buffers`(긍정주장)는 2번규칙·Opus 통과 전 hypothesis(상담 노출 ❌). ★`unknown_pairs_count`를 verdict에 *정직히 노출*("평가 못 한 조합 있음").
- **MVP:** 스키마+엔진 먼저 → 시드 엣지 5~8개(retinol+niacinamide=buffers, retinol+aha=risk…)로 RET-C/RET-D end-to-end 통과.

## 7. ★추임새 (Conversational Filler) — 기다림을 *케어*로 (Leo·꼭)
- **역할 3가지:** ①침묵 불안 줄임 ②AI가 *지금 뭘 하는지* 투명하게 ③*속도보다 정확도* 브랜드 철학을 경험하게.
- ★**상태별 — 실제 내부작업과 *일치*해야**(Leo·하지 않는 작업을 하는 척 ❌):
```
KB 재검색 중   → "우리 지식베이스에서 관련 근거를 다시 확인하고 있어요."
웹검색 중      → "근거 자료를 확인하고 있어요."
논문검색 중    → "논문과 리뷰 자료를 확인하고 있어요."
Opus 검증 중   → "방금 찾은 근거가 과장 없이 맞는지 검토하고 있어요."
```
- **투명성=신뢰**·"길게 기다리지 않게"(진행감·짧게)·완료 시 *출처와 함께*·다국어(모국어 환대). 정합: [[SIASIU_상담_대화_설계서]]·봄 추임새.

## 8. ★웹 근거 검색 파이프라인 — Temporary Evidence Index (일반 RAG와 결별 · Leo)
**웹검색은 "답변 재료를 바로 가져오는 것"이 아니라 — *임시 지식 후보 풀을 만들고, 그 안에서 다시 벡터·그래프·리랭킹으로 최고 근거를 선별*하는 *지식 성장* 과정.** 화이트리스트는 *검토 자격*일 뿐(§5) — PubMed에서 20개 와도 트레티노인·동물실험·고농도처방·오래된 리뷰가 섞임 → *그대로 AI에 넣으면 "좋아보이는 문장"을 골라 답함 = 일반 RAG.* 그래서 **웹결과도 KB와 *같은 엔진*을 태운다(단 검증 전이라 더 엄격).**

### 8.1 라우팅 — 커버리지 게이트 ≠ 라우터
**`_route_query`(의도: 외부정보 필요?) AND 커버리지 게이트(결과: KB가 실제로 근거 모았나)** — *둘 다* 참일 때만 웹. 기본 OFF(`.secrets/search_key` 없으면 web=[]).

### 8.2 ★파이프라인 (8단계 · ssbrain 엔진 재사용)
```
질문 → KB검색 → 커버리지게이트 → (불충분) → 신뢰 웹검색 → Web Candidate Pool
 → Evidence Retrieval Pipeline:
    1. Source Tier Filter   (화이트리스트 §5 · default-deny · 앵커 없으면 인용자격 박탈)
    2. Document Parsing     (원문/초록/가이드라인/리뷰 추출)
    3. Claim Extraction     (claim 후보 단위로 분해)
    4. Atom Mapping         (bridge.massage → ing:retinol·hlth:… 태깅)
    5. Vector Retrieval     (★임시 색인 — e5로 질문↔claim 의미매칭)
    6. Graph Expansion      (★임시 그래프 — 8.4)
    7. Reranking            (bge + 5점수 §8.3)
    8. Evidence Pack Build  (선별된 근거만)
 → 답변(★evidence pack만 봄·라벨 §8.5) → claim을 knowledge_claim staged(평면2) → Opus 재검증(§4) → 승격/폐기
```
★**답변 AI는 웹페이지 전체(Raw)를 못 본다 — *evidence pack만.*** (Layer4→Layer3 강제.)

### 8.3 ★웹 근거 5점수 (단순 관련도 ❌)
```
final_evidence_score = source_quality + topical_relevance + atom_match + evidence_strength + applicability
                       − conflict_penalty − overclaim_risk
```
①**source_quality**(PubMed·CIR·SCCS·식약처·Cochrane 신뢰도=Tier) ②**topical_relevance**(질문과 직접 관련) ③**atom_match**(retinol·niacinamide·pregnancy·sensitive·concentration 핵심 atom 적중) ④**evidence_strength**(규제>systematic review>RCT>clinical>in-vitro>expert — §B) ⑤**applicability**(★실제 사용자 조건 적용? *화장품 농도인가 처방약 농도인가·임산부·민감성*) − 충돌 − 과장위험.

### 8.4 ★임시 그래프 (관계 판단 — 문서 찾기보다 중요)
"민감성인데 레티놀 0.3%+나이아신아마이드?" → 벡터검색만 하면 단어 든 문서만 옴. *진짜 할 일은 관계 판단:*
```
retinol --risk--> irritation · niacinamide --supports--> barrier · panthenol --buffers--> irritation
retinol+AHA --amplifies_risk--> irritation · pregnancy+retinol --avoid--> usage
```
→ 웹결과에서도 *임시 상호작용 엣지*를 뽑아(§6 모델·검증 전) AI가 *이 관계 위에서* 답한다.

### 8.5 ★라벨 — 정식 지식 아님을 *항상* 표시
evidence pack(웹·검증 전)으로 답할 땐: "*현재 확인한 근거 기준으로는…*" / "*아직 우리 정식 지식베이스에 승격된 내용은 아니지만, 출처 확인 결과 이 자료들은…*". 고위험(임신·약물·자극)은 *더 조심·단정 ❌.* (정식 KB(Layer1)는 라벨 없이.)

### 8.6 ★통합 검색 — KB + 웹, *같은 엔진*으로 (Leo · 구현 가능)
**검색 엔진을 *corpus-agnostic*으로** — *같은 필터/랭킹*(bm25·벡터·그래프·리랭커·RRF·5점수·grounding)이 KB든 웹 TEI든 돈다. *미래 검색 = 지식 + 인터넷 모두 분석·융합.*
```
Engine.search(query, corpus):                    # corpus만 다름, 로직 동일
    KB_corpus  = documents/chunks/edges           (검증·영속·Layer1)
    web_TEI    = 웹결과로 만든 임시 corpus          (검증전·임시·Layer3·§8.2)
unified = RRF( Engine.search(q, KB),  Engine.search(q, web_TEI) ) + provenance 태그
   → KB(검증) *우선·고신뢰* / 웹 TEI(검증전)는 *커버리지 갭 보강·라벨·저가중*
   → 한 evidence pack(검증 KB + 웹 라벨) → 답
```
- **구현:** 엔진 로직 그대로·corpus만 교체(영속 vs 임시). **별도 웹 검색 시스템 안 만듦 = ssbrain 재사용.** (지금 KB에 하는 그대로 웹에도.)
- **융합 규칙:** 같은 atom·같은 결론이면 *검증 KB 우선.* 웹만 있는 근거는 *라벨·저가중*으로 보강(빈 곳만). 모순이면 *검증 KB가 이김*(웹은 staged로 모순 기록 → 밤에 Opus 판정).

## 9. ★Provenance 분리 (사람↔AI) — 재검증의 생명 (Leo)
- `provenance_origin`: **human_curated ↔ ai_learned** 영구 분리(승격해도 ai_learned 불변).
- 가능해지는 것: ①재검증 *타깃팅*(human=스팟·ai=전수) ②신뢰 *가중*(human≥ai) ③**롤백**(틀린 출처 ai_learned만 싹·human 안 건드림) ④**투명성**("근거: 사람검수 / AI학습·Opus검증 PMID:xx").
- 모든 전이 `regrow_audit` 1행(삭제 금지) → *어느 질문에서·어느 출처로·언제·누가/어느 게이트로* 완전 추적.

## 10. 충돌 해결 (승격 직전)
같은 atom의 verified와 모순 검사: ①**안전비대칭** — 새 claim이 caution/avoid면 supersede 안 하고 *추가만*(default-deny) ②assert끼리 모순 → 최신 앵커·강한 증거수준(RCT>관찰>in-vitro) 우선, 패자 `superseded`(보존) ③동급 모순 → 자동승격 보류 `flagged`(사람).

## 11. 거버넌스 — 사람/Opus 승격 게이트
- **자동 = "verified 후보" 큐까지.** 실제 KB 적재(`promoted`) = **사람(Leo) 승인 1클릭**(특히 고위험·의료). §1.6(성분 검수=Opus 직접) 준수. 완전 자동승격 = 환각 누적의 가장 빠른 길 → 경계.
- 승격 산출물 = 볼트 `knowledge/<domain>/<slug>.md` 정본(clean-not-compress·인용표준) → 기존 ingest로 색인(코드 변경 0). 롤백 = 색인 제거 + .md archive(원본 삭제 ❌ §0.5).

## 12. 통합 (기존 재사용·새 발명 최소)
- `ssbrain/schema.py` 3테이블 추가(SCHEMA_VERSION+1·멱등 마이그·기존 무손실). `documents/chunks/edges` 무수정.
- `brain.py` web 경로에 `stage_web_knowledge()` 훅(web_search 후 staged INSERT). chat/kb 경로 변경 0.
- 신규 `ssbrain/regrow.py`(재검증·Opus 적대·승격 ingest) — import만·중복 0.
- `answer.py`·`kb_search`·`graph.py` ★변경 0(구조적 격리).

## 13. 구현 단계 (설계 먼저·Leo 승인 후·카테고리별)
①3테이블 스키마 ②웹 staging 훅+커버리지 게이트 ③`regrow.py`(Opus 재검증·승격) ④상호작용 그래프(스키마+`eval_combination`+시드 5~8) ⑤추임새 통합 ⑥거버넌스(롤백·audit·사람 게이트). *레티놀 매트릭스(픽스처)로 end-to-end 검증.*

## 14. ★불변식
1. **검증은 무조건 Opus만.** 2. **사람지식↔AI학습지식 영구 분리**(origin 불변). 3. **잠정지식은 별도 테이블·색인에 없음**(answer.py 물리적으로 못 봄). 4. **검증 전엔 정식지식 ❌**. 5. **폐기·롤백 가능**. 6. 안전·효능·의료는 강근거 없으면 단정 ❌(보류·폐기). 7. 자동승격은 비고위험만·고위험은 사람 승인. 8. 화이트리스트 밖=승격 불가. 9. 앵커 없는 주장=인용/승격 자격 박탈. 10. clean-not-compress·audit 삭제 금지·version/changelog.
**★ Leo 5원칙 (v0.3):** 11. **화이트리스트는 정답 목록이 아니라 *검토 자격* 목록.** 12. **정식 KB 승격은 *claim 단위*로만** — 출처 문서를 통째로 ❌. 13. **모든 claim은 *적용 범위(applies_to)*를 가져야** — 누구에게·어떤 조건·어느 농도/상황. 14. **AI가 배운 지식은 승격 후에도 ai_learned** — *승격은 출처 세탁이 아니다.* 15. **추임새는 *실제 내부 작업 상태와 일치*** — 하지 않는 작업을 하는 척 ❌. 16. **근거 부족 ≠ 효과 없음**(claim_status_type으로 구분).
**★ TEI 원칙 (v0.4):** 17. **Raw Web에서 *직접* 답변 ❌** — 반드시 Temporary Evidence Index(벡터·그래프·리랭킹·5점수) 거쳐 *evidence pack만* 답변에 전달(웹도 *지식검색*처럼). 18. **웹/검증 전 근거 답변은 *항상* "검증 전" 라벨**("확인한 근거 기준으로는…"). 19. **웹검색 = 답 찾기가 아니라 *임시 지식베이스 만들고 최고 근거 선별*하는 성장 파이프라인.**
**★ 통합검색 원칙 (v0.5):** 20. **검색 엔진은 *corpus-agnostic* — KB·웹에 *같은 필터/랭킹.*** 검색 = `RRF(Engine(KB), Engine(webTEI))` 융합(검증 KB *우선·고신뢰*·웹 *라벨·저가중·갭보강*·모순 시 검증 KB 승). 별도 웹시스템 ❌(ssbrain 재사용).

## 15. 한 줄
*AI가 지식기억을 갖고, 모르면 화이트리스트에서 찾아 추임새로 기다리게 하고, 밤에 Opus가 검증해, 검증된 것만 놀리지로 키운다 — 사람것과 AI것을 영구 구분하며, 잠정은 구조적으로 격리해. 매일 밤 더 똑똑해지는, 세상에 없던 복리 해자.*
