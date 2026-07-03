# Foundation Dev/Shadow HTTP Service for Cosmile Consultation — SCHEMA/JUDGE/REC — 설계서 — 2026-06-30

> ★design-first(`CLAUDE.md §2.6`). 본 설계 APPROVED 후 dev/shadow HTTP service를 구현한다.
> Cosmile 상담/검색이 in-Cosmile mock이 아니라 **실제 Foundation dev/shadow HTTP endpoint**를 호출하도록 한다.
> ★production live 아님 · `api_live=false` · `mode=dev_shadow` · real write 0 · raw/PII durable 0 · memory write 0.
> ★서비스는 **foundation-control 관할**로 빌드(제품 repo 무수정). Cosmile은 endpoint 준비 후 client로 연결.

## 1. 목적
- Cosmile 상담(consult/judge)과 추천(recommend)이 mock/dev bridge 대신 **실제 HTTP endpoint**를 호출하도록 Foundation dev/shadow HTTP 서비스를 제공한다.
- 역할 분리: **SCHEMA**(입출력 검증) · **JUDGE**(상담 판단·safety) · **REC**(catalog 한정 추천). 전부 dev/shadow·fail-closed.

## 2. 현재 상태
- Cosmile에는 Foundation **mock/dev bridge만** 존재(`foundationConsultationClient` http 경로는 throw). 실제 HTTP endpoint·서버 코드·가동 상태 = **0**.
- 계약은 `api_live=False` 강제. Cosmile 화면에 "Foundation 연결 시 실제 근거 표시" placeholder 잔존(UX 약함).
- foundation-control `main@bd48581`(pushed). Foundation `b7cce1f`(KR runtime·decision contract 존재, 인벤토리 확인). SIASIU `921caf4`, Cosmile `da6cb2f`(Leo repo-local).

## 3. `api_live=False` 제약 해석
- `api_live=False` = **public/production API live 금지** (real user 노출·real write·canonical 경로). 이는 유지한다.
- 그러나 **dev/shadow HTTP bridge**(127.0.0.1, 개발자/스테이징, write 0, raw/PII durable 0)는 `api_live=False`와 **충돌하지 않는다** — live가 아니라 dev 통신이다.
- 따라서 본 서비스는 응답에 **항상 `api_live=false`·`mode=dev_shadow`·`write_enabled=false`** 를 박아 live가 아님을 명시한다.

## 4. dev/shadow HTTP 허용 범위
- 허용: localhost/dev bind HTTP · 결정론 fail-closed 판단 · catalog 한정 추천 · in-memory 휘발 trace · redacted 로깅.
- 금지: production bind/expose · real user traffic · real write(order/payment/customer/catalog) · memory write/candidate · web lookup · learning store · learned reuse · canonical 승격.

## 5. Endpoint list
| method | path | 역할 |
|---|---|---|
| GET | `/health` | service status (api_live=false, mode=dev_shadow, write_enabled=false) |
| POST | `/v1/schema/validate` | SCHEMA — 입출력 schema validation (raw/PII durable 0) |
| POST | `/v1/consult/judge` | JUDGE — query(+optional candidates) → decision/safety |
| POST | `/v1/recommend` | REC — catalog candidates 한정 product-grounded recommendation |

## 6. Request schema
- **공통:** `{ trace_hint?:string, locale?:string }`. raw user text는 처리에만 쓰고 **durable 저장 0**.
- **/v1/schema/validate:** `{ target:"judge_request"|"recommend_request"|"judge_response"|"recommend_response", payload:object }`.
- **/v1/consult/judge:** `{ query:string, catalog_candidates?:[{product_id|slug, name?, category?, skin_type?, grounding?}], risk_signal?:"low"|"medium"|"high", intent?:string, locale? }`.
  - ★`risk_signal`/`intent` 구조화 입력이 있으면 우선 사용(no-heuristics). 없으면 결정론 fail-closed 분류로 **caution만 상향**(완화 금지).
- **/v1/recommend:** `{ query?:string, catalog_candidates:[{product_id|slug, name, category?, skin_type?, grounding?}], decision_type?, max?:int }`.

## 7. Response schema
- **공통 불변 필드(모든 응답):** `api_live:false, mode:"dev_shadow", write_performed:false, raw_text_stored:false, pii_stored:false, memory_write:false, trace_id`.
- **/health:** `{ status:"ok", service, version, api_live:false, mode:"dev_shadow", write_enabled:false, endpoints:[...], started_at }`.
- **/v1/schema/validate:** `{ valid:bool, errors:[{path,msg}], target, ...불변 }`.
- **/v1/consult/judge:** `{ decision_type, safety_gate_result, evidence_mode, reason_codes:[], answer_summary:string, clarification_questions:[], product_refs:[product_id...](catalog 후보 한정), ...불변 }`.
- **/v1/recommend:** `{ recommendations:[{product_id, slug, recommendation_reason, match_reason, confidence(0..1), limitations:[]}], not_recommended?:[], reason_codes:[], ...불변 }`.

## 8. SCHEMA / JUDGE / REC 역할
- **SCHEMA:** 입력/출력 형태 검증(필수 필드·enum·타입). 잘못된 형태 → `valid:false`+errors. raw/PII는 검증에만, durable 저장 0.
- **JUDGE:** 상담 판단 — decision_type/safety_gate_result/evidence_mode 결정. **fail-closed**: 불확실→`hold`/`ask_more`, 위험→`do_not_buy`/`block`. 절대 over-assert 안 함(grounding 없으면 evidence_mode≤cautious).
- **REC:** **catalog candidates 안에서만** 추천/비추천/대안 구성. catalog 밖 제품 **생성 금지**. product_id/slug 기반 candidate만 반환.

## 9. Safety boundary
- 위험 신호(임신/수유·의료/치료/처방·이상반응/부작용·금기/contraindication·중증 알레르기) → `safety_gate_result=block`, `decision_type=do_not_buy`(또는 do_not_recommend), evidence_mode=cautious, clarification=전문가 상담. **구매 비연결.**
- 결정론 분류는 **fail-closed 상향만**: 구조화 `risk_signal`이 없을 때 keyword 기반은 caution/block으로 **올리기만** 하고, recommend/pass로 **낮추지 않는다**.
- ★no-heuristics 처리: 권위 판단은 구조화 입력(`risk_signal`/`intent`) 우선. keyword fallback은 **명시적·결정론·fail-closed**이며 Foundation 기존 query-type 분류(`_QUERY_TYPE_KW`) 정신과 일치. 본 서비스는 **dev/shadow stand-in**이며, production 권위 judge는 Foundation runtime 연결(별도 train). 본 설계서 APPROVED로 이 dev 분류를 승인한다.

## 10. Raw / PII boundary
- raw user text는 **처리 중에만** 메모리 보유, **durable 저장 0**. 응답·로그·trace에 **요약/hash/refs만**(원문 0).
- PII 패턴(email/전화/주민/카드) 감지 시 **마스킹**, 저장/반환 0. 모든 응답에 `raw_text_stored:false`·`pii_stored:false`.

## 11. Memory write boundary
- **memory write 0 · memory candidate 생성 0 · customer memory 0.** 본 서비스는 stateless(휘발 trace ring만). memory.db 미생성/미접근.
- 모든 응답에 `memory_write:false`.

## 12. Evidence / reason format
- `evidence_mode ∈ {grounded, cautious, uncertain, cannot_determine}` — grounding 없으면 **cautious 이하**. catalog candidate에 `grounding` 있으면 cautious~grounded.
- `reason_codes`: 결정 근거 코드 배열(예: `RISK_PREGNANCY_BLOCK`, `INSUFFICIENT_EVIDENCE_HOLD`, `NO_CATALOG_CANDIDATE_ASK_MORE`, `CATALOG_MATCH_GROUNDED`). 내부 알고리즘/score 비공개(disclosure 0).

## 13. Product candidate format
- 추천은 입력 `catalog_candidates`의 `product_id|slug` 한정. 출력 product_id는 **입력 후보 집합의 부분집합**(invariant).
- 각 추천: `{product_id, slug, recommendation_reason, match_reason, confidence, limitations}`. catalog 밖 제품·가공된 신규 제품 **0**.

## 14. Cosmile client contract
- `FOUNDATION_API_URL`(예: `http://127.0.0.1:8731`) · `FOUNDATION_BRIDGE_MODE=foundation_http` · endpoint paths(§5) · request/response schema(§6·§7).
- `timeout_ms`(기본 3000) · retry(1) · 실패 시 fallback(§15).
- `trace_id` format: `fdsh_<hex16>` · error format: `{ error_code, message, trace_id, http_status }`(코드: `BAD_REQUEST`/`SCHEMA_INVALID`/`UNAVAILABLE`/`INTERNAL`).
- 별도 산출: `contracts/COSMILE_FOUNDATION_HTTP_CONTRACT_V0.json`.

## 15. Failure / fallback contract
- timeout/connection error/5xx → Cosmile은 **fail-closed fallback**: `decision_type=cannot_determine`, `safety_gate_result=pass`(단 추천 0), `evidence_mode=cannot_determine`, "일시적으로 상담 근거를 불러오지 못했어요 — 상담을 계속할게요". **구매 유도 0.**
- 서비스 자체도 내부 예외 → `UNAVAILABLE`/`INTERNAL` + 불변 필드 유지(write 0).

## 16. Logging / tracing policy
- 로그: `trace_id` + endpoint + decision_type/safety + **요약/hash만**. raw query/PII **0**. durable 파일 raw 저장 0(stdout dev 로그 + 휘발 in-memory ring).
- trace_id는 응답·로그 상호 추적용. 내부 score/알고리즘 미노출.

## 17. Test plan
1. service starts(127.0.0.1:port) 2. `/health` PASS(api_live=false·mode=dev_shadow·write_enabled=false) 3. schema validation PASS(valid/invalid) 4. recommend/pass case 5. do_not_recommend/caution 6. do_not_buy/block 7. hold/ask_more 8. **catalog 밖 제품 생성 0**(REC 출력 ⊆ 입력 후보) 9. raw durable 저장 0 10. PII 저장 0 11. memory write 0 12. real write 0 13. production disabled 14. Cosmile contract JSON valid 15. endpoint URL 산출.
- unit(core 결정론) + HTTP integration(서버 기동→urllib 호출) 둘 다.

## 18. Rollout plan
- 단계: (a) foundation-control dev/shadow service 기동(localhost) → (b) Cosmile가 `FOUNDATION_BRIDGE_MODE=foundation_http`+`FOUNDATION_API_URL`로 연결(Cosmile repo-local, 별도 승인) → (c) dev/staging 테스트.
- production/public expose·real Foundation runtime 권위 judge 연결·실 write = **후속 release train(별도 승인)**. flag/env로 dev에서만.

## 19. Rollback plan
- 서비스는 **별도 프로세스 + foundation-control 신규 코드**: 프로세스 종료로 즉시 비활성(런타임 롤백). 코드 롤백 = 해당 커밋 revert(제품 repo 영향 0).
- Cosmile 연결은 env(`FOUNDATION_BRIDGE_MODE`)로 mock 복귀 가능(별도, 본 train 미수행).

## 20. Approval gate
- 설계서 20섹션 존재 · JSON valid · 제품 repo 변경 0 · secret/PII 0.
- 구현 검증: service starts · /health · schema · 4 decision cases · catalog-out 0 · raw/PII/memory/real write 0 · production disabled · contract JSON valid · endpoint URL.
- ★승인 근거: **Leo go-ahead 2026-06-30(본 train 지시: 설계+구현)** = APPROVED. §9 dev 분류(fail-closed)도 본 설계로 승인.

---

## 응답 예시 (요약)
- **recommend/pass:** `{decision_type:recommend, safety_gate_result:pass, evidence_mode:cautious|grounded, product_refs:[fprod_elt01], reason_codes:[CATALOG_MATCH], ...불변}`
- **do_not_recommend/caution:** `{decision_type:do_not_recommend, safety_gate_result:caution, evidence_mode:cautious, reason_codes:[FIT_UNCERTAIN], ...}`
- **do_not_buy/block:** `{decision_type:do_not_buy, safety_gate_result:block, evidence_mode:cautious, reason_codes:[RISK_PREGNANCY_BLOCK], clarification_questions:[전문가 상담], ...}`
- **hold/ask_more:** `{decision_type:ask_more, safety_gate_result:pass, evidence_mode:uncertain, clarification_questions:[피부타입?], ...}`
- **Foundation unavailable fallback(Cosmile side):** `{decision_type:cannot_determine, safety_gate_result:pass, evidence_mode:cannot_determine, recommendations:[], note:"일시적 연결 불가"}`

## 금지
production live · `api_live=true` · raw durable 저장 · PII 저장 · memory write · customer memory write · web lookup 구현 · learning store 구현 · catalog write · 실 결제/주문/customer DB write · Cosmile/SIASIU repo 수정 · push.
