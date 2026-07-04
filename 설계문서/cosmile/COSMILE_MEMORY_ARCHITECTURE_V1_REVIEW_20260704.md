# Cosmile-side Review — Foundation Service Memory Architecture V1 (v0.3-revised)

> **STATUS: PATCH_REQUIRED** (feasible=yes · 구현 가능하지만 현 정합 미충족)
> 2026-07-04 · read-only 검증 · Cosmile 코드 변경 0 · Cosmile HEAD `3ba91e0`(local, unpushed 3) / origin/main `f71c726`

## 1. Verdict
- **PATCH_REQUIRED.**
- **구현 가능 = YES / feasible** — Cosmile은 Common Service Memory Contract(9엔티티)를 **additive · flag-OFF · shadow/design-only** 로 구현 가능.
- **현재 9엔티티 정합 = 미충족** — 9엔티티(+FactTypeRegistry) 전부 Cosmile schema에 부재.
- **구조적 blocker 없음** — 전부 additive(신규 model + 기존 model 컬럼 가산·overlay), rollback 가능(flag OFF·shadow).
- **FAIL 조건 없음.**
- **read-only 검증 · 코드 변경 0.**

## 2. 읽은 문서 / 근거
- `foundation-docs/설계문서/foundation/FOUNDATION_SERVICE_MEMORY_ARCHITECTURE_V1_20260704.md` (v0.3-revised, 738 lines · A~W 23섹션 정독)
- `foundation-docs/설계문서/cosmile/COSMILE_MEMORY_INVENTORY_20260704.md` (Cosmile 메모리 인벤토리, PASS_WITH_WATCH)
- Cosmile Prisma schema (`app/prisma/schema.prisma`, 33 model)
- 구조 확인: `FoundationSignalOutbox`(status=pending·canonicalUserId/anonymousId raw ids·payloadJson) · `CommerceEvent`/`foundation_decision_received`(userId+foundation_trace_id 동일 row) · `ConsultationSessionMeta`(refs/enum only·consultationSessionId→SIASIU 링크) · `Cart`/`CartItem`/`Order`/`Wishlist`/`AlertSubscription`(userId?/guestId? keyed·AlertSubscription.consentStatus)
- **furef_v2 Cosmile 구현**: `src/lib/foundation/foundationUserRef.ts` = `furef_v2_<32hex>` = HMAC-SHA256(FOUNDATION_USER_REF_SECRET, `"cosmile:<subject_type>:<stable_id>"`)[:32], production secret 부재 시 fail-closed (local commit `3ba91e0`, unpushed). → **subject_ref 파생 원천으로 이미 존재.**

## 3. 9개 검증 항목 결과
| # | 검증 항목 | 판정 | 근거 |
|---|---|---|---|
| 1 | opt-B: Cosmile 상담원문 → Cosmile `ConversationMessage` 저장 | 가능(신설·PATCH) | 현 서버 원문저장 0(브라우저 sessionStorage `cosmile_consult_chat_v1`만). 신규 model + at-rest 암호화/접근통제(W24) + consent/retention 필요. ★현 Foundation-only(서버 raw 미저장) → 서버 raw 저장 governance 전환 |
| 2 | ConversationSession | 가능(확장) | `ConsultationSessionMeta` 확장(status enum active/ended/abandoned/handoff 이미 정합) + subject_ref·guest_ref·external_consult_ref·consent/retention/delete 컬럼 가산 |
| 3 | ConversationMessage | 가능(신설) | 신규 model(content raw + content_hash HMAC + session FK + pii_flags + derived_facts) · at-rest 암호화 조건 |
| 4 | EpisodeSummary | 가능(신설) | 신규 model. `ConsultationSessionMeta`의 mentionedProductIds/mentionedIngredientAtoms/intentTypes/riskLevel와 필드 정합(경계 정리 필요) |
| 5 | MemoryFactCandidate / LongTermMemoryFact / CustomerProfile | 가능(신설) | 3종 전부 부재 → 신설(+FactTypeRegistry 공유 canon). semantic=AI·policy=rule 분리는 Cosmile 헌법과 정합. CustomerProfile = **Cosmile 최초 고객 프로필 model**(display_name PII→암호화/consent) |
| 6 | ConsentRecord / SubjectRefMap (service-local) | 가능(신설) | ConsentRecord ledger 신설(현 `AlertSubscription.consentStatus`가 부분 원천). SubjectRefMap 신설·service-local. ★`furef_v2`(3ba91e0)가 subject_ref(=subj_v2_ = HMAC(secret, furef_v2)) 파생 원천으로 존재 = 강한 정합 |
| 7 | CommerceMemory overlay | 가능(overlay) | 논리 계약 = 기존 Cart/Order/Wishlist/CommerceEvent/AlertSubscription에 **additive 컬럼**(subject_ref·properties_sanitized·privacy_level·consent/retention·deleted/blocked). 신규 테이블 아님. 현 `sanitizeProperties`(piiPolicy)가 강제 기반 |
| 8 | P1/P2 de-anon patch 충돌 | **충돌 없음(정합·상호보완)** | opaque subject_ref keying + payload_refs-only 구조가 P1/P2 canonical fix와 같은 방향. 단 현 Cosmile P1/P2 미패치 → 메모리 구현 시 **동반 패치 전제**(§6) |
| 9 | readiness adapter `1ce099e` 유지 | ⚠ **미확인(WATCH)** | 메모리 정렬은 additive라 원칙상 유지 가능. 그러나 `1ce099e`가 **Cosmile clone(`/home/leo/Project/Cosmile`·`/home/leo/projects/Cosmile`) git 히스토리·src/scripts 어디에도 없음** → 소재 확인 필요, 유지 가능성 검증 불가 |

## 4. 필요한 신규 모델 목록 (Cosmile, M4)
- `ConversationMessage`
- `EpisodeSummary`
- `MemoryFactCandidate`
- `LongTermMemoryFact`
- `CustomerProfile`
- `ConsentRecord`
- `SubjectRefMap`
- `FactTypeRegistry`
- `ConversationSession` = **`ConsultationSessionMeta` 확장** 또는 **별도 신설** 방향으로 결정(권장: 확장 — status enum·userId/guestId·consultationSessionId 이미 보유).

## 5. 기존 모델 additive 컬럼 후보
| 기존 모델 | additive 컬럼 후보 |
|---|---|
| `ConsultationSessionMeta`(→ConversationSession) | subject_ref · guest_ref · external_consult_ref · consent_scope · retention_policy · sensitivity_default · deleted/blocked/expired · deleted_at/expires_at |
| `CommerceEvent` | subject_ref · properties_sanitized · privacy_level · consent_scope · retention_policy · deleted/blocked · expires_at |
| `Cart` | subject_ref · consent_scope · retention_policy · deleted/blocked · expires_at |
| `Order` | subject_ref · consent_scope · retention_policy · deleted/blocked · expires_at |
| `Wishlist` | subject_ref · consent_scope · retention_policy · sensitivity_level · deleted/blocked · expires_at (Wishlist.note 자유텍스트 sanitize) |
| `AlertSubscription` | subject_ref · consent_scope(현 consentStatus 정합) · retention_policy · deleted/blocked · expires_at |
| `FoundationSignalOutbox`(→FoundationSyncState) | subject_ref · furef_local_ref · payload_refs(raw ids 대체·P2) · consent_scope · retention_policy · deleted/blocked |

공통 후보 컬럼 셋: `subject_ref` · `guest_ref` · `external_consult_ref` · `consent_scope` · `retention_policy` · `sensitivity_default`/`sensitivity_level` · `deleted`/`blocked`/`expired` · `deleted_at`/`expires_at` · `properties_sanitized` · `privacy_level` · `payload_refs` · `furef_local_ref`.

## 6. P1/P2와의 관계
- **P1/P2와 충돌 없음.**
- 오히려 **opaque subject_ref keying + payload_refs-only** 구조가 P1/P2 canonical fix와 **정합**(같은 방향으로 de-anon 표면 제거).
- **단, 현재 Cosmile은 P1/P2 미패치 상태**: `foundation_decision_received`가 `userId`(내부 id, column) + `foundation_trace_id`(payload) 동일 row(P1) · `FoundationSignalOutbox`가 raw `canonicalUserId`/`anonymousId`(P2).
- **Memory 구현 시 P1/P2 동반 패치가 전제.**
- **trace_id와 raw identity를 같은 row에 저장 금지** — FRC/foundation_trace_id는 로컬 record에 hashing 또는 미저장, identity는 opaque subject_ref로 대체(userId XOR anonymousId 분리).
- **FoundationSignalOutbox raw id는 refs/atom/enum `payload_refs`로 대체.**

## 7. 위험 / 모순
- **readiness adapter `1ce099e` 소재 미확인 → WATCH** (이 clone·git 히스토리·코드 어디에도 없음 · 다른 clone/미푸시 소재 확인 선행).
- **opt-B로 서버 raw 상담원문 저장이 생김 → at-rest 암호화/접근통제 필요(W24)** (현 dev SQLite 평문).
- **CustomerProfile.display_name PII → 암호화/consent 필요.**
- **content_hash/query_hash는 HMAC / per-service salt 필수(W25)** (unsalted 절단 hash = cross-service correlator 금지). Cosmile furef_v2가 이미 HMAC(prod fail-closed)라 keying 관례 보유.
- **subject_ref = HMAC 기반 2차 파생 필요** (subj_v2_ = HMAC(secret, furef_v2)[:32]) · prod secret 배포 전 fail-closed.
- **dev SQLite 평문 저장 위험** (별도 보안 train).
- **모순은 없음** — 전부 additive · flag OFF · design-only · rollback 가능.

## 8. 코드 변경 여부
- **코드 변경 0** · **migration 0** · **source push 0** · **raw 고객 데이터 미열람** · **secret/PII 출력 0.**

## 9. 최종 요약
- Cosmile은 **Common Service Memory Contract 구현 가능**(feasible=yes, 구조적 blocker 없음, 전부 additive/flag-OFF).
- 하지만 현재 **8종 신설 + 확장/overlay + P1/P2 동반패치 + at-rest 보안(W24) + subject_ref secret 배포**가 필요.
- **M2(공통계약 문서화) → M4(Cosmile 구현)** 순으로 foundation-control contract/plan에 따라 진행해야 함(design-first · flag OFF · shadow).
- **본 문서는 구현 승인 문서가 아니라 feasibility / review 문서다.** (선결: `1ce099e` 소재 확인.)
