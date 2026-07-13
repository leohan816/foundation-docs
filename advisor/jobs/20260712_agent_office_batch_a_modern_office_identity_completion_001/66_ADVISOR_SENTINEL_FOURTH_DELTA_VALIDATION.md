# Advisor Sentinel Fourth-Delta Validation

- Mission: `AGENT_OFFICE_BATCH_A_MODERN_OFFICE_IDENTITY_COMPLETION_001`
- Reviewed candidate: `95e493ce61e268d6352b3805692835f4b612a4ff`
- Sentinel result: `../../../runs/agent-office/20260712_agent_office_batch_a_modern_office_identity_completion_001/SENTINEL_IMPLEMENTATION_FOURTH_DELTA_REREVIEW_RESULT.md`
- Result/pointer commits: `c2063673abeb54ae967c7e8f0ea197e988b4f93b`, `46c6837ffeea02b9a1f36282f605070c75235972`
- Verdict received: `NEEDS_PATCH`
- Advisor classification: `ROUTINE_PATCHABLE_WITHIN_APPROVED_A5_SCOPE`

## Accepted Closure

- A5-1 production behavior is closed: initial-high and normal-to-high paths use the existing single 17-field drawer, and Close/Escape restore focus to the same actor's visible trigger.
- A5-3 is closed: production and the unit require all seven exact canonical source phrases.
- The authentic UI, normal/high-text rendering, accessibility paths, Channy boundary, strict CSP, security/authority boundaries, and Batch B exclusion remain preserved.
- Directly affected unit tests passed `12/12`; Living Office browser tests passed `3/3`; targeted ESLint and full typecheck passed.

## Blocking Findings

1. **Initial-200% browser proof (LOW).** The product works, but the committed E2E resets the initial 200% mount before operating its actor drawer. Two as-built statements overclaim the committed proof.
2. **Actual value exactness (MEDIUM).** Label and roster predicates use total cell text, so an empty actual fact value still passes when field/source text remains.
3. **Roster trigger exactness (MEDIUM).** The predicate checks only trigger existence, so a wrong actor ID or duplicate trigger passes.

These are evidence-contract and as-built defects, not product-policy, architecture, authority, security, or legal unknowns. No Control redesign or Leo/GPT decision is required.

## Required Route

Return one narrowly bounded sixth patch to the same `agent-office-opus` Worker using `/fable-builder`:

- operate the drawer before resetting the initial 200% mount;
- expose or select the actual fact value independently of labels/source text and require it to be non-empty in both predicates;
- add direct empty-label-value and empty-roster-value attacks against those exact predicates;
- require exactly one roster trigger per row and exact equality among trigger actor ID, row actor ID, and authoritative actor ID;
- add wrong-trigger-ID and duplicate-trigger attacks;
- retain all existing attacks and restored-authentic re-proof;
- reconcile only the directly affected as-built claims.

Use focused tests during iteration and one stabilized affected candidate gate. Return the exact delta to the same SOL Sentinel. Final rehearsal/audit/Founder approval remain pending; Batch B remains unauthorized.
