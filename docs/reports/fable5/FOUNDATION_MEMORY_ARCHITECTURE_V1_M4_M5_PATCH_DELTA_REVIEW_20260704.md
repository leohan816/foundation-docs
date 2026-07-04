# Memory Architecture V1 — Fable5 M4/M5 Plan Patch Delta Review (G-1~G-7)

> 검증자: **Fable5** (독립) · 2026-07-04 · **판정: APPROVED_FOR_M4_M5_SHADOW** (조건 2 — 하단 E)
> 대상: patch commit `f7a4621` vs Readiness Review(`f3386e0`) §G/§H · diff 전문 1:1 대조 + 신설 migration plan 14항 checklist + V0 원본/mirror 양측 확인
> 무결성: code change 0 · migration 0 · source repo push 0 · raw 고객 데이터/secret/PII 0 · 구현 실행 0

---

## A. Verdict: **APPROVED_FOR_M4_M5_SHADOW**

G-1~G-7 **전건 반영**(제안 자구 그대로·날조 0) · §H 8건 **전건 반영**. 남은 인간 게이트는 **Leo의 B12 승인**(이제 승인 대상이 성립함)과 **B1 164/164 재현** 2건뿐 — 문서-레벨 blocker 0. WATCH 2건(비차단).

## B. G-1~G-7 반영 확인표

| G | 상태 | 근거 | 문제 | 추가 수정 |
|---|---|---|---|---|
| G-1 B12 문서 | ✅ **14항 전부** | 신설 `M4_MIGRATION_PLAN`: WAL-aware(.backup/VACUUM INTO·naive copy 금지·quiesce/checkpoint)·pre-scan SQL 3종(SINGLE 2-active·MULTI 수렴·subject_key NULL)·결정론 수리(as_of/confidence 승자·tombstone 우선·재실행 동일)·D-8 수리 순서·Prisma reset/`--accept-data-loss` 금지·**subject_ref M4 backfill 금지(M6 단일)**·count/checksum·rollback rehearsal·Leo gate(**승인 전 merge 금지**)·raw 미열람·exit criteria | WATCH-1 | 1줄(하단) |
| G-2 B1 자구 | ✅ | M4 §4 B1 행 — SIASIU commit·`FOUNDATION/foundation/cosmile/` 8파일·Cosmile 부재=정상·잔여=164/164 재현 | 없음 | 없음 |
| G-3 V0 SUPERSEDED | ✅ | **mirror**(`설계문서/shared/`)와 **foundation-control 원본 양쪽** 헤더 반영 — "single source of truth" 취소선+폐기 사유+V1 정본 명시 | 원본 uncommitted | 후속 1(하단 F) |
| G-4 trace_id | ✅ | M4 §6 B2 — keyed-hash(HMAC·per-service) **확정·미저장 옵션 폐기**·same-row 금지 유지·M2 §15 정합 명시 | 없음 | 없음 |
| G-5 B4/B8 | ✅ | B4=**M5 단독 소유**(M4 §10 step3에서 M4-step 제거·M5 §10 단일화 조항)·B8=**backfill 전 확정**(2차 backfill 방지 취지 명문) | 없음 | 없음 |
| G-6 grandfather | ✅ | M4 §5 신설 문단+B5/B14 행 — `episode.text`=baseline grandfather·B14는 신규 write 한정·기존 경로 전환=M6·fingerprint/119 무파괴·강제 migration/암호화/backfill 금지 | WATCH-2(표 포맷) | cosmetic |
| G-7 M5 8건 | ✅ | 하단 C | 없음 | 없음 |

## C. M5 필수 수정 8건 확인표

| item | 상태 | 테스트 가능 | 비고 |
|---|---|---|---|
| 1 nested customer_id reject | ✅ | ✅ `test_reject_nested_identifier` | 재귀 스캔 증명 행 |
| 2 raw session_id key reject | ✅ | ✅ `test_reject_session_id_key` | bare UUID와 별개 행 |
| 3 DELETED_REUSE 재명세 | ✅ | ✅ `test_reject_fact_state_nonmember` | service-side filter 1차 책임 + gate는 fact_state 비멤버 문자열만 — **구현 가능 형태로 정정** |
| 4 /v1/consult/chat touchpoint | ✅ | 정책 명시 | 동일 gate shadow 배선 권고 + 즉시 불가 시 **W-item 등록·M6 전 처리 약속**(§7/§10) |
| 5 shadow echo strip | ✅ | ✅ self-echo test로 검증 | §8 신설 — 위반 필드 session_out strip(재유입 차단·R-3 해소) |
| 6 placement map + validate-전 | ✅ | ✅ | §7.1 신설 — 4-context 배치·**service_context 허용키 0 문제 해소**("SSC 자체 필드" 별도 취급)·gate=`validate_ssc` **이전** 확정 |
| 7 matrix 보강 | ✅ | ✅ 전행 test명 | reject +7행(compat+raw·safety_facts>128·session_ref>128·enum vocab/small_talk)·pass +3행(**legacy 호환 pass**·subj_v2_ pass+strip/code-only log·self-echo+version 재부착) |
| 8 self-echo 즉시 고정·로그 규칙 | ✅ | ✅ | §9 — "M4로 미루지 않음" 명문·로그=enum/code+**path index만**(key-name 미포함) |

## D. B1/B10/B12 최종 상태

- **B1**: 자구 정정 완료 — **close 가능**(잔여 = 164/164 readiness 재현 1회·SIASIU tools 러너).
- **B10**: **close** — mirror+원본 양측 SUPERSEDED(원본은 foundation-control working tree 반영·commit 잔여 — 후속 F-1).
- **B12**: **Leo 승인 대상 성립** — 14항 상세·exit criteria 검증 가능. **남은 Leo 액션 = migration plan 승인 1건**(승인 전 schema merge 금지 조항 확인됨).

## E. 구현 착수 판단

- **M4 schema shadow: 착수 가능** — 준비 작업(브랜치·pre-scan dry-run·B6 분기 설계)은 즉시, **schema merge는 Leo B12 승인 후**.
- **M5 gate shadow: 선착수 가능(즉시)** — B1/B10/B12와 독립·synthetic+self-echo로 검증·패치판 plan 기준.
- **repo별 첫 작업**: ① Foundation — `ingress_gate.py` + 패치판 matrix 테스트(M5 train) ② SIASIU — B6 분기 설계 확정 + pre-scan(additive 컬럼 추가 후) ③ Cosmile — B1 164/164 재현 → P1/P2 patch 설계.
- **구현 전 마지막 STOP**: Leo B12 미승인 상태의 schema merge · P-patch 없는 memory 커밋 merge · shadow 외 모드 활성 · subject_ref backfill 시도 · raw populate.

## F. 추가 patch request — **경미 2건(비차단)**

- **F-1 [후속]**: foundation-control 원본 `contracts/CROSS_PLATFORm_SHARED_MEMORY_CONTRACT_V0.md`의 SUPERSEDED 헤더 수정분을 **다음 control 커밋에 포함**(현재 uncommitted — 유실 방지).
- **F-2 [WATCH-1 자구 1줄]**: migration plan §2 상단에 `★pre-scan은 additive 컬럼 추가(신명칭 매핑: ltm_fact→SIASIU memory_fact·subject_key=COALESCE 파생) 후·index 생성 전에 실행` 추가 — 현행 스키마에는 §2 SQL의 컬럼이 아직 없음(순서 오해 방지).
- WATCH-2(cosmetic): M4 §4 B5/B14 행의 8번째 셀이 7컬럼 표를 초과 — 렌더 잔재·의미 무손상.

## G. 무결성

code change **0** · migration **0** · source repo push **0** · raw 고객 데이터/secret/PII **0** · live/write/promotion **0** · cross-service **0** · Foundation customer LTM **0**. M6 이관 목록 유지 확인(hard reject·prod secret·raw live·real-user·**subject_ref prod backfill**·cross-service·+consult/chat 미배선 시 M6 전 처리).

---
> **한 줄 결론:** G-패치는 전건 명중했다 — 이제 남은 것은 사람의 서명(Leo B12)과 숫자 하나(164/164)뿐이다. **M4/M5 brief를 repo별 Claude Code에 인계해도 된다.**
