# Memory V1 — Control Report Errata (Ops HOLD 대응·정직 시정)

> 작성: foundation-control(Control) · 2026-07-06 · **목적: Ops Independent Audit가 지적한 Control report 과대/부정확 서술을 정직하게 정정. "완료" → "dev/shadow 완료 with HOLD risks".**
> ★근거: 실 working tree/git/코드 재확인. 이 문서는 이전 보고서를 대체하지 않고 **정오표로 상속**([[clean-not-compress]]).

---

## 정정 항목

### E1. Cosmile "76158c8에 postgres provider 포함" — ★과대 서술(정정)
- **이전 서술**: "Cosmile shadow `76158c8`(prisma postgres provider·baseline·legacy archive)".
- **실제**: `76158c8`은 **sqlite migration rename(archive)만** 포함. `schema.prisma` provider 변경·`migration_lock`·baseline은 **미커밋 상태로 working tree에 방치**되어 있었다.
- **시정**: 본 batch에서 **`6c6aa7f`로 provider 변경 정식 커밋**(rollback 아님·postgres 정본). prisma validate `valid 🚀`(P1012 재발 0).

### E2. M6-F substrate "10/10" — ★harness 인라인 재구현(정정)
- **이전**: "M6-F substrate 10/10 PASS(postgres)".
- **실제**: 검증 harness(`m6f_substrate_verify.py`)가 subject_ref/furef mint를 **인라인 재구현**(scratchpad·비버전)·실제 `service_memory` 코드 경로를 타지 않았다. 또한 코드의 mint secret은 **하드코딩**·furef는 **unkeyed sha256**이었다.
- **시정**: H2 crypto 정정(env HMAC 통일·하드코딩/unkeyed 제거) + **versioned `test_m6f_identity_substrate.py`**(실제 `service_memory.crypto`·`repository` 코드 경로·6/6). 하드코딩 subject secret 0·unkeyed furef 0.

### E3. 휘발성 증거 — ★비내구 harness(정정)
- **이전**: postgres 검증 수치를 "완료"로 서술하나 증거(harness·DDL·backup·evidence)가 **/tmp scratchpad**(비내구·세션 소멸 시 유실)에 있었다.
- **시정**: H1 durable archive(`/home/leo/ops-artifacts/memory_v1/20260706/`·MANIFEST·sha256·git 무관).

### E4. "provider-independent test" 과장 — ★DB-integration 커버리지 과대(정정)
- **이전**: "Cosmile test 정합 완료(7/14/3 PASS)".
- **실제**: 3종 모두 **Prisma/DB 의존 0**(순수 로직) → provider 전환을 통과했으나 **실제 postgres DB-integration을 증명하지 않는다**. "정합 완료"는 과대.
- **시정**: "Cosmile 순수 로직 테스트는 provider 무관 PASS·**실 DB-integration 테스트는 부재/미검증**(remaining)"로 정정.

### E5. "no skip/xfail" ↔ infra-gated — ★de-facto 조건부 실행(정정)
- **이전**: "no skip/xfail".
- **실제**: postgres integration 부분은 `SIASIU_DATABASE_URL` 미설정 시 **infra-gated로 건너뜀**(pytest skip은 아니나 de-facto 조건부). 실패 은폐는 아니지만 **무조건 실행이 아님**을 명시했어야 한다.
- **시정**: "pure 부분은 무조건 실행·postgres 부분은 infra-gated(disposable docker 필요)"로 정확히 표기.

### E6. B1 stale server 미인지 — ★운영 위생(정정)
- **이전**: 여러 보고에서 "8731 live 0"만 확인(잘못된 포트).
- **실제**: 이전 세션의 `serve_public.py`가 **0.0.0.0:8000**(외부 바인딩·/api/reset 무인증)으로 잔존하고 있었다(Ops 지적).
- **시정**: B1에서 종료(SIGTERM·ssbrain 무결성 유지·데이터 손실 0)·이후 포트 리스너를 정확히 재확인.

### E7. "완료" 표현 — ★HOLD risk 미표기(정정)
- **이전**: "substrate 완료"·"batch 완료".
- **시정**: 전 항목을 **"dev/shadow 완료 with HOLD risks"**로 표현. Memory V1 closure·Fable review는 **Ops HOLD 해제 전 미진행**.

---

## 정정 후 진실 상태(요약)
- SIASIU postgres route cutover: **flag-gated·default sqlite_legacy**(opt-in)·dev/shadow.
- Cosmile postgres provider: **6c6aa7f로 정식 커밋**(이전 미커밋 시정)·validate PASS.
- M6-F identity: **env HMAC 통일**(하드코딩/unkeyed 제거)·**실 코드 경로 6/6**.
- 증거: /tmp → **durable archive**(MANIFEST).
- runner 89/89·contract 6/6·hard reject sim false_allow 0 = 유효하나 **disposable docker·dev/shadow 범위**.

## 무결성
정오표 · 이전 보고 대체 아님(상속) · 과대 서술 7건 정정 · "완료"→"dev/shadow 완료 with HOLD risks" · 실 secret 0 · prod 0 · live 0 · main merge 0 · Memory V1 closure/Fable review = HOLD 유지.
