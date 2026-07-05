# Memory V1 — M6 Runner Meaning Audit (6 failures · read-only)

> 작성: foundation-control(Control) · 2026-07-05 · **범위: runner 83/89 실패 6개의 **의미 감사**(read-only·코드/기대값/skip 미수정). 89/89 회복이 목적 아님.**
> ★핵심 정정: 실패 원인은 **c9bb996 subject_ref v2도 Option B pivot도 아니다** — `app/data/memory.db` 파일 존재. 제 이전 FU-3/runner-fix-train의 c9bb996 attribution은 **틀렸다**(정직 정정).
> 근거(local·직접 검증): 6 테스트 실행 · `verify_app_data_clean` · `app/brain.py` · lmr eval grep · runner 재확인.

---

## 1. Fact
- runner **83/89**(taxonomy {lmr 5, brain 1}). 조사 결과 6 실패는 **단일 근본원인**: `app/data/memory.db`(118KB·mtime 07-05 09:02) 파일 존재.
- `verify_app_data_clean()` = `{ok: False, memory_db_present: True, files: [checkin_pool, events.jsonl, llm_usage.jsonl, logins.txt, memory.db, ssbrain.sqlite, -shm, -wal]}` → **2 누적 케이스**(`h28`·`p07_app_data_clean`) 실패 → 6 테스트로 fan-out.
- ★**직접 검증**: memory.db 존재·guard ok=False·lmr 5 eval의 subject_ref/SubjectMint 참조 **0**·`app/brain.py:16` `DB_PATH=.../memory.db`·L63 `sqlite3.connect`.

## 2. Failed test inventory
| 테스트 | 실패 assertion | 기대→실제 | 예외/원인 |
|---|---|---|---|
| learning_memory_reuse_hardening_loop | #2 fail==0·#4 taxonomy=={}·#6 2회 stable(fail 0) | 0→2·{}→{memory_db_created:2} | h28+p07(memory.db) |
| lmr_m6_shadow_loop | #2 fail==0·#6 run_m6_eval fail==0 | 0→2·0→1 | p07(memory.db·m6 필터) |
| lmr_api_contract_loop | #2 fail==0 | 0→2 | h28+p07(누적)·api 계약 자체 green |
| lmr_release_candidate | #2 fail==0 | 0→2 | 동일·migration 케이스 green |
| lmr_v1_final_loop | #2 fail==0 | 0→2 | 동일·v1 gates green |
| foundation_brain_runtime_e2e | #2 combined fail==0·#3 lmr_regression_preserved | 0→2·True→False | LMR 부분에 h28+p07·brain 30 자체 green |
- ★모든 실패 assertion = `fail==0` 위반(누적 eval에 h28+p07 2건)·**subject_ref/SubjectMintDeprecated/subj_v2_ 불일치 0**(grep+실행 확인).

## 3. What each test is supposed to protect
- **hardening_loop**: LMR core가 memory.db를 **생성/의존하지 않는다**(app/data=ssbrain-only·LMR은 JSONL/in-memory shadow).
- **m6_shadow_loop**: M6 shadow 결정 gate가 write/promotion·memory.db 부작용 0으로 실행.
- **api_contract_loop**: LMR shadow API 계약(read-only·dry-run·write-endpoint/memory.db/live reject·raw/write/promotion 0).
- **release_candidate**: RC/migration-rehearsal gate(namespace import·no live/write/promotion·human-approval).
- **v1_final_loop**: v1.0 freeze(doc/artifact integrity·real namespace importability·secret-scan·boundary·human-gate).
- **brain_runtime_e2e**: Brain answer-safety(user_text 불변·cross-customer/deleted memory 재사용 0·unsupported grounding 0) + LMR 514 regression 합성.

## 4. Failure classification
| 테스트 | 분류 |
|---|---|
| 6개 전부 | **VALID_FAILURE_KEEP_AS_WATCH** (guard가 실 invariant 위반을 정확히 surfacing) |
| **전체 resolution** | **BLOCKED_BY_ARCHITECTURE_DECISION** (memory.db 허용/금지 = Leo/control-tower 결정) |
- ★어느 것도 **EXPECTATION_DRIFT/REAL_BUG(logic)/TEST_DESIGN_WEAK 아님**(테스트 목적 유효·LMR/Brain logic green).

## 5. Real bugs, if any
- **LMR/Brain logic 버그 = 0.** LMR path-refusal(`h27`·`h27b`: memory.db/ssbrain.sqlite write 경로 거부)·Brain safety invariant(user_text/cross-customer/deleted/grounding)·M6 write/promotion 0 = **전부 PASS**.
- ★단 **실 architecture 위반 존재**: `app/data/memory.db`가 Foundation LMR 계층과 공존 = "app/data=ssbrain-only·memory.db=0" invariant(CLAUDE.md §4/§8) 위반. **guard가 제 역할**을 하는 것이지 red mark가 아니다.

## 6. Test drift, if any
- ★**c9bb996 subject_ref / Option B expectation drift = 0**(grep+실행 확인). 6 실패 어디에도 subject_ref 관여 없음.
- ★제 이전 진단 정정: **FU-3·execution gate package §8·runner-fix train**이 6 실패를 "c9bb996 subject_ref v2 hard gate 간접 영향"으로 표기했으나 — **틀렸다.** 실 원인 = `app/data/memory.db` 파일 상태. subject_ref framing은 wrong-question이었고, subject_ref 기대값을 고치면 엉뚱한 증상을 치료하는 셈.
- (design caveat·green-chase 아님) `verify_app_data_clean`은 공유 dir 상태를 "LMR이 memory.db 생성했나"의 proxy로 사용 → **다른 모듈(brain.py)이 memory.db 생성해도 fire**. 세밀한 attribution 원하면 TEST_DESIGN 개선이나, "no memory.db" 하드 invariant는 **유지 필수**·근본 해결 = 파일 제거/격리(guard 완화 아님).

## 7. Architecture decision dependency
- ★**핵심 충돌:** memory.db는 (a) legacy `app/brain.py`(customer memory sqlite)와 (b) **Leo-승인 Memory Architecture V1 arc**(EXEC-1 shadow 테이블·schema migration)가 **둘 다** 쓴다. 반면 LMR runner invariant = "app/data memory.db 0". → **memory.db 허용(memory arc) vs 금지(LMR guard/§4)**가 상충 = **architecture 결정**.
- 결정 옵션(Leo): ① memory arc가 별도 DB/경로 사용(app/data 밖) ② LMR guard가 승인된 memory shadow를 예외 인정(단 "unapproved memory.db creation" invariant 유지) ③ memory.db 격리/이전. ★어느 것도 **guard를 무력화하지 않음**.
- ★**금지 유지**: memory.db **blind rm 금지**(§4·brain.py 의존·EXEC-1 데이터). 삭제/격리 = 별도 승인.

## 8. Recommended next action
1. ★**89/89 강제 회복 시도 금지**(subject_ref 기대값 조작·guard 완화·skip = 전부 금지·wrong symptom).
2. **Leo architecture 결정 요청**: memory.db(memory arc·legacy brain.py) vs LMR "no memory.db" invariant 조율 방침.
3. 결정 후: memory arc DB 경로 정본화 또는 guard 예외 정의(승인 기준)·memory.db 격리(별도 승인·§4).
4. **runner-fix train 정정**: 원인=memory.db(아키텍처)이지 subject_ref 아님 → runner-fix train 문서를 이 audit 기준으로 재정의.
5. ★live enable 전 89/89 = 여전히 선결이나, **회복 경로 = 아키텍처 결정**(테스트 조작 아님).

## 9. What must not be changed just to make tests pass
- ★**"app/data=ssbrain-only·승인 없는 memory.db 생성/접근 0"**(CLAUDE.md §4/§8) invariant — 완화 금지.
- ★LMR code-level path-refusal(h27/h27b·memory.db write 거부) — 유지.
- ★Brain answer-safety invariant(user_text/cross-customer/deleted/grounding) — 유지.
- ★subject_ref 기대값을 이 실패 때문에 바꾸지 말 것(무관·wrong symptom).
- ★guard `verify_app_data_clean`의 "no memory.db" 판정 — skip/기대값 조작 금지.

## 무결성
Runner Meaning Audit(read-only) · 코드/테스트/기대값 수정 0 · skip/xfail 0 · snapshot 갱신 0 · 실 secret/raw/PII 출력 0 · prod DB 0 · live 0 · main merge 0 · ★이전 c9bb996 attribution 정직 정정(실 원인=memory.db) · memory.db blind rm 0(별도 승인) · 본 audit만 foundation-docs commit/push · **memory.db 아키텍처 조율·격리는 Leo 별도 결정.**
