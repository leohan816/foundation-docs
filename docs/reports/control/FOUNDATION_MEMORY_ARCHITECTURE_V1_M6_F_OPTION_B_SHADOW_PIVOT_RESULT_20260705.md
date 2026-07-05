# Memory V1 — M6-F Option B Shadow Pivot Result (service-local mint · shadow · flag OFF)

> 작성: foundation-control(Control) · 2026-07-05 · **범위: Option B shadow 코드 pivot 실행 결과(service-local subject_ref mint · Foundation validate/gate only).**
> ★shadow branch · 실 secret 0 · Vault write 0 · prod DB 0 · live 0 · main merge 0. secret 값 출력 0.
> 근거(local): Option B contract(본 batch) · Option B pivot audit(`598b727`) · FOUNDATION/SIASIU 실코드.

---

## 1. Fact
- Option B pivot 실행(shadow·flag OFF): **Foundation mint 폐기**(resolve_subject/identity-touch → deprecated) · **Foundation validate/gate 잔존** · **SIASIU service-local subject_ref mint 추가**.
- **commit(shadow·main 무변경):** FOUNDATION **`5a0003c`**(shadow/foundation-shared-memory-v0) · SIASIU **`d0f51cb`**(shadow/m4-siasiu-memory).

## 2. Files changed
| repo | 파일 | 변경 |
|---|---|---|
| FOUNDATION `5a0003c` | `subject_identity.py` | mint 제거(resolve_subject/subject_ref_from_foundation_user_ref → `SubjectMintDeprecated`)·`_subject_secret`/`current_secret_version`/`_DEV_FALLBACK_KEY` 제거 · **ADD** `is_subject_ref_v2`·`validate_subject_ref`(format+PII) |
| | `api.py` | `mint_subject_ref`(identity-touch)·`resolve_subject` 제거·`_MINT_AUDIT` 제거 · **ADD** `validate_subject_ref` |
| | `_factory.py` | `_service_mint`(service-local·synthetic)·Foundation 미호출 |
| | `reason_codes.py` | +`pii_in_subject_ref`·`subject_ref_format_invalid` |
| | `eval.py`·`tests/*` | Option B(deprecation·validate·service-local format) |
| SIASIU `d0f51cb` | `foundation_memory_candidate_adapter.py` | `subject_ref(local_user_ref)` service-local mint(`SIASIU_SUBJECT_SECRET`)·candidate subject_ref=mint(None 위임 제거)·SUBJECT/FUREF/content secret 3분리 |
| | adapter test | service-local mint 검증(31→33) |
- ★main merge 0(fnd 580093c·siasiu 3cd068d·cosmile 3ba91e0 무변경).

## 3. Option B contract summary
- subject_ref = `subj_v2_ + <32hex>`(**service가 자기 `<SERVICE>_SUBJECT_SECRET`로 mint**). Foundation secret 미사용.
- Foundation = **format/validation(is_subject_ref_v2·validate_subject_ref: format+PII reject)·gate·contract**만. mint/secret/durable 저장 0. (정본: Option B subject_ref contract 문서)

## 4. Code pivot summary
- **Foundation mint 폐기:** `resolve_subject`·`subject_ref_from_foundation_user_ref` → `SubjectMintDeprecated`(raise). `FOUNDATION_SUBJECT_REF_SECRET` mint 의존 제거(잔존 2 = `SubjectRefSecretMissing` docstring·unused relic·active dep 0). identity-touch `mint_subject_ref` **제거**.
- **Foundation validate 추가:** `validate_subject_ref`(format+PII·enum reason_codes)·`is_subject_ref_v2`.
- **SIASIU service-local mint:** `subject_ref = subj_v2_ + HMAC(SIASIU_SUBJECT_SECRET, "siasiu:subject:"+id)[:32]`·candidate subject_ref=service-local mint·SUBJECT≠FUREF≠content secret.
- **Cosmile:** de-anon만·subject_ref mint **미배선**(정직·Cosmile subject mint gate 필요 시).
- **SubjectRefMap/W1:** service-local 유지(변경 0).

## 5. Tests / verification
| 항목 | 결과 |
|---|---|
| FOUNDATION hard_gate(Option B contract) | **21/21** |
| FOUNDATION shared_memory · eval | **41/41 · 16/16** |
| SIASIU adapter(service-local mint) | **33/33**(31→33) |
| SIASIU p3 · schema · fingerprint | **16/16 · 27/27 · d7f579443f8a110a**(무변경) |
| SIASIU integration · workflow | **39/39(answer_unchanged) · 119/119** |
| Cosmile de-anon · vitest | **14/14 · 10/10** |
| gate · readiness · loop | **57/57 · 164/164 · 112/112** |
| runner | **83/89**(taxonomy {lmr 5, brain 1}·Option B 전후 불변) |

## 6. Self-review result (8 checks)
1. **Foundation durable customer memory 표현 0:** ✅ 부정만(Foundation은 저장 안 함)·저장 코드 0.
2. **Foundation broker 표현 0:** ✅ 부정만.
3. **Foundation mint 경로 제거/비활성 확인:** ✅ resolve_subject/subject_ref_from_foundation_user_ref → deprecated raise·mint HMAC 0·mint_subject_ref 제거·_subject_secret/current_secret_version 제거.
4. **service-local subject_ref mint 확인:** ✅ SIASIU `subject_ref()` service-local·candidate subject_ref=mint·_factory _service_mint.
5. **SIASIU/Cosmile common contract 유지:** ✅ format/validate/gate 공통(Foundation)·secret/mint per-service.
6. **secret 값 출력 0:** ✅ env 명·dev fallback 문자열은 dev placeholder(실 secret 아님)·실 secret 값 0.
7. **prod DB/live/main merge 0:** ✅ shadow·flag OFF·prod 0·live 0·main merge 0.
8. **테스트 evidence 확인:** ✅ 전 suite PASS·fingerprint 유지·runner 불변(§5).

## 7. Remaining drift
- Option A 참조 문서 **18개** → supersede pointer 필요(doc drift patch plan 참조).
- backfill·post-injection·ops handoff = Option B 재작성 필요(FOUNDATION_SUBJECT_REF_SECRET→per-service SUBJECT_SECRET).
- M6-H/status matrix Option B 갱신.
- `SubjectRefSecretMissing` class(unused relic·docstring에 FOUNDATION_SUBJECT_REF_SECRET 언급) — 후속 제거 후보(active dep 0·harmless).
- Cosmile subject_ref mint 미배선(정직·별도 gate).

## 8. Remaining hard stops
- 실 secret 생성/출력/커밋 · real Vault write · prod DB backfill · live enable · main merge = **미수행(Hard Stop)**.

## 9. Next action
- doc drift patch plan(18문서 supersede + backfill/post-injection/ops handoff Option B 재작성 초안 + M6-H/status 갱신).
- ★shadow 코드 pivot 완료(flag OFF)·Option B로 close. prod/live/main merge = Hard Stop.

## 무결성
Option B shadow pivot(코드) · shadow branch · Foundation mint 폐기·service-local mint · Foundation durable/broker 0(부정만) · 실 secret 0 · Vault write 0 · prod DB 0 · live 0 · **main merge 0**(fnd 580093c·siasiu 3cd068d·cosmile 3ba91e0) · 회귀 0(fingerprint 유지·runner 불변) · shadow 커밋(fnd `5a0003c`·siasiu `d0f51cb`) · 본 result만 foundation-docs commit/push.
