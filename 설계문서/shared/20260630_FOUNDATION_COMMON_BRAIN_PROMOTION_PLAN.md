# Foundation Common Brain Promotion Plan — 2026-06-30

> **계획 전용. 구현 0.** SIASIU 세션 Source Package(`SIASIU/설계문서/SIASIU_TO_FOUNDATION_COMMON_BRAIN_SOURCE_PACKAGE_20260630.{md,json}`, read-only) + 직전 lineage audit(`1ac8297`)를 근거로 Foundation common brain 승격 framework를 확정한다.
> 원칙: **복사가 아니라 승격.** framework(알고리즘/구조) = control-tower 관할(common brain) · 어휘/정책/페르소나/CANON/SEED_KB/domain/product schema = **SIASIU repo-local 주입**. ★기존 Foundation **v0.3 response_plan·v0.3.1 candidate guard를 깨지 않는다**(additive·regression-gated).

## 0. 중심 통찰 — 왜 "이식했는데 라이브가 그대로"인가 (Path A ≠ Path B)
Source Package §1이 근본 원인을 확정: SIASIU 답변 면은 **2개**.
- **Path A (라이브 상담)**: `server.py /api/chat → brain.chat → ssbrain.engine(BM25+vector+graph+rerank) → DeepSeek → verify_output → memory`. **실제 사용자가 쓰는 엔진.**
- **Path B (ssbrain answer 면)**: `ssbrain/answer.py answer() → safety_gate/external_guard`. 데모/테스트가 호출. **Foundation shadow가 감싼 건 이쪽.**
→ **Foundation은 Path B를 감쌌는데 사용자는 Path A를 쓴다.** 그래서 검색/작문/추천/메모리 실로직은 한 줄도 안 갔다(§3: absent ~40). ★승격 계획은 반드시 **Path A 엔진의 framework**를 대상으로 해야 하며, 최종에는 brain.chat이 common brain을 호출하도록 전환(계약은 control, 배선은 SIASIU)해야 의미가 있다.

## 1. Foundation에 이미 있는 것 (중복 승격 금지)
| 위치 | 보유 | 상태 |
|---|---|---|
| foundation-control `foundation_http_service/core.py`(v0.3.1) | `_classify_intent`(11 intent)·`_kw_risk`·`_detect_conditions`·`_detect_concern_families`·`_refine_intent`·`_response_mode`·`_build_response_plan`/`_build_clarification_plan`·**Candidate Override Guard**·`_permissions`·rule composer(`_plain_explanation`/`_compose_answer`) | dev/shadow 결정론·검증됨(40/40·16/16·19/19·180) |
| FOUNDATION repo | contracts·shadow wrapper·**LMR(memory trust 일부)**·Trust Core/Safety Guard·`answer_type_classifier.classify`(**migrated_real**) | 운영 core |
| FOUNDATION repo | `safety_gate`·`external_guard` | **rebuilt_abstraction_only**(이름만 같은 새 계약 — 실 로직 아님) |

→ 즉 **판단/플랜/가드/메모리-신뢰 일부 + classifier 1개**만 있다. **검색·근거·작문(LLM)·output verify·evidence mode·redaction 실로직은 없음.**

## 2. Foundation에 없는 것 (absent — 승격 대상 본체)
Source Package §3 기준 ~40 부품 absent. 핵심:
- **Retrieval 스택 전체**: `ssbrain/{engine,bridge,bm25,vector,graph,rerank,text,ingest,schema}` — 하이브리드 검색·RRF·CLIR massage·rerank.
- **Brain 오케스트레이터**: `brain.chat`·`guardrail_classify/check`·`kb_search`·`_llm`/`_deepseek`·`verify_output`·memory(`extract`/`upsert_fact`/`recall`)·`avoid_list`(추천 권한).
- **Path B 답변 스택**: `ssbrain/answer.py`·`evidence_mode`·`answer_provenance`·`disclosure_policy` redaction 실로직.
- **products 추천**(`recos`/`pitch`/`checkins`)·CANON/메모리 스키마·history/session.

## 3. 복사하면 안 되는 SIASIU-specific (반드시 분리·주입형으로)
Source Package §4 직접 채택:
| 부품 | 복사 금지 이유 |
|---|---|
| `bridge.py` 글로서리 | KO/EN/ZH 성분·고민 atom **하드코딩**(K-뷰티) |
| `graph.py` edge 의미(concern:/ing:/safe:) | Cosmile/뷰티 도메인 관계 |
| `text.py` tokens | 한국어 형태 처리 |
| `CANON`·`SAFETY_TYPES`·`SEED_KB` | K-뷰티 사실타입·임신/회피·시드 지식 |
| `_system_prompt` PERSONA·TALK_STYLE | 존댓말·한국 드라마 톤·도메인 문구 |
| `guardrail_classify` domain 목록 | 피부/기능의학/퍼스널컬러 = SIASIU 영역 |
| `products.py` 스키마·avoid atoms | K-뷰티 제품·성분 |

## 4. Foundation common framework로 승격할 부분 (골격만)
Source Package §5 + 직전 audit 통합. **"알고리즘=common brain, 어휘/정책/페르소나=SIASIU 주입"(Fixed Data, Fluid Knowledge).**

| framework (common) | 공통화할 골격 | SIASIU 주입(repo-local) | 현재 Foundation |
|---|---|---|---|
| **F1 Answer-Type/Category Classifier** | answer_type taxonomy·우선순위·**category-word 격리**·substring-safe matcher·**default-to-education**·routine·**adverse(따가)** | category lexicon·domain 어휘 | classifier 1개(migrated)·intent 11(단순) |
| **F2 Retrieval Fusion** | RRF + BM25 + dense + rerank 파이프 골격 | bridge 글로서리·atom·brand 규칙·임베딩 모델 | **없음** |
| **F3 Grounding Gate** | 검색→근거유무→답/"모름" 컷(지어내기 금지) | KB 소스·근거 임계 | 없음(candidate 무조건 주입) |
| **F4 Guardrail Framework** | LLM 의미분류 골격·default-deny | domain 목록·risk 정책 | 부분(키워드 risk) |
| **F5 Output Verify** | LLM-judge 검수(internal/efficacy/avoid/**fabrication**)·fail-closed | 회피·금칙 어휘 | 없음 |
| **F6 Evidence Mode** | confidence→answer_mode(**candidate→cautious cap**·assertive 금지) | 위험 카테고리 | 없음 |
| **F7 Memory Trust** | 사실 신뢰·stale·supersede·SAFETY 불변·격리 | CANON 타입·라벨 | **LMR로 일부 이식** |
| **F8 Composer 계약 + LLM Router** | "LLM=표현만, 판단 고정" 계약·task→tier 라우팅 | PERSONA·언어·task 매핑 | rule composer만 |

## 5. SIASIU repo-local 주입층으로 남길 부분
Source Package §8:
- 어휘/정책/페르소나/도메인 데이터: bridge 글로서리·atom·CANON·SAFETY_TYPES·SEED_KB·PERSONA/TALK_STYLE·guardrail domain·products 스키마·avoid atoms.
- **라이브 배선**: `brain.chat`이 common brain framework를 호출하도록 전환(계약=control tower, repo-local 구현=SIASIU).
- **임시 라이브 fix**(온보딩→메모리·환각 가드 [보류 A]): SIASIU repo-local(단일 repo live 품질).

## 6. 우선순위 (Source Package §6 + 잔여 6 gap + Path 정합)
- **P0 (즉시·답변 품질 직결, LLM/검색 불필요·결정론)**:
  - **F1 Answer-Type/Category Classifier 승격** ← 직전 audit의 잔여 gap **#5(선크림⊃크림)·#6(토너 usage)·#7(세럼 routine)·#8(따가 adverse)**를 직접 해결. **foundation_http_service additive·response_plan/guard 불변.** ← **가장 빠른 win, 첫 train.**
- **P0 (framework 골격·검색 품질의 본체)**: F2 Retrieval Fusion · F3 Grounding Gate · F4 Guardrail · F5 Output Verify(+fabrication) · F7 Memory Trust 정합(CANON 주입 인터페이스).
- **P1**: F6 Evidence Mode/answer_mode cap · F8 Composer 계약(LLM표현층) · disclosure redaction · ingest/schema 추상.
- **P2**: products 추천 권한 framework · pitch/checkins · answer_provenance trace · **Path A 라이브 전환**(brain.chat→common brain, 승인·별도 train).

## 7. 다음 implementation train (순서)
> 각 train은 별도 설계서(설계자료) → 승인 → 구현. ★전부 v0.3 response_plan·v0.3.1 guard regression-gated.

1. **Train T1 — Foundation Answer-Type Classifier + Category Disambiguation (P0, 결정론·즉시)**
   - foundation_http_service additive: category-word 격리(intent rule에서 category 제외) · substring-safe category matcher(TYPE_MAP 별키 원리) · routine_guidance type · default-to-education · adverse lexicon(따가). ★어휘는 주입형 인터페이스로(SIASIU lexicon 주입 가능하게).
   - **불변**: response_plan·clarification_plan·candidate guard·40/40·16/16·19/19·180.
2. **Train T2 — Retrieval Fusion + Grounding Gate framework (P0, dev/shadow)**
   - RRF/BM25/dense/rerank **골격**을 control-tower-owned framework로(어휘/모델/KB는 주입). Grounding Gate: 근거 없으면 "확인할게요" 컷. ★Cosmile candidate 무조건 주입을 **need-gated retrieval**로 대체하는 근본 해결.
3. **Train T3 — Guardrail + Output Verify + Evidence Mode framework (P0/P1, dev/shadow)**
   - default-deny guardrail 계약 · output verify(+fabrication) fail-closed · evidence answer_mode(candidate→cautious cap). LLM은 계약/인터페이스만(실 호출은 별도 승인).
4. **Train T4 — Composer 계약 + LLM Router (P1)**
   - "LLM=표현, 판단 고정" 계약 · task→tier 라우터(실 LLM 연결은 canonical §17 guarded·승인).
5. **Train T5 — Memory Trust 정합 + Multi-turn Context (P1)** · **Train T6 — Path A 라이브 전환(P2·승인)**.

## 8. 테스트 전략
**공통 게이트(모든 train 필수)**: 기존 v0.2 40/40 · v0.3 16/16 · guard v0.3.1 19/19 · adversarial 180(`decision_integrity_pass_rate=1.0`·`false_recommendation=0`) **유지**. live/write/promotion/memory = 0.

| framework | 승격 시 테스트(Source Package §7) |
|---|---|
| F1 Classifier | 카테고리어 단독→교육(토너 꼭 써야 해?) · 선크림≠크림 · 언제 발라→routine · 따가→adverse · "추천/골라"만 recommendation · **180 adversarial 잔여 6 gap 0** |
| F2 Retrieval Fusion | rrf 채널내 best-rank dedup·다채널 합산·빈채널 · engine top-k·graph 구제·brand 필터·full text 보존 |
| F3 Grounding Gate | 근거 있음→자신 / 없음→"확인할게요"(지어내기 0) |
| F4 Guardrail | injection/medical/payment 분류·default-deny·on-domain 통과 |
| F5 Output Verify | internal/efficacy/avoid + **fabrication(저장 없는 기억 단정) 차단**·fail-closed |
| F6 Evidence Mode | 임신/의료→cautious cap·assertive 금지 |
| F7 Memory Trust | SAFETY 즉시 active·decay 0·SINGLE supersede·cross-customer 격리·삭제 재등장 0 |
| F8 Composer | LLM 교체해도 판단 불변(표현만)·존댓말 유지(주입 언어별) |

**회귀 보호 원칙**: 각 framework는 기존 judge **앞/옆에 additive layer**로 붙고, 기존 decision/safety/intent/products/permission 출력 불변. classifier(T1)는 intent 정밀화만(refined_intent/response_mode 호환). Path A 라이브 전환(T6)은 모든 framework 검증 + 승인 후 최후.

## 9. 소유권 (Source Package §8 채택)
| 작업 | 소유 |
|---|---|
| F1~F8 framework 골격 추출·계약 | **foundation-control**(cross-project = control tower) |
| 어휘/정책/페르소나/도메인 주입(bridge·atom·CANON·SEED_KB·PERSONA·domain·products) | **SIASIU repo-local** |
| answer_type_classifier 일반화 마무리 | **both**(계약=control·어휘=SIASIU) |
| brain.chat→common brain 라이브 전환 | **control 계획 → SIASIU 구현** |
| 임시 라이브 fix(보류 A) | **SIASIU repo-local** |

## no_change_assertions
구현 0 · Foundation 코드 0 · SIASIU 코드 0 · Cosmile 0 · FOUNDATION repo 0 · contract 0 · canonical 0 · memory write 0 · push 0. 본 plan(md/json)만 생성. Source Package는 read-only로만 읽음.

## 한 줄 결론
Foundation에 없는 건 **검색 융합·그라운딩 게이트·가드레일·출력검증·evidence mode·composer 계약·LLM 라우터의 골격**이고, 지금 거의 **absent**다. **복사가 아니라 골격만 승격**(control tower) + **어휘/정책/페르소나는 SIASIU 주입**. **첫 train은 결정론 F1 classifier**(잔여 6 gap 즉시 해결, response_plan/guard 불변), 이후 F2~F8을 dev/shadow additive로, **Path A 라이브 전환은 최후·승인.**
