# Foundation Brain Runtime v0.6 — End-to-End Scenario Evaluation

> **2026-06-29 · v0.6 PASS.** SIASIU/Cosmile 30 use-case를 Brain Runtime으로 offline e2e 평가. ★실 runtime 연결 전 단계·shadow.

## A. 목표
30 시나리오(피부상담~취향vs안전 + Customer Decision Memory 5종 + isolation/삭제/consent/고위험/downgrade)를 파이프라인으로 평가.

## B. 구현
- `foundation_customer_decision_memory.py` — CDM 5종(preference/condition/reaction/decision_history/outcome_feedback) 정책. ★outcome/preference는 evidence upgrade 0·safety override 0·cross-customer 격리·삭제/만료/blocked 금지·sensitive consent·고위험 reconfirmation.
- `tools/foundation_brain_runtime_e2e_eval.py` — 30 시나리오 + LMR 결합 combined_eval.
- 테스트: `test_foundation_brain_runtime_e2e`(10)·`test_customer_decision_memory_runtime_policy`(12).

## C. 결과
- **통합 eval 544**(LMR 514 + Brain 30) · **544/544 PASS** · LMR 514 regression 보존.
- false_allow 0·high-risk false_allow 0·customer cross-scope leak 0·삭제 memory 재사용 0·outcome가 evidence upgrade 0·preference가 safety override 0.
- shadow 불변식: user_text/write/promotion 0. 고위험(임신/이상반응/시술/취향) grounded 0. 내부정책 차단.
- perf: pipeline 단일 p95 0.096ms·peak 0.07MB·timeout/crash 0.

## D. Gate → PASS (total≥300·LMR 보존·전 안전 불변식 0·perf 충족) → v0.7 자동 진행
