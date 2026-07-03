# Foundation — Test Harness Retention Plan (2026-06-28)

> **★기존 테스트·하니스·평가 결과는 삭제 금지.** Foundation 이전 후에도 재사용할 regression suite로 보존. JSON: `learning_memory_reuse_regression_suite_20260628.json`.

## 1. 보존 대상 (삭제 금지)
| 파일 | 검증 내용 | Foundation 재사용 | adapter 필요 |
|---|---|---|---|
| `test_learning_memory_state.py` | 12상태·전이·승인 불변식·record schema | ✅ 그대로 | 아니오 |
| `test_reuse_gate.py` | 재사용 게이트(candidate/privacy/internal_only/high-risk 차단) | ✅ 그대로 | 아니오 |
| `test_learning_approval_workflow.py` | 자동승인 금지 워크플로·Store·memory.db 가드 | ✅ 그대로 | 아니오 |
| `test_learning_memory_reuse_closed_loop.py` | v0.1 22 시나리오 | ✅ | 아니오 |
| `test_source_provenance_adapter.py` | tier/provenance 충분성·고위험 차단 | ✅ | 아니오 |
| `test_conflict_detector.py` | 자동 충돌 감지·high-risk manual | ✅ | 아니오 |
| `test_supersede_policy.py` | supersede·rollback dry-run | ✅ | 아니오 |
| `test_learning_dryrun_promotion.py` | learned/canonical dry-run(실승격 0) | ✅ | 아니오 |
| `test_learning_memory_reuse_hardening_loop.py` | v0.2 53케이스(v0.1 22 포함) | ✅ | fixture path |
| `tools/learning_memory_reuse_eval.py` | v0.1 평가 하니스(22) | ✅ | 아니오 |
| `tools/learning_memory_reuse_hardening_eval.py` | v0.2 평가 하니스(53) | ✅ | test_fixtures path |
| `설계문서/learning_memory_reuse_eval_results_*.json` 등 | 평가 결과 스냅샷 | 보존(이력) | — |

## 2. SIASIU 런타임 결합(이전 시 adapter 필요)
`app/ssbrain/answer.py`(evidence/shadow 배선)·`app/evidence_mode.py`·`app/retrieval_evidence.py` — ssbrain 의존 → Foundation 이전 시 retrieval 인터페이스 추상화 필요.

## 3. 이전 후 반드시 재실행할 테스트
`test_reuse_gate` · `test_learning_approval_workflow` · `test_learning_dryrun_promotion` · `test_conflict_detector` · `test_learning_memory_reuse_hardening_loop` (게이트·승인·dry-run·충돌·closed-loop가 이전 후에도 유지되는지).

## 4. 순수 로직 모듈(이전 준비됨)
`learning_memory_state`·`reuse_gate`·`learning_approval_workflow`·`source_provenance_adapter`·`conflict_detector`·`supersede_policy`·`learning_dryrun_promotion`·`foundation_file_intake` — Response Brain/ssbrain 미참조(순수 로직) → Foundation 이전 준비됨.
