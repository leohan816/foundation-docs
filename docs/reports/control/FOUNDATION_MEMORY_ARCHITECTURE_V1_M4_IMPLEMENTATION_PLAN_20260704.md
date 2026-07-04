# Foundation Memory Architecture V1 — M4 구현계획 (Implementation Plan)

> 작성: foundation-control · 2026-07-04 · **상태: DESIGN/PLAN (구현 전 계획 · 코드 0)** · Control verdict 상한 = DESIGN_READY.
> 전제: M2/M3 **v1.2 FINAL_PASS**(Fable5 `..._M2_M3_DELTA3_FINAL_REVIEW_20260704.md`·APPROVED). 본 문서는 **계약을 구현 train으로 전환하는 계획**이며 **live/write/promotion은 M6까지 금지**.
> 근거: FOUNDATION_SERVICE_MEMORY_ARCHITECTURE_V1(anchor) · COMMON_SERVICE_MEMORY_CONTRACT_V1(M2 v1.2) · MEMORY_CONTEXT_CONTRACT_V1(M3 v1.2) · M2_M3_REVIEW_CHECKLIST(B1~B15) · subject_ref hard gate RESULT(c9bb996) · MEMORY_INVENTORY_AUDIT.
> ★코드 수정 0 · migration 0 · source push 0 · raw 고객 데이터/secret 미열람 · 구현 실행 0.

## 1. M4 목적
- M2/M3 계약(9 엔티티·memory_context·consent/retention/delete·ingress gate)을 **실제 SIASIU/Cosmile/Foundation repo-local 구현 train**으로 전환.
- ★**단 live/write/promotion·real user exposure·cross-service·Foundation customer LTM = M6까지 금지.** M4 = **additive schema + shadow + flag OFF**까지.
- 각 repo-local 구현은 **control tower가 발행한 contract/plan에 따라서만**(§2.5 role separation).

## 2. M4 범위
- **service-local memory schema**(SIASIU additive·Cosmile 신설·9 엔티티).
- **additive migration plan**(backup/dry-run/rollback·live user write 0·Leo 승인).
- **subject_ref v2 gate wiring**(Foundation c9bb996 배선·service-local·prod secret readiness).
- **at-rest encryption/access control plan**(opt-B raw·§11 최소 스펙).
- **Foundation ingress gate implementation plan**(M3 §7 v1.2 신규 default-deny·shadow).
- **test/rollback/flag/shadow plan**(전 경로 flag OFF·기존 regression 유지).

## 3. M4에서 제외 (★M6/후속)
- cross-service memory sharing / consent-gated broker / cross-service SubjectRefMap (v1 범위 밖·future).
- Foundation customer LTM storage (영구 금지·request-stateless).
- automatic live rollout / real user exposure (M6·별도 승인).
- V3 intelligence implementation (learning live·un-learning·attribution live).
- M6 production enablement (live/write/promotion).

## 4. B1~B15 blocker 재분류표
| id | 의미 | 소관 | 처리(M4/M5/M6/watch) | 선행 조건 | 테스트 기준 | rollback 기준 |
|---|---|---|---|---|---|---|
| **B1** | ★**소재 정정(G-2):** `1ce099e` = **SIASIU repo commit**("feat(cosmile): Phase 5 Readiness")·adapter 8파일 `FOUNDATION/foundation/cosmile/` 실존·**Cosmile repo 부재는 정상**(CLAUDE.md §7 비대칭). B1 잔여 = **164/164 readiness 재현 확인**으로 축소 | SIASIU+control | **M4 선행 — 자구 정정 후 164/164 재현으로 close** | SIASIU/FOUNDATION 확인(완료) | 164/164 재현 PASS | 재현 실패 시만 보류 |
| **B2** | Cosmile P1/P2 de-anon 동반패치(foundation_decision_received·SignalOutbox) | Cosmile | **M4 동반**(원자적·§9) | P-patch 설계 승인 | trace_id↔raw id same row=0·payload_refs only | P-patch revert(memory 커밋과 원자) |
| **B3** | subject_ref v2 gate 배선(W16)+prod secret 배포 | Foundation | **M4(배선)·M6(prod secret live)** | c9bb996 push·secret store | subj_v2_·prod fail-closed·평문 reject | flag OFF·revert c9bb996 |
| **B4** | Foundation ingress **신규 default-deny gate**(M3 §7 v1.2) | Foundation | ★**M5 단독 소유**(G-5·gate 모듈 구현+synthetic/self-echo test+consult_contract 배선 = M5 train) | M3 §7 스펙 | reject/pass matrix·self-echo round-trip | gate flag OFF(inert) |
| **B5** | opt-B raw at-rest 보안(§11 6항 exit criteria) | Cosmile+SIASIU | **M4(스펙 확정)·M6(raw live)** | §11 스펙 문서 | 암호화·키/rotation·접근·감사·보존·파기 | raw 저장 flag OFF | ★**SIASIU 기존 `episode.text` 평문 = grandfather baseline**(신설 아님·강제 raw migration/암호화/backfill 금지·전환은 M6) |
| **B6** | SIASIU: M4 산출물(consent/delete·reset) ↔ M4 선행 설계(brain.py 분기순서·§5 D-8) 분리 | SIASIU | **M4(선행 설계 확정→구현)** | brain.py 분기 순서 결정 | SAFETY∩SINGLE supersede·active≤1 | additive revert·fingerprint unchanged |
| **B7** | M2 개정판(v1.2) 재확정 | control | **해소(완료)** | — | — | — |
| **B8** | retention TTL 실기간·expires_at·auto-sweep(임신 max-age) | control+서비스 | **M4 선행(값 확정)·M5(sweep)** | ★**TTL 값은 backfill 전 확정**(G-5·expires_at=NULL backfill 후 TTL 확정으로 2차 backfill 재발 방지) | expired must_not_reappear·is_safety override | flag OFF |
| **B9** | taxonomy 3자 정합 → FactTypeRegistry canonical(goal=SINGLE·sensitivity 4값·ConditionCategory) | 서비스 | **M4** | M2 §4 정본 | invalid_memory_kind=0·condition↔concern alias | additive revert |
| **B10** | V0 계약 SUPERSEDED 선언 | control | **M4 선행(헤더 표기)** | V0 파일 헤더 patch | V0 SUPERSEDED·V1 정본 참조 | doc revert |
| **B11** | Memory Candidate Adapter v0 재작성+keyed hash(unsalted sha256/하드코딩 salt·W25) | SIASIU | **M4** | 신규 MemoryFactCandidate 계약 | keyed HMAC·subj_v2_·per-service salt | shadow flag OFF·revert |
| **B12** | M4 migration release train 요건(backup·dry-run·rollback·plan·Leo 승인) | control+SIASIU | **M4 선행(필수)** | migration plan 문서·Leo 승인 | dry-run 무손실·rollback rehearsal PASS | backup 복원 |
| **B13** | P3 gate 결속+동반패치 semantics(logins.txt 무기한 잔존 금지) | SIASIU | **M4 동반**(SIASIU-AUTH-PII-PATCH-01) | P3 patch 설계 | logins.txt raw email hash/이관·기한 gate | P3 patch revert |
| **B14** | consent write-gate+backfill(raw 저장 사전 grant) | 서비스 | **M4(★신규 raw write 한정)** | ConsentRecord ledger | grant 없으면 raw 저장 0/session-only·backfill default | flag OFF | ★**grandfather:** 기존 `episode.text` 경로에 B14 gate **미적용**(신규 write에만 우선 적용·기존 경로 전환=M6·G-6) |
| **B15** | M3 §4 whitelist 재정합+CUTOVER echo round-trip gate | control+Foundation | **문서-레벨 해소(완료)·M5(gate 구현)** | M3 §4/§7/§9(완료) | echo round-trip pass·whitelist 외 reject | gate flag OFF |
- ★요약: **M4 선행 = B1·B10·B12**(소재·V0 표기·migration 요건) · **M4 동반 = B2·B13**(P-patch) · **M4 본체 = B6·B9·B11·B14** · **M5 = B4·B15 gate 구현** · **M6 = B3 prod secret·B5 raw live**. B7·B15(문서분) = 해소.

## 5. SIASIU implementation train
- **9 엔티티(additive):** 유지+확장 — `episode`→ConversationMessage(+session_id/content_hash keyed/pii_flags)·`memory_fact`→LongTermMemoryFact(+subject_ref·consent/retention·fact_state·직교 3-state·reconfirm·source_ref)·`user`→CustomerProfile(projection·서버화 선택)·`fact_type_registry`→FactTypeRegistry(canonical) · 신설 — ConversationSession·EpisodeSummary·MemoryFactCandidate·ConsentRecord·SubjectRefMap · CommerceMemory=schema-available·미populate.
- **additive mapping:** 기존 3테이블 컬럼 default(consent_scope=same_service·retention=standard_ttl·deleted/blocked/expired=false)로 기존 row 보존·recall/reset 기본 동작 유지.
- **user_id email keying 수정(W3):** `store.js:71 userId()=s.userId||s.email||"u_"+name` → **안정 내부 id 발급** + SubjectRefMap opaque keying(subject_ref)·memory PK를 email에서 분리(★frontend 변경 포함·B6).
- **logins.txt P3(B13):** raw email/name 평문 → **hash/암호화 또는 Foundation-backed auth 로그 이관**(SIASIU-AUTH-PII-PATCH-01·M4 동반·기한 gate).
- **consent/delete/retention/reset per-fact(B14·W1/W2):** consent write-gate·per-fact soft-delete/tombstone/audit(현행 reset=user hard DELETE 유지 + additive per-fact erasure)·retention 게이트 read 경로.
- ★**SIASIU grandfather 정책(G-6):** 기존 `episode.text` 평문 write는 **baseline grandfather**(신설 아님) — B14 consent write-gate는 **신규 raw write에만 우선 적용**·기존 episode 경로 전환은 **M6 또는 별도 승인**. ★M4에서 기존 recall/reset behavior·answer.py fingerprint를 깨지 않으며, **기존 데이터를 강제 raw migration/암호화/backfill하지 않는다**.
- **brain.py 분기 순서(D-8·B6 선행):** SAFETY∩SINGLE = **SINGLE supersede 우선**(safety 분기보다)·pregnancy_nursing active≤1.
- **candidate adapter 재작성(B11):** foundation_memory_candidate_adapter.py unsalted sha256·하드코딩 salt·subj_[:16] → keyed HMAC·subj_v2_[:32].
- **migration(B12):** memory.db backup·dry-run·rollback rehearsal·Leo 승인·live user write 0.
- ★**불변식:** answer.py fingerprint `d7f579443f8a110a` unchanged · integration 39/39 · workflow 119/119 유지 · flag OFF·shadow.

## 6. Cosmile implementation train
- **8 신설 + 확장/overlay:** 신설 — ConversationMessage·EpisodeSummary·MemoryFactCandidate·LongTermMemoryFact·CustomerProfile·ConsentRecord·SubjectRefMap·FactTypeRegistry · 확장 — ConsultationSessionMeta→ConversationSession(status enum 정합·+subject_ref/guest_ref/external_consult_ref/consent/retention/delete) · overlay — CommerceMemory(Cart/Order/Wishlist/CommerceEvent/AlertSubscription에 subject_ref·properties_sanitized·privacy_level(anonymous|user_consented|aggregated)·consent/retention·deleted/blocked).
- **ConversationMessage raw storage governance(opt-B·B5):** 서버 raw 원문 저장 신설 → **at-rest 암호화/접근통제 필수**(§11)·consent write-gate(B14).
- **P1/P2 de-anon 동반패치(B2):** P1 foundation_decision_received — ★**trace_id는 keyed-hash(HMAC·per-service secret/salt)로 저장**(G-4·"미저장 옵션" **폐기**·V3 attribution 위해 raw trace 아닌 **keyed trace ref만** 유지·M2 §15 정합) · raw identity와 **같은 row 금지**(userId XOR anonymousId 분리) · P2 FoundationSignalOutbox(raw ids→payload_refs).
- **subject_ref/furef mapping:** furef_v2(3ba91e0)→subject_ref v2(subj_v2_=HMAC(secret,furef))·SubjectRefMap service-local.
- **at-rest encryption/access control(B5):** §11 6항.
- **readiness adapter `1ce099e` 소재 확인(B1·선행):** clone/git 히스토리 전수 조사·164/164 재현 확인 후 schema 착수.
- ★**불변식:** Cosmile readiness 164/164 유지 · AI Commerce loop 112/112 · flag OFF·shadow.

## 7. Foundation implementation train
- **ingress default-deny gate(B4·M3 §7 v1.2):** 신규 스펙(unknown-key reject·whitelist 강제·field type/enum·nested recursive scan·식별자(customer/user/anonymous/session_id/order/payment/shipping) 차단·raw 휴리스틱·크기/깊이/개수 상한·fail-closed) — **has_raw_or_pii 재사용 아님**(SUPERSEDED).
- **scan 대상:** session_context/service_context/product_context 모두(재귀)·**CUTOVER echo round-trip 호환**(정상 echo/safety carry/catalog pass·B15).
- **session_context_out clean assert:** echo raw/PII/식별자 0.
- **memory_read_provider remains unconnected:** Foundation은 자기/타 서비스 고객 memory 미조회(broker 아님).
- **durable write remains 0:** memory_write=false·applied_to_real_user=false·write_live=false·memory_db_created=false.
- **subject_ref v2/prod secret readiness(B3):** c9bb996 배선(service-local keying)·prod FOUNDATION_SUBJECT_REF_SECRET·서비스 FOUNDATION_USER_REF_SECRET 배포는 M6.
- ★**불변식:** Foundation runner 89/89·651 유지 · api_live=false.

## 8. migration plan (★B12·전부 M4 선행·Leo 승인)
> ★**상세 정본 = `FOUNDATION_MEMORY_ARCHITECTURE_V1_M4_MIGRATION_PLAN_20260704.md`(G-1 신설)** — WAL-aware backup·pre-index 중복 스캔 SQL·결정론 수리·D-8 데이터 수리·Prisma reset 금지·subject_ref backfill 금지(M4)·row count/checksum·rollback rehearsal·Leo 승인·완료 기준. 아래는 요약.
- **backup:** SIASIU memory.db·Cosmile prisma dev.db migration 전 백업(★WAL-aware `.backup`/`VACUUM INTO`·naive copy 금지).
- **dry-run:** 스키마 변경 시뮬레이션·데이터 무손실·additive 검증(기존 row default 채움).
- **rollback rehearsal:** 되돌리기 리허설·backup 복원 검증.
- **no live user write:** migration은 shadow/dev·실 고객 write 0·flag OFF.
- **Leo approval gate:** 실 migration 실행 전 Leo 승인(release train).

## 9. test plan
- **SIASIU 기존 유지:** integration 39/39 · workflow 119/119 · answer.py fingerprint `d7f579443f8a110a` unchanged.
- **Cosmile:** readiness 164/164 · AI Commerce loop 112/112.
- **Foundation:** runner 89/89·651.
- **memory_context raw/PII reject:** whitelist 외 key·raw/PII/식별자 reject · **echo round-trip pass**(정상 echo/safety carry/catalog).
- **deleted/blocked/expired must_not_reappear:** recall/memory_context 재등장 0.
- **guest_ref/subject_key uniqueness:** `subject_key=COALESCE(subject_ref,guest_ref)` partial unique·guest NULL 충돌 0·SINGLE active≤1.
- **P1/P2/P3 regression:** trace_id↔raw id same row 0·payload_refs only·logins.txt raw email 0.
- **불변식:** write/live/promotion=0·memory_read_provider_called=false·raw_pii_stored=0·cross-service=0.

## 10. execution order
1. **docs first**(본 M4 plan·B10 V0 SUPERSEDED·B12 migration plan·B1 소재 확인).
2. **SIASIU/Cosmile schema shadow**(additive·flag OFF·B6 선행 설계·B11·B14).
3. **(★M5 train·병행) Foundation gate shadow** — B4(gate 모듈+synthetic/self-echo test·서비스 schema와 독립)는 **M5 단독 소유**(§M5 plan)·서비스-조립 echo E2E만 M4 완료 후 통합. Foundation B3 subject_ref 배선(service-local·durable write 0)은 M5 병행.
4. **integration tests**(§9 전량·shadow).
5. **Fable5/Codex review**(독립 검증·Control self-review 금지).
6. **only after approval → M5/M6**(M5 gate consult 배선·M6 live/prod secret·각 별도 승인).

## 11. STOP conditions (하나라도 발생 시 중단·보고)
- raw/PII/secret exposure(payload/trace/log/at-rest 평문).
- cross-service memory introduced(SIASIU↔Cosmile 공유·broker·cross-service SubjectRefMap).
- Foundation durable customer memory introduced(memory_write>0·memory_db_created).
- non-additive migration(기존 컬럼/데이터 파괴·backup 없이).
- live/write/promotion > 0 · real user exposure > 0.
- tests failing(기존 regression 감소·fingerprint 변경·설명 없는 test count 감소).
- deleted/blocked/expired reuse>0 · trace_id↔raw id same row>0 · SAFETY∩SINGLE active 2건.

## 12. M4 착수 가능/불가 판단
- ★**착수 가능(단 선행 gate 후·shadow/flag OFF).** M2/M3 v1.2 **FINAL_PASS**(Fable5 APPROVED)로 계약 정본 확정 → M4 문서/schema-shadow 착수 가능.
- **M4 선행(schema 코드 전 필수):** **B1**(1ce099e 소재)·**B10**(V0 SUPERSEDED)·**B12**(migration plan+Leo 승인).
- **live/write/prod secret/cross-service = M6까지 금지**(§3·§11).
- Control은 계획만 발행 — 실 구현은 각 repo Claude Code가 본 plan/contract에 따라 수행(코드 0·본 문서는 계획).

## 무결성
코드 변경 0 · migration 0 · source repo push 0 · raw 고객데이터/secret 미열람 · 구현 실행 0 · foundation-docs만 commit/push. Control verdict 상한 = DESIGN_READY(구현 착수 승인은 Leo·독립 검증은 Fable5/Codex).
