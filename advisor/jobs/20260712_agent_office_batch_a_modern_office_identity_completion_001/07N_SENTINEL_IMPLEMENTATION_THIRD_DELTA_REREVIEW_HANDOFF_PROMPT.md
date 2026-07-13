TARGET_ACTOR: Sentinel-ReReview
TARGET_SESSION: separate role session, never Advisor session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target session

This instruction goes to: same existing `foundation-reviewer-sol` Sentinel session
Do not paste into: Advisor, Control, Worker, or GPT strategy session
Return result to: Advisor

# Agent Office Batch A - Third Implementation Delta Re-Review

Use `/fable-sentinel` in the same existing independent `foundation-reviewer-sol` session.

- Mission: `AGENT_OFFICE_BATCH_A_MODERN_OFFICE_IDENTITY_COMPLETION_001`
- Review level: bounded implementation/accessibility delta re-review
- Model/effort: verify actual GPT-5.6 SOL xhigh before review
- Target repo/worktree: `/home/leo/Project/agent-office-batch-a-001`
- Prior reviewed candidate/base: `fcd55a2df04aa14284fceaab12c653492edf22f2`
- Fourth-rework candidate: `43107b9c087a5d172d5f670e6b01bd75ab9ac1db`
- Candidate branch: `batch-a/modern-office-identity-001`

Use no agent, sub-agent, delegated context, or temporary session. Remain read-only
in Agent Office. Do not patch, commit candidate code, approve, or start Batch B.

## Read Directly

1. `62_ADVISOR_WORKER_FOURTH_REWORK_VALIDATION.md`
2. `60_ADVISOR_SENTINEL_SECOND_DELTA_VALIDATION.md`
3. `61_ADVISOR_FOURTH_REWORK_TEST_EXACTNESS_ADDENDUM.md`
4. `WORKER_FOURTH_REWORK_RESULT.md`
5. prior `SENTINEL_IMPLEMENTATION_SECOND_DELTA_REREVIEW_RESULT.md`
6. exact `git diff fcd55a2..43107b9` and load-bearing surrounding source/tests
7. current Batch A Founder authorization and affected as-built contract sections

Do not trust Worker or Advisor summaries as proof. Follow delta-first review:
inspect and reproduce the affected surface deeply, but do not repeat closed
repository-wide review without a concrete regression signal.

## Exact Questions

### A4-1 - initial and reactive high-text equivalent

- Is text scale production-observable rather than test-only?
- Does an initial high-text mount select the complete roster-equivalent mode pre-paint, without transiently presenting the rejected card wall?
- Do later text-scale changes switch atomically between `labels` and `roster-equivalent`?
- Does roster-equivalent mode expose an explicit marker, zero partial on-canvas labels, and every actor's complete truthful first layer?
- Are normal-scale accepted pixels and reduced/static/keyboard/screen-reader/forced-colors behavior preserved?

### A4-2 - exact anti-false-pass gates

- Does one reusable combined predicate require exact actor cardinality, unique actor IDs, all nine fields, source evidence, Team, and bounded union coverage?
- Does the negative challenge hide exactly one label, evaluate that same predicate, prove it fails while coverage alone still passes, restore the label, and re-prove success?
- Does high-text mode require exact expected-actor/roster-id set equality and one row per actor with role, stable name, all seven mapped facts including Team, and seven non-empty sources?
- Would the prior one-label/seven-hidden false pass now fail?

### A4-3 - accessible source truth

- Does the accessible actor label state the full source for Team, process, AI identity, model, effort, AI runtime, and operational state?
- Does the focused unit test fail if any full source phrase is omitted?
- Do code, tests, and as-built documentation now agree exactly?

### Regression and evidence

- Reproduce the affected unit tests and Living Office browser tests.
- Use targeted lint/typecheck or build only if direct diff inspection identifies a related concern.
- Verify exact candidate/result accuracy, clean/upstream-equal state, no baseline/config/dependency change, no suppression, no Grok or excluded-session reuse, and no auth/authority/Batch B expansion.
- Preserve all prior accepted findings; do not reopen unrelated surfaces without direct evidence.

## Verdict Contract

Return exactly one:

- `PASS`
- `PASS_WITH_RISK`
- `NEEDS_PATCH`
- `FAIL`

For every finding give severity, exact file/line or artifact evidence,
reproduction, affected requirement, and whether it is routine patchable. A clean
PASS authorizes Advisor final rehearsal/audit only, not Founder approval.
`PASS_WITH_RISK` returns to Leo/GPT. Routine `NEEDS_PATCH` returns to the same
Worker and same Reviewer without Leo interruption.

## Result Contract

Write:

`/home/leo/Project/foundation-docs/runs/agent-office/20260712_agent_office_batch_a_modern_office_identity_completion_001/SENTINEL_IMPLEMENTATION_THIRD_DELTA_REREVIEW_RESULT.md`

Pointer:

`/home/leo/Project/foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001/20_SENTINEL_IMPLEMENTATION_THIRD_DELTA_REREVIEW_RESULT_POINTER.md`

Commit/push only those two foundation-docs files with explicit path staging.
Preserve unrelated dirt. Return the short pointer to Advisor and STOP.
