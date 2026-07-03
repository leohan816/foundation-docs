# SIASIU 메모리 구조 실사 보고서 (MEMORY AUDIT REPORT)

> **버전 v1.0 · 2026-06-27 · READ-ONLY 감사** — Foundation Memory Trust Migration 설계의 *근거 보고서*.
> ★이번 작업 = **조사/보고만.** 구현·이동·수정·삭제·이전·게이트 구현 *전부 0* (§10·완료보고 참조).
> 방법: Explore 에이전트 4영역 병렬 실사(Write/Edit 구조적 불가) + Opus 종합.

---

## 0. 한 줄 요약
**SIASIU엔 *3종의 메모리*가 *서로 다른 검수 강도*로 공존한다:**
```
① 고객 메모리 (memory.db / brain.py)      = ★엄격한 status 모델 (active/hypothesis/superseded·2번규칙·supersede·decay·안전비대칭) — 구현됨
② 지식 메모리 (성분 레지스트리 / 볼트)     = ★source-first + Opus 적대 게이트 + provenance — 구현됨
③ 작업 메모리 (Claude Code .md)           = ★게이트 없음 (frontmatter + 중복체크 관습 + Leo가 봄) — status 0
```
+ **자가성장 지식층**(knowledge_claim·regrow.py·provenance·Opus 게이트)은 **설계만 되고 미구현**(설계서 v0.2, 코드 0).
→ Foundation 이전의 핵심: **기존 메모리를 *자동 stable로 이전 금지* · 기본 `migrated_candidate`.**

---

## 1. 현재 메모리 저장 위치 (실제 경로 전부)
| 무엇 | 경로 | 포맷 | 비고 |
|---|---|---|---|
| **작업 메모리** (Claude Code) | `~/.claude/projects/-Users-hanchenghao-Project-SIASIU/memory/` | Markdown (18파일 + MEMORY.md 인덱스) | 프로젝트 전략·원칙·결정. status 없음 |
| **고객 장기 메모리** | `~/Project/SIASIU/app/data/memory.db` | SQLite (WAL) | episode·memory_fact·fact_type_registry·user |
| **지식/검색 백엔드** | `~/Project/SIASIU/app/data/ssbrain.sqlite` | SQLite (FTS) | chunks·edges·ingredients·documents |
| **판단 로그** | `~/Project/SIASIU/app/data/judgment_log.jsonl` | JSONL (append-only) | ★user_id=hash·persona=facts only (PII 해시) |
| **지식 정본 (성분·뷰티·건강)** | `~/SIASIU_COSMILE_VAULT/knowledge/` | Markdown+YAML | 성분 297파일(provenance_origin)·뷰티·건강 |
| **세션 트랜스크립트** | `~/.claude/projects/.../*.jsonl` | JSONL | 대화 원문 (5세션) |

**분리 상태:** ★작업/고객/지식 메모리는 **물리적으로 분리됨**(다른 저장소·다른 포맷·다른 검수). 단 *프로젝트 메모리*는 작업 메모리(`.md`)에 섞여 있음(strategy·decision·handoff·todo 혼재). Obsidian/Vault = 볼트는 *지식*만, 작업 메모리는 *Claude 전용 .md*(Obsidian 아님).

## 2. 현재 메모리 저장 흐름
**A. 작업 메모리 (Claude Code) — *관습*, 코드 게이트 없음:**
```
Claude가 Write 도구로 .md 직접 생성 → MEMORY.md 인덱스 1줄 추가
저장 전 체크(관습): 중복(기존 파일 덮을지)·frontmatter 형식·사실 확인·★Leo에게 내용 보여줌
= 코드로 강제되는 단계 0 (전부 LLM 자율 + 관습)
```
**B. 고객 메모리 (brain.py) — *코드화된 9단계* (`app/brain.py`):**
```
1 episode INSERT(user)  2 guardrail CHECK(차단)  3 LLM chat(+memory+KB)  4 verify_output(fail-closed)
5 episode INSERT(AI)    6 LLM extract→(type,value,conf)  7 upsert_fact(★2번규칙·안전override·supersede·트랜잭션)
8 재방문 recall(active·non-stale 우선)  9 체크인(결정론 fact 갱신·LLM 추출 아님)
```
**C. 지식 메모리 (성분) — source-first:** manifest(WebSearch 검증) → 제약 작성 → **Opus 적대 검수 게이트** → 승격.

## 3. 현재 상태값(status) 구조
| 메모리 | status 존재? | 값 | 정의 위치 |
|---|---|---|---|
| **고객 메모리** | ✅ **실제 구현** | `active`·`hypothesis`·`superseded` (status + fact_state 이중) | `brain.py` 84-104(스키마)·214-284(upsert state machine)·129(active_facts 필터) |
| **작업 메모리** | ❌ **없음** | — (frontmatter에 `type`만: project/feedback/memory) | status 필드 18파일 전부 0 |
| **지식 메모리(설계)** | 🟡 **설계만** | `provenance_origin`(human_curated/ai_learned/bom_ported/external·영구) + `verify_state`(staged→verifying→verified/rejected/flagged) | 자가성장지식 설계서 §9 — **코드 미구현** |

**고객 메모리 = 작업 메모리와 status 다름** (고객=3값 구현 / 작업=없음).
**supersede:** ✅ 구현 (SINGLE 타입 자동 supersede·옛 row 보존 status=superseded·삭제 0) `brain.py 268-271`.
**decay/stale:** ✅ 구현 (`_is_stale` 190-203·비안전 90일 초과 "(예전)" 태그·안전타입 영구 무decay).
**2번 규칙:** ✅ 구현 (1차=hypothesis conf 0.4 → 2차(다른 turn)=active conf 0.6·같은 turn 중복 무효).

## 4. 현재 검수 방식 (항목별 — *어느 메모리에 적용되나*)
| 검수 항목 | 고객 메모리 | 지식 메모리(성분) | 작업 메모리 |
|---|---|---|---|
| **중복 체크** | ✅ 코드(같은 turn 중복 무효·SINGLE supersede) | ✅ atom=파일명 1:1·alias 수렴 | 🟡 관습(덮을지 판단) |
| **frontmatter/schema** | ✅ DB 스키마+테스트 | ✅ 명명 §1.5·테스트 | 🟡 형식만(검증 코드 0) |
| **파일/경로/커밋 실재 확인** | n/a | n/a | 🟡 관습("참조 시 실재 확인" 지침) — *이번 감사선 code_ref 전부 ✓* |
| **Leo 확인 절차** | 🟡 관습(plan-before-build) | ✅ 성분 추가=Leo+Opus 게이트 | 🟡 관습(보여줌·코드강제 0) |
| **별도 적대 검수 게이트** | 🟡 verify_output(LLM·출력만) | ✅ Opus 적대 검수(§1.6) | ❌ 없음 |
| **LLM/Opus 게이트** | 🟡 verify_output(fail-closed) | ✅ Opus only(자가성장 §4·성분 §1.6) | ❌ 없음 |
| **source-first/evidence-first** | ❌ (fact에 출처/근거 태그 없음) | ✅ PMID/SCCS/CIR·WebSearch 확인만 | ❌ 없음 |

**★source-first 적용 구분:**
- **적용됨:** 성분 레지스트리(§1.7 인용 표준)·interaction edges(source_ref 필수)·judgment_log claim_conflicts.
- **적용 안 됨:** judgment_log(결과만·출처 미보존)·memory_fact(fact 내용만·근거 체인 없음)·**작업 메모리(전부)**.

## 5. 메모리 종류별 분류 (실제 예시 2~3개·민감정보 가림)
| 분류 | 어디 | 실제 예시 |
|---|---|---|
| **Leo explicit decision/preference** | 작업 메모리 | `plan-before-build`·`foundation-no-heuristics`·`design-doc-versioning` |
| **project working memory** | 작업 메모리 | `foundation-phase-status`·`siasiu-core-api-cosmile-shell`·`nearterm-plan-3-layers` |
| **code/file/commit reference** | 작업 메모리 | `foundation-data-core-extracted`(judge_real·foundation_core 경로)·`foundation-phase-status`(8 모듈) |
| **product/ingredient/claim knowledge** | 지식 메모리(볼트) | 성분 297파일(`ing:retinol` 등)·interaction edges·judgment claim_conflicts |
| **customer/profile/consultation** | 고객 메모리(memory.db) | `memory_fact`(skin_type·concern·avoid_ingredient — 값 평문)·`episode`(대화 원문) |
| **operational handoff/TODO** | 작업 메모리 + 루트 | `prism-preprocessing-ownership` · `HANDOFF.md`·`TODO.md` |
| **stale/archive** | 작업 메모리 | `foundation-project`(투자데모 "내일"=지난 이벤트)·`foundation-bombrain`("키 내일 추가" 옛 약속) |

## 6. 위험 요소 (★가장 큰 5개 먼저)
**🔴 TOP 5:**
1. **자동 stable 위험 (이전 시 최대 위험).** 작업 메모리엔 status가 없어 → Foundation 이전 시 *전부 stable로 들어가면* 검증 안 된 추측·옛 결정이 *정본처럼* 굳음. ★반드시 `migrated_candidate`로.
2. **자가성장 지식층 = 설계 phantom (미구현).** `knowledge_claim`·`regrow.py`·provenance·Opus 게이트·whitelist tier가 *설계서 v0.2엔 있으나 코드 0*. 이걸 "있다"고 가정하고 이전하면 *존재하지 않는 신뢰 계층*을 신뢰하게 됨.
3. **stale·conflict 메모리 잔존.** `foundation-project`·`foundation-bombrain`=stale / `foundation-project`↔`nearterm-plan`, `siasiu-core-api`↔`foundation-bombrain`=옛 결정이 최신과 충돌(갱신 안 됨). *과거 결정이 최신처럼* 남아있는 전형.
4. **작업 메모리가 canonical처럼 쓰일 위험.** 작업 메모리는 *Claude 추론용*인데 검수 게이트가 없어 — Foundation 정본 지식과 같은 신뢰로 취급되면 *오염*. (작업 메모리 ≠ 정본.)
5. **고객 민감정보 평문 저장 + 삭제 메커니즘 0.** `memory_fact` 값(피부·고민·기피성분)이 *평문*(memory.db는 hash 안 함·judgment_log만 hash). + episode 영구보존 설계 ↔ GDPR 삭제권 *충돌 미해결*·삭제 코드 0·동의 절차 미설계.

**🟡 그 외:**
- **duplicate:** 작업 메모리에 *명확한 중복은 0*(겹침은 conflict로). memory poisoning: 작업 메모리는 게이트 없어 *잘못된 자기요약*이 누적 가능(환각보다 오캡처).
- **오래된 코드 경로:** 이번 감사선 code_ref *전부 실재 ✓*(judge_real·foundation_core 등) — 현재는 양호하나 *코드 이동 시 stale화* 위험.
- **memory poisoning:** 고객 메모리는 2번규칙+안전비대칭으로 방어 / 작업·지식(미구현 자가성장)은 방어 약함.

## 7. Foundation 이전 시 주의점 (안전 순서·원칙 기반)
**원칙 (Leo 제시 — 그대로 준수):**
1. ★**기존 메모리 = 자동 stable 이전 금지.** 기본 = `migrated_candidate`.
2. **코드/파일/커밋 참조** = *실재 확인 후* `reviewed`로.
3. **Leo 명시 결정** = *Leo 확인 후* `stable` 후보.
4. **외부 사실/성분/건강/product claim** = source/evidence 검증 없이는 `stable` 금지.
5. **고객/profile/consultation** = 민감도·동의·삭제가능성 기준 *먼저* 세움.
6. **오래된 작업 메모리** = `deprecated`/`superseded` 후보.

**안전 순서 (현재 구조 기준):**
```
A. 작업 메모리(18)    → 전부 migrated_candidate. code_ref만 실재확인→reviewed. Leo결정만 Leo확인→stable후보. stale 2개=deprecated후보.
B. 고객 메모리        → ★이미 status 모델 있음(active/hypothesis/superseded) → 그 status를 *보존*해 매핑(active→reviewed, hypothesis→migrated_candidate). ★PII·동의·삭제 정책 먼저.
C. 지식 메모리(성분)   → 이미 source-first+Opus 검수됨 → provenance 보존해 reviewed/stable. ai_learned는 origin 영구(세탁 금지).
D. 자가성장 지식층      → 미구현이므로 *이전할 것 없음* — Foundation에서 *새로 구현*(설계서 이식).
```

## 8. 제안하는 Foundation Memory 상태값 (평가 + 보완)
| 상태값 | 적절? | 용도 |
|---|---|---|
| `raw_candidate` | ✅ | 갓 생성(미검토) — 작업 메모리 신규 |
| `migrated_candidate` | ✅ **핵심** | 기존 메모리 이전 기본값(자동 stable 금지) |
| `reviewed` | ✅ | code_ref 실재확인·1차 검토 통과 |
| `stable` | ✅ | Leo 확인(결정) 또는 source/evidence 검증(지식) 후만 |
| `deprecated` | ✅ | 옛 작업 메모리·더는 유효 안 함 |
| `superseded` | ✅ | 새 메모리가 덮음(고객 메모리 모델과 일치) |
| `rejected` | ✅ | 검수 탈락(삭제 대신 보존·audit) |
| **+ 보완 제안** | | |
| `flagged_human` | 🆕 추천 | 고위험(임신·약물·효능·민감 PII) → *Leo 게이트 필수* (자동 승격 금지) |
| `provenance_origin` (필드) | 🆕 추천 | human_curated/ai_learned/bom_ported/external — *상태값과 직교*, 영구(승격≠세탁). 모든 메모리에 부착 |
| `source_ref`/`evidence` (필드) | 🆕 추천 | 지식·claim 메모리는 출처 없으면 stable 금지(현재 memory_fact엔 없음) |

→ **상태값 7개 적절. + `flagged_human`(고위험 인간게이트) + `provenance_origin`/`source_ref`(필드)** 추가 권장.

## 9. 제안하는 Migration Plan (Phase M0–M6)
```
M0  Audit only            ← ★이번 작업 (이 보고서). 구현 0.
M1  Migration schema 설계   상태값(§8) + provenance_origin·source_ref 필드 + 메모리 종류별 규칙 확정. (설계만·Leo 승인)
M2  Memory inventory export 작업18 + 고객 memory_fact + 지식 성분을 *읽기 전용 export*(원본 불변). 종류·status·provenance 태깅.
M3  migrated_candidate 이전 전부 migrated_candidate로. ★자동 stable 0. 고객 메모리는 기존 status 보존 매핑.
M4  review/supersede/deprecate  code_ref 실재확인→reviewed · stale 2개→deprecated · conflict→supersede 정리.
M5  stable 승격             Leo 확인(결정) / source·evidence 검증(지식) / Opus 게이트 통과한 것만 stable.
M6  Memory Trust Gate 구현    저장 시 게이트(provenance·source·dedup·Leo확인) + 주기 검수(stale/conflict sweep) 코드화.
```
**의존:** M1→M2 순서 고정. M6(Trust Gate)는 자가성장 지식층 구현과 합류(설계서 v0.2 이식). 각 Phase 끝 = Leo 승인.

## 10. 이번 작업에서 하지 않은 것 (명시)
```
❌ 구현하지 않음          (Trust Gate·상태값·schema 코드 0)
❌ 파일 이동하지 않음      (메모리·볼트·코드 이동 0)
❌ 메모리 수정하지 않음    (작업 메모리 18파일·memory.db·지식 불변)
❌ 삭제하지 않음          (stale/conflict 식별만·삭제 0)
❌ Foundation 이전하지 않음 (조사만·이전 0)
❌ 보안 게이트 구현하지 않음 (PII·동의·삭제 게이트 설계 제안만·코드 0)
```

---

## 완료 보고

**조사한 파일/폴더:** 작업 메모리 `~/.claude/.../memory/`(18 .md) · `app/brain.py`·`app/ssbrain/`·`app/tests/test_brain.py` · `설계문서/SIASIU_메모리_설계서.md`(v1.4)·`SIASIU_자가성장지식_설계서.md`(v0.2)·`SIASIU_메모리_워크플로.html` · `app/data/`(memory.db·ssbrain.sqlite·judgment_log.jsonl) · 볼트 `knowledge/`(성분297) · `성분레지스트리`·`TEST_STRATEGY`·`CLAUDE.md`.

**현재 메모리 구조 요약:** 3종 분리 — ①작업(Claude .md·status 0·게이트 0) ②고객(memory.db·status 모델 구현·2번규칙·supersede·decay) ③지식(볼트·source-first+Opus). 자가성장 지식층은 설계만(미구현).

**현재 저장 흐름 요약:** 작업=Write 관습(코드 게이트 0) · 고객=brain.py 9단계(코드화) · 지식=manifest→Opus 게이트.

**현재 검수 방식 요약:** 고객=verify_output+2번규칙+안전비대칭 / 지식=Opus 적대게이트+source-first / 작업=중복·형식·Leo가 봄(관습·코드강제 0).

**메모리 종류별 분류:** 7분류 다 매핑됨(§5) — leo_decision·project_working·code_ref·knowledge·customer·operational·stale.

**실제 status 구조 여부:** ✅ 고객 메모리만 실제 구현(active/hypothesis/superseded) · 작업=없음 · 지식=설계만(provenance·verify_state 미구현).

**가장 큰 위험 5개:** ①자동 stable 이전 ②자가성장 지식층 phantom(미구현) ③stale·conflict 잔존 ④작업 메모리가 canonical처럼 ⑤고객 PII 평문+삭제 0(GDPR 충돌).

**Foundation 이전 주의점:** 자동 stable 금지·기본 migrated_candidate · code_ref 실재확인→reviewed · Leo결정만 stable후보 · 외부사실 source검증 없이 stable 금지 · PII/동의/삭제 먼저.

**추천 상태값:** raw_candidate·migrated_candidate·reviewed·stable·deprecated·superseded·rejected **+ flagged_human(고위험 인간게이트) + provenance_origin·source_ref(필드).**

**추천 migration plan:** M0 audit(완료) → M1 schema → M2 export → M3 migrated_candidate → M4 review/supersede/deprecate → M5 stable 승격 → M6 Trust Gate.

**구현하지 않은 것:** §10 — 구현·이동·수정·삭제·이전·보안게이트 *전부 0.*

**git status:** 감사 자체 변경 *0.* (SIASIU `git status`의 M파일 = *오늘 이전 작업분*: CLAUDE/HANDOFF/SCHEDULE/TODO 문서 갱신 + foundation_core switch 코드 — 감사와 무관. 작업 메모리 .md timestamp = 6/26 = 감사가 안 건드림. 볼트 = `.pyc` 캐시만. ★이 보고서 = `설계문서/`에 *새 파일 1개* 생성이 유일한 쓰기.)
