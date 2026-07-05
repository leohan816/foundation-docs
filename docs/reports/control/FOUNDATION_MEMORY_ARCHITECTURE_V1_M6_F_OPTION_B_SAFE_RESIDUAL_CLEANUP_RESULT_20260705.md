# Memory V1 — M6-F Option B Safe Residual Cleanup Result (R-1 · R-2)

> 작성: foundation-control(Control) · 2026-07-05 · **범위: safe cleanup batch — R-1 SubjectRefSecretMissing 제거(FOUNDATION shadow) + R-2 SIASIU ENV policy sync.**
> ★Hard Stop 무접촉: 실 secret 0 · Vault write 0 · prod DB 0 · live 0 · hard reject 0 · main merge 0 · Cosmile subject mint 미구현 · runner-fix 미수정.
> 근거(local): residual cleanup plan(`fc0a289`) · FOUNDATION/SIASIU 실코드.

---

## 1. Fact
- R-1(SubjectRefSecretMissing relic 제거·FOUNDATION shadow) + R-2(SIASIU ENV policy Option B sync) 완료. 큰 설계 결정 없이 safe cleanup.
- ★R-3(Cosmile subject mint)·R-4(runner-fix)·ops SUBJECT_SECRET injection = 각 별도 gate/train/Hard Stop 전 단계로 유지.

## 2. Files changed
| repo | 파일 | 변경 |
|---|---|---|
| FOUNDATION `225e25c`(shadow) | `subject_identity.py` | `SubjectRefSecretMissing` class 제거 |
| | `__init__.py` | import/`__all__`에서 제거·`is_subject_ref_v2`/`validate_subject_ref`/`SubjectMintDeprecated` export |
| SIASIU `4848ad9`(shadow) | `docs/security/ENV_AND_MIGRATION_POLICY.md` | `SIASIU_FUREF_SECRET` 추가 + FOUNDATION_USER_REF_SECRET reconciliation watch(key 이름만·값 0) |
| foundation-docs | 본 result + status §0 갱신 + SIASIU security mirror(secret-free) | |
- ★main merge 0(fnd 580093c·siasiu 3cd068d·cosmile 3ba91e0). SIASIU concurrent 세션 파일(4건) 무접촉.

## 3. R-1 result (SubjectRefSecretMissing relic 제거)
- **active dependency 재확인:** raise/except **0**·사용 = `__init__.py` import/export만 → 제거.
- **제거:** subject_identity `class SubjectRefSecretMissing` 삭제·`__init__.py` import + `__all__` 제거.
- **검증:** `from ... import SubjectRefSecretMissing` → **ImportError**(제거 확인). Option B 심볼(is_subject_ref_v2·validate_subject_ref·SubjectMintDeprecated) export OK.
- ★**Foundation mint/identity-touch 재도입 0**: resolve_subject HMAC mint=0·mint_subject_ref=0(deprecated stub 유지).

## 4. R-2 result (SIASIU ENV policy sync)
- SIASIU `docs/security/ENV_AND_MIGRATION_POLICY.md`에 **5 Option B 키 전부 존재**(✓×5): `SIASIU_SUBJECT_SECRET`·`SIASIU_SUBJECT_SECRET_VERSION`·`SIASIU_FUREF_SECRET`(신규 추가)·`SIASIU_MEMORY_CANDIDATE_SECRET`·`SIASIU_P3_AUTH_SECRET`. **실 값 0**(key 이름/설명만).
- ★**watch(reconciliation):** adapter 코드는 furef를 `SIASIU_FUREF_SECRET`으로·기존 문서는 `FOUNDATION_USER_REF_SECRET`(CUTOVER-01)로 표기 → 두 furef secret 이름 정합은 **별도 확정**(코드↔env·별도 승인). 현재 adapter 정본 = `SIASIU_FUREF_SECRET`.
- ★concurrent SIASIU 세션(`793b6ba`·SIASIU docs/security 생성)이 내 `4848ad9`의 **부모**·fast-forward·force push 0·data loss 0.

## 5. Tests / verification
| 항목 | 결과 |
|---|---|
| FOUNDATION shared_memory | **41/41** |
| FOUNDATION hard_gate(Option B contract) | **21/21** |
| FOUNDATION eval | **16/16** |
| import/export(Option B 심볼 export·SubjectRefSecretMissing ImportError) | **PASS** |
| SIASIU docs-only 검증(5 키·값 0) | **PASS** |
| Foundation mint/identity-touch 재도입 | **0** |

## 6. Security scan
- FOUNDATION 코드 diff·SIASIU ENV policy·본 result: **실 secret 값 0**·raw/PII 0·`.env.example` key 이름/설명만.

## 7. Self-review
- [x] R-1 active dep 0 재확인·제거·Foundation mint/identity-touch 재도입 0
- [x] R-2 5 Option B 키·실 값 0·reconciliation watch 표기
- [x] FOUNDATION 테스트 41/21/16 PASS·import/export 정합
- [x] concurrent 세션 파일 무접촉·force push 0
- [x] 실 secret 0·raw/PII 0·prod DB 0·live 0·main merge 0
- [x] Cosmile subject mint 미구현·runner-fix 미수정(별도)

## 8. Remaining separate gates
- **R-3 Cosmile subject_ref mint**: 별도 gate(현재 미필요·미배선·blocker 아님).
- **R-4 runner-fix train**: 별도 train(live enable 전 89/89 필수).
- **ops per-service SUBJECT_SECRET injection**: ops/Leo(실 Vault write=Hard Stop 전 단계).
- **furef secret 이름 정합**(SIASIU_FUREF_SECRET vs FOUNDATION_USER_REF_SECRET): 별도 확정.
- **Hard Stops**: 실 Vault write·prod DB backfill·live enable·hard reject·main merge·prod secret rotation·cross-service linkage.

## 9. Commit hashes
- FOUNDATION shadow **`225e25c`**(shadow/foundation-shared-memory-v0·push·main 580093c 무변경).
- SIASIU shadow **`4848ad9`**(shadow/m4-siasiu-memory·push·parent 793b6ba·main 3cd068d 무변경).
- foundation-docs: 본 result + status §0 + SIASIU security mirror(아래 commit).

## 무결성
safe residual cleanup(R-1·R-2) · 코드=FOUNDATION shadow relic 제거만(mint 재도입 0) · SIASIU docs=ENV key 이름만(값 0) · 실 secret 0 · Vault write 0 · prod DB 0 · live 0 · **main merge 0** · concurrent 세션 무접촉·force push 0 · Cosmile subject mint/runner-fix 미수행(별도) · 본 result + mirror만 foundation-docs commit/push.
