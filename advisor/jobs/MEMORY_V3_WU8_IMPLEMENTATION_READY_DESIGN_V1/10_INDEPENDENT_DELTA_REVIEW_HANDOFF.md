# Independent Delta Review Handoff — Corrected WU8 Implementation-Ready Design

```text
MISSION_ID: MEMORY_V3_WU8_IMPLEMENTATION_READY_DESIGN_V1
REVIEW_ID: WU8-IMPLEMENTATION-READY-DESIGN-DELTA-REVIEW-001
REVIEW_PASS: DELTA_REVIEW
TARGET_ACTOR: foundation-reviewer-fable5
TARGET_SESSION: foundation-reviewer-fable5
ROLE: Independent Reviewer (Sentinel)
RESPONSIBLE_ADVISOR: foundation-advisor

PREVIOUS_SUBJECT_COMMIT: 3fd7a49aa00346afc0142b92f69790819cd90e7a
PREVIOUS_SUBJECT_BLOB: 726223cbbcfc0c231944edbba5b76acd3fe95f1c
PREVIOUS_SUBJECT_SHA256: 08eb26538bed3b0960bd82ba22a4078cbb0a744f247690b388670ef9b903e914

NEW_SUBJECT_COMMIT: 08dc39dcc76b595c4b4fe8fc8f0e24b9bffedf9b
NEW_SUBJECT_BLOB: cd8d0340de36e877fe7bfc33c1cba0627826320e
NEW_SUBJECT_SHA256: 2213262a68f8a2034a118190937d16502dc00b987efd0ad89bd268e0468a17de

SUBJECT_FILE: runs/shared/MEMORY_V3_WU8_IMPLEMENTATION_READY_DESIGN_V1/WU8_IMPLEMENTATION_READY_DESIGN_RESULT.md
SUBJECT_POINTER: runs/shared/MEMORY_V3_WU8_IMPLEMENTATION_READY_DESIGN_V1/WU8_IMPLEMENTATION_READY_DESIGN_POINTER.md
FULL_REVIEW_COMMIT: ef8b697e47c7d6eba214d64c1759a17b106bfd6c
CORRECTION_HANDOFF_COMMIT: 6966321208dafb9a9824269510c1874d82d5a91e
AUTHORIZED_FINDINGS: DR-1, DR-2

REQUIRED_SKILL: /fable-sentinel
MODEL_EFFORT: max
```

## Review scope

This is a delta-only re-review by the same Reviewer and session that issued the full
`NEEDS_PATCH` verdict. Review only the previous subject to new subject delta, the corrected
pointer, and the prior findings needed to decide closure. Do not repeat the full baseline review.

Required commands/equivalents:

```text
git merge-base --is-ancestor PREVIOUS_SUBJECT_COMMIT NEW_SUBJECT_COMMIT
git diff --name-status PREVIOUS_SUBJECT_COMMIT..NEW_SUBJECT_COMMIT
git diff PREVIOUS_SUBJECT_COMMIT..NEW_SUBJECT_COMMIT -- SUBJECT_FILE SUBJECT_POINTER
```

Account for intervening Advisor handoff/review commits by applying path filters and ancestry;
do not treat report-only commits as subject changes.

## Required rulings

1. Recompute the new subject blob and SHA-256 and match the pins above.
2. Confirm the subject delta contains only the five DR-1/DR-2 anchors and pointer metadata.
3. **DR-1:** confirm only earlier unfinished rows are blocked, the retraction row remains
   deliverable, the acknowledged predecessor/tombstone meaning is preserved, and the section
   12.1 oracle matches.
4. **DR-2:** confirm `ineligible` was removed from both durable enums, expiry deterministically
   stores receipt/head `expired` and draft `expired`, and no new state/producer/policy appeared.
5. Confirm no selected direction, authority gate, contract, limit, entity, WorkUnit, future
   path, test scope, exclusion, or implementation-readiness boundary changed.
6. Confirm product/control repositories remain at their pinned baselines with zero mission
   write and that no implementation/test/DB/network/secret/env/flag/migration action occurred.

## Verdict

```text
PASS
PASS_WITH_RISK
NEEDS_PATCH
FAIL
```

`PASS` means DR-1 and DR-2 are closed without regression. Any remaining finding must cite an
exact changed line and explain why it is not already covered by the full review.

## Allowed writes

Write only:

```text
runs/shared/MEMORY_V3_WU8_IMPLEMENTATION_READY_DESIGN_V1/WU8_IMPLEMENTATION_READY_DESIGN_DELTA_REVIEW_RESULT.md
runs/shared/MEMORY_V3_WU8_IMPLEMENTATION_READY_DESIGN_V1/WU8_IMPLEMENTATION_READY_DESIGN_DELTA_REVIEW_POINTER.md
```

Do not patch the subject, pointer, product/control repository, or any other artifact. Do not
stage, commit, push, fetch, switch branches, dispatch, run product tests, or access/execute DB,
network, secrets, env, flags, schema, migrations, transport, intake, or runtime.

```text
WU8_IMPLEMENTATION: NOT_AUTHORIZED
HARD_STOP: ACTIVE
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
```
