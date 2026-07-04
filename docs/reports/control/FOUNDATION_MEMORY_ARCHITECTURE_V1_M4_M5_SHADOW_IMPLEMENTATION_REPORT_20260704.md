# Memory Architecture V1 — M4/M5 Shadow Implementation Report (Batch 2~4)

> 작성: foundation-control · 2026-07-04 · 압축 오케스트레이션 Batch 2~4. ★source 제품 repo push 0 · DB migration 0 · live/write/promotion 0 · raw/secret/PII 0.
> 원칙: 작은 batch·additive/shadow·독립 revert·현 HEAD baseline·**보고만 믿지 말고 diff/test/grep/SQL 검증**·실패 시 STOP.
> 기준: M4_IMPLEMENTATION_PLAN · M5_FOUNDATION_GATE_PLAN · M4_MIGRATION_PLAN · M4_M5_READINESS_REVIEW(Fable5) · M2/M3 v1.2.

## 요약 — 각 repo commit / 검증
| batch | repo | branch | commit | 산출물 | push |
|---|---|---|---|---|---|
| 1+2 | foundation-control | `shadow/m5-ingress-gate` | `a0711f0`+`a427fd7` | ingress_gate.py(shadow) + test 32/32 | **0(local)** |
| 3A | SIASIU | `shadow/m4-siasiu-memory` | `097f773` | candidate adapter keyed HMAC(B11) + memory schema shadow module | **0(local)** |
| 3B | Cosmile | `shadow/m4-cosmile-memory` | `160578b` | +9 additive prisma models + P1/P2 de-anon module | **0(local)** |
- ★제품 repo main 무변경: fc `ee055ef` · SIASIU `3cd068d` · Cosmile `3ba91e0`(모두 shadow 브랜치 로컬).

## Batch 2 — Foundation Gate Shadow Stabilization
- **파일:** `foundation_http_service/ingress_gate.py`(Batch1) · `tests/test_ingress_gate.py`(+hardening 5).
- **diff:** gate = 순수 scan(`scan`/`echo_strip`)·shadow·미배선(server/core/contracts 무변경). hardening(empty/non-dict/deep-nested/echo_strip 멱등) 추가.
- **테스트:** `test_ingress_gate.py` **PASS=32 FAIL=0**(reject 18+strip+hardening 5 + pass 8·self-echo round-trip).
- **runner baseline:** 83/89 → **83/89**(추가 감소 0). raw payload log 0·memory_write 0·memory_read_provider 0·hard reject 0.
- **consult/chat 처리:** ★**W-item 유지**(hard reject 배선 금지·baseline 보호). 주 유입 경로 배선은 M6 전 처리 약속(별도 승인).
- **rollback:** `git checkout main`(gate는 shadow 브랜치에만)·main·제품 repo 무영향.
- **Batch 3 착수:** 가능(Batch 2 PASS).

## Batch 3A — SIASIU Memory Shadow
- **repo/branch:** SIASIU `shadow/m4-siasiu-memory` · commit `097f773` · **migration 0**.
- **파일:** `app/ssbrain/foundation_memory_candidate_adapter.py`(수정·B11) · `app/tests/test_siasiu_memory_candidate_adapter.py`(정합) · `app/ssbrain/foundation_memory_schema_shadow.py`(신규·미배선) · `app/tests/test_foundation_memory_schema_shadow.py`(신규).
- **B11(candidate adapter):** unsalted sha256·하드코딩 `_DEV_SALT`(W25) → **keyed HMAC(per-service secret)** · subject_ref `subj_` [:16] → **`subj_v2_` + HMAC[:32]**(128-bit·domain-separated). content_hash `hmac256:`. per-secret 상이(de-anon correlator 방지). **shadow·flag OFF·answer.py 무변경.**
- **schema shadow module(미배선·`:memory:` only):** additive DDL 9엔티티 · **SAFETY∩SINGLE 분기순서(active≤1)** · **subject_key=COALESCE(subject_ref,guest_ref) unique** · **must_not_reappear**(deleted/blocked/expired 제외) · per-fact mark · **P3 keyed-hash util**(logins.txt 미열람·실 auth 미변경).
- **P3 처리:** raw email/name → keyed HMAC 대체값 util(원문 미저장·무기한 잔존 방지). ★logins.txt 미열람·live auth 전환은 M4 동반 patch(별도 승인).
- **테스트:** candidate adapter **26/26** · schema shadow **16/16** · integration **39/39**(answer_unchanged) · workflow **119/119**(behavior_changed 0·raw_leak 0).
- **answer.py fingerprint:** **`d7f579443f8a110a`**(unchanged).
- **memory.db:** 무접촉(mtime 07-03 유지·:memory:만). **STOP 위반 0.**
- **rollback:** `git checkout main`·adapter 수정 revert + 신규 2파일 삭제·additive(기존 데이터 무영향).

## Batch 3B — Cosmile Memory Shadow (P1/P2 atomic)
- **repo/branch:** Cosmile `shadow/m4-cosmile-memory` · commit `160578b` · **migration 0**.
- **파일:** `app/prisma/schema.prisma`(+9 additive models) · `app/scripts/foundation-memory-deanon.mjs`(신규·미배선) · `app/scripts/foundation-memory-deanon.test.mjs`(신규).
- **schema shadow:** +9 **NEW** models(ConversationSession/Message·EpisodeSummary·MemoryFactCandidate·LongTermMemoryFact·CustomerProfile·ConsentRecord·SubjectRefMap·CommerceMemory)·**기존 model 무변경**·nullable overlay·**NOT migrated**(dev.db 무접촉). `prisma validate` **PASS 🚀**.
- **P1/P2 동반(atomic·같은 commit):** de-anon 모듈 = P1 canonical de-anon(**raw customer_id/trace_id 동일 row 금지**) + P2 signal raw ids→**payload_refs** + **trace_id keyed-hash(HMAC/per-service)**(미저장 아님·V3 attribution).
- **trace_id keyed-hash 처리:** `tref_`+HMAC[:32]·raw trace 미포함·per-secret 상이·결정론.
- **same-row 검사:** de-anon 후 **same-row raw identity = 0**(`hasSameRowRawIdentity`=false) · **payload_refs only**(중첩 raw 식별자 0).
- **테스트:** de-anon **14/14** · readiness **164/164**(14 test) · loop **112/112**(trace_clean·no_live_write).
- ★**라이브 emit(.ts) 미변경**(W-item): Cosmile TS 테스트 러너 부재(vitest 없음) → 라이브 배선은 **검증 불가**라 이번 batch 미배선·별도 승인. de-anon 로직은 격리 순수 모듈로 검증 완료.
- **raw write:** 0(schema only·flag OFF·at-rest 전). **checkout/order 로직 무변경.** **STOP 위반 0.**
- **rollback:** `git checkout main`·schema append revert + 신규 2파일 삭제·additive(dev.db 무영향).

## Batch 4 — 통합 검증 결과 (16항 전량 PASS)
| # | 검증 | 결과 |
|---|---|---|
| 1 | Foundation gate shadow matrix | **32/32 PASS** |
| 2 | Foundation runner baseline 83/89 추가 감소 0 | **83/89**(선재 6·추가 0) |
| 3 | SIASIU integration | **39/39**(answer_unchanged) |
| 4 | SIASIU workflow | **119/119**(behavior_changed 0) |
| 5 | SIASIU answer.py fingerprint | **d7f579443f8a110a**(unchanged) |
| 6 | Cosmile readiness | **164/164** |
| 7 | Cosmile AI Commerce loop | **112/112**(trace_clean) |
| 8 | trace_id↔raw identity same-row | **0** |
| 9 | payload_refs only | **확인**(중첩 raw 식별자 0) |
| 10 | raw payload logs | **0** |
| 11 | cross-service memory import | **0** |
| 12 | Foundation durable memory | **0**(gate 순수 scan) |
| 13 | memory_read_provider connected | **0** |
| 14 | subject_ref backfill | **0**(주석 서술만·실 UPDATE 0) |
| 15 | raw write/live/promotion | **0**(불변식 write_live=False·applied_to_real_user=False) |
| 16 | DB migration 실행 | **0**(memory.db·dev.db mtime 07-03 유지·prisma migrate 미실행) |

## STOP 조건 위반 여부
- **위반 0.** raw/PII/secret exposure 0 · migration 0 · subject_ref backfill 0 · hard reject 0 · prod secret 0(dev fallback) · raw payload log 0 · Foundation durable customer memory 0 · memory_read_provider 0 · cross-service 0 · baseline 추가 실패 0 · answer.py fingerprint 무변경 · trace_id↔raw same-row 0 · P1/P2 동반(atomic·schema-only merge 아님) · SIASIU P3 util 동반 · 선재 runner 83/89 임의 수정 0.

## raw/secret/PII · migration · live/write/promotion 확인
- raw 고객 데이터/secret/PII 열람 **0**(memory.db·dev.db·logins.txt 미열람·synthetic/:memory:/dummy만·dev secret fallback·prod secret 미사용).
- DB migration **0** · live/write/promotion **0** · 서버 잔여 0.

## rollback 방법 (batch별 독립)
- Batch 2: foundation-control `git checkout main`(gate shadow 브랜치 폐기).
- Batch 3A: SIASIU `git checkout main`(adapter revert + 신규 2파일)·additive.
- Batch 3B: Cosmile `git checkout main`(schema append revert + 신규 2파일)·additive·dev.db 무영향.
- 3개 브랜치 전부 local·push 0 → 제품 repo main·remote 무영향.

## M6로 넘길 항목 (이번 batch 미수행)
- hard reject 활성화 · prod secret live · raw storage live · real-user consult live · subject_ref prod backfill · cross-service memory · V3 intelligence live.
- ★**추가 W-item:** ① `/v1/consult/chat` gate 라이브 배선(주 유입 경로·M6 전) ② Cosmile P1/P2 **라이브 emit 배선**(TS 테스트 러너 확보 후·현재 격리 모듈만 검증) ③ SIASIU P3 **라이브 auth 전환**(logins.txt·M4 동반 patch·별도 승인) ④ schema 실 migration(Leo 승인·M4_MIGRATION_PLAN).

## Fable5/Codex post-implementation review 요청 프롬프트 (초안)
```
[MEMORY V1 M4/M5 SHADOW — POST-IMPLEMENTATION REVIEW]
대상 브랜치(local·unpushed):
- foundation-control shadow/m5-ingress-gate (a427fd7): foundation_http_service/ingress_gate.py + tests/test_ingress_gate.py
- SIASIU shadow/m4-siasiu-memory (097f773): foundation_memory_candidate_adapter.py(B11) + foundation_memory_schema_shadow.py + 2 tests
- Cosmile shadow/m4-cosmile-memory (160578b): prisma/schema.prisma(+9 models) + foundation-memory-deanon.mjs + test
기준: M2/M3 v1.2 · M4/M5 plan · M4_MIGRATION_PLAN · 본 shadow implementation report.
검증 범위(코드 0·재현만):
 ① 계약↔구현 field-level 대조(9엔티티·upsert SAFETY∩SINGLE active≤1·subject_key COALESCE·gate rule 8)
 ② gate reject/pass matrix + self-echo round-trip 재실행(32/32) · de-anon same-row 0/payload_refs(14/14) · schema shadow(16/16)
 ③ 회귀: runner 83/89(추가감소 0)·SIASIU 39/39·119/119·fingerprint d7f579443f8a110a·Cosmile readiness 164/164·loop 112/112
 ④ STOP 자동화 grep: memory_write true=0 · memory_db_created=0 · trace_id↔raw same-row SQL=0 · raw payload log=0 ·
    cross-service import=0 · subject_ref backfill=0 · answer.py diff 부재 · migration 미실행(mtime)
 ⑤ B11 keyed HMAC 정합(subj_v2_[:32]·per-service 상이) · P1/P2 atomic(schema+de-anon 동일 commit) · P3 util(logins.txt 미열람)
판정: APPROVED → M4 migration(Leo 승인) + 라이브 배선(consult/chat·P1/P2 emit·P3 auth) 후속 train / PATCH_REQUIRED → repo-local 수정 후 delta.
금지: 코드 수정·migration 실행·source push·raw/secret 열람. 재현/검증만.
```
★Fable5/Codex post-review는 **본 보고서 후 1회만** 요청(중간 검수 생략).

## 무결성
source 제품 repo push 0 · DB migration 0 · subject_ref backfill 0 · hard reject 0 · prod secret 0 · raw payload/PII/secret log 0 · Foundation durable customer memory 0 · memory_read_provider 0 · cross-service 0 · answer.py fingerprint 무변경 · 4개 baseline 무회귀(runner 83/89·39/39·119/119·164/164·112/112) · 3 shadow 브랜치 local(push 0) · 본 보고서만 foundation-docs commit/push.
