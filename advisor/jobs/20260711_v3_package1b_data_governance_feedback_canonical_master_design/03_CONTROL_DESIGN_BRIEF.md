# Control Design Brief - V3 Package 1B Canonical Master Design

Date: 2026-07-11

Target actor: `Control`

Target session: same existing Control session.

Mode: `CONTROL_MASTER_DESIGN_MODE`

Model and effort: `<GPT-5.6-Sol:Max>`

Result returns to: `Advisor`

## Entry Authorization

```text
ENTRY_CHECKLIST_STATUS: COMPLETE
UNKNOWN_GATE_STATUS: PASSED_FOR_CURRENT_SCOPE
LEO_GPT_SCOPE_APPROVAL: PACKAGE1B_DESIGN_ONLY
CONTROL_DESIGN_HANDOFF_AUTHORIZED: true
IMPLEMENTATION_AUTHORIZATION: false
```

Control is authorized to author a cross-project canonical design candidate only. Control is not a Worker, Reviewer, final approver, or product-policy authority in this pass.

## Required First Reads

1. This brief.
2. `02_PACKAGE1B_DESIGN_QUESTION_REGISTER.md` at its frozen commit.
3. `01_ADVISOR_BRIEF.md`, including the completed V3 entry block and actual-code facts.
4. All six V3 canonical files under `../foundation-docs/설계문서/shared/v3/`.
5. `../foundation-docs/설계문서/shared/AGENT_ROLE_BOUNDARY_AND_RELEASE_TRAIN_PROTOCOL_V2.md`.
6. Package 1A comparison, founder decision record, acceptance sheet, final audit, and closure pointer named in the Advisor brief.
7. Active Commerce Memory design and current V3-11 risk register.
8. Current active instructions for foundation-control, Foundation, and Cosmile.
9. Actual current code files cited in the Advisor brief, plus any directly necessary adjacent files.

Do not execute from memory or historical summaries. Runtime code controls current behavior; current canonical decisions control authority.

## Required Candidate Outputs

Write exactly these candidate documents:

1. `../foundation-docs/설계문서/shared/v3/V3_PACKAGE1B_DATA_GOVERNANCE_FEEDBACK_CANONICAL_MASTER_DESIGN.md`
2. `../foundation-docs/설계문서/shared/v3/V3_PACKAGE1B_DECISION_UNKNOWN_GATE_TRACEABILITY.md`
3. `../foundation-docs/설계문서/shared/v3/V3_PACKAGE1B_FOUNDER_ACCEPTANCE_DESIGN_MATRIX.md`
4. `../foundation-docs/설계문서/shared/v3/V3_PACKAGE1B_IMPLEMENTATION_RELEASE_PLAN.md`

Every document must start with:

```text
Status: CANDIDATE_PENDING_REPO_VALIDATION_AND_FABLE5_REVIEW
Implementation authorization: NONE
Final approval authority: Leo/GPT
```

Do not update `V3_CANONICAL_INDEX.md`, the active unknown register, founder ledger, or extension roadmap in this first candidate pass. Advisor will coordinate canonical promotion only after validations, reconciliation, Fable5 review, and Leo/GPT approval.

## Master Design Required Sections

The master design must include:

1. Scope and explicit non-authorization.
2. Founder decisions D1-D5-ii as immutable design inputs.
3. Initial Tranche A product flow.
4. Structured positive/satisfaction and adverse/discomfort axis contract.
5. Explicit purchased-line-item selection and owner authorization.
6. Eligibility policy hook with unknown/refund/cancel/sensitive-policy fail-closed states.
7. Data model responsibilities and explicit disposition options for current `RecOutcomeFeedback`.
8. Creation-time provenance and contract/version snapshot.
9. Identity original-context preservation and no-link/no-re-key invariants.
10. Idempotency, cardinality, duplicate/replay, abuse quarantine, and concurrency behavior.
11. Append-only correction/retraction/supersession and audit lineage.
12. Retention/erasure/consent-withdrawal/no-reappearance hooks without legal periods.
13. Deterministic structured-adverse fail-safe behavior without diagnosis, causality, privileged transition, or safety downgrade.
14. Human-review-unavailable behavior.
15. Cosmile raw evidence ownership and Foundation authority boundary.
16. Tranche A/B/C outbox and signal separation; D5-i cannot waive D5-ii.
17. Explicit prohibition on using generic `CommerceEvent` or current outbox behavior as an approved feedback signal path unless the candidate proves a dedicated no-enqueue boundary.
18. Foundation-free initial operation and explicit non-reinterpretation of consultation SSC/FRC/shared-memory/CDM contracts.
19. Failure, disable, rollback, deletion, correction, downstream-unavailable, and future raw-text incident behavior.
20. Pilot/measurement prerequisites without metric thresholds or authorization.
21. All twelve additive future extension points.
22. Summary/current rows versus lifecycle logs, including no reinterpretation of `RecOutcomeEvent` or organic attribution.
23. Repository ownership matrix.
24. Design invariants and state transitions.
25. Future test/proof matrix.
26. Explicit unresolved items, blocked capabilities, and STOP conditions.

## Technical Design Authority

Control may choose evidence-supported technical names, interfaces, invariants, state transitions, versioning, failure/rollback rules, test obligations, and candidate future batch boundaries.

Control must not choose:

- user-facing product wording or exact feedback scale when not founder-decided;
- exact timing/eligibility/refund/cancel policy values;
- legal retention periods or processor obligations;
- sensitive-population policy;
- human-review owner/SLA/duty;
- classifier accuracy/confidence thresholds;
- pilot KPI threshold, denominator, horizon, stop value, or staffing;
- D2-B identity-link policy;
- D3-B text/provider authorization;
- signal transmission, flush, or current outbox acceptance;
- implementation, DB, migration, flag, main, production, or live authorization.

If any required section cannot be completed without one of these choices, STOP and return a `FOUNDER_DECISION_REQUIRED` addendum proposal to Advisor. Do not silently decide it.

## Tranche Boundary

### Tranche A

- Cosmile-local structured feedback core.
- Explicit purchased-line-item provenance.
- No free text.
- No Foundation call or signal dependency.
- No outbox flush or feedback signal enqueue.
- No ranking, memory, evidence, or safety-state effect.

### Tranche B

- Future separately approved outbox consent/identifier containment implementation.
- No flush and no signal transmission.
- Separate Leo/GPT implementation mission required.

### Tranche C

- Future versioned refined/whitelisted signal contract.
- Joint Foundation/Cosmile review and Leo/GPT approval required.
- No raw order/payment/customer identity transfer.

## Traceability Matrix Requirements

Include one row for every:

- U-01 through U-09;
- A-C1 through A-C3;
- ADD-01 through ADD-09, with ADD-03 visibly superseded through A-C3;
- FOUNDATION-EVIDENCE-FRESHNESS;
- D1 through D5-ii;
- acceptance scenario 1 through 8;
- extension roadmap item 1 through 12.

Required columns:

`UNKNOWN/ADDENDUM -> EVIDENCE -> FOUNDER DECISION -> DESIGN SECTION -> REPO OWNER -> ACCEPTANCE SCENARIO -> FUTURE TEST -> BLOCKING GATE -> IMPLEMENTATION TRANCHE`

Do not mark `LEGAL_POLICY_HOLD`, `EXPERIMENT_REQUIRED`, or `OPEN_BLOCKER` resolved.

## Founder Acceptance Design Matrix Requirements

For Scenarios 1-8 include:

- user-visible behavior;
- accepted inputs;
- stored data;
- blocked/deleted data;
- automatic actions allowed;
- automatic actions forbidden;
- human authority;
- failure behavior;
- rollback/recovery;
- proof/test requirements;
- unresolved gate;
- implementation tranche.

Preserve the recorded scenario modifications exactly.

## Design-Only Release Plan Requirements

Define future batches without authorizing them:

- Batch A: local structured-feedback core.
- Batch B: correction/deletion/provenance hardening.
- Batch C: outbox containment, no flush.
- Batch D: non-prod synthetic rehearsal.
- Future gated extensions separately excluded.

Each batch must list prerequisites, candidate repo owner, allowed future files/surfaces by category, excluded scope, required design/implementation reviews, rollback, and STOP conditions. Do not include an executable Worker prompt, migration command, DB command, or deployment command.

## Required Evidence Discipline

- Cite exact current repo paths and line ranges for load-bearing current facts.
- Label historical reports as evidence, not current runtime authority.
- Preserve E-1 through E-6 disagreements where relevant.
- State what was not read or not verified.
- Do not inspect DB, environment values, secrets, customer data, or deployed/provider state.
- Do not claim current rows, credentials, providers, flags, or deployment state.

## Forbidden

- Runtime/source/test/schema/migration/API modification.
- DB access/query/write/inspection/cleanup.
- FoundationSignalOutbox row inspection, flush, send, consumer, or cleanup.
- Feature flags, env/secret values, main merge, production/live, customer data.
- Control implementation mode, Worker invocation, self-review, Fable5 work.
- New session, sub-agent, delegated model context, or temporary actor.
- SIASIU scope expansion.
- Package 2/3/4 design.

## Completion Package

Write the full Control result to:

`../foundation-docs/runs/foundation-control/20260711_v3_package1b_data_governance_feedback_canonical_master_design/CONTROL_MASTER_DESIGN_RESULT.md`

Write the pointer to:

`../foundation-docs/advisor/jobs/20260711_v3_package1b_data_governance_feedback_canonical_master_design/11_CONTROL_RESULT_POINTER.md`

The result must include:

- exact candidate files and commit;
- files/evidence read and not read;
- question register coverage Q-01 through Q-29;
- unresolved questions and any proposed addendum;
- decisions preserved;
- assumptions rejected;
- design sections completed/not completed;
- candidate risks;
- runtime/DB/secret/implementation status;
- `RETURN_TO: Advisor`.

Commit and push only the four candidate documents, Control result, and pointer to foundation-docs. Do not commit foundation-control or any runtime repo.

Return the ASCII-only pointer to Advisor and STOP.
