# Foundation — Answer Pipeline Guard Wiring v1

> **2026-06-28 · 작은 배선 작업(새 기능 아님).** 기존 답변 파이프라인 말단에 `answer_provenance.compose()` + `disclosure_policy.external_guard()`를 안전하게 연결.
> 변경 파일: `app/ssbrain/answer.py`(배선) · `app/tests/test_answer_pipeline_guard.py`(신규). ★learned 승격·memory migration·web/live·retrieval/reranker/confidence/source 임계 변경 **0**.

## 1. Executive Summary
- 답변 생성 말단(`answer.answer`)에 **provenance 추임새 + external_guard**를 배선. 순서 = **Option A**(LLM draft → safety_gate(본문) → compose → external_guard → 최종).
- 보수적 기본값: `source_layer='learned'`(canonical 단정 금지)·`answer_mode='cautious'`(confidence 미산정 → assertive 금지)·`source_urls=[]`·`audience='customer'`.
- 내부 알고리즘(점수식·source weight·routing·reranker/BM25/e5-small·키)과 금지 provenance 표현이 **고객 답변에서 차단**됨(redact→불가 시 fallback).
- 테스트: 신규 guard 10 + 회귀 175 = **185 assertions / 0 FAIL** · offline full-loop 100/100 · **live 0**.

## 2. Baseline
| 항목 | 값 |
|---|---|
| SIASIU latest | `0c69098`(task 기준 328fdb2 이후 폴더이동 추가·무관) · clean |
| app/data | `ssbrain.sqlite` 단독 · memory.db 없음 |
| raw_file indexed / canonical write / learned 승격 / DeepSeek·web live | 0 / 0 / 0 / 0 |

## 3. 기존 Answer Pipeline 조사 (Stage 1)
| 질문 | 결과 |
|---|---|
| 최종 답변 생성 | `app/ssbrain/answer.py` → `answer(engine, query, …)` |
| LLM draft | `brain._llm("chat", …)`(DeepSeek 라우터) — 컨텍스트 제약(우리 자료만) |
| safety_gate 위치 | `answer.py:safety_gate(reply, query)` — LLM draft 직후, 반환 직전(본문 검사) |
| 안전 계열 | `safety_words.violations` + `_EXTRA_FORBIDDEN` + 임신/수유 공기규칙 + `brain.verify_output`(키 있을 때) |
| 말단(외부 노출 직전) | `safety_gate` 다음 `return {reply,…}` → **여기가 provenance/external_guard 삽입 지점** |
| 최소 변경 위치 | `answer()` 반환부 + 빈-hits 경로 2곳(대형 refactor 불필요) |

## 4. Chosen Wiring Order (Stage 2) — **Option A**
```
LLM draft → safety_gate(본문) → answer_provenance.compose(mode, source_layer, body) → external_guard(user_text, audience) → 최종
```
**이유:** `safety_gate`는 *답변 본문*의 금지 claim(임산부 안전 단정·치료·부작용 없다 등)을 검사하도록 설계됨. provenance 추임새는 본문 앞에 붙는 *안전한 접두*라 본문-claim 규칙 대상이 아니다 → **본문을 먼저 검사(A)**, 그 뒤 추임새 부착. `external_guard`는 **항상 가장 마지막**(외부 노출 직전). Option B(추임새 포함 전체를 safety_gate)에 비해, 안전 검사 대상이 본문으로 명확하고 추임새 변형에 영향받지 않음.

## 5. answer_provenance 통합 (Stage 3)
- `compose(answer_mode, source_layer, body, …)` → `{user_text, trace}`. **user_text만 사용자 노출**, `trace`(source_layer·evidence_score·source_urls·reviewed_by·last_verified_at·answer_mode·claim_type)는 **내부 반환(노출 금지)**.
- 보수적 기본값(원칙): source_layer 모르면 **canonical 단정 안 함**(`learned`) · confidence 모르면 **assertive 금지**(`cautious`) · `cannot_determine`이면 **본문 미부착**(빈-hits 경로) · user_text에 금지표현 없음(answer_provenance가 보장).

## 6. external_guard 통합 (Stage 4)
- 최종 직전 `_guard_external(user_text, audience='customer')`:
  1. `disclosure_policy.external_guard` → internal_only/secret 감지.
  2. 감지 시 `redact`(never_disclose 패턴 → `[비공개]`) 후 재검사.
  3. 그래도 불가하면 안전 **fallback**("이 부분은 내부 정책상 자세히 설명드리기 어렵습니다…").
- ★차단된 내부 문구를 **그대로 로그/답변에 노출하지 않음** · API key/secret 일부도 출력 금지 · audience 인자를 열어 둠(향후 partner/investor/internal).

## 7. Safety Gate Interaction
| 단계 | 담당 | 검사 대상 |
|---|---|---|
| ① safety_gate | 안전 단정/금지 claim(임신/수유/의료/효능) | **본문** |
| ② provenance.compose | answer_mode 추임새 부착 + 금지 provenance 표현 차단 | 추임새 |
| ③ external_guard | 내부 알고리즘(점수식·routing·reranker·키) 노출 차단 | **최종 user_text(말단)** |
→ safety_gate와 external_guard는 **서로 다른 위험**(안전 단정 vs 내부 노출)을 보며, **둘 다 최종 답변 전 필수 통과**.

## 8. Test Cases (Stage 5 — offline/mock·live 0)
| # | 테스트 | 결과 |
|---|---|---|
| 1 | 최종 답변에 '저장된 검증 지식' 류 금지표현 없음 | ✅ |
| 2 | 최종 답변 external_guard 통과 | ✅ |
| 3 | scoring formula(0.30 */final_confidence_score) 차단 | ✅ |
| 4 | source routing detail(routing rule/can_confirm) 차단 | ✅ |
| 5 | reranker/BM25/e5-small/RRF 차단 | ✅ |
| 6 | safety 민감 답변 기본 assertive 아님(cautious) | ✅ |
| 7 | source_layer 모르면 비-canonical + cautious | ✅ |
| 8 | trace 내부 반환·user_text 미노출 | ✅ |
| 9 | cannot_determine 환각 본문 미부착(빈 hits) | ✅ |
| 10 | audience 인자 동작(customer 기본) | ✅ |

## 9. Test Results (Stage 6)
- 신규 guard **10** + 정책 108 + governance 28 + safety 39 = **185 assertions / 0 FAIL**.
- offline full-loop **100/100**(answer.answer 배선 무회귀) · **live DeepSeek/web 0** · memory.db 0 · raw_file_leak 0 · canonical write 0 · learned 승격 0.

## 10. Remaining Risks
| # | 위험 | 등급 | 대응 |
|---|---|---|---|
| 1 | answer_mode 항상 cautious(보수적) — 실제 confidence 미연결로 grounded/assertive 미사용 | low(의도) | confidence_model 연결 시 mode 상향 |
| 2 | source_layer 기본 learned — ssbrain은 curated(canonical)라 표현이 다소 과보수 | low | retrieval 메타에 layer 부여 시 정밀화 |
| 3 | external_guard 패턴 기반 — 신규 내부용어 누락 시 fail-open | medium | 정기 패턴 리뷰(disclosure_policy) |
| 4 | redact가 본문 일부를 [비공개]로 가려 가독성 저하 가능 | low | rewrite 정교화(향후) |

## 11. Next Plan
1. `confidence_model` 연결 → answer_mode를 실제 점수로(grounded/assertive 가능)·source_layer 정밀화.
2. 추천 경로(`recommendation_evidence`)에도 동일 말단 배선.
3. audience=partner/investor 분기(현재 customer 기본·인자 열림).
4. disclosure 패턴 정기 리뷰 + 자유서술 출력 guard 통과율 모니터.

## 12. v1.1 — Guard UX 보정 (2026-06-28)
가드 기능은 유지(완화 0)하고 "모든 답변이 동일 cautious 추임새로 시작"하는 UX만 보정. **confidence_model 미연결·answer_mode='cautious' 고정 유지** — 사용자 opener만 상황별 조정.
| 항목 | v1.0 | v1.1 |
|---|---|---|
| **추임새(A)** | 모든 답변에 "현재 수집·검토된 자료 기준으로는," 고정 | `_situation(body,gated)`로 general/uncertain/sensitive 분류 → `ap.pick_opener`(결정론·seed 해시) |
| **이중 hedge(B)** | safety_gate _SAFE_CAUTION 위에 추임새 중복 | sensitive면 **opener 생략**(safety 문구만) |
| **redact 다수(C)** | `[비공개]` 조각으로 문장 깨짐 | `[비공개]`>`_REDACT_MAX(2)`면 **깔끔한 fallback** |
| **표현 다양화(D)** | 단일 문구 | general=[생략·"정리하면,"·"일반적으로는,"] / uncertain=["확인 가능한 범위에서 보면,"·"자료마다 차이가 있지만,"·"이 경우는 단정하기보다,"] |
- 분류: `general`(단순 정의)→생략/짧은변형 · `uncertain`(본문에 "확실하지 않/단정 어렵" 등)→"확인 가능한 범위…" · `sensitive`(safety_gated)→opener 생략 · 빈 hits→`cannot_determine`(본문 미부착) · 내부 알고리즘 질문→fallback.
- 변경 파일: `app/ssbrain/answer.py`(opener 조건부·redact fallback) · `app/answer_provenance.py`(`_OPENERS`·`pick_opener`) · `app/tests/test_answer_pipeline_guard.py`(+8 UX). 가드(safety_gate·external_guard·trace 분리)는 그대로.
- 재평가(10질문): 기계적 시작 0 · 이중 hedge 0 · 깨진 `[비공개]` 0 · 과도 fallback 0(내부질문 1건만) · 내부노출 0 · trace 노출 0.
- 테스트: guard 10→**18** · 전체 회귀 **193 assertions / 0 FAIL** · full-loop 100/100 · live 0.
