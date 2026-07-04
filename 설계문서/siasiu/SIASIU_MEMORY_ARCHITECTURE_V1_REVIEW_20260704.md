# SIASIU-side Review — Foundation Service Memory Architecture V1 (v0.3-revised) — 상태: **PASS (SIASIU = viable reference · additive only)**

> 작성: 샤슈(SIASIU) · 2026-07-04 · ★read-only 검증 · 코드 수정 0 · migration 0 · source push 0 · raw 고객데이터/secret 미열람.
> 대상: `foundation-control/docs/FOUNDATION_SERVICE_MEMORY_ARCHITECTURE_V1_20260704.md` v0.3-revised (738줄·A~W).
> 대조 근거: SIASIU 실제 스키마(memory.db: episode·memory_fact·user·fact_type_registry) · recall/reset · answer.py fingerprint `d7f579443f8a110a` · CUTOVER-01(furef_v2_·session_context={}) · MEMORY_INVENTORY_AUDIT(P3 logins.txt).

## 0. Verdict
**PASS** — SIASIU는 Common Service Memory Contract의 **reference 구현으로 적합**하다. 필요한 모든 변경이 **additive**(기존 episode/memory_fact/user 유지·컬럼 가산·신규 엔티티 추가)이며 기존 recall/reset/answer.py fingerprint를 깨지 않는다. 단 **몇몇 항목은 설계가 mechanism만 제공하고 실제 제거/구현은 후속(PATCH_REQUIRED)** — 아래 항목별.

## 1. episode → ConversationMessage 매핑 (§I-2)
**가능 · additive.**
- SIASIU `episode{id, user_id, ts, role(user|ai), text}` → `ConversationMessage{id, session_id, seq/ts, role(user|ai|system), content}`.
- 매핑: `text→content` · `role→role`(user|ai 그대로·system은 미사용) · `ts→ts`.
- 신규 필요: `session_id`(ConversationSession 그룹핑·신설) · `content_hash`(HMAC/keyed·per-service) · `pii_flags` · `derived_facts`.
- ★episode는 append-only 원문 평문 — 계약은 원문 폐기 강제 안 함(고객 재열람). Foundation 방향으론 content_hash/summary refs만. **결론: episode를 ConversationMessage로 승격(또는 ConversationSession으로 묶기) 가능·기존 episode read(recall) 무영향.**

## 2. memory_fact → LongTermMemoryFact 확장 (§J-2)
**가능 · additive(문서가 명시적으로 "SIASIU memory_fact 확장").**
- 유지: id·type·value·note·confidence·as_of·status·fact_state·is_safety·source_episode_id·norm_value·created_at/updated_at.
- 신규 가산: `subject_ref`(user_id 대체 keying) · `source_ref` · `consent_scope` · `retention_policy` · `sensitivity_level` · `deleted/blocked/expired`(3-state) · `reconfirmed/reconfirmed_at` · `deleted_at/expires_at`.
- ★upsert 키 규칙 준수 가능: 다중값=`(subject_ref,type,norm_value)` · SINGLE=`(subject_ref,type)` 절차적 supersede. **경고 정합**: SINGLE 타입에 `(subject_ref,type,norm_value)` UNIQUE 부여 금지(현 brain.py upsert_fact 로직과 동일). 
- 보존 규칙(2번 규칙·SINGLE supersede·안전 즉시 active 영구·90일 약화) 전부 **현행 유지**. **결론: 컬럼 가산만·기존 fact 판단/보존 로직 무변경.**

## 3. EpisodeSummary / MemoryFactCandidate / CustomerProfile / ConsentRecord / SubjectRefMap 추가 (§I-3·J-1·K·N-1·M-2)
**가능 · 전부 신설(additive·기존 테이블 무영향).**
- EpisodeSummary(§I-3): 신설·episode에서 파생(원문❌·summary refs). 
- MemoryFactCandidate(§J-1): SIASIU 현행 `extract`(compute)를 candidate row로 persist하는 신설. 
- CustomerProfile(§K): `foundation_state_v1`(client localStorage 평문) 서버화 **선택**(client-only 유지 가능)·서버화 시 subject_ref keying+consent+at-rest 암호화 필수(W18/W24). 
- ConsentRecord ledger(§N-1): SIASIU 현재 전무 → 신설(grant/withdrawal audit). 
- SubjectRefMap(§M-2): 신설·service-local(SIASIU subject_ref↔furef_local_ref↔guest_ref)·cross-service join 아님. 
**결론: 5종 전부 신설 가능·기존 memory.db 3테이블과 독립.**

## 4. consent_scope/retention_policy/deleted/blocked/expired additive 배선 (§J-2·N)
**가능 · additive.** 현재 SIASIU 스키마에 이 컬럼 전무(계약↔저장 비대칭 = W1). 
- 배선: memory_fact/episode(→session)에 nullable/default 컬럼 가산 → 기존 row는 default(consent_scope=same_service·retention=standard_ttl·deleted/blocked/expired=false). 
- runtime 게이트: recall/memory_context 조립 시 deleted/blocked/expired skip·consent 없는 sensitive fail-closed. 
- retention: `is_safety=true`는 auto-expire override(안전 무기한 유지·현행과 정합). 
**결론: 컬럼 default로 기존 동작 보존·게이트는 read 경로에 추가(fail-closed 강화).** ★단 실제 배선은 M4 구현(현재 PATCH_REQUIRED = W1/W2/W10).

## 5. 기존 recall/reset/answer.py fingerprint 유지 (§F·§V)
**가능 (조건부).**
- **answer.py fingerprint `d7f579443f8a110a`**: 스키마 가산은 answer.py(응답 표현층)를 건드리지 않음 → **unchanged 유지 가능**. 문서 §V가 이를 필수 regression으로 명시(integration 39/39·fingerprint unchanged).
- **recall**: active_facts+recent episode projection = read-only. 컬럼 가산 후에도 recall은 동작(단 deleted/blocked/expired skip 게이트 추가 = 강화·기존 노출 축소 가능→WATCH). 
- **reset**: ★현행 = user 단위 hard DELETE(episode+fact). 계약은 soft-delete/tombstone/audit/per-fact를 **additive로 도입**(W2 PATCH_REQUIRED). reset의 기존 "전량 삭제" 시맨틱은 유지 가능하나, GDPR per-fact erasure는 신규. **결론: fingerprint/recall/reset 기본 동작 보존·삭제 정교화는 additive PATCH.**

## 6. user_id email 파생 위험 제거 (§B-a·M-2·W3)
**가능하나 상위(frontend/store.js) 변경 필요 — SIASIU 어댑터 단독으로는 불가.**
- 위험: `store.js:71 userId()=s.userId||s.email||"u_"+name` → email/name-in-key. 
- 설계 mechanism: `subject_ref` opaque keying(SubjectRefMap) + LongTermMemoryFact.subject_ref로 memory keying을 email에서 분리. 
- ★단 실제 제거 = frontend가 안정 내부 id를 발급하도록(store.js) + SubjectRefMap 배선. CUTOVER-01 v2에서 이미 **Foundation 전송은 furef_v2_ opaque**(email 미전송)로 완화됨 — 남은 건 **로컬 memory.db PK가 email 파생 user_id**인 부분. 
**결론: 설계가 제거 경로(subject_ref keying) 제공·PATCH_REQUIRED(W3·상위 store 정책 포함).**

## 7. logins.txt P3와 충돌 여부 (§T·W4)
**충돌 없음 · 오히려 상호보완.**
- logins.txt(raw email/name 평문·P3 BLOCKER)는 **memory 스키마 밖 신원/auth sink**. 
- 계약과 orthogonal: 계약의 SubjectRefMap opaque keying·display_name 최소화/암호화 방향이 P3 fix와 **정합**(email-in-key 금지·마스킹/keyed-hash). 
- ★계약이 logins.txt를 강제 변경하지 않음(별도 patch·해당 repo 소관·§T). **결론: 모순 0·P3 patch는 계약 정본과 같은 방향(SIASIU-AUTH-PII-PATCH-01).**

## 8. commerce 계약을 schema-available/populate-conditional로 수용 (§B#3·§E·§L·W21)
**가능.** SIASIU는 commerce 축 부재 → CommerceMemory 계약(스키마·거버넌스 컬럼)을 **schema-available**로 보유하되 **미populate**(계약 위반 아님, W21). 향후 SIASIU가 commerce 도입 시 populate. **결론: SIASIU가 9엔티티 계약을 전부 보유하되 commerce만 조건부 populate — 문서 결정 #3 재정의와 정합.**

## SIASIU 구현 가능 여부
**가능(reference).** 9엔티티 전부 SIASIU에서 구현 가능: 유지+확장 5(episode→ConversationMessage·memory_fact→LongTermMemoryFact·fact_type_registry→FactTypeRegistry·user→CustomerProfile projection·recall) + 신설 5(ConversationSession·EpisodeSummary·MemoryFactCandidate·ConsentRecord·SubjectRefMap) + CommerceMemory(schema-available). 전부 **additive·M4 단계**.

## 기존 기능 영향
- answer.py fingerprint: **unchanged 유지 가능**(스키마만 가산).
- recall/checkins/pitch/recos: read 경로에 consent/delete 게이트 추가(강화·fail-closed) — 기존 노출이 축소될 수 있음(WATCH).
- reset: 기본 동작 유지·per-fact/audit는 additive.
- CUTOVER-01 Foundation-only path: session_context={} 유지(memory_context는 서비스-side 조립·raw 제외·Foundation ingress gate가 이중 강제) — 무충돌.
- integration 39/39·workflow 119/119 유지 필수(§V).

## additive schema 후보 (SIASIU)
- memory_fact +: subject_ref·source_ref·consent_scope·retention_policy·sensitivity_level·deleted·blocked·expired·reconfirmed·reconfirmed_at·deleted_at·expires_at.
- episode/ConversationSession +: session_id 묶음·consent_scope·retention_policy·deleted/blocked/expired·deleted_at/expires_at·external_consult_ref(보조).
- 신규 테이블: EpisodeSummary·MemoryFactCandidate·CustomerProfile·ConsentRecord·SubjectRefMap·(CommerceMemory 오버레이·미populate).

## 위험 / 모순
- **모순 0**(계약이 SIASIU reference를 깨지 않고 additive로 확장). 
- **위험/PATCH_REQUIRED(SIASIU 소관)**: W1(consent/expiry/delete 컬럼 부재)·W2(reset per-fact/audit)·W3(user_id email keying)·W4(logins.txt P3)·W16(subject_ref v2 gate service-local 배선)·W23(furef 가명 PII governance). 
- **WATCH**: recall 게이트 추가로 기존 노출 축소·CustomerProfile 서버화 시 at-rest 암호화(W18/W24)·content_hash keyed/per-service salt(W25)·reset 삭제 시맨틱.
- ★전부 **additive·flag OFF·shadow**로 rollback 가능(문서 M4 원칙과 정합).

## 코드 변경 여부: **0** (read-only 검증·SIASIU/Foundation/Cosmile 무수정·migration 0·push 0).
