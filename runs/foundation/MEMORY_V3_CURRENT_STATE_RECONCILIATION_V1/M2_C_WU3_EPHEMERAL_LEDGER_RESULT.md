# M2 C — WU3 C-EPHEMERAL-LEDGER Worker Result (Foundation)

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-C-WU3-EPHEMERAL-LEDGER-001
ACTOR: foundation Worker (same Foundation implementation actor)
PROJECT: FOUNDATION
REPOSITORY: /home/leo/Project/FOUNDATION
BRANCH: shadow/foundation-shared-memory-v0
STARTING_BASE: c42c69b42fed3428f3d15b834b193bb8c79c7ef5 (== handoff BASELINE_COMMIT, verified == upstream)
RESULTING_HEAD: de63c8fedaa27e470e44359cad1c2940bdc0a866
SESSION: foundation / window @3 / pane %3 (tmux live-verified)
ACTUAL_MODEL: Opus 4.8 (1M context) — safeguard runtime switch (Fable 5 unavailable) still in effect; same session/actor/conversation (Worker is a role, not a model brand). Recorded exactly as live runtime reported.
EFFORT: implementation = ultracode; final concurrency/rollback/privacy/diff audit = max (live /effort switch recorded before final checks)
REQUIRED_SKILL: /fable-builder (loaded; contract-to-code-mapping · test-design-before-code · implementation-execution · report-template read directly)
DATE: 2026-07-16
RETURN_TO: foundation-advisor
```

## 1. 구현 범위 (reviewed design §17 WU3 `C-EPHEMERAL-LEDGER`만)

- §9.1 순수 lineage 규칙 → `lineage.py` (root/correction/retraction·identity 불변·sku null↔non-null 금지·tombstone 우선)
- §5.1 게이트 9~11 + §7 replay/idempotency/collision/concurrency/§7.4 races → `ledger.py` (인스턴스-scoped `threading.RLock` 1개·copy-on-write atomic commit·commit_guard seam)
- WU3 전용 합성 테스트 2파일 (lineage 26 + ledger 45)
- 정본 설계서 §10(v0.3) + byte-identical mirror + README 인덱스

**이행하지 않은 절(의도·미승인·별도 handoff):** 게이트 0(feature flag)·candidate DTO(§10 mapping·`candidates.py`)·service 응답(§11·`service.py`)·audit/metrics(`audit.py`)·endpoint/transport/DB/durable storage/runtime importer. **1-프로세스 ephemeral 전용 — restart/multi-process/file/durable 주장 0.**

## 2. 수정 파일 (6 · commit de63c8f · +1318/-3)

| 파일 | 종류 | diff |
|---|---|---|
| foundation/shared_memory/commerce_evidence/lineage.py | 신규 | +113 (순수 규칙·LineageEvidence/Snapshot/Plan NamedTuple·전역상태 0) |
| foundation/shared_memory/commerce_evidence/ledger.py | 신규 | +292 (EphemeralLedger·RLock·COW·게이트 9~11·fingerprint·category-only result) |
| foundation/shared_memory/tests/test_commerce_evidence_lineage.py | 신규 | +213 (26 tests) |
| foundation/shared_memory/tests/test_commerce_evidence_ledger.py | 신규 | +641 (45 tests) |
| 설계문서/FOUNDATION_COMMERCE_EVIDENCE_SHADOW_설계서.md | 갱신 | +58/-2 (§10 WU3 매핑·헤더 v0.3) |
| 설계문서/README.md | 갱신 | +1/-1 (인덱스 v0.3) |

## 3. 수정하지 않은 파일 (diff scope 선언 대비 일치)

★정정: 전체 base→head diff(`git diff --stat c42c69b HEAD`)는 **0이 아니라 WU3 allowlist 6경로(+1318/-3)** 이다(§2). 아래 "0 변경"은 그 6경로를 **제외한** WU1/WU2/공유 파일에 대한 **경로-지정 diff**(`git diff --stat c42c69b HEAD -- <각 파일>`)가 비어 있다는 뜻이다.

WU1/WU2 4모듈(contract/reason_codes/hash_v1/verifiers/validator)·fixture·테스트 5파일·package `__init__.py` · 공유 `gate.py`/`subject_identity.py`/`reason_codes.py`/`api.py`/`store.py` · `feature_flags.py` · 의존성/manifest/lockfile/schema/migration/config — **경로-지정 diff 전부 0 변경**. 선재 untracked 2파일(`docs/FOUNDATION_DOCS_SYNC_POLICY.md`·`설계문서/FOUNDATION_SERVICE_SEMANTIC_ADAPTER_ARCHITECTURE_20260630.html`) byte-untouched·unstaged.
`ledger.py`는 `lineage`(패키지 내)·`reason_codes`(전용 guard)만 import — 기존 store/api/flag/verifier import 0(§4.1: WU2 verifier 재호출·게이트 1~8 재실행 0).

## 4. 계약 매핑

완전 매핑 표 = 정본 설계서 §10.6 (`설계문서/FOUNDATION_COMMERCE_EVIDENCE_SHADOW_설계서.md` @ de63c8f·mirror sha256 `74ae11c14cc54222d72b91982ed51b8a6a85c840ce4ad4ae372cb37dd23e9394`) — 공백 셀 0.

## 5. 계약 이탈(deviation)

**없음.** Advisor delta finding 4건을 WU3 allowlist 내에서 해소(§7.1 아래).

## 6. 테스트 결과 (전부 pure · 재현 명령 포함)

**구현 전(정직한 실패 — 모듈 부재):**
```text
python3 -m unittest foundation.shared_memory.tests.test_commerce_evidence_lineage  → rc=1 (ImportError)
python3 -m unittest foundation.shared_memory.tests.test_commerce_evidence_ledger   → rc=1 (ImportError)
```

**구현 후 — 최종 max effort(unmasked rc):**
```text
test_commerce_evidence_lineage    → rc=0 · 26/26 OK
test_commerce_evidence_ledger     → rc=0 · 45/45 OK (ResourceWarning=error 하에서도 통과)
test_commerce_evidence_validator  → rc=0 · 57/57 OK   (WU2 dependency delta — no drift)
test_commerce_evidence_verifiers  → rc=0 ·  9/9 OK   (WU2 dependency delta — no drift)
```
- pure: **137/137** (파일/DB/network/env/provider/secret/store 무접촉 — AST forbidden-node 스캔 NONE으로 사전 증명). db-touch/safety-invariant 층: 해당 없음.
- **race 안정성**: ledger suite(§7.4 race는 각 40회 반복 스케줄) 3연속 실행 rc 0/0/0 — 비결정성 없음.
- WU1 suite = **미재실행**(WU3가 WU1/WU2 의존성을 변경하지 않음·handoff §9.3; `git diff --stat` 무변경으로 증명).
- 테스트 diff에 기대값 **하향** 변경: 없음.

### 6.1 Advisor delta finding 해소 (A·B·C·D)
- **(A) exact_replay = 현재 유효 eligibility**: `_Record`의 receipt-time 저장값이 아니라 **현재 lineage category**를 반환하도록 수정(§5.1·§7.2). root/correction가 이후 retraction으로 revoke되면 그 replay도 `revoked`(원 decision_id 유지·신규 effect 0). 신규 테스트 `TestExactReplay.test_replay_of_{root,correction}_after_retraction_returns_current_revoked`.
- **(B) §7.4 전 race 커버(barrier + 반복 결정론 스케줄)**: `TestSection74Races` — mutated same-source collision·correction↔retraction **양 winner 순서**(결정론 sequential 2건 + barrier 불변식 40×)·2 distinct retractions·exact candidate-slot retry·commit_guard OFF race. 기존 `TestConcurrencyRaces`(2 exact copies·2 corrections·150-thread stress) 유지.
- **(C) slot 요청 fail-closed**: 미지 slot category·중복 slot·retraction의 slot 요청은 **silent filter/double-count 금지**로 cannot_determine(state 0). `TestSlotRequestValidation` 5건(created_slots == 실제 예약 수 증명 포함).
- **(D) ResourceWarning 제거**: containment 테스트 파일 open을 `with`로 close. `python3 -W error::ResourceWarning` 하에서 45/45 통과.

### 6.2 test-input 정정 (test-design §5 — 코드 아닌 테스트 수정이 정답)
mutated-same-source collision 테스트의 초기 입력 `b`가 `evidence_id`만 바꾸고 `lineage.root_evidence_id`를 원 id로 남겨 **malformed root**(root≠evidence_id)였다. 판정: **코드가 정확**(malformed root는 root≠evidence_id → lineage_broken이 옳음)하고 **테스트가 well-formed mutated-body collision을 오모델**했다. 정정 = `b`를 같은 식별자·다른 body(satisfaction)로 재구성(root_evidence_id==evidence_id 유지) → 어느 winner 순서든 1 accepted + 1 duplicate_evidence. oracle 약화 아님.

## 7. 무엇을 증명했는가

- **1-프로세스 원자성(COW)**: 각 commit mutation 경계(`COMMIT_BOUNDARIES` 7개)에 주입 실패 → receipt/slot/tombstone/superseded count **전부 불변**(rollback), result cannot_determine. 이전 커밋 상태도 보존(TestRollback 2건).
- **replay/collision**: 100+/150-thread 정확 재시도 → **1 commit·1 slot**·나머지 exact_replay(원 decision_id/lineage_pointer, 0 신규 effect); mutated body/evidence_id/idempotency_key 재사용 → duplicate_evidence(state 0); source_hash 일치만으로 replay/인증 아님(fingerprint = §6 자구).
- **§7.4 races(전 행)**: barrier 반복 스케줄에서 §7.4 불변식이 매 실행 성립(양 winner 순서 결정론 확인 포함).
- **lineage 불변**: root/correction/retraction 규칙·identity(subject/purchase/product/sku) 불변·sku null↔non-null 전이 금지(re-key 금지)·parent 미도착=lineage_broken(buffer 금지)·tombstone/evidence_retracted 우선·no resurrection.
- **commit_guard seam(kill-switch)**: 기본/미설정=block(허용적 기본값 금지)·False/예외/non-bool → cannot_determine·state 0. feature flag import 0(WU5 소관).
- **category-only·무echo**: `LedgerResultV1` 9필드·`snapshot()`은 count/eligibility-category만(식별자-keyed map/payload 미노출). result/snapshot repr에 evidence_id/subject/pir/product/idem/source_hash/source_event/guard 예외문 **미포함**.
- **instance isolation·ephemeral**: 인스턴스별 상태 격리·`clear()` 전소거·재제출 정상 = **durable 아님**.
- **containment**: ledger/lineage = 전용 테스트만 소비(runtime importer 0)·AST forbidden-node NONE·store/api/flag/candidate/service/network/file/DB import 0.

## 8. 무엇을 증명하지 않았는가

- candidate DTO 실체(furef/MemoryCandidate/content/mapping)·approval/reuse/store write — **WU4·미구현**. WU3는 generic slot category(outcome|adverse) **예약**만.
- service 응답(`CommerceEvidenceDecisionV1`)·audit/metrics·feature flag 게이트 0 — WU5·미구현.
- **restart-safe/multi-process/durable** 동작 — 명시적으로 **주장 0**(1-프로세스 RLock 참조 구현). durable backend는 별도 storage 결정+migration 설계 필요(§12.2).
- 실 Cosmile envelope 상호운용·delivery/intake(WU8=금지).

## 9. 남은 risk

- 참조 ledger는 **1-프로세스 RLock 전용**. multi-process/restart durability는 미증명·미주장 — 후속 durable backend가 동등 uniqueness/transaction 의미를 새 설계로 증명해야 함(§12.2).
- commit_guard는 WU5 feature flag의 seam일 뿐 — 실 flag 배선·activation은 WU5+·별도 승인. 기본 block이라 미배선 상태에서 아무것도 커밋 안 함.
- exact_replay의 현재-eligibility 조회는 lineage 존재를 전제(tombstone은 lineage를 지우지 않고 표시만) — lineage가 없으면 저장값 fallback(도달 불가·방어적).

## 10. 다음 검수 질문 (Reviewer 공격 지점 ≥3)

1. COW 원자성이 진짜인가? 최종 8개 rebind 사이에 yield/예외 지점이 없는가? `COMMIT_BOUNDARIES` 각 지점 주입 실패가 정말 전 count를 불변으로 남기는가(부분 커밋 0)?
2. RLock이 submit 전체를 감싸 두 스레드가 결코 critical section을 겹치지 않는가? §7.4 race 불변식이 barrier 반복에서 위반되는 스케줄이 있는가?
3. fingerprint가 §6 자구와 정확히 일치하는가(sort_keys/compact/ascii)? envelope 프로젝션이 exact_validated envelope 전체인가? provenance/consent category만 추가됐는가?
4. exact_replay가 현재 eligibility를 반환하되 원 decision_id/lineage_pointer를 유지하고 신규 effect가 0인가? retraction 후 root/correction replay가 revoked인가?
5. slot fail-closed가 미지 category·중복·retraction 요청을 전부 state 0으로 막는가(silent filter/double-count 0)? created_slots == 실제 slot_count인가?
6. lineage identity 불변이 sku null↔non-null 전이를 정말 막는가(re-key)? malformed root(root≠evidence_id)가 lineage_broken인가?
7. category-only 경계가 어디서도 새지 않는가(result/snapshot/repr에 producer id/hash/guard 예외문 0)?

## 11. rollback

검토된 forward change로 `ledger.py`/`lineage.py`/테스트 2파일 제거 + 설계서 §10·헤더·README 인덱스 되돌림 (history rewrite 없음). 전부 additive·runtime importer 0 → 제거 시 기존 동작 무영향. feature flag 개념 아직 없음(WU5).

## 12. Git 증거

**Preflight:** branch `shadow/foundation-shared-memory-v0` · HEAD `c42c69b`==BASELINE==upstream · origin `git@github.com:leohan816/foundation.git` · porcelain(sha256) `4b1f8fb5…f0f2` = 선언 baseline · untracked 2(intake).
**Staging:** staged 정확히 6 allowlist(A×4+M×2) · cached +1318/-3 · 잔여 = intake untracked 2뿐.
**Commit/Push:** commit `de63c8fedaa27e470e44359cad1c2940bdc0a866` · non-force `c42c69b..de63c8f` → `origin/shadow/foundation-shared-memory-v0` · HEAD==@{u}(ancestor TRUE·0/0) · post porcelain = intake 2뿐.
**foundation-docs worktree:** result/pointer/mirror 3파일만 신규 untracked/modified — **commit/push 0**(금지·Advisor 발행).
**Mirror byte-equality:** canonical==mirror sha256 `74ae11c14cc54222d72b91982ed51b8a6a85c840ce4ad4ae372cb37dd23e9394` (양측 동일·`cmp` PASS).

## 13. 읽은 앵커/파일 (직접 read · 세션 기억 실행 0)

WU3 handoff `72_` · WU2 Advisor gate `71_`(GATE PASS·WU2 evidence `6632261` ancestor) · Founder `58_`(c96caef)·allowlist `59_`(36690ec) · reviewed design 전문 @ 7cbcb8d9(§5.1 gates 9~11·§7.1-7.4·§9.1-9.4·§12.1-12.2 재독) · review PASS @ 920359e(C-R4/C-R7) · agent-office 운영모델/worker/RUN/RESULT · FOUNDATION AGENTS/CLAUDE/HANDOFF/TODO/설계문서 README/docs sync policy · WU1/WU2 코드·테스트(base) · fable-builder SKILL+4 references.

## 14. Boundary block (handoff §10 자구)

```text
PRODUCT_REPO_WRITE_STATUS: WU3_ALLOWLIST_ONLY
ONE_PROCESS_EPHEMERAL_ONLY: TRUE
DURABLE_OR_MULTI_PROCESS_CLAIM: ZERO
REAL_DB_FILE_SQLITE_DOCKER_NETWORK_PROVIDER_SECRET_ENV_ACCESS: ZERO
SHARED_MEMORY_STORE_OR_EXISTING_API_WRITE: ZERO
CANDIDATE_DTO_OR_RUNTIME_CREATED: ZERO
FEATURE_FLAG_GATE0_SERVICE_AUDIT_METRICS: ZERO
DELIVERY_OR_FOUNDATION_INTAKE: ZERO
WORK_UNIT_4_TO_8_STARTED: NO
SELF_REVIEW: NO
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
```

(부가: 신규 agent/sub-agent 0 · Reviewer dispatch 0 · foundation-docs commit/push 0 · branch 생성/전환 0 · git fetch 0 · safeguard model switch Fable5→Opus4.8 §헤더에 공개.)
