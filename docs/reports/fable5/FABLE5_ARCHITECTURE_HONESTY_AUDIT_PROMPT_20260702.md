# Fable5 — Architecture Honesty Audit Prompt (Dual Service Adapter)

> 대상 리뷰어: **Fable 5** (독립 코드리뷰·아키텍처 정직성 감사)
> 작성: foundation-control · 2026-07-02
> 목적: SIASIU/Cosmile의 Foundation Contract Integration Slice와 Foundation CONTRACT-01 Phase B가
> **실제 코드 레벨에서** 계약/안전/경계를 지키는지, 그리고 **나중에 버릴 임시 구조가 숨어있지 않은지**를 정직하게 감사.

---

## 0. 감사 원칙 (반드시 준수)
- **행동 진실.** 코드에서 확인한 것만 주장하라. 추측이면 추측이라고, 미검증이면 `NEEDS_EVIDENCE`라고 표기하라. "아마 될 것" 금지.
- **read-only.** 코드/스키마/테스트 **수정 금지**. Foundation/SIASIU/Cosmile **수정 0**. **push 0**.
- **정본 대조.** "작동하는가"만 보지 말고 **"최종 아키텍처와 충돌하는가 · 버릴 구조인가 · 계약/안전을 지키는가"**로 판정하라.
- **MVP 변명 금지.** "MVP라 이 정도면 됨"은 판정 근거가 아니다. production-grade slice 기준.
- **서버/프로세스 정리.** 재현을 위해 임시 서버(Foundation :8731, dev :3000 등)를 띄웠다면 **작업 후 반드시 종료**하고 보고하라. 남의 서버는 건드리지 말라. stale server 방지.

## 1. 감사 컨텍스트
- Foundation: `foundation-control` commit **`98c852b`** (CONTRACT-01 Phase B). 서버 = `foundation_http_service/server.py` (dev_shadow · `api_live=false` · port 8731 · `GET /health`).
- 계약 정본: `SIASIU/설계문서/CONTRACT_01_SERVICE_FOUNDATION_SEMANTIC_CONTRACT_20260701.md` · 부칙 `.../ARCHITECTURE_CONSTITUTION_ADDENDUM_SEMANTIC_POLICY_GATE_20260701.md`.
- 구조 지도: `foundation-control/docs/ARCHITECTURE_MAP_DUAL_SERVICE_ADAPTER_20260702.md`.
- 코드 위치:
  - Foundation: `foundation-control/foundation_http_service/{core.py(consult_contract, consult_chat), contracts.py(validate_ssc, ssc_to_semantic_override, build_frc, assert_frc_invariants), server.py, semantic_router.py, llm_guard.py}`
  - SIASIU: `SIASIU/app/adapters/{foundation_client.py, siasiu_semantic_adapter.py, siasiu_response_adapter.py, consult_via_foundation.py, dual_helpers.py}` · test `SIASIU/app/tests/test_dual_adapter_02a.py`
  - Cosmile: `Cosmile/app/src/adapters/{foundationClient.ts, cosmileSemanticAdapter.ts, cosmileResponseAdapter.ts}` · route `Cosmile/app/src/app/api/slice/consult-foundation/route.ts` · eval `Cosmile/app/scripts/dual-adapter-eval.mjs`
- 정본 endpoint: `POST /v1/consult_contract` (SSC in / FRC out). ★`POST /v1/consult/judge` = judge-only(계약 아님·alias 아님). `POST /v1/consult/chat` = raw(semantic_override strip).

## 1.5 이번 감사 범위 (FABLE5-AUDIT-01) — ★반드시 준수
> 이번 1차 감사는 **Foundation 전체 검색/지식/메모리 품질 감사가 아니다.** 아래 **범위 안**만 판정하고, **비범위**는 건드리지 말라(품질 판정 금지·후속 감사로 이관).

**감사 범위 (IN SCOPE):**
1. SIASIU/Cosmile이 고객 입력을 **Foundation contract path로 정직하게 연결**하는가(`/v1/consult_contract` 실사용·judge 잔재 0).
2. `raw_text`/`context`/`product_context`가 **SSC로 올바르게 구성**되는가(필드·enum·catalog 위치).
3. Foundation이 고객 발화를 **safety / consult / commerce / product / education / fallback** 등으로 라우팅하는 **흐름이 테스트되는가**(분류 결과의 *존재/일관성*이지, 분류 정확도의 품질 튜닝이 아님).
4. safety 케이스가 실제로 **safety_first/block**으로 가고 **상품/CTA/추천이 억제**되는가.
5. commerce 케이스에서 **`product_context.catalog_candidates`가 Foundation까지 도달**하고 **FRC `product_candidates`만 surface에 노출**되는가.
6. 기존 **brain.chat / Mock Brain이 메인 판단자로 남아 있지 않은가**(신규 slice가 별도 진입점·기존은 baseline/fallback).
7. **fallback이 fail-closed**인가.
8. **timeout 때문에 live Foundation 대신 fallback만 타는 경로**가 없는가(source=foundation_http vs mock_fallback 구분).
9. **현재 구현된 것 / 아직 안 된 것**을 명확히 구분하는가.
10. 앞으로 **semantic field · routing class · provider · retrieval/memory를 확장할 수 있는 seam**이 있는가(존재/위치이지 품질 아님).

**비범위 (OUT OF SCOPE — 이번엔 판정 금지·후속 FABLE5-AUDIT-02 / Foundation Retrieval·Memory Slice로 이관):**
- Foundation **retrieval 품질** 전체 감사
- **Knowledge base recall** 품질
- **Memory personalization** 품질
- **Product/ingredient evidence ranking** 품질
- **Long-term user memory policy**

★비범위 항목이 눈에 띄면 "품질은 이번 범위 밖(AUDIT-02)"이라고만 표기하고 **판정하지 말라.** 이번 감사의 대상은 **배선(wiring)·계약·안전·경계·seam의 존재**이지, **판단/검색/기억의 품질**이 아니다.

**범위 ↔ §2 질문 매핑:** 1→Q1·Q2 / 2→Q3 / 3→Q(A) / 4→Q4·Q5·Q6 / 5→Q7 / 6→Q8·Q9 / 7→Q10 / 8→Q13·Q14 / 9→Q17 / 10→Q11·Q12·Q(B). (Q(A)·Q(B)는 아래 추가 필수 확인.)

**추가 필수 확인 (범위 3·10 명시화):**
- **Q(A) 라우팅 흐름 커버리지**: safety / consult / commerce / product / education / fallback 각 경로가 **테스트/eval로 한 번씩이라도 실증**되는가(존재·일관성). 특정 클래스(예: education "왜 따가울 수 있어?")가 어느 mode로 가는지 코드/실행 근거로. ★분류 정확도 품질은 판정하지 말 것.
- **Q(B) 확장 seam 존재**: (i) SSC semantic_* 필드를 서비스가 직접 채울 seam, (ii) routing class(FRC `final_strategy`/`decision_type` enum) 확장 seam, (iii) AI provider 교체 seam(Foundation transport), (iv) retrieval/memory 주입 seam — 각 **위치(file:line)**만. 품질/구현 여부 아님.

---

## 2. 필수 검수 질문 (17) — 각 항목: 답 + 근거(file:line) + PASS/FAIL/RISK
> 각 질문에 대해 **실제 코드 인용**으로 답하라. 필요하면 실행으로 반례를 만들어라(단 서버 정리 원칙 준수).
> ★이번 감사 범위(§1.5) 안에서만 판정. 비범위(retrieval/KB/memory/evidence-ranking 품질)는 "AUDIT-02 이관"으로만 표기.

1. **실제 코드가 `/v1/consult_contract`를 쓰는가?** — SIASIU `foundation_client.py`, Cosmile `foundationClient.ts`의 호출 URL을 인용. (기대: 둘 다 `/v1/consult_contract`.)
2. **`/v1/consult/judge` 사용 경로가 남아 있는가?** — 두 repo 어댑터/라우트/eval 전체 grep. judge 호출·판단 소비가 남아있으면 FAIL. (기대: 0건.)
3. **SSC/FRC contract가 실제 코드와 일치하는가?** — 서비스가 만드는 SSC 필드 vs `contracts.validate_ssc` 기대(enum·`product_context.catalog_candidates` 위치) / 서비스가 읽는 FRC 필드 vs `contracts.build_frc` 출력. 불일치(예: catalog를 service_context에 두는 등) 지적. 서비스 `Frc` 타입이 judge 출력을 FRC로 위장하지 않는지.
4. **SIASIU/Cosmile이 Foundation safety를 낮추는가?** — response adapter의 safety/products/recommendation 계산이 **raise-only**인지(escalate만). `productsAllowed = FRC.products_allowed && !suspect` 같은 "낮추기만" 패턴 확인. Foundation 값보다 관대해지는 경로가 있으면 FAIL.
5. **`products_allowed=false` suppression이 *모든* surface에서 지켜지는가?** — cards·CTA·refs·purchase push 전부 0인지. surface 응답 조립부(`enforce_response_suppression`/`enforceResponseSuppression`)에서 refs가 실제로 비워지는지. 우회 경로(fallback·mode 분기)까지.
6. **`recommendation_allowed=false` suppression이 지켜지는가?** — 추천 문구/카드/CTA가 모두 억제되는지. `showRecommendation` 계산 경로.
7. **`product_candidates` refs만 사용하는가?** — 서비스가 표시하는 productRefs ⊆ FRC.product_candidates ⊆ SSC.catalog_candidates 인지. 서비스가 제품/제품명을 **새로 생성**하는 코드가 없는지(Foundation은 refs만 준다).
8. **기존 `brain.chat` / Mock Brain이 메인 경로로 남아 있는가?** — SIASIU `/api/chat`·`brain.chat`, Cosmile `/api/slice/consult`·Mock Brain이 신규 slice에 의해 대체/오염되지 않았는지. 신규 어댑터는 별도 진입점인지.
9. **기존 API path가 오염되었는가?** — 기존 파일이 신규 어댑터/라우트를 import하는지 grep. 기존 라우트 시그니처/응답 변경 여부.
10. **fallback이 fail-closed인가?** — Foundation 실패/timeout 시: SIASIU `_fallback`(`safety_suspect`→safety mode·제품/CTA/추천 0), Cosmile route fallback(Mock Brain + safetySuspect escalate). safety 의심인데 상품이 새는 경로가 있으면 FAIL.
11. **DeepSeek/provider 하드코딩이 있는가?** — Foundation `llm_guard`/`semantic_router`/`deepseek_composer`의 provider·모델·endpoint·key 경로. 서비스 어댑터에 LLM provider 하드코딩이 없는지(서비스는 provider 몰라야 함).
12. **AI Provider Gateway가 필요한 위치는 어디인가?** — provider 추상화가 있어야 할 지점(Foundation 내부 transport)과, 현재 하드코딩된 지점을 구체 file:line으로. GLOBAL-AI-RUNTIME-01의 실제 표적.
13. **timeout/retry/fallback이 흩어져 있는가?** — Foundation compose 지연 대비 timeout 값이 어디에 흩어져 있는지(Cosmile `FOUNDATION_HTTP_TIMEOUT_MS`, SIASIU `SIASIU_FOUNDATION_TIMEOUT`, test `is_reachable` timeout, retry 카운트). 일관성/중복 지적.
14. **test가 live Foundation을 타는가?** — SIASIU `test_dual_adapter_02a.py`·Cosmile `dual-adapter-eval.mjs`가 실제 서버(:8731/:3000)에 의존하는지, reachability 판정(`is_reachable(5s)`)이 compose 지연과 맞는지(짧으면 Foundation-path skip → 증거값 약화). live 미가동 시 무엇이 skip/fallback 되는지.
15. **stale server / process 위험이 있는가?** — 장수 dev 서버가 옛 코드로 남아 404를 유발할 위험(실제로 1d+ stale :8731 사례 있었음). 서버 버전 확인 수단(`/health` version)·정리 절차가 있는지.
16. **이 구조가 최종 아키텍처와 충돌하는가?** — Service Adapter → SSC → Foundation contract → FRC → Response Adapter 모델이 장기(GLOBAL-AI-RUNTIME/SEMANTIC-CONTRACT/DECISION-ENGINE)와 정합인지. 판단 코어 단일·경계 스키마 고정이 유지되는지.
17. **나중에 버릴 임시 구조가 숨어 있는가?** — transitional scaffold 의존, thin semantic adapter, pseudo-FRC(Mock), 재파생 잔재, judge 기반 v0 잔재 등 **재작성이 예정된 부분**을 명시. 어떤 것이 "의도된 transitional"이고 어떤 것이 "숨은 기술부채"인지 구분.

## 3. 실행/재현 가이드 (선택·서버 정리 필수)
- Foundation 서버는 **반드시 현재 코드(`98c852b`)**로. 버전 확인: `curl -s http://127.0.0.1:8731/health`(version 필드). 옛 버전이면 stale — 정지 후 현재 코드로 재기동, 감사 후 종료.
- live FRC E2E는 compose 지연이 수십 초일 수 있으니 client timeout을 충분히(≥45s) 두고 확인. `source`가 `foundation_http`(live)인지 `mock_fallback`(fallback)인지 반드시 구분.
- 재현에 쓴 임시 서버/포트/프로세스를 **표로 보고**하고 **전부 종료**하라(남의 :3000 등은 미접촉).

## 4. 출력 형식 (Fable5가 제출)
0. **범위 준수 선언**: 이번 감사가 §1.5 IN SCOPE만 판정했고, 비범위(retrieval/KB/memory/evidence-ranking 품질)는 판정하지 않고 **AUDIT-02로 이관**했음을 명시. 감사 중 마주친 비범위 관찰은 "이관" 목록으로만 나열(판정 X).
1. **질문별 판정표(Q1–Q17 + Q(A)·Q(B))**: 질문 · 답(코드 인용 file:line) · PASS/FAIL/RISK · 근거.
2. **계약 준수 요약**: endpoint / SSC / FRC / suppression / fail-closed — 준수 여부.
3. **최종 아키텍처 정합 판정**: 충돌 여부 · 숨은 임시구조(버릴 것) 목록 · 의도된 transitional과 구분.
4. **PATCH_REQUIRED / TRACKING 목록**: 심각도(CRITICAL/HIGH/MED/LOW) + 구체 수정 방향(코드 수정은 하지 말고 지시만).
5. **AI Provider Gateway / timeout 일원화 표적**: 구체 file:line.
6. **서버/프로세스**: 띄운 목록·포트·종료 여부·남긴 이유·stale 방지 확인.
7. **감사 무결성**: 코드 수정 0 · push 0 확인.

## 5. 판정 라벨
- **CLOSED** — 계약/안전/경계 준수 · 최종 아키텍처 정합 · 숨은 버릴 구조 없음(의도된 transitional은 §12 한계에 명시된 것만).
- **PATCH_REQUIRED** — 계약/안전/경계 위반 또는 숨은 기술부채. 구체 항목 나열.
- **FAIL** — safety leak(products/recommendation 노출·safety 낮춤) 또는 정본 계약 미사용.

> ★확실하지 않으면 CLOSED로 넘기지 말고 `NEEDS_EVIDENCE`/`UNKNOWN`으로 표기하라. 안전·계약은 fail-closed로 판단하라.
