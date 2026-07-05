# Memory V1 — M6-F Prod Secret Injection Gate Result (injection contract verification)

> ★[OPTION A — Option B pivot(shadow FOUNDATION `5a0003c` / SIASIU `d0f51cb` · docs `1e24c33`)로 **SUPERSEDED**. 정본: `..._M6_F_OPTION_B_SUBJECT_REF_CONTRACT_20260705.md` · `..._OPTION_B_SHADOW_PIVOT_RESULT_20260705.md`. ★Foundation-side mint · FOUNDATION_SUBJECT_REF_SECRET · identity-touch = **폐기(deprecated·Option A relic)**. subject_ref = service-local mint(Foundation validate/gate only).]

> 작성: foundation-control(Control) · 2026-07-05 · **범위: prod secret 주입 **계약 검증**(synthetic secret·boolean/hash 비교만).**
> ★**control workspace 규율(CLAUDE.md §3·§4): 실 Vault write · 실 prod secret 취급 = 금지.** 따라서 **실 production vault/prod runtime에 실 secret을 쓰지 않는다.** 본 gate = **주입 계약(env 주입 시 동작·분리·fail-closed·flag OFF)을 synthetic secret으로 검증**·실 vault 주입은 **ops 배포 단계(별도)**.
> ★secret 값 출력 0 · raw/PII 출력 0 · boolean/hash 비교만 · synthetic secret 미영속(ephemeral·미커밋). subject_ref backfill 0 · prod DB 0 · live 0 · main merge 0.
> 근거(local): execution gate package(`676a362`) · FOUNDATION impl(`0687404`·subject_identity/adapter/p3) · dev backfill 검증(`10996c5`).

---

## 1. Fact
- prod secret **주입 계약**을 synthetic secret으로 검증(prod-like env에서 env secret 사용·service 값 분리·dev fallback 차단·unknown/unset fail-closed·identity-touch flag OFF). **전 항목 boolean PASS.**
- ★**실 Vault write 0·실 prod secret 취급 0·prod DB 0·backfill 0·live 0·main merge 0.** 실 vault 주입 = ops 배포 단계(control workspace 아님·§4).

## 2. Injection scope (검증됨·synthetic·실 vault write 아님)
| secret(env명) | 검증 | 결과 |
|---|---|---|
| `FOUNDATION_SUBJECT_REF_SECRET` | env 주입 시 subject_identity가 env secret 사용·dev fallback 아님·prod mint 동작 | ✅ |
| `FOUNDATION_SUBJECT_REF_SECRET_VERSION=1` | `current_secret_version()==1` | ✅ |
| `SIASIU_FUREF_SECRET` | adapter/p3가 env furef secret 사용·dev fallback 아님 | ✅ |
| `SIASIU_MEMORY_CANDIDATE_SECRET` | adapter content-hash secret env 사용 | ✅ |
| `SIASIU_P3_AUTH_SECRET` | p3 login de-id secret env 사용 | ✅ |
| `COSMILE_MEMORY_SECRET` | de-anon secret(값 분리 대상 포함) | ✅ |
| `COSMILE_FUREF_SECRET` | ★designed env명·Cosmile de-anon은 `COSMILE_MEMORY_SECRET` 사용(Cosmile subject_ref mint 경로 미배선) → **not-wired**(정직 note·Cosmile furef-mint gate 시 배선) | 미배선 |
- ★모든 secret = **synthetic 검증값**(실 prod secret 아님·미영속·미출력).

## 3. Secret source / vault boundary
- **주입 방식(정본):** 실 prod secret은 **env/Vault 주입**(ops 배포 플랫폼)·★**control workspace가 vault write 수행 안 함**(§4). 하드코딩/커밋 금지·secret 값 로그/출력 0.
- **control tower 역할:** 주입 **계약 검증**(코드가 env secret 사용·fail-closed·분리)까지. **실 vault write = ops-side 별도**(control workspace 미수행).
- ★본 gate에서 `vault_write=False`·`secret_values_printed=False`·synthetic secret 미영속.

## 4. Service separation check (boolean·값 미출력)
- ★**all_secrets_distinct = True**: FOUNDATION_SUBJECT_REF_SECRET · SIASIU_FUREF_SECRET · SIASIU_MEMORY_CANDIDATE_SECRET · SIASIU_P3_AUTH_SECRET · COSMILE_MEMORY_SECRET **5개 값 전부 상이**(hash 비교·값 미출력).
- **furef secret 분리**: SIASIU furef secret ≠ content-hash secret(2a)·per-service 상이.
- ★env명 분리가 아니라 **값 분리** 검증(hash 집합 크기 = secret 수).

## 5. Fail-closed check (boolean)
- **dev fallback 차단**: env secret 주입 시 각 모듈이 **env secret 사용**(dev fallback 문자열 미사용·`*_not_dev_fallback=True`).
- **unset + prod → fail-closed**: FOUNDATION `SubjectRefSecretMissing` raise(`FOUNDATION_unset_prod_failclosed=True`) · SIASIU `RuntimeError` raise(`SIASIU_unset_prod_failclosed=True`).
- **unknown/unset env → production(fail-safe·W6)**: `_is_production()=True`(`unknown_env_is_production=True`).

## 6. Identity-touch flag state
- ★`shared_memory_v0_shadow` **flag OFF**(`identity_touch_flag_off=True`) → identity-touch mint API inert·live 미배선.

## 7. Integrity
prod secret 주입 **계약 검증** only(synthetic·boolean) · **실 Vault write 0**(`vault_write=False`) · 실 prod secret 취급 0 · secret 값 출력 0(`secret_values_printed=False`) · raw/PII 출력 0 · subject_ref backfill 0(`backfill_run=False`) · prod DB 접근 0(`prod_db_accessed=False`) · live 0 · **main merge 0**(fnd 580093c·siasiu 3cd068d·cosmile 3ba91e0) · 코드/DB 변경 0 · synthetic secret 미영속(미커밋) · 실 DB 무접촉 · 서버 잔여 0.

## 8. Next gate recommendation
- ★**주입 계약 검증 PASS** → 다음(각 별도 최종 Leo 승인·+ ops 협조):
  1. **ops 실 vault 주입**(FOUNDATION_SUBJECT_REF_SECRET·per-service FUREF/content secret 실 값·env/Vault·★control workspace 아님·ops 배포)·주입 후 control은 **fail-closed/분리 재검증(boolean)**.
  2. **COSMILE_FUREF_SECRET 배선**(Cosmile furef-mint 경로 필요 시·별도).
  3. **prod DB backfill gate**(실 prod DB·backup·단일·idempotent·guest 제외·W1·최종 별도 승인·prod DB 접근은 이 gate).
  4. **runner-fix train**(별도·live enable 전 89/89 필수).
- ★**prod DB backfill·live enable·main merge·실 vault write는 각 별도 최종 Leo 승인/ops**·prod execution gate 계속 닫힘.

## 무결성
prod secret 주입 계약 검증(synthetic·boolean/hash) only · 실 Vault write 0 · 실 prod secret 취급 0 · secret 값 출력 0 · subject_ref backfill 0 · prod DB 접근 0 · live 0 · **main merge 0** · 코드/DB 변경 0 · synthetic secret 미영속 · 실 DB 무접촉 · 본 result report만 foundation-docs commit/push · **실 vault 주입·prod DB backfill·live·main merge는 각 별도 최종 Leo 승인/ops.**
