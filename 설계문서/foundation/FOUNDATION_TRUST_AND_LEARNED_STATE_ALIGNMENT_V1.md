# Foundation — Trust & Learned State Alignment v1

> **2026-06-28 · 정렬(ALIGNMENT) 문서 — 구현/승격 0.** Knowledge Learning System v1(learned 지식 증류)과 Memory Trust/Migration(M1~M6, legacy 메모리 이전)의 **상태값·용어를 정렬**한다.
> 입력: `FOUNDATION_MEMORY_TRUST_MIGRATION_설계서.md`(8상태·MemoryTrustDecision) · `app/learning_candidate.py`·`app/knowledge_input.py`(learned candidate) · Knowledge Learning v1 문서 7종.
> ★결론 한 줄: **두 시스템은 store를 분리하고 status enum은 공유하되, `source_layer`/`memoryType`로 의미를 구분한다. `learned_approved`(traceable·non-canonical)를 canonical `stable`과 동일시하지 않는다.**

## 1. 두 시스템 상태 어휘 (현재)
| 시스템 | 상태/필드 어휘 |
|---|---|
| **Memory Trust (M1)** | 8상태: `raw_candidate` · `migrated_candidate` · `reviewed` · `stable` · `deprecated` · `superseded` · `rejected` · `flagged_human`. 축: `sourceSystem`(working/customer/knowledge_vault) · `memoryType` · `provenance_origin`(…`ai_learned`) · `reviewedBy`(none/rule_gate/opus/claim_guard/leo/human) · `stableEligible` |
| **Knowledge Learning (v1)** | `status='candidate'` · `promotion_ready=false` · `reviewed_by=null` · `canonical_write=false` · `index_default=false` · `layer='learned'`. merge 결과 7: `new`·`duplicate`·`enrich`·`conflict`·`supersede`·`obsolete`·`needs_review` |

## 2. 상태값 비교·정렬표 (핵심 산출)
| 개념 | Memory Trust | Knowledge Learning | 정렬 판정 | 권장 |
|---|---|---|---|---|
| 신규 미검토 | `raw_candidate` | `status=candidate`(layer=learned) | **혼동 위험** | learned 신규 = `raw_candidate` + `source_layer=learned`·`memoryType=self_growth_knowledge_candidate` |
| 레거시 이전 기본값 | `migrated_candidate` | (없음 — 지식 문서에 0건) | **분리 OK** | learned는 migrated_candidate를 *쓰지 않는다*(legacy 전용) |
| 1차 검토 통과 | `reviewed`(≠stable) | (없음) | gap | learned도 `reviewed`(실재·출처·중복 통과, 아직 정본 아님) 도입 |
| 정본/추론 사용 | `stable`(canonical 유일) | (없음) | **구분 필요** | learned는 stable이 아니라 **`learned_approved`**(traceable·non-canonical) |
| 보강 | (M4 검토) | merge `enrich` | OK | 동일 의미 |
| 대체 | `superseded`(상태) | merge `supersede`(동사) | 용어차 | learned 결과→ 상태 `superseded` 매핑 |
| 폐기/과거 | `deprecated` | merge **`obsolete`** | **용어 불일치** | learned `obsolete` → `deprecated`로 통일(또는 매핑 명시) |
| 인간검토 필요 | `flagged_human` | merge `needs_review` | 부분일치 | 고위험(임신/의료)은 `needs_review`→`flagged_human` |
| 탈락(보존) | `rejected`(audit 보존) | (없음) | gap | learned도 `rejected`(삭제 아님·audit) 도입 |
| 중복 | (M4 dedup) | merge `duplicate` | OK | 동일 |
| 충돌 | `superseded`+history | merge `conflict`(keep old+history) | 일치(철학) | 둘 다 *삭제 금지·history* |

## 3. 각 상태의 의미 (정본)
- `raw_candidate` — Foundation에서 새로 생성된 미검토. **stable 불가.**
- `migrated_candidate` — **legacy SIASIU 메모리 이전 전용 기본값.** 자동 stable 절대 ❌. (learned 지식은 여기에 안 들어옴.)
- `candidate(learned)` — **신규 지식 증류 후보.** `promotion_ready=false`·`canonical_write=false`·`index_default=false`. (개념상 raw_candidate에 대응하되 source_layer=learned.)
- `reviewed` — 1차 검토(실재·형식·출처·중복) 통과. **≠ stable.**
- `stable` — canonical 기본 추론 사용 가능. **가장 강한 상태. 자동 생성 절대 ❌.**
- **`learned_approved`(신규 제안)** — Opus 정책 심사 + (필요 시 Leo) 통과한 learned 지식. **traceable하지만 non-canonical.** stable과 동일시 ❌.
- `deprecated` — 과거 참고용. 기본 검색/추론 **제외.**
- `superseded` — 최신이 대체(supersededBy). 영구 보존·검색 제외.
- `rejected` — 탈락. **삭제 아님**(rejectionReason·audit).
- `flagged_human` — 고위험. **인간 승인 전 stable/approved 불가.**

## 4. 전이 가능/불가 경로
```
candidate(learned) → reviewed → learned_approved   (Opus 정책 + 고위험은 Leo)
candidate(learned) → flagged_human → (Leo) → learned_approved | rejected
migrated_candidate → reviewed → stable             (Leo 확인 ∨ source+evidence 검증)
raw_candidate → reviewed | rejected | flagged_human
any → superseded | deprecated | rejected           (검토)
```
**불가(불변):**
- `* → stable` 자동 ❌ (어떤 경로도). `migrated_candidate → stable` 직행 ❌. `flagged_human → stable/approved` 자동 ❌.
- `learned_approved ⇒ stable` 동일시 ❌ (learned_approved는 canonical 아님).
- `rejected/deprecated/superseded` → 기본 검색·추론 **제외**(삭제는 아님).

## 5. 자동 stable 금지 규칙(통합 불변)
1. canonical `stable`은 **Leo 확인 결정** 또는 **(source_ref + evidence_ref + 정책 통과)** 일 때만. 자동 0.
2. `learned_approved`도 **Opus 정책 심사 통과 + 고위험은 Leo** 필요. `promotion_ready`는 자동 true 금지.
3. health/pregnancy/lactation/teen/medical/supplement/procedure = **flagged_human 경유**(자동 확정 ❌).
4. evidence_ref 없음 = stable/approved 금지 사유.

## 6. learned candidate ↔ migrated_candidate 차이 (혼동 방지)
| | migrated_candidate | learned candidate |
|---|---|---|
| 출처 | 기존 SIASIU 메모리(작업/고객/지식 Vault) | **새 자료 증류**(web/문서/PDF/유튜브) |
| 목적 | legacy memory 이전 | new knowledge distillation |
| sourceSystem/layer | working/customer/knowledge_vault | `source_layer=learned` |
| 기본 상태 | `migrated_candidate` | `status=candidate`(→ raw_candidate 류) |
| PII 위험 | 고객 메모리는 높음(flagged_human 다수) | 원칙상 PII 없음(공개 자료) |
| Trust Gate | MemoryTrustDecision(PII·동의·삭제 규칙) | source routing·evidence·conflict 규칙 |
| 승격 끝상태 | `stable`(canonical) | `learned_approved`(non-canonical) |

→ **둘 다 Trust Gate 통과 필요하나 출처/위험/PII 규칙이 다르다.** 같은 store에 넣지 않는다.

## 7. source_layer ≠ status (축 분리)
- `source_layer`(canonical/learned/web_recent/dynamic) = 지식이 **어디서 왔나**(Memory의 `sourceSystem`/`provenance_origin`에 대응).
- `status`(candidate/reviewed/approved/stable/…) = **신뢰 상태**.
- 두 축은 **독립**. "source_layer=learned"가 "신뢰 낮음"을 뜻하지 않으며, "status=candidate"가 "learned"를 뜻하지 않는다.

## 8. 향후 구현 시 status enum 통합 — **필요(권장)**
- 단일 `TrustStatus` enum으로 통합하되 **두 신규 상태 추가**: `candidate`(또는 raw_candidate에 흡수)·**`learned_approved`**.
- 통합 enum(제안): `raw_candidate · migrated_candidate · candidate_learned · reviewed · learned_approved · stable · deprecated · superseded · rejected · flagged_human`.
- 구분축: `source_layer`(또는 memoryType/sourceSystem) + `provenance_origin`.
- `reviewed_by`·`policyVersion`·`auditLogId`는 **두 시스템 동일 의미로 공유**.
- **store는 분리**(customer_memory / working_memory / knowledge_learned). enum만 공유.

## 9. 미정렬·gap (정렬 문서가 남기는 TODO)
1. Knowledge 코드에 `reviewed`·`learned_approved`·`rejected` 상태 미구현(현재 boolean governance만) → 구현 시 enum 도입.
2. merge `obsolete` 용어를 `deprecated`로 통일 또는 매핑 상수 추가.
3. `needs_review`의 고위험 자동 `flagged_human` 매핑 규칙 코드화.
4. `reviewed_by` enum(none/rule_gate/opus/claim_guard/leo/human) 공유 상수화.
5. MemoryTrustDecision을 learned 후보에도 적용할지(§Stage6 통합 문서 참조).
