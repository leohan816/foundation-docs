# Memory V1 — M6-F FOUNDATION/Schema Design Gate (design-only)

> 작성: foundation-control(Control) · 2026-07-05 · **범위: M6-F execution 전 필요한 FOUNDATION/schema 설계 — 설계 문서 산출까지만.**
> ★**design-only. schema migration · FOUNDATION-side implementation · M6-F execution = 각 별도 Leo 승인 전까지 미진행.** Restricted Actions List = source report 참조.
> 근거: delta re-review(`c36bb75`·APPROVE_WITH_WATCH·W-a~g) · M6-F package §11 + W-e(`cf92aea`) · M2 §3.9/§3.5 · FOUNDATION `subject_identity.py`(resolve_subject 순수함수·subject_ref_from_foundation_user_ref furef 수용)·`_factory.py`.

---

## 1. Fact
- M6-F 상태 = **PATCH_ROUND_2_DONE / DECISION_CONFIRMED / DELTA_REVIEW=APPROVE_WITH_WATCH / W-e CLOSED.** execution gate **닫힘**.
- delta re-review가 execution 전 **별도 gate close 필수**로 지목한 4영역을 본 문서에서 **설계**(구현/마이그레이션 아님): secret_version zero-orphan·identity-touch API·canonical furef derivation·FOUNDATION deferred.
- ★현재 코드 사실(설계 출발점): `resolve_subject`(L67-89)=순수 함수·`subject_ref_from_foundation_user_ref`(L92-95)=**furef 입력으로 subject_ref mint(require_furef_v2=True)**·`_factory.make_candidate`(L30)=**raw local_user_ref 전달**(require_furef_v2 미설정)·L32=local_user_ref echo·M2 계약에 `secret_version` **전무**·SubjectRefMap PK=subject_ref·idx(furef_local_ref).

## 2. Design goals
1. **zero-orphan rotation:** Foundation/service secret rotation 시 memory row orphan 0·rolling(무중단)·rollback 가능.
2. **stateless Foundation mint·no-broker:** Foundation은 subject_ref를 순수 mint·furef↔subject_ref durable 미보존·SubjectRefMap는 service-local.
3. **single canonical furef:** 모든 생산자(candidate·auth·backfill)가 동일 furef → 동일 subject_ref(split-brain 0).
4. **boundary 유지:** 서비스는 FOUNDATION_SUBJECT_REF_SECRET 미보유·raw local_user_ref 미전송·raw/PII 출력 0.
- ★모두 **설계**·구현/마이그레이션/실행은 별도 gate.

## 3. secret_version zero-orphan design
### 3.1 문제
`subject_ref = subj_v2_ + HMAC(FOUNDATION_SUBJECT_REF_SECRET, furef)[:32]`. secret rotation → subject_ref **값 변경** → ltm_fact/EpisodeSummary/MemoryFactCandidate가 박은 구 값 orphan.
### 3.2 설계(version-opaque + SubjectRefMap version 행)
- **SubjectRefMap에 `secret_version` 컬럼 추가**(additive). row = **(furef_local_ref × secret_version)당 1행** — 각 version이 mint한 subject_ref 값 보유. idx(furef_local_ref, secret_version).
- **subject_ref 값은 version-opaque**(subj_v2_ 문자열 포맷 불변). version은 **SubjectRefMap.secret_version가 소유**(memory row는 subject_ref 값만 저장·값→SubjectRefMap 조회로 version 판별). ★subj_v2_ 문자열에 version 임베드 **안 함**(포맷 변경 회피·map이 version source of truth).
- (선택·denormalization) memory row(ltm_fact 등)에 `secret_version` 컬럼 = retirement 쿼리 가속용·필수 아님(SubjectRefMap join 가능). ★설계 결정(§7).
### 3.3 read-side union(coexistence·orphan 0 핵심)
- memory READ: furef → SubjectRefMap의 **모든 live version subject_ref 값 집합** 조회 → `WHERE subject_ref IN (union)`으로 memory 조회. ★union 없으면 공존 무의미(orphan). live version은 소수(예 ≤2: 현재+직전) 유지.
### 3.4 rolling / no-rewrite
- rotation 시 기존 memory row **rewrite 안 함**. 구 version subject_ref 값·SubjectRefMap 행 **유지**(read-side union이 커버). 신 write는 **현 version** subject_ref(SubjectRefMap 현-version 행·최초 touch 시 lazy 생성 또는 rotation backfill).
### 3.5 retirement re-key(구 version 은퇴)
- 구 version drop 전: 구-version subject_ref 값을 박은 memory row를 **현-version 값으로 re-key(FK 갱신)** → 그 후 구 SubjectRefMap 행 drop. ★이것이 "full re-key runbook"의 실체(fallback이 아니라 rolling의 **은퇴 단계**)·**atomic + WAL-safe backup + rollback** 필수.
### 3.6 zero-orphan 불변식
- ★**어느 시점에도 live memory row의 subject_ref 값이 SubjectRefMap에 부재하지 않는다.** retirement는 drop 전 re-key. rolling 공존은 union read. → orphan 0.
### 3.7 영향 테이블(설계·마이그레이션 아님)
- SubjectRefMap(+secret_version·additive) — SIASIU `subject_ref_map`·Cosmile `SubjectRefMap`.
- (선택) ltm_fact/EpisodeSummary/MemoryFactCandidate(+secret_version denorm).
- read-path/retirement = **application 로직**(schema 아님).

## 4. identity-touch API design
### 4.1 목적·형태
- 서비스가 **furef_v2 전송** → Foundation이 **subject_ref mint 후 반환**. 서비스는 FOUNDATION_SUBJECT_REF_SECRET **미보유**.
- 형태(설계): `POST /identity/subject-ref` (service-authenticated) req `{furef_v2, source_service}` → resp `{subject_ref, secret_version}`. ★core = `subject_ref_from_foundation_user_ref`(이미 furef 수용·순수).
### 4.2 stateless mint
- Foundation: `subject_ref = subj_v2_ + HMAC(FOUNDATION_SUBJECT_REF_SECRET_v<current>, furef_v2)[:32]` + 현 `secret_version` 반환. ★DB/store 접근 0(순수 함수 wrapper).
### 4.3 furef 미보존/미로깅(no-broker)
- ★req/resp의 **furef·subject_ref 값을 durable 저장/로깅 금지**(request/trace 미영속). audit = 메타데이터/count만(값 제외). durable furef↔subject_ref 보존 시 M2 금지 broker화 → **금지**.
- ★**SubjectRefMap write는 서비스가 수행**(service-local·M2 §3.9). Foundation은 map 미보유. 서비스가 `(furef_local_ref, subject_ref, secret_version)` 자기 DB에 저장.
### 4.4 per-service auth / namespace-scoped / rate-limit
- **per-service auth**(mTLS/service token)·caller service 식별. **namespace-scoped**: caller는 자기 `<service>:` namespace furef만 제출(furef는 서비스에서 namespace 임베드 파생). **rate-limit**: per-service mint 호출 제한(bulk probing 방지).
### 4.5 oracle resistance(잔여·open decision §7)
- ★mint 결정론(같은 furef→같은 subject_ref) = 본질적 oracle. 완화: per-service auth + rate-limit + **furef 기밀성**(서비스-held·미노출/미로깅) + audit(count). 잔여: furef+API 자격 탈취 시 subject_ref 도출 가능. ★강화 옵션(open): caller의 **proof-of-derivation**(furef에 대한 service-signed token) 요구. → §7 Leo decision.

## 5. canonical furef derivation
### 5.1 문제(W-d)
- 현 shadow candidate adapter가 furef를 `SIASIU_MEMORY_CANDIDATE_SECRET`로 파생 → auth/backfill과 **동일 secret/formula 미보증** → 생산자별 furef 상이 시 subject_ref 발산(split-brain 한 층 상승).
### 5.2 정본화 설계
- ★**단일 per-service furef secret 지정**: `FUREF_SECRET_<service>`(예 `SIASIU_FUREF_SECRET`·`COSMILE_FUREF_SECRET`) — candidate adapter·auth·backfill **전부 동일 secret 사용**. content_hash/candidate_id용 별도 secret과 분리(furef 파생 전용).
- ★**단일 canonical formula**: `furef_v2 = "furef_v2_" + HMAC(FUREF_SECRET_<service>, "<service>:<subject_type>:<stable_id>")[:32]`. `<stable_id>`=서비스 stable user id(local_user_ref)·`<subject_type>`=user 등·`<service>`=siasiu/cosmile.
- ★**불변식(W-1 계승)**: furef는 unique service namespace 임베드 필수·furef space 서비스간 공유 금지·**per-service 상이 secret 값**(2a).
- 마이그레이션 노트(구현 gate): shadow adapter를 `SIASIU_MEMORY_CANDIDATE_SECRET`(furef 용도)에서 canonical `SIASIU_FUREF_SECRET`로 이전(별도 구현 gate·기존 shadow furef 값 변경 수반 → shadow-only라 영향 0).

## 6. FOUNDATION deferred item design (★FOUNDATION 구현 gate·본 문서 설계만)
- **⑧ _factory/entrypoint furef 수용:** `_factory.make_candidate`/live entrypoint가 raw local_user_ref 대신 **furef_v2 입력**(require_furef_v2=True) → `subject_ref_from_foundation_user_ref`로 mint. ★core는 이미 furef 가능·**call-site 변경**(L30). 서비스는 furef만 전송(raw local_user_ref 미전송·§4).
- **R9-1 legacy local_user_ref echo 제거:** `_factory.py` L32(+L57 make_signal) `"local_user_ref": ...` 산출 제거(M2 v1.2 폐기). candidate/signal은 furef_v2(또는 subject_ref)만 보유·raw pre-image 미포함. ★_factory는 test-only synthetic이나 경계 위생상 제거.
- **R8-2 reason_codes enum guard:** `api.py`의 `reason_codes:[str(e)]`(예외 문자열 passthrough)를 **상수 enum**으로 교체 — `REASON_CODES`(고정 코드 집합)·예외→코드 매핑·값/원문 미노출(향후 값 포함 노출 구조적 차단).

## 7. Risks / open decisions
- **[open D-1] memory row secret_version denormalization:** SubjectRefMap join만으로 retirement 쿼리 가능하나, denorm 컬럼이 성능↑·저장/마이그레이션 비용↑. → 권고: **초기 미denorm**(join)·retirement 성능 이슈 시 추가. Leo/구현 gate 결정.
- **[open D-2] identity-touch oracle 강화:** per-service auth+rate-limit+furef 기밀성으로 잔여 수용 vs proof-of-derivation 추가(비용↑). → 권고: **auth+rate-limit+기밀성 수용(default)**·고위험 시 proof-of-derivation. Leo decision.
- **[open D-3] live version 수 상한:** read-side union 성능 위해 live version ≤2(현재+직전) 권고·rotation 주기와 retirement grace 연동. 구현 gate 파라미터.
- **[risk R-1] retirement re-key atomicity:** 대량 FK 갱신·비가역 → EXEC-1 패턴(backup/integrity/count-checksum/rollback rehearsal) 필수·부분실패 rollback.
- **[risk R-2] furef secret 이전(§5.2):** canonical FUREF secret 도입 시 기존 shadow furef 값 변경 → shadow-only라 영향 0이나 실 데이터 전 확정 필요.
- **[risk R-3] SubjectRefMap = 가명 PII:** furef↔subject_ref 매핑 = 유출 시 역추적 축(§11 ⑨). service-local·접근통제·at-rest 암호화(B5) 연계 검토.

## 8. Validation plan (설계 검증·구현 아님)
- **설계 재검수:** 독립 strict review + 외부 Fable5 비교(zero-orphan 불변식·no-broker·oracle 잔여·canonical furef·boundary).
- **구현 gate(승인 후·각 별도):**
  - schema: SubjectRefMap +secret_version = **additive migration gate**(EXEC-1 패턴·backup/integrity/count-checksum/rollback rehearsal·count/hash only).
  - FOUNDATION: identity-touch API·_factory furef·echo 제거·reason_codes enum·canonical furef = **FOUNDATION 구현 gate**(unit: stateless·no-retention assert·per-service auth·rate-limit·namespace·cross-producer furef equality→동일 subject_ref).
  - zero-orphan 시뮬(구현 gate): rotation→union read old+new 반환·retirement re-key→orphan 0·rollback 검증. ★raw/PII 0·count/hash/boolean.
- **backfill harness(execution gate):** guest-only 제외 count·missing-furef abort/skip·idempotency·전후 count/checksum·복원 리허설.

## 9. Next gate recommendation
- ★**본 gate = 설계 문서 산출까지.** 다음 순서(각 별도 Leo 승인):
  1. **설계 재검수**(독립 + 외부 Fable5) → APPROVE 후
  2. **additive schema migration gate**(SubjectRefMap +secret_version·EXEC-1 패턴)
  3. **FOUNDATION 구현 gate**(identity-touch API·_factory furef·R9-1·R8-2·canonical furef)
  4. **M6-F execution gate**(prod secret 주입·subject_ref backfill·§5/§7 조건·backup·단일·idempotent)
- ★**M6-F execution gate(prod secret·backfill)는 계속 닫힘** — 2·3 PASS 후에야 4 판단.

## 무결성
FOUNDATION/schema **design-only** · schema migration 0 · FOUNDATION-side implementation 0 · M6-F execution 0 · prod secret 실주입 0 · subject_ref backfill 0 · prod DB 0 · live 0 · hard reject 0 · repair/mapping/backfill 0 · **main merge 0**(siasiu 3cd068d·cosmile 3ba91e0·fc ee055ef) · schema code main merge 0 · 코드/DB 변경 0 · raw/PII/실 secret 값 출력 0 · durable/cross-service/V3 0 · 본 design 문서만 foundation-docs commit/push · **재검수·schema migration·FOUNDATION 구현·execution은 각 별도 Leo 승인.**
