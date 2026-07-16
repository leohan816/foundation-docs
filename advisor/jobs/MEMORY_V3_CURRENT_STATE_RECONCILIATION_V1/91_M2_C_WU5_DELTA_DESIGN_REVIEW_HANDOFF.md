# Memory V3 M2 C WU5 — independent delta design review handoff

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-C-WU5-DELTA-DESIGN-REVIEW-001
REVIEW_ID: M2-C-WU5-DELTA-DESIGN-REVIEW-001
TARGET_ACTOR: foundation-reviewer-fable5
TARGET_SESSION: foundation-reviewer-fable5
ROLE: Independent Foundation Reviewer (Sentinel)
ROLE_MODE: DELTA_DESIGN_REVIEW
RESPONSIBLE_ADVISOR: foundation-advisor
TARGET_PROJECT: FOUNDATION
TARGET_REPOSITORY: /home/leo/Project/FOUNDATION
TARGET_BRANCH: shadow/foundation-shared-memory-v0
TARGET_HEAD: 3e6abeec04f370dff1844afc429bd39487149c02
FOUNDATION_DOCS_REPOSITORY: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714
FOUNDATION_DOCS_BRANCH: advisor/foundation-team-role-alignment-20260714
SUBJECT_BASE: 00d65f8bd09636ebf57c55ace45e5cc8a7ae4ff3
SUBJECT_HEAD: 826bafdc30b9f8ec15104c3b9ca72ab5a4053456
REQUIRED_SKILL: /fable-sentinel
ACTUAL_RUNTIME_VERIFIED_BY_ADVISOR: claude-fable-5 / max
REQUESTED_EFFORT: max
INDEPENDENCE: separate session from Advisor, Designer, and Worker
PRODUCT_WRITE_AUTHORITY: NONE
COMMIT_PERMISSION: NO
PUSH_PERMISSION: NO
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
```

## Required current authority reads

Read directly before review:

- `/home/leo/Project/agent-office/docs/agent/TEAM_OPERATING_MODEL.md`
- `/home/leo/Project/agent-office/docs/agent/roles/reviewer.md`
- `/home/leo/Project/FOUNDATION/AGENTS.md`
- `/home/leo/Project/FOUNDATION/CLAUDE.md`
- Founder authorization at foundation-docs commit
  `c96caefe4cfd4c4f4b6bf54251f2b947dfbd51d2`, path
  `advisor/jobs/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/58_M2_C_BOUNDED_SHADOW_IMPLEMENTATION_AUTHORIZATION.md`
- documentation allowlist correction at commit
  `36690ec2b0810dc46bb90be9fda4a596d5d17af0`, path
  `advisor/jobs/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/59_M2_C_SHADOW_DOCUMENTATION_ALLOWLIST_CORRECTION.md`
- original independently reviewed design at commit
  `7cbcb8d9bfe012b92d8bf8f1e0ba0957f1610117`
- original design review PASS at commit
  `920359eb03971540dae405dc836cc00f398e4ff1`
- WU4 Advisor evidence gate at commit
  `d2f37743ccafa6d1fd93d74d1567fbceaefc83c4`, path
  `advisor/jobs/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/87_M2_C_WU4_ADVISOR_EVIDENCE_GATE.md`
- the WU5 clarification result and patched design at `SUBJECT_HEAD`.

## Immutable delta subject

Review only the delta from `SUBJECT_BASE` to `SUBJECT_HEAD` for these four paths:

```text
runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_IMPLEMENTATION_READY_DESIGN_RESULT.md
runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_IMPLEMENTATION_READY_DESIGN_RESULT_POINTER.md
runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU5_DESIGN_CLARIFICATION_RESULT.md
runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU5_DESIGN_CLARIFICATION_RESULT_POINTER.md
```

Use ancestry and path-filtered diff. Do not re-review unrelated earlier design text
except the smallest load-bearing WU1–WU4 code and design context needed to judge
this delta.

## Mandatory review questions

1. Does section 11.4 define exact Python 3.7-compatible response, audit, metric,
   sink, service, constructor, and method surfaces without endpoint, singleton,
   consumer, transport, persistence, or existing-runtime import?
2. Are every injected dependency and default in section 11.5 exact, fail-closed,
   provider-independent, and free of env, secret, file, DB, network, or runtime
   configuration access?
3. Are the four flag names and source defaults exact; is Shadow default OFF; are
   live, intake, and candidate runtime hard OFF; and can no environment/setter path
   activate them?
4. Does shared reason integration preserve all existing dynamic reasons, delegate
   only to the landed exact 18-code C guard, collapse unknown/unhashable/error values
   to `cannot_determine`, and introduce no nineteenth C code or diagnostic channel?
5. Is the design honest that the landed WU3 has no audit callback and therefore no
   audit-transaction rollback; do post-accepted/replay audit or metric failures
   preserve prior ledger state, return only the fail-closed projection, poison the
   instance, and make later calls fail before parsing or WU3?
6. Does a failed WU4 plan still call unchanged WU3 with empty slots and hard-false
   guard so exact replay/collision gate 9 and lineage gate 10 precede gate 11, with
   no new candidate effect?
7. Is decision-ID ownership exact for OFF, poison, ID/clock/pre-commit rejection,
   WU3 rejection/collision, exact replay, first accepted, and post-ledger failure,
   without exposing producer/candidate/evidence IDs or raw details?
8. Are response, audit, and metrics projections closed and minimized for every
   section 11.8 path, with no raw text, PII, payload, producer identifier,
   credential, exception, stack, or copied malformed value?
9. Is the WU5/WU6 split exact: WU5 owns exactly six code/doc paths and no test or
   fixture; WU6 later owns exactly three tests plus one synthetic fixture and all
   executable product oracles?
10. Are STOP, rollback, poison recovery, acceptance, and WU6 oracle mappings
    internally consistent, particularly that rollback never clears a ledger or
    removes WU1–WU4 and that WU5 cannot silently exercise product tests?
11. Do both pointers match the subject files' SHA-256 values; is the subject delta
    exactly four foundation-docs paths; and did Foundation remain unchanged at
    `TARGET_HEAD` with only its known pre-existing dirt?
12. Does the delta keep WU8, delivery, activated intake, durable/current candidate
    runtime, real-user application, approval/reuse/promotion, ranking, safety
    mutation, real DB, production, and M3 unauthorized?

Treat these as high-attention risks, not assumed conclusions:

```text
- no false atomicity may be claimed across WU3 and audit/metrics;
- failed WU4 preparation must not mask replay/collision/lineage precedence;
- post-ledger containment must preserve all unrelated prior ephemeral evidence;
- WU5 must have zero test/fixture paths and WU6 must own executable proof.
```

## Allowed inspection and output

Read-only inspection of the committed foundation-docs subject and the minimum
load-bearing WU1–WU4 Foundation code is allowed. Do not run product tests for this
design-only delta review. Do not modify any subject or product path.

Write only:

```text
/home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU5_DELTA_DESIGN_REVIEW_RESULT.md
/home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU5_DELTA_DESIGN_REVIEW_RESULT_POINTER.md
```

Do not modify the subject, any product repository, Control workspace, or any other
evidence artifact. Do not stage, commit, or push.

## Verdict and return

Return exactly one of:

```text
PASS
PASS_WITH_RISK
NEEDS_PATCH
FAIL
```

If `NEEDS_PATCH`, give bounded finding IDs and exact artifact paths/sections; do not
patch. Record the actual live model and effort from the runtime. Return the compact
pointer to `foundation-advisor` and STOP.
