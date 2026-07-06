# Memory V1 — Ops HOLD Corrective Batch (B1·B2·H1·H2) — dev/local/shadow

> 작성: foundation-control(Control) · 2026-07-06 · **범위: Ops Independent Audit HOLD 해소 corrective(B1 stale server·B2 Cosmile commit/errata·H1 durable archive·H2 crypto). Fable review·Memory V1 closure = HOLD 유지.**
> ★Hard Stop 무접촉: prod DB 0 · 실 secret/Vault 0 · main merge 0 · live 0 · M6-G activation 0 · 외부 배포 0 · 원본 DB 삭제 0 · docker volume 삭제 0 · guard 완화 0 · skip/xfail 0 · canonical schema 변경 0.

---

## 1. Executive summary
- Ops HOLD의 4개 우선 항목(B1·B2·H1·H2) 시정 완료(dev/shadow). 과대 서술은 **정오표**(`errata`)로 정정.
- ★핵심: (B1) 0.0.0.0:8000 stale server 종료 · (B2) Cosmile provider **미커밋→정식 커밋** · (H1) /tmp 증거 durable archive · (H2) 하드코딩/unkeyed crypto → **env HMAC 통일**.
- runner **89/89**·hard reject false_allow 0·Foundation service DB access 0. **HOLD risk는 errata에 정직 표기**.

## 2. B1 stale server result
- **발견**: pid 475200·`serve_public.py`(이전 세션)·**0.0.0.0:8000**(외부 바인딩)·server.Handler(`/api/reset` write route 무인증)·cwd=현 SIASIU/app·open=ssbrain.sqlite(memory.db 핸들 없음).
- **종료**: SIGTERM graceful(Leo 승인). ssbrain integrity ok(종료 전/후)·**데이터 손실 0**.
- **검증**: 0.0.0.0:8000 리스너 **0**·app/data/memory.db 재생성 **0**·guard ok=True·runner **89/89**.
- ★예방: dev server 정본=`server.py`(127.0.0.1 bind)·`README_POSTGRES_DEV`에 0.0.0.0 override 금지 명시. 0.0.0.0 서버 스크립트 재생성 금지.
- **범위 외(보고)**: 남은 0.0.0.0 = :3001(Cosmile next dev)·:8090·:55432(본 batch disposable postgres·종료 시 제거)·기타. SIASIU serve_public은 제거됨.

## 3. B2 Cosmile commit/errata result
- ★**Ops 지적 확인(제 과대 서술)**: `76158c8`은 **sqlite migration rename만** 포함·`schema.prisma` provider/`migration_lock`/baseline은 **미커밋**이었다.
- **시정**: `6c6aa7f`로 provider 변경 정식 커밋(**rollback 아님·postgres 정본**)·`.env.example` COSMILE_SUBJECT/FUREF_SECRET key(값 0).
- **prisma validate**: `valid 🚀`(**P1012 재발 0**·postgres URL).
- **.env.local**: gitignored(미커밋)·sqlite `file:` URL → **dev/mock postgres URL로 정리**(실값 아님·미커밋). 실 secret 커밋 0.
- 정오표: `errata` E1.

## 4. H1 durable archive result
- **archive**: `/home/leo/ops-artifacts/memory_v1/20260706/`(repo 밖·**git 무관**·commit 0). MANIFEST(path·size·sha256·sensitivity·origin·retention).
- **분류**: SENSITIVE_DEV_PII 2(SIASIU memory.db backup/copy·dev·not prod)·SENSITIVE_DEV 2(cosmile dev.db backup·app_data_archive)·NON_SENSITIVE_CODE 4(DDL·harness).
- ★원본 memory.db/dev.db **삭제 0**(archive는 복사)·raw PII dump 0·foundation-docs엔 **summary만**(민감 내용 미기재).
- ★docker volume(5개) = **Leo 승인 전 삭제 0**.

## 5. H2 crypto correction result
- **제거**: 하드코딩 `_DEV_SUBJECT_SECRET`(repository.py) · unkeyed `sha256(furef)`.
- **통일**: `service_memory/crypto.py` — subject_ref/furef = **env HMAC**(`SIASIU_SUBJECT_SECRET`·`SIASIU_FUREF_SECRET`·dev/mock fallback)·`secret_version` env.
- **env keys(key-only·값 0)**: SIASIU_SUBJECT_SECRET·SIASIU_FUREF_SECRET·COSMILE_SUBJECT_SECRET·COSMILE_FUREF_SECRET.
- **실 코드 경로 검증**: `test_m6f_identity_substrate.py` **6/6**(env 변경→subject_ref 변경=하드코딩 아님·furef≠unkeyed sha256·repository가 crypto 사용·secret_version·W1 atomic·zero-orphan). 하드코딩 0·unkeyed 0.
- **compatibility**: 기존 subject_ref는 disposable dev postgres에만 존재(영속 subject_ref 없음) → 호환 파손 0(STOP 미발생).

## 6. Tests
| 항목 | 결과 |
|---|---|
| runner(B1 kill + H2 후) | **89/89 {}clean** |
| service_memory contract(postgres) | 6/6 |
| M6-F identity substrate(실 코드) | **6/6** |
| M6-G hard reject sim | false_allow 0 |
| shadow wiring | 4/4 |
| Cosmile prisma validate | valid(P1012 0) |
| 하드코딩 secret / unkeyed furef | **0 / 0** |
- ★pure 부분 무조건 실행·postgres 부분 infra-gated(disposable docker)·errata E5.

## 7. Remaining HOLD items
- **Fable review · Memory V1 closure** = ★HOLD 유지(해제 전 미진행).
- Cosmile 실 DB-integration 테스트 부재(순수 로직만·errata E4).
- SIASIU postgres dev default 미승격(opt-in).
- M6-F prod path/M6-G activation/M6-H live = Hard Stop.
- docker volume 정리(Leo 승인 대기).

## 8. Hard Stop validation
- prod DB 0 · 실 secret/Vault 0 · main merge 0 · live 0 · M6-G activation 0 · 외부 배포 0 · 원본 DB 삭제 0 · docker volume 삭제 0 · guard 완화 0 · skip/xfail 0 · canonical schema 변경 0 · Foundation service DB direct access **0**(FOUNDATION은 psycopg2를 package boundary에서 **금지**·실 connect 0).

## 9. Commit hashes
- **SIASIU shadow `938c44c`**(H2 crypto·identity test) + `516e8ff`(M6-G sim·infra·이전)·main 3cd068d 무변경.
- **Cosmile shadow `6c6aa7f`**(B2 provider 정식 커밋·.env.example COSMILE keys)·main 3ba91e0 무변경.
- **foundation-docs**: 본 corrective batch + errata(아래 commit). ops-artifacts MANIFEST = **git 무관**(commit 0).

## 10. What was not touched
- ★원본 memory.db/dev.db(삭제 0·archive는 복사)·docker volume(삭제 0)·canonical schema(변경 0)·guard(완화 0)·runner 89/89(조작 0)·answer.py fingerprint·concurrent 세션 파일·SIASIU dev default(sqlite 유지)·**prod/live/main/M6-G activation/실 secret/실 Vault/Fable review/Memory V1 closure**(HOLD).

---

## 무결성
Ops HOLD corrective(B1·B2·H1·H2) dev/shadow · stale server 종료(데이터 손실 0) · Cosmile provider 정식 커밋(과대서술 시정) · /tmp 증거 durable archive(MANIFEST·git 무관) · crypto env HMAC 통일(하드코딩/unkeyed 0) · runner 89/89 · Foundation service DB access 0 · 실 secret 0 · prod 0 · live 0 · **main merge 0**(fnd 580093c·siasiu 3cd068d·cosmile 3ba91e0) · docker volume 삭제 0 · **Fable review·Memory V1 closure = HOLD 유지**.
