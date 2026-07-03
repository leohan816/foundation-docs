# Shashu Authoritative Lift Map — SIASIU Path A → Foundation (2026-06-30)

> 작성: 샤슈(SIASIU) · read-only inventory(4 agent) cross-check 후 **샤슈 최종 분류** · ★코드 수정 0 · control 구현 지시 아님
> 목적: control이 brain을 *다시 흉내내지 못하게*, 무엇을 lift / profile / service-owned / keep / deprecate할지 파일·함수·라인으로 고정
> target = `foundation-control/foundation_http_service` (★예전 `FOUNDATION/foundation/_core`와 다름)

---

## A. 요약판

**핵심 한 줄:** control이 만든 *외곽 프레임(API/contract/trace/enforcement/profiles seam)은 살리고*, *흉내낸 brain(판단·작문·메모리)은 실제 SIASIU 코드로 교체*한다. guardrail/verify/repair는 **이미 이식돼 있으니** authoritative 배선만. 진짜 큰 lift는 **① ssbrain 검색엔진 ② brain.py 작문(KB추론)** 둘.

| | 무엇 | 핵심 |
|---|---|---|
| **살릴 것(KEEP)** | API shell·endpoint·response contract·trace·enforcement/permissions·grounding/decide_retrieval·profiles seam·PII guard·llm_guard | control 외곽 프레임 — 쓸 만함 |
| **이미 이식됨** | `llm_guard`(semantic_classify/verify/repair)·`deepseek_composer.compose` | "다시 lift" ❌ → authoritative 배선/SYS 조정만 |
| **fallback으로 강등** | core.py `_classify_intent`·`_kw_risk`(키워드 판정 권위)·`_FAMILY_GUIDANCE`/`_FAMILY_MODEL`(답 뼈대)·`_rule_compose` | 삭제 X — 권위에서 내리고 fallback/hint로 |
| **실제로 가져올 것(LIFT)** | ssbrain `engine/bm25/graph/bridge/rrf/text/schema/ingest`(v1) · brain.py `chat`·`_system_prompt`·`_llm`·`kb_search`·언어/메모리 read·extract 로직 | *복사*(흉내 ❌·런타임 import ❌) |
| **profile로 분리** | PERSONA·TALK_STYLE·BRIDGE·CANON·SAFETY_TYPES·SEED_KB·`_HIGH`/`_MED`·category/condition/risk lexicon | SIASIU profile / Cosmile profile |
| **service-owned** | memory.db·ssbrain.sqlite(KB)·products·고객 facts·로그/캐시·live write | Foundation 엔진이 소유 X — 주입/서비스 |
| **v1 / v1.1** | v1: bm25+graph+bridge+rrf 검색·작문추론 · v1.1: vector(e5)·rerank(cross-encoder)·CLIR(torch 환경) | 섞지 말 것 |

---

## B. 상세 지도 (샤슈 최종 분류)

### B-1. KEEP — Foundation에 남길 control 코드
| file:symbol | line | action | reason |
|---|---|---|---|
| core.py `INVARIANTS·DECISION_TYPES·SAFETY·EVIDENCE·_RISK_ORDER` | 37-43 | KEEP | 응답 contract·decision/safety/evidence 분류(도메인 무관) |
| core.py `_PII·mask_pii·_hash·trace_id` | 46-93 | KEEP | 보안·텔레메트리 — core 유지 |
| core.py `decide_retrieval·grounding_gate·evidence_mode_decide` | 595~720 | KEEP | retrieval 결정·grounding·evidence cap 골격 |
| core.py `_permissions·_build_response_plan·enforcement(consult_chat 내)` | 531~560,1083-1097 | KEEP | 제품 억제/permission — Cosmile 커머스에 유용한 control 자산 |
| `server.py` 엔드포인트(/v1/consult/chat 등) | 50-73 | KEEP | API shell |
| `profiles.py`(DEFAULT/SIASIU/Cosmile seam·get_profile) | 전체 | KEEP | ★주입 seam — lift의 핵심 받침대 |
| `retrieval_provider.py` adapter 구조 | 전체 | KEEP(엔진만 내부복사로) | adapter 골격 유지, import→내부 copy |

### B-2. ALREADY_LIFTED — 다시 가져오지 말 것(배선만)
| file:symbol | line | action | reason |
|---|---|---|---|
| llm_guard.py `semantic_classify` | 63-75 | KEEP + **authoritative化** | 샤슈 guardrail_classify(705) 이식됨. lexicon→prefilter, 이걸 authoritative로 |
| llm_guard.py `semantic_verify` | 78-90 | KEEP | 샤슈 verify_output(748) 이식됨 |
| llm_guard.py `repair` | 93-101 | KEEP | 샤슈 재교정(933) 이식됨 |
| deepseek_composer.py `compose`+`_SYS` | 20,46 | KEEP + **SYS 조정** | composer 존재. "표현만"→"evidence 추론" SYS만 조정(작문 lift와 함께) |

### B-3. LIFT_FROM_SHASHU — 실제 복사 (v1)
| source file:func | line | deps | → target | reason |
|---|---|---|---|---|
| **ssbrain/engine.py** `Engine`(vector_on/rerank_on=False)·`rrf`·`_norm`·`_best_rank_by_doc` | 27-191 | re·bm25·bridge·graph | `foundation_http_service/engine/`(내부 복사) | 검색 독립화 — 런타임 import 제거 |
| **ssbrain/bm25.py** `build·search` | 12-41 | math·text.tokens | 〃 | 순수 Python |
| **ssbrain/graph.py** `load·related` | 11-24 | sqlite·defaultdict | 〃 | 성분→제품 그래프 |
| **ssbrain/bridge.py** `massage` | 46-63 | text.surface_match | 〃 | CLIR/atom(글로서리는 PROFILE로 분리) |
| **ssbrain/text.py** `tokens·surface_match·_surface` | 12-70 | re | 〃 | 토큰화(한국어 형태는 동작·어휘는 데이터) |
| **ssbrain/schema.py** `connect` + **ingest.py** `parse_product/ingest_*` | — | sqlite·yaml | 〃 | KB 빌드(데이터는 service-owned) |
| **brain.py** `chat`(오케스트레이터) | 866-967 | init_db·guardrail·kb_search·_llm·verify | `engine/orchestrator` | ★작문/추론 흐름의 중심 |
| **brain.py** `_system_prompt`(PERSONA 주입형으로) | 418-435 | PERSONA·memory_context | 〃 | 페르소나·그라운딩(PERSONA는 PROFILE) |
| **brain.py** `_llm·_deepseek·_route_query` | 776-816,603 | LLM_TASK_TIER | 〃 | LLM 라우터·생성 |
| **brain.py** `kb_search`(엔진 호출+회피필터+CLIR) | 557-585 | _kb_engine·avoid_atoms | 〃 | 검색 진입(엔진은 내부복사) |
| **brain.py** 언어: `_detect_lang·_output_lang·_localize·_reply_in_lang·_translate_query` | 399-555 | _SUPPORTED_LANGS | 〃 | 다국어(어휘 PROFILE) |
| **brain.py** 메모리 read/format: `memory_context·active_facts·_is_stale·normalize_type·_norm_value·_suggestion_chips·recall` | 129-299,1089,1266 | CANON·_conn | 〃(★로직만) | 사실 *포맷* 로직 — **저장소는 service-owned, 사실은 주입** |
| **brain.py** 추출: `extract·_deepseek_extract·_stub_extract` | 838-861 | _llm·CANON | 〃(compute-only) | fact 추출 로직 — **write는 service, v1은 candidate만** |

### B-4. LIFT — v1.1 보류 (환경/torch)
| source | deps | reason |
|---|---|---|
| ssbrain/**vector.py** `build·search·embed_*·_model` | numpy·**sentence_transformers(e5)** | torch — PEP668 환경 위험 → v1.1 |
| ssbrain/**rerank.py** `rerank·_ce` | **sentence_transformers(BGE cross-encoder)** | torch → v1.1 |
| brain.py CLIR `_translate_query`(LLM 번역) | _llm | 정확도 OK나 다국어 확장은 v1.1 |
| brain.py 버티컬 기능: `pitch·recos·checkins·gen_*` | products·voice | 핵심 상담 아님 — SIASIU profile feature/v1.1 |

### B-5. PROFILE_DATA — core에 두면 안 됨 (SIASIU/Cosmile profile 주입)
| source | line | → profile key |
|---|---|---|
| brain.py `PERSONA·TALK_STYLE` | (상수) | `persona`·`talk_style`(SIASIU) |
| brain.py `CANON·SAFETY_TYPES·SINGLE` | 35-53 | `canon`·`safety_types` |
| brain.py `SEED_KB` | 24-31 | `seed_kb` |
| ssbrain/bridge.py `BRIDGE`(KO/EN/ZH atom 글로서리) | (상수) | `bridge_glossary`·`atoms` |
| core.py `_HIGH·_MED·_SAFETY_KW` | 54-60 | `safety_keywords_high/medium` |
| core.py `_CATEGORY_KW·_CONDITION_KW·_COND_LABEL·_RISK_TAG·_RISK_TAG_KO·_GREETING·_COMPARE·_TOPPICK·_BROAD·_UNCLEAR·_PURCHASE·_ROUTINE·_USAGE_EDU·_RECO_EXTRA·_ADVERSE_SOFT` | 62-179 | `category_lexicon`·`condition_lexicon`·`risk_tag*`·intent lexicons (다수는 profiles.py에 이미 seam 존재) |
| core.py `_FAMILY_MODEL·_FAMILY_GUIDANCE` | 197-240,886-908 | `family_model`·`family_guidance`(★데이터는 profile, *역할*은 fallback로 강등 — B-6) |

### B-6. DEPRECATE_OR_FALLBACK — 권위에서 내림(삭제 X)
| file:symbol | line | action |
|---|---|---|
| core.py `_kw_risk` | 96-102 | 권위 → **prefilter**(semantic_classify가 authoritative) |
| core.py `_classify_intent` | 118-150 | 권위 → **fail-safe fallback**(semantic 우선) |
| core.py `_FAMILY_GUIDANCE`/`_FAMILY_MODEL` (답 뼈대 역할) | 197-240,886 | **backbone → fallback hint**(evidence 없을 때만) |
| core.py `_rule_compose` | 958-967 | **fallback composer로만**(DeepSeek 추론이 주) |
| core.py `_build_brief`의 template key_points 경로 | 925-955 | evidence 추론으로 교체(작문 lift 시) |

### B-7. SERVICE_OWNED — Foundation 엔진 소유 금지
| 항목 | 위치 | 소유 |
|---|---|---|
| `memory.db`(user/episode/memory_fact) | SIASIU app/data | SIASIU(서비스) — 엔진엔 *사실 주입* |
| `ssbrain.sqlite`(KB 데이터) | SIASIU app/data | service KB(엔진 코드는 복사·데이터는 서비스/주입) |
| `products.py`·product DB | SIASIU | service commerce |
| 로그/캐시(`llm_usage·guardrail_log·risk_users·pitch_cache·checkin_pool`) | SIASIU app/data | service |
| `DB_PATH·_SS_PATH·DATA_DIR` 경로 상수 | brain.py 15-16,441 | service config(주입) |

### B-8. DO_NOT_REIMPLEMENT — control이 다시 짜면 안 되는 것
**반드시 원본 lift만**(흉내 금지): `brain.chat`(작문/추론 흐름) · `ssbrain.Engine`(검색) · `_system_prompt`(그라운딩) · `verify_output` 의미(이미 llm_guard) · `memory_context`/`extract`(메모리 로직) · `guardrail_classify` 의미(이미 llm_guard) · `bridge.massage`/`rrf`/`bm25`/`graph`(검색 알고리즘).

---

## C. 첫 번째 단일 미션 지시문 초안 (control용 — Leo 승인 후 발송)

```
[LIFT-MISSION-01] ssbrain 검색엔진 독립화 (런타임 import → Foundation 내부 복사)

왜 첫 미션인가:
 - "lift = 다시 짜기 아님, 실제 코드 복사"의 *패턴을 확립*하는 가장 안전한 단계
 - 지금 retrieval_provider가 SIASIU 경로를 sys.path import → 독립 아님. 이걸 끊어야 진짜 독립
 - 검색은 evidence 원천 → 이후 작문 lift(MISSION-02)의 받침대
 - 동작 불변(같은 엔진) → 전/후 검증이 명확·저위험(판단/작문 미접촉)

source (복사 대상, v1):
 SIASIU/app/ssbrain/  engine.py·bm25.py·graph.py·bridge.py·text.py·schema.py·ingest.py
 (Engine은 vector_on=False·rerank_on=False로 — vector.py·rerank.py는 ★복사 안 함=v1.1)

target:
 foundation-control/foundation_http_service/engine/  (신규 내부 패키지·SIASIU 경로 의존 제거)
 retrieval_provider.py: sys.path(SIASIU/app) import → 내부 engine import로 교체

변경 범위 (이것만):
 - engine/ 에 위 7파일 *복사*(로직 한 줄도 안 바꿈)
 - bridge.py의 BRIDGE 글로서리는 profile 주입 인자로 받게(데이터 분리·로직 유지) — 미주입이면 기존 동작
 - retrieval_provider: KB 경로(ssbrain.sqlite)는 config 주입(기본=현재 SIASIU 경로 read-only)

절대 같이 하면 안 되는 것:
 - vector.py/rerank.py 복사·torch/sentence-transformers 설치 (환경 파괴 위험·v1.1)
 - core.py 판단/작문/_FAMILY_* 손대기 (그건 MISSION-02 이후)
 - guardrail/verify/repair/enforcement/profiles/server 손대기
 - memory/DB/persistent write·Cosmile 연결·v1 완료 선언

완료 기준 (기능):
 (a) retrieval_provider가 SIASIU app을 sys.path import 하지 않음(독립 — grep로 0 확인)
 (b) search("민감 피부 진정 세럼") 결과가 *복사 전과 동일*(engine_search·channels=bm25,graph,bridge·hits 동일)
 (c) vector/rerank 미포함이 trace에 명시(bm25_only=false·vector_off 라벨)
 (d) BRIDGE 글로서리를 profile로 주입 가능(미주입 시 기존 동작 보존)
 (e) 코드 0 변경 of brain.py/core.py 판단·작문, 0 write, 0 push

smoke test:
 - 동일 쿼리 3개 전/후 hits·doc_id·score 동일성
 - SIASIU 꺼도(가상으로 경로 차단) Foundation engine 단독 import 성공
 - core.py·brain.py·SIASIU 무수정 확인(git status)

완료 보고: 복사 파일·target 경로·import 독립 grep·동일성 결과·미접촉 증거. STOP.

다음(MISSION-02 예고, 지금 하지 말 것): brain.py 작문/KB-evidence reasoning lift(MAND-08의 진짜 해결).
```

---

## 주의 (이 지도의 한계)
- 전체 inventory 260항목은 워크플로 JSON에 있음(이 지도는 *샤슈 cross-check 후 권위 분류*).
- 이 문서는 **review/설계** — control 구현 지시 아님. 실제 구현은 Leo 승인 후 LIFT-MISSION-01부터.
- 코드 수정 0 · commit 0 · push 0 · SIASIU/Foundation/foundation-control 무수정.
