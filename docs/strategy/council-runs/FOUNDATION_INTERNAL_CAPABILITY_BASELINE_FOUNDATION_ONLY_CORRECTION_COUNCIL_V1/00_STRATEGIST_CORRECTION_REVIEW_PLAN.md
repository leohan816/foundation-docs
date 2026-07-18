# Strategist Foundation-Only Correction Review Plan

```text
COUNCIL_MISSION_ID: FOUNDATION_INTERNAL_CAPABILITY_BASELINE_FOUNDATION_ONLY_CORRECTION_COUNCIL_V1
DOCUMENT_TYPE: STRATEGIST_CORRECTION_REVIEW_PLAN
STATUS: FROZEN_BEFORE_BLIND_REVIEW
DATE_UTC: 2026-07-18
AUTHORITY: RECOMMENDATION_ONLY
REPORT_LANGUAGE: ENGLISH
COUNCIL_DECISION: REQUIRED
ADVISOR_DISPATCHED: NO
BASELINE_STARTED: NO
IMPLEMENTATION_AUTHORIZED: NO
```

## Trigger and exact decision question

```text
COUNCIL_DECISION: REQUIRED
HARD_TRIGGERS:
- explicit Leo request
- material correction of the Foundation baseline decision and outcome envelope
RATIONALE:
The prior Council contract incorrectly treated SIASIU consultation and optional Cosmile AI
as near-term outcome targets. Leo has corrected the priority to Foundation itself. The
Council must challenge the corrected contract before any Advisor dispatch.
```

Exact question:

> Is the revised Foundation-only decision contract sufficiently complete, bounded,
> evidence-grounded, and safe to authorize a later Advisor-led factual baseline of
> Foundation itself, while keeping downstream products non-objectives and preserving a
> mandatory post-evidence Council and Leo decision before implementation?

## Subject and preservation pins

The original Council run is immutable historical evidence:

```text
ORIGINAL_RUN:
/home/leo/Project/council/runs/FOUNDATION_INTERNAL_CAPABILITY_AND_RUNTIME_BASELINE_COUNCIL_PREFLIGHT_V1

ORIGINAL_SYNTHESIS_SHA256:
cf566614a16609c79db92f6e41e3a18b38ad65ab2b48293b3e825b675fb6f9b9

ORIGINAL_ADVISOR_INSTRUCTION_EN_SHA256:
76b9512c98f11b2d3d36a74ce5e3e577c8aa996bd5d6a15b787fc9d23a88dac9

ORIGINAL_ADVISOR_INSTRUCTION_KO_SHA256:
3a9e5993f1b98087ca93e1525270921723f310473e03330bb08a7e2f89941aec

ORIGINAL_LEO_PACKAGE_SHA256:
9e9d7250d950f2cef22d40ff72567aca154dcaf3745ffe122597929c2c783a36

ORIGINAL_FINAL_POINTER_SHA256:
28f8571fc051ee1d97f255f3729dbee7adb6ac7d2835da31bab29062a503f94f

PUBLISHED_SNAPSHOT_COMMIT:
0b5c5876738d5e66ea30a110b5a417ebcf1d6947

PUBLISHED_DRAFT_PR:
https://github.com/leohan816/foundation-docs/pull/5
```

No file in the original run may be edited. The subject of this correction review is:

```text
01_REVISED_FOUNDATION_ONLY_DECISION_CONTRACT.md
```

Its SHA-256 is frozen in the admission record before dispatch.

## Composition

```text
COUNCIL_COMPOSITION:
- PRODUCT_USER_AND_BUSINESS_VALUE_CHALLENGER | CORE
- SYSTEM_ARCHITECTURE_SAFETY_AND_GOVERNANCE_CHALLENGER | CORE
- DELIVERY_SCOPE_EVIDENCE_AND_OPERATIONS_CHALLENGER | CORE
- DATA_QUALITY_LINEAGE_AND_GOVERNANCE_CHALLENGER | SPECIALIST
- AI_MODEL_BEHAVIOR_AND_EVALUATION_CHALLENGER | SPECIALIST
```

The composition is the smallest sufficient set for Foundation purpose, system boundary,
delivery/evidence closure, canonical knowledge governance, and AI/runtime evaluation.
Legal, Security, UX, and Adversarial Challengers remain unselected. An exact issue may be
routed later only through a new Leo-authorized composition amendment; none is authorized
in this correction review.

## Allowed review depth

Allowed:

- read the revised decision contract;
- read the frozen correction facts/assumptions/unknowns register;
- read the original final synthesis, Advisor instruction, Leo package, and final pointer;
- challenge scope, evidence, gating, role boundaries, closure, and future decision routing;
- write one blind report to the assigned path.

Prohibited:

- inspect Foundation, foundation-control, SIASIU, or Cosmile repositories;
- perform any part of the factual baseline;
- build, test, run, call providers, inspect secrets, or access data;
- patch the original Council run or a product repository;
- dispatch Advisor or Foundation Team actors;
- begin implementation, Memory V3, SIASIU development, or Cosmile AI development;
- claim Independent Review or Founder approval.

## Review process and termination

Round 1 is one blind independent correction review. Original reports from the prior run
are context pins, not other current-role reports. No selected role may read another new
correction report during Round 1.

After all five reports are frozen, Strategy classifies every finding. One mediated
cross-review round is allowed only if a blocking/material contradiction remains or a
material correction lacks stable reasoning. Otherwise it is explicitly skipped.

The correction review ends when:

- all five reports are complete and immutable;
- every material finding is accepted, rejected with reason, or unresolved;
- the Foundation-only target and downstream gate are unambiguous;
- P0-P4 evidence and safety controls remain bounded;
- P4's implementation candidate is explicitly non-executable;
- the post-evidence Council and Leo decision gate is mandatory;
- no Advisor dispatch or implementation has occurred.

Any further round requires new Leo authorization.

## Strategist output

Strategy will create:

- an immutable report freeze record;
- a material finding disposition;
- corrected English and Korean Advisor instruction candidates;
- a concise bilingual Leo decision contract;
- a final correction pointer.

The result returns to Leo and stops. Advisor dispatch is prohibited until Leo approves
the post-correction contract.
