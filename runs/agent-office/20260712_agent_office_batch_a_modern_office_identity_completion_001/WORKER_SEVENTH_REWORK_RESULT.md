# Agent Office Batch A — Worker Seventh Rework Result (A7)

`AGENT_OFFICE_BATCH_A_MODERN_OFFICE_IDENTITY_COMPLETION_001`

## Identity

- Mission/job ID: `AGENT_OFFICE_BATCH_A_MODERN_OFFICE_IDENTITY_COMPLETION_001` (seventh implementation-review rework — exact per-cell E2E evidence; product markup/pixels accepted)
- Actor: **Agent Office Worker** (existing `agent-office-opus` session); model Opus 4.8 (1M), effort Ultracode, `/fable-builder`
- Project / repository: Agent Office Batch A / `/home/leo/Project/agent-office-batch-a-001`
- Branch: `batch-a/modern-office-identity-001`
- Reviewed base / prior candidate: `1e0b5505ae05e6339cc19fb1496a2fb5a36b87e7`
- Seventh-rework HEAD: `58a484b088b4e57e7b3ee6e582f54c7f3ce6dc85`
- Push status: **non-force pushed** to `origin/batch-a/modern-office-identity-001` (`1e0b550..58a484b`, fast-forward); local == upstream.
- Inputs read directly: `68_ADVISOR_SENTINEL_FIFTH_DELTA_VALIDATION.md`, `SENTINEL_IMPLEMENTATION_FIFTH_DELTA_REREVIEW_RESULT.md`, handoff/run `09Q`, current `tests/e2e/living-pixel-office.spec.ts`, and the affected A6 as-built statements. Verified base == `1e0b550`, upstream-equal, clean worktree, live Opus 4.8 Ultracode, `/fable-builder`, no concurrent writer, no Grok reuse, no excluded-session input.

## Finding closure (A7 — exact one-rendered-value-per-keyed-cell)

The A6-2 predicates globally counted seven non-empty value-marker descendants but did not bind one rendered marker to each exact keyed cell, so two same-predicate attacks passed for both labels and roster: (1) hiding one authentic value marker (key/text retained), and (2) removing one fact's value marker and adding a hidden duplicate under another fact so the global count stayed seven. Fix (test-only — the product `data-actor-fact-value` markup is accepted, unchanged): both the normal-label predicate (`assertCompleteLabelSet`) and the roster predicate (`assertRosterEquivalentMode`) now, for each of the exact seven sourced fact keys:

1. locate the exact keyed cell (`data-actor-summary-field` / `data-actor-roster-field`);
2. require **exactly one** `data-actor-fact-value` descendant in that cell;
3. require that marker's `data-actor-fact-value` to exactly equal the cell's key;
4. require the marker's own trimmed text non-empty;
5. require the marker to be **rendered** — not suppressed by its own or an ancestor's `hidden`, `aria-hidden="true"`, `display:none`, `visibility:hidden|collapse`, or zero opacity (a walk up the ancestor chain), with a positive layout box (`getClientRects().length > 0`, the Chromium E2E); and
6. require the entire label/row to contain no extra value markers beyond those exact seven per-cell markers.

Same-predicate attacks added for **both** normal labels and roster, each mutate → evaluate the same predicate → restore → re-prove: (a) a hidden authentic value marker (key/text retained) must fail the render requirement; (b) a removed fact value marker plus a hidden duplicate appended under a different fact — so the global count stays seven — must still fail the exact per-cell binding. Each returns false, then the authentic DOM is restored and the positive predicate re-proves true.

All prior named attacks are retained: label — exactly-one-hidden/coverage-alone, wrong-unique id, duplicated field, empty source, empty value, all-off-viewport, restoration; roster — wrong-unique roster id, empty name, empty role, empty source, duplicated fact, empty value, wrong-trigger-id, duplicate-trigger, restoration. A6-1 initial-200% drawer operation and A6-3 exact trigger binding are unchanged.

## Preserve / scope — verified

Test-only change. **No product source/markup/CSS/pixel/baseline/dependency/config/auth/server/CSP/drawer-architecture/Channy/runtime-authority change.** The `src/` tree is untouched; **no baseline changed**. All prior accepted behavior and boundaries are preserved.

## Exact changed-file list (seventh rework, vs `1e0b550`)

Test: `tests/e2e/living-pixel-office.spec.ts`. Docs (directly affected A6 as-built/index text): `docs/architecture/AGENT_OFFICE_BATCH_A_APPLICATION_INTEGRATION_DESIGN_DELTA.md` (§21 A6-2/A7 + seventh-rework evidence), `docs/operations/AGENT_OFFICE_BATCH_A_IMPLEMENTATION_WORKUNIT_PLAN.md` (§6.6 A6-2/A7 + evidence), `docs/contracts/AGENT_OFFICE_BATCH_A_IDENTITY_ORGANIZATION_CONTRACT.md` (A6-2/A7 note), `docs/FEATURE_INDEX.md` (§6 rework note).

## Commands / checks (seventh rework; per 09Q verification policy)

- Living Office E2E (`playwright.batch-a-living-office.config.ts`) — **3/3**, deterministic, during iteration and once as the stabilized candidate gate. The label predicate (100%) and roster predicate (200% roster-equivalent) each prove the exact per-cell binding positively and reject the hidden-value and missing-value-plus-hidden-duplicate attacks (and all retained attacks), then restore and re-prove true.
- Targeted `npx eslint tests/e2e/living-pixel-office.spec.ts` — clean; `npm run typecheck` (`tsc --noEmit`) — clean; `git diff --check` — clean.
- The full unit/composed/prototype/demo suites were **not** rerun: no product/dependency/config source changed and there is no regression signal, per the 09Q verification policy.
- Disposable `test-results-*/` reconciled before return; no listener left.

## Forbidden / excluded — confirmed

No product source/markup/CSS/pixel/baseline/dependency/config/auth/server/CSP/drawer-architecture/Channy change, lint/type weakening, suppression, `.skip`/`.only`, Grok or excluded-session input, agents/sub-agents, self-review, force push, or protected/main action. `.grok/` and `grok*` never staged.

## Evidence inspected (mutation + restored authentic state)

Each attack's mutation result was inspected via the deterministic E2E: the hidden marker and the missing-plus-hidden-duplicate mutations each drive the same predicate to false while the field label, key, source attribute, and (where applicable) global seven-marker count are retained, and the subsequent authentic-DOM restoration drives the same predicate back to true — for both the normal-label and roster predicates.

## Boundaries

Independent same-session (SOL) Sentinel delta re-review, Advisor audit, rehearsal, and Founder approval remain external and pending; Batch B remains unauthorized. No next mission inferred. Returning the durable result and pointer to Advisor, then stopping.
