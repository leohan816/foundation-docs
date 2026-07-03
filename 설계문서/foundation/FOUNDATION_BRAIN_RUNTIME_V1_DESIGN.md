# Foundation Brain Runtime v1 — Design (v0.1~v0.5 core)

> **2026-06-28 · LMR v1.0 baseline 위 Foundation Brain Runtime.** Knowledge Brain + Response Brain + Trust Core + LMR M6를 runtime 계약으로 묶어 answer runtime에서 end-to-end 동작.
> ★production live·API live·canonical write·learned/canonical real promotion·customer memory migration은 **별도 human approval 전까지 닫힘.**

## Runtime Modes
| mode | 동작 | user_text | write |
|---|---|---|---|
| **shadow**(기본) | trace만 | 변경 0 | 0 |
| canary | 대체답변 생성·미노출 | 노출 0 | 0 |
| controlled_apply | low/medium·근거충분·gate통과만 변경 | diff/audit 필요 | 0 |
| live | v1.0에서도 disabled | — | 별도 승인 |

## 4계층 + 파이프라인 (v0.1 map)
`engine.search → (empty→cannot_determine) → draft → safety_gate(Trust) → evidence_mode(Knowledge) → answer_type(Trust) → high_risk cap → opener(Response) → external_guard(Trust) → trace`. Knowledge 7·Response 6·Trust 3+safety·LMR 9 모듈.

## 계약 (v0.2) — `foundation_brain_contracts`
UserInputEnvelope·IntentClassification·RiskClassification·RetrievalHitContract·EvidencePacket·KnowledgeDecision·MemoryDecision·ResponsePlan·TrustDecision·FinalAnswerPacket·AuditTrace. ★raw_text 미포함·missing metadata fail-closed·고위험 근거부족→assertive 차단·출력 DTO user_text_modified/write/raw_text_included=false.

## Knowledge Brain Runtime (v0.3) — `foundation_knowledge_runtime`
RetrievalHit→EvidencePacket. 근거 없음→cannot_determine·unknown tier→uncertain·tier2+prov+reviewed→grounded·source 없으면 upgrade 금지·고위험 비-Tier1→cautious 이하·conflict→grounded 금지. evidence_sufficient는 grounded+고위험충분일 때만.

## Response Brain Runtime (v0.4) — `foundation_response_runtime`
ResponsePlan. ★max_answer_mode = Knowledge mode가 ceiling(절대 초과 못 함)·새 사실 0·확신 upgrade 0·safety caveat 유지. response_diff_audit(확신강화·caveat제거 탐지). user_text 적용은 controlled_apply+low/medium+gate통과만.

## Trust Core Runtime (v0.5) — `foundation_trust_runtime`
10 게이트 통합: raw/teacher guard·evidence boundary(Response≤Knowledge)·safety caveat·certainty upgrade·medical overreach·skin procedure·purchase/product·do-not-buy·internal algorithm(answer_type+쿼리 키워드)·customer memory. allowed/blocked_reasons/safe_for_external.

## Pipeline (v0.5) — `foundation_brain_runtime_pipeline`
Knowledge→Memory(M6 shadow)→Response→Trust→FinalAnswerPacket. shadow 기본·user_text/write/promotion 0·answer.py 미호출(별도 shadow).

## 검증 (v0.1~v0.5)
- 단위: contracts 10·knowledge 8·response 8·trust 10·pipeline 9 = **45 assertions**.
- e2e: 15 시나리오(피부상담·제품추천·성분안전·고객메모리 사용/차단·CS·근거없음·의료시술·임신/수유·이상반응·내부정책·사지마세요·브랜드vs독립·오래된자료·취향vs안전) **15/15**.
- 1차 발견: 내부정책 질문 미차단(atc 미분류) → Trust 게이트 쿼리 키워드 가드 강화. s08 cannot_determine=안전(기대치 정정).
- ★shadow 불변식: user_text_modified 0·write 0·promotion 0·raw_text_included 0.

## 남은 단계 (v0.6~v1.0)
v0.6 e2e 300+·v0.7 answer.py shadow 통합·v0.8 canary/controlled_apply·v0.9 RC/rehearsal·v1.0 final. **현재 트레인 위치 = v0.5 core 완료.**
