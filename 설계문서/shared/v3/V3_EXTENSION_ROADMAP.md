# V3 Extension Roadmap

Status: `ACTIVE_CANONICAL__DEFERRED_BUT_DESIGNED_FOR`

Date: 2026-07-10

Package 1B status: `NOT_STARTED_NOT_APPROVED`

This roadmap preserves future extension points without approving their design or implementation.

## Governing Principle

`DEFERRED_BUT_DESIGNED_FOR`

Future functionality should be additive wherever possible. It must not require destructive identity re-keying, silent overwrite, or reinterpretation of historical records. Existing records retain the meaning and provenance they had when written. A new capability must add versioned contracts, explicit links, or supersession records rather than pretending old data already contained the new meaning.

## Extension Register

| Extension | Current status | Current safe default | Architectural extension point to preserve | Required future gate | Likely repo owners | Possible changes | Backward compatibility requirement | Forbidden reinterpretation |
|---|---|---|---|---|---|---|---|---|
| Free-text feedback | `DEFERRED_NOT_APPROVED` | Structured-only, no feedback text | Optional versioned input type separate from structured answers | `RETENTION_ERASURE_AND_PROCESSOR_POLICY_GATE`, raw-text security/provider review, Leo/GPT D3-B | Cosmile UX/provenance; Foundation semantic acceptance only if later approved | API/runtime/schema may be needed | Structured-only rows and their meaning remain valid | Never infer old structured answers as recovered free text |
| Semantic/classifier processing | `DEFERRED_NOT_APPROVED` | No Foundation semantic processing for initial feedback | Separate versioned feedback semantic contract, not consultation FRC reinterpretation | `SEMANTIC_CALIBRATION_VERSIONING_GATE`, D3-B, design review | Foundation/foundation-control authority; Cosmile transports approved outputs | Contract/API/runtime/schema likely | Existing consultation contract and feedback records remain independently interpretable | Never relabel consultation output or DB enums as a proven feedback classifier |
| Multilingual and mixed feedback | `EXPERIMENT_REQUIRED` | Separate positive/adverse structured axes; unclear/non-learning | Multi-axis, versioned representation with provenance and correction | Corpus/annotation/calibration and sensitive-language review | Foundation semantics; Cosmile presentation | Contract/schema/test changes may be needed | Prior labels remain tied to original classifier/version | Never collapse positive plus adverse into an optimistic single historical label |
| External-provider processing | `DEFERRED_NOT_APPROVED` | No feedback provider egress | Explicit default-off transport with provider and incident boundaries | D3-B, provider/legal/security review, kill switch | foundation-control transport; Foundation authority; Cosmile disclosure/consent | Runtime/config/contract changes likely | Provider-free structured path remains functional | Never treat credential presence or existing consultation egress as feedback consent |
| Guest-to-login additive linking | `DEFERRED_NOT_APPROVED` | No feedback/memory link or re-key | Optional additive link record with consent, revocation, audit, and original evidence preserved | `IDENTITY_STITCHING_AND_ATTRIBUTION_CHANGE_POLICY_GATE`, real-auth threat review | Cosmile | Schema/API/runtime likely | Anonymous and subject records remain independently valid | Never re-key old rows in place or use `cart_merged` as consent |
| Correction and supersession | `DEFERRED_REQUIRED_FOR_SEMANTICS` | Stop reuse; no silent overwrite; no automatic safety lowering | Append-only correction/supersession record with authority, reason, and affected-state links | Correction authority, retention policy, safety review | Cosmile provenance; Foundation acceptance constraints | Schema/API/runtime likely | Original result remains auditable and marked superseded | Never rewrite history or erase the fact that an earlier result existed |
| Durable memory promotion | `DEFERRED_NOT_APPROVED` | No promotion, no evidence upgrade, no safety override | Approval-gated candidate lifecycle with source provenance and no-reappearance | Retention, calibration, human review, pilot value, implementation review | Foundation canonical policy; Cosmile candidate producer | Cross-repo contract/runtime/schema may be needed | Existing safety and evidence rules remain raise-only/non-upgrading | Never reinterpret feedback volume as canonical evidence |
| Recommendation or ranking use | `DEFERRED_NOT_APPROVED` | No ranking change or uplift claim | Separately versioned consumption policy after measured value | Successful D4 pilot, metric governance, safety review | Cosmile ranking UX; Foundation constraints where applicable | Runtime/analytics likely | Existing organic C2 outcomes remain organic, not attributed | Never convert organic outcomes or participation volume into recommendation success |
| Foundation signal transmission | `BLOCKED` | No flush, no feedback signal expansion | Versioned refined/whitelisted contract with traceability and no raw commerce ownership transfer | `OUTBOX_CONSENT_IDENTIFIER_CONTAINMENT_GATE` plus joint governance | Cosmile producer mapping; Foundation acceptance; Leo/GPT authority | Contract/runtime/outbox lifecycle likely | Existing unsent rows are not automatically declared conformant | Never transmit current consent/identifier shape or treat no consumer as approval |
| Human review | `DEFERRED_NOT_APPROVED` | No staffing or SLA promise; no automatic action that assumes review | Named queue/owner/authority/SLA with fail-safe unstaffed behavior | `HUMAN_REVIEW_OPERATIONS_GATE`, legal/safety policy | Product operations plus Foundation safety authority and Cosmile UX | Operations/runtime/API may be needed | System remains safe when review is unavailable | Never create `verified`/`contradicted` transitions without authorized actor evidence |
| Adverse/product-level safety aggregation | `DEFERRED_NOT_APPROVED` | Individual conservative guidance only; no product-level conclusion from volume | Abuse-aware, provenance-weighted aggregation separate from individual response | Sensitive-population, abuse, calibration, human review, legal/safety gates | Foundation safety authority; Cosmile evidence producer | Contract/schema/runtime/analytics likely | Individual reports retain source and uncertainty | Never upgrade certainty from duplicate/replayed volume or auto-block a product |
| Pilot-to-operational expansion | `DEFERRED_NOT_APPROVED` | Observation-only, time-boxed, kill-switch controlled | Explicit release gate separating pilot evidence from operational policy | `PILOT_METRIC_GOVERNANCE_GATE`, retention, real auth, abuse, security, final review | Advisor release train; repo-local Workers; Fable5 review; Leo/GPT approval | Potentially all layers | Pilot data and results remain labeled pilot-only | Never remove pilot qualifiers or reuse null/biased results as operational proof |

## Additive Design Requirements

1. Every new event or result carries its creation-time contract/version and provenance.
2. Corrections append a supersession relation; they do not silently replace the prior state.
3. Identity linking, if ever approved, is additive and reversible; original anonymous evidence is not re-keyed.
4. Summary/current rows and lifecycle event logs remain separate responsibilities.
5. Raw commerce evidence remains Cosmile-owned. Foundation receives only approved refined/whitelisted signals.
6. Historical structured-only records are never reinterpreted as semantic free-text results.
7. Organic purchase outcomes remain organic and cannot be retroactively attributed to recommendations.
8. Existing consultation safety behavior does not automatically become feedback safety behavior.
9. Any new learning consumer preserves no-evidence-upgrade and no-safety-downgrade constraints until explicitly approved.
10. Deletion, correction, consent withdrawal, and no-reappearance behavior are designed before operational writes.

## Required Review Sequence for an Extension

1. Declare impacted unknowns, decisions, scenarios, gates, reversibility, and cost using `V3_MISSION_ENTRY_EXIT_CHECKLIST.md`.
2. Apply `V3_BIG_BLOCK_UNKNOWN_GATE_PROTOCOL.md` and select the risk level without downgrading high-risk unknowns.
3. Resolve founder/legal/experiment prerequisites before design.
4. Use Control only after Leo/GPT authorizes cross-project design.
5. Require independent design review before implementation and independent implementation review before closure.
6. Update the canonical register, ledger, roadmap, and index at mission exit.

No roadmap entry starts automatically.
