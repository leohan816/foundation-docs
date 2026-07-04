# Memory V1 M4/M5 Shadow — PATCH ROUND 1 Report (Fable5 PATCH_REQUIRED 반영)

> 작성: foundation-control · 2026-07-04 · ★shadow-local patch · live 배선 0 · DB migration 0 · prod secret 0 · raw storage live 0 · subject_ref backfill 0 · hard reject 0.
> 기준: Fable5 post-impl review(`..._SHADOW_POSTIMPL_REVIEW_20260704.md`·PATCH_REQUIRED §F) · M2/M3 v1.2 · M4/M5 plan.
> 범위: Fable5 §F 4개 patch(F-1/F-2·F-3·R-3 + R-1/R-2/R-5 + 보고서 정정)로 제한. 계약 개정 아님(구현 수정).

## Fable5 FAIL/RISK 항목 대응표
| 항목 | 등급 | repo | 대응 | 검증 |
|---|---|---|---|---|
| **F-1** plan §4 검증 7종 미구현 | FAIL | fc gate | service_id enum·version strict/unknown reject·consent/retention/sensitivity enum·per-field 상한 전종·grounding.match_level≤16·catalog name/brand/category≤128 **전부 구현** | gate 44/44(신규 F1 9행) |
| **F-2** echo_strip key-level만 | FAIL | fc gate | **value-level strip**(PII/raw/enum 위반 value None/del·nested 포함)·재스캔 ok·멱등 테스트 value-level 확장 | F2 3케이스 PASS(email/nested/echo_strip 멱등) |
| **F-3** CommerceMemory standalone | FAIL | Cosmile | standalone model **제거** → 기존 commerce 4모델 additive **overlay 컬럼**(memorySubjectRef·memoryOverlayJson·M2 §3.7) | prisma validate PASS·standalone 0·overlay 4모델 |
| **R-1** 호환모드 미구현 | RISK | fc gate | version **읽어** strict(mctx-1.0)/compat(생략) 분기·legacy 정상 payload 무과차단 | legacy_version_missing pass·mctx-9.9 reject |
| **R-2** 한글 catalog 오탐 | RISK | fc gate | catalog name/brand/category **한국어 예외**(length/PII만·raw-text 미검사)·raw utterance는 계속 reject | R2_catalog_korean_name pass·raw_utterance reject |
| **R-3** SIASIU schema skeleton | RISK | SIASIU | ltm_fact consent_scope/retention_policy/sensitivity_level·candidate source_ref/raw_text_stored·status enum CHECK **보강** | shadow schema 16→21 |
| **R-5** Cosmile field skeleton | RISK | Cosmile | SubjectRefMap.allowLink(§3.9 REF-2)·EpisodeSummary.contentHash/sessionId·candidate sourceRef/rawTextStored·ConsentRecord version/state **보강** | prisma validate PASS |
| **보고서 과대표현** | (F §F-4) | docs | 원본 report에 PATCH-1 정정 배너 + "9엔티티 field-level" 완화·F-3 deviation·skeleton 실태 명시 | 본 patch + 원본 정정 |
- ★R-4(subj_v2_ 파생체인)·runner 선재 6건 = **M6/후속 train**(§E·이번 patch 범위 밖).

## repo별 수정 파일 / commit
| repo | branch | commit | 수정 파일 |
|---|---|---|---|
| foundation-control | `shadow/m5-ingress-gate` | **`8f27a08`** | `foundation_http_service/ingress_gate.py` · `tests/test_ingress_gate.py` |
| SIASIU | `shadow/m4-siasiu-memory` | **`70a9235`** | `app/ssbrain/foundation_memory_schema_shadow.py` · `app/tests/test_foundation_memory_schema_shadow.py` |
| Cosmile | `shadow/m4-cosmile-memory` | **`caa6fb5`** | `app/prisma/schema.prisma` |
- ★제품 repo main 무변경(fc `ee055ef`·SIASIU `3cd068d`·Cosmile `3ba91e0`)·전부 shadow 브랜치 local·**push 0**.

## 테스트 결과표 (재검증)
| 항목 | patch 전 | patch 후 |
|---|---|---|
| Foundation gate tests | 32/32 | **44/44**(F-1/F-2/R-1/R-2/privacy_level 신규) |
| Foundation runner baseline | 83/89 | **83/89**(추가 감소 0·선재 6 무수정) |
| SIASIU candidate adapter | 26/26 | **26/26**(무변경) |
| SIASIU schema shadow | 16/16 | **21/21**(field-complete 신규) |
| SIASIU integration | 39/39 | **39/39**(answer_unchanged) |
| SIASIU workflow | 119/119 | **119/119**(behavior_changed 0) |
| answer.py fingerprint | d7f579443f8a110a | **d7f579443f8a110a**(unchanged) |
| Cosmile de-anon | 14/14 | **14/14**(P1/P2 유지·same-row 0) |
| Cosmile prisma validate | PASS | **PASS 🚀** |
| Cosmile readiness | 164/164 | **164/164** |
| Cosmile loop | 112/112 | **112/112**(trace_clean·no_live_write) |

## STOP 조건 위반: **0**
raw/PII/secret exposure 0 · DB migration 0(memory.db/dev.db mtime 07-03 유지) · subject_ref backfill 0 · hard reject 0(SHADOW_MODE·차단 코드 부재) · prod secret 0(dev fallback) · raw payload log 0(code+index만) · Foundation durable customer memory 0 · memory_read_provider 0 · cross-service 0 · baseline 추가 실패 0 · answer.py fingerprint 무변경 · trace_id↔raw same-row 0 · **CommerceMemory standalone 제거(overlay)** · SIASIU field-complete 보강 완료 · echo_strip value-level PII 잔존 0.

## raw/secret/PII · migration · live/write/promotion
- raw 고객데이터/secret/PII 열람 **0**(synthetic/:memory:/dummy만·memory.db·dev.db·logins.txt 미열람·dev fallback secret).
- DB migration **0** · live/write/promotion **0** · subject_ref backfill **0** · 서버 잔여 0.

## rollback 방법 (batch별 독립)
- fc: `git checkout main`(gate는 shadow 브랜치만).
- SIASIU: `git checkout main`(schema shadow 파일 revert·additive·answer.py/adapter 무영향).
- Cosmile: `git checkout main` 또는 caa6fb5 revert(overlay 컬럼/필드 append revert·기존 컬럼 무변경·dev.db 무영향).
- 3 브랜치 전부 local·push 0 → 제품 repo main/remote 무영향.

## Fable5 delta 재검수 요청 프롬프트 (초안·경량 1회)
```
[MEMORY V1 M4/M5 SHADOW — PATCH1 DELTA 재검수(경량)]
대상(local·unpushed): fc shadow/m5-ingress-gate(8f27a08) · SIASIU shadow/m4-siasiu-memory(70a9235) · Cosmile shadow/m4-cosmile-memory(caa6fb5)
기준: post-impl review §F(F-1/F-2/F-3/R-1~R-5) · 본 PATCH1 report.
검증(코드 0·재현만·delta만):
 ① F-1: service_id enum(evil_service reject)·version(mctx-9.9 reject·legacy compat pass)·consent/retention/sensitivity enum·per-field 상한·match_level≤16·catalog≤128 — empirical 반례 재현
 ② F-2: value-level strip — email/nested PII 주입 → clean 재스캔 ok·echo_strip 멱등 실증
 ③ F-3: CommerceMemory standalone 부재·기존 4모델 overlay 컬럼 확인·prisma validate PASS
 ④ R-2: catalog 한국어 제품명 pass·raw utterance reject
 ⑤ R-3/R-5: SIASIU field-complete(consent/retention/sensitivity·source_ref/raw_text_stored·status CHECK)·Cosmile allowLink/contentHash/sourceRef/consent state
 ⑥ 회귀: gate 44/44·runner 83/89(추가감소 0)·SIASIU 39/39·119/119·fingerprint·Cosmile de-anon 14/14·readiness 164/164·loop 112/112
 ⑦ STOP 15항 + 미배선/미migrate/dev.db mtime/subject_ref backfill 0
판정: APPROVED_FOR_M6_PLANNING(live는 계속 금지) → M4 migration(Leo 승인)·라이브 배선 후속 / PATCH_REQUIRED → 재수정.
금지: 코드 수정·migration·source push·raw/secret 열람. 재현/검증만.
```

## 무결성
source 제품 repo push 0 · DB migration 0 · subject_ref backfill 0 · hard reject 0 · prod secret 0 · raw payload/PII/secret log 0 · Foundation durable customer memory 0 · memory_read_provider 0 · cross-service 0 · answer.py fingerprint 무변경 · 4 baseline 무회귀 · 3 shadow 브랜치 local(push 0) · 본 report + 원본 정정만 foundation-docs commit/push.
