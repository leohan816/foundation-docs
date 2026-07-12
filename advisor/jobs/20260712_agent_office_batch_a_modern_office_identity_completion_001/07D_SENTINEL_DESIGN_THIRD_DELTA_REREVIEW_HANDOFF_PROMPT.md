TARGET_ACTOR: Sentinel-ReReview
TARGET_SESSION: same existing independent Sentinel session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target session

이 지시문을 붙여넣을 대상: 같은 독립 Sentinel 세션
이 지시문을 붙여넣으면 안 되는 곳: Advisor 세션 / GPT 전략 세션
작업 결과 반환 대상: Advisor

# Sentinel Third Design Delta Re-review

Use `/fable-sentinel`. Reload the role boundary and delta-review, contract,
provenance, and review-classification references. Remain read-only and
independent. Do not trust Control or Advisor closure claims.

Review the complete delta since your last reviewed candidate:

`77681d9ed5dae3567115082945508f8474308812..5f8ffd102f8344c5b34e1d97f00cdca578871c3c`

This includes intermediate `a39634d` and the Advisor-held correction `5f8ffd1`.

Read directly:

- `SENTINEL_DESIGN_SECOND_DELTA_REREVIEW_RESULT.md`;
- `21_ADVISOR_SENTINEL_SECOND_DELTA_VALIDATION.md`;
- `22_ADVISOR_CONTROL_THIRD_PATCH_VALIDATION.md`;
- `23_ADVISOR_CONTROL_PRE_REVIEW_CORRECTION_VALIDATION.md`;
- the four exact before/after design paths;
- every current source/path convention cited by S1/S3/S4/T1-T3.

Verify:

1. S1/T1: exact accepted-evidence schema, record identity/version/reference,
   validation, idempotency/dedup, same-kind and contradictory-kind ordering,
   stale/expiry handling, and total process/runtime arbitration are complete and
   cannot produce divergent valid implementations.
2. S3: current runtime projection/cue reducer is the sole mission/WorkUnit/
   activity/operational truth; local attestations cannot duplicate or override
   it; full-outer row behavior, field provenance, STALE normalization, conflict,
   and no-store-back remain coherent.
3. R2 remains closed and non-elevating against actual source.
4. S4/T2: every writable source, asset, fixture, test, baseline, script, result,
   and pointer path is literal and closed; no placeholder, wildcard, deferred
   handoff class, or abbreviated path remains.
5. T3: historical closure rows cannot be mistaken for active rules; the current
   canonical contract is unambiguous and review history is still traceable.
6. No regression in Office-first, secondary-view, eager-shell, auth, authority,
   security, transport, accessibility, fallback, Channy, rollback, no-Grok,
   excluded-session, or Batch B-E boundaries.
7. The delta is documentation-only and grants neither implementation nor final
   approval.

Verdict contract: `PASS`, `PASS_WITH_RISK`, `NEEDS_PATCH`, or `FAIL`.

Write the result to:

`../foundation-docs/runs/agent-office/20260712_agent_office_batch_a_modern_office_identity_completion_001/SENTINEL_DESIGN_THIRD_DELTA_REREVIEW_RESULT.md`

Write the pointer to:

`../foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001/24_SENTINEL_DESIGN_THIRD_DELTA_REREVIEW_RESULT_POINTER.md`

Commit and non-force push only the exact result and pointer. Do not patch Agent
Office or Advisor artifacts. Return to Advisor and stop.
