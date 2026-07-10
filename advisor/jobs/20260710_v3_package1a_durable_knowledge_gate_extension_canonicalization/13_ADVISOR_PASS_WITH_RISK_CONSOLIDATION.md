# Advisor Consolidation - Fable5 PASS_WITH_RISK

Date: 2026-07-10

Mission: `V3_PACKAGE1A_DURABLE_KNOWLEDGE_GATE_AND_EXTENSION_CANONICALIZATION`

Fable5 verdict: `PASS_WITH_RISK`

Advisor state: `NEEDS_LEO_GPT_DECISION`

## Verified Review Evidence

- Review result and pointer exist at the declared paths.
- Foundation-docs review commit `f5b5a3bc93f0622f22d02e6757bab9c29691ab64` is pushed and equals `origin/main`.
- The commit contains only the Fable5 result and pointer.
- Fable5 answered all 12 required coverage items `YES` on substance.
- Runtime/schema/API/migration changes remain zero.
- Package 1B remains `NOT_STARTED_NOT_APPROVED`.

## Named Risk C-1

Two still-active canonical documents use different names for the same carry-forward obligations:

| Existing active design gate | New canonical disposition | Current problem |
|---|---|---|
| `FOUNDATION_SIGNAL_WHITELIST_CONTRACT_OWNER_GATE` | Ownership resolved in part by `D5-i-A JOINT_GOVERNANCE`; remaining use is blocked by `OUTBOX_CONSENT_IDENTIFIER_CONTAINMENT_GATE` | Original gate name is absent from the new canonical set |
| `REC_OUTCOME_RETENTION_ERASURE_POLICY_GATE` | Broadened by `RETENTION_ERASURE_AND_PROCESSOR_POLICY_GATE`; U-03 remains `LEGAL_POLICY_HOLD` | Original gate name is absent from the new canonical set |
| `IDENTITY_STITCHING_AND_ATTRIBUTION_CHANGE_POLICY_GATE` | Carried unchanged | No defect |

The substance is preserved and precedence is decidable, but a future actor searching the active Commerce Memory design by the R-1/R-2 gate names will not find a direct canonical mapping.

## Advisor Assessment

C-1 is non-runtime and narrowly patchable. It is not safe to ignore as routine INFO because the mission objective is durable discoverability and prevention of silent reinterpretation. Accepting the risk would close the mission with an avoidable citation discontinuity between two active canonical control surfaces.

## Recommended Decision

`REQUEST_C1_MAPPING_PATCH_AND_FABLE5_DELTA_REREVIEW`

Proposed patch scope, only after Leo/GPT approval:

1. Add a three-row legacy/active gate continuity map to `V3_UNKNOWN_DECISION_GATE_REGISTER.md` or `V3_CANONICAL_INDEX.md`.
2. Expand `HISTORICAL_V3_DOC_STATUS_AND_SUPERSESSION_GATE` wording so active-design gate-name reconciliation is also covered.
3. Add a related-control-surface pointer to `20260709_v3_11_risk_gate_register_audit/01_ADVISOR_BRIEF.md` as the non-blocking C-2 improvement.
4. Do not change any decision, safe default, state, implementation scope, or Package 1B status.
5. Route the exact delta to the same existing Fable5 Reviewer session.

## Alternative Decision

`ACCEPT_C1_AS_TRACKED_RISK`

This would permit an Advisor final audit with accepted risk, but the missing direct mapping would remain a maintenance burden and future search hazard. Advisor does not recommend this option because the fix is small and directly serves the mission objective.

## No Automatic Advance

No patch, final audit, Control invocation, Package 1B design, runtime work, or DB action may begin until Leo/GPT selects one of the two decisions.
