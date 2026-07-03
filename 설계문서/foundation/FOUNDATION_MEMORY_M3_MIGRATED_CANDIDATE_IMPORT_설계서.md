# FOUNDATION MEMORY M3 — migrated_candidate IMPORT 설계서

> **버전 v0.1 · 2026-06-27 · M3 설계 (DESIGN ONLY)** — M2.2 전체 inventory(6,949건)를 Foundation memory *candidate* 저장소로 이전하는 규칙·형식·매핑·충돌방지·PII보호·rollback·audit 설계.
> ★**이번 작업 = 설계만.** 실제 import 실행·Foundation DB/store 생성·고객 원문 읽기/저장·stable 승격·Trust Gate 구현 *전부 0* (§10).
> **근거:** `SIASIU_MEMORY_AUDIT_REPORT.md`(M0) · `FOUNDATION_MEMORY_TRUST_MIGRATION_설계서.md`(M1) · `FOUNDATION_MEMORY_INVENTORY_EXPORT_설계서.md`(M2.0) · `memory_migration/M2.1_DRY_RUN_RESULT.md` · `M2.2_FULL_EXPORT_RESULT.md`.
>
> **변경이력**
> - v0.1 (2026-06-27) — 최초. M3 정의·입력·출력위치·status매핑·고객보호·provenance·idempotency·audit/rollback·15 test 설계.

---

## 0. 위치 (전체 로드맵)
M0✅ → M1✅ → M2.0✅ → M2.1✅ → M2.2✅ → **M3 설계(이 문서)** → M3.1 실행 → M4 review/supersede/deprecate → M5 stable → M6 Trust Gate.

## 1. M3의 정의
**M3 = M2.2 inventory를 Foundation memory *candidate* 영역으로 가져오는 단계.** stable 아님.
- 모든 기존 memory = 기본 `migrated_candidate`.
- **stable 0건 유지** · 고객 memory 원문 *계속 저장 안 함* · 결과물 = *review 대상 후보 저장소*(M4 입력).
**명시 (M3가 *아닌* 것):**
```
M3 ≠ stable 승격 · ≠ Memory Trust Gate · ≠ 고객 원문 이전 · ≠ 자가성장 지식층 구현 · ≠ SIASIU 서비스 통합
```

## 2. 입력 소스 (★M2.2 inventory만)
- **입력:** `.foundation_memory_export_staging/full.memory_inventory.jsonl`(6,949) + `full.dry_run_report.json`(검증 메타).
- **주의 (재읽기 금지):** 원본 `memory.db` 재읽기 ❌ · 작업 `.md` 수정 ❌ · Vault 수정 ❌ · episode 원문 읽기 ❌ · **고객 원문 복원 시도 ❌**.
- M3는 *inventory(이미 masked)만* 소비 → 고객 원문에 *접근 자체를 안 함*(구조적 PII 보호).

## 3. 출력 위치 설계 (후보 비교 → 추천)
| 후보 | 장점 | 단점 |
|---|---|---|
| `foundation_memory_candidates/` (SIASIU repo) | 가까움 | ★메모리=Foundation 소유 경계 위반 · SIASIU repo에 고객 hash |
| **`~/Project/FOUNDATION/foundation_trust/memory_candidates/`** | ★경계 맞음(메모리=Foundation·Trust Core Layer A 아래)·M4~6 입력으로 자연스러움 | 고객 hash 포함 → **gitignore 필수** |
| `.foundation_memory_migration_store/` (로컬·gitignore) | 미커밋 안전·중립 | 위치 임시적·소유 모호 |
**★추천: `~/Project/FOUNDATION/foundation_trust/memory_candidates/`** (Foundation Trust Core 아래) + **gitignore.**
- 이유: 메모리 = Foundation 소유(경계 정정) · Trust Core(Layer A) 아래가 M4/M5/M6 입력의 논리적 위치.
- **export staging ≠ candidate store** 구분: staging = *읽기 스냅샷*(휘발) / candidate store = *이전 후보 정본*(M4~6 입력).
- **공개 커밋 판단:** ★고객 `contentHash`/meta 포함 → **gitignore / private storage** (공개 커밋 ❌). 도구·테스트·요약(PII 0)만 커밋.

## 4. 상태값 매핑 규칙 (★결정)
**★결정: M3는 *최대한 보수적* — 전부 `migrated_candidate`로 넣고, 기존 `superseded`만 보존. reviewed/deprecated는 M4에서.**
| M2.2 statusCandidate | M3 status | 근거 |
|---|---|---|
| `migrated_candidate` | `migrated_candidate` | 기본값 |
| `reviewed_candidate` (지식 source有·고객 active) | → **`migrated_candidate`** (보수적 강등) | M3에서 *reviewed 안 씀* — 실재/근거 확인은 M4 |
| `superseded` (고객) | `superseded` | 기존 대체관계 보존 |
| stale/archive 후보 | `migrated_candidate` + `deprecatedReason` 후보 태그 | deprecated 처리는 M4 |
**명시 결정 (Leo 권장 채택):**
- **M3에서 실제 `reviewed` 상태 안 쓴다** — 전부 `migrated_candidate`(+ 기존 superseded 보존).
- `reviewed`/`deprecated`/실재확인/충돌정리 = **전부 M4.**
- ★**stable 절대 생성 0** (모든 경로에서).

## 5. 고객 memory 보호 규칙 (M2.2와 동일·유지)
**필수 (candidate에도 그대로):**
```
contentPreview = [MASKED] · rawContentExported = false · structurePreview.value = [MASKED]
contentHash만 저장 가능 · piiRisk = estimated · sensitivity = estimated · consentState = unknown
고객 원문 복원 ❌ · episode 원문 이전 ❌ · 고객 이름/user.name 저장 ❌
```
- M3 설계에서 **고객 memory = 기본 `high-risk` 분류** (sensitivity≥personal·piiRisk=high).
- **고객 memory는 M4/M5에서 아래 *전까지* stable 금지:** 동의 정책 · 삭제/철회 정책 · 보존 기간 · 민감도 분류 · PII 저장 정책 · 고객 데이터 접근권한 정책.

## 6. provenance / source_ref / evidence_ref 처리
**provenance_origin (필수·전 candidate):**
| 소스 | provenance_origin |
|---|---|
| 작업 memory | `imported_from_claude_working_memory` |
| 고객 memory | `customer_provided` (또는 `imported_from_siasiu`) |
| 지식 Vault | `imported_from_vault` (frontmatter에 ai_learned면 보존) |
| 자가성장 후보 | `self_growth_knowledge_candidate` / `ai_learned` 후보 — ★현재 이전 대상 아님 |
**source_ref:** 작업=원본 .md 경로/파일id · 고객=`memory_fact:id`+hash+meta(★raw path 아님) · 지식=Vault path · episode=원문 이전 ❌·count/meta만.
**evidence_ref:** 지식 claim에 우선 · 없으면 `null` · **evidence_ref 없음 = stable 금지 reason**(M5에서).

## 7. dedup / idempotency 설계 (★반복 실행 안전)
- **deterministic memoryId:** `mem_` + `sha256(source_ref + "|" + contentHash + "|" + memoryType)[:16]`. → 같은 inventory 재import = 같은 id.
- **이미 존재하면 skip** (update 금지 — M3는 *추가만*·기존 candidate 불변).
- **dry-run mode** 필수(실제 쓰기 전 시뮬·report만).
- **import report:** `candidateCount` · `duplicateCount`(skip) · `conflictCount` · `errorCount`.
- ★**idempotent:** 같은 inventory 2회 import → 2회차 신규 0·중복 N.

## 8. audit / rollback 설계 (M3부터 쓰기 시작)
**audit 필수 필드:**
```
importBatchId · importedAt · sourceInventoryChecksum(full.memory_inventory.jsonl sha256)
candidateCount · skippedCount · errorCount · ★stableCount==0 assertion
candidateStoreChecksum_before / _after
```
**rollback 설계:**
- **rollback manifest:** 이 batch가 만든 memoryId 목록.
- ★**rollback = 그 batch가 만든 candidate만 제거 가능** (기존 candidate·원본 SIASIU memory 불변).
- **원본 SIASIU memory는 절대 안 건드림**(rollback도 candidate store 안에서만).
- rollback도 audit 남김(`rollbackBatchId`·`rolledBackCount`·`rolledBackAt`).

## 9. validation / tests 설계 (M3.1 실행 전 통과 필수 — 15)
```
 1. stable 0건                        9. rollback manifest 생성
 2. 고객 rawContentExported=false     10. sourceInventoryChecksum 일치
 3. 고객 contentPreview=[MASKED]      11. 원본 inventory 수정 없음
 4. structurePreview.value=[MASKED]   12. candidate store 외부 쓰기 없음
 5. episode 원문 없음                 13. provenance_origin 필수(전 candidate)
 6. deterministic memoryId            14. importAuditId/auditLogId 필수
 7. 같은 inventory 2회 import 중복 0   15. M4 전 reviewed/stable 승격 없음
 8. importBatchId 생성
```

## 10. M3에서 하지 않을 것 (명시)
```
❌ 실제 import 실행 · ❌ Foundation DB schema 변경 · ❌ migration store 생성 · ❌ stable 승격
❌ 고객 원문 저장 · ❌ episode 원문 저장 · ❌ Trust Gate 구현 · ❌ M4 review · ❌ M5 stable · ❌ M6 gate
❌ 검색/RAG/LLM/API 호출 · ❌ SIASIU/Cosmile 서비스 통합
→ 이 문서 = *이전 규칙 설계만.* 유일한 쓰기 = 이 .md 1개.
```

## 11. M3.1 실행 가능 여부 / 다음
- M3.1 = 이 설계대로 *dry-run → 실제 import*(candidate store에 migrated_candidate 생성). **별도 작업·Leo 승인 후.**
- M3.1도 M2처럼 *dry-run 먼저*(중복 0·stable 0·checksum 검증) → 보고 → 전체 import.
- candidate store 위치(§3 추천) + gitignore = M3.1 시작 시 확정.

---
## 완료 보고 (이 설계서)
**생성:** `설계문서/FOUNDATION_MEMORY_M3_MIGRATED_CANDIDATE_IMPORT_설계서.md`(v0.1).
**M3 설계 요약:** inventory 6,949 → Foundation candidate store로 *전부 migrated_candidate*(보수적)·stable 0·고객 masked 유지·idempotent·rollback/audit.
**핵심 결정:** ①출력=`FOUNDATION/foundation_trust/memory_candidates/`(gitignore) ②전부 migrated_candidate(superseded만 보존·reviewed/deprecated는 M4) ③고객 high-risk·동의/삭제 전 stable 금지 ④memoryId=deterministic hash·idempotent ⑤rollback=batch candidate만.
