# Memory V1 — M6-F Option B OPS Vault Injection Handoff (per-service SUBJECT_SECRET)

> 작성: foundation-control(Control) · 2026-07-05 · **정본(Option B): ops per-service SUBJECT_SECRET 실 Vault 주입 handoff + control 사후 boolean review.**
> ★control은 실 secret 값 생성/보관/출력/커밋/Vault write 0(§3·§4 guardrail). 실 Vault 주입 = ops/deploy. control은 boolean/count evidence만 review.
> ★**FOUNDATION_SUBJECT_REF_SECRET 삭제**(Foundation mint 폐기·Option B). 실 Vault write/prod DB/backfill/live/main merge = Hard Stop.
> 근거(local): Option B contract·shadow pivot result(`1e24c33`) · security guardrails(`63fe06f`).

---

## 1. Fact
- Option B: subject secret은 **service-local 자산**. Foundation에는 subject_ref 생성용 secret **없음**(FOUNDATION_SUBJECT_REF_SECRET 폐기).
- ops가 per-service SUBJECT_SECRET 실 값 주입·control은 사후 boolean evidence review(실 값 미접근).

## 2. Ops 주입 대상 key (Option B)
| env/Vault key | 역할 | 주입 |
|---|---|---|
| `SIASIU_SUBJECT_SECRET` | SIASIU service-local subject_ref mint | ops·실 값 |
| `SIASIU_SUBJECT_SECRET_VERSION` | SIASIU subject rotation version(dual-read) | ops·`1` |
| `SIASIU_FUREF_SECRET` | SIASIU **Option B memory** furef 내부 ref(SubjectRefMap.local_user_ref_hash) | ops·실 값 |
| `SIASIU_MEMORY_CANDIDATE_SECRET` | SIASIU content_hash | ops·실 값 |
| `SIASIU_P3_AUTH_SECRET` | SIASIU login de-id | ops·실 값 |
| `COSMILE_MEMORY_SECRET` | Cosmile de-anon | ops·실 값 |
| `COSMILE_SUBJECT_SECRET` | Cosmile service-local subject_ref mint | ★**미배선**(Cosmile subject mint gate 필요 시·주입 보류) |
| (별개) `FOUNDATION_USER_REF_SECRET` | ★**CUTOVER-01 furef_v2_ HMAC**(provider_flag.py·기존 배선·Option B memory furef **아님**·별개 존재) | ops·기존 유지(별도) |
| ~~`FOUNDATION_SUBJECT_REF_SECRET`~~ | — | ★**삭제**(Foundation subject mint 없음·Option B) |
> ★키 목록 정합: SIASIU env policy와 동일(SIASIU_SUBJECT_SECRET·_VERSION·FUREF·MEMORY_CANDIDATE·P3_AUTH). `FOUNDATION_USER_REF_SECRET`은 **CUTOVER-01 별개 메커니즘**(Option B memory와 구분·superseded 아님). unification은 별도 design.
- ★per-service **값 상이**·서비스간 미공유·하드코딩/커밋 금지·secret 값 로그/출력 0.

## 3. Secret boundary (Option B)
- ★Foundation에 subject secret **없음**. subject_ref mint/저장/SubjectRefMap = **service-local**.
- service-level secret 분리: `SIASIU_SUBJECT_SECRET`(mint) ≠ `SIASIU_FUREF_SECRET`(내부 ref) ≠ `SIASIU_MEMORY_CANDIDATE_SECRET`(content) ≠ `SIASIU_P3_AUTH_SECRET`(auth)·서비스간 미공유.

## 4. Ops handoff / control review
- **ops:** 실 값 Vault 주입 + Option B post-injection verification runner 실행 → **boolean/count evidence**(secret 값 미포함).
- **control:** evidence를 Option B template §4 checklist로 review(실 secret 값 미접근). 특히 `foundation_mint_deprecated=True`·`SIASIU_service_local_mint_ok=True`·`all_service_secrets_distinct=True` 확인.
- ★실 Vault write = ops(control 미수행·§4). control = 계약 정의 + 사후 boolean review.

## 5. Hard Stop / Boundary
> 실 Vault write(control)·prod DB write/backfill·live·hard reject·main merge·production secret rotation = Hard Stop(Leo 별도 승인/ops). control 실 secret 값 출력/커밋 0.

## 6. Next action
- ops per-service SUBJECT_SECRET 주입 + verification 실행 → boolean evidence → control review(PASS 시) → prod DB backfill gate(Option B·Leo 별도 최종 승인). ★COSMILE_SUBJECT_SECRET·Foundation mint = 각 별도(미배선/폐기).

## 무결성
Option B ops handoff + 사후 verification **계획** only · control 실 secret 생성/보관/출력/커밋/Vault write 0 · **FOUNDATION_SUBJECT_REF_SECRET 삭제(Foundation mint 없음)** · prod DB 0 · live 0 · **main merge 0** · 코드/DB 변경 0 · 본 handoff만 commit/push · **실 vault write(ops)·prod DB backfill·live·main merge는 각 별도 최종 Leo 승인/ops.**
