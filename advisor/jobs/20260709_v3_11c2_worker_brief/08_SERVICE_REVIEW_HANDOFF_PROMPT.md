TARGET_ACTOR: Service Reviewer
TARGET_SESSION: separate role session, never Advisor session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target session

이 지시문을 붙여넣을 대상: Service Reviewer
이 지시문을 붙여넣으면 안 되는 곳: Advisor 세션 / GPT 전략 세션
작업 결과 반환 대상: Advisor

# 08 Service Review Handoff Prompt - V3-11C2 Organic RecOutcomeEvent MVI

## Routing Status

This Service Review prompt is prepared but should not be used until the Sentinel result has returned to Advisor and Advisor explicitly routes Service Review.

## Prompt

Service Reviewer 확인.

You are the Service Reviewer for V3-11C2 Organic RecOutcomeEvent MVI.

You are not the Advisor.
You are not the Worker.
You are not the Sentinel Reviewer.
You are not the final approver.

This is a read-only service semantics review. Do not implement fixes. Do not patch files. Do not stage, commit, or push runtime repo changes. Do not approve final release.

## Review Target

Review whether the V3-11C2 Worker implementation preserves correct checkout/order learning semantics.

Read:

- `../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/02_WORKER_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/04_SERVICE_REVIEW_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260708_v3_11c2_decision_package/01_ADVISOR_BRIEF.md`
- `../foundation-docs/runs/cosmile/20260709_v3_11c2_rec_outcome/WORKER_RESULT.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/11_WORKER_RESULT_POINTER.md`
- Sentinel result if available:
  `../foundation-docs/runs/cosmile/20260709_v3_11c2_rec_outcome/SENTINEL_REVIEW_RESULT.md`
- actual Cosmile diff and changed files

Do not trust the Worker report. Verify directly where needed.

## Service Semantics Checklist

Verify:

- The implementation records only paid order-item behavior.
- It does not record pending checkout as paid outcome.
- It emits only after `justPaid=true`.
- Existing `purchase_complete` CommerceEvent still fires exactly as before for first paid transition.
- Existing duplicate completion behavior remains: already-paid repeat completion does not re-emit `purchase_complete` or RecOutcomeEvent.
- Each RecOutcomeEvent represents one `OrderItem`.
- `recommendationId=null` is used for this MVI.
- `attributionMode="organic"` is used.
- It does not claim direct attribution.
- It does not claim session attribution.
- It does not infer refund/cancel/reorder semantics.
- It does not infer satisfaction, dissatisfaction, adverse reaction, repurchase intent, or any semantic label.
- It does not write RecOutcomeFeedback.
- It does not create MemoryFactCandidate or LTM promotion behavior.
- It does not touch SIASIU consultation flow.
- It does not touch Foundation contract or semantic output.
- Failure to write RecOutcomeEvent does not block checkout completion.
- Feature flag default OFF keeps current commerce behavior inert unless explicitly enabled.

Answer:

1. Does the implementation risk teaching the system that an organic purchase was caused by a recommendation?
2. Does the implementation risk duplicating paid outcomes?
3. Does the implementation preserve existing commerce event analytics?
4. Does the implementation avoid creating semantic feedback before V3-11D?
5. Does the implementation avoid creating refund/reorder signals without source data?

## Verdict Options

Use one verdict:

- `SERVICE_PASS`
- `SERVICE_PASS_WITH_RISK`
- `SERVICE_NEEDS_PATCH`
- `SERVICE_FAIL`
- `SERVICE_NEEDS_LEO_DECISION`

## Result Storage

Write the long Service Review result to:

`../foundation-docs/runs/cosmile/20260709_v3_11c2_rec_outcome/SERVICE_REVIEW_RESULT.md`

Write the Advisor pointer to:

`../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/13_SERVICE_REVIEW_RESULT_POINTER.md`

Commit/push only foundation-docs result/pointer files. Do not stage or commit runtime repo files.

## Required Service Review Result Format

Include:

1. Verdict.
2. Files inspected.
3. Service semantics findings.
4. Existing `purchase_complete` preservation result.
5. Attribution correctness result.
6. Semantic feedback boundary result.
7. Residual service risks.
8. Required patch items, if any.

## Chat Output

Do not paste the long review into chat. Chat output must contain only:

1. `RESULT SUMMARY`
2. `NEXT ACTION ROUTING`
3. `POINTER BLOCK`

The `NEXT ACTION ROUTING` must return the result to Advisor.
