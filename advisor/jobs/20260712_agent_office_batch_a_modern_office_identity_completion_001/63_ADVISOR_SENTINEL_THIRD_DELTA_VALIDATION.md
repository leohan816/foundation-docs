# Advisor Sentinel Third-Delta Validation

- Mission: `AGENT_OFFICE_BATCH_A_MODERN_OFFICE_IDENTITY_COMPLETION_001`
- Reviewed candidate: `43107b9c087a5d172d5f670e6b01bd75ab9ac1db`
- Sentinel result: `../../../runs/agent-office/20260712_agent_office_batch_a_modern_office_identity_completion_001/SENTINEL_IMPLEMENTATION_THIRD_DELTA_REREVIEW_RESULT.md`
- Result/pointer commits: `9c8cee8`, `8387bcd`
- Verdict received: `NEEDS_PATCH`
- Advisor classification: `ROUTINE_PATCHABLE_WITHIN_APPROVED_A4_SCOPE`

## Accepted Closure

- The production `rem` probe, pre-paint initial high-text selection, reactive mode switch, explicit marker, and all-or-zero on-canvas label behavior work.
- At 100%/129% the Office remains within the 22% label-coverage bound; at 130%/200% the complete roster-equivalent mode removes the card wall.
- Authentic production content, normal-scale pixels, Team propagation, strict-CSP path, security/authority boundaries, and Batch B exclusion remain preserved.
- Production accessible names now contain the seven correct full source labels.

## Blocking Findings

1. **A5-1 - high-text actor detail/focus regression (MEDIUM).** Roster-equivalent mode hides every actor-detail button and the roster is non-interactive. A 200% user cannot open the 17-field drawer. If a drawer is opened at normal scale and text changes to high scale, closing it attempts to focus the now-hidden label and focus falls to `BODY`.
2. **A5-2 - exact gate false passes (MEDIUM).** The normal combined predicate accepts a wrong unique actor ID, a duplicated/missing field, empty source values, and all labels translated off-screen. The high-text roster helper accepts empty role/name and a duplicated/missing fact. The product DOM is currently authentic, but the mandatory anti-shortcut proof is not exact.
3. **A5-3 - exact full-source unit false pass (LOW).** Product code is correct, but the unit regex accepts `source X.` for all seven facts instead of requiring each exact `PIXEL_ACTOR_FACT_SOURCE_LABELS[source]` phrase.

These are direct implementation/test/as-built defects inside the already accepted high-text, drawer, focus, and evidence-gate scope. They require no new product decision, authority/security expansion, risk acceptance, or Control redesign.

## Required Route

Return one fifth focused patch to the same `agent-office-opus` Worker using `/fable-builder`:

- keep zero on-canvas cards in high-text mode while adding one actor-specific keyboard/pointer-operable roster trigger per actor to the same 17-field drawer;
- restore focus to the actual visible invoker or the same actor's visible equivalent after close, including normal-to-high transition;
- bind label and roster gates to authoritative expected actor IDs, exact unique non-empty field keys/values, exact non-empty sources, and actual viewport presence;
- add direct negative challenges for wrong ID, duplicated/missing field, empty source, and off-screen labels plus malformed roster role/name/facts;
- assert each exact full source phrase and negative omission/abbreviation cases;
- correct only directly affected as-built claims and preserve accepted 100% pixels and every closed boundary.

Use focused tests during iteration and one stabilized candidate gate. Return to the same SOL Sentinel for a fourth narrow delta re-review. Final rehearsal/audit/Founder approval remain pending; Batch B remains unauthorized.
