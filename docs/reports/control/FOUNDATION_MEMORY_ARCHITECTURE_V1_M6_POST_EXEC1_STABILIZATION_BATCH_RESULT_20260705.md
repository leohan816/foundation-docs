# Memory V1 — Post-EXEC-1 Stabilization Batch Result (FU-1/2/3)

> 작성: foundation-control(Control) · 2026-07-05 · **범위: Leo 조건부 승인 stabilization follow-up batch(FU-1/2/3).**
> ★M6-C~H execution · repair · mapping · backfill · prod/live/hard reject/main merge = **미수행·승인 아님.**
> ★공통 금지 준수: 실 데이터 repair 0 · episode/memory_fact→ltm_fact mapping 0 · subject_ref backfill 0 · prod DB 0 · prod secret 0 · live 0 · hard reject 0 · **main merge 0** · schema code main merge 0 · raw/PII/raw identifier 출력 0.
> 근거: Post-EXEC-1 Stabilization Plan(`fa34da0`) · EXEC-1 execution result(`3cf0023`).

---

## 1. Fact
| FU | repo/대상 | commit | 결과 |
|---|---|---|---|
| **FU-1** prisma 기록 동기화 | Cosmile `shadow/m4-cosmile-memory` + dev.db | **`7d2438c`** | migration 파일 생성 + `resolve --applied` + migrate status up-to-date · dev.db 무변경 |
| **FU-2** candidate app-level validation | Cosmile `shadow/m4-cosmile-memory` | **`7d2438c`** | validation util + vitest 8/8 · checkout/order 무접촉 |
| **FU-3** runner 선재 조사 | read-only(코드 변경 0) | — | 원인 = c9bb996(FOUNDATION subject_ref v2 hard gate) 간접 영향 · **memory batch 무관 확정** |

## 2. FU-1 결과 (Cosmile prisma 기록 동기화)
- ★**`migrate dev --create-only` 대신 reset-free 경로 사용**: `migrate dev`는 dev.db drift 시 **reset 프롬프트 위험**(Leo 절대 금지). 대신 EXEC-1 적용 DDL을 migration 파일로 만들고 `resolve --applied`로 기록만 동기화(reset·재적용·데이터 변경 0).
- **migration 파일:** `prisma/migrations/20260705060544_memory_v1_additive/migration.sql` = **EXEC-1 적용 DDL과 IDENTICAL**(diff 검증)·additive·**destructive 0**(DROP/DELETE 0)·ADD COLUMN 45·CREATE TABLE 8·`MemoryFactCandidate` CHECK 포함.
- **`resolve --applied`:** "Migration ... marked as applied." · `_prisma_migrations` 기록 2개(baseline + memory_v1)·memory_v1 기록됨.
- **`migrate status`:** **"Database schema is up to date!"**.
- ★**dev.db 무변경:** 테이블 41(전 41)·row 합 176(전 176)·resolve는 `_prisma_migrations` 기록만 추가(스키마/데이터 변경 0).
- ★**금지 준수:** prisma migrate reset 0 · db push --accept-data-loss 0 · 재적용 0 · 데이터 변경 0 · prod 0.
- **발견(watch):** `migrate diff --from-migrations`는 baseline↔dev.db **pre-existing drift**(destructive diff·내 작업 무관)를 드러냄 — 단 `migrate status`는 up-to-date(내 additive 기록 반영). baseline 정합은 별도(§8).

## 3. FU-2 결과 (candidate app-level validation)
- **파일:** `app/scripts/candidate-status-validation.mjs`(`validateCandidateStatus`/`assertCandidateStatus`·enum candidate|approved|rejected) + `.vitest.ts`.
- **검증:** vitest **8/8**(candidate/approved/rejected 수락·**pending/garbage/unknown/"" 거부**·미지정→기본값 candidate). DB-level CHECK(EXEC-1)와 **병행(defense-in-depth)**.
- ★**금지 준수:** checkout/order/payment/cart 로직 **무접촉**(app/src .ts 변경 0) · live 배선 0 · 미배선(write 경로가 import해 사용) · prod 0.

## 4. FU-3 결과 (runner 83/89 선재 6건 read-only 조사)
- **현상:** runner 83/89·fail 6 = lmr 5(learning_memory_reuse_hardening_loop·lmr_m6_shadow_loop·lmr_api_contract_loop·lmr_release_candidate·lmr_v1_final_loop) + brain 1(foundation_brain_runtime_e2e).
- **원인(증거):** FOUNDATION HEAD = **`c9bb996`**(subject_ref v2 hard gate·`subject_identity.py` +71줄·raise/fail-closed 15개·subject_ref format `subj_`→`subj_v2_`·prod fail-closed·secret 요구). ★c9bb996은 **lmr/brain 테스트 파일을 수정하지 않음(0)** → **subject_identity.py 변경의 간접 영향**(lmr/brain suite가 subject_ref/memory identity 소비). c9bb996 **자체 테스트는 PASS**(hard_gate 29/29·shared_memory 41/41·eval 16/16)이나 pre-existing lmr/brain suite가 subject_ref 이전 동작을 assert → regress.
- **★memory batch 무관 확정:** memory batch(gate·SIASIU/Cosmile shadow·EXEC-1·FU-1/2) commits가 **FOUNDATION을 수정한 건수 = 0**(memory 작업은 fc/SIASIU/Cosmile shadow 브랜치만·FOUNDATION 무접촉). EXEC-1 전후 runner **83/89 taxonomy {lmr 5, brain 1} 동일**·runner는 dev DB 미참조.
- **한계(정직):** 정확한 per-assertion 텍스트는 **runner-내부 harness**(standalone 미실행)라 미포착. 근본 수정(lmr/brain suite ↔ subject_ref v2 정합)은 **별도 runner-fix train**(FOUNDATION·별도 승인)·본 batch 범위 밖. ★선재 실패 **임의 수정 0**·FOUNDATION 코드 변경 0.

## 5. test 결과
| 항목 | 결과 |
|---|---|
| Cosmile vitest(de-anon 5 + candidate validation 3) | **8/8**(2 files) |
| Cosmile readiness / loop | **164/164 · 112/112** |
| Cosmile prisma migrate status | **up to date** |
| Foundation gate | **57/57**(무변경) |
| Foundation runner | **83/89**(FU 무관·조사만·수정 0) |
| SIASIU integration/workflow/fingerprint | **39/39·119/119·d7f579443f8a110a**(무변경) |

## 6. dev DB row count/checksum 무변경 evidence
- **Cosmile dev.db:** FU-1 resolve 전후 **테이블 41=41·row 합 176=176**(resolve는 `_prisma_migrations` 기록만·스키마/데이터 무변경). FU-2는 dev.db 무접촉.
- **SIASIU memory.db:** FU batch에서 무접촉(FU-1/2/3은 SIASIU DB 미대상)·EXEC-1 상태 유지.
- ★raw/PII/raw identifier 출력 **0**(count/boolean만).

## 7. STOP / 무결성
STOP 위반 **0**: 실 데이터 repair 0 · mapping 0 · subject_ref backfill 0 · prod DB 0 · prod secret 0 · live 0 · hard reject 0 · **main merge 0**(제품 repo main = ee055ef/3cd068d/3ba91e0 무변경) · schema code main merge 0 · raw/PII 출력 0 · prisma migrate reset/db push **미사용** · 재적용/데이터 변경 0 · 선재 실패 임의 수정 0 · FOUNDATION 무접촉 · 서버 잔여 0.

## 8. Remaining watch
- **prisma baseline drift(신규 발견·FU-1):** migration history baseline이 dev.db 실 스키마와 pre-existing drift(내 작업 무관). `migrate status`는 up-to-date이나, 완전 정합(baseline squash/재baseline)은 **별도 reconciliation**(Leo 승인·비-blocker).
- **FU-3 runner 선재 6건:** 원인 = c9bb996·근본 수정은 **별도 runner-fix train**(FOUNDATION lmr/brain ↔ subject_ref v2 정합·별도 승인).
- **FU-2 app-level validation 라이브화:** util은 shadow(미배선)·실제 write 경로 강제는 **main merge + write 경로 배선**(별도 승인).

## 9. 다음 gate 가능 여부
- ★**stabilization batch(FU-1/2/3) 완료.** 코드-레벨/스키마-레벨 정합 + prisma 기록 + app validation util + 선재 원인 규명 = 준비 진전.
- **다음 gate(각 별도 Leo 승인):** M6-C shadow/live wiring · M6-D live auth · M6-E live emit · M6-F prod secret/subject_ref chain · M6-G hard reject · M6-H final readiness.
- ★**M6-C~H execution · repair · mapping · backfill · prod/live/hard reject/main merge = 여전히 각 별도 gate·별도 Leo 승인.** 본 batch는 그 승인이 아니다.

## 무결성
stabilization follow-up batch(FU-1/2/3) only · M6-C~H/repair/mapping/backfill/prod/live/hard reject/main merge 미수행 · prisma reset/db push 미사용 · 데이터 변경 0 · FOUNDATION 무접촉 · main merge 0 · raw/PII 출력 0 · Cosmile shadow 브랜치 `7d2438c`(push·main 무변경) · 본 result report만 foundation-docs commit/push.
