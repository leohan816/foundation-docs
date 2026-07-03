# Foundation Brain Architecture — Self-Audit (2026-06-28)

> **감사/정렬 작업 — 신규 기능 추가 아님.** Knowledge Learning System v1(코드/문서/테스트)과 Memory Trust/Migration 설계(M1~M6)를 종합해 모순을 감사하고 다음 배선 계획을 확정한다.
> ★이번 작업 불변: **canonical write 0 · learned 실제 승격 0 · memory migration 실행 0 · 고객 memory 원문 읽기 0 · memory.db 접근 0 · DeepSeek/web live 0.**

## 1. Executive Summary
- 두 시스템(learned 지식 / legacy 메모리)은 **철학이 일관**되고(자동 stable 금지·canonical 분리·LLM 비-판정·traceable), **상태 어휘만 일부 불일치**(아래 §5)가 발견됨.
- 발견된 불일치는 **용어 정렬 + `learned_approved` 상태 신설 제안**으로 해소(코드 변경은 enum 도입 시점으로 연기, 이번엔 문서 정렬).
- External disclosure: **고객/투자자 실제 메시지는 clean**(internal 세부 노출 0). 내부 정책 문서가 never_disclose 패턴을 *설명*하는 것은 정상.
- 테스트: **175 assertions / 0 FAIL**(정책 108 + governance 28 + safety 39). live 0.

## 2. Baseline (Stage 0)
| 항목 | 값 |
|---|---|
| SIASIU latest | `629855b`(직전 `1bb89bc`+docs 이동) · clean · main=origin/main |
| Vault latest | `70c39e0` · clean · main=origin/main |
| app/data | `ssbrain.sqlite` 단독 |
| memory.db | 없음 ✅ |
| raw_file indexed | 0 ✅ |
| canonical write | 0 ✅ |
| learned 실제 승격 | 0 (후보 9개 `_review/test-run-20260628/`에만) ✅ |
| DeepSeek/web live | 0 ✅ |

## 3. Documents Audited
| # | 문서 | 위치 | audit |
|---|---|---|---|
| 1 | KNOWLEDGE_LEARNING_SYSTEM_V1 | 설계문서/ | ✅ |
| 2 | EVIDENCE_BASED_KNOWLEDGE_DISTILLATION_V1 | 설계문서/ | ⚠→생성(부재였음) |
| 3 | LEARNED_TAXONOMY_V1 | 설계문서/ | ✅ |
| 4 | SOURCE_ROUTING_POLICY_V1 | 설계문서/ | ✅ |
| 5 | CONFIDENCE_MODEL_V1 | 설계문서/ | ✅ |
| 6 | DIRECT_KNOWLEDGE_INPUT_V1 | 설계문서/ | ✅ |
| 7 | ANSWER_PROVENANCE_POLICY_V1 | 설계문서/ | ✅ |
| 8 | RECOMMENDATION_EVIDENCE_POLICY_V1 | 설계문서/ | ✅ |
| 9 | EXTERNAL_MESSAGING_POLICY_V1 | 설계문서/ | ✅ |
| 10 | KNOWLEDGE_LEARNING_REPORT_20260628.html | 설계문서/ | ✅ |
| 11 | MEMORY_TRUST_MIGRATION_설계서 | 설계문서/ | ✅ |
| 12 | MEMORY_INVENTORY_EXPORT_설계서 | 설계문서/ | ✅ |
| 13 | MEMORY_M3_MIGRATED_CANDIDATE_IMPORT_설계서 | 설계문서/ | ✅ |

> ★문서 위치 주의: 입력 목록은 `docs/`로 표기됐으나 실제는 **`설계문서/`**(직전 사용자 지시로 docs→설계문서 이동). 신규 산출물도 `설계문서/`.

## 4. Philosophy Consistency (Stage 1)
| 원칙 | 일치 | 근거 |
|---|---|---|
| DeepSeek is not a judge | ✅ | 7+ 문서·`LLM_IS_FINAL_JUDGE=False`·distillation §1 |
| Opus = evidence reviewer under approved policy | ✅ | 8 문서 |
| Leo = system builder(규칙 승인) | ✅ | distillation §3·system doc |
| learned ≠ canonical | ✅ | 7 문서·`layer=learned`·`canonical_write=false` |
| migration 자동 stable ❌ | ✅ | Memory M1 원칙1·2 / M3 stableCount==0 |
| migrated 기본 = migrated_candidate | ✅ | Memory M1·M3 |
| every learned claim source-traceable | ✅ | `source_urls`·`references`·distillation 필수필드 |
| wrong source type → reject/downgrade | ✅ | `source_policy.can_confirm`·knowledge_input |
| uncertain-but-useful → cautious/uncertain 저장 | ✅ | `make_learned_candidate(uncertain_but_useful)` |
| conflict → 기존 삭제 ❌·history | ✅ | `merge_decision conflict keep_old` / Memory rejected 보존 |
| external 내부세부 비공개 | ✅ | `disclosure_policy`·message_for clean |
**판정: 11/11 일치. 불일치 0.** (단, distillation 문서 부재였던 것 → 생성으로 해소.)

## 5. State Model Alignment (Stage 2 요약 — 상세는 별도 정렬문서)
| 발견 | 판정 | 조치 |
|---|---|---|
| learned `status=candidate` vs `migrated_candidate` | **다른 개념**(신규증류 vs legacy이전) | 정렬문서 §6 명문화·store 분리 |
| merge `obsolete` vs Memory `deprecated` | **용어 불일치** | `obsolete→deprecated` 통일 권장 |
| learned에 `reviewed`/`rejected`/`stable` 상태 부재 | gap | enum 도입 시 추가 |
| `learned_approved`(traceable·non-canonical) 부재 | **신설 필요** | stable과 구분 |
| `source_layer` ≠ `status` 축 혼동 위험 | 분리 명시 | 정렬문서 §7 |
| `reviewed_by`/`policyVersion`/`auditLogId` | 두 시스템 동일 의미 | 공유 상수화 |
→ 상세·전이표·통합 enum 제안: **`FOUNDATION_TRUST_AND_LEARNED_STATE_ALIGNMENT_V1.md`**.

## 6. Source / Confidence / Provenance Consistency (Stage 3)
| 점검 | 결과 |
|---|---|
| source_policy claim_type ↔ confidence_model claim_group 매핑 | ✅ 일관(21 claim_type 모두 _CLAIM_GROUP 매핑) |
| high-risk 목록 충돌 | ✅ source_policy.HIGH_RISK_CLAIMS ⊇ confidence_model.HIGH_RISK(정렬됨) |
| confidence가 high-risk assertive 차단 | ✅ `answer_mode` 고위험→최대 grounded(Tier1+≥85)/그외 cautious |
| answer_provenance가 source_layer×answer_mode 분리 | ✅ `_PHRASES` 키=(answer_mode, source_layer) |
| 금지표현("저장된 검증 지식" 등) 실사용 | ✅ 0건(전부 '금지표현 설명' 맥락) |
| cannot_determine가 본문 hallucination 안 만듦 | ✅ `compose` cannot_determine→추임새만(본문 미부착) |
| dynamic freshness ↔ recheck_on_new_evidence 일관 | ✅ confidence freshness 급락 + recheck_cycle 동적→on_new_evidence + taxonomy dynamic_context |
**수정 불필요(전부 일관).**

## 7. External Disclosure Audit (Stage 4)
| 대상 | 결과 |
|---|---|
| customer_safe_message | external_safe ✅ · 내부세부 0 |
| investor_summary | external_safe ✅ · traceable 언급·scoring formula 0 |
| 메시징/추천/provenance 정책 문서 | never_disclose 패턴 *설명* 포함(내부문서이므로 정상) |
| HTML 지식 리포트 | 내부 알고리즘 상세 포함 = **internal_only 분류**(외부 공유 금지 명시 필요) |
| disclosure 패턴 보강 | domain_fit/claim_group/BM25/e5-small/can_confirm 등 추가 → 외부 차단 테스트 GREEN(+2) |
**조치: `disclosure_policy.py` 패턴 보강 + 테스트 18→20. 메시지 자체 누출 0.**

## 8. Memory Trust × Learned Knowledge Integration (Stage 6)
**검토한 핵심 질문 → 권장안(task 기본안과 일치, 검증함):**
| 질문 | 결론 |
|---|---|
| learned candidate는 MemoryTrustDecision 대상? | **예** — 단 규칙셋이 다름(source/evidence/conflict 중심, PII는 보통 없음) |
| migrated vs learned candidate 같은 store? | **아니오 — store 분리**(legacy memory vs new knowledge) |
| customer memory ↔ learned layer | **절대 분리**(섞임 금지·PII 격리) |
| learned layer는 Trust Core 어느 계층? | Layer A(Foundation Trust Core) 산하 *non-canonical learned* 서브계층 |
| source/evidence/confidence/recheck ↔ MemoryTrustDecision | learned의 점수/recheck = Decision의 `sourcePresent/evidencePresent/recheckRequired`에 대응 |
| reviewed_by/policyVersion/auditLogId 의미 | **동일** — 공유 상수화 권장 |
| stable ↔ approved learned | **동일시 ❌** |
| approved learned = stable? | **아니오 → `learned_approved`(traceable·non-canonical) 별도 상태** |
**권장 기본안(확정 제안):** ① customer/working/knowledge-learned **store 분리** ② **status enum 공유**, `source_layer`/`memoryType`로 의미 분리 ③ `learned_approved`/`reviewed_learned`는 canonical `stable`과 구분(traceable·non-canonical) ④ canonical stable = 최강 상태 ⑤ migrated_candidate=legacy 전용, learned candidate=신규 증류 전용 ⑥ 둘 다 Trust Gate 통과하되 출처/위험/PII 규칙 상이.

## 9. Pipeline Wiring Plan (Stage 5 요약)
A 일반답변 · B 추천 · C 지식입력 · D 메모리이전 · E external guard — 각 입력/출력/모듈/금지경로/audit/실패처리/다음테스트는 **`FOUNDATION_PIPELINE_WIRING_PLAN_V1.md`**. 배선 우선순위: **(1) answer.py에 provenance.compose + external_guard 배선** → (2) 추천 경로 → (3) knowledge_input 입력연결 → (4) learned 상태 enum → (5) Memory Trust Gate(승인 후).

## 10. Test Results (Stage 7)
| 스위트 | assertions | 결과 |
|---|---|---|
| learned_taxonomy / source_policy / confidence_model / answer_provenance / knowledge_input / recommendation_evidence | 10/18/18/11/16/15 | ✅ |
| disclosure_policy (보강) | 20 (+2) | ✅ |
| **정책 소계** | **108** | **0 FAIL** |
| candidate governance(회귀) | 28 | ✅ |
| answer safety_gate(회귀) | 39 | ✅ |
| **합계** | **175** | **0 FAIL** |
live DeepSeek/web 0 · memory.db 0 · raw_file 0 · canonical write 0 · learned 승격 0 · Vault dirty 0.

## 11. Remaining Risks
| # | 위험 | 등급 | 대응 |
|---|---|---|---|
| 1 | learned 상태 enum 미구현(boolean governance만) — `reviewed/learned_approved/rejected` 부재 | medium | enum 도입(정렬문서 §8) |
| 2 | `obsolete`/`deprecated` 용어 이중 | low | 통일 또는 매핑 상수 |
| 3 | answer.py에 provenance/external_guard 미배선 — 자유서술 누출 가능 | **high** | 배선 우선순위 1 |
| 4 | disclosure 패턴 기반 탐지 — 신규 내부용어 누락 시 fail-open | medium | 정기 패턴 리뷰 |
| 5 | Memory Trust Gate 미구현(설계만) | (의도) | M6 별도·승인 후 |
| 6 | learned/ migrated candidate store 물리 분리 미구현 | medium | 통합 구현 시 store 분리 강제 |

## 12. Next Implementation Plan
1. **answer.py 말단에 `answer_provenance.compose` + `disclosure_policy.external_guard` 배선** + 통합 offline 테스트.
2. learned 상태 enum 도입(`candidate→reviewed→learned_approved`, `rejected`, `deprecated`) — 정렬문서 §8 통합 enum.
3. `recommendation_evidence`를 실제 retrieval에 연결(traceable references 유지).
4. knowledge_input을 실제 입력명령(유튜브/PDF/URL)에 연결(candidate만·review queue·미색인).
5. (승인 후·별도) Memory Trust Gate M6 + store 분리 + MemoryTrustDecision 구현.
6. 모든 단계 live 호출 전 Leo 승인 게이트.
