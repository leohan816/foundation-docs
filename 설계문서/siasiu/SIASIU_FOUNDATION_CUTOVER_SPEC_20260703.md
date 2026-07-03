# SIASIU → Foundation-first Cutover — 설계서 (DESIGN ONLY) · 2026-07-03

> 작성: 샤슈(SIASIU) · ★설계 전용 — 구현/코드 수정 0 · git/migration 0 · Foundation contract 변경 0
> ★명칭: **SIASIU / 샤슈** (정본) — `Shashu` 표기 금지.
> 근거: `SIASIU-FOUNDATION-CUTOVER-AUDIT`(2026-07-03·brain.chat 전체 매핑) · CONTRACT-01 Phase A/B(`98c852b`) · FRC-TRACE-ID(`7cf53e8`) · DUAL-SERVICE-ADAPTER-02A(SIASIU `1142198`).
> 전제: 현재 `/api/chat` live = standalone `brain.chat`(Foundation 미경유) · Foundation adapter = parallel/test 전용 · Cosmile = Foundation-only runtime 동작 중.
> ★2026-07-03 PATCH: **memory.db 임시 SSC-injection bridge 제거** — 처음부터 Foundation-first clean architecture로 설계(레거시 보존 bridge 없음).
> ★2026-07-03 PATCH-2 (최종 정책): **SIASIU runtime 상담 = Foundation-only.** brain.chat은 runtime primary/fallback에서 **retire**(소스 삭제 X·dev/eval 전용). Foundation 실패 = **fail-closed friendly**(brain/mock/fake answer 0·502 foundation_unavailable). Cosmile 패턴 참조: `Cosmile/app/docs/COSMILE_FOUNDATION_ONLY_CONSULTATION.md`. → **Cosmile = mock retire · SIASIU = local brain retire** (둘 다 Foundation-only runtime·down 시 fail-closed).

---

## 0. 핵심 원칙 (governing principles)
- **Foundation = canonical core**: 지식·기억(canonical)·다국어 *의미* 정규화·성분/제품/상담 판단·안전/금지/허용·retrieval·decision.
- **SIASIU = 서비스 껍질**: 플랫폼 UI 언어·입력 전처리(guardrail)·서비스별 말투(persona)·최종 응답 보이싱·화면 렌더·fallback UX·user/session/identity mapping·memory candidate 추출·Foundation memory 호출 orchestration.
- **불변 안전 계약**: SIASIU 표현층은 Foundation의 `forbidden_expressions`/`suppression_reason`/`products_allowed`/`recommendation_allowed`/`safety_gate_result`를 **절대 완화 못 함**(raise-only 소비).
- **★Clean-first(레거시 bridge 금지)**:
  - **현재 실제 고객 memory가 없으므로 legacy memory migration bridge는 만들지 않는다.**
  - **새로운 기억은 장기적으로 Foundation Memory에 직접 쌓는 방향으로 설계한다.**
  - **SIASIU `memory.db`는 현재 cutover의 필수 의존성이 아니다**(legacy/test/local 참고용).
  - **지금의 목표는 과거 memory 보존이 아니라 Foundation-first clean path 확립이다.**
- **★즉시 전환 아님**: 이 문서는 cutover *설계*. `/api/chat` 실전환은 parity gate 통과 + provider flag 뒤에서만.

---

## 1. 목표 아키텍처
```
현재:
  User → /api/chat → brain.chat → user            (Foundation 미경유)

목표(Foundation-first clean):
  User → /api/chat
    → SIASIU Input Adapter        (입력 guardrail + raw_text + locale + foundation_user_ref + minimal context)
                                   ★memory.db 주입 없음 · raw PII 전송 없음
    → Foundation POST /v1/consult_contract
    → FRC                         (decision/safety_gate/products_allowed/recommendation_allowed/
                                    forbidden_expressions/suppression_reason/product_candidates/
                                    answer_substance/evidence/trace_id)
    → SIASIU Response Adapter      (persona+TALK_STYLE+다국어 UI 재보이싱 · FRC 제한 강제 · 제품 카탈로그 resolve)
    → (future) memory candidate extraction → Foundation Memory write request
    → user

Foundation 실패/timeout/5xx/404/network:
    → ★fail-closed only: HTTP 502 foundation_unavailable + friendly message
    → 제품/CTA/추천/계속사용 허가 = 0
    → ★brain.chat 호출 0 · mock 0 · fake success 0 (local brain retire)
```
★현재 slice에서 안전은 **Foundation이 현재 발화(raw_text)로 판단** + Foundation down 시 **fail-closed friendly**(임시 답변 미제공)로 확보. brain.chat은 **runtime 상담 경로에서 retire**(소스 삭제 X). 지속 기억 기반 안전은 **Foundation Memory(별도 train)**가 담당.

---

## 2. 책임 분리 (ownership)
| Foundation (canonical) | SIASIU (service) |
|---|---|
| canonical knowledge · retrieval | platform UI language · 버튼/화면 문구 |
| **canonical memory core** (신규 기억을 직접 축적) | input preprocessing(guardrail 전처리) |
| 다국어 *의미* 정규화(성분/증상/지식) | service-specific persona · 최종 response voicing |
| 성분/제품/상담 판단 | UI rendering · fallback UX |
| 안전/금지/허용 · decision_type · safety_gate_result | user/session/**identity mapping(PII)** |
| products_allowed · recommendation_allowed | **memory candidate 추출**(future) |
| forbidden_expressions · suppression_reason · trace_id | Foundation memory API write orchestration(future) |
| FRC contract | platform 다국어 UI 문구 |

★경계 한 줄: **"의미/지식/기억/판단/안전 = Foundation · 입력전처리/말투/화면/식별자/fallback UX = SIASIU."**
★`memory.db`는 이 표에서 **canonical 아님** — legacy/test/local 참고용이며 cutover 필수 의존성이 아니다.

---

## 3. CUTOVER-01 — Foundation-first Clean Adapter Path (P0)
**정의**: `/api/chat`을 provider flag 뒤에서 Foundation-first로 갈 수 있는 **clean 경로**를 세운다. ★memory.db 주입 없음·PII 전송 없음.

**구성**:
- `/api/chat` 상담 = **Foundation-only**. provider(`SIASIU_CONSULTATION_PROVIDER`) 기본 = **`foundation_contract`**(미설정/unknown → foundation·brain fallback 금지). `legacy`/brain은 **dev/debug 게이트에서만**(기본 상담 route 아님).
- **SIASIU Input Adapter**:
  - 입력 guardrail(injection/prompt-attack/offdomain **입력 위생** 1차 차단 — 서비스 입력 보호). *상담 의미의 safety 판단은 Foundation.*
  - Foundation에 전달: **`raw_text` · `locale` · `foundation_user_ref` · minimal `service_context`(surface/channel)** 만.
  - ★**memory.db 주입 없음** · **raw PII 전송 없음**(user_id/이름/연락처 미전송·`foundation_user_ref`=opaque ref만).
- **Foundation FRC 수신** → **trace_id propagation**(FRC trace_id → SIASIU 로그/이벤트).
- **Foundation down** → ★**fail-closed only**: 502 `foundation_unavailable` + friendly message · 제품/CTA/추천/계속사용 0 · **brain.chat/mock/fake 0**.

**★입력 guardrail 경계**: 입력 위생/공격 차단 = SIASIU 입력단 / 상담 safety(이상반응·성분·금기·severity) = Foundation canonical. 둘 다 fail-closed(SIASIU가 통과시켜도 Foundation이 재상향).

**테스트 케이스**:
- flag=legacy(기본) → 기존 brain.chat 그대로(무변경).
- flag=foundation_contract(opt-in) → SSC(raw_text+locale+ref) → FRC 수신 → 응답.
- injection 발화 → 입력단 차단·Foundation 미호출.
- safety 발화("붓는데 계속?") → Foundation safety_first → 제품/CTA 0.
- Foundation down → 502 foundation_unavailable + friendly·제품/CTA 0·brain.chat 호출 0.
- SSC blob에 raw user_id/이름/연락처 미포함(foundation_user_ref만) · trace_id 전파 확인.

---

## 4. CUTOVER-02 — SIASIU Response Re-voicing (P0·voice)
**정의**: FRC `answer_substance`는 *판단 substance*로만 쓰고, **최종 사용자 문장은 SIASIU Response Adapter가 생성**(현재 passthrough → 실 재보이싱).

**재보이싱 규칙**:
- 입력: FRC `answer_substance` + `evidence` + `decision_type` + `safety_gate_result` + `forbidden_expressions` + `suppression_reason` + `products_allowed`/`recommendation_allowed` + `product_candidates`.
- 출력: SIASIU `PERSONA`+`TALK_STYLE`+환대+존댓말로 재보이싱 · **플랫폼 UI 언어/최종 표현 = SIASIU** · 단 *지식/기억/판단의 다국어 canonical core = Foundation*.
- 다국어: FRC substance가 어떤 언어든 SIASIU가 **사용자 locale로 현지화**(brain.chat native 재생성·`_reply_in_lang` 수준).

**★anti-relaxation guard (필수)**: 재보이싱 LLM이 Foundation 제한을 **못 낮추게** — 생성 후 결정론 guard로 (a) `forbidden_expressions` 재출현 (b) `products_allowed=false`인데 제품/CTA 언급 (c) `recommendation_allowed=false`인데 추천 문구 (d) safety_first인데 "계속 써도 된다" 검사 → 위반 시 conservative 재생성/차단(fail-closed). 제품/CTA 노출 = **FRC 허용값 종속**.

**테스트 케이스**: safety_first→제품/CTA/추천/계속사용 0 · recommend_with_caution+products_allowed=true→카탈로그+주의 · forbidden 표현 0 · 다국어 7언어 일치+페르소나 유지 · substance 한국어→사용자 en→영어 재보이싱.

---

## 5. CUTOVER-03 — Foundation Memory Design (별도 train)
**정의**: canonical memory를 **Foundation이 소유**하도록 설계. SIASIU는 candidate 추출 + write orchestration만.

**설계**:
- **canonical memory = Foundation Memory**(신규 기억을 직접 축적). SIASIU는 (a) 발화/응답에서 **memory candidate 추출**(기존 `extract` 로직 재사용 가능) (b) `foundation_user_ref` 기준 **Foundation Memory write/update 요청** orchestration.
- **★기존 `memory.db` migration은 현재 non-goal** — 실제 고객 memory가 없으므로 legacy 보존 bridge 만들지 않음. 고객 생긴 후 필요하면 **migration 별도 train**.
- **PII 최소화/비식별화**: raw PII(이름/연락처/주소/결제)·raw 발화 원문·비동의 민감정보 저장 금지. identity↔ref 매핑 = SIASIU 소유. Foundation엔 `foundation_user_ref` 기준 최소 context만.
- **★선행 의존성**: Foundation `consult_contract`는 현재 request-stateless(memory write API 없음). → CUTOVER-03은 **Foundation Memory train(write/update 엔드포인트) 선행 필요** · CUTOVER-01/02와 독립적으로 진행.

**테스트 케이스(train 시)**: candidate 추출 정확도 · foundation_user_ref write(PII 0) · 저장 금지 항목 차단 · 재방문 시 Foundation Memory context 반영.

---

## 6. CUTOVER-04 — Parity / Safety Gate (gate)
**정의**: 기존 `brain.chat` vs Foundation-path 비교 하네스. **cutover 전 필수 게이트.**

**parity 축**: safety decision · products_allowed · recommendation_allowed · forbidden/suppression · multilingual output(7언어) · SIASIU tone(페르소나/존댓말) · fallback(Foundation down fail-closed) · trace_id propagation · voice 수용성.

**통과 기준**: safety/products/forbidden **mismatch 0**(Foundation이 더 보수적인 것은 허용) · 다국어 7/7 · fallback fail-closed · trace_id 전파 · 페르소나 회귀 없음. **미달 시 cutover 금지.**

---

## 7. Cutover gate
- **provider flag**: `SIASIU_CONSULTATION_PROVIDER`(Cosmile bridgeMode 방식) · runtime 기본 = **`foundation_contract`**.
- **기본값 = foundation_contract**(unknown/미설정 → foundation·brain fallback 금지). `legacy`/brain = **dev/debug 게이트만**(runtime 상담 route 사용 금지·production=Foundation).
- **production exposure 금지**: parity gate 통과 전 실사용 노출 0.
- **cutover 전 필수**: CUTOVER-01(clean path)·02(재보이싱) 구현 + CUTOVER-04 parity gate PASS. (CUTOVER-03 Foundation Memory는 독립 train·cutover 필수 아님)
- **rollback 기준**: parity 회귀·safety leak·페르소나 붕괴·latency 임계 초과 → server.py 상담 분기 revert(brain.chat 소스는 dev 게이트로 남아 복구 가능). ★Foundation-only라 brain runtime fallback 자동 복귀는 없음(의도).

---

## 8. Foundation-down policy (★fail-closed only)
- ★**brain.chat / mock / fake fallback 금지** — SIASIU runtime 상담은 Foundation-only.
- Foundation unavailable/timeout/5xx/404/network → **HTTP 502** `{"error":"foundation_unavailable","source":"foundation_error","reason":<payload/log만>}`.
- **user-facing friendly message**(고정): "죄송해요. 지금 상담 연결이 잠시 불안정해요. 정확한 안내를 위해 임시 답변은 제공하지 않을게요. 잠시 후 다시 시도해 주세요."
- **제품 0 · CTA 0 · 추천 0 · 계속사용 허가 0** · **brain.chat 호출 0 · mock_fallback 0 · fake success 0**.
- ★**brain.chat = retired legacy source**(삭제 X·dev/eval 전용) — runtime 상담 fallback 아님. (Cosmile = mock retire · SIASIU = local brain retire·둘 다 down 시 fail-closed friendly.)

---

## 9. Risks
| 위험 | 완화 |
|---|---|
| ~~memory 누락 → safety 회귀~~ (★현재 고객 memory 없음 → moot) | 현재 안전 = Foundation이 현재 발화로 판단 + fail-closed · 지속 기억 안전은 **Foundation Memory train**이 canonical하게 담당(memory.db bridge 아님) |
| **canonical memory가 서비스별로 분기**(SIASIU/Cosmile 각자 기억) | Foundation Memory 단일 canonical·foundation_user_ref 단일화 |
| **persona 손실**(passthrough) | CUTOVER-02 재보이싱·parity tone 체크 |
| **다국어 UI vs 지식/기억 다국어 책임 혼동** | UI 문구=SIASIU / 지식·기억·의미정규화=Foundation 명시 |
| latency 증가(2 LLM hop) | 캐시·재보이싱 경량화·parity latency 임계 |
| Foundation down = 상담 실패(안전망 없음·cross-project 결합↑) | fail-closed friendly(502·임시답변 미제공)·제품/CTA 0·brain/mock/fake 0(Cosmile 동일 정책·WATCH) |
| 제품/CTA 과노출 | FRC 허용값 종속·anti-relaxation guard |
| **trace/memory PII 위험** | foundation_user_ref·비식별화·raw PII 전송 0·raw_text durable 0(Foundation INVARIANT) |

## 10. Non-goals
- order/revenue/margin ❌ · Cosmile 변경 ❌ · Foundation contract 변경 ❌ · DB migration ❌ · `/api/chat` 즉시 전환 ❌ · production live exposure ❌.
- ★**legacy 고객 memory migration bridge ❌** · **memory.db → SSC 임시 주입 adapter ❌** · **과거 memory 보존 ❌**(현재 고객 없음).

---

## 부록. 확인된 gap ↔ CUTOVER 매핑 (patched)
1. `/api/chat` Foundation 미경유 · 입력 guardrail 위치 → **CUTOVER-01 (Clean Adapter Path·flag)**
2. Response Adapter passthrough → **CUTOVER-02 (Re-voicing)**
3. canonical memory/candidate write 흐름 → **CUTOVER-03 (Foundation Memory Design·별도 train)**
4. parity harness 필요 → **CUTOVER-04 (Parity/Safety Gate)**
- ★제거됨: "memory.db → SSC 주입"(임시 bridge) · "미주입=safety 회귀"(고객 없음 → moot).

## 한계
- 설계 정본 — 구현은 각 CUTOVER directive + Leo 승인 후. 코드 수정 0 · Foundation contract 변경 0 · migration 0 · push 0.
