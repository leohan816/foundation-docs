# Foundation — Pipeline Wiring Plan v1

> **2026-06-28 · 배선 계획(설계만·구현 0).** 현재 *독립 모듈로 검증된*(7 suites/106 assertions) 정책을 실제 SIASIU/Foundation 답변·지식입력·메모리 파이프라인에 **어떻게 연결할지** 확정한다.
> 모듈: `answer_provenance` · `confidence_model` · `source_policy` · `recommendation_evidence` · `disclosure_policy` · `knowledge_input` · `learned_taxonomy` · (기존) `safety_words`/answer.py `safety_gate`.
> ★불변: learned 실제 승격 0 · canonical write 0 · 외부 노출 전 `external_guard` 필수 · LLM은 표현 생성자(판정 아님).

## A. 일반 답변 파이프라인
`query → 언어/intent/risk 분류 → retrieval → source_layer 결정 → confidence/answer_mode → answer_provenance.compose() → safety_gate → external_guard → 최종 답변`

| 항목 | 내용 |
|---|---|
| 입력 | 사용자 query |
| 출력 | `{user_text, trace}` (추임새+본문 / 내부 trace) |
| 사용 모듈 | retrieval(ssbrain) · `confidence_model.answer_mode` · `answer_provenance.compose` · answer.py `safety_gate` · `disclosure_policy.external_guard` |
| 금지 경로 | safety_gate 우회 ❌ · external_guard 미통과 노출 ❌ · raw_file 본문 노출 ❌ · 고위험 assertive ❌ |
| audit/trace | source_layer · evidence_score · source_urls · answer_mode · reviewed_by · last_verified_at |
| 실패 시 | hits 0 → UNKNOWN(cannot_determine) · safety 위반 → cautious 강등 · external_guard 차단 → 재작성/internal-only |
| 다음 테스트 | answer.py에 provenance+external_guard 배선 후 offline 통합 테스트(grounded·금지표현 0·내부세부 0) |

## B. 추천 답변 파이프라인
`query → user context → product/ingredient retrieval → recommendation_evidence.build → confidence/answer_mode → safety boundary check → answer_provenance → external_guard → 최종 추천`

| 항목 | 내용 |
|---|---|
| 입력 | query + user_context(피부타입·임신여부 등) |
| 출력 | `{can_recommend, answer_mode, references[], phrase}` |
| 사용 모듈 | `recommendation_evidence.evidence_item/build_recommendation` · `confidence_model` · `answer_provenance` · `external_guard` |
| 금지 경로 | 안전 경계 깨졌는데 추천 ❌ · 단일 reference 추천 ❌ · 브랜드 claim을 객관 효능으로 ❌ · Tier3로 safety 단정 ❌ |
| audit/trace | references(layer·claim_type·source_types·tiers·confidence·brand_claim·routing_ok) · safety_boundary_ok |
| 실패 시 | safety_boundary 실패 → cautious 강등 · unsafe → `can_recommend=false`·cannot_determine |
| 다음 테스트 | 실제 retrieval 연결 후 추천 e2e(traceable references·LLM not final judge 유지) |

## C. Direct Knowledge Input 파이프라인
`input(text/url/youtube/pdf/daily_report) → raw/intake → source_card → claim split → claim_type classify → source policy validate → existing knowledge search → merge/conflict/supersede → confidence → learned candidate → policy review → learned layer pending → 승인 후에만 reindex`

| 항목 | 내용 |
|---|---|
| 입력 | 8 input types (`knowledge_input.INPUT_TYPES`) |
| 출력 | learned candidate(들) (status=candidate·promotion_ready=false·layer=learned) → review queue |
| 사용 모듈 | `knowledge_input.process` · `source_policy.can_confirm` · `confidence_model.score_claim` · `learned_taxonomy` |
| 금지 경로 | raw_only가 claim 생성 ❌ · 기존지식 검색 없이 candidate ❌ · 자동 승격 ❌ · conflict 시 기존 삭제 ❌ · DeepSeek 단독 확정 ❌ |
| audit/trace | source_cards · merge.result+history · scores · routing_ok · created_at |
| 실패 시 | routing 불가 → cautious/uncertain 강등 · conflict → keep old + history · pdf/raw_only → intake에서 정지 |
| 다음 테스트 | DeepSeek=후보 생성만(판정 아님) 경계 테스트 · review queue 저장 후 미색인 확인 |

## D. Memory Migration 파이프라인 (M2~M6 — 별도 설계서)
`M2 inventory(읽기전용·masked) → M3 migrated_candidate import → M4 review/supersede/deprecate → M5 stable(trust gate 후만) → M6 Memory Trust Gate`

| 항목 | 내용 |
|---|---|
| 입력 | 기존 SIASIU 메모리(working/customer/knowledge_vault) |
| 출력 | migrated_candidate store(별도·non-canonical) → 검토 후 stable 후보 |
| 사용 모듈 | (설계만) MemoryTrustDecision · M3 import dry-run 도구 |
| 금지 경로 | 자동 stable ❌ · 고객 memory 원문 읽기/저장 ❌(이번 작업) · memory.db write ❌ · stableCount==0 assertion |
| audit/trace | provenance_origin · source_ref · auditLogId · policyVersion · reviewedBy · stableEligible |
| 실패 시 | PII/동의/삭제 미설계 → flagged_human · evidence_ref 없음 → stable 금지 |
| 다음 테스트 | (이번 작업 범위 아님 — Memory Trust 설계서 M2~M6) |

## E. External Answer Guard (모든 외부 출력 공통 말단)
`draft answer → disclosure_policy.external_guard() → 차단 시 재작성/internal-only → 최종 customer/investor safe text`

| 항목 | 내용 |
|---|---|
| 입력 | 모든 외부 청중(customer/partner/investor)용 draft |
| 출력 | external-safe 텍스트 (never_disclose/secret 제거) |
| 사용 모듈 | `disclosure_policy.external_guard` · `redact` · `message_for` |
| 금지 경로 | scoring formula/weight/routing/reranker/safety rule/learned internals 노출 ❌ · API key 평문 ❌(어디에도) |
| audit/trace | violations[] · max_sensitivity_name · audience |
| 실패 시 | internal_only 검출 → 재작성 또는 internal 보관 · secret 검출 → 전면 차단 |
| 다음 테스트 | 답변 파이프라인 말단에 external_guard 강제 배선 + LLM 자유서술 출력에 대한 guard 통과율 테스트 |

## 배선 순서(권장)
1. **answer.py에 `answer_provenance.compose` + `external_guard` 배선**(현 safety_gate 다음 단계) — 가장 우선.
2. 추천 경로에 `recommendation_evidence.build_recommendation` 연결.
3. `knowledge_input.process`를 실제 입력 명령(유튜브/PDF/URL)에 연결(여전히 candidate만·review queue).
4. learned 상태 enum(`reviewed`/`learned_approved`/`rejected`) 도입(상태 정렬 문서 §8).
5. (별도·승인 후) Memory Trust Gate M6.

## 공통 audit 필드(전 파이프라인)
`source_layer · evidence_score · source_urls · answer_mode · reviewed_by · last_verified_at · policyVersion · auditLogId`.
