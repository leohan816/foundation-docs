# Memory V1 — Ops HOLD_WITH_LIMITS L1–L6 Corrective (dev/local/shadow)

> 작성: foundation-control(Control) · 2026-07-06 · **범위: Ops Corrective Reverify(HOLD_WITH_LIMITS) L1~L6 정정. Fable review·Memory V1 closure = HOLD 유지(미진행).**
> ★Hard Stop 무접촉: prod DB 0 · 실 secret/Vault 0 · secret 값 출력 0 · main merge 0 · live 0 · M6-G activation 0 · 외부 배포 0 · canonical schema 변경 0 · 원본 DB 삭제 0 · docker volume 삭제 0 · guard 완화 0 · skip/xfail 0.
> 근거: 실 docker postgres 검증 · 설계 노트(`IDENTITY_CRYPTO_FAIL_CLOSED_DESIGN_NOTE`).

---

## 1. Fact
- Ops HOLD_WITH_LIMITS 6개(L1 crypto fail-closed·L2 furef 정합·L3 테스트 정직화·L4 README·L5 prisma 재현·L6 tmp secret) 정정 완료(dev/shadow).
- ★identity contract 변경(L1·L2)은 설계 노트로 고정. runner **89/89**·cross-producer furef 3자 동일.

## 2. L1 prod fail-closed result
- `crypto._secret()`: env 미설정 시 **prod/unknown env → `RuntimeError`(fail-closed)**·dev/test/local/shadow만 dev/mock fallback. `_is_production()`(FDN_ENV|APP_ENV|NODE_ENV ∉ dev/… → prod) = p3_auth/candidate 패턴 상속.
- ★검증(실 코드): `test_l1_prod_failclosed` — APP_ENV=production 시 mint **raise**·dev 시 mint OK·unknown/unset → production. **secret 값 미출력**(예외 메시지에도).
- 무음 dev fallback(모든 env) 제거.

## 3. L2 furef canonical result
- ★불일치 정정: 이전 `furef_`+HMAC(`siasiu:furef:`)[:24] → **canonical furef_v2**(`furef_v2_`+HMAC(`siasiu:local_user:`)[:32]).
- ★**cross-producer 3자 동일 검증**: `crypto.furef == candidate_adapter.canonical_furef_v2 == p3_auth.canonical_furef_v2`(True·동일 local_user_ref→동일 furef). p3_auth의 cross-producer 동일 furef 요구와 **충돌 0**(오히려 정합).
- SubjectRefMap.local_user_ref_hash = 이 furef_v2. subject_ref = candidate_adapter subject_ref 정합.

## 4. L3 test correction result
- **W6**: 테스트 내부 inline `is_production` 제거 → 실 `crypto._is_production` 코드 경로 검증.
- **W1 atomic**: 실 `repository.write_subject_and_fact_atomic`(map+fact 동일 tx) 추가·성공 경로 + **강제 실패(중복 fid)→예외+rollback·orphan 증가 0** 검증.
- **cross-producer furef**: 신규 test로 3자 동일 검증.
- ★postgres 부분은 **infra-gated 명시**(SIASIU_DATABASE_URL+disposable docker 필요). pure 부분 무조건 실행. skip/xfail/expectation 조작 0.
- 결과: identity substrate **8/8**(pure) / **8/8**(postgres)·contract 6/6·shadow 4/4.

## 5. L4 README result
- `README_POSTGRES_DEV.md` §6.5 추가: **0.0.0.0 바인딩 금지**·dev 정본 `server.py`=**127.0.0.1**·`/api/reset` 등 **write route 무인증 외부노출 위험** 명시·원격은 SSH 터널/인증 프록시.

## 6. L5 prisma validate reproducibility result
- ★방식: **문서화된 export**(app/.env는 실 secret 위험 → 미채택). 재현 명령(dev/mock·실값 아님):
  `DATABASE_URL="postgresql://USER:PASSWORD@127.0.0.1:5432/DBNAME?schema=cosmile" ./node_modules/.bin/prisma validate`
- ★evidence: `The schema at prisma/schema.prisma is valid 🚀`(shell env 우연성 없이·dev/mock URL·**P1012 재발 0**·실 secret 0).

## 7. L6 tmp secret backup result
- `/tmp/.../env_local_backup`(499 bytes·Cosmile .env.local 편집 전 backup): sk-계열 0·KEY/SECRET 라인 0(**raw 미출력·count만**)·sha256 f10d4064646e28b4.
- ★**옵션 B(durable archive)**: `/home/leo/ops-artifacts/memory_v1/20260706/env_local_backup.SENSITIVE`로 이동·MANIFEST 등재(**SENSITIVE_REAL_SECRET_POSSIBLE**)·**/tmp에서 제거**·git commit 0·raw dump 0. (실 secret 가능성 대비 안전 보존·불요 시 Leo 승인 후 삭제.)

## 8. Tests
| 항목 | 결과 |
|---|---|
| runner | **89/89 {}clean** |
| M6-F identity substrate(pure / postgres) | **8/8 / 8/8** |
| — furef cross-producer 3자 동일 | True |
| — L1 prod fail-closed(실 코드) | PASS(prod raise·dev ok) |
| — W1 atomic(성공+rollback orphan 0) | PASS |
| — W6 fail-safe(실 _is_production) | PASS |
| service_memory contract | 6/6 |
| shadow wiring | 4/4 |
| hard reject sim | false_allow 0 |
| Cosmile prisma validate(문서화 export) | valid(P1012 0) |
- ★postgres = infra-gated(disposable docker) 명시.

## 9. Secret scan
- 하드코딩 실 secret **0** · dev/mock fallback(비-secret·cross-producer 정합용·crypto.py) 4 · secret 값 출력 0 · `.env.example` key-only · env_local_backup = archive(SENSITIVE·raw 0).

## 10. Remaining HOLD items
- ★**Fable review · Memory V1 closure** = HOLD 유지(해제 전 미진행).
- Cosmile 실 DB-integration 테스트 부재(순수 로직만).
- SIASIU postgres dev default 미승격(opt-in).
- M6-F prod path/M6-G activation/M6-H live = Hard Stop.
- docker volume(5) 정리·env_local_backup.SENSITIVE 최종 처리 = Leo 승인 대기.

## 11. Commit hashes
- **SIASIU shadow `fe90d99`**(L1-L4 crypto·repository·test·README) + `938c44c`(H2·이전)·main 3cd068d 무변경.
- **Cosmile shadow `6c6aa7f`**(B2 provider·이전)·main 3ba91e0 무변경.
- **foundation-docs**: 본 corrective + design note(아래 commit). ops-artifacts MANIFEST = git 무관.

## 12. What was not touched
- ★원본 memory.db/dev.db(삭제 0)·docker volume(삭제 0)·canonical schema(변경 0·postgres 테이블 정의 무변경)·guard(완화 0)·runner 89/89(조작 0)·answer.py fingerprint·concurrent 세션 파일·**prod/live/main/M6-G activation/실 secret/실 Vault/Fable review/Memory V1 closure**(HOLD).

---

## 무결성
Ops HOLD_WITH_LIMITS L1-L6 corrective dev/shadow · crypto prod fail-closed(unknown→prod raise·secret 값 0) · furef canonical_v2 통일(cross-producer 3자 동일·contract 충돌 0) · 테스트 실 코드 경로(W1 atomic·W6 fail-safe·infra-gated 명시) · README 0.0.0.0 금지 · prisma 재현(문서화·P1012 0) · tmp secret backup durable archive(raw 0) · runner 89/89 · Foundation service DB access 0 · 실 secret 0 · prod 0 · live 0 · **main merge 0**(fnd 580093c·siasiu 3cd068d·cosmile 3ba91e0) · docker volume 삭제 0 · **Fable review·Memory V1 closure = HOLD 유지**.
