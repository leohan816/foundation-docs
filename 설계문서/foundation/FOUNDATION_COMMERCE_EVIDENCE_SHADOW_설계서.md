# FOUNDATION_COMMERCE_EVIDENCE_SHADOW_설계서 — commerce_evidence C Shadow 모듈 정본

> **버전 v0.5 · 2026-07-16 · WU5(C-SHADOW-SERVICE) 반영.**
> **변경이력:** v0.1 (2026-07-16) — WU1 계약 동결: v1 envelope 순수 데이터 계약 · 18 reason code 전용 불변 세트 · byte-호환 idempotency/source-hash 헬퍼 · 합성 golden fixture · WU1 전용 테스트. · v0.1.1 (2026-07-16) — authority 문구 정정(behavior 변경 0): WU2~WU7은 Founder 승인(`c96caef`) 범위이나 reviewed dependency/review gate + 별도 exact Advisor handoff 하에서만 진행(자동 전이 없음·WU1에서 미구현/미착수) · **WU8만 NOT_AUTHORIZED·개시 금지**. · v0.2 (2026-07-16) — WU2 구현(§9): fail-closed verifier 프로토콜/기본값(`verifiers.py`) + 순수 주입시계 validator 게이트 1~8(`validator.py`) + WU2 전용 테스트 2파일. Advisor gate PASS(`64_`·WU1 evidence `f5c66a8`) 후 별도 handoff(`65_`)로 착수. · v0.3 (2026-07-16) — WU3 구현(§10): 순수 lineage 규칙(`lineage.py`) + 1-프로세스 in-memory `RLock` ephemeral 참조 ledger 게이트 9~11(`ledger.py`·replay/idempotency/collision/lineage-race/atomic-commit/COW rollback/commit_guard seam) + WU3 전용 테스트 2파일. Advisor gate PASS(`71_`·WU2 evidence `6632261`) 후 별도 handoff(`72_`)로 착수. candidate DTO(§10 mapping)/service/audit/flag/durable = WU4~ 미착수 · **1-프로세스 ephemeral 전용·restart/multi-process/durable 주장 0**. · v0.4 (2026-07-16) — WU4 구현(§11): 2 immutable review-only candidate DTO(`CommerceOutcomeCandidateV1`·`CommerceAdverseCandidateV1`) + 순수 pre-ledger 계획 `plan_candidate_drafts_v1` + accepted-result 순수 채택 `adopt_candidate_drafts_v1` + read-only current-gate 사영(`gate_decision` 8키 임시 dict) + WU4 전용 테스트 1파일(`candidates.py`·`test_commerce_evidence_candidates.py`). reviewed design §10.1/§10.3/§10.5/§13.4(구현본 `3d04f6f`) 착지. Advisor gate(`0b67d0c`) + WU4 design clarification(`f225607`) 독립검수 PASS(`b0a22b8`·`c285ebd`) 후 별도 handoff(`84_`·WU3 evidence `74_`) 로 착수. **EphemeralLedger.submit 미호출·WU5 outer-lock/poison-latch/service/audit/flag/store write 0 · current `MemoryCandidate`/`furef_v2`/retention enum 미터치 · skin/other = privacy_scope_exceeded fail-closed · candidate/adoption = RAM-only 내부 effect(공개 응답/durable 저장 아님)**.
> **본 문서는 이미 독립 검수된 C 설계를 모듈 정본으로 성문화한 것이다 — 새 정책/아키텍처/행동/범위/권한 발명 0.**

## 0. 정본 앵커 (전부 foundation-docs · 원문이 우선)

| 앵커 | 커밋 | 내용 |
|---|---|---|
| Reviewed C design (Designer) | `7cbcb8d9bfe012b92d8bf8f1e0ba0957f1610117` | `runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_IMPLEMENTATION_READY_DESIGN_RESULT.md` — 본 모듈의 전체 설계 정본 |
| Independent design review | `920359eb03971540dae405dc836cc00f398e4ff1` | `M2_C_DESIGN_REVIEW_RESULT.md` — VERDICT: **PASS** (C-R1~C-R8·IR-C-N1~N4) |
| Founder authorization | `c96caefe4cfd4c4f4b6bf54251f2b947dfbd51d2` | `58_M2_C_BOUNDED_SHADOW_IMPLEMENTATION_AUTHORIZATION.md` — WU1~7 bounded shadow만 승인·WU8 금지 |
| Documentation allowlist correction | `36690ec2b0810dc46bb90be9fda4a596d5d17af0` | `59_…_DOCUMENTATION_ALLOWLIST_CORRECTION.md` — 본 설계서 + `설계문서/README.md` 경로 승인 |
| Pinned Cosmile producer | `f26fa5ced7083bb8d0af00bda2a54951923ea22f` (Cosmile repo) | `app/src/types/commerceEvidence.ts` · `app/src/lib/ids.ts` · `app/src/lib/commerceEvidenceService.ts` — v1 계약/해시의 byte 정본 |
| Foundation 기준 HEAD | `f6417004d9157766b2b23d4d0870ade7f0c7fe96` | branch `shadow/foundation-shared-memory-v0` |

**우선순위: pinned source > reviewed design 산문 > 본 문서.** (reviewed design §1.4 "Source wins over prose".)

## 1. 모듈이 무엇인가 / 무엇이 아닌가

`foundation/shared_memory/commerce_evidence/` = 미래의 bounded Foundation C 경로(Cosmile 커머스 증거 검증)의 **전용 additive 패키지**. WU1 시점의 실체는 **순수 데이터 계약 + 순수 해시 헬퍼 + 테스트뿐**이다.

- **있는 것 (WU1):** v1 envelope 상수/키셋/enum/정규식(`contract.py`) · 18-code 불변 세트+guarded lookup(`reason_codes.py`) · byte-호환 idempotency/source-hash(`hash_v1.py`) · 합성 golden fixture · WU1 테스트 3파일.
- **없는 것 (전부 후속 WorkUnit — WU1에서 미구현/미착수):** validator/gate 순서(WU2) · verifier seam(WU2) · ledger/lineage(WU3) · candidate DTO(WU4) · service/audit/feature flag/공유 reason guard 위임(WU5) · 검증 하니스(WU6) · 독립 구현 검수(WU7) — **WU2~WU7 = Founder 승인(`c96caef`) 범위이나 reviewed dependency/review gate + 별도 exact Advisor handoff 하에서만 진행(자동 전이 없음)** · **delivery/intake/candidate runtime(WU8) = NOT_AUTHORIZED·항상 금지**.
- 이 패키지는 **어떤 기존 runtime도 import하지 않고, 어떤 기존 runtime에서도 import되지 않는다**(전용 테스트만 소비). 기존 `ingest_event_signal`/`SharedMemoryStore`/api/flag/공유 reason guard **무변경**.
- 검증/수용/저장/전달/해석/후보 생성 **0** — 계약 동결이 곧 수용이 아니다.

## 2. `contract.py` — `cosmile.commerce_evidence.v1` 순수 데이터 계약 (동결)

pinned `commerceEvidence.ts`와 자구 일치(재선언이 아니라 **Python 착지** — TS 원본은 Cosmile 정본, 본 모듈은 Foundation 소비측 동결본).

### 2.1 리터럴 상수
| 상수 | 값 | 원본 |
|---|---|---|
| `SCHEMA_VERSION` | `cosmile.commerce_evidence.v1` | ts:SCHEMA_VERSION |
| `NORMALIZER_VERSION` | `cosmile.closed_feedback_normalizer.v1` | normalizer ts:8 |
| `SOURCE_SERVICE` | `cosmile` | envelope type |
| `CONSENT_PURPOSE_CROSS_SERVICE` | `cross_service_commerce_evidence` | CONSENT_PURPOSES[1] |
| `NOTICE_VERSION_CROSS_SERVICE` | `cosmile.cross_service_commerce_evidence.v1` | NOTICE_VERSIONS |
| `ENVELOPE_CONSENT_STATE` | `granted` (envelope가 주장해야 하는 값) | envelope type / design §4.2 |
| `IDENTITY_STATE_IDENTIFIED` | `identified` | envelope type |
| `PURCHASE_STATE_PAID` | `paid` | envelope type |
| `ADVERSE_CERTAINTY_REPORTED` | `reported` | envelope type |
| `RETENTION_CLASS_NON_ADVERSE` / `RETENTION_CLASS_ADVERSE_HOLD` | `feedback_non_adverse_90d` / `adverse_regulatory_hold` | RETENTION_CLASSES |

### 2.2 enum tuple (값·순서 = pinned source)
`EVIDENCE_TYPES`(purchase_feedback·correction·retraction) · `SATISFACTION_CHOICES`(satisfied·neutral·dissatisfied) · `ADVERSE_TYPES`(skin_reaction·other·usage_safety) · `ADVERSE_SEVERITIES`(low·moderate·severe — unknown은 저장값 아님) · `CONSENT_STATES`(pending·granted·revoked·expired) · `RETENTION_CLASSES` · `EVIDENCE_ENVIRONMENTS`(local·shadow — production alias 없음).

### 2.3 strict key set (mapping당 정확 키 — 초과/부족 = WU2 validator의 거부 대상)
`TOP_LEVEL_KEYS`(10): schema_version·evidence_id·evidence_type·source·actor·purchase·feedback·consent·privacy·lineage.
`SOURCE_KEYS`(5)·`ACTOR_KEYS`(4)·`PURCHASE_KEYS`(4)·`FEEDBACK_KEYS`(4)·`CONSENT_KEYS`(4)·`PRIVACY_KEYS`(3)·`LINEAGE_KEYS`(5): root_evidence_id·supersedes_evidence_id·retracts_evidence_id·normalizer_version·source_hash.
> ★prose 불일치 기록: reviewed design §4.2 산문은 lineage를 "six keys"라 썼으나 **행 목록·pinned type 모두 5키**다. §1.4 "source wins over prose" 적용 — **5키로 동결**(리뷰가 §4.2=shipped envelope 일치를 검증함). 자구만의 산문 오기이며 설계 변경 아님.

### 2.4 정규식 (pinned `ids.ts` 자구)
| 상수 | 패턴 |
|---|---|
| `EVIDENCE_ID_RE` | `^cevi_v1_[0-9A-HJKMNP-TV-Z]{26}$` (Crockford base32·ULID) |
| `SOURCE_EVENT_ID_RE` | `^pf_evt_v1_[0-9A-HJKMNP-TV-Z]{26}$` |
| `IDEMPOTENCY_KEY_RE` | `^cevi_idem_v1_[0-9a-f]{64}$` |
| `SOURCE_HASH_RE` | `^cevi_source_v1_[0-9a-f]{64}$` |
| `SUBJECT_REF_RE` | `^subj_v2_[0-9a-f]{32}$` |
| `PURCHASE_ITEM_REF_RE` | `^pir_v1_[0-9A-HJKMNP-TV-Z]{26}$` |
| `UTC_TIMESTAMP_RE` | `^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$` (producer `Date.toISOString()` 형식 — 형식만; Gregorian 유효성/시계 비교는 WU2 validator) |

`product_ref`/`sku_ref`: v1은 더 좁은 정규식을 정의하지 않는다(비어있지 않은 opaque string / string|null) — 계약상 명시적 무정규식(빈 셀 아님).

## 3. `reason_codes.py` — 18-code 전용 불변 세트

- `COMMERCE_EVIDENCE_V1_CODES` = frozenset — pinned `FOUNDATION_C_REASON_CODES` 18값 자구: unsupported_schema_version · environment_not_allowed · invalid_identity_xor · identity_link_forbidden · consent_missing · consent_revoked · consent_expired · privacy_scope_exceeded · raw_text_or_pii_present · missing_purchase_item_ref · missing_product_ref · duplicate_evidence · invalid_normalization · adverse_fields_inconsistent · lineage_broken · provenance_untrusted · evidence_retracted · retention_expired.
- `commerce_evidence_code(value)` = 세트 멤버면 그대로, 아니면 리터럴 `cannot_determine` (기존 공유 guard의 fallback 값과 동일 리터럴 — 값 정합은 테스트가 공유 모듈을 read-only import해 고정).
- **공유 `foundation/shared_memory/reason_codes.py` 무변경** — guarded 위임 배선은 WU5(handoff §8). WU1 테스트가 "공유 guard는 지금도 18코드를 `cannot_determine`으로 collapse한다"를 회귀 고정(=`_SAFE_DYNAMIC` 미확장 증명).
- IR-C-N1 기록: `privacy_scope_exceeded`는 (미래 WU2에서) "adverse legal policy unconfigured"에도 쓰이는 의도된 fail-closed 매핑 — 19번째 코드 발명 금지.

## 4. `hash_v1.py` — byte-호환 v1 알고리즘 (pinned `ids.ts`/`commerceEvidenceService.ts` 재현)

### 4.1 idempotency (delimiter-free — 재설계 금지)
`evidence_idempotency_key(source_event_id, evidence_type, normalizer_version)` = `"cevi_idem_v1_" + sha256hex_utf8(SCHEMA_VERSION + source_event_id + evidence_type + normalizer_version)`.
- 구분자 없음 = pinned 동작. 경계 이동 충돌(예: `("…A","Bcorrection")` == `("…AB","correction")`)은 **v1 동결 동작**이며 fixture가 명시 고정한다(결함 수정 = 새 envelope 버전 소관).

### 4.2 `canonical_json_v1` — JS `canonicalJson` 의미 재현 (RFC JSON 아님)
pinned 함수: 스칼라 `JSON.stringify` · 배열 순서 유지 · 객체 키 `Object.keys().sort()` 후 `"key":value` 콤마 결합.
Python 재현 규칙(전부 Node v24 실측으로 byte 고정·fixture 수록):
1. **키 정렬 = UTF-16 code unit 순서** (`key=lambda k: k.encode("utf-16-be")`) — ASCII에선 일반 정렬과 동일, JS와 전 문자열 범위 일치.
2. **문자열 escape = JSON.stringify 규칙**: `"`·`\`·U+0000~001F만 escape(`\b\t\n\f\r` 단축 + 그 외 `\u00xx` 소문자 hex). **비ASCII는 literal**(ensure_ascii 금지). 실측: `{"k":"q\"b\\c\nd\tef"}` · `{"k":"한글é"}`.
3. **`UNDEFINED` sentinel** (JS `undefined` 재현):
   - **객체 값 위치** → 리터럴 토큰 `undefined` (`"source_hash":undefined`) — `JSON.stringify(undefined)`가 문자열 연결에서 `"undefined"`로 강제됨.
   - **배열 원소 위치** → **빈 원소** (`["x",,"y"]`) — `Array.prototype.join`이 undefined를 빈 문자열로 렌더. (실측 고정.)
   - top-level 단독 → `TypeError` (producer 미사용 경로·fail-closed).
4. 스칼라: `None`→`null` · `True/False`→`true/false` · `str`→②규칙 · `int`(bool 제외)→십진 문자열 · **`float`/기타 타입 → `TypeError`** (v1 envelope에 수치 필드 없음·JS shortest-round-trip 미재현을 조용히 흉내내지 않음 — fail-closed).
5. 컨테이너: `dict`(str 키만)·`list`만 허용, 그 외 `TypeError`.

### 4.3 source hash
- `evidence_source_hash(fields_mapping)` = `"cevi_source_v1_" + sha256hex_utf8(canonical_json_v1(fields))` (dict 필수).
- `recompute_envelope_source_hash(envelope)` = producer 142행 재현: `{**envelope, "lineage": {**envelope["lineage"], "source_hash": UNDEFINED}}` → `evidence_source_hash`. 입력 envelope의 기존 `source_hash` 값과 무관하게 동일 결과(교체 후 해시).
- source_hash = **무키 무결성 증거일 뿐 인증 아님** (인증 = WU2 verifier·기본 UNCONFIGURED→전부 거부).

## 5. Golden fixture — `tests/fixtures/commerce_evidence_v1_golden.json`

- **합성 식별자만** (`cevi_v1_000…`, `subj_v2_000…32`, `synthetic-product-ref-0001` 등 — 가시적 합성). 실 데이터/PII/secret 0.
- envelope 3종: ①root purchase_feedback(만족만·retention non-adverse) ②correction(dissatisfied + usage_safety·severity null·certainty reported — §4.4 유효행·retention non-adverse) ③retraction(feedback 전부 null). ②·③은 ①을 lineage로 참조. consent.captured_at == occurred_at 경계 포함(리뷰 IR-C-N4의 equal-boundary).
- 각 envelope의 `expected.idempotency_key`·`expected.source_hash`는 **pinned JS 알고리즘을 자구 포팅한 Node v24 참조 스크립트로 독립 산출**(cross-language pin) — Python 구현은 이 값을 향해 수렴해야 하며 fixture를 산출물에 맞춰 역수정하는 것은 금지(test-design §7).
- serializer 미세벡터(정렬/escape/undefined-객체/undefined-배열/null·bool/빈 구조/비ASCII) + delimiter-free 충돌 pin 수록.

## 6. WU1 contract-to-code-test 매핑 표 (공백 셀 0)

| 계약 항목 (원본) | 코드 착지 | 테스트 (파일::구역) | 비고 |
|---|---|---|---|
| SCHEMA_VERSION 리터럴 (ts) | contract.SCHEMA_VERSION | test_…contract::test_literal_constants | 자구 |
| NORMALIZER_VERSION (normalizer ts:8) | contract.NORMALIZER_VERSION | 〃 | 자구 |
| consent purpose/notice/state (ts·design §4.2) | contract.CONSENT_PURPOSE_CROSS_SERVICE / NOTICE_VERSION_CROSS_SERVICE / ENVELOPE_CONSENT_STATE / CONSENT_STATES | test_…contract::test_consent_constants | historic/alias 금지(값만 동결) |
| evidence_type enum (ts) | contract.EVIDENCE_TYPES | test_…contract::test_enums | 3값·순서 |
| satisfaction/adverse_type/severity/certainty (ts) | contract.SATISFACTION_CHOICES / ADVERSE_TYPES / ADVERSE_SEVERITIES / ADVERSE_CERTAINTY_REPORTED | 〃 | unknown severity = 비저장값(부재가 계약) |
| retention classes (ts) | contract.RETENTION_CLASSES(+2 리터럴) | 〃 | |
| environments local/shadow (ts·design §4.2) | contract.EVIDENCE_ENVIRONMENTS | test_…contract::test_enums(+production 거부쌍) | production alias 없음 |
| top-level/nested strict key sets (design §4.1-4.2·ts shape) | contract.TOP_LEVEL_KEYS + 7개 *_KEYS | test_…contract::test_key_sets | lineage=5키(§2.3 산문정정) |
| ID 정규식 6종 (ids.ts) | contract.*_RE 6종 | test_…contract::test_regexes_… | ③쌍(정답 수락·garbage 거부·경계 구체 오답 거부) |
| UTC timestamp 형식 (design §4.1) | contract.UTC_TIMESTAMP_RE | test_…contract::test_timestamp_format | 형식만(유효성=WU2) |
| product_ref/sku_ref 무정규식 (design §4.2) | (의도적 상수 부재 — 계약상 opaque) | test_…contract::test_no_product_ref_regex | 명시적 무매핑 행 |
| 18 reason codes (ts FOUNDATION_C_REASON_CODES·design §5.2) | reason_codes.COMMERCE_EVIDENCE_V1_CODES | test_…reason_codes::test_exact_18_set | set 동일+개수 18 |
| guarded lookup (design §5.2) | reason_codes.commerce_evidence_code | test_…reason_codes::test_guard_{positive,negative} | 18 통과·그 외 cannot_determine |
| 공유 guard 미확장 (design §5.2·IR-C-N2) | (공유 모듈 무변경) | test_…reason_codes::test_shared_guard_not_broadened | 공유 code()가 18코드 collapse 회귀 고정 |
| idempotency 공식 (ids.ts:evidenceIdempotencyKey) | hash_v1.evidence_idempotency_key | test_…hash_v1::test_idempotency_golden(+collision pin) | delimiter-free 동결 |
| canonicalJson 의미 (ids.ts:canonicalJson) | hash_v1.canonical_json_v1(+UNDEFINED) | test_…hash_v1::test_canonical_vectors/undefined | §4.2 규칙 1~5 전부 |
| source hash (ids.ts:evidenceSourceHash) | hash_v1.evidence_source_hash | test_…hash_v1::test_source_hash_golden | |
| 해시 입력 프로젝션 (service ts:142) | hash_v1.recompute_envelope_source_hash | test_…hash_v1::test_recompute_envelope | 전체 envelope + lineage.source_hash=UNDEFINED |
| fail-closed 타입 경계 (본 설계 §4.2-4/5) | hash_v1의 TypeError 경로 | test_…hash_v1::test_type_errors | float/튜플/비str키/top-level UNDEFINED |
| 합성 golden fixture (design §4.3·§13.1) | tests/fixtures/commerce_evidence_v1_golden.json | 세 테스트 파일이 로드 | Node v24 cross-language 산출 |

## 7. 경계·금지 (WU1에도 전면 적용)

Founder authorization(§0 앵커) 자구 준수: 실 DB/네트워크/provider/secret/env/prod/live 0 · delivery/intake/flush/consumer/endpoint 0 · 기존 MemoryCandidate/SharedMemoryStore/approval/reuse/promotion/ranking/safety 연결 0 · furef_v2 합성 0 · SIASIU/Cosmile 변경 0 · main/protected 금지 · **WU8 항상 금지** · 어떤 WorkUnit도 자동 개시 없음.

## 8. rollback

WU1 산출물은 **어떤 runtime도 import하지 않는 additive 파일들**이다. rollback = 검토된 forward change로 본 패키지 파일들 + 본 설계서/README 항목 제거 (history rewrite 없음). flag 개념 자체가 아직 없음(WU5). WU2 rollback 동일(additive `verifiers.py`/`validator.py`/테스트 2파일 제거 — runtime importer 0).

## 9. WU2 — verifier 프로토콜/기본값 + 순수 validator 게이트 1~8 (reviewed design §5.1·§6·§4·§8 착지)

### 9.1 `verifiers.py`
- `ProvenanceVerdict(status, source_identity: bool, envelope_digest: bool)` — 불변 NamedTuple·**진단 필드 구조적 부재**(category-only). status enum: `VERIFIED | UNVERIFIED | UNCONFIGURED | ERROR` (§6.1 자구).
- `CommerceEvidenceProvenanceVerifier.verify(schema_version, source_service, source_environment, source_event_id, evidence_id, evidence_type, idempotency_key, declared_source_hash, recomputed_source_hash, occurred_at, opaque_ingress_context)` — §6.1 자구 11-인자 seam. **기본 구현 `UnconfiguredProvenanceVerifier` → 항상 UNCONFIGURED(바인딩 false)** = 아무것도 통과 못 함.
- `ConsentVerdict(status)` — status enum: `GRANTED | REVOKED | EXPIRED | MISSING | PENDING | MISMATCH | UNKNOWN | UNCONFIGURED | ERROR` (§6.2 자구). `CommerceEvidenceConsentVerifier.verify_effective(subject_ref, purpose, notice_version, captured_at, occurred_at, decision_time, opaque_ingress_context)`. **기본 `UnconfiguredConsentVerifier` → UNCONFIGURED.**
- credential/key/서명/토큰/헤더/endpoint/provider/env/consent store 선택·정의·접근 **0**. `opaque_ingress_context`는 **identity로만 통과**(검사/복사/직렬화/로그/echo 금지 — 테스트가 sentinel로 고정).

### 9.2 `validator.py` — 순수 게이트 1~8 (첫 실패 승리·상태 0·전역 가변상태 0)
`validate_commerce_evidence_v1(envelope, *, decision_time, provenance_verifier, consent_verifier, opaque_ingress_context=None) -> ValidationResultV1`
- `decision_time` = **주입 UTC aware datetime**(naive/비UTC → TypeError — 호출자 계약 위반·envelope 코드 아님).
- 반환 `ValidationResultV1(status, primary_reason_code, reason_codes, provenance_status, consent_status, retention_class)` — 전 필드 category/enum만. `status ∈ {rejected, accepted_for_eligibility_review}` · verifier status 미도달 = `not_evaluated` · 예외/비정상 verdict의 기록 category = `ERROR`. 입력 식별자/해시/필드명·값/예외문/opaque context **미반환·미보존**. 모든 코드는 `commerce_evidence_code()` guard 경유. 내부 예상외 예외 → `cannot_determine` reject(문구 0).
- **게이트 순서와 코드(§5.1 gates 1~8 + §4.1/§4.2/§4.4/§8 자구):**

| G | 검사(순서 고정) | 실패 코드 |
|---|---|---|
| 1 | envelope mapping? → schema_version 자구 → lineage.normalizer_version 자구(§5.2 "missing/wrong … normalizer version") → source.environment(local\|shadow·§5.2 "missing/wrong/non-local/non-shadow") → evidence_id str+RE → evidence_type enum → occurred_at 형식+Gregorian+`> decision_time` 금지(동등 허용) → **base scalar 타입 sweep**(전 leaf = str\|bool\|None·컨테이너 dict/list·str 키 — 수치/기타 타입 금지 §4.1 "no coercion") | invalid_normalization / unsupported_schema_version / environment_not_allowed / invalid_normalization |
| 2 | **재귀 raw/PII 스캔 먼저**(키 카테고리 전 깊이 + 값 패턴·공유 gate 패턴 재사용+§4.5 C 확장 키) → privacy group mapping·`raw_text_stored is False`·`contains_pii is False`(bool 리터럴·비bool 포함 위반) → **extra/unknown key 거부**(top+7그룹·※결측 키는 소비 게이트에서 field-specific) | raw_text_or_pii_present → privacy_scope_exceeded |
| 3 | actor mapping·4키 존재·subject_ref str+`subject_identity.validate_subject_ref`(validate-not-mint 재사용)·anonymous_ref `is None`·identity_state=="identified"·link bool 타입 → 전부 후 `link is True` | invalid_identity_xor → identity_link_forbidden |
| 4 | source.service=="cosmile"·source_event_id/idempotency_key 존재+str+RE·**idempotency 재계산 일치**(WU1 `evidence_idempotency_key`)·lineage.source_hash 존재+str+RE·**source-hash 재계산 일치**(WU1 `recompute_envelope_source_hash`) → **provenance verifier**: `VERIFIED`+양 바인딩 true만 통과(예외/비정상 반환/바인딩 결손 포함 전부 실패·**consent 미호출**) | provenance_untrusted |
| 5 | consent mapping → purpose(결측→consent_missing·불일치→privacy_scope_exceeded) → notice(동일) → state(revoked→consent_revoked·expired→consent_expired·granted 외→consent_missing) → captured_at 형식+Gregorian+`> occurred_at` 금지(**동등 허용** — IR-C-N4) → **consent verifier**: GRANTED만 통과·REVOKED/EXPIRED/MISMATCH→각 코드·그 외 전부(UNCONFIGURED/ERROR/예외/비정상)→consent_missing | consent_missing / consent_revoked / consent_expired / privacy_scope_exceeded |
| 6 | purchase mapping(결측→missing_purchase_item_ref) → purchase_item_ref str+비공백+RE → product_ref str+비공백(무정규식) → sku_ref 키존재·str\|None·빈문자 금지 → purchase_state=="paid" | missing_purchase_item_ref / missing_product_ref / invalid_normalization |
| 7 | feedback mapping·4키 존재 → 토큰 유효성(각 필드 null\|enum·certainty null\|"reported") → type 조건: retraction=4필드 전부 null·비retraction=최소 1축 → **§4.4 조합표**: adverse null⇒sev/cert null · adverse 비null⇒cert=="reported" · skin/other⇒sev 비null · usage_safety⇒sev null | invalid_normalization → adverse_fields_inconsistent |
| 8 | retention_class enum → 기대 class 도출(skin/other adverse=adverse_regulatory_hold·그 외=feedback_non_adverse_90d) 불일치→privacy_scope_exceeded → **adverse hold: 정책 UNCONFIGURED 고정 → 전체 envelope 차단**(privacy_scope_exceeded — IR-C-N1·기간/관할/역할/예외 발명 0) → 비adverse: `occurred_at+90d <= decision_time` → retention_expired(경계=만료) | privacy_scope_exceeded / retention_expired |

- **WU2가 방출 가능한 코드 = 15 stateless + `cannot_determine`(내부 예외 collapse)뿐.** `duplicate_evidence`/`lineage_broken`/`evidence_retracted` = WU3(게이트 9~11)·**미방출**. lineage 필드 **값** 규칙(root/supersedes/retracts 형식·관계) = 게이트 10(WU3) 소관 — WU2는 lineage에 대해 키 정확성(G2)·normalizer(G1)·source_hash(G4)만 판정.

### 9.3 해석 노트 (설계 자구 근거 명시 — 발명 아님·검수 공격 지점으로 공개)
1. **source 그룹 결측/비mapping** → G1 environment 검사가 먼저 실패 → `environment_not_allowed` (§5.2 트리거 자구 "missing/wrong/non-local/non-shadow environment"). §4.1 표의 source→provenance_untrusted는 G4 문맥(무결성/형식)에서 적용.
2. **lineage 그룹 결측/비mapping** → G1 normalizer 검사 실패 → `unsupported_schema_version` (§5.2 트리거 자구 "missing/wrong schema version **or normalizer version**"). §4.1의 lineage→lineage_broken은 G10(WU3)에서 정련.
3. **retraction + 비null feedback** → `invalid_normalization` (producer normalizer는 retraction에서 4필드 전부 null을 방출 — 비null = 유효 normalizer 출력 아님·§5.2 invalid_normalization 계열).
4. **수치 등 비계약 leaf 타입** → G1 base-scalar sweep에서 `invalid_normalization` (§5.1 G1 "base scalar types"·§4.1 "Booleans are not accepted as integers"·계약에 수치 필드 0).

### 9.4 WU2 계약-코드-테스트 매핑 (공백 셀 0)
| 계약 항목 | 코드 착지 | 테스트 |
|---|---|---|
| §6.1 provenance seam/verdict/기본 UNCONFIGURED | verifiers.ProvenanceVerdict/…Verifier/Unconfigured… | test_…verifiers::TestProvenance* |
| §6.2 consent seam/verdict/기본 UNCONFIGURED | verifiers.ConsentVerdict/…ConsentVerifier/Unconfigured… | test_…verifiers::TestConsent* |
| verdict 불변·진단 필드 부재·opaque context identity 통과 | NamedTuple 구조 + validator 전달부 | test_…verifiers::TestVerdictShape · test_…validator::TestOpaqueContext |
| §5.1 G1~G8 첫 실패 순서 | validator._GATES 순차 | test_…validator::TestGatePrecedence (다결함 행렬) |
| 15 stateless 코드 positive+인접 negative | 각 게이트 분기 | test_…validator::TestCode_* (코드별 클래스) |
| 기본 verifier = 전건 거부 | Unconfigured 기본값 경로 | test_…validator::TestDefaultsRejectEverything |
| verifier 예외/비정상 반환/바인딩 결손 fail-closed | G4/G5 try/except+shape 검사 | test_…validator::TestVerifierFailClosed |
| provenance 실패 시 consent 미호출 | 첫 실패 단락 | 동상(호출 기록 fake) |
| 해시 재계산(무결성≠인증) | G4에서 WU1 hash_v1 재사용(재타이핑 0) | test_…validator::TestCode_provenance_untrusted |
| subject validate-not-mint 재사용 | G3에서 subject_identity.validate_subject_ref | test_…validator::TestCode_invalid_identity_xor |
| bool≠int·no coercion | G1 sweep·G2 privacy·G3 link 리터럴 검사 | test_…validator::TestTypeStrictness |
| captured_at==occurred_at 경계 허용(IR-C-N4) | G5 강한 부등호 | test_…validator::TestConsentTimeBoundary |
| 90d 경계=만료 | G8 `<=` | test_…validator::TestCode_retention_expired |
| adverse UNCONFIGURED 전면 차단(IR-C-N1) | G8 상수 고정 | test_…validator::TestAdverseUnconfiguredBlocks |
| category-only·무echo | ValidationResultV1 + repr 검사 | test_…validator::TestNoEcho |
| 상태 0/입력 불변/결정론 | 순수 함수·사본 없는 read-only 접근 | test_…validator::TestPurity |

### 9.5 WU2 경계
게이트 0(flag)·9~11(replay/lineage/commit)·ledger·lineage 상태·candidate·service 응답·audit·metrics·endpoint/transport/DB/durable storage/runtime importer **0** — WU3~WU5 소관·별도 handoff 필요. adverse 정책은 **UNCONFIGURED 상수로만** 존재(설정 경로 없음).

## 10. WU3 — 순수 lineage 규칙 + 1-프로세스 ephemeral RLock ledger 게이트 9~11 (reviewed design §5.1·§7·§9 착지)

### 10.1 입력/출력 경계 (§4.1·§4.2)
- WU3는 **WU2-검증된 합성 envelope + WU2 category status(provenance_status·consent_status) + 주입 `commit_guard`** 만 받는다. WU2 verifier를 호출하지 않고·입력을 정규화하지 않고·게이트 1~8을 재실행하지 않는다.
- 반환 = 좁은 내부 `LedgerResultV1` (미래 `CommerceEvidenceDecisionV1` service 응답 아님). **Foundation 발행 `decision_id`/`lineage_pointer`만 반환 가능** — producer evidence/source-event/idempotency/actor/purchase/product/SKU/consent/hash **값 미반환**. 나머지는 category/count.

### 10.2 `lineage.py` — 순수 규칙 (불변·category-only·전역상태 0·persistence 0)
`plan_lineage(evidence, snapshot) -> LineagePlan` — envelope의 lineage/identity 필드 + read-only lineage snapshot(해당 (service, purchase_item)의 root/current_leaf/tombstone/identity)를 받아 계획만 산출(effect 미적용).
| type | 규칙(§9.1·handoff §5) | 성공 effect | 실패 코드 |
|---|---|---|---|
| purchase_feedback(root) | root_evidence_id==evidence_id · supersedes/retracts None · 동일 (service, purchase_item)에 active root 없음 · **tombstone된 purchase → evidence_retracted** · 그 외 불일치 → lineage_broken | new_root(현 leaf=self) | evidence_retracted / lineage_broken |
| correction | root 존재·비tombstone · root_evidence_id=그 root · supersedes==현 current_leaf · retracts None · subject/purchase_item/product/**sku(양쪽 non-null 시 일치·null↔non-null 전이 금지)** ==root · target에 successor 없음 | advance_leaf(+predecessor superseded) | lineage_broken (tombstone 시 evidence_retracted 우선) |
| retraction | root 존재·비tombstone · root_evidence_id=그 root · retracts==현 current_leaf · supersedes None · identity==root · target successor 없음 | tombstone_root(+eligibility revoked·lifecycle blocked·**slot 0**) | lineage_broken (이미 tombstone/retracted 시 evidence_retracted 우선) |
- parent/root 미도착 = lineage_broken(buffer/추론 금지). 도착순서가 승자 결정 안 함 — lock+current-leaf가 결정.

### 10.3 `ledger.py` — 게이트 9~11 (인스턴스-scoped `threading.RLock` 1개·module/global mutable ledger 0)
`submit(evidence, provenance_status, consent_status, requested_slots, commit_guard, *, decision_id_factory=uuid4hex, lineage_pointer_factory=uuid4hex) -> LedgerResultV1`. 파일/SQLite/DB/Docker/network/env/provider/secret/clock/`SharedMemoryStore` **0**.
- **Gate 9 replay/collision(§7.1·§7.2)**: primary identity `(service, source_event_id)`. 6 uniqueness: (1)source-event (2)(service,evidence_id) (3)(service,idempotency_key) (4)(service,target_evidence_id) correction/retraction 공통 (5)(service,evidence_id,slot∈{outcome,adverse}) (6)(service,root_evidence_id) tombstone 1개+동일 source/purchase lineage replay block. fingerprint(§6 자구): `"sha256:"+sha256(UTF8(json.dumps({"envelope":validated_envelope,"provenance_status":cat,"consent_status":cat}, sort_keys=True, separators=(",",":"), ensure_ascii=True))).hexdigest()`. 커밋된 primary + fingerprint 일치 = **exact_replay**(저장 decision_id/lineage_pointer 반환·replayed=True·mutable lineage 미실행·신규 effect 0). **★exact_replay의 effective_eligibility는 receipt-time 저장값이 아니라 현재 유효 lineage category를 반환한다**(§5.1·§7.2 — 이후 retraction으로 revoke되면 replay도 revoked 보고). fingerprint 불일치 또는 신규 primary가 evidence_id/idempotency_key 재사용 = **duplicate_evidence**(state 0). source_hash 일치만으로 replay/인증 아님.
- **Gate 10 lineage(§7.4 races)**: 같은 lock 아래 `plan_lineage` 적용. 경합: 2 correction→first 승·loser lineage_broken / correction 후 old-target retraction→loser lineage_broken / retraction 후 correction→loser evidence_retracted / 2 retraction→first 승·later evidence_retracted / 커밋된 event 정확 재시도→exact_replay(zero new effects).
- **★slot 요청 fail-closed 검증(§4.2)**: requested_slots는 commit 전 검증한다 — 미지 category·중복은 **silent filter/double-count 금지**로 cannot_determine(state 0)·retraction(creates_slots False)에 slot 요청이 있으면 모순 → cannot_determine. 통과 시에만 검증된 tuple을 예약(created_slots == 실제 예약 수).
- **Gate 11 atomic commit(§7.3)**: 같은 lock 아래 ① `commit_guard()` 재확인(정확히 True만 진행·False/예외/비-bool → **cannot_determine·state 0·slot 0**·기본/미설정 guard는 block) ② 전 uniqueness/lineage 재확인 ③ decision_id/lineage_pointer 할당(root당 pointer 1개·correction/retraction은 root pointer 재사용·producer 값에서 파생 금지·주입 factory 기본 `uuid.uuid4().hex`·형식 `^fcei_dec_v1_[0-9a-f]{32}$`/`^fcei_lin_v1_[0-9a-f]{32}$`) ④ receipt/node 1개 append ⑤ generic slot 예약 또는 lifecycle category만 append ⑥ **all-or-none**. 구현 = **copy-on-write**(신규 인덱스 사본을 만들고 마지막에 원자적 rebind) → 각 mutation 경계(`COMMIT_BOUNDARIES`)의 주입 실패가 receipt/index/root/leaf/tombstone/slot/effect count를 **불변**으로 남김. 예상외 예외 → cannot_determine(문구 0·partial state 0).
- **kill-switch seam(§4.3)**: WU5가 feature flag 소유 — WU3는 flag import/수정 0. 대신 side-effect-free 주입 `commit_guard()`를 lock 아래 commit 직전 호출. 허용적 기본값 금지(기본/미설정 = block).

### 10.4 `LedgerResultV1` (category-only)
`status`(accepted|rejected|exact_replay) · `primary_reason_code`(str|None·전용 guard 경유) · `reason_codes`(()|(code,)) · `decision_id`(Foundation 발행|None) · `lineage_pointer`(Foundation 발행|None) · `effective_eligibility`(not_evaluated|eligible|ineligible|revoked|expired) · `replayed`(bool) · `created_slots`(0|1|2) · `slot_state`(not_created|reserved|superseded|blocked). producer 식별자/hash/payload **미포함**.

### 10.5 inspection/cleanup 경계 (§7)
low-cardinality category/count만 노출(receipt/slot/tombstone count·eligibility category tuple — **식별자-keyed map/payload 미노출**). `clear()`/신규 인스턴스 = in-memory state 전소거(restart/rollback 의미 증명용) — **restart-safe/multi-process/file/durable 주장 0**. adverse 보존기간/production cleanup 정책 발명 0.

### 10.6 WU3 계약-코드-테스트 매핑 (공백 셀 0)
| 계약 항목 | 코드 착지 | 테스트 |
|---|---|---|
| §9.1 root/correction/retraction 규칙 | lineage.plan_lineage | test_…lineage::TestRoot/TestCorrection/TestRetraction |
| out-of-order/wrong-root/wrong-current-leaf | lineage.plan_lineage 분기 | test_…lineage::TestOutOfOrder/TestWrongRoot/TestWrongLeaf |
| subject/purchase/product/SKU cross-root mismatch·no re-key | lineage identity 일치 검사(sku null↔non-null 금지) | test_…lineage::TestIdentityImmutable |
| tombstone 우선·no resurrection | lineage evidence_retracted 우선 | test_…lineage::TestTombstoneWins |
| §7.1 6 uniqueness | ledger Gate 9 인덱스 | test_…ledger::TestUniqueness |
| §7.2 exact replay(same IDs·zero effect) | ledger fingerprint 일치 경로 | test_…ledger::TestExactReplay |
| duplicate/collision | ledger duplicate_evidence | test_…ledger::TestCollision |
| target successor uniqueness | ledger uniqueness 4 | test_…ledger::TestSuccessorUnique |
| slot 예약 uniqueness(outcome|adverse·DTO 아님) | ledger uniqueness 5 | test_…ledger::TestSlotUnique |
| correction/retraction lifecycle category·retraction slot 0 | ledger commit effect | test_…ledger::TestLifecycle |
| §7.4 races(barrier·반복 결정론 스케줄: mutated-collision·correction↔retraction 양 순서·2 retraction·slot retry·guard-off) | ledger RLock+COW | test_…ledger::TestSection74Races |
| 100+ replay·thread race → 1 commit/slot | ledger 원자성 | test_…ledger::TestConcurrencyRaces |
| exact_replay = 현재 유효 eligibility(retraction 후 revoked) | ledger Gate 9 현재 lineage 조회 | test_…ledger::TestExactReplay(replay_after_retraction) |
| slot 요청 fail-closed(미지 category·중복·retraction 요청 → state 0) | ledger slot 검증 | test_…ledger::TestSlotRequestValidation |
| commit_guard OFF/exception/non-bool → state 0 | ledger Gate 11 ① | test_…ledger::TestCommitGuard |
| 각 mutation 경계 주입 실패 → 전 state rollback | ledger COW+probe | test_…ledger::TestRollback |
| instance isolation·clear()·no durability | ledger 인스턴스-scoped + clear | test_…ledger::TestInstanceIsolation |
| repr/snapshot에 producer id/hash/payload/예외문 0 | LedgerResultV1 + snapshot | test_…ledger::TestNoEcho |
| file/DB/network/env/provider/secret/store/API/flag/candidate/service import 0 | 모듈 import 표면 | test_…ledger::TestContainment (AST) |
| fingerprint 자구(§6) | ledger._fingerprint | test_…ledger::TestFingerprint |

### 10.7 WU3 경계
candidate DTO(§10.1 mapping·furef/MemoryCandidate/approval/reuse/store write)·service 응답(§11)·audit/metrics·feature flag(§0 gate)·endpoint/transport/DB/durable storage/runtime importer **0** — WU4~WU5 소관. **1-프로세스 ephemeral 전용**: restart/multi-process/file/durable **주장 0**. rollback = additive `ledger.py`/`lineage.py`/테스트 2파일 제거(runtime importer 0·history rewrite 없음).

## 11. WU4 — 2 immutable review-only candidate DTO + 순수 pre-ledger 계획/채택 (reviewed design §10.1·§10.3·§10.5·§13.4 착지)

> 정본 앵커: 구현본 reviewed design `3d04f6f927b763efd977c23ec44b210fd8dbbedfa637e5144c3d932b53cbeb66`(commit `9549638`) + corrected WU4 clarification `f225607`. **우선순위: pinned source > reviewed design 산문 > 본 문서.** 새 정책/입력필드/reason/version 발명 0.

### 11.1 입력/출력 경계
- WU4(`candidates.py`)는 **WU2-검증된 합성 envelope + 진짜 accepted `ValidationResultV1`** 만 받아 순수 계획(`plan_candidate_drafts_v1`)을 산출하고, **WU3 발행 `decision_id`/`lineage_pointer`** 로 순수 채택(`adopt_candidate_drafts_v1`)한다. **`EphemeralLedger.submit` 미호출**·WU3 게이트 9~11 재실행/재정렬 0·WU5 outer-lock/replay-preserving hard-false submit/poison-latch/response·audit assembly 미구현(WU5 소관·테스트는 landed WU3로 그 경계를 *모델*만 함).
- candidate/evidence ID·content_hash·lineage_pointer = 내부 값 — **producer에 미반환**. adoption = RAM-only 내부 effect(공개 `CommerceEvidenceDecisionV1` 아님).
- I/O·ledger mutation·service call·store write·producer 응답·factory 외 부작용 **0**.

### 11.2 `candidates.py` — 5 immutable 타입 (§10.1 자구)
- `CANDIDATE_CONTRACT_VERSION = "foundation.commerce_evidence_candidate.v1"` — 두 DTO + 두 slot content-hash 사영의 버전 마커(제품/전송/저장/retention/runtime 정책 아님). 1자만 바뀌어도 hash가 바뀐다.
- `CommerceOutcomeCandidateV1`(19 필드·§10.1 표 순서): contract_version·candidate_id(`^fcei_cand_v1_[0-9a-f]{32}$`)·decision_id(`^fcei_dec_v1_…$`)·lineage_pointer(`^fcei_lin_v1_…$`)·subject_ref(`^subj_v2_[0-9a-f]{32}$`)·source_service(`cosmile`)·product_ref(opaque 비공백)·sku_ref(null|비공백)·satisfaction(satisfied|neutral|dissatisfied)·evidence_ref(`^fcei_ref_v1_…$`)·content_hash(`^sha256:[0-9a-f]{64}$`)·consent_scope(`cross_service`)·retention_expires_at(`.sssZ`=occurred_at+90d)·memory_kind(`outcome_feedback`)·sensitivity_level(`normal`)·status(`review_required`)·raw_text_stored(`False`)·applied_to_real_user(`False`)·write_live(`False`).
- `CommerceAdverseCandidateV1`(23 필드·§10.1 표 순서): 위와 동형 + adverse_type(현재 구성가능 값 `usage_safety` 뿐)·adverse_severity(usage_safety 불변식 = null)·adverse_certainty(`reported`)·memory_kind(`safety_note`)·sensitivity_level(`high`)·safety_handling(`human_safety_review_required`)·response_policy(`preapproved_static_guidance_only`·문구 미생성). skin/other는 DTO에 도달 불가.
- `CandidateDraftSeedV1`(내부·불변·17 필드): slot·candidate_id·evidence_ref·content_hash·subject_ref·source_service·product_ref·sku_ref·satisfaction·adverse_type·adverse_severity·adverse_certainty·retention_expires_at·memory_kind·sensitivity_level·policy_gate_decision·policy_reason_codes. decision/lineage 참조·raw content 미포함·producer에 미직렬화.
- `CandidateDraftPlanV1`: status(`planned|rejected`)·primary_reason_code(str|None)·reason_codes(tuple)·requested_slots(tuple)·seeds(tuple)·lifecycle_action(`create_current|supersede_predecessor|revoke_lineage|none`). rejected = 가드된 C category + 빈 slot/seed.
- `CandidateAdoptionV1`: drafts(`Tuple[Union[Outcome,Adverse], …]`)·lifecycle_action.

### 11.3 `plan_candidate_drafts_v1` — 순수 계획 (accepted-only·fail-closed·전역상태 0·I/O 0)
`plan_candidate_drafts_v1(validated_envelope, *, validation_result, candidate_id_factory=_default_candidate_id, evidence_ref_factory=_default_evidence_ref, current_gate=gate_decision) -> CandidateDraftPlanV1`
- **accepted 게이트**: `ValidationResultV1` 이고 status=`accepted_for_eligibility_review`·provenance=`VERIFIED`·consent=`GRANTED`·retention_class=`feedback_non_adverse_90d` 일 때만 진행. 잘 형성된 rejection → 그 **가드된 primary category** 그대로(rejected·상태 0). 비-ValidationResultV1/모순 accepted/mapper·gate·hash·timestamp·factory 예외/무효·중복 ID/예상외 예외 → **`cannot_determine`**(rejected·slot/seed 0·예외문 0).
- **lifecycle**: evidence_type `purchase_feedback`→`create_current` · `correction`→`supersede_predecessor` · `retraction`→`revoke_lineage`.
- **slot 매핑(§10.2·outcome→adverse 순서)**: adverse_type ∈ {`skin_reaction`,`other`} → **`privacy_scope_exceeded`**(satisfaction 유무 무관·slot/seed 0·**factory 호출 0**). retraction → slot/seed `()`·**factory 호출 0**·lifecycle `revoke_lineage`(planned). 그 외: outcome slot ⟺ satisfaction≠null · adverse slot ⟺ adverse_type=`usage_safety`.
- **content_hash(§10.1)**: `sha256:`+`sha256(json.dumps({8키}, sort_keys=True, separators=(",",":"), ensure_ascii=True))`. 8키 = contract_version·memory_kind·product_ref·sku_ref·satisfaction·adverse_type·adverse_severity·adverse_certainty. outcome slot = adverse 3필드 JSON null · adverse slot = satisfaction JSON null(absent-axis 미복사). subject/purchase/decision/lineage/candidate/evidence ID 제외 → 무결성이지 신원/인증 아님.
- **retention**: occurred_at(`.sssZ`) 파싱 + `timedelta(days=90)` → 동일 `.sssZ`(datetime/epoch/duration/retention enum 아님).
- **current-gate 사영(§11.5)** → policy_gate_decision/policy_reason_codes.
- **ID factory**: outcome→adverse 순서로 slot당 candidate factory 1회 후 evidence factory 1회. 형식(`^fcei_cand_v1_…$`/`^fcei_ref_v1_…$`) + plan 내 유일성 검증(무효/중복 → cannot_determine).

### 11.4 `adopt_candidate_drafts_v1` — 순수 채택 (bind-only·total·fail-closed)
`adopt_candidate_drafts_v1(plan, *, decision_id, lineage_pointer) -> CandidateAdoptionV1`
- `planned` plan + WU3 보장 `^fcei_dec_v1_…$`/`^fcei_lin_v1_…$` 만 채택. factory·parsing·hash·gate·I/O·lookup·producer 복사·정책결정 **0** — 두 참조 + 고정 리터럴을 seed 순서대로 최종 DTO에 bind만. retraction(seeds `()`) → drafts `()`·lifecycle `revoke_lineage`. 비-planned/무효 dec·lin/무효 seed(잘못된 리터럴·null ID·잘못된 bool·무효 enum·비-`.sssZ` retention) → **빈 채택(drafts `()`·lifecycle `none`)** fail-closed. **ledger 참조 없음** → `ledger.clear()`/mutation 구조적 불가.

### 11.5 current-gate read-only 사영 (§10.3)
각 seed는 commit 전 현행 `gate_decision`에 **정확히 이 8키 임시 dict** 로 사영된다(read-only·write target 아님): `{subject_ref, memory_kind, sensitivity_level, consent_scope:"cross_service", raw_text_stored:False, write_intent:"candidate_only", applied_to_real_user:False, write_live:False}`, 호출 = `consent_record=None`·`subject_context={"subject_ref": seed.subject_ref}`·`memory_state={}`. `furef_v2`/`retention_policy`/candidate·evidence ID/product·SKU/`gate_decision`/write target **미포함**. 허용 결과쌍만 통과: outcome=`allow`/`[allow_shadow_write]`(읽기전용 정책증거·write 권한 아님) · usage-safety adverse=`block`/`[high_sensitivity_reconfirmation_required]`(별도 human-review draft 보존·shared-memory materialization 차단). 그 외 결과/예외/reason/decision → 계획 `cannot_determine`. `SharedMemoryStore.ingest`/`write_approved_memory`/learning approval/reuse 호출 **0**.

### 11.6 WU4 계약-코드-테스트 매핑 (공백 셀 0 — §13.4 14 oracle)
| 계약 항목(oracle) | 코드 착지 | 테스트 |
|---|---|---|
| (1) contract 리터럴·두 DTO·두 hash projection에 존재·1자 변경→hash 변화 | candidates.CANDIDATE_CONTRACT_VERSION | TestContractLiteral |
| (2) DTO `_fields` 순서·annotation·잘못된 리터럴/무효·null ID/잘못된 bool/무효 enum/비-UTC retention 구성 거부 | 두 DTO NamedTuple + adopter `_build_*` 검증 | TestDtoFieldsAndValidation |
| (3) satisfaction-only→`("outcome",)`·usage-safety-only→`("adverse",)`·combined→`("outcome","adverse")`·tuple/seed/DTO 순서 동일 | planner slot 매핑 + adopter | TestSlotOrder |
| (4) 8키 JSON projection·명시 null absent-axis·compact sorted ASCII·golden 값·subject/purchase/decision/lineage/candidate/evidence ID 무영향 | planner `_content_hash` | TestContentHashGolden |
| (5) retention = occurred_at+90d(월/년/윤년 경계)·`.sssZ`·retention enum 부재 | planner `_retention_expires_at` | TestRetention |
| (6) purchase_feedback=`create_current`·correction=`supersede_predecessor`(corrected axes만)·retraction=`revoke_lineage`(slot/seed/factory 0) | planner lifecycle 분기 | TestLifecycle |
| (7) skin/other(+satisfaction)→`privacy_scope_exceeded`·상태 0·factory 0·satisfaction 미억제 | planner skin/other fail-closed | TestSkinOtherFailClosed |
| (8) factory 순서 candidate/evidence per outcome→adverse·예외/무효/중복 ID/malformed result/timestamp·hash·gate 예외/예상외→`cannot_determine`·상태 0·예외문 0 | planner factory/guard | TestFactoryOrderAndFailClosed |
| (9) spy gate 8키·정확 keyword context·outcome=allow/[allow_shadow_write]·adverse=block/[high_sensitivity_reconfirmation_required]·대체 결과→계획 거부·오직 replay-preserving hard-false submit만 후속 | planner current-gate 사영 | TestCurrentGateProjection |
| (10) accepted receipt seed 후 retry factory·gate 실패 → fallback `requested_slots=()`+hard-false guard가 WU3 `exact_replay`(원 decision/lineage/현재 eligibility·신규 effect 0)·collision→`duplicate_evidence`·unseen lineage-valid→`cannot_determine`·lineage-invalid→gate10 reason(게이트 9~11 재정렬 불가 증명) | planner 실패→WU5 fallback 모델(landed WU3) | TestReplayPreservingOrder |
| (11) accepted만 tuple bind·rejection/collision 폐기·exact_replay 0 채택·count/state 불일치 fail-closed·bind 값=WU3 값·WU3에 candidate/evidence/hash/DTO content 0 | adopter + WU5 count 검증 모델 | TestAdoptionOnlyAccepted |
| (12) post-accepted bind 실패 → unrelated WU3 state byte-불변·`ledger.clear()` 미호출(WU5 latch 미구현) | adopter(ledger 무참조) + snapshot | TestPostAcceptedContainment |
| (13) DTO/plan/adoption·producer evidence/source/purchase/product/SKU/subject 값이 모의 public 직렬화에 부재 | 모의 public projection | TestNoProducerEcho |
| (14) store/API/service/audit/flag/learning/approval/reuse/ranking/safety/file/DB/env/network/provider/transport/secret/current `MemoryCandidate` import·call 0·선언된 WU4 파일만 변경 | candidates 모듈 import 표면 | TestContainment (AST) |

### 11.7 WU4 경계
`EphemeralLedger.submit` 호출·WU5 outer-lock/replay-preserving hard-false submit/poison-latch·`service.py`/audit/metrics·feature flag·current `MemoryCandidate`/`furef_v2`/retention enum/store writer·skin/other 수용·adverse-hold 발명·새 reason/version/입력필드·public 응답·persistence/delivery/intake/DB/env/network/provider/secret **0** — WU5~ 및 별도 승인 소관. candidate/adoption = **RAM-only 내부 review-only**(승인/reuse/promotion/ranking/safety mutation 아님). rollback = additive `candidates.py`/테스트 1파일 제거(runtime importer 0).

## 12. WU5 — default-OFF 1-프로세스 ephemeral review-only 서비스 + 최소화 audit/metrics + flag/reason 통합 (final reviewed design §11.1·§11.4~§11.8 착지)

> 정본 앵커: final reviewed design `4480b55f43b876499746efe6497b5e2e4eb1931d`(SHA-256 `6e9842a3665251fc54ed66f5f12ca51b948869029b2e02105dd24d8e752406a9`) §11 · WU5 design PASS `3878541`·consistency delta PASS `062c1d6` · WU5 Advisor gate `afa9479`. **우선순위: pinned source > reviewed design 산문 > 본 문서.** 새 정책/reason(19번째)/version/입력필드/게이트 발명 0. ★**WU5는 제품 테스트/픽스처 경로 0·제품 코드 import/실행 0**(모든 실행 증명 = WU6 소관·§13.5). 정적 증거만.

### 12.1 입력/출력 경계
- WU5(`service.py`·`audit.py`)는 landed WU2(validator)·WU4(candidates)·WU3(ledger)·verifier·gate를 **주입 seam**으로 합성만 한다(WU1~WU4 무변경). 반환 = 좁은 `CommerceEvidenceDecisionV1`(§11.1) — **Foundation 발행 `decision_id`/`lineage_pointer`만**·producer/candidate/evidence 식별자·payload·raw·PII·hash·자격증명·진단·예외문/스택 미반환. `applied_to_real_user`/`write_live`/`promotion_performed` 항상 False.
- endpoint/consumer/transport/delivery/intake/store write/DB/file/env/network/provider/secret/module singleton/기존 API import **0**.

### 12.2 `service.py` — 응답 타입 + 서비스 표면 (§11.4·§11.5)
- `DECISION_CONTRACT_VERSION = "foundation.commerce_evidence_decision.v1"`.
- `CandidateOutcomeV1(created_count:int, state:str)` · `CommerceEvidenceDecisionV1`(12 필드·§11.4 순서: contract_version·status·decision_id·primary_reason_code·reason_codes·lineage_pointer·effective_eligibility·candidate_outcome·replayed·applied_to_real_user·write_live·promotion_performed). status ∈ {disabled, rejected, accepted_for_eligibility_review, exact_replay} · state ∈ {not_created, review_required, blocked, superseded} · eligibility ∈ {not_evaluated, eligible, ineligible, revoked, expired}.
- `_decision_v1(*, status, decision_id, primary_reason_code, lineage_pointer, effective_eligibility, created_count, candidate_state, replayed)` — 유일 생성자. 모든 reason은 **공유 `reason_codes.code`** 경유·array = ()|(guarded primary,)·contract_version + 불변식 3개 고정 False·조합 무효 → 고정 rejected/`cannot_determine` shape. 임의 필드 수용 0.
- `CommerceEvidenceShadowService(*, ledger, clock, provenance_verifier, consent_verifier, decision_id_factory, candidate_id_factory, evidence_ref_factory, lineage_pointer_factory, current_gate, audit_sink, metrics_sink, flag_reader)` — 전 인자 주입·§11.5 정확 기본값(UNCONFIGURED verifier=0 수용·landed factory 재사용·`flag_reader=feature_flags.get`). 생성자는 callability/interface를 고정 메시지 `TypeError`로만 검증(secret/env/file/DB/network/provider/clock service 접근 0). service-owned outer `RLock` 1개 + `candidate_effect_healthy` latch.
- `.evaluate(envelope, *, opaque_ingress_context=None) -> CommerceEvidenceDecisionV1` — 단일 표면. `opaque_ingress_context`는 identity로만 WU2에 통과(검사/복사/직렬화/로그 0).

### 12.3 `service.py` — orchestration/audit 정직/decision-ID 소유 (§11.7)
outer `RLock` 아래(§11.7 1~8 순서):
1. **게이트 0(flag)**: `flag_reader(commerce_evidence_c_shadow) is True`만 진행. OFF → `disabled`(null ID/reason·not_evaluated·0/not_created·replay false)·envelope 미검사·best-effort unlabeled `commerce_evidence_flag_enabled` gauge 0(실패 무해). ON이나 latch poison → `rejected/cannot_determine`(null ID·0/blocked)·parse/sink 없이 정지.
2. 평가 `decision_id` 1개 할당·`^fcei_dec_v1_[0-9a-f]{32}$` 검증 → 유효 UTC 시각 1개. ID 실패 시에만 ID null·유효 시각 없으면 audit 0. 안전 envelope category 추출.
3. **WU2 검증**(동일 시각/verifier/context). rejection → 응답/audit/metrics 구성·WU4/WU3 미호출. sink 실패는 rejection을 못 바꾸고 poison 안 함. candidate state: `privacy_scope_exceeded`(privacy/adverse-policy scope) → `blocked`·그 외 rejection code(structural/provenance/consent/retention) → `not_created`.
4. **WU4 계획**. planned → 그 slot + 실 flag 재확인 guard. 실패 계획 → 가드 category 유지하되 **여전히 `requested_slots=()` + hard-false guard로 WU3 진입**(게이트 9 replay/collision·게이트 10 lineage가 게이트 11에 선행).
5. **WU3 `submit`**(unchanged) — `decision_id_factory=lambda: evaluation_id`·주입 lineage factory. rejection/collision은 평가 ID를 응답/audit 층에서만 받음. exact_replay는 WU3 저장 ID/pointer 반환(retry 평가 ID 폐기). 첫 accepted root/correction/retraction은 평가 ID를 저장.
6. WU3 rejection → category-only rejection audit/metrics(sink 실패는 rejection 유지). exact_replay → 채택 0. accepted → slot/count/state 검증 후 WU3 ID로 WU4 draft bind·불일치/빈 채택 필요시 = post-ledger 실패.
7. success/replay audit **prebuild → append → emit_many**, 각 sink **literal True** 요구·그 뒤에만 `accepted`/`exact_replay` 방출. audit은 WU3 원자 상태가 아님(정직한 비원자성).
8. **post-accepted/replay 불변식/bind/audit/metric/조립 실패** → 이 호출 채택 폐기·`candidate_effect_healthy=False`·`rejected/cannot_determine`(해당 WU3 ID·null lineage·not_evaluated·0/blocked)·**`ledger.clear()` 미호출·prior receipt/slot/lineage/tombstone/eligibility 전소 보존**·이후 모든 호출 거부(복구=새 인스턴스/재시작뿐). 이미 append된 audit/metric은 롤백 없음(원자 주장 0). 예상외 **pre-ledger** 예외는 poison 아님(§11.8 last row).

decision-ID 소유(§11.7 표): disabled/poison/ID-factory 실패 → null·ledger 미호출 · pre-commit/WU3 rejection → 평가 ID·receipt 0 · exact_replay → WU3 저장 ID · 첫 accepted → 평가 ID 저장 · post-ledger 실패 → 해당 WU3 ID이나 rejected 응답·instance poison. lineage_pointer는 매칭되는 WU3 결과만 노출·모든 rejection은 null.

### 12.4 `audit.py` — 최소화 category audit + 저-cardinality metrics (§11.2·§11.3·§11.4)
- `AUDIT_CONTRACT_VERSION = "foundation.commerce_evidence_audit.v1"`. `SafeEnvelopeCategoriesV1`(schema_version·source_service·environment·evidence_type — v1 enum에 정확히 속할 때만 채움·그 외 null) · `CommerceEvidenceAuditV1`(§11.2 allowlist 20 필드·불변식 3 False) · `CommerceEvidenceMetricV1`(name·정렬 label tuple·비음수 int value).
- 생성자 `safe_envelope_categories_v1(envelope)` · `build_audit_v1(...)`(무효 enum/count/타입/예외 → None·레코드 0·진단 0) · `build_metrics_v1(*, decision, audit)`(§11.3 6종·§11.8 고정 순서 label: decision `status/primary_reason_code/schema_version/environment`·verifier `verifier/verdict_category`(provenance→consent)·candidate `kind/state`(채택 kind당)·lineage `action/outcome_category`·invariant `applied/write_live/promotion`=전부 0. null category → literal `none`. 이벤트 counter value=1·invariant/flag gauge=0).
- 좁은 seam `CommerceEvidenceAuditSink.append(record)->bool` · `CommerceEvidenceMetricsSink.emit_many(records)->bool`. 기본 `InMemory*Sink`은 인스턴스-scoped `RLock`·선언된 불변 레코드만 저장·**literal True만 성공**·파일/DB/env/network/provider 0. `audit_time` = 주입 시각의 정확 밀리초 UTC `.sssZ`. payload/raw/PII/식별자/자격증명/진단/예외문 필드 **부재**.

### 12.5 flag + shared reason 통합 (§11.6)
- `foundation/feature_flags.py`(additive): 4 리터럴 — `COMMERCE_EVIDENCE_C_SHADOW`(FLAGS=False) · `COMMERCE_EVIDENCE_C_LIVE`·`COMMERCE_EVIDENCE_C_INTAKE`·`COMMERCE_EVIDENCE_C_CANDIDATE_RUNTIME`(HARD_OFF). 기존 FLAGS/HARD_OFF/`get()`/`hard_off_enforced()` byte-불변·setter/env 경로 0. `get()`는 HARD_OFF 멤버를 항상 False로 유지. commit_guard가 동일 exact-True 재확인.
- `foundation/shared_memory/reason_codes.py`(additive): `_SAFE_DYNAMIC` **byte-불변** 보존 + 전용 `commerce_evidence_code` import + `code()`가 하나의 try 안에서 기존 동적 코드 통과 후 18-code C guard 위임. 미지·unhashable·예외 보유·오탈자·service-health 값 = 기존 literal `cannot_determine`. **19번째 C reason·진단 채널 0.**

### 12.6 WU5 계약-코드-정적증거 매핑 (공백 셀 0 · 실행 증명은 WU6·§13.5)
| 계약 항목(§11) | 코드 착지 | WU5 정적 증거(비변경) |
|---|---|---|
| §11.4 `CommerceEvidenceDecisionV1`/`CandidateOutcomeV1`/`_decision_v1`·status/state/eligibility enum | service.py | AST: 필드 순서/타입·생성자 시그니처·enum literal 집합 |
| §11.4 audit/metric 타입·생성자·narrow sink·True-only·RLock | audit.py | AST: 필드 순서·시그니처·`is True` 성공·`threading.RLock` |
| §11.5 주입 seam + 정확 기본값(UNCONFIGURED=0·landed factory 재사용·flag_reader=get) | service.py `__init__` | AST: 기본값 표현식·`_default_*`/`Unconfigured*` 참조·고정 메시지 TypeError |
| §11.6 4 flag 리터럴·shadow False·3 HARD_OFF·get 불변 | feature_flags.py | literal/set 검사: 이름·값·HARD_OFF 멤버십·기존 라인 byte-불변 |
| §11.6 `_SAFE_DYNAMIC` 보존 + 18-code 위임 + 예외→cannot_determine | shared reason_codes.py | old-set 동등·import·try/except 위임 AST |
| §11.7 게이트 0 우선·outer RLock·flag commit 재확인·WU2→WU4→WU3 순서·hard-false 실패계획 submit | service.py | 호출 그래프 AST(순서·`_hard_false`·`commit_guard`)·`is True` 게이트 |
| §11.7-8 post-ledger poison·`ledger.clear()` 미호출·prior 상태 보존 | service.py | AST: `_candidate_effect_healthy=False`·no `clear`·no ledger mutation |
| §11.8 path 행렬(disabled/poison/ID·clock/rejection/collision/replay/accepted root·correction·retraction/post-ledger/unexpected) | service.py | 정적 분기/projection 검토(category-only·null lineage 규칙) |
| §11.1 category-only·식별자 미반환·불변식 False | service.py·audit.py | AST: 반환 필드·응답/audit/metric에 producer/candidate/evidence 값 부재 |
| 컨테인먼트: endpoint/socket/request/consumer/sender/provider/DB/file/env/secret/store/`SharedMemoryStore.ingest`/기존 API import 0·module singleton 0 | 6 경로 전부 | AST/정적 스캔: 금지 import/call/name 부재·legacy API가 C를 import 안 함 |

### 12.7 WU5 경계
WU6~WU8·제품 테스트/픽스처·기존 API/runtime 변경·7번째 경로·새 정책/version/reason(19번째)/게이트/입력필드·제품 코드 import/실행·endpoint/consumer/transport/delivery/intake·persistence/DB/file/env/network/provider/secret/PII·current `MemoryCandidate`/`furef_v2`/store connection·approval/reuse/promotion/ranking/safety mutation·production/live/intake/candidate-runtime 활성화·M3 **0**. rollback = flag OFF + additive `service.py`/`audit.py` 제거 + `feature_flags.py`/공유 `reason_codes.py` additive 라인 되돌림(runtime importer 0·기존 동작 byte-fallback). 모든 실행 오라클 = WU6(§13.5).
