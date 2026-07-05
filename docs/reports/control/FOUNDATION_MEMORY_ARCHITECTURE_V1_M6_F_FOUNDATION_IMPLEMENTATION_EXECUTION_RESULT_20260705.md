# Memory V1 — M6-F FOUNDATION Implementation Execution Result (shadow·flag OFF)

> ★[OPTION A — Option B pivot(shadow FOUNDATION `5a0003c` / SIASIU `d0f51cb` · docs `1e24c33`)로 **SUPERSEDED**. 정본: `..._M6_F_OPTION_B_SUBJECT_REF_CONTRACT_20260705.md` · `..._OPTION_B_SHADOW_PIVOT_RESULT_20260705.md`. ★Foundation-side mint · FOUNDATION_SUBJECT_REF_SECRET · identity-touch = **폐기(deprecated·Option A relic)**. subject_ref = service-local mint(Foundation validate/gate only).]

> 작성: foundation-control(Control) · 2026-07-05 · **범위: Leo 승인 FOUNDATION impl execution gate 실행 결과(shadow branch·feature flag default OFF).**
> ★M6-F execution · prod secret 주입 · subject_ref backfill · prod DB · live · main merge = **미승인·미수행.** Restricted Actions List = source report 참조.
> ★역할: FOUNDATION 변경 = control tower plan(impl gate package `1cc1b23`) 경유·shadow 브랜치·main merge 0.
> 근거(local): impl gate package(`1cc1b23`) · design review(`02fe421`·W1~W6) · FOUNDATION/SIASIU/Cosmile 실코드.

---

## 1. Fact
- **FOUNDATION impl 실행 완료(shadow·flag OFF):** identity-touch API·furef entrypoint·R9-1 echo 제거·W4 reason_codes enum·canonical furef(W3)·W1 atomicity·W5 no-retention·W6 fail-safe.
- **commit(shadow·main 무변경):** FOUNDATION **`df9f6cc`**(shadow/foundation-shared-memory-v0·신규 push) · SIASIU **`13012c4`**(shadow/m4-siasiu-memory) · Cosmile **`801924d`**(shadow/m4-cosmile-memory).
- ★M6-F execution/prod secret/backfill/main merge 0.

## 2. Implementation scope (실행됨·shadow)
1. identity-touch API(mint_subject_ref·flag OFF) 2. _factory/entrypoint furef 입력 3. R9-1 legacy local_user_ref echo 제거 4. W4 reason_codes enum(api.py+gate.py) 5. canonical furef(SIASIU_FUREF_SECRET 분리) 6. W1 write-side atomicity 7. W3 canonical stable_id/furef 8. W5 no-retention 9. W6 fail-safe prod default.

## 3. Files changed
| repo | 파일 | 변경 |
|---|---|---|
| FOUNDATION `df9f6cc` | `shared_memory/reason_codes.py`(신규) | REASON_CODES 상수 enum(W4) |
| | `shared_memory/api.py` | mint_subject_ref(identity-touch·flag OFF·no-retention audit)·resolve_subject enum guard |
| | `shared_memory/subject_identity.py` | current_secret_version() |
| | `shared_memory/_factory.py` | furef 입력(⑧·_to_furef)·local_user_ref echo 제거(R9-1) |
| | `shared_memory/gate.py` | has_raw_or_pii category화·L64 enum guard(W4) |
| | `shared_memory/contract.py` | CONTRACT_FIELDS local_user_ref→furef_v2(R9-1) |
| SIASIU `13012c4` | `foundation_memory_candidate_adapter.py` | canonical_furef_v2(FUREF secret 분리)·W6 |
| | `foundation_p3_auth_shadow.py` | canonical_furef_v2(auth·동일 furef)·W6 |
| | `foundation_memory_schema_shadow.py` | write_subject_ref_map_atomic(W1) |
| | tests(adapter/p3) | cross-producer furef equality·dev env |
| Cosmile `801924d` | `foundation-memory-deanon.mjs`·test | W6 fail-safe·dynamic import |
- ★main merge 0(fnd 580093c·siasiu 3cd068d·cosmile 3ba91e0 무변경).

## 4. Feature flags / inertness
- **identity-touch API(mint_subject_ref):** `shared_memory_v0_shadow` flag **default OFF** → OFF면 `disabled`(inert)·기존 동작 100% 동일. (flag_restored_off 확인·eval).
- **구조적 교정(항상 활성·shadow/isolated·live 미배선):** reason_codes enum·_factory furef·contract field·canonical furef·W1 helper·W6 — live answer/commerce 경로 **미배선**·dev/test 동작 불변(fail-safe는 prod에서만 fail-closed).
- ★live/prod 배선 0·flag OFF 기본.

## 5. Identity-touch API result
- `mint_subject_ref(source_service, furef_v2)` → `{subject_ref, secret_version, reason_codes}`. core=`subject_ref_from_foundation_user_ref`(furef→subject_ref·순수).
- **동작 실증:** furef→subject_ref mint·secret_version=1·**deterministic**(같은 furef→같은 subject_ref)·**non-furef reject**(enum `local_user_ref_not_furef_v2`)·flag OFF→disabled.
- ★**W5 no-retention:** audit=per-service **count only**(`_MINT_AUDIT={'siasiu':N}`)·**furef/subject_ref 값 미저장·미로깅**·비캐시. SubjectRefMap write는 서비스(service-local).
- ★per-service auth/rate-limit = **live-transport 요구사항**(문서)·in-process shadow는 **namespace-scoping(require_furef_v2 형식)** + per-service audit 강제. (실 transport auth/rate-limit는 live 배선 gate.)

## 6. Canonical furef result
- ★**cross-producer furef equality**: `candidate.canonical_furef_v2(id) == auth.canonical_furef_v2(id)`(동일 stable_id→동일 furef·**split-brain 0**)·다른 id→다른 furef.
- **FUREF secret 분리**: `SIASIU_FUREF_SECRET`(furef 전용) ≠ `SIASIU_MEMORY_CANDIDATE_SECRET`(content-hash)·**두 변경 완료**(생산자 수렴 AND secret 분리).
- **W3 stable_id**: auth 경로가 login→canonical local_user_ref(stable_id)→canonical_furef_v2(phash_v2_는 furef 아님·별개).

## 7. W1/W3/W4/W5/W6 result
| watch | 결과 |
|---|---|
| **W1** write-side atomicity | ✅ `write_subject_ref_map_atomic`: 성공(map+memory 1/1)·**실패 rollback(0/0)**·memory row가 map 부재로 존재 불가(orphan 0) 실증 |
| **W3** canonical furef | ✅ cross-producer equality·FUREF secret 분리·stable_id resolver 설계 |
| **W4** reason_codes enum | ✅ api.py L40 예외 str→enum(leak 문자열→`cannot_determine`)·gate.py L64 category+enum·값/field 값 미노출 |
| **W5** no-retention | ✅ audit count-only·furef/subject_ref 미저장/미로깅·비캐시 |
| **W6** fail-safe prod default | ✅ 3 shadow 모듈+FOUNDATION: unknown/unset env→production→fail-closed(prod raise 실증)·dev/test만 fallback |

## 8. Test / regression result
| 항목 | 결과 |
|---|---|
| FOUNDATION shared_memory / hard_gate / eval | **41/41 · 29/29 · 16/16** |
| SIASIU adapter(cross-producer furef 포함) / p3 / schema | **31/31 · 16/16 · 27/27** |
| SIASIU integration / workflow / fingerprint | **39/39 · 119/119 · d7f579443f8a110a**(무변경) |
| Cosmile de-anon / vitest / readiness / loop | **14/14 · 10/10 · 164/164 · 112/112** |
| Foundation gate / runner | **57/57 · 83/89**(taxonomy {lmr 5, brain 1}·M6-F 무관·불변) |
| identity-touch(stateless/no-retention/deterministic/enum reject) | **PASS** · W1 atomicity **PASS** |

## 9. Integrity
FOUNDATION impl execution(shadow·flag OFF) only · identity-touch flag OFF=inert · M6-F execution 0 · prod secret 주입 0 · subject_ref backfill 0 · prod DB 0 · live 0 · hard reject 0 · **main merge 0**(fnd 580093c·siasiu 3cd068d·cosmile 3ba91e0) · raw/PII/실 secret 값 출력 0 · FOUNDATION 단독 수정 0(control tower plan 경유) · 회귀 0(fingerprint 유지) · 서버 잔여 0 · shadow 커밋 push(fnd df9f6cc·siasiu 13012c4·cosmile 801924d).

## 10. Next gate recommendation
- ★**FOUNDATION impl execution 완료(shadow·flag OFF)** → 다음(각 별도 Leo 승인):
  1. **impl 재검수**(독립 + 외부 Fable5·local source)·W1~W6 반영 확인.
  2. **M6-F execution gate** — prod secret 주입(FOUNDATION_SUBJECT_REF_SECRET·SIASIU_FUREF_SECRET 등 per-service 값 분리)·subject_ref backfill(§ 조건·backup·단일·idempotent·guest 제외).
- ★**M6-F execution gate(prod secret·backfill)는 계속 닫힘.** live 배선(identity-touch flag ON·auth/rate-limit transport)은 별도 gate.

## 무결성
M6-F FOUNDATION impl execution(shadow·flag OFF) only · M6-F execution 0 · prod secret 0 · subject_ref backfill 0 · prod DB 0 · live 0 · **main merge 0** · raw/PII/실 secret 값 0 · 회귀 0 · shadow 커밋 push·main 무변경 · 본 result report만 foundation-docs commit/push · **재검수·M6-F execution·prod secret·backfill은 각 별도 Leo 승인.**
