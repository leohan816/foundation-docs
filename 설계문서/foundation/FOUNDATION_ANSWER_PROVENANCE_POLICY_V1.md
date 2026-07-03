# Foundation Answer Provenance Phrase Policy v1

> Foundation Knowledge Learning System — 답변 출처 표현(추임새) 정책 설계 문서
> 대상 모듈: `app/answer_provenance.py`
> 상태: v1 (구현 반영). 공동창업자·투자자 검토 가능 수준.

---

## 0. 이 문서가 푸는 문제

사용자가 질문하면 Foundation은 답을 한다. 그런데 그 답의 **근거가 어디서 왔는지**에 따라 말투가 달라져야 한다.
- 사람이 오래 검증해 온 표준 지식(canonical)과
- 시스템이 스스로 모아 정리한 학습 지식(learned)과
- 방금 웹에서 긁어온 최신 자료(web_recent)를

같은 단정적 어조로 말하면 신뢰가 깨진다. 반대로 매번 "이건 제가 자동으로 학습한 거라 확실하지 않은데요"라고 내부 구조를 노출하면, 사용자는 불안해지고 시스템은 underconfident하게 보인다.

이 정책은 두 가지를 동시에 만족시킨다.

1. **사용자에게는** 시스템 내부(저장소·DB·학습 파이프라인)를 노출하지 않는 **자연스럽고 짧은 추임새**만 보여준다.
2. **내부에는** 그 답이 어떤 layer/근거/검토자/검증시각에서 나왔는지 **trace**로 남겨 추적·재검토가 가능하게 한다.

이는 시스템 철학의 직접적 귀결이다.
- DeepSeek는 후보·표현·요약을 만들 뿐 **지식의 final judge가 아니다.** → 그래서 답변 어조도 "단정"이 아니라 출처 layer가 결정한다.
- learned knowledge는 canonical과 **분리**된다. → 그래서 `source_layer`가 핵심 분기 키다.
- 모든 learned claim은 source·evidence·confidence·review status·recheck cycle을 가진다. → 그 메타데이터가 trace로 흘러나온다.
- 불확실해도 반복질문 가치가 있으면 `cautious/uncertain`으로 답한다. → 그래서 어조 모드에 `uncertain`이 1급 시민으로 존재한다.

---

## 1. 금지 표현 (Forbidden Phrases)

시스템 내부를 노출하거나, 학습 지식을 사람이 검증한 표준 지식인 것처럼 과신하게 만드는 표현을 **하드 금지**한다.

구현 상수 (`FORBIDDEN_PHRASES`):

| # | 금지 문구 | 금지 이유 |
|---|-----------|-----------|
| 1 | `저장된 검증 지식` | 내부 저장소 노출 + "검증"이라는 과신 단어. learned를 canonical처럼 위장 |
| 2 | `저장된 지식` | 내부 저장소 구조 노출 |
| 3 | `내 데이터베이스` | 인프라(DB) 노출. 사용자에게 무의미하고 신뢰만 손상 |
| 4 | `DB에 저장된` | 동일하게 인프라 노출 |
| 5 | `학습된 지식에 따르면` | 자동 학습 파이프라인을 final judge처럼 표현(철학 1·3 위반) |

핵심 원칙: **"저장된 검증 지식에 따르면" 류는 절대 사용하지 않는다.** 대신 "현재 확인된 근거를 종합하면", "최근 공개 자료를 확인하면" 같은 **상태 기반·시점 기반** 표현을 쓴다. 이는 두 가지를 동시에 만족한다.
- 내부 구조(저장소/DB/학습기)를 노출하지 않음
- "지금 시점의 확인" 임을 드러내 과신을 피함(강한 claim일수록 짧은 recheck cycle이라는 철학과 정합)

### 1.1 금지 표현 검사 API

```python
is_forbidden(text) -> list   # text 안에 들어 있는 금지 문구들을 리스트로 반환(없으면 [])
```

- 반환이 비어 있지 않으면 그 답변은 사용자에게 내보내면 안 된다(상위 레이어에서 차단/재작성).
- `select_phrase()` 내부에도 **2중 안전장치**가 있어, 혹시 후보 추임새에 금지 문구가 섞여 있으면 강제로 모드 기본값으로 되돌린다(§2.3).

---

## 2. answer_mode × source_layer 추임새 표

### 2.1 두 축의 enum (실제 값)

**`ANSWER_MODE`** — 답의 확신/태도 (5종, 순서대로 강→약):

| answer_mode | 의미 |
|-------------|------|
| `assertive` | 가장 강하게 단정. 표준 근거가 충분 |
| `grounded` | 근거에 기반해 명확히 답함 |
| `cautious` | 자료는 있으나 신중하게, 여지를 남김 |
| `uncertain` | 결론이 고정되지 않음. 그래도 반복질문 가치가 있어 정리해 제공 |
| `cannot_determine` | 현재 자료로는 단정 불가 |

**`SOURCE_LAYER`** — 근거가 나온 지식 계층 (5종):

| source_layer | 의미 | canonical과의 관계 |
|--------------|------|--------------------|
| `canonical` | 사람이 검증한 표준 지식 | 표준 그 자체 |
| `learned` | 시스템이 모아 정리한 학습 지식 | **canonical과 분리 저장**(철학 4) |
| `web_recent` | 최근 웹 공개 자료 | 최신성 우선, 확정성 낮음 |
| `dynamic` | 실시간/시점 의존 정보 | 시점에 따라 변동 |
| `none` | 근거 없음 | 단정 불가 처리 |

### 2.2 추임새 매핑 표 (`_PHRASES` — 실제 phrase)

`(answer_mode, source_layer)` 키마다 후보 추임새 리스트가 있고, **첫 번째 후보가 기본 선택**된다(`cand[0]`).

| answer_mode | source_layer | 1순위 추임새 (실제 사용) | 2순위 후보 |
|-------------|--------------|--------------------------|------------|
| `assertive` | `canonical` | 현재 확인된 근거를 종합하면 | 여러 신뢰도 높은 자료를 기준으로 보면 |
| `grounded` | `canonical` | 현재 확인된 근거를 종합하면 | 신뢰할 만한 자료를 기준으로 보면 |
| `grounded` | `learned` | 제가 조사해 정리한 근거에 따르면 | 현재 수집·검토된 자료 기준으로는 |
| `cautious` | `learned` | 현재 수집·검토된 자료 기준으로는 | 자료마다 차이가 있지만 현재까지 반복적으로 확인되는 방향은 |
| `grounded` | `web_recent` | 최근 공개 자료를 확인하면 | 현재 공개된 자료 기준으로는 |
| `cautious` | `web_recent` | 현재 공개된 자료 기준으로는 | 최근 자료를 확인해 보면(확정은 아니지만) |
| `grounded` | `dynamic` | 현재 시점 자료 기준으로는 | 지금 확인되는 정보로는 |
| `cautious` | `dynamic` | 지금 확인되는 정보 기준이라 달라질 수 있지만 | (단일 후보) |
| `uncertain` | `learned` | 아직 결론이 완전히 고정된 주제는 아니지만 현재 자료를 기준으로 정리하면 | 자료마다 차이가 있지만 현재까지 반복적으로 확인되는 방향은 |
| `uncertain` | `web_recent` | 아직 확정적이진 않지만 현재 공개 자료를 기준으로는 | (단일 후보) |
| `cannot_determine` | `none` | 현재 확인한 자료만으로는 단정하기 어렵습니다 | (단일 후보) |

설계 의도(읽는 법):
- **canonical일수록 어조를 "근거 종합"으로** 두어 가장 단정적. 단, 여기서도 "확인된"이라는 시점 표현을 유지해 과신 방지.
- **learned는 "제가 조사해 정리한" / "수집·검토된"** 으로, 시스템 자체가 모았다는 사실을 정직하게(그러나 내부 구조 노출 없이) 드러낸다.
- **web_recent / dynamic은 "최근 / 현재 시점 / 달라질 수 있지만"** 으로 최신성과 변동 가능성을 명시.
- **uncertain은 "아직 고정되지 않았지만 정리하면"** 으로, 답을 회피하지 않으면서도 확정하지 않는다(철학 7).

### 2.3 키가 없을 때의 폴백 (`_DEFAULT`)

`(answer_mode, source_layer)` 조합이 표에 없으면 **answer_mode만으로** 기본 추임새를 고른다.

| answer_mode | 기본 추임새 (`_DEFAULT`) |
|-------------|--------------------------|
| `assertive` | 현재 확인된 근거를 종합하면 |
| `grounded` | 현재 확인된 근거를 기준으로 보면 |
| `cautious` | 현재 수집·검토된 자료 기준으로는 |
| `uncertain` | 아직 결론이 고정된 주제는 아니지만 현재 자료를 기준으로 정리하면 |
| `cannot_determine` | 현재 확인한 자료만으로는 단정하기 어렵습니다 |

선택 알고리즘 (`select_phrase(answer_mode, source_layer="learned")`):

1. `answer_mode == "cannot_determine"` 이면 곧바로 `_DEFAULT["cannot_determine"]` 반환.
2. `_PHRASES[(answer_mode, source_layer)]` 가 있으면 그 **첫 후보**, 없으면 `_DEFAULT[answer_mode]` (그것도 없으면 `_DEFAULT["cautious"]`).
3. **안전장치**: 선택된 추임새에 금지 문구가 하나라도 섞여 있으면 → `_DEFAULT[answer_mode]`(fallback `cautious`)로 강제 교체.
4. `source_layer` 기본값은 `"learned"`. 즉 layer 정보가 없으면 시스템은 **표준 지식이 아니라 학습 지식으로 간주**해 더 보수적으로 답한다(canonical 과신 금지).

---

## 3. layer/상태별 표현 (high confidence / learned / recent web / uncertain / insufficient)

§2 표를 사용자 관점의 5개 시나리오로 압축한 운영 가이드.

| 시나리오 | 대표 (answer_mode, source_layer) | 사용자에게 나가는 추임새 | 의도 |
|----------|-----------------------------------|--------------------------|------|
| **High confidence** (표준·고신뢰) | `assertive`/`grounded` × `canonical` | 현재 확인된 근거를 종합하면 | 가장 단정적이되 "확인된" 시점 표현 유지 |
| **Learned** (시스템 정리 지식) | `grounded`/`cautious` × `learned` | 제가 조사해 정리한 근거에 따르면 / 현재 수집·검토된 자료 기준으로는 | learned임을 정직히, 내부 구조 노출 없이 |
| **Recent web** (최신 웹) | `grounded`/`cautious` × `web_recent` | 최근 공개 자료를 확인하면 / 현재 공개된 자료 기준으로는 | 최신성 강조, 확정성은 낮춤 |
| **Uncertain** (결론 미고정) | `uncertain` × `learned`/`web_recent` | 아직 결론이 완전히 고정된 주제는 아니지만 현재 자료를 기준으로 정리하면 | 답을 주되 확정하지 않음(반복질문 가치) |
| **Insufficient** (근거 부족) | `cannot_determine` × `none` | 현재 확인한 자료만으로는 단정하기 어렵습니다 | 추임새 = 답 자체. 본문 없이 단독 출력(§4) |

원칙: **강한 claim일수록 더 높은 evidence를 요구하고 더 짧은 recheck cycle을 가진다**(철학 8). 어조도 마찬가지로, `assertive`/`canonical`로 올라갈수록 trace의 `evidence_score`·`reviewed_by`·`last_verified_at`가 채워져 있어야 정당화된다. 어조와 trace는 **함께** 검증되어야 하며, 어조만 강하고 trace가 빈 답변은 정책 위반이다.

---

## 4. compose: 사용자용 짧은 텍스트 + 내부 trace

`compose()`는 이 정책의 **단일 진입점**이다. 추임새(사용자용)와 trace(내부용)를 한 번에 만들어 함께 반환한다.

```python
compose(answer_mode, source_layer, body,
        evidence_score=None, source_urls=None, reviewed_by=None,
        last_verified_at=None, claim_type=None)
-> { "user_text": <str>, "trace": <dict> }
```

### 4.1 user_text 구성 규칙

- 일반 모드: `"{추임새}, {body}"` (추임새 + 쉼표 + 본문).
  - 예: `현재 수집·검토된 자료 기준으로는, 이 성분은 보습 목적에 흔히 쓰입니다.`
- `answer_mode == "cannot_determine"`: 본문을 붙이지 않고 **추임새 단독** = `현재 확인한 자료만으로는 단정하기 어렵습니다.`
  - 근거가 없으면 본문(추정)을 만들어 내지 않는다 — hallucination 차단.

user_text는 **짧고 자연스러운 한국어**이며, §1 금지 문구를 절대 포함하지 않는다(select_phrase 안전장치가 보장).

### 4.2 내부 trace 구조 (`build_trace`)

trace는 **사용자에게 노출되지 않는다.** 답변 근거 추적·재검토·충돌 기록용이다.

| trace 필드 | 출처/의미 | 비고 |
|------------|-----------|------|
| `source_layer` | 근거 계층 | canonical/learned/web_recent/dynamic/none |
| `evidence_score` | 근거 강도 점수 | 강한 claim일수록 높아야 함(철학 6·8) |
| `source_urls` | 출처 URL 목록 | `list(source_urls or [])` — 항상 리스트로 정규화 |
| `reviewed_by` | 심사 주체 | learned는 Opus 자동 reviewer 표기, canonical은 사람 |
| `last_verified_at` | 마지막 검증 시각 | recheck cycle 만료 판단의 기준 |
| `answer_mode` | 사용된 어조 모드 | 사후 감사: 어조와 근거의 정합성 검증 |
| `claim_type` | claim 유형 | source type 적합성 판단(§5.1) |

`build_trace()`는 부수효과가 없는 순수 함수다. **canonical store에 쓰지 않으며, DB·secret을 출력하지 않는다.** trace는 호출자(상위 답변 파이프라인/로그)가 보관한다.

### 4.3 반환 형태 예시 (개념)

```
compose(
  answer_mode="cautious", source_layer="learned",
  body="이 성분은 보습 목적에 흔히 쓰입니다.",
  evidence_score=0.62, source_urls=["https://...","https://..."],
  reviewed_by="opus-auto-reviewer", last_verified_at="2026-06-20",
  claim_type="cosmetic_ingredient"
)
->
{
  "user_text": "현재 수집·검토된 자료 기준으로는, 이 성분은 보습 목적에 흔히 쓰입니다.",
  "trace": {
    "source_layer": "learned",
    "evidence_score": 0.62,
    "source_urls": ["https://...", "https://..."],
    "reviewed_by": "opus-auto-reviewer",
    "last_verified_at": "2026-06-20",
    "answer_mode": "cautious",
    "claim_type": "cosmetic_ingredient"
  }
}
```

(점수·URL·날짜는 형식 예시이며, 실제 값은 호출자가 claim 메타데이터에서 채운다.)

---

## 5. answer_mode 연결 (정책 → 어조 결정의 경계)

### 5.1 어조를 정하는 것은 무엇인가

`answer_mode`는 이 모듈이 **자체적으로 추론하지 않는다.** 상위 파이프라인이 claim의 메타데이터(evidence_score, review status, source_layer 적합성)를 보고 결정해 **입력으로 넘긴다.** 이 모듈은 그 결정을 **표현으로만** 변환한다. 책임 분리가 핵심이다.

- DeepSeek: 후보/표현/요약 생성 → **answer_mode를 확정하지 않음**(철학 1).
- Opus 자동 reviewer: Leo가 승인한 규칙으로 케이스를 대량 심사 → review status·confidence 산출.
- Leo(system builder): 개별 지식이 아니라 **"어떤 조건에서 assertive까지 허용할지" 규칙 자체**를 승인.
- 이 모듈(`answer_provenance`): 확정된 (answer_mode, source_layer)를 받아 **금지표현 없는 추임새 + trace**로 렌더링.

### 5.2 claim type × source type 적합성 (어조 상한 게이트)

source type 적합성은 claim type에 따라 다르다(철학 10). 이는 어조의 **상한**을 건다.

| claim_type | 부적합 source → 허용 안 되는 조합 | 허용 상한 |
|------------|-----------------------------------|-----------|
| health / pregnancy | 뉴스·블로그만으로 `assertive` | **자동 확정 금지.** 최대 `cautious`/`uncertain`, 사람 검증 전 `assertive` 불가 |
| trend / 인기 | 논문 단독으로 단정 | trend는 web_recent/dynamic 기반이 자연스러움 |
| 일반 사실 | 출처 없음(`none`)인데 `grounded` 이상 | `none`이면 `cannot_determine`로 강등 |

즉 어조 모드를 정하는 상위 로직은 **claim_type을 반드시 본다.** health/pregnancy 계열은 DeepSeek·자동 파이프라인 단독으로 `assertive`까지 올릴 수 없고, 사람(또는 승인된 reviewer 규칙)의 검증을 거치기 전에는 `cautious`/`uncertain` 상한이 강제된다. 이 모듈은 그렇게 강등된 모드를 받아 자연스러운 보수적 추임새로 렌더링하는 역할만 한다.

### 5.3 충돌·불확실 처리

- 자료가 충돌하면 삭제하지 않고 conflict/history로 남긴다(철학 9). 답변 어조는 보통 `uncertain` 또는 `cautious`로 내려가고, trace의 `source_urls`에 충돌하는 출처들이 함께 남아 사후 추적이 가능하다.
- 결론이 고정되지 않았으나 반복질문 가치가 있으면 `uncertain`으로 답한다(철학 7). 회피("모름")가 아니라 "현재 자료 기준 정리"를 제공한다.
- 근거가 전혀 없으면 `cannot_determine`로 강등, 본문 없이 추임새 단독 출력.

---

## 6. 보안·경계 (이 모듈이 하지 않는 것)

| 금지 | 이 모듈에서의 보장 |
|------|--------------------|
| canonical write | 이 모듈은 어떤 store에도 쓰지 않음. 순수 함수만 |
| DeepSeek 단독 확정 | answer_mode를 자체 추론하지 않음. 상위가 승인된 규칙으로 결정 |
| health/pregnancy 자동 확정 | §5.2 게이트로 어조 상한 강제(설계 계약) |
| 키/secret 노출 | trace 필드에 secret 없음. source_urls·점수·검토자·시각만 |
| 내부 구조 노출 | §1 금지표현 + select_phrase 안전장치로 차단 |

---

## 7. 구현 파일 / 테스트 참조

- **구현 파일**: `app/answer_provenance.py`
  - 상수: `FORBIDDEN_PHRASES`, `ANSWER_MODE`, `SOURCE_LAYER`, `_PHRASES`, `_DEFAULT`
  - 함수: `select_phrase(answer_mode, source_layer="learned")`, `is_forbidden(text)`, `build_trace(...)`, `compose(...)`
- **테스트(권장 케이스, 추가 시 경로)**: `tests/test_answer_provenance.py`
  - `select_phrase` 가 모든 `(answer_mode, source_layer)` 조합에서 §1 금지 문구를 **절대** 반환하지 않음
  - `is_forbidden` 가 5개 금지 문구를 각각 탐지
  - `compose` 의 `cannot_determine` 분기에서 본문이 붙지 않고 추임새 단독 출력
  - `build_trace` 가 `source_urls=None` 입력 시 `[]` 로 정규화
  - 폴백: 표에 없는 조합이 `_DEFAULT[answer_mode]` 로 떨어지는지

---

문서 버전: v1 · 기준 모듈 해시 시점: `app/answer_provenance.py` (69 lines)
