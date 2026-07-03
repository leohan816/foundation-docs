# SIASIU LLM 라우팅 · 모델 전략 설계서 (정본)

> **버전 v0.1 · 2026-06-22 · 구현 시작**
> "작업마다 적정 모델로 — 쉬운 건 싸게, 중요한 건 좋게." 비용 절감 + 속도 향상의 핵심 설계.
> 지금은 **테스트라 전부 DeepSeek**, 단 *나중에 싼 모델·로컬 OSS로 전환*이 매핑 한 줄로 되게 미리 깔았다.
> 정합: [브레인/메모리 설계서], [가드레일 설계서], [커머스 설계서], `CLAUDE.md`. 위치: `brain.py` `_llm`/`_deepseek`.
>
> **변경이력**
> - **v0.1 (2026-06-22)** — 최초. `_llm` 라우터(task→tier→provider/model) + 사용량 로깅(`llm_usage.jsonl`) 구현. 호출 6지점 라우팅. (Leo: 미래 비용/속도의 핵심 디자인.)

---

## 0. 한 줄
모든 외부 LLM 호출은 **단일 관문 `_llm(task, …)`** 을 통과한다. task로 *적정 모델 티어*에 라우팅하고, *모든 사용량(토큰)을 로깅*한다. 모델/제공사 전환 = **매핑 한 줄**, 코드 재작성 0.

## 1. ★ 우리 시스템의 모든 LLM 호출 (모듈별)
| 호출(task) | 언제 | 입력(실측 예) | 출력 | 작업 성격 | 티어 |
|---|---|---|---|---|---|
| `classify` (가드레일) | 메시지마다 | ~400 | ~10 | 분류 (쉬움) | 🟢 cheap |
| `chat` (상담 답변) | 통과 메시지마다 | ~860↑(대화 길수록↑) | ~310 | 상담 (★중요·품질) | 🔴 premium |
| `extract` (기억 추출) | 메시지마다 | ~250 | ~140 | 구조 추출 (쉬움) | 🟢 cheap |
| `checkin` (풀 생성) | 버킷당 1회(캐시) | ~400 | ~1,500 | 생성 (중간) | 🟡 mid |
| `pitch` (음성 피치) | 제품×상황 1회(캐시) | ~800 | ~400 | 생성 (중요) | 🟡 premium |
| `recall` | — | 0 | 0 | LLM 안 씀 (템플릿+DB) | — |

*실측(2026-06-22, 첫 메시지): 한 메시지 = classify+chat+extract = 3콜, 합계 입 ~1,508 · 출 ~465 토큰 ≈ 0.1센트. 대화가 길어지면 `chat` 입력이 커진다.*

## 2. 아키텍처 — task → tier → provider/model
```
_llm(task, messages)               # 단일 관문 (모든 호출이 통과)
  └ LLM_TASK_TIER[task]   → tier   # 작업을 티어로 (cheap/mid/premium)
  └ LLM_TIER_MODEL[tier]  → (provider, model)   # ★ 전환 지점 — 여기만 바꾸면 전체 전환
  └ provider 분기: deepseek(지금) / local OSS(나중) / 기타
  └ 사용량 로깅(llm_usage.jsonl): task·tier·provider·model·in·out
```
- **전환은 `LLM_TIER_MODEL` 한 군데.** 예: `"cheap": ("local","qwen-7b")` 로 바꾸면 분류·추출이 전부 로컬 OSS로.
- **제공사 추상화:** `_deepseek`은 *DeepSeek 제공사 구현*일 뿐. 나중에 `_local_llm`(Ollama/vLLM) 추가 → `_llm`에서 provider로 분기. (호출부는 그대로.)

## 3. 어떻게 체크하나 (모니터링)
- 모든 호출이 `data/llm_usage.jsonl`에 **실제 입출력 토큰**(API usage)으로 기록됨.
- 집계 스크립트(예정 `tools/usage_report.py`): task별/일별/사용자별 **콜 수·토큰·추정 비용** 산출. → "한 사람당 평균 몇 콜·얼마" 실측.
- 비용 추정 = 토큰 × (티어별 단가표). 단가표는 제공사/모델별 관리.

## 4. 어떻게 스위칭하나 (계획)
- **단계 1 (지금):** 전부 DeepSeek. 단 라우터·로깅·티어 구조는 *완비*. (전환 준비 완료)
- **단계 2 (공개 후):** `cheap`(분류·추출)을 *더 싼 모델*로 / `premium`(상담)은 좋은 모델 유지 → 비용 ~30–40%↓ 추정.
- **단계 3 (복잡도 라우팅):** `chat`도 *짧고 단순한 발화*면 cheap, *안전·추천·복잡*이면 premium. (간단 판단도 LLM/규칙 아닌 구조로 — 휴리스틱 ❌ 원칙 유지.)
- **단계 4 (Phase 8 셀프호스팅):** 고볼륨 `cheap` 작업부터 **로컬 OSS**(자체 GPU)로 → 토큰비 ≈ 전기값. `provider="local"` 분기만 추가.

## 5. 원칙 정합
- **휴리스틱 금지(`[[foundation-no-heuristics]]`):** 라우팅 *판단*이 키워드 추측이면 안 됨 — task는 *호출 지점에서 명시적으로* 태깅(결정론). 복잡도 라우팅도 모델 판단/구조로.
- **정확도 > 속도:** 중요한 상담(chat)은 *비용보다 품질* 우선 — 싸다고 함부로 내리지 않음.
- **캐시 우선:** checkin·pitch는 *캐시*로 호출 자체를 줄임(라우팅 이전에).

## 6. 구현 현황
- ✅ `_llm` 라우터 + `LLM_TASK_TIER`/`LLM_TIER_MODEL` + 사용량 로깅 (`brain.py`, 2026-06-22)
- ✅ 6개 호출지점 라우팅 (classify·extract=cheap, checkin=mid, chat·pitch=premium)
- ☐ `tools/usage_report.py` 집계기
- ☐ 제공사 `local`(OSS) 분기 + 단가표
- ☐ 복잡도 기반 `chat` 라우팅
