# Handoff — WU8-C2 Independent Implementation Review

```text
MISSION_ID: MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1
REVIEW_ID: WU8-C2-IMPLEMENTATION-REVIEW-001
REVIEW_PASS: FULL_IMPLEMENTATION_REVIEW
TARGET_ACTOR: foundation-reviewer-fable5
TARGET_SESSION: foundation-reviewer-fable5
TARGET_WINDOW: @5
TARGET_PANE: %5
ROLE: Independent Reviewer
ACTUAL_MODEL_REQUIRED: Fable 5 family
EFFORT_REQUIRED: max
REQUIRED_SKILL: /fable-sentinel
RETURN_TO: foundation-advisor
```

## Immutable subject

```text
TARGET_REPOSITORY: /home/leo/Project/Cosmile
TARGET_BRANCH: shadow/m4-cosmile-memory
SUBJECT_BASE: ad172db403065fc8e498a1e80cdd347034ea7c48
SUBJECT_HEAD: b8b61d746e2bdbb8d7ab26405bf44fb665ad87a6
SUBJECT_PARENT_REQUIRED: ad172db403065fc8e498a1e80cdd347034ea7c48
EXPECTED_ORIGIN_HEAD: ad172db403065fc8e498a1e80cdd347034ea7c48
EXPECTED_LOCAL_STATE: ahead 1 / behind 0; candidate not pushed
```

Review only these exact candidate paths:

```text
app/src/types/commerceEvidenceDelivery.ts
app/src/lib/commerceEvidenceDeliveryState.ts
app/scripts/wu8_commerce_evidence_delivery_contract.vitest.ts
app/scripts/wu8_commerce_evidence_delivery_property.vitest.ts
```

The following six pre-existing untracked documentation files are preservation-only and must remain untouched:

```text
app/docs/COSMILE_FOUNDATION_PARITY_CROSSCHECK_20260703.md
app/docs/COSMILE_FOUNDATION_USER_REF_ALIGNMENT_20260703.md
app/docs/COSMILE_FOUNDATION_USER_REF_V2_ALIGNMENT_20260703.md
app/docs/COSMILE_MEMORY_ARCHITECTURE_V1_REVIEW_20260704.md
app/docs/COSMILE_MEMORY_INVENTORY_20260704.md
app/docs/FOUNDATION_DOCS_SYNC_POLICY.md
```

## Required reads

Read directly; do not execute from memory:

1. `/home/leo/Project/agent-office/docs/agent/TEAM_OPERATING_MODEL.md`
2. `/home/leo/Project/agent-office/docs/agent/roles/reviewer.md`
3. `/home/leo/Project/Cosmile/AGENTS.md`
4. `/home/leo/Project/Cosmile/CLAUDE.md`
5. Founder Decision Record at commit `691a2d065f5857f7d44d8e23588f2f760204bc47`
6. Advisor Manifest at commit `006ef9108f4acba3a2302e6be91ca02c4a8c978e`
7. Corrected WU8 design file `runs/shared/MEMORY_V3_WU8_IMPLEMENTATION_READY_DESIGN_V1/WU8_IMPLEMENTATION_READY_DESIGN_RESULT.md` at commit `08dc39dcc76b595c4b4fe8fc8f0e24b9bffedf9b`, SHA-256 `2213262a68f8a2034a118190937d16502dc00b987efd0ad89bd268e0468a17de`
8. `runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/C2_WORKER_RESULT.md` at foundation-docs commit `5a9771aefd8a178ad3af71ae62c4c00c68c45373`
9. `advisor/jobs/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/32_ADVISOR_C2_VALIDATION.md` at the same commit

## Review requirements

Independently verify at minimum:

- exact ancestry and exact four-path containment;
- no existing M2 file, Foundation, SIASIU, or foundation-control modification;
- carrier preserves the existing envelope without new/renamed fields, validates exact top-level and nested keys, uses UTF-8 byte size `<= 32768`, and never repairs/recomputes `source_hash`;
- exact acknowledgement contract/version, five outcomes, closed reason/disposition matrix, and fail-closed unknown/malformed behavior;
- exact eight states, closed transitions, terminal states, and generic-status mapping;
- deterministic claim/lease/version/expiry, per-root ordering, attempt limits, retry `[1,2,4,8]s` plus bounded injected jitter, attempt-5 exhaustion, and stale/late acknowledgement behavior;
- correction/retraction ordering, backpressure and concurrency limits, and category-only DLQ with no raw identifiers/payload/hash/PII leakage;
- functions remain pure: no sender, consumer, I/O, DB, timer, scheduler, endpoint, route, network, provider, broker, credential, secret, feature activation, or delivery;
- no permissive unknown state or acknowledgement;
- tests are meaningful and not weakened or reward-hacked.

Reproduce at least:

```text
cd /home/leo/Project/Cosmile/app
npx vitest run scripts/wu8_commerce_evidence_delivery_contract.vitest.ts scripts/wu8_commerce_evidence_delivery_property.vitest.ts
npx vitest run scripts/m2_ab_commerce_evidence.vitest.ts scripts/m2_ab_feedback_state.vitest.ts
node scripts/m2_ab_no_transport.mjs
```

Inspect TypeScript diagnostics for the four subject paths. Do not claim the whole repository typecheck is clean if
unrelated pre-existing errors remain.

## Verdict and write scope

Return exactly one of:

```text
PASS
PASS_WITH_RISK
NEEDS_PATCH
FAIL
```

Write only:

```text
/home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/C2_REVIEW_RESULT.md
/home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/C2_REVIEW_POINTER.md
```

Do not patch, stage, commit, push, accept risk, select policy, or alter the subject. If `NEEDS_PATCH`, identify exact
finding IDs, required behavior, and allowed subject paths. Return to `foundation-advisor` and STOP.
