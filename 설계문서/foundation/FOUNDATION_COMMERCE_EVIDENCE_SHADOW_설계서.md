# FOUNDATION_COMMERCE_EVIDENCE_SHADOW_설계서 — commerce_evidence C Shadow 모듈 정본

> **버전 v0.1.1 · 2026-07-16 · WU1(C-CONTRACT-FREEZE) + authority 문구 정정.**
> **변경이력:** v0.1 (2026-07-16) — WU1 계약 동결: v1 envelope 순수 데이터 계약 · 18 reason code 전용 불변 세트 · byte-호환 idempotency/source-hash 헬퍼 · 합성 golden fixture · WU1 전용 테스트. · v0.1.1 (2026-07-16) — authority 문구 정정(behavior 변경 0): WU2~WU7은 Founder 승인(`c96caef`) 범위이나 reviewed dependency/review gate + 별도 exact Advisor handoff 하에서만 진행(자동 전이 없음·WU1에서 미구현/미착수) · **WU8만 NOT_AUTHORIZED·개시 금지**.
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

WU1 산출물은 **어떤 runtime도 import하지 않는 additive 파일들**이다. rollback = 검토된 forward change로 본 패키지 파일들 + 본 설계서/README 항목 제거 (history rewrite 없음). flag 개념 자체가 아직 없음(WU5).
