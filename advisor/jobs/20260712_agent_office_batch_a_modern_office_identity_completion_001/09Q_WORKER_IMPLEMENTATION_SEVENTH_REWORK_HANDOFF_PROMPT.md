TARGET_ACTOR: Worker-Rework
TARGET_SESSION: separate role session, never Advisor session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target session

This instruction goes to: same existing `agent-office-opus` Worker session
Do not paste into: Advisor, Control, Reviewer, excluded historical `agent-office`, or GPT strategy session
Return result to: Advisor

# Agent Office Batch A - Seventh Exact Per-Cell Evidence Rework

Use `/fable-builder` in the same existing `agent-office-opus` Worker session.

- Mission: `AGENT_OFFICE_BATCH_A_MODERN_OFFICE_IDENTITY_COMPLETION_001`
- Model/effort: verify actual Opus 4.8 Ultracode before work
- Repo/worktree: `/home/leo/Project/agent-office-batch-a-001`
- Branch: `batch-a/modern-office-identity-001`
- Required base: clean/upstream-equal `1e0b5505ae05e6339cc19fb1496a2fb5a36b87e7`
- Skill: `/fable-builder`

Use no agent, sub-agent, delegated context, or temporary session. Do not contact
the excluded historical `agent-office` session. Do not use the quarantined Grok
branch/worktree/code. No Control redesign is required. Product markup and pixels
are accepted; this patch closes only exact E2E evidence and as-built accuracy.

## Read Directly

1. `68_ADVISOR_SENTINEL_FIFTH_DELTA_VALIDATION.md`
2. `SENTINEL_IMPLEMENTATION_FIFTH_DELTA_REREVIEW_RESULT.md`
3. current `tests/e2e/living-pixel-office.spec.ts`
4. only the directly affected as-built A6 statements

## A7 - exact one-rendered-value-per-keyed-cell

For both the normal-label predicate and roster predicate:

1. iterate the exact seven expected sourced fact keys;
2. locate the exact cell for each key (`data-actor-summary-field` or `data-actor-roster-field`);
3. require exactly one value-marker descendant in that cell;
4. require that marker's `data-actor-fact-value` exactly equals the cell's expected key;
5. require the marker's own trimmed text non-empty;
6. require the marker to be rendered and not suppressed by its own or an ancestor's `hidden`, `aria-hidden="true"`, `display:none`, `visibility:hidden|collapse`, or zero opacity; use positive layout/render evidence appropriate to the existing Chromium E2E;
7. require the entire actor label/row to contain no extra value markers beyond those exact seven per-cell markers.

Add these same-predicate attacks for both normal labels and roster:

- set one authentic value marker hidden while retaining key and text;
- remove one fact's value marker, add a hidden duplicate marker under a different fact so the global count remains seven, then evaluate;
- each challenge must return false;
- restore the authentic DOM after each challenge and re-prove true.

Retain all prior empty-value, key/source/identity/viewport, trigger-binding, and
restoration attacks. Preserve A6-1 initial-high operation and A6-3 exact trigger
binding unchanged.

## Allowed Scope

- `tests/e2e/living-pixel-office.spec.ts`
- directly affected A6 as-built/index text only

Do not change product source/markup, CSS, pixels, baselines, dependencies,
configs, auth/server/CSP, drawer architecture, Channy, runtime authority, or
unrelated tests.

## Verification Policy

Run the Living Office E2E during iteration and once as the stabilized candidate
gate. Run targeted ESLint, typecheck, and `git diff --check`. Do not rerun the
full unit/composed/prototype/demo suites because no product/dependency/config
source changes and no regression signal justify them. Inspect the exact mutation
results and restored authentic state; remove disposable output and leave no
listener.

## Result Contract

Commit and non-force push the exact patch to the same branch. Write:

`/home/leo/Project/foundation-docs/runs/agent-office/20260712_agent_office_batch_a_modern_office_identity_completion_001/WORKER_SEVENTH_REWORK_RESULT.md`

Pointer:

`/home/leo/Project/foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001/25_WORKER_SEVENTH_REWORK_RESULT_POINTER.md`

Report exact base/candidate, changed files, the two attacks for both predicates,
all commands/failures, scope attestations, Git/upstream state, cleanup, and
rollback. Commit/push only the result/pointer in foundation-docs with explicit
path staging. Return the pointer to Advisor and STOP.
