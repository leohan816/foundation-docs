TARGET_ACTOR: Sentinel-ReReview
TARGET_SESSION: separate role session, never Advisor session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target session

This instruction goes to: same existing `foundation-reviewer-sol` Sentinel session
Do not paste into: Advisor, Control, Worker, or GPT strategy session
Return result to: Advisor

# Agent Office Batch A — Second Implementation Delta Re-Review

Use `/fable-sentinel` in the same existing independent `foundation-reviewer-sol` session.

- Mission: `AGENT_OFFICE_BATCH_A_MODERN_OFFICE_IDENTITY_COMPLETION_001`
- Review level: bounded implementation/visual/accessibility delta re-review
- Model/effort: verify actual GPT-5.6 SOL xhigh before review
- Target repo/worktree: `/home/leo/Project/agent-office-batch-a-001`
- Base: `1187b9ae37077f22e697680bf531f9e475f005bf`
- Candidate: `fcd55a2df04aa14284fceaab12c653492edf22f2`
- Candidate branch: `batch-a/modern-office-identity-001`

Use no agent, sub-agent, delegated context, or temporary session. Remain
read-only in Agent Office. Do not patch, commit, approve, or start Batch B.

## Read Directly

1. `59_ADVISOR_WORKER_THIRD_REWORK_VALIDATION.md`
2. `58_ADVISOR_WORKER_SECOND_REWORK_VALIDATION.md`
3. `WORKER_THIRD_REWORK_RESULT.md`
4. prior `SENTINEL_IMPLEMENTATION_DELTA_REREVIEW_RESULT.md`
5. exact `git diff 1187b9a..fcd55a2` and load-bearing surrounding source/tests
6. current Batch A Founder authorization and contract §2.7
7. fresh current-candidate PNGs at the exact paths and hashes recorded in Advisor validation 59

Do not trust Worker/Advisor summaries as proof. Reproduce changed tests and
inspect actual current pixels. Follow delta-first review: do not repeat the
entire prior comprehensive review where the affected surface is unchanged.

## Exact Questions

### A3-1 — Team first-layer closure

- Is `advisorTeam` truthfully sourced from its existing fact envelope and kept separate from stable identity?
- Does the production label expose Team or `UNASSIGNED` without inference?
- Do the accessible name and desktop/mobile roster preserve the complete value and provenance?
- Do exact tests fail if Team disappears from either the label or mobile equivalent?
- Did the as-built contract change only to restore the Founder-required field rather than expand authority?

### A3-2 — Office-first compact labels

- Does the current desktop screenshot show the Office world, actors, and work surfaces as primary rather than a wall of cards?
- Are all required compact facts and a non-color provenance indication still represented at >=10px?
- Are `REG`/`ART`/`FIX`/`SYN`/`UNV` deterministic truthful abbreviations, with full values/source names available in an immediately reachable roster/drawer/accessibility path?
- Is ellipsis limited to the compact visual layer, without losing truthful full data or creating hover-only meaning?
- Is `assertOfficeIsPrimary` a meaningful union-coverage gate tied to the actual production viewport, resistant to trivial false pass, and proven to reject the prior 28.1% composition while accepting the 16.8% candidate?
- Do labels remain non-overlapping and associated with actors at 100%/200%, while mobile preserves every actor and Team fact in the accepted roster equivalent?
- Are forced-colors, reduced-motion/static, keyboard/focus, drawer, strict CSP, and screen-reader behavior preserved?

### Regression and evidence

- Confirm I2-1, I2-3, I2-4 and the 17-field drawer are unchanged or still green.
- Verify candidate/result accuracy, exact test totals, baseline scope, clean/upstream-equal Git state, no suppressions, no Grok/excluded-session reuse, and no auth/authority/Batch B expansion.
- Inspect the live/current PNG evidence directly; do not infer product quality from tests alone.

## Verdict Contract

Return exactly one:

- `PASS`
- `PASS_WITH_RISK`
- `NEEDS_PATCH`
- `FAIL`

For every finding give severity, exact file/line or artifact evidence,
reproduction, affected requirement, and whether it is routine patchable. A
clean PASS authorizes Advisor final rehearsal/audit only, not Founder approval.
`PASS_WITH_RISK` returns to Leo/GPT. Routine `NEEDS_PATCH` returns to the same
Worker and same Reviewer without Leo interruption.

## Result Contract

Write:

`/home/leo/Project/foundation-docs/runs/agent-office/20260712_agent_office_batch_a_modern_office_identity_completion_001/SENTINEL_IMPLEMENTATION_SECOND_DELTA_REREVIEW_RESULT.md`

Pointer:

`/home/leo/Project/foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001/18_SENTINEL_IMPLEMENTATION_SECOND_DELTA_REREVIEW_RESULT_POINTER.md`

Commit/push only those two foundation-docs files with explicit path staging.
Preserve unrelated dirt. Return the short pointer to Advisor and STOP.

