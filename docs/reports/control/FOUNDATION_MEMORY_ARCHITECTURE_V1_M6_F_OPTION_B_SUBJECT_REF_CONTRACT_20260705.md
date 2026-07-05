# Memory V1 — M6-F Option B subject_ref Contract (canonical)

> 작성: foundation-control(Control) · 2026-07-05 · **정본: Option B subject_ref contract(service-local mint · Foundation format/validation/gate only).**
> ★Foundation = 고객 장기기억 DB 아님 · customer memory broker 아님 · service DB를 subject_ref로 직접 조회 안 함. subject_ref 생성/저장/SubjectRefMap = **service-local.**
> 근거(local): Option B pivot audit(`598b727`) · SIASIU/Cosmile schema(SubjectRefMap service-local) · FOUNDATION gate/validation.

---

## 1. Roles (경계)
| 계층 | 담당 | 미담당 |
|---|---|---|
| **Foundation** | subject_ref **format·validation·PII/raw reject·gate·contract** · request-scoped memory_context 검증/판단 | ★subject_ref **mint 안 함** · secret 미보유 · durable customer memory **미저장** · service DB 미조회 · broker 아님 |
| **Service(SIASIU/Cosmile)** | subject_ref **mint(service-local secret)** · SubjectRefMap 저장 · secret/rotation · service-local memory DB | Foundation secret 미사용 · cross-service 공유 안 함 |

## 2. Common format (Foundation contract·양 서비스 공통)
- `subject_ref = "subj_v2_" + <32 hex>` (128-bit keyed HMAC 출력·소문자 hex).
- 정규식: `^subj_v2_[0-9a-f]{32}$`.
- ★**PII-free**: subject_ref에 평문 email/phone/RRN/이름 등 **불허**(가명 keyed HMAC만).
- guest 구분: guest_ref(별도)·subject_key = COALESCE(subject_ref, guest_ref).

## 3. Validation (Foundation·mint 아님)
- `is_subject_ref_v2(ref)`: format 검증(정규식).
- `validate_subject_ref(ref)`: format + PII-free 검증 → ok / reason_code(enum). ★Foundation은 **서비스가 mint한 subject_ref를 검증**(생성 아님).
- PII 입력 reject: `pii_in_subject_ref`(평문 PII 발견 시)·reason_codes enum 경유(값/원문 미노출).

## 4. Service-local mint rule (service 담당)
- `subject_ref = "subj_v2_" + HMAC_SHA256(<SERVICE>_SUBJECT_SECRET, "<service>:subject:"+<stable_id>)[:32]`.
  - `<SERVICE>_SUBJECT_SECRET`: **per-service·service-local**(Foundation secret 아님)·상이 값(cross-service correlation 방지).
  - `<service>`: siasiu / cosmile(namespace 임베드).
  - `<stable_id>`: 서비스 canonical local user id.
- ★서비스가 자기 secret으로 mint·**Foundation 미호출**(identity-touch 폐기).

## 5. secret_version / rotation rule (service-local)
- SubjectRefMap `secret_version`(service-local·이미 dev 적용). 각 서비스 `<SERVICE>_SUBJECT_SECRET_VERSION`(default 1).
- rotation: **service-local**(Foundation rotation 없음). version당 SubjectRefMap 행(zero-orphan)·read-side union·retirement re-key = service-local 설계(W1 atomic 유지).

## 6. SubjectRefMap (service-local)
- 컬럼: `subject_ref`(PK)·`local_user_ref_hash`(furef/keyed hash·raw 미저장)·`guest_ref`·`secret_version`·`created_at`(Cosmile +`allowLink`).
- partial unique (local_user_ref_hash, secret_version) WHERE NOT NULL(guest 제외).
- **W1 atomicity**: subject_ref_map 행 = 첫 memory row와 동일 tx(orphan 0).
- ★저장 = **service-local DB**(Foundation 미저장).

## 7. SIASIU / Cosmile common contract
- **공통(Foundation)**: format(§2)·validation(§3)·gate·reason_codes. 양 서비스 동일.
- **per-service(service-local)**: `<SERVICE>_SUBJECT_SECRET`·mint(§4)·SubjectRefMap·rotation(§5). 서비스별 상이.
- ★cross-service correlation: 서비스별 secret 상이 + Foundation 미개입 → 자연 방지.

## 8. Foundation role boundary (재확인)
- Foundation은 **request-scoped memory_context**(서비스가 subject_ref + facts + safety flags 전달)를 받아 **검증/판단**(gate·decision) → 결정 반환. ★**durable customer memory 저장 0 · service DB 미조회 · subject_ref mint 0 · secret 0.**

## 9. Deprecated (Option A·제거/비활성)
- ~~`FOUNDATION_SUBJECT_REF_SECRET`~~ · ~~Foundation-side mint(resolve_subject HMAC·subject_ref_from_foundation_user_ref)~~ · ~~identity-touch API(mint_subject_ref)~~ · ~~current_secret_version(Foundation)~~ · ~~_subject_secret~~.
- Foundation validation(is_furef_v2·is_subject_ref·PII reject)·gate = **잔존**.

## 무결성
Option B subject_ref contract(정본) · Foundation mint 0 · Foundation secret 0 · durable customer memory 0(부정·미저장) · broker 0 · service-local mint/저장 · secret 값 출력 0 · 본 contract만 commit/push.
