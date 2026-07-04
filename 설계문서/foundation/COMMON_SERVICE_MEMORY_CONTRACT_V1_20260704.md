# COMMON SERVICE MEMORY CONTRACT V1 (M2) — field-level 계약

> 작성: foundation-control · 2026-07-04 · **상태: DESIGN (M2 계약 문서 · 구현 전)** · Control verdict 상한 = DESIGN_READY · 최종 FINAL_PASS = Fable5/독립 reviewer.
> 근거: FOUNDATION_SERVICE_MEMORY_ARCHITECTURE_V1(v0.3) · M1_REVIEW_CONSOLIDATION · Foundation/SIASIU/Cosmile-side review · MEMORY_INVENTORY_AUDIT · COMMON_IDENTITY_REF_POLICY(APPROVED_CANDIDATE) · SUBJECT_REF_HARD_GATE_RESULT(c9bb996).
> ★코드 수정 0 · migration 0 · source push 0 · raw 고객 데이터/secret 미열람.

## 1. 목적
- SIASIU와 Cosmile이 **동일 Service Memory Contract**(9 엔티티·동일 필드-의미/상태머신/게이트/거버넌스)를 각자 service-local로 구현하기 위한 **field-level 계약**.
- ★**Foundation은 고객기억 저장소/broker가 아니다** — 고객 장기기억(LTM)을 저장하지 않으며, 요청 단위 `memory_context`만 임시 사용(M3).

## 2. 범위
- **SIASIU·Cosmile service-local memory contract**(정본 = 발생 서비스 소유).
- ★**cross-service 고객기억 공유 = v1 범위 밖**(future release train): SIASIU↔Cosmile 공유·consent-gated broker·cross-service SubjectRefMap·cross-service allow_link·cross-store erasure propagation = **v1 미구현**.
- **Foundation durable customer memory = 0**(request-stateless).

## 3. 9개 엔티티 계약
공통 규약: `subject_ref` = service-local opaque(subj_v2_ = HMAC(FOUNDATION_SUBJECT_REF_SECRET, furef_v2)[:32]·**가명 PII**) · 모든 raw-파생 hash = **keyed(HMAC)/per-service salt** · 신규/확장 전부 **additive·flag OFF·shadow** · `applied_to_real_user=false`·`write_live=false`.

### 3.1 ConversationSession
- **목적:** 상담 세션 그룹핑(메시지·요약·파생사실의 부모). · **소유자:** 발생 서비스(service-local).
- **필수 필드:** `session_id`(PK) · `service_id`(siasiu|cosmile) · `subject_ref`(N: guest는 `guest_ref`) · `status`(active|ended|abandoned|handoff) · `started_at` · `consent_scope` · `retention_policy`.
- **nullable:** `subject_ref`(guest N)·`guest_ref`·`ended_at`·`external_consult_ref`·`deleted_at`/`expires_at`.
- **key/index:** PK `session_id` · idx `(service_id, subject_ref)` · idx `guest_ref`.
- **consent/retention/delete:** 적용(3-state deleted/blocked/expired).
- **raw/PII:** 미포함(메시지는 별도). · **Foundation 전달:** 불가(session_ref만 memory_context로).
- **SIASIU 매핑:** episode 그룹핑(신설·episode.user_id→subject_ref keying). · **Cosmile 매핑:** `ConsultationSessionMeta` 확장(status enum 이미 정합·+subject_ref/guest_ref/external_consult_ref/consent/retention/delete).
- **note:** additive. external_consult_ref = 보조 참조(정본 대체 아님).

### 3.2 ConversationMessage (opt-B — 각 서비스 자기 원문 저장)
- **목적:** 상담 **원문 정본**(발생 서비스 소유·고객 재열람). · **소유자:** 발생 서비스(SIASIU→SIASIU DB, Cosmile→Cosmile DB).
- **필수 필드:** `message_id`(PK) · `session_id`(FK) · `seq`/`ts` · `role`(user|ai|system) · `content`(raw 원문·★service-local·at-rest 암호화/접근통제) · `content_hash`(HMAC/keyed).
- **nullable:** `pii_flags`·`derived_facts`·`deleted_at`.
- **key/index:** PK `message_id` · idx `(session_id, seq)`.
- **consent/retention/delete:** 적용. · **raw/PII:** ★**raw 포함**(서비스-local only). · **Foundation 전달:** **불가**(원문 절대 미전송·content_hash/summary refs만).
- **SIASIU 매핑:** `episode{text→content, role→role, ts}` 승격. · **Cosmile 매핑:** **신규 model**(현 서버 원문저장 0·sessionStorage만 → 서버 raw 저장 governance 전환·W24 at-rest 암호화 필수).
- **note:** opt-B 확정. Foundation-only(서버 raw 미전송) 원칙과 무충돌(서비스 자체 저장은 별개·at-rest 보안 필수).

### 3.3 EpisodeSummary
- **목적:** 세션 요약(원문❌·refs/enum). · **소유자:** 발생 서비스.
- **필수 필드:** `summary_id`(PK) · `session_id` · `subject_ref` · `content_hash`(keyed) · `intent_types` · `risk_level`.
- **nullable:** `product_refs`·`ingredient_atom_refs`·`deleted_at`/`expires_at`.
- **key/index:** PK `summary_id` · idx `(subject_ref)`.
- **consent/retention/delete:** 적용. · **raw/PII:** ★**미포함**(summary_text 평문 제외·refs/hash만). · **Foundation 전달:** **가능**(refs만·memory_context episode_summary_refs).
- **SIASIU 매핑:** episode 파생(신설). · **Cosmile 매핑:** 신설(ConsultationSessionMeta의 mentionedProductIds/intentTypes/riskLevel 정합).
- **note:** additive. content_hash = HMAC/per-service salt.

### 3.4 MemoryFactCandidate
- **목적:** 추출된 fact 후보(gate 대기·아직 LTM 아님). · **소유자:** 발생 서비스.
- **필수 필드:** `candidate_id`(PK) · `subject_ref` · `type`(FactTypeRegistry) · `norm_value` · `source_ref`(episode/summary) · `gate_decision`(None until gated) · `consent_scope` · `sensitivity_level`.
- **nullable:** `confidence`·`value_display`(raw·service-local)·`deleted_at`.
- **key/index:** PK `candidate_id` · idx `(subject_ref, type)`.
- **consent/retention/delete:** 적용(gate 통과 전 재사용 0). · **raw/PII:** value_display만 raw(service-local). · **Foundation 전달:** 불가(gate 전).
- **SIASIU 매핑:** 현행 `extract`(compute-only) → candidate row persist(신설). · **Cosmile 매핑:** 신설.
- **note:** semantic=AI 추출·policy=rule gate 분리(§헌법 정합).

### 3.5 LongTermMemoryFact
- **목적:** 확정 고객 장기 사실(개인화·재현·안전). · **소유자:** 발생 서비스(**정본**).
- **필수 필드:** `fact_id`(PK) · `subject_ref` · `type` · `norm_value` · `status` · `fact_state`(active|superseded|deleted|blocked|expired) · `is_safety` · `source_ref` · `consent_scope` · `retention_policy` · `sensitivity_level`.
- **nullable:** `value_display`(raw·service-local)·`confidence`·`as_of`·`reconfirmed`/`reconfirmed_at`·`deleted_at`/`expires_at`.
- **key/index:** ★**upsert 규칙 §5** — 다중값 `(subject_ref,type,norm_value)` UNIQUE · SINGLE `(subject_ref,type)` procedural supersede(SINGLE에 norm_value UNIQUE 금지).
- **consent/retention/delete:** 적용(3-state must_not_reappear). · **raw/PII:** value_display만 raw(service-local). · **Foundation 전달:** **가능(refs만)** — type/norm_value/atom/fact_state·**value_display 평문 제외**.
- **SIASIU 매핑:** `memory_fact` **확장**(+subject_ref·consent/retention·3-state·reconfirm·deleted_at/expires_at·source_ref). · **Cosmile 매핑:** **신설**(현 부재).
- **note:** SIASIU 보존 규칙(SINGLE supersede·안전 즉시 active 영구·90일 약화) 현행 유지.

### 3.6 CustomerProfile
- **목적:** 고객 프로필(display_name·locale·선호·색·연령대·라이프스타일). · **소유자:** 발생 서비스.
- **필수 필드:** `subject_ref`(PK) · `service_id` · `consent_scope` · `retention_policy`.
- **nullable:** `display_name`(★PII·암호화/consent)·`locale`·`skin_type_ref`·`goal_refs`·`personal_color`·`age_range`·`lifestyle_refs`·`deleted_at`.
- **key/index:** PK `subject_ref`.
- **consent/retention/delete:** 적용. · **raw/PII:** ★display_name = PII(암호화/consent·at-rest). · **Foundation 전달:** refs/enum만(display_name 제외).
- **SIASIU 매핑:** `user` + `foundation_state_v1`(client localStorage 평문) **서버화 선택**(서버화 시 subject_ref keying+consent+암호화·W18/W24). · **Cosmile 매핑:** **최초 고객 프로필 model**(신설).
- **note:** display_name 서버 저장 시 at-rest 암호화 필수(별도 보안 train).

### 3.7 CommerceMemory (overlay)
- **목적:** cart/order/purchase/상품행동 기억. · **소유자:** 발생 서비스.
- **구현:** 신규 테이블 아님 — 기존 Cart/Order/Wishlist/CommerceEvent/AlertSubscription에 **additive 컬럼**: `subject_ref`·`properties_sanitized`·`privacy_level`·`consent_scope`·`retention_policy`·`deleted`/`blocked`·`expires_at`.
- **필수 필드(오버레이):** `subject_ref`·`consent_scope`·`retention_policy`. · **nullable:** privacy_level·deleted/blocked·expires_at.
- **consent/retention/delete:** 적용. · **raw/PII:** 미포함(주소/전화/이메일 컬럼 없음·properties_sanitized 강제). · **Foundation 전달:** commerce_signal_refs(sanitized enum/ref만).
- **SIASIU 매핑:** ★**schema-available / 미populate**(commerce 축 부재 = 계약 위반 아님·§8). · **Cosmile 매핑:** **full populate**(Cart/Order/Wishlist/CommerceEvent overlay).
- **note:** `sanitizeProperties`(piiPolicy)가 강제 기반.

### 3.8 ConsentRecord (ledger)
- **목적:** 동의 grant/withdrawal 영속 audit(3-state·erasure 근거). · **소유자:** 발생 서비스.
- **필수 필드:** `consent_id`(PK) · `subject_ref` · `consent_scope` · `state`(granted|withdrawn) · `version` · `granted_at`.
- **nullable:** `withdrawn_at`·`sensitive_categories`·`audit_ref`.
- **key/index:** PK `consent_id` · idx `(subject_ref, consent_scope)`.
- **consent/retention/delete:** 자체가 consent 정본(withdrawal→block→delete 전파). · **raw/PII:** 미포함. · **Foundation 전달:** consent_flags(enum)만.
- **SIASIU 매핑:** **신설**(현 전무). · **Cosmile 매핑:** **신설**(`AlertSubscription.consentStatus` 부분 원천).
- **note:** cross_service consent enum은 schema-available이나 **v1 미사용**(cross-service 범위 밖).

### 3.9 SubjectRefMap (★service-local only)
- **목적:** 한 서비스 내부 `subject_ref ↔ furef_local_ref ↔ (guest_ref/anonymousId)` 매핑. · **소유자:** 발생 서비스.
- **필수 필드:** `subject_ref`(PK) · `furef_local_ref`(furef_v2_) · `service_id` · `allow_link`(BOOL).
- **nullable:** `guest_ref`/`anonymousId_ref`·`merged_from`·`deleted_at`.
- **key/index:** PK `subject_ref` · idx `furef_local_ref` · idx `guest_ref`.
- **consent/retention/delete:** 적용(가명 PII governance·erasable).
- **raw/PII:** ★**furef/subject_ref = 가명(pseudonymous) 개인정보**(익명 아님·삭제/동의 대상). · **Foundation 전달:** 불가(subject_ref는 memory_context에도 미전송 권장 — Foundation은 broker 아님).
- **★service-local only:** SIASIU subject_ref와 Cosmile subject_ref를 **연결하지 않는다**(cross-service join table 아님). `allow_link` = **service-local guest→user 병합에만** 사용. cross-service allow_link/broker = **v1 범위 밖**.
- **SIASIU/Cosmile 매핑:** 신설(양쪽). Cosmile `furef_v2`(3ba91e0)·Foundation subject_ref v2(c9bb996)가 파생 원천.

## 4. FactTypeRegistry / taxonomy (★default-deny)
| type | 분류 | 카디널리티 | 안전 | note |
|---|---|---|---|---|
| preference | 선호 | 다중값 | - | |
| concern (**alias: condition**) | 고민/상태 | 다중값 | - | ★CDM `condition`↔shared `concern` alias 정합(W12) |
| reaction | 반응 | 다중값 | sensitive | |
| decision_history | 결정이력 | 다중값 | - | |
| outcome_feedback | 피드백 | 다중값 | - | |
| safety_note | 안전메모 | 다중값 | **SAFETY** | |
| skin_type | 피부타입 | SINGLE | - | supersede |
| avoid_ingredient | 회피성분 | 다중값 | **SAFETY** | 즉시 active·영구 |
| allergy | 알레르기 | 다중값 | **SAFETY**(특수범주) | |
| pregnancy_nursing | 임신/수유 | **SINGLE ∩ SAFETY** | **SAFETY** | ★immutable 아님(재진술 supersede 허용·§5) |
| goal | 목표 | 다중값 | - | |
| personal_color | 퍼스널컬러 | SINGLE | - | |
| age_range | 연령대 | SINGLE | - | |
| lifestyle | 라이프스타일 | 다중값 | - | |
- ★**default-deny:** registry에 없는 type은 **거부(invalid_memory_kind)**. 3자(brain.py·CDM·shared MEMORY_KINDS) 불일치는 이 registry를 canonical로 정합(W12/W13).

## 5. LongTermMemoryFact upsert 규칙
- **다중값 타입:** UNIQUE `(subject_ref, type, norm_value)` — 같은 값 재진술 = 갱신, 다른 값 = 병존.
- **SINGLE 타입:** UNIQUE `(subject_ref, type)` + **procedural supersede**(새 값이 이전 값을 supersede·이전은 fact_state=superseded).
- ★**SINGLE 타입에 `(subject_ref, type, norm_value)` UNIQUE 부여 금지**(현 brain.py upsert_fact 로직과 동일 — SINGLE에 norm_value UNIQUE 주면 supersede 깨짐).
- ★**pregnancy_nursing = SINGLE ∩ SAFETY** — 안전이라 즉시 active·보호 MAX이나 **immutable 아님**(재진술/reconfirm으로 supersede 허용).

## 6. Consent / Retention / Delete
- **consent_scope enum:** `none | same_service | cross_service | foundation_only`. ★`cross_service`는 schema-available이나 **v1 미사용**(cross-service 범위 밖).
- **retention_policy enum:** `session | short_ttl | standard_ttl | revocable`. ★TTL 실기간·`expires_at`·auto-sweep = M4 확정(W8). `is_safety=true` → **auto-expire override**(안전 fact 무기한·§5).
- **3-state:** `deleted | blocked | expired` + `fact_state`. **must_not_reappear**(deleted/blocked/expired는 recall/memory_context에서 재등장 0).
- **is_safety override:** 안전 fact는 auto-decay/auto-expire 제외(보호 MAX). ★단 same-service **보호 게이팅**에만 우회 — cross_service consent gate는 우회 불가(v1엔 cross_service 자체가 범위 밖).
- **ConsentRecord ledger:** grant/withdrawal/version/audit 영속(§3.8). withdrawal→block→delete 전파.
- ★**erasure = service-local only:** 각 서비스 내 store + 파생물(content_hash/summary/evidence_refs) + service-local SubjectRefMap 폐기. **Foundation은 고객기억 미저장 → erasure 대상 아님.** cross-service erasure propagation = **v1 범위 밖(future)**.
- ★**guest→subject merge = service-local only:** SIASIU guest→SIASIU subject · Cosmile guest→Cosmile subject · **SIASIU↔Cosmile 병합 없음**. `allow_link=false` → 병합 거부.

## 7. SubjectRefMap (요약·§3.9 상세)
- ★**service-local only.** SIASIU subject_ref와 Cosmile subject_ref **연결 금지**.
- furef/subject_ref = **pseudonymous PII**(익명 아님·삭제/보존/동의 대상·secretless SHA256은 열거→복원 가능).
- `allow_link` = **service-local guest→user 병합에만** 사용.
- ★**cross-service allow_link/broker = v1 범위 밖**(future release train).

## 8. CommerceMemory (요약·§3.7 상세)
- **Cosmile = full populate** · **SIASIU = schema-available / populate-conditional**(commerce 축 부재).
- ★**SIASIU commerce 부재 = 계약 위반 아님**(9엔티티 계약은 schema-available·commerce만 조건부 populate).

## 9. P1/P2/P3 관계
- ★**Cosmile P1/P2 = M4 구현 전 동반패치 필요:** P1 `foundation_decision_received`(userId+foundation_trace_id 동일 row) · P2 `FoundationSignalOutbox`(raw canonicalUserId/anonymousId).
- ★**SIASIU P3 = 별도 patch:** `logins.txt` raw email/name(memory 스키마 밖·같은 방향).
- ★**trace_id ↔ raw identity same row 금지:** FRC/foundation_trace_id는 로컬 record에 hashing 또는 미저장·identity는 opaque subject_ref(userId XOR anonymousId 분리).
- ★**payload_refs only:** FoundationSignalOutbox raw id → refs/atom/enum `payload_refs`로 대체.

## 10. 구현 전 blockers (M1 consolidation B1~B7)
- **B1** `1ce099e` readiness adapter 소재 확인(Cosmile 선결·CLAUDE.md baseline 164/164 discrepancy).
- **B2** Cosmile P1/P2 de-anon 동반패치.
- **B3** subject_ref v2 gate 배선(Foundation W16) + prod secret 배포.
- **B4** Foundation ingress default-deny gate(W26).
- **B5** opt-B raw 상담원문 at-rest 암호화/접근통제(W24).
- **B6** SIASIU consent/expiry/delete 컬럼·reset per-fact·user_id email keying(W1/W2/W3).
- **B7** 본 M2 계약 확정(field-level enum·TTL·3-state) — 본 문서.
- ★전부 additive·flag OFF·shadow·rollback 가능.

## 무결성
코드 변경 0 · migration 0 · source push 0 · raw 고객데이터/secret 미열람 · 예시는 fake/synthetic만. Control verdict 상한 = DESIGN_READY(Fable5 FINAL_PASS 필요).
