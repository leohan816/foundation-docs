# FOUNDATION MEMORY subject_ref HARD GATE — 구현 결과 (RESULT)

> ★★SUPERSEDED (Memory V1 Option B · 2026-07-06): **M2의 Option A / FOUNDATION_SUBJECT_REF_SECRET 기반 subject_ref mint 공식은 Memory V1 Option B에 의해 superseded되었다. 현행 정본은 service-local subject_ref mint + Foundation validate/gate/reasoning only이다.** 아래 원문은 이력 보존(clean-not-compress)·정본 계약=`FOUNDATION_MEMORY_ARCHITECTURE_V1_M6_F_OPTION_B_SUBJECT_REF_CONTRACT_20260705.md`·closure=`..._M6_FINAL_CLOSURE_20260706.md`. ★V3는 폐기된 Option A 계약을 상속하지 않는다.

> 작성: foundation-control / Foundation Memory 담당 · 2026-07-04 · **상태: PASS** · 설계서: `FOUNDATION_MEMORY_SUBJECT_REF_HARD_GATE_20260704.md`
> 대상 repo: FOUNDATION `foundation/shared_memory/` · branch `shadow/foundation-shared-memory-v0` · **local commit `c9bb996`(미푸시)** · ★Memory live/write ON 0.

## A. verdict
**`PASS`** — subject_ref v2 hard gate 4개 PATCH 항목 모두 닫힘. 기존 회귀 무손상·Memory write/live 0 유지·raw PII/secret 누출 0. source repo push 0(local commit만).

## B. 변경 파일 (FOUNDATION·shared_memory만·5)
| 파일 | 변경 |
|---|---|
| `subject_identity.py` | subject_ref v2(subj_v2_·128-bit HMAC)·prod fail-closed·furef_v2 bridge·`_SALT` 하드코딩 default 제거(+71/-?) |
| `__init__.py` | export: `subject_ref_from_foundation_user_ref`·`is_furef_v2`·`SubjectRefSecretMissing` |
| `eval.py` | non-prod dev fallback env(setdefault) — shadow eval 유지 |
| `tests/test_shared_memory_v0.py` | 동 dev fallback env |
| `tests/test_subject_ref_v2_hard_gate.py` **(신규)** | hard gate 매트릭스 29 케이스 |
- 총 5 files · 234 insertions · 10 deletions. **local commit `c9bb996`(push 0)**.

## C. 기존 subject_ref 문제 → 해소
| 문제(전) | 해소(후) |
|---|---|
| `subj_ + sha256(salt\|svc\|ref)[:16]` = **64-bit** | `subj_v2_ + HMAC_SHA256(secret, local_user_ref)[:32]` = **128-bit** |
| `_SALT` **하드코딩 DEV 기본값**(silent degrade) | **하드코딩 제거** · server secret + prod fail-closed |
| production fail-closed **부재** | secret 부재 시 **SubjectRefSecretMissing**(prod·env 미설정 fail-safe) |
| furef→local_user_ref bridge **미구현** | `subject_ref_from_foundation_user_ref`(furef_v2 형식 검증) |
| regression **부족** | hard-gate 29 케이스 + 기존 41 + eval 16 |

## D. 새 subject_ref 생성 방식
`subject_ref = "subj_v2_" + HMAC_SHA256(key=FOUNDATION_SUBJECT_REF_SECRET, msg=local_user_ref).hexdigest()[:32]`.
- deterministic·opaque·one-way(secret 없이 재현 불가)·128-bit. msg=local_user_ref(furef가 이미 service-namespaced → 서비스 격리 상속·spec 준수).

## E. local_user_ref bridge 방식
`subject_ref_from_foundation_user_ref(source_service, foundation_user_ref, consent_record)` → `resolve_subject(..., require_furef_v2=True)`.
- `local_user_ref := foundation_user_ref`(byte-for-byte) · `^furef_v2_[0-9a-f]{32}$` 검증 · 불일치(malformed·v1 `furef_`·raw id) = **reject(fail-closed)**.

## F. production secret missing 처리
- `_is_production()`: `FOUNDATION_ENV` 미설정/unknown → production(fail-safe).
- prod + `FOUNDATION_SUBJECT_REF_SECRET` 부재 → **`SubjectRefSecretMissing`(ValueError 하위)** → api `resolve_subject`가 fail-closed 응답(`subject_ref=None·linked=False·reason_codes`). **약한 해시/mock 대체 0.**
- dev fallback = non-prod **AND** `FOUNDATION_SUBJECT_REF_DEV_FALLBACK=1` 명시일 때만(prod 도달 불가). plain SHA256 fallback = production 금지.

## G. raw PII / secret / log guard
- PII 패턴(email/phone/RRN) reject(유지) + furef_v2 형식 강제 → raw id 진입 이중 차단.
- **secret 값 미출력**: subject_ref·예외 메시지에 secret/dev-key 미포함(test 12·10b 검증). `_DEV_FALLBACK_KEY`는 non-secret dev placeholder(prod 미도달).
- **trace_id 미개입**: subject_identity에 trace 참조 0(test 14b)·같은 furef→같은 subject_ref(user-scoped·request/trace 무관).

## H. Memory write/live 상태
- **flag `shared_memory_v0_shadow` = False(OFF)** · `write_live=False` · `applied_to_real_user=False` · `memory_db_created=False` · `_store` 휘발성. → **live/write 0 유지**(이 패치가 켜지 않음).

## I. 테스트 결과
- **hard gate 신규: 29/29 PASS**(형식·bridge·malformed/v1/raw reject·PII reject·prod fail-closed·env-미설정 fail-safe·dev flag 필수·secret 미노출·trace 무관·write 0).
- **기존 shared_memory: 41/41 PASS** · **eval: 16/16 PASS**(raw_pii_leak=0·memory_db=False·write_live=False).
- **consult_contract smoke(무관 확인): http_service 40/40·dual_adapter 26/26 PASS** — subject_identity 변경이 consult 경로에 무영향.

## J. 기존 consult_contract 영향
- **없음**: consult_contract(foundation-control/foundation_http_service)는 shared_memory subject_identity를 소비하지 않음(FOUNDATION core grep foundation_user_ref=0). smoke 40/40·26/26 유지. SIASIU/Cosmile contract breaking 0.

## K. migration 필요 여부
- ★**불필요(NO migration)**: 현재 memory write 0(memory_db_created=False·write_live=False·flag OFF·store 휘발성) → 저장된 subject_ref 0 → 형식 변경(64→128bit·subj_→subj_v2_)에 재키잉 대상 없음. **live 전 확정이라 전환 비용 0.**

## L. 남은 WATCH
- consult core furef→local_user_ref **실배선**·`local_user_ref := foundation_user_ref` 계약 조항 = **Memory live release train**(이번은 shared_memory 계층 gate·bridge 함수만).
- prod `FOUNDATION_SUBJECT_REF_SECRET` **배포 필요**(미배포 시 prod fail-closed·안전).
- `_SALT`(구 env) 잔존 참조 없음 확인됨(live 도출 경로에서 제거) — 완전 삭제 여부는 후속 cleanup.
- SIASIU/Cosmile furef stable_id preimage(email/name) = 서비스측 WATCH(별도 train).
- FOUNDATION `CLAUDE.md` 미커밋 변경(동시 세션 소행) = 이 작업 무관·미접촉.

## M. Fable5 리뷰 필요 포인트
- subject_ref v2 128-bit·HMAC·prod fail-closed·furef_v2 bridge가 정책(APPROVED_CANDIDATE)과 정합한지.
- msg=local_user_ref의 서비스 격리 상속(furef namespacing) 논거 타당성.
- dev fallback flag가 prod로 새지 않음·secret 미출력.
- Memory write 0 유지(패치가 live를 열지 않음).

## N. source repo push 여부: **0**
- FOUNDATION = **local commit `c9bb996`만**(branch `shadow/foundation-shared-memory-v0`·미푸시). SIASIU/Cosmile 미변경. foundation-docs만 mirror/push.

## 무결성
SIASIU/Cosmile 수정 0 · Foundation Memory live ON 0 · DB migration 0 · raw PII 저장 0 · secret 값 출력 0 · `git add -A` 미사용(명시 5파일) · source repo push 0.
