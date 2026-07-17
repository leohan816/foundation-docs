# Handoff — Independent Full Review of U1–U3 Closure-Readiness Package

```text
MISSION_ID: MEMORY_V3_U1_U3_DISCOVERY_AND_CLOSURE_READINESS_V1
REVIEW_ID: U1-U3-CLOSURE-READINESS-FULL-REVIEW-001
TARGET_ACTOR: foundation-reviewer-fable5
TARGET_SESSION: foundation-reviewer-fable5
TARGET_WINDOW_ID: @5
TARGET_PANE_ID: %5
ROLE: Independent Reviewer
REVIEW_PASS: FULL_REVIEW
EXPECTED_MODEL_FAMILY: Fable 5
REQUIRED_EFFORT: max
REQUIRED_SKILL: /fable-sentinel
EXPECTED_WORKSPACE: /home/leo/Project/FOUNDATION
RESPONSIBLE_ADVISOR: foundation-advisor
RETURN_TO: foundation-advisor
```

## Immutable subject

```text
SUBJECT_PATH: advisor/jobs/MEMORY_V3_U1_U3_DISCOVERY_AND_CLOSURE_READINESS_V1/20_DISCOVERY_AND_CLOSURE_READINESS_PACKAGE.md
SUBJECT_COMMIT: 402087e731eff9be4908becb986695d795bad88e
SUBJECT_BLOB: 40f666147359f3e3eefbef4a50d9963903909f59
SUBJECT_SHA256: 3e043eda1c48bd9f689b1d00d3af822f884b031347d6204e7ebb7a6316bb266a
```

## Required evidence

- Control discovery:
  `runs/shared/MEMORY_V3_U1_U3_DISCOVERY_AND_CLOSURE_READINESS_V1/10_CONTROL_DISCOVERY_RESULT.md`
  at commit `b00103b38cb837b523a22d1f41b771281e8b0226`, blob
  `4dd707167b1b176800945c267a368822196ad65b`, SHA-256
  `b04c5c2829d5fa6ca90be23361c38d5652a5be48544f2ffaba27269e2427a232`.
- Prior reviewed Gate Package at commit
  `1eb7f884bbe2ebc86db6d06d36831607bc815100`.
- Prior Advisor Final Audit at commit
  `8859574b28086ea8ce56b58ec10650de8839128a`.
- Corrected reviewed WU8 design at commit
  `08dc39dcc76b595c4b4fe8fc8f0e24b9bffedf9b`.
- Direct pinned repository source at:
  - FOUNDATION `33570b9d7db79c991bb216b6a2dc80880ba1f2d6`;
  - Cosmile `b8b61d746e2bdbb8d7ab26405bf44fb665ad87a6`;
  - SIASIU `e1830b45c6d2b22b2471bb5957b6aaf7fa6dd602`;
  - foundation-control `c89b792bed177aad9322e09debecc76caab0c8a0`.

## Current role authority

Read directly:

- `/home/leo/Project/agent-office/docs/agent/TEAM_OPERATING_MODEL.md`
- `/home/leo/Project/agent-office/docs/agent/roles/reviewer.md`

## Review criteria

1. Verify every U1/U2/U3 fact and path claim against the exact committed
   evidence and pinned sources; do not trust Advisor/Control summaries.
2. Confirm every gate contains all mission-required fields:
   `VERIFIED_FACTS`, `CURRENT_STATUS`, `RECOMMENDED_DIRECTION`,
   `CLOSURE_READY`, `EXACT_REMAINING_DECISION`, `REQUIRED_DECISION_OWNERS`,
   `VERIFIED_TECHNOLOGY_AND_PATHS`, `UNRESOLVED_ITEMS`,
   `FAIL_CLOSED_DEFAULT`, unlocked/blocked WorkUnits, and proposed closure text.
3. U1: verify no qualifying workload-identity capability is evidenced; U1-B is
   not selected; U1-A/U1-C comparison is accurate; exact bindings and owners
   remain unresolved/fail-closed.
4. U2: verify the exact nine-state GRANTED-only contract, request fields,
   purpose/notice/time rules, failure mapping, re-verification points,
   snapshot-never-authority rule, erasure limits, owners, and path truth.
   Confirm the existing Cosmile route is revoke-only and is not represented as
   a current-consent adapter.
5. U3: verify Foundation truly has no committed DB/ORM/migration/deployment
   foundation or durable path; no concrete technology/path is recommended;
   the relational direction and all six reviewed constraints remain accurate;
   Cosmile's Prisma/PostgreSQL evidence is not transferred to Foundation.
6. Confirm closure-readiness values are advisory, no option/risk/gate is
   selected/accepted/closed, and no implementation is authorized.
7. Confirm dependency mapping, named decision owners, strict exclusions,
   product/control repository containment, and OPEN gate states.
8. Confirm no path, owner, platform capability, technology, mechanism, or
   operational topology was fabricated or inferred as verified.

## Write scope

Only:

- `runs/shared/MEMORY_V3_U1_U3_DISCOVERY_AND_CLOSURE_READINESS_V1/30_FULL_REVIEW_RESULT.md`
- `runs/shared/MEMORY_V3_U1_U3_DISCOVERY_AND_CLOSURE_READINESS_V1/31_FULL_REVIEW_POINTER.md`

Do not commit or push; the Advisor publishes the Reviewer's artifacts.

## Prohibitions and verdict

Do not modify the subject, evidence, or any product/control repository; do not
patch, stage, commit, push, select an option, accept risk, close a gate,
implement, dispatch, access DB/secrets, activate network, or start another
WorkUnit.

Return exactly one verdict: `PASS`, `PASS_WITH_RISK`, `NEEDS_PATCH`, or `FAIL`.
On `NEEDS_PATCH`, identify bounded finding IDs and exact required document-only
corrections. The same Reviewer will receive only the declared delta. STOP after
writing the result/pointer and returning the pointer to `foundation-advisor`.
