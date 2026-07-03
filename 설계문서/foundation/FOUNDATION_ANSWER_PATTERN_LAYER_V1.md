# Foundation Answer Pattern Layer v1 — 설계서

> **상태: 설계/스키마/테스트 전용.** 본 레이어는 `answer.py` 실서빙 파이프라인에 **연결하지 않는다.**
> `pattern_approved` 는 **'구조(말하는 방식) 승인'** 이지 **'사실 승인'이 아니다.**

---

## 0. 위치와 경계 — Knowledge Brain vs Response Brain

SIASIU Foundation 은 두 개의 두뇌를 분리한다.

| 구분 | 질문 | 담당 | 본 레이어 관여 |
|---|---|---|---|
| **Knowledge Brain** | "무엇이 맞는가" (사실·근거·출처·신뢰) | source policy / confidence / safety_gate / evidence | **하지 않음** |
| **Response Brain** | "어떻게 말해야 고객이 이해·만족하는가" (표현·구조·순서·톤) | Answer Pattern Layer (본 문서) | **함** |

이 레이어는 **표현 구조(structure)만** 다룬다. 다음 7대 절대원칙을 코드 불변식으로 강제한다.

1. **teacher(GPT/Claude) 원문을 외우거나 복사하지 않는다** — 구조/원칙만 추출(`raw_teacher_text_stored=False`, hash만 저장).
2. Response Brain 은 **새 사실을 만들지 않는다**(`factual_authority=False`).
3. 사실 판단은 Knowledge Brain / source policy / confidence / safety_gate 가 담당한다.
4. 만족도가 높아도 **evidence 이상으로 answer_mode 를 올릴 수 없다**(`answer_satisfaction.cap_answer_mode` / `can_upgrade_evidence()==False`).
5. **safety_gate · external_guard · 내부 비공개 · trace 분리는 기존대로 유지**(우회 불가).
6. 고위험은 '잘 말하기'보다 **'덜 위험하게 말하기'** 우선.
7. 이번 단계는 설계/스키마/테스트만, **`answer.py` 자동 적용 안 함.**

관련 구현 모듈:
- `app/answer_pattern_taxonomy.py` — Answer Type 16종 정의(§1)
- `app/answer_pattern_layer.py` — PatternCard 생성·검증·상태전이·gold 판정·mock retrieval(§2~4)
- `app/answer_pattern_distillation.py` — teacher 답변 → 구조 카드 후보(원문 미저장·복사감지)
- `app/answer_satisfaction.py` — 12항목 만족도 → hard gate → grade/gold 판정

---

## 1. Answer Type Taxonomy 표 (16종)

`answer_pattern_taxonomy.ANSWER_TYPES` 의 16개 정의를 그대로 옮긴 것이다.
허용 answer_mode 어휘: `ANSWER_MODES = (assertive, grounded, cautious, uncertain, cannot_determine)`.
위험도 어휘: `RISK = (low, medium, high, critical)`.
고위험 집합: `HIGH_RISK_TYPES = (safety_question, pregnancy_lactation_question, medical_boundary_question, adverse_reaction_question, internal_algorithm_question)` — 단, `is_high_risk()` 는 이 집합 **또는** `risk_level ∈ {high, critical}` 이면 고위험으로 본다.

> 표 컬럼 = purpose / recommended_structure / allowed_answer_modes / risk_level / required_safeguards / forbidden_moves / customer_tone / next_action_style

| # | answer_type | purpose | recommended_structure (step 순서) | allowed_answer_modes | risk_level | required_safeguards | forbidden_moves | customer_tone | next_action_style |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `ingredient_definition` | 성분이 무엇인지 쉽게 설명 | 한 줄 정의 → 주로 쓰이는 목적 → 장점 → 주의점 → 처음 쓰는 사람 팁 | grounded, cautious | low | 효능 단정 금지 · 출처 범위 내 설명 | 과장 효능 단정 · 의학적 치료 주장 | 친근·차분 | 더 궁금하면 물어보게 유도 |
| 2 | `ingredient_function` | 성분이 어떤 작용을 하는지 | 핵심 기능 → 피부 고민 연결 → 한계/개인차 → 사용 팁 | grounded, cautious | low | 개인차 명시 · 완치 단정 금지 | 100% 효과 주장 · 부작용 없음 단정 | 친근 | 관련 성분/제품 제안 |
| 3 | `product_summary` | 제품 특징 요약 | 제품 성격 → 주요 소구점 → 어떤 고민에 맞나 → 확실치 않은 부분 명시 | grounded, cautious | medium | 전성분 불확실 시 단정 금지 · 출처 표시 | 미확인 전성분 단정 · 브랜드 광고 복창 | 차분 | 전성분/사용법 안내 제안 |
| 4 | `product_recommendation` | 제품 추천 | 고객 상황 확인 → 후보 1~3개 → 선택 기준 → 주의/대안 → 다음 행동 | grounded, cautious | medium | 단일 근거 추천 금지 · 안전 경계 우선 | 근거 없는 단정 추천 · 안전 무시 추천 | 도움되는·따뜻 | 비교/구매 결정 지원 |
| 5 | `product_comparison` | 제품 비교 | 비교 기준 제시 → 각 강점 → 상황별 적합 → 단정 회피 | grounded, cautious | medium | 승자 단정 자제 · 기준 투명 | 일방적 우열 단정 · 광고성 비교 | 중립·균형 | 고객 우선순위 질문 |
| 6 | `routine_guidance` | 사용 순서/루틴 안내 | 단계 순서 → 주의(자극/광민감) → 빈도 → 개인차 | grounded, cautious | medium | 자극 주의 명시 · 광민감 경고 | 무조건 매일 권장 · 자극 무시 | 친절·실용 | 피부 반응 보며 조절 안내 |
| 7 | `safety_question` | 안전성 질문(일반) | 단정 회피 → 일반적 주의 → 개인차/패치테스트 → 이상 시 중단·전문가 | cautious, uncertain | **high** | 완전 안전 단정 금지 · 패치테스트 권장 | 부작용 없음 단정 · 누구나 안전 단정 | 신중·안심 | 이상 반응 시 행동 안내 |
| 8 | `pregnancy_lactation_question` | 임신/수유 사용 질문 | **단정 금지 → 현재 근거 한계 → 제품/성분별 차이 가능성 → 전문가 상담 권장 → 사용 전 확인할 정보** | cautious, uncertain, cannot_determine | **critical** | 절대 안전/가능 단정 금지 · 전문가 상담 우선 · Tier1 근거 없으면 단정 불가 | 임산부 안전 단정 · 수유 안전 단정 · 브랜드 자료만으로 안전 주장 | 조심스럽·공감 | 전문가 상담 안내 |
| 9 | `medical_boundary_question` | 의료/치료 경계 질문 | 진단/치료 아님 명시 → 화장품 일반정보 한계 → 전문의 안내 → 안전한 범위만 | cautious, uncertain, cannot_determine | **critical** | 치료/완치 단정 금지 · 진단 금지 · 약/시술 대체 주장 금지 | 질환 치료 주장 · 진단 단정 · 약 대신 권유 | 신중·존중 | 전문의 상담 안내 |
| 10 | `adverse_reaction_question` | 이상반응/트러블 질문 | 공감/안전 먼저 → 즉시 중단·세척 안내 → 악화 시 전문가 → 원인 단정 회피 | cautious, uncertain | **high** | 원인 단정 금지 · 악화 시 의료 안내 | 원인 단정 · 계속 사용 권유 | 공감·침착 | 악화 시 병원 안내 |
| 11 | `unknown_or_insufficient_data` | 모름/근거 부족 | 솔직히 모름 → 왜 단정 못하는지 → 대신 도울 수 있는 것 | cannot_determine, uncertain | low | 지어내기 금지 · 환각 금지 | 없는 사실 생성 · 근거 없는 단정 | 솔직·도움 | 대안 질문 제안 |
| 12 | `internal_algorithm_question` | 내부 동작 질문 | **외부 공개 가능 범위만 설명 → 내부 세부 비공개 → 고객에게 의미있는 신뢰 원칙만 → disclosure-safe fallback** | grounded, cautious | **high** | scoring/routing/reranker/safety rule **미노출** · disclosure-safe fallback **필수** | 점수식 공개 · source routing 공개 · reranker/BM25/e5-small 공개 · safety rule 세부 공개 | 투명하되 신중 | 신뢰 원칙 안내(세부 비공개) |
| 13 | `market_trend_answer` | 시장 트렌드 | 트렌드 신호 → 출처 성격(플랫폼/검색/커머스) → 사실≠검증 구분 → 최신성 한계 | grounded, cautious | low | 트렌드를 과학 근거로 포장 금지 · 출처 표시 | 트렌드를 효능 근거로 단정 | 가볍·정보적 | 관심 성분 깊이 안내 제안 |
| 14 | `brand_claim_explanation` | 브랜드 클레임 설명 | 브랜드 주장과 독립 근거 분리 → 확인 가능한 범위 → 과신 금지 | grounded, cautious | medium | 브랜드 claim≠객관 효능 · 독립 근거 분리 | 브랜드 광고 복창 · 객관 효능 단정 | 중립 | 성분 일반정보 안내 |
| 15 | `customer_complaint_response` | 불만/항의 응대 | 공감/사과 먼저 → 상황 확인 → 안전 우선 안내 → 현실적 다음 단계 | cautious | medium | 방어적 태도 금지 · 안전 우선 | 고객 탓 · 과장 보상 약속 | 공감·진정 | 구체적 해결 단계 제안 |
| 16 | `purchase_decision_support` | 구매 결정 지원 | 고객 우선순위 확인 → 장단점 균형 → 안전/적합성 → 강요 없는 마무리 | grounded, cautious | medium | 강매 금지 · 안전/적합 우선 | 강매 · 근거 없는 확신 유도 | 도움·비강압 | 결정 기준 정리 |

### 1.1 명시 요청 3종 구조 메모

- **`ingredient_definition`** = 한 줄 정의 → 목적 → 장점 → 주의점 → 초보 팁. low risk, 효능 단정 금지가 핵심 안전장치.
- **`pregnancy_lactation_question`** = 단정 금지 → 근거 한계 → (제품/성분별) 차이 → 전문가 → 확인 정보. **유일하게 `critical` + `cannot_determine` 허용**, Tier1 근거 없으면 단정 불가.
- **`internal_algorithm_question`** = 공개범위만 → 내부 비공개 → (고객 의미의) 신뢰 원칙 → **disclosure-safe fallback**. scoring/routing/reranker(BM25·e5-small)/safety rule 세부는 **절대 미노출**.

> `validate_taxonomy()` 가 16종 전부에 대해 필수키 존재·risk 유효성·mode 어휘 유효성을 점검하며, 추가로 `internal_algorithm_question` 의 `required_safeguards` 에 "미노출/비공개/fallback" 중 하나가 반드시 포함되도록 강제한다.

---

## 2. PatternCard 필수필드 표

`answer_pattern_layer.make_pattern_card(distilled, scores)` 가 산출하는 카드 스키마.
검증 대상 필수필드 집합은 `PATTERN_FIELDS` (20개) 이며, 생성 시 구조 불변 플래그 2개(`structure_only`, `factual_authority`)가 추가된다.

| 필드 | 출처(distilled/taxonomy/고정/default) | 의미 | 비고 |
|---|---|---|---|
| `pattern_id` | distilled | 패턴 식별자 `pat:<answer_type>:<teacher_answer_hash>` | distill 에서 hash 기반 생성 |
| `answer_type` | distilled | 16종 중 하나 | taxonomy 키 |
| `locale` | distilled / default `"ko"` | 언어 로케일 | |
| `audience` | distilled / default `"customer"` | 대상 청중 | |
| `risk_level` | distilled (=taxonomy risk_level) | low/medium/high/critical | 고위험 판정 기준 |
| `allowed_answer_modes` | `list(distilled["answer_mode_allowed"])` | **패턴이 허용하는 answer_mode 범위** | ★실사용 시 evidence 로 cap. 허용 범위일 뿐 사용 보장 아님 |
| `step_sequence` | `list(distilled["step_sequence"])` | 말하는 순서(구조 **라벨**) | ★teacher 문장 아님 |
| `opener_policy` | distilled (`_opener_policy`) | 도입부 표현 정책 | |
| `hedge_policy` | distilled (`_hedge_policy`) | 완화/유보 표현 정책 | internal_algorithm fallback 단서 위치 중 하나 |
| `safety_boundary` | `list(distilled["safety_boundary"])` (=taxonomy required_safeguards) | 안전 경계 문구 라벨 | |
| `forbidden_moves` | `list(distilled["forbidden_moves"])` | 금지된 표현/행동 | |
| `next_action_style` | `taxonomy.get_type(at)["next_action_style"]` / `""` | 다음 행동 유도 스타일 | |
| `satisfaction` | `scores` 인자 | 12항목 만족도 점수(`SCORE_DIMENSIONS`) | None 가능 |
| `teacher_answer_hash` | distilled | teacher 답변 **해시만** | ★원문 미저장 |
| `raw_teacher_text_stored` | **고정 `False`** | 원문 저장 여부 | ★불변식 §3 |
| `source_teacher` | distilled.get | teacher 출처 라벨 | |
| `status` | distilled / default `"pattern_candidate"` | 상태(`PATTERN_STATUS`) | §3.2 전이 |
| `reviewed_by` | distilled.get | 검토자 | 사람 단계 |
| `policy_version` | distilled / default `"v1"` | 정책 버전 | |
| `created_at` | distilled / default `""` | 생성 시각 | |
| `structure_only` | **고정 `True`** | 구조 전용 카드 표식 | ★불변식 §3 |
| `factual_authority` | **고정 `False`** | 사실 권위 없음 | ★불변식 §3 |

### 2.1 만족도 12항목(`satisfaction`) — 참고

`answer_satisfaction.SCORE_DIMENSIONS` (각 1~5점):
`factual_alignment, intent_fit, clarity, naturalness, customer_friendliness, calibration, safety, actionability, non_disclosure, trace_separation, concision, emotional_reassurance`.
가중치(`_WEIGHTS`, 합 1.0)는 **내부용·외부 메시지 미노출**이며 안전/사실/비공개에 더 큰 비중(safety 0.13, factual_alignment 0.13, non_disclosure 0.10, trace_separation 0.08 …).

---

## 3. 불변식(Invariants)

### 3.1 카드 검증 — `validate_pattern(card, teacher_text=None)`
반환은 위반 코드 리스트(빈 리스트 = 통과). 강제 규칙:

| # | 불변식 | 위반 코드 | 근거/판정 |
|---|---|---|---|
| I1 | **teacher 원문 미저장** (`raw_teacher_text_stored` must be `False`) | `raw_teacher_text_stored_must_be_false` | `distillation.validate_no_raw` |
| I2 | **raw 텍스트 필드 금지** (`teacher_text/raw_teacher_text/teacher_answer/raw_answer/teacher_raw` 키 존재 불가) | `raw_field_present:<field>` | `validate_no_raw` |
| I3 | **원문 복사 감지** (verbatim 복사 차단) | `verbatim_copy_detected` | `contains_copied_text` (teacher_text 주어졌을 때) |
| I4 | **필수필드 누락 금지** (`PATTERN_FIELDS` 20개 전부) | `missing:<field>` | |
| I5 | **고위험 assertive-only 금지** — `is_high_risk(answer_type)` 인데 `allowed_answer_modes == ["assertive"]` 이면 불가 | `high_risk_assertive_only` | 원칙⑥ "덜 위험하게 말하기" |
| I6 | **internal_algorithm fallback 필수** — `internal_algorithm_question` 의 `safety_boundary + hedge_policy` 문자열에 `fallback`·`비공개`·`미노출` 중 하나가 반드시 존재 | `internal_algorithm_missing_fallback` | disclosure-safe |
| I7 | **사실 권위 없음** — `factual_authority` 가 `False` 가 아니면 불가 | `must_be_structure_only` | 원칙② |
| I8 | **구조 전용** — `structure_only` 가 `True` 가 아니면 불가 | `structure_only_must_be_true` | 원칙① |

### 3.2 상태 전이 — `set_status(card, status)`
- `status` 는 `PATTERN_STATUS = (pattern_candidate, pattern_reviewed, pattern_approved, pattern_rejected, pattern_deprecated)` 중 하나여야 함 — 아니면 `ValueError`.
- **`pattern_approved` 로 전이하려면 `validate_pattern()` 이 빈 리스트여야 함** — 검증 실패 카드는 승인 불가(`ValueError: cannot approve invalid pattern`).
- → **safety/disclosure/구조 게이트를 gold·approval 로 우회할 수 없다**(원칙⑤). 승인은 **구조 승인**이지 사실 승인이 아니다.

### 3.3 gold 적격 — `is_gold_eligible(card, scores)`
- 전제: `validate_pattern(card)` 가 **통과**(빈 리스트)해야 함. 하나라도 위반이면 즉시 `False`.
- 그 위에 `answer_satisfaction.is_gold(scores, answer_type)` 가 `True` 여야 gold.
- `is_gold` 내부 = `grade(...) == "gold_pattern_candidate"`. `grade()` 의 **hard gate 우선** 순서:
  1. `safety < 5` → `blocked_safety`
  2. `non_disclosure < 5` → `blocked_disclosure`
  3. `trace_separation < 5` → `blocked_trace_leak`
  4. `factual_alignment < 4` → `failed_pattern`
  5. **고위험인데 `calibration < 5`** → `failed_pattern` (고위험은 calibration 5 아니면 gold 불가)
  6. 게이트 통과 후 가중총점 `total_score`: `≥4.3` → gold, `≥3.2` → usable_with_revision, 그 외 failed.
- → **safety/disclosure(/trace) 실패는 어떤 만족도여도 gold 불가**(원칙⑤). 만족도가 높아도 게이트가 우선이다.

### 3.4 핵심 불변식 요약(요청 항목)
- `raw_teacher_text_stored = false` 고정, **raw 텍스트 필드 금지**(I1·I2).
- **safety/disclosure 실패는 gold 불가**(§3.3 hard gate). 검증 실패 카드는 approved 불가(§3.2).
- **고위험 assertive-only 금지**(I5).
- **internal_algorithm 은 disclosure-safe fallback 필수**(I6).
- **`pattern_approved` = 구조 승인이지 사실 승인이 아님**(`factual_authority=False`·`structure_only=True` 고정, I7·I8).
- 만족도로 **evidence/answer_mode 상향 불가**(`cap_answer_mode`, `can_upgrade_evidence()==False`) — 원칙④.

---

## 4. Retrieval (mock)

> ★실제 `answer.py` 미연결. in-memory 리스트 `_STORE` 기반 mock 이다.

API:
- `clear_store()` — `_STORE` 비우기.
- `add_pattern(card)` — 카드 1건 적재 후 반환.
- `retrieve_by_type(answer_type, include_deprecated=False)` — 해당 `answer_type` 카드만 반환하되, **기본적으로 `pattern_deprecated` 상태는 제외**(`include_deprecated=True` 일 때만 포함).

동작 규칙:
1. **answer_type 별 분리 조회** — 다른 타입 카드는 섞이지 않는다(`c.get("answer_type") == answer_type`).
2. **deprecated 기본 제외** — `status == "pattern_deprecated"` 카드는 `include_deprecated=False`(기본)에서 결과에서 빠진다.
3. 적재된 순서를 보존(리스트 순회). 점수 기반 정렬·reranking 은 **이 mock 범위 밖**(Knowledge Brain/실 retrieval 책임).

### 4.1 mock 예시 흐름

```text
clear_store()
add_pattern(card_A)   # answer_type=ingredient_definition, status=pattern_approved
add_pattern(card_B)   # answer_type=ingredient_definition, status=pattern_deprecated
add_pattern(card_C)   # answer_type=pregnancy_lactation_question, status=pattern_candidate

retrieve_by_type("ingredient_definition")
  → [card_A]                       # deprecated(card_B) 제외
retrieve_by_type("ingredient_definition", include_deprecated=True)
  → [card_A, card_B]               # deprecated 포함
retrieve_by_type("pregnancy_lactation_question")
  → [card_C]                       # 타입 분리 (다른 타입 미혼입)
retrieve_by_type("safety_question")
  → []                             # 해당 타입 카드 없음
```

### 4.2 retrieval 불변 메모
- mock 은 **저장된 구조 카드만** 돌려준다 — 사실/근거 판단·source routing·confidence 는 포함하지 않는다.
- deprecated 패턴이 기본 조회에서 노출되지 않으므로, 폐기된 표현 구조가 무심코 재사용되지 않는다.
- 실제 서빙 연결 시에도 본 레이어 출력은 **표현 구조 후보**일 뿐, answer_mode 상한·사실·안전은 Knowledge Brain/게이트가 최종 결정한다.

---

## 5. 구현·테스트 참조

| 항목 | 경로 |
|---|---|
| Taxonomy 16종 정의 | `/home/leo/Project/SIASIU/app/answer_pattern_taxonomy.py` |
| PatternCard 생성·검증·상태·gold·mock retrieval | `/home/leo/Project/SIASIU/app/answer_pattern_layer.py` |
| Distillation(원문 미저장·복사감지·blocker) | `/home/leo/Project/SIASIU/app/answer_pattern_distillation.py` |
| 만족도 12항목·hard gate·grade/gold | `/home/leo/Project/SIASIU/app/answer_satisfaction.py` |
| 테스트: pattern layer | `/home/leo/Project/SIASIU/app/tests/test_answer_pattern_layer.py` |
| 테스트: taxonomy | `/home/leo/Project/SIASIU/app/tests/test_answer_pattern_taxonomy.py` |
| 테스트: distillation | `/home/leo/Project/SIASIU/app/tests/test_answer_pattern_distillation.py` |
| 테스트: satisfaction | `/home/leo/Project/SIASIU/app/tests/test_answer_satisfaction.py` |

> 본 문서는 설계/스키마/테스트 범위로 한정한다. `answer.py` 자동 적용은 별도 wiring 단계에서 게이트·evidence cap 연결을 검증한 뒤 진행한다.
