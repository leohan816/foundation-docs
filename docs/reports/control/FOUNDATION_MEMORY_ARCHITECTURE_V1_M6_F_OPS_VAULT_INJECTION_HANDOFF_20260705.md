# Memory V1 — M6-F OPS Vault Injection Handoff + Post-Injection Verification

> 작성: foundation-control(Control) · 2026-07-05 · **범위: ops 실 Vault 주입 handoff + 주입 후 control 검증 절차(planning).**
> ★**control workspace는 실 secret 값을 생성·보관·출력·커밋·Vault write 하지 않는다(§3·§4).** 실 Vault 주입 = **ops/deploy 환경**. control은 주입 후 **값이 아니라 boolean/hash 비교 evidence만** 검증.
> ★handoff + verification **계획**까지. 실 vault write · prod DB backfill · live · main merge = 각 별도 승인/ops. secret 값 출력 0.
> 근거(local): prod secret 주입 계약 검증(`83ae233`) · FOUNDATION impl(`0687404`·subject_identity/adapter/p3) · execution gate package(`676a362`).

---

## 1. Fact
- prod secret **주입 계약**은 synthetic으로 검증 완료(PASS·env 사용·값 분리·fail-closed·flag OFF). 남은 = **ops 실 Vault 주입**(별도) + **주입 후 control 검증**(boolean).
- ★control은 실 secret 미생성/미보관/미출력/미커밋/미-vault-write. 실 값은 **ops/Vault**만·control은 boolean evidence만.

## 2. Ops handoff scope
- **ops 수행:** 아래 §3 env/Vault key를 **실 값**으로 deploy 환경/Vault에 주입(★per-service 상이 값·하드코딩/커밋 금지·최소권한·감사).
- **control 수행:** 주입 후 §5 verification 절차(boolean-only) 제공·ops가 실행한 **boolean evidence를 review**. ★control은 실 secret 값 미접근.
- **경계:** 실 Vault write = ops. control = 계약 정의 + 사후 boolean 검증 review.

## 3. Required secret keys (ops 주입 대상)
| env/Vault key | 역할 | 주입 |
|---|---|---|
| `FOUNDATION_SUBJECT_REF_SECRET` | Foundation subj_v2 mint(subject_ref) | ops·실 값 |
| `FOUNDATION_SUBJECT_REF_SECRET_VERSION` | secret version(=**1** 기준) | ops·`1` |
| `SIASIU_FUREF_SECRET` | SIASIU furef 파생(candidate+auth 공통) | ops·실 값 |
| `SIASIU_MEMORY_CANDIDATE_SECRET` | SIASIU content_hash/mc_id | ops·실 값 |
| `SIASIU_P3_AUTH_SECRET` | SIASIU login de-id(phash_v2_) | ops·실 값 |
| `COSMILE_MEMORY_SECRET` | Cosmile de-anon refs | ops·실 값 |
| `COSMILE_FUREF_SECRET` | ★**미배선**(Cosmile furef-mint 경로 없음) | **주입 보류**(§6) |
- ★모든 값 **per-service 상이**·`_VERSION=1`·secret 값은 문서/로그/코드 미기재.

## 4. Secret boundary
- **FOUNDATION_SUBJECT_REF_SECRET = Foundation-only**(subject_identity.py만 read)·서비스 미보유·subject_ref는 이 secret으로만 mint.
- **service-level secret 분리**: SIASIU_FUREF_SECRET(furef) ≠ SIASIU_MEMORY_CANDIDATE_SECRET(content) ≠ SIASIU_P3_AUTH_SECRET(auth)·서비스간 미공유·per-service 상이 값(2a).
- **furef secret ≠ content-hash secret**(SIASIU_FUREF_SECRET vs CANDIDATE_SECRET) — furef 파생 전용 분리.
- ★서비스는 FOUNDATION_SUBJECT_REF_SECRET 미수신·raw stable_id 미전송(furef만·identity-touch).

## 5. Post-injection verification plan (ops 실행·control review·boolean-only)
control이 제공하는 **verification 절차**(secret 값 미출력·hash 내부 비교·boolean 반환)를 **ops가 주입된 deploy 환경에서 실행** → boolean evidence를 control이 review:
1. **env secret 사용**: 각 모듈이 dev fallback 아닌 **env secret** 사용(`*_from_env=True`·`*_not_dev_fallback=True`).
2. **service 값 분리**: 주입 secret **전부 상이**(`all_secrets_distinct=True`·hash 집합 크기=secret 수·값 미출력).
3. **version=1**: `current_secret_version()==1`.
4. **dev fallback 차단**: 임의 1개 secret 미설정 + prod → **fail-closed raise**(`*_unset_prod_failclosed=True`).
5. **unknown/unset env fail-safe**: env 미지정 → `_is_production()=True`(dev fallback 미도달).
6. **identity-touch flag OFF**: `shared_memory_v0_shadow=False`(mint inert).
7. **경계**: `prod_db_accessed=False`·`backfill_run=False`·`secret_values_printed=False`·`vault_write(by control)=False`.
- ★evidence = boolean/hash 비교만·secret 값·raw/PII 미출력. control은 실 값 미접근·boolean만 review.

## 6. COSMILE_FUREF_SECRET status
- ★**미배선(정직 표시):** Cosmile de-anon(`foundation-memory-deanon.mjs`)은 `COSMILE_MEMORY_SECRET`(de-anon refs)만 사용·**Cosmile subject_ref furef-mint 경로 없음** → `COSMILE_FUREF_SECRET`은 **코드 미참조**.
- **조치:** 지금 **주입 보류**. Cosmile가 furef→subject_ref mint를 하게 될 때(**별도 Cosmile furef-mint gate**) 코드 배선 + 그때 주입. 현재 SIASIU만 furef-mint 소비.

## 7. Evidence policy
- ★control workspace: 실 secret 값 **생성·보관·출력·커밋·Vault write 0**. 검증 = **boolean + hash 비교**(값 미출력).
- ops: 실 값 주입(Vault)·verification 절차 실행 → **boolean evidence** 반환. 실 secret 값은 로그/문서/코드/커밋 어디에도 0.
- synthetic 검증값(control-side)은 ephemeral·미영속·미커밋.

## 8. Execution boundary
> **[이 문서 = handoff + verification 계획]** ops key 목록·경계·검증 절차. ★실 vault write·prod DB backfill·live·main merge 미승인·미수행.
> **[ops 수행(별도)]** 실 Vault 주입 + verification 절차 실행 → boolean evidence.
> **[control 수행(사후)]** boolean evidence review + fail-closed/분리 재확인(값 미접근).
> **[금지 유지]** control의 실 vault write · 실 secret 값 출력/커밋 · prod DB backfill · live · hard reject · main merge.

## 9. Next action
- Leo/ops 판단: ① ops가 §3 key 실 값 Vault 주입(control 아님) ② ops가 §5 verification 실행 → boolean evidence ③ control이 evidence review(PASS 시 다음 gate).
- 이후(각 별도 최종 Leo 승인): **prod DB backfill gate**(실 prod DB·backup·단일·idempotent·guest 제외·W1) · **runner-fix train**(live 전 89/89) · Cosmile furef-mint gate(COSMILE_FUREF_SECRET 배선·필요 시).
- ★**실 vault write(ops)·prod DB backfill·live·main merge는 각 별도 승인/ops**·prod execution gate 계속 닫힘.

## 무결성
ops handoff + post-injection verification **계획** only · control 실 secret 생성/보관/출력/커밋/Vault write 0 · secret 값 출력 0 · prod DB backfill 0 · live 0 · **main merge 0**(fnd 580093c·siasiu 3cd068d·cosmile 3ba91e0) · 코드/DB 변경 0 · 실 DB 무접촉 · 본 handoff 문서만 foundation-docs commit/push · **실 vault write(ops)·prod DB backfill·live·main merge는 각 별도 최종 Leo 승인/ops.**
