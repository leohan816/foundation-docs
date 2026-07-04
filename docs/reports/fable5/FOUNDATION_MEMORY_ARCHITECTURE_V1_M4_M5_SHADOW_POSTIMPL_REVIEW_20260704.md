# Memory Architecture V1 — Fable5 M4/M5 Shadow Post-Implementation Review

> 검증자: **Fable5** (독립 검수·구현자 아님) · 2026-07-04 · **판정: PATCH_REQUIRED** (shadow 안전 경계는 무결 — 구현의 계약 정합 결함 수정 후 재검수)
> 대상: fc `shadow/m5-ingress-gate`(a427fd7) · SIASIU `shadow/m4-siasiu-memory`(097f773) · Cosmile `shadow/m4-cosmile-memory`(160578b) vs M2/M3 v1.2·M4/M5 plan·구현 보고(dfa9b17)
> 방법: 3-repo 적대 검수(diff·field-level 대조·empirical 반례) + **회귀 10종 전건 직접 재현** + STOP 15항 검사
> 무결성: 코드 수정 0 · migration 실행 0 · source push 0 · raw/secret/PII 열람 0(DB/logins.txt는 stat만) · live 배선 0 · prod secret 0

---

## A. Verdict: **PATCH_REQUIRED**

**안전 경계는 완벽하다** — STOP 15항 전부 미발생·회귀 10종 전건 재현 일치·미배선/미migrate 확인. 그러나 구현이 **자기 계약/plan과 field-level로 어긋난 결함 3건(FAIL)** 이 있어, 이 상태의 브랜치를 "계약 정합"으로 승인해 M6 planning으로 넘길 수 없다. 전부 shadow-국소 수정(파급 0·revert 용이).

## B. Repo별 검수 결과

### foundation-control (gate) — 구조 PASS · 구현 미완 FAIL 2
- ✅ diff scope 정확(2파일)·**완전 미배선**(server/core/contracts 무변경·import 0) · 핵심 스펙 골격 정합(placement map·blacklist·enum 정본·fact_state 재명세·subject_ref 특례·key 정규화) · 32/32 재현 · hard reject 코드 경로 자체 부재 · 로그=code+index만
- ❌ **[F-1] plan §4 매핑 대비 검증 미구현 다수**(empirical 반례): service_id enum(`evil_service` pass)·version 값(`mctx-9.9` pass)·consent/retention enum 부재·SENSITIVITY dead constant·per-field 상한 9중 6 미집행·grounding.match_level(42자 free-text pass)·catalog name ≤128 미검증
- ❌ **[F-2] echo_strip이 key-level만 strip** — value-level 위반(PII/raw/enum)은 clean에 **verbatim 잔존**(email 잔존·재스캔 not ok 실증) → G-7-5(§8 shadow echo strip 필수) 위반 구조. 멱등 테스트가 key-level만 커버해 미탐
- ⚠ [R-1] 호환모드 미구현(version을 아예 안 읽음 — 항상 strict·안전측이나 배선 시 legacy 오차단·docstring이 편차 인지) · [R-2] 한글 휴리스틱이 catalog 한국어 제품명(`수분크림`) RAW_TEXT 오탐 — 배선 시 REG-1 재발 구조

### SIASIU — B11 PASS · schema skeleton RISK
- ✅ diff 4파일 정확·answer.py 무변경+fingerprint 재계산 일치 · **B11 정합**(unsalted/_DEV_SALT 완전 제거·keyed HMAC·subj_v2_+[:32]·hmac256:·per-secret 상이·domain separation) · invariant 실증(SAFETY∩SINGLE supersede-first active≤1·COALESCE partial unique·must_not_reappear·직교 3-state) · 26/26+16/16 재현 · P3 util 정합(logins.txt 미접촉) · :memory: only·migration/backfill 경로 0
- ⚠ **[R-3] schema shadow DDL = invariant 골격이지 field-complete 아님** — ltm_fact에 consent_scope/retention_policy/sensitivity_level 누락(§3.5 필수)·candidate에 source_ref/raw_text_stored 누락·status DEFAULT 'pending' off-enum. 보고서 "9엔티티" 표현 과대. **실 migration 전 보강 필수**
- ⚠ [R-4] subj_v2_ 파생 원천이 M2 공통규약 체인(FOUNDATION_SUBJECT_REF_SECRET·furef_v2)이 아닌 adapter 자체 secret+synthetic ref(형식 정합·shadow 한정) + dev fallback 하드코딩 — B3/M6 연계 정리

### Cosmile — 원자성/de-anon PASS · 계약 상충 FAIL 1
- ✅ diff 3파일·252 insertions·**순수 append**(기존 model 수정 0)·checkout/order/.ts 무접촉 · **P1/P2 원자성 충족**(동일 commit) · de-anon 정합(same-row null화+검출·payload_refs 중첩 스캔·tref_+HMAC[:32]) · 14/14+prisma validate 재현 · dev.db 무접촉·migrations/ diff 0
- ❌ **[F-3] CommerceMemory를 신규 standalone model로 구현** — M2 §3.7 "**신규 테이블 아님** — 기존 5개 모델에 additive 컬럼(논리 overlay)" 및 M4 plan Cosmile 절과 **정면 상충 + 미신고 deviation**(보고서는 정합인 듯 기술). shadow/미migrate라 revert 용이하나 이대로 migration 승인 불가 — overlay 재구현 또는 명시적 계약 개정 중 결정 필요
- ⚠ [R-5] +9 models도 field-level skeleton(SubjectRefMap.**allow_link** 누락(§3.9 필수·REF-2)·EpisodeSummary.content_hash/session_id·candidate source_ref/raw_text_stored·ConsentRecord version/state enum 등) · COALESCE partial unique의 migration-SQL 이연은 정당(prisma 한계·근거 명시)하나 주석 표현식 1건 계약과 미세 상이

## C. 재현 테스트 결과표 (10/10 전건 일치)

| 항목 | 보고 | Fable5 재현 |
|---|---|---|
| Foundation gate tests | 32/32 | ✅ 32/32 |
| Foundation runner | 83/89·추가 감소 0 | ✅ 83/89 — 동일 6건(taxonomy 일치·선재) |
| SIASIU candidate adapter | 26/26 | ✅ 26/26 |
| SIASIU schema shadow | 16/16 | ✅ 16/16 |
| SIASIU integration | 39/39 | ✅ (answer_unchanged=true) |
| SIASIU workflow | 119/119 | ✅ (behavior_changed 0·raw_trace_leak 0) |
| answer.py fingerprint | d7f579443f8a110a | ✅ 재계산 일치 |
| Cosmile de-anon | 14/14 | ✅ 14/14 |
| Cosmile readiness | 164/164 | ✅ |
| Cosmile loop | 112/112 | ✅ (trace_clean·no_live_write) |

## D. STOP 조건 위반 여부: **0/15**

raw/PII/secret exposure 0 · migration 0(dev.db/memory.db mtime 선행·migrations diff 0) · backfill 0(UPDATE grep) · hard reject 부재(차단 코드 경로 자체 없음) · prod secret 0 · raw payload log 0(code+index만) · Foundation LTM 0(import=re/copy/json뿐) · memory_read_provider 0 · cross-service 0 · baseline 추가 실패 0 · fingerprint 무변경 · same-row 0 · P1/P2 원자(동일 commit) · P3 util 동반 · 선재 83/89 임의 수정 0.

## E. M6(또는 후속 train)로 넘겨도 되는 항목

기존 W-item 4종 유지 타당: ① consult/chat gate 라이브 배선 ② Cosmile P1/P2 라이브 emit(TS 러너 확보 후) ③ SIASIU P3 라이브 auth 전환 ④ 실 migration(Leo 승인·M4_MIGRATION_PLAN). + ⑤ runner 선재 6건(FOUNDATION c9bb996 기인) 원인 조사 train ⑥ R-4 subj_v2_ 파생체인 정본 연결(B3 연계).

## F. M6 전(정확히는 **merge/재검수 전**) 반드시 고칠 항목 — repo별 patch

1. **fc `ingress_gate.py`+test**: F-1 검증 7종 구현(service_id·version·consent/retention enum·sensitivity 사용·per-field 상한 6종·match_level ≤16·catalog ≤128) · **F-2 echo_strip value-level strip**(PII/raw/enum 위반 필드 제거·멱등 테스트를 value-level로 확장) · R-1 호환모드 분기(version 읽기) · R-2 catalog name/brand/category 한글 휴리스틱 예외 · plan §5 privacy_level 행 테스트 추가
2. **Cosmile `schema.prisma`**: **F-3 CommerceMemory standalone model 제거 → M2 §3.7 overlay 컬럼으로 재구현**(또는 계약 개정을 명시 승인으로 — 무단 deviation 금지) · R-5 필수 필드 보강(allow_link 최우선)
3. **SIASIU `foundation_memory_schema_shadow.py`**: R-3 field-complete DDL 보강(consent/retention/sensitivity·source_ref/raw_text_stored·status enum 정정) — 실 migration gate 전 필수
4. 구현 보고서 정정: F-3 deviation·skeleton 실태(“9엔티티 field-level”이 아님)를 정직하게 반영

## G. 최종 판단

**PATCH_REQUIRED.** 이 batch는 *안전하게* 만들어졌다 — 모든 boundary·baseline·원자성이 재현으로 입증됐다. 그러나 *계약대로* 만들어지지는 않았다 — gate는 자기 plan의 검증표를 다 구현하지 않았고, echo strip은 필수 요구(G-7-5)를 절반만 충족하며, Cosmile은 계약이 금지한 신규 테이블을 무신고로 만들었다. §F의 4개 patch(전부 shadow-국소·revert 용이) 후 **경량 delta 재검수 1회**면 APPROVED_FOR_M6_PLANNING이 합리적 기대치다. live는 그때도 금지.

---
> **한 줄 결론:** 울타리는 튼튼한데, 설계도와 다른 방이 두 개 있다 — 방을 고치기 전엔 입주(M6 planning) 승인은 없다.
