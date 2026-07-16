# M2 C — WU2 C-VERIFIER-VALIDATOR Worker Result (Foundation)

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-C-WU2-VERIFIER-VALIDATOR-001
ACTOR: foundation Worker (same Foundation implementation actor)
PROJECT: FOUNDATION
REPOSITORY: /home/leo/Project/FOUNDATION
BRANCH: shadow/foundation-shared-memory-v0
STARTING_BASE: c7653b77900e6613d75fcc0f72577e6bbcb171fd (== WU2 handoff BASELINE_COMMIT, verified == upstream)
WU2_IMPLEMENTATION_HEAD: a57344680650d5fb22452b94bf92ba4f4a5caa0e (원 WU2 구현 — 본 결과 §1~§14의 대상)
FINAL_WU2_PRODUCT_HEAD: c42c69b42fed3428f3d15b834b193bb8c79c7ef5 (Advisor Finding A·B 정정 follow-up — §15)
SESSION: foundation / window @3 / pane %3 (tmux live-verified)
ACTUAL_MODEL: Opus 4.8 (1M context) — ★safeguard model switch disclosed: implementation began under Claude Fable 5 (session default) and the harness switched the live runtime to Opus 4.8 as a safeguard (Fable 5 unavailable) before the final max-effort verification. Same session / same actor / same conversation; a Worker is a role, not a model brand. Recorded exactly as the live runtime reported, not inferred.
EFFORT: implementation = ultracode; final WU2 verification = max (live /effort switch recorded immediately before final tests/static/privacy/diff/mirror/staging)
REQUIRED_SKILL: /fable-builder (loaded; contract-to-code-mapping · test-design-before-code · implementation-execution · implementation-report-template read directly)
DATE: 2026-07-16
RETURN_TO: foundation-advisor
```

## 1. 구현 범위 (reviewed design §17 WU2 `C-VERIFIER-VALIDATOR`만)

- §6.1 provenance verifier 프로토콜/verdict/기본 `UNCONFIGURED` → `verifiers.py`
- §6.2 current-effective consent verifier 프로토콜/verdict/기본 `UNCONFIGURED` → `verifiers.py`
- §5.1 순수·주입시계 validator **게이트 1~8** (WU1 계약/hash/reason primitive 재사용) → `validator.py`
- §§4·6·8 strict shape/type/value·raw/PII·identity·provenance·consent·purchase·closed-normalization·retention 검사
- WU2 전용 합성 테스트: 게이트 선행성·기본 거부·category-only·인접 negative → 테스트 2파일
- 정본 설계서 §9 갱신(v0.2) + byte-identical mirror

**이행하지 않은 절(의도·미승인·별도 handoff):** 게이트 0(flag)·게이트 9~11(replay/ledger/lineage state/commit)·candidate DTO(§10)·service 응답(§11)·audit/metrics·endpoint/transport/DB/durable storage/runtime importer. stateful 코드 `duplicate_evidence`/`lineage_broken`/`evidence_retracted` = WU3·**미방출**.

## 2. 수정 파일 (6 · commit a573446 · +1240/-4)

| 파일 | 종류 | diff |
|---|---|---|
| foundation/shared_memory/commerce_evidence/verifiers.py | 신규 | +70 (2 verdict NamedTuple·2 seam·2 Unconfigured 기본) |
| foundation/shared_memory/commerce_evidence/validator.py | 신규 | +394 (게이트 1~8·ValidationResultV1·순수 helper·전역 가변상태 0) |
| foundation/shared_memory/tests/test_commerce_evidence_verifiers.py | 신규 | +107 (9 tests) |
| foundation/shared_memory/tests/test_commerce_evidence_validator.py | 신규 | +609 (52 tests) |
| 설계문서/FOUNDATION_COMMERCE_EVIDENCE_SHADOW_설계서.md | 갱신 | +59/-3 (§9 WU2 매핑·헤더 v0.2·rollback 1줄) |
| 설계문서/README.md | 갱신 | +1/-1 (인덱스 v0.2) |

## 3. 수정하지 않은 파일 (diff scope 선언 대비 일치 — `git diff --stat c7653b7 HEAD` = 0)

WU1 4모듈·fixture·테스트 3파일·package `__init__.py` · 공유 `gate.py`/`subject_identity.py`/`reason_codes.py`/`api.py`/`store.py` · `feature_flags.py` · 의존성/manifest/lockfile/schema/migration/config — 전부 **0 변경**. 선재 untracked 2파일(`docs/FOUNDATION_DOCS_SYNC_POLICY.md`·`설계문서/FOUNDATION_SERVICE_SEMANTIC_ADAPTER_ARCHITECTURE_20260630.html`) byte-untouched·unstaged.
validator는 공유 `gate`의 raw/PII **상수**(`_RAW_KEYS`/`_PII_KEYS`/`_PII_PATTERNS`)와 `subject_identity.validate_subject_ref`를 **read-only 재사용**(재타이핑 0·write 0·gate_decision/store 미호출) — handoff §2.5 "reuse a validation primitive".

## 4. 계약 매핑

완전 매핑 표 = 정본 설계서 §9.4 (`설계문서/FOUNDATION_COMMERCE_EVIDENCE_SHADOW_설계서.md` @ a573446·mirror sha256 `25173ecd46303521039276b774cd2d7be7b6790472d8d67d096fc71171b4b2b1`) — 공백 셀 0. 게이트별 검사 순서·코드는 §9.2 표, 해석 노트(자구 근거)는 §9.3.

## 5. 계약 이탈(deviation)

**없음.** 설계 자구 해석 4건을 §9.3에 **명시 공개**(발명 아님·검수 공격 지점): (1) source 그룹 결측→G1 environment_not_allowed (§5.2 자구) (2) lineage 그룹 결측→G1 unsupported_schema_version (§5.2 "missing … normalizer version" 자구) (3) retraction+비null feedback→invalid_normalization (4) **비계약 leaf 타입(int/float/기타)→Gate 1 base-scalar sweep에서 invalid_normalization** (§9.2 G1·§4.1 "Booleans are not accepted as integers"; Gate 2 raw/PII·extra-key보다 먼저). ★정정 이력: WU2 최초 구현(`a573446`)은 이 Gate 1 sweep을 누락해 비계약 타입을 후속 field-specific 게이트/해시로 흘려보냈으나, **Advisor Finding A로 Gate 1 sweep을 도입해 설계 §9.2/§9.3과 정합화**(최종 head `c42c69b`·§15). "전역 scalar sweep 미도입"은 폐기된 중간 상태 서술이다.

## 6. 테스트 결과 (전부 pure · 재현 명령 포함)

**구현 전(정직한 실패 — 모듈 부재):**
```text
python3 -m unittest foundation.shared_memory.tests.test_commerce_evidence_verifiers  → rc=1 (ImportError)
python3 -m unittest foundation.shared_memory.tests.test_commerce_evidence_validator   → rc=1 (ImportError)
```

**구현 후 — 최종 max effort(unmasked rc):**
```text
test_commerce_evidence_verifiers  → rc=0 ·  9/9 OK
test_commerce_evidence_validator  → rc=0 · 52/52 OK
test_commerce_evidence_contract   → rc=0 · 12/12 OK   (WU1 delta — no drift)
test_commerce_evidence_reason_codes → rc=0 · 7/7 OK   (WU1 delta — no drift)
test_commerce_evidence_hash_v1    → rc=0 · 14/14 OK   (WU1 delta — no drift)
```
- pure: **94/94** (DB/네트워크/secret/env 무접촉 — AST forbidden-node 스캔으로 사전 증명). db-touch/safety-invariant 층: 해당 없음.
- regression 근거(delta basis): WU2 diff는 공유 `gate`/`subject_identity`를 **수정하지 않고 상수/함수만 read-only import** → legacy shared-memory/subject-ref 스위트의 의존성 미변경. `git diff --stat c7653b7 HEAD -- <shared files>` = 0으로 무변경 증명(§3). 불필요 재실행 생략(handoff §8.5).
- 테스트 diff에 기대값/oracle **하향** 변경: 없음. ★test-input 정정 1건(§9 하단): 게이트 5~8 positive 테스트의 입력 envelope에 `seal()`(idempotency_key/source_hash 재계산) 도입 — **oracle 약화가 아니라 producer-일관 입력 재현**.

### 6.1 test-input 정정 근거 (test-design §5 판정 — 코드 아닌 테스트 수정이 정답인 사례)
초기 구현 후 게이트 5~8 positive 테스트 13건이 `provenance_untrusted`로 실패. 판정: validator 게이트 순서(§5.1 G4 provenance가 G5~8보다 **선행**) + source_hash가 **whole-envelope**(§4.3)이므로, 골든 envelope를 변형만 하고 재봉인 안 한 입력은 hash 불일치로 G4에서 정당히 거부된다 — **코드가 계약대로 정확**하고 **테스트 입력이 producer-authentic envelope를 오모델**했다. 실제 producer가 방출하는 형상을 재현하려면 변형 후 `evidence_idempotency_key`/`recompute_envelope_source_hash`(WU1 함수)로 재봉인해야 게이트 5~8에 도달. → `seal()` helper 도입(provenance-tamper/게이트1~4 테스트는 미봉인 유지 — 그 자체가 위/변조 모델). 이 첫 test-input 정정(seal)은 그대로 유효하다.
★oracle 1건의 **중간 결론 → 최종 상향정정**(정직 이력): WU2 최초 구현(`a573446`)에서는 `product_ref=int`를 field-specific **missing_product_ref**로 이동했다. **그러나 이 중간 결론은 Advisor Finding A로 상향정정(superseded)되었다** — 수치/기타 비계약 leaf(int/float 등)는 **Gate 1 base-scalar sweep 소관**이므로 최종 oracle은 **Gate 1 `invalid_normalization`**이다(최종 head `c42c69b`·§15). 따라서 `product_ref=int`·`purchase_item_ref=int`·int link·int privacy bool은 전부 최종적으로 Gate 1 `invalid_normalization`이다.

## 7. 무엇을 증명했는가

- **기본 fail-closed**: provenance/consent 기본 `UnconfiguredVerifier` → 골든 envelope도 `provenance_untrusted`/`consent_missing`으로 거부(수용 0). VERIFIED+양 바인딩 true만 통과·GRANTED만 통과.
- **verifier fail-closed 완전성**: provenance UNVERIFIED/ERROR/미지 status/바인딩 결손/예외/비정상 반환 → 전부 `provenance_untrusted`(category `ERROR` 기록). consent REVOKED/EXPIRED/MISMATCH→각 코드·그 외 전부→`consent_missing`. **provenance 실패 시 consent 미호출**(fake verifier 호출기록으로 증명).
- **게이트 선행성**: 다결함 행렬로 G1<G2<G3<G4<G5<G6<G7<G8 첫-실패 승리 고정. raw/PII가 shape 확장보다 선행.
- **15 stateless 코드 + 타입 엄격성**: 각 코드 positive trigger + 인접 negative. ★타입 규율(최종): 수치/기타 **비계약 leaf 타입(int/float 등, `0`/`1` 포함)은 Gate 1 base-scalar sweep에서 `invalid_normalization`**(Gate 2 이전·verifier 미호출·field-specific 코드로 뭉뚱그리지 않음). **리터럴 bool은 Gate 1을 통과해 field-specific 규칙에 도달**(identity_link_allowed=True→identity_link_forbidden·raw_text_stored/contains_pii=True→raw_text_or_pii_present·False→수용). 경계: captured_at==occurred_at 동등 허용 / 90d 경계=만료·1초 전=수용 / opaque product_ref 무정규식 수용.
- **adverse 비대칭·UNCONFIGURED 차단**: skin/other adverse(구조 유효)는 법적 보존정책 UNCONFIGURED **상수**로 전체 envelope 차단(`privacy_scope_exceeded`)·만족 동반이어도 차단(satisfaction이 adverse를 못 낮춤)·usage_safety는 non-adverse 90d로 수용. **기간/관할/역할/예외 발명 0**.
- **무결성≠인증**: 해시 일치해도 기본 verifier면 거부(§4.3).
- **category-only·무echo**: ValidationResultV1 6필드 전부 category/enum. repr에 evidence_id/subject/pir/product/idem/source_hash/트리거(email 등)/opaque context/verifier 예외문 **미포함**(각 assertNotIn으로 증명).
- **순수성**: 입력 불변·결정론(동일입력 2회 동일)·주입 UTC 시계 강제(naive/비UTC→TypeError)·전역 가변상태 0.
- **containment**: verifiers/validator = 전용 테스트만 소비(runtime importer 0) · AST forbidden-node 스캔 NONE · store/api/flag/learning import 0 · endpoint/transport/DB/credential/token 코드 0.

## 8. 무엇을 증명하지 않았는가

- replay/duplicate/lineage/tombstone/candidate/service response/audit/flag(게이트 0·9~11) — **WU3~WU5·미구현**. WU2는 15 stateless 코드만 방출·나머지 3 stateful 코드 미방출.
- 실제 authenticity credential/consent authority 동작 — seam만 존재·기본 UNCONFIGURED. VERIFIED/GRANTED는 **합성 테스트에서만** 주입.
- 실 Cosmile envelope 상호운용·delivery/intake(WU8=금지).
- lineage 필드 **값** 규칙(root/supersedes/retracts 형식·관계) = 게이트 10(WU3). WU2는 lineage에 대해 키 정확성(G2)·normalizer(G1)·source_hash(G4)만.
- 18코드 통합 커버리지 manifest = WU6.

## 9. 남은 risk

- `seal()` test helper는 WU1 hash 함수를 사용해 입력을 producer-일관화한다 — WU1 hash가 pinned producer와 byte-호환임은 WU1에서 증명됨(golden fixture). seal이 잘못되면 게이트 5~8 positive가 위양성 통과할 수 있으므로, 각 게이트에 **인접 negative(수용 경계)** 를 함께 두어 seal 자체를 교차검증(예: retention 90d 경계/1초전).
- adverse 정책은 UNCONFIGURED **상수**(설정 입력 자체 부재) — 미래 설정 경로는 별도 Founder/Legal 결정. 현재 코드에 도달 불가한 `cannot_determine` 분기(설정 시 자리표시)는 죽은 분기가 아니라 "설정 경로 없음"의 구조적 표식.
- provenance verifier가 `VERIFIED`+바인딩 true를 반환하는 순간(합성만) consent가 호출된다 — 실 adapter 배선은 WU5+·별도 승인.

## 10. 다음 검수 질문 (Reviewer 공격 지점 ≥3)

1. 게이트 순서가 §5.1과 자구 일치하는가? 특히 **raw/PII(G2)가 exact-key(G2 후반)·identity(G3)보다, 그리고 provenance(G4)가 consent(G5)보다** 앞서는가? 다결함 입력으로 순서 위반을 만들 수 있는가?
2. `seal()`이 게이트 5~8 결함을 **가리지** 않는가? (재봉인이 hash만 맞추고 실제 결함 필드는 그대로여야 함 — 각 positive가 진짜 그 게이트에서 실패하는지, 인접 negative가 진짜 수용되는지 대조.)
3. category-only 계약이 어디선가 새는가? verifier 예외문("secret-diagnostic-token"), opaque context sentinel, PII 트리거("a@b.test")가 ValidationResultV1/reason_codes/provenance_status 어디에도 안 나타나는가? (repr 전수 검사 외 누락 경로?)
4. bool≠int가 전 게이트에서 일관되는가? `identity_link_allowed`·`raw_text_stored`·`contains_pii`에 **`0`/`1`(int) 주입 시 Gate 1 base-scalar sweep에서 `invalid_normalization`**(Gate 2·verifier 이전·provenance_status=not_evaluated)이 나오고, **리터럴 bool `True`는 field-specific 코드**(identity_link_forbidden·raw_text_or_pii_present)에 도달하는가?
5. `_has_raw_or_pii`가 공유 `gate` 상수를 재사용하면서 C 확장 키(order_item_id 등)를 **누락 없이** 병합했는가? 중첩 깊이·리스트 원소의 PII도 잡는가?
6. 해석 노트 1~4가 설계 자구를 정말 따르는가, 아니면 편의적 선택인가? (source/lineage 그룹 결측의 코드 귀속이 §5.2 트리거 문자열과 대조되는가.)

## 11. rollback

검토된 forward change로 `verifiers.py`/`validator.py`/테스트 2파일 제거 + 설계서 §9·헤더·README 인덱스 되돌림 (history rewrite 없음). 전부 additive·runtime importer 0 → 제거 시 기존 동작 무영향. flag 개념 아직 없음(WU5).

## 12. Git 증거

**Preflight:** branch `shadow/foundation-shared-memory-v0` · HEAD `c7653b7`==BASELINE==upstream · origin `git@github.com:leohan816/foundation.git` · porcelain(sha256) `4b1f8fb5…f0f2` = 선언 baseline · untracked 2(intake).
**Staging:** staged 정확히 6 allowlist(A×4+M×2) · cached +1240/-4 · 잔여 = intake untracked 2뿐.
**Commit/Push:** commit `a57344680650d5fb22452b94bf92ba4f4a5caa0e` · non-force `c7653b7..a573446` → `origin/shadow/foundation-shared-memory-v0` · HEAD==@{u}(ancestor TRUE·0/0) · post porcelain = intake 2뿐.
**foundation-docs worktree:** result/pointer/mirror 3파일만 신규 untracked — **commit/push 0**(금지·Advisor 발행).
**Mirror byte-equality:** canonical==mirror sha256 `25173ecd46303521039276b774cd2d7be7b6790472d8d67d096fc71171b4b2b1` (양측 동일·`cmp` PASS).

## 13. 읽은 앵커/파일 (직접 read · 세션 기억 실행 0)

WU2 handoff `65_` · WU1 Advisor gate `64_`(GATE_RESULT PASS·WU2 dispatch YES) · WU1 evidence commit `f5c66a8`(ancestor) · Founder `58_`(c96caef)·allowlist `59_`(36690ec) · reviewed design 전문 @ 7cbcb8d9(§4/§5.1/§5.2/§6/§8) · review PASS 전문 @ 920359e · pinned Cosmile `ids.ts`/`commerceEvidenceService.ts`(:99-145)/`types/commerceEvidence.ts`/normalizer @ f26fa5c(`git show` read-only·fetch 0·수정 0) · agent-office 운영모델/worker/RUN/RESULT · FOUNDATION AGENTS/CLAUDE/HANDOFF/TODO/설계문서 README/docs sync policy · 공유 `subject_identity.py`/`gate.py`/`reason_codes.py`(primitive 재사용 전 read-only) · fable-builder SKILL+4 references.

## 14. Boundary block (handoff §11 자구)

```text
PRODUCT_REPO_WRITE_STATUS: WU2_ALLOWLIST_ONLY
REAL_DB_NETWORK_PROVIDER_ACCESS: ZERO
SECRET_ENV_PII_ACCESS: ZERO
PRODUCTION_LIVE_ACCESS: ZERO
FEATURE_FLAG_OR_GATE0: ZERO
LEDGER_LINEAGE_STATE_CANDIDATE_SERVICE: ZERO
DELIVERY_OR_FOUNDATION_INTAKE: ZERO
CURRENT_MEMORY_OR_STORE_CONNECTION: ZERO
ADVERSE_POLICY_CONFIGURED_OR_INFERRED: ZERO
WORK_UNIT_3_TO_8_STARTED: NO
SELF_REVIEW: NO
RETURN_TO: foundation-advisor
PROPOSED_NEXT_ACTOR: foundation-advisor
STOP_AFTER_RETURN: true
```

(부가: 신규 agent/sub-agent 0 · Reviewer dispatch 0 · foundation-docs commit/push 0 · branch 생성/전환 0 · git fetch 0 · safeguard model switch Fable5→Opus4.8 §헤더에 공개.)

---

## 15. Advisor-found correction (WU M2-C-WU2-VERIFIER-VALIDATOR-CORRECTION-001 · follow-up · 원본 은폐 없음)

Advisor 독립 검수(67_ handoff)가 발견한 2건을 같은 Worker가 정정. 원 WU2 사실(§1~§14)은 그대로 보존(amend 없음·follow-up commit). 정정 시 live 모델 = **Opus 4.8**(safeguard switch 지속·§헤더 참조), effort = max(live).

**Finding A — Gate 1 base-scalar 강제 누락:** 정본 설계서 §9.2 Gate 1 표·§9.3 노트 4가 **base-scalar sweep**(전 leaf=str|bool|None·수치/기타→invalid_normalization, Gate 2 이전)을 이미 명시하나, 커밋된 code(a573446)가 그 sweep을 **누락**하고 수치 leaf를 후속 게이트/G4 해시로 흘려보냈다(=설계↔코드 drift). 정정: `validator.py`에 순수 재귀 `_scalar_type_sweep` 재도입(전역 가변상태 0)해 Gate 1 마지막·Gate 2(raw/PII) 이전에 실행. **설계 문서는 이미 정확하므로 변경하지 않음**(allowlist에서도 제외). code docstring §9.3 노트 4의 "G4" 표기를 설계와 일치하도록 "Gate 1"로 정정(구 G4 float try/except 제거 — sweep이 float를 Gate 1에서 선점).

**Finding B — 미신뢰 consent status 유출:** `_consent_category`가 `ConsentVerdict.status`의 임의 문자열을 그대로 반환 → 미지 값이 `ValidationResultV1.consent_status`로 새어 category-only 경계 위반. 정정: `CONSENT_VERDICT_STATUSES` enum 멤버십 검증 추가 → 미지 값/비정상 반환 = 리터럴 `ERROR`로 붕괴(primary_reason_code는 `consent_missing` 유지). (provenance 측은 이미 enum 검증 존재 — 대칭적으로 `PROVENANCE_VERDICT_STATUSES` 상수 참조로 명시화.)

**정정 커밋:** WU2 구현 head `a573446` → 정정 head `c42c69b42fed3428f3d15b834b193bb8c79c7ef5` (follow-up·amend 아님) · non-force push `a573446..c42c69b` → 정확 upstream · 원격 포함 확인(ancestor TRUE·HEAD==@{u}·0/0).

**Delta 검증 (전건 PASS · live max · handoff §"Delta verification"):**
1. `git diff a573446..c42c69b` = 정확히 2 allowlist 경로(`validator.py` +34/−13 · `test_commerce_evidence_validator.py` +67/−11). 설계서/README/verifiers/WU1 code·test·fixture·package init = **0 변경**.
2. WU2 validator suite(변경 대상): **57/57 OK**(rc 0) — 신규 `TestGate1BaseScalar`(수치 leaf→Gate 1·Gate 1 wins over raw/PII·extra-key·verifier 미호출·리터럴 bool 수용) + `TestConsentUnknownStatusCollapses`(미지 status→consent_status ERROR·primary consent_missing·repr 미유출) 포함.
3. WU2 verifier suite(seam 통합 좁은 확인): **9/9 OK**(rc 0).
4. WU1 suite = **미재실행**(의존성 무변경 — WU1 modules/fixture 0 변경·handoff §3 자구).
5. oracle 정정(Finding A 자구·§9.2 계약 정합·oracle 약화 아님): 수치 wrong-type을 field-specific 코드로 오모델했던 케이스(int product_ref/purchase_item_ref·int link·int privacy bool)를 **Gate 1 invalid_normalization**으로 이동. 리터럴 bool True(raw_text_stored/contains_pii/identity_link_allowed) 케이스는 그대로 field-specific(raw_text_or_pii_present·identity_link_forbidden) 유지.
6. 정본 설계서 ↔ mirror byte-identical **불변**(재복사 안 함·sha256 `25173ecd46303521039276b774cd2d7be7b6790472d8d67d096fc71171b4b2b1` 양측 동일).
7. 선재 untracked 2파일 byte-untouched/unstaged 유지. AST forbidden-node 스캔 NONE.

```text
CORRECTION_TYPE: BOUNDED_TWO_FINDING_WU2_CORRECTION (behavior 정정 포함 — Gate 1 강제 추가·consent enum guard)
PRODUCT_PATHS_CHANGED: EXACTLY_2 (validator.py + test_commerce_evidence_validator.py)
DESIGN_DOC_OR_README_OR_VERIFIER_CHANGED: NO
WU1_CHANGED: NO
FOUNDATION_DOCS_PATHS_CHANGED: EXACTLY_2 (result + pointer; mirror 불변)
WU2_VALIDATOR_TESTS: 57/57 · WU2_VERIFIER_TESTS: 9/9 · WU1_RERUN: NO_DEP_UNCHANGED
WORK_UNIT_3_TO_8_STARTED: NO
SELF_REVIEW: NO
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
```
