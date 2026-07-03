# SIASIU 실제 엔진 → Foundation Common Brain 승격용 Source Package

> 2026-06-30 · read-only audit 산출물 · foundation-control 세션 인계용
> ★핵심 발견(숫자 아님): **실 엔진은 거의 전부 `foundation_status=absent`.** Foundation엔 *계약·shadow·가드 추상·LMR·classifier 1개*만 있고, **실제 검색/작문/추천/메모리 로직은 단 한 줄도 안 갔습니다.** 유일 예외: `answer_type_classifier.classify`=migrated_real, `safety_gate`/`external_guard`=*이름만 같은 새 추상*(rebuilt_abstraction_only).
>
> 근거: read-only 워크플로 2회(`siasiu-answer-pipeline-audit`, `siasiu-engine-promotion-source-package`) + `app/brain.py` 58함수 정독 + `FOUNDATION/foundation/_core/` 대조. 코드/문서 수정 0.

---

## §1. 두 경로 분리 (★출발점)

SIASIU엔 답변 면이 **2개**입니다. 헷갈리면 이식이 망가집니다.

| | **경로 A — 라이브 상담** | **경로 B — ssbrain answer 면** |
|---|---|---|
| 진입 | `server.py /api/chat` → `brain.chat()` | `ssbrain/answer.py answer()` |
| 검색 | `brain.kb_search` → `ssbrain.engine.Engine.search` | (자체 engine 호출) |
| 안전 | `brain.guardrail_check/verify_output` | `answer.py safety_gate` + `disclosure_policy.external_guard` |
| 근거모드 | (프롬프트 주입) | `evidence_mode.evidence_answer_mode` + `answer_provenance.compose` |
| 누가 호출? | **실제 앱**(스샷·온보딩·메모리) | `ssbrain/demo.py`·`tests/test_ssbrain.py` (데모/테스트) |
| Foundation이 감싼 대상 | ❌ 아님 | ✅ **이쪽**(`foundation_brain_answer_adapter`가 감쌈) |

→ **Foundation shadow로 감싼 건 경로 B인데, 실제 사용자가 쓰는 건 경로 A.** 이 어긋남이 "이식했는데 라이브가 그대로"의 근본 원인.

## §2. 부품 인벤토리 (파일·함수·역할·I/O·의존)

### 경로 A — `app/brain.py` (라이브 오케스트레이터, 58 함수 중 핵심)

| 함수(line) | 역할 | 입력→출력 | 의존 | F상태 |
|---|---|---|---|---|
| `chat`(866) | **오케스트레이터** | (user_id,msg,name,lang)→{reply,memory,used_deepseek} | 아래 전부 | absent |
| `guardrail_classify`(705)/`guardrail_check`(728) | LLM 의미 분류(domain/risk)·차단 | msg→{domain,risk} | `_llm` | absent |
| `kb_search`(557) | retrieval 진입 | (query,user)→근거 문자열[] | `_kb_engine`→ssbrain | absent |
| `_system_prompt`(418)+`_output_lang`(505)+`_localize`(399) | composer(페르소나·그라운딩·언어) | user_id→system prompt | PERSONA·TALK_STYLE | absent |
| `_llm`(805)/`_deepseek`(776) | LLM 라우터·생성 | (task,msgs)→text | DeepSeek API | absent |
| `verify_output`(748) | 출력검증(internal/efficacy/avoid) | (reply,avoid)→{ok,issue} | `_llm` | absent |
| `memory_context`(289)·`active_facts`(129)·`recent_episodes`(123) | 기억 주입 | user_id→facts/episodes | DB | absent |
| `extract`(855)/`_deepseek_extract`(842)·`upsert_fact`(214)·`_norm_value`(175) | 사실 추출·정규화·저장 | msg→facts→DB | `_llm`·CANON | absent |
| `recall`(1266)·`recall_greeting`(338)·`_suggestion_chips`(1089) | 재진입·회상·추천칩 | user_id→greeting/chips | facts | absent |
| `avoid_list`(135)·`avoid_atoms`(138) | **추천 권한(회피성분)** | user_id→atom set | bridge.massage | absent |
| `recos`(1119)·`pitch`(1058)·`checkins`(1258) | 추천·음성·체크인 | user_id→추천 | products·voice | absent |
| `CANON`·`SAFETY_TYPES`·`SINGLE` (data) | 사실타입 레지스트리 | — | — | absent |
| `_conn`(61)·`init_db`(75)·DB 스키마 | memory.db(user/episode/memory_fact/fact_type_registry) | — | sqlite3 | absent |

### 경로 A 검색 스택 — `app/ssbrain/` (전부 absent · 대부분 P0)

| 부품 | 역할 | I/O | 의존 | SIASIU-specific |
|---|---|---|---|---|
| `engine.py:Engine.search` | 하이브리드 검색 오케스트레이터(BM25+vector+graph+rerank, RRF) | (query,k,cand,brand,rerank_on,opts)→hits[{doc_id,score,vscore,title,text,…}] | bm25·vector·graph·rerank·bridge·text | **yes**(intent마커·brand·atom) |
| `engine.py:rrf` | Reciprocal Rank Fusion | (channels,k=60)→{doc_id:score} | stdlib | **no**(표준) |
| `bridge.py:massage` | Query Massage/CLIR | query→{expanded,atoms,matched} | text.surface_match | **yes**(KO/EN/ZH 글로서리 하드코딩) |
| `bm25.py:build/search` | 어휘 검색(IDF) | chunks/query→hits | text.tokens | **no**(표준 BM25) |
| `vector.py:build/search` | 밀집 의미 검색(cos) | chunks/query→hits(384d) | **sentence_transformers**(intfloat/multilingual-e5-small)·**numpy** | partial(모델 교체가능) |
| `graph.py:load/related` | 성분→제품 그래프(atom→doc) | conn/atoms→doc_ids | sqlite | **yes**(atom 의미·edge 관계) |
| `rerank.py:rerank` | 조건부 크로스인코더(head+tail #6 불변) | (query,hits,top_n)→재정렬 | **CrossEncoder**(BAAI/bge-reranker-v2-m3) | partial |
| `text.py:tokens/surface_match` | 한국어 토큰화·표면매칭 | text→tokens | — | **yes**(한국어 형태) |
| `ingest.py:parse_product/ingest_*` | 제품·지식 인제스트 | files→ssbrain.sqlite | — | yes |
| `schema.py:connect` | ssbrain.sqlite DB 연결/스키마 | — | sqlite | yes |

### 경로 B — `ssbrain/answer.py` + 지원 (Foundation이 감싼 면)

| 부품 | 역할 | F상태 |
|---|---|---|
| `ssbrain/answer.py:answer()` | 근거 기반 답변 생성 | **absent** |
| `ssbrain/answer.py:safety_gate()` | 안전 게이트 | rebuilt_abstraction_only |
| `app/disclosure_policy.py:external_guard()` | 외부 노출 가드 | rebuilt_abstraction_only |
| `app/disclosure_policy.py:classify_sensitive/redact` | 민감분류·redaction | absent |
| `app/evidence_mode.py:evidence_answer_mode/cap_mode` | 근거→answer_mode | absent |
| `app/answer_provenance.py:compose/select_phrase/pick_opener/build_trace/is_forbidden` | 답 조립·문구·trace·금칙 | **absent** |
| `app/answer_type_classifier.py:classify` | answer_type 분류 | ✅ **migrated_real** (유일) |

## §3. 이식됨 vs 없음 (요약)
- ✅ **migrated_real (1)**: `answer_type_classifier.classify`.
- ⚠️ **rebuilt_abstraction_only (2)**: `safety_gate`·`external_guard` — *실 로직 아님, 이름만 같은 새 계약*.
- ❌ **absent (나머지 전부 ~40 부품)**: 검색 스택 전체·brain 오케스트레이터·answer.py·evidence_mode·answer_provenance·disclosure redaction·products 추천·CANON/메모리 스키마·avoid 권한.

## §4. 그대로 복사 금지 — SIASIU-specific (반드시 분리)
| 부품 | 왜 복사 금지 |
|---|---|
| `bridge.py` 글로서리 | KO/EN/ZH 성분·고민 atom **하드코딩**(K-뷰티 어휘) |
| `graph.py` edge 의미 | concern:/ing:/safe: 관계 = COSMILE 도메인 |
| `text.py` tokens | 한국어 형태 처리 |
| `CANON`·`SAFETY_TYPES`·`SEED_KB` | K-뷰티 사실타입·임신/회피·시드 지식 |
| `_system_prompt` PERSONA·TALK_STYLE | **존댓말 절대·한국 드라마 톤**·도메인 문구 |
| `guardrail_classify` domain 목록 | 피부/기능의학/퍼스널컬러 = SIASIU 영역 정의 |
| `products.py` 스키마·avoid atoms | K-뷰티 제품·성분 |

## §5. 일반화해 가져올 부품 (Foundation Common Brain 후보)
**원리: 알고리즘/구조는 common brain, 어휘/정책/페르소나는 SIASIU가 주입** (현지화 설계서 "Fixed Data, Fluid Knowledge"):

| 일반화 부품(framework) | 무엇을 공통화 | SIASIU가 주입할 것 |
|---|---|---|
| **Retrieval Fusion** (rrf+bm25+vector+rerank 골격) | RRF·BM25·dense·rerank 파이프 | bridge 글로서리·atom·brand 규칙 |
| **Grounding Gate** (검색→근거유무→답/보류) | 근거 임계·"모름" 컷 | KB 소스·임계값 |
| **Guardrail Framework** (LLM 의미분류 골격) | classify(domain/risk) 구조·default-deny | domain 목록·risk 정책 |
| **Output Verify Framework** | LLM-judge 검수 구조(internal/efficacy/avoid/**fabrication**) | 회피 목록·금칙 |
| **Evidence Mode** | confidence→answer_mode(cautious cap) | 위험 카테고리 |
| **Memory Trust** (이미 LMR로 일부 이식) | 사실 신뢰·stale·supersede·SAFETY 불변 | CANON 타입·라벨 |
| **Answer Composer 인터페이스** | "LLM=표현만, 판단 고정" 계약(LLM표현층 설계서) | PERSONA·언어 |
| **LLM Router** (`_llm` task→tier) | 프로바이더 스위칭·사용량 로깅 | task 매핑 |

## §6. 승격 우선순위
- **P0 (먼저·답변 품질 직결)**: ① Retrieval Fusion framework(rrf/bm25/vector/rerank) ② Grounding Gate ③ Guardrail framework ④ Output Verify(+**fabrication** 항목 신설) ⑤ Memory Trust 정합(CANON 주입 인터페이스).
- **P1**: ⑥ Evidence Mode/answer_mode cap ⑦ Answer Composer 계약(LLM표현층) ⑧ disclosure redaction ⑨ ingest/schema 추상.
- **P2**: ⑩ products 추천 권한 framework ⑪ pitch/checkins ⑫ answer_provenance trace.

## §7. 부품별 검증 테스트 케이스 (가져왔을 때)
| 부품 | 테스트 |
|---|---|
| Retrieval Fusion | `rrf` 채널내 best-rank dedup·다채널 합산·빈채널; `engine.search` top-k·graph 구제·brand 필터·full text 보존 |
| BM25/Vector | 키워드 검색 단조성·빈코퍼스; 임베딩 shape(n,384)·cos·vscore>0 필터·no-overlap zero-out |
| Bridge(주입형) | CJK→Latin 확장(모공→pore/毛孔)·atom 추론·교차간섭 차단(주입된 글로서리로) |
| Grounding Gate | 근거 있음→자신 / 없음→"확인할게요" 컷(지어내지 않음) |
| Guardrail | injection/medical/payment/politics 분류·default-deny·on-domain 통과(자외선·기능의학) |
| Output Verify | internal/efficacy/avoid 위반 차단·**fabrication(저장사실 없는 기억 단정) 차단**·fail-closed |
| Evidence Mode | 임신/의료 → cautious cap·assertive 금지 |
| Memory Trust | SAFETY_TYPES 즉시 active·decay 없음·SINGLE supersede·cross-customer 격리·삭제 재등장 0 |
| Composer | LLM 교체해도 판단 불변(표현만 변경)·존댓말 유지(주입 언어별) |

## §8. 소유권 — foundation-control vs SIASIU repo-local
| 작업 | 소유 | 이유 |
|---|---|---|
| Common Brain framework 추출(검색융합·가드·그라운딩·verify·evidence·composer 계약·LLM라우터) | **foundation-control** | cross-project(SIASIU+Cosmile 공통 소비) = control tower 관할 |
| 어휘/정책/페르소나/도메인 데이터 주입층(bridge 글로서리·atom·CANON·SEED_KB·PERSONA·domain·products 스키마) | **SIASIU repo-local** | SIASIU 전용·도메인 결합·복사 금지 |
| `answer_type_classifier` 일반화 마무리(유일 migrated) | **both** | 이미 이식·계약 정합은 control, 어휘는 SIASIU |
| 라이브 brain.py가 common brain을 호출하도록 전환(나중) | **foundation-control 계획 → SIASIU 구현** | 계약은 control, repo-local 배선은 SIASIU |
| 임시 라이브 fix(온보딩→메모리·환각가드) [보류된 A] | **SIASIU repo-local** | live 품질·단일 repo |

---

## 한 줄 결론
승격해야 할 "공통 두뇌"는 **검색 융합·그라운딩 게이트·가드레일·출력검증·evidence mode·composer 계약·LLM 라우터의 *골격(framework)*** 이고, 이건 현재 Foundation에 **거의 없습니다(absent)**. 반대로 **bridge 글로서리·atom·CANON·SEED_KB·PERSONA·도메인 목록은 SIASIU 전용**이라 *복사하지 말고 주입형으로 분리*해야 합니다. framework 추출은 **foundation-control**, 어휘/정책 주입은 **SIASIU repo-local**.

## 부록 — 참조 설계서/코드 (foundation-control 인계)
- 설계서: `FOUNDATION_PIPELINE_WIRING_PLAN_V1.md`·`FOUNDATION_ANSWER_PIPELINE_GUARD_WIRING_V1.md`·`SIASIU_검색아키텍처_설계서.md`·`SIASIU_가드레일_설계서.md`·`SIASIU_메모리_설계서.md`·`SIASIU_상담_대화_설계서.md`·`SIASIU_LLM표현층_설계서.md`·`FOUNDATION_CONFIDENCE_MODEL_V1.md`.
- 코드: `app/brain.py`(chat 외 58함수)·`app/ssbrain/{engine,bridge,bm25,vector,graph,rerank,text,ingest,schema}.py`·`app/ssbrain/answer.py`·`app/{answer_type_classifier,evidence_mode,disclosure_policy,answer_provenance}.py`·`app/products.py`.
- shadow 경계: `app/ssbrain/foundation_*`·`app/foundation_brain_*`·`foundation/`·`/home/leo/Project/FOUNDATION`.
