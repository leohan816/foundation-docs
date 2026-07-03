# Foundation Answer Pattern Distillation v1

> Foundation **Response Brain** 설계문서 — teacher(GPT/Claude) 답변에서 **표현·구조·순서·톤 원칙만** 증류(distill)하여 pattern card 후보를 만든다.
> 구현: `app/answer_pattern_distillation.py` · 테스트: `app/tests/test_answer_pattern_distillation.py`
> 상태: 설계/스키마/테스트 단계 (★`answer.py` 자동 적용 안 함)
> policy_version: `v1`

---

## 0. 두 개의 Brain 경계 (절대 전제)

| 구분 | Knowledge Brain | Response Brain (본 문서) |
|---|---|---|
| 질문 | **무엇이 맞는가** | **어떻게 말해야 고객이 이해·만족하는가** |
| 담당 | 사실 / 근거 / 출처 / 신뢰 | 표현 / 구조 / 순서 / 톤 |
| 산출 | evidence, source policy, confidence, answer_mode 상한 | pattern card (구조·순서·opener·hedge·금지행동) |
| 권한 | 사실 판단·answer_mode 결정권 | **사실 생성 불가 · answer_mode 상향 불가** |

이 문서가 다루는 distillation 모듈은 **Response Brain 전용**이다. 따라서 다음 7개 절대원칙을 코드 레벨에서 강제한다.

1. teacher 원문을 **암기/복사하지 않는다** — 구조·원칙만 추출한다.
2. Response Brain은 **새 사실을 만들지 않는다**.
3. 사실 판단은 Knowledge Brain / `source policy` / `confidence` / `safety_gate`가 담당한다.
4. 만족도(satisfaction)가 아무리 높아도 **evidence 이상으로 `answer_mode`를 올릴 수 없다**.
5. `safety_gate` · `external_guard` · 내부 비공개 · trace 분리는 **기존대로 유지(우회 불가)**.
6. 고위험은 '잘 말하기'보다 **'덜 위험하게 말하기'** 가 우선이다.
7. 이번 단계는 **설계/스키마/테스트만** — `answer.py`에 자동 적용하지 않는다.

---

## 1. 모듈 개요 및 의존성

`answer_pattern_distillation.py`는 teacher 답변(`teacher_text`)과 `answer_type`을 입력받아, 사실은 일절 저장하지 않고 **구조 라벨·표현 정책·만족도 등급·원문 해시**만 담은 pattern card 후보를 반환한다.

| import (별칭) | 모듈 | 본 모듈에서 쓰는 책임 |
|---|---|---|
| `tax` | `answer_pattern_taxonomy` | answer_type별 권장 구조·허용 모드·위험도·필수 안전장치·금지행동 (`get_type`) |
| `sat` | `answer_satisfaction` | 만족도 12항목 채점·총점·hard-gate 등급(`total_score`, `grade`), answer_mode 캡(`cap_answer_mode`) |
| `dp` | `disclosure_policy` | 외부 노출 최종 게이트 `external_guard` |
| `safety_words` | `safety_words` | 안전 위반어 적발 `violations` |
| `hashlib`, `re` | 표준 | 원문 해시·문장 분리 |

핵심 설계 사상: distillation은 **사실을 평가하지 않는다.** 사실/안전/공개 판정은 전부 위 의존 모듈(Knowledge Brain 계열)에 위임하고, distillation은 그 판정 **결과를 받아 pattern card의 status를 막는(block) 역할**만 한다.

---

## 2. teacher answer raw text 미저장 정책

### 2.1 원칙
teacher 답변의 **원문 문장은 어디에도 저장하지 않는다.** 저장하는 것은 오직:

- `teacher_answer_hash` — 원문의 **SHA-256 앞 16자**(역산 불가, 동일성 식별·중복 방지용)
- `source_teacher` / `policy_version` 등 **internal metadata** (모델명·정책버전 — 사실 콘텐츠 아님)

```python
def teacher_hash(text):
    return hashlib.sha256((text or "").encode("utf-8")).hexdigest()[:16]
```

`pattern_id`도 `"pat:%s:%s" % (answer_type, h)` 형태로 **해시만** 사용한다. 원문이 카드에 들어갈 수 있는 경로를 구조적으로 차단한다.

### 2.2 불변식(invariant)
| 항목 | 값 | 의미 |
|---|---|---|
| `raw_teacher_text_stored` | **`False` 고정** | 원문 미저장 플래그 |
| `structure_only` | `True` | 카드는 구조·라벨만 담는다 |
| `factual_authority` | `False` | 카드는 사실 권위를 갖지 않는다 |
| `teacher_answer_hash` | 16자 hex | 원문 자체 아님 |

### 2.3 검증 함수 `validate_no_raw(card, teacher_text=None)`
카드가 원문 미저장 불변식을 지키는지 검사하고 위반 리스트를 반환한다(빈 리스트 = 통과).

| 검사 | 위반 코드 | 트리거 조건 |
|---|---|---|
| 플래그 강제 | `raw_teacher_text_stored_must_be_false` | `card["raw_teacher_text_stored"]`가 `False`가 아님 |
| 금지 필드 적발 | `raw_field_present:<f>` | `teacher_text`/`raw_teacher_text`/`teacher_answer`/`raw_answer`/`teacher_raw` 중 하나라도 카드 키에 존재 |
| 문장 복사 적발 | `verbatim_copy_detected` | `teacher_text`가 주어졌고 `contains_copied_text`가 일치 문장 반환 |

---

## 3. 문장 복사 방지 (verbatim 감지)

구조만 추출해야 하므로, teacher 문장이 카드의 텍스트 필드에 **그대로 베껴 들어가는 것**을 감지·거부한다.

### 3.1 문장 분리 `_sentences(t)`
```python
def _sentences(t):
    return [s.strip() for s in re.split(r"[。.!?\n]+", t or "") if len(s.strip()) >= 15]
```
- 구분자: `。 . ! ? 줄바꿈`
- **길이 15자 미만 문장은 무시** — 짧은 일반어("주의하세요" 등)의 우발적 일치를 배제하고, 의미 있는 베껴쓰기만 잡는다.

### 3.2 복사 감지 `contains_copied_text(card, teacher_text)`
카드의 텍스트성 필드(`example_skeleton` + `step_sequence`를 이어붙인 blob)에 teacher 원문 문장이 **부분 문자열로 통째 존재**하는지 검사하여, 일치한 문장 목록을 반환한다.
```python
blob = str(card.get("example_skeleton", "")) + " " + " ".join(card.get("step_sequence", []) or [])
return [s for s in _sentences(teacher_text) if s in blob]
```
검사 대상은 **자유 텍스트가 들어갈 수 있는 두 필드뿐**이다(나머지 필드는 enum·해시·플래그라 원문이 들어갈 수 없음). 일치 문장이 하나라도 있으면 `validate_no_raw`가 `verbatim_copy_detected`를 보고한다 → 해당 카드는 채택 불가.

> 테스트 4: `example_skeleton`을 teacher 원문으로 바꿔치기하면 `verbatim_copy_detected`가 검출됨을 확인.

---

## 4. distillation output 필드 표

`distill(...)`가 반환하는 pattern card의 전체 스키마. 모든 사실성 필드(구조·모드·위험도·안전장치·금지행동)는 **taxonomy에서 라벨로 가져온 것**이며 teacher 문장이 아니다.

| 필드 | 타입 | 출처 / 산출식 | 설명 |
|---|---|---|---|
| `pattern_id` | str | `"pat:{answer_type}:{hash}"` | 원문 해시 기반 식별자(원문 미포함) |
| `answer_type` | str | 입력 | 답변 유형(taxonomy 키) |
| `intent_scope` | str | `= answer_type` | 패턴 적용 의도 범위 |
| `audience` | str | 입력 (기본 `customer`) | 대상 청중 |
| `locale` | str | 입력 (기본 `ko`) | 언어/지역 |
| `risk_level` | str | `tax.get_type(...)["risk_level"]` | 유형 고유 위험도 |
| `answer_mode_allowed` | list | `tx["allowed_answer_modes"]` | **패턴이 허용하는 모드 범위**(실사용 시 evidence로 cap) |
| `step_sequence` | list | `tx["recommended_structure"]` | **구조 라벨 순서**(teacher 문장 아님) |
| `opener_policy` | str | `_opener_policy(answer_type)` | 도입부 처리 정책 |
| `hedge_policy` | str | `_hedge_policy(answer_type)` | 단정 완화·유보 정책 |
| `safety_boundary` | list | `tx["required_safeguards"]` | 필수 안전장치 |
| `forbidden_moves` | list | `tx["forbidden_moves"]` | 금지 행동 |
| `example_skeleton` | str | `" → ".join(step_sequence)` | **구조 예시(원문 문장 아님)** |
| `satisfaction_score` | float\|None | `sat.total_score(scores)` (scores 없으면 None) | 만족도 가중 총점 |
| `teacher_answer_hash` | str(16) | `teacher_hash(teacher_text)` | 원문 SHA-256 앞 16자 |
| `raw_teacher_text_stored` | bool | **`False` 고정** | 원문 미저장 불변식 |
| `source_teacher` | str | 입력 (기본 `teacher_model`) | internal metadata(모델명) |
| `status` | enum | 초기 `pattern_candidate`, 차단 시 갱신 | §5 상태 enum |
| `reviewed_by` | str\|None | 입력 | 검토자(사람 승인 단계용) |
| `policy_version` | str | 입력 (기본 `v1`) | 정책 버전 |
| `created_at` | str | 입력 | 생성 시각 |
| `structure_only` | bool | `True` | 구조만 담음 |
| `factual_authority` | bool | `False` | 사실 권위 없음 |
| `grade` | enum | 차단·채점 시 추가(`scores` 있을 때) | `sat.grade(...)` 결과(§5.2) |
| `block` | str | 차단 시 추가 | 차단 사유 코드(§6) |
| `block_detail` | list | 차단 시 추가 | 위반 상세 |

### 4.1 `distill(...)` 시그니처
```python
def distill(teacher_text, answer_type, audience="customer", locale="ko",
            source_teacher="teacher_model", scores=None, knowledge_answer_mode="cautious",
            reviewed_by=None, policy_version="v1", created_at=""):
```
- `answer_type`이 taxonomy에 없으면 → `{"error": "unknown_answer_type"}` 즉시 반환.
- `knowledge_answer_mode`는 시그니처에 받지만 distillation 단계에서 모드를 **올리는 데 쓰지 않는다**(원칙 4). 실제 사용 단계에서 `sat.cap_answer_mode(response_desired, evidence)`로 더 보수적인 쪽으로 캡된다.

### 4.2 opener / hedge 정책 (answer_type별 매핑)
`_OPENER` / `_HEDGE` 딕셔너리 매핑이며, 키에 없으면 기본값으로 떨어진다.

| answer_type | `opener_policy` | `hedge_policy` |
|---|---|---|
| `pregnancy_lactation_question` | `no_provenance_prefix` | `no_assertion_expert_referral` |
| `medical_boundary_question` | `no_provenance_prefix` | `no_assertion_expert_referral` |
| `adverse_reaction_question` | `no_provenance_prefix` | (기본) `cautious_default` |
| `safety_question` | (기본) `situational` | `cautious_patch_test` |
| `internal_algorithm_question` | `omit` | `disclosure_safe_fallback` |
| `ingredient_definition` | `omit_or_light` | (기본) `cautious_default` |
| `unknown_or_insufficient_data` | `omit` | `honest_unknown` |
| **그 외(기본값)** | `situational` | `cautious_default` |

```python
def _opener_policy(at): return _OPENER.get(at, "situational")
def _hedge_policy(at):  return _HEDGE.get(at, "cautious_default")
```
고위험 의료·임신/수유 유형은 출처 자랑(provenance) 도입부를 빼고(`no_provenance_prefix`), 단정 대신 전문가 위임(`no_assertion_expert_referral`)으로 강제된다 — 원칙 6의 '덜 위험하게 말하기' 구현.

---

## 5. status enum 및 만족도 등급

### 5.1 status enum (`PATTERN_STATUS`)
```python
PATTERN_STATUS = ("pattern_candidate", "pattern_reviewed",
                  "pattern_approved", "pattern_rejected", "pattern_deprecated")
```

| status | 의미 | 진입 방법 |
|---|---|---|
| `pattern_candidate` | 증류 직후 후보(기본 상태) | `distill` 정상 산출 |
| `pattern_reviewed` | 사람 검토 완료 | 별도 사람 단계 |
| `pattern_approved` | 승인(운영 채택 가능) | 별도 사람 단계 |
| `pattern_rejected` | 차단/탈락(채택 불가) | safety·disclosure·근거부족 차단(§6) |
| `pattern_deprecated` | 폐기 | 운영 수명주기 |

> ★`distill`은 자동으로 `pattern_approved`를 만들지 않는다. 정상 산출의 상한은 **`pattern_candidate`**이며, `reviewed`/`approved`로의 승격은 **사람 검토(`reviewed_by`) 단계**에서만 일어난다.

### 5.2 만족도 등급 `sat.grade(scores, answer_type)`
`scores`가 주어지면 만족도 12항목(`sat.SCORE_DIMENSIONS`)을 채점하고 **hard-gate 우선** 등급을 매겨 `card["grade"]`에 기록한다. 등급 enum(`sat.GRADES`):

| grade | distill에서의 처리 |
|---|---|
| `blocked_safety` / `blocked_disclosure` / `blocked_trace_leak` | `status=pattern_rejected`, `block=<grade>` |
| `failed_pattern` | `status=pattern_rejected`, `block="failed_pattern"` |
| `usable_with_revision` | `pattern_candidate` 유지 |
| `gold_pattern_candidate` | `pattern_candidate` 유지 (승인은 별도 사람 단계) |

hard-gate 핵심 규칙(`answer_satisfaction`): `factual_alignment < 4`면 **자연스러워도 gold 불가(`failed_pattern`)**, 고위험 유형은 `calibration < 5`면 gold 불가. 즉 **만족도가 사실/calibration을 이길 수 없다**(원칙 4).

---

## 6. 차단(block) 규칙 — gold로 갈 수 없는 경우

`distill`은 다음 우선순위로 차단을 적용한다(앞선 조건이 우선).

| 순위 | 조건 | 판정 모듈 | `block` 코드 | status |
|---|---|---|---|---|
| 1 | unsafe 표현 적발 | `safety_words.violations(teacher_text)` | `blocked_safety` | `pattern_rejected` |
| 2 | 외부 노출 위험(내부정보 누출) | `dp.external_guard(...)["safe_for_external"] == False` | `blocked_disclosure` | `pattern_rejected` |
| 3 | (scores 있을 때) hard-gate 차단 | `sat.grade(...)` → `blocked_*` | `<grade>` | `pattern_rejected` |
| 4 | (scores 있을 때) 근거 부족·품질 미달 | `sat.grade(...) == "failed_pattern"` | `failed_pattern` | `pattern_rejected` |

```python
if viol:
    card["status"] = "pattern_rejected"; card["block"] = "blocked_safety"; card["block_detail"] = viol
elif not disc["safe_for_external"]:
    card["status"] = "pattern_rejected"; card["block"] = "blocked_disclosure"; card["block_detail"] = disc["violations"]
elif scores is not None:
    g = sat.grade(scores, answer_type); card["grade"] = g
    if g.startswith("blocked"):
        card["status"] = "pattern_rejected"; card["block"] = g
    elif g == "failed_pattern":
        card["status"] = "pattern_rejected"; card["block"] = "failed_pattern"
```

해석:
- **unsafe → `blocked_safety`**: teacher가 "임산부도 안전" 같은 단정/위험 표현을 쓰면, 표현이 매끄러워도 패턴으로 채택 불가.
- **내부노출 → `blocked_disclosure`**: teacher가 내부 reranker 구성(BM25/e5/RRF 등)을 드러내면 `external_guard`가 막아 채택 불가. `safety_gate`·`external_guard`는 distillation으로 **우회되지 않는다**(원칙 5).
- **근거 없는 단정 → gold 불가**: `factual_alignment < 4`면 만족도가 만점이라도 `gold_pattern_candidate`가 될 수 없고 `failed_pattern`으로 떨어진다(원칙 2·4).

> 테스트 5/6/7: 각각 `blocked_safety` / `blocked_disclosure` / `factual<4 → gold 불가 & rejected` 검증.

---

## 7. `example_skeleton` = 구조 예시(원문 문장 아님)

`example_skeleton`은 **구조 라벨을 화살표로 이은 골격**이며, teacher의 실제 문장이 아니다.
```python
steps = list(tx["recommended_structure"])   # taxonomy 라벨만
example_skeleton = " → ".join(steps)
```
예: `ingredient_definition`의 경우 taxonomy 권장 구조 라벨들이
`정의 → 주용도/장점 → 주의점 → 초보자 팁` 같은 **라벨 시퀀스**로만 표현된다. 이 필드는 §3의 verbatim 감지 대상이므로, teacher 원문 문장이 섞여 들어가면 즉시 `verbatim_copy_detected`로 거부된다.

> 테스트 3: `step_sequence` 길이 ≥ 4 이며 `example_skeleton`에 `→`가 포함됨을 확인.

---

## 8. answer_mode_allowed와 evidence cap의 관계

`answer_mode_allowed`는 **패턴이 허용하는 모드 범위**(taxonomy 기준)일 뿐, distillation이 모드를 결정하거나 상향하지 않는다. 실제 응답 생성 시 `sat.cap_answer_mode(response_desired, evidence_answer_mode)`가 **항상 더 보수적인 쪽으로** 캡한다.

```python
def cap_answer_mode(response_desired_mode, evidence_answer_mode):
    a = _MODE_RANK.get(response_desired_mode, 0)
    b = _MODE_RANK.get(evidence_answer_mode, 0)
    return _RANK_MODE[min(a, b)]   # 더 낮은(보수적) 모드

def can_upgrade_evidence():
    return False   # 만족도로 evidence/answer_mode 상향 → 절대 불가
```

따라서 `ingredient_definition` 같은 유형의 `answer_mode_allowed`에는 `assertive`가 들어가지 않으며(테스트 8b), 만족도 만점도 evidence가 약하면 모드를 끌어올리지 못한다 — 원칙 4의 코드 구현.

---

## 9. 처리 흐름 요약

```
teacher_text + answer_type
        │
        ├─ tax.get_type(answer_type) 없음 → {"error":"unknown_answer_type"}
        │
        ├─ teacher_hash(teacher_text)            # 원문 대신 16자 해시
        ├─ taxonomy에서 구조/모드/위험도/안전장치/금지행동 라벨 수집
        ├─ opener/hedge 정책 매핑
        │
        ├─ card 조립 (raw_teacher_text_stored=False, structure_only=True,
        │             factual_authority=False, status=pattern_candidate)
        │
        ├─ safety_words.violations  → 있으면 blocked_safety  (rejected)
        ├─ external_guard 위반        → blocked_disclosure (rejected)
        └─ scores 있으면 sat.grade   → blocked_*/failed_pattern (rejected)
                                       gold/usable → candidate 유지
        │
        ▼
pattern card 후보  →  (사람 검토)  →  reviewed → approved
```

distillation은 **사실을 만들지도, 모드를 올리지도, 원문을 저장하지도 않는다.** 오직 구조·표현 원칙을 라벨로 추출하고, 안전/공개/근거 판정 결과에 따라 채택 가능 여부(status)만 결정한다.

---

## 10. 구현·테스트 참조

| 구분 | 경로 |
|---|---|
| 구현 모듈 | `/home/leo/Project/SIASIU/app/answer_pattern_distillation.py` |
| 테스트 | `/home/leo/Project/SIASIU/app/tests/test_answer_pattern_distillation.py` |
| 의존: 답변 유형 taxonomy | `/home/leo/Project/SIASIU/app/answer_pattern_taxonomy.py` (`get_type`, `recommended_structure`, `allowed_answer_modes`, `risk_level`, `required_safeguards`, `forbidden_moves`) |
| 의존: 만족도 채점·등급 | `/home/leo/Project/SIASIU/app/answer_satisfaction.py` (`SCORE_DIMENSIONS`, `total_score`, `grade`, `GRADES`, `cap_answer_mode`, `can_upgrade_evidence`) |
| 의존: 외부노출 게이트 | `/home/leo/Project/SIASIU/app/disclosure_policy.py` (`external_guard`) |
| 의존: 안전어 적발 | `/home/leo/Project/SIASIU/app/safety_words.py` (`violations`) |

### 테스트 커버리지 매핑
| # | 테스트 의도 | 검증 대상 절 |
|---|---|---|
| 1 | teacher 원문 미저장(`raw_teacher_text_stored=False`·raw 필드 없음) | §2 |
| 2 | `teacher_answer_hash`(16자) 저장·원문 미포함 | §2.1 |
| 3 | `step_sequence` 구조 라벨 추출·`example_skeleton` 골격 | §4·§7 |
| 4 | 복사된 teacher 문장 거부(`verbatim_copy_detected`) | §3 |
| 5 | unsafe teacher → `blocked_safety` | §6 |
| 6 | disclosure 누출 teacher → `blocked_disclosure` | §6 |
| 7 | 자연스러워도 `factual<4` → gold 불가·rejected | §5.2·§6 |
| 8 | 안전 teacher → `pattern_candidate`+gold 등급·`structure_only`/`factual_authority` | §4·§5 |
| 8b | `answer_mode_allowed`에 evidence cap 반영(`assertive` 미포함) | §8 |

### 실행
```bash
python3 app/tests/test_answer_pattern_distillation.py
```
