# Memory V1 — EXEC-1 PATCH_REQUIRED Bugfix Round (BUG-1/2/3)

> 작성: foundation-control(Control) · 2026-07-05 · **범위: shadow/local additive bugfix round.**
> ★**이 patch = shadow/local additive bugfix이며, EXEC-1 실 migration 승인·live/prod/hard reject 승인이 아니다.**
> ★금지 준수: 실 migration 0 · 실 데이터 pre-scan 0 · repair 적용 0 · prod DB 0 · prod secret 0 · subject_ref backfill 0 · live 배선 0 · hard reject 0 · product repo main merge 0 · schema code main merge 0.
> 근거: EXEC-1 독립 검수(GitHub main `e14dfb5`·PATCH_REQUIRED·BUG-1/2/3).

---

## 1. Fact
독립 검수(PATCH_REQUIRED)가 지적한 실 버그 3건을 shadow 브랜치에서 additive로 수정:
| bug | repo | shadow branch | commit | 수정 |
|---|---|---|---|---|
| **BUG-1** gate bare-scalar raw/PII bypass | foundation-control | `shadow/m5-ingress-gate` | **`2ccf4f0`** | `_scrub_value` 헬퍼(bare scalar string도 PII/raw detect+strip)·generic else + compat unknown key scalar 경로 적용 |
| **BUG-3** SIASIU candidate field | SIASIU | `shadow/m4-siasiu-memory` | **`6047b71`** | `memory_fact_candidate` + `consent_scope`·`sensitivity_level`(§3.4·additive DEFAULT) |
| **BUG-2 + BUG-3** Cosmile field | Cosmile | `shadow/m4-cosmile-memory` | **`73b7ce4`** | `LongTermMemoryFact` + `consentScope`/`retentionPolicy`/`sensitivityLevel`(§3.5) · `MemoryFactCandidate` + `consentScope`/`sensitivityLevel`(§3.4)·additive nullable |
- ★3 repo remote main **무변경**(shadow push only)·`git show origin/shadow/...`로 GitHub 판독 가능.

## 2. 판단
- **BUG-1/2/3 = shadow/local additive로 CLOSED**(코드·테스트·prisma validate·migrate diff 확인). 전부 additive·live/write/hard-reject 경로 무접촉.
- ★**EXEC-1 진입은 여전히 금지**(Leo 판단). 본 bugfix는 EXEC-1 승인 아님.
- 검수 WATCH(runner 83/89 선재·Cosmile candidate CHECK DB강제)는 EXEC-1 gate에서 확정(아래 §5).

## 3. BUG-1/2/3 Closure Evidence
### BUG-1 (gate scalar raw/PII)
- `_scrub_value(container, key, path, out)`: value가 bare scalar string이면 `_is_pii`/`_is_raw_text` detect + `container[key]=None` strip. 아니면 중첩 `_scrub`.
- 적용: 생성 else(trace_refs·safety_flags·user_constraints·recommendation_deferred) + compat unknown key scalar.
- **실증:** `{trace_refs:"한국어 상담 원문 평문 걱정"}`(strict·version=mctx-1.0) → **`ok:False`·`GATE_REJECT_RAW_TEXT`**·clean 재스캔 **ok**(strip). (patch 전엔 ok:True 통과.)
- **regression test 6건**(bare scalar raw trace_refs/safety_flags/recommendation_deferred·bare scalar PII user_constraints·compat unknown scalar raw·strip 멱등). gate **46→52**.
- ★hard reject 여전히 금지(hook inert·hard_reject=False).

### BUG-2 (Cosmile LongTermMemoryFact §3.5)
- `+consentScope @default("same_service")` · `+retentionPolicy @default("standard_ttl")` · `+sensitivityLevel @default("normal")`. additive nullable·기존 컬럼 무변경.
- **migrate diff(no-DB) 확인:** LTM 3/3 필드 생성. prisma validate PASS. NOT migrated(dev.db 무접촉).

### BUG-3 (양 서비스 MemoryFactCandidate §3.4)
- SIASIU `memory_fact_candidate` + `consent_scope`·`sensitivity_level`(NOT NULL DEFAULT·CHECK/status 무변경). Cosmile `MemoryFactCandidate` + `consentScope`·`sensitivityLevel`(nullable default).
- **확인:** SIASIU schema shadow test **9b2**(consent_scope/sensitivity_level 존재)·Cosmile migrate diff candidate 2/2. ★기존 row repair 0·pending 자동 변환 0·migration 적용 0.

## 4. tests (전량 PASS)
| 항목 | 결과 |
|---|---|
| Foundation gate(+BUG-1 regression) | **52/52**(46→52) |
| Foundation runner | **83/89**(추가감소 0·선재 6) |
| SIASIU candidate adapter | **26/26** |
| SIASIU schema shadow(+BUG-3) | **27/27** |
| SIASIU P3 auth | **11/11** |
| SIASIU integration | **39/39** |
| SIASIU workflow | **119/119** |
| answer.py fingerprint | **d7f579443f8a110a** |
| Cosmile de-anon(node) | **14/14** |
| Cosmile de-anon(vitest) | **5/5** |
| Cosmile prisma validate | **PASS 🚀** |
| Cosmile readiness | **164/164** |
| Cosmile loop | **112/112** |

## 5. remaining watch (EXEC-1 gate에서 처리)
- **runner 83/89 선재 6건**(lmr 5+brain 1) — memory batch 무관·FOUNDATION c9bb996 기인 추정. EXEC-1 전 실선재 확인(별도 조사 train).
- **Cosmile candidate CHECK DB강제** — prisma `@default("candidate")`만·`CHECK(status IN …)`는 EXEC-1 Cosmile migration SQL(raw)/app-level(P-b). 코드 미해소(EXEC-1 필수).
- **BUG-1 gate = hard-reject 배선(M6-G) 전 필수**(이번에 CLOSED)·EXEC-1 migration blocker는 아니었음.
- watch-1(shadow code 원격검증) — 3 브랜치 push됨·판정은 검수자.

## 6. STOP / 무결성
STOP 위반 **0**: 실 migration 0 · 실 데이터 pre-scan 0 · repair 적용 0 · prod DB 0 · prod secret 0 · subject_ref backfill 0 · **live 배선 0** · **hard reject 0**(gate 여전히 inert·hard_reject=False) · durable customer memory 0 · cross-service 0 · **product repo main merge 0**(main ee055ef/3cd068d/3ba91e0 미변경) · schema code main merge 0 · answer.py fingerprint 무변경 · 실 memory.db/dev.db 무접촉(07-03) · logins.txt 미열람(06-30) · 서버 잔여 0.

## 7. 다음 액션
- **재검수 or EXEC-1 진행 판단(Leo):** BUG-1/2/3 CLOSED → ① 독립 검수 **경량 delta 재검수 1회**(BUG closure 확인·선택) 또는 ② EXEC-1 gate 진입 판단.
- ★**EXEC-1 실 migration·실 데이터 pre-scan·repair 적용·prod/live/hard reject/backfill/main merge = 여전히 별도 gate·별도 Leo 승인.**
- Cosmile candidate CHECK(P-b)·runner 선재(watch-2)는 EXEC-1 gate 준비에 포함.
