# Foundation Brain Migration v1 — Source Gap Audit Blocker Ledger

> 2026-06-30 · **기준: SIASIU Path A live brain** (`server.py /api/chat → brain.chat → ssbrain.engine`)
> 목적: control(foundation-control)이 자기 해석으로 재구현하지 못하도록 Path A 기준 blocker 확정
> 작성 근거: foundation-brain-v1-source-gap-audit (6 read-only Explore agents, 537k tokens) · ★코드 수정 0 (review only)

## 최종 판정: 🔴 **FAIL**
> Foundation이 Path A를 실제 이식한 것이 아니라 비슷한 구조를 새로 만든 상태 → 완료 선언 불가

## 카운트
| total | CRITICAL | HIGH | MEDIUM | LOW | BLOCKER | ALLOWABLE | V1.1 | 필수 blocker |
|---|---|---|---|---|---|---|---|---|
| 62 | 15 | 17 | 25 | 5 | 24 | 28 | 10 | 18 |

슬라이스 판정: entry_guardrail=FAIL · memory=FAIL · knowledge_search=PARTIAL · deepseek=FAIL · verify_quality=PARTIAL · pollution_api_test=PARTIAL

## ★ 필수 18개 Blocker (authoritative — control 재해석 방지)

| id | 항목 | finding_type | sev | v1 | 원본(SIASIU) | Foundation 현재 | 조치 |
|---|---|---|---|---|---|---|---|
| MAND-01 | LLM semantic guardrail 미이식 | wrongly_promoted | HIGH | BLOCKER | `app/brain.py:guardrail_classify:705-726` | `core.py:guardrail_classify:674-689` | LLM 0-temp 의미분류 복원 |
| MAND-02 | lexicon/regex guardrail로 강등 | wrongly_promoted | HIGH | BLOCKER | `app/brain.py:guardrail_classify:705-726` | `core.py:_kw_risk/_categories_in:95-149` | 키워드 substring → LLM 의미분류로 환원 |
| MAND-03 | 영속 memory DB 미이식 | missing | CRITICAL | BLOCKER | `app/brain.py:init_db/_conn:61-105` | `core.py:(none):983-995` | memory_fact/episode SQLite 스키마 이식 |
| MAND-04 | fact extraction 미이식 | missing | CRITICAL | BLOCKER | `app/brain.py:extract/_deepseek_extract:842-861` | `core.py:(none):` | LLM fact 추출 파이프라인 이식 |
| MAND-05 | upsert_fact 미이식 | missing | CRITICAL | BLOCKER | `app/brain.py:upsert_fact:214-284` | `core.py:(none):` | confidence gating·2-turn promotion·정규화 upsert 이식 |
| MAND-06 | SAFETY_TYPES/avoid/allergy immutable memory 미이식 | missing | CRITICAL | BLOCKER | `app/brain.py:SAFETY_TYPES:48-56,237-246,268-272` | `core.py:(fragmented):` | 안전사실 불변(no supersede/decay·즉시 active) 이식 |
| MAND-07 | avoid_atoms가 verify_output에 미전달 | critical_omission | CRITICAL | BLOCKER | `app/brain.py:verify_output(avoid_list):748-767,928,939` | `core.py:verify_output:692,840,1021,1031` | verify_output 모든 호출에 사용자 avoid_atoms 실배선 |
| MAND-08 | DeepSeek가 사고자→paraphrase layer로 축소 | newly_faked | HIGH | BLOCKER | `app/brain.py:chat(_llm 'chat'):886-924` | `deepseek_composer.py:compose:20-26,47` | DeepSeek가 KB+메모리 위에서 추론·합성하도록 복원 |
| MAND-09 | SIASIU PERSONA/TALK_STYLE 미이식 | missing | HIGH | BLOCKER | `app/brain.py:_system_prompt/PERSONA/TALK_STYLE:368-434` | `deepseek_composer.py:_SYS:20-26` | PERSONA+TALK_STYLE(약110줄·존댓말절대·선택적그라운딩) 주입 |
| MAND-10 | Engine.search full pipeline 미이식 | missing | CRITICAL | BLOCKER | `app/ssbrain/engine.py:Engine.search:108-191` | `retrieval_provider.py:(bm25 wrapper):58` | 하이브리드 Engine.search 이식(v1.1 필수) |
| MAND-11 | vector search 미이식 | missing | CRITICAL | BLOCKER | `app/ssbrain/vector.py:build/search:` | `retrieval_provider.py:(none):58` | e5 임베딩 의미검색 채널 이식 |
| MAND-12 | graph search 미이식 | missing | CRITICAL | BLOCKER | `app/ssbrain/graph.py:load/related:` | `retrieval_provider.py:(none):` | edges 테이블·graph.related(atoms) 이식 |
| MAND-13 | rerank/RRF/CLIR 미이식 | missing | HIGH | BLOCKER | `app/ssbrain/rerank.py;engine.py:rrf;bridge.py:massage:rerank/rrf/massage:` | `retrieval_provider.py:(none):` | rerank·RRF 융합 이식(rerank/RRF=v1.1 BLOCKER, CLIR=V1.1) |
| MAND-14 | LLM verify_output 미이식 | partial | HIGH | BLOCKER | `app/brain.py:verify_output:748-767` | `core.py:verify_output:692-712` | regex → LLM 의미검증 복원(의미 위반 누락 방지) |
| MAND-15 | repair loop 미이식 | wrongly_promoted | HIGH | BLOCKER | `app/brain.py:chat(verify 교정 루프):926-943` | `core.py:enforcement:1033-1046` | LLM 1회 교정 재시도 루프 이식 |
| MAND-16 | Foundation core에 K-beauty domain data 하드코딩 | core_contamination | CRITICAL | BLOCKER | `(주입식이어야):profiles 주입:` | `core.py:_CATEGORY_KW/_FAMILY_MODEL/_HIGH/_MED:53-68,197-240` | 도메인 데이터 전부 profiles.py 주입화(framework/data 분리) |
| MAND-17 | golden test가 사고흐름 아닌 field만 검증 | partial | CRITICAL | BLOCKER | `(원본 통합테스트):-:` | `foundation_brain_v1_golden_test.py:(field assert):34-87` | condition/intent/guard_block 단언 추가·E2E·adversarial |
| MAND-18 | Cosmile 연결 전 blocker(통합) | partial | HIGH | BLOCKER | `app/brain.py(개인안전·메모리):-:` | `server.py:consult_chat 응답계약:` | core 오염제거·avoid 실배선·영속메모리·memory/commerce_metadata 필드·LLM gu |

각 finding 상세 근거(evidence)는 JSON `mandated_18_findings[].evidence` 참조. **모든 finding `direct_code_change=false`**.

## v1에서 허용 가능 (ALLOWABLE 28)

- bm25-only 검색(최저선)
- 세션 한정 컨텍스트(이번 대화 내)
- 한국어 전용
- regex verify 일부
- off-domain 유도(allowlist) — Path A와 정합

## v1.1로 미뤄도 됨 (V1.1 10)

- vector/graph/rerank 하이브리드
- CLIR 다국어
- pitch/checkins/추천칩
- answer_provenance trace 고도화
- rich memory state

## v1 완료 선언을 막는 Blocker (18)

- MAND-01: LLM semantic guardrail 미이식
- MAND-02: lexicon/regex guardrail로 강등
- MAND-03: 영속 memory DB 미이식
- MAND-04: fact extraction 미이식
- MAND-05: upsert_fact 미이식
- MAND-06: SAFETY_TYPES/avoid/allergy immutable memory 미이식
- MAND-07: avoid_atoms가 verify_output에 미전달
- MAND-08: DeepSeek가 사고자→paraphrase layer로 축소
- MAND-09: SIASIU PERSONA/TALK_STYLE 미이식
- MAND-10: Engine.search full pipeline 미이식
- MAND-11: vector search 미이식
- MAND-12: graph search 미이식
- MAND-13: rerank/RRF/CLIR 미이식
- MAND-14: LLM verify_output 미이식
- MAND-15: repair loop 미이식
- MAND-16: Foundation core에 K-beauty domain data 하드코딩
- MAND-17: golden test가 사고흐름 아닌 field만 검증
- MAND-18: Cosmile 연결 전 blocker(통합)

## 핵심 정합성 요약
- **DeepSeek**: 불일치 — 사고자→표현(paraphrase). 판단 불변은 맞으나 추론능력 상실.
- **retrieval/search**: bm25-only. vector/graph/rerank/RRF/CLIR 미이식.
- **memory**: FAIL — 영속 DB·fact extraction·upsert·SAFETY 불변·recall 전무. fabrication 위험.
- **enforcement/verify**: 부분 — LLM→regex·avoid inert·repair loop 미이식.
- **core 오염**: K-뷰티 데이터 core.py 하드코딩 → Cosmile/투자 재사용 불가.
- **golden test**: field만 검증, 사고흐름 미검증.

## 완료 선언 가능 여부: ❌ **불가** (FAIL)

## 산출물
- JSON 원장(전체 62 + 필수 18): `설계문서/FOUNDATION_BRAIN_V1_SOURCE_GAP_BLOCKER_LEDGER_20260630.json`
- MD 보고서: `설계문서/FOUNDATION_BRAIN_V1_SOURCE_GAP_BLOCKER_LEDGER_20260630.md`
- **코드 수정: 0** (review only · SIASIU/Foundation/foundation-control 무수정)

## 전체 62건 finding
JSON `full_findings[]` 에 id(GAP-001~062)·category·source_file/function/line·foundation_file/function·current_status·finding_type·severity·v1_impact·required_action·evidence·`direct_code_change=false` 전 필드 수록.
