# Memory V1 — M6-F FOUNDATION Implementation Review (read-only·local source)

> ★[OPTION A — Option B pivot(shadow FOUNDATION `5a0003c` / SIASIU `d0f51cb` · docs `1e24c33`)로 **SUPERSEDED**. 정본: `..._M6_F_OPTION_B_SUBJECT_REF_CONTRACT_20260705.md` · `..._OPTION_B_SHADOW_PIVOT_RESULT_20260705.md`. ★Foundation-side mint · FOUNDATION_SUBJECT_REF_SECRET · identity-touch = **폐기(deprecated·Option A relic)**. subject_ref = service-local mint(Foundation validate/gate only).]

> 기록: foundation-control(Control) · 2026-07-05 · **성격: Control-invoke 독립 implementation review(Claude 검수 에이전트·read-only·adversarial·1회).**
> ★정직 라벨: Control-invoke 독립 Claude review(외부 Fable5 GPT/ChatGPT와 별개). ★**handoff = local filesystem 직독만**(GitHub URL/remote fetch/web/pasted 0·HEAD provenance).
> ★read-only: M6-F execution · prod secret 주입 · subject_ref backfill · main merge = **미승인·미수행.** Restricted Actions List = source report 참조.
> 대상(local·provenance HEAD): 결과 문서(`0687404`) ↔ 실코드(FOUNDATION `df9f6cc`·SIASIU `13012c4`·Cosmile `801924d`).

---

## 1. Verdict: **APPROVE_WITH_WATCH**
identity/secret gate 구현이 **실 local 코드와 일치**·flag OFF에서 inert·mint 경로 no-retention 보장·cross-producer furef equality 실재·W1/W4/W6/R9-1 동작. watch는 문서 line-number 부정확 + identity 표면 밖 test-count delta(runner 89 vs 83) 미조정. **security blocker 없음**·닫힌 M6-F execution gate 경계 온전.

## 2. Source integrity
- ★**Linux local filesystem만 직독**(MISSING_LOCAL_FILE 없음). provenance HEAD **정확 일치**: foundation-docs `0687404`·FOUNDATION `df9f6cc`(shadow/foundation-shared-memory-v0)·SIASIU `13012c4`(shadow/m4-siasiu-memory)·Cosmile `801924d`(shadow/m4-cosmile-memory).
- ★**main HEADs 무변경**(문서 §9와 일치): FOUNDATION main `580093c`·SIASIU main `3cd068d`·Cosmile main `3ba91e0`. 현재 checkout=shadow 브랜치(main 아님). HEAD=provenance only.

## 3. Implementation/code consistency (focus 1)
- 문서 §3/§7 **전 claim이 코드로 뒷받침**: reason_codes.py(W4 enum·category allow-list·else cannot_determine)·api.py(mint flag-gated + _MINT_AUDIT count-only + resolve_subject enum guard)·subject_identity(current_secret_version·_is_production fail-safe)·_factory(_to_furef·R9-1 echo 제거)·gate.py(category codes + block enum guard)·contract(CONTRACT_FIELDS `furef_v2`·not local_user_ref·L12-17)·SIASIU/Cosmile 전부 기술대로.
- **minor doc-vs-code 부정확(non-material·watch):** 문서 §7 "api.py L40"→실제 `RC.code(str(e))`는 **L46(resolve_subject)·L63(mint)** · "gate.py L64"→실제 **L65**(off-by-one) · SIASIU adapter candidate에 `raw_text_hash`(L154·hash·raw 아님·additive·harmless)가 FOUNDATION CONTRACT_FIELDS 밖.

## 4. Feature flag / inertness review (focus 2)
- ✅ `contract.FLAGS={"shared_memory_v0_shadow": False}`(default OFF)·`mint_subject_ref`가 `C.flag_enabled()` 먼저 확인→OFF면 `_disabled()`. 실증: flag OFF → `{status:disabled·reason_codes:[feature_flag_off]·applied_to_real_user=False·write_live=False}`. ★**_MINT_AUDIT는 flag OFF 시 증가조차 안 함**(counter가 gate 뒤)·`_MINT_AUDIT=={}` 확인.

## 5. Identity-touch / no-retention review (focus 3, 4)
- ✅ **no-retention 실재:** `mint_subject_ref`는 flag gate 후 `_MINT_AUDIT[svc]=count+1`(정수만)·`subject_ref_from_foundation_user_ref` 호출·값 반환 — **furef/subject_ref 저장·로깅 0**. ★**adversarial sweep(shared_memory/ 전체):** print/json.dump/open은 tests/·eval.py에만·**mint 경로에 없음**. store.py `memory_db_created=False`·open/sqlite/write 0·mint 경로는 self.store 미접촉. **비캐시**(매 호출 재계산). 실증: 4회 mint 후 `_MINT_AUDIT=={'siasiu':4}`(per-service count·furef/subject_ref 값 0). SubjectRefMap 영속=service-local(서비스)·Foundation-side 아님.

## 6. Canonical furef review (focus 5)
- ✅ **equality 실재:** adapter(L110)·p3(L38) 모두 `"furef_v2_"+HMAC(_FUREF_SECRET,"siasiu:local_user:"+ref)[:32]`. **formula IDENTICAL·dev-fallback 문자열 IDENTICAL**(값 미출력). 둘 다 `_FUREF_SECRET`을 `_SECRET`/`_P3_AUTH_SECRET`과 **분리** 로드. 실증: `adapter.canonical_furef_v2(ref)==p3.canonical_furef_v2(ref)`(True)·다른 ref→다른 furef(True). **split-brain 없음.**

## 7. W1/W3/W4/W5/W6 review (focus 6, 7, 8, 9)
- **W1 atomicity — REAL:** `write_subject_ref_map_atomic`=map insert→memory_write→commit·except→rollback·raise. 실증: 성공 map1/mem1·주입 실패 map0/mem0(orphan 불가). ordering(map 먼저·같은 tx) 정확.
- **W3:** cross-producer equality + FUREF secret 분리 확인(§6)·auth는 stable local_user_ref→canonical_furef_v2·phash_v2_(email de-id)는 별개 namespace.
- **W4:** api.py 예외-str 사이트(L44/46·L61/63) `RC.code`·gate.py block(L65) `RC.code` — **양쪽 적용**. 실증: `RC.code("email=leak... raw body")=="cannot_determine"`·known category(raw_text_present)는 통과. has_raw_or_pii category-only(field name/value 없음).
- **W5:** no-retention(§5)·audit count-only.
- **W6:** 3 shadow 모듈 + FOUNDATION subject_identity 전부 fail-safe. unknown/unset env→production. 실증: FOUNDATION `_is_production()`(unknown)=True·prod+secret 없음→`SubjectRefSecretMissing` raise·SIASIU `_load_secret` prod/unknown+env 없음→RuntimeError·dev fallback은 명시 dev/test/local/shadow만·Cosmile 동일 allow-list.
- **R9-1:** _factory make_candidate/make_signal 출력에 `furef_v2` 있고 `local_user_ref` **없음**·CONTRACT_FIELDS `furef_v2`. SIASIU adapter candidate 실증: furef_v2·local_user_ref 없음·subject_ref=None.

## 8. Remaining blockers / watch (focus 10 경계 포함)
- ★**경계(focus 10) 확인 — 여전히 미수행:** main HEADs 3 repo 무변경·shadow 브랜치만·코드에 prod secret 없음(dev fallback + env 주입·fail-closed)·backfill 미실행(`write_subject_ref_map_atomic`는 caller conn만·테스트 `:memory:`·create_schema DDL caller-gated)·하드코딩 prod salt/secret 0. **security blocker 없음.**
- **watch:**
  1. ★**test-count 조정(notable):** 문서 §8 runner **83/89**(6 fail `{lmr 5, brain 1}` "M6-F 무관")·CLAUDE.md §3 baseline은 **89/89 all_pass**. 이 **6-test delta가 문서에서 미조정**·검수자는 runner 미재실행. shared_memory/identity 표면 **밖**(LMR/brain)이나 **M6-F execution gate 전 조정 권고**. (Control note: FU-3에서 원인=FOUNDATION `c9bb996` subject_ref hard gate로 추적·memory batch 무관·89/89는 c9bb996 이전 baseline. runner-fix train 별도.)
  2. **test counts 독립 재실행 안 함:** 검수자는 코드 대조 + throwaway 순수함수 확인만·전 suite 수치(41/31/16/39/119/14/10/164/112)는 구현자 claim.
  3. doc line-number 부정확(§3·cosmetic).
  4. `_MINT_AUDIT` per-process 무한 증가(count-only·PII 0·cosmetic)·live transport는 per-service auth/rate-limit(문서 §5가 별도 live-wiring gate로 flag) 필요.
  5. SIASIU adapter `raw_text_hash`(hash·additive·harmless).

## 9. Final recommendation
M6-F FOUNDATION 구현(identity/secret 표면)은 **닫힌 M6-F execution gate로 진행 sound** — 단 (watch 1) runner 89 vs 83 baseline **Leo 승인 조정** + (watch 2) claim test 수치 **독립 재실행**을 다음 review/execution gate에서. flag default-OFF inertness·mint no-retention·canonical furef equality·W1/W4/W6/R9-1 = **실 local 코드+실증 검증 완료**. **APPROVE_WITH_WATCH** 권고·prod-secret 주입·subject_ref backfill·live 배선(flag ON)·main merge = 각 별도 닫힌 gate 유지.

## 무결성(기록)
Control-invoke 독립 impl review verdict faithful 기록 · read-only(코드 변경 0) · local filesystem 직독만(remote/web/GitHub URL 0) · M6-F execution 0 · prod secret 0 · backfill 0 · **main merge 0**(fnd 580093c·siasiu 3cd068d·cosmile 3ba91e0) · 실 secret 값/raw/PII 출력 0 · 본 review만 foundation-docs commit/push · **runner baseline 조정·M6-F execution·prod secret·backfill은 각 별도 Leo 승인.**
