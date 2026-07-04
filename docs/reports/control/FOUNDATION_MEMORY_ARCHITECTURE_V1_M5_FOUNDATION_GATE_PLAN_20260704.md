# Foundation Memory Architecture V1 — M5 Foundation Gate 구현계획 (Plan)

> 작성: foundation-control · 2026-07-04 · **상태: DESIGN/PLAN (구현 전 계획 · 코드 0)** · Control verdict 상한 = DESIGN_READY.
> 전제: M2/M3 **v1.2 FINAL_PASS**(Fable5 APPROVED) · M4 Implementation Plan. ★M5 실 구현은 **M4 선행 gate(B1/B10/B12)·schema-shadow 이후 별도 승인**으로 진행 · **live/write/promotion은 M6까지 금지** · **Foundation은 고객 LTM 저장소/broker가 아니다.**
> 근거: M4_IMPLEMENTATION_PLAN · MEMORY_CONTEXT_CONTRACT_V1(M3 v1.2 §7/§4) · COMMON_SERVICE_MEMORY_CONTRACT_V1(M2 v1.2) · anchor · DELTA3_FINAL_REVIEW.
> ★코드 수정 0 · migration 0 · source push 0 · raw 고객데이터/secret 미열람 · 구현 실행 0 · M6 live rollout 지시 없음.

## 1. M5 목적
- Foundation `consult_contract` 진입점에 **default-deny gate**를 배선하기 위한 **계획**(구현 아님).
- **memory_context raw/PII/identifier 유입 차단**(M3 §7 v1.2 신규 스펙).
- **session_context_out echo clean 보장**(Foundation echo도 raw/PII/식별자 0).
- **memory_read_provider unconnected 유지**(Foundation 고객 memory 미조회·broker 아님).
- **durable write 0 유지**(memory_write=false·memory_db_created=false).

## 2. M5 범위
- session_context / service_context / product_context **recursive scan**(중첩 dict/list).
- **whitelist/type/enum/shape 검증**(M3 §4 정본·unknown-key reject).
- **raw utterance/PII/`customer_id`/`user_id`/`anonymous_id`/`session_id`/`order`/`payment`/`shipping` reject**.
- **size/depth/count limits**(context ≤32KB·depth ≤5·item ≤2,048·per-field max).
- **echo round-trip compatibility**(정상 echo/safety carry/catalog pass·B15).
- **fail-closed error semantics**(위반 = reject·수용/반영/저장 0).
- **shadow/flag OFF 운영**(hard reject는 M6 전 금지 또는 별도 승인).

## 3. M5에서 제외 (★M4/M6/후속)
- service-local DB schema migration (M4).
- SIASIU/Cosmile memory model implementation (M4).
- raw conversation storage (M4·서비스-local).
- prod secret live enablement (M6).
- cross-service memory sharing (v1 범위 밖·future).
- Foundation customer durable memory (영구 금지).
- V3 intelligence (후속).
- M6 live rollout (별도 승인).

## 4. gate contract mapping (M3 §4 whitelist → Foundation gate 검증)
| whitelist 필드 | gate 검증 | 정본/enum |
|---|---|---|
| `service_id` | enum 검증 | siasiu\|cosmile |
| `request_memory_context_version` | 값 검증·호환 모드 판별(생략=whitelist 유예·blacklist/scan은 무조건) | mctx-1.0 |
| `session_ref` | ★형식 검증: `sess_ref_*`/keyed-HMAC만·**bare UUID reject**·≤128 | §5.1 |
| `stated_concerns` | []·**ConditionCategory enum**·cap 64 | dryness\|barrier\|sensitivity\|wrinkle\|pigmentation\|pore\|acne\|oiliness (8값·_CONDITION_KW) |
| `recommendation_deferred` | bool | — |
| `last_refined_intent` | enum(11값) | _refine_intent 산출집합(greeting…cannot_determine) |
| `safety_facts` | shape `{avoid_ingredient:[atom],allergy:[atom],pregnancy_nursing:bool}`·drop 금지·carry pass | — |
| `known_allergy_atoms`/`avoid_ingredient_atoms` | []atom·dedupe·≤128 | atom_ref |
| `episode_summary_refs` | []`{summary_id,content_hash(keyed),intent_types(SummaryIntentTag),risk_level}`·≤32 | SummaryIntentTag(product_fit\|safety\|education\|routine\|comparison\|greeting\|other)·risk_level(none\|low\|medium\|high) |
| `ltm_fact_refs` | []`{type(registry),norm_value/atom,fact_state,confidence(opt)}`·≤256 | fact_state·registry enum·confidence optional |
| `product_refs` | []canonicalProductId·≤128 | — |
| `product_context.catalog_candidates` | []**item shape 표**(product_id 필수·slug/name/brand/category/concerns/grounding·**match_reason 금지**)·≤128 | ConditionCategory·grounding.match_level ≤16 |
| `commerce_signal_refs` | []`{signal_kind,product_ref,privacy_level}`·≤128 | signal_kind(view\|add_to_cart\|checkout\|purchase\|wishlist\|alert\|coupon\|ai_verdict)·privacy_level(anonymous\|user_consented\|aggregated) |
| `consent_flags`/`retention_flags`/`safety_flags` | shape·enum(consent_scope·retention_policy·sensitivity_level) | — |
| `user_constraints` | `{no_recommendation:bool,explanation_only:bool}` | — |
| `trace_refs` | `{request_id/trace_id: hex}`·raw id 아님 | — |
| **`subject_ref`** | ★**미전송 권장** — 전송 시 opaque 가명 ref(subj_v2_/furef_v2_·raw PII 아님)라 raw-reject 대상은 아니나 **Foundation 미소비(broker 아님)·strip 권장**. raw 식별자(customer_id 등)와 구분 | §5 |

## 5. reject matrix
| input case | expected | reason | error code | test name |
|---|---|---|---|---|
| raw utterance(원문 문장) | reject | free-text·whitelist 외/raw 휴리스틱 | `GATE_REJECT_RAW_TEXT` | test_reject_raw_utterance |
| email/phone/name | reject | PII 정규식(email/phone/RRN)·이름 휴리스틱 | `GATE_REJECT_PII` | test_reject_pii |
| customer_id/user_id/anonymous_id | reject | raw 식별자 key(rule 4) | `GATE_REJECT_IDENTIFIER` | test_reject_identifier |
| raw order/payment/shipping | reject | 주문/결제/배송 raw | `GATE_REJECT_ORDER_PAYMENT` | test_reject_order_payment_shipping |
| bare UUID session_ref | reject | session_ref 형식 위반(prefix/HMAC 아님·§5.1) | `GATE_REJECT_SESSION_REF_FORMAT` | test_reject_bare_uuid_session_ref |
| catalog match_reason 자유문장 | reject | catalog item unknown-key(자유문장 금지) | `GATE_REJECT_UNKNOWN_KEY` | test_reject_match_reason_freetext |
| unknown key(whitelist 외) | reject | default-deny unknown-key(rule 1) | `GATE_REJECT_UNKNOWN_KEY` | test_reject_unknown_key |
| `fact_state="deleted"/"blocked"/"expired"` 비멤버 문자열 유입 | reject | ★**재명세(G-7-3):** payload에 deleted/blocked 마커 부재 → **gate가 deleted-reuse를 직접 판단 불가**·**service-side filter가 1차 책임**·gate는 **fact_state 비멤버(deleted/blocked/expired 등 금지 문자열) 유입만 reject** | `GATE_REJECT_DELETED_REUSE` | test_reject_fact_state_nonmember |
| `ltm_fact_refs[0]`에 `customer_id` **중첩** | reject | ★**recursive scan 증명(G-7-1):** 중첩 dict 내 식별자(rule 3+4) | `GATE_REJECT_IDENTIFIER` | test_reject_nested_identifier |
| key 이름 = `session_id` (bare UUID와 별개) | reject | ★**key 자체가 `session_id`(G-7-2)** → reject(rule 4)·`session_ref`(opaque)와 구분 | `GATE_REJECT_IDENTIFIER` | test_reject_session_id_key |
| 호환모드(version 생략) + raw utterance | reject | ★compat 모드도 raw/blacklist scan **무조건**(rule 5·면제는 whitelist 강제뿐) | `GATE_REJECT_RAW_TEXT` | test_reject_compat_mode_raw |
| `safety_facts` > 128 item | reject | ★**drop 금지 필드의 유일 reject 경로**(상한 초과=이상신호·rule 6) | `GATE_REJECT_SIZE_LIMIT` | test_reject_safety_facts_overcount |
| `session_ref` > 128 char | reject | 길이 상한(§5.1) | `GATE_REJECT_SESSION_REF_FORMAT` | test_reject_session_ref_length |
| invalid ConditionCategory / SummaryIntentTag / `last_refined_intent="small_talk"`(비멤버) | reject | ★enum 검증(rule 2)·`small_talk`은 last_refined_intent 비멤버(_INTENT_SIGNAL_OK 입력측 어휘·echo 아님) | `GATE_REJECT_ENUM` | test_reject_invalid_enum_vocab |
| oversized context(>32KB/depth>5/item>2,048) | reject | size/depth/count limit(rule 6) | `GATE_REJECT_SIZE_LIMIT` | test_reject_oversized_context |
| invalid enum(예: privacy_level="internal") | reject | enum 검증(rule 2) | `GATE_REJECT_ENUM` | test_reject_invalid_enum |
| version 생략 + identifier 포함 | reject | version 유예는 whitelist 강제만·식별자 scan 무조건(rule 4) | `GATE_REJECT_IDENTIFIER` | test_reject_version_missing_with_identifier |

## 6. pass matrix
| input case | expected | 비고 |
|---|---|---|
| normal `dryness` stated_concerns echo | pass | ConditionCategory 멤버(REG-1 해소) |
| safety_facts carry(avoid_ingredient/allergy/pregnancy_nursing) | pass | immutable union 2턴째 유지 |
| catalog refs(product_id·slug·name/brand·grounding) | pass | catalog item 표 준수·match_reason 없음 |
| synthetic SIASIU payload(§10) | pass | sess_ref_*·ltm_fact_refs·safety_facts·trace_refs |
| synthetic Cosmile payload(§10) | pass | commerce_signal_refs privacy_level=user_consented·product_refs |
| previous session_context_out → next session_context_in | pass | echo round-trip(2턴째 세션 거부 0) |
| guest_ref/subject_key 정상 context | pass | subject_ref 미전송/opaque·guest 정상 refs |
| ★**version 생략 + 정상 legacy 형상**(G-7-7) | pass | 무파괴 양성(compat 모드·whitelist 유예·blacklist/scan 통과) |
| ★`subject_ref=subj_v2_*`(G-7-7) | pass + **strip/log code only** | opaque 가명 ref(raw 아님)·Foundation 미소비·session_out에서 strip·로그는 code만 |
| ★**self-echo**: synthetic → session_context_out → 재주입(G-7-8·M5 즉시) | pass | Foundation self-echo round-trip(§8·**version 재부착 규칙**으로 vacuous 통과 방지) |

## 7. Foundation code touchpoint inventory (★계획만·코드 수정 0)
| touchpoint | 위치(read-only 확인) | M5 계획 |
|---|---|---|
| consult_contract 진입점 | `core.consult_contract`(server.py:77-79) | gate 호출 지점 후보(진입 직후·SSC 소비 전) |
| ★`/v1/consult/chat` (+alias·**주 유입 경로**) | server consult_chat 엔드포인트 | ★**동일 gate shadow 배선 권고(G-7-4)** — 즉시 불가 시 **W-item 등록(§10)+M6 전 처리 약속**·주 유입 경로가 gate 우회 금지 |
| SSC validation | `contracts.py validate_ssc`(session_context freeform 통과:72) | ★**gate는 raw SSC dict를 `validate_ssc` 이전에 스캔**(G-7-6 확정·freeform → whitelist 강제·validate 전 default-deny) |
| session_context_out 생성 | `core.py:1224 session_out=dict(session_in)`·echo(1462/1469) | echo clean assert 지점(out도 gate 통과 형상) |
| has_raw_or_pii 기존 함수 | `FOUNDATION/foundation/shared_memory/gate.py:39` | ★**단순 재사용 금지**(default-allow blacklist·불충분·SUPERSEDED) — 값-스캔 일부만 **컴포넌트**로 참조 가능 |
| 새 gate 함수/모듈 후보 | (신규) `foundation_http_service/ingress_gate.py`(또는 contracts 인접) | default-deny·whitelist·recursive·상한·enum — M3 §7 v1.2 스펙 |
| tests 위치 후보 | `foundation-control/scripts/…ingress_gate_test.py`(신규) | reject/pass matrix·echo round-trip |
- ★**본 표는 계획**이며 실제 함수/모듈 생성·배선은 **M5 구현(별도 승인)**. 코드 미수정.

### 7.1 whitelist placement map (★G-7-6 신설)
memory_context 허용 필드의 **배치 위치**(context 별)·gate는 각 위치를 재귀 스캔:
| 배치 위치 | 허용 키 | 비고 |
|---|---|---|
| top-level(SSC) | `known_allergies`·`avoid_ingredients`·`user_constraints`·`product_context` | ★**SSC 자체 필드**(계약 스키마)·contract-경로 scan에서 "SSC 자체 필드"로 별도 취급 |
| `session_context` | `service_id`·`request_memory_context_version`·`session_ref`·`stated_concerns`·`recommendation_deferred`·`last_refined_intent`·`safety_facts`·`known_allergy_atoms`·`avoid_ingredient_atoms`·`episode_summary_refs`·`ltm_fact_refs`·`consent_flags`·`retention_flags`·`safety_flags`·`trace_refs` | memory_context 주 착지·§4 whitelist |
| `product_context` | `catalog_candidates`(item 표)·`product_refs`·`commerce_signal_refs` | catalog 경로(REG-1)·item shape |
| `service_context` | (★허용키 0 아님) | ★**service_context 허용키 0 문제 해소:** 기존 SSC `service_context`는 contract-경로 scan에서 **"SSC 자체 필드"로 별도 취급**(memory_context whitelist와 분리)·raw/PII/식별자 재귀 scan은 동일 적용 |
- ★**gate 위치 확정:** raw SSC dict를 **`validate_ssc` 이전**에 스캔(freeform 통과 전 default-deny).

## 8. feature flag / shadow plan
- **gate shadow mode:** gate가 판정만 하고 요청은 통과(reject 시뮬레이션·기록만)·**hard reject 안 함**.
- **reject simulation mode:** shadow에서 reject 케이스를 로그(enum/code만)·실제 차단 X.
- ★**shadow echo strip(G-7-5·필수·R-3):** shadow mode에서도 **위반 필드는 `session_context_out`에서 제거(strip)** — reject 판정 payload가 session_out으로 **verbatim echo되어 재유입되는 것을 차단**. self-echo round-trip test로 검증(§6).
- ★**hard reject mode는 M6 전 금지 또는 별도 승인**(shadow 검증·기존 트래픽 무파괴 확인 후 활성).
- **logs raw payload 저장 금지:** reject reason = **enum/code + path index만**(★key-name 미포함·G-7-8)·raw payload/PII 미기록·trace_ring(휘발·PII 0) 준수.
- **flag default OFF:** gate 미배선/미활성 시 기존 consult 동작 100% 동일(safe-additive).

## 9. test plan
- **Foundation runner 89/89·651 유지**(gate 추가가 기존 판단/regression 무파괴).
- **memory_context raw/PII reject tests**(§5 reject matrix 전량).
- ★**self-echo round-trip tests(G-7-8·M5 즉시·M4로 미루지 않음):** synthetic payload → `session_context_out` → 재주입 **pass**(§6)·safety carry·catalog·**version 재부착 규칙**(vacuous 통과 방지)·로그 key-name 미포함(path index만).
- **deleted/blocked/expired must_not_reappear tests**.
- **durable write 0 assert**(memory_write=false·memory_db_created=false).
- **memory_read_provider_called=false assert**.
- **session_context_out clean assert**(echo raw/PII/식별자 0).
- ★중단: 정상 echo/safety carry/catalog가 gate에 reject>0 · durable write>0 · raw payload 로그>0.

## 10. M4/M5 dependency
- **순서:** M4 **schema shadow**(SIASIU/Cosmile additive·flag OFF) → M5 **gate shadow**(Foundation ingress). gate는 서비스 schema와 독립이라 **병행 착수 가능**하나, echo round-trip test는 서비스 memory_context 조립(M4)과 정합 필요.
- **B4(ingress default-deny gate):** = M5 본체(신규 스펙 구현·shadow).
- **B15(whitelist echo round-trip):** 문서-레벨 해소(완료) → M5에서 gate 구현으로 실현.
- **B3(subject_ref v2):** Foundation 배선은 M5 병행 가능(service-local keying)·**prod secret live = M6**. gate는 subject_ref를 미소비(broker 아님)이므로 B3와 느슨히 결합.
- **B1/B10/B12 선행 gate:** M4 선행(1ce099e 소재·V0 SUPERSEDED·migration+Leo 승인) — M5 gate 자체는 이들과 독립이나 **전체 M4/M5 착수는 선행 gate 후**.
- **B4 소유 단일화(G-5):** gate 모듈 구현+synthetic/self-echo test+consult_contract 배선 = **M5 단독 소유**(M4 §10 step3의 M4-step 표현 제거·서비스-조립 echo E2E만 M4 완료 후 통합).
- ★**W-item(G-7-4·`/v1/consult/chat` 우회):** 주 유입 경로 consult/chat(+alias)에 동일 gate shadow 배선 권고 — **즉시 불가 시 본 W-item으로 등록·M6 전 처리 약속**(gate 우회 endpoint를 방치하지 않음).
- **M6로 넘길 항목:** hard reject 활성 · prod secret live · consult live 배선(real user) · cross-service · consult/chat gate 미배선 시 M6 전 처리.

## 11. STOP conditions
- raw/PII/secret exposure(payload/log/echo).
- Foundation durable customer memory introduced(memory_write>0·memory_db_created).
- cross-service memory introduced.
- memory_read_provider connected(고객 memory 조회).
- session_context_out raw/PII echo.
- hard reject live enabled without approval(M6 전).
- tests failing(runner 89/89 감소·기존 트래픽 reject·설명 없는 count 감소).

## 12. M5 구현 가능/불가 판단
- ★**계획 확정 = 가능(shadow·flag OFF).** M3 §7 v1.2 스펙(FINAL_PASS)으로 gate 계약 정본 확정 → M5 gate **shadow 구현 계획** 착수 가능.
- **실 구현 선행:** M4 선행 gate(B1·B10·B12) + M3 §4/§7 정본(완료). **hard reject·consult live·prod secret = M6**(별도 승인).
- Control은 계획만 발행 — 실 gate 구현/배선은 Foundation repo Claude Code가 본 plan에 따라 수행(코드 0·본 문서=계획).

## 무결성
코드 변경 0 · migration 0 · source repo push 0 · raw 고객데이터/secret 미열람 · 구현 실행 0 · M6 live rollout 지시 없음 · foundation-docs만 commit/push.
