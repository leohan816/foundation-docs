# COSMILE MEMORY V3-11 — Contract-to-Code Mapping (구현 전 필수 산출물)

> 작성: foundation-control / **fable-builder** 스킬(분기 reference `contract-to-code-mapping.md` 로드 적용) · 2026-07-06 · ★계획/매핑 only·**제품 코드 수정 0**·Leo 승인 전 착수 금지.
> anchor(정본 커밋 고정): 사전 `DATA_DICTIONARY_CANONICAL`(§1 키·§2 enum·§5 safety) · gate `cdede5d` · P1 `3b52994` · patch `8f9b1a8`. Cosmile anchor: `prisma/schema.prisma`·`src/types/canonicalEvent.ts`·`scripts/foundation-memory-deanon.mjs`.
> ★규율: 매핑 공백 행 = 설계 공백 = STOP · enum은 값 복사 금지(사전 §N 참조·단일 모듈 import) · 식별자 파생식은 정본 생성기 import(재발명=split-brain).

---

## 0. Anchor 확인 결과 (reported≠actual)
- ★**신규 생성기 필요**: Cosmile에 `rec_v3_`/`subj_v2_`/`anon_v3_` 생성기 **0곳**·ULID 라이브러리 **미설치**(grep 실측). → V3-11이 **단일-정본 생성기 모듈**을 신설(각 callsite 재타이핑 금지·split-brain C-4 방지).
- ★**혼동 금지**: 기존 `foundation-memory-deanon.mjs:identityRef()=`ref_`+HMAC[:32]`는 **event de-anon 전용**(다른 개념)이며 subject_ref/anon_v3_ mint가 아니다. V3-11 키 생성기와 별개.
- enum 착지 패턴 = 기존 `canonicalEvent.ts`의 **const-array 단일 소스**(`CANONICAL_EVENT_NAMES`·`FOUNDATION_DECISION_TYPES`) — 사전 enum을 이 패턴으로 옮기고 값 재선언 금지.
- ★**DB 착지는 이번 scope 아님**: prisma model/migration = DB-touch/pre-prod gate 이월. V3-11 = **provider-independent TS 계약·로직·테스트만**.

## 1. 필드 매핑 표 (계약 필드 → 코드 착지)
| 계약 필드 (사전:절) | 코드 착지 (provider-independent) | event/type key | test assertion | enum 출처·nullability |
|---|---|---|---|---|
| `recommendation_id` (§1.1) | **NEW** `src/lib/ids.ts:recommendationId()` = `rec_v3_`+ULID(26) | `recommendation_id` | `rec_id_format`·`rec_id_null_attribution` | 유일 형식·rec_outcome에서 NULLABLE(R-K1) |
| `subject_ref` (§1.1) | **NEW** `src/lib/ids.ts:subjectRef(ref,secret)` = `subj_v2_`+HMAC(`<SVC>_SUBJECT_SECRET`,`'<svc>:subject:'`+ref)[:32] | `subject_ref` | `subject_ref_format`·`subject_ref_env_hmac` | Option B·Option A 미상속 |
| `anonymous_ref` (§1.1) | **NEW** `src/lib/ids.ts:anonymousRef(id,secret)` = `anon_v3_`+opaque32 | `anonymous_ref` | `anon_ref_format`·`anon_ref_not_in_memory_layer` | commerce 계층 전용·memory 직접 유입 금지 |
| `attribution_mode` (§2.9) | `src/lib/attribution.ts` (last-touch·D1) | `attribution_mode` | `attribution_last_touch`·`organic_null_rec` | enum §2.9(direct/session/organic/unattributed/unknown) |
| RecommendationEvent 얕은 상호작용 (§1.3 R-K7·V3-03) | **NEW** `src/types/recommendationEvent.ts` (RecommendationEvent) | `event_type` | `rec_event_owner`·`shallow_interaction_shape` | event_type enum(shown/clicked/dismissed/saved/added_to_cart)·소유=V3-03 단일 |
| rec_outcome_event order_item attribution (§1.2·R-K4/6·V3-04) | **NEW** `src/types/recOutcome.ts` (rec_outcome_event) | `order_item_id`·`recommendation_id?` | `outcome_order_item_grain`·`partial_refund_line` | recommendation_id NULLABLE·order_item 단위 |
| MemoryFactCandidate 생성 규칙 (§1.2·V3-06 R-C1) | **NEW** `src/lib/memoryCandidate.ts` (createCandidate) | `candidate_id`·`fact_type`·`fact_target`·`source_event_refs[]` | `candidate_tombstone_precheck`·`must_not_reappear_block` | fact_type=(fact_type,fact_target,direction)§2.1·status §2.2 |
| adverse signal→severity (D4·§2.4) | **NEW** `src/lib/adverse.ts` (severityOf·matrixEffect) | `adverse_severity`·`adverse_certainty` | `adverse_severity_map`·`adverse_matrix_effect` | §2.4(3값)·§2.5 certainty·§5.3 matrix |
| safety-fact demotion 예외 (P1·INV-DB-2·§5.2) | `src/lib/memoryCandidate.ts` (demotionEligible) | — | `safety_fact_demotion_exempt` | direction≠safety **AND** safety_flag IS NULL만 강등 대상 |
| margin_band (D3·§2.14·§6) | `src/lib/analytics/*` (read-only) | `margin_band` | `margin_band_analytics_only`·`margin_not_in_ranking` | §2.14(low/medium/high)·ranking 미사용 |
| consent gate (D2·§1.3 R-K3) | `src/lib/memoryCandidate.ts` (promotionGate) | — | `consent_before_promotion`·`anon_no_promotion` | 명시 동의 전 promotion 금지 |

- ★enum 열: 전부 사전 §N 참조 + 코드에서 const-array 단일 모듈(값 하드코딩 재선언 금지). CHECK/DEFAULT는 DB-touch gate(이월)에서 사전 자구 대조 후.

## 2. End-to-end key tracing (5종·mint→전파→저장→join)
| key | mint | 전파(함수 시그니처에 인자 존재?) | 저장(이월 DB) | join |
|---|---|---|---|---|
| `recommendation_id` | ids.recommendationId() | RecommendationEvent→rec_outcome_event(**NULLABLE**)→rec_outcome_feedback | rec_outcome_event.recommendation_id | outcome/feedback join |
| `subject_ref` | ids.subjectRef() | XOR anonymous_ref 쌍으로 전 계층 | subject_key=COALESCE(subject_ref,guest_ref) | memory 계층 |
| `anonymous_ref` | ids.anonymousRef() | ★commerce 계층 downstream까지 유지(R-K3)·memory 직접 유입 금지 | rec_outcome_event.anonymous_ref | stitching(§2.10) 경유만 memory |
| `order_item_id` | Cosmile 주문 라인 | rec_outcome_event/feedback 라인 단위(R-K4/6) | order_item 참조 | attribution grain |
| `candidate_id` | memoryCandidate.createCandidate() | source_event_refs[]로 outcome 역참조 | memory_fact_candidate | ltm_fact 승격(이월) |
- ★XOR 쌍(`subject_ref XOR anonymous_ref`): 양쪽 컬럼 + 로직 CHECK가 함께 착지(코드 검증 함수 `assertXor`). anonymous_ref가 하류 함수 시그니처에서 빠지면 조용히 소실(P4 코드판) → 시그니처 검사를 테스트로.

## 3. Lifecycle state mapping
- candidate status(§2.2): `candidate | approved | rejected`(+ lifecycle_state `open/accumulating/promoted/demoted/…`). 전이 유발 코드 = memoryCandidate 함수. ★계약에 없는 전이 생성 금지·dead state 금지.
- ★DEFAULT/CHECK는 사전 §2.2 자구 대조(watch-1 재발 방지: 틀린 기본값을 제약으로 굳히지 말 것) — DB-touch gate에서.

## 4. Safety precedence mapping (평가 순서 = 우선순위)
- **safety 분기 먼저 평가**: `adverse.matrixEffect()` 결과를 commerce 로직이 하향 재대입 불가(단방향 `max(gate,…)`·재대입 금지).
- ★전칭 규칙(demotion/invariant job)의 safety 제외가 **코드 조건**으로: `demotionEligible = direction!=='safety' && safety_flag==null`(P1 코드판·WHERE 절 등가).
- consent gate가 promotion **앞**에 위치(D2·특례가 일반 규칙 앞·placement 순서).

## 5. STOP-flagged 공백 (설계로 반환 필요 시)
- 현재 매핑 표 **공백 행 0**(전 계약 필드가 코드 착지 배정됨). 단 2개 **결정 필요**(공백 아님·구현 파라미터):
  - **ULID 생성**: 라이브러리 미설치 → dev dep(`ulid`) 추가 vs 내장 생성기 — 구현 시 결정(단일 모듈).
  - **`<SVC>_SUBJECT_SECRET` Cosmile env 키**: `.env.example` key-only 반영(실 secret 0) — DB-touch/배포 gate.
- ★계약 모순·safety 약화·필수 필드 부재 = **0건**(delta review에서 P1~P12 CLOSED 확인). 따라서 구현 STOP 조건 미발생.

## 무결성
contract-to-code mapping only · 코드 0 · anchor 실확인(생성기 0곳·형식 gap 명시) · 매핑 공백 0 · enum 사전 참조 · 식별자 정본 생성기 단일화(재발명 금지) · safety 전칭 제외 코드 조건 명시 · DB 착지 이월 · prod/live/main/secret 0 · Leo 승인 전 구현 착수 금지.
