# Memory V1 — Return Dev Remaining Closure (dev/local/shadow)

> 작성: foundation-control(Control) · 2026-07-06 · **범위: Memory V1 본류 복귀 전 dev 잔여 마감(Cosmile test·shadow wiring·seed 정책·dev default 결정·복귀 readiness). prod/live/main 0.**
> ★Hard Stop 무접촉: prod DB 0 · 실 secret 0 · main merge 0 · live 0 · 외부 배포 0 · M6-G activation 0 · Foundation service DB direct access 0 · cross-schema ref 0 · canonical schema 변경 0 · 원본 DB 삭제 0 · skip/xfail 0.
> 근거: 실 docker postgres 검증 · substrate completion(`3a25193`).

---

## 1. Fact
- dev 잔여 5개 마감: (1) Cosmile 전체 test postgres 정합 (2) memory_context/reuse_decision M6-C/D/E shadow 배선 (3) legacy seed 정책안 (4) SIASIU postgres dev default 결정 (5) Memory V1 복귀 readiness.
- ★전부 dev/local/shadow·flag OFF·회귀 0. runner **89/89 유지**.

## 2. Cosmile postgres DB-integration test result
- Cosmile repo 테스트 3종 **전부 PASS**(postgres provider 하): `foundation-memory-deanon.vitest.ts` **7/7** · `candidate-status-validation.vitest.ts` **3/3** · `foundation-memory-deanon.test.mjs` **14/14 (PASS=14 FAIL=0)**.
- ★3종 모두 **Prisma/DB 의존 0**(순수 로직·hashing/validation) → provider 전환(sqlite→postgresql)에도 **회귀 0**.
- ★"readiness 164 / loop 112"는 **foundation-control eval**(Cosmile repo 아님)·별도. Cosmile repo의 DB-integration 상용 테스트는 부재(node 스크립트는 smoke/scenario·정식 test 아님).
- 분류: **MEANINGFUL_PASS**(provider-independent). 실패 0.

## 3. memory_context/reuse_decision shadow wiring result
- `service_memory/shadow_wiring.py` `build_shadow_memory_context(user_id)`: **flag `siasiu_memory_candidate_shadow_enabled` OFF → None**(기존 동작·회귀 0). ON시 canonical minimized context(subject_ref·**fact_refs(hash·raw value 0)**·safety_flags·consent/retention·`raw_text_stored=False`·`request_scoped=True`).
- `foundation_shadow_adapter.run_shadow`: memory shadow flag ON·user_id 있을 때만 canonical memory_context 주입(default OFF·**fail-closed to legacy**). 기존 `memory_context` 파라미터·`memory_reuse_decision` emit 경로 재사용(M6-C/D/E `foundation_trust_core_runtime` gate로 흐름).
- ★검증 **4/4 PASS**(flag OFF None·canonical no raw·adapter siasiu_output 불변·postgres context raw 0). ★**Foundation durable 저장 0**(request_scoped)·**service DB direct access 0**·**raw text/PII 미전송**(fact_refs만).
- ★SIASIU/Cosmile **동일 canonical 형식**(build_memory_context). Cosmile은 TS-side에서 동일 logical contract emit(de-anon 파이프·별도 배선점).

## 4. legacy seed policy (확정안)
- **episode raw text(30)**: ★canonical core **미저장**(content_hash only·raw_text_stored=False). 정책:
  - 보존: 원본 sqlite(`app/service_memory_data/memory.db` + backup `sha256 40d8083`)에 **archive**(원본 삭제 0).
  - canonical 반영: 필요 시 `episode_summary`(요약·raw 아님)로만 승격·raw는 core 밖.
  - 삭제 기준: dev artifact이므로 Leo 승인 시에만(현재 보존).
- **fact_type_registry(11)**: canonical core 대응 테이블 없음 → **SIASIU config/extension 후보**(core 밖).
  - 승격안: `siasiu` schema 내 **extension table**(`fact_type_registry` config·canonical core 밖·SIASIU 전용)로 seed. canonical core 오염 0.
  - 결정 필요: config table 승격 여부(Leo)·현재는 seed candidate로 분리 보존.
- ★공통: **canonical core에 raw 저장 금지**·원본 삭제 금지·seed/archive/config로 분리.

## 5. SIASIU postgres dev default decision
- ★**결정: dev default = `sqlite_legacy` 유지(postgres opt-in)**. 현재 `SIASIU_MEMORY_BACKEND` default=sqlite_legacy·postgres는 flag로 opt-in.
- **근거**: (a) postgres default화는 **docker postgres + psycopg2**를 모든 SIASIU dev/test 전제로 강제(현 system env에 psycopg2 부재) (b) default 전환 시 runner 89/89·기존 sqlite 테스트가 postgres 인프라 없이는 깨짐 (c) 정본은 postgres이나 **dev default 승격은 postgres dev 인프라 표준화 후**.
- **승격 기준(충족 시 default=postgres)**: psycopg2 SIASIU requirements 편입 · docker-compose dev postgres 표준화 · 기존 sqlite 테스트 postgres 정합 · runner 89/89 postgres에서 재현.
- **rollback**: flag 1개(`SIASIU_MEMORY_BACKEND`)·즉시 sqlite 복귀. **회귀 리스크 = 0**(현재 opt-in·default 무변경).
- ★코드 변경 0(결정만·현 flag 구조 유지).

## 6. Memory V1 return readiness
| 항목 | 상태 |
|---|---|
| substrate(89/89·postgres 정본·M6-F 10/10·route cutover·shadow wiring) | ✅ **dev/shadow 완료** |
| Cosmile test 정합 | ✅ 완료(회귀 0) |
| memory_context shadow 배선 | ✅ flag OFF 배선 완료 |
| **M6-F prod path**(Vault·backfill) | WAITING_FOR_OPS / **BLOCKED_BY_HARD_STOP** |
| **M6-G hard reject activation** | **BLOCKED_BY_HARD_STOP**(Leo 최종) |
| **M6-H final/live** | **WAITING_FOR_LEO** |
- ★**Memory V1 본류 복귀 준비 완료**: substrate + shadow 배선 마감 → 다음은 M6-F prod path(Hard Stop 경유)부터.

## 7. Tests / failures and meaning classification
| 테스트 | 결과 | 분류 |
|---|---|---|
| SIASIU runner | **89/89** clean | 정당(invariant 유지) |
| Cosmile de-anon vitest / test.mjs / candidate-status | **7 / 14 / 3** | MEANINGFUL_PASS(provider-independent) |
| shadow wiring | **4/4** | MEANINGFUL_PASS(flag OFF·raw 0) |
| service_memory contract / M6-F substrate | 6/6 · 10/10(이전 batch) | MEANINGFUL_PASS |
- ★no skip/xfail·no expectation manipulation·실패 0.

## 8. Remaining Hard Stops
- ops Vault 실 주입 · prod DB backfill · **M6-G hard reject activation** · live · main merge · 외부 배포 · 실 role grant · 실 secret · canonical schema 변경 · prod DB migration · 원본 DB 삭제 · SIASIU postgres dev default 승격(인프라 표준화 후·비-Hard-Stop이나 별도).

## 9. Commit hashes
- **SIASIU shadow `609eba7`**(shadow wiring) + `fad2275`(route cutover·relocation·이전)·main 3cd068d 무변경.
- **Cosmile shadow `76158c8`**(postgres provider·이전)·main 3ba91e0 무변경.
- **foundation-docs**: 본 report(아래 commit).

## 10. What was not touched
- ★원본 `app/data/memory.db`(relocated·backup·삭제 0)·Cosmile `dev.db`(무변경)·brain.py 로직(surgical 분기만)·answer.py fingerprint·guard 로직·canonical schema(변경 0)·SIASIU dev default(sqlite 유지·flag 구조 무변경)·concurrent 세션 파일·prod/live/main.

---

## 무결성
Memory V1 return dev 잔여 마감 · Cosmile test 7/14/3 PASS(provider-independent) · shadow wiring 4/4(flag OFF·raw 0·durable 0) · seed 정책안(canonical core raw 저장 0·원본 삭제 0) · SIASIU dev default=sqlite 유지(opt-in·회귀 0) · runner **89/89** · 실 secret 0 · prod 0 · live 0 · **main merge 0**(fnd 580093c·siasiu 3cd068d·cosmile 3ba91e0) · canonical schema 변경 0 · cross-schema ref 0 · **M6-F prod/M6-G/M6-H = Hard Stop 유지** · Memory V1 본류 복귀 준비 완료.
