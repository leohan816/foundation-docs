# Designer Bounded Correction Handoff — WU8 Implementation-Ready Design

```text
MISSION_ID: MEMORY_V3_WU8_IMPLEMENTATION_READY_DESIGN_V1
WORK_UNIT_ID: WU8-DESIGN-DESIGNER-CORRECTION-001
TARGET_ACTOR: foundation-designer
TARGET_SESSION: foundation-designer
ROLE: Designer
ROLE_MODE: BOUNDED_DESIGN_ARTIFACT_CORRECTION
RESPONSIBLE_ADVISOR: foundation-advisor

ORIGINAL_SUBJECT_COMMIT: 3fd7a49aa00346afc0142b92f69790819cd90e7a
ORIGINAL_SUBJECT_BLOB: 726223cbbcfc0c231944edbba5b76acd3fe95f1c
ORIGINAL_SUBJECT_SHA256: 08eb26538bed3b0960bd82ba22a4078cbb0a744f247690b388670ef9b903e914
FULL_REVIEW_COMMIT: ef8b697e47c7d6eba214d64c1759a17b106bfd6c
FULL_REVIEW_VERDICT: NEEDS_PATCH
AUTHORIZED_FINDINGS: DR-1, DR-2

REQUIRED_SKILL: /fable-builder
MODEL_EFFORT: high
```

## Required reads

Read directly and do not execute from memory:

1. `/home/leo/Project/agent-office/docs/agent/TEAM_OPERATING_MODEL.md`
2. `/home/leo/Project/agent-office/docs/agent/roles/designer.md`
3. `advisor/jobs/MEMORY_V3_WU8_IMPLEMENTATION_READY_DESIGN_V1/03_FOUNDER_DESIGN_AUTHORITY_CLARIFICATION.md`
4. `runs/shared/MEMORY_V3_WU8_IMPLEMENTATION_READY_DESIGN_V1/WU8_IMPLEMENTATION_READY_DESIGN_RESULT.md` at original subject commit `3fd7a49aa00346afc0142b92f69790819cd90e7a`
5. `runs/shared/MEMORY_V3_WU8_IMPLEMENTATION_READY_DESIGN_V1/WU8_IMPLEMENTATION_READY_DESIGN_REVIEW_RESULT.md` at review commit `ef8b697e47c7d6eba214d64c1759a17b106bfd6c`
6. This handoff at its committed version.

## Authorized correction

Correct only DR-1 and DR-2 in the existing design subject and its compact pointer. Preserve
all other bytes and all Founder directions, authority gates, contracts, limits, entities,
WorkUnits, paths, tests, and exclusions.

### DR-1 — Retraction delivery row

In subject section 4.1, replace the normative clause so that:

- every **earlier** unfinished row in the same root becomes `blocked`;
- the retraction row itself explicitly remains deliverable;
- an acknowledged predecessor remains as evidence and is revoked by the future Foundation
  tombstone.

In section 12.1, align the test oracle to state exactly that a retraction blocks earlier
unfinished root rows while its own row remains deliverable.

Do not change any state, transition, retry rule, acknowledgement rule, tombstone rule, or
delivery authority.

### DR-2 — Undefined `ineligible` state

Use the Reviewer's bounded option (a):

- remove `ineligible` from `EvidenceReceiptV1.effective_eligibility`;
- remove `ineligible` from `LineageHeadV1.effective_eligibility`;
- rewrite the expiry paragraph to state that the receipt and lineage head store
  `effective_eligibility = expired`, associated review drafts store `status = expired`, and
  structured content is deleted or made cryptographically unavailable by the future selected
  backend procedure;
- preserve the minimized receipt/tombstone replay-prevention ceiling.

Do not add a new producer, state, transition, field, enum member, or policy.

## Allowed writes

Write only these existing foundation-docs artifacts:

```text
runs/shared/MEMORY_V3_WU8_IMPLEMENTATION_READY_DESIGN_V1/WU8_IMPLEMENTATION_READY_DESIGN_RESULT.md
runs/shared/MEMORY_V3_WU8_IMPLEMENTATION_READY_DESIGN_V1/WU8_IMPLEMENTATION_READY_DESIGN_POINTER.md
```

Update the pointer to identify this as the bounded DR-1/DR-2 correction and record the new
result SHA-256. Do not create any additional result file.

## Prohibited expansion

- No section other than the DR-1/DR-2 anchors and the pointer may change.
- No new states, columns, categories, limits, mechanisms, transports, WorkUnits, paths, tests,
  policy, authority, or implementation readiness.
- No product/control repository write, DB/network/secret/env access, migration/schema
  implementation or rehearsal, test/build execution, stage/commit/push/fetch, branch change,
  actor dispatch, or new agent/subagent.
- WU8 implementation, delivery, activated intake, durable/current candidate runtime, Full
  Package 1B, and M3 remain NOT_AUTHORIZED.

## Completion

Before return, prove the delta from the original subject is limited to DR-1/DR-2 and the
pointer. Return only the compact pointer to `foundation-advisor` and STOP. The same Reviewer
session will perform a delta-only re-review.

```text
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
HARD_STOP: ACTIVE
```
