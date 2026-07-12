TARGET_ACTOR: Control-Rework
TARGET_SESSION: same existing foundation-control session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only

# Control Pre-review Design Correction

Read `22_ADVISOR_CONTROL_THIRD_PATCH_VALIDATION.md` and inspect the actual
candidate `a39634d` after snapshots. Correct T1-T3 only:

- complete `AcceptedEvidenceRecord` identity/version/reference/dedup/order rules;
- replace all baseline/script placeholders or handoff deferrals with literal
  exact paths;
- reconcile or explicitly supersede stale closure-history rows so the active
  canonical design cannot contradict the final contract.

Preserve S3's RT-only work truth, closed R2, current total arbitration, STALE
normalization, and all established boundaries. Patch only the same four Agent
Office design documents. Do not modify source, tests, package/config, media,
auth, transport, PWA code, DB, secrets, remote/public state, production state,
or Batch B-E. Use no new session, agent, sub-agent, or delegated context. Do not
self-review.

Update the existing Control result/pointer with the exact correction commit and
T1-T3 closure. Commit and non-force push exact paths only. Return to Advisor and
stop.
