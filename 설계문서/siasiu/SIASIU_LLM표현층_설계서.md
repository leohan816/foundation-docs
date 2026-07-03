# SIASIU LLM 표현층 설계서 — Judge-Locked LLM Presentation Layer (판단 고정형 LLM 표현층)

> **버전 v0.1 · 2026-06-24** (Leo)
> **한 줄:** *판단은 고정하고, LLM은 표현만 한다.* 샤슈 지능은 `judge_real + memory`에, DeepSeek/LLM은 *그 판단을 말로 잘 전달*하는 표현층.

---

## 0. 원칙 (절대)
**DeepSeek/LLM은 판단자가 아니라 *정리자/표현자*다.** LLM이 자기 판단을 섞는 순간 — 샤슈의 핵심인 *일관된 판단 기준*이 무너진다.

```
나쁜 구조:  제품자료 → LLM 판단 → 고객 답변          (LLM이 결론을 만든다 ❌)
좋은 구조:  제품자료 → judge_real 판단 → LLM 정리 → 고객 답변   (LLM은 말투만)
```

## 1. LLM이 *하면 안 되는 것*
- judgment 뒤집기(추천↔거절) · confidence 높이거나 낮추기.
- 새로운 효능/위험/안전 판단 추가 · "괜찮을 것 같다" 자기추론 삽입.
- 브랜드 claim을 *사실처럼* 강화 · 성분표에 없는 근거 생성.

## 2. LLM이 *하는 것* (오직)
- `judge_result`를 고객 친화적 문장으로 정리.
- 언어 변환(ko/zh/en…) · 길이 조절 · 톤 조절.
- 불확실성을 *부드럽게·약화 없이* 전달 · 주의사항을 *과장 없이* 전달.

## 3. 입력 = structured judge_result (raw 데이터 ❌)
LLM에 상세페이지·성분표·고객조건을 *다 던지고 "판단해줘"* ❌ → 그 순간 LLM이 판단을 시작한다.
대신 judge_real의 *구조화된 출력*만 준다:
```yaml
judge_result:
  judgment: caution              # recommend|conditional|caution|refuse
  confidence: medium             # high|normal|low
  reasons: [retinoid_detected, nursing_context, safety_data_limited, conservative_use]
  must_include:                  # 답변에 반드시 들어갈 핵심
    - 수유 중 사용은 안전 자료가 제한적이라 보수적으로 봐야 함
    - 레티노이드 계열 성분 포함
    - 사용 여부를 단정하지 않음
  must_not_say: [수유 중 안전, 문제 없음, 완전 안전, 치료, 무자극]
```
원문(상세페이지 등)이 필요하면 *citation/context로만* 제공 — LLM은 judge_result *밖의* 새 판단을 생성할 수 없다.

## 4. ★LLM-swappable 불변식
DeepSeek → Claude → GPT → Gemini → Qwen 으로 *바꿔도 결론이 같아야 한다.*
| 바뀌어도 되는 것 | 바뀌면 안 되는 것 |
|---|---|
| 문장 스타일·길이·친절 표현·언어 | 추천/주의/거절 판단·confidence·핵심 이유·안전 경고·불확실성·금지표현 기준 |
→ 결론은 LLM이 아니라 *judge*가 만들기 때문.

## 5. T7 = LLM Presentation Integrity Test (확장)
단순 "위험한 말 있나?"가 아니라 — **LLM이 judge 판단을 *오염시키지 않았는가.***
| 항목 | 검증 |
|---|---|
| judgment preservation | judge 판단을 안 바꿨나 |
| reason preservation | 핵심 이유를 안 빠뜨렸나(must_include) |
| uncertainty preservation | 불확실성을 유지했나 |
| safety preservation | 안전 경고를 약화 안 했나 |
| no new claims | 새 효능/안전 claim 생성 안 했나 |
| no forbidden language | 금지표현 없나(`safety_words.violations()` 재적용) |
→ judgment 변조·안전 단정 = **HARD FAIL.** (현재 1차 T7은 judge_real *템플릿* 출력 기준 — LLM 배선 후 *LLM output*에 같은 검사 재적용.)

## 6. 구현 시 (나중·배선)
```
judge_real structured output → prompt builder → LLM → customer answer → safety checker(violations + must_include/not) → final
```
- prompt builder: judge_result를 *고정*해 LLM에 넣는 프롬프트(판단 바꾸지 말라 명시).
- safety checker: LLM output을 judge_result와 대조(변조·누락·금지표현) → 실패 시 차단/재생성.

## 변경이력
- v0.1 (2026-06-24) — 최초. Judge-Locked 원칙·LLM swappable 불변식·structured input·T7 Presentation Integrity 확장. (오늘은 *설계 고정*만 — 실제 DeepSeek 배선·LLM output 검증은 다음.)
