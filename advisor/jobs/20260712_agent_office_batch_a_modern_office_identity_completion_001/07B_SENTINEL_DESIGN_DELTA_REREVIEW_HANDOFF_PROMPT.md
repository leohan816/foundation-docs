TARGET_ACTOR: Sentinel-ReReview
TARGET_SESSION: same existing foundation-reviewer-sol session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor

# Batch A Design Delta Re-review

Apply the same `/fable-sentinel` contract and delta-review method used for the
original `NEEDS_PATCH` review.

Review exact delta:

- prior candidate: `665b2514a0aa78e132556a746f044a16be58be9b`
- patched candidate: `60a5a720ca52ffdc3805318b4c40a61d0199b4b1`
- worktree: `/home/leo/Project/agent-office-batch-a-001`

Read the actual diff and current source. Do not trust Control or Advisor closure
claims. Answer:

1. Does P1 now give one semantically correct fail-closed sentinel per field,
   including missing/unverified versus genuinely offline/no-process states, and
   accepted evidence for every non-sentinel runtime state?
2. Does P2 name the correct owned display vocabulary and give a total,
   non-progress-elevating mapping from every WorkUnit state plus valid activity
   cue, with conflicts/stale values failing closed?
3. Does P3 define an implementable per-field envelope, exact provenance/status
   vocabulary, field ownership, roleInstanceId join, mint/validate/join/project
   flow, merge precedence, no-store-back rule, summary subset, complete drawer
   order, and test matrix?
4. Does P4 provide an exact bounded source proposal and all inherited PWA,
   renderer, atlas, semantic parity, context loss, teardown, static, and M1
   fallback gates without expanding auth/authority/network scope?
5. Did the patch preserve all previously satisfied design sections and avoid a
   new product decision, runtime authorization, or Batch B-E expansion?

Verdict: `PASS`, `PASS_WITH_RISK`, `NEEDS_PATCH`, or `FAIL`.

Do not patch Agent Office. Write only:

- `/home/leo/Project/foundation-docs/runs/agent-office/20260712_agent_office_batch_a_modern_office_identity_completion_001/SENTINEL_DESIGN_DELTA_REREVIEW_RESULT.md`
- `/home/leo/Project/foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001/18_SENTINEL_DESIGN_DELTA_REREVIEW_RESULT_POINTER.md`

Commit and non-force push those exact result paths, return to Advisor, and stop.

