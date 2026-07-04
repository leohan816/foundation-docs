# COMMON SERVICE MEMORY CONTRACT V1 (M2) — field-level 계약

> 작성: foundation-control · 2026-07-04 · **상태: DESIGN (M2 계약 문서 · 구현 전 · v1.1)** · Control verdict 상한 = DESIGN_READY · 최종 FINAL_PASS = Fable5/독립 reviewer.
> ★**v1.1 = Fable5 PATCH_REQUIRED(D-1~D-14) 반영:** fact_state 직교 상태머신(D-2)·SINGLE upsert partial index(D-3)·EpisodeSummary summary_text 복원(D-4)·MemoryFactCandidate status enum(D-5)·pregnancy_nursing SAFETY∩SINGLE supersede 우선(D-8)·opt-B at-rest 보안 §11(D-6)·consent write-gate(D-7)·P1/P2/P3 semantics §9(D-10)·V0 SUPERSEDED §12(D-11)·adapter v0 재작성 §13(D-12)·migration train §14(D-13)·V3-ready §15(O)·B1~B14(N).
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

### 3.3 EpisodeSummary  ★D-4 정정(Fable5)
- **목적:** 세션 요약(고객 재열람 저장 + Foundation 전달용 refs). · **소유자:** 발생 서비스.
- **필수 필드:** `summary_id`(PK) · `session_id` · `content_hash`(keyed) · `intent_types` · `risk_level`.
- **nullable:** `subject_ref`(★게스트 세션 = **null**·`guest_ref` 보완) · `summary_text`(★**service-local 저장 가능**·고객 재열람용) · `product_refs`·`ingredient_atom_refs`·`deleted_at`/`expires_at`.
- **key/index:** PK `summary_id` · idx `(subject_ref)` · idx `(session_id)`.
- **consent/retention/delete:** 적용. · **raw/PII:** ★**`summary_text`는 service-local 저장 가능**(고객 재열람)이나 **Foundation 전달 금지**. "저장 금지"가 아니라 "**Foundation 전달 금지 · 서비스 저장 가능**"으로 분리(D-4). · **Foundation 전달:** refs만(summary_id/content_hash/intent/risk·**summary_text 제외**).
- **SIASIU 매핑:** episode 파생(신설). · **Cosmile 매핑:** 신설(ConsultationSessionMeta의 mentionedProductIds/intentTypes/riskLevel 정합).
- **note:** additive · content_hash = HMAC/per-service salt · subject_ref nullable(게스트).

### 3.4 MemoryFactCandidate  ★D-5 정정(Fable5)
- **목적:** 추출된 fact 후보(gate 대기·아직 LTM 아님). · **소유자:** 발생 서비스.
- **필수 필드:** `candidate_id`(PK) · `type`(FactTypeRegistry) · `norm_value` · `source_ref`(episode/summary·`derived_from_message_ids` provenance) · **`status`(candidate|approved|rejected)** · **`fact_state`(hypothesis|active)** · `raw_text_stored`(=**false** 불변) · `consent_scope` · `sensitivity_level`.
- **nullable:** `subject_ref`(★게스트 = **null**) · **`guest_ref`**(subject_ref null 시 세션/디바이스 참조) · `gate_decision`(**enum: null(미판정)|allow|block|session_only|ask_consent** — 무enum 표현 금지) · `confidence`·`value_display`(raw·service-local)·`deleted_at`.
- **key/index:** PK `candidate_id` · idx `(subject_ref, type)`.
- **consent/retention/delete:** 적용(gate 통과 전 재사용 0). · **raw/PII:** ★`raw_text_stored=false`(원문 미저장)·value_display만 raw(service-local). · **Foundation 전달:** 불가(gate 전).
- **SIASIU 매핑:** 현행 `extract`(compute-only) → candidate row persist(신설). · **Cosmile 매핑:** 신설.
- **note:** ★D-5(b) 3축 역할 분리(anchor J-1 정합): **`status`(candidate/approved/rejected)=후보 승인 lifecycle** · **`fact_state`(hypothesis→active)=신뢰도 축**(hypothesis 축 복원) · **`gate_decision` enum=gate 판정 결과**. subject_ref nullable(게스트=guest_ref).

### 3.5 LongTermMemoryFact  ★D-2 정정(Fable5·직교 상태머신)
- **목적:** 확정 고객 장기 사실(개인화·재현·안전). · **소유자:** 발생 서비스(**정본**).
- **필수 필드:** `fact_id`(PK) · `subject_ref`(**nullable**·게스트=null) · **`guest_ref`**(★subject_ref NULL 시 세션/디바이스 참조·subject_ref XOR guest_ref 중 하나 필수·NEW-1) · `type` · `norm_value` · **`fact_state`(active|hypothesis|superseded)** · `is_safety` · `source_ref` · `consent_scope` · `retention_policy` · `sensitivity_level`.
- **★직교 3-state flag(fact_state와 독립·BOOL):** `deleted` · `blocked` · `expired`. → **`superseded ∧ deleted` 등 동시 표현 가능**(anchor §J-2 모델). ★`hypothesis`(신뢰도 축적 중·0.40→active 0.60) 소실 금지.
- **nullable:** `value_display`(raw·service-local)·`confidence`·`as_of`·`reconfirmed`/`reconfirmed_at`·`deleted_at`/`expires_at`.
- **key/index:** ★**upsert 규칙 §5** — 다중값 **partial UNIQUE** `(subject_key,type,norm_value) WHERE deleted=false AND blocked=false` · SINGLE = **DB `UNIQUE(subject_key,type)` 금지**(procedural supersede 또는 partial index **`WHERE fact_state='active' AND deleted=false AND blocked=false`**·★D-3 REGRESSION 정정). ★**guest(subject_ref NULL·NEW-1):** `subject_key = COALESCE(subject_ref, guest_ref)`로 partial unique 적용(NULL별 충돌·오병합 방지) · guest fact는 §N-5 병합 시 subject_ref로 **재키잉(merge/supersede)** · 미동의(allow_link=false) 시 guest_ref 유지·병합 거부.
- **consent/retention/delete:** 적용(deleted/blocked/expired must_not_reappear). · **raw/PII:** value_display만 raw(service-local). · **Foundation 전달:** **가능(refs만)** — type/norm_value/atom/fact_state·**value_display 평문 제외**.
- **SIASIU 매핑:** `memory_fact` **확장**(+subject_ref·consent/retention·fact_state·3-state flag·reconfirm·deleted_at/expires_at·source_ref). · **Cosmile 매핑:** **신설**(현 부재).
- **note:** ★"현행 brain.py와 동일" 주장 **삭제**(D-8). SINGLE supersede·SAFETY∩SINGLE 분기 순서는 §5 **신규 규칙**(M4 SIASIU brain.py 분기 순서 변경 포함).

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
- **구현:** 신규 테이블 아님 — 기존 Cart/Order/Wishlist/CommerceEvent/AlertSubscription에 **additive 컬럼**: `subject_ref`·`properties_sanitized`·`privacy_level`(★enum 정본 `anonymous`\|`user_consented`\|`aggregated`·앵커·M3 §4 동일)·`consent_scope`·`retention_policy`·`deleted`/`blocked`·`expires_at`.
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
- **필수 필드:** `subject_ref`(PK) · `furef_local_ref`(furef_v2_) · `service_id` · `allow_link`(BOOL) · `consent_scope` · `retention_policy`. (★D-5: anchor M-2 컬럼 복원)
- **★직교 3-state:** `blocked`(BOOL) · `deleted`(BOOL). · **nullable:** `guest_ref`/`anonymousId_ref`·`merged_from`·`expires_at`·`deleted_at`.
- **key/index:** PK `subject_ref` · idx `furef_local_ref` · idx `guest_ref`.
- **★`allow_link` 단일-목적(REF-2 WATCH):** guest→user 병합 여부만 인코딩 — **미래에 다른 consent 목적으로 silent repurpose 금지**(purpose는 §15 ConsentRecord.purpose로 분리). 동일 고객이 양 서비스에서 별개 subject_ref로 발산하는 것은 v1 정상(cross-service 미연결).
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
| goal | 목표 | **SINGLE** | - | ★D-5 정정: anchor·brain.py = SINGLE(다중값 아님) |
| personal_color | 퍼스널컬러 | SINGLE | - | |
| age_range | 연령대 | SINGLE | - | |
| lifestyle | 라이프스타일 | 다중값 | - | |
- ★**default-deny:** registry에 없는 type은 **거부(invalid_memory_kind)**. 3자(brain.py·CDM·shared MEMORY_KINDS) 불일치는 이 registry를 canonical로 정합(W12/W13).
- ★**sensitivity_level enum 정합(D-5/CONS-8):** `low | normal | sensitive | high`(V0 4값 기준으로 anchor/M2/M3/V0 **통일**). reaction/concern(condition alias)/safety_note/allergy/pregnancy_nursing = sensitive↑.
- ★`goal` 카디널리티는 anchor·brain.py와 재검토 후 **SINGLE 확정**(supersede 대상).

## 5. LongTermMemoryFact upsert 규칙  ★D-3/D-8/D-9 정정(Fable5)
- **다중값 타입:** **partial UNIQUE** `(subject_ref, type, norm_value) WHERE deleted=false AND blocked=false` — 같은 값 재진술=갱신·다른 값=병존. ★**soft-delete row는 key 미점유**(D-9): 삭제 후 자발 재진술 = 새 active INSERT 허용(단 `must_not_reappear`는 gate가 재사용을 별도 차단 — 저장 허용 ≠ 자동 재노출).
- **SINGLE 타입:** ★**DB `UNIQUE(subject_key, type)` 고정 금지**(D-3) — 이력 보존(superseded row)과 새 active row 공존이 깨진다. 대신 **① procedural supersede** 또는 **② partial unique index `WHERE fact_state='active' AND deleted=false AND blocked=false`**(★D-3 REGRESSION 정정: `active∧deleted` 소프트삭제 row가 SINGLE 키를 점유하지 않도록 — 삭제 후 재진술 INSERT 충돌·pregnancy 삭제→재진술 저장 실패 방지)(active ≤1 유일·superseded/deleted 이력은 무제한 보존).
- ★**SINGLE 타입에 `(subject_ref, type, norm_value)` UNIQUE 금지**(supersede 파괴).
- ★**SAFETY ∩ SINGLE (pregnancy_nursing) — 신규 규칙(D-8·FACT-1):** ~~"현 brain.py와 동일"~~ **주장 삭제.** **safety insert 분기보다 SINGLE supersede를 우선 적용**한다. (현행 brain.py는 safety 분기가 SINGLE 분기보다 먼저 return → 새 norm_value(임신중→임신아님)가 supersede 없이 **2번째 active로 INSERT = 모순 안전 fact 2건 동시 active**.) → ★**M4 SIASIU 작업에 brain.py 분기 순서 변경(SINGLE supersede first) 포함.** ★**상충 pregnancy_nursing active fact 2건 동시 존재 금지**(active ≤1 불변).
- ★**pregnancy_nursing 시간유한성(D-9·재확인 주기/max-age 초안):** immutable 아님. **max-age 경과(초안 ~300일) 시 `reconfirm_required`** → 재확인 없으면 active→hypothesis(안전 보호는 유지하되 stale 임신 fact 무기한 active 방지). 실기간은 M4 확정(W8·W14 임신 특수성 명시).

## 6. Consent / Retention / Delete
- **consent_scope enum:** `none | same_service | cross_service | foundation_only`. ★`cross_service`는 schema-available이나 **v1 미사용**(cross-service 범위 밖).
- **retention_policy enum:** `session | short_ttl | standard_ttl | revocable`. ★TTL 실기간·`expires_at`·auto-sweep = M4 확정(W8). `is_safety=true` → **auto-expire override**(안전 fact 무기한·§5).
- **3-state:** `deleted | blocked | expired` + `fact_state`. **must_not_reappear**(deleted/blocked/expired는 recall/memory_context에서 재등장 0).
- **is_safety override:** 안전 fact는 auto-decay/auto-expire 제외(보호 MAX). ★단 same-service **보호 게이팅**에만 우회 — cross_service consent gate는 우회 불가(v1엔 cross_service 자체가 범위 밖).
- **ConsentRecord ledger:** grant/withdrawal/version/audit 영속(§3.8). withdrawal→block→delete 전파.
- ★**consent write-gate (D-7·신규):** **ConversationMessage raw 저장은 사전 granted ConsentRecord를 요구**한다 — grant 없으면 raw 원문 저장 **금지 또는 session-only 처리**(영속 미저장). ★**기존 SIASIU row backfill 기본값:** 사전 동의 레코드 없는 기존 episode는 backfill 시 `consent_scope=same_service`·retention=standard_ttl로 default, ★단 **cross_service·학습투입(purpose) 목적은 기본 grant 아님**(§15 purpose 분리). withdrawal 시 block→delete 전파.
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

## 9. P1/P2/P3 관계  ★D-10 정정(Fable5·동반패치 semantics 확정)
- ★**동반패치 semantics(1문장 확정):** **P1·P2·P3는 M4 구현과 원자적으로 묶인 동반 patch이며, 각 서비스 memory 정렬 커밋은 해당 P-patch 없이 먼저 merge/live 되지 않는다**(별도 train도·사후도 아님 = **M4 동반·M4 선행조건**).
- ★**Cosmile P1/P2:** P1 `foundation_decision_received`(userId+foundation_trace_id 동일 row) · P2 `FoundationSignalOutbox`(raw canonicalUserId/anonymousId) → **M4 Cosmile 커밋과 동반**(B2).
- ★**SIASIU P3 (gate 결속):** `logins.txt` raw email/name sink → **B13(P3 gate 결속)에 편입** — M4 이후 무기한 잔존 금지(기한·게이트 = SIASIU-AUTH-PII-PATCH-01).
- ★**trace_id ↔ raw identity same row 금지 · payload_refs only:** FRC/foundation_trace_id는 로컬 record에 **keyed-hash 또는 미저장**(★미저장 선택 시 V3 attribution join key 소실 주의·§15) · identity=opaque subject_ref(userId XOR anonymousId) · outbox raw id → `payload_refs`(refs/atom/enum).

## 10. 구현 전 blockers (★D-11~D-13·N 개정 — B1~B14)
- **유지:** **B1** `1ce099e` 소재 확인 · **B2** Cosmile P1/P2 동반패치 · **B3** subject_ref v2 gate 배선+prod secret 배포 · **B4** Foundation ingress **신규 default-deny gate**(D-1·"재사용"→"신규 스펙", M3 §7) · **B8** retention TTL 실기간·expires_at·auto-sweep 확정 · **B9** taxonomy 3자 정합(FactTypeRegistry canonical).
- **수정:** **B5** opt-B raw at-rest 보안 = **§11 최소 스펙 문서를 exit criteria로**(W24 지위 통일·D-6). · **B6** SIASIU = "M4 산출물"(consent/delete 컬럼·reset)과 "**M4 선행 설계 확정**(brain.py 분기 순서·§5 D-8)"을 **분리**(순환 해소). · **B7** = **M2 개정판(본 문서)** 으로 재확정.
- **신설(D-11~D-13·D-7·D-10):** **B10** V0 계약 **SUPERSEDED** 선언(§12·D-11) · **B11** Memory Candidate Adapter v0 관계 정의 + keyed hash 정합(§13·D-12·W25) · **B12** M4 migration release train 요건(§14·D-13) · **B13** P3 gate 결속 + 동반패치 semantics 확정(§9·D-10) · **B14** consent write-gate + backfill 정책(§6·D-7).
- ★전부 additive·flag OFF·shadow·rollback 가능(구조적 blocker 아님).

## 11. opt-B raw 상담원문 at-rest 보안 스펙 (★D-6·B5 exit criteria)
서버 raw ConversationMessage.content(및 CustomerProfile.display_name) 저장의 최소 보안 스펙(B5 완료 조건):
- **at-rest encryption 최소 스펙:** raw content 컬럼 **암호화 저장**(AES-256-GCM 등 authenticated)·평문 저장 금지. dev SQLite 평문은 **위험 명시·별도 보안 train까지 raw 저장 flag OFF**.
- **key ownership / rotation:** 암호화 키는 **server-side secret store(KMS 또는 env secret)** 소유·서비스별·**rotation 정책**(주기·재암호화)·★키 값 문서/로그/코드 출력 0.
- **접근 권한 모델:** raw content 조회 = **최소권한**(고객 본인 재열람 경로 + 명시 감사된 운영 접근만)·서비스 간 접근 0.
- **접근 감사로그:** raw 조회/복호화마다 audit(누가·언제·목적)·PII 미기록.
- **raw 원문 보존기간:** 결정 #2 "장기보관"과 retention TTL 관계 확정 — **기본 standard_ttl** + 고객 삭제권 우선(withdrawal→delete). 무기한 아님(재확인/파기 주기).
- **파기 절차:** 삭제/만료 시 **암호화 파기(crypto-shredding 또는 row delete)**·파생물(content_hash는 keyed·재열람 불가) 정리.
- ★**exit criteria:** 위 6항 스펙 문서 확정 + dev 평문 위험 처리 = **B5 완료**. 미충족 시 opt-B raw 저장 live 금지.

## 12. V0 계약 퇴역 (★D-11·B10 SUPERSEDED)
- `foundation-control/contracts/CROSS_PLATFORM_SHARED_MEMORY_CONTRACT_V0.md`를 **V1 기준 `SUPERSEDED`로 선언**한다.
- ★**모순:** V0는 "**Foundation이 memory 저장·gate·identity·consent/scope/retention 소유**"(V0 §매핑·"Foundation = 해석·memory 도출·gate·저장·identity·consent 소유") = **V1 결정 #5(Foundation 고객 LTM 미저장)·#10(no-broker)와 정면 모순**. subject_ref도 V0=Foundation-owned vs V1=service-local.
- ★V0의 enum(consent_scope/retention_policy)만 **참고**하되 **소유·저장·broker 모델은 폐기**. `U-M2 "V0와 enum 일치"` 검증은 **"V1 정본과 정합"으로 대체**(모순 계약과의 일치는 무의미).
- **B10** = V0 SUPERSEDED 선언·헤더 상태 표기(별도 patch·해당 문서 소관).

## 13. Memory Candidate Adapter v0 관계 (★D-12·B11)
- SIASIU `app/ssbrain/foundation_memory_candidate_adapter.py`(d0f8dc3)는 (a) **모순된 V0 계약에 정합**하고 (b) **unsalted `sha256(...)` + 하드코딩 `_DEV_SALT="siasiu_dev_shadow_salt_v0"` + `subj_`+hash[:16](64-bit)** 사용 → ★**W25(keyed/per-service salt) + subject_ref v2(subj_v2_ HMAC 128-bit) 위반**(현재 shadow·flag OFF).
- ★**결정 = 재작성(rewrite):** 신규 MemoryFactCandidate(§3.4)·SubjectRefMap(§3.9·subj_v2_) 계약으로 **재작성**한다(승계·잔존 아님). unsalted sha256·하드코딩 salt·64-bit subj_ 제거 → keyed HMAC(secret)·subj_v2_[:32]·per-service salt.
- **B11** = adapter v0 ↔ 신규 MemoryFactCandidate 관계 정의(재작성) + keyed hash 정합(W25) blocker.

## 14. M4 migration release train 요건 (★D-13·B12)
- M4는 **실고객 데이터가 든 SIASIU `memory.db` 최초 스키마 migration**이므로 별도 release train 요건 필수:
  - **backup**(migration 전 memory.db 백업) · **dry-run**(스키마 변경 시뮬·데이터 무손실 검증) · **rollback rehearsal**(되돌리기 리허설) · **migration plan**(단계·검증·중단조건) · **Leo 승인 gate**(실 migration 전).
- ★본 M2/M3는 **migration을 수행하지 않는다**(design-only). additive 컬럼도 실 migration은 M4 train·Leo 승인 후.
- **B12** = M4 migration release train 요건 문서화 blocker.

## 15. V3-ready 보강 (★O·Fable5 G — additive seam)
- **ConsentRecord `purpose` 축 추가(검토):** `consent_scope`(공유 범위)와 별개로 **`purpose`** = `personalization_reuse | learning_input | analytics | support_replay` — 개인화 재사용 vs 학습 투입 vs 분석 vs 지원 재생 동의를 **분리**(현 scope는 범위만 인코딩·silent repurpose 방지·§3.9 allow_link 단일목적과 연결).
- **erasure 파생물에 learning output(un-learning) 포함:** erasure 대상 = content_hash/summary/evidence_refs **+ 학습 산출물(추천 모델 반영분)** — must_not_reappear가 추천/학습 출력까지 커버(un-learning 정의).
- **attribution join key 고정:** P1의 "keyed-hash 또는 미저장" 중 **미저장 선택 시 V3 feedback loop join key 소실** → **keyed-hash(HMAC·per-service) 저장을 V3 전제 후보로 고정**(raw trace_id 저장 아님·de-anon 없이 attribution 유지). **FRC `memory_reuse_decision`(W15) 선행 필요**.

## 무결성
코드 변경 0 · migration 0 · source push 0 · raw 고객데이터/secret 미열람 · 예시는 fake/synthetic만 · 구현 지시 없음(계약 서술). Control verdict 상한 = DESIGN_READY(Fable5 FINAL_PASS 필요).
