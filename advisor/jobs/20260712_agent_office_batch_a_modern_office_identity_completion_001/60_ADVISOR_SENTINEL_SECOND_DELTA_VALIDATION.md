# Advisor Sentinel Second-Delta Validation

- Mission: `AGENT_OFFICE_BATCH_A_MODERN_OFFICE_IDENTITY_COMPLETION_001`
- Reviewed candidate: `fcd55a2df04aa14284fceaab12c653492edf22f2`
- Sentinel result: `../../../runs/agent-office/20260712_agent_office_batch_a_modern_office_identity_completion_001/SENTINEL_IMPLEMENTATION_SECOND_DELTA_REREVIEW_RESULT.md`
- Result/pointer commits: `0b57b7b`, `104c8cd`
- Verdict received: `NEEDS_PATCH`
- Advisor classification: `ROUTINE_PATCHABLE_WITHIN_APPROVED_A3_SCOPE`

## Accepted Closure

- A3-1 is closed: Team is truthfully present in every current production label and desktop/mobile roster path.
- Normal-scale A3-2 is materially closed: 8 labels, 10.24px minimum text, 16.7366% union coverage, no overlap, preserved association, and directly inspected Office-first pixels.
- I2-1, I2-3, I2-4, the 17-field drawer, strict CSP, prototype, auth/security/authority boundaries, and Batch B exclusion remain preserved.

## Blocking Findings

1. **A4-1 — 200-percent Office-first failure (MEDIUM).** All eight cards grow to 31.4159% coverage at 200% root text, larger than the rejected base's normal-scale 28.0780%; the current test does not rerun coverage/association/per-actor Team after scaling.
2. **A4-2 — cardinality false pass (MEDIUM).** Hiding seven of eight desktop labels leaves one label and 2.0921% coverage, which satisfies every current A3 visual predicate. The gate is not bound to the visible production actor set.
3. **A4-3 — accessible-name/as-built mismatch (LOW).** The contract/report says every compact full source remains in the accessible label name, but model, effort, AI runtime, and operational-state sources are absent there.

All three are exact implementation/test/documentation corrections inside the existing first-layer/visual scope. They require no new product, design-authority, security, or Founder decision and no Control redesign.

## Required Route

Return one focused patch to the same `agent-office-opus` Worker using `/fable-builder`:

- preserve the accepted 100% composition;
- provide a truthful explicit 200% information-equivalent mode that keeps the Office primary and all actor facts reachable, or an equally strong all-label composition under the same 22% bound;
- prohibit any partial-label state: normal desktop must have exactly one visible nine-field label for every visible production actor, while an accepted semantic-equivalent state must be explicit and complete rather than partial;
- rerun the same meaningful coverage/cardinality/Team/source/association checks at 100% and 200%, plus a negative hidden-label challenge that must fail;
- add the four missing full sources to the accessible label name and exact tests, so implementation and as-built wording agree;
- keep all previously accepted paths unchanged.

Use focused tests during iteration and one complete candidate gate after stabilization. Return the patch to the same SOL Sentinel for a third narrow delta re-review. Final audit and Founder approval remain pending; Batch B remains unauthorized.

