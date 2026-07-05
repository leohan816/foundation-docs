# Memory V1 — M6-F Option B Pivot Audit + Redesign Package

> 작성: foundation-control(Control) · 2026-07-05 · **판정: OPTION_B_FEASIBLE** · **범위: audit + redesign package(문서)까지. 코드 수정 0·실 secret 0·Vault write 0·prod DB 0·live 0·main merge 0.**
> ★Leo 최종 결정: M6-F subject_ref = **Option B(service-local mint·Foundation는 contract/format/gate/validation만)**. A1 real vault injection **중단**.
> ★Foundation = **고객 장기기억 DB 아님 · customer memory broker 아님 · service DB를 subject_ref로 직접 조회 안 함.** subject_ref 생성/저장/SubjectRefMap = **service-local.**
> 근거(local): FOUNDATION `subject_identity/api/_factory` · SIASIU adapter/schema · Cosmile schema · M6-F 문서군(`~a962f6f`).

---

## 1. Fact
- Option A(현재 shadow·flag OFF·미merge): Foundation이 `subject_ref = HMAC(FOUNDATION_SUBJECT_REF_SECRET, furef)`로 **mint**(identity-touch API·서비스는 subject_ref=None으로 위임).
- Option B(정본 전환): **각 서비스가 subject_ref를 service-local로 mint**·Foundation은 **format/validation/gate만**. FOUNDATION_SUBJECT_REF_SECRET·identity-touch = 폐기/비활성 재검토.
- ★Option A 코드는 **isolated(shadow branch·flag OFF·main 미merge)** → pivot이 live/prod 영향 0. service-local 기반(SubjectRefMap·secret_version)은 **이미 존재** → 재사용.

## 2. Why pivot is needed
- Foundation을 **durable customer memory / broker**로 만들지 않기 위함. Option A의 Foundation-side mint는 Foundation이 furef↔subject_ref mint에 관여(oracle·경계 위험·이전 검수 W5/oracle 잔여). Option B는 **Foundation을 판단/계약/게이트 계층으로만** 유지하고 identity 소유를 서비스로 되돌려 경계를 단순·안전화.
- ★Foundation은 request-scoped memory_context를 **받아 검증/판단**하되 **durable customer memory로 저장하지 않는다**(no-broker·no-durable).

## 3. Option A dependencies found (audit·실코드)
| 위치 | Option A 의존 | 참조 |
|---|---|---|
| FOUNDATION `subject_identity.py` | `FOUNDATION_SUBJECT_REF_SECRET`·`_subject_secret`·`resolve_subject`(HMAC mint)·`subject_ref_from_foundation_user_ref`·`current_secret_version` | 13 |
| FOUNDATION `api.py` | `mint_subject_ref`(identity-touch)·`resolve_subject` | 6 |
| FOUNDATION `_factory.py` | `subject_ref = SI.resolve_subject(...)`(Foundation mint) | 2 |
| FOUNDATION `__init__.py`·`eval.py` | mint/api export·eval scenario | 참조 |
| SIASIU adapter | `"subject_ref": None`(Foundation-mint 위임)·`canonical_furef_v2`(furef→Foundation) | L145 등 |
| 문서(M6-F) | FOUNDATION_SUBJECT_REF_SECRET·identity-touch·Foundation-mint 언급 | **18 파일** |
- ★service-local **이미 존재(재사용)**: SIASIU `subject_ref_map`(+secret_version)·Cosmile `SubjectRefMap`(+secretVersion)·W1 atomicity·de-anon·gate·reason_codes(W4)·W6 fail-safe.

## 4. Keep / modify / discard matrix
| 산출물/코드 | 판정 | 사유 |
|---|---|---|
| subject_ref **format**(subj_v2_·32hex·keyed HMAC·PII-free) | **KEEP** | Foundation contract(format) — Option B에서도 공통 |
| Foundation **validation**(is_furef_v2·is subject_ref·PII reject) | **KEEP**(minting과 분리) | Foundation contract/validation 역할 |
| Foundation **gate**(has_raw_or_pii·gate_decision) | **KEEP** | Foundation 판단 계층 |
| reason_codes enum(W4)·W6 fail-safe·W1 atomicity·de-anon | **KEEP** | service-local과 무관·유지 |
| SubjectRefMap(service-local)+secret_version | **KEEP** | Option B service-local 저장 |
| SIASIU adapter `subject_ref=None`(위임) | **MODIFY** | service-local mint로 채움(위임 제거) |
| `canonical_furef_v2`(furef→Foundation) | **MODIFY** | service-local subject_ref mint로 재정의(또는 furef 내부화) |
| subject_ref **contract 문서** | **MODIFY** | "Foundation mint" → "service-local mint·Foundation contract만" |
| backfill plan · post-injection template · ops handoff | **MODIFY** | FOUNDATION_SUBJECT_REF_SECRET/identity-touch 제거·per-service subject secret |
| M6-H skeleton · status matrix | **MODIFY** | Option B 반영·A1 중단 |
| `FOUNDATION_SUBJECT_REF_SECRET`·`_subject_secret`·`current_secret_version` | **DISCARD/비활성** | Foundation mint 제거 |
| `resolve_subject`(HMAC mint 경로)·`subject_ref_from_foundation_user_ref` | **DISCARD/비활성**(validation만 잔존 가능) | Foundation mint 제거 |
| `mint_subject_ref`(identity-touch API) | **DISCARD/비활성** | 서비스가 Foundation에 mint 요청 안 함 |
| `_factory` Foundation mint | **MODIFY**(service-local mint 또는 contract-only) | 테스트 빌더 |
| Option A 문서 18개 | **MODIFY(drift 정정)** | Option A 표기 → superseded by Option B |

## 5. Option B target architecture
### 5.1 원칙
1. Foundation ≠ 고객 장기기억 DB · ≠ customer memory broker · service DB를 subject_ref로 직접 조회 안 함.
2. SIASIU·Cosmile 각자 **상담+커머스 service-local memory DB** 보유.
3. subject_ref 생성/저장/SubjectRefMap = **service-local.**
4. Foundation = subject_ref **contract/format/gate/validation**만 · request-scoped memory_context 검증/판단 · **durable 저장 0.**
### 5.2 subject_ref service-local mint(설계)
- `subject_ref = "subj_v2_" + HMAC(<SERVICE>_SUBJECT_SECRET, "<service>:local_user:"+<stable_id>)[:32]` — **서비스가 자기 secret으로 mint**. Foundation secret 미사용.
- 각 서비스가 SubjectRefMap(service-local)에 `(subject_ref, local_user_ref_hash, secret_version)` 저장(W1 atomic).
- cross-service correlation: 서비스별 secret 상이 → 자연 방지(Foundation 개입 0).
### 5.3 Foundation 역할(계약 계층)
- format 검증(`is subj_v2_ 형식`·32hex)·PII reject·gate 판정·reason_codes. **mint/secret/저장 0.**
- request-scoped memory_context(서비스가 subject_ref+facts 전달) 검증/판단 → 결정 반환. **durable 저장 0·service DB 미조회.**

## 6. SIASIU/Cosmile common subject_ref contract
- **공통(Foundation contract):** subject_ref format `subj_v2_<32hex>`·keyed HMAC·PII-free·validation 규칙·gate. **양 서비스 동일 format/validation.**
- **서비스별(service-local):** `<SERVICE>_SUBJECT_SECRET`(상이 값)·mint·SubjectRefMap·secret_version·rotation. **secret/mint/저장은 per-service.**
- ★common contract = format+validation+gate(Foundation) · per-service = secret+mint+storage(service).

## 7. Required implementation changes (설계·코드 수정은 별도 승인)
### 7.1 service-local secret/env 재정의
| env | Option B 역할 | Option A 대비 |
|---|---|---|
| `SIASIU_SUBJECT_SECRET` | SIASIU subject_ref mint(service-local) | **신규**(FOUNDATION_SUBJECT_REF_SECRET 대체) |
| `SIASIU_SUBJECT_SECRET_VERSION` | SIASIU subject rotation version | 신규(per-service) |
| `SIASIU_MEMORY_CANDIDATE_SECRET` | content_hash | 유지 |
| `SIASIU_P3_AUTH_SECRET` | login de-id | 유지 |
| `COSMILE_SUBJECT_SECRET`(+_VERSION) | Cosmile subject_ref mint(service-local) | 신규 |
| `COSMILE_MEMORY_SECRET` | de-anon | 유지 |
| ~~`FOUNDATION_SUBJECT_REF_SECRET`~~·~~`_VERSION`~~ | — | **DISCARD**(Foundation mint 제거) |
| ~~`SIASIU_FUREF_SECRET`~~ | furef 내부화 or SUBJECT_SECRET로 통합 | 재검토(furef layer 필요성) |
### 7.2 코드 변경(별도 승인·shadow)
- FOUNDATION: `subject_identity` mint 경로(resolve_subject HMAC·subject_ref_from_foundation_user_ref)·`_subject_secret`·`current_secret_version` **비활성/제거**·validation(is_furef_v2·is subject_ref·PII reject)만 잔존. `api.mint_subject_ref`(identity-touch) **제거/비활성**. `_factory` service-local mint 또는 contract-only.
- SIASIU adapter: `subject_ref=None` → **service-local mint**(`SIASIU_SUBJECT_SECRET`)·SubjectRefMap W1 저장.
- Cosmile: 필요 시 Cosmile subject_ref mint(service-local·현 de-anon만·subject mint 미배선).
### 7.3 secret_version / rotation(service-local)
- 각 서비스 SubjectRefMap `secret_version`(이미 dev 적용)·rotation은 **service-local**(FOUNDATION rotation 제거). read-side union/retirement = service-local(설계 유지).

## 8. prod DB backfill 계획 재작성 방향
- backfill = **service-local mint**(각 서비스가 자기 `<SERVICE>_SUBJECT_SECRET`로 NULL→subject_ref)·**Foundation call/identity-touch 0**. guest 제외·missing furef skip·idempotency·기존 non-NULL 재계산 0·W1 atomic = **유지**. FOUNDATION_SUBJECT_REF_SECRET 의존 제거.

## 9. post-injection verification template 재작성 방향
- 검증 대상 = **per-service `<SERVICE>_SUBJECT_SECRET`**(FOUNDATION_SUBJECT_REF_SECRET 제거). env 사용·값 분리·dev fallback 차단·fail-safe·service-local mint 동작·**Foundation mint 경로 부재** 확인. boolean/hash/count only.

## 10. Required document patches (drift 정정 계획)
- Option A 참조 18개 문서: **일괄 재작성 대신 pivot notice + supersede 포인터**("★Option A — Option B pivot(본 audit)로 superseded")·정본은 Option B 문서군. 신규 canonical: subject_ref contract(Option B)·backfill(Option B)·post-injection(Option B)·M6-H/status matrix 갱신.
- ops handoff(`c433f14`)·prod secret injection(`83ae233`): FOUNDATION_SUBJECT_REF_SECRET 항목 **DISCARD 표기**·per-service SUBJECT_SECRET로 대체 표기.

## 11. M6-H / status matrix 업데이트 방향
- M6-F 상태: **Option B pivot(재설계)**·A1 real vault injection **중단(STOPPED)**·identity-touch/FOUNDATION_SUBJECT_REF_SECRET **DEPRECATED**·service-local mint **재설계 중**. dev backfill verify(`10996c5`) = 로직 재사용 가능(mint 주체만 service-local로). runner-fix train·M6-G·M6-H = 영향 최소(subject_ref 소유만 이동).

## 12. Risk
- **R1(코드 재작업):** FOUNDATION subject_identity/api/_factory + SIASIU adapter 수정(shadow·별도 승인). isolated(flag OFF·미merge)라 live 영향 0.
- **R2(문서 drift):** 18 문서 Option A 표기·supersede 포인터로 정정(정보 손실 0·clean-not-compress).
- **R3(furef layer):** Option B에서 furef 별도 layer 필요성 재검토(subject_ref 직접 mint면 furef 불요·또는 내부 ref). → redesign에서 확정.
- **R4(테스트):** _factory/eval subject_ref 기대 갱신(service-local mint). 회귀는 shadow에서 재검증.
- ★모든 변경 = shadow·별도 승인·live/prod/main merge 0.

## 13. Verdict
**OPTION_B_FEASIBLE.** service-local 기반(SubjectRefMap·secret_version·W1·de-anon)은 이미 존재·Option A 추가분은 isolated(shadow·flag OFF·미merge) → pivot = Foundation mint **비활성/제거** + service-local subject mint **추가** + 문서 drift 정정. 근본 blocker 없음·변경 열거 가능. ★코드 수정·실 secret·vault·prod·live·main merge = 이번 범위 밖(별도 승인).

## 14. Next recommended batch
1. **Option B subject_ref contract 문서**(common format/validation·per-service mint) 정본화.
2. **shadow 코드 pivot**(별도 승인): FOUNDATION mint 비활성·SIASIU service-local mint·_factory·테스트 재검증.
3. **backfill/post-injection/ops handoff Option B 재작성** + Option A 18문서 supersede 포인터.
4. **status matrix/M6-H Option B 갱신**.

---

## Self-review (7 checks)
1. **Foundation durable customer memory 표현 0:** ✅ 본 문서는 "Foundation ≠ durable customer memory"(부정·원칙)만 기술·Foundation이 저장한다는 표현 없음.
2. **Foundation customer memory broker 표현 0:** ✅ "Foundation ≠ broker"(부정)만·broker화 표현 없음.
3. **service-local subject_ref 원칙 유지:** ✅ subject_ref 생성/저장/SubjectRefMap = service-local 일관.
4. **SIASIU/Cosmile common contract 유지:** ✅ §6 common(format/validation/gate) + per-service(secret/mint/storage).
5. **A1 real vault injection 중단 반영:** ✅ §1·§11 A1 STOPPED 명시.
6. **secret 값 출력 0:** ✅ env 명만·실 secret 값 0.
7. **prod DB/live/main merge 0:** ✅ 코드 수정 0·prod 0·live 0·main merge 0.

## 무결성
Option B pivot audit + redesign **package(문서)** only · 코드 수정 0 · 실 secret 생성/출력/커밋 0 · Vault write 0 · prod DB 0 · live 0 · **main merge 0**(fnd 580093c·siasiu 3cd068d·cosmile 3ba91e0) · Foundation durable/broker 표현 0(부정만) · service-local subject_ref 원칙 유지 · 본 audit만 foundation-docs commit/push · **코드 pivot·backfill·prod·live·main merge는 각 별도 Leo 승인.**
