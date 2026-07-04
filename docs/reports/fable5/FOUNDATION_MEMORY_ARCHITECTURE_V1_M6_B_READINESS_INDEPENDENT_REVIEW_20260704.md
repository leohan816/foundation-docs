# Memory V1 — Fable5 M6-B Migration Readiness Independent Review

> 검증자: **Fable5** (gate-specific 독립 검수) · 2026-07-04 · **판정: APPROVE_WITH_WATCH**
> ★본 검수 = **readiness package 검수 only.** 실 migration/prod DB/repair 적용/live/hard reject/prod secret/backfill 승인 **아님.** Leo readiness approval 판단 보조용.
> 무결성: 코드 수정 0 · migration 0 · DB 상태 변경 0 · backup/repair/dry-run 실행 0 · prod DB 접근 0 · raw/PII/secret 열람 0(DB stat만) · source push 0(본 리뷰 문서만) · schema code main merge 0.

---

## 1. Fact (직접 확인)

- **읽은 repo/ref:** `leohan816/foundation-docs`, GitHub 원격 **`98d2043`**(= origin/main 조상·`git merge-base --is-ancestor` 확인) 기준으로 `git show 98d2043:<path>` 직접 판독.
- **주 대상:** `docs/reports/control/FOUNDATION_MEMORY_ARCHITECTURE_V1_M6_B_MIGRATION_READINESS_REPORT_20260704.md`
- **보조(원격 직접 판독):** `..._M4_MIGRATION_PLAN_...`(M6-B banner 실재 확인) · `..._M6_A_WATCH_PATCH_REPORT_...`(WATCH-1/2/3 CLOSED) · `..._M6_PLANNING_...` · `fable5/..._PATCH1_DELTA_REVIEW_...` · `설계문서/foundation/{COMMON_SERVICE_MEMORY_CONTRACT,MEMORY_CONTEXT_CONTRACT}_V1_...`
- **M6-B report 핵심:** WAL-safe backup 계획(§2) · non-prod/sanitized/disposable dry-run **계획**(§3·Control 미수행) · pre-scan SQL(§4·aggregate/count/hash) · deterministic repair **rule+후보 산출만**(§5·적용 금지) · row count/checksum 기준(§6) · rollback rehearsal **절차**(§7) · STOP 점검표(§8) · Leo readiness approval package(§11·실행 승인 아님 명시).
- **M4_MIGRATION_PLAN addendum 반영:** ✅ plan:3에 M6-B supplement banner 실재 — M6-A 반영분(status candidate·overlay 5모델·retention 정본·repo별 명칭 상이)의 정본을 M6-B addendum으로 pointer. 전면 개정 없이 정합.

### 확인 가능한 사실 vs 확인 불가 (코드 레벨 교차검증)
| 항목 | Fable5 직접 확인 | 결과 |
|---|---|---|
| foundation-docs 보고서/계약 | GitHub 원격 `98d2043` 직접 판독 | ✅ 원격 검증됨 |
| shadow M6-A 커밋(fc `1c79943`·SIASIU `ab0937b`·Cosmile `334b830`) | local `git cat-file` + `branch -r --contains` | ✅ **존재·전부 원격 미push(local-only)** — M6-B §1.2 정직 표기 **사실** |
| PATCH1 미해소 watch(status 'pending') | `ab0937b:...schema_shadow.py:37` | ✅ `DEFAULT 'candidate' CHECK(candidate\|approved\|rejected)` — **WATCH-1 진짜 CLOSED** |
| Cosmile prisma table명 매핑·boolean 저장 | `334b830:schema.prisma`(@@map 부재·`Boolean @default(false)`) | ❓ **실제 미확정** — M6-B의 "introspection 필요"는 **과대표현 아님·정직** |
| 실 memory.db/dev.db 데이터·dry-run·rollback 결과 | 미열람/미실행(의도적·금지) | ⛔ 부재 — M6-B가 watch로 유지 |

## 2. 판단 (A~J 게이트)

| 게이트 | 판정 | 근거 |
|---|---|---|
| **A. M6-B scope integrity** | ✅ | 문서 전반이 "readiness/Leo approval gate only"·§11 "DB 상태 변경 승인 아님" 명시. readiness↔execution approval 분리(§10/§11·후속 M6-C~H 각 별도 Leo 승인) |
| **B. Control role integrity** | ✅ | §2/§3/§7 반복 "Control 미수행·지시/검증/보고"·구현자 수행 표현 0. front-matter에 Control 비수행 목록 명시 |
| **C. Evidence separation** | ✅ | §1.2 확인범위 3분류(원격/​local/​미확인)·shadow 3브랜치 "원격 0건" 명시 — **코드로 교차검증해 사실 확인**(local-only·과대표현 없음) |
| **D. WAL-safe backup** | ✅ | naive copy·`.db`-only **금지**·`.backup`/`VACUUM INTO`·`PRAGMA integrity_check`+count+checksum·prod 대상 아님·raw/PII 출력 금지 전부 존재 |
| **E. dry-run plan** | ✅ | non-prod/sanitized/disposable 한정·Control 미수행·prod/PII/secret/backfill 금지·**실 dry-run 결과 부재는 watch로 유지** |
| **F. pre-scan SQL** | ✅ | aggregate/count/hash만·raw identifier SELECT 0·SIASIU 실명칭 확정(`ltm_fact`)·Cosmile는 "introspection 필요"로 명시(확정 사실화 안 함) |
| **G. deterministic repair** | ✅ | 실행/적용 **금지**·후보 산출+rule 문서화만·Leo 승인 후 후속 train 분리·tombstone must_not_reappear·pending/off-contract retention **자동 변환 금지** |
| **H. row count/checksum** | ✅ | 기존 row count/컬럼 checksum 전후 일치·새 nullable 무변경·raw/PII/secret 미출력·count/hash/boolean 보고 |
| **I. rollback rehearsal** | ✅ | WAL-safe artifact 기준 restore→integrity_check→count→checksum·**실 결과 부재는 watch**·prod restore 여지 없음 |
| **J. Leo approval gate** | ✅ | 요청이 "M6-B readiness approval"로 제한·"readiness 이후에도 실 migration 별도 승인" 명시 |

- **STOP 조건(요청 §5 18항) 스캔:** 위반 **0**. 위험 문구(prod DB 접근·raw/PII/secret 열람·repair 적용·live·hard reject·migrate reset·db push --accept-data-loss·same-row 결합) 없음. §4.2(11) Cosmile same-row 체크는 **COUNT aggregate**(raw SELECT 아님)이고 "de-anon 미배선·M6-E 검증" 명시 — STOP 아님.
- **§7 문장 기준 12항:** 전부 문서에 살아있음(readiness≠execution·Control=orchestrator·local shadow≠GitHub-verified·dry-run 계획≠결과·rollback 절차≠결과·repair rule≠적용·후속 별도 gate).

## 3. 리스크 / 남은 watch (전부 후속 gate로 정당 분리·닫힌 것으로 처리 안 됨)

1. **shadow 코드 원격 미검증** — M6-A 반영(status/overlay/retention)은 local-only. Leo approval 시 push 또는 local 접근으로 코드 원격검증 경로 필요. (readiness 판단은 계획 완결성 기준 가능·코드 검증은 후속)
2. **Cosmile prisma 명칭/boolean 미확정** — `@@map` 부재로 모델명↔물리 table명, `Boolean` SQLite 저장(0/1 vs true/false)이 실제 미확정. **pre-scan SQL 실행 전 non-prod introspection에서 확정 필수**(현재 "확인 필요"로 정직 표기).
3. **실 dry-run 결과 부재** — §3은 계획일 뿐. non-prod 재현 결과는 후속 실행 gate.
4. **rollback rehearsal 결과 부재** — §7은 절차일 뿐. 실 복구 검증은 후속.
5. **repair 후보 산출 ≠ 적용** — winner 오판·tombstone 되살림 위험은 적용 gate(Leo 승인)에서 재검증.
6. **실 migration/prod DB/live/hard reject/prod secret/backfill** — 전부 미승인·각 별도 M6-C~H gate.
- ★위 1~6은 요청 §4 "닫으면 안 되는 watch" 목록과 일치하며, M6-B report가 **전부 watch로 유지**함을 확인.

## 4. 권고: **APPROVE_WITH_WATCH**

M6-B readiness package는 독립 검수 기준을 충족한다 — scope가 readiness/approval gate에 머물렀고(A/J), Control이 오케스트레이터로 남았으며(B), 문서-검증과 코드-검증을 정직하게 분리했다(C·코드 교차검증으로 확인). backup/dry-run/pre-scan/repair/checksum/rollback/Leo gate 6요소가 안전하게 **계획 수준으로** 설계됐고, 실행/적용/prod는 전부 금지·후속 분리다. 내가 PATCH1에서 남긴 status enum watch도 M6-A에서 진짜로 닫혔다. **Leo readiness approval 판단으로 넘길 수 있다** — 단 §3의 6개 watch(특히 Cosmile introspection·dry-run/rollback 실결과·코드 원격검증)는 후속 gate에서 반드시 닫아야 하며, 본 승인은 **DB 상태 변경 승인이 아니다.**

## 5. Minor patch 제안 (문구 단위·선택)

- **P-1 [경미]** M6-B §4.2(11) Cosmile same-row COUNT SQL의 컬럼(`customer_id`/`foundation_trace_id`)도 **Cosmile 명칭 미확정 대상**임을 1줄 명기(현재 (1)~(7)에만 introspection 주의가 붙음) — same-row 체크가 M6-E 소관임은 이미 명시됨.
- **P-2 [경미]** §1.1이 docs-main을 `910b73b`로 인용하나 본 검수 시점 origin/main HEAD는 `98d2043`(M6-B 커밋 자신) — "본 report 병합 후 main은 98d2043"으로 1줄 갱신하면 해시 참조가 시점정합. (내용 영향 0)
- ★코드/​migration/​backup/​repair/​dry-run/​push 지시 없음 — 문구 제안만.

## 6. 최종 무결성

M6-B = readiness package review only · 실 migration approval 0 · prod DB access approval 0 · repair 실행/적용 approval 0 · live wiring approval 0 · hard reject approval 0 · prod secret/backfill approval 0 · code modification 0 · source push 0(본 리뷰 문서만) · backup 실행 0 · dry-run 직접 실행 0 · raw/PII/secret access 0 · schema code main merge 0. **본 결론은 Leo readiness approval 판단 보조이며, 실 migration/DB 상태 변경 승인이 아니다.**

---
> **한 줄 결론:** 계획서는 계획서답게, 실행은 실행 gate로 — 경계가 정직하게 그어졌고 local 실태도 표기 그대로였다. readiness 승인으로 넘겨도 되지만, 입주(migration)는 여전히 다음 문 너머다.
