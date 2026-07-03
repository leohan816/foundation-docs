# Foundation Brain v1 — Finding Response Plan (MAND-01~18) — 2026-06-30

> authoritative source: `SIASIU/설계문서/FOUNDATION_BRAIN_V1_SOURCE_GAP_BLOCKER_LEDGER_20260630.{md,json}` (샤슈, FAIL).
> ★본 문서 = **계획만**. 코드 수정 0. 구현은 **Leo 승인 후**. 기존 golden PASS·core.py brain logic = migration 완료로 **인정 안 함**.
> WIP commit `f49eac5`는 ledger 작성 **이후** 일부를 건드렸으나, 완료 증거 아님 — finding별로 closes/partial/wrong direction/irrelevant **정직 판정**.

## 0. 먼저 Leo 결정이 필요한 정책 충돌 (자체 처리 불가)
- **MAND-03/04/05/06 (영속 memory_fact DB · fact extraction · upsert · SAFETY immutable memory)** 은 ledger(=SIASIU Path A 기준)에선 **CRITICAL BLOCKER**지만, **foundation-control CLAUDE.md §4가 "memory.db 생성/접근 · customer memory live migration · persistent memory 대규모 write"를 명시 금지**한다.
  → **두 권위가 충돌.** 자체 해석으로 "MIGRATE"도 "무시"도 하지 않는다. **Leo 결정 필요**: (A) foundation-control-local 영속 memory store에 **approval-gate 예외** 부여, 또는 (B) v1은 **session-only로 한정**하고 "영속 memory 미이식"을 명시적 v1 한계로 수용. 아래 해당 finding은 **BLOCKED(정책)** 로 표시하고 두 경로를 제시한다.
- **MAND-10~13 재분류 근거**: ledger 본문이 ① mandated-18 표에선 BLOCKER, ② `v1_allowable`엔 "bm25-only 검색(최저선)" 허용, ③ `v1_1_deferrable`엔 "vector/graph/rerank 하이브리드" 명시 — **세 곳이 상충**. 환경 제약(numpy/torch 미설치·PEP668)을 근거로 **오늘 가능/불가**를 분리(§MAND-10~13).

---

## MAND-01 — LLM semantic guardrail 미이식
1. finding_id: MAND-01 (wrongly_promoted·HIGH·BLOCKER)
2. 샤슈 판정: 원본 `guardrail_classify`는 "휴리스틱 ❌ LLM 의미분류", Foundation은 키워드 매칭으로 강등
3. 현재 상태: WIP에서 `llm_guard.semantic_classify`(DeepSeek 0-temp) 추가됨 — 단 lexicon이 여전히 prefilter·compose=true에서만 동작
4. 현재 파일/func: `core.py:guardrail_classify`(T3 lexicon) · `llm_guard.semantic_classify`(WIP)
5. 원본: `app/brain.py:guardrail_classify:705-726`
6. 대응 전략: **MIGRATE** (LLM 0-temp 의미분류를 **authoritative**로, lexicon은 fast-prefilter only)
7. 우선순위: **P0_TODAY**
8. 코드 변경: semantic_classify를 guardrail 결과의 1차 권위로 승격 · 분류 실패→fail-closed(보수적 off) · enforcement가 semantic risk를 직접 소비
9. 테스트: injection paraphrase("시스템 프롬프트" 단어 없이 내부 우회)·medical/politics/payment 의미 케이스 PASS
10. trace: `semantic_guardrail_called=true`·`classifier_provider=deepseek`·`lexicon_only=false`(safety-sensitive)
11. WIP f49eac5: **partial** (semantic_classify 추가했으나 lexicon 병존·compose-gated·authoritative 아님)
12. 위험: LLM 분류 지연/실패 시 fail-closed 과차단 · compose=false 경로엔 미적용
13. 완료 기준: safety-sensitive 케이스에서 `lexicon_only=false` + paraphrase injection PASS + 분류 실패 fail-closed 증명

## MAND-02 — lexicon/regex guardrail로 강등
1. MAND-02 (wrongly_promoted·HIGH·BLOCKER)
2. 샤슈 판정: `_kw_risk`/`_categories_in` substring이 risk/domain 결정
3. 현재 상태: lexicon이 risk/domain 1차 결정(여전히)
4. 현재 파일/func: `core.py:_kw_risk/_categories_in:95-149`·`guardrail_classify:674-689`
5. 원본: `app/brain.py:guardrail_classify:705-726`
6. 대응 전략: **ADAPT** (lexicon = prefilter/보조, 의미판정은 MAND-01 LLM이 authoritative — 단독 분리 아님, MAND-01과 묶음)
7. 우선순위: **P0_TODAY** (MAND-01과 동시)
8. 코드 변경: risk/domain 최종 판정 source를 semantic으로 · lexicon은 명백 deny prefilter만
9. 테스트: lexicon이 못 잡는 의미 우회 케이스에서 semantic이 잡는지
10. trace: `guardrail_source=lexicon+semantic`·`guardrail_action`이 semantic 반영
11. WIP f49eac5: **partial** (guardrail_source 표기는 추가·여전히 lexicon이 strategy 1차 입력)
12. 위험: lexicon/semantic 충돌 시 우선순위 모호 → semantic 우선 규칙 명문화 필요
13. 완료 기준: risk 최종값이 semantic 기준 · lexicon-only 의존 0(safety-sensitive)

## MAND-03 — 영속 memory DB 미이식
1. MAND-03 (missing·CRITICAL·BLOCKER)
2. 샤슈 판정: user/episode/memory_fact/fact_type_registry 테이블 부재 → "레티놀 알레르기"를 다음 대화에 못 기억
3. 현재 상태: session dict only(payload in/out)
4. 현재 파일/func: `core.py:consult_chat session_context:983-995`
5. 원본: `app/brain.py:init_db/_conn:61-105`
6. 대응 전략: **BLOCKED(정책)** — CLAUDE.md §4 persistent memory write 금지와 충돌. 경로 A=approval-gate 예외 후 foundation-control-local store MIGRATE / 경로 B=session-only 한계 수용(V1.1)
7. 우선순위: **P1_BEFORE_COSMILE (Leo 정책 결정 선행)** — "기억하는 커머스"엔 필요하나 정책 미해결
8. 코드 변경: (승인 시) memory_fact/episode SQLite 스키마(foundation-control 소유·dev) · (미승인 시) 변경 0
9. 테스트: (승인 시) 2-turn 영속 recall · cross-session 안전사실 유지
10. trace: `persistent_write_performed`(승인 시 true·정책 범위 내)·현재 false
11. WIP f49eac5: **irrelevant** (영속 store 미추가)
12. 위험: ★customer PII·메모리 거버넌스 — 승인 없이 진행 시 §4 위반
13. 완료 기준: Leo 정책 결정 후에만 판정 가능(현재 BLOCKED)

## MAND-04 — fact extraction 미이식
1. MAND-04 (missing·CRITICAL·BLOCKER)
2. 샤슈 판정: 대화→영속 사실 추출 메커니즘 0
3. 현재 상태: WIP에 extract_candidate **compute-only**(저장 0)만 존재
4. 현재 파일/func: `core.py:consult_chat extract_candidates`(WIP, compute-only)
5. 원본: `app/brain.py:extract/_deepseek_extract:842-861`
6. 대응 전략: **BLOCKED(정책)** — MAND-03 의존. 승인 시 LLM 추출 MIGRATE / 미승인 시 candidate 생성까지만(write 0)
7. 우선순위: **P1_BEFORE_COSMILE (MAND-03 후행)**
8. 코드 변경: (승인 시) `_deepseek_extract` 승격 · (미승인 시) 변경 0
9. 테스트: (승인 시) "레티놀 알레르기" 발화→fact 추출 검증
10. trace: `extract_candidate_generated`·`upsert_blocked_by_policy`
11. WIP f49eac5: **wrong direction** (candidate compute-only가 "이식"으로 오인될 수 있음 — 추출 본체 아님)
12. 위험: 추출 정확도·PII
13. 완료 기준: MAND-03 정책 결정 후

## MAND-05 — upsert_fact 미이식
1. MAND-05 (missing·CRITICAL·BLOCKER)
2. 샤슈 판정: confidence gating·hypothesis→active(0.60)·CANON 정규화 upsert 부재
3. 현재 상태: 부재
4. 현재 파일/func: `core.py:(none)`
5. 원본: `app/brain.py:upsert_fact:214-284`
6. 대응 전략: **BLOCKED(정책)** — MAND-03 의존
7. 우선순위: **P1_BEFORE_COSMILE (MAND-03 후행)**
8. 코드 변경: (승인 시) confidence/promotion/정규화 upsert · (미승인 시) 0
9. 테스트: 2-turn promotion·정규화 멱등성
10. trace: `upsert_performed`(승인 시)·`upsert_blocked_by_policy`(현재)
11. WIP f49eac5: **irrelevant**
12. 위험: 잘못된 fact 영속화
13. 완료 기준: MAND-03 후

## MAND-06 — SAFETY_TYPES/avoid/allergy immutable memory 미이식
1. MAND-06 (missing·CRITICAL·BLOCKER)
2. 샤슈 판정: avoid_ingredient/allergy/pregnancy_nursing 불변(no supersede/decay·즉시 active) 부재
3. 현재 상태: 안전 비대칭 메모리 없음
4. 현재 파일/func: `core.py:(fragmented)`
5. 원본: `app/brain.py:SAFETY_TYPES:48-56,237-246,268-272`
6. 대응 전략: **ADAPT(부분 오늘 가능) + BLOCKED(영속부분)** — **session-level immutable safety facts**(no decay·즉시 active)는 오늘 가능(write 0·session); 영속은 MAND-03 의존
7. 우선순위: **P0_TODAY (session 안전사실 + MAND-07 배선)** / 영속은 P1
8. 코드 변경: session_context에 immutable `safety_facts`(avoid/allergy/pregnancy) — supersede/decay 금지 · MAND-07로 verify에 배선
9. 테스트: 같은 세션 내 "레티놀 알레르기" 진술 후 레티놀 추천 차단 · 안전사실 decay 0
10. trace: `safety_facts`·`avoid_atoms_wired=true`
11. WIP f49eac5: **irrelevant** (immutable safety memory 미구현)
12. 위험: 안전사실 누락 시 회피성분 추천 → critical
13. 완료 기준: session 안전사실이 verify+enforcement에 실반영(avoid 차단 증명)

## MAND-07 — avoid_atoms가 verify_output에 미전달
1. MAND-07 (critical_omission·CRITICAL·BLOCKER)
2. 샤슈 판정: `verify_output(avoid_atoms=None)` 시그니처만 있고 호출 3곳에서 한 번도 안 받음 → avoid 검사 inert
3. 현재 상태: regex verify_output 호출에 avoid 미전달(WIP은 semantic_verify에만 avoid 전달)
4. 현재 파일/func: `core.py:verify_output:692`·호출 `840,1021,1031`
5. 원본: `app/brain.py:verify_output(avoid_list):748-767,928,939`
6. 대응 전략: **MIGRATE** (모든 verify 호출에 사용자 avoid_atoms 실배선)
7. 우선순위: **P0_TODAY**
8. 코드 변경: verify_output/semantic_verify 모든 호출에 session safety_facts(MAND-06)→avoid_atoms 전달
9. 테스트: avoid 성분 포함 답변이 verify에서 block되는지
10. trace: `avoid_atoms_passed=[...]`·`avoid_violation_checked=true`
11. WIP f49eac5: **partial** (semantic_verify엔 avoid 전달·regex 3곳엔 여전히 미전달)
12. 위험: avoid inert면 회피성분 추천 누출
13. 완료 기준: regex+semantic verify 모든 호출 avoid 수신 · avoid 위반 차단 증명

## MAND-08 — DeepSeek가 사고자→paraphrase layer로 축소
1. MAND-08 (newly_faked·HIGH·BLOCKER)
2. 샤슈 판정: 원본은 DeepSeek가 답 **생성(사고)**, v1은 "key_points·evidence만 사용·새 정보 만들지마" → 결정·합성을 규칙이 전담, LLM은 표현만
3. 현재 상태: composer SYS가 "표현만/새 정보 금지" — paraphrase
4. 현재 파일/func: `deepseek_composer.py:compose/_SYS:20-26,47`
5. 원본: `app/brain.py:chat(_llm 'chat'):886-924`
6. 대응 전략: **ADAPT** — DeepSeek가 **KB evidence+memory 위에서 추론·합성**하도록 SYS 재설계(단 decision_type/products/safety 등 **판단 불변 invariant는 유지**: 사고는 허용·판단 전복은 금지)
7. 우선순위: **P0_TODAY**
8. 코드 변경: SYS를 "근거 위에서 추론·설명·합성하되, 안전판단/제품목록/decision은 바꾸지 마라"로 · key_points는 *가이드*지 *유일출처*가 아님 · evidence를 추론 재료로
9. 테스트: 같은 evidence로 깊이 있는 상담(단순 재진술 아님) · decision/products 불변 동시 충족
10. trace: `composer_mode=reasoning_over_evidence`·`composer_input_contains_evidence/memory=true`
11. WIP f49eac5: **wrong direction** (입력은 풍부해졌으나 SYS는 "표현만" 강화 — 사고 복원 아님)
12. 위험: 사고 허용↔판단 불변 경계 모호 → invariant(F5+enforcement)로 2차 방어 필수
13. 완료 기준: 추론형 답변 품질 + decision/products/safety 불변 동시 증명(판단 전복 0)

## MAND-09 — SIASIU PERSONA/TALK_STYLE 미이식
1. MAND-09 (missing·HIGH·BLOCKER)
2. 샤슈 판정: composer SYS는 축약본 — 상담 페르소나 상실
3. 현재 상태: `_SYS` 자체 축약 문구
4. 현재 파일/func: `deepseek_composer.py:_SYS:20-26`
5. 원본: `app/brain.py:_system_prompt/PERSONA/TALK_STYLE:368-434`(약110줄·존댓말절대·선택적 그라운딩)
6. 대응 전략: **MOVE_TO_PROFILE** (PERSONA/TALK_STYLE를 profile 주입 데이터로 — SIASIU repo-local 소유·foundation-control은 seam) — MAND-16과 정합
7. 우선순위: **P0_TODAY** (composer가 profile.persona/talk_style를 SYS에 주입)
8. 코드 변경: composer가 `profile.persona`+`profile.talk_style`를 SYS에 합성 · default profile엔 최소 baseline
9. 테스트: profile 주입 시 페르소나/존댓말 반영 · 미주입 시 baseline
10. trace: `composer_input_contains_persona=true`·`persona_source=profile`
11. WIP f49eac5: **irrelevant** (PERSONA 미주입)
12. 위험: SIASIU 실 PERSONA 텍스트는 SIASIU repo-local 주입(110줄 복붙 금지·MAND-16 원칙)
13. 완료 기준: profile.persona가 composer SYS에 실주입 · 페르소나/존댓말 일관

## MAND-10 — Engine.search full pipeline 미이식
1. MAND-10 (missing·CRITICAL·BLOCKER / ledger 본문 "bm25-only 허용·hybrid V1.1"과 상충)
2. 샤슈 판정: 원본 bm25+vector+graph+rerank+RRF+bridge, Foundation은 bm25.search만
3. 현재 상태: WIP가 `Engine.search(vector_on=False, rerank_on=False)` read-only 호출 → **bm25+graph+RRF+name/atom boost+bridge.massage** 포함(vector·rerank 제외)
4. 현재 파일/func: `retrieval_provider.py:search`(WIP=Engine.search ro)
5. 원본: `app/ssbrain/engine.py:Engine.search:108-191`
6. 대응 전략: **WRAP(부분 오늘 가능) + DEFER_TO_V1.1(vector/rerank)** — Engine.search(no-vector/no-rerank)를 read-only wrap
7. 우선순위: **P1_BEFORE_COSMILE** — 근거: ledger `v1_allowable`이 bm25-only를 허용하나, **bm25-only를 "검색 이식 완료"라 부르는 것은 금지**됨 → 환경상 가능한 최대(graph+RRF+boost+massage)는 Cosmile 전 닫고, **vector/rerank는 V1.1로 명시**. full hybrid는 V1.1.
8. 코드 변경: 이미 WIP가 Engine.search ro로 전환 — `bm25_only=false`·`channels` 정직 표기 유지
9. 테스트: 5쿼리(민감피부/레티놀/비타민C/장벽/선크림) bm25-only vs Engine.search ro 결과 비교
10. trace: `engine_search_called=true`·`retrieval_channels=[bm25,graph,name_atom_boost,bridge_massage]`·`bm25_only=false`·**vector/rerank=off 명시**
11. WIP f49eac5: **partial** (Engine.search ro 전환·단 vector/rerank 제외 — "full pipeline" 아님)
12. 위험: "Engine.search 이식 완료"라 과대보고 금지 — vector/rerank 빠짐 명시
13. 완료 기준(v1): `engine_search_called=true`+channels 정직 표기+vector/rerank V1.1 명시 / 완료 기준(full): MAND-11/13

## MAND-11 — vector search 미이식
1. MAND-11 (missing·CRITICAL·BLOCKER / 환경상 V1.1)
2. 샤슈 판정: e5 의미검색 채널 전무
3. 현재 상태: vector off(`vector_on=False`)
4. 현재 파일/func: `retrieval_provider.py`(vector 미사용)
5. 원본: `app/ssbrain/vector.py:build/search`
6. 대응 전략: **DEFER_TO_V1.1 / BLOCKED(환경)** — sentence_transformers+torch+numpy 필요, **numpy PEP668 차단·torch 미설치·heavy**. 오늘 불가.
7. 우선순위: **V1.1** — 근거: 환경 의존성(torch/numpy) 미충족, 설치 시 Python 환경 손상 위험(PEP668). ledger도 `v1_1_deferrable`에 vector 명시.
8. 코드 변경: (V1.1) e5 임베딩 채널 + 인덱스 영속화
9. 테스트: (V1.1) 동의어/의미 검색 케이스
10. trace: (V1.1) `vector_channel=true`
11. WIP f49eac5: **irrelevant** (vector 여전히 off)
12. 위험: vector 없으면 의미 검색 누락(키워드 한정) — 정직 표기
13. 완료 기준: V1.1 (오늘 BLOCKED 명시)

## MAND-12 — graph search 미이식
1. MAND-12 (missing·CRITICAL·BLOCKER)
2. 샤슈 판정: 성분→제품·concern→제품 관계 검색 0
3. 현재 상태: WIP Engine.search ro에 **graph 포함**(edges·graph.related)
4. 현재 파일/func: `retrieval_provider.py`(Engine.search graph 채널)
5. 원본: `app/ssbrain/graph.py:load/related`
6. 대응 전략: **WRAP** (Engine.search ro가 graph 포함 — 순수 파이썬)
7. 우선순위: **P1_BEFORE_COSMILE** — 근거: graph는 torch 불필요(순수 파이썬), Engine.search(vector_on=False)에 이미 포함 → 오늘 닫을 수 있음
8. 코드 변경: WIP로 사실상 포함 — graph 동작 검증/표기만
9. 테스트: 성분 쿼리("레티놀")가 graph로 관련 제품 부스트하는지
10. trace: source_trace의 `graph=true` hit 존재
11. WIP f49eac5: **closes** (graph가 Engine.search ro로 활성)
12. 위험: graph 품질은 KB edges 의존
13. 완료 기준: source_trace에 graph 채널 hit 증명

## MAND-13 — rerank/RRF/CLIR 미이식
1. MAND-13 (missing·HIGH·BLOCKER / 혼합: RRF=오늘·rerank/CLIR=V1.1)
2. 샤슈 판정: cross-encoder rerank·RRF 융합·CLIR 다국어 부재
3. 현재 상태: WIP Engine.search ro에 **RRF 포함**·rerank off·CLIR 없음
4. 현재 파일/func: `retrieval_provider.py`
5. 원본: `app/ssbrain/rerank.py`·`engine.py:rrf`·`bridge.py:massage`
6. 대응 전략: **WRAP(RRF 오늘) + DEFER_TO_V1.1(rerank cross-encoder·CLIR)** — 샤슈 action도 "rerank/RRF=v1.1 BLOCKER, CLIR=V1.1"로 혼재
7. 우선순위: **RRF=P1_BEFORE_COSMILE / rerank·CLIR=V1.1** — 근거: RRF·bridge.massage는 순수 파이썬(Engine.search ro 포함, 오늘 가능); rerank=CrossEncoder(torch 의존→V1.1); CLIR=LLM 번역(샤슈가 V1.1로 명시)
8. 코드 변경: RRF 동작 표기 · rerank/CLIR은 V1.1
9. 테스트: RRF 다채널 융합 동작 · rerank/CLIR은 V1.1
10. trace: `rrf_applied=true`·`rerank=off(v1.1)`·`clir=off(v1.1)`
11. WIP f49eac5: **partial** (RRF 포함·rerank/CLIR 미이식)
12. 위험: rerank 없으면 정밀도 제한 — 정직 표기
13. 완료 기준(v1): RRF 동작 + rerank/CLIR V1.1 명시

## MAND-14 — LLM verify_output 미이식
1. MAND-14 (partial·HIGH·BLOCKER)
2. 샤슈 판정: 원본 LLM 0-temp 검수(internal/efficacy/avoid), Foundation은 regex → 의미 위반 누락
3. 현재 상태: WIP `llm_guard.semantic_verify`(LLM) 추가 — regex와 병존
4. 현재 파일/func: `core.py:verify_output`(regex)·`llm_guard.semantic_verify`(WIP)
5. 원본: `app/brain.py:verify_output:748-767`
6. 대응 전략: **MIGRATE** (composer 후 LLM 의미검증을 authoritative로, regex는 보조)
7. 우선순위: **P0_TODAY**
8. 코드 변경: semantic_verify를 최종 verify 권위로 · avoid(MAND-07) 전달 · fail-closed
9. 테스트: 효능 과장/임신 안전 단정/내부 노출/회피성분을 의미적으로 잡는지(regex 못 잡는 표현)
10. trace: `llm_verify_called=true`·`llm_verify_issue`
11. WIP f49eac5: **partial** (semantic_verify 추가·compose-gated·regex 병존)
12. 위험: LLM 검수 비용/지연 · 실패 시 fail-closed
13. 완료 기준: 의미 위반 4종 PASS + avoid 전달 + fail-closed

## MAND-15 — repair loop 미이식
1. MAND-15 (wrongly_promoted·HIGH·BLOCKER)
2. 샤슈 판정: 원본 위반→LLM 교정 재생성→실패 시 안전문구, Foundation은 곧장 rule_compose 템플릿
3. 현재 상태: WIP `llm_guard.repair`(1회 교정) 추가
4. 현재 파일/func: `core.py:consult_chat`(WIP repair)·`llm_guard.repair`
5. 원본: `app/brain.py:chat(verify 교정 루프):926-943`
6. 대응 전략: **MIGRATE** (1회 LLM 교정→재검증→실패 시 안전 fallback)
7. 우선순위: **P0_TODAY**
8. 코드 변경: WIP repair 경로 확정 · 재검증도 semantic(MAND-14)
9. 테스트: 위반 답변→repair 1회→통과 또는 안전 fallback
10. trace: `repair_attempted`·`repair_success`·`output_verify_after_repair`
11. WIP f49eac5: **closes** (repair 1회 루프 추가 — 단 MAND-14 authoritative 확정 후 안정)
12. 위험: repair 무한루프 방지(1회 한정 유지)
13. 완료 기준: 위반 케이스 repair→재검증 PASS/fallback 증명

## MAND-16 — Foundation core에 K-beauty domain data 하드코딩
1. MAND-16 (core_contamination·CRITICAL·BLOCKER)
2. 샤슈 판정: `_CATEGORY_KW`·`_FAMILY_MODEL/_FAMILY_GUIDANCE`(8 families)·`_HIGH/_MED`·한국어 fallback이 core.py 하드코딩, `_pget` 주입 1곳뿐
3. 현재 상태: core.py에 K-뷰티 데이터 다수(WIP가 `_FAMILY_GUIDANCE` 추가로 **악화**)
4. 현재 파일/func: `core.py:_CATEGORY_KW:67-68·_FAMILY_MODEL/_FAMILY_GUIDANCE:197-240·_HIGH/_MED:53-59`
5. 원본: 주입식이어야(profiles)
6. 대응 전략: **MOVE_TO_PROFILE** (도메인 데이터 전부 profiles.py로 · core는 framework만 · `_pget` 전면 적용)
7. 우선순위: **P0_TODAY** (Cosmile/투자 재사용 전제)
8. 코드 변경: `_CATEGORY_KW`·`_FAMILY_*`·`_HIGH/_MED`·한국어 fallback → profile 데이터 · core는 `_pget`로만 접근 · default profile에 baseline
9. 테스트: core.py grep에 도메인 어휘 0(framework만) · default profile로 기존 동작 동일
10. trace: `domain_data_source=profile`
11. WIP f49eac5: **wrong direction** (`_FAMILY_GUIDANCE`를 core.py에 추가 — 오염 증가)
12. 위험: 대규모 이동 → 기존 회귀 보존 필수(default profile=현 동작)
13. 완료 기준: core.py 도메인 하드코딩 0 · profile 주입으로 동작 · 회귀 불변

## MAND-17 — golden test가 사고흐름 아닌 field만 검증
1. MAND-17 (partial·CRITICAL·BLOCKER)
2. 샤슈 판정: 20케이스가 응답 field 존재/strategy만, decision logic·_GUARD_BLOCK_REFINED·사고흐름 미검증
3. 현재 상태: golden이 strategy/field/leak/deepseek_called 등 검증(사고흐름 X)
4. 현재 파일/func: `foundation_brain_v1_golden_test.py:34-87`
5. 원본: 통합/사고흐름 테스트
6. 대응 전략: **ADAPT** (condition/intent/guard_block/decision-logic 단언 + semantic guardrail·avoid·repair 경로 E2E + adversarial)
7. 우선순위: **P0_TODAY** (다른 finding의 완료 증거가 됨)
8. 코드 변경: 각 golden에 detected_conditions·refined_intent·guardrail block·avoid 차단·repair 발동 단언 추가
9. 테스트: 자기 자신(메타) — field-only 아님 증명
10. trace: 각 case의 사고흐름 trace 단언
11. WIP f49eac5: **irrelevant** (golden 미변경)
12. 위험: 테스트 강화로 현재 일부 FAIL 드러날 수 있음(정직 — 그게 목적)
13. 완료 기준: intent/condition/guard/avoid/repair 사고흐름 단언 포함 · field-only 아님

## MAND-18 — Cosmile 연결 전 blocker(통합)
1. MAND-18 (partial·HIGH·BLOCKER)
2. 샤슈 판정: memory contract 빈약·commerce_metadata 없음·개인안전 필드 없음 → "기억하는 커머스" 불가
3. 현재 상태: consult_chat 응답계약에 commerce_metadata·개인안전 필드 없음
4. 현재 파일/func: `server.py:consult_chat 응답계약`
5. 원본: `app/brain.py`(개인안전·메모리)
6. 대응 전략: **ADAPT** (MAND-01/06/07/08/14/15/16 닫은 뒤 통합 — commerce_metadata·safety 필드·memory contract 보강)
7. 우선순위: **P1_BEFORE_COSMILE** (다른 P0 후행·Cosmile 연결 직전 게이트)
8. 코드 변경: 응답계약에 safety_facts·commerce_metadata·memory contract 필드(단 persistent는 MAND-03 정책 후)
9. 테스트: Cosmile-facing contract E2E(연결은 별도 승인)
10. trace: 통합 trace 전 필드
11. WIP f49eac5: **partial** (일부 trace 필드·commerce_metadata/persistent 없음)
12. 위험: ★Cosmile 연결은 본 finding 완료 + Leo 승인 전 금지
13. 완료 기준: P0 finding 전부 닫힘 + contract 보강 + Leo 승인

---

## 우선순위 종합 (근거 기반)
| 분류 | finding |
|---|---|
| **P0_TODAY** | MAND-01·02(semantic guardrail) · 06(session 안전사실) · 07(avoid 배선) · 08(DeepSeek 추론 복원) · 09(PERSONA→profile) · 14(LLM verify) · 15(repair) · 16(core 탈오염) · 17(golden 사고흐름) |
| **P1_BEFORE_COSMILE** | MAND-10(Engine.search ro) · 12(graph) · 13-RRF · 18(통합) · **MAND-03/04/05(영속 memory — Leo 정책 결정 선행)** |
| **V1.1 / BLOCKED(환경)** | MAND-11(vector·torch/numpy) · 13-rerank(CrossEncoder/torch)·13-CLIR(LLM 번역) |

## WIP f49eac5 정직 판정 종합
- **closes**: MAND-12(graph)·MAND-15(repair)
- **partial**: MAND-01·02·07·10·13·14·18
- **wrong direction**: MAND-04·08·16
- **irrelevant**: MAND-03·05·06·09·11·17
→ WIP는 일부 방향만 맞고, **MAND-08(DeepSeek 사고)·16(core 탈오염)은 오히려 역행**, 영속 memory(03~06)·PERSONA(09)·golden(17)은 미착수. **migration 완료 아님.**

## 정책/한계 정직 표기 (자체 축소 금지 준수)
- bm25-only를 "검색 이식 완료"라 하지 않음 — Engine.search ro(graph+RRF) **부분**, vector/rerank/CLIR **V1.1/BLOCKED** 명시.
- lexicon/regex를 "semantic guardrail"이라 하지 않음 — semantic은 LLM authoritative화가 완료 조건.
- DeepSeek paraphrase를 "사고 엔진"이라 하지 않음 — MAND-08은 추론 복원이 완료 조건.
- 영속 memory(03~06)는 **정책 충돌 → Leo 결정 전 BLOCKED**, 자체 MIGRATE 안 함.

## no_change_assertions
본 문서 = 계획만. 코드 0 · Cosmile 연결 0 · SIASIU/FOUNDATION/contract/canonical 0 · push 0. SIASIU ledger·source = read-only.
