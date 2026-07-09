# 13 Advisor Review Consolidation - V3-11C2 Commerce Memory Design

Date: 2026-07-09

## Verdict

`NEEDS_LEO_GPT_FINAL_DESIGN_APPROVAL`

Advisor accepts the Fable5 Design Review result as a valid independent design review:

`PASS_WITH_RISK`

This consolidation does not approve Phase 2A execution, Phase 2B execution, Worker implementation, runtime repo modification, DB access, query execution, migration execution, flag ON, main merge, or operational use.

## Inputs Reviewed

- Canonical design draft:
  - `../foundation-docs/설계문서/cosmile/COSMILE_V3_11C2_COMMERCE_MEMORY_DESIGN.md`
- Advisor gate proposal:
  - `../foundation-docs/advisor/jobs/20260709_v3_11c2_design_doc_review_gate_setup/01_DESIGN_DOC_REVIEW_GATE_PROPOSAL.md`
- Fable5 review pointer:
  - `../foundation-docs/advisor/jobs/20260709_v3_11c2_design_doc_review_gate_setup/12_FABLE5_DESIGN_REVIEW_RESULT_POINTER.md`
- Fable5 full review result:
  - `../foundation-docs/runs/cosmile/20260709_v3_11c2_design_doc_review_gate_setup/FABLE5_DESIGN_REVIEW_RESULT.md`

Fable5 result commit:

`a84bbbe`

## Review Result Summary

Fable5 returned:

`PASS_WITH_RISK`

Fable5 confirmed that the design draft:

- accurately reflects Leo/GPT business decisions;
- correctly treats `RecOutcomeEvent` as a summary/current row, not an append-only event log;
- preserves the D-O1 `@@unique([orderItemId])` invariant;
- chooses a separate additive future event log instead of multiple lifecycle rows in `RecOutcomeEvent`;
- keeps raw commerce evidence in Cosmile;
- limits Foundation to refined/whitelisted signals;
- keeps Phase 2A narrowed to read-only invariant checking;
- is clear enough for Leo/GPT final design approval consideration.

Fable5 did not find a required design patch before final design approval. Fable5 identified three additional risks/unknowns.

## Risk Classification

### R-1 - Signal Whitelist Canonical Owner Missing

Fable5 severity:

`MEDIUM`

Advisor classification:

`NON_BLOCKING_FOR_CURRENT_DESIGN_APPROVAL_IF_ACCEPTED`

Meaning:

The current design states that Foundation receives refined/whitelisted signals only, but it does not designate the canonical owner of that whitelist or the exact contract location.

Advisor judgment:

- This does not block approval of the current summary-row design.
- This does block future Foundation signal expansion unless a canonical whitelist/contract owner is named.
- This should become a follow-up design gate before any new Foundation-facing commerce signal implementation.

Recommended carry-forward gate:

`FOUNDATION_SIGNAL_WHITELIST_CONTRACT_OWNER_GATE`

### R-2 - RecOutcomeEvent Retention / Erasure Policy Missing

Fable5 severity:

`MEDIUM`

Advisor classification:

`NON_BLOCKING_FOR_CURRENT_DESIGN_APPROVAL_IF_ACCEPTED_BUT_BLOCKS_OPERATIONAL_USE`

Meaning:

`RecOutcomeEvent` can contain `subjectRef` / `anonymousRef` style identifiers. The current design does not specify retention, erasure, consent withdrawal, tombstone, or reuse-block behavior.

Advisor judgment:

- This does not block approving the summary-row architecture as a design direction.
- This should block production/operational use, flag ON, and any customer-facing data retention claim until policy is defined.
- It does not require patching the current design before Fable5 acceptance, because the current document explicitly does not authorize production or operational use.

Recommended carry-forward gate:

`REC_OUTCOME_RETENTION_ERASURE_POLICY_GATE`

### R-3 - Guest-To-Login Stitching / Re-Keying Policy Missing

Fable5 severity:

`LOW`

Advisor classification:

`NON_BLOCKING_FOR_CURRENT_DESIGN_APPROVAL_IF_ACCEPTED`

Meaning:

The design does not decide whether anonymous summary rows should later be re-keyed, stitched, or linked after login.

Advisor judgment:

- This does not block current organic summary-row design approval.
- This should be handled with future identity stitching, direct/session attribution, or attribution-change event-log design.
- It should not be silently inferred during Phase 2A or Worker implementation.

Recommended carry-forward gate:

`IDENTITY_STITCHING_AND_ATTRIBUTION_CHANGE_POLICY_GATE`

## Advisor Consolidated Recommendation

Advisor recommends Leo/GPT choose:

`APPROVE_DESIGN_WITH_ACCEPTED_RISKS`

Recommended acceptance language:

- Accept the Fable5 `PASS_WITH_RISK`.
- Approve the canonical design doc as the current design authority for V3-11C2 Commerce Memory summary-row semantics.
- Accept R-1, R-2, and R-3 as explicit carry-forward risks, not as solved items.
- Do not patch the design doc before approval unless Leo/GPT wants the carry-forward gates written into the design doc itself.
- Do not proceed to Phase 2A automatically after approval.

## Required Leo/GPT Final Design Approval Decision

Leo/GPT must decide one:

1. `APPROVE_DESIGN_WITH_ACCEPTED_RISKS`
2. `REQUEST_DESIGN_PATCH_BEFORE_APPROVAL`
3. `REJECT_DESIGN_NEEDS_ARCHITECTURE_REWORK`

If approving with accepted risks, Leo/GPT should explicitly accept:

- R-1 as a follow-up whitelist/contract ownership gate;
- R-2 as a production/operational-use blocker;
- R-3 as a future identity/attribution policy gate.

## What This Approval Would Mean

If Leo/GPT approves the design with accepted risks, it means:

- `RecOutcomeEvent` is the canonical current purchase outcome summary/current row.
- `@@unique([orderItemId])` remains the hard invariant.
- Future lifecycle history belongs in a separate additive event log design.
- Raw commerce evidence remains in Cosmile.
- Foundation receives refined/whitelisted signals only.
- Phase 2A may be considered later, but is not yet approved.

## What This Approval Would Not Mean

Approval would not authorize:

- Phase 2A execution;
- Phase 2B migration rehearsal;
- Worker implementation;
- runtime repo modification;
- DB access;
- query execution;
- migration execution;
- `COSMILE_REC_OUTCOME_ENABLED` flag ON;
- main merge;
- production/live/staging access;
- operational use;
- event log table creation;
- refund/cancel/reorder implementation;
- direct/session attribution implementation;
- Foundation signal expansion.

## Next Gate If Approved

After Leo/GPT final design approval, Advisor should not automatically run Phase 2A.

The next decision should be:

`DECIDE_PHASE2A_TARGET_DB_AND_READ_ONLY_ACCESS`

Phase 2A still needs explicit Leo/GPT approval for:

- target DB identity;
- proof it is not prod/live/customer-facing;
- read-only access method;
- secret masking path;
- allowed read-only commands;
- stop conditions;
- review route after result.

## Prohibited Actions Confirmed

Advisor did not:

- execute Phase 2A;
- write Worker handoff;
- access DB;
- run query;
- run migration;
- modify runtime repo;
- stage/commit/push runtime repo;
- enable flag;
- merge main;
- access secrets;
- print raw `DATABASE_URL`;
- send anything to Worker, Sentinel implementation review, Service Reviewer, or Phase 2A executor.

