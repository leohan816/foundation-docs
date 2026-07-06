# COSMILE MEMORY V3-11B — DB Integration Gate / Plan

> 작성: foundation-control / **fable-builder** 스킬(implementation-execution·contract-to-code-mapping reference 적용) · 2026-07-06 · ★계획/gate only·**prisma·migration·DB write 0**·prod/live/main/secret 금지.
> anchor: V3-11A `V3_11A_PATCH_CLOSED_WITH_LIMITS`(review 3f9aaf1·delta 240b24b) · 정본 코드 Cosmile shadow **`af26f94`** · 사전 `DATA_DICTIONARY_CANONICAL` · **V3-08 INV-DB-1/2/3** · 실 `prisma/schema.prisma`(provider=**postgresql**).
> ★실 스키마 직접 확인: MemoryFactCandidate·LongTermMemoryFact·CommerceEvent·OrderItem·SubjectRefMap 실측 후 작성(기억 아님).

---

## 1. Executive summary
V3-11A(provider-independent TS·43/43)를 Postgres/prisma 계층에 착지시키는 **설계·gate**. ★실 스키마 대조 결과 **3개 STOP/LIMIT급 gap** 발견: (G-1) INV-DB-2/3가 요구하는 `direction`/`safety_flag`/`evidence_count`/`distinct_signal_source_count`/`status`/`lifecycle_state`가 **기존 LongTermMemoryFact에 부재**(현재 `isSafety` boolean만) → 추가 없이는 invariant 집행 불가. (G-2) **Prisma는 CHECK·partial-unique 미지원** → 전부 raw SQL migration/app-level. (G-3) **3-way naming**(code subject_ref/anonymous_ref · memory DB subjectRef/guestRef · commerce DB userId/anonymousId) 정합 필요. 이번 라운드는 **계획만**·실 migration은 Leo 승인 후 별도 batch.

## 2. V3-11B scope (계획 대상)
1. 신규 model 3종 설계 초안: RecommendationEvent · RecOutcomeEvent · RecOutcomeFeedback (commerce/outcome 계층).
2. MemoryFactCandidate/LongTermMemoryFact **additive 확장** 설계(INV-DB-2/3 집행 컬럼).
3. enum→CHECK/prisma 매핑(semantic_label **patched §2.12 10값**·adverse_severity/certainty 사전 정합).
4. key/nullability/XOR 규칙의 DB 표현.
5. INV-DB-1/2/3 → DB 집행(raw SQL CHECK·partial-unique·counter query) 매핑.
6. created_at = `timestamptz`(문자열 정렬 의존 제거).
7. secret_version/rotation **검토**(결정 불가 시 LIMIT).
8. non-prod migration rehearsal 계획(rollback·fixture·zero-violation).
9. DB-touch test 설계(provider-independent와 분리·infra-gate 실패≠PASS).

## 3. Explicitly excluded scope
- ★실 prisma/schema.prisma 수정·migration 파일 생성·DB write·prod/live·main merge·PR·Vault/secret — **전부 금지**(이번 계획엔 파일 산출 0).
- **G13 COSMILE-4 baseline 실 DDL 복원**(V3-08 §2-B) = STOP-gated 별개·이번 제외(Leo 지시).
- LTM full promotion pipeline·semantic 추출 로직·emit 배선·multi-touch·ranking engine·live analytics = 후속.
- secret **실 rotation 실행**(값 회전) = 이번 아님(컬럼 readiness만 검토).

## 4. Proposed DB/prisma model map (초안·실 스키마 대조)
| 계약 model(V3-11A) | DB 착지(제안) | 기존 여부 | 비고 |
|---|---|---|---|
| RecommendationEvent | **신규** `RecommendationEvent` (또는 CommerceEvent eventType 확장) | ✗ 신규 | commerce 계층·anon 허용. ★CommerceEvent 재사용 vs 신규 = Open Decision D-1 |
| RecOutcomeEvent | **신규** `RecOutcomeEvent` | ✗ 신규 | `order_item_id`→OrderItem.id FK(존재)·attribution |
| RecOutcomeFeedback | **신규** `RecOutcomeFeedback` | ✗ 신규 | semantic_label·adverse_* |
| MemoryFactCandidate | 기존 `MemoryFactCandidate` **additive 확장** | ✓ 존재 | 필드명 `subjectRef?/guestRef?/type/normValue/status/factState` — code(subject_key/fact_type/fact_target)와 **매핑 필요**(G-3) |
| LtmFact | 기존 `LongTermMemoryFact` **additive 확장** | ✓ 존재 | ★`direction/safety_flag/evidence_count/distinct_signal_source_count/lifecycle_state/status` **부재**(G-1) — 현재 `isSafety` boolean·`factState`만 |

★**필드명 정합(G-3)**: memory 계층 = `subjectRef`/`guestRef`(subject_key=COALESCE)·commerce 계층 = `anonymous_ref`(anon_v3_). **anon_v3_ ≠ guest_ref**(별개 개념·사전 §1.1). RecommendationEvent는 `subject_ref XOR anonymous_ref`, memory는 `subject_ref XOR guest_ref`. anon_v3_는 memory에 직접 유입 금지(V3-11A `isMemorySubjectKeyAllowed`가 코드층 backstop).

## 5. Enum/CHECK mapping table (Prisma CHECK 미지원 → raw SQL/app-level)
| enum | 정본 값 | DB 집행 |
|---|---|---|
| semantic_label | **§2.12 10값**(satisfied·dissatisfied·neutral·adverse_skin_reaction·adverse_other·usage_question_safety·usage_question_general·repurchase_intent·avoid_intent·unclear) | raw SQL `CHECK (semantic_label IN (...))` (patched af26f94 값·구 6값 금지) |
| adverse_severity | low·moderate·severe(§2.4) | raw SQL CHECK |
| adverse_certainty | reported·repeated·verified·contradicted(§2.5) | raw SQL CHECK |
| attribution_mode | direct·session·organic·unattributed·unknown(§2.9) | raw SQL CHECK |
| rec event_type | 5값(V3-03) | raw SQL CHECK |
| direction | positive·negative·safety(§2.1) | ★**신규 컬럼**(G-1)·raw SQL CHECK |
| safety_flag | safety_frozen·safety_caution·safety_block·safety_resolved·pregnancy_nursing_context·NULL(§2.13) | ★**신규 컬럼**(G-1)·raw SQL CHECK |
| status | candidate·approved·rejected(§2.2) | MemoryFactCandidate 존재·LtmFact ★신규 |
| lifecycle_state | demoted 등(§2.2) | ★LtmFact 신규 |

★**watch-1 재발 방지**: 모든 CHECK 리터럴은 migration 작성 시 **사전 §2 자구와 1:1 재대조**(prisma enum 쓰면 값 오타가 굳음). semantic_label은 반드시 **patched 10값**(구 adverse_reaction/unknown 금지).

## 6. Key / nullability / XOR table
| 필드 | 규칙 | DB 표현(제안) |
|---|---|---|
| recommendation_id | **nullable**(R-K1·organic/unattributed/unknown→null) | `String?` + CHECK(형식 rec_v3_ 또는 null) |
| subject_ref XOR anonymous_ref (commerce) | 정확히 하나 | raw SQL `CHECK ((subject_ref IS NULL) <> (anonymous_ref IS NULL))` |
| subject_ref XOR guest_ref (memory) | 정확히 하나·subject_key=COALESCE | partial-unique(migration SQL·prisma 미지원)·INV-DB-1 |
| anonymous_ref | commerce 전용·memory 직접 유입 금지 | memory table에 **컬럼 없음**(구조적 차단)·code backstop(isMemorySubjectKeyAllowed) |
| order_item_id | rec_outcome 단위 | FK→OrderItem.id(cuid·존재) |
| created_at | timestamptz(문자열 정렬 금지) | `DateTime @db.Timestamptz` |

## 7. Invariant-to-DB enforcement table
| invariant | 정의 | DB 집행(제안) | gap |
|---|---|---|---|
| INV-DB-1 identity integrity | subject_ref/guest_ref XOR·subject_key=COALESCE·zero-orphan | partial-unique migration SQL·FK·counter query=0 | 컬럼 존재(subjectRef/guestRef)·partial-unique는 raw SQL |
| INV-DB-2 promotion evidence(P1) | `status='approved' AND direction<>'safety' AND safety_flag IS NULL AND (evidence_count<N_min OR confidence<C_min OR distinct_signal_source_count<2)` count=0 | counter query | ★**G-1 blocking**: direction·safety_flag·evidence_count·distinct_signal_source_count·status **부재** → 컬럼 추가 없이 집행 불가 |
| INV-DB-3 safety-priority | safety fact는 evidence 강등 예외·safety_flag 부착 fact 보호 | CHECK + counter | ★G-1: safety_flag 컬럼 필요 |

★**핵심 결정(G-1)**: LongTermMemoryFact에 **additive 컬럼**(direction·safety_flag·evidence_count·distinct_signal_source_count·status·lifecycle_state) 추가 vs 기존 `isSafety` boolean에 매핑. 후자는 safety_flag의 5값 해상도를 잃음(INV-DB-3/P1 부정확) → **additive 추가 권장**(Open Decision D-2·Leo).

## 8. DB-touch test design (provider-independent와 분리)
- **분리 표기**: `*.dbtest.ts`(별도 runner)·provider-independent(`v3_11.vitest.ts` 43/43)와 혼산 금지.
- **infra-gate 규율**: ephemeral Postgres 미기동/연결 실패 = **SKIP≠PASS**(별도 카운트·"N/N (db)" 라벨·infra 실패를 초록으로 계산 금지).
- 케이스: (a) enum CHECK 위반 insert 거부(구 adverse_reaction/mild insert 실패), (b) subject_ref XOR anonymous_ref 위반 거부, (c) anon_v3_가 memory table 컬럼에 아예 없음(구조 확인), (d) INV-DB-2 counter=0(N_min/C_min/source≥2), (e) safety_flag 부착 fact가 강등 counter에서 제외(INV-DB-3), (f) partial-unique 중복 거부, (g) zero-orphan.
- ★bidirectional: 정상 insert 통과 + 위반 insert 거부 **양쪽**.

## 9. Migration rehearsal plan (non-prod only)
- **대상**: ephemeral/dev Postgres(docker disposable·prod 접근 0). `migrations_legacy_sqlite` 격리 유지(V3-08).
- 순서: baseline migrate deploy pre-gate → additive migration(신규 3 model + LtmFact/Candidate 컬럼 + raw SQL CHECK/partial-unique) → seed 최소 fixture(합성·PII 0) → **zero-violation query 3종**(INV-DB-1/2/3 counter=0) → rollback 리허설.
- ★**additive only**(기존 컬럼 drop/rename 0·NOT NULL 신규는 default 동반)·raw secret/prod DB 0.

## 10. Rollback plan
- migration은 **additive**이므로 rollback = down migration(신규 table drop·신규 컬럼 drop)·데이터 보존(dev fixture만). 
- Cosmile shadow 코드: `git revert`/`reset`(shadow만·main 무영향).
- ephemeral DB는 docker volume 파기(prod DB 무접촉). ★원본 memory.db/dev.db·docker volume 삭제 금지(기존 규율)는 dev artifact 한정 준수.

## 11. Open decisions / LIMITS
- **D-1**: RecommendationEvent = 신규 model vs 기존 CommerceEvent(eventType) 확장. (권장: 신규·계약 소유 명확)
- **D-2(G-1)**: LtmFact에 direction/safety_flag/evidence_count/distinct_signal_source_count/status/lifecycle_state **additive 추가**(권장) vs isSafety 매핑(해상도 손실). ★INV-DB-2/3 집행의 전제 — Leo 결정 필요.
- **D-3(secret_version/rotation·LIMIT)**: 사전/V3-08은 "secret_version dual-read readiness" 언급. 이번 gate는 **`secret_version` 컬럼 readiness만 검토**·실 rotation 실행은 **이월 LIMIT**(V3-11A delta L-a와 함께). subject_ref/furef/anon_ref에 `secret_version smallint default 1` 컬럼을 additive로 둘지 = Open Decision D-3.
- **LIMIT(이월)**: G13 COSMILE-4 실 DDL·LTM full pipeline·semantic 추출·ranking runtime·isMemorySubjectKeyAllowed allowlist 강화(delta L-a)·N_min/C_min 최종 확정(사전 §4·Leo).
- **STOP 후보**: D-2 미결이면 INV-DB-2/3 집행 불가 → **D-2 결정 전 실 migration 착수 금지**.

## 12. Whether actual DB implementation can begin
- ★**아니오(NO)**. 이번은 gate/plan. 실 prisma/migration 착수 전 **D-1/D-2/D-3 Leo 결정** 필요(특히 D-2 = INV 집행 전제). 결정 후 별도 V3-11B implementation batch(fable-builder·non-prod)에서 매핑 표 확정→실패 DB-touch test 먼저→additive migration→zero-violation→evidence.

## 13. Required Leo approval before DB code changes
1. **D-1**(신규 model vs CommerceEvent 확장) 결정.
2. **D-2**(LtmFact additive 컬럼 6종 vs isSafety 매핑) 결정 — ★INV-DB-2/3 집행 전제.
3. **D-3**(secret_version 컬럼 readiness 포함 여부) 결정.
4. non-prod migration rehearsal 환경(ephemeral Postgres) 승인·prod DB/Vault/live 불가 재확인.
5. 승인 후 V3-11B implementation batch 별도 착수(이번 계획엔 코드/파일 0).

## 무결성
gate/plan only · prisma/migration/DB write 0 · 실 스키마 대조(provider postgresql·모델 실측) · 3 gap(G-1 INV 컬럼 부재·G-2 prisma CHECK 미지원·G-3 3-way naming) 명시 · semantic_label=patched §2.12 10값 고정 · INV-DB-1/2/3 매핑·DB-touch test 분리(infra≠PASS)·rollback·secret_version LIMIT · G13/COSMILE-4 제외 · D-1/D-2/D-3 Leo 결정 전 실 migration 착수 금지.
