# Memory V1 — M6-F FOUNDATION Implementation Gate Package (design/plan)

> ★[OPTION A — Option B pivot(shadow FOUNDATION `5a0003c` / SIASIU `d0f51cb` · docs `1e24c33`)로 **SUPERSEDED**. 정본: `..._M6_F_OPTION_B_SUBJECT_REF_CONTRACT_20260705.md` · `..._OPTION_B_SHADOW_PIVOT_RESULT_20260705.md`. ★Foundation-side mint · FOUNDATION_SUBJECT_REF_SECRET · identity-touch = **폐기(deprecated·Option A relic)**. subject_ref = service-local mint(Foundation validate/gate only).]

> 작성: foundation-control(Control) · 2026-07-05 · **범위: M6-F execution 전 FOUNDATION-side implementation **package**(설계/실행 계획) — 실 구현 아님.**
> ★**gate package only. 실 구현 · M6-F execution · prod secret 주입 · subject_ref backfill · main merge = 각 별도 Leo 승인 전까지 미진행.** Restricted Actions List = source report 참조.
> ★역할: FOUNDATION Claude Code 단독 작업 중지(CLAUDE.md §2.5) → FOUNDATION 변경은 **control tower plan 경유**. 본 package = 그 plan.
> 근거(local 직독): design review(`02fe421`·W1~W6) · schema migration result(`b0f8685`·secret_version) · FOUNDATION `subject_identity.py`/`_factory.py`/`api.py`/`gate.py`(HEAD c9bb996) · SIASIU adapter/p3 · Cosmile de-anon.

---

## 1. Fact
- schema migration(dev) 완료 → SubjectRefMap `secret_version` 존재(양 서비스). 다음 = FOUNDATION-side 구현 설계(W1/W3/W4/W5 못박기 + identity-touch API·_factory furef·R9-1·R8-2·canonical furef).
- ★현재 코드(설계 출발점): `resolve_subject`(L67·require_furef_v2 param·L81 furef 아니면 ValueError)·`subject_ref_from_foundation_user_ref`(L92·furef→subject_ref)·`_is_production`(L50·**unknown→production·fail-safe**) · `_factory.make_candidate`(L30 raw local_user_ref·require_furef_v2 미설정·L32 echo)·`make_signal`(L55·L57 echo) · `api.resolve_subject`(L34·**L40 reason_codes:[str(e)]**) · `gate.py`(L64 reason_codes:[raw]) · SIASIU adapter furef=`SIASIU_MEMORY_CANDIDATE_SECRET` · 3 shadow 모듈 `_is_production` **unknown→dev(fail-permissive)**(W6).
- ★본 package = 설계·구현/execution/prod/backfill 미수행.

## 2. Implementation objectives
1. **identity-touch API**: 서비스 furef 전송 → Foundation subject_ref+secret_version 반환(stateless·no-retention).
2. **furef 입력화**: _factory/live entrypoint가 raw local_user_ref 대신 furef 수용(require_furef_v2=True).
3. **R9-1**: legacy local_user_ref echo 제거.
4. **W4**: reason_codes 상수 enum(api.py L40 + gate.py L64).
5. **canonical furef**: 단일 per-service FUREF secret+formula(candidate/auth/backfill 수렴·content-hash secret 분리).
6. **W1**: write-side atomicity(map 행=첫 memory row 동일 tx/이전 commit).
7. **W3**: canonical stable_id/furef 획득(인증 복귀 identity → 동일 stable_id → 동일 furef).
8. **W5**: identity-touch no-retention(비캐시·카운터 count/meta만·prod per-service secret 값 분리).
9. **W6**: fail-safe prod default(3 shadow 모듈 unknown→production).
- ★모두 **설계**·구현은 별도 execution.

## 3. Files likely impacted (구현 gate 대상·이번 미수정)
| repo | 파일 | 변경(설계) |
|---|---|---|
| FOUNDATION | `shared_memory/api.py` | identity-touch mint entrypoint(furef 입력·secret_version 반환)·reason_codes enum(L40) |
| FOUNDATION | `shared_memory/subject_identity.py` | 현 secret_version 노출(mint 반환)·이미 furef-capable |
| FOUNDATION | `shared_memory/_factory.py` | furef 입력(require_furef_v2)·local_user_ref echo 제거(L32/L57) |
| FOUNDATION | `shared_memory/gate.py` | reason_codes enum(L64 raw passthrough 제거) |
| FOUNDATION | (신규) `shared_memory/reason_codes.py` | REASON_CODES 상수 enum |
| SIASIU | `ssbrain/foundation_memory_candidate_adapter.py` | canonical `SIASIU_FUREF_SECRET`(furef 전용·content-hash secret 분리)·W6·identity-touch로 subject_ref 취득 |
| SIASIU | `ssbrain/foundation_p3_auth_shadow.py` | canonical furef(stable_id resolver)·W6 |
| Cosmile | `app/scripts/foundation-memory-deanon.mjs` | W6 fail-safe |
- ★FOUNDATION 변경 = control tower plan 경유·**단독 수정 금지**(CLAUDE.md §2.5).

## 4. API / identity-touch design
- **entrypoint(설계):** `FoundationSharedMemoryAPI.mint_subject_ref(source_service, furef_v2)` → `{subject_ref, secret_version, reason_codes}`. core = `subject_ref_from_foundation_user_ref`(furef→subject_ref·require_furef_v2=True·순수)·+ 현 `secret_version` 첨부.
  - (기존 `resolve_subject(source_service, local_user_ref)`는 raw 입력 → **memory 경로에서 furef 입력으로 전환**·raw 경로는 deprecate/차단.)
- **W5 no-retention(불변식):** ★Foundation은 furef·subject_ref를 **durable 저장/로깅 0**(request/trace 미영속)·mint 응답 **비캐시**·audit=count/meta만(값 제외). SubjectRefMap write는 **서비스**가 수행(service-local·secret_version 함께 저장).
- **per-service auth·namespace·rate-limit:** caller service 인증(service token)·자기 `<service>:` namespace furef만·rate-limit(bulk probing 방지). **oracle**: 결정론 mint = auth+rate-limit+furef 기밀성으로 contained(proof-of-derivation = 후속 hardening·지금 미요구).
- **secret_version:** `FOUNDATION_SUBJECT_REF_SECRET`에 version(예 `_V<n>`)·mint는 **현 version** 사용·반환. rotation 시 version++·서비스가 SubjectRefMap에 version별 행 기록(schema gate 마련 완료).

## 5. Canonical furef design (⑤·W3)
- **단일 per-service FUREF secret:** `FUREF_SECRET_<service>`(예 `SIASIU_FUREF_SECRET`·`COSMILE_FUREF_SECRET`) — candidate adapter·auth·backfill **전부 사용**. ★content_hash/candidate_id secret과 **분리**(2 변경: 생산자 수렴 AND secret 분리).
- **단일 formula:** `furef_v2 = "furef_v2_" + HMAC(FUREF_SECRET_<service>, "<service>:<subject_type>:<stable_id>")[:32]`.
- **W3 stable_id 획득:** ★인증 복귀 identity가 furef feed할 **동일 stable_id로 resolve**하는 canonical resolver 정의 — auth 로그인 → 서비스 canonical `local_user_ref`(stable_id) → furef. p3의 `phash_v2_`(email de-id)는 **furef 아님**(별개)·auth는 login→local_user_ref(stable_id) 매핑 후 canonical furef 파생.
- **불변식(W-1/2a):** furef unique service namespace 임베드 필수·furef space 서비스간 공유 금지·**per-service 상이 secret 값**(prod 값 분리 집행·W5).
- 마이그레이션(구현 gate): SIASIU adapter를 `SIASIU_MEMORY_CANDIDATE_SECRET`(furef 용도)→`SIASIU_FUREF_SECRET` 이전·shadow-only 영향 0.

## 6. W1/W3/W4/W5/W6 handling
| watch | 설계 처리 |
|---|---|
| **W1** write-side atomicity | 서비스 write 경로: (furef, version)의 SubjectRefMap 행을 **그 subject_ref 첫 memory row와 동일 tx 또는 그 이전 commit**. §3.6을 "필수 구현 불변식"으로·crash 시 orphan 0 보장. 구현 gate 테스트(§7). |
| **W3** canonical stable_id/furef | §5 canonical resolver(login→stable_id→furef)·furef secret 분리. FOUNDATION impl gate 선결. |
| **W4** reason_codes enum | `reason_codes.py` REASON_CODES 상수 집합·api.py L40 `[str(e)]`→매핑 코드·gate.py L64 `[raw]`→코드(has_raw_or_pii field-name도 코드화). 예외/raw passthrough 0. |
| **W5** no-retention | §4 불변식(비캐시·카운터 count/meta·값 미저장/미로깅)·prod per-service secret 값 분리 집행. assertable 테스트. |
| **W6** fail-safe prod default | 3 shadow 모듈 `_is_production`/`_isProduction`: unknown/unset env → **production**(FOUNDATION subject_identity 방식)·비표준 env가 dev fallback silent 방지. |

## 7. Tests / validation plan (구현 gate에서·raw/PII 0)
- **identity-touch API:** stateless(store 접근 0)·**no-retention assert**(furef/subject_ref durable 미저장·카운터 count-only)·per-service auth·namespace 위반 reject·rate-limit·oracle(rate 초과 차단).
- **canonical furef:** ★**cross-producer equality** — candidate·auth·backfill 경로가 동일 사용자에 **동일 furef → 동일 subject_ref**(split-brain 0).
- **W1 atomicity:** map 행이 첫 memory row와 동일 tx/이전 commit·crash 시뮬 후 orphan 0.
- **R9-1:** _factory 산출 dict에 local_user_ref 부재.
- **W4:** reason_codes가 예외 문자열/raw 미포함(enum만).
- **W6:** unknown env → fail-closed(secret 미설정 시 raise).
- **회귀:** fingerprint d7f579443f8a110a·integration 39/39·workflow 119/119·readiness 164/164·loop 112/112·gate 57/57·runner(추가감소 0).

## 8. Rollback plan
- FOUNDATION/서비스 변경 = **shadow 브랜치**·revert·main 무영향(미merge).
- identity-touch API·furef 전환 = **feature flag(default OFF·inert)** 뒤 → OFF면 기존 경로 유지·kill-switch.
- ★prod/데이터 변경 0·rollback = flag OFF 또는 branch revert. subject_ref 값 변경 0(mint 함수 동일·version 첨부만).

## 9. Execution boundary
> **[이 gate = package]** FOUNDATION-side 구현 **설계/계획**. ★실 구현·M6-F execution·prod secret·backfill·main merge 미승인.
> **[승인 시 구현 execution(별도·control tower plan 경유)]** shadow 브랜치 구현 + 테스트(§7)·flag default OFF·prod 0·데이터 0.
> **[금지 유지]** M6-F execution · prod secret 주입 · subject_ref backfill · prod DB · live · hard reject · **main merge** · raw/PII/실 secret 값 출력.

## 10. Next action
- Leo 판단: ① 본 package 승인 → **FOUNDATION impl execution gate**(shadow 구현+테스트·flag OFF·별도 승인) ② W6 fail-safe는 경량 shadow patch로 선행 가능.
- 순서(각 별도 Leo 승인): **FOUNDATION impl execution**(shadow·flag OFF) → 재검수 → **M6-F execution gate**(prod secret·backfill).
- ★**M6-F execution(prod secret·backfill)은 계속 닫힘.**

## 무결성
FOUNDATION implementation **gate package**(설계/계획) only · 실 구현 0 · M6-F execution 0 · prod secret 주입 0 · subject_ref backfill 0 · prod DB 0 · live 0 · hard reject 0 · **main merge 0**(siasiu 3cd068d·cosmile 3ba91e0·FOUNDATION c9bb996) · 코드/DB 변경 0 · raw/PII/실 secret 값 출력 0 · FOUNDATION 단독 수정 0(control tower plan) · 본 package만 foundation-docs commit/push · **실 구현·M6-F execution·prod secret·backfill은 각 별도 Leo 승인.**
