# Foundation Brain v1 — Source Migration Ledger (코드 레벨 이식 증빙) — 2026-06-30

> 목적: 샤슈 Path A의 **실제 file/function**이 Foundation 어디로, **어떤 방식으로** 이식됐는지 증명. 개념 설명 금지·source file/function 기준.
> ★정직 요약: 실제 SIASIU 코드의 **read-only 재사용(WRAPPED)은 `ssbrain.bm25`·`ssbrain.sqlite`·`.secrets/deepseek_key` 3개뿐.** 분류·검증·orchestration·memory·composer는 **Foundation 자체 코드(REIMPLEMENTED)** — SIASIU 코드를 import하지 않음. 이는 lineage audit("Foundation은 spec 기반 재구현")와 일치하며, **"코드 이식"이 아니라 "흐름/원리 이식 + 일부 read-only wrapper"**가 정확한 표현이다.

## 원본 흐름 (확인된 실제 코드)
`app/server.py:118 /api/chat → brain.chat()(866) → guardrail_check(728)/guardrail_classify(705, LLM) → memory_context(289) → kb_search(557) → ssbrain.engine.Engine.search(108, bm25+vector+RRF+graph+rerank) → _llm("chat")(923)→_deepseek(776) → verify_output(748, LLM)+재교정(927-943) → extract(855)/upsert_fact(214) → return(967)`

---

## 매핑 (A–K · 11필드)

### A. live entrypoint — **REIMPLEMENTED**
1. SIASIU source file: `app/server.py`
2. source function: `Handler.do_POST` line 118-120 (`if self.path=="/api/chat": brain.chat(...)`) — stdlib `BaseHTTPRequestHandler`
3. 역할: HTTP POST 진입 → orchestrator 호출
4. Foundation file: `foundation_http_service/server.py`
5. Foundation function: `Handler.do_POST` line 67-72 (`/foundation/brain/chat`,`/v1/consult/chat` → `core.consult_chat`) — stdlib `ThreadingHTTPServer`
6. 이식 방식: **reimplementation based on source** (구조 동일=stdlib http.server, 코드는 Foundation 자체 — SIASIU server.py import 안 함)
7. 왜: control workspace 격리·다른 서비스가 호출할 독립 API 필요. SIASIU server.py를 그대로 쓰면 SIASIU runtime 결합.
8. 테스트: `foundation_brain_v1_golden_test.py`(HTTP API 경유) · `foundation_http_service_test`(40)
9. trace 증거: golden trace `request_id`·라이브 8731 `/foundation/brain/chat` 200
10. gap: SIASIU `/api/login`·`/api/reset`·user 세션 관리 미이식
11. v1 허용: ✅ (entrypoint 역할은 동등·계정관리는 범위 밖)

### B. orchestration — **REIMPLEMENTED**
1. `app/brain.py` 2. `chat()` line 866-967 3. 역할: guardrail→memory→kb→LLM→verify→extract 순서 조립
4. `foundation_http_service/core.py` 5. `consult_chat()` line ~966-1090
6. **reimplementation based on source** (같은 단계 순서, 단 **Foundation decision packet(judge)=source of truth**로 재배치 — chat()은 LLM이 답 주도)
7. 왜: Foundation는 decision/products/safety를 judge(T1-T3.5)가 먼저 확정하고 LLM은 표현만 → 판단 불변 보장(핵심 승격 차이)
8. 테스트: golden 21 · `consult_chat` in-process
9. trace: `pipeline_steps=[judge→session→answer_strategy→retrieval→grounding→composer→output_verify→enforcement]`
10. gap: chat()의 다국어 출력언어 결정(_output_lang)·web_search 보강·episode history 미이식
11. v1 허용: ✅ (orchestration 흐름 동등·다국어/web은 별도)

### C. classification / intent — **REIMPLEMENTED (메커니즘 상이) + LLM guardrail NOT MIGRATED**
1. `app/brain.py` 2. `guardrail_check()`(728)+`guardrail_classify()`(705, **`_llm("classify")` LLM 의미분류·"휴리스틱 ❌"**) 3. 역할: default-deny 안전 분류(injection/medical/politics…)
4. `foundation_http_service/core.py` 5. `judge()`(T1 intent/risk) + `guardrail_classify()`(T3, **lexicon/regex 결정론**)
6. **reimplementation based on source** — ★단 SIASIU는 **LLM 의미분류**, Foundation는 **키워드 lexicon**. 라우팅(default-deny→refuse)은 MIGRATED, 분류 *메커니즘*은 상이.
7. 왜: dev-shadow 결정론·LLM 호출 0(분류에). default-deny 라우팅 원리는 그대로.
8. 테스트: `t3_guardrail_verify_evidence`(18) · adversarial 180
9. trace: `guardrail_result.guardrail_action=deny`→`enforcement_reason=guardrail_deny`
10. gap: **SIASIU LLM 의미 guardrail(injection/medical/politics 의미판정) 미이식** — Foundation는 lexicon이라 의미적 우회/신종 표현에 약함(SIASIU가 피하려던 키워드 휴리스틱)
11. v1 허용: ◐ **부분만** — refuse 라우팅은 OK이나 *의미 분류*는 미이식 = **샤슈 리뷰 핵심 위험**

### D. memory — **REIMPLEMENTED (session-only) · persistent NOT MIGRATED**
1. `app/brain.py` 2. `memory_context()`(289)+`active_facts`+`recent_episodes`(123) 3. 역할: 영속 fact DB → 프롬프트 주입 컨텍스트
4. `core.py` 5. `consult_chat` session_context(payload in/out) line ~985-995
6. **reimplementation based on source** — session-only(payload), SIASIU의 sqlite fact store 미연결
7. 왜: persistent customer memory write 금지(CLAUDE.md). session으로 다음 턴 참조만.
8. 테스트: golden 09/10(2-turn deferred)·12(recall)
9. trace: `session_context_in/out`·`memory_provider_called=true`·**`memory_write_performed=false`**·`recommendation_deferred`
10. gap: **SIASIU 영속 fact(active_facts/CANON 타입/stale 처리) 미이식** · recall은 session 발화만
11. v1 허용: ✅ **persistent write 0이 v1 의도** (J 참조)

### E. kb_search — **PARTIAL**
1. `app/brain.py` 2. `kb_search()`(557-585) 3. 역할: CLIR 번역→Engine.search 멀티채널→RRF→**회피성분 제품 배제**→rerank→top-k
4. `foundation_http_service/retrieval_provider.py` 5. `search()`(51)
6. **partial reimplementation + read-only wrapper** — bm25 채널만
7. 왜: numpy/torch 미설치(vector), CLIR LLM 호출 0 목표. 실제 KB 텍스트는 읽음(real retrieval).
8. 테스트: `t2_retrieval_grounding`(16) · golden retrieval_provider_called
9. trace: `retrieval_provider_called=true`·`retrieved_hits_count`·`source_trace`·`retrieval_channels=[ssbrain_bm25_ro]`
10. gap: **CLIR 번역·RRF 융합·회피성분 배제·rerank 전부 미이식**
11. v1 허용: ◐ "real retrieval"은 맞으나 **kb_search 전체 이식 아님** — 명시 필요

### F. search engine — **WRAPPED (bm25 채널만) · Engine.search NOT MIGRATED**
1. `app/ssbrain/engine.py` 2. `Engine.search()`(108-, **bm25+vector(e5)+RRF+graph(ing→product)+name/atom boost+rerank**)+`from_db()`(74) 3. 역할: 멀티채널 하이브리드 검색
4. `retrieval_provider.py` 5. `_build()`(26)+`search()` — `ssbrain.bm25.build/search` **직접 호출**
6. **read-only wrapper** — ★단 **`Engine.search`가 아니라 `ssbrain.bm25`(하위 1개 채널)만** import. `Engine`/`from_db`는 numpy 의존으로 미사용.
7. 왜: `Engine.from_db`가 numpy(vector index) 필요·환경 미설치(PEP668 차단). bm25는 순수 파이썬.
8. 테스트: golden retrieval(hits=4)
9. trace: `retriever=ssbrain_bm25_ro`·hits·source_trace(doc_id/score)
10. gap: **vector(e5)·graph 부스트·RRF·name/atom boost·bridge.massage(다국어 확장)·rerank 전부 미이식** = `Engine.search` 대비 1/6 채널
11. v1 허용: ◐ **"전체 search 이식" 아님 — bm25 wrapper만.** 근거 품질 제한 = 샤슈 리뷰 위험

### G. DeepSeek input construction — **REIMPLEMENTED**
1. `app/brain.py` 2. line 880-921 `sysp` 조립(`_system_prompt`+memory_context+`[검증 지식]`hits(891-895)+`[검증 지식 없음]`defer(897)+lang) 3. 역할: system 프롬프트에 memory/근거/safety 주입
4. `deepseek_composer.py`+`core.py` 5. `_build_brief()`(923)+`compose()` user packet+`_SYS`
6. **reimplementation based on source** — sysp 문자열 조립 → 구조화 brief(key_points/evidence/memory/next_question). 근거 규율("우선 근거·없는 건 단정 금지") 문구 정신 그대로.
7. 왜: decision packet 기반·검증 가능한 구조 입력. SIASIU 문구를 복붙하지 않고 의미 정렬.
8. 테스트: golden `composer_input_contains_evidence`
9. trace: `composer_input_contains_evidence`·`composer_input_hash`·brief.memory/evidence
10. gap: PERSONA/TALK_STYLE 실문구·다국어 지시·web 출처 비대칭 미이식
11. v1 허용: ✅ (입력 구성 정신 동등·persona 실주입은 별도)

### H. DeepSeek call — **REIMPLEMENTED (동일 endpoint·key read-only)**
1. `app/brain.py` 2. `_deepseek()`(776-790)+`_llm()`(805)+`reply=_llm("chat",msgs)`(923) 3. 역할: DeepSeek API 호출
4. `deepseek_composer.py` 5. `_call_deepseek()`(37)+`compose()`(47)
6. **reimplementation based on source** — 동일 endpoint(`api.deepseek.com/chat/completions`)·model(deepseek-chat)·auth(Bearer), **키는 `SIASIU/.secrets/deepseek_key` read-only 재사용**. 코드는 Foundation 자체 urllib(brain._deepseek import 안 함).
7. 왜: 동일 제공사 호출이 목적이나 SIASIU runtime 결합 회피·composer 전용 guard.
8. 테스트: golden `deepseek_called=true`(20/21)·라이브 8731 smoke
9. trace: `deepseek_called=true`·`deepseek_latency_ms`·`usage`·`composer_provider=deepseek`
10. gap: SIASIU `_llm` tier 라우팅(cheap/mid/premium)·usage 로깅·다국어 재생성 미이식
11. v1 허용: ✅ **실제 DeepSeek 호출 증명됨** (tier/로깅은 별도)

### I. verify_output — **REIMPLEMENTED (메커니즘 상이) · LLM verify+재교정 NOT MIGRATED**
1. `app/brain.py` 2. `verify_output()`(748-767, **`_llm("classify")` LLM 검수**)+재교정 루프(927-943) 3. 역할: 답 송신 전 내부누설/효능단정/회피성분 LLM 검수·fail-closed
4. `core.py` 5. `verify_output()`(T3 F5, **lexicon/regex**) — consult_chat에서 composer 후 **재실행**(line ~1017-1029)
6. **reimplementation based on source** — ★SIASIU는 **LLM 의미 검수**, Foundation는 **정규식/lexicon**. composer 후 재실행 구조는 MIGRATED.
7. 왜: 결정론 검증·LLM 호출 0. fail-closed 정신 동일.
8. 테스트: `t3`(18)·`t35`(7)·golden `output_verified=true`
9. trace: `output_verify_after_composer.ok`·`output_verified`·위반시 `enforcement_reason=output_verify_block`
10. gap: **SIASIU LLM 의미 검수 미이식**(정규식은 신종 효능단정/우회 표현에 약함) · **재교정 1회 LLM 단계 미이식**(Foundation는 곧장 rule fallback)
11. v1 허용: ◐ "composer 후 재실행"은 사실이나 *메커니즘은 약한 결정론* + 재교정 미이식 = 샤슈 리뷰 위험

### J. fact extraction / memory update — **NOT MIGRATED (의도)**
1. `app/brain.py` 2. `extract()`(855)+`upsert_fact()`(214)+`add_episode`(116) 3. 역할: 발화→fact 추출→**영속 DB write**
4. — 5. — (Foundation 없음)
6. **not migrated** (의도적)
7. 왜: **persistent customer memory write 금지**(CLAUDE.md §4). session-only(D)로 대체.
8. 테스트: golden 12 `memory_write_performed=false`
9. trace: **`memory_write_performed=false`**·DB/파일 write 0
10. gap: 영속 fact·증분 추출 전부 없음(의도)
11. v1 허용: ✅ **v1에서 persistent write 0이 명시 요구** — 의도된 미이식

### K. final response — **REIMPLEMENTED (richer contract)**
1. `app/brain.py` 2. line 963-967 `add_episode`+`return {reply, memory, used_deepseek}` 3. 역할: 최종 답 + 메모리 + 사용여부
4. `core.py` 5. `consult_chat` return(~1050-1090)
6. **reimplementation based on source** — `{answer, answer_strategy, decision_type, final_product_count, session_context_out, grounding, output_verify_after_composer, trace{...}}`
7. 왜: 다른 서비스가 소비할 검증 가능한 contract(trace 포함). SIASIU return은 단일 reply.
8. 테스트: golden 전체·API smoke
9. trace: 전체 trace 필드 + `ask_more_only`·`latency_ms`·`pipeline_steps`
10. gap: SIASIU `used_deepseek`/`memory` 표면형과 다름(상위 호환)
11. v1 허용: ✅

---

## 판정 요약
| 항목 | 판정 | 실제 SIASIU 코드 재사용? |
|---|---|---|
| A live entrypoint | **REIMPLEMENTED** | ✗ (구조만 동일) |
| B orchestration | **REIMPLEMENTED** | ✗ |
| C classify/guardrail | **REIMPLEMENTED + LLM PART NOT MIGRATED** | ✗ (LLM 의미분류 미이식) |
| D memory | **REIMPLEMENTED(session) · persistent NOT MIGRATED** | ✗ |
| E kb_search | **PARTIAL** | ◐ (bm25만) |
| F search engine | **WRAPPED(bm25 채널) · Engine.search NOT MIGRATED** | ✅ `ssbrain.bm25`+`ssbrain.sqlite`(read-only) |
| G DeepSeek input | **REIMPLEMENTED** | ✗ |
| H DeepSeek call | **REIMPLEMENTED** | ✅ `.secrets/deepseek_key`(read-only)+동일 endpoint |
| I verify_output | **REIMPLEMENTED + LLM/재교정 NOT MIGRATED** | ✗ (LLM 검수 미이식) |
| J extract/upsert | **NOT MIGRATED(의도)** | ✗ |
| K final response | **REIMPLEMENTED** | ✗ |

**정직 결론:**
- **실제 SIASIU 코드의 read-only 재사용 = `ssbrain.bm25`·`ssbrain.sqlite`·`.secrets/deepseek_key` (F·H).** 나머지 A·B·C·D·G·I·K는 **Foundation 자체 재구현**(SIASIU import 0).
- 따라서 v1은 **"샤슈 Path A 코드의 exact 이식"이 아니라 "흐름/원리 이식(reimplementation) + 일부 read-only wrapper + 실제 KB/키 재사용"**이다.
- 가장 큰 미이식(샤슈 리뷰 위험): **C/I의 LLM 의미 guardrail·검수**(Foundation는 lexicon), **F의 Engine.search 멀티채널**(bm25만), **I의 재교정 루프**, **J의 영속 memory**(의도).

## v1 허용 한계 vs 추가 검토 필요
- ✅ v1 허용: A·B·G·H·K(역할 동등) · D·J(persistent write 0=의도)
- ◐ 추가 검토(샤슈): **C/I LLM 의미 분류/검수 미이식**(결정론 lexicon의 의미 커버리지) · **F Engine.search 미이식**(bm25만→근거 품질) · **E CLIR/RRF/avoid/rerank 미이식** · **I 재교정 루프 미이식**

## no_change_assertions
본 ledger = 증빙 문서만. 코드 수정 0 · Cosmile/SIASIU/FOUNDATION repo 0 · contract/canonical 0 · push 0. SIASIU 소스는 read-only 확인.
