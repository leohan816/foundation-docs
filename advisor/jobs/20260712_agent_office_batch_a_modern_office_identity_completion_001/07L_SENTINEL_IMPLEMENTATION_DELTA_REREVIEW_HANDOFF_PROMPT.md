TARGET_ACTOR: Sentinel-ReReview
TARGET_SESSION: separate role session, never Advisor session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target session

This instruction goes to: same existing `foundation-reviewer-sol` session
Do not paste into: Advisor, Control, Worker, Fable5 Reviewer, or GPT strategy session
Return result to: Advisor

# Sentinel Implementation Delta Re-Review — SIR-1 Through SIR-5

Use `/fable-sentinel` in the existing `foundation-reviewer-sol` session.

Mode: independent read-only Level 2 implementation, security, accessibility,
and visual delta re-review. No patch, implementation, risk acceptance, or final
Founder approval.

## Exact Target

- Repository: `/home/leo/Project/agent-office-batch-a-001`
- Branch: `batch-a/modern-office-identity-001`
- Original Batch A base: `ac8ba75d3a128385beaeeac58ae5bf54c03d23f2`
- Prior reviewed candidate: `0b2f923a8456eea9b2b7df5b4cec1ae8c6d26760`
- Rework candidate: `74d586660c8fc55c04bcaca6f7442cd14218eb33`
- Worker rework result:
  `/home/leo/Project/foundation-docs/runs/agent-office/20260712_agent_office_batch_a_modern_office_identity_completion_001/WORKER_REWORK_RESULT.md`
- Advisor rework validation:
  `/home/leo/Project/foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001/55_ADVISOR_WORKER_REWORK_VALIDATION.md`
- Your prior review:
  `/home/leo/Project/foundation-docs/runs/agent-office/20260712_agent_office_batch_a_modern_office_identity_completion_001/SENTINEL_IMPLEMENTATION_REVIEW_RESULT.md`

Read those artifacts and the actual diff `0b2f923..74d5866`, changed source,
tests, configurations, updated as-built docs, and load-bearing surrounding code.
Do not trust Worker or Advisor summaries without direct evidence. Use no agent,
sub-agent, delegated model context, or temporary session.

## Required Finding Closure

For each SIR-1 through SIR-5 return `CLOSED`, `PARTIAL__BLOCKING`,
`NOT_CLOSED`, or `REGRESSION` with direct evidence.

1. **SIR-1:** Verify strict CSP remains unchanged and working; the public-root
   compatibility import is CSP-safe and lazy-chunk isolated; backend/status are
   not advertised ready before successful initialization; synchronous,
   unresolved asynchronous, context-loss, and unsupported Canvas cases degrade
   truthfully to the documented static/M1 path.
2. **SIR-2:** Verify the actual authenticated production shell uses the modern
   office theme and readable navigation; reproduce whole-surface WCAG A/AA for
   desktop, mobile, reduced/static, forced-colors, and 200% text. Confirm no
   contrast fix hides or erases required meaning.
3. **SIR-3:** Inspect real unmasked authenticated-production pixels. Reproduce
   successful initialization, viewport-sized canvas, explicit nonblank pixels,
   continuous production motion, and zero CSP/renderer/page errors. Confirm the
   previous mask false positive is impossible.
4. **SIR-4:** Challenge nested render input with hostile/malformed/duplicate/
   invalid enum/map/membership/selection values and verify deterministic total
   no-throw fail-closed behavior before assembly.
5. **SIR-5:** Verify production, not prototype fixtures, drives all eight Channy
   ambient states with continuous motion and `authorityRole: none`; confirm no
   operational inference or command behavior and no inaccurate as-built claim.

## Mandatory Visual/Product-Contract Check

Directly inspect the rendered Office at normal desktop and mobile scales. The
Advisor HTML report is available at:

`/home/leo/Project/agent-office-batch-a-001/playwright-report/batch-a-sir-rework-advisor/index.html`

Its unmasked PNGs are:

- `/home/leo/Project/agent-office-batch-a-001/playwright-report/batch-a-sir-rework-advisor/data/02e695857abb67fa5ad323d36a67a2e98ee698d5.png`
- `/home/leo/Project/agent-office-batch-a-001/playwright-report/batch-a-sir-rework-advisor/data/ce8f915a4e70453a483365b095c0824592e7f611.png`

Do not treat their existence as proof. Reproduce the view as needed and judge:

- actor compact labels remain readable and track their actor;
- label density does not cause unacceptable actor/label overlap or occlusion;
- the first information layer preserves required role, Team, runtime/model/
  effort truth, state, and evidence meaning without inference;
- mobile meaning remains equivalent;
- Channy is recognizable as the accepted original pixel Bedlington Terrier and
  the state sequence is visually honest;
- Office remains primary and technical data secondary.

Return `NEEDS_PATCH` for a concrete failure. Do not silently lower the product
contract because Axe and numeric tests pass.

## Regression and Evidence Checks

- Reproduce `npm run check`, authenticated Living Office E2E, composed E2E,
  CD-3, and the load-bearing prototype tests.
- Verify exact totals and Worker report accuracy.
- Verify no lint/type/CSP weakening, file-wide suppression, dependency or
  lockfile change, Grok reuse, unauthorized source/config scope, authority
  expansion, browser dispatch, DB, remote/public/prod scope, or Batch B-E work.
- Verify candidate ancestry, non-force push, clean worktree after generated
  output cleanup, and rollback to `ac8ba75`.
- Record every failed as well as successful command.

## Result Contract

Return exactly one verdict: `PASS`, `PASS_WITH_RISK`, `NEEDS_PATCH`, or `FAIL`.

Write the long result to:

`/home/leo/Project/foundation-docs/runs/agent-office/20260712_agent_office_batch_a_modern_office_identity_completion_001/SENTINEL_IMPLEMENTATION_DELTA_REREVIEW_RESULT.md`

Write the pointer to:

`/home/leo/Project/foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001/15_SENTINEL_IMPLEMENTATION_DELTA_REREVIEW_RESULT_POINTER.md`

Commit and non-force push only those exact two foundation-docs files with
explicit path staging. Preserve unrelated dirt. Return to Advisor and STOP.
