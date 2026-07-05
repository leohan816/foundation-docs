# Memory V1 — M6-F Option B Doc Drift Patch Plan

> 작성: foundation-control(Control) · 2026-07-05 · **범위: Option A 참조 문서 supersede + backfill/post-injection/ops handoff Option B 재작성 초안 + M6-H/status 갱신 방향.**
> ★docs-only 계획. 코드 0 · 실 secret 0 · Vault write 0 · prod DB 0 · live 0 · main merge 0.
> 근거(local): Option B contract·shadow pivot result(본 batch) · Option A 문서군(`~598b727`).

---

## 1. Fact
- Option B pivot으로 Option A 참조 문서 **18개**가 drift. 정보 손실 없이(clean-not-compress) **supersede pointer**로 정정·Option B 문서군을 정본으로.

## 2. Supersede 표기 규칙(정보 손실 0)
- 각 Option A 문서 상단에 추가: **"★[OPTION A — Option B pivot(`598b727`·shadow `5a0003c`/`d0f51cb`)로 SUPERSEDED. 정본: Option B subject_ref contract·shadow pivot result. Foundation-side mint/FOUNDATION_SUBJECT_REF_SECRET/identity-touch는 폐기됨.]"**
- ★원문 삭제 0(clean-not-compress)·포인터만.

## 3. Option A 문서 분류(supersede 대상)
| 문서군 | 조치 |
|---|---|
| M6-F design gate·schema migration·impl(shadow)·impl review·dev backfill verify | **supersede pointer**(Option A mint 전제·Option B에서 mint만 service-local로 이동·나머지 로직 유지) |
| prod secret injection·ops vault handoff·post-injection template·prod backfill gate | **supersede + Option B 재작성**(§5·FOUNDATION_SUBJECT_REF_SECRET 제거) |
| M6-F goal package·patch fix plan·reconciliation·delta review·FOUNDATION impl gate/result | **supersede pointer**(Option A identity-touch/Foundation mint 전제) |
| M6-H skeleton·status matrix | **Option B 갱신**(§6) |
- ★18개 개별 재작성 대신 **supersede pointer + Option B 정본 문서**로 정본 이동.

## 4. Keep(Option B에서도 유효·supersede 불요)
- Option B subject_ref contract · shadow pivot result · pivot audit · runner-fix train · M6-G hard reject decision(subject_ref 소유 무관·유효) · M6-C/D/E result(subject_ref mint 무관).

## 5. backfill / post-injection / ops handoff Option B 재작성 초안
### 5.1 prod backfill(Option B)
- subject_ref backfill = **service-local mint**(각 서비스 `<SERVICE>_SUBJECT_SECRET`로 NULL→subject_ref)·**Foundation call/identity-touch 0**. guest 제외·missing furef skip·idempotency·기존 non-NULL 재계산 0·W1 atomic = 유지. FOUNDATION_SUBJECT_REF_SECRET 의존 삭제.
### 5.2 post-injection verification(Option B)
- 검증 대상 = **per-service `<SERVICE>_SUBJECT_SECRET`**(SIASIU_SUBJECT_SECRET 등)·FOUNDATION_SUBJECT_REF_SECRET 항목 **삭제**. env 사용·값 분리·dev fallback 차단·fail-safe·**service-local mint 동작·Foundation mint 경로 부재(deprecated raise)** 확인. boolean/hash/count only.
### 5.3 ops vault handoff(Option B)
- ops 주입 key: `SIASIU_SUBJECT_SECRET`·`SIASIU_FUREF_SECRET`·`SIASIU_MEMORY_CANDIDATE_SECRET`·`SIASIU_P3_AUTH_SECRET`·`COSMILE_SUBJECT_SECRET`(필요 시)·`COSMILE_MEMORY_SECRET`. ★`FOUNDATION_SUBJECT_REF_SECRET` **삭제**(Foundation mint 없음). per-service 값 분리·control 미접근·boolean review.

## 6. M6-H / status matrix Option B 갱신 방향
- M6-F 상태: **Option B pivot(service-local mint)**·A1 real Foundation vault injection **STOPPED**·identity-touch/FOUNDATION_SUBJECT_REF_SECRET **DEPRECATED/REMOVED(shadow)**·service-local mint **PASS(shadow·flag OFF)**.
- dev backfill verify(`10996c5`) 로직 재사용(mint 주체만 service-local). runner-fix train·M6-G·M6-H = subject_ref 소유 이동만·영향 최소.
- Hard Stops(변경): 실 Vault write(**per-service SUBJECT_SECRET**·ops) · prod DB backfill · hard reject · live/main merge.

## 7. Risk
- R1: supersede pointer 18개 추가(문서·정보 손실 0). R2: backfill/post-injection/ops handoff Option B 재작성(별도 문서·초안 본 계획에 포함). R3: SubjectRefSecretMissing/orphan relic 후속 제거(코드·별도). ★코드/prod/live/main merge 0.

## 8. Next action
- 승인 시: ① 18문서 supersede pointer 일괄 추가 ② backfill/post-injection/ops handoff Option B **재작성 문서** 생성(§5) ③ status matrix/M6-H Option B **갱신**. ★전부 docs·Hard Stop 무접촉.

## 무결성
doc drift patch **plan** only · 코드 0 · 실 secret 0 · Vault write 0 · prod DB 0 · live 0 · **main merge 0** · Option A 원문 삭제 0(supersede pointer) · 본 plan만 foundation-docs commit/push · **supersede 적용·Option B 재작성 문서는 후속(safe scope·docs).**
