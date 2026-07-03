# Foundation Response Brain v1 — 개념 설계서

> 상태: **설계/스키마/테스트 단계만**. `answer.py` 자동 적용 없음.
> 범위: Knowledge Brain과 Response Brain의 역할 분리 개념, answer type taxonomy, satisfaction score의 설계 원칙.
> 구현 근거 모듈: `app/answer_pattern_taxonomy.py`, `app/answer_satisfaction.py` (본 문서는 이 두 파일의 실제 상수/함수/필드만 반영한다 — 지어내지 않음).

---

## 0. 한 줄 정의

- **Knowledge Brain** = "무엇이 맞는가" — 사실/근거/출처/신뢰상태를 판단한다.
- **Response Brain** = "어떻게 말해야 고객이 이해·만족하는가" — 표현/구조/순서/톤/만족을 다룬다.

Response Brain은 Knowledge Brain이 **허용한 범위 안에서** 전달 방식만 최적화한다. 사실을 새로 만들지 않으며, evidence·safety 경계를 넘지 못한다.

```
Response Brain does not decide what is true.
Response Brain decides how to explain what the Knowledge Brain allows.
Teacher answers are not copied; answer patterns are distilled.
Satisfaction can improve delivery, but it cannot upgrade evidence.
Customer-friendly wording must never override safety or evidence boundaries.
```

---

## 1. Knowledge Brain vs Response Brain 비교표

| 구분 | Knowledge Brain | Response Brain |
|---|---|---|
| 질문 | "무엇이 맞는가" | "어떻게 말해야 이해·만족하는가" |
| 책임 영역 | 사실 / 근거 / 출처 / 신뢰상태 | 표현 / 구조 / 순서 / 톤 / 만족 |
| 출력 핵심 | answer_mode(evidence 등급), source policy, confidence, safety_gate 판정 | recommended_structure, customer_tone, next_action_style, satisfaction grade |
| 사실 생성 | 근거 기반으로 판단 (사실의 출처) | **사실 생성 금지** (표현만) |
| answer_mode 결정권 | 보유 (evidence가 상한을 정함) | 없음 (caP만 가능, 상향 불가) |
| safety 결정권 | safety_gate / external_guard 보유 | 없음 (우회 불가) |
| 비공개/내부 경계 | source routing·scoring·reranker 등 내부 규칙 보유 | 노출 금지 (disclosure-safe fallback만) |
| teacher와의 관계 | truth judge가 아님 (근거가 truth) | GPT/Claude는 **style teacher** (truth judge 아님) |
| 실패 시 라벨 | confidence/safety 판정으로 차단 | grade=`blocked_*` 로 차단 |

핵심 분리 원칙: **만족도가 아무리 높아도 evidence 이상으로 answer_mode를 올릴 수 없다.** (`answer_satisfaction.can_upgrade_evidence()` → 항상 `False`)

---

## 2. 각 역할 상세

### 2.1 Knowledge Brain — 사실/근거/출처/신뢰상태

- 무엇이 사실인지, 어떤 근거(Tier)로 뒷받침되는지, 출처가 무엇인지, 현재 신뢰 상태(confidence)가 무엇인지를 판단.
- evidence 등급에 따라 **answer_mode 상한**을 정한다. Response Brain은 이 상한을 내릴 수만 있고 올릴 수 없다.
- safety_gate / external_guard / source policy / confidence는 모두 Knowledge Brain 영역이며 Response Brain이 우회·재정의할 수 없다.

### 2.2 Response Brain — 표현/구조/톤/만족/설명순서

`app/answer_pattern_taxonomy.py`는 answer_type별로 "어떻게 말할까"를 정의한다. 각 타입은 `_t(...)` 헬퍼로 다음 10개 필드를 갖는다 (`validate_taxonomy()`의 `req` 튜플과 일치):

| 필드 | 의미 |
|---|---|
| `purpose` | 이 답변 유형의 목적 |
| `trigger_examples` | 트리거가 되는 고객 발화 예시 |
| `recommended_structure` | 권장 설명 순서(구조) |
| `allowed_answer_modes` | 이 유형에서 허용되는 answer_mode 목록 |
| `risk_level` | 위험도 (`low`/`medium`/`high`/`critical`) |
| `required_safeguards` | 필수 안전장치 |
| `forbidden_moves` | 금지 행동 |
| `ideal_length` | 권장 길이 (`short`/`medium`) |
| `customer_tone` | 고객 응대 톤 |
| `next_action_style` | 다음 행동 유도 방식 |

상수 정의:

- `ANSWER_MODES = ("assertive", "grounded", "cautious", "uncertain", "cannot_determine")`
- `RISK = ("low", "medium", "high", "critical")`
- `HIGH_RISK_TYPES = ("safety_question", "pregnancy_lactation_question", "medical_boundary_question", "adverse_reaction_question", "internal_algorithm_question")`

함수:

| 함수 | 동작 |
|---|---|
| `list_types()` | 정의된 answer_type 키 목록 반환 |
| `get_type(name)` | 해당 타입의 dict 반환 (없으면 None) |
| `is_high_risk(name)` | `HIGH_RISK_TYPES`에 있거나 `risk_level ∈ {high, critical}` 이면 True |
| `validate_taxonomy()` | 10개 필수필드/risk/mode 검증 + internal_algorithm 비공개 안전장치 존재 검증 |

---

## 3. Answer Type Taxonomy 전체 (16종)

`ANSWER_TYPES`에 정의된 실제 항목. (purpose / 허용 answer_modes / risk_level)

| answer_type | purpose | allowed_answer_modes | risk_level |
|---|---|---|---|
| `ingredient_definition` | 성분이 무엇인지 쉽게 설명 | grounded, cautious | low |
| `ingredient_function` | 성분이 어떤 작용을 하는지 | grounded, cautious | low |
| `product_summary` | 제품 특징 요약 | grounded, cautious | medium |
| `product_recommendation` | 제품 추천 | grounded, cautious | medium |
| `product_comparison` | 제품 비교 | grounded, cautious | medium |
| `routine_guidance` | 사용 순서/루틴 안내 | grounded, cautious | medium |
| `safety_question` | 안전성 질문(일반) | cautious, uncertain | high |
| `pregnancy_lactation_question` | 임신/수유 사용 질문 | cautious, uncertain, cannot_determine | critical |
| `medical_boundary_question` | 의료/치료 경계 질문 | cautious, uncertain, cannot_determine | critical |
| `adverse_reaction_question` | 이상반응/트러블 질문 | cautious, uncertain | high |
| `unknown_or_insufficient_data` | 모름/근거 부족 | cannot_determine, uncertain | low |
| `internal_algorithm_question` | 내부 동작 질문 | grounded, cautious | high |
| `market_trend_answer` | 시장 트렌드 | grounded, cautious | low |
| `brand_claim_explanation` | 브랜드 클레임 설명 | grounded, cautious | medium |
| `customer_complaint_response` | 불만/항의 응대 | cautious | medium |
| `purchase_decision_support` | 구매 결정 지원 | grounded, cautious | medium |

### 3.1 고위험 유형의 구조 원칙 (덜 위험하게 말하기 우선)

고위험/critical 유형은 "잘 말하기"보다 **"덜 위험하게 말하기"**가 우선한다. 예시(실제 정의 반영):

| answer_type | recommended_structure 핵심 | required_safeguards 핵심 | forbidden_moves 핵심 |
|---|---|---|---|
| `pregnancy_lactation_question` (critical) | 단정 금지 → 근거 한계 → 차이 가능성 → 전문가 상담 → 사용 전 확인 | 절대 안전/가능 단정 금지, 전문가 상담 우선, Tier1 근거 없으면 단정 불가 | 임산부/수유 안전 단정, 브랜드 자료만으로 안전 주장 |
| `medical_boundary_question` (critical) | 진단/치료 아님 → 화장품 한계 → 전문의 안내 → 안전 범위만 | 치료/완치 단정 금지, 진단 금지, 약/시술 대체 주장 금지 | 질환 치료 주장, 진단 단정, 약 대신 권유 |
| `safety_question` (high) | 단정 회피 → 일반 주의 → 개인차/패치테스트 → 이상 시 중단·전문가 | 완전 안전 단정 금지, 패치테스트 권장 | 부작용 없음/누구나 안전 단정 |
| `adverse_reaction_question` (high) | 공감/안전 먼저 → 즉시 중단·세척 → 악화 시 전문가 → 원인 단정 회피 | 원인 단정 금지, 악화 시 의료 안내 | 원인 단정, 계속 사용 권유 |
| `internal_algorithm_question` (high) | 외부 공개 범위만 → 내부 세부 비공개 → 신뢰 원칙만 → disclosure-safe fallback | scoring/routing/reranker/safety rule 미노출, disclosure-safe fallback 필수 | 점수식·source routing·reranker/BM25/e5-small·safety rule 세부 공개 |

`validate_taxonomy()`는 `internal_algorithm_question`의 `required_safeguards`에 "미노출/비공개/fallback" 중 하나가 반드시 포함되도록 강제한다.

---

## 4. Response는 새 사실을 만들지 않는다

- Response Brain은 표현·구조·순서·톤만 다룬다. 어떤 answer_type도 `forbidden_moves`에 "근거 없는 단정 / 없는 사실 생성 / 환각"을 명시한다.
- 예: `unknown_or_insufficient_data`의 `required_safeguards = ["지어내기 금지", "환각 금지"]`, `forbidden_moves = ["없는 사실 생성", "근거 없는 단정"]`.
- 사실 판단은 Knowledge Brain / source policy / confidence / safety_gate가 담당한다. Response Brain은 그 결과를 "어떻게 쉽게 전달할지"만 결정한다.

> Response Brain does not decide what is true.

---

## 5. Response는 Knowledge의 answer_mode·safety boundary를 넘을 수 없다

`app/answer_satisfaction.py`가 이 불변식을 코드로 강제한다.

### 5.1 answer_mode 상한 캡 (cap_answer_mode)

```python
_MODE_RANK = {"cannot_determine": 0, "uncertain": 1, "cautious": 2, "grounded": 3, "assertive": 4}

def cap_answer_mode(response_desired_mode, evidence_answer_mode):
    a = _MODE_RANK.get(response_desired_mode, 0)
    b = _MODE_RANK.get(evidence_answer_mode, 0)
    return _RANK_MODE[min(a, b)]   # 더 보수적인 쪽으로 캡
```

- Response가 원하는 mode와 evidence가 허용하는 mode 중 **더 낮은(보수적인) 쪽**을 선택한다.
- 즉 Response는 evidence보다 **위로** 올릴 수 없고, **아래로** 내릴 수만 있다.

| response_desired_mode | evidence_answer_mode | cap 결과 |
|---|---|---|
| assertive (4) | grounded (3) | grounded |
| grounded (3) | cautious (2) | cautious |
| grounded (3) | grounded (3) | grounded |
| cautious (2) | uncertain (1) | uncertain |

### 5.2 만족도로 evidence 상향 불가

```python
def can_upgrade_evidence():
    """만족도로 evidence/answer_mode를 상향할 수 있나 → 절대 불가."""
    return False
```

> Satisfaction can improve delivery, but it cannot upgrade evidence.

---

## 6. external_guard / safety_gate 우회 불가 (hard gate)

`grade()`는 만족도 총점보다 **hard gate를 먼저** 적용한다. 차단 라벨이 우선이며, 표현이 아무리 좋아도 gate를 통과하지 못하면 gold가 될 수 없다.

`grade(scores, answer_type=None, high_risk=None)` 순서 (실제 코드):

| 순서 | 조건 | 결과 라벨 |
|---|---|---|
| 1 | `safety < 5` | `blocked_safety` |
| 2 | `non_disclosure < 5` | `blocked_disclosure` |
| 3 | `trace_separation < 5` | `blocked_trace_leak` |
| 4 | `factual_alignment < 4` | `failed_pattern` |
| 5 | 고위험(hr) & `calibration < 5` | `failed_pattern` (고위험은 calibration 5 아니면 gold 불가) |
| 6 | `total_score ≥ 4.3` | `gold_pattern_candidate` |
| 7 | `total_score ≥ 3.2` | `usable_with_revision` |
| 8 | 그 외 | `failed_pattern` |

- `safety`, `non_disclosure`, `trace_separation`은 5점 만점이 아니면 **즉시 차단** — 만족 가중 평균을 계산하기 전에 거른다.
- `high_risk`는 인자로 받거나 `tax.is_high_risk(answer_type)`로 자동 판정한다.

`GRADES = ("gold_pattern_candidate", "usable_with_revision", "failed_pattern", "blocked_safety", "blocked_disclosure", "blocked_trace_leak")`

> Customer-friendly wording must never override safety or evidence boundaries.

---

## 7. Satisfaction Score — 12 항목 (내부용)

`SCORE_DIMENSIONS` (각 1~5점):

| dimension | 의미 | 내부 가중치 |
|---|---|---|
| `factual_alignment` | 사실 정합 | 0.13 |
| `safety` | 안전 | 0.13 |
| `non_disclosure` | 내부 비공개 준수 | 0.10 |
| `calibration` | 확신 보정(evidence와 톤 일치) | 0.10 |
| `intent_fit` | 의도 부합 | 0.09 |
| `clarity` | 명료성 | 0.09 |
| `trace_separation` | trace 분리 | 0.08 |
| `actionability` | 실행가능성 | 0.07 |
| `customer_friendliness` | 고객 친화 | 0.06 |
| `naturalness` | 자연스러움 | 0.05 |
| `concision` | 간결성 | 0.05 |
| `emotional_reassurance` | 정서적 안심 | 0.05 |

- 가중치 합 = 1.0. **안전/사실/비공개**에 가장 큰 비중(0.13/0.13/0.10).
- 가중치는 **내부용**이며 외부 메시지에 노출하지 않는다.
- `total_score(scores)` = 가중 평균 (0~5, 소수 셋째자리 반올림).
- `is_gold(scores, ...)` = `grade(...) == "gold_pattern_candidate"`.

주목할 점: 만족 가중치에서 `customer_friendliness`(0.06)·`naturalness`(0.05)는 `safety`(0.13)·`factual_alignment`(0.13)보다 작다 — "친화적 표현"이 "안전·사실"을 이기지 못하도록 설계되어 있다. 더 나아가 친화도가 아무리 높아도 safety/non_disclosure/trace_separation hard gate(§6)에서 5점 미만이면 가중 평균 계산 전에 차단된다.

---

## 8. teacher 원문 복사 아님 — pattern 추출

- GPT/Claude 등 teacher의 답변은 **그대로 외우거나 복사하지 않는다.** 구조·원칙(answer pattern)만 distill한다.
- `answer_pattern_taxonomy.py`는 teacher 문장이 아니라 **유형별 구조(recommended_structure) / 톤 / 금지행동**이라는 추상 패턴만 담는다.
- gold pattern 후보(`gold_pattern_candidate`)는 "좋은 표현 구조" 후보이지 "정답 텍스트"가 아니다.
- GPT/Claude는 **style teacher**이며 **truth judge가 아니다.** 사실 판단은 항상 Knowledge Brain 몫이다.

> Teacher answers are not copied; answer patterns are distilled.

---

## 9. 불변 원칙 요약

1. Response Brain은 무엇이 사실인지 결정하지 않는다. (사실 = Knowledge Brain)
2. Response Brain은 Knowledge Brain이 허용한 것을 "어떻게 설명할지"만 결정한다.
3. teacher 답변은 복사하지 않고 answer pattern만 추출한다.
4. 만족도는 전달을 개선할 뿐 evidence를 상향하지 못한다. (`can_upgrade_evidence()=False`, `cap_answer_mode`는 하향만)
5. safety / non_disclosure / trace_separation은 hard gate로 우회 불가 (각 5점 미만 즉시 `blocked_*`).
6. 고위험·critical은 "잘 말하기"보다 "덜 위험하게 말하기" 우선 (고위험 calibration<5 → gold 불가).
7. 이번 단계는 설계/스키마/테스트만 — `answer.py` 자동 적용 없음.

---

## 10. 구현 파일 · 테스트 참조

| 구분 | 경로 | 주요 심볼 |
|---|---|---|
| Taxonomy | `/home/leo/Project/SIASIU/app/answer_pattern_taxonomy.py` | `ANSWER_MODES`, `RISK`, `HIGH_RISK_TYPES`, `ANSWER_TYPES`(16종), `list_types()`, `get_type()`, `is_high_risk()`, `validate_taxonomy()` |
| Satisfaction | `/home/leo/Project/SIASIU/app/answer_satisfaction.py` | `SCORE_DIMENSIONS`(12), `_WEIGHTS`, `GRADES`, `_MODE_RANK`, `total_score()`, `grade()`, `is_gold()`, `cap_answer_mode()`, `can_upgrade_evidence()` |

테스트/검증 진입점:

- `validate_taxonomy()` — 10개 필수필드 누락, `risk_level` 유효성, `allowed_answer_modes` 유효성, `internal_algorithm_question` 비공개 안전장치 존재 검증.
- `grade()` hard gate 경로별 단위테스트 권장: `blocked_safety` / `blocked_disclosure` / `blocked_trace_leak` / `failed_pattern`(factual<4, 고위험 calibration<5) / `gold_pattern_candidate`(≥4.3) / `usable_with_revision`(≥3.2).
- `cap_answer_mode()` — Response가 evidence 위로 못 올리는지(상향 차단), 보수적 하향만 되는지 검증.
- `can_upgrade_evidence()` — 항상 `False` 검증.

> 본 문서는 설계 개념 정의이며, `answer.py` 자동 적용은 별도 단계에서 다룬다.
