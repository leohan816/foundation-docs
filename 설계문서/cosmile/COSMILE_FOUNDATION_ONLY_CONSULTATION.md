# Cosmile runtime consultation is Foundation-only; mock fallback removed

> **정책 정본 (Leo 2026-07-02).** Cosmile runtime 상담/추천은 **Foundation HTTP only.**
> runtime 경로에서 mock / legacy / mock_fallback 이 끼어드는 경로 = **0**.
> 커밋: `fix(foundation): enforce Foundation-only consultation path`.

## 무엇이 바뀌었나
| 지점 | 이전 | 지금 |
|---|---|---|
| `consultationProvider()` (`lib/slice/flags.ts`) | 기본 `legacy` (opt-in만 foundation) | **기본 `foundation_contract`** (non-prod) |
| `bridgeMode()` (`lib/foundationBridge.ts`) | 기본 `mock` | **기본 `http`** (unknown/미설정 → http) |
| Route A `/api/slice/consult-foundation` 실패 | `source:"mock_fallback"` **HTTP 200**(조용) | **HTTP 502 `error:"foundation_unavailable"`, `source:"foundation_error"`** |
| Route B `foundationConsultationClient` | `mode==="mock"` → fixture 서빙 | mock 브랜치 **제거** → http 아니면 **fail-closed**(가짜 추천 0) |
| 상담 실패 UI | 일반 문구 | **친절한 연결실패 메시지** |

## 실패 정책 (Foundation OFF / 연결 실패)
- mock 대체 **금지** · 가짜 추천 생성 **금지** · 앱 crash **금지**.
- API: Route A = `502 { error:"foundation_unavailable", source:"foundation_error", reason, http_status }` (technical code는 payload/log만).
- UI 표시 문구(사용자):
  > 죄송해요. 지금 피부 상담 연결이 잠시 불안정해요.
  > 정확한 추천을 위해 임시 답변은 제공하지 않을게요.
  > 잠시 후 다시 시도해 주세요.
- 셸 `consult()` catch(Route A 502 throw) + `foundationConsultationClient.failClosedUnavailable`(Route B) 모두 이 문구.

## foundation_source / 이벤트
- 성공 = `foundation_http` · 실패 = `foundation_error`(payload). **runtime `mock_fallback` 생성 0**, 실패 시 `foundation_decision_received` 이벤트 미발행.
- 이벤트 타입 union의 `"mock_fallback"` 값은 **유지**(DB 과거 row·analytics 호환) — 신규 생성만 0. analytics(`analytics:cosmile`)는 mock_fallback count를 계속 계산 가능(기본 경로 0).

## test fixture
`mockConsultationFixture`(파일 `scripts/fixtures/mockFoundationConsultation.ts`)만 **test/eval 전용 fixture로 유지**(유일 사용처 = `scripts/foundation-consultation-dev-eval.mjs`). `mockBrain.ts`(mockBrainInterpret)·`mockFoundationBridge.ts`는 **삭제됨**. runtime 상담/추천 경로에서는 mock 호출 **0**(접근 불가).

## 운영 주의 (Foundation 서버 필수)
- Cosmile 상담은 이제 Foundation HTTP 서버에 의존한다. dev/데모 시 서버 기동 필요:
  ```bash
  cd /home/leo/Project/foundation-control && python3 -m foundation_http_service.server   # 127.0.0.1:8731
  ```
- `FOUNDATION_API_URL`(기본 `http://127.0.0.1:8731`) · `FOUNDATION_BRIDGE_MODE`(미설정 시 http).

## COSMILE-MOCK-RETIREMENT (2026-07-02 후속)
runtime mock 잔재 제거·격리:
- **삭제**: `src/lib/foundation/mockBrain.ts`(importer 0) · `src/lib/foundation/mockFoundationBridge.ts`(evidence facade mock bridge).
- **격리(이동)**: `mockFoundationConsultation.ts` → `scripts/fixtures/mockFoundationConsultation.ts` (EVAL/TEST 전용, src runtime importer 0 · 유일 사용처 = `scripts/foundation-consultation-dev-eval.mjs`).
- **evidence facade**(`foundationBridge.ts`): mock bridge 제거 → `bridgeMode` 비-http(mock/disabled)면 evidence를 mock으로 서빙하지 않고 **unavailable/disabled** 처리(guarded·커머스 비차단).
- **label**: 상담 응답의 `isMockFixture:true`(fail-closed 오표기) → **`foundationUnavailable:true`**(연결 실패 표식). runtime `isMockFixture`는 항상 false. UI 배지 "mock fixture" → "연결 실패".
- **legacy `/api/slice/consult`**: 삭제하지 않음 — **debug scenario 전용 잔존**(header에 DEBUG-ONLY 명시). 기본 상담은 `/api/slice/consult-foundation`. 완전 은퇴는 별도 retirement plan.
- test fixture는 **runtime에 재연결 금지**(scripts/fixtures + eval 전용).

## known limitation / 경계
- mock 안전망 제거로 **Foundation 서버 다운 시 상담 실패**(친절 메시지 표시) — cross-project 결합 증가.
- Foundation FRC 품질은 서버의 DeepSeek/retrieval 설정에 의존.
- ★provider/bridge 기본값 전환은 통상 foundation-control 관할이나, **Leo 지시로 이번 Cosmile-local 처리**. app-wide 상담 연동의 추가 변경은 foundation-control release train 경유 권장.
