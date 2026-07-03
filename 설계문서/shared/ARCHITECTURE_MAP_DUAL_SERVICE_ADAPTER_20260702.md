# Architecture Map — Dual Service Adapter (SIASIU + Cosmile → Foundation Contract)

> 작성: foundation-control (control tower) · 2026-07-02
> 기준 상태: Foundation **CONTRACT-01 Phase B = CLOSED** (`98c852b`) · SIASIU **02A = CLOSED** · Cosmile **02B = CLOSED**
> ★이 문서는 지도(map)·정본이 아니다. 계약 정본 = `SIASIU/설계문서/CONTRACT_01_SERVICE_FOUNDATION_SEMANTIC_CONTRACT_20260701.md`,
> 부칙 = `.../ARCHITECTURE_CONSTITUTION_ADDENDUM_SEMANTIC_POLICY_GATE_20260701.md`.
> ★코드 수정 0 · push 0 · live/write/promotion 0 (dev_shadow · api_live=false).

---

## 1. 전체 목적
서비스(SIASIU 상담 / Cosmile commerce)가 **각자 raw 발화를 SSC(구조화 계약)로 만들어 Foundation을 `/v1/consult_contract`로 호출**하고,
Foundation이 판단(safety/policy/evidence/product rail)을 **FRC(계약 응답)**로 돌려주면, 서비스가 **자기 목소리/UX로만** 렌더링한다.

핵심: **판단 코어는 Foundation 하나**. 서비스는 입력 이해(SSC 생성)와 출력 표현(FRC 소비)만 담당한다.
경계가 코드가 아니라 **스키마(SSC/FRC)**로 고정되어 "덕지덕지"·경계 침범 재발을 막는다.

한 줄 원칙: **Foundation은 판단한다 · SIASIU/Cosmile은 소비한다 · foundation-control은 깨지지 않았는지 증명한다.**

---

## 2. 기존 구조 (baseline — 불변 유지)
- **SIASIU = `brain.chat` 중심.** 기존 상담 runtime(`SIASIU/app/brain*`)이 답변을 생성. answer.py fingerprint 불변이 기준선.
- **Cosmile = Mock Brain 중심.** 기존 `/api/slice/consult` → `mockBrain`/`mockFoundationConsultation`(pseudo-FRC)로 동작. 실제 Foundation 미연결(MOCK BRAIN).
- ★두 기존 경로는 이번 작업으로 **수정되지 않았다.** 새 Adapter는 **별도 진입점**(parallel/shadow)이다.

```
[기존]
 SIASIU:  고객 발화 ── /api/chat ──▶ brain.chat ──▶ 상담 답변            (그대로)
 Cosmile: 고객 발화 ── /api/slice/consult ──▶ Mock Brain ──▶ commerce 응답 (그대로)
```

---

## 3. 새 구조 (Foundation Contract Integration Slice)
```
[신규·parallel]
 raw_text
   │  (Service Semantic Adapter — 입력 이해·의미 최종확정 X)
   ▼
 SSC (ssc-1.0)  ──── POST /v1/consult_contract ────▶  Foundation
                                                         │  validate_ssc → (semantic 주입|scaffold) → judge/policy
                                                         │  → 02.7C severity → retrieval/evidence → enforcement → verify
                                                         ▼
                                                        FRC (frc-1.0)
   ┌──────────────────────────────────────────────────────┘
   ▼  (Service Response Adapter — 출력 목소리·UX·suppression)
 서비스 표면 응답 (상담 톤 / commerce 카드·CTA / safety mode)
```
- **SIASIU 진입점**: `adapters/consult_via_foundation.py::consult()` (기존 `/api/chat`과 별개).
- **Cosmile 진입점**: `app/src/app/api/slice/consult-foundation/route.ts` (기존 `/api/slice/consult`와 별개).
- Foundation 실패/timeout → **각 서비스 fallback**(SIASIU standalone brain.chat / Cosmile Mock Brain) + **fail-closed safety wrapper**.

---

## 4. repo별 책임
| | Foundation (foundation-control) | SIASIU | Cosmile |
|---|---|---|---|
| 소유 | 검색·판단·안전·근거·결정·검증·contract | 상담 입력 이해·상담 목소리·상담 세션 | commerce 입력 이해·상품 데이터·commerce 목소리·UX/CTA |
| 계약 | SSC 검증(in) / FRC 생성(out) 소유 | SSC 생성 / FRC 소비 | SSC 생성 / FRC 소비 |
| 코어 | 판단 코어 하나(`core.consult_chat`/`consult_contract` 공유) | Foundation 코어 미복제 | Foundation 코어 미복제 |
| 데이터 | canonical/ingredient/safety metadata | 상담 세션·회피성분(주입) | catalog/price/stock(데이터 제공자) |
| 금지 | service voice/CTA/UI, service data 박기, 최종 고객 copy 작성 | repo 경계 넘는 의존 자작 | product ref 자작, Foundation safety 낮추기 |

---

## 5. Foundation이 하는 일 (`foundation_http_service/`)
- **SSC validation** (`contracts.validate_ssc`): enum/타입 검증 · 이탈 → 보수 default(unknown/none) + errors · **safety fail-closed**(애매/미판단 → 열지 않음).
- **semantic scaffold / transitional meaning** (`semantic_router.route_shadow`): SSC가 semantic 필드를 안 주면 Foundation의 **transitional scaffold**가 raw_text로 의미를 보완(DeepSeek·02.7C). ★장기 소유는 Service Semantic Adapter.
- **safety / policy / evidence / product rail**:
  - safety = **AI semantic + deterministic policy gate + Foundation safety gate**(raise-only·fail-closed).
  - 02.7C adverse severity: mild/breakout → caution · visible/red_flag → block · basis 4종(정직 기록).
  - product rail: 후보(refs)는 SSC `product_context.catalog_candidates` **안에서만**. Foundation은 제품/제품명 **생성 0**.
- **FRC 생성** (`contracts.build_frc`) + **불변식 assert** (`contracts.assert_frc_invariants`): safety_first → products_allowed=false·gate≠pass · basis 위장 금지 · substance에 service persona/CTA 토큰 금지.
- **consult_contract 어댑터**: `validate_ssc → ssc_to_semantic_override(fail-closed 승격·provenance) → consult_chat(공유 코어) → build_frc → assert`. 서비스가 안전신호(red_flag/severe/visible/adverse/discomfort/symptom/issue=safety|adverse/invalid enum)를 주면 **adverse로 승격**해 코어 escalation 발화(서비스가 safety 못 낮춤).
- HTTP: `POST /v1/consult_contract`(정본) · `GET /health` · `POST /v1/consult/chat`(raw·`semantic_override` strip) · `POST /v1/consult/judge`(judge-only·계약 아님). **api_live=false · dev_shadow · write 0**.

---

## 6. SIASIU가 하는 일 (`SIASIU/app/adapters/`)
- **SSC 생성** (`siasiu_semantic_adapter.build_ssc` / `dual_helpers.create_base_ssc`): `service_id="siasiu"`, `channel="chat"`, `raw_text`, `service_mode_requested`, `service_context`, `session_context`. ★semantic_* 미포함 → Foundation scaffold가 보완(현재). rich semantic은 후속(SIASIU-SEMANTIC-CONTRACT-01).
- **FRC 소비** (`siasiu_response_adapter.render` + `dual_helpers.enforce_response_suppression`): `final_strategy/safety_gate_result/decision_type/products_allowed/recommendation_allowed/product_candidates`를 **소비만**. safety_first/block → safety mode. 운영자 commerce 요청보다 **Foundation safety 우선**.
- **상담 톤 렌더링**: `answer_substance`(판단 substance)를 따뜻한 상담사 톤으로 감싸기만(판단 전복 0).
- **brain.chat fallback / baseline 유지**: Foundation 실패 → `_fallback`. `safety_suspect`이면 standalone도 safety mode(제품/CTA/추천/계속사용 허가 0). benign이면 기존 `brain.chat` **lazy import·무수정**. 기존 `/api/chat`·fingerprint 불변.

---

## 7. Cosmile이 하는 일 (`Cosmile/app/src/adapters/`)
- **SSC 생성** (`cosmileSemanticAdapter.createBaseSsc`): `service_id="cosmile"`, `channel="commerce_chat"`, `raw_text`(PII 마스킹), `service_mode_requested`, `service_context`(surface/audience/session/commerce).
- **`product_context.catalog_candidates` 구성**: catalog 검색 결과를 **top-level `product_context.catalog_candidates`(refs만)**에 배치 — ★Foundation이 읽는 정본 위치(패치 완료).
- **FRC 소비** (`cosmileResponseAdapter.decideResponseMode`/`enforceResponseSuppression`): `final_strategy/products_allowed/recommendation_allowed/product_candidates` **직접 소비**(judge decision_type/gate 재파생 금지).
- **product cards / CTA / recommendation suppression**: `products_allowed=false` → refs/cards/CTA 0 · `recommendation_allowed=false` → 추천 0 · safety_first/block → safety mode. `productRefs ⊆ FRC.product_candidates`(자작 0).
- **service safety backstop**(`serviceSafetyDetector`): 명백 증상어(붓/발진/…) 단독 + 모호 감각어(따가/화끈) × continue 문맥 → **escalate만**(raise-only·헌법 허용 백스톱). 정본 경로 살아있으면 Foundation 02.7C가 처리.
- **Mock Brain fallback / baseline 유지**: Foundation 실패 → Mock Brain pseudo-FRC + safety wrapper(같은 suppression 통과). 기존 `/api/slice/consult`·Mock Brain **불변**.

---

## 8. SSC 필드 설명 (Service → Foundation · `ssc-1.0`)
| 필드 | 의미 | 소유 |
|---|---|---|
| `contract_version` | `"ssc-1.0"` | 계약 |
| `service_id` | `siasiu` \| `cosmile` | 서비스 |
| `locale` / `channel` | 언어 / 채널(`chat`·`commerce_chat`…) | 서비스 |
| `raw_text` | 원문(optional·PII 마스킹). Foundation은 **의미 최종판단엔 안 씀**(lexical floor/retrieval·scaffold 보완용) | 서비스 |
| `service_mode_requested` | `consult`\|`commerce`\|`auto`(운영 힌트·safety를 못 이김) | 서비스 |
| `semantic_issue_type` | product_recommendation\|skin_concern\|suitability\|adverse_reaction\|comparison\|education\|greeting\|safety\|unknown | 서비스 AI(현재 scaffold 보완) |
| `semantic_consumer_discomfort` / `semantic_adverse_reaction` | 불편/이상반응 인식(bool) | 서비스 AI |
| `semantic_continue_use_question` / `semantic_use_permission_request` | 계속 사용/사용 허가 질문(bool) | 서비스 AI |
| `symptom_or_discomfort` | stinging\|burning\|itching\|dryness_worsening\|breakout\|small_bumps\|redness\|swelling\|rash\|hives\|heat\|pain\|unknown | 서비스 AI |
| `semantic_adverse_severity` | mild\|moderate\|visible_reaction\|severe_or_red_flag\|unknown | 서비스 AI |
| `semantic_visible_reaction` / `semantic_red_flag` | 가시 염증 / red flag(bool) | 서비스 AI |
| `semantic_safety_confidence` | 0~1(관측·판단 신호) | 서비스 AI |
| `recommendation_preference` | explicit_recommendation\|explicit_no_recommendation\|unspecified | 서비스 |
| `user_constraints` | `{no_recommendation, explanation_only}` | 서비스 |
| `known_allergies` / `avoid_ingredients` | 회피 성분(주입) | 서비스 |
| `product_context.catalog_candidates` | 후보 제품 **refs만**(Foundation은 이 안에서만 추천) | 서비스(데이터 제공) |
| `session_context.safety_facts` | `{avoid_ingredient, allergy, pregnancy_nursing}` | 서비스 |

★안전 관련 필드는 **올릴 수만**(raise-only). 서비스가 낮춰도 Foundation guard/lexical floor가 fail-closed로 재상향.

---

## 9. FRC 필드 설명 (Foundation → Service · `frc-1.0`)
| 필드 | 의미 |
|---|---|
| `contract_version` | `"frc-1.0"` |
| `final_strategy` | safety_first\|recommend_with_caution\|answer_then_clarify\|clarify_first\|refuse\|answer_only |
| `decision_type` | recommend\|do_not_recommend\|do_not_buy\|hold\|ask_more\|cannot_determine |
| `safety_gate_result` | pass\|caution\|block (safety_first면 pass 금지) |
| `final_severity_class` | mild\|breakout\|visible\|red_flag\|null (02.7C) |
| `severity_class_basis` | semantic_policy_gate\|semantic_policy_gate_plus_lexical_floor\|lexical_floor_backstop\|uncertainty_backstop\|null (★위장 금지) |
| `policy_rule_applied` | adverse_continue_safety_first\|general_suitability_no_reco\|contract_fail_closed_floor\|… |
| `products_allowed` | Foundation 소유(서비스 재파생 금지) |
| `recommendation_allowed` | Foundation 소유(서비스 재파생 금지) |
| `product_candidates` | **refs만**(Foundation 제품 생성 0·억제 시 []) |
| `suppression_reason` / `forbidden_expressions` | 억제 사유 / 금지표현(continue_use_permission·efficacy_overclaim…) |
| `answer_substance` | 판단 substance(★service persona/CTA/commerce phrase 미포함·locale 자연어 설명 허용) |
| `evidence` / `repair_or_verify_result` | 근거 refs / verify·repair 결과 |
| `trace` | semantic_* · final_safety_basis · avoid_atoms · routing_source · raw_pii_included=false (+ contract path: ssc_valid/ssc_errors/semantic_source/semantic_provenance/contract_safety_signal/contract_fail_closed_floor) |

---

## 10. CLOSED 증거 (live · `source=foundation_http` · `mock_fallback=false`)
> 검증 방식: Foundation dev_shadow(`98c852b`) 재기동 → SIASIU 어댑터 직접 재현 + Cosmile 실제 `/api/slice/consult-foundation` 라우트 E2E.

**SIASIU 02A** — 정본 `/v1/consult_contract`·실제 SSC/FRC·fail-closed. 필수 케이스(붓/발진/레티놀알레르기/따가/…) → `mode=safety · products=False · CTA=False · recommendation=False · source=foundation_contract`. brain.chat 기존 경로 무수정. (한계: test `is_reachable(5s)` timeout — §12.)

**Cosmile 02B** — 정본 `/v1/consult_contract`·ssc-1.0·정본 FRC 직접 소비. 2건 패치(catalog top-level 배치·timeout 60s) 후 실제 :3000 라우트 live 검증:

| safety 5케이스 | source | final_strategy | gate | mode | cards/CTA/reco/refs |
|---|---|---|---|---|---|
| 따가운데 계속 써도 돼? | foundation_http | safety_first | caution(02.7C) | safety | 0/0/0/0 |
| 화끈거리는데 추천해줘 | foundation_http | safety_first | block | safety | 0/0/0/0 |
| 붓는데 계속 발라도 돼? | foundation_http | safety_first | block | safety | 0/0/0/0 |
| 발진났는데 이 제품 추천해줘 | foundation_http | safety_first | block | safety | 0/0/0/0 |
| 레티놀 알레르기 있는데 추천해줘 | foundation_http | safety_first | block | safety | 0/0/0/0 |

| commerce | source | products_allowed | recommendation_allowed | product_candidates | surface refs |
|---|---|---|---|---|---|
| 민감피부 세럼 추천 | foundation_http | true | true | [fprod_elt02, fprod_elt04, fprod_elt08] | 동일 3개(refs⊆FRC) |

- **source=foundation_http** 전건 · **mock_fallback=false** 전건 · timeout 0.
- 기존 Mock Brain(`/api/slice/consult`) 정상 유지 · 기존 파일 수정 0.

---

## 11. 금지사항 (계약 불변식)
- ❌ **`/v1/consult/judge`를 contract path로 사용** — judge는 계약(SSC/FRC·fail-closed·02.7C) 아님. 정본은 `/v1/consult_contract`.
- ❌ **Foundation safety 낮추기** — 서비스/adapter는 raise-only(escalate만). safety = MAX(service semantic, Foundation guard, product/ingredient policy).
- ❌ **`products_allowed=false`인데 상품 노출**(카드/CTA/refs).
- ❌ **`recommendation_allowed=false`인데 추천**(문구/카드/CTA).
- ❌ **Foundation에 service voice/CTA/UI 정책 삽입** — Foundation은 answer_substance(판단)만. 목소리/CTA는 서비스.
- ❌ **서비스가 product ref 새로 생성** — refs ⊆ FRC.product_candidates(⊆ SSC.catalog_candidates).
- ❌ raw PII를 trace/계약에 저장 · lexical_floor_backstop을 semantic_policy_gate로 위장.

---

## 12. 현재 한계 (정직)
- **SIASIU/Cosmile rich semantic adapter는 후속.** 현재 두 서비스는 semantic_* 대부분을 **Foundation scaffold에 위임**(SSC는 raw_text+구조 신호 위주). 서비스 자체 의미 판단 = 후속 Phase.
- **Foundation scaffold(`semantic_router`)는 transitional.** raw utterance 의미 인식의 장기 소유는 Service Semantic Adapter. scaffold는 compatibility/transitional fallback.
- **AI provider abstraction 후속.** DeepSeek는 `llm_guard._call` 트랜스포트로 하드코딩(모델 `deepseek-chat`). provider gateway 미도입.
- **production timeout / async UX 후속.** compose 지연(~수십초)으로 client timeout(현재 60s sync)·async/streaming UX 미적용. SIASIU test `is_reachable(5s)`는 compose보다 짧아 Foundation-path skip 가능(어댑터 동작은 별도 검증됨).
- **Cosmile loop100**(`vertical-slice-v0-loop100.mjs`) 존재 — 기존 UX 회귀 smoke(서비스 팀 재확인 몫).
- **live/write/promotion = 0** 유지(dev_shadow·api_live=false). 실사용자·checkout·canonical write 없음.

---

## 13. 다음 블록 후보 (미착수·예고)
- **GLOBAL-AI-RUNTIME-01** — AI Provider Gateway(provider 추상화·timeout/retry/fallback 일원화·async/streaming) — DeepSeek 하드코딩·흩어진 timeout 정리.
- **SIASIU-SEMANTIC-CONTRACT-01** — SIASIU 자체 Semantic AI Adapter가 SSC의 semantic_* 직접 생성(Foundation scaffold 의존 축소).
- **COSMILE-DECISION-ENGINE-01** — Cosmile Decision/Commerce Layer(정본 FRC 기반 상품 판단·MOCK BRAIN 해제 후보·COSMILE-CONNECT).

> ★모든 다음 블록은 **설계서 먼저(설계자료/)→ 승인 → 구현**. live 전환·canonical write·real user exposure는 별도 승인 release train.
