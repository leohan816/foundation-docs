# Foundation — Evidence-based Knowledge Distillation into a Learned Memory Layer v1

> **2026-06-28 · 핵심 철학 정본.** (self-audit에서 입력목록 #2로 참조됐으나 부재 → 보강 생성.)
> 구현 모듈: `app/learned_taxonomy·source_policy·confidence_model·answer_provenance·knowledge_input·recommendation_evidence·disclosure_policy` (7 suites/106 assertions GREEN).

## 정의
AI가 자료를 읽고 **claim/card 단위로 지식을 증류**한 뒤, 모델 파라미터에 fine-tuning 하는 것이 *아니라* **Foundation의 외부 후천 지식층(learned layer)** 에 저장한다. 파라미터가 아닌 *데이터*로 학습하므로 **추적·검수·철회·재검증이 가능**하다.

## 모든 learned claim의 필수 필드
`source · source_type · evidence_score · confidence_score · answer_mode · review_status · recheck_cycle · conflict_history`
(→ `knowledge_input.make_learned_candidate` + `confidence_model.score_claim`로 구현.)

## 11 원칙 (이 작업 전체에 적용)
1. **DeepSeek는 후보 생성자/표현 생성자/요약자** — 지식의 최종 판단자가 아니다. (모든 DeepSeek 참여 작업에 적용.)
2. **Opus는 Leo 승인 규칙에 따라 출처 기반으로 케이스를 대량 심사하는 자동 evidence reviewer.**
3. **Leo는 개별 지식이 아니라 지식 정책·판단 규칙을 승인하는 system builder.**
4. learned knowledge는 canonical knowledge와 **분리**.
5. 기존 SIASIU memory는 **자동 stable로 이전하지 않는다**(기본 `migrated_candidate`).
6. health/pregnancy/lactation/teen/medical/supplement/procedure claim은 **자동 확정 금지**(flagged_human 경유).
7. 모든 learned claim은 **source-traceable**.
8. claim_type에 안 맞는 source는 **거부 또는 강등**(건강을 뉴스로 확정 ❌, 트렌드를 논문으로 판단 ❌).
9. 불확실하지만 반복질문 가치 있으면 **cautious/uncertain answer_mode로 저장**.
10. 충돌 시 기존 지식 삭제 ❌ — **conflict history 보존**.
11. 고객/파트너/투자자에게 **scoring/routing/safety rule/reranker/learned internals 비공개**.

## 성실함의 정의 (원칙)
Foundation의 성실함 = "정답을 안다고 주장하는 것"이 아니라, **어떤 근거로 어디까지 말할 수 있는지 투명하게 밝히는 것** — `answer_mode`(assertive→cannot_determine) + provenance 추임새 + traceable references로 구현.

## 관련 문서
상태 모델: [Trust & Learned State Alignment](FOUNDATION_TRUST_AND_LEARNED_STATE_ALIGNMENT_V1.md) · 배선: [Pipeline Wiring Plan](FOUNDATION_PIPELINE_WIRING_PLAN_V1.md) · 감사: [Brain Architecture Self-Audit](FOUNDATION_BRAIN_ARCHITECTURE_SELF_AUDIT_20260628.md).
