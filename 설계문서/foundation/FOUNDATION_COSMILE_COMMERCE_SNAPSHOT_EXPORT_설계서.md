# FOUNDATION_COSMILE_COMMERCE_SNAPSHOT_EXPORT 설계서

> **버전 v0.2 · 2026-07-17** · 변경이력: v0.2 = correction cycle 1 — 리뷰 20_(PASS_WITH_CORRECTIONS·리뷰 pin `dcaad81`) SNAP-R1(publish 배치 내 identity/제품 불변식)·SNAP-R2(snapshots/ 하위 디렉토리·symlink 봉쇄)·SNAP-R3(manifest entry↔스냅샷 문서 approval 대조) 반영, 테스트 53→68 · v0.1 = FOUNDATION-O1-SNAPSHOT-EXPORT-1 최초 구현 성문화.
> 모듈: `foundation/cosmile/commerce_snapshot/` (`contract.py`·`exporter.py`·`file_bundle.py`) + `foundation/tests/test_cosmile_commerce_snapshot.py`.
> **정체:** Foundation→Cosmile 제품 스냅샷의 결정론적 계약 + **버전드 non-production 로컬 파일 번들** export. 리뷰 통과 설계의 코드 착지이며, 전송/서비스/운영 활성은 이 모듈 밖(미승인).

---

## 0. 정본 anchor (구현이 따른 계약 원천)

| Anchor | 값 |
|---|---|
| Mission | `COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1` / WU `FOUNDATION-O1-SNAPSHOT-EXPORT-1` |
| Handoff (JOB_COMMIT) | foundation-docs `1a28283254aa901c3b7eafa0772bb4d99ada0ea1` · `advisor/jobs/.../handoffs/10_FOUNDATION_SNAPSHOT_EXPORT_IMPLEMENTATION_HANDOFF.md` |
| Reviewed design | `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1/50_FOUNDATION_BOUNDED_SNAPSHOT_DELIVERY_DESIGN.md` (이하 "50_") |
| Delta | 동 경로 `71_CONTROL_FOUNDATION_DELIVERY_DELTA_COMPLETION.md` (A-2 7-field pin superset·D-2 ack=optional) |
| Independent review | `90_INDEPENDENT_DESIGN_REVIEW.md` VERDICT **PASS** (blocking 0) |
| Admission | `advisor/jobs/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/00_ADMISSION_AND_AUTHORITY_RECORD.md` — "Foundation delivery is a versioned non-production local file bundle" · default-deny · vault read-only · synthetic fixture only |
| 구현 base | FOUNDATION branch `implementation/cosmile-o1-foundation-snapshot-v1-20260717` · base HEAD `33570b9d7db79c991bb216b6a2dc80880ba1f2d6` |

## 1. 경계 (동결 — 이 모듈이 절대 하지 않는 것)

- **canonical vault 접근 0.** 모듈에 vault 경로 지식 자체가 없다(정적 테스트로 봉쇄). `approval.yaml`·`_rights.yaml`·`coverage.yaml`·source checksum·제품 레코드·canonical gate 사실을 생성/수정하지 않는다 — approval/gate는 **입력**으로만 받고 기본 거부한다.
- **endpoint/network/sender/broker/service/DB/전송 0.** 유일한 착지 = 호출자 지정 로컬 디렉토리의 파일 번들(비동기 pull 전제). 전송 채널은 WU-F3b `PATH_STATUS: UNRESOLVED` — 여기서 선택하지 않는다.
- **production 0.** 모든 산출물(스냅샷·manifest·번들 meta·ack)에 `non_production: true` + `evidence_class: NOT_LIVE_SALE_EVIDENCE` **상수 각인** — 입력 파라미터로 변경 불가. 합성 fixture는 메커니즘 증명일 뿐 실 ELT 판매가능성을 성립시키지 않는다.
- **커머스 권한 이동 0.** price/stock/sales_status/shipping/promotion/`assessment`/`usable_for_judge`는 어떤 깊이에서도 스냅샷 반입 불가(50_ §3 제외 — Cosmile 소유 값의 구조적 차단). 콘텐츠 그룹은 F1–F10 닫힌 allow-list.
- **runtime import 0.** 테스트 외 어떤 Foundation 코드도 이 패키지를 import하지 않는다(정적 테스트로 봉쇄). 자가 개시 0 — 철회/정정은 approval-owner 입력 필수.

## 2. 파일 구조

| 파일 | 역할 | 파일시스템 |
|---|---|---|
| `contract.py` | fsnap-1.0 계약 동결: 상수/enum·canonical 직렬화·`snapshot_content_sha256`·`build_snapshot`/`build_pin`/`build_ack`/검증기 | 없음(순수) |
| `exporter.py` | `SnapshotExporter` — 1-프로세스 in-memory append-only delivery 스트림(발행/정정/철회/gate-change/재전달/해석/ack 기록) | 없음(순수) |
| `file_bundle.py` | 번들 착지/검증: `write_bundle`(write-once)·`verify_bundle`·`simulate_import`(gap guard) | **유일한** 파일 I/O 층 |
| `__init__.py` | 경계 선언 + 서브모듈 re-export | 없음 |

## 3. 계약→코드 매핑 표 (fable-builder 필수 산출물)

| 계약 필드/규칙 (문서:절) | 코드 착지 | test assertion (test_cosmile_commerce_snapshot) | 비고 |
|---|---|---|---|
| `snapshot_schema_version` `fsnap-1.0` (50_ §4.2/§4.4) | `contract.SNAPSHOT_SCHEMA_VERSION` | `test_pin_is_exactly_seven_fields` | 동결 상수 |
| 7-field pin superset (50_ §4.2 + 71_ A-2) | `contract.PIN_FIELDS`·`build_pin`·`validate_pin` | `test_pin_is_exactly_seven_fields` | INV-3 스냅샷측 |
| `foundation_product_id`/variant 형식 (50_ §4.1) | `validate_product_id`·`validate_variant_id` | `test_product_id_three_way`·`test_variant_id_must_extend_product_id` | PRISM 4+세그먼트·마지막=숫자 |
| canonical 직렬화 + sha256 (50_ §4.3 L2) | `canonical_bytes`·`content_sha256` | `TestExportDeterminism`(4)·`test_embedded_hash_recomputable`·`test_serializer_fail_closed_types` | §4 참조 |
| snapshot 불변성/identity 6-tuple (50_ §4.2/§9.3) | `identity_key`; exporter `_identity_to_sha` 대조 | `test_same_identity_different_payload_refused` | 동일 identity 상이 payload = 거절 |
| approval enum + fail-closed (50_ §4.6) | `APPROVAL_STATUSES`·`DELIVERABLE_APPROVAL_STATUS`; `publish*` default-deny | `TestUnapprovedZero`(6) | 비승인 delivery 0 |
| gate 카테고리 6종 (50_ §7) | `GATE_CATEGORIES`·`_validate_gates`(정확 6키 필수) | `test_missing_gate_category_refused`·`test_unknown_gate_category_refused` | 상태 값셋=개방 토큰(§8-4) |
| manifest 형태·seq 단조·무결번 (50_ §5) | `exporter._next_manifest`; `file_bundle._verify_manifests` 연속성 | `TestGapBlocking`(3) | seq는 1..N 내부 발번 |
| notice 4종 (50_ §5) | `NOTICE_TYPES`·`exporter._notice`(고정 7키) | `test_notice_type_enum_frozen`·`TestGateChangeNotice`(2) | supersedes는 CORRECTION/SUPERSESSION만 |
| correction 카테고리 5종 (50_ §9.4) | `CORRECTION_CATEGORIES`·`publish_correction` | `TestSupersessionResolvability`(3) | forward-only·현행 head만 supersede |
| withdrawal 카테고리 5종·카테고리만 (50_ §9.5) | `WITHDRAWAL_CATEGORIES`·`withdraw` | `TestWithdrawalContainment`(4) | note/Legal 텍스트 필드 구조적 부재 |
| replay/idempotency 키 (50_ §9.3) | `publish` 중복 분기 `DUPLICATE_IGNORED`·`redeliver` byte-identical | `TestDuplicateNoOpAndImmutability`(3) | ledger append-only |
| **배치 내 불변식** (50_ §4.2/§9.3/§8.3-3 · 리뷰 SNAP-R1) | `publish` 배치-로컬 identity/제품 추적(호출 간과 동일 규칙·all-or-nothing 유지) | `TestIntraBatchGuards`(5) | byte-identical=최대 1 delivery·동일 identity 상이 payload=`immutability_violation`·같은 제품 2번째=`supersession_required` |
| gap guard (50_ §9.6) | `file_bundle.simulate_import`·`verify_bundle` 연속성 | `TestGapBlocking`(3) | 결번=이후 차단·재전달 후 해소 |
| ack = optional·category-only (50_ §9.2·71_ D-2·00_) | `build_ack`/`validate_ack`·`exporter.record_ack`(ledger append만) | `TestAckOptionalCategoryOnly`(4) | auto-retract 경로 부재가 계약 |
| INV-1 비재작성·INV-2 resolvability (50_ §11) | append-only manifests/ledger·`resolve`·번들 write-once | `TestHistoricalPinResolvability`(3)·`test_redelivery_byte_identical_append_only` | 이력 bytes 불변 |
| lifecycle 사영 (50_ §4.6/§10·Designer §12) | `status_of`(CURRENT_APPROVED/SUPERSEDED/WITHDRAWN)·`deliverable_for_display` | `test_chain_length_two_…`·`test_withdraw_one_contains_to_one` | 문서 변형 없는 exporter-측 marker |
| §3 제외(커머스 값/assessment) | `EXCLUDED_CONTENT_KEYS` 심층 거부 + `CONTENT_GROUPS` allow-list | `test_excluded_commerce_keys_refused_at_any_depth`·`test_assessment_and_unknown_group_refused` | 임의 깊이 정확-키 대조(휴리스틱 아님) |
| NOT_LIVE_SALE_EVIDENCE (00_·Designer §16.1) | `EVIDENCE_CLASS` 상수 각인(전 산출물) | `TestNonProductionMarking`(3) | 입력 override 불가(파라미터 부재) |
| tamper fail-closed (50_ §14.1-2) | `validate_snapshot` 해시 재계산·`verify_bundle` byte/해시 대조 | `TestTamperFailsClosed`(4) | 1-byte 변조 = 검증 실패 |
| **snapshots/ 디렉토리 봉쇄** (리뷰 SNAP-R2) | `_verify_snapshot_files` 명시 listing(symlink 비추종): 미지 제품 dir·중첩 dir·symlink(dir·파일) = `unexpected_file` | `TestSnapshotDirectoryContainment`(7) | 정당한 다제품 번들은 계속 통과 |
| **entry↔문서 approval 대조** (리뷰 SNAP-R3) | `_verify_snapshot_files`: entry `approval_status`/`approval_scope` ≡ 해시 앵커된 문서 approval | `TestManifestEntryApprovalConsistency`(3) | 재canonical화 위조 entry = `manifest_entry_invalid` |
| 봉쇄(network/DB/env/vault/runtime-import 0) | 구조(§1) | `TestStaticContainment`(5, AST/소스 스캔) | — |

공백 행 없음. enum 값은 이 표에 복사하지 않고 `contract.py` 단일 정본에서만 선언·전 소비처가 import.

## 4. canonical 직렬화 (fsnap-1.0)

- **규칙:** 키=유니코드 코드포인트 정렬 · UTF-8 · 최소 구분자(`,`/`:`) · 비ASCII literal(`ensure_ascii=False`) · 허용 타입 `dict[str]`/`list`/`str`/`int`/`bool`/`None` **만**. float·bytes·비-str 키·그 외 타입 = **fail-closed**(사전 트리 검증 — `json.dumps`의 silent 키 강제변환/float 수용 차단).
- `snapshot_content_sha256` = 문서에서 **자기 필드 제외** 후 canonical bytes의 SHA-256. 파일 bytes = 문서 전체의 canonical bytes(공백/재배열 변조도 byte 대조로 검출).
- **`shared_memory/commerce_evidence/hash_v1.py` 비재사용 사유:** 해당 모듈은 cevi v1 envelope 전용 **pinned-JS(JSON.stringify) byte 재현**으로, 자체 docstring이 범용 canonicalizer 사용을 금지한다(UTF-16 키 정렬·`undefined` 토큰 등 JS 특이 의미 포함). fsnap-1.0은 신규 envelope이므로 깨끗한 규칙으로 새로 동결 — 같은 산출물을 만드는 정본 코드가 아니어서 재발명 금지 규칙에 저촉되지 않음.

## 5. exporter 의미론 요약

- **default-deny:** `publish`/`publish_correction`은 `APPROVED_FOR_COMMERCE_DISPLAY` + 완전한 gate 블록 + 계약 검증 통과에만 delivery. 철회된 제품 재발행 거절(fail-closed). 이미 배달된 제품의 새 내용은 `publish_correction` 경유 필수(`supersession_required` — silent edit 금지, 50_ §8.3-3).
- **원자성:** 전량 검증 후에만 상태 변경. 거절은 `ExportRefused(reason=카테고리 토큰)` + ledger `REFUSED` 기록(값/원문 미포함).
- **중복/불변성:** 동일 identity+동일 sha = `DUPLICATE_IGNORED` no-op · 동일 identity+상이 sha = `immutability_violation`. **한 publish 배치 내부에도 동일 규칙 적용**(배치-로컬 추적 — byte-identical 반복=최대 1 delivery+중복 기록·같은 제품의 상이 스냅샷 2개=`supersession_required` 거절; SNAP-R1). `redeliver(seq)` = byte-identical 반환 + ledger append만.
- **정정/철회:** 정정=새 스냅샷+`CORRECTION|SUPERSESSION` notice(supersedes pin 체인·현행 head만 supersede 가능 — fork 방지). 철회=`WITHDRAWAL` notice(카테고리만)·해당 제품만 신규 display 차단·이력 `resolve` 유지·타 제품 무영향. `publish_gate_change`=GATE_CHANGE notice.
- **ack:** `record_ack` = ledger append 유일 효과. 부재 시 어떤 동작도 없음(auto-retract API 자체가 부재). activation status 값셋은 Cosmile-lane 소유 — 토큰 형식만 강제.
- **ledger:** append-only·카테고리/카운트/해시만(PII/원문/secret 구조적 배제).

## 6. file bundle 레이아웃/검증

```
<root>/bundle_meta.json                       {layout=fsnap-bundle-1.0, schema, evidence_class, non_production, created_at}
<root>/manifests/manifest_%08d.json           manifest_seq 1..N (무결번)
<root>/snapshots/<product_id>/<sha256>.json   content-addressed 스냅샷 문서
```

- `write_bundle`: **write-once** — 기존 파일은 byte-일치 필수(불일치=`tamper_detected`). 재호출=무변화(멱등). 결정론: 같은 exporter 상태+같은 `created_at` ⇒ byte-identical 번들.
- `verify_bundle`: meta 상수/변조 → manifest 이름·seq·스키마·byte·연속성(gap) → entry pin/notice 유효성(supersedes 해석 가능성 포함) → 스냅샷 파일 존재·임베드 해시 재계산·byte 대조 → **entry `approval_status`/`approval_scope` ≡ 해시 앵커된 문서 approval(SNAP-R3 — 재canonical화 위조 fail-closed)** → 예상 밖 파일 **및 디렉토리** 0: snapshots/ 하위는 명시 listing으로 미지 제품 dir·중첩 dir·모든 symlink(디렉토리·파일)를 `unexpected_file`로 거절하고 symlink를 따라가지 않는다(SNAP-R2). 반환=boolean/count/status 토큰만.
- `simulate_import(root, already_applied)`: 엄격 seq 순서 — 이미 적용 seq 재등장=duplicates(no-op)·결번=`gap_detected`로 이후 전부 차단·재전달(파일 복원) 후 해소. 50_ §9.6의 import-측 참조 구현(시뮬레이션)이며 Cosmile importer 자체는 Cosmile lane 소유.

## 7. 테스트 (실행: `python3 -B -m unittest foundation.tests.test_cosmile_commerce_snapshot`)

- **68/68 PASS — 전부 pure**(1-프로세스·합성 fixture·로컬 tempdir I/O only). DB-touch 0·network 0·env 0·infra-gate 0. handoff 요구 8 oracle: ①결정론 ②변조 fail-closed ③미승인 0 ④duplicate no-op ⑤supersession resolvability ⑥withdrawal containment ⑦gap 차단 ⑧historical-pin resolvability + 계약 3쌍 oracle·non-production 각인·ack 무영향·정적 봉쇄(AST) + correction cycle 1: 배치 내 불변식(`TestIntraBatchGuards` 5)·디렉토리/symlink 봉쇄(`TestSnapshotDirectoryContainment` 7)·entry↔문서 approval 대조(`TestManifestEntryApprovalConsistency` 3) — 신규 15개는 수정 전 코드에서 9 FAIL로 결함 재현 후 GREEN(테스트-선행).
- 회귀(구현·정정 시점 각 재실행): repo 스모크 4종 36 PASS/0 FAIL · `foundation.shared_memory.tests` commerce_evidence 308 OK · script-style 2종 exit 0.

## 8. 구현하지 않은 것 (★미승인/TBD — 이 설계서가 권한을 만들지 않음)

1. **전송/ack 채널 바인딩(WU-F3b)** — `PATH_STATUS: UNRESOLVED`·Leo 결정. 이 모듈은 로컬 파일 번들까지만.
2. **vault 읽기 통합(50_ WU-F3a의 read-layer 연결)** — 이번 WU는 계약+번들만. 스냅샷 입력은 호출자 제공(합성 fixture). 실 vault 레코드 → 스냅샷 변환기는 별도 승인 필요.
3. **`approval.yaml`/`_rights.yaml` 기록(WU-F1)·source checksum 백필(WU-F2)** — canonical gate 사실 생성 금지(admission). approval/gate는 입력 전용.
4. **stale threshold(GATE_STALE 값)·reviewer 프로세스·locale 승인 범위** — Leo 미결(50_ §14.5). gate 상태 값셋은 개방 토큰으로만 운반.
5. **ack `local_activation_status` 값셋** — Cosmile-lane 소유(토큰 형식만 강제).
6. **실 ELT 레코드 delivery** — 미해결 게이트 하의 실 레코드는 비전달(non-deliverable) 그대로. 합성 fixture는 sellability를 성립시키지 않는다.
7. **manifest 자기-해시** — 설계는 스냅샷 해시를 manifest에 기록(50_ §4.3 L2)까지만 정의. manifest 파일 자체 앵커는 canonical byte 대조 + (운영상) 추적 파일/git 층 소관으로 남김.

## 9. 불변식 (구현이 집행)

1. delivery는 승인 스냅샷만(비승인 count 0 — default-deny).
2. 배달된 스냅샷 bytes는 영구 불변·pin 해석 가능(INV-1/INV-2; 정정=forward-only supersession·철회=카테고리 notice).
3. manifest_seq 1..N 단조·무결번 — 결번은 import를 차단하고 재전달로만 해소.
4. 중복 재전달 = 효과 0(`DUPLICATE_IGNORED`)·재전달 = byte-identical.
5. 철회는 해당 제품만·이력 유지·자가 개시 불가(approval-owner 입력 필수).
6. ack는 증거일 뿐 — 부재가 어떤 상태 변화도 유발하지 않는다.
7. 전 산출물 non-production·NOT_LIVE_SALE_EVIDENCE 각인 — 입력으로 해제 불가.
8. 커머스 값/assessment/vault 경로/network/DB/env = 구조적 0.
