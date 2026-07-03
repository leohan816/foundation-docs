# Foundation — Learning / Memory / Reuse Closed Loop v0.1

> **2026-06-28 · "언제 저장하고, 언제 재사용하고, 언제 막는가"를 상태머신+게이트로 구현·검증.** 22 시나리오 closed-loop.
> 구현: `app/learning_memory_state.py`·`reuse_gate.py`·`learning_approval_workflow.py`·`tools/learning_memory_reuse_eval.py`. 테스트 4스위트(47).
> ★canonical write 0 · learned 자동 승격 0 · memory.db 0 · customer memory raw read 0 · teacher/AI 원문 저장 0 · live 0.

## 1. Executive Summary
- 저장됐다고 재사용하지 않는다 — **candidate 자동 재사용 ❌·approved_for_reuse 이상만 후보**. 22/22 평가 통과.
- 고객메모리/개인정보/내부정책/teacher·AI생성/고위험 record는 **자동 승인 금지·재사용 차단**(privacy/customer/internal_only/high-risk leak 0).
- 신규 4스위트(47) + 회귀 → **349 assertions / 0 FAIL** · full-loop 100/100.

## 2. 설계문서 재검토 결과 (Stage 0)
| 원칙 | 현재 구현 | 일치 |
|---|---|---|
| candidate 자동 재사용 금지 | reuse_gate `status_*_not_reusable` | ✅ |
| approved 이상만 재사용 | `REUSABLE=(approved_for_reuse,learned,canonical)` | ✅ |
| learned/canonical 자동 승격 금지 | `DRY_RUN_ONLY` · 워크플로는 approved_for_reuse까지만 | ✅ |
| teacher 원문 미저장 | record `teacher_raw_text_stored=False`·raw 필드 reject | ✅ |
| Memory Trust 상태 정렬 | approved_for_reuse = 정렬문서 `learned_approved`류 | ✅ |
→ **치명적 불일치 0.**

## 3. 상태 머신 (Stage 1)
12상태: `raw_input·candidate·review_required·reviewed·approved_for_reuse·learned·canonical_candidate·canonical·blocked·deprecated·superseded·rejected`. v0.1 활성 8(learned/canonical=dry-run).
- 전이: raw_input→candidate→review_required→reviewed→approved_for_reuse · *→blocked/rejected · approved→deprecated/superseded. blocked/rejected=종착(재사용 불가) · deprecated/superseded=기본 조회 제외.
- 승인 불변식: reviewed_by·source_ref 필수 · high/critical·privacy·safety·teacher/AI origin·customer_memory·conflict 미해결 = **자동 승인 금지** · raw/teacher_raw 필드 있으면 불가.

## 4. Record schema (Stage 2)
29필드(record_id·record_type·subject·claim·normalized_claim·source_ref·source_layer·source_tier·provenance_ref·risk_level·privacy_level·safety_level·memory_scope·status·reviewed_by·review_note·created/updated/expires_at·supersedes·superseded_by·conflict_group·`raw_text_stored=false`·`teacher_raw_text_stored=false`·reusable·reuse_allowed/blocked_reason·policy_version·origin). record_type 8 · memory_scope 6.

## 5. Reuse Gate (Stage 3)
`reuse_gate(record, context)` → {allowed·reason·blocked_reason·required_review·safe_for_external·effective_status·trace}. 차단: candidate/review/blocked/rejected/deprecated/superseded·privacy mismatch·customer mismatch·internal_only(external)·raw_text·high-risk 미검수·source_ref 없음. 허용: approved_for_reuse+ & source & (privacy 맥락 일치) & raw=false.

## 6. Approval Workflow (Stage 4) — 자동 승인 ❌
make_candidate→require_review→review_record(reviewed_by)→approve_for_reuse(불변식 통과)→approved_for_reuse / block/deprecate/supersede. teacher·DeepSeek/GPT·customer_memory·privacy·high/critical safety·medical/pregnancy·내부정책 = **자동 승인 금지**.

## 7. Store (Stage 5)
`LearningStore`(JSONL/in-memory) — add/get/update_status/list_by_status/list_reusable(deprecated·superseded 기본 제외)/list_blocked/list_pending_review/search_by_subject/export_audit_json. ★`memory.db`·`ssbrain.sqlite` 경로 **거부 가드** · 원문 콘텐츠 미저장. (이번 평가는 in-memory/tempfile — **app/data=ssbrain.sqlite 단독 유지**.)

## 8. Closed-loop evaluation (Stage 6) — **22/22 PASS**
20+ 시나리오(지식/제품/성분/브랜드 fact·고객 preference/memory·주문·내부정책·teacher/DeepSeek candidate·임신수유/의료/이상반응·개인정보·source 없음·reviewer 없음·deprecated/superseded·conflict·정상). 결과: `설계문서/learning_memory_reuse_eval_results_20260628.json`.
- **candidate 재사용 0 · raw 저장 0 · high-risk 자동 승인 0 · 정상 record만 approved_for_reuse → 재사용 허용.**

## 9. Failure taxonomy (Stage 7)
21종 정의. 발생: 0(최종). 1차에서 12건 "실패"는 *하니스 기대치 오류*(승인 차단 사유를 reuse_gate가 아닌 승인 결과에서 봐야 함) — 실제 누출 0이었음 → 하니스 수정으로 해소.

## 10. 발견한 버그와 수정 (Stage 8)
1. **하니스 기대치**: 승인 차단 사유를 reuse_gate 결과에서 확인 → 승인 결과(areasons)에서 확인하도록 수정(보안 영향 0).
2. **reuse_gate `allow_deprecated`/`allow_superseded` 무력화**: 뒤의 `not_reusable_status`가 가로챔 → 예외 경로 추가(의도된 허용 복구·게이트 완화 아님).
3. audit 테스트 단언 정정(raw_text *플래그*는 false로 포함, 원문 콘텐츠 미포함).

## 11. Memory / judgment 테스트
고객 preference·customer_memory·주문 memory → **자동 승인 0·재사용 0**(privacy/customer mismatch). memory.db 미접근·고객 원문 미read. 개인정보 record → 차단.

## 12. 남은 위험
| # | 위험 | 등급 |
|---|---|---|
| 1 | conflict 자동 감지 미구현(수동 conflict_group) | medium |
| 2 | source_tier/provenance 실데이터 연동 전 보수적 | medium |
| 3 | learned/canonical 승격 경로 dry-run만(실 승격 미구현·의도) | (의도) |
| 4 | Store 영속 path는 운영 시 결정 필요(현재 in-memory/tempfile) | low |

## 13. Foundation 이전 가능성 판단
- **상태머신·게이트·승인 워크플로·store는 순수 로직 → Foundation 이전 준비됨.** (reuse_gate/state/workflow는 SIASIU 런타임 미참조.)
- ⚠ 선결: source_tier/provenance를 record에 채우는 **인입 어댑터**(retrieval/intake) + conflict 자동 감지.
- 권고: 지금은 SIASIU에서 평가 루프 확장(케이스↑·conflict 시나리오) 후, Foundation 이전 시 store/audit를 Memory Trust Gate(M6)와 통합.

## 14. 다음 단계
1. conflict 자동 감지 + supersede 정책. 2. intake 어댑터(source_ref/tier 채움). 3. 평가 케이스 40+로 확장. 4. (승인 후) learned/canonical 실 승격 dry-run→canary. 5. Memory Trust Gate(M6) 통합.
