# COSMILE MEMORY V3-11D — Semantic Extraction Gate / Plan

> 작성: foundation-control / **fable-builder** 스킬 · 2026-07-07 · ★계획/gate only·**LLM call·DB write·live emit·prod 0**·main/secret 0.
> anchor: V3-11C `V3_11C_EVENT_WIRING_CLOSED_WITH_LIMITS`(shadow `591e206`) · V3-11B `6fd7815`(RecOutcomeFeedback·MemoryFactCandidate) · V3-11A `af26f94`(adverse.ts D4·§5.3·memoryCandidate) · 사전 `DATA_DICTIONARY_CANONICAL`(§2.12/§2.4/§2.5/§2.13) · **Architecture Constitution**(의미=AI/Foundation·정책=deterministic·Safety=MAX fail-closed·route raw 판단 금지).
> ★핵심 규율: 실제 Cosmile 코드 직접 read + 독립 스카우트·없으면 "없음"·추측 금지. ★**휴리스틱 금지**(키워드/regex가 raw text 의미를 최종 확정 금지 — Constitution).

---

## 1. Executive summary
상담/feedback 텍스트 → semantic_label/adverse를 추출해 V3-11B(RecOutcomeFeedback)·V3-11A(memoryCandidate)에 연결하는 **설계·gate**. ★실 코드 대조 결과 **2대 사실**: (F-1) **feedback/review/rating 입력 경로 = 없음**(prisma model 0)·유일 user-text = **consultation**(구매 前). (F-2) 기존 아키텍처가 이미 **의미=Foundation `/v1/consult_contract`·Cosmile은 raw 포장/enum 매핑/fail-closed policy만**(cosmileSemanticAdapter "임의 semantic 생성 0"). → V3-11D는 **Foundation 구조화 출력 → enum 결정적 매핑**만 설계 가능·Cosmile route에서 raw 의미판단 신설은 **금지(Constitution 위반)**. ★핵심 gap: **post-order feedback 입력 원천 부재**(G-D1)·Foundation 출력이 semantic_label을 내보내는지 **cross-repo 계약 확인 필요**(G-D2). 이번은 계획만.

## 2. Existing feedback/semantic input flow inventory (실파일·"없음"은 없음)
| 항목 | 실체 | 위치 |
|---|---|---|
| review/rating/feedback model | ★**없음**(prisma model 0) | — |
| post-order/만족도 텍스트 입력 | ★**없음**(주문 후 리뷰/피드백 route 0) | — |
| consultation 입력(★유일 raw-text 진입) | `ConsultationInputBar`→`consultViaFoundation(message)`→ `body.message`(raw) → `createBaseSsc({rawText})` → `Ssc.raw_text` | `ConsultationInputBar.tsx`·`ConsultationChatShell.tsx`·`consult-foundation/route.ts:34,48` |
| **semantic adapter(포장만)** | `cosmileSemanticAdapter`·"raw_text+구조만 포장·의미/안전 판단은 Foundation·**임의 final semantic 0**"·`maskPii`(email/phone→[…]·1000자 slice) | `src/adapters/cosmileSemanticAdapter.ts:3,12,15,30` |
| **Foundation call(의미 판단자)** | `callFoundationContract`→ live `fetch` `POST /v1/consult_contract`(default :8731·60s·fail-closed)·**`sliceEnabled()` gate(flag ON AND NODE_ENV≠production)**·api_live=false·mock 아님(dev/shadow Foundation) | `src/adapters/foundationClient.ts:5,97` |
| **★FRC 출력 필드(실측)** | Frc = `final_strategy·safety_gate_result(pass\|caution\|block)·products_allowed·recommendation_allowed·product_candidates·answer_substance·reason_codes·api_live·raw_text_stored·trace_id` — ★**semantic_label/adverse_severity/certainty 필드 없음** | `src/adapters/foundationClient.ts`(Frc 타입) |
| deterministic **policy gate** | `applyConsultationFailClosed` — Foundation **응답 필드만**(decisionType·evidenceMode·safetyGateResult)·recommend=grounded+pass일 때만·raw 판단 아님 | `src/lib/foundation/consultationRiskGate.ts:4,11,18,25` |
| safety **escalation backstop** | `serviceSafetyDetector(message)` — fail-closed 에스컬레이트만(최종 판단 아님) | `consult-foundation/route.ts:50` |
| 저장 모델(target) | `RecOutcomeFeedback`(V3-11B·semantic_label/adverse)·`MemoryFactCandidate`(V3-11A gate) | `prisma/schema.prisma:862,777` |
| Foundation signal outbox | `maybeEnqueueFoundationSignal`→`foundationSignalOutbox.create`(draft·safe field만·raw text 0·**flush worker 없음**) | `src/lib/foundationSignalMapper.ts` |
| PII 가드 | `maskPii`·`sanitizeProperties`·`piiPolicy`·`rawTextStored=false` 불변식 | adapter·commerceEventService·piiPolicy |

## 3. Semantic extraction target labels (§2.12 10값)
satisfied·dissatisfied·neutral·adverse_skin_reaction·adverse_other·usage_question_safety·usage_question_general·repurchase_intent·avoid_intent·unclear.
- ★**추출 주체 = Foundation semantic judgment**(raw text 의미 인식). Cosmile은 Foundation 구조화 출력을 이 enum으로 **결정적 매핑**만. 미상/모호 → **`unclear`**(fail-safe·satisfied로 기본값 금지).

## 4. Adverse extraction target fields
- severity(low/moderate/severe·§2.4)·certainty(reported/repeated/verified/contradicted·§2.5)·safety_flag(§2.13)·direction(§2.1).
- ★**재발명 금지**: V3-11A `adverse.ts`(`severityOf`·`matrixEffect`§5.3)·D4 매핑 **재사용**. adverse **인식**(raw→adverse 여부)은 Foundation·**등급/효과 매핑**은 deterministic(adverse.ts).

## 5. Deterministic vs LLM/Foundation boundary (Constitution 정본)
| 층 | 담당 | 예 |
|---|---|---|
| **의미 인식(raw text)** | ★**Foundation `/v1/consult_contract`**(AI semantic) | "따가워요"→adverse·"계속 써도 돼?"→usage_question_safety·만족/불만 |
| **정책 집행(구조화 출력)** | ★**Cosmile deterministic**(rule/gate) | Foundation semantic 필드 → §2.12 enum 매핑·adverse.ts 등급·consultationRiskGate fail-closed |
| **escalation backstop** | Cosmile 휴리스틱(트리거 전용) | `serviceSafetyDetector` — 에스컬레이트만·최종 판단 금지 |
| ★**절대 금지** | route/adapter에서 **raw text 키워드/regex로 semantic_label 최종 확정** | Constitution·휴리스틱 금지 위반 |

## 6. DB/storage mapping
| 대상 | 매핑 | 규율 |
|---|---|---|
| `RecOutcomeFeedback` | Foundation semantic → semantic_label·adverse_severity·adverse_certainty(CHECK=사전 정본) | ★입력 원천 부재(G-D1)·feedback route 선행 필요 |
| `MemoryFactCandidate` | adverse/preference 후보 → `canCreateCandidate`(tombstone/must_not_reappear precheck·V3-11A) | ★생성만·자동 승격 금지 |
| Foundation signal outbox | draft signal(safe field·raw text 0) | 기존 패턴·flush 없음 |
| `LongTermMemoryFact` promotion | ★**직접 promotion 금지**(V3-11A `canPromote`·consent·D2) | consent 후·별도 pipeline(이월) |

## 7. Safety guardrail mapping (MAX·fail-closed·service adapter가 낮출 수 없음)
- adverse/irritation/rash/swelling/"계속 써도 돼" = **safety-first 인식** → Foundation semantic(Cosmile 키워드 금지). 매핑: adverse → direction=safety 후보·safety_flag(safety_frozen/caution/block)·§5.3 matrix effect.
- pregnancy/nursing/medical → `safety_flag=pregnancy_nursing_context`(별도 flag·§2.13).
- ★**의료 진단/치료 단정 금지**: Foundation safety gate + Cosmile `applyConsultationFailClosed`(grounded+pass 아니면 추천 금지). service adapter가 safety를 **낮출 수 없음**(Constitution).
- unclear/미상 → fail-safe(unclear·추천 금지 쪽).

## 8. Test design (구현 전 실패)
- **semantic label mapping**: Foundation 구조화 출력 → §2.12 enum(정답 + 과거/오류값 거부). ★raw text 입력이 아니라 **구조화 출력 매핑** 테스트(휴리스틱 금지 준수).
- **adverse severity/certainty mapping**: V3-11A adverse.ts 재사용·D4(mild 거부)·§5.3.
- **safety usage question**: usage_question_safety 라우팅(safety-first).
- **unclear fallback**: 모호/누락 → unclear(satisfied 기본값 금지·조용한 낙관 금지).
- **reward-hacking 방지**: adverse 누락 금지·severity 하향 금지·satisfied 편향 금지·모든 매핑 ③쌍 oracle.
- **no raw PII leakage**: `maskPii` 적용·raw_text 미저장(rawTextStored=false)·저장=label/code/hash/band만·PII/원문 0.

## 9. Explicitly excluded scope
실 LLM call·DB write·prod/live emit·main·secret/Vault·LTM promotion·ranking runtime·sessionId populate·RecOutcomeEvent 배선·V3-11E analytics·feedback 입력 route 신설·양성 reason_codes·view/click bridge — **전부 후속/미구현**.

## 10. Open decisions / LIMITS
- ★**G-D1(STOP 후보)**: **post-order feedback 입력 경로 부재** → RecOutcomeFeedback semantic 추출은 **입력 원천이 없다**. feedback route/consultation-outcome 신설이 선행(별도 gate)·이번 미포함.
- ★**G-D2(cross-repo·STOP·실측 확정)**: 현재 Foundation FRC 출력은 `safety_gate_result·reason_codes·final_strategy·recommendation_allowed` 등만·**`semantic_label`/`adverse_severity`/`adverse_certainty` 필드가 없음**(foundationClient.ts Frc 타입 실측). → RecOutcomeFeedback.semantic_label을 채울 **Foundation source 필드가 존재하지 않는다**. 선택지: (a) Foundation `/v1/consult_contract`(또는 별도 semantic 계약)에 semantic 출력 **추가**(cross-project·control tower·Foundation-side 설계 선행), (b) FRC 기존 필드(reason_codes/safety_gate_result)에서 **결정적 부분 매핑**(제한적·adverse/safety 계열만·satisfied/repurchase는 불가). ★어느 경우도 **Cosmile route에서 raw text 의미판단으로 대체 금지**(Constitution).
- **D-D1**: 추출 매핑 위치 = `cosmileSemanticAdapter` 확장(포장 계층) vs 신규 `semanticLabelMapper`(권장·소유 분리).
- **LIMITS(이월)**: feedback 입력·Foundation 출력 계약·LTM promotion·consent pipeline·live·G-C5·multi-touch.

## 11. Whether actual V3-11D implementation can begin
- ★**아니오(NO)**. gate/plan. 실 구현 전 **G-D2(Foundation 출력 계약) 확인** + **G-D1(입력 원천)** 결정 + D-D1 필요. ★특히 semantic 인식을 **Cosmile에서 raw로 하지 않는다**는 경계가 전제(Constitution). 결정 후 별도 V3-11D impl batch(deterministic 매핑 + test·LLM/DB write 0).

## 12. Required Leo approval before code changes
1. **G-D2** Foundation `/v1/consult_contract` 출력 필드(semantic_label/adverse) 확인/계약(cross-project·control tower). 없으면 Foundation-side 설계 선행.
2. **G-D1** feedback 입력 원천 결정(consultation-outcome vs feedback route 신설·별도 gate).
3. **D-D1** 매핑 위치.
4. deterministic-only scope 승인(Cosmile raw semantic 금지 재확인)·LLM call/DB write/live/prod/main 불가.
5. 승인 후 V3-11D impl batch 별도(이번 계획엔 코드 0).

## 무결성
gate/plan only · 코드/LLM call/DB write/emit 0 · 실파일 직접 대조(feedback 입력 없음·cosmileSemanticAdapter·consultationRiskGate·foundationClient) · ★의미=Foundation·정책=deterministic·route raw 판단 금지(Constitution) · gap G-D1(입력 원천 부재)·G-D2(Foundation 출력 계약 미확인) STOP 후보 · adverse=adverse.ts 재사용·direct LTM promotion 금지·PII/raw 미저장 · feedback route/LLM/live/prod/main 제외.
