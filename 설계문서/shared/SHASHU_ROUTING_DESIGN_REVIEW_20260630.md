# Shashu Routing Design Review — SIASIU Path A vs Foundation (2026-06-30)

> 작성: 샤슈(SIASIU) · read-only 코드 검증 후 **샤슈 설계 판정** · ★코드 수정 0 · 구현 지시 아님
> 목적: Foundation의 intent 라우팅이 SIASIU Path A의 *충실한 이식*인지 *divergence*인지 확정하고, AI-primary 라우팅으로 안전하게 가는 경로를 고정
> 기준 문서: `/home/leo/Project/SIASIU/설계문서/SHASHU_FOUNDATION_LIFT_MAP_20260630.md`
> 판정: **NEEDS_DESIGN** (방향은 확정 = intent semantic-authoritative / 단 authoritative 전환 전 shadow 계측 필요)

---

## 결론 한 줄
Foundation의 keyword intent routing은 **SIASIU Path A를 충실히 이식한 게 아니라, SIASIU가 *이미 명시적으로 버린* 휴리스틱을 되살린 divergence**다. 답변 생성(작문)은 02A/02B로 깊어졌지만, *그 답변으로 들어가는 입구(라우팅)는 아직 키워드*다.

---

## 1. SIASIU Path A routing 요약 — **AI-PRIMARY, 명시적 anti-heuristic**
검증 대상: `/home/leo/Project/SIASIU/app/brain.py`

```
발화 → guardrail_classify(LLM 의미) → [block] 거부 / [off-domain] 유도
     → [on-domain] kb_search(항상·ssbrain KB) → _llm("chat") 작문 → verify_output(LLM) → repair(LLM)
                  → _route_query(LLM 의미) : web 보강 여부(키 있을 때만)
```

- **`guardrail_classify`** (`/home/leo/Project/SIASIU/app/brain.py:705`) — LLM 의미 분류. 주석 그대로: **"★휴리스틱 ❌ — LLM이 *의미*로 분류. 발화를 '데이터'로만 보고."** 출력 {domain:on/off, risk}. 분류 실패 → 보수적 off + verify_output(fail-closed) 2차망.
- **`_route_query`** (`/home/leo/Project/SIASIU/app/brain.py:603`) — LLM 의미 라우팅. 주석: **"LLM 의미판단(봄의 정규식 _WEB_STRONG_RE 휴리스틱 *대신*). 실패하면 kb."** → *정규식 휴리스틱을 LLM으로 교체한 이력*이 코드에 박혀 있음.
- ★**키워드 intent classifier 없음.** chat()에 `_classify_intent`/`_kw_risk`/`_refine_intent`/`intent_type` 같은 키워드 의도 분류기·decision_type/strategy 상태기계가 *존재하지 않음*. 추천/설명/주의 판단은 LLM이 KB 근거 위에서 *작문으로* 수행.
- **safety도 LLM-primary** + fail-closed 망: guardrail_classify(LLM) 1차 → verify_output(LLM) 2차망. AI가 유일 게이트가 아니라, *LLM 주판단 + fail-closed 백업*.

→ **SIASIU의 결론은 코드에 이미 적혀 있다: intent/safety 라우팅은 AI-primary, 키워드 거부.**

## 2. Foundation 현재 routing 요약 — **intent는 KEYWORD-first, semantic은 safety 보조만**
검증 대상: `/home/leo/Project/foundation-control/foundation_http_service/core.py`

```
consult_chat → judge() → _classify_intent(키워드)→intent_type → decision_type/strategy
                        risk = max(payload.risk_signal[구조화], _kw_risk[키워드])  ← fail-closed
            → semantic_classify(llm_guard) : guardrail_action(safety) 상향 + trace에만
            → _answer_strategy → patha(02A)/patha_rec(02B)/composer → verify/enforcement
```

- **`intent_type = _classify_intent(norm, conditions, risk)`** (`/home/leo/Project/foundation-control/foundation_http_service/core.py:747`) — **순수 키워드.** intent엔 구조화 주입 seam *없음*(risk엔 `payload.risk_signal`이 있는 것과 대조).
- **`semantic_classify`** (`core.py:1068` `sem = llm_guard.semantic_classify(norm, enabled=compose_on)`) — 결과는 **`guardrail_action`(safety) 상향·`semantic_risk`/`semantic_domain` trace에만** 반영(`core.py:1067-1077, 1224`). **intent/strategy/decision_type엔 안 쓰임.**
- 즉 **답변 reasoning(02A/02B)은 semantic/evidence로 깊어졌지만, routing gate는 keyword heuristic.**

## 3. divergence 판정
| 항목 | 성격 | 판정 |
|---|---|---|
| **`_classify_intent`(키워드 intent 권위)** | 의미를 키워드로 단정 | 🔴 **divergence — SIASIU AI-primary에서 후퇴.** 단순 tech debt 아님 |
| `_kw_risk`(키워드 risk 상향) | fail-closed 안전 과검출 | 🟢 허용(SIASIU도 fail-closed 망·over-detect=안전) |
| `payload.risk_signal` 구조화 seam | judge가 우선(`core.py:740-744`) | 🟢 좋음 — intent에도 이 패턴 복제하면 됨 |

- **Foundation keyword intent routing = SIASIU Path A와의 divergence.** SIASIU가 "휴리스틱 ❌"로 *명시적으로 버린* 것을, control이 judge/commerce 레이어를 새로 짜며 *되살림*.
- 이는 lift map의 **"brain.py chat/orchestrator lift 미완"** 과 직결 — *라우팅을 아직 lift하지 않았고, 그 빈자리를 키워드로 흉내냄.* (작문은 02A/02B로 lift했지만 라우팅은 아직.)
- 단 **Foundation의 `decision_type`(recommend/do_not_buy/hold) commerce 레이어 자체는 신규**(SIASIU chat()엔 없는 Cosmile 커머스 판단) — 이건 regression 아님. divergence는 *intent를 무엇으로 판정하는가*(키워드 vs 의미)에 한정.

## 4. 추천 architecture
```
Layer 0 SAFETY (규칙 fail-closed FIRST · 유지):
  _kw_risk 상향(over-detect) + semantic_classify safety + verify_output/semantic_verify(fail-closed 2차망)
  → AI가 안전의 '유일' 게이트가 아님. SIASIU 철학과 동일.

Layer 1 INTENT (DeepSeek semantic_classify AUTHORITATIVE 방향 · SIASIU 방식 lift):
  semantic_classify를 intent/strategy/needs_retrieval/needs_clarify까지 분류하게 확장
  _classify_intent → fallback/prefilter로 강등(고정밀 명시 케이스 fast-path + semantic 실패 fallback)
  ★주입 seam: judge가 이미 payload.risk_signal을 우선 → intent도 같은 구조화(intent_signal) 주입으로 미러링

Layer 2 COMMERCE DECISION (Foundation 신규 · 유지):
  decision_type/enforcement/products = judge/enforcement 소유. semantic은 intent만 공급.
```
- semantic이 **절대 하지 말 것**: recommended_products 생성 · safety_gate_result 전복 · 제품명 생성 · final answer 작성.
- 비용 메모: compose_on(실서빙)에선 `semantic_classify`를 *이미 호출* 중 → intent를 얹으면 **거의 공짜.** keyword fast-path의 비용 명분은 compose_off(dev/shadow)에서만 유효.
- conflict 원칙: safety 우선 · confidence 낮으면 clarify · 구매/추천 의도는 보수적 recommend_with_caution · 부작용/문제 표현은 safety_first.

## 5. 다음 단일 미션
**ROUTING-MISSION-01A: DeepSeek `semantic_classify` *intent shadow* wiring** (authoritative 아님)
- semantic_classify가 intent/strategy도 분류하게 확장 → **shadow로만 실행**(trace/debug 기록·**기존 output 0 변경**) → **keyword vs semantic disagreement 수집.**
- 반드시 수집할 키워드-miss 케이스:
  - "이런 상황이면 하나쯤 들여놔도 괜찮은 게 있을까?"
  - "피부가 자꾸 뒤집어지는데 뭘 바꿔보면 좋을까?"
  - "요즘 쓸 만한 순한 거 없나?"
  - "레티놀 추천하지 않는 이유 알려줘"  (★'추천' 키워드 있으나 *질문* — 오라우팅 위험)
  - "이 제품 말고 다른 선택지도 있을까?"
- 왜 shadow 먼저: ① 실제 miss율 데이터 없음 ② 바로 authoritative면 green(golden 21·회귀 8·adversarial 180)을 블라인드 위험 ③ shadow가 conflict 규칙을 실데이터로 튜닝.
- **그 다음 `ROUTING-MISSION-01B`**: shadow가 disagreement·무회귀 입증 시 intent_signal 주입 seam으로 **semantic authoritative 승격**(safety는 계속 규칙 fail-closed).
- shadow 범위: compose_on 경로 전체 + 키워드-miss/ambiguous 표본(비용 통제).

## 6. 절대 건드리면 안 되는 불변식 (01A 기준)
- **불변식(shadow = 출력 0 변경)**: `decision_type` · `safety_gate_result` · `recommended_products` · `enforcement_reason` · `retrieval_mode` · `avoid_atoms` · `strategy` — baseline 동일. semantic 결과는 trace에만.
- **비회귀**: `02A patha_reasoning`(answer_then_clarify) · `02B patha_recommendation`(recommend_with_caution) · **MAND-07 avoid rail** · safety_first/refuse/greeting 분기 · golden 21 · 회귀 8 · adversarial 180(decision_integrity=1.0).
- **안전 원칙**: safety는 *항상 규칙 fail-closed 먼저*(AI가 유일 게이트 금지). semantic은 제품 생성/safety 전복/write 0.
- **파일**: `/home/leo/Project/foundation-control/foundation_http_service/` 의 `retrieval_provider.py`·`ssbrain/`·`profiles.py`·`server.py` 수정 0. `patha_reasoning.py`(02A/02B) 변경 0. `llm_guard.py`의 verify/safety 로직 변경 0(intent shadow는 *별도 함수/호출*로 두고 llm_guard 의미 로직 무수정 권장). `/home/leo/Project/SIASIU/` 수정 0.

---

## 근거 (검증 인용)
- SIASIU `/home/leo/Project/SIASIU/app/brain.py:705` `guardrail_classify` — "★휴리스틱 ❌ — LLM이 의미로 분류"
- SIASIU `/home/leo/Project/SIASIU/app/brain.py:603` `_route_query` — "LLM 의미판단(봄의 정규식 휴리스틱 대신)"
- SIASIU `brain.py` chat(866-967) — 키워드 intent classifier 부재(guardrail→kb_search→_llm 작문)
- Foundation `/home/leo/Project/foundation-control/foundation_http_service/core.py:747` `intent_type = _classify_intent(...)` (키워드)
- Foundation `core.py:1068` `semantic_classify` → guardrail_action/trace에만(intent 미반영)

## 한계 / 주의
- 이 문서는 **review/설계 기준** — 구현 지시 아님. 실제 구현은 Leo 승인 후 ROUTING-MISSION-01A(shadow)부터.
- 코드 수정 0 · commit 0 · push 0 · SIASIU/Foundation/foundation-control 무수정.
