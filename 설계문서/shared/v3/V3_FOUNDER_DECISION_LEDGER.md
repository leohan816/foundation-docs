# V3 Founder Decision Ledger

Status: `ACTIVE_CANONICAL`

Date: 2026-07-10

Decision authority: Leo/GPT

Package 1A status: `FINAL_APPROVED_AND_CLOSED`

Package 1B authorization: `NO`

This ledger is the durable interpretation boundary for Package 1A founder decisions. It records what was chosen and, equally, what the choice does not authorize.

## D1 - Initial Feedback Product Scope

- **Exact decision:** `D1-B STRUCTURED_PURCHASED_ITEM`.
- **Business rationale:** Begin with the lowest-risk product hypothesis that gives explicit purchase provenance and avoids unreviewed free-text semantics.
- **Allowed interpretation:** A future design may let a user explicitly select a purchased line item and submit structured answers. Positive/satisfaction and adverse/discomfort axes remain separate.
- **Forbidden interpretation:** No free text, consultation-derived outcome evidence, inferred `OrderItem`, never-purchased assumption, automatic semantic classification, or current implementation authorization.
- **Current implementation scope:** None. No feedback UI, route, writer, or pilot is approved.
- **Future extension option:** Timing, eligibility, refund/cancel, sensitive populations, and later text are separate gates.
- **Condition required to reopen:** Separate Leo/GPT mission satisfying the V3 mission checklist and relevant legal/provenance gates.
- **Affected unknown IDs:** U-01, U-02, U-08, U-09, ADD-02.
- **Affected repositories:** Cosmile primarily; Foundation/foundation-control only if a later semantic contract is approved.
- **Affected acceptance scenarios:** 1, 2, 4, 7, 8.
- **Change authority:** Leo/GPT only, after required discovery/design review.

## D2 - Identity and Provenance Default

- **Exact decision:** `D2-A NO_LINK_EXPLICIT_ITEM`.
- **Business rationale:** Wrong-account sensitive-data association is more harmful and less reversible than losing an ambiguous learning write.
- **Allowed interpretation:** Feedback remains attached to an explicitly selected purchased item under its original identity context. Existing cart/wishlist merge remains commerce convenience only.
- **Forbidden interpretation:** No guest-to-login feedback or memory stitching, destructive re-keying, recency inference, `cart_merged` consent inference, or Foundation identity resolution.
- **Current implementation scope:** None beyond preserving current no-link and strict-XOR safety behavior.
- **Future extension option:** `D2-B CONSENTED_ADDITIVE_LINK_LATER`, only through a separate threat-reviewed and reversible design.
- **Condition required to reopen:** Real auth, shared-device threat model, explicit consent/revocation, unlink/recovery evidence, and Leo/GPT approval.
- **Affected unknown IDs:** U-04, U-08, A-C1, A-C2.
- **Affected repositories:** Cosmile; Foundation remains identity-resolution blind.
- **Affected acceptance scenarios:** 3, 6.
- **Change authority:** Leo/GPT only.

## D3 - Raw Text, External Provider, and Deletion Boundary

- **Exact decision:** `D3-A STRUCTURED_ONLY_NO_PROVIDER`.
- **Business rationale:** Current evidence cannot support end-to-end raw-text non-persistence, provider processing, or a complete deletion promise.
- **Allowed interpretation:** Initial feedback is structured-only. User-linkable raw and derived feedback must later be correctable, erasable, and reusable only under approved policy.
- **Forbidden interpretation:** No feedback free text, Foundation semantic processing, external-provider processing, non-persistence claim, guessed retention period, or current `D3-B` implementation.
- **Current implementation scope:** None. Existing consultation external egress is not approved or resolved by this decision.
- **Future extension option:** `D3-B TEXT_AFTER_POLICY_GATE`; `D3-C TEXT_NOW` is rejected.
- **Condition required to reopen:** Retention/erasure/processor policy, provider review, explicit default-off transport, incident policy, lineage, user disclosure, and independent review.
- **Affected unknown IDs:** U-02, U-03, U-05, A-C3, ADD-03, ADD-04.
- **Affected repositories:** Cosmile producer surfaces; foundation-control/Foundation semantic surfaces only in a later approved mission.
- **Affected acceptance scenarios:** 2, 4, 5, 6.
- **Change authority:** Leo/GPT after legal/policy and security evidence.

## D4 - Primary Value Hypothesis and Automation Boundary

- **Exact decision:** `POST_PURCHASE_SATISFACTION_SERVICE_UX`.
- **Approved question:** Can users understand and submit low-friction structured purchased-item feedback, and does it measurably improve the post-purchase service experience?
- **Business rationale:** The first pilot, if later approved, tests understandable service UX rather than pretending organic purchases prove recommendation uplift.
- **Allowed interpretation:** A future pilot may observe the frozen service-UX KPI after metric, privacy, identity, abuse, and kill-switch gates pass.
- **Forbidden interpretation:** No automatic ranking, durable-memory promotion, canonical-evidence upgrade, safety downgrade, recommendation-uplift claim, unstaffed human-review promise, or post-hoc metric substitution.
- **Current implementation scope:** None. Pilot collection is not approved.
- **Future extension option:** Later hypotheses require new founder decisions and separate experiments.
- **Condition required to reopen:** Named independent metric owner, frozen denominator/horizon/stop rule, abuse controls, retention gates, representative auth, completeness evidence, and tested kill switch.
- **Affected unknown IDs:** U-06, U-09, A-C2, ADD-01, ADD-05, ADD-09.
- **Affected repositories:** Cosmile instrumentation and UX; Foundation only if a later reviewed signal/semantic path is approved.
- **Affected acceptance scenarios:** 1, 4, 6, 7, 8.
- **Change authority:** Leo/GPT; technical actors do not choose success thresholds.

## D5-i - Foundation Signal Contract Governance

- **Exact decision:** `D5-i-A JOINT_GOVERNANCE`.
- **Business rationale:** Producer mapping and semantic acceptance are different responsibilities and neither repo may silently redefine the cross-repo contract.
- **Allowed interpretation:** Cosmile owns raw commerce evidence, provenance, and producer mapping. Foundation owns semantic authority and canonical acceptance constraints. Shared contract changes require both-side review and Leo/GPT approval.
- **Forbidden interpretation:** Joint governance does not transfer raw commerce ownership to Foundation, allow unilateral vocabulary changes, approve current mapper shape, or waive D5-ii containment.
- **Current implementation scope:** Documentation authority only. No signal expansion or contract implementation is approved.
- **Future extension option:** A versioned refined-signal contract after the containment and privacy gates.
- **Condition required to reopen:** Separate cross-repo design mission with explicit producer/consumer compatibility and consent authority.
- **Affected unknown IDs:** U-07, ADD-08.
- **Affected repositories:** Cosmile, Foundation, foundation-control; SIASIU only if explicitly included by a future mission.
- **Affected acceptance scenarios:** 2, 5, 8.
- **Change authority:** Joint Cosmile/Foundation review plus Leo/GPT final approval.

## D5-ii - Outbox Containment Before Package 1B Signal Use

- **Exact decision:** `D5-ii-A CONTAINMENT_GATE_REQUIRED`.
- **Business rationale:** Absence of a consumer is not a durable privacy or contract boundary when enqueue code already constructs unapproved consent and identifier state.
- **Allowed interpretation:** No flush. Package 1B may not rely on Foundation signals until `OUTBOX_CONSENT_IDENTIFIER_CONTAINMENT_GATE` resolves consent authority, identifier, contract conformance, lifecycle, deletion, and containment.
- **Forbidden interpretation:** Do not rely on no consumer, start a flush worker, inspect/clean DB rows, patch runtime, treat `user_consented` as evidence, or transmit current shape under this decision.
- **Current implementation scope:** Containment requirement only; no admin, DB, cleanup, runtime, or implementation action is approved.
- **Future extension option:** Reviewed no-send/contract implementation after a separately approved mission.
- **Condition required to reopen:** Leo/GPT opens the containment gate mission and approves any DB/runtime scope separately.
- **Affected unknown IDs:** U-03, U-07, ADD-08.
- **Affected repositories:** Cosmile producer/outbox; Foundation acceptance side after contract approval.
- **Affected acceptance scenarios:** 2, 5, 8.
- **Change authority:** Leo/GPT after joint design and independent review.

## Acceptance Scenario Decisions

| Scenario | Canonical decision |
|---|---|
| 1 Mixed positive and adverse feedback | `ACCEPTED_WITH_STRUCTURED_ONLY_MODIFICATION`; separate structured positive/adverse axes, no initial free-text semantic path |
| 2 Feedback deletion request | `ACCEPTED_AS_WRITTEN`; no unverified deletion promise |
| 3 Guest purchase followed by shared-device login | `ACCEPTED_AS_WRITTEN`; no silent feedback/memory link or re-key |
| 4 Foundation semantic API failure | `ACCEPTED_AS_FUTURE_GATED_BEHAVIOR`; semantic API is outside initial scope |
| 5 Raw text in log/trace/queue | `ACCEPTED_AS_FUTURE_GATED_BEHAVIOR`; raw text is outside initial scope and requires a reviewed incident policy |
| 6 Semantic result later proven wrong | `ACCEPTED_AS_FUTURE_GATED_BEHAVIOR_WITH_VERSIONED_SUPERSESSION`; no silent overwrite or automatic safety downgrade |
| 7 No measurable improvement | `ACCEPTED_WITH_PRIMARY_KPI_MODIFICATION`; frozen KPI is post-purchase satisfaction/service UX, not recommendation uplift |
| 8 Fake/incentivized/replayed/competitor feedback | `ACCEPTED_AS_WRITTEN`; volume cannot create certainty, product action, ranking, or durable learning |

## Explicit Non-Authorization

No decision in this ledger authorizes Control invocation, Package 1B design, a Worker handoff, runtime/schema/API changes, DB inspection or writes, outbox cleanup/flush, feature activation, main merge, production/live access, or automatic start of any carry-forward gate.

## Decision Evidence

- `advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/28_FOUNDER_DECISION_RECORD.md`
- `advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/FOUNDER_ACCEPTANCE_SHEET.md`
- `advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/29_PACKAGE1A_DECISION_CLOSURE_RECORD.md`
