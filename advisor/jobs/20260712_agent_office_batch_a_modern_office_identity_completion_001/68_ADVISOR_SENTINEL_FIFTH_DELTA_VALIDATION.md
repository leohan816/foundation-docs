# Advisor Sentinel Fifth-Delta Validation

- Mission: `AGENT_OFFICE_BATCH_A_MODERN_OFFICE_IDENTITY_COMPLETION_001`
- Reviewed candidate: `1e0b5505ae05e6339cc19fb1496a2fb5a36b87e7`
- Sentinel result: `../../../runs/agent-office/20260712_agent_office_batch_a_modern_office_identity_completion_001/SENTINEL_IMPLEMENTATION_FIFTH_DELTA_REREVIEW_RESULT.md`
- Result/pointer commits: `c1620d871df42ac47f339adb8c65b505bbca54ee`, `adf5b1ca0d0076de2299d520bf1ee5879e252184`
- Verdict received: `NEEDS_PATCH`
- Advisor classification: `ROUTINE_TEST_EVIDENCE_PATCH_WITHIN_APPROVED_A6_SCOPE`

## Accepted Closure

- A6-1 is closed: committed initial-200% operation, exact drawer content, keyboard/focus behavior, normal recovery, and as-built evidence agree.
- A6-3 is closed: wrong-trigger-ID and duplicate-trigger attacks fail and authentic restoration passes.
- The prior empty actual-value attacks now fail for both labels and roster.
- Authentic product DOM, pixels, drawer behavior, security/authority boundaries, and Batch B exclusion remain correct.

## Blocking Finding

The A6-2 predicates globally count seven non-empty marker descendants but do not bind one rendered marker to each exact keyed fact cell. Two same-predicate attacks therefore pass for both labels and roster:

1. hide one authentic value marker while retaining key/text;
2. remove one fact's value marker and add a hidden duplicate under another fact so the global count remains seven.

This is a deterministic test/evidence defect, not a product, design, authority, security, or legal unknown. No Control redesign or Leo/GPT decision is required.

## Required Route

Return one exact seventh patch to the same `agent-office-opus` Worker using `/fable-builder`:

- change only the affected E2E predicate/attacks and directly affected as-built text;
- for every expected sourced fact key, locate that exact keyed cell and require exactly one descendant marker whose `data-actor-fact-value` equals the cell key;
- require the marker's own trimmed value non-empty and rendered/not hidden, including ancestor-hidden/visibility/display/opacity suppression;
- require no extra value markers outside the seven exact per-cell markers;
- add hidden-value and missing-value-plus-hidden-duplicate mutations for both normal labels and roster; each same predicate must fail, then authentic restoration must pass;
- retain every prior attack and closed A6-1/A6-3 proof.

Use only Living Office E2E plus targeted lint/typecheck and `git diff --check`; do not rerun unrelated full suites without a concrete regression signal. Return the exact delta to the same SOL Sentinel. Final rehearsal/audit/Founder approval remain pending; Batch B remains unauthorized.
