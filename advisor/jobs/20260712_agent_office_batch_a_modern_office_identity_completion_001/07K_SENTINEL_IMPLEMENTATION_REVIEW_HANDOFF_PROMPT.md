TARGET_ACTOR: Sentinel
TARGET_SESSION: separate role session, never Advisor session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target session

# Independent Sentinel Implementation Review

Use `/fable-sentinel` in the existing `foundation-reviewer-sol` session. This
is a read-only Level 2 comprehensive implementation, security, accessibility,
and visual review. Do not patch the candidate, change its branch, or grant
Founder approval.

## Exact Target

- repository: `/home/leo/Project/agent-office-batch-a-001`
- branch: `batch-a/modern-office-identity-001`
- base: `ac8ba75d3a128385beaeeac58ae5bf54c03d23f2`
- candidate: `0b2f923a8456eea9b2b7df5b4cec1ae8c6d26760`
- Worker result:
  `/home/leo/Project/foundation-docs/runs/agent-office/20260712_agent_office_batch_a_modern_office_identity_completion_001/WORKER_RESULT.md`
- Advisor validation:
  `/home/leo/Project/foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001/53_ADVISOR_WORKER_RESULT_VALIDATION.md`

Read the original intake/brief, final accepted Control design train, Advisor
amendments 48 through 52, Worker result, actual candidate source, surrounding
load-bearing source, tests, configs, docs, commits, and diffs. Do not trust the
Worker or Advisor summaries without direct evidence.

## Required Review

1. Verify Office-first authenticated application-shell integration and preserved
   secondary technical/control views.
2. Verify stable identity versus mutable organization assignment, exact Team
   and reports-to behavior, truth-preserving UNKNOWN/UNASSIGNED handling, and
   no inference from names, proximity, timestamps, attached state, or prose.
3. Verify the 17-field actor drawer, keyboard/focus restoration, mobile,
   reduced-motion/static, contrast, semantic parity, and accessibility.
4. Verify fixture-free production rendering, lazy Pixi isolation, marker
   rejection without filtering, and unchanged prototype entry/fixtures.
5. Verify role-specific symbolic surfaces and Channy's non-operational boundary.
6. Verify no raw terminal/source/secret/private/customer content is exposed and
   no browser-to-Worker/Reviewer, auth, command, remote, DB, or deployment
   authority expanded.
7. Reproduce focused tests and required complete gates, including `npm run
   check`, CD-3, authenticated Living Office E2E, composed E2E, and local
   loopback rehearsal. Reproduce prototype E2E or its load-bearing subset as
   necessary to validate current unmasked rendering and motion.
8. Inspect actual visual pixels/media directly. Production screenshots mask the
   Pixi canvas; do not count the magenta mask as visual proof. Inspect the
   current prototype baselines/artifacts and determine whether the evidence
   split proves the production integration. Return `NEEDS_PATCH` if unmasked
   authenticated-production evidence, explicit nonblank canvas checks, or
   refreshed motion evidence is needed.
9. Verify every Worker claim and exact test total. Record any inaccurate,
   omitted, or overstated claim.
10. Verify scope, no Grok reuse, excluded historical `agent-office` session
    non-participation, Git ancestry, push state, and rollback.
11. Treat disposable untracked test output as a final-audit cleanup item; no
    final clean-state claim may ignore it.

## Result Contract

Write the long result to:

`/home/leo/Project/foundation-docs/runs/agent-office/20260712_agent_office_batch_a_modern_office_identity_completion_001/SENTINEL_IMPLEMENTATION_REVIEW_RESULT.md`

Write the pointer to:

`/home/leo/Project/foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001/13_SENTINEL_IMPLEMENTATION_REVIEW_RESULT_POINTER.md`

Commit and non-force push only those two foundation-docs files with explicit
path staging. Preserve unrelated dirt. Return one verdict exactly:

- `PASS`
- `PASS_WITH_RISK`
- `NEEDS_PATCH`
- `FAIL`

For findings, include severity, exact path/line or artifact, reproduction,
impact, required correction, and whether it is patchable within Batch A.
Return to Advisor and stop.
