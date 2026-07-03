# SIASIU / Cosmile Runtime Brain Audit — 실제 런타임 경로 (2026-06-30)

> 작성: 샤슈(SIASIU) · ★read-only runtime audit (소스 존재가 아니라 *실제 호출 경로* 확인) · 코드 수정 0
> 질문: 현재 상담 화면이 실제 런타임에서 AI 의미판단 brain을 타는가?

---

## 1. SIASIU 상담 실제 경로 (추적)
```
pages/consult.html:347  apiChat(msg) → fetch POST /api/chat
   → app/server.py:118   do_POST("/api/chat")
   → app/server.py:120   brain.chat(user_id, message, ...)      ← ★real brain endpoint (mock 아님)
```
- 상담 UI = `/home/leo/Project/SIASIU/app/pages/consult.html` → `/api/chat` = **real `brain.chat` 직결**.
- DeepSeek 키 존재: `/home/leo/Project/SIASIU/.secrets/deepseek_key` (31b) → **real AI**(stub 아님·`has_key()=True`).
- ★consult.html 주석: *"라이브(Pages)엔 백엔드 없어 우아하게 폴백"* → **로컬 `server.py` 구동 시 = real brain / 정적 배포(GitHub Pages) = 백엔드 없음 → 우아한 폴백**.

## 2. SIASIU 상담 = AI-primary brain (로컬 server 구동 시)
- `brain.chat` 오케스트레이션: `guardrail_classify`(LLM 의미) → [on-domain] `kb_search`(ssbrain KB) → `_route_query`(LLM) → `_llm`(compose) → `verify_output`(LLM) → repair.
- ★**keyword intent classifier 부재**: `brain.py`에 `_classify_intent`/`_kw_risk` 같은 키워드 의도 분류기 *없음*(Foundation core.py와 대조).
- `guardrail_classify` 주석: *"★휴리스틱 ❌ — LLM이 의미로 분류"*. `_route_query` 주석: *"LLM 의미판단(정규식 휴리스틱 대신)"*.

### 6 입력 실제 라우팅 (read-only 실행 · write 0 · has_key=True)
| 입력 | endpoint | brain 함수 | guardrail_classify(LLM) | _route_query(LLM) | kb_search | LLM compose | verify/repair | keyword분류기 |
|---|---|---|---|---|---|---|---|---|
| hello | /api/chat | brain.chat | domain=off | chat | ✗(off-domain 유도) | ✓ | ✓ | 없음 |
| 피부가 자꾸 뒤집어지는데 | /api/chat | brain.chat | domain=on | kb | ✓ | ✓ | ✓ | 없음 |
| 이거 계속 써도 되나 | /api/chat | brain.chat | domain=on | chat | (route=chat) | ✓ | ✓ | 없음 |
| 민감피부 진정 세럼 추천 | /api/chat | brain.chat | domain=on | kb | ✓ | ✓ | ✓ | 없음 |
| 레티놀 추천하지 않는 이유 | /api/chat | brain.chat | domain=on | kb | ✓ | ✓ | ✓ | 없음 |
| 추천은 말고 왜 따가운지만 | /api/chat | brain.chat | domain=on | kb | ✓ | ✓ | ✓ | 없음 |

→ **모든 입력이 LLM(guardrail_classify + _route_query)로 의미판단**됨. keyword-first/template 아님.
→ Foundation shadow(`foundation_brain_answer_adapter`·`run_shadow`)는 `server.py`/`brain.py`가 **호출 안 함**(독립·`brain_runtime_shadow_enabled=False`).

## 3. "SHADOW · mock purchase · no real write" 배지 = Cosmile 출처
- **SIASIU 상담 HTML/JS엔 이 배지 없음**(grep 결과 CSS `box-shadow`·"데모"만).
- 정확한 출처:
  - `/home/leo/Project/Cosmile/app/src/components/slice/ShadowBanner.tsx:15` → `"SHADOW · mock purchase · no real write"`
  - 같은 파일 line 8 → `"mock purchase · no real write · MOCK BRAIN · env=..."`
  - `/home/leo/Project/Cosmile/app/src/components/slice/SliceCartView.tsx:69,121` → `"mock purchase · no real write"`
- 의미:
  - `mock purchase · no real write` = **결제/쓰기가 mock**(실제 체크아웃·DB write 0).
  - **`MOCK BRAIN`** = **Cosmile 상담 brain이 아직 mock**(real AI-primary brain에 *연결 안 됨*).

## 4. 결론
| 대상 | 런타임 상태 |
|---|---|
| **SIASIU 상담** (consult.html→/api/chat→brain.chat, 로컬 server) | ✅ **real AI-primary brain** (LLM 의미 라우팅·키워드 분류기 없음·DeepSeek 실연결) |
| **Cosmile 상담 UI** (SHADOW 배지 화면·React) | ⚠️ **MOCK BRAIN** (real brain 미연결·mock purchase) |

- 지금 "SHADOW · mock purchase" 배지가 보이는 화면 = **Cosmile**(MOCK BRAIN, real AI 아님).
- SIASIU 상담을 **로컬 `server.py`로 띄우면** = real AI-primary `brain.chat`.

## 5. 앞으로 필요한 연결
```
현재: Cosmile UI → MOCK BRAIN (mock)
목표: Cosmile UI → Foundation real brain (= 지금까지 이식해온 검색/reasoning/safety/routing 회로)
```
- 우리가 SIASIU Path A에서 Foundation으로 lift해온 모든 회로(ssbrain 검색·02A/02B reasoning·MAND-07 avoid·01A~02 routing)의 **최종 목적지 = Cosmile mock brain → Foundation real brain 연결**.
- 이게 아직 안 붙어 있음 → 다음 큰 결정 지점.

---

## 한계 / 주의
- 이 문서는 read-only audit 기록 — 구현 지시 아님.
- "로컬 server.py 구동 시 real"은 코드 경로 기준. 실제 서비스가 어느 배포(로컬 vs Pages)를 보는지는 Leo가 확인 필요.
- 코드 수정 0 · commit 0 · push 0 · SIASIU/Cosmile/Foundation 무수정.
