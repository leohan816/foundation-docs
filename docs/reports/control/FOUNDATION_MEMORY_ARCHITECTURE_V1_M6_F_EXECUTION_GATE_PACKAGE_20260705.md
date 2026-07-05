# Memory V1 — M6-F Execution Gate Package (prod secret / subject_ref backfill · plan-only)

> ★[OPTION A — Option B pivot(shadow FOUNDATION `5a0003c` / SIASIU `d0f51cb` · docs `1e24c33`)로 **SUPERSEDED**. 정본: `..._M6_F_OPTION_B_SUBJECT_REF_CONTRACT_20260705.md` · `..._OPTION_B_SHADOW_PIVOT_RESULT_20260705.md`. ★Foundation-side mint · FOUNDATION_SUBJECT_REF_SECRET · identity-touch = **폐기(deprecated·Option A relic)**. subject_ref = service-local mint(Foundation validate/gate only).]

> 작성: foundation-control(Control) · 2026-07-05 · **범위: M6-F execution(prod secret 주입 + subject_ref backfill) **package/계획** — 실행 아님.**
> ★**plan-only. prod secret 주입 · subject_ref backfill 실행 · prod DB 접근 · live enable · main merge = 각 별도 Leo 승인 전까지 미수행.** Restricted Actions List = source report 참조.
> 근거(local): impl review(`088613a`·APPROVE_WITH_WATCH) · schema migration result(`b0f8685`·secret_version) · FOUNDATION impl result(`0687404`·flag OFF) · design review(`02fe421`·W1~W6).

---

## 1. Fact
- M6-F 상태: design gate·schema migration(dev·secret_version)·FOUNDATION impl(shadow·flag OFF)·impl review = **전부 PASS/PASS_WITH_WATCH.** 남은 = **execution(prod secret + backfill)** — 본 package는 그 **계획**.
- ★prod secret 주입·subject_ref backfill·prod DB·live·main merge = **미수행**(본 package = plan-only).

## 2. Current state
- **schema:** dev SubjectRefMap `secret_version`(양 서비스·additive·version당 map row 구조 검증됨).
- **code(shadow·flag OFF):** identity-touch mint(no-retention·enum·flag OFF inert)·canonical furef(candidate=auth·secret 분리)·W1 atomicity·W6 fail-safe. main HEADs 무변경(fnd 580093c·siasiu 3cd068d·cosmile 3ba91e0).
- **data:** subject_ref = **NULL 유지**(M4)·prod secret 미주입·dev fallback만.

## 3. Preflight requirements (execution 전 필수·이 package는 정의만)
1. **independent test rerun:** 전 suite(FOUNDATION 41/29/16·SIASIU 31/16/27·integration 39·workflow 119·Cosmile 14/10·readiness 164·loop 112·gate 57)를 **독립 재실행**(impl review watch 2). count/boolean만.
2. **runner 83/89 vs 89/89 baseline decision:** §8 참조 — **결정 문서화 필수**(runner-fix train 별도 vs execution watch carry).
3. **identity-touch flag OFF 확인:** `shared_memory_v0_shadow` default OFF·mint inert.
4. **no-retention / enum guard / fail-safe 재확인:** _MINT_AUDIT count-only·RC.code(api+gate)·_is_production unknown→prod.
5. **furef 획득 가능성(⑦·W3):** ★backfill 대상 각 row의 furef 복구 경로 확정(local_user_ref_hash가 furef_v2인지·아니면 raw stable_id→canonical_furef_v2 재계산). **복구 불가 row = abort/skip**(§5).

## 4. Prod secret plan (★주입 실행 0·계획)
- **주입 대상 secret:**
  - `FOUNDATION_SUBJECT_REF_SECRET`(Foundation·subj_v2 mint) + `FOUNDATION_SUBJECT_REF_SECRET_VERSION`(=1 기준).
  - per-service FUREF secret: `SIASIU_FUREF_SECRET`·`COSMILE_FUREF_SECRET`(furef 파생·content-hash secret과 분리).
  - content/auth secret: `SIASIU_MEMORY_CANDIDATE_SECRET`·`SIASIU_P3_AUTH_SECRET`·`COSMILE_MEMORY_SECRET`.
- **주입 방식:** env/Vault 주입(★하드코딩/커밋 금지)·out-of-band·secret 값 로그/출력 0.
- **service별 값 분리 확인(2a):** ★per-service secret **값**이 서로 다름(env명만 다른 게 아니라 값 분리)·주입 후 **분리 assert**(값 미출력·hash 비교 boolean).
- **dev fallback 차단 확인(W6):** prod 환경에서 env secret 미설정 시 **fail-closed**(dev fallback 도달 0)·`_is_production()`=True·주입 후 각 모듈이 env secret 사용(dev fallback 문자열 미사용) 확인(boolean).
- **rotation:** secret_version=1 시작·rotation은 **live rotation gate**(별도)·이 execution은 v1 단일.

## 5. Backfill plan (★backfill 실행 0·계획)
- **대상:** memory row `subject_ref=NULL`(M4 유지) 중 **furef 보유(복구 가능) row만.**
- **guest-only 제외(③):** `local_user_ref_hash`(furef) 부재·`guest_ref`-only row = **backfill 대상 아님**(NULL 정상·COALESCE subject_key). partial index가 이미 guest 제외.
- **missing furef abort/skip(W3):** furef 복구 불가 row(furef 없음/malformed) → **skip + 보고**(count)·또는 임계 초과 시 **abort**. silent 진행 금지.
- **idempotency:** 이미 `subject_ref` non-NULL row = **skip**(재실행 동일 결과·재계산 0).
- **단일 NULL→subject_ref fill:** furef → identity-touch mint(`subject_ref_from_foundation_user_ref`) → `subject_ref` + `secret_version=1`. **기존 값 재계산 금지**(re-keying 0).
- **W1 atomicity:** 각 backfill row에 대해 `write_subject_ref_map_atomic`(SubjectRefMap 행 = 첫 memory 갱신과 동일 tx·부분실패 rollback·orphan 0).
- **evidence:** 전후 NULL count·backfill count·skip/abort count·checksum(기존 non-NULL 무변경)·**raw/PII/실 secret 값 0**(count/hash/boolean만).

## 6. Validation plan (EXEC-1 패턴)
- **선행:** WAL-safe backup·PRAGMA integrity_check·전후 row count/checksum 기록.
- **backfill 검증:** ① 기존 non-NULL subject_ref **무변경**(checksum) ② NULL→fill count = 대상 count ③ guest-only **미변경**(NULL 유지) ④ missing-furef skip/abort count 보고 ⑤ **재실행 idempotent**(2회차 fill=0) ⑥ SubjectRefMap version당 행 구조(§schema) ⑦ W1 orphan 0.
- **secret 검증:** per-service 값 분리 boolean·dev fallback 미도달 boolean·flag OFF 유지.
- ★**dev/staging 선검증 → prod은 최종 별도 승인:** backfill을 **dev DB(EXEC-1 패턴)에서 먼저 전량 검증** 후, **실 prod DB backfill은 별도 최종 Leo 승인**(prod DB 접근 = 그 gate). 본 package·이 execution 단계는 prod DB 미접근.

## 7. Rollback plan
- **backup:** 대상 DB WAL-safe backup(prod backfill 전 필수)·artifact 보존.
- **restore rehearsal:** backup→restore·integrity·pre-state 일치·subject_ref NULL 복귀 확인.
- **partial failure rollback:** backfill tx 부분실패 → rollback(W1 atomic·map+memory 함께)·orphan 0.
- **evidence:** count/hash/boolean only·raw/PII/실 secret 값 0.
- ★`prisma migrate reset`/`db push --accept-data-loss` 금지·rollback = backup 복원.

## 8. Runner/test baseline handling (★decision 문서화)
- **현상:** runner **83/89**(6 fail `{lmr 5, brain 1}`)·CLAUDE.md §3 baseline **89/89**. 원인(FU-3 추적) = FOUNDATION `c9bb996`(subject_ref v2 hard gate·subject_identity 변경)의 lmr/brain 간접 영향·89/89는 c9bb996 **이전** baseline·**memory batch/identity 표면 무관**.
- **★Control 결정 권고:** **(a) runner-fix train = 별도 gate**로 분리(FOUNDATION lmr/brain ↔ subject_ref v2 정합·별도 승인) + **(b) 이 execution gate는 83/89를 documented watch로 carry**(backfill은 identity/memory row 대상·lmr/brain 미접촉·비-blocker). ★단 **full production live enable 전에는 runner 89/89 회복 필수**(runner-fix train PASS 선결).
- **preflight:** execution 직전 runner 재실행·taxonomy 동일(83/89·{lmr 5, brain 1}) 확인·추가 감소 0 = 진행 가능·delta 변화 시 STOP.

## 9. Boundary
> **[이 package = plan-only]** prod secret plan + backfill plan + validation/rollback plan. ★prod secret 주입·backfill 실행·prod DB·live·main merge 미승인.
> **[execution(별도 Leo 승인·순차)]** ① dev/staging backfill 검증(EXEC-1) ② prod secret 주입(env/vault) ③ prod DB backfill(최종 별도 승인).
> **[금지 유지]** prod secret 주입 · subject_ref backfill 실행 · prod DB 접근 · live enable · hard reject · main merge · schema code main merge · raw/PII/실 secret 값 출력 · `prisma migrate reset`/`db push`.

## 10. Next action
- Leo 판단: ① 본 execution gate package 승인 여부 ② **runner baseline decision**(runner-fix train 별도 + 83/89 watch carry) 확정 ③ 승인 시 **dev/staging backfill 검증 execution**(EXEC-1·prod DB 0) → 이후 prod secret 주입·prod backfill 각 **별도 최종 승인**.
- ★**prod secret 주입·subject_ref backfill 실행은 별도 Leo 승인 전까지 미수행**·execution gate 계속 닫힘.

## 무결성
M6-F execution gate **package(plan-only)** · prod secret 주입 0 · subject_ref backfill 실행 0 · prod DB 접근 0 · live 0 · hard reject 0 · **main merge 0**(fnd 580093c·siasiu 3cd068d·cosmile 3ba91e0) · 코드/DB 변경 0 · raw/PII/실 secret 값 출력 0 · 본 package만 foundation-docs commit/push · **prod secret 주입·backfill·live·main merge는 각 별도 Leo 승인.**
