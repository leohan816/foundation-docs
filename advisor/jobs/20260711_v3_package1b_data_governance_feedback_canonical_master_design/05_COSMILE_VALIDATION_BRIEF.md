# Cosmile Read-Only Design Validation Brief

Date: 2026-07-11

Target actor: existing `Cosmile Worker` session.

Pass type: `REPO_LOCAL_DESIGN_FEASIBILITY_VALIDATION`

Model and effort: `<GPT-5.6-Sol:Max>`

Status: `WAIT_FOR_CONTROL_CANDIDATE`

## Purpose

Independently validate the published Control candidate against actual Cosmile code and active rules. This is not implementation and does not approve product or canonical authority.

## Independence

- Use the same existing Cosmile Worker session.
- Read the common Control candidate only after Advisor routes its exact commit.
- Do not read the Foundation first-pass validation before submitting the Cosmile first pass.
- Do not act as Control, Advisor, Fable5, or final approver.

## Required Focus

1. Explicit purchased-line-item selection matches current order/OrderItem ownership checks and does not infer provenance.
2. Mock auth and shared-device limitations remain explicit; no representative-auth claim exists.
3. No unsafe reuse of current `RecOutcomeFeedback` sink.
4. No reinterpretation of `RecOutcomeEvent` summary/current row or organic attribution.
5. Identity no-link/no-re-key boundary is enforceable and cart/wishlist merge is never consent.
6. Provenance, idempotency, dedup/replay, quarantine, correction, retraction, and supersession are implementable additively.
7. Retention/erasure/no-reappearance hooks align with actual Order/OrderItem/FK and event/outbox surfaces without selecting legal periods.
8. Initial structured feedback cannot accidentally flow through generic CommerceEvent into FoundationSignalOutbox.
9. Current mapper/outbox consent/identifier behavior is not treated as approved.
10. Tranche A works with no Foundation call/signal/outbox dependency and no free text.
11. Failure/disable/rollback behavior preserves checkout/order flow and creates no automatic ranking/memory/safety effect.
12. All twelve future extensions remain additive, with no destructive re-key, silent overwrite, historical reinterpretation, or current implementation authorization.

## Required Result

Report:

- supported assumptions;
- contradicted assumptions;
- required design patches;
- unresolved unknowns;
- implementation hazards;
- extension hazards;
- direct evidence paths;
- verdict: `PASS | PASS_WITH_RISK | NEEDS_PATCH | FAIL`.

Store at:

`../foundation-docs/runs/cosmile/20260711_v3_package1b_data_governance_feedback_canonical_master_design/COSMILE_DESIGN_VALIDATION.md`

Pointer:

`../foundation-docs/advisor/jobs/20260711_v3_package1b_data_governance_feedback_canonical_master_design/13_COSMILE_VALIDATION_POINTER.md`

Commit/push only result and pointer. Return to Advisor.

## Forbidden

- Runtime/schema/API/test changes.
- DB/query/migration, secret/env, customer data, flags, main/live/prod.
- Candidate patching.
- Reading Foundation first-pass validation.
- New session/sub-agent/delegation.
- Foundation authority or product/legal decision.
