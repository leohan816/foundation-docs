# FOUNDATION MEMORY TRUST MIGRATION 설계서

> **버전 v0.1 · 2026-06-27 · M1 설계 (DESIGN ONLY)** — SIASIU 메모리 3종(작업·고객·지식)을 Foundation으로 *안전하게* 이전하기 위한 상태값·provenance·source_ref·sensitivity·검수/승격/삭제 규칙 설계.
> ★**이번 작업 = 설계만.** 구현·DB변경·schema코드·메모리 이동/수정/삭제·Foundation 이전·보안게이트·export·stable 승격 *전부 0* (§8).
> **근거 문서: `설계문서/SIASIU_MEMORY_AUDIT_REPORT.md` (v1.0).** Foundation Self-Protection Phase 1 구현은 이 M1 설계 확정 후로 보류.
>
> **변경이력**
> - v0.1 (2026-06-27) — 최초. 감사 보고서 기반 M1 schema 설계(상태값 8·공통필드·종류별 규칙·MemoryTrustDecision·M0–M6·Security Platform 연결).

---

## 0. 목적 / 비범위
**목적:** SIASIU의 *검수 강도가 제각각인* 메모리 3종을 Foundation으로 옮길 때, **자동 stable로 굳지 않게** 하는 *신뢰(trust) 규칙*을 설계한다. 핵심 위험(감사 §6): ①자동 stable ②자가성장층 phantom ③stale·conflict ④작업≠canonical ⑤PII 평문+삭제 0.
**비범위:** 코드·DB·실제 이전(§8). 이 문서는 *규칙의 정본*이지 실행이 아니다.

## 1. 핵심 원칙 (절대 — 모든 규칙의 상위)
1. **기존 메모리는 자동 stable로 이전하지 않는다.**
2. **기존 메모리의 기본 상태 = `migrated_candidate`.**
3. **작업 메모리는 canonical memory가 아니다** (검수 게이트 없는 추론용).
4. **작업 메모리는 분류 후 검토** — Leo 결정 / 프로젝트 진행 / 코드 참조 / stale·archive.
5. **고객 메모리는 기존 status 보존 — 단 PII·민감도·동의·삭제 정책을 *먼저* 설계.**
6. **지식 메모리는 source/evidence/provenance를 *보존*해야 한다.**
7. **자가성장 지식층은 *현재 구현 0* → 존재하는 신뢰계층으로 가정하지 않는다.**
8. **stable 승격은 *검증 이후에만*.**
9. **rejected도 삭제하지 않고 audit trail로 남긴다** (clean-not-compress).
10. **Foundation은 기억을 저장하기 *전에* trust decision을 남긴다** (§5 MemoryTrustDecision).

## 2. 상태값 설계 (Foundation memory status — 8)
> 공통: 모든 상태 전이는 `auditLogId`로 기록(전이 0건도 없음). ★자동 stable 경로는 *어디에도 없다.*

| 상태 | 의미 | 들어오는 조건(in) | 나가는 조건(out) | 승격 주체 | 자동 승격 | audit | 예시 |
|---|---|---|---|---|---|---|---|
| **raw_candidate** | Foundation에서 *새로 생성*된 미검토 메모리 | 신규 생성(작업·self-growth candidate) | →reviewed(검토)·rejected·flagged_human | Trust Gate(규칙)+검토 | →reviewed만 규칙 가능·**stable 불가** | 필요 | 새 작업 메모리·self_growth candidate |
| **migrated_candidate** | ★기존 SIASIU 메모리 이전의 *기본값* | M3 이전 시 *무조건* | →reviewed·deprecated·superseded·flagged_human·rejected | 검토(M4) | **❌ stable 절대 불가**(원칙2) | 필요 | 작업 메모리 18·고객 hypothesis fact |
| **reviewed** | 1차 검토(실재확인·형식·중복) 통과·아직 정본 아님 | candidate가 code_ref 실재·형식·중복 통과 | →stable·deprecated·superseded·rejected | 검토 게이트 | reviewed 진입은 규칙 가능·stable은 추가조건 | 필요 | 실재확인된 code_ref 메모리·고객 active fact |
| **stable** | Foundation이 *기본 추론에 사용 가능* | reviewed + (Leo확인 결정 ∨ source/evidence 검증 지식 ∨ 고객 동의·삭제정책 통과) | →superseded·deprecated·rejected | ★Leo(결정)/Opus·Claim Guard(지식) | **❌ 자동 불가** | 필요 | Leo 확인 결정·source 있는 성분 지식 |
| **deprecated** | 과거 참고용·기본 검색/추론 *미사용* | stale 작업 메모리·낡은 결정 | (보존)→필요시 superseded | 검토 | 날짜·후속결정 규칙 가능 | 필요 | `foundation-project`(투자데모 지남)·`foundation-bombrain`(옛 약속) |
| **superseded** | *최신 메모리가 대체* (supersededBy 지목) | 충돌·갱신 시 새 메모리가 대체 | (영구 보존·audit) | 검토/자동(고객 single-value) | 고객 single-value만 자동(기존 모델)·작업은 검토 | 필요 | `foundation-project` ← `nearterm-plan` 대체 |
| **rejected** | 검수 탈락(근거없음·환각·오류) — ★삭제 아님 | 검토서 오류·환각·근거없음 판정 | (영구 보존·audit) | 검토 | 근거없음 등 규칙 reject 가능 | **필수**(rejectionReason) | 환각 인용·근거없는 claim |
| **flagged_human** | 고위험 → ★*인간(Leo) 검토 전 승격 금지* | PII risk·고위험 도메인(임신·약물·효능)·고객 민감·self-growth 고위험 | →reviewed/stable(인간 승인 후)·rejected | ★인간(Leo)만 | **❌ stable 절대 불가** | **필수** | 고객 PII fact·임신/약물 지식 claim |

**명시 규칙 (불변):**
- `migrated_candidate` → 자동 stable **불가.**
- `flagged_human` → 자동 stable **불가.**
- `rejected` = 삭제가 아니라 *보존 상태*.
- `deprecated` = 과거 참고용 · 기본 검색/추론에 **안 씀.**
- `superseded` = 최신 memory가 대체했음.
- `stable` = Foundation 기본 추론 사용 가능 상태(유일).

## 3. 공통 필드 설계 (schema draft — 모든 Foundation memory)
> ★draft만 — DB/코드 미변경(§8). 타입은 논리적 예시.
```yaml
# --- 식별/내용 ---
memoryId:            string        # 불변 식별자 (≠content)
memoryType:          enum          # §3.b
status:              enum          # §2 (8값)
content:             text          # 원문 (clean — 압축/요약 금지)
normalizedContent:   text          # 검색/dedup용 정규화 (의미 동일)
# --- 출처/근거 ---
provenance_origin:   enum          # §3.a — 영구(승격해도 세탁 금지)
source_ref:          string|null   # 원본 경로/URL/파일#섹션 (지식·claim 필수)
evidence_ref:        string|null   # PMID/SCCS/CIR/식약처 등 검증앵커
# --- 민감도/동의 ---
sensitivity:         enum          # §3.c
piiRisk:             enum(none|low|med|high)
consentState:        enum          # §3.d
# --- 시간/검토 ---
createdAt:           ts
updatedAt:           ts
lastReviewedAt:      ts|null
reviewedBy:          enum(none|rule_gate|opus|claim_guard|leo|human)
# --- 정책 버전 ---
policyVersion:       string        # 이 메모리에 적용된 정책 버전
memoryTrustVersion:  string        # trust schema 버전
# --- 관계/사유 ---
supersedes:          memoryId|null
supersededBy:        memoryId|null
deprecatedReason:    string|null
rejectionReason:     string|null
recheckRequired:     bool          # 주기 재검 필요(고위험·지식 freshness)
auditLogId:          string        # ★모든 전이의 audit 포인터
```
**3.a `provenance_origin`** (영구·승격≠세탁): `leo_explicit` · `ai_summarized` · `human_curated` · `customer_provided` · `imported_from_siasiu` · `imported_from_claude_working_memory` · `imported_from_vault` · `external_source` · `ai_learned`.
**3.b `memoryType`**: `leo_decision` · `project_working_memory` · `code_file_commit_reference` · `product_ingredient_claim_knowledge` · `customer_profile_consultation` · `operational_handoff_todo` · `stale_archive` · `self_growth_knowledge_candidate`.
**3.c `sensitivity`**: `public` · `internal` · `personal` · `sensitive` · `regulated` · `unknown`.
**3.d `consentState`**: `not_required` · `required_missing` · `granted` · `revoked` · `unknown`.

## 4. 메모리 종류별 이전 규칙 (감사 §5 기준)
### A. 작업 메모리 (Claude `.md` · 18파일)
- **기본 상태: `migrated_candidate`.** provenance=`imported_from_claude_working_memory`.
- **stable 승격 조건(전부 충족):** ①Leo 명시 확인한 결정/선호 ②최신 결정과 충돌 없음 ③stale 아님 ④code/file/commit 참조는 *실재 확인 완료*.
- **주의:** 작업 메모리 = canonical 아님(원칙3) · 오래된 것=`deprecated` 후보 · 충돌=`superseded` 후보 · 코드 참조는 실재확인 전 stable **금지**.
- 분류 매핑: Leo결정→`leo_decision` / 진행→`project_working_memory` / 코드참조→`code_file_commit_reference` / 옛것→`stale_archive`(deprecated 후보).

### B. 고객 메모리 (`memory.db` · brain.py)
- **기존 status 보존 매핑:** `active` → `reviewed` 후보 · `hypothesis` → `migrated_candidate` · `superseded` → `superseded`.
- **★아래 해결 *전* stable 금지:** ①PII 평문 저장 정책 ②고객 동의 ③삭제/철회 가능성 ④민감도 분류 ⑤보존 기간 ⑥GDPR/개인정보 삭제권 대응.
- provenance=`customer_provided` · sensitivity≥`personal`(안전타입=`sensitive`/`regulated`) · piiRisk 평가 필수.
- ★**고객 메모리 = SIASIU Adapter high-risk 영역과 연결**(§7) — 자동 처리 금지, 다수 `flagged_human`.

### C. 지식 메모리 (성분·뷰티·건강 Vault)
- **기본 원칙:** source-first · evidence required · provenance 보존 · **ai_learned origin은 stable 돼도 세탁 금지**(영구).
- **stable 승격 조건:** ①`source_ref` 존재 ②`evidence_ref` 존재 ③source freshness/reputation 확인 ④claim/evidence policy 통과 ⑤**Opus 또는 향후 Foundation Claim Guard 검수 통과**.
- provenance=`imported_from_vault`/`human_curated`/`ai_learned` · 성분 레지스트리는 이미 §1.6 Opus 게이트 거침 → `reviewed`/`stable` 후보(근거 보존 조건).

### D. 자가성장 지식층
- **현재 상태: 설계서 v0.2엔 있으나 *코드 구현 0*** (knowledge_claim·regrow.py·TEI 부재 — 감사 §6 위험2).
- **규칙:** ★*이전 대상이 아니다* · 존재하는 신뢰계층으로 가정 금지 · 향후 Foundation에서 *새로 구현* · `self_growth_knowledge_candidate`는 **`raw_candidate` 또는 `flagged_human`으로만** 진입(절대 자동 stable ❌).

## 5. MemoryTrustDecision 계약 (draft)
> Foundation이 메모리를 저장/승격하기 *전에* 남기는 결정 객체. (설계만 — 구현 0.)
```yaml
MemoryTrustDecision:
  decision:            enum(allow | review | block)
  nextStatus:          enum(§2 8값)
  riskLevel:           enum(low | medium | high)
  reasonCodes:         [enum]        # 아래
  memoryType:          enum(§3.b)
  sensitivity:         enum(§3.c)
  piiRisk:             enum(none|low|med|high)
  consentRequired:     bool
  consentState:        enum(§3.d)
  sourceRequired:      bool
  sourcePresent:       bool
  evidenceRequired:    bool
  evidencePresent:     bool
  stableEligible:      bool          # ★false면 stable 경로 차단
  humanReviewRequired: bool
  supersedes:          memoryId|null
  deprecatedReason:    string|null
  rejectionReason:     string|null
  policyVersion:       string
  memoryTrustVersion:  string
  auditLogId:          string
```
**reasonCodes (정본 enum):** `AUTO_STABLE_FORBIDDEN` · `MISSING_STATUS` · `MIGRATED_MEMORY_REQUIRES_REVIEW` · `STALE_WORKING_MEMORY` · `CONFLICTING_MEMORY` · `CODE_REFERENCE_NOT_VERIFIED` · `SOURCE_REQUIRED` · `EVIDENCE_REQUIRED` · `PII_RISK` · `CONSENT_REQUIRED` · `DELETE_POLICY_REQUIRED` · `CUSTOMER_MEMORY_HIGH_RISK` · `SELF_GROWTH_LAYER_NOT_IMPLEMENTED` · `HUMAN_REVIEW_REQUIRED`.
**핵심 게이트 로직(서술):** `decision=block` ⇐ PII_RISK·CONSENT_REQUIRED·SELF_GROWTH_LAYER_NOT_IMPLEMENTED 중 하나 → `flagged_human`. `decision=review` ⇐ migrated/stale/conflict/code_ref 미확인. `stableEligible=true`는 *Leo확인 ∨ (source+evidence 검증)* 일 때만.

## 6. Memory Trust Migration Plan (M0–M6)
| Phase | 무엇 | 상태 |
|---|---|---|
| **M0 Audit only** | 메모리 구조 실사 → `SIASIU_MEMORY_AUDIT_REPORT.md` | ✅ 완료 |
| **M1 Migration schema 설계** | 상태값·필드·종류별 규칙·MemoryTrustDecision 설계 (이 문서) | ◀ **이번 작업** |
| **M2 Memory inventory export** | 작업·고객 memory_fact·지식 Vault를 *읽기전용 export*·분류/태깅 (★원본 불변) | 예정 |
| **M3 migrated_candidate 이전** | 전부 `migrated_candidate`로 (★자동 stable 0) · 고객 기존 status 보존 매핑 | 예정 |
| **M4 review/supersede/deprecate** | code_ref 실재확인 · stale→`deprecated` · conflict→`superseded` · PII/동의/삭제 위험→`flagged_human` | 예정 |
| **M5 stable 승격** | Leo 확인 결정 · source/evidence 검증 지식 · 고객 동의/삭제정책 통과만 stable 후보 | 예정 |
| **M6 Memory Trust Gate 구현** | 신규 저장 시 gate(provenance·source·dedup·Leo확인) · stale/conflict sweep · audit log · ★SIASIU Adapter Memory Write Gate 연결 | 예정 |

## 7. Foundation Security Platform과의 연결
| Layer | 항목 | 이 설계와의 관계 |
|---|---|---|
| **A — Foundation Trust Core** | Memory Trust / Migration Guard | §2 상태값·§5 MemoryTrustDecision = Trust Core가 모든 메모리 저장 전 실행 |
| **D — SIASIU Adapter** | Memory Write Gate · Profile Sensitivity Guard · Consent/Delete Policy | §4.B 고객 메모리 규칙 = Adapter high-risk · M6 Gate가 Adapter Write Gate와 연결 |
| **G — Model Runtime / Cost Control** | — | Memory Trust도 *small-model-first · rule-first · token-budgeted* 로 실행(규칙 우선·LLM은 애매할 때만) |

**Phase 관계:** M1 = Phase 1(Foundation Self-Protection) 구현 *전 선행 설계* · M6 = Phase 6 SIASIU Adapter와 연결 · ★**고객 memory privacy/delete는 별도 high-risk item으로 추적**(이 설계 안에서 끝내지 않음).

## 8. 이번 작업에서 하지 않은 것 (명시)
```
❌ 구현 · ❌ DB schema 변경 · ❌ memory 이동 · ❌ memory 수정 · ❌ memory 삭제
❌ Foundation 이전 · ❌ 보안 게이트 구현 · ❌ 실제 export · ❌ 실제 stable 승격
❌ 고객 memory 내용 출력 · ❌ PII 노출
→ 이 문서 = *설계(규칙)만.* 유일한 쓰기 = 이 .md 1개.
```

## 9. 다음 단계 제안
- **즉시:** 이 M1 설계 *Leo 검토·승인* (특히 상태값 8·MemoryTrustDecision·고객 PII 정책 방향).
- **그 다음(M2):** 읽기전용 inventory export 설계(원본 불변·분류 태깅 규칙) — *별도 작업·승인 후*.
- **병행 추적:** 고객 memory privacy/delete(GDPR) = high-risk 별도 item · 자가성장 지식층은 *Foundation 신규 구현 영역*으로 로드맵 분리.
- **보류 유지:** Foundation Self-Protection Phase 1 구현은 이 설계 확정 후.
