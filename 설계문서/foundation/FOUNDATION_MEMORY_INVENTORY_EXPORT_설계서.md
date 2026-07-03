# FOUNDATION MEMORY INVENTORY EXPORT 설계서 (M2.0)

> **버전 v0.1 · 2026-06-27 · M2.0 설계 (DESIGN ONLY)** — SIASIU 메모리 3종을 *읽기전용·masked*로 inventory export하기 위한 *설계*. ★실제 export 실행 아님.
> **M2 분할:** **M2.0 = export 설계(이 문서)** · M2.1 = 샘플 dry-run + PII 마스킹 확인 · M2.2 = 읽기전용 전체 export.
> ★**이번 작업 = 설계만.** 실제 export·DB/파일 읽기 실행·이전·승격·stable·PII 원문 출력 *전부 0* (§11).
> **근거: `FOUNDATION_MEMORY_TRUST_MIGRATION_설계서.md`(M1) · `SIASIU_MEMORY_AUDIT_REPORT.md`(M0).**
>
> **변경이력**
> - v0.1 (2026-06-27) — 최초. M2 3분할·export record schema·★PII masking 정책·종류별 규칙·원본불변 보증·dry-run 체크리스트.

---

## 0. 목적 / 위치
**목적:** 기존 메모리(작업18·고객 memory_fact·지식 Vault)를 Foundation 이전 *전에* **읽기전용으로 목록화(inventory)** 하는 *방법을 설계*. 이전·승격이 아니라 *"무엇이 있는지 안전하게 본다".*
**왜 설계부터:** M2부터 실제 파일·DB를 읽는다 → 특히 고객 `memory.db`는 *PII 평문*(감사 §6 위험5). 바로 읽으면 위험 → **마스킹·원본불변 규칙을 *설계에서 먼저 확정*.**

## 1. M2 절대 원칙 (읽기전용 inventory)
> M2는 *이전도·승격도·stable 처리도 아니다.* 오직 *읽고 → 목록화*.
1. **원본 불변.** export 전후 checksum 동일(§9).
2. **DB 수정 금지 · 메모리 수정 금지 · 삭제 금지.**
3. **stable 승격 금지.** 모든 항목 = `migrated_candidate` 또는 *기존 status mapping 후보*로만 표시(§7).
4. **고객 PII 원문 출력 금지.** export 결과 = 기본 **masked**(§5).
5. **export 결과물 자체도 민감** → gitignore·로컬 staging·미커밋(§8).
6. **읽기 전용 접근**(SELECT only·파일 read only·write/DDL 금지).

## 2. M2 단계 (이 설계가 정의)
| 단계 | 무엇 | 실행? | 비고 |
|---|---|---|---|
| **M2.0** | export *설계서* (이 문서) | ❌ 설계만 | record schema·masking·원본불변 규칙 확정 |
| **M2.1** | *샘플* dry-run + PII 마스킹 검증 | 소량 읽기 | 작은 표본으로 *마스킹 작동·원본 불변* 확인 → 보고 후 승인 |
| **M2.2** | 읽기전용 *전체* export | 전체 읽기 | M2.1 검증 통과 후에만 · 여전히 masked·원본 불변 |
**★각 단계 = Leo 승인 게이트.** M2.0 승인 없이 M2.1 금지, M2.1 검증 없이 M2.2 금지.

## 3. Export 대상 3종 + 읽기 방식
| 메모리 | 소스 | 읽기 방식 | 민감도 |
|---|---|---|---|
| **작업 메모리** | `~/.claude/.../memory/*.md`(18) | 파일 read-only(frontmatter+본문) | 저(프로젝트·드물게 개인참조) |
| **고객 메모리** | `app/data/memory.db`(memory_fact·episode·user) | ★SQLite **read-only 연결**(SELECT만·`PRAGMA query_only=ON`) | ★고(PII 평문) |
| **지식 메모리** | Vault `knowledge/`(성분297·뷰티·건강) | 파일 read-only | 저(공개 지식·provenance 有) |
**공통:** 읽기 전 `checksumBefore`, 읽은 후 `checksumAfter` 기록(§9). episode(대화원문)는 *count/메타만*·내용 export ❌.

## 4. Export Inventory Record schema (draft)
> 각 메모리 1개 → inventory record 1개. (M1 §3 공통필드와 정렬·단 *추정값* 표시.)
```yaml
exportId:            string
sourceSystem:        enum(working_memory | customer_memory | knowledge_vault)
sourceLocator:       string        # 파일경로 또는 table:rowId (★값 아님)
memoryType:          enum(M1 §3.b · "estimated")
suggestedStatus:     enum          # migrated_candidate | 기존 status mapping 후보 (§7) — ★stable 절대 없음
suggestedProvenance: enum(M1 §3.a · "estimated")
# --- 내용 (★마스킹) ---
contentPreview:      string|"[MASKED]"   # §5 정책
contentHash:         sha256        # 원문 해시(무결성·dedup·원문 미노출)
rawContentExported:  bool          # ★고객=false
structurePreview:    object|null   # 예: {type: skin_type, value: "[MASKED]"} — 구조만, 값 가림
# --- 추정 메타 (rule-based) ---
piiRisk:             enum(none|low|med|high · "estimated")
sensitivity:         enum(M1 §3.c · "estimated")
consentState:        enum(M1 §3.d · 기존=unknown)
# --- 출처 (지식) ---
source_ref:          string|null
evidence_ref:        string|null
# --- 추적 ---
sizeMeta:            object        # {chars, fields} (내용 아님)
exportPolicyVersion: string
exportedAt:          ts
checksumBefore:      string        # ★원본 불변 증명
checksumAfter:       string
```

## 5. ★PII Masking 정책 (가장 중요 — 고객 메모리)
**기본값 = masked.** memoryType·sensitivity·piiRisk로 *마스킹 강도* 결정:
| 대상 | contentPreview | contentHash | structurePreview | rawContentExported | 원문 |
|---|---|---|---|---|---|
| **고객 메모리** | ★`[MASKED]` | ✅ sha256 | 구조만(예 `{type: avoid_ingredient, value:[MASKED]}`) | ★**false** | ★별도 승인·*로컬만*·**미저장** |
| **작업 메모리** | 허용(저PII) · 단 piiRisk≥med 감지 시 mask | ✅ | n/a | true(저PII) | — |
| **지식 메모리** | 허용(공개) + source/provenance | ✅ | n/a | true | — |
**고객 메모리 export 기본형 (Leo 명시):**
```yaml
contentPreview: masked
contentHash: yes
piiRisk: estimated
sensitivity: estimated
rawContentExported: false
```
**piiRisk 추정 = rule-based(휴리스틱 아님·결정론):** memoryType=customer_profile_consultation → 기본 high · fact `type`이 안전군(allergy·pregnancy_nursing) → regulated · 그 외 customer → personal 이상. *값 내용을 파싱해 추측하지 않는다*(타입·출처로 결정).
**원문 접근:** *반드시* 별도 Leo 승인 → *로컬에서만 표시* → *저장/커밋/전송 ❌*.

## 6. 종류별 Export 규칙
**A. 작업 메모리(.md):** frontmatter(name·type·description) + 본문 preview 허용. suggestedStatus=`migrated_candidate`. stale 2개(`foundation-project`·`foundation-bombrain`)는 `deprecated 후보` 태그. code_ref 포함 메모리는 `code_reference_unverified` 플래그(M2에선 확인 안 함·M4에서).
**B. 고객 메모리(memory.db):** ★§5 masked. `memory_fact`는 *type·status·confidence·as_of*(메타)만 + value=`[MASKED]`+hash. 기존 status mapping 후보(§7). `episode`(대화원문)=*count만*. `user`=*user_id 존재 여부만*(이름·PII ❌).
**C. 지식 메모리(Vault):** preview 허용 + `provenance_origin`·`source_ref`·`evidence_ref` 보존. 성분(§1.6 Opus 거침)=`reviewed 후보`. ai_learned는 origin 보존(세탁 ❌).

## 7. status 표시 규칙 (★stable 없음)
- **작업:** 전부 `migrated_candidate`(stale→`deprecated 후보`·conflict→`superseded 후보`).
- **고객(기존 status mapping 후보):** `active`→`reviewed 후보` · `hypothesis`→`migrated_candidate` · `superseded`→`superseded`.
- **지식:** `migrated_candidate`(source 있으면 `reviewed 후보`).
- ★전부 *후보(suggested)*일 뿐 — **실제 승격·stable 처리 0**(그건 M3~M5).

## 8. 출력 위치 / 형식
- **위치:** 로컬 staging(예 `~/Project/SIASIU/_memory_export/` 또는 Foundation staging) — ★*live Foundation memory 아님*·**gitignore·미커밋**(고객 hash·메타 포함되므로).
- **형식:** `inventory.jsonl`(record/줄) + `manifest.yaml`(대상·정책버전·checksum 요약). 사람이 검토 가능한 read-only 스냅샷.
- export = *읽기→스냅샷*일 뿐, Foundation에 *주입 아님*.

## 9. 원본 불변 보증
- 읽기 *전* 각 소스 checksum(파일=sha256·DB=`PRAGMA data_version`/파일 sha256) → `checksumBefore`.
- 읽은 *후* 재측정 → `checksumAfter`. **두 값 다르면 = 실패·중단·보고**(읽기가 원본을 바꿨다는 뜻).
- DB는 `query_only=ON`(read-only)로 연결 → 구조적으로 쓰기 불가.

## 10. M2.1 dry-run 검증 체크리스트 (M2.2 전 통과 필수)
```
□ 고객 메모리 표본 → contentPreview=[MASKED]·rawContentExported=false 확인
□ contentHash 일관(같은 원문 같은 해시)·원문 미노출 확인
□ piiRisk/sensitivity 추정이 타입 기반(값 파싱 안 함) 확인
□ checksumBefore == checksumAfter (원본 불변) 확인
□ suggestedStatus에 stable 0건 확인
□ export 파일이 gitignore·미커밋 위치인지 확인
□ episode 대화원문 미export(count만) 확인
```

## 11. 이번 작업에서 하지 않은 것 (명시)
```
❌ 실제 export 실행 · ❌ 고객 memory.db/작업메모리 읽기 실행 · ❌ DB 수정 · ❌ 메모리 수정/삭제
❌ Foundation 이전 · ❌ stable 승격 · ❌ 보안게이트 구현 · ❌ 고객 memory 원문 출력 · ❌ PII 노출
→ 이 문서 = *export 방법 설계만.* 유일한 쓰기 = 이 .md 1개.
```

## 12. 다음 단계 제안
- **즉시:** 이 M2.0 *Leo 승인*(특히 §5 masking 정책·§8 출력 위치).
- **그 다음(M2.1):** *소량 표본* dry-run으로 §10 체크리스트 검증 → 보고 → 승인 → M2.2 전체 export.
- **불변:** 고객 원문은 어떤 단계에서도 기본 masked · 원문 필요시 별도 승인·로컬·미저장.
- **보류:** M3(migrated_candidate 이전) 이하는 M2 완료·검토 후.
