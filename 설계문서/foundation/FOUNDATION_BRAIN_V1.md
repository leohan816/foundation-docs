# Foundation Brain v1 — 상위 개념 (정본 진입점)

> **2026-06-28 · 통합 명칭 = "Foundation Brain".** 지금까지의 Knowledge Learning + Response Brain + Trust/Guard 작업을 하나의 상위 구조로 정렬한다.
> ★**Foundation Brain = Knowledge Brain + Response Brain + Trust Core.**
> Foundation Brain은 **모델 fine-tuning이 아니라 external memory + policy + guard** 구조다. **SIASIU = Foundation Brain을 쓰는 실행/답변 레이어**, **Cosmile = Foundation Brain을 활용하는 서비스/비즈니스 레이어.**

## 0. 정의
**Foundation Brain은 SIASIU/Cosmile이 사용하는 지식·응답·신뢰 통합 두뇌다.**
- **Knowledge Brain**은 "무엇이 맞는가"를 담당한다.
- **Response Brain**은 "어떻게 말해야 고객이 이해하고 만족하는가"를 담당한다.
- **Trust Core**는 "무엇을 말해도 되는가, 어떤 상태로 저장해도 되는가, 외부에 무엇을 공개하면 안 되는가"를 통제한다.

### 구성 트리
```
Foundation Brain
├── Knowledge Brain
│   ├── Evidence-based Knowledge Distillation
│   ├── Source Routing
│   ├── Confidence Model
│   ├── Learned Memory Layer
│   └── Recheck / Conflict History
│
├── Response Brain
│   ├── Satisfaction-based Answer Pattern Distillation
│   ├── Answer Type Taxonomy
│   ├── Satisfaction Score
│   ├── Answer Pattern Layer
│   └── Response Memory Layer
│
└── Trust Core
    ├── Safety Gate
    ├── External Disclosure Guard
    ├── Answer Provenance
    ├── Memory Trust Status
    └── Audit / Policy Version
```

### ★Response Brain은 Knowledge Brain을 넘을 수 없다 — 4대 불변식
1. **근거가 부족하면 단정 금지.**
2. **고위험이면 cautious 유지.**
3. **내부 알고리즘 공개 금지.**
4. **teacher answer 원문 복사 금지.**

## 1. 세 부분
| 부분 | 담당 질문 | 다루는 것 | 한 줄 |
|---|---|---|---|
| **Knowledge Brain** | 무엇이 맞는가 | evidence · source · confidence · learned memory · claim validation | *Evidence-based Knowledge Distillation into a Learned Memory Layer* |
| **Response Brain** | 어떻게 말해야 고객이 이해·만족하는가 | answer pattern · tone · structure · satisfaction score · response memory | *Satisfaction-based Answer Pattern Distillation into a Response Memory Layer* |
| **Trust Core** | 무엇을 말해도 되나 · 무엇을 공개하면 안 되나 · 어떤 상태로 저장/승격 가능한가 | safety_gate · external_guard · answer_provenance · memory trust · audit · policyVersion | 안전·공개·상태/승격 통제 |

## 2. 핵심 원칙 (불변)
1. **Response Brain은 Knowledge Brain의 evidence boundary를 넘을 수 없다.**
2. **고객 만족도는 evidence를 upgrade하지 않는다.** (`answer_satisfaction.cap_answer_mode`·`can_upgrade_evidence()=False`)
3. **teacher answer는 원문 복사 대상이 아니라 pattern extraction 대상이다.** (`raw_teacher_text_stored=false`·hash만)
4. **Foundation Brain = external memory + policy + guard** (fine-tuning ❌).
5. **Trust Core는 우회 불가** — Response Brain도 safety_gate·external_guard를 넘지 못한다.
6. **SIASIU=실행/답변 레이어 · Cosmile=서비스/비즈니스 레이어** (Foundation Brain은 공용 두뇌).

## 3. 답변 시 세 부분의 상호작용
```
질문
 → [Knowledge Brain] 검색·source routing·confidence → answer_mode·evidence boundary 결정
 → [Response Brain]   answer_type별 pattern(구조·톤·순서) 선택 — 단, evidence boundary 내에서만
 → [Trust Core]       safety_gate(본문) → answer_provenance(trace 분리) → external_guard(내부 비공개) → 최종
```
→ Response Brain이 아무리 "잘 말해도" Knowledge Brain의 `answer_mode`(예: cautious)와 Trust Core의 안전/공개 경계를 **넘을 수 없다.**

## 4. 문서·코드 정렬 (이 상위 개념 아래)
### 4.1 Knowledge Brain
- 문서: `FOUNDATION_EVIDENCE_BASED_KNOWLEDGE_DISTILLATION_V1.md` · `FOUNDATION_KNOWLEDGE_LEARNING_SYSTEM_V1.md` · `FOUNDATION_LEARNED_TAXONOMY_V1.md` · `FOUNDATION_SOURCE_ROUTING_POLICY_V1.md` · `FOUNDATION_CONFIDENCE_MODEL_V1.md` · `FOUNDATION_DIRECT_KNOWLEDGE_INPUT_V1.md` · `FOUNDATION_RECOMMENDATION_EVIDENCE_POLICY_V1.md`
- 코드: `app/learned_taxonomy.py` · `source_policy.py` · `confidence_model.py` · `knowledge_input.py` · `recommendation_evidence.py` · `learning_candidate.py` · `retrieval_schema.py` · `web_adapter.py`

### 4.2 Response Brain
- 문서: `FOUNDATION_RESPONSE_BRAIN_V1.md` · `FOUNDATION_ANSWER_PATTERN_DISTILLATION_V1.md` · `FOUNDATION_ANSWER_SATISFACTION_SCORE_V1.md` · `FOUNDATION_ANSWER_PATTERN_LAYER_V1.md` · `FOUNDATION_RESPONSE_BRAIN_REPORT_20260628.html`
- 코드: `app/answer_pattern_taxonomy.py` · `answer_satisfaction.py` · `answer_pattern_distillation.py` · `answer_pattern_layer.py`

### 4.3 Trust Core
- 문서: `FOUNDATION_ANSWER_PROVENANCE_POLICY_V1.md` · `FOUNDATION_EXTERNAL_MESSAGING_POLICY_V1.md` · `FOUNDATION_ANSWER_PIPELINE_GUARD_WIRING_V1.md` · `FOUNDATION_MEMORY_TRUST_MIGRATION_설계서.md`(+inventory/import) · `FOUNDATION_VAULT_INGEST_DESIGN.md`
- 코드: `app/answer_provenance.py` · `disclosure_policy.py` · `safety_words.py` · `app/ssbrain/answer.py`(safety_gate·external_guard 배선)

### 4.4 교차(정렬/감사)
- `FOUNDATION_TRUST_AND_LEARNED_STATE_ALIGNMENT_V1.md`(Knowledge↔Trust 상태 정렬) · `FOUNDATION_BRAIN_ARCHITECTURE_SELF_AUDIT_20260628.md`(3부 전체 감사) · `FOUNDATION_PIPELINE_WIRING_PLAN_V1.md`(배선).

## 5. 현재 구현 상태 (2026-06-28)
| 부분 | 상태 | 비고 |
|---|---|---|
| Knowledge Brain | 설계+모듈+테스트 ✅ · 실제 learned 승격 0 | candidate/governance·source/confidence·web adapter |
| Response Brain | 설계+모듈+테스트 ✅ · answer.py 미적용 | pattern distillation(teacher 원문 0) |
| Trust Core | safety_gate·external_guard·provenance **answer.py 배선 완료**(v1.1) · memory trust=설계 | guard UX v1.1 |
- 전체 테스트 **231 assertions / 0 FAIL** · canonical write 0 · learned 승격 0 · live 0.

## 6. 다음 (Leo 결정)
- confidence_model을 answer.py에 연결(answer_mode를 evidence로) → Response Brain pattern을 *evidence 경계 내*에서 실제 적용.
- Response memory layer 실제 store + pattern 승인 루프(현재 mock).
- Memory Trust Gate(M6) 구현(별도·승인 후).
